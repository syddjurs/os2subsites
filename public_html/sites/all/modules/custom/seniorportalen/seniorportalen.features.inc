<?php
/**
 * @file
 * seniorportalen.features.inc
 */

/**
 * Implements hook_ctools_plugin_api().
 */
function seniorportalen_ctools_plugin_api($module = NULL, $api = NULL) {
  if ($module == "page_manager" && $api == "pages_default") {
    return array("version" => "1");
  }
}

/**
 * Implements hook_views_api().
 */
function seniorportalen_views_api($module = NULL, $api = NULL) {
  return array("api" => "3.0");
}

/**
 * Implements hook_image_default_styles().
 */
function seniorportalen_image_default_styles() {
  $styles = array();

  // Exported image style: seniorspot.
  $styles['seniorspot'] = array(
    'label' => 'seniorspot',
    'effects' => array(
      4 => array(
        'name' => 'epsacrop_crop',
        'data' => array(
          'width' => 300,
          'height' => 150,
          'anchor' => 'center-center',
          'disable_scale' => 0,
          'jcrop_settings' => array(
            'aspect_ratio' => '',
            'bgcolor' => 'black',
            'bgopacity' => 0.6,
            'fallback' => 1,
          ),
        ),
        'weight' => 2,
      ),
      5 => array(
        'name' => 'image_scale_and_crop',
        'data' => array(
          'width' => 300,
          'height' => 150,
        ),
        'weight' => 2,
      ),
    ),
  );

  return $styles;
}
