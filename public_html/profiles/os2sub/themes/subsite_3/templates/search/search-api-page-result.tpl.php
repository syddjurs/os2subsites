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
  <div class="row">

    <div class="hidden-xs col-sm-2">
      <img src="<?php print $image_url; ?>" alt="" />
    </div>

    <div class="col-sm-10">
      <h3 class="title">
        <?php print $url ? l($title, $url['path'], $url['options']) : check_plain($title); ?>
      </h3>
      <div class="search-snippet-info">
        <?php if ($snippet) : ?>
          <p class="search-snippet"><?php print $snippet; ?></p>
        <?php endif; ?>
        <?php if ($info) : ?>
          <p class="search-info"><?php print $info; ?></p>
        <?php endif; ?>
      </div>

    </div>
  </div>
</li>
