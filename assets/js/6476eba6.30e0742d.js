"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[827],{3905:(e,n,t)=>{t.d(n,{Zo:()=>c,kt:()=>D});var a=t(7294);function C(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function r(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);n&&(a=a.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,a)}return t}function l(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?r(Object(t),!0).forEach((function(n){C(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):r(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function i(e,n){if(null==e)return{};var t,a,C=function(e,n){if(null==e)return{};var t,a,C={},r=Object.keys(e);for(a=0;a<r.length;a++)t=r[a],n.indexOf(t)>=0||(C[t]=e[t]);return C}(e,n);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)t=r[a],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(C[t]=e[t])}return C}var o=a.createContext({}),s=function(e){var n=a.useContext(o),t=n;return e&&(t="function"==typeof e?e(n):l(l({},n),e)),t},c=function(e){var n=s(e.components);return a.createElement(o.Provider,{value:n},e.children)},p="mdxType",d={inlineCode:"code",wrapper:function(e){var n=e.children;return a.createElement(a.Fragment,{},n)}},u=a.forwardRef((function(e,n){var t=e.components,C=e.mdxType,r=e.originalType,o=e.parentName,c=i(e,["components","mdxType","originalType","parentName"]),p=s(t),u=C,D=p["".concat(o,".").concat(u)]||p[u]||d[u]||r;return t?a.createElement(D,l(l({ref:n},c),{},{components:t})):a.createElement(D,l({ref:n},c))}));function D(e,n){var t=arguments,C=n&&n.mdxType;if("string"==typeof e||C){var r=t.length,l=new Array(r);l[0]=u;var i={};for(var o in n)hasOwnProperty.call(n,o)&&(i[o]=n[o]);i.originalType=e,i[p]="string"==typeof e?e:C,l[1]=i;for(var s=2;s<r;s++)l[s]=t[s];return a.createElement.apply(null,l)}return a.createElement.apply(null,t)}u.displayName="MDXCreateElement"},2175:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>o,contentTitle:()=>l,default:()=>d,frontMatter:()=>r,metadata:()=>i,toc:()=>s});var a=t(7462),C=(t(7294),t(3905));const r={id:"usage",title:"Usage",sidebar_label:"Usage"},l=void 0,i={unversionedId:"usage",id:"usage",title:"Usage",description:"Required SelectProvider",source:"@site/docs/usage.md",sourceDirName:".",slug:"/usage",permalink:"/react-native-select-pro/docs/usage",draft:!1,editUrl:"https://github.com/MobileReality/react-native-select-pro/edit/master/website/docs/usage.md",tags:[],version:"current",lastUpdatedBy:"Irek R\xf3g",lastUpdatedAt:1676900693,formattedLastUpdatedAt:"Feb 20, 2023",frontMatter:{id:"usage",title:"Usage",sidebar_label:"Usage"},sidebar:"docs",previous:{title:"Getting started",permalink:"/react-native-select-pro/docs/getting-started"},next:{title:"Select",permalink:"/react-native-select-pro/docs/api/select"}},o={},s=[{value:"Required <code>SelectProvider</code>",id:"required-selectprovider",level:3},{value:"Basic",id:"basic",level:3},{value:"Sections",id:"sections",level:3},{value:"Multiple",id:"multiple",level:3},{value:"Searchable",id:"searchable",level:3},{value:"<code>Select</code> inside <code>Modal</code>",id:"select-inside-modal",level:3}],c={toc:s},p="wrapper";function d(e){let{components:n,...t}=e;return(0,C.kt)(p,(0,a.Z)({},c,t,{components:n,mdxType:"MDXLayout"}),(0,C.kt)("h3",{id:"required-selectprovider"},"Required ",(0,C.kt)("inlineCode",{parentName:"h3"},"SelectProvider")),(0,C.kt)("p",null,"Firstly, wrap your app code in a ",(0,C.kt)("inlineCode",{parentName:"p"},"SelectProvider")," component:"),(0,C.kt)("pre",null,(0,C.kt)("code",{parentName:"pre",className:"language-jsx"},"import React from 'react';\nimport { SelectProvider } from '@mobile-reality/react-native-select-pro';\n\nconst AppRoot = () => {\n    return <SelectProvider>{/* rest of your app code */}</SelectProvider>;\n};\n")),(0,C.kt)("p",null,"Then you can use ",(0,C.kt)("inlineCode",{parentName:"p"},"Select")," component:"),(0,C.kt)("h3",{id:"basic"},"Basic"),(0,C.kt)("div",{style:{height:"700px"},className:"snack-player","data-snack-name":"Basic","data-snack-description":"Example usage","data-snack-files":"%7B%22App.tsx%22%3A%7B%22type%22%3A%22CODE%22%2C%22contents%22%3A%22import%20%7B%20View%2C%20StyleSheet%20%7D%20from%20'react-native'%3B%5Cnimport%20%7B%20Select%2C%20SelectProvider%20%7D%20from%20'%40mobile-reality%2Freact-native-select-pro'%3B%5Cn%5Cnconst%20data%20%3D%20%5B%5Cn%20%20%20%20%7B%5Cn%20%20%20%20%20%20%20%20label%3A%20'Option%201'%2C%5Cn%20%20%20%20%20%20%20%20value%3A%20'option1'%2C%5Cn%20%20%20%20%7D%2C%5Cn%20%20%20%20%7B%5Cn%20%20%20%20%20%20%20%20label%3A%20'Option%202'%2C%5Cn%20%20%20%20%20%20%20%20value%3A%20'option2'%2C%5Cn%20%20%20%20%7D%2C%5Cn%20%20%20%20%7B%5Cn%20%20%20%20%20%20%20%20label%3A%20'Option%203'%2C%5Cn%20%20%20%20%20%20%20%20value%3A%20'option3'%2C%5Cn%20%20%20%20%7D%2C%5Cn%20%20%20%20%7B%5Cn%20%20%20%20%20%20%20%20label%3A%20'Option%204'%2C%5Cn%20%20%20%20%20%20%20%20value%3A%20'option4'%2C%5Cn%20%20%20%20%7D%2C%5Cn%5D%3B%5Cn%5Cnconst%20MyView%20%3D%20()%20%3D%3E%20%7B%5Cn%20%20%20%20return%20(%5Cn%20%20%20%20%20%20%20%20%3CView%20style%3D%7Bstyles.container%7D%3E%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%3CSelect%20options%3D%7Bdata%7D%20%2F%3E%5Cn%20%20%20%20%20%20%20%20%3C%2FView%3E%5Cn%20%20%20%20)%3B%5Cn%7D%3B%5Cn%5Cnconst%20App%20%3D%20()%20%3D%3E%20%7B%5Cn%20%20%20%20return%20(%5Cn%20%20%20%20%20%20%20%20%3CSelectProvider%3E%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%3CMyView%20%2F%3E%5Cn%20%20%20%20%20%20%20%20%3C%2FSelectProvider%3E%5Cn%20%20%20%20)%3B%5Cn%7D%3B%5Cn%5Cnconst%20styles%20%3D%20StyleSheet.create(%7B%5Cn%20%20%20%20container%3A%20%7B%5Cn%20%20%20%20%20%20%20%20flex%3A%201%2C%5Cn%20%20%20%20%20%20%20%20justifyContent%3A%20'center'%2C%5Cn%20%20%20%20%20%20%20%20alignItems%3A%20'center'%2C%5Cn%20%20%20%20%7D%2C%5Cn%7D)%3B%5Cn%5Cnexport%20default%20App%3B%22%7D%7D","data-snack-dependencies":"@mobile-reality/react-native-select-pro@2.0.0","data-snack-supported-platforms":"ios,android","data-snack-theme":"light","data-snack-preview":"true","data-snack-loading":"lazy"}),(0,C.kt)("h3",{id:"sections"},"Sections"),(0,C.kt)("p",null,"Additionally you can pass second available data structure:"),(0,C.kt)("div",{style:{height:"700px"},className:"snack-player","data-snack-name":"Sections","data-snack-description":"Example usage","data-snack-files":"%7B%22App.tsx%22%3A%7B%22type%22%3A%22CODE%22%2C%22contents%22%3A%22import%20%7B%20View%2C%20StyleSheet%20%7D%20from%20'react-native'%3B%5Cnimport%20%7B%20Select%2C%20SelectProvider%20%7D%20from%20'%40mobile-reality%2Freact-native-select-pro'%3B%5Cn%5Cnconst%20data%20%3D%20%5B%5Cn%20%20%20%20%7B%5Cn%20%20%20%20%20%20%20%20title%3A%20'North%20America'%2C%5Cn%20%20%20%20%20%20%20%20data%3A%20%5B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20value%3A%20'us'%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20label%3A%20'United%20States%20of%20America'%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%7D%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20value%3A%20'ca'%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20label%3A%20'Canada'%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%7D%2C%5Cn%20%20%20%20%20%20%20%20%5D%2C%5Cn%20%20%20%20%7D%2C%5Cn%20%20%20%20%7B%5Cn%20%20%20%20%20%20%20%20title%3A%20'Europe'%2C%5Cn%20%20%20%20%20%20%20%20data%3A%20%5B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20value%3A%20'pl'%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20label%3A%20'Poland'%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%7D%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20value%3A%20'es'%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20label%3A%20'Spain'%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%7D%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20value%3A%20'fr'%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20label%3A%20'France'%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%7D%2C%5Cn%20%20%20%20%20%20%20%20%5D%2C%5Cn%20%20%20%20%7D%2C%5Cn%5D%3B%5Cn%5Cnconst%20MyView%20%3D%20()%20%3D%3E%20%7B%5Cn%20%20%20%20return%20(%5Cn%20%20%20%20%20%20%20%20%3CView%20style%3D%7Bstyles.container%7D%3E%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%3CSelect%20options%3D%7Bdata%7D%20%2F%3E%5Cn%20%20%20%20%20%20%20%20%3C%2FView%3E%5Cn%20%20%20%20)%3B%5Cn%7D%3B%5Cn%5Cnconst%20App%20%3D%20()%20%3D%3E%20%7B%5Cn%20%20%20%20return%20(%5Cn%20%20%20%20%20%20%20%20%3CSelectProvider%3E%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%3CMyView%20%2F%3E%5Cn%20%20%20%20%20%20%20%20%3C%2FSelectProvider%3E%5Cn%20%20%20%20)%3B%5Cn%7D%3B%5Cn%5Cnconst%20styles%20%3D%20StyleSheet.create(%7B%5Cn%20%20%20%20container%3A%20%7B%5Cn%20%20%20%20%20%20%20%20flex%3A%201%2C%5Cn%20%20%20%20%20%20%20%20justifyContent%3A%20'center'%2C%5Cn%20%20%20%20%20%20%20%20alignItems%3A%20'center'%2C%5Cn%20%20%20%20%7D%2C%5Cn%7D)%3B%5Cn%5Cnexport%20default%20App%3B%22%7D%7D","data-snack-dependencies":"@mobile-reality/react-native-select-pro@2.0.0","data-snack-supported-platforms":"ios,android","data-snack-theme":"light","data-snack-preview":"true","data-snack-loading":"lazy"}),(0,C.kt)("h3",{id:"multiple"},"Multiple"),(0,C.kt)("p",null,"Use ",(0,C.kt)("inlineCode",{parentName:"p"},"multiple")," prop to allow multiple ",(0,C.kt)("inlineCode",{parentName:"p"},"Select"),":"),(0,C.kt)("div",{style:{height:"700px"},className:"snack-player","data-snack-name":"Multiple","data-snack-description":"Example usage","data-snack-files":"%7B%22App.tsx%22%3A%7B%22type%22%3A%22CODE%22%2C%22contents%22%3A%22import%20%7B%20View%2C%20StyleSheet%20%7D%20from%20'react-native'%3B%5Cnimport%20%7B%20Select%2C%20SelectProvider%20%7D%20from%20'%40mobile-reality%2Freact-native-select-pro'%3B%5Cn%5Cnconst%20data%20%3D%20%5B%5Cn%20%20%20%20%7B%5Cn%20%20%20%20%20%20%20%20label%3A%20'Option%201'%2C%5Cn%20%20%20%20%20%20%20%20value%3A%20'option1'%2C%5Cn%20%20%20%20%7D%2C%5Cn%20%20%20%20%7B%5Cn%20%20%20%20%20%20%20%20label%3A%20'Option%202'%2C%5Cn%20%20%20%20%20%20%20%20value%3A%20'option2'%2C%5Cn%20%20%20%20%7D%2C%5Cn%20%20%20%20%7B%5Cn%20%20%20%20%20%20%20%20label%3A%20'Option%203'%2C%5Cn%20%20%20%20%20%20%20%20value%3A%20'option3'%2C%5Cn%20%20%20%20%7D%2C%5Cn%20%20%20%20%7B%5Cn%20%20%20%20%20%20%20%20label%3A%20'Option%204'%2C%5Cn%20%20%20%20%20%20%20%20value%3A%20'option4'%2C%5Cn%20%20%20%20%7D%2C%5Cn%5D%3B%5Cn%5Cnconst%20MyView%20%3D%20()%20%3D%3E%20%7B%5Cn%20%20%20%20return%20(%5Cn%20%20%20%20%20%20%20%20%3CView%20style%3D%7Bstyles.container%7D%3E%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%3CSelect%20options%3D%7Bdata%7D%20multiple%3D%7Btrue%7D%20%2F%3E%5Cn%20%20%20%20%20%20%20%20%3C%2FView%3E%5Cn%20%20%20%20)%3B%5Cn%7D%3B%5Cn%5Cnconst%20App%20%3D%20()%20%3D%3E%20%7B%5Cn%20%20%20%20return%20(%5Cn%20%20%20%20%20%20%20%20%3CSelectProvider%3E%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%3CMyView%20%2F%3E%5Cn%20%20%20%20%20%20%20%20%3C%2FSelectProvider%3E%5Cn%20%20%20%20)%3B%5Cn%7D%3B%5Cn%5Cnconst%20styles%20%3D%20StyleSheet.create(%7B%5Cn%20%20%20%20container%3A%20%7B%5Cn%20%20%20%20%20%20%20%20flex%3A%201%2C%5Cn%20%20%20%20%20%20%20%20justifyContent%3A%20'center'%2C%5Cn%20%20%20%20%20%20%20%20alignItems%3A%20'center'%2C%5Cn%20%20%20%20%7D%2C%5Cn%7D)%3B%5Cn%5Cnexport%20default%20App%3B%22%7D%7D","data-snack-dependencies":"@mobile-reality/react-native-select-pro@2.0.0","data-snack-supported-platforms":"ios,android","data-snack-theme":"light","data-snack-preview":"true","data-snack-loading":"lazy"}),(0,C.kt)("h3",{id:"searchable"},"Searchable"),(0,C.kt)("p",null,"Use ",(0,C.kt)("inlineCode",{parentName:"p"},"searchble")," prop to allow search in ",(0,C.kt)("inlineCode",{parentName:"p"},"Select"),":"),(0,C.kt)("div",{style:{height:"700px"},className:"snack-player","data-snack-name":"Searchable","data-snack-description":"Example usage","data-snack-files":"%7B%22App.tsx%22%3A%7B%22type%22%3A%22CODE%22%2C%22contents%22%3A%22import%20%7B%20View%2C%20StyleSheet%20%7D%20from%20'react-native'%3B%5Cnimport%20%7B%20Select%2C%20SelectProvider%20%7D%20from%20'%40mobile-reality%2Freact-native-select-pro'%3B%5Cn%5Cnconst%20data%20%3D%20%5B%5Cn%20%20%20%20%7B%5Cn%20%20%20%20%20%20%20%20label%3A%20'Option%201'%2C%5Cn%20%20%20%20%20%20%20%20value%3A%20'option1'%2C%5Cn%20%20%20%20%7D%2C%5Cn%20%20%20%20%7B%5Cn%20%20%20%20%20%20%20%20label%3A%20'Option%202'%2C%5Cn%20%20%20%20%20%20%20%20value%3A%20'option2'%2C%5Cn%20%20%20%20%7D%2C%5Cn%20%20%20%20%7B%5Cn%20%20%20%20%20%20%20%20label%3A%20'Option%203'%2C%5Cn%20%20%20%20%20%20%20%20value%3A%20'option3'%2C%5Cn%20%20%20%20%7D%2C%5Cn%20%20%20%20%7B%5Cn%20%20%20%20%20%20%20%20label%3A%20'Option%204'%2C%5Cn%20%20%20%20%20%20%20%20value%3A%20'option4'%2C%5Cn%20%20%20%20%7D%2C%5Cn%5D%3B%5Cn%5Cnconst%20MyView%20%3D%20()%20%3D%3E%20%7B%5Cn%20%20%20%20return%20(%5Cn%20%20%20%20%20%20%20%20%3CView%20style%3D%7Bstyles.container%7D%3E%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%3CSelect%20options%3D%7Bdata%7D%20searchable%3D%7Btrue%7D%20%2F%3E%5Cn%20%20%20%20%20%20%20%20%3C%2FView%3E%5Cn%20%20%20%20)%3B%5Cn%7D%3B%5Cn%5Cnconst%20App%20%3D%20()%20%3D%3E%20%7B%5Cn%20%20%20%20return%20(%5Cn%20%20%20%20%20%20%20%20%3CSelectProvider%3E%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%3CMyView%20%2F%3E%5Cn%20%20%20%20%20%20%20%20%3C%2FSelectProvider%3E%5Cn%20%20%20%20)%3B%5Cn%7D%3B%5Cn%5Cnconst%20styles%20%3D%20StyleSheet.create(%7B%5Cn%20%20%20%20container%3A%20%7B%5Cn%20%20%20%20%20%20%20%20flex%3A%201%2C%5Cn%20%20%20%20%20%20%20%20justifyContent%3A%20'center'%2C%5Cn%20%20%20%20%20%20%20%20alignItems%3A%20'center'%2C%5Cn%20%20%20%20%7D%2C%5Cn%7D)%3B%5Cn%5Cnexport%20default%20App%3B%22%7D%7D","data-snack-dependencies":"@mobile-reality/react-native-select-pro@2.0.0","data-snack-supported-platforms":"ios,android","data-snack-theme":"light","data-snack-preview":"true","data-snack-loading":"lazy"}),(0,C.kt)("h3",{id:"select-inside-modal"},(0,C.kt)("inlineCode",{parentName:"h3"},"Select")," inside ",(0,C.kt)("inlineCode",{parentName:"h3"},"Modal")),(0,C.kt)("p",null,"If you want to use ",(0,C.kt)("inlineCode",{parentName:"p"},"Select")," component inside:"),(0,C.kt)("ul",null,(0,C.kt)("li",{parentName:"ul"},(0,C.kt)("inlineCode",{parentName:"li"},"Modal")," from ",(0,C.kt)("inlineCode",{parentName:"li"},"react-native")," / ",(0,C.kt)("inlineCode",{parentName:"li"},"react-native-modal")),(0,C.kt)("li",{parentName:"ul"},(0,C.kt)("inlineCode",{parentName:"li"},"BottomSheet")," from ",(0,C.kt)("inlineCode",{parentName:"li"},"react-native-bottom-sheet"))),(0,C.kt)("p",null,"you need to wrap code inside ",(0,C.kt)("inlineCode",{parentName:"p"},"Modal")," / ",(0,C.kt)("inlineCode",{parentName:"p"},"BottomSheet")," in ",(0,C.kt)("inlineCode",{parentName:"p"},"SelectModalProvider"),":"),(0,C.kt)("div",{style:{height:"700px"},className:"snack-player","data-snack-name":"SelectModal","data-snack-description":"Example usage","data-snack-files":"%7B%22App.tsx%22%3A%7B%22type%22%3A%22CODE%22%2C%22contents%22%3A%22import%20%7B%20useState%20%7D%20from%20'react'%3B%5Cnimport%20%7B%20View%2C%20StyleSheet%2C%20Modal%2C%20Button%20%7D%20from%20'react-native'%3B%5Cnimport%20%7B%5Cn%20%20%20%20Select%2C%5Cn%20%20%20%20SelectProvider%2C%5Cn%20%20%20%20SelectModalProvider%2C%5Cn%7D%20from%20'%40mobile-reality%2Freact-native-select-pro'%3B%5Cn%5Cnconst%20data%20%3D%20%5B%5Cn%20%20%20%20%7B%5Cn%20%20%20%20%20%20%20%20label%3A%20'Option%201'%2C%5Cn%20%20%20%20%20%20%20%20value%3A%20'option1'%2C%5Cn%20%20%20%20%7D%2C%5Cn%20%20%20%20%7B%5Cn%20%20%20%20%20%20%20%20label%3A%20'Option%202'%2C%5Cn%20%20%20%20%20%20%20%20value%3A%20'option2'%2C%5Cn%20%20%20%20%7D%2C%5Cn%20%20%20%20%7B%5Cn%20%20%20%20%20%20%20%20label%3A%20'Option%203'%2C%5Cn%20%20%20%20%20%20%20%20value%3A%20'option3'%2C%5Cn%20%20%20%20%7D%2C%5Cn%20%20%20%20%7B%5Cn%20%20%20%20%20%20%20%20label%3A%20'Option%204'%2C%5Cn%20%20%20%20%20%20%20%20value%3A%20'option4'%2C%5Cn%20%20%20%20%7D%2C%5Cn%5D%3B%5Cn%5Cnconst%20MyView%20%3D%20()%20%3D%3E%20%7B%5Cn%20%20%20%20const%20%5Bvisible%2C%20setVisible%5D%20%3D%20useState(false)%3B%5Cn%5Cn%20%20%20%20return%20(%5Cn%20%20%20%20%20%20%20%20%3CView%20style%3D%7Bstyles.container%7D%3E%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%3CButton%20title%3D%5C%22Open%20Modal%5C%22%20onPress%3D%7B()%20%3D%3E%20setVisible(true)%7D%20%2F%3E%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%3CModal%20visible%3D%7Bvisible%7D%3E%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3CSafeAreaProvider%3E%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3CSelectModalProvider%3E%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3CView%20style%3D%7Bstyles.container%7D%3E%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3CButton%20title%3D%5C%22Close%20Modal%5C%22%20onPress%3D%7B()%20%3D%3E%20setVisible(false)%7D%20%2F%3E%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3CSelect%20options%3D%7Bdata%7D%20%2F%3E%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2FView%3E%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2FSelectModalProvider%3E%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2FSafeAreaProvider%3E%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%3C%2FModal%3E%5Cn%20%20%20%20%20%20%20%20%3C%2FView%3E%5Cn%20%20%20%20)%3B%5Cn%7D%3B%5Cn%5Cnconst%20App%20%3D%20()%20%3D%3E%20%7B%5Cn%20%20%20%20return%20(%5Cn%20%20%20%20%20%20%20%20%3CSelectProvider%3E%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%3CMyView%20%2F%3E%5Cn%20%20%20%20%20%20%20%20%3C%2FSelectProvider%3E%5Cn%20%20%20%20)%3B%5Cn%7D%3B%5Cn%5Cnconst%20styles%20%3D%20StyleSheet.create(%7B%5Cn%20%20%20%20container%3A%20%7B%5Cn%20%20%20%20%20%20%20%20flex%3A%201%2C%5Cn%20%20%20%20%20%20%20%20justifyContent%3A%20'center'%2C%5Cn%20%20%20%20%20%20%20%20alignItems%3A%20'center'%2C%5Cn%20%20%20%20%7D%2C%5Cn%7D)%3B%5Cn%5Cnexport%20default%20App%3B%22%7D%7D","data-snack-dependencies":"@mobile-reality/react-native-select-pro@2.0.0","data-snack-supported-platforms":"ios,android","data-snack-theme":"light","data-snack-preview":"true","data-snack-loading":"lazy"}))}d.isMDXComponent=!0}}]);