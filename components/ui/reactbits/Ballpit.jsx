'use client'
import { useEffect, useRef } from 'react'
import {
  Vector3 as a, MeshPhysicalMaterial as c, InstancedMesh as d, Clock as e,
  AmbientLight as f, SphereGeometry as g, ShaderChunk as h, Scene as i,
  Color as l, Object3D as m, SRGBColorSpace as n, MathUtils as o,
  PMREMGenerator as p, Vector2 as r, WebGLRenderer as s, PerspectiveCamera as t,
  PointLight as u, ACESFilmicToneMapping as v, Plane as w, Raycaster as y
} from 'three'
import { RoomEnvironment as z } from 'three/examples/jsm/environments/RoomEnvironment.js'

class ThreeApp {
  constructor(opts) {
    this._opts = opts; this._started = false; this._running = false
    this.size = { width: 0, height: 0, wWidth: 0, wHeight: 0, ratio: 0, pixelRatio: 0 }
    this._clock = new e()
    this._time = { elapsed: 0, delta: 0 }
    this.onBeforeRender = () => {}; this.onAfterRender = () => {}; this.onAfterResize = () => {}
    this.isDisposed = false
    this._initCamera(); this._initScene(); this._initRenderer(); this._initObservers()
  }
  _initCamera() { this.camera = new t(); this.cameraFov = this.camera.fov }
  _initScene() { this.scene = new i() }
  _initRenderer() {
    this.canvas = opts => opts.canvas || document.getElementById(opts.id)
    this.canvas = this._opts.canvas || document.getElementById(this._opts.id)
    this.canvas.style.display = 'block'
    this.renderer = new s({ canvas: this.canvas, powerPreference: 'high-performance', ...this._opts.rendererOptions })
    this.renderer.outputColorSpace = n
  }
  _initObservers() {
    if (!(this._opts.size instanceof Object)) {
      this._resizeListener = this._scheduleResize.bind(this)
      window.addEventListener('resize', this._resizeListener)
      if (this._opts.size === 'parent' && this.canvas.parentNode) {
        this._ro = new ResizeObserver(this._scheduleResize.bind(this))
        this._ro.observe(this.canvas.parentNode)
      }
    }
    this._io = new IntersectionObserver(entries => {
      this._inView = entries[0].isIntersecting
      this._inView ? this._startLoop() : this._stopLoop()
    })
    this._io.observe(this.canvas)
    this._visListener = () => { if (this._inView) { document.hidden ? this._stopLoop() : this._startLoop() } }
    document.addEventListener('visibilitychange', this._visListener)
  }
  _scheduleResize() { if (this._resizeTimer) clearTimeout(this._resizeTimer); this._resizeTimer = setTimeout(this.resize.bind(this), 100) }
  resize() {
    let w, h
    if (this._opts.size instanceof Object) { w = this._opts.size.width; h = this._opts.size.height }
    else if (this._opts.size === 'parent' && this.canvas.parentNode) { w = this.canvas.parentNode.offsetWidth; h = this.canvas.parentNode.offsetHeight }
    else { w = window.innerWidth; h = window.innerHeight }
    this.size.width = w; this.size.height = h; this.size.ratio = w / h
    this.camera.aspect = w / h; this.camera.updateProjectionMatrix()
    const fovR = (this.camera.fov * Math.PI) / 180
    this.size.wHeight = 2 * Math.tan(fovR / 2) * this.camera.position.length()
    this.size.wWidth = this.size.wHeight * this.camera.aspect
    this.renderer.setSize(w, h)
    const dpr = Math.min(window.devicePixelRatio, 2)
    this.renderer.setPixelRatio(dpr); this.size.pixelRatio = dpr
    this.onAfterResize(this.size)
  }
  _startLoop() {
    if (this._running) return
    this._running = true; this._clock.start()
    const animate = () => {
      this._raf = requestAnimationFrame(animate)
      this._time.delta = this._clock.getDelta()
      this._time.elapsed += this._time.delta
      this.onBeforeRender(this._time)
      this.renderer.render(this.scene, this.camera)
      this.onAfterRender(this._time)
    }
    animate()
  }
  _stopLoop() { if (this._running) { cancelAnimationFrame(this._raf); this._running = false; this._clock.stop() } }
  clear() {
    this.scene.traverse(obj => {
      if (obj.isMesh) { if (obj.material?.dispose) obj.material.dispose(); if (obj.geometry?.dispose) obj.geometry.dispose() }
    }); this.scene.clear()
  }
  dispose() {
    window.removeEventListener('resize', this._resizeListener)
    this._ro?.disconnect(); this._io?.disconnect()
    document.removeEventListener('visibilitychange', this._visListener)
    this._stopLoop(); this.clear()
    this.renderer.dispose(); this.renderer.forceContextLoss(); this.isDisposed = true
  }
}

const { randFloat: k, randFloatSpread: E } = o
const F=new a(),I=new a(),O=new a(),V=new a(),B=new a(),N=new a(),_=new a(),j=new a(),H=new a(),T=new a()

class Physics {
  constructor(cfg) {
    this.config = cfg
    this.positionData = new Float32Array(3 * cfg.count).fill(0)
    this.velocityData = new Float32Array(3 * cfg.count).fill(0)
    this.sizeData = new Float32Array(cfg.count).fill(1)
    this.center = new a()
    this._initPositions(); this.setSizes()
  }
  _initPositions() {
    const { config: e, positionData: t } = this
    this.center.toArray(t, 0)
    for (let i = 1; i < e.count; i++) { const s = 3*i; t[s]=E(2*e.maxX); t[s+1]=E(2*e.maxY); t[s+2]=E(2*e.maxZ) }
  }
  setSizes() {
    const { config: e, sizeData: t } = this; t[0] = e.size0
    for (let i = 1; i < e.count; i++) t[i] = k(e.minSize, e.maxSize)
  }
  update(e) {
    const { config: t, center: center, positionData: s, sizeData: n, velocityData: o } = this
    let r = t.controlSphere0 ? 1 : 0
    if (t.controlSphere0) { F.fromArray(s,0); F.lerp(center,0.1).toArray(s,0); V.set(0,0,0).toArray(o,0) }
    for (let idx=r; idx<t.count; idx++) {
      const base=3*idx; I.fromArray(s,base); B.fromArray(o,base)
      B.y-=e.delta*t.gravity*n[idx]; B.multiplyScalar(t.friction); B.clampLength(0,t.maxVelocity)
      I.add(B); I.toArray(s,base); B.toArray(o,base)
    }
    for (let idx=r; idx<t.count; idx++) {
      const base=3*idx; I.fromArray(s,base); B.fromArray(o,base); const radius=n[idx]
      for (let jdx=idx+1; jdx<t.count; jdx++) {
        const ob=3*jdx; O.fromArray(s,ob); N.fromArray(o,ob); const or2=n[jdx]
        _.copy(O).sub(I); const dist=_.length(), sum=radius+or2
        if (dist<sum) {
          const overlap=sum-dist; j.copy(_).normalize().multiplyScalar(.5*overlap)
          H.copy(j).multiplyScalar(Math.max(B.length(),1)); T.copy(j).multiplyScalar(Math.max(N.length(),1))
          I.sub(j); B.sub(H); I.toArray(s,base); B.toArray(o,base)
          O.add(j); N.add(T); O.toArray(s,ob); N.toArray(o,ob)
        }
      }
      if (t.controlSphere0) {
        _.copy(F).sub(I); const dist=_.length(), sum0=radius+n[0]
        if (dist<sum0) { const diff=sum0-dist; j.copy(_.normalize()).multiplyScalar(diff); H.copy(j).multiplyScalar(Math.max(B.length(),2)); I.sub(j); B.sub(H) }
      }
      if (Math.abs(I.x)+radius>t.maxX) { I.x=Math.sign(I.x)*(t.maxX-radius); B.x=-B.x*t.wallBounce }
      if (t.gravity===0) { if (Math.abs(I.y)+radius>t.maxY) { I.y=Math.sign(I.y)*(t.maxY-radius); B.y=-B.y*t.wallBounce } }
      else if (I.y-radius<-t.maxY) { I.y=-t.maxY+radius; B.y=-B.y*t.wallBounce }
      const mb=Math.max(t.maxZ,t.maxSize)
      if (Math.abs(I.z)+radius>mb) { I.z=Math.sign(I.z)*(t.maxZ-radius); B.z=-B.z*t.wallBounce }
      I.toArray(s,base); B.toArray(o,base)
    }
  }
}

class SubsurfaceMat extends c {
  constructor(opts) {
    super(opts)
    this.uniforms = { thicknessDistortion:{value:.1}, thicknessAmbient:{value:0}, thicknessAttenuation:{value:.1}, thicknessPower:{value:2}, thicknessScale:{value:10} }
    this.defines.USE_UV = ''
    this.onBeforeCompile = e => {
      Object.assign(e.uniforms, this.uniforms)
      e.fragmentShader = `uniform float thicknessPower,thicknessScale,thicknessDistortion,thicknessAmbient,thicknessAttenuation;\n` + e.fragmentShader
      e.fragmentShader = e.fragmentShader.replace('void main() {', `
void RE_Direct_Scattering(const in IncidentLight dL,const in vec2 uv,const in vec3 gP,const in vec3 gN,const in vec3 gV,const in vec3 gCN,inout ReflectedLight rL){
  vec3 sH=normalize(dL.direction+(gN*thicknessDistortion));
  float sD=pow(saturate(dot(gV,-sH)),thicknessPower)*thicknessScale;
  #ifdef USE_COLOR
    vec3 sI=(sD+thicknessAmbient)*vColor.rgb;
  #else
    vec3 sI=(sD+thicknessAmbient)*diffuse;
  #endif
  rL.directDiffuse+=sI*thicknessAttenuation*dL.color;
}
void main(){`)
      const t = h.lights_fragment_begin.replaceAll(
        'RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );',
        'RE_Direct(directLight,geometryPosition,geometryNormal,geometryViewDir,geometryClearcoatNormal,material,reflectedLight);RE_Direct_Scattering(directLight,vUv,geometryPosition,geometryNormal,geometryViewDir,geometryClearcoatNormal,reflectedLight);'
      )
      e.fragmentShader = e.fragmentShader.replace('#include <lights_fragment_begin>', t)
    }
  }
}

const DEFAULT_CONFIG = {
  count:200, colors:[0,0,0], ambientColor:16777215, ambientIntensity:1, lightIntensity:200,
  materialParams:{metalness:.5,roughness:.5,clearcoat:1,clearcoatRoughness:.15},
  minSize:.5, maxSize:1, size0:1, gravity:.5, friction:.9975, wallBounce:.95, maxVelocity:.15,
  maxX:5, maxY:5, maxZ:2, controlSphere0:false, followCursor:true,
}

class BallpitMesh extends d {
  constructor(renderer, opts={}) {
    const cfg={...DEFAULT_CONFIG,...opts}
    const env = new p(renderer, 0.04).fromScene(new z()).texture
    const geo = new g()
    const mat = new SubsurfaceMat({ envMap:env, ...cfg.materialParams })
    mat.envMapRotation.x = -Math.PI/2
    super(geo, mat, cfg.count)
    this.config=cfg; this.physics=new Physics(cfg)
    this.ambientLight=new f(cfg.ambientColor, cfg.ambientIntensity); this.add(this.ambientLight)
    this.light=new u(cfg.colors[0], cfg.lightIntensity); this.add(this.light)
    this.setColors(cfg.colors)
  }
  setColors(colors) {
    if (!Array.isArray(colors)||colors.length<2) return
    const cols=colors.map(c2=>new l(c2))
    const getColorAt=(ratio,out=new l())=>{
      const scaled=Math.max(0,Math.min(1,ratio))*(cols.length-1)
      const idx=Math.floor(scaled), alpha=scaled-idx, start=cols[idx]
      if (idx>=cols.length-1) return start.clone()
      const end=cols[idx+1]; out.r=start.r+alpha*(end.r-start.r); out.g=start.g+alpha*(end.g-start.g); out.b=start.b+alpha*(end.b-start.b); return out
    }
    for (let i=0; i<this.count; i++) { this.setColorAt(i, getColorAt(i/this.count)); if(i===0) this.light.color.copy(getColorAt(0)) }
    this.instanceColor.needsUpdate=true
  }
  update(e) {
    this.physics.update(e)
    const dummy=new m()
    for (let i=0; i<this.count; i++) {
      dummy.position.fromArray(this.physics.positionData, 3*i)
      dummy.scale.setScalar(i===0&&!this.config.followCursor ? 0 : this.physics.sizeData[i])
      dummy.updateMatrix(); this.setMatrixAt(i, dummy.matrix)
      if(i===0) this.light.position.copy(dummy.position)
    }
    this.instanceMatrix.needsUpdate=true
  }
}

export default function Ballpit({ className='', followCursor=true, count=150, colors=['#2563EB','#4f46e5','#7c3aed'], style={}, ...props }) {
  const canvasRef = useRef(null)
  const instanceRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const three = new ThreeApp({ canvas, size:'parent', rendererOptions:{antialias:true,alpha:true} })
    three.renderer.toneMapping = v
    three.camera.position.set(0,0,20); three.camera.lookAt(0,0,0)
    three.resize()

    let spheres = new BallpitMesh(three.renderer, { followCursor, count, colors, ...props })
    three.scene.add(spheres)
    instanceRef.current = three

    const raycaster=new y(), plane=new w(new a(0,0,1),0), point=new a()
    const mouse=new r()
    let paused=false

    const onMove=(e)=>{
      const rect=canvas.getBoundingClientRect()
      mouse.set(((e.clientX-rect.left)/rect.width)*2-1, -((e.clientY-rect.top)/rect.height)*2+1)
      raycaster.setFromCamera(mouse, three.camera)
      three.camera.getWorldDirection(plane.normal)
      raycaster.ray.intersectPlane(plane, point)
      spheres.physics.center.copy(point)
      spheres.config.controlSphere0=true
    }
    const onLeave=()=>{ spheres.config.controlSphere0=false }
    canvas.addEventListener('mousemove', onMove)
    canvas.addEventListener('mouseleave', onLeave)

    three.onBeforeRender=(e)=>{ if(!paused) spheres.update(e) }
    three.onAfterResize=(e)=>{ spheres.config.maxX=e.wWidth/2; spheres.config.maxY=e.wHeight/2 }

    return ()=>{
      canvas.removeEventListener('mousemove', onMove)
      canvas.removeEventListener('mouseleave', onLeave)
      three.dispose()
    }
  }, [])

  return <canvas ref={canvasRef} className={className} style={{ width:'100%', height:'100%', ...style }} />
}
