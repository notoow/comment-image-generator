'use strict';

(() => {
  const root = document.getElementById('comment-image-generator');
  const first = root.querySelector('.cs-app');
  const sessions = [];
  const platforms = [
    {id:'youtube',name:'YouTube',local:CommentI18n.t("유튜브"),symbol:'YT',group:CommentI18n.t("글로벌")},
    {id:'instagram',name:'Instagram',local:CommentI18n.t("인스타그램"),symbol:'IG',group:CommentI18n.t("글로벌")},
    {id:'tiktok',name:'TikTok',local:CommentI18n.t("틱톡"),symbol:'TT',group:CommentI18n.t("글로벌")},
    {id:'reddit',name:'Reddit',local:CommentI18n.t("레딧"),symbol:'r/',group:CommentI18n.t("글로벌")},
    {id:'x',name:'X',local:CommentI18n.t("트위터"),symbol:'X',group:CommentI18n.t("글로벌")},
    {id:'facebook',name:'Facebook',local:CommentI18n.t("페이스북"),symbol:'f',group:CommentI18n.t("글로벌")},
    {id:'threads',name:'Threads',local:CommentI18n.t("스레드"),symbol:'@',group:CommentI18n.t("글로벌")},
    {id:'tieba',name:'Baidu Tieba',local:CommentI18n.t("바이두 티에바 · 百度贴吧"),symbol:'贴吧',group:CommentI18n.t("중국")},
    {id:'bilibili',name:'Bilibili',local:CommentI18n.t("빌리빌리 · 哔哩哔哩"),symbol:'bili',group:CommentI18n.t("중국")},
    {id:'weibo',name:'Weibo',local:CommentI18n.t("웨이보 · 微博"),symbol:'wb',group:CommentI18n.t("중국")},
    {id:'xiaohongshu',name:'Xiaohongshu',local:CommentI18n.t("샤오홍슈 · 小红书"),symbol:'红',group:CommentI18n.t("중국")},
    {id:'douyin',name:'Douyin',local:CommentI18n.t("더우인 · 抖音"),symbol:'抖',group:CommentI18n.t("중국")},
    {id:'futaba',name:'2chan',local:CommentI18n.t("후타바 · ふたば"),symbol:'2ch',group:CommentI18n.t("일본")},
    {id:'fivech',name:'5ch',local:CommentI18n.t("5ちゃんねる · 구 2ch"),symbol:'5ch',group:CommentI18n.t("일본")},
    {id:'dc',name:'DC Inside',local:CommentI18n.t("디시인사이드"),symbol:'dc',group:CommentI18n.t("한국")}
  ];
  const names = Object.fromEntries(platforms.map(p=>[p.id,p.name]));
  const palette = ['#5f6dc5','#005c98','#689f38','#00897b','#d84315','#c62828','#ad1457','#555555'];
  const maxReplyItems=20;
  const makeReplyId=()=>globalThis.crypto?.randomUUID?.()||`r${Math.random().toString(36).slice(2,11)}`;
  const groups = first.querySelector('[data-platform-groups]');
  for (const group of [CommentI18n.t("글로벌"),CommentI18n.t("중국"),CommentI18n.t("일본"),CommentI18n.t("한국")]) {
    const section=document.createElement('section');section.className='cs-platform-group';
    const title=document.createElement('h3');title.textContent=group;section.append(title);
    const grid=document.createElement('div');grid.className='cs-platform-grid';grid.setAttribute('role','group');grid.setAttribute('aria-label',group+CommentI18n.t(" 플랫폼"));
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
    const state = {platform:'tiktok',theme:'light',panel:'content',handle:'@slow_morning',nameStyle:'mixed',nameGeneratorVersion:2,text:find('[data-key="text"]').value,replyItems:[],visibility:{},date:CommentI18n.t("9일 전"),likes:24,replies:3,genericReplies:3,postNumber:123456,avatarMode:'default',avatarSeed:0,avatarColor:'#5f6dc5',avatarText:'KS',youtubeMode:'collapsed',opacity:100,width:960,height:0,font:14,padding:24,horizontal:24,guides:false,cornerRadii:{tl:0,tr:0,br:0,bl:0},cornerRadiusLinked:true};
    state.replyIndex=1;state.boardId='aB3cD4eF0';state.tiebaMode='floor';state.region='';
    const numeric = new Set(['likes','replies','postNumber','replyIndex','opacity','width','height','font','padding','horizontal']);
    const dateSteps=[CommentI18n.t("방금"),...Array.from({length:23},(_,i)=>CommentI18n.t("{0}시간 전",[i+1])),...Array.from({length:30},(_,i)=>CommentI18n.t("{0}일 전",[i+1])),...Array.from({length:11},(_,i)=>CommentI18n.t("{0}개월 전",[i+1])),...Array.from({length:10},(_,i)=>CommentI18n.t("{0}년 전",[i+1]))];
    const dateSlider=find('[data-date-slider]'),dateValue=find('[data-date-value]');dateSlider.max=String(dateSteps.length-1);
    function syncDateSlider(){const value=find('[data-key="date"]').value.trim(),index=dateSteps.findIndex(step=>step.replace(/\s/g,'')===value.replace(/\s/g,'')),label=index>=0?dateSteps[index]:CommentI18n.t("직접 입력: {0}",[value||CommentI18n.t("없음")]);if(index>=0)dateSlider.value=String(index);dateValue.textContent=label;dateSlider.setAttribute('aria-valuetext',label);}
    let uploaded = null;
    let uploadVersion = 0;
    let previousOpacity = 100;
    const canvas = find('.cs-image');
    const avatarCanvas = find('.cs-avatar-mini');
    function applySaved(data) {
      if(!('genericReplies' in data)&&Number.isFinite(Number(data.replies)))state.genericReplies=Number(data.replies);
      for (const key of Object.keys(state)) {
        if (!(key in data)) continue;
        if (numeric.has(key) && Number.isFinite(Number(data[key]))) state[key] = Number(data[key]);
        else if (typeof data[key] === typeof state[key]) state[key] = data[key];
      }
      if (!platforms.some(p=>p.id===state.platform)) state.platform = 'tiktok';
      if(!Array.isArray(state.replyItems))state.replyItems=state.replyText?[{handle:'@notoow',text:state.replyText,translation:'',date:CommentI18n.t("방금 전"),likes:0,avatarColor:'#689f38',avatarText:'N'}]:[];
      state.replyItems=state.replyItems.slice(0,maxReplyItems).map((item,index)=>({id:/^[a-z0-9_-]{1,40}$/i.test(item.id||'')?item.id:makeReplyId(),handle:String(item.handle||'@notoow').slice(0,60),text:String(item.text||'').slice(0,4000),translation:String(item.translation||'').slice(0,1000),date:String(item.date||CommentI18n.t("방금 전")).slice(0,30),likes:Math.max(0,Math.min(99999,Number(item.likes)||0)),avatarColor:/^#[0-9a-f]{6}$/i.test(item.avatarColor||'')?item.avatarColor:'#689f38',avatarText:String(item.avatarText||'N').slice(0,3),avatarSeed:Number(item.avatarSeed)||index,nameStyle:CommentRandom.styles.includes(item.nameStyle)?item.nameStyle:state.nameStyle,avatarMode:['default','random','initials','original','mosaic','blur'].includes(item.avatarMode)?item.avatarMode:'default'}));
      if(state.replyItems.length===1&&state.replyItems[0].handle==='@xiomaralopez7410'&&state.replyItems[0].text==='LESBIANS (me) LOVE TVT!!!'&&state.replyItems[0].translation===CommentI18n.t("한국어로 번역"))state.replyItems=[];
      if(data.nameGeneratorVersion!==2||!CommentRandom.styles.includes(state.nameStyle))state.nameStyle='mixed';
      state.nameGeneratorVersion=2;
      if (!/^#[0-9a-f]{6}$/i.test(state.avatarColor)) state.avatarColor='#5f6dc5';
      if (!['default','random','initials','original','mosaic','blur'].includes(state.avatarMode)) state.avatarMode='default';
      if (!['collapsed','expanded'].includes(state.youtubeMode)) state.youtubeMode='collapsed';
      if (!['floor','nested'].includes(state.tiebaMode)) state.tiebaMode='floor';state.region=state.region.slice(0,20);
      state.avatarText=Array.from(state.avatarText).slice(0,3).join('');
      if (!['light','dark'].includes(state.theme)) state.theme = 'light';
      if (!['content','design'].includes(state.panel)) state.panel = 'content';
      state.width=Math.max(240,Math.min(1600,Math.round(state.width)));
      state.height=state.height?Math.max(64,Math.min(8000,Math.round(state.height))):0;
      if(!state.cornerRadii||typeof state.cornerRadii!=='object')state.cornerRadii={tl:0,tr:0,br:0,bl:0};
      for(const corner of ['tl','tr','br','bl'])state.cornerRadii[corner]=Math.max(0,Math.min(160,Math.round(Number(state.cornerRadii[corner])||0)));
      if(typeof state.cornerRadiusLinked!=='boolean')state.cornerRadiusLinked=true;
      if (![12,14,16,20,24,28,32].includes(state.font)) state.font = 14;
      state.opacity = Math.max(0,Math.min(100,state.opacity));
      state.padding = Math.max(16,Math.min(48,state.padding));
      state.horizontal = Math.max(16,Math.min(64,state.horizontal));
      state.text = state.text.slice(0,4000);state.handle=state.handle.slice(0,60);state.date=state.date.slice(0,30);
      for(const key of ['likes','replies']) state[key]=Math.max(0,Math.min(99999,Math.floor(state[key])));
      state.postNumber=Math.max(1,Math.min(999999999,Math.floor(state.postNumber)));
      state.replyIndex=Math.max(1,Math.min(999999,Math.floor(state.replyIndex)));state.boardId=state.boardId.slice(0,30);
      for (const input of all('[data-key]')) input.value = input.dataset.key==='height'&&!state.height?'':String(state[input.dataset.key]);
    }
    const saved=savedFor(index);
    if(saved.cornerRadii&&['tl','tr','br','bl'].every(corner=>Number(saved.cornerRadii[corner])===31))saved.cornerRadii={tl:0,tr:0,br:0,bl:0};
    applySaved(saved);
    function syncCornerRadiusControls(){
      for(const input of all('[data-radius-corner]'))input.value=String(state.cornerRadii[input.dataset.radiusCorner]);
      const link=find('[data-radius-link]');link.setAttribute('aria-pressed',String(state.cornerRadiusLinked));link.dataset.linked=String(state.cornerRadiusLinked);find('[data-radius-link-label]').textContent=state.cornerRadiusLinked?CommentI18n.t("연결됨"):CommentI18n.t("각각");
    }
    syncCornerRadiusControls();
    const replyList=find('[data-reply-list]');
    function updateReplyAvatarPreview(preview,item) {
      const art=CommentAvatar.create(item,CommentAvatar.photos.get(item.id));
      if(preview.tagName==='CANVAS'){const g=preview.getContext('2d');g.clearRect(0,0,preview.width,preview.height);g.drawImage(art,0,0,preview.width,preview.height);}
      else{preview.replaceChildren(art);art.style.cssText='width:100%;height:100%';}
    }
    function replyControlClone(source,item) {
      const copy=source.cloneNode(true);
      for(const node of [copy,...copy.querySelectorAll('*')]){
        for(const attr of [...node.attributes])if(attr.name.startsWith('data-')&&attr.name!=='data-lucide'){
          node.removeAttribute(attr.name);
          if(attr.name==='data-key')node.setAttribute('data-reply-field',attr.value);
          else if(attr.name==='data-upload')node.dataset.replyAction='upload';
          else if(attr.name==='data-random-avatar')node.dataset.replyAction='profile';
          else if(attr.name==='data-random-name')node.dataset.replyAction='name';
          else node.setAttribute('data-reply-'+attr.name.slice(5),attr.value);
        }
        if(node.id)node.id='reply-'+item.id+'-'+node.id;
        if(node.hasAttribute('for'))node.setAttribute('for','reply-'+item.id+'-'+node.getAttribute('for'));
      }
      copy.querySelectorAll('[data-reply-field]').forEach(control=>{control.value=item[control.dataset.replyField]??state.nameStyle;});
      const slider=copy.querySelector('[data-reply-date-slider]'),label=copy.querySelector('[data-reply-date-value]');if(slider){const index=dateSteps.indexOf(item.date);slider.value=String(index<0?0:index);slider.setAttribute('aria-valuetext',item.date);}if(label)label.textContent=item.date;syncReplyProfile(copy,item);return copy;
    }
    function syncReplyProfile(card,item){
      const preview=card.querySelector('.cs-avatar-mini');if(preview)updateReplyAvatarPreview(preview,item);
      const color=card.querySelector('[data-reply-avatar-color-value]');if(color)color.textContent=item.avatarColor.toUpperCase();
      const initials=card.querySelector('[data-reply-initials-field]');if(initials)initials.hidden=item.avatarMode!=='initials';
      const photo=CommentAvatar.photos.has(item.id)&&['original','mosaic','blur'].includes(item.avatarMode);
      card.querySelectorAll('[data-reply-avatar-color]').forEach(button=>{button.disabled=photo;button.setAttribute('aria-pressed',String(button.dataset.replyAvatarColor===item.avatarColor));});
      const control=card.querySelector('[data-reply-field="avatarColor"]');if(control){control.value=item.avatarColor;control.disabled=photo;}
    }
    function renderReplyEditors(){
      replyList.replaceChildren();
      const addButton=find('[data-add-reply]');addButton.disabled=state.replyItems.length>=maxReplyItems;addButton.setAttribute('aria-label',CommentI18n.t("답글 추가 ({0}/{1})",[state.replyItems.length,maxReplyItems]));
      find('[data-reply-count]').textContent=`${state.replyItems.length} / ${maxReplyItems}`;
      find('[data-reply-empty]').hidden=state.replyItems.length>0;
      state.replyItems.forEach((item,i)=>{
        const card=document.createElement('fieldset');card.className='cs-reply-editor';card.dataset.replyIndex=i;
        const legend=document.createElement('legend');legend.className='cs-reply-legend';const title=document.createElement('span');title.textContent=CommentI18n.t("답글 {0}",[i+1]);const remove=document.createElement('button');remove.type='button';remove.className='cs-reply-remove';remove.dataset.replyAction='remove';remove.setAttribute('aria-label',CommentI18n.t("답글 {0} 삭제",[i+1]));remove.title=CommentI18n.t("답글 삭제");remove.textContent='×';legend.append(title,remove);card.append(legend);
        const field=(key,label,value,tag='input')=>{const wrap=document.createElement('label');wrap.className='cs-field';const title=document.createElement('span');title.className='cs-field-title';title.textContent=label;const control=document.createElement(tag);control.dataset.replyField=key;control.value=value;if(tag==='textarea'){control.rows=4;control.maxLength=key==='text'?4000:1000;if(key==='text'){const count=document.createElement('output');count.dataset.replyTextCount='';count.textContent=String(value.length)+' / 4,000';title.append(count);}}else if(key==='likes'){control.type='number';control.min='0';control.max='99999';control.inputMode='numeric';}else control.maxLength=key==='handle'?60:key==='translation'?1000:30;wrap.append(title,control);card.append(wrap);};
        card.append(replyControlClone(find('[data-avatar-field]'),item));
        card.append(replyControlClone(find('[data-key="handle"]').closest('.cs-field'),item));
        field('text',CommentI18n.t("답글 내용"),item.text,'textarea');field('translation',CommentI18n.t("번역 문구"),item.translation);card.append(replyControlClone(find('.cs-date-field'),item));field('likes',CommentI18n.t("좋아요"),item.likes);
        replyList.append(card);
      });
    }
    renderReplyEditors();
    function avatarSource() { return CommentAvatar.create(state,uploaded); }
    async function paint(target,guides,snapshot={...state}) {
      const avatar=avatarSource();
      const mini=avatarCanvas.getContext('2d');mini.clearRect(0,0,84,84);mini.drawImage(avatar,0,0,84,84);
      return CommentNative.render({state:snapshot,avatar,target,guides});
    }
    let renderVersion=0;
    const liveHost=find('.cs-live-comment');
    function cornerRadiusCss(){const r=state.cornerRadii;return `${r.tl}px ${r.tr}px ${r.br}px ${r.bl}px`;}
    function applyCornerRadius(){
      const css=cornerRadiusCss(),wrap=find('.cs-image-wrap');canvas.style.borderRadius=css;wrap.style.borderRadius=css;
      const native=liveHost.querySelector('[data-native-template]');if(native){native.style.borderRadius=css;native.style.overflow='hidden';}
    }
    const commentMenu=find('.cs-comment-menu');
    function closeCommentMenu(){commentMenu.hidden=true;find('[data-comment-menu]')?.setAttribute('aria-expanded','false');}
    find('.cs-resize-frame').addEventListener('click',event=>{
      const toggle=event.target.closest('[data-yt-toggle]');
      if(toggle){state.youtubeMode=state.youtubeMode==='expanded'?'collapsed':'expanded';find('[data-key="youtubeMode"]').value=state.youtubeMode;render();persist();return;}
      const trigger=event.target.closest('[data-comment-menu]');if(!trigger)return;
      const opening=commentMenu.hidden;closeCommentMenu();if(!opening)return;
      const rect=trigger.getBoundingClientRect(),frame=find('.cs-resize-frame').getBoundingClientRect();
      commentMenu.style.top=rect.bottom-frame.top+4+'px';commentMenu.style.right=Math.max(0,frame.right-rect.right)+'px';commentMenu.hidden=false;trigger.setAttribute('aria-expanded','true');commentMenu.querySelector('button').focus();
    });
    document.addEventListener('pointerdown',event=>{if(!commentMenu.contains(event.target)&&!event.target.closest('[data-comment-menu]'))closeCommentMenu();});
    commentMenu.addEventListener('keydown',event=>{if(event.key==='Escape'){closeCommentMenu();find('[data-comment-menu]')?.focus();}});
    find('[data-comment-edit]').addEventListener('click',()=>{state.panel='content';render();persist();find('[data-key="text"]').focus();});
    find('[data-comment-copy]').addEventListener('click',async()=>{closeCommentMenu();try{await navigator.clipboard.writeText(state.text);find('[data-status]').textContent=CommentI18n.t("댓글 텍스트를 복사했습니다.");}catch{find('[data-status]').textContent=CommentI18n.t("댓글 입력란에서 텍스트를 선택해 복사해 주세요.");}});
    function showEditablePreview(){
      liveHost.hidden=false;canvas.hidden=true;
      const size=CommentNative.preview({state:{...state},avatar:avatarSource(),host:liveHost,interactive:true});
      applyCornerRadius();
      renderVisibilityEditor();
      resizer.update(size,{live:true});find('[data-comment-menu]')?.setAttribute('aria-expanded',String(!commentMenu.hidden));sizeLabels(size);return size;
    }
    function sizeLabels({w,h}){
      find('[data-size]').textContent=`${w.toLocaleString()} × ${h.toLocaleString()} px`;
      find('[data-export-size]').textContent=`${(w*2).toLocaleString()} × ${(h*2).toLocaleString()} px${state.opacity===0?CommentI18n.t(" · 투명 배경"):''}`;
      find('[data-key="height"]').placeholder=CommentI18n.t("자동 ({0} px)",[h]);
    }
    function renderVisibilityEditor(){
      const section=find('[data-visibility-editor]'),list=find('[data-visibility-list]');
      section.hidden=!['youtube','instagram'].includes(state.platform);
      list.replaceChildren();
      if(section.hidden)return;
      const root=liveHost.querySelector('[data-native-template]');
      const labels={avatar:CommentI18n.t("프로필 이미지"),header:CommentI18n.t("아이디 · 작성 시점"),body:CommentI18n.t("댓글 본문"),expand:CommentI18n.t("자세히 보기 · 간략히"),reactions:CommentI18n.t("좋아요 · 답글 동작"),'comment-menu':CommentI18n.t("댓글 우측 메뉴"),'thread-connectors':CommentI18n.t("대댓글 곡선 연결선"),'reply-collapse':CommentI18n.t("대댓글 접기 버튼")};
      const seen=new Set();
      for(const layer of root?.querySelectorAll('[data-layer]')||[]){
        const key=layer.dataset.layer;if(seen.has(key))continue;seen.add(key);
        let label=labels[key];
        if(key.startsWith('reply-')&&key!=='reply-collapse'){const item=state.replyItems.find(reply=>`reply-${reply.id}`===key),index=state.replyItems.indexOf(item);label=item?CommentI18n.t("대댓글 {0} · {1}",[index+1,item.handle]):CommentI18n.t("대댓글");}
        if(!label)continue;
        const visible=state.visibility?.[key]!==false,button=document.createElement('button');button.type='button';button.className='cs-visibility-item';button.dataset.visibilityKey=key;button.setAttribute('aria-pressed',String(visible));button.setAttribute('aria-label',`${label}: ${visible?CommentI18n.t("표시 중"):CommentI18n.t("숨김")}`);
        const name=document.createElement('span');name.className='cs-visibility-name';name.textContent=label;
        const stateLabel=document.createElement('span');stateLabel.className='cs-visibility-state';stateLabel.textContent=visible?CommentI18n.t("표시 중"):CommentI18n.t("숨김");
        button.append(name,stateLabel);list.append(button);
      }
      if(!list.childElementCount){const empty=document.createElement('p');empty.className='cs-help';empty.textContent=CommentI18n.t("조절할 요소가 없습니다.");list.append(empty);}
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
      onRadiusChange({corner,value}){
        const radius=Math.max(0,Math.min(160,Math.round(value)));
        if(state.cornerRadiusLinked)state.cornerRadii={tl:radius,tr:radius,br:radius,bl:radius};
        else state.cornerRadii[corner]=radius;
        syncCornerRadiusControls();applyCornerRadius();return radius;
      },
      onEnd(){persist();render();},
      onError(error){find('[data-status]').textContent=error.userMessage||CommentI18n.t("이 크기로 조절할 수 없습니다. 다른 크기를 선택해 주세요.");}
    });
    for(const input of all('[data-radius-corner]'))input.addEventListener('input',()=>{
      const corner=input.dataset.radiusCorner,value=Math.max(0,Math.min(160,Math.round(Number(input.value)||0)));
      if(state.cornerRadiusLinked)state.cornerRadii={tl:value,tr:value,br:value,bl:value};else state.cornerRadii[corner]=value;
      syncCornerRadiusControls();applyCornerRadius();queueRender();persist();
    });
    find('[data-radius-link]').addEventListener('click',()=>{
      state.cornerRadiusLinked=!state.cornerRadiusLinked;
      if(state.cornerRadiusLinked){const value=state.cornerRadii.tl;state.cornerRadii={tl:value,tr:value,br:value,bl:value};}
      syncCornerRadiusControls();applyCornerRadius();queueRender();persist();
    });
    find('[data-fit]').addEventListener('click',()=>resizer.fit());
    find('[data-zoom-in]').addEventListener('click',()=>resizer.zoomIn());
    find('[data-zoom-out]').addEventListener('click',()=>resizer.zoomOut());
    find('[data-auto-height]').addEventListener('click',()=>{state.height=0;find('[data-key="height"]').value='';render();persist();});
    async function render(){
      const version=++renderVersion;canvas.setAttribute("aria-busy","true");
      closeCommentMenu();app.dataset.imageTheme=state.theme;
      syncCornerRadiusControls();applyCornerRadius();
      const platform=platforms.find(p=>p.id===state.platform),board=['futaba','fivech'].includes(state.platform);
      find('[data-selected-name]').textContent=platform.name;find('[data-selected-local]').textContent=platform.local;find('[data-selected-symbol]').textContent=platform.symbol;
      find('[data-youtube-only]').hidden=state.platform!=='youtube';
      find('[data-replies-editor]').hidden=!['youtube','instagram'].includes(state.platform);
      find('[data-visibility-editor]').hidden=!['youtube','instagram'].includes(state.platform);
      if(find('[data-visibility-editor]').hidden)find('[data-visibility-list]').replaceChildren();
      find('[data-replies-field]').hidden=['youtube','instagram','futaba'].includes(state.platform);
      find('[data-futaba-only]').hidden=state.platform!=='futaba';find('[data-fivech-only]').hidden=state.platform!=='fivech';
      find('[data-tieba-only]').hidden=state.platform!=='tieba';find('[data-region-field]').hidden=state.platform!=='douyin';
      find('[data-initials-field]').hidden=state.avatarMode!=='initials';
      const photo=!!uploaded&&['original','mosaic','blur'].includes(state.avatarMode);
      find('[data-key="avatarColor"]').disabled=photo;find('[data-avatar-color-value]').textContent=state.avatarColor.toUpperCase();
      all('[data-avatar-color]').forEach(b=>{b.disabled=photo;b.setAttribute('aria-pressed',String(b.dataset.avatarColor.toLowerCase()===state.avatarColor.toLowerCase()));});
      find('[data-avatar-field]').hidden=board||state.platform==='dc';find('[data-board-field]').hidden=!board&&(state.platform!=='tieba'||state.tiebaMode==='nested');find('[data-reaction-fields]').hidden=['fivech','dc'].includes(state.platform);
      find('[data-likes-field]').hidden=state.platform==='tieba';
      find('[data-likes-label]').textContent=state.platform==='reddit'?CommentI18n.t("투표 수"):state.platform==='futaba'?'そうだね':state.platform==='dc'?CommentI18n.t("추천"):CommentI18n.t("좋아요");
      all('[data-platform]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.platform===state.platform)));
      all('[data-theme]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.theme===state.theme)));
      all('[data-panel-button]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.panelButton===state.panel)));
      all('[data-panel]').forEach(p=>p.hidden=p.dataset.panel!==state.panel);
      find('[data-guide]').setAttribute('aria-pressed',String(state.guides));
      find('[data-transparent]').checked=state.opacity===0;
      find('[data-count]').textContent=`${state.text.length.toLocaleString()} / 4,000`;
      state.replies=['youtube','instagram'].includes(state.platform)?state.replyItems.length:state.genericReplies;
      find('[data-opacity]').textContent=state.opacity+'%';find('[data-padding]').textContent=state.padding+' px';find('[data-horizontal]').textContent=state.horizontal+' px';
      find('.cs-platform-name').textContent=names[state.platform];find('[data-status]').textContent=['tieba','threads','douyin'].includes(state.platform)?CommentI18n.t("실제 웹 댓글 캡처와 비교해 재현 · 캡처 시점·글꼴에 따라 차이 있음"):CommentI18n.t("실제 웹 댓글의 아이콘·배치 실측 반영 · 브라우저와 글꼴에 따라 차이 있음");
      find('[data-download]').disabled=true;
      let rendered=false;
      try {
        if(['youtube','instagram'].includes(state.platform))showEditablePreview();
        const temp=document.createElement('canvas');const size=await paint(temp,state.guides);const {w,h,overflow}=size;
        if(version!==renderVersion)return;
        rendered=true;canvas.dataset.layoutOverflow=String(overflow);canvas.width=temp.width;canvas.height=temp.height;canvas.getContext('2d').drawImage(temp,0,0);
        applyCornerRadius();
        if(state.height){state.height=h;find('[data-key="height"]').value=h;persist();}
        sizeLabels(size);if(['youtube','instagram'].includes(state.platform))showEditablePreview();else resizer.update(size);
      } catch(error) {
        if(version===renderVersion){find('[data-status]').textContent=error.userMessage||CommentI18n.t("이미지를 만들지 못했습니다. 설정을 바꾸거나 새로고침해 주세요.");canvas.width=0;canvas.height=0;find('[data-size]').textContent=CommentI18n.t("설정을 조절해 주세요.");find('[data-export-size]').textContent=CommentI18n.t("PNG 출력 범위 초과");}
        if(version===renderVersion){liveHost.hidden=true;liveHost.replaceChildren();canvas.hidden=false;}console.error('Comment render failed',error);
      } finally {
        if(version===renderVersion){canvas.setAttribute('aria-busy','false');find('[data-download]').disabled=!rendered||!state.text.trim();}
      }
    }
    let inputTimer;
    function queueRender(){clearTimeout(inputTimer);canvas.setAttribute('aria-busy','true');find('[data-download]').disabled=true;++renderVersion;inputTimer=setTimeout(render,100);}
    for(const input of all('[data-key]')) input.addEventListener('input',()=>{
      const key=input.dataset.key;if(key==='avatarMode')uploadVersion++;state[key]=numeric.has(key)?Math.max(Number(input.min||0),Math.min(Number(input.max||99999),Number(input.value)||0)):input.value;
      if(['likes','replies'].includes(key))state[key]=Math.floor(state[key]);
      if(key==='replies')state.genericReplies=state[key];
      queueRender();persist();
    });
    find('[data-key="date"]').addEventListener('input',syncDateSlider);
    dateSlider.addEventListener('input',()=>{const date=dateSteps[Number(dateSlider.value)];find('[data-key="date"]').value=date;syncDateSlider();state.date=date;queueRender();persist();});
    syncDateSlider();
    liveHost.addEventListener('input',event=>{
      const target=event.target.closest('[data-comment-text],[data-reply-item]');if(!target)return;
      if(target.hasAttribute('data-comment-text')){state.text=target.innerText.replace(/\r/g,'');find('[data-key="text"]').value=state.text;find('[data-count]').textContent=`${state.text.length.toLocaleString()} / 4,000`;}
      else{const item=state.replyItems[Number(target.dataset.replyItem)],key=target.dataset.replyField;if(!item||!key)return;item[key]=target.innerText.replace(/\r/g,'');const control=replyList.querySelector(`[data-reply-index="${target.dataset.replyItem}"] [data-reply-field="${key}"]`);if(control)control.value=item[key];}
      find('[data-download]').disabled=!state.text.trim();persist();
    });
    liveHost.addEventListener('focusout',event=>{if(event.target.matches('[data-comment-text],[data-reply-item]'))queueRender();});
    replyList.addEventListener('input',event=>{if(event.target.matches('[data-reply-date-slider]')){const card=event.target.closest('[data-reply-index]'),item=state.replyItems[Number(card.dataset.replyIndex)];item.date=dateSteps[Number(event.target.value)];card.querySelector('[data-reply-field=date]').value=item.date;card.querySelector('[data-reply-date-value]').textContent=item.date;event.target.setAttribute('aria-valuetext',item.date);persist();queueRender();return;}const control=event.target.closest('[data-reply-field]');if(!control)return;const card=control.closest('[data-reply-index]'),item=state.replyItems[Number(card.dataset.replyIndex)];if(!item)return;const key=control.dataset.replyField;item[key]=key==='likes'?Math.max(0,Number(control.value)||0):control.value;if(key==='text')card.querySelector('[data-reply-text-count]').textContent=String(item.text.length)+' / 4,000';if(key==='date')card.querySelector('[data-reply-date-value]').textContent=item.date;if(['avatarColor','avatarText','avatarMode'].includes(key))syncReplyProfile(card,item);persist();queueRender();});
    replyList.addEventListener('click',event=>{const button=event.target.closest('[data-reply-action]');if(!button)return;const card=button.closest('[data-reply-index]'),i=Number(card.dataset.replyIndex),item=state.replyItems[i],action=button.dataset.replyAction;if(action==='upload'){card.querySelector('[data-reply-file]').click();return;}if(action==='remove'){CommentAvatar.photos.delete(item.id);state.replyItems.splice(i,1);delete state.visibility[`reply-${item.id}`];renderReplyEditors();render();persist();const next=replyList.querySelector(`[data-reply-index="${Math.min(i,state.replyItems.length-1)}"] [data-reply-action="remove"]`)||find('[data-add-reply]');next.focus({preventScroll:true});return;}if(action==='profile'){if(!['default','initials'].includes(item.avatarMode))item.avatarMode='random';item.avatarSeed=CommentRandom.avatarSeed(item.avatarSeed);item.avatarColor=CommentRandom.avatarColor(item.avatarColor,palette);}else if(action==='name')item.handle=CommentRandom.name(item.nameStyle||state.nameStyle,item.handle);renderReplyEditors();render();persist();replyList.querySelector(`[data-reply-index="${i}"] [data-reply-action="${action}"]`)?.focus({preventScroll:true});});
    replyList.addEventListener('click',event=>{
      const button=event.target.closest('[data-reply-avatar-color]');if(!button)return;
      const card=button.closest('[data-reply-index]'),item=state.replyItems[Number(card.dataset.replyIndex)];
      item.avatarColor=button.dataset.replyAvatarColor;syncReplyProfile(card,item);persist();queueRender();
    });
    replyList.addEventListener('change',async event=>{
      if(!event.target.matches('[data-reply-file]'))return;
      const card=event.target.closest('[data-reply-index]'),item=state.replyItems[Number(card.dataset.replyIndex)],file=event.target.files[0];if(!file)return;
      const version=(item.uploadVersion||0)+1;item.uploadVersion=version;const url=URL.createObjectURL(file);
      try{const image=new Image();image.src=url;await image.decode();if(!state.replyItems.includes(item)||item.uploadVersion!==version)return;CommentAvatar.photos.set(item.id,image);item.avatarMode='original';renderReplyEditors();render();persist();}
      catch{find('[data-status]').textContent=CommentI18n.t("사진을 읽을 수 없습니다. 다른 이미지로 시도해주세요.");}finally{URL.revokeObjectURL(url);}
    });
    find('[data-add-reply]').addEventListener('click',()=>{if(state.replyItems.length>=maxReplyItems)return;const used=new Set([state.handle,...state.replyItems.map(item=>item.handle)]);let handle=CommentRandom.name(state.nameStyle,'@notoow'),attempts=0;while(used.has(handle)&&attempts++<24)handle=CommentRandom.name(state.nameStyle,handle);const avatarSeed=CommentRandom.avatarSeed(state.replyItems.length),avatarColor=palette[avatarSeed%palette.length];state.replyItems.push({id:makeReplyId(),handle,text:'',translation:'',date:CommentI18n.t("방금 전"),likes:0,avatarColor,avatarText:Array.from(handle.replace(/^@/,'').toUpperCase())[0]||'N',avatarSeed,avatarMode:'default',nameStyle:state.nameStyle});renderReplyEditors();render();persist();const added=replyList.lastElementChild;added?.scrollIntoView({block:'nearest',behavior:'smooth'});added?.querySelector('[data-reply-field="handle"]')?.focus({preventScroll:true});});
    find('[data-visibility-list]').addEventListener('click',event=>{const button=event.target.closest('[data-visibility-key]');if(!button)return;const key=button.dataset.visibilityKey;state.visibility[key]=state.visibility?.[key]===false;render();persist();});
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
    all('[data-avatar-color]').forEach(button=>button.addEventListener('click',()=>{state.avatarColor=button.dataset.avatarColor;find('[data-key="avatarColor"]').value=state.avatarColor;render();persist();}));
    find('[data-random-avatar]').addEventListener('click',()=>{
      uploadVersion++;state.avatarSeed=CommentRandom.avatarSeed(state.avatarSeed);if(!['default','initials'].includes(state.avatarMode))state.avatarMode='random';state.avatarColor=CommentRandom.avatarColor(state.avatarColor,palette);find('[data-key="avatarColor"]').value=state.avatarColor;
      find('[data-key="avatarMode"]').value=state.avatarMode;render();persist();
    });
    find('[data-upload]').addEventListener('click',()=>find('[data-file]').click());
    find('[data-file]').addEventListener('change',async e=>{
      const file=e.target.files[0];if(!file)return;const version=++uploadVersion;const url=URL.createObjectURL(file);
      try{const img=new Image();img.src=url;await img.decode();if(version!==uploadVersion)return;uploaded=img;state.avatarMode='original';find('[data-key="avatarMode"]').value='original';render();find('[data-status]').textContent=CommentI18n.t("프로필 사진을 적용했습니다.");persist();}catch{find('[data-status]').textContent=CommentI18n.t("사진을 읽을 수 없습니다. 다른 이미지로 시도해주세요.");}finally{URL.revokeObjectURL(url);}
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
        find('[data-status]').textContent=CommentI18n.t("PNG 다운로드를 요청했습니다. 저장되지 않으면 저장용 이미지 보기를 눌러주세요.");
      } catch(error){
        find('[data-status]').textContent=error.userMessage||CommentI18n.t("PNG를 저장하지 못했습니다. 다시 시도해 주세요.");console.error('Comment export failed',error);
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
