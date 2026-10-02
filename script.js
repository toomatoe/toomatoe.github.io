'use strict';
document.querySelectorAll('#year').forEach(el=>el.textContent=new Date().getFullYear());
let toastTimer;
const toast=document.querySelector('.toast');
document.querySelectorAll('[data-copy]').forEach(button=>button.addEventListener('click',async()=>{
 const email=button.dataset.copy;
 try {
  if(navigator.clipboard&&window.isSecureContext) await navigator.clipboard.writeText(email);
  else {const input=document.createElement('textarea');input.value=email;input.style.position='fixed';input.style.opacity='0';document.body.append(input);input.select();const copied=document.execCommand('copy');input.remove();if(!copied)throw new Error('copy');}
  const label=button.querySelector('.copy-label');if(label){label.textContent='Copied!';setTimeout(()=>label.textContent='Copy email',2200);}
  toast.textContent='Email address copied';
 }catch{toast.textContent='Copy this address: '+email;}
 clearTimeout(toastTimer);toast.classList.add('shown');toastTimer=setTimeout(()=>toast.classList.remove('shown'),3500);
}));
const reduce=matchMedia('(prefers-reduced-motion: reduce)');
const scenes=[...document.querySelectorAll('canvas[data-scene]')].map(canvas=>({canvas,ctx:canvas.getContext('2d'),kind:canvas.dataset.scene,visible:true}));
if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{const scene=scenes.find(s=>s.canvas===entry.target);if(scene)scene.visible=entry.isIntersecting;}),{rootMargin:'100px'});scenes.forEach(scene=>observer.observe(scene.canvas));}
function line(c,x,y,x2,y2,color,width=1){c.strokeStyle=color;c.lineWidth=width;c.beginPath();c.moveTo(x,y);c.lineTo(x2,y2);c.stroke();}
function text(c,label,x,y,color='#bdd7c4',size=12){c.fillStyle=color;c.font=size+'px monospace';c.fillText(label,x,y);}
function grid(c){c.fillStyle='#0b1511';c.fillRect(0,0,600,330);for(let x=0;x<=600;x+=30)line(c,x,0,x,330,'#213b2c55');for(let y=0;y<=330;y+=30)line(c,0,y,600,y,'#213b2c55');}
function box(c,x,y,w,h,color){c.fillStyle=color+'18';c.fillRect(x,y,w,h);c.strokeStyle=color;c.lineWidth=2;c.strokeRect(x,y,w,h);}
function draw(scene,time){const c=scene.ctx;if(!c)return;const t=reduce.matches?1.5:time;grid(c);
 if(scene.kind==='bank'){
  text(c,'PORTFOLIO SIGNALS',24,28,'#cdef91',13);text(c,'CREDIT / FINANCIAL RISK',24,51,'#779780',10);
  for(let i=0;i<3;i++){box(c,24+i*188,68,174,54,'#4e765c');text(c,['REVIEW','WATCHLIST','SIGNALS'][i],35+i*188,89,'#a5bdac',10);text(c,['03','08','12'][i],35+i*188,111,'#e9f5e8',19);}
  c.beginPath();for(let i=0;i<=100;i++){let x=24+i*5.5,y=220-30*Math.sin(i*.11+t*1.3)-20*Math.cos(i*.24+t*.6);i?c.lineTo(x,y):c.moveTo(x,y);}c.strokeStyle='#cdef91';c.lineWidth=3;c.stroke();
  let x=24+(t*90)%550;line(c,x,147,x,266,'#cdef91aa',2);c.fillStyle='#cdef9115';c.fillRect(x-45,147,45,119);text(c,'FINANCIAL REVIEW',24,300,'#a5bdac',11);text(c,'MONITORING',435,300,'#cdef91',11);
 }else if(scene.kind==='motion'){
  text(c,'MOTION DETECTION',24,28,'#b8bcff',13);text(c,'FRAME DIFFERENCE / REGIONS',24,51,'#8494aa',10);
  for(let i=0;i<3;i++){let x=45+((t*(i%2?70:110)+i*175)%465),y=100+i*55+12*Math.sin(t*2+i);box(c,x,y,62+i*9,38,'#b8bcff');text(c,'REGION 0'+(i+1),x,y-9,'#c4c8ff',10);for(let trail=1;trail<=5;trail++)box(c,x-trail*13,y+trail*1.2,4,4,'#667293');}
  line(c,24,274,576,274,'#3d5360');text(c,'REGION TRACKING',24,303,'#b8bcff',12);text(c,'MOVEMENT ANALYSIS',387,303,'#a7c0d0',10);
 }else if(scene.kind==='rag'){
  text(c,'QUERY YOUR DOCUMENTS',24,29,'#a5d9ff',13);const labels=['Documents','Retrieve','Answer'];const active=Math.floor(t)%3;
  for(let i=0;i<3;i++){let x=25+i*195;box(c,x,91,160,78,i===active?'#a5d9ff':'#44647b');text(c,'0'+(i+1),x+14,115,'#8cb8d1',11);text(c,labels[i],x+14,144,'#d0e8f3',14);if(i<2){line(c,x+160,130,x+195,130,'#557c8f');let k=(t*1.1)%1;c.fillStyle='#cdef91';c.beginPath();c.arc(x+160+k*35,130,4,0,Math.PI*2);c.fill();}}
  text(c,'RELEVANT CONTEXT',25,205,'#7fa6bd',10);for(let i=0;i<4;i++){c.fillStyle=i===active?'#a5d9ff':'#568199';c.fillRect(25,220+i*16,(i%2?340:540)*(0.6+0.4*Math.abs(Math.sin(t+i))),5);}text(c,'DOCUMENTS + CONTEXT',25,310,'#a5d9ff',11);
 }else{
  const points=[[75,170],[205,80],[205,255],[390,100],[390,245],[520,170]];
  const edges=[[0,1],[0,2],[1,3],[1,4],[2,3],[2,4],[3,5],[4,5]];
  edges.forEach(([a,b],i)=>{const p=points[a],q=points[b];line(c,...p,...q,'#557550',1);let k=(t*.5+i*.17)%1;c.fillStyle='#cdef91';c.beginPath();c.arc(p[0]+(q[0]-p[0])*k,p[1]+(q[1]-p[1])*k,4,0,Math.PI*2);c.fill();});
  points.forEach(([x,y],i)=>{c.beginPath();c.fillStyle='#1d3826';c.arc(x,y,23,0,Math.PI*2);c.fill();c.strokeStyle='#97be74';c.lineWidth=2;c.stroke();text(c,['Q','01','02','03','04','A'][i],x-8,y+5,'#d9efc6',14);});text(c,'INPUT',52,220,'#8ca78f',11);text(c,'PROCESS',262,310,'#8ca78f',11);text(c,'OUTPUT',494,220,'#8ca78f',11);
 }
 const shell=scene.canvas.closest('.screen');scene.canvas.dataset.frame=String(Math.floor(t*24));
}
let origin;
function animate(now){if(origin===undefined)origin=now;const time=(now-origin)/1000;for(const scene of scenes){if(scene.visible&&!document.hidden)draw(scene,time);}if(scenes.length)requestAnimationFrame(animate);}
if(scenes.length)requestAnimationFrame(animate);

document.querySelectorAll('[data-back-top]').forEach(button=>button.addEventListener('click',()=>{window.scrollTo({top:0,behavior:reduce.matches?'instant':'smooth'});document.querySelector('.brand').focus({preventScroll:true});}));
