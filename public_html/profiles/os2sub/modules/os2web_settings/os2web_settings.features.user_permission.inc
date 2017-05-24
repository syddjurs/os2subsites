<?php
/**
 * @file
 * os2web_settings.features.user_permission.inc
 */

/**
 * Implements hook_user_default_permissions().
 */
function os2web_settings_user_default_permissions() {
  $permissions = array();

  // Exported permission: 'administer os2web'.
  $permissions['administer os2web'] = array(
    'name' => 'administer os2web',
    'roles' => array(
      'Administrator' => 'Administrator',
      'Webmaster' => 'Webmaster',
    ),
    'module' => 'os2web_settings',
  );

  return $permissions;
}
