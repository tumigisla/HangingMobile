var addEventListeners = function() {
    // Event listeners for mouse
    canvas.addEventListener("mousedown", function(e){
        movement = true;
        origX = e.offsetX;
        origY = e.offsetY;
        e.preventDefault();     // Disable drag and drop
    } );

    canvas.addEventListener("mouseup", function(e){
        movement = false;
    } );

    canvas.addEventListener("mousemove", function(e){
        if(movement) {
            spinY = ( spinY + (e.offsetX - origX) ) % 360;
            spinX = ( spinX + (origY - e.offsetY) ) % 360;
            origX = e.offsetX;
            origY = e.offsetY;
        }
    } );

    // Event listener for keyboard
     window.addEventListener("keydown", function(e){
         switch( e.keyCode ) {
            case 38:    // up arrow
                zDist += 0.1;
                break;
            case 40:    // down arrow
                zDist -= 0.1;
                break;
         }
     }  );

    // Event listener for mousewheel
     window.addEventListener("mousewheel", function(e){
         if( e.wheelDelta > 0.0 ) {
             zDist += 0.1;
         } else {
             zDist -= 0.1;
         }
     }  );

     // First level rotation slide onchange
     document.getElementById("firstLevelSlide").onchange = function() {
         rotSpeeds[0] = event.srcElement.value;
     };

     // Second level rotation slide onchange
     document.getElementById("secondLevelSlide").onchange = function() {
         rotSpeeds[1] = event.srcElement.value;
     };

     // Third level rotation slide onchange
     document.getElementById("thirdLevelSlide").onchange = function() {
         rotSpeeds[2] = event.srcElement.value;
     };

     // Fourth level rotation slide onchange
     document.getElementById("fourthLevelSlide").onchange = function() {
         rotSpeeds[3] = event.srcElement.value;
     };

     // Internal rotation slide onchange
     document.getElementById("internalRotSlide").onchange = function() {
         internalRotSpeed = event.srcElement.value;
     };
};
