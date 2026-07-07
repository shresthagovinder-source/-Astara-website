const canvas = document.getElementById("earthCanvas");

if (canvas) {
  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    45,
    canvas.clientWidth / canvas.clientHeight,
    0.1,
    1000
);
  camera.position.z = 5;

  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: true
  });

  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  function resize() {
    const size = Math.min(canvas.clientWidth, canvas.clientHeight);
    renderer.setSize(size, size, false);
    camera.aspect = 1;
    camera.updateProjectionMatrix();
  }

  resize();

  const loader = new THREE.TextureLoader();
  const earthTexture = loader.load("Textures/8k_earth_daymap.jpg");

  const earthGeometry = new THREE.SphereGeometry(2, 512, 512);

  const earthMaterial = new THREE.MeshPhongMaterial({
    map: earthTexture,
    shininess: 12
  });

  const earth = new THREE.Mesh(earthGeometry, earthMaterial);
  earth.rotation.y = -1.2;
  scene.add(earth);

  const atmosphereGeometry = new THREE.SphereGeometry(2.08, 128, 128);
  const atmosphereMaterial = new THREE.MeshBasicMaterial({
    color: 0x38eaff,
    transparent: true,
    opacity: 0.12,
    side: THREE.BackSide
  });

  const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
  scene.add(atmosphere);

  const sunLight = new THREE.DirectionalLight(0xffffff, 2.5);
  sunLight.position.set(5, 3, 5);
  scene.add(sunLight);

  const softLight = new THREE.AmbientLight(0xffffff, 0.45);
  scene.add(softLight);

  let isDragging = false;
  let previousX = 0;

  canvas.addEventListener("mousedown", function (e) {
    isDragging = true;
    previousX = e.clientX;
  });

  window.addEventListener("mouseup", function () {
    isDragging = false;
  });

  window.addEventListener("mousemove", function (e) {
    if (!isDragging) return;
    const deltaX = e.clientX - previousX;
    earth.rotation.y += deltaX * 0.005;
    previousX = e.clientX;
  });

  window.addEventListener("resize", resize);

  function animate() {
    requestAnimationFrame(animate);

    if (!isDragging) {
      earth.rotation.y += 0.0018;
      atmosphere.rotation.y += 0.0018;
    }

    renderer.render(scene, camera);
  }

  animate();
}
