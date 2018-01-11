<?php
$image_style = 'os2sub_small_imagesize';
$image_url = false;

if ($item->item_type == 'node') {
  $node = $item->node;

  if (isset($node->field_os2web_kulturnaut_slidesho['und']['0']['uri']) && $uri = $node->field_os2web_kulturnaut_slidesho['und']['0']['uri']) {
    $image_url = file_create_url(image_style_url($image_style, $uri));
  }
}

else if ($item->item_type == 'taxonomy_term') {
  $taxonomy_term = $item->taxonomy_term;

  if (isset($taxonomy_term->field_os2web_base_field_image['und']['0']['uri']) && $uri = $taxonomy_term->field_os2web_base_field_image['und']['0']['uri']) {
    $image_url = file_create_url(image_style_url($image_style, $uri));
  }
}

?>

<li class="search-result">

  <a href="#" class="element-wrapper-link">
    <div class="entity-list-advanced entity-list-advanced--search-result">

      <?php if(!empty($image_url)): ?>
        <div class="entity-list-advanced__image">
          <img src="<?php print $image_url; ?>" title="" alt="" />
        </div>
      <?php endif; ?>

      <div class="entity-list-advanced__body">

        <div class="entity-list-advanced__heading">
          <h3 class="entity-list-advanced__heading__title"><?php print check_plain($title); ?></h3>
        </div>

        <?php if ($snippet OR $info) : ?>
          <div class="entity-list-advanced__search-snippet">

            <?php if ($snippet) : ?>
              <p><?php print $snippet; ?></p>
            <?php endif; ?>

            <?php if ($info) : ?>
              <p><?php print $info; ?></p>
            <?php endif; ?>

          </div>
        <?php endif; ?>

        <span class="entity-list-advanced__path">
          <?php print t('Located at: !path', array('!path' => drupal_get_path_alias($url['path']))); ?>
        </span>

      </div>

    </div>

  </a>
</li>
