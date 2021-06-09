### Initializing the starter project using Webstorm

We love WebStorm.  So for the rest of this tutorial, we're going to use it exclusively.

In fact, we're going to redo some steps we did with Dolphin in Webstorm so you'll know how.

IMPORTANT: After making sure you've committed all your current files, from a terminal type `git clean -dfx`.  This will remove any untracked files, including node_modules from your project.  This is so Webstorm will detect that `npm i` needs to be run. 

![1623277057085](.md/ 2 Create starter project by copying template directory/1623277057085.png)



Now, launch Webstorm, and choose File > Open.

When the Open File or Project dialog appears, navigate to solutions/exercise-2.1:

![1623276502926](.md/ 2 Create starter project by copying template directory/1623276502926.png)



Press OK.

You will see the Open Project Dialog.  Choose This Window or New Window:

![1623276607582](.md/ 2 Create starter project by copying template directory/1623276607582.png)



You should see something like this:

![1623277189409](.md/ 2 Create starter project by copying template directory/1623277189409.png)

We want you to notice the "Install dependencies" notification in the lower right corner of the Webstorm window.



Click on the ![1623277429257](.md/ 2 Create starter project by copying template directory/1623277429257.png) link on the notification:

![1623277279829](.md/ 2 Create starter project by copying template directory/1623277279829.png)



A new pane will open in Webstorm, and `npm install` will be executed in it.  When finished, Webstorm should look something like this:

![1623277518515](.md/ 2 Create starter project by copying template directory/1623277518515.png)



It turns out that Webstorm executed `npm install` in the "Run" pane.  There is another pane available to us, similar to the terminal pane in Dolphin.  It is called the Terminal pane, and you can activate it by clicking on the Terminal icon at the bottom of the Webstorm window:



![1623277739426](.md/ 2 Create starter project by copying template directory/1623277739426.png)



You should now see the Terminal pane (instead of the Run pane):

![1623277797271](.md/ 2 Create starter project by copying template directory/1623277797271.png)



At this point, you could just type `npm run start`, but there's a more elegant way in Webstorm.  Click on ![1623277875981](.md/ 2 Create starter project by copying template directory/1623277875981.png as shown below:

![1623277941755](.md/ 2 Create starter project by copying template directory/1623277941755.png)



You should see the Run/Debug Configurations dialog thus:

![1623278001268](.md/ 2 Create starter project by copying template directory/1623278001268.png)



Click on either ![1623278095533](.md/ 2 Create starter project by copying template directory/1623278095533.png)or ![1623278120954](.md/ 2 Create starter project by copying template directory/1623278120954.png)as shown below:

![1623278153856](.md/ 2 Create starter project by copying template directory/1623278153856.png)



You should see the Add New Configuration drop-down list.  Choose npm as shown:



![1623278256615](.md/ 2 Create starter project by copying template directory/1623278256615.png)



You should see the Run/Debug Configurations dialog again, but this time with quite a few more fields:

![1623278351750](.md/ 2 Create starter project by copying template directory/1623278351750.png)



Change the Name field to start.  Then drop down the Scripts list, and choose start.  Webstorm got that right out of the package.json:

![1623278568062](.md/ 2 Create starter project by copying template directory/1623278568062.png)



Now click OK, and ![1623278645573](.md/ 2 Create starter project by copying template directory/1623278645573.png) appears instead of Add Configuration:

![1623278749341](.md/ 2 Create starter project by copying template directory/1623278749341.png)



You may now execute `npm run start` by clicking on ![1623278963786](.md/ 2 Create starter project by copying template directory/1623278963786.png) just to the right of ![1623278887715](.md/ 2 Create starter project by copying template directory/1623278887715.png):

![1623278835329](.md/ 2 Create starter project by copying template directory/1623278835329.png)



This will launch web-dev-server and spawn a new browser session.  You should be seeing something like this:

![1623279083302](.md/ 2 Create starter project by copying template directory/1623279083302.png)



Please notice that `npm run start` is running in the Run: pane, which has replaced the Terminal pane in Webstorm.

