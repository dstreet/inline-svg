/*!
 * Inline SVG Polyfill v.1.0.1
 * ----------------------------------------------------------------------------
 * Find inline SVG elements and replace them with a fallback image set via
 * the `data-fallback` attribute.
 *
 * @author David Street
 * @license MIT
 */
!function(e,t){if("function"==typeof define&&define.amd)define(["exports"],t);else if("object"==typeof n)t(n);else{var n={};t(n),e.InlineSVG=n.InlineSVG}}(this,function(e){e.InlineSVG=function(){function e(){l=document.getElementsByTagName("svg");for(var e=0,r=l.length;r>e;e+=1){var a,o=l[e].getAttribute("data-fallback"),s=null,f=null,c=null,d=null;o&&(f=l[e].querySelector("use"),f&&(c=document.getElementById(f.getAttribute("xlink:href").replace("#","")),c&&(a=t(c),s=l[e].parentElement,d=n(a,o,l[e]),s.insertBefore(d,l[e]),u.push(l[e]))))}i()}function t(e){var t=[],n={};return t=e.getAttribute("viewBox").split(" "),n.x=t[0],n.y=t[1],n.width=t[2],n.height=t[3],n}function n(e,t,n){var i;return i=document.createElement("div"),i.setAttribute("class",n.getAttribute("class")),i.style.width=e.width+"px",i.style.height=e.height+"px",i.style.background="transparent url("+t+") no-repeat -"+e.x+"px -"+e.y+"px",i}function i(){for(var e=0,t=u.length;t>e;e+=1)u[e].style.display="none"}function r(){var e=createElement("div");return e.innerHTML="<svg/>","http://www.w3.org/2000/svg"==(e.firstChild&&e.firstChild.namespaceURI)}var l=null,u=[];return{init:function(){return r()?!1:void e()}}}});