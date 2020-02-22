var baseUrl = 'https://demo.oramage.com/project/unknow/cgi/api/api'
var emailRegEx = /[^@]+@[^\.]+\..+/g
var scrollTop = 0
var newScrollTop = 0
var wh = window.innerHeight
var ww = window.innerWidth
var zoom = 1
var size = 'L'

function scrollToSection(id) {
  if (!id || $(id).length === 0) return;
  var offsetTop = 0
  $(id).prevAll().each(function() {
    offsetTop += $(this).innerHeight()
  })

  if (offsetTop < 0) offsetTop = 0
  $('html, body').animate({
    scrollTop: offsetTop
  }, 300);
  $('#nav a').removeClass('active')
  $('#nav a[href="' + id + '"]').addClass('active')
  location.hash = id + '!'
}

function animateEle() {
  $('.ani').each(function () {
    if ($(this).offset().top - scrollTop < (wh - 100)) {
      var effect = $(this).data('effect')
      var duration = $(this).data('duration')
      var delay = $(this).data('delay')
      $(this).removeClass('ani').addClass('animated').addClass(effect).css({
        visibility: 'visible',
        animationDuration: duration,
        animationDelay: delay
      })
    }
  })
}

function updateSize() {
  if (ww > 1024) {
    zoom = 1;
    size = 'L';
  } else if (ww > 750) {
    zoom = ww / 1024;
    size = 'M';
  } else if (ww > 374) {
    zoom = ww / 750;
    size = 'S';
  } else {
    zoom = ww / 750;
    size = 'S XS';
  }
}

function resizeBody() {
  wh = window.innerHeight
  ww = window.innerWidth
  updateSize()
  $('body').attr('class', size);
}

function ajax(url, param, type) {
  return $.ajax({
    url: url,
    data: param || {},
    type: type || 'GET',
    dataType: 'json'
  });
}

function handleScroll() {
  newScrollTop = $(window).scrollTop()
  if (Math.abs(scrollTop - newScrollTop) > 20) {
    scrollTop = newScrollTop
    animateEle()

    if (newScrollTop > 50) {
      if (!$('#back-to-top').hasClass('active')) {
        $('#back-to-top').addClass('active').fadeIn(500);
      }
    } else {
      if ($('#back-to-top').hasClass('active')) {
        $('#back-to-top').removeClass('active').fadeOut(500);
      }
    }
  }
}

$(document).ready(function () {
  window.onresize = resizeBody;
  window.onscroll = handleScroll;
  resizeBody();
  animateEle();
  var hash = location.hash.replace('!', '')
  if (hash !== '#successed') {
    scrollToSection(hash);
  }

  // 返回顶部
  $('#back-to-top').on('click', function () {
    $("body, html").animate({
      scrollTop: 0
    }, 800);
  })

  // 导航按钮跳转
  $('#nav a').click(function (e) {
    e.preventDefault();
    var id = $(this).data('id');
    scrollToSection(id)
  })

  // 打开下载弹窗
  $('.btn-download').click(function (e) {
    e.preventDefault();
    var href = $(this).data('href');
    $('#downloadFormDialog').fadeIn(500);
    $('#downloadFormDialog #retUrl').val(href);
    $('body').css('overflow', 'hidden');
  });

  // 关闭下载弹窗
  $('#downloadFormDialog .menu-btn').click(function (e) {
    e.preventDefault();
    $('#downloadFormDialog').fadeOut(500);
    $('body').css('overflow', '');
  });

  // 提交下载弹窗
  $('#downloadForm .submit-btn').on('click', function (e) {
    e.preventDefault();
    var formData = {};
    formData.first_name = $('#d_first_name').val();
    formData.last_name = $('#d_last_name').val();
    formData.email = $('#d_email').val();
    formData.company = $('#d_company').val();
    formData.country = $('#d_country').val();
    formData.campaign = '2019-poc-en';
    formData.campaign_id = '7017F000000Hp8tQAC';

    if (!formData.first_name || !formData.last_name || !formData.email || !formData.company || !formData.country) {
      alert('Please fill in the required areas.')
      return;
    }

    if (!formData.email.match(emailRegEx)) {
      alert('Please fill in the correct email.')
      return;
    }

    ajax(baseUrl + "/download", formData, "get").done(function (res, status, xhr) {
      // var data = res.data
      if (!res.err) {
        // localStorage.setItem('2019poc_downloadForm', JSON.stringify(data));
        $('#downloadForm').submit();
      } else {
        alert(res.msg)
      }
    }).fail(function (xhr, errorType, error) {
      console.log(xhr, errorType, error);
      alert(error)
    });
  });

  // 打开申请弹窗
  $('.btn-apply').click(function (e) {
    e.preventDefault();
    $('#applyFormDialog').fadeIn(500);
    $('body').css('overflow', 'hidden');
  });

  // 关闭申请弹窗
  $('#applyFormDialog .menu-btn').click(function (e) {
    e.preventDefault();
    $('#applyFormDialog').fadeOut(500);
    $('body').css('overflow', '');
  });

  // 提交申请弹窗
  $('#applyForm .submit-btn').on('click', function (e) {
    e.preventDefault();
    var formData = {};
    formData.first_name = $('#a_first_name').val();
    formData.last_name = $('#a_last_name').val();
    formData.email = $('#a_email').val();
    formData.company = $('#a_company').val();
    formData.a_country = $('#a_country').val();
    formData.description = $('#a_description').val();
    formData.campaign = '2019-poc-en';
    formData.campaign_id = '7017F000000Hp8tQAC';

    if (!formData.first_name || !formData.last_name || !formData.email || !formData.company || !formData.a_country) {
      alert('Please fill in the required areas.')
      return;
    }

    if (!formData.email.match(emailRegEx)) {
      alert('Please fill in the correct email.')
      return;
    }

    ajax(baseUrl + "/gift", formData, "get").done(function (res, status, xhr) {
      var data = res.data
      if (!res.err) {
        $('#applyDialog').hide();
        $('#applyForm').submit();
      } else {
        alert(res.msg)
      }
    }).fail(function (xhr, errorType, error) {
      console.log(xhr, errorType, error);
      alert(error)
    });
  });

  $('#share-btn').click(function(e) {
    e.preventDefault();

    var url = encodeURIComponent(location.href);
    var origin = encodeURIComponent(location.origin);
    var title = encodeURIComponent('Hytera POC');

    var shareUrls = {
      wechat: location.href,
      linkedin: 'http://www.linkedin.com/shareArticle?mini=true&ro=true&title='+ title +'&url='+ url +'&source=Hytera-POC&armin=armin',
      facebook: 'https://www.facebook.com/sharer/sharer.php?u=' + url,
      twitter: 'https://twitter.com/intent/tweet?text=&url='+ url +'&via=' + origin,
      weibo: 'http://service.weibo.com/share/share.php?url='+ url +'&title='+ title +'&pic=&appkey=',
      qq: 'http://connect.qq.com/widget/shareqq/index.html?url='+ url +'&title='+ title +'&source=&desc=&pics=',
    };
    $('#shareDialog .icon-f').attr('href', shareUrls.facebook);
    $('#shareDialog .icon-t').attr('href', shareUrls.twitter);
    $('#shareDialog .icon-i').attr('href', shareUrls.linkedin);
    $('#qrDialog .qr').qrcode({
      render: 'image',
      text: shareUrls.wechat,
      size: 200
    });

    $('#shareDialog').fadeIn(500);
    $('body').css('overflow', 'hidden');
  });

  $('#shareDialog .icon-w').click(function() {
    $('#qrDialog').fadeIn()
  });

  // 关闭下载弹窗
  $('#qrDialog .menu-btn').click(function (e) {
    e.preventDefault();
    $('#qrDialog').fadeOut(500);
  });

  // 关闭下载弹窗
  $('#shareDialog .menu-btn').click(function (e) {
    e.preventDefault();
    $('#shareDialog').fadeOut(500);
    $('body').css('overflow', '');
  });
});