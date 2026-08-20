const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

if (menuToggle && navMenu) {
  menuToggle.addEventListener('click', () => {
    const open = navMenu.classList.toggle('active');
    menuToggle.setAttribute('aria-expanded', String(open));
    const icon = menuToggle.querySelector('i');
    icon.classList.toggle('ph-list', !open);
    icon.classList.toggle('ph-x', open);
  });

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
      const icon = menuToggle.querySelector('i');
      icon.classList.add('ph-list');
      icon.classList.remove('ph-x');
    });
  });
}

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((el, index) => {
  el.style.transitionDelay = `${Math.min(index % 3, 2) * 70}ms`;
  revealObserver.observe(el);
});

// Subtle Three.js star/particle field using Patria Games colors.
const canvas = document.getElementById('bg-canvas');

if (canvas && window.THREE && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 55;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));

  const count = window.innerWidth < 760 ? 240 : 520;
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const palette = [
    new THREE.Color(0xF7C018),
    new THREE.Color(0x009B3A),
    new THREE.Color(0x2468FF),
    new THREE.Color(0xFFFFFF)
  ];

  for (let i = 0; i < count; i++) {
    const p = i * 3;
    positions[p] = (Math.random() - 0.5) * 150;
    positions[p + 1] = (Math.random() - 0.5) * 150;
    positions[p + 2] = (Math.random() - 0.5) * 120;
    const c = palette[Math.floor(Math.random() * palette.length)];
    colors[p] = c.r;
    colors[p + 1] = c.g;
    colors[p + 2] = c.b;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const material = new THREE.PointsMaterial({
    size: 0.58,
    vertexColors: true,
    transparent: true,
    opacity: 0.26,
    blending: THREE.AdditiveBlending
  });

  const particles = new THREE.Points(geometry, material);
  scene.add(particles);

  let mouseX = 0;
  let mouseY = 0;
  let targetX = 0;
  let targetY = 0;

  window.addEventListener('pointermove', (event) => {
    mouseX = (event.clientX / window.innerWidth - 0.5) * 2;
    mouseY = (event.clientY / window.innerHeight - 0.5) * 2;
  }, { passive: true });

  const clock = new THREE.Clock();

  const animate = () => {
    requestAnimationFrame(animate);
    const t = clock.getElapsedTime();
    targetX += (mouseX - targetX) * 0.025;
    targetY += (mouseY - targetY) * 0.025;
    particles.rotation.y = t * 0.006 + targetX * 0.02;
    particles.rotation.x = t * 0.003 + targetY * 0.012;
    renderer.render(scene, camera);
  };

  animate();

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
  });
}
