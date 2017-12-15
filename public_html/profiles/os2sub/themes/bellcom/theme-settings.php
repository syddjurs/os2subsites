<?php
include(dirname(__FILE__) . '/include/settings.inc');

/**
 * Implements hook_form_FORM_ID_alter().
 */
function bellcom_form_system_theme_settings_alter(&$form, &$form_state) {

  // Settings form.
  _theme_settings_form($form, $form_state);
}
