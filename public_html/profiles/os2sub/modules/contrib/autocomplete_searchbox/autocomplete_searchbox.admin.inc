<?php
/**
 * @file
 * Configuration settings for this module.
 */

/**
 * Implements menu callback.
 */
function autocomplete_searchbox_config($form, &$form_state) {
  global $base_url;
  $term = array();

  $form['autocomplete_searchbox_search_sample'] = array(
    '#title' => t('Autocomplete Searchbox Demo'),
    '#type' => 'textfield',
    '#description' => t('This is how your search field will work according to what you configure here. <br /><strong>Save</strong> the settings below to see this in action. Auto search cannot be previewed here.'),
    '#autocomplete_path' => 'admin/search-portal',
    '#attributes' => array(
      'placeholder' => variable_get('autocomplete_searchbox_placeholder', t('Explore')),
    ),
  );

  // Select node types.
  $form['fieldset_content_type'] = array(
    '#type' => 'fieldset',
    '#title' => t('Content types'),
    '#collapsible' => TRUE,
    '#collapsed' => TRUE,
  );

  $types = node_type_get_types();
  foreach ($types as $name => $details) {
    $type[$details->type] = isset($details->description) ? ucfirst($details->type . ' - <i>' . $details->description . '</i>') : ucfirst($details->type);
  }

  $form['fieldset_content_type']['autocomplete_searchbox_content_types'] = array(
    '#title' => t('Only following node types are allowed in autocomplete results'),
    '#type' => 'checkboxes',
    '#options' => $type,
    '#default_value' => variable_get('autocomplete_searchbox_content_types', array()),
  );

  // Select terms.
  $form['fieldset_terms'] = array(
    '#type' => 'fieldset',
    '#title' => t('Terms'),
    '#collapsible' => TRUE,
    '#collapsed' => TRUE,
  );

  $terms = taxonomy_get_vocabularies();
  foreach ($terms as $tid => $detail) {
    $term_tree = taxonomy_get_tree($tid);
      foreach ($term_tree as $key => $term_detail) {
      $term[$term_detail->name] = ucfirst($term_detail->name);
    }
  }

  if (!empty($term)) {
    $form['fieldset_terms']['autocomplete_searchbox_terms'] = array(
      '#title' => t('Only following terms are allowed in autocomplete results'),
      '#type' => 'checkboxes',
      '#options' => $term,
      '#default_value' => variable_get('autocomplete_searchbox_terms', array()),
    );
  }
  else {
    $form['fieldset_terms']['autocomplete_searchbox_no_terms'] = array(
      '#type' => 'item',
      '#title' => t('No taxonomy terms found.'),
    );
  }

  // Select roles.
  $form['fieldset_roles'] = array(
    '#type' => 'fieldset',
    '#title' => t('Roles'),
    '#collapsible' => TRUE,
    '#collapsed' => TRUE,
  );

  $roles = user_roles();
  $permissions = user_role_permissions($roles);
  $default_value_roles = array();

  foreach ($permissions as $rid => $permission) {
    if (isset($permissions[$rid]['access autocomplete search'])) {
      if ($permissions[$rid]['access autocomplete search']) {
        $default_value_roles[$rid] = $rid;
      }
    }
  }

  $form['fieldset_roles']['autocomplete_searchbox_roles'] = array(
    '#title' => t('Only following roles are allowed to use autocomplete facility'),
    '#type' => 'checkboxes',
    '#options' => $roles,
    '#default_value' => $default_value_roles,
  );

  // Advance Settings
  $form['fieldset_advance'] = array(
    '#type' => 'fieldset',
    '#title' => t('Advance Settings'),
    '#collapsible' => TRUE,
    '#collapsed' => TRUE,
  );

  $form['fieldset_advance']['autocomplete_searchbox_searchbox_autocomplete'] = array(
    '#title' => t('Autocomplete default Drupal search textfield'),
    '#type' => 'checkbox',
    '#description' => t('By disabling, you will no more be able to autocomplete on the default drupal searchbox. <br />This checkbox is provided in case you need to apply this module\'s config settings to custom textfields only and not the default seach textfield.'),
    '#default_value' => variable_get('autocomplete_searchbox_searchbox_autocomplete', '1'),
  );

  $form['fieldset_advance']['hr1'] = array(
    '#markup' => '<br /><hr /><br />',
  );

  $form['fieldset_advance']['autocomplete_searchbox_autoselect'] = array(
    '#title' => t('Make newly created entities automatically available in autocomplete results'),
    '#type' => 'checkbox',
    '#description' => t('Site admin does not need to select individual content types, or terms on this form (when they are created) to make them available in autocomplete results. <br />Terms, or content types selected automatically on this form can always be unchecked manually if they are not desired in the results'),
    '#default_value' => variable_get('autocomplete_searchbox_autoselect', '0'),
  );

  $form['fieldset_advance']['hr2'] = array(
    '#markup' => '<br /><hr /><br />',
  );

  $form['fieldset_advance']['autocomplete_searchbox_search_user'] = array(
    '#title' => t('Include users in autocomplete results'),
    '#type' => 'checkbox',
    '#description' => t('Only administrators can access users in autocomplete results'),
    '#default_value' => variable_get('autocomplete_searchbox_search_user', '0'),
  );

  $form['fieldset_advance']['hr3'] = array(
    '#markup' => '<br /><hr /><br />',
  );

  $form['fieldset_advance']['autocomplete_searchbox_auto_select'] = array(
    '#title' => t('Auto search'),
    '#description' => t('Initiate search as soon as an autocomplete result is selected. <br /><strong>Caution:</strong> When used on a custom textfield via Form API, this will submit the parent form as soon as autocomplete result is selected.'),
    '#type' => 'checkbox',
    '#default_value' => variable_get('autocomplete_searchbox_auto_select', '0'),
  );

  $form['fieldset_advance']['hr4'] = array(
    '#markup' => '<br /><hr /><br />',
  );

  $form['fieldset_advance']['autocomplete_searchbox_placeholder'] = array(
    '#title' => t('Placeholder for searchbox'),
    '#type' => 'textfield',
    '#description' => t('Leave blank for no placeholder value'),
    '#default_value' => variable_get('autocomplete_searchbox_placeholder', t('Explore')),
  );

  $form['fieldset_advance']['autocomplete_searchbox_no_results'] = array(
    '#title' => t('Message when autocomplete does not yield any search result'),
    '#type' => 'textfield',
    '#description' => t('Leave blank for no message value'),
    '#default_value' => variable_get('autocomplete_searchbox_no_results', t('Found nothing..')),
  );

  $form['fieldset_advance']['autocomplete_searchbox_use_label'] = array(
    '#title' => t('Use entity name'),
    '#description' => t('Whether to use entity name as label. See the Colors tab.'),
    '#type' => 'checkbox',
    '#default_value' => variable_get('autocomplete_searchbox_use_label', '0'),
  );

  $form['fieldset_advance']['autocomplete_searchbox_use_separator'] = array(
    '#title' => t('Use separator'),
    '#description' => t('Whether to use a separator between an autocomplete result and entity name. See the Colors tab.'),
    '#type' => 'checkbox',
    '#default_value' => variable_get('autocomplete_searchbox_use_separator', '0'),
  );

  $form['fieldset_advance']['autocomplete_searchbox_separator'] = array(
    '#title' => t('Separator'),
    '#type' => 'textfield',
    '#states' => array(
      'visible' => array(
        ':input[name="autocomplete_searchbox_use_separator"]' => array(
          'checked' => TRUE,
        ),
      ),
    ),
    '#default_value' => variable_get('autocomplete_searchbox_separator', '::'),
  );
  return system_settings_form($form);
}

/**
 * Implements menu callback.
 */
function autocomplete_searchbox_config_colors($form, &$form_state) {
  module_load_include('inc', 'autocomplete_searchbox', 'autocomplete_searchbox.pages');
  drupal_add_css(drupal_get_path('module', 'autocomplete_searchbox') . '/css/autocomplete_searchbox.css');

  //Sample.
  $form['fieldset_sample'] = array(
    '#type' => 'fieldset',
    '#title' => t('Sample'),
    '#description' => t('This is how autocomplete dropdown result will look like. Color settings apply only to labels.'),
    '#collapsed' => FALSE,
  );
  $form['fieldset_sample']['autocomplete_searchbox_sample'] = array(
    '#markup' => '<div class="as-result result-first"><span class="top">Entity name</span> :: autocomplete result 1</div><div class="as-result result-second"><span class="middle"">Entity name</span> :: autocomplete result 2</div><div class="as-result result-third"><span class="last">Entity name</span> :: autocomplete result 3</div>',
  );

  // Color Defaults
  $form['fieldset_defaults'] = array(
    '#type' => 'fieldset',
    '#title' => t('Defaults'),
    '#description' => t('Default color codes to use for entities, example #636363. Values provided below will always have greater precedence.'),
    '#collapsible' => TRUE,
    '#collapsed' => FALSE,
  );

  $form['fieldset_defaults']['autocomplete_searchbox_ctype_bgcolor'] = array(
    '#type' => 'textfield',
    '#default_value' => variable_get('autocomplete_searchbox_ctype_bgcolor', ''),
    '#title' => t('Node Background color'),
    '#attributes' => array(
      'placeholder' => '#ffffff',
    )
  );

  $form['fieldset_defaults']['autocomplete_searchbox_ctype_color'] = array(
    '#type' => 'textfield',
    '#default_value' => variable_get('autocomplete_searchbox_ctype_color', ''),
    '#title' => t('Node Text color'),
    '#attributes' => array(
      'placeholder' => '#636363',
    )
  );

  $form['fieldset_defaults']['hr1'] = array(
    '#markup' => '<br /><hr /><br />',
  );

  $form['fieldset_defaults']['autocomplete_searchbox_term_bgcolor'] = array(
    '#type' => 'textfield',
    '#default_value' => variable_get('autocomplete_searchbox_term_bgcolor', ''),
    '#title' => t('Term Background color'),
    '#attributes' => array(
      'placeholder' => '#ffffff',
    )
  );

  $form['fieldset_defaults']['autocomplete_searchbox_term_color'] = array(
    '#type' => 'textfield',
    '#default_value' => variable_get('autocomplete_searchbox_term_color', ''),
    '#title' => t('Term Text color'),
    '#attributes' => array(
      'placeholder' => '#636363',
    )
  );

  $form['fieldset_defaults']['hr2'] = array(
    '#markup' => '<br /><hr /><br />',
  );

  $form['fieldset_defaults']['autocomplete_searchbox_user_dbgcolor'] = array(
    '#type' => 'textfield',
    '#default_value' => variable_get('autocomplete_searchbox_user_dbgcolor', ''),
    '#title' => t('User Background color'),
    '#attributes' => array(
      'placeholder' => '#ffffff',
    )
  );

  $form['fieldset_defaults']['autocomplete_searchbox_user_color'] = array(
    '#type' => 'textfield',
    '#default_value' => variable_get('autocomplete_searchbox_user_color', ''),
    '#title' => t('User Text color'),
    '#attributes' => array(
      'placeholder' => '#636363',
    )
  );

  $form['fieldset_defaults']['hr3'] = array(
    '#markup' => '<br /><hr /><br />',
  );

  // Override Color Defaults
  $form['fieldset_override_defaults'] = array(
    '#type' => 'fieldset',
    '#title' => t('Override Defaults'),
    '#description' => t('Default color codes mentioned above can be overridden here.'),
    '#collapsible' => TRUE,
    '#collapsed' => FALSE,
  );

  // Select node types.
  $form['fieldset_override_defaults']['fieldset_content_type'] = array(
    '#type' => 'fieldset',
    '#title' => t('Content types'),
    '#description' => t('Color codes to highlight content type names in the autocomplete searchbox. The following fields come from what you enable on the !settings page. Enter a color code, for example #FFFFFF', array('!settings' => l('settings', 'admin/config/search/autocomplete-search-config'))),
    '#collapsible' => TRUE,
    '#collapsed' => TRUE,
  );

  $nodes = variable_get('autocomplete_searchbox_content_types', array());
  $nodes = _autocomplete_search_filter_result($nodes);
  foreach ($nodes as $name) {
    $form['fieldset_override_defaults']['fieldset_content_type']['fieldset_' . $name] = array(
      '#type' => 'fieldset',
      '#title' => t($name),
      '#collapsible' => TRUE,
      '#collapsed' => TRUE,
    );
    $form['fieldset_override_defaults']['fieldset_content_type']['fieldset_' . $name]['autocomplete_searchbox_bgcolor_' . $name] = array(
      '#type' => 'textfield',
      '#default_value' => variable_get('autocomplete_searchbox_bgcolor_' . $name, ''),
      '#title' => t('Background color'),
    );
    $form['fieldset_override_defaults']['fieldset_content_type']['fieldset_' . $name]['autocomplete_searchbox_fcolor_' . $name] = array(
      '#type' => 'textfield',
      '#default_value' => variable_get('autocomplete_searchbox_fcolor_' . $name, ''),
      '#title' => t('Text color'),
    );
  }

  // Select terms.
  $form['fieldset_override_defaults']['fieldset_term'] = array(
    '#type' => 'fieldset',
    '#title' => t('Terms'),
    '#description' => t('Color codes to highlight category names in the autocomplete searchbox. The following fields come from what you enable on the !settings page. Enter a color code, for example #FFFFFF', array('!settings' => l('settings', 'admin/config/search/autocomplete-search-config'))),
    '#collapsible' => TRUE,
    '#collapsed' => TRUE,
  );

  $terms = variable_get('autocomplete_searchbox_terms', array());
  $nodes = _autocomplete_search_filter_result($terms);

  foreach ($terms as $name) {
    if (!empty($name)) {
      $name = preg_replace('/\s/', '_', $name);

      $form['fieldset_override_defaults']['fieldset_term']['fieldset_' . $name] = array(
        '#type' => 'fieldset',
        '#title' => t($name),
        '#collapsible' => TRUE,
        '#collapsed' => TRUE,
      );
      $form['fieldset_override_defaults']['fieldset_term']['fieldset_' . $name]['autocomplete_searchbox_bgcolor_' . $name] = array(
        '#type' => 'textfield',
        '#default_value' => variable_get('autocomplete_searchbox_bgcolor_' . $name, ''),
        '#title' => t('Background color'),
      );
      $form['fieldset_override_defaults']['fieldset_term']['fieldset_' . $name]['autocomplete_searchbox_fcolor_' . $name] = array(
        '#type' => 'textfield',
        '#default_value' => variable_get('autocomplete_searchbox_fcolor_' . $name, ''),
        '#title' => t('Text color'),
      );
    }
  }

  // Select users.
  $form['fieldset_override_defaults']['fieldset_user'] = array(
    '#type' => 'fieldset',
    '#title' => t('Users'),
    '#description' => t('Color codes to highlight user entity name in the autocomplete searchbox. The following fields come from what you enable on the !settings page. Enter a color code, for example #FFFFFF', array('!settings' => l('settings', 'admin/config/search/autocomplete-search-config'))),
    '#collapsible' => TRUE,
    '#collapsed' => TRUE,
  );
  $form['fieldset_override_defaults']['fieldset_user']['autocomplete_searchbox_user_bgcolor'] = array(
    '#type' => 'textfield',
    '#default_value' => variable_get('autocomplete_searchbox_user_bgcolor', ''),
    '#title' => t('Background color'),
  );
  $form['fieldset_override_defaults']['fieldset_user']['autocomplete_searchbox_user_fcolor'] = array(
    '#type' => 'textfield',
    '#default_value' => variable_get('autocomplete_searchbox_user_fcolor', ''),
    '#title' => t('Text color'),
  );

  $form['submit'] = array(
    '#type' => 'submit',
    '#value' => t('Save Colors'),
  );
  return $form;
}

/**
 * Submit handler for color codes form.
 */
function autocomplete_searchbox_config_colors_submit($form, &$form_state) {
  foreach ($form_state['values'] as $key => $val) {
    if (preg_match('/^#(?:[0-9a-fA-F]{3}){1,2}$/i', $val)) {
      variable_set($key, $val);
    }
  }
}
