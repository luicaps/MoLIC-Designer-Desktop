/**
 * @class molic.shape.Scene
 * 
 * Vertical layout with a top label, a 1px height rectangle representing a line, and a bottom label
 *
 * @author luicaps
 * @extends draw2d.shape.layout.VerticalLayout
 */
molic.shape.Scene = draw2d.shape.layout.VerticalLayout.extend({

    NAME: "molic.shape.Scene",

    init : function() {
        this._super();

        var northPort = this.createPort("hybrid", new draw2d.layout.locator.TopLocator(this));
        this.northPort = northPort;
        this.northPort.setConnectionAnchor(new draw2d.layout.anchor.ChopboxConnectionAnchor(this.northPort));
        
        this.northPort.getConnectionDirection = function(conn, relatedPort){ 
            return northPort.getParent().getBoundingBox().getDirection(relatedPort.getAbsolutePosition());
        };

        this.setCssClass("activity");
        this.setBackgroundColor("#ffffff");

        // UI representation
        this.setStroke(2);
        this.setColor("#000000");
        this.setRadius(3);

        // Compose the top row of the shape
        var top = this.createLabel("Topic").setStroke(0);
        this.topic = top;

        // the middle part of the shape
        // This part contains the ports for the connection
        var center =new draw2d.shape.basic.Rectangle();
        center.getHeight= function(){return 1;};
        center.setMinWidth(90);
        center.setColor("#000000");

        // the bottom of the activity shape
        var bottom = this.createLabel("d+u: ..."); 
        this.dialogue = bottom;
        bottom.setMinHeight(30);
        bottom.setStroke(0);
        bottom.setBackgroundColor(null);

        this.topic.installEditor(new draw2d.ui.LabelInplaceEditor());
        this.dialogue.installEditor(new draw2d.ui.LabelInplaceEditor());

        // finally compose the shape with top/middle/bottom in VerticalLayout
        this.add(top, new draw2d.layout.locator.CenterLocator(this));
        this.add(center);
        this.add(bottom);
    },
 
    /**
     * @method
     * Set the scene's Topic
     *
     * @param {String} topic
     */
    setTopic: function (topic) {
        this.topic.setText(topic);
        return this;
    },
 
    /**
     * @method
     * Return the topic of the scene
     */
    getTopic: function () {
        return this.topic.getText();
    },
 
    /**
     * @method
     * Set the scene's dialogue
     * @param {String} dialogue
     */
    setDialogue: function (dialogue) {
        this.dialogue.setText(dialogue);
        return this;
    },
 
 
    /**
     * @method
     * Return the dialogue of the scene
     */
    getDialogue: function () {
        return this.dialogue.getText();
    },
 
 
    /**
     * @method
     * helper method to create some labels
     * 
     * @param {String} txt the label to display
     * @returns {draw2d.shape.basic.Label}
     * @private
     */
    createLabel: function(txt){
        var label =new draw2d.shape.basic.Label({text:txt});
        label.setStroke(1);
        label.setRadius(0);
        label.setBackgroundColor(null);
        label.setPadding(5);
        label.setColor(this.bgColor.darker(0.2));
        label.onDoubleClick=function(angle){/* ignore them for the layout elements*/};
        return label;
    },
 
    /**
     * @method 
     * Return an objects with all important attributes for XML or JSON serialization
     * 
     * @returns {Object}
     */
    getPersistentAttributes : function() {
        var memento = this._super();
        memento.topic = this.getTopic();
        memento.dialogue = this.getDialogue
        delete memento.radius;
        return memento;
    },

    /**
     * @method 
     * Read all attributes from the serialized properties and transfer them into the shape.
     * 
     * @param {Object} memento
     * @returns 
     */
    setPersistentAttributes : function(memento) {
        this._super(memento);
        try {
            this.setTopic(memento.topic);
            this.setDialogue(memento.dialogue);
        } catch(exc) {}
    }
});
