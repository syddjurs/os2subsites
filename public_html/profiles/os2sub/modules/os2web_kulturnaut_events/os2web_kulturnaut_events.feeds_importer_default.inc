<?php
/**
 * @file
 * os2web_kulturnaut_events.feeds_importer_default.inc
 */

/**
 * Implements hook_feeds_importer_default().
 */
function os2web_kulturnaut_events_feeds_importer_default() {
  $export = array();

  $feeds_importer = new stdClass();
  $feeds_importer->disabled = FALSE; /* Edit this to true to make a default feeds_importer disabled initially */
  $feeds_importer->api_version = 1;
  $feeds_importer->id = 'kulturnaut_begivenheder_oplevsyddjurs_';
  $feeds_importer->config = array(
    'name' => 'Kulturnaut begivenheder (oplevsyddjurs)',
    'description' => 'os2web_kulturnaut_feeds_import_oplevsyddjurs',
    'fetcher' => array(
      'plugin_key' => 'OS2webKulturnaultOauth',
      'config' => array(
        'append_headers' => '',
        'request_timeout' => '',
        'get_token_url' => 'https://www.kultunaut.dk/perl/oauth2/token?username=fs@bellcom.dk&password=kodeordtilkultunaut&grant_type=password&client_id=syddjurs&client_secret=MTQ0MzA0OTQ2NmNjYjdjNWFhNDAzN2Q2',
      ),
    ),
    'parser' => array(
      'plugin_key' => 'FeedsJSONPathParser',
      'config' => array(
        'context' => '$.*',
        'sources' => array(
          'jsonpath_parser:17' => 'EventId',
          'jsonpath_parser:0' => 'EventTitle',
          'jsonpath_parser:1' => 'EventShortdescription',
          'jsonpath_parser:2' => 'LocationName',
          'jsonpath_parser:16' => 'EventStarttime',
          'jsonpath_parser:3' => 'EventStartdate',
          'jsonpath_parser:13' => 'EventTime',
          'jsonpath_parser:4' => 'EventLongdescription',
          'jsonpath_parser:5' => 'EventFee',
          'jsonpath_parser:20' => 'EventSubcategory',
          'jsonpath_parser:22' => 'EventCategory',
          'jsonpath_parser:6' => '',
          'jsonpath_parser:21' => '',
          'jsonpath_parser:7' => 'EventTicket',
          'jsonpath_parser:8' => 'LocationAddress',
          'jsonpath_parser:10' => 'EventEnddate',
          'jsonpath_parser:12' => 'EventImage',
          'jsonpath_parser:14' => '',
          'jsonpath_parser:19' => 'EventTarget',
          'jsonpath_parser:23' => 'EventTags',
          'jsonpath_parser:24' => 'EventTarget',
        ),
        'debug' => array(
          'options' => array(
            'context' => 'context',
            'jsonpath_parser:12' => 'jsonpath_parser:12',
            'jsonpath_parser:17' => 0,
            'jsonpath_parser:0' => 0,
            'jsonpath_parser:1' => 0,
            'jsonpath_parser:2' => 0,
            'jsonpath_parser:16' => 0,
            'jsonpath_parser:3' => 0,
            'jsonpath_parser:13' => 0,
            'jsonpath_parser:4' => 0,
            'jsonpath_parser:5' => 0,
            'jsonpath_parser:20' => 0,
            'jsonpath_parser:22' => 0,
            'jsonpath_parser:6' => 0,
            'jsonpath_parser:21' => 0,
            'jsonpath_parser:7' => 0,
            'jsonpath_parser:8' => 0,
            'jsonpath_parser:10' => 0,
            'jsonpath_parser:14' => 0,
            'jsonpath_parser:19' => 0,
            'jsonpath_parser:23' => 0,
            'jsonpath_parser:24' => 0,
          ),
        ),
        'allow_override' => 0,
        'convert_four_byte' => 0,
      ),
    ),
    'processor' => array(
      'plugin_key' => 'FeedsNodeProcessor',
      'config' => array(
        'expire' => '31536000',
        'author' => '1',
        'mappings' => array(
          0 => array(
            'source' => 'jsonpath_parser:17',
            'target' => 'field_os2web_kulturnaut_event_id',
            'unique' => 1,
          ),
          1 => array(
            'source' => 'jsonpath_parser:0',
            'target' => 'title',
            'unique' => 0,
          ),
          2 => array(
            'source' => 'jsonpath_parser:1',
            'target' => 'field_os2web_kulturnaut_descrip',
            'unique' => FALSE,
          ),
          3 => array(
            'source' => 'jsonpath_parser:2',
            'target' => 'field_os2web_kulturnaut_venue',
            'term_search' => '0',
            'autocreate' => 1,
          ),
          4 => array(
            'source' => 'jsonpath_parser:16',
            'target' => 'field_os2web_kulturnaut_time',
            'unique' => FALSE,
          ),
          5 => array(
            'source' => 'jsonpath_parser:3',
            'target' => 'field_os2web_kulturnaut_date:start',
            'unique' => FALSE,
          ),
          6 => array(
            'source' => 'jsonpath_parser:13',
            'target' => 'field_os2web_kulturnaut_time',
            'unique' => FALSE,
          ),
          7 => array(
            'source' => 'jsonpath_parser:4',
            'target' => 'field_os2web_kulturnaut_longdesc',
            'format' => 'full_html',
          ),
          8 => array(
            'source' => 'jsonpath_parser:5',
            'target' => 'field_os2web_kulturnaut_price',
            'unique' => FALSE,
          ),
          9 => array(
            'source' => 'jsonpath_parser:20',
            'target' => 'field_os2web_kulturnaut_tema',
            'term_search' => '0',
            'autocreate' => 0,
          ),
          10 => array(
            'source' => 'jsonpath_parser:22',
            'target' => 'field_os2web_kulturnaut_tema',
            'unique' => FALSE,
          ),
          11 => array(
            'source' => 'jsonpath_parser:6',
            'target' => 'field_os2web_kulturnaut_tema',
            'term_search' => '0',
            'autocreate' => 0,
          ),
          12 => array(
            'source' => 'jsonpath_parser:21',
            'target' => 'field_os2web_kulturnaut_tema',
            'term_search' => '0',
            'autocreate' => 0,
          ),
          13 => array(
            'source' => 'jsonpath_parser:7',
            'target' => 'field_os2web_kulturnaut_url',
            'unique' => FALSE,
          ),
          14 => array(
            'source' => 'jsonpath_parser:8',
            'target' => 'field_os2web_kulturnaut_saddress',
            'unique' => FALSE,
          ),
          15 => array(
            'source' => 'jsonpath_parser:10',
            'target' => 'field_os2web_kulturnaut_date:end',
            'unique' => FALSE,
          ),
          16 => array(
            'source' => 'jsonpath_parser:12',
            'target' => 'field_os2web_kulturnaut_slidesho:uri',
            'unique' => FALSE,
          ),
          17 => array(
            'source' => 'jsonpath_parser:14',
            'target' => 'field_os2web_kulturnaut_source',
            'term_search' => '0',
            'autocreate' => 1,
          ),
          18 => array(
            'source' => 'jsonpath_parser:19',
            'target' => 'field_os2web_kulturnaut_target',
            'unique' => FALSE,
          ),
          19 => array(
            'source' => 'jsonpath_parser:23',
            'target' => 'field_os2web_base_field_edi_tags',
            'term_search' => '0',
            'autocreate' => 1,
          ),
          20 => array(
            'source' => 'jsonpath_parser:24',
            'target' => 'field_os2web_kulturnaut_targroup',
            'unique' => FALSE,
          ),
        ),
        'update_existing' => '2',
        'input_format' => 'full_html',
        'bundle' => 'os2web_kulturnaut_knactivity',
        'authorize' => 1,
        'update_non_existent' => 'skip',
        'skip_hash_check' => 0,
        'insert_new' => 1,
        'language' => 'und',
      ),
    ),
    'content_type' => '',
    'update' => 0,
    'import_period' => '3600',
    'expire_period' => 3600,
    'import_on_create' => 1,
    'process_in_background' => 0,
  );
  $export['kulturnaut_begivenheder_oplevsyddjurs_'] = $feeds_importer;

  $feeds_importer = new stdClass();
  $feeds_importer->disabled = FALSE; /* Edit this to true to make a default feeds_importer disabled initially */
  $feeds_importer->api_version = 1;
  $feeds_importer->id = 'os2web_kulturnaut_feeds_import_fredericiaxml';
  $feeds_importer->config = array(
    'name' => 'Kulturnaut begivenheder (fredericiaxml)',
    'description' => 'Importere kulturnaut begivenheder fra Kulturnaut.',
    'fetcher' => array(
      'plugin_key' => 'FeedsHTTPFetcher',
      'config' => array(
        'auto_detect_feeds' => FALSE,
        'use_pubsubhubbub' => FALSE,
        'designated_hub' => '',
        'request_timeout' => NULL,
        'auto_scheme' => 'http',
        'accept_invalid_cert' => FALSE,
      ),
    ),
    'parser' => array(
      'plugin_key' => 'FeedsXPathParserXML',
      'config' => array(
        'sources' => array(
          'xpathparser:2' => 'beskrivelse',
          'xpathparser:4' => 'concat(\'http://www.kultunaut.dk\', substring-after(url,\'.dk\'))',
          'xpathparser:7' => 'sted',
          'xpathparser:13' => 'startdato',
          'xpathparser:14' => 'slutdato',
          'xpathparser:15' => 'url',
          'xpathparser:16' => 'overskrift',
          'xpathparser:17' => 'sted',
          'xpathparser:18' => 'kategori',
          'xpathparser:21' => '\'fredericia\'',
          'xpathparser:22' => 'tid',
          'xpathparser:24' => 'billede',
        ),
        'rawXML' => array(
          'xpathparser:2' => 0,
          'xpathparser:4' => 0,
          'xpathparser:7' => 0,
          'xpathparser:13' => 0,
          'xpathparser:14' => 0,
          'xpathparser:15' => 0,
          'xpathparser:16' => 0,
          'xpathparser:17' => 0,
          'xpathparser:18' => 0,
          'xpathparser:21' => 0,
          'xpathparser:22' => 0,
          'xpathparser:24' => 0,
        ),
        'context' => '/main/arrlist/arr',
        'exp' => array(
          'errors' => 1,
          'tidy' => 0,
          'tidy_encoding' => 'UTF8',
          'debug' => array(
            'context' => 0,
            'xpathparser:2' => 0,
            'xpathparser:4' => 0,
            'xpathparser:7' => 0,
            'xpathparser:13' => 0,
            'xpathparser:14' => 0,
            'xpathparser:15' => 0,
            'xpathparser:16' => 0,
            'xpathparser:17' => 0,
            'xpathparser:18' => 0,
            'xpathparser:21' => 0,
            'xpathparser:22' => 0,
            'xpathparser:24' => 0,
          ),
        ),
        'allow_override' => 0,
      ),
    ),
    'processor' => array(
      'plugin_key' => 'FeedsNodeProcessor',
      'config' => array(
        'expire' => '31536000',
        'author' => '1',
        'mappings' => array(
          0 => array(
            'source' => 'xpathparser:2',
            'target' => 'field_os2web_kulturnaut_descrip',
            'unique' => FALSE,
            'language' => 'und',
          ),
          1 => array(
            'source' => 'xpathparser:4',
            'target' => 'field_os2web_kulturnaut_homepage',
            'unique' => FALSE,
            'language' => 'und',
          ),
          2 => array(
            'source' => 'xpathparser:7',
            'target' => 'field_os2web_kulturnaut_sname',
            'unique' => FALSE,
            'language' => 'und',
          ),
          3 => array(
            'source' => 'xpathparser:13',
            'target' => 'field_os2web_kulturnaut_date:start',
            'unique' => FALSE,
            'language' => 'und',
          ),
          4 => array(
            'source' => 'xpathparser:14',
            'target' => 'field_os2web_kulturnaut_date:end',
            'unique' => FALSE,
            'language' => 'und',
          ),
          5 => array(
            'source' => 'xpathparser:15',
            'target' => 'url',
            'unique' => 1,
            'language' => 'und',
          ),
          6 => array(
            'source' => 'xpathparser:16',
            'target' => 'title',
            'unique' => FALSE,
            'language' => 'und',
          ),
          7 => array(
            'source' => 'xpathparser:17',
            'target' => 'field_os2web_kulturnaut_venue',
            'term_search' => '0',
            'autocreate' => 1,
            'language' => 'und',
          ),
          8 => array(
            'source' => 'xpathparser:18',
            'target' => 'field_os2web_kulturnaut_tema',
            'term_search' => '0',
            'autocreate' => 1,
            'language' => 'und',
          ),
          9 => array(
            'source' => 'xpathparser:21',
            'target' => 'field_os2web_kulturnaut_source',
            'term_search' => '0',
            'autocreate' => 1,
          ),
          10 => array(
            'source' => 'xpathparser:22',
            'target' => 'field_os2web_kulturnaut_time',
            'unique' => FALSE,
            'language' => 'und',
          ),
          11 => array(
            'source' => 'xpathparser:24',
            'target' => 'field_os2web_kulturnaut_slidesho:uri',
            'unique' => FALSE,
            'language' => 'und',
          ),
        ),
        'update_existing' => '1',
        'input_format' => 'full_html',
        'bundle' => 'os2web_kulturnaut_knactivity',
        'authorize' => TRUE,
        'update_non_existent' => 'skip',
        'skip_hash_check' => FALSE,
      ),
    ),
    'content_type' => '',
    'update' => 0,
    'import_period' => '3600',
    'expire_period' => 3600,
    'import_on_create' => 1,
    'process_in_background' => 0,
  );
  $export['os2web_kulturnaut_feeds_import_fredericiaxml'] = $feeds_importer;

  $feeds_importer = new stdClass();
  $feeds_importer->disabled = FALSE; /* Edit this to true to make a default feeds_importer disabled initially */
  $feeds_importer->api_version = 1;
  $feeds_importer->id = 'os2web_kulturnaut_feeds_import_syddjursxml';
  $feeds_importer->config = array(
    'name' => 'Kulturnaut begivenheder (syddjursxml)',
    'description' => 'Importere kulturnaut begivenheder fra Kulturnaut.',
    'fetcher' => array(
      'plugin_key' => 'FeedsHTTPFetcher',
      'config' => array(
        'auto_detect_feeds' => FALSE,
        'use_pubsubhubbub' => FALSE,
        'designated_hub' => '',
        'request_timeout' => NULL,
        'auto_scheme' => 'http',
        'accept_invalid_cert' => FALSE,
      ),
    ),
    'parser' => array(
      'plugin_key' => 'FeedsXPathParserXML',
      'config' => array(
        'sources' => array(
          'xpathparser:2' => 'beskrivelse',
          'xpathparser:4' => 'concat(\'http://www.djurslive.dk\', substring-after(url,\'.dk\'))',
          'xpathparser:13' => 'startdato',
          'xpathparser:14' => 'slutdato',
          'xpathparser:15' => 'url',
          'xpathparser:16' => 'overskrift',
          'xpathparser:17' => '\'syddjurs\'',
          'xpathparser:18' => 'sted',
        ),
        'rawXML' => array(
          'xpathparser:2' => 0,
          'xpathparser:4' => 0,
          'xpathparser:13' => 0,
          'xpathparser:14' => 0,
          'xpathparser:15' => 0,
          'xpathparser:16' => 0,
          'xpathparser:17' => 0,
          'xpathparser:18' => 0,
        ),
        'context' => '/main/arrlist/arr',
        'exp' => array(
          'errors' => 1,
          'tidy' => 0,
          'tidy_encoding' => 'UTF8',
          'debug' => array(
            'context' => 0,
            'xpathparser:2' => 0,
            'xpathparser:4' => 0,
            'xpathparser:13' => 0,
            'xpathparser:14' => 0,
            'xpathparser:15' => 0,
            'xpathparser:16' => 0,
            'xpathparser:17' => 0,
            'xpathparser:18' => 0,
          ),
        ),
        'allow_override' => 0,
      ),
    ),
    'processor' => array(
      'plugin_key' => 'FeedsNodeProcessor',
      'config' => array(
        'expire' => '31536000',
        'author' => '1',
        'mappings' => array(
          0 => array(
            'source' => 'xpathparser:2',
            'target' => 'field_os2web_kulturnaut_descrip',
            'unique' => FALSE,
          ),
          1 => array(
            'source' => 'xpathparser:4',
            'target' => 'field_os2web_kulturnaut_homepage',
            'unique' => FALSE,
          ),
          2 => array(
            'source' => 'xpathparser:13',
            'target' => 'field_os2web_kulturnaut_date:start',
            'unique' => FALSE,
          ),
          3 => array(
            'source' => 'xpathparser:14',
            'target' => 'field_os2web_kulturnaut_date:end',
            'unique' => FALSE,
          ),
          4 => array(
            'source' => 'xpathparser:15',
            'target' => 'url',
            'unique' => 1,
          ),
          5 => array(
            'source' => 'xpathparser:16',
            'target' => 'title',
            'unique' => FALSE,
          ),
          6 => array(
            'source' => 'xpathparser:17',
            'target' => 'field_os2web_kulturnaut_source',
            'term_search' => '0',
            'autocreate' => 1,
          ),
          7 => array(
            'source' => 'xpathparser:18',
            'target' => 'field_os2web_kulturnaut_venue',
            'term_search' => '0',
            'autocreate' => 1,
          ),
        ),
        'update_existing' => '1',
        'input_format' => 'full_html',
        'bundle' => 'os2web_kulturnaut_knactivity',
        'authorize' => TRUE,
        'update_non_existent' => 'skip',
        'skip_hash_check' => FALSE,
      ),
    ),
    'content_type' => '',
    'update' => 0,
    'import_period' => '3600',
    'expire_period' => 3600,
    'import_on_create' => 1,
    'process_in_background' => 0,
  );
  $export['os2web_kulturnaut_feeds_import_syddjursxml'] = $feeds_importer;

  return $export;
}
