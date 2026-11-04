'use strict';

(() => {
  const clamp=(value,min,max)=>Math.round(Math.max(min,Math.min(max,value)));
  function dimensions(start,edge,dx,dy,scale=1){
    const width=/[ew]/.test(edge)?clamp(start.width+(edge.includes('w')?-dx:dx)/scale,240,1600):start.width;
    return {
      width,
      height:/[ns]/.test(edge)?clamp(start.h+(edge.includes('n')?-dy:dy)/scale,64,Math.min(8000,Math.floor(8000000/width))):Math.min(start.height,Math.floor(8000000/width))
    };
  }
  function mount({frame,area,canvas,host,ghost,tooltip,getState,onStart,onChange,onEnd,onError=()=>{}}){
    let metrics={w:getState().width,h:200},scale=1,drag=null,raf=0,lastMove=null;
    function fit(){scale=Math.max(.05,Math.min(1,(area.clientWidth-16)/Math.max(960,metrics.w)));layout();}
    function layout(){
      frame.style.width=metrics.w*scale+'px';frame.style.height=metrics.h*scale+'px';
      host.style.width=metrics.w+'px';host.style.transform=`scale(${scale})`;
      tooltip.textContent=`${metrics.w} × ${metrics.h} px`;
    }
    function update(size){
      metrics=size;frame.style.transform='';frame.dataset.resizing='false';
      host.hidden=true;host.replaceChildren();canvas.hidden=false;fit();
    }
    function apply(){
      raf=0;if(!drag||!lastMove)return;
      const next=dimensions(drag,drag.edge,lastMove.x-drag.x,lastMove.y-drag.y,drag.scale);
      try{metrics=onChange(next);}catch(error){finish(true);onError(error);return;}layout();
      // Keep the opposite edges under their original screen positions while dragging.
      frame.style.transform='';const rect=frame.getBoundingClientRect();
      const x=drag.edge.includes('w')?drag.rect.right-metrics.w*scale:drag.rect.left;
      const y=drag.edge.includes('n')?drag.rect.bottom-metrics.h*scale:drag.rect.top;
      frame.style.transform=`translate(${x-rect.left}px,${y-rect.top}px)`;
    }
    function finish(cancel=false){
      if(!drag)return;
      if(raf){cancelAnimationFrame(raf);raf=0;}
      if(!cancel)apply();
      if(!drag)return;
      const previous=drag;drag=null;lastMove=null;
      if(previous.handle.hasPointerCapture(previous.pointerId))previous.handle.releasePointerCapture(previous.pointerId);
      if(cancel)metrics=onChange({width:previous.width,height:previous.height});
      ghost.hidden=true;frame.dataset.resizing='false';frame.style.transform='';fit();onEnd();
    }
    frame.addEventListener('pointerdown',event=>{
      const handle=event.target.closest('[data-resize]');
      if(!handle||event.button!==0||drag||!canvas.width||canvas.getAttribute('aria-busy')==='true')return;
      event.preventDefault();handle.focus({preventScroll:true});
      const state=getState(),rect=frame.getBoundingClientRect();
      drag={width:state.width,height:state.height,h:metrics.h,edge:handle.dataset.resize,x:event.clientX,y:event.clientY,scale,rect,handle,pointerId:event.pointerId};
      onStart();metrics=onChange({width:state.width,height:state.height});layout();
      frame.dataset.resizing='true';ghost.hidden=false;
      Object.assign(ghost.style,{left:rect.left+'px',top:rect.top+'px',width:rect.width+'px',height:rect.height+'px'});
      handle.setPointerCapture(event.pointerId);
    });
    frame.addEventListener('pointermove',event=>{
      if(!drag||event.pointerId!==drag.pointerId)return;
      lastMove={x:event.clientX,y:event.clientY};if(!raf)raf=requestAnimationFrame(apply);
    });
    frame.addEventListener('pointerup',event=>{
      if(!drag||event.pointerId!==drag.pointerId)return;
      lastMove={x:event.clientX,y:event.clientY};finish();
    });
    frame.addEventListener('pointercancel',()=>finish(true));
    frame.addEventListener('lostpointercapture',()=>finish());
    frame.addEventListener('keydown',event=>{
      if(event.key==='Escape'&&drag){event.preventDefault();finish(true);return;}
      const handle=event.target.closest('[data-resize]');if(!handle||drag)return;
      const step=event.shiftKey?10:1,edge=handle.dataset.resize;
      let dx=0,dy=0;
      if(/[ew]/.test(edge)&&['ArrowLeft','ArrowRight'].includes(event.key))dx=event.key==='ArrowRight'?step:-step;
      if(/[ns]/.test(edge)&&['ArrowUp','ArrowDown'].includes(event.key))dy=event.key==='ArrowDown'?step:-step;
      if(!dx&&!dy)return;event.preventDefault();
      const previous={width:getState().width,height:getState().height};
      onStart();
      try{metrics=onChange(dimensions({...getState(),h:metrics.h},edge,dx,dy));layout();onEnd();}
      catch(error){metrics=onChange(previous);onEnd();onError(error);}
    });
    window.addEventListener('blur',()=>finish(true));
    let available=0;
    new ResizeObserver(()=>{if(area.clientWidth!==available){available=area.clientWidth;if(!drag)fit();}}).observe(area);
    return {update,fit};
  }
  globalThis.CommentResize={mount,dimensions};
})();
