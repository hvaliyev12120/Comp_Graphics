window.onload = function() {
    let canvas = document.getElementById('webgl-canvas');

    let gl = WebGLUtils.setupWebGL(canvas);
    if (!gl) { 
        alert("WebGL initialization failed"); 
        return; 
    }

    let program = initShaders(gl, 'vertex-shader', 'fragment-shader');
    gl.useProgram(program);

    // Define the vertices of the triangle
    let vertices = [
        -0.5, -0.5,
        0.5, -0.5,
        0.0, 0.5
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

    // Generate a random color
    let randomColor = getRandomColor();

    // Set the uniform color in the fragment shader
    let uniformColor = gl.getUniformLocation(program, 'uniformColor');
    gl.uniform4fv(uniformColor, randomColor);

    // Draw the triangle
    gl.drawArrays(gl.TRIANGLES, 0, 3);
};

function getRandomColor() {
    // Generate random color components between 0 and 1
    let red = Math.random();
    let green = Math.random();
    let blue = Math.random();
    let alpha = 1;  //We are setting opacity value to 1 (fully opaque)

    return [red, green, blue, alpha];
}