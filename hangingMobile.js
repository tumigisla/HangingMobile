var canvas, gl;

var theta = [0, 0, 0];

var movement = false;     // Do we rotate?
var spinX = 0,
    spinY = 0;
var origX, origY;

var zDist = -9.5;

var proLoc, mvLoc;

var g_ctm = mat4();

var program;

var rotations = [0.0, 0.0, 0.0, 0.0],
    rotSpeeds = [0.5, 0.5, 0.5, 0.5];

var internalRot = 0.0,
    internalRotSpeed = 0.5;

var setup = function() {
    canvas = document.getElementById("gl-canvas"),
    gl = WebGLUtils.setupWebGL(canvas);

    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0.73, 0.74, 0.75, 1.0);  // Only one shade of grey

    gl.enable(gl.DEPTH_TEST);

    //  Load shaders and initialize attribute buffers
    program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    proLoc = gl.getUniformLocation(program, "projection");
    mvLoc = gl.getUniformLocation(program, "modelview");

    entityManager.buildShapes();
    entityManager.loadToGPU();

    addEventListeners();
};

////////////

var updateSimulation = function(du) {
    entityManager.update(du);
};

var renderSimulation = function() {
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    var proj = perspective( 50.0, 1.0, 0.2, 100.0 );
    gl.uniformMatrix4fv(proLoc, false, flatten(proj));

    g_ctm = mat4();
    g_ctm = lookAt(vec3(0.0, 0.0, zDist), vec3(0.0, 0.0, 0.0), vec3(0.0, 1.0, 0.0));
    g_ctm = mult(g_ctm, rotate(parseFloat(spinX), [1, 0, 0]));
    g_ctm = mult(g_ctm, rotate(parseFloat(spinY), [0, 1, 0]));

    entityManager.render();
};

// Start the simulation
setup();
main.init();
