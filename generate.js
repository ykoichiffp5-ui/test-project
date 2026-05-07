const fs = require("fs");

const raw = process.env.LINEAR_DATA;

if (!raw) {
  console.error("LINEAR_DATA が空です");
  process.exit(1);
}

const data = JSON.parse(raw);
const issues = data.data.issues.nodes;

const today = new Date().toLocaleString("ja-JP");

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
      margin-bottom: 10px;
      text-align: center;
    }

    .updated {
      text-align: center;
      color: #999;
      margin-bottom: 30px;
    }

    .calendar {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
    }

    .card {
      background: #1e1e1e;
      border-radius: 16px;
      padding: 20px;
      border: 1px solid #333;
    }

    .title {
      font-size: 24px;
      font-weight: bold;
      margin-bottom: 20px;
    }

    .status {
      font-size: 18px;
    }

    .todo {
      color: #facc15;
    }

    .progress {
      color: #60a5fa;
    }

    .done {
      color: #4ade80;
    }

    .date {
      margin-top: 15px;
      color: #999;
      font-size: 14px;
    }
  </style>
</head>

<body>

  <h1>📅 Linear Calendar Dashboard</h1>

  <div class="updated">
    🕒 Updated: ${today}
  </div>

  <div class="calendar">

    ${issues.map(issue => {
      let statusClass = "todo";

      if (issue.state.name === "In Progress") {
        statusClass = "progress";
      }

      if (issue.state.name === "Done") {
        statusClass = "done";
      }

      return `
        <div class="card">

          <div class="title">
            ${issue.title}
          </div>

          <div class="status ${statusClass}">
            ● ${issue.state.name}
          </div>

          <div class="date">
            Updated from Linear
          </div>

        </div>
      `;
    }).join("")}

  </div>

</body>
</html>
`;

fs.mkdirSync("dist", { recursive: true });

fs.writeFileSync("dist/index.html", html);

console.log("HTML生成完了！");

