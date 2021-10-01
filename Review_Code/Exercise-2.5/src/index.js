
import * as THREE from 'three';
import * as dat from 'dat.gui';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';


function init(){
    
    let scene = new THREE.Scene();
    let gui = new dat.GUI();
    let clock = new THREE.Clock();
    
    //axis for cos curve

    let cosAxisX = getXaxis(0,Math.PI,2*Math.PI);
    let cosAxisY = getYaxis(0,Math.PI,2);

    //axis for sin curve

    let sinAxisX = getXaxis(0,-Math.PI,2*Math.PI);
    let sinAxisY = getYaxis(0,-Math.PI,2);

    // axis for circle 

    let circleX = getXaxis(-10,2,2);
    let circleY = getYaxis(-10,2,2);
   

    // make a circle of unit radius 

    let circle = getCircle(-10,2,1);

    // cos graph generation
    let cosine = cosineGraph(-Math.PI, Math.PI);
    
    // sin graph generation
    let sin = sinGraph(-Math.PI, -Math.PI);

    // make tiny point on each curve
    let cosPoint = PointMarker(-Math.PI ,Math.PI - 1 ,0);
    let sinPoint = PointMarker (-Math.PI ,-Math.PI ,0);
    let circlePoint = PointMarker (-9 ,2 ,0);
    
    // giving them name so we can use in update function by getObjectByName Method
    cosPoint.name = 'pointCosMaker';
    sinPoint.name = 'pointSinMaker';
    circlePoint.name = 'pointCircleMaker';

    // add other objects to the scene
    scene.add(cosAxisX);
    scene.add(cosAxisY);
    scene.add(sinAxisX);
    scene.add(sinAxisY);
    scene.add(circleX);
    scene.add(circleY);
    scene.add(circle);
    scene.add(cosine);
    scene.add(sin);
    scene.add(cosPoint);
    scene.add(sinPoint);
    scene.add(circlePoint);


    //camera
    
    let camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
    camera.position.z = 10;
    camera.position.x = 0;
    camera.position.y = 0;
    camera.lookAt(new THREE.Vector3(0,0,0));

    //renderer
    let renderer = new THREE.WebGL1Renderer();
    renderer.shadowMap.enabled = true;
    renderer.setSize(window.innerWidth,window.innerHeight);
    renderer.setClearColor('rgb(255,255,255)');
    document.body.appendChild(renderer.domElement);

    let controls = new OrbitControls(camera,renderer.domElement);

    update(renderer, scene, camera, controls, clock);
   
    return scene;

}


function getXaxis(x,y,length){

    let points = [];
    points.push(new THREE.Vector3(x-length /2,y,0));
    points.push(new THREE.Vector3(x+length /2,y,0));

    let geometry = new THREE.BufferGeometry().setFromPoints(points);

    let material = new THREE.LineBasicMaterial({color: 'rgb(255,0,0)'});
    let xAxis = new THREE.Line(geometry, material);

    return xAxis;

}



function getYaxis(x,y,length){

    let points = [];
    points.push(new THREE.Vector3(x, y-length /2 ,0));
    points.push(new THREE.Vector3(x, y+length /2 ,0));

    let geometry = new THREE.BufferGeometry().setFromPoints(points);

    let material = new THREE.LineBasicMaterial({color: 'rgb(0,255,0)'});
    let yAxis = new THREE.Line(geometry, material);

    return yAxis;

}


function getCircle(x,y,r){

    const curve = new THREE.EllipseCurve(
        x, y,            // ax, aY
        r, r,           // xRadius, yRadius
        0, 2 * Math.PI,  // aStartAngle, aEndAngle                              
    );

    let points = curve.getPoints(64);

    let geometry = new THREE.BufferGeometry().setFromPoints(points);

    let material = new THREE.LineBasicMaterial({color: 'rgb(0,0,0)'});

    let circle = new THREE.Line(geometry, material);

    return circle;
}


function cosineGraph(x,y){


    let points = [];

    for (let i =0; i<=64; i++){

        points.push(new THREE.Vector3(x + (2*Math.PI*i / 64), y + Math.cos(x + (2*Math.PI*i / 64)),0));
    }

    let geometry = new THREE.BufferGeometry().setFromPoints(points);

    let material = new THREE.LineBasicMaterial({color: 'rgb(0,0,0)'});

    let cosine = new THREE.Line(geometry, material);

    return cosine;

}

function PointMarker(x,y,z){

    { // Create a small particle.
        var curve = new THREE.EllipseCurve(
            0, 0,            // ax, aY
            0.05, 0.05,           // xRadius, yRadius
            0, 2 * Math.PI,  // StartAngle, EndAngle
        );

        const points = curve.getPoints(64);

        let geometry = new THREE.BufferGeometry().setFromPoints(points);

        let material = new THREE.LineBasicMaterial({color: 'rgb(0,0,0)'});

        let point = new THREE.Line(geometry, material);

        point.position.x = x;
        point.position.y = y;
        point.position.z = z;

    
        return point;
    }

}

function sinGraph(x,y){


    let points = [];

    for (let i =0; i<=64; i++){

        points.push(new THREE.Vector3(x + (2*Math.PI*i / 64), y + Math.sin(x + (2*Math.PI*i / 64)),0));
    }

    let geometry = new THREE.BufferGeometry().setFromPoints(points);

    let material = new THREE.LineBasicMaterial({color: 'rgb(0,0,0)'});

    let sin = new THREE.Line(geometry, material);


    return sin;

}

var angle = - Math.PI;

function update(renderer, scene, camera, controls,clock) {
	
    // circle particle animation 
    let pointCircle = scene.getObjectByName('pointCircleMaker');

   // var timeElapsed = clock.getElapsedTime();  -- weird way to use this method 
    
    if (angle >= Math.PI){

        angle = -Math.PI;
    }
    else{

        angle += Math.PI/60;
    }

    pointCircle.position.x = Math.cos(angle)-10;
    pointCircle.position.y = Math.sin(angle)+2;


    // cos curve particle animation 

    let pointCos = scene.getObjectByName('pointCosMaker');

    pointCos.position.x = angle ;

    pointCos.position.y = Math.cos(angle) + Math.PI ;
    
    
    // sin curve particle animation 

    let pointSin = scene.getObjectByName('pointSinMaker');

    pointSin.position.x = angle;

    pointSin.position.y = Math.sin(angle) - Math.PI;
    
    renderer.render(scene, camera);
	requestAnimationFrame(function() {
		update(renderer, scene, camera, controls, clock);
	});
}

 init();
 




