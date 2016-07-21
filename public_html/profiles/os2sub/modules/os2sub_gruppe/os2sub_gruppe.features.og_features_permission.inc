<?php
/**
 * @file
 * os2sub_gruppe.features.og_features_permission.inc
 */

/**
 * Implements hook_og_features_default_permissions().
 */
function os2sub_gruppe_og_features_default_permissions() {
  $permissions = array();

  // Exported og permission: 'node:os2web_group:add user'
  $permissions['node:os2web_group:add user'] = array(
    'roles' => array(
      'administrator member' => 'administrator member',
    ),
  );

  // Exported og permission: 'node:os2web_group:administer group'
  $permissions['node:os2web_group:administer group'] = array(
    'roles' => array(
      'administrator member' => 'administrator member',
    ),
  );

  // Exported og permission: 'node:os2web_group:approve and deny subscription'
  $permissions['node:os2web_group:approve and deny subscription'] = array(
    'roles' => array(
      'administrator member' => 'administrator member',
    ),
  );

  // Exported og permission: 'node:os2web_group:create os2sub_group_mail content'
  $permissions['node:os2web_group:create os2sub_group_mail content'] = array(
    'roles' => array(
      'administrator member' => 'administrator member',
    ),
  );

  // Exported og permission: 'node:os2web_group:create os2web_group_event content'
  $permissions['node:os2web_group:create os2web_group_event content'] = array(
    'roles' => array(
      'administrator member' => 'administrator member',
    ),
  );

  // Exported og permission: 'node:os2web_group:delete any os2sub_group_mail content'
  $permissions['node:os2web_group:delete any os2sub_group_mail content'] = array(
    'roles' => array(
      'administrator member' => 'administrator member',
    ),
  );

  // Exported og permission: 'node:os2web_group:delete any os2web_group_event content'
  $permissions['node:os2web_group:delete any os2web_group_event content'] = array(
    'roles' => array(
      'administrator member' => 'administrator member',
    ),
  );

  // Exported og permission: 'node:os2web_group:delete own os2sub_group_mail content'
  $permissions['node:os2web_group:delete own os2sub_group_mail content'] = array(
    'roles' => array(),
  );

  // Exported og permission: 'node:os2web_group:delete own os2web_group_event content'
  $permissions['node:os2web_group:delete own os2web_group_event content'] = array(
    'roles' => array(),
  );

  // Exported og permission: 'node:os2web_group:email people'
  $permissions['node:os2web_group:email people'] = array(
    'roles' => array(),
  );

  // Exported og permission: 'node:os2web_group:manage members'
  $permissions['node:os2web_group:manage members'] = array(
    'roles' => array(
      'administrator member' => 'administrator member',
    ),
  );

  // Exported og permission: 'node:os2web_group:manage permissions'
  $permissions['node:os2web_group:manage permissions'] = array(
    'roles' => array(
      'administrator member' => 'administrator member',
    ),
  );

  // Exported og permission: 'node:os2web_group:manage roles'
  $permissions['node:os2web_group:manage roles'] = array(
    'roles' => array(
      'administrator member' => 'administrator member',
    ),
  );

  // Exported og permission: 'node:os2web_group:publish any content'
  $permissions['node:os2web_group:publish any content'] = array(
    'roles' => array(
      'administrator member' => 'administrator member',
    ),
  );

  // Exported og permission: 'node:os2web_group:publish editable content'
  $permissions['node:os2web_group:publish editable content'] = array(
    'roles' => array(
      'administrator member' => 'administrator member',
    ),
  );

  // Exported og permission: 'node:os2web_group:subscribe'
  $permissions['node:os2web_group:subscribe'] = array(
    'roles' => array(),
  );

  // Exported og permission: 'node:os2web_group:subscribe without approval'
  $permissions['node:os2web_group:subscribe without approval'] = array(
    'roles' => array(),
  );

  // Exported og permission: 'node:os2web_group:unpublish any content'
  $permissions['node:os2web_group:unpublish any content'] = array(
    'roles' => array(
      'administrator member' => 'administrator member',
    ),
  );

  // Exported og permission: 'node:os2web_group:unpublish editable content'
  $permissions['node:os2web_group:unpublish editable content'] = array(
    'roles' => array(
      'administrator member' => 'administrator member',
    ),
  );

  // Exported og permission: 'node:os2web_group:unsubscribe'
  $permissions['node:os2web_group:unsubscribe'] = array(
    'roles' => array(),
  );

  // Exported og permission: 'node:os2web_group:update any os2sub_group_mail content'
  $permissions['node:os2web_group:update any os2sub_group_mail content'] = array(
    'roles' => array(),
  );

  // Exported og permission: 'node:os2web_group:update any os2web_group_event content'
  $permissions['node:os2web_group:update any os2web_group_event content'] = array(
    'roles' => array(
      'administrator member' => 'administrator member',
    ),
  );

  // Exported og permission: 'node:os2web_group:update group'
  $permissions['node:os2web_group:update group'] = array(
    'roles' => array(
      'administrator member' => 'administrator member',
    ),
  );

  // Exported og permission: 'node:os2web_group:update own os2sub_group_mail content'
  $permissions['node:os2web_group:update own os2sub_group_mail content'] = array(
    'roles' => array(),
  );

  // Exported og permission: 'node:os2web_group:update own os2web_group_event content'
  $permissions['node:os2web_group:update own os2web_group_event content'] = array(
    'roles' => array(),
  );

  return $permissions;
}
