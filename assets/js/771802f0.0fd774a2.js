"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[437],{3905:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>u});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},l=Object.keys(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var C=a.createContext({}),s=function(e){var t=a.useContext(C),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},p=function(e){var t=s(e.components);return a.createElement(C.Provider,{value:t},e.children)},c="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},m=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,l=e.originalType,C=e.parentName,p=i(e,["components","mdxType","originalType","parentName"]),c=s(n),m=r,u=c["".concat(C,".").concat(m)]||c[m]||d[m]||l;return n?a.createElement(u,o(o({ref:t},p),{},{components:n})):a.createElement(u,o({ref:t},p))}));function u(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var l=n.length,o=new Array(l);o[0]=m;var i={};for(var C in t)hasOwnProperty.call(t,C)&&(i[C]=t[C]);i.originalType=e,i[c]="string"==typeof e?e:r,o[1]=i;for(var s=2;s<l;s++)o[s]=n[s];return a.createElement.apply(null,o)}return a.createElement.apply(null,n)}m.displayName="MDXCreateElement"},722:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>C,contentTitle:()=>o,default:()=>c,frontMatter:()=>l,metadata:()=>i,toc:()=>s});var a=n(7462),r=(n(7294),n(3905));const l={id:"select-modal",title:"SelectModalProvider",sidebar_label:"SelectModalProvider"},o=void 0,i={unversionedId:"api/select-modal",id:"api/select-modal",title:"SelectModalProvider",description:"If you want to use the Select component inside:",source:"@site/docs/api/select-modal.mdx",sourceDirName:"api",slug:"/api/select-modal",permalink:"/react-native-select-pro/docs/api/select-modal",draft:!1,editUrl:"https://github.com/MobileReality/react-native-select-pro/website/docs/api/select-modal.mdx",tags:[],version:"current",lastUpdatedBy:"github-actions[bot]",lastUpdatedAt:1676312941,formattedLastUpdatedAt:"Feb 13, 2023",frontMatter:{id:"select-modal",title:"SelectModalProvider",sidebar_label:"SelectModalProvider"},sidebar:"docs",previous:{title:"SelectProvider",permalink:"/react-native-select-pro/docs/api/select-provider"},next:{title:"React Native Select Pro v2",permalink:"/react-native-select-pro/docs/react-native-select-pro-v2"}},C={},s=[{value:"Basic example",id:"basic-example",level:2},{value:"Props",id:"props",level:2}],p={toc:s};function c(e){let{components:t,...n}=e;return(0,r.kt)("wrapper",(0,a.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("p",null,"If you want to use the ",(0,r.kt)("inlineCode",{parentName:"p"},"Select")," component inside:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"Modal")," from ",(0,r.kt)("inlineCode",{parentName:"li"},"react-native")," / ",(0,r.kt)("inlineCode",{parentName:"li"},"react-native-modal")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"BottomSheet")," from ",(0,r.kt)("inlineCode",{parentName:"li"},"react-native-bottom-sheet"))),(0,r.kt)("p",null,"you need to wrap the code inside the ",(0,r.kt)("inlineCode",{parentName:"p"},"Modal")," / ",(0,r.kt)("inlineCode",{parentName:"p"},"BottomSheet")," in a ",(0,r.kt)("inlineCode",{parentName:"p"},"SelectModalProvider")," component."),(0,r.kt)("h2",{id:"basic-example"},"Basic example"),(0,r.kt)("div",{style:{height:"700px"},className:"snack-player","data-snack-name":"SelectModal","data-snack-description":"Example usage","data-snack-files":"%7B%22App.tsx%22%3A%7B%22type%22%3A%22CODE%22%2C%22contents%22%3A%22%20%20import%20%7B%20View%2C%20Modal%2C%20StyleSheet%2C%20Pressable%2C%20Text%20%7D%20from%20'react-native'%3B%5Cn%20%20import%20%7B%20useState%20%7D%20from%20'react'%3B%5Cn%20%20import%20%7B%20Select%2C%20SelectProvider%2C%20SelectModalProvider%20%7D%20from%20'%40mobile-reality%2Freact-native-select-pro'%3B%5Cn%5Cn%20%20const%20DATA%20%3D%20%5B%5Cn%20%20%20%20%20%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20label%3A%20'Option%201'%2C%5Cn%20%20%20%20%20%20%20%20%20%20value%3A%20'option1'%2C%5Cn%20%20%20%20%20%20%7D%2C%5Cn%20%20%20%20%20%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20label%3A%20'Option%202'%2C%5Cn%20%20%20%20%20%20%20%20%20%20value%3A%20'option2'%2C%5Cn%20%20%20%20%20%20%7D%2C%5Cn%20%20%20%20%20%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20label%3A%20'Option%203'%2C%5Cn%20%20%20%20%20%20%20%20%20%20value%3A%20'option3'%2C%5Cn%20%20%20%20%20%20%7D%2C%5Cn%20%20%20%20%20%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20label%3A%20'Option%204'%2C%5Cn%20%20%20%20%20%20%20%20%20%20value%3A%20'option4'%2C%5Cn%20%20%20%20%20%20%7D%2C%5Cn%20%20%5D%3B%5Cn%5Cn%20%20const%20App%20%3D%20()%20%3D%3E%20%7B%5Cn%20%20%20%20const%20%5BisOpen%2C%20setIsOpen%5D%20%3D%20useState(false)%3B%5Cn%5Cn%20%20%20%20return%20(%5Cn%20%20%20%20%20%20%3CSelectProvider%3E%5Cn%20%20%20%20%20%20%20%20%3CModal%20animationType%3D%5C%22slide%5C%22%20transparent%3D%7Btrue%7D%20visible%3D%7BisOpen%7D%3E%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%3CSelectModalProvider%3E%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3CView%20style%3D%7Bstyles.centeredView%7D%3E%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3CView%20style%3D%7Bstyles.modalView%7D%3E%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3CPressable%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20style%3D%7B%5Bstyles.button%2C%20styles.buttonClose%5D%7D%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20onPress%3D%7B()%20%3D%3E%20setIsOpen(!isOpen)%7D%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3E%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3CText%20style%3D%7Bstyles.textStyle%7D%3EHide%20Modal%3C%2FText%3E%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2FPressable%3E%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3CSelect%20clearable%3D%7Btrue%7D%20options%3D%7BDATA%7D%20%2F%3E%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3CSelect%20clearable%3D%7Btrue%7D%20options%3D%7BDATA%7D%20%2F%3E%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2FView%3E%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2FView%3E%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%3C%2FSelectModalProvider%3E%5Cn%20%20%20%20%20%20%20%20%3C%2FModal%3E%5Cn%5Cn%20%20%20%20%20%20%20%20%3CPressable%5Cn%20%20%20%20%20%20%20%20%20%20%20%20style%3D%7B%5Bstyles.button%2C%20styles.buttonOpen%5D%7D%5Cn%20%20%20%20%20%20%20%20%20%20%20%20onPress%3D%7B()%20%3D%3E%20setIsOpen(true)%7D%5Cn%20%20%20%20%20%20%20%20%3E%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%3CText%20style%3D%7Bstyles.textStyle%7D%3EShow%20Modal%20from%20react-native%3C%2FText%3E%5Cn%20%20%20%20%20%20%20%20%3C%2FPressable%3E%5Cn%20%20%20%20%20%20%3C%2FSelectProvider%3E%5Cn%20%20%20%20)%3B%5Cn%20%20%7D%3B%5Cn%5Cn%20%20%20%20const%20styles%20%3D%20StyleSheet.create(%7B%5Cn%20%20%20%20%20%20%20%20centeredView%3A%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20flex%3A%201%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20justifyContent%3A%20'center'%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20alignItems%3A%20'center'%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20marginTop%3A%2022%2C%5Cn%20%20%20%20%20%20%20%20%7D%2C%5Cn%20%20%20%20%20%20%20%20modalView%3A%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20margin%3A%2020%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20backgroundColor%3A%20'white'%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20borderRadius%3A%2020%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20padding%3A%2035%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20alignItems%3A%20'center'%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20shadowColor%3A%20'%23000'%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20shadowOffset%3A%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20width%3A%200%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20height%3A%202%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%7D%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20shadowOpacity%3A%200.25%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20shadowRadius%3A%204%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20zIndex%3A%200%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20height%3A%20200%2C%5Cn%20%20%20%20%20%20%20%20%7D%2C%5Cn%20%20%20%20%20%20%20%20button%3A%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20borderRadius%3A%2020%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20padding%3A%2010%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20elevation%3A%202%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20marginBottom%3A%208%2C%5Cn%20%20%20%20%20%20%20%20%7D%2C%5Cn%20%20%20%20%20%20%20%20buttonOpen%3A%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20backgroundColor%3A%20'%23F194FF'%2C%5Cn%20%20%20%20%20%20%20%20%7D%2C%5Cn%20%20%20%20%20%20%20%20buttonClose%3A%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20backgroundColor%3A%20'%232196F3'%2C%5Cn%20%20%20%20%20%20%20%20%7D%2C%5Cn%20%20%20%20%20%20%20%20textStyle%3A%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20color%3A%20'white'%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20fontWeight%3A%20'bold'%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20textAlign%3A%20'center'%2C%5Cn%20%20%20%20%20%20%20%20%7D%2C%5Cn%20%20%20%20%7D)%3B%5Cn%5Cn%20%20export%20default%20App%3B%22%7D%7D","data-snack-dependencies":"@mobile-reality/react-native-select-pro@2.0.0","data-snack-supported-platforms":"ios,android","data-snack-theme":"light","data-snack-preview":"true","data-snack-loading":"lazy"}),(0,r.kt)("h2",{id:"props"},"Props"),(0,r.kt)("div",{className:"table-size"},(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Name"),(0,r.kt)("th",{parentName:"tr",align:null},"Type"),(0,r.kt)("th",{parentName:"tr",align:null},"Description"),(0,r.kt)("th",{parentName:"tr",align:null},"Example"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"children")," ",(0,r.kt)("strong",{parentName:"td"},"(required)")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"ReactNode")),(0,r.kt)("td",{parentName:"tr",align:null},"Children elements."),(0,r.kt)("td",{parentName:"tr",align:null}))))))}c.isMDXComponent=!0}}]);