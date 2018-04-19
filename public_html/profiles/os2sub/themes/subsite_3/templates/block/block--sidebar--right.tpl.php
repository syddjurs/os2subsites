<div class="boxy boxy--facets"
     id="<?php print $block_html_id; ?>" <?php print $attributes; ?>>

    <div class="boxy__body">

        <div class="boxy__heading">
          <?php print render($title_prefix); ?>
          <?php if ($title): ?>
              <h3 class="boxy__heading__title">
                <?php print $title; ?>
              </h3>
          <?php endif; ?>
          <?php print render($title_suffix); ?>

        </div>

      <?php print $content ?>
    </div>
</div>
