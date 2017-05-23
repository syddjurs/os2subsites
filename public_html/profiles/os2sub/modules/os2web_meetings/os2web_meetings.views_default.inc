<?php
/**
 * @file
 * os2web_meetings.views_default.inc
 */

/**
 * Implements hook_views_default_views().
 */
function os2web_meetings_views_default_views() {
  $export = array();

  $view = new view();
  $view->name = 'os2web_meetings_future_meetings';
  $view->description = '';
  $view->tag = 'default';
  $view->base_table = 'node';
  $view->human_name = 'Kommende møder i mine udvalg';
  $view->core = 7;
  $view->api_version = '3.0';
  $view->disabled = FALSE; /* Edit this to true to make a default view disabled initially */

  /* Display: Master */
  $handler = $view->new_display('default', 'Master', 'default');
  $handler->display->display_options['title'] = 'Kommende møder i mine eller følgende udvalg';
  $handler->display->display_options['css_class'] = 'front-page-content-block';
  $handler->display->display_options['use_ajax'] = TRUE;
  $handler->display->display_options['use_more_always'] = FALSE;
  $handler->display->display_options['use_more_text'] = 'mere';
  $handler->display->display_options['access']['type'] = 'role';
  $handler->display->display_options['access']['role'] = array(
    2 => '2',
  );
  $handler->display->display_options['cache']['type'] = 'none';
  $handler->display->display_options['query']['type'] = 'views_query';
  $handler->display->display_options['query']['options']['distinct'] = TRUE;
  $handler->display->display_options['query']['options']['query_comment'] = FALSE;
  $handler->display->display_options['exposed_form']['type'] = 'basic';
  $handler->display->display_options['exposed_form']['options']['submit_button'] = 'Udfør';
  $handler->display->display_options['exposed_form']['options']['reset_button_label'] = 'Gendan';
  $handler->display->display_options['exposed_form']['options']['exposed_sorts_label'] = 'Sortér efter';
  $handler->display->display_options['exposed_form']['options']['sort_asc_label'] = 'Stigende';
  $handler->display->display_options['exposed_form']['options']['sort_desc_label'] = 'Faldende';
  $handler->display->display_options['pager']['type'] = 'some';
  $handler->display->display_options['pager']['options']['items_per_page'] = '0';
  $handler->display->display_options['pager']['options']['offset'] = '0';
  $handler->display->display_options['style_plugin'] = 'table';
  $handler->display->display_options['style_options']['columns'] = array(
    'nid' => 'nid',
    'field_os2web_meetings_status' => 'field_os2web_meetings_status',
    'title' => 'title',
    'php' => 'title',
    'field_os2web_meetings_date' => 'field_os2web_meetings_date',
    'field_os2web_meetings_location' => 'field_os2web_meetings_location',
    'field_os2web_meetings_committee' => 'field_os2web_meetings_committee',
  );
  $handler->display->display_options['style_options']['default'] = '-1';
  $handler->display->display_options['style_options']['info'] = array(
    'nid' => array(
      'sortable' => 0,
      'default_sort_order' => 'asc',
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
    'field_os2web_meetings_status' => array(
      'sortable' => 0,
      'default_sort_order' => 'asc',
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
    'title' => array(
      'sortable' => 0,
      'default_sort_order' => 'asc',
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
    'php' => array(
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
    'field_os2web_meetings_date' => array(
      'sortable' => 0,
      'default_sort_order' => 'asc',
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
    'field_os2web_meetings_location' => array(
      'sortable' => 0,
      'default_sort_order' => 'asc',
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
    'field_os2web_meetings_committee' => array(
      'sortable' => 0,
      'default_sort_order' => 'asc',
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
  );
  /* Header: Global: Text area */
  $handler->display->display_options['header']['area']['id'] = 'area';
  $handler->display->display_options['header']['area']['table'] = 'views';
  $handler->display->display_options['header']['area']['field'] = 'area';
  $handler->display->display_options['header']['area']['empty'] = TRUE;
  $handler->display->display_options['header']['area']['content'] = '<div class="help-button" title="Help text goes here"></div>';
  $handler->display->display_options['header']['area']['format'] = 'full_html';
  /* Relationship: Indholdselement: Committee (field_os2web_meetings_committee) */
  $handler->display->display_options['relationships']['field_os2web_meetings_committee_tid']['id'] = 'field_os2web_meetings_committee_tid';
  $handler->display->display_options['relationships']['field_os2web_meetings_committee_tid']['table'] = 'field_data_field_os2web_meetings_committee';
  $handler->display->display_options['relationships']['field_os2web_meetings_committee_tid']['field'] = 'field_os2web_meetings_committee_tid';
  /* Relationship: Broken/missing handler */
  $handler->display->display_options['relationships']['reverse_field_user_committee_user']['id'] = 'reverse_field_user_committee_user';
  $handler->display->display_options['relationships']['reverse_field_user_committee_user']['table'] = 'taxonomy_term_data';
  $handler->display->display_options['relationships']['reverse_field_user_committee_user']['field'] = 'reverse_field_user_committee_user';
  $handler->display->display_options['relationships']['reverse_field_user_committee_user']['relationship'] = 'field_os2web_meetings_committee_tid';
  /* Relationship: Broken/missing handler */
  $handler->display->display_options['relationships']['reverse_field_follows_committee_user']['id'] = 'reverse_field_follows_committee_user';
  $handler->display->display_options['relationships']['reverse_field_follows_committee_user']['table'] = 'taxonomy_term_data';
  $handler->display->display_options['relationships']['reverse_field_follows_committee_user']['field'] = 'reverse_field_follows_committee_user';
  $handler->display->display_options['relationships']['reverse_field_follows_committee_user']['relationship'] = 'field_os2web_meetings_committee_tid';
  /* Field: nid hidden */
  $handler->display->display_options['fields']['nid']['id'] = 'nid';
  $handler->display->display_options['fields']['nid']['table'] = 'node';
  $handler->display->display_options['fields']['nid']['field'] = 'nid';
  $handler->display->display_options['fields']['nid']['ui_name'] = 'nid hidden';
  $handler->display->display_options['fields']['nid']['label'] = '';
  $handler->display->display_options['fields']['nid']['exclude'] = TRUE;
  $handler->display->display_options['fields']['nid']['element_label_colon'] = FALSE;
  /* Field: Indholdselement: Status */
  $handler->display->display_options['fields']['field_os2web_meetings_status']['id'] = 'field_os2web_meetings_status';
  $handler->display->display_options['fields']['field_os2web_meetings_status']['table'] = 'field_data_field_os2web_meetings_status';
  $handler->display->display_options['fields']['field_os2web_meetings_status']['field'] = 'field_os2web_meetings_status';
  $handler->display->display_options['fields']['field_os2web_meetings_status']['alter']['alter_text'] = TRUE;
  $handler->display->display_options['fields']['field_os2web_meetings_status']['alter']['text'] = '<a href="google.com"></a>';
  $handler->display->display_options['fields']['field_os2web_meetings_status']['alter']['make_link'] = TRUE;
  $handler->display->display_options['fields']['field_os2web_meetings_status']['alter']['path'] = 'os2web_meetings_meeting/[nid]';
  $handler->display->display_options['fields']['field_os2web_meetings_status']['empty'] = '<a href="google.com"></a>';
  $handler->display->display_options['fields']['field_os2web_meetings_status']['hide_alter_empty'] = FALSE;
  /* Field: Content: Title */
  $handler->display->display_options['fields']['title']['id'] = 'title';
  $handler->display->display_options['fields']['title']['table'] = 'node';
  $handler->display->display_options['fields']['title']['field'] = 'title';
  $handler->display->display_options['fields']['title']['alter']['make_link'] = TRUE;
  $handler->display->display_options['fields']['title']['alter']['path'] = 'os2web_meetings_meeting/[nid]';
  $handler->display->display_options['fields']['title']['link_to_node'] = FALSE;
  /* Field: indicator - has notes */
  $handler->display->display_options['fields']['php']['id'] = 'php';
  $handler->display->display_options['fields']['php']['table'] = 'views';
  $handler->display->display_options['fields']['php']['field'] = 'php';
  $handler->display->display_options['fields']['php']['ui_name'] = 'indicator - has notes';
  $handler->display->display_options['fields']['php']['label'] = '';
  $handler->display->display_options['fields']['php']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['php']['use_php_setup'] = 0;
  $handler->display->display_options['fields']['php']['php_output'] = '<?php
$annotations = annotator_get_notes_by_meeting_id($row->nid);
if (!empty($annotations))
print("<div class=\\"indicator-has-notes\\"></div>");
?>';
  $handler->display->display_options['fields']['php']['use_php_click_sortable'] = '0';
  $handler->display->display_options['fields']['php']['php_click_sortable'] = '';
  /* Field: Indholdselement: Date */
  $handler->display->display_options['fields']['field_os2web_meetings_date']['id'] = 'field_os2web_meetings_date';
  $handler->display->display_options['fields']['field_os2web_meetings_date']['table'] = 'field_data_field_os2web_meetings_date';
  $handler->display->display_options['fields']['field_os2web_meetings_date']['field'] = 'field_os2web_meetings_date';
  $handler->display->display_options['fields']['field_os2web_meetings_date']['label'] = 'Dato';
  $handler->display->display_options['fields']['field_os2web_meetings_date']['alter']['path'] = 'os2web_meetings_meeting/[nid]';
  $handler->display->display_options['fields']['field_os2web_meetings_date']['settings'] = array(
    'format_type' => 'short',
    'fromto' => 'value',
    'multiple_number' => '',
    'multiple_from' => '',
    'multiple_to' => '',
  );
  /* Field: Indholdselement: Lokation */
  $handler->display->display_options['fields']['field_os2web_meetings_location']['id'] = 'field_os2web_meetings_location';
  $handler->display->display_options['fields']['field_os2web_meetings_location']['table'] = 'field_data_field_os2web_meetings_location';
  $handler->display->display_options['fields']['field_os2web_meetings_location']['field'] = 'field_os2web_meetings_location';
  $handler->display->display_options['fields']['field_os2web_meetings_location']['alter']['path'] = 'os2web_meetings_meeting/[nid]';
  $handler->display->display_options['fields']['field_os2web_meetings_location']['type'] = 'taxonomy_term_reference_plain';
  /* Field: Indholdselement: Committee */
  $handler->display->display_options['fields']['field_os2web_meetings_committee']['id'] = 'field_os2web_meetings_committee';
  $handler->display->display_options['fields']['field_os2web_meetings_committee']['table'] = 'field_data_field_os2web_meetings_committee';
  $handler->display->display_options['fields']['field_os2web_meetings_committee']['field'] = 'field_os2web_meetings_committee';
  $handler->display->display_options['fields']['field_os2web_meetings_committee']['label'] = 'Udvalg';
  $handler->display->display_options['fields']['field_os2web_meetings_committee']['alter']['path'] = 'os2web_meetings_meeting/[nid]';
  $handler->display->display_options['fields']['field_os2web_meetings_committee']['type'] = 'taxonomy_term_reference_plain';
  /* Sort criterion: Indholdselement: Date -  start date (field_os2web_meetings_date) */
  $handler->display->display_options['sorts']['field_os2web_meetings_date_value']['id'] = 'field_os2web_meetings_date_value';
  $handler->display->display_options['sorts']['field_os2web_meetings_date_value']['table'] = 'field_data_field_os2web_meetings_date';
  $handler->display->display_options['sorts']['field_os2web_meetings_date_value']['field'] = 'field_os2web_meetings_date_value';
  $handler->display->display_options['sorts']['field_os2web_meetings_date_value']['expose']['label'] = 'Start dato';
  $handler->display->display_options['filter_groups']['groups'] = array(
    1 => 'AND',
    2 => 'OR',
  );
  /* Filter criterion: Content: Published */
  $handler->display->display_options['filters']['status']['id'] = 'status';
  $handler->display->display_options['filters']['status']['table'] = 'node';
  $handler->display->display_options['filters']['status']['field'] = 'status';
  $handler->display->display_options['filters']['status']['value'] = 1;
  $handler->display->display_options['filters']['status']['group'] = 1;
  $handler->display->display_options['filters']['status']['expose']['operator'] = FALSE;
  /* Filter criterion: Content: Type */
  $handler->display->display_options['filters']['type']['id'] = 'type';
  $handler->display->display_options['filters']['type']['table'] = 'node';
  $handler->display->display_options['filters']['type']['field'] = 'type';
  $handler->display->display_options['filters']['type']['value'] = array(
    'os2web_meetings_meeting' => 'os2web_meetings_meeting',
  );
  $handler->display->display_options['filters']['type']['group'] = 1;
  /* Filter criterion: User: Current */
  $handler->display->display_options['filters']['uid_current']['id'] = 'uid_current';
  $handler->display->display_options['filters']['uid_current']['table'] = 'users';
  $handler->display->display_options['filters']['uid_current']['field'] = 'uid_current';
  $handler->display->display_options['filters']['uid_current']['relationship'] = 'reverse_field_user_committee_user';
  $handler->display->display_options['filters']['uid_current']['value'] = '1';
  $handler->display->display_options['filters']['uid_current']['group'] = 2;
  /* Filter criterion: User: Current */
  $handler->display->display_options['filters']['uid_current_1']['id'] = 'uid_current_1';
  $handler->display->display_options['filters']['uid_current_1']['table'] = 'users';
  $handler->display->display_options['filters']['uid_current_1']['field'] = 'uid_current';
  $handler->display->display_options['filters']['uid_current_1']['relationship'] = 'reverse_field_follows_committee_user';
  $handler->display->display_options['filters']['uid_current_1']['value'] = '1';
  $handler->display->display_options['filters']['uid_current_1']['group'] = 2;

  /* Display: Block */
  $handler = $view->new_display('block', 'Block', 'block');
  $handler->display->display_options['defaults']['hide_admin_links'] = FALSE;
  $handler->display->display_options['block_description'] = 'coming_meetings_my_committee';
  $translatables['os2web_meetings_future_meetings'] = array(
    t('Master'),
    t('Kommende møder i mine eller følgende udvalg'),
    t('mere'),
    t('Udfør'),
    t('Gendan'),
    t('Sortér efter'),
    t('Stigende'),
    t('Faldende'),
    t('<div class="help-button" title="Help text goes here"></div>'),
    t('term from field_os2web_meetings_committee'),
    t('reverse_field_user_committee_user'),
    t('reverse_field_follows_committee_user'),
    t('Status'),
    t('<a href="google.com"></a>'),
    t('Title'),
    t('Dato'),
    t('Lokation'),
    t('Udvalg'),
    t('Start dato'),
    t('Block'),
    t('more'),
    t('coming_meetings_my_committee'),
  );
  $export['os2web_meetings_future_meetings'] = $view;

  $view = new view();
  $view->name = 'os2web_meetings_meeting_details';
  $view->description = '';
  $view->tag = 'default';
  $view->base_table = 'node';
  $view->human_name = 'Meeting details';
  $view->core = 7;
  $view->api_version = '3.0';
  $view->disabled = FALSE; /* Edit this to true to make a default view disabled initially */

  /* Display: Master */
  $handler = $view->new_display('default', 'Master', 'default');
  $handler->display->display_options['title'] = 'Mødedetaljer';
  $handler->display->display_options['css_class'] = 'bullet-point-attachments';
  $handler->display->display_options['use_more_always'] = FALSE;
  $handler->display->display_options['use_more_text'] = 'mere';
  $handler->display->display_options['access']['type'] = 'none';
  $handler->display->display_options['cache']['type'] = 'time';
  $handler->display->display_options['cache']['results_lifespan'] = '1800';
  $handler->display->display_options['cache']['results_lifespan_custom'] = '0';
  $handler->display->display_options['cache']['output_lifespan'] = '1800';
  $handler->display->display_options['cache']['output_lifespan_custom'] = '0';
  $handler->display->display_options['query']['type'] = 'views_query';
  $handler->display->display_options['query']['options']['query_comment'] = FALSE;
  $handler->display->display_options['exposed_form']['type'] = 'basic';
  $handler->display->display_options['exposed_form']['options']['submit_button'] = 'Udfør';
  $handler->display->display_options['exposed_form']['options']['reset_button_label'] = 'Gendan';
  $handler->display->display_options['exposed_form']['options']['exposed_sorts_label'] = 'Sortér efter';
  $handler->display->display_options['exposed_form']['options']['sort_asc_label'] = 'Stigende';
  $handler->display->display_options['exposed_form']['options']['sort_desc_label'] = 'Faldende';
  $handler->display->display_options['pager']['type'] = 'none';
  $handler->display->display_options['pager']['options']['offset'] = '0';
  $handler->display->display_options['style_plugin'] = 'table';
  $handler->display->display_options['style_options']['columns'] = array(
    'nid' => 'nid',
    'field_os2web_meetings_committee' => 'field_os2web_meetings_committee',
    'field_os2web_meetings_date' => 'field_os2web_meetings_date',
    'field_os2web_meetings_location' => 'field_os2web_meetings_location',
  );
  $handler->display->display_options['style_options']['default'] = '-1';
  $handler->display->display_options['style_options']['info'] = array(
    'nid' => array(
      'sortable' => 0,
      'default_sort_order' => 'asc',
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
    'field_os2web_meetings_committee' => array(
      'sortable' => 0,
      'default_sort_order' => 'asc',
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
    'field_os2web_meetings_date' => array(
      'sortable' => 0,
      'default_sort_order' => 'asc',
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
    'field_os2web_meetings_location' => array(
      'sortable' => 0,
      'default_sort_order' => 'asc',
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
  );
  /* No results behavior: Global: Text area */
  $handler->display->display_options['empty']['area']['id'] = 'area';
  $handler->display->display_options['empty']['area']['table'] = 'views';
  $handler->display->display_options['empty']['area']['field'] = 'area';
  $handler->display->display_options['empty']['area']['format'] = 'filtered_html';
  /* Relationship: Entity Reference: Referenced Entity */
  $handler->display->display_options['relationships']['field_os2web_meetings_bullets_target_id']['id'] = 'field_os2web_meetings_bullets_target_id';
  $handler->display->display_options['relationships']['field_os2web_meetings_bullets_target_id']['table'] = 'field_data_field_os2web_meetings_bullets';
  $handler->display->display_options['relationships']['field_os2web_meetings_bullets_target_id']['field'] = 'field_os2web_meetings_bullets_target_id';
  $handler->display->display_options['relationships']['field_os2web_meetings_bullets_target_id']['label'] = 'Meetings bullet points';
  $handler->display->display_options['relationships']['field_os2web_meetings_bullets_target_id']['required'] = TRUE;
  /* Relationship: Entity Reference: Referenced Entity */
  $handler->display->display_options['relationships']['field_os2web_meetings_attach_target_id']['id'] = 'field_os2web_meetings_attach_target_id';
  $handler->display->display_options['relationships']['field_os2web_meetings_attach_target_id']['table'] = 'field_data_field_os2web_meetings_attach';
  $handler->display->display_options['relationships']['field_os2web_meetings_attach_target_id']['field'] = 'field_os2web_meetings_attach_target_id';
  $handler->display->display_options['relationships']['field_os2web_meetings_attach_target_id']['relationship'] = 'field_os2web_meetings_bullets_target_id';
  $handler->display->display_options['relationships']['field_os2web_meetings_attach_target_id']['label'] = 'bullet point attachments';
  /* Field: Content: Title */
  $handler->display->display_options['fields']['title']['id'] = 'title';
  $handler->display->display_options['fields']['title']['table'] = 'node';
  $handler->display->display_options['fields']['title']['field'] = 'title';
  $handler->display->display_options['fields']['title']['relationship'] = 'relation_contains_node';
  $handler->display->display_options['fields']['title']['label'] = '';
  $handler->display->display_options['fields']['title']['alter']['word_boundary'] = FALSE;
  $handler->display->display_options['fields']['title']['alter']['ellipsis'] = FALSE;
  $handler->display->display_options['fields']['title']['element_label_colon'] = FALSE;
  /* Field: Content: Delete link */
  $handler->display->display_options['fields']['delete_node']['id'] = 'delete_node';
  $handler->display->display_options['fields']['delete_node']['table'] = 'views_entity_node';
  $handler->display->display_options['fields']['delete_node']['field'] = 'delete_node';
  $handler->display->display_options['fields']['delete_node']['relationship'] = 'reverse_field_os2web_meetings_addendum_node';
  $handler->display->display_options['fields']['delete_node']['label'] = 'Slet';
  /* Sort criterion: Content: Post date */
  $handler->display->display_options['sorts']['created']['id'] = 'created';
  $handler->display->display_options['sorts']['created']['table'] = 'node';
  $handler->display->display_options['sorts']['created']['field'] = 'created';
  $handler->display->display_options['sorts']['created']['order'] = 'DESC';
  /* Contextual filter: Content: Nid */
  $handler->display->display_options['arguments']['nid']['id'] = 'nid';
  $handler->display->display_options['arguments']['nid']['table'] = 'node';
  $handler->display->display_options['arguments']['nid']['field'] = 'nid';
  $handler->display->display_options['arguments']['nid']['default_action'] = 'default';
  $handler->display->display_options['arguments']['nid']['exception']['title'] = 'Alle';
  $handler->display->display_options['arguments']['nid']['default_argument_type'] = 'raw';
  $handler->display->display_options['arguments']['nid']['default_argument_options']['index'] = '1';
  $handler->display->display_options['arguments']['nid']['summary']['number_of_records'] = '0';
  $handler->display->display_options['arguments']['nid']['summary']['format'] = 'default_summary';
  $handler->display->display_options['arguments']['nid']['summary_options']['items_per_page'] = '25';
  $handler->display->display_options['arguments']['nid']['specify_validation'] = TRUE;
  $handler->display->display_options['arguments']['nid']['validate']['type'] = 'node';
  $handler->display->display_options['arguments']['nid']['validate_options']['types'] = array(
    'os2web_meetings_meeting' => 'os2web_meetings_meeting',
  );
  $handler->display->display_options['filter_groups']['groups'] = array(
    1 => 'AND',
    2 => 'OR',
  );
  /* Filter criterion: Content: Published */
  $handler->display->display_options['filters']['status']['id'] = 'status';
  $handler->display->display_options['filters']['status']['table'] = 'node';
  $handler->display->display_options['filters']['status']['field'] = 'status';
  $handler->display->display_options['filters']['status']['value'] = 1;
  $handler->display->display_options['filters']['status']['group'] = 1;
  $handler->display->display_options['filters']['status']['expose']['operator'] = FALSE;
  /* Filter criterion: Content: Type */
  $handler->display->display_options['filters']['type']['id'] = 'type';
  $handler->display->display_options['filters']['type']['table'] = 'node';
  $handler->display->display_options['filters']['type']['field'] = 'type';
  $handler->display->display_options['filters']['type']['value'] = array(
    'os2web_meetings_meeting' => 'os2web_meetings_meeting',
  );
  /* Filter criterion: Global: Combine fields filter */
  $handler->display->display_options['filters']['combine']['id'] = 'combine';
  $handler->display->display_options['filters']['combine']['table'] = 'views';
  $handler->display->display_options['filters']['combine']['field'] = 'combine';

  /* Display: Page */
  $handler = $view->new_display('page', 'Page', 'page');
  $handler->display->display_options['defaults']['css_class'] = FALSE;
  $handler->display->display_options['defaults']['hide_admin_links'] = FALSE;
  $handler->display->display_options['defaults']['relationships'] = FALSE;
  $handler->display->display_options['defaults']['fields'] = FALSE;
  /* Field: Content: Nid */
  $handler->display->display_options['fields']['nid']['id'] = 'nid';
  $handler->display->display_options['fields']['nid']['table'] = 'node';
  $handler->display->display_options['fields']['nid']['field'] = 'nid';
  $handler->display->display_options['fields']['nid']['label'] = '';
  $handler->display->display_options['fields']['nid']['exclude'] = TRUE;
  $handler->display->display_options['fields']['nid']['element_label_colon'] = FALSE;
  /* Field: Content: Title */
  $handler->display->display_options['fields']['title']['id'] = 'title';
  $handler->display->display_options['fields']['title']['table'] = 'node';
  $handler->display->display_options['fields']['title']['field'] = 'title';
  $handler->display->display_options['fields']['title']['exclude'] = TRUE;
  $handler->display->display_options['fields']['title']['alter']['word_boundary'] = FALSE;
  $handler->display->display_options['fields']['title']['alter']['ellipsis'] = FALSE;
  $handler->display->display_options['fields']['title']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['title']['link_to_node'] = FALSE;
  /* Field: Indholdselement: Committee */
  $handler->display->display_options['fields']['field_os2web_meetings_committee']['id'] = 'field_os2web_meetings_committee';
  $handler->display->display_options['fields']['field_os2web_meetings_committee']['table'] = 'field_data_field_os2web_meetings_committee';
  $handler->display->display_options['fields']['field_os2web_meetings_committee']['field'] = 'field_os2web_meetings_committee';
  $handler->display->display_options['fields']['field_os2web_meetings_committee']['label'] = 'Udvalg';
  $handler->display->display_options['fields']['field_os2web_meetings_committee']['type'] = 'taxonomy_term_reference_plain';
  /* Field: Indholdselement: Date */
  $handler->display->display_options['fields']['field_os2web_meetings_date']['id'] = 'field_os2web_meetings_date';
  $handler->display->display_options['fields']['field_os2web_meetings_date']['table'] = 'field_data_field_os2web_meetings_date';
  $handler->display->display_options['fields']['field_os2web_meetings_date']['field'] = 'field_os2web_meetings_date';
  $handler->display->display_options['fields']['field_os2web_meetings_date']['label'] = 'Dato';
  $handler->display->display_options['fields']['field_os2web_meetings_date']['settings'] = array(
    'format_type' => 'short',
    'fromto' => 'value',
    'multiple_number' => '',
    'multiple_from' => '',
    'multiple_to' => '',
  );
  /* Field: Indholdselement: Date */
  $handler->display->display_options['fields']['field_os2web_meetings_date_1']['id'] = 'field_os2web_meetings_date_1';
  $handler->display->display_options['fields']['field_os2web_meetings_date_1']['table'] = 'field_data_field_os2web_meetings_date';
  $handler->display->display_options['fields']['field_os2web_meetings_date_1']['field'] = 'field_os2web_meetings_date';
  $handler->display->display_options['fields']['field_os2web_meetings_date_1']['label'] = 'Slut Dato';
  $handler->display->display_options['fields']['field_os2web_meetings_date_1']['exclude'] = TRUE;
  $handler->display->display_options['fields']['field_os2web_meetings_date_1']['settings'] = array(
    'format_type' => 'short',
    'fromto' => 'value2',
    'multiple_number' => '',
    'multiple_from' => '',
    'multiple_to' => '',
  );
  /* Field: Indholdselement: Lokation */
  $handler->display->display_options['fields']['field_os2web_meetings_location']['id'] = 'field_os2web_meetings_location';
  $handler->display->display_options['fields']['field_os2web_meetings_location']['table'] = 'field_data_field_os2web_meetings_location';
  $handler->display->display_options['fields']['field_os2web_meetings_location']['field'] = 'field_os2web_meetings_location';
  $handler->display->display_options['fields']['field_os2web_meetings_location']['label'] = 'Lokationen';
  $handler->display->display_options['fields']['field_os2web_meetings_location']['exclude'] = TRUE;
  $handler->display->display_options['fields']['field_os2web_meetings_location']['type'] = 'taxonomy_term_reference_plain';
  /* Field: Indholdselement: Type */
  $handler->display->display_options['fields']['field_os2web_meetings_type']['id'] = 'field_os2web_meetings_type';
  $handler->display->display_options['fields']['field_os2web_meetings_type']['table'] = 'field_data_field_os2web_meetings_type';
  $handler->display->display_options['fields']['field_os2web_meetings_type']['field'] = 'field_os2web_meetings_type';
  /* Field: Indholdselement: Full doc */
  $handler->display->display_options['fields']['field_os2web_meetings_full_doc']['id'] = 'field_os2web_meetings_full_doc';
  $handler->display->display_options['fields']['field_os2web_meetings_full_doc']['table'] = 'field_data_field_os2web_meetings_full_doc';
  $handler->display->display_options['fields']['field_os2web_meetings_full_doc']['field'] = 'field_os2web_meetings_full_doc';
  $handler->display->display_options['fields']['field_os2web_meetings_full_doc']['label'] = 'Hent';
  $handler->display->display_options['fields']['field_os2web_meetings_full_doc']['alter']['alter_text'] = TRUE;
  $handler->display->display_options['fields']['field_os2web_meetings_full_doc']['alter']['text'] = 'Samlet dokument';
  $handler->display->display_options['fields']['field_os2web_meetings_full_doc']['alter']['make_link'] = TRUE;
  $handler->display->display_options['fields']['field_os2web_meetings_full_doc']['alter']['path'] = '[field_os2web_meetings_full_doc]';
  $handler->display->display_options['fields']['field_os2web_meetings_full_doc']['alter']['external'] = TRUE;
  $handler->display->display_options['fields']['field_os2web_meetings_full_doc']['alter']['alt'] = 'Download hele referatet som samlet dokument';
  $handler->display->display_options['fields']['field_os2web_meetings_full_doc']['click_sort_column'] = 'fid';
  $handler->display->display_options['fields']['field_os2web_meetings_full_doc']['type'] = 'file_url_plain';
  $handler->display->display_options['defaults']['filter_groups'] = FALSE;
  $handler->display->display_options['filter_groups']['groups'] = array(
    1 => 'AND',
    2 => 'OR',
  );
  $handler->display->display_options['defaults']['filters'] = FALSE;
  /* Filter criterion: Content: Published */
  $handler->display->display_options['filters']['status']['id'] = 'status';
  $handler->display->display_options['filters']['status']['table'] = 'node';
  $handler->display->display_options['filters']['status']['field'] = 'status';
  $handler->display->display_options['filters']['status']['value'] = 1;
  $handler->display->display_options['filters']['status']['group'] = 1;
  $handler->display->display_options['filters']['status']['expose']['operator'] = FALSE;
  /* Filter criterion: Content: Type */
  $handler->display->display_options['filters']['type']['id'] = 'type';
  $handler->display->display_options['filters']['type']['table'] = 'node';
  $handler->display->display_options['filters']['type']['field'] = 'type';
  $handler->display->display_options['filters']['type']['value'] = array(
    'os2web_meetings_meeting' => 'os2web_meetings_meeting',
  );
  $handler->display->display_options['path'] = 'os2web_meetings_meeting/%';

  /* Display: Video */
  $handler = $view->new_display('attachment', 'Video', 'attachment_1');
  $handler->display->display_options['display_description'] = 'Video for mødet';
  $handler->display->display_options['defaults']['hide_admin_links'] = FALSE;
  $handler->display->display_options['pager']['type'] = 'some';
  $handler->display->display_options['defaults']['header'] = FALSE;
  /* Header: Global: Text area */
  $handler->display->display_options['header']['area']['id'] = 'area';
  $handler->display->display_options['header']['area']['table'] = 'views';
  $handler->display->display_options['header']['area']['field'] = 'area';
  $handler->display->display_options['header']['area']['content'] = '<h2 class="pane-title">Video fra mødet</h2>';
  $handler->display->display_options['header']['area']['format'] = 'php_code';
  $handler->display->display_options['defaults']['empty'] = FALSE;
  $handler->display->display_options['defaults']['relationships'] = FALSE;
  $handler->display->display_options['defaults']['fields'] = FALSE;
  /* Field: Indholdselement: NNTV ref */
  $handler->display->display_options['fields']['field_os2web_meetings_nntv_ref']['id'] = 'field_os2web_meetings_nntv_ref';
  $handler->display->display_options['fields']['field_os2web_meetings_nntv_ref']['table'] = 'field_data_field_os2web_meetings_nntv_ref';
  $handler->display->display_options['fields']['field_os2web_meetings_nntv_ref']['field'] = 'field_os2web_meetings_nntv_ref';
  $handler->display->display_options['fields']['field_os2web_meetings_nntv_ref']['label'] = '';
  $handler->display->display_options['fields']['field_os2web_meetings_nntv_ref']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_os2web_meetings_nntv_ref']['click_sort_column'] = 'seek';
  $handler->display->display_options['defaults']['filter_groups'] = FALSE;
  $handler->display->display_options['filter_groups']['groups'] = array(
    1 => 'AND',
    2 => 'OR',
  );
  $handler->display->display_options['defaults']['filters'] = FALSE;
  /* Filter criterion: Content: Published */
  $handler->display->display_options['filters']['status']['id'] = 'status';
  $handler->display->display_options['filters']['status']['table'] = 'node';
  $handler->display->display_options['filters']['status']['field'] = 'status';
  $handler->display->display_options['filters']['status']['value'] = 1;
  $handler->display->display_options['filters']['status']['group'] = 1;
  $handler->display->display_options['filters']['status']['expose']['operator'] = FALSE;
  /* Filter criterion: Content: Type */
  $handler->display->display_options['filters']['type']['id'] = 'type';
  $handler->display->display_options['filters']['type']['table'] = 'node';
  $handler->display->display_options['filters']['type']['field'] = 'type';
  $handler->display->display_options['filters']['type']['value'] = array(
    'os2web_meetings_meeting' => 'os2web_meetings_meeting',
  );
  $handler->display->display_options['filters']['type']['group'] = 1;
  /* Filter criterion: Indholdselement: NNTV ref (field_os2web_meetings_nntv_ref:id) */
  $handler->display->display_options['filters']['field_os2web_meetings_nntv_ref_id']['id'] = 'field_os2web_meetings_nntv_ref_id';
  $handler->display->display_options['filters']['field_os2web_meetings_nntv_ref_id']['table'] = 'field_data_field_os2web_meetings_nntv_ref';
  $handler->display->display_options['filters']['field_os2web_meetings_nntv_ref_id']['field'] = 'field_os2web_meetings_nntv_ref_id';
  $handler->display->display_options['filters']['field_os2web_meetings_nntv_ref_id']['operator'] = 'not empty';
  $handler->display->display_options['filters']['field_os2web_meetings_nntv_ref_id']['group'] = 2;
  $handler->display->display_options['displays'] = array(
    'page' => 'page',
    'default' => 0,
  );
  $handler->display->display_options['attachment_position'] = 'after';

  /* Display: Bullet points */
  $handler = $view->new_display('attachment', 'Bullet points', 'attachment_2');
  $handler->display->display_options['defaults']['hide_admin_links'] = FALSE;
  $handler->display->display_options['pager']['type'] = 'some';
  $handler->display->display_options['pager']['options']['items_per_page'] = '0';
  $handler->display->display_options['pager']['options']['offset'] = '0';
  $handler->display->display_options['defaults']['style_plugin'] = FALSE;
  $handler->display->display_options['style_plugin'] = 'table';
  $handler->display->display_options['style_options']['columns'] = array(
    'nid_1' => 'nid_1',
    'nid' => 'nid',
    'field_os2web_meetings_attach' => 'title',
    'field_os2web_meetings_enclosures' => 'field_os2web_meetings_enclosures',
    'field_os2web_meetings_bul_closed' => 'field_os2web_meetings_bul_closed',
    'php' => 'php',
    'php_1' => 'php_1',
    'title' => 'title',
    'field_os2web_meetings_nntv_ref' => 'field_os2web_meetings_nntv_ref',
  );
  $handler->display->display_options['style_options']['default'] = '-1';
  $handler->display->display_options['style_options']['info'] = array(
    'nid_1' => array(
      'sortable' => 0,
      'default_sort_order' => 'asc',
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
    'nid' => array(
      'sortable' => 0,
      'default_sort_order' => 'asc',
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
    'field_os2web_meetings_attach' => array(
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
    'field_os2web_meetings_enclosures' => array(
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
    'field_os2web_meetings_bul_closed' => array(
      'sortable' => 0,
      'default_sort_order' => 'asc',
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
    'php' => array(
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
    'php_1' => array(
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
    'title' => array(
      'sortable' => 0,
      'default_sort_order' => 'asc',
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
    'field_os2web_meetings_nntv_ref' => array(
      'sortable' => 0,
      'default_sort_order' => 'asc',
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
  );
  $handler->display->display_options['defaults']['style_options'] = FALSE;
  $handler->display->display_options['defaults']['row_plugin'] = FALSE;
  $handler->display->display_options['defaults']['row_options'] = FALSE;
  $handler->display->display_options['defaults']['header'] = FALSE;
  $handler->display->display_options['defaults']['relationships'] = FALSE;
  /* Relationship: Entity Reference: Referenced Entity */
  $handler->display->display_options['relationships']['field_os2web_meetings_bullets_target_id']['id'] = 'field_os2web_meetings_bullets_target_id';
  $handler->display->display_options['relationships']['field_os2web_meetings_bullets_target_id']['table'] = 'field_data_field_os2web_meetings_bullets';
  $handler->display->display_options['relationships']['field_os2web_meetings_bullets_target_id']['field'] = 'field_os2web_meetings_bullets_target_id';
  $handler->display->display_options['relationships']['field_os2web_meetings_bullets_target_id']['required'] = TRUE;
  /* Relationship: Broken/missing handler */
  $handler->display->display_options['relationships']['reverse_field_ref_os2web_meetings_bullet_node']['id'] = 'reverse_field_ref_os2web_meetings_bullet_node';
  $handler->display->display_options['relationships']['reverse_field_ref_os2web_meetings_bullet_node']['table'] = 'node';
  $handler->display->display_options['relationships']['reverse_field_ref_os2web_meetings_bullet_node']['field'] = 'reverse_field_ref_os2web_meetings_bullet_node';
  $handler->display->display_options['relationships']['reverse_field_ref_os2web_meetings_bullet_node']['relationship'] = 'field_os2web_meetings_bullets_target_id';
  $handler->display->display_options['relationships']['reverse_field_ref_os2web_meetings_bullet_node']['label'] = 'bullet point speaking paper';
  $handler->display->display_options['defaults']['fields'] = FALSE;
  /* Field: Meeting id - hidden */
  $handler->display->display_options['fields']['nid_1']['id'] = 'nid_1';
  $handler->display->display_options['fields']['nid_1']['table'] = 'node';
  $handler->display->display_options['fields']['nid_1']['field'] = 'nid';
  $handler->display->display_options['fields']['nid_1']['ui_name'] = 'Meeting id - hidden';
  $handler->display->display_options['fields']['nid_1']['label'] = '';
  $handler->display->display_options['fields']['nid_1']['exclude'] = TRUE;
  $handler->display->display_options['fields']['nid_1']['element_label_colon'] = FALSE;
  /* Field: Bullet point id - hidden */
  $handler->display->display_options['fields']['nid']['id'] = 'nid';
  $handler->display->display_options['fields']['nid']['table'] = 'node';
  $handler->display->display_options['fields']['nid']['field'] = 'nid';
  $handler->display->display_options['fields']['nid']['relationship'] = 'field_os2web_meetings_bullets_target_id';
  $handler->display->display_options['fields']['nid']['ui_name'] = 'Bullet point id - hidden';
  $handler->display->display_options['fields']['nid']['label'] = '';
  $handler->display->display_options['fields']['nid']['exclude'] = TRUE;
  $handler->display->display_options['fields']['nid']['element_label_colon'] = FALSE;
  /* Field: Bullet points */
  $handler->display->display_options['fields']['field_os2web_meetings_attach']['id'] = 'field_os2web_meetings_attach';
  $handler->display->display_options['fields']['field_os2web_meetings_attach']['table'] = 'field_data_field_os2web_meetings_attach';
  $handler->display->display_options['fields']['field_os2web_meetings_attach']['field'] = 'field_os2web_meetings_attach';
  $handler->display->display_options['fields']['field_os2web_meetings_attach']['relationship'] = 'field_os2web_meetings_bullets_target_id';
  $handler->display->display_options['fields']['field_os2web_meetings_attach']['ui_name'] = 'Bullet points';
  $handler->display->display_options['fields']['field_os2web_meetings_attach']['label'] = '';
  $handler->display->display_options['fields']['field_os2web_meetings_attach']['exclude'] = TRUE;
  $handler->display->display_options['fields']['field_os2web_meetings_attach']['alter']['text'] = '[field_os2web_meetings_attach-target_id]';
  $handler->display->display_options['fields']['field_os2web_meetings_attach']['alter']['path'] = 'os2web_meetings_meeting/[nid_1]/bullet-point/[nid]/bullet-point-attachment/[field_os2web_meetings_attach-target_id]';
  $handler->display->display_options['fields']['field_os2web_meetings_attach']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_os2web_meetings_attach']['empty'] = 'Intet indhold til dette punkt.';
  $handler->display->display_options['fields']['field_os2web_meetings_attach']['type'] = 'entityreference_entity_view';
  $handler->display->display_options['fields']['field_os2web_meetings_attach']['settings'] = array(
    'view_mode' => 'os2web_meetings_meeting_detail_view',
  );
  $handler->display->display_options['fields']['field_os2web_meetings_attach']['delta_offset'] = '0';
  $handler->display->display_options['fields']['field_os2web_meetings_attach']['multi_type'] = 'ul';
  $handler->display->display_options['fields']['field_os2web_meetings_attach']['separator'] = '<br/>';
  /* Field: Indholdselement: Enclosures */
  $handler->display->display_options['fields']['field_os2web_meetings_enclosures']['id'] = 'field_os2web_meetings_enclosures';
  $handler->display->display_options['fields']['field_os2web_meetings_enclosures']['table'] = 'field_data_field_os2web_meetings_enclosures';
  $handler->display->display_options['fields']['field_os2web_meetings_enclosures']['field'] = 'field_os2web_meetings_enclosures';
  $handler->display->display_options['fields']['field_os2web_meetings_enclosures']['relationship'] = 'field_os2web_meetings_bullets_target_id';
  $handler->display->display_options['fields']['field_os2web_meetings_enclosures']['label'] = '';
  $handler->display->display_options['fields']['field_os2web_meetings_enclosures']['exclude'] = TRUE;
  $handler->display->display_options['fields']['field_os2web_meetings_enclosures']['alter']['text'] = 'Bilag: [field_os2web_meetings_enclosures]';
  $handler->display->display_options['fields']['field_os2web_meetings_enclosures']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_os2web_meetings_enclosures']['click_sort_column'] = 'fid';
  $handler->display->display_options['fields']['field_os2web_meetings_enclosures']['delta_offset'] = '0';
  $handler->display->display_options['fields']['field_os2web_meetings_enclosures']['multi_type'] = 'ul';
  $handler->display->display_options['fields']['field_os2web_meetings_enclosures']['field_api_classes'] = TRUE;
  /* Field: Indholdselement: Closed */
  $handler->display->display_options['fields']['field_os2web_meetings_bul_closed']['id'] = 'field_os2web_meetings_bul_closed';
  $handler->display->display_options['fields']['field_os2web_meetings_bul_closed']['table'] = 'field_data_field_os2web_meetings_bul_closed';
  $handler->display->display_options['fields']['field_os2web_meetings_bul_closed']['field'] = 'field_os2web_meetings_bul_closed';
  $handler->display->display_options['fields']['field_os2web_meetings_bul_closed']['relationship'] = 'field_os2web_meetings_bullets_target_id';
  $handler->display->display_options['fields']['field_os2web_meetings_bul_closed']['label'] = '';
  $handler->display->display_options['fields']['field_os2web_meetings_bul_closed']['exclude'] = TRUE;
  $handler->display->display_options['fields']['field_os2web_meetings_bul_closed']['alter']['alter_text'] = TRUE;
  $handler->display->display_options['fields']['field_os2web_meetings_bul_closed']['alter']['text'] = '<strong style="float: right;margin-left:1em">([field_os2web_meetings_bul_closed])</strong>';
  $handler->display->display_options['fields']['field_os2web_meetings_bul_closed']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_os2web_meetings_bul_closed']['hide_empty'] = TRUE;
  /* Field: Bullet point title */
  $handler->display->display_options['fields']['title']['id'] = 'title';
  $handler->display->display_options['fields']['title']['table'] = 'node';
  $handler->display->display_options['fields']['title']['field'] = 'title';
  $handler->display->display_options['fields']['title']['relationship'] = 'field_os2web_meetings_bullets_target_id';
  $handler->display->display_options['fields']['title']['ui_name'] = 'Bullet point title';
  $handler->display->display_options['fields']['title']['label'] = '';
  $handler->display->display_options['fields']['title']['alter']['alter_text'] = TRUE;
  $handler->display->display_options['fields']['title']['alter']['text'] = '[title][field_os2web_meetings_bul_closed]';
  $handler->display->display_options['fields']['title']['alter']['make_link'] = TRUE;
  $handler->display->display_options['fields']['title']['alter']['path'] = 'node/[nid]';
  $handler->display->display_options['fields']['title']['alter']['link_class'] = 'agenda-bullet-list';
  $handler->display->display_options['fields']['title']['alter']['suffix'] = '<div class="agenda-item">[field_os2web_meetings_enclosures][field_os2web_meetings_attach] </div>';
  $handler->display->display_options['fields']['title']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['title']['hide_empty'] = TRUE;
  $handler->display->display_options['fields']['title']['link_to_node'] = FALSE;
  /* Field: Print link */
  $handler->display->display_options['fields']['php_1']['id'] = 'php_1';
  $handler->display->display_options['fields']['php_1']['table'] = 'views';
  $handler->display->display_options['fields']['php_1']['field'] = 'php';
  $handler->display->display_options['fields']['php_1']['ui_name'] = 'Print link';
  $handler->display->display_options['fields']['php_1']['label'] = '';
  $handler->display->display_options['fields']['php_1']['alter']['make_link'] = TRUE;
  $handler->display->display_options['fields']['php_1']['alter']['path'] = 'print/dagsorden_punkt/[nid]/print';
  $handler->display->display_options['fields']['php_1']['alter']['target'] = '_blank';
  $handler->display->display_options['fields']['php_1']['element_class'] = 'views-field-field-os2web-meetings-print-link';
  $handler->display->display_options['fields']['php_1']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['php_1']['use_php_setup'] = 0;
  $handler->display->display_options['fields']['php_1']['php_output'] = '<?php
if (function_exists("os2web_print_send_to_friend_bullet_point_access"))
{
if (os2web_print_send_to_friend_bullet_point_access($row->nid)){
echo \'<img src="/profiles/os2web/themes/os2web_core_theme/images/icon-print-bullet-point.png">\';
}
}
?>';
  $handler->display->display_options['fields']['php_1']['use_php_click_sortable'] = '0';
  $handler->display->display_options['fields']['php_1']['php_click_sortable'] = '';
  /* Field: Send to friend link */
  $handler->display->display_options['fields']['php']['id'] = 'php';
  $handler->display->display_options['fields']['php']['table'] = 'views';
  $handler->display->display_options['fields']['php']['field'] = 'php';
  $handler->display->display_options['fields']['php']['ui_name'] = 'Send to friend link';
  $handler->display->display_options['fields']['php']['label'] = '';
  $handler->display->display_options['fields']['php']['alter']['make_link'] = TRUE;
  $handler->display->display_options['fields']['php']['alter']['path'] = 'dagsorden_punkt/[nid]/send_to_friend_form';
  $handler->display->display_options['fields']['php']['alter']['rel'] = 'lightframe';
  $handler->display->display_options['fields']['php']['element_class'] = 'views-field-field-os2web-meetings-send-to-friend-link';
  $handler->display->display_options['fields']['php']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['php']['use_php_setup'] = 0;
  $handler->display->display_options['fields']['php']['php_output'] = '<?php
if (function_exists("os2web_print_send_to_friend_bullet_point_access"))
{
if (os2web_print_send_to_friend_bullet_point_access($row->nid)){
echo \'<img src="/profiles/os2web/themes/os2web_core_theme/images/icon-send-to-friend-bullet-point.png">\';
}
}
?> ';
  $handler->display->display_options['fields']['php']['use_php_click_sortable'] = '0';
  $handler->display->display_options['fields']['php']['php_click_sortable'] = '';
  /* Field: Indholdselement: NNTV ref */
  $handler->display->display_options['fields']['field_os2web_meetings_nntv_ref']['id'] = 'field_os2web_meetings_nntv_ref';
  $handler->display->display_options['fields']['field_os2web_meetings_nntv_ref']['table'] = 'field_data_field_os2web_meetings_nntv_ref';
  $handler->display->display_options['fields']['field_os2web_meetings_nntv_ref']['field'] = 'field_os2web_meetings_nntv_ref';
  $handler->display->display_options['fields']['field_os2web_meetings_nntv_ref']['relationship'] = 'field_os2web_meetings_bullets_target_id';
  $handler->display->display_options['fields']['field_os2web_meetings_nntv_ref']['label'] = '';
  $handler->display->display_options['fields']['field_os2web_meetings_nntv_ref']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_os2web_meetings_nntv_ref']['click_sort_column'] = 'seek';
  $handler->display->display_options['fields']['field_os2web_meetings_nntv_ref']['type'] = 'os2web_nntv_movie_seek';
  $handler->display->display_options['defaults']['filter_groups'] = FALSE;
  $handler->display->display_options['filter_groups']['groups'] = array(
    1 => 'AND',
    2 => 'OR',
  );
  $handler->display->display_options['defaults']['filters'] = FALSE;
  /* Filter criterion: Content: Published */
  $handler->display->display_options['filters']['status']['id'] = 'status';
  $handler->display->display_options['filters']['status']['table'] = 'node';
  $handler->display->display_options['filters']['status']['field'] = 'status';
  $handler->display->display_options['filters']['status']['value'] = 1;
  $handler->display->display_options['filters']['status']['group'] = 1;
  $handler->display->display_options['filters']['status']['expose']['operator'] = FALSE;
  /* Filter criterion: Content: Type */
  $handler->display->display_options['filters']['type']['id'] = 'type';
  $handler->display->display_options['filters']['type']['table'] = 'node';
  $handler->display->display_options['filters']['type']['field'] = 'type';
  $handler->display->display_options['filters']['type']['value'] = array(
    'os2web_meetings_meeting' => 'os2web_meetings_meeting',
  );
  $handler->display->display_options['filters']['type']['group'] = 1;
  $handler->display->display_options['displays'] = array(
    'page' => 'page',
    'default' => 0,
  );
  $handler->display->display_options['attachment_position'] = 'after';

  /* Display: Tillæg */
  $handler = $view->new_display('attachment', 'Tillæg', 'attachment_3');
  $handler->display->display_options['enabled'] = FALSE;
  $handler->display->display_options['defaults']['hide_admin_links'] = FALSE;
  $handler->display->display_options['pager']['type'] = 'some';
  $handler->display->display_options['defaults']['header'] = FALSE;
  /* Header: Global: Text area */
  $handler->display->display_options['header']['area']['id'] = 'area';
  $handler->display->display_options['header']['area']['table'] = 'views';
  $handler->display->display_options['header']['area']['field'] = 'area';
  $handler->display->display_options['header']['area']['content'] = '<h2 class="pane-title">Tillæg</h2>';
  $handler->display->display_options['header']['area']['format'] = 'php_code';
  $handler->display->display_options['defaults']['relationships'] = FALSE;
  /* Relationship: Content: Tillæg til (field_os2web_meetings_addendum) - reverse */
  $handler->display->display_options['relationships']['reverse_field_os2web_meetings_addendum_node']['id'] = 'reverse_field_os2web_meetings_addendum_node';
  $handler->display->display_options['relationships']['reverse_field_os2web_meetings_addendum_node']['table'] = 'node';
  $handler->display->display_options['relationships']['reverse_field_os2web_meetings_addendum_node']['field'] = 'reverse_field_os2web_meetings_addendum_node';
  $handler->display->display_options['defaults']['fields'] = FALSE;
  /* Field: Content: Nid */
  $handler->display->display_options['fields']['nid']['id'] = 'nid';
  $handler->display->display_options['fields']['nid']['table'] = 'node';
  $handler->display->display_options['fields']['nid']['field'] = 'nid';
  $handler->display->display_options['fields']['nid']['relationship'] = 'reverse_field_os2web_meetings_addendum_node';
  $handler->display->display_options['fields']['nid']['label'] = '';
  $handler->display->display_options['fields']['nid']['exclude'] = TRUE;
  $handler->display->display_options['fields']['nid']['element_label_colon'] = FALSE;
  /* Field: Indholdselement: Committee */
  $handler->display->display_options['fields']['field_os2web_meetings_committee']['id'] = 'field_os2web_meetings_committee';
  $handler->display->display_options['fields']['field_os2web_meetings_committee']['table'] = 'field_data_field_os2web_meetings_committee';
  $handler->display->display_options['fields']['field_os2web_meetings_committee']['field'] = 'field_os2web_meetings_committee';
  $handler->display->display_options['fields']['field_os2web_meetings_committee']['relationship'] = 'reverse_field_os2web_meetings_addendum_node';
  $handler->display->display_options['fields']['field_os2web_meetings_committee']['label'] = 'Udvalg';
  $handler->display->display_options['fields']['field_os2web_meetings_committee']['alter']['make_link'] = TRUE;
  $handler->display->display_options['fields']['field_os2web_meetings_committee']['alter']['path'] = 'os2web_meetings_meeting/[nid]/[field_os2web_meetings_committee]';
  $handler->display->display_options['fields']['field_os2web_meetings_committee']['alter']['replace_spaces'] = TRUE;
  $handler->display->display_options['fields']['field_os2web_meetings_committee']['alter']['target'] = '_blank';
  $handler->display->display_options['fields']['field_os2web_meetings_committee']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_os2web_meetings_committee']['type'] = 'taxonomy_term_reference_plain';
  /* Field: Indholdselement: Date */
  $handler->display->display_options['fields']['field_os2web_meetings_date']['id'] = 'field_os2web_meetings_date';
  $handler->display->display_options['fields']['field_os2web_meetings_date']['table'] = 'field_data_field_os2web_meetings_date';
  $handler->display->display_options['fields']['field_os2web_meetings_date']['field'] = 'field_os2web_meetings_date';
  $handler->display->display_options['fields']['field_os2web_meetings_date']['relationship'] = 'reverse_field_os2web_meetings_addendum_node';
  $handler->display->display_options['fields']['field_os2web_meetings_date']['label'] = 'Dato';
  $handler->display->display_options['fields']['field_os2web_meetings_date']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_os2web_meetings_date']['settings'] = array(
    'format_type' => 'short',
    'fromto' => 'both',
    'multiple_number' => '',
    'multiple_from' => '',
    'multiple_to' => '',
  );
  /* Field: Indholdselement: Lokation */
  $handler->display->display_options['fields']['field_os2web_meetings_location']['id'] = 'field_os2web_meetings_location';
  $handler->display->display_options['fields']['field_os2web_meetings_location']['table'] = 'field_data_field_os2web_meetings_location';
  $handler->display->display_options['fields']['field_os2web_meetings_location']['field'] = 'field_os2web_meetings_location';
  $handler->display->display_options['fields']['field_os2web_meetings_location']['relationship'] = 'reverse_field_os2web_meetings_addendum_node';
  $handler->display->display_options['fields']['field_os2web_meetings_location']['exclude'] = TRUE;
  $handler->display->display_options['fields']['field_os2web_meetings_location']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_os2web_meetings_location']['type'] = 'taxonomy_term_reference_plain';
  $handler->display->display_options['defaults']['filter_groups'] = FALSE;
  $handler->display->display_options['filter_groups']['groups'] = array(
    1 => 'AND',
    2 => 'OR',
  );
  $handler->display->display_options['defaults']['filters'] = FALSE;
  /* Filter criterion: Content: Published */
  $handler->display->display_options['filters']['status']['id'] = 'status';
  $handler->display->display_options['filters']['status']['table'] = 'node';
  $handler->display->display_options['filters']['status']['field'] = 'status';
  $handler->display->display_options['filters']['status']['value'] = 1;
  $handler->display->display_options['filters']['status']['group'] = 1;
  $handler->display->display_options['filters']['status']['expose']['operator'] = FALSE;
  /* Filter criterion: Content: Type */
  $handler->display->display_options['filters']['type']['id'] = 'type';
  $handler->display->display_options['filters']['type']['table'] = 'node';
  $handler->display->display_options['filters']['type']['field'] = 'type';
  $handler->display->display_options['filters']['type']['value'] = array(
    'os2web_meetings_meeting' => 'os2web_meetings_meeting',
  );
  /* Filter criterion: Indholdselement: Tillæg til (field_os2web_meetings_addendum) */
  $handler->display->display_options['filters']['field_os2web_meetings_addendum_nid']['id'] = 'field_os2web_meetings_addendum_nid';
  $handler->display->display_options['filters']['field_os2web_meetings_addendum_nid']['table'] = 'field_data_field_os2web_meetings_addendum';
  $handler->display->display_options['filters']['field_os2web_meetings_addendum_nid']['field'] = 'field_os2web_meetings_addendum_nid';
  $handler->display->display_options['filters']['field_os2web_meetings_addendum_nid']['operator'] = 'not empty';
  $handler->display->display_options['displays'] = array(
    'page' => 'page',
    'default' => 0,
  );
  $handler->display->display_options['attachment_position'] = 'after';

  /* Display: Bullet points - Tillæg */
  $handler = $view->new_display('attachment', 'Bullet points - Tillæg', 'attachment_5');
  $handler->display->display_options['defaults']['hide_admin_links'] = FALSE;
  $handler->display->display_options['pager']['type'] = 'none';
  $handler->display->display_options['pager']['options']['offset'] = '0';
  $handler->display->display_options['defaults']['style_plugin'] = FALSE;
  $handler->display->display_options['style_plugin'] = 'table';
  $handler->display->display_options['style_options']['columns'] = array(
    'nid_1' => 'nid_1',
    'nid' => 'nid',
    'field_os2web_meetings_enclosures' => 'field_os2web_meetings_enclosures',
    'field_os2web_meetings_attach' => 'title',
    'field_os2web_meetings_bul_closed' => 'field_os2web_meetings_bul_closed',
    'title' => 'title',
    'php_1' => 'php_1',
    'php' => 'php',
    'field_os2web_meetings_type' => 'field_os2web_meetings_type',
    'field_os2web_meetings_full_doc' => 'field_os2web_meetings_full_doc',
  );
  $handler->display->display_options['style_options']['default'] = '-1';
  $handler->display->display_options['style_options']['info'] = array(
    'nid_1' => array(
      'sortable' => 0,
      'default_sort_order' => 'asc',
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
    'nid' => array(
      'sortable' => 0,
      'default_sort_order' => 'asc',
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
    'field_os2web_meetings_enclosures' => array(
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
    'field_os2web_meetings_attach' => array(
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
    'field_os2web_meetings_bul_closed' => array(
      'sortable' => 0,
      'default_sort_order' => 'asc',
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
    'title' => array(
      'sortable' => 0,
      'default_sort_order' => 'asc',
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
    'php_1' => array(
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
    'php' => array(
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
    'field_os2web_meetings_type' => array(
      'sortable' => 0,
      'default_sort_order' => 'asc',
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
    'field_os2web_meetings_full_doc' => array(
      'sortable' => 0,
      'default_sort_order' => 'asc',
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
  );
  $handler->display->display_options['defaults']['style_options'] = FALSE;
  $handler->display->display_options['defaults']['row_plugin'] = FALSE;
  $handler->display->display_options['defaults']['row_options'] = FALSE;
  $handler->display->display_options['defaults']['header'] = FALSE;
  /* Header: Global: Text area */
  $handler->display->display_options['header']['area']['id'] = 'area';
  $handler->display->display_options['header']['area']['table'] = 'views';
  $handler->display->display_options['header']['area']['field'] = 'area';
  $handler->display->display_options['header']['area']['content'] = '<div class="clearfix"><h2 class="pane-title" style="float:left">Tillægs[field_os2web_meetings_type]</h2><div style="float:right;margin: 10px 30px 0 0"><span>[field_os2web_meetings_full_doc]</span></div></div>';
  $handler->display->display_options['header']['area']['format'] = 'full_html';
  $handler->display->display_options['header']['area']['tokenize'] = TRUE;
  $handler->display->display_options['defaults']['relationships'] = FALSE;
  /* Relationship: Tillæg */
  $handler->display->display_options['relationships']['reverse_field_os2web_meetings_addendum_node']['id'] = 'reverse_field_os2web_meetings_addendum_node';
  $handler->display->display_options['relationships']['reverse_field_os2web_meetings_addendum_node']['table'] = 'node';
  $handler->display->display_options['relationships']['reverse_field_os2web_meetings_addendum_node']['field'] = 'reverse_field_os2web_meetings_addendum_node';
  $handler->display->display_options['relationships']['reverse_field_os2web_meetings_addendum_node']['ui_name'] = 'Tillæg';
  $handler->display->display_options['relationships']['reverse_field_os2web_meetings_addendum_node']['required'] = TRUE;
  /* Relationship: Bullets */
  $handler->display->display_options['relationships']['field_os2web_meetings_bullets_target_id']['id'] = 'field_os2web_meetings_bullets_target_id';
  $handler->display->display_options['relationships']['field_os2web_meetings_bullets_target_id']['table'] = 'field_data_field_os2web_meetings_bullets';
  $handler->display->display_options['relationships']['field_os2web_meetings_bullets_target_id']['field'] = 'field_os2web_meetings_bullets_target_id';
  $handler->display->display_options['relationships']['field_os2web_meetings_bullets_target_id']['relationship'] = 'reverse_field_os2web_meetings_addendum_node';
  $handler->display->display_options['relationships']['field_os2web_meetings_bullets_target_id']['ui_name'] = 'Bullets';
  $handler->display->display_options['relationships']['field_os2web_meetings_bullets_target_id']['required'] = TRUE;
  /* Relationship: Broken/missing handler */
  $handler->display->display_options['relationships']['reverse_field_ref_os2web_meetings_bullet_node']['id'] = 'reverse_field_ref_os2web_meetings_bullet_node';
  $handler->display->display_options['relationships']['reverse_field_ref_os2web_meetings_bullet_node']['table'] = 'node';
  $handler->display->display_options['relationships']['reverse_field_ref_os2web_meetings_bullet_node']['field'] = 'reverse_field_ref_os2web_meetings_bullet_node';
  $handler->display->display_options['relationships']['reverse_field_ref_os2web_meetings_bullet_node']['relationship'] = 'field_os2web_meetings_bullets_target_id';
  $handler->display->display_options['relationships']['reverse_field_ref_os2web_meetings_bullet_node']['ui_name'] = 'Bullet content';
  $handler->display->display_options['relationships']['reverse_field_ref_os2web_meetings_bullet_node']['label'] = 'bullet point speaking paper';
  $handler->display->display_options['defaults']['fields'] = FALSE;
  /* Field: Meeting id - hidden */
  $handler->display->display_options['fields']['nid_1']['id'] = 'nid_1';
  $handler->display->display_options['fields']['nid_1']['table'] = 'node';
  $handler->display->display_options['fields']['nid_1']['field'] = 'nid';
  $handler->display->display_options['fields']['nid_1']['ui_name'] = 'Meeting id - hidden';
  $handler->display->display_options['fields']['nid_1']['label'] = '';
  $handler->display->display_options['fields']['nid_1']['exclude'] = TRUE;
  $handler->display->display_options['fields']['nid_1']['element_label_colon'] = FALSE;
  /* Field: Bullet point id - hidden */
  $handler->display->display_options['fields']['nid']['id'] = 'nid';
  $handler->display->display_options['fields']['nid']['table'] = 'node';
  $handler->display->display_options['fields']['nid']['field'] = 'nid';
  $handler->display->display_options['fields']['nid']['relationship'] = 'field_os2web_meetings_bullets_target_id';
  $handler->display->display_options['fields']['nid']['ui_name'] = 'Bullet point id - hidden';
  $handler->display->display_options['fields']['nid']['label'] = '';
  $handler->display->display_options['fields']['nid']['exclude'] = TRUE;
  $handler->display->display_options['fields']['nid']['element_label_colon'] = FALSE;
  /* Field: Bullet points */
  $handler->display->display_options['fields']['field_os2web_meetings_attach']['id'] = 'field_os2web_meetings_attach';
  $handler->display->display_options['fields']['field_os2web_meetings_attach']['table'] = 'field_data_field_os2web_meetings_attach';
  $handler->display->display_options['fields']['field_os2web_meetings_attach']['field'] = 'field_os2web_meetings_attach';
  $handler->display->display_options['fields']['field_os2web_meetings_attach']['relationship'] = 'field_os2web_meetings_bullets_target_id';
  $handler->display->display_options['fields']['field_os2web_meetings_attach']['ui_name'] = 'Bullet points';
  $handler->display->display_options['fields']['field_os2web_meetings_attach']['label'] = '';
  $handler->display->display_options['fields']['field_os2web_meetings_attach']['exclude'] = TRUE;
  $handler->display->display_options['fields']['field_os2web_meetings_attach']['alter']['text'] = '[field_os2web_meetings_attach-target_id]';
  $handler->display->display_options['fields']['field_os2web_meetings_attach']['alter']['path'] = 'os2web_meetings_meeting/[nid_1]/bullet-point/[nid]/bullet-point-attachment/[field_os2web_meetings_attach-target_id]';
  $handler->display->display_options['fields']['field_os2web_meetings_attach']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_os2web_meetings_attach']['empty'] = 'Intet indhold til dette punkt.';
  $handler->display->display_options['fields']['field_os2web_meetings_attach']['type'] = 'entityreference_entity_view';
  $handler->display->display_options['fields']['field_os2web_meetings_attach']['settings'] = array(
    'view_mode' => 'os2web_meetings_meeting_detail_view',
  );
  $handler->display->display_options['fields']['field_os2web_meetings_attach']['delta_offset'] = '0';
  $handler->display->display_options['fields']['field_os2web_meetings_attach']['multi_type'] = 'ul';
  $handler->display->display_options['fields']['field_os2web_meetings_attach']['separator'] = '<br/>';
  /* Field: Indholdselement: Enclosures */
  $handler->display->display_options['fields']['field_os2web_meetings_enclosures']['id'] = 'field_os2web_meetings_enclosures';
  $handler->display->display_options['fields']['field_os2web_meetings_enclosures']['table'] = 'field_data_field_os2web_meetings_enclosures';
  $handler->display->display_options['fields']['field_os2web_meetings_enclosures']['field'] = 'field_os2web_meetings_enclosures';
  $handler->display->display_options['fields']['field_os2web_meetings_enclosures']['relationship'] = 'field_os2web_meetings_bullets_target_id';
  $handler->display->display_options['fields']['field_os2web_meetings_enclosures']['label'] = '';
  $handler->display->display_options['fields']['field_os2web_meetings_enclosures']['exclude'] = TRUE;
  $handler->display->display_options['fields']['field_os2web_meetings_enclosures']['alter']['text'] = 'Bilag: [field_os2web_meetings_enclosures]';
  $handler->display->display_options['fields']['field_os2web_meetings_enclosures']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_os2web_meetings_enclosures']['click_sort_column'] = 'fid';
  $handler->display->display_options['fields']['field_os2web_meetings_enclosures']['delta_offset'] = '0';
  $handler->display->display_options['fields']['field_os2web_meetings_enclosures']['multi_type'] = 'ul';
  $handler->display->display_options['fields']['field_os2web_meetings_enclosures']['field_api_classes'] = TRUE;
  /* Field: Indholdselement: Closed */
  $handler->display->display_options['fields']['field_os2web_meetings_bul_closed']['id'] = 'field_os2web_meetings_bul_closed';
  $handler->display->display_options['fields']['field_os2web_meetings_bul_closed']['table'] = 'field_data_field_os2web_meetings_bul_closed';
  $handler->display->display_options['fields']['field_os2web_meetings_bul_closed']['field'] = 'field_os2web_meetings_bul_closed';
  $handler->display->display_options['fields']['field_os2web_meetings_bul_closed']['relationship'] = 'field_os2web_meetings_bullets_target_id';
  $handler->display->display_options['fields']['field_os2web_meetings_bul_closed']['label'] = '';
  $handler->display->display_options['fields']['field_os2web_meetings_bul_closed']['exclude'] = TRUE;
  $handler->display->display_options['fields']['field_os2web_meetings_bul_closed']['alter']['alter_text'] = TRUE;
  $handler->display->display_options['fields']['field_os2web_meetings_bul_closed']['alter']['text'] = '<strong style="float: right;margin-left:1em">([field_os2web_meetings_bul_closed])</strong>';
  $handler->display->display_options['fields']['field_os2web_meetings_bul_closed']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_os2web_meetings_bul_closed']['hide_empty'] = TRUE;
  /* Field: Bullet point title */
  $handler->display->display_options['fields']['title']['id'] = 'title';
  $handler->display->display_options['fields']['title']['table'] = 'node';
  $handler->display->display_options['fields']['title']['field'] = 'title';
  $handler->display->display_options['fields']['title']['relationship'] = 'field_os2web_meetings_bullets_target_id';
  $handler->display->display_options['fields']['title']['ui_name'] = 'Bullet point title';
  $handler->display->display_options['fields']['title']['label'] = '';
  $handler->display->display_options['fields']['title']['alter']['alter_text'] = TRUE;
  $handler->display->display_options['fields']['title']['alter']['text'] = '[title] [field_os2web_meetings_bul_closed]';
  $handler->display->display_options['fields']['title']['alter']['make_link'] = TRUE;
  $handler->display->display_options['fields']['title']['alter']['path'] = 'node/[nid]';
  $handler->display->display_options['fields']['title']['alter']['link_class'] = 'agenda-bullet-list';
  $handler->display->display_options['fields']['title']['alter']['suffix'] = '<div class="agenda-item">[field_os2web_meetings_enclosures][field_os2web_meetings_attach] </div>';
  $handler->display->display_options['fields']['title']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['title']['hide_empty'] = TRUE;
  $handler->display->display_options['fields']['title']['link_to_node'] = FALSE;
  /* Field: Print link */
  $handler->display->display_options['fields']['php_1']['id'] = 'php_1';
  $handler->display->display_options['fields']['php_1']['table'] = 'views';
  $handler->display->display_options['fields']['php_1']['field'] = 'php';
  $handler->display->display_options['fields']['php_1']['ui_name'] = 'Print link';
  $handler->display->display_options['fields']['php_1']['label'] = '';
  $handler->display->display_options['fields']['php_1']['alter']['make_link'] = TRUE;
  $handler->display->display_options['fields']['php_1']['alter']['path'] = 'print/dagsorden_punkt/[nid]/print';
  $handler->display->display_options['fields']['php_1']['alter']['target'] = '_blank';
  $handler->display->display_options['fields']['php_1']['element_class'] = 'views-field-field-os2web-meetings-print-link';
  $handler->display->display_options['fields']['php_1']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['php_1']['use_php_setup'] = 0;
  $handler->display->display_options['fields']['php_1']['php_output'] = '<?php
if (function_exists("os2web_print_send_to_friend_bullet_point_access"))
{
if (os2web_print_send_to_friend_bullet_point_access($row->nid)){
echo \'<img src="/profiles/os2web/themes/os2web_core_theme/images/icon-print-bullet-point.png">\';
}
}
?>';
  $handler->display->display_options['fields']['php_1']['use_php_click_sortable'] = '0';
  $handler->display->display_options['fields']['php_1']['php_click_sortable'] = '';
  /* Field: Send to friend link */
  $handler->display->display_options['fields']['php']['id'] = 'php';
  $handler->display->display_options['fields']['php']['table'] = 'views';
  $handler->display->display_options['fields']['php']['field'] = 'php';
  $handler->display->display_options['fields']['php']['ui_name'] = 'Send to friend link';
  $handler->display->display_options['fields']['php']['label'] = '';
  $handler->display->display_options['fields']['php']['alter']['make_link'] = TRUE;
  $handler->display->display_options['fields']['php']['alter']['path'] = 'dagsorden_punkt/[nid]/send_to_friend_form';
  $handler->display->display_options['fields']['php']['alter']['rel'] = 'lightframe';
  $handler->display->display_options['fields']['php']['element_class'] = 'views-field-field-os2web-meetings-send-to-friend-link';
  $handler->display->display_options['fields']['php']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['php']['use_php_setup'] = 0;
  $handler->display->display_options['fields']['php']['php_output'] = '<?php
if (function_exists("os2web_print_send_to_friend_bullet_point_access"))
{
if (os2web_print_send_to_friend_bullet_point_access($row->nid)){
echo \'<img src="/profiles/os2web/themes/os2web_core_theme/images/icon-send-to-friend-bullet-point.png">\';
}
}
?> ';
  $handler->display->display_options['fields']['php']['use_php_click_sortable'] = '0';
  $handler->display->display_options['fields']['php']['php_click_sortable'] = '';
  /* Field: Indholdselement: Type */
  $handler->display->display_options['fields']['field_os2web_meetings_type']['id'] = 'field_os2web_meetings_type';
  $handler->display->display_options['fields']['field_os2web_meetings_type']['table'] = 'field_data_field_os2web_meetings_type';
  $handler->display->display_options['fields']['field_os2web_meetings_type']['field'] = 'field_os2web_meetings_type';
  $handler->display->display_options['fields']['field_os2web_meetings_type']['label'] = '';
  $handler->display->display_options['fields']['field_os2web_meetings_type']['exclude'] = TRUE;
  $handler->display->display_options['fields']['field_os2web_meetings_type']['element_label_colon'] = FALSE;
  /* Field: Indholdselement: Full doc */
  $handler->display->display_options['fields']['field_os2web_meetings_full_doc']['id'] = 'field_os2web_meetings_full_doc';
  $handler->display->display_options['fields']['field_os2web_meetings_full_doc']['table'] = 'field_data_field_os2web_meetings_full_doc';
  $handler->display->display_options['fields']['field_os2web_meetings_full_doc']['field'] = 'field_os2web_meetings_full_doc';
  $handler->display->display_options['fields']['field_os2web_meetings_full_doc']['relationship'] = 'reverse_field_os2web_meetings_addendum_node';
  $handler->display->display_options['fields']['field_os2web_meetings_full_doc']['label'] = '';
  $handler->display->display_options['fields']['field_os2web_meetings_full_doc']['exclude'] = TRUE;
  $handler->display->display_options['fields']['field_os2web_meetings_full_doc']['alter']['alter_text'] = TRUE;
  $handler->display->display_options['fields']['field_os2web_meetings_full_doc']['alter']['text'] = 'Samlet tillæg';
  $handler->display->display_options['fields']['field_os2web_meetings_full_doc']['alter']['make_link'] = TRUE;
  $handler->display->display_options['fields']['field_os2web_meetings_full_doc']['alter']['path'] = '[field_os2web_meetings_full_doc]';
  $handler->display->display_options['fields']['field_os2web_meetings_full_doc']['alter']['external'] = TRUE;
  $handler->display->display_options['fields']['field_os2web_meetings_full_doc']['alter']['alt'] = 'Download hele referatet som samlet dokument';
  $handler->display->display_options['fields']['field_os2web_meetings_full_doc']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_os2web_meetings_full_doc']['click_sort_column'] = 'fid';
  $handler->display->display_options['fields']['field_os2web_meetings_full_doc']['type'] = 'file_url_plain';
  $handler->display->display_options['defaults']['filter_groups'] = FALSE;
  $handler->display->display_options['filter_groups']['groups'] = array(
    1 => 'AND',
    2 => 'OR',
  );
  $handler->display->display_options['defaults']['filters'] = FALSE;
  /* Filter criterion: Content: Published */
  $handler->display->display_options['filters']['status']['id'] = 'status';
  $handler->display->display_options['filters']['status']['table'] = 'node';
  $handler->display->display_options['filters']['status']['field'] = 'status';
  $handler->display->display_options['filters']['status']['value'] = 1;
  $handler->display->display_options['filters']['status']['group'] = 1;
  $handler->display->display_options['filters']['status']['expose']['operator'] = FALSE;
  /* Filter criterion: Content: Type */
  $handler->display->display_options['filters']['type']['id'] = 'type';
  $handler->display->display_options['filters']['type']['table'] = 'node';
  $handler->display->display_options['filters']['type']['field'] = 'type';
  $handler->display->display_options['filters']['type']['value'] = array(
    'os2web_meetings_meeting' => 'os2web_meetings_meeting',
  );
  $handler->display->display_options['filters']['type']['group'] = 1;
  /* Filter criterion: Indholdselement: Tillæg til (field_os2web_meetings_addendum) */
  $handler->display->display_options['filters']['field_os2web_meetings_addendum_nid']['id'] = 'field_os2web_meetings_addendum_nid';
  $handler->display->display_options['filters']['field_os2web_meetings_addendum_nid']['table'] = 'field_data_field_os2web_meetings_addendum';
  $handler->display->display_options['filters']['field_os2web_meetings_addendum_nid']['field'] = 'field_os2web_meetings_addendum_nid';
  $handler->display->display_options['filters']['field_os2web_meetings_addendum_nid']['operator'] = 'not empty';
  $handler->display->display_options['displays'] = array(
    'page' => 'page',
    'default' => 0,
  );
  $handler->display->display_options['attachment_position'] = 'after';

  /* Display: Bilag 4 */
  $handler = $view->new_display('attachment', 'Bilag 4', 'attachment_4');
  $handler->display->display_options['defaults']['title'] = FALSE;
  $handler->display->display_options['title'] = 'Tillægs møder';
  $handler->display->display_options['defaults']['hide_admin_links'] = FALSE;
  $handler->display->display_options['defaults']['access'] = FALSE;
  $handler->display->display_options['access']['type'] = 'role';
  $handler->display->display_options['access']['role'] = array(
    3 => '3',
  );
  $handler->display->display_options['pager']['type'] = 'some';
  $handler->display->display_options['defaults']['relationships'] = FALSE;
  /* Relationship: Content: Tillæg til (field_os2web_meetings_addendum) - reverse */
  $handler->display->display_options['relationships']['reverse_field_os2web_meetings_addendum_node']['id'] = 'reverse_field_os2web_meetings_addendum_node';
  $handler->display->display_options['relationships']['reverse_field_os2web_meetings_addendum_node']['table'] = 'node';
  $handler->display->display_options['relationships']['reverse_field_os2web_meetings_addendum_node']['field'] = 'reverse_field_os2web_meetings_addendum_node';
  $handler->display->display_options['relationships']['reverse_field_os2web_meetings_addendum_node']['label'] = 'Tilllæg';
  $handler->display->display_options['defaults']['fields'] = FALSE;
  /* Field: Content: Nid */
  $handler->display->display_options['fields']['nid']['id'] = 'nid';
  $handler->display->display_options['fields']['nid']['table'] = 'node';
  $handler->display->display_options['fields']['nid']['field'] = 'nid';
  $handler->display->display_options['fields']['nid']['relationship'] = 'reverse_field_os2web_meetings_addendum_node';
  /* Field: Content: Title */
  $handler->display->display_options['fields']['title']['id'] = 'title';
  $handler->display->display_options['fields']['title']['table'] = 'node';
  $handler->display->display_options['fields']['title']['field'] = 'title';
  $handler->display->display_options['fields']['title']['relationship'] = 'reverse_field_os2web_meetings_addendum_node';
  $handler->display->display_options['fields']['title']['alter']['word_boundary'] = FALSE;
  $handler->display->display_options['fields']['title']['alter']['ellipsis'] = FALSE;
  $handler->display->display_options['fields']['title']['element_label_colon'] = FALSE;
  /* Field: Indholdselement: System id */
  $handler->display->display_options['fields']['field_os2web_meetings_system_id']['id'] = 'field_os2web_meetings_system_id';
  $handler->display->display_options['fields']['field_os2web_meetings_system_id']['table'] = 'field_data_field_os2web_meetings_system_id';
  $handler->display->display_options['fields']['field_os2web_meetings_system_id']['field'] = 'field_os2web_meetings_system_id';
  $handler->display->display_options['fields']['field_os2web_meetings_system_id']['relationship'] = 'reverse_field_os2web_meetings_addendum_node';
  $handler->display->display_options['fields']['field_os2web_meetings_system_id']['type'] = 'number_unformatted';
  $handler->display->display_options['fields']['field_os2web_meetings_system_id']['settings'] = array(
    'thousand_separator' => ' ',
    'prefix_suffix' => 1,
  );
  /* Field: Content: Delete link */
  $handler->display->display_options['fields']['delete_node']['id'] = 'delete_node';
  $handler->display->display_options['fields']['delete_node']['table'] = 'views_entity_node';
  $handler->display->display_options['fields']['delete_node']['field'] = 'delete_node';
  $handler->display->display_options['fields']['delete_node']['relationship'] = 'reverse_field_os2web_meetings_addendum_node';
  $handler->display->display_options['fields']['delete_node']['label'] = 'Slet';
  $handler->display->display_options['displays'] = array(
    'page' => 'page',
    'default' => 0,
  );
  $handler->display->display_options['attachment_position'] = 'after';
  $translatables['os2web_meetings_meeting_details'] = array(
    t('Master'),
    t('Mødedetaljer'),
    t('mere'),
    t('Udfør'),
    t('Gendan'),
    t('Sortér efter'),
    t('Stigende'),
    t('Faldende'),
    t('Meetings bullet points'),
    t('bullet point attachments'),
    t('Slet'),
    t('Alle'),
    t('Page'),
    t('more'),
    t('Title'),
    t('Udvalg'),
    t('Dato'),
    t('Slut Dato'),
    t('Lokationen'),
    t('Type'),
    t('Hent'),
    t('Samlet dokument'),
    t('Download hele referatet som samlet dokument'),
    t('Video'),
    t('Video for mødet'),
    t('<h2 class="pane-title">Video fra mødet</h2>'),
    t('Bullet points'),
    t('Indholdselement entity referenced from field_os2web_meetings_bullets'),
    t('bullet point speaking paper'),
    t('[field_os2web_meetings_attach-target_id]'),
    t('Intet indhold til dette punkt.'),
    t('Bilag: [field_os2web_meetings_enclosures]'),
    t('<strong style="float: right;margin-left:1em">([field_os2web_meetings_bul_closed])</strong>'),
    t('[title][field_os2web_meetings_bul_closed]'),
    t('<div class="agenda-item">[field_os2web_meetings_enclosures][field_os2web_meetings_attach] </div>'),
    t('Tillæg'),
    t('<h2 class="pane-title">Tillæg</h2>'),
    t('field_os2web_meetings_addendum'),
    t('Lokation'),
    t('Bullet points - Tillæg'),
    t('<div class="clearfix"><h2 class="pane-title" style="float:left">Tillægs[field_os2web_meetings_type]</h2><div style="float:right;margin: 10px 30px 0 0"><span>[field_os2web_meetings_full_doc]</span></div></div>'),
    t('[title] [field_os2web_meetings_bul_closed]'),
    t('Samlet tillæg'),
    t('Bilag 4'),
    t('Tillægs møder'),
    t('Tilllæg'),
    t('Nid'),
    t('System id'),
  );
  $export['os2web_meetings_meeting_details'] = $view;

  $view = new view();
  $view->name = 'os2web_meetings_view_bullets';
  $view->description = '';
  $view->tag = 'default';
  $view->base_table = 'node';
  $view->human_name = 'Meeting bullet points';
  $view->core = 7;
  $view->api_version = '3.0';
  $view->disabled = FALSE; /* Edit this to true to make a default view disabled initially */

  /* Display: Master */
  $handler = $view->new_display('default', 'Master', 'default');
  $handler->display->display_options['title'] = 'Meeting bullet points';
  $handler->display->display_options['use_more_always'] = FALSE;
  $handler->display->display_options['use_more_text'] = 'mere';
  $handler->display->display_options['access']['type'] = 'perm';
  $handler->display->display_options['cache']['type'] = 'none';
  $handler->display->display_options['query']['type'] = 'views_query';
  $handler->display->display_options['query']['options']['query_comment'] = FALSE;
  $handler->display->display_options['exposed_form']['type'] = 'basic';
  $handler->display->display_options['exposed_form']['options']['submit_button'] = 'Udfør';
  $handler->display->display_options['exposed_form']['options']['reset_button_label'] = 'Gendan';
  $handler->display->display_options['exposed_form']['options']['exposed_sorts_label'] = 'Sortér efter';
  $handler->display->display_options['exposed_form']['options']['sort_asc_label'] = 'Stigende';
  $handler->display->display_options['exposed_form']['options']['sort_desc_label'] = 'Faldende';
  $handler->display->display_options['pager']['type'] = 'some';
  $handler->display->display_options['pager']['options']['items_per_page'] = '0';
  $handler->display->display_options['pager']['options']['offset'] = '0';
  $handler->display->display_options['style_plugin'] = 'table';
  $handler->display->display_options['style_options']['columns'] = array(
    'title' => 'title',
  );
  $handler->display->display_options['style_options']['default'] = '-1';
  $handler->display->display_options['style_options']['info'] = array(
    'title' => array(
      'sortable' => 0,
      'default_sort_order' => 'asc',
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
  );
  /* Relationship: Broken/missing handler */
  $handler->display->display_options['relationships']['relation_contains_node']['id'] = 'relation_contains_node';
  $handler->display->display_options['relationships']['relation_contains_node']['table'] = 'node';
  $handler->display->display_options['relationships']['relation_contains_node']['field'] = 'relation_contains_node';
  $handler->display->display_options['relationships']['relation_contains_node']['label'] = 'indeholder';
  $handler->display->display_options['relationships']['relation_contains_node']['required'] = TRUE;
  /* Field: Content: Title */
  $handler->display->display_options['fields']['title']['id'] = 'title';
  $handler->display->display_options['fields']['title']['table'] = 'node';
  $handler->display->display_options['fields']['title']['field'] = 'title';
  $handler->display->display_options['fields']['title']['relationship'] = 'relation_contains_node';
  $handler->display->display_options['fields']['title']['label'] = '';
  $handler->display->display_options['fields']['title']['alter']['word_boundary'] = FALSE;
  $handler->display->display_options['fields']['title']['alter']['ellipsis'] = FALSE;
  $handler->display->display_options['fields']['title']['element_label_colon'] = FALSE;
  /* Sort criterion: Content: Post date */
  $handler->display->display_options['sorts']['created']['id'] = 'created';
  $handler->display->display_options['sorts']['created']['table'] = 'node';
  $handler->display->display_options['sorts']['created']['field'] = 'created';
  $handler->display->display_options['sorts']['created']['order'] = 'DESC';
  /* Contextual filter: Content: Nid */
  $handler->display->display_options['arguments']['nid']['id'] = 'nid';
  $handler->display->display_options['arguments']['nid']['table'] = 'node';
  $handler->display->display_options['arguments']['nid']['field'] = 'nid';
  $handler->display->display_options['arguments']['nid']['default_action'] = 'default';
  $handler->display->display_options['arguments']['nid']['exception']['title'] = 'Alle';
  $handler->display->display_options['arguments']['nid']['default_argument_type'] = 'raw';
  $handler->display->display_options['arguments']['nid']['default_argument_options']['index'] = '2';
  $handler->display->display_options['arguments']['nid']['summary']['number_of_records'] = '0';
  $handler->display->display_options['arguments']['nid']['summary']['format'] = 'default_summary';
  $handler->display->display_options['arguments']['nid']['summary_options']['items_per_page'] = '25';
  $handler->display->display_options['arguments']['nid']['specify_validation'] = TRUE;
  $handler->display->display_options['arguments']['nid']['validate']['type'] = 'node';
  $handler->display->display_options['arguments']['nid']['validate_options']['types'] = array(
    'os2web_meetings_meeting' => 'os2web_meetings_meeting',
  );
  /* Filter criterion: Content: Published */
  $handler->display->display_options['filters']['status']['id'] = 'status';
  $handler->display->display_options['filters']['status']['table'] = 'node';
  $handler->display->display_options['filters']['status']['field'] = 'status';
  $handler->display->display_options['filters']['status']['value'] = 1;
  $handler->display->display_options['filters']['status']['group'] = 1;
  $handler->display->display_options['filters']['status']['expose']['operator'] = FALSE;
  /* Filter criterion: Content: Type */
  $handler->display->display_options['filters']['type']['id'] = 'type';
  $handler->display->display_options['filters']['type']['table'] = 'node';
  $handler->display->display_options['filters']['type']['field'] = 'type';
  $handler->display->display_options['filters']['type']['value'] = array(
    'os2web_meetings_meeting' => 'os2web_meetings_meeting',
  );

  /* Display: Block */
  $handler = $view->new_display('block', 'Block', 'block');
  $handler->display->display_options['defaults']['hide_admin_links'] = FALSE;
  $translatables['os2web_meetings_view_bullets'] = array(
    t('Master'),
    t('Meeting bullet points'),
    t('mere'),
    t('Udfør'),
    t('Gendan'),
    t('Sortér efter'),
    t('Stigende'),
    t('Faldende'),
    t('indeholder'),
    t('Alle'),
    t('Block'),
    t('more'),
  );
  $export['os2web_meetings_view_bullets'] = $view;

  $view = new view();
  $view->name = 'os2web_meetings_view_feeds';
  $view->description = 'This is the RSS feeds of meetings';
  $view->tag = 'default';
  $view->base_table = 'node';
  $view->human_name = 'Meeting feeds';
  $view->core = 7;
  $view->api_version = '3.0';
  $view->disabled = FALSE; /* Edit this to true to make a default view disabled initially */

  /* Display: Master */
  $handler = $view->new_display('default', 'Master', 'default');
  $handler->display->display_options['title'] = 'Dagsordner og referater i Syddjurs Kommune';
  $handler->display->display_options['use_more_always'] = FALSE;
  $handler->display->display_options['use_more_text'] = 'mere';
  $handler->display->display_options['group_by'] = TRUE;
  $handler->display->display_options['access']['type'] = 'perm';
  $handler->display->display_options['cache']['type'] = 'time';
  $handler->display->display_options['cache']['results_lifespan'] = '300';
  $handler->display->display_options['cache']['results_lifespan_custom'] = '0';
  $handler->display->display_options['cache']['output_lifespan'] = '300';
  $handler->display->display_options['cache']['output_lifespan_custom'] = '0';
  $handler->display->display_options['query']['type'] = 'views_query';
  $handler->display->display_options['query']['options']['distinct'] = TRUE;
  $handler->display->display_options['exposed_form']['type'] = 'basic';
  $handler->display->display_options['exposed_form']['options']['submit_button'] = 'Udfør';
  $handler->display->display_options['exposed_form']['options']['reset_button_label'] = 'Gendan';
  $handler->display->display_options['exposed_form']['options']['exposed_sorts_label'] = 'Sortér efter';
  $handler->display->display_options['exposed_form']['options']['sort_asc_label'] = 'Stigende';
  $handler->display->display_options['exposed_form']['options']['sort_desc_label'] = 'Faldende';
  $handler->display->display_options['pager']['type'] = 'full';
  $handler->display->display_options['pager']['options']['expose']['items_per_page_label'] = 'Antal elementer';
  $handler->display->display_options['pager']['options']['expose']['items_per_page_options_all_label'] = '- Alle -';
  $handler->display->display_options['pager']['options']['expose']['offset_label'] = 'Forskydning';
  $handler->display->display_options['pager']['options']['tags']['first'] = '« første';
  $handler->display->display_options['pager']['options']['tags']['previous'] = '‹ forrige';
  $handler->display->display_options['pager']['options']['tags']['next'] = 'næste ›';
  $handler->display->display_options['pager']['options']['tags']['last'] = 'sidste »';
  $handler->display->display_options['style_plugin'] = 'default';
  $handler->display->display_options['style_options']['grouping'] = array(
    0 => array(
      'field' => 'tid',
      'rendered' => 0,
      'rendered_strip' => 0,
    ),
  );
  $handler->display->display_options['style_options']['default_row_class'] = FALSE;
  $handler->display->display_options['style_options']['row_class_special'] = FALSE;
  $handler->display->display_options['row_plugin'] = 'fields';
  /* Field: Indholdselement: Committee */
  $handler->display->display_options['fields']['field_os2web_meetings_committee']['id'] = 'field_os2web_meetings_committee';
  $handler->display->display_options['fields']['field_os2web_meetings_committee']['table'] = 'field_data_field_os2web_meetings_committee';
  $handler->display->display_options['fields']['field_os2web_meetings_committee']['field'] = 'field_os2web_meetings_committee';
  $handler->display->display_options['fields']['field_os2web_meetings_committee']['label'] = '';
  $handler->display->display_options['fields']['field_os2web_meetings_committee']['exclude'] = TRUE;
  $handler->display->display_options['fields']['field_os2web_meetings_committee']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_os2web_meetings_committee']['type'] = 'taxonomy_term_reference_plain';
  /* Field: Indholdselement: Date */
  $handler->display->display_options['fields']['field_os2web_meetings_date']['id'] = 'field_os2web_meetings_date';
  $handler->display->display_options['fields']['field_os2web_meetings_date']['table'] = 'field_data_field_os2web_meetings_date';
  $handler->display->display_options['fields']['field_os2web_meetings_date']['field'] = 'field_os2web_meetings_date';
  $handler->display->display_options['fields']['field_os2web_meetings_date']['label'] = '';
  $handler->display->display_options['fields']['field_os2web_meetings_date']['exclude'] = TRUE;
  $handler->display->display_options['fields']['field_os2web_meetings_date']['alter']['strip_tags'] = TRUE;
  $handler->display->display_options['fields']['field_os2web_meetings_date']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_os2web_meetings_date']['settings'] = array(
    'format_type' => 'short',
    'fromto' => 'value',
    'multiple_number' => '',
    'multiple_from' => '',
    'multiple_to' => '',
  );
  /* Field: Indholdselement: Type */
  $handler->display->display_options['fields']['field_os2web_meetings_type']['id'] = 'field_os2web_meetings_type';
  $handler->display->display_options['fields']['field_os2web_meetings_type']['table'] = 'field_data_field_os2web_meetings_type';
  $handler->display->display_options['fields']['field_os2web_meetings_type']['field'] = 'field_os2web_meetings_type';
  $handler->display->display_options['fields']['field_os2web_meetings_type']['label'] = '';
  $handler->display->display_options['fields']['field_os2web_meetings_type']['exclude'] = TRUE;
  $handler->display->display_options['fields']['field_os2web_meetings_type']['element_label_colon'] = FALSE;
  /* Field: Content: Nid */
  $handler->display->display_options['fields']['nid']['id'] = 'nid';
  $handler->display->display_options['fields']['nid']['table'] = 'node';
  $handler->display->display_options['fields']['nid']['field'] = 'nid';
  $handler->display->display_options['fields']['nid']['label'] = '';
  $handler->display->display_options['fields']['nid']['exclude'] = TRUE;
  $handler->display->display_options['fields']['nid']['element_label_colon'] = FALSE;
  /* Field: Beskrivelse */
  $handler->display->display_options['fields']['nothing']['id'] = 'nothing';
  $handler->display->display_options['fields']['nothing']['table'] = 'views';
  $handler->display->display_options['fields']['nothing']['field'] = 'nothing';
  $handler->display->display_options['fields']['nothing']['ui_name'] = 'Beskrivelse';
  $handler->display->display_options['fields']['nothing']['label'] = '';
  $handler->display->display_options['fields']['nothing']['alter']['text'] = '[field_os2web_meetings_type] af [field_os2web_meetings_committee] d. [field_os2web_meetings_date]';
  $handler->display->display_options['fields']['nothing']['element_label_colon'] = FALSE;
  /* Field: Content revision: Link */
  $handler->display->display_options['fields']['link_to_revision']['id'] = 'link_to_revision';
  $handler->display->display_options['fields']['link_to_revision']['table'] = 'node_revision';
  $handler->display->display_options['fields']['link_to_revision']['field'] = 'link_to_revision';
  $handler->display->display_options['fields']['link_to_revision']['label'] = '';
  $handler->display->display_options['fields']['link_to_revision']['element_label_colon'] = FALSE;
  /* Field: Titel */
  $handler->display->display_options['fields']['nothing_1']['id'] = 'nothing_1';
  $handler->display->display_options['fields']['nothing_1']['table'] = 'views';
  $handler->display->display_options['fields']['nothing_1']['field'] = 'nothing';
  $handler->display->display_options['fields']['nothing_1']['ui_name'] = 'Titel';
  $handler->display->display_options['fields']['nothing_1']['label'] = '';
  $handler->display->display_options['fields']['nothing_1']['alter']['text'] = '[field_os2web_meetings_committee] - [field_os2web_meetings_date]';
  $handler->display->display_options['fields']['nothing_1']['element_label_colon'] = FALSE;
  /* Sort criterion: Content: Post date */
  $handler->display->display_options['sorts']['created']['id'] = 'created';
  $handler->display->display_options['sorts']['created']['table'] = 'node';
  $handler->display->display_options['sorts']['created']['field'] = 'created';
  $handler->display->display_options['sorts']['created']['order'] = 'DESC';
  /* Contextual filter: Indholdselement: Committee (field_os2web_meetings_committee) */
  $handler->display->display_options['arguments']['field_os2web_meetings_committee_tid']['id'] = 'field_os2web_meetings_committee_tid';
  $handler->display->display_options['arguments']['field_os2web_meetings_committee_tid']['table'] = 'field_data_field_os2web_meetings_committee';
  $handler->display->display_options['arguments']['field_os2web_meetings_committee_tid']['field'] = 'field_os2web_meetings_committee_tid';
  $handler->display->display_options['arguments']['field_os2web_meetings_committee_tid']['exception']['title'] = 'Alle';
  $handler->display->display_options['arguments']['field_os2web_meetings_committee_tid']['default_argument_type'] = 'fixed';
  $handler->display->display_options['arguments']['field_os2web_meetings_committee_tid']['summary']['number_of_records'] = '0';
  $handler->display->display_options['arguments']['field_os2web_meetings_committee_tid']['summary']['format'] = 'default_summary';
  $handler->display->display_options['arguments']['field_os2web_meetings_committee_tid']['summary_options']['items_per_page'] = '25';
  /* Contextual filter: Indholdselement: Type (field_os2web_meetings_type) */
  $handler->display->display_options['arguments']['field_os2web_meetings_type_value']['id'] = 'field_os2web_meetings_type_value';
  $handler->display->display_options['arguments']['field_os2web_meetings_type_value']['table'] = 'field_data_field_os2web_meetings_type';
  $handler->display->display_options['arguments']['field_os2web_meetings_type_value']['field'] = 'field_os2web_meetings_type_value';
  $handler->display->display_options['arguments']['field_os2web_meetings_type_value']['exception']['title'] = 'Alle';
  $handler->display->display_options['arguments']['field_os2web_meetings_type_value']['default_argument_type'] = 'fixed';
  $handler->display->display_options['arguments']['field_os2web_meetings_type_value']['summary']['number_of_records'] = '0';
  $handler->display->display_options['arguments']['field_os2web_meetings_type_value']['summary']['format'] = 'default_summary';
  $handler->display->display_options['arguments']['field_os2web_meetings_type_value']['summary_options']['items_per_page'] = '25';
  $handler->display->display_options['arguments']['field_os2web_meetings_type_value']['limit'] = '0';
  /* Filter criterion: Content: Published */
  $handler->display->display_options['filters']['status']['id'] = 'status';
  $handler->display->display_options['filters']['status']['table'] = 'node';
  $handler->display->display_options['filters']['status']['field'] = 'status';
  $handler->display->display_options['filters']['status']['value'] = 1;
  $handler->display->display_options['filters']['status']['group'] = 1;
  $handler->display->display_options['filters']['status']['expose']['operator'] = FALSE;
  /* Filter criterion: Content: Type */
  $handler->display->display_options['filters']['type']['id'] = 'type';
  $handler->display->display_options['filters']['type']['table'] = 'node';
  $handler->display->display_options['filters']['type']['field'] = 'type';
  $handler->display->display_options['filters']['type']['value'] = array(
    'os2web_meetings_meeting' => 'os2web_meetings_meeting',
  );

  /* Display: Feed */
  $handler = $view->new_display('feed', 'Feed', 'feed_1');
  $handler->display->display_options['defaults']['hide_admin_links'] = FALSE;
  $handler->display->display_options['pager']['type'] = 'some';
  $handler->display->display_options['pager']['options']['items_per_page'] = '25';
  $handler->display->display_options['pager']['options']['offset'] = '0';
  $handler->display->display_options['style_plugin'] = 'rss';
  $handler->display->display_options['row_plugin'] = 'rss_fields';
  $handler->display->display_options['row_options']['title_field'] = 'nothing_1';
  $handler->display->display_options['row_options']['link_field'] = 'link_to_revision';
  $handler->display->display_options['row_options']['description_field'] = 'nothing';
  $handler->display->display_options['row_options']['creator_field'] = 'field_os2web_meetings_committee';
  $handler->display->display_options['row_options']['date_field'] = 'field_os2web_meetings_date';
  $handler->display->display_options['row_options']['guid_field_options'] = array(
    'guid_field' => 'nid',
    'guid_field_is_permalink' => 0,
  );
  $handler->display->display_options['path'] = 'os2web_meetings_meetings-feed';
  $handler->display->display_options['sitename_title'] = 0;
  $translatables['os2web_meetings_view_feeds'] = array(
    t('Master'),
    t('Dagsordner og referater i Syddjurs Kommune'),
    t('mere'),
    t('Udfør'),
    t('Gendan'),
    t('Sortér efter'),
    t('Stigende'),
    t('Faldende'),
    t('Antal elementer'),
    t('- Alle -'),
    t('Forskydning'),
    t('« første'),
    t('‹ forrige'),
    t('næste ›'),
    t('sidste »'),
    t('[field_os2web_meetings_type] af [field_os2web_meetings_committee] d. [field_os2web_meetings_date]'),
    t('[field_os2web_meetings_committee] - [field_os2web_meetings_date]'),
    t('Alle'),
    t('Feed'),
    t('more'),
  );
  $export['os2web_meetings_view_feeds'] = $view;

  $view = new view();
  $view->name = 'os2web_meetings_view_feeds_list';
  $view->description = 'Creates links to all feeds';
  $view->tag = 'default';
  $view->base_table = 'taxonomy_term_data';
  $view->human_name = 'Meeting feeds list';
  $view->core = 7;
  $view->api_version = '3.0';
  $view->disabled = FALSE; /* Edit this to true to make a default view disabled initially */

  /* Display: Master */
  $handler = $view->new_display('default', 'Master', 'default');
  $handler->display->display_options['title'] = 'Feeds til opdateringer om dagsordner og referater';
  $handler->display->display_options['use_more_always'] = FALSE;
  $handler->display->display_options['use_more_text'] = 'mere';
  $handler->display->display_options['access']['type'] = 'perm';
  $handler->display->display_options['cache']['type'] = 'time';
  $handler->display->display_options['cache']['results_lifespan'] = '3600';
  $handler->display->display_options['cache']['results_lifespan_custom'] = '0';
  $handler->display->display_options['cache']['output_lifespan'] = '3600';
  $handler->display->display_options['cache']['output_lifespan_custom'] = '0';
  $handler->display->display_options['query']['type'] = 'views_query';
  $handler->display->display_options['query']['options']['distinct'] = TRUE;
  $handler->display->display_options['exposed_form']['type'] = 'basic';
  $handler->display->display_options['exposed_form']['options']['submit_button'] = 'Udfør';
  $handler->display->display_options['exposed_form']['options']['reset_button_label'] = 'Gendan';
  $handler->display->display_options['exposed_form']['options']['exposed_sorts_label'] = 'Sortér efter';
  $handler->display->display_options['exposed_form']['options']['sort_asc_label'] = 'Stigende';
  $handler->display->display_options['exposed_form']['options']['sort_desc_label'] = 'Faldende';
  $handler->display->display_options['pager']['type'] = 'none';
  $handler->display->display_options['style_plugin'] = 'table';
  /* Relationship: Taxonomy term: Indholdselement using Committee */
  $handler->display->display_options['relationships']['reverse_field_os2web_meetings_committee_node']['id'] = 'reverse_field_os2web_meetings_committee_node';
  $handler->display->display_options['relationships']['reverse_field_os2web_meetings_committee_node']['table'] = 'taxonomy_term_data';
  $handler->display->display_options['relationships']['reverse_field_os2web_meetings_committee_node']['field'] = 'reverse_field_os2web_meetings_committee_node';
  $handler->display->display_options['relationships']['reverse_field_os2web_meetings_committee_node']['required'] = TRUE;
  /* Field: Taxonomy term: Name */
  $handler->display->display_options['fields']['name']['id'] = 'name';
  $handler->display->display_options['fields']['name']['table'] = 'taxonomy_term_data';
  $handler->display->display_options['fields']['name']['field'] = 'name';
  $handler->display->display_options['fields']['name']['alter']['word_boundary'] = FALSE;
  $handler->display->display_options['fields']['name']['alter']['ellipsis'] = FALSE;
  /* Field: Taxonomy term: Term ID */
  $handler->display->display_options['fields']['tid']['id'] = 'tid';
  $handler->display->display_options['fields']['tid']['table'] = 'taxonomy_term_data';
  $handler->display->display_options['fields']['tid']['field'] = 'tid';
  $handler->display->display_options['fields']['tid']['label'] = '';
  $handler->display->display_options['fields']['tid']['exclude'] = TRUE;
  $handler->display->display_options['fields']['tid']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['tid']['separator'] = '';
  /* Field: Global: Custom text */
  $handler->display->display_options['fields']['nothing']['id'] = 'nothing';
  $handler->display->display_options['fields']['nothing']['table'] = 'views';
  $handler->display->display_options['fields']['nothing']['field'] = 'nothing';
  $handler->display->display_options['fields']['nothing']['label'] = '';
  $handler->display->display_options['fields']['nothing']['exclude'] = TRUE;
  $handler->display->display_options['fields']['nothing']['alter']['text'] = 'Referater';
  $handler->display->display_options['fields']['nothing']['alter']['make_link'] = TRUE;
  $handler->display->display_options['fields']['nothing']['alter']['path'] = 'os2web_meetings_meetings-feed/[tid]/referat';
  $handler->display->display_options['fields']['nothing']['alter']['absolute'] = TRUE;
  $handler->display->display_options['fields']['nothing']['alter']['alt'] = 'Referat feed';
  $handler->display->display_options['fields']['nothing']['element_label_colon'] = FALSE;
  /* Field: Global: Custom text */
  $handler->display->display_options['fields']['nothing_1']['id'] = 'nothing_1';
  $handler->display->display_options['fields']['nothing_1']['table'] = 'views';
  $handler->display->display_options['fields']['nothing_1']['field'] = 'nothing';
  $handler->display->display_options['fields']['nothing_1']['label'] = '';
  $handler->display->display_options['fields']['nothing_1']['exclude'] = TRUE;
  $handler->display->display_options['fields']['nothing_1']['alter']['text'] = 'Dagordner';
  $handler->display->display_options['fields']['nothing_1']['alter']['make_link'] = TRUE;
  $handler->display->display_options['fields']['nothing_1']['alter']['path'] = 'os2web_meetings_meetings-feed/[tid]/dagsorden';
  $handler->display->display_options['fields']['nothing_1']['alter']['absolute'] = TRUE;
  $handler->display->display_options['fields']['nothing_1']['alter']['alt'] = 'Feed med dagsordner';
  $handler->display->display_options['fields']['nothing_1']['element_label_colon'] = FALSE;
  /* Field: Global: Custom text */
  $handler->display->display_options['fields']['nothing_3']['id'] = 'nothing_3';
  $handler->display->display_options['fields']['nothing_3']['table'] = 'views';
  $handler->display->display_options['fields']['nothing_3']['field'] = 'nothing';
  $handler->display->display_options['fields']['nothing_3']['label'] = '';
  $handler->display->display_options['fields']['nothing_3']['exclude'] = TRUE;
  $handler->display->display_options['fields']['nothing_3']['alter']['text'] = 'Alle';
  $handler->display->display_options['fields']['nothing_3']['alter']['make_link'] = TRUE;
  $handler->display->display_options['fields']['nothing_3']['alter']['path'] = 'os2web_meetings_meetings-feed/[tid]';
  $handler->display->display_options['fields']['nothing_3']['alter']['absolute'] = TRUE;
  $handler->display->display_options['fields']['nothing_3']['element_label_colon'] = FALSE;
  /* Field: Global: Custom text */
  $handler->display->display_options['fields']['nothing_2']['id'] = 'nothing_2';
  $handler->display->display_options['fields']['nothing_2']['table'] = 'views';
  $handler->display->display_options['fields']['nothing_2']['field'] = 'nothing';
  $handler->display->display_options['fields']['nothing_2']['label'] = 'Feeds';
  $handler->display->display_options['fields']['nothing_2']['alter']['text'] = '[nothing] / [nothing_1] / [nothing_3]';
  /* Sort criterion: Taxonomy term: Name */
  $handler->display->display_options['sorts']['name']['id'] = 'name';
  $handler->display->display_options['sorts']['name']['table'] = 'taxonomy_term_data';
  $handler->display->display_options['sorts']['name']['field'] = 'name';
  /* Filter criterion: Taxonomy vocabulary: Machine name */
  $handler->display->display_options['filters']['machine_name']['id'] = 'machine_name';
  $handler->display->display_options['filters']['machine_name']['table'] = 'taxonomy_vocabulary';
  $handler->display->display_options['filters']['machine_name']['field'] = 'machine_name';
  $handler->display->display_options['filters']['machine_name']['value'] = array(
    'os2web_meetings_tax_committee' => 'os2web_meetings_tax_committee',
  );

  /* Display: Page */
  $handler = $view->new_display('page', 'Page', 'page');
  $handler->display->display_options['defaults']['hide_admin_links'] = FALSE;
  $handler->display->display_options['path'] = 'os2web_meetings_meeting-feeds-list';
  $translatables['os2web_meetings_view_feeds_list'] = array(
    t('Master'),
    t('Feeds til opdateringer om dagsordner og referater'),
    t('mere'),
    t('Udfør'),
    t('Gendan'),
    t('Sortér efter'),
    t('Stigende'),
    t('Faldende'),
    t('field_os2web_meetings_committee'),
    t('Name'),
    t('.'),
    t('Referater'),
    t('Referat feed'),
    t('Dagordner'),
    t('Feed med dagsordner'),
    t('Alle'),
    t('Feeds'),
    t('[nothing] / [nothing_1] / [nothing_3]'),
    t('Page'),
    t('more'),
  );
  $export['os2web_meetings_view_feeds_list'] = $view;

  $view = new view();
  $view->name = 'os2web_meetings_view_latest';
  $view->description = '';
  $view->tag = 'default';
  $view->base_table = 'node';
  $view->human_name = 'Seneste 8 møder i de stående politiske udvalg:';
  $view->core = 7;
  $view->api_version = '3.0';
  $view->disabled = FALSE; /* Edit this to true to make a default view disabled initially */

  /* Display: Master */
  $handler = $view->new_display('default', 'Master', 'default');
  $handler->display->display_options['title'] = 'Seneste 8 møder i de stående politiske udvalg';
  $handler->display->display_options['css_class'] = 'front-page-content-block';
  $handler->display->display_options['use_ajax'] = TRUE;
  $handler->display->display_options['use_more_always'] = FALSE;
  $handler->display->display_options['use_more_text'] = 'mere';
  $handler->display->display_options['access']['type'] = 'role';
  $handler->display->display_options['access']['role'] = array(
    2 => '2',
  );
  $handler->display->display_options['cache']['type'] = 'none';
  $handler->display->display_options['query']['type'] = 'views_query';
  $handler->display->display_options['query']['options']['query_comment'] = FALSE;
  $handler->display->display_options['exposed_form']['type'] = 'basic';
  $handler->display->display_options['exposed_form']['options']['submit_button'] = 'Udfør';
  $handler->display->display_options['exposed_form']['options']['reset_button_label'] = 'Gendan';
  $handler->display->display_options['exposed_form']['options']['exposed_sorts_label'] = 'Sortér efter';
  $handler->display->display_options['exposed_form']['options']['sort_asc_label'] = 'Stigende';
  $handler->display->display_options['exposed_form']['options']['sort_desc_label'] = 'Faldende';
  $handler->display->display_options['pager']['type'] = 'some';
  $handler->display->display_options['pager']['options']['items_per_page'] = '8';
  $handler->display->display_options['pager']['options']['offset'] = '0';
  $handler->display->display_options['style_plugin'] = 'table';
  $handler->display->display_options['style_options']['columns'] = array(
    'nid' => 'nid',
    'field_os2web_meetings_status' => 'field_os2web_meetings_status',
    'title' => 'title',
    'php' => 'title',
    'field_os2web_meetings_date' => 'field_os2web_meetings_date',
    'field_os2web_meetings_location' => 'field_os2web_meetings_location',
    'field_os2web_meetings_committee' => 'field_os2web_meetings_committee',
  );
  $handler->display->display_options['style_options']['default'] = '-1';
  $handler->display->display_options['style_options']['info'] = array(
    'nid' => array(
      'sortable' => 0,
      'default_sort_order' => 'asc',
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
    'field_os2web_meetings_status' => array(
      'sortable' => 0,
      'default_sort_order' => 'asc',
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
    'title' => array(
      'sortable' => 0,
      'default_sort_order' => 'asc',
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
    'php' => array(
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
    'field_os2web_meetings_date' => array(
      'sortable' => 0,
      'default_sort_order' => 'asc',
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
    'field_os2web_meetings_location' => array(
      'sortable' => 0,
      'default_sort_order' => 'asc',
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
    'field_os2web_meetings_committee' => array(
      'sortable' => 0,
      'default_sort_order' => 'asc',
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
  );
  /* Header: Global: Text area */
  $handler->display->display_options['header']['area']['id'] = 'area';
  $handler->display->display_options['header']['area']['table'] = 'views';
  $handler->display->display_options['header']['area']['field'] = 'area';
  $handler->display->display_options['header']['area']['empty'] = TRUE;
  $handler->display->display_options['header']['area']['content'] = '<div class="help-button" title="Help text goes here"></div>';
  $handler->display->display_options['header']['area']['format'] = 'full_html';
  /* Relationship: Indholdselement: Committee (field_os2web_meetings_committee) */
  $handler->display->display_options['relationships']['field_os2web_meetings_committee_tid']['id'] = 'field_os2web_meetings_committee_tid';
  $handler->display->display_options['relationships']['field_os2web_meetings_committee_tid']['table'] = 'field_data_field_os2web_meetings_committee';
  $handler->display->display_options['relationships']['field_os2web_meetings_committee_tid']['field'] = 'field_os2web_meetings_committee_tid';
  /* Relationship: Broken/missing handler */
  $handler->display->display_options['relationships']['reverse_field_user_committee_user']['id'] = 'reverse_field_user_committee_user';
  $handler->display->display_options['relationships']['reverse_field_user_committee_user']['table'] = 'taxonomy_term_data';
  $handler->display->display_options['relationships']['reverse_field_user_committee_user']['field'] = 'reverse_field_user_committee_user';
  $handler->display->display_options['relationships']['reverse_field_user_committee_user']['relationship'] = 'field_os2web_meetings_committee_tid';
  /* Field: Content: Nid */
  $handler->display->display_options['fields']['nid']['id'] = 'nid';
  $handler->display->display_options['fields']['nid']['table'] = 'node';
  $handler->display->display_options['fields']['nid']['field'] = 'nid';
  $handler->display->display_options['fields']['nid']['label'] = '';
  $handler->display->display_options['fields']['nid']['exclude'] = TRUE;
  $handler->display->display_options['fields']['nid']['element_label_colon'] = FALSE;
  /* Field: Indholdselement: Status */
  $handler->display->display_options['fields']['field_os2web_meetings_status']['id'] = 'field_os2web_meetings_status';
  $handler->display->display_options['fields']['field_os2web_meetings_status']['table'] = 'field_data_field_os2web_meetings_status';
  $handler->display->display_options['fields']['field_os2web_meetings_status']['field'] = 'field_os2web_meetings_status';
  /* Field: Content: Title */
  $handler->display->display_options['fields']['title']['id'] = 'title';
  $handler->display->display_options['fields']['title']['table'] = 'node';
  $handler->display->display_options['fields']['title']['field'] = 'title';
  $handler->display->display_options['fields']['title']['alter']['make_link'] = TRUE;
  $handler->display->display_options['fields']['title']['alter']['path'] = 'os2web_meetings_meeting/[nid]';
  $handler->display->display_options['fields']['title']['link_to_node'] = FALSE;
  /* Field: indicator - has notes */
  $handler->display->display_options['fields']['php']['id'] = 'php';
  $handler->display->display_options['fields']['php']['table'] = 'views';
  $handler->display->display_options['fields']['php']['field'] = 'php';
  $handler->display->display_options['fields']['php']['ui_name'] = 'indicator - has notes';
  $handler->display->display_options['fields']['php']['use_php_setup'] = 0;
  $handler->display->display_options['fields']['php']['php_output'] = '<?php
$annotations = annotator_get_notes_by_meeting_id($row->nid);
if (!empty($annotations))
print("<div class=\\"indicator-has-notes\\"></div>");
?>';
  $handler->display->display_options['fields']['php']['use_php_click_sortable'] = '0';
  $handler->display->display_options['fields']['php']['php_click_sortable'] = '';
  /* Field: Indholdselement: Date */
  $handler->display->display_options['fields']['field_os2web_meetings_date']['id'] = 'field_os2web_meetings_date';
  $handler->display->display_options['fields']['field_os2web_meetings_date']['table'] = 'field_data_field_os2web_meetings_date';
  $handler->display->display_options['fields']['field_os2web_meetings_date']['field'] = 'field_os2web_meetings_date';
  $handler->display->display_options['fields']['field_os2web_meetings_date']['label'] = 'Dato';
  $handler->display->display_options['fields']['field_os2web_meetings_date']['settings'] = array(
    'format_type' => 'short',
    'fromto' => 'value',
    'multiple_number' => '',
    'multiple_from' => '',
    'multiple_to' => '',
  );
  /* Field: Indholdselement: Lokation */
  $handler->display->display_options['fields']['field_os2web_meetings_location']['id'] = 'field_os2web_meetings_location';
  $handler->display->display_options['fields']['field_os2web_meetings_location']['table'] = 'field_data_field_os2web_meetings_location';
  $handler->display->display_options['fields']['field_os2web_meetings_location']['field'] = 'field_os2web_meetings_location';
  $handler->display->display_options['fields']['field_os2web_meetings_location']['type'] = 'taxonomy_term_reference_plain';
  /* Field: Indholdselement: Committee */
  $handler->display->display_options['fields']['field_os2web_meetings_committee']['id'] = 'field_os2web_meetings_committee';
  $handler->display->display_options['fields']['field_os2web_meetings_committee']['table'] = 'field_data_field_os2web_meetings_committee';
  $handler->display->display_options['fields']['field_os2web_meetings_committee']['field'] = 'field_os2web_meetings_committee';
  $handler->display->display_options['fields']['field_os2web_meetings_committee']['label'] = 'Udvalg';
  $handler->display->display_options['fields']['field_os2web_meetings_committee']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_os2web_meetings_committee']['type'] = 'taxonomy_term_reference_plain';
  /* Sort criterion: Indholdselement: Date -  start date (field_os2web_meetings_date) */
  $handler->display->display_options['sorts']['field_os2web_meetings_date_value']['id'] = 'field_os2web_meetings_date_value';
  $handler->display->display_options['sorts']['field_os2web_meetings_date_value']['table'] = 'field_data_field_os2web_meetings_date';
  $handler->display->display_options['sorts']['field_os2web_meetings_date_value']['field'] = 'field_os2web_meetings_date_value';
  /* Filter criterion: Content: Published */
  $handler->display->display_options['filters']['status']['id'] = 'status';
  $handler->display->display_options['filters']['status']['table'] = 'node';
  $handler->display->display_options['filters']['status']['field'] = 'status';
  $handler->display->display_options['filters']['status']['value'] = 1;
  $handler->display->display_options['filters']['status']['group'] = 1;
  $handler->display->display_options['filters']['status']['expose']['operator'] = FALSE;
  /* Filter criterion: Content: Type */
  $handler->display->display_options['filters']['type']['id'] = 'type';
  $handler->display->display_options['filters']['type']['table'] = 'node';
  $handler->display->display_options['filters']['type']['field'] = 'type';
  $handler->display->display_options['filters']['type']['value'] = array(
    'os2web_meetings_meeting' => 'os2web_meetings_meeting',
  );
  /* Filter criterion: Indholdselement: Regular (field_os2web_meetings_is_regular) */
  $handler->display->display_options['filters']['field_os2web_meetings_is_regular_value']['id'] = 'field_os2web_meetings_is_regular_value';
  $handler->display->display_options['filters']['field_os2web_meetings_is_regular_value']['table'] = 'field_data_field_os2web_meetings_is_regular';
  $handler->display->display_options['filters']['field_os2web_meetings_is_regular_value']['field'] = 'field_os2web_meetings_is_regular_value';
  $handler->display->display_options['filters']['field_os2web_meetings_is_regular_value']['value'] = array(
    1 => '1',
  );

  /* Display: Block */
  $handler = $view->new_display('block', 'Block', 'block');
  $handler->display->display_options['defaults']['hide_admin_links'] = FALSE;
  $translatables['os2web_meetings_view_latest'] = array(
    t('Master'),
    t('Seneste 8 møder i de stående politiske udvalg'),
    t('mere'),
    t('Udfør'),
    t('Gendan'),
    t('Sortér efter'),
    t('Stigende'),
    t('Faldende'),
    t('<div class="help-button" title="Help text goes here"></div>'),
    t('term from field_os2web_meetings_committee'),
    t('reverse_field_user_committee_user'),
    t('Status'),
    t('Title'),
    t('PHP'),
    t('Dato'),
    t('Lokation'),
    t('Udvalg'),
    t('Block'),
    t('more'),
  );
  $export['os2web_meetings_view_latest'] = $view;

  $view = new view();
  $view->name = 'os2web_meetings_view_search';
  $view->description = '';
  $view->tag = 'default';
  $view->base_table = 'node';
  $view->human_name = 'Meetings search';
  $view->core = 7;
  $view->api_version = '3.0';
  $view->disabled = FALSE; /* Edit this to true to make a default view disabled initially */

  /* Display: Master */
  $handler = $view->new_display('default', 'Master', 'default');
  $handler->display->display_options['title'] = 'Søg i dagsordener og referater';
  $handler->display->display_options['use_more_always'] = FALSE;
  $handler->display->display_options['use_more_text'] = 'mere';
  $handler->display->display_options['access']['type'] = 'none';
  $handler->display->display_options['cache']['type'] = 'none';
  $handler->display->display_options['query']['type'] = 'views_query';
  $handler->display->display_options['query']['options']['distinct'] = TRUE;
  $handler->display->display_options['exposed_form']['type'] = 'better_exposed_filters';
  $handler->display->display_options['exposed_form']['options']['submit_button'] = 'Søg';
  $handler->display->display_options['exposed_form']['options']['reset_button_label'] = 'Gendan';
  $handler->display->display_options['exposed_form']['options']['exposed_sorts_label'] = 'Sortér efter';
  $handler->display->display_options['exposed_form']['options']['sort_asc_label'] = 'Stigende';
  $handler->display->display_options['exposed_form']['options']['sort_desc_label'] = 'Faldende';
  $handler->display->display_options['exposed_form']['options']['bef'] = array(
    'general' => array(
      'allow_secondary' => 0,
      'secondary_label' => 'Advanced options',
    ),
    'field_os2web_meetings_date_value' => array(
      'bef_format' => 'default',
      'more_options' => array(
        'is_secondary' => 0,
        'bef_filter_description' => '',
        'tokens' => array(
          'available' => array(
            0 => 'global_types',
          ),
        ),
      ),
    ),
    'field_os2web_meetings_date_value2' => array(
      'bef_format' => 'default',
      'more_options' => array(
        'is_secondary' => 0,
        'bef_filter_description' => '',
        'tokens' => array(
          'available' => array(
            0 => 'global_types',
          ),
        ),
      ),
    ),
    'field_os2web_meetings_committee_tid' => array(
      'bef_format' => 'default',
      'more_options' => array(
        'bef_select_all_none' => 0,
        'bef_collapsible' => 0,
        'is_secondary' => 0,
        'bef_filter_description' => '',
        'tokens' => array(
          'available' => array(
            0 => 'global_types',
          ),
        ),
      ),
    ),
  );
  $handler->display->display_options['pager']['type'] = 'mini';
  $handler->display->display_options['pager']['options']['items_per_page'] = '10';
  $handler->display->display_options['pager']['options']['offset'] = '0';
  $handler->display->display_options['pager']['options']['id'] = '0';
  $handler->display->display_options['pager']['options']['expose']['items_per_page_label'] = 'Antal elementer';
  $handler->display->display_options['pager']['options']['expose']['items_per_page_options_all_label'] = '- Alle -';
  $handler->display->display_options['pager']['options']['expose']['offset_label'] = 'Forskydning';
  $handler->display->display_options['pager']['options']['tags']['first'] = '« første';
  $handler->display->display_options['pager']['options']['tags']['previous'] = '‹ forrige';
  $handler->display->display_options['pager']['options']['tags']['next'] = 'næste ›';
  $handler->display->display_options['pager']['options']['tags']['last'] = 'sidste »';
  $handler->display->display_options['style_plugin'] = 'table';
  $handler->display->display_options['style_options']['columns'] = array(
    'nid' => 'nid',
    'title' => 'title',
    'field_os2web_meetings_committee' => 'field_os2web_meetings_committee',
    'field_os2web_meetings_date' => 'field_os2web_meetings_date',
    'field_os2web_meetings_location' => 'field_os2web_meetings_location',
  );
  $handler->display->display_options['style_options']['default'] = '-1';
  $handler->display->display_options['style_options']['info'] = array(
    'nid' => array(
      'sortable' => 0,
      'default_sort_order' => 'asc',
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
    'title' => array(
      'sortable' => 0,
      'default_sort_order' => 'asc',
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
    'field_os2web_meetings_committee' => array(
      'sortable' => 0,
      'default_sort_order' => 'asc',
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
    'field_os2web_meetings_date' => array(
      'sortable' => 0,
      'default_sort_order' => 'asc',
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
    'field_os2web_meetings_location' => array(
      'sortable' => 0,
      'default_sort_order' => 'asc',
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
  );
  /* Header: Global: Text area */
  $handler->display->display_options['header']['area']['id'] = 'area';
  $handler->display->display_options['header']['area']['table'] = 'views';
  $handler->display->display_options['header']['area']['field'] = 'area';
  $handler->display->display_options['header']['area']['empty'] = TRUE;
  $handler->display->display_options['header']['area']['content'] = '<div class="help-button" title="Help text goes here"></div>
';
  $handler->display->display_options['header']['area']['format'] = 'full_html';
  /* Footer: Global: View area */
  $handler->display->display_options['footer']['view']['id'] = 'view';
  $handler->display->display_options['footer']['view']['table'] = 'views';
  $handler->display->display_options['footer']['view']['field'] = 'view';
  $handler->display->display_options['footer']['view']['view_to_insert'] = 'os2web_meetings_view_search:block_1';
  /* Footer: Global: View area */
  $handler->display->display_options['footer']['view_1']['id'] = 'view_1';
  $handler->display->display_options['footer']['view_1']['table'] = 'views';
  $handler->display->display_options['footer']['view_1']['field'] = 'view';
  /* No results behavior: Global: Text area */
  $handler->display->display_options['empty']['area']['id'] = 'area';
  $handler->display->display_options['empty']['area']['table'] = 'views';
  $handler->display->display_options['empty']['area']['field'] = 'area';
  $handler->display->display_options['empty']['area']['format'] = 'filtered_html';
  /* Field: Content: Nid */
  $handler->display->display_options['fields']['nid']['id'] = 'nid';
  $handler->display->display_options['fields']['nid']['table'] = 'node';
  $handler->display->display_options['fields']['nid']['field'] = 'nid';
  $handler->display->display_options['fields']['nid']['label'] = '';
  $handler->display->display_options['fields']['nid']['exclude'] = TRUE;
  $handler->display->display_options['fields']['nid']['element_label_colon'] = FALSE;
  /* Field: Content: Title */
  $handler->display->display_options['fields']['title']['id'] = 'title';
  $handler->display->display_options['fields']['title']['table'] = 'node';
  $handler->display->display_options['fields']['title']['field'] = 'title';
  $handler->display->display_options['fields']['title']['exclude'] = TRUE;
  $handler->display->display_options['fields']['title']['alter']['path'] = 'os2web_meetings_meeting/[nid]';
  /* Field: Indholdselement: Committee */
  $handler->display->display_options['fields']['field_os2web_meetings_committee']['id'] = 'field_os2web_meetings_committee';
  $handler->display->display_options['fields']['field_os2web_meetings_committee']['table'] = 'field_data_field_os2web_meetings_committee';
  $handler->display->display_options['fields']['field_os2web_meetings_committee']['field'] = 'field_os2web_meetings_committee';
  $handler->display->display_options['fields']['field_os2web_meetings_committee']['label'] = 'Søgeresultat';
  $handler->display->display_options['fields']['field_os2web_meetings_committee']['alter']['make_link'] = TRUE;
  $handler->display->display_options['fields']['field_os2web_meetings_committee']['alter']['path'] = 'node/[nid]';
  $handler->display->display_options['fields']['field_os2web_meetings_committee']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_os2web_meetings_committee']['type'] = 'taxonomy_term_reference_plain';
  /* Field: Indholdselement: Date */
  $handler->display->display_options['fields']['field_os2web_meetings_date']['id'] = 'field_os2web_meetings_date';
  $handler->display->display_options['fields']['field_os2web_meetings_date']['table'] = 'field_data_field_os2web_meetings_date';
  $handler->display->display_options['fields']['field_os2web_meetings_date']['field'] = 'field_os2web_meetings_date';
  $handler->display->display_options['fields']['field_os2web_meetings_date']['label'] = '';
  $handler->display->display_options['fields']['field_os2web_meetings_date']['alter']['make_link'] = TRUE;
  $handler->display->display_options['fields']['field_os2web_meetings_date']['alter']['path'] = 'node/[nid]';
  $handler->display->display_options['fields']['field_os2web_meetings_date']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_os2web_meetings_date']['settings'] = array(
    'format_type' => 'short',
    'fromto' => 'value',
    'multiple_number' => '',
    'multiple_from' => '',
    'multiple_to' => '',
  );
  /* Field: Indholdselement: Lokation */
  $handler->display->display_options['fields']['field_os2web_meetings_location']['id'] = 'field_os2web_meetings_location';
  $handler->display->display_options['fields']['field_os2web_meetings_location']['table'] = 'field_data_field_os2web_meetings_location';
  $handler->display->display_options['fields']['field_os2web_meetings_location']['field'] = 'field_os2web_meetings_location';
  $handler->display->display_options['fields']['field_os2web_meetings_location']['label'] = '';
  $handler->display->display_options['fields']['field_os2web_meetings_location']['exclude'] = TRUE;
  $handler->display->display_options['fields']['field_os2web_meetings_location']['alter']['make_link'] = TRUE;
  $handler->display->display_options['fields']['field_os2web_meetings_location']['alter']['path'] = 'node/[nid]';
  $handler->display->display_options['fields']['field_os2web_meetings_location']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_os2web_meetings_location']['type'] = 'taxonomy_term_reference_plain';
  /* Sort criterion: Indholdselement: Date -  start date (field_os2web_meetings_date) */
  $handler->display->display_options['sorts']['field_os2web_meetings_date_value']['id'] = 'field_os2web_meetings_date_value';
  $handler->display->display_options['sorts']['field_os2web_meetings_date_value']['table'] = 'field_data_field_os2web_meetings_date';
  $handler->display->display_options['sorts']['field_os2web_meetings_date_value']['field'] = 'field_os2web_meetings_date_value';
  $handler->display->display_options['sorts']['field_os2web_meetings_date_value']['order'] = 'DESC';
  /* Filter criterion: Content: Published */
  $handler->display->display_options['filters']['status']['id'] = 'status';
  $handler->display->display_options['filters']['status']['table'] = 'node';
  $handler->display->display_options['filters']['status']['field'] = 'status';
  $handler->display->display_options['filters']['status']['value'] = 1;
  $handler->display->display_options['filters']['status']['group'] = 1;
  $handler->display->display_options['filters']['status']['expose']['operator'] = FALSE;
  /* Filter criterion: Content: Type */
  $handler->display->display_options['filters']['type']['id'] = 'type';
  $handler->display->display_options['filters']['type']['table'] = 'node';
  $handler->display->display_options['filters']['type']['field'] = 'type';
  $handler->display->display_options['filters']['type']['value'] = array(
    'os2web_meetings_meeting' => 'os2web_meetings_meeting',
  );
  /* Filter criterion: Indholdselement: Date -  start date (field_os2web_meetings_date) */
  $handler->display->display_options['filters']['field_os2web_meetings_date_value']['id'] = 'field_os2web_meetings_date_value';
  $handler->display->display_options['filters']['field_os2web_meetings_date_value']['table'] = 'field_data_field_os2web_meetings_date';
  $handler->display->display_options['filters']['field_os2web_meetings_date_value']['field'] = 'field_os2web_meetings_date_value';
  $handler->display->display_options['filters']['field_os2web_meetings_date_value']['expose']['operator_id'] = 'field_os2web_meetings_date_value_op';
  $handler->display->display_options['filters']['field_os2web_meetings_date_value']['expose']['label'] = 'Date -  start date (field_os2web_meetings_date)';
  $handler->display->display_options['filters']['field_os2web_meetings_date_value']['expose']['operator'] = 'field_os2web_meetings_date_value_op';
  $handler->display->display_options['filters']['field_os2web_meetings_date_value']['expose']['identifier'] = 'field_os2web_meetings_date_value';

  /* Display: Page */
  $handler = $view->new_display('page', 'Page', 'page');
  $handler->display->display_options['defaults']['css_class'] = FALSE;
  $handler->display->display_options['css_class'] = 'dagsorden';
  $handler->display->display_options['defaults']['hide_admin_links'] = FALSE;
  $handler->display->display_options['defaults']['style_plugin'] = FALSE;
  $handler->display->display_options['style_plugin'] = 'table';
  $handler->display->display_options['style_options']['columns'] = array(
    'nid' => 'nid',
    'title' => 'title',
    'field_os2web_meetings_committee' => 'field_os2web_meetings_committee',
    'field_os2web_meetings_date' => 'field_os2web_meetings_date',
    'field_os2web_meetings_location' => 'field_os2web_meetings_location',
  );
  $handler->display->display_options['style_options']['default'] = '-1';
  $handler->display->display_options['style_options']['info'] = array(
    'nid' => array(
      'sortable' => 0,
      'default_sort_order' => 'asc',
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
    'title' => array(
      'sortable' => 0,
      'default_sort_order' => 'asc',
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
    'field_os2web_meetings_committee' => array(
      'sortable' => 0,
      'default_sort_order' => 'asc',
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
    'field_os2web_meetings_date' => array(
      'sortable' => 0,
      'default_sort_order' => 'asc',
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
    'field_os2web_meetings_location' => array(
      'sortable' => 0,
      'default_sort_order' => 'asc',
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
  );
  $handler->display->display_options['defaults']['style_options'] = FALSE;
  $handler->display->display_options['defaults']['row_plugin'] = FALSE;
  $handler->display->display_options['defaults']['row_options'] = FALSE;
  $handler->display->display_options['defaults']['header'] = FALSE;
  /* Header: Global: Text area */
  $handler->display->display_options['header']['area']['id'] = 'area';
  $handler->display->display_options['header']['area']['table'] = 'views';
  $handler->display->display_options['header']['area']['field'] = 'area';
  $handler->display->display_options['header']['area']['empty'] = TRUE;
  $handler->display->display_options['header']['area']['content'] = '<div class="help-button" title="Help text goes here"></div>';
  $handler->display->display_options['header']['area']['format'] = 'full_html';
  /* Header: Global: View area */
  $handler->display->display_options['header']['view']['id'] = 'view';
  $handler->display->display_options['header']['view']['table'] = 'views';
  $handler->display->display_options['header']['view']['field'] = 'view';
  $handler->display->display_options['header']['view']['view_to_insert'] = 'os2web_meetings_view_search:block_3';
  /* Header: Global: Unfiltered text */
  $handler->display->display_options['header']['area_text_custom']['id'] = 'area_text_custom';
  $handler->display->display_options['header']['area_text_custom']['table'] = 'views';
  $handler->display->display_options['header']['area_text_custom']['field'] = 'area_text_custom';
  $handler->display->display_options['header']['area_text_custom']['label'] = 'Avanceret søgning';
  $handler->display->display_options['header']['area_text_custom']['empty'] = TRUE;
  $handler->display->display_options['header']['area_text_custom']['content'] = '<div class="meetings-advanced-search-link">Du kan søge efter fritekst <a href="/dagsorden-og-referat-avanceret" title="Advanceret søgning">her</a></div>';
  $handler->display->display_options['defaults']['footer'] = FALSE;
  /* Footer: Global: View area */
  $handler->display->display_options['footer']['view_1']['id'] = 'view_1';
  $handler->display->display_options['footer']['view_1']['table'] = 'views';
  $handler->display->display_options['footer']['view_1']['field'] = 'view';
  $handler->display->display_options['footer']['view_1']['view_to_insert'] = 'os2web_meetings_view_search:block_2';
  /* Footer: Global: View area */
  $handler->display->display_options['footer']['view']['id'] = 'view';
  $handler->display->display_options['footer']['view']['table'] = 'views';
  $handler->display->display_options['footer']['view']['field'] = 'view';
  $handler->display->display_options['footer']['view']['view_to_insert'] = 'os2web_meetings_view_search:block_1';
  $handler->display->display_options['defaults']['filter_groups'] = FALSE;
  $handler->display->display_options['defaults']['filters'] = FALSE;
  /* Filter criterion: Global: PHP */
  $handler->display->display_options['filters']['php']['id'] = 'php';
  $handler->display->display_options['filters']['php']['table'] = 'views';
  $handler->display->display_options['filters']['php']['field'] = 'php';
  $handler->display->display_options['filters']['php']['group'] = 1;
  $handler->display->display_options['filters']['php']['use_php_setup'] = 0;
  $handler->display->display_options['filters']['php']['php_filter'] = 'if (count($view->exposed_input)) {
return FALSE;
} else {
return TRUE;
}';
  /* Filter criterion: Content: Published */
  $handler->display->display_options['filters']['status']['id'] = 'status';
  $handler->display->display_options['filters']['status']['table'] = 'node';
  $handler->display->display_options['filters']['status']['field'] = 'status';
  $handler->display->display_options['filters']['status']['value'] = 1;
  $handler->display->display_options['filters']['status']['group'] = 1;
  $handler->display->display_options['filters']['status']['expose']['operator'] = FALSE;
  /* Filter criterion: Content: Type */
  $handler->display->display_options['filters']['type']['id'] = 'type';
  $handler->display->display_options['filters']['type']['table'] = 'node';
  $handler->display->display_options['filters']['type']['field'] = 'type';
  $handler->display->display_options['filters']['type']['value'] = array(
    'os2web_meetings_meeting' => 'os2web_meetings_meeting',
  );
  $handler->display->display_options['filters']['type']['group'] = 1;
  /* Filter criterion: Indholdselement: Search meta data (field_os2web_meetings_searchdata) */
  $handler->display->display_options['filters']['field_os2web_meetings_searchdata_value']['id'] = 'field_os2web_meetings_searchdata_value';
  $handler->display->display_options['filters']['field_os2web_meetings_searchdata_value']['table'] = 'field_data_field_os2web_meetings_searchdata';
  $handler->display->display_options['filters']['field_os2web_meetings_searchdata_value']['field'] = 'field_os2web_meetings_searchdata_value';
  $handler->display->display_options['filters']['field_os2web_meetings_searchdata_value']['operator'] = 'contains';
  $handler->display->display_options['filters']['field_os2web_meetings_searchdata_value']['group'] = 1;
  $handler->display->display_options['filters']['field_os2web_meetings_searchdata_value']['expose']['operator_id'] = 'field_os2web_meetings_searchdata_value_op';
  $handler->display->display_options['filters']['field_os2web_meetings_searchdata_value']['expose']['operator'] = 'field_os2web_meetings_searchdata_value_op';
  $handler->display->display_options['filters']['field_os2web_meetings_searchdata_value']['expose']['identifier'] = 'search_params';
  /* Filter criterion: Indholdselement: Date -  start date (field_os2web_meetings_date) */
  $handler->display->display_options['filters']['field_os2web_meetings_date_value']['id'] = 'field_os2web_meetings_date_value';
  $handler->display->display_options['filters']['field_os2web_meetings_date_value']['table'] = 'field_data_field_os2web_meetings_date';
  $handler->display->display_options['filters']['field_os2web_meetings_date_value']['field'] = 'field_os2web_meetings_date_value';
  $handler->display->display_options['filters']['field_os2web_meetings_date_value']['operator'] = '>=';
  $handler->display->display_options['filters']['field_os2web_meetings_date_value']['group'] = 1;
  $handler->display->display_options['filters']['field_os2web_meetings_date_value']['exposed'] = TRUE;
  $handler->display->display_options['filters']['field_os2web_meetings_date_value']['expose']['operator_id'] = 'field_os2web_meetings_date_value_op';
  $handler->display->display_options['filters']['field_os2web_meetings_date_value']['expose']['label'] = 'Møder fra dato';
  $handler->display->display_options['filters']['field_os2web_meetings_date_value']['expose']['operator'] = 'field_os2web_meetings_date_value_op';
  $handler->display->display_options['filters']['field_os2web_meetings_date_value']['expose']['identifier'] = 'from_date';
  $handler->display->display_options['filters']['field_os2web_meetings_date_value']['expose']['remember_roles'] = array(
    2 => '2',
    1 => 0,
    6 => 0,
    4 => 0,
    7 => 0,
    3 => 0,
    5 => 0,
  );
  $handler->display->display_options['filters']['field_os2web_meetings_date_value']['form_type'] = 'date_popup';
  $handler->display->display_options['filters']['field_os2web_meetings_date_value']['default_date'] = 'now -1 month';
  $handler->display->display_options['filters']['field_os2web_meetings_date_value']['year_range'] = '2007:+3';
  /* Filter criterion: Indholdselement: Date - end date (field_os2web_meetings_date:value2) */
  $handler->display->display_options['filters']['field_os2web_meetings_date_value2']['id'] = 'field_os2web_meetings_date_value2';
  $handler->display->display_options['filters']['field_os2web_meetings_date_value2']['table'] = 'field_data_field_os2web_meetings_date';
  $handler->display->display_options['filters']['field_os2web_meetings_date_value2']['field'] = 'field_os2web_meetings_date_value2';
  $handler->display->display_options['filters']['field_os2web_meetings_date_value2']['operator'] = '<=';
  $handler->display->display_options['filters']['field_os2web_meetings_date_value2']['group'] = 1;
  $handler->display->display_options['filters']['field_os2web_meetings_date_value2']['exposed'] = TRUE;
  $handler->display->display_options['filters']['field_os2web_meetings_date_value2']['expose']['operator_id'] = 'field_os2web_meetings_date_value2_op';
  $handler->display->display_options['filters']['field_os2web_meetings_date_value2']['expose']['label'] = 'Til dato';
  $handler->display->display_options['filters']['field_os2web_meetings_date_value2']['expose']['operator'] = 'field_os2web_meetings_date_value2_op';
  $handler->display->display_options['filters']['field_os2web_meetings_date_value2']['expose']['identifier'] = 'to_date';
  $handler->display->display_options['filters']['field_os2web_meetings_date_value2']['expose']['remember_roles'] = array(
    2 => '2',
    1 => 0,
    6 => 0,
    4 => 0,
    7 => 0,
    3 => 0,
    5 => 0,
  );
  $handler->display->display_options['filters']['field_os2web_meetings_date_value2']['form_type'] = 'date_popup';
  $handler->display->display_options['filters']['field_os2web_meetings_date_value2']['default_date'] = 'now';
  $handler->display->display_options['filters']['field_os2web_meetings_date_value2']['year_range'] = '2007:+3';
  /* Filter criterion: Indholdselement: Committee (field_os2web_meetings_committee) */
  $handler->display->display_options['filters']['field_os2web_meetings_committee_tid']['id'] = 'field_os2web_meetings_committee_tid';
  $handler->display->display_options['filters']['field_os2web_meetings_committee_tid']['table'] = 'field_data_field_os2web_meetings_committee';
  $handler->display->display_options['filters']['field_os2web_meetings_committee_tid']['field'] = 'field_os2web_meetings_committee_tid';
  $handler->display->display_options['filters']['field_os2web_meetings_committee_tid']['value'] = array(
    10974 => '10974',
    10976 => '10976',
    10983 => '10983',
    10989 => '10989',
    19779 => '19779',
    10990 => '10990',
    19371 => '19371',
    16254 => '16254',
    16256 => '16256',
    16258 => '16258',
    16257 => '16257',
    10975 => '10975',
    10972 => '10972',
  );
  $handler->display->display_options['filters']['field_os2web_meetings_committee_tid']['group'] = 1;
  $handler->display->display_options['filters']['field_os2web_meetings_committee_tid']['exposed'] = TRUE;
  $handler->display->display_options['filters']['field_os2web_meetings_committee_tid']['expose']['operator_id'] = 'field_os2web_meetings_committee_tid_op';
  $handler->display->display_options['filters']['field_os2web_meetings_committee_tid']['expose']['label'] = 'Vælg hvilket udvalg du vil se dagsordner og referater fra.';
  $handler->display->display_options['filters']['field_os2web_meetings_committee_tid']['expose']['operator'] = 'field_os2web_meetings_committee_tid_op';
  $handler->display->display_options['filters']['field_os2web_meetings_committee_tid']['expose']['identifier'] = 'os2web_meetings_tax_committee';
  $handler->display->display_options['filters']['field_os2web_meetings_committee_tid']['expose']['remember_roles'] = array(
    2 => '2',
    1 => 0,
    6 => 0,
    4 => 0,
    7 => 0,
    3 => 0,
    5 => 0,
  );
  $handler->display->display_options['filters']['field_os2web_meetings_committee_tid']['expose']['reduce'] = TRUE;
  $handler->display->display_options['filters']['field_os2web_meetings_committee_tid']['reduce_duplicates'] = TRUE;
  $handler->display->display_options['filters']['field_os2web_meetings_committee_tid']['type'] = 'select';
  $handler->display->display_options['filters']['field_os2web_meetings_committee_tid']['vocabulary'] = 'os2web_meetings_tax_committee';
  /* Filter criterion: Addenum */
  $handler->display->display_options['filters']['field_os2web_meetings_addendum_nid']['id'] = 'field_os2web_meetings_addendum_nid';
  $handler->display->display_options['filters']['field_os2web_meetings_addendum_nid']['table'] = 'field_data_field_os2web_meetings_addendum';
  $handler->display->display_options['filters']['field_os2web_meetings_addendum_nid']['field'] = 'field_os2web_meetings_addendum_nid';
  $handler->display->display_options['filters']['field_os2web_meetings_addendum_nid']['ui_name'] = 'Addenum';
  $handler->display->display_options['filters']['field_os2web_meetings_addendum_nid']['operator'] = 'empty';
  $handler->display->display_options['filters']['field_os2web_meetings_addendum_nid']['group'] = 1;
  $handler->display->display_options['path'] = 'dagsorden-og-referat';

  /* Display: Kommende */
  $handler = $view->new_display('block', 'Kommende', 'block_1');
  $handler->display->display_options['defaults']['hide_admin_links'] = FALSE;
  $handler->display->display_options['defaults']['cache'] = FALSE;
  $handler->display->display_options['cache']['type'] = 'time';
  $handler->display->display_options['cache']['results_lifespan'] = '1800';
  $handler->display->display_options['cache']['results_lifespan_custom'] = '0';
  $handler->display->display_options['cache']['output_lifespan'] = '1800';
  $handler->display->display_options['cache']['output_lifespan_custom'] = '0';
  $handler->display->display_options['defaults']['pager'] = FALSE;
  $handler->display->display_options['pager']['type'] = 'some';
  $handler->display->display_options['pager']['options']['items_per_page'] = '8';
  $handler->display->display_options['pager']['options']['offset'] = '0';
  $handler->display->display_options['defaults']['header'] = FALSE;
  /* Header: Global: Text area */
  $handler->display->display_options['header']['area']['id'] = 'area';
  $handler->display->display_options['header']['area']['table'] = 'views';
  $handler->display->display_options['header']['area']['field'] = 'area';
  $handler->display->display_options['header']['area']['empty'] = TRUE;
  $handler->display->display_options['header']['area']['content'] = '<div class="help-button" title="Seneste møder i alle udvalg med publicerede referater"></div>';
  $handler->display->display_options['header']['area']['format'] = 'full_html';
  $handler->display->display_options['defaults']['footer'] = FALSE;
  $handler->display->display_options['defaults']['fields'] = FALSE;
  /* Field: Content: Nid */
  $handler->display->display_options['fields']['nid']['id'] = 'nid';
  $handler->display->display_options['fields']['nid']['table'] = 'node';
  $handler->display->display_options['fields']['nid']['field'] = 'nid';
  $handler->display->display_options['fields']['nid']['label'] = '';
  $handler->display->display_options['fields']['nid']['exclude'] = TRUE;
  $handler->display->display_options['fields']['nid']['element_label_colon'] = FALSE;
  /* Field: Content: Title */
  $handler->display->display_options['fields']['title']['id'] = 'title';
  $handler->display->display_options['fields']['title']['table'] = 'node';
  $handler->display->display_options['fields']['title']['field'] = 'title';
  $handler->display->display_options['fields']['title']['exclude'] = TRUE;
  $handler->display->display_options['fields']['title']['alter']['make_link'] = TRUE;
  $handler->display->display_options['fields']['title']['alter']['path'] = 'os2web_meetings_meeting/[nid]';
  $handler->display->display_options['fields']['title']['link_to_node'] = FALSE;
  /* Field: Indholdselement: Committee */
  $handler->display->display_options['fields']['field_os2web_meetings_committee']['id'] = 'field_os2web_meetings_committee';
  $handler->display->display_options['fields']['field_os2web_meetings_committee']['table'] = 'field_data_field_os2web_meetings_committee';
  $handler->display->display_options['fields']['field_os2web_meetings_committee']['field'] = 'field_os2web_meetings_committee';
  $handler->display->display_options['fields']['field_os2web_meetings_committee']['label'] = 'Kommende møder med publicerede dagsordner';
  $handler->display->display_options['fields']['field_os2web_meetings_committee']['alter']['make_link'] = TRUE;
  $handler->display->display_options['fields']['field_os2web_meetings_committee']['alter']['path'] = 'node/[nid]';
  $handler->display->display_options['fields']['field_os2web_meetings_committee']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_os2web_meetings_committee']['type'] = 'taxonomy_term_reference_plain';
  /* Field: Indholdselement: Date */
  $handler->display->display_options['fields']['field_os2web_meetings_date']['id'] = 'field_os2web_meetings_date';
  $handler->display->display_options['fields']['field_os2web_meetings_date']['table'] = 'field_data_field_os2web_meetings_date';
  $handler->display->display_options['fields']['field_os2web_meetings_date']['field'] = 'field_os2web_meetings_date';
  $handler->display->display_options['fields']['field_os2web_meetings_date']['label'] = '';
  $handler->display->display_options['fields']['field_os2web_meetings_date']['alter']['make_link'] = TRUE;
  $handler->display->display_options['fields']['field_os2web_meetings_date']['alter']['path'] = 'node/[nid]';
  $handler->display->display_options['fields']['field_os2web_meetings_date']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_os2web_meetings_date']['settings'] = array(
    'format_type' => 'short',
    'fromto' => 'value',
    'multiple_number' => '',
    'multiple_from' => '',
    'multiple_to' => '',
  );
  $handler->display->display_options['defaults']['filter_groups'] = FALSE;
  $handler->display->display_options['defaults']['filters'] = FALSE;
  /* Filter criterion: Content: Published */
  $handler->display->display_options['filters']['status']['id'] = 'status';
  $handler->display->display_options['filters']['status']['table'] = 'node';
  $handler->display->display_options['filters']['status']['field'] = 'status';
  $handler->display->display_options['filters']['status']['value'] = 1;
  $handler->display->display_options['filters']['status']['group'] = 1;
  $handler->display->display_options['filters']['status']['expose']['operator'] = FALSE;
  /* Filter criterion: Content: Type */
  $handler->display->display_options['filters']['type']['id'] = 'type';
  $handler->display->display_options['filters']['type']['table'] = 'node';
  $handler->display->display_options['filters']['type']['field'] = 'type';
  $handler->display->display_options['filters']['type']['value'] = array(
    'os2web_meetings_meeting' => 'os2web_meetings_meeting',
  );
  /* Filter criterion: Indholdselement: Tillæg til (field_os2web_meetings_addendum) */
  $handler->display->display_options['filters']['field_os2web_meetings_addendum_nid']['id'] = 'field_os2web_meetings_addendum_nid';
  $handler->display->display_options['filters']['field_os2web_meetings_addendum_nid']['table'] = 'field_data_field_os2web_meetings_addendum';
  $handler->display->display_options['filters']['field_os2web_meetings_addendum_nid']['field'] = 'field_os2web_meetings_addendum_nid';
  $handler->display->display_options['filters']['field_os2web_meetings_addendum_nid']['operator'] = 'empty';
  /* Filter criterion: Indholdselement: Type (field_os2web_meetings_type) */
  $handler->display->display_options['filters']['field_os2web_meetings_type_value']['id'] = 'field_os2web_meetings_type_value';
  $handler->display->display_options['filters']['field_os2web_meetings_type_value']['table'] = 'field_data_field_os2web_meetings_type';
  $handler->display->display_options['filters']['field_os2web_meetings_type_value']['field'] = 'field_os2web_meetings_type_value';
  $handler->display->display_options['filters']['field_os2web_meetings_type_value']['value'] = array(
    'Dagsorden' => 'Dagsorden',
  );
  /* Filter criterion: Indholdselement: Date -  start date (field_os2web_meetings_date) */
  $handler->display->display_options['filters']['field_os2web_meetings_date_value']['id'] = 'field_os2web_meetings_date_value';
  $handler->display->display_options['filters']['field_os2web_meetings_date_value']['table'] = 'field_data_field_os2web_meetings_date';
  $handler->display->display_options['filters']['field_os2web_meetings_date_value']['field'] = 'field_os2web_meetings_date_value';
  $handler->display->display_options['filters']['field_os2web_meetings_date_value']['operator'] = '>=';
  $handler->display->display_options['filters']['field_os2web_meetings_date_value']['default_date'] = 'now';

  /* Display: Seneste */
  $handler = $view->new_display('block', 'Seneste', 'block_2');
  $handler->display->display_options['defaults']['hide_admin_links'] = FALSE;
  $handler->display->display_options['defaults']['cache'] = FALSE;
  $handler->display->display_options['cache']['type'] = 'time';
  $handler->display->display_options['cache']['results_lifespan'] = '3600';
  $handler->display->display_options['cache']['results_lifespan_custom'] = '0';
  $handler->display->display_options['cache']['output_lifespan'] = '3600';
  $handler->display->display_options['cache']['output_lifespan_custom'] = '0';
  $handler->display->display_options['defaults']['pager'] = FALSE;
  $handler->display->display_options['pager']['type'] = 'some';
  $handler->display->display_options['pager']['options']['items_per_page'] = '8';
  $handler->display->display_options['pager']['options']['offset'] = '0';
  $handler->display->display_options['defaults']['footer'] = FALSE;
  $handler->display->display_options['defaults']['fields'] = FALSE;
  /* Field: Content: Nid */
  $handler->display->display_options['fields']['nid']['id'] = 'nid';
  $handler->display->display_options['fields']['nid']['table'] = 'node';
  $handler->display->display_options['fields']['nid']['field'] = 'nid';
  $handler->display->display_options['fields']['nid']['label'] = '';
  $handler->display->display_options['fields']['nid']['exclude'] = TRUE;
  $handler->display->display_options['fields']['nid']['element_label_colon'] = FALSE;
  /* Field: Content: Title */
  $handler->display->display_options['fields']['title']['id'] = 'title';
  $handler->display->display_options['fields']['title']['table'] = 'node';
  $handler->display->display_options['fields']['title']['field'] = 'title';
  $handler->display->display_options['fields']['title']['exclude'] = TRUE;
  $handler->display->display_options['fields']['title']['alter']['make_link'] = TRUE;
  $handler->display->display_options['fields']['title']['alter']['path'] = 'node/[nid]';
  $handler->display->display_options['fields']['title']['link_to_node'] = FALSE;
  /* Field: Indholdselement: Committee */
  $handler->display->display_options['fields']['field_os2web_meetings_committee']['id'] = 'field_os2web_meetings_committee';
  $handler->display->display_options['fields']['field_os2web_meetings_committee']['table'] = 'field_data_field_os2web_meetings_committee';
  $handler->display->display_options['fields']['field_os2web_meetings_committee']['field'] = 'field_os2web_meetings_committee';
  $handler->display->display_options['fields']['field_os2web_meetings_committee']['label'] = 'Seneste møder med publicerede referater';
  $handler->display->display_options['fields']['field_os2web_meetings_committee']['alter']['make_link'] = TRUE;
  $handler->display->display_options['fields']['field_os2web_meetings_committee']['alter']['path'] = 'node/[nid]';
  $handler->display->display_options['fields']['field_os2web_meetings_committee']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_os2web_meetings_committee']['type'] = 'taxonomy_term_reference_plain';
  /* Field: Indholdselement: Date */
  $handler->display->display_options['fields']['field_os2web_meetings_date']['id'] = 'field_os2web_meetings_date';
  $handler->display->display_options['fields']['field_os2web_meetings_date']['table'] = 'field_data_field_os2web_meetings_date';
  $handler->display->display_options['fields']['field_os2web_meetings_date']['field'] = 'field_os2web_meetings_date';
  $handler->display->display_options['fields']['field_os2web_meetings_date']['label'] = '';
  $handler->display->display_options['fields']['field_os2web_meetings_date']['alter']['make_link'] = TRUE;
  $handler->display->display_options['fields']['field_os2web_meetings_date']['alter']['path'] = 'node/[nid]';
  $handler->display->display_options['fields']['field_os2web_meetings_date']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_os2web_meetings_date']['settings'] = array(
    'format_type' => 'short',
    'fromto' => 'value',
    'multiple_number' => '',
    'multiple_from' => '',
    'multiple_to' => '',
  );
  /* Field: Indholdselement: Lokation */
  $handler->display->display_options['fields']['field_os2web_meetings_location']['id'] = 'field_os2web_meetings_location';
  $handler->display->display_options['fields']['field_os2web_meetings_location']['table'] = 'field_data_field_os2web_meetings_location';
  $handler->display->display_options['fields']['field_os2web_meetings_location']['field'] = 'field_os2web_meetings_location';
  $handler->display->display_options['fields']['field_os2web_meetings_location']['label'] = '';
  $handler->display->display_options['fields']['field_os2web_meetings_location']['exclude'] = TRUE;
  $handler->display->display_options['fields']['field_os2web_meetings_location']['alter']['make_link'] = TRUE;
  $handler->display->display_options['fields']['field_os2web_meetings_location']['alter']['path'] = 'node/[nid]';
  $handler->display->display_options['fields']['field_os2web_meetings_location']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_os2web_meetings_location']['type'] = 'taxonomy_term_reference_plain';
  $handler->display->display_options['defaults']['filter_groups'] = FALSE;
  $handler->display->display_options['defaults']['filters'] = FALSE;
  /* Filter criterion: Content: Published */
  $handler->display->display_options['filters']['status']['id'] = 'status';
  $handler->display->display_options['filters']['status']['table'] = 'node';
  $handler->display->display_options['filters']['status']['field'] = 'status';
  $handler->display->display_options['filters']['status']['value'] = 1;
  $handler->display->display_options['filters']['status']['group'] = 1;
  $handler->display->display_options['filters']['status']['expose']['operator'] = FALSE;
  /* Filter criterion: Content: Type */
  $handler->display->display_options['filters']['type']['id'] = 'type';
  $handler->display->display_options['filters']['type']['table'] = 'node';
  $handler->display->display_options['filters']['type']['field'] = 'type';
  $handler->display->display_options['filters']['type']['value'] = array(
    'os2web_meetings_meeting' => 'os2web_meetings_meeting',
  );
  /* Filter criterion: Indholdselement: Tillæg til (field_os2web_meetings_addendum) */
  $handler->display->display_options['filters']['field_os2web_meetings_addendum_nid']['id'] = 'field_os2web_meetings_addendum_nid';
  $handler->display->display_options['filters']['field_os2web_meetings_addendum_nid']['table'] = 'field_data_field_os2web_meetings_addendum';
  $handler->display->display_options['filters']['field_os2web_meetings_addendum_nid']['field'] = 'field_os2web_meetings_addendum_nid';
  $handler->display->display_options['filters']['field_os2web_meetings_addendum_nid']['operator'] = 'empty';
  /* Filter criterion: Indholdselement: Type (field_os2web_meetings_type) */
  $handler->display->display_options['filters']['field_os2web_meetings_type_value']['id'] = 'field_os2web_meetings_type_value';
  $handler->display->display_options['filters']['field_os2web_meetings_type_value']['table'] = 'field_data_field_os2web_meetings_type';
  $handler->display->display_options['filters']['field_os2web_meetings_type_value']['field'] = 'field_os2web_meetings_type_value';
  $handler->display->display_options['filters']['field_os2web_meetings_type_value']['value'] = array(
    'Referat' => 'Referat',
  );

  /* Display: Avanceret soegning */
  $handler = $view->new_display('page', 'Avanceret soegning', 'page_1');
  $handler->display->display_options['defaults']['css_class'] = FALSE;
  $handler->display->display_options['css_class'] = 'dagsorden';
  $handler->display->display_options['defaults']['hide_admin_links'] = FALSE;
  $handler->display->display_options['defaults']['style_plugin'] = FALSE;
  $handler->display->display_options['style_plugin'] = 'table';
  $handler->display->display_options['style_options']['columns'] = array(
    'nid' => 'nid',
    'title' => 'title',
    'field_os2web_meetings_committee' => 'field_os2web_meetings_committee',
    'field_os2web_meetings_date' => 'field_os2web_meetings_date',
    'field_os2web_meetings_location' => 'field_os2web_meetings_location',
    'field_os2web_meetings_searchdata' => 'field_os2web_meetings_searchdata',
    'title_1' => 'title_1',
  );
  $handler->display->display_options['style_options']['default'] = '-1';
  $handler->display->display_options['style_options']['info'] = array(
    'nid' => array(
      'sortable' => 0,
      'default_sort_order' => 'asc',
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
    'title' => array(
      'sortable' => 0,
      'default_sort_order' => 'asc',
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
    'field_os2web_meetings_committee' => array(
      'sortable' => 0,
      'default_sort_order' => 'asc',
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
    'field_os2web_meetings_date' => array(
      'sortable' => 0,
      'default_sort_order' => 'asc',
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
    'field_os2web_meetings_location' => array(
      'sortable' => 0,
      'default_sort_order' => 'asc',
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
    'field_os2web_meetings_searchdata' => array(
      'sortable' => 0,
      'default_sort_order' => 'asc',
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
  );
  $handler->display->display_options['defaults']['style_options'] = FALSE;
  $handler->display->display_options['defaults']['row_plugin'] = FALSE;
  $handler->display->display_options['defaults']['row_options'] = FALSE;
  $handler->display->display_options['defaults']['footer'] = FALSE;
  $handler->display->display_options['defaults']['relationships'] = FALSE;
  $handler->display->display_options['defaults']['fields'] = FALSE;
  /* Field: Content: Nid */
  $handler->display->display_options['fields']['nid']['id'] = 'nid';
  $handler->display->display_options['fields']['nid']['table'] = 'node';
  $handler->display->display_options['fields']['nid']['field'] = 'nid';
  $handler->display->display_options['fields']['nid']['label'] = '';
  $handler->display->display_options['fields']['nid']['exclude'] = TRUE;
  $handler->display->display_options['fields']['nid']['element_label_colon'] = FALSE;
  /* Field: Content: Title */
  $handler->display->display_options['fields']['title']['id'] = 'title';
  $handler->display->display_options['fields']['title']['table'] = 'node';
  $handler->display->display_options['fields']['title']['field'] = 'title';
  $handler->display->display_options['fields']['title']['exclude'] = TRUE;
  $handler->display->display_options['fields']['title']['alter']['path'] = 'os2web_meetings_meeting/[nid]';
  /* Field: Indholdselement: Committee */
  $handler->display->display_options['fields']['field_os2web_meetings_committee']['id'] = 'field_os2web_meetings_committee';
  $handler->display->display_options['fields']['field_os2web_meetings_committee']['table'] = 'field_data_field_os2web_meetings_committee';
  $handler->display->display_options['fields']['field_os2web_meetings_committee']['field'] = 'field_os2web_meetings_committee';
  $handler->display->display_options['fields']['field_os2web_meetings_committee']['label'] = '';
  $handler->display->display_options['fields']['field_os2web_meetings_committee']['alter']['make_link'] = TRUE;
  $handler->display->display_options['fields']['field_os2web_meetings_committee']['alter']['path'] = 'node/[nid]';
  $handler->display->display_options['fields']['field_os2web_meetings_committee']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_os2web_meetings_committee']['type'] = 'taxonomy_term_reference_plain';
  /* Field: Indholdselement: Date */
  $handler->display->display_options['fields']['field_os2web_meetings_date']['id'] = 'field_os2web_meetings_date';
  $handler->display->display_options['fields']['field_os2web_meetings_date']['table'] = 'field_data_field_os2web_meetings_date';
  $handler->display->display_options['fields']['field_os2web_meetings_date']['field'] = 'field_os2web_meetings_date';
  $handler->display->display_options['fields']['field_os2web_meetings_date']['label'] = '';
  $handler->display->display_options['fields']['field_os2web_meetings_date']['alter']['make_link'] = TRUE;
  $handler->display->display_options['fields']['field_os2web_meetings_date']['alter']['path'] = 'node/[nid]';
  $handler->display->display_options['fields']['field_os2web_meetings_date']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_os2web_meetings_date']['settings'] = array(
    'format_type' => 'short',
    'fromto' => 'value',
    'multiple_number' => '',
    'multiple_from' => '',
    'multiple_to' => '',
  );
  /* Field: Indholdselement: Lokation */
  $handler->display->display_options['fields']['field_os2web_meetings_location']['id'] = 'field_os2web_meetings_location';
  $handler->display->display_options['fields']['field_os2web_meetings_location']['table'] = 'field_data_field_os2web_meetings_location';
  $handler->display->display_options['fields']['field_os2web_meetings_location']['field'] = 'field_os2web_meetings_location';
  $handler->display->display_options['fields']['field_os2web_meetings_location']['label'] = '';
  $handler->display->display_options['fields']['field_os2web_meetings_location']['exclude'] = TRUE;
  $handler->display->display_options['fields']['field_os2web_meetings_location']['alter']['make_link'] = TRUE;
  $handler->display->display_options['fields']['field_os2web_meetings_location']['alter']['path'] = 'node/[nid]';
  $handler->display->display_options['fields']['field_os2web_meetings_location']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_os2web_meetings_location']['type'] = 'taxonomy_term_reference_plain';
  /* Field: Indholdselement: Search meta data */
  $handler->display->display_options['fields']['field_os2web_meetings_searchdata']['id'] = 'field_os2web_meetings_searchdata';
  $handler->display->display_options['fields']['field_os2web_meetings_searchdata']['table'] = 'field_data_field_os2web_meetings_searchdata';
  $handler->display->display_options['fields']['field_os2web_meetings_searchdata']['field'] = 'field_os2web_meetings_searchdata';
  $handler->display->display_options['fields']['field_os2web_meetings_searchdata']['label'] = '';
  $handler->display->display_options['fields']['field_os2web_meetings_searchdata']['exclude'] = TRUE;
  $handler->display->display_options['fields']['field_os2web_meetings_searchdata']['element_label_colon'] = FALSE;
  $handler->display->display_options['defaults']['filter_groups'] = FALSE;
  $handler->display->display_options['defaults']['filters'] = FALSE;
  /* Filter criterion: Global: PHP */
  $handler->display->display_options['filters']['php']['id'] = 'php';
  $handler->display->display_options['filters']['php']['table'] = 'views';
  $handler->display->display_options['filters']['php']['field'] = 'php';
  $handler->display->display_options['filters']['php']['group'] = 1;
  $handler->display->display_options['filters']['php']['use_php_setup'] = 0;
  $handler->display->display_options['filters']['php']['php_filter'] = 'if (count($view->exposed_input)) {
return FALSE;
} else {
return TRUE;
}';
  /* Filter criterion: Content: Published */
  $handler->display->display_options['filters']['status']['id'] = 'status';
  $handler->display->display_options['filters']['status']['table'] = 'node';
  $handler->display->display_options['filters']['status']['field'] = 'status';
  $handler->display->display_options['filters']['status']['value'] = 1;
  $handler->display->display_options['filters']['status']['group'] = 1;
  $handler->display->display_options['filters']['status']['expose']['operator'] = FALSE;
  /* Filter criterion: Content: Type */
  $handler->display->display_options['filters']['type']['id'] = 'type';
  $handler->display->display_options['filters']['type']['table'] = 'node';
  $handler->display->display_options['filters']['type']['field'] = 'type';
  $handler->display->display_options['filters']['type']['value'] = array(
    'os2web_meetings_meeting' => 'os2web_meetings_meeting',
  );
  $handler->display->display_options['filters']['type']['group'] = 1;
  /* Filter criterion: Indholdselement: Search meta data (field_os2web_meetings_searchdata) */
  $handler->display->display_options['filters']['field_os2web_meetings_searchdata_value']['id'] = 'field_os2web_meetings_searchdata_value';
  $handler->display->display_options['filters']['field_os2web_meetings_searchdata_value']['table'] = 'field_data_field_os2web_meetings_searchdata';
  $handler->display->display_options['filters']['field_os2web_meetings_searchdata_value']['field'] = 'field_os2web_meetings_searchdata_value';
  $handler->display->display_options['filters']['field_os2web_meetings_searchdata_value']['operator'] = 'allwords';
  $handler->display->display_options['filters']['field_os2web_meetings_searchdata_value']['group'] = 1;
  $handler->display->display_options['filters']['field_os2web_meetings_searchdata_value']['exposed'] = TRUE;
  $handler->display->display_options['filters']['field_os2web_meetings_searchdata_value']['expose']['operator_id'] = 'field_os2web_meetings_searchdata_value_op';
  $handler->display->display_options['filters']['field_os2web_meetings_searchdata_value']['expose']['operator'] = 'field_os2web_meetings_searchdata_value_op';
  $handler->display->display_options['filters']['field_os2web_meetings_searchdata_value']['expose']['identifier'] = 'field_meeting_search_advanced_meta_date_value';
  /* Filter criterion: Indholdselement: Committee (field_os2web_meetings_committee) */
  $handler->display->display_options['filters']['field_os2web_meetings_committee_tid']['id'] = 'field_os2web_meetings_committee_tid';
  $handler->display->display_options['filters']['field_os2web_meetings_committee_tid']['table'] = 'field_data_field_os2web_meetings_committee';
  $handler->display->display_options['filters']['field_os2web_meetings_committee_tid']['field'] = 'field_os2web_meetings_committee_tid';
  $handler->display->display_options['filters']['field_os2web_meetings_committee_tid']['value'] = array(
    10974 => '10974',
    10976 => '10976',
    10983 => '10983',
    10989 => '10989',
    19779 => '19779',
    10990 => '10990',
    19371 => '19371',
    16254 => '16254',
    16256 => '16256',
    16258 => '16258',
    16257 => '16257',
    10975 => '10975',
    10972 => '10972',
  );
  $handler->display->display_options['filters']['field_os2web_meetings_committee_tid']['group'] = 1;
  $handler->display->display_options['filters']['field_os2web_meetings_committee_tid']['exposed'] = TRUE;
  $handler->display->display_options['filters']['field_os2web_meetings_committee_tid']['expose']['operator_id'] = 'field_os2web_meetings_committee_tid_op';
  $handler->display->display_options['filters']['field_os2web_meetings_committee_tid']['expose']['operator'] = 'field_os2web_meetings_committee_tid_op';
  $handler->display->display_options['filters']['field_os2web_meetings_committee_tid']['expose']['identifier'] = 'os2web_meetings_tax_committee';
  $handler->display->display_options['filters']['field_os2web_meetings_committee_tid']['expose']['remember_roles'] = array(
    2 => '2',
    1 => 0,
    6 => 0,
    4 => 0,
    7 => 0,
    3 => 0,
    5 => 0,
  );
  $handler->display->display_options['filters']['field_os2web_meetings_committee_tid']['expose']['reduce'] = TRUE;
  $handler->display->display_options['filters']['field_os2web_meetings_committee_tid']['reduce_duplicates'] = TRUE;
  $handler->display->display_options['filters']['field_os2web_meetings_committee_tid']['type'] = 'select';
  $handler->display->display_options['filters']['field_os2web_meetings_committee_tid']['vocabulary'] = 'os2web_meetings_tax_committee';
  /* Filter criterion: Addenum */
  $handler->display->display_options['filters']['field_os2web_meetings_addendum_nid']['id'] = 'field_os2web_meetings_addendum_nid';
  $handler->display->display_options['filters']['field_os2web_meetings_addendum_nid']['table'] = 'field_data_field_os2web_meetings_addendum';
  $handler->display->display_options['filters']['field_os2web_meetings_addendum_nid']['field'] = 'field_os2web_meetings_addendum_nid';
  $handler->display->display_options['filters']['field_os2web_meetings_addendum_nid']['ui_name'] = 'Addenum';
  $handler->display->display_options['filters']['field_os2web_meetings_addendum_nid']['operator'] = 'empty';
  $handler->display->display_options['filters']['field_os2web_meetings_addendum_nid']['group'] = 1;
  $handler->display->display_options['path'] = 'dagsorden-og-referat-avanceret';

  /* Display: Blok 3 */
  $handler = $view->new_display('block', 'Blok 3', 'block_3');
  $handler->display->display_options['defaults']['hide_admin_links'] = FALSE;
  $handler->display->display_options['defaults']['pager'] = FALSE;
  $handler->display->display_options['pager']['type'] = 'some';
  $handler->display->display_options['pager']['options']['items_per_page'] = '1';
  $handler->display->display_options['pager']['options']['offset'] = '0';
  $handler->display->display_options['defaults']['style_plugin'] = FALSE;
  $handler->display->display_options['style_plugin'] = 'grid';
  $handler->display->display_options['style_options']['row_class_special'] = FALSE;
  $handler->display->display_options['style_options']['columns'] = '2';
  $handler->display->display_options['defaults']['style_options'] = FALSE;
  $handler->display->display_options['defaults']['row_plugin'] = FALSE;
  $handler->display->display_options['row_plugin'] = 'fields';
  $handler->display->display_options['defaults']['row_options'] = FALSE;
  $handler->display->display_options['defaults']['header'] = FALSE;
  $handler->display->display_options['defaults']['footer'] = FALSE;
  $handler->display->display_options['defaults']['fields'] = FALSE;
  /* Field: Indholdselement: Indhold */
  $handler->display->display_options['fields']['body']['id'] = 'body';
  $handler->display->display_options['fields']['body']['table'] = 'field_data_body';
  $handler->display->display_options['fields']['body']['field'] = 'body';
  $handler->display->display_options['fields']['body']['label'] = '';
  $handler->display->display_options['fields']['body']['element_label_colon'] = FALSE;
  /* Field: Content: Edit link */
  $handler->display->display_options['fields']['edit_node']['id'] = 'edit_node';
  $handler->display->display_options['fields']['edit_node']['table'] = 'views_entity_node';
  $handler->display->display_options['fields']['edit_node']['field'] = 'edit_node';
  $handler->display->display_options['fields']['edit_node']['label'] = '';
  $handler->display->display_options['fields']['edit_node']['exclude'] = TRUE;
  $handler->display->display_options['fields']['edit_node']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['edit_node']['text'] = 'Rediger';
  /* Field: Content: Delete link */
  $handler->display->display_options['fields']['delete_node']['id'] = 'delete_node';
  $handler->display->display_options['fields']['delete_node']['table'] = 'views_entity_node';
  $handler->display->display_options['fields']['delete_node']['field'] = 'delete_node';
  $handler->display->display_options['fields']['delete_node']['label'] = '';
  $handler->display->display_options['fields']['delete_node']['exclude'] = TRUE;
  $handler->display->display_options['fields']['delete_node']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['delete_node']['text'] = 'Fjern';
  /* Field: Global: Contextual Links */
  $handler->display->display_options['fields']['contextual_links']['id'] = 'contextual_links';
  $handler->display->display_options['fields']['contextual_links']['table'] = 'views';
  $handler->display->display_options['fields']['contextual_links']['field'] = 'contextual_links';
  $handler->display->display_options['fields']['contextual_links']['label'] = '';
  $handler->display->display_options['fields']['contextual_links']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['contextual_links']['fields'] = array(
    'edit_node' => 'edit_node',
    'delete_node' => 'delete_node',
    'body' => 0,
  );
  $handler->display->display_options['defaults']['filter_groups'] = FALSE;
  $handler->display->display_options['defaults']['filters'] = FALSE;
  /* Filter criterion: Content: Published */
  $handler->display->display_options['filters']['status']['id'] = 'status';
  $handler->display->display_options['filters']['status']['table'] = 'node';
  $handler->display->display_options['filters']['status']['field'] = 'status';
  $handler->display->display_options['filters']['status']['value'] = 1;
  $handler->display->display_options['filters']['status']['group'] = 1;
  $handler->display->display_options['filters']['status']['expose']['operator'] = FALSE;
  /* Filter criterion: Content: Type */
  $handler->display->display_options['filters']['type']['id'] = 'type';
  $handler->display->display_options['filters']['type']['table'] = 'node';
  $handler->display->display_options['filters']['type']['field'] = 'type';
  $handler->display->display_options['filters']['type']['value'] = array(
    'os2web_meeting_search_status' => 'os2web_meeting_search_status',
  );
  $translatables['os2web_meetings_view_search'] = array(
    t('Master'),
    t('Søg i dagsordener og referater'),
    t('mere'),
    t('Søg'),
    t('Gendan'),
    t('Sortér efter'),
    t('Stigende'),
    t('Faldende'),
    t('Antal elementer'),
    t('- Alle -'),
    t('Forskydning'),
    t('« første'),
    t('‹ forrige'),
    t('næste ›'),
    t('sidste »'),
    t('<div class="help-button" title="Help text goes here"></div>
'),
    t('Title'),
    t('Søgeresultat'),
    t('Date -  start date (field_os2web_meetings_date)'),
    t('Page'),
    t('more'),
    t('<div class="help-button" title="Help text goes here"></div>'),
    t('Avanceret søgning'),
    t('<div class="meetings-advanced-search-link">Du kan søge efter fritekst <a href="/dagsorden-og-referat-avanceret" title="Advanceret søgning">her</a></div>'),
    t('Møder fra dato'),
    t('Til dato'),
    t('Vælg hvilket udvalg du vil se dagsordner og referater fra.'),
    t('Kommende'),
    t('<div class="help-button" title="Seneste møder i alle udvalg med publicerede referater"></div>'),
    t('Kommende møder med publicerede dagsordner'),
    t('Seneste'),
    t('Seneste møder med publicerede referater'),
    t('Avanceret soegning'),
    t('Blok 3'),
    t('Rediger'),
    t('Fjern'),
  );
  $export['os2web_meetings_view_search'] = $view;

  return $export;
}
