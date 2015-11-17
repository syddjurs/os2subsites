<?php
/**
 * @file
 * svendborg_gallery.views_default.inc
 */

/**
 * Implements hook_views_default_views().
 */
function svendborg_gallery_views_default_views() {
  $export = array();

  $view = new view();
  $view->name = 'svendborg_gallery';
  $view->description = '';
  $view->tag = 'default';
  $view->base_table = 'node';
  $view->human_name = 'Gallery';
  $view->core = 7;
  $view->api_version = '3.0';
  $view->disabled = FALSE; /* Edit this to true to make a default view disabled initially */

  /* Display: Master */
  $handler = $view->new_display('default', 'Master', 'default');
  $handler->display->display_options['title'] = 'Galleri';
  $handler->display->display_options['use_more_always'] = FALSE;
  $handler->display->display_options['use_more_text'] = 'mere';
  $handler->display->display_options['group_by'] = TRUE;
  $handler->display->display_options['access']['type'] = 'perm';
  $handler->display->display_options['cache']['type'] = 'none';
  $handler->display->display_options['query']['type'] = 'views_query';
  $handler->display->display_options['exposed_form']['type'] = 'basic';
  $handler->display->display_options['exposed_form']['options']['submit_button'] = 'Udfør';
  $handler->display->display_options['exposed_form']['options']['reset_button_label'] = 'Gendan';
  $handler->display->display_options['exposed_form']['options']['exposed_sorts_label'] = 'Sortér efter';
  $handler->display->display_options['exposed_form']['options']['sort_asc_label'] = 'Stigende';
  $handler->display->display_options['exposed_form']['options']['sort_desc_label'] = 'Faldende';
  $handler->display->display_options['pager']['type'] = 'none';
  $handler->display->display_options['style_plugin'] = 'default';
  $handler->display->display_options['style_options']['row_class'] = 'col-md-2 col-sm-4 col-xs-6';
  $handler->display->display_options['row_plugin'] = 'fields';
  /* Felt: Indhold: Titel */
  $handler->display->display_options['fields']['title']['id'] = 'title';
  $handler->display->display_options['fields']['title']['table'] = 'node';
  $handler->display->display_options['fields']['title']['field'] = 'title';
  $handler->display->display_options['fields']['title']['label'] = '';
  $handler->display->display_options['fields']['title']['exclude'] = TRUE;
  $handler->display->display_options['fields']['title']['alter']['word_boundary'] = FALSE;
  $handler->display->display_options['fields']['title']['alter']['ellipsis'] = FALSE;
  $handler->display->display_options['fields']['title']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['title']['link_to_node'] = FALSE;
  /* Felt: Indhold: Nid */
  $handler->display->display_options['fields']['nid']['id'] = 'nid';
  $handler->display->display_options['fields']['nid']['table'] = 'node';
  $handler->display->display_options['fields']['nid']['field'] = 'nid';
  $handler->display->display_options['fields']['nid']['label'] = '';
  $handler->display->display_options['fields']['nid']['exclude'] = TRUE;
  $handler->display->display_options['fields']['nid']['element_label_colon'] = FALSE;
  /* Felt: COUNT(DISTINCT Indhold: Billeder) */
  $handler->display->display_options['fields']['field_os2web_base_field_photo']['id'] = 'field_os2web_base_field_photo';
  $handler->display->display_options['fields']['field_os2web_base_field_photo']['table'] = 'field_data_field_os2web_base_field_photo';
  $handler->display->display_options['fields']['field_os2web_base_field_photo']['field'] = 'field_os2web_base_field_photo';
  $handler->display->display_options['fields']['field_os2web_base_field_photo']['group_type'] = 'count_distinct';
  $handler->display->display_options['fields']['field_os2web_base_field_photo']['label'] = '';
  $handler->display->display_options['fields']['field_os2web_base_field_photo']['exclude'] = TRUE;
  $handler->display->display_options['fields']['field_os2web_base_field_photo']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_os2web_base_field_photo']['separator'] = ', ';
  /* Felt: Indhold: Billeder */
  $handler->display->display_options['fields']['field_os2web_base_field_photo_1']['id'] = 'field_os2web_base_field_photo_1';
  $handler->display->display_options['fields']['field_os2web_base_field_photo_1']['table'] = 'field_data_field_os2web_base_field_photo';
  $handler->display->display_options['fields']['field_os2web_base_field_photo_1']['field'] = 'field_os2web_base_field_photo';
  $handler->display->display_options['fields']['field_os2web_base_field_photo_1']['label'] = '';
  $handler->display->display_options['fields']['field_os2web_base_field_photo_1']['exclude'] = TRUE;
  $handler->display->display_options['fields']['field_os2web_base_field_photo_1']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_os2web_base_field_photo_1']['click_sort_column'] = 'fid';
  $handler->display->display_options['fields']['field_os2web_base_field_photo_1']['settings'] = array(
    'image_style' => 'gallery-thumb',
    'image_link' => '',
  );
  $handler->display->display_options['fields']['field_os2web_base_field_photo_1']['group_column'] = 'entity_id';
  $handler->display->display_options['fields']['field_os2web_base_field_photo_1']['delta_limit'] = '1';
  $handler->display->display_options['fields']['field_os2web_base_field_photo_1']['delta_offset'] = '0';
  /* Felt: images token (used in title) */
  $handler->display->display_options['fields']['nothing_1']['id'] = 'nothing_1';
  $handler->display->display_options['fields']['nothing_1']['table'] = 'views';
  $handler->display->display_options['fields']['nothing_1']['field'] = 'nothing';
  $handler->display->display_options['fields']['nothing_1']['ui_name'] = 'images token (used in title)';
  $handler->display->display_options['fields']['nothing_1']['label'] = '';
  $handler->display->display_options['fields']['nothing_1']['exclude'] = TRUE;
  $handler->display->display_options['fields']['nothing_1']['alter']['text'] = 'billeder';
  $handler->display->display_options['fields']['nothing_1']['element_label_colon'] = FALSE;
  /* Felt: Global: Tilpasset tekst */
  $handler->display->display_options['fields']['nothing']['id'] = 'nothing';
  $handler->display->display_options['fields']['nothing']['table'] = 'views';
  $handler->display->display_options['fields']['nothing']['field'] = 'nothing';
  $handler->display->display_options['fields']['nothing']['label'] = '';
  $handler->display->display_options['fields']['nothing']['alter']['text'] = ' [field_os2web_base_field_photo_1]
<div class="hover">[title]<div class="image-cnt">[field_os2web_base_field_photo] [nothing_1] </div></div>';
  $handler->display->display_options['fields']['nothing']['alter']['make_link'] = TRUE;
  $handler->display->display_options['fields']['nothing']['alter']['path'] = 'node/[nid]';
  $handler->display->display_options['fields']['nothing']['alter']['replace_spaces'] = TRUE;
  $handler->display->display_options['fields']['nothing']['element_class'] = 'field-image';
  $handler->display->display_options['fields']['nothing']['element_label_colon'] = FALSE;
  /* Sorteringskriterie: Indhold: Oprettelsesdato */
  $handler->display->display_options['sorts']['created']['id'] = 'created';
  $handler->display->display_options['sorts']['created']['table'] = 'node';
  $handler->display->display_options['sorts']['created']['field'] = 'created';
  $handler->display->display_options['sorts']['created']['order'] = 'DESC';
  /* Filterkriterie: Indhold: Udgivet */
  $handler->display->display_options['filters']['status']['id'] = 'status';
  $handler->display->display_options['filters']['status']['table'] = 'node';
  $handler->display->display_options['filters']['status']['field'] = 'status';
  $handler->display->display_options['filters']['status']['value'] = 1;
  $handler->display->display_options['filters']['status']['group'] = 1;
  $handler->display->display_options['filters']['status']['expose']['operator'] = FALSE;
  /* Filterkriterie: Indhold: Type */
  $handler->display->display_options['filters']['type']['id'] = 'type';
  $handler->display->display_options['filters']['type']['table'] = 'node';
  $handler->display->display_options['filters']['type']['field'] = 'type';
  $handler->display->display_options['filters']['type']['value'] = array(
    'os2web_base_gallery' => 'os2web_base_gallery',
  );
  /* Filterkriterie: Indhold: Sprog */
  $handler->display->display_options['filters']['language']['id'] = 'language';
  $handler->display->display_options['filters']['language']['table'] = 'node';
  $handler->display->display_options['filters']['language']['field'] = 'language';
  $handler->display->display_options['filters']['language']['value'] = array(
    '***CURRENT_LANGUAGE***' => '***CURRENT_LANGUAGE***',
    'und' => 'und',
  );

  /* Display: Page */
  $handler = $view->new_display('page', 'Page', 'page');
  $handler->display->display_options['path'] = 'gallery';
  $handler->display->display_options['menu']['type'] = 'normal';
  $handler->display->display_options['menu']['title'] = 'Gallery';
  $handler->display->display_options['menu']['weight'] = '0';
  $handler->display->display_options['menu']['name'] = 'menu-galleri';
  $handler->display->display_options['menu']['context'] = 0;
  $handler->display->display_options['menu']['context_only_inline'] = 0;
  $translatables['svendborg_gallery'] = array(
    t('Master'),
    t('Galleri'),
    t('mere'),
    t('Udfør'),
    t('Gendan'),
    t('Sortér efter'),
    t('Stigende'),
    t('Faldende'),
    t('billeder'),
    t(' [field_os2web_base_field_photo_1]
<div class="hover">[title]<div class="image-cnt">[field_os2web_base_field_photo] [nothing_1] </div></div>'),
    t('Page'),
    t('more'),
  );
  $export['svendborg_gallery'] = $view;

  return $export;
}
