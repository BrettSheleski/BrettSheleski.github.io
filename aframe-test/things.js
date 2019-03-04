AFRAME.registerComponent("thing", {
    schema: {
        "kind" : {type: "string"},
        "payload" :{type: "string"}
    },
    init: function(){

        var payload = JSON.parse(this.data.payload);

        switch(this.data.kind){
            case "navigation":
                this.el.setAttribute("thing-navigation", payload);
                break;
            default:
                break;
        }
    }
});


AFRAME.registerComponent("thing-navigation", {
    schema : {
        position: {type: "vec3"},
        rotation: {type: "vec3", default: {"x": 0, "y": 0, "z": 0}},
        scale: {type: "vec3", default: {"x": 1, "y": 1, "z": 1}},
        title: {type: "string" },
        place : {type: "string"},
        image: {type: "string"}
    },
    init: function(){
        var self = this;
        this.el.addEventListener('click', function (evt) {
            self.onClick();
        });

        self.el.classList.add("clickable")

        self.el.setAttribute("geometry", {
            primitive: "sphere"
        })
        
        self.el.setAttribute("scale", this.data.scale);
        self.el.setAttribute("rotation", this.data.rotation);
        self.el.setAttribute("position", this.data.position);
        self.el.setAttribute("material", {src: this.data.image});
    },
    onClick: function(){
        alert("click");
    }
});

AFRAME.registerComponent('play-on-vrdisplayactivate-or-enter-vr', {
    init: function () {
      this.playVideo = this.playVideo.bind(this);
      this.playVideoNextTick = this.playVideoNextTick.bind(this);
    },
    play: function () {
      window.addEventListener('vrdisplayactivate', this.playVideo);
      this.el.sceneEl.addEventListener('enter-vr', this.playVideoNextTick);
    },
    pause: function () {
      this.el.sceneEl.removeEventListener('enter-vr', this.playVideoNextTick);
      window.removeEventListener('vrdisplayactivate', this.playVideo);
    },
    playVideoNextTick: function () {
      setTimeout(this.playVideo);
    },
    playVideo: function () {
      var video = this.el.components.material.material.map.image;
      if (!video) { return; }
      video.play();
    }
  });