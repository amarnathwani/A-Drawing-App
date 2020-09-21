function mousePressOnCanvas(canvas) {
    // ensure mouse interaction triggers when it is inside the drawing area, defined inside id #content
    if(mouseX > canvas.elt.offsetLeft &&
      mouseX < (canvas.elt.offsetLeft + canvas.width) &&
      mouseY > canvas.elt.offsetTop &&
      mouseY < (canvas.elt.offsetTop + canvas.height - 35)) {
        return true;
    }
    
    return false;

};