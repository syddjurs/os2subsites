<?php if ($view_mode == 'teaser'): ?>

    <!-- Begin - teaser -->
    <a href="<?php print $term_url; ?>" id="taxonomy-term-<?php print $term->tid; ?>" class="<?php print $classes; ?> element-wrapper-link clearfix">

      <?php if ( isset( $content['field_os2web_kulturnaut_date'] ) ): ?>
          <!-- Begin - date -->
          <div class="entity-teaser__date">
            <?php print render( $content['field_os2web_kulturnaut_date'] ); ?>
          </div>
          <!-- End - date -->
      <?php endif; ?>

        <!-- Begin - body -->
        <div class="entity-teaser__body">

            <!-- Begin - heading -->
            <div class="entity-teaser__heading">
                <h3 class="entity-teaser__heading__title heading-h4">
                  <?php print $term_name; ?>
                </h3>
            </div>
            <!-- End - heading -->

        </div>
        <!-- End - body -->

        <?php if ( isset( $content['field_os2web_base_field_image'] ) ): ?>
            <!-- Begin - image -->
            <div class="entity-teaser__image">
                <?php print render( $content['field_os2web_base_field_image'] ); ?>
            </div>
            <!-- End - image -->
        <?php endif; ?>

    </a>
    <!-- End - teaser -->
<?php endif; ?>

