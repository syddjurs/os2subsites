<?php
/**
 * implementation of hook_panels_layouts()
 */
$plugin = array(
  'title' => t('Content with left and right sidebar and top and bottom'),
  'category' => t('OS2'),
  'icon' => 'content-with-left-and-right-sidebar-top-footer.png',
  'theme' => 'content-with-left-and-right-sidebar-top-footer',
  'css' => 'content-with-left-and-right-sidebar-top-footer.css',
  'regions' => array(
    'footer' => t('Bottom'),
    'top' => t('Top - full width'),
    'top-container' => t('Top - with container'),
    'sidebar-left' => t('Left sidebar'),
    'sidebar-right' => t('Right sidebar'),
    'content' => t('Content - first'),
    'content-secondary' => t('Content - secondary'),
    'content-tertiary' => t('Content - tertiary'),
  ),
);
