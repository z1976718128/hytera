	
	var innerHt=window.innerHeight-$(".zl-pc-header-box").height();


        $(function () {
            $('.product-black').each(function () {
                $(this).hover(function () {
                    $(this).addClass('on');
                }, function () {
                    $(this).removeClass('on');
                });
            });
        });
        $(".summit li").mouseover(function () { 
            $("#events-simg").css("background-image", "url("+$(this).attr("simg")+")");
			console.log($(this).attr("simg")); 
        });
		
    $('.fullscreen').click(function () {
        $("html,body").animate({
            scrollTop: $('.rslides').height()
        }, 1000); //1000为滚动的时延
    });
	$(document).ready(function() {
		$('.theme-login').click(function(){ 
			$('.theme-popover-mask').fadeIn(100);
			$('.theme-popover').slideDown(200);
        })
        $('.theme-poptit .close').click(function(){
        	$('.theme-popover-mask').fadeOut(100);
        	$('.theme-popover').slideUp(200);
        })

    })

function initSearchSubPage() {
	$(".support_input_focus").focus(function() {
		searchClear($(this))
	}), $(".support_input_focus").blur(function() {
		searchShow($(this))
	}), $(".Find_support").click(function() {
		var e = $(this).parents(".productSupportDivNew").data("type"),
			t = $(this).parents(".productSupportDivNew").find(".support_input_focus").val(),
			i = $(this).parents(".productSupportDivNew").find(".Find_Language").val();
		i != undefined && "" != i || (i = "en"), "all" == e ? (saveSearchKey(t), OpenTheSearch()) : window.open(supportUrl + "/enterprisesearch?lang=" + i + "#type=searchAll&keyword=" + t)
	})
}

function EnterSupportSearch(e) {
	13 == (window.event || arguments.callee.caller.arguments[0]).keyCode && $(e).parents(".productSupportDivNew").find(".Find_support").trigger("click")
}

function searchClear(e) {
	var t = $(e).parents(".productSupportDivNew").find(".inputInfohint").val(),
		i = $(e).parents(".productSupportDivNew").find(".support_input_focus");
	i.val() == t && (i.val(""), i.css("color", "#000"))
}

function searchShow(e) {
	var t = $(e).parents(".productSupportDivNew").find(".inputInfohint").val(),
		i = $(e).parents(".productSupportDivNew").find(".support_input_focus");
	i.val().length <= 0 && (i.val(t), i.css("color", "#8e8e8e"))
}

function immediately(e, t) {
	function i(e) {
		var i = $(e);
		!(e = window.event || e) || "value" != e.propertyName && e.propertyName || t(i)
	}
	$(e).bind("input propertychange", function() {
		i($(this))
	})
}

function initAutoThink(e) {
	var t = $(e),
		i = $.trim(t.val()),
		n = t.parents(".productSupportDivNew").find(".Find_Language").val(),
		a = (t.parents(".productSupportDivNew").find(".inputInfohint").val(), t.parents(".productSupportDivNew"));
	a.length < 1 && (a = $("#productSupportDivNew"));
	var o = 60;
	"zh" != n && (o = 80), querysearchProduct(t, o, i, a, a, e)
}

function querysearchProduct(e, t, i, n, n, a) {
	var o = $(a).parents(".productSupportDivNew").find(".Find_Language").val(),
		s = "en";
	"cn" != o && "zh" != o || (s = "zh");
	Math.round(1e4 * Math.random());
	e.autocomplete({
		minChars: 0,
		scrollHeight: 40,
		max: 10,
		source: function(e, t) {
			null != lastCompleteAjax && lastCompleteAjax.abort();
			var n = $(a).data("type");
			lastCompleteAjax = $.ajax({
				url: eUrl + "/enterprisesearch/getProductByKeyword",
				dataType: "json",
				type: "GET",
				cache: !0,
				data: {
					keyword: i,
					mid: n,
					lang: s,
					requestType: "ajax.json"
				},
				success: function(e) {
					if (null != e) {
						var n = {};
						if (e.length < 10) {
							associateListSize = e.length;
							var a = 0;
							$.ajax({
								url: eUrl + "/enterprisesearch/autoComplete",
								dataType: "json",
								cache: !0,
								type: "GET",
								data: {
									keyword: i,
									lang: s,
									requestType: "ajax.json"
								},
								success: function(s) {
									var r = s;
									if (null != r && r.autoCompleteList) {
										r.autoCompleteList.length > 0 && (hasKeyword = !0);
										var l = e.concat(r.autoCompleteList);
										t($.map(l, function(e) {
											return flag = !0, a++, n = a < associateListSize + 1 ? {
												value: e.proName,
												pbiId: e.proId,
												nameZh: e.proName,
												fullNodeIdPath: e.idAbsPath,
												fullNodeNamePath: e.level15
											} : {
												value: e,
												nameZh: e,
												fullNodeNamePath: e,
												typeId: i
											}
										})), "sa" == o && ($(".ui-autocomplete").css("direction", "rtl"), $(".ui-corner-all").css("text-align", "right"))
									}
								},
								error: function() {}
							})
						} else t($.map(e, function(e) {
							return flag = !0, n = {
								value: e.proName,
								pbiId: e.proId,
								nameZh: e.proName,
								fullNodeIdPath: e.idAbsPath,
								fullNodeNamePath: e.level15
							}
						}));
						"sa" == o && ($(".ui-autocomplete").css("direction", "rtl"), $(".ui-corner-all").css("text-align", "right"))
					} else $(".ui-autocomplete").css("display", "none")
				},
				error: function() {}
			})
		},
		select: function(t, i) {
			if (i.item.typeId) {
				var n = $("#categorytype").val();
				"txtSearch_Navigation" == $(this).attr("id") ? n != undefined && "" != n || (n = "ALL") : n = "searchAll", location.href = eUrl + "/enterprisesearch?lang=" + o + "#type=" + n + "&keyword=" + i.item.value
			} else location.href = supportUrl + "/enterprise/productsupport?pid=" + i.item.pbiId + "&idAbsPath=" + i.item.fullNodeIdPath;
			e.autocomplete().blur()
		},
		open: function(e, t) {
			$(e.target).parent().children(".ui-autocomplete").children().filter(".js-not-menu").removeClass()
		}
	}).data("uiAutocomplete")._renderItem = function(e, o) {
		var s = $("<li style='height:26px;'></li>").data("item.autocomplete", o).append("<a style='height:26px;' title='" + o.fullNodeNamePath + "'><span>" + ("" == o.fullNodeNamePath ? "" : highlightKeyword(o.fullNodeNamePath.substring(0, t), i)) + (o.fullNodeNamePath.length > t ? "..." : "") + "</span></a>").appendTo(e);
		if ($(n).append(e), flag && ($(".ui-autocomplete").prepend("<li class='js-not-menu' style='font-size:13px;color:#999;padding-left:10px;margin-top: 7px;position: static;background: none !important;'>" + $(a).parents(".productSupportDivNew").find(".searchHint").val() + "</li>"), flag = !1), hasKeyword) if (associateListSize > 0) {
			var r = $(".ui-autocomplete li a").size();
			r == associateListSize && ($(".ui-autocomplete").children("li").eq(r).attr("style", "float:left;"), $(".ui-autocomplete").children("li").eq(r).after("<li class='js-not-menu' style='font-size:13px;color:#999;padding-left:10px;float:left;border-top:1px solid #e1e1e1;margin-top:7px;background: none !important;'>" + $(a).parents(".productSupportDivNew").find(".searchSuggestTerm").val() + "</li>"), hasKeyword = !1)
		} else $(".ui-autocomplete").children("li").eq(0).html($(a).parents(".productSupportDivNew").find(".searchSuggestTerm").val()), hasKeyword = !1;
		return s
	}
}

function highlightKeyword(e, t) {
	var i = e.lastIndexOf("»");
	return -1 != i ? e.substring(0, i) + e.substring(i, e.length).replace(new RegExp("(?![^&;]+;)(?!<[^<>]*)(" + t.replace(/([\^\$\(\)\[\]\{\}\*\.\+\?\|\\])/gi, "\\$1") + ")(?![^<>]*>)(?![^&;]+;)", "gi"), "<strong>$1</strong>") : e.replace(new RegExp("(?![^&;]+;)(?!<[^<>]*)(" + t.replace(/([\^\$\(\)\[\]\{\}\*\.\+\?\|\\])/gi, "\\$1") + ")(?![^<>]*>)(?![^&;]+;)", "gi"), "<strong>$1</strong>")
}

function product(e) {
	var t = $("#inputInfohint").val(),
		i = $.trim(e);
	return null == i || "" == $.trim(i) || t == i ? (alert($("#productSearchI18n").val()), !1) : !($.trim(i).length < 2) || (alert($("#I18n_inputMinkey").val()), !1)
}

function getOs() {
	return navigator.userAgent.indexOf("MSIE") > 0 ? "MSIE" : (isFirefox = navigator.userAgent.indexOf("Firefox") > 0) ? "Firefox" : (isSafari = navigator.userAgent.indexOf("Safari") > 0) ? "Safari" : (isCamino = navigator.userAgent.indexOf("Camino") > 0) ? "Camino" : (isMozilla = navigator.userAgent.indexOf("Gecko/") > 0) ? "Gecko" : void 0
}

function saveSearchKey(e) {
	"zh" == $("#gLanguageCurrent").val() || $("#gLanguageCurrent").val();
	$.ajax({
		url: gLinkHost + "/en/AppService/IndexContent/LinkService",
		type: "post",
		cache: !1,
		async: !0,
		data: {
			optype: "setc",
			languagecurrent: $("#gLanguageCurrent").val(),
			setval: e
		},
		success: function(e) {
			null != e && showSearchKey()
		}
	})
}

function showSearchKey() {
	var lang = "zh" == $("#gLanguageCurrent").val() ? "cn" : $("#gLanguageCurrent").val();
	$.ajax({
		url: gLinkHost + "/en/AppService/IndexContent/LinkService",
		type: "post",
		cache: !1,
		async: !0,
		data: {
			optype: "getc",
			languagecurrent: $("#gLanguageCurrent").val()
		},
		success: function(data) {
			var searchkeyStr = data;
			searchkeyStr || (searchkeyStr = "[]");
			var searchkeylist = eval("(" + searchkeyStr + ")");
			if (searchkeylist && searchkeylist.length > 0) {
				for (var html = "", i = 0; i < searchkeylist.length; i++) html += '<a title="' + searchkeylist[i] + '" href="javascript:void(0)"><span>' + searchkeylist[i] + "</span></a>";
				$(".ui-menu-item.ui-menu-history").html(html), $(".ui-menu-item.ui-menu-history").show(), $(".ui-menu-item.ui-menu-history").prev().show()
			} else $(".ui-menu-item.ui-menu-history").hide(), $(".ui-menu-item.ui-menu-history").prev().hide();
			$(".zl-pc-searching-tip a").off().on("click", function() {
				$(this).parents(".nav-searchbit-box").find("#txtSearch_Navigation").val($(this).attr("title")), $(this).parents(".productSupportDivNew").find(".Find_support").trigger("click"), $(".zl-pc-searching-tip").hide()
			})
		}
	})
}

function Base() {}

function baseGetSpaceCookieValue(e) {
	var t = document.cookie.match(new RegExp("(^| )" + e + "=([^;]*)(;|$)"));
	return null != t ? t[2] : null
}

function AppendMobileLoginNew() {
	var e = "";
	null != GetCookieValueNew("login_uid") && (e = GetCookieValueNew("login_uid")), null != GetCookieValueNew("uid") && (e = GetCookieValueNew("uid"));
	$("#hidden_mobile_space").val();
	var t = $("#hidden_mobile_login").val(),
		i = $("#hidden_worldwide").val();
	if ($(".wap-navbottom").find("a").first().html(i), "" == e) {
		if ($(".wap-navmain ul").length > 0) {
			var n = $("#hidelonginLinkStr").val();
			n += encodeURI(location.href), $(".wap-navbottom").find("a").last().html(t), $(".wap-navbottom").find("a").last().attr("href", n)
		}
	} else $(".wap-navmain ul").length > 0 && ($(".wap-navbottom").find("a").first().addClass("full-width"), $(".wap-navbottom").find("a").length > 1 && $(".wap-navbottom").find("a").last().remove())
}

function GetUserInfoNew() {
	var e = baseGetSpaceCookieValue("uid"),
		t = baseGetSpaceCookieValue("hwsso_uniportal"),
		i = baseGetSpaceCookieValue("login_uid");
	if (null != t && "undefined" != t && "" != t || null != i && "undefined" != i && "" != i || null != e && "undefined" != e && "" != e) {
		var n = $("#hfUserstate").val();
		"" != n && (n += "?action=userstate&currentUrl=" + encodeURI(window.location), $.ajax({
			url: n,
			dataType: "json",
			cache: !1,
			async: !0,
			success: function(e) {
				if (e.Stats) {
					var t = "",
						i = $(".zl-pc-logined-box .top");
					if (i.length < 1) return;
					$(i).empty(), $(".zl-pc-logined-box").parents(".zl-pc-login").addClass("success");
					for (var n = window.location.href, a = 0; a < e.Links.length; a++)"{1158F0AC-EF30-44B3-B2F1-E5D73C57DC46}" == e.Links[a].ID && e.Links[a].UpdateCount > 0 && n.indexOf("myspace/MaterialUpdate") < 0 ? t += "<a title='" + e.Links[a].Name + "' data-value='" + e.Links[a].ID + "' id='headLink" + a + "' href='" + e.Links[a].Url + "'><i class='iconfont " + e.Links[a].Icon + "'></i>" + e.Links[a].Name : "{1158F0AC-EF30-44B3-B2F1-E5D73C57DC46}" == e.Links[a].ID && e.Links[a].UpdateCount <= 0 && n.indexOf("myspace/MaterialUpdate") < 0 ? t += "<a title='" + e.Links[a].Name + "' data-value='" + e.Links[a].ID + "' id='headLink" + a + "' href='" + e.Links[a].Url + "'><i class='iconfont " + e.Links[a].Icon + "'></i>" + e.Links[a].Name + "</a>" : "{6E9B06D4-8D3A-499D-9B15-1605DA7FA3E0}" == e.Links[a].ID && (t += "<a title='" + e.Links[a].Name + "' data-value='" + e.Links[a].ID + "' id='headLink" + a + "' href='" + e.Links[a].Url + "'><i class='iconfont " + e.Links[a].Icon + "'></i>" + e.Links[a].Name + "</a>");
					$(i).html(t), $("#V_userName").val(e.UserName), $.cookie("accountid", e.UserName), $.cookie("usertype", e.UserType), $.cookie("wwwusertype", e.WWWUserType), $.cookie("SpaceUpdateCount", e.UpdateCount, {
						path: "/"
					})
				}
			},
			error: function(e) {}
		}))
	}
}

function LoginCookieTipsNew() {
	if ("cn" == $("#gLanguageCurrent").val() || "zh" == $("#gLanguageCurrent").val() || "en" == $("#gLanguageCurrent").val()) {
		var e = "";
		if (null != GetCookieValueNew("login_uid") && (e = GetCookieValueNew("login_uid")), null != GetCookieValueNew("uid") && (e = GetCookieValueNew("uid")), "" != e) {
			var t = GetCookieValueNew("SpaceTimes");
			if (null == t || "" == t || "undefined" == t) {
				var i = GetCookieValueNew("SpaceCookie");
				null != i && "" != i && "undefined" != i || ($.cookie("SpaceCookie", "show_my_space", {
					path: "/"
				}), $(".zl-pc-logined-tip").show(), $("#noshow_myspace").click(function() {
					$("#noshow_myspace").prop("checked") ? $.cookie("SpaceTimes", "no_notice", {
						expires: 90,
						path: "/"
					}) : DelCookieNew("SpaceTimes"), $(".zl-pc-logined-tip").hide()
				}))
			}
		}
	}
}

function DelCookieNew(e) {
	var t = new Date;
	t.setTime(t.getTime() - 1);
	var i = GetCookieValueNew(e);
	null != i && (document.cookie = e + "=" + i + ";expires=" + t.toGMTString() + ";path=/")
}

function GetCookieValueUnescapeNew(e) {
	var t = document.cookie.match(new RegExp("(^| )" + e + "=([^;]*)(;|$)"));
	return null != t ? unescape(t[2]) : null
}

function GetCookieValueNew(e) {
	var t = document.cookie.match(new RegExp("(^| )" + e + "=([^;]*)(;|$)"));
	return null != t ? t[2] : null
}

function openContact() {
	"ar-sa" == $("#gLanguageCurrent").val() ? ($(".contact_btn").addClass("open"), $(".contact_btn b").show(), $(".contact_layer").animate({
		left: 35
	}, 330)) : ($(".contact_layer").css({
		"margin-top": $(".contact_btn").css("margin-top")
	}), $(".contact_layer").animate({
		right: 35
	}, 300), $(".contact_btn").addClass("open"), $(".contact_btn b").show(), closeCompare(), closeCart())
}

function closeContact() {
	"ar-sa" == $("#gLanguageCurrent").val() ? ($(".contact_btn").removeClass("open"), $(".contact_btn b").hide(), $(".contact_layer").animate({
		left: -250
	})) : ($(".contact_layer").animate({
		right: -250
	}, 300), $(".contact_btn").removeClass("open"), $(".contact_btn b").hide())
}

function closeCompare() {
	var e = $("#compare_column");
	winW > 768 ? e.animate({
		right: -335
	}, 300) : e.animate({
		right: "-100%"
	}, 300), $(".compare_btn b").hide(), $(".compare_btn").removeClass("open")
}

function closeCart() {
	0 == $(".shopping_all").length ? winW > 768 ? $("#shopping_cart").animate({
		right: -335
	}, 300) : $("#shopping_cart").animate({
		right: "-100%"
	}, 300) : winW > 980 ? $("#shopping_cart").animate({
		right: -335
	}, 300) : $("#shopping_cart").animate({
		right: "-100%"
	}, 300), $(".shopping_cart").removeClass("bg"), $(".shopping_btn b").hide(), $(".shopping_btn").removeClass("open")
}

function controlImgH(e, t) {
	$(e).each(function() {
		var e = $(this).find("img").height();
		e > t ? $(this).find("img").css({
			"max-height": t,
			width: "auto",
			"margin-top": 0
		}) : $(this).parents().hasClass("product_series") || $(this).parents().hasClass("orders_wrap") || $(this).parents().hasClass("compare_result_table") ? e <= 100 && $(this).find("img").css({
			"margin-top": 20
		}) : $(this).find("img").css({
			"max-height": "none",
			width: "100%",
			"margin-top": 0
		}), $(this).addClass("visited")
	})
}

function SaveSourceCookie() {
	var e = baseUtils.getQueryString("source");
	0 == IsEmpty(e) && ((i = new Date).setTime(i.getTime() + 72e5), document.cookie = "subTactic1=" + e + ";expires=" + i.toGMTString() + ";path=/");
	var t = baseUtils.getQueryString("utm_campaign");
	if (0 == IsEmpty(t)) {
		var i = new Date;
		i.setTime(i.getTime() + 72e5), document.cookie = "utm_campaign=" + t + ";expires=" + i.toGMTString() + ";path=/"
	}
}

function IsEmpty(e) {
	var t = $.trim(e);
	return "" == t || null == t || t == undefined
}

function checkDomain() {
	!
	function(e, t, i, n) {
		t.ha = t.ha ||
		function() {
			(t.ha.q = t.ha.q || []).push(arguments)
		}, setTimeout(function() {
			var e = document.createElement("iframe");
			(e.frameElement || e).style.cssText = "display:none", e.src = "javascript:false";
			var t = document.getElementsByTagName("script")[0];
			t.parentNode.insertBefore(e, t);
			var i = e.contentWindow.document;
			i.open().write("<body onload=\"var js = document.createElement('script');js.src = 'http://app.huawei.com/hwa-c/configresource/js/general/ha_f.js?hr=" + (new Date).getTime() + "';document.body.appendChild(js);\">"), i.close()
		}, 0)
	}(0, window, document), ha("set", "siteId", "ebg")
}

function hwaTrackEventClick(e, t, i, n, a) {
	try {
		hwa_DisablHwa || (ha("set", {
			opr_wf_n: t,
			opr_wf_d: (new Date).getTime() - a,
			page_hierarchy: "c:{" + e + "}g:{" + i + "}t:{" + i + "}f:{" + n + "}"
		}), ha("trackEvent", "click"))
	} catch (o) {}
}

function getBreadcrumbText(e) {
	var t = "";
	e = e && "" != e ? e : "/";
	var i = $("#breadcrumb_nav>ul>li>a"),
		n = i.length;
	return i.each(function(i, a) {
		t += $(a).text().replace("<span></span>", ""), i < n - 1 && (t += e)
	}), t
}

function get_FeedBack_Url() {
	try {
		var e = document.location.href,
			t = "";
		null != e && (t = e.indexOf("get-price-info")), t < 0 ? $.cookie("My_Feedback_URL", e, {
			path: "/"
		}) : $("input[name='buyFeedBackVO.feedback_URL']").val($.cookie("My_Feedback_URL"))
	} catch (i) {}
}!
function(e) {
	"function" == typeof define && define.amd ? define(["jquery"], e) : e(jQuery)
}(function(e) {
	function t(t, n) {
		var a, o, s, r = t.nodeName.toLowerCase();
		return "area" === r ? (a = t.parentNode, o = a.name, !(!t.href || !o || "map" !== a.nodeName.toLowerCase()) && ( !! (s = e("img[usemap='#" + o + "']")[0]) && i(s))) : (/input|select|textarea|button|object/.test(r) ? !t.disabled : "a" === r ? t.href || n : n) && i(t)
	}

	function i(t) {
		return e.expr.filters.visible(t) && !e(t).parents().addBack().filter(function() {
			return "hidden" === e.css(this, "visibility")
		}).length
	}

	function n(e) {
		for (var t, i; e.length && e[0] !== document;) {
			if (("absolute" === (t = e.css("position")) || "relative" === t || "fixed" === t) && (i = parseInt(e.css("zIndex"), 10), !isNaN(i) && 0 !== i)) return i;
			e = e.parent()
		}
		return 0
	}

	function a() {
		this._curInst = null, this._keyEvent = !1, this._disabledInputs = [], this._datepickerShowing = !1, this._inDialog = !1, this._mainDivId = "ui-datepicker-div", this._inlineClass = "ui-datepicker-inline", this._appendClass = "ui-datepicker-append", this._triggerClass = "ui-datepicker-trigger", this._dialogClass = "ui-datepicker-dialog", this._disableClass = "ui-datepicker-disabled", this._unselectableClass = "ui-datepicker-unselectable", this._currentClass = "ui-datepicker-current-day", this._dayOverClass = "ui-datepicker-days-cell-over", this.regional = [], this.regional[""] = {
			closeText: "Done",
			prevText: "Prev",
			nextText: "Next",
			currentText: "Today",
			monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
			monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
			dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
			dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
			dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
			weekHeader: "Wk",
			dateFormat: "mm/dd/yy",
			firstDay: 0,
			isRTL: !1,
			showMonthAfterYear: !1,
			yearSuffix: ""
		}, this._defaults = {
			showOn: "focus",
			showAnim: "fadeIn",
			showOptions: {},
			defaultDate: null,
			appendText: "",
			buttonText: "...",
			buttonImage: "",
			buttonImageOnly: !1,
			hideIfNoPrevNext: !1,
			navigationAsDateFormat: !1,
			gotoCurrent: !1,
			changeMonth: !1,
			changeYear: !1,
			yearRange: "c-10:c+10",
			showOtherMonths: !1,
			selectOtherMonths: !1,
			showWeek: !1,
			calculateWeek: this.iso8601Week,
			shortYearCutoff: "+10",
			minDate: null,
			maxDate: null,
			duration: "fast",
			beforeShowDay: null,
			beforeShow: null,
			onSelect: null,
			onChangeMonthYear: null,
			onClose: null,
			numberOfMonths: 1,
			showCurrentAtPos: 0,
			stepMonths: 1,
			stepBigMonths: 12,
			altField: "",
			altFormat: "",
			constrainInput: !0,
			showButtonPanel: !1,
			autoSize: !1,
			disabled: !1
		}, e.extend(this._defaults, this.regional[""]), this.regional.en = e.extend(!0, {}, this.regional[""]), this.regional["en-US"] = e.extend(!0, {}, this.regional.en), this.dpDiv = o(e("<div id='" + this._mainDivId + "' class='ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>"))
	}

	function o(t) {
		var i = "button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a";
		return t.delegate(i, "mouseout", function() {
			e(this).removeClass("ui-state-hover"), -1 !== this.className.indexOf("ui-datepicker-prev") && e(this).removeClass("ui-datepicker-prev-hover"), -1 !== this.className.indexOf("ui-datepicker-next") && e(this).removeClass("ui-datepicker-next-hover")
		}).delegate(i, "mouseover", s)
	}

	function s() {
		e.datepicker._isDisabledDatepicker(g.inline ? g.dpDiv.parent()[0] : g.input[0]) || (e(this).parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover"), e(this).addClass("ui-state-hover"), -1 !== this.className.indexOf("ui-datepicker-prev") && e(this).addClass("ui-datepicker-prev-hover"), -1 !== this.className.indexOf("ui-datepicker-next") && e(this).addClass("ui-datepicker-next-hover"))
	}

	function r(t, i) {
		e.extend(t, i);
		for (var n in i) null == i[n] && (t[n] = i[n]);
		return t
	}
	e.ui = e.ui || {}, e.extend(e.ui, {
		version: "1.11.1",
		keyCode: {
			BACKSPACE: 8,
			COMMA: 188,
			DELETE: 46,
			DOWN: 40,
			END: 35,
			ENTER: 13,
			ESCAPE: 27,
			HOME: 36,
			LEFT: 37,
			PAGE_DOWN: 34,
			PAGE_UP: 33,
			PERIOD: 190,
			RIGHT: 39,
			SPACE: 32,
			TAB: 9,
			UP: 38
		}
	}), e.fn.extend({
		scrollParent: function(t) {
			var i = this.css("position"),
				n = "absolute" === i,
				a = t ? /(auto|scroll|hidden)/ : /(auto|scroll)/,
				o = this.parents().filter(function() {
					var t = e(this);
					return (!n || "static" !== t.css("position")) && a.test(t.css("overflow") + t.css("overflow-y") + t.css("overflow-x"))
				}).eq(0);
			return "fixed" !== i && o.length ? o : e(this[0].ownerDocument || document)
		},
		uniqueId: function() {
			var e = 0;
			return function() {
				return this.each(function() {
					this.id || (this.id = "ui-id-" + ++e)
				})
			}
		}(),
		removeUniqueId: function() {
			return this.each(function() {
				/^ui-id-\d+$/.test(this.id) && e(this).removeAttr("id")
			})
		}
	}), e.extend(e.expr[":"], {
		data: e.expr.createPseudo ? e.expr.createPseudo(function(t) {
			return function(i) {
				return !!e.data(i, t)
			}
		}) : function(t, i, n) {
			return !!e.data(t, n[3])
		},
		focusable: function(i) {
			return t(i, !isNaN(e.attr(i, "tabindex")))
		},
		tabbable: function(i) {
			var n = e.attr(i, "tabindex"),
				a = isNaN(n);
			return (a || n >= 0) && t(i, !a)
		}
	}), e("<a>").outerWidth(1).jquery || e.each(["Width", "Height"], function(t, i) {
		function n(t, i, n, o) {
			return e.each(a, function() {
				i -= parseFloat(e.css(t, "padding" + this)) || 0, n && (i -= parseFloat(e.css(t, "border" + this + "Width")) || 0), o && (i -= parseFloat(e.css(t, "margin" + this)) || 0)
			}), i
		}
		var a = "Width" === i ? ["Left", "Right"] : ["Top", "Bottom"],
			o = i.toLowerCase(),
			s = {
				innerWidth: e.fn.innerWidth,
				innerHeight: e.fn.innerHeight,
				outerWidth: e.fn.outerWidth,
				outerHeight: e.fn.outerHeight
			};
		e.fn["inner" + i] = function(t) {
			return void 0 === t ? s["inner" + i].call(this) : this.each(function() {
				e(this).css(o, n(this, t) + "px")
			})
		}, e.fn["outer" + i] = function(t, a) {
			return "number" != typeof t ? s["outer" + i].call(this, t) : this.each(function() {
				e(this).css(o, n(this, t, !0, a) + "px")
			})
		}
	}), e.fn.addBack || (e.fn.addBack = function(e) {
		return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
	}), e("<a>").data("a-b", "a").removeData("a-b").data("a-b") && (e.fn.removeData = function(t) {
		return function(i) {
			return arguments.length ? t.call(this, e.camelCase(i)) : t.call(this)
		}
	}(e.fn.removeData)), e.ui.ie = !! /msie [\w.]+/.exec(navigator.userAgent.toLowerCase()), e.fn.extend({
		focus: function(t) {
			return function(i, n) {
				return "number" == typeof i ? this.each(function() {
					var t = this;
					setTimeout(function() {
						e(t).focus(), n && n.call(t)
					}, i)
				}) : t.apply(this, arguments)
			}
		}(e.fn.focus),
		disableSelection: function() {
			var e = "onselectstart" in document.createElement("div") ? "selectstart" : "mousedown";
			return function() {
				return this.bind(e + ".ui-disableSelection", function(e) {
					e.preventDefault()
				})
			}
		}(),
		enableSelection: function() {
			return this.unbind(".ui-disableSelection")
		},
		zIndex: function(t) {
			if (void 0 !== t) return this.css("zIndex", t);
			if (this.length) for (var i, n, a = e(this[0]); a.length && a[0] !== document;) {
				if (("absolute" === (i = a.css("position")) || "relative" === i || "fixed" === i) && (n = parseInt(a.css("zIndex"), 10), !isNaN(n) && 0 !== n)) return n;
				a = a.parent()
			}
			return 0
		}
	}), e.ui.plugin = {
		add: function(t, i, n) {
			var a, o = e.ui[t].prototype;
			for (a in n) o.plugins[a] = o.plugins[a] || [], o.plugins[a].push([i, n[a]])
		},
		call: function(e, t, i, n) {
			var a, o = e.plugins[t];
			if (o && (n || e.element[0].parentNode && 11 !== e.element[0].parentNode.nodeType)) for (a = 0; o.length > a; a++) e.options[o[a][0]] && o[a][1].apply(e.element, i)
		}
	};
	var l = 0,
		c = Array.prototype.slice;
	e.cleanData = function(t) {
		return function(i) {
			var n, a, o;
			for (o = 0; null != (a = i[o]); o++) try {
				(n = e._data(a, "events")) && n.remove && e(a).triggerHandler("remove")
			} catch (s) {}
			t(i)
		}
	}(e.cleanData), e.widget = function(t, i, n) {
		var a, o, s, r, l = {},
			c = t.split(".")[0];
		return t = t.split(".")[1], a = c + "-" + t, n || (n = i, i = e.Widget), e.expr[":"][a.toLowerCase()] = function(t) {
			return !!e.data(t, a)
		}, e[c] = e[c] || {}, o = e[c][t], s = e[c][t] = function(e, t) {
			return this._createWidget ? void(arguments.length && this._createWidget(e, t)) : new s(e, t)
		}, e.extend(s, o, {
			version: n.version,
			_proto: e.extend({}, n),
			_childConstructors: []
		}), r = new i, r.options = e.widget.extend({}, r.options), e.each(n, function(t, n) {
			return e.isFunction(n) ? void(l[t] = function() {
				var e = function() {
						return i.prototype[t].apply(this, arguments)
					},
					a = function(e) {
						return i.prototype[t].apply(this, e)
					};
				return function() {
					var t, i = this._super,
						o = this._superApply;
					return this._super = e, this._superApply = a, t = n.apply(this, arguments), this._super = i, this._superApply = o, t
				}
			}()) : void(l[t] = n)
		}), s.prototype = e.widget.extend(r, {
			widgetEventPrefix: o ? r.widgetEventPrefix || t : t
		}, l, {
			constructor: s,
			namespace: c,
			widgetName: t,
			widgetFullName: a
		}), o ? (e.each(o._childConstructors, function(t, i) {
			var n = i.prototype;
			e.widget(n.namespace + "." + n.widgetName, s, i._proto)
		}), delete o._childConstructors) : i._childConstructors.push(s), e.widget.bridge(t, s), s
	}, e.widget.extend = function(t) {
		for (var i, n, a = c.call(arguments, 1), o = 0, s = a.length; s > o; o++) for (i in a[o]) n = a[o][i], a[o].hasOwnProperty(i) && void 0 !== n && (t[i] = e.isPlainObject(n) ? e.isPlainObject(t[i]) ? e.widget.extend({}, t[i], n) : e.widget.extend({}, n) : n);
		return t
	}, e.widget.bridge = function(t, i) {
		var n = i.prototype.widgetFullName || t;
		e.fn[t] = function(a) {
			var o = "string" == typeof a,
				s = c.call(arguments, 1),
				r = this;
			return a = !o && s.length ? e.widget.extend.apply(null, [a].concat(s)) : a, o ? this.each(function() {
				var i, o = e.data(this, n);
				return "instance" === a ? (r = o, !1) : o ? e.isFunction(o[a]) && "_" !== a.charAt(0) ? (i = o[a].apply(o, s)) !== o && void 0 !== i ? (r = i && i.jquery ? r.pushStack(i.get()) : i, !1) : void 0 : e.error("no such method '" + a + "' for " + t + " widget instance") : e.error("cannot call methods on " + t + " prior to initialization; attempted to call method '" + a + "'")
			}) : this.each(function() {
				var t = e.data(this, n);
				t ? (t.option(a || {}), t._init && t._init()) : e.data(this, n, new i(a, this))
			}), r
		}
	}, e.Widget = function() {}, e.Widget._childConstructors = [], e.Widget.prototype = {
		widgetName: "widget",
		widgetEventPrefix: "",
		defaultElement: "<div>",
		options: {
			disabled: !1,
			create: null
		},
		_createWidget: function(t, i) {
			i = e(i || this.defaultElement || this)[0], this.element = e(i), this.uuid = l++, this.eventNamespace = "." + this.widgetName + this.uuid, this.options = e.widget.extend({}, this.options, this._getCreateOptions(), t), this.bindings = e(), this.hoverable = e(), this.focusable = e(), i !== this && (e.data(i, this.widgetFullName, this), this._on(!0, this.element, {
				remove: function(e) {
					e.target === i && this.destroy()
				}
			}), this.document = e(i.style ? i.ownerDocument : i.document || i), this.window = e(this.document[0].defaultView || this.document[0].parentWindow)), this._create(), this._trigger("create", null, this._getCreateEventData()), this._init()
		},
		_getCreateOptions: e.noop,
		_getCreateEventData: e.noop,
		_create: e.noop,
		_init: e.noop,
		destroy: function() {
			this._destroy(), this.element.unbind(this.eventNamespace).removeData(this.widgetFullName).removeData(e.camelCase(this.widgetFullName)), this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName + "-disabled ui-state-disabled"), this.bindings.unbind(this.eventNamespace), this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus")
		},
		_destroy: e.noop,
		widget: function() {
			return this.element
		},
		option: function(t, i) {
			var n, a, o, s = t;
			if (0 === arguments.length) return e.widget.extend({}, this.options);
			if ("string" == typeof t) if (s = {}, n = t.split("."), t = n.shift(), n.length) {
				for (a = s[t] = e.widget.extend({}, this.options[t]), o = 0; n.length - 1 > o; o++) a[n[o]] = a[n[o]] || {}, a = a[n[o]];
				if (t = n.pop(), 1 === arguments.length) return void 0 === a[t] ? null : a[t];
				a[t] = i
			} else {
				if (1 === arguments.length) return void 0 === this.options[t] ? null : this.options[t];
				s[t] = i
			}
			return this._setOptions(s), this
		},
		_setOptions: function(e) {
			var t;
			for (t in e) this._setOption(t, e[t]);
			return this
		},
		_setOption: function(e, t) {
			return this.options[e] = t, "disabled" === e && (this.widget().toggleClass(this.widgetFullName + "-disabled", !! t), t && (this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus"))), this
		},
		enable: function() {
			return this._setOptions({
				disabled: !1
			})
		},
		disable: function() {
			return this._setOptions({
				disabled: !0
			})
		},
		_on: function(t, i, n) {
			var a, o = this;
			"boolean" != typeof t && (n = i, i = t, t = !1), n ? (i = a = e(i), this.bindings = this.bindings.add(i)) : (n = i, i = this.element, a = this.widget()), e.each(n, function(n, s) {
				function r() {
					return t || !0 !== o.options.disabled && !e(this).hasClass("ui-state-disabled") ? ("string" == typeof s ? o[s] : s).apply(o, arguments) : void 0
				}
				"string" != typeof s && (r.guid = s.guid = s.guid || r.guid || e.guid++);
				var l = n.match(/^([\w:-]*)\s*(.*)$/),
					c = l[1] + o.eventNamespace,
					u = l[2];
				u ? a.delegate(u, c, r) : i.bind(c, r)
			})
		},
		_off: function(e, t) {
			t = (t || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace, e.unbind(t).undelegate(t)
		},
		_delay: function(e, t) {
			var i = this;
			return setTimeout(function() {
				return ("string" == typeof e ? i[e] : e).apply(i, arguments)
			}, t || 0)
		},
		_hoverable: function(t) {
			this.hoverable = this.hoverable.add(t), this._on(t, {
				mouseenter: function(t) {
					e(t.currentTarget).addClass("ui-state-hover")
				},
				mouseleave: function(t) {
					e(t.currentTarget).removeClass("ui-state-hover")
				}
			})
		},
		_focusable: function(t) {
			this.focusable = this.focusable.add(t), this._on(t, {
				focusin: function(t) {
					e(t.currentTarget).addClass("ui-state-focus")
				},
				focusout: function(t) {
					e(t.currentTarget).removeClass("ui-state-focus")
				}
			})
		},
		_trigger: function(t, i, n) {
			var a, o, s = this.options[t];
			if (n = n || {}, i = e.Event(i), i.type = (t === this.widgetEventPrefix ? t : this.widgetEventPrefix + t).toLowerCase(), i.target = this.element[0], o = i.originalEvent) for (a in o) a in i || (i[a] = o[a]);
			return this.element.trigger(i, n), !(e.isFunction(s) && !1 === s.apply(this.element[0], [i].concat(n)) || i.isDefaultPrevented())
		}
	}, e.each({
		show: "fadeIn",
		hide: "fadeOut"
	}, function(t, i) {
		e.Widget.prototype["_" + t] = function(n, a, o) {
			"string" == typeof a && (a = {
				effect: a
			});
			var s, r = a ? !0 === a || "number" == typeof a ? i : a.effect || i : t;
			"number" == typeof(a = a || {}) && (a = {
				duration: a
			}), s = !e.isEmptyObject(a), a.complete = o, a.delay && n.delay(a.delay), s && e.effects && e.effects.effect[r] ? n[t](a) : r !== t && n[r] ? n[r](a.duration, a.easing, o) : n.queue(function(i) {
				e(this)[t](), o && o.call(n[0]), i()
			})
		}
	}), e.widget, function() {
		function t(e, t, i) {
			return [parseFloat(e[0]) * (p.test(e[0]) ? t / 100 : 1), parseFloat(e[1]) * (p.test(e[1]) ? i / 100 : 1)]
		}

		function i(t, i) {
			return parseInt(e.css(t, i), 10) || 0
		}

		function n(t) {
			var i = t[0];
			return 9 === i.nodeType ? {
				width: t.width(),
				height: t.height(),
				offset: {
					top: 0,
					left: 0
				}
			} : e.isWindow(i) ? {
				width: t.width(),
				height: t.height(),
				offset: {
					top: t.scrollTop(),
					left: t.scrollLeft()
				}
			} : i.preventDefault ? {
				width: 0,
				height: 0,
				offset: {
					top: i.pageY,
					left: i.pageX
				}
			} : {
				width: t.outerWidth(),
				height: t.outerHeight(),
				offset: t.offset()
			}
		}
		e.ui = e.ui || {};
		var a, o, s = Math.max,
			r = Math.abs,
			l = Math.round,
			c = /left|center|right/,
			u = /top|center|bottom/,
			d = /[\+\-]\d+(\.[\d]+)?%?/,
			h = /^\w+/,
			p = /%$/,
			f = e.fn.position;
		e.position = {
			scrollbarWidth: function() {
				if (void 0 !== a) return a;
				var t, i, n = e("<div style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"),
					o = n.children()[0];
				return e("body").append(n), t = o.offsetWidth, n.css("overflow", "scroll"), i = o.offsetWidth, t === i && (i = n[0].clientWidth), n.remove(), a = t - i
			},
			getScrollInfo: function(t) {
				var i = t.isWindow || t.isDocument ? "" : t.element.css("overflow-x"),
					n = t.isWindow || t.isDocument ? "" : t.element.css("overflow-y"),
					a = "scroll" === i || "auto" === i && t.width < t.element[0].scrollWidth;
				return {
					width: "scroll" === n || "auto" === n && t.height < t.element[0].scrollHeight ? e.position.scrollbarWidth() : 0,
					height: a ? e.position.scrollbarWidth() : 0
				}
			},
			getWithinInfo: function(t) {
				var i = e(t || window),
					n = e.isWindow(i[0]),
					a = !! i[0] && 9 === i[0].nodeType;
				return {
					element: i,
					isWindow: n,
					isDocument: a,
					offset: i.offset() || {
						left: 0,
						top: 0
					},
					scrollLeft: i.scrollLeft(),
					scrollTop: i.scrollTop(),
					width: n || a ? i.width() : i.outerWidth(),
					height: n || a ? i.height() : i.outerHeight()
				}
			}
		}, e.fn.position = function(a) {
			if (!a || !a.of) return f.apply(this, arguments);
			a = e.extend({}, a);
			var p, g, m, v, y, b, w = e(a.of),
				_ = e.position.getWithinInfo(a.within),
				k = e.position.getScrollInfo(_),
				C = (a.collision || "flip").split(" "),
				x = {};
			return b = n(w), w[0].preventDefault && (a.at = "left top"), g = b.width, m = b.height, v = b.offset, y = e.extend({}, v), e.each(["my", "at"], function() {
				var e, t, i = (a[this] || "").split(" ");
				1 === i.length && (i = c.test(i[0]) ? i.concat(["center"]) : u.test(i[0]) ? ["center"].concat(i) : ["center", "center"]), i[0] = c.test(i[0]) ? i[0] : "center", i[1] = u.test(i[1]) ? i[1] : "center", e = d.exec(i[0]), t = d.exec(i[1]), x[this] = [e ? e[0] : 0, t ? t[0] : 0], a[this] = [h.exec(i[0])[0], h.exec(i[1])[0]]
			}), 1 === C.length && (C[1] = C[0]), "right" === a.at[0] ? y.left += g : "center" === a.at[0] && (y.left += g / 2), "bottom" === a.at[1] ? y.top += m : "center" === a.at[1] && (y.top += m / 2), p = t(x.at, g, m), y.left += p[0], y.top += p[1], this.each(function() {
				var n, c, u = e(this),
					d = u.outerWidth(),
					h = u.outerHeight(),
					f = i(this, "marginLeft"),
					b = i(this, "marginTop"),
					E = d + f + i(this, "marginRight") + k.width,
					D = h + b + i(this, "marginBottom") + k.height,
					$ = e.extend({}, y),
					A = t(x.my, u.outerWidth(), u.outerHeight());
				"right" === a.my[0] ? $.left -= d : "center" === a.my[0] && ($.left -= d / 2), "bottom" === a.my[1] ? $.top -= h : "center" === a.my[1] && ($.top -= h / 2), $.left += A[0], $.top += A[1], o || ($.left = l($.left), $.top = l($.top)), n = {
					marginLeft: f,
					marginTop: b
				}, e.each(["left", "top"], function(t, i) {
					e.ui.position[C[t]] && e.ui.position[C[t]][i]($, {
						targetWidth: g,
						targetHeight: m,
						elemWidth: d,
						elemHeight: h,
						collisionPosition: n,
						collisionWidth: E,
						collisionHeight: D,
						offset: [p[0] + A[0], p[1] + A[1]],
						my: a.my,
						at: a.at,
						within: _,
						elem: u
					})
				}), a.using && (c = function(e) {
					var t = v.left - $.left,
						i = t + g - d,
						n = v.top - $.top,
						o = n + m - h,
						l = {
							target: {
								element: w,
								left: v.left,
								top: v.top,
								width: g,
								height: m
							},
							element: {
								element: u,
								left: $.left,
								top: $.top,
								width: d,
								height: h
							},
							horizontal: 0 > i ? "left" : t > 0 ? "right" : "center",
							vertical: 0 > o ? "top" : n > 0 ? "bottom" : "middle"
						};
					d > g && g > r(t + i) && (l.horizontal = "center"), h > m && m > r(n + o) && (l.vertical = "middle"), l.important = s(r(t), r(i)) > s(r(n), r(o)) ? "horizontal" : "vertical", a.using.call(this, e, l)
				}), u.offset(e.extend($, {
					using: c
				}))
			})
		}, e.ui.position = {
			fit: {
				left: function(e, t) {
					var i, n = t.within,
						a = n.isWindow ? n.scrollLeft : n.offset.left,
						o = n.width,
						r = e.left - t.collisionPosition.marginLeft,
						l = a - r,
						c = r + t.collisionWidth - o - a;
					t.collisionWidth > o ? l > 0 && 0 >= c ? (i = e.left + l + t.collisionWidth - o - a, e.left += l - i) : e.left = c > 0 && 0 >= l ? a : l > c ? a + o - t.collisionWidth : a : l > 0 ? e.left += l : c > 0 ? e.left -= c : e.left = s(e.left - r, e.left)
				},
				top: function(e, t) {
					var i, n = t.within,
						a = n.isWindow ? n.scrollTop : n.offset.top,
						o = t.within.height,
						r = e.top - t.collisionPosition.marginTop,
						l = a - r,
						c = r + t.collisionHeight - o - a;
					t.collisionHeight > o ? l > 0 && 0 >= c ? (i = e.top + l + t.collisionHeight - o - a, e.top += l - i) : e.top = c > 0 && 0 >= l ? a : l > c ? a + o - t.collisionHeight : a : l > 0 ? e.top += l : c > 0 ? e.top -= c : e.top = s(e.top - r, e.top)
				}
			},
			flip: {
				left: function(e, t) {
					var i, n, a = t.within,
						o = a.offset.left + a.scrollLeft,
						s = a.width,
						l = a.isWindow ? a.scrollLeft : a.offset.left,
						c = e.left - t.collisionPosition.marginLeft,
						u = c - l,
						d = c + t.collisionWidth - s - l,
						h = "left" === t.my[0] ? -t.elemWidth : "right" === t.my[0] ? t.elemWidth : 0,
						p = "left" === t.at[0] ? t.targetWidth : "right" === t.at[0] ? -t.targetWidth : 0,
						f = -2 * t.offset[0];
					0 > u ? (0 > (i = e.left + h + p + f + t.collisionWidth - s - o) || r(u) > i) && (e.left += h + p + f) : d > 0 && ((n = e.left - t.collisionPosition.marginLeft + h + p + f - l) > 0 || d > r(n)) && (e.left += h + p + f)
				},
				top: function(e, t) {
					var i, n, a = t.within,
						o = a.offset.top + a.scrollTop,
						s = a.height,
						l = a.isWindow ? a.scrollTop : a.offset.top,
						c = e.top - t.collisionPosition.marginTop,
						u = c - l,
						d = c + t.collisionHeight - s - l,
						h = "top" === t.my[1] ? -t.elemHeight : "bottom" === t.my[1] ? t.elemHeight : 0,
						p = "top" === t.at[1] ? t.targetHeight : "bottom" === t.at[1] ? -t.targetHeight : 0,
						f = -2 * t.offset[1];
					0 > u ? (n = e.top + h + p + f + t.collisionHeight - s - o, e.top + h + p + f > u && (0 > n || r(u) > n) && (e.top += h + p + f)) : d > 0 && (i = e.top - t.collisionPosition.marginTop + h + p + f - l, e.top + h + p + f > d && (i > 0 || d > r(i)) && (e.top += h + p + f))
				}
			},
			flipfit: {
				left: function() {
					e.ui.position.flip.left.apply(this, arguments), e.ui.position.fit.left.apply(this, arguments)
				},
				top: function() {
					e.ui.position.flip.top.apply(this, arguments), e.ui.position.fit.top.apply(this, arguments)
				}
			}
		}, function() {
			var t, i, n, a, s, r = document.getElementsByTagName("body")[0],
				l = document.createElement("div");
			t = document.createElement(r ? "div" : "body"), n = {
				visibility: "hidden",
				width: 0,
				height: 0,
				border: 0,
				margin: 0,
				background: "none"
			}, r && e.extend(n, {
				position: "absolute",
				left: "-1000px",
				top: "-1000px"
			});
			for (s in n) t.style[s] = n[s];
			t.appendChild(l), (i = r || document.documentElement).insertBefore(t, i.firstChild), l.style.cssText = "position: absolute; left: 10.7432222px;", a = e(l).offset().left, o = a > 10 && 11 > a, t.innerHTML = "", i.removeChild(t)
		}()
	}(), e.ui.position, e.widget("ui.menu", {
		version: "1.11.1",
		defaultElement: "<ul>",
		delay: 300,
		options: {
			icons: {
				submenu: "ui-icon-carat-1-e"
			},
			items: "> *",
			menus: "ul",
			position: {
				my: "left-1 top",
				at: "right top"
			},
			role: "menu",
			blur: null,
			focus: null,
			select: null
		},
		_create: function() {
			this.activeMenu = this.element, this.mouseHandled = !1, this.element.uniqueId().addClass("ui-menu ui-widget ui-widget-content").toggleClass("ui-menu-icons", !! this.element.find(".ui-icon").length).attr({
				role: this.options.role,
				tabIndex: 0
			}), this.options.disabled && this.element.addClass("ui-state-disabled").attr("aria-disabled", "true"), this._on({
				"mousedown .ui-menu-item": function(e) {
					e.preventDefault()
				},
				"click .ui-menu-item": function(t) {
					var i = e(t.target);
					!this.mouseHandled && i.not(".ui-state-disabled").length && (this.select(t), t.isPropagationStopped() || (this.mouseHandled = !0), i.has(".ui-menu").length ? this.expand(t) : !this.element.is(":focus") && e(this.document[0].activeElement).closest(".ui-menu").length && (this.element.trigger("focus", [!0]), this.active && 1 === this.active.parents(".ui-menu").length && clearTimeout(this.timer)))
				},
				"mouseenter .ui-menu-item": function(t) {
					var i = e(t.currentTarget);
					i.siblings(".ui-state-active").removeClass("ui-state-active"), this.focus(t, i)
				},
				mouseleave: "collapseAll",
				"mouseleave .ui-menu": "collapseAll",
				focus: function(e, t) {
					var i = this.active || this.element.find(this.options.items).eq(0);
					t || this.focus(e, i)
				},
				blur: function(t) {
					this._delay(function() {
						e.contains(this.element[0], this.document[0].activeElement) || this.collapseAll(t)
					})
				},
				keydown: "_keydown"
			}), this.refresh(), this._on(this.document, {
				click: function(e) {
					this._closeOnDocumentClick(e) && this.collapseAll(e), this.mouseHandled = !1
				}
			})
		},
		_destroy: function() {
			this.element.removeAttr("aria-activedescendant").find(".ui-menu").addBack().removeClass("ui-menu ui-widget ui-widget-content ui-menu-icons ui-front").removeAttr("role").removeAttr("tabIndex").removeAttr("aria-labelledby").removeAttr("aria-expanded").removeAttr("aria-hidden").removeAttr("aria-disabled").removeUniqueId().show(), this.element.find(".ui-menu-item").removeClass("ui-menu-item").removeAttr("role").removeAttr("aria-disabled").removeUniqueId().removeClass("ui-state-hover").removeAttr("tabIndex").removeAttr("role").removeAttr("aria-haspopup").children().each(function() {
				var t = e(this);
				t.data("ui-menu-submenu-carat") && t.remove()
			}), this.element.find(".ui-menu-divider").removeClass("ui-menu-divider ui-widget-content")
		},
		_keydown: function(t) {
			function i(e) {
				return e.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&")
			}
			var n, a, o, s, r, l = !0;
			switch (t.keyCode) {
			case e.ui.keyCode.PAGE_UP:
				this.previousPage(t);
				break;
			case e.ui.keyCode.PAGE_DOWN:
				this.nextPage(t);
				break;
			case e.ui.keyCode.HOME:
				this._move("first", "first", t);
				break;
			case e.ui.keyCode.END:
				this._move("last", "last", t);
				break;
			case e.ui.keyCode.UP:
				this.previous(t);
				break;
			case e.ui.keyCode.DOWN:
				this.next(t);
				break;
			case e.ui.keyCode.LEFT:
				this.collapse(t);
				break;
			case e.ui.keyCode.RIGHT:
				this.active && !this.active.is(".ui-state-disabled") && this.expand(t);
				break;
			case e.ui.keyCode.ENTER:
			case e.ui.keyCode.SPACE:
				this._activate(t);
				break;
			case e.ui.keyCode.ESCAPE:
				this.collapse(t);
				break;
			default:
				l = !1, a = this.previousFilter || "", o = String.fromCharCode(t.keyCode), s = !1, clearTimeout(this.filterTimer), o === a ? s = !0 : o = a + o, r = RegExp("^" + i(o), "i"), n = this.activeMenu.find(this.options.items).filter(function() {
					return r.test(e(this).text())
				}), (n = s && -1 !== n.index(this.active.next()) ? this.active.nextAll(".ui-menu-item") : n).length || (o = String.fromCharCode(t.keyCode), r = RegExp("^" + i(o), "i"), n = this.activeMenu.find(this.options.items).filter(function() {
					return r.test(e(this).text())
				})), n.length ? (this.focus(t, n), n.length > 1 ? (this.previousFilter = o, this.filterTimer = this._delay(function() {
					delete this.previousFilter
				}, 1e3)) : delete this.previousFilter) : delete this.previousFilter
			}
			l && t.preventDefault()
		},
		_activate: function(e) {
			this.active.is(".ui-state-disabled") || (this.active.is("[aria-haspopup='true']") ? this.expand(e) : this.select(e))
		},
		refresh: function() {
			var t, i = this,
				n = this.options.icons.submenu,
				a = this.element.find(this.options.menus);
			this.element.toggleClass("ui-menu-icons", !! this.element.find(".ui-icon").length), a.filter(":not(.ui-menu)").addClass("ui-menu ui-widget ui-widget-content ui-front").hide().attr({
				role: this.options.role,
				"aria-hidden": "true",
				"aria-expanded": "false"
			}).each(function() {
				var t = e(this),
					i = t.parent(),
					a = e("<span>").addClass("ui-menu-icon ui-icon " + n).data("ui-menu-submenu-carat", !0);
				i.attr("aria-haspopup", "true").prepend(a), t.attr("aria-labelledby", i.attr("id"))
			}), (t = a.add(this.element).find(this.options.items)).not(".ui-menu-item").each(function() {
				var t = e(this);
				i._isDivider(t) && t.addClass("ui-widget-content ui-menu-divider")
			}), t.not(".ui-menu-item, .ui-menu-divider").addClass("ui-menu-item").uniqueId().attr({
				tabIndex: -1,
				role: this._itemRole()
			}), t.filter(".ui-state-disabled").attr("aria-disabled", "true"), this.active && !e.contains(this.element[0], this.active[0]) && this.blur()
		},
		_itemRole: function() {
			return {
				menu: "menuitem",
				listbox: "option"
			}[this.options.role]
		},
		_setOption: function(e, t) {
			"icons" === e && this.element.find(".ui-menu-icon").removeClass(this.options.icons.submenu).addClass(t.submenu), "disabled" === e && this.element.toggleClass("ui-state-disabled", !! t).attr("aria-disabled", t), this._super(e, t)
		},
		focus: function(e, t) {
			var i, n;
			this.blur(e, e && "focus" === e.type), this._scrollIntoView(t), this.active = t.first(), n = this.active.addClass("ui-state-focus").removeClass("ui-state-active"), this.options.role && this.element.attr("aria-activedescendant", n.attr("id")), this.active.parent().closest(".ui-menu-item").addClass("ui-state-active"), e && "keydown" === e.type ? this._close() : this.timer = this._delay(function() {
				this._close()
			}, this.delay), (i = t.children(".ui-menu")).length && e && /^mouse/.test(e.type) && this._startOpening(i), this.activeMenu = t.parent(), this._trigger("focus", e, {
				item: t
			})
		},
		_scrollIntoView: function(t) {
			var i, n, a, o, s, r;
			this._hasScroll() && (i = parseFloat(e.css(this.activeMenu[0], "borderTopWidth")) || 0, n = parseFloat(e.css(this.activeMenu[0], "paddingTop")) || 0, a = t.offset().top - this.activeMenu.offset().top - i - n, o = this.activeMenu.scrollTop(), s = this.activeMenu.height(), r = t.outerHeight(), 0 > a ? this.activeMenu.scrollTop(o + a) : a + r > s && this.activeMenu.scrollTop(o + a - s + r))
		},
		blur: function(e, t) {
			t || clearTimeout(this.timer), this.active && (this.active.removeClass("ui-state-focus"), this.active = null, this._trigger("blur", e, {
				item: this.active
			}))
		},
		_startOpening: function(e) {
			clearTimeout(this.timer), "true" === e.attr("aria-hidden") && (this.timer = this._delay(function() {
				this._close(), this._open(e)
			}, this.delay))
		},
		_open: function(t) {
			var i = e.extend({
				of: this.active
			}, this.options.position);
			clearTimeout(this.timer), this.element.find(".ui-menu").not(t.parents(".ui-menu")).hide().attr("aria-hidden", "true"), t.show().removeAttr("aria-hidden").attr("aria-expanded", "true").position(i)
		},
		collapseAll: function(t, i) {
			clearTimeout(this.timer), this.timer = this._delay(function() {
				var n = i ? this.element : e(t && t.target).closest(this.element.find(".ui-menu"));
				n.length || (n = this.element), this._close(n), this.blur(t), this.activeMenu = n
			}, this.delay)
		},
		_close: function(e) {
			e || (e = this.active ? this.active.parent() : this.element), e.find(".ui-menu").hide().attr("aria-hidden", "true").attr("aria-expanded", "false").end().find(".ui-state-active").not(".ui-state-focus").removeClass("ui-state-active")
		},
		_closeOnDocumentClick: function(t) {
			return !e(t.target).closest(".ui-menu").length
		},
		_isDivider: function(e) {
			return !/[^\-—–\s]/.test(e.text())
		},
		collapse: function(e) {
			var t = this.active && this.active.parent().closest(".ui-menu-item", this.element);
			t && t.length && (this._close(), this.focus(e, t))
		},
		expand: function(e) {
			var t = this.active && this.active.children(".ui-menu ").find(this.options.items).first();
			t && t.length && (this._open(t.parent()), this._delay(function() {
				this.focus(e, t)
			}))
		},
		next: function(e) {
			this._move("next", "first", e)
		},
		previous: function(e) {
			this._move("prev", "last", e)
		},
		isFirstItem: function() {
			return this.active && !this.active.prevAll(".ui-menu-item").length
		},
		isLastItem: function() {
			return this.active && !this.active.nextAll(".ui-menu-item").length
		},
		_move: function(e, t, i) {
			var n;
			this.active && (n = "first" === e || "last" === e ? this.active["first" === e ? "prevAll" : "nextAll"](".ui-menu-item").eq(-1) : this.active[e + "All"](".ui-menu-item").eq(0)), n && n.length && this.active || (n = this.activeMenu.find(this.options.items)[t]()), this.focus(i, n)
		},
		nextPage: function(t) {
			var i, n, a;
			return this.active ? void(this.isLastItem() || (this._hasScroll() ? (n = this.active.offset().top, a = this.element.height(), this.active.nextAll(".ui-menu-item").each(function() {
				return 0 > (i = e(this)).offset().top - n - a
			}), this.focus(t, i)) : this.focus(t, this.activeMenu.find(this.options.items)[this.active ? "last" : "first"]()))) : void this.next(t)
		},
		previousPage: function(t) {
			var i, n, a;
			return this.active ? void(this.isFirstItem() || (this._hasScroll() ? (n = this.active.offset().top, a = this.element.height(), this.active.prevAll(".ui-menu-item").each(function() {
				return (i = e(this)).offset().top - n + a > 0
			}), this.focus(t, i)) : this.focus(t, this.activeMenu.find(this.options.items).first()))) : void this.next(t)
		},
		_hasScroll: function() {
			return this.element.outerHeight() < this.element.prop("scrollHeight")
		},
		select: function(t) {
			this.active = this.active || e(t.target).closest(".ui-menu-item");
			var i = {
				item: this.active
			};
			this.active.has(".ui-menu").length || this.collapseAll(t, !0), this._trigger("select", t, i)
		}
	}), e.widget("ui.autocomplete", {
		version: "1.11.1",
		defaultElement: "<input>",
		options: {
			appendTo: null,
			autoFocus: !1,
			delay: 300,
			minLength: 1,
			position: {
				my: "left top",
				at: "left bottom",
				collision: "none"
			},
			source: null,
			change: null,
			close: null,
			focus: null,
			open: null,
			response: null,
			search: null,
			select: null
		},
		requestIndex: 0,
		pending: 0,
		_create: function() {
			var t, i, n, a = this.element[0].nodeName.toLowerCase(),
				o = "textarea" === a,
				s = "input" === a;
			this.isMultiLine = !! o || !s && this.element.prop("isContentEditable"), this.valueMethod = this.element[o || s ? "val" : "text"], this.isNewMenu = !0, this.element.addClass("ui-autocomplete-input").attr("autocomplete", "off"), this._on(this.element, {
				keydown: function(a) {
					if (this.element.prop("readOnly")) return t = !0, n = !0, void(i = !0);
					t = !1, n = !1, i = !1;
					var o = e.ui.keyCode;
					switch (a.keyCode) {
					case o.PAGE_UP:
						t = !0, this._move("previousPage", a);
						break;
					case o.PAGE_DOWN:
						t = !0, this._move("nextPage", a);
						break;
					case o.UP:
						t = !0, this._keyEvent("previous", a);
						break;
					case o.DOWN:
						t = !0, this._keyEvent("next", a);
						break;
					case o.ENTER:
						this.menu.active && (t = !0, a.preventDefault(), this.menu.select(a));
						break;
					case o.TAB:
						this.menu.active && this.menu.select(a);
						break;
					case o.ESCAPE:
						this.menu.element.is(":visible") && (this.isMultiLine || this._value(this.term), this.close(a), a.preventDefault());
						break;
					default:
						i = !0, this._searchTimeout(a)
					}
				},
				keypress: function(n) {
					if (t) return t = !1, void((!this.isMultiLine || this.menu.element.is(":visible")) && n.preventDefault());
					if (!i) {
						var a = e.ui.keyCode;
						switch (n.keyCode) {
						case a.PAGE_UP:
							this._move("previousPage", n);
							break;
						case a.PAGE_DOWN:
							this._move("nextPage", n);
							break;
						case a.UP:
							this._keyEvent("previous", n);
							break;
						case a.DOWN:
							this._keyEvent("next", n)
						}
					}
				},
				input: function(e) {
					return n ? (n = !1, void e.preventDefault()) : void this._searchTimeout(e)
				},
				focus: function() {
					this.selectedItem = null, this.previous = this._value()
				},
				blur: function(e) {
					return this.cancelBlur ? void delete this.cancelBlur : (clearTimeout(this.searching), this.close(e), void this._change(e))
				}
			}), this._initSource(), this.menu = e("<ul>").addClass("ui-autocomplete ui-front").appendTo(this._appendTo()).menu({
				role: null
			}).hide().menu("instance"), this._on(this.menu.element, {
				mousedown: function(t) {
					t.preventDefault(), this.cancelBlur = !0, this._delay(function() {
						delete this.cancelBlur
					});
					var i = this.menu.element[0];
					e(t.target).closest(".ui-menu-item").length || this._delay(function() {
						var t = this;
						this.document.one("mousedown", function(n) {
							n.target === t.element[0] || n.target === i || e.contains(i, n.target) || t.close()
						})
					})
				},
				menufocus: function(t, i) {
					var n, a;
					return this.isNewMenu && (this.isNewMenu = !1, t.originalEvent && /^mouse/.test(t.originalEvent.type)) ? (this.menu.blur(), void this.document.one("mousemove", function() {
						e(t.target).trigger(t.originalEvent)
					})) : (a = i.item.data("ui-autocomplete-item"), !1 !== this._trigger("focus", t, {
						item: a
					}) && t.originalEvent && /^key/.test(t.originalEvent.type) && this._value(a.value), void((n = i.item.attr("aria-label") || a.value) && e.trim(n).length && (this.liveRegion.children().hide(), e("<div>").text(n).appendTo(this.liveRegion))))
				},
				menuselect: function(e, t) {
					var i = t.item.data("ui-autocomplete-item"),
						n = this.previous;
					this.element[0] !== this.document[0].activeElement && (this.element.focus(), this.previous = n, this._delay(function() {
						this.previous = n, this.selectedItem = i
					})), !1 !== this._trigger("select", e, {
						item: i
					}) && this._value(i.value), this.term = this._value(), this.close(e), this.selectedItem = i
				}
			}), this.liveRegion = e("<span>", {
				role: "status",
				"aria-live": "assertive",
				"aria-relevant": "additions"
			}).addClass("ui-helper-hidden-accessible").appendTo(this.document[0].body), this._on(this.window, {
				beforeunload: function() {
					this.element.removeAttr("autocomplete")
				}
			})
		},
		_destroy: function() {
			clearTimeout(this.searching), this.element.removeClass("ui-autocomplete-input").removeAttr("autocomplete"), this.menu.element.remove(), this.liveRegion.remove()
		},
		_setOption: function(e, t) {
			this._super(e, t), "source" === e && this._initSource(), "appendTo" === e && this.menu.element.appendTo(this._appendTo()), "disabled" === e && t && this.xhr && this.xhr.abort()
		},
		_appendTo: function() {
			var t = this.options.appendTo;
			return t && (t = t.jquery || t.nodeType ? e(t) : this.document.find(t).eq(0)), t && t[0] || (t = this.element.closest(".ui-front")), t.length || (t = this.document[0].body), t
		},
		_initSource: function() {
			var t, i, n = this;
			e.isArray(this.options.source) ? (t = this.options.source, this.source = function(i, n) {
				n(e.ui.autocomplete.filter(t, i.term))
			}) : "string" == typeof this.options.source ? (i = this.options.source, this.source = function(t, a) {
				n.xhr && n.xhr.abort(), n.xhr = e.ajax({
					url: i,
					data: t,
					dataType: "json",
					success: function(e) {
						a(e)
					},
					error: function() {
						a([])
					}
				})
			}) : this.source = this.options.source
		},
		_searchTimeout: function(e) {
			clearTimeout(this.searching), this.searching = this._delay(function() {
				var t = this.term === this._value(),
					i = this.menu.element.is(":visible"),
					n = e.altKey || e.ctrlKey || e.metaKey || e.shiftKey;
				(!t || t && !i && !n) && (this.selectedItem = null, this.search(null, e))
			}, this.options.delay)
		},
		search: function(e, t) {
			return e = null != e ? e : this._value(), this.term = this._value(), e.length < this.options.minLength ? this.close(t) : !1 !== this._trigger("search", t) ? this._search(e) : void 0
		},
		_search: function(e) {
			this.pending++, this.element.addClass("ui-autocomplete-loading"), this.cancelSearch = !1, this.source({
				term: e
			}, this._response())
		},
		_response: function() {
			var t = ++this.requestIndex;
			return e.proxy(function(e) {
				t === this.requestIndex && this.__response(e), this.pending--, this.pending || this.element.removeClass("ui-autocomplete-loading")
			}, this)
		},
		__response: function(e) {
			e && (e = this._normalize(e)), this._trigger("response", null, {
				content: e
			}), !this.options.disabled && e && e.length && !this.cancelSearch ? (this._suggest(e), this._trigger("open")) : this._close()
		},
		close: function(e) {
			this.cancelSearch = !0, this._close(e)
		},
		_close: function(e) {
			this.menu.element.is(":visible") && (this.menu.element.hide(), this.menu.blur(), this.isNewMenu = !0, this._trigger("close", e))
		},
		_change: function(e) {
			this.previous !== this._value() && this._trigger("change", e, {
				item: this.selectedItem
			})
		},
		_normalize: function(t) {
			return t.length && t[0].label && t[0].value ? t : e.map(t, function(t) {
				return "string" == typeof t ? {
					label: t,
					value: t
				} : e.extend({}, t, {
					label: t.label || t.value,
					value: t.value || t.label
				})
			})
		},
		_suggest: function(t) {
			var i = this.menu.element.empty();
			this._renderMenu(i, t), this.isNewMenu = !0, this.menu.refresh(), i.show(), this._resizeMenu(), i.position(e.extend({
				of: this.element
			}, this.options.position)), this.options.autoFocus && this.menu.next()
		},
		_resizeMenu: function() {
			var e = this.menu.element;
			e.outerWidth(Math.max(e.width("").outerWidth() + 1, this.element.outerWidth()))
		},
		_renderMenu: function(t, i) {
			var n = this;
			e.each(i, function(e, i) {
				n._renderItemData(t, i)
			})
		},
		_renderItemData: function(e, t) {
			return this._renderItem(e, t).data("ui-autocomplete-item", t)
		},
		_renderItem: function(t, i) {
			return e("<li>").text(i.label).appendTo(t)
		},
		_move: function(e, t) {
			return this.menu.element.is(":visible") ? this.menu.isFirstItem() && /^previous/.test(e) || this.menu.isLastItem() && /^next/.test(e) ? (this.isMultiLine || this._value(this.term), void this.menu.blur()) : void this.menu[e](t) : void this.search(null, t)
		},
		widget: function() {
			return this.menu.element
		},
		_value: function() {
			return this.valueMethod.apply(this.element, arguments)
		},
		_keyEvent: function(e, t) {
			(!this.isMultiLine || this.menu.element.is(":visible")) && (this._move(e, t), t.preventDefault())
		}
	}), e.extend(e.ui.autocomplete, {
		escapeRegex: function(e) {
			return e.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&")
		},
		filter: function(t, i) {
			var n = RegExp(e.ui.autocomplete.escapeRegex(i), "i");
			return e.grep(t, function(e) {
				return n.test(e.label || e.value || e)
			})
		}
	}), e.widget("ui.autocomplete", e.ui.autocomplete, {
		options: {
			messages: {
				noResults: "No search results.",
				results: function(e) {
					return e + (e > 1 ? " results are" : " result is") + " available, use up and down arrow keys to navigate."
				}
			}
		},
		__response: function(t) {
			var i;
			this._superApply(arguments), this.options.disabled || this.cancelSearch || (i = t && t.length ? this.options.messages.results(t.length) : this.options.messages.noResults, this.liveRegion.children().hide(), e("<div>").text(i).appendTo(this.liveRegion))
		}
	}), e.ui.autocomplete;
	var u, d = "ui-button ui-widget ui-state-default ui-corner-all",
		h = "ui-button-icons-only ui-button-icon-only ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary ui-button-text-only",
		p = function() {
			var t = e(this);
			setTimeout(function() {
				t.find(":ui-button").button("refresh")
			}, 1)
		},
		f = function(t) {
			var i = t.name,
				n = t.form,
				a = e([]);
			return i && (i = i.replace(/'/g, "\\'"), a = n ? e(n).find("[name='" + i + "'][type=radio]") : e("[name='" + i + "'][type=radio]", t.ownerDocument).filter(function() {
				return !this.form
			})), a
		};
	e.widget("ui.button", {
		version: "1.11.1",
		defaultElement: "<button>",
		options: {
			disabled: null,
			text: !0,
			label: null,
			icons: {
				primary: null,
				secondary: null
			}
		},
		_create: function() {
			this.element.closest("form").unbind("reset" + this.eventNamespace).bind("reset" + this.eventNamespace, p), "boolean" != typeof this.options.disabled ? this.options.disabled = !! this.element.prop("disabled") : this.element.prop("disabled", this.options.disabled), this._determineButtonType(), this.hasTitle = !! this.buttonElement.attr("title");
			var t = this,
				i = this.options,
				n = "checkbox" === this.type || "radio" === this.type,
				a = n ? "" : "ui-state-active";
			null === i.label && (i.label = "input" === this.type ? this.buttonElement.val() : this.buttonElement.html()), this._hoverable(this.buttonElement), this.buttonElement.addClass(d).attr("role", "button").bind("mouseenter" + this.eventNamespace, function() {
				i.disabled || this === u && e(this).addClass("ui-state-active")
			}).bind("mouseleave" + this.eventNamespace, function() {
				i.disabled || e(this).removeClass(a)
			}).bind("click" + this.eventNamespace, function(e) {
				i.disabled && (e.preventDefault(), e.stopImmediatePropagation())
			}), this._on({
				focus: function() {
					this.buttonElement.addClass("ui-state-focus")
				},
				blur: function() {
					this.buttonElement.removeClass("ui-state-focus")
				}
			}), n && this.element.bind("change" + this.eventNamespace, function() {
				t.refresh()
			}), "checkbox" === this.type ? this.buttonElement.bind("click" + this.eventNamespace, function() {
				return !i.disabled && void 0
			}) : "radio" === this.type ? this.buttonElement.bind("click" + this.eventNamespace, function() {
				if (i.disabled) return !1;
				e(this).addClass("ui-state-active"), t.buttonElement.attr("aria-pressed", "true");
				var n = t.element[0];
				f(n).not(n).map(function() {
					return e(this).button("widget")[0]
				}).removeClass("ui-state-active").attr("aria-pressed", "false")
			}) : (this.buttonElement.bind("mousedown" + this.eventNamespace, function() {
				return !i.disabled && (e(this).addClass("ui-state-active"), u = this, void t.document.one("mouseup", function() {
					u = null
				}))
			}).bind("mouseup" + this.eventNamespace, function() {
				return !i.disabled && void e(this).removeClass("ui-state-active")
			}).bind("keydown" + this.eventNamespace, function(t) {
				return !i.disabled && void((t.keyCode === e.ui.keyCode.SPACE || t.keyCode === e.ui.keyCode.ENTER) && e(this).addClass("ui-state-active"))
			}).bind("keyup" + this.eventNamespace + " blur" + this.eventNamespace, function() {
				e(this).removeClass("ui-state-active")
			}), this.buttonElement.is("a") && this.buttonElement.keyup(function(t) {
				t.keyCode === e.ui.keyCode.SPACE && e(this).click()
			})), this._setOption("disabled", i.disabled), this._resetButton()
		},
		_determineButtonType: function() {
			var e, t, i;
			this.type = this.element.is("[type=checkbox]") ? "checkbox" : this.element.is("[type=radio]") ? "radio" : this.element.is("input") ? "input" : "button", "checkbox" === this.type || "radio" === this.type ? (e = this.element.parents().last(), t = "label[for='" + this.element.attr("id") + "']", this.buttonElement = e.find(t), this.buttonElement.length || (e = e.length ? e.siblings() : this.element.siblings(), this.buttonElement = e.filter(t), this.buttonElement.length || (this.buttonElement = e.find(t))), this.element.addClass("ui-helper-hidden-accessible"), (i = this.element.is(":checked")) && this.buttonElement.addClass("ui-state-active"), this.buttonElement.prop("aria-pressed", i)) : this.buttonElement = this.element
		},
		widget: function() {
			return this.buttonElement
		},
		_destroy: function() {
			this.element.removeClass("ui-helper-hidden-accessible"), this.buttonElement.removeClass(d + " ui-state-active " + h).removeAttr("role").removeAttr("aria-pressed").html(this.buttonElement.find(".ui-button-text").html()), this.hasTitle || this.buttonElement.removeAttr("title")
		},
		_setOption: function(e, t) {
			return this._super(e, t), "disabled" === e ? (this.widget().toggleClass("ui-state-disabled", !! t), this.element.prop("disabled", !! t), void(t && ("checkbox" === this.type || "radio" === this.type ? this.buttonElement.removeClass("ui-state-focus") : this.buttonElement.removeClass("ui-state-focus ui-state-active")))) : void this._resetButton()
		},
		refresh: function() {
			var t = this.element.is("input, button") ? this.element.is(":disabled") : this.element.hasClass("ui-button-disabled");
			t !== this.options.disabled && this._setOption("disabled", t), "radio" === this.type ? f(this.element[0]).each(function() {
				e(this).is(":checked") ? e(this).button("widget").addClass("ui-state-active").attr("aria-pressed", "true") : e(this).button("widget").removeClass("ui-state-active").attr("aria-pressed", "false")
			}) : "checkbox" === this.type && (this.element.is(":checked") ? this.buttonElement.addClass("ui-state-active").attr("aria-pressed", "true") : this.buttonElement.removeClass("ui-state-active").attr("aria-pressed", "false"))
		},
		_resetButton: function() {
			if ("input" !== this.type) {
				var t = this.buttonElement.removeClass(h),
					i = e("<span></span>", this.document[0]).addClass("ui-button-text").html(this.options.label).appendTo(t.empty()).text(),
					n = this.options.icons,
					a = n.primary && n.secondary,
					o = [];
				n.primary || n.secondary ? (this.options.text && o.push("ui-button-text-icon" + (a ? "s" : n.primary ? "-primary" : "-secondary")), n.primary && t.prepend("<span class='ui-button-icon-primary ui-icon " + n.primary + "'></span>"), n.secondary && t.append("<span class='ui-button-icon-secondary ui-icon " + n.secondary + "'></span>"), this.options.text || (o.push(a ? "ui-button-icons-only" : "ui-button-icon-only"), this.hasTitle || t.attr("title", e.trim(i)))) : o.push("ui-button-text-only"), t.addClass(o.join(" "))
			} else this.options.label && this.element.val(this.options.label)
		}
	}), e.widget("ui.buttonset", {
		version: "1.11.1",
		options: {
			items: "button, input[type=button], input[type=submit], input[type=reset], input[type=checkbox], input[type=radio], a, :data(ui-button)"
		},
		_create: function() {
			this.element.addClass("ui-buttonset")
		},
		_init: function() {
			this.refresh()
		},
		_setOption: function(e, t) {
			"disabled" === e && this.buttons.button("option", e, t), this._super(e, t)
		},
		refresh: function() {
			var t = "rtl" === this.element.css("direction"),
				i = this.element.find(this.options.items),
				n = i.filter(":ui-button");
			i.not(":ui-button").button(), n.button("refresh"), this.buttons = i.map(function() {
				return e(this).button("widget")[0]
			}).removeClass("ui-corner-all ui-corner-left ui-corner-right").filter(":first").addClass(t ? "ui-corner-right" : "ui-corner-left").end().filter(":last").addClass(t ? "ui-corner-left" : "ui-corner-right").end().end()
		},
		_destroy: function() {
			this.element.removeClass("ui-buttonset"), this.buttons.map(function() {
				return e(this).button("widget")[0]
			}).removeClass("ui-corner-left ui-corner-right").end().button("destroy")
		}
	}), e.ui.button, e.extend(e.ui, {
		datepicker: {
			version: "1.11.1"
		}
	});
	var g;
	e.extend(a.prototype, {
		markerClassName: "hasDatepicker",
		maxRows: 4,
		_widgetDatepicker: function() {
			return this.dpDiv
		},
		setDefaults: function(e) {
			return r(this._defaults, e || {}), this
		},
		_attachDatepicker: function(t, i) {
			var n, a, o;
			a = "div" === (n = t.nodeName.toLowerCase()) || "span" === n, t.id || (this.uuid += 1, t.id = "dp" + this.uuid), (o = this._newInst(e(t), a)).settings = e.extend({}, i || {}), "input" === n ? this._connectDatepicker(t, o) : a && this._inlineDatepicker(t, o)
		},
		_newInst: function(t, i) {
			return {
				id: t[0].id.replace(/([^A-Za-z0-9_\-])/g, "\\\\$1"),
				input: t,
				selectedDay: 0,
				selectedMonth: 0,
				selectedYear: 0,
				drawMonth: 0,
				drawYear: 0,
				inline: i,
				dpDiv: i ? o(e("<div class='" + this._inlineClass + " ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>")) : this.dpDiv
			}
		},
		_connectDatepicker: function(t, i) {
			var n = e(t);
			i.append = e([]), i.trigger = e([]), n.hasClass(this.markerClassName) || (this._attachments(n, i), n.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).keyup(this._doKeyUp), this._autoSize(i), e.data(t, "datepicker", i), i.settings.disabled && this._disableDatepicker(t))
		},
		_attachments: function(t, i) {
			var n, a, o, s = this._get(i, "appendText"),
				r = this._get(i, "isRTL");
			i.append && i.append.remove(), s && (i.append = e("<span class='" + this._appendClass + "'>" + s + "</span>"), t[r ? "before" : "after"](i.append)), t.unbind("focus", this._showDatepicker), i.trigger && i.trigger.remove(), ("focus" === (n = this._get(i, "showOn")) || "both" === n) && t.focus(this._showDatepicker), ("button" === n || "both" === n) && (a = this._get(i, "buttonText"), o = this._get(i, "buttonImage"), i.trigger = e(this._get(i, "buttonImageOnly") ? e("<img/>").addClass(this._triggerClass).attr({
				src: o,
				alt: a,
				title: a
			}) : e("<button type='button'></button>").addClass(this._triggerClass).html(o ? e("<img/>").attr({
				src: o,
				alt: a,
				title: a
			}) : a)), t[r ? "before" : "after"](i.trigger), i.trigger.click(function() {
				return e.datepicker._datepickerShowing && e.datepicker._lastInput === t[0] ? e.datepicker._hideDatepicker() : e.datepicker._datepickerShowing && e.datepicker._lastInput !== t[0] ? (e.datepicker._hideDatepicker(), e.datepicker._showDatepicker(t[0])) : e.datepicker._showDatepicker(t[0]), !1
			}))
		},
		_autoSize: function(e) {
			if (this._get(e, "autoSize") && !e.inline) {
				var t, i, n, a, o = new Date(2009, 11, 20),
					s = this._get(e, "dateFormat");
				s.match(/[DM]/) && (t = function(e) {
					for (i = 0, n = 0, a = 0; e.length > a; a++) e[a].length > i && (i = e[a].length, n = a);
					return n
				}, o.setMonth(t(this._get(e, s.match(/MM/) ? "monthNames" : "monthNamesShort"))), o.setDate(t(this._get(e, s.match(/DD/) ? "dayNames" : "dayNamesShort")) + 20 - o.getDay())), e.input.attr("size", this._formatDate(e, o).length)
			}
		},
		_inlineDatepicker: function(t, i) {
			var n = e(t);
			n.hasClass(this.markerClassName) || (n.addClass(this.markerClassName).append(i.dpDiv), e.data(t, "datepicker", i), this._setDate(i, this._getDefaultDate(i), !0), this._updateDatepicker(i), this._updateAlternate(i), i.settings.disabled && this._disableDatepicker(t), i.dpDiv.css("display", "block"))
		},
		_dialogDatepicker: function(t, i, n, a, o) {
			var s, l, c, u, d, h = this._dialogInst;
			return h || (this.uuid += 1, s = "dp" + this.uuid, this._dialogInput = e("<input type='text' id='" + s + "' style='position: absolute; top: -100px; width: 0px;'/>"), this._dialogInput.keydown(this._doKeyDown), e("body").append(this._dialogInput), h = this._dialogInst = this._newInst(this._dialogInput, !1), h.settings = {}, e.data(this._dialogInput[0], "datepicker", h)), r(h.settings, a || {}), i = i && i.constructor === Date ? this._formatDate(h, i) : i, this._dialogInput.val(i), this._pos = o ? o.length ? o : [o.pageX, o.pageY] : null, this._pos || (l = document.documentElement.clientWidth, c = document.documentElement.clientHeight, u = document.documentElement.scrollLeft || document.body.scrollLeft, d = document.documentElement.scrollTop || document.body.scrollTop, this._pos = [l / 2 - 100 + u, c / 2 - 150 + d]), this._dialogInput.css("left", this._pos[0] + 20 + "px").css("top", this._pos[1] + "px"), h.settings.onSelect = n, this._inDialog = !0, this.dpDiv.addClass(this._dialogClass), this._showDatepicker(this._dialogInput[0]), e.blockUI && e.blockUI(this.dpDiv), e.data(this._dialogInput[0], "datepicker", h), this
		},
		_destroyDatepicker: function(t) {
			var i, n = e(t),
				a = e.data(t, "datepicker");
			n.hasClass(this.markerClassName) && (i = t.nodeName.toLowerCase(), e.removeData(t, "datepicker"), "input" === i ? (a.append.remove(), a.trigger.remove(), n.removeClass(this.markerClassName).unbind("focus", this._showDatepicker).unbind("keydown", this._doKeyDown).unbind("keypress", this._doKeyPress).unbind("keyup", this._doKeyUp)) : ("div" === i || "span" === i) && n.removeClass(this.markerClassName).empty())
		},
		_enableDatepicker: function(t) {
			var i, n, a = e(t),
				o = e.data(t, "datepicker");
			a.hasClass(this.markerClassName) && ("input" === (i = t.nodeName.toLowerCase()) ? (t.disabled = !1, o.trigger.filter("button").each(function() {
				this.disabled = !1
			}).end().filter("img").css({
				opacity: "1.0",
				cursor: ""
			})) : ("div" === i || "span" === i) && ((n = a.children("." + this._inlineClass)).children().removeClass("ui-state-disabled"), n.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", !1)), this._disabledInputs = e.map(this._disabledInputs, function(e) {
				return e === t ? null : e
			}))
		},
		_disableDatepicker: function(t) {
			var i, n, a = e(t),
				o = e.data(t, "datepicker");
			a.hasClass(this.markerClassName) && ("input" === (i = t.nodeName.toLowerCase()) ? (t.disabled = !0, o.trigger.filter("button").each(function() {
				this.disabled = !0
			}).end().filter("img").css({
				opacity: "0.5",
				cursor: "default"
			})) : ("div" === i || "span" === i) && ((n = a.children("." + this._inlineClass)).children().addClass("ui-state-disabled"), n.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", !0)), this._disabledInputs = e.map(this._disabledInputs, function(e) {
				return e === t ? null : e
			}), this._disabledInputs[this._disabledInputs.length] = t)
		},
		_isDisabledDatepicker: function(e) {
			if (!e) return !1;
			for (var t = 0; this._disabledInputs.length > t; t++) if (this._disabledInputs[t] === e) return !0;
			return !1
		},
		_getInst: function(t) {
			try {
				return e.data(t, "datepicker")
			} catch (i) {
				throw "Missing instance data for this datepicker"
			}
		},
		_optionDatepicker: function(t, i, n) {
			var a, o, s, l, c = this._getInst(t);
			return 2 === arguments.length && "string" == typeof i ? "defaults" === i ? e.extend({}, e.datepicker._defaults) : c ? "all" === i ? e.extend({}, c.settings) : this._get(c, i) : null : (a = i || {}, "string" == typeof i && (a = {}, a[i] = n), void(c && (this._curInst === c && this._hideDatepicker(), o = this._getDateDatepicker(t, !0), s = this._getMinMaxDate(c, "min"), l = this._getMinMaxDate(c, "max"), r(c.settings, a), null !== s && void 0 !== a.dateFormat && void 0 === a.minDate && (c.settings.minDate = this._formatDate(c, s)), null !== l && void 0 !== a.dateFormat && void 0 === a.maxDate && (c.settings.maxDate = this._formatDate(c, l)), "disabled" in a && (a.disabled ? this._disableDatepicker(t) : this._enableDatepicker(t)), this._attachments(e(t), c), this._autoSize(c), this._setDate(c, o), this._updateAlternate(c), this._updateDatepicker(c))))
		},
		_changeDatepicker: function(e, t, i) {
			this._optionDatepicker(e, t, i)
		},
		_refreshDatepicker: function(e) {
			var t = this._getInst(e);
			t && this._updateDatepicker(t)
		},
		_setDateDatepicker: function(e, t) {
			var i = this._getInst(e);
			i && (this._setDate(i, t), this._updateDatepicker(i), this._updateAlternate(i))
		},
		_getDateDatepicker: function(e, t) {
			var i = this._getInst(e);
			return i && !i.inline && this._setDateFromField(i, t), i ? this._getDate(i) : null
		},
		_doKeyDown: function(t) {
			var i, n, a, o = e.datepicker._getInst(t.target),
				s = !0,
				r = o.dpDiv.is(".ui-datepicker-rtl");
			if (o._keyEvent = !0, e.datepicker._datepickerShowing) switch (t.keyCode) {
			case 9:
				e.datepicker._hideDatepicker(), s = !1;
				break;
			case 13:
				return (a = e("td." + e.datepicker._dayOverClass + ":not(." + e.datepicker._currentClass + ")", o.dpDiv))[0] && e.datepicker._selectDay(t.target, o.selectedMonth, o.selectedYear, a[0]), (i = e.datepicker._get(o, "onSelect")) ? (n = e.datepicker._formatDate(o), i.apply(o.input ? o.input[0] : null, [n, o])) : e.datepicker._hideDatepicker(), !1;
			case 27:
				e.datepicker._hideDatepicker();
				break;
			case 33:
				e.datepicker._adjustDate(t.target, t.ctrlKey ? -e.datepicker._get(o, "stepBigMonths") : -e.datepicker._get(o, "stepMonths"), "M");
				break;
			case 34:
				e.datepicker._adjustDate(t.target, t.ctrlKey ? +e.datepicker._get(o, "stepBigMonths") : +e.datepicker._get(o, "stepMonths"), "M");
				break;
			case 35:
				(t.ctrlKey || t.metaKey) && e.datepicker._clearDate(t.target), s = t.ctrlKey || t.metaKey;
				break;
			case 36:
				(t.ctrlKey || t.metaKey) && e.datepicker._gotoToday(t.target), s = t.ctrlKey || t.metaKey;
				break;
			case 37:
				(t.ctrlKey || t.metaKey) && e.datepicker._adjustDate(t.target, r ? 1 : -1, "D"), s = t.ctrlKey || t.metaKey, t.originalEvent.altKey && e.datepicker._adjustDate(t.target, t.ctrlKey ? -e.datepicker._get(o, "stepBigMonths") : -e.datepicker._get(o, "stepMonths"), "M");
				break;
			case 38:
				(t.ctrlKey || t.metaKey) && e.datepicker._adjustDate(t.target, -7, "D"), s = t.ctrlKey || t.metaKey;
				break;
			case 39:
				(t.ctrlKey || t.metaKey) && e.datepicker._adjustDate(t.target, r ? -1 : 1, "D"), s = t.ctrlKey || t.metaKey, t.originalEvent.altKey && e.datepicker._adjustDate(t.target, t.ctrlKey ? +e.datepicker._get(o, "stepBigMonths") : +e.datepicker._get(o, "stepMonths"), "M");
				break;
			case 40:
				(t.ctrlKey || t.metaKey) && e.datepicker._adjustDate(t.target, 7, "D"), s = t.ctrlKey || t.metaKey;
				break;
			default:
				s = !1
			} else 36 === t.keyCode && t.ctrlKey ? e.datepicker._showDatepicker(this) : s = !1;
			s && (t.preventDefault(), t.stopPropagation())
		},
		_doKeyPress: function(t) {
			var i, n, a = e.datepicker._getInst(t.target);
			return e.datepicker._get(a, "constrainInput") ? (i = e.datepicker._possibleChars(e.datepicker._get(a, "dateFormat")), n = String.fromCharCode(null == t.charCode ? t.keyCode : t.charCode), t.ctrlKey || t.metaKey || " " > n || !i || i.indexOf(n) > -1) : void 0
		},
		_doKeyUp: function(t) {
			var i = e.datepicker._getInst(t.target);
			if (i.input.val() !== i.lastVal) try {
				e.datepicker.parseDate(e.datepicker._get(i, "dateFormat"), i.input ? i.input.val() : null, e.datepicker._getFormatConfig(i)) && (e.datepicker._setDateFromField(i), e.datepicker._updateAlternate(i), e.datepicker._updateDatepicker(i))
			} catch (a) {}
			return !0
		},
		_showDatepicker: function(t) {
			if ("input" !== (t = t.target || t).nodeName.toLowerCase() && (t = e("input", t.parentNode)[0]), !e.datepicker._isDisabledDatepicker(t) && e.datepicker._lastInput !== t) {
				var i, a, o, s, l, c, u;
				i = e.datepicker._getInst(t), e.datepicker._curInst && e.datepicker._curInst !== i && (e.datepicker._curInst.dpDiv.stop(!0, !0), i && e.datepicker._datepickerShowing && e.datepicker._hideDatepicker(e.datepicker._curInst.input[0])), !1 !== (o = (a = e.datepicker._get(i, "beforeShow")) ? a.apply(t, [t, i]) : {}) && (r(i.settings, o), i.lastVal = null, e.datepicker._lastInput = t, e.datepicker._setDateFromField(i), e.datepicker._inDialog && (t.value = ""), e.datepicker._pos || (e.datepicker._pos = e.datepicker._findPos(t), e.datepicker._pos[1] += t.offsetHeight), s = !1, e(t).parents().each(function() {
					return !(s |= "fixed" === e(this).css("position"))
				}), l = {
					left: e.datepicker._pos[0],
					top: e.datepicker._pos[1]
				}, e.datepicker._pos = null, i.dpDiv.empty(), i.dpDiv.css({
					position: "absolute",
					display: "block",
					top: "-1000px"
				}), e.datepicker._updateDatepicker(i), l = e.datepicker._checkOffset(i, l, s), i.dpDiv.css({
					position: e.datepicker._inDialog && e.blockUI ? "static" : s ? "fixed" : "absolute",
					display: "none",
					left: l.left + "px",
					top: l.top + "px"
				}), i.inline || (c = e.datepicker._get(i, "showAnim"), u = e.datepicker._get(i, "duration"), i.dpDiv.css("z-index", n(e(t)) + 1), e.datepicker._datepickerShowing = !0, e.effects && e.effects.effect[c] ? i.dpDiv.show(c, e.datepicker._get(i, "showOptions"), u) : i.dpDiv[c || "show"](c ? u : null), e.datepicker._shouldFocusInput(i) && i.input.focus(), e.datepicker._curInst = i))
			}
		},
		_updateDatepicker: function(t) {
			this.maxRows = 4, g = t, t.dpDiv.empty().append(this._generateHTML(t)), this._attachHandlers(t);
			var i, n = this._getNumberOfMonths(t),
				a = n[1],
				o = t.dpDiv.find("." + this._dayOverClass + " a");
			o.length > 0 && s.apply(o.get(0)), t.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width(""), a > 1 && t.dpDiv.addClass("ui-datepicker-multi-" + a).css("width", 17 * a + "em"), t.dpDiv[(1 !== n[0] || 1 !== n[1] ? "add" : "remove") + "Class"]("ui-datepicker-multi"), t.dpDiv[(this._get(t, "isRTL") ? "add" : "remove") + "Class"]("ui-datepicker-rtl"), t === e.datepicker._curInst && e.datepicker._datepickerShowing && e.datepicker._shouldFocusInput(t) && t.input.focus(), t.yearshtml && (i = t.yearshtml, setTimeout(function() {
				i === t.yearshtml && t.yearshtml && t.dpDiv.find("select.ui-datepicker-year:first").replaceWith(t.yearshtml), i = t.yearshtml = null
			}, 0))
		},
		_shouldFocusInput: function(e) {
			return e.input && e.input.is(":visible") && !e.input.is(":disabled") && !e.input.is(":focus")
		},
		_checkOffset: function(t, i, n) {
			var a = t.dpDiv.outerWidth(),
				o = t.dpDiv.outerHeight(),
				s = t.input ? t.input.outerWidth() : 0,
				r = t.input ? t.input.outerHeight() : 0,
				l = document.documentElement.clientWidth + (n ? 0 : e(document).scrollLeft()),
				c = document.documentElement.clientHeight + (n ? 0 : e(document).scrollTop());
			return i.left -= this._get(t, "isRTL") ? a - s : 0, i.left -= n && i.left === t.input.offset().left ? e(document).scrollLeft() : 0, i.top -= n && i.top === t.input.offset().top + r ? e(document).scrollTop() : 0, i.left -= Math.min(i.left, i.left + a > l && l > a ? Math.abs(i.left + a - l) : 0), i.top -= Math.min(i.top, i.top + o > c && c > o ? Math.abs(o + r) : 0), i
		},
		_findPos: function(t) {
			for (var i, n = this._getInst(t), a = this._get(n, "isRTL"); t && ("hidden" === t.type || 1 !== t.nodeType || e.expr.filters.hidden(t));) t = t[a ? "previousSibling" : "nextSibling"];
			return i = e(t).offset(), [i.left, i.top]
		},
		_hideDatepicker: function(t) {
			var i, n, a, o, s = this._curInst;
			!s || t && s !== e.data(t, "datepicker") || this._datepickerShowing && (i = this._get(s, "showAnim"), n = this._get(s, "duration"), a = function() {
				e.datepicker._tidyDialog(s)
			}, e.effects && (e.effects.effect[i] || e.effects[i]) ? s.dpDiv.hide(i, e.datepicker._get(s, "showOptions"), n, a) : s.dpDiv["slideDown" === i ? "slideUp" : "fadeIn" === i ? "fadeOut" : "hide"](i ? n : null, a), i || a(), this._datepickerShowing = !1, (o = this._get(s, "onClose")) && o.apply(s.input ? s.input[0] : null, [s.input ? s.input.val() : "", s]), this._lastInput = null, this._inDialog && (this._dialogInput.css({
				position: "absolute",
				left: "0",
				top: "-100px"
			}), e.blockUI && (e.unblockUI(), e("body").append(this.dpDiv))), this._inDialog = !1)
		},
		_tidyDialog: function(e) {
			e.dpDiv.removeClass(this._dialogClass).unbind(".ui-datepicker-calendar")
		},
		_checkExternalClick: function(t) {
			if (e.datepicker._curInst) {
				var i = e(t.target),
					n = e.datepicker._getInst(i[0]);
				(i[0].id !== e.datepicker._mainDivId && 0 === i.parents("#" + e.datepicker._mainDivId).length && !i.hasClass(e.datepicker.markerClassName) && !i.closest("." + e.datepicker._triggerClass).length && e.datepicker._datepickerShowing && (!e.datepicker._inDialog || !e.blockUI) || i.hasClass(e.datepicker.markerClassName) && e.datepicker._curInst !== n) && e.datepicker._hideDatepicker()
			}
		},
		_adjustDate: function(t, i, n) {
			var a = e(t),
				o = this._getInst(a[0]);
			this._isDisabledDatepicker(a[0]) || (this._adjustInstDate(o, i + ("M" === n ? this._get(o, "showCurrentAtPos") : 0), n), this._updateDatepicker(o))
		},
		_gotoToday: function(t) {
			var i, n = e(t),
				a = this._getInst(n[0]);
			this._get(a, "gotoCurrent") && a.currentDay ? (a.selectedDay = a.currentDay, a.drawMonth = a.selectedMonth = a.currentMonth, a.drawYear = a.selectedYear = a.currentYear) : (i = new Date, a.selectedDay = i.getDate(), a.drawMonth = a.selectedMonth = i.getMonth(), a.drawYear = a.selectedYear = i.getFullYear()), this._notifyChange(a), this._adjustDate(n)
		},
		_selectMonthYear: function(t, i, n) {
			var a = e(t),
				o = this._getInst(a[0]);
			o["selected" + ("M" === n ? "Month" : "Year")] = o["draw" + ("M" === n ? "Month" : "Year")] = parseInt(i.options[i.selectedIndex].value, 10), this._notifyChange(o), this._adjustDate(a)
		},
		_selectDay: function(t, i, n, a) {
			var o, s = e(t);
			e(a).hasClass(this._unselectableClass) || this._isDisabledDatepicker(s[0]) || (o = this._getInst(s[0]), o.selectedDay = o.currentDay = e("a", a).html(), o.selectedMonth = o.currentMonth = i, o.selectedYear = o.currentYear = n, this._selectDate(t, this._formatDate(o, o.currentDay, o.currentMonth, o.currentYear)))
		},
		_clearDate: function(t) {
			var i = e(t);
			this._selectDate(i, "")
		},
		_selectDate: function(t, i) {
			var n, a = e(t),
				o = this._getInst(a[0]);
			i = null != i ? i : this._formatDate(o), o.input && o.input.val(i), this._updateAlternate(o), (n = this._get(o, "onSelect")) ? n.apply(o.input ? o.input[0] : null, [i, o]) : o.input && o.input.trigger("change"), o.inline ? this._updateDatepicker(o) : (this._hideDatepicker(), this._lastInput = o.input[0], "object" != typeof o.input[0] && o.input.focus(), this._lastInput = null)
		},
		_updateAlternate: function(t) {
			var i, n, a, o = this._get(t, "altField");
			o && (i = this._get(t, "altFormat") || this._get(t, "dateFormat"), n = this._getDate(t), a = this.formatDate(i, n, this._getFormatConfig(t)), e(o).each(function() {
				e(this).val(a)
			}))
		},
		noWeekends: function(e) {
			var t = e.getDay();
			return [t > 0 && 6 > t, ""]
		},
		iso8601Week: function(e) {
			var t, i = new Date(e.getTime());
			return i.setDate(i.getDate() + 4 - (i.getDay() || 7)), t = i.getTime(), i.setMonth(0), i.setDate(1), Math.floor(Math.round((t - i) / 864e5) / 7) + 1
		},
		parseDate: function(t, i, n) {
			if (null == t || null == i) throw "Invalid arguments";
			if ("" == (i = "object" == typeof i ? "" + i : i + "")) return null;
			var a, o, s, r, l = 0,
				c = (n ? n.shortYearCutoff : null) || this._defaults.shortYearCutoff,
				u = "string" != typeof c ? c : (new Date).getFullYear() % 100 + parseInt(c, 10),
				d = (n ? n.dayNamesShort : null) || this._defaults.dayNamesShort,
				h = (n ? n.dayNames : null) || this._defaults.dayNames,
				p = (n ? n.monthNamesShort : null) || this._defaults.monthNamesShort,
				f = (n ? n.monthNames : null) || this._defaults.monthNames,
				g = -1,
				m = -1,
				v = -1,
				y = -1,
				b = !1,
				w = function(e) {
					var i = t.length > a + 1 && t.charAt(a + 1) === e;
					return i && a++, i
				},
				_ = function(e) {
					var t = w(e),
						n = "@" === e ? 14 : "!" === e ? 20 : "y" === e && t ? 4 : "o" === e ? 3 : 2,
						a = "y" === e ? n : 1,
						o = RegExp("^\\d{" + a + "," + n + "}"),
						s = i.substring(l).match(o);
					if (!s) throw "Missing number at position " + l;
					return l += s[0].length, parseInt(s[0], 10)
				},
				k = function(t, n, a) {
					var o = -1,
						s = e.map(w(t) ? a : n, function(e, t) {
							return [[t, e]]
						}).sort(function(e, t) {
							return -(e[1].length - t[1].length)
						});
					if (e.each(s, function(e, t) {
						var n = t[1];
						return i.substr(l, n.length).toLowerCase() === n.toLowerCase() ? (o = t[0], l += n.length, !1) : void 0
					}), -1 !== o) return o + 1;
					throw "Unknown name at position " + l
				},
				C = function() {
					if (i.charAt(l) !== t.charAt(a)) throw "Unexpected literal at position " + l;
					l++
				};
			for (a = 0; t.length > a; a++) if (b)"'" !== t.charAt(a) || w("'") ? C() : b = !1;
			else switch (t.charAt(a)) {
			case "d":
				v = _("d");
				break;
			case "D":
				k("D", d, h);
				break;
			case "o":
				y = _("o");
				break;
			case "m":
				m = _("m");
				break;
			case "M":
				m = k("M", p, f);
				break;
			case "y":
				g = _("y");
				break;
			case "@":
				g = (r = new Date(_("@"))).getFullYear(), m = r.getMonth() + 1, v = r.getDate();
				break;
			case "!":
				g = (r = new Date((_("!") - this._ticksTo1970) / 1e4)).getFullYear(), m = r.getMonth() + 1, v = r.getDate();
				break;
			case "'":
				w("'") ? C() : b = !0;
				break;
			default:
				C()
			}
			if (i.length > l && (s = i.substr(l), !/^\s+/.test(s))) throw "Extra/unparsed characters found in date: " + s;
			if (-1 === g ? g = (new Date).getFullYear() : 100 > g && (g += (new Date).getFullYear() - (new Date).getFullYear() % 100 + (u >= g ? 0 : -100)), y > -1) for (m = 1, v = y; !((o = this._getDaysInMonth(g, m - 1)) >= v);) m++, v -= o;
			if ((r = this._daylightSavingAdjust(new Date(g, m - 1, v))).getFullYear() !== g || r.getMonth() + 1 !== m || r.getDate() !== v) throw "Invalid date";
			return r
		},
		ATOM: "yy-mm-dd",
		COOKIE: "D, dd M yy",
		ISO_8601: "yy-mm-dd",
		RFC_822: "D, d M y",
		RFC_850: "DD, dd-M-y",
		RFC_1036: "D, d M y",
		RFC_1123: "D, d M yy",
		RFC_2822: "D, d M yy",
		RSS: "D, d M y",
		TICKS: "!",
		TIMESTAMP: "@",
		W3C: "yy-mm-dd",
		_ticksTo1970: 864e9 * (718685 + Math.floor(492.5) - Math.floor(19.7) + Math.floor(4.925)),
		formatDate: function(e, t, i) {
			if (!t) return "";
			var n, a = (i ? i.dayNamesShort : null) || this._defaults.dayNamesShort,
				o = (i ? i.dayNames : null) || this._defaults.dayNames,
				s = (i ? i.monthNamesShort : null) || this._defaults.monthNamesShort,
				r = (i ? i.monthNames : null) || this._defaults.monthNames,
				l = function(t) {
					var i = e.length > n + 1 && e.charAt(n + 1) === t;
					return i && n++, i
				},
				c = function(e, t, i) {
					var n = "" + t;
					if (l(e)) for (; i > n.length;) n = "0" + n;
					return n
				},
				u = function(e, t, i, n) {
					return l(e) ? n[t] : i[t]
				},
				d = "",
				h = !1;
			if (t) for (n = 0; e.length > n; n++) if (h)"'" !== e.charAt(n) || l("'") ? d += e.charAt(n) : h = !1;
			else switch (e.charAt(n)) {
			case "d":
				d += c("d", t.getDate(), 2);
				break;
			case "D":
				d += u("D", t.getDay(), a, o);
				break;
			case "o":
				d += c("o", Math.round((new Date(t.getFullYear(), t.getMonth(), t.getDate()).getTime() - new Date(t.getFullYear(), 0, 0).getTime()) / 864e5), 3);
				break;
			case "m":
				d += c("m", t.getMonth() + 1, 2);
				break;
			case "M":
				d += u("M", t.getMonth(), s, r);
				break;
			case "y":
				d += l("y") ? t.getFullYear() : (10 > t.getYear() % 100 ? "0" : "") + t.getYear() % 100;
				break;
			case "@":
				d += t.getTime();
				break;
			case "!":
				d += 1e4 * t.getTime() + this._ticksTo1970;
				break;
			case "'":
				l("'") ? d += "'" : h = !0;
				break;
			default:
				d += e.charAt(n)
			}
			return d
		},
		_possibleChars: function(e) {
			var t, i = "",
				n = !1,
				a = function(i) {
					var n = e.length > t + 1 && e.charAt(t + 1) === i;
					return n && t++, n
				};
			for (t = 0; e.length > t; t++) if (n)"'" !== e.charAt(t) || a("'") ? i += e.charAt(t) : n = !1;
			else switch (e.charAt(t)) {
			case "d":
			case "m":
			case "y":
			case "@":
				i += "0123456789";
				break;
			case "D":
			case "M":
				return null;
			case "'":
				a("'") ? i += "'" : n = !0;
				break;
			default:
				i += e.charAt(t)
			}
			return i
		},
		_get: function(e, t) {
			return void 0 !== e.settings[t] ? e.settings[t] : this._defaults[t]
		},
		_setDateFromField: function(e, t) {
			if (e.input.val() !== e.lastVal) {
				var i = this._get(e, "dateFormat"),
					n = e.lastVal = e.input ? e.input.val() : null,
					a = this._getDefaultDate(e),
					o = a,
					s = this._getFormatConfig(e);
				try {
					o = this.parseDate(i, n, s) || a
				} catch (r) {
					n = t ? "" : n
				}
				e.selectedDay = o.getDate(), e.drawMonth = e.selectedMonth = o.getMonth(), e.drawYear = e.selectedYear = o.getFullYear(), e.currentDay = n ? o.getDate() : 0, e.currentMonth = n ? o.getMonth() : 0, e.currentYear = n ? o.getFullYear() : 0, this._adjustInstDate(e)
			}
		},
		_getDefaultDate: function(e) {
			return this._restrictMinMax(e, this._determineDate(e, this._get(e, "defaultDate"), new Date))
		},
		_determineDate: function(t, i, n) {
			var a = null == i || "" === i ? n : "string" == typeof i ?
			function(i) {
				try {
					return e.datepicker.parseDate(e.datepicker._get(t, "dateFormat"), i, e.datepicker._getFormatConfig(t))
				} catch (n) {}
				for (var a = (i.toLowerCase().match(/^c/) ? e.datepicker._getDate(t) : null) || new Date, o = a.getFullYear(), s = a.getMonth(), r = a.getDate(), l = /([+\-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g, c = l.exec(i); c;) {
					switch (c[2] || "d") {
					case "d":
					case "D":
						r += parseInt(c[1], 10);
						break;
					case "w":
					case "W":
						r += 7 * parseInt(c[1], 10);
						break;
					case "m":
					case "M":
						s += parseInt(c[1], 10), r = Math.min(r, e.datepicker._getDaysInMonth(o, s));
						break;
					case "y":
					case "Y":
						o += parseInt(c[1], 10), r = Math.min(r, e.datepicker._getDaysInMonth(o, s))
					}
					c = l.exec(i)
				}
				return new Date(o, s, r)
			}(i) : "number" == typeof i ? isNaN(i) ? n : function(e) {
				var t = new Date;
				return t.setDate(t.getDate() + e), t
			}(i) : new Date(i.getTime());
			return (a = a && "Invalid Date" == "" + a ? n : a) && (a.setHours(0), a.setMinutes(0), a.setSeconds(0), a.setMilliseconds(0)), this._daylightSavingAdjust(a)
		},
		_daylightSavingAdjust: function(e) {
			return e ? (e.setHours(e.getHours() > 12 ? e.getHours() + 2 : 0), e) : null
		},
		_setDate: function(e, t, i) {
			var n = !t,
				a = e.selectedMonth,
				o = e.selectedYear,
				s = this._restrictMinMax(e, this._determineDate(e, t, new Date));
			e.selectedDay = e.currentDay = s.getDate(), e.drawMonth = e.selectedMonth = e.currentMonth = s.getMonth(), e.drawYear = e.selectedYear = e.currentYear = s.getFullYear(), a === e.selectedMonth && o === e.selectedYear || i || this._notifyChange(e), this._adjustInstDate(e), e.input && e.input.val(n ? "" : this._formatDate(e))
		},
		_getDate: function(e) {
			return !e.currentYear || e.input && "" === e.input.val() ? null : this._daylightSavingAdjust(new Date(e.currentYear, e.currentMonth, e.currentDay))
		},
		_attachHandlers: function(t) {
			var i = this._get(t, "stepMonths"),
				n = "#" + t.id.replace(/\\\\/g, "\\");
			t.dpDiv.find("[data-handler]").map(function() {
				var t = {
					prev: function() {
						e.datepicker._adjustDate(n, -i, "M")
					},
					next: function() {
						e.datepicker._adjustDate(n, +i, "M")
					},
					hide: function() {
						e.datepicker._hideDatepicker()
					},
					today: function() {
						e.datepicker._gotoToday(n)
					},
					selectDay: function() {
						return e.datepicker._selectDay(n, +this.getAttribute("data-month"), +this.getAttribute("data-year"), this), !1
					},
					selectMonth: function() {
						return e.datepicker._selectMonthYear(n, this, "M"), !1
					},
					selectYear: function() {
						return e.datepicker._selectMonthYear(n, this, "Y"), !1
					}
				};
				e(this).bind(this.getAttribute("data-event"), t[this.getAttribute("data-handler")])
			})
		},
		_generateHTML: function(e) {
			var t, i, n, a, o, s, r, l, c, u, d, h, p, f, g, m, v, y, b, w, _, k, C, x, E, D, $, A, L, T, M, I, P, S, R, N, j, O, F, Y = new Date,
				W = this._daylightSavingAdjust(new Date(Y.getFullYear(), Y.getMonth(), Y.getDate())),
				B = this._get(e, "isRTL"),
				z = this._get(e, "showButtonPanel"),
				U = this._get(e, "hideIfNoPrevNext"),
				H = this._get(e, "navigationAsDateFormat"),
				V = this._getNumberOfMonths(e),
				J = this._get(e, "showCurrentAtPos"),
				G = this._get(e, "stepMonths"),
				q = 1 !== V[0] || 1 !== V[1],
				K = this._daylightSavingAdjust(e.currentDay ? new Date(e.currentYear, e.currentMonth, e.currentDay) : new Date(9999, 9, 9)),
				Q = this._getMinMaxDate(e, "min"),
				X = this._getMinMaxDate(e, "max"),
				Z = e.drawMonth - J,
				ee = e.drawYear;
			if (0 > Z && (Z += 12, ee--), X) for (t = this._daylightSavingAdjust(new Date(X.getFullYear(), X.getMonth() - V[0] * V[1] + 1, X.getDate())), t = Q && Q > t ? Q : t; this._daylightSavingAdjust(new Date(ee, Z, 1)) > t;) 0 > --Z && (Z = 11, ee--);
			for (e.drawMonth = Z, e.drawYear = ee, i = this._get(e, "prevText"), i = H ? this.formatDate(i, this._daylightSavingAdjust(new Date(ee, Z - G, 1)), this._getFormatConfig(e)) : i, n = this._canAdjustMonth(e, -1, ee, Z) ? "<a class='ui-datepicker-prev ui-corner-all' data-handler='prev' data-event='click' title='" + i + "'><span class='ui-icon ui-icon-circle-triangle-" + (B ? "e" : "w") + "'>" + i + "</span></a>" : U ? "" : "<a class='ui-datepicker-prev ui-corner-all ui-state-disabled' title='" + i + "'><span class='ui-icon ui-icon-circle-triangle-" + (B ? "e" : "w") + "'>" + i + "</span></a>", a = this._get(e, "nextText"), a = H ? this.formatDate(a, this._daylightSavingAdjust(new Date(ee, Z + G, 1)), this._getFormatConfig(e)) : a, o = this._canAdjustMonth(e, 1, ee, Z) ? "<a class='ui-datepicker-next ui-corner-all' data-handler='next' data-event='click' title='" + a + "'><span class='ui-icon ui-icon-circle-triangle-" + (B ? "w" : "e") + "'>" + a + "</span></a>" : U ? "" : "<a class='ui-datepicker-next ui-corner-all ui-state-disabled' title='" + a + "'><span class='ui-icon ui-icon-circle-triangle-" + (B ? "w" : "e") + "'>" + a + "</span></a>", s = this._get(e, "currentText"), r = this._get(e, "gotoCurrent") && e.currentDay ? K : W, s = H ? this.formatDate(s, r, this._getFormatConfig(e)) : s, l = e.inline ? "" : "<button type='button' class='ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all' data-handler='hide' data-event='click'>" + this._get(e, "closeText") + "</button>", c = z ? "<div class='ui-datepicker-buttonpane ui-widget-content'>" + (B ? l : "") + (this._isInRange(e, r) ? "<button type='button' class='ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all' data-handler='today' data-event='click'>" + s + "</button>" : "") + (B ? "" : l) + "</div>" : "", u = parseInt(this._get(e, "firstDay"), 10), u = isNaN(u) ? 0 : u, d = this._get(e, "showWeek"), h = this._get(e, "dayNames"), p = this._get(e, "dayNamesMin"), f = this._get(e, "monthNames"), g = this._get(e, "monthNamesShort"), m = this._get(e, "beforeShowDay"), v = this._get(e, "showOtherMonths"), y = this._get(e, "selectOtherMonths"), b = this._getDefaultDate(e), w = "", k = 0; V[0] > k; k++) {
				for (C = "", this.maxRows = 4, x = 0; V[1] > x; x++) {
					if (E = this._daylightSavingAdjust(new Date(ee, Z, e.selectedDay)), D = " ui-corner-all", $ = "", q) {
						if ($ += "<div class='ui-datepicker-group", V[1] > 1) switch (x) {
						case 0:
							$ += " ui-datepicker-group-first", D = " ui-corner-" + (B ? "right" : "left");
							break;
						case V[1] - 1:
							$ += " ui-datepicker-group-last", D = " ui-corner-" + (B ? "left" : "right");
							break;
						default:
							$ += " ui-datepicker-group-middle", D = ""
						}
						$ += "'>"
					}
					for ($ += "<div class='ui-datepicker-header ui-widget-header ui-helper-clearfix" + D + "'>" + (/all|left/.test(D) && 0 === k ? B ? o : n : "") + (/all|right/.test(D) && 0 === k ? B ? n : o : "") + this._generateMonthYearHeader(e, Z, ee, Q, X, k > 0 || x > 0, f, g) + "</div><table class='ui-datepicker-calendar'><thead><tr>", A = d ? "<th class='ui-datepicker-week-col'>" + this._get(e, "weekHeader") + "</th>" : "", _ = 0; 7 > _; _++) L = (_ + u) % 7, A += "<th scope='col'" + ((_ + u + 6) % 7 >= 5 ? " class='ui-datepicker-week-end'" : "") + "><span title='" + h[L] + "'>" + p[L] + "</span></th>";
					for ($ += A + "</tr></thead><tbody>", T = this._getDaysInMonth(ee, Z), ee === e.selectedYear && Z === e.selectedMonth && (e.selectedDay = Math.min(e.selectedDay, T)), M = (this._getFirstDayOfMonth(ee, Z) - u + 7) % 7, I = Math.ceil((M + T) / 7), P = q && this.maxRows > I ? this.maxRows : I, this.maxRows = P, S = this._daylightSavingAdjust(new Date(ee, Z, 1 - M)), R = 0; P > R; R++) {
						for ($ += "<tr>", N = d ? "<td class='ui-datepicker-week-col'>" + this._get(e, "calculateWeek")(S) + "</td>" : "", _ = 0; 7 > _; _++) j = m ? m.apply(e.input ? e.input[0] : null, [S]) : [!0, ""], O = S.getMonth() !== Z, F = O && !y || !j[0] || Q && Q > S || X && S > X, N += "<td class='" + ((_ + u + 6) % 7 >= 5 ? " ui-datepicker-week-end" : "") + (O ? " ui-datepicker-other-month" : "") + (S.getTime() === E.getTime() && Z === e.selectedMonth && e._keyEvent || b.getTime() === S.getTime() && b.getTime() === E.getTime() ? " " + this._dayOverClass : "") + (F ? " " + this._unselectableClass + " ui-state-disabled" : "") + (O && !v ? "" : " " + j[1] + (S.getTime() === K.getTime() ? " " + this._currentClass : "") + (S.getTime() === W.getTime() ? " ui-datepicker-today" : "")) + "'" + (O && !v || !j[2] ? "" : " title='" + j[2].replace(/'/g, "&#39;") + "'") + (F ? "" : " data-handler='selectDay' data-event='click' data-month='" + S.getMonth() + "' data-year='" + S.getFullYear() + "'") + ">" + (O && !v ? "?" : F ? "<span class='ui-state-default'>" + S.getDate() + "</span>" : "<a class='ui-state-default" + (S.getTime() === W.getTime() ? " ui-state-highlight" : "") + (S.getTime() === K.getTime() ? " ui-state-active" : "") + (O ? " ui-priority-secondary" : "") + "' href='#'>" + S.getDate() + "</a>") + "</td>", S.setDate(S.getDate() + 1), S = this._daylightSavingAdjust(S);
						$ += N + "</tr>"
					}++Z > 11 && (Z = 0, ee++), C += $ += "</tbody></table>" + (q ? "</div>" + (V[0] > 0 && x === V[1] - 1 ? "<div class='ui-datepicker-row-break'></div>" : "") : "")
				}
				w += C
			}
			return w += c, e._keyEvent = !1, w
		},
		_generateMonthYearHeader: function(e, t, i, n, a, o, s, r) {
			var l, c, u, d, h, p, f, g, m = this._get(e, "changeMonth"),
				v = this._get(e, "changeYear"),
				y = this._get(e, "showMonthAfterYear"),
				b = "<div class='ui-datepicker-title'>",
				w = "";
			if (o || !m) w += "<span class='ui-datepicker-month'>" + s[t] + "</span>";
			else {
				for (l = n && n.getFullYear() === i, c = a && a.getFullYear() === i, w += "<select class='ui-datepicker-month' data-handler='selectMonth' data-event='change'>", u = 0; 12 > u; u++)(!l || u >= n.getMonth()) && (!c || a.getMonth() >= u) && (w += "<option value='" + u + "'" + (u === t ? " selected='selected'" : "") + ">" + r[u] + "</option>");
				w += "</select>"
			}
			if (y || (b += w + (!o && m && v ? "" : "?")), !e.yearshtml) if (e.yearshtml = "", o || !v) b += "<span class='ui-datepicker-year'>" + i + "</span>";
			else {
				for (d = this._get(e, "yearRange").split(":"), h = (new Date).getFullYear(), f = (p = function(e) {
					var t = e.match(/c[+\-].*/) ? i + parseInt(e.substring(1), 10) : e.match(/[+\-].*/) ? h + parseInt(e, 10) : parseInt(e, 10);
					return isNaN(t) ? h : t
				})(d[0]), g = Math.max(f, p(d[1] || "")), f = n ? Math.max(f, n.getFullYear()) : f, g = a ? Math.min(g, a.getFullYear()) : g, e.yearshtml += "<select class='ui-datepicker-year' data-handler='selectYear' data-event='change'>"; g >= f; f++) e.yearshtml += "<option value='" + f + "'" + (f === i ? " selected='selected'" : "") + ">" + f + "</option>";
				e.yearshtml += "</select>", b += e.yearshtml, e.yearshtml = null
			}
			return b += this._get(e, "yearSuffix"), y && (b += (!o && m && v ? "" : "?") + w), b += "</div>"
		},
		_adjustInstDate: function(e, t, i) {
			var n = e.drawYear + ("Y" === i ? t : 0),
				a = e.drawMonth + ("M" === i ? t : 0),
				o = Math.min(e.selectedDay, this._getDaysInMonth(n, a)) + ("D" === i ? t : 0),
				s = this._restrictMinMax(e, this._daylightSavingAdjust(new Date(n, a, o)));
			e.selectedDay = s.getDate(), e.drawMonth = e.selectedMonth = s.getMonth(), e.drawYear = e.selectedYear = s.getFullYear(), ("M" === i || "Y" === i) && this._notifyChange(e)
		},
		_restrictMinMax: function(e, t) {
			var i = this._getMinMaxDate(e, "min"),
				n = this._getMinMaxDate(e, "max"),
				a = i && i > t ? i : t;
			return n && a > n ? n : a
		},
		_notifyChange: function(e) {
			var t = this._get(e, "onChangeMonthYear");
			t && t.apply(e.input ? e.input[0] : null, [e.selectedYear, e.selectedMonth + 1, e])
		},
		_getNumberOfMonths: function(e) {
			var t = this._get(e, "numberOfMonths");
			return null == t ? [1, 1] : "number" == typeof t ? [1, t] : t
		},
		_getMinMaxDate: function(e, t) {
			return this._determineDate(e, this._get(e, t + "Date"), null)
		},
		_getDaysInMonth: function(e, t) {
			return 32 - this._daylightSavingAdjust(new Date(e, t, 32)).getDate()
		},
		_getFirstDayOfMonth: function(e, t) {
			return new Date(e, t, 1).getDay()
		},
		_canAdjustMonth: function(e, t, i, n) {
			var a = this._getNumberOfMonths(e),
				o = this._daylightSavingAdjust(new Date(i, n + (0 > t ? t : a[0] * a[1]), 1));
			return 0 > t && o.setDate(this._getDaysInMonth(o.getFullYear(), o.getMonth())), this._isInRange(e, o)
		},
		_isInRange: function(e, t) {
			var i, n, a = this._getMinMaxDate(e, "min"),
				o = this._getMinMaxDate(e, "max"),
				s = null,
				r = null,
				l = this._get(e, "yearRange");
			return l && (i = l.split(":"), n = (new Date).getFullYear(), s = parseInt(i[0], 10), r = parseInt(i[1], 10), i[0].match(/[+\-].*/) && (s += n), i[1].match(/[+\-].*/) && (r += n)), (!a || t.getTime() >= a.getTime()) && (!o || t.getTime() <= o.getTime()) && (!s || t.getFullYear() >= s) && (!r || r >= t.getFullYear())
		},
		_getFormatConfig: function(e) {
			var t = this._get(e, "shortYearCutoff");
			return t = "string" != typeof t ? t : (new Date).getFullYear() % 100 + parseInt(t, 10), {
				shortYearCutoff: t,
				dayNamesShort: this._get(e, "dayNamesShort"),
				dayNames: this._get(e, "dayNames"),
				monthNamesShort: this._get(e, "monthNamesShort"),
				monthNames: this._get(e, "monthNames")
			}
		},
		_formatDate: function(e, t, i, n) {
			t || (e.currentDay = e.selectedDay, e.currentMonth = e.selectedMonth, e.currentYear = e.selectedYear);
			var a = t ? "object" == typeof t ? t : this._daylightSavingAdjust(new Date(n, i, t)) : this._daylightSavingAdjust(new Date(e.currentYear, e.currentMonth, e.currentDay));
			return this.formatDate(this._get(e, "dateFormat"), a, this._getFormatConfig(e))
		}
	}), e.fn.datepicker = function(t) {
		if (!this.length) return this;
		e.datepicker.initialized || (e(document).mousedown(e.datepicker._checkExternalClick), e.datepicker.initialized = !0), 0 === e("#" + e.datepicker._mainDivId).length && e("body").append(e.datepicker.dpDiv);
		var i = Array.prototype.slice.call(arguments, 1);
		return "string" != typeof t || "isDisabled" !== t && "getDate" !== t && "widget" !== t ? "option" === t && 2 === arguments.length && "string" == typeof arguments[1] ? e.datepicker["_" + t + "Datepicker"].apply(e.datepicker, [this[0]].concat(i)) : this.each(function() {
			"string" == typeof t ? e.datepicker["_" + t + "Datepicker"].apply(e.datepicker, [this].concat(i)) : e.datepicker._attachDatepicker(this, t)
		}) : e.datepicker["_" + t + "Datepicker"].apply(e.datepicker, [this[0]].concat(i))
	}, e.datepicker = new a, e.datepicker.initialized = !1, e.datepicker.uuid = (new Date).getTime(), e.datepicker.version = "1.11.1", e.datepicker, e.widget("ui.tooltip", {
		version: "1.11.1",
		options: {
			content: function() {
				var t = e(this).attr("title") || "";
				return e("<a>").text(t).html()
			},
			hide: !0,
			items: "[title]:not([disabled])",
			position: {
				my: "left top+15",
				at: "left bottom",
				collision: "flipfit flip"
			},
			show: !0,
			tooltipClass: null,
			track: !1,
			close: null,
			open: null
		},
		_addDescribedBy: function(t, i) {
			var n = (t.attr("aria-describedby") || "").split(/\s+/);
			n.push(i), t.data("ui-tooltip-id", i).attr("aria-describedby", e.trim(n.join(" ")))
		},
		_removeDescribedBy: function(t) {
			var i = t.data("ui-tooltip-id"),
				n = (t.attr("aria-describedby") || "").split(/\s+/),
				a = e.inArray(i, n); - 1 !== a && n.splice(a, 1), t.removeData("ui-tooltip-id"), (n = e.trim(n.join(" "))) ? t.attr("aria-describedby", n) : t.removeAttr("aria-describedby")
		},
		_create: function() {
			this._on({
				mouseover: "open",
				focusin: "open"
			}), this.tooltips = {}, this.parents = {}, this.options.disabled && this._disable(), this.liveRegion = e("<div>").attr({
				role: "log",
				"aria-live": "assertive",
				"aria-relevant": "additions"
			}).addClass("ui-helper-hidden-accessible").appendTo(this.document[0].body)
		},
		_setOption: function(t, i) {
			var n = this;
			return "disabled" === t ? (this[i ? "_disable" : "_enable"](), void(this.options[t] = i)) : (this._super(t, i), void("content" === t && e.each(this.tooltips, function(e, t) {
				n._updateContent(t)
			})))
		},
		_disable: function() {
			var t = this;
			e.each(this.tooltips, function(i, n) {
				var a = e.Event("blur");
				a.target = a.currentTarget = n[0], t.close(a, !0)
			}), this.element.find(this.options.items).addBack().each(function() {
				var t = e(this);
				t.is("[title]") && t.data("ui-tooltip-title", t.attr("title")).removeAttr("title")
			})
		},
		_enable: function() {
			this.element.find(this.options.items).addBack().each(function() {
				var t = e(this);
				t.data("ui-tooltip-title") && t.attr("title", t.data("ui-tooltip-title"))
			})
		},
		open: function(t) {
			var i = this,
				n = e(t ? t.target : this.element).closest(this.options.items);
			n.length && !n.data("ui-tooltip-id") && (n.attr("title") && n.data("ui-tooltip-title", n.attr("title")), n.data("ui-tooltip-open", !0), t && "mouseover" === t.type && n.parents().each(function() {
				var t, n = e(this);
				n.data("ui-tooltip-open") && (t = e.Event("blur"), t.target = t.currentTarget = this, i.close(t, !0)), n.attr("title") && (n.uniqueId(), i.parents[this.id] = {
					element: this,
					title: n.attr("title")
				}, n.attr("title", ""))
			}), this._updateContent(n, t))
		},
		_updateContent: function(e, t) {
			var i, n = this.options.content,
				a = this,
				o = t ? t.type : null;
			return "string" == typeof n ? this._open(t, e, n) : void((i = n.call(e[0], function(i) {
				e.data("ui-tooltip-open") && a._delay(function() {
					t && (t.type = o), this._open(t, e, i)
				})
			})) && this._open(t, e, i))
		},
		_open: function(t, i, n) {
			function a(e) {
				c.of = e, o.is(":hidden") || o.position(c)
			}
			var o, s, r, l, c = e.extend({}, this.options.position);
			if (n) {
				if ((o = this._find(i)).length) return void o.find(".ui-tooltip-content").html(n);
				i.is("[title]") && (t && "mouseover" === t.type ? i.attr("title", "") : i.removeAttr("title")), o = this._tooltip(i), this._addDescribedBy(i, o.attr("id")), o.find(".ui-tooltip-content").html(n), this.liveRegion.children().hide(), n.clone ? (l = n.clone()).removeAttr("id").find("[id]").removeAttr("id") : l = n, e("<div>").html(l).appendTo(this.liveRegion), this.options.track && t && /^mouse/.test(t.type) ? (this._on(this.document, {
					mousemove: a
				}), a(t)) : o.position(e.extend({
					of: i
				}, this.options.position)), this.hiding = !1, this.closing = !1, o.hide(), this._show(o, this.options.show), this.options.show && this.options.show.delay && (r = this.delayedShow = setInterval(function() {
					o.is(":visible") && (a(c.of), clearInterval(r))
				}, e.fx.interval)), this._trigger("open", t, {
					tooltip: o
				}), s = {
					keyup: function(t) {
						if (t.keyCode === e.ui.keyCode.ESCAPE) {
							var n = e.Event(t);
							n.currentTarget = i[0], this.close(n, !0)
						}
					}
				}, i[0] !== this.element[0] && (s.remove = function() {
					this._removeTooltip(o)
				}), t && "mouseover" !== t.type || (s.mouseleave = "close"), t && "focusin" !== t.type || (s.focusout = "close"), this._on(!0, i, s)
			}
		},
		close: function(t) {
			var i = this,
				n = e(t ? t.currentTarget : this.element),
				a = this._find(n);
			this.closing || (clearInterval(this.delayedShow), n.data("ui-tooltip-title") && !n.attr("title") && n.attr("title", n.data("ui-tooltip-title")), this._removeDescribedBy(n), this.hiding = !0, a.stop(!0), this._hide(a, this.options.hide, function() {
				i._removeTooltip(e(this)), this.hiding = !1, this.closing = !1
			}), n.removeData("ui-tooltip-open"), this._off(n, "mouseleave focusout keyup"), n[0] !== this.element[0] && this._off(n, "remove"), this._off(this.document, "mousemove"), t && "mouseleave" === t.type && e.each(this.parents, function(t, n) {
				e(n.element).attr("title", n.title), delete i.parents[t]
			}), this.closing = !0, this._trigger("close", t, {
				tooltip: a
			}), this.hiding || (this.closing = !1))
		},
		_tooltip: function(t) {
			var i = e("<div>").attr("role", "tooltip").addClass("ui-tooltip ui-widget ui-corner-all ui-widget-content " + (this.options.tooltipClass || "")),
				n = i.uniqueId().attr("id");
			return e("<div>").addClass("ui-tooltip-content").appendTo(i), i.appendTo(this.document[0].body), this.tooltips[n] = t, i
		},
		_find: function(t) {
			var i = t.data("ui-tooltip-id");
			return i ? e("#" + i) : e()
		},
		_removeTooltip: function(e) {
			e.remove(), delete this.tooltips[e.attr("id")]
		},
		_destroy: function() {
			var t = this;
			e.each(this.tooltips, function(i, n) {
				var a = e.Event("blur");
				a.target = a.currentTarget = n[0], t.close(a, !0), e("#" + i).remove(), n.data("ui-tooltip-title") && (n.attr("title") || n.attr("title", n.data("ui-tooltip-title")), n.removeData("ui-tooltip-title"))
			}), this.liveRegion.remove()
		}
	})
}), function(e, t, i, n) {
	var a = e(t);
	e.fn.lazyload = function(o) {
		function s() {
			var t = 0;
			l.each(function() {
				var i = e(this);
				if (!c.skip_invisible || i.is(":visible")) if (e.abovethetop(this, c) || e.leftofbegin(this, c));
				else if (e.belowthefold(this, c) || e.rightoffold(this, c)) {
					if (++t > c.failure_limit) return !1
				} else i.trigger("appear"), t = 0
			})
		}
		var r, l = this,
			c = {
				threshold: 0,
				failure_limit: 0,
				event: "scroll",
				effect: "show",
				container: t,
				data_attribute: "original",
				skip_invisible: !1,
				appear: null,
				load: null,
				placeholder: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC"
			};
		return o && (n !== o.failurelimit && (o.failure_limit = o.failurelimit, delete o.failurelimit), n !== o.effectspeed && (o.effect_speed = o.effectspeed, delete o.effectspeed), e.extend(c, o)), r = c.container === n || c.container === t ? a : e(c.container), 0 === c.event.indexOf("scroll") && r.bind(c.event, function() {
			return s()
		}), this.each(function() {
			var t = this,
				i = e(t);
			t.loaded = !1, (i.attr("src") === n || !1 === i.attr("src")) && i.is("img") && i.attr("src", c.placeholder), i.one("appear", function() {
				if (!this.loaded) {
					if (c.appear) {
						var n = l.length;
						c.appear.call(t, n, c)
					}
					e("<img />").bind("load", function() {
						var n = i.attr("data-" + c.data_attribute);
						i.hide(), i.is("img") ? i.attr("src", n) : i.css("background-image", "url('" + n + "')"), i[c.effect](c.effect_speed), t.loaded = !0;
						var a = e.grep(l, function(e) {
							return !e.loaded
						});
						if (l = e(a), c.load) {
							var o = l.length;
							c.load.call(t, o, c)
						}
					}).attr("src", i.attr("data-" + c.data_attribute))
				}
			}), 0 !== c.event.indexOf("scroll") && i.bind(c.event, function() {
				t.loaded || i.trigger("appear")
			})
		}), a.bind("resize", function() {
			s()
		}), /(?:iphone|ipod|ipad).*os 5/gi.test(navigator.appVersion) && a.bind("pageshow", function(t) {
			t.originalEvent && t.originalEvent.persisted && l.each(function() {
				e(this).trigger("appear")
			})
		}), e(i).ready(function() {
			s()
		}), this
	}, e.belowthefold = function(i, o) {
		return (o.container === n || o.container === t ? (t.innerHeight ? t.innerHeight : a.height()) + a.scrollTop() : e(o.container).offset().top + e(o.container).height()) <= e(i).offset().top - o.threshold
	}, e.rightoffold = function(i, o) {
		return (o.container === n || o.container === t ? a.width() + a.scrollLeft() : e(o.container).offset().left + e(o.container).width()) <= e(i).offset().left - o.threshold
	}, e.abovethetop = function(i, o) {
		return (o.container === n || o.container === t ? a.scrollTop() : e(o.container).offset().top) >= e(i).offset().top + o.threshold + e(i).height()
	}, e.leftofbegin = function(i, o) {
		return (o.container === n || o.container === t ? a.scrollLeft() : e(o.container).offset().left) >= e(i).offset().left + o.threshold + e(i).width()
	}, e.inviewport = function(t, i) {
		return !(e.rightoffold(t, i) || e.leftofbegin(t, i) || e.belowthefold(t, i) || e.abovethetop(t, i))
	}, e.extend(e.expr[":"], {
		"below-the-fold": function(t) {
			return e.belowthefold(t, {
				threshold: 0
			})
		},
		"above-the-top": function(t) {
			return !e.belowthefold(t, {
				threshold: 0
			})
		},
		"right-of-screen": function(t) {
			return e.rightoffold(t, {
				threshold: 0
			})
		},
		"left-of-screen": function(t) {
			return !e.rightoffold(t, {
				threshold: 0
			})
		},
		"in-viewport": function(t) {
			return e.inviewport(t, {
				threshold: 0
			})
		},
		"above-the-fold": function(t) {
			return !e.belowthefold(t, {
				threshold: 0
			})
		},
		"right-of-fold": function(t) {
			return e.rightoffold(t, {
				threshold: 0
			})
		},
		"left-of-fold": function(t) {
			return !e.rightoffold(t, {
				threshold: 0
			})
		}
	})
}(jQuery, window, document);
var supportUrl = "http://support.huawei.com",
	eUrl = "http://e.huawei.com",
	flag = !1,
	hasKeyword = !1,
	lastCompleteAjax = null;
$(document).ready(function() {
	"e-beta.huawei.com" != window.location.host && "test120.huawei.com" != window.location.host || (supportUrl = "http://support-trial.huawei.com", eUrl = "http://e-beta.huawei.com"), initSearchSubPage(), immediately(".support_input_focus", initAutoThink)
});
var gLinkHost = "http://" + ("e.huawei.com" == window.location.host ? "e.huawei.com" : "e-beta.huawei.com");
"undefined" == typeof jwplayer && (jwplayer = function(e) {
	if (jwplayer.api) return jwplayer.api.selectPlayer(e)
}, jwplayer.version = "6.6.3896", jwplayer.vid = document.createElement("video"), jwplayer.audio = document.createElement("audio"), jwplayer.source = document.createElement("source"), function(e) {
	function t(e) {
		return function() {
			return l(e)
		}
	}

	function i(e) {
		return function() {
			e("Error loading file")
		}
	}

	function n(e, t, i, n) {
		return function() {
			try {
				var a = e.responseXML;
				if (a && a.firstChild) return i(e)
			} catch (s) {}(a = r.parseXML(e.responseText)) && a.firstChild ? (e = r.extend({}, e, {
				responseXML: a
			}), i(e)) : n && n(e.responseText ? "Invalid XML" : t)
		}
	}
	var a = document,
		o = window,
		s = navigator,
		r = e.utils = function() {};
	r.exists = function(e) {
		switch (typeof e) {
		case "string":
			return 0 < e.length;
		case "object":
			return null !== e;
		case "undefined":
			return !1
		}
		return !0
	}, r.styleDimension = function(e) {
		return e + (0 < e.toString().indexOf("%") ? "" : "px")
	}, r.getAbsolutePath = function(e, t) {
		if (r.exists(t) || (t = a.location.href), r.exists(e)) {
			var i;
			if (r.exists(e)) {
				i = e.indexOf("://");
				o = e.indexOf("?");
				i = 0 < i && (0 > o || o > i)
			} else i = void 0;
			if (i) return e;
			i = t.substring(0, t.indexOf("://") + 3);
			var n, o = t.substring(i.length, t.indexOf("/", i.length + 1));
			0 === e.indexOf("/") ? n = e.split("/") : (n = t.split("?")[0], n = n.substring(i.length + o.length + 1, n.lastIndexOf("/")), n = n.split("/").concat(e.split("/")));
			for (var s = [], l = 0; l < n.length; l++) n[l] && r.exists(n[l]) && "." != n[l] && (".." == n[l] ? s.pop() : s.push(n[l]));
			return i + o + "/" + s.join("/")
		}
	}, r.extend = function() {
		var e = r.extend.arguments;
		if (1 < e.length) {
			for (var t = 1; t < e.length; t++) r.foreach(e[t], function(t, i) {
				try {
					r.exists(i) && (e[0][t] = i)
				} catch (l) {}
			});
			return e[0]
		}
		return null
	}, r.log = function(e, t) {
		"undefined" != typeof console && "undefined" != typeof console.log && (t ? console.log(e, t) : console.log(e))
	};
	var l = r.userAgentMatch = function(e) {
			return null !== s.userAgent.toLowerCase().match(e)
		};
	r.isIE = t(/msie/i), r.isFF = t(/firefox/i), r.isChrome = t(/chrome/i), r.isIOS = t(/iP(hone|ad|od)/i), r.isIPod = t(/iP(hone|od)/i), r.isIPad = t(/iPad/i), r.isSafari602 = t(/Macintosh.*Mac OS X 10_8.*6\.0\.\d* Safari/i), r.isSafari = function() {
		return l(/safari/i) && !l(/chrome/i) && !l(/chromium/i) && !l(/android/i)
	}, r.isAndroid = function(e) {
		return l(e ? RegExp("android.*" + e, "i") : /android/i)
	}, r.isMobile = function() {
		return r.isIOS() || r.isAndroid()
	}, r.saveCookie = function(e, t) {
		a.cookie = "jwplayer." + e + "=" + t + "; path=/"
	}, r.getCookies = function() {
		for (var e = {}, t = a.cookie.split("; "), i = 0; i < t.length; i++) {
			var n = t[i].split("=");
			0 == n[0].indexOf("jwplayer.") && (e[n[0].substring(9, n[0].length)] = n[1])
		}
		return e
	}, r.typeOf = function(e) {
		var t = typeof e;
		return "object" === t ? e ? e instanceof Array ? "array" : t : "null" : t
	}, r.translateEventResponse = function(t, i) {
		var n = r.extend({}, i);
		return t != e.events.JWPLAYER_FULLSCREEN || n.fullscreen ? "object" == typeof n.data ? (n = r.extend(n, n.data), delete n.data) : "object" == typeof n.metadata && r.deepReplaceKeyName(n.metadata, ["__dot__", "__spc__", "__dsh__", "__default__"], [".", " ", "-", "default"]) : (n.fullscreen = "true" == n.message, delete n.message), r.foreach(["position", "duration", "offset"], function(e, t) {
			n[t] && (n[t] = Math.round(1e3 * n[t]) / 1e3)
		}), n
	}, r.flashVersion = function() {
		if (r.isAndroid()) return 0;
		var e, t = s.plugins;
		try {
			if ("undefined" !== t && (e = t["Shockwave Flash"])) return parseInt(e.description.replace(/\D+(\d+)\..*/, "$1"))
		} catch (n) {}
		if ("undefined" != typeof o.ActiveXObject) try {
			if (e = new ActiveXObject("ShockwaveFlash.ShockwaveFlash")) return parseInt(e.GetVariable("$version").split(" ")[1].split(",")[0])
		} catch (i) {}
		return 0
	}, r.getScriptPath = function(e) {
		for (var t = a.getElementsByTagName("script"), i = 0; i < t.length; i++) {
			var n = t[i].src;
			if (n && 0 <= n.indexOf(e)) return n.substr(0, n.indexOf(e))
		}
		return ""
	}, r.deepReplaceKeyName = function(t, i, n) {
		switch (e.utils.typeOf(t)) {
		case "array":
			for (var a = 0; a < t.length; a++) t[a] = e.utils.deepReplaceKeyName(t[a], i, n);
			break;
		case "object":
			r.foreach(t, function(a, o) {
				var s;
				if (i instanceof Array && n instanceof Array) {
					if (i.length != n.length) return;
					s = i
				} else s = [i];
				for (var r = a, l = 0; l < s.length; l++) r = r.replace(RegExp(i[l], "g"), n[l]);
				t[r] = e.utils.deepReplaceKeyName(o, i, n), a != r && delete t[a]
			})
		}
		return t
	};
	var c = r.pluginPathType = {
		ABSOLUTE: 0,
		RELATIVE: 1,
		CDN: 2
	};
	r.getPluginPathType = function(e) {
		if ("string" == typeof e) {
			var t = (e = e.split("?")[0]).indexOf("://");
			if (0 < t) return c.ABSOLUTE;
			var i = e.indexOf("/");
			return e = r.extension(e), !(0 > t && 0 > i) || e && isNaN(e) ? c.RELATIVE : c.CDN
		}
	}, r.getPluginName = function(e) {
		return e.replace(/^(.*\/)?([^-]*)-?.*\.(swf|js)$/, "$2")
	}, r.getPluginVersion = function(e) {
		return e.replace(/[^-]*-?([^\.]*).*$/, "$1")
	}, r.isYouTube = function(e) {
		return /^(http|\/\/).*(youtube\.com|youtu\.be)\/.+/.test(e)
	}, r.youTubeID = function(e) {
		try {
			return /v[=\/]([^?&]*)|youtu\.be\/([^?]*)|^([\w-]*)$/i.exec(e).slice(1).join("").replace("?", "")
		} catch (t) {
			return ""
		}
	}, r.isRtmp = function(e, t) {
		return 0 == e.indexOf("rtmp") || "rtmp" == t
	}, r.foreach = function(e, t) {
		var i, n;
		for (i in e)"function" == r.typeOf(e.hasOwnProperty) ? e.hasOwnProperty(i) && (n = e[i], t(i, n)) : (n = e[i], t(i, n))
	}, r.isHTTPS = function() {
		return 0 == o.location.href.indexOf("https")
	}, r.repo = function() {
		var e = "http://www.huawei.com/minisite/jwplayer/";
		try {
			r.isHTTPS() && (e = e.replace("http://", "https://ssl."))
		} catch (l) {}
		return e
	}, r.ajax = function(e, t, a) {
		var s;
		0 < e.indexOf("#") && (e = e.replace(/#.*$/, ""));
		var l;
		if ((l = !! ((l = e) && 0 <= l.indexOf("://") && l.split("/")[2] != o.location.href.split("/")[2])) && r.exists(o.XDomainRequest)) s = new XDomainRequest, s.onload = n(s, e, t, a), s.onerror = i(a);
		else if (r.exists(o.XMLHttpRequest)) {
			var u = s = new XMLHttpRequest,
				d = e;
			s.onreadystatechange = function() {
				if (4 === u.readyState) switch (u.status) {
				case 200:
					n(u, d, t, a)();
					break;
				case 404:
					a("File not found")
				}
			}, s.onerror = i(a)
		} else a && a();
		try {
			s.open("GET", e, !0), s.send(null)
		} catch (c) {
			a && a(e)
		}
		return s
	}, r.parseXML = function(e) {
		try {
			var t;
			if (o.DOMParser) {
				t = (new DOMParser).parseFromString(e, "text/xml");
				try {
					if ("parsererror" == t.childNodes[0].firstChild.nodeName) return
				} catch (l) {}
			} else t = new ActiveXObject("Microsoft.XMLDOM"), t.async = "false", t.loadXML(e);
			return t
		} catch (i) {}
	}, r.filterPlaylist = function(e, t) {
		for (var i = [], n = 0; n < e.length; n++) {
			var a = r.extend({}, e[n]);
			if (a.sources = r.filterSources(a.sources), 0 < a.sources.length) {
				for (var o = 0; o < a.sources.length; o++) {
					var s = a.sources[o];
					s.label || (s.label = o.toString())
				}
				i.push(a)
			}
		}
		if (t && 0 == i.length) for (n = 0; n < e.length; n++) if (a = r.extend({}, e[n]), a.sources = r.filterSources(a.sources, !0), 0 < a.sources.length) {
			for (o = 0; o < a.sources.length; o++)(s = a.sources[o]).label || (s.label = o.toString());
			i.push(a)
		}
		return i
	}, r.filterSources = function(t, i) {
		var n, a, o = r.extensionmap;
		if (t) {
			a = [];
			for (var s = 0; s < t.length; s++) {
				var l = t[s].type,
					c = t[s].file;
				c && c.trim && (c = c.trim()), l || (l = o.extType(r.extension(c)), t[s].type = l), i ? e.embed.flashCanPlay(c, l) && (n || (n = l), l == n && a.push(r.extend({}, t[s]))) : r.canPlayHTML5(l) && (n || (n = l), l == n && a.push(r.extend({}, t[s])))
			}
		}
		return a
	}, r.canPlayHTML5 = function(t) {
		return (!r.isAndroid() || "hls" != t && "m3u" != t && "m3u8" != t) && ( !! (t = r.extensionmap.types[t]) && !! e.vid.canPlayType && e.vid.canPlayType(t))
	}, r.seconds = function(e) {
		var t = (e = e.replace(",", ".")).split(":"),
			i = 0;
		return "s" == e.substr(-1) ? i = Number(e.substr(0, e.length - 1)) : "m" == e.substr(-1) ? i = 60 * Number(e.substr(0, e.length - 1)) : "h" == e.substr(-1) ? i = 3600 * Number(e.substr(0, e.length - 1)) : 1 < t.length ? (i = Number(t[t.length - 1]), i += 60 * Number(t[t.length - 2]), 3 == t.length && (i += 3600 * Number(t[t.length - 3]))) : i = Number(e), i
	}, r.serialize = function(e) {
		return null == e ? null : "true" == e.toString().toLowerCase() || "false" != e.toString().toLowerCase() && (isNaN(Number(e)) || 5 < e.length || 0 == e.length ? e : Number(e))
	}
}(jwplayer), function(e) {
	var t = "video/",
		i = e.foreach,
		n = {
			mp4: t + "mp4",
			vorbis: "audio/ogg",
			ogg: t + "ogg",
			webm: t + "webm",
			aac: "audio/mp4",
			mp3: "audio/mpeg",
			hls: "application/vnd.apple.mpegurl"
		},
		a = {
			mp4: n.mp4,
			f4v: n.mp4,
			m4v: n.mp4,
			mov: n.mp4,
			m4a: n.aac,
			f4a: n.aac,
			aac: n.aac,
			mp3: n.mp3,
			ogv: n.ogg,
			ogg: n.vorbis,
			oga: n.vorbis,
			webm: n.webm,
			m3u8: n.hls,
			hls: n.hls
		},
		t = {
			flv: t = "video",
			f4v: t,
			mov: t,
			m4a: t,
			m4v: t,
			mp4: t,
			aac: t,
			f4a: t,
			mp3: "sound",
			smil: "rtmp",
			m3u8: "hls",
			hls: "hls"
		},
		o = e.extensionmap = {};
	i(a, function(e, t) {
		o[e] = {
			html5: t
		}
	}), i(t, function(e, t) {
		o[e] || (o[e] = {}), o[e].flash = t
	}), o.types = n, o.mimeType = function(e) {
		var t;
		return i(n, function(i, n) {
			!t && n == e && (t = i)
		}), t
	}, o.extType = function(e) {
		return o.mimeType(a[e])
	}
}(jwplayer.utils), function(e) {
	var t = e.loaderstatus = {
		NEW: 0,
		LOADING: 1,
		ERROR: 2,
		COMPLETE: 3
	},
		i = document;
	e.scriptloader = function(n) {
		function a() {
			s = t.ERROR, l.sendEvent(r.ERROR)
		}

		function o() {
			s = t.COMPLETE, l.sendEvent(r.COMPLETE)
		}
		var s = t.NEW,
			r = jwplayer.events,
			l = new r.eventdispatcher;
		e.extend(this, l), this.load = function() {
			var l = e.scriptloader.loaders[n];
			if (!l || l.getStatus() != t.NEW && l.getStatus() != t.LOADING) {
				if (e.scriptloader.loaders[n] = this, s == t.NEW) {
					s = t.LOADING;
					var c = i.createElement("script");
					c.addEventListener ? (c.onload = o, c.onerror = a) : c.readyState && (c.onreadystatechange = function() {
						("loaded" == c.readyState || "complete" == c.readyState) && o()
					}), i.getElementsByTagName("head")[0].appendChild(c), c.src = n
				}
			} else l.addEventListener(r.ERROR, a), l.addEventListener(r.COMPLETE, o)
		}, this.getStatus = function() {
			return s
		}
	}, e.scriptloader.loaders = {}
}(jwplayer.utils), function(e) {
	e.trim = function(e) {
		return e.replace(/^\s*/, "").replace(/\s*$/, "")
	}, e.pad = function(e, t, i) {
		for (i || (i = "0"); e.length < t;) e = i + e;
		return e
	}, e.xmlAttribute = function(e, t) {
		for (var i = 0; i < e.attributes.length; i++) if (e.attributes[i].name && e.attributes[i].name.toLowerCase() == t.toLowerCase()) return e.attributes[i].value.toString();
		return ""
	}, e.extension = function(e) {
		return e && "rtmp" != e.substr(0, 4) ? -1 < (e = e.substring(e.lastIndexOf("/") + 1, e.length).split("?")[0].split("#")[0]).lastIndexOf(".") ? e.substr(e.lastIndexOf(".") + 1, e.length).toLowerCase() : void 0 : ""
	}, e.stringToColor = function(e) {
		return 3 == (e = e.replace(/(#|0x)?([0-9A-F]{3,6})$/gi, "$2")).length && (e = e.charAt(0) + e.charAt(0) + e.charAt(1) + e.charAt(1) + e.charAt(2) + e.charAt(2)), parseInt(e, 16)
	}
}(jwplayer.utils), function(e) {
	var t = "touchmove",
		i = "touchstart";
	e.touch = function(n) {
		function a(e) {
			e.type == i ? (l = !0, u = s(h.DRAG_START, e)) : e.type == t ? l && (d || (o(h.DRAG_START, e, u), d = !0), o(h.DRAG, e)) : (l && (d ? o(h.DRAG_END, e) : (e.cancelBubble = !0, o(h.TAP, e))), l = d = !1, u = null)
		}

		function o(e, t, i) {
			c[e] && (t.preventManipulation && t.preventManipulation(), t.preventDefault && t.preventDefault(), t = i || s(e, t)) && c[e](t)
		}

		function s(e, t) {
			n = null;
			if (t.touches && t.touches.length ? n = t.touches[0] : t.changedTouches && t.changedTouches.length && (n = t.changedTouches[0]), !n) return null;
			var i = r.getBoundingClientRect(),
				n = {
					type: e,
					target: r,
					x: n.pageX - window.pageXOffset - i.left,
					y: n.pageY,
					deltaX: 0,
					deltaY: 0
				};
			return e != h.TAP && u && (n.deltaX = n.x - u.x, n.deltaY = n.y - u.y), n
		}
		var r = n,
			l = !1,
			c = {},
			u = null,
			d = !1,
			h = e.touchEvents;
		return document.addEventListener(t, a), document.addEventListener("touchend", function(e) {
			l && d && o(h.DRAG_END, e), l = d = !1, u = null
		}), document.addEventListener("touchcancel", a), n.addEventListener(i, a), n.addEventListener("touchend", a), this.addEventListener = function(e, t) {
			c[e] = t
		}, this.removeEventListener = function(e) {
			delete c[e]
		}, this
	}
}(jwplayer.utils), jwplayer.utils.touchEvents = {
	DRAG: "jwplayerDrag",
	DRAG_START: "jwplayerDragStart",
	DRAG_END: "jwplayerDragEnd",
	TAP: "jwplayerTap"
}, function(e) {
	e.key = function(t) {
		var i, n, a;
		this.edition = function() {
			return a && a.getTime() < (new Date).getTime() ? "invalid" : i
		}, this.token = function() {
			return n
		}, e.exists(t) || (t = "");
		try {
			var o = (t = e.tea.decrypt(t, "36QXq4W@GSBV^teR")).split("/");
			(i = o[0]) ? /^(free|pro|premium|ads)$/i.test(i) ? (n = o[1], o[2] && 0 < parseInt(o[2]) && (a = new Date).setTime(String(o[2]))) : i = "invalid" : i = "free"
		} catch (s) {
			i = "invalid"
		}
	}
}(jwplayer.utils), function(e) {
	var t = jwplayer.utils.tea = {};
	t.encrypt = function(e, a) {
		if (0 == e.length) return "";
		var o = t.strToLongs(n.encode(e));
		1 >= o.length && (o[1] = 0);
		for (var s, r = t.strToLongs(n.encode(a).slice(0, 16)), l = o.length, c = o[l - 1], u = o[0], d = Math.floor(6 + 52 / l), h = 0; 0 < d--;) {
			s = (h += 2654435769) >>> 2 & 3;
			for (var p = 0; p < l; p++) u = o[(p + 1) % l], c = (c >>> 5 ^ u << 2) + (u >>> 3 ^ c << 4) ^ (h ^ u) + (r[3 & p ^ s] ^ c), c = o[p] += c
		}
		return o = t.longsToStr(o), i.encode(o)
	}, t.decrypt = function(e, a) {
		if (0 == e.length) return "";
		for (var o, s = t.strToLongs(i.decode(e)), r = t.strToLongs(n.encode(a).slice(0, 16)), l = s.length, c = s[l - 1], u = s[0], d = 2654435769 * Math.floor(6 + 52 / l); 0 != d;) {
			o = d >>> 2 & 3;
			for (var h = l - 1; 0 <= h; h--) c = s[0 < h ? h - 1 : l - 1], c = (c >>> 5 ^ u << 2) + (u >>> 3 ^ c << 4) ^ (d ^ u) + (r[3 & h ^ o] ^ c), u = s[h] -= c;
			d -= 2654435769
		}
		return s = t.longsToStr(s), s = s.replace(/\0+$/, ""), n.decode(s)
	}, t.strToLongs = function(e) {
		for (var t = Array(Math.ceil(e.length / 4)), i = 0; i < t.length; i++) t[i] = e.charCodeAt(4 * i) + (e.charCodeAt(4 * i + 1) << 8) + (e.charCodeAt(4 * i + 2) << 16) + (e.charCodeAt(4 * i + 3) << 24);
		return t
	}, t.longsToStr = function(e) {
		for (var t = Array(e.length), i = 0; i < e.length; i++) t[i] = String.fromCharCode(255 & e[i], e[i] >>> 8 & 255, e[i] >>> 16 & 255, e[i] >>> 24 & 255);
		return t.join("")
	};
	var i = {
		code: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
		encode: function(e, t) {
			var a, o, s, r, l, c, u = [],
				d = "",
				h = i.code;
			if (c = (void 0 === t ? 0 : t) ? n.encode(e) : e, 0 < (l = c.length % 3)) for (; 3 > l++;) d += "=", c += "\0";
			for (l = 0; l < c.length; l += 3) a = c.charCodeAt(l), o = c.charCodeAt(l + 1), s = c.charCodeAt(l + 2), r = a << 16 | o << 8 | s, a = r >> 18 & 63, o = r >> 12 & 63, s = r >> 6 & 63, r &= 63, u[l / 3] = h.charAt(a) + h.charAt(o) + h.charAt(s) + h.charAt(r);
			return u = u.join(""), u = u.slice(0, u.length - d.length) + d
		},
		decode: function(e, t) {
			t = void 0 !== t && t;
			var a, o, s, r, l, c, u = [],
				d = i.code;
			c = t ? n.decode(e) : e;
			for (var h = 0; h < c.length; h += 4) a = d.indexOf(c.charAt(h)), o = d.indexOf(c.charAt(h + 1)), r = d.indexOf(c.charAt(h + 2)), l = d.indexOf(c.charAt(h + 3)), s = a << 18 | o << 12 | r << 6 | l, a = s >>> 16 & 255, o = s >>> 8 & 255, s &= 255, u[h / 4] = String.fromCharCode(a, o, s), 64 == l && (u[h / 4] = String.fromCharCode(a, o)), 64 == r && (u[h / 4] = String.fromCharCode(a));
			return r = u.join(""), t ? n.decode(r) : r
		}
	},
		n = {
			encode: function(e) {
				return e = e.replace(/[-߿]/g, function(e) {
					return e = e.charCodeAt(0), String.fromCharCode(192 | e >> 6, 128 | 63 & e)
				}), e = e.replace(/[ࠀ-￿]/g, function(e) {
					return e = e.charCodeAt(0), String.fromCharCode(224 | e >> 12, 128 | e >> 6 & 63, 128 | 63 & e)
				})
			},
			decode: function(e) {
				return e = e.replace(/[à-ï][-¿][-¿]/g, function(e) {
					return e = (15 & e.charCodeAt(0)) << 12 | (63 & e.charCodeAt(1)) << 6 | 63 & e.charCodeAt(2), String.fromCharCode(e)
				}), e = e.replace(/[À-ß][-¿]/g, function(e) {
					return e = (31 & e.charCodeAt(0)) << 6 | 63 & e.charCodeAt(1), String.fromCharCode(e)
				})
			}
		}
}(), jwplayer.events = {
	COMPLETE: "COMPLETE",
	ERROR: "ERROR",
	API_READY: "jwplayerAPIReady",
	JWPLAYER_READY: "jwplayerReady",
	JWPLAYER_FULLSCREEN: "jwplayerFullscreen",
	JWPLAYER_RESIZE: "jwplayerResize",
	JWPLAYER_ERROR: "jwplayerError",
	JWPLAYER_SETUP_ERROR: "jwplayerSetupError",
	JWPLAYER_MEDIA_BEFOREPLAY: "jwplayerMediaBeforePlay",
	JWPLAYER_MEDIA_BEFORECOMPLETE: "jwplayerMediaBeforeComplete",
	JWPLAYER_COMPONENT_SHOW: "jwplayerComponentShow",
	JWPLAYER_COMPONENT_HIDE: "jwplayerComponentHide",
	JWPLAYER_MEDIA_BUFFER: "jwplayerMediaBuffer",
	JWPLAYER_MEDIA_BUFFER_FULL: "jwplayerMediaBufferFull",
	JWPLAYER_MEDIA_ERROR: "jwplayerMediaError",
	JWPLAYER_MEDIA_LOADED: "jwplayerMediaLoaded",
	JWPLAYER_MEDIA_COMPLETE: "jwplayerMediaComplete",
	JWPLAYER_MEDIA_SEEK: "jwplayerMediaSeek",
	JWPLAYER_MEDIA_TIME: "jwplayerMediaTime",
	JWPLAYER_MEDIA_VOLUME: "jwplayerMediaVolume",
	JWPLAYER_MEDIA_META: "jwplayerMediaMeta",
	JWPLAYER_MEDIA_MUTE: "jwplayerMediaMute",
	JWPLAYER_MEDIA_LEVELS: "jwplayerMediaLevels",
	JWPLAYER_MEDIA_LEVEL_CHANGED: "jwplayerMediaLevelChanged",
	JWPLAYER_CAPTIONS_CHANGED: "jwplayerCaptionsChanged",
	JWPLAYER_CAPTIONS_LIST: "jwplayerCaptionsList",
	JWPLAYER_PLAYER_STATE: "jwplayerPlayerState",
	state: {
		BUFFERING: "BUFFERING",
		IDLE: "IDLE",
		PAUSED: "PAUSED",
		PLAYING: "PLAYING"
	},
	JWPLAYER_PLAYLIST_LOADED: "jwplayerPlaylistLoaded",
	JWPLAYER_PLAYLIST_ITEM: "jwplayerPlaylistItem",
	JWPLAYER_PLAYLIST_COMPLETE: "jwplayerPlaylistComplete",
	JWPLAYER_DISPLAY_CLICK: "jwplayerViewClick",
	JWPLAYER_CONTROLS: "jwplayerViewControls",
	JWPLAYER_USER_ACTION: "jwplayerUserAction",
	JWPLAYER_INSTREAM_CLICK: "jwplayerInstreamClicked",
	JWPLAYER_INSTREAM_DESTROYED: "jwplayerInstreamDestroyed",
	JWPLAYER_AD_TIME: "jwplayerAdTime",
	JWPLAYER_AD_ERROR: "jwplayerAdError",
	JWPLAYER_AD_CLICK: "jwplayerAdClicked",
	JWPLAYER_AD_COMPLETE: "jwplayerAdComplete",
	JWPLAYER_AD_IMPRESSION: "jwplayerAdImpression",
	JWPLAYER_AD_COMPANIONS: "jwplayerAdCompanions"
}, function(e) {
	var t = jwplayer.utils;
	e.eventdispatcher = function(e, i) {
		var n, a;
		this.resetEventListeners = function() {
			n = {}, a = []
		}, this.resetEventListeners(), this.addEventListener = function(e, a, o) {
			try {
				t.exists(n[e]) || (n[e] = []), "string" == t.typeOf(a) && (a = new Function("return " + a)()), n[e].push({
					listener: a,
					count: o
				})
			} catch (i) {
				t.log("error", i)
			}
			return !1
		}, this.removeEventListener = function(e, a) {
			if (n[e]) {
				try {
					for (var o = 0; o < n[e].length; o++) if (n[e][o].listener.toString() == a.toString()) {
						n[e].splice(o, 1);
						break
					}
				} catch (i) {
					t.log("error", i)
				}
				return !1
			}
		}, this.addGlobalListener = function(e, i) {
			try {
				"string" == t.typeOf(e) && (e = new Function("return " + e)()), a.push({
					listener: e,
					count: i
				})
			} catch (n) {
				t.log("error", n)
			}
			return !1
		}, this.removeGlobalListener = function(e) {
			if (e) {
				try {
					for (var i = 0; i < a.length; i++) if (a[i].listener.toString() == e.toString()) {
						a.splice(i, 1);
						break
					}
				} catch (n) {
					t.log("error", n)
				}
				return !1
			}
		}, this.sendEvent = function(o, s) {
			if (t.exists(s) || (s = {}), t.extend(s, {
				id: e,
				version: jwplayer.version,
				type: o
			}), i && t.log(o, s), "undefined" != t.typeOf(n[o])) for (var r = 0; r < n[o].length; r++) {
				try {
					n[o][r].listener(s)
				} catch (l) {
					t.log("There was an error while handling a listener: " + l.toString(), n[o][r].listener)
				}
				n[o][r] && (1 === n[o][r].count ? delete n[o][r] : 0 < n[o][r].count && (n[o][r].count -= 1))
			}
			for (r = 0; r < a.length; r++) {
				try {
					a[r].listener(s)
				} catch (c) {
					t.log("There was an error while handling a listener: " + c.toString(), a[r].listener)
				}
				a[r] && (1 === a[r].count ? delete a[r] : 0 < a[r].count && (a[r].count -= 1))
			}
		}
	}
}(jwplayer.events), function(e) {
	var t = {},
		i = {};
	e.plugins = function() {}, e.plugins.loadPlugins = function(n, a) {
		return i[n] = new e.plugins.pluginloader(new e.plugins.model(t), a), i[n]
	}, e.plugins.registerPlugin = function(i, n, a, o) {
		var s = e.utils.getPluginName(i);
		t[s] || (t[s] = new e.plugins.plugin(i)), t[s].registerPlugin(i, n, a, o)
	}
}(jwplayer), function(e) {
	e.plugins.model = function(t) {
		this.addPlugin = function(i) {
			var n = e.utils.getPluginName(i);
			return t[n] || (t[n] = new e.plugins.plugin(i)), t[n]
		}, this.getPlugins = function() {
			return t
		}
	}
}(jwplayer), function(e) {
	var t = jwplayer.utils,
		i = jwplayer.events;
	e.pluginmodes = {
		FLASH: 0,
		JAVASCRIPT: 1,
		HYBRID: 2
	}, e.plugin = function(n) {
		function a() {
			switch (t.getPluginPathType(n)) {
			case t.pluginPathType.ABSOLUTE:
				return n;
			case t.pluginPathType.RELATIVE:
				return t.getAbsolutePath(n, window.location.href)
			}
		}

		function o() {
			u = setTimeout(function() {
				d = t.loaderstatus.COMPLETE, h.sendEvent(i.COMPLETE)
			}, 1e3)
		}

		function s() {
			d = t.loaderstatus.ERROR, h.sendEvent(i.ERROR)
		}
		var r, l, c, u, d = t.loaderstatus.NEW,
			h = new i.eventdispatcher;
		t.extend(this, h), this.load = function() {
			if (d == t.loaderstatus.NEW) if (0 < n.lastIndexOf(".swf")) r = n, d = t.loaderstatus.COMPLETE, h.sendEvent(i.COMPLETE);
			else if (t.getPluginPathType(n) == t.pluginPathType.CDN) d = t.loaderstatus.COMPLETE, h.sendEvent(i.COMPLETE);
			else {
				d = t.loaderstatus.LOADING;
				var e = new t.scriptloader(a());
				e.addEventListener(i.COMPLETE, o), e.addEventListener(i.ERROR, s), e.load()
			}
		}, this.registerPlugin = function(e, n, a, o) {
			u && (clearTimeout(u), u = void 0), c = n, a && o ? (r = o, l = a) : "string" == typeof a ? r = a : "function" == typeof a ? l = a : !a && !o && (r = e), d = t.loaderstatus.COMPLETE, h.sendEvent(i.COMPLETE)
		}, this.getStatus = function() {
			return d
		}, this.getPluginName = function() {
			return t.getPluginName(n)
		}, this.getFlashPath = function() {
			if (r) switch (t.getPluginPathType(r)) {
			case t.pluginPathType.ABSOLUTE:
				return r;
			case t.pluginPathType.RELATIVE:
				return 0 < n.lastIndexOf(".swf") ? t.getAbsolutePath(r, window.location.href) : t.getAbsolutePath(r, a())
			}
			return null
		}, this.getJS = function() {
			return l
		}, this.getTarget = function() {
			return c
		}, this.getPluginmode = function() {
			return void 0 !== r && void 0 !== l ? e.pluginmodes.HYBRID : void 0 !== r ? e.pluginmodes.FLASH : void 0 !== l ? e.pluginmodes.JAVASCRIPT : void 0
		}, this.getNewInstance = function(e, t, i) {
			return new l(e, t, i)
		}, this.getURL = function() {
			return n
		}
	}
}(jwplayer.plugins), function(e) {
	var t = e.utils,
		i = e.events,
		n = t.foreach;
	e.plugins.pluginloader = function(a, o) {
		function s() {
			d ? p.sendEvent(i.ERROR, {
				message: l
			}) : u || (u = !0, c = t.loaderstatus.COMPLETE, p.sendEvent(i.COMPLETE))
		}

		function r() {
			if (h || s(), !u && !d) {
				var i = 0,
					n = a.getPlugins();
				t.foreach(h, function(a) {
					a = t.getPluginName(a);
					var o = n[a];
					a = o.getJS();
					var r = o.getTarget();
					(o = o.getStatus()) == t.loaderstatus.LOADING || o == t.loaderstatus.NEW ? i++ : a && (!r || parseFloat(r) > parseFloat(e.version)) && (d = !0, l = "Incompatible player version", s())
				}), 0 == i && s()
			}
		}
		var l, c = t.loaderstatus.NEW,
			u = !1,
			d = !1,
			h = o,
			p = new i.eventdispatcher;
		t.extend(this, p), this.setupPlugins = function(e, i, o) {
			var s = {
				length: 0,
				plugins: {}
			},
				r = 0,
				l = {},
				c = a.getPlugins();
			return n(i.plugins, function(n, a) {
				var u = t.getPluginName(n),
					d = c[u],
					h = d.getFlashPath(),
					p = d.getJS(),
					f = d.getURL();
				h && (s.plugins[h] = t.extend({}, a), s.plugins[h].pluginmode = d.getPluginmode(), s.length++);
				try {
					if (p && i.plugins && i.plugins[f]) {
						var g = document.createElement("div");
						g.id = e.id + "_" + u, g.style.position = "absolute", g.style.top = 0, g.style.zIndex = r + 10, l[u] = d.getNewInstance(e, t.extend({}, i.plugins[f]), g), r++, e.onReady(o(l[u], g, !0)), e.onResize(o(l[u], g))
					}
				} catch (m) {
					t.log("ERROR: Failed to load " + u + ".")
				}
			}), e.plugins = l, s
		}, this.load = function() {
			if (!t.exists(o) || "object" == t.typeOf(o)) {
				c = t.loaderstatus.LOADING, n(o, function(e) {
					t.exists(e) && ((e = a.addPlugin(e)).addEventListener(i.COMPLETE, r), e.addEventListener(i.ERROR, f))
				});
				var e = a.getPlugins();
				n(e, function(e, t) {
					t.load()
				})
			}
			r()
		};
		var f = this.pluginFailed = function() {
				d || (d = !0, l = "File not found", s())
			};
		this.getStatus = function() {
			return c
		}
	}
}(jwplayer), jwplayer, jwplayer.parsers = {
	localName: function(e) {
		return e ? e.localName ? e.localName : e.baseName ? e.baseName : "" : ""
	},
	textContent: function(e) {
		return e ? e.textContent ? e.textContent : e.text ? e.text : "" : ""
	},
	getChildNode: function(e, t) {
		return e.childNodes[t]
	},
	numChildren: function(e) {
		return e.childNodes ? e.childNodes.length : 0
	}
}, function(e) {
	var t = e.parsers;
	(t.jwparser = function() {}).parseEntry = function(i, n) {
		for (var a = [], o = [], s = e.utils.xmlAttribute, r = 0; r < i.childNodes.length; r++) {
			var l = i.childNodes[r];
			if ("jwplayer" == l.prefix) {
				var c = t.localName(l);
				"source" == c ? (delete n.sources, a.push({
					file: s(l, "file"),
					"default": s(l, "default"),
					label: s(l, "label"),
					type: s(l, "type")
				})) : "track" == c ? (delete n.tracks, o.push({
					file: s(l, "file"),
					"default": s(l, "default"),
					kind: s(l, "kind"),
					label: s(l, "label")
				})) : (n[c] = e.utils.serialize(t.textContent(l)), "file" == c && n.sources && delete n.sources)
			}
			n.file || (n.file = n.link)
		}
		if (a.length) for (n.sources = [], r = 0; r < a.length; r++) 0 < a[r].file.length && (a[r]["default"] = "true" == a[r]["default"], a[r].label.length || delete a[r].label, n.sources.push(a[r]));
		if (o.length) for (n.tracks = [], r = 0; r < o.length; r++) 0 < o[r].file.length && (o[r]["default"] = "true" == o[r]["default"], o[r].kind = o[r].kind.length ? o[r].kind : "captions", o[r].label.length || delete o[r].label, n.tracks.push(o[r]));
		return n
	}
}(jwplayer), function(e) {
	var t = jwplayer.utils,
		i = t.xmlAttribute,
		n = e.localName,
		a = e.textContent,
		o = e.numChildren,
		s = e.mediaparser = function() {};
	s.parseGroup = function(e, r) {
		var l, c, u = [];
		for (c = 0; c < o(e); c++) if ("media" == (l = e.childNodes[c]).prefix && n(l)) switch (n(l).toLowerCase()) {
		case "content":
			i(l, "duration") && (r.duration = t.seconds(i(l, "duration"))), 0 < o(l) && (r = s.parseGroup(l, r)), i(l, "url") && (r.sources || (r.sources = []), r.sources.push({
				file: i(l, "url"),
				type: i(l, "type"),
				width: i(l, "width"),
				label: i(l, "label")
			}));
			break;
		case "title":
			r.title = a(l);
			break;
		case "description":
			r.description = a(l);
			break;
		case "guid":
			r.mediaid = a(l);
			break;
		case "thumbnail":
			r.image || (r.image = i(l, "url"));
			break;
		case "group":
			s.parseGroup(l, r);
			break;
		case "subtitle":
			var d = {};
			if (d.file = i(l, "url"), d.kind = "captions", 0 < i(l, "lang").length) {
				var h = d,
					p = {
						zh: "Chinese",
						nl: "Dutch",
						en: "English",
						fr: "French",
						de: "German",
						it: "Italian",
						ja: "Japanese",
						pt: "Portuguese",
						ru: "Russian",
						es: "Spanish"
					};
				l = p[l = i(l, "lang")] ? p[l] : l, h.label = l
			}
			u.push(d)
		}
		for (r.hasOwnProperty("tracks") || (r.tracks = []), c = 0; c < u.length; c++) r.tracks.push(u[c]);
		return r
	}
}(jwplayer.parsers), function(e) {
	function t(t) {
		for (var a = {}, o = 0; o < t.childNodes.length; o++) {
			var r = t.childNodes[o],
				l = s(r);
			if (l) switch (l.toLowerCase()) {
			case "enclosure":
				a.file = i.xmlAttribute(r, "url");
				break;
			case "title":
				a.title = n(r);
				break;
			case "guid":
				a.mediaid = n(r);
				break;
			case "pubdate":
				a.date = n(r);
				break;
			case "description":
				a.description = n(r);
				break;
			case "link":
				a.link = n(r);
				break;
			case "category":
				a.tags = a.tags ? a.tags + n(r) : n(r)
			}
		}
		return a = e.mediaparser.parseGroup(t, a), a = e.jwparser.parseEntry(t, a), new jwplayer.playlist.item(a)
	}
	var i = jwplayer.utils,
		n = e.textContent,
		a = e.getChildNode,
		o = e.numChildren,
		s = e.localName;
	e.rssparser = {}, e.rssparser.parse = function(e) {
		for (var i = [], n = 0; n < o(e); n++) {
			var r = a(e, n);
			if ("channel" == s(r).toLowerCase()) for (var l = 0; l < o(r); l++) {
				var c = a(r, l);
				"item" == s(c).toLowerCase() && i.push(t(c))
			}
		}
		return i
	}
}(jwplayer.parsers), function(e) {
	e.playlist = function(t) {
		var i = [];
		if ("array" == e.utils.typeOf(t)) for (var n = 0; n < t.length; n++) i.push(new e.playlist.item(t[n]));
		else i.push(new e.playlist.item(t));
		return i
	}
}(jwplayer), function(e) {
	var t = e.item = function(i) {
			var n = jwplayer.utils,
				a = n.extend({}, t.defaults, i);
			a.tracks = i && n.exists(i.tracks) ? i.tracks : [], 0 == a.sources.length && (a.sources = [new e.source(a)]);
			for (var o = 0; o < a.sources.length; o++) {
				var s = a.sources[o]["default"];
				a.sources[o]["default"] = !! s && "true" == s.toString(), a.sources[o] = new e.source(a.sources[o])
			}
			if (a.captions && !n.exists(i.tracks)) {
				for (i = 0; i < a.captions.length; i++) a.tracks.push(a.captions[i]);
				delete a.captions
			}
			for (o = 0; o < a.tracks.length; o++) a.tracks[o] = new e.track(a.tracks[o]);
			return a
		};
	t.defaults = {
		description: "",
		image: "",
		mediaid: "",
		title: "",
		sources: [],
		tracks: []
	}
}(jwplayer.playlist), function(e) {
	var t = jwplayer,
		i = t.utils,
		n = t.events,
		a = t.parsers;
	e.loader = function() {
		function t(t) {
			try {
				var i = t.responseXML.childNodes;
				t = "";
				for (var o = 0; o < i.length && 8 == (t = i[o]).nodeType; o++);
				if ("xml" == a.localName(t) && (t = t.nextSibling), "rss" != a.localName(t)) s("Not a valid RSS feed");
				else {
					var l = new e(a.rssparser.parse(t));
					r.sendEvent(n.JWPLAYER_PLAYLIST_LOADED, {
						playlist: l
					})
				}
			} catch (c) {
				s()
			}
		}

		function o(e) {
			s(e.match(/invalid/i) ? "Not a valid RSS feed" : "")
		}

		function s(e) {
			r.sendEvent(n.JWPLAYER_ERROR, {
				message: e || "Error loading file"
			})
		}
		var r = new n.eventdispatcher;
		i.extend(this, r), this.load = function(e) {
			i.ajax(e, t, o)
		}
	}
}(jwplayer.playlist), function(e) {
	var t = jwplayer.utils,
		i = {
			file: void 0,
			label: void 0,
			type: void 0,
			"default": void 0
		};
	e.source = function(e) {
		var n = t.extend({}, i);
		return t.foreach(i, function(i) {
			t.exists(e[i]) && (n[i] = e[i], delete e[i])
		}), n.type && 0 < n.type.indexOf("/") && (n.type = t.extensionmap.mimeType(n.type)), "m3u8" == n.type && (n.type = "hls"), "smil" == n.type && (n.type = "rtmp"), n
	}
}(jwplayer.playlist), function(e) {
	var t = jwplayer.utils,
		i = {
			file: void 0,
			label: void 0,
			kind: "captions",
			"default": !1
		};
	e.track = function(e) {
		var n = t.extend({}, i);
		return e || (e = {}), t.foreach(i, function(i) {
			t.exists(e[i]) && (n[i] = e[i], delete e[i])
		}), n
	}
}(jwplayer.playlist), function(e) {
	var t = e.utils,
		i = e.events,
		n = !0,
		a = !1,
		o = document,
		r = e.embed = function(l) {
			function c(e, i) {
				t.foreach(i, function(t, i) {
					"function" == typeof e[t] && e[t].call(e, i)
				})
			}

			function u() {
				if (b.sitecatalyst) try {
					null != s && s.hasOwnProperty("Media") || p()
				} catch (o) {
					return void p()
				}
				if ("array" == t.typeOf(b.playlist) && 2 > b.playlist.length && (0 == b.playlist.length || !b.playlist[0].sources || 0 == b.playlist[0].sources.length)) h();
				else if (!x) if ("string" == t.typeOf(b.playlist)) {
					var f = new e.playlist.loader;
					f.addEventListener(i.JWPLAYER_PLAYLIST_LOADED, function(e) {
						b.playlist = e.playlist, x = a, u()
					}), f.addEventListener(i.JWPLAYER_ERROR, function(e) {
						x = a, h(e)
					}), x = n, f.load(b.playlist)
				} else if (C.getStatus() == t.loaderstatus.COMPLETE) {
					for (f = 0; f < b.modes.length; f++) if (b.modes[f].type && r[b.modes[f].type]) {
						var v = t.extend({}, b),
							w = new r[b.modes[f].type](m, b.modes[f], v, C, l);
						if (w.supportsConfig()) return w.addEventListener(i.ERROR, d), w.embed(), c(l, v.events), l
					}
					if (b.fallback) {
						var _ = "No suitable players found and fallback enabled";
						E = setTimeout(function() {
							g(_, n)
						}, 10), t.log(_), new r.download(m, b, h)
					} else _ = "No suitable players found and fallback disabled", g(_, a), t.log(_), m.parentNode.replaceChild(y, m)
				}
			}

			function d(e) {
				f(m, k + e.message)
			}

			function h(e) {
				e && e.message ? f(m, "Error loading playlist: " + e.message) : f(m, k + "No playable sources found")
			}

			function p() {
				f(m, "Adobe SiteCatalyst Error: Could not find Media Module")
			}

			function f(e, i) {
				if (b.fallback) {
					var o = e.style;
					o.backgroundColor = "#000", o.color = "#FFF", o.width = t.styleDimension(b.width), o.height = t.styleDimension(b.height), o.display = "table", o.opacity = 1;
					var s = (o = document.createElement("p")).style;
					s.verticalAlign = "middle", s.textAlign = "center", s.display = "table-cell", s.font = "15px/20px Arial, Helvetica, sans-serif", o.innerHTML = i.replace(":", ":<br>"), e.innerHTML = "", e.appendChild(o), g(i, n)
				} else g(i, a)
			}

			function g(e, t) {
				E && (clearTimeout(E), E = null), l.dispatchEvent(i.JWPLAYER_SETUP_ERROR, {
					message: e,
					fallback: t
				})
			}
			var m, v, y, b = new r.config(l.config),
				w = b.width,
				_ = b.height,
				k = "Error loading player: ",
				C = e.plugins.loadPlugins(l.id, b.plugins),
				x = a,
				E = null;
			return b.fallbackDiv && (y = b.fallbackDiv, delete b.fallbackDiv), b.id = l.id, v = o.getElementById(l.id), b.aspectratio ? l.config.aspectratio = b.aspectratio : delete l.config.aspectratio, m = o.createElement("div"), m.id = v.id, m.style.width = 0 < w.toString().indexOf("%") ? w : w + "px", m.style.height = 0 < _.toString().indexOf("%") ? _ : _ + "px", v.parentNode.replaceChild(m, v), e.embed.errorScreen = f, C.addEventListener(i.COMPLETE, u), C.addEventListener(i.ERROR, function(e) {
				f(m, "Could not load plugins: " + e.message)
			}), C.load(), l
		}
}(jwplayer), function(e) {
	function t(e) {
		if (e.playlist) for (var t = 0; t < e.playlist.length; t++) e.playlist[t] = new a(e.playlist[t]);
		else {
			var o = {};
			n.foreach(a.defaults, function(t) {
				i(e, o, t)
			}), o.sources || (e.levels ? (o.sources = e.levels, delete e.levels) : (t = {}, i(e, t, "file"), i(e, t, "type"), o.sources = t.file ? [t] : [])), e.playlist = [new a(o)]
		}
	}

	function i(e, t, i) {
		n.exists(e[i]) && (t[i] = e[i], delete e[i])
	}
	var n = e.utils,
		a = e.playlist.item;
	(e.embed.config = function(i) {
		a = {
			fallback: !0,
			height: 270,
			primary: "html5",
			width: 480,
			base: i.base ? i.base : n.getScriptPath("jwplayer.js"),
			aspectratio: ""
		};
		i = n.extend(a, e.defaults, i);
		var a = {
			type: "html5",
			src: "http://www.huawei.com/minisite/jwplayer/jwplayer.html5.js"
		},
			o = {
				type: "flash",
				src: i.base + "jwplayer.flash.swf"
			};
		if (i.modes = "flash" == i.primary ? [o, a] : [a, o], i.listbar && (i.playlistsize = i.listbar.size, i.playlistposition = i.listbar.position, i.playlistlayout = i.listbar.layout), i.flashplayer && (o.src = i.flashplayer), i.html5player && (a.src = i.html5player), t(i), "string" == typeof(o = i.aspectratio) && n.exists(o)) {
			var s = o.indexOf(":"); - 1 == s ? a = 0 : (a = parseFloat(o.substr(0, s)), o = parseFloat(o.substr(s + 1)), a = 0 >= a || 0 >= o ? 0 : o / a * 100 + "%")
		} else a = 0;
		return -1 == i.width.toString().indexOf("%") ? delete i.aspectratio : a ? i.aspectratio = a : delete i.aspectratio, i
	}).addConfig = function(e, i) {
		return t(i), n.extend(e, i)
	}
}(jwplayer), function(e) {
	var t = e.utils,
		i = document;
	e.embed.download = function(e, n, a) {
		function o(e, n) {
			for (var a = i.querySelectorAll(e), o = 0; o < a.length; o++) t.foreach(n, function(e, t) {
				a[o].style[e] = t
			})
		}

		function s(e, t, n) {
			return e = i.createElement(e), t && (e.className = "jwdownload" + t), n && n.appendChild(e), e
		}
		var r, l = t.extend({}, n),
			c = l.width ? l.width : 480,
			u = l.height ? l.height : 320;
		n = n.logo ? n.logo : {
			prefix: t.repo(),
			file: "logo.png",
			margin: 10
		};
		var d, h, p, f, g = ["mp4", "aac", "mp3"];
		if ((l = l.playlist) && l.length) {
			for (r = (f = l[0]).sources, l = 0; l < r.length; l++) {
				var m = r[l],
					v = m.type ? m.type : t.extensionmap.extType(t.extension(m.file));
				m.file && t.foreach(g, function(e) {
					v == g[e] ? (d = m.file, h = f.image) : t.isYouTube(m.file) && (p = m.file)
				})
			}
			d ? (r = d, a = h, e && (l = s("a", "display", e), s("div", "icon", l), s("div", "logo", l), r && l.setAttribute("href", t.getAbsolutePath(r))), l = "#" + e.id + " .jwdownload", e.style.width = "", e.style.height = "", o(l + "display", {
				width: t.styleDimension(Math.max(320, c)),
				height: t.styleDimension(Math.max(180, u)),
				background: "black center no-repeat " + (a ? "url(" + a + ")" : ""),
				backgroundSize: "contain",
				position: "relative",
				border: "none",
				display: "block"
			}), o(l + "display div", {
				position: "absolute",
				width: "100%",
				height: "100%"
			}), o(l + "logo", {
				top: n.margin + "px",
				right: n.margin + "px",
				background: "top right no-repeat url(" + n.prefix + n.file + ")"
			}), o(l + "icon", {
				background: "center no-repeat url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAgNJREFUeNrs28lqwkAYB/CZqNVDDj2r6FN41QeIy8Fe+gj6BL275Q08u9FbT8ZdwVfotSBYEPUkxFOoks4EKiJdaDuTjMn3wWBO0V/+sySR8SNSqVRKIR8qaXHkzlqS9jCfzzWcTCYp9hF5o+59sVjsiRzcegSckFzcjT+ruN80TeSlAjCAAXzdJSGPFXRpAAMYwACGZQkSdhG4WCzehMNhqV6vG6vVSrirKVEw66YoSqDb7cqlUilE8JjHd/y1MQefVzqdDmiaJpfLZWHgXMHn8F6vJ1cqlVAkEsGuAn83J4gAd2RZymQygX6/L1erVQt+9ZPWb+CDwcCC2zXGJaewl/DhcHhK3DVj+KfKZrMWvFarcYNLomAv4aPRSFZVlTlcSPA5fDweW/BoNIqFnKV53JvncjkLns/n/cLdS+92O7RYLLgsKfv9/t8XlDn4eDyiw+HA9Jyz2eyt0+kY2+3WFC5hluej0Ha7zQQq9PPwdDq1Et1sNsx/nFBgCqWJ8oAK1aUptNVqcYWewE4nahfU0YQnk4ntUEfGMIU2m01HoLaCKbTRaDgKtaVLk9tBYaBcE/6Artdr4RZ5TB6/dC+9iIe/WgAMYADDpAUJAxjAAAYwgGFZgoS/AtNNTF7Z2bL0BYPBV3Jw5xFwwWcYxgtBP5OkE8i9G7aWGOOCruvauwADALMLMEbKf4SdAAAAAElFTkSuQmCC)"
			})) : p ? (n = p, e = s("embed", "", e), e.src = "http://www.youtube.com/v/" + t.youTubeID(n), e.type = "application/x-shockwave-flash", e.width = c, e.height = u) : a()
		}
	}
}(jwplayer), function(e) {
	var t = e.utils,
		i = e.events,
		n = {};
	(e.embed.flash = function(o, s, r, l, c) {
		function u(e, t, i) {
			var n = document.createElement("param");
			n.setAttribute("name", t), n.setAttribute("value", i), e.appendChild(n)
		}

		function d(t, i, n) {
			return function() {
				try {
					n && document.getElementById(c.id + "_wrapper").appendChild(i);
					var a = document.getElementById(c.id).getPluginConfig("display");
					"function" == typeof t.resize && t.resize(a.width, a.height), i.style.left = a.x, i.style.top = a.h
				} catch (e) {}
			}
		}

		function h(e) {
			if (!e) return {};
			var i = {},
				n = [];
			return t.foreach(e, function(e, a) {
				var o = t.getPluginName(e);
				n.push(e), t.foreach(a, function(e, t) {
					i[o + "." + e] = t
				})
			}), i.plugins = n.join(","), i
		}
		var p = new e.events.eventdispatcher,
			f = t.flashVersion();
		t.extend(this, p), this.embed = function() {
			if (r.id = c.id, 10 > f) return p.sendEvent(i.ERROR, {
				message: "Flash version must be 10.0 or greater"
			}), !1;
			var e, a, g = c.config.listbar,
				m = t.extend({}, r);
			if (o.id + "_wrapper" == o.parentNode.id) e = document.getElementById(o.id + "_wrapper");
			else {
				if (e = document.createElement("div"), a = document.createElement("div"), a.style.display = "none", a.id = o.id + "_aspect", e.id = o.id + "_wrapper", e.style.position = "relative", e.style.display = "block", e.style.width = t.styleDimension(m.width), e.style.height = t.styleDimension(m.height), c.config.aspectratio) {
					var v = parseFloat(c.config.aspectratio);
					a.style.display = "block", a.style.marginTop = c.config.aspectratio, e.style.height = "auto", e.style.display = "inline-block", g && ("bottom" == g.position ? a.style.paddingBottom = g.size + "px" : "right" == g.position && (a.style.marginBottom = -1 * g.size * (v / 100) + "px"))
				}
				o.parentNode.replaceChild(e, o), e.appendChild(o), e.appendChild(a)
			}
			for (0 < (e = l.setupPlugins(c, m, d)).length ? t.extend(m, h(e.plugins)) : delete m.plugins, "undefined" != typeof m["dock.position"] && "false" == m["dock.position"].toString().toLowerCase() && (m.dock = m["dock.position"], delete m["dock.position"]), e = m.wmode ? m.wmode : m.height && 40 >= m.height ? "transparent" : "opaque", a = "height width modes events primary base fallback volume".split(" "), g = 0; g < a.length; g++) delete m[a[g]];
			a = t.getCookies(), t.foreach(a, function(e, t) {
				"undefined" == typeof m[e] && (m[e] = t)
			}), (a = window.location.href.split("/")).splice(a.length - 1, 1), a = a.join("/"), m.base = a + "/", n[o.id] = m, t.isIE() ? (a = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" " width="100%" height="100%"id="' + o.id + '" name="' + o.id + '" tabindex=0"">', a += '<param name="movie" value="' + s.src + '">', a += '<param name="allowfullscreen" value="true"><param name="allowscriptaccess" value="always">', a += '<param name="seamlesstabbing" value="true">', a += '<param name="wmode" value="' + e + '">', a += '<param name="bgcolor" value="#000000">', a += "</object>", o.outerHTML = a, e = document.getElementById(o.id)) : ((a = document.createElement("object")).setAttribute("type", "application/x-shockwave-flash"), a.setAttribute("data", s.src), a.setAttribute("width", "100%"), a.setAttribute("height", "100%"), a.setAttribute("bgcolor", "#000000"), a.setAttribute("id", o.id), a.setAttribute("name", o.id), a.setAttribute("tabindex", 0), u(a, "allowfullscreen", "true"), u(a, "allowscriptaccess", "always"), u(a, "seamlesstabbing", "true"), u(a, "wmode", e), o.parentNode.replaceChild(a, o), e = a), c.config.aspectratio && (e.style.position = "absolute"), c.container = e, c.setPlayer(e, "flash")
		}, this.supportsConfig = function() {
			if (f) {
				if (!r) return !0;
				if ("string" == t.typeOf(r.playlist)) return !0;
				try {
					var e = r.playlist[0].sources;
					if (void 0 === e) return !0;
					for (var i = 0; i < e.length; i++) if (e[i].file && a(e[i].file, e[i].type)) return !0
				} catch (o) {}
			}
			return !1
		}
	}).getVars = function(e) {
		return n[e]
	};
	var a = e.embed.flashCanPlay = function(e, i) {
			if (t.isYouTube(e) || t.isRtmp(e, i) || "hls" == i) return !0;
			var n = t.extensionmap[i || t.extension(e)];
			return !!n && !! n.flash
		}
}(jwplayer), function(e) {
	var t = e.utils,
		i = t.extensionmap,
		n = e.events;
	e.embed.html5 = function(a, o, s, r, l) {
		function c(e, t, i) {
			return function() {
				try {
					var n = document.querySelector("#" + a.id + " .jwmain");
					i && n.appendChild(t), "function" == typeof e.resize && (e.resize(n.clientWidth, n.clientHeight), setTimeout(function() {
						e.resize(n.clientWidth, n.clientHeight)
					}, 400)), t.left = n.style.left, t.top = n.style.top
				} catch (o) {}
			}
		}

		function u(e) {
			d.sendEvent(e.type, {
				message: "HTML5 player not found"
			})
		}
		var d = this,
			h = new n.eventdispatcher;
		t.extend(d, h), d.embed = function() {
			if (e.html5) {
				r.setupPlugins(l, s, c), a.innerHTML = "";
				var i = e.utils.extend({}, s);
				delete i.volume, i = new e.html5.player(i), l.container = document.getElementById(l.id), l.setPlayer(i, "html5")
			} else(i = new t.scriptloader(o.src)).addEventListener(n.ERROR, u), i.addEventListener(n.COMPLETE, d.embed), i.load()
		}, d.supportsConfig = function() {
			if (e.vid.canPlayType) try {
				if ("string" == t.typeOf(s.playlist)) return !0;
				for (var n = s.playlist[0].sources, a = 0; a < n.length; a++) {
					var o, r = n[a].file,
						l = n[a].type;
					if (null !== navigator.userAgent.match(/BlackBerry/i) || t.isAndroid() && ("m3u" == t.extension(r) || "m3u8" == t.extension(r)) || t.isRtmp(r, l)) o = !1;
					else {
						var c, u = i[l || t.extension(r)];
						if (!u || u.flash && !u.html5) c = !1;
						else {
							var d = u.html5,
								h = e.vid;
							if (d) try {
								c = !! h.canPlayType(d)
							} catch (p) {
								c = !1
							} else c = !0
						}
						o = c
					}
					if (o) return !0
				}
			} catch (f) {}
			return !1
		}
	}
}(jwplayer), function(e) {
	var t = e.embed,
		i = e.utils,
		n = i.extend(function(n) {
			var a = i.repo(),
				o = i.extend({}, e.defaults),
				s = i.extend({}, o, n.config),
				r = n.config,
				l = s.plugins,
				c = s.analytics,
				u = a + "jwpsrv.js",
				d = a + "sharing.js",
				h = a + "related.js",
				p = a + "gapro.js",
				o = e.key ? e.key : o.key,
				f = new e.utils.key(o).edition(),
				l = l || {};
			switch ("ads" == f && s.advertising && (s.advertising.client.match(".js$|.swf$") ? l[s.advertising.client] = s.advertising : l[a + s.advertising.client + ".js"] = s.advertising), delete r.advertising, r.key = o, s.analytics && s.analytics.client && s.analytics.client.match(".js$|.swf$") && (u = s.analytics.client), delete r.analytics, "free" != f && c && !1 === c.enabled || (l[u] = c || {}), delete l.sharing, delete l.related, f) {
			case "premium":
			case "ads":
				s.related && (s.related.client && s.related.client.match(".js$|.swf$") && (h = s.related.client), l[h] = s.related), s.ga && (s.ga.client && s.ga.client.match(".js$|.swf$") && (p = s.ga.client), l[p] = s.ga), r.sitecatalyst && new e.embed.sitecatalyst(n);
			case "pro":
				s.sharing && (s.sharing.client && s.sharing.client.match(".js$|.swf$") && (d = s.sharing.client), l[d] = s.sharing), s.skin && (r.skin = s.skin.replace(/^(beelden|bekle|five|glow|modieus|roundster|stormtrooper|vapor)$/i, i.repo() + "skins/$1.xml"))
			}
			return r.plugins = l, new t(n)
		}, t);
	e.embed = n
}(jwplayer), function(e) {
	var t = jwplayer.utils;
	e.sitecatalyst = function(e) {
		function i(e) {
			h.debug && t.log(e)
		}

		function n(e) {
			return e = e.split("/"), e = e[e.length - 1], (e = e.split("?"))[0]
		}

		function a() {
			if (!f) {
				f = !0;
				var e = d.getPosition();
				i("stop: " + r + " : " + e), s.Media.stop(r, e)
			}
		}

		function o() {
			g || (a(), g = !0, i("close: " + r), s.Media.close(r), u = !0, c = 0)
		}
		var r, l, c, u, d = e,
			h = t.extend({}, d.config.sitecatalyst),
			p = {
				onPlay: function() {
					if (!u) {
						var e = d.getPosition();
						f = !1, i("play: " + r + " : " + e), s.Media.play(r, e)
					}
				},
				onPause: a,
				onBuffer: a,
				onIdle: o,
				onPlaylistItem: function(e) {
					try {
						u = !0, o(), c = 0;
						var a;
						if (h.mediaName) a = h.mediaName;
						else {
							var s = d.getPlaylistItem(e.index);
							a = s.title ? s.title : s.file ? n(s.file) : s.sources && s.sources.length ? n(s.sources[0].file) : ""
						}
						r = a, l = h.playerName ? h.playerName : d.id
					} catch (i) {
						t.log(i)
					}
				},
				onTime: function() {
					if (u) {
						var e = d.getDuration();
						if (-1 == e) return;
						g = f = u = !1, i("open: " + r + " : " + e + " : " + l), s.Media.open(r, e, l), i("play: " + r + " : 0"), s.Media.play(r, 0)
					}
					if (e = d.getPosition(), 3 <= Math.abs(e - c)) {
						var t = c;
						i("seek: " + t + " to " + e), i("stop: " + r + " : " + t), s.Media.stop(r, t), i("play: " + r + " : " + e), s.Media.play(r, e)
					}
					c = e
				},
				onComplete: o
			},
			f = !0,
			g = !0;
		t.foreach(p, function(e) {
			d[e](p[e])
		})
	}
}(jwplayer.embed), function(e) {
	var t = [],
		i = e.utils,
		n = e.events,
		a = n.state,
		o = document,
		s = e.api = function(t) {
			function r(e, t) {
				return function(i) {
					return t(e, i)
				}
			}

			function l(e, t) {
				return f[e] || (f[e] = [], u(n.JWPLAYER_PLAYER_STATE, function(t) {
					var i = t.newstate;
					if (t = t.oldstate, i == e) {
						var n = f[i];
						if (n) for (var a = 0; a < n.length; a++)"function" == typeof n[a] && n[a].call(this, {
							oldstate: t,
							newstate: i
						})
					}
				})), f[e].push(t), h
			}

			function c(e, t) {
				try {
					e.jwAddEventListener(t, 'function(dat) { jwplayer("' + h.id + '").dispatchEvent("' + t + '", dat); }')
				} catch (r) {
					i.log("Could not add internal listener")
				}
			}

			function u(e, t) {
				return p[e] || (p[e] = [], g && m && c(g, e)), p[e].push(t), h
			}

			function d() {
				if (m) {
					for (var e = arguments[0], t = [], i = 1; i < arguments.length; i++) t.push(arguments[i]);
					if (void 0 !== g && "function" == typeof g[e]) switch (t.length) {
					case 4:
						return g[e](t[0], t[1], t[2], t[3]);
					case 3:
						return g[e](t[0], t[1], t[2]);
					case 2:
						return g[e](t[0], t[1]);
					case 1:
						return g[e](t[0]);
					default:
						return g[e]()
					}
					return null
				}
				v.push(arguments)
			}
			var h = this,
				p = {},
				f = {},
				g = void 0,
				m = !1,
				v = [],
				y = void 0,
				b = {},
				w = {};
			h.container = t, h.id = t.id, h.getBuffer = function() {
				return d("jwGetBuffer")
			}, h.getContainer = function() {
				return h.container
			}, h.addButton = function(e, t, n, a) {
				try {
					w[a] = n, d("jwDockAddButton", e, t, "jwplayer('" + h.id + "').callback('" + a + "')", a)
				} catch (o) {
					i.log("Could not add dock button" + o.message)
				}
			}, h.removeButton = function(e) {
				d("jwDockRemoveButton", e)
			}, h.callback = function(e) {
				w[e] && w[e]()
			}, h.forceState = function(e) {
				return d("jwForceState", e), h
			}, h.releaseState = function() {
				return d("jwReleaseState")
			}, h.getDuration = function() {
				return d("jwGetDuration")
			}, h.getFullscreen = function() {
				return d("jwGetFullscreen")
			}, h.getHeight = function() {
				return d("jwGetHeight")
			}, h.getLockState = function() {
				return d("jwGetLockState")
			}, h.getMeta = function() {
				return h.getItemMeta()
			}, h.getMute = function() {
				return d("jwGetMute")
			}, h.getPlaylist = function() {
				var e = d("jwGetPlaylist");
				return "flash" == h.renderingMode && i.deepReplaceKeyName(e, ["__dot__", "__spc__", "__dsh__", "__default__"], [".", " ", "-", "default"]), e
			}, h.getPlaylistItem = function(e) {
				return i.exists(e) || (e = h.getPlaylistIndex()), h.getPlaylist()[e]
			}, h.getPlaylistIndex = function() {
				return d("jwGetPlaylistIndex")
			}, h.getPosition = function() {
				return d("jwGetPosition")
			}, h.getRenderingMode = function() {
				return h.renderingMode
			}, h.getState = function() {
				return d("jwGetState")
			}, h.getVolume = function() {
				return d("jwGetVolume")
			}, h.getWidth = function() {
				return d("jwGetWidth")
			}, h.setFullscreen = function(e) {
				return i.exists(e) ? d("jwSetFullscreen", e) : d("jwSetFullscreen", !d("jwGetFullscreen")), h
			}, h.setMute = function(e) {
				return i.exists(e) ? d("jwSetMute", e) : d("jwSetMute", !d("jwGetMute")), h
			}, h.lock = function() {
				return h
			}, h.unlock = function() {
				return h
			}, h.load = function(e) {
				return d("jwLoad", e), h
			}, h.playlistItem = function(e) {
				return d("jwPlaylistItem", parseInt(e)), h
			}, h.playlistPrev = function() {
				return d("jwPlaylistPrev"), h
			}, h.playlistNext = function() {
				return d("jwPlaylistNext"), h
			}, h.resize = function(e, t) {
				if ("flash" != h.renderingMode)(n = document.getElementById(h.id)).className = n.className.replace(/\s+aspectMode/, ""), n.style.display = "block", d("jwResize", e, t);
				else {
					var n = o.getElementById(h.id + "_wrapper"),
						a = o.getElementById(h.id + "_aspect");
					a && (a.style.display = "none"), n && (n.style.display = "block", n.style.width = i.styleDimension(e), n.style.height = i.styleDimension(t))
				}
				return h
			}, h.play = function(e) {
				return void 0 === e ? (e = h.getState(), d(e == a.PLAYING || e == a.BUFFERING ? "jwPause" : "jwPlay")) : d("jwPlay", e), h
			}, h.pause = function(e) {
				return void 0 === e ? (e = h.getState(), d(e == a.PLAYING || e == a.BUFFERING ? "jwPause" : "jwPlay")) : d("jwPause", e), h
			}, h.stop = function() {
				return d("jwStop"), h
			}, h.seek = function(e) {
				return d("jwSeek", e), h
			}, h.setVolume = function(e) {
				return d("jwSetVolume", e), h
			}, h.loadInstream = function(e, t) {
				return y = new s.instream(this, g, e, t)
			}, h.getQualityLevels = function() {
				return d("jwGetQualityLevels")
			}, h.getCurrentQuality = function() {
				return d("jwGetCurrentQuality")
			}, h.setCurrentQuality = function(e) {
				d("jwSetCurrentQuality", e)
			}, h.getCaptionsList = function() {
				return d("jwGetCaptionsList")
			}, h.getCurrentCaptions = function() {
				return d("jwGetCurrentCaptions")
			}, h.setCurrentCaptions = function(e) {
				d("jwSetCurrentCaptions", e)
			}, h.getControls = function() {
				return d("jwGetControls")
			}, h.getSafeRegion = function() {
				return d("jwGetSafeRegion")
			}, h.setControls = function(e) {
				d("jwSetControls", e)
			}, h.destroyPlayer = function() {
				d("jwPlayerDestroy")
			}, h.playAd = function(e) {
				d("jwPlayAd", e)
			};
			var _ = {
				onBufferChange: n.JWPLAYER_MEDIA_BUFFER,
				onBufferFull: n.JWPLAYER_MEDIA_BUFFER_FULL,
				onError: n.JWPLAYER_ERROR,
				onSetupError: n.JWPLAYER_SETUP_ERROR,
				onFullscreen: n.JWPLAYER_FULLSCREEN,
				onMeta: n.JWPLAYER_MEDIA_META,
				onMute: n.JWPLAYER_MEDIA_MUTE,
				onPlaylist: n.JWPLAYER_PLAYLIST_LOADED,
				onPlaylistItem: n.JWPLAYER_PLAYLIST_ITEM,
				onPlaylistComplete: n.JWPLAYER_PLAYLIST_COMPLETE,
				onReady: n.API_READY,
				onResize: n.JWPLAYER_RESIZE,
				onComplete: n.JWPLAYER_MEDIA_COMPLETE,
				onSeek: n.JWPLAYER_MEDIA_SEEK,
				onTime: n.JWPLAYER_MEDIA_TIME,
				onVolume: n.JWPLAYER_MEDIA_VOLUME,
				onBeforePlay: n.JWPLAYER_MEDIA_BEFOREPLAY,
				onBeforeComplete: n.JWPLAYER_MEDIA_BEFORECOMPLETE,
				onDisplayClick: n.JWPLAYER_DISPLAY_CLICK,
				onControls: n.JWPLAYER_CONTROLS,
				onQualityLevels: n.JWPLAYER_MEDIA_LEVELS,
				onQualityChange: n.JWPLAYER_MEDIA_LEVEL_CHANGED,
				onCaptionsList: n.JWPLAYER_CAPTIONS_LIST,
				onCaptionsChange: n.JWPLAYER_CAPTIONS_CHANGED,
				onAdError: n.JWPLAYER_AD_ERROR,
				onAdClick: n.JWPLAYER_AD_CLICK,
				onAdImpression: n.JWPLAYER_AD_IMPRESSION,
				onAdTime: n.JWPLAYER_AD_TIME,
				onAdComplete: n.JWPLAYER_AD_COMPLETE,
				onAdCompanions: n.JWPLAYER_AD_COMPANIONS
			};
			i.foreach(_, function(e) {
				h[e] = r(_[e], u)
			});
			var k = {
				onBuffer: a.BUFFERING,
				onPause: a.PAUSED,
				onPlay: a.PLAYING,
				onIdle: a.IDLE
			};
			return i.foreach(k, function(e) {
				h[e] = r(k[e], l)
			}), h.remove = function() {
				if (!m) throw "Cannot call remove() before player is ready";
				v = [], s.destroyPlayer(this.id)
			}, h.setup = function(t) {
				if (e.embed) {
					var i = o.getElementById(h.id);
					return i && (t.fallbackDiv = i), i = h, v = [], s.destroyPlayer(i.id), i = e(h.id), i.config = t, new e.embed(i)
				}
				return h
			}, h.registerPlugin = function(t, i, n, a) {
				e.plugins.registerPlugin(t, i, n, a)
			}, h.setPlayer = function(e, t) {
				g = e, h.renderingMode = t
			}, h.detachMedia = function() {
				if ("html5" == h.renderingMode) return d("jwDetachMedia")
			}, h.attachMedia = function(e) {
				if ("html5" == h.renderingMode) return d("jwAttachMedia", e)
			}, h.dispatchEvent = function(e, t) {
				if (p[e]) for (var a = i.translateEventResponse(e, t), s = 0; s < p[e].length; s++) if ("function" == typeof p[e][s]) try {
					e == n.JWPLAYER_PLAYLIST_LOADED && i.deepReplaceKeyName(a.playlist, ["__dot__", "__spc__", "__dsh__", "__default__"], [".", " ", "-", "default"]), p[e][s].call(this, a)
				} catch (o) {
					i.log("There was an error calling back an event handler")
				}
			}, h.dispatchInstreamEvent = function(e) {
				y && y.dispatchEvent(e, arguments)
			}, h.callInternal = d, h.playerReady = function(e) {
				for (m = !0, g || h.setPlayer(o.getElementById(e.id)), h.container = o.getElementById(h.id), i.foreach(p, function(e) {
					c(g, e)
				}), u(n.JWPLAYER_PLAYLIST_ITEM, function() {
					b = {}
				}), u(n.JWPLAYER_MEDIA_META, function(e) {
					i.extend(b, e.metadata)
				}), h.dispatchEvent(n.API_READY); 0 < v.length;) d.apply(this, v.shift())
			}, h.getItemMeta = function() {
				return b
			}, h.isBeforePlay = function() {
				return g.jwIsBeforePlay()
			}, h.isBeforeComplete = function() {
				return g.jwIsBeforeComplete()
			}, h
		};
	s.selectPlayer = function(e) {
		var n;
		return i.exists(e) || (e = 0), e.nodeType ? n = e : "string" == typeof e && (n = o.getElementById(e)), n ? (e = s.playerById(n.id)) ? e : s.addPlayer(new s(n)) : "number" == typeof e ? t[e] : null
	}, s.playerById = function(e) {
		for (var i = 0; i < t.length; i++) if (t[i].id == e) return t[i];
		return null
	}, s.addPlayer = function(e) {
		for (var i = 0; i < t.length; i++) if (t[i] == e) return e;
		return t.push(e), e
	}, s.destroyPlayer = function(e) {
		for (var n, a = -1, s = 0; s < t.length; s++) t[s].id == e && (a = s, n = t[s]);
		return 0 <= a && (e = n.id, s = o.getElementById(e + ("flash" == n.renderingMode ? "_wrapper" : "")), i.clearCss && i.clearCss("#" + e), s && ("html5" == n.renderingMode && n.destroyPlayer(), n = o.createElement("div"), n.id = e, s.parentNode.replaceChild(n, s)), t.splice(a, 1)), null
	}, e.playerReady = function(t) {
		var i = e.api.playerById(t.id);
		i ? i.playerReady(t) : e.api.selectPlayer(t.id).playerReady(t)
	}
}(jwplayer), function(e) {
	var t = e.events,
		i = e.utils,
		n = t.state;
	e.api.instream = function(e, a, o, s) {
		function r(e, t) {
			return d[e] || (d[e] = [], u.jwInstreamAddEventListener(e, 'function(dat) { jwplayer("' + c.id + '").dispatchInstreamEvent("' + e + '", dat); }')), d[e].push(t), this
		}

		function l(e, i) {
			return h[e] || (h[e] = [], r(t.JWPLAYER_PLAYER_STATE, function(t) {
				var i = t.newstate,
					n = t.oldstate;
				if (i == e) {
					var a = h[i];
					if (a) for (var o = 0; o < a.length; o++)"function" == typeof a[o] && a[o].call(this, {
						oldstate: n,
						newstate: i,
						type: t.type
					})
				}
			})), h[e].push(i), this
		}
		var c = e,
			u = a,
			d = {},
			h = {};
		this.dispatchEvent = function(e, t) {
			if (d[e]) for (var n = i.translateEventResponse(e, t[1]), a = 0; a < d[e].length; a++)"function" == typeof d[e][a] && d[e][a].call(this, n)
		}, this.onError = function(e) {
			return r(t.JWPLAYER_ERROR, e)
		}, this.onFullscreen = function(e) {
			return r(t.JWPLAYER_FULLSCREEN, e)
		}, this.onMeta = function(e) {
			return r(t.JWPLAYER_MEDIA_META, e)
		}, this.onMute = function(e) {
			return r(t.JWPLAYER_MEDIA_MUTE, e)
		}, this.onComplete = function(e) {
			return r(t.JWPLAYER_MEDIA_COMPLETE, e)
		}, this.onTime = function(e) {
			return r(t.JWPLAYER_MEDIA_TIME, e)
		}, this.onBuffer = function(e) {
			return l(n.BUFFERING, e)
		}, this.onPause = function(e) {
			return l(n.PAUSED, e)
		}, this.onPlay = function(e) {
			return l(n.PLAYING, e)
		}, this.onIdle = function(e) {
			return l(n.IDLE, e)
		}, this.onClick = function(e) {
			return r(t.JWPLAYER_INSTREAM_CLICK, e)
		}, this.onInstreamDestroyed = function(e) {
			return r(t.JWPLAYER_INSTREAM_DESTROYED, e)
		}, this.play = function(e) {
			u.jwInstreamPlay(e)
		}, this.pause = function(e) {
			u.jwInstreamPause(e)
		}, this.destroy = function() {
			u.jwInstreamDestroy()
		}, this.setText = function(e) {
			u.jwInstreamSetText(e || "")
		}, c.callInternal("jwLoadInstream", o, s || {})
	}
}(jwplayer), function(e) {
	var t = e.api,
		i = t.selectPlayer;
	t.selectPlayer = function(t) {
		return (t = i(t)) ? t : {
			registerPlugin: function(t, i, n) {
				e.plugins.registerPlugin(t, i, n)
			}
		}
	}
}(jwplayer)), jwplayer.key = "uG/VHSbjrT7/udRHL0vnyr5GjyFu3WZQ9+VRUxia1vs=", $(function() {
	$.fn.extend({
		playVideo: function(e) {
			function t() {
				this.win_w = null, this.win_h = null, this.btn = null, this.videomask = null, this.close = null, this.jWUrl = null
			}
			var i = {
				btn: ".vedioplay",
				videomask: ".videomask",
				close: ".videomask .icon-close2",
				jWUrl: this.data("url")
			},
				n = $.extend({}, i, e);
			t.prototype.createPopUp = function() {
				$(".videomask").remove();
				navigator.userAgent.match(/mobile/i) ? $("body").append("<div class='videomask' style='background: #000;background:rgba(0,0,0,.5);position: fixed;left: 0;top: 0;width: 100%;height: 100%;z-index: 8888;display: none;'><i class='iconfont icon-close' style='font-size:40px;color:#696969;position:absolute;left:50%;bottom:50px; margin-left:-20px;cursor:pointer;transition: all ease .3s;'></i></div>") : $("body").append("<style>.videomask i.iconfont:hover{ transform: rotate(90deg); }</style><div class='videomask' style='background: #000;background:rgba(0,0,0,.5);position: fixed;left: 0;top: 0;width: 100%;height: 100%;z-index: 8888;display: none;'><i class='iconfont icon-close' style='font-size:40px;color:#696969;position:absolute;right:50px;top:50px;cursor:pointer;transition: all ease .3s;'></i></div>"), this.videomask = $(".videomask"), this.close = $(".videomask .icon-close2"), this.aClosePopUp()
			}, t.prototype.createVideo = function() {}, t.prototype.init = function(e) {
				this.win_w = $(window).width(), this.win_h = innerHt, this.btn = $(e.btn), this.videomask = $(e.videomask), this.close = $(e.close), this.jWUrl = e.jWUrl, this.aNiMate()
			}, t.prototype.reset = function() {
				this.win_w = $(window).width(), this.win_h = innerHt, this.btn = $(n.btn), this.videomask = $(n.videomask), this.close = $(n.close), this.jWUrl = n.jWUrl
			}, t.prototype.aNiMate = function() {
				this.createPopUp(), this.createVideo(), this.videomask.fadeIn(200)
			}, t.prototype.aClosePopUp = function() {
				var e = this;
				e.close.on("click", function(t) {
					(t = t || window.event).stopPropagation(), e.closeVideo(), e.videomask.fadeOut(200)
				}), e.videomask.on("click", function(t) {
					(t = t || window.event).stopPropagation(), e.closeVideo(), e.videomask.fadeOut(200)
				})
			}, t.prototype.createVideo = function() {
				var e, t, i, n, a = this;
				a.win_w > 980 ? (e = 980, t = 551.25, i = (a.win_h - t) / 2, n = (a.win_w - e) / 2) : 980 > a.win_w > 480 ? (t = 9 * (e = .8 * a.win_w) / 16, i = (a.win_h - t) / 2, n = (a.win_w - e) / 2) : (t = 9 * (e = a.win_w) / 16, i = (a.win_h - t) / 2, n = (a.win_w - e) / 2), $(".videomask").append("<div class='jWVideoFrame'><a id='jWVideoFrameId'></a></div>"), $(".jWVideoFrame").css({
					position: "absolute",
					width: e,
					height: t,
					top: i,
					left: n
				}), $(".jWVideoFrame").click(function(e) {
					(e = e || window.event).stopPropagation()
				});
				var o = "html5";

				$.browser.msie && (o = "flash"), jwplayer(jWVideoFrameId).setup({
					stretching: "exactfit",
					width: "100%",
					height: "100%",
					flashplayer: "/video/flash/player.swf",
					skin: "/video/flash/ent_cn_huaweie.xml",
					id: jWVideoFrameId,
					file: a.jWUrl,
					autostart: !0,
					file: a.jWUrl,
					primary: o,
					ga: {}
				})
			}, t.prototype.closeVideo = function() {
				jwplayer(jWVideoFrameId).stop()
			};
			var a = new t;
			a.init(n), $(window).resize(function() {
				a.reset()
			})
		}
	}), $(".vedioplay").click(function(e) {
		(e = e || window.event).stopPropagation(), $(this).playVideo()
	})
}), function(e) {
	e.fn.adaptiveRotation = function(t) {
		var i = e.extend({
			autoRotation: !0,
			time: 5e3,
			current: "on",
			proportion: 3.2,
			proportionMobile: 800 / 450,
			Resolution: 768,
			isOtaku: !1,
			bannerBox: ".banner-box",
			bannerList: ".banner-list",
			bannerImg: ".banner-img",
			preBtn: ".pre-btn",
			nextBtn: ".next-btn",
			bannerPrint: ".banner-print",
			bannerPrintHtml: "<span></span>|<span class='on'></span>|on",
			expand_textbox: ".expand-textbox",
			beforeFun: ""
		}, t),
			n = e(this),
			a = i.autoRotation,
			o = i.time,
			s = i.current,
			r = (i.proportion, i.proportionMobile),
			l = i.Resolution,
			c = i.isOtaku,
			u = i.bannerPrintHtml,
			d = n.find(i.bannerBox),
			h = n.find(i.bannerList),
			p = n.find(i.bannerImg),
			f = n.find(i.preBtn),
			g = n.find(i.nextBtn),
			m = n.find(i.bannerPrint),
			v = n.find(i.expand_textbox),
			y = e(window).width(),
			b = d.width(),
			w = 0,
			_ = 0,
			k = "",
			C = p.length,
			x = 0,
			E = 0,
			D = "on",
			$ = !1,
			A = function() {
				if (y = e(window).width(), b = d.width(), "" != i.beforeFun && i.beforeFun(), y <= l) {
					for (a = 0; a < C; a++) a > 0 || (k = p.eq(a).find("img").eq(0)).attr("src", k.data("wapsrc"));
					if (v.length > 0) {
						var t = 0;
						v.outerHeight("auto");
						for (a = 0; a < C; a++) t = v.eq(a).outerHeight(), 0 == a ? E = t : E < t && (E = t);
						v.outerHeight(E), m.css({
							top: parseInt(b / r) - 30,
							bottom: "auto"
						})
					}
					g.hide(), f.hide(), w = parseInt(b / r) + E
				} else {
					for (var a = 0; a < C; a++) if (k = p.eq(a).find("img").eq(0), 6 != baseLib.browserVersion() && 7 != baseLib.browserVersion() && 8 != baseLib.browserVersion() && 0 != baseLib.browserVersion() || "" == k.data("pcsrcie8")) {
						if (a > 0) continue;
						k.attr("src", k.data("pcsrc"))
					} else {
						var o = e(".banner-block .index-banner-text .pic img").data("pcsrcie8");
						e(".banner-block .index-banner-text .pic img").attr("src", o), k.attr("src", k.data("pcsrc"))
					}
					w = parseInt(b / i.proportion), v.length > 0 && (v.height("auto"), m.css({
						top: "auto",
						bottom: 0
					})), c && n.css("position", "relative"), g.show(), f.show()
				}
				switch (_ = h.find("." + s).index(), d.height(w), h.height(w), h.width(b), C) {
				case 1:
					g.hide(), f.hide(), $ = !0, m.hide();
					break;
				case 2:
					break;
				default:
					p.eq(_ - 1).addClass("pre"), p.eq(_ + 1).addClass("next")
				}
			};
		A();
		var L = function(e) {
				var t = p.eq(e).find("img").eq(0);
				"1" != t.attr("lazyloaded") && (y <= l ? t.attr("src", t.data("wapsrc")) : t.attr("src", t.data("pcsrc")), t.attr("lazyloaded", 1))
			};
		!
		function() {
			var e = "",
				t = u.split("|");
			if (D = t[2], 3 != t.length) return alert("bannerPrintHtml 参数不规范，请重新调整参数！"), !1;
			for (var i = 0; i < C; i++) e += i == _ ? t[1] : t[0];
			m.html(e)
		}(), g.on("click", function() {
			2 == C && p.eq(_).siblings().addClass("next"), $ || ($ = !0, a && clearInterval(x), L(p.filter(".next").index()), h.animate({
				marginLeft: -b
			}, 400, function() {
				M(n.find(".next").index(), "click")
			}))
		}), f.on("click", function() {
			2 == C && p.eq(_).siblings().addClass("pre"), $ || ($ = !0, a && clearInterval(x), L(p.filter(".next").index()), h.animate({
				marginLeft: b
			}, 400, function() {
				M(n.find(".pre").index(), "click")
			}))
		}), m.on("click", "span", function() {
			var t = e(this).index();
			$ || (t > _ && (p.eq(t).addClass("next").removeClass("pre").siblings().removeClass("next"), g.trigger("click")), t < _ && (p.eq(t).addClass("pre").removeClass("next").siblings().removeClass("pre"), f.trigger("click")))
		});
		var T = function() {
				a && C > 1 && (x = setInterval(function() {
					$ = !0, 2 == C && p.eq(_).siblings().addClass("next"), L(p.filter(".next").index()), h.animate({
						marginLeft: -b
					}, 400, function() {
						M(n.find(".next").index(), "auto")
					})
				}, o))
			};
		T();
		var M = function(e, t) {
				p.eq(e).addClass(s).siblings().removeClass(s), m.find("span").eq(e).addClass(D).siblings().removeClass(D), _ = h.find("." + s).index(), 2 == C ? p.removeClass("next").removeClass("pre") : (e + 1 >= C ? p.eq(0).addClass("next").siblings().removeClass("next") : p.eq(e + 1).addClass("next").siblings().removeClass("next"), p.eq(e - 1).addClass("pre").siblings().removeClass("pre")), h.css("margin-left", 0), $ = !1, "click" == t && T()
			};
		if (e(window).resize(function() {
			A()
		}), window.addEventListener) {
			var I = h[0],
				P = 0,
				S = 0,
				R = 0,
				N = 0,
				j = 0,
				O = 0,
				F = 0,
				Y = 0;
			C > 1 && (I.addEventListener("touchstart", function(t) {
				if (1 == t.targetTouches.length) {
					t.stopPropagation();
					var i = t.targetTouches[0];
					P = i.clientX, S = i.clientY, R = i.clientX, N = i.clientY, F = e("body").scrollTop(), Y = 0, a && clearInterval(x)
				}
			}, !1), I.addEventListener("touchmove", function(t) {
				if (1 == t.targetTouches.length) {
					t.preventDefault();
					var i = t.targetTouches[0];
					if (R = i.clientX, N = i.clientY, j = R - P, O = N - S, !$) switch (2 == C && (j > 0 ? p.eq(_).siblings().addClass("pre").removeClass("next") : p.eq(_).siblings().addClass("next").removeClass("pre")), Y) {
					case 0:
						Y = Math.abs(O) > 1.5 * Math.abs(j) ? 2 : 1;
						break;
					case 1:
						I.style.marginLeft = j + "px";
						break;
					case 2:
						e("body").scrollTop(F - O)
					}
				}
			}, !1), I.addEventListener("touchend", function(e) {
				j = R - P, 1 == Y && (Math.abs(j) < 120 ? (h.animate({
					marginLeft: 0
				}, 100), a && T()) : $ ? a && T() : ($ = !0, j < 0 ? h.animate({
					marginLeft: -b
				}, 100, function() {
					M(h.find(".next").index(), "click")
				}) : h.animate({
					marginLeft: b
				}, 200, function() {
					M(h.find(".pre").index(), "click")
				})))
			}, !1))
		}
	}
}(jQuery), jQuery.cookie = function(e, t, i) {
	if (void 0 === t) {
		var n = null;
		if (document.cookie && "" != document.cookie) for (var a = document.cookie.split(";"), o = 0; o < a.length; o++) {
			var s = jQuery.trim(a[o]);
			if (s.substring(0, e.length + 1) == e + "=") {
				n = decodeURIComponent(s.substring(e.length + 1));
				break
			}
		}
		return n
	}
	i = i || {}, null === t && (t = "", (i = $.extend({}, i)).expires = -1);
	var r = "";
	if (i.expires && ("number" == typeof i.expires || i.expires.toUTCString)) {
		var l;
		"number" == typeof i.expires ? (l = new Date).setTime(l.getTime() + 24 * i.expires * 60 * 60 * 1e3) : l = i.expires, r = "; expires=" + l.toUTCString()
	}
	var c = i.path ? "; path=" + i.path : "",
		u = i.domain ? "; domain=" + i.domain : "",
		d = i.secure ? "; secure" : "";
	document.cookie = [e, "=", encodeURIComponent(t), r, c, u, d].join("")
}, function(e) {
	e.fn.addBack = e.fn.addBack || e.fn.andSelf, e.fn.extend({
		actual: function(t, i) {
			if (!this[t]) throw '$.actual => The jQuery method "' + t + '" you called does not exist';
			var n, a, o = e.extend({
				absolute: !1,
				clone: !1,
				includeMargin: !1
			}, i),
				s = this.eq(0);
			if (!0 === o.clone) n = function() {
				s = s.clone().attr("style", "position: absolute !important; top: -1000 !important; ").appendTo("body")
			}, a = function() {
				s.remove()
			};
			else {
				var r, l = [],
					c = "";
				n = function() {
					r = s.parents().addBack().filter(":hidden"), c += "visibility: hidden !important; display: block !important; ", !0 === o.absolute && (c += "position: absolute !important; "), r.each(function() {
						var t = e(this);
						l.push(t.attr("style")), t.attr("style", c)
					})
				}, a = function() {
					r.each(function(t) {
						var i = e(this),
							n = l[t];
						n === undefined ? i.removeAttr("style") : i.attr("style", n)
					})
				}
			}
			n();
			var u = /(outer)/.test(t) ? s[t](o.includeMargin) : s[t]();
			return a(), u
		}
	})
}(jQuery), Base.prototype.contourFun = function(e, t, i, n) {
	var a = $(e),
		o = $(window).width();
	a.length > 0 && (n == undefined || o > n ? $.each(a, function(e, n) {
		var a, o = (n = $(n)).find(t),
			s = o.find(i),
			r = n.actual("outerWidth"),
			l = o.actual("width") - 1,
			c = Math.floor(r / l),
			u = [];
		if (r > 0 && c > 0) {
			var d = Math.ceil(o.length / c);
			s.height("auto");
			for (var h = 0; h < d; h++) {
				u = [];
				for (p = c * h; p < c * (h + 1); p++) u.push(s.eq(p).actual("height"));
				a = Math.max.apply(null, u);
				for (var p = c * h; p < c * (h + 1); p++) s.eq(p).height(a)
			}
		}
	}) : a.find(t).find(i).height("auto"))
}, Base.prototype.promptIncident = function() {
	$(".prompt-popup").on("click", function() {
		var e = "." + $(this).data("vaule");
		e && ".map-reveal-module" == e && $(e).addClass("map-reveal-module-bg");
		var t = $(document).scrollTop();
		// $("body").addClass("position-fix").css("margin-top", -t), $(e).fadeIn("fast").css("overflow-y", "auto")
	}), $(".prompt-clock").on("click", function(e) {
		(e || window.event).stopPropagation();
		var t = Math.abs(parseInt($("body").css("margin-top")));
		$("body").removeClass("position-fix").css("margin-top", 0), $(this).parents(".prompt-box").fadeOut("fast")
	})
}, Base.prototype.v2PromptIncident = function() {
	$(".v2-prompt-popup").on("click", function() {
		var e = "." + $(this).data("vaule"),
			t = $(document).scrollTop();
		// $("body").addClass("position-fix").css("margin-top", -t), $(e).fadeIn("fast").css("overflow-y", "auto")
	}), $(".v2-prompt-clock").on("click", function(e) {
		(e || window.event).stopPropagation();
		var t = Math.abs(parseInt($("body").css("margin-top")));
		$("body").removeClass("position-fix").css("margin-top", 0),  $(this).parents(".v2-prompt-box").fadeOut("fast")
	})
}, Base.prototype.navigationIncident = function() {
	function e() {
		$(window).scrollTop() < 1 ? $(".nav-section .nav").css("position", "relative") : $(".nav-section .nav").css("position", "fixed")
	}
	var t = 0,
		i = 0,
		n = 0,
		a = 0,
		o = $(window).width();
	$(".nav-subset-module").each(function() {
		t = $(this).actual("width"), i = $(this).parents(".nav-list").outerWidth(), n = $(this).parents(".nav-list").offset().left, a = o - i - n, n < (t - i) / 2 ? $(this).css("margin-left", -n) : a < (t - i) / 2 ? $(this).css("margin-left", -(t - i - a + 1)) : $(this).css("margin-left", (i - t) / 2)
	}), $(".login").on("hover", function() {
		$("#noshow_myspace").prop("checked") && $.cookie("SpaceTimes", "no_notice", {
			expires: 90,
			path: "/"
		}), $(".logined-tip").length > 0 && $(".logined-tip").hide()
	}), $("body").on("click", function() {
		$("#noshow_myspace").prop("checked") && $.cookie("SpaceTimes", "no_notice", {
			expires: 90,
			path: "/"
		}), $(".logined-tip").length > 0 && $(".logined-tip").hide()
	}), $(".nav-quick").on("hover", function() {
		$("#noshow_myspace").prop("checked") && $.cookie("SpaceTimes", "no_notice", {
			expires: 90,
			path: "/"
		}), $(".logined-tip").length > 0 && $(".logined-tip").hide()
	}), $(".logined-tip").on("click", function(e) {
		e.stopPropagation()
	}), $(".nav-section .nav-list").hover(function() {}, function() {
		$(".nav-section .nav-searchbit-text").length > 0 && $(".nav-section .nav-searchbit-text").blur()
	}), $(".nav-subset-height").each(function() {
		for (var e = 0, t = 0; t < $(this).find(".nav-tabel-cell").length; t++) {
			var i = $(this).find(".nav-tabel-cell").eq(t).find(".nav-subset-box").eq(0);
			0 == t ? e = i.actual("outerHeight") : e < i.actual("outerHeight") && (e = i.actual("outerHeight"))
		}
		for (t = 0; t < $(this).find(".nav-tabel-cell").length; t++) $(this).find(".nav-tabel-cell").eq(t).find(".nav-subset-box").eq(0).outerHeight(e)
	}), $(".nav-subset-module").removeClass("nav-subset-height"), e(), $(window).scroll(function() {
		e()
	})
}, Base.prototype.BrowseHappyFun = function() {
	if ($.cookie("browsehappy")) return !1;
	$(".browsehappy").slideDown(), $(".browsehappy a.close").click(function() {
		$(this).parents(".browsehappy").slideUp(function() {
			$.cookie("browsehappy", "browsehappy", {
				expires: 30,
				path: "/",
				domain: "huawei.com"
			})
		})
	})
}, Base.prototype.searchIncident = function() {
	$(".search").on("click", function(e) {
		$(this).find(".search-box").addClass("on").find(".search-text").focus(), $(document).on("click", function() {
			$(".search-box").removeClass("on")
		}), e.stopPropagation()
	}), $(".search-box").on("click", function(e) {
		e.stopPropagation()
	}), $(".search .search-close").on("click", function(e) {
		$(this).parents(".search-box").removeClass("on"), e.stopPropagation()
	}), $(".mobile-search .mobile-search-a").on("click", function(e) {
		$(this).parents(".mobile-search").find(".mobile-search-box").slideToggle(100).find(".mobile-search-text").focus(), $(document).on("click", function() {
			$(".mobile-search-box").slideUp(100)
		}), e.stopPropagation()
	}), $(".mobile-search-box").on("click", function(e) {
		e.stopPropagation()
	}), $(".mobile-search-box span").on("click", function() {
		$(this).parents(".mobile-search-box").slideUp(100)
	})
}, Base.prototype.wapManuNav = function() {
	var e = innerHt;
	$(".wap-navbox").height(e), $(".wap-nav").height(e), $("#wap-menubtn").on("click", function() {
		var e = $(document).scrollTop();
		$("body").addClass("position-fix"), $("#wap-menu").fadeIn(100)
	}), $(".wap-menuclose").on("click", function() {
		"" != $("#wap-menuprev").attr("data-prev") && $("#wap-menuprev").attr("data-prev") != undefined && $("#wap-menuprev").trigger("click");
		var e = Math.abs(parseInt($("body").css("marginTop")));
		$("body").removeClass("position-fix").css("marginTop", 0),  $("#wap-menu").fadeOut(100)
	}), $("#wap-menuprev").on("click", function() {
		var e = $(this),
			t = $("." + e.attr("data-prev"));
		if ("opened1" == e.attr("data-prev") && (t.removeClass("wap-rollout opened1"), $(".wap-navmain ul").removeClass("wap-putaway"), $("#wap-menutitle").html("").removeClass("wap-show"), $("#wap-menuprev").removeClass("wap-show").attr("data-prev", ""), $(".wap-navbox").scrollTop(0)), "opened2" == e.attr("data-prev")) {
			var i = $(".opened1").parents("li").find(".wap_firstcolumn span").text();
			t.removeClass("wap-rollout opened2"), $("#wap-menutitle").html(i), $("#wap-menuprev").attr("data-prev", "opened1"), $(".opened1").removeClass("wap-overflow-hide"), $(".opened1").find("dl").first().removeClass("wap-putaway"), $(".wap-navbox").scrollTop(0)
		}
	}), $(".wap-navmain .wap_firstcolumn").on("click", function() {
		if ($(this).parents("li").find(".wap-navbox").length > 0) {
			var e = $(this).find("span").text();
			$("#wap-menutitle").html(e).addClass("wap-show"), $("#wap-menuprev").addClass("wap-show").attr("data-prev", "opened1"), $(".wap-navmain ul").addClass("wap-putaway"), $(this).parents("li").find(".wap-navbox").first().addClass("wap-rollout opened1")
		}
	}), $(".wap-navmain .wap_secondcolumn").on("click", function() {
		var e = $(this).find("span").text();
		$("#wap-menutitle").html(e).addClass("wap-show"), $("#wap-menuprev").addClass("wap-show").attr("data-prev", "opened2"), $(".wap-navbox").scrollTop(0), $(".opened1").addClass("wap-overflow-hide"), $(".opened1").find("dl").first().addClass("wap-putaway"), $(this).parents("dd").find(".wap-navbox").first().addClass("wap-rollout opened2")
	})
}, Base.prototype.replaceImg = function() {
	$(".replaceimg").length > 0 && ($(window).width() > 768 ? $(".replaceimg").each(function(e, t) {
		var i = $(this).data("pcsrc");
		$(this).attr("src", i)
	}) : $(".replaceimg").each(function(e, t) {
		var i = $(this).data("wapsrc");
		$(this).attr("src", i)
	}))
}, Base.prototype.replaceImglazyload = function() {
	if ($(".replaceimglazyload").length > 0) {
		var e = $(window).width(),
			t = $(".replaceimglazyload");
		if (e > 768) {
			var i = t.data("pcsrc");
			t.attr("data-original", i)
		} else {
			var n = t.data("wapsrc");
			t.attr("data-original", n)
		}
	}
}, Base.prototype.browserVersion = function() {
	var e = navigator.userAgent;
	if (e.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)) {
		var t = !! e.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
			i = e.indexOf("Android") > -1 || e.indexOf("Adr") > -1;
		if (t) return "ios";
		if (i) return "android"
	} else {
		var n = e.indexOf("Opera") > -1,
			a = e.indexOf("compatible") > -1 && e.indexOf("MSIE") > -1 && !n,
			o = e.indexOf("rv:11") > -1 && !a,
			s = e.indexOf("Firefox") > -1,
			r = e.indexOf("Safari") > -1 && -1 == e.indexOf("Chrome"),
			l = e.indexOf("Chrome") > -1 && e.indexOf("Safari") > -1;
		if (a) switch (new RegExp("MSIE (\\d+\\.\\d+);").test(e), parseFloat(RegExp.$1)) {
		case 6:
			return "6";
		case 7:
			return "7";
		case 8:
			return "8";
		case 9:
			return "9";
		case 10:
			return "10";
		case 11:
			return "11";
		default:
			return "0"
		}
		if (s) return "FF";
		if (n) return "Opera";
		if (r) return "Safari";
		if (l) return "Chrome";
		if (o) return "Edge"
	}
}, Base.prototype.pageTop = function() {
	$("a#top").length > 0 || ($("<a/>", {
		id: "top"
	}).appendTo("body"), $(window).scroll(function() {
		$(window).scrollTop() > 0 ? $("#top").show() : $("#top").hide()
	}), $("#top").click(function() {
		$("body,html").animate({
			scrollTop: 0
		})
	}))
}, Base.prototype.v2SetHeight = function(e, t, i) {
	baseLib.browserVersion() < 11 && $(e).each(function() {
		var e = $(this),
			n = e.find(t),
			a = n.length,
			o = e.outerWidth(!0),
			s = n.outerWidth(),
			r = Math.floor(o / s),
			l = Math.ceil(a / r),
			c = 0,
			u = null;
		n.find(i).height("auto");
		for (var d = 0; d < l; d++) {
			for (var h = d * r; h < r * (d + 1); h++) {
				n.eq(h).addClass("oList_obj");
				var p = n.eq(h).find(i).height();
				p > c && (c = p), u = $(".oList_obj")
			}
			u.find(i).height(c), u.removeClass("oList_obj"), c = 0
		}
	})
}, Base.prototype.v2HeadFun = function() {
	var e = $(window).width();
	e > 1024 ? $(".zl-pc-search-icon").on("click", function(e) {
		e.stopPropagation(), $(".zl-pc-nav").addClass("narrow"), $(".zl-pc-searching-box").addClass("searching"), $(this).fadeOut()
	}) : $(".zl-pc-search-icon").on("click", function(e) {
		e.stopPropagation(), $(".zl-pc-searching-box").addClass("wap-searching"), $(this).fadeOut()
	}), e > 1024 ? $(".zl-pc-searching-box-close").on("click", function(e) {
		e.stopPropagation(), $(".zl-pc-nav").removeClass("narrow"), $(".zl-pc-searching-box").removeClass("searching"), $(".zl-pc-search-icon").fadeIn(), $("#txtSearch_Navigation").val($("#txtSearch_Navigation").next(".inputInfohint").val()), $(".zl-pc-searching-tip").fadeOut()
	}) : $(".zl-pc-searching-box-close").on("click", function(e) {
		e.stopPropagation(), $(".zl-pc-nav").removeClass("narrow"), $(".zl-pc-searching-box").removeClass("wap-searching"), $(".zl-pc-search-icon").fadeIn(), $(".zl-pc-searching-tip").fadeOut()
	}), $(".zl-pc-searching-box").click(function(e) {
		e.stopPropagation()
	}), $(".zl-pc-searching-box .nav-searchbit-text").click(function(e) {
		e.stopPropagation()
	}), $(".zl-pc-nav-column-li").on("mouseout", function() {
		$(".zl-pc-nav-industry-box .pic").css({
			"-webkit-transform": "matrix(1,0,0,1,0,0)",
			"-moz-transform": "matrix(1,0,0,1,0,0)",
			"-o-transform": "matrix(1,0,0,1,0,0)",
			transform: "matrix(1,0,0,1,0,0)"
		})
	}), $(".zl-pc-nav-products,.zl-pc-nav-column-li").on("mousemove", function(e) {
		e.stopPropagation();
		var t = -e.clientX / 60,
			i = e.clientY / 40;
		$(".zl-pc-nav-industry-box .pic").css({
			"-webkit-transform": "matrix(1,0,0,1," + t + "," + i + ")",
			"-moz-transform": "matrix(1,0,0,1," + t + "," + i + ")",
			"-o-transform": "matrix(1,0,0,1," + t + "," + i + ")",
			transform: "matrix(1,0,0,1," + t + "," + i + ")"
		})
	}), setTimeout(function() {
		baseLib.contourFun(".zl-pc-nav-products", ".con", ".setheight", 768), baseLib.contourFun(".zl-pc-nav-supportbyproduct", ".con", ".setheight", 768), baseLib.contourFun(".zl-pc-nav-services ul", "li", "a", 1024), baseLib.contourFun(".zl-pc-nav-docymentation ul", "li", "a", 1024), baseLib.contourFun("ul.zl-pc-nav-textul", "li", "a", 1024)
	}, 1e3), $(".zl-pc-login-icon").on("hover", function(e) {
		e.stopPropagation(), $("#noshow_myspace").prop("checked") && $.cookie("SpaceTimes", "no_notice", {
			expires: 90,
			path: "/"
		}), $(".zl-pc-logined-tip").length > 0 && $(".zl-pc-logined-tip").hide()
	}), $("body").on("click", function(e) {
		$("#noshow_myspace").prop("checked") && $.cookie("SpaceTimes", "no_notice", {
			expires: 90,
			path: "/"
		}), $(".zl-pc-logined-tip").length > 0 && $(".zl-pc-logined-tip").hide(), ($(".zl-pc-searching-box").hasClass("searching") || $(".zl-pc-searching-box").hasClass("wap-searching")) && $(".zl-pc-searching-box-close").trigger("click")
	}), $(".nav-quick").on("hover", function(e) {
		e.stopPropagation(), $("#noshow_myspace").prop("checked") && $.cookie("SpaceTimes", "no_notice", {
			expires: 90,
			path: "/"
		}), $(".zl-pc-logined-tip").length > 0 && $(".logined-tip").hide()
	}), $(".zl-pc-logined-tip").on("click", function(e) {
		e.stopPropagation()
	});
	var t;
	$(window).scroll(function() {
		if (clearTimeout(t), t = setTimeout(function() {
			$(".zl-pc-header .zl-pc-nav-con").attr("style", "")
		}, 200), "ios" === baseLib.browserVersion() && window.scrollY < "40") return !1;
		($(".zl-pc-searching-box").hasClass("searching") || $(".zl-pc-searching-box").hasClass("wap-searching")) && $(".zl-pc-searching-box-close").trigger("click");
		$(document).scrollTop() > ("block" == $(".browsehappy").css("display") ? $(".browsehappy").outerHeight(!0) : 0) ? $(".zl-pc-header").css({
			position: "fixed"
		}) : $(".zl-pc-header").css({
			position: "fiexd"
		}), $(".zl-pc-nav-column-li.current").removeClass("current")
	}), $(".zl-pc-nav-con").click(function(e) {
		e.stopPropagation()
	});
	var i;
	baseLib.browserVersion() < 12 || "Edge" == baseLib.browserVersion() ? ($(".zl-pc-nav-column-li").mouseenter(function() {
		var e = $(document).scrollTop();
		"block" == $(".browsehappy").css("display") && e < 10 ? $(".zl-pc-nav-con").css("top", $(".browsehappy").outerHeight(!0) + 90+$(".banner_index_top").height()) : $(".zl-pc-nav-con").css("top", 90+$(".banner_index_top").height()), $(".lazyload img", this).trigger("appear"), clearTimeout(i);
		var t = $(this);
		i = setTimeout(function() {
			t.addClass("current").siblings().removeClass("current")
		}, 400)
	}), $(".zl-pc-nav-column-li").mouseleave(function() {
		clearTimeout(i), $(".zl-pc-nav-column-li").removeClass("current")
	})) : ($(".zl-pc-nav-column-li").mouseenter(function() {
		var e = $(document).scrollTop();
		"block" == $(".browsehappy").css("display") && e < 10 ? $(".zl-pc-nav-con").css("top", $(".browsehappy").outerHeight(!0) + 90+$(".banner_index_top").height()) : $(".zl-pc-nav-con").css("top", 90+$(".banner_index_top").height()), $(".lazyload img", this).trigger("appear"), clearTimeout(i);
		var t = $(this);
		i = setTimeout(function() {
			t.addClass("current").siblings().removeClass("current")
		}, 250)
	}), $(".zl-pc-nav-column-li").mouseleave(function() {
		clearTimeout(i), $(".zl-pc-nav-column-li").removeClass("current")
	})), $("#txtSearch_Navigation").on("focus input propertychange", function(e) {
		e.stopPropagation(), "" == $(this).val() || $(this).val() == $(".zl-pc-searching-box .inputInfohint").val() ? $(".zl-pc-searching-tip").show() : $(".zl-pc-searching-tip").siblings("ul").length > 0 && !$(".zl-pc-searching-tip").siblings("ul").is(":hidden") && $(".zl-pc-searching-tip").hide()
	})
}, Base.prototype.v2FooterFun = function() {
	$(".foot-nav-cell").on("click", function() {
		var e = $(this);
		e.hasClass("current") ? (e.removeClass("current"), e.find("dd").removeClass("current"), e.find(".iconfont").addClass("icon-expansion").removeClass("icon-collapse")) : ($(".foot-nav-cell").removeClass("current"), $(".foot-nav-cell").find("dd").removeClass("current"), $(".foot-nav-cell").find(".iconfont").addClass("icon-expansion").removeClass("icon-collapse"), e.addClass("current"), e.find("dd").addClass("current"), e.find(".iconfont").removeClass("icon-expansion").addClass("icon-collapse"))
	})
};
var baseLib = new Base;
baseLib.wapManuNav(), baseLib.navigationIncident(), baseLib.promptIncident(), baseLib.searchIncident(), baseLib.contourFun(".subset-industry-I", "dd", "span"), baseLib.BrowseHappyFun(), baseLib.replaceImg(), baseLib.replaceImglazyload(), baseLib.browserVersion(), baseLib.pageTop(), baseLib.v2SetHeight(), baseLib.v2HeadFun(), baseLib.v2FooterFun(), baseLib.v2PromptIncident();
var win_W = $(window).width();
switch ($(window).resize(function() {
	var e = $(window).width();
	e != win_W && (win_W = e, baseLib.replaceImg(), baseLib.replaceImglazyload())
}), baseLib.browserVersion()) {
case "6":
case "7":
case "8":
case "0":
	var cook = $.cookie("browserVersionie8");
	null == cook && ($.cookie("browserVersionie8", "ok", {
		expires: 1,
		path: "/"
	}), $(".prompt-ie8").fadeIn())
}
$.fn.extend({
	setWidthHeight: function(e) {
		var t = $.extend({}, {
			scale: 4 / 3
		}, e),
			i = $(this),
			n = i.width(),
			a = n / t.scale;
		i.css("height", a), $(window).resize(function() {
			i.each(function() {
				$(this).hasClass("over") || (n = i.width(), a = n * t.h / t.w, i.css("height", a))
			})
		})
	}
}), $(".lazyload img").length > 0 && $(".lazyload img").lazyload({
	threshold: 100,
	failure_limit: 100,
	event: "scroll",
	effect: "fadeIn",
	container: window,
	data_attribute: "original",
	skip_invisible: !0,
	appear: null,
	load: function() {
		$(this).parents(".lazyload").css({
			height: "auto",
			background: "none"
		}).addClass("over")
	}
}), $(".lazyload-v2 img").length > 0 && $(".lazyload-v2 img").lazyload({
	threshold: 100,
	failure_limit: 100,
	event: "scroll",
	effect: "fadeIn",
	container: window,
	data_attribute: "original",
	skip_invisible: !0,
	appear: null,
	load: function() {
		$(this).parents(".lazyload-v2").css({
			height: "auto",
			background: "none"
		}).addClass("over")
	}
}), function(e) {
	if (e("#need_help_desktop").length > 0) {
		var t = 0;
		e(window).scroll(function() {
			0 == t && e(document).scrollTop() > 100 && e(window).width() > 767 && (e("#need_help_desktop").fadeIn(330), t = 1)
		});
		e("#need_help_popup ul").height();
		e("#need_help_desktop").click(function(e) {
			e.stopPropagation()
		}), e("#need_help_desktop .tab_help_open").click(function(t) {
			if (t.stopPropagation(), e(window).width() <= 767) e("#need_help_popup").css("top", "132px").show();
			else if (e(this).hasClass("close")) {
				"ar-sa" == e("#gLanguageCurrent").val() ? e("#need_help_desktop").animate({
					left: -250
				}, 330) : e("#need_help_desktop").animate({
					right: -250
				}, 330);
				var i = e("#need_help_desktop .tab_help_open img").height() + 16;
				e("#need_help_desktop #need_help_popup,#need_help_desktop .tab_help_open").animate({
					height: i
				}, function() {
					e("#need_help_desktop .tab_help_open").removeClass("close clickopen").addClass("clickclose")
				})
			} else "ar-sa" == e("#gLanguageCurrent").val() ? e("#need_help_desktop").animate({
				left: 0
			}) : e("#need_help_desktop").animate({
				right: 0
			}), e("#need_help_desktop #need_help_popup,#need_help_desktop .tab_help_open").animate({
				height: 330
			}, function() {
				e("#need_help_desktop .tab_help_open").addClass("close clickopen").removeClass("clickclose")
			})
		}), e("#footer_nav_mobile_back_to_top").click(function() {
			window.scrollTo(0, 0)
		}), e("body").click(function() {
			"ar-sa" == e("#gLanguageCurrent").val() ? e("#need_help_desktop").animate({
				left: -250
			}, 330) : e("#need_help_desktop").animate({
				right: -250
			}, 330);
			var t = e("#need_help_desktop .tab_help_open img").height() + 16;
			e("#need_help_desktop #need_help_popup,#need_help_desktop .tab_help_open").animate({
				height: t
			}), e("#need_help_desktop .tab_help_open").removeClass("close clickopen").addClass("clickclose")
		})
	}
}(jQuery), $(function() {
	function e() {
		var e = $(".zl-pc-header").height(),
			t = $(".index-quick-links").height(),
			i = $(window).width(),
			n = innerHt - e - t;
			
			var h = innerHt;
			
			// console.log(test+"-----------");
			
		imgT = -(.78125 * i - n) / 2, imgT > 0 && (imgT = 0), i > 768 ? n / i > .5625 ? ($(".index-banner-video video").width("auto"), $(".index-banner-video video").height(h)) : ($(".index-banner-video video").width(i), $(".index-banner-video video").height("auto"), $(".index-banner-video video").css({
			//marginTop: -(.5625 * i - n) / 2
			marginTop: -h
		})) : $(".index-banner-video video").remove()
	}

	function t() {
		var e = $(".zl-pc-header").height(),
			t = $(".index-quick-links").height(),
			i = $(window).width(),
			n = innerHt - e - t;

		var h =innerHt;
		imgT = -(.78125 * i - n) / 2, imgT > 0 && (imgT = 0), i > 768 && $(".index-banner-video img").css({
			//marginTop: imgT
			marginTop: h
		})
	}
	var i = $(window).width(),
		n = (innerHt, $(".zl-pc-header").height()),
		a = $(".index-quick-links").height(),
		o = $(window).width(),
		s = innerHt ;
	if (t(), 6 != baseLib.browserVersion() && 7 != baseLib.browserVersion() && 8 != baseLib.browserVersion() && 0 != baseLib.browserVersion() && "ios" != baseLib.browserVersion() && "android" != baseLib.browserVersion()) {
		var r = $(".index-banner-video").data("video"),
			l = new XMLHttpRequest;
		l.open("GET", r, !0), l.responseType = "arraybuffer", l.onload = function(t) {
			var i = new Blob([l.response], {
				type: "video/mp4"
			}),
				n = new FileReader;
			n.readAsDataURL(i), n.onload = function(t) {
				var i = n.result;
				// localStorage.setItem("indexVideo", ""), localStorage.setItem("indexVideo", i);
				var a;
				a = setInterval(function () {
					// if (null != localStorage.getItem("indexVideo")) {
						// console.log("视频加载完成-");
						clearInterval(a);
						$(".index-banner-video").prepend("<video loop='loop' autoplay='autoplay'><source type='video/mp4'></video>"), $(".index-banner-video source").attr("src",i);
						var t = $(".index-banner-video video");
						try{ 
							t.autoplay = !0, t.loop = !0, t[0].onended = function() {}, $(".index-banner-video .imgbox").remove(), e()
						}catch(error){ 
						}
					// }
				}, 1e3)
			}
		}, l.send()
	}
	$(".banner").adaptiveRotation({
		proportion: o / s,
		beforeFun: function() {
			n = $(".zl-pc-header").height(), a = $(".index-quick-links").height(), o = $(window).width(), s = innerHt, this.proportion = o / s
		}
	}), $(".wap-events").adaptiveRotation({
		autoRotation: !1,
		expand_textbox: ".text",
		proportionMobile: 800
	}), $(".events .pc-events ul li").on("mouseenter", function() {
		$(this).addClass("current").siblings().removeClass("current")
	});
	var c = $(".events .pc-events").height(),
		u = $(".view-all-events").height();
	o > 1200 ? $(".events .pc-events .ul").height(c - u) : $(".events .pc-events .ul").height(c), setTimeout(function() {
		baseLib.contourFun(".quick-links ul", "li", "a", 0)
	}, 1e3), baseLib.contourFun(".featured-products ul", "li", ".text");
	try{ 
		var d = $(".wap-events").offset().top;
	}catch(error){ 
	}
		h = innerHt,
		p = !0;
	$(window).scroll(function() {
		var e = $(window).scrollTop();
		d - h < e && p && (p = !1, $(".wap-events ul li").each(function() {
			var e = $(this).index();
			$(this).find("img").css("left", -200 * e).attr("src", $(this).find("img").data("original"))
		}))
	}), function() {
		if (i <= 640) {
			var e = $(".featured-products .list-moddle2").eq(1).find(".pic").clone();
			$(".featured-products .list-moddle2").eq(1).find(".pic").remove(), e.prependTo($(".featured-products .list-moddle2").eq(1).find(".block")), $(".featured-products .lazyload-v2 img").lazyload({
				threshold: 100,
				failure_limit: 100,
				event: "scroll",
				effect: "fadeIn",
				container: window,
				data_attribute: "original",
				skip_invisible: !0,
				appear: null,
				load: function() {
					$(this).parents(".lazyload-v2").css({
						height: "auto",
						background: "none"
					}).addClass("over")
				}
			})
		}
	}(), $(window).resize(function() {
		var n = $(window).width();
		if (i != n) {
			i = n, baseLib.contourFun(".quick-links ul", "li", "a", 0), baseLib.contourFun(".featured-products ul", "li", ".text"), 6 != baseLib.browserVersion() && 7 != baseLib.browserVersion() && 8 != baseLib.browserVersion() && 0 != baseLib.browserVersion() && "ios" != baseLib.browserVersion() && "android" != baseLib.browserVersion() ? e() : t();
			var a = $(".events .pc-events").height(),
				s = $(".view-all-events").height();
			o > 1200 ? $(".events .pc-events .ul").height(a - s) : $(".events .pc-events .ul").height(a)
		}
		var h = $(".banner-list").height();
		$(".index-banner-video video").css({
			//marginTop: -(.5625 * i - n) / 2
			marginTop: -h
		})
		
	}), i < 1600 && i > 1200 && $(".pc-eventsmore a.link").eq(2).css("display", "none"), i > 768 && i < 1200 && ($(".pc-eventsmore a.link").eq(1).css("display", "none"), $(".pc-eventsmore a.link").eq(2).css("display", "none")), $(".pc-events ul li").eq(3).after($(".pc-events ul li").eq(2))
}), String.prototype.format = function(e) {
	var t = this;
	if (arguments.length > 0) if (1 == arguments.length && "object" == typeof e) {
		for (var i in e) if (e[i] != undefined) {
			a = new RegExp("({" + i + "})", "g");
			t = t.replace(a, e[i])
		}
	} else for (var n = 0; n < arguments.length; n++) if (arguments[n] != undefined) {
		var a = new RegExp("({)" + n + "(})", "g");
		t = t.replace(a, arguments[n])
	}
	return t
}, String.prototype.trim = function() {
	return this.replace(/^[\s﻿ ]+|[\s﻿ ]+$/g, "")
}, String.prototype.trimStart = function(e, t) {
	if (!e) return this;
	var i = this;
	for (t && 1 == t && (e = e.toLowerCase(), i = i.toLowerCase());;) {
		if (i.substr(0, e.length) != e) break;
		i = i.substr(e.length)
	}
	return i
}, String.prototype.trimEnd = function(e, t) {
	if (!e) return this;
	var i = this;
	for (t && 1 == t && (e = e.toLowerCase(), i = i.toLowerCase());;) {
		if (i.substr(i.length - e.length, e.length) != e) break;
		i = i.substr(0, i.length - e.length)
	}
	return i
}, String.prototype.startWith = function(e, t) {
	var i = t && 1 == t ? "i" : "";
	return new RegExp("^" + e, i).test(this)
}, String.prototype.endWith = function(e, t) {
	var i = t && 1 == t ? "i" : "";
	return new RegExp(e + "$", i).test(this)
}, Number.prototype.format = function(e, t) {
	var i, n = this;
	return n = (void 0 !== e ? n.toFixed(e) : n).toString(), i = n.split("."), i[0] = i[0].toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1" + (t || ",")), i.join(".")
}, Date.prototype.format = function(e) {
	var t = {
		"M+": this.getMonth() + 1,
		"d+": this.getDate(),
		"h+": this.getHours(),
		"m+": this.getMinutes(),
		"s+": this.getSeconds(),
		"q+": Math.floor((this.getMonth() + 3) / 3),
		S: this.getMilliseconds()
	};
	/(y+)/.test(e) && (e = e.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length)));
	for (var i in t) new RegExp("(" + i + ")").test(e) && (e = e.replace(RegExp.$1, 1 == RegExp.$1.length ? t[i] : ("00" + t[i]).substr(("" + t[i]).length)));
	return e
};
var baseUtils = baseUtils || {
	showLoading: function() {
		if ($("#enpdloading").length <= 0) {
			var e = $("<div id='enpdloading'></div>"),
				t = $("<div></div>");
			t.html("<span><img src='/Assets/enp/img/loading.gif' />Loading...</span>"), e.html(t), $("body").append(e).fadeIn()
		} else $("#enpdloading").fadeIn()
	},
	closeLoading: function() {
		$("#enpdloading").fadeOut()
	},
	getQueryString: function(e) {
		var t = new RegExp("(^|&)" + e + "=([^&]*)(&|$)"),
			i = window.location.search.substr(1).match(t);
		return null != i ? unescape(i[2]) : null
	},
	hasQuestionMark: function(e) {
		return /\?/.test(e)
	},
	getHostUrl: function() {
		return location.protocol + "//" + location.host
	},
	checkLogin: function(e) {
		var t = e.forceLogin == undefined || e.forceLogin;
		e.isLogin = !1, e.userId = "";
		var i = $.cookie("uid"),
			n = $.cookie("hwsso_uniportal"),
			a = $.cookie("login_uid");
		if (null != n && "undefined" != n && "" != n && '""' != n || null != a && "undefined" != a && "" != a || null != i && "undefined" != i && "" != i) {
			var o = $("#hfUserstate").val();
			o && "" != o && (o += "?action=checklogin", baseUtils.ajaxRequest({
				url: o,
				dataType: "json",
				cache: !1,
				async: !1,
				showLoading: !1,
				success: function(i) {
					i && (e.userId = i.UserId, e.isLogin = i.IsLogin), 0 == e.isLogin ? 1 == t ? window.location.href = $("#hidelonginLinkStr").val() + encodeURIComponent(location.href) : e.failCallBack && "function" == typeof e.failCallBack && e.failCallBack(e) : e.callBack && "function" == typeof e.callBack && e.callBack(e)
				}
			}))
		} else 0 == e.isLogin && (1 == t ? window.location.href = $("#hidelonginLinkStr").val() + encodeURIComponent(location.href) : e.failCallBack && "function" == typeof e.failCallBack && e.failCallBack(e))
	},
	ajaxRequest: function(e) {
		var t = e.url,
			i = e.type || "GET",
			n = e.dataType || "json",
			a = e.async == undefined || e.async,
			o = e.cache == undefined || e.cache,
			s = e.showLoading == undefined || e.showLoading;
		if (t == undefined || "" == t) {
			var r = window.location.href;
			r = r.replace("#", ""), t = baseUtils.hasQuestionMark(r) ? r + "&d=ws" : r + "?d=ws"
		}
		$.ajax({
			url: t,
			type: i,
			dataType: n,
			cache: o,
			async: a,
			data: e.data,
			beforeSend: function(t) {
				s && baseUtils.showLoading(), e.beforeSend && "function" == typeof e.beforeSend && e.beforeSend(t)
			},
			complete: function(t, i) {
				e.complete && "function" == typeof e.complete && e.complete(t, i), s && baseUtils.closeLoading()
			},
			success: function(t, i, n) {
				e.success && "function" == typeof e.success && e.success(t, i, n)
			},
			error: function(t, i, n) {
				e.error && "function" == typeof e.error && e.error(t, i, n)
			}
		})
	}
},
	_COUNT = 0;
$(function() {
	AppendMobileLoginNew(), LoginCookieTipsNew(), GetUserInfoNew(), SaveSourceCookie(), $(".zl-pc-search-icon").on("click", function(e) {
		0 == _COUNT && showSearchKey(), _COUNT++
	})
});
var winW = $(window).width(),
	hwa_DisablHwa = "e.huawei.com" != document.domain || "1" == $("#hidDisableHwa").val() || navigator.userAgent.match(/AppleWebKit.*Mobile.*/) || navigator.userAgent.indexOf("iPad") > -1;
!hwa_DisablHwa && checkDomain(), $(function() {
	get_FeedBack_Url()
}), window.Base = window.Base ||
function() {}, window.console = window.console || {
	log: function() {},
	warn: function() {},
	error: function() {},
	info: function() {}
}, Base.prototype.v2BreadCrumbs = function() {
	function e() {
		if (!($(".secondary-nav-v2").length < 1)) {
			var e = $("#hidtemplateid").val(),
				t = $(".anchorpoint");
			t.length < 1 ? $(".secondary-nav-v2").remove() : ("{EBAD1408-BE02-465C-98E7-062918195BD1}" == e && ($("#sectionCollection").append('<li class="current"><a href="javascript:;">' + $("#hidSummaryValue").val() + "</a></li>"), t.each(function(e, i) {
				for (var n = t[e].className.split(" "), a = 0; a < n.length; a++) {
					if ("js_section_2" == n[a]) {
						$("#sectionCollection").append('<li><a href="javascript:;">' + $("#hidBenefit").val() + "</a></li>");
						break
					}
					if ("js_section_3" == n[a]) {
						$("#sectionCollection").append('<li><a href="javascript:;">' + $("#hidSolutionsVideo").val() + "</a></li>");
						break
					}
					if ("js_section_4" == n[a]) {
						$("#sectionCollection").append('<li><a href="javascript:;">' + $("#hidSubSolutions").val() + "</a></li>");
						break
					}
					if ("js_section_5" == n[a]) {
						$("#sectionCollection").append('<li><a href="javascript:;">' + $("#hidTechSupport").val() + "</a></li>");
						break
					}
					if ("js_section_7" == n[a]) {
						$("#sectionCollection").append('<li><a href="javascript:;">' + $("#hidCaseStudies").val() + "</a></li>");
						break
					}
					if ("js_section_9" == n[a]) {
						$("#sectionCollection").append('<li><a href="javascript:;">' + $("#hidMoreResources").val() + "</a></li>");
						break
					}
					if ("js_section_10" == n[a]) {
						$("#sectionCollection").append('<li><a href="javascript:;">' + $("#hidRecommendDocument").val() + "</a></li>");
						break
					}
					if ("js_section_11" == n[a]) {
						$("#sectionCollection").append('<li><a href="javascript:;">' + $("#hidExpertModule").val() + "</a></li>");
						break
					}
					if ("js_section_16" == n[a]) {
						$("#sectionCollection").append('<li><a href="javascript:;">' + $("#hidRelateProduct").val() + "</a></li>");
						break
					}
				}
			})), "{A2961078-DE07-4E0E-8156-A24A30D85ED2}" == e && ($("#sectionCollection").append('<li class="current"><a href="javascript:;">' + $("#hidSummaryValue").val() + "</a></li>"), t.each(function(e, i) {
				for (var n = t[e].className.split(" "), a = 0; a < n.length; a++) {
					if ("js_section_2" == n[a]) {
						$("#sectionCollection").append('<li><a href="javascript:;">' + $("#hidFeatures").val() + "</a></li>");
						break
					}
					if ("js_section_3" == n[a]) {
						$("#sectionCollection").append('<li><a href="javascript:;">' + $("#hidSpecifications").val() + "</a></li>");
						break
					}
					if ("js_section_5" == n[a]) {
						$("#sectionCollection").append('<li><a href="javascript:;">' + $("#hidTechSupport").val() + "</a></li>");
						break
					}
					if ("js_section_6" == n[a]) {
						$("#sectionCollection").append('<li><a href="javascript:;">' + $("#hidRelateResource").val() + "</a></li>");
						break
					}
					if ("js_section_9" == n[a]) {
						$("#sectionCollection").append('<li><a href="javascript:;">' + $("#hidMoreResources").val() + "</a></li>");
						break
					}
					if ("js_section_10" == n[a]) {
						$("#sectionCollection").append('<li><a href="javascript:;">' + $("#hidRecommendDocument").val() + "</a></li>");
						break
					}
				}
			})), $(".secondary-nav-v2").find("li").length < 2 && $(".secondary-nav-v2").remove())
		}
	}

	function t() {
		return (_ = p.find(".secondary-nav-v2")).length && _.show(), k = _.find("ul"), C = _.find("li"), x = _.find(".prev"), E = _.find(".next"), D = _.find(".secondary-nav-v2-wrap"), 0 == (A = $(".anchorpoint")).length || 0 == _.length
	}

	function i(e, t) {
		return parseFloat(e.css(t), 10) || 0
	}

	function n(e) {
		return parseFloat(e, 10) || 0
	}

	function a(e) {
		var t = y.find("li"),
			a = (w.width() - i(w, "padding-left") - i(w, "padding-right") - 100) * e,
			o = t.length,
			s = 0;
		o && (s = n(t.eq(0).width())), o > 1 && (s += n(t.eq(o - 1).width()));
		for (var r, l = o - 2; l > 0; l--) {
			var c = n(t.eq(l).width());
			if (c + s > a) {
				r = l;
				break
			}
			s += c
		}
		if (r) {
			var u = t.filter(function(e) {
				return e > 0 && e < r
			});
			t.eq(r).html('<span class="title" href="javascript:;" > <em class="iconfont icon-right"></em> <span>...</span> </span>'), u.remove()
		}
	}

	function o() {
		if (0 != p.length) {
			var e = w.width() - i(w, "padding-left") - i(w, "padding-right") - 100,
				t = 0;
			(y.hasClass("current") ? y.find("ul") : b).children().each(function() {
				t += $(this).width()
			});
			var n = 2;
			k.children().each(function() {
				n += $(this).width()
			}), k.width(n);
			var a;
			return (a = y.hasClass("current") ? .4 * e : e - t) > n + 60 && (a = n + 60), _.width(a), s(a), a
		}
	}

	function s(e) {
		if (0 != p.length) {
			var t = i(k, M ? "margin-right" : "margin-left"),
				n = k.width(),
				a = e - i(D, "margin-left") - i(D, "margin-right");
			t < 0 ? x.css("display", "block") : x.css("display", "none"), a - n >= t ? E.css("display", "none") : E.css("display", "block")
		}
	}

	function r() {
		E.on("click", function() {
			c(!1, !0);
			var e = o(),
				t = i(k, M ? "margin-right" : "margin-left"),
				n = k.width(),
				a = e - i(D, "margin-left") - i(D, "margin-right"),
				r = t + n - a,
				l = t;
			if (r > 0 && (l = r > a ? t - a : t - r), l != t) {
				var u = M ? {
					marginRight: l
				} : {
					marginLeft: l
				};
				k.stop(!0, !0).animate(u, 200, function() {
					s(e)
				})
			}
		}), x.on("click", function() {
			c(!1, !0);
			var e = o(),
				t = i(k, M ? "margin-right" : "margin-left"),
				n = e - i(D, "margin-left") - i(D, "margin-right"),
				a = t;
			if (t < 0 && (a = -t > n ? t + n : 0), a != t) {
				var r = M ? {
					marginRight: a
				} : {
					marginLeft: a
				};
				k.stop(!0, !0).animate(r, 200, function() {
					s(e)
				})
			}
		});
		var e;
		C.on("click", function() {
			var t = $(this).index(),
				i = h.height(),
				n = v.height(),
				a = p.offset().top;
			g && ("fixed" !== v.css("position") ? (v.css({
				position: "fixed",
				top: 0
			}), h.stop(!0, !0).animate({
				top: -i
			}, 300)) : (h.stop(!0, !0).animate({
				top: -i
			}, 300), v.stop(!0, !0).animate({
				top: 0
			}, 300))), T = [], A.each(function() {
				T.push($(this).offset().top - n)
			});
			var o = T[t];
			L = !0, clearTimeout(e), $("body,html").stop(!0, !0).animate({
				scrollTop: o
			}, 300, function() {
				clearTimeout(e), e = setTimeout(function() {
					L = !1
				}, 200)
			}), c(!1), u(o + 1, a)
		}), $(".breadcrumbs-title-more-v2 a").on("click", function() {
			c(!0), l(o())
		})
	}

	function l(e) {
		if (0 != p.length) {
			var t = _.find("li.current");
			if (0 != t.length) {
				e || (e = o());
				var n = t.offset().left,
					a = k.offset().left,
					s = t.width(),
					r = e - i(D, "margin-left") - i(D, "margin-right"),
					l = k.width(),
					c = n - a - (r - s) / 2;
				c = c > 0 && c < l - r ? -(c = M ? l - r - c : c) : c < 0 ? M ? r - l : 0 : M ? 0 : r - l;
				var u = M ? {
					marginRight: c
				} : {
					marginLeft: c
				};
				k.stop(!0, !0).animate(u, 200, function() {
					o()
				})
			}
		}
	}

	function c(e, t) {
		0 != p.length && (e ? b.hasClass("current") && (b.removeClass("current"), y.addClass("current"), y.css(M ? "margin-right" : "margin-left", 0)) : g && y.hasClass("current") && (y.removeClass("current"), b.addClass("current"), y.css(M ? "margin-right" : "margin-left", -y.width() - 20)), t || (clearTimeout(m), m = setTimeout(function() {
			l(o())
		}, 100)))
	}

	function u(e, t) {
		if (0 != p.length) {
			var n = v.height(),
				a = i(v, "top"),
				s = [];
			A.each(function() {
				s.push($(this).offset().top + $(this).height() - n - a)
			});
			for (var r = s.length, c = 0; c < r; c++) if (e <= s[c]) {
				I != c && (C.eq(c).addClass("current").siblings().removeClass("current"), clearTimeout(m), m = setTimeout(function() {
					l(o())
				}, 200), I = c);
				break
			}
		}
	}

	function d() {
		0 != p.length && u($(window).scrollTop(), p.offset().top)
	}
	var h = $(".zl-pc-header"),
		p = $(".breadcrumbs-nav-box-v2"),
		f = $(".bannar-breadcrumbs-wrap");
	if (0 == h.length && (h = $(".nav-section .nav")), 0 != h.length) {
		var g, m, v = p.find(".breadcrumbs-nav-v2"),
			y = p.find(".breadcrumbs-v2"),
			b = p.find(".breadcrumbs-title-more-v2"),
			w = v.find(">.cistern"),
			_ = p.find(".secondary-nav-v2"),
			k = _.find("ul"),
			C = _.find("li"),
			x = _.find(".prev"),
			E = _.find(".next"),
			D = _.find(".secondary-nav-v2-wrap"),
			A = $(".anchorpoint"),
			L = !1,
			T = [],
			M = !1,
			I = -2,
			P = 0,
			S = 0,
			R = "top";
		$(window).scroll(function() {
			if (g && !L && !h.data("scroll-lock")) {
				var e = h.height() + 1,
					t = $(window).scrollTop(),
					n = p.length && p.offset().top || 0,
					a = i(h, "top"),
					o = $(document).height(),
					s = innerHt;
				t >= n - e ? t <= n ? (h.stop(!0, !0).delay(100).animate({
					top: n - e - t
				}, 300, function() {
					d()
				}), g ? (v.css({
					position: "static"
				}), c(!0)) : c(!1), R = "topBoundary") : o - t <= s + e ? (R = "bottomBoundary", (t - P < 0 && a < 0 || t - P >= 0) && (h.stop(!0, !0).delay(100).animate({
					top: s - o + t
				}, 300, function() {
					d()
				}), g && v.stop(!0, !0).delay(100).animate({
					top: e + s - o + t
				}, 300)), c(!1)) : (g && "fixed" !== v.css("position") && v.css({
					position: "fixed",
					top: 0
				}), t - P >= 3 ? ("middleDown" != R && (h.stop(!0, !0).animate({
					top: -e
				}, 300, function() {
					d()
				}), g && v.stop(!0, !0).animate({
					top: 0
				}, 300)), R = "middleDown") : t - P <= -3 && ("middleUp" != R && (h.stop(!0, !0).animate({
					top: 0
				}, 300, function() {
					d()
				}), g && v.stop(!0, !0).animate({
					top: e
				}, 300)), R = "middleUp"), c(!1)) : (g && v.css({
					position: "static"
				}), c(!0), "top" !== R && h.stop(!0, !0).animate({
					top: 0
				}, 300, function() {
					d()
				}), R = "top"), P = t, d()
			}
		}).on("resize.breadCrumb", function() {
			clearTimeout(S), S = setTimeout(function() {
				l(o())
			}, 200)
		}), function() {
			if (e(), g = !t(), k.parents(".direction").length && "rtl" == k.parents(".direction").css("direction") && (M = !0), r(), g && 0 != p.length) {
				f.css("min-height", v.height());
				var i = p.offset().top,
					n = h.height() + 1;
				a(.6), o(), $(window).scrollTop() >= i ? (g && v.css({
					position: "fixed",
					top: n
				}), c(!1)) : (g && v.css({
					position: "static"
				}), c(!0)), l(o())
			} else a(1)
		}(), o()
	}
}, $(function() {
	window.baseLib ? baseLib.v2BreadCrumbs() : (new Base).v2BreadCrumbs(s)
});