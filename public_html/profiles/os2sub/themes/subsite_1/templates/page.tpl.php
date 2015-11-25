<!-- Begin - outer wrapper -->
<div class="outer-wrapper">

  <!-- Begin - sidebar left -->
  <div class="sidebar sidebar-left">

    <!-- Begin - logo - wide -->
    <div class="sidebar-logo">
      <a href="<?php print $front_page; ?>" class="sidebar-logo-link">
        <img src="<?php print $path_img . '/logo-sidebar-wide.png'; ?>" class="sidebar-logo-image sidebar-logo-image-wide" alt="<?php print $site_name. t(' logo'); ?>" />
        <img src="<?php print $path_img . '/logo-sidebar-narrow.png'; ?>" class="sidebar-logo-image sidebar-logo-image-narrow" alt="<?php print $site_name. t(' logo'); ?>" />
      </a>
    </div>
    <!-- End - logo - wide -->

    <?php if (isset($sidebar_primary_navigation)): ?>
      <!-- Begin - navigation -->
      <?php print render($sidebar_primary_navigation); ?>
      <!-- End - navigation -->
    <?php endif; ?>

  </div>
  <!-- End - sidebar left -->

  <!-- Begin - inner wrapper -->
  <div class="inner-wrapper" role="document">

    <!-- Begin - simple navigation -->
    <nav class="simple-navigation">

      <!-- Begin - button list -->
      <ul class="simple-navigation-list simple-navigation-list-left">

        <!-- Begin - button -->
        <li class="simple-navigation-button">
          <a href="#" data-sidebar-toggle="left">
            <span class="fa icon fa-bars"></span>
          </a>
        </li>
        <!-- End - button -->

      </ul>
      <!-- End - button list -->

      <!-- Begin - logo -->
      <a href="<?php print $front_page; ?>" class="simple-navigation-logo-link">
        <img src="<?php print $path_img . '/logo.png'; ?>" class="simple-navigation-logo-image" alt="<?php print $site_name . ' logo'; ?>" />
      </a>
      <!-- End - logo -->

    </nav>
    <!-- End - simple navigation -->

    <!-- Begin - content -->
    <div class="content">
      <div class="container">

        <?php print $messages; ?>

        <?php if (user_is_logged_in()): ?>
        <!-- Begin - main navigation -->
        <nav class="main-navigation-wrapper">
          <section class="main-navigation-bar">
            <div class="row">

              <!-- Begin - content -->
              <div class="col-md-4">

                <a href='#' class="main-navigation-logo-link">
                  <img class="main-navigation-logo-image" src="<?php print $logo; ?>" alt="<?php print t('Home'); ?>" />
                </a>

              </div>
              <!-- End - content -->

              <!-- Begin - content -->
              <div class="col-md-8">

                <?php if (isset($secondary_navigation)): ?>
                  <!-- Begin - navigation -->
                  <?php print render($secondary_navigation); ?>
                  <!-- End - navigation -->
                <?php endif; ?>

              </div>
              <!-- End - content -->

            </div>
          </section>
        </nav>
        <!-- End - main navigation -->
        <?php endif; ?>

        <?php if (!empty($page['help'])): ?>
          <?php print render($page['help']); ?>
        <?php endif; ?>

        <?php if (!empty($page['highlighted'])): ?>
          <div class="highlighted"><?php print render($page['highlighted']); ?></div>
        <?php endif; ?>

        <?php if (!empty($action_links)): ?>
          <ul class="action-links"><?php print render($action_links); ?></ul>
        <?php endif; ?>

        <?php if (!empty($breadcrumb)): ?>
          <!-- Begin - breadcrumb -->
          <section class="os2sub-breadcrumb-container">
            <div class="row">
              <div class="col-xs-12">
                <?php print $breadcrumb; ?>
              </div>
            </div>
          </section>
          <!-- End - breadcrumb -->
        <?php endif;?>

        <?php if (!empty($tabs)): ?>
          <!-- Begin - tabs -->
          <div class="content-tabs-container">
            <?php print render($tabs); ?>
          </div>
          <!-- End - tabs -->
        <?php endif; ?>

        <a id="main-content"></a>

        <?php if (!panels_get_current_page_display()): ?>
          <div class="os2sub-box">
            <?php if ($title): ?>
            <div class="os2sub-box-heading">
              <h2 class="os2sub-box-heading-title"><?php print $title; ?></h2>
            </div>
            <?php endif; ?>
            <div class="os2sub-box-body">
              <?php print render($page['content']); ?>
            </div>
          </div>

        <?php else: ?>
          <?php print render($page['content']); ?>
        <?php endif; ?>

      </div>
    </div>
    <!-- End - content -->

    <?php if (!empty($page['footer'])): ?>
      <!-- Begin - footer -->
      <footer class="footer <?php print $container_class; ?>">
        <?php print render($page['footer']); ?>
      </footer>
      <!-- End - footer -->
    <?php endif; ?>

  </div>
  <!-- End - inner wrapper -->

</div>
<!-- End - outer wrapper -->
