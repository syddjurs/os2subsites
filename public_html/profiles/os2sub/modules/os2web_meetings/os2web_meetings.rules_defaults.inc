<?php
/**
 * @file
 * os2web_meetings.rules_defaults.inc
 */

/**
 * Implements hook_default_rules_configuration().
 */
function os2web_meetings_default_rules_configuration() {
  $items = array();
  $items['rules_os2web_flush_varnish_on_save'] = entity_import('rules_config', '{ "rules_os2web_flush_varnish_on_save" : {
      "LABEL" : "Flush varnish on save",
      "PLUGIN" : "reaction rule",
      "REQUIRES" : [ "rules", "expire" ],
      "ON" : [ "node_insert" ],
      "IF" : [
        { "node_is_of_type" : {
            "node" : [ "node" ],
            "type" : { "value" : { "os2web_meetings_meeting" : "os2web_meetings_meeting" } }
          }
        }
      ],
      "DO" : [ { "expire_flush_url" : { "urls" : "dagsorden-og-referat" } } ]
    }
  }');
  return $items;
}
