<?php
/**
 * @file
 * kultunaut_import.pages_default.inc
 */

/**
 * Implements hook_default_page_manager_handlers().
 */
function kultunaut_import_default_page_manager_handlers() {
  $export = array();

  $handler = new stdClass();
  $handler->disabled = FALSE; /* Edit this to true to make a default handler disabled initially */
  $handler->api_version = 1;
  $handler->name = 'term_view__panel_context_6434e852-b63e-45b4-9234-b6dcc05d23bd';
  $handler->task = 'term_view';
  $handler->subtask = '';
  $handler->handler = 'panel_context';
  $handler->weight = 0;
  $handler->conf = array(
    'title' => 'Steder',
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
          'name' => 'term_vocabulary',
          'settings' => array(
            'machine_name' => array(
              'os2web_taxonomies_tax_places' => 'os2web_taxonomies_tax_places',
            ),
          ),
          'context' => 'argument_term_1',
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
      'footer' => NULL,
      'top' => NULL,
      'sidebar-left' => NULL,
      'sidebar-right' => NULL,
    ),
  );
  $display->cache = array();
  $display->title = '';
  $display->uuid = '91fd3681-cf5c-4cd6-8e20-783adb5f3b7f';
  $display->content = array();
  $display->panels = array();
    $pane = new stdClass();
    $pane->pid = 'new-e66073e8-ae26-4ebc-a5ec-10261eb60d34';
    $pane->panel = 'content';
    $pane->type = 'term_list';
    $pane->subtype = 'term_list';
    $pane->shown = TRUE;
    $pane->access = array();
    $pane->configuration = array(
      'title' => NULL,
      'type' => 'child',
      'include_current_term' => 0,
      'list_type' => 'ol',
      'path' => 'taxonomy/term',
      'context' => 'argument_term_1',
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
    $pane->uuid = 'e66073e8-ae26-4ebc-a5ec-10261eb60d34';
    $display->content['new-e66073e8-ae26-4ebc-a5ec-10261eb60d34'] = $pane;
    $display->panels['content'][0] = 'new-e66073e8-ae26-4ebc-a5ec-10261eb60d34';
    $pane = new stdClass();
    $pane->pid = 'new-813b8640-4929-41aa-bb34-4d5f76d1e350';
    $pane->panel = 'top';
    $pane->type = 'term_name';
    $pane->subtype = 'term_name';
    $pane->shown = TRUE;
    $pane->access = array();
    $pane->configuration = array(
      'link' => 0,
      'markup' => 'h1',
      'id' => '',
      'class' => '',
      'context' => 'argument_term_1',
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
    $pane->uuid = '813b8640-4929-41aa-bb34-4d5f76d1e350';
    $display->content['new-813b8640-4929-41aa-bb34-4d5f76d1e350'] = $pane;
    $display->panels['top'][0] = 'new-813b8640-4929-41aa-bb34-4d5f76d1e350';
  $display->hide_title = PANELS_TITLE_FIXED;
  $display->title_pane = '0';
  $handler->conf['display'] = $display;
  $export['term_view__panel_context_6434e852-b63e-45b4-9234-b6dcc05d23bd'] = $handler;

  $handler = new stdClass();
  $handler->disabled = FALSE; /* Edit this to true to make a default handler disabled initially */
  $handler->api_version = 1;
  $handler->name = 'term_view__variant-1';
  $handler->task = 'term_view';
  $handler->subtask = '';
  $handler->handler = 'panel_context';
  $handler->weight = 1;
  $handler->conf = array(
    'title' => 'Variant 1',
    'no_blocks' => 0,
    'pipeline' => 'standard',
    'body_classes_to_remove' => '',
    'body_classes_to_add' => 'var1',
    'css_id' => '',
    'css' => '',
    'contexts' => array(),
    'relationships' => array(),
    'name' => 'variant-1',
    'access' => array(
      'plugins' => array(
        0 => array(
          'name' => 'term_vocabulary',
          'settings' => array(
            'machine_name' => array(
              'os2web_taxonomies_tax_places' => 'os2web_taxonomies_tax_places',
            ),
          ),
          'context' => 'argument_term_1',
          'not' => FALSE,
        ),
        1 => array(
          'name' => 'entity_field_value:taxonomy_term:os2web_taxonomies_tax_places:field_os2web_taxonomies_disp_var',
          'settings' => array(
            'field_os2web_taxonomies_disp_var' => array(
              'und' => array(
                0 => array(
                  'value' => 'var1',
                ),
              ),
            ),
            'field_os2web_taxonomies_disp_var_value' => array(
              0 => 'var1',
            ),
          ),
          'context' => 'argument_term_1',
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
      'footer' => NULL,
      'top' => NULL,
      'sidebar-left' => NULL,
      'sidebar-right' => NULL,
    ),
  );
  $display->cache = array();
  $display->title = '';
  $display->uuid = '91fd3681-cf5c-4cd6-8e20-783adb5f3b7f';
  $display->content = array();
  $display->panels = array();
    $pane = new stdClass();
    $pane->pid = 'new-e66073e8-ae26-4ebc-a5ec-10261eb60d34';
    $pane->panel = 'content';
    $pane->type = 'term_list';
    $pane->subtype = 'term_list';
    $pane->shown = TRUE;
    $pane->access = array();
    $pane->configuration = array(
      'title' => NULL,
      'type' => 'child',
      'include_current_term' => 0,
      'list_type' => 'ol',
      'path' => 'taxonomy/term',
      'context' => 'argument_term_1',
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
    $pane->uuid = 'e66073e8-ae26-4ebc-a5ec-10261eb60d34';
    $display->content['new-e66073e8-ae26-4ebc-a5ec-10261eb60d34'] = $pane;
    $display->panels['content'][0] = 'new-e66073e8-ae26-4ebc-a5ec-10261eb60d34';
    $pane = new stdClass();
    $pane->pid = 'new-813b8640-4929-41aa-bb34-4d5f76d1e350';
    $pane->panel = 'top';
    $pane->type = 'term_name';
    $pane->subtype = 'term_name';
    $pane->shown = TRUE;
    $pane->access = array();
    $pane->configuration = array(
      'link' => 0,
      'markup' => 'h1',
      'id' => '',
      'class' => '',
      'context' => 'argument_term_1',
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
    $pane->uuid = '813b8640-4929-41aa-bb34-4d5f76d1e350';
    $display->content['new-813b8640-4929-41aa-bb34-4d5f76d1e350'] = $pane;
    $display->panels['top'][0] = 'new-813b8640-4929-41aa-bb34-4d5f76d1e350';
  $display->hide_title = PANELS_TITLE_FIXED;
  $display->title_pane = '0';
  $handler->conf['display'] = $display;
  $export['term_view__variant-1'] = $handler;

  $handler = new stdClass();
  $handler->disabled = FALSE; /* Edit this to true to make a default handler disabled initially */
  $handler->api_version = 1;
  $handler->name = 'term_view__variant-2';
  $handler->task = 'term_view';
  $handler->subtask = '';
  $handler->handler = 'panel_context';
  $handler->weight = 2;
  $handler->conf = array(
    'title' => 'Variant 2',
    'no_blocks' => 0,
    'pipeline' => 'standard',
    'body_classes_to_remove' => '',
    'body_classes_to_add' => 'var2',
    'css_id' => '',
    'css' => '',
    'contexts' => array(),
    'relationships' => array(),
    'name' => 'variant-2',
    'access' => array(
      'plugins' => array(
        0 => array(
          'name' => 'term_vocabulary',
          'settings' => array(
            'machine_name' => array(
              'os2web_taxonomies_tax_places' => 'os2web_taxonomies_tax_places',
            ),
          ),
          'context' => 'argument_term_1',
          'not' => FALSE,
        ),
        1 => array(
          'name' => 'entity_field_value:taxonomy_term:os2web_taxonomies_tax_places:field_os2web_taxonomies_disp_var',
          'settings' => array(
            'field_os2web_taxonomies_disp_var' => array(
              'und' => array(
                0 => array(
                  'value' => 'var2',
                ),
              ),
            ),
            'field_os2web_taxonomies_disp_var_value' => array(
              0 => 'var2',
            ),
          ),
          'context' => 'argument_term_1',
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
      'footer' => NULL,
      'top' => NULL,
      'sidebar-left' => NULL,
      'sidebar-right' => NULL,
    ),
  );
  $display->cache = array();
  $display->title = '';
  $display->uuid = '91fd3681-cf5c-4cd6-8e20-783adb5f3b7f';
  $display->content = array();
  $display->panels = array();
    $pane = new stdClass();
    $pane->pid = 'new-e66073e8-ae26-4ebc-a5ec-10261eb60d34';
    $pane->panel = 'content';
    $pane->type = 'term_list';
    $pane->subtype = 'term_list';
    $pane->shown = TRUE;
    $pane->access = array();
    $pane->configuration = array(
      'title' => NULL,
      'type' => 'child',
      'include_current_term' => 0,
      'list_type' => 'ol',
      'path' => 'taxonomy/term',
      'context' => 'argument_term_1',
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
    $pane->uuid = 'e66073e8-ae26-4ebc-a5ec-10261eb60d34';
    $display->content['new-e66073e8-ae26-4ebc-a5ec-10261eb60d34'] = $pane;
    $display->panels['content'][0] = 'new-e66073e8-ae26-4ebc-a5ec-10261eb60d34';
    $pane = new stdClass();
    $pane->pid = 'new-813b8640-4929-41aa-bb34-4d5f76d1e350';
    $pane->panel = 'top';
    $pane->type = 'term_name';
    $pane->subtype = 'term_name';
    $pane->shown = TRUE;
    $pane->access = array();
    $pane->configuration = array(
      'link' => 0,
      'markup' => 'h1',
      'id' => '',
      'class' => '',
      'context' => 'argument_term_1',
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
    $pane->uuid = '813b8640-4929-41aa-bb34-4d5f76d1e350';
    $display->content['new-813b8640-4929-41aa-bb34-4d5f76d1e350'] = $pane;
    $display->panels['top'][0] = 'new-813b8640-4929-41aa-bb34-4d5f76d1e350';
  $display->hide_title = PANELS_TITLE_FIXED;
  $display->title_pane = '0';
  $handler->conf['display'] = $display;
  $export['term_view__variant-2'] = $handler;

  $handler = new stdClass();
  $handler->disabled = FALSE; /* Edit this to true to make a default handler disabled initially */
  $handler->api_version = 1;
  $handler->name = 'term_view__variant-3';
  $handler->task = 'term_view';
  $handler->subtask = '';
  $handler->handler = 'panel_context';
  $handler->weight = 3;
  $handler->conf = array(
    'title' => 'Variant 3',
    'no_blocks' => 0,
    'pipeline' => 'standard',
    'body_classes_to_remove' => '',
    'body_classes_to_add' => 'var3',
    'css_id' => '',
    'css' => '',
    'contexts' => array(),
    'relationships' => array(),
    'name' => 'variant-3',
    'access' => array(
      'plugins' => array(
        0 => array(
          'name' => 'term_vocabulary',
          'settings' => array(
            'machine_name' => array(
              'os2web_taxonomies_tax_places' => 'os2web_taxonomies_tax_places',
            ),
          ),
          'context' => 'argument_term_1',
          'not' => FALSE,
        ),
        1 => array(
          'name' => 'entity_field_value:taxonomy_term:os2web_taxonomies_tax_places:field_os2web_taxonomies_disp_var',
          'settings' => array(
            'field_os2web_taxonomies_disp_var' => array(
              'und' => array(
                0 => array(
                  'value' => 'var3',
                ),
              ),
            ),
            'field_os2web_taxonomies_disp_var_value' => array(
              0 => 'var3',
            ),
          ),
          'context' => 'argument_term_1',
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
      'footer' => NULL,
      'top' => NULL,
      'sidebar-left' => NULL,
      'sidebar-right' => NULL,
    ),
  );
  $display->cache = array();
  $display->title = '';
  $display->uuid = '91fd3681-cf5c-4cd6-8e20-783adb5f3b7f';
  $display->content = array();
  $display->panels = array();
    $pane = new stdClass();
    $pane->pid = 'new-e66073e8-ae26-4ebc-a5ec-10261eb60d34';
    $pane->panel = 'content';
    $pane->type = 'term_list';
    $pane->subtype = 'term_list';
    $pane->shown = TRUE;
    $pane->access = array();
    $pane->configuration = array(
      'title' => NULL,
      'type' => 'child',
      'include_current_term' => 0,
      'list_type' => 'ol',
      'path' => 'taxonomy/term',
      'context' => 'argument_term_1',
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
    $pane->uuid = 'e66073e8-ae26-4ebc-a5ec-10261eb60d34';
    $display->content['new-e66073e8-ae26-4ebc-a5ec-10261eb60d34'] = $pane;
    $display->panels['content'][0] = 'new-e66073e8-ae26-4ebc-a5ec-10261eb60d34';
    $pane = new stdClass();
    $pane->pid = 'new-813b8640-4929-41aa-bb34-4d5f76d1e350';
    $pane->panel = 'top';
    $pane->type = 'term_name';
    $pane->subtype = 'term_name';
    $pane->shown = TRUE;
    $pane->access = array();
    $pane->configuration = array(
      'link' => 0,
      'markup' => 'h1',
      'id' => '',
      'class' => '',
      'context' => 'argument_term_1',
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
    $pane->uuid = '813b8640-4929-41aa-bb34-4d5f76d1e350';
    $display->content['new-813b8640-4929-41aa-bb34-4d5f76d1e350'] = $pane;
    $display->panels['top'][0] = 'new-813b8640-4929-41aa-bb34-4d5f76d1e350';
  $display->hide_title = PANELS_TITLE_FIXED;
  $display->title_pane = '0';
  $handler->conf['display'] = $display;
  $export['term_view__variant-3'] = $handler;

  $handler = new stdClass();
  $handler->disabled = FALSE; /* Edit this to true to make a default handler disabled initially */
  $handler->api_version = 1;
  $handler->name = 'term_view__variant-4';
  $handler->task = 'term_view';
  $handler->subtask = '';
  $handler->handler = 'panel_context';
  $handler->weight = 4;
  $handler->conf = array(
    'title' => 'Variant 4',
    'no_blocks' => 0,
    'pipeline' => 'standard',
    'body_classes_to_remove' => '',
    'body_classes_to_add' => 'var4',
    'css_id' => '',
    'css' => '',
    'contexts' => array(),
    'relationships' => array(),
    'name' => 'variant-4',
    'access' => array(
      'plugins' => array(
        0 => array(
          'name' => 'term_vocabulary',
          'settings' => array(
            'machine_name' => array(
              'os2web_taxonomies_tax_places' => 'os2web_taxonomies_tax_places',
            ),
          ),
          'context' => 'argument_term_1',
          'not' => FALSE,
        ),
        1 => array(
          'name' => 'entity_field_value:taxonomy_term:os2web_taxonomies_tax_places:field_os2web_taxonomies_disp_var',
          'settings' => array(
            'field_os2web_taxonomies_disp_var' => array(
              'und' => array(
                0 => array(
                  'value' => 'var4',
                ),
              ),
            ),
            'field_os2web_taxonomies_disp_var_value' => array(
              0 => 'var4',
            ),
          ),
          'context' => 'argument_term_1',
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
      'footer' => NULL,
      'top' => NULL,
      'sidebar-left' => NULL,
      'sidebar-right' => NULL,
    ),
  );
  $display->cache = array();
  $display->title = '';
  $display->uuid = '91fd3681-cf5c-4cd6-8e20-783adb5f3b7f';
  $display->content = array();
  $display->panels = array();
    $pane = new stdClass();
    $pane->pid = 'new-e66073e8-ae26-4ebc-a5ec-10261eb60d34';
    $pane->panel = 'content';
    $pane->type = 'term_list';
    $pane->subtype = 'term_list';
    $pane->shown = TRUE;
    $pane->access = array();
    $pane->configuration = array(
      'title' => NULL,
      'type' => 'child',
      'include_current_term' => 0,
      'list_type' => 'ol',
      'path' => 'taxonomy/term',
      'context' => 'argument_term_1',
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
    $pane->uuid = 'e66073e8-ae26-4ebc-a5ec-10261eb60d34';
    $display->content['new-e66073e8-ae26-4ebc-a5ec-10261eb60d34'] = $pane;
    $display->panels['content'][0] = 'new-e66073e8-ae26-4ebc-a5ec-10261eb60d34';
    $pane = new stdClass();
    $pane->pid = 'new-813b8640-4929-41aa-bb34-4d5f76d1e350';
    $pane->panel = 'top';
    $pane->type = 'term_name';
    $pane->subtype = 'term_name';
    $pane->shown = TRUE;
    $pane->access = array();
    $pane->configuration = array(
      'link' => 0,
      'markup' => 'h1',
      'id' => '',
      'class' => '',
      'context' => 'argument_term_1',
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
    $pane->uuid = '813b8640-4929-41aa-bb34-4d5f76d1e350';
    $display->content['new-813b8640-4929-41aa-bb34-4d5f76d1e350'] = $pane;
    $display->panels['top'][0] = 'new-813b8640-4929-41aa-bb34-4d5f76d1e350';
  $display->hide_title = PANELS_TITLE_FIXED;
  $display->title_pane = '0';
  $handler->conf['display'] = $display;
  $export['term_view__variant-4'] = $handler;

  $handler = new stdClass();
  $handler->disabled = FALSE; /* Edit this to true to make a default handler disabled initially */
  $handler->api_version = 1;
  $handler->name = 'term_view__variant-5';
  $handler->task = 'term_view';
  $handler->subtask = '';
  $handler->handler = 'panel_context';
  $handler->weight = 5;
  $handler->conf = array(
    'title' => 'Variant 5',
    'no_blocks' => 0,
    'pipeline' => 'standard',
    'body_classes_to_remove' => '',
    'body_classes_to_add' => 'var5',
    'css_id' => '',
    'css' => '',
    'contexts' => array(),
    'relationships' => array(),
    'name' => 'variant-5',
    'access' => array(
      'plugins' => array(
        0 => array(
          'name' => 'term_vocabulary',
          'settings' => array(
            'machine_name' => array(
              'os2web_taxonomies_tax_places' => 'os2web_taxonomies_tax_places',
            ),
          ),
          'context' => 'argument_term_1',
          'not' => FALSE,
        ),
        1 => array(
          'name' => 'entity_field_value:taxonomy_term:os2web_taxonomies_tax_places:field_os2web_taxonomies_disp_var',
          'settings' => array(
            'field_os2web_taxonomies_disp_var' => array(
              'und' => array(
                0 => array(
                  'value' => 'var5',
                ),
              ),
            ),
            'field_os2web_taxonomies_disp_var_value' => array(
              0 => 'var5',
            ),
          ),
          'context' => 'argument_term_1',
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
      'footer' => NULL,
      'top' => NULL,
      'sidebar-left' => NULL,
      'sidebar-right' => NULL,
    ),
  );
  $display->cache = array();
  $display->title = '';
  $display->uuid = '91fd3681-cf5c-4cd6-8e20-783adb5f3b7f';
  $display->content = array();
  $display->panels = array();
    $pane = new stdClass();
    $pane->pid = 'new-e66073e8-ae26-4ebc-a5ec-10261eb60d34';
    $pane->panel = 'content';
    $pane->type = 'term_list';
    $pane->subtype = 'term_list';
    $pane->shown = TRUE;
    $pane->access = array();
    $pane->configuration = array(
      'title' => NULL,
      'type' => 'child',
      'include_current_term' => 0,
      'list_type' => 'ol',
      'path' => 'taxonomy/term',
      'context' => 'argument_term_1',
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
    $pane->uuid = 'e66073e8-ae26-4ebc-a5ec-10261eb60d34';
    $display->content['new-e66073e8-ae26-4ebc-a5ec-10261eb60d34'] = $pane;
    $display->panels['content'][0] = 'new-e66073e8-ae26-4ebc-a5ec-10261eb60d34';
    $pane = new stdClass();
    $pane->pid = 'new-813b8640-4929-41aa-bb34-4d5f76d1e350';
    $pane->panel = 'top';
    $pane->type = 'term_name';
    $pane->subtype = 'term_name';
    $pane->shown = TRUE;
    $pane->access = array();
    $pane->configuration = array(
      'link' => 0,
      'markup' => 'h1',
      'id' => '',
      'class' => '',
      'context' => 'argument_term_1',
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
    $pane->uuid = '813b8640-4929-41aa-bb34-4d5f76d1e350';
    $display->content['new-813b8640-4929-41aa-bb34-4d5f76d1e350'] = $pane;
    $display->panels['top'][0] = 'new-813b8640-4929-41aa-bb34-4d5f76d1e350';
  $display->hide_title = PANELS_TITLE_FIXED;
  $display->title_pane = '0';
  $handler->conf['display'] = $display;
  $export['term_view__variant-5'] = $handler;

  return $export;
}
