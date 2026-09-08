export type ProfileLink = {
  label: string;
  href: string;
  external?: boolean;
};

// href 가 빈 문자열인 링크는 Hero 에서 렌더되지 않는다.
// 없는 값을 지어내는 대신 빈 슬롯을 두고, 값이 생기면 여기만 채우면 된다.
export const profile = {
  name: "이운학",
  alias: "Jace",
  links: [
    {
      label: "GitHub",
      href: "https://github.com/dldnsgkr",
      external: true,
    },
    {
      // 출처: src/components/Footer.tsx (저장소에 이미 있던 값)
      label: "Email",
      href: "mailto:dldnsgkr3326@gmail.com",
    },
    {
      // TODO: 이력서 URL 미정 — 값이 없으면 렌더되지 않는다.
      label: "이력서",
      href: "",
      external: true,
    },
  ] satisfies ProfileLink[],
};
