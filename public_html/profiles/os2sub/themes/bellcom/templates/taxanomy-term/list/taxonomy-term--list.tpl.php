<?php if ($view_mode == 'list'): ?>
  <!-- taxonomy-term--list.tpl.php -->
  <!-- Begin - list -->
  <div id="taxonomy-term-<?php print $term->tid; ?>" class="<?php print $classes; ?> fki-list">

    <div class="fki-list-heading">
      <h2 class="fki-list-heading-title"><?php print $term_name; ?></h2>
    </div>

    <?php if (isset($content['body'])): ?>
      <!-- Begin - body -->
      <div class="fki-list-body">
        <?php print render($content['body']); ?>
      </div>
      <!-- End - body -->
    <?php endif; ?>

    <?php print render($content['links']); ?>

  </div>
  <!-- End - list -->

<?php endif; ?>
