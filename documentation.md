---
layout: page
permalink: /documentation/
title: Documentation
description: "How tos and articles"
tags: [cDash, about, html5, canvas, dials, gauges, dsahboards, controls, jQuery]
---

cDash lives on GitHub, click the ribbon at the top of the page to go to the project. There are two ways to work with cDash, either fork the repository
on GitHub and work with that (great for keeping up to date) or, download the project as a zip file and expand that.

Regardless of how you install the source what you'll end up with is a directory structure on disk, most of which you cane safely ignore unless you want to contribute :-)

The minimal code and markup to surface a cDash control is included in the index.html file in the root of the distribution (open it and see a dial and it should look round and proud[^1]). The file contents look like: 


{% highlight html %}
<!DOCTYPE html>
<html>
<head>
    <script type="text/javascript" src="lib/jquery-1.9.1.min.js"></script>
    <script type="text/javascript" src="lib/cDash.js"></script>
</head>
<body>
    <canvas id="dial1" width="200" height="200"></canvas>
    <script type="text/javascript">
        $(function () {
            $("#dial1").cDash();
        });
    </script>
</body>
</html>
{% endhighlight %}

 The only two things of any note are: The `DOCTYPE` declares an HTML5 document (line 1) and the creation of the `canvas` element (line 9).

To reuse the code in your projects simply copy `cDash.js`  from the `lib` folder and put it into your own project. 

## Compatibility

The example uses `jQuery 1.9.1` but I don't make any heavy weight use of JQuery's features and I expect it should work with jQuery versions back to 1.7. Other than `jQuery` cDash has no external dependencies.

## For your reading pleasure

Here are the all important hooks into the documentation.

<ul class="post-list">
{% for post in site.posts %} 
  <li><article><a href="{{ site.url }}{{ post.url }}">{{ post.title }} <span class="entry-date"><time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%B %d, %Y" }}</time></span></a></article></li>
{% endfor %}
</ul>

<br/>
Footnotes

[^1]: If you find you canvases being rendered peculiarly have a look at your CSS files. If the canvas appears to have elliptical circles this is usually due to `CSS` modifying the width and height of the canvas. The canvas tag's width and height attributes set the pixel size of the canvas, CSS sets the display size of the container. So a circle of radius 50 on a canvas of with and height 100 will appear round. If the CSS sets the element to width 50, height 100, you get an ellipse (and both are correct, that's the way the world works!).



