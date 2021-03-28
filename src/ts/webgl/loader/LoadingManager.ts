import * as THREE from 'three'

export default class LoadingManager {
  private loadingManager: THREE.LoadingManager

  constructor() {
    this.loadingManager = new THREE.LoadingManager()
    this.loadingManager.onStart = this.onStart
    this.loadingManager.onLoad = this.onLoad
    this.loadingManager.onProgress = this.onProgress
    this.loadingManager.onError = this.onError
  }

  public init(): THREE.LoadingManager {
    return this.loadingManager
  }

  private onStart(): void {
    return console.log('[loadingManager] onStart()')
  }

  private onLoad(): void {
    return console.log('[loadingManager] onLoad()')
  }

  private onProgress(): void {
    return console.log('[loadingManager] onProgress()')
  }

  private onError(): void {
    return console.error('[loadingManager] onError()')
  }
}
