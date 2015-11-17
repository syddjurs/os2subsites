<?php
$info = array();
 
// Flush LESS cache
if (module_exists('less')) {
  less_flush_caches();
}

$info=array(
    'fields' => array(
	'brand-lightblue' => t('Footer color'),
	'brand-lightgreen' => t('Content elements color'),
	'gradient-light' => t('Contact block color'),
	'introtekst' => t('Introtekst'),
    ),
   'schemes' => array(
	'default' => array(
		'title' => t('Base scheme'),		
		'colors' => array(
			'brand-lightblue' => '#2880b9',
			'brand-lightgreen' => '#85c500',
			'gradient-light' => '#0086ca',
			'introtekst' => '#0086ca',
		),
	),
   
    ),
  // CSS files (excluding @import) to rewrite with new color scheme.
  'css' => array(
    'css/colors.css',
  ),

  // Files to copy.
  'copy' => array(
    'logo.png',
  ),

  // Gradient definitions.
  'gradients' => array(
    array(
      // (x, y, width, height).
      'dimension' => array(0, 0, 0, 0),
      // Direction of gradient ('vertical' or 'horizontal').
      'direction' => 'vertical',
      // Keys of colors to use for the gradient.
      'colors' => array('top', 'bottom'),
    ),
  ),

  // Color areas to fill (x, y, width, height).
  'fill' => array(
    'brand-lightblue' => array(0,0,23,23),
  ),
  'transparent color' => '#000000',
  'transparent_color' => '#000000',

  // Coordinates of all the theme slices (x, y, width, height)
  // with their filename as used in the stylesheet.
  'slices' => array(
    'images/search_icon123.png' => array(0, 0, 23, 23),
  ),

  // Reference color used for blending. Matches the base.png's colors.
  'blend_target' => '#ffffff',

  // Preview files.
  //'preview_css' => 'color/preview.css',
  //'preview_js' => 'color/preview.js',
  //'preview_html' => 'color/preview.html',

  // Base file for image generation.
  'base_image' => 'color/base.png',
);

  