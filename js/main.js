var waypoint = new Waypoint({
  element: document.getElementById('navbar'),
  handler: function(direction) {
    if (direction === 'down') {
      $(document.getElementById('fixednavbar')).show();
    }
    else {
      $(document.getElementById('fixednavbar')).hide();
    }
  }
})

// Init controller
var controller = new ScrollMagic({
  globalSceneOptions: {
    duration: $('section').height(),
    triggerHook: .025,
    reverse: true
  }
});

// init ScrollMagic Controller
controller2 = new ScrollMagic();

// Scale Animation Setup
// .to('@target', @length, {@object})
// var scale_tween = TweenMax.to('#scale-animation', 1, {
//   transform: 'scale(.75)',
//   ease: Linear.easeNone
// });

// var scale_tween2 = TweenMax.to('#name', 1, {
//   transform: 'scale(.75)',
//   ease: Linear.easeNone
// });

new ScrollScene({triggerElement: '#intro'})
								.setClassToggle('#intro-anchor', 'active')
								.addTo(controller);
new ScrollScene({triggerElement: '#section-1'})
								.setClassToggle('#anchor1', 'active')
								.addTo(controller);
new ScrollScene({triggerElement: '#section-2'})
								.setClassToggle('#anchor2', 'active')
								.addTo(controller);
new ScrollScene({triggerElement: '#section-3'})
								.setClassToggle('#anchor3', 'active')
								.addTo(controller);

// Change behaviour of controller
// to animate scroll instead of jump
controller.scrollTo(function(target) {

  TweenMax.to(window, 0.5, {
    scrollTo : {
      y : target,
      autoKill : true // Allow scroll position to change outside itself
    },
    ease : Cubic.easeInOut
  });

});


//  Bind scroll to anchor links
$(document).on("click", "a[href^=#]", function(e) {
  var id = $(this).attr("href");

  if($(id).length > 0) {
    e.preventDefault();

    // trigger scroll
    controller.scrollTo(id);

    // If supported by the browser we can also update the URL
    if (window.history && window.history.pushState) {
      history.pushState("", document.title, id);
    }
  }
})

// Scale Scene
// var scale_scene = new ScrollScene({
//   triggerElement: '#scale-trigger',
//   triggerHook: 0 // don't trigger until #pinned-trigger1 hits the top of the viewport
// })
// .setTween(scale_tween);
// // Scale Scene
// var scale_scene = new ScrollScene({
//   triggerElement: '#intro',
//   offset: 200,
//   triggerHook: 0 // don't trigger until #pinned-trigger1 hits the top of the viewport
// })
// .setTween(scale_tween2);

var scrolltonav = TweenMax.to(".name", 0.5, {
  autoAlpha: 0,
  y: 150,
  scale: 0.75,
  force3D:true
});

var scene2 = new ScrollScene({
    duration: 350,
    triggerHook: "onLeave"
})
.setTween(scrolltonav)
.addTo(controller2);

var pinned_scene = new ScrollScene({
  triggerElement: "#pinned-trigger1", // point of execution
  duration: $(window).height() - 100, // pin element for the window height - 1
  triggerHook: "onExit", // don't trigger until #pinned-trigger1 hits the top of the viewport
  reverse: true // allows the effect to trigger when scrolled in the reverse direction
})
.setPin("#pinned-element1"); // the element we want to pin

controller2.addScene([
  pinned_scene
]);

$(document).ready(function($) {
  function pathPrepare ($el) {
    var lineLength = $el[0].getTotalLength();
    $el.css("stroke-dasharray", lineLength);
    $el.css("stroke-dashoffset", lineLength);
  }

  var $word = $("path#word");

  // prepare SVG
  pathPrepare($word);

  // init controller
  var controller = new ScrollMagic();

  // build tween
  var tween = new TimelineMax()
    .add(TweenMax.to($word, 0.9, {strokeDashoffset: 0, ease:Linear.easeNone})) // draw word for 0.9
    .add(TweenMax.to("path", 1, {stroke: "#33629c", ease:Linear.easeNone}), 0);     // change color during the whole thing

  // build scene
  var scene = new ScrollScene({triggerElement: "#trigger1", duration: 200, tweenChanges: true})
          .setTween(tween)
          .addTo(controller);
});
