<div class="animate" bind:this={wrapper}></div>

<script>
  import { onMount } from 'svelte';

  import { WebGLRenderer, Scene, PerspectiveCamera } from 'three';

  import { RandomLine } from '../../core/class/RandomLine';
  import { getRandomFloat } from '../../core/helpers/utils';

  // === data
  let wrapper;
  let meshCount = 0;
  let width = window.innerWidth;
  let height = window.innerHeight;

  const scene = new Scene();

  const camera = new PerspectiveCamera(50, width / height, 1, 1000);
  camera.position.set(0, 0, 2);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  const renderer = new WebGLRenderer({antialias: true, alpha: true});
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);

  const meshListeners = [];

  // === methods
  const addMesh = (mesh) => {
    scene.add(mesh);
    if (!mesh.update) return;
    meshListeners.push(mesh.update);
    meshCount++;
  };

  const addLine = () => {
    const curve = new RandomLine({
      orientationY: getRandomFloat(0, 2),
      length: getRandomFloat(1, 4),
      amplitude: getRandomFloat(0.2, 0.6),
      nbrOfPoints: getRandomFloat(2, 6),
      speed: getRandomFloat(0.02, 0.08),
      color: 0xDCDEE0,
    });

    curve.rotation.x = getRandomFloat(0, Math.PI * 180);
    curve.position.set(
      getRandomFloat(-4, 2),
      getRandomFloat(-2, 2),
      getRandomFloat(-2, 2)
    );

    addMesh(curve);
  }

  const update = () => {
    let i = meshCount;
    while (--i >= 0) {
      meshListeners[i].apply(null);
    }
    renderer.render(scene, camera);
  }

  const resize = () => {
    width = window.innerWidth;
    height = window.innerHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  }

  const loop = () => {
    update();
    requestAnimationFrame(loop);
  }

  for (let i = 0; i < 500; i++) {
    addLine();
  }

  // === hooks
  onMount(() => {
    wrapper.appendChild(renderer.domElement);
    window.addEventListener('orientationchange', resize);
    window.addEventListener('resize', resize);
    loop();
  });
</script>

<style lang="scss">
  .animate {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background-color: #eceff1;
    z-index: -1;
  }
</style>
