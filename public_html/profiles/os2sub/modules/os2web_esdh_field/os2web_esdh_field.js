/**
 * @file
 * jQuery Tablesorter
 */

(function ($) {
  Drupal.behaviors.os2web_esdh_field = {
    attach: function (context, settings) {
      function TextExtraction(node) {
        return node.childNodes[0].innerHTML;
      }

      $.tablesorter.addParser({
        id: "customDate",
        is: function(s) {
            //return false;
            //use the above line if you don't want table sorter to auto detected this parser
            //21/04/2010 03:54 is the used date/time format
            return /\d{1,2}\/\d{1,2}\/\d{1,4} \d{1,2}:\d{1,2}/.test(s);
        },
        format: function(s) {
            s = s.replace(/\-/g," ");
            s = s.replace(/:/g," ");
            s = s.replace(/\./g," ");
            s = s.replace(/\//g," ");
            s = s.split(" ");

            return $.tablesorter.formatFloat(s[2] + s[1]-1 + s[0]);
        },
        parsed: false,
        type: "numeric"
      });

      var sort = [[0,0]];
      if (settings.os2web_esdh_field) {
        tmpsort = settings.os2web_esdh_field.sort.split(',');
        sort = [[parseInt(tmpsort[0]), parseInt(tmpsort[1])]];
      }

      $('.tablesorter').tablesorter({
        textExtraction: TextExtraction,
        sortList: sort,
        headers : {
          1: {sorter: "customDate"}
        }
      });
    }
  };
})(jQuery);
