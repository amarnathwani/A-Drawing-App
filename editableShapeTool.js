function editableShapeTool(){
	this.icon = "assets/shapes.png";
	this.name = "editableshape";

	var startMouseX = -1;
	var startMouseY = -1;
    var currentShape = [];
    var editMode = false;

	this.draw = function(){
        
        // stroke specific to editable shape tool
        push();
        
        // we don't want to draw each shape in frame during this process
        updatePixels();
        
        // stroke collected from slider and assigned to strokeWeight
        var size = document.getElementById("freehandSize").value;
        strokeWeight(size);

        // if mouse pressed on canvas, using our own function
        if(mousePressOnCanvas(select("#content")) && mouseIsPressed){
            
            // if not in edit mode, add to the currrent shape array our mouse position at time of click
            if(!editMode) {
                currentShape.push({x: mouseX, y: mouseY});
            } else {
                // in edit mode, allow us to move around each vertex if our mouse is close enough, and snap vertices to each other
                for(var i = 0; i < currentShape.length; i++) {
                    if(dist(currentShape[i].x, currentShape[i].y, mouseX, mouseY) < 35) {
                        currentShape[i].x = mouseX;
                        currentShape[i].y = mouseY;
                    }
                }
            }
            
        }
        
        // our editable shape
        beginShape();
        push();
        noFill();
        // for each vertex created, draw an ellipse over it in edit mode
        for(var i = 0; i < currentShape.length; i++){
            vertex(currentShape[i].x, currentShape[i].y);
            
            if(editMode) {
                // fill ellipse in with tomato but don't fill our editable shape
                fill("tomato");
                ellipse(currentShape[i].x, currentShape[i].y, 10 * (constrain(size, 1, 5)));
                noFill();
            }
            
        }
        endShape(); 
        pop();
        
        // end of strokeWeight styling controlling the thickness of our shape
        pop();
	}
    
            
    // unselect tool to clear options as we select another function
	this.unselectTool = function() {
		updatePixels();
		//clear options
		select(".options").html("");
	};
    
	this.populateOptions = function() {
        // creating a button for edit mode and finish shape, and a slider for size
		select(".options").html(
			"<button class='button' id='editButton'>Edit Mode</button> <button class='button' id='finishShape'>Finish Shape</button> <label style='color:black;font-size:20;padding-left: 35px;' for='freehandSize'>Line Size</label> <input type='range' min='1' max='15' value='1' class='slider' id='freehandSize'>");
        
		// click handler, finish shape clears current shape array, sets editMode to false and calls draw() to set the image
        select("#finishShape").mouseClicked(function() {
            var button = select("#" + this.elt.id);
            editMode = false;
            select("#editButton").html("Edit Shape");
            draw();
            loadPixels();
            currentShape = [];
        });
        
        // click handler, if edit mode, switch to add vertices and vice-versa
		select("#editButton").mouseClicked(function() {
            var button = select("#" + this.elt.id);
			if (editMode) {
                editMode = false;
                button.html("Edit Shape");
            } else {
                editMode = true;
                button.html("Add Vertices");
            }
		}); 
        
    };
    
             
        
};
    


