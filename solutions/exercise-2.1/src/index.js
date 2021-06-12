import * as THREE from 'three';
import katex from 'katex';

class XAxis extends THREE.Line {
    constructor(x, y, length) {
        const material = new THREE.LineBasicMaterial({color: THREE.Color.NAMES['red'], linewidth: 1});
        const points = [];
        points.push(new THREE.Vector3(x - length / 2, y, 0));
        points.push(new THREE.Vector3(x + length / 2, y, 0));

        const geometry = new THREE.BufferGeometry().setFromPoints(points);

        super(geometry, material);
    }
}

class YAxis extends THREE.Line {
    constructor(x, y, length) {
        const material = new THREE.LineBasicMaterial({color: THREE.Color.NAMES['green'], linewidth: 1});
        const points = [];
        points.push(new THREE.Vector3(x, y - length / 2, 0));
        points.push(new THREE.Vector3(x, y + length / 2, 0));

        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        super(geometry, material);
    }
}

class Circle extends THREE.Line {
    constructor(x, y, r) {
        const curve = new THREE.EllipseCurve(
            x, y,            // ax, aY
            r, r,           // xRadius, yRadius
            0, 2 * Math.PI,  // aStartAngle, aEndAngle
            false,            // aClockwise
            0                 // aRotation
        );

        const points = curve.getPoints(64);
        const geometry = new THREE.BufferGeometry().setFromPoints(points);

        const material = new THREE.LineBasicMaterial({color: 0, linewidth: 1});

        // Create the final object to add to the scene
        super(geometry, material);
    }
}

class CircleGraph extends THREE.Group {

    static PointOnCircleMarker = class extends THREE.Group {
        constructor(x, y) {
            const curve = new THREE.EllipseCurve(
                x + 1, y,            // aX, aY
                0.05, 0.05,           // xRadius, yRadius
                0, 2 * Math.PI,  // aStartAngle, aEndAngle
                false,            // aClockwise
                0                 // aRotation
            );

            const points = curve.getPoints(64);
            const geometry = new THREE.BufferGeometry().setFromPoints(points);

            const material = new THREE.PointsMaterial({color: 0, size: 5});

            // Create the final object to add to the scene
            super(geometry, material);
        }
    };

    constructor(x, y) {

        function drawPointOnCircleGraphMarker(x, y) {
            const curve = new THREE.EllipseCurve(
                x + 1, y,            // aX, aY
                0.05, 0.05,           // xRadius, yRadius
                0, 2 * Math.PI,  // aStartAngle, aEndAngle
                false,            // aClockwise
                0                 // aRotation
            );

            const points = curve.getPoints(64);
            const geometry = new THREE.BufferGeometry().setFromPoints(points);

            const material = new THREE.PointsMaterial({color: 0, size: 5});

            // Create the final object to add to the scene
            return new THREE.Line(geometry, material);
        }

        super();

        this.add(new XAxis(x, y, 2));
        this.add(new YAxis(x, y, 2));
        this.add(new Circle(x, y, 1));
        this.pointOnCircleMarker = new CircleGraph.PointOnCircleMarker(x, y);
        this.add(this.pointOnCircleMarker);

        // Use HTML/CSS to create text

        // create a new div element
        // const div = document.createElement("div");
        // document.body.appendChild(div);

        // div.style.position = 'absolute';
        // div.style.top = '30px';
        // div.style.left = '50px';
        // //div.style.width = '100%';
        // //div.style.textAlign = 'center';
        // div.style.zIndex = 10;
        // //div.style.display = 'block';
        //
        // // and give it some content
        // katex.render('c = \\pm\\sqrt{a^2 + b^2}', div, {
        //     throwOnError: false
        // });

        // add the newly created element and its content into the DOM
    }
}

function main() {
    function drawCosineGraph(x, y) {
        function drawCosineCurve(x, y) {
            const material = new THREE.LineBasicMaterial({color: 0, linewidth: 1});

            // const points = curve.getPoints(64)

            const points = [];

            for (let i = 0; i <= 64; i++) {
                points.push(new THREE.Vector3(x + 2 * Math.PI * i / 64, y - Math.cos(2 * Math.PI * i / 64), 0));
            }

            const geometry = new THREE.BufferGeometry().setFromPoints(points);

            // Create the final object to add to the scene
            return new THREE.Line(geometry, material);
        }

        let group = new THREE.Group();

        group.add(new XAxis(x + 2, y, 2 * Math.PI));
        group.add(new YAxis(x + 2, y, 2));
        group.add(drawCosineCurve(x + 2 - Math.PI, y));

        return group;
    }

    function drawSineGraph(x, y) {
        function drawSine(x, y) {
            const material = new THREE.LineBasicMaterial({color: 0, linewidth: 1});

            // const points = curve.getPoints(64)

            const points = [];

            for (let i = 0; i <= 64; i++) {
                points.push(new THREE.Vector3(x + 2 * Math.PI * i / 64, y - Math.sin(2 * Math.PI * i / 64), 0));
            }

            const geometry = new THREE.BufferGeometry().setFromPoints(points);

            // Create the final object to add to the scene
            return new THREE.Line(geometry, material);
        }

        let group = new THREE.Group();

        group.add(new XAxis(x + 2, y, 2 * Math.PI));
        group.add(new YAxis(x + 2, y, 2));
        group.add(drawSine(x + 2 - Math.PI, y, 4));

        return group;
    }


    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.overflow = "hidden";

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(THREE.Color.NAMES['white']);

    // CAMERA
    const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    const circleGraph = new CircleGraph(-3.5, 0);

    scene.add( circleGraph );
    scene.add(drawCosineGraph(-0.5, 1.25));
    scene.add(drawSineGraph(-0.5, -1.25));



    const animate = function () {
        // requestAnimationFrame( animate );
        //
        // circleGraph.pointOnGraphMarker.moveToNextPoint();

        renderer.render( scene, camera );
    };

    animate();
}

main()
