'use strict';
(() => {
  function create(profile, image) {
      const tile = document.createElement('canvas');tile.width=tile.height=100;
      const g=tile.getContext('2d');
      if(image && ['original','mosaic','blur'].includes(profile.avatarMode)) {
        const side=Math.min(image.naturalWidth,image.naturalHeight);
        g.drawImage(image,(image.naturalWidth-side)/2,(image.naturalHeight-side)/2,side,side,0,0,100,100);
      } else {
        const seed=profile.avatarSeed;
        g.fillStyle=profile.avatarColor;g.fillRect(0,0,100,100);
        const rgb=[1,3,5].map(i=>parseInt(profile.avatarColor.slice(i,i+2),16));
        const light=rgb[0]*.299+rgb[1]*.587+rgb[2]*.114>170;
        g.fillStyle=light?'rgba(0,0,0,.35)':'rgba(255,255,255,.6)';
        if(profile.avatarMode==='initials'){
          const label=profile.avatarText||'KS';g.fillStyle=light?'#222':'#fff';g.font=`400 ${Array.from(label).length===1?56:Array.from(label).length===2?44:34}px Arial,"Malgun Gothic",sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillText(label,50,54,90);
        }else if(profile.avatarMode==='default'||profile.avatarMode==='original') {
          g.beginPath();g.arc(50,37,17,0,Math.PI*2);g.fill();g.beginPath();g.ellipse(50,91,35,30,0,0,Math.PI*2);g.fill();
        } else {
          for(let y=0;y<5;y++)for(let x=0;x<3;x++)if((Math.imul(seed+73, (y*3+x+1)*31)>>>((x+y)%12))&1){g.fillRect(x*20,y*20,20,20);g.fillRect((4-x)*20,y*20,20,20);}
        }
      }
      if(profile.avatarMode==='mosaic'){
        const pixel=document.createElement('canvas');pixel.width=pixel.height=6;pixel.getContext('2d').drawImage(tile,0,0,6,6);g.imageSmoothingEnabled=false;g.drawImage(pixel,0,0,100,100);
      }
      if(profile.avatarMode==='blur') {
        const blurred=document.createElement('canvas');blurred.width=blurred.height=100;const b=blurred.getContext('2d');b.filter='blur(7px)';b.drawImage(tile,-10,-10,120,120);return blurred;
      }
      return tile;
    }
  globalThis.CommentAvatar={create,photos:new Map()};
})();
