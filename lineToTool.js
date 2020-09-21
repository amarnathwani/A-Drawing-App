function LineToTool(){
	this.icon = "assets/line.png";
	this.name = "LineTo";

    // Mouse X and Y start -1 pixel behind our pointer, and a drawing variable is initialised to false, setting it to wait for the user's first click to begin the line.
	var startMouseX = -1;
	var startMouseY = -1;
	var drawing = false;

	this.draw = function(){
        
        // strokeWeight specific to linTo tool, push-pop to preserve styling
        push();
        var size = document.getElementById("lineToSize").value;
        strokeWeight(size);

        // Initial coordinate logged and drawing variable set to true, the tool will now construct a line from our point (startMouseX and Y) to where the user ends the press. loadPixels allows us to save the current canvas so we can use it later. 
		if(mouseIsPressed && mousePressOnCanvas(select("#content"))){
			if(startMouseX == -1){
				startMouseX = mouseX;
				startMouseY = mouseY;
				drawing = true;
				loadPixels();
			}

            // User ends click at second location and updatePixels updates the canvas reloading our canvas before the tool was used, with a line from our first coordinates to the mouseX and Y.
			else{
				updatePixels();
				line(startMouseX, startMouseY, mouseX, mouseY);
			}

		}

        // drawing is a state in which the line tool is deactivated. For instance, when another tool is selected.
		else if(drawing){
			drawing = false;
			startMouseX = -1;
			startMouseY = -1;
		}
        
        pop();
	};


    this.populateOptions = function() {
        // slider for size, add label to indicate what the slider does
        select(".options").html(
			"<label style='color:black;font-size:20' for='lineToSize'>Line Size</label> <input type='range' min='1' max='25' value='1' class='slider' id='lineToSize'>");
	}
    
}
