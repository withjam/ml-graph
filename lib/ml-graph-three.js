var THREE = window.THREE;

function MLGraphThree(options) {
  var container, doc = document, win = window, self = this;
  options = options || {};

  this.image = document.createElement( 'img' );
  this.image.src = 'textures/sprite.png';

  this.ready = false;
  this.image.addEventListener( 'load', function ( event ) { self.ready = true; console.log('ready') });

  var camera = this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 5000 );
  camera.position.set( 600, 400, 1500 );
  camera.lookAt( new THREE.Vector3() );

  this.scene = new THREE.Scene();

  var renderer = this.renderer = new THREE.CSS3DRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.domElement.style.position = 'absolute';
  document.getElementById( 'mlgraph' ).appendChild( renderer.domElement );

  //var controls = this.controls = new THREE.TrackballControls( camera, renderer.domElement );
  //controls.rotateSpeed = 0.5;

  var controls = this.controls = new THREE.OrbitControls( camera );
  controls.damping = 0.4;
  //controls.addEventListener( 'change', render );

  window.addEventListener( 'resize', function() {
    self.camera.aspect = window.innerWidth / window.innerHeight;
    self.camera.updateProjectionMatrix();

    self.renderer.setSize( window.innerWidth, window.innerHeight );
  }, false );

  render(this);
};

// internal function that binds rendering to an instance of MLGraphThree
function render(inst) {
  function instRender() {
    inst._update();
    inst.controls.update();
    inst.renderer.render( inst.scene, inst.camera );   
    window.requestAnimationFrame( instRender ); 
  }
  instRender();
}

MLGraphThree.prototype.isMLGraphRenderer = true;
MLGraphThree.prototype._objects = [];

// invoked each iteration of render
MLGraphThree.prototype._update = function() {
  var self = this, obj, i = self._objects.length;
  while (i--) {
    obj = self._objects[i];
    if (obj._onRender) {
      obj._onRender.call(obj);
    }
  }
}

MLGraphThree.prototype.addObject = function(uri, data) {
  while (!this.ready) { 
    var self = this;
    console.log('waiting for ready');
    setTimeout(function() {
      self.addObject.apply(self, arguments);
    }, 50);
    return;
  }
  console.log('cloning ', this.image);
  var object = new THREE.CSS3DSprite( this.image.cloneNode() );
  object.position.x = Math.random() * 4000 - 2000;
  object.position.y = Math.random() * 4000 - 2000;
  object.position.z = Math.random() * 4000 - 2000;
  console.log('adding object', object);
  this.scene.add( object );

  this._objects.push( object );
}

MLGraphThree.prototype.connect = function(uri1,uri2,connection) {

}