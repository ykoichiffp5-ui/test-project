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
<html>
<head>
  <meta charset="UTF-8">
  <title>Linear Dashboard</title>

  <style>
    body {
      font-family: Arial;
      background: #0f172a;
      color: white;
      padding: 30px;
    }

    h1 {
      font-size: 40px;
      margin-bottom: 30px;
    }

    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
    }

    .card {
      background: #1e293b;
      padding: 20px;
      border-radius: 16px;
      box-shadow: 0 4px 10px rgba(0,0,0,0.3);
    }

    .card h2 {
      margin-top: 0;
      color: #38bdf8;
    }

    ul {
      padding-left: 20px;
    }

    li {
      margin-bottom: 10px;
    }

    .count {
      font-size: 48px;
      font-weight: bold;
      color: #22c55e;
    }
  </style>
</head>

<body>

  <h1>📊 Linear Dashboard</h1>

  <div class="grid">

    <div class="card">
      <h2>総Issue数</h2>
      <div class="count">${issues.length}</div>
    </div>

    <div class="card">
      <h2>最新タスク</h2>
      <ul>
        ${issues.map(issue => `<li>${issue.title}</li>`).join("")}
      </ul>
    </div>

  </div>

</body>
</html>
`;


