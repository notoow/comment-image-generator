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
  function mount({frame,area,canvas,host,ghost,tooltip,getState,onStart,onChange,onRadiusChange=()=>{},onEnd,onError=()=>{}}){
    let metrics={w:getState().width,h:200},scale=1,fitScale=1,zoom=1,drag=null,raf=0,lastMove=null;
    function calculateFit(){
      const widthScale=(area.clientWidth-16)/Math.max(960,metrics.w);
      const heightScale=area.clientHeight>32?(area.clientHeight-16)/Math.max(1,metrics.h):1;
      fitScale=Math.max(.05,Math.min(1,widthScale,heightScale));
    }
    function updateZoomLabel(){
      const output=area.closest('.cs-preview')?.querySelector('[data-zoom-level]');
      if(output)output.textContent=`${Math.round(zoom*100)}%`;
    }
    function fit(){
      zoom=1;calculateFit();scale=fitScale;layout();updateZoomLabel();
    }
    function applyZoom(next){
      zoom=Math.max(.25,Math.min(3,Math.round(next*100)/100));calculateFit();scale=Math.max(.05,Math.min(3,fitScale*zoom));layout();updateZoomLabel();
    }
    function layout(){
      frame.style.width=metrics.w*scale+'px';frame.style.height=metrics.h*scale+'px';
      host.style.width=metrics.w+'px';host.style.transform=`scale(${scale})`;
      tooltip.textContent=`${metrics.w} × ${metrics.h} px`;tooltip.style.left='';tooltip.style.right='0';tooltip.style.top='-36px';tooltip.style.bottom='';
      const radii=getState().cornerRadii||{tl:0,tr:0,br:0,bl:0};
      for(const handle of frame.querySelectorAll('[data-radius-handle]')){
        const corner=handle.dataset.radiusHandle,radius=(Number(radii[corner])||0)*scale;
        handle.style.left=corner.endsWith('l')?radius+'px':'';handle.style.right=corner.endsWith('r')?radius+'px':'';
        handle.style.top=corner.startsWith('t')?'0':'';handle.style.bottom=corner.startsWith('b')?'0':'';
      }
    }
    function update(size,{live=false}={}){
      metrics=size;frame.style.transform='';frame.dataset.resizing='false';
      host.hidden=!live;if(!live)host.replaceChildren();canvas.hidden=live;
      calculateFit();scale=Math.max(.05,Math.min(3,fitScale*zoom));layout();updateZoomLabel();
    }
    function apply(){
      raf=0;if(!drag||!lastMove)return;
      if(drag.kind==='radius'){
        const dx=(lastMove.x-drag.x)*(drag.corner.endsWith('l')?1:-1);
        const dy=(lastMove.y-drag.y)*(drag.corner.startsWith('t')?1:-1);
        const value=clamp(drag.radius+(dx+dy)/Math.SQRT2/drag.scale,0,160);
        try{onRadiusChange({corner:drag.corner,value,live:true});}catch(error){finish(true);onError(error);return;}
        layout();tooltip.textContent=`R: ${value} px`;
        const right=drag.corner.endsWith('r'),bottom=drag.corner.startsWith('b');
        tooltip.style.left=right?'auto':'0';tooltip.style.right=right?'0':'auto';tooltip.style.top=bottom?'auto':'-36px';tooltip.style.bottom=bottom?'-36px':'';
        return;
      }
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
      if(cancel){
        if(previous.kind==='radius')onRadiusChange({corner:previous.corner,value:previous.radius,live:false});
        else metrics=onChange({width:previous.width,height:previous.height});
      }
      ghost.hidden=true;frame.dataset.resizing='false';frame.style.transform='';
      calculateFit();scale=Math.max(.05,Math.min(3,fitScale*zoom));layout();updateZoomLabel();onEnd();
    }
    frame.addEventListener('pointerdown',event=>{
      const radiusHandle=event.target.closest('[data-radius-handle]');
      const handle=radiusHandle||event.target.closest('[data-resize]');
      if(!handle||event.button!==0||drag||!canvas.width||canvas.getAttribute('aria-busy')==='true')return;
      event.preventDefault();handle.focus({preventScroll:true});
      const state=getState(),rect=frame.getBoundingClientRect(),corner=radiusHandle?.dataset.radiusHandle;
      drag=radiusHandle
        ?{kind:'radius',corner,radius:Number(state.cornerRadii?.[corner])||0,width:state.width,height:state.height,h:metrics.h,x:event.clientX,y:event.clientY,scale,rect,handle,pointerId:event.pointerId}
        :{kind:'resize',width:state.width,height:state.height,h:metrics.h,edge:handle.dataset.resize,x:event.clientX,y:event.clientY,scale,rect,handle,pointerId:event.pointerId};
      onStart();
      if(!radiusHandle){metrics=onChange({width:state.width,height:state.height});layout();}
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
      if(drag)return;
      const radiusHandle=event.target.closest('[data-radius-handle]');
      if(radiusHandle&&['ArrowRight','ArrowUp','ArrowLeft','ArrowDown'].includes(event.key)){
        event.preventDefault();const step=event.shiftKey?10:1,corner=radiusHandle.dataset.radiusHandle,current=Number(getState().cornerRadii?.[corner])||0;
        const value=current+(['ArrowRight','ArrowUp'].includes(event.key)?step:-step);onStart();onRadiusChange({corner,value,live:false});onEnd();return;
      }
      const handle=event.target.closest('[data-resize]');if(!handle)return;
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
    let availableWidth=0,availableHeight=0;
    new ResizeObserver(()=>{
      if(area.clientWidth!==availableWidth||area.clientHeight!==availableHeight){
        availableWidth=area.clientWidth;availableHeight=area.clientHeight;
        if(!drag){calculateFit();scale=Math.max(.05,Math.min(3,fitScale*zoom));layout();updateZoomLabel();}
      }
    }).observe(area);
    return {update,fit,zoomIn(){applyZoom(zoom+.1);},zoomOut(){applyZoom(zoom-.1);}};
  }
  globalThis.CommentResize={mount,dimensions};
})();
