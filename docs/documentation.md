---
layout: page
permalink: /documentation/
title: Documentation
description: "Howtos and articles"
pageJS: documentation.js
---

Fork the GitHub project and away you go.

The `ts` sub-folder of the _git_ root contains the cDash typescript source. The file `cdash.js` contains the javascript version of the library and can be in the `out` folder. Use which ever version you prefer. However: if you make changes to the code, fix defects or contribute new and cool stuff, please modify the typescript file, this is the canonical form of the code.

The supporting libraries that you need to get the code to work are included in the lib folder. Currently the lib files are: the jQuery 1.9.1 framework and the jquery-number plugin. I don't make heavy weight use of jQuery and the cDash library should work with any jQuery version from 1.6 onwards.

The minimal code and markup to surface a cDash control is shown below:


{% highlight html %}

<!DOCTYPE html>
<html>
  <head>
    <title>cDash test page</title>

    <script type="text/javascript" src="ts/lib/jquery-1.9.1.min.js"></script>
    <script type="text/javascript" src="ts/lib/jquery.number.min.js"></script>
    <script type="text/javascript" src="ts/cDash.js"></script>

    <script type="text/javascript">
        $(function(){
            $("#dial1").cDash();
        });
    </script>

  </head>
  <body>
    <canvas id="dial1" width="200" height="200"></canvas>
  </body>
</html>

{% endhighlight %}

If any of that appears a little strange to you then you might want to have a look at an HTML5 and JavaScript tutorial. The only two things of any note are: The `DOCTYPE` declares an HTML5 document (line 1) and the creation of the `canvas` element (line 12).

If you find you canvases being rendered peculiarly have a look at your CSS files. If the canvas appears to have elliptical circles this is usually due to `CSS` modifying the width and height of the canvas. The canvas tag's width and height attributes set the pixel size of the canvas, CSS sets the display size of the container. So a circle of radius 50 on a canvas of with and height 100 will appear round. If the CSS sets the element to width 50, height 100, you get an ellipse (and both are correct, that's the way the world works!).

## Available documentation

<ul class="post-list">
{% for post in site.posts %} 
  <li><article><a href="{{ site.url }}{{ post.url }}">{{ post.title }} <span class="entry-date"><time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%B %d, %Y" }}</time></span></a></article></li>
{% endfor %}
</ul>


## Dials and sliders
<p>You can do a lot with a simple dial. Here are the dial types that are supported and some simple styling on them. For full details on creating, styling and updating dials consult the documentation resources.</p>

## 360<sup>o</sup> dials

The 360 degree dial is available 4 orientations  (North, South, East and west)

<canvas class="excent" width="200" height="200" id="d31"> </canvas>
<canvas class="excent" width="200" height="200" id="d32"> </canvas>
<canvas class="excent" width="200" height="200" id="d33"> </canvas>
<canvas class="excent" width="200" height="200" id="d34"> </canvas>

### 180<sup>o</sup> dials

<P>We have four 180<sup>o</sup> dials , here shown in their 'metro' theme livery </P>

<div class="centerDiv">
    <canvas width="180" height="123" id="d2"> </canvas>
    <canvas width="180" height="123" id="d3"> </canvas>
    <canvas  width="123" height="180" id="d4"> </canvas>
    <canvas width="123" height="180" id="d5"> </canvas>
</div>

### Sliders
<p>It's not all rotational you know. Oh no!, we also do linear :-) Here in the 'dark' apparel we have the Slider control. as usual in its 4 orientations</p>

<div class="centerDiv">
    <canvas  width="220" height="70" id="d6"> </canvas>
    <canvas  width="220" height="70" id="d7"> </canvas>
    <canvas  width="80" height="220" id="d8"> </canvas>
    <canvas  width="80" height="220" id="d9"> </canvas>
</div>

### Marquees

The marquee is a scrolling text banner modeled on the LED strips that used to grace shop windows in the 80s. The marquee is not really ready for prime time yet as it suffers from jerky rendering. But soon, soon, it'll be a contender.

<canvas width="400" height="40" id="marquee"> </canvas>


