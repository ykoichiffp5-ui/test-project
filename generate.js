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
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Linear Dashboard</title>

  <style>
    body {
      font-family: sans-serif;
      background: #0f1117;
      color: white;
      padding: 30px;
    }

    h1 {
      font-size: 48px;
      margin-bottom: 10px;
    }

    .updated {
      color: #999;
      margin-bottom: 30px;
      font-size: 20px;
    }

    .card {
      background: #f3f3f3;
      color: #111;
      border-radius: 30px;
      padding: 30px;
      margin-bottom: 25px;
    }

    .card h2 {
      font-size: 42px;
      margin-bottom: 20px;
      color: #ffffff;
    }

    .status {
      font-size: 26px;
      color: #8a6b00;
      margin-top: 15px;
      margin-bottom: 20px;
    }

    pre {
      white-space: pre-wrap;
      word-wrap: break-word;
      font-size: 24px;
      line-height: 1.8;
      color: #444;
      margin-top: 20px;
    }

    .footer {
      text-align: center;
      margin-top: 60px;
      color: #888;
      font-size: 18px;
    }
  </style>
</head>

<body>

  <h1>📅 Linear Calendar Dashboard</h1>

  <div class="updated">
    🕒 Updated: ${new Date().toLocaleString("ja-JP")}
  </div>

  ${issues.map(issue => `
    <div class="card">

      <h2>${issue.title}</h2>

      <div class="status">
        ● ${issue.state.name}
      </div>

      <pre>${issue.description || "データなし"}</pre>

    </div>
  `).join("")}

  <div class="footer">
    Updated from Linear
  </div>

</body>
</html>
`;

fs.mkdirSync("dist", { recursive: true });
fs.writeFileSync("dist/index.html", html);

console.log("Dashboard generated!");
