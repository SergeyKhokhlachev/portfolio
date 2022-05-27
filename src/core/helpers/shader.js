const layerVertex = `
varying vec2 vUv;
varying vec3 vPos;

void main() {
  vUv = uv;
  vPos = position;
  vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
  gl_Position = projectionMatrix * mvPosition;
}
`;

const layerFragment = `
uniform vec3 color;
uniform float timer;
uniform float lineHeight;
uniform float spaceHeight;

varying vec2 vUv;
varying vec3 vPos;

void main() {
  float t = ceil(lineHeight - mod(vPos.x + timer, spaceHeight));
  gl_FragColor = vec4(color, t);
}
`;

const sliderVertex = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}
`;

const sliderFragment = `
uniform float time;
uniform float progress;
uniform float width;
uniform float scaleX;
uniform float scaleY;
uniform float transition;
uniform float radius;
uniform float swipe;
uniform sampler2D texture1;
uniform sampler2D texture2;
uniform sampler2D displacement;
uniform vec4 resolution;

varying vec2 vUv;
varying vec4 vPosition;
vec2 mirrored(vec2 v) {
  vec2 m = mod(v,2.);
  return mix(m,2.0 - m, step(1.0 ,m));
}

void main()	{
  vec2 newUV = (vUv - vec2(0.5))*resolution.zw + vec2(0.5);
  vec4 noise = texture2D(displacement, mirrored(newUV+time*0.04));
  // float prog = 0.6*progress + 0.2 + noise.g * 0.06;
  float prog = progress*0.8 -0.05 + noise.g * 0.06;
  float intpl = pow(abs(smoothstep(0., 1., (prog*2. - vUv.x + 0.5))), 10.);

  vec4 t1 = texture2D( texture1, (newUV - 0.5) * (1.0 - intpl) + 0.5 ) ;
  vec4 t2 = texture2D( texture2, (newUV - 0.5) * intpl + 0.5 );
  gl_FragColor = mix( t1, t2, intpl );
}
`;

export {
  layerVertex,
  layerFragment,
  sliderVertex,
  sliderFragment
};
