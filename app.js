'use strict';

(() => {
  const root = document.getElementById('comment-image-generator');
  const first = root.querySelector('.cs-app');
  const sessions = [];
  const platforms = [
    {id:'youtube',name:'YouTube',local:'유튜브',symbol:'YT',group:'글로벌'},
    {id:'instagram',name:'Instagram',local:'인스타그램',symbol:'IG',group:'글로벌'},
    {id:'tiktok',name:'TikTok',local:'틱톡',symbol:'TT',group:'글로벌'},
    {id:'reddit',name:'Reddit',local:'레딧',symbol:'r/',group:'글로벌'},
    {id:'x',name:'X',local:'트위터',symbol:'X',group:'글로벌'},
    {id:'facebook',name:'Facebook',local:'페이스북',symbol:'f',group:'글로벌'},
    {id:'threads',name:'Threads',local:'스레드',symbol:'@',group:'글로벌'},
    {id:'tieba',name:'Baidu Tieba',local:'바이두 티에바 · 百度贴吧',symbol:'贴吧',group:'중국'},
    {id:'bilibili',name:'Bilibili',local:'빌리빌리 · 哔哩哔哩',symbol:'bili',group:'중국'},
    {id:'weibo',name:'Weibo',local:'웨이보 · 微博',symbol:'wb',group:'중국'},
    {id:'xiaohongshu',name:'Xiaohongshu',local:'샤오홍슈 · 小红书',symbol:'红',group:'중국'},
    {id:'douyin',name:'Douyin',local:'더우인 · 抖音',symbol:'抖',group:'중국'},
    {id:'futaba',name:'2chan',local:'후타바 · ふたば',symbol:'2ch',group:'일본'},
    {id:'fivech',name:'5ch',local:'5ちゃんねる · 구 2ch',symbol:'5ch',group:'일본'},
    {id:'dc',name:'DC Inside',local:'디시인사이드',symbol:'dc',group:'한국'}
  ];
  const names = Object.fromEntries(platforms.map(p=>[p.id,p.name]));
  const palette = ['#555555','#757575','#383838','#929292','#626262'];
  const groups = first.querySelector('[data-platform-groups]');
  for (const group of ['글로벌','중국','일본','한국']) {
    const section=document.createElement('section');section.className='cs-platform-group';
    const title=document.createElement('h3');title.textContent=group;section.append(title);
    const grid=document.createElement('div');grid.className='cs-platform-grid';grid.setAttribute('role','group');grid.setAttribute('aria-label',group+' 플랫폼');
    for(const platform of platforms.filter(p=>p.group===group)){
      const button=document.createElement('button');button.type='button';button.className='cursor-interaction';button.dataset.platform=platform.id;button.setAttribute('aria-pressed','false');
      const symbol=document.createElement('span');symbol.className='cs-platform-symbol';symbol.textContent=platform.symbol;symbol.setAttribute('aria-hidden','true');
      const label=document.createElement('span');label.textContent=platform.name;const small=document.createElement('small');small.textContent=platform.local;label.append(small);button.append(symbol,label);grid.append(button);
    }
    section.append(grid);groups.append(section);
  }
  function savedFor(index) { try { return JSON.parse(localStorage.getItem('notoow.comment-image-generator.v1'))?.concepts?.[index] || {}; } catch { return {}; } }
  function persist() {
    const concepts = sessions.map(({state}) => ({...state}));
    try { localStorage.setItem('notoow.comment-image-generator.v1', JSON.stringify({concepts})); } catch {}
  }
  [first].forEach((app,index) => {
    const find = selector => app.querySelector(selector);
    const all = selector => [...app.querySelectorAll(selector)];
    const state = {platform:'tiktok',theme:'light',panel:'content',handle:'@slow_morning',text:find('[data-key="text"]').value,date:'9일 전',likes:24,replies:3,postNumber:123456,avatarMode:'default',avatarSeed:0,opacity:100,width:960,font:24,padding:24,horizontal:24,guides:false};
    const numeric = new Set(['likes','replies','postNumber','opacity','width','font','padding','horizontal']);
    let uploaded = null;
    let uploadVersion = 0;
    let previousOpacity = 100;
    const canvas = find('.cs-image');
    const context = canvas.getContext('2d');
    const avatarCanvas = find('.cs-avatar-mini');
    const exportCanvas = document.createElement('canvas');
    const fontFamily = '"Pretendard Variable", "Segoe UI", "Malgun Gothic", sans-serif';
    function applySaved(data) {
      for (const key of Object.keys(state)) {
        if (!(key in data)) continue;
        if (numeric.has(key) && Number.isFinite(Number(data[key]))) state[key] = Number(data[key]);
        else if (typeof data[key] === typeof state[key]) state[key] = data[key];
      }
      if (!platforms.some(p=>p.id===state.platform)) state.platform = 'tiktok';
      if (!['light','dark'].includes(state.theme)) state.theme = 'light';
      if (!['content','design'].includes(state.panel)) state.panel = 'content';
      if (![640,960,1280].includes(state.width)) state.width = 960;
      if (![20,24,28,32].includes(state.font)) state.font = 24;
      state.opacity = Math.max(0,Math.min(100,state.opacity));
      state.padding = Math.max(16,Math.min(48,state.padding));
      state.horizontal = Math.max(16,Math.min(64,state.horizontal));
      state.text = state.text.slice(0,4000);state.handle=state.handle.slice(0,60);state.date=state.date.slice(0,30);
      for(const key of ['likes','replies']) state[key]=Math.max(0,Math.min(99999,Math.floor(state[key])));
      state.postNumber=Math.max(1,Math.min(999999999,Math.floor(state.postNumber)));
      for (const input of all('[data-key]')) input.value = String(state[input.dataset.key]);
    }
    applySaved(savedFor(index));
    function avatarSource() {
      const tile = document.createElement('canvas');tile.width=tile.height=100;
      const g=tile.getContext('2d');
      if(uploaded && ['original','mosaic','blur'].includes(state.avatarMode)) {
        const side=Math.min(uploaded.naturalWidth,uploaded.naturalHeight);
        g.drawImage(uploaded,(uploaded.naturalWidth-side)/2,(uploaded.naturalHeight-side)/2,side,side,0,0,100,100);
      } else {
        const seed=state.avatarSeed;
        g.fillStyle=palette[Math.abs(seed)%palette.length];g.fillRect(0,0,100,100);
        g.fillStyle='#eeeeee';
        if(state.avatarMode==='default'||state.avatarMode==='original') {
          g.beginPath();g.arc(50,37,17,0,Math.PI*2);g.fill();g.beginPath();g.ellipse(50,91,35,30,0,0,Math.PI*2);g.fill();
        } else {
          for(let y=0;y<5;y++)for(let x=0;x<3;x++)if((Math.imul(seed+73, (y*3+x+1)*31)>>>((x+y)%12))&1){g.fillRect(x*20,y*20,20,20);g.fillRect((4-x)*20,y*20,20,20);}
        }
      }
      if(state.avatarMode==='mosaic'){
        const pixel=document.createElement('canvas');pixel.width=pixel.height=6;pixel.getContext('2d').drawImage(tile,0,0,6,6);g.imageSmoothingEnabled=false;g.drawImage(pixel,0,0,100,100);
      }
      if(state.avatarMode==='blur') {
        const blurred=document.createElement('canvas');blurred.width=blurred.height=100;const b=blurred.getContext('2d');b.filter='blur(7px)';b.drawImage(tile,-10,-10,120,120);return blurred;
      }
      return tile;
    }
    function wrap(value,width,size) {
      context.font=`${size}px ${fontFamily}`;
      const result=[];
      const segmenter=typeof Intl.Segmenter==='function'?new Intl.Segmenter('ko',{granularity:'grapheme'}):null;
      for(const paragraph of value.split('\n')){
        let line='';const chars=segmenter?[...segmenter.segment(paragraph)].map(v=>v.segment):[...paragraph];
        for(const char of chars){if(line&&context.measureText(line+char).width>width){result.push(line);line='';}line+=char;}result.push(line);
      }
      return result;
    }
    function drawLucide(g,name,x,y,size,color) {
      const definition=globalThis.lucide?.icons?.[name];
      if (!definition || !globalThis.lucide?.createElement) return;
      const svg=globalThis.lucide.createElement(definition);
      g.save();g.translate(x,y);g.scale(size/24,size/24);g.strokeStyle=color;g.lineWidth=1.65;g.lineCap='round';g.lineJoin='round';
      for(const el of svg.children){g.beginPath();const a=n=>Number(el.getAttribute(n));if(el.tagName.toLowerCase()==='path') g.stroke(new Path2D(el.getAttribute('d')));else if(el.tagName.toLowerCase()==='circle'){g.arc(a('cx'),a('cy'),a('r'),0,Math.PI*2);g.stroke();}else if(el.tagName.toLowerCase()==='line'){g.moveTo(a('x1'),a('y1'));g.lineTo(a('x2'),a('y2'));g.stroke();}else if(el.tagName.toLowerCase()==='polyline'){const points=el.getAttribute('points').trim().split(/[ ,]+/).map(Number);g.moveTo(points[0],points[1]);for(let p=2;p<points.length;p+=2)g.lineTo(points[p],points[p+1]);g.stroke();}else if(el.tagName.toLowerCase()==='rect'){g.roundRect(a('x'),a('y'),a('width'),a('height'),a('rx'));g.stroke();}}
      g.restore();
    }
    function paint(target,guides) {
      const w=state.width,p=8,hp=state.horizontal,kind=state.platform;
      const board=['futaba','fivech'].includes(kind),heartSide=['tiktok','douyin','xiaohongshu'].includes(kind);
      const avatarSize=kind==='xiaohongshu'?40:48;
      const x=board?hp:hp+avatarSize+18;
      const right=heartSide?68:kind==='instagram'?44:0;
      const lines=wrap(state.text || '댓글 내용을 입력하세요.', w-x-hp-right,state.font);
      const lineHeight=Math.ceil(state.font*1.5);
      const contentTop=p+(board?36:31),actionsTop=contentTop+lines.length*lineHeight+14;
      const extra=heartSide&&state.replies>0?36:0;
      const layer=document.createElement('canvas');layer.width=w*2;layer.height=(actionsTop+32+extra+p)*2;
      const g=layer.getContext('2d');g.scale(2,2);g.textBaseline='top';
      const dark=state.theme==='dark',ink=dark?'#f1f1f1':'#171717',muted=dark?'#aaaaaa':'#6b6b6b';
      const avatar=avatarSource();
      if(!board){g.save();g.beginPath();if(['dc','tieba'].includes(kind))g.roundRect(hp,p,avatarSize,avatarSize,2);else g.arc(hp+avatarSize/2,p+avatarSize/2,avatarSize/2,0,Math.PI*2);g.clip();g.drawImage(avatar,hp,p,avatarSize,avatarSize);g.restore();}
      const mini=avatarCanvas.getContext('2d');mini.clearRect(0,0,84,84);mini.drawImage(avatar,0,0,84,84);
      const handle=state.handle.trim().replace(/^@+/,'')||'viewer';
      const username=(kind==='youtube'?'@':kind==='reddit'?'u/':'')+handle;
      if(kind==='facebook'){g.fillStyle=dark?`rgba(55,55,55,${state.opacity/100})`:`rgba(242,242,242,${state.opacity/100})`;g.beginPath();g.roundRect(x-12,p-5,w-x-hp+12,contentTop+lines.length*lineHeight-p+13,16);g.fill();}
      g.fillStyle=heartSide?muted:kind==='tieba'?(dark?'#b7ceff':'#375fa0'):ink;
      g.font=`600 18px ${fontFamily}`;
      if(kind==='futaba'){g.font=`17px ${fontFamily}`;g.fillText(`${handle}  ${state.date}  No.${state.postNumber}`,x,p,w-x-hp);}
      else if(kind==='fivech'){g.font=`17px ${fontFamily}`;g.fillText(`${String(state.postNumber).padStart(4,'0')}  ${handle}  ${state.date}`,x,p,w-x-hp);}
      else g.fillText(username,x,p,w-x-hp-right);
      const nameWidth=g.measureText(username).width;
      if(!board&&!heartSide&&!['facebook','tieba'].includes(kind)&&nameWidth+g.measureText(state.date).width+16<w-x-hp-right){g.fillStyle=muted;g.font=`17px ${fontFamily}`;g.fillText(state.date,x+nameWidth+14,p+1);}
      g.fillStyle=ink;g.font=`${state.font}px ${fontFamily}`;lines.forEach((line,i)=>g.fillText(line,x,contentTop+i*lineHeight));
      g.fillStyle=muted;g.font=`17px ${fontFamily}`;
      function action(name,label,at,y=actionsTop){drawLucide(g,name,at,y+1,22,muted);g.fillStyle=muted;if(label!==null)g.fillText(String(label),at+31,y+3);}
      if(kind==='youtube'){
        drawLucide(g,'ThumbsUp',x,actionsTop+1,22,ink);g.fillText(String(state.likes),x+32,actionsTop+3);
        let cursor=x+32+g.measureText(String(state.likes)).width+26;
        drawLucide(g,'ThumbsDown',cursor,actionsTop+1,22,ink);cursor+=52;
        g.fillText('답글',cursor,actionsTop+3);cursor+=g.measureText('답글').width+30;
        if(state.replies>0)g.fillText(`답글 ${state.replies}개`,cursor,actionsTop+3);
        drawLucide(g,'EllipsisVertical',w-hp-20,p,20,muted);
      }else if(kind==='instagram'){
        g.fillText(`좋아요 ${state.likes}개`,x,actionsTop+3);const tw=g.measureText(`좋아요 ${state.likes}개`).width;
        g.fillText('답글 달기',x+tw+28,actionsTop+3);drawLucide(g,'Heart',w-hp-25,p+33,25,ink);
      }else if(heartSide){
        drawLucide(g,'Heart',w-hp-36,p+33,25,muted);g.save();g.textAlign='center';g.font=`16px ${fontFamily}`;g.fillText(String(state.likes),w-hp-23,p+65);g.restore();
        g.fillText(state.date,x,actionsTop+3);const dateWidth=g.measureText(state.date).width;
        g.fillText(kind==='tiktok'?'답글':'回复',x+dateWidth+30,actionsTop+3);
        if(state.replies>0){g.strokeStyle=muted;g.beginPath();g.moveTo(x,actionsTop+extra+11);g.lineTo(x+24,actionsTop+extra+11);g.stroke();g.fillText(kind==='tiktok'?`답글 ${state.replies}개 보기`:`展开 ${state.replies} 条回复`,x+36,actionsTop+extra+3);drawLucide(g,'ChevronDown',x+36+g.measureText(kind==='tiktok'?`답글 ${state.replies}개 보기`:`展开 ${state.replies} 条回复`).width+8,actionsTop+extra+2,19,muted);}
      }else if(kind==='reddit'){
        action('ArrowUp',state.likes,x);const after=x+37+g.measureText(String(state.likes)).width+12;
        action('ArrowDown',null,after);action('MessageCircle',`Reply ${state.replies}`,after+50);action('Share2','Share',after+180);
        drawLucide(g,'Ellipsis',w-hp-24,actionsTop+1,22,muted);
      }else if(kind==='x'){
        const step=(w-x-hp-60)/4;action('MessageCircle',state.replies,x);action('Repeat2',null,x+step);action('Heart',state.likes,x+step*2);action('ChartNoAxesColumn',null,x+step*3);action('Upload',null,w-hp-24);
        drawLucide(g,'Ellipsis',w-hp-24,p,22,muted);
      }else if(kind==='threads'){
        action('Heart',state.likes,x);action('MessageCircle',state.replies,x+100);action('Repeat2',null,x+200);action('Send',null,x+250);
        drawLucide(g,'Ellipsis',w-hp-24,p,22,muted);
      }else if(kind==='facebook'){
        g.font=`600 16px ${fontFamily}`;g.fillText('좋아요',x,actionsTop+6);g.fillText('답글 달기',x+65,actionsTop+6);g.font=`16px ${fontFamily}`;g.fillText(state.date,x+160,actionsTop+6);action('ThumbsUp',state.likes,w-hp-95,actionsTop+3);
      }else if(kind==='tieba'){
        g.save();g.textAlign='right';g.fillText(`1楼    ${state.date}    回复 (${state.replies})`,w-hp,actionsTop+3);g.restore();
      }else if(kind==='bilibili'){
        action('ThumbsUp',state.likes,x);action('ThumbsDown',null,x+112);g.fillText(`回复 (${state.replies})`,x+175,actionsTop+3);drawLucide(g,'EllipsisVertical',w-hp-20,actionsTop,20,muted);
      }else if(kind==='weibo'){
        g.strokeStyle=dark?'#444':'#ddd';g.beginPath();g.moveTo(x,actionsTop-8);g.lineTo(w-hp,actionsTop-8);g.stroke();const step=(w-x-hp)/3;action('Repeat2','转发',x);action('MessageCircle',state.replies,x+step);action('ThumbsUp',state.likes,x+step*2);
      }else if(kind==='futaba'){
        g.font=`15px ${fontFamily}`;g.fillText(`そうだね × ${state.likes}`,x,actionsTop+3);
      }else if(kind==='fivech'){
        g.font=`15px ${fontFamily}`;g.fillText('返信',x,actionsTop+3);
      }else if(kind==='dc'){
        g.strokeStyle=dark?'#444':'#ddd';g.beginPath();g.moveTo(x,actionsTop-7);g.lineTo(w-hp,actionsTop-7);g.stroke();g.fillText(`답글 ${state.replies}    추천 ${state.likes}    비추천 0`,x,actionsTop+4);
      }
      const pixels=g.getImageData(0,0,layer.width,layer.height).data;
      function rowHasInk(row){for(let i=(row*layer.width)*4+3,end=((row+1)*layer.width)*4;i<end;i+=4)if(pixels[i])return true;return false;}
      let top=0,bottom=layer.height-1;while(top<bottom&&!rowHasInk(top))top++;while(bottom>top&&!rowHasInk(bottom))bottom--;
      top=Math.floor(top/2)*2;bottom=Math.ceil((bottom+1)/2)*2;
      const pad=state.padding,bodyHeight=bottom-top,h=bodyHeight/2+2*pad;
      target.width=w*2;target.height=h*2;const out=target.getContext('2d');
      out.fillStyle=dark?`rgba(18,18,18,${state.opacity/100})`:`rgba(255,255,255,${state.opacity/100})`;out.fillRect(0,0,target.width,target.height);
      out.drawImage(layer,0,top,layer.width,bodyHeight,0,pad*2,layer.width,bodyHeight);
      if(guides){out.scale(2,2);out.fillStyle=dark?'#ffffff18':'#0000000c';out.fillRect(0,0,w,pad);out.fillRect(0,h-pad,w,pad);out.strokeStyle=dark?'#bbb':'#666';out.setLineDash([6,5]);out.beginPath();out.moveTo(0,pad);out.lineTo(w,pad);out.moveTo(0,h-pad);out.lineTo(w,h-pad);out.stroke();out.font=`12px ${fontFamily}`;out.textBaseline='top';out.fillStyle=dark?'#ddd':'#444';out.fillText(`${pad} px`,w-60,5);out.fillText(`${pad} px`,w-60,h-pad+5);}
      return {w,h};
    }
    function render(){
      app.dataset.imageTheme=state.theme;
      const platform=platforms.find(p=>p.id===state.platform),board=['futaba','fivech'].includes(state.platform);
      find('[data-selected-name]').textContent=platform.name;find('[data-selected-local]').textContent=platform.local;find('[data-selected-symbol]').textContent=platform.symbol;
      find('[data-avatar-field]').hidden=board;find('[data-board-field]').hidden=!board;find('[data-reaction-fields]').hidden=state.platform==='fivech';
      find('[data-likes-label]').textContent=state.platform==='reddit'?'투표 수':state.platform==='futaba'?'そうだね':state.platform==='dc'?'추천':'좋아요';
      all('[data-platform]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.platform===state.platform)));
      all('[data-theme]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.theme===state.theme)));
      all('[data-panel-button]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.panelButton===state.panel)));
      all('[data-panel]').forEach(p=>p.hidden=p.dataset.panel!==state.panel);
      find('[data-guide]').setAttribute('aria-pressed',String(state.guides));
      find('[data-transparent]').checked=state.opacity===0;
      find('[data-count]').textContent=`${state.text.length.toLocaleString()} / 4,000`;
      find('[data-opacity]').textContent=state.opacity+'%';find('[data-padding]').textContent=state.padding+' px';find('[data-horizontal]').textContent=state.horizontal+' px';
      find('.cs-platform-name').textContent=names[state.platform];
      const {w,h}=paint(canvas,state.guides);
      find('[data-size]').textContent=`${w.toLocaleString()} × ${h.toLocaleString()} px`;
      find('[data-export-size]').textContent=`${(w*2).toLocaleString()} × ${(h*2).toLocaleString()} px${state.opacity===0?' · 투명 배경':''}`;
      find('[data-download]').disabled=!state.text.trim();
    }
    for(const input of all('[data-key]')) input.addEventListener('input',()=>{
      const key=input.dataset.key;if(key==='avatarMode')uploadVersion++;state[key]=numeric.has(key)?Math.max(Number(input.min||0),Math.min(Number(input.max||99999),Number(input.value)||0)):input.value;
      if(['likes','replies'].includes(key))state[key]=Math.floor(state[key]);
      render();persist();
    });
    all('[data-platform]').forEach(b=>b.addEventListener('click',()=>{state.platform=b.dataset.platform;render();find('.cs-platform-dialog').close();persist();}));
    find('[data-open-platform]').addEventListener('click',()=>find('.cs-platform-dialog').showModal());
    find('[data-close-platform]').addEventListener('click',()=>find('.cs-platform-dialog').close());
    all('[data-theme]').forEach(b=>b.addEventListener('click',()=>{state.theme=b.dataset.theme;render();persist();}));
    all('[data-panel-button]').forEach(b=>b.addEventListener('click',()=>{state.panel=b.dataset.panelButton;render();persist();}));
    find('[data-guide]').addEventListener('click',()=>{state.guides=!state.guides;render();persist();});
    find('[data-transparent]').addEventListener('change',e=>{if(e.target.checked){previousOpacity=state.opacity||100;state.opacity=0;}else state.opacity=previousOpacity;find('[data-key="opacity"]').value=state.opacity;render();persist();});
    find('[data-random]').addEventListener('click',()=>{uploadVersion++;const words=['slow','mellow','daily','mint','sunny','blue','cloud'];const n=crypto.getRandomValues(new Uint32Array(3));state.handle=`@${words[n[0]%words.length]}_${words[n[1]%words.length]}${n[2]%100}`;state.avatarSeed=n[2]%100000;state.avatarMode='random';find('[data-key="handle"]').value=state.handle;find('[data-key="avatarMode"]').value=state.avatarMode;render();persist();});
    find('[data-upload]').addEventListener('click',()=>find('[data-file]').click());
    find('[data-file]').addEventListener('change',async e=>{
      const file=e.target.files[0];if(!file)return;const version=++uploadVersion;const url=URL.createObjectURL(file);
      try{const img=new Image();img.src=url;await img.decode();if(version!==uploadVersion)return;uploaded=img;state.avatarMode='original';find('[data-key="avatarMode"]').value='original';render();find('[data-status]').textContent='프로필 사진을 적용했습니다.';persist();}catch{find('[data-status]').textContent='사진을 읽을 수 없습니다. 다른 이미지로 시도해주세요.';}finally{URL.revokeObjectURL(url);}
    });
    find('[data-download]').addEventListener('click',()=>{
      if(!state.text.trim())return;paint(exportCanvas,false);
      find('[data-save-image]').src=exportCanvas.toDataURL('image/png');find('[data-show-export]').hidden=false;
      exportCanvas.toBlob(blob=>{
        if(!blob){find('.cs-save-dialog').showModal();return;}
        const url=URL.createObjectURL(blob),link=document.createElement('a');
        link.href=url;link.download=`comment-${state.platform}-${state.opacity===0?'transparent':state.theme}.png`;
        document.body.append(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(url),10000);
        find('[data-status]').textContent='PNG 다운로드를 요청했습니다. 저장되지 않으면 저장용 이미지 보기를 눌러주세요.';
      },'image/png');
    });
    find('[data-show-export]').addEventListener('click',()=>find('.cs-save-dialog').showModal());
    find('[data-close-save]').addEventListener('click',()=>find('.cs-save-dialog').close());
    render();
    sessions.push({state,applySaved,render});
  });
  let iconsInitialized=false;
  const iconObserver=new MutationObserver(initializeIcons);
  function initializeIcons(){if(iconsInitialized||!globalThis.lucide?.icons?.Heart)return;iconsInitialized=true;iconObserver.disconnect();lucide.createIcons();sessions.forEach(s=>s.render());}
  iconObserver.observe(root,{childList:true,subtree:true});initializeIcons();
  document.fonts?.ready.then(()=>sessions.forEach(s=>s.render()));
})();
