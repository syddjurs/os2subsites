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
 * - $selfservices: Any selfservice links provided from the current node.
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
<?php if ($content):?>
  <aside<?php print $attributes; ?>>
     
  
    <?php if(!empty($page['page']['os2web_selfservicelinks']) && (!isset($page['page']['term_is_top']) || $page['page']['term_is_top'] == FALSE)) : ?>
     <div class="selfserv-block">
      <div class="panel panel-lightblue ">
        <div class="panel-heading">
          <h3 class="panel-title"><?php print t('Selvbetjenings'); ?></h3>
        </div>
        <div class="panel-body">
       
          <?php foreach ($page['page']['os2web_selfservicelinks'] as $link) : ?>
            <span>
              <a href="<?php print $link['url']; ?>"><?php print $link['title']; ?></a>
            </span>
          <?php endforeach; ?>
        </div>
      </div>
   </div>      
    <?php endif; ?>
      <?php if(!empty($page['page']['contact']) && (!isset($page['page']['term_is_top']) || $page['page']['term_is_top'] == FALSE)) : ?>
     <div class="contact-block">
      
        <?php $contact_content =  node_view(node_load($page['page']['contact']['nid']));
        print render( $contact_content)
        ?>
        
   </div>      
    <?php endif; ?>
      
   <?php if(!empty($page['page']['activities']) && (!isset($page['page']['term_is_top']) || $page['page']['term_is_top'] == FALSE)) : ?>
      <div class="activites-block">
        <?php  print _svendborg_subsitetheme_block_render('views', 'aktiviteter-block_2'); ?>
      </div>
   <?php endif; ?>   
   <?php if(!empty($page['page']['prev_news_block']) && (!isset($page['page']['term_is_top']) || $page['page']['term_is_top'] == FALSE)) : ?>
  
   <div class="prev-news-block">
            <?php print _svendborg_subsitetheme_block_render('views', 'svendborg_news_view-block_9'); ?>
        </div>
    <?php endif?>  
    <?php if ($content_attributes): ?><div<?php print $content_attributes; ?>><?php endif; ?>
    <?php print $content; ?>
    <?php if ($content_attributes): ?></div><?php endif; ?>
  </aside>
<?php endif; ?>
