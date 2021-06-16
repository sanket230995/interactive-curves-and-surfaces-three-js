
import * as THREE from 'three';

import dat from 'dat.gui';

import 'katex/dist/katex.css'
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

class XHalfAxis extends THREE.Line {
    constructor(x, y, length) {
        const material = new THREE.LineBasicMaterial({color: THREE.Color.NAMES['red'], linewidth: 1});
        const points = [];
        points.push(new THREE.Vector3(x, y, 0));
        points.push(new THREE.Vector3(x + length, y, 0));

        const geometry = new THREE.BufferGeometry().setFromPoints(points);

        super(geometry, material);

        this._points = points;
    }

    set length(length) {
        this._length = length;
        this._points[1] = new THREE.Vector3(this.position.x + length, this.position.y, 0);
        this.geometry.setFromPoints(this._points);
    }

    get length() {
        return this._length;
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

class YHalfAxis extends THREE.Line {
    constructor(x, y, length) {
        const material = new THREE.LineBasicMaterial({color: THREE.Color.NAMES['green'], linewidth: 1});
        const points = [];
        points.push(new THREE.Vector3(x, y, 0));
        points.push(new THREE.Vector3(x, y + length, 0));

        const geometry = new THREE.BufferGeometry().setFromPoints(points);

        super(geometry, material);

        this._points = points;
    }

    set length(length) {
        this._length = length;
        this._points[1] = new THREE.Vector3(this.position.x, length, 0);
        this.geometry.setFromPoints(this._points);
    }

    get length() {
        return this._length;
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

        this.r = r;

        this.points = points;
    }
}

class PointOnCosineMarker extends THREE.Group {
    constructor(cosine) {
        super();
        this.cosine = cosine;
        this.index = ~~(cosine.points.length / 2);
        console.log(this.index);

        { // This is the little circle.
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

            this.add(new THREE.Line(geometry, material));
        }

        { // This is the x-half-axis
            this.xHalfAxis = new XHalfAxis(0, 0, 0);
            this.add(this.xHalfAxis)
        }

        { // This the y-half-axis
            this.yHalfAxis = new YHalfAxis(0, 0, 0);
            this.add(this.yHalfAxis)
        }
    }

    moveToNextPoint() {
        this.index++;
        if (this.index >= this.cosine.points.length) {
            this.index = 0;
        }
        this.position.x = this.cosine.points[this.index].x;
        this.position.y = this.cosine.points[this.index].y;

        this.xHalfAxis.length = -this.cosine.points[this.index].x;
        this.yHalfAxis.length = -this.cosine.points[this.index].y;
    }

}

class Cosine extends THREE.Line {
    constructor(x, y) {
        const material = new THREE.LineBasicMaterial({color: 0, linewidth: 1});

        // const points = curve.getPoints(64)

        const points = [];

        for (let i = 0; i <= 64; i++) {
            points.push(new THREE.Vector3(x + 2 * Math.PI * i / 64, y - Math.cos(2 * Math.PI * i / 64), 0));
        }

        const geometry = new THREE.BufferGeometry().setFromPoints(points);

        super(geometry, material);

        this.points = points;
    }
}

class CosineGraph extends THREE.Group {
    constructor(x, y) {
        super();
        this.add(new XAxis(0, 0, 2 * Math.PI));
        this.add(new YAxis(0, 0, 2));
        let cosine = new Cosine(-Math.PI, 0);
        this.add(cosine);

        this.pointOnCosineMarker = new PointOnCosineMarker(cosine);
        this.pointOnCosineMarker.position.x = this.pointOnCosineMarker.cosine.points[0].x;
        this.pointOnCosineMarker.position.y = this.pointOnCosineMarker.cosine.points[0].y;
        this.add(this.pointOnCosineMarker);

        this.position.x = x;
        this.position.y = y;

        drawKatex('x = \\cos t', x - Math.PI + 1, y + 1.25, 0);

    }
}

class PointOnCircleMarker extends THREE.Group {
    constructor(circle) {
        super();
        this.circle = circle;
        this.index = 0;

        { // This is the little circle.
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

            this.add(new THREE.Line(geometry, material));
        }

        { // This is the x-half-axis
            this.xHalfAxis = new XHalfAxis(0, 0, 0);
            this.add(this.xHalfAxis)
        }

        { // This the y-half-axis
            this.yHalfAxis = new YHalfAxis(0, 0, 0);
            this.add(this.yHalfAxis)
        }
    }

    moveToNextPoint() {
        this.index++;
        if (this.index >= this.circle.points.length) {
            this.index = 0;
        }
        this.position.x = this.circle.points[this.index].x;
        this.position.y = this.circle.points[this.index].y;

        this.xHalfAxis.length = -this.circle.points[this.index].x;
        this.yHalfAxis.length = -this.circle.points[this.index].y;
    }

}

function drawKatex(tex, x, y, z) {
    // Use HTML/CSS to create text

    // create a new div element
    const div = document.createElement("div");
    document.body.appendChild(div);

    // and give it some content
    katex.render(tex, div, {
        throwOnError: false
    });

    div.style.position = 'absolute';

    // get the normalized screen coordinate of that position
    // x and y will be in the -1 to +1 range with x = -1 being
    // on the left and y = -1 being on the bottom
    let tempV = new THREE.Vector3(x, y, 0);
    tempV.unproject(window.camera);

    // convert the normalized position to CSS coordinates
    div.style.left = ((tempV.x *  .5 + .5) * window.innerWidth - div.offsetWidth / 2 + 3).toString() + 'px';
    div.style.top = ((tempV.y * -.5 + .5) * window.innerHeight - div.offsetHeight / 2 - 1).toString() + 'px';

    //console.log(tempV);
    //console.log(window.innerWidth + ", " + window.innerHeight);
    //console.log(div.offsetWidth + ", " + div.offsetHeight);

    //div.style.width = '100%';
    //div.style.textAlign = 'center';
    div.style.zIndex = 10;
    //div.style.display = 'block';

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

        drawKatex('x', x + 1.7, y, 0);
        drawKatex('y', x + 0.8, y + 2, 0);
    }
}

class PointOnSineMarker extends THREE.Group {
    constructor(sine) {
        super();
        this.sine = sine;
        this.index = ~~(sine.points.length / 2);

        { // This is the little circle.
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

            this.add(new THREE.Line(geometry, material));
        }

        { // This is the x-half-axis
            this.xHalfAxis = new XHalfAxis(0, 0, 0);
            this.add(this.xHalfAxis)
        }

        { // This the y-half-axis
            this.yHalfAxis = new YHalfAxis(0, 0, 0);
            this.add(this.yHalfAxis)
        }
    }

    moveToNextPoint() {
        this.index++;
        if (this.index >= this.sine.points.length) {
            this.index = 0;
        }
        this.position.x = this.sine.points[this.index].x;
        this.position.y = this.sine.points[this.index].y;

        this.xHalfAxis.length = -this.sine.points[this.index].x;
        this.yHalfAxis.length = -this.sine.points[this.index].y;
    }

}

class Sine extends THREE.Line {
    constructor(x, y) {
        const material = new THREE.LineBasicMaterial({color: 0, linewidth: 1});

        // const points = curve.getPoints(64)

        const points = [];

        for (let i = 0; i <= 64; i++) {
            points.push(new THREE.Vector3(x + 2 * Math.PI * i / 64, y - Math.sin(2 * Math.PI * i / 64), 0));
        }

        const geometry = new THREE.BufferGeometry().setFromPoints(points);

        // Create the final object to add to the scene
        super(geometry, material);

        this.points = points;
    }
}

class SineGraph extends THREE.Group {
    constructor(x, y) {
        super();
        this.add(new XAxis(0, 0, 2 * Math.PI));
        this.add(new YAxis(0, 0, 2));
        let sine = new Sine(-Math.PI, 0, 4);
        this.add(sine);

        this.pointOnSineMarker = new PointOnSineMarker(sine);
        this.pointOnSineMarker.position.x = this.pointOnSineMarker.sine.points[0].x;
        this.pointOnSineMarker.position.y = this.pointOnSineMarker.sine.points[0].y;
        this.add(this.pointOnSineMarker);

        this.position.x = x;
        this.position.y = y;

        drawKatex('y = \\sin t', x - Math.PI + 1, y - 0.5, 0);
    }
}

function main() {
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.overflow = "hidden";

    const scene = new THREE.Scene();
    window.scene = scene;
    scene.background = new THREE.Color(THREE.Color.NAMES['white']);

    // CAMERA
    const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    window.camera = camera;
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    let gui = new dat.GUI({name: 'exercise-2.5'}); // It attaches itself to body at just the right place (top right).
    let isAnimated = {'Animate?': true};
    gui.add(isAnimated, 'Animate?');

    const circleGraph = new CircleGraph(-3.5, 0);
    scene.add( circleGraph );

    const cosineGraph = new CosineGraph( 1.5, 1.25);
    scene.add(cosineGraph);

    const sineGraph = new SineGraph(1.5, -1.25);
    scene.add(sineGraph);

    const animate = function () {
        requestAnimationFrame(animate);
        if (isAnimated['Animate?']) {
            circleGraph.pointOnCircleMarker.moveToNextPoint();
            cosineGraph.pointOnCosineMarker.moveToNextPoint();
            sineGraph.pointOnSineMarker.moveToNextPoint();
        }

        renderer.render( scene, camera );
    };

    animate();
}

main()
