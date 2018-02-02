<?php if ($view_mode == 'teaser'): ?>
  <!-- taxonomy-term--teaser.tpl.php -->
  <!-- Begin - teaser -->
  <div id="taxonomy-term-<?php print $term->tid; ?>" class="<?php print $classes; ?> fki-teaser">

    <div class="fki-teaser-heading">
      <h2 class="fki-teaser-heading-title"><?php print $term_name; ?></h2>
    </div>

    <?php if (isset($content['body'])): ?>
      <!-- Begin - body -->
      <div class="fki-teaser-body">
        <?php print render($content['body']); ?>
      </div>
      <!-- End - body -->
    <?php endif; ?>

    <?php print render($content['links']); ?>

  </div>
  <!-- End - teaser -->

<?php endif; ?>
