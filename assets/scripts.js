const axiosGetData=async e=>{return(await axios.get(e)).data},doc=window.document,hh=e=>""===e?"/":`/${e}/`,searchClient=algoliasearch("M53HHHS0ZW","0cfd8f1c1a0e3cb7b2abd77b831614dc"),searchIndex=searchClient.initIndex("docs"),currentPage={folder:null,bookPath:void 0,hasOtp:!1};function debounce(t,o=250){let a;return(...e)=>{clearTimeout(a),a=setTimeout(()=>{t.apply(this,e)},o)}}const getWinWidthStr=()=>{var e=window.innerWidth;return 1200<=e?"xl":992<=e?"lg":768<=e?"md":576<=e?"sm":"xs"},maxColWidth="280px";let winWidth=getWinWidthStr();const establishDisplay=()=>{var{bookPath:e,hasOtp:t}=currentPage;establishDisplayFor("book-col","div.show-book-col",e),establishDisplayFor("otp-col","button.show-otp-col",t)},establishDisplayFor=(e,t,o)=>{if(void 0!==o&&!1!==o){const l=doc.getElementById(e),c=doc.querySelector(t);switch("xl"==winWidth||"lg"==winWidth||"md"==winWidth?(l.style.maxWidth=maxColWidth,l.style.display="block",c.style.display="none"):"sm"!=winWidth&&"xs"!=winWidth||(l.style.maxWidth="none",l.style.display="none",c.style.display="block"),localStorage.getItem(e)){case"block":l.style.display="block",c.style.display="none";break;case"none":l.style.display="none",c.style.display="block";break;default:var a=l.style["display"];localStorage.setItem(e,a)}}};window.addEventListener("resize",()=>{var e=getWinWidthStr();winWidth!=e&&(winWidth=e,establishDisplay())});const scrollHandler=e=>{if(0==doc.querySelectorAll("#otp-col li.dynamic").length)e.target.onscroll=null;else{const l=doc.createElement("a");var o=doc.querySelectorAll("#otp-col a");let t="on-this-page";for(let e=o.length-1;0<=e;e--){l.href=o[e].href;const c=l.hash;var a=c&&c.substring(1);const s=a&&doc.getElementById(a);a=s&&s.getBoundingClientRect();if(a&&a.y<=80){t=s.id;break}}gotoTarget(!1,t,!1)}},scrollPage=e=>{if("on-this-page"==e)doc.getElementById("page-col").scrollTo(0,0);else{const t=doc.getElementById(e);t&&t.scrollIntoView()}},updateHistory=e=>{var t=`${window.location.origin}${currentPage.folder}`;window.history.pushState(null,"","on-this-page"==e?t:`${t}#${e}`)},gotoTarget=async(e,t,o=!0)=>{o&&scrollPage(t),e&&updateHistory(t),setOtpItemToActive(t)},setOtpItemToActive=e=>{const t=doc.querySelector("#otp-col a.active");t&&t.classList.remove("active");const o="on-this-page"===e?doc.querySelector('#otp-col a[href="#on-this-page"]'):doc.querySelector('#otp-col a[href="#'+e+'"]');o&&o.classList&&!1===o.classList.contains("active")&&o.classList.add("active")},getWebpage=async(e,t,o)=>{e=e.replace(/index\.html$/,"");var a=`${window.location.origin}${e}`;if(!e||!a)throw Error("getWebpage on undefined");var[l,c,a]=await axiosGetData(`${a}index.md`);void 0!==l.bookPath&&l.bookPath!==currentPage.bookPath&&(s=doc.createRange().createContextualFragment(await axiosGetData(`${window.location.origin}${hh(l.bookPath)}book.html`)),doc.querySelectorAll("#book-col div.dynamic").forEach(e=>e.remove()),doc.querySelector("#book-col").append(s),doc.querySelectorAll("#book-col i.chapter-icon").forEach(e=>{e.addEventListener("click",e=>{const t=e.target,o=t.closest("div.chapter").querySelector("div.pages");t.classList.contains("fa-angle-right")?(t.classList.remove("fa-angle-right"),t.classList.add("fa-angle-down"),o.style.display="block"):(t.classList.remove("fa-angle-down"),t.classList.add("fa-angle-right"),o.style.display="none")})})),currentPage.bookPath=l.bookPath;var s=l.title;const i=doc.querySelector("div#hh-viewer-wrapper span.title");i.id=l.titleId,i.textContent=s,doc.title=`Reach > ${s}`;doc.getElementById("edit-btn").href=`https://github.com/reach-sh/reach-lang/tree/master/docs/src${e}index.md`;c=doc.createRange().createContextualFragment(c);doc.querySelector("div#hh-viewer-wrapper div#hh-viewer").textContent="",doc.querySelector("div#hh-viewer-wrapper div#hh-viewer").append(c);const r=doc.querySelector("h1");c=r.querySelector("a");r.remove(),i.appendChild(c),i.className+=" refHeader";const n=doc.getElementById("search-input");if(n){currentPage.bookPath=void 0,n.focus();const h=doc.getElementById("search-results-list");n.addEventListener("keyup",debounce(async e=>{const t=(await searchIndex.search(n.value))["hits"];t.length&&(h.innerHTML="",t.forEach(e=>{var t=["sdRef","sdTerm","sdHeader","sdPara","sdGHDis"][e.t];const a=doc.createElement("li");a.classList.add(t);var o=(e,t)=>{const o=doc.createElement("span");o.classList.add(e),o.innerText=t,a.appendChild(o)};const l=doc.createElement("a");l.classList.add("pt"),l.href=e.objectID,l.innerText=e.pt,a.appendChild(l),"sdRef"===t?(o("symbol",e.c),o("scope",e.s)):"sdTerm"===t?o("term",e.c):"sdHeader"===t?o("h",e.c):"sdPara"!==t&&"sdGHDis"!==t||o("p",e.c),h.append(a)}),setClickFollowLink())}))}if(l.hasOtp){doc.querySelectorAll("#otp-col ul ul.dynamic, #otp-col ul li.dynamic").forEach(e=>{e.remove()});const p=doc.querySelector("#otp-col ul"),y=doc.createRange().createContextualFragment(a),g=y.querySelector("ul");g&&g.querySelectorAll(":scope > li").forEach((e,t)=>{0==t?(t=e.querySelector("ul"))&&p.querySelector("li").append(t):p.append(e)})}currentPage.hasOtp=l.hasOtp,doc.querySelectorAll("a").forEach(e=>{e.classList.remove("active")}),doc.querySelectorAll(`a[href="${e}"]`).forEach(e=>{e.classList.add("active")});const d=doc.querySelector(`#book-col a[href="${e}"]`);if(d){const u=d.closest("div.chapter"),b=u&&u.querySelector("div.pages");if(b&&b.hasChildNodes()){const m=u.querySelector("i.chapter-icon");m.classList.remove("fa-angle-right"),m.classList.add("fa-angle-down"),b.style.display="block"}}establishDisplay(),null!=currentPage.bookPath?(doc.getElementById("book-col").classList.remove("banish"),doc.querySelector("div.show-book-col").classList.remove("banish")):(doc.getElementById("book-col").classList.add("banish"),doc.querySelector("div.show-book-col").classList.add("banish")),doc.querySelector("div#hh-page-header").style.display=l.hasPageHeader?"block":"none",doc.getElementById("page-col").style.display="block",l.hasOtp?(doc.getElementById("otp-col").classList.remove("banish"),doc.querySelector("button.show-otp-col").classList.remove("banish")):(doc.getElementById("otp-col").classList.add("banish"),doc.querySelector("button.show-otp-col").classList.add("banish")),currentPage.folder=e,setClickFollowLink(),await gotoTarget(o,t?t.substring(1):"on-this-page")},clickFollowLink=async e=>{if(!(e.shiftKey||e.ctrlKey||e.metaKey)){const o=e.target.closest("a");if(null!==o){if(o.classList&&o.classList.contains("copyBtn"))return e.preventDefault(),void await navigator.clipboard.writeText(o.getAttribute("data-clipboard-text"));var t=o.href;const a=doc.createElement("a");if(a.href=t,a.hostname===window.location.hostname)if(e.preventDefault(),currentPage.folder==a.pathname&&a.hash){const o="#on-this-page"===a.hash?"on-this-page":a.hash.substring(1);await gotoTarget(!0,o)}else await getWebpage(a.pathname,a.hash,!0)}}},setClickFollowLink=()=>{doc.querySelectorAll("a").forEach(e=>{e.addEventListener("click",clickFollowLink)})};window.onpopstate=function(e){const t=doc.createElement("a");t.href=doc.location.href,getWebpage(t.pathname,t.hash,!1)};const makeShowHide=(l,c,s)=>{var e=e=>{var t=e=>e?"block":"none";const o=t(e),a=t(!e);e=e?l:c;doc.querySelector(e).addEventListener("click",e=>{"sm"!=winWidth&&"xs"!=winWidth||(doc.getElementById("page-col").style.display=o),doc.getElementById(s).style.display=a,doc.querySelector(c).style.display=o})};e(!0),e(!1)};makeShowHide("button.hide-book-icon","div.show-book-col","book-col"),makeShowHide("button.hide-otp-icon","button.show-otp-col","otp-col"),doc.getElementById("page-col").addEventListener("scroll",scrollHandler),getWebpage(window.location.pathname,window.location.hash,!0);