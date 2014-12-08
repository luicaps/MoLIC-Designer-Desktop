molic.policy.KeyboardPolicy = draw2d.policy.canvas.KeyboardPolicy.extend({

    NAME : "molic.policy.KeyboardPolicy",
    
    /**
     * @constructor 
     */
    init: function(scope){
        this._super();
        console.log('constructed');
        this.scope = scope;
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
                case 86: // V : Paste
                    if(this.copy) {

                    }
                case 83: // S : Save
                    console.log('save!');
                    break;
                case 79: // O : Open
                    console.log('open!');
                    break;
            }
        }
        else{
           this._super(canvas, keyCode, shiftKey, ctrlKey);
        }
    }

});