var _defaults = {};

function MLGraph(options) {
  this.options = options || _defaults;
}

/**
 *  Set the renderer.  This replaces any previously set renderer.
 *  TODO:  handle if this is called after something has been rendered
 *  @param {MLGraphRenderer} r the renderer instance
 */
MLGraph.prototype.setRenderer = function(r) {
  this.renderer = r;
};

MLGraph.prototype.enforceRenderer = function() {
  if (!this.renderer) {
    throw 'MLGraph ERROR: no renderer provided';
  }
};


/**
 *  We draw an object on the screen.  We require at least a URI or some other ID.  Optional data can be provided to further influence the rendering.
 *  @param {string} uri an identifier, most likely a uri or some other guid
 *  @param {object=} data an optional object containing further data about the object.
 *  @returns {object} returns a reference to the object drawn, or null if nothing was drawn
 */
MLGraph.prototype.addObject = function(uri, data) {
  this.enforceRenderer();
  this.renderer.addObject.apply(this.renderer,arguments);
};

MLGraph.prototype.connect = function(uriFrom, uriTo, connection) {
  this.enforceRenderer();
  this.renderer.connect.apply(this.renderer, arguments);
}