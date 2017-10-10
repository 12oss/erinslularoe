/*async breaks my smooth scroll to....*/
/*function f1 is defined around everything so that I can async all js and then run all this code after page loads in*/
function f1() {
	/*tool tip*/
	$("[data-toggle=tooltip]").tooltip();
	/*end tooltip*/
	/*tabs*/
	$('.nav-tabs a').click(function(e) {
		e.preventDefault()
		$(this).tab('show')
	})
	/*end tabs*/
	/*DYNAMICALLY load youtube videos*/
	/*Find all the YouTube video embedded on a page*/
	var videos = document.getElementsByClassName("youtube");
	for (var i = 0; i < videos.length; i++) {
		var youtube = videos[i];
		/*Based on the YouTube ID, we can easily find the thumbnail image*/
		var img = document.createElement("img");
		/*img.setAttribute("src", "http://i.ytimg.com/vi/" + youtube.id + "/hqdefault.jpg");*/
		img.setAttribute("class", "thumb");
		img.setAttribute("width", "100%");
		/*Overlay the Play icon to make it look like a video player*/
		var circle = document.createElement("div");
		circle.setAttribute("class", "circle");
		youtube.appendChild(img);
		youtube.appendChild(circle);
		/*Attach an onclick event to the YouTube Thumbnail*/
		youtube.onclick = function() {
			/*Create an iFrame with autoplay set to true*/
			var iframe = document.createElement("iframe");
			iframe.setAttribute("src",
				"https://www.youtube.com/embed/" + this.id + "?autoplay=1&autohide=1&border=0&wmode=opaque&enablejsapi=1&rel=0");
			/*Replace the YouTube thumbnail with YouTube HTML5 Player*/
			this.parentNode.replaceChild(iframe, this);
		};
	}
	/*fancybox*/
	$(document).ready(function() {
		$(".fancybox").fancybox({
			/*Use Alt atribute*/
			beforeShow: function() {
				var alt = this.element.find('img').attr('alt');
				this.inner.find('img').attr('alt', alt);
				this.title = alt;
				/* Disable right click */
				$.fancybox.wrap.bind("contextmenu", function(e) {
					return false;
				});
			},
			/*For all options go to http://fancyapps.com/fancybox/*/
			padding: 4,
			fitToView: true,
			autoSize: true,
			closeClick: true,
			openEffect: 'fade',
			closeEffect: 'fade',
			helpers: {
				title: {
					type: 'outside'
				},
				overlay: {
					css: {
						'background': 'rgba(0, 0, 0, 0.9)'
					},
					locked: false
				}
			},
			mouseWheel: false,
			nextEffect: 'fade',
			prevEffect: 'fade'
		});
	});
	/*end fancybox*/
	/*HASH*/
	jQuery(function() {
		jQuery('a[href*=#]:not([href=#])').click(function() {
			if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
				var target = jQuery(this.hash);
				target = target.length ? target : jQuery('[name=' + this.hash.slice(1) + ']');
				if (target.length) {
					jQuery('html,body').animate({
						scrollTop: target.offset().top - 58
					}, 1000);
					return false;
				}
			}
		});
	});
	/*end hash*/
	/*BACK TO TOP*/
	function checkOffset() {
		if ($('#back-to-top').offset().top + $('#back-to-top').height() >= $('.footer').offset().top - 10)
			$('#back-to-top').css('position', 'absolute');
		if ($(document).scrollTop() + window.innerHeight < $('.footer').offset().top)
			$('#back-to-top').css('position', 'fixed'); /*restore when you scroll up*/
	}
	$(document).scroll(function() {
		checkOffset();
	});
	$('#back-to-top').click(function() {
		$('html, body').animate({
			scrollTop: 0
		}, 800);
		return false;
	});
	$(window).scroll(function() {
		if ($(this).scrollTop() > 150) {
			$('#back-to-top').stop().fadeIn(250);
		} else {
			$('#back-to-top').stop().fadeOut(250);
		}
	});
	/*end BACK TO TOP*/
	/*TYPE KIT*/
	(function(d) {
		var config = {
				kitId: 'jbo1mnv',
				scriptTimeout: 3000,
				async: true
			},
			h = d.documentElement,
			t = setTimeout(function() {
				h.className = h.className.replace(/\bwf-loading\b/g, "") + " wf-inactive";
			}, config.scriptTimeout),
			tk = d.createElement("script"),
			f = false,
			s = d.getElementsByTagName("script")[0],
			a;
		h.className += " wf-loading";
		tk.src = 'https://use.typekit.net/' + config.kitId + '.js';
		tk.async = true;
		tk.onload = tk.onreadystatechange = function() {
			a = this.readyState;
			if (f || a && a != "complete" && a != "loaded") return;
			f = true;
			clearTimeout(t);
			try {
				Typekit.load(config)
			} catch (e) {}
		};
		s.parentNode.insertBefore(tk, s)
	})(document);
	/*end TYPEKIT*/

	/* LAZYLOAD*/
	/**/
	$(function() {
		$("img.lazyload").show().lazyload({
			effect: "fadeIn",
			failure_limit: 20,
			threshold: 350
		});
	});
	/*end LAZY*/
	/*LOADCSS*/
	/*via: https://github.com/filamentgroup/loadCSS*/
	(function(w) {
		// rel=preload support test
		if (!w.loadCSS) {
			return;
		}
		var rp = loadCSS.relpreload = {};
		rp.support = function() {
			try {
				return w.document.createElement("link").relList.supports("preload");
			} catch (e) {
				return false;
			}
		};
		// loop preload links and fetch using loadCSS
		rp.poly = function() {
			var links = w.document.getElementsByTagName("link");
			for (var i = 0; i < links.length; i++) {
				var link = links[i];
				if (link.rel === "preload" && link.getAttribute("as") === "style") {
					w.loadCSS(link.href, link, link.getAttribute("media"));
					link.rel = null;
				}
			}
		};
		// if link[rel=preload] is not supported, we must fetch the CSS manually using loadCSS
		if (!rp.support()) {
			rp.poly();
			var run = w.setInterval(rp.poly, 300);
			if (w.addEventListener) {
				w.addEventListener("load", function() {
					rp.poly();
					w.clearInterval(run);
				});
			}
			if (w.attachEvent) {
				w.attachEvent("onload", function() {
					w.clearInterval(run);
				});
			}
		}
	}(this));
	/*end LOADCSS*/
}
/*runs everything after page loads*/
window.onload = f1;