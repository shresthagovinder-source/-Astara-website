const canvas = document.getElementById("earthCanvas");

if (canvas) {
  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    45,
    canvas.clientWidth / canvas.clientHeight,
    0.1,
    1000
  );
  camera.position.z = 8;

  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: true
  });

  renderer.setSize(canvas.clientWidth, canvas.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  const loader = new THREE.TextureLoader();
  const earthTexture = loader.load("Textures/8k_earth_daymap.jpg");

 const earthGeometry = new THREE.SphereGeometry(1.7, 128, 128);

  const earthMaterial = new THREE.MeshStandardMaterial({
    map: earthTexture,
    roughness: 0.9,
    metalness: 0.0
  });

  const earth = new THREE.Mesh(earthGeometry, earthMaterial);
  scene.add(earth);
  const atmosphereGeometry = new THREE.SphereGeometry(1.75, 128, 128);
const atmosphereMaterial = new THREE.MeshBasicMaterial({
    color: 0x4cf3ff,
    transparent: true,
    opacity: 0.35,
    side: THREE.BackSide
});

const atmosphere = new THREE.Mesh(
    atmosphereGeometry,
    atmosphereMaterial
);

scene.add(atmosphere);


  const light = new THREE.DirectionalLight(0xffffff, 2);
  light.position.set(5, 3, 5);
  scene.add(light);

  const ambient = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambient);
const starsGeometry = new THREE.BufferGeometry();
const starsCount = 5000;

const positions = [];

for (let i = 0; i < starsCount; i++) {
    positions.push((Math.random() - 0.5) * 2000);
    positions.push((Math.random() - 0.5) * 2000);
    positions.push((Math.random() - 0.5) * 2000);
}

starsGeometry.setAttribute(
    'position',
    new THREE.Float32BufferAttribute(positions, 3)
);

const starsMaterial = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 2.5
});

const stars = new THREE.Points(
    starsGeometry,
    starsMaterial
);
scene.add(stars);

function animate() {
    requestAnimationFrame(animate);
   earth.rotation.y += 0.0008;
atmosphere.rotation.y += 0.0008;
stars.rotation.y += 0.0002;
    renderer.render(scene, camera);
  }

  animate();
}
