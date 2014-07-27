---
layout: page
title: Welcome to cDash
description: "HTML 5 canvas based dashboard dials and gauges."
tags: [cDash, about, html5, canvas, dials, gauges, dsahboards, controls, jQuery]
pageJS: index.js
---


cDash is a collection of dials, gauges and other controls that you can add to your web pages. The primary purpose of cDash gauges was for embedding in reports and dashboards, however they have been used in many other ways also.

The suite features:

* 100% HTML5 Canvas based
* Implemented in Typescript, also available in javascript
*	Open source
*	Provided as a jQuery plugin
*	Animated and themable
*	Highly customizable, modify:
	*	Fonts, colors
	*	Needle shapes, scale tick counts, sizes colors etc
	*	Packaged as themes (and you can define your own)



<h2>Dials and sliders</h2>
You can do a lot with a simple dial. Here are the dial types that are supported and some simple styling on them. For full details on creating, styling and updating dials consult the 
[documentation](/documentation/).

## 360<sup>o</sup> dials

The 360 degree dial is available 4 orientations  (North, South, East and west)

<canvas class="excent" width="200" height="200" id="d31"> </canvas>
<canvas class="excent" width="200" height="200" id="d32"> </canvas>
<canvas class="excent" width="200" height="200" id="d33"> </canvas>
<canvas class="excent" width="200" height="200" id="d34"> </canvas>

## 180<sup>o</sup> dials

<P>We have four 180<sup>o</sup> dials , here shown in their 'metro' theme livery </P>

<div class="centerDiv">
    <canvas width="180" height="123" id="d2"> </canvas>
    <canvas width="180" height="123" id="d3"> </canvas>
    <canvas  width="123" height="180" id="d4"> </canvas>
    <canvas width="123" height="180" id="d5"> </canvas>
</div>

## Sliders
<p>It's not all rotational you know. Oh no!, we also do linear :-) Here in the 'dark' apparel we have the Slider control. as usual in its 4 orientations</p>

<div class="centerDiv">
    <canvas  width="220" height="70" id="d6"> </canvas>
    <canvas  width="220" height="70" id="d7"> </canvas>
    <canvas  width="80" height="220" id="d8"> </canvas>
    <canvas  width="80" height="220" id="d9"> </canvas>
</div>

## Marquees

The marquee is a scrolling text banner modeled on the LED strips that used to grace shop windows in the 80s. The marquee is not really ready for prime time yet as it suffers from jerky rendering. But soon, soon, it'll be a contender.

<canvas width="400" height="40" id="marquee"> </canvas>






