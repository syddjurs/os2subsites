<?php if ($view_mode == 'list'): ?>
  <!-- node--list.tpl.php -->
  <!-- Begin - list -->
  <section id="node-<?php print $node->nid; ?>" class="<?php print $classes; ?> subsite-list"<?php print $attributes; ?>>

    <!-- Begin - heading -->
    <div class="subsite-list-heading">
      <h3 class="subsite-list-heading-title"><a href="<?php print $node_url; ?>"><?php print $title; ?></a></h3>
    </div>
    <!-- End - heading -->

    <!-- Begin - body -->
    <div class="subsite-list-body">

      <?php if (isset($content['body'])): ?>
        <!-- Begin - body -->
        <div class="subsite-list-body-content">
          <?php print render($content['body']); ?>
        </div>
        <!-- End - body -->
      <?php endif; ?>

    </div>
    <!-- End - body -->

  </section>
  <!-- End - list -->

<?php endif; ?>
