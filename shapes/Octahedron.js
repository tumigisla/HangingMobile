/////////////////////////////////////////////////////////////////
// Octahedron
//
// Vertices: 6
// Edges: 12
// Faces: 8
// Edges per face:3
// Edges per vertex: 4
// Sin of angle at edge: 2 * sqrt(2) / 3
// Surface area: 2 * sqrt(3) * edgelength^2
// Volume: sqrt(2) / 3 * edgelength^3
// Circumscribed radius: sqrt(2) / 2 * edgelength
// Inscribed radius: sqrt(6) / 6 * edgelength
//
/////////////////////////////////////////////////////////////////

function Octahedron(descr) {
    for (var property in descr)
        this[property] = descr[property];

    this.numVertices = 24; // Faces * Edges per face
}

Octahedron.prototype = new Entity();

Octahedron.prototype.build = function() {
    // Add points
    this.points = util.resize(verticesData.octahedron, 0.8);

    // Add colors. Each face has a random color.
    for (var i = 0; i < this.numVertices; i += 3) {
        // Generate new random color for every 3 vertices (each side)
        var newColor = vec4(Math.random(), Math.random(), Math.random(), 1.0);
        this.colors.push(newColor, newColor, newColor);
    }
};
