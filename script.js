const canvas = document.getElementById("earthCanvas");

if (canvas) {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });

  renderer.setSize(canvas.clientWidth, canvas.clientHeight);

  const geometry = new THREE.SphereGeometry(2, 64, 64);
  const material = new THREE.MeshStandardMaterial({
    color: 0x1e90ff,
    wireframe: true
  });

  const earth = new THREE.Mesh(geometry, material);
  scene.add(earth);

  const light = new THREE.PointLight(0xffffff, 2);
  light.position.set(5, 5, 5);
  scene.add(light);

  camera.position.z = 6;

  function animate() {
    requestAnimationFrame(animate);
    earth.rotation.y += 0.006;
    earth.rotation.x += 0.001;
    renderer.render(scene, camera);
  }

  animate();
}
