function rectTool(){
	this.icon = "assets/rect.png";
	this.name = "rect";

    // drawing false, initiate draw frame when pressed
	var startMouseX = -1;
	var startMouseY = -1;
	var drawing = false;

	this.draw = function(){

        // if mouse pressed, drawing true, loadpixels to avoid drawing each frame
		if(mouseIsPressed){
        
			if(startMouseX == -1){
				startMouseX = mouseX;
				startMouseY = mouseY;
				drawing = true;
				loadPixels();
			}

            // when mouse is let go, draw rectangle with final coordinates
            // defined by the difference between origin and final location
			else{
				updatePixels();
				rect(startMouseX, startMouseY, mouseX - startMouseX, mouseY - startMouseY);
			}

		}

        // reset mouseX and mouseY when not drawing
		else if(drawing){
			drawing = false;
			startMouseX = -1;
			startMouseY = -1;
		}
	};
    
    this.populateOptions = function() {
        // clear options, similar to unselectOptions, here for special cases when switching from tools without the function
        
        select(".options").html("");
	}


}