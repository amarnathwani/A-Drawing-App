function eraserTool() {
    // set an icon and name for the object
    this.icon = "assets/eraser.png";
    this.name = 'eraser';
    this.size = 30;
    this.color = 255;
    
    // erasing will work a lot like the freehand tool with the added quality of it being an ellipse
	var previousMouseX = -1;
	var previousMouseY = -1;
    
    this.draw = function(){
        
        // style specific to eraser, collected size value from slider
        push();
        var eraserSize = document.getElementById("eraserSize").value;
        updatePixels();
        
        // when we're hovering, draw an ellipse to indicate size and state, remove when erasing
        if(!mouseIsPressed) {
            push();
            fill(255);
            ellipse(mouseX, mouseY, this.size * eraserSize);
            pop();
        }

        
		//if the mouse is pressed on canvas
		if(mouseIsPressed && mousePressOnCanvas(select("#content"))){
			//check if they previousX and Y are -1. set them to the current
			//mouse X and Y if they are
			if (previousMouseX == -1){
				previousMouseX = mouseX;
				previousMouseY = mouseY;
			}
			//if we already have values for previousX and Y we can draw white a ellipse at mouseX and Y
			//there to the current mouse location
                push();
                // fill ellipse with white, no stroke (erase), then load the frame once again
                fill(this.color);
                noStroke();
                ellipse(mouseX, mouseY, this.size * eraserSize);
                previousMouseX = mouseX;
                previousMouseY = mouseY;
                loadPixels();
                pop();
			}
		//if the user has released the mouse we want to set the previousMouse values 
		//back to -1
		else{
			previousMouseX = -1;
			previousMouseY = -1;
		}
        
        pop();
    }
    
    this.populateOptions = function() {
        // slider for size
        select(".options").html(
			"<label style='color:black;font-size:20' for='eraserSize'>Eraser Size</label> <input type='range' min='2' max='5' value='2' class='slider' id='eraserSize'>");
	}
}