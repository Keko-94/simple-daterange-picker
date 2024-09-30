(()=>{var t,e={794:(t,e,r)=>{"use strict";const n=Vue;var a={class:"relative"},i=(0,n.createElementVNode)("input",{type:"text",class:"hidden"},null,-1),o=["id","dusk","value","placeholder"],s={key:0,class:"absolute top-0 right-0 mt-1 mr-1"},u=[(0,n.createElementVNode)("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor",class:"w-6 h-6"},[(0,n.createElementVNode)("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M6 18 18 6M6 6l12 12"})],-1)];var l=r(221),c=r.n(l);const f={emits:["change"],props:{resourceName:{type:String,required:!0},filterKey:{type:String,required:!0},lens:String},data:function(){return{id:null,value:null,startDate:null,endDate:null,currentStartDate:null,currentEndDate:null,debouncedHandleChange:null,currentRanges:null,maxDate:null,minDate:null,format:null,trans:function(t){return Nova.config("translations")[t]}}},created:function(){var t=this;this.debouncedHandleChange=c()((function(){return t.handleChange()}),500),this.setCurrentFilterValue(),this.setOptions(),this.parseDates()},mounted:function(){var t=this;this.id="dateRangeCalendar_"+this.generateId(),Nova.$on("filter-reset",this.unsetCurrentFilterValue),setTimeout((function(){t.initDateRange()}),1)},beforeUnmount:function(){Nova.$off("filter-reset",this.unsetCurrentFilterValue)},watch:{value:function(){this.debouncedHandleChange()}},methods:{setOptions:function(){var t=JSON.parse(this.filter.options.find((function(t){return"customRanges"===t.label})).value);Object.keys(t).forEach((function(e){var r=t[e].map((function(t){return moment(t)}));t[e]=r})),this.customRanges=t,this.maxDate=!!this.filter.options.find((function(t){return"maxDate"===t.label})).value&&moment(this.filter.options.find((function(t){return"maxDate"===t.label})).value),this.minDate=!!this.filter.options.find((function(t){return"minDate"===t.label})).value&&moment(this.filter.options.find((function(t){return"minDate"===t.label})).value),this.format=this.filter.options.find((function(t){return"format"===t.label})).value},setCurrentFilterValue:function(){this.value=""===this.filter.currentValue?null:this.filter.currentValue},unsetCurrentFilterValue:function(){this.value=null},handleChange:function(){this.value&&(this.$store.commit("".concat(this.resourceName,"/updateFilterState"),{filterClass:this.filterKey,value:this.currentStartDate&&this.currentEndDate?this.currentStartDate.format(this.format)+" "+this.trans("to")+" "+this.currentEndDate.format(this.format):""}),this.$emit("change"))},handleInput:function(t){return t.preventDefault()},initDateRange:function(){var t=this,e="#"+this.id,r=this;$(e).daterangepicker({autoUpdateInput:!1,startDate:r.startDate,endDate:r.endDate,maxDate:r.maxDate,minDate:r.minDate,ranges:r.customRanges,locale:{format:this.format,customRangeLabel:this.trans("Custom dates"),fromLabel:this.trans("from"),toLabel:this.trans("to"),applyLabel:this.trans("Apply"),cancelLabel:this.trans("Cancel"),daysOfWeek:[this.trans("Su"),this.trans("Mo"),this.trans("Tu"),this.trans("We"),this.trans("Th"),this.trans("Fr"),this.trans("Sa")],monthNames:[this.trans("January"),this.trans("February"),this.trans("March"),this.trans("April"),this.trans("May"),this.trans("June"),this.trans("July"),this.trans("August"),this.trans("September"),this.trans("October"),this.trans("November"),this.trans("December")],firstDay:1}},(function(t,e,n){t&&e&&(r.currentStartDate=t,r.currentEndDate=e)})).on("apply.daterangepicker",(function(e,n){r.currentStartDate&&r.currentEndDate?r.value=r.currentStartDate.format(t.format)+" "+t.trans("to")+" "+r.currentEndDate.format(t.format):r.value=null}))},clearFilter:function(){this.value=null,this.$store.commit("".concat(this.resourceName,"/updateFilterState"),{filterClass:this.filterKey,value:""}),this.$emit("change")},generateId:function(){return Math.random().toString(36).substring(2)+(new Date).getTime().toString(36)},parseDates:function(){var t=this.filter.currentValue,e=moment(),r=moment();if(t){var n=t.split(" ".concat(this.trans("to")," "));if(2==n.length)try{e=moment(n[0],"DD-MM-YYYY"),r=moment(n[1],"DD-MM-YYYY")}catch(t){}}this.startDate=e.format(this.format),this.endDate=r.format(this.format),this.currentStartDate=e,this.currentEndDate=r}},computed:{filter:function(){return this.$store.getters["".concat(this.resourceName,"/getFilter")](this.filterKey)}}};const h=(0,r(262).A)(f,[["render",function(t,e,r,l,c,f){var h=(0,n.resolveComponent)("FilterContainer");return(0,n.openBlock)(),(0,n.createBlock)(h,null,{filter:(0,n.withCtx)((function(){return[(0,n.createElementVNode)("div",a,[i,(0,n.createElementVNode)("input",{id:t.id,class:(0,n.normalizeClass)(["w-full form-control form-control-sm form-input form-input-bordered bg-gray-100 text-sm px-3",{"text-transparent":null==t.value}]),type:"text",dusk:"".concat(f.filter.name,"-daterange-filter"),name:"daterangefilter",autocomplete:"off",value:t.value,placeholder:t.placeholder,onKeydown:e[0]||(e[0]=function(t){return f.handleInput(t)}),onPaste:e[1]||(e[1]=(0,n.withModifiers)((function(){}),["prevent"]))},null,42,o),t.value?((0,n.openBlock)(),(0,n.createElementBlock)("div",s,[(0,n.createElementVNode)("button",{class:"bg-transparent",onClick:e[2]||(e[2]=function(){return f.clearFilter&&f.clearFilter.apply(f,arguments)})},u)])):(0,n.createCommentVNode)("",!0)])]})),default:(0,n.withCtx)((function(){return[(0,n.createElementVNode)("span",null,(0,n.toDisplayString)(f.filter.name),1)]})),_:1})}]]);Nova.booting((function(t,e){t.component("daterangepicker",h)}))},873:(t,e,r)=>{var n=r(325).Symbol;t.exports=n},552:(t,e,r)=>{var n=r(873),a=r(659),i=r(350),o=n?n.toStringTag:void 0;t.exports=function(t){return null==t?void 0===t?"[object Undefined]":"[object Null]":o&&o in Object(t)?a(t):i(t)}},128:(t,e,r)=>{var n=r(800),a=/^\s+/;t.exports=function(t){return t?t.slice(0,n(t)+1).replace(a,""):t}},840:(t,e,r)=>{var n="object"==typeof r.g&&r.g&&r.g.Object===Object&&r.g;t.exports=n},659:(t,e,r)=>{var n=r(873),a=Object.prototype,i=a.hasOwnProperty,o=a.toString,s=n?n.toStringTag:void 0;t.exports=function(t){var e=i.call(t,s),r=t[s];try{t[s]=void 0;var n=!0}catch(t){}var a=o.call(t);return n&&(e?t[s]=r:delete t[s]),a}},350:t=>{var e=Object.prototype.toString;t.exports=function(t){return e.call(t)}},325:(t,e,r)=>{var n=r(840),a="object"==typeof self&&self&&self.Object===Object&&self,i=n||a||Function("return this")();t.exports=i},800:t=>{var e=/\s/;t.exports=function(t){for(var r=t.length;r--&&e.test(t.charAt(r)););return r}},221:(t,e,r)=>{var n=r(805),a=r(124),i=r(374),o=Math.max,s=Math.min;t.exports=function(t,e,r){var u,l,c,f,h,d,m=0,p=!1,v=!1,g=!0;if("function"!=typeof t)throw new TypeError("Expected a function");function b(e){var r=u,n=l;return u=l=void 0,m=e,f=t.apply(n,r)}function y(t){var r=t-d;return void 0===d||r>=e||r<0||v&&t-m>=c}function D(){var t=a();if(y(t))return x(t);h=setTimeout(D,function(t){var r=e-(t-d);return v?s(r,c-(t-m)):r}(t))}function x(t){return h=void 0,g&&u?b(t):(u=l=void 0,f)}function O(){var t=a(),r=y(t);if(u=arguments,l=this,d=t,r){if(void 0===h)return function(t){return m=t,h=setTimeout(D,e),p?b(t):f}(d);if(v)return clearTimeout(h),h=setTimeout(D,e),b(d)}return void 0===h&&(h=setTimeout(D,e)),f}return e=i(e)||0,n(r)&&(p=!!r.leading,c=(v="maxWait"in r)?o(i(r.maxWait)||0,e):c,g="trailing"in r?!!r.trailing:g),O.cancel=function(){void 0!==h&&clearTimeout(h),m=0,u=d=l=h=void 0},O.flush=function(){return void 0===h?f:x(a())},O}},805:t=>{t.exports=function(t){var e=typeof t;return null!=t&&("object"==e||"function"==e)}},346:t=>{t.exports=function(t){return null!=t&&"object"==typeof t}},394:(t,e,r)=>{var n=r(552),a=r(346);t.exports=function(t){return"symbol"==typeof t||a(t)&&"[object Symbol]"==n(t)}},124:(t,e,r)=>{var n=r(325);t.exports=function(){return n.Date.now()}},374:(t,e,r)=>{var n=r(128),a=r(805),i=r(394),o=/^[-+]0x[0-9a-f]+$/i,s=/^0b[01]+$/i,u=/^0o[0-7]+$/i,l=parseInt;t.exports=function(t){if("number"==typeof t)return t;if(i(t))return NaN;if(a(t)){var e="function"==typeof t.valueOf?t.valueOf():t;t=a(e)?e+"":e}if("string"!=typeof t)return 0===t?t:+t;t=n(t);var r=s.test(t);return r||u.test(t)?l(t.slice(2),r?2:8):o.test(t)?NaN:+t}},655:()=>{},262:(t,e)=>{"use strict";e.A=(t,e)=>{const r=t.__vccOpts||t;for(const[t,n]of e)r[t]=n;return r}}},r={};function n(t){var a=r[t];if(void 0!==a)return a.exports;var i=r[t]={exports:{}};return e[t](i,i.exports,n),i.exports}n.m=e,t=[],n.O=(e,r,a,i)=>{if(!r){var o=1/0;for(c=0;c<t.length;c++){for(var[r,a,i]=t[c],s=!0,u=0;u<r.length;u++)(!1&i||o>=i)&&Object.keys(n.O).every((t=>n.O[t](r[u])))?r.splice(u--,1):(s=!1,i<o&&(o=i));if(s){t.splice(c--,1);var l=a();void 0!==l&&(e=l)}}return e}i=i||0;for(var c=t.length;c>0&&t[c-1][2]>i;c--)t[c]=t[c-1];t[c]=[r,a,i]},n.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return n.d(e,{a:e}),e},n.d=(t,e)=>{for(var r in e)n.o(e,r)&&!n.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:e[r]})},n.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"==typeof window)return window}}(),n.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),(()=>{var t={120:0,189:0};n.O.j=e=>0===t[e];var e=(e,r)=>{var a,i,[o,s,u]=r,l=0;if(o.some((e=>0!==t[e]))){for(a in s)n.o(s,a)&&(n.m[a]=s[a]);if(u)var c=u(n)}for(e&&e(r);l<o.length;l++)i=o[l],n.o(t,i)&&t[i]&&t[i][0](),t[i]=0;return n.O(c)},r=self.webpackChunkrpj_daterangepicker=self.webpackChunkrpj_daterangepicker||[];r.forEach(e.bind(null,0)),r.push=e.bind(null,r.push.bind(r))})(),n.O(void 0,[189],(()=>n(794)));var a=n.O(void 0,[189],(()=>n(655)));a=n.O(a)})();
