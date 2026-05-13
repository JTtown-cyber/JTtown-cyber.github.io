(function(){ console.log('[app] script loaded');

const QUESTIONS = [ "1：说个数字","2：一个男生的名字","3：给宠物兔子取个名字","4：一个形容词", "5：如果牙医和你说“你有六个蛀牙”你会说什么?","6：一段时间","7：酒吧准备打烊的时候，酒保会和顾客说啥", "8：历史事件","9：一个形容鱼的词","10：一个身体部位","11：一个职业","12：某种动物", "13：一个动词","14：明星名字","15：某种食物","16：一个角色", "17：一句小屁孩会说的脏话（请文明）","18：再来一句（请文明）","19：再来一句（请文明）", "20：随便一个物体","21：一个动词","22：一个身体的部位","23：再来个动词","24：一个卡通角色","25：一个动词" ];

const TEMPLATE = 在一处果园里有一对小情侣 {2}:真是个摘苹果的好时节，这是我{1}年来最开心的一天 {3}:听我说，{2}，我觉得我们得谈谈了 {2}:咋了，{3} {3}:我要说的话，可能会很{4} {3}:但我还是得说，我们分手吧 {2}:{5} {3}:对不起，过去的{6}我们真的很愉快，但是{7} {2}:太冷酷了，你这样想多久了 {3}:从{8}就开始了 {2}:难以置信了，是因为我的{10}太{9}了吗 {3}:不，不是，我们..我们不是一个世界的人，我是由两个{11}养大的，而你是{12}带大的 {3}:我喜欢出去玩，每晚都看见你像鬼一样在沙发上{21}，然后在抖音上看{14}吃{15}的视频 {2}:我懂了，我也有话对你说，虽然难以启齿 {2}:我其实和{16}有一腿 {3}:{17} {2}:{18} {3}:得了，你是个{19}！我要带着{20}离家出走 {2}:那...那你别{21}!我的{12}爸妈，以前总这么嘱咐我，我不忍心看你那样，来坐一下，事情搞成这样我很抱歉 {3}:我也是，我的{22}里总会有你的一席之地 {2}:此情此景，我想我们一起朗诵我最爱的爱情宣言 {2}&{3}:你{23}得像{24}在{25}一样;

const form = document.getElementById('form'); const preview = document.getElementById('storyPreview'); const btnDemo = document.getElementById('btnDemo'); const btnBuild = document.getElementById('btnBuild');

function renderFields(){ let html = ''; for (let i=1;i<=25;i++){ html += <div class="full"> <label for="q${i}">${QUESTIONS[i-1]}</label> <input id="q${i}" type="text" maxlength="50" placeholder="第${i}题答案（≤50字）"> </div>; } form.innerHTML = html; } renderFields();

function sanitize(s){ return String(s).replace(/[<>&"']/g, c => ({'<':'<','>':'>','&':'&','"':'"',"'":'''}[c])); } function fillTemplate(tpl, answers){ return tpl.replace(/{([1-9]|1[0-9]|2[0-5])}/g, (_, idx) => { const v = answers[idx]; return v!=null && v!=='' ? sanitize(v) : {${idx}}; }); }

btnDemo.addEventListener('click', ()=>{ console.log('[app] demo clicked'); const demo = ["三","张三","小白","揪心","啊？不可能吧！","暑假","各位抓紧最后一杯","登月","腥腥的","心","厨师","狼","跳","周杰伦","汉堡","超人","臭屁精！","你才是！","坏蛋！","背包","躺","胸口","飞","皮卡丘","冲"]; for (let i=1;i<=25;i++){ const el = document.getElementById('q'+i); if (el && !el.value) el.value = demo[i-1]; } });

btnBuild.addEventListener('click', ()=>{ console.log('[app] build clicked'); const answers = {}; for (let i=1;i<=25;i++){ answers[String(i)] = (document.getElementById('q'+i).value || '').trim(); } const story = fillTemplate(TEMPLATE, answers); preview.textContent = story; const url = '/poster.html?story=' + encodeURIComponent(story); location.href = url; }); })();
