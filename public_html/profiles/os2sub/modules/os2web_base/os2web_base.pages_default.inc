<?php
/**
 * @file
 * os2web_base.pages_default.inc
 */

/**
 * Implements hook_default_page_manager_handlers().
 */
function os2web_base_default_page_manager_handlers() {
  $export = array();

  $handler = new stdClass();
  $handler->disabled = FALSE; /* Edit this to true to make a default handler disabled initially */
  $handler->api_version = 1;
  $handler->name = 'node_edit_panel_context';
  $handler->task = 'node_edit';
  $handler->subtask = '';
  $handler->handler = 'panel_context';
  $handler->weight = 0;
  $handler->conf = array(
    'title' => 'Indholdsside',
    'no_blocks' => 1,
    'pipeline' => 'standard',
    'body_classes_to_remove' => '',
    'body_classes_to_add' => '',
    'css_id' => '',
    'css' => '.panels-flexible-node_edit-inside { padding: 10px}',
    'contexts' => array(
      0 => array(
        'identifier' => 'Redigeringsformular',
        'keyword' => 'node_add',
        'name' => 'node_add_form',
        'type' => 'os2web_base_contentpage',
        'id' => 1,
      ),
    ),
    'relationships' => array(),
    'access' => array(
      'plugins' => array(
        0 => array(
          'name' => 'node_type',
          'settings' => array(
            'type' => array(
              'os2web_base_contentpage' => 'os2web_base_contentpage',
            ),
          ),
          'context' => 'argument_node_edit_1',
          'not' => FALSE,
        ),
      ),
      'logic' => 'and',
    ),
  );
  $display = new panels_display();
  $display->layout = 'flexible:node_edit';
  $display->layout_settings = array();
  $display->panel_settings = array(
    'style_settings' => array(
      'default' => NULL,
      'lead' => NULL,
      'top_left' => NULL,
      'top_center' => NULL,
      'top_right' => NULL,
      'middle_left' => NULL,
      'middle_right' => NULL,
      'bottom' => NULL,
      'center' => NULL,
      'venstre' => NULL,
      'h__jre' => NULL,
    ),
  );
  $display->cache = array();
  $display->title = '';
  $display->uuid = '7c4c60cd-70f6-4454-af74-2978f0a1ed3f';
  $display->content = array();
  $display->panels = array();
    $pane = new stdClass();
    $pane->pid = 'new-4c8670dc-a30b-4c7e-b4a3-a709a0e35a4c';
    $pane->panel = 'center';
    $pane->type = 'form';
    $pane->subtype = 'form';
    $pane->shown = TRUE;
    $pane->access = array();
    $pane->configuration = array(
      'context' => 'argument_node_edit_1',
      'override_title' => 0,
      'override_title_text' => '',
    );
    $pane->cache = array();
    $pane->style = array(
      'settings' => NULL,
    );
    $pane->css = array();
    $pane->extras = array();
    $pane->position = 0;
    $pane->locks = array();
    $pane->uuid = '4c8670dc-a30b-4c7e-b4a3-a709a0e35a4c';
    $display->content['new-4c8670dc-a30b-4c7e-b4a3-a709a0e35a4c'] = $pane;
    $display->panels['center'][0] = 'new-4c8670dc-a30b-4c7e-b4a3-a709a0e35a4c';
    $pane = new stdClass();
    $pane->pid = 'new-0f92b9a3-63d2-4126-bab2-e3667f2792b1';
    $pane->panel = 'center';
    $pane->type = 'node_form_buttons';
    $pane->subtype = 'node_form_buttons';
    $pane->shown = TRUE;
    $pane->access = array();
    $pane->configuration = array(
      'context' => 'argument_node_edit_1',
      'override_title' => 1,
      'override_title_text' => '',
    );
    $pane->cache = array();
    $pane->style = array(
      'settings' => NULL,
    );
    $pane->css = array();
    $pane->extras = array();
    $pane->position = 1;
    $pane->locks = array();
    $pane->uuid = '0f92b9a3-63d2-4126-bab2-e3667f2792b1';
    $display->content['new-0f92b9a3-63d2-4126-bab2-e3667f2792b1'] = $pane;
    $display->panels['center'][1] = 'new-0f92b9a3-63d2-4126-bab2-e3667f2792b1';
    $pane = new stdClass();
    $pane->pid = 'new-ba4803db-6f0e-48d5-8ccd-a2ddbe21f746';
    $pane->panel = 'h__jre';
    $pane->type = 'node_form_buttons';
    $pane->subtype = 'node_form_buttons';
    $pane->shown = TRUE;
    $pane->access = array();
    $pane->configuration = array(
      'context' => 'argument_node_edit_1',
      'override_title' => 1,
      'override_title_text' => '',
    );
    $pane->cache = array();
    $pane->style = array(
      'settings' => NULL,
    );
    $pane->css = array();
    $pane->extras = array();
    $pane->position = 0;
    $pane->locks = array();
    $pane->uuid = 'ba4803db-6f0e-48d5-8ccd-a2ddbe21f746';
    $display->content['new-ba4803db-6f0e-48d5-8ccd-a2ddbe21f746'] = $pane;
    $display->panels['h__jre'][0] = 'new-ba4803db-6f0e-48d5-8ccd-a2ddbe21f746';
    $pane = new stdClass();
    $pane->pid = 'new-75e9b4c6-1648-4126-8747-d88e4bf80964';
    $pane->panel = 'h__jre';
    $pane->type = 'node_form_publishing';
    $pane->subtype = 'node_form_publishing';
    $pane->shown = TRUE;
    $pane->access = array();
    $pane->configuration = array(
      'context' => 'argument_node_edit_1',
      'override_title' => 1,
      'override_title_text' => '',
    );
    $pane->cache = array();
    $pane->style = array(
      'settings' => NULL,
    );
    $pane->css = array();
    $pane->extras = array();
    $pane->position = 1;
    $pane->locks = array();
    $pane->uuid = '75e9b4c6-1648-4126-8747-d88e4bf80964';
    $display->content['new-75e9b4c6-1648-4126-8747-d88e4bf80964'] = $pane;
    $display->panels['h__jre'][1] = 'new-75e9b4c6-1648-4126-8747-d88e4bf80964';
    $pane = new stdClass();
    $pane->pid = 'new-da0dc756-feac-4113-9951-6aa2746e870a';
    $pane->panel = 'venstre';
    $pane->type = 'node_form_title';
    $pane->subtype = 'node_form_title';
    $pane->shown = TRUE;
    $pane->access = array();
    $pane->configuration = array(
      'context' => 'argument_node_edit_1',
      'override_title' => 1,
      'override_title_text' => '',
    );
    $pane->cache = array();
    $pane->style = array(
      'settings' => NULL,
    );
    $pane->css = array();
    $pane->extras = array();
    $pane->position = 0;
    $pane->locks = array();
    $pane->uuid = 'da0dc756-feac-4113-9951-6aa2746e870a';
    $display->content['new-da0dc756-feac-4113-9951-6aa2746e870a'] = $pane;
    $display->panels['venstre'][0] = 'new-da0dc756-feac-4113-9951-6aa2746e870a';
    $pane = new stdClass();
    $pane->pid = 'new-f5ce2054-5007-44fd-af95-54ec2ce066c4';
    $pane->panel = 'venstre';
    $pane->type = 'node_form_path';
    $pane->subtype = 'node_form_path';
    $pane->shown = TRUE;
    $pane->access = array();
    $pane->configuration = array(
      'context' => 'argument_node_edit_1',
      'override_title' => 1,
      'override_title_text' => '',
    );
    $pane->cache = array();
    $pane->style = array(
      'settings' => NULL,
    );
    $pane->css = array();
    $pane->extras = array();
    $pane->position = 1;
    $pane->locks = array();
    $pane->uuid = 'f5ce2054-5007-44fd-af95-54ec2ce066c4';
    $display->content['new-f5ce2054-5007-44fd-af95-54ec2ce066c4'] = $pane;
    $display->panels['venstre'][1] = 'new-f5ce2054-5007-44fd-af95-54ec2ce066c4';
  $display->hide_title = PANELS_TITLE_NONE;
  $display->title_pane = '0';
  $handler->conf['display'] = $display;
  $export['node_edit_panel_context'] = $handler;

  return $export;
}
