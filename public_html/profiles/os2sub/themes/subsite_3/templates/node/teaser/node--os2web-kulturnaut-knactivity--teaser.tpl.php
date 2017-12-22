<?php if ($view_mode == 'teaser'): ?>
    <?php
    $image_style = 'cropped_400_x_320';
    $image_url = false;

    if (isset($node->field_os2web_kulturnaut_slidesho['und']['0']['uri']) && $uri = $node->field_os2web_kulturnaut_slidesho['und']['0']['uri']) {
        $image_url = file_create_url(image_style_url($image_style, $uri));
    }
    ?>

    <!-- Begin - teaser -->
    <a href="<?php print $node_url; ?>" style="background-image: url('<?php print $image_url; ?>');" id="node-<?php print $node->nid; ?>" class="<?php print $classes; ?> element-wrapper-link clearfix"<?php print $attributes; ?>>

        <?php if ( isset( $content['field_os2web_kulturnaut_date'] ) ): ?>
            <!-- Begin - date -->
            <div class="entity-teaser__date">
                <?php print render( $content['field_os2web_kulturnaut_date'] ); ?>
            </div>
            <!-- End - date -->
        <?php endif; ?>

        <!-- Begin - image (just an empty wrapper) -->
        <div class="entity-teaser__image"></div>
        <!-- End - image (just an empty wrapper) -->

        <!-- Begin - body -->
        <div class="entity-teaser__body">

            <!-- Begin - heading -->
            <div class="entity-teaser__heading">
                <h3 class="entity-teaser__heading__title">
                  <?php print $node->title; ?>
                </h3>
            </div>
            <!-- End - heading -->

            <!-- Begin - list -->
            <div class="flexy-list">
                
                <?php if ( isset( $content['top_level_venue'] ) ): ?>
                    <!-- Begin - top level venue -->
                    <div class="entity-teaser__top-level-venue">
                        <?php print $content['top_level_venue']->name; ?>
                    </div>
                    <!-- End - top level venue -->
                <?php endif; ?>

                <?php if ( isset( $content['field_os2web_kulturnaut_venue'] ) ): ?>
                    <!-- Begin - current venue -->
                    <div class="entity-teaser__current-venue">
                        <?php print render( $content['field_os2web_kulturnaut_venue'] ); ?>
                    </div>
                    <!-- End - current venue -->
                <?php endif; ?>

            </div>
            <!-- End - list -->

        </div>
        <!-- End - body -->

    </a>
    <!-- End - teaser -->
<?php endif; ?>
