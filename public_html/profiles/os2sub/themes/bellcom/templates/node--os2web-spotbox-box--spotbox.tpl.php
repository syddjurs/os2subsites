<?php if ($view_mode == 'spotbox'): ?>
  <!-- node--spotbox--teaser.tpl.php -->
  <!-- Begin - teaser -->
  <article id="node-<?php print $node->nid; ?>" 
	  class="<?php print $classes; ?> <?php if(!empty($content['field_os2web_spotbox_big_image'])) : ?>imagespot<?php endif; ?> os2web-teaser os2web-spotbox-spotbox"<?php print $attributes; ?>> 
	  
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
              
		<?php else: ?>

		    <?php if(!empty($content['field_os2web_spotbox_text'])) : ?>
		
		    <span class="os2web-teaser-body">
		      <span class="os2web-teaser-body-text">
		          <?php print $node->field_os2web_spotbox_text['und']['0']['safe_value']; ?>
		      </span>
		    </span>
	
		    <?php endif; ?>

   	    <?php endif; ?>
  		
  		<span class="os2web-teaser-heading">
  			<span class="os2web-teaser-heading-title">
  				<?php print $node->field_spot_link['und']['0']['title']; ?>
  			</span>
  		</span>
  	<?php if (isset($node->field_spot_link['und']['0']['url'])) : ?>
    </a>
	<?php endif; ?>
   </article> <!-- /.node -->

<?php endif; ?>