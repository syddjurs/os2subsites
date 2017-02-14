// |--------------------------------------------------------------------------
// | News block isotoper
// |--------------------------------------------------------------------------
// |
// | This jQuery script is written by
// | Yani Xu
// |
var newsIsotoper = (function ($) {
    'use strict';
    var pub = {};

    /**
     * Instantiate
     */
    pub.init = function (options) {

        $(window).on('load', function () {
            registerEventHandlers();
            registerBootEventHandlers();
        });
    };
    var button = 'filter-all';
    var button_class = "btn-primary";
    var button_normal = "btn-quaternary";
    function check_button(button){
      $('.filter-link').removeClass(button_class);
      $('.filter-link').addClass(button_normal);
      $('#'+button).addClass(button_class);
      $('#'+button).removeClass(button_normal);
    }

    function load_content() {
      var $container = $("#news-content-isotoper .view-content");

      $container.imagesLoaded(function(){

        $container.masonry({
          columnWidth: '.switch-elements',
        });

        /*$container.infinitescroll({
          state : {
            currPage: 0
          },
          // selector for the paged navigation
          navSelector  : '.pagination',
          // selector for the NEXT link (to page 2)
          nextSelector : '.pagination li.next a',
          // selector for all items you'll retrieve
          itemSelector : '.switch-elements',
          loading: {
            //finishedMsg: 'Der er ikke flere.',
            //img: 'http://i.imgur.com/qkKy8.gif'
          },
          debug: false,
        },
        function(newElements) {
          var $newElems = $(newElements).hide();
          $newElems.imagesLoaded(function(){
            $newElems.fadeIn(); // fade in when ready
            $container.masonry( 'appended', $newElems);
            Drupal.attachBehaviors();
          });
            /*setTimeout(function() {
              $container.masonry( 'insert', $newElems);
            }, 500);
        }
        );*/
      });
    }
    /**
     * Register event handlers
     */
    function registerEventHandlers() {

      var $container = $("#news-content-isotoper .view-content");
      check_button(button);

      // filter buttons.
      $('.filter-link').click(function(event){
        $(this).addClass(button_class);
        button = $(this).attr('id');
        check_button(button);
        var filterValue = $( this ).attr('data-filter');
        jQuery.get("/aktulet_news/ajax/view/"+filterValue+'/'+20, function(data){
          $('#news-content-isotoper').html(data);
          load_content();
        });
      });

      $container = $("#news-content-isotoper .view-content");

      // Initial masonry
      if ($container.length) {
        load_content();
      }


    };
    function registerBootEventHandlers() {

    }

  return pub;

})( jQuery );