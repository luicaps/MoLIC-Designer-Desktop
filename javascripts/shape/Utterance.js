/**
 * @class molic.shape.Utterance
 * 
 * A Connection with a label which sticks in the middle of the connection.
 *
 * @author luicaps
 * @extend draw2d.Connection
 */
molic.shape.Utterance = draw2d.Connection.extend({

    NAME : "molic.shape.Utterance",

    init:function(attr) {
        this._super(attr);

        // Create any Draw2D figure as decoration for the connection
        //
        this.utterance = new draw2d.shape.basic.Label({
            text:"d: Transition",
            color:null,
            fontColor:"#000000",
            bgColor:"#ffffff"
        });
 
        // add the new decoration to the connection with a position locator.
        //
        this.add(this.utterance, new draw2d.layout.locator.ManhattanMidpointLocator());

        // Register a label editor with a dialog
        //
        this.utterance.installEditor(new draw2d.ui.LabelInplaceEditor());

        var arrow = new draw2d.decoration.connection.ArrowDecorator(8,8);
        arrow.setBackgroundColor("#000000");
        this.setTargetDecorator(arrow);

        this.attr({
            router:new draw2d.layout.connection.InteractiveManhattanConnectionRouter(),
            outlineStroke:0,
            stroke:2
        });
    },
 
    /**
     * @method
     * Set the utterance of the connection
     * 
     * @param {String} utterance
     */
    setUtterance: function (utterance) {
        this.utterance.setText(utterance);
        return this;
    },
 
 
    /**
     * @method
     * Return the utterance of the connection
     * 
     */
    getUtterance: function () {
        return this.utterance.getText();
    }
});