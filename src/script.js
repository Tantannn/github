import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import * as CANNON from 'cannon'

var ball_speed = 0.1;
var ball_radius;
var ball_speed = 0.1;



function setScene() {

	scene = new THREE.Scene();
}


/**
 * Debug
 */

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()


    const x_plane = 5;
    const y_plane = 3;
    const x_cube = 0.1;
    const y_cube = 0.5;
        /* Inside this we put all the object of our scene */
 
    
        /* Adding the plane */
        var geometry = new THREE.BoxGeometry( x_plane, y_plane, 0.01 );
        var material = new THREE.MeshPhongMaterial( {color: 0x2222ff, side: THREE.DoubleSide} );
        const plane = new THREE.Mesh( geometry, material );
        scene.add( plane );
    
        /* adding the vertical decoration */
        var geometry = new THREE.BoxGeometry( 0.05, y_plane, 0.1 );
        var material = new THREE.MeshBasicMaterial( {color: 0x888888, side: THREE.DoubleSide} );
        var dec1 = new THREE.Mesh( geometry, material );
        scene.add( dec1 );
    
        /* adding the top horizontal decoration */
        var geometry = new THREE.BoxGeometry( x_plane + 0.1, 0.05, 0.1 );
        var material = new THREE.MeshBasicMaterial( {color: 0xcccccc, side: THREE.DoubleSide} );
        var dec2 = new THREE.Mesh( geometry, material );
        dec2.position.y = y_plane/2 + 0.025;
        scene.add( dec2 );
    
        /* adding the low horizontal decoration */
        var geometry = new THREE.BoxGeometry( x_plane + 0.1, 0.05, 0.1 );
        var material = new THREE.MeshBasicMaterial( {color: 0xcccccc, side: THREE.DoubleSide} );
        var dec3 = new THREE.Mesh( geometry, material );
        dec3.position.y = -y_plane/2 -0.025;
        scene.add( dec3 );
    
        /* Adding player 1 */
        var geometry = new THREE.BoxGeometry( x_cube, y_cube, 0.1 );
        var material = new THREE.MeshPhongMaterial( {color: 0x005000} );
        const player_1 = new THREE.Mesh( geometry, material );
        player_1.position.x = -x_plane / 2;
        scene.add( player_1 );
    
        /* Adding player 2 */
        var geometry = new THREE.BoxGeometry( x_cube, y_cube, 0.1 );
        var material = new THREE.MeshPhongMaterial( {color: 0xff0000} );
        const player_2 = new THREE.Mesh( geometry, material );
        player_2.position.x = x_plane / 2;
        scene.add( player_2 );
    
    
        /* Adding the ball */
        ball_radius = 0.05;
        var geometry = new THREE.SphereGeometry( ball_radius, 32, 32 );
        var material = new THREE.MeshPhongMaterial( {color: 0xFF8C00} );
        const ball = new THREE.Mesh( geometry, material );
        ball.position.z += 0.05;
        scene.add( ball );
    
        
    
    




/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.7)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.2)
directionalLight.castShadow = true
directionalLight.shadow.mapSize.set(1024, 1024)
directionalLight.shadow.camera.far = 15
directionalLight.shadow.camera.left = - 7
directionalLight.shadow.camera.top = 7
directionalLight.shadow.camera.right = 7
directionalLight.shadow.camera.bottom = - 7
directionalLight.position.set(5, 5, 5)
scene.add(directionalLight)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.set(0, 0, 3)
camera.lookAt(0,0,0)
scene.add(camera)

// Controls
function save_ball_speed(){
	if( ball_speed != 0 ){
		return ball_speed;
	}
}

var lock = 0;
function respawn_on_player1( recover_speed ){
	ball.position.copy( player_1.position );
	console.log( recover_speed )
	ball_speed = -recover_speed;
	lock = 0;
}

function respawn_on_player2( recover_speed ){
	ball.position.copy( player_2.position );
	console.log( recover_speed )
	ball_speed = -recover_speed;
	lock = 0;
}

function get_random_angle( minimum, maximum ){

	var randomnumber = Math.random() * ( maximum - minimum ) + minimum;
	
	return randomnumber;
}

var ball_angle = Math.PI;
var player2_speed = 0.05;

	
  window.addEventListener("keydown", function (event) {
	if (event.key == "ArrowUp" && player_1.position.y < y_plane/2 ) {
	  player_1.position.y += 0.2;
	  return;
	}
	if (event.key == "ArrowDown" && player_1.position.y > -y_plane/2) {
		player_1.position.y -= 0.2;

		return;
	  }
})
function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
}


function setLights(){

	var light = new THREE.AmbientLight( 0xffffff );
	scene.add( light );


	var spotLight = new THREE.SpotLight( 0xffffff );
	spotLight.position.set( 0, 0, 2 );

	spotLight.castShadow = true;

	spotLight.shadow.mapSize.width = window.innerWidth;
	spotLight.shadow.mapSize.height = window.innerHeight;

	scene.add( spotLight );
}


// function reset(){

// 	player1_score = 0;
// 	player2_score = 0;
// 	document.getElementById("player1_score").innerHTML = player1_score;
// 	document.getElementById("player2_score").innerHTML = player2_score;
	
// 	if( lock == 0 ){
// 		ball.position.x = 0;
// 		ball.position.y = 0;
// 		ball_speed = -0.1;
// 		ball_angle = Math.PI;	
// 	}
// }




/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

const clock = new THREE.Clock()
let oldElapsedTime = 0

function tick()
{
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - oldElapsedTime
    oldElapsedTime = elapsedTime




	
	ball.position.x += ball_speed * Math.cos( ball_angle );
	ball.position.y += ball_speed * Math.sin( ball_angle );

	
	/* check player_1 collision */
	if( ( ball.position.x < player_1.position.x + (x_cube / 2) ) && 
		( ball.position.y < ( player_1.position.y + y_cube / 2  ) ) &&
		( ball.position.y > ( player_1.position.y - y_cube / 2  ) ) ) {

		if( lock == 0 ){
			ball.position.x = player_1.position.x + (x_cube / 2);
			ball_speed = -ball_speed;
			ball_angle = get_random_angle( -Math.PI/4, Math.PI/4 );
		}
	}

	/* check player_2 collision */
	if( ( ball.position.x > player_2.position.x - (x_cube / 2) ) && 
		( ball.position.y < ( player_2.position.y + y_cube / 2  ) ) &&
		( ball.position.y > ( player_2.position.y - y_cube / 2  ) ) ) {

		if( lock == 0 ){
			ball.position.x = player_2.position.x - (x_cube / 2);
			ball_speed = -ball_speed;
			ball_angle = get_random_angle( -Math.PI/4, Math.PI/4 );
		}
	}

	/* collision with tob barrier */
	if( ball.position.y >= (y_plane / 2)){
		ball_angle = -ball_angle;
	}

	/* collision with tob barrier */
	if( ball.position.y <= -(y_plane / 2)){
		ball_angle = -ball_angle;
	}

	/* AI of red player */
	if( player_2.position.y <= (ball.position.y - player2_speed) ){
		if( player_2.position.y < ( (y_plane / 2) - ( y_cube / 2 )) ){
				player_2.position.y += player2_speed;
		}
	}

	if( player_2.position.y > ball.position.y ){
		if( player_2.position.y > ( - (y_plane / 2) + ( y_cube / 2 )) ){
			player_2.position.y -= 0.1;
		}
	}

	/* Goal on player_1 side */
	if( ball.position.x < -x_plane/2 - 2*ball_radius ){

		var old_ball_speed = save_ball_speed();

		if( lock == 0 ){
			setTimeout( respawn_on_player1, 1000, old_ball_speed );
			lock = 1;
		}

		ball_speed = 0;
	}


	/* Goal on player_2 side */
	if( ball.position.x > x_plane/2 + 2*ball_radius ){

		var old_ball_speed = save_ball_speed();

		if( lock == 0  ){
			setTimeout( respawn_on_player2, 1000, old_ball_speed );
			lock = 1;
		}
		
		ball_speed = 0;
	}


	renderer.render( scene, camera );
    window.requestAnimationFrame(tick)
}

tick()