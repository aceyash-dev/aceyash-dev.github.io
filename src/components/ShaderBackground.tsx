import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'motion/react';

const fragmentShader = `
precision mediump float;
uniform vec2 u_resolution;
uniform vec2 u_pointer;
uniform float u_time;
float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453); }
float noise(vec2 p){ vec2 i=floor(p), f=fract(p); f=f*f*(3.0-2.0*f); return mix(mix(hash(i),hash(i+vec2(1.,0.)),f.x),mix(hash(i+vec2(0.,1.)),hash(i+vec2(1.,1.)),f.x),f.y); }
void main(){
  vec2 uv=gl_FragCoord.xy/u_resolution.xy; uv.x*=u_resolution.x/u_resolution.y;
  vec2 p=uv-vec2(.5*u_resolution.x/u_resolution.y,.5);
  vec2 mouse=(u_pointer-vec2(.5))*vec2(u_resolution.x/u_resolution.y,1.);
  float t=u_time*.07;
  float field=noise(p*3.2+vec2(t,-t))*.55+noise(p*6.0-vec2(t*.6,t))*.25;
  float glow=exp(-length(p-mouse*.22)*2.5);
  float bands=smoothstep(.58,.98,field+glow*.28+sin(length(p)*8.0-t)*.06);
  vec3 milk=vec3(.96,.92,.84); vec3 orange=vec3(.9,.31,.12); vec3 ink=vec3(.13,.10,.08);
  vec3 color=mix(ink,milk,smoothstep(.24,.8,field));
  color=mix(color,orange,bands*.7+glow*.18);
  color=mix(color,vec3(.99,.62,.38),smoothstep(.88,1.0,glow+field*.2)*.65);
  gl_FragColor=vec4(color,1.0);
}`;

const vertexShader = `attribute vec2 position; void main(){ gl_Position=vec4(position,0.,1.); }`;

export function ShaderBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reducedMotion = Boolean(useReducedMotion());

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext('webgl', { alpha: false, antialias: false, powerPreference: 'low-power' });
    if (!gl) return;

    const compile = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) { gl.deleteShader(shader); return null; }
      return shader;
    };
    const vertex = compile(gl.VERTEX_SHADER, vertexShader);
    const fragment = compile(gl.FRAGMENT_SHADER, fragmentShader);
    if (!vertex || !fragment) return;
    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]), gl.STATIC_DRAW);
    const position = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
    const resolution = gl.getUniformLocation(program, 'u_resolution');
    const pointer = gl.getUniformLocation(program, 'u_pointer');
    const time = gl.getUniformLocation(program, 'u_time');
    let px = .5, py = .5, frame = 0, raf = 0, last = 0;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(canvas.clientWidth * dpr);
      canvas.height = Math.round(canvas.clientHeight * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(resolution, canvas.width, canvas.height);
      draw(performance.now());
    };
    const move = (event: PointerEvent) => { if (event.pointerType !== 'touch') { px = event.clientX/window.innerWidth; py = 1-event.clientY/window.innerHeight; } };
    const draw = (now: number) => {
      if (now - last < 40 && !reducedMotion) { raf = requestAnimationFrame(draw); return; }
      last = now;
      gl.uniform2f(pointer, px, py);
      gl.uniform1f(time, reducedMotion ? 0 : now/1000);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      if (!reducedMotion) raf = requestAnimationFrame(draw);
    };
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    window.addEventListener('pointermove', move, { passive: true });
    resize();
    if (!reducedMotion) raf = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(raf); observer.disconnect(); window.removeEventListener('pointermove', move); gl.deleteProgram(program); gl.deleteBuffer(buffer); };
  }, [reducedMotion]);

  return <canvas ref={canvasRef} className="shader-bg" aria-hidden="true" />;
}
