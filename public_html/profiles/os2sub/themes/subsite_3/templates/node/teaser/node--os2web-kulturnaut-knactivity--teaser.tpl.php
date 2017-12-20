<?php if ($view_mode == 'teaser'): ?>
    <!-- Begin - teaser -->
    <article id="node-<?php print $node->nid; ?>" class="<?php print $classes; ?> clearfix"<?php print $attributes; ?>>

        <?php if ( isset( $content['field_image'] ) ): ?>
            <!-- Begin - image -->
            <div class="image">
                <?php print render( $content['field_image'] ); ?>
            </div>
            <!-- End - image -->
        <?php endif; ?>

        <?php print $node->title; ?>
asdads
    </article>
    <!-- End - teaser -->
<?php endif; ?>
