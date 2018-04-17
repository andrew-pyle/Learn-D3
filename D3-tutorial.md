# D3 Philosophy
D3.js is not a chart-creation library. D3.js is an SVG manipulation library plus a Data-to-DOM attachment library. Put those ideas together, and you can create arbitrary visualizations of data. Luckily for most of us, arbitrary includes bar charts.

That's why the ideas are so hard to grasp if you are looking to blast out a few bar charts and a line graph. But it's also why D3 is more flexible and more useful than a charting library.

## There are 3 ideas to master to use D3.js:
  - Creating your visualization idea with SVG
  - Joining your data to DOM elements (SVG native elements)
  - D3's code pattern: The General Update Pattern

We'll travel through a few articles written by D3 creator Mike Bostock to get a feel for the process of creating visualizations with D3.

## Visualization with SVG
The 3 parts of the "Let's Make a Bar Chart" article explain the basics of making a chart with SVG manually. Then they explain how D3 automates the process with data joins. You'll get the D3 coding conventions along the way.
  - [Let's Make a Bar Chart Part 1](https://bost.ocks.org/mike/bar/)
  - [Let's Make a Bar Chart Part 2](https://bost.ocks.org/mike/bar/2/)
  - [Let's Make a Bar Chart Part 3](https://bost.ocks.org/mike/bar/3/)

## Data Joins
The "Thinking with Joins" article explains the idea of using data to create DOM elements without iterating or ever creating a `<rect>` element.
  - [Thinking with Joins](https://bost.ocks.org/mike/join/)

## Enter, Update, and Exit
The "How Selections Work" article elaborates on the idea of data joining by putting it in the practical frame of D3's selections. A selection is the method to "grab" a bunch of DOM elements (even ones yet to exist) so they can be joined to data. The Join compares selected DOM elements to data elements and identifies DOM elements to create, destroy, or leave alone to make the selection match the data. This article explores the matching methods (index & key) and introduces the General Update Pattern (Enter, Update, Exit).
  - [How Selections Work](https://bost.ocks.org/mike/selection/)

## `bl.ocks.org` Examples
Now it might be useful to look at some examples of the General Update Pattern in action. The 3 examples below demonstrate the same idea with increasing amounts of flourish. Once you've got this idea, creating anything in D3 is just your specific details and new SVG primitives.

**One caveat:** After reading the above, you should be able to find examples of the type of chart you want to create and make one with your own data, but without using the pattern demonstrated below, updating your visualization code with new data (or real time data) will be a nightmare. That's why these code examples are included here.

  - [General Update Pattern, I](https://bl.ocks.org/mbostock/3808218)
  - [General Update Pattern, II](https://bl.ocks.org/mbostock/3808221)
  - [General Update Pattern, III](https://bl.ocks.org/mbostock/3808234)
