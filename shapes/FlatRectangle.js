function FlatRectangle(descr) {
    for(var property in descr)
        this[property] = this[property];

    this.numVertices = 6;
}

FlatRectangle.prototype = new Entity();

FlatRectangle.prototype.vertices = util.resize(verticesData.flatRectangle, 0.25);
FlatRectangle.prototype.indices = [3, 2, 1, 3, 1, 0];

FlatRectangle.prototype.build = function() {
    // Add points
    // Add points
    for (var i = 0; i < this.vertices.length; i += 4)
        for (var j = 0; j < this.indices.length; j++)
            this.points.push(this.vertices[this.indices[j] + i]);

    // Add colors.
    for (var i = 0; i < this.numVertices; i++)
        this.colors.push(0.0, 0.0, 0.0, 0.75);
};
