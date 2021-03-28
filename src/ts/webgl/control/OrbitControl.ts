import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

export default class OrbitControl {
  controls: OrbitControls

  constructor(camera: THREE.PerspectiveCamera, canvasElem: HTMLCanvasElement) {
    this.controls = new OrbitControls(camera, canvasElem)
    this.controls.enableDamping = true
  }

  public update(): void {
    this.controls.update()
  }
}
