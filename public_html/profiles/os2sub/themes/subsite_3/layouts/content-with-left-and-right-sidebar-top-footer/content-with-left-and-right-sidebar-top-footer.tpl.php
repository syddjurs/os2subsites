<?php if ($content['top']): ?>
  <!-- Begin - top -->
  <div class="panels-pane-region panels-pane-region--top">
    <?php print $content['top']; ?>
  </div>
  <!-- End - top -->
<?php endif ?>

<?php if ($content['top-container']): ?>
  <!-- Begin - top container -->
  <div class="container">
    <div class="panels-pane-region panels-pane-region--top-container">
      <?php print $content['top-container']; ?>
    </div>
  </div>
  <!-- End - top container -->
<?php endif ?>

<div class="container">
  <div class="row">

    <?php if ($content['sidebar-left']): ?>
      <!-- Begin - left sidebar -->
      <div class="col-sm-4">
        <div class="panels-pane-region panels-pane-region--sidebar-left">
          <?php print $content['sidebar-left']; ?>
        </div>
      </div>
      <!-- End - left sidebar -->
    <?php endif ?>


    <?php if ($content['sidebar-left'] && $content['sidebar-right']): ?>

      <!-- Begin - content -->
      <div class="col-sm-4">
        <div class="panels-pane-region panels-pane-region--content-first">
          <?php print $content['content']; ?>
        </div>

        <div class="panels-pane-region panels-pane-region--content-secondary">
          <?php print $content['content-secondary']; ?>
        </div>

        <div class="panels-pane-region panels-pane-region--content-tertiary">
          <?php print $content['content-tertiary']; ?>
        </div>
      </div>
      <!-- End - content -->

    <?php elseif ($content['sidebar-left'] OR $content['sidebar-right']): ?>

      <!-- Begin - content -->
      <div class="col-sm-8">
        <div class="panels-pane-region panels-pane-region--content-first">
          <?php print $content['content']; ?>
        </div>

        <div class="panels-pane-region panels-pane-region--content-secondary">
          <?php print $content['content-secondary']; ?>
        </div>

        <div class="panels-pane-region panels-pane-region--content-tertiary">
          <?php print $content['content-tertiary']; ?>
        </div>
      </div>
      <!-- End - content -->

    <?php else : ?>

      <!-- Begin - content -->
      <div class="col-xs-12">
        <div class="panels-pane-region panels-pane-region--content-first">
          <?php print $content['content']; ?>
        </div>

        <div class="panels-pane-region panels-pane-region--content-secondary">
          <?php print $content['content-secondary']; ?>
        </div>

        <div class="panels-pane-region panels-pane-region--content-tertiary">
          <?php print $content['content-tertiary']; ?>
        </div>
      </div>
      <!-- End - content -->

    <?php endif ?>


    <?php if ($content['sidebar-right']): ?>
      <!-- Begin - right sidebar -->
      <div class="col-sm-4">
        <div class="panels-pane-region panels-pane-region--sidebar-right">
          <?php print $content['sidebar-right']; ?>
        </div>
      </div>
      <!-- End - right sidebar -->
    <?php endif; ?>

  </div>
</div>

<?php if ($content['footer']): ?>
  <!-- Begin - footer -->
  <div class="panels-pane-region panels-pane-region--footer">
    <?php print $content['footer']; ?>
  </div>
  <!-- End - footer -->
<?php endif ?>
