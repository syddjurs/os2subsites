<?php
/**
 * @file
 * svendborg_views.features.menu_custom.inc
 */

/**
 * Implements hook_menu_default_menu_custom().
 */
function svendborg_views_menu_default_menu_custom() {
  $menus = array();

  // Exported menu: main-menu.
  $menus['main-menu'] = array(
    'menu_name' => 'main-menu',
    'title' => 'Main menu',
    'description' => 'The <em>Main</em> menu is used on many sites to show the major sections of the site, often in a top navigation bar.',
  );
  // Exported menu: menu-menu-indholdsmenu.
  $menus['menu-menu-indholdsmenu'] = array(
    'menu_name' => 'menu-menu-indholdsmenu',
    'title' => 'Indholdsmenu',
    'description' => '',
  );
  // Exported menu: menu-top-left.
  $menus['menu-top-left'] = array(
    'menu_name' => 'menu-top-left',
    'title' => 'Vælg sprog',
    'description' => '',
  );
  // Exported menu: menu-top-right.
  $menus['menu-top-right'] = array(
    'menu_name' => 'menu-top-right',
    'title' => 'top-right',
    'description' => '',
  );
  // Translatables
  // Included for use with string extractors like potx.
  t('Indholdsmenu');
  t('Main menu');
  t('The <em>Main</em> menu is used on many sites to show the major sections of the site, often in a top navigation bar.');
  t('Vælg sprog');
  t('top-right');


  return $menus;
}
