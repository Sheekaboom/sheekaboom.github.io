// Thank you very much to Tony at Tonybox.net for a great base code
// While I have made some minor changes, he wrote 99% of the code 
import * as THREE from 'https://unpkg.com/three@0.118.3/build/three.module.js';
import { OrbitControls } from 'https://unpkg.com/three@0.118.3//examples/jsm/controls/OrbitControls.js';
import { STLLoader } from 'https://unpkg.com/three@0.118.3//examples/jsm/loaders/STLLoader.js';
import { WEBGL } from 'https://unpkg.com/three@0.118.3//examples/jsm/WebGL.js';
//import { WebGLRenderer } from 'https://unpkg.com/three@0.118.3//src/renderers/WebGLRenderer.js';
//import { OrbitControls } from 'https://unpkg.com/three@0.118.3//examples/jsm/controls/OrbitControls.js';

export {STLViewerEnable};

function STLViewerEnable(classname) {
    var models = document.getElementsByClassName(classname);
    for (var i = 0; i < models.length; i++) {
        STLViewer(models[i], models[i].getAttribute("data-stl-src"));
    }
}

function STLViewer(elem, model) {

    if (!WEBGL.isWebGLAvailable()) {
        elem.appendChild(WEBGL.getWebGLErrorMessage());
        return;
    }

    var renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    var camera = new THREE.PerspectiveCamera(70, elem.clientWidth / elem.clientHeight, 1, 1000);
    renderer.setSize(elem.clientWidth, elem.clientHeight);
    elem.appendChild(renderer.domElement);

    window.addEventListener('resize', function () {
        renderer.setSize(elem.clientWidth, elem.clientHeight);
        camera.aspect = elem.clientWidth / elem.clientHeight;
        camera.updateProjectionMatrix();
    }, false);

    var controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.rotateSpeed = 0.05;
    controls.dampingFactor = 0.1;
    controls.enableZoom = true;
    controls.enablePan = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = .75;
    
    // set our initial view angle
    camera.position.set( 0, 25, 0 );
    controls.update();

    var scene = new THREE.Scene();

    scene.add(new THREE.HemisphereLight(0xffffff, 0x080820, 1.5));

    (new STLLoader()).load(model, function (geometry) {
        var material = new THREE.MeshPhongMaterial({ color: elem.getAttribute('data-stl-color'), specular: 100, shininess: 100 });
        var mesh = new THREE.Mesh(geometry, material);

        // Compute the middle
        var middle = new THREE.Vector3();
        geometry.computeBoundingBox();
        geometry.boundingBox.getCenter(middle);

        // Center it
        //mesh.rotation.set(- Math.PI / 2, 0,  0); //rotate for our orientation
        // rotated to match z in sketchup/windows stl viewer
        mesh.rotateX(-Math.PI/2);
        mesh.translateX( -1 * middle.x );
        mesh.translateY( -1 * middle.y );
        mesh.translateZ( -1 * middle.z );

        // add the mesh to the scene
        scene.add(mesh);

        // Pull the camera away as needed
        var largestDimension = Math.max(geometry.boundingBox.max.x,
            geometry.boundingBox.max.y, geometry.boundingBox.max.z)
        camera.position.z = largestDimension * 1.5;

        var animate = function () {
            requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
        }; animate();

    });
}

