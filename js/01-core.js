/* =====================================================================
   File: js/01-core.js
   Purpose: App state, helpers, login/shell and the original student pages
   Note: files load in number order (see index.html). They share one global scope.
   ===================================================================== */
var S={id:"KID001",pw:"1234",name:"Anaya Patel",cls:"Nursery – Rainbow",age:"4 years",roll:"12",teacher:"Ms. Priya",parent:"Mr. Rakesh Patel",phone:"+91 98xxxxxx21",blood:"B+",year:"2026–27",fav:"Drawing & Singing"};
var tab="home",logged=false;
var tabs=[["home","🏠 Home"],["profile","🧒 Profile"],["act","🎨 Activities"],["asg","📒 Assignments"],["att","📅 Attendance"],["res","⭐ Results"],["imp","📈 Growth"],["quiz","🧠 Quiz"],["puz","🧩 Puzzle"],["story","📖 Stories"]];
var $=function(s){return document.querySelector(s)};
function save(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}
function load(k,d){try{var v=localStorage.getItem(k);return v?JSON.parse(v):d}catch(e){return d}}
var asg=[["Colour the rainbow 🌈","Art","Fri, 30 Oct"],["Trace letters A to E ✏️","English","Mon, 2 Nov"],["Count 1 to 20 with toys 🧸","Maths","Tue, 3 Nov"],["Draw your family 👨‍👩‍👧","Art","Thu, 5 Nov"],["Sing the rhyme “Twinkle Twinkle” ⭐","Music","Fri, 6 Nov"]];
var done=load("asg",[]),subm=load("sub",{}),openI=-1;
var asgText=["Take crayons and colour all 7 colours of the rainbow in your drawing book. Write your name below the picture.","Trace the letters A, B, C, D and E on page 12. Say the sound of each letter aloud.","Take 20 small toys. Count them one by one and tell your parents the number.","Draw your mother, father and yourself. Colour the picture nicely.","Sing “Twinkle Twinkle” in front of your family. Your teacher will listen in class."];
function login(){
 $("#app").innerHTML='<div class="login">'+TB+'<div class="big">🐣</div><h1>Little Stars Preschool</h1><p class="sub">Welcome, little star! Please log in ✨</p><input id="u" placeholder="Student ID" autocomplete="off"><input id="p" type="password" placeholder="Password"><div class="err" id="e"></div><button class="btn" id="go">Let’s go! 🚀</button><div class="hint">Use the Login ID and password given by your school</div></div>';
 $("#go").onclick=function(){var u=$("#u").value.trim().toUpperCase(),p=$("#p").value;if(u===S.id&&p===S.pw){logged=true;tab="home";shell()}else $("#e").textContent="Oops! Wrong ID or password 🙈"};
}
function shell(){
 $("#app").innerHTML='<header><div class="logo">🌟 Little Stars</div><span class="sub">Hi, '+S.name.split(" ")[0]+'! 👋</span>'+TB+'<button class="btn" id="out" style="margin:0;padding:8px 16px">Logout</button></header><div class="nav" id="nav"></div><div id="main"></div>';
 $("#out").onclick=function(){logged=false;login()};
 $("#nav").innerHTML=tabs.map(function(t){return '<button data-t="'+t[0]+'" class="'+(t[0]===tab?"on":"")+'"><span>'+t[1].split(" ")[0]+'</span>'+t[1].split(" ").slice(1).join(" ")+'</button>'}).join("");
 document.querySelectorAll("#nav button").forEach(function(b){b.onclick=function(){tab=b.dataset.t;shell()}});
 V[tab]();
}
function pctDone(){return Math.round(done.length/asg.length*100)}
var att=(function(){var d=[],y=2026,m=9,p=0,a=0;for(var i=1;i<=24;i++){var w=new Date(y,m,i).getDay(),s="P";if(w===0||w===6)s="H";else if(i===7||i===15)s="A";if(s==="P")p++;if(s==="A")a++;d.push([i,s,w])}return{d:d,p:p,a:a}})();
var V={
home:function(){
 $("#main").innerHTML='<div class="card c5" style="margin-bottom:14px"><span class="em">🧸</span><h2>Good day, '+S.name.split(" ")[0]+'!</h2><p>Today is a happy day to learn, play and smile. Keep shining, little star! ✨</p></div><div class="grid">'+
 [["c1","📅","Attendance",Math.round(att.p/(att.p+att.a)*100)+"% present"],["c2","📒","Assignments",done.length+" of "+asg.length+" done"],["c3","⭐","Result","Grade A – 4 stars"],["c4","🏅","Stickers earned","12 this month"]].map(function(c){return '<div class="card '+c[0]+'"><span class="em">'+c[1]+'</span><h3>'+c[2]+'</h3><div>'+c[3]+'</div></div>'}).join("")+'</div><div class="card" style="margin-top:14px"><h3>📢 Notice Board</h3><div class="row"><span>🎃 Fancy dress day</span><b>31 Oct</b></div><div class="row"><span>🎈 Children’s Day party</span><b>14 Nov</b></div><div class="row"><span>👨‍👩‍👧 Parent–teacher meeting</span><b>21 Nov</b></div></div>'},
profile:function(){
 var r=[["Student name",S.name],["Student ID",S.id],["Class",S.cls],["Roll no.",S.roll],["Age",S.age],["Class teacher",S.teacher],["Favourite thing",S.fav]],a=[["Parent / Guardian",S.parent],["Contact",S.phone],["Blood group",S.blood],["Academic year",S.year],["Fees status","Paid ✅"],["Bus","Route 4 – Morning"]];
 var f=function(x){return x.map(function(i){return '<div class="row"><span class="sub">'+i[0]+'</span><b>'+i[1]+'</b></div>'}).join("")};
 $("#main").innerHTML='<div class="grid" style="grid-template-columns:repeat(auto-fit,minmax(280px,1fr))"><div class="card c1"><div style="text-align:center"><span class="em" style="font-size:80px">👧</span></div><h2 style="text-align:center">'+S.name+'</h2>'+f(r)+'</div><div class="card c2"><h3>🔐 My Account</h3>'+f(a)+'<p class="sub">To change details, please contact the school office.</p></div></div>'},
act:function(){
 var t=[["9:00","🎵","Welcome Song & Prayer"],["9:30","🔤","Alphabet Fun"],["10:15","🍎","Snack Time"],["10:45","🎨","Art & Craft"],["11:30","🤸","Outdoor Play"],["12:15","📚","Story Time"]];
 var w=[["Mon","🔢","Number Games"],["Tue","🎭","Role Play"],["Wed","🌱","Nature Walk"],["Thu","🥁","Music & Dance"],["Fri","🧩","Puzzle Day"]];
 $("#main").innerHTML='<div class="grid" style="grid-template-columns:repeat(auto-fit,minmax(280px,1fr))"><div class="card c3"><h3>☀️ A Day at School</h3>'+t.map(function(i){return '<div class="row"><span><span style="font-size:24px">'+i[1]+'</span> '+i[2]+'</span><b>'+i[0]+'</b></div>'}).join("")+'</div><div class="card c4"><h3>🌈 Weekly Special</h3>'+w.map(function(i){return '<div class="row"><span><span style="font-size:24px">'+i[1]+'</span> '+i[2]+'</span><b>'+i[0]+'</b></div>'}).join("")+'</div></div>'},
asg:function(){
 $("#main").innerHTML='<div class="card c2" style="margin-bottom:14px"><h3>My Homework ✏️</h3><div class="bar"><i style="width:'+pctDone()+'%"></i></div><p class="sub">'+pctDone()+'% complete. Tap a task when it is done!</p></div><div class="grid">'+asg.map(function(a,i){var d=done.indexOf(i)>-1;return '<div class="card '+(d?"c3":"")+'"><h3>'+a[0]+'</h3><span class="tag c4">'+a[1]+'</span> <span class="sub">Due: '+a[2]+'</span><br><button class="btn" data-i="'+i+'">'+(d?"✅ Done! (undo)":"Mark as done")+'</button></div>'}).join("")+'</div>';
 document.querySelectorAll("[data-i]").forEach(function(b){b.onclick=function(){var i=+b.dataset.i,k=done.indexOf(i);k>-1?done.splice(k,1):done.push(i);save("asg",done);V.asg()}})},
att:function(){
 var h=["S","M","T","W","T","F","S"].map(function(x){return '<div class="sub">'+x+'</div>'}).join(""),first=new Date(2026,9,1).getDay(),pad="";
 for(var i=0;i<first;i++)pad+="<div></div>";
 $("#main").innerHTML='<div class="grid" style="grid-template-columns:repeat(auto-fit,minmax(280px,1fr))"><div class="card"><h3>October 2026 📅</h3><div class="cal">'+h+pad+att.d.map(function(x){return '<div class="'+x[1]+'">'+x[0]+'</div>'}).join("")+'</div><p class="sub"><span class="tag P">Present</span> <span class="tag A">Absent</span> <span class="tag H">Holiday</span></p></div><div class="card c3"><h3>Summary</h3><div class="row"><span>Days present</span><b>'+att.p+'</b></div><div class="row"><span>Days absent</span><b>'+att.a+'</b></div><div class="row"><span>Attendance</span><b>'+Math.round(att.p/(att.p+att.a)*100)+'%</b></div><p>🎉 Great going! Come to school every day to earn a gold star.</p></div></div>'},
res:function(){
 var r=[["English","🔤",18,20],["Maths","🔢",17,20],["Rhymes & Music","🎵",20,20],["Drawing","🎨",19,20],["Environment","🌳",16,20],["Hand writing","✏️",15,20]];if(window.MK)r.forEach(function(x){if(MK[x[0]]!=null)x[2]=MK[x[0]]});
 $("#main").innerHTML='<div class="card c4" style="margin-bottom:14px"><h3>Term 1 Result 🏆</h3><p style="font-size:22px">Overall: <b>105 / 120</b> · Grade A · ⭐⭐⭐⭐</p></div><div class="card">'+r.map(function(x){return '<div style="margin:10px 0"><div class="row" style="border:0;padding:0"><span>'+x[1]+' '+x[0]+'</span><b>'+x[2]+'/'+x[3]+'</b></div><div class="bar"><i style="width:'+x[2]/x[3]*100+'%"></i></div></div>'}).join("")+'<p class="sub">Teacher’s remark: Anaya is cheerful, curious and loves to help her friends. 💖</p></div>'},
imp:function(){
 var g=[["Speaking","🗣️",60,85],["Counting","🔢",50,80],["Handwriting","✏️",40,70],["Sharing & Kindness","🤝",70,95]];
 $("#main").innerHTML='<div class="card c3" style="margin-bottom:14px"><h3>My Growth Journey 🌱</h3><p class="sub">Light bar = before, full bar = now. Look how much you have grown!</p>'+g.map(function(x){return '<div style="margin:12px 0"><div class="row" style="border:0;padding:0"><span>'+x[1]+' '+x[0]+'</span><b>+'+(x[3]-x[2])+'%</b></div><div class="bar" style="position:relative"><i style="width:'+x[3]+'%;opacity:.45;position:absolute"></i><i style="width:'+x[2]+'%;position:absolute"></i></div></div>'}).join("")+'</div><div class="card c1"><h3>💡 Tips to Shine Even More</h3><div class="row"><span>✏️ Practise tracing 5 minutes daily</span></div><div class="row"><span>🧸 Count toys and fruits at home</span></div><div class="row"><span>📖 Read one picture book every night</span></div></div>'},
quiz:function(){
 var q=[["🐶 What sound does a dog make?",["Woof!","Meow!","Moo!"],0],["🍎 What colour is a ripe apple?",["Blue","Red","Purple"],1],["🔢 How many days are in a week?",["Five","Ten","Seven"],2],["☀️ When does the sun shine?",["Day","Night","Never"],0],["🐘 Which animal has a long trunk?",["Cat","Elephant","Duck"],1],["🍌 What colour is a banana?",["Yellow","Black","Pink"],0],["🐝 Which insect makes honey?",["Ant","Bee","Fly"],1],["🔺 How many sides does a triangle have?",["Two","Three","Four"],1]],i=0,sc=0;
 function show(){
  if(i>=q.length){$("#main").innerHTML='<div class="card c4" style="text-align:center"><span class="em" style="font-size:80px">🏆</span><h2>You scored '+sc+' / '+q.length+'!</h2><p>'+(sc>3?"Super star! 🌟":"Good try! Let us play again 💪")+'</p><button class="btn" id="re">Play again</button></div>';$("#re").onclick=function(){i=0;sc=0;show()};if(sc===q.length){confetti();stars(5,"Perfect quiz!")}return}
  var c=q[i];$("#main").innerHTML='<div class="card c5" style="max-width:520px"><p class="sub">Question '+(i+1)+' of '+q.length+'</p><h2>'+c[0]+'</h2>'+c[1].map(function(o,k){return '<button class="opt" data-k="'+k+'">'+o+'</button>'}).join("")+'</div>';
  document.querySelectorAll(".opt").forEach(function(b){b.onclick=function(){var k=+b.dataset.k;if(k===c[2]){sc++;b.classList.add("ok");b.textContent+="  🎉 Yay!"}else{b.classList.add("no");b.textContent+="  🙈 Try next time"}document.querySelectorAll(".opt").forEach(function(x){x.onclick=null});setTimeout(function(){i++;show()},1000)}})}
 show()},
puz:function(){
 var e=["🐶","🐱","🐸","🦁","🐼","🐰"],c=e.concat(e).sort(function(){return Math.random()-.5}),o=[],mv=0,m=0;
 $("#main").innerHTML='<div class="card c1"><h3>Memory Match 🧩</h3><p class="sub">Flip two cards. Find the matching animal friends! Moves: <b id="mv">0</b></p><div class="mem" id="mem">'+c.map(function(_,i){return '<button data-i="'+i+'">❓</button>'}).join("")+'</div><p id="win" style="font-size:20px"></p><button class="btn" id="nw">New game</button></div>';
 $("#nw").onclick=V.puz;
 var bs=document.querySelectorAll("#mem button");
 bs.forEach(function(b){b.onclick=function(){var i=+b.dataset.i;if(o.length===2||b.classList.contains("m")||o.indexOf(i)>-1)return;b.textContent=c[i];b.classList.add("f");o.push(i);if(o.length===2){mv++;$("#mv").textContent=mv;var a=o[0],z=o[1];if(c[a]===c[z]){bs[a].className=bs[z].className="m";o=[];m++;if(m===6)$("#win").textContent="🎉 Hooray! You found all friends in "+mv+" moves!"}else setTimeout(function(){[a,z].forEach(function(k){bs[k].textContent="❓";bs[k].className=""});o=[]},800)}}})},
story:function(){
 var s=[["🐢","The Slow Little Turtle","Tilly the turtle walked very slowly. “Hurry up!” laughed the rabbit. Tilly only smiled and kept walking. Step by step, she reached the big green hill. The rabbit had fallen asleep under a tree. Tilly passed by quietly and reached the top first. Moral: Slow and steady wins the race."],["🐦","The Kind Little Bird","Benny the bird found a tiny seed. A hungry ant looked sad, so Benny shared half with her. Later, the ant saved Benny from a sticky puddle. They became best friends. Moral: Kindness always comes back to you."],["🌙","The Moon and the Star","One night, a little star felt too small. “I am so tiny,” she sighed. The moon smiled and said, “You help the sky sparkle!” The little star twinkled brightly and felt very happy. Moral: Everyone is special in their own way."]];
 $("#main").innerHTML='<div class="grid" style="grid-template-columns:repeat(auto-fit,minmax(280px,1fr))">'+s.map(function(x,i){return '<div class="card c'+(i+2)+' story"><span class="em">'+x[0]+'</span><h3>'+x[1]+'</h3><p>'+x[2]+'</p></div>'}).join("")+'</div>'}
};
