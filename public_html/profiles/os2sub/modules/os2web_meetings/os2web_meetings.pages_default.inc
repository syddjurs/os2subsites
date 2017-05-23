<?php
/**
 * @file
 * os2web_meetings.pages_default.inc
 */

/**
 * Implements hook_default_page_manager_handlers().
 */
function os2web_meetings_default_page_manager_handlers() {
  $export = array();

  $handler = new stdClass();
  $handler->disabled = FALSE; /* Edit this to true to make a default handler disabled initially */
  $handler->api_version = 1;
  $handler->name = 'node_view_panel_agenda';
  $handler->task = 'node_view';
  $handler->subtask = '';
  $handler->handler = 'panel_context';
  $handler->weight = 3;
  $handler->conf = array(
    'title' => 'Dagsordenvisning',
    'no_blocks' => 0,
    'pipeline' => 'standard',
    'body_classes_to_remove' => '',
    'body_classes_to_add' => '',
    'css_id' => '',
    'css' => '',
    'contexts' => array(),
    'relationships' => array(),
    'access' => array(
      'plugins' => array(
        0 => array(
          'name' => 'node_type',
          'settings' => array(
            'type' => array(
              'os2web_meetings_meeting' => 'os2web_meetings_meeting',
            ),
          ),
          'context' => 'argument_entity_id:node_1',
          'not' => FALSE,
        ),
      ),
      'logic' => 'and',
    ),
  );
  $display = new panels_display();
  $display->layout = 'flexible';
  $display->layout_settings = array();
  $display->panel_settings = array(
    'style_settings' => array(
      'default' => NULL,
      'center' => NULL,
      'right_' => NULL,
      'left' => NULL,
      'top' => NULL,
      'bund' => NULL,
    ),
  );
  $display->cache = array();
  $display->title = '%node:field_os2web_meetings_committee';
  $display->uuid = '99697db6-5d8c-496e-8006-b84e82ab49a2';
  $display->storage_type = 'page_manager';
  $display->storage_id = 'node_view_panel_agenda';
  $display->content = array();
  $display->panels = array();
  $pane = new stdClass();
  $pane->pid = 'new-5e59cc68-5ebb-4f78-8294-8d07d648ccd0';
  $pane->panel = 'center';
  $pane->type = 'views';
  $pane->subtype = 'os2web_meetings_meeting_details';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'override_pager_settings' => 0,
    'use_pager' => 0,
    'nodes_per_page' => '0',
    'pager_id' => '0',
    'offset' => '0',
    'more_link' => 0,
    'feed_icons' => 0,
    'panel_args' => 0,
    'link_to_view' => 0,
    'args' => '',
    'url' => '',
    'display' => 'page',
    'context' => array(
      0 => 'argument_entity_id:node_1.field_os2web_meetings_bpa_id',
    ),
    'override_title' => 0,
    'override_title_text' => '',
  );
  $pane->cache = array(
    'method' => '0',
    'settings' => array(),
  );
  $pane->style = array(
    'settings' => NULL,
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 0;
  $pane->locks = array();
  $pane->uuid = '5e59cc68-5ebb-4f78-8294-8d07d648ccd0';
  $display->content['new-5e59cc68-5ebb-4f78-8294-8d07d648ccd0'] = $pane;
  $display->panels['center'][0] = 'new-5e59cc68-5ebb-4f78-8294-8d07d648ccd0';
  $display->hide_title = PANELS_TITLE_FIXED;
  $display->title_pane = '0';
  $handler->conf['display'] = $display;
  $export['node_view_panel_agenda'] = $handler;

  return $export;
}
