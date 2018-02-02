<article id="node-<?php print $node->nid; ?>" class="kontaktblok <?php print $classes . " all"; ?> clearfix"<?php print $attributes; ?> >
	

	<div class="kontaktblok-wrapper">
		<div class="kontaktblok-headline">
			<?php print render($content['field_os2web_contact_field_dept']); ?>
		</div>
		<div class="kontaktblok-text">
			<?php print render($content['field_os2web_contact_field_info']); ?>
		</div>
		<div>
			<?php print render($content['field_os2web_contact_field_mail']); ?>
			<?php print render($content['field_os2web_contact_field_tel']); ?>
		</div>
</article>