<div <?php if (!empty($css_id)) {
  echo "id=\"$css_id\"";
} ?>>

  <?php if ($content['light_section_1']): ?>
    <!-- Begin - light section no. 1 -->
    <div class="sectioned sectioned--light">
      <div class="sectioned__inner">
        <div class="container">
          <div class="row">
            <div class="col-xs-12">
              <?php echo $content['light_section_1']; ?>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- End - light section no. 1 -->
  <?php endif; ?>

  <?php if ($content['dark_section_1']): ?>
    <!-- Begin - dark section no. 1 -->
    <div class="sectioned sectioned--light">
      <div class="sectioned__inner">
        <div class="container">
          <div class="row">
            <div class="col-xs-12">
              <?php echo $content['dark_section_1']; ?>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- End - dark section no. 1 -->
  <?php endif; ?>

  <?php if ($content['light_section_2']): ?>
    <!-- Begin - light section no. 2 -->
    <div class="sectioned sectioned--light">
      <div class="sectioned__inner">
        <div class="container">
          <div class="row">
            <div class="col-xs-12">
              <?php echo $content['light_section_2']; ?>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- End - dark section no. 2 -->
  <?php endif; ?>

</div>
