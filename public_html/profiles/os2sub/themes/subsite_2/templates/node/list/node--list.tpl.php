<?php if ($view_mode == 'list'): ?>
  <!-- node--list.tpl.php -->
  <!-- Begin - list -->
  <section id="node-<?php print $node->nid; ?>" class="<?php print $classes; ?> fki-list"<?php print $attributes; ?>>

    <?php if (isset($author_full_name) and $updated_at_short): ?>
      <!-- Begin - entity info -->
      <ul class="fki-list-info fki-entity-info">
        <li><?php print l($author_full_name, 'user/' . $node->uid); ?></li>
        <li><span><?php print $updated_at_ago; ?></span></li>
      </ul>
      <!-- End - entity info -->
    <?php endif ?>

    <!-- Begin - heading -->
    <div class="fki-list-heading">
      <h3 class="fki-list-heading-title"><a href="<?php print $node_url; ?>"><?php print $title; ?></a></h3>
    </div>
    <!-- End - heading -->

    <!-- Begin - body -->
    <div class="fki-list-body">

      <?php if (isset($content['body'])): ?>
        <!-- Begin - body -->
        <div class="fki-list-body-content">
          <?php print render($content['body']); ?>
        </div>
        <!-- End - body -->
      <?php endif; ?>

    </div>
    <!-- End - body -->

  </section>
  <!-- End - list -->

<?php endif; ?>
