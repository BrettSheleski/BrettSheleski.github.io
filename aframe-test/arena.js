AFRAME.registerComponent("arena", {
    schema : {
        manifest : { type: 'asset'}
    },
    init: function(){
        var self = this;

        new THREE.FileLoader().load(self.data.manifest, function(json){
           self.initManifest(JSON.parse(json)); 
        });

    },
    initManifest : function(manifest){
        var startPlace = manifest.places[manifest.startPlace];

        this.loadPlace(startPlace);
    },
    loadPlace : function(place){
        
        // set staticImage background
        // load video
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