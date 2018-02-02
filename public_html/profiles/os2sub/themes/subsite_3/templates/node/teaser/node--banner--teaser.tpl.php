<?php
$image_style = 'os2sub_banner';
$image_url = false;

if (isset($node->field_banner_billede['und']['0']['uri']) && $uri = $node->field_banner_billede['und']['0']['uri']) {
  $image_url = file_create_url(image_style_url($image_style, $uri));
}
?>

<?php if ( isset( $content['field_banner_headline'] ) OR isset( $content['field_banner_text'] ) OR isset( $content['field_knap_link'] ) ): ?>

    <?php if ($image_url): ?>
    <div class="sectioned sectioned--banner sectioned--background-image sectioned--small-inner-spacing"
         style="background-image: url(<?php print $image_url; ?>);">
    <?php else: ?>
        <div class="sectioned sectioned--banner sectioned--quaternary sectioned--small-inner-spacing">
    <?php endif; ?>

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
<?php endif; ?>
