# 웹폰트

GitHub Pages 배포라 외부 CDN 의존을 없애려고 직접 호스팅한다. 둘 다 **가변 폰트**이고, 축을 살린 채로 서브셋했다.

| 파일 | 원본 | 크기 | 축 |
|---|---|---|---|
| `pretendard-subset.woff2` | [Pretendard](https://github.com/orioncactus/pretendard) v1.3.9 (OFL) | 128 KB | `wght` 45–930 |
| `fraunces-subset.woff2` | [Fraunces](https://github.com/googlefonts/fraunces) (OFL) | 120 KB | `opsz` 9–144, `wght` 100–900, `SOFT` 0–100, `WONK` 0–1 |

Pretendard 원본은 2.0 MB 다. 저장소에 실제로 등장하는 글자만 남겨 128 KB 로 줄였다.
전체 한글(11,172자)은 2.0 MB, KS X 1001(2,350자)은 431 KB 였다 — 정적 사이트라 쓰는 글자가 고정이므로 가장 작은 쪽을 골랐다.

## 대신 치르는 비용

콘텐츠에 **새 글자**가 들어오면 그 글자만 시스템 폰트로 떨어진다. 눈에 잘 안 띄므로 `scripts/check-font-charset.mjs` 가 이를 검사한다.

```sh
node scripts/check-font-charset.mjs
```

실패하면 아래 절차로 서브셋을 다시 만든다.

## 재생성

```sh
python3 -m venv /tmp/fontenv
/tmp/fontenv/bin/pip install "fonttools[woff]"

# 1) 저장소에 등장하는 글자 목록을 다시 뽑는다
python3 - <<'PY'
import pathlib
root = pathlib.Path(".")
chars = set()
for p in list(root.glob("src/**/*.ts")) + list(root.glob("src/**/*.tsx")) + [root/"index.html"]:
    chars |= set(p.read_text(encoding="utf-8"))
base  = set(chr(c) for c in range(0x20, 0x7F)) | set(chr(c) for c in range(0xA0, 0x100))
base |= set("©®™·…–—‘’“”「」『』〈〉《》←→↑↓×÷±≤≥≠•√℃※〜~")
base |= set("ㄱㄴㄷㄹㅁㅂㅅㅇㅈㅊㅋㅌㅍㅎㅏㅑㅓㅕㅗㅛㅜㅠㅡㅣ")
out = "".join(sorted(c for c in (chars | base) if c not in "\n\r\t"))
pathlib.Path("public/fonts/pretendard-charset.txt").write_text(out, encoding="utf-8")
print(len(out), "glyphs")
PY

# 2) 원본을 받아 서브셋한다
curl -sSL -o /tmp/PretendardVariable.woff2 \
  https://cdn.jsdelivr.net/npm/pretendard@1.3.9/dist/web/variable/woff2/PretendardVariable.woff2
/tmp/fontenv/bin/pyftsubset /tmp/PretendardVariable.woff2 \
  --flavor=woff2 --output-file=public/fonts/pretendard-subset.woff2 \
  --text-file=public/fonts/pretendard-charset.txt
```

Fraunces 는 라틴 헤드라인 전용이라 콘텐츠와 무관하다. 바꿀 일이 있을 때만:

```sh
curl -sSL -o /tmp/Fraunces.ttf \
  'https://raw.githubusercontent.com/google/fonts/main/ofl/fraunces/Fraunces%5BSOFT%2CWONK%2Copsz%2Cwght%5D.ttf'
/tmp/fontenv/bin/pyftsubset /tmp/Fraunces.ttf \
  --flavor=woff2 --output-file=public/fonts/fraunces-subset.woff2 \
  --unicodes="U+0020-007E,U+00A0-00FF,U+2010-2027,U+2030-205E,U+20AC,U+2122"
```
