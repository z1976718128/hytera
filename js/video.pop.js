 
var cont = "";
cont += '<div class="videoMask" style="display: none;background: rgba(0, 0, 0, 0.5);position: fixed;left: 0px;top: 0px;width: 100%;height: 100%;z-index: 8888;padding-top:'+$(window).height()/3.5+'px;">';
cont += ' <div class="video-js"> <i class="iconfont icon-close videoClose"></i>';
cont += '    <video id="my-video" class="video-js" controls preload="auto" poster="m.png" data-setup="{}">';
cont += '         <source src="'+$('.videoPlay').attr("data-url")+'" type="video/mp4">';
cont += '         <p class="vjs-no-js">尊敬的用户，您的IE浏览器版本过低，为获取更好的浏览体验，请升级您的IE浏览器。 ';
cont += '       </p>';
cont += '  </video></div>';
cont += '</div>';

$("body").append(cont);

var myPlayer = videojs('my-video');

$(".videoPlay").click(function () {
  $(".videoMask").show();
  myPlayer.play();
  $(".videoClose").click(function () {
    console.log(myPlayer);
    myPlayer.load();
    $(".videoMask").hide();
  });
});