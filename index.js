import "./lib/css/main.scss"
require("fullpage.js")
const $ = require("jquery")

$('#fullpage').fullpage({
  continuousVertical: false,
  menu: '#menu',
  'navigation': true,
  'scrollingSpeed': 700,
  anchors: ['page1', 'page2', 'page3', 'page4', 'page5', 'page6'],
});

$(".down img").click(function(){
  $.fn.fullpage.moveSectionDown();
})