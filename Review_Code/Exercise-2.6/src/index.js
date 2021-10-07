
import * as THREE from 'three';
import * as dat from 'dat.gui';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';


function init(){
    
    let scene = new THREE.Scene();
    let gui = new dat.GUI();
    let clock = new THREE.Clock();
 
   
    // call function 
    var circle = getCircle();

    

    // add other objects to the scene
    scene.add(circle);
   


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


function getCircle(){

    
    let points = [];

    for (let t=-10000; t<=10000; t+=0.01){

        points.push(new THREE.Vector2( (1 - t**2)/(1 + t**2), 2*t/(1 + t**2))); 
    }

    let geometry = new THREE.BufferGeometry().setFromPoints(points);

    let material = new THREE.LineBasicMaterial({color: 'rgb(255,0,0)'});

    let circle = new THREE.Line(geometry, material);

    return circle;

}



function update(renderer, scene, camera, controls,clock) {
    
    renderer.render(scene, camera);
	requestAnimationFrame(function() {
		update(renderer, scene, camera, controls, clock);
	});
}

 init();
 




