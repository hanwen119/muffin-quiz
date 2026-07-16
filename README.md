# 瑪芬口味測驗 v2

3 分鐘、9 題，測出妳最適合的賺錢路線。幸福媽媽設計師出品。

- 網站：純靜態（index.html / style.css / script.js），掛 GitHub Pages
- 計分：三軸（電力來源×行動節奏×舞台位置）各 3 題多數決 → 8 型
- 流程：答題 → 填姓名＋Email → 顯示結果＋名單入表＋結果寄信

## 名單記錄＋寄信（Apps Script）部署步驟

1. 到 [sheets.new](https://sheets.new) 建一個新試算表，命名「瑪芬測驗名單」。
2. 試算表上方選單 → 擴充功能 → Apps Script。
3. 把 `apps-script/Code.gs` 的內容全部貼進去（取代原本的空函式），存檔。
4. 右上「部署」→ 新增部署 → 類型選「網頁應用程式」：
   - 執行身分：**我**
   - 誰可以存取：**任何人**
5. 按「部署」→ 授權（會警告「未經驗證」，點「進階」→「前往(不安全)」→ 允許）。
6. 複製「網頁應用程式 URL」（`https://script.google.com/macros/s/…/exec`）。
7. 把 URL 貼到 `script.js` 最上面的 `APPS_SCRIPT_URL = ''` 引號內，push 更新。

> 寄信額度：一般 Gmail 帳號 Apps Script 每天可寄 100 封，夠用。
