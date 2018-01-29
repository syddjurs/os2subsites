<?php
/**
 * @file
 * os2web_kulturnaut_events.feeds_tamper_default.inc
 */

/**
 * Implements hook_feeds_tamper_default().
 */
function os2web_kulturnaut_events_feeds_tamper_default() {
  $export = array();

  $feeds_tamper = new stdClass();
  $feeds_tamper->disabled = FALSE; /* Edit this to true to make a default feeds_tamper disabled initially */
  $feeds_tamper->api_version = 2;
  $feeds_tamper->id = 'kulturnaut_begivenheder_oplevsyddjurs_-jsonpath_parser_10-rewrite';
  $feeds_tamper->importer = 'kulturnaut_begivenheder_oplevsyddjurs_';
  $feeds_tamper->source = 'jsonpath_parser:10';
  $feeds_tamper->plugin_id = 'rewrite';
  $feeds_tamper->settings = array(
    'text' => '[jsonpath_parser:10] [jsonpath_parser:16]',
  );
  $feeds_tamper->weight = 1;
  $feeds_tamper->description = 'Rewrite';
  $export['kulturnaut_begivenheder_oplevsyddjurs_-jsonpath_parser_10-rewrite'] = $feeds_tamper;

  $feeds_tamper = new stdClass();
  $feeds_tamper->disabled = FALSE; /* Edit this to true to make a default feeds_tamper disabled initially */
  $feeds_tamper->api_version = 2;
  $feeds_tamper->id = 'kulturnaut_begivenheder_oplevsyddjurs_-jsonpath_parser_10-strtotime';
  $feeds_tamper->importer = 'kulturnaut_begivenheder_oplevsyddjurs_';
  $feeds_tamper->source = 'jsonpath_parser:10';
  $feeds_tamper->plugin_id = 'strtotime';
  $feeds_tamper->settings = array();
  $feeds_tamper->weight = 2;
  $feeds_tamper->description = 'String to Unix timestamp';
  $export['kulturnaut_begivenheder_oplevsyddjurs_-jsonpath_parser_10-strtotime'] = $feeds_tamper;

  $feeds_tamper = new stdClass();
  $feeds_tamper->disabled = FALSE; /* Edit this to true to make a default feeds_tamper disabled initially */
  $feeds_tamper->api_version = 2;
  $feeds_tamper->id = 'kulturnaut_begivenheder_oplevsyddjurs_-jsonpath_parser_14-rewrite';
  $feeds_tamper->importer = 'kulturnaut_begivenheder_oplevsyddjurs_';
  $feeds_tamper->source = 'jsonpath_parser:14';
  $feeds_tamper->plugin_id = 'rewrite';
  $feeds_tamper->settings = array(
    'text' => 'Oplevsyddjurs',
  );
  $feeds_tamper->weight = 0;
  $feeds_tamper->description = 'Rewrite';
  $export['kulturnaut_begivenheder_oplevsyddjurs_-jsonpath_parser_14-rewrite'] = $feeds_tamper;

  $feeds_tamper = new stdClass();
  $feeds_tamper->disabled = FALSE; /* Edit this to true to make a default feeds_tamper disabled initially */
  $feeds_tamper->api_version = 2;
  $feeds_tamper->id = 'kulturnaut_begivenheder_oplevsyddjurs_-jsonpath_parser_21-explode';
  $feeds_tamper->importer = 'kulturnaut_begivenheder_oplevsyddjurs_';
  $feeds_tamper->source = 'jsonpath_parser:21';
  $feeds_tamper->plugin_id = 'explode';
  $feeds_tamper->settings = array(
    'separator' => ',',
    'limit' => '',
    'real_separator' => ',',
  );
  $feeds_tamper->weight = 1;
  $feeds_tamper->description = 'Explode';
  $export['kulturnaut_begivenheder_oplevsyddjurs_-jsonpath_parser_21-explode'] = $feeds_tamper;

  $feeds_tamper = new stdClass();
  $feeds_tamper->disabled = FALSE; /* Edit this to true to make a default feeds_tamper disabled initially */
  $feeds_tamper->api_version = 2;
  $feeds_tamper->id = 'kulturnaut_begivenheder_oplevsyddjurs_-jsonpath_parser_21-rewrite';
  $feeds_tamper->importer = 'kulturnaut_begivenheder_oplevsyddjurs_';
  $feeds_tamper->source = 'jsonpath_parser:21';
  $feeds_tamper->plugin_id = 'rewrite';
  $feeds_tamper->settings = array(
    'text' => '[jsonpath_parser:22],[jsonpath_parser:20]',
  );
  $feeds_tamper->weight = 0;
  $feeds_tamper->description = 'Rewrite';
  $export['kulturnaut_begivenheder_oplevsyddjurs_-jsonpath_parser_21-rewrite'] = $feeds_tamper;

  $feeds_tamper = new stdClass();
  $feeds_tamper->disabled = FALSE; /* Edit this to true to make a default feeds_tamper disabled initially */
  $feeds_tamper->api_version = 2;
  $feeds_tamper->id = 'kulturnaut_begivenheder_oplevsyddjurs_-jsonpath_parser_3-math';
  $feeds_tamper->importer = 'kulturnaut_begivenheder_oplevsyddjurs_';
  $feeds_tamper->source = 'jsonpath_parser:3';
  $feeds_tamper->plugin_id = 'math';
  $feeds_tamper->settings = array(
    'operation' => 'subtraction',
    'flip' => 0,
    'value' => '3600',
    'log' => 0,
  );
  $feeds_tamper->weight = 2;
  $feeds_tamper->description = 'Mathematical operation';
  $export['kulturnaut_begivenheder_oplevsyddjurs_-jsonpath_parser_3-math'] = $feeds_tamper;

  $feeds_tamper = new stdClass();
  $feeds_tamper->disabled = FALSE; /* Edit this to true to make a default feeds_tamper disabled initially */
  $feeds_tamper->api_version = 2;
  $feeds_tamper->id = 'kulturnaut_begivenheder_oplevsyddjurs_-jsonpath_parser_3-rewrite';
  $feeds_tamper->importer = 'kulturnaut_begivenheder_oplevsyddjurs_';
  $feeds_tamper->source = 'jsonpath_parser:3';
  $feeds_tamper->plugin_id = 'rewrite';
  $feeds_tamper->settings = array(
    'text' => '[jsonpath_parser:3] [jsonpath_parser:16]',
  );
  $feeds_tamper->weight = 0;
  $feeds_tamper->description = 'Rewrite';
  $export['kulturnaut_begivenheder_oplevsyddjurs_-jsonpath_parser_3-rewrite'] = $feeds_tamper;

  $feeds_tamper = new stdClass();
  $feeds_tamper->disabled = FALSE; /* Edit this to true to make a default feeds_tamper disabled initially */
  $feeds_tamper->api_version = 2;
  $feeds_tamper->id = 'kulturnaut_begivenheder_oplevsyddjurs_-jsonpath_parser_3-strtotime';
  $feeds_tamper->importer = 'kulturnaut_begivenheder_oplevsyddjurs_';
  $feeds_tamper->source = 'jsonpath_parser:3';
  $feeds_tamper->plugin_id = 'strtotime';
  $feeds_tamper->settings = array();
  $feeds_tamper->weight = 1;
  $feeds_tamper->description = 'String to Unix timestamp';
  $export['kulturnaut_begivenheder_oplevsyddjurs_-jsonpath_parser_3-strtotime'] = $feeds_tamper;

  $feeds_tamper = new stdClass();
  $feeds_tamper->disabled = FALSE; /* Edit this to true to make a default feeds_tamper disabled initially */
  $feeds_tamper->api_version = 2;
  $feeds_tamper->id = 'kulturnaut_begivenheder_oplevsyddjurs_-jsonpath_parser_6-custom_term_hierarchy';
  $feeds_tamper->importer = 'kulturnaut_begivenheder_oplevsyddjurs_';
  $feeds_tamper->source = 'jsonpath_parser:6';
  $feeds_tamper->plugin_id = 'custom_term_hierarchy';
  $feeds_tamper->settings = array(
    'vocab' => '15',
    'separator' => '>>',
  );
  $feeds_tamper->weight = 2;
  $feeds_tamper->description = '(Custom) Term Hierarchy';
  $export['kulturnaut_begivenheder_oplevsyddjurs_-jsonpath_parser_6-custom_term_hierarchy'] = $feeds_tamper;

  $feeds_tamper = new stdClass();
  $feeds_tamper->disabled = FALSE; /* Edit this to true to make a default feeds_tamper disabled initially */
  $feeds_tamper->api_version = 2;
  $feeds_tamper->id = 'kulturnaut_begivenheder_oplevsyddjurs_-jsonpath_parser_6-rewrite';
  $feeds_tamper->importer = 'kulturnaut_begivenheder_oplevsyddjurs_';
  $feeds_tamper->source = 'jsonpath_parser:6';
  $feeds_tamper->plugin_id = 'rewrite';
  $feeds_tamper->settings = array(
    'text' => '[jsonpath_parser:22]>>[jsonpath_parser:20]',
  );
  $feeds_tamper->weight = 0;
  $feeds_tamper->description = 'Rewrite';
  $export['kulturnaut_begivenheder_oplevsyddjurs_-jsonpath_parser_6-rewrite'] = $feeds_tamper;

  return $export;
}
