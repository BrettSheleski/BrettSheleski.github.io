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