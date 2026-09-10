// 테마를 바꾸는 유일한 창구.
//
// 이전에는 Header 가 자기 useState 로 테마를 들고 있었다. 그래서 다른 곳에서
// documentElement 의 클래스만 바꾸면 Header 의 스위치가 실제 테마와 어긋났다.
// 지금은 진실이 클래스 하나뿐이고(useIsDark 가 그걸 관찰한다), 쓰는 쪽은 여기다.
// index.html 의 프리페인트 스크립트도 같은 키를 읽는다.

export function setTheme(dark: boolean) {
  document.documentElement.classList.toggle("dark", dark);
  try {
    localStorage.setItem("theme", dark ? "dark" : "light");
  } catch {
    // localStorage 차단 환경 — 이번 세션에만 적용되고 기억되지 않는다
  }
}

export function toggleTheme() {
  setTheme(!document.documentElement.classList.contains("dark"));
}
