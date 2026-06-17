'use client'
import { useRef, useEffect, useState } from 'react'
import { Renderer, Program, Triangle, Mesh } from 'ogl'

const hexToRgb = hex => {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return m ? [parseInt(m[1], 16) / 255, parseInt(m[2], 16) / 255, parseInt(m[3], 16) / 255] : [1, 1, 1]
}

const getAnchorAndDir = (origin, w, h) => {
  const o = 0.2
  switch (origin) {
    case 'top-left': return { anchor: [0, -o * h], dir: [0, 1] }
    case 'top-right': return { anchor: [w, -o * h], dir: [0, 1] }
    case 'left': return { anchor: [-o * w, 0.5 * h], dir: [1, 0] }
    case 'right': return { anchor: [(1 + o) * w, 0.5 * h], dir: [-1, 0] }
    case 'bottom-center': return { anchor: [0.5 * w, (1 + o) * h], dir: [0, -1] }
    case 'bottom-right': return { anchor: [w, (1 + o) * h], dir: [0, -1] }
    default: return { anchor: [0.5 * w, -o * h], dir: [0, 1] }
  }
}

const VERT = `attribute vec2 position; varying vec2 vUv; void main(){vUv=position*.5+.5;gl_Position=vec4(position,0.,1.);}`

const FRAG = `precision highp float;
uniform float iTime; uniform vec2 iResolution; uniform vec2 rayPos; uniform vec2 rayDir;
uniform vec3 raysColor; uniform float raysSpeed; uniform float lightSpread; uniform float rayLength;
uniform float pulsating; uniform float fadeDistance; uniform float saturation;
uniform vec2 mousePos; uniform float mouseInfluence; uniform float noiseAmount; uniform float distortion;
varying vec2 vUv;
float noise(vec2 st){return fract(sin(dot(st.xy,vec2(12.9898,78.233)))*43758.5453123);}
float rayStrength(vec2 src,vec2 dir,vec2 coord,float seedA,float seedB,float speed){
  vec2 d=coord-src; vec2 dn=normalize(d); float ca=dot(dn,dir);
  float da=ca+distortion*sin(iTime*2.+length(d)*.01)*.2;
  float sf=pow(max(da,0.),1./max(lightSpread,.001));
  float dist=length(d); float maxD=iResolution.x*rayLength;
  float lf=clamp((maxD-dist)/maxD,0.,1.); float ff=clamp((iResolution.x*fadeDistance-dist)/(iResolution.x*fadeDistance),.5,1.);
  float pulse=pulsating>.5?(0.8+0.2*sin(iTime*speed*3.)):1.;
  float bs=clamp((0.45+0.15*sin(da*seedA+iTime*speed))+(0.3+0.2*cos(-da*seedB+iTime*speed)),0.,1.);
  return bs*lf*ff*sf*pulse;
}
void main(){
  vec2 coord=vec2(gl_FragCoord.x,iResolution.y-gl_FragCoord.y);
  vec2 finalDir=rayDir;
  if(mouseInfluence>0.){vec2 mp=mousePos*iResolution.xy; finalDir=normalize(mix(rayDir,normalize(mp-rayPos),mouseInfluence));}
  vec4 r1=vec4(1.)*rayStrength(rayPos,finalDir,coord,36.22,21.11,1.5*raysSpeed);
  vec4 r2=vec4(1.)*rayStrength(rayPos,finalDir,coord,22.40,18.02,1.1*raysSpeed);
  gl_FragColor=r1*.5+r2*.4;
  if(noiseAmount>0.){float n=noise(coord*.01+iTime*.1); gl_FragColor.rgb*=(1.-noiseAmount+noiseAmount*n);}
  float bright=1.-(coord.y/iResolution.y);
  gl_FragColor.x*=.1+bright*.8; gl_FragColor.y*=.3+bright*.6; gl_FragColor.z*=.5+bright*.5;
  if(saturation!=1.){float gray=dot(gl_FragColor.rgb,vec3(.299,.587,.114)); gl_FragColor.rgb=mix(vec3(gray),gl_FragColor.rgb,saturation);}
  gl_FragColor.rgb*=raysColor;
}`

export default function LightRays({
  raysOrigin = 'top-center', raysColor = '#ffffff', raysSpeed = 1, lightSpread = 1,
  rayLength = 2, pulsating = false, fadeDistance = 1.0, saturation = 1.0,
  followMouse = true, mouseInfluence = 0.1, noiseAmount = 0.0, distortion = 0.0,
  className = '', style = {},
}) {
  const containerRef = useRef(null)
  const uniformsRef = useRef(null)
  const rendererRef = useRef(null)
  const mouseRef = useRef({ x: 0.5, y: 0.5 })
  const smoothMouseRef = useRef({ x: 0.5, y: 0.5 })
  const animationIdRef = useRef(null)
  const cleanupRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (!containerRef.current) return
    const obs = new IntersectionObserver(entries => setIsVisible(entries[0].isIntersecting), { threshold: 0.1 })
    obs.observe(containerRef.current)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible || !containerRef.current) return
    if (cleanupRef.current) { cleanupRef.current(); cleanupRef.current = null }

    const init = async () => {
      if (!containerRef.current) return
      await new Promise(r => setTimeout(r, 10))
      if (!containerRef.current) return

      const renderer = new Renderer({ dpr: Math.min(window.devicePixelRatio, 2), alpha: true })
      rendererRef.current = renderer
      const gl = renderer.gl
      gl.canvas.style.width = '100%'
      gl.canvas.style.height = '100%'
      while (containerRef.current.firstChild) containerRef.current.removeChild(containerRef.current.firstChild)
      containerRef.current.appendChild(gl.canvas)

      const uniforms = {
        iTime: { value: 0 }, iResolution: { value: [1, 1] },
        rayPos: { value: [0, 0] }, rayDir: { value: [0, 1] },
        raysColor: { value: hexToRgb(raysColor) }, raysSpeed: { value: raysSpeed },
        lightSpread: { value: lightSpread }, rayLength: { value: rayLength },
        pulsating: { value: pulsating ? 1.0 : 0.0 }, fadeDistance: { value: fadeDistance },
        saturation: { value: saturation }, mousePos: { value: [0.5, 0.5] },
        mouseInfluence: { value: mouseInfluence }, noiseAmount: { value: noiseAmount },
        distortion: { value: distortion },
      }
      uniformsRef.current = uniforms

      const geometry = new Triangle(gl)
      const program = new Program(gl, { vertex: VERT, fragment: FRAG, uniforms })
      const mesh = new Mesh(gl, { geometry, program })

      const updatePlacement = () => {
        if (!containerRef.current || !renderer) return
        renderer.dpr = Math.min(window.devicePixelRatio, 2)
        const { clientWidth: wCSS, clientHeight: hCSS } = containerRef.current
        renderer.setSize(wCSS, hCSS)
        const dpr = renderer.dpr
        const w = wCSS * dpr, h = hCSS * dpr
        uniforms.iResolution.value = [w, h]
        const { anchor, dir } = getAnchorAndDir(raysOrigin, w, h)
        uniforms.rayPos.value = anchor
        uniforms.rayDir.value = dir
      }

      const loop = t => {
        if (!rendererRef.current || !uniformsRef.current) return
        uniforms.iTime.value = t * 0.001
        if (followMouse && mouseInfluence > 0) {
          const s = 0.92
          smoothMouseRef.current.x = smoothMouseRef.current.x * s + mouseRef.current.x * (1 - s)
          smoothMouseRef.current.y = smoothMouseRef.current.y * s + mouseRef.current.y * (1 - s)
          uniforms.mousePos.value = [smoothMouseRef.current.x, smoothMouseRef.current.y]
        }
        try { renderer.render({ scene: mesh }); animationIdRef.current = requestAnimationFrame(loop) } catch {}
      }

      window.addEventListener('resize', updatePlacement)
      updatePlacement()
      animationIdRef.current = requestAnimationFrame(loop)

      cleanupRef.current = () => {
        if (animationIdRef.current) { cancelAnimationFrame(animationIdRef.current); animationIdRef.current = null }
        window.removeEventListener('resize', updatePlacement)
        try {
          const loseCtx = renderer.gl.getExtension('WEBGL_lose_context')
          if (loseCtx) loseCtx.loseContext()
          const canvas = renderer.gl.canvas
          if (canvas?.parentNode) canvas.parentNode.removeChild(canvas)
        } catch {}
        rendererRef.current = null; uniformsRef.current = null
      }
    }

    init()
    return () => { if (cleanupRef.current) { cleanupRef.current(); cleanupRef.current = null } }
  }, [isVisible, raysOrigin, raysColor, raysSpeed, lightSpread, rayLength, pulsating, fadeDistance, saturation, followMouse, mouseInfluence, noiseAmount, distortion])

  useEffect(() => {
    const handleMouseMove = e => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      mouseRef.current = { x: (e.clientX - rect.left) / rect.width, y: (e.clientY - rect.top) / rect.height }
    }
    if (followMouse) { window.addEventListener('mousemove', handleMouseMove); return () => window.removeEventListener('mousemove', handleMouseMove) }
  }, [followMouse])

  return <div ref={containerRef} className={className} style={{ width: '100%', height: '100%', ...style }} />
}
