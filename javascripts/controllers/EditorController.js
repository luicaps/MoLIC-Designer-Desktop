
app.controller('EditorController',[ '$scope', "$modal", function($scope,$modal) {
    /* 
     * Configuration of the editor
     */
    $scope.editor = {
        canvas : {
            // callback if a DOM node from the palette is dropped inside the canvas
            onDrop: function(droppedDomNode, x, y, shiftKey, ctrlKey){
                var type = $(droppedDomNode).data("shape");
                var figure = eval("new "+type+"();");
                // create a command for the undo/redo support
                var command = new draw2d.command.CommandAdd(this, figure, x, y);
                this.getCommandStack().execute(command);
            }
        },
 
        /*
         * provide all figures to show in the left hand palette
         * Used by the directrives/canvas.js
         */
        palette: {
            /*
             * Format:
             *     class: NAME property of the class, which is the unique identifier and name to create a new instance
             *     name: Visual name to be shown in the properties
             *     src: Source of the image, counting from /images
             */
            figures: [
                {class:"molic.shape.Opening", name:"Opening", src: "opening.png" },
                {class:"molic.shape.Closing", name:"Closing", src: "closing.png" },
                {class:"molic.shape.Processing", name:"Processing", src: "processing.png" },
                {class:"molic.shape.Ubiquitous", name:"Ub", src: "ubiquitous.png" },
                {class:"molic.shape.Scene", name:"Scene", src: "scene.png" }
            ]
        }
    };
}]);
