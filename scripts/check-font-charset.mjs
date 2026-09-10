// public/fonts/pretendard-subset.woff2 는 이 저장소 안에 실제로 등장하는 글자만 담은 서브셋이다.
// 콘텐츠에 새 글자가 들어오면 그 글자는 서브셋에 없어 시스템 폰트로 떨어지는데,
// 육안으로는 잘 안 보인다. 그래서 빌드 전에 여기서 걸러낸다.
//
// 실패하면 public/fonts/README.md 의 재생성 절차를 따르라.
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, extname } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname;
const CHARSET = join(ROOT, "public/fonts/pretendard-charset.txt");

const walk = (dir) =>
  readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });

const sources = [
  ...walk(join(ROOT, "src")).filter((p) => [".ts", ".tsx"].includes(extname(p))),
  join(ROOT, "index.html"),
];

const used = new Set();
for (const file of sources) {
  for (const ch of readFileSync(file, "utf8")) used.add(ch);
}
for (const ch of "\n\r\t") used.delete(ch);

const subset = new Set(readFileSync(CHARSET, "utf8"));
const missing = [...used].filter((ch) => !subset.has(ch)).sort();

if (missing.length) {
  console.error(
    `\n✖ 폰트 서브셋에 없는 글자 ${missing.length}자 — 이대로 배포하면 이 글자만 시스템 폰트로 렌더된다.\n` +
      `  ${missing.join("")}\n\n` +
      `  public/fonts/README.md 의 재생성 절차를 따라 서브셋을 다시 만들어라.\n`,
  );
  process.exit(1);
}

console.log(`✔ 폰트 서브셋 커버리지 OK (${used.size}자)`);
