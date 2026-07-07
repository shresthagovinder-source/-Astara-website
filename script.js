const canvas = document.getElementById("earthCanvas");

if (canvas) {

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
        45,
        canvas.clientWidth / canvas.clientHeight,
        0.1,
        1000
    );

    const renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true
    });

    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    const loader = new THREE.TextureLoader();

    const earthTexture = loader.load("Textures/8k_earth_daymap.jpg");

    const geometry = new THREE.SphereGeometry(2, 256, 256);

    const material = new THREE.MeshStandardMaterial({
        map: earthTexture
    });

    const earth = new THREE.Mesh(geometry, material);

    scene.add(earth);

    const light = new THREE.DirectionalLight(0xffffff, 2);
    light.position.set(5, 3, 5);
    scene.add(light);

    const ambient = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambient);

    camera.position.z = 5;

    function animate() {

        requestAnimationFrame(animate);

        earth.rotation.y += 0.0025;

        renderer.render(scene, camera);

    }

    animate();

}
