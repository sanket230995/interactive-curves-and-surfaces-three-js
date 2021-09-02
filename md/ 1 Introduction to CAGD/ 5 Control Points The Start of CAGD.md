### Control Points: The Start of CAGD

![1623196134559](.md/5/1623196134559.png)

Take four points in a plane and connect them to form a polygon.  The four points may be called *control points*, in that they *are points in two or more dimensions that define the behavior of the resulting curve*.  The polygon formed by connecting the control points in the "correct" order are called the *control polygon*.  The control polygon provides a crude analogy of the refined curve.  Note that the control polygon is typically open (the ends are not coincident), and it may self-intersect.  The control points and the control polygon determine the approximate shape of the curve to be formed.





#### Exercise 1.5.1

Write an application in threejs using `template/` as a starting point.

There are detailed instructions in `template/README.md` describing how to create a new application using `template/` as a starting point.

Make sure to read the code.  You'll want to keep the [threejs manual](https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene) handy.  Look up the classes and methods as you read.  There's no faster way to learn threejs.

If successful, you should see a black screen with a sort of rotating cube that looks like this:

![1629779170492](.md/ 5 Control Points The Start of CAGD/1629779170492-16305581768211.png)

Now turn off the animation.

Remember when you searched the three.js documentation for "point".

If you were paying attention, you will have seen an example where 10000 points were displayed, creating a sort of starscape.

Comment out the code that created the cube and replace it with the code for the starscape.



