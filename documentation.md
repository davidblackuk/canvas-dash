---
layout: page
permalink: /documentation/
title: Documentation
description: "Howtos and articles"

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

## For your reading pleasure

<ul class="post-list">
{% for post in site.posts %} 
  <li><article><a href="{{ site.url }}{{ post.url }}">{{ post.title }} <span class="entry-date"><time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%B %d, %Y" }}</time></span></a></article></li>
{% endfor %}
</ul>


