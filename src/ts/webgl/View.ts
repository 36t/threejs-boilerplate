import * as THREE from 'three'

import Torus from './object/Torus'
import backgroundImage from '../../img/background.png'

export default class View {
  private renderer: THREE.WebGLRenderer
  private scene: THREE.Scene
  private camera: THREE.PerspectiveCamera
  private torus: Torus

  constructor(canvasElem: HTMLCanvasElement) {
    this.renderer = new THREE.WebGLRenderer({
      canvas: canvasElem,
      antialias: true,
    })

    // Camera
    this.camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100)
    this.camera.position.z = 15

    // Scene
    this.scene = new THREE.Scene()
    // this.scene.background = new THREE.Color('white')
    this.scene.background = new THREE.TextureLoader().load(backgroundImage)

    // Object
    this.torus = new Torus(this.scene)

    this.onWindowResize(window.innerWidth, window.innerHeight)
  }

  public onWindowResize(vpW: number, vpH: number): void {
    this.renderer.setSize(vpW, vpH)
    this.camera.aspect = vpW / vpH
    this.camera.updateProjectionMatrix()
  }

  public update(secs: number): void {
    this.torus.update(secs)
    this.renderer.render(this.scene, this.camera)
  }
}
