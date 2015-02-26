/////////////////////////////////////////////////////////////////
// Dodecahedron
//
// Vertices: 20
// Edges: 30
// Faces: 12
// Edges per face: 5
// Edges per vertex: 3
// Sin of angle at edge: 2 / sqrt(5)
// Surface area: 3 * sqrt(25 + 10 * sqrt(5)) * edgelength^2
// Volume: (15 + 7 * sqrt(5)) / 4 * edgelength^3
// Circumscribed radius: (sqrt(15) + sqrt(3)) / 4 * edgelength
// Inscribed radius: sqrt(250 + 110 * sqrt(5)) / 20 * edgelength
//
/////////////////////////////////////////////////////////////////

function Dodecahedron(descr) {
    for (var property in descr)
        this[property] = descr[property];

    this.numVertices = 108; // Faces * Edges per face(9 here-> 3 triangles per face)
}

Dodecahedron.prototype = new Entity();

Dodecahedron.prototype.vertices = util.resize(verticesData.dodecahedron, 0.3);
Dodecahedron.prototype.indices = [4, 3, 2, 4, 2, 1, 4, 1, 0];

Dodecahedron.prototype.build = function() {
    // Add points
    for (var i = 0; i < this.vertices.length; i += 5)
        for (var j = 0; j < this.indices.length; j++)
            this.points.push(this.vertices[this.indices[j] + i]);

    // Add colors. Each face has a random color.
    for (var i = 0; i < this.numVertices; i += this.indices.length) {
        var color = [Math.random(), Math.random(), Math.random()];
        for (var j = 0; j < this.indices.length; j++)
            this.colors.push(vec4(color[0], color[1], color[2], 1.0));
    }
};
