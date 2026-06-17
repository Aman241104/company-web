'use client'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const VERT = `precision highp float; attribute vec3 position; void main(){ gl_Position = vec4(position, 1.0); }`

const FRAG = `
#ifdef GL_ES
#extension GL_OES_standard_derivatives : enable
#endif
precision highp float; precision mediump int;
uniform float iTime; uniform vec3 iResolution; uniform vec4 iMouse;
uniform float uWispDensity,uTiltScale,uFlowTime,uFogTime,uBeamXFrac,uBeamYFrac,uFlowSpeed;
uniform float uVLenFactor,uHLenFactor,uFogIntensity,uFogScale,uWSpeed,uWIntensity,uFlowStrength;
uniform float uDecay,uFalloffStart,uFogFallSpeed; uniform vec3 uColor; uniform float uFade;
#define PI 3.14159265359
#define TWO_PI 6.28318530718
#define EPS 1e-6
#define DT_LOCAL 0.0038
#define TAP_RADIUS 6
#define R_H 150.0
#define R_V 150.0
#define FLARE_HEIGHT 16.0
#define FLARE_AMOUNT 8.0
#define FLARE_EXP 2.0
#define TOP_FADE_START 0.1
#define TOP_FADE_EXP 1.0
#define FLOW_PERIOD 0.5
#define FLOW_SHARPNESS 1.5
#define EDGE_SOFT (DT_LOCAL*4.0)
#define W_BASE_X 1.5
#define W_LAYER_GAP 0.25
#define W_LANES 10
#define W_SIDE_DECAY 0.5
#define W_HALF 0.01
#define W_AA 0.15
#define W_CELL 20.0
#define W_SEG_MIN 0.01
#define W_SEG_MAX 0.55
#define W_CURVE_AMOUNT 15.0
#define W_CURVE_RANGE (FLARE_HEIGHT - 3.0)
#define W_BOTTOM_EXP 10.0
#define FOG_ON 1
#define FOG_OCTAVES 5
#define FOG_BOTTOM_BIAS 0.8
#define FOG_TILT_MAX_X 0.35
#define FOG_TILT_SHAPE 1.5
#define FOG_BEAM_MIN 0.0
#define FOG_BEAM_MAX 0.75
#define FOG_MASK_GAMMA 0.5
#define FOG_EXPAND_SHAPE 12.2
#define FOG_EDGE_MIX 0.5
#define HFOG_EDGE_START 0.20
#define HFOG_EDGE_END 0.98
#define HFOG_EDGE_GAMMA 1.4
#define HFOG_Y_RADIUS 25.0
#define HFOG_Y_SOFT 60.0
#define EDGE_X0 0.22
#define EDGE_X1 0.995
#define EDGE_X_GAMMA 1.25
#define EDGE_LUMA_T0 0.0
#define EDGE_LUMA_T1 2.0
#define DITHER_STRENGTH 1.0
float g(float x){return x<=0.00031308?12.92*x:1.055*pow(x,1.0/2.4)-0.055;}
float bs(vec2 p,vec2 q,float pw){float d=distance(p,q),f=pw*uFalloffStart,r=(f*f)/(d*d+EPS);return pw*min(1.,r);}
float bsa(vec2 p,vec2 q,float pw,vec2 sc){vec2 d=p-q;float dd=(d.x*d.x)/(sc.x*sc.x)+(d.y*d.y)/(sc.y*sc.y),f=pw*uFalloffStart,r=(f*f)/(dd+EPS);return pw*min(1.,r);}
float tri01(float x){float f=fract(x);return 1.-abs(f*2.-1.);}
float tauWf(float t,float mn,float mx){float a=smoothstep(mn,mn+EDGE_SOFT,t),b=1.-smoothstep(mx-EDGE_SOFT,mx,t);return max(0.,a*b);}
float h21(vec2 p){p=fract(p*vec2(123.34,456.21));p+=dot(p,p+34.123);return fract(p.x*p.y);}
float vnoise(vec2 p){vec2 i=floor(p),f=fract(p);float a=h21(i),b=h21(i+vec2(1,0)),c=h21(i+vec2(0,1)),d2=h21(i+vec2(1,1));vec2 u=f*f*(3.-2.*f);return mix(mix(a,b,u.x),mix(c,d2,u.x),u.y);}
float fbm2(vec2 p){float v=0.,amp=0.6;mat2 mm=mat2(0.86,.5,-.5,0.86);for(int ii=0;ii<FOG_OCTAVES;++ii){v+=amp*vnoise(p);p=mm*p*2.03+17.1;amp*=0.52;}return v;}
float rGate(float x,float l){float a=smoothstep(0.,W_AA,x),b=1.-smoothstep(l,l+W_AA,x);return max(0.,a*b);}
float flareY(float y){float t=clamp(1.-(clamp(y,0.,FLARE_HEIGHT)/max(FLARE_HEIGHT,EPS)),0.,1.);return pow(t,FLARE_EXP);}
float vWisps(vec2 uv,float topF){
  float y=uv.y,yf=(y+uFlowTime*uWSpeed)/W_CELL;
  float dRaw=clamp(uWispDensity,0.,2.),d=dRaw<=0.?1.:dRaw;
  float lanesF=floor(float(W_LANES)*min(d,1.)+.5);
  int lanes=int(max(1.,lanesF));
  float sp=min(d,1.),ep=max(d-1.,0.);
  float fm=flareY(max(y,0.)),rm=clamp(1.-(y/max(W_CURVE_RANGE,EPS)),0.,1.),cm=fm*rm;
  const float G=0.05;float xS=1.+(FLARE_AMOUNT*W_CURVE_AMOUNT*G)*cm;
  float sPix=clamp(y/R_V,0.,1.),bGain=pow(1.-sPix,W_BOTTOM_EXP),sum=0.;
  for(int s=0;s<2;++s){float sgn=s==0?-1.:1.;
    for(int ii=0;ii<W_LANES;++ii){
      if(ii>=lanes)break;
      float off=W_BASE_X+float(ii)*W_LAYER_GAP,xc=sgn*(off*xS);
      float dx=abs(uv.x-xc),lat=1.-smoothstep(W_HALF,W_HALF+W_AA,dx),amp2=exp(-off*W_SIDE_DECAY);
      float seed=h21(vec2(off,sgn*17.)),yf2=yf+seed*7.,ci=floor(yf2),fy=fract(yf2);
      float seg=mix(W_SEG_MIN,W_SEG_MAX,h21(vec2(ci,off*2.3)));
      float spR=h21(vec2(ci,off+sgn*31.)),seg1=rGate(fy,seg)*step(spR,sp);
      if(ep>0.){float spR2=h21(vec2(ci*3.1+7.,off*5.3+sgn*13.));float f2=fract(fy+.5);seg1+=rGate(f2,seg*.9)*step(spR2,ep);}
      sum+=amp2*lat*seg1;
    }
  }
  float span=smoothstep(-3.,0.,y)*(1.-smoothstep(R_V-6.,R_V,y));
  return uWIntensity*sum*topF*bGain*span;
}
void mainImage(out vec4 fc,in vec2 frag){
  vec2 C=iResolution.xy*.5;float invW=1./max(C.x,1.);
  vec2 sc2=(512./iResolution.xy)*.4;
  vec2 uv=(frag-C)*sc2,off=vec2(uBeamXFrac*iResolution.x*sc2.x,uBeamYFrac*iResolution.y*sc2.y);
  vec2 uvc=uv-off;
  float a2=0.,b2=0.;
  float basePhase=1.5*PI+uDecay*.5,tauMin=basePhase-uDecay,tauMax=basePhase;
  float cx=clamp(uvc.x/(R_H*uHLenFactor),-1.,1.),tH=clamp(TWO_PI-acos(cx),tauMin,tauMax);
  for(int k=-TAP_RADIUS;k<=TAP_RADIUS;++k){
    float tu=tH+float(k)*DT_LOCAL,wt=tauWf(tu,tauMin,tauMax);if(wt<=0.)continue;
    float spd=max(abs(sin(tu)),.02),u2=clamp((basePhase-tu)/max(uDecay,EPS),0.,1.),env=pow(1.-abs(u2*2.-1.),.8);
    vec2 pv=vec2((R_H*uHLenFactor)*cos(tu),0.);
    a2+=wt*bs(uvc,pv,env*spd);
  }
  float yPix=uvc.y,cy=clamp(-yPix/(R_V*uVLenFactor),-1.,1.),tV=clamp(TWO_PI-acos(cy),tauMin,tauMax);
  for(int k=-TAP_RADIUS;k<=TAP_RADIUS;++k){
    float tu=tV+float(k)*DT_LOCAL,wt=tauWf(tu,tauMin,tauMax);if(wt<=0.)continue;
    float yb=(-R_V)*cos(tu),s2=clamp(yb/R_V,0.,1.),spd=max(abs(sin(tu)),.02);
    float env=pow(1.-s2,.6)*spd;
    float cap=1.-smoothstep(TOP_FADE_START,1.,s2);cap=pow(cap,TOP_FADE_EXP);env*=cap;
    float ph=s2/max(FLOW_PERIOD,EPS)+uFlowTime*uFlowSpeed;
    float fl=pow(tri01(ph),FLOW_SHARPNESS);env*=mix(1.-uFlowStrength,1.,fl);
    float yp=(-R_V*uVLenFactor)*cos(tu),mf=pow(smoothstep(FLARE_HEIGHT,0.,yp),FLARE_EXP),wx=1.+FLARE_AMOUNT*mf;
    vec2 sig=vec2(wx,1.),pv2=vec2(0.,yp);
    b2+=wt*bsa(uvc,pv2,step(0.,yp)*env,sig);
  }
  float sPix=clamp(yPix/R_V,0.,1.),topA=pow(1.-smoothstep(TOP_FADE_START,1.,sPix),TOP_FADE_EXP);
  float L=a2+b2*topA;
  float ww=vWisps(vec2(uvc.x,yPix),topA);
  float fog=0.;
#if FOG_ON
  vec2 fuv=uvc*uFogScale;
  float mAct=step(1.,length(iMouse.xy)),nx=((iMouse.x-C.x)*invW)*mAct;
  float ax=abs(nx),stMag=mix(ax,pow(ax,FOG_TILT_SHAPE),.35),st=sign(nx)*stMag*uTiltScale;
  st=clamp(st,-FOG_TILT_MAX_X,FOG_TILT_MAX_X);
  vec2 dir2=normalize(vec2(st,1.));
  fuv+=uFogTime*uFogFallSpeed*dir2;
  vec2 prp=vec2(-dir2.y,dir2.x);
  fuv+=prp*(.08*sin(dot(uvc,prp)*.08+uFogTime*.9));
  float nn=fbm2(fuv+vec2(fbm2(fuv+vec2(7.3,2.1)),fbm2(fuv+vec2(-3.7,5.9)))*.6);
  nn=pow(clamp(nn,0.,1.),1.2);
  float wL=1./max(iResolution.y,1.);
  float m0=pow(smoothstep(FOG_BEAM_MIN-wL,FOG_BEAM_MAX+wL,L),FOG_MASK_GAMMA);
  float bm=1.-pow(1.-m0,FOG_EXPAND_SHAPE);bm=mix(bm*m0,bm,FOG_EDGE_MIX);
  float yP=1.-smoothstep(HFOG_Y_RADIUS,HFOG_Y_RADIUS+HFOG_Y_SOFT,abs(yPix));
  float nxF=abs((frag.x-C.x)*invW),hE=1.-smoothstep(HFOG_EDGE_START,HFOG_EDGE_END,nxF);hE=pow(clamp(hE,0.,1.),HFOG_EDGE_GAMMA);
  float hW=mix(1.,hE,clamp(yP,0.,1.));
  float bBias=mix(1.,1.-sPix,FOG_BOTTOM_BIAS);
  float radialFade=1.-smoothstep(0.,.7,length(uvc)/120.);
  fog=nn*uFogIntensity*1.8*bBias*bm*hW*radialFade;
#endif
  float LF=L+fog;
  float dith=(h21(frag)-.5)*(DITHER_STRENGTH/255.);
  float tone=g(LF+ww);
  vec3 col=tone*uColor+dith;
  float alpha=clamp(g(L+ww*.6)+dith*.6,0.,1.);
  float nxE=abs((frag.x-C.x)*invW),xF=pow(clamp(1.-smoothstep(EDGE_X0,EDGE_X1,nxE),0.,1.),EDGE_X_GAMMA);
  float scene=LF+max(0.,ww)*.5,hi=smoothstep(EDGE_LUMA_T0,EDGE_LUMA_T1,scene);
  float eM=mix(xF,1.,hi);
  col*=eM;alpha*=eM;col*=uFade;alpha*=uFade;
  fc=vec4(col,alpha);
}
void main(){vec4 fc;mainImage(fc,gl_FragCoord.xy);gl_FragColor=fc;}`

export default function LaserFlow({
  className = '', style = {}, color = '#4f79ff',
  wispDensity = 1, fogIntensity = 0.45, fogScale = 0.3,
  wispSpeed = 15, wispIntensity = 5, flowStrength = 0.25,
  decay = 1.1, falloffStart = 1.2, verticalSizing = 2.0, horizontalSizing = 0.5,
}) {
  const mountRef = useRef(null)

  const hexToRGB = hex => {
    let c = String(hex ?? '#ffffff').trim().replace('#', '')
    if (c.length === 3) c = c.split('').map(x => x+x).join('')
    const n = parseInt(c, 16) || 0xffffff
    return { r: ((n>>16)&255)/255, g: ((n>>8)&255)/255, b: (n&255)/255 }
  }

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return
    const renderer = new THREE.WebGLRenderer({ antialias:false, alpha:false, depth:false, stencil:false, powerPreference:'high-performance', premultipliedAlpha:false })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.shadowMap.enabled = false
    renderer.setClearColor(0x000000, 1)
    const canvas = renderer.domElement
    canvas.style.width = '100%'; canvas.style.height = '100%'; canvas.style.display = 'block'
    mount.appendChild(canvas)

    const scene = new THREE.Scene()
    const camera = new THREE.OrthographicCamera(-1,1,1,-1,0,1)
    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array([-1,-1,0,3,-1,0,-1,3,0]),3))

    const { r: cr, g: cg, b: cb } = hexToRGB(color)
    const uniforms = {
      iTime:{value:0}, iResolution:{value:new THREE.Vector3(1,1,1)}, iMouse:{value:new THREE.Vector4(0,0,0,0)},
      uWispDensity:{value:wispDensity}, uTiltScale:{value:0.01}, uFlowTime:{value:0}, uFogTime:{value:0},
      uBeamXFrac:{value:0.1}, uBeamYFrac:{value:0}, uFlowSpeed:{value:0.35},
      uVLenFactor:{value:verticalSizing}, uHLenFactor:{value:horizontalSizing},
      uFogIntensity:{value:fogIntensity}, uFogScale:{value:fogScale},
      uWSpeed:{value:wispSpeed}, uWIntensity:{value:wispIntensity}, uFlowStrength:{value:flowStrength},
      uDecay:{value:decay}, uFalloffStart:{value:falloffStart}, uFogFallSpeed:{value:0.6},
      uColor:{value:new THREE.Vector3(cr,cg,cb)}, uFade:{value:0},
    }

    const material = new THREE.RawShaderMaterial({ vertexShader:VERT, fragmentShader:FRAG, uniforms, transparent:false, depthTest:false, depthWrite:false })
    const mesh = new THREE.Mesh(geometry, material)
    mesh.frustumCulled = false
    scene.add(mesh)

    const startTime = performance.now(); let prevTime = 0, fade = 0, faded = false
    const mouseTarget = new THREE.Vector2()
    const mouseSmooth = new THREE.Vector2()

    const setSize = () => {
      const w = mount.clientWidth||1, h = mount.clientHeight||1
      renderer.setSize(w, h, false)
      uniforms.iResolution.value.set(w * renderer.getPixelRatio(), h * renderer.getPixelRatio(), renderer.getPixelRatio())
    }
    setSize()
    const ro = new ResizeObserver(setSize); ro.observe(mount)
    const io = new IntersectionObserver(e => { pausedRef.current = !e[0].isIntersecting }, { threshold:0 }); io.observe(mount)

    const pausedRef = { current: false }
    const onVis = () => { pausedRef.current = document.hidden }
    document.addEventListener('visibilitychange', onVis)

    const onMove = e => { const rect=canvas.getBoundingClientRect(); mouseTarget.set(e.clientX-rect.left, e.clientY-rect.top) }
    canvas.addEventListener('pointermove', onMove)

    let raf
    const animate = () => {
      raf = requestAnimationFrame(animate)
      if (pausedRef.current) return
      const t = (performance.now() - startTime) / 1000, dt = Math.max(0, t - prevTime); prevTime = t
      uniforms.iTime.value = t
      uniforms.uFlowTime.value += Math.min(0.033, dt)
      uniforms.uFogTime.value += Math.min(0.033, dt)
      if (!faded) { fade = Math.min(1, fade + dt/1.5); uniforms.uFade.value = fade; if(fade>=1) faded=true }
      mouseSmooth.lerp(mouseTarget, 0.1)
      uniforms.iMouse.value.set(mouseSmooth.x * renderer.getPixelRatio(), mouseSmooth.y * renderer.getPixelRatio(), 0, 0)
      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(raf); ro.disconnect(); io.disconnect()
      document.removeEventListener('visibilitychange', onVis)
      canvas.removeEventListener('pointermove', onMove)
      geometry.dispose(); material.dispose(); renderer.dispose(); renderer.forceContextLoss()
      if (mount.contains(canvas)) mount.removeChild(canvas)
    }
  }, [])

  return <div ref={mountRef} className={className} style={{ width:'100%', height:'100%', ...style }} />
}
