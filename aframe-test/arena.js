AFRAME.registerComponent("arena", {
    schema : {
        manifest : { type: 'asset'},
        sky : {type: 'selector'},
        videoSphere : {type: 'selector'},
        cursor : {type: 'selector'}
    },
    helpers : {
        fadeIn : function(el, t){

        },
        fadeOut : function(el, t){

        }
    },
    init: function(){
        var self = this;

        new THREE.FileLoader().load(self.data.manifest, function(json){
           self.initManifest(JSON.parse(json)); 
        });

        self.el.sceneEl.add

    },
    initManifest : function(manifest){
        var startPlace = manifest.places[manifest.startPlace];

        this.loadPlace(startPlace);
    },
    loadPlace : function(place){
        
        var scene = this.el.sceneEl;

        // set staticImage background
        // load video

        if (place.video != null){
            this.data.videoSphere.setAttribute("src", place.video);
            this.data.videoSphere.setAttribute("visible", true);

            this.data.sky.setAttribute("visible", false);
        }
        

        // start playback of video

        // place things in scene
        var thing;
        var thingEntity;
        for(var i = 0; i < place.things.length; ++i){
            thing = place.things[i];
            thingEntity = document.createElement('a-entity');
            
            thingEntity.setAttribute("thing", {
                kind: thing.kind,
                payload : JSON.stringify(thing.payload)
            });

            scene.appendChild(thingEntity);
        }
    }
})