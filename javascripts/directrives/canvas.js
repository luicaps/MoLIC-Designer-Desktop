"use strict";

d2.directive("draw2dCanvas", ["$window","$parse", "$timeout", function($window,$parse, $timeout){

    return {
        restrict: 'E,A',
        link: function(scope, element, attrs,controller) {
            // provide the scope properties and override the defaults with the user settings
            scope.editor= $.extend(true,{
                canvas: {
                    width : 939,
                    height: 550,
                    onDrop: function(droppedDomNode, x, y, shiftKey, ctrlKey){}
                },
                palette:{
                    figures: []
                },
                state:{
                    dirty: false,
                    canUndo: false,
                    canRedo: false
                },
                selection:{
                    className:null,
                    figure:null,
                    attr:null,
                    data:null
                }

            }, scope.editor);

            //Initiates the connection function
            draw2d.Connection.createConnection=function(sourcePort, targetPort, callback, dropTarget){

                // get the coordinate of the drop target element to place the context menu in a proper way
                var pos = dropTarget.getAbsolutePosition();
                pos = dropTarget.canvas.fromCanvasToDocumentCoordinate(pos.x,pos.y);

                var context = $('<ul id="context-menu" class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu">'+
                    '<li><a data-connector="molic.shape.Utterance" tabindex="-1" href="#">Utterance</a></li>'+
                    '<li><a data-connector="molic.shape.Breakdown" tabindex="-1" href="#">Breakdown</a></li>'+
                    '<li><a data-connector="cancel" tabindex="-1" href="#">Cancel</a></li>'+
                    '</ul>');
                $("body").append(context);

                context.show()
                .css({left:pos.x, top:pos.y})
                .find("a").on("click", function(){
                    context.remove();
                    if($(this).data("connector") != "cancel") {
                        var con = eval("new "+$(this).data("connector"));
                        callback(con);
                    }
                });
            };

            // initiates the Draw2D Canvas with the given user settings and overriden hooks
            var canvas = new draw2d.Canvas(element.attr("id"), scope.editor.canvas.width, scope.editor.canvas.height);
            canvas.setScrollArea("#"+element.attr("id"));
            canvas.onDrop = $.proxy(scope.editor.canvas.onDrop, canvas);
            canvas.uninstallEditPolicy(new draw2d.policy.canvas.DefaultKeyboardPolicy());
            canvas.installEditPolicy(new molic.policy.KeyboardPolicy(scope));

            canvas.uninstallEditPolicy(new draw2d.policy.canvas.SelectionPolicy());

            canvas.installEditPolicy(new draw2d.policy.canvas.CoronaDecorationPolicy());

            var svg = $('#canvas')[0].firstChild;
            console.log(svg);
            //svg.css('border','1px solid black');
            svg.setAttribute("style", "border: 1px solid black; background-color: white;");

            // update the scope model with the current state of the CommandStack
            var stack = canvas.getCommandStack();
            stack.addEventListener(function(event){
                $timeout(function(){
                    scope.editor.state.canUndo= stack.canUndo();
                    scope.editor.state.canRedo= stack.canRedo();
                },0);
            });

            // Update the selection in the model
            // and Databinding Draw2D -> Angular
            var changeCallback = function(emitter, attribute){
                $timeout(function(){
                    if(scope.editor.selection.attr!==null){
                        scope.editor.selection.attr[attribute]= emitter.attr(attribute);
                    }
                },0);
            };
            var selectRef = function(figure){
                $timeout(function(){
                    if(figure!==null){
                        scope.editor.selection.className = figure.NAME;
                        scope.editor.selection.attr = figure.attr();
                        if(figure.NAME == "molic.shape.Scene") {
                            scope.editor.selection.data = {
                                topic: figure.getTopic(),
                                dialogue: figure.getDialogue()
                            };
                        }

                        if(figure.NAME == "molic.shape.Utterance" || figure.NAME == "molic.shape.Breakdown") {
                            scope.editor.selection.data = {
                                utterance: figure.getUtterance(),
                            };
                        }
                    } else {
                        scope.editor.selection.className = null;
                        scope.editor.selection.attr = null;
                        scope.editor.selection.data = null;
                    }

                    // unregister and register the attr listener to the new figure
                    if(scope.editor.selection.figure!==null){scope.editor.selection.figure.off("change",changeCallback);}
                    scope.editor.selection.figure = figure;
                    if(scope.editor.selection.figure!==null){scope.editor.selection.figure.on("change",changeCallback);}
                },0);
};

            canvas.installEditPolicy(new molic.policy.SelectionPolicy(scope, selectRef));

            // Databinding: Angular UI -> Draw2D
            // it is neccessary to call the related setter of the draw2d object. "Normal" Angular 
            // Databinding didn't work for draw2d yet
            scope.$watchCollection("editor.selection.attr", function(newValues, oldValues){

                if(oldValues !== null && scope.editor.selection.figure!=null){
                    // for performance reason we post only changed attributes to the draw2d figure
                    var changes = draw2d.util.JSON.diff(newValues, oldValues);
                    scope.editor.selection.figure.attr(changes); 
                }
            });

            scope.$watchCollection("editor.selection.data", function(newValues, oldValues){
                if(oldValues !== null && scope.editor.selection.figure!=null){
                    if(scope.editor.selection.className == "molic.shape.Scene") {
                        if(newValues.topic != oldValues.topic) {
                            scope.editor.selection.figure.setTopic(newValues.topic);
                        }
                        if(newValues.dialogue != oldValues.dialogue) {
                            scope.editor.selection.figure.setDialogue(newValues.dialogue);
                        }
                    }

                    if(scope.editor.selection.className == "molic.shape.Utterance" || scope.editor.selection.className == "molic.shape.Breakdown") {
                        if(newValues.utterance != oldValues.utterance) {
                            scope.editor.selection.figure.setUtterance(newValues.utterance);
                        }
                    }
                }
            });

            // push the canvas function to the scope for ng-action access
            scope.editor.undo = $.proxy(stack.undo,stack);
            scope.editor.redo = $.proxy(stack.redo,stack);
            scope.editor["delete"] = $.proxy(function(){
                var node = this.getCurrentSelection();
                var command= new draw2d.command.CommandDelete(node);
                this.getCommandStack().execute(command);
            },canvas);
            scope.editor.zoomIn = $.proxy(function(){
                canvas.setZoom(canvas.getZoom()*0.7,true);
            }, canvas);
            scope.editor.zoomOut = $.proxy(function(){
                canvas.setZoom(canvas.getZoom()*1.3, true);
            }, canvas);
            scope.editor.toFront = $.proxy(function(){
                if(canvas.getSelection().getPrimary()) {
                    canvas.getSelection().getPrimary().toFront();
                }
            }, canvas);
            scope.editor.toBack = $.proxy(function(){
                if(canvas.getSelection().getPrimary()) {
                    canvas.getSelection().getPrimary().toBack();
                }
            });
            scope.editor.open = $.proxy(function(){
                console.log('open!');
            });
            scope.editor.save = $.proxy(function(){
                console.log('save!');
            });
            scope.editor.load = $.proxy(function(json){
                canvas.clear();
                var reader = new draw2d.io.json.Reader();
                reader.unmarshal(canvas, json);
            },canvas);
        }
    };
}]);

