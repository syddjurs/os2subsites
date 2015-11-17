/**
 * @file os2web_borger_dk.js
 */

(function($) {
  Drupal.behaviors.os2web_borger_dk = {
    attach: function(context) {
      $("div.mArticle").hide();
      $(".microArticle h2.mArticle").click(function() {
        var myid = $(this).attr('id');
        var style = $('div.' + myid).css('display');
        var path = $(this).css("background-image");
        if (style == 'none') {
          $("div." + myid).show("500");
          path = path.replace('foldOut', 'foldIn');
          $(this).css({
            'background-image' : path,
          });
        }
        else {
          $("div." + myid).hide("500");
          path = path.replace('foldIn', 'foldOut');
          $(this).css({
            'background-image' : path,
          });
        }
      });
    }
  }
})(jQuery);
