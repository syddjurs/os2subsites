<?php

/**
 * @file
 * Default theme implementation to present the feedback form.
 *
 * @see template_preprocess_feedback_form_display()
 */
?>
<div id="block-cittaslow-block" class="hidden-xs">
  <span class="cittaslow-link">
    cittaslow
  </span>
  <div class="content">
  <?php
    $block = block_load('block','10');
    $output = _block_get_renderable_array(_block_render_blocks(array($block)));
    print "<div id='block-block-cittaslow'>";
    print drupal_render($output);
    print "</div>";
  ?>
  </div>
</div>
