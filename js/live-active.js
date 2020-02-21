/**
 * live-active.js
 */

$(document).ready(function(e){
	// naviMenu();
	// windowResize();
	
	$(".zijie_list .index_list_img").hover(function(){
		var vh=$(this).find(".v_img").height();
		var vw=$(this).find(".v_img").width();
		$(this).find(".onhover").css({"height":vh-9,"width":vw-9}).show();	
	},function(){
		$(this).find(".onhover").hide();
	});
	
	//$('.hot_news_content').Scroll({line:1,speed:1000,timer:6000,up:"btn2",down:"btn1"});

	setInterval(function(){doscroll()}, 6000);
	
});

function IsPC() {
	var userAgentInfo = navigator.userAgent;
	var Agents = ["Android", "iPhone",
	"SymbianOS", "Windows Phone",
	"iPad", "iPod"];
	var flag = true;
	for (var v = 0; v < Agents.length; v++) {
	if (userAgentInfo.indexOf(Agents[v]) > 0) {
	flag = false;
	break;
	}
	}
	return flag;
}

function windowResize()
{
	setMenuWidth();
	banner_change();
}

function banner_change(){
	var screen_width = document.body.clientWidth;
	if (screen_width > 757){
		$(".banner_content").show();
		$(".banner_content_div,.banner_content_div_zj").each(function()
		{
			var big_banner = $(this).attr("big_banner");
			$(this).css("background-image", big_banner);
			$(this).removeClass("background_center");
		});
		$(".swiper_b").removeClass("swiper_b_hauto");
	}
	else {
		$(".banner_content").hide();
		$(".banner_content_div,.banner_content_div_zj").each(function()
		{
			var small_banner = $(this).attr("small_banner");
			$(this).css("background-image", small_banner);
			$(this).addClass("background_center");
		});
		$(".swiper_b").addClass("swiper_b_hauto");
	}
}

function showProductVideo(videourl)
{
	var screen_width = document.body.clientWidth;
	if (screen_width > 757){
		$(".product_banner_video").slideDown();
		if ($(".product_video_box").html() == '')
			$(".product_video_box").html(
					'<embed type="application/x-shockwave-flash" src="http://www.hytera.com/jsps/theme/default/image/mediaplayer.swf" width="717" height="397" style="undefined" id="single" name="single" quality="high" allowfullscreen="true" flashvars="width=717&amp;height=397&amp;autostart=true&amp;file=' + videourl + '&amp;repeat=false&amp;image=&amp;showdownload=false&amp;link=' + videourl + '&amp;showdigits=true&amp;shownavigation=true&amp;logo=">'
					);
	}
}

function closeProductVideo()
{
	$(".product_banner_video").slideUp();
	$(".product_video_box").html('');
}

function showAnliMoreContent()
{
	$(".news_content_anli_more_content").slideDown();
	$(".anli_more_content_btn").hide();
}

function weixin(){
	alert("请使用微信扫一扫功能，扫描右下角的微信二维码来关注我们");
}

function productShowMore1()
{
	$('.product_relative_p_more_container1').slideDown();
	$('.product_relative_p_more1').hide();
}
function productShowMore2()
{
	$('.product_relative_p_more_container2').slideDown();
	$('.product_relative_p_more2').hide();
}

function productShowMoreFea()
{
	$('.product_feature_content .pfc_unit_more_show').removeClass('pfc_unit_more_show');
	$('.product_relative_p_more_fea').hide();
}

function productShowMorePara()
{
	$('.product_para_content .pfc_unit_more_show').removeClass('pfc_unit_more_show');
	$('.product_relative_p_more_para').hide();
}

function loadRightCart(url)
{
	$(".cart_content").load(url,function(){refreshCheckboxImage();});
	selectRightNavItem(0,'购物车');
}

function selectRightNavItem(itemIndex, title)
{
	$(".rp_top_title").html(title);
	$(".right_panel_content").hide().eq(itemIndex).show();
	showRightPanel();
	$(".right_nav_item").eq(itemIndex+1).addClass("right_nav_item_select");
}

function showRightPanel()
{
	var width = document.body.clientWidth;
	$(".right_panel").show();
	if (width <= 423)
	{
		$(".right_panel_wrap").css("width", "100%");
		$(".right_panel").css("width", "100%");
	}
	else
	{
		$(".right_panel").animate({width:"421"}, 200,"linear");
	}
	$(".right_nav").animate({right:"422px"}, 200,"linear");
	$(".lxb-container").animate({right:"422px"}, 200,"linear");
	$(".lxb-hide-btn").hide();
	$(".right_nav_item").removeClass("right_nav_item_select");
}

function hideRightPanel()
{
	$(".right_panel_wrap").css("width", "auto");
	$(".right_panel").animate({width:"0px"}, 200,"linear", function (){$(".right_panel").hide();});
	$(".right_nav").animate({right:"0px"}, 200,"linear");
	$(".lxb-container").animate({right:"0px"}, 200,"linear");
	$(".lxb-hide-btn").hide();
	$(".right_nav_item").removeClass("right_nav_item_select");
}

var doscroll = function(){
    var $parent = $('.hot_news_content ul');
    var $first = $parent.find('li:first');
    var height = $first.height();
    $first.animate({
    	marginTop: -height + 'px'
        }, 500, function() {
        	$first.css('marginTop', 0).appendTo($parent);
    });    
};
