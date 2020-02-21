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
});