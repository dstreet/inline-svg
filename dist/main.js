/*!
 * Inline SVG Polyfill v.1.0.0
 * ----------------------------------------------------------------------------
 * Find inline SVG elements and replace them with a fallback image set via
 * the `data-fallback` attribute.
 *
 * @author David Street
 * @license MIT
 */
!function(t,e){"function"==typeof define&&define.amd?define(["exports"],e):e("object"==typeof exports?exports:t.InlineSVG={})}(this,function(t){t.InlineSVG=function(){function t(){l=document.getElementsByTagName("svg");for(var t=0,i=l.length;i>t;t+=1){var o,a=l[t].getAttribute("data-fallback"),s=null,c=null,f=null,d=null;a&&(c=l[t].querySelector("use"),c&&(f=document.getElementById(c.getAttribute("xlink:href").replace("#","")),f&&(o=e(f),s=l[t].parentElement,d=n(o,a,l[t]),s.insertBefore(d,l[t]),u.push(l[t]))))}r()}function e(t){var e=[],n={};return e=t.getAttribute("viewBox").split(" "),n.x=e[0],n.y=e[1],n.width=e[2],n.height=e[3],n}function n(t,e,n){var r;return r=document.createElement("div"),r.setAttribute("class",n.getAttribute("class")),r.style.width=t.width+"px",r.style.height=t.height+"px",r.style.background="transparent url("+e+") no-repeat -"+t.x+"px -"+t.y+"px",r}function r(){for(var t=0,e=u.length;e>t;t+=1)u[t].style.display="none"}function i(){var t=createElement("div");return t.innerHTML="<svg/>","http://www.w3.org/2000/svg"==(t.firstChild&&t.firstChild.namespaceURI)}var l=null,u=[];return{init:function(){return i()?!1:void t()}}}});