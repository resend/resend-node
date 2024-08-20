"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/@react-email+font@0.0.7_react@18.3.1";
exports.ids = ["vendor-chunks/@react-email+font@0.0.7_react@18.3.1"];
exports.modules = {

/***/ "(api)/./transactional/node_modules/.pnpm/@react-email+font@0.0.7_react@18.3.1/node_modules/@react-email/font/dist/index.mjs":
/*!*****************************************************************************************************************************!*\
  !*** ./transactional/node_modules/.pnpm/@react-email+font@0.0.7_react@18.3.1/node_modules/@react-email/font/dist/index.mjs ***!
  \*****************************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Font: () => (/* binding */ Font)\n/* harmony export */ });\n/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ \"react/jsx-runtime\");\n// src/font.tsx\n\nvar Font = ({\n  fontFamily,\n  fallbackFontFamily,\n  webFont,\n  fontStyle = \"normal\",\n  fontWeight = 400\n}) => {\n  const src = webFont ? `src: url(${webFont.url}) format('${webFont.format}');` : \"\";\n  const style = `\n    @font-face {\n      font-family: '${fontFamily}';\n      font-style: ${fontStyle};\n      font-weight: ${fontWeight};\n      mso-font-alt: '${Array.isArray(fallbackFontFamily) ? fallbackFontFamily[0] : fallbackFontFamily}';\n      ${src}\n    }\n\n    * {\n      font-family: '${fontFamily}', ${Array.isArray(fallbackFontFamily) ? fallbackFontFamily.join(\", \") : fallbackFontFamily};\n    }\n  `;\n  return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(\"style\", { dangerouslySetInnerHTML: { __html: style } });\n};\nFont.displayName = \"Font\";\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi90cmFuc2FjdGlvbmFsL25vZGVfbW9kdWxlcy8ucG5wbS9AcmVhY3QtZW1haWwrZm9udEAwLjAuN19yZWFjdEAxOC4zLjEvbm9kZV9tb2R1bGVzL0ByZWFjdC1lbWFpbC9mb250L2Rpc3QvaW5kZXgubWpzIiwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7QUFDd0M7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELG9DQUFvQyxZQUFZLFlBQVksZUFBZSxHQUFHO0FBQzlFO0FBQ0E7QUFDQSxzQkFBc0IsV0FBVztBQUNqQyxvQkFBb0I7QUFDcEIscUJBQXFCO0FBQ3JCLHVCQUF1QiwrRUFBK0U7QUFDdEcsUUFBUTtBQUNSOztBQUVBO0FBQ0Esc0JBQXNCLFdBQVcsS0FBSztBQUN0QztBQUNBO0FBQ0EseUJBQXlCLHNEQUFHLFlBQVksMkJBQTJCLGlCQUFpQjtBQUNwRjtBQUNBO0FBR0UiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93aXRoLXJlYWN0LWVtYWlsLy4vdHJhbnNhY3Rpb25hbC9ub2RlX21vZHVsZXMvLnBucG0vQHJlYWN0LWVtYWlsK2ZvbnRAMC4wLjdfcmVhY3RAMTguMy4xL25vZGVfbW9kdWxlcy9AcmVhY3QtZW1haWwvZm9udC9kaXN0L2luZGV4Lm1qcz8zZmE5Il0sInNvdXJjZXNDb250ZW50IjpbIi8vIHNyYy9mb250LnRzeFxuaW1wb3J0IHsganN4IH0gZnJvbSBcInJlYWN0L2pzeC1ydW50aW1lXCI7XG52YXIgRm9udCA9ICh7XG4gIGZvbnRGYW1pbHksXG4gIGZhbGxiYWNrRm9udEZhbWlseSxcbiAgd2ViRm9udCxcbiAgZm9udFN0eWxlID0gXCJub3JtYWxcIixcbiAgZm9udFdlaWdodCA9IDQwMFxufSkgPT4ge1xuICBjb25zdCBzcmMgPSB3ZWJGb250ID8gYHNyYzogdXJsKCR7d2ViRm9udC51cmx9KSBmb3JtYXQoJyR7d2ViRm9udC5mb3JtYXR9Jyk7YCA6IFwiXCI7XG4gIGNvbnN0IHN0eWxlID0gYFxuICAgIEBmb250LWZhY2Uge1xuICAgICAgZm9udC1mYW1pbHk6ICcke2ZvbnRGYW1pbHl9JztcbiAgICAgIGZvbnQtc3R5bGU6ICR7Zm9udFN0eWxlfTtcbiAgICAgIGZvbnQtd2VpZ2h0OiAke2ZvbnRXZWlnaHR9O1xuICAgICAgbXNvLWZvbnQtYWx0OiAnJHtBcnJheS5pc0FycmF5KGZhbGxiYWNrRm9udEZhbWlseSkgPyBmYWxsYmFja0ZvbnRGYW1pbHlbMF0gOiBmYWxsYmFja0ZvbnRGYW1pbHl9JztcbiAgICAgICR7c3JjfVxuICAgIH1cblxuICAgICoge1xuICAgICAgZm9udC1mYW1pbHk6ICcke2ZvbnRGYW1pbHl9JywgJHtBcnJheS5pc0FycmF5KGZhbGxiYWNrRm9udEZhbWlseSkgPyBmYWxsYmFja0ZvbnRGYW1pbHkuam9pbihcIiwgXCIpIDogZmFsbGJhY2tGb250RmFtaWx5fTtcbiAgICB9XG4gIGA7XG4gIHJldHVybiAvKiBAX19QVVJFX18gKi8ganN4KFwic3R5bGVcIiwgeyBkYW5nZXJvdXNseVNldElubmVySFRNTDogeyBfX2h0bWw6IHN0eWxlIH0gfSk7XG59O1xuRm9udC5kaXNwbGF5TmFtZSA9IFwiRm9udFwiO1xuZXhwb3J0IHtcbiAgRm9udFxufTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(api)/./transactional/node_modules/.pnpm/@react-email+font@0.0.7_react@18.3.1/node_modules/@react-email/font/dist/index.mjs\n");

/***/ })

};
;