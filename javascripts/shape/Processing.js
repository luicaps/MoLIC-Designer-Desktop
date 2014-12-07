/**
 * @class molic.shape.Processing
 * 
 * Black rectangle
 *
 * @author luicaps
 * @extends draw2d.shape.basic.Rectangle
 */
molic.shape.Processing = draw2d.shape.basic.Rectangle.extend({

    NAME : "molic.shape.Processing",

    DEFAULT_COLOR : new draw2d.util.Color("#000000"),

    init: function(attr, setter, getter ) {
        this._super(attr);

        var northPort = this.createPort("hybrid", new draw2d.layout.locator.TopLocator(this));
        this.northPort = northPort;
        this.northPort.setConnectionAnchor(new draw2d.layout.anchor.ChopboxConnectionAnchor(this.northPort));

        this.northPort.getConnectionDirection = function(conn, relatedPort){ 
            return northPort.getParent().getBoundingBox().getDirection(relatedPort.getAbsolutePosition());
        };

        this.setDimension(25, 25);
        this.setBackgroundColor(this.DEFAULT_COLOR);
        this.installEditPolicy(new draw2d.policy.figure.AntSelectionFeedbackPolicy());

        this.setStroke(0);
    }
});