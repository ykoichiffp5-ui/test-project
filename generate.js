const fs = require("fs");

const raw = process.env.LINEAR_DATA;

if (!raw) {
  console.error("LINEAR_DATAが空です");
  process.exit(1);
}

const data = JSON.parse(raw);
const issues = data.data.issues.nodes;

const html = `
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Linear介護ダッシュボード</title>

  <style>
    body {
      font-family: sans-serif;
      background: #f4f7fb;
      margin: 0;
      padding: 20px;
    }

    h1 {
      text-align: center;
      color: #333;
      margin-bottom: 30px;
    }

    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
    }

    .card {
      background: white;
      border-radius: 12px;
      padding: 20px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }

    .title {
      font-size: 18px;
      font-weight: bold;
      margin-bottom: 10px;
      color: #222;
    }

    .state {
      display: inline-block;
      padding: 6px 12px;
      border-radius: 999px;
      background: #eef2ff;
      color: #4f46e5;
      font-size: 14px;
    }
  </style>
</head>

<body>
  <h1>📊 Linear介護ダッシュボード</h1>

  <div class="grid">
    ${issues.map(issue => `
      <div class="card">
        <div class="title">${issue.title}</div>
        <div class="state">${issue.state.name}</div>
      </div>
    `).join("")}
  </div>

</body>
</html>
`;

if (!fs.existsSync("dist")) {
  fs.mkdirSync("dist");
}

fs.writeFileSync("dist/index.html", html);

console.log("ダッシュボード生成完了");
