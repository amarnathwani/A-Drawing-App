function FreehandTool(){
	//set an icon and a name for the object
	this.icon = "assets/freehand.png";
	this.name = "freehand";

	//to smoothly draw we'll draw a line from the previous mouse location
	//to the current mouse location. The following values store
	//the locations from the last frame. They are -1 to start with because
	//we haven't started drawing yet.
	var previousMouseX = -1;
	var previousMouseY = -1;

	this.draw = function(){
        
        // stroke specific to the freehand tool, push-pop to maintain its options
        push();
        
        // collect value of slider element created by pop-options, and assign a strokeWeight
        var size = document.getElementById("freehandSize").value;
        strokeWeight(size);
        
		//if the mouse is pressed, and pressed on defined canvas
		if(mouseIsPressed && mousePressOnCanvas(select("#content"))){
            
			//check if they previousX and Y are -1. set them to the current
			//mouse X and Y if they are.
			if (previousMouseX == -1){
				previousMouseX = mouseX;
				previousMouseY = mouseY;
			}
			//if we already have values for previousX and Y we can draw a line from 
			//there to the current mouse location
			else{
				line(previousMouseX, previousMouseY, mouseX, mouseY);
				previousMouseX = mouseX;
				previousMouseY = mouseY;
			}   
		}
        
		//if the user has released the mouse we want to set the previousMouse values 
		//back to -1.
		else{
			previousMouseX = -1;
			previousMouseY = -1;
		}
        
        pop();
	}
    
    this.populateOptions = function() {
        // slider for size, returns value to size with getelementbyid.value
        
        select(".options").html(
			"<label style='color:black;font-size:20' for='freehandSize'>Marker Size</label> <input type='range' min='1' max='25' value='1' class='slider' id='freehandSize'>");
	}
}