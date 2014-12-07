/**
 * @class molic.shape.Ubiquitous
 * 
 * Gray rectangle created by a VerticalLayout (could be a Rectangle)
 *
 * @author luicaps
 * @extends draw2d.shape.layout.VerticalLayout
 */
molic.shape.Ubiquitous = draw2d.shape.layout.VerticalLayout.extend({

    NAME: "molic.shape.Ubiquitous",

    init: function(attr, setter, getter ) {
        this._super(attr);

        var northPort = this.createPort("hybrid", new draw2d.layout.locator.TopLocator(this));
        this.northPort = northPort;
        this.northPort.setConnectionAnchor(new draw2d.layout.anchor.ChopboxConnectionAnchor(this.northPort));

        this.northPort.getConnectionDirection = function(conn, relatedPort){ 
            return northPort.getParent().getBoundingBox().getDirection(relatedPort.getAbsolutePosition());
        };
        
        this.setBackgroundColor("#ecf0f1");

        // UI representation
        this.setStroke(2);
        this.setColor("#bdc3c7");
        this.setRadius(3); 
        this.setDimension(100, 40);
    }
});