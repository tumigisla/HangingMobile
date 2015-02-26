function Entity(descr) {
	for (var property in descr)
		this[property] = descr[property];

		this.points = [];
		this.colors = [];

		this.thetaRot = 0.0;
}

Entity.prototype.loadToGPU = function() {
	// colors
	this.cBufferId = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, this.cBufferId);
	gl.bufferData(gl.ARRAY_BUFFER, flatten(this.colors), gl.STATIC_DRAW);

	//points
	this.vBufferId = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, this.vBufferId);
	gl.bufferData(gl.ARRAY_BUFFER, flatten(this.points), gl.STATIC_DRAW);
};

Entity.prototype.useBuffer = function() {
	// color
	gl.bindBuffer(gl.ARRAY_BUFFER, this.cBufferId);
	var vColor = gl.getAttribLocation(program, "vColor");
    gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vColor);

    // point
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vBufferId);
    var vPosition = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(vPosition, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);
};

Entity.prototype.drawArrays = function(ctm, lo, hi) {
	gl.uniformMatrix4fv(mvLoc, false, flatten(ctm));
    gl.drawArrays(gl.TRIANGLES, lo, hi);
};


Entity.prototype.update = function(du) {
    this.thetaRot += (internalRotSpeed * du);
};

Entity.prototype.render = function(ctm) {
    this.useBuffer();
    this.drawArrays(ctm, 0, this.numVertices);
};
