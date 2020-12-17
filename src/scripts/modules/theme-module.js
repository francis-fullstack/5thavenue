AppName.Modules.ThemeModule = (function () {
  //Dependencies
  var core = AppName.Core;

  //////////////////////
  // Private Methods //
  ////////////////////
  const _privateMethod = () => {
    // private stuff
    $( document ).ready(function() {

      $('.hamburger').on("click",function() {
        $('.sidebar').toggleClass('collapsed')
        $('.hamburger').toggleClass('slide')
        $('.viewer').toggleClass('full')
      })


      $(".sub-item-st").hide();
      $(".sub-item-sl").hide();
      $(".sub-item-layout1").hide();
      $(".sub-item-layout2").hide();

      $(".set-margin-sl").hide();
      $(".set-margin-st").hide();
      $(".set-margin-layout1").hide();
      $(".set-margin-layout2").hide();

      /* Onclick for section 1 - Standard LED */
      $("#floater > .section1").on("click",function() {
        $(".set-margin-sl").toggle();
        $(".sub-item-sl").toggle(); 

        $("i", this).toggleClass("fas fa-caret-right fas fa-caret-down");
      });
      
      /* Onclick for section 2 - Semi Transparent */
      $("#floater > .section2").on("click",function() {
        $(".set-margin-st").toggle();
        $(".sub-item-st").toggle(); 
        $("i", this).toggleClass("fas fa-caret-right fas fa-caret-down");
      });

      /* Onclick for section 3 - Layout 1 */
      $("#floater > .section3").on("click",function() {
        $(".set-margin-layout1").toggle();
        $(".sub-item-layout1").toggle(); 
        $("i", this).toggleClass("fas fa-caret-right fas fa-caret-down");
      });

      /* Onclick for section 4 - Layout 2 */
      $("#floater > .section4").on("click",function() {
        $(".set-margin-layout2").toggle();
        $(".sub-item-layout2").toggle(); 
        $("i", this).toggleClass("fas fa-caret-right fas fa-caret-down");
      });

      /*Make the text font bold when clicked */
      $('.highlight').click(function(e){
        
        
          const clicked_class = $(this).hasClass('makeItBold');
          if(clicked_class == false){
            $(".bodyClass").css('font-weight','normal');
            $("a").removeClass('makeItBold');
            $('.removeable').remove();

            $(this).addClass('makeItBold');
            $(this).prepend("<i class='removeable fas fa-caret-right showIcon'></i>" );
          }
          
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
