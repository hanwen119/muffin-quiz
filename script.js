// ===== 設定 =====
// 部署好 Apps Script 之後，把網址貼在這裡（留空＝不記名單、不寄信，僅顯示結果）
const APPS_SCRIPT_URL = '';

// ===== 題目（9 題，三軸各 3 題，內部計分用 axis/pole，畫面上不顯示）=====
const QUESTIONS = [
  { q: '忙完一整天，哪一種事會讓妳覺得「今天有充到電」？', axis: 'drive', options: [
    { text: '跟某個人深聊了一場，感覺真的幫到她', pole: 'people' },
    { text: '把一個東西做出來了，看著成品特別滿足', pole: 'things' } ] },
  { q: '要開始一件新任務時，妳通常會？', axis: 'pace', options: [
    { text: '先動手做了再說，邊做邊修', pole: 'fast' },
    { text: '先把狀況想清楚、步驟列好，才開始動', pole: 'slow' } ] },
  { q: '如果要開始經營一份網路收入，妳直覺上比較想？', axis: 'stage', options: [
    { text: '露臉分享，讓大家認識「我這個人」', pole: 'front' },
    { text: '讓作品或服務替我說話，我在後面把事做好', pole: 'back' } ] },
  { q: '別人最常怎麼稱讚妳？', axis: 'drive', options: [
    { text: '「跟妳聊完，覺得妳很懂我、被接住了」', pole: 'people' },
    { text: '「妳做的東西很專業、很有架構」', pole: 'things' } ] },
  { q: '學一個新東西（新 App、新工具）時，妳會？', axis: 'pace', options: [
    { text: '直接打開來按按看，卡住再查', pole: 'fast' },
    { text: '先看教學、了解全貌，再動手', pole: 'slow' } ] },
  { q: '請妳開鏡頭錄一段自我介紹影片，妳的第一反應是？', axis: 'stage', options: [
    { text: '有點緊張，但其實躍躍欲試', pole: 'front' },
    { text: '能不露臉就不露臉，用文字或聲音就好', pole: 'back' } ] },
  { q: '哪一種成就感對妳比較「上癮」？', axis: 'drive', options: [
    { text: '看著一個人因為我而改變、變好', pole: 'people' },
    { text: '看著我做的東西成形、被人使用', pole: 'things' } ] },
  { q: '一個機會突然出現，但資訊還不完整，妳會？', axis: 'pace', options: [
    { text: '心動就馬上行動，資訊邊走邊收集', pole: 'fast' },
    { text: '先評估清楚才回覆，寧可慢也不想後悔', pole: 'slow' } ] },
  { q: '在群體裡被公開點名稱讚、大家都看著妳時？', axis: 'stage', options: [
    { text: '開心，「被看見」的感覺很好', pole: 'front' },
    { text: '有點害羞，寧願大家把注意力放在我做的東西上', pole: 'back' } ] }
];

// ===== 八型結果（key = drive-pace-stage）=====
const RESULTS = {
  'people-fast-front': {
    flavor: '🍓 草莓瑪芬', typeName: '聚光者', subtitle: '一站出來就發光的舞台型（聚光者）',
    quote: '「這裡就是我的舞台，讓我說給妳聽！」', img: 'photos/strawberry.jpg', emoji: '🍓',
    traits: '妳天生有種讓人想靠近的感染力，反應快、行動快，站到人前不但不怕，還會越講越有電。妳的能量來自「人」——妳說的話能點亮別人。',
    advantages: '妳是天生的個人品牌料。真誠又有魅力，發限動、開直播、站台分享，都能讓人記住妳、想追蹤妳。別人要練很久的「舞台感」，妳出廠就內建。',
    blindspots: '悄悄告訴妳，不是每個人都要喜歡妳。太在意每一句評價，妳的光會被別人的冷水澆熄——把焦點放回「我想為誰發聲」，妳會走得又穩又亮。',
    income: '適合妳的是「站到台前」的路！個人品牌、直播、社群活動都很對味。先讓大家認識真實的妳，信任養起來之後，推什麼大家都會買單❤️'
  },
  'people-fast-back': {
    flavor: '🍯 蜂蜜瑪芬', typeName: '連結者', subtitle: '最會把對的人湊在一起的幕後型（連結者）',
    quote: '「妳需要的那個人，我剛好認識！」', img: 'photos/honey.jpg', emoji: '🍯',
    traits: '妳對人有天生的敏銳，很快能讀懂誰需要什麼，也超會牽線媒合。妳喜歡跟人互動，但不愛站在鎂光燈下——妳是熱鬧背後那雙把大家串起來的手。',
    advantages: '妳很會「促成」。在人跟人、需求跟資源之間找到剛好的接點，讓合作發生、讓大家都開心，這種能力在團購、社群、媒合型的生意裡特別值錢。',
    blindspots: '悄悄告訴妳，妳常忙著成全別人，忘了自己也要被看見、也要被結算。牽線是有價值的工作，記得替自己開口收下應得的那一份。',
    income: '適合妳的是「連結型」的路！團購主、社群代營運、揪團共學、媒合服務都很對味。把妳真心喜歡的東西介紹給對的人，收入會自然跟著來❤️'
  },
  'people-slow-front': {
    flavor: '🥛 香草牛奶瑪芬', typeName: '陪伴者', subtitle: '用真誠慢慢養出深信任的溫暖型（陪伴者）',
    quote: '「別急，我陪妳慢慢來。」', img: null, emoji: '🥛',
    traits: '妳溫暖、綿長，願意站出來，但不是靠聲量，而是靠真誠。妳習慣把人放在心上，說話做事都有一種讓人安心的節奏，相處越久越讓人離不開。',
    advantages: '妳天生會凝聚人。妳能讓一群人有歸屬感、願意留下來，帶共學、做陪跑，學員會為了「被妳好好對待的感覺」一直回來——這是超強的本錢。',
    blindspots: '悄悄告訴妳，妳太會照顧別人，常把自己放到最後，也容易因為心軟而難下決定。先把自己顧好、練習說「不」，妳才有力氣陪更多人走更遠。',
    income: '適合妳的是「陪伴型」的路！陪跑教練、共學社群、一對一諮詢都很對味。把「被妳陪著」的感覺做成服務，就是妳最自然的收入來源❤️'
  },
  'people-slow-back': {
    flavor: '🫘 紅豆瑪芬', typeName: '守護者', subtitle: '安靜可靠、一對一深度支持的守護型（守護者）',
    quote: '「妳需要的時候，我都在。」', img: null, emoji: '🫘',
    traits: '妳安靜、細膩、可靠，不聲張卻總是接得住人。妳不喜歡人多的場合，但一對一的時候，妳的傾聽和照顧會讓對方覺得被完整地接住。',
    advantages: '妳最強的是「深度信任」。貼身、細緻、有始有終，這種特質最適合高單價的深度服務——因為願意把重要的事託付出去的人，找的就是妳這種人。',
    blindspots: '悄悄告訴妳，妳的存在感太低、又不主動開口談價，很容易被當成「免費的好人」。妳的細膩是專業不是義務，練習標上價格，妳值得。',
    income: '適合妳的是「深度服務」型的路！一對一顧問、貼身助理型服務、VIP 陪伴都很對味。服務的人不用多，把幾個人服務到深、到好，收入反而更穩❤️'
  },
  'things-fast-front': {
    flavor: '🍋 檸檬瑪芬', typeName: '點火者', subtitle: '點子多、做得快、還敢秀出來的發動機（點火者）',
    quote: '「我腦袋裡的點子多到滿出來，好想趕快做給妳看！」', img: 'photos/lemon.jpg', emoji: '🍋',
    traits: '妳是點子發動機，靈感一來就想動手，而且做出來還敢直接秀。從無到有、把想像變成真實的過程，就是妳最享受的事。',
    advantages: '妳很會「開頭」。別人還在猶豫，妳已經做出第一版——這種先做再修的行動力，在自媒體和線上創業裡特別吃香，因為願意開始的人已經贏過大半。',
    blindspots: '悄悄告訴妳，妳的坑不是沒靈感，是這個做一半又被下一個吸走。妳最需要的是「把一件事做完」——找一個幫妳收尾的方法或夥伴，爆發力才會變成成果。',
    income: '適合妳的是「快速啟動」型的路！數位產品、快閃課程、創意作品都很對味。先求有、再求好，用市場回饋滾動修正，最適合妳這種行動派❤️'
  },
  'things-fast-back': {
    flavor: '🌰 核桃瑪芬', typeName: '實作家', subtitle: '動手超強、成品替妳說話的實作型（實作家）',
    quote: '「少說多做，東西做出來就知道了。」', img: 'photos/walnut.jpg', emoji: '🌰',
    traits: '妳動手能力強、出手快，交出來的東西扎實有品質。妳不需要站在台前，因為妳的成品自己會說話。',
    advantages: '妳最值錢的是「交付力」。接到需求就能又快又好地做出來，這在接案、代製作的世界裡就是硬通貨——合作過的人都會想再回來找妳。',
    blindspots: '悄悄告訴妳，妳的坑是只顧埋頭做，不行銷、不開口，結果手藝再好案子也接不進來。不用變成很愛曝光的人，但作品要定期讓人看見，機會才找得到妳。',
    income: '適合妳的是「實作接案」型的路！接案、代製作、手作販售都很對味。把作品集整理好、開口報價不心虛，妳的手藝就是最好的招牌❤️'
  },
  'things-slow-front': {
    flavor: '🍵 抹茶瑪芬', typeName: '深耕者', subtitle: '把專業熬深再教出去的回甘型（深耕者）',
    quote: '「慢慢來，我要給妳的是真功夫。」', img: 'photos/matcha.jpg', emoji: '🍵',
    traits: '妳做事講究、學東西扎實，喜歡把一門專業熬到深，再好好地教出去。妳願意露臉，但妳的底氣來自專業，不是來自聲量。',
    advantages: '妳的信服力超強。因為妳講的每句話後面都有真材實料，學員跟著妳會有「學到真東西」的踏實感——這是專家品牌最珍貴的資產。',
    blindspots: '悄悄告訴妳，妳的坑是想準備到完美才敢出手，常常太慢上場。妳的 80 分已經是別人的 120 分——先開課、先分享，讓真實回饋幫妳把剩下的 20 分補完。',
    income: '適合妳的是「專家品牌」型的路！知識型課程、線上教學、專業內容都很對味。把妳的真功夫變成有系統的課，一次整理、教很多人❤️'
  },
  'things-slow-back': {
    flavor: '⚫ 黑芝麻瑪芬', typeName: '造系統者', subtitle: '默默打磨工具與資產的系統型（造系統者）',
    quote: '「別擔心，一切都在我的掌握之中。」', img: 'photos/sesame.jpg', emoji: '⚫',
    traits: '妳低調、務實、有系統思維，喜歡把複雜的東西整理成清楚的流程。妳不愛出風頭，但妳蓋的系統會默默替妳工作。',
    advantages: '妳最強的是「做一次、賣很多次」。模板、工具、自動化流程——妳打磨出來的資產有複利效果，時間越久越值錢，這是最接近被動收入的天賦。',
    blindspots: '悄悄告訴妳，妳的坑是完美主義＋嚴重缺曝光：東西磨很久遲遲不發布，發布了又沒人知道。先推出 80 分版本，然後練習讓別人看見它——系統再好，被看見才有價值。',
    income: '適合妳的是「數位資產」型的路！模板、工具、被動收入產品都很對味。把妳整理東西的本事做成可以重複賣的產品，讓系統替妳賺錢❤️'
  }
};

// ===== 狀態 =====
let currentIndex = 0;
let answers = []; // {axis, pole}
let quizOrder = []; // 每次開始測驗時重洗的題目順序

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ===== DOM =====
const $ = id => document.getElementById(id);
const sections = { intro: $('intro-section'), quiz: $('quiz-section'), gate: $('user-info-section'), result: $('result-section') };

function show(name) {
  Object.values(sections).forEach(s => s.style.display = 'none');
  sections[name].style.display = 'block';
  window.scrollTo({ top: 0 });
}

$('start-quiz-btn').addEventListener('click', () => { currentIndex = 0; answers = []; quizOrder = shuffle(QUESTIONS); show('quiz'); loadQuestion(); });
$('next-question-btn').addEventListener('click', nextQuestion);
$('user-info-form').addEventListener('submit', handleGateSubmit);
$('restart-quiz-btn').addEventListener('click', () => { currentIndex = 0; answers = []; quizOrder = shuffle(QUESTIONS); show('quiz'); loadQuestion(); });

let selected = null;

function loadQuestion() {
  selected = null;
  const q = quizOrder[currentIndex];
  $('question-number').textContent = `第 ${currentIndex + 1} 題／共 ${quizOrder.length} 題`;
  $('question-text').textContent = q.q;
  $('progress-bar').style.width = `${(currentIndex / quizOrder.length) * 100}%`;

  const container = $('options-container');
  container.innerHTML = '';
  // 選項順序隨機，避免「一路選第一個」的慣性
  const opts = [...q.options].sort(() => Math.random() - 0.5);
  opts.forEach(opt => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'option-btn';
    btn.textContent = opt.text;
    btn.addEventListener('click', () => {
      container.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      selected = { axis: q.axis, pole: opt.pole };
      $('next-question-btn').disabled = false;
    });
    container.appendChild(btn);
  });

  $('next-question-btn').disabled = true;
  $('next-question-btn').textContent = currentIndex === quizOrder.length - 1 ? '完成測驗 🎉' : '下一題';
}

function nextQuestion() {
  if (!selected) return;
  answers[currentIndex] = selected;
  currentIndex++;
  if (currentIndex < quizOrder.length) {
    loadQuestion();
  } else {
    $('progress-bar').style.width = '100%';
    show('gate');
  }
}

// 每軸 3 題多數決（奇數題，無平手）
function computeResult() {
  const tally = { drive: { people: 0, things: 0 }, pace: { fast: 0, slow: 0 }, stage: { front: 0, back: 0 } };
  answers.forEach(a => { tally[a.axis][a.pole]++; });
  const drive = tally.drive.people > tally.drive.things ? 'people' : 'things';
  const pace = tally.pace.fast > tally.pace.slow ? 'fast' : 'slow';
  const stage = tally.stage.front > tally.stage.back ? 'front' : 'back';
  return { key: `${drive}-${pace}-${stage}`, tally };
}

function handleGateSubmit(e) {
  e.preventDefault();
  const name = $('user-name').value.trim();
  const email = $('user-email').value.trim();
  if (!name || !email) return;

  const { key, tally } = computeResult();
  const r = RESULTS[key];

  // 顯示結果（不等後端，避免網路慢卡住體驗）
  renderResult(r);
  show('result');

  // 名單記錄＋寄信（Apps Script）
  if (APPS_SCRIPT_URL) {
    const payload = {
      name, email,
      flavor: r.flavor, typeName: r.typeName, subtitle: r.subtitle, quote: r.quote,
      traits: r.traits, advantages: r.advantages, blindspots: r.blindspots, income: r.income,
      axes: key,
      scores: `人${tally.drive.people}事${tally.drive.things}｜快${tally.pace.fast}慢${tally.pace.slow}｜台前${tally.stage.front}幕後${tally.stage.back}`
    };
    fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' }, // 避免 CORS preflight
      body: JSON.stringify(payload)
    }).catch(() => { /* 後端失敗不影響前端結果顯示 */ });
  }
}

function renderResult(r) {
  $('result-flavor').textContent = r.flavor;
  $('result-subtitle').textContent = r.subtitle;
  $('result-quote').textContent = r.quote;
  $('result-traits').textContent = r.traits;
  $('result-advantages').textContent = r.advantages;
  $('result-blindspots').textContent = r.blindspots;
  $('result-income').textContent = r.income;
  const wrap = $('result-avatar-wrap');
  wrap.innerHTML = r.img
    ? `<img src="${r.img}" alt="${r.flavor}">`
    : `<div class="emoji-card">${r.emoji}</div>`;
}
