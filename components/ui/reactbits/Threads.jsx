'use client'
import { useEffect, useRef } from 'react'
import { Renderer, Program, Mesh, Color, Triangle, Vec2 } from 'ogl'

const vertexShader = /* glsl */`
attribute vec2 uv;
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0, 1);
}
`

const fragmentShader = /* glsl */`
precision highp float;
uniform float uTime;
uniform vec3 uColor;
uniform vec2 uResolution;
uniform float uAmplitude;
uniform float uDistance;
varying vec2 vUv;

float rand(vec2 n) {
  return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
}

float noise(vec2 p) {
  vec2 ip = floor(p);
  vec2 u = fract(p);
  u = u * u * (3.0 - 2.0 * u);
  float res = mix(
    mix(rand(ip), rand(ip + vec2(1.0, 0.0)), u.x),
    mix(rand(ip + vec2(0.0, 1.0)), rand(ip + vec2(1.0, 1.0)), u.x),
    u.y
  );
  return res * 2.0 - 1.0;
}

void main() {
  vec2 uv = vUv;
  float aspect = uResolution.x / uResolution.y;
  uv.x *= aspect;

  float color = 0.0;
  const float threads = 40.0;

  for (float i = 0.0; i < threads; i++) {
    float t = i / threads;
    float y = t + noise(vec2(t * 3.0 + uTime * 0.1, uTime * 0.05)) * uAmplitude;
    float d = abs(uv.y - y) * uDistance;
    float line = smoothstep(0.02, 0.0, d);
    float alpha = (1.0 - t) * 0.6 + 0.1;
    color += line * alpha;
  }

  gl_FragColor = vec4(uColor, color * 0.6);
}
`

export default function Threads({
  color = [0.15, 0.37, 0.92],
  amplitude = 0.35,
  distance = 40.0,
  style = {},
  className = '',
}) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    let renderer, raf
    let destroyed = false

    try {
      renderer = new Renderer({ canvas, alpha: true, antialias: true })
    } catch (_) {
      return
    }

    const gl = renderer.gl
    // Bail out if the WebGL context is already lost (happens in React StrictMode
    // when the previous cleanup called loseContext on this same canvas element)
    if (!gl || gl.isContextLost()) return

    gl.clearColor(0, 0, 0, 0)

    const geometry = new Triangle(gl)
    const program = new Program(gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: new Color(...color) },
        uResolution: { value: new Vec2(canvas.clientWidth, canvas.clientHeight) },
        uAmplitude: { value: amplitude },
        uDistance: { value: distance },
      },
      transparent: true,
    })

    const mesh = new Mesh(gl, { geometry, program })

    const resize = () => {
      if (gl.isContextLost()) return
      renderer.setSize(canvas.clientWidth, canvas.clientHeight)
      program.uniforms.uResolution.value.set(canvas.clientWidth, canvas.clientHeight)
    }

    window.addEventListener('resize', resize)
    resize()

    const update = (t) => {
      if (destroyed || gl.isContextLost()) return
      raf = requestAnimationFrame(update)
      program.uniforms.uTime.value = t * 0.001
      try {
        renderer.render({ scene: mesh })
      } catch (_) {
        // Context lost mid-frame, stop silently
      }
    }
    raf = requestAnimationFrame(update)

    return () => {
      destroyed = true
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      try {
        gl.getExtension('WEBGL_lose_context')?.loseContext()
      } catch (_) {}
    }
  }, [color, amplitude, distance])

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ width: '100%', height: '100%', display: 'block', ...style }}
    />
  )
}
