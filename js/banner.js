
function setBannerHeight(){
	var screen_width = window.screen.width;
	if(screen_width <= 768){
		$('.bannerQA').css({"height": $('.con-mobile').height()});
	}
}
$(window).ready(function(){
    setBannerHeight();
})
$(window).resize(function() {
    setBannerHeight();
});
