import { Global, css } from "@emotion/react";

const InitStyle = css`
  div,
  span,
  applet,
  object,
  iframe,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  blockquote,
  pre,
  a,
  abbr,
  acronym,
  address,
  big,
  cite,
  code,
  del,
  dfn,
  em,
  img,
  ins,
  kbd,
  q,
  s,
  samp,
  small,
  strike,
  strong,
  sub,
  sup,
  tt,
  var,
  b,
  u,
  i,
  center,
  dl,
  dt,
  dd,
  ol,
  ul,
  li,
  fieldset,
  form,
  label,
  legend,
  table,
  caption,
  tbody,
  tfoot,
  thead,
  tr,
  th,
  td,
  article,
  aside,
  canvas,
  details,
  embed,
  figure,
  figcaption,
  footer,
  header,
  hgroup,
  menu,
  nav,
  output,
  section,
  summary,
  time,
  mark,
  audio,
  video {
    margin: 0;
    padding: 0;
    border: 0;
    vertical-align: baseline;
    font-variant-ligatures: common-ligatures;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
  }

  input,
  textarea,
  button,
  select,
  a {
    text-decoration: none;
    color: inherit;
    -webkit-tap-highlight-color: transparent;
  }

  /* HTML5 display-role reset for older browsers */
  article,
  aside,
  details,
  figcaption,
  figure,
  footer,
  header,
  hgroup,
  menu,
  nav,
  section {
    display: block;
  }

  ol,
  ul {
    list-style: none;
  }

  button {
    cursor: pointer;
    font-family: inherit;
    border: 0;
    background-color: transparent;
  }

  select,
  input,
  button,
  textarea {
    border: 0;
    outline: 0 !important;
  }

  html,
  body {
    padding: 0;
    margin: 0;
    width: 100dvw;
    height: 100dvh;
  }
`;

const CustomStyle = css`
  body {
    margin: 0;
    font-family: "Pretendard", "Noto Sans KR", sans-serif;
  }

  //css 변수
  :root {
    --index--bg: -1;
    --index--header: 50;
    --index--modalCover: 100;
    --index--modalContent: 101;
    --fontWeight--thin: 100;
    --fontWeight--extraLight: 200;
    --fontWeight--light: 300;
    --fontWeight--regular: 400;
    --fontWeight--medium: 500;
    --fontWeight--semiBold: 600;
    --fontWeight--bold: 700;
    --fontWeight--ExtraBold: 800;
    --fontWeight--Black: 900;
  }
`;
//스크롤바

const ScrollbarStyle = css`
  :root {
    --scrollWidth--: 14px;
  }

  html,
  body {
    overflow-y: overlay;
  }

  /* 스크롤바의 폭 너비 */
  ::-webkit-scrollbar {
    width: var(--scrollWidth--);
    height: var(--scrollWidth--);
  }

  /* 스크롤 막대 */
  ::-webkit-scrollbar-thumb {
    outline: none;
    border-radius: 10px;
    box-shadow: inset var(--scrollWidth--) var(--scrollWidth--) 0 rgba(34, 34, 34, 0.15);
    border: 4px solid transparent;
  }

  /* 스크롤 막대 호버 */
  ::-webkit-scrollbar-thumb:hover {
    box-shadow: inset var(--scrollWidth--) var(--scrollWidth--) 0 rgba(34, 34, 34, 0.3);
  }

  /* 스크롤 레일 */
  ::-webkit-scrollbar-track {
    box-shadow: none;
    /* background-color: rgba(34, 34, 34, 0.1); */
    background-color: transparent;
    border-radius: 10px;
  }
`;

const FontStyle = css`
  //Font 지정
  @font-face {
    font-family: "Pretendard";
    font-weight: 900;
    font-display: swap;
    src: local("Pretendard Black"), url("./Pretendard_woff2/Pretendard-Black.woff2") format("woff2"),
      url("./woff/Pretendard-Black.woff") format("woff");
  }

  @font-face {
    font-family: "Pretendard";
    font-weight: 800;
    font-display: swap;
    src: local("Pretendard ExtraBold"), url("./Pretendard_woff2/Pretendard-ExtraBold.woff2") format("woff2"),
      url("./woff/Pretendard-ExtraBold.woff") format("woff");
  }

  @font-face {
    font-family: "Pretendard";
    font-weight: 700;
    font-display: swap;
    src: local("Pretendard Bold"), url("./Pretendard_woff2/Pretendard-Bold.woff2") format("woff2"), url("./woff/Pretendard-Bold.woff") format("woff");
  }

  @font-face {
    font-family: "Pretendard";
    font-weight: 600;
    font-display: swap;
    src: local("Pretendard SemiBold"), url("./Pretendard_woff2/Pretendard-SemiBold.woff2") format("woff2"),
      url("./woff/Pretendard-SemiBold.woff") format("woff");
  }

  @font-face {
    font-family: "Pretendard";
    font-weight: 500;
    font-display: swap;
    src: local("Pretendard Medium"), url("./Pretendard_woff2/Pretendard-Medium.woff2") format("woff2"),
      url("./woff/Pretendard-Medium.woff") format("woff");
  }

  @font-face {
    font-family: "Pretendard";
    font-weight: 400;
    font-display: swap;
    src: local("Pretendard Regular"), url("./Pretendard_woff2/Pretendard-Regular.woff2") format("woff2"),
      url("./woff/Pretendard-Regular.woff") format("woff");
  }

  @font-face {
    font-family: "Pretendard";
    font-weight: 300;
    font-display: swap;
    src: local("Pretendard Light"), url("./Pretendard_woff2/Pretendard-Light.woff2") format("woff2"),
      url("./woff/Pretendard-Light.woff") format("woff");
  }

  @font-face {
    font-family: "Pretendard";
    font-weight: 200;
    font-display: swap;
    src: local("Pretendard ExtraLight"), url("./Pretendard_woff2/Pretendard-ExtraLight.woff2") format("woff2"),
      url("./woff/Pretendard-ExtraLight.woff") format("woff");
  }

  @font-face {
    font-family: "Pretendard";
    font-weight: 100;
    font-display: swap;
    src: local("Pretendard Thin"), url("./Pretendard_woff2/Pretendard-Thin.woff2") format("woff2"), url("./woff/Pretendard-Thin.woff") format("woff");
  }

  .thin {
    font-weight: 100;
  }
  .extraLight {
    font-weight: 200;
  }
  .light {
    font-weight: 300;
  }
  .regular {
    font-weight: 400;
  }
  .medium {
    font-weight: 500;
  }
  .semiBold {
    font-weight: 600;
  }
  .bold {
    font-weight: 700;
  }
  .ExtraBold {
    font-weight: 800;
  }
  .Black {
    font-weight: 900;
  }
`;

const GlobalProvider = () => {
  return <Global styles={[CustomStyle, FontStyle, InitStyle, ScrollbarStyle]} />;
};

export default GlobalProvider;
