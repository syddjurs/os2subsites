<?php if ($view_mode == 'full'): ?>
  <?php
    hide($content['comments']);
    hide($content['links']);
    hide($content['field_tags']);

    if (isset($content['field_tags'])) {
      hide($content['field_tags']);
    }

    if (isset($content['field_os2intra_images'])) {
      hide($content['field_os2intra_images']);
    }
    if (isset($content['field_os2intra_image'])) {
      hide($content['field_os2intra_image']);
    }
  ?>
  <!-- node.tpl.php -->
  <!-- Begin - full node -->
  <div id="node-<?php print $node->nid; ?>" class="<?php print $classes; ?> fki-full"<?php print $attributes; ?>>

    <?php if (isset($content['field_os2intra_images'])): ?>
      <!-- Begin - image -->
      <div class="fki-full-image">
        <?php print render($content['field_os2intra_images']); ?>
      </div>
      <!-- End - image -->
    <?php endif; ?>
        <?php if (isset($content['field_os2intra_image'])): ?>
      <!-- Begin - image -->
      <div class="fki-full-image">
        <?php print render($content['field_os2intra_image']); ?>
      </div>
      <!-- End - image -->
    <?php endif; ?>

    <div class="fki-full-controlpanel">
      <ul class="fki-full-controlpanel-list">
        <li>asd</li>
      </ul>
    </div>

    <?php if (isset($author_full_name) and $updated_at_short): ?>
      <!-- Begin - entity info -->
      <ul class="fki-full-info fki-entity-info">
        <li><?php print l($author_full_name, 'user/' . $node->uid); ?></li>
        <li><span><?php print t('Sidst opdateret d.'); ?> <?php print $updated_at_short; ?></span></li>
      </ul>
      <!-- End - entity info -->
    <?php endif ?>

    <div class="fki-full-heading">
      <?php print render($title_prefix); ?>
      <h2<?php print $title_attributes; ?> class="fki-full-heading-title"><?php print $title; ?></h2>
      <?php print render($title_suffix); ?>
    </div>

    <?php if (isset($content['field_os2web_base_field_intro'])): ?>
      <!-- Begin - intro -->
      <div class="fki-full-intro">
        <?php print render($content['field_os2web_base_field_intro']); ?>
      </div>
      <!-- End - intro -->
    <?php endif; ?>

    <?php if (isset($content)): ?>
      <!-- Begin - body -->
      <div class="fki-full-body">
        <?php print render($content); ?>

        <?php if (isset($sections)): ?>
          <?php print $sections; ?>
        <?php endif ?>
      </div>
      <!-- End - body -->
    <?php endif; ?>

    <!-- Begin - footer -->
    <div class="fki-full-footer fki-links">
      <?php print render($content['links']); ?>
    </div>
    <!-- End - footer -->

  </div>
  <!-- End - full node -->

<?php endif; ?>
