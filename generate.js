const fs = require("fs");

const raw = process.env.LINEAR_DATA;

if (!raw) {
  console.error("LINEAR_DATA が空です");
  process.exit(1);
}

const data = JSON.parse(raw);
const issues = data.data.issues.nodes;

const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Linear Dashboard</title>

  <style>
    body {
      font-family: sans-serif;
      padding: 20px;
      background: #111;
      color: white;
    }

    h1 {
      margin-bottom: 30px;
    }

    .calendar {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
    }

    .card {
      background: #222;
      padding: 20px;
      border-radius: 12px;
      box-shadow: 0 0 10px rgba(0,0,0,0.3);
    }

    .status {
      margin-top: 10px;
      color: #aaa;
    }
  </style>
</head>

<body>

  <h1>📅 Linear Calendar Dashboard</h1>

  <div class="calendar">

    ${issues.map(issue => `
      <div class="card">
        <h2>${issue.title}</h2>
        <div class="status">
          🟡 ${issue.state.name}
        </div>
      </div>
    `).join("")}

  </div>

</body>
</html>
`;

fs.mkdirSync("dist", { recursive: true });

fs.writeFileSync("dist/index.html", html);

console.log("HTML生成完了！");
