<?php
/**
 * @file
 * region--content_bottom.tpl.php
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
  
<?php if ($content):?>
<div<?php print $attributes; ?>>
    <div class="container">
    <?php if ($content_attributes): ?><div<?php print $content_attributes; ?>><?php endif; ?>
    <?php print $content; ?>
    <?php if ($content_attributes): ?></div><?php endif; ?>
 <?php if(!empty($page['page']['related_links'])) : ?>
     <?php if($page['page']['related_pages_type']=='links'):?>   
      <div class="panel panel-primary related-pages links row">
        <div class="panel-body">
         
          <?php foreach ($page['page']['related_links'] as $link) : ?>
            <div class="page-link col-md-3 col-sm-6 col-xs-12">
                <span>
              <?php if (isset($link['url'])): ?>
                <?php print l($link['title'], $link['url'], array('attributes' => array('class' => $link['class']))); ?>
              <?php else: ?>
                <?php print l($link['title'], drupal_get_path_alias('node/' . $link['nid']), array('attributes' => array('class' => $link['class']))); ?>
              <?php endif; ?>
               </span>     
            </div>
            
          <?php endforeach; ?>
         </ul>
        </div>
      </div>
       <?php else: ?> 
        <div class=" row panel related-pages boxes">
            <div class="panel-heading">
                <?php print t('Related articles');?>
             </div>   
        <div class="panel-body">
         
          <?php foreach ($page['page']['related_links'] as $link) : ?>
             <?php if (isset($link['image'])): ?>
            <div class="page-link col-md-3 col-sm-6 col-xs-12">
               <div class="image">
               <?php print theme('image_style',array('style_name' => 'large','path'=>$link['image']));?>   
                </div>   
                   <?php print l($link['title'], drupal_get_path_alias('node/' . $link['nid']), array('attributes' => array('class' => $link['class']))); ?>
              
                  <span class='open-link'>
                       <?php print l(t('Show more'), drupal_get_path_alias('node/' . $link['nid'])); ?>
              
                 </span>
                   
              </div>
            <?php endif; ?>
          <?php endforeach; ?>
         
        </div>
      </div>
     <?php endif; ?>   
    <?php endif; ?>

  </div>
</div>

<?php endif; ?>
