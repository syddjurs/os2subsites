<?php if ($view_mode == 'spotbox'): ?>
  <!-- node--spotbox--teaser.tpl.php -->
  <!-- Begin - teaser -->
  <article id="node-<?php print $node->nid; ?>" class="<?php print $classes; ?> os2web-teaser os2web-spotbox-spotbox"<?php print $attributes; ?>>

     
	  
	<?php if (isset($node->field_spot_link['und']['0']['url'])) : ?>
	  <a href="<?php print $node->field_spot_link['und']['0']['url']; ?>" title="<?php print $node->field_spot_link['und']['0']['title']; ?>">
	<?php endif; ?>



	    <?php if(!empty($content['field_os2web_spotbox_big_image'])) : ?>
			<span class="os2web-teaser-image img-responsive">
				<?php print render($content['field_os2web_spotbox_big_image']); ?>
			</span>
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