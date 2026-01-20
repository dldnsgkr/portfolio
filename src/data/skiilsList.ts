// image
import react from "@/assets/icon/icon_react.svg";
import next from "@/assets/icon/icon_next.svg";
import typeScript from "@/assets/icon/icon_typeScript.svg";
import javaScript from "@/assets/icon/icon_javaScript.svg";
import tailwindcss from "@/assets/icon/icon_tailwindcss.svg";
import css3 from "@/assets/icon/icon_css3.svg";
import git from "@/assets/icon/icon_git.svg";
import github from "@/assets/icon/icon_gitHub.svg";
import vscode from "@/assets/icon/icon_vscode.svg";
import prettier from "@/assets/icon/icon_prettier.svg";
import eslint from "@/assets/icon/icon_eslint.svg";
import immer from "@/assets/icon/icon_immer.svg";
import zustand from "@/assets/icon/icon_zustand.svg";
import zod from "@/assets/icon/icon_zod.svg";
import vitejs from "@/assets/icon/icon_vitejs.svg";
import axios from "@/assets/icon/icon_axios.svg";
import reactHookForm from "@/assets/icon/icon_reactHookForm.svg";
import dbeaver from "@/assets/icon/icon_dbeaver.svg";
import npm from "@/assets/icon/icon_npm.svg";
import pnpm from "@/assets/icon/icon_pnpm.svg";
import shadcn from "@/assets/icon/icon_shadcn.svg";
import quill from "@/assets/icon/icon_quill.svg";
import emblaCarouselReact from "@/assets/icon/icon_emblaCarouselReact.svg";
import dateFns from "@/assets/icon/icon_dateFns.svg";
import tanstack from "@/assets/icon/icon_tanstack.svg";
import html5 from "@/assets/icon/icon_html5.svg";
import bun from "@/assets/icon/icon_bun.svg";
import vue from "@/assets/icon/icon_vue.svg";
import pinia from "@/assets/icon/icon_pinia.svg";
import styledComponents from "@/assets/icon/icon_styledComponents.svg";
import framerMotion from "@/assets/icon/icon_framerMotion.svg";
import aws from "@/assets/icon/icon_aws.svg";
import figma from "@/assets/icon/icon_figma.svg";
import gitLab from "@/assets/icon/icon_gitLab.svg";
import java from "@/assets/icon/icon_java.svg";
import eclipse from "@/assets/icon/icon_eclipse.svg";
import mysql from "@/assets/icon/icon_mysql.svg";
import postgreSql from "@/assets/icon/icon_postgreSql.svg";
import postman from "@/assets/icon/icon_postman.svg";
import apache from "@/assets/icon/icon_apache.svg";
import tomcat from "@/assets/icon/icon_tomcat.svg";
import putty from "@/assets/icon/icon_putty.svg";
import python from "@/assets/icon/icon_python.svg";
import sass from "@/assets/icon/icon_sass.svg";
import swiper from "@/assets/icon/icon_swiper.svg";
import selenium from "@/assets/icon/icon_selenium.svg";
import slack from "@/assets/icon/icon_slack.svg";
import thymeleaf from "@/assets/icon/icon_thymeleaf.svg";
import ohMyZsh from "@/assets/icon/icon_ohMyZsh.svg";
import spring from "@/assets/icon/icon_spring.svg";
import swagger from "@/assets/icon/icon_swagger.svg";
import bitbucket from "@/assets/icon/icon_bitbucket.svg";
import linux from "@/assets/icon/icon_linux.svg";
import nginx from "@/assets/icon/icon_nginx.svg";
import jenkins from "@/assets/icon/icon_jenkins.svg";
import notion from "@/assets/icon/icon_notion.svg";

// type
import type { SkillWrapperType } from "@/types/skillsList.types";

export const mainStacksData: SkillWrapperType = {
  mainTit: "Main Stacks",
  subTit: "현재 주력으로 사용하며 프로젝트에 지속적으로 적용 중",
  className: "",
  skillList: [
    {
      imgPath: react,
      imgAlt: "React icon",
      name: "React",
      textDatas: [
        "zustand 기반 전역 UI 상태 관리",
        "Custom Hook을 통한 로직 분리 및 재사용",
        "재사용 가능한 공통 컴포넌트 설계(button, input, modal)",
        "React Hook Form을 이용한 form 상태 및 이벤트 관리",
        "zod를 활용한 schema 기반 validation",
        "환경 변수 분리를 통한 개발 / 운영 환경 설정 경험",
      ],
    },
    {
      imgPath: next,
      imgAlt: "Next icon",
      name: "Next",
      textDatas: [
        "App Router 기반 라우팅 구조 설계",
        "Layout, Template 분리를 통한 공통 UI 구조 관리",
        "tossPayments, kgmobilance 연동 경험",
        "App Router 기반 서버 단에서 API 응답에 따른 처리 로직 구현",
      ],
    },
    {
      imgPath: javaScript,
      imgAlt: "JavaScript icon",
      name: "JavaScript",
      textDatas: [
        "backend API와 연동하는 비동기 처리 경험 (axios, fetch)",
        "이벤트 처리 및 DOM 구조 기반 기능 구현",
        "debounce, throttle 등 공통 util 함수 직접 구현",
      ],
    },
    {
      imgPath: typeScript,
      imgAlt: "TypeScript icon",
      name: "TypeScript",
      textDatas: [
        "컴포넌트, props, API request / response 타입 정의",
        "union, optional, generic 타입을 활용한 재사용 가능한 타입 설계",
      ],
    },
    {
      imgPath: tailwindcss,
      imgAlt: "Tailwindcss icon",
      name: "Tailwindcss",
      textDatas: [
        "pc / mobile 사이즈 기준 반응형 스타일 구성",
        "dark / light 모드에 따른 테마 스타일 적용",
        "utility class 조합을 통한 일관된 UI 스타일 관리",
      ],
    },
    {
      imgPath: css3,
      imgAlt: "CSS3 icon",
      name: "CSS3",
      textDatas: [
        "transition, transform, keyframe을 활용한 UI animation 구현",
        "checkbox, radio 등 form UI 커스텀 스타일링",
      ],
    },
    {
      imgPath: git,
      imgAlt: "Git icon",
      name: "Git",
      textDatas: ["commit, branch, stash 등 기본적인 Git 워크플로우 사용"],
    },
    {
      imgPath: github,
      imgAlt: "Github icon",
      name: "Github",
      textDatas: ["형상 관리 및 gl-page를 이용한 포트폴리오 배포"],
    },
    {
      imgPath: vscode,
      imgAlt: "Vscode icon",
      name: "Vscode",
      textDatas: [
        "주력 개발 도구로 사용",
        "Java(Spring Boot) 프로젝트도 VSCode 환경에서 개발 경험",
      ],
    },
    {
      imgPath: zustand,
      imgAlt: "Zustand icon",
      name: "Zustand",
      textDatas: [
        "전역 상태 관리를 통해 prop drilling 최소화",
        "popup, modal 등 UI 상태 전역 관리",
        "useShallow를 활용해 필요한 state만 구독하여 리렌더링 최적화",
      ],
    },
    {
      imgPath: zod,
      imgAlt: "Zod icon",
      name: "Zod",
      textDatas: [
        "유효성 스키마 구축",
        "react-hook-form과 연계한 validation 및 에러 UI 처리",
      ],
    },
    {
      imgPath: axios,
      imgAlt: "Axios icon",
      name: "Axios",
      textDatas: [
        "API 통신을 위한 HTTP 클라이언트로 사용",
        "request / response 기반 데이터 처리 경험",
      ],
    },
    {
      imgPath: reactHookForm,
      imgAlt: "react-hook-form icon",
      name: "react-hook-form",
      textDatas: ["form 상태 관리 및 submit / validation 이벤트 처리"],
    },
    {
      imgPath: dbeaver,
      imgAlt: "DBeaver icon",
      name: "DBeaver",
      textDatas: [
        "PostgreSQL, MySQL DB 연결",
        "table, schema 생성 및 쿼리 작성",
        "백업 및 데이터 관리 경험",
      ],
    },
    {
      imgPath: shadcn,
      imgAlt: "shadcn icon",
      name: "shadcn",
      textDatas: ["shadcn 기반 공통 UI 컴포넌트 구성 및 커스터마이징"],
    },
    {
      imgPath: quill,
      imgAlt: "react-quill icon",
      name: "react-quill",
      textDatas: ["텍스트 에디터 기능 구현을 위해 사용"],
    },
    {
      imgPath: emblaCarouselReact,
      imgAlt: "Embla-Carousel-React icon",
      name: "Embla-Carousel-React",
      textDatas: ["메인 및 상품 영역 이미지 캐러셀 구현"],
    },
    {
      imgPath: dateFns,
      imgAlt: "date-fns icon",
      name: "date-fns",
      textDatas: ["날짜 데이터 포맷팅 및 계산 처리"],
    },
    {
      imgPath: html5,
      imgAlt: "html5 icon",
      name: "html5",
      textDatas: ["시멘틱 태그 활용", "웹 접근성을 고려한 마크업 구조 작성"],
    },
  ],
};

export const experienceStacksData: SkillWrapperType = {
  mainTit: "Experience Stacks",
  subTit: "실무 및 개인 프로젝트에서 사용 경험이 있는 기술",
  className: "",
  skillList: [
    {
      imgPath: vitejs,
      imgAlt: "Vitejs icon",
      name: "Vitejs",
    },
    {
      imgPath: npm,
      imgAlt: "npm icon",
      name: "npm",
      textDatas: ["패키지 설치 및 스크립트 관리"],
    },
    {
      imgPath: pnpm,
      imgAlt: "pnpm icon",
      name: "pnpm",
      textDatas: ["패키지 설치 및 스크립트 관리"],
    },
    {
      imgPath: tanstack,
      imgAlt: "tanstack-query icon",
      name: "tanstack-query",
      textDatas: [
        "서버 상태 관리 및 API 데이터 캐싱",
        "refetch, staleTime 설정을 통한 네트워크 요청 제어",
      ],
    },
    {
      imgPath: prettier,
      imgAlt: "Prettier icon",
      name: "Prettier",
      textDatas: ["코드 포맷 통일 및 협업 환경 유지"],
    },
    {
      imgPath: eslint,
      imgAlt: "Eslint icon",
      name: "Eslint",
      textDatas: ["코딩 컨벤션 및 잠재적 오류 사전 방지"],
    },
    {
      imgPath: immer,
      imgAlt: "Immer icon",
      name: "Immer",
      textDatas: ["불변성 유지를 위한 상태 업데이트 보조 라이브러리로 사용"],
    },
    {
      imgPath: bun,
      imgAlt: "bun icon",
      name: "bun",
      textDatas: ["런타임 및 패키지 매니저로 사용 경험"],
    },
    {
      imgPath: vue,
      imgAlt: "Vue icon",
      name: "Vue",
      textDatas: ["Vue 기반 프로젝트 구조 및 컴포넌트 작성 경험"],
    },
    {
      imgPath: pinia,
      imgAlt: "pinia icon",
      name: "pinia",
      textDatas: ["Vue 프로젝트에서 전역 상태 관리 경험"],
    },
    {
      imgPath: styledComponents,
      imgAlt: "styled-components icon",
      name: "styled-components",
      textDatas: ["컴포넌트 단위 스타일 관리 경험"],
    },
    {
      imgPath: framerMotion,
      imgAlt: "framer-motion icon",
      name: "framer-motion",
      textDatas: ["페이지 전환 및 UI 인터랙션 애니메이션 구현"],
    },
    {
      name: "clsx",
      textDatas: ["조건부 className 처리를 위한 유틸리티로 사용"],
    },
    {
      imgPath: tanstack,
      imgAlt: "tanstack-router icon",
      name: "tanstack-router",
      textDatas: ["파일 기반이 아닌 선언적 라우팅 구조 경험"],
    },
    {
      imgPath: aws,
      imgAlt: "AWS icon",
      name: "AWS",
      textDatas: ["EC2 서비스 사용 경험", "front 기준 S3 사용 경험"],
    },
    {
      imgPath: figma,
      imgAlt: "Figma icon",
      name: "Figma",
      textDatas: ["디자인 시안 확인 및 UI 구현 참고", "디자이너와 협업 경험"],
    },
    {
      imgPath: gitLab,
      imgAlt: "GitLab icon",
      name: "GitLab",
      textDatas: ["사내 형상 관리 및 이슈 관리 도구로 사용"],
    },
    {
      imgPath: bitbucket,
      imgAlt: "bitbucket icon",
      name: "bitbucket",
      textDatas: ["프로젝트 형상 관리 경험"],
    },
    {
      imgPath: java,
      imgAlt: "Java icon",
      name: "Java",
      textDatas: ["백엔드 로직 구현 및 API 개발 경험"],
    },
    {
      imgPath: spring,
      imgAlt: "spring/spring boot icon",
      name: "spring/spring boot",
      textDatas: ["REST API 서버 구성 경험"],
    },
    {
      imgPath: eclipse,
      imgAlt: "Eclipse icon",
      name: "Eclipse",
      textDatas: ["Java / Spring 개발 환경으로 사용"],
    },
    {
      imgPath: mysql,
      imgAlt: "Mysql icon",
      name: "Mysql",
      textDatas: [
        "테이블 설계 및 기본 CRUD 쿼리 작성",
        "백업 스크립트 및 주기 작성",
      ],
    },
    {
      imgPath: postgreSql,
      imgAlt: "postgreSql icon",
      name: "postgreSql",
      textDatas: [
        "테이블 설계 및 기본 CRUD 쿼리 작성",
        "백업 스크립트 및 주기 작성",
      ],
    },
    {
      imgPath: postman,
      imgAlt: "postman icon",
      name: "postman",
      textDatas: ["API 테스트 및 응답 확인"],
    },
    {
      imgPath: apache,
      imgAlt: "Apache icon",
      name: "Apache",
      textDatas: ["서버 구조 이해 및 웹 환경 경험"],
    },
    {
      imgPath: tomcat,
      imgAlt: "tomcat icon",
      name: "tomcat",
      textDatas: ["서버 구조 이해 및 WAS 환경 경험"],
    },
    {
      imgPath: putty,
      imgAlt: "putty icon",
      name: "putty",
      textDatas: ["원격 서버 접속 및 서버 관리 경험"],
    },
    {
      imgPath: python,
      imgAlt: "python icon",
      name: "python",
      textDatas: ["간단한 스크립트 및 자동화 작업 경험(크롤링)"],
    },
    {
      imgPath: sass,
      imgAlt: "Sass icon",
      name: "Sass",
      textDatas: ["중첩, 변수 등을 활용한 스타일 관리 경험"],
    },
    {
      imgPath: swiper,
      imgAlt: "swiper icon",
      name: "swiper",
      textDatas: ["슬라이드 UI 구현 경험"],
    },
    {
      imgPath: selenium,
      imgAlt: "selenium icon",
      name: "selenium",
      textDatas: ["브라우저 자동화 및 테스트 도구 사용 경험"],
    },
    {
      imgPath: slack,
      imgAlt: "slack icon",
      name: "slack",
      textDatas: ["팀 커뮤니케이션 도구로 사용"],
    },
    {
      imgPath: notion,
      imgAlt: "notion icon",
      name: "notion",
      textDatas: ["업무 정리 및 문서 관리", "자기 개발 기록"],
    },
    {
      imgPath: thymeleaf,
      imgAlt: "thymeleaf icon",
      name: "thymeleaf",
      textDatas: ["Spring 기반 서버 사이드 템플릿 사용 경험"],
    },
    {
      imgPath: ohMyZsh,
      imgAlt: "ohMyZsh icon",
      name: "ohMyZsh",
      textDatas: ["개발 환경 편의를 위한 터미널 커스터마이징"],
    },
    {
      imgPath: swagger,
      imgAlt: "swagger icon",
      name: "swagger",
      textDatas: [
        "REST API 명세 문서 확인 및 테스트 용도로 사용",
        "프론트엔드 개발 시 API 스펙 이해에 활용",
      ],
    },
    {
      // imgPath: toss,
      // imgAlt: "tosspayments icon",
      name: "tosspayments",
      textDatas: ["결제 API 연동 경험", "결제 결과에 따른 분기 처리 로직 구현"],
    },
    {
      name: "kgmobilance",
      textDatas: [
        "결제 API 연동 경험",
        "결제 결과에 따른 분기 처리 로직 구현",
        "본인인증 로직 구현",
      ],
    },
    {
      imgPath: jenkins,
      imgAlt: "jenkins icon",
      name: "jenkins",
      textDatas: [
        "CI/CD 파이프라인 개념 이해",
        "빌드 및 배포 자동화 흐름 경험",
      ],
    },
    {
      imgPath: linux,
      imgAlt: "linux icon",
      name: "linux",
      textDatas: [
        "리눅스 서버 환경에서의 기본 명령어 사용",
        "직접적인 프로젝트 배포 경험",
        "주기적으로 돌아가는 백업 및 크로링 script 설정(crontab)",
      ],
    },
    {
      imgPath: nginx,
      imgAlt: "nginx icon",
      name: "nginx",
      textDatas: ["프론트엔드 전용 서버 설정 경험"],
    },
  ],
};
