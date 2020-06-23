(this["webpackJsonpauthzyin-example"]=this["webpackJsonpauthzyin-example"]||[]).push([[0],{64:function(e,t,n){e.exports=n(78)},78:function(e,t,n){"use strict";n.r(t);var r,a=n(0),o=n(9),c=n(14),i=n(24),u=n(19),l=n(17),s=n(15),f=n(49),m=n(50),d=n(16),h=n.n(d),p=n(29),v="".concat(".","/policies.json"),E="".concat(".","/places.json"),b=function(){var e=Object(p.a)(h.a.mark((function e(t){var n;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch(t);case 2:if(!(n=e.sent).ok){e.next=9;break}return e.next=6,n.json();case 6:return e.abrupt("return",e.sent);case 9:throw new Error(n.status.toString());case 10:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),g=function(){var e=Object(p.a)(h.a.mark((function e(){return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,b(E);case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();!function(e){e.SetPlaces="SetPlaces",e.SetCurrentPlace="SetCurrentPlace",e.SetAlert="SetAlert"}(r||(r={}));var y,j,O=Object(s.a)(r.SetPlaces),w=Object(s.a)(r.SetCurrentPlace),x=Object(s.a)(r.SetAlert),P={getPlaces:function(){return function(){var e=Object(p.a)(h.a.mark((function e(t){var n;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,g();case 2:n=e.sent,t(O(n));case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},setAlert:x,setCurrentPlace:w,enterPlace:function(e){return function(t){console.log('Entered "'.concat(e.name,'" successfully.')),t(w(e.id)),t(x({severity:j.Info,message:'You just walked into "'.concat(e.name,'"')}))}}},C=function(){return Object(s.c)(P)};!function(e){e.Info="info",e.Warn="warning",e.Error="error"}(j||(j={}));var T,S,k,q=Object(s.b)({currentPlace:-1},(y={},Object(i.a)(y,r.SetPlaces,[function(e,t){return Object(u.a)(Object(u.a)({},e),{},{places:t.payload,currentPlace:-1})}]),Object(i.a)(y,r.SetCurrentPlace,[function(e,t){return Object(u.a)(Object(u.a)({},e),{},{currentPlace:t.payload})}]),y)),A=Object(s.b)({severity:j.Info,message:"Which place do you want to go?"},Object(i.a)({},r.SetAlert,[function(e,t){return Object(u.a)(Object(u.a)({},e),t.payload)}])),R=Object(l.combineReducers)({places:q,alertInfo:A}),I=Object(l.createStore)(R,Object(f.composeWithDevTools)(Object(l.applyMiddleware)(m.a))),G=n(58),z=n(104),J=n(108),W=n(107),N=n(79),F=n(42);function H(e){return e.operator===T.Or}function L(e){return(e.operator===T.Equals||e.operator===T.Contains||e.operator===T.GreaterThan||e.operator===T.GreaterThanOrEqualTo)&&void 0!==e.dataJPath}(k=T||(T={}))[k.Invalid=-100]="Invalid",k[k.RequiresRole=-1]="RequiresRole",k[k.Or=1]="Or",k[k.Equals=2]="Equals",k[k.GreaterThan=3]="GreaterThan",k[k.GreaterThanOrEqualTo=4]="GreaterThanOrEqualTo",k[k.Contains=5]="Contains",function(e){e[e.ContextToResource=1]="ContextToResource",e[e.ResourceToContext=2]="ResourceToContext"}(S||(S={}));var D=function e(t,n,r){var a=!1;return H(n)?a=function(t,n,r){for(var a=0;a<n.children.length;a++)if(e(t,n.children[a],r))return!0;return!1}(t,n,r):function(e){return e.operator===T.RequiresRole}(n)?a=function(e,t){for(var n=t.allowedRoles,r=e.userContext.roles,a=0;a<n.length;a++)if(r.indexOf(n[a])>=0)return!0;return!1}(t,n):L(n)&&(a=function(e,t,n){var r;if(L(r=t)&&void 0!==r.constValue&&(n={value:t.constValue}),!n)return!1;var a=Object(F.a)({path:t.dataJPath,json:e.data}),o=Object(F.a)({path:t.resourceJPath,json:n});return function(e,t,n){if(!e||!t||e.length<=0||t.length<=0)return!1;switch(n){case T.Equals:case T.GreaterThan:case T.GreaterThanOrEqualTo:return 1===e.length&&e.length===t.length&&(n===T.Equals&&e[0]===t[0]||n===T.GreaterThan&&e[0]>t[0]||n===T.GreaterThanOrEqualTo&&e[0]>=t[0]);case T.Contains:return 1===t.length&&e.some((function(e){return e===t[0]}));default:return!1}}(t.direction===S.ContextToResource?a:o,t.direction===S.ContextToResource?o:a,t.operator)}(t,n,r)),a};function M(){return(M=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}var Z,B=function(e){if(!e)return e;for(var t=e.length,n="",r=0;r<t;){var a=e.indexOf(".",r);n+=e.substr(r,(a=-1===a?t:a+1)-r),a<t&&"."!==e[a]&&(n+=e[a].toLowerCase(),a++),r=a}return n},U=function(){var e=Z;if(!e)throw new Error("AuthZyin React context is not setup. Call createAuthZyinContext first.");return Object(a.useContext)(e)},V={url:"/authzyin/context",requestInitFn:function(){return Promise.resolve({})},jsonPathPropToCamelCase:!0},Y=function(e){var t=Object(a.useState)({}),n=t[0],r=t[1],o=U();return Object(a.useEffect)((function(){var t=M({},V,null==e?void 0:e.options),n=function(e){t.jsonPathPropToCamelCase&&function(e){e&&e.policies&&e.policies.forEach((function(e){var t;(t=e)&&t.requirements&&t.requirements.length>0&&t.requirements.forEach((function(e){return function e(t){H(t)&&t.children?t.children.forEach((function(t){return e(t)})):L(t)&&(t.dataJPath=B(t.dataJPath),t.resourceJPath=B(t.resourceJPath))}(e)}))}))}(e),r(e)};o?n(o):function(){try{Promise.resolve(t.requestInitFn()).then((function(e){return e.method="GET",e.body=void 0,Promise.resolve(fetch(t.url,e)).then((function(e){return function(){if(e.ok)return Promise.resolve(e.json()).then((function(e){n(e)}));throw new Error("AuthZyinContext loading error: "+e.status)}()}))}))}catch(e){return Promise.reject(e)}}()}),[e]),Object(a.createElement)(Z.Provider,{value:n},n&&n.userContext&&e.children)},$=n(100),K=n(102),Q=n(103),X=n(51),_=n.n(X),ee=function(e){var t=e.data;return a.createElement($.a,{variant:"outlined"},a.createElement(K.a,{title:"Client authorization context"}),a.createElement(Q.a,null,a.createElement(_.a,{src:t,theme:"summerfruit",iconStyle:"triangle",collapsed:2,enableClipboard:!1})))},te=n(36),ne=function(){var e=U();return e?a.createElement("div",null,a.createElement($.a,{variant:"outlined"},a.createElement(K.a,{title:"User information"}),a.createElement(Q.a,null,a.createElement(te.a,{variant:"body1",component:"div"},"Age: ",e.data.age),a.createElement(te.a,{variant:"body1",component:"div"},"Has driver's license: ",String(e.data.withDriversLicense)),a.createElement(te.a,{variant:"body1",component:"div"},"Has passport: ",String(e.data.withPassport)),a.createElement(te.a,{variant:"body1",component:"div"},"PaymentMethods: ",JSON.stringify(e.data.paymentMethods.map((function(e){return e.type}))))))):a.createElement(a.Fragment,null)},re=n(43),ae=function(e){return e.places},oe=Object(re.a)([ae],(function(e){return e.places})),ce=(Object(re.a)([ae],(function(e){return e.currentPlace})),function(e){return e.alertInfo}),ie=n(110),ue=function(){var e=Object(c.c)(ce);return e.message?a.createElement(ie.a,{severity:e.severity},e.message):a.createElement(a.Fragment,null)},le=n(105);function se(e){return void 0!==e.hasHappyHour}function fe(e){return void 0!==e.maxAge}var me=n(4),de=n(109),he=Object(me.a)((function(e){return{tooltip:{backgroundColor:e.palette.common.white,color:"rgba(0, 0, 0, 0.87)",boxShadow:e.shadows[1],fontSize:11}}}))(de.a),pe=n(56),ve=n.n(pe),Ee=n(57),be=n.n(Ee),ge=Object(z.a)((function(e){return{button:{margin:e.spacing(1)}}})),ye=function(e){var t=e.place,n=ge(),r=C(),o=r.setAlert,c=r.setCurrentPlace,i=r.enterPlace,u=function(){var e=U();return function(t,n){return e&&e.userContext&&function(e,t,n){if(!e||!e.policies)return!1;var r=e.policies.filter((function(e){return e.name===t}))[0];if(!r||!r.requirements)return!1;for(var a=r.requirements,o=0;o<a.length;o++)if(!D(e,a[o],n))return!1;return!0}(e,t,n)}}()(t.policy,t);return a.createElement("div",null,a.createElement(he,{key:t.id,placement:"top",arrow:!0,title:a.createElement(a.Fragment,null,a.createElement(te.a,{color:"inherit"},t.name),a.createElement(te.a,{color:"secondary"},"accepts ".concat(t.acceptedPaymentMethods[0].toString())),a.createElement(te.a,{color:"secondary"},fe(t)&&"Age:".concat(t.minAge,"-").concat(t.maxAge)),a.createElement(te.a,{color:u?"primary":"error"},u?"Authorized":"Not authorized"))},a.createElement(le.a,{variant:"contained",className:n.button,color:u?"primary":"secondary",startIcon:se(t)?a.createElement(ve.a,null):a.createElement(be.a,null),onClick:function(){return c(-1),void(u?i(t):(console.error('Entering "'.concat(t.name,'": not authorized')),o({severity:j.Warn,message:'Authorization failed - "'.concat(t.name,'" forbidden by policy "').concat(t.policy,'"')})))}},t.name)))},je=Object(z.a)((function(){return{placelist:{display:"flex",flexDirection:"row",justifyContent:"space-between"}}})),Oe=function(){var e=je(),t=Object(c.c)(oe),n=C().getPlaces;if(a.useEffect((function(){n()}),[n]),t&&t.length>=0){var r=t.map((function(e){return a.createElement(ye,{key:e.id,place:e})}));return a.createElement($.a,{variant:"outlined"},a.createElement(K.a,{title:"Local places nearby you"}),a.createElement(Q.a,null,a.createElement(te.a,{variant:"subtitle1",component:"div"},"Hover to see more details. Click to enter"),a.createElement("div",{className:e.placelist},r),a.createElement(ue,null)))}return a.createElement(a.Fragment,null)},we=n(106),xe=function(){var e=U();return a.createElement("div",null,a.createElement(te.a,{variant:"h2",component:"h2"},"Welcome ",e.userContext.userName,"!"),a.createElement(we.a,{container:!0,direction:"column",justify:"center",alignItems:"stretch"},a.createElement(we.a,{item:!0,xl:12},a.createElement(Oe,null)),a.createElement(we.a,{item:!0,xl:12},a.createElement(ne,null)),a.createElement(we.a,{item:!0,xl:12},a.createElement(ee,{data:e}))))},Pe=Object(G.a)({palette:{type:"dark"}}),Ce=Object(z.a)((function(){return{root:{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}}));!function(e){if(Z)throw new Error("AuthZyin React context is already initialized.");Z=Object(a.createContext)(e)}();var Te=function(){var e=Ce();return a.createElement(Y,{options:{url:v}},a.createElement(W.a,null,a.createElement(J.a,{theme:Pe},a.createElement(N.a,{className:e.root},a.createElement(xe,null)))))},Se=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function ke(e){navigator.serviceWorker.register(e).then((function(e){e.onupdatefound=function(){var t=e.installing;t.onstatechange=function(){"installed"===t.state&&(navigator.serviceWorker.controller?console.log("New content is available; please refresh."):console.log("Content is cached for offline use."))}}})).catch((function(e){console.error("Error during service worker registration:",e)}))}o.render(a.createElement(c.a,{store:I},a.createElement(Te,null)),document.getElementById("root")),function(){if("serviceWorker"in navigator){if(new URL(".",window.location.toString()).origin!==window.location.origin)return;window.addEventListener("load",(function(){var e="".concat(".","/service-worker.js");Se?function(e){fetch(e).then((function(t){var n=t.headers.get("content-type");404===t.status||n&&-1===n.indexOf("javascript")?navigator.serviceWorker.ready.then((function(e){e.unregister().then((function(){window.location.reload()}))})):ke(e)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(e):ke(e)}))}}()}},[[64,1,2]]]);
//# sourceMappingURL=main.35ef7f80.chunk.js.map