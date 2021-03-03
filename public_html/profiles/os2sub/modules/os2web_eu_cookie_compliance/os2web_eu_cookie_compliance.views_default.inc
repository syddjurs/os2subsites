<?php

/**
 * @file
 * os2web_eu_cookie_compliance.views_default.inc
 */

/**
 * Implements hook_views_default_views().
 */
function os2web_eu_cookie_compliance_views_default_views() {
  $export = array();

  $view = new view();
  $view->name = 'cookie_consent';
  $view->description = '';
  $view->tag = 'default';
  $view->base_table = 'eu_cookie_compliance_basic_consent';
  $view->human_name = 'Cookie consent';
  $view->core = 7;
  $view->api_version = '3.0';
  $view->disabled = FALSE; /* Edit this to true to make a default view disabled initially */

  /* Display: Master */
  $handler = $view->new_display('default', 'Master', 'default');
  $handler->display->display_options['title'] = 'Cookie consent';
  $handler->display->display_options['use_more_always'] = FALSE;
  $handler->display->display_options['use_more_text'] = 'mere';
  $handler->display->display_options['access']['type'] = 'perm';
  $handler->display->display_options['access']['perm'] = 'administer EU Cookie Compliance popup';
  $handler->display->display_options['cache']['type'] = 'none';
  $handler->display->display_options['query']['type'] = 'views_query';
  $handler->display->display_options['exposed_form']['type'] = 'basic';
  $handler->display->display_options['exposed_form']['options']['submit_button'] = 'Udfør';
  $handler->display->display_options['exposed_form']['options']['reset_button_label'] = 'Gendan';
  $handler->display->display_options['exposed_form']['options']['exposed_sorts_label'] = 'Sortér efter';
  $handler->display->display_options['exposed_form']['options']['sort_asc_label'] = 'Stigende';
  $handler->display->display_options['exposed_form']['options']['sort_desc_label'] = 'Faldende';
  $handler->display->display_options['pager']['type'] = 'full';
  $handler->display->display_options['pager']['options']['items_per_page'] = '100';
  $handler->display->display_options['pager']['options']['offset'] = '0';
  $handler->display->display_options['pager']['options']['id'] = '0';
  $handler->display->display_options['pager']['options']['quantity'] = '9';
  $handler->display->display_options['pager']['options']['expose']['items_per_page_label'] = 'Antal elementer';
  $handler->display->display_options['pager']['options']['expose']['items_per_page_options_all_label'] = '- Alle -';
  $handler->display->display_options['pager']['options']['expose']['offset_label'] = 'Forskydning';
  $handler->display->display_options['pager']['options']['tags']['first'] = '« første';
  $handler->display->display_options['pager']['options']['tags']['previous'] = '‹ forrige';
  $handler->display->display_options['pager']['options']['tags']['next'] = 'næste ›';
  $handler->display->display_options['pager']['options']['tags']['last'] = 'sidste »';
  $handler->display->display_options['style_plugin'] = 'table';
  $handler->display->display_options['style_options']['columns'] = array(
    'uid' => 'uid',
    'ip_address' => 'ip_address',
    'consent_type' => 'consent_type',
    'timestamp' => 'timestamp',
  );
  $handler->display->display_options['style_options']['class'] = '';
  $handler->display->display_options['style_options']['default'] = 'timestamp';
  $handler->display->display_options['style_options']['info'] = array(
    'uid' => array(
      'sortable' => 1,
      'default_sort_order' => 'asc',
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
    'ip_address' => array(
      'sortable' => 1,
      'default_sort_order' => 'asc',
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
    'consent_type' => array(
      'sortable' => 1,
      'default_sort_order' => 'asc',
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
    'timestamp' => array(
      'sortable' => 1,
      'default_sort_order' => 'desc',
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
  );
  /* Felt: EU Cookie Compliance: Bruger ID */
  $handler->display->display_options['fields']['uid']['id'] = 'uid';
  $handler->display->display_options['fields']['uid']['table'] = 'eu_cookie_compliance_basic_consent';
  $handler->display->display_options['fields']['uid']['field'] = 'uid';
  /* Felt: EU Cookie Compliance: IP-adresse */
  $handler->display->display_options['fields']['ip_address']['id'] = 'ip_address';
  $handler->display->display_options['fields']['ip_address']['table'] = 'eu_cookie_compliance_basic_consent';
  $handler->display->display_options['fields']['ip_address']['field'] = 'ip_address';
  /* Felt: EU Cookie Compliance: OS2Web Consent Type */
  $handler->display->display_options['fields']['consent_type']['id'] = 'consent_type';
  $handler->display->display_options['fields']['consent_type']['table'] = 'eu_cookie_compliance_basic_consent';
  $handler->display->display_options['fields']['consent_type']['field'] = 'consent_type';
  $handler->display->display_options['fields']['consent_type']['label'] = 'Cookie consent info';
  $handler->display->display_options['fields']['consent_type']['alter']['nl2br'] = TRUE;
  /* Felt: EU Cookie Compliance: Tidsstempel */
  $handler->display->display_options['fields']['timestamp']['id'] = 'timestamp';
  $handler->display->display_options['fields']['timestamp']['table'] = 'eu_cookie_compliance_basic_consent';
  $handler->display->display_options['fields']['timestamp']['field'] = 'timestamp';
  $handler->display->display_options['fields']['timestamp']['date_format'] = 'medium';
  $handler->display->display_options['fields']['timestamp']['second_date_format'] = 'os2web_base_date_only';
  /* Filterkriterie: EU Cookie Compliance: Bruger ID */
  $handler->display->display_options['filters']['uid']['id'] = 'uid';
  $handler->display->display_options['filters']['uid']['table'] = 'eu_cookie_compliance_basic_consent';
  $handler->display->display_options['filters']['uid']['field'] = 'uid';
  $handler->display->display_options['filters']['uid']['exposed'] = TRUE;
  $handler->display->display_options['filters']['uid']['expose']['operator_id'] = 'uid_op';
  $handler->display->display_options['filters']['uid']['expose']['label'] = 'Bruger ID';
  $handler->display->display_options['filters']['uid']['expose']['operator'] = 'uid_op';
  $handler->display->display_options['filters']['uid']['expose']['identifier'] = 'uid';
  $handler->display->display_options['filters']['uid']['expose']['remember_roles'] = array(
    2 => '2',
  );
  /* Filterkriterie: EU Cookie Compliance: IP-adresse */
  $handler->display->display_options['filters']['ip_address']['id'] = 'ip_address';
  $handler->display->display_options['filters']['ip_address']['table'] = 'eu_cookie_compliance_basic_consent';
  $handler->display->display_options['filters']['ip_address']['field'] = 'ip_address';
  $handler->display->display_options['filters']['ip_address']['operator'] = 'contains';
  $handler->display->display_options['filters']['ip_address']['exposed'] = TRUE;
  $handler->display->display_options['filters']['ip_address']['expose']['operator_id'] = 'ip_address_op';
  $handler->display->display_options['filters']['ip_address']['expose']['label'] = 'IP-adresse';
  $handler->display->display_options['filters']['ip_address']['expose']['operator'] = 'ip_address_op';
  $handler->display->display_options['filters']['ip_address']['expose']['identifier'] = 'ip_address';
  $handler->display->display_options['filters']['ip_address']['expose']['remember_roles'] = array(
    2 => '2',
  );

  /* Display: Page */
  $handler = $view->new_display('page', 'Page', 'page');
  $handler->display->display_options['path'] = 'admin/config/system/eu-cookie-compliance/cookie-consent';
  $handler->display->display_options['menu']['type'] = 'tab';
  $handler->display->display_options['menu']['title'] = 'Consent list';
  $handler->display->display_options['menu']['weight'] = '1';
  $handler->display->display_options['menu']['context'] = 0;
  $handler->display->display_options['menu']['context_only_inline'] = 0;
  $translatables['cookie_consent'] = array(
    t('Master'),
    t('Cookie consent'),
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
    t('Bruger ID'),
    t('IP-adresse'),
    t('Cookie consent info'),
    t('Tidsstempel'),
    t('Page'),
  );
  $export['cookie_consent'] = $view;

  return $export;
}
