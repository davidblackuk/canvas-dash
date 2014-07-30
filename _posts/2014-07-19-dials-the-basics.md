---
layout: post
title: "Basic dial configuration"
description: Dial types and themes
modified: 2014-07-19 13:55:17 +0100
tags: [dials, cdash, doc]
image:
  feature: 
  credit: 
  creditlink: 
comments: 
share: 
pageJS: dials.js
pageJS2: purl.js
pageJS3: tryMe.js
---

# Dials

There are three types of dials in the cDash library and they all support 4 orientations and multiple themes.

## Themes

The cDash library constsis of a single jQuery extension method. Which if called with no options, renders a 360 degree dial in the default chocolate theme.

The built in themes are:

*	blue
*	chocolate
*	dark
*	metro
*	paper

You can create dials with themes easily (click the try me button to open the code in the editor. Experiment with the commented out code and see what the themes look like). If you're trying this code in a standalone project, don't forget the canvas element!.

<div class="tryMe">

{% highlight javascript %}
//  $("#canvas").cDash({theme: "metro"});
//  $("#canvas").cDash({theme: "dark"});
//  $("#canvas").cDash({theme: "blue"});
//  $("#canvas").cDash({theme: "chocolate"});

// No theme
$("#canvas").cDash();
{% endhighlight %}

</div>

The dial will fill the canvas (at least to the maximum amount it can to maintain its aspect ratio). The dials were designed to be rendered on canvases at a size of about 200 x 200. Smaller sizes of canvases may lead to the dial looking strange as the size of the ticks and scale bands etc will be too large. To address this you need to either fully specify the sizes of these items in the options, or, use a built in display set.

## Display sets

There are two built-in display sets, 'medium' and small'. Below there are three dials sized 200x200, 100x100 and 50x50.


See how the default sizes look terrible on the smaller sized dials?



{% highlight javascript %}
$("#d1").cDash({theme: "blue"});
$("#d2").cDash({theme: "blue"});
$("#d3").cDash({theme: "blue"});
{% endhighlight %}

<div class="excent">
    <canvas width="200" height="200" id="d1"> </canvas>
    <canvas width="100" height="100" id="d2"> </canvas>
    <canvas  width="50" height="50" id="d3"> </canvas>
</div>

Display sets to the rescue. Here's the result of applying the display sets: medium and small

{% highlight javascript %}
$("#d1").cDash({theme: "blue"});
$("#d2").cDash({theme: "blue", displaySet:"medium"});
$("#d3").cDash({theme: "blue", displaySet:"small"});
{% endhighlight %}



<div class="excent">
    <canvas width="200" height="200" id="d4"> </canvas>
    <canvas width="100" height="100" id="d5"> </canvas>
    <canvas  width="50" height="50" id="d6"> </canvas>
</div>

The display sets reduce the number of major and minor ticks, modify the scale text etc. All of these types of adjustments can be made manually if desired (much, much, more of that in another post)

## Setting the value of the dial

The dial creation method stores the dial object as a data property on the canvas jQuery object. You will need to retrieve the actual dial object if you want to update the dial value subsequently, or call other methods. By default the dial is stored using the key 'dbDashboard'

As an example of using the JavaScript object directly let's look at updating the dial value after initialization

{% highlight javascript %}

// our dial is rendered in canvas id: canvas
$("#canvas").cDash();
var dial =  $("#canvas").data("dbDashboard");
dial.value(34);

{% endhighlight %}


If there are multiple dials on one canvas we can't work with a default id (king of the obvious, talking here). You can override the id that gets used in the options object.



{% highlight javascript %}

$("#canvas").cDash({id:"myDial"});
var dial =  $("#canvas").data("myDial");
dial.value(34);

{% endhighlight %}

Either way the result of setting the value will animate the dial to the new value.

