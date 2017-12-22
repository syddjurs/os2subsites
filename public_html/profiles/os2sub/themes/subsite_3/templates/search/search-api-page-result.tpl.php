<li class="search-result">
  <div class="row">
    <div class="hidden-xs col-sm-3">
      <?php if ($result['node']-> field_os2web_kulturnaut_slidesho): ?>
        <?php
        $search_image_uri = $result['node']-> field_os2web_kulturnaut_slidesho['und'][0]['uri'];
        $search_image_filepath = file_create_url($search_image_uri);
        ?>
        <div class="search-image">
          <img src="<?php print $search_image_filepath; ?>" />
        </div>
      <?php endif; ?>
    </div>
    <div class="col-sm-9">
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
