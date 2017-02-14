<!-- Begin - outer wrapper -->
<div class="outer-wrapper">

  <!-- Begin - sidebar left -->
  <div class="sidebar sidebar-left">

    <!-- Begin - logo - wide -->
    <div class="sidebar-logo">
      <a href="<?php print $front_page; ?>" class="sidebar-logo-link">

        <img src="<?php print $logo; ?>" class="sidebar-logo-image sidebar-logo-image-wide" alt="<?php print $site_name. t(' logo'); ?>" />
        <img src="<?php print $path_img . '/logo-xs.png'; ?>" class="sidebar-logo-image sidebar-logo-image-narrow" alt="<?php print $site_name. t(' logo'); ?>" />
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
        <?php print $site_name; ?>
      </a>
      <!-- End - logo -->

    </nav>
    <!-- End - simple navigation -->

    <!-- Begin - content -->
    <div class="content">
      <div class="container">

        <?php print $messages; ?>

        <!-- Begin - main navigation -->
        <nav class="main-navigation-wrapper">
          <section class="top-navigation-bar">
            <div class="row top-nav">
              <div class="col-md-3">
                <?php if ($logo): ?>
                  <a href='<?php print $front_page; ?>' class="main-navigation-logo-link">
  	                <img class="main-navigation-logo-image" src="<?php print $logo; ?>" alt="<?php print t('Home'); ?>" />
  	              </a>
                <?php endif; ?>

              </div>
              <?php if ($theme_settings['languages']['lang_english']['active']
                      OR $theme_settings['languages']['lang_english']['active']
                      OR $theme_settings['languages']['lang_swedish']['active']
                      OR $theme_settings['languages']['lang_norwegian']['active']
                      OR $theme_settings['languages']['lang_arabic']['active']
                      OR $theme_settings['languages']['lang_danish']['active']): ?>
                <div class="col-md-9">
                  <ul class="main-navigation-list main-navigation-lang">
                    <?php if ($theme_settings['languages']['lang_german']['active']): ?>
                    <li class="main-navigation-list-link">
                      <a href="<?php print $theme_settings['languages']['lang_german']['url']; ?>"
                        class="lang-link lang-link-de"
                        data-toggle="tooltip"
                        data-placement="bottom"
                        title="<?php print $theme_settings['languages']['lang_german']['tooltip']; ?>">DE
                      </a>
                    </li>
                    <?php endif; ?>

                    <?php if ($theme_settings['languages']['lang_english']['active']): ?>
                    <li class="main-navigation-list-link">
                      <a href="<?php print $theme_settings['languages']['lang_english']['url']; ?>"
                        class="lang-link lang-link-en"
                        data-toggle="tooltip"
                        data-placement="bottom"
                        title="<?php print $theme_settings['languages']['lang_english']['tooltip']; ?>">EN
                      </a>
                    </li>
                    <?php endif; ?>

                    <?php if ($theme_settings['languages']['lang_swedish']['active']): ?>
                    <li class="main-navigation-list-link">
                      <a href="<?php print $theme_settings['languages']['lang_swedish']['url']; ?>"
                        class="lang-link lang-link-se"
                        data-toggle="tooltip"
                        data-placement="bottom"
                        title="<?php print $theme_settings['languages']['lang_swedish']['tooltip']; ?>">SE
                      </a>
                    </li>
                    <?php endif; ?>

                    <?php if ($theme_settings['languages']['lang_norwegian']['active']): ?>
                    <li class="main-navigation-list-link">
                      <a href="<?php print $theme_settings['languages']['lang_norwegian']['url']; ?>"
                        class="lang-link lang-link-no"
                        data-toggle="tooltip"
                        data-placement="bottom"
                        title="<?php print $theme_settings['languages']['lang_norwegian']['tooltip']; ?>">NO
                      </a>
                    </li>
                    <?php endif; ?>

                    <?php if ($theme_settings['languages']['lang_arabic']['active']): ?>
                    <li class="main-navigation-list-link">
                      <a href="<?php print $theme_settings['languages']['lang_arabic']['url']; ?>"
                        class="lang-link lang-link-ar"
                        data-toggle="tooltip"
                        data-placement="bottom"
                        title="<?php print $theme_settings['languages']['lang_arabic']['tooltip']; ?>">AR
                      </a>
                    </li>
                    <?php endif; ?>

                    <?php if ($theme_settings['languages']['lang_danish']['active']): ?>
                    <li class="main-navigation-list-link">
                      <a href="<?php print $theme_settings['languages']['lang_danish']['url']; ?>"
                        class="lang-link lang-link-da"
                        data-toggle="tooltip"
                        data-placement="bottom"
                        title="<?php print $theme_settings['languages']['lang_danish']['tooltip']; ?>">DK
                      </a>
                    </li>
                    <?php endif; ?>
                  </ul>

                </div>
              <?php endif; ?>
              <div class="col-md-9 second-nav">
                <?php print render($secondary_navigation); ?>

              </div>
            </div>
          </section>
          <section class="primaryn-navigation-bar">

            <div class="row main-nav">

              <div class="col-md-12">

                  <?php print render($primary_navigation); ?>

              </div>


            </div>
          </section>
        </nav>
        <!-- End - main navigation -->

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
          <div  id="region-content" class="main-content">
            <div class="os2sub-box">
              <?php if (empty($node) ) {
                   if ($title): ?>
                  <div class="os2sub-box-heading">
                    <h1 class="os2sub-box-heading-title"><?php print $title; ?></h1>
                  </div>
                  <?php endif;
                } ?>
              <div class="os2sub-box-body">
                <?php print render($page['content']); ?>
              </div>
            </div>
          </div>
        <?php else: ?>
          <?php print render($page['content']); ?>
        <?php endif; ?>

      </div>
    </div>
    <!-- End - content -->


    <?php if (
      !empty($page['footer'])
      OR !empty($page['footer_first'])
      OR !empty($page['footer_second'])
      OR !empty($page['footer_third'])
      OR !empty($theme_settings['contact_information'])
      OR $theme_settings['layout']['footer']['show_social_links'] ) : ?>

      <!-- Begin - footer -->
      <div class="container zone-footer">
      <footer class="footer ">

        <?php if (!empty($page['footer'])) : ?>
          <div class="region-footer">
            <div class="region-footer-inner">
              <?php print render($page['footer']); ?>
            </div>
          </div>
        <?php endif; ?>


        <?php if (!empty($page['footer_first']) ) : ?>
          <div class="region-footer-first">
            <div class="region-footer-first-inner">
              <?php print render($page['footer_first']); ?>
            </div>
          </div>



        <?php endif; ?>

        <?php if (!empty($page['footer_second'])) : ?>
          <div class="region-footer-second">
            <div class="region-footer-second-inner">
              <?php print render($page['footer_second']); ?>
            </div>
          </div>
        <?php endif; ?>

        <?php if (!empty($page['footer_third']) OR !empty($theme_settings['contact_information']) ) : ?>
          <div class="region-footer-third <?php if ($theme_settings['layout']['footer']['show_branding']) : ?>branding-on<?php endif; ?>">
            <div class="region-footer-third-inner">
              <?php print render($page['footer_third']); ?>

              <?php if (!empty($theme_settings['contact_information'])): ?>

                <div class="contact-information">

      	        	<?php if (isset($theme_settings['contact_information']['facebook']) ) : ?>
      	        	<?php print $theme_settings['contact_information']['business_owner_name']; ?>
      	        	<?php endif; ?>

      	        	<?php if (!empty($theme_settings['contact_information']['business_startup_year']) ) : ?>
      	        	<?php print '| '.t('Siden ').$theme_settings['contact_information']['business_startup_year']; ?>
      	        	<?php endif; ?>

          				<?php if (!empty($theme_settings['contact_information']['address']) ) : ?>
          				<?php print '| '.$theme_settings['contact_information']['address']; ?>
          				<?php endif; ?>

          				<?php if (!empty($theme_settings['contact_information']['zipcode']) ) : ?>
          				<?php print ', '.$theme_settings['contact_information']['zipcode']; ?>
          				<?php endif; ?>

          				<?php if (!empty($theme_settings['contact_information']['city']) ) : ?>
          				<?php print ' '.$theme_settings['contact_information']['city']; ?>
          				<?php endif; ?>

          				<?php if (!empty($theme_settings['contact_information']['phone_system']) ) : ?>
          				<?php print '| <a title="Ring til '.$theme_settings['contact_information']['phone_readable'].
            				          '" href="tel:'.$theme_settings['contact_information']['phone_system'].'">'; ?>
          				<?php endif; ?>

          				<?php if (!empty($theme_settings['contact_information']['phone_readable']) ) : ?>
          				<?php print $theme_settings['contact_information']['phone_readable']; ?>
          				<?php endif; ?>

          				<?php if (!empty($theme_settings['contact_information']['phone_system']) ) : ?>
          				<?php print '</a>'; ?>
          				<?php endif; ?>

          				<?php if (!empty($theme_settings['contact_information']['email']) ) : ?>
          				<?php print '| <a href="mailto:'.$theme_settings['contact_information']['email'].
            				          ' Title="Send email">'.$theme_settings['contact_information']['email'].'</a>'; ?>
          				<?php endif; ?>

          				<?php if (!empty($theme_settings['contact_information']['working_hours']) ) : ?>
          				<?php print '| '.$theme_settings['contact_information']['working_hours']; ?>
          				<?php endif; ?>

    	          </div>

              <?php endif; ?>


            </div>
          </div>
        <?php endif; ?>

        <?php if ($theme_settings['layout']['footer']['show_social_links']) : ?>

          <ul class="social-icon-list">

            <?php if ($theme_settings['social_links']['facebook']['active']): ?>
              <li>
                <a href="<?php print $theme_settings['social_links']['facebook']['url']; ?>"
                   target="_blank"
                   class="social-icon social-icon-facebook"
                   data-toggle="tooltip"
                   data-placement="top"
                   title="<?php print $theme_settings['social_links']['facebook']['tooltip']; ?>">
                </a>
              </li>
            <?php endif; ?>
            <?php if ($theme_settings['social_links']['twitter']['active']): ?>
              <li>
                <a href="<?php print $theme_settings['social_links']['twitter']['url']; ?>"
                  target="_blank"
                  class="social-icon social-icon-twitter"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="<?php print $theme_settings['social_links']['twitter']['tooltip']; ?>">
                </a>
              </li>
            <?php endif; ?>
            <?php if ($theme_settings['social_links']['googleplus']['active']): ?>
              <li>
                <a href="<?php print $theme_settings['social_links']['googleplus']['url']; ?>"
                  target="_blank"
                  class="social-icon social-icon-google-plus"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="<?php print $theme_settings['social_links']['googleplus']['tooltip']; ?>">
                </a>
              </li>
            <?php endif; ?>
            <?php if ($theme_settings['social_links']['linkedin']['active']): ?>
              <li>
                <a href="<?php print $theme_settings['social_links']['linkedin']['url']; ?>"
                  target="_blank"
                  class="social-icon social-icon-linkedin"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="<?php print $theme_settings['social_links']['linkedin']['tooltip']; ?>">
                </a>
              </li>
            <?php endif; ?>
            <?php if ($theme_settings['social_links']['pinterest']['active']): ?>
              <li>
                <a href="<?php print $theme_settings['social_links']['pinterest']['url']; ?>"
                  target="_blank"
                  class="social-icon social-icon-pinterest"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="<?php print $theme_settings['social_links']['pinterest']['tooltip']; ?>">
                </a>
              </li>
            <?php endif; ?>
            <?php if ($theme_settings['social_links']['instagram']['active']): ?>
              <li>
                <a href="<?php print $theme_settings['social_links']['instagram']['url']; ?>"
                  target="_blank" class="social-icon social-icon-instagram"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="<?php print $theme_settings['social_links']['instagram']['tooltip']; ?>">
                </a>
              </li>
            <?php endif; ?>
            <?php if ($theme_settings['social_links']['youtube']['active']): ?>
              <li>
                <a href="<?php print $theme_settings['social_links']['youtube']['url']; ?>"
                  target="_blank" class="social-icon social-icon-youtube"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="<?php print $theme_settings['social_links']['youtube']['tooltip']; ?>">
                </a>
              </li>
            <?php endif; ?>
            <?php if ($theme_settings['social_links']['vimeo']['active']): ?>
              <li>
                <a href="<?php print $theme_settings['social_links']['vimeo']['url']; ?>"
                  target="_blank" class="social-icon social-icon-vimeo"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="<?php print $theme_settings['social_links']['vimeo']['tooltip']; ?>">
                </a>
              </li>
            <?php endif; ?>
          </ul>
        <?php endif; ?>
      </footer>
    </div>
    <!-- End - footer -->
    <?php endif; ?>
  </div>
  <!-- End - inner wrapper -->
</div>
<!-- End - outer wrapper -->
