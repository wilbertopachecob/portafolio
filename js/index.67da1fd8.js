(function(e){function t(t){for(var c,s,n=t[0],o=t[1],r=t[2],f=0,d=[];f<n.length;f++)s=n[f],Object.prototype.hasOwnProperty.call(i,s)&&i[s]&&d.push(i[s][0]),i[s]=0;for(c in o)Object.prototype.hasOwnProperty.call(o,c)&&(e[c]=o[c]);b&&b(t);while(d.length)d.shift()();return a.push.apply(a,r||[]),l()}function l(){for(var e,t=0;t<a.length;t++){for(var l=a[t],c=!0,n=1;n<l.length;n++){var o=l[n];0!==i[o]&&(c=!1)}c&&(a.splice(t--,1),e=s(s.s=l[0]))}return e}var c={},i={index:0},a=[];function s(t){if(c[t])return c[t].exports;var l=c[t]={i:t,l:!1,exports:{}};return e[t].call(l.exports,l,l.exports,s),l.l=!0,l.exports}s.m=e,s.c=c,s.d=function(e,t,l){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:l})},s.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var l=Object.create(null);if(s.r(l),Object.defineProperty(l,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var c in e)s.d(l,c,function(t){return e[t]}.bind(null,c));return l},s.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="/portafolio/";var n=window["webpackJsonp"]=window["webpackJsonp"]||[],o=n.push.bind(n);n.push=t,n=n.slice();for(var r=0;r<n.length;r++)t(n[r]);var b=o;a.push([0,"chunk-vendors"]),l()})({0:function(e,t,l){e.exports=l("56d7")},"0664":function(e,t,l){"use strict";l("c106")},"0996":function(e,t,l){},"1cd9":function(e,t,l){"use strict";l("0996")},"1faf":function(e,t,l){"use strict";l("2c4d")},"25b1":function(e,t,l){},"298a":function(e,t,l){e.exports=l.p+"img/UCI.422b6669.jpg"},"2c4d":function(e,t,l){},"44c8":function(e,t,l){"use strict";l("a2fc")},"56d7":function(e,t,l){"use strict";l.r(t);var c=l("7a23");function i(e,t,l,i,a,s){const n=Object(c["n"])("Main");return Object(c["l"])(),Object(c["d"])(n)}const a={id:"toggleDarkMode",class:"topcorner",title:"Toggle Dark Mode",style:{display:"block"}},s={class:"switch",for:"checkbox"};function n(e,t,l,i,n,o){const r=Object(c["n"])("sidebar"),b=Object(c["n"])("about"),f=Object(c["n"])("skills"),d=Object(c["n"])("experience"),u=Object(c["n"])("languages"),m=Object(c["n"])("certifications"),j=Object(c["n"])("education"),O=Object(c["n"])("my-footer");return Object(c["l"])(),Object(c["e"])(c["a"],null,[Object(c["f"])("div",a,[Object(c["f"])("label",s,[Object(c["f"])("input",{type:"checkbox",id:"checkbox",onChange:t[0]||(t[0]=e=>o.toggleDarkMode(e)),autocomplete:"off"},null,32),t[2]||(t[2]=Object(c["f"])("div",{class:"slider round"},null,-1))])]),Object(c["i"])(r,{ref:"sidebar"},null,512),Object(c["f"])("div",{class:"container-fluid p-0",id:"sections_container",onClick:t[1]||(t[1]=e=>o.closeToggler())},[Object(c["i"])(b),Object(c["i"])(f),Object(c["i"])(d),Object(c["i"])(u),Object(c["i"])(m),Object(c["i"])(j),Object(c["i"])(O)])],64)}l("0643"),l("4e3e");var o=l("e5a1"),r=l.n(o);const b={class:"navbar navbar-expand-lg navbar-dark bg-primary fixed-top",id:"sideNav"},f={class:"collapse navbar-collapse",id:"navbarSupportedContent"},d={class:"navbar-nav"},u=["href","onClick"];function m(e,t,l,i,a,s){return Object(c["l"])(),Object(c["e"])("nav",b,[Object(c["f"])("a",{class:"navbar-brand js-scroll-trigger",onClick:t[0]||(t[0]=e=>s.smoothScroll(e,{text:"About",url:"about"})),href:"/#about"},t[2]||(t[2]=[Object(c["f"])("span",{class:"d-block d-lg-none"},"Wilberto Pacheco Batista",-1),Object(c["f"])("span",{class:"d-none d-lg-block"},[Object(c["f"])("img",{class:"img-fluid img-profile rounded-circle mx-auto mb-2",src:r.a,alt:"profile"})],-1)])),Object(c["f"])("button",{class:"navbar-toggler collapsed",type:"button","data-toggle":"collapse","data-target":"#navbarSupportedContent","aria-controls":"navbarSupportedContent","aria-expanded":"false","aria-label":"Toggle navigation",ref:"toggler",onClick:t[1]||(t[1]=e=>s.hideDarkMode())},t[3]||(t[3]=[Object(c["f"])("span",{class:"navbar-toggler-icon"},null,-1)]),512),Object(c["f"])("div",f,[Object(c["f"])("ul",d,[(Object(c["l"])(!0),Object(c["e"])(c["a"],null,Object(c["m"])(a.menu,(e,t)=>(Object(c["l"])(),Object(c["e"])("li",{class:"nav-item",key:t},[Object(c["f"])("a",{class:"nav-link js-scroll-trigger",href:"/#"+e.url,onClick:t=>s.smoothScroll(t,e)},Object(c["o"])(e.text),9,u)]))),128))])])])}var j={name:"Sidebar",props:{msg:String},data(){return{menu:[{text:"About",url:"about"},{text:"Skills",url:"skills"},{text:"Experience",url:"experience"},{text:"Languages",url:"languages"},{text:"Certifications",url:"certifications"},{text:"Education",url:"education"}]}},methods:{smoothScroll(e,t){e.preventDefault();const l=document.querySelector("#"+t.url);l&&scroll({top:l.offsetTop,behavior:"smooth"})},hideDarkMode(){const e=document.querySelector("#toggleDarkMode");if(e){if("none"===e.style.display)return void(e.style.display="block");e.style.display="none"}}}},O=(l("1faf"),l("6b0d")),p=l.n(O);const g=p()(j,[["render",m],["__scopeId","data-v-dcbba0b8"]]);var h=g;const v={class:"resume-section p-3 p-lg-5 d-flex d-column",id:"about"},W={class:"my-auto"},y={class:"list-inline list-social-icons mb-0 mt-5 float-left"},x={class:"list-inline-item"},B={href:"https://www.linkedin.com/in/wilberto-pacheco-batista-31806660/",title:"LinkedIn","data-toggle":"tooltip","data-offset":"0 10",rel:"me",class:"mt-2"},F={class:"list-inline-item"},C={href:"https://github.com/wilbertopachecob","data-toggle":"tooltip",title:"GitHub","data-offset":"0 10",rel:"me"},q={class:"list-inline-item"},Y={href:"https://twitter.com/PachecoWilberto","data-toggle":"tooltip",title:"Twitter","data-offset":"0 10",rel:"me"};function A(e,t,l,i,a,s){const n=Object(c["n"])("font-awesome-icon"),o=Object(c["n"])("font-awesome-layers");return Object(c["l"])(),Object(c["e"])("section",v,[Object(c["f"])("div",W,[t[1]||(t[1]=Object(c["g"])('<div class="resume-item d-flex flex-column flex-md-row"><div class="mr-auto text-left"><h1 class="mb-0"> Wilberto <span class="text-primary">Pacheco Batista</span></h1><div class="subheading mb-5"> Broken Arrow, OK, 74012, USA · <a href="mailto:wilbertopachecob@gmail.com">wilbertopachecob<span style="display:none;">-remove-</span>@gmail.com</a></div></div></div>',1)),Object(c["f"])("div",null,[t[0]||(t[0]=Object(c["f"])("p",{class:"text-left"}," Bilingual Full Stack Web Developer with more than 11 years of experience developing frontend and backend software. Enjoys solving technical issues and seeking to make a change in a company with high goals. ",-1)),Object(c["f"])("ul",y,[Object(c["f"])("li",x,[Object(c["f"])("a",B,[Object(c["i"])(o,null,{default:Object(c["q"])(()=>[Object(c["i"])(n,{icon:["fas","circle"],size:"4x"}),Object(c["i"])(n,{icon:["fab","linkedin"],size:"2x",inverse:!0,class:"ml-4"})]),_:1})])]),Object(c["f"])("li",F,[Object(c["f"])("a",C,[Object(c["i"])(o,null,{default:Object(c["q"])(()=>[Object(c["i"])(n,{icon:["fas","circle"],size:"4x"}),Object(c["i"])(n,{icon:["fab","github"],size:"2x",inverse:!0,class:"ml-4"})]),_:1})])]),Object(c["f"])("li",q,[Object(c["f"])("a",Y,[Object(c["i"])(o,null,{default:Object(c["q"])(()=>[Object(c["i"])(n,{icon:["fas","circle"],size:"4x"}),Object(c["i"])(n,{icon:["fab","twitter"],size:"2x",inverse:!0,class:"ml-4"})]),_:1})])])])])])])}var S={name:"About"};const V=p()(S,[["render",A]]);var w=V;const E={class:"resume-section p-3 p-lg-5 d-flex flex-column",id:"skills"},k={class:"my-auto",id:"skills-content"},I={class:"list-inline-item"},Z={class:"list-inline-item"},G={class:"list-inline-item"},R={class:"list-inline-item"},U={class:"list-inline-item"},D={class:"list-inline-item"},Q={class:"list-inline-item"},L={class:"list-inline-item"},M={class:"list-inline-item"},T={class:"list-inline-item"},P={class:"list-inline-item"},J={class:"list-inline-item"},K={class:"list-inline-item"},N={class:"list-inline-item"},z={class:"list-inline-item"},H={class:"list-inline-item"},_={class:"list-inline-item"},X={class:"list-inline-item"},$={class:"list-inline-item"},ee={class:"list-inline-item"};function te(e,t){const l=Object(c["n"])("font-awesome-icon");return Object(c["l"])(),Object(c["e"])("section",E,[Object(c["f"])("div",k,[t[27]||(t[27]=Object(c["f"])("h2",{class:"mb-5"},"Skills",-1)),t[28]||(t[28]=Object(c["f"])("h3",null,"Architecture",-1)),Object(c["f"])("ul",null,[Object(c["f"])("li",I,[Object(c["i"])(l,{icon:["fas","terminal"]}),t[0]||(t[0]=Object(c["h"])(" Microservices "))]),Object(c["f"])("li",Z,[Object(c["i"])(l,{icon:["fas","terminal"]}),t[1]||(t[1]=Object(c["h"])(" RESTful APIs "))])]),t[29]||(t[29]=Object(c["f"])("h3",null,[Object(c["h"])(" Languages, "),Object(c["f"])("span",{class:"text-primary"},"Operating Systems & Tools")],-1)),Object(c["f"])("ul",null,[Object(c["f"])("li",G,[Object(c["i"])(l,{icon:["fab","windows"],style:{color:"#00B7EE"}}),t[2]||(t[2]=Object(c["h"])(" Windows "))]),Object(c["f"])("li",R,[Object(c["i"])(l,{icon:["fab","git"],style:{color:"#E84E31"}}),t[3]||(t[3]=Object(c["h"])(" git "))]),t[13]||(t[13]=Object(c["f"])("li",{class:"list-inline-item"}," Golang ",-1)),Object(c["f"])("li",U,[Object(c["i"])(l,{icon:["fas","terminal"]}),t[4]||(t[4]=Object(c["h"])(" bash "))]),Object(c["f"])("li",D,[Object(c["i"])(l,{icon:["fab","php"],style:{color:"#8892BF"}}),t[5]||(t[5]=Object(c["h"])(" PHP "))]),Object(c["f"])("li",Q,[Object(c["i"])(l,{icon:["fab","laravel"],style:{color:"#F72C1F"}}),t[6]||(t[6]=Object(c["h"])(" Laravel "))]),Object(c["f"])("li",L,[Object(c["i"])(l,{icon:["fab","html5"],style:{color:"#E44D26"}}),t[7]||(t[7]=Object(c["h"])(" HTML5 "))]),Object(c["f"])("li",M,[Object(c["i"])(l,{icon:["fab","css3-alt"],style:{color:"#254BDD"}}),t[8]||(t[8]=Object(c["h"])(" CSS3 "))]),Object(c["f"])("li",T,[Object(c["i"])(l,{icon:["fab","bootstrap"],style:{color:"#533B78"}}),t[9]||(t[9]=Object(c["h"])(" Bootstrap "))]),Object(c["f"])("li",P,[Object(c["i"])(l,{icon:["fab","js"],style:{color:"#F7DF1E"}}),t[10]||(t[10]=Object(c["h"])(" JavaScript "))]),Object(c["f"])("li",J,[Object(c["i"])(l,{icon:["fab","vuejs"],style:{color:"#41B883"}}),t[11]||(t[11]=Object(c["h"])(" Vue.js "))]),Object(c["f"])("li",K,[Object(c["i"])(l,{icon:["fab","angular"],style:{color:"#D6002F"}}),t[12]||(t[12]=Object(c["h"])(" Angular "))]),t[14]||(t[14]=Object(c["f"])("li",{class:"list-inline-item"}," jQuery ",-1))]),t[30]||(t[30]=Object(c["f"])("h3",null,[Object(c["h"])(" Platform "),Object(c["f"])("span",{class:"text-primary"},"Development & Administration")],-1)),Object(c["f"])("ul",null,[Object(c["f"])("li",N,[Object(c["i"])(l,{icon:["fab","github-alt"],style:{color:"#323131"}}),t[15]||(t[15]=Object(c["h"])(" GitHub "))]),Object(c["f"])("li",z,[Object(c["i"])(l,{icon:["fab","bitbucket"],style:{color:"#2580F7"}}),t[16]||(t[16]=Object(c["h"])(" Bitbucket "))]),t[19]||(t[19]=Object(c["f"])("li",{class:"list-inline-item"}," Apache ",-1)),Object(c["f"])("li",H,[Object(c["i"])(l,{icon:["fab","wordpress"],style:{color:"#207196"}}),t[17]||(t[17]=Object(c["h"])(" Wordpress 5 "))]),Object(c["f"])("li",_,[Object(c["i"])(l,{icon:["fab","drupal"],style:{color:"#0097D7"}}),t[18]||(t[18]=Object(c["h"])(" Drupal 7 "))])]),t[31]||(t[31]=Object(c["f"])("h3",null,[Object(c["h"])("Data "),Object(c["f"])("span",{class:"text-primary"},"Management")],-1)),Object(c["f"])("ul",null,[t[21]||(t[21]=Object(c["f"])("li",{class:"list-inline-item"}," MySQL ",-1)),t[22]||(t[22]=Object(c["f"])("li",{class:"list-inline-item"}," Microsoft SQL Server ",-1)),t[23]||(t[23]=Object(c["f"])("li",{class:"list-inline-item"}," MongoDB ",-1)),Object(c["f"])("li",X,[Object(c["i"])(l,{icon:["fab","node"],style:{color:"#74AA63"}}),t[20]||(t[20]=Object(c["h"])(" Node.js "))])]),t[32]||(t[32]=Object(c["f"])("h3",null,[Object(c["h"])("Organizing "),Object(c["f"])("span",{class:"text-primary"},"Tools")],-1)),Object(c["f"])("ul",null,[Object(c["f"])("li",$,[Object(c["i"])(l,{icon:["fab","trello"],style:{color:"#0D77C0"}}),t[24]||(t[24]=Object(c["h"])(" Trello "))]),Object(c["f"])("li",ee,[Object(c["i"])(l,{icon:["fab","slack"]}),t[25]||(t[25]=Object(c["h"])(" Slack "))]),t[26]||(t[26]=Object(c["f"])("li",{class:"list-inline-item"}," Monday.com ",-1))])])])}const le={},ce=p()(le,[["render",te]]);var ie=ce;const ae={class:"resume-section p-3 p-lg-5 d-flex flex-column",id:"experience"},se={class:"my-auto",id:"experience-content"},ne={class:"timeline"},oe={class:"timeline-badge primary"},re={class:"timeline-panel"},be={class:"timeline-heading"},fe={class:"text-primary"},de={class:"timeline-badge primary"},ue={class:"timeline-panel"},me={class:"timeline-heading"},je={class:"text-primary"},Oe={class:"timeline-badge primary"},pe={class:"timeline-panel"},ge={class:"timeline-heading"},he={class:"text-primary"};function ve(e,t){const l=Object(c["n"])("font-awesome-icon");return Object(c["l"])(),Object(c["e"])("section",ae,[Object(c["f"])("div",se,[t[12]||(t[12]=Object(c["f"])("h2",{class:"mb-5"},"Experience",-1)),Object(c["f"])("ul",ne,[Object(c["f"])("li",null,[Object(c["f"])("div",oe,[Object(c["i"])(l,{icon:["fas","map-marker-alt"],size:"1x"})]),Object(c["f"])("div",re,[Object(c["f"])("div",be,[t[1]||(t[1]=Object(c["f"])("h3",{class:"timeline-title"},"Velocigo Inc",-1)),t[2]||(t[2]=Object(c["f"])("span",{class:"badge p-2 title-heading"},"Software Developer",-1)),Object(c["f"])("p",null,[Object(c["f"])("small",fe,[Object(c["i"])(l,{icon:["fas","calendar-alt"]}),t[0]||(t[0]=Object(c["h"])(" 3/2020 - 2/2021"))])])]),t[3]||(t[3]=Object(c["f"])("div",{class:"timeline-body"},[Object(c["f"])("ul",{style:{"list-style":"square"}},[Object(c["f"])("li",null," Development of a Web App moving our main client from Microsoft Dynamics NAV 2009 to an intuitive web UI increasing performance, visibility and communication. The backend was supported by Golang and Node.js, implementing a microservices architecture, Microsoft SQL Server, AWS and Angular 9 on the frontend. "),Object(c["f"])("li",null," Generation on reports using a RESTful architecture that involved extracting metadata from statistics to present to the final user in dynamic charts, tables and forms. "),Object(c["f"])("li",null," Guidance of our Junior Developer, supporting him and teaching him the best practices of the profession. "),Object(c["f"])("li",null," Built a Golang App to manage campaigns, audiences, etc. using the Mailchimp API. "),Object(c["f"])("li",null," Vuejs Dashboard that provides Jira metadata using Golang in the backend. ")])],-1))])]),Object(c["f"])("li",null,[Object(c["f"])("div",de,[Object(c["i"])(l,{icon:["fas","map-marker-alt"]})]),Object(c["f"])("div",ue,[Object(c["f"])("div",me,[t[5]||(t[5]=Object(c["f"])("h3",{class:"timeline-title"},"TPV.com",-1)),t[6]||(t[6]=Object(c["f"])("span",{class:"badge p-2 title-heading"},"Web Developer",-1)),Object(c["f"])("p",null,[Object(c["f"])("small",je,[Object(c["i"])(l,{icon:["fas","calendar-alt"]}),t[4]||(t[4]=Object(c["h"])(" 2/2019 – 3/2020"))])])]),t[7]||(t[7]=Object(c["f"])("div",{class:"timeline-body"},[Object(c["f"])("ul",{style:{"list-style":"square"}},[Object(c["f"])("li",null," Converted a big percentage of two major platforms from PHP (Laravel) to Vue.js increasing the loading speed for customers satisfaction. "),Object(c["f"])("li",null," Built reports, RESTful web services and APIs for Developers, HR personal and other departments of the company involving diverse technologies. "),Object(c["f"])("li",null," Supporting new features, bug fix and providing a fast solution to issues with more than 1550 contributions on GitHub. "),Object(c["f"])("li",null," Was one of the key figures in the Internationalization and Localization process of one of the major platforms in the company. ")])],-1))])]),Object(c["f"])("li",null,[Object(c["f"])("div",Oe,[Object(c["i"])(l,{icon:["fas","map-marker-alt"]})]),Object(c["f"])("div",pe,[Object(c["f"])("div",ge,[t[9]||(t[9]=Object(c["f"])("h3",{class:"timeline-title"}," Institute of Cybernetics, Mathematics and Physics ",-1)),t[10]||(t[10]=Object(c["f"])("span",{class:"badge p-2 title-heading"},"Web Developer / Webmaster",-1)),Object(c["f"])("p",null,[Object(c["f"])("small",he,[Object(c["i"])(l,{icon:["fas","calendar-alt"]}),t[8]||(t[8]=Object(c["h"])(" 9/2010 – 6/2017"))])])]),t[11]||(t[11]=Object(c["g"])('<div class="timeline-body" data-v-06ccbfc1><ul style="list-style:square;" data-v-06ccbfc1><li data-v-06ccbfc1>Website management, frontend and backend</li><li data-v-06ccbfc1>Development of a PHP modular CMS</li><li data-v-06ccbfc1>Promptly resolve customer service issues and requests</li><li data-v-06ccbfc1> Development and maintenance of WordPress themes and plugins </li><li data-v-06ccbfc1> Intranet management of services including chats and data entry interfaces </li><li data-v-06ccbfc1>Web service development following OWASP standards</li><li data-v-06ccbfc1> Intranet management of services including chats and data entry interfaces </li><li data-v-06ccbfc1> APIs development to track process as part of a CRM </li><li data-v-06ccbfc1> Train end users and technical support personnel on optimization and use of services and programs </li></ul></div>',1))])])])])])}l("6e90");const We={},ye=p()(We,[["render",ve],["__scopeId","data-v-06ccbfc1"]]);var xe=ye,Be=l("7327"),Fe=l.n(Be),Ce=l("d658"),qe=l.n(Ce);const Ye={class:"resume-section p-3 p-lg-5 d-flex flex-column",id:"languages"};function Ae(e,t){return Object(c["l"])(),Object(c["e"])("section",Ye,t[0]||(t[0]=[Object(c["g"])('<div class="my-auto" id="languages-content" data-v-f9327194><h2 class="mb-5" data-v-f9327194>Languages</h2></div><div class="row" data-v-f9327194><div class="col-xl-6 col-lg-6 col-md-12 col-sm-12" data-v-f9327194><img src="'+Fe.a+'" class="rounded-circle mx-auto scale-img" alt="Spanish flag" data-v-f9327194><h2 data-v-f9327194>Spanish</h2></div><div class="col-xl-6 col-lg-6 col-md-12 col-sm-12" data-v-f9327194><img src="'+qe.a+'" alt="English flag" class="rounded-circle mx-auto scale-img" data-v-f9327194><h2 data-v-f9327194>English</h2></div></div>',2)]))}l("44c8");const Se={},Ve=p()(Se,[["render",Ae],["__scopeId","data-v-f9327194"]]);var we=Ve,Ee=l("a7d7"),ke=l.n(Ee),Ie=l("60c7"),Ze=l.n(Ie);const Ge={class:"resume-section p-3 p-lg-5 d-flex flex-column",id:"certifications"},Re={class:"my-auto",id:"certifications-content"},Ue={class:"row"},De={class:"col-xl-10 col-lg-10 col-md-12 col-sm-12"},Qe={class:"text-primary"},Le={class:"row"},Me={class:"col-xl-10 col-lg-10 col-md-12 col-sm-12"},Te={class:"text-primary"};function Pe(e,t){const l=Object(c["n"])("font-awesome-icon");return Object(c["l"])(),Object(c["e"])("section",Ge,[Object(c["f"])("div",Re,[t[14]||(t[14]=Object(c["f"])("h2",{class:"mb-5"},"Certifications",-1)),Object(c["f"])("div",Ue,[t[6]||(t[6]=Object(c["f"])("div",{class:"col-xl-2 col-lg-2 col-md-12 col-sm-12"},[Object(c["f"])("img",{src:ke.a,alt:"AWS-badge"})],-1)),Object(c["f"])("div",De,[t[1]||(t[1]=Object(c["f"])("h3",null,[Object(c["f"])("a",{href:"https://www.youracclaim.com/users/wilberto-pacheco-batista",title:"Amazon Web Services",target:"_blank"}," Amazon Web Services (AWS)")],-1)),t[2]||(t[2]=Object(c["f"])("div",{class:"subheading mb-3"}," AWS Certified Cloud Practitioner ",-1)),Object(c["f"])("p",null,[Object(c["f"])("small",Qe,[Object(c["i"])(l,{icon:["fas","calendar-alt"]}),t[0]||(t[0]=Object(c["h"])(" (12/14/2020)"))])]),t[3]||(t[3]=Object(c["f"])("h3",null," AWS Certified Cloud Practitioner ",-1)),t[4]||(t[4]=Object(c["f"])("p",null," Earners of this certification have a fundamental understanding of IT services and their uses in the AWS Cloud. They demonstrated cloud fluency and foundational AWS knowledge. Badge owners are able to identify essential AWS services necessary to set up AWS-focused projects. ",-1)),t[5]||(t[5]=Object(c["f"])("ul",{class:"mt-2",style:{"list-style":"square"}},[Object(c["f"])("li",null,"Amazon Web Services"),Object(c["f"])("li",null,"Cloud Computing"),Object(c["f"])("li",null,"Cloud Platform"),Object(c["f"])("li",null,"Cloud Services")],-1))])]),Object(c["f"])("div",Le,[t[13]||(t[13]=Object(c["f"])("div",{class:"col-xl-2 col-lg-2 col-md-12 col-sm-12"},[Object(c["f"])("img",{src:Ze.a,alt:"ITEC"})],-1)),Object(c["f"])("div",Me,[t[8]||(t[8]=Object(c["f"])("h3",null,[Object(c["f"])("a",{href:"https://www.cdac.in/",title:"Centre for Development of Advanced Computing",target:"_blank"}," Centre for Development of Advanced Computing")],-1)),t[9]||(t[9]=Object(c["f"])("div",{class:"subheading mb-3"}," Specialized Training Programme in Multimedia and Web Design Technology ",-1)),Object(c["f"])("p",null,[Object(c["f"])("small",Te,[Object(c["i"])(l,{icon:["fas","calendar-alt"]}),t[7]||(t[7]=Object(c["h"])(" (6/10/2016)"))])]),t[10]||(t[10]=Object(c["f"])("h3",null," Certificate No. CDAC(M)/16-17/ITEC-MWDT/7725 ",-1)),t[11]||(t[11]=Object(c["f"])("p",null," This was an intensive 3 months program in the Centre for Development of Advanced Computing in Mohali, Chandigarh, India to master different tools to create multimedia like: ",-1)),t[12]||(t[12]=Object(c["f"])("ul",{class:"mt-2",style:{"list-style":"square"}},[Object(c["f"])("li",null,"Adobe Photoshop"),Object(c["f"])("li",null,"HTML5"),Object(c["f"])("li",null,"CSS3"),Object(c["f"])("li",null,"JavaScript"),Object(c["f"])("li",null,"jQuery"),Object(c["f"])("li",null,"Wordpress")],-1))])])])])}const Je={},Ke=p()(Je,[["render",Pe]]);var Ne=Ke,ze=l("298a"),He=l.n(ze);const _e={class:"resume-section p-3 p-lg-5 d-flex flex-column",id:"education"},Xe={class:"my-auto",id:"education-content"},$e={class:"row"},et={class:"col-xl-10 col-lg-10 col-md-12 col-sm-12"},tt={class:"text-primary"};function lt(e,t){const l=Object(c["n"])("font-awesome-icon");return Object(c["l"])(),Object(c["e"])("section",_e,[Object(c["f"])("div",Xe,[t[4]||(t[4]=Object(c["f"])("h2",{class:"mb-1"},"Education",-1)),Object(c["f"])("div",$e,[t[3]||(t[3]=Object(c["f"])("div",{class:"col-xl-2 col-lg-2 col-md-12 col-sm-12"},[Object(c["f"])("img",{src:He.a,alt:"UCI"})],-1)),Object(c["f"])("div",et,[t[1]||(t[1]=Object(c["f"])("h3",null,[Object(c["f"])("a",{href:"https://www.uci.cu/",title:"University of Informatic Sciences",target:"_blank"}," University of Informatic Sciences")],-1)),t[2]||(t[2]=Object(c["f"])("div",{class:"subheading mb-3"},"Computer Science Engineer",-1)),Object(c["f"])("p",null,[Object(c["f"])("small",tt,[Object(c["i"])(l,{icon:["fas","calendar-alt"]}),t[0]||(t[0]=Object(c["h"])(" 2005 - 2010"))])])])])])])}const ct={},it=p()(ct,[["render",lt]]);var at=it;const st={class:"bg-primary f-container"},nt={class:"my-auto w-100"},ot={style:{color:"rgba(255,255,255,.5)"},class:"mb-0"};function rt(e,t,l,i,a,s){const n=Object(c["n"])("font-awesome-icon");return Object(c["l"])(),Object(c["e"])("div",st,[Object(c["f"])("div",nt,[Object(c["i"])(n,{icon:["fas","arrow-alt-circle-up"],class:"mt-3 to-top-button bounce",onClick:s.scrollTop,title:"Scroll to Top"},null,8,["onClick"]),Object(c["f"])("p",ot," Copyright © "+Object(c["o"])(a.year)+" Wilberto Pacheco Batista. All rights reserved ",1)])])}var bt={data(){return{year:(new Date).getFullYear()}},methods:{scrollTop(){scroll({top:document.querySelector("#about").offsetTop,behavior:"smooth"})}}};l("0664");const ft=p()(bt,[["render",rt],["__scopeId","data-v-77693644"]]);var dt=ft,ut={name:"Main",components:{Sidebar:h,About:w,Skills:ie,Experience:xe,Languages:we,Certifications:Ne,Education:at,"my-footer":dt},mounted(){var e=new IntersectionObserver((function(e){!0===e[0].isIntersecting&&document.querySelectorAll("div#navbarSupportedContent>ul>li>a").forEach(t=>{t.getAttribute("href")!=="/#"+e[0].target.id?t.classList.remove("active"):t.classList.add("active")})}),{threshold:[.1]});document.querySelectorAll("#sections_container>section").forEach(t=>{e.observe(t)})},methods:{closeToggler(){const e=this.$refs.sidebar;"true"===e.$refs.toggler.getAttribute("aria-expanded")&&e.$refs.toggler.click()},toggleDarkMode(e){const t=e.target.checked,l=document.querySelector("body");t?l.classList.add("theme-dark"):l.classList.remove("theme-dark")}}};l("755d");const mt=p()(ut,[["render",n],["__scopeId","data-v-4fbe4114"]]);var jt=mt,Ot=(l("4989"),l("ab8b"),l("5aea"),l("6da3"),{name:"App",components:{Main:jt},mounted(){document.title="Wilberto Pacheco Batista | Portafolio"}});l("1cd9");const pt=p()(Ot,[["render",i]]);var gt=pt,ht=l("ecee"),vt=l("c074"),Wt=l("f2d1"),yt=l("ad3d");l("15f5");ht["c"].add(vt["a"],Wt["a"]);const xt=Object(c["c"])(gt);xt.component("font-awesome-icon",yt["a"]),xt.component("font-awesome-layers",yt["b"]),xt.mount("#app")},"5aea":function(e,t,l){},"60c7":function(e,t,l){e.exports=l.p+"img/ITEC.1a2923cd.jpg"},"6da3":function(e,t,l){},"6e90":function(e,t,l){"use strict";l("25b1")},7327:function(e,t,l){e.exports=l.p+"img/spanish_flag_cropped.32616b8b.png"},"755d":function(e,t,l){"use strict";l("cd27")},a2fc:function(e,t,l){},a7d7:function(e,t,l){e.exports=l.p+"img/AWS-CloudPractitioner-2020.004d50ea.004d50ea.png"},c106:function(e,t,l){},cd27:function(e,t,l){},d658:function(e,t){e.exports="data:image/png;base64,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"},e5a1:function(e,t,l){e.exports=l.p+"img/profile_cropped.17cf0f68.jpg"}});
//# sourceMappingURL=index.67da1fd8.js.map