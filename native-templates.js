'use strict';
// Measurements and original vector outlines: docs/reference-audit.md.
(() => {
  const paths = {
    heart:'M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z',
    up:'m7.748.854.779.13a3 3 0 012.44 3.588L10.5 6.75h3.046a2.748 2.748 0 012.204 4.387l.015.066A2.862 2.862 0 0115 13.874v.033c0 .227-.037.452-.109.668l-.08.21a2.815 2.815 0 01-2.59 1.715H9.516l-.294-.005a9.002 9.002 0 01-3.918-1.041l-.256-.142-.204-.116a1.502 1.502 0 00-.55-.186L4.102 15H2.625l-.116-.006a1.126 1.126 0 01-1.003-1.005l-.006-.114v-4.5c0-.62.504-1.124 1.125-1.124h1.342a.75.75 0 00.66-.395l.048-.107 2.24-6.403a.75.75 0 01.833-.491ZM6.09 8.243A2.25 2.25 0 013.967 9.75H3v3.749h1.1a3 3 0 011.49.395l.202.116a7.503 7.503 0 003.724.99h2.703c.566 0 1.07-.363 1.248-.9a.61.61 0 00.032-.193v-.655l.44-.439a1.36 1.36 0 00.363-1.272l-.014-.065-.157-.675.413-.556a1.248 1.248 0 00-.999-1.995H10.5a1.501 1.501 0 01-1.467-1.815L9.5 4.257a1.5 1.5 0 00-1.22-1.794l-.157-.026L6.09 8.243Z',
    down:'m8.482 1.5.294.005a9.01 9.01 0 013.918 1.04l.257.143.203.116c.17.097.357.16.55.185l.194.012h1.477l.115.006c.53.054.95.475 1.004 1.005l.006.114v4.499c0 .621-.504 1.125-1.125 1.125h-1.343a.75.75 0 00-.66.395l-.048.107-2.24 6.402a.75.75 0 01-.832.491l-.78-.13a3 3 0 01-2.439-3.587L7.5 11.25H4.454a2.749 2.749 0 01-2.683-2.151 2.762 2.762 0 01.479-2.237l-.016-.065A2.862 2.862 0 013 4.125v-.032c0-.227.037-.453.108-.668l.08-.211A2.816 2.816 0 015.78 1.5h2.703ZM5.78 3c-.566 0-1.069.362-1.248.9a.613.613 0 00-.031.193v.654l-.44.44c-.333.332-.47.813-.364 1.271l.015.065.157.675-.413.557a1.248 1.248 0 00.999 1.995H7.5a1.501 1.501 0 011.467 1.815L8.5 13.742a1.5 1.5 0 001.22 1.794l.157.027 2.031-5.806a2.25 2.25 0 012.124-1.507H15V4.501h-1.102a3.001 3.001 0 01-1.489-.396l-.202-.116A7.504 7.504 0 008.482 3H5.78Z',
    kebab:'M12 4a2 2 0 100 4 2 2 0 000-4Zm0 6a2 2 0 100 4 2 2 0 000-4Zm0 6a2 2 0 100 4 2 2 0 000-4Z',
    chevron:'M18.707 8.793a1 1 0 00-1.414 0L12 14.086 6.707 8.793a1 1 0 10-1.414 1.414L12 16.914l6.707-6.707a1 1 0 000-1.414Z'
  };
  const e=(tag,style,text)=>{const n=document.createElement(tag);Object.assign(n.style,style);if(text!==undefined)n.textContent=text;return n;};
  function icon(name,size){const n=document.createElementNS('http://www.w3.org/2000/svg','svg');n.setAttribute('viewBox',name==='up'||name==='down'?'0 0 18 18':'0 0 24 24');n.setAttribute('width',size);n.setAttribute('height',size);n.style.cssText='display:block;flex:none;fill:currentColor';n.style.width=size+'px';n.style.height=size+'px';const p=document.createElementNS(n.namespaceURI,'path');p.setAttribute('d',paths[name]);n.append(p);return n;}
  let fontCSS;
  function embeddedFonts(node){
    // The library otherwise fetches and embeds every font again for every keystroke.
    return fontCSS ||= htmlToImage.getFontEmbedCSS(node).catch(error=>{fontCSS=null;throw error;});
  }
  const outlines={
    heart:'M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z',
    comment:'M20.5 11.3a8.5 8.5 0 0 1-8.5 8.2 9.2 9.2 0 0 1-3.1-.5l-4.4 2 .9-4.3A7.9 7.9 0 0 1 3.5 11.3a8.5 8.5 0 0 1 17 0Z',
    share:'M14 3 22 10 14 17v-4C8 13 5 15 2 20c0-9 5-13 12-13Z',
    broken:'M9 3.7a5.2 5.2 0 0 0-6.5 5C2.5 13 12 21 12 21s9.5-8 9.5-12.3A5.2 5.2 0 0 0 15 3.7L12 8l3 4-4 4 1-5-3-4 3-4',
    repeat:'M4 8h15l-4-4M20 16H5l4 4M4 8v8M20 16V8',
    send:'m22 2-7 20-4-9L2 9 22 2ZM11 13l6-6',
    vote:'m12 3 8 8h-5v10H9V11H4l8-8Z',
    more:'M4 12h.01M12 12h.01M20 12h.01',
    chart:'M4 20V10M10 20V4M16 20v-7M22 20V7',
    bookmark:'M6 3h12v19l-6-4-6 4V3Z',
    upload:'M12 16V3m-5 5 5-5 5 5M4 14v7h16v-7',
    award:'M12 2 5 6v8l7 4 7-4V6l-7-4Zm-4 15-1 5 5-2 5 2-1-5',
    thumb:'M8 10 11 3c2-1 3 0 2.5 2.5L13 8h6c1 0 2 1 1.7 2l-2 9c-.2 1-1 2-2 2H8V10ZM3 10h5v11H3Z'
  };
  // These outlines are independent of the editor's Lucide icon set. Only the
  // measured YouTube/Instagram originals above have source-vector parity.
  function lineIcon(name,size=18,stroke=1.6){
    const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');
    for(const [key,value] of Object.entries({viewBox:'0 0 24 24',width:size,height:size,fill:'none',stroke:'currentColor','stroke-width':stroke,'stroke-linecap':'round','stroke-linejoin':'round'}))svg.setAttribute(key,value);
    svg.style.cssText='display:block;flex:none';svg.style.width=size+'px';svg.style.height=size+'px';svg.style.strokeWidth=stroke;
    const path=document.createElementNS(svg.namespaceURI,'path');path.setAttribute('d',outlines[name]);svg.append(path);return svg;
  }
  function sourceIcon(c,name,size=18,stroke=1.6){
    const aliases={reddit:{vote:'upvote',more:'overflow-horizontal'},xiaohongshu:{comment:'reply'}};
    const key=aliases[c.state.platform]?.[name]||name;
    const original=window.CommentSourceIcons?.[c.state.platform]?.[key];
    if(!original)return lineIcon(name,size*c.scale,stroke);
    const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');
    svg.setAttribute('viewBox',original.viewBox);svg.setAttribute('aria-hidden','true');
    svg.setAttribute('width',size*c.scale);svg.setAttribute('height',size*c.scale);
    svg.dataset.sourceIcon=c.state.platform+':'+key;
    Object.assign(svg.style,{display:'block',flex:'none',width:c.px(size),height:c.px(size),fill:'currentColor',stroke:'none'});
    // Markup contains only inspected vector geometry from the bundled static catalog.
    svg.innerHTML=original.markup;return svg;
  }
  function setup(c,{avatar=40,gap=12,body=14,line=20,font='Arial,"Microsoft YaHei",sans-serif'}={}){
    const {root,row,pic,content,px}=c;root.style.fontFamily=font;
    root.style.fontSize=px(body);root.style.lineHeight=px(line);row.style.gap=px(gap);
    pic.style.width=pic.style.height=px(avatar);pic.style.marginTop='0';
    content.style.overflowWrap='anywhere';return c;
  }
  function body(c,style={}){const n=e('div',{whiteSpace:'pre-wrap',overflowWrap:'anywhere',...style});n.append(c.text);return n;}
  function actions(c,style={}){return e('div',{display:'flex',alignItems:'center',flexWrap:'wrap',columnGap:c.px(16),rowGap:c.px(8),color:c.muted,fontSize:c.px(12),lineHeight:c.px(18),...style});}
  function action(c,name,label,{size=18,stroke=1.6,...style}={}){
    const n=e('span',{display:'inline-flex',alignItems:'center',gap:c.px(4),minWidth:'0',maxWidth:'100%',...style});
    if(name)n.append(sourceIcon(c,name,size,stroke));
    if(label!==undefined&&label!=='')n.append(e('span',{minWidth:'0',overflowWrap:'anywhere'},String(label)));return n;
  }
  function expansion(c,label){
    const row=actions(c,{marginTop:c.px(16),columnGap:c.px(12)});
    row.append(e('span',{width:c.px(24),borderTop:'1px solid currentColor',flex:'none'}),e('span',{fontWeight:'600'},label));return row;
  }
  function replyElement(c,item,index,instagram=false){
    const {px,scale,dark}=c,wrap=e('div',{position:'relative',display:'grid',gridTemplateColumns:px(instagram?20:24)+' minmax(0,1fr)',columnGap:px(8),alignItems:'start',marginTop:px(10),fontSize:px(instagram?13:12),lineHeight:px(instagram?18:17)});wrap.dataset.replyComment='';
    const avatar=e('span',{width:px(instagram?20:24),height:px(instagram?20:24),borderRadius:'50%',background:item.avatarColor||'#689f38',color:'#fff',display:'grid',placeItems:'center',fontSize:px(10),fontWeight:'600',flex:'none'},item.avatarText||'N');avatar.dataset.replyAvatar='';wrap.append(avatar);
    const body=e('div',{minWidth:'0',overflowWrap:'anywhere'}),header=actions(c,{display:'inline-flex',columnGap:px(4),fontSize:px(12),lineHeight:px(17),verticalAlign:'baseline'});header.append(e('span',{fontWeight:'500',color:dark?'#eee':'#0f0f0f'},item.handle||'@notoow'),e('span',{color:dark?'#aaa':'#606060'},item.date||'방금 전'));body.append(header);
    const text=e('span',{display:'block',whiteSpace:'pre-wrap',overflowWrap:'anywhere',marginTop:px(2)},item.text||'');if(c.interactive){text.contentEditable='true';text.dataset.replyItem=String(index);text.dataset.replyField='text';text.setAttribute('role','textbox');text.setAttribute('aria-label',`답글 ${index+1} 내용 직접 편집`);text.spellcheck=false;}body.append(text);
    if(!instagram&&item.translation)body.append(e('div',{marginTop:px(4),color:dark?'#aaa':'#606060'},item.translation));
    const footer=actions(c,{marginTop:px(7),gap:px(instagram?12:10),fontSize:px(12),lineHeight:px(16),color:dark?'#aaa':'#606060'});
    if(!instagram){footer.append(action(c,'up',item.likes||0,{size:16,gap:px(5),color:dark?'#eee':'#0f0f0f'}),action(c,'down',undefined,{size:16,color:dark?'#eee':'#0f0f0f'}));}else if(item.likes>0)footer.append(e('span',{},`좋아요 ${item.likes.toLocaleString()}개`));
    footer.append(e('span',{fontWeight:'500'},'답글'));body.append(footer);wrap.append(body);return wrap;
  }
  const compactCount=(value,locale)=>new Intl.NumberFormat(locale,{notation:'compact',maximumFractionDigits:1}).format(value);
  const renderers={
    tiktok(c){
      setup(c,{avatar:32,gap:8,body:15,line:22.5});const {state,content,px,dark}=c;
      c.muted=dark?'#ffffff99':'#0000007a';c.root.style.color=dark?'#f6f6f6':'#161823';
      const header=actions(c,{minHeight:px(21),fontSize:px(13),lineHeight:px(16.9),color:c.root.style.color,flexWrap:'nowrap',columnGap:px(8)});
      header.append(e('span',{fontWeight:'500',flex:'1',minWidth:'0',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'},c.handle),sourceIcon(c,'more',14));
      content.append(header,body(c,{marginTop:px(6),fontWeight:'478'}));
      const meta=e('div',{display:'grid',gridTemplateColumns:'minmax(0,1fr) auto',alignItems:'center',columnGap:px(12),fontSize:px(13),lineHeight:px(21),marginTop:px(6),color:c.muted});meta.dataset.nativeActions='tiktok';
      const details=actions(c,{columnGap:px(12),fontSize:px(13),lineHeight:px(21),minWidth:'0'});
      details.append(e('span',{color:dark?'#ffffff66':'#00000057'},state.date),e('span',{fontSize:px(14),fontWeight:'500'},'답글'));
      meta.append(details,action(c,'heart',state.likes,{size:20,gap:'0',fontSize:px(14)}));content.append(meta);
      if(state.width-2*state.horizontal<128*c.scale){meta.style.gridTemplateColumns='minmax(0,1fr)';meta.style.rowGap=px(8);meta.lastElementChild.style.justifySelf='end';}
      if(state.replies>0)content.append(expansion(c,`답글 ${state.replies}개 보기 ⌄`));
    },
    douyin(c){
      setup(c,{avatar:40,gap:8,body:16,line:24});const {state,root,content,px,dark}=c;
      root.style.backgroundColor=dark?`rgba(38,38,38,${state.opacity/100})`:`rgba(255,255,255,${state.opacity/100})`;
      root.style.color=dark?'#ffffffe6':'#161823';c.muted=dark?'#ffffff99':'#16182380';
      content.append(e('div',{fontSize:px(14),lineHeight:px(22),color:c.muted},c.handle),body(c,{marginTop:px(4)}));
      content.append(e('div',{fontSize:px(14),lineHeight:px(22),marginTop:px(4),color:c.muted},state.date+(state.region?' · '+state.region:'')));
      const bar=actions(c,{marginTop:px(12),fontSize:px(14),columnGap:px(8)});bar.dataset.nativeActions='douyin';
      const compact=state.width-2*state.horizontal<240*c.scale;
      bar.append(action(c,'comment',compact?undefined:'回复',{size:16}),action(c,'share',compact?undefined:'分享',{size:16}),action(c,'heart',compact?compactCount(state.likes,'zh-CN'):state.likes,{size:16}),action(c,'broken',undefined,{size:16}));content.append(bar);
      if(state.replies>0)content.append(expansion(c,`展开 ${state.replies} 条回复 ⌄`));
    },
    reddit(c){
      setup(c,{avatar:32,gap:8,body:14,line:20,font:'-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Arial,sans-serif'});
      const {state,content,root,pic,px,dark}=c;c.muted=dark?'#b8c5c9':'#576f76';root.style.color=dark?'#eef1f3':'#0f1a1c';
      const header=actions(c,{minHeight:px(36),gap:px(4),color:root.style.color,fontSize:px(12),lineHeight:px(16),flexWrap:'nowrap'});
      header.append(e('span',{fontWeight:'700',minWidth:'0',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'},c.handle),e('span',{color:c.muted,flex:'none'},'•'),e('span',{color:c.muted,minWidth:'0'},state.date));content.append(header,body(c,{marginTop:px(4),marginBottom:px(4)}));
      const bar=actions(c,{minHeight:px(32),columnGap:'0',fontWeight:'600'});
      bar.dataset.nativeActions='reddit';
      const votes=actions(c,{gap:'0',color:root.style.color,flexWrap:'wrap',maxWidth:'100%',minWidth:'0'});
      for(const name of ['vote','downvote']){const cell=e('span',{width:px(32),maxWidth:'100%',height:px(32),display:'flex',alignItems:'center',justifyContent:'center',flex:'none'});cell.append(sourceIcon(c,name,16));votes.append(cell);if(name==='vote')votes.append(e('span',{minWidth:'0',maxWidth:'100%'},compactCount(state.likes,'ko-KR')));}
      const compact=state.width-2*state.horizontal<340*c.scale;
      bar.append(votes,action(c,'comment',compact?'답글':'답글 달기',{size:16,padding:px(8)+' '+px(compact?0:12)}));
      if(state.width-2*state.horizontal>=400*c.scale)bar.append(action(c,'award','어워드',{size:16,padding:px(8)+' '+px(12)}),action(c,'share','공유',{size:16,padding:px(8)+' '+px(12)}));
      bar.append(action(c,'more',undefined,{size:16,padding:px(8)+' '+px(compact?0:8)}));content.append(bar);
      if(state.replies>0){const connector=e('div',{marginTop:px(8),borderLeft:`1px solid ${dark?'#434f53':'#d2dadd'}`,paddingLeft:px(12),fontSize:px(12),lineHeight:px(24),color:c.muted},`${state.replies} more replies`);content.append(connector);}
      pic.style.marginTop=px(4);
    },
    x(c){
      setup(c,{avatar:40,gap:8,body:15,line:20,font:'Arial,"Segoe UI",sans-serif'});const {state,content,row,px,dark}=c;
      c.root.style.color=dark?'#e7e9ea':'#0f1419';c.muted=dark?'#71767b':'#536471';
      const header=actions(c,{fontSize:px(15),lineHeight:px(20),columnGap:px(4),color:c.root.style.color,flexWrap:'nowrap'});
      header.append(e('span',{fontWeight:'700',minWidth:'0',maxWidth:'50%',flexShrink:'0',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'},c.handle),e('span',{minWidth:'0',flex:'1',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap',color:c.muted},'@'+c.handle+' · '+state.date),action(c,'more',undefined,{size:18.75,marginLeft:'auto',color:c.muted,flex:'none'}));
      content.append(header,body(c,{marginTop:px(2)}));
      const tight=state.width-2*state.horizontal<208*c.scale;
      const bar=actions(c,{marginTop:px(12),justifyContent:'space-between',columnGap:px(tight?0:4),maxWidth:px(600),fontSize:px(13),lineHeight:px(20)});
      bar.dataset.nativeActions='x';
      bar.append(action(c,'comment',state.replies?compactCount(state.replies,'en-US'):undefined,{size:18.75,gap:px(tight?2:4)}),action(c,'repeat',undefined,{size:18.75}),action(c,'heart',state.likes?compactCount(state.likes,'en-US'):undefined,{size:18.75,gap:px(tight?2:4)}),action(c,'chart',undefined,{size:18.75}),action(c,'bookmark',undefined,{size:18.75}),action(c,'upload',undefined,{size:18.75}));content.append(bar);
    },
    facebook(c){
      setup(c,{avatar:32,gap:6,body:15,line:20,font:'"Segoe UI Historic","Segoe UI",Helvetica,Arial,sans-serif'});const {state,content,pic,px,dark}=c;
      c.root.style.color=dark?'#e4e6eb':'#050505';c.muted=dark?'#b0b3b8':'#65676b';pic.style.marginTop=px(2);
      const bubble=e('div',{position:'relative',display:'inline-block',maxWidth:'100%',boxSizing:'border-box',padding:px(8)+' '+px(12),borderRadius:px(18),background:dark?'#3a3b3c':'#f0f2f5'});
      bubble.append(e('div',{fontSize:px(12),fontWeight:'600',lineHeight:px(16)},c.handle),body(c));content.append(bubble);
      if(state.likes>0){const reactions=actions(c,{position:'absolute',right:'0',bottom:px(-8),columnGap:px(4),maxWidth:'100%',fontSize:px(12),background:dark?'#242526':'#fff',borderRadius:px(12),padding:px(2)+' '+px(5),boxShadow:'0 1px 3px #0002'});const badge=e('img',{width:px(18),height:px(18),flex:'none'});badge.src=new URL('assets/facebook-like.svg',document.baseURI).href;badge.alt='';reactions.append(e('span',{minWidth:'0',overflowWrap:'anywhere'},String(state.likes)),badge);bubble.append(reactions);}
      const footer=actions(c,{paddingLeft:px(12),marginTop:px(9),columnGap:px(16),lineHeight:px(16)});
      footer.append(e('span',{},state.date),e('span',{fontWeight:'700'},'좋아요'),e('span',{fontWeight:'700'},'답글 달기'));content.append(footer);
      if(state.replies>0)content.append(e('div',{fontSize:px(13),fontWeight:'600',lineHeight:px(20),marginTop:px(8),paddingLeft:px(12),color:c.muted},`↳ 답글 ${state.replies}개 보기`));
    },
    threads(c){
      setup(c,{avatar:36,gap:12,body:15,line:22,font:'Arial,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif'});const {state,root,row,content,px,dark}=c;c.muted=dark?'#777':'#999';root.style.backgroundColor=dark?`rgba(16,16,16,${state.opacity/100})`:`rgba(255,255,255,${state.opacity/100})`;
      const header=actions(c,{fontSize:px(15),lineHeight:px(21),columnGap:px(6),color:c.ink,flexWrap:'nowrap'});
      header.append(e('span',{fontWeight:'600',minWidth:'0',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'},c.handle),e('span',{color:c.muted,minWidth:'0'},state.date),action(c,'more',undefined,{size:22,marginLeft:'auto',color:c.muted,flex:'none'}));content.append(header,body(c,{marginTop:px(3)}));
      const bar=actions(c,{marginTop:px(12),columnGap:px(state.width-2*state.horizontal<280*c.scale?8:24),color:c.ink,fontSize:px(12),lineHeight:px(18)});
      bar.dataset.nativeActions='threads';
      bar.append(action(c,'heart',state.likes||undefined,{size:22}),action(c,'comment',state.replies||undefined,{size:22}),action(c,'repeat',undefined,{size:22}),action(c,'send',undefined,{size:22}));content.append(bar);
      if(state.replies>0){row.style.position='relative';const line=e('span',{position:'absolute',left:px(17),top:px(46),bottom:'0',borderLeft:px(2)+' solid '+(dark?'#333':'#e5e5e5'),pointerEvents:'none'});line.dataset.threadConnector='';row.append(line);}
    },
    tieba(c){
      setup(c,{avatar:90,gap:20,body:14,line:24,font:'Arial,"Microsoft YaHei",SimSun,sans-serif'});const {state,root,row,pic,content,px,dark}=c;
      root.style.backgroundColor=dark?`rgba(30,31,34,${state.opacity/100})`:`rgba(255,255,255,${state.opacity/100})`;
      const blue=dark?'#97bdfc':'#2d64b3';root.style.color=dark?'#ddd':'#333';
      if(state.tiebaMode==='nested'){
        root.dataset.tiebaMode='nested';root.style.backgroundColor=dark?`rgba(38,39,43,${state.opacity/100})`:`rgba(247,248,250,${state.opacity/100})`;
        row.style.gap=px(10);pic.style.width=pic.style.height=px(32);pic.style.borderRadius='0';pic.style.padding=px(2);pic.style.border='1px solid '+(dark?'#555':'#ccc');pic.style.background='#fff';
        content.append(e('div',{lineHeight:px(20)}));content.firstElementChild.append(e('span',{color:blue},c.handle+': '),c.text);
        const meta=actions(c,{marginTop:px(8),justifyContent:'flex-end',fontSize:px(12),lineHeight:px(18),columnGap:px(12),color:dark?'#aaa':'#999'});meta.append(e('span',{},state.date),e('span',{color:blue},'回复'));content.append(meta);
        row.style.borderBottom='1px dotted '+(dark?'#555':'#d7d7d7');row.style.paddingBottom=px(12);return;
      }
      root.dataset.tiebaMode='floor';
      const author=e('div',{flex:'0 0 auto',width:`min(${px(130)}, 28%)`,alignSelf:'stretch',display:'flex',alignItems:'center',flexDirection:'column',gap:px(16),padding:px(12)+' '+px(15),background:dark?'#26272b':'#fbfbfd'});
      pic.style.maxWidth='100%';pic.style.height='auto';pic.style.aspectRatio='1';pic.style.borderRadius='0';pic.style.padding=px(3);pic.style.border=`1px solid ${dark?'#555':'#ccc'}`;author.append(pic,e('div',{fontSize:px(12),lineHeight:px(18),color:dark?'#97bdfc':'#2d64b3',overflowWrap:'anywhere',textAlign:'center'},c.handle));
      row.replaceChildren(author,content);row.style.gap=px(20);content.style.padding=px(14)+' 0';content.style.display='flex';content.style.flexDirection='column';content.style.minHeight=px(224);content.append(body(c));
      const footer=actions(c,{marginTop:'auto',paddingTop:px(24),justifyContent:'flex-end',gap:px(8),color:dark?'#aaa':'#999'});footer.dataset.nativeActions='tieba';
      footer.append(action(c,'report','举报',{size:12,gap:px(2),color:dark?'#97bdfc':'#7a9bd2'}),e('span',{},String(state.postNumber)+'楼'),e('span',{},state.date),e('span',{color:blue},'回复'));content.append(footer);
    },
    bilibili(c){
      setup(c,{avatar:48,gap:12,body:16,line:26,font:'-apple-system,BlinkMacSystemFont,"Helvetica Neue",Helvetica,Arial,"PingFang SC","Microsoft YaHei",sans-serif'});const {state,content,px,dark}=c;c.muted='#9499a0';c.root.style.color=dark?'#e3e5e7':'#18191c';
      content.append(e('div',{fontSize:px(13),fontWeight:'500',lineHeight:px(30),color:dark?'#c9ccd0':'#61666d'},c.handle),body(c,{marginTop:px(4)}));
      const bar=actions(c,{marginTop:px(3),columnGap:px(20),fontSize:px(13),lineHeight:px(19.5),minHeight:px(25.5)});
      bar.append(e('span',{},state.date),action(c,'thumb',state.likes,{size:16}),sourceIcon(c,'down',16),e('span',{},'回复'),action(c,'more',undefined,{size:16,marginLeft:'auto',marginRight:px(20)}));content.append(bar);
      if(state.replies>0)content.append(e('div',{fontSize:px(13),lineHeight:px(24),marginTop:px(8),color:c.muted},`共${state.replies}条回复，点击查看`));
      content.style.paddingBottom=px(14);content.style.borderBottom=`1px solid ${dark?'#333':'#e3e5e7'}`;
    },
    weibo(c){
      setup(c,{avatar:30,gap:10,body:13,line:22,font:'system-ui,-apple-system,"Segoe UI",Roboto,"Microsoft YaHei",sans-serif'});const {state,content,px,dark}=c;c.muted=dark?'#797979':'#939393';c.root.style.color=dark?'#bfbfbf':'#333';content.style.marginTop=px(-2);
      const paragraph=e('div',{lineHeight:px(22)});paragraph.append(e('span',{color:dark?'#d36747':'#eb7350'},c.handle+':'),c.text);content.append(paragraph);
      const footer=actions(c,{marginTop:px(1),columnGap:'0',fontSize:px(13),lineHeight:px(22)});footer.append(e('span',{marginRight:'auto'},state.date));
      const tools=actions(c,{columnGap:'0',rowGap:px(4),marginLeft:'auto'});
      for(const [name,size] of [['report',13],['translate',16],['repeat',12],['comment',13]])tools.append(action(c,name,undefined,{size,width:px(32),height:px(22),justifyContent:'center'}));
      tools.append(action(c,'thumb',state.likes,{size:13,paddingLeft:px(8)}));footer.append(tools);content.append(footer);
      if(state.replies>0)content.append(e('div',{marginTop:px(8),padding:px(8)+' '+px(12),background:dark?'#262626':'#f2f2f5',fontSize:px(12),lineHeight:px(20),color:dark?'#bbb':'#808080'},`共${state.replies}条回复，点击查看`));
      content.style.paddingBottom=px(12);content.style.borderBottom=`1px solid ${dark?'#333':'#f2f2f5'}`;
    },
    xiaohongshu(c){
      setup(c,{avatar:40,gap:12,body:14,line:19.6,font:'system-ui,-apple-system,BlinkMacSystemFont,"Microsoft YaHei",Arial,sans-serif'});const {state,content,px,dark}=c;c.muted=dark?'#ffffff60':'#33333399';c.root.style.color=dark?'#ffffffcc':'#333';
      const header=actions(c,{minHeight:px(20),fontSize:px(14),lineHeight:px(18),color:c.muted,flexWrap:'nowrap',columnGap:px(8)});
      header.append(e('span',{minWidth:'0',flex:'1',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'},c.handle),sourceIcon(c,'more',16));
      content.append(header,body(c,{marginTop:px(4)}),e('div',{fontSize:px(12),lineHeight:px(16),marginTop:px(8),color:c.muted},state.date));
      const bar=actions(c,{marginTop:px(8),columnGap:px(12),lineHeight:px(16)});bar.append(action(c,'heart',state.likes||'赞',{size:16}),action(c,'comment',state.replies||'回复',{size:16}));content.append(bar);
      if(state.replies>0)content.append(e('div',{fontSize:px(12),lineHeight:px(16),marginTop:px(12),color:dark?'#8fb5eb':'#13386c'},`展开 ${state.replies} 条回复 ⌄`));
    },
    futaba(c){
      const {state,root,row,px,dark}=c;root.style.fontFamily='"Noto Sans KR","MS PGothic",sans-serif';root.style.fontSize=px(16);root.style.lineHeight='normal';
      root.style.backgroundColor=dark?`rgba(31,28,25,${state.opacity/100})`:`rgba(255,255,238,${state.opacity/100})`;
      row.replaceChildren();row.style.gap=px(2);row.style.alignItems='stretch';row.append(e('div',{color:dark?'#ad9a8c':'#c5b1a5',fontSize:px(16),flex:'none',padding:px(1)},'…'));
      const box=e('div',{background:dark?'#3e3028':'#f0e0d6',padding:px(1)+' '+px(8)+' '+px(1)+' '+px(1),flex:'1',minWidth:'0',maxWidth:'100%'});
      const header=e('div',{fontSize:px(16),lineHeight:px(24),color:dark?'#eee':'#800000',overflowWrap:'anywhere'});
      header.append(e('span',{fontSize:px(13)},String(state.replyIndex||1)),e('span',{margin:'0 '+px(5),color:dark?'#e9a6a6':'#cc1105',fontWeight:'700'},'無題'),document.createTextNode('Name'),e('span',{margin:'0 '+px(5),fontWeight:'700',color:dark?'#6fcf82':'#117743'},c.handle+' '),e('span',{margin:'0 '+px(5)},state.date),e('span',{margin:'0 '+px(5)},'No.'+state.postNumber),e('span',{marginLeft:px(8),color:dark?'#9cb9ff':'#0000ee'},state.likes>0?`そうだねx${state.likes}`:'+'));
      const inset=Math.min(40*c.scale,Math.max(0,(state.width-2*state.horizontal-40*c.scale)/4));
      box.append(header,body(c,{margin:px(16)+' '+inset+'px',color:dark?'#eee':'#800000',lineHeight:px(24)}));row.append(box);
    },
    fivech(c){
      const {state,root,row,px,dark}=c;root.style.fontFamily='Arial,"Hiragino Kaku Gothic ProN",sans-serif';root.style.color=dark?'#ddd':'#000';row.replaceChildren();row.style.display='block';row.style.padding=px(8)+' '+px(3.2);
      const blue=dark?'#a9bcff':'#0e0e6e';const header=actions(c,{color:blue,fontSize:px(12),lineHeight:px(19.2),columnGap:px(12)});
      header.append(e('span',{},String(state.postNumber)),e('span',{fontWeight:'700',color:dark?'#cfa4ff':'#a64de0'},c.handle),e('span',{marginLeft:'auto',color:dark?'#cfa4ff':'#9b4dca'},'垢版 | 大砲'));row.append(header);
      const meta=actions(c,{fontSize:px(10.8),lineHeight:px(19.2),color:blue,paddingLeft:px(10.8),columnGap:px(12)});meta.append(e('span',{minWidth:'0'},state.date),e('span',{fontSize:px(12),marginLeft:'auto',minWidth:'0'},'ID:'+(state.boardId||'aB3cD4eF0')));row.append(meta);
      row.append(body(c,{fontSize:px(16),fontWeight:'300',lineHeight:px(25.6)}));
    }
  };
  function build({state,avatar,interactive=false}) {
    if(!renderers[state.platform] && !['youtube','instagram','dc'].includes(state.platform))throw new Error('지원하지 않는 플랫폼입니다.');
    const yt=state.platform==='youtube',dark=state.theme==='dark',scale=state.font/14;
    const px=v=>v*scale+'px',ink=dark?'#f1f1f1':'#0f0f0f',muted=dark?'#aaa':'#606060';
    const root=e('div',{position:'absolute',left:'-100000px',top:'0',width:state.width+'px',padding:`${state.padding}px ${state.horizontal}px`,boxSizing:'border-box',overflowWrap:'anywhere',backgroundColor:dark?`rgba(15,15,15,${state.opacity/100})`:`rgba(255,255,255,${state.opacity/100})`,color:ink,fontFamily:yt?'Roboto, Arial, sans-serif':'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',fontSize:px(14),lineHeight:px(yt?20:18)});
    const row=e('div',{display:'flex',alignItems:'flex-start',gap:px(yt?16:18)});row.className='cs-comment-row';
    const pic=e('img',{width:px(yt?36:32),height:px(yt?36:32),borderRadius:'50%',flex:'none',marginTop:yt?'0':px(7)});pic.className='cs-native-avatar';pic.src=avatar.toDataURL();row.append(pic);
    const content=e('div',{minWidth:'0',flex:'1'});row.append(content);root.append(row);
    const handle=state.handle.replace(/^@+/,'')||'viewer';
    const text=e('span',{whiteSpace:'pre-wrap',overflowWrap:'anywhere'},state.text||'댓글 내용을 입력하세요.');
    if(interactive&&['youtube','instagram'].includes(state.platform)){text.contentEditable='true';text.dataset.commentText='';text.setAttribute('role','textbox');text.setAttribute('aria-label','댓글 내용 직접 편집');text.spellcheck=false;}
    const context={state,avatar,root,row,pic,content,handle,text,px,scale,dark,ink,muted,interactive};
    if(renderers[state.platform]){
      renderers[state.platform](context);
    }else if(state.platform==='dc'){
      root.style.fontFamily='-apple-system,BlinkMacSystemFont,"Apple SD Gothic Neo","Malgun Gothic",Arial,Gulim,sans-serif';
      row.replaceChildren();row.style.cssText=`display:grid;grid-template-columns:minmax(0,${152*scale}px) minmax(0,1fr) auto;column-gap:${33*scale}px;align-items:start;padding:${9*scale}px ${3*scale}px ${7*scale}px;border-top:1px solid ${dark?'#444':'#eee'};border-bottom:1px solid ${dark?'#444':'#eee'}`;
      row.append(e('div',{fontSize:px(13),lineHeight:px(13),paddingTop:px(3),color:dark?'#aaa':'#777',overflowWrap:'anywhere'},handle));
      text.style.fontSize=px(13);text.style.lineHeight=px(20);row.append(text);
      row.append(e('div',{fontSize:px(12),color:dark?'#aaa':'#999',whiteSpace:'nowrap',paddingTop:px(1)},state.date));
      if(state.width-2*state.horizontal<520*scale){row.style.gridTemplateColumns='minmax(0,1fr) minmax(0,1fr)';row.style.columnGap=px(12);row.style.rowGap=px(6);text.style.gridColumn='1 / -1';text.style.gridRow='2';row.lastElementChild.style.gridColumn='2';row.lastElementChild.style.gridRow='1';row.lastElementChild.style.whiteSpace='normal';row.lastElementChild.style.overflowWrap='anywhere';row.lastElementChild.style.textAlign='right';}
    }else if(yt){
      row.style.position='relative';
      const menu=e('button',{position:'absolute',right:'0',top:px(-12),width:px(40),height:px(40),minHeight:'0',minWidth:'0',padding:px(8),display:'flex',alignItems:'center',justifyContent:'center',border:'0',borderRadius:'50%',background:'transparent',color:ink});menu.type='button';menu.dataset.commentMenu='';menu.setAttribute('aria-label','댓글 작업 메뉴');menu.setAttribute('aria-haspopup','menu');menu.setAttribute('aria-expanded','false');menu.append(icon('kebab',24*scale));row.append(menu);
      const header=e('div',{display:'flex',alignItems:'baseline',gap:px(4),minHeight:px(18),flexWrap:'wrap',overflowWrap:'anywhere',paddingRight:px(32)});
      header.append(e('span',{fontSize:px(12),fontWeight:'500',lineHeight:px(18)},'@'+handle),e('span',{fontSize:px(12),lineHeight:px(18),color:muted},state.date));content.append(header);
      const body=e('div',{marginTop:px(4),lineHeight:px(20)});body.append(text);content.append(body);
      body.dataset.ytBody='';const toggle=e('button',{display:'block',marginTop:px(4),minHeight:'0',padding:'0',border:'0',borderRadius:'0',background:'transparent',fontFamily:'inherit',fontSize:px(14),lineHeight:px(20),fontWeight:'500',textAlign:'left',whiteSpace:'normal',maxWidth:'100%',overflowWrap:'anywhere',color:muted},state.youtubeMode==='expanded'?'간략히':'자세히 알아보기');toggle.type='button';toggle.dataset.ytToggle='';toggle.setAttribute('aria-expanded',String(state.youtubeMode==='expanded'));content.append(toggle);
      const actions=e('div',{display:'flex',alignItems:'center',minHeight:px(36),flexWrap:'wrap',rowGap:px(8),marginTop:px(4),fontSize:px(12),lineHeight:px(18)});
      actions.append(icon('up',18*scale),e('span',{marginLeft:px(6),marginRight:px(8)},String(state.likes)));
      const dislike=e('span',{width:px(32),display:'flex',justifyContent:'center'});dislike.append(icon('down',18*scale));actions.append(dislike,e('span',{padding:'0 '+px(12),fontWeight:'500'},'답글'));content.append(actions);
      if(state.replyItems?.length){const thread=e('div',{position:'relative',marginTop:px(4),paddingLeft:px(0)});thread.dataset.replyThread='';state.replyItems.forEach((item,i)=>thread.append(replyElement(context,item,i)));content.append(thread);const collapse=e('div',{display:'flex',alignItems:'center',gap:px(8),marginTop:px(12),fontSize:px(12),fontWeight:'500',color:dark?'#eee':'#0f0f0f'});collapse.append(e('span',{},'답글 숨기기'),icon('chevron',18*scale));collapse.lastElementChild.style.transform='rotate(180deg)';content.append(collapse);}
    }else{
      row.style.gap=px(12);pic.style.marginTop='0';
      const header=e('div',{display:'flex',alignItems:'baseline',flexWrap:'wrap',gap:px(4),fontSize:px(14),lineHeight:px(18)});header.append(e('span',{fontWeight:'600'},handle),e('span',{color:dark?'#a8a8a8':'#737373'},state.date));content.append(header);
      const body=e('div',{lineHeight:px(18)});body.append(text);content.append(body);
      const actions=e('div',{display:'flex',alignItems:'center',flexWrap:'wrap',gap:px(12),marginTop:px(8),fontSize:px(12),lineHeight:px(16),color:dark?'#a8a8a8':'#737373'});
      if(state.likes>0)actions.append(e('span',{fontWeight:'600'},`좋아요 ${state.likes.toLocaleString()}개`));actions.append(e('span',{fontWeight:'600'},'답글 달기'));content.append(actions);
      if(state.replyItems?.length){const thread=e('div',{position:'relative',marginTop:px(4)});thread.dataset.replyThread='';state.replyItems.forEach((item,i)=>thread.append(replyElement(context,item,i,true)));content.append(thread);}
      const heart=e('div',{flex:'none',paddingTop:px(16)});heart.append(icon('heart',12*scale));row.append(heart);
    }
    const available=state.width-2*state.horizontal;
    if(available<128*scale&&row.contains(pic)){pic.style.maxWidth=available*.22+'px';pic.style.height='auto';pic.style.aspectRatio='1';row.style.gap=Math.min(parseFloat(row.style.gap)||0,available*.08)+'px';}
    root.setAttribute('aria-hidden','true');root.dataset.nativeTemplate=state.platform;
    row.style.flexShrink='0';
    return {root,muted};
  }
  function measure(root,state){
    root.querySelector('[data-thread-connectors]')?.remove();
    const thread=root.querySelector('[data-reply-thread]'),parentAvatar=root.querySelector('.cs-native-avatar');
    const childAvatars=thread?[...thread.querySelectorAll('[data-reply-avatar]')]:[];
    if(thread&&parentAvatar&&childAvatars.length){
      const rr=root.getBoundingClientRect(),pr=parentAvatar.getBoundingClientRect(),svg=document.createElementNS('http://www.w3.org/2000/svg','svg');
      const width=root.clientWidth,height=Math.max(root.scrollHeight,root.clientHeight);svg.dataset.threadConnectors='';svg.setAttribute('viewBox',`0 0 ${width} ${height}`);svg.setAttribute('width',width);svg.setAttribute('height',height);svg.style.cssText='position:absolute;inset:0;pointer-events:none;overflow:visible;z-index:0';
      const sx=pr.left-rr.left+pr.width/2,sy=pr.bottom-rr.top;
      for(const child of childAvatars){const r=child.getBoundingClientRect(),tx=r.left-rr.left+r.width/2,ty=r.top-rr.top+r.height/2,path=document.createElementNS(svg.namespaceURI,'path');path.setAttribute('d',`M ${sx} ${sy} V ${ty} C ${sx} ${ty+2}, ${tx-14} ${ty}, ${tx} ${ty}`);path.setAttribute('fill','none');path.setAttribute('stroke',state.theme==='dark'?'#3f3f3f':'#e0e0e0');path.setAttribute('stroke-width','1');svg.append(path);}
      root.prepend(svg);const row=root.querySelector('.cs-comment-row');if(row)row.style.position='relative';
    }
    const body=root.querySelector('[data-yt-body]');
    if(body){const limit=80*state.font/14;const long=body.scrollHeight>limit+.5;const toggle=root.querySelector('[data-yt-toggle]');toggle.hidden=!long;toggle.style.display=long?'block':'none';if(long&&state.youtubeMode!=='expanded'){Object.assign(body.style,{display:'-webkit-box',webkitBoxOrient:'vertical',webkitLineClamp:'4',overflow:'hidden',maxHeight:limit+'px'});}}
    // Read layout pixels: a live preview's ancestor is scaled to fit the screen.
    // getBoundingClientRect() would report screen pixels and shrink saved heights.
    const minH=Math.ceil(parseFloat(getComputedStyle(root).height));
    root.style.minHeight=Math.max(minH,state.height||0)+'px';
    root.style.display='flex';root.style.flexDirection='column';root.style.justifyContent='center';
    const h=Math.ceil(parseFloat(getComputedStyle(root).height));
    if(h*2>32760||state.width*h*4>32000000){
      const error=new Error('이미지가 너무 큽니다. 너비·높이 또는 글자 크기를 줄여 주세요.');error.userMessage=error.message;throw error;
    }
    return {w:state.width,h,minH,overflow:root.scrollWidth>root.clientWidth};
  }
  function preview({state,avatar,host,interactive=false}){
    const {root}=build({state,avatar,interactive});root.style.position='relative';root.style.left='0';root.style.top='0';
    if(interactive)root.removeAttribute('aria-hidden');host.dataset.interactive=String(interactive);host.replaceChildren(root);
    return measure(root,state);
  }
  async function render({state,avatar,target,guides}){
    const {root,muted}=build({state,avatar});document.body.append(root);
    try {
      await document.fonts.ready;
      const size=measure(root,state),{w,h}=size;
      const fontEmbedCSS=await embeddedFonts(root);
      const rendered=await htmlToImage.toCanvas(root,{fontEmbedCSS,pixelRatio:2,width:w,height:h,cacheBust:false,style:{position:'static',left:'auto',top:'auto'},skipAutoScale:true});
      target.width=rendered.width;target.height=rendered.height;
      const g=target.getContext('2d');g.drawImage(rendered,0,0);
      if(guides){g.strokeStyle=muted;g.setLineDash([6,5]);for(const y of [state.padding*2,(h-state.padding)*2]){g.beginPath();g.moveTo(0,y);g.lineTo(target.width,y);g.stroke();}}
      return size;
    } finally {root.remove();}
  }
  window.CommentNative={render,preview};
})();
