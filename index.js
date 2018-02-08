import "./lib/css/main.scss"
import "./lib/css/jquery.fullpage.css"
require("fullpage.js")
const $ = require("jquery")

$('#fullpage').fullpage({
  continuousVertical: false,
  menu: '#menu',
  'navigation': true,
  anchors: ['page1', 'page2', 'page3', 'page4', 'page5','page6'],
  paddingTop: 85,
  css3: true
});

$(".down img").click(function(){
  $.fn.fullpage.moveSectionDown();
})