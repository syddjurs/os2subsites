<?php if ($view_mode == 'list'): ?>

    <!-- Begin - list -->
    <a href="<?php print $node_url; ?>" id="node-<?php print $node->nid; ?>" class="<?php print $classes; ?> element-wrapper-link clearfix"<?php print $attributes; ?>>

        <!-- Begin - icon -->
        <div class="entity-list__icon">
            <span class="icon fa fa-calendar"></span>
        </div>
        <!-- End - icon -->

        <!-- Begin - body -->
        <div class="entity-list__body">

          <?php if ( isset( $content['field_os2web_kulturnaut_date'] ) ): ?>
              <!-- Begin - date -->
              <div class="entity-list__date">
                <?php print render( $content['field_os2web_kulturnaut_date'] ); ?>
              </div>
              <!-- End - date -->
          <?php endif; ?>

            <!-- Begin - heading -->
            <div class="entity-list__heading">
                <h3 class="entity-list__heading__title heading-h5">
                  <?php print $node->title; ?>
                </h3>
            </div>
            <!-- End - heading -->

        </div>
        <!-- End - body -->

    </a>
    <!-- End - list -->
<?php endif; ?>
