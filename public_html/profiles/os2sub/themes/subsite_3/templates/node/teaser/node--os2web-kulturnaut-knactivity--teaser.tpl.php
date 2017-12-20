<?php if ($view_mode == 'teaser'): ?>
    <!-- Begin - teaser -->
    <article id="node-<?php print $node->nid; ?>" class="<?php print $classes; ?> clearfix"<?php print $attributes; ?>>

        <?php if ( isset( $content['field_os2web_kulturnaut_slidesho'] ) ): ?>
            <!-- Begin - image -->
            <div class="entity-teaser__image">
                <?php print render( $content['field_os2web_kulturnaut_slidesho'] ); ?>
            </div>
            <!-- End - image -->
        <?php endif; ?>

    </article>
    <!-- End - teaser -->
<?php endif; ?>
