### Modify index.js to display a suitable background color

From Webstorm's project pane, locate and expand ![1623279597923](.md/ 3 Modify index.js to display a suitable background color/1623279597923.png):

![1623279546005](.md/ 3 Modify index.js to display a suitable background color/1623279546005.png)



Now double-click ![1623279644479](.md/ 3 Modify index.js to display a suitable background color/1623279644479.png)to display `index.js` in the Webstorm editor.

![1623279719062](.md/ 3 Modify index.js to display a suitable background color/1623279719062.png)



Notice the ![1623279814288](.md/ 3 Modify index.js to display a suitable background color/1623279814288.png) dialog:

![1623281238052](.md/ 3 Modify index.js to display a suitable background color/1623281238052.png)



Click on ![1623281357094](.md/ 3 Modify index.js to display a suitable background color/1623281357094.png):

![1623281329403](.md/ 3 Modify index.js to display a suitable background color/1623281329403.png)



Nothing much visibly happens, but it's a good idea all the same.

Now, scroll `index.js`  until you can see line 15:

![1623281949180](.md/ 3 Modify index.js to display a suitable background color/1623281949180.png)



Insert a new line right after this one that starts with `scene.` so that Webstorm's indexing feature displays a drop-down of possible attributes and methods.  You'll see `scene.background` is immediately obvious in the list:

![1623282116051](.md/ 3 Modify index.js to display a suitable background color/1623282116051.png)



Add line 16 as shown:

![1623282490520](.md/ 3 Modify index.js to display a suitable background color/1623282490520.png)



Now click ^S to save the file.

You'll see that webpack detects the change and refreshes the browser, which will look something like this:

![1623282599540](.md/ 3 Modify index.js to display a suitable background color/1623282599540.png)

How did we know what type scene.background was?  Well, we didn't really.  

We used ^b to find `scene.background`'s  first occurrence, but that was unhelpful:

![1623282738295](.md/ 3 Modify index.js to display a suitable background color/1623282738295.png)

Next we selected ![1623282851184](.md/ 3 Modify index.js to display a suitable background color/1623282851184.png)and right-clicked to display the drop-down menu item ![1623282949522](.md/ 3 Modify index.js to display a suitable background color/1623282949522.png):

![1623282905837](.md/ 3 Modify index.js to display a suitable background color/1623282905837.png)

This produced a mass of results:

![1623283035512](.md/ 3 Modify index.js to display a suitable background color/1623283035512.png)

We then expanded the ![1623283097210](.md/ 3 Modify index.js to display a suitable background color/1623283097210.png).

![1623283135120](.md/ 3 Modify index.js to display a suitable background color/1623283135120.png)

Which gave us:

![1623283200479](.md/ 3 Modify index.js to display a suitable background color/1623283200479.png)

Expanding these resulted in finding a couple that suggested a pattern we might use:

![1623283312728](.md/ 3 Modify index.js to display a suitable background color/1623283312728.png)

These suggest that scene.background is a THREE.Color() object.

Using this information, we consulted the threejs.org web site's documentation, which is very good, and found this:

![1623283454467](.md/ 3 Modify index.js to display a suitable background color/1623283454467.png)



How did we find it?

We navigated to threejs.org, and then clicked ![1623283644812](.md/ 3 Modify index.js to display a suitable background color/1623283644812.png) as shown:

![1623283572899](.md/ 3 Modify index.js to display a suitable background color/1623283572899.png)

We then clicked in the topics pane on the left to make sure it was selected and used the browser search (^F) to search for instances of the string "Color":

![1623283759902](.md/ 3 Modify index.js to display a suitable background color/1623283759902.png)

Turns out the second instance was useful, so we clicked it:

![1623283795587](.md/ 3 Modify index.js to display a suitable background color/1623283795587.png)

