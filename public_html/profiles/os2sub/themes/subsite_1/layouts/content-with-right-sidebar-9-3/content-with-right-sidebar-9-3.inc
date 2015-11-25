<?php
/**
 * implementation of hook_panels_layouts()
 */
$plugin = array(
  'title' => t('Content with right sidebar (9/3)'),
  'category' => t('fki'),
  'icon' => 'content-with-right-sidebar-9-3.png',
  'theme' => 'content-with-right-sidebar-9-3',
  'css' => 'content-with-right-sidebar-9-3.css',
  'regions' => array(
    'sidebar' => t('Sidebar'),
    'content' => t('Content'),
  ),
);