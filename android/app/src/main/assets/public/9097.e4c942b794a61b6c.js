"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[9097],{9097:(x,f,a)=>{a.r(f),a.d(f,{ion_icon:()=>p});var s=a(6590);let d;const u=(t,e,i,o,n)=>(i="ios"===(i&&c(i))?"ios":"md",o&&"ios"===i?t=c(o):n&&"md"===i?t=c(n):(!t&&e&&!g(e)&&(t=e),l(t)&&(t=c(t))),l(t)&&""!==t.trim()&&""===t.replace(/[a-z]|-|\d/gi,"")?t:null),h=t=>l(t)&&(t=t.trim(),g(t))?t:null,g=t=>t.length>0&&/(\/|\.)/.test(t),l=t=>"string"==typeof t,c=t=>t.toLowerCase(),b=t=>{if(1===t.nodeType){if("script"===t.nodeName.toLowerCase())return!1;for(let e=0;e<t.attributes.length;e++){const i=t.attributes[e].value;if(l(i)&&0===i.toLowerCase().indexOf("on"))return!1}for(let e=0;e<t.childNodes.length;e++)if(!b(t.childNodes[e]))return!1}return!0},r=new Map,v=new Map,p=class{constructor(t){(0,s.r)(this,t),this.iconName=null,this.inheritedAttributes={},this.isVisible=!1,this.mode=L(),this.lazy=!1,this.sanitize=!0,this.hasAriaHidden=()=>{const{el:e}=this;return e.hasAttribute("aria-hidden")&&"true"===e.getAttribute("aria-hidden")}}componentWillLoad(){this.inheritedAttributes=((t,e=[])=>{const i={};return e.forEach(o=>{t.hasAttribute(o)&&(null!==t.getAttribute(o)&&(i[o]=t.getAttribute(o)),t.removeAttribute(o))}),i})(this.el,["aria-label"])}connectedCallback(){this.waitUntilVisible(this.el,"50px",()=>{this.isVisible=!0,this.loadIcon()})}disconnectedCallback(){this.io&&(this.io.disconnect(),this.io=void 0)}waitUntilVisible(t,e,i){if(this.lazy&&typeof window<"u"&&window.IntersectionObserver){const o=this.io=new window.IntersectionObserver(n=>{n[0].isIntersecting&&(o.disconnect(),this.io=void 0,i())},{rootMargin:e});o.observe(t)}else i()}loadIcon(){if(this.isVisible){const e=(t=>{let e=h(t.src);return e||(e=u(t.name,t.icon,t.mode,t.ios,t.md),e?(t=>{const e=(()=>{if(typeof window>"u")return new Map;if(!d){const t=window;t.Ionicons=t.Ionicons||{},d=t.Ionicons.map=t.Ionicons.map||new Map}return d})().get(t);return e||(0,s.a)(`svg/${t}.svg`)})(e):t.icon&&(e=h(t.icon),e||(e=h(t.icon[t.mode]),e))?e:null)})(this);e&&(r.has(e)?this.svgContent=r.get(e):((t,e)=>{let i=v.get(t);if(!i){if(!(typeof fetch<"u"&&typeof document<"u"))return r.set(t,""),Promise.resolve();i=fetch(t).then(o=>{if(o.ok)return o.text().then(n=>{n&&!1!==e&&(n=(t=>{const e=document.createElement("div");e.innerHTML=t;for(let o=e.childNodes.length-1;o>=0;o--)"svg"!==e.childNodes[o].nodeName.toLowerCase()&&e.removeChild(e.childNodes[o]);const i=e.firstElementChild;if(i&&"svg"===i.nodeName.toLowerCase()){const o=i.getAttribute("class")||"";if(i.setAttribute("class",(o+" s-ion-icon").trim()),b(i))return e.innerHTML}return""})(n)),r.set(t,n||"")});r.set(t,"")}),v.set(t,i)}return i})(e,this.sanitize).then(()=>this.svgContent=r.get(e)))}const t=this.iconName=u(this.name,this.icon,this.mode,this.ios,this.md);t&&(this.ariaLabel=t.replace(/\-/g," "))}render(){const{iconName:t,ariaLabel:e,inheritedAttributes:i}=this,o=this.mode||"md",n=this.flipRtl||t&&(t.indexOf("arrow")>-1||t.indexOf("chevron")>-1)&&!1!==this.flipRtl;return(0,s.h)(s.H,Object.assign({"aria-label":void 0===e||this.hasAriaHidden()?null:e,role:"img",class:Object.assign(Object.assign({[o]:!0},M(this.color)),{[`icon-${this.size}`]:!!this.size,"flip-rtl":!!n&&"rtl"===this.el.ownerDocument.dir})},i),(0,s.h)("div",this.svgContent?{class:"icon-inner",innerHTML:this.svgContent}:{class:"icon-inner"}))}static get assetsDirs(){return["svg"]}get el(){return(0,s.g)(this)}static get watchers(){return{name:["loadIcon"],src:["loadIcon"],icon:["loadIcon"]}}},L=()=>typeof document<"u"&&document.documentElement.getAttribute("mode")||"md",M=t=>t?{"ion-color":!0,[`ion-color-${t}`]:!0}:null;p.style=":host{display:inline-block;width:1em;height:1em;contain:strict;fill:currentColor;box-sizing:content-box !important}:host .ionicon{stroke:currentColor}.ionicon-fill-none{fill:none}.ionicon-stroke-width{stroke-width:32px;stroke-width:var(--ionicon-stroke-width, 32px)}.icon-inner,.ionicon,svg{display:block;height:100%;width:100%}:host(.flip-rtl) .icon-inner{transform:scaleX(-1)}:host(.icon-small){font-size:18px !important}:host(.icon-large){font-size:32px !important}:host(.ion-color){color:var(--ion-color-base) !important}:host(.ion-color-primary){--ion-color-base:var(--ion-color-primary, #3880ff)}:host(.ion-color-secondary){--ion-color-base:var(--ion-color-secondary, #0cd1e8)}:host(.ion-color-tertiary){--ion-color-base:var(--ion-color-tertiary, #f4a942)}:host(.ion-color-success){--ion-color-base:var(--ion-color-success, #10dc60)}:host(.ion-color-warning){--ion-color-base:var(--ion-color-warning, #ffce00)}:host(.ion-color-danger){--ion-color-base:var(--ion-color-danger, #f14141)}:host(.ion-color-light){--ion-color-base:var(--ion-color-light, #f4f5f8)}:host(.ion-color-medium){--ion-color-base:var(--ion-color-medium, #989aa2)}:host(.ion-color-dark){--ion-color-base:var(--ion-color-dark, #222428)}"}}]);