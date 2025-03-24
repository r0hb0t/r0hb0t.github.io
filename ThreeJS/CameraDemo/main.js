import * as THREE from 'three';

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene( {color: 0xff0000} );

//CAMERA AND CAMERA MOVEMENT
const cam = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 0.1, 100);
const radians = {
    x: 0,
    y: 0
};
const camRadius = {
    init: 20,
    now: 20
};
function updateCam() {
    if (Math.abs(radians.y) > Math.PI / 2) {
        radians.y = Math.sign(radians.y) * Math.PI / 2;
    }
    cam.position.y = Math.sin(radians.y) * camRadius.init;
    camRadius.now = Math.cos(radians.y) * camRadius.init;
    cam.position.x = Math.cos(radians.x) * camRadius.now; //horizontal distance
    cam.position.z = Math.sin(radians.x) * camRadius.now; //horizontal distance
    //cam.position.y = Math.cos(radians.y) * 20; cylindrical mvmt without y

    cam.lookAt(0,0,0);
}
updateCam(); //initialize camera position/rotation

window.addEventListener("resize", (event) => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    cam.aspect = window.innerWidth / window.innerHeight;
    cam.updateProjectionMatrix();
}, false);

//change FOV
const fovSlider = document.getElementById("fov");
fovSlider.addEventListener("input", (event) => {
    cam.fov = fovSlider.value;
    cam.updateProjectionMatrix();
}, false);

//change look sensitivity
const lookSlider = document.getElementById("camSensitivity");
let lookSens = lookSlider.value;
lookSlider.addEventListener("change", (event) => {
    lookSens = lookSlider.value;
}, false);

//change zoom sensitivity
const zoomSlider = document.getElementById("scrollSensitivity");
let zoomSens = zoomSlider.value;
zoomSlider.addEventListener("change", (event) => {
    zoomSens = zoomSlider.value;
}, false);

const mouse = new THREE.Vector2(0, 0);
const oldMouse = new THREE.Vector2(0, 0);

let isMouseDown = false;
document.addEventListener("mousedown", (event) => {
    isMouseDown = true;
    oldMouse.x = (event.clientX / window.innerWidth) * 2 - 1; //normalizes to range (-1, 1);
    oldMouse.y = (event.clientY / window.innerHeight) * 2 - 1;
}, false);
document.addEventListener("mouseup", (event) => {isMouseDown = false;}, false);

document.addEventListener("mousemove", (event) => { 
    if (isMouseDown) {
        onDocMouseMove(event);
    }
}, false);
function onDocMouseMove(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1; //normalizes to range (-1, 1);
    mouse.y = (event.clientY / window.innerHeight) * 2 - 1;
    const mouseMove = new THREE.Vector2(mouse.x - oldMouse.x, mouse.y - oldMouse.y);
    radians.x += mouseMove.x * lookSens;
    radians.y += mouseMove.y * lookSens;
    updateCam();
    oldMouse.x = mouse.x;
    oldMouse.y = mouse.y;
}

document.addEventListener("wheel", onDocScroll, false);
function onDocScroll(event) {
    camRadius.init += Math.sign(event.deltaY) * zoomSens;
    if (camRadius.init < 6) {
        camRadius.init = 6;
    }
    else if (camRadius.init > cam.far / 2) {
        camRadius.init = cam.far / 2;
    }
    updateCam();
}



//OBJECTS
const materials = [
    new THREE.LineBasicMaterial( {color: 0xff0000} ),
    new THREE.LineBasicMaterial( {color: 0x00ff00} ),
    new THREE.LineBasicMaterial( {color: 0x0000ff} )];
const points = [[],[],[]];
points[0].push(new THREE.Vector3(-50,0,0));
points[0].push(new THREE.Vector3(50,0,0));
points[1].push(new THREE.Vector3(0,-50,0));
points[1].push(new THREE.Vector3(0,50,0));
points[2].push(new THREE.Vector3(0,0,-50));
points[2].push(new THREE.Vector3(0,0,50));

for (let i=0;i<points.length;i++) {
    let geometry = new THREE.BufferGeometry().setFromPoints(points[i]);
    let line = new THREE.Line(geometry, materials[i]);
    scene.add(line);
} //Red is X, green is Y, blue is Z

const coneMats = [
    new THREE.MeshNormalMaterial( {color:0xffffff, wireframe:false, side: THREE.FrontSide, flatShading: false, shininess: 0.5} ),
    new THREE.MeshNormalMaterial( {color:0xff0000, wireframe:true, side: THREE.BackSide, flatShading: false, shininess: 2} )
];
const coneGeos = [
    new THREE.ConeGeometry(5, 5, 16),
    new THREE.ConeGeometry(5.001, 5.001, 16)
];
const cones = [];
for (let i=0;i<coneMats.length + 2;i++) {
    if (i<coneMats.length) {
        cones.push(new THREE.Mesh(coneGeos[i], coneMats[i]));
        cones[i].position.y = 2.5;
    }
    else {
        cones.push(new THREE.Mesh(coneGeos[i-2], coneMats[i-2]));
        cones[i].position.y = -2.5;
        cones[i].rotation.x = Math.PI;
    }
    scene.add(cones[i]);
}

const sphereMat = new THREE.MeshBasicMaterial( {color: 0xffffff} );


let lights = [new THREE.DirectionalLight(0xffffff, 3), 
    new THREE.AmbientLight(0xffffff, 1)];

lights[0].position.set(5,0,5);
for (let i=0;i<2;i++) {
    scene.add(lights[i]);
}


function animate() {
    for (const i of Object.keys(arrowKeys)) {
        if (arrowKeys[i]) {
            if (i == "up") {
                radians.y += 0.001 * lookSens;
                updateCam();
            }
            if (i == "down") {
                radians.y -= 0.001 * lookSens;
                updateCam();
            }
            if (i == "left") {
                radians.x += 0.001 * lookSens;
                updateCam();
            }
            if (i == "right") {
                radians.x -= 0.001 * lookSens;
                updateCam();
            }
        }
    }

    renderer.render(scene, cam);
}



//KEYBOARD INPUT
const arrowKeys = {
    up: false,
    down: false,
    left: false,
    right: false,
}

const moveSpd = Math.PI/64;
document.addEventListener("keydown", onDocKeyDown, false);
function onDocKeyDown(event) {
    
    const keycode = event.which;
    switch (keycode) {
        case 38: //up
            arrowKeys.up = true;
            break;
        case 40: //down
            arrowKeys.down = true;
            break;
        case 37: //left
            arrowKeys.left = true;
            break;
        case 39: //right
            arrowKeys.right = true;
            break;
    }
    switch (keycode) {
        case 38: //up
        case 40: //down
        case 37: //left
        case 39: //right
            event.preventDefault();
            break;
    }
}

document.addEventListener("keyup", onDocKeyUp, false);
function onDocKeyUp(event) {
    const keycode = event.which;
    switch (keycode) {
        case 38: //up
            arrowKeys.up = false;
            break;
        case 40: //down
            arrowKeys.down = false;
            break;
        case 37: //left
            arrowKeys.left = false;
            break;
        case 39: //right
            arrowKeys.right = false;
            break;
    }
}