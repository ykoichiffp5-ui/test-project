const fs = require("fs");

const raw = process.env.LINEAR_DATA;

if (!raw) {
  console.error("LINEAR_DATAが空です");
  process.exit(1);
}

const data = JSON.parse(raw);

const issues = data.data.issues.nodes;

const todo = issues.filter(
  i => i.state && i.state.name === "Todo"
);

const inProgress = issues.filter(
  i => i.state && i.state.name === "In Progress"
);

const done = issues.filter(
  i => i.state && i.state.name === "Done"
);

const html = `
<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8">
<title>Linear Dashboard</title>

<style>
body{
  font-family:sans-serif;
  background:#111;
  color:white;
  padding:20px;
}

.board{
  display:flex;
  gap:20px;
}

.column{
  background:#222;
  padding:20px;
  border-radius:16px;
  width:300px;
}

.card{
  background:#333;
  padding:10px;
  margin-bottom:10px;
  border-radius:10px;
}
</style>
</head>

<body>

<h1>📊 Linear Calendar Dashboard</h1>

<div class="board">

<div class="column">
<h2>📝 Todo</h2>
${
  todo.length
    ? todo.map(i => `<div class="card">${i.title}</div>`).join("")
    : "<p>データなし</p>"
}
</div>

<div class="column">
<h2>🚧 In Progress</h2>
${
  inProgress.length
    ? inProgress.map(i => `<div class="card">${i.title}</div>`).join("")
    : "<p>データなし</p>"
}
</div>

<div class="column">
<h2>✅ Done</h2>
${
  done.length
    ? done.map(i => `<div class="card">${i.title}</div>`).join("")
    : "<p>データなし</p>"
}
</div>

</div>

</body>
</html>
`;

fs.mkdirSync("dist", { recursive: true });

fs.writeFileSync("dist/index.html", html);

console.log("HTML生成完了");
