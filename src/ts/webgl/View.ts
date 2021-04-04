import * as THREE from 'three'

import TextureLoader from './loader/TextureLoader'
import backgroundImage from '../../img/background.png'

import Torus from './object/Torus'
import OrbitControl from './control/OrbitControl'

export default class View {
  private renderer: THREE.WebGLRenderer
  private scene: THREE.Scene
  private camera: THREE.PerspectiveCamera
  private torus: Torus
  private orbitControl: OrbitControl

  constructor(canvasElem: HTMLCanvasElement) {
    this.renderer = new THREE.WebGLRenderer({
      canvas: canvasElem,
      antialias: true,
    })

    // Scene
    this.scene = new THREE.Scene()
    // this.scene.background = new THREE.Color('black')
    this.scene.background = new TextureLoader(backgroundImage).load()

    // Camera
    this.camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100)
    this.camera.position.z = 15

    // Object
    this.torus = new Torus(this.scene)

    // Control
    this.orbitControl = new OrbitControl(this.camera, canvasElem)

    this.onWindowResize(window.innerWidth, window.innerHeight)
  }

  public onWindowResize(vpW: number, vpH: number): void {
    this.renderer.setSize(vpW, vpH)
    this.camera.aspect = vpW / vpH
    this.camera.updateProjectionMatrix()
  }

  public update(secs: number): void {
    this.torus.update(secs)
    this.orbitControl.update()
    this.renderer.render(this.scene, this.camera)
  }
}
