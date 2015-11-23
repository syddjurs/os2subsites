<!-- content-with-left-and-right-sidebar.tpl.php -->
<div class="row" <?php if (!empty($css_id)) { print "id=\"$css_id\""; } ?>>

    <!-- Begin - left sidebar -->
    <div class="col-md-3">
        <?php print $content['sidebar-left']; ?>
    </div>
    <!-- End - left sidebar -->

    <!-- Begin - right sidebar -->
    <div class="col-md-3 col-md-push-6">
        <?php print $content['sidebar-right']; ?>
    </div>
    <!-- End - right sidebar -->

    <!-- Begin - content -->
    <div class="col-md-6 col-md-pull-3">
        <?php print $content['content']; ?>
    </div>
    <!-- End - content -->

</div>
