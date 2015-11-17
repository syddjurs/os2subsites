<?php
/**
 * @file
 * region--sidebar.tpl.php
 *
 * Default theme implementation to display the "sidebar_first" and
 * "sidebar_second" regions.
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
  <footer class="region region_footer lcontainer-fluid">
    <div class="lcontainer-fluid clearfix"  id="footer-first-block">
      <div class="container footer-first-block">
        <div class="row-no-padding">
            <div class='footer-logo col-sm-2 col-xs-12'>
            <img id="footer-logo" class="logo-img" src="/<?php print drupal_get_path('theme','svendborg_subsitetheme'); ?>/images/footer_logo.png" title="<?php print $page['site_name'] ?>" />

          </div>
          <div class="col-sm-10 col-sx-12">  
            <?php print $page['footer_blocks']['block_1']; ?>
          </div>    
      <?php /*
       $tree = menu_tree_all_data('menu-indholdsmenu', $link = NULL, $max_depth = 3);

        $count = 0;
        foreach ($tree as $key => $menu_item) {
          if (!$menu_item['link']['hidden']) {
            if ($count > 3) {
              continue;
            }
            $path = $alias = drupal_get_path_alias($menu_item['link']['link_path']);
            print "<div class='menu-". $menu_item['link']['mlid']. " footer-indholsdmenu col-xs-12 col-sm-6 col-md-3'>";
print "<h2 class='menu-footer " . $menu_item['link']['link_title']. "'>
            <a title='" . $menu_item['link']['link_title'] . "' href='/". $path ."' class='" . $menu_item['link']['link_title']. "'>" . $menu_item['link']['link_title'] . "</a></h2>";
            if($menu_item['link']['has_children'] && !$menu_item['link']['hidden']) {

              $tree_display =menu_tree_output($menu_item['below']);
              print render($tree_display);
            }
            print "</div>";
            $count += 1;
          }
        }
      */
      ?>
      <?php if ($content_attributes): ?><div<?php print $content_attributes; ?>><?php endif; ?>
      <?php //print $content; ?>
      <?php if ($content_attributes): ?></div><?php endif; ?>
      </div>
      </div>
    </div>
    <!--footer Tilmeld-->
    <div class="lcontainer-fluid clearfix"  id="footer-tilmeld-block">
      <div class="container footer-tilmeld-block">
        <div class="row">
          <?php print $page['footer_blocks']['block_2']; ?>
         </div>
      </div>  
    </div>    
    <!-- footer contacts social-icons -->
    <div class="lcontainer-fluid clearfix footer-contacts" id="footer-contacts">
      <div class="container">
        <div class="row">
        <?php if (theme_get_setting('facebook_url', 'svendborg_subsitetheme')
                ||theme_get_setting('twitter_url', 'svendborg_subsitetheme') 
                || theme_get_setting('linkedin_url', 'svendborg_subsitetheme')
                ||theme_get_setting('youtube_url', 'svendborg_subsitetheme')): ?>
            <div class="col-xs-12 social-icons">
           <?php if (theme_get_setting('facebook_url', 'svendborg_subsitetheme')):?>
              <a href="<?php print theme_get_setting('facebook_url', 'svendborg_subsitetheme') ?>" title="Svendborg Kommune Facebook" class="footer_fb" target="_blank">facebook</a>
            <?php endif;?> 
            <?php if (theme_get_setting('twitter_url', 'svendborg_subsitetheme')):?>
              <a href="<?php print theme_get_setting('twitter_url', 'svendborg_subsitetheme') ?>" title="Svendborg Kommune Twitter" class="footer_twitter" target="_blank">facebook</a>
            <?php endif;?> 
            <?php if (theme_get_setting('linkedin_url', 'svendborg_subsitetheme')):?>    
              <a href="<?php print theme_get_setting('linkedin_url', 'svendborg_subsitetheme') ?>" title="Svendborg Kommune Linkedin" class="footer_linkedin" target="_blank">linkedin</a>
              <?php endif;?>  
           <?php if (theme_get_setting('youtube_url', 'svendborg_subsitetheme')):?>    
              <a href="<?php print theme_get_setting('linkedin_url', 'svendborg_subsitetheme') ?>" title="Svendborg Kommune Youtube" class="footer_flickr" target="_blank">youtube</a>
           <?php endif;?> 
            </div>
       <?php endif?>     
       
        <div class="col-xs-12 footer-address">
           
           <?php if (theme_get_setting('company-name', 'svendborg_subsitetheme')):?>
           		<?php print theme_get_setting('company-name', 'svendborg_subsitetheme'); ?> | 
           <?php endif;?>
           
           <?php if (theme_get_setting('address', 'svendborg_subsitetheme')):?>
           		<?php print theme_get_setting('address', 'svendborg_subsitetheme'); ?> | 
           <?php endif;?>
           
           <?php if (theme_get_setting('index', 'svendborg_subsitetheme')):?>
           		<?php print theme_get_setting('index', 'svendborg_subsitetheme'); ?>
           <?php endif;?>
           		
           <?php if (theme_get_setting('city', 'svendborg_subsitetheme')):?>
           		<?php print theme_get_setting('city', 'svendborg_subsitetheme'); ?> | 
           <?php endif;?>
           
           <?php if (theme_get_setting('phone', 'svendborg_subsitetheme')):?>
		   		Tlf <a href="tel:<?php print theme_get_setting('phone', 'svendborg_subsitetheme'); ?>"><?php print theme_get_setting('phone', 'svendborg_subsitetheme'); ?></a> | 
           <?php endif;?>
           
           <?php if (theme_get_setting('email', 'svendborg_subsitetheme')):?>
          E-mail <a href="mailto:<?php print theme_get_setting('email', 'svendborg_subsitetheme'); ?>"><?php print theme_get_setting('email', 'svendborg_subsitetheme'); ?></a>
           <?php endif;?>

        </div> 
         <div class="col-xs-12 footer-copyright">
          Copyright 2015® · <?php print theme_get_setting('company-name', 'svendborg_subsitetheme'); ?></div>
        </div>
        </div>
      </div>
    </div>
   </footer>
