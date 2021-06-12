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

        let points = curve.getPoints(64); // Save points so that pointOnCircleMarker may use them.
        const geometry = new THREE.BufferGeometry().setFromPoints(points);

        const material = new THREE.LineBasicMaterial({color: 0, linewidth: 1});

        // Create the final object to add to the scene
        super(geometry, material);

        this.points = points;
    }
}

class PointOnCircleMarker extends THREE.Group {
    constructor(circle) {
        const curve = new THREE.EllipseCurve(
            0, 0,            // ax, aY
            0.05, 0.05,           // xRadius, yRadius
            0, 2 * Math.PI,  // aStartAngle, aEndAngle
            false,            // aClockwise
            0                 // aRotation
        );

        const points = curve.getPoints(16);
        const geometry = new THREE.BufferGeometry().setFromPoints(points);

        const material = new THREE.LineBasicMaterial({color: 0, linewidth: 1});

        // Create the final object to add to the scene
        super();

        this.circle = circle;
        this.index = 0;

        this.add(new THREE.Line(geometry, material));
    }

    moveToNextPoint() {
        this.index++;
        if (this.index >= this.circle.points.length) {
            this.index = 0;
        }
        this.position.x = this.circle.points[this.index].x;
        this.position.y = this.circle.points[this.index].y;
    }

}

class CircleGraph extends THREE.Group {
    constructor(x, y) {
        super();

        this.add(new XAxis(0, 0, 2));
        this.add(new YAxis(0, 0, 2));
        let circle = new Circle(0, 0, 1)
        this.add(circle);

        this.pointOnCircleMarker = new PointOnCircleMarker(circle);
        this.pointOnCircleMarker.position.x = circle.points[0].x;
        this.pointOnCircleMarker.position.y = circle.points[0].y;
        this.add(this.pointOnCircleMarker);

        this.position.x = x;
        this.position.y = y;

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
        requestAnimationFrame( animate );

        circleGraph.pointOnCircleMarker.moveToNextPoint();

        renderer.render( scene, camera );
    };

    animate();
}

main()
