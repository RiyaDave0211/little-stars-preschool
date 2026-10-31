/* =====================================================================
   File: js/00-platform.js
   Purpose: Lets the website run on any normal web server (GitHub Pages,
   Netlify, VS Code Live Server...). It provides:
     - a small database that saves in the browser (localStorage)
     - normal file downloads (PDF / PNG / CSV)
   Everything is saved in THIS browser only. For real sharing between
   phone and laptop, replace this file with a Firebase/Supabase version.
   ===================================================================== */
(function(){
  if(window.claude) return;
  var PREFIX='ls_db_', subs={};
  function read(p){try{return JSON.parse(localStorage.getItem(PREFIX+p))}catch(e){return null}}
  function snap(p){var d=read(p);return{exists:d!==null,data:function(){return d}}}
  window.addEventListener('storage',function(e){
    if(e.key&&e.key.indexOf(PREFIX)===0){var p=e.key.slice(PREFIX.length);(subs[p]||[]).forEach(function(cb){cb(snap(p))})}
  });
  var db={doc:function(p){return{
    get:function(){return Promise.resolve(snap(p))},
    set:function(d){try{localStorage.setItem(PREFIX+p,JSON.stringify(d))}catch(e){return Promise.reject(e)}
      (subs[p]||[]).forEach(function(cb){cb(snap(p))});return Promise.resolve()},
    onSnapshot:function(cb){(subs[p]=subs[p]||[]).push(cb);setTimeout(function(){cb(snap(p))},0);
      return function(){subs[p]=(subs[p]||[]).filter(function(x){return x!==cb})}}
  }}};
  var downloads={save:function(o){
    var a=document.createElement('a');a.href=URL.createObjectURL(o.data);a.download=o.filename;
    document.body.appendChild(a);a.click();a.remove();setTimeout(function(){URL.revokeObjectURL(a.href)},2000);
    return Promise.resolve()}};
  window.claude={use:function(name){return Promise.resolve(name==='db'?db:name==='downloads'?downloads:null)}};
})();
