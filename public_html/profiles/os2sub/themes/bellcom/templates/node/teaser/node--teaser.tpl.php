<?php if ($view_mode == 'teaser'): ?>
  <!-- node--teaser.tpl.php -->
  <!-- Begin - teaser -->
  <article id="node-<?php print $node->nid; ?>" class="<?php print $classes; ?> subsite-teaser subsite-box subsite-box-small-spacing"<?php print $attributes; ?>>

    <!-- Begin - heading -->
    <div class="subsite-teaser-heading">
      <h3 class="subsite-teaser-heading-title"><a href="<?php print $node_url; ?>"><?php print $title; ?></a></h3>
    </div>
    <!-- End - heading -->

    <!-- Begin - body -->
    <div class="subsite-teaser-body">

      <?php if (isset($content['body'])): ?>
        <!-- Begin - body -->
        <div class="subsite-teaser-body-content">
          <?php print render($content['body']); ?>
        </div>
        <!-- End - body -->
      <?php endif; ?>

    </div>
    <!-- End - body -->

  </article>
  <!-- End - teaser -->

<?php endif; ?>
