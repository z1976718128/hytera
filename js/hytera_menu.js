// JavaScript Document
var timeOut;
var $navTarget;
var $contentTarget;

naviMenu = function(){	
	var indexli;
	$('#menu .nav li[is="menuindex"]').hover(function(){
		indexli = $(this).index();
		var num = $('.menuline');
		if(indexli == 0){
			num.eq(0).addClass('menuline_hover');
		}if(indexli == 2){
			num.eq(0).addClass('menuline_hover');
			num.eq(1).addClass('menuline_hover');
		}else if(indexli == 4){
			num.eq(1).addClass('menuline_hover');
			num.eq(2).addClass('menuline_hover');
		}else if(indexli == 6){
			num.eq(2).addClass('menuline_hover');
			num.eq(3).addClass('menuline_hover');
		}else if(indexli == 8){
			num.eq(3).addClass('menuline_hover');
			num.eq(4).addClass('menuline_hover');
		}else if(indexli == 10){
			num.eq(4).addClass('menuline_hover');
			num.eq(5).addClass('menuline_hover');
		}else if(indexli == 12){
			num.eq(5).addClass('menuline_hover');
			num.eq(6).addClass('menuline_hover');
		}else if(indexli == 14){
			num.eq(6).addClass('menuline_hover');
		}
		$('.navclear').addClass('navclear_hover');
		
		$navTarget = $(this).find('a:eq(0)');
		$contentTarget = $(this).find('.menuitempanel');
		var verticalLineHeight = $(this).find('.menuitempanel').height();
		var PaddingTarget = parseInt($(this).find('div.clearfix').css("padding-bottom"))+parseInt($(this).find('div.menucontentdiv').css("padding-top"));
		if($(this).find('div.shadow_b_layout').css("display") == "none"){
			
			var verticalLineHeight = $(this).find('.menuitempanel').height()-PaddingTarget-7;

		}else if($(this).find('div.shadow_b_layout > div').height() == 1){
			
			var verticalLineHeight = $(this).find('.menuitempanel').height()-40;
			
		}else{
			
			var verticalLineHeight = $(this).find('.menuitempanel').height()-PaddingTarget-5
		}
		
		$(this).find('.verticalLine').each(function(){
			$verticalLineTarget = $(this);
			$verticalLineTarget.height(verticalLineHeight)
		})
		//alert($(this).find('.menucontentdiv').css("padding-top"));
		timeout = setTimeout(function(){
			$navTarget .addClass('hover');
			$contentTarget.slideDown(400);
		}, 100);
		//alert(contentWith);
		
				
	},function(){
		//alert("hidden")
		clearTimeout(timeout);
		$('#menu .nav li .menuitempanel').stop(true,true);
		$('.menuitempanel div.menufillet_s,.menuitempanel div.menufillet_e,.menuitempanel div.menufillet_w,.menuitempanel div.menufillet_se,.menuitempanel div.menufillet_sw').stop(true,true);
		//$(this).find('div.downarrow').hide();
		$(this).find('a:eq(0)').removeClass('hover');//+indexli);
		$(this).find('.menuitempanel').hide();
		var num = $('.menuline');
		for(i=0;i<num.length;i++)
		{
			num.eq(i).removeClass('menuline_hover');
		}
		$('.navclear').removeClass('navclear_hover');
	})
}
	
function setTab(name,cursel,n){
	for(i=1;i<=n;i++){
	  var con=document.getElementById("con_"+name+"_"+i);
	  var menu=document.getElementById(name+i);	
	  con.style.display=i==cursel?"block":"none";
	  menu.className=i==cursel?"hover":"";
	}
}


function setTab2(name,cursel,n){
	for(i=1;i<=n;i++){
	  var menu=document.getElementById(name+i);
	  var con=document.getElementById("con_"+name+"_"+i);
	  menu.className=i==cursel?"hover":"";
	  con.style.display=i==cursel?"block":"none";
	}
}

function setProductDetailTab(name,cursel,n){
	for(i=1;i<=n;i++){
	  var menu=document.getElementById(name+i);
	  var con=document.getElementById("con_"+name+"_"+i);
	  menu.className=i==cursel?"hover":"";
	  con.style.display=i==cursel?"block":"none";
	}
}

function setProductNav(name,cursel,n){
	for(i=1;i<=n;i++){
	  var menu=document.getElementById(name+i);
	  var con=document.getElementById("con_detail_"+i);
	  menu.className=i==cursel?"nav_current":"";
	  con.style.display=i==cursel?"block":"none";
	}
}

function setSuccTab(name,cursel,n){
	for(i=1;i<=n;i++){
	  var menu=document.getElementById(name+i);
	  var con=document.getElementById("con_"+name+"_"+i);
	  menu.className=i==cursel?"hover":"";
	  con.style.display=i==cursel?"block":"none";
	}
}
function setLocforTab(name,cursel,n){
	for(i=1;i<=n;i++){
	  var menu=document.getElementById(name+i);
	  var con=document.getElementById("con_"+name+"_"+i);
	  var b=document.getElementById("b_"+name+"_"+i);
	  menu.className=i==cursel?"hover":"";
	  b.className=i==cursel?"hover":"";
	  con.style.display=i==cursel?"block":"none";
	}
}

function doProductFilter(type){
	var bodyid = type + "_body";
	var bottonid= type + "_button";
	var bodyobj = document.getElementById(bodyid);
	var column_buttonobj = $("#products_column_filter");
	var select_buttonobj = $("#products_select_filter");
	var search_buttonobj = $("#products_search_filter");
	
	bodyobj.className = (bodyobj.className.toLowerCase() == "open"?"close":"open");
	if(type == "products_column" & bodyobj.className.toLowerCase() == "open"){
		var searchobj = document.getElementById("products_search_body");
		searchobj.className = "close";
		var selectobj = document.getElementById("products_select_body");
		selectobj.className = "close";
		column_buttonobj.addClass('filterOpen');
		select_buttonobj.removeClass('filterOpen');
		search_buttonobj.removeClass('filterOpen');
	}
	if(type == "products_column" & bodyobj.className.toLowerCase() == "close"){
		column_buttonobj.removeClass('filterOpen');
	}
	if(type == "products_select" & bodyobj.className.toLowerCase() == "open"){
		var columnobj = document.getElementById("products_column_body");
		columnobj.className = "close";
		var searchobj = document.getElementById("products_search_body");
		searchobj.className = "close";
		select_buttonobj.addClass('filterOpen');
		column_buttonobj.removeClass('filterOpen');
		search_buttonobj.removeClass('filterOpen');
	}
	if(type == "products_select" & bodyobj.className.toLowerCase() == "close"){
		select_buttonobj.removeClass('filterOpen');
	}
	if(type == "products_search" & bodyobj.className.toLowerCase() == "open"){
		var columnobj = document.getElementById("products_column_body");
		columnobj.className = "close";
		var selectobj = document.getElementById("products_select_body");
		selectobj.className = "close";
		search_buttonobj.addClass('filterOpen');
		column_buttonobj.removeClass('filterOpen');
		select_buttonobj.removeClass('filterOpen');
	}
	if(type == "products_search" & bodyobj.className.toLowerCase() == "close"){
		search_buttonobj.removeClass('filterOpen');
	}

}

function closeColumn(){
	var columnobj = document.getElementById("products_column_body");
	//columnobj.className = "close";
	var column_buttonobj = $("#products_column_filter");
	column_buttonobj.removeClass('filterOpen');
}
function closeSearch(){
	var searchobj = document.getElementById("products_search_body");
	//searchobj.className = "close";
	var search_buttonobj = $("#products_search_filter");
	search_buttonobj.removeClass('filterOpen');
}
function closeSelect(){
	var selectobj = document.getElementById("products_select_body");
	//selectobj.className = "close";
	var select_buttonobj = $("#products_select_filter");
	select_buttonobj.removeClass('filterOpen');
}

function showOrHide(id){
	var bodyid = "products_fluid_body" +id;
	var imgid = "products_fluid_img" + id;
	var bodyobj = $("#" + bodyid);
	var imgobj =  $("#" + imgid);
	
	if(bodyobj.hasClass('hide') == true){
		bodyobj.removeClass('hide');
		imgobj.addClass('imgopen');
	}else{
		bodyobj.addClass('hide');
		imgobj.removeClass('imgopen');
	}
}


function viewmore(){
	var obj = $(".locfor_table_more");
	var moreobj = $(".viewmore");
	var lessobj = $(".viewless");
	
	if(obj.hasClass('hide') == true){
		obj.removeClass('hide');
		moreobj.addClass('hide');
		lessobj.removeClass('hide');
	}else{
		obj.addClass('hide');
		moreobj.removeClass('hide');
		lessobj.addClass('hide');
	}
}

function moreOrLess(){
	var moreobj = $(".moreinfo");
	var lessobj = $(".lessinfo");
	var morebt = $(".viewmore");
	var lessbt = $(".viewless");
	
	if(moreobj.hasClass('hide') == true){
		moreobj.removeClass('hide');
		lessobj.addClass('hide');
		morebt.addClass('hide');
		lessbt.removeClass('hide');
	}else{
		moreobj.addClass('hide');
		lessobj.removeClass('hide');
		morebt.removeClass('hide');
		lessbt.addClass('hide');
	}
}


$(document).ready(function(){
	$(".searchbtn").mouseover(
		function(){
			$(".searchbtn").addClass('searchbtn_hover');
	});
	$(".searchbtn").mouseout(
		function(){
			$(".searchbtn").removeClass('searchbtn_hover');
	});	
	
	$(".cate li").mouseover(function(){
		if(!$(this).hasClass('sccur')){
			$(this).addClass('hover');
		}
	});
	$(".cate li").mouseout(function(){
		if($(this).hasClass('hover')){
			$(this).removeClass('hover');
		}
	});
	
	$(".cate li").click(function(){
		var a=$(this).index();
		"none"==$(".cates").eq(a).css("display")&&($(".cate li").removeClass("sccur"), 
		$(this).addClass("sccur"),
		$(".cate li").find("a").removeClass("sccurt"),
		$(".sccur").find("a").addClass("sccurt"),
		$(".cates").each(function(){
			$(this).index()!=a?$(this).hide():$(this).slideDown(200);
		})
		)
	});	
	
	$(".cate li:last").css({marginRight:0});
	$(".sccur").find("a").addClass("sccurt");
	$(".content_info p:last").css({marginBottom:0});
	
	
	$('.membercenter').on('click',function(event){
			event.preventDefault();
			layer.open({
				  type: 1,
					title : false,
					closeBtn : [0 , true],
					border : false,
					shade : [0.5 , '#000' , true],
					area : ['676px','404px'],
				  content: $("#memberlogin")
				});
		});
	
	$("._searchtxt").focus(
		function(){
			$(this).css({borderColor : '#517b02'});
		}
	);
	$("._searchtxt").blur(function(){
		$(this).css({borderColor : '#ccc'});
	});
	
});

function doqa(n){
		if($("#"+"qa_img"+n).hasClass("qaimgopen")){
			$("#"+"qa_img"+n).removeClass("qaimgopen");
		}else{
			$("#"+"qa_img"+n).addClass("qaimgopen")
		}
		if($("#qa_body"+n).hasClass("hide")){
			$("#qa_body"+n).removeClass("hide");
		}else{
			$("#qa_body"+n).addClass("hide");
		}
}

var isHoldFanhui1 = false;
$(document).ready(function(){
	$(".fanhui_list_1").hover(function() {
		
		$(".lxb-container").hover(function() {
			/*clearTimeout(showCallTimer);*/
			$(".fanhui_list_1").stopTime();
			isHoldFanhui1 = true;
	    },function(e) {
	    	/*showCallTimer = setTimeout("resetCallBtn();", 100);*/
	    	isHoldFanhui1 = false;
	    	$(this).oneTime('1s',resetCallBtn,5);
	    });
		
		/*clearTimeout(showCallTimer);*/
		$(".fanhui_list_1").stopTime();
		$(".fanhui_list_1").addClass("frhg");
		$(".lxb-cb-input-btn").empty();
		$(".lxb-container").css("cssText","display:block !important");
    },function(e) {
    	/*showCallTimer = setTimeout("resetCallBtn();", 100);*/
    	$(this).oneTime('100ms',resetCallBtn,5);
    });
	
	$(".lxb-container").hover(function() {
		/*clearTimeout(showCallTimer);*/
		/*$(".fanhui_list_1").stopTime();*/
		alert("zai shangmian ");
		isHoldFanhui1 = true;
    },function(e) {
    	/*showCallTimer = setTimeout("resetCallBtn();", 100);*/
    	isHoldFanhui1 = false;
    	$(this).oneTime('100ms',resetCallBtn,5);
    });
	
	
	
	
	$(".fanhui_list_2").hover(function(e) {
		$(this).addClass("frhg");
    },function(e) {$(this).removeClass("frhg");}
	);
	
	$(".fanhui_list_3").hover(function(e) {
		$(this).addClass("frhg");
    },function(e) {$(this).removeClass("frhg");}
	);
	
	$(".fanhui_list_4").hover(function(e) {
		$(this).addClass("frhg");
    },function(e) {$(this).removeClass("frhg");}
	);
		$(".question_unit_head").click(function(){
		$(this).toggleClass("question_opened");
		$(this).next(".question_body").toggle();
	});
		//当页面小于990时点击右侧按钮出现右侧导航栏
		$('.page').animate({'left':'0px'},300);
		$('.rightbtn').click(function(){
			console.log($('.page'))
			console.log($('.page').css('left'));
			if($('.page').css('left')=="0px" || $('.page').css('left')==undefined){
				$('.page').animate({'left':'-260px'},300);
				$('.intorval').show();
				$('.home').css('background-attachment','scroll');
				$('.page_nav').show();
				$('.home_ping').css('left','260px')
			}else{
			    $('.page').animate({'left':'0px'},300);
				$('.intorval').hide();
				$('.home').css('background-attachment','fixed');
				$('.page_nav').hide();
				$('.home_ping').css('left','0px')
			}
		});
		$('.intorval').click(function(){
				$('.page_nav').hide();
				$('.page__off-canvas--left').hide();
				$('.page').animate({'left':'0px'},300);
				$('.intorval').hide();
				$('.home_ping').css('left','0px')
		});
		$(".subNav").click(function(){
			$(this).toggleClass("currentDd").siblings(".subNav").removeClass("currentDd")
			
			// 修改数字控制速度， slideUp(500)控制卷起速度
			$(this).next(".navContent").slideToggle(500).siblings(".navContent").slideUp(500);
		});
});
function resetCallBtn(){
	if (isHoldFanhui1) return ;
	$(".fanhui_list_1").removeClass("frhg");
	$(".lxb-container").css("cssText","display:none !important");
}


//返回顶部
$("#_Btn_BackTop").click(function() {
	$(document).scrollTop(0);
});

function setMenuWidth()
{
	var width=document.body.clientWidth+40;
	var navLeft = $(".nav").offset().left;
	$(".menuitempanel").css({'left': -navLeft + 'px','width': document.body.clientWidth + 'px'});
	$(".menucontentdiv").css({'padding-left':navLeft + 30 +'px'});
	$(".products_tab").css({'padding-left':navLeft + 30 +'px'});
}
