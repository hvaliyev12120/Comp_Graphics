window.onload = function() {

  // Retrieve the canvas element -->
  let canvas = document.getElementById('webgl-canvas');
  let gl = WebGLUtils.setupWebGL(canvas);
  if (!gl) { 
    alert("WebGL initialization failed"); 
    return; 
  }

  // Initialize shaders and use the program --> 
  let program = initShaders(gl, 'vertex-shader', 'fragment-shader');
  gl.useProgram(program);

  // Create a buffer -->
  let buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, 100 * 2 * Float32Array.BYTES_PER_ELEMENT, gl.DYNAMIC_DRAW); // Increase buffer size

  // Get the attribute location for vertex position -->
  let position = gl.getAttribLocation(program, 'position');
  gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(position);

  // Get the uniform location for color -->
  let uniformColor = gl.getUniformLocation(program, 'uniformColor');

  // Arrays to store colors and triangles -->
  let colors = [];
  let triangles = [];
  


  // Event listener for canvas click -->
  canvas.addEventListener('click', function(event) {
    let x = event.clientX - canvas.getBoundingClientRect().left;
    let y = event.clientY - canvas.getBoundingClientRect().top;

    
    // Store the clicked coordinates as vertices --> 
    triangles.push(x, y);


    // Check if a triangle is completed -->
    if (triangles.length % 6 === 0) {
      // Convert pixel vertices to clip space:
      let clipVertices = pixelToClip2D(triangles);

      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(clipVertices), gl.DYNAMIC_DRAW);

       // Generate a random color for the current triangle
      let currentColor = getRandomColor();
      colors.push(currentColor);

      // Clear the canvas
      gl.clear(gl.COLOR_BUFFER_BIT);

      // Draw all the triangles with their respective colors
      for (let i = 0; i < colors.length; i++) {
        gl.uniform4fv(uniformColor, colors[i]);
        gl.drawArrays(gl.TRIANGLES, i * 3, 3);
      }
    }
  });

  gl.clearColor(0, 0, 0, 1);
  gl.clear(gl.COLOR_BUFFER_BIT);
};

  
  function getRandomColor() {
    let red = Math.random();
    let green = Math.random();
    let blue = Math.random();
    let alpha = 1; //We are setting opacity value to 1 (fully opaque)
  
    return [red, green, blue, alpha]; //and we are returning it
  }
  
  function pixelToClip2D(pixelVertices) {
    let canvas = document.getElementById('webgl-canvas');
    let width = canvas.width;
    let height = canvas.height;
    let clipVertices = [];
  
    for (let i = 0; i < pixelVertices.length; i += 2) {
      // Convert x-coordinate from pixel space to clip space
      let x = (pixelVertices[i] / width) * 2 - 1;
      // Convert y-coordinate from pixel space to clip space and invert
      let y = 1 - (pixelVertices[i + 1] / height) * 2;
      clipVertices.push(x, y);
    }
  
    return clipVertices;
  }
  