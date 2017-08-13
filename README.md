# # Droppable JS Plugin

# Author: Sagar Dewani_

### Official Website :_ [HetroTech](http://hetrotech.in/)

### Official Email:_ [info@hetrotech.in](mailto:info@hetrotech.in?subject=Support)

### Personal Email:_ [sagar7930@gmail.com](mailto:sagar7930@gmail.com?subject=droppable%20support)

### Facebook :_ [Sagar Dewani](https://www.facebook.com/sagar.dev.1426)

### LinkedIn:_ [Sagar Dewani](https://linkedin.com/in/sagar-kumar-3420a1b2)

### Updated Document would be available at : [Dset Document](http://hetrotech.in/projects/dset/index.html#document)

1.	Droppable JS Plugin is a jQuery and Javascript based plugin to dynamically set background or add images to the selected element.
2.	This plugin provide you easy and convenient way to apply images on the element.
3.	This plugin comes with many handy features that are just one press away from you. Just press the command keys and see the magic of plugin.
4.	This plugin is intended to apply images on the element to view how your layout will look after adding the image on that element. However the effects are temporary and get removed as soon as you refresh the page. This is only to show you how your layout will look not to set your layout permanently. You must need to add the HTML code or CSS to make the effects permanent.
5.	This plugin is for testing before implementing your CSS styles into HTML. For actual effect you must copy the CSS code or HTML code generated and paste it in your HTML file.
6.	Now, this plugin is not compatible with mobile browser versions.


 ***HOW TO SETUP***

 To setup Droppable plugin for your project you should include the
 following plugins as dependency in your project before including this
 plugin:

 The plugin is tested with mentioned dependencies:

-   jQuery 3.x

-   Bootstrap 3.7.x

-   font-awesome 4.7.x

-	Don't forget to link style.css file comes with this plugin.

- After including all these dependencies insert Droppable plugin javascript file in your project using


 ```javascript 
       <script type="text/javascript" src="jquery.droppable.min.js"></script>
 ```

 ***HOW TO USE***
 
Include this javascript code in your HTML layout ```$.droppable();``` or
 ```$.droppable({options});```
```javascript
	$.droppable();
```

_You can also change the triggering key combination_

| **Option**   | **Default Value** | **Description** | **Usage - Example** |
| --- | --- | --- | --- |
| droppableKey   | 73 – key code | To trigger on/off droppable mode | $.droppable({droppableKey:&#39;66&#39;}); |
| modeKey  | 77 – mode key | To check which mode is active. An alert will popup.  | $.droppable({modeKey:&#39;66&#39;}); |
| sourceKey  | 13 – source key | To check the element applied inline styles. An modal will popup.  | $.droppable({sourceKey:&#39;66&#39;}); |
| dimensions        | maxDimensions:{     width:1920,     height:1020},  minDimensions:{     width:1,     height:1} | Maximum and minimum dimensions of image. This property works when customDimensions is set to true.And background.set must be set to false.  | $.droppable({dimensions:{    maxDimensions.width = 768 }});  Only numeric values are allowed |
| customDimensions  | false | To set custom dimensions.Set it to true to set the dimensions property.And background.set must be set to false.  | $.droppable({customDimensions:true}); |
| background                | set: true, position:&#39;initial&#39;, size:&#39;cover&#39;, repeat:&#39;no-repeat&#39;, origin:&#39;content-box&#39;  | To set background CSS properties. You can set any of these properties to set the background according to you. | $.droppable({background.set:false});It will generate a new image tag and set the images inside that tag instead of setting images as background. $.droppable({background: { size:&#39;initial&#39;,  repeat:&#39;repeat&#39; }}); |

**HOW TO SET IMAGE** :

- Select the element on which image need to be set.
- Then, select any image from outside sources(like Google,facebook,etc.(that contains image URL) excluding your PC or localdisk).
- Then Drag the image to the selected element and drop the image to set the image as background or relative image.\*\*

**KEY COMBINATIONS** :

| # | #Key Combination | Description |
| --- | --- | --- |
| 1 | _Shift+i_ | Select the element and press the key combination to turn on/off the droppable mode.\*\*  |
| 2 | _Ctrl+m_ | Select the element and press the key combination to check which mode is currently active.\*\*  |
| 3 | _Shift+Ctrl+Alt_ | Select the element and press the key combination to go back to normal mode.\*\*  |

\*\*_Note: Please make sure that you select the element again after on/off the mode to update the configuration otherwise previous configuration may be retained._

**Support:**

If you find any kind of bug or want to give suggestions or want to team with us. Email us at listed emails above.