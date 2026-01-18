// image
import react from "@/assets/icon/icon_react.svg";
import next from "@/assets/icon/icon_next.svg";
import typeScript from "@/assets/icon/icon_typeScript.svg";
import javaScript from "@/assets/icon/icon_javaScript.svg";
import tailwindcss from "@/assets/icon/icon_tailwindcss.svg";
import css3 from "@/assets/icon/icon_css3.svg";
import git from "@/assets/icon/icon_git.svg";
import vscode from "@/assets/icon/icon_vscode.svg";
import prettier from "@/assets/icon/icon_prettier.svg";
import eslint from "@/assets/icon/icon_eslint.svg";
import immer from "@/assets/icon/icon_immer.svg";
import zustand from "@/assets/icon/icon_zustand.svg";
import zod from "@/assets/icon/icon_zod.svg";
import vitejs from "@/assets/icon/icon_vitejs.svg";
import axios from "@/assets/icon/icon_axios.svg";
import reactHookrForm from "@/assets/icon/icon_reactHookForm.svg";
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
  secTit: "Main Stacks",
  subTit: "현재 주력으로 사용하며 프로젝트에 지속적으로 적용 중",
  className: "",
  skillList: [
    {
      imgPath: react,
      imgAlt: "React icon",
      name: "React",
      textDatas: [
        "zustand 기반 전역 상태",
        "Custom Hook 사용 가능",
        "재사용 가능 공통 컴포넌트 설계(button, input, modal)",
        "React Hook Form을 이용한 form 관리",
        "zod를 활용한 schema validation",
        "환경 변수를 이용한 환경별 값 설정",
      ],
    },
    {
      imgPath: next,
      imgAlt: "Next icon",
      name: "Next",
      textDatas: [
        "App router 기반의 라우팅 구조",
        "Layout, template을 분리 하여 설계",
        "tossPayments, kgmobilance 와 연동하며 App Router 기반 서버 단에서 API 응답에 따른 처리",
      ],
    },
    {
      imgPath: javaScript,
      imgAlt: "JavaScript icon",
      name: "JavaScript",
      textDatas: [
        "backend API와 연결되는 API 연동 경험(axios, fetch)",
        "이벤트 처리, DOM 구조에 대한 기능 함수 구현",
        "주로 사용하는 공통 util 함수(debounce, throttle, etc..) 등을 구현",
      ],
    },
    {
      imgPath: typeScript,
      imgAlt: "TypeScript icon",
      name: "TypeScript",
      textDatas: [
        "각 컴포넌트, props, API request, response 등에 대한 타입 정의",
        "Union, optional, generic 타입을 활용해 재사용 type 작성",
      ],
    },
    {
      imgPath: tailwindcss,
      imgAlt: "Tailwindcss icon",
      name: "Tailwindcss",
    },
    {
      imgPath: css3,
      imgAlt: "CSS3 icon",
      name: "CSS3",
    },
    {
      imgPath: git,
      imgAlt: "Git icon",
      name: "Git",
    },
    {
      imgPath: vscode,
      imgAlt: "Vscode icon",
      name: "Vscode",
    },
    {
      imgPath: zustand,
      imgAlt: "Zustand icon",
      name: "Zustand",
    },
    {
      imgPath: zod,
      imgAlt: "Zod icon",
      name: "Zod",
    },
    {
      imgPath: vitejs,
      imgAlt: "Vitejs icon",
      name: "Vitejs",
    },
    {
      imgPath: axios,
      imgAlt: "Axios icon",
      name: "Axios",
    },
    {
      imgPath: reactHookrForm,
      imgAlt: "react-hook-form icon",
      name: "react-hook-form",
    },
    {
      imgPath: dbeaver,
      imgAlt: "DBeaver icon",
      name: "DBeaver",
    },
    {
      imgPath: shadcn,
      imgAlt: "shadcn icon",
      name: "shadcn",
    },
    {
      imgPath: quill,
      imgAlt: "react-quill icon",
      name: "react-quill",
    },
    {
      imgPath: emblaCarouselReact,
      imgAlt: "Embla-Carousel-React icon",
      name: "Embla-Carousel-React",
    },
    {
      imgPath: dateFns,
      imgAlt: "date-fns icon",
      name: "date-fns",
    },
    {
      imgPath: html5,
      imgAlt: "html5 icon",
      name: "html5",
    },
  ],
};

export const experienceStacksData: SkillWrapperType = {
  secTit: "Experience Stacks",
  subTit: "실무 및 개인 프로젝트에서 사용 경험이 있는 기술",
  className: "",
  skillList: [
    {
      imgPath: npm,
      imgAlt: "npm icon",
      name: "npm",
    },
    {
      imgPath: pnpm,
      imgAlt: "pnpm icon",
      name: "pnpm",
    },
    {
      imgPath: tanstack,
      imgAlt: "tanstack-query icon",
      name: "tanstack-query",
    },
    {
      imgPath: prettier,
      imgAlt: "Prettier icon",
      name: "Prettier",
    },
    {
      imgPath: eslint,
      imgAlt: "Eslint icon",
      name: "Eslint",
    },
    {
      imgPath: immer,
      imgAlt: "Immer icon",
      name: "Immer",
    },
    {
      imgPath: bun,
      imgAlt: "bun icon",
      name: "bun",
    },
    {
      imgPath: vue,
      imgAlt: "Vue icon",
      name: "Vue",
    },
    {
      imgPath: pinia,
      imgAlt: "pinia icon",
      name: "pinia",
    },
    {
      imgPath: styledComponents,
      imgAlt: "styled-components icon",
      name: "styled-components",
    },
    {
      imgPath: framerMotion,
      imgAlt: "framer-motion icon",
      name: "framer-motion",
    },
    {
      name: "clsx",
    },
    {
      imgPath: tanstack,
      imgAlt: "tanstack-router icon",
      name: "tanstack-router",
    },
    {
      imgPath: aws,
      imgAlt: "AWS icon",
      name: "AWS",
    },
    {
      imgPath: figma,
      imgAlt: "Figma icon",
      name: "Figma",
    },
    {
      imgPath: gitLab,
      imgAlt: "GitLab icon",
      name: "GitLab",
    },
    {
      imgPath: java,
      imgAlt: "Java icon",
      name: "Java",
    },
    {
      imgPath: eclipse,
      imgAlt: "Eclipse icon",
      name: "Eclipse",
    },
    {
      imgPath: mysql,
      imgAlt: "Mysql icon",
      name: "Mysql",
    },
    {
      imgPath: postgreSql,
      imgAlt: "postgreSql icon",
      name: "postgreSql",
    },
    {
      imgPath: postman,
      imgAlt: "postman icon",
      name: "postman",
    },
    {
      imgPath: apache,
      imgAlt: "Apache icon",
      name: "Apache",
    },
    {
      imgPath: tomcat,
      imgAlt: "tomcat icon",
      name: "tomcat",
    },
    {
      imgPath: putty,
      imgAlt: "putty icon",
      name: "putty",
    },
    {
      imgPath: python,
      imgAlt: "python icon",
      name: "python",
    },
    {
      imgPath: sass,
      imgAlt: "Sass icon",
      name: "Sass",
    },
    {
      imgPath: swiper,
      imgAlt: "swiper icon",
      name: "swiper",
    },
    {
      imgPath: selenium,
      imgAlt: "selenium icon",
      name: "selenium",
    },
    {
      imgPath: slack,
      imgAlt: "slack icon",
      name: "slack",
    },
    {
      imgPath: thymeleaf,
      imgAlt: "thymeleaf icon",
      name: "thymeleaf",
    },
    {
      imgPath: ohMyZsh,
      imgAlt: "ohMyZsh icon",
      name: "ohMyZsh",
    },
    {
      imgPath: spring,
      imgAlt: "spring/spring boot icon",
      name: "spring/spring boot",
    },
    {
      imgPath: swagger,
      imgAlt: "swagger icon",
      name: "swagger boot",
    },
    {
      imgPath: bitbucket,
      imgAlt: "bitbucket icon",
      name: "bitbucket",
    },
    {
      // imgPath: toss,
      // imgAlt: "tosspayments icon",
      name: "tosspayments",
    },
    {
      name: "kgmobilance",
    },
    {
      imgPath: jenkins,
      imgAlt: "jenkins icon",
      name: "jenkins",
    },
    {
      imgPath: linux,
      imgAlt: "linux icon",
      name: "linux",
    },
    {
      imgPath: nginx,
      imgAlt: "nginx icon",
      name: "nginx",
    },
    {
      imgPath: notion,
      imgAlt: "notion icon",
      name: "notion",
    },
  ],
};
