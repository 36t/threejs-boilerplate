import * as THREE from 'three'
import LoadingManager from './LoadingManager'

export default class TextureLoader {
  private textureLoader: THREE.TextureLoader
  private filePath: string

  constructor(filePath: string) {
    const loadingManager = new LoadingManager()

    this.textureLoader = new THREE.TextureLoader(loadingManager.init())
    this.filePath = filePath
  }

  public load(): THREE.Texture {
    return this.textureLoader.load(
      this.filePath,
      (texture: THREE.Texture) => this.onLoad(texture),
      (event: ProgressEvent) => this.onProgress(event),
      (event: ErrorEvent) => this.textureLoaderError(event)
    )
  }

  public async loadAsync(): Promise<THREE.Texture> {
    return this.textureLoader.loadAsync(this.filePath, (event: ProgressEvent) => this.onProgress(event))
  }

  private onLoad(texture: THREE.Texture): void {
    return console.log(texture)
  }

  private onProgress(event: ProgressEvent): void {
    return console.log(event)
  }

  private textureLoaderError(event: ErrorEvent): void {
    return console.error(event)
  }
}
