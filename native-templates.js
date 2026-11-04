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
  async function render({state,avatar,target,guides}) {
    if(!['youtube','instagram','dc'].includes(state.platform))return null;
    const yt=state.platform==='youtube',dark=state.theme==='dark',scale=state.font/14;
    const px=v=>v*scale+'px',ink=dark?'#f1f1f1':'#0f0f0f',muted=dark?'#aaa':'#606060';
    const root=e('div',{position:'absolute',left:'-100000px',top:'0',width:state.width+'px',padding:`${state.padding}px ${state.horizontal}px`,boxSizing:'border-box',backgroundColor:dark?`rgba(15,15,15,${state.opacity/100})`:`rgba(255,255,255,${state.opacity/100})`,color:ink,fontFamily:yt?'Roboto, Arial, sans-serif':'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',fontSize:px(14),lineHeight:px(yt?20:18)});
    const row=e('div',{display:'flex',alignItems:'flex-start',gap:px(yt?16:18)});
    const pic=e('img',{width:px(yt?36:32),height:px(yt?36:32),borderRadius:'50%',flex:'none',marginTop:yt?'0':px(7)});pic.src=avatar.toDataURL();row.append(pic);
    const content=e('div',{minWidth:'0',flex:'1'});row.append(content);root.append(row);
    const handle=state.handle.replace(/^@+/,'')||'viewer';
    const text=e('span',{whiteSpace:'pre-wrap',overflowWrap:'break-word'},state.text||'댓글 내용을 입력하세요.');
    if(state.platform==='dc'){
      root.style.fontFamily='-apple-system,BlinkMacSystemFont,"Apple SD Gothic Neo","Malgun Gothic",Arial,Gulim,sans-serif';
      row.replaceChildren();row.style.cssText=`display:grid;grid-template-columns:${152*scale}px minmax(0,1fr) auto;column-gap:${33*scale}px;align-items:start;padding:${9*scale}px ${3*scale}px ${7*scale}px;border-top:1px solid ${dark?'#444':'#eee'};border-bottom:1px solid ${dark?'#444':'#eee'}`;
      row.append(e('div',{fontSize:px(12),lineHeight:px(13),paddingTop:px(3),color:dark?'#aaa':'#777',overflowWrap:'anywhere'},handle));
      text.style.fontSize=px(13);text.style.lineHeight=px(20);row.append(text);
      row.append(e('div',{fontSize:px(12),color:dark?'#aaa':'#999',whiteSpace:'nowrap',paddingTop:px(1)},state.date));
    }else if(yt){
      const header=e('div',{display:'flex',alignItems:'baseline',gap:px(4),minHeight:px(18)});
      header.append(e('span',{fontSize:px(12),fontWeight:'500',lineHeight:px(18)},'@'+handle),e('span',{fontSize:px(12),lineHeight:px(18),color:muted},state.date));content.append(header);
      const body=e('div',{marginTop:px(4),lineHeight:px(20)});body.append(text);content.append(body);
      const actions=e('div',{display:'flex',alignItems:'center',height:px(36),marginTop:px(4),fontSize:px(12),lineHeight:px(18)});
      actions.append(icon('up',18*scale),e('span',{marginLeft:px(6),marginRight:px(8)},String(state.likes)));
      const dislike=e('span',{width:px(32),display:'flex',justifyContent:'center'});dislike.append(icon('down',18*scale));actions.append(dislike,e('span',{padding:'0 '+px(12),fontWeight:'500'},'답글'));content.append(actions);
      if(state.replies>0){const reply=e('div',{display:'flex',alignItems:'center',height:px(36),gap:px(8),fontWeight:'500',fontSize:px(14),marginTop:px(8)});reply.append(e('span',{},`답글 ${state.replies}개`),icon('chevron',24*scale));content.append(reply);}
    }else{
      content.style.paddingTop=px(7);
      const body=e('div',{lineHeight:px(18)});body.append(e('span',{fontSize:px(13),fontWeight:'600',marginRight:px(4)},handle),text);content.append(body);
      const actions=e('div',{display:'flex',alignItems:'center',flexWrap:'wrap',gap:px(12),marginTop:px(8),fontSize:px(12),lineHeight:px(16),color:dark?'#a8a8a8':'#737373'});
      actions.append(e('span',{},state.date),e('span',{fontWeight:'600'},`좋아요 ${state.likes.toLocaleString()}개`),e('span',{fontWeight:'600'},'답글 달기'));content.append(actions);
      if(state.replies>0){const reply=e('div',{display:'flex',alignItems:'center',gap:px(16),marginTop:px(16),fontSize:px(12),fontWeight:'600',color:dark?'#a8a8a8':'#737373'});reply.append(e('span',{width:px(24),borderTop:'1px solid currentColor'}),e('span',{},`답글 보기(${state.replies}개)`));content.append(reply);}
      const heart=e('div',{flex:'none',paddingTop:px(16)});heart.append(icon('heart',12*scale));row.append(heart);
    }
    root.setAttribute("aria-hidden","true");document.body.append(root);
    try{await document.fonts.ready;const h=Math.ceil(root.getBoundingClientRect().height);const rendered=await htmlToImage.toCanvas(root,{pixelRatio:2,width:state.width,height:h,cacheBust:false,style:{position:'static',left:'auto',top:'auto'},skipAutoScale:true});target.width=rendered.width;target.height=rendered.height;const g=target.getContext('2d');g.drawImage(rendered,0,0);if(guides){g.strokeStyle=muted;g.setLineDash([6,5]);for(const y of [state.padding*2,(h-state.padding)*2]){g.beginPath();g.moveTo(0,y);g.lineTo(target.width,y);g.stroke();}}return {w:state.width,h};}finally{root.remove();}
  }
  window.CommentNative={render};
})();
