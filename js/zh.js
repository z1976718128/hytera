$(function(){
	$(".yj_ful li").on("click",function(){
		$(this).addClass("fa_actiovd").siblings().removeClass("fa_actiovd");
		$(".bspa").eq($(this).index()).addClass("blokcsa").siblings().removeClass("blokcsa");
		console.log($(this).index())
	})
	$(window).resize(function(){

		if (innerWidth<750) {
			$(".cppa").hide();
			$(".cppb").show();
			// $(".yja").hide();
			// $(".yjb").show();
			$(".xwzxf").hide();
			$(".xwzxl").show();
			$('.yj_ful').hide()
			
		} else if(innerWidth>750){
			$(".cppb").hide();
			$(".cppa").show();
			$(".hide").show();
			$(".xwzxl").hide();
			$(".xwzxf").show();
			$('.yj_ful').show()
			$(".yja").show();
			$(".yjb").hide();
		}
	})
	if (innerWidth<750) {
		$(".cppa").hide();
		$(".cppb").show();
		// $(".yjb").show();
		// $(".yja").hide();
		$(".xwzxf").hide();
		$(".xwzxl").show();
		$('.yj_ful').hide()
		
	} else if(innerWidth>750){
		$(".cppb").hide();
		$(".cppa").show();
		$(".yja").show();
		$(".yjb").hide();
		$(".xwzxl").hide();
		$(".xwzxf").show();
		$('.yj_ful').show()
	}
	$(".ckLjgd").on("click",function(){
		let id = $(this).attr("data-id")
		console.log(111)
		if(id == 1){
			$(".modes_cont h5").html("地震抢险救援");
			$(".modes_cont_p").html("当自然灾害如地震、台风等发生时，一线救援队员常常面临现场基础设施损毁、公网通信系统瘫痪、道路不通等难题，海能达可提供从终端到指挥通信平台的完整应急解决方案，助力客户时时掌控救援现场，提高救援抢险工作效率、保证人民的生命及财产安全。")
			$(".modes_cont_ls").empty();
			$(".modes_cont_ls").append("<p class=''>通过E-pack和iMesh进行灾害现场的组网覆盖，行程可靠的救援应急通信网络，满足救援现场复杂环境的通信覆盖需要。救援现场，通过指挥调度平台部署现场指挥中心，并通过公网、有线网络、卫星网络等方式与后方总指挥中心实现互联，实现前后方的联合指挥。E-pack或指挥中心通过E-PRAD（G）可实现与周边可利用网络的互联互通。</p>")
			
		}else if(id ==2){
			$(".modes_cont h5").html("城市火灾救援");
			$(".modes_cont_p").html("在高大建筑内，通过部署E-pack和iMesh组网设备，形成全区域的立体宽窄带网络覆盖。在消防通信指挥车上配置E-center，对救援工作进行现场指挥，根据实时回传的语音及视频，及时展开营救。E-pack或指挥中心通过E-PRAD（G）可实现与周边可利用网络互联。若有后方总指挥的互联需要，可通过公网、有线网络、卫星网络等方式与后方总指挥中心实现互联，实现前后方的联合指挥。")
			$(".modes_cont_ls").empty();
			$(".modes_cont_ls").append("<img class='modes_cont_img' src='img/yj/jue1.png'/>")
			
		}else if(id ==3){
			$(".modes_cont h5").html("重大安保解决方案");
			$(".modes_cont_p").html("在高大建筑内，通过部署E-pack和iMesh组网设备，形成全区域的立体宽窄带网络覆盖。在消防通信指挥车上配置E-center，对救援工作进行现场指挥，根据实时回传的语音及视频，及时展开营救。E-pack或指挥中心通过E-PRAD（G）可实现与周边可利用网络互联。若有后方总指挥的互联需要，可通过公网、有线网络、卫星网络等方式与后方总指挥中心实现互联，实现前后方的联合指挥。")
			$(".modes_cont_ls").empty();
			$(".modes_cont_ls").append("<img class='modes_cont_img' src='img/yj/jue3.png'/>")
			
		}else if(id ==4){
			$(".modes_cont h5").html("多层地下/地下车库/地铁解决方案");
			$(".modes_cont_p").html("E-pack和iMesh部署在地下，通过多跳自组网方式实现临时网络覆盖，实现底下通信组网与地表现场指挥中心的互联；如需与后方指挥中心或本地网络互连，可安放E-PRAD（G）于将要接入的网络覆盖区，通过E-PRAD（G）提供的GSM链路，实现应急组网与本地网络的一路语音通信及短信业务互通。")
			$(".modes_cont_ls").empty();
			$(".modes_cont_ls").append("<img class='modes_cont_img' src='img/yj/jue4.png'/>")
			
		}else if(id == 5){
			$(".modes_cont h5").html("地震抢险救援");
			$(".modes_cont_p").html("当自然灾害如地震、台风等发生时，一线救援队员常常面临现场基础设施损毁、公网通信系统瘫痪、道路不通等难题，海能达可提供从终端到指挥通信平台的完整应急解决方案，助力客户时时掌控救援现场，提高救援抢险工作效率、保证人民的生命及财产安全。")
			$(".modes_cont_ls").empty();
		}
		$(".modes").show()
	})
	
	$(".modes_back").on("click",function(){
		$(".modes").hide()
	})
	$(".modes").on("click",function(){
		$(this).hide()
	})
	$(".zl-pc-header").css("position","fixed")
	
	$(".sasap ul li a").on("click",function(){
		$(this).addClass("acsasa").parent().siblings().children("a").removeClass("acsasa")
	})
	
	$(".yj_zdcp_list").hover(function(){
		$(this).addClass("bro").siblings().removeClass("bro");
		$(this).siblings("img").show()
	},function(){
		$(this).removeClass("bro");
		$(this).siblings("img").hide()
	})
	$(".video-item ").hover(function(){
		$(this).find("img").show()
	},function(){
		$(this).children("img").hide()
		
	})
	
	$(".ly_conts_list_last").on("click",function(){
		window.location.href="https://www.hytera.com/cn/#/index/category/detail/5/1813/75298"
	})
	$(".ly_conts_list_nth").on("click",function(){
		window.location.href="https://www.hytera.com/cn/#/index/category/detail/5/126/75304"
	})
	$(".ly_conts_list_frist").on("click",function(){
		window.location.href="https://www.hytera.com/cn/#/index/category/detail/5/1813/75298"
	})
})