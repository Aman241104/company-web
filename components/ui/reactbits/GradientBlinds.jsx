'use client'
import { useEffect, useRef } from 'react'
import { Renderer, Program, Mesh, Triangle } from 'ogl'

const MAX_COLORS = 8
const hexToRGB = hex => {
  const c = hex.replace('#', '').padEnd(6, '0')
  return [parseInt(c.slice(0,2),16)/255, parseInt(c.slice(2,4),16)/255, parseInt(c.slice(4,6),16)/255]
}
const prepStops = stops => {
  const base = (stops?.length ? stops : ['#2563EB','#4f46e5']).slice(0, MAX_COLORS)
  if (base.length === 1) base.push(base[0])
  while (base.length < MAX_COLORS) base.push(base[base.length - 1])
  const arr = [], count = Math.max(2, Math.min(MAX_COLORS, stops?.length ?? 2))
  for (let i = 0; i < MAX_COLORS; i++) arr.push(hexToRGB(base[i]))
  return { arr, count }
}

const VERT = `attribute vec2 position; attribute vec2 uv; varying vec2 vUv; void main(){vUv=uv;gl_Position=vec4(position,0.,1.);}`
const FRAG = `
#ifdef GL_ES
precision mediump float;
#endif
uniform vec3 iResolution; uniform vec2 iMouse; uniform float iTime;
uniform float uAngle,uNoise,uBlindCount,uSpotlightRadius,uSpotlightSoftness,uSpotlightOpacity,uMirror,uDistort,uShineFlip;
uniform vec3 uColor0,uColor1,uColor2,uColor3,uColor4,uColor5,uColor6,uColor7; uniform int uColorCount;
varying vec2 vUv;
float rand(vec2 co){return fract(sin(dot(co,vec2(12.9898,78.233)))*43758.5453);}
vec2 rotate2D(vec2 p,float a){float c=cos(a),s=sin(a);return mat2(c,-s,s,c)*p;}
vec3 getGradientColor(float t){
  float tt=clamp(t,0.,1.); int count=uColorCount; if(count<2)count=2;
  float scaled=tt*float(count-1); float seg=floor(scaled),f=fract(scaled);
  if(seg<1.)return mix(uColor0,uColor1,f);
  if(seg<2.&&count>2)return mix(uColor1,uColor2,f);
  if(seg<3.&&count>3)return mix(uColor2,uColor3,f);
  if(seg<4.&&count>4)return mix(uColor3,uColor4,f);
  if(seg<5.&&count>5)return mix(uColor4,uColor5,f);
  if(seg<6.&&count>6)return mix(uColor5,uColor6,f);
  if(seg<7.&&count>7)return mix(uColor6,uColor7,f);
  if(count>7)return uColor7; if(count>6)return uColor6; if(count>5)return uColor5;
  if(count>4)return uColor4; if(count>3)return uColor3; if(count>2)return uColor2; return uColor1;
}
void mainImage(out vec4 fragColor,in vec2 fragCoord){
  vec2 uv0=fragCoord.xy/iResolution.xy;
  float aspect=iResolution.x/iResolution.y; vec2 p=uv0*2.-1.; p.x*=aspect;
  vec2 pr=rotate2D(p,uAngle); pr.x/=aspect; vec2 uv=pr*.5+.5;
  vec2 uvMod=uv;
  if(uDistort>0.){float a=uvMod.y*6.,b=uvMod.x*6.,w=.01*uDistort; uvMod.x+=sin(a)*w; uvMod.y+=cos(b)*w;}
  float t=uvMod.x; if(uMirror>.5)t=1.-abs(1.-2.*fract(t));
  vec3 base=getGradientColor(t);
  vec2 offset=vec2(iMouse.x/iResolution.x,iMouse.y/iResolution.y);
  float d=length(uv0-offset),r=max(uSpotlightRadius,1e-4),dn=d/r;
  float spot=(1.-2.*pow(dn,uSpotlightSoftness))*uSpotlightOpacity;
  float stripe=fract(uvMod.x*max(uBlindCount,1.)); if(uShineFlip>.5)stripe=1.-stripe;
  vec3 col=vec3(spot)+base-vec3(stripe);
  col+=(rand(gl_FragCoord.xy+iTime)-.5)*uNoise;
  fragColor=vec4(col,1.);
}
void main(){vec4 c; mainImage(c,vUv*iResolution.xy); gl_FragColor=c;}`

export default function GradientBlinds({
  className = '', gradientColors, angle = 0, noise = 0.3, blindCount = 12,
  mouseDampening = 0.15, mirrorGradient = false, spotlightRadius = 0.5,
  spotlightSoftness = 1, spotlightOpacity = 0.6, distortAmount = 0,
  shineDirection = 'left', style = {},
}) {
  const containerRef = useRef(null)
  const rafRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const renderer = new Renderer({ alpha: true, antialias: true })
    const gl = renderer.gl
    const canvas = gl.canvas
    canvas.style.width = '100%'; canvas.style.height = '100%'; canvas.style.display = 'block'
    container.appendChild(canvas)

    const { arr: colorArr, count: colorCount } = prepStops(gradientColors)
    const uniforms = {
      iResolution: { value: [gl.drawingBufferWidth, gl.drawingBufferHeight, 1] },
      iMouse: { value: [0, 0] }, iTime: { value: 0 },
      uAngle: { value: (angle * Math.PI) / 180 }, uNoise: { value: noise },
      uBlindCount: { value: Math.max(1, blindCount) },
      uSpotlightRadius: { value: spotlightRadius }, uSpotlightSoftness: { value: spotlightSoftness },
      uSpotlightOpacity: { value: spotlightOpacity }, uMirror: { value: mirrorGradient ? 1 : 0 },
      uDistort: { value: distortAmount }, uShineFlip: { value: shineDirection === 'right' ? 1 : 0 },
      uColor0: { value: colorArr[0] }, uColor1: { value: colorArr[1] }, uColor2: { value: colorArr[2] },
      uColor3: { value: colorArr[3] }, uColor4: { value: colorArr[4] }, uColor5: { value: colorArr[5] },
      uColor6: { value: colorArr[6] }, uColor7: { value: colorArr[7] }, uColorCount: { value: colorCount },
    }

    const program = new Program(gl, { vertex: VERT, fragment: FRAG, uniforms })
    const geometry = new Triangle(gl)
    const mesh = new Mesh(gl, { geometry, program })
    const mouseTarget = [0, 0]
    let lastTime = 0

    const resize = () => {
      const rect = container.getBoundingClientRect()
      renderer.setSize(rect.width, rect.height)
      uniforms.iResolution.value = [gl.drawingBufferWidth, gl.drawingBufferHeight, 1]
      const effective = Math.min(blindCount, Math.max(1, Math.floor(rect.width / 80)))
      uniforms.uBlindCount.value = effective
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(container)

    canvas.addEventListener('pointermove', e => {
      const rect = canvas.getBoundingClientRect()
      const scale = renderer.dpr || 1
      mouseTarget[0] = (e.clientX - rect.left) * scale
      mouseTarget[1] = (rect.height - (e.clientY - rect.top)) * scale
    })

    const loop = t => {
      rafRef.current = requestAnimationFrame(loop)
      uniforms.iTime.value = t * 0.001
      if (mouseDampening > 0) {
        const dt = (t - lastTime) / 1000; lastTime = t
        const tau = Math.max(1e-4, mouseDampening)
        const factor = Math.min(1 - Math.exp(-dt / tau), 1)
        const cur = uniforms.iMouse.value
        cur[0] += (mouseTarget[0] - cur[0]) * factor
        cur[1] += (mouseTarget[1] - cur[1]) * factor
      }
      try { renderer.render({ scene: mesh }) } catch {}
    }
    rafRef.current = requestAnimationFrame(loop)

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      ro.disconnect()
      if (canvas.parentElement === container) container.removeChild(canvas)
    }
  }, [gradientColors, angle, noise, blindCount, mirrorGradient, spotlightRadius, spotlightSoftness, spotlightOpacity, distortAmount, shineDirection, mouseDampening])

  return <div ref={containerRef} className={className} style={{ width: '100%', height: '100%', ...style }} />
}
