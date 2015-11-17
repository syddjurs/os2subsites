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
  <div class="container">
    <div class="row">
      <div class="col-xs-6">
        <?php print _svendborg_subsitetheme_block_render('menu', 'menu-top-left'); ?>
      </div>
      <div class="col-xs-6">
        <?php print _svendborg_subsitetheme_block_render('menu', 'menu-top-right');//login block ?>
      </div>
    </div>
  </div>
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
        <?php //print render($page['secondary_nav']); ?>
      </nav>
    </div>

    <?php endif; ?>

    <?php if ($content_attributes): ?></div><?php endif; ?>
    </div>
    </div>
    </div>
  </header>
  <?php  if(drupal_match_path(drupal_get_path_alias($_GET['q']), theme_get_setting('slider_paths','svendborg_subsitetheme'))):?>
    <?php if (theme_get_setting('slider_active','svendborg_subsitetheme')) :?>
        <section class="outer">
        <?php 
            $view = views_get_view('svendborg_slider');
            $view->set_display('multi');            
            $view->pre_execute();
             $view->execute();
             $views_result_cnt= count($view->result);
            if ($views_result_cnt>1)         
                  print _svendborg_subsitetheme_block_render('views', 'svendborg_slider-multi'); 
            else
                 print _svendborg_subsitetheme_block_render('views', 'svendborg_slider-single');
            ?>
        </section>
    <?php endif;?>
  <?php endif;?>
  <?php if(drupal_get_path_alias($_GET['q']) == 'calendar/upcoming' || drupal_get_path_alias($_GET['q']) == 'calendar/all'):?>
    <div class='front-main-container-wrapper'>
    <?php if (theme_get_setting('slider_active','svendborg_subsitetheme')) :?>
        <section class="outer">
         <?php 
            $view = views_get_view('svendborg_event_calendar');
            $view->set_display('page_calendar_all');
            $pager = $view->display_handler->get_option('pager');
            $pager['type'] = 'none';
            $view->display_handler->set_option('pager', $pager);
            $view->pre_execute();
             $view->execute();
             $views_result_cnt= count($view->result);
         
          $image_uri= file_create_url(file_load(theme_get_setting('calendar_page_slider_image','svendborg_subsitetheme'))->uri);
         
        $overlay_class = '';    
	$background = "background-image: url('" . $image_uri . "')";

		if (theme_get_setting('calendar_slider_overlay') == '1' ) {

	    $background .= "background-image: -moz-linear-gradient(left, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.75) 100%), url('" . $image_uri . "');"
	    . "background-image: -webkit-gradient(left top, right top, color-stop(0%, rgba(0,0,0,0.75)), color-stop(100%, rgba(0,0,0,0.75))), url('" . $image_uri . "');"
	    . "background-image: -webkit-linear-gradient(left, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.75) 100%), url('" . $image_uri . "');"
	    . "background-image: -o-linear-gradient(left, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.75) 100%), url('" . $image_uri . "');"
	    . "background-image: -ms-linear-gradient(left, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.75) 100%), url('" . $image_uri . "');"
	    . "background-image: linear-gradient(to right, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.75) 100%), url('" . $image_uri . "');"
	    . "filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#000000', endColorstr='#000000', GradientType=1 );";

			$overlay_classcal = 'overlay';
		} else {

			$overlay_classcal = 'no-overlay';
		}
	



        $html = '<div class="page-calendar-slider "><div class="slider-cover single ' . $overlay_classcal . '" style="' . $background .'">';
	$html .= '<div class="container">';
	    $html .= '<div class="row">';
		$html .= '<div class="col-sm-7 col-xs-12">';
		    $html .= '<div class="title">' . theme_get_setting('calendar_page_slider_text','svendborg_subsitetheme');
                    $link_class = "btn gradient-deepdarkgreen";
		    $html .= '</div>';
		    $html .= '<div class="link"> ';
                    if(drupal_get_path_alias($_GET['q'])=='calendar/upcoming'){
                        $classes_upcoming_link = $link_class;
                        $classes_all_link = $link_class . ' not-here';
                    }
                    else {
                        $classes_all_link = $link_class ;
                        $classes_upcoming_link = $link_class .' not-here';
                    }
                    
                      $html .='<a href="'. url('calendar/upcoming').'" class="'. $classes_upcoming_link .'">' .t('Future events');
                  
                    $html .= '</div></a>';
                    
                    $html .= '<div class="link"> <a href="'. url('calendar/all').'" class="' . $classes_all_link .'">' .t('Show all') .' ( ' .$views_result_cnt .' ) ';
                    
		    $html .= '</div></a>';
		$html .= '</div>';//class="col-xs-8"		
		
	    $html .= '</div>';//class="row"
	$html .= '</div>';//class="conteiner"
    $html .= '</div>';//class="slider-cover"
   $html .= '</div>';//class="view-svendborg-slider"
    print $html;
         
         ?>

    <?php endif;?>
    </div>
  <?php endif;?>
  <?php print render($page['breadcrumb'])?>
</section>

<?php endif; ?>
