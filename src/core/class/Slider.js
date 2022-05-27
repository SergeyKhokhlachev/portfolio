import {
  Scene,
  WebGLRenderer,
  PerspectiveCamera,
  TextureLoader,
  ShaderMaterial,
  DoubleSide,
  Vector4,
  PlaneGeometry,
  Mesh,
} from 'three';

import { GUI } from 'dat.gui';
import gsap from 'gsap';

export class Slider {
  constructor(opts) {
    this.scene = new Scene();
    this.renderer = opts.renderer;
    this.time = 0;
    this.current = 0;
    this.paused = true;
    this.animaton = null,
    this.debug = opts.debug || false;
    this.duration = opts.duration || 1;
    this.easing = opts.easing || 'easeInOut';
    this.images = opts.images;
    this.vertex = opts.vertex;
    this.fragment = opts.fragment;
    this.displacement = opts.displacement;
    this.uniforms = opts.uniforms;
    this.textures = [];
  }
  initiate(container) {
    const promises = [];
    const that = this;

    this.container = container;
    this.width = this.container.offsetWidth;
    this.height = this.container.offsetHeight;
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(this.width, this.height);
    this.renderer.setClearColor(0xeeeeee, 1);
    this.camera = new PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.001, 1000);
    this.camera.position.set(0, 0, 2);
    this.container.appendChild(this.renderer.domElement);
    this.images.forEach((url, i) => {
      let promise = new Promise((resolve) => {
        that.textures[i] = new TextureLoader().load(url, resolve);
      });
      promises.push(promise);
    });
    Promise.all(promises).then(() => {
      that.setupResize();
      that.settings();
      that.addObjects(this.displacement);
      that.resize();
      that.play();
    });
  }
  settings() {
    if (this.debug) this.gui = new GUI();
    this.settings = { progress: 0.5 };
    Object.keys(this.uniforms).forEach((item) => {
      this.settings[item] = this.uniforms[item].value;
      if (this.debug)
        this.gui.add(
          this.settings,
          item,
          this.uniforms[item].min,
          this.uniforms[item].max,
          0.01
        );
    });
  }
  setupResize() {
    window.addEventListener('resize', this.resize.bind(this));
  }
  resize() {
    this.width = this.container.offsetWidth;
    this.height = this.container.offsetHeight;
    this.renderer.setSize(this.width, this.height);
    this.camera.aspect = this.width / this.height;
    this.imageAspect = this.textures[0].image.height / this.textures[0].image.width;
    let a1;
    let a2;
    if (this.height / this.width > this.imageAspect) {
      a1 = (this.width / this.height) * this.imageAspect;
      a2 = 1;
    } else {
      a1 = 1;
      a2 = this.height / this.width / this.imageAspect;
    }
    this.material.uniforms.resolution.value.x = this.width;
    this.material.uniforms.resolution.value.y = this.height;
    this.material.uniforms.resolution.value.z = a1;
    this.material.uniforms.resolution.value.w = a2;
    const dist = this.camera.position.z;
    const height = 1;
    this.camera.fov = 2 * (180 / Math.PI) * Math.atan(height / (2 * dist));
    this.plane.scale.x = this.camera.aspect;
    this.plane.scale.y = 1;
    this.camera.updateProjectionMatrix();
  }
  addObjects(displacement) {
    this.material = new ShaderMaterial({
      extensions: {
        derivatives: '#extension GL_OES_standard_derivatives : enable',
      },
      side: DoubleSide,
      uniforms: {
        time: { type: 'f', value: 0 },
        progress: { type: 'f', value: 0 },
        border: { type: 'f', value: 0 },
        intensity: { type: 'f', value: 0 },
        scaleX: { type: 'f', value: 40 },
        scaleY: { type: 'f', value: 40 },
        transition: { type: 'f', value: 40 },
        swipe: { type: 'f', value: 0 },
        width: { type: 'f', value: 0 },
        radius: { type: 'f', value: 0 },
        texture1: { type: 'f', value: this.textures[0] },
        texture2: { type: 'f', value: this.textures[1] },
        displacement: {
          type: 'f',
          value: new TextureLoader().load(displacement),
        },
        resolution: { type: 'v4', value: new Vector4() },
      },
      vertexShader: this.vertex,
      fragmentShader: this.fragment,
    });
    this.geometry = new PlaneGeometry(1, 1, 2, 2);
    this.plane = new Mesh(this.geometry, this.material);
    this.scene.add(this.plane);
  }
  stop() {
    this.paused = true;
  }
  play() {
    this.paused = false;
    this.render();
  }
  set(slide, callback) {
    if (this.isRunning) return;
    this.isRunning = true;
    let len = this.textures.length;
    let nextTexture = this.textures[(slide) % len];
    this.material.uniforms.texture2.value = nextTexture;
    let tl = gsap.timeline();
    tl.to(this.material.uniforms.progress, {
      duration: this.duration,
      value: 1,
      ease: `power2[${this.easing}]`,
      onComplete: () => {
        this.current = (slide) % len;
        this.material.uniforms.texture1.value = nextTexture;
        this.material.uniforms.progress.value = 0;
        this.isRunning = false;
        callback(this.current);
      },
    });
  }
  next(callback) {
    if (this.isRunning) return;
    this.isRunning = true;
    let len = this.textures.length;
    let nextTexture = this.textures[(this.current + 1) % len];
    this.material.uniforms.texture2.value = nextTexture;
    let tl = gsap.timeline();
    tl.to(this.material.uniforms.progress, {
      duration: this.duration,
      value: 1,
      ease: `power2[${this.easing}]`,
      onComplete: () => {
        this.current = (this.current + 1) % len;
        this.material.uniforms.texture1.value = nextTexture;
        this.material.uniforms.progress.value = 0;
        this.isRunning = false;
        callback(this.current);
      },
    });
  }
  render() {
    if (this.paused) return;
    this.time += 0.05;
    this.material.uniforms.time.value = this.time;
    Object.keys(this.uniforms).forEach((item) => {
      this.material.uniforms[item].value = this.settings[item];
    });
    this.animaton = requestAnimationFrame(this.render.bind(this));
    this.renderer.render(this.scene, this.camera);
  }
  dispose() {
    window.removeEventListener('resize', this.resize);
    cancelAnimationFrame(this.animaton);
    this.scene.remove(this.plane);
  }
}
