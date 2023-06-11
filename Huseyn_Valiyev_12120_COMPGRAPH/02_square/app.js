window.onload = function() {
    let canvas = document.getElementById('webgl-canvas');

    let gl = WebGLUtils.setupWebGL(canvas);
    if (!gl) { 
        alert("Couldn't setup WebGL"); 
        return; 
    }

    let program = initShaders(gl, 'vertex-shader', 'fragment-shader');
    gl.useProgram(program);

    // Define the vertices of the square
    let vertices = [
        -0.5, -0.5,  
        0.5, -0.5,  
        -0.5, 0.5,  
        0.5, 0.5   
    ];

    // Create a buffer object to store the vertices
    let buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    // Associate shader variables with the buffer object
    let position = gl.getAttribLocation(program, 'position');
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(position);

    // Set the clear color and clear the canvas
    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Render the square based on the selected rendering mode
    renderSquare(gl.TRIANGLE_STRIP);
};

function renderSquare(renderMode) {
    let gl = document.getElementById('webgl-canvas').getContext('webgl');

    // Clear the canvas
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Check the rendering mode and draw the square accordingly
    if (renderMode === gl.TRIANGLE_STRIP) {
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    } else if (renderMode === gl.TRIANGLE_FAN) {
        gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
    }
}
