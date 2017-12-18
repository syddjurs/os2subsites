<!-- content-with-left-and-right-sidebar.tpl.php -->
<div class="container">

  <?php if ($content['top']): ?>
      <!-- Begin - top -->
      <div class="col-md-12">
        <?php print $content['top']; ?>
      </div>
      <!-- End - top -->
  <?php endif ?>

    <div class="row">

      <?php if ($content['sidebar-left']): ?>
          <!-- Begin - left sidebar -->
          <div class="col-sm-3">
            <?php print $content['sidebar-left']; ?>
          </div>
          <!-- End - left sidebar -->
      <?php endif ?>


      <?php if ($content['sidebar-left'] && $content['sidebar-right']): ?>

          <!-- Begin - content -->
          <div class="col-sm-6">
            <?php print $content['content']; ?>
          </div>
          <!-- End - content -->

      <?php elseif ($content['sidebar-left'] OR $content['sidebar-right']): ?>

          <!-- Begin - content -->
          <div class="col-sm-9">
            <?php print $content['content']; ?>
          </div>
          <!-- End - content -->

      <?php else : ?>

          <!-- Begin - content -->
          <div class="col-xs-12">
            <?php print $content['content']; ?>
          </div>
          <!-- End - content -->

      <?php endif ?>


      <?php if ($content['sidebar-right']): ?>
          <!-- Begin - right sidebar -->
          <div class="col-sm-3">
            <?php print $content['sidebar-right']; ?>
          </div>
          <!-- End - right sidebar -->
      <?php endif; ?>

    </div>


  <?php if ($content['footer']): ?>
      <!-- Begin - footer -->
      <div class="col-xs-12">
        <?php print $content['footer']; ?>
      </div>
      <!-- End - footer -->
  <?php endif ?>

</div>

