<?php
/**
 * @file
 * region--navigation.tpl.php
 *
 * Default theme implementation to display the "navigation" region.
 *
 * Available variables:
 * - $content: The content for this region, typically blocks.
 * - $attributes: String of attributes that contain things like classes and ids.
 * - $content_attributes: The attributes used to wrap the content. If empty,
 *   the content will not be wrapped.
 * - $region: The name of the region variable as defined in the theme's .info
 *   file.
 * - $page: The page variables from bootstrap_process_page().
 *
 * Helper variables:
 * - $is_admin: Flags true when the current user is an administrator.
 * - $is_front: Flags true when presented in the front page.
 * - $logged_in: Flags true when the current user is a logged-in member.
 *
 * @see bootstrap_preprocess_region().
 * @see bootstrap_process_page().
 *
 * @ingroup themeable
 */
?>
<?php if ($page['logo'] || $page['site_name'] || $page['primary_nav'] || $page['secondary_nav'] || $content): ?>
<section class="outer header_svendborg">
  <div id="top_menu">
  </div>
  <header class="region region-navigation header_fixed"<?php //print $attributes; ?>>
    <div class="container">
    <div class="row">
    <?php if ($content_attributes): ?><div class="header_fixed_inner navbar-default"<?php //print $content_attributes; ?>><?php endif; ?>
    <div id="fixed-navbar">
        
    <div class="navbar-header col-md-3 col-sm-3 col-xs-12">
      <?php if ($page['logo']): ?>
        <a class="logo navbar-btn pull-left" href="<?php print $page['front_page']; ?>" title="<?php print t('Home'); ?>">
      
            <img src="<?php print $page['logo']; ?>" alt="<?php print t('Home'); ?>" />
        </a>
      <?php endif; ?>
      <?php if ($page['primary_nav'] || $page['secondary_nav'] || $content): ?>
      <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
        <span class="sr-only"><?php print t('Toggle navigation'); ?></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <?php endif; ?>
    </div>
    <?php if ($page['primary_nav'] || $page['secondary_nav'] || $content): ?>
    <div class="col-md-9 col-sm-9 col-xs-12 navbar-collapse collapse navbar-default header_main_menu">

      <nav role="navigation">
        <div class="nav_main_menu">
          <ul class="menu nav navbar-nav"><li><a href="/search" class="searchicon"></a></li></ul>        
          <?php print render($page['primary_nav']); ?>  
        </div>
      </nav>
    </div>

    <?php endif; ?>

    <?php if ($content_attributes): ?></div><?php endif; ?>
    </div>
    </div>
    </div>
  </header>


  <?php print render($page['breadcrumb'])?>
</section>

<?php endif; ?>
