<?php
/**
 * @file
 * os2web_kulturnaut_events.default_field_validation_rules.inc
 */

/**
 * Implements hook_default_field_validation_rule().
 */
function os2web_kulturnaut_events_default_field_validation_rule() {
  $export = array();

  $rule = new stdClass();
  $rule->disabled = FALSE; /* Edit this to true to make a default rule disabled initially */
  $rule->api_version = 2;
  $rule->rulename = 'Event ID is unique';
  $rule->name = 'event_id_is_unique';
  $rule->field_name = 'field_os2web_kulturnaut_event_id';
  $rule->col = 'value';
  $rule->entity_type = 'node';
  $rule->bundle = 'os2web_kulturnaut_knactivity';
  $rule->validator = 'field_validation_unique_validator';
  $rule->settings = array(
    'data' => 'entity',
    'per_user' => 0,
    'bypass' => 1,
    'roles' => array(
      1 => '1',
      2 => '2',
      6 => '6',
      4 => '4',
      5 => '5',
      3 => '3',
    ),
    'errors' => 0,
    'condition' => 0,
    'condition_wrapper' => array(
      'condition_field' => '',
      'condition_operator' => 'equals',
      'condition_value' => '',
    ),
  );
  $rule->error_message = 'Event ID is not unique';
  $export['event_id_is_unique'] = $rule;

  return $export;
}
