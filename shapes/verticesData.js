// For Dodecahedron
var phi = (1 + Math.sqrt(5)) / 2;

var b = 1 / phi,
	c = 2 - phi;

// For Octahedron
var a = 1 / (2 * Math.sqrt(2)),
	d = 1 / 2;

// For Dodecahedron
var e = 1 / (2 * phi);

var verticesData = {

	dodecahedron : [
        vec3( c, 0,  1), vec3(-c, 0,  1), vec3(-b,  b,  b), vec3( 0,  1,  c), vec3( b,  b,  b),
        vec3(-c, 0,  1), vec3( c, 0,  1), vec3( b, -b,  b), vec3( 0, -1,  c), vec3(-b, -b,  b),
        vec3( c, 0, -1), vec3(-c, 0, -1), vec3(-b, -b, -b), vec3( 0, -1, -c), vec3( b, -b, -b),
        vec3(-c, 0, -1), vec3( c, 0, -1), vec3( b,  b, -b), vec3( 0,  1, -c), vec3(-b,  b, -b),
        vec3( 0, 1, -c), vec3( 0, 1,  c), vec3( b,  b,  b), vec3( 1,  c,  0), vec3( b,  b, -b),
        vec3( 0, 1,  c), vec3( 0, 1, -c), vec3(-b,  b, -b), vec3(-1,  c,  0), vec3(-b,  b,  b),
        vec3( 0,-1, -c), vec3( 0,-1,  c), vec3(-b, -b,  b), vec3(-1, -c,  0), vec3(-b, -b, -b),
        vec3( 0,-1,  c), vec3( 0,-1, -c), vec3( b, -b, -b), vec3( 1, -c,  0), vec3( b, -b,  b),
        vec3( 1, c,  0), vec3( 1,-c,  0), vec3( b, -b,  b), vec3( c,  0,  1), vec3( b,  b,  b),
        vec3( 1,-c,  0), vec3( 1, c,  0), vec3( b,  b, -b), vec3( c,  0, -1), vec3( b, -b, -b),
        vec3(-1, c,  0), vec3(-1,-c,  0), vec3(-b, -b, -b), vec3(-c,  0, -1), vec3(-b,  b, -b),
        vec3(-1,-c,  0), vec3(-1, c,  0), vec3(-b,  b,  b), vec3(-c,  0,  1), vec3(-b, -b,  b)
    ],

	octahedron : [
        vec3(-a, 0,  a), vec3(-a, 0, -a), vec3(0,  d, 0),
        vec3(-a, 0, -a), vec3( a, 0, -a), vec3(0,  d, 0),
        vec3( a, 0, -a), vec3( a, 0,  a), vec3(0,  d, 0),
        vec3( a, 0,  a), vec3(-a, 0,  a), vec3(0,  d, 0),
        vec3( a, 0, -a), vec3(-a, 0, -a), vec3(0, -d, 0),
        vec3(-a, 0, -a), vec3(-a, 0,  a), vec3(0, -d, 0),
        vec3( a, 0,  a), vec3( a, 0, -a), vec3(0, -d, 0),
        vec3(-a, 0,  a), vec3( a, 0,  a), vec3(0, -d, 0)
    ],

	icosahedron : [
		vec3(0 , e ,-d ),  vec3( e , d , 0 ),  vec3(-e , d , 0),
		vec3(0 , e , d ),  vec3(-e , d , 0 ),  vec3( e , d , 0),
		vec3(0 , e , d ),  vec3( 0 ,-e , d ),  vec3(-d , 0 , e),
		vec3(0 , e , d ),  vec3( d , 0 , e ),  vec3( 0 ,-e , d),
		vec3(0 , e ,-d ),  vec3( 0 ,-e ,-d ),  vec3( d , 0 ,-e),
		vec3(0 , e ,-d ),  vec3(-d , 0 ,-e ),  vec3( 0 ,-e ,-d),
		vec3(0 ,-e , d ),  vec3( e ,-d , 0 ),  vec3(-e ,-d , 0),
		vec3(0 ,-e ,-d ),  vec3(-e ,-d , 0 ),  vec3( e ,-d , 0),
		vec3(-e,  d,  0),  vec3( -d,  0,  e),  vec3( -d,  0, -e),
		vec3(-e, -d,  0),  vec3( -d,  0, -e),  vec3( -d,  0,  e),
		vec3(e , d , 0 ),  vec3( d , 0 ,-e ),  vec3( d , 0 , e),
		vec3(e ,-d , 0 ),  vec3( d , 0 , e ),  vec3( d , 0 ,-e),
		vec3(0 , e , d ),  vec3(-d , 0 , e ),  vec3(-e , d , 0),
		vec3(0 , e , d ),  vec3( e , d , 0 ),  vec3( d , 0 , e),
		vec3(0 , e ,-d ),  vec3(-e , d , 0 ),  vec3(-d , 0 ,-e),
		vec3(0 , e ,-d ),  vec3( d , 0 ,-e ),  vec3( e , d , 0),
		vec3(0 ,-e ,-d ),  vec3(-d , 0 ,-e ),  vec3(-e ,-d , 0),
		vec3(0 ,-e ,-d ),  vec3( e ,-d , 0 ),  vec3( d , 0 ,-e),
		vec3(0 ,-e , d ),  vec3(-e ,-d , 0 ),  vec3(-d , 0 , e),
		vec3(0 ,-e , d ),  vec3( d , 0 , e ),  vec3( e ,-d , 0)
	],

	cube : [
		vec3(-1, -1, -1), vec3( 1, -1, -1), vec3( 1, -1,  1), vec3(-1, -1,  1),
		vec3(-1, -1, -1), vec3(-1, -1,  1), vec3(-1,  1,  1), vec3(-1,  1, -1),
		vec3(-1, -1,  1), vec3( 1, -1,  1), vec3( 1,  1,  1), vec3(-1,  1,  1),
		vec3(-1,  1, -1), vec3(-1,  1,  1), vec3( 1,  1,  1), vec3( 1,  1, -1),
		vec3( 1, -1, -1), vec3( 1,  1, -1), vec3( 1,  1,  1), vec3( 1, -1,  1),
		vec3(-1, -1, -1), vec3(-1,  1, -1), vec3( 1,  1, -1), vec3( 1, -1, -1)
	],

	flatRectangle : [
		vec3(-1, -1, 0), vec3(-1,  1, 0), vec3( 1,  1, 0), vec3( 1, -1, 0)
	]

};
