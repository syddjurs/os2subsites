<?php
/**
 * implementation of hook_panels_layouts().
 */
$plugin = array(
  'title' => t('Full width - light/dark/light/dark'),
  'category' => t('OS2'),
  'icon' => 'full-width-light-dark-light-dark.png',
  'theme' => 'full-width-light-dark-light-dark',
  'css' => 'full-width-light-dark-light-dark.css',
  'regions' => array(
    'light_section_1' => t('Light section wo. container'),
    'light_section_2' => t('Light section w. container'),
    'dark_section_1' => t('Dark section w. container'),
    'dark_section_2' => t('Dark section w. container'),
  ),
);
