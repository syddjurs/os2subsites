<?php
/**
 * @file
 * svendborg_blocks.features.fe_block_boxes.inc
 */

/**
 * Implements hook_default_fe_block_boxes().
 */
function svendborg_blocks_default_fe_block_boxes() {
  $export = array();

  $fe_block_boxes = new stdClass();
  $fe_block_boxes->info = 'Login/Sitemap links';
  $fe_block_boxes->format = 'php_code';
  $fe_block_boxes->machine_name = 'login_sitemap_links';
  $fe_block_boxes->body = '<div class="top-menu right-block">
	<a  class="login" href="/user">login </a>|<a href="/sitemap">sitemap</a>
</div>
';

  $export['login_sitemap_links'] = $fe_block_boxes;

  $fe_block_boxes = new stdClass();
  $fe_block_boxes->info = 'footer-first';
  $fe_block_boxes->format = 'php_code';
  $fe_block_boxes->machine_name = 'svendborg_footer_text';
  $fe_block_boxes->body = '<div>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident www.svendborg.dk</div>';

  $export['svendborg_footer_text'] = $fe_block_boxes;

  $fe_block_boxes = new stdClass();
  $fe_block_boxes->info = 'Tilmeld';
  $fe_block_boxes->format = 'php_code';
  $fe_block_boxes->machine_name = 'svendborg_subscribe_block';
  $fe_block_boxes->body = 'Tilmeld dig vores nyhedsbrev - skriv din email her| <a  href="" class="tilmeld-btn">Tilmeld</a>';

  $export['svendborg_subscribe_block'] = $fe_block_boxes;

  return $export;
}
