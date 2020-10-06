// Frameworks
import React from 'react';
import * as THREE from 'three';

// Utils
import { useEffect } from 'react'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const prefix = 'dpw-model-';

const initModel = () => {
  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera( 150, window.innerWidth / window.innerHeight, 0.1, 1000 );

  var renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.querySelector(`.${prefix}model-container`).appendChild( renderer.domElement );

  camera.position.set(0, 0, 1);

  var light = new THREE.PointLight( 0x404040, 60, 500 );
  light.position.set( -10, 10, 0 );
  scene.add( light );

  var light_ = new THREE.PointLight( 0x404040, 10, 200 );
  light_.position.set( 6, -3, 0 );
  scene.add( light_ );
  
  var loader = new GLTFLoader();

  loader.load( require('../models/tail.glb'), function ( gltf ) {
    const obj = gltf.scene;
    var texture = new THREE.TextureLoader().load( require('../models/carbon_fibre.jpg') );
    // texture.wrapS = THREE.RepeatWrapping;
    // texture.wrapT = THREE.RepeatWrapping;
    // texture.repeat.set( 4, 4 );
    var material = new THREE.MeshPhongMaterial({map: texture});
    obj.traverse( function ( node ) {

      if ( node.isMesh ) node.material = material;
  
    } );
    scene.add(obj);
    renderer.render( scene, camera );
    animate(obj);
  }, undefined, function ( error ) {
    console.error( error );
  } );

  var animate = obj => {
    requestAnimationFrame( () => animate(obj) );

    obj.rotation.y += 0.01;

    renderer.render( scene, camera );
  };

    
  renderer.render( scene, camera );
  return true;
}

var initialized = false;

function ModelPage() {
    useEffect(() => {
        if(!initialized) initModel() && (initialized = true);
    });
    return (
        <div className={`${prefix}model-container`}></div>
    );
}

export default ModelPage;