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
</head>
<body>
  <h1>📊 Linear Dashboard</h1>

  <ul>
    ${issues.map(issue => `<li>${issue.title}</li>`).join("")}
  </ul>

</body>
</html>
`;

fs.mkdirSync("dist", { recursive: true });
fs.writeFileSync("dist/index.html", html);

console.log("HTML生成完了！");
