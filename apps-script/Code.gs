/**
 * 瑪芬測驗 v2｜名單記錄＋結果寄信
 * 部署方式見 repo README.md（部署為網頁應用程式，存取權「任何人」）
 */

const SHEET_NAME = '測驗名單';

function doPost(e) {
  const data = JSON.parse(e.postData.contents);

  // 1. 寫入試算表（綁定本 Apps Script 的試算表）
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(['時間', '姓名', 'Email', '口味', '型', '三軸', '各軸票數']);
  }
  sheet.appendRow([
    Utilities.formatDate(new Date(), 'Asia/Taipei', 'yyyy-MM-dd HH:mm:ss'),
    data.name, data.email, data.flavor, data.typeName, data.axes, data.scores
  ]);

  // 2. 寄結果信
  MailApp.sendEmail({
    to: data.email,
    subject: `🧁 ${data.name}，妳的瑪芬口味出爐了：${data.flavor}`,
    htmlBody: buildEmailHtml(data),
    name: '幸福媽媽設計師 涵雯'
  });

  return ContentService.createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}

function buildEmailHtml(d) {
  const block = (title, body) =>
    `<div style="background:#fff;border-radius:12px;padding:16px 18px;margin-bottom:12px;">
       <p style="margin:0 0 6px;font-weight:bold;color:#B02860;">${title}</p>
       <p style="margin:0;line-height:1.8;color:#2E141C;">${body}</p>
     </div>`;

  return `
  <div style="background:#F8E8F0;padding:28px 16px;font-family:'PingFang TC','Noto Sans TC','Microsoft JhengHei',sans-serif;">
    <div style="max-width:520px;margin:0 auto;">
      <p style="text-align:center;color:#4379C2;font-weight:bold;margin:0;">妳是——</p>
      <h1 style="text-align:center;color:#B02860;margin:4px 0;">${d.flavor}</h1>
      <p style="text-align:center;color:#ED4780;font-weight:bold;margin:0 0 8px;">${d.subtitle}</p>
      <p style="text-align:center;color:#ED4780;font-weight:bold;font-size:16px;margin:0 0 20px;">${d.quote}</p>
      ${block('💗 妳的特質', d.traits)}
      ${block('✨ 妳的優勢', d.advantages)}
      ${block('🌱 盲點提醒', d.blindspots)}
      ${block('💰 創收建議', d.income)}
      <p style="font-size:12.5px;color:#9A6B80;text-align:center;margin:16px 0;">
        這個結果來自三個軸：妳的電力來源 × 行動節奏 × 舞台位置。沒有好壞，只有適不適合妳。
      </p>
      <a href="https://lin.ee/QPteACN"
         style="display:block;text-align:center;background:#06C755;color:#fff;text-decoration:none;
                border-radius:12px;padding:14px;font-weight:bold;">
        💬 加 LINE 回「我測完了」＋妳的口味<br>
        <span style="font-weight:normal;font-size:13px;">涵雯會給妳專屬的下一步建議</span>
      </a>
      <p style="text-align:center;font-size:12px;color:#B98CA0;margin-top:20px;">© 幸福媽媽設計師 Home Media Tutor</p>
    </div>
  </div>`;
}
