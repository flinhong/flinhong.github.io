
// Customizable variables

var _datMenuAnim = (typeof _datMenuAnim === "undefined") ? 400 :_datMenuAnim;			// Animation time of revieling and hiding menu (defaut = 400)
var _datMenuEffect = (typeof _datMenuEffect === "undefined") ? "effect-1" :_datMenuEffect;	// Animation effect [effect-1, effect-2, effect-3] (defaut = "effect-1")
var _datMenuSublist = (typeof _datMenuSublist === "undefined") ? true :_datMenuSublist;			// Submenu dropdown animation (defaut = true)
var _datMenuHeader = (typeof _datMenuHeader === "undefined") ? true :_datMenuHeader;			// If fixed header is showing (defaut = true)
var _datMenuHeaderTitle = (typeof _datMenuHeaderTitle === "undefined") ? '<a href="#"><img src="/assets/images/logo.png" style="background-color: #0589cd;" alt="" /></a>' :_datMenuHeaderTitle;		// Header Title
var _datMenuSearch = (typeof _datMenuSearch === "undefined") ? true :_datMenuSearch;			// If search is showing in header (defaut = true)

var _datMenuCustomS = (typeof _datMenuCustomS === "undefined") ? "fa-search" :_datMenuCustomS;			// Search icon in header (defaut = fa-search)
var _datMenuCustomM = (typeof _datMenuCustomM === "undefined") ? "fa-bars" :_datMenuCustomM;			// Menu icon in header (defaut = fa-bars)
var _datMenuRootURL = (typeof _datMenuRootURL === "undefined") ? "" :_datMenuRootURL;			// Root link for your website for search form (defaut = "")


// Do not touch these variables
var myScroll;

jQuery(document).ready(function() {

	var datlistclass = (_datMenuSublist)?" dat-submenu":"";

	// Enables fallback for older browsers
	if (!Modernizr.csstransforms3d) {
		jQuery("body").addClass("no-csstransforms3d");
	}

	// Sets up html for doing animations
	jQuery("body").addClass("has-dat-menu").wrapInner(function () {
		return '<div id="dat-menu" class="'+_datMenuEffect+'"><div class="dat-menu-container"><div class="dat-menu-wrapper"></div></div></div>';
	});

	jQuery("#dat-menu").append('<nav class="dat-menu-list'+datlistclass+'"><ul id="dat-menu-list-inner"></ul></nav>');
	if(_datMenuHeader){
		jQuery(".dat-menu-wrapper").addClass("dat-menu-padding");
		jQuery(".dat-menu-container").prepend('<div class="dat-menu-top-header">'+_datMenuHeaderTitle+'<form action="'+_datMenuRootURL+'"><input type="text" name="s" value="" /><input type="submit" value="" /></form></div>');
		if(_datMenuSearch){
			jQuery(".dat-menu-top-header").prepend('<a href="#" class="dat-menu-search"><i class="fa '+_datMenuCustomS+'"></i></a>');
		}
		jQuery(".dat-menu-top-header").prepend('<a href="#dat-menu" class="dat-menu-menu"><i class="fa '+_datMenuCustomM+'"></i></a>');
	}

	jQuery(".dat-menu-top-header input[type='text']").bind("blur", function () {
		jQuery(".dat-menu-top-header").css("position", "fixed").css("top", "0px");
	});

	jQuery(".dat-menu-top-header .dat-menu-search").bind("click", function () {
		jQuery('html,body').animate({
			scrollTop: 0
		});
		jQuery(".dat-menu-top-header").css("position", "absolute").css("top", "0px");
		jQuery(".dat-menu-top-header input[type='text']").focus();
		return false;
	});

	// Collects all menu lists and places them into ".dat-menu-list > ul"
	jQuery(".load-responsive").each(function() {
		var _this = jQuery(this);
		jQuery(".dat-menu-list > ul").append('<li class="dat-menu-header"><span>'+_this.attr('rel')+'</span></li>'+_this.html());
	});

	// Checks if menu has a submenu
	jQuery(".dat-menu-list.dat-submenu > ul > li ul").each(function () {
		var _this = jQuery(this).parent();
		_this.addClass("dat-has-sub");
	});

	// Copies body styles to ".dat-menu-container"
	// Adds event to hide menu when clicked on page
	var array = ['background','background-size','background-image', 'background-color', 'background-repeat', 'background-position'];
	jQuery.each( array , function(item, value) {
	    jQuery(".dat-menu-container").css(value, jQuery("body").css(value));
	});

	// Submenu links dropdown animation
	jQuery("#dat-menu-list-inner li > a").on("click tap", function () {
		var _this = jQuery(this).parent();
		if(_this.hasClass("dat-has-sub") == false){
			var thisel = _this.children("a");
			window.location = thisel.attr("href");
			return true;
		}else
		if(_this.hasClass("dat-sub-active")){
			var thisel = _this.children("a");
			window.location = thisel.attr("href");
			return true;
		}else{
			setTimeout(function () {
				_this.addClass("dat-sub-active");
			}, 100);
			_this.children("ul").children("li").css("display", "none").animate({height: "toggle"}, _datMenuAnim, function () {
				myScroll.refresh();
			});
			return false;
		}
		return false;
	});

	jQuery(".dat-menu-container").on("mousedown", function () {
		var _this = jQuery(this).parent();
		if(_this.hasClass("dat-menu-load")){
			var scrollpos = Math.abs(parseInt(jQuery('#dat-menu > .dat-menu-container > .dat-menu-wrapper').css("top")));
			_this.removeClass("dat-menu-animate");
			setTimeout(function () {
				_this.removeClass("dat-menu-load");
				_this.removeClass("dat-menu-setup");
				jQuery(document).scrollTop(scrollpos);
				jQuery("body").removeClass("datnomargin");
			}, _datMenuAnim+100);
			return false;
		}
		return true;
	});

	jQuery("#wpadminbar").appendTo("body");

	// Starts iScroll plugin for smooth menu scrolling
	myScroll = new IScroll('.dat-menu-list', {
		scrollbars: false,
		mouseWheel: true,
		interactiveScrollbars: false,
		shrinkScrollbars: 'scale',
		fadeScrollbars: false,
		tap: true
	});

	// Event on link #dat-menu, when pressed, reviels menu
	jQuery('a[href="#dat-menu"]').on( "click", function() {
		var scrollpos = jQuery(document).scrollTop(),
			_datMenuMain = jQuery("#dat-menu");
		_datMenuMain.find(".dat-menu-wrapper").css("top", "-"+parseInt(scrollpos)+"px");
		_datMenuMain.addClass("dat-menu-setup");
		_datMenuMain.toggleClass("dat-menu-load");
		setTimeout(function () {
			myScroll.refresh();
			_datMenuMain.toggleClass("dat-menu-animate");
		}, 10);
		jQuery("body").addClass("datnomargin");
		return false;
	});

});
