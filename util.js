var util = {

	resize : function(vertices, factor) {
	    for (var i = 0; i< vertices.length; i++)
	        for (var j = 0; j < vertices[i].length; j++)
	            vertices[i][j] *= factor;
	    return vertices;
	},

	scale4 : function(x, y, z) {
	    if ( Array.isArray(x) && x.length == 3 ) {
	        z = x[2];
	        y = x[1];
	        x = x[0];
	    }

	    var result = mat4();
	    result[0][0] = x;
	    result[1][1] = y;
	    result[2][2] = z;

	    return result;
	},

	abs : function(x) {
		return x < 0 ? -x : x;
	}

};
