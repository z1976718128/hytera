$(function(){
	$(".yj_zdcp_list").hover(function(){
		$(this).addClass("bro").siblings().removeClass("bro");
		$(this).siblings("img").show()
	},function(){
		$(this).removeClass("bro");
		$(this).siblings("img").hide()
	})
	
})