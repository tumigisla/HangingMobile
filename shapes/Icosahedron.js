/////////////////////////////////////////////////////////////////
// Icosahedron
//
// Vertices: 12
// Edges: 30
// Faces: 20
// Edges per face: 3
// Edges per vertex: 5
// Sin of angle at edge: 2 / 3
// Surface area: 5 * sqrt(3) * edgelength^2
// Volume: 5 * (3 + sqrt(5)) / 12 * edgelength^3
// Circumscribed radius: sqrt(10 + 2 * sqrt(5)) / 4 * edgelength
// Inscribed radius: sqrt(42 + 18 * sqrt(5)) / 12 * edgelength
//
/////////////////////////////////////////////////////////////////

function Icosahedron(descr) {
    for (var property in descr)
        this[property] = descr[property];

    this.numVertices = 60;  // Faces * Edges per face
}

Icosahedron.prototype = new Entity();

Icosahedron.prototype.build = function() {
    // Add points
    this.points = util.resize(verticesData.icosahedron, 0.55);

    // Add colors. Each face has a random color.
    for (var i = 0; i < this.numVertices; i += 3) {
        // Generate new random color for every 3 vertices (each side)
        var newColor = vec4(Math.random(), Math.random(), Math.random(), 1.0);
        this.colors.push(newColor, newColor, newColor);
    }
};
