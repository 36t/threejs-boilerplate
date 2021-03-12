import * as THREE from 'three'

import Shape from './Shape'
import backgroundImage from '../../img/background.png'

export default class View {
  private renderer: THREE.WebGLRenderer
  private scene: THREE.Scene
  private camera: THREE.PerspectiveCamera
  private ring: Shape

  constructor(canvasElem: HTMLCanvasElement) {
    this.renderer = new THREE.WebGLRenderer({
      canvas: canvasElem,
      antialias: true,
    })

    this.camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100)
    this.camera.position.z = 15
    this.scene = new THREE.Scene()
    // this.scene.background = new THREE.TextureLoader().load(backgroundImage)
    this.ring = new Shape(this.scene)

    this.onWindowResize(window.innerWidth, window.innerHeight)
  }

  public onWindowResize(vpW: number, vpH: number): void {
    this.renderer.setSize(vpW, vpH)
    this.camera.aspect = vpW / vpH
    this.camera.updateProjectionMatrix()
  }

  public update(secs: number): void {
    this.ring.update(secs)
    this.renderer.render(this.scene, this.camera)
  }
}
