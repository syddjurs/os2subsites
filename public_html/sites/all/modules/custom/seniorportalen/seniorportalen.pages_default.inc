<?php
/**
 * @file
 * seniorportalen.pages_default.inc
 */

/**
 * Implements hook_default_page_manager_handlers().
 */
function seniorportalen_default_page_manager_handlers() {
  $export = array();

  $handler = new stdClass();
  $handler->disabled = FALSE; /* Edit this to true to make a default handler disabled initially */
  $handler->api_version = 1;
  $handler->name = 'node_view__seniorportalen-indholdsside-m-spotbokse';
  $handler->task = 'node_view';
  $handler->subtask = '';
  $handler->handler = 'panel_context';
  $handler->weight = -28;
  $handler->conf = array(
    'title' => 'Seniorportalen - indholdsside m spotbokse',
    'no_blocks' => 1,
    'pipeline' => 'standard',
    'body_classes_to_remove' => '',
    'body_classes_to_add' => '',
    'css_id' => '',
    'css' => '',
    'contexts' => array(),
    'relationships' => array(),
    'name' => 'seniorportalen-indholdsside-m-spotbokse',
    'access' => array(
      'plugins' => array(
        0 => array(
          'name' => 'node_type',
          'settings' => array(
            'type' => array(
              'os2web_base_gallery' => 'os2web_base_gallery',
              'os2web_base_contentpage' => 'os2web_base_contentpage',
            ),
          ),
          'context' => 'argument_entity_id:node_1',
          'not' => FALSE,
        ),
        2 => array(
          'name' => 'path_visibility',
          'settings' => array(
            'visibility_setting' => '1',
            'paths' => 'node/4',
          ),
          'context' => 'empty',
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
    $pane->pid = 'new-5525a0bf-fed9-43c2-b689-83b9f24176fa';
    $pane->panel = 'content';
    $pane->type = 'page_breadcrumb';
    $pane->subtype = 'page_breadcrumb';
    $pane->shown = TRUE;
    $pane->access = array();
    $pane->configuration = array();
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
    $pane->uuid = '5525a0bf-fed9-43c2-b689-83b9f24176fa';
    $display->content['new-5525a0bf-fed9-43c2-b689-83b9f24176fa'] = $pane;
    $display->panels['content'][0] = 'new-5525a0bf-fed9-43c2-b689-83b9f24176fa';
    $pane = new stdClass();
    $pane->pid = 'new-58a56bcb-a73c-414b-9e1d-5251d0f3e94d';
    $pane->panel = 'content';
    $pane->type = 'node_content';
    $pane->subtype = 'node_content';
    $pane->shown = TRUE;
    $pane->access = array();
    $pane->configuration = array(
      'links' => 0,
      'no_extras' => 0,
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
    $pane->position = 1;
    $pane->locks = array();
    $pane->uuid = '58a56bcb-a73c-414b-9e1d-5251d0f3e94d';
    $display->content['new-58a56bcb-a73c-414b-9e1d-5251d0f3e94d'] = $pane;
    $display->panels['content'][1] = 'new-58a56bcb-a73c-414b-9e1d-5251d0f3e94d';
    $pane = new stdClass();
    $pane->pid = 'new-b398e1ac-858e-43e3-872f-2d6f3524454d';
    $pane->panel = 'content';
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
    $pane->position = 2;
    $pane->locks = array();
    $pane->uuid = 'b398e1ac-858e-43e3-872f-2d6f3524454d';
    $display->content['new-b398e1ac-858e-43e3-872f-2d6f3524454d'] = $pane;
    $display->panels['content'][2] = 'new-b398e1ac-858e-43e3-872f-2d6f3524454d';
    $pane = new stdClass();
    $pane->pid = 'new-63a6eac5-6b10-4f0e-a477-d45cf28aa2e4';
    $pane->panel = 'sidebar-left';
    $pane->type = 'block';
    $pane->subtype = 'menu-menu-genveje';
    $pane->shown = TRUE;
    $pane->access = array();
    $pane->configuration = array(
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
    $pane->uuid = '63a6eac5-6b10-4f0e-a477-d45cf28aa2e4';
    $display->content['new-63a6eac5-6b10-4f0e-a477-d45cf28aa2e4'] = $pane;
    $display->panels['sidebar-left'][0] = 'new-63a6eac5-6b10-4f0e-a477-d45cf28aa2e4';
    $pane = new stdClass();
    $pane->pid = 'new-e295bfd0-3564-4ccf-8635-a1b01c7a6e0c';
    $pane->panel = 'sidebar-right';
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
    $display->panels['sidebar-right'][0] = 'new-e295bfd0-3564-4ccf-8635-a1b01c7a6e0c';
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
    $pane->position = 1;
    $pane->locks = array();
    $pane->uuid = 'a8639e0e-ae7b-4dfe-ac36-d36bdebd7f65';
    $display->content['new-a8639e0e-ae7b-4dfe-ac36-d36bdebd7f65'] = $pane;
    $display->panels['sidebar-right'][1] = 'new-a8639e0e-ae7b-4dfe-ac36-d36bdebd7f65';
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
    $pane->position = 2;
    $pane->locks = array();
    $pane->uuid = '902e99d1-fbe8-49d2-a0ca-d6b8331497e9';
    $display->content['new-902e99d1-fbe8-49d2-a0ca-d6b8331497e9'] = $pane;
    $display->panels['sidebar-right'][2] = 'new-902e99d1-fbe8-49d2-a0ca-d6b8331497e9';
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
    $pane->position = 3;
    $pane->locks = array();
    $pane->uuid = 'e4d4ddeb-8ad3-4cdb-a4b3-a03b841bdc51';
    $display->content['new-e4d4ddeb-8ad3-4cdb-a4b3-a03b841bdc51'] = $pane;
    $display->panels['sidebar-right'][3] = 'new-e4d4ddeb-8ad3-4cdb-a4b3-a03b841bdc51';
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
    $pane->position = 4;
    $pane->locks = array();
    $pane->uuid = '72928d41-013b-4890-8ecf-8777b9f87636';
    $display->content['new-72928d41-013b-4890-8ecf-8777b9f87636'] = $pane;
    $display->panels['sidebar-right'][4] = 'new-72928d41-013b-4890-8ecf-8777b9f87636';
    $pane = new stdClass();
    $pane->pid = 'new-33195a9a-c9e9-46ea-a2d4-4a07ba8dcd8f';
    $pane->panel = 'sidebar-right';
    $pane->type = 'views';
    $pane->subtype = 'seniorportalen_nyhedsliste';
    $pane->shown = TRUE;
    $pane->access = array();
    $pane->configuration = array(
      'override_pager_settings' => 0,
      'use_pager' => 0,
      'nodes_per_page' => '2',
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
    $pane->position = 5;
    $pane->locks = array();
    $pane->uuid = '33195a9a-c9e9-46ea-a2d4-4a07ba8dcd8f';
    $display->content['new-33195a9a-c9e9-46ea-a2d4-4a07ba8dcd8f'] = $pane;
    $display->panels['sidebar-right'][5] = 'new-33195a9a-c9e9-46ea-a2d4-4a07ba8dcd8f';
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
  $export['node_view__seniorportalen-indholdsside-m-spotbokse'] = $handler;

  $handler = new stdClass();
  $handler->disabled = FALSE; /* Edit this to true to make a default handler disabled initially */
  $handler->api_version = 1;
  $handler->name = 'node_view__seniorportalen-indholdssider';
  $handler->task = 'node_view';
  $handler->subtask = '';
  $handler->handler = 'panel_context';
  $handler->weight = -27;
  $handler->conf = array(
    'title' => 'Seniorportalen - indholdssider',
    'no_blocks' => 1,
    'pipeline' => 'standard',
    'body_classes_to_remove' => '',
    'body_classes_to_add' => '',
    'css_id' => '',
    'css' => '',
    'contexts' => array(),
    'relationships' => array(),
    'name' => 'seniorportalen-indholdssider',
    'access' => array(
      'plugins' => array(
        0 => array(
          'name' => 'node_type',
          'settings' => array(
            'type' => array(
              'os2web_base_gallery' => 'os2web_base_gallery',
              'os2web_base_contentpage' => 'os2web_base_contentpage',
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
      'no_extras' => 0,
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
    $pane->pid = 'new-b398e1ac-858e-43e3-872f-2d6f3524454d';
    $pane->panel = 'content';
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
    $pane->position = 1;
    $pane->locks = array();
    $pane->uuid = 'b398e1ac-858e-43e3-872f-2d6f3524454d';
    $display->content['new-b398e1ac-858e-43e3-872f-2d6f3524454d'] = $pane;
    $display->panels['content'][1] = 'new-b398e1ac-858e-43e3-872f-2d6f3524454d';
    $pane = new stdClass();
    $pane->pid = 'new-63a6eac5-6b10-4f0e-a477-d45cf28aa2e4';
    $pane->panel = 'sidebar-left';
    $pane->type = 'block';
    $pane->subtype = 'menu-menu-genveje';
    $pane->shown = TRUE;
    $pane->access = array();
    $pane->configuration = array(
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
    $pane->uuid = '63a6eac5-6b10-4f0e-a477-d45cf28aa2e4';
    $display->content['new-63a6eac5-6b10-4f0e-a477-d45cf28aa2e4'] = $pane;
    $display->panels['sidebar-left'][0] = 'new-63a6eac5-6b10-4f0e-a477-d45cf28aa2e4';
    $pane = new stdClass();
    $pane->pid = 'new-e295bfd0-3564-4ccf-8635-a1b01c7a6e0c';
    $pane->panel = 'sidebar-right';
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
    $display->panels['sidebar-right'][0] = 'new-e295bfd0-3564-4ccf-8635-a1b01c7a6e0c';
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
      'template_suggestion' => 'box',
    );
    $pane->extras = array();
    $pane->position = 1;
    $pane->locks = array();
    $pane->uuid = 'a8639e0e-ae7b-4dfe-ac36-d36bdebd7f65';
    $display->content['new-a8639e0e-ae7b-4dfe-ac36-d36bdebd7f65'] = $pane;
    $display->panels['sidebar-right'][1] = 'new-a8639e0e-ae7b-4dfe-ac36-d36bdebd7f65';
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
    $pane->position = 2;
    $pane->locks = array();
    $pane->uuid = '902e99d1-fbe8-49d2-a0ca-d6b8331497e9';
    $display->content['new-902e99d1-fbe8-49d2-a0ca-d6b8331497e9'] = $pane;
    $display->panels['sidebar-right'][2] = 'new-902e99d1-fbe8-49d2-a0ca-d6b8331497e9';
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
    $pane->position = 3;
    $pane->locks = array();
    $pane->uuid = 'e4d4ddeb-8ad3-4cdb-a4b3-a03b841bdc51';
    $display->content['new-e4d4ddeb-8ad3-4cdb-a4b3-a03b841bdc51'] = $pane;
    $display->panels['sidebar-right'][3] = 'new-e4d4ddeb-8ad3-4cdb-a4b3-a03b841bdc51';
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
    $pane->position = 4;
    $pane->locks = array();
    $pane->uuid = '72928d41-013b-4890-8ecf-8777b9f87636';
    $display->content['new-72928d41-013b-4890-8ecf-8777b9f87636'] = $pane;
    $display->panels['sidebar-right'][4] = 'new-72928d41-013b-4890-8ecf-8777b9f87636';
    $pane = new stdClass();
    $pane->pid = 'new-c2cc5a64-f2da-4586-a2fb-a97f1bfdbabc';
    $pane->panel = 'sidebar-right';
    $pane->type = 'views';
    $pane->subtype = 'seniorportalen_nyhedsliste';
    $pane->shown = TRUE;
    $pane->access = array();
    $pane->configuration = array(
      'override_pager_settings' => 0,
      'use_pager' => 0,
      'nodes_per_page' => '2',
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
    $pane->css = array(
      'css_id' => '',
      'css_class' => '',
      'template_suggestion' => 'box',
    );
    $pane->extras = array();
    $pane->position = 5;
    $pane->locks = array();
    $pane->uuid = 'c2cc5a64-f2da-4586-a2fb-a97f1bfdbabc';
    $display->content['new-c2cc5a64-f2da-4586-a2fb-a97f1bfdbabc'] = $pane;
    $display->panels['sidebar-right'][5] = 'new-c2cc5a64-f2da-4586-a2fb-a97f1bfdbabc';
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
  $export['node_view__seniorportalen-indholdssider'] = $handler;

  return $export;
}
