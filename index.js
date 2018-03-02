import "./lib/css/main.scss"
import "./lib/css/jquery.fullpage.css"
import "./lib/js/leanCloudInit.js"
const AV = require('leancloud-storage');

require("fullpage.js")
const $ = require("jquery")
$('#fullpage').fullpage({
  continuousVertical: false,
  menu: '#menu',
  'navigation': true,
  anchors: ['page1', 'page2', 'page3', 'page4', 'page5'],
  paddingTop: 85,
  css3: true
});

$(".down img").click(function() {
  $.fn.fullpage.moveSectionDown();
})

$(`.project .tab li`).click(function(event) {
  let $index = $(this).index()
  $(this).addClass('active').siblings().removeClass('active')

  $(`.project .content li`).removeClass('active').eq($index).addClass('active');
});



$(".input-field .contact-message").focus(function() {
  $(this).parent(".input-field").addClass("used")
}).blur(function() {
  if ($(this).val()) return;
  $(this).parent(".input-field").removeClass("used")
})


$(".messageBoard").submit(function(e) {
  e.preventDefault();
  let $message = Array.from($(this).find(".contact-message"))
  let messageObj = {}
  $message.map(function(a, b) {
    let name = $(a).attr("name");
    let value = $(a).val();
    messageObj[name] = value
  })

  var TestObject = AV.Object.extend('TestObject');
  var testObject = new TestObject();
  testObject.save(messageObj).then(function(object) {
    $(".messageSend").addClass("show").on("animationend", function() {
      $(this).removeClass("show")
    })
  }, (a) => { alert("服务器出了一点小问题。") })
})


$(".vp").click(function() {
  $(".imgView").addClass('show')
  console.log($(this));
  $(".imgView img").attr("src", $(this).attr("src"))
})

$(".imgView").click(function(e) {
  $(this).removeClass("show")
  return false
})