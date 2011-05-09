Windows
=======
##The Current Window

All Titanium windows are 
[UI.UserWindow](http://developer.appcelerator.com/apidoc/desktop/latest/Titanium.UI.UserWindow-object.html)
objects. Code running in context of an HTML page can easily access the current window:

	:::javascript
	alert(Titanium.UI.currentWindow);

From there it is easy to modify the window at will:

	:::javascript
	Titanium.UI.currentWindow.setTitle(prompt("New window title:"));

All Titanium applications have an initial window, which can be set up
in the <tt>tiapp.xml</tt> file (check out KitchenSink's <tt>tiapp.xml</tt>
file or the [guide](http://developer.appcelerator.com/doc/desktop/tiapp.xml).
Once a window has been opened, it can be closed once, freeing its resources
and can never be opened again. If you'd just like to hide a window, try the following:

	:::javascript
	Titanium.UI.currentWindow.hide();
	setTimeout(function()
	{
		Titanium.UI.currentWindow.show();
	}, 3000);

##Modifying Windows

Most window properties can be changed:

	:::javascript
	Titanium.UI.currentWindow.setFullscreen(
		!Titanium.UI.currentWindow.isFullscreen());

	var newWidth = parseInt(prompt("New window width:"));

	// Keep KitchenSink functional.
	if (!isNaN(newWidth) &amp;&amp; newWidth > 300)
		Titanium.UI.currentWindow.setWidth(newWidth);

	var newHeight = parseInt(prompt("New window height:"));

	// Keep KitchenSink functional.
	if (!isNaN(newHeight) &amp;&amp; newHeight > 300)
		Titanium.UI.currentWindow.setHeight(newHeight);

	// Modify the bounds of the window all at once
	var bounds = Titanium.UI.currentWindow.bounds;
	console.log("Previous bounds: " +
		" x: " + bounds.x +
		" y: " + bounds.y +
		" width: " + bounds.width +
		" height: " + bounds.height);

	bounds.width = 900;
	Titanium.UI.currentWindow.setBounds(bounds);

Some properties can only be changed before a window is originally open though.
In particular, a window may only change its use of chrome before it is opened.

	:::javascript
	// Should have no effect.
	Titanium.UI.currentWindow.setUsingChrome(false);

	// This should work.
	var w = Titanium.UI.createWindow("app://new_window.html");
	w.setUsingChrome(false);
	w.open();

##Transparent Windows

There are two types of transparency in Titanium. Full window transparency
specified with the transparency property and background transparency specified
with the transparent-background property.

###The Transparency Setting

The transparent element should contain a value between 0.0 and 1.0 and
specifies the opacity of the total window. A window with a transparency
value of 0.7 would look like:

	:::javascript
	var w = Titanium.UI.createWindow({
		url: "app://new_window.html",
		transparency: 0.85,
		height: 200
	});
	w.open();

The transparency setting of a window can be modified after it has been
opened. The following example will cause the new window to fade away when
closed:

	:::javascript
	var w = Titanium.UI.createWindow({
		url: "app://fading_window.html",
		height: 200
	});
	w.open();

###The Transparenct Background Setting

The transparent-background property specifies that the WebView in a
window has a background which is transparent. Elements in the WebView
may specify different opacities to create non-rectangular windows. Here is
an example of a non-rectangular Titanium window with a
transparent-background value of true:

	:::javascript
	var w = Titanium.UI.createWindow({
		url: "app://new_window.html",
		transparentBackground: true,
		height: 200
	});
	w.open();

Note that currently the transparent-background property disables all chrome
and overrides the transparency property. The transparent-background property
cannot be changed once a window is open.

