'use strict';
// Measurements and original vector outlines: docs/reference-audit.md.
(() => {
  const paths = {
    heart:'M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z',
    up:'m7.748.854.779.13a3 3 0 012.44 3.588L10.5 6.75h3.046a2.748 2.748 0 012.204 4.387l.015.066A2.862 2.862 0 0115 13.874v.033c0 .227-.037.452-.109.668l-.08.21a2.815 2.815 0 01-2.59 1.715H9.516l-.294-.005a9.002 9.002 0 01-3.918-1.041l-.256-.142-.204-.116a1.502 1.502 0 00-.55-.186L4.102 15H2.625l-.116-.006a1.126 1.126 0 01-1.003-1.005l-.006-.114v-4.5c0-.62.504-1.124 1.125-1.124h1.342a.75.75 0 00.66-.395l.048-.107 2.24-6.403a.75.75 0 01.833-.491ZM6.09 8.243A2.25 2.25 0 013.967 9.75H3v3.749h1.1a3 3 0 011.49.395l.202.116a7.503 7.503 0 003.724.99h2.703c.566 0 1.07-.363 1.248-.9a.61.61 0 00.032-.193v-.655l.44-.439a1.36 1.36 0 00.363-1.272l-.014-.065-.157-.675.413-.556a1.248 1.248 0 00-.999-1.995H10.5a1.501 1.501 0 01-1.467-1.815L9.5 4.257a1.5 1.5 0 00-1.22-1.794l-.157-.026L6.09 8.243Z',
    down:'m8.482 1.5.294.005a9.01 9.01 0 013.918 1.04l.257.143.203.116c.17.097.357.16.55.185l.194.012h1.477l.115.006c.53.054.95.475 1.004 1.005l.006.114v4.499c0 .621-.504 1.125-1.125 1.125h-1.343a.75.75 0 00-.66.395l-.048.107-2.24 6.402a.75.75 0 01-.832.491l-.78-.13a3 3 0 01-2.439-3.587L7.5 11.25H4.454a2.749 2.749 0 01-2.683-2.151 2.762 2.762 0 01.479-2.237l-.016-.065A2.862 2.862 0 013 4.125v-.032c0-.227.037-.453.108-.668l.08-.211A2.816 2.816 0 015.78 1.5h2.703ZM5.78 3c-.566 0-1.069.362-1.248.9a.613.613 0 00-.031.193v.654l-.44.44c-.333.332-.47.813-.364 1.271l.015.065.157.675-.413.557a1.248 1.248 0 00.999 1.995H7.5a1.501 1.501 0 011.467 1.815L8.5 13.742a1.5 1.5 0 001.22 1.794l.157.027 2.031-5.806a2.25 2.25 0 012.124-1.507H15V4.501h-1.102a3.001 3.001 0 01-1.489-.396l-.202-.116A7.504 7.504 0 008.482 3H5.78Z',
    chevron:'M18.707 8.793a1 1 0 00-1.414 0L12 14.086 6.707 8.793a1 1 0 10-1.414 1.414L12 16.914l6.707-6.707a1 1 0 000-1.414Z'
  };
  const e=(tag,style,text)=>{const n=document.createElement(tag);Object.assign(n.style,style);if(text!==undefined)n.textContent=text;return n;};
  function icon(name,size){const n=document.createElementNS('http://www.w3.org/2000/svg','svg');n.setAttribute('viewBox',name==='up'||name==='down'?'0 0 18 18':'0 0 24 24');n.setAttribute('width',size);n.setAttribute('height',size);n.style.cssText='display:block;flex:none;fill:currentColor';const p=document.createElementNS(n.namespaceURI,'path');p.setAttribute('d',paths[name]);n.append(p);return n;}
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
    svg.style.cssText='display:block;flex:none';
    const path=document.createElementNS(svg.namespaceURI,'path');path.setAttribute('d',outlines[name]);svg.append(path);return svg;
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
    const n=e('span',{display:'inline-flex',alignItems:'center',gap:c.px(4),...style});
    if(name)n.append(lineIcon(name,size*c.scale,stroke));
    if(label!==undefined&&label!=='')n.append(e('span',{},String(label)));return n;
  }
  function expansion(c,label){
    const row=actions(c,{marginTop:c.px(16),columnGap:c.px(12)});
    row.append(e('span',{width:c.px(24),borderTop:'1px solid currentColor',flex:'none'}),e('span',{fontWeight:'600'},label));return row;
  }
  const renderers={
    tiktok(c){
      setup(c,{avatar:40,gap:12,body:14,line:21});const {state,content,row,px,dark}=c;
      c.muted=dark?'#ffffff80':'#16182380';c.root.style.color=dark?'#f5f5f5':'#161823';
      content.append(e('div',{fontSize:px(14),fontWeight:'700',lineHeight:px(21)},c.handle),body(c));
      const meta=actions(c,{fontSize:px(14),lineHeight:px(21),columnGap:px(24)});
      meta.append(e('span',{},state.date),e('span',{},'Reply'));content.append(meta);
      if(state.replies>0)content.append(expansion(c,`View ${state.replies} replies ⌄`));
      const like=e('div',{display:'flex',flexDirection:'column',alignItems:'center',gap:px(4),flex:'none',color:c.muted,fontSize:px(12),lineHeight:px(16),paddingTop:px(24)});
      like.append(lineIcon('heart',20*c.scale,1.8),e('span',{},String(state.likes)));row.append(like);
    },
    douyin(c){
      setup(c,{avatar:40,gap:8,body:16,line:24});const {state,root,content,px,dark}=c;
      root.style.backgroundColor=dark?`rgba(38,38,38,${state.opacity/100})`:`rgba(255,255,255,${state.opacity/100})`;
      root.style.color=dark?'#ffffffe6':'#161823';c.muted=dark?'#ffffff80':'#16182380';
      content.append(e('div',{fontSize:px(14),lineHeight:px(22),color:c.muted},c.handle),body(c,{marginTop:px(4)}));
      content.append(e('div',{fontSize:px(14),lineHeight:px(22),marginTop:px(4),color:c.muted},state.date));
      const bar=actions(c,{marginTop:px(12),fontSize:px(14),columnGap:px(16)});
      bar.append(action(c,'comment','回复',{size:16}),action(c,'share','分享',{size:16}),action(c,'heart',state.likes,{size:16}),action(c,'broken',undefined,{size:16}));content.append(bar);
      if(state.replies>0)content.append(expansion(c,`展开 ${state.replies} 条回复 ⌄`));
    },
    reddit(c){
      setup(c,{avatar:32,gap:8,body:14,line:20,font:'-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Arial,sans-serif'});
      const {state,content,root,pic,px,dark}=c;c.muted=dark?'#b8c5c9':'#576f76';root.style.color=dark?'#eef1f3':'#0f1a1c';
      const header=actions(c,{minHeight:px(32),gap:px(8),color:root.style.color,fontSize:px(12),lineHeight:px(16)});
      header.append(e('span',{fontWeight:'700'},c.handle),e('span',{color:c.muted},'• '+state.date));content.append(header,body(c,{marginTop:px(8)}));
      const bar=actions(c,{marginTop:px(8),minHeight:px(32),columnGap:px(16),fontWeight:'600'});
      const votes=actions(c,{gap:px(8),color:root.style.color});const down=lineIcon('vote',16*c.scale);down.style.transform='rotate(180deg)';
      votes.append(lineIcon('vote',16*c.scale),e('span',{},String(state.likes)),down);
      bar.append(votes,action(c,'comment','Reply',{size:16}),action(c,'award','Award',{size:16}),action(c,'share','Share',{size:16}),action(c,'more',undefined,{size:16}));content.append(bar);
      if(state.replies>0){const connector=e('div',{marginTop:px(8),borderLeft:`1px solid ${dark?'#434f53':'#d2dadd'}`,paddingLeft:px(12),fontSize:px(12),lineHeight:px(24),color:c.muted},`${state.replies} more replies`);content.append(connector);}
      pic.style.marginTop='0';
    },
    x(c){
      setup(c,{avatar:40,gap:12,body:15,line:20,font:'Arial,"Segoe UI",sans-serif'});const {state,content,row,px,dark}=c;
      c.root.style.color=dark?'#e7e9ea':'#0f1419';c.muted=dark?'#71767b':'#536471';
      const header=actions(c,{fontSize:px(15),lineHeight:px(20),columnGap:px(4),color:c.root.style.color,flexWrap:'nowrap'});
      header.append(e('span',{fontWeight:'700',minWidth:'0',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'},c.handle),e('span',{minWidth:'0',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap',color:c.muted},'@'+c.handle+' · '+state.date),action(c,'more',undefined,{size:18,marginLeft:'auto',color:c.muted}));
      content.append(header,body(c,{marginTop:px(2)}));
      const bar=actions(c,{marginTop:px(12),justifyContent:'space-between',columnGap:px(12),maxWidth:px(600)});
      bar.append(action(c,'comment',state.replies),action(c,'repeat',undefined),action(c,'heart',state.likes),action(c,'chart',undefined),action(c,'bookmark',undefined),action(c,'upload',undefined));content.append(bar);
    },
    facebook(c){
      setup(c,{avatar:32,gap:6,body:15,line:20,font:'"Segoe UI Historic","Segoe UI",Helvetica,Arial,sans-serif'});const {state,content,pic,px,dark}=c;
      c.root.style.color=dark?'#e4e6eb':'#050505';c.muted=dark?'#b0b3b8':'#65676b';pic.style.marginTop=px(2);
      const bubble=e('div',{position:'relative',display:'inline-block',maxWidth:'100%',boxSizing:'border-box',padding:px(8)+' '+px(12),borderRadius:px(18),background:dark?'#3a3b3c':'#f0f2f5'});
      bubble.append(e('div',{fontSize:px(12),fontWeight:'600',lineHeight:px(16)},c.handle),body(c));content.append(bubble);
      if(state.likes>0){const reactions=actions(c,{position:'absolute',right:px(-8),bottom:px(-8),columnGap:px(4),fontSize:px(12),background:dark?'#242526':'#fff',borderRadius:px(12),padding:px(2)+' '+px(5),boxShadow:'0 1px 3px #0002'});const badge=action(c,'thumb',undefined,{size:11,color:'white',background:'#0866ff',borderRadius:'50%',padding:px(3)});reactions.append(badge,e('span',{},String(state.likes)));bubble.append(reactions);}
      const footer=actions(c,{paddingLeft:px(12),marginTop:px(9),columnGap:px(16),lineHeight:px(16)});
      footer.append(e('span',{},state.date),e('span',{fontWeight:'700'},'좋아요'),e('span',{fontWeight:'700'},'답글 달기'));content.append(footer);
      if(state.replies>0)content.append(e('div',{fontSize:px(13),fontWeight:'600',lineHeight:px(20),marginTop:px(8),paddingLeft:px(12),color:c.muted},`↳ 답글 ${state.replies}개 보기`));
    },
    threads(c){
      setup(c,{avatar:36,gap:12,body:15,line:21,font:'-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif'});const {state,content,px,dark}=c;c.muted=dark?'#777':'#999';
      const header=actions(c,{fontSize:px(15),lineHeight:px(21),columnGap:px(8),color:c.ink});
      header.append(e('span',{fontWeight:'600'},c.handle),e('span',{color:c.muted},state.date),action(c,'more',undefined,{size:20,marginLeft:'auto',color:c.muted}));content.append(header,body(c,{marginTop:px(3)}));
      const bar=actions(c,{marginTop:px(12),columnGap:px(18),color:c.ink});
      bar.append(action(c,'heart',state.likes||undefined,{size:22}),action(c,'comment',state.replies||undefined,{size:22}),action(c,'repeat',undefined,{size:22}),action(c,'send',undefined,{size:22}));content.append(bar);
    },
    tieba(c){
      setup(c,{avatar:80,gap:20,body:14,line:24,font:'Arial,"Microsoft YaHei",SimSun,sans-serif'});const {state,root,row,pic,content,px,dark}=c;
      root.style.backgroundColor=dark?`rgba(30,31,34,${state.opacity/100})`:`rgba(255,255,255,${state.opacity/100})`;
      const author=e('div',{flex:'0 0 auto',width:`min(${px(110)}, 28%)`,alignSelf:'stretch',display:'flex',alignItems:'center',flexDirection:'column',gap:px(12),padding:px(14)+' '+px(10),background:dark?'#26272b':'#fbfbfd',borderRight:`1px solid ${dark?'#3a3a3a':'#e5e5e5'}`});
      pic.style.maxWidth='100%';pic.style.height='auto';pic.style.aspectRatio='1';pic.style.borderRadius='0';pic.style.padding=px(3);pic.style.border=`1px solid ${dark?'#555':'#ccc'}`;author.append(pic,e('div',{fontSize:px(12),lineHeight:px(18),color:dark?'#97bdfc':'#2d64b3',overflowWrap:'anywhere',textAlign:'center'},c.handle));
      row.replaceChildren(author,content);row.style.gap=px(20);content.style.padding=px(14)+' 0';content.style.display='flex';content.style.flexDirection='column';content.style.minHeight=px(180);content.append(body(c));
      const footer=actions(c,{marginTop:'auto',paddingTop:px(24),justifyContent:'flex-end',gap:px(12),color:dark?'#aaa':'#999'});
      footer.append(e('span',{},String(state.postNumber)+'楼'),e('span',{},state.date),e('span',{color:dark?'#97bdfc':'#2d64b3'},`回复 (${state.replies})`));content.append(footer);
    },
    bilibili(c){
      setup(c,{avatar:40,gap:12,body:15,line:24,font:'-apple-system,BlinkMacSystemFont,"Microsoft YaHei",Arial,sans-serif'});const {state,content,px,dark}=c;c.muted=dark?'#9499a0':'#9499a0';c.root.style.color=dark?'#e3e5e7':'#18191c';
      content.append(e('div',{fontSize:px(13),fontWeight:'500',lineHeight:px(20),color:dark?'#c9ccd0':'#61666d'},c.handle),body(c,{marginTop:px(4)}));
      const bar=actions(c,{marginTop:px(4),columnGap:px(20)});const down=lineIcon('thumb',14*c.scale);down.style.transform='rotate(180deg)';
      bar.append(e('span',{},state.date),action(c,'thumb',state.likes,{size:14}),down,e('span',{},'回复'),action(c,'more',undefined,{size:16,marginLeft:'auto'}));content.append(bar);
      if(state.replies>0)content.append(e('div',{fontSize:px(13),lineHeight:px(24),marginTop:px(8),color:c.muted},`共${state.replies}条回复，点击查看`));
      content.style.paddingBottom=px(14);content.style.borderBottom=`1px solid ${dark?'#333':'#e3e5e7'}`;
    },
    weibo(c){
      setup(c,{avatar:30,gap:10,body:14,line:23,font:'Arial,"Microsoft YaHei",sans-serif'});const {state,content,px,dark}=c;c.muted=dark?'#888':'#939393';
      const paragraph=e('div',{lineHeight:px(23)});paragraph.append(e('span',{color:dark?'#e99b54':'#eb7350'},c.handle+'：'),c.text);content.append(paragraph);
      const footer=actions(c,{marginTop:px(8),columnGap:px(8)});footer.append(e('span',{marginRight:'auto'},state.date),e('span',{},'举报'),e('span',{color:dark?'#444':'#d9d9d9'},'|'),action(c,'comment',state.replies||'回复',{size:14}),e('span',{color:dark?'#444':'#d9d9d9'},'|'),action(c,'thumb',state.likes,{size:14}));content.append(footer);
      if(state.replies>0)content.append(e('div',{marginTop:px(8),padding:px(8)+' '+px(12),background:dark?'#262626':'#f2f2f5',fontSize:px(12),lineHeight:px(20),color:dark?'#bbb':'#808080'},`共${state.replies}条回复，点击查看`));
      content.style.paddingBottom=px(12);content.style.borderBottom=`1px solid ${dark?'#333':'#f2f2f5'}`;
    },
    xiaohongshu(c){
      setup(c,{avatar:40,gap:12,body:14,line:22,font:'-apple-system,BlinkMacSystemFont,"Microsoft YaHei",Arial,sans-serif'});const {state,content,px,dark}=c;c.muted=dark?'#ffffff60':'#33333399';c.root.style.color=dark?'#ffffffcc':'#333';
      content.append(e('div',{fontSize:px(12),lineHeight:px(16),color:c.muted},c.handle),body(c,{marginTop:px(4)}),e('div',{fontSize:px(12),lineHeight:px(16),marginTop:px(8),color:c.muted},state.date));
      const bar=actions(c,{marginTop:px(8),columnGap:px(24)});bar.append(action(c,'heart',state.likes||'赞',{size:16}),action(c,'comment',state.replies||'回复',{size:16}));content.append(bar);
      if(state.replies>0)content.append(e('div',{fontSize:px(12),lineHeight:px(16),marginTop:px(12),color:dark?'#8fb5eb':'#13386c'},`展开 ${state.replies} 条回复 ⌄`));
    },
    futaba(c){
      const {state,root,row,px,dark}=c;root.style.fontFamily='"MS PGothic","ＭＳ Ｐゴシック",sans-serif';root.style.fontSize=px(16);root.style.lineHeight='normal';
      root.style.backgroundColor=dark?`rgba(31,28,25,${state.opacity/100})`:`rgba(255,255,238,${state.opacity/100})`;
      row.replaceChildren();row.style.gap=px(4);row.style.alignItems='stretch';row.append(e('div',{color:dark?'#ad9a8c':'#c5b1a5',fontSize:px(16)},'＞'));
      const box=e('div',{background:dark?'#3e3028':'#f0e0d6',padding:px(3)+' '+px(6),flex:'1',minWidth:'0',maxWidth:'100%'});
      const header=actions(c,{fontSize:px(16),lineHeight:px(22),columnGap:px(5),color:dark?'#eee':'#800000'});
      header.append(e('span',{fontWeight:'700',color:dark?'#6fcf82':'#117743'},c.handle),e('span',{},state.date),e('span',{},'No.'+state.postNumber),e('span',{fontSize:px(12),color:dark?'#9cb9ff':'#0000ee'},'del'),e('span',{fontSize:px(12),color:dark?'#9cb9ff':'#0000ee'},`そうだねx${state.likes}`));
      box.append(header,body(c,{margin:px(16)+' '+px(24),color:dark?'#eee':'#800000',lineHeight:px(23)}));row.append(box);
    },
    fivech(c){
      const {state,root,row,px,dark}=c;root.style.fontFamily='Arial,"MS PGothic",sans-serif';root.style.color=dark?'#ddd':'#000';row.replaceChildren();row.style.display='block';
      const blue=dark?'#a9bcff':'#0000cc';const header=actions(c,{color:blue,fontSize:px(16),lineHeight:px(24),columnGap:px(12)});
      header.append(e('span',{},'▾ '+String(state.postNumber).padStart(4,'0')),e('span',{fontWeight:'700',color:dark?'#cfa4ff':'#a64de0'},c.handle));row.append(header);
      row.append(e('div',{fontSize:px(16),lineHeight:px(24),color:blue,paddingLeft:px(16),overflowWrap:'anywhere'},state.date));
      row.append(body(c,{fontFamily:'"MS PGothic","ＭＳ Ｐゴシック",monospace',fontSize:px(14),lineHeight:px(21),marginTop:px(4)}));
    }
  };
  async function render({state,avatar,target,guides}) {
    if(!renderers[state.platform] && !['youtube','instagram','dc'].includes(state.platform))throw new Error('지원하지 않는 플랫폼입니다.');
    const yt=state.platform==='youtube',dark=state.theme==='dark',scale=state.font/14;
    const px=v=>v*scale+'px',ink=dark?'#f1f1f1':'#0f0f0f',muted=dark?'#aaa':'#606060';
    const root=e('div',{position:'absolute',left:'-100000px',top:'0',width:state.width+'px',padding:`${state.padding}px ${state.horizontal}px`,boxSizing:'border-box',overflowWrap:'anywhere',backgroundColor:dark?`rgba(15,15,15,${state.opacity/100})`:`rgba(255,255,255,${state.opacity/100})`,color:ink,fontFamily:yt?'Roboto, Arial, sans-serif':'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',fontSize:px(14),lineHeight:px(yt?20:18)});
    const row=e('div',{display:'flex',alignItems:'flex-start',gap:px(yt?16:18)});
    const pic=e('img',{width:px(yt?36:32),height:px(yt?36:32),borderRadius:'50%',flex:'none',marginTop:yt?'0':px(7)});pic.src=avatar.toDataURL();row.append(pic);
    const content=e('div',{minWidth:'0',flex:'1'});row.append(content);root.append(row);
    const handle=state.handle.replace(/^@+/,'')||'viewer';
    const text=e('span',{whiteSpace:'pre-wrap',overflowWrap:'anywhere'},state.text||'댓글 내용을 입력하세요.');
    const context={state,avatar,root,row,pic,content,handle,text,px,scale,dark,ink,muted};
    if(renderers[state.platform]){
      renderers[state.platform](context);
    }else if(state.platform==='dc'){
      root.style.fontFamily='-apple-system,BlinkMacSystemFont,"Apple SD Gothic Neo","Malgun Gothic",Arial,Gulim,sans-serif';
      row.replaceChildren();row.style.cssText=`display:grid;grid-template-columns:minmax(0,${152*scale}px) minmax(0,1fr) auto;column-gap:${33*scale}px;align-items:start;padding:${9*scale}px ${3*scale}px ${7*scale}px;border-top:1px solid ${dark?'#444':'#eee'};border-bottom:1px solid ${dark?'#444':'#eee'}`;
      row.append(e('div',{fontSize:px(12),lineHeight:px(13),paddingTop:px(3),color:dark?'#aaa':'#777',overflowWrap:'anywhere'},handle));
      text.style.fontSize=px(13);text.style.lineHeight=px(20);row.append(text);
      row.append(e('div',{fontSize:px(12),color:dark?'#aaa':'#999',whiteSpace:'nowrap',paddingTop:px(1)},state.date));
      if(state.width-2*state.horizontal<520*scale){row.style.gridTemplateColumns='minmax(0,1fr) auto';row.style.columnGap=px(12);row.style.rowGap=px(6);text.style.gridColumn='1 / -1';text.style.gridRow='2';row.lastElementChild.style.gridColumn='2';row.lastElementChild.style.gridRow='1';}
    }else if(yt){
      const header=e('div',{display:'flex',alignItems:'baseline',gap:px(4),minHeight:px(18),flexWrap:'wrap',overflowWrap:'anywhere'});
      header.append(e('span',{fontSize:px(12),fontWeight:'500',lineHeight:px(18)},'@'+handle),e('span',{fontSize:px(12),lineHeight:px(18),color:muted},state.date));content.append(header);
      const body=e('div',{marginTop:px(4),lineHeight:px(20)});body.append(text);content.append(body);
      const actions=e('div',{display:'flex',alignItems:'center',minHeight:px(36),flexWrap:'wrap',rowGap:px(8),marginTop:px(4),fontSize:px(12),lineHeight:px(18)});
      actions.append(icon('up',18*scale),e('span',{marginLeft:px(6),marginRight:px(8)},String(state.likes)));
      const dislike=e('span',{width:px(32),display:'flex',justifyContent:'center'});dislike.append(icon('down',18*scale));actions.append(dislike,e('span',{padding:'0 '+px(12),fontWeight:'500'},'답글'));content.append(actions);
      if(state.replies>0){const reply=e('div',{display:'flex',alignItems:'center',minHeight:px(36),gap:px(8),fontWeight:'500',fontSize:px(14),marginTop:px(8)});reply.append(e('span',{},`답글 ${state.replies}개`),icon('chevron',24*scale));content.append(reply);}
    }else{
      content.style.paddingTop=px(7);
      const body=e('div',{lineHeight:px(18)});body.append(e('span',{fontSize:px(13),fontWeight:'600',marginRight:px(4)},handle),text);content.append(body);
      const actions=e('div',{display:'flex',alignItems:'center',flexWrap:'wrap',gap:px(12),marginTop:px(8),fontSize:px(12),lineHeight:px(16),color:dark?'#a8a8a8':'#737373'});
      actions.append(e('span',{},state.date),e('span',{fontWeight:'600'},`좋아요 ${state.likes.toLocaleString()}개`),e('span',{fontWeight:'600'},'답글 달기'));content.append(actions);
      if(state.replies>0){const reply=e('div',{display:'flex',alignItems:'center',gap:px(16),marginTop:px(16),fontSize:px(12),fontWeight:'600',color:dark?'#a8a8a8':'#737373'});reply.append(e('span',{width:px(24),borderTop:'1px solid currentColor'}),e('span',{},`답글 보기(${state.replies}개)`));content.append(reply);}
      const heart=e('div',{flex:'none',paddingTop:px(16)});heart.append(icon('heart',12*scale));row.append(heart);
    }
    const available=state.width-2*state.horizontal;
    if(available<128*scale&&row.contains(pic)){pic.style.maxWidth=available*.22+'px';pic.style.height='auto';pic.style.aspectRatio='1';row.style.gap=Math.min(parseFloat(row.style.gap)||0,available*.08)+'px';}
    root.setAttribute('aria-hidden','true');root.dataset.nativeTemplate=state.platform;document.body.append(root);
    try{await document.fonts.ready;const h=Math.ceil(root.getBoundingClientRect().height);if(h*2>32760||state.width*h*4>32000000){const error=new Error('댓글이 너무 길어 이미지를 만들 수 없습니다. 너비를 늘리거나 글자 크기를 줄여 주세요.');error.userMessage=error.message;throw error;}const fontEmbedCSS=await embeddedFonts(root);const rendered=await htmlToImage.toCanvas(root,{fontEmbedCSS,pixelRatio:2,width:state.width,height:h,cacheBust:false,style:{position:'static',left:'auto',top:'auto'},skipAutoScale:true});target.width=rendered.width;target.height=rendered.height;const g=target.getContext('2d');g.drawImage(rendered,0,0);if(guides){g.strokeStyle=muted;g.setLineDash([6,5]);for(const y of [state.padding*2,(h-state.padding)*2]){g.beginPath();g.moveTo(0,y);g.lineTo(target.width,y);g.stroke();}}return {w:state.width,h,overflow:root.scrollWidth>root.clientWidth};}finally{root.remove();}
  }
  window.CommentNative={render};
})();
