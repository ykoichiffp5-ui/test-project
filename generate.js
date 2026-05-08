const fs = require("fs");

const raw = process.env.LINEAR_DATA;

if (!raw) {
  console.error("LINEAR_DATA が空です");
  process.exit(1);
}

const data = JSON.parse(raw);
const issues = data.data.issues.nodes;

let calendarItems = "";

issues.forEach(issue => {
  const title = issue.title || "タイトルなし";
  const state = issue.state?.name || "未設定";
  const date = issue.createdAt
    ? new Date(issue.createdAt).toLocaleDateString("ja-JP")
    : "日付なし";

  calendarItems += `
    <div class="event">
      <div class="date">${date}</div>
      <div class="content">
        <div class="title">${title}</div>
        <div class="state">${state}</div>
      </div>
    </div>
  `;
});

const html = `
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Linear介護カレンダー</title>

  <style>
    body {
      font-family: sans-serif;
      background: #f3f4f6;
      padding: 20px;
      margin: 0;
    }

    h1 {
      text-align: center;
      margin-bottom: 30px;
      color: #222;
    }

    .calendar {
      max-width: 800px;
      margin: auto;
    }

    .event {
      display: flex;
      background: white;
      margin-bottom: 16px;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    }

    .date {
      min-width: 140px;
      background: #4f46e5;
      color: white;
      padding: 20px;
      font-weight: bold;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .content {
      padding: 20px;
      flex: 1;
    }

    .title {
      font-size: 18px;
      font-weight: bold;
      margin-bottom: 10px;
      color: #222;
    }

    .state {
      display: inline-block;
      background: #eef2ff;
      color: #4f46e5;
      padding: 6px 12px;
      border-radius: 999px;
      font-size: 14px;
    }
  </style>
</head>

<body>
  <h1>📅 Linear介護カレンダー</h1>

  <div class="calendar">
    ${calendarItems}
  </div>

</body>
</html>
`;

if (!fs.existsSync("dist")) {
  fs.mkdirSync("dist");
}

fs.writeFileSync("dist/index.html", html);

console.log("カレンダー生成完了");
