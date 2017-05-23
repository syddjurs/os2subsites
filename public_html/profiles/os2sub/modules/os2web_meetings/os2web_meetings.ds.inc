<?php
/**
 * @file
 * os2web_meetings.ds.inc
 */

/**
 * Implements hook_ds_view_modes_info().
 */
function os2web_meetings_ds_view_modes_info() {
  $export = array();

  $ds_view_mode = new stdClass();
  $ds_view_mode->api_version = 1;
  $ds_view_mode->view_mode = 'os2web_meetings_meeting_detail_view';
  $ds_view_mode->label = 'Meeting detail view';
  $ds_view_mode->entities = array(
    'node' => 'node',
  );
  $export['os2web_meetings_meeting_detail_view'] = $ds_view_mode;

  return $export;
}
