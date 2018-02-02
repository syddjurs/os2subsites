<?php if ($view_mode == 'spotbox'): ?>
  <!-- node--spotbox--teaser.tpl.php -->
  <!-- Begin - teaser -->



  <article id="node-<?php print $node->nid; ?>" 
	  class="<?php print $classes; ?> <?php if(!empty($content['field_os2web_spotbox_big_image'])) : ?>imagespot<?php endif; ?>  os2-node-teaser os2-box os2-box-small-spacing os2web-spotbox-spotbox"<?php print $attributes; ?>> 
	  
	<?php if (isset($node->field_spot_link['und']['0']['url'])) : ?>
	
	  <a href="<?php print $node->field_spot_link['und']['0']['url']; ?>" 
		  title="<?php print $node->field_spot_link['und']['0']['title']; ?>">
	
	<?php endif; ?>
	<?php if(!empty($content['field_os2web_spotbox_big_image'])) : ?>
    	<?php 
	    	$img = field_get_items('node', $node, 'field_os2web_spotbox_big_image');
            $image = $img[0];
            $style = 'os2web_spotbox_image';
            $public_filename = image_style_url($style, $image["uri"]);
            $path = drupal_get_path_alias('node/' . $node->nid);
              
            print $html = '<img class="img-responsive img-rounded" title = "' . $image["title"] . '" src="' . $public_filename . '"/>'; ?>
        
        
        <?php if ($node->field_spot_link['und']['0']['title'] !== $node->field_spot_link['und']['0']['url']) : ?>
          <span class="os2-node-teaser-heading">
      			<span class="os2-node-teaser-heading-title">
      				<?php print $node->field_spot_link['und']['0']['title']; ?>
      			</span>
      		</span>
        <?php endif; ?>
        
		<?php else: ?>
    <div class="panel-pane pane-views pane-os2sub-spotboks">
      <div class="os2sub-box">
		    <?php if(!empty($content['field_os2web_spotbox_text'])) : ?>
          <?php if ($node->field_spot_link['und']['0']['title'] !== $node->field_spot_link['und']['0']['url']) : ?>
            <span class="os2-node-teaser-heading">
        			<span class="os2-node-teaser-heading-title">
        				<?php print $node->field_spot_link['und']['0']['title']; ?>
        			</span>
        		</span>
          <?php endif; ?>
		    <span class="os2-node-teaser-body">
		      <span class="os2-node-teaser-body-content">
		          <?php print $node->field_os2web_spotbox_text['und']['0']['safe_value']; ?>
		      </span>
		    </span>
	
		    <?php endif; ?>
        </div>
      </div>

   	  <?php endif; ?>
  		

      <?php if (isset($node->field_spot_link['und']['0']['url'])) : ?>
      </a>
      <?php endif; ?>
   </article> <!-- /.node -->

<?php endif; ?>










