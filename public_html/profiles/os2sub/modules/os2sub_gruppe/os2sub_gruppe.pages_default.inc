<?php
/**
 * @file
 * os2sub_gruppe.pages_default.inc
 */

/**
 * Implements hook_default_page_manager_handlers().
 */
function os2sub_gruppe_default_page_manager_handlers() {
  $export = array();

  $handler = new stdClass();
  $handler->disabled = FALSE; /* Edit this to true to make a default handler disabled initially */
  $handler->api_version = 1;
  $handler->name = 'node_view__gruppe';
  $handler->task = 'node_view';
  $handler->subtask = '';
  $handler->handler = 'panel_context';
  $handler->weight = -27;
  $handler->conf = array(
    'title' => 'Gruppe',
    'no_blocks' => 1,
    'pipeline' => 'standard',
    'body_classes_to_remove' => '',
    'body_classes_to_add' => '',
    'css_id' => '',
    'css' => '',
    'contexts' => array(),
    'relationships' => array(),
    'name' => 'gruppe',
    'access' => array(
      'plugins' => array(
        0 => array(
          'name' => 'node_type',
          'settings' => array(
            'type' => array(
              'os2web_group' => 'os2web_group',
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
  $display->layout = 'content-with-left-and-right-sidebar-top-footer';
  $display->layout_settings = array();
  $display->panel_settings = array(
    'style_settings' => array(
      'default' => NULL,
      'sidebar' => NULL,
      'content' => NULL,
      'sidebar-left' => NULL,
      'sidebar-right' => NULL,
      'footer' => NULL,
      'top' => NULL,
    ),
  );
  $display->cache = array();
  $display->title = '%node:title';
  $display->uuid = 'd00ab7a6-9c3a-4db2-990c-5a01327f2f02';
  $display->content = array();
  $display->panels = array();
    $pane = new stdClass();
    $pane->pid = 'new-c2dda61e-6b8e-47b4-90ca-73e55eb10b84';
    $pane->panel = 'content';
    $pane->type = 'node_title';
    $pane->subtype = 'node_title';
    $pane->shown = TRUE;
    $pane->access = array();
    $pane->configuration = array(
      'link' => 0,
      'markup' => 'h1',
      'id' => '',
      'class' => '',
      'context' => 'argument_entity_id:node_1',
      'override_title' => 1,
      'override_title_text' => '',
      'override_title_heading' => 'h2',
    );
    $pane->cache = array();
    $pane->style = array(
      'settings' => NULL,
    );
    $pane->css = array(
      'css_id' => '',
      'css_class' => '',
      'template_suggestion' => 'plain',
    );
    $pane->extras = array();
    $pane->position = 0;
    $pane->locks = array();
    $pane->uuid = 'c2dda61e-6b8e-47b4-90ca-73e55eb10b84';
    $display->content['new-c2dda61e-6b8e-47b4-90ca-73e55eb10b84'] = $pane;
    $display->panels['content'][0] = 'new-c2dda61e-6b8e-47b4-90ca-73e55eb10b84';
    $pane = new stdClass();
    $pane->pid = 'new-7fbb91b5-1eb4-41ba-bf94-ffb366668246';
    $pane->panel = 'content';
    $pane->type = 'views_panes';
    $pane->subtype = 'gruppekalender-panel_pane_1';
    $pane->shown = TRUE;
    $pane->access = array();
    $pane->configuration = array(
      'context' => array(
        0 => 'argument_entity_id:node_1',
      ),
      'override_title' => 1,
      'override_title_text' => '',
      'override_title_heading' => 'h2',
    );
    $pane->cache = array();
    $pane->style = array(
      'settings' => NULL,
    );
    $pane->css = array(
      'css_id' => '',
      'css_class' => '',
      'template_suggestion' => 'plain',
    );
    $pane->extras = array();
    $pane->position = 1;
    $pane->locks = array();
    $pane->uuid = '7fbb91b5-1eb4-41ba-bf94-ffb366668246';
    $display->content['new-7fbb91b5-1eb4-41ba-bf94-ffb366668246'] = $pane;
    $display->panels['content'][1] = 'new-7fbb91b5-1eb4-41ba-bf94-ffb366668246';
    $pane = new stdClass();
    $pane->pid = 'new-e295bfd0-3564-4ccf-8635-a1b01c7a6e0c';
    $pane->panel = 'sidebar-left';
    $pane->type = 'menu_tree';
    $pane->subtype = 'main-menu';
    $pane->shown = TRUE;
    $pane->access = array();
    $pane->configuration = array(
      'parent' => 'main-menu:0',
      'title_link' => 1,
      'admin_title' => '',
      'level' => '2',
      'follow' => 0,
      'depth' => '0',
      'depth_relative' => 0,
      'expanded' => 0,
      'sort' => 0,
      'menu_name' => 'main-menu',
      'parent_mlid' => '0',
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
    $pane->position = 0;
    $pane->locks = array();
    $pane->uuid = 'e295bfd0-3564-4ccf-8635-a1b01c7a6e0c';
    $display->content['new-e295bfd0-3564-4ccf-8635-a1b01c7a6e0c'] = $pane;
    $display->panels['sidebar-left'][0] = 'new-e295bfd0-3564-4ccf-8635-a1b01c7a6e0c';
    $pane = new stdClass();
    $pane->pid = 'new-0e6b7e55-d19e-4e72-93c2-f67a4e6582ef';
    $pane->panel = 'sidebar-right';
    $pane->type = 'node_create_links';
    $pane->subtype = 'node_create_links';
    $pane->shown = TRUE;
    $pane->access = array(
      'plugins' => array(
        0 => array(
          'name' => 'og_perm',
          'settings' => array(
            'perm' => 'administer group',
          ),
          'context' => array(
            0 => 'logged-in-user',
            1 => 'argument_entity_id:node_1',
          ),
          'not' => FALSE,
        ),
      ),
    );
    $pane->configuration = array(
      'types' => array(),
      'field_name' => 'og_group_ref',
      'context' => 'argument_entity_id:node_1',
      'override_title' => 1,
      'override_title_text' => 'Opret',
      'override_title_heading' => 'h2',
    );
    $pane->cache = array();
    $pane->style = array(
      'settings' => NULL,
    );
    $pane->css = array(
      'css_id' => '',
      'css_class' => '',
      'template_suggestion' => 'plaing',
    );
    $pane->extras = array();
    $pane->position = 0;
    $pane->locks = array();
    $pane->uuid = '0e6b7e55-d19e-4e72-93c2-f67a4e6582ef';
    $display->content['new-0e6b7e55-d19e-4e72-93c2-f67a4e6582ef'] = $pane;
    $display->panels['sidebar-right'][0] = 'new-0e6b7e55-d19e-4e72-93c2-f67a4e6582ef';
    $pane = new stdClass();
    $pane->pid = 'new-902e99d1-fbe8-49d2-a0ca-d6b8331497e9';
    $pane->panel = 'sidebar-right';
    $pane->type = 'entity_field';
    $pane->subtype = 'node:field_os2web_base_field_selfserv';
    $pane->shown = TRUE;
    $pane->access = array();
    $pane->configuration = array(
      'label' => 'hidden',
      'formatter' => 'node_reference_node',
      'delta_limit' => '0',
      'delta_offset' => '0',
      'delta_reversed' => 0,
      'formatter_settings' => array(
        'node_reference_view_mode' => 'spotbox',
      ),
      'context' => 'argument_entity_id:node_1',
      'override_title' => 1,
      'override_title_text' => 'Selvbetjening',
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
    $pane->uuid = '902e99d1-fbe8-49d2-a0ca-d6b8331497e9';
    $display->content['new-902e99d1-fbe8-49d2-a0ca-d6b8331497e9'] = $pane;
    $display->panels['sidebar-right'][1] = 'new-902e99d1-fbe8-49d2-a0ca-d6b8331497e9';
    $pane = new stdClass();
    $pane->pid = 'new-e4d4ddeb-8ad3-4cdb-a4b3-a03b841bdc51';
    $pane->panel = 'sidebar-right';
    $pane->type = 'entity_field';
    $pane->subtype = 'node:field_os2web_base_field_related';
    $pane->shown = TRUE;
    $pane->access = array();
    $pane->configuration = array(
      'label' => 'title',
      'formatter' => 'node_reference_default',
      'delta_limit' => '0',
      'delta_offset' => '0',
      'delta_reversed' => 0,
      'formatter_settings' => array(),
      'context' => 'argument_entity_id:node_1',
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
    $pane->position = 2;
    $pane->locks = array();
    $pane->uuid = 'e4d4ddeb-8ad3-4cdb-a4b3-a03b841bdc51';
    $display->content['new-e4d4ddeb-8ad3-4cdb-a4b3-a03b841bdc51'] = $pane;
    $display->panels['sidebar-right'][2] = 'new-e4d4ddeb-8ad3-4cdb-a4b3-a03b841bdc51';
    $pane = new stdClass();
    $pane->pid = 'new-72928d41-013b-4890-8ecf-8777b9f87636';
    $pane->panel = 'sidebar-right';
    $pane->type = 'entity_field';
    $pane->subtype = 'node:field_os2web_base_field_ext_link';
    $pane->shown = TRUE;
    $pane->access = array();
    $pane->configuration = array(
      'label' => 'title',
      'formatter' => 'link_default',
      'delta_limit' => '0',
      'delta_offset' => '0',
      'delta_reversed' => 0,
      'formatter_settings' => array(),
      'context' => 'argument_entity_id:node_1',
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
    $pane->position = 3;
    $pane->locks = array();
    $pane->uuid = '72928d41-013b-4890-8ecf-8777b9f87636';
    $display->content['new-72928d41-013b-4890-8ecf-8777b9f87636'] = $pane;
    $display->panels['sidebar-right'][3] = 'new-72928d41-013b-4890-8ecf-8777b9f87636';
    $pane = new stdClass();
    $pane->pid = 'new-a8639e0e-ae7b-4dfe-ac36-d36bdebd7f65';
    $pane->panel = 'sidebar-right';
    $pane->type = 'entity_field';
    $pane->subtype = 'node:field_os2web_base_field_contact';
    $pane->shown = TRUE;
    $pane->access = array();
    $pane->configuration = array(
      'label' => 'hidden',
      'formatter' => 'node_reference_node',
      'delta_limit' => 0,
      'delta_offset' => '0',
      'delta_reversed' => FALSE,
      'formatter_settings' => array(
        'node_reference_view_mode' => 'teaser',
      ),
      'context' => 'argument_entity_id:node_1',
      'override_title' => 1,
      'override_title_text' => '',
      'override_title_heading' => 'h2',
    );
    $pane->cache = array();
    $pane->style = array(
      'settings' => NULL,
    );
    $pane->css = array(
      'css_id' => '',
      'css_class' => '',
      'template_suggestion' => 'plain',
    );
    $pane->extras = array();
    $pane->position = 4;
    $pane->locks = array();
    $pane->uuid = 'a8639e0e-ae7b-4dfe-ac36-d36bdebd7f65';
    $display->content['new-a8639e0e-ae7b-4dfe-ac36-d36bdebd7f65'] = $pane;
    $display->panels['sidebar-right'][4] = 'new-a8639e0e-ae7b-4dfe-ac36-d36bdebd7f65';
    $pane = new stdClass();
    $pane->pid = 'new-b398e1ac-858e-43e3-872f-2d6f3524454d';
    $pane->panel = 'sidebar-right';
    $pane->type = 'entity_field';
    $pane->subtype = 'node:field_os2web_base_field_spotbox';
    $pane->shown = TRUE;
    $pane->access = array();
    $pane->configuration = array(
      'label' => 'hidden',
      'formatter' => 'node_reference_node',
      'delta_limit' => '0',
      'delta_offset' => '0',
      'delta_reversed' => 0,
      'formatter_settings' => array(
        'node_reference_view_mode' => 'spotbox',
      ),
      'context' => 'argument_entity_id:node_1',
      'override_title' => 1,
      'override_title_text' => '',
      'override_title_heading' => 'h2',
    );
    $pane->cache = array();
    $pane->style = array(
      'settings' => NULL,
    );
    $pane->css = array(
      'css_id' => '',
      'css_class' => '',
      'template_suggestion' => 'plain',
    );
    $pane->extras = array();
    $pane->position = 5;
    $pane->locks = array();
    $pane->uuid = 'b398e1ac-858e-43e3-872f-2d6f3524454d';
    $display->content['new-b398e1ac-858e-43e3-872f-2d6f3524454d'] = $pane;
    $display->panels['sidebar-right'][5] = 'new-b398e1ac-858e-43e3-872f-2d6f3524454d';
    $pane = new stdClass();
    $pane->pid = 'new-f744655a-b546-4e29-967e-387f5146e226';
    $pane->panel = 'top';
    $pane->type = 'views';
    $pane->subtype = 'os2sub_banner';
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
      'display' => 'block_2',
      'context' => array(
        0 => 'argument_entity_id:node_1.field_emply_id',
      ),
      'override_title' => 1,
      'override_title_text' => '',
      'override_title_heading' => 'h2',
    );
    $pane->cache = array();
    $pane->style = array(
      'settings' => NULL,
    );
    $pane->css = array(
      'css_id' => '',
      'css_class' => '',
      'template_suggestion' => 'plain',
    );
    $pane->extras = array();
    $pane->position = 0;
    $pane->locks = array();
    $pane->uuid = 'f744655a-b546-4e29-967e-387f5146e226';
    $display->content['new-f744655a-b546-4e29-967e-387f5146e226'] = $pane;
    $display->panels['top'][0] = 'new-f744655a-b546-4e29-967e-387f5146e226';
  $display->hide_title = PANELS_TITLE_FIXED;
  $display->title_pane = 'new-b398e1ac-858e-43e3-872f-2d6f3524454d';
  $handler->conf['display'] = $display;
  $export['node_view__gruppe'] = $handler;

  $handler = new stdClass();
  $handler->disabled = FALSE; /* Edit this to true to make a default handler disabled initially */
  $handler->api_version = 1;
  $handler->name = 'node_view__gruppem-de';
  $handler->task = 'node_view';
  $handler->subtask = '';
  $handler->handler = 'panel_context';
  $handler->weight = -26;
  $handler->conf = array(
    'title' => 'Gruppemøde',
    'no_blocks' => 1,
    'pipeline' => 'standard',
    'body_classes_to_remove' => '',
    'body_classes_to_add' => '',
    'css_id' => '',
    'css' => '',
    'contexts' => array(),
    'relationships' => array(),
    'name' => 'gruppem-de',
    'access' => array(
      'plugins' => array(
        0 => array(
          'name' => 'node_type',
          'settings' => array(
            'type' => array(
              'os2web_group_event' => 'os2web_group_event',
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
  $display->layout = 'content-with-left-and-right-sidebar-top-footer';
  $display->layout_settings = array();
  $display->panel_settings = array(
    'style_settings' => array(
      'default' => NULL,
      'sidebar' => NULL,
      'content' => NULL,
      'sidebar-left' => NULL,
      'sidebar-right' => NULL,
      'footer' => NULL,
      'top' => NULL,
    ),
  );
  $display->cache = array();
  $display->title = '%node:title';
  $display->uuid = 'd00ab7a6-9c3a-4db2-990c-5a01327f2f02';
  $display->content = array();
  $display->panels = array();
    $pane = new stdClass();
    $pane->pid = 'new-58a56bcb-a73c-414b-9e1d-5251d0f3e94d';
    $pane->panel = 'content';
    $pane->type = 'node_content';
    $pane->subtype = 'node_content';
    $pane->shown = TRUE;
    $pane->access = array();
    $pane->configuration = array(
      'links' => 0,
      'no_extras' => 1,
      'override_title' => 1,
      'override_title_text' => '',
      'identifier' => '',
      'link' => 0,
      'leave_node_title' => 1,
      'build_mode' => 'full',
      'context' => 'argument_entity_id:node_1',
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
    $pane->uuid = '58a56bcb-a73c-414b-9e1d-5251d0f3e94d';
    $display->content['new-58a56bcb-a73c-414b-9e1d-5251d0f3e94d'] = $pane;
    $display->panels['content'][0] = 'new-58a56bcb-a73c-414b-9e1d-5251d0f3e94d';
    $pane = new stdClass();
    $pane->pid = 'new-11441b8f-c2f5-4064-9202-19a67bbc6cda';
    $pane->panel = 'content';
    $pane->type = 'flag_link';
    $pane->subtype = 'node';
    $pane->shown = TRUE;
    $pane->access = array();
    $pane->configuration = array(
      'flag_name' => 'meld_afbud',
      'context' => 'argument_entity_id:node_1',
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
    $pane->position = 1;
    $pane->locks = array();
    $pane->uuid = '11441b8f-c2f5-4064-9202-19a67bbc6cda';
    $display->content['new-11441b8f-c2f5-4064-9202-19a67bbc6cda'] = $pane;
    $display->panels['content'][1] = 'new-11441b8f-c2f5-4064-9202-19a67bbc6cda';
    $pane = new stdClass();
    $pane->pid = 'new-55c5412e-0bfd-4884-82f1-aae8e57962f5';
    $pane->panel = 'content';
    $pane->type = 'entity_field';
    $pane->subtype = 'node:field_os2web_base_field_media';
    $pane->shown = TRUE;
    $pane->access = array();
    $pane->configuration = array(
      'label' => 'title',
      'formatter' => 'file_table',
      'delta_limit' => '0',
      'delta_offset' => '0',
      'delta_reversed' => 0,
      'formatter_settings' => array(),
      'context' => 'argument_entity_id:node_1',
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
    $pane->position = 2;
    $pane->locks = array();
    $pane->uuid = '55c5412e-0bfd-4884-82f1-aae8e57962f5';
    $display->content['new-55c5412e-0bfd-4884-82f1-aae8e57962f5'] = $pane;
    $display->panels['content'][2] = 'new-55c5412e-0bfd-4884-82f1-aae8e57962f5';
    $pane = new stdClass();
    $pane->pid = 'new-54cdad10-3b6e-456f-82fd-923e4f8f8611';
    $pane->panel = 'content';
    $pane->type = 'node_comment_wrapper';
    $pane->subtype = 'node_comment_wrapper';
    $pane->shown = TRUE;
    $pane->access = array();
    $pane->configuration = array(
      'mode' => '1',
      'comments_per_page' => '50',
      'context' => 'argument_entity_id:node_1',
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
    $pane->position = 3;
    $pane->locks = array();
    $pane->uuid = '54cdad10-3b6e-456f-82fd-923e4f8f8611';
    $display->content['new-54cdad10-3b6e-456f-82fd-923e4f8f8611'] = $pane;
    $display->panels['content'][3] = 'new-54cdad10-3b6e-456f-82fd-923e4f8f8611';
    $pane = new stdClass();
    $pane->pid = 'new-e295bfd0-3564-4ccf-8635-a1b01c7a6e0c';
    $pane->panel = 'sidebar-left';
    $pane->type = 'menu_tree';
    $pane->subtype = 'main-menu';
    $pane->shown = TRUE;
    $pane->access = array();
    $pane->configuration = array(
      'parent' => 'main-menu:0',
      'title_link' => 1,
      'admin_title' => '',
      'level' => '2',
      'follow' => 0,
      'depth' => '0',
      'depth_relative' => 0,
      'expanded' => 0,
      'sort' => 0,
      'menu_name' => 'main-menu',
      'parent_mlid' => '0',
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
    $pane->position = 0;
    $pane->locks = array();
    $pane->uuid = 'e295bfd0-3564-4ccf-8635-a1b01c7a6e0c';
    $display->content['new-e295bfd0-3564-4ccf-8635-a1b01c7a6e0c'] = $pane;
    $display->panels['sidebar-left'][0] = 'new-e295bfd0-3564-4ccf-8635-a1b01c7a6e0c';
    $pane = new stdClass();
    $pane->pid = 'new-902e99d1-fbe8-49d2-a0ca-d6b8331497e9';
    $pane->panel = 'sidebar-right';
    $pane->type = 'entity_field';
    $pane->subtype = 'node:field_os2web_base_field_selfserv';
    $pane->shown = TRUE;
    $pane->access = array();
    $pane->configuration = array(
      'label' => 'hidden',
      'formatter' => 'node_reference_node',
      'delta_limit' => '0',
      'delta_offset' => '0',
      'delta_reversed' => 0,
      'formatter_settings' => array(
        'node_reference_view_mode' => 'spotbox',
      ),
      'context' => 'argument_entity_id:node_1',
      'override_title' => 1,
      'override_title_text' => 'Selvbetjening',
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
    $pane->uuid = '902e99d1-fbe8-49d2-a0ca-d6b8331497e9';
    $display->content['new-902e99d1-fbe8-49d2-a0ca-d6b8331497e9'] = $pane;
    $display->panels['sidebar-right'][0] = 'new-902e99d1-fbe8-49d2-a0ca-d6b8331497e9';
    $pane = new stdClass();
    $pane->pid = 'new-e4d4ddeb-8ad3-4cdb-a4b3-a03b841bdc51';
    $pane->panel = 'sidebar-right';
    $pane->type = 'entity_field';
    $pane->subtype = 'node:field_os2web_base_field_related';
    $pane->shown = TRUE;
    $pane->access = array();
    $pane->configuration = array(
      'label' => 'title',
      'formatter' => 'node_reference_default',
      'delta_limit' => '0',
      'delta_offset' => '0',
      'delta_reversed' => 0,
      'formatter_settings' => array(),
      'context' => 'argument_entity_id:node_1',
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
    $pane->uuid = 'e4d4ddeb-8ad3-4cdb-a4b3-a03b841bdc51';
    $display->content['new-e4d4ddeb-8ad3-4cdb-a4b3-a03b841bdc51'] = $pane;
    $display->panels['sidebar-right'][1] = 'new-e4d4ddeb-8ad3-4cdb-a4b3-a03b841bdc51';
    $pane = new stdClass();
    $pane->pid = 'new-72928d41-013b-4890-8ecf-8777b9f87636';
    $pane->panel = 'sidebar-right';
    $pane->type = 'entity_field';
    $pane->subtype = 'node:field_os2web_base_field_ext_link';
    $pane->shown = TRUE;
    $pane->access = array();
    $pane->configuration = array(
      'label' => 'title',
      'formatter' => 'link_default',
      'delta_limit' => '0',
      'delta_offset' => '0',
      'delta_reversed' => 0,
      'formatter_settings' => array(),
      'context' => 'argument_entity_id:node_1',
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
    $pane->position = 2;
    $pane->locks = array();
    $pane->uuid = '72928d41-013b-4890-8ecf-8777b9f87636';
    $display->content['new-72928d41-013b-4890-8ecf-8777b9f87636'] = $pane;
    $display->panels['sidebar-right'][2] = 'new-72928d41-013b-4890-8ecf-8777b9f87636';
    $pane = new stdClass();
    $pane->pid = 'new-a8639e0e-ae7b-4dfe-ac36-d36bdebd7f65';
    $pane->panel = 'sidebar-right';
    $pane->type = 'entity_field';
    $pane->subtype = 'node:field_os2web_base_field_contact';
    $pane->shown = TRUE;
    $pane->access = array();
    $pane->configuration = array(
      'label' => 'hidden',
      'formatter' => 'node_reference_node',
      'delta_limit' => 0,
      'delta_offset' => '0',
      'delta_reversed' => FALSE,
      'formatter_settings' => array(
        'node_reference_view_mode' => 'teaser',
      ),
      'context' => 'argument_entity_id:node_1',
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
    $pane->position = 3;
    $pane->locks = array();
    $pane->uuid = 'a8639e0e-ae7b-4dfe-ac36-d36bdebd7f65';
    $display->content['new-a8639e0e-ae7b-4dfe-ac36-d36bdebd7f65'] = $pane;
    $display->panels['sidebar-right'][3] = 'new-a8639e0e-ae7b-4dfe-ac36-d36bdebd7f65';
    $pane = new stdClass();
    $pane->pid = 'new-b398e1ac-858e-43e3-872f-2d6f3524454d';
    $pane->panel = 'sidebar-right';
    $pane->type = 'entity_field';
    $pane->subtype = 'node:field_os2web_base_field_spotbox';
    $pane->shown = TRUE;
    $pane->access = array();
    $pane->configuration = array(
      'label' => 'hidden',
      'formatter' => 'node_reference_node',
      'delta_limit' => '0',
      'delta_offset' => '0',
      'delta_reversed' => 0,
      'formatter_settings' => array(
        'node_reference_view_mode' => 'spotbox',
      ),
      'context' => 'argument_entity_id:node_1',
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
    $pane->position = 4;
    $pane->locks = array();
    $pane->uuid = 'b398e1ac-858e-43e3-872f-2d6f3524454d';
    $display->content['new-b398e1ac-858e-43e3-872f-2d6f3524454d'] = $pane;
    $display->panels['sidebar-right'][4] = 'new-b398e1ac-858e-43e3-872f-2d6f3524454d';
    $pane = new stdClass();
    $pane->pid = 'new-5cfec965-8d6e-4f1a-826c-dfba32d82f47';
    $pane->panel = 'sidebar-right';
    $pane->type = 'views_panes';
    $pane->subtype = 'gruppekalender-panel_pane_2';
    $pane->shown = TRUE;
    $pane->access = array();
    $pane->configuration = array(
      'context' => array(
        0 => 'argument_entity_id:node_1',
      ),
    );
    $pane->cache = array();
    $pane->style = array(
      'settings' => NULL,
    );
    $pane->css = array();
    $pane->extras = array();
    $pane->position = 5;
    $pane->locks = array();
    $pane->uuid = '5cfec965-8d6e-4f1a-826c-dfba32d82f47';
    $display->content['new-5cfec965-8d6e-4f1a-826c-dfba32d82f47'] = $pane;
    $display->panels['sidebar-right'][5] = 'new-5cfec965-8d6e-4f1a-826c-dfba32d82f47';
    $pane = new stdClass();
    $pane->pid = 'new-30f5b084-048e-461e-9b7d-9a7748bf2cb6';
    $pane->panel = 'sidebar-right';
    $pane->type = 'views_panes';
    $pane->subtype = 'os2sub_user_rsvp-panel_pane_1';
    $pane->shown = TRUE;
    $pane->access = array(
      'plugins' => array(
        0 => array(
          'name' => 'perm',
          'settings' => array(
            'perm' => 'create os2web_group_event content',
          ),
          'context' => 'logged-in-user',
          'not' => FALSE,
        ),
      ),
    );
    $pane->configuration = array(
      'context' => array(
        0 => 'argument_entity_id:node_1',
      ),
    );
    $pane->cache = array();
    $pane->style = array(
      'settings' => NULL,
    );
    $pane->css = array();
    $pane->extras = array();
    $pane->position = 6;
    $pane->locks = array();
    $pane->uuid = '30f5b084-048e-461e-9b7d-9a7748bf2cb6';
    $display->content['new-30f5b084-048e-461e-9b7d-9a7748bf2cb6'] = $pane;
    $display->panels['sidebar-right'][6] = 'new-30f5b084-048e-461e-9b7d-9a7748bf2cb6';
    $pane = new stdClass();
    $pane->pid = 'new-1ea970bd-5232-4914-bf20-5d2115a43f81';
    $pane->panel = 'sidebar-right';
    $pane->type = 'views_panes';
    $pane->subtype = 'os2web_my_group_content-panel_pane_2';
    $pane->shown = TRUE;
    $pane->access = array();
    $pane->configuration = array();
    $pane->cache = array();
    $pane->style = array(
      'settings' => NULL,
    );
    $pane->css = array();
    $pane->extras = array();
    $pane->position = 7;
    $pane->locks = array();
    $pane->uuid = '1ea970bd-5232-4914-bf20-5d2115a43f81';
    $display->content['new-1ea970bd-5232-4914-bf20-5d2115a43f81'] = $pane;
    $display->panels['sidebar-right'][7] = 'new-1ea970bd-5232-4914-bf20-5d2115a43f81';
    $pane = new stdClass();
    $pane->pid = 'new-f744655a-b546-4e29-967e-387f5146e226';
    $pane->panel = 'top';
    $pane->type = 'views';
    $pane->subtype = 'os2sub_banner';
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
      'display' => 'block_2',
      'context' => array(
        0 => 'argument_entity_id:node_1.field_emply_id',
      ),
      'override_title' => 1,
      'override_title_text' => '',
      'override_title_heading' => 'h2',
    );
    $pane->cache = array();
    $pane->style = array(
      'settings' => NULL,
    );
    $pane->css = array(
      'css_id' => '',
      'css_class' => '',
      'template_suggestion' => 'plain',
    );
    $pane->extras = array();
    $pane->position = 0;
    $pane->locks = array();
    $pane->uuid = 'f744655a-b546-4e29-967e-387f5146e226';
    $display->content['new-f744655a-b546-4e29-967e-387f5146e226'] = $pane;
    $display->panels['top'][0] = 'new-f744655a-b546-4e29-967e-387f5146e226';
  $display->hide_title = PANELS_TITLE_FIXED;
  $display->title_pane = 'new-b398e1ac-858e-43e3-872f-2d6f3524454d';
  $handler->conf['display'] = $display;
  $export['node_view__gruppem-de'] = $handler;

  $handler = new stdClass();
  $handler->disabled = FALSE; /* Edit this to true to make a default handler disabled initially */
  $handler->api_version = 1;
  $handler->name = 'user_view__panel_context_2e9a2339-c761-459b-bc87-04c3a585b91b';
  $handler->task = 'user_view';
  $handler->subtask = '';
  $handler->handler = 'panel_context';
  $handler->weight = 0;
  $handler->conf = array(
    'title' => 'Brugerside',
    'no_blocks' => 0,
    'pipeline' => 'standard',
    'body_classes_to_remove' => '',
    'body_classes_to_add' => '',
    'css_id' => '',
    'css' => '',
    'contexts' => array(),
    'relationships' => array(),
    'name' => '',
    'access' => array(
      'plugins' => array(
        0 => array(
          'name' => 'compare_users',
          'settings' => array(
            'equality' => '1',
          ),
          'context' => array(
            0 => 'argument_entity_id:user_1',
            1 => 'logged-in-user',
          ),
          'not' => FALSE,
        ),
      ),
      'logic' => 'and',
    ),
  );
  $display = new panels_display();
  $display->layout = 'content-with-left-and-right-sidebar-top-footer';
  $display->layout_settings = array();
  $display->panel_settings = array(
    'style_settings' => array(
      'default' => NULL,
      'footer' => NULL,
      'top' => NULL,
      'sidebar-left' => NULL,
      'sidebar-right' => NULL,
      'content' => NULL,
    ),
  );
  $display->cache = array();
  $display->title = '';
  $display->uuid = '8795bb67-dcc5-43bd-8d1d-5bc7cff8e8ae';
  $display->content = array();
  $display->panels = array();
    $pane = new stdClass();
    $pane->pid = 'new-97cbb6d3-fb86-49c4-9421-97e33074a625';
    $pane->panel = 'content';
    $pane->type = 'views_panes';
    $pane->subtype = 'os2web_my_group_content-panel_pane_1';
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
    $pane->uuid = '97cbb6d3-fb86-49c4-9421-97e33074a625';
    $display->content['new-97cbb6d3-fb86-49c4-9421-97e33074a625'] = $pane;
    $display->panels['content'][0] = 'new-97cbb6d3-fb86-49c4-9421-97e33074a625';
    $pane = new stdClass();
    $pane->pid = 'new-e7962268-86bf-4fdf-9ef8-de23d54d2516';
    $pane->panel = 'sidebar-left';
    $pane->type = 'views_panes';
    $pane->subtype = 'os2web_my_group-panel_pane_1';
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
    $pane->uuid = 'e7962268-86bf-4fdf-9ef8-de23d54d2516';
    $display->content['new-e7962268-86bf-4fdf-9ef8-de23d54d2516'] = $pane;
    $display->panels['sidebar-left'][0] = 'new-e7962268-86bf-4fdf-9ef8-de23d54d2516';
    $pane = new stdClass();
    $pane->pid = 'new-deb5dcdc-d547-412b-943d-a6ec17d2d6b6';
    $pane->panel = 'sidebar-right';
    $pane->type = 'views_panes';
    $pane->subtype = 'os2web_my_group_content-panel_pane_2';
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
    $pane->uuid = 'deb5dcdc-d547-412b-943d-a6ec17d2d6b6';
    $display->content['new-deb5dcdc-d547-412b-943d-a6ec17d2d6b6'] = $pane;
    $display->panels['sidebar-right'][0] = 'new-deb5dcdc-d547-412b-943d-a6ec17d2d6b6';
  $display->hide_title = PANELS_TITLE_FIXED;
  $display->title_pane = '0';
  $handler->conf['display'] = $display;
  $export['user_view__panel_context_2e9a2339-c761-459b-bc87-04c3a585b91b'] = $handler;

  return $export;
}
