/**
 * @class molic.shape.Breakdown
 * 
 * This is a simple Connection based on the Utterance connection, simply changing the line of the connection to dashed.
 *
 * @author luicaps
 * @extend molic.shape.Utterance
 */
molic.shape.Breakdown = molic.shape.Utterance.extend({
    
    NAME : "molic.shape.Breakdown",
    
    init:function(attr) {
        this._super(attr);
        this.setDashArray("-.");
    }
});