$(document).ready(function () {

	var stuck = false;

	$(window).scroll(function (evt) {
		var scrollPosition = $(window).scrollTop();
		console.log(scrollPosition);
		if (!stuck && scrollPosition >= 88) {
			$("body").addClass("stick");
			$(window).scrollTop(1);
			stuck = true;
		}
		else if (stuck && scrollPosition === 0) {
			$("body").removeClass("stick");
			$(window).scrollTop(87);
			stuck = false;
		}

	});
});

//GA CODE
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-30555987-1']);
_gaq.push(['_trackPageview']);

(function() {
var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();