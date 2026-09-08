// 로컬에서 `pnpm run deploy` 를 돌릴 때, 커밋·push 되지 않은 코드가 배포되는 것을 막는다.
//
// 이 스크립트가 생긴 이유: deploy 가 dist 만 gh-pages 로 올리고 소스는 push 하지 않아,
// 2026-06-18 에 배포된 변경(b8c13c2)이 main 에는 3개월간 올라가지 않은 채 어긋나 있었다.
import { execSync } from "node:child_process";

const run = (cmd) => execSync(cmd, { encoding: "utf8" }).trim();
const fail = (msg) => {
  console.error(`\n✖ 배포 중단 — ${msg}\n`);
  process.exit(1);
};

if (run("git rev-parse --abbrev-ref HEAD") !== "main") {
  fail(`main 브랜치가 아니다 (현재: ${run("git rev-parse --abbrev-ref HEAD")}).`);
}

if (run("git status --porcelain")) {
  fail(
    "커밋되지 않은 변경이 있다. 먼저 커밋하라 — 그러지 않으면 main 에 없는 코드가 배포된다.\n" +
      run("git status --short"),
  );
}

run("git fetch origin main --quiet");
const ahead = run("git log origin/main..HEAD --oneline");
if (ahead) {
  fail(`push 되지 않은 커밋이 있다. 먼저 push 하라.\n${ahead}`);
}

console.log("✔ main 이 origin 과 같다 — 배포를 진행한다.");
