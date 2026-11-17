'use strict';
(() => {
 const languages={en:'English',ko:'한국어',ja:'日本語',zh_CN:'简体中文',zh_TW:'繁體中文',es:'Español',fr:'Français',de:'Deutsch',it:'Italiano',pt_BR:'Português (Brasil)',ru:'Русский',uk:'Українська',pl:'Polski',tr:'Türkçe',vi:'Tiếng Việt',th:'ไทย',id:'Bahasa Indonesia',hi:'हिन्दी',ta:'தமிழ்',ar:'العربية',he:'עברית',fa:'فارسی'};
 const normalize=value=>{const code=String(value||'').replace('-','_');if(languages[code])return code;if(/^zh/i.test(code))return /TW|HK|Hant/i.test(code)?'zh_TW':'zh_CN';if(/^pt/i.test(code))return 'pt_BR';return languages[code.split('_')[0]]?code.split('_')[0]:null;};
 let saved;try{saved=localStorage.getItem('notoow.comment-language');}catch{}
 const locale=normalize(new URLSearchParams(location.search).get('lang'))||normalize(saved)||(navigator.languages||[navigator.language]).map(normalize).find(Boolean)||'en';
 const tag=locale.replace('_','-'),catalog=globalThis.CommentMessages[locale],english=globalThis.CommentMessages.en;
 function t(key,args=[]){
  const units={'{0}시간 전':'hour','{0}일 전':'day','{0}개월 전':'month','{0}년 전':'year'};
  if(units[key]&&Number.isFinite(Number(args[0])))return new Intl.RelativeTimeFormat(tag,{numeric:'always'}).format(-Number(args[0]),units[key]);
  return (catalog[key]??english[key]??key).replace(/\{(\d+)\}/g,(_,i)=>String(args[i]??''));
 }
 function translateDOM(root){
  const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);const nodes=[];while(walker.nextNode())nodes.push(walker.currentNode);
  for(const node of nodes){if(node.parentElement?.closest('script,style,[translate="no"]'))continue;const key=node.nodeValue.trim();if(Object.hasOwn(catalog,key))node.nodeValue=node.nodeValue.replace(key,t(key));}
  for(const el of root.querySelectorAll('*'))for(const attr of ['aria-label','title','placeholder','alt','content','value','aria-valuetext']){const key=el.getAttribute(attr);if(key&&Object.hasOwn(catalog,key)){el.setAttribute(attr,t(key));if(attr==='value'&&'value' in el)el.value=t(key);}}
 }
 globalThis.CommentI18n={t,locale,tag,languages,translateDOM};
 function start(){
  translateDOM(document);document.documentElement.lang=tag;document.documentElement.dir=['ar','he','fa'].includes(locale)?'rtl':'ltr';
  const selector=document.querySelector('[data-language]');if(selector){for(const [code,label] of Object.entries(languages)){const option=document.createElement('option');option.value=code;option.textContent=label;selector.append(option);}selector.value=locale;selector.addEventListener('change',()=>{try{localStorage.setItem('notoow.comment-language',selector.value);}catch{}const url=new URL(location.href);url.searchParams.set('lang',selector.value);location.assign(url.href);});}
  const prefix=locale==='en'?'':locale+'/';const home=document.querySelector('.cs-wordmark'),software=document.querySelector('.cs-software');if(home)home.href='https://notoow.com/'+prefix;if(software)software.href='https://notoow.com/'+prefix+'software/';
  document.documentElement.dataset.i18nReady='true';
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();
