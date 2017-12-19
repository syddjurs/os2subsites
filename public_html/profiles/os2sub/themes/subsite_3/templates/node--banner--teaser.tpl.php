<?php
$style     = 'os2sub_banner';
$path      = $node->field_banner_billede['und']['0']['uri'];
$style_url = image_style_url($style, $path);
?>

<div class="sectioned sectioned--banner sectioned--background-image sectioned--small-inner-spacing"
     style="background-image: url(<?php print file_create_url($style_url); ?>);">
    <div class="sectioned__inner">
        <div class="container">

            <!-- Begin - headline -->
            <?php print render($content['field_banner_headline']); ?>
            <!-- End - headline -->

            <!-- Begin - body -->
            <?php print render($content['field_banner_text']); ?>
            <!-- End - body -->

            <!-- Begin - link -->
            <?php print render($content['field_knap_link']); ?>
            <!-- End - link -->

        </div>
    </div>
</div>
