// WebGL2 - 2D Geometry Matrix Transform with Projection
// from // WebGL2 - 2D Geometry Matrix Transform with Projection
// from https://webgl2fundamentals.org/webgl/webgl-2d-geometry-matrix-transform-simpler-functions.html




"use strict";


var vertexShaderSource = `#version 300 es
// an attribute is an input (in) to a vertex shader.
// It will receive data from a buffer
in vec2 a_position;
// A matrix to transform the positions by
uniform mat3 u_matrix;
// all shaders have a main function
void main() {
 // Multiply the position by the matrix.
 gl_Position = vec4((u_matrix * vec3(a_position, 1)).xy, 0, 1);
}
`;


var fragmentShaderSource = `#version 300 es
precision highp float;
uniform vec4 u_color;
// we need to declare an output for the fragment shader
out vec4 outColor;
void main() {
 outColor = u_color;
}
`;



var vao, vao2;
function main() {
 // Get A WebGL context
 /** @type {HTMLCanvasElement} */
 var canvas = document.querySelector("#canvas");
 var gl = canvas.getContext("webgl2");
 if (!gl) {
   return;
 }


 // Use our boilerplate utils to compile the shaders and link into a program
 var program = webglUtils.createProgramFromSources(gl,
     [vertexShaderSource, fragmentShaderSource]);


 // look up where the vertex data needs to go.
 var positionAttributeLocation = gl.getAttribLocation(program, "a_position");
 var positionAttributeLocation2 = gl.getAttribLocation(program, "a_position");

 // look up uniform locations
 var colorLocation = gl.getUniformLocation(program, "u_color");
 var matrixLocation = gl.getUniformLocation(program, "u_matrix");


 // Create a buffer
 var positionBuffer = gl.createBuffer();
 var positionBuffer2 = gl.createBuffer();

 // Create a vertex array object (attribute state)
 var vao = gl.createVertexArray();
 var vao2 = gl.createVertexArray();

 // and make it the one we're currently working with
 gl.bindVertexArray(vao);

 // Turn on the attribute
 gl.enableVertexAttribArray(positionAttributeLocation);

 // Bind it to ARRAY_BUFFER (think of it as ARRAY_BUFFER = positionBuffer)
 gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
 // Set Geometry.
 setGeometry(gl);

 // Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
 var size = 2;          // 2 components per iteration
 var type = gl.FLOAT;   // the data is 32bit floats
 var normalize = false; // don't normalize the data
 var stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
 var offset = 0;        // start at the beginning of the buffer
 gl.vertexAttribPointer(
     positionAttributeLocation, size, type, normalize, stride, offset);

 // First let's make some variables
 // to hold the translation,
 var translation1 = [150+100, 100];
 var rotationInRadians1 = 0;
 var scale1 = [1, 1];
 var color1 = [Math.random(), Math.random(), Math.random(), 1];

 gl.bindVertexArray(vao2);

 // Turn on the attribute
 gl.enableVertexAttribArray(positionAttributeLocation2);

 // Bind it to ARRAY_BUFFER (think of it as ARRAY_BUFFER = positionBuffer)
 gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer2);
 // Set Geometry.
 setGeometry(gl);


 // Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
 var size = 2;          // 2 components per iteration
 var type = gl.FLOAT;   // the data is 32bit floats
 var normalize = false; // don't normalize the data
 var stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
 var offset = 0;        // start at the beginning of the buffer
 gl.vertexAttribPointer(
  positionAttributeLocation2, size, type, normalize, stride, offset);


 // First let's make some variables
 // to hold the translation,
 var translation = [150, 100];
 var rotationInRadians = 0;
 var scale = [1, 1];
 var color = [Math.random(), Math.random(), Math.random(), 1];

 drawScene();
 gl.bindVertexArray(vao2);
 // Setup a ui.
 webglLessonsUI.setupSlider("#x2",      {value: translation1[0], slide: updatePosition(0), max: gl.canvas.width });
 webglLessonsUI.setupSlider("#y2",      {value: translation1[1], slide: updatePosition(1), max: gl.canvas.height});
 webglLessonsUI.setupSlider("#angle2",  {value: rotationInRadians1 * 180 / Math.PI | 0, slide: updateAngle, max: 360});
 webglLessonsUI.setupSlider("#scaleX2", {value: scale1[0], slide: updateScale(0), min: -5, max: 5, step: 0.01, precision: 2});
 webglLessonsUI.setupSlider("#scaleY2", {value: scale1[1], slide: updateScale(1), min: -5, max: 5, step: 0.01, precision: 2});
 // Setup a ui.
 webglLessonsUI.setupSlider("#x",      {value: translation[0], slide: updatePosition2(0), max: gl.canvas.width});
 webglLessonsUI.setupSlider("#y",      {value: translation[1], slide: updatePosition2(1), max: gl.canvas.height});
 webglLessonsUI.setupSlider("#angle",  {value: rotationInRadians * 180 / Math.PI | 0, slide: updateAngle2, max: 360});
 webglLessonsUI.setupSlider("#scaleX", {value: scale[0], slide: updateScale2(0), min: -5, max: 5, step: 0.01, precision: 2});
 webglLessonsUI.setupSlider("#scaleY", {value: scale[1], slide: updateScale2(1), min: -5, max: 5, step: 0.01, precision: 2});

 var then = 0;
 requestAnimationFrame(drawAnimation);

 function drawAnimation(now){
  console.log('aq')
  now *= 0.001

  var deltaTime = now - then
  then = now

  translation1[0] += 10 * deltaTime
  ui.value = translation1[0]

  translation[1] += 10 * deltaTime
  ui.value = translation1[0]

  console.log(translation1[0])
  
  drawScene();
  requestAnimationFrame(drawAnimation)
 }

 function updatePosition(index) {
   return function(event, ui) {
     translation1[index] = ui.value;
     drawScene();
   };
 }
 function updatePosition2(index) {
  return function(event, ui2) {
    translation[index] = ui2.value;
    drawScene();
  };
}

 function updateAngle(event, ui) {
   var angleInDegrees = 360 - ui.value;
   rotationInRadians1 = angleInDegrees * Math.PI / 180;
   drawScene();
 }

 function updateAngle2(event, ui2) {
  var angleInDegrees = 360 - ui2.value;
  rotationInRadians = angleInDegrees * Math.PI / 180;
  drawScene();
}

 function updateScale(index) {
   return function(event, ui) {
     scale1[index] = ui.value;
     drawScene();
   };
 }

 function updateScale2(index) {
  return function(event, ui2) {
    scale[index] = ui2.value;
    drawScene();
  };
}

 // Draw the scene.
 function drawScene() {
   webglUtils.resizeCanvasToDisplaySize(gl.canvas);


   // Tell WebGL how to convert from clip space to pixels
   gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);


   // Clear the canvas
   //gl.clearColor(0, 0, 0, 0);
   //gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);


   // Tell it to use our program (pair of shaders)
   gl.useProgram(program);


   // Bind the attribute/buffer set we want.
   gl.bindVertexArray(vao);


   // Set the color.
   gl.uniform4fv(colorLocation, color1);


   // Compute the matrix
   var matrix = m3.projection(gl.canvas.clientWidth, gl.canvas.clientHeight);
   matrix = m3.translate(matrix, translation1[0], translation1[1]);
   matrix = m3.rotate(matrix, rotationInRadians1);
   matrix = m3.scale(matrix, scale1[0], scale1[1]);


   // Set the matrix.
   gl.uniformMatrix3fv(matrixLocation, false, matrix);


   // Draw the geometry.
   var primitiveType = gl.TRIANGLES;
   var offset = 0;
   var count = 18;
   gl.drawArrays(primitiveType, offset, count);

   // Bind the attribute/buffer set we want.
   gl.bindVertexArray(vao2);
   //gl.bindVertexArray(gl.ARRAY_BUFFER, vao2);
   gl.enableVertexAttribArray(vao2);

   // Set the color.
   gl.uniform4fv(colorLocation, color);


   // Compute the matrix
   var matrix = m3.projection(gl.canvas.clientWidth, gl.canvas.clientHeight);
   matrix = m3.translate(matrix, translation[0], translation[1]);
   matrix = m3.rotate(matrix, rotationInRadians);
   matrix = m3.scale(matrix, scale[0], scale[1]);


   // Set the matrix.
   gl.uniformMatrix3fv(matrixLocation, false, matrix);


   // Draw the geometry.
   var primitiveType = gl.TRIANGLES;
   var offset = 0;
   var count = 18;
   gl.drawArrays(primitiveType, offset, count);
 }
}


// Fill the current ARRAY_BUFFER buffer
// with the values that define a letter 'F'.
function setGeometry(gl) {
 gl.bufferData(
     gl.ARRAY_BUFFER,
     new Float32Array([
         // left column
         0, 0,
         30, 0,
         0, 150,
         0, 150,
         30, 0,
         30, 150,


         // top rung
         30, 0,
         100, 0,
         30, 30,
         30, 30,
         100, 0,
         100, 30,


         // middle rung
         30, 60,
         67, 60,
         30, 90,
         30, 90,
         67, 60,
         67, 90,
     ]),
     gl.STATIC_DRAW);
}






var m3 = {
 projection: function projection(width, height) {
   // Note: This matrix flips the Y axis so that 0 is at the top.
   return [
     2 / width, 0, 0,
     0, -2 / height, 0,
     -1, 1, 1,
   ];
 },


 translation: function translation(tx, ty) {
   return [
     1, 0, 0,
     0, 1, 0,
     tx, ty, 1,
   ];
 },


 rotation: function rotation(angleInRadians) {
   var c = Math.cos(angleInRadians);
   var s = Math.sin(angleInRadians);
   return [
     c, -s, 0,
     s, c, 0,
     0, 0, 1,
   ];
 },


 scaling: function scaling(sx, sy) {
   return [
     sx, 0, 0,
     0, sy, 0,
     0, 0, 1,
   ];
 },


 multiply: function multiply(a, b) {
   var a00 = a[0 * 3 + 0];
   var a01 = a[0 * 3 + 1];
   var a02 = a[0 * 3 + 2];
   var a10 = a[1 * 3 + 0];
   var a11 = a[1 * 3 + 1];
   var a12 = a[1 * 3 + 2];
   var a20 = a[2 * 3 + 0];
   var a21 = a[2 * 3 + 1];
   var a22 = a[2 * 3 + 2];
   var b00 = b[0 * 3 + 0];
   var b01 = b[0 * 3 + 1];
   var b02 = b[0 * 3 + 2];
   var b10 = b[1 * 3 + 0];
   var b11 = b[1 * 3 + 1];
   var b12 = b[1 * 3 + 2];
   var b20 = b[2 * 3 + 0];
   var b21 = b[2 * 3 + 1];
   var b22 = b[2 * 3 + 2];
   return [
     b00 * a00 + b01 * a10 + b02 * a20,
     b00 * a01 + b01 * a11 + b02 * a21,
     b00 * a02 + b01 * a12 + b02 * a22,
     b10 * a00 + b11 * a10 + b12 * a20,
     b10 * a01 + b11 * a11 + b12 * a21,
     b10 * a02 + b11 * a12 + b12 * a22,
     b20 * a00 + b21 * a10 + b22 * a20,
     b20 * a01 + b21 * a11 + b22 * a21,
     b20 * a02 + b21 * a12 + b22 * a22,
   ];
 },


 translate: function(m, tx, ty) {
   return m3.multiply(m, m3.translation(tx, ty));
 },


 rotate: function(m, angleInRadians) {
   return m3.multiply(m, m3.rotation(angleInRadians));
 },


 scale: function(m, sx, sy) {
   return m3.multiply(m, m3.scaling(sx, sy));
 },
};


main();