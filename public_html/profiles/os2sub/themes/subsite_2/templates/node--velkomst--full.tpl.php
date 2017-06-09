<?php if ($view_mode == 'full'): ?>
  <!-- node.tpl.php -->
  <!-- Begin - full node -->

  <div id="node-<?php print $node->nid; ?>" class="<?php print $classes; ?> subsite-full"<?php print $attributes; ?>>
 
    <div class="os2sub-teaser-heading">
      
      <?php print render($title_prefix); ?>
      
      <h2<?php print $title_attributes; ?> class="os2sub-teaser-heading-title"><?php print $title; ?></h2>
      
      <?php print render($title_suffix); ?>
      
      <?php if (isset($content['field_os2web_base_field_summary'])): ?>
        <div class="lead">
          <?php print render($content['field_os2web_base_field_summary']); ?>
        </div>
      <?php endif; ?>
      
    </div>

    <?php if (isset($content['field_os2web_base_field_intro'])): ?>
      <!-- Begin - intro -->
      <div class="subsite-full-intro">
        <?php print render($content['field_os2web_base_field_intro']); ?>
      </div>
      <!-- End - intro -->
    <?php endif; ?>

    <?php if (isset($content)): ?>
      <!-- Begin - body -->
      <div class="subsite-full-body">
        <?php 
          hide($content['field_os2web_base_field_image']);
          hide($content['field_os2web_base_field_summary']);
                    
          print render($content); ?>
      </div>
      <!-- End - body -->
    <?php endif; ?>

    <!-- Begin - footer -->
    <div class="subsite-full-footer subsite-links">
      <?php print render($content['links']); ?>
    </div>
    <!-- End - footer -->

  </div>
  <!-- End - full node -->

<?php endif; ?>
