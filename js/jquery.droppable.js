/* ========================================================================
 * Dset: jQuery.droppable.js v1.0.0
 * ========================================================================
 * Copyright 2017 Hetrotech Private Limited.
 * Licensed under MIT
 * ======================================================================== */


 
;(function($,window){
	'use strict';
//Droppable Class To Handle Drop Events on Elements
//Using Drag and Drop Functionality
var Droppable = function(options) {
	createControlElements();
	this.keys = $.extend({},$.fn.droppable.defaults,options);
	this.droppableObject;
	this.previous;
	this.$selected = {
		element: 'undefined',
		drop: 'undefined',
		dragLeave: 'undefined',
		dragOver: 'undefined',
		dropActive:'undefined',
		tagName:'undefined'
	};
	$(window).on('click',$.proxy(this.onDropSelect,this)).off('keydown',$.fn.settings.onKeyDown).on('keydown',$.proxy($.fn.settings.onKeyDown,this)).on('keydown',$.proxy($.fn.settings.onDropKeyDown,this));
	$.fn.settings.commands['common']();
	$.fn.settings.commands['drop']();
}

Droppable.VERSION = "1.0.0";
Droppable.pluginName = "DROPPABLE";
Droppable.AUTHOR = "Sagar Dewani";
Droppable.WEBSITE = "http://www.hetrotech.in/";

function reg_droppable(options) {
    new Droppable(options);
}
//defining jQuery namespace droppable
$.fn.droppable = function(options) {
    return reg_droppable(options);
};

window.$.droppable = $.fn.droppable;

var settings = {
	disableSelect: [$("body"), $("#wrapper"), $("html"), $("option")],
	defSetting :{
		droppable: 0
	},
	modalCreated:0,
	commands:{
		'common':function() {
			var keyCode = ['alt+shift+ctrl','ctrl+m','ENTER'];
			var keyUse = ['to go back to normal mode','to check which mode is active','to view the source generated'];
			var i,html;
			for(i=0;i<keyCode.length;i++)
			{
				html = "<li class='d-set'><pre class='d-set'><code class='d-set'><i class='d-set'>"+keyCode[i]+"</i> : "+keyUse[i]+"</code></pre></li>";
				$('#cmdList').append(html);
			}
		},
		'drop':function(){
			var keyCode = ['shift+i'];
			var keyUse = ['to (de)activate droppable mode'];
			var i,html;
			for(i=0;i<keyCode.length;i++)
			{
				html = "<li class='d-set'><pre class='d-set'><code class='d-set'><i class='d-set'>"+keyCode[i]+"</i> : "+keyUse[i]+"</code></pre></li>";
				$('#cmdList').append(html);
			}
		}
	},
	onKeyDown: function(e){
		var $that = this;
		if ($that.$selected.element !== 'undefined')
		{
			if (e.shiftKey && e.ctrlKey && e.altKey){
				for (var key in $.fn.settings.defSetting) {
					if ($.fn.settings.defSetting.hasOwnProperty(key))
						$.fn.settings.defSetting[key] = 0;
				}
			}
			if (e.ctrlKey && e.which == $that.keys.modeKey) {
				var mode = "normal";
				for (var key in $.fn.settings.defSetting) {
					if ($.fn.settings.defSetting.hasOwnProperty(key))
						if ($.fn.settings.defSetting[key] == 1) 
						mode = key;
				}
				alert("Activated Mode: " + mode);
			}
			if (e.which == $that.keys.sourceKey) {
				if($.fn.settings.defSetting.transition){
					$(".modal-body>pre").empty();
					var sheet;
					var styleSheets = $("style#d-set-stylesheet")[0].sheet ? $("style#d-set-stylesheet")[0].sheet : $("style#d-set-stylesheet")[0].styleSheet;
					var styleSheetRules = styleSheets.rules ? styleSheets.rules : styleSheets.cssRules;
					var len = styleSheetRules.length ? styleSheetRules.length : styleSheetRules.length;
					var targetClass = $that.$selected.element.attr('class').split(' ');
					var i;
					var selectorText;
					for(i=0;i<len;i++)
					{
						selectorText = styleSheetRules[i].selectorText.replace('.','');
						if(targetClass.indexOf(selectorText) > -1)
							$(".modal-body>pre").append("<code class=d-set style='background-color:#7fdfde;'>"+styleSheetRules[i].cssText+"</code><br/>");
						else
						$(".modal-body>pre").append("<code class=d-set>"+styleSheetRules[i].cssText+"</code><br/>");
					}
					$("#source-container").modal('show');
				}
				else if($.fn.settings.defSetting.colorify || $.fn.settings.defSetting.reposizing){
					$(".modal-body>pre").empty();
					$(".modal-body>pre").append("<code class=d-set>"+$that.$selected.element.attr('style')+"</code><br/>");
					$("#source-container").modal('show');
				}
			}
			//old.apply(this,arguments);
			
		}
		if(e.altKey && e.which == '72')
		{
			$("#cmdListContainer").toggleClass('hide');
		}
	},
	onDropKeyDown: function(e){
		var $that = this;
		if ($that.$selected.element !== 'undefined')
		{
			if (e.shiftKey && e.which == $that.keys.droppableKey)
			{
				for (var key in $.fn.settings.defSetting) {
					if ($.fn.settings.defSetting.hasOwnProperty(key))
						if ($.fn.settings.defSetting.droppable) continue;
							$.fn.settings.defSetting[key] = 0;
				}
				$.fn.settings.defSetting.droppable = ($.fn.settings.defSetting.droppable == 0) ? 1 : 0;
			}
			if(e.which == $that.keys.sourceKey)
			{
				if($.fn.settings.defSetting.droppable){
					$(".modal-body>pre").empty();
					var rules;
					if($that.keys.background.set)
					{
						rules ="{";
						rules += $that.$selected.element.attr('style');	
						rules += "}";
						
					}
					else
					{
						rules = "Add these elements   &ltimg class='drop-img' src='your-img-path' /&gt";
					}
					$(".modal-body>pre").append("<code class=d-set>"+rules+"</code><br/>");
					$("#source-container").modal('show');
				}
			}
			//old.apply(this,arguments);
		}
	}
}



$.fn.settings = $.extend(true,{}, $.fn.settings|| {},settings);

$.fn.droppable.defaults = {
	droppableKey:'73',
	sourceKey:'13',
	modeKey:'77',
	//size:'default',
	//allowedTypes:['jpeg','png','gif'],
	//maxSize:1024*1024*2,
	dimensions:{
		maxDimensions:{
			width:1920,
			height:1080
		},
		minDimensions:{
			width:1,
			height:1
		},
	},
	customDimensions:true,
	background:{
		set:false,
		position:'initial',
		size:'cover',
		repeat:'no-repeat',
		origin:'content-box'
	}
	
};

Droppable.prototype.onDropSelect = function(e){	
	var $that = this;
	var disable = $.fn.settings.disableSelect;
	var len = disable.length,i;
	for(i=0;i<len;i++)
	{
		if($(e.target).is(disable[i]))return;
	}		
	if($(e.target).is('[class*="d-set"]')) return;
	$that.$selected.element = $(e.target);
    //$that.droppableObject = new Droppable($that.$selected.element);
    $that.$selected.dragOver = $that.$selected.element != 'undefined' ? _dragover.call($that) : 'undefined';
    $that.$selected.dragLeave = $that.$selected.element != 'undefined' ? _dragleave.call($that) : 'undefined';
    $that.$selected.drop = $that.$selected.element != 'undefined' ? _drop.call($that) : 'undefined';
	$that.$selected.tagName = $that.$selected.element != 'undefined' ? $that.$selected.element[0].tagName.toLowerCase() : 'undefined';
	$that.$selected.dropActive = $that.$selected.element != 'undefined' ? $.fn.settings.defSetting.droppable : 'undefined';
    //console.log($that.$selected);
    //if item is selected and stored in object then
    //check if previous element is set then check if previous element has border-blue class
    //then remove border blue class from previous element.

    if ($that.$selected.element) {
        if ($that.previous && $that.previous.hasClass('border-blue')) {
            $that.previous.removeClass('border-blue');
        }
		$that.previous = $that.$selected.element;
        $that.previous.addClass('border-blue');
	}

	function _dragover() {
		var dropActive;
		var selected_element = this.$selected.element;
		return selected_element.off('dragover').on('dragover', function(e) { //guarding against multiple event triggering using .off
        e.preventDefault();
        e.stopPropagation();
		dropActive = $.fn.settings.defSetting.droppable;
		if(dropActive)
        $(this).addClass('dragOver');
		});
	}
	function _dragleave(){
		var dropActive;
		var selected_element = this.$selected.element;
		return selected_element.off('dragleave').on('dragleave', function(e) {
			e.preventDefault();
			e.stopPropagation();
			dropActive = $.fn.settings.defSetting.droppable;
			if(dropActive)
			$(this).removeClass('dragOver');
		});
	}
	function _drop(){
		var that = this;
		var dropActive;
		var selected_element = this.$selected.element;
		return selected_element.off('drop').on('drop', function(e) {
			e.preventDefault();
			e.stopPropagation();
			dropActive = $.fn.settings.defSetting.droppable;
			if(dropActive)
			{
				$(this).removeClass('dragOver');
				triggerCallback.call(that,e);
			}	
		});
	}
	
}

//To call the readURL to read the source of dropped file over element
function callback(files,setDimensions,background) {
    readURL(files, this.$selected.element,setDimensions,background);
}
//To read the source of dropped file over element
function readURL(files, $element,setDimensions,background) {
    if (files) {
		if(background.set)
		{
				var size = background.size,
				origin=background.origin,
				repeat=background.repeat,
				position=background.position;
				$element.css('background-image','url("'+files+'")');
				$element.css('background-origin',origin);
				$element.css('background-position',position);
				$element.css('background-repeat',repeat);
				$element.css('background-size',size);
			}
			else
			{
				if(setDimensions)
				{	
					
					var image = new Image();
					image.onload = function(e){
						image.className = "drop-img";
						$element.append(image);
					}
					image.src = files;
					
				}
				else
				{
					if($element.prop('tagName') == "IMG")
					{
						$element.attr('src',files);
					}
					else
					{
						$element.html('<img class="drop-img" src=' + files + ' />');
					}	
				}
			}	
    }
}
function checkIfImage(url,dimensions,setDimensions,timeouT)
{
	if(window.Promise)
	{
		return new Promise(function (resolve, reject) {
			var timeout = timeouT || 5000;
			var timer, img = new Image();
			img.onerror = img.onabort = function () {
				clearTimeout(timer);
				reject(Error("Image URL is not retrievable\n Please drop image with actual URL(might not in encoded form)"));
			};
			img.onload = function (e) {
				clearTimeout(timer);
				if(setDimensions)
				{
					var maxHeight,maxWidth,minHeight,minWidth;
					maxHeight = dimensions.maxDimensions.height;
					maxWidth = dimensions.maxDimensions.width;
					minHeight = dimensions.minDimensions.height;
					if(img.width > maxWidth || img.width < minWidth)
					{
						reject(Error("The image dimensions doesn't match the specified criteria of\n Max Width: "+maxWidth+"px or Min Width: "+minWidth+"px"));
					}	
					else if(img.height > maxHeight || img.height < minHeight)
					{
						reject(Error("The image dimensions doesn't match the specified criteria of\n Max Height: "+maxHeight+"px or Min Height: "+minHeight+"px"));
					}	
					else
					{
						resolve("success");
					}
				}
				else resolve("success");
			};
			timer = setTimeout(function () {
				// reset .src to invalid URL so it stops previous
				// loading, but doesn't trigger new load
				img.src = "//!!!!/test.jpg";
				reject("timeout");
			}, timeout);
			img.src = url;
		});
	}
	else
	{
		throw new Error("Please upgrade your browser\n This doesn't support the Promises.");
	}
}


function triggerCallback(e) {
    var files =[],type,size;
	var that = this;
	//var rawTypes = that.keys.allowedTypes;
	var rawSize = that.keys.maxSize;
	var dimensions = that.keys.dimensions;
	var setDimensions = that.keys.customDimensions;
	var background = that.keys.background;
	var el = that.$selected.element;
    if (e.originalEvent.dataTransfer) {
        files = e.originalEvent.dataTransfer.items;//|| e.originalEvent.dataTransfer.files;
    }
	for(var i=0; i< 1;i++)
	{	

		files[i].getAsString(function(url){checkIfImage(url,dimensions,setDimensions).then(function(data){if(data == "success")callback.call(that,url,setDimensions,background); }).catch(function(e){console.log(e);})});
	}
/*	
	else
		throw new Error("file is not an image file. Drop only images.");
	
	if(rawTypes.indexOf(type) > -1)
	{
		if(size > rawSize)
		return alert("File size exceeds maximum allowed size");
	}*/
    //callback.call(that, files,dimensions,setDimensions,background);
}

function createControlElements()
{
	if($.fn.settings.modalCreated == 0)
	createSourceModal();
}


function createSourceModal()
{
	var modal = '<div id="source-container" class="modal fade d-set" role="dialog">\
		  <div class="modal-dialog d-set">\
			<div class="modal-content d-set">\
			  <div class="modal-header d-set">\
				<button type="button" class="close d-set" data-dismiss="modal">&times;</button>\
				<h4 class="modal-title d-set">CSS Styles</h4>\
			  </div>\
			  <div class="modal-body d-set">\
				<pre class="d-set"></pre>\
			  </div>\
			  <div class="modal-footer d-set">\
				<button type="button" class="btn btn-default d-set" data-dismiss="modal">Close</button>\
			  </div>\
			</div>\
		</div>\
		</div>';
		$('body').append(modal);
	 $.fn.settings.modalCreated = 1;
}

/*function bytesToSize(bytes) {
	var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
	if (bytes == 0) return '0 Bytes';
	var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
	return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
}*/

})(jQuery,window);
//// Droppable Class End //////////////////////