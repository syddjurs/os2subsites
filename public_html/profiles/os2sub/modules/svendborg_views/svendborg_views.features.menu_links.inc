<?php
/**
 * @file
 * svendborg_views.features.menu_links.inc
 */

/**
 * Implements hook_menu_default_menu_links().
 */
function svendborg_views_menu_default_menu_links() {
  $menu_links = array();

  // Exported menu link: main-menu_blog:nyheder
  $menu_links['main-menu_blog:nyheder'] = array(
    'menu_name' => 'main-menu',
    'link_path' => 'nyheder',
    'router_path' => 'nyheder',
    'link_title' => 'Blog',
    'options' => array(
      'attributes' => array(
        'title' => '',
      ),
      'identifier' => 'main-menu_blog:nyheder',
      'alter' => TRUE,
    ),
    'module' => 'menu',
    'hidden' => 0,
    'external' => 0,
    'has_children' => 0,
    'expanded' => 0,
    'weight' => -46,
    'customized' => 1,
  );
  // Exported menu link: main-menu_forside:<front>
  $menu_links['main-menu_forside:<front>'] = array(
    'menu_name' => 'main-menu',
    'link_path' => '<front>',
    'router_path' => '',
    'link_title' => 'Forside',
    'options' => array(
      'attributes' => array(
        'title' => '',
      ),
      'alter' => TRUE,
      'identifier' => 'main-menu_forside:<front>',
    ),
    'module' => 'menu',
    'hidden' => 0,
    'external' => 1,
    'has_children' => 0,
    'expanded' => 0,
    'weight' => -50,
    'customized' => 1,
  );
  // Exported menu link: main-menu_galleri:gallery
  $menu_links['main-menu_galleri:gallery'] = array(
    'menu_name' => 'main-menu',
    'link_path' => 'gallery',
    'router_path' => 'gallery',
    'link_title' => 'Galleri',
    'options' => array(
      'attributes' => array(
        'title' => '',
      ),
      'alter' => TRUE,
      'identifier' => 'main-menu_galleri:gallery',
    ),
    'module' => 'menu',
    'hidden' => 0,
    'external' => 0,
    'has_children' => 1,
    'expanded' => 0,
    'weight' => -44,
    'customized' => 1,
  );
  // Exported menu link: main-menu_kalender:calendar/upcoming
  $menu_links['main-menu_kalender:calendar/upcoming'] = array(
    'menu_name' => 'main-menu',
    'link_path' => 'calendar/upcoming',
    'router_path' => 'calendar/upcoming',
    'link_title' => 'Kalender',
    'options' => array(
      'attributes' => array(
        'title' => '',
      ),
      'alter' => TRUE,
      'identifier' => 'main-menu_kalender:calendar/upcoming',
    ),
    'module' => 'system',
    'hidden' => 0,
    'external' => 0,
    'has_children' => 0,
    'expanded' => 0,
    'weight' => -43,
    'customized' => 1,
  );
  // Exported menu link: menu-top-right_login:user
  $menu_links['menu-top-right_login:user'] = array(
    'menu_name' => 'menu-top-right',
    'link_path' => 'user',
    'router_path' => 'user',
    'link_title' => 'Login',
    'options' => array(
      'attributes' => array(
        'title' => '',
      ),
      'identifier' => 'menu-top-right_login:user',
    ),
    'module' => 'menu',
    'hidden' => 0,
    'external' => 0,
    'has_children' => 0,
    'expanded' => 0,
    'weight' => 0,
    'customized' => 1,
  );
  // Exported menu link: menu-top-right_sitemap:sitemap
  $menu_links['menu-top-right_sitemap:sitemap'] = array(
    'menu_name' => 'menu-top-right',
    'link_path' => 'sitemap',
    'router_path' => 'sitemap',
    'link_title' => 'Sitemap',
    'options' => array(
      'attributes' => array(
        'title' => '',
      ),
      'identifier' => 'menu-top-right_sitemap:sitemap',
    ),
    'module' => 'menu',
    'hidden' => 0,
    'external' => 0,
    'has_children' => 0,
    'expanded' => 0,
    'weight' => 0,
    'customized' => 1,
  );
  // Translatables
  // Included for use with string extractors like potx.
  t('Blog');
  t('Forside');
  t('Galleri');
  t('Kalender');
  t('Login');
  t('Sitemap');


  return $menu_links;
}
