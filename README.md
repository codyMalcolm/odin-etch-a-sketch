# Etch-a-Sketch

## Objective

To create a virtual "Etch-a-sketch" where when the user passes the mouse through a div, the div gets colored and remains colored until the grid is reset.

#### Specifications

##### Main

1. Project should utilize Git and GitHub.
2. The webpage should be initialized with a 16x16 square grid of divs, created in Javascript
3. Divs should change color on mouseover, and remain changed.
4. There should be a button at the top of the screen to clear the current grid and prompt the user for the number of squares per side in a new grid. New grids should occupy the same total space, even if the number of squares is different.

##### Recommended

1. The grid of divs should go in a container.

##### Optional

1. Instead of changing every square to the same color, change them to random values.
2. Instead of the above, have each pass increment the fixed color by 10%, requiring 10 passes to completely darken.

##### Ambiguous

1. For the first optional task, should a given square only change if it was previously blank?

#### Learning Objectives

To demonstrate mastery of manipulating DOM elements with Javascript.

## Author's Notes

#### Preliminary Thoughts

I'm going to implement both optional functionalities in parallel to the basic requirements, and the user can select their preference to reset a new grid. There may not be any new concepts for me in this project, but it will be a good exercise in architecture.

#### Final Thoughts

I learned more in this project than I was expecting. Before I get into that, I should mention that I misunderstood the optional task prior to starting the project. The instructions were:

>(Optional): Instead of just changing the color of your grid from black to white (for example) have each pass through it with the mouse change to a completely random RGB value. Then try having each pass just add another 10% of black to it so that only after 10 passes is the square completely black.

The way I interpreted this, was as follows:

>Instead of just changing the color of your grid from black to white (for example) have each pass through it with the mouse change to a completely random RGB value.
>Then try having each pass just add ~~another~~ 10% of black to it so that only after 10 passes is the square completely black.

I thought there were two unrelated tasks. When re-reading once mostly implemented, I realized that I was actually supposed to be darkening the colored squares (which resolves the ambiguity above, by the way).

So, as a result, my implementation now has four options.

1. Basic Etch-a-Sketch
2. Etch-a-Sketch with random colors
3. Etch-a-Sketch going from light grey to black over 10 passes
4. Etch-a-Sketch going from a random color to grey over 10 passes

In addition to the above, I added a click functionality where if the user clicks while within the grid, the mouse won't "draw" until the user clicks again. Yes, I know that's not how etch-a-sketch works. But my wife was trying it out and kept getting frustrated when she messed up, and it's strictly more functionality that can be ignored or removed easily.

As for what I learned, and for what:

* I had to get a better understanding of the `parseInt` function and the `NaN` value in order to guarantee a valid value was passed to the grid creation function. Also testing for NaN.
* Second, I had previously only used `innerHTML`, `textContent`, `classList`, and style manipulation for modifying the DOM - but never inserting or deleting nodes. I challenged myself to use `appendChild` for this challenge, which ultimate resulted in much cleaner code. This caused a bit of a problem because as it turns out, you can't add a node more than once - but it took no time to find the `cloneNode()` function to solve that problem. I also made use of `removeChild()` to clear the previous nodes on reset.
* Third, I really like HSL(A). But it turns out that browsers will always convert color to RGB, so in order to avoid assigning each cube a unique identifier (using nested for loops and `dataset`) for the darkening functionalities, I had to find a way to parse their color from the node. I'm not entirely satisfied with how I parsed the colors (in `rgb(r, g, b)` format), in reflection it would have been cleaner to use regex. In any case, this was my first legitimate usage of a negative value in `slice()`, so I'm happy about that.
* Last, althought I've used `dataset` before, this is the first time I've assigned a data value with Javascript. I'm glad that's possible, because it was necessary to track the color deltas on a cube-by-cube basis for the final functionality.

All in all, I found this a very enjoyable and rewarding little project.

## Miscellaneous

Read more about this project at [The Odin Project.](https://www.theodinproject.com/courses/web-development-101/lessons/etch-a-sketch-project)
