var entityManager = {

    _dodecahedron : new Dodecahedron(),
    _octahedron : new Octahedron(),
    _icosahedron : new Icosahedron(),
    _rectangle : new FlatRectangle(),

    _cube : new Cube(), // Poles and strings

    deferredSetup : function() {
        this._categories = [this._dodecahedron, this._octahedron,
                            this._icosahedron, this._cube,
                            this._rectangle];
    },

    buildShapes : function() {
        for (var i = 0; i < this._categories.length; i++)
            this._categories[i].build();
    },

    loadToGPU : function() {
        for (var i = 0; i < this._categories.length; i++)
            this._categories[i].loadToGPU();
    },

    update : function(du) {
        for (var i = 0; i < this._categories.length; i++)
            this._categories[i].update(du);

        for (var i = 0; i < rotations.length; i++)
            rotations[i] += rotSpeeds[i] * du;

        internalRot += internalRotSpeed * du;

        this.maybeDangle(du);
    },

    maybeDangle : function(du) {
        if (util.abs(dangleLimit) < 0.5 || !shouldDangle) {
            // Dangle has almost faded out (or we shouldn't be dangling),
            // so we init the values and stop the dangling.
            dangleAngle = 0;
            dangleTrans = 0;
            dangleLimit = 30;
            shouldDangle = false;
        }
        else if(shouldDangle) {
            // Each step of the dangling
            if (dangleIncreasing) dangleAngle += 1.5 * du;
            else                  dangleAngle -= 1.5 * du;

            var exceedPosLim = dangleIncreasing && dangleAngle > dangleLimit,
                exceedNegLim = !dangleIncreasing && dangleAngle < dangleLimit;

            if (exceedPosLim || exceedNegLim) {
                // Reduce the maximum dangle angle for each swing.
                var absDangleLimit = util.abs(dangleLimit) - 3.0;
                dangleLimit = dangleIncreasing ? -absDangleLimit : absDangleLimit;
                dangleIncreasing = !dangleIncreasing;
            }
        }
        dangleTrans = (dangleAngle/100) * (2/3);
    },

    render : function() {
        var dod = this._dodecahedron,
            oct = this._octahedron,
            ico = this._icosahedron,
            rect = this._rectangle;

        var cube = this._cube;

        var ctmStack = [];

        // ==================================
        //          BRANCHES
        // ==================================

        // First level(tilting) branches
        ctmStack.push(g_ctm);
            g_ctm = mult(g_ctm, rotate(rotations[0], [0, 1, 0]));
            g_ctm = mult(g_ctm, translate(-3.9, 3.96, 0.0));
            g_ctm = mult(g_ctm, rotate(60.0, [0, 0, 1]));
            g_ctm = mult(g_ctm, util.scale4(0.02, 2.5, 0.02));
            g_ctm = mult(g_ctm, translate(0.0, -2.0, 0.0));
            cube.render(g_ctm);
        g_ctm = ctmStack.pop();

        ctmStack.push(g_ctm);
            g_ctm = mult(g_ctm, rotate(rotations[0] + 120.0, [0, 1, 0]));
            g_ctm = mult(g_ctm, translate(-3.9, 3.96, 0.0));
            g_ctm = mult(g_ctm, rotate(60.0, [0, 0, 1]));
            g_ctm = mult(g_ctm, util.scale4(0.02, 2.5, 0.02));
            g_ctm = mult(g_ctm, translate(0.0, -2.0, 0.0));
            cube.render(g_ctm);
        g_ctm = ctmStack.pop();

        ctmStack.push(g_ctm);
            g_ctm = mult(g_ctm, rotate(rotations[0] - 120.0, [0, 1, 0]));
            g_ctm = mult(g_ctm, translate(-3.9, 3.96, 0.0));
            g_ctm = mult(g_ctm, rotate(60.0, [0, 0, 1]));
            g_ctm = mult(g_ctm, util.scale4(0.02, 2.5, 0.02));
            g_ctm = mult(g_ctm, translate(0.0, -2.0, 0.0));
            cube.render(g_ctm);
        g_ctm = ctmStack.pop();

        // Second level branches
        // Huge branch
        ctmStack.push(g_ctm);
            g_ctm = mult(g_ctm, rotate(rotations[0], [0, 1, 0]));
            g_ctm = mult(g_ctm, translate(0.85, 0.8, 0.0));
            g_ctm = mult(g_ctm, rotate(rotations[1], [0, 1, 0]));
            g_ctm = mult(g_ctm, util.scale4(3.0, 0.02, 0.02));
            cube.render(g_ctm);
        g_ctm = ctmStack.pop();

        // Branch under the long Mobile string
        ctmStack.push(g_ctm);
            g_ctm = mult(g_ctm, rotate(rotations[0] + 120.0, [0, 1, 0]));
            g_ctm = mult(g_ctm, translate(0.85, -0.275, 0.0));
            g_ctm = mult(g_ctm, rotate(rotations[1], [0, 1, 0]));
            g_ctm = mult(g_ctm, util.scale4(2.0, 0.02, 0.02));
            cube.render(g_ctm);
        g_ctm = ctmStack.pop();

        // Third level branches
        ctmStack.push(g_ctm);
            g_ctm = mult(g_ctm, rotate(rotations[0], [0, 1, 0]));
            g_ctm = mult(g_ctm, translate(0.85, -0.25, 0.0));
            g_ctm = mult(g_ctm, rotate(rotations[1], [0, 1, 0]));
            g_ctm = mult(g_ctm, translate(-0.59, 0.0, 0.0));
            g_ctm = mult(g_ctm, rotate(rotations[2], [0, 1, 0]));
            g_ctm = mult(g_ctm, util.scale4(1.5, 0.02, 0.02));
            cube.render(g_ctm);
        g_ctm = ctmStack.pop();

        ctmStack.push(g_ctm);
            g_ctm = mult(g_ctm, rotate(rotations[0] + 120.0, [0, 1, 0]));
            g_ctm = mult(g_ctm, translate(0.86, -1.17, 0.0));
            g_ctm = mult(g_ctm, rotate(rotations[1], [0, 1, 0]));
            g_ctm = mult(g_ctm, translate(-0.39, 0.0, 0.0));
            g_ctm = mult(g_ctm, rotate(rotations[2], [0, 1, 0]));
            g_ctm = mult(g_ctm, util.scale4(1.5, 0.02, 0.02));
            cube.render(g_ctm);
        g_ctm = ctmStack.pop();

        // Fourth level branch
        ctmStack.push(g_ctm);
            g_ctm = mult(g_ctm, rotate(rotations[0] + 120.0, [0, 1, 0]));
            g_ctm = mult(g_ctm, translate(0.86, -1.9, 0.0));
            g_ctm = mult(g_ctm, rotate(rotations[1], [0, 1, 0]));
            g_ctm = mult(g_ctm, translate(-0.39, 0.0, 0.0));
            g_ctm = mult(g_ctm, rotate(rotations[2], [0, 1, 0]));
            g_ctm = mult(g_ctm, translate(-0.3, -0.345, 0.0));
            g_ctm = mult(g_ctm, rotate(rotations[3], [0, 1, 0]));
            g_ctm = mult(g_ctm, util.scale4(1.5, 0.02, 0.02));
            cube.render(g_ctm);
        g_ctm = ctmStack.pop();

        // Base(top) branch
        ctmStack.push(g_ctm);
        g_ctm = mult(g_ctm, translate(0.0, 2.0, 0.0));
        g_ctm = mult(g_ctm, util.scale4(0.02, 1.5, 0.02));
        cube.render(g_ctm);

        // =================================
        //          MOBILE STRINGS
        // =================================


        // Inherit from the base(top) branch
        ctmStack.push(g_ctm);
            g_ctm = mult(g_ctm, rotate(rotations[0], [0, 1, 0]));
            g_ctm = mult(g_ctm, translate(43.0, -0.66, 0.2));
            g_ctm = mult(g_ctm, util.scale4(0.5, 0.7, 0.5));
            cube.render(g_ctm);

            // Connecting with huge branch
            ctmStack.push(g_ctm);
                g_ctm = mult(g_ctm, rotate(rotations[1], [0, 1, 0]));
                g_ctm = mult(g_ctm, translate(60.0, -0.598, 0.0));
                g_ctm = mult(g_ctm, util.scale4(1.0, 2.0, 1.0));
                cube.render(g_ctm);
            g_ctm = ctmStack.pop();

            // Connecting with huge branch
            ctmStack.push(g_ctm);
                g_ctm = mult(g_ctm, rotate(rotations[1], [0, 1, 0]));
                g_ctm = mult(g_ctm, translate(-59.5, -0.705, 0.0));
                g_ctm = mult(g_ctm, util.scale4(1.0, 2.5, 1.0));
                cube.render(g_ctm);

                // Connecting with third level branch
                ctmStack.push(g_ctm);
                    g_ctm = mult(g_ctm, rotate(rotations[2], [0, 1, 0]));
                    g_ctm = mult(g_ctm, translate(29.0, -0.297, 0.0));
                    g_ctm = mult(g_ctm, util.scale4(1.0, 0.5, 1.0));
                    cube.render(g_ctm);
                g_ctm = ctmStack.pop();

                // Connecting with third level branch
                ctmStack.push(g_ctm);
                    g_ctm = mult(g_ctm, rotate(rotations[2], [0, 1, 0]));
                    g_ctm = mult(g_ctm, translate(-29.5, -0.435, 0.0));
                    g_ctm = mult(g_ctm, util.scale4(1.0, 1.2, 1.0));
                    cube.render(g_ctm);
                g_ctm = ctmStack.pop();

            g_ctm = ctmStack.pop();

        g_ctm = ctmStack.pop();

        // Mobile string, (the longest one, connecting with first level octahedron)
        ctmStack.push(g_ctm);
            g_ctm = mult(g_ctm, rotate(rotations[0] + 120.0, [0, 1, 0]));
            g_ctm = mult(g_ctm, translate(43.0, -1.02, 0.2));
            g_ctm = mult(g_ctm, util.scale4(0.5, 2.5, 0.5));
            cube.render(g_ctm);

            // Connecting with smaller second level branch (smaller one)
            ctmStack.push(g_ctm);
                g_ctm = mult(g_ctm, rotate(rotations[1], [0, 1, 0]));
                g_ctm = mult(g_ctm, translate(39.5, -0.258, 0.0));
                g_ctm = mult(g_ctm, util.scale4(1.0, 0.3, 1.0));
                cube.render(g_ctm);
            g_ctm = ctmStack.pop();

            // Connecting with smaller second level branch (bigger one)
            ctmStack.push(g_ctm);
                g_ctm = mult(g_ctm, rotate(rotations[1], [0, 1, 0]));
                g_ctm = mult(g_ctm, translate(-39.5, -0.32, 0.0));
                g_ctm = mult(g_ctm, util.scale4(1.0, 0.6, 1.0));
                cube.render(g_ctm);

                // Connecting with third level branch
                ctmStack.push(g_ctm);
                    g_ctm = mult(g_ctm, rotate(rotations[2], [0, 1, 0]));
                    g_ctm = mult(g_ctm, translate(29.5, -0.295, 0.0));
                    g_ctm = mult(g_ctm, util.scale4(1.0, 0.5, 1.0));
                    cube.render(g_ctm);
                g_ctm = ctmStack.pop();

                // Connecting with third level branch
                ctmStack.push(g_ctm);
                    g_ctm = mult(g_ctm, rotate(rotations[2], [0, 1, 0]));
                    g_ctm = mult(g_ctm, translate(-29.5, -0.435, 0.0));
                    g_ctm = mult(g_ctm, util.scale4(1.0, 1.2, 1.0));
                    cube.render(g_ctm);

                    // Connecting with fourth level branch
                    ctmStack.push(g_ctm);
                        g_ctm = mult(g_ctm, rotate(rotations[3], [0, 1, 0]));
                        g_ctm = mult(g_ctm, translate(29.5, -0.27, 0.0));
                        g_ctm = mult(g_ctm, util.scale4(1.0, 0.35, 1.0));
                        cube.render(g_ctm);
                    g_ctm = ctmStack.pop();

                    // Connecting with fourth level branch
                    ctmStack.push(g_ctm);
                        g_ctm = mult(g_ctm, rotate(rotations[3], [0, 1, 0]));
                        g_ctm = mult(g_ctm, translate(-29.5, -0.395, 0.0));
                        g_ctm = mult(g_ctm, util.scale4(1.0, 1.0, 1.0));
                        cube.render(g_ctm);
                    g_ctm = ctmStack.pop();

                g_ctm = ctmStack.pop();

            g_ctm = ctmStack.pop();

        g_ctm = ctmStack.pop();

        // A seemingly lonely mobile string. Connects with the
        // first level octahedron.
        ctmStack.push(g_ctm);
            g_ctm = mult(g_ctm, rotate(rotations[0] - 120.0, [0, 1, 0]));
            g_ctm = mult(g_ctm, translate(43.0, -0.82, 0.2));
            g_ctm = mult(g_ctm, util.scale4(0.5, 1.5, 0.5));
            cube.render(g_ctm);
        g_ctm = ctmStack.pop();


        // End of base top branch
        g_ctm = ctmStack.pop();


        // =================================
        //              SHAPES
        // =================================

        // Dodecahedron - First level
        ctmStack.push(g_ctm);
            g_ctm = mult(g_ctm, rotate(rotations[0] + 120.0, [0, 1, 0]));
            g_ctm = mult(g_ctm, translate(0.86, 0.5, 0.0));
            g_ctm = mult(g_ctm, rotate(internalRot, [0, 1, 0]));
            dod.render(g_ctm);
        g_ctm = ctmStack.pop();

        // Octahedron - First level
        ctmStack.push(g_ctm);
            g_ctm = mult(g_ctm, rotate(rotations[0] - 120.0, [0, 1, 0]));
            g_ctm = mult(g_ctm, translate(0.86, -0.05, 0.0));
            g_ctm = mult(g_ctm, rotate(internalRot, [0, 1, 0]));
            g_ctm = mult(g_ctm, rotate(dangleAngle, [0, 0, 1]));
            g_ctm = mult(g_ctm, translate(dangleTrans, 0.0, 0.0));
            oct.render(g_ctm);
        g_ctm = ctmStack.pop();

        // Dodecahedron - Second level
        ctmStack.push(g_ctm);
            g_ctm = mult(g_ctm, rotate(rotations[0], [0, 1, 0]));
            g_ctm = mult(g_ctm, translate(0.86, -0.3, 0.0));
            g_ctm = mult(g_ctm, rotate(rotations[1], [0, 1, 0]));
            g_ctm = mult(g_ctm, translate(0.6, 0.0, 0.0));
            g_ctm = mult(g_ctm, rotate(internalRot, [0, 1, 0]));
            dod.render(g_ctm);
        g_ctm = ctmStack.pop();

        // Octahedron - Second level (the lower second level)
        ctmStack.push(g_ctm);
            g_ctm = mult(g_ctm, rotate(rotations[0] + 120.0, [0, 1, 0]));
            g_ctm = mult(g_ctm, translate(0.86, -1.1, 0.0));
            g_ctm = mult(g_ctm, rotate(rotations[1], [0, 1, 0]));
            g_ctm = mult(g_ctm, translate(0.39, 0.0, 0.0));
            g_ctm = mult(g_ctm, rotate(internalRot, [0, 1, 0]));
            oct.render(g_ctm);
        g_ctm = ctmStack.pop();

        // Icosahedron - Third level
        ctmStack.push(g_ctm);
            g_ctm = mult(g_ctm, rotate(rotations[0], [0, 1, 0]));
            g_ctm = mult(g_ctm, translate(0.86, -1.04, 0.0));
            g_ctm = mult(g_ctm, rotate(rotations[1], [0, 1, 0]));
            g_ctm = mult(g_ctm, translate(-0.6, 0.0, 0.0));
            g_ctm = mult(g_ctm, rotate(rotations[2], [0, 1, 0]));
            g_ctm = mult(g_ctm, translate(0.3, 0.0, 0.0));
            g_ctm = mult(g_ctm, rotate(internalRot, [0, 1, 0]));
            ico.render(g_ctm);
        g_ctm = ctmStack.pop();

        // Another Icosahedron - Third level
        ctmStack.push(g_ctm);
            g_ctm = mult(g_ctm, rotate(rotations[0], [0, 1, 0]));
            g_ctm = mult(g_ctm, translate(0.86, -1.7, 0.0));
            g_ctm = mult(g_ctm, rotate(rotations[1], [0, 1, 0]));
            g_ctm = mult(g_ctm, translate(-0.6, 0.0, 0.0));
            g_ctm = mult(g_ctm, rotate(rotations[2], [0, 1, 0]));
            g_ctm = mult(g_ctm, translate(-0.3, 0.0, 0.0));
            g_ctm = mult(g_ctm, rotate(internalRot, [0, 1, 0]));
            ico.render(g_ctm);
        g_ctm = ctmStack.pop();

        // Dodecahedron - Third level
        ctmStack.push(g_ctm);
            g_ctm = mult(g_ctm, rotate(rotations[0] + 120.0, [0, 1, 0]));
            g_ctm = mult(g_ctm, translate(0.86, -1.9, 0.0));
            g_ctm = mult(g_ctm, rotate(rotations[1], [0, 1, 0]));
            g_ctm = mult(g_ctm, translate(-0.39, 0.0, 0.0));
            g_ctm = mult(g_ctm, rotate(rotations[2], [0, 1, 0]));
            g_ctm = mult(g_ctm, translate(0.3, 0.0, 0.0));
            g_ctm = mult(g_ctm, rotate(internalRot, [0, 1, 0]));
            dod.render(g_ctm);
        g_ctm = ctmStack.pop();

        // Icosahedron - Fourth level
        ctmStack.push(g_ctm);
            g_ctm = mult(g_ctm, rotate(rotations[0] + 120.0, [0, 1, 0]));
            g_ctm = mult(g_ctm, translate(0.86, -2.9, 0.0));
            g_ctm = mult(g_ctm, rotate(rotations[1], [0, 1, 0]));
            g_ctm = mult(g_ctm, translate(-0.39, 0.0, 0.0));
            g_ctm = mult(g_ctm, rotate(rotations[2], [0, 1, 0]));
            g_ctm = mult(g_ctm, translate(-0.3, 0.0, 0.0));
            g_ctm = mult(g_ctm, rotate(rotations[3], [0, 1, 0]));
            g_ctm = mult(g_ctm, translate(0.28, 0.0, 0.0));
            g_ctm = mult(g_ctm, rotate(internalRot, [0, 1, 0]));
            ico.render(g_ctm);
        g_ctm = ctmStack.pop();

        // Flat rectangle - Fourth level
        ctmStack.push(g_ctm);
            g_ctm = mult(g_ctm, rotate(rotations[0] + 120.0, [0, 1, 0]));
            g_ctm = mult(g_ctm, translate(0.86, -3.55, 0.0));
            g_ctm = mult(g_ctm, rotate(rotations[1], [0, 1, 0]));
            g_ctm = mult(g_ctm, translate(-0.39, 0.0, 0.0));
            g_ctm = mult(g_ctm, rotate(rotations[2], [0, 1, 0]));
            g_ctm = mult(g_ctm, translate(-0.3, 0.0, 0.0));
            g_ctm = mult(g_ctm, rotate(rotations[3], [0, 1, 0]));
            g_ctm = mult(g_ctm, translate(-0.28, 0.0, 0.0));
            g_ctm = mult(g_ctm, rotate(internalRot, [0, 1, 0]));
            rect.render(g_ctm);
        g_ctm = ctmStack.pop();


    }
};

entityManager.deferredSetup();
