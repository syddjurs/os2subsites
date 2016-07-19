<?php
/**
 * @file
 * os2sub_gruppe.rules_defaults.inc
 */

/**
 * Implements hook_default_rules_configuration().
 */
function os2sub_gruppe_default_rules_configuration() {
  $items = array();
  $items['og_nyt_indhold_i_gruppe'] = entity_import('rules_config', '{ "og_nyt_indhold_i_gruppe" : {
      "LABEL" : "Nyt indhold i gruppe",
      "PLUGIN" : "reaction rule",
      "OWNER" : "rules",
      "REQUIRES" : [ "og", "rules", "mimemail" ],
      "ON" : { "node_insert" : [] },
      "IF" : [ { "og_entity_is_group_content" : { "entity" : [ "node" ] } } ],
      "DO" : [
        { "og_get_members" : {
            "USING" : { "group_content" : [ "node" ] },
            "PROVIDE" : { "group_members" : { "group_members" : "List of group members" } }
          }
        },
        { "LOOP" : {
            "USING" : { "list" : [ "group-members" ] },
            "ITEM" : { "list_item" : "Current list item" },
            "DO" : [
              { "mimemail" : {
                  "key" : "[site:name]-nid-[node:nid][site:current-date]",
                  "to" : "[site:mail]",
                  "bcc" : "[list-item:mail]",
                  "from_name" : "[site:name] - [node:group-group]",
                  "from_mail" : "[site:mail]",
                  "reply_to" : "[site:mail]",
                  "list_unsubscribe" : "[site:mail]",
                  "subject" : "[site:name] - [node:group-group] - [node:content-type] - [node:title]",
                  "body" : "\\u003Ch1\\u003E[node:title]\\u003C\\/h1\\u003E\\r\\n\\u003Ch2\\u003E[node:field-os2web-base-field-text]\\u003C\\/h2\\u003E\\r\\n\\u003Ch3\\u003ETidspunkt: \\u003Cspan class=\\u0022date\\u0022\\u003E[node:event-calendar-date:value]\\u003Cspan\\u003E\\u003C\\/h3\\u003E\\r\\n\\u003Cdiv\\u003E[node:body]\\u003C\\/div\\u003E\\r\\n\\u003Cdiv\\u003ESe online: [node:url]\\u003C\\/div\\u003E",
                  "plaintext" : "[node:title]\\r\\n[node:field-os2web-base-field-text]\\r\\nTidspunkt: [node:event-calendar-date]\\r\\n[node:body]\\r\\nSe online: [node:url]",
                  "attachments" : "[node:field_os2web_base_field_media]",
                  "language" : [ "site:current-page:language" ]
                }
              }
            ]
          }
        }
      ]
    }
  }');
  return $items;
}
