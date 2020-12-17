AppName.Modules.ThemeModule = (function () {
  //Dependencies
  var core = AppName.Core;

  //////////////////////
  // Private Methods //
  ////////////////////
  const _privateMethod = () => {
    // private stuff
    $( document ).ready(function() {

      $('.hamburger').click(() => {
        $('.sidebar').toggleClass('collapsed')
        $('.hamburger').toggleClass('slide')
        $('.viewer').toggleClass('full')
      })

      var count = $('.nav').children().length; 

      if (count <= 3) {
        $('.nav-link').css('margin-bottom', '1.7vw');
      }
      
    });
  };

  /////////////////////
  // Public Methods //
  ///////////////////
  const init = function () {
    _privateMethod();
  };

  return {
    init: init,
  };
})();
