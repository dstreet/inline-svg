/*!
 * Inline SVG Polyfill v.1.1.0
 * ----------------------------------------------------------------------------
 * Find inline SVG elements and replace them with a fallback image set via
 * the `data-fallback` attribute.
 *
 * @author David Street
 * @license MIT
 */
!function(t,e){if("function"==typeof define&&define.amd)define(["exports"],e);else if("object"==typeof n)e(n);else{var n={};e(n),t.InlineSVG=n.InlineSVG}}(this,function(t){t.InlineSVG=function(){function t(){u=document.getElementsByTagName("svg");for(var t=0,l=u.length;l>t;t+=1){var s,o=u[t].getAttribute("data-fallback"),f=u[t].getAttribute("data-fallback-size"),c=null,g=null,h=null,d=null;o&&(g=u[t].getElementsByTagName("use"),g.length&&(g=g[0],h=u[t].getAttribute("viewBox")?u[t]:document.getElementById(g.getAttribute("xlink:href").replace("#","")),h&&h.getAttribute("viewBox")&&(s=e(h),c=u[t].parentElement,f&&(f=f.split(" "),s=n(s,parseInt(f[0]),parseInt(f[1]))),d=i(s,o,u[t]),c.insertBefore(d,u[t]),a.push(u[t]))))}r()}function e(t){var e=[],n={};return e=t.getAttribute("viewBox").split(" "),n.x=e[0],n.y=e[1],n.width=e[2],n.height=e[3],n}function n(t,e,n){var i=e/t.width,r=n/t.height;return{x:t.x*i,y:t.y*r,width:e,height:n}}function i(t,e,n){var i;return i=document.createElement("div"),i.setAttribute("class",n.getAttribute("class")),i.style.width=t.width+"px",i.style.height=t.height+"px",i.style.background="transparent url("+e+") no-repeat -"+t.x+"px -"+t.y+"px",i}function r(){for(var t=0,e=a.length;e>t;t+=1)a[t].style.display="none"}function l(){var t=document.createElement("div");return t.innerHTML="<svg/>","http://www.w3.org/2000/svg"==(t.firstChild&&t.firstChild.namespaceURI)}var u=null,a=[];return{init:function(e){return!e&&l()?!1:void t()}}}});