<?php
/**
 * implementation of hook_panels_layouts().
 */
$plugin = array(
  'title' => t('Full width - dark/light/dark/light'),
  'category' => t('OS2'),
  'icon' => 'full-width-dark-light-dark-light.png',
  'theme' => 'full-width-dark-light-dark-light',
  'css' => 'full-width-dark-light-dark-light.css',
  'regions' => array(
    'light_section_1' => t('Light section w. container'),
    'light_section_2' => t('Light section w. container'),
    'dark_section_1' => t('Dark section wo. container'),
    'dark_section_2' => t('Dark section w. container'),
  ),
);
