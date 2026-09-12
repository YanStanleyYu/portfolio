import { createGlobalStyle } from "styled-components";

export const globalStyleText = String.raw`
:root {
  font-family: "DM Sans", Arial, sans-serif;
  color: #071624;
  background: #f4f7f8;
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

* { box-sizing: border-box; }
html {
  width: 100%;
  max-width: 100%;
  overflow-x: hidden;
  overflow-x: clip;
  scroll-behavior: smooth;
}
body {
  width: 100%;
  max-width: 100%;
  min-width: 0;
  margin: 0;
  overflow-x: hidden;
  overflow-x: clip;
}
#root { width: 100%; max-width: 100%; overflow-x: hidden; overflow-x: clip; }
button, a { font: inherit; }

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
}
`;

export const GlobalStyles = createGlobalStyle`${globalStyleText}`;
