
// Can be changed
var strike_autostart = (typeof strike_autostart === "undefined") ? true : strike_autostart;
var strike_autoTime = (typeof strike_autoTime === "undefined") ? 8*1000 : strike_autoTime;
var strike_featCount = (typeof strike_featCount === "undefined") ? 4 : strike_featCount;

var featLast = 1;
var isAnim = false;

var isinsitelikes = false;
var isinsitememb = false;
var timer;
var timerb;

var currenteditor = "";

var dofreeze = true;

var thetop = parseInt((jQuery(window).height()/2)-50);

(function ($) {
	"use strict";

	window.document.onload = function(e){starFnc();}
	window.onload = function(e){starFnc();}

	// Check if the device supports touch events
	if('ontouchstart' in document.documentElement) {
		// Loop through each stylesheet
		for(var sheetI = document.styleSheets.length - 1; sheetI >= 0; sheetI--) {
			var sheet = document.styleSheets[sheetI];
			// Verify if cssRules exists in sheet
			if(sheet.cssRules) {
				// Loop through each rule in sheet
				for(var ruleI = sheet.cssRules.length - 1; ruleI >= 0; ruleI--) {
					var rule = sheet.cssRules[ruleI];
					// Verify rule has selector text
					if(rule.selectorText) {
						// Replace hover psuedo-class with active psuedo-class
						rule.selectorText = rule.selectorText.replace(":hover", ":active");
					}
				}
			}
		}
	}

	jQuery(document).scroll(function() {
		if(jQuery(".strike-modal.active").length > 0){
			var winposition = parseInt(jQuery(window).scrollTop());

			jQuery(".strike-modal").css("top",(parseInt(winposition+thetop))+"px");
		}
	});

	jQuery(document).on("ready resize", function() {
		resizeSidebar();
	});

	function resizeSidebar(){
		jQuery("#sidebar").css("min-height", parseInt(jQuery("#main").height())+65);
	}

	setTimeout(function(){resizeSidebar()}, 200);

	jQuery(document).ready(function() {
		jQuery(".accordion .accordion-tab > a").click(function () {
			var thisel = jQuery(this).parent();
			if(!thisel.hasClass("active")){
				thisel.siblings(".accordion-tab.active").children(".accordion-block").animate({
					opacity: 'toggle',
					padding: 'toggle',
					height: 'toggle'
				}, 200, function () {
					jQuery(this).parent().removeClass("active");
				});
			}
			thisel.children(".accordion-block").animate({
				opacity: 'toggle',
				padding: 'toggle',
				height: 'toggle'
			}, 200, function () {
				jQuery(this).parent().toggleClass("active");
			});
			return false;
		});

		jQuery(".info-message .close-info").click(function() {
			jQuery(this).parent().fadeOut();
			return false;
		});

		jQuery("img.setborder").each(function (){
			jQuery(this).wrap('<span class="wrapimg" style="display:inline-block;position:relative;border-radius:inherit;-moz-border-radius:inherit;overflow:hidden;"></span>');
		});

		jQuery("body").append("<div id='_strike-tooltip'></div>");
		jQuery("body").append("<div class='likes-tooltip'></div>");
		jQuery("body").append("<div id='_strike-user'></div>");

		jQuery(".strike-tooltip").mouseenter(function(){
			if(jQuery(this).attr("title")){
				var offset = jQuery(this).offset();
				jQuery("#_strike-tooltip").html(jQuery(this).attr("title"));
				jQuery(this).attr("title", "");
				jQuery("#_strike-tooltip").addClass("active");
				jQuery("#_strike-tooltip").css("left", offset.left+"px").css("top", offset.top+"px");
				var wii = (parseInt(jQuery(this).css("width"))/2);
				var wiiii = ((parseInt(jQuery("#_strike-tooltip").css("width"))+parseInt(jQuery("#_strike-tooltip").css("padding-right"))+parseInt(jQuery("#_strike-tooltip").css("padding-left")))/2);
				jQuery("#_strike-tooltip").css("margin-left", ((wiiii-wii)*(-1))+"px");
			}
		}).mouseleave(function(){
			jQuery("#_strike-tooltip").removeClass("active");
			jQuery(this).attr("title", jQuery("#_strike-tooltip").html());
		});

		// Js like tooltip

		jQuery('.likes-tooltip').hover(function() {
			isinsitelikes = true;
		},function() {
			if(timer) {
				clearTimeout(timer);
				timer = null;
			}
			isinsitelikes = false;
			timer = setTimeout(function() {
				if(isinsitelikes == true)return false;
				jQuery(".likes-tooltip").removeClass("active");
				jQuery(".likes-tooltip").html("");
			}, 500);
	    });

		jQuery('.show-likes').hover(function() {
			if(timer) {
				clearTimeout(timer);
				timer = null;
			}
			var offset = jQuery(this).offset();
			jQuery(".likes-tooltip").html('<div class="like-button"><a href="#">4 people like this</a></div><a href="#" class="avatar online strike-tooltip" title="John Doe"><img src="images/photos/avatar-1.jpg" alt="" title="" /></a><a href="#" class="avatar online" title="minkka."><img src="images/photos/avatar-2.jpg" alt="" title="" /></a><a href="#" class="avatar offline" title="Alfred"><img src="images/photos/avatar-3.jpg" alt="" title="" /></a><a href="#" class="avatar away" title="Orangutan"><img src="images/photos/avatar-4.jpg" alt="" title="" /></a>');
			jQuery(".likes-tooltip").css("left", offset.left+"px").css("top", offset.top+"px");
			var wii = (parseInt(jQuery(this).css("width"))/2);
			var wiiii = ((parseInt(jQuery(".likes-tooltip").css("width"))+parseInt(jQuery(".likes-tooltip").css("padding-right"))+parseInt(jQuery(".likes-tooltip").css("padding-left")))/2);
			timer = setTimeout(function() {
				jQuery(".likes-tooltip").css("margin-left", ((wiiii-wii)*(-1))+"px");
				jQuery(".likes-tooltip").addClass("active");
			}, 500);
	    },function() {
			if(timer) {
				clearTimeout(timer);
				timer = null;
			}
			timer = setTimeout(function() {
				if(isinsitelikes == true)return false;
				jQuery(".likes-tooltip").removeClass("active");
				jQuery(".likes-tooltip").html("");
			}, 500);
	    });

		// content tooltip

		jQuery('#_strike-user').hover(function() {
			isinsitememb = true;
		},function() {
			if(timerb) {
				clearTimeout(timerb);
				timerb = null;
			}
			isinsitememb = false;
			timerb = setTimeout(function() {
				if(isinsitememb == true)return false;
				jQuery("#_strike-user").removeClass("active");
				jQuery("#_strike-user").html("");
			}, 500);
	    });

		jQuery('.user-tooltip').hover(function() {
			if(timerb) {
				clearTimeout(timerb);
				timerb = null;
			}
			var offset = jQuery(this).offset();
			var position = jQuery(window).scrollTop();
			var karsejmeitene = offset.top-position;
			if(karsejmeitene <= 200){
				jQuery("#_strike-user").addClass("upsidedown");
			}else{
				jQuery("#_strike-user").removeClass("upsidedown");
			}
			jQuery("#_strike-user").html('<a href="/about/" class="username" style="background:#232323;color:#fff;">Frank Lin (林宏)</a><a href="#" class="avatar online"><span class="wrapimg" style="display:inline-block;position:relative;border-radius:inherit;-moz-border-radius:inherit;overflow:hidden;"><img src="/assets/images/avatar.jpg" alt="Avatar" height="90" width="90"/></span></a><div class="info"><div>"Another lovely person on the planet..."</div><div><font>Location:</font>Hong Kong, China</div><div><font>Now:</font>Ph.D. student at HKU</div><div><font>Marital status:</font>Single</div></div><div class="clear-float"></div><div class="bottom"><a href="/contact/" class="com-control"><i class="fa fa-envelope"></i>Drop Message</a><a href="/about/" class="com-control"><i class="fa fa-file-text-o"></i>View profile</a></div>');
			jQuery("#_strike-user").css("left", offset.left+"px").css("top", offset.top+"px");
			var wii = (parseInt(jQuery(this).css("width"))/2);
			var wiiii = ((parseInt(jQuery("#_strike-user").css("width"))+parseInt(jQuery("#_strike-user").css("padding-right"))+parseInt(jQuery("#_strike-user").css("padding-left")))/2);
			timerb = setTimeout(function() {
				jQuery("#_strike-user").css("margin-left", ((wiiii-wii)*(-1))+"px");
				jQuery("#_strike-user").addClass("active");
			}, 500);
	    },function() {
			if(timerb) {
				clearTimeout(timerb);
				timerb = null;
			}
			timerb = setTimeout(function() {
				if(isinsitememb == true)return false;
				jQuery("#_strike-user").removeClass("active");
				jQuery("#_strike-user").html("");
			}, 500);
	    });

		// toggle comments

		jQuery("a[href='#show-responses']").click(function (){
			jQuery(".drop.active").children().find("li.new").each(function () {
				jQuery(this).removeClass("new");
			});
			jQuery(this).parent().parent().find(".comment-responses").toggleClass("active");
			return false;
		});

		jQuery("a[href='#drop-the-bass']").click(function (){
			jQuery(".drop.active").children().find("li.new").each(function () {
				jQuery(this).removeClass("new");
			});
			jQuery("a[href='#drop-the-bass']").not(this).parent().find(".drop").removeClass("active");
			jQuery(this).parent().find(".drop").toggleClass("active");
			jQuery("html, body").animate({ scrollTop: 0 }, "fast");
			jQuery(this).find("span.fadeout").fadeOut("fast");
			return false;
		});

		jQuery("body").click(function(){
			jQuery(".drop.active").children().find("li.new").each(function () {
				jQuery(this).removeClass("new");
			});
			jQuery(".drop.active").removeClass("active");
		});

		jQuery("a[href='#top']").click(function () {
			jQuery("html, body").animate({ scrollTop: 0 }, "fast");
			return false;
		});

		startTimer();

		jQuery(".respond-textarea > textarea").keyup(function() {
			var theh = parseInt(this.scrollHeight);
			jQuery(this).css("height", (theh+2)+"px");
		});

		jQuery("textarea.auto-height").keyup(function() {
			var theh = parseInt(this.scrollHeight);
			jQuery(this).css("height", (theh)+"px");
		});

		jQuery("a[href='#quick-reply']").click(function () {
			jQuery(".quick-reply .forum-description").hide();
			jQuery(".quick-reply .reply-box").fadeIn("fast");
			jQuery(".reply-box .reply-textarea textarea").focus();
		});

		jQuery(".scroll").click(function(event){
			event.preventDefault();
			//calculate destination place
			var dest=0;
			if(jQuery(this.hash).offset().top > jQuery(document).height()-jQuery(window).height()){
				dest=jQuery(document).height()-jQuery(window).height();
			}else{
				dest=jQuery(this.hash).offset().top;
			}
			//go to destination
			jQuery('html,body').animate({scrollTop:dest}, 1000,'swing');
		});

		jQuery(".post-meta-block a[href='#quick-reply']").click(function () {
			var backup = jQuery(".reply-box .reply-textarea textarea").val();
			jQuery(".reply-box .reply-textarea textarea").val(backup+"@"+jQuery(this).parent().parent().siblings(".user-block").find(".forum-user b").html()+" ");
		});


		jQuery(".strike-wysiwyg-enable").each(function () {
			jQuery(this).append("<div class='strike-wysiwyg' contenteditable='true' id='strike-editor'></div>");
		});

		jQuery("#strike-editor").focus(function () {
			jQuery(".strike-wysiwyg-enable").attr("rel", "wys-current");
			return false;
		});

		jQuery(".strike-wysiwyg-enable textarea").focus(function () {
			jQuery(".strike-wysiwyg-enable").attr("rel", "bb-current");
			return false;
		});

		jQuery(".conversation-single").click(function () {
			var thisel = jQuery(this);
			if(!thisel.hasClass("selected")){ letscountconv++; }else{ letscountconv--; }
			thisel.toggleClass("selected");

			if(letscountconv > 0){
				jQuery(".conversation-container").addClass("is-selected");
			}else{
				jQuery(".conversation-container").removeClass("is-selected");
			}
		});

		jQuery(".conv-smiley-block").click(function () {
			jQuery(".smiley-tooltip").toggle();
			return false;
		});

		jQuery(".conv-bottom .conv-bb-link, .smiley-tooltip .conv-bb-link").click(function () {
			var thisel = jQuery(this);
			var bbtext = thisel.parent().siblings("textarea");
			var bbcontent = thisel.attr("rel");

			bbtext.replaceSelectedText(bbcontent);
			if(thisel.parent().hasClass("smiley-tooltip")){ thisel.parent().hide(); }
			return false;
		});

		jQuery("a[href='#strike-bb']").click(function () {
			var thisel = jQuery(this);
			var bbtext = thisel.parent().siblings("textarea");
			var wystext = thisel.parent().siblings(".strike-wysiwyg");
			currenteditor = thisel.parent().parent().attr("rel");

			if(currenteditor == "wys-current"){
				wystext.focus();
				var sel = rangy.getSelection();
			}

			switch(thisel.attr("class")){
				case "strike-bold":
					if(currenteditor == "wys-current"){
						var el = document.createElement("b");
						surroundSelection(sel, el);
						wystext.focus();
					}else{
						bbtext.surroundSelectedText("<b>","</b>");
					}
					break;

				case "strike-italic":
					if(currenteditor == "wys-current"){
						var el = document.createElement("i");
						surroundSelection(sel, el);
						wystext.focus();
					}else{
						bbtext.surroundSelectedText("<i>","</i>");
					}
					break;

				case "strike-strike":
					if(currenteditor == "wys-current"){
						var el = document.createElement("strike");
						surroundSelection(sel, el);
						wystext.focus();
					}else{
						bbtext.surroundSelectedText("<strike>","</strike>");
					}
					break;

				case "strike-underline":
					if(currenteditor == "wys-current"){
						var el = document.createElement("u");
						surroundSelection(sel, el);
						wystext.focus();
					}else{
						bbtext.surroundSelectedText("<u>","</u>");
					}
					break;

				case "strike-link":
					var weburl = prompt("Ievadiet hipersaites adresi","http://");
					if(weburl == null){
						break;
						return false;
					}
					if(currenteditor == "wys-current"){
						var el = document.createElement("a");
						el.href = weburl;
						el.target = "_blank";
						surroundSelection(sel, el);
						wystext.focus();
					}else{
						bbtext.surroundSelectedText("<a href='"+weburl+"' target='_blank'>","</a>");
					}
					break;

				case "strike-color":
					if(currenteditor == "wys-current"){
						var el = document.createElement("span");
						el.style.color = "purple";
						surroundSelection(sel, el);
						wystext.focus();
					}else{
						bbtext.surroundSelectedText("<span style='color: purple>","</span>");
					}
					break;

				case "strike-photo":
					if(currenteditor == "wys-current"){
						var weburl = prompt("Ievadiet bildes adresi","http://");
						if(weburl == null){
							break;
							return false;
						}
						var el = document.createElement("img");
						el.src = weburl;
						surroundSelection(sel, el);
						wystext.focus();
					}else{
						var extracted = bbtext.extractSelectedText();
						extracted = (extracted == "") ? "http://" : extracted;
						var weburl = prompt("Ievadiet bildes adresi",extracted);
						if(weburl == null){
							extracted = (extracted == "http://") ? "" : extracted;
							bbtext.replaceSelectedText(extracted);
							break;
							return false;
						}
						bbtext.replaceSelectedText("<img src='"+weburl+"'>");
					}
					break;

				case "strike-quote":
					if(currenteditor == "wys-current"){
						var el = document.createElement("blockquote");
						surroundSelection(sel, el);
						wystext.focus();
					}else{
						bbtext.surroundSelectedText("<blockquote>","</blockquote>");
					}
					break;

				case "strike-code":
					if(currenteditor == "wys-current"){
						var el = document.createElement("pre");
						surroundSelection(sel, el);
						wystext.focus();
					}else{
						bbtext.surroundSelectedText("<pre>","</pre>");
					}
					break;

				case "strike-yt":
					if(currenteditor == "wys-current"){
						break;
						return false;
					}else{
						var extracted = bbtext.extractSelectedText();
						extracted = (extracted == "") ? "http://" : extracted;
						var weburl = prompt("Ievadiet youtube linku",extracted);
						if(weburl == null){
							extracted = (extracted == "http://") ? "" : extracted;
							bbtext.replaceSelectedText(extracted);
							break;
							return false;
						}
						bbtext.replaceSelectedText("[yt]"+weburl+"[/yt]");
					}
					break;

				default : break;
			}

			return false;
		});

		jQuery(".strike-wysiwyg").each(function () {
			var thisel = jQuery(this);
			var bbcodes = thisel.siblings("textarea").val();

			// thisel.contents().find('head').append('<link rel="stylesheet" href="css/strike-wysiwyg.css" type="text/css" />');
			// thisel.contents().find("body").attr("contenteditable", "true").attr("id", "strike-editor");

			run_strike_bb(bbcodes, thisel);
		});

		jQuery(".strike-wysiwyg-enable textarea").bind("input propertychange focus blur", function () {
			var thisel = jQuery(this);
			var bbcodes = thisel.val();
			var field = thisel.siblings("#strike-editor");
			run_strike_bb(bbcodes, field);
		});

		jQuery(".strike-wysiwyg-enable #strike-editor").bind("input propertychange focus blur", function () {
			var thisel = jQuery(".strike-wysiwyg-enable .strike-wysiwyg");
			var htmlcode = jQuery(this).html();
			var field = thisel.siblings("textarea");
			run_strike_bb(htmlcode, field);
		});

		jQuery("a[href='#strike-bb-switch']").click(function () {
			jQuery(".strike-wysiwyg-enable").find("textarea").toggle().siblings(".strike-wysiwyg").toggle();
			return false;
		});

		jQuery("#strike-editor").parent().parent().parent().prepend('<textarea class="temp-paste-text"></textarea>');
		jQuery('#strike-editor').on('paste', function () {
			var element = jQuery(this);
			var savedSel = rangy.saveSelection();
			// alert("asd");
			var temp = jQuery(".temp-paste-text");
			temp.focus();
			// alert("asd");
			setTimeout(function () {
				var text = temp.val();
				rangy.restoreSelection(savedSel);
				rangy.removeMarkers(savedSel);
				document.execCommand('insertHTML', false, text);
				temp.val('');
			}, 100);
		});

		jQuery(".select-replace .select-arrow").on("click", function () {
			jQuery(this).parent().toggleClass("active-drop");
			return false;
		});

		jQuery(".select-replace .select-options > a").on("click", function () {
			var thisel = jQuery(this);
			thisel.parent().parent().removeClass("active-drop");
			thisel.parent().siblings(".select-main-input").val(thisel.attr("alt"));
			return false;
		});

	});


	function run_strike_bb(input, output){
		currenteditor = jQuery(".strike-wysiwyg-enable").attr("rel");

		if(currenteditor == "wys-current"){
			input = input.replace(/<br \/>/mg,"<br>");
			input = input.replace(/<br\/>/mg,"<br>");
			input = input.replace(/<br>/mg,"<br>");
			output.html(input);
		}else{
			output.html(input);
		}
		return true;
	}


	jQuery(document).scroll(function() {
		var position = jQuery(window).scrollTop();
		if(position <= 180) {
			jQuery("#header-top ul li a span").removeClass('gotop');
		}else{
			jQuery("#header-top ul li a span").addClass('gotop');
		}

		if(position >= 600) {
			if(strike_autostart){
				freezeAnim();
			}
		}

		if(jQuery(".the-profile-top").length > 0){
			var thetop = jQuery(".the-profile-top").offset();
			var naviheight = parseInt(jQuery(".the-profile-navi").css("height"))+parseInt(position);
			var leeet = parseInt(jQuery(document).height())-(naviheight);

			if(jQuery(".footer").height()+50 >= leeet){
				var fixedstyle = (jQuery(document).height()-((parseInt(jQuery(".footer").height())+50)+parseInt(jQuery(".the-profile-navi").height())))-parseInt(thetop.top);
				jQuery(".the-profile-navi").addClass("bottom");
				jQuery(".the-profile-navi").css("top", fixedstyle+"px");
				return false;
			}else{
				jQuery(".the-profile-navi").removeClass("bottom");
				jQuery(".the-profile-navi").css("top", "0px");
			}

			var theheight = parseInt(jQuery(".the-profile-top").css("height"))+parseInt(jQuery(".the-profile-top").css("padding-top"))+parseInt(jQuery(".the-profile-top").css("padding-bottom"));
			if(position >= thetop.top+theheight){
				jQuery(".the-profile-navi").addClass("floating");
			}else{
				jQuery(".the-profile-navi").removeClass("floating");
			}
		}
	});


	// Strike audio html5 player
	jQuery(document).ready(function() {

		jQuery("#strikeplayer").each(function(){

			var element = jQuery(this),
				_strikeaudio = element[0];

			_strikeaudio.addEventListener('timeupdate', function () {
				var element = jQuery(this);

				var currentSeconds = (Math.floor(_strikeaudio.currentTime % 60) < 10 ? '0' : '') + Math.floor(_strikeaudio.currentTime % 60);
				var currentMinutes = Math.floor(_strikeaudio.currentTime / 60);
				var currentHours = Math.floor(_strikeaudio.currentTime / 60 / 60);

				if(_strikeaudio.duration == "Infinity"){
					element.siblings(".strike-player").addClass("player-live");
					element.siblings(".strike-player").find('#songTime').html(currentHours + ":" + currentMinutes + ":" + currentSeconds);
				}else{
					element.siblings(".strike-player").find('#songTime').html(currentHours + ":" + currentMinutes + ":" + currentSeconds + ' / ' + Math.floor(_strikeaudio.duration / 60 / 60) + ":" + Math.floor(_strikeaudio.duration / 60) + ":" + (Math.floor(_strikeaudio.duration % 60) < 10 ? '0' : '') + Math.floor(_strikeaudio.duration % 60));
				}

				var percentageOfSong = (element[0].currentTime/element[0].duration);
				var percentageOfSlider = element.siblings(".strike-player").find('#songSlider')[0].offsetWidth * percentageOfSong;

				element.siblings(".strike-player").find('#songSlider > div').css("width", Math.round(percentageOfSlider) + "px");

			}, false);

			_strikeaudio.addEventListener('volumechange', function () {
				var element = jQuery(this);
				var percentageOfSong = (element[0].volume);
				var percentageOfSlider = element.siblings(".strike-player").find('#volumeMeter')[0].offsetWidth * percentageOfSong;

				element.siblings(".strike-player").find('#volumeMeter > div').css("width", Math.round(percentageOfSlider) + "px");
			}, false);

			_strikeaudio.addEventListener('ended', function () {
				element.siblings(".strike-player").removeClass("playing");
			}, false);

			_strikeaudio.addEventListener('pause', function () {
				element.siblings(".strike-player").removeClass("playing");
			}, false);

			_strikeaudio.addEventListener('play', function () {
				element.siblings(".strike-player").addClass("playing");
			}, false);

		});

		jQuery(".strike-player #songPlayPause").click(function(){
			var element = jQuery(this),
				_strikeaudio = element.parent().siblings("#strikeplayer")[0];
			if(_strikeaudio.paused){
				_strikeaudio.play();
			}else{
				_strikeaudio.pause();
			}
		});

		jQuery('#songSlider').bind('mousedown', function(e){
			jQuery(this).bind('mousemove click', function(e){
				var element = jQuery(this),
					x = e.pageX - element.offset().left,
					songSliderWidth = element.width(),
					percentage = (x/songSliderWidth);

				element.parent().siblings("#strikeplayer")[0].currentTime = element.parent().siblings("#strikeplayer")[0].duration * percentage;
			});

			jQuery(this).bind('mouseup mouseleave',function(){
				jQuery(this).unbind('mousemove');
			});
		});

		jQuery('#volumeMeter').bind('mousedown', function(e){
			jQuery(this).bind('mousemove click', function(e){
				var element = jQuery(this),
					x = e.pageX - element.offset().left,
					songSliderWidth = element.width(),
					percentage = (x/songSliderWidth);

				element.parent().siblings("#strikeplayer")[0].volume = percentage;
			});

			jQuery(this).bind('mouseup mouseleave',function(){
				jQuery(this).unbind('mousemove');
			});
		});

		jQuery('.photo-gallery-single a.photo-fullscreen-button').bind('click', function(e){
			var _otVideo = jQuery(this).parent().parent()[0];
			if (_otVideo.requestFullscreen) {
				_otVideo.requestFullscreen();
			} else if (_otVideo.msRequestFullscreen) {
				_otVideo.msRequestFullscreen();
			} else if (_otVideo.mozRequestFullScreen) {
				_otVideo.mozRequestFullScreen();
			} else if (_otVideo.webkitRequestFullscreen) {
				_otVideo.webkitRequestFullscreen();
			} else {
				alert("Atvaino, bet Tavs pārlūks neatbalsta šo iespēju!");
			}
			return false;
		});

		jQuery('.photo-gallery-single a.cancel-fullscreen-button').bind('click', function(e){
			var _otVideo = jQuery(this).parent().parent()[0];
			if (document.exitFullscreen) {
				document.exitFullscreen();
			} else if (document.msExitFullscreen) {
				document.msExitFullscreen();
			} else if (document.mozCancelFullScreen) {
				document.mozCancelFullScreen();
			} else if (document.webkitExitFullscreen) {
				document.webkitExitFullscreen();
			}
			return false;
		});

		function dumpFullscreen() {
			if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement ) {
				jQuery(".photo-gallery-single").removeClass("isonfullscreen");
			}else{
				jQuery(".photo-gallery-single").addClass("isonfullscreen");
			}
		}

		document.addEventListener("fullscreenchange", function(e) {
			dumpFullscreen();
		});
		document.addEventListener("mozfullscreenchange", function(e) {
			dumpFullscreen();
		});
		document.addEventListener("webkitfullscreenchange", function(e) {
			dumpFullscreen();
		});
		document.addEventListener("msfullscreenchange", function(e) {
			dumpFullscreen();
		});


		jQuery("#menu-bottom").addClass("blurred");
		reloadMenuBlur(jQuery(".featured-img-box").css("background-image"));

	});

})(jQuery);

function reloadMenuBlur(blurel){
	if(jQuery("body").hasClass("no-slider")){
		var blurel = jQuery(".featured-img-box").css("background-image");
	}
	jQuery("#menu-bottom #menu").css("background-image", blurel);
}

function surroundSelection(sel, element) {
	if (window.getSelection) {
		if (sel.rangeCount) {
			var range = sel.getRangeAt(0).cloneRange();
			range.surroundContents(element);
			sel.removeAllRanges();
			sel.addRange(range);
		}
	}
}

var letscountconv = 0;


function freezeAnim() {
	if(dofreeze){
		featSelect(featLast);
	}
	dofreeze = false;
}

function starFnc(){
	reloadMenuBlur(jQuery(".featured-img-box .featured-img:not(.invisible)").css("background-image"));
	if(!strike_autostart)return;
	isAnim = true;
	setTimeout("doFadeAuto()", strike_autoTime);
	var doNext = (featLast < strike_featCount)?(featLast+1):1;
	autoTimers(doNext, (strike_autoTime/1000));
	autoTimersBar(doNext, (strike_autoTime/1000));
	document.getElementById("featSelect-"+doNext).className = "featured-select this-is-next";
}

function featNext(){
	var doNext = (featLast < strike_featCount)?(featLast+1):1;
	doFade(doNext, featLast, false);
}

function featPrev(){
	var doNext = (featLast > 1)?(featLast-1):strike_featCount;
	doFade(doNext, featLast, false);
}

function featSelect(varin){
	doFade(varin, featLast, false);
}

function doFadeAuto(checker){
	if(!isAnim && !checker)return;
	var doNext = (featLast < strike_featCount)?(featLast+1):1;
	doFade(doNext, featLast, true);

	var doFuture = (doNext < strike_featCount)?(doNext+1):1;
	autoTimers(doFuture, (strike_autoTime/1000));
	autoTimersBar(doFuture, (strike_autoTime/1000));
	document.getElementById("featSelect-"+doFuture).className = "featured-select this-is-next";

	setTimeout("doFadeAuto()", strike_autoTime);
	reloadMenuBlur(jQuery(".featured-img-box .featured-img:not(.invisible)").css("background-image"));
}

function autoTimers(current, thetime){
	if(!isAnim)return;
	document.getElementById("feat-countdown-"+current).innerHTML = thetime;
	if(thetime <= 0)return;
	setTimeout("autoTimers('"+current+"', '"+(thetime-1)+"')", 1000);
}

function autoTimersBar(current, thetime){
	if(!isAnim)return;
	document.getElementById("feat-countdown-bar-"+current).style.width = (100/(strike_autoTime/1000)*((strike_autoTime/1000)-thetime))+"%";
	if(thetime <= 0)return;
	setTimeout("autoTimersBar('"+current+"', '"+(thetime-0.1)+"')", 100);
}

function doFade(varin, varout, autoplay){
	isAnim = autoplay;
	if(!isAnim){
		for(var n=1;n<=strike_featCount;n++){
			document.getElementById("featSelect-"+n).className = "featured-select";
		}
	}
	jQuery("#slider-info .padding-box ul li").eq((varout-1)).fadeOut("fast", function (data){
		jQuery("#slider-info .padding-box ul li").eq((varin-1)).fadeIn("fast");
	});
	document.getElementById("featured-img-"+varout).className = "featured-img invisible";
	document.getElementById("featSelect-"+varout).className = "featured-select";
	document.getElementById("featured-img-"+varin).className = "featured-img";
	document.getElementById("featSelect-"+varin).className = "featured-select this-active";
	if(varin == varout)return;
	featLast = varin;

	reloadMenuBlur(jQuery(".featured-img-box .featured-img:not(.invisible)").css("background-image"));
}

function startTimer(){
	setInterval(function(){
	jQuery(".countdown-text").each(function (){
		var currentTime = jQuery(this).attr("rel");
		var seconds = new Date().getTime() / 1000;
		seconds = Math.floor(seconds);
		if(currentTime > seconds){
			jQuery(this).html(secondsToHms(currentTime-seconds));
		}else{
			jQuery(this).css("color", "#e62d24");
			jQuery(this).html("00:00:00:00");
		}
	})}, 1000);
}

function addZero(number){
	if(number.toString().length == 1){
		return "0"+number;
	}else{
		return number;
	}
}

function secondsToHms(d) {
	d = Number(d);
	var h = Math.floor(d / 3600);
	var days = addZero(Math.floor(h / (24)));
	h = addZero(Math.floor((d / 3600)-(days*24)));
	var m = addZero(Math.floor(d % 3600 / 60));
	var s = addZero(Math.floor(d % 3600 % 60));
	return days+":"+h+":"+m+":"+s;
}


function setSongPosition() {
	return true;
}

function setNewVolume() {
	return true;
}

$(window).scroll(function(){
    if ($(this).scrollTop() >= 100) {
        $('.back-to-top').css({'display':'block'}, 100);
    } else {
        $('.back-to-top').fadeOut("100");
    }
});
$('.back-to-top').click(function(){
    $("html, body").animate({ scrollTop: 0 }, 600);
    return false;
});


// Disqus comments
$(document).ready(function() {
    $commentDiv = $("#recent-comments");
    $.get("https://disqus.com/api/3.0/forums/listPosts.json?forum=flinhong&limit=5&related=thread&api_key=AG6wxZBFUA8qIso826fmtIrarSr0xUMjOBhMx2xdcWNLeFKbvwBhUwiMzVcFpJ9I", function(res, code) {
        if(res.code === 0) {
            var result = "";
            for(var i=0, len=res.response.length; i<len; i++) {
                var post = res.response[i];
                console.dir(post);
                var timeago = moment.utc(post.createdAt).startOf('minute').fromNow();
                var html = "<div class='new-forum-line'>";
								html += "<a href='" + post.author.profileUrl + "' class='avatar'>";
                html += "<img src='" + post.author.avatar.permalink + "' class='setborder' />";
								html += "</a>";
                html += "<a href='" + post.thread.link + "' class='f_content'>";
								html += "<strong>" + post.thread.title + "</strong>";
								html += "<span><b>" + post.author.name + "</b>" + " · " + timeago + "</span>";
                html += "</a>";
                html += "<p>" + post.raw_message + "</p>";
                html += "</div>";
                result+=html;
            }
            $commentDiv.html(result);
        }
    });
});

// Video Fits
$(document).ready(function(){
// Target your .container, .wrapper, .post, etc.
$("#content").fitVids();
});

var clickcount = 0;
$('#click-button').click(function() {
	if (clickcount == 0) {
		$('#qrcode').css({
		'display': 'inline'
		});
		clickcount = clickcount + 1;
	} else {
		$('#qrcode').css({
		'display': 'none'
		});
		clickcount = 0;
	}
});

$('#qrcode').click(function() {
	$('#qrcode').css({
		'display': 'none'
	});
	clickcount = 0;
});

// Sidebar Fix
var jWindow = $(window);
jWindow.scroll(function(){
  var scrollHeight = jWindow.scrollTop();
  var screenHeight = jWindow.height();
  var screenWidth = jWindow.width();
  var contentWidth = $('#main-box').width();
  var contentHeight = $('#main').height();
  var headerHeight = $('#header').height() + $('#header-top').height() + 600;
  var footerHeight = $('.footer').height();
  var tocWidth = $('#sidebar').width();
  var pxright = ( screenWidth - contentWidth ) / 2;
  var footerOffset = $('.footer').offset().top;
  if(scrollHeight > headerHeight && scrollHeight + screenHeight < footerOffset && screenWidth > 1000){
    $('.post-sidebar').css({
      'position':'fixed',
      'top':'0px',
      'right':pxright + 'px',
      'z-index': '0'
    });
    $('.moved').css({
      'display':'none'
    });
    $('.toc-fix').css({
      'position':'static',
	  'display':'inline'
    });      
  }

  else if(scrollHeight + screenHeight >= footerOffset && screenWidth > 1000){
    $('.toc-fix').css({
      'position':'fixed',
	  'display':'inline',
      'width':tocWidth + 'px',
      'top':'0px',
      'right':pxright + 'px',
      'z-index': '0'
    });
    $('.post-sidebar').css({
      'position':'static'
    }); 	
  }

  else{
    $('.post-sidebar').css({
      'position':'static'
    });
    $('.moved').css({
      'display':'inline'
    });
    $('.toc-fix').css({
      'display':'inline'
    }); 
  }
});

$('.hascaption').each(function() {
	$(this).replaceWith($('<div class="wp-caption hascaption">' + this.innerHTML + '</div>'));
});
$('.hascaption').children('img').each(function() {
	var caption;
	caption = $(this).attr('title');
	$(this).after('<p class="wp-caption-text">' + caption + '</p>');
});
