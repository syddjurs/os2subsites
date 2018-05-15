<?php

/**
 * @file
 * Script to fix unpublished by mistake nodes.
 */

  watchdog('cron', 'Node publishing fix task started');

  $type = 'os2web_kulturnaut_knactivity';
  $query = new \EntityFieldQuery();
  $result = $query->entityCondition('entity_type', 'node')
      ->entityCondition('bundle', $type)
      ->propertyCondition('status', NODE_NOT_PUBLISHED)
      ->execute();

  if (!empty($result['node'])) {
    $nids = array_keys($result['node']);
    $nodes = node_load_multiple($nids);
    $i = 0;
    $unpublished_nodes = array();

    foreach ($nodes as $node) {
      $node_end_date_str = $node->field_os2web_kulturnaut_date['und'][0]['value2'];

      $node_end_date = DateTime::createFromFormat('Y-m-d H:i:s', $node_end_date_str);
      $current_date = new DateTime('now');

      if ($current_date < $node_end_date) {
        $node->status = NODE_PUBLISHED;
        node_save($node);
        $i++;
        $unpublished_nodes[] = $node->nid;
        watchdog('cron', 'Node ' . $node->nid . ' Published. Unpublishing by mistake fixed.');
      }
    }
    watchdog('cron', 'Nodes published: '. $i . ' ('. implode(',', $unpublished_nodes) . ')');
  }
  else{
    watchdog('cron', 'No publeshed nodes found');
  }
  watchdog('cron', 'Node publishing fix task finished');
