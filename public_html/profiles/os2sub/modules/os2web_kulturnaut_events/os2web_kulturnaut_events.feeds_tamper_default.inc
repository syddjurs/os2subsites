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
  $feeds_tamper->id = 'kulturnaut_begivenheder_oplevsyddjurs_-jsonpath_parser_10-strtotime';
  $feeds_tamper->importer = 'kulturnaut_begivenheder_oplevsyddjurs_';
  $feeds_tamper->source = 'jsonpath_parser:10';
  $feeds_tamper->plugin_id = 'strtotime';
  $feeds_tamper->settings = array();
  $feeds_tamper->weight = 0;
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

  return $export;
}
