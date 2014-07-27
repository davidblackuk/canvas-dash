---
layout: page
permalink: /about/
title: About cDash
description: "cDash: About the HTML 5 canvas based dashboard dial a=nd gauge license"
tags: [cDash, about, html5, canvas, dials, gauges, dsahboards, controls, jQuery]
modified: 2014-07-18
image:
  feature: banner.png
  credit: David Black
  creditlink: http://www.overtakenbyevents.com
---

This project started as a way for me to experiment with two new things, the HTML5 canvas and Microsoft's new TypeScript compiler. What the project has become is a small but growing set of reusable dashboard controls.

While cDash is implemented in Typescript the output of the compiler is vanilla JavaScript, so	these controls can be used in any web project with only a basic knowledge of JavaScript.

However, the libraries reliance on the HTML5 browser control means that the controls will only work on up-to-date browsers. The following browsers are all up to spec:

*	Safari 4.0+
*	Firefox 6.0+
*	Chrome 10+
*	Opera 10+
*	IE 9+ [^1]


License
=======

For full details of the license for cDash please see the license page. However to precise the terms included there, cDash is open source via the [MIT](http://en.wikipedia.org/wiki/MIT_License) license and may be used in your projects both open and closed source, commercial and non-commercial. Have fun.

Acknowledgments
===============

The cDash code and the contents of this web site are based in part on work done by others. As always I'm really grateful to anyone who puts time and effort into an open source endeavor.

cDash uses the ubiquitous [jQuery library](http://www.jquery.org) and plugs into it too, It also uses the jquery-number formatting library by Sam Sehnert of [Digital Fusion](http://www.teamdf.com).

This web site is based on the So Simple Theme and generated using Jekyll (links to both are on the footer of each and every page).



[^1]: For IE 8 and older you could try using the controls in association with the [Flash canvas plugin][fcp]

[fcp]: http://flashcanvas.net
