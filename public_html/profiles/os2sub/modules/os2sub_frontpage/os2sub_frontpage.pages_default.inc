<?php
/**
 * @file
 * os2sub_frontpage.pages_default.inc
 */

/**
 * Implements hook_default_page_manager_pages().
 */
function os2sub_frontpage_default_page_manager_pages() {
  $page = new stdClass();
  $page->disabled = FALSE; /* Edit this to true to make a default page disabled initially */
  $page->api_version = 1;
  $page->name = 'forside';
  $page->task = 'page';
  $page->admin_title = 'Forside';
  $page->admin_description = '';
  $page->path = 'forside';
  $page->access = array();
  $page->menu = array(
    'type' => 'none',
    'title' => '',
    'weight' => '0',
    'name' => 'navigation',
    'parent' => array(
      'type' => 'none',
      'title' => '',
      'weight' => 0,
      'name' => 'navigation',
    ),
  );
  $page->arguments = array();
  $page->conf = array();
  $page->default_handlers = array();
  $handler = new stdClass();
  $handler->disabled = FALSE; /* Edit this to true to make a default handler disabled initially */
  $handler->api_version = 1;
  $handler->name = 'page_forside__panel_context_5c441894-8350-417e-9a15-c48ae5410851';
  $handler->task = 'page';
  $handler->subtask = 'forside';
  $handler->handler = 'panel_context';
  $handler->weight = 0;
  $handler->conf = array(
    'title' => 'Landing page',
    'no_blocks' => FALSE,
    'pipeline' => 'ipe',
    'body_classes_to_remove' => '',
    'body_classes_to_add' => '',
    'css_id' => '',
    'css' => '',
    'contexts' => array(),
    'relationships' => array(),
    'name' => '',
  );
  $display = new panels_display();
  $display->layout = 'content-with-left-and-right-sidebar';
  $display->layout_settings = array();
  $display->panel_settings = array(
    'style_settings' => array(
      'default' => NULL,
      'sidebar-left' => NULL,
      'sidebar-right' => NULL,
      'content' => NULL,
    ),
  );
  $display->cache = array();
  $display->title = 'Forside';
  $display->uuid = '5da30adc-aff3-4c40-9f04-0f1cf59e807e';
  $display->content = array();
  $display->panels = array();
    $pane = new stdClass();
    $pane->pid = 'new-054a37dd-733f-42a5-9bb9-4f64da59cea2';
    $pane->panel = 'content';
    $pane->type = 'views_panes';
    $pane->subtype = 'os2sub_velkomst-panel_pane_1';
    $pane->shown = TRUE;
    $pane->access = array();
    $pane->configuration = array();
    $pane->cache = array();
    $pane->style = array(
      'settings' => NULL,
    );
    $pane->css = array();
    $pane->extras = array();
    $pane->position = 0;
    $pane->locks = array();
    $pane->uuid = '054a37dd-733f-42a5-9bb9-4f64da59cea2';
    $display->content['new-054a37dd-733f-42a5-9bb9-4f64da59cea2'] = $pane;
    $display->panels['content'][0] = 'new-054a37dd-733f-42a5-9bb9-4f64da59cea2';
    $pane = new stdClass();
    $pane->pid = 'new-e8de94ca-194c-4741-93e5-3659ae634f8b';
    $pane->panel = 'sidebar-left';
    $pane->type = 'menu_tree';
    $pane->subtype = 'main-menu';
    $pane->shown = TRUE;
    $pane->access = array();
    $pane->configuration = array(
      'parent' => 'main-menu:0',
      'title_link' => 0,
      'admin_title' => 'Venstre menu',
      'level' => '1',
      'follow' => 0,
      'depth' => '1',
      'depth_relative' => 0,
      'expanded' => 0,
      'sort' => 0,
      'menu_name' => 'main-menu',
      'parent_mlid' => '0',
      'override_title' => 1,
      'override_title_text' => '',
      'override_title_heading' => 'h2',
    );
    $pane->cache = array();
    $pane->style = array(
      'settings' => NULL,
    );
    $pane->css = array();
    $pane->extras = array();
    $pane->position = 0;
    $pane->locks = array();
    $pane->uuid = 'e8de94ca-194c-4741-93e5-3659ae634f8b';
    $display->content['new-e8de94ca-194c-4741-93e5-3659ae634f8b'] = $pane;
    $display->panels['sidebar-left'][0] = 'new-e8de94ca-194c-4741-93e5-3659ae634f8b';
    $pane = new stdClass();
    $pane->pid = 'new-ea158aba-915b-4589-9b04-b71452a2eefa';
    $pane->panel = 'sidebar-right';
    $pane->type = 'views_panes';
    $pane->subtype = 'os2web_contact_view_contact-panel_pane_1';
    $pane->shown = TRUE;
    $pane->access = array();
    $pane->configuration = array(
      'arguments' => array(
        'nid' => '',
      ),
      'override_title' => 1,
      'override_title_text' => '',
      'override_title_heading' => 'h2',
    );
    $pane->cache = array();
    $pane->style = array(
      'settings' => NULL,
    );
    $pane->css = array();
    $pane->extras = array();
    $pane->position = 0;
    $pane->locks = array();
    $pane->uuid = 'ea158aba-915b-4589-9b04-b71452a2eefa';
    $display->content['new-ea158aba-915b-4589-9b04-b71452a2eefa'] = $pane;
    $display->panels['sidebar-right'][0] = 'new-ea158aba-915b-4589-9b04-b71452a2eefa';
    $pane = new stdClass();
    $pane->pid = 'new-0a309486-028f-4cc5-850a-360aa747f7d8';
    $pane->panel = 'sidebar-right';
    $pane->type = 'views';
    $pane->subtype = 'os2sub_kontaktblok';
    $pane->shown = TRUE;
    $pane->access = array();
    $pane->configuration = array(
      'override_pager_settings' => 0,
      'use_pager' => 0,
      'nodes_per_page' => '5',
      'pager_id' => '0',
      'offset' => '0',
      'more_link' => 0,
      'feed_icons' => 0,
      'panel_args' => 0,
      'link_to_view' => 0,
      'args' => '',
      'url' => '',
      'display' => 'block',
      'override_title' => 0,
      'override_title_text' => '',
      'override_title_heading' => 'h2',
    );
    $pane->cache = array();
    $pane->style = array(
      'settings' => NULL,
    );
    $pane->css = array();
    $pane->extras = array();
    $pane->position = 1;
    $pane->locks = array();
    $pane->uuid = '0a309486-028f-4cc5-850a-360aa747f7d8';
    $display->content['new-0a309486-028f-4cc5-850a-360aa747f7d8'] = $pane;
    $display->panels['sidebar-right'][1] = 'new-0a309486-028f-4cc5-850a-360aa747f7d8';
  $display->hide_title = PANELS_TITLE_FIXED;
  $display->title_pane = '0';
  $handler->conf['display'] = $display;
  $page->default_handlers[$handler->name] = $handler;
  $pages['forside'] = $page;

  return $pages;

}
