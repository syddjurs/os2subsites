
<article id="node-<?php print $node->nid; ?>" class="<?php print $classes; ?> clearfix"<?php print $attributes; ?>>
  <?php print render($title_prefix); ?>

  <div id='region-content' class="content"<?php print $content_attributes; ?>>

  <?php
  if ($node->type == 'os2web_borger_dk_article') {
    $content_field = array();
    $fields = $node->os2web_borger_dk_article['field_settings'];
    // First get admin display settings.
    $admin_display_fields = variable_get('os2web_borger_dk_display');
    $locked_os2web_types = array('field_os2web_borger_dk_borgerurl' => 1);
    // We get admin microarticle display settings.
    $microarticle = variable_get('os2web_borger_dk_microarticle_active', FALSE);
    if ($microarticle) {
      $field_microarticle_settings = $node->os2web_borger_dk_microarticle['field_microarticle_settings'];
    }

    foreach ($admin_display_fields as $type => $value) {

      // If ADMIN set this field to display.
      if ($admin_display_fields[$type]) {
        $arr = $node-> $type;

      if (count($arr) > 0 && $type != 'title' && $type != 'field_os2web_borger_dk_image') {
          $content_field[$type] = $arr['und']['0']['value'];
        }
        elseif (count($arr) > 0 && $type == 'field_os2web_borger_dk_image') {
          $filepath = $arr['und']['0']['uri'];
          $alt = $arr['und']['0']['alt'];
          $content_field[$type] = theme('image', array('path' => $filepath, 'alt' => $alt, 'title' => $alt));
        }
        else {
          $content_field[$type] = '';
       }
        // Microarticles : if microarticle is set up to show by admin.
        if ($microarticle && $type == 'body') {
          // Check if content field is body and field_microarticle_settings
          // is NOT empty.
          // The field_microarticle_setting will be empty when a new
          // article is imported and shown in a form, then node_view
          // will display full body text.
          if (!empty($field_microarticle_settings)) {
            $body_text = $node->body['und']['0']['value'];
            // Link break in body_text: in windows \r\n, linux \n.
            preg_match("/<\/div>\n/", $body_text, $link_break);
            if (isset($link_break[0])) {
              $div = preg_split("/\n<\/div>\n/", $body_text, -1, PREG_SPLIT_DELIM_CAPTURE);
            }
            else {
              $div = preg_split('/\r\n<[\/]div>\r\n/', $body_text, -1, PREG_SPLIT_DELIM_CAPTURE);
            }
            $show_div = '';
            foreach ($div as $key => $text) {
              $microno = $key + 1;
              $checkboxno = 'os2web_borger_dk_micro_' . $microno;
              // The last div is a link break \n or \r\n.
              if ($div[$key] != $div[(count($div) - 1)]) {
                // If editor set this microarticle to be visible,(TRUE)
                if ($field_microarticle_settings[$microno] != 0) {
                  $show_div .= $div[$key];
                  $show_div .= "\n</div>";
                  $show_div .= "\n";
                }
              }
            }
            $show_div = str_replace("</h2>","</h2><a href='#' class='gplus'>+</a>",$show_div);
            // Content body shows only visible microarticles/ part of body_text.
            $content_field[$type] = $show_div;
          }
          else {
            $show_div = $node->body['und']['0']['value'];
            $show_div = str_replace("</h2>","</h2><a href='#' class='gplus'>+</a>",$show_div);
            $content_field['body'] = $show_div;
          }
        }
        elseif (!$microarticle && $type == 'body') {
          $show_div = $node->body['und']['0']['value'];
          $show_div = str_replace("</h2>","</h2><a href='#' class='gplus'>+</a>",$show_div);
          $content_field['body'] = $show_div;
        }

        // End of microarticles.
        // If EDITOR set this field to be hidden.
        if ($fields[$type] == '0') {
            $content_field[$type] = '';
        }
      }

      // If ADMIN set this field to be hidden.
      else {
          $content_field[$type] = '';
      }
    }
    drupal_add_js(drupal_get_path('module', 'os2web_borger_dk') . '/js/os2web_borger_dk.js', 'file');
    drupal_add_css(drupal_get_path('module', 'os2web_borger_dk') . '/css/os2web_borger_dk.css', 'file');

  }
  ?>

  <?php print render($content['field_os2web_borger_dk_image']);?>

  <header>
    <h1<?php print $title_attributes; ?>>
      <?php print $node->title; ?>
    </h1>
  </header>
  <div class="wrap">
    <?php print render($title_suffix); ?>
    <?php
      print "<div class='borger_dk-region-div3'>";

      if (!empty($content_field['field_os2web_borger_dk_header'])) {
        print "<div class='borger_dk_header_text field-item' id='borger_dk_header_text'>";
        print render($content_field['field_os2web_borger_dk_header']);
        print "</div>";
      }
      print "</div>";
    ?>
    <div class="content clearfix"<?php print $content_attributes; ?>>
    <?php
      print "<div class=''>";
      if (!empty($content_field['field_os2web_borger_dk_pre_text'])) {
        print "<div class='borger_dk-field_os2web-borger-dk-pre_text'>";
        print render($content_field['field_os2web_borger_dk_pre_text']);
        print '</div>';
        print "<div class='panel-separator'></div>";
        print "</div>";
      }?>
    <?php
      if (!empty($content_field['field_os2web_borger_dk_selfservi'])) {
        print "<div class='borger_dk-region-div2'>
                <div class=''>
                  <div class='os2web_borger_dk_selfservi'>";
        print render($content_field['field_os2web_borger_dk_selfservi']);
        print   '</div>
                </div>
              </div>';
      }

      if (!empty($content_field['body'])) {
        print "<div class='borger_dk-body node-body inner' id='borger_dk-body'>";
        print "<div class='borger_dk_body_intro_text'><span class='intro_text_text'>" . "Læs om " . $node->title .'</span>';
        print "<div class='intro_text_buttons'><span>Åben/luk alle</span><a href='#' class='gplus_all gplus_gminus'><span class='gplus_button'>+</span></a>";
        print "<a href='#' class='gminus_all gplus_gminus'><span class='gminus_button'>-</span></a></div>";

        print "</div>";
        print render($content_field['body']);
        print '</div>';
        print "<div class='panel-separator'></div>";
      }
      if (!empty($content_field['field_os2web_borger_dk_post_text'])) {
        print "<div class='borger_dk-field_os2web-borger-dk-post_text'>";
        print render($content_field['field_os2web_borger_dk_post_text']);
        print '</div>';
        print "<div class='panel-separator'></div>";
      }
      if (!empty($content['field_os2web_borger_dk_legislati'])) {
        print "<div class='borger_dk-field_os2web-borger-dk-legislati'>";
        print render($content['field_os2web_borger_dk_legislati']);
        print "</div>";
      }
      print "<div class='borger_dk-region-div4 inner'>";

      if (!empty($content_field['field_os2web_borger_dk_recommend'])) {
        print   "<div class='borger_dk-field_os2web-borger-dk-recommend'>";
        print     render($content_field['field_os2web_borger_dk_recommend']);
        print   "</div>";
        print   "<div class='panel-separator'></div>";

      }
      if (!empty($content_field['field_os2web_borger_dk_shortlist'])) {
        print   "<div class='borger_dk-field_os2web-borger-dk-shortlist'> ";
        print     render($content_field['field_os2web_borger_dk_shortlist']);
        print   "</div>";
      }
      if (!empty($content_field['field_os2web_borger_dk_byline'])) {
        print   "<div class='borger_dk-field_os2web-borger-dk-byline'> ";
        print    render($content_field['field_os2web_borger_dk_byline']);
        print   "</div>";
      }

      print "</div>";

    ?>
      <script type="text/javascript" src="//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-53274bd66f9bc001" async="async"></script>
      <div class="addthis_sharing_toolbox"></div>

    </div>

    <?php
      if (user_is_logged_in()) {
        $view = views_get_view('redaktoerinfo');
        $view->set_arguments(array($node->nid));
        $view->execute();
        print $view->render('block');
      }
    ?>
  </div>

  <?php
    // Only display the wrapper div if there are links.
    $links = render($content['links']);
    if ($links):
  ?>
    <div class="link-wrapper">
      <?php print $links; ?>
    </div>
  <?php endif; ?>

  <?php print render($content['comments']); ?>
  </div>
</article>
