/////////////////////////////////////////////////////////////////
// Hexahedron (cube)
//
// Vertices: 8
// Edges: 12
// Faces: 6
// Edges per face: 4
// Edges per vertex: 3
// Sin of angle at edge: 1
// Surface area: 6 * edgelength^2
// Volume: edgelength^3
// Inscribed radius: 1 / 2 * edgelength
// Circumscribed radius: sqrt(3) / 2 * edgelength
/////////////////////////////////////////////////////////////////

function Cube(descr) {
    for(var property in descr)
        this[property] = this[property];

    this.numVertices = 36; // Faces * Vertices per face(6 here -> 2 triangle per face)
}

Cube.prototype = new Entity();

Cube.prototype.vertices = util.resize(verticesData.cube, 0.2);
Cube.prototype.indices = [3, 2, 1, 3, 1, 0];

Cube.prototype.build = function() {
    // Add points
    for (var i = 0; i < this.vertices.length; i += 4)
        for (var j = 0; j < this.indices.length; j++)
            this.points.push(this.vertices[this.indices[j] + i]);

    // Add colors. All sides are black.
    for (var i = 0; i < this.numVertices; i++)
        this.colors.push(0.0, 0.0, 0.0, 1.0);
};
