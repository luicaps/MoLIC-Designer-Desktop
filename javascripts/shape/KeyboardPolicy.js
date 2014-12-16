molic.policy.KeyboardPolicy = draw2d.policy.canvas.KeyboardPolicy.extend({

    NAME : "molic.policy.KeyboardPolicy",
    
    /**
     * @constructor 
     */
     init: function(scope, canvas){
        this._super();
        console.log('constructed');
        this.scope = scope;
        this.canvas = canvas;
        this.createWindowMenu();
    },
    
    /**
     * @method
     * Callback if the user press a key
     * 
     * @param {draw2d.Canvas} canvas the related canvas
     * @param {Number} keyCode the pressed key
     * @param {Boolean} shiftKey true if the shift key has been pressed during this event
     * @param {Boolean} ctrlKey true if the ctrl key has been pressed during the event
     * @private
     **/
     onKeyDown:function(canvas, keyCode, shiftKey, ctrlKey){
        if(ctrlKey ===true){
            switch(keyCode){

                case 90: // Z : Undo
                if(canvas.getCommandStack().canUndo()){
                    canvas.getCommandStack().undo();
                }
                break;
                case 89: // Y : Redo
                if(canvas.getCommandStack().canRedo()){
                    canvas.getCommandStack().redo();
                }
                break;
                case 67: // C : Copy
                if(canvas.getSelection().getSize()) {
                    this.copy = canvas.getSelection().getAll();
                }
                break;
                case 86: // V : Paste
                if(this.copy) {
                   /* console.log('has copy');
                    console.log(this.copy);
                    var data = this.copy.data;
                    var le = this.copy.data.length;
                    for(var i = 0; i < le; i++) {
                        console.log('creating command');
                        var figure = data[i];
                        console.log(figure);
                        var command = new draw2d.command.CommandAdd(this, figure, figure.x, figure.y);
                        console.log(canvas.getCommandStack());
                        //canvas.getCommandStack().execute(command);
                    }*/
                }
                break;
            }
        }
        else{
         this._super(canvas, keyCode, shiftKey, ctrlKey);
     }
 },

 saveToFile:function(){
    var canvas = this.canvas;
    var chooser = $('<input type="file" nwsaveas="model.molic" />');

    chooser.change(function() {

     var writer = new draw2d.io.json.Writer();
     var path = this.value;
     writer.marshal(canvas,function(json){
        fs = require('fs');
        fs.writeFile(path, JSON.stringify(json, null, 2), function (err) {
          if (err) return console.log(err);
      });
    });
 });

    chooser.click();
},

openFromFile:function(){
    var canvas = this.canvas;
    var chooser = $('<input type="file" />');

    chooser.change(function() {

     var writer = new draw2d.io.json.Writer();
     var path = this.value;
     writer.marshal(canvas,function(json){
        fs = require('fs');
        var obj = JSON.parse(fs.readFileSync(path, 'utf8'));
        var reader = new draw2d.io.json.Reader();
        reader.unmarshal(canvas, obj);
    });
 });

    chooser.click();
},

createWindowMenu: function() {
    var gui = require('nw.gui');

        // Get the current window
        var win = gui.Window.get();

        // Create a menubar for window menu
        var menu = new gui.Menu({ type: 'menubar' });

        // File menu
        var file = new gui.Menu();

        var control = this;

        //Open          
        file.append(new gui.MenuItem({
            icon: 'images/open.png',
            label: 'Abrir (Ctrl+o)',
            click: function(){
                control.openFromFile();
            },
            key: 'o',
            modifiers: 'ctrl'
        }));

        //Save
        file.append(new gui.MenuItem({
            icon: 'images/save.png',
            label: 'Salvar (Ctrl+S)',
            click: function(){
                control.saveToFile();
            },
            key: 's',
            modifiers: 'ctrl'
        }));

        //Save as
        var saveas = new gui.Menu({ type: 'menubar' });
        //Save as image
        saveas.append(new gui.MenuItem({
            label: 'Image (.png)',
            click: function(){
                console.log('Save as png!');
            }
        }));

        file.append(new gui.MenuItem({ label: 'Salvar como...', submenu: saveas }));

        file.append(new gui.MenuItem({ type: 'separator' }));

        /* Print not supported for now
        //Print
        file.append(new gui.MenuItem({
            label: 'Imprimir',
            click: function(){
                console.log('Print!');
            }
        }));

        file.append(new gui.MenuItem({ type: 'separator' }));
        */

        //Close
        file.append(new gui.MenuItem({
            label: 'Sair',
            click: function(){
                win.close(true);
            }
        }));

        // Edit menu
        var edit = new gui.Menu();

        //Undo
        edit.append(new gui.MenuItem({
            icon: 'images/undo.png',
            label: 'Desfazer (Ctrl + Z)',
            click: function(){
                console.log('Undo!');
            }
        }));

        //Redo
        edit.append(new gui.MenuItem({
            icon: 'images/redo.png',
            label: 'Refazer (Ctrl + Y)',
            click: function(){
                console.log('Redo!');
            }
        }));

        edit.append(new gui.MenuItem({ type: 'separator' }));

        //Zoom in
        edit.append(new gui.MenuItem({
            icon: 'images/zoom_in.png',
            label: 'Aproximar',
            click: function(){
                console.log('Zoom in!');
            }
        }));

        //Zoom out
        edit.append(new gui.MenuItem({
            icon: 'images/zoom_out.png',
            label: 'Afastar',
            click: function(){
                console.log('Zoom out!');
            }
        }));

        edit.append(new gui.MenuItem({ type: 'separator' }));

        //Cut
        edit.append(new gui.MenuItem({
            icon: 'images/cut.png',
            label: 'Recortar',
            click: function(){
                console.log('Cut!');
            }
        }));

        //Copy
        edit.append(new gui.MenuItem({
            icon: 'images/copy.png',
            label: 'Copiar',
            click: function(){
                console.log('Copy!');
            }
        }));

        //Paste
        edit.append(new gui.MenuItem({
            icon: 'images/paste.png',
            label: 'Colar',
            click: function(){
                console.log('Paste!');
            }
        }));

        edit.append(new gui.MenuItem({ type: 'separator' }));

        //To front
        edit.append(new gui.MenuItem({
            icon: 'images/to_front.png',
            label: 'Trazer para frente',
            click: function(){
                console.log('To front!');
            }
        }));

        //To back
        edit.append(new gui.MenuItem({
            icon: 'images/to_back.png',
            label: 'Levar para trás',
            click: function(){
                console.log('To back!');
            }
        }));

        edit.append(new gui.MenuItem({ type: 'separator' }));

        //Clear canvas
        edit.append(new gui.MenuItem({
            icon: 'images/clean.png',
            label: 'Limpar prancheta',
            click: function(){
                console.log('Clear canvas!');
            }
        }));

        // Help menu
        var help = new gui.Menu();

        //About
        help.append(new gui.MenuItem({
            label: 'Sobre',
            click: function(){
                console.log('About!');
            }
        }));


        // You can have submenu!
        menu.append(new gui.MenuItem({ label: 'Arquivo', submenu: file}));
        menu.append(new gui.MenuItem({ label: 'Editar', submenu: edit}));
        menu.append(new gui.MenuItem({ label: 'Ajuda', submenu: help}));

        //assign the menubar to window menu
        win.menu = menu;

        // add a click event to an existing menuItem
        menu.items[0].click = function() { 
            console.log("CLICK"); 
        };
    }

});