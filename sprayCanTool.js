function sprayCanTool() {
    
    this.name = "sprayCanTool";
    this.icon = "assets/spray.png";
    // initial "spread"
    this.points = 13;
    this.spread = 10;
        
    this.draw = function() {
        
        var spread = document.getElementById("spraySpread").value;
        var speed = document.getElementById("spraySpeed").value;
        //if the mouse is pressed paint on the canvas
        //spread describes how far to spread the paint from the mouse pointer
        //points holds how many pixels of paint for each mouse press.
        if(mouseIsPressed && mousePressOnCanvas(select("#content"))){
            for(var i = 0; i < this.points * speed; i++){
                // points are spread by 10, scaled by size received from slider (1-10)
                // spreads the spray out, does not increase size of points
                point(random(mouseX-this.spread * spread, mouseX + this.spread * spread), 
                    random(mouseY-this.spread * spread, mouseY+this.spread * spread));
            }
        }
    }
    
    this.populateOptions = function() {
        // slider for spread, returns value to size with getelementbyid.value
        
        select(".options").html(
			"<label style='color:black;font-size:20' for='spraySpread'>Spray Can Spread</label> <input type='range' min='1' max='10' value='1' class='slider' id='spraySpread'> <label style='color:black;font-size:20' for='spraySpeed'>Spray Speed</label> <input type='range' min='0.1' max='3.1' value='0.1' class='slider' id='spraySpeed'>");
	}
}