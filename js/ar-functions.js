/* global AFRAME, THREE */

AFRAME.registerComponent("play-on-detection", {
  init: function () {
    var vid = this.el.getAttribute('material').src;

    this.el.sceneEl.addEventListener("markerFound", (e) => {
      
      vid.play();

    });

    this.el.sceneEl.addEventListener("markerLost", (e) => {
      vid.pause();
    });

  }

});

AFRAME.registerComponent("move-object-one", {
  schema: {
    enabled: { default: true}
  },

  init: function () {
    this.changePosition = this.changePosition.bind(this);
    this.pos = this.el.getAttribute("position");
    
    this.isVisible = false;

    this.el.sceneEl.addEventListener("markerFound", (e) => {
        this.isVisible = true;
    });

    this.el.sceneEl.addEventListener("markerLost", (e) => {
        this.isVisible = false;
    });

  },

  update: function (){
    if(this.data.enabled){
      this.el.sceneEl.addEventListener("onefingermove", this.changePosition);
    } else {
      this.el.sceneEl.removeEventListener("onefingermove", this.changePosition);
    }
  },

  changePosition: function(event){
    if(this.isVisible){
      

      this.pos.z -= (event.detail.positionChange.y * 200)*-1;
      this.pos.x += (event.detail.positionChange.x * 200);

      this.el.setAttribute("position", this.pos);

    }
  }

});

AFRAME.registerComponent("move-object-three", {
  schema: {
    enabled: { default: true}
  },

  init: function () {
    this.changePosition = this.changePosition.bind(this);
    this.pos = this.el.getAttribute("position");
    
    this.isVisible = false;

    this.el.sceneEl.addEventListener("markerFound", (e) => {
        this.isVisible = true;
    });

    this.el.sceneEl.addEventListener("markerLost", (e) => {
        this.isVisible = false;
    });

  },

  update: function (){
    if(this.data.enabled){
      this.el.sceneEl.addEventListener("threefingermove", this.changePosition);
    } else {
      this.el.sceneEl.removeEventListener("threefingermove", this.changePosition);
    }
  },

  changePosition: function(event){
    if(this.isVisible){
      

      this.pos.z -= (event.detail.positionChange.y * 200)*-1;
      this.pos.x += (event.detail.positionChange.x * 200);

      this.el.setAttribute("position", this.pos);

    }
  }

});

AFRAME.registerComponent("object-scale", {
    schema: {
      enabled: { default: true },
      rotationFactor: { default: 5 },
      minScale: { default: 0.3 },
      maxScale: { default: 8 },
    },
  
    init: function () {
      this.handleScale = this.handleScale.bind(this);
  
      this.isVisible = false;
      this.initialScale = this.el.object3D.scale.clone();
      this.scaleFactor = 1;
      this.el.object3D.rotationOrder = 'XYZ';

  
      this.el.sceneEl.addEventListener("markerFound", (e) => {
        this.isVisible = true;
      });
  
      this.el.sceneEl.addEventListener("markerLost", (e) => {
        this.isVisible = false;
      });
    },
  
    update: function () {
      if (this.data.enabled) {
        this.el.sceneEl.addEventListener("twofingermove", this.handleScale);
      } else {
        this.el.sceneEl.removeEventListener("twofingermove", this.handleScale);
      }
    },
  
    remove: function () {
      this.el.sceneEl.removeEventListener("twofingermove", this.handleScale);
    },
  
    handleScale: function (event) {
      if (this.isVisible) {
        this.scaleFactor *=
          1 + event.detail.spreadChange / event.detail.startSpread;
  
        this.scaleFactor = Math.min(
          Math.max(this.scaleFactor, this.data.minScale),
          this.data.maxScale
        );
  
        this.el.object3D.scale.x = this.scaleFactor * this.initialScale.x;
        this.el.object3D.scale.y = this.scaleFactor * this.initialScale.y;
        this.el.object3D.scale.z = this.scaleFactor * this.initialScale.z;
      }
    },
  });
