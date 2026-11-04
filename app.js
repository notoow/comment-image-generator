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
  function savedFor(index) { try { return JSON.parse(localStorage.getItem('notoow.comment-image-generator.v2'))?.concepts?.[index] || {}; } catch { return {}; } }
  function persist() {
    const concepts = sessions.map(({state}) => ({...state}));
    try { localStorage.setItem('notoow.comment-image-generator.v2', JSON.stringify({concepts})); } catch {}
  }
  [first].forEach((app,index) => {
    const find = selector => app.querySelector(selector);
    const all = selector => [...app.querySelectorAll(selector)];
    const state = {platform:'tiktok',theme:'light',panel:'content',handle:'@slow_morning',nameStyle:'phrase',text:find('[data-key="text"]').value,date:'9일 전',likes:24,replies:3,postNumber:123456,avatarMode:'default',avatarSeed:0,opacity:100,width:960,height:0,font:14,padding:24,horizontal:24,guides:false};
    const numeric = new Set(['likes','replies','postNumber','opacity','width','height','font','padding','horizontal']);
    let uploaded = null;
    let uploadVersion = 0;
    let previousOpacity = 100;
    const canvas = find('.cs-image');
    const avatarCanvas = find('.cs-avatar-mini');
    function applySaved(data) {
      for (const key of Object.keys(state)) {
        if (!(key in data)) continue;
        if (numeric.has(key) && Number.isFinite(Number(data[key]))) state[key] = Number(data[key]);
        else if (typeof data[key] === typeof state[key]) state[key] = data[key];
      }
      if (!platforms.some(p=>p.id===state.platform)) state.platform = 'tiktok';
      if (!CommentRandom.styles.includes(state.nameStyle)) state.nameStyle = 'phrase';
      if (!['light','dark'].includes(state.theme)) state.theme = 'light';
      if (!['content','design'].includes(state.panel)) state.panel = 'content';
      state.width=Math.max(240,Math.min(1600,Math.round(state.width)));
      state.height=state.height?Math.max(64,Math.min(8000,Math.round(state.height))):0;
      if (![12,14,16,20,24,28,32].includes(state.font)) state.font = 14;
      state.opacity = Math.max(0,Math.min(100,state.opacity));
      state.padding = Math.max(16,Math.min(48,state.padding));
      state.horizontal = Math.max(16,Math.min(64,state.horizontal));
      state.text = state.text.slice(0,4000);state.handle=state.handle.slice(0,60);state.date=state.date.slice(0,30);
      for(const key of ['likes','replies']) state[key]=Math.max(0,Math.min(99999,Math.floor(state[key])));
      state.postNumber=Math.max(1,Math.min(999999999,Math.floor(state.postNumber)));
      for (const input of all('[data-key]')) input.value = input.dataset.key==='height'&&!state.height?'':String(state[input.dataset.key]);
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
    async function paint(target,guides,snapshot={...state}) {
      const avatar=avatarSource();
      const mini=avatarCanvas.getContext('2d');mini.clearRect(0,0,84,84);mini.drawImage(avatar,0,0,84,84);
      return CommentNative.render({state:snapshot,avatar,target,guides});
    }
    let renderVersion=0;
    const liveHost=find('.cs-live-comment');
    function sizeLabels({w,h}){
      find('[data-size]').textContent=`${w.toLocaleString()} × ${h.toLocaleString()} px`;
      find('[data-export-size]').textContent=`${(w*2).toLocaleString()} × ${(h*2).toLocaleString()} px${state.opacity===0?' · 투명 배경':''}`;
      find('[data-key="height"]').placeholder=`자동 (${h} px)`;
    }
    const resizer=CommentResize.mount({
      frame:find('.cs-resize-frame'),area:find('.cs-resize-area'),canvas,host:liveHost,
      ghost:find('.cs-resize-origin'),tooltip:find('.cs-resize-tooltip'),getState:()=>state,
      onStart(){clearTimeout(inputTimer);++renderVersion;canvas.setAttribute('aria-busy','true');find('[data-download]').disabled=true;},
      onChange(next){
        Object.assign(state,next);canvas.hidden=true;liveHost.hidden=false;
        const size=CommentNative.preview({state:{...state},avatar:avatarSource(),host:liveHost});
        if(state.height)state.height=size.h;
        find('[data-key="width"]').value=state.width;find('[data-key="height"]').value=state.height||'';
        sizeLabels(size);return size;
      },
      onEnd(){persist();render();},
      onError(error){find('[data-status]').textContent=error.userMessage||'이 크기로 조절할 수 없습니다. 다른 크기를 선택해 주세요.';}
    });
    find('[data-fit]').addEventListener('click',()=>resizer.fit());
    find('[data-auto-height]').addEventListener('click',()=>{state.height=0;find('[data-key="height"]').value='';render();persist();});
    async function render(){
      const version=++renderVersion;canvas.setAttribute("aria-busy","true");
      app.dataset.imageTheme=state.theme;
      const platform=platforms.find(p=>p.id===state.platform),board=['futaba','fivech'].includes(state.platform);
      find('[data-selected-name]').textContent=platform.name;find('[data-selected-local]').textContent=platform.local;find('[data-selected-symbol]').textContent=platform.symbol;
      find('[data-avatar-field]').hidden=board||state.platform==='dc';find('[data-board-field]').hidden=!board&&state.platform!=='tieba';find('[data-reaction-fields]').hidden=['fivech','dc'].includes(state.platform);
      find('[data-likes-field]').hidden=state.platform==='tieba';find('[data-replies-field]').hidden=state.platform==='futaba';
      find('[data-likes-label]').textContent=state.platform==='reddit'?'투표 수':state.platform==='futaba'?'そうだね':state.platform==='dc'?'추천':'좋아요';
      all('[data-platform]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.platform===state.platform)));
      all('[data-theme]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.theme===state.theme)));
      all('[data-panel-button]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.panelButton===state.panel)));
      all('[data-panel]').forEach(p=>p.hidden=p.dataset.panel!==state.panel);
      find('[data-guide]').setAttribute('aria-pressed',String(state.guides));
      find('[data-transparent]').checked=state.opacity===0;
      find('[data-count]').textContent=`${state.text.length.toLocaleString()} / 4,000`;
      find('[data-opacity]').textContent=state.opacity+'%';find('[data-padding]').textContent=state.padding+' px';find('[data-horizontal]').textContent=state.horizontal+' px';
      find('.cs-platform-name').textContent=names[state.platform];find('[data-status]').textContent=['youtube','instagram','dc'].includes(state.platform)?'실제 데스크톱 댓글의 측정값 반영 · 전체 화면 일치 검증 진행 중':'플랫폼별 웹 댓글 레이아웃 적용 · 원본과 세부 일치 검증 진행 중';
      find('[data-download]').disabled=true;
      let rendered=false;
      try {
        const temp=document.createElement('canvas');const size=await paint(temp,state.guides);const {w,h,overflow}=size;
        if(version!==renderVersion)return;
        rendered=true;canvas.dataset.layoutOverflow=String(overflow);canvas.width=temp.width;canvas.height=temp.height;canvas.getContext('2d').drawImage(temp,0,0);
        if(state.height){state.height=h;find('[data-key="height"]').value=h;persist();}
        sizeLabels(size);resizer.update(size);
      } catch(error) {
        if(version===renderVersion){find('[data-status]').textContent=error.userMessage||'이미지를 만들지 못했습니다. 설정을 바꾸거나 새로고침해 주세요.';canvas.width=0;canvas.height=0;find('[data-size]').textContent='설정을 조절해 주세요.';find('[data-export-size]').textContent='PNG 출력 범위 초과';}
        liveHost.hidden=true;liveHost.replaceChildren();canvas.hidden=false;console.error('Comment render failed',error);
      } finally {
        if(version===renderVersion){canvas.setAttribute('aria-busy','false');find('[data-download]').disabled=!rendered||!state.text.trim();}
      }
    }
    let inputTimer;
    function queueRender(){clearTimeout(inputTimer);canvas.setAttribute('aria-busy','true');find('[data-download]').disabled=true;++renderVersion;inputTimer=setTimeout(render,100);}
    for(const input of all('[data-key]')) input.addEventListener('input',()=>{
      const key=input.dataset.key;if(key==='avatarMode')uploadVersion++;state[key]=numeric.has(key)?Math.max(Number(input.min||0),Math.min(Number(input.max||99999),Number(input.value)||0)):input.value;
      if(['likes','replies'].includes(key))state[key]=Math.floor(state[key]);
      queueRender();persist();
    });
    all('[data-platform]').forEach(b=>b.addEventListener('click',()=>{state.platform=b.dataset.platform;render();find('.cs-platform-dialog').close();persist();}));
    find('[data-open-platform]').addEventListener('click',()=>find('.cs-platform-dialog').showModal());
    find('[data-close-platform]').addEventListener('click',()=>find('.cs-platform-dialog').close());
    all('[data-theme]').forEach(b=>b.addEventListener('click',()=>{state.theme=b.dataset.theme;render();persist();}));
    all('[data-panel-button]').forEach(b=>b.addEventListener('click',()=>{state.panel=b.dataset.panelButton;render();persist();}));
    find('[data-guide]').addEventListener('click',()=>{state.guides=!state.guides;render();persist();});
    find('[data-transparent]').addEventListener('change',e=>{if(e.target.checked){previousOpacity=state.opacity||100;state.opacity=0;}else state.opacity=previousOpacity;find('[data-key="opacity"]').value=state.opacity;render();persist();});
    find('[data-random-name]').addEventListener('click',()=>{
      state.handle=CommentRandom.name(state.nameStyle,state.handle);
      find('[data-key="handle"]').value=state.handle;render();persist();
    });
    find('[data-random-avatar]').addEventListener('click',()=>{
      uploadVersion++;state.avatarSeed=CommentRandom.avatarSeed(state.avatarSeed);state.avatarMode='random';
      find('[data-key="avatarMode"]').value=state.avatarMode;render();persist();
    });
    find('[data-upload]').addEventListener('click',()=>find('[data-file]').click());
    find('[data-file]').addEventListener('change',async e=>{
      const file=e.target.files[0];if(!file)return;const version=++uploadVersion;const url=URL.createObjectURL(file);
      try{const img=new Image();img.src=url;await img.decode();if(version!==uploadVersion)return;uploaded=img;state.avatarMode='original';find('[data-key="avatarMode"]').value='original';render();find('[data-status]').textContent='프로필 사진을 적용했습니다.';persist();}catch{find('[data-status]').textContent='사진을 읽을 수 없습니다. 다른 이미지로 시도해주세요.';}finally{URL.revokeObjectURL(url);}
    });
    let exporting=false;
    find('[data-download]').addEventListener('click',async()=>{
      if(!state.text.trim()||exporting)return;
      exporting=true;const snapshot={...state};const button=find('[data-download]');button.disabled=true;button.setAttribute('aria-busy','true');
      try {
        const output=document.createElement('canvas');await paint(output,false,snapshot);
        find('[data-save-image]').src=output.toDataURL('image/png');find('[data-show-export]').hidden=false;
        const blob=await new Promise(resolve=>output.toBlob(resolve,'image/png'));
        if(!blob){find('.cs-save-dialog').showModal();return;}
        const url=URL.createObjectURL(blob),link=document.createElement('a');
        link.href=url;link.download=`comment-${snapshot.platform}-${snapshot.opacity===0?'transparent':snapshot.theme}.png`;
        document.body.append(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(url),10000);
        find('[data-status]').textContent='PNG 다운로드를 요청했습니다. 저장되지 않으면 저장용 이미지 보기를 눌러주세요.';
      } catch(error){
        find('[data-status]').textContent=error.userMessage||'PNG를 저장하지 못했습니다. 다시 시도해 주세요.';console.error('Comment export failed',error);
      } finally {exporting=false;button.disabled=!state.text.trim();button.setAttribute('aria-busy','false');}
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
