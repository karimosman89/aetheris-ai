/* =========================================================================
   AETHERIS AI · 3D Hero — Three.js interactive neural data-mesh
   A rotating icosahedron wireframe "AI core" wrapped in an orbiting
   particle field + connective lines, reacting to pointer movement.
   ========================================================================= */
import * as THREE from 'three'

function initHero3D() {
  const mount = document.getElementById('hero-3d')
  if (!mount) return

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const scene = new THREE.Scene()

  const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 100)
  camera.position.z = 6

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  mount.appendChild(renderer.domElement)

  // ---- Color palette (matches CSS brand) ----
  const C_CYAN = new THREE.Color('#22e3d4')
  const C_BLUE = new THREE.Color('#4f7bff')
  const C_VIOLET = new THREE.Color('#a855f7')

  const group = new THREE.Group()
  scene.add(group)

  // ---- Central AI core: layered icosahedron wireframes ----
  const cores = []
  const coreDefs = [
    { r: 1.55, color: C_CYAN, detail: 1, opacity: 0.9 },
    { r: 2.15, color: C_BLUE, detail: 1, opacity: 0.5 },
    { r: 2.75, color: C_VIOLET, detail: 2, opacity: 0.28 },
  ]
  coreDefs.forEach((d) => {
    const geo = new THREE.IcosahedronGeometry(d.r, d.detail)
    const wire = new THREE.WireframeGeometry(geo)
    const mat = new THREE.LineBasicMaterial({ color: d.color, transparent: true, opacity: d.opacity })
    const mesh = new THREE.LineSegments(wire, mat)
    group.add(mesh)
    cores.push(mesh)

    // glowing vertex nodes
    const pts = new THREE.Points(
      geo,
      new THREE.PointsMaterial({ color: d.color, size: 0.06, transparent: true, opacity: d.opacity + 0.1, sizeAttenuation: true })
    )
    group.add(pts)
    cores.push(pts)
  })

  // ---- Orbiting particle field ----
  const PCOUNT = window.innerWidth < 700 ? 380 : 900
  const positions = new Float32Array(PCOUNT * 3)
  const colors = new Float32Array(PCOUNT * 3)
  const seeds = []
  for (let i = 0; i < PCOUNT; i++) {
    const radius = 3.2 + Math.random() * 3.2
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(2 * Math.random() - 1)
    const x = radius * Math.sin(phi) * Math.cos(theta)
    const y = radius * Math.sin(phi) * Math.sin(theta)
    const z = radius * Math.cos(phi)
    positions[i * 3] = x
    positions[i * 3 + 1] = y
    positions[i * 3 + 2] = z
    seeds.push({ radius, theta, phi, speed: 0.05 + Math.random() * 0.15 })
    const cc = Math.random()
    const col = cc < 0.4 ? C_CYAN : cc < 0.75 ? C_BLUE : C_VIOLET
    colors[i * 3] = col.r; colors[i * 3 + 1] = col.g; colors[i * 3 + 2] = col.b
  }
  const pGeo = new THREE.BufferGeometry()
  pGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  pGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3))
  const particles = new THREE.Points(
    pGeo,
    new THREE.PointsMaterial({ size: 0.045, vertexColors: true, transparent: true, opacity: 0.85, sizeAttenuation: true, depthWrite: false, blending: THREE.AdditiveBlending })
  )
  scene.add(particles)

  // ---- Pointer parallax ----
  const target = { x: 0, y: 0 }
  const cur = { x: 0, y: 0 }
  function onMove(e) {
    const t = e.touches ? e.touches[0] : e
    target.x = (t.clientX / window.innerWidth - 0.5) * 2
    target.y = (t.clientY / window.innerHeight - 0.5) * 2
  }
  window.addEventListener('pointermove', onMove, { passive: true })
  window.addEventListener('touchmove', onMove, { passive: true })

  // ---- Resize ----
  function resize() {
    const w = mount.clientWidth || window.innerWidth
    const h = mount.clientHeight || window.innerHeight
    renderer.setSize(w, h, false)
    camera.aspect = w / h
    camera.updateProjectionMatrix()
  }
  resize()
  window.addEventListener('resize', resize)

  // ---- Animation loop ----
  const clock = new THREE.Clock()
  let raf
  function animate() {
    raf = requestAnimationFrame(animate)
    const t = clock.getElapsedTime()

    cur.x += (target.x - cur.x) * 0.045
    cur.y += (target.y - cur.y) * 0.045

    if (!prefersReduced) {
      group.rotation.y = t * 0.14 + cur.x * 0.5
      group.rotation.x = Math.sin(t * 0.2) * 0.12 + cur.y * 0.4
      cores.forEach((m, i) => { m.rotation.z = t * (0.03 + i * 0.008) })

      // breathe the particle field
      const arr = pGeo.attributes.position.array
      for (let i = 0; i < PCOUNT; i++) {
        const s = seeds[i]
        const ang = s.theta + t * s.speed * 0.35
        const r = s.radius + Math.sin(t * 0.6 + i) * 0.06
        arr[i * 3] = r * Math.sin(s.phi) * Math.cos(ang)
        arr[i * 3 + 1] = r * Math.sin(s.phi) * Math.sin(ang)
        arr[i * 3 + 2] = r * Math.cos(s.phi)
      }
      pGeo.attributes.position.needsUpdate = true
      particles.rotation.y = -t * 0.03 + cur.x * 0.2
    }

    camera.position.x += (cur.x * 0.6 - camera.position.x) * 0.05
    camera.position.y += (-cur.y * 0.6 - camera.position.y) * 0.05
    camera.lookAt(0, 0, 0)

    renderer.render(scene, camera)
  }
  animate()

  // pause when tab hidden (save battery / CPU)
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) { cancelAnimationFrame(raf) } else { animate() }
  })
}

// wait until layout ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => setTimeout(initHero3D, 60))
} else {
  setTimeout(initHero3D, 60)
}
