import * as THREE from 'three';

function main() {
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.overflow = "hidden";

    const scene = new THREE.Scene();

    // CAMERA
    const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    // const vertices = [];
    //
    // for ( let i = 0; i < 10000; i ++ ) {
    //
    //     const x = THREE.MathUtils.randFloatSpread( 2000 );
    //     const y = THREE.MathUtils.randFloatSpread( 2000 );
    //     const z = THREE.MathUtils.randFloatSpread( 2000 );
    //
    //     vertices.push( x, y, z );
    //
    // }
    //
    // vertices.push(0, 0, 0);
    // const geometry = new THREE.BufferGeometry();
    // geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );

    const geometry = new THREE.Geometry();
    geometry.vertices.push(new THREE.Vector3( 0, 0, 0));

    const material = new THREE.PointsMaterial( { size: 1, sizeAttenuation: false, color: 0x888888 } );

    const points = new THREE.Points( geometry, material );

    scene.add( points );

    // const geometry = new THREE.BoxGeometry();
    // const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    // const cube = new THREE.Mesh( geometry, material );
    // scene.add( cube );

    // let dotGeometry = new THREE.BufferGeometry();
    // dotGeometry.vertices.push(new THREE.Vector3( 0, 0, 0));
    // let dotMaterial = new THREE.PointsMaterial( { size: 1, sizeAttenuation: false } );
    // let dot = new THREE.Points( dotGeometry, dotMaterial );
    // scene.add( dot );

    // let geometry = new THREE.BufferGeometry();
    // let vertex = new Float32Array( 3 );
    // vertex.push([0, 0, 0]);
    // geometry.addAttribute( 'position', new THREE.BufferAttribute( vertex, 3 ) );
    // let points = new THREE.Points(geometry);
    // scene.add(points);

    camera.position.z = 5;

    // const animate = function () {
    //     requestAnimationFrame( animate );
    //
    //     cube.rotation.x += 0.01;
    //     cube.rotation.y += 0.01;
    //
    //     renderer.render( scene, camera );
    // };
    //
    //    animate();
    renderer.render( scene, camera );
}

main()
