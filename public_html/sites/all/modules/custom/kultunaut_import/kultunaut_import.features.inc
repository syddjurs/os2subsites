<?php
/**
 * @file
 * kultunaut_import.features.inc
 */

/**
 * Implements hook_ctools_plugin_api().
 */
function kultunaut_import_ctools_plugin_api($module = NULL, $api = NULL) {
  if ($module == "page_manager" && $api == "pages_default") {
    return array("version" => "1");
  }
  if ($module == "strongarm" && $api == "strongarm") {
    return array("version" => "1");
  }
}

/**
 * Implements hook_views_api().
 */
function kultunaut_import_views_api($module = NULL, $api = NULL) {
  return array("api" => "3.0");
}

/**
 * Implements hook_default_search_api_index().
 */
function kultunaut_import_default_search_api_index() {
  $items = array();
  $items['oplevsyddjurs_search_index'] = entity_import('search_api_index', '{
    "name" : "Oplevsyddjurs_search_index",
    "machine_name" : "oplevsyddjurs_search_index",
    "description" : null,
    "server" : "oplevsyddjurs_search_server",
    "item_type" : "multiple",
    "options" : {
      "datasource" : { "types" : [ "node", "taxonomy_term" ] },
      "index_directly" : 1,
      "cron_limit" : "50",
      "fields" : {
        "node:field_os2web_base_field_text" : { "type" : "text" },
        "node:field_os2web_kulturnaut_homepage" : { "type" : "text", "boost" : "0.5" },
        "node:field_os2web_kulturnaut_price" : { "type" : "text" },
        "node:field_os2web_kulturnaut_saddress" : { "type" : "text" },
        "node:field_os2web_kulturnaut_sarrang" : { "type" : "text" },
        "node:field_os2web_kulturnaut_scity" : { "type" : "text" },
        "node:field_os2web_kulturnaut_shomepag" : { "type" : "text" },
        "node:field_os2web_kulturnaut_sname" : { "type" : "text" },
        "node:field_os2web_kulturnaut_venue:parents_all:name" : { "type" : "list\\u003Ctext\\u003E" },
        "node:status" : { "type" : "integer" },
        "node:sticky" : { "type" : "boolean" },
        "node:title" : { "type" : "text", "boost" : "5.0" },
        "search_api_language" : { "type" : "string" },
        "taxonomy_term:description" : { "type" : "list\\u003Ctext\\u003E" },
        "taxonomy_term:name" : { "type" : "list\\u003Ctext\\u003E", "boost" : "8.0" }
      },
      "data_alter_callbacks" : {
        "search_api_alter_bundle_filter" : {
          "status" : 1,
          "weight" : "-10",
          "settings" : {
            "default" : "0",
            "bundles" : {
              "node:os2sub_event" : "node:os2sub_event",
              "node:event_calendar" : "node:event_calendar",
              "node:os2web_base_contentpage" : "node:os2web_base_contentpage",
              "node:os2web_kulturnaut_knactivity" : "node:os2web_kulturnaut_knactivity",
              "node:os2web_base_news" : "node:os2web_base_news",
              "taxonomy_term:os2web_taxonomies_tax_places" : "taxonomy_term:os2web_taxonomies_tax_places",
              "taxonomy_term:tags" : "taxonomy_term:tags"
            }
          }
        },
        "search_api_alter_language_control" : {
          "status" : 0,
          "weight" : "0",
          "settings" : { "lang_field" : "", "languages" : [] }
        },
        "search_api_alter_add_hierarchy" : {
          "status" : 1,
          "weight" : "0",
          "settings" : { "fields" : { "taxonomy_term:parents_all" : "taxonomy_term:parents_all" } }
        },
        "search_api_alter_add_aggregation" : { "status" : 0, "weight" : "0", "settings" : [] },
        "search_api_alter_add_url" : { "status" : 0, "weight" : "0", "settings" : [] }
      },
      "processors" : {
        "fuzzysearch_search" : {
          "status" : 1,
          "weight" : "-50",
          "settings" : {
            "ngram_length" : "3",
            "missing_letters" : "5",
            "extra_letters" : "5",
            "completeness" : "40",
            "sort_score" : 1
          }
        },
        "fuzzysearch_excerpt" : {
          "status" : 1,
          "weight" : "-50",
          "settings" : {
            "debug_score" : 1,
            "excerpt_length" : "200",
            "max_result_length" : "400",
            "spelling" : "30"
          }
        },
        "search_api_case_ignore" : {
          "status" : 1,
          "weight" : "0",
          "settings" : { "fields" : {
              "node:title" : true,
              "node:field_os2web_base_field_text" : true,
              "node:field_os2web_kulturnaut_homepage" : true,
              "node:field_os2web_kulturnaut_price" : true,
              "node:field_os2web_kulturnaut_saddress" : true,
              "node:field_os2web_kulturnaut_sarrang" : true,
              "node:field_os2web_kulturnaut_scity" : true,
              "node:field_os2web_kulturnaut_shomepag" : true,
              "node:field_os2web_kulturnaut_sname" : true,
              "taxonomy_term:name" : true,
              "taxonomy_term:description" : true
            }
          }
        },
        "search_api_html_filter" : {
          "status" : 0,
          "weight" : "10",
          "settings" : {
            "fields" : {
              "node:title" : true,
              "node:field_os2web_base_field_text" : true,
              "node:field_os2web_kulturnaut_homepage" : true,
              "node:field_os2web_kulturnaut_price" : true,
              "node:field_os2web_kulturnaut_saddress" : true,
              "node:field_os2web_kulturnaut_sarrang" : true,
              "node:field_os2web_kulturnaut_scity" : true,
              "node:field_os2web_kulturnaut_shomepag" : true,
              "node:field_os2web_kulturnaut_sname" : true,
              "taxonomy_term:name" : true,
              "taxonomy_term:description" : true
            },
            "title" : 0,
            "alt" : 1,
            "tags" : "h1 = 5\\r\\nh2 = 3\\r\\nh3 = 2\\r\\nstrong = 2\\r\\nb = 2\\r\\nem = 1.5\\r\\nu = 1.5"
          }
        },
        "search_api_transliteration" : {
          "status" : 0,
          "weight" : "15",
          "settings" : { "fields" : {
              "node:title" : true,
              "node:field_os2web_base_field_text" : true,
              "node:field_os2web_kulturnaut_homepage" : true,
              "node:field_os2web_kulturnaut_price" : true,
              "node:field_os2web_kulturnaut_saddress" : true,
              "node:field_os2web_kulturnaut_sarrang" : true,
              "node:field_os2web_kulturnaut_scity" : true,
              "node:field_os2web_kulturnaut_shomepag" : true,
              "node:field_os2web_kulturnaut_sname" : true,
              "taxonomy_term:name" : true,
              "taxonomy_term:description" : true
            }
          }
        },
        "search_api_tokenizer" : {
          "status" : 0,
          "weight" : "20",
          "settings" : {
            "fields" : {
              "node:title" : true,
              "node:field_os2web_base_field_text" : true,
              "node:field_os2web_kulturnaut_homepage" : true,
              "node:field_os2web_kulturnaut_price" : true,
              "node:field_os2web_kulturnaut_saddress" : true,
              "node:field_os2web_kulturnaut_sarrang" : true,
              "node:field_os2web_kulturnaut_scity" : true,
              "node:field_os2web_kulturnaut_shomepag" : true,
              "node:field_os2web_kulturnaut_sname" : true,
              "taxonomy_term:name" : true,
              "taxonomy_term:description" : true
            },
            "spaces" : "[^[:alnum:]]",
            "ignorable" : "[\\u0027]"
          }
        },
        "search_api_stopwords" : {
          "status" : 1,
          "weight" : "30",
          "settings" : {
            "fields" : {
              "node:title" : true,
              "node:field_os2web_base_field_text" : true,
              "node:field_os2web_kulturnaut_homepage" : true,
              "taxonomy_term:description" : true
            },
            "file" : "",
            "stopwords" : "af\\r\\nalle\\r\\nandet\\r\\nandre\\r\\nat\\r\\nbegge\\r\\nda\\r\\nde\\r\\nden\\r\\ndenne\\r\\nder\\r\\nderes\\r\\ndet\\r\\ndette\\r\\ndig\\r\\ndin\\r\\ndog\\r\\ndu\\r\\nej\\r\\neller\\r\\nen\\r\\nend\\r\\nene\\r\\neneste\\r\\nenhver\\r\\net\\r\\nfem\\r\\nfire\\r\\nflere\\r\\nfleste\\r\\nfor\\r\\nfordi\\r\\nforrige\\r\\nfra\\r\\nf\\u00e5\\r\\nf\\u00f8r\\r\\ngod\\r\\nhan\\r\\nhans\\r\\nhar\\r\\nhendes\\r\\nher\\r\\nhun\\r\\nhvad\\r\\nhvem\\r\\nhver\\r\\nhvilken\\r\\nhvis\\r\\nhvor\\r\\nhvordan\\r\\nhvorfor\\r\\nhvorn\\u00e5r\\r\\ni\\r\\nikke\\r\\nind\\r\\ningen\\r\\nintet\\r\\njeg\\r\\njeres\\r\\nkan\\r\\nkom\\r\\nkommer\\r\\nlav\\r\\nlidt\\r\\nlille\\r\\nman\\r\\nmand\\r\\nmange\\r\\nmed\\r\\nmeget\\r\\nmen\\r\\nmens\\r\\nmere\\r\\nmig\\r\\nned\\r\\nni\\r\\nnogen\\r\\nnoget\\r\\nny\\r\\nnyt\\r\\nn\\u00e6r\\r\\nn\\u00e6ste\\r\\nn\\u00e6sten\\r\\nog\\r\\nop\\r\\notte\\r\\nover\\r\\np\\u00e5\\r\\nse\\r\\nseks\\r\\nses\\r\\nsom\\r\\nstor\\r\\nstore\\r\\nsyv\\r\\nti\\r\\ntil\\r\\nto\\r\\ntre\\r\\nud\\r\\nvar\\r\\netc"
          }
        },
        "search_api_porter_stemmer" : {
          "status" : 0,
          "weight" : "35",
          "settings" : {
            "fields" : {
              "node:title" : true,
              "node:field_os2web_base_field_text" : true,
              "node:field_os2web_kulturnaut_homepage" : true,
              "node:field_os2web_kulturnaut_price" : true,
              "node:field_os2web_kulturnaut_saddress" : true,
              "node:field_os2web_kulturnaut_sarrang" : true,
              "node:field_os2web_kulturnaut_scity" : true,
              "node:field_os2web_kulturnaut_shomepag" : true,
              "node:field_os2web_kulturnaut_sname" : true,
              "taxonomy_term:name" : true,
              "taxonomy_term:description" : true
            },
            "exceptions" : "texan=texa"
          }
        },
        "search_api_highlighting" : {
          "status" : 0,
          "weight" : "40",
          "settings" : {
            "prefix" : "\\u003Cstrong\\u003E",
            "suffix" : "\\u003C\\/strong\\u003E",
            "excerpt" : 1,
            "excerpt_length" : "256",
            "exclude_fields" : [],
            "highlight" : "always",
            "highlight_partial" : 0
          }
        }
      }
    },
    "enabled" : "1",
    "read_only" : "0"
  }');
  return $items;
}

/**
 * Implements hook_default_search_api_server().
 */
function kultunaut_import_default_search_api_server() {
  $items = array();
  $items['oplevsyddjurs_search_server'] = entity_import('search_api_server', '{
    "name" : "Oplevsyddjurs_search_server",
    "machine_name" : "oplevsyddjurs_search_server",
    "description" : "",
    "class" : "fuzzysearch_service",
    "options" : {
      "database" : "default:default",
      "min_chars" : "3",
      "indexes" : { "oplevsyddjurs_search_index" : {
          "search_api_language" : {
            "table" : "fuzzysearch_oplevsyddjurs_search_index_search_api_language",
            "type" : "string",
            "boost" : "1.0"
          },
          "node:title" : {
            "table" : "fuzzysearch_oplevsyddjurs_search_index_node_title",
            "type" : "text",
            "boost" : "5.0"
          },
          "node:status" : {
            "table" : "fuzzysearch_oplevsyddjurs_search_index_node_status",
            "type" : "integer",
            "boost" : "1.0"
          },
          "node:sticky" : {
            "table" : "fuzzysearch_oplevsyddjurs_search_index_node_sticky",
            "type" : "boolean",
            "boost" : "1.0"
          },
          "node:field_os2web_base_field_text" : {
            "table" : "fuzzysearch_oplevsyddjurs_search_index_node_field_os2web_base_f",
            "type" : "text",
            "boost" : "1.0"
          },
          "node:field_os2web_kulturnaut_homepage" : {
            "table" : "fuzzysearch_oplevsyddjurs_search_index_node_field_os2web_kultur",
            "type" : "text",
            "boost" : "0.5"
          },
          "node:field_os2web_kulturnaut_price" : {
            "table" : "fuzzysearch_oplevsyddjurs_search_index_node_field_os2web_kult_1",
            "type" : "text",
            "boost" : "1.0"
          },
          "node:field_os2web_kulturnaut_saddress" : {
            "table" : "fuzzysearch_oplevsyddjurs_search_index_node_field_os2web_kult_2",
            "type" : "text",
            "boost" : "1.0"
          },
          "node:field_os2web_kulturnaut_sarrang" : {
            "table" : "fuzzysearch_oplevsyddjurs_search_index_node_field_os2web_kult_3",
            "type" : "text",
            "boost" : "1.0"
          },
          "node:field_os2web_kulturnaut_scity" : {
            "table" : "fuzzysearch_oplevsyddjurs_search_index_node_field_os2web_kult_4",
            "type" : "text",
            "boost" : "1.0"
          },
          "node:field_os2web_kulturnaut_shomepag" : {
            "table" : "fuzzysearch_oplevsyddjurs_search_index_node_field_os2web_kult_5",
            "type" : "text",
            "boost" : "1.0"
          },
          "node:field_os2web_kulturnaut_sname" : {
            "table" : "fuzzysearch_oplevsyddjurs_search_index_node_field_os2web_kult_6",
            "type" : "text",
            "boost" : "1.0"
          },
          "taxonomy_term:name" : {
            "table" : "fuzzysearch_oplevsyddjurs_search_index_taxonomy_term_name",
            "type" : "list\\u003Ctext\\u003E",
            "boost" : "8.0"
          },
          "taxonomy_term:description" : {
            "table" : "fuzzysearch_oplevsyddjurs_search_index_taxonomy_term_descriptio",
            "type" : "list\\u003Ctext\\u003E",
            "boost" : "1.0"
          },
          "node:field_os2web_kulturnaut_venue:parents_all:name" : {
            "table" : "fuzzysearch_oplevsyddjurs_search_index_node_field_os2web_kult_7",
            "type" : "list\\u003Ctext\\u003E",
            "boost" : "1.0"
          }
        }
      }
    },
    "enabled" : "1"
  }');
  return $items;
}
