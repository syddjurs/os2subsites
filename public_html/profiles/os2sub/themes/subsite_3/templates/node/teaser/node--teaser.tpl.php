<?php if ($view_mode == 'teaser'): ?>
    <!-- Begin - teaser -->
    <a href="<?php print $node_url; ?>" id="node-<?php print $node->nid; ?>" class="<?php print $classes; ?> element-wrapper-link clearfix"<?php print $attributes; ?>>
        <?php print render($content); ?>
    </a>
    <!-- End - teaser -->
<?php endif; ?>
