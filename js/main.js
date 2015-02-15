// Init controller
var controller = new ScrollMagic({
  globalSceneOptions: {
    duration: $('section').height(),
    triggerHook: .025,
    reverse: true
  }
});

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
  alert('thisworks');
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

});