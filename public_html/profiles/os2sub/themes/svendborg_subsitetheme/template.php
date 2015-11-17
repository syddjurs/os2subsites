<?php
/**
 * @file
 * template.php
 */

/**
 * Implements template_preprocess_page().
 */
function svendborg_subsitetheme_process_page(&$variables, $hook) {
  // Hook into color.module.
  if (module_exists('color')) {
    _color_page_alter($variables);
  }
}

function svendborg_subsitetheme_preprocess_page(&$variables) {
  //   var_dump($variables['page']['content']);
  // Remove all Taxonomy auto listings here.

  $term = NULL;
  if (arg(0) == 'taxonomy' && arg(1) == 'term' && is_numeric(arg(2))) {
    $term = taxonomy_term_load(arg(2));
    $term_name = $term->vocabulary_machine_name;
    unset($variables['page']['content']['system_main']['no_content']);
    // There will not be nodes and other normal term content on terms
    // "os2web_base_tax_site_structure" pages.
    if ($term_name == "os2web_base_tax_site_structure") {
      unset($variables['page']['content']['system_main']['nodes']);
      unset($variables['page']['content']['system_main']['pager']);
    }
    else {
      // On Other term pages, there will be a view with nodes.
      $view = views_get_view('taxonomy_term');
      $view->set_display('block_1');
      $view->set_arguments(array(arg(2)));
      $view->set_items_per_page(20);
      $view->pre_execute();
      $view->execute();
      $variables['page']['content']['system_main'] = array(
        '#markup' => '<h1>' . $term->name . '</h1>' . $view->render(),
      );
    }

    // Variable that defines that this term is the top of the hieraki.
    $term_is_top = _svendborg_subsitetheme_term_is_top($term->tid);
    // Get wether this is a top term, and provide a variable for the templates.
    $variables['page']['term_is_top'] = $term_is_top;
  }

  $node = NULL;
  if (isset($variables['node']) && !empty($variables['node']->nid)) {
    $node = $variables['node'];
  }
  $sidebar_second_hidden = FALSE;
  $sidebar_first_hidden = FALSE;

  // Get all the nodes selvbetjeningslinks and give them to the template.
  if (($node && $links = field_get_items('node', $node, 'field_os2web_base_field_selfserv')) ||
    ($term && $links = field_get_items('taxonomy_term', $term, 'field_os2web_base_field_selfserv'))
  ) {
    $variables['page']['os2web_selfservicelinks'] = _svendborg_subsitetheme_get_selfservicelinks($links);
  }


  // Get all the nodes selvbetjeningslinks and give them to the template.
  if ($node && $link = _svendborg_subsitetheme_get_contact()) {
    $variables['page']['contact']['nid'] = $link;

  }

  // Get all related links to this node.
  // 1. Get all unique related links from the node.

  $related_links = array();
  if (($node && $links = field_get_items('node', $node, 'field_os2web_base_field_related')) ||
    ($term && $links = field_get_items('taxonomy_term', $term, 'field_os2web_base_field_related'))
  ) {
    foreach ($links as $link) {
      $link_node = node_load($link['nid']);
      if ($link_node->language != $node->language) {
        continue;
      }
      if ($link_node) {
        $related_links[$link['nid']] = array(
          'nid'   => $link['nid'],
          'title' => $link_node->title,
          'class' => 'int-link',
        );

        if ($image = field_get_items('node', $link_node, 'field_os2web_base_field_lead_img')) {
          $related_links[$link['nid']]['image'] = $image[0]['uri'];
        }
        if ($image = field_get_items('node', $link_node, 'field_os2web_base_field_image')) {
          $related_links[$link['nid']]['image'] = $image[0]['uri'];
        }
        if ($summary = field_get_items('node', $link_node, 'field_os2web_base_field_summary')) {
          $related_links[$link['nid']]['summary'] = $summary[0]['summary'];
        }
      }
    }
  }
  // 2. Get all related links related to the KLE number on the node. Only get
  // these if the checkbox "Skjul relaterede links" isn't checked.
  if (($node &&
      (!isset($node->field_os2web_base_field_hidlinks['und'][0]['value']) ||
        $node->field_os2web_base_field_hidlinks['und'][0]['value'] == '0') &&
      $kle_items = field_get_items('node', $node, 'field_os2web_base_field_kle_ref')) ||
    ($term &&
      (!isset($term->field_os2web_base_field_hidlinks['und'][0]['value']) ||
        $term->field_os2web_base_field_hidlinks['und'][0]['value'] == '0') &&
      $kle_items = field_get_items('taxonomy_term', $term, 'field_os2web_base_field_kle_ref'))
  ) {

    foreach ($kle_items as $kle) {
      // Get all nodes which have the same KLE number as this node.
      $query = new EntityFieldQuery();
      $result = $query->entityCondition('entity_type', 'node')
        ->propertyCondition('status', 1)
        ->fieldCondition('field_os2web_base_field_kle_ref', 'tid', $kle['tid'])
        ->propertyOrderBy('title', 'ASC')
        ->execute();
      if (isset($result['node'])) {
        foreach ($result['node'] as $link) {
          // Be sure to skip links which already is in list, or links to current
          // node.
          if (isset($related_links[$link->nid]) || ($node && $node->nid == $link->nid)) {
            continue;
          }
          $link_node = node_load($link->nid);
          if ($link_node->language != $node->language) {
            continue;
          }
          if ($link_node) {
            $related_links[$link->nid] = array(
              'nid'   => $link->nid,
              'title' => $link_node->title,
              'class' => 'kle-link',
            );
            if ($image = field_get_items('node', $link_node, 'field_os2web_base_field_lead_img')) {
              $related_links[$link->nid]['image'] = $image[0]['uri'];
            }
            if ($image = field_get_items('node', $link_node, 'field_os2web_base_field_image')) {
              $related_links[$link->nid]['image'] = $image[0]['uri'];
            }
            if ($summary = field_get_items('node', $link_node, 'field_os2web_base_field_summary')) {
              $related_links[$link->nid]['summary'] = $summary[0]['summary'];
            }
          }

        }
      }
    }
  }

  // External related links.
  if (($node && $ext_links = field_get_items('node', $node, 'field_os2web_base_field_ext_link')) ||
    ($term && $ext_links = field_get_items('taxonomy_term', $term, 'field_os2web_base_field_ext_link'))
  ) {
    foreach ($ext_links as $link) {
      $related_links[] = array(
        'url'   => $link['url'],
        'title' => $link['title'],
        'class' => 'ext-link',
      );
    }
  }

  // If this is a node with an embedded webform.
  // We need to load it here, in order to get messages loaded.
  if ($node && $webform = field_get_items('node', $node, 'field_os2web_base_field_webform')) {
    $variables['node']->content['os2web_webform'] = array(
      'os2web_webform'  => array(
        '#markup' => _svendborg_subsitetheme_get_webform($webform[0]['nid']),
      ),
      '#theme_wrappers' => array('container'),
    );
  }

  if (!empty($related_links)) {
    // Provide the related links to the templates.
    $variables['page']['related_links'] = $related_links;
  }
  if ($node && $node->type == "os2web_base_news") {
    $variables['page']['prev_news_block'] = TRUE;
    //$variables['page']['back_button'] = TRUE;
  }

  if ($node && $node->type == "os2web_base_contentpage") {
    $block = block_load('views', 'aktiviteter-block_2');
    if (($block->visibility == '1' && drupal_match_path(drupal_get_path_alias(current_path()), $block->pages))
      || ($block->visibility == '0' && !drupal_match_path(drupal_get_path_alias(current_path()), $block->pages))
    ) {
      $variables['page']['activities'] = TRUE;
    }

  }
  // When a node's menu link is deaktivated and has no siblings, menu_block is
  // empty, and then sidebar_first are hidden. We want to force the
  // sidebar_first to still be shown.
  $active_trail = menu_get_active_trail();
  $current_trail = end($active_trail);

  if ($node && ($node->type == "os2web_base_news")) {
    $variables['page']['sidebar_first'] = array(
      '#theme_wrappers' => array('region'),
      '#region'         => 'sidebar_first',
      'dummy_content'   => array(
        '#markup' => '<a class ="btn-back gradient-lightgreen" href="/nyheder">Nyhedsoversigt</a>',

      ),
    );
  }
  if ($node && ($node->type != "os2web_base_news")) {
    $variables['page']['sidebar_first'] = array(
      '#theme_wrappers' => array('region'),
      '#region'         => 'sidebar_first',
      'content'         => array(
        '#markup'  => drupal_render(menu_tree('main-menu')),
        '#classes' => array('indholdsmenu')
      ),
    );

  }

  // Hack to force the sidebar_second to be rendered if we have anything to put
  // in it.
  if (!$sidebar_second_hidden && empty($variables['page']['sidebar_second']) && (!empty($variables['page']['prev_news_block']) || !empty($variables['page']['contact']) || $variables['page']['activities'] || !empty($variables['page']['os2web_selfservicelinks']))) {
    $variables['page']['sidebar_second'] = array(
      '#theme_wrappers' => array('region'),
      '#region'         => 'sidebar_second',
      'dummy_content'   => array(
        '#markup' => ' ',
      ),
    );
  }
  if (empty($variables['page']['content_bottom']) && !empty($variables['page']['related_links'])) {
    $variables['page']['content_bottom'] = array(
      '#theme_wrappers' => array('region'),
      '#region'         => 'content_bottom',
      'dummy_content'   => array(
        '#markup' => ' ',
      ),
    );
    if ($node && ($node->type == "os2web_base_news")) {
      $variables['page']['related_pages_type'] = "boxes";
    }
    if ($node && ($node->type == "os2web_base_contentpage")) {
      $variables['page']['related_pages_type'] = "links";
    }

  }
  $view = views_get_page_view();
  if (!empty($view) && $view->name == 'svendborg_news_view' && $view->current_display == 'page_3') {
    if (!$sidebar_second_hidden && empty($variables['page']['sidebar_second'])) {
      $variables['page']['sidebar_second'] = array(
        '#theme_wrappers' => array('region'),
        '#region'         => 'sidebar_second',
        'dummy_content'   => array(
          '#markup' => ' ',
        ),
      );

    }
    $variables['page']['prev_news_block'] = TRUE;
    $variables['page']['activities'] = TRUE;
  }
  if ((!empty($view) && $view->name == 'svendborg_gallery' && $view->current_display == 'page') || ($node && $node->type == "os2web_base_gallery")) {
    if (!$sidebar_second_hidden && empty($variables['page']['sidebar_first'])) {

      $variables['page']['sidebar_first'] = array(
        '#theme_wrappers' => array('region'),
        '#region'         => 'sidebar_first',
        'content'         => array(
          '#markup' => drupal_render(menu_tree_output(menu_navigation_tree('main-menu', 0))),
        ),
      );

    }

  }

  // On taxonomy pages, add a news list in second sidebar.
  if ($term) {
    $view = views_get_view('os2web_news_lists');
    $view->set_display('panel_pane_2');
    $view->set_arguments(array('all', 'Branding', $term->tid));
    $view->set_items_per_page(3);
    $view->pre_execute();
    $view->execute();
    if (!empty($view->result)) {
      if (empty($variables['page']['sidebar_second'])) {
        $variables['page']['sidebar_second'] = array(
          '#theme_wrappers' => array('region'),
          '#region'         => 'sidebar_second',

        );
      }
      $variables['page']['sidebar_second']['os2web_news_lists'] = array('#markup' => $view->render());
    }
    if ($term_is_top && $term->vocabulary_machine_name == "os2web_base_tax_site_structure") {
      $variables['page']['sidebar_first'] = array();
    }
  }


  // Spotbox handling. Find all spotboxes for this node, and add them to
  // content_bottom.
  if (($node && $spotboxes = field_get_items('node', $node, 'field_os2web_base_field_spotbox')) ||
    ($term && !$term_is_top && $spotboxes = field_get_items('taxonomy_term', $term, 'field_os2web_base_field_spotbox'))
  ) {

    if (empty($variables['page']['sidebar_second'])) {
      $spotbox_render = drupal_render(_svendborg_subsitetheme_get_spotboxes($spotboxes));
    }
    else {
      $spotbox_render = drupal_render(_svendborg_subsitetheme_get_spotboxes($spotboxes, 'col-xs-6 col-sm-6 col-md-6 col-lg-6'));
    }

    $variables['page']['content']['os2web_spotbox'] = array(
      'os2web_spotbox'  => array(
        '#markup' => $spotbox_render,
      ),
      '#theme_wrappers' => array('container'),
      '#attributes'     => array(
        'class' => array('row', 'spotboxes'),
      ),
    );
  }

  // If node has hidden the sidebar, set content to null.
  if (($node && $hide_sidebar_field = field_get_items('node', $node, 'field_svendborg_hide_sidebar')) ||
    ($term && $hide_sidebar_field = field_get_items('taxonomy_term', $term, 'field_svendborg_hide_sidebar'))
  ) {
    if ($hide_sidebar_field[0]['value']) {
      $variables['page']['sidebar_second'] = array();
      $sidebar_second_hidden = TRUE;
    }
  }

  // Add out fonts from Google Fonts API.
  drupal_add_html_head(array(
    '#tag'        => 'link',
    '#attributes' => array(
      'href' => 'http://fonts.googleapis.com/css?family=Titillium+Web:400,600,700|Open+Sans:400,700',
      'rel'  => 'stylesheet',
      'type' => 'text/css',
    ),
  ), 'google_font_svendborg_subsitetheme');

  // Pass the theme path to js.
  drupal_add_js('jQuery.extend(Drupal.settings, { "pathToTheme": "' . path_to_theme() . '" });', 'inline');

  if (drupal_is_front_page()) {
    // Frontpage big menu.

    // Frontpage large carousel.
    $variables['page']['front_large_carousel'] = _svendborg_subsitetheme_get_large_carousel();

    // Frontpage small carousel.
    $variables['page']['front_small_carousel'] = _svendborg_subsitetheme_get_front_small_carousel();
  }

}

/**
 * Implements template_preprocess_taxonomy_term().
 */
function svendborg_subsitetheme_preprocess_taxonomy_term(&$variables) {

  $term = taxonomy_term_load($variables['tid']);
  $variables['term_display_alternative'] = FALSE;
  // Get wether this is a top term, and provide a variable for the templates.
  $term_is_top = _svendborg_subsitetheme_term_is_top($term->tid);
  $variables['term_is_top'] = $term_is_top;

  // Provide the spotboxes to Nyheder page or top terms. These pages does not
  // use the right sidebar so we need them in taxonomy-term.tpl
  if (isset($term->tid) && ($term->tid == 6819 || $term_is_top)) {
    $spotboxes = field_get_items('taxonomy_term', $term, 'field_os2web_base_field_spotbox');
    if ($term->tid == 6819) {
      $variables['theme_hook_suggestions'][] = 'taxonomy_term__' . $term->tid;
      $variables['news_term_branding'] = _svendborg_subsitetheme_get_large_carousel();
      $variables['news_term_content'] = _svendborg_subsitetheme_get_term_news_content();
      $variables['news_term_right_sidebar'] = _svendborg_subsitetheme_get_term_news_filer_and_quicktabs();
      $variables['os2web_spotboxes'] = ($spotboxes) ? _svendborg_subsitetheme_get_spotboxes($spotboxes, 'col-xs-6 col-sm-6 col-md-6 col-lg-6') : '';
    }
    else {
      $variables['os2web_spotboxes'] = ($spotboxes) ? _svendborg_subsitetheme_get_spotboxes($spotboxes, 'col-xs-6 col-sm-4 col-md-4 col-lg-4') : '';
    }
  }
  if (isset($term->field_alternative_display['und'][0]['value']) &&
    $term->field_alternative_display['und'][0]['value'] == 1
  ) {
    $variables['term_display_alternative'] = TRUE;
  }

}

function svendborg_subsitetheme_process_html(&$variables) {
  if (module_exists('color')) {
    _color_html_alter($variables);
  }
}

/**
 * Implements THEME_preprocess_html().
 */
function svendborg_subsitetheme_preprocess_html(&$variables) {

  // Add conditional stylesheets for IE.
  drupal_add_css(path_to_theme() . '/css/ie.css', array(
    'group'      => CSS_THEME,
    'browsers'   => array('IE' => 'lte IE 8', '!IE' => FALSE),
    'preprocess' => FALSE,
    'weight'     => 115,
  ));

  if (arg(0) == 'taxonomy' && arg(1) == 'term' && is_numeric(arg(2))) {
    // Add wether the term is top to the classes array.
    $term_is_top = _svendborg_subsitetheme_term_is_top(arg(2));

    if ($term_is_top) {
      $variables['classes_array'][] = 'term-is-top';
    }
    else {
      $variables['classes_array'][] = 'term-is-not-top';
    }
  }

  // Setup IE meta tag to force IE rendering mode.
  $meta_ie_render_engine = array(
    '#type'       => 'html_tag',
    '#tag'        => 'meta',
    '#attributes' => array(
      'http-equiv' => 'X-UA-Compatible',
      'content'    => 'IE=8,IE=Edge,chrome=1',
    ),
    '#weight'     => '-99999',
  );
  // Add header meta tag for IE to head.
  drupal_add_html_head($meta_ie_render_engine, 'meta_ie_render_engine');
}

/**
 * Implements hook_preprocess_node().
 */
function svendborg_subsitetheme_preprocess_node(&$vars) {

  // Add css class "node--NODETYPE--VIEWMODE" to nodes.
  $vars['classes_array'][] = 'node--' . $vars['type'] . '--' . $vars['view_mode'];

  $term_class = get_the_classes($vars['nid']);
  if ($term_class != '') {
    $vars['classes_array'][] = $vars['top_parent_term'] = $term_class;
  }
  // Make "node--NODETYPE--VIEWMODE.tpl.php" templates available for nodes.
  $vars['theme_hook_suggestions'][] = 'node__' . $vars['type'] . '__' . $vars['view_mode'];
}

/**
 * Retrieve the top term tid for node class array.
 */
function get_the_classes($nid) {
  $top_parent_term = '';
  $node = node_load($nid);
  if ($portalkategori = field_get_items('node', $node, 'field_os2web_base_field_struct')) {

    // This will be your top parent term if any was found.
    $parent_terms = taxonomy_get_parents_all($portalkategori[0]['tid']);

    foreach ($parent_terms as $parent) {
      $parent_parents = taxonomy_get_parents_all($parent->tid);
      if ($parent_parents != FALSE) {
        // This is top parent term.
        $top_parent_term = $parent->tid;
      }
    }
  }
  return $top_parent_term;
}

/**
 * Implements theme_menu_link().
 */
function svendborg_subsitetheme_menu_link(array $variables) {
  $element = $variables['element'];
  $sub_menu = '';

  if ($element['#below']) {
    // Prevent dropdown functions from being added to management menu so it
    // does not affect the navbar module.
    if (($element['#original_link']['menu_name'] == 'management') && (module_exists('navbar'))) {
      $sub_menu = drupal_render($element['#below']);
    }
    elseif ((!empty($element['#original_link']['depth']))) {
      // Add our own wrapper.
      unset($element['#below']['#theme_wrappers']);
      $sub_menu = '<ul class="dropdown-menu">' . drupal_render($element['#below']) . '</ul>';
      // Generate as standard dropdown.
      $element['#title'] .= ' <span class="caret"></span>';
      $element['#attributes']['class'][] = 'dropdown';
      $element['#localized_options']['html'] = TRUE;

      // Set dropdown trigger element to # to prevent inadvertant page loading
      // when a submenu link is clicked.
      $element['#localized_options']['attributes']['data-target'] = '#';
      $element['#localized_options']['attributes']['class'][] = 'dropdown-toggle';
      $element['#localized_options']['attributes']['data-toggle'] = 'dropdown';
    }
  }
  // On primary navigation menu, class 'active' is not set on active menu item.
  // @see https://drupal.org/node/1896674
  if (($element['#href'] == $_GET['q'] || ($element['#href'] == '<front>' && drupal_is_front_page())) && (empty($element['#localized_options']['language']))) {
    $element['#attributes']['class'][] = 'active';
  }
  $output = l($element['#title'], $element['#href'], $element['#localized_options']);
  return '<li' . drupal_attributes($element['#attributes']) . '>' . $output . $sub_menu . "</li>\n";
}

/**
 * Theme function to output tablinks for classic Quicktabs style tabs.
 *
 * @ingroup themeable
 */
function svendborg_subsitetheme_qt_quicktabs_tabset($vars) {
  $variables = array(
    'attributes' => array(
      'class' => 'quicktabs-tabs quicktabs-style-' . $vars['tabset']['#options']['style'],
    ),
    'items'      => array(),
  );
  foreach (element_children($vars['tabset']['tablinks']) as $key) {
    $item = array();
    if (is_array($vars['tabset']['tablinks'][$key])) {
      $tab = $vars['tabset']['tablinks'][$key];

      $class = "";
      if ($key == (count($vars['tabset']['tablinks']) - 1)) {
        $class = "last";
      }
      if ($key == $vars['tabset']['#options']['active']) {
        $item['class'] = array('active', 'tab-' . $key, $class);
      }
      else {
        $item['class'] = array('tab-' . $key, $class);
      }
      $item['data'] = "<div><span>" . drupal_render($tab) . "</span></div>";
      $variables['items'][] = $item;
    }
  }
  return theme('item_list', $variables);
}

/**
 * Implements theme_form_element().
 */
function svendborg_subsitetheme_form_element(&$variables) {
  // Because the feeds module, puts the upload filechooser in the form
  // element[#description] it is not shown. As bootstrap tries to put all
  // '#description's in tooltips.
  // This workaround puts the the description from file fields in the field
  // suffix.
  // This should probarbly be fixed in the feeds module, but, until then..
  // @see https://www.drupal.org/node/2308343
  if ($variables['element']['#type'] == 'file' && isset($variables['element']['#description'])) {
    $variables['element']['#field_suffix'] = $variables['element']['#description'];
  }
  return bootstrap_form_element($variables);
}

/**
 * Helper function to get a rendeable array of spotboxes.
 *
 * @param array $spotboxes
 *   Array of spotboxe nodes with nids.
 *
 * @return array
 *   The renderable array.
 */
function _svendborg_subsitetheme_get_spotboxes($spotboxes, $classes = 'col-xs-6 col-sm-6 col-md-4 col-lg-4') {
  $spotbox_nids = array();
  foreach ($spotboxes as $spotbox) {
    $spotbox_nids[$spotbox['nid']] = $spotbox['nid'];
  }
  $spotbox_array = os2web_spotbox_render_spotboxes($spotbox_nids, NULL, NULL, NULL, 'svendborg_spotbox');

  foreach ($spotbox_array['node'] as &$spotbox) {
    if (is_array($spotbox)) {
      $spotbox['#prefix'] = '<div class="' . $classes . '">';
      $spotbox['#suffix'] = '</div>';
    }
  }
  return $spotbox_array;
}

/**
 * Helper function to retrieve the correct array to display selfservicelinks.
 *
 * @param array $links
 *   Associated array of links with indexes 'nid'.
 *
 * @return array
 *   Array of links with URL and Title.
 */
function _svendborg_subsitetheme_get_selfservicelinks($links) {
  $selfservicelinks = array();
  foreach ($links as $link) {
    $selfservicelink = node_load($link['nid']);
    if ($selfservicelink) {
      $link_fields = field_get_items('node', $selfservicelink, 'field_spot_link');
      if (!empty($link_fields)) {
        $link_field = array_shift($link_fields);
        $selfservicelinks[$link['nid']] = array(
          'url'   => $link_field['url'],
          'title' => $link_field['title'],
        );
      }
    }
  }
  return $selfservicelinks;
}

/**
 * Helper function to return wether a term is a top term.
 *
 * @param int $term_tid
 *   The term tid.
 *
 * @return bool
 *   If this term is top.
 */
function _svendborg_subsitetheme_term_is_top($term_tid) {
  $parent = &drupal_static(__FUNCTION__ . $term_tid);
  if (empty($parent)) {
    $parent = db_query("SELECT parent FROM {taxonomy_term_hierarchy} WHERE tid = :tid", array(':tid' => $term_tid))->fetchField();
  }

  return $parent == 0;
}

/**
 * Overrides file_link, add target= '_blank', file open in a new window.
 */
function svendborg_subsitetheme_file_link($variables) {
  $file = $variables['file'];
  $icon_directory = $variables['icon_directory'];
  $url = file_create_url($file->uri);
  $icon = theme('file_icon', array(
    'file'           => $file,
    'icon_directory' => $icon_directory
  ));
  // Set options as per anchor format described at
  // http://microformats.org/wiki/file-format-examples
  $options = array(
    'attributes' => array(
      'type' => $file->filemime . '; length=' . $file->filesize,
    ),
  );
  // Use the description as the link text if available.
  if (empty($file->description)) {
    $link_text = $file->filename;
  }
  else {
    $link_text = $file->description;
    $options['attributes']['title'] = check_plain($file->filename);
  }
  // Open files of particular mime types in new window.
  $new_window_mimetypes = array('application/pdf', 'text/plain');
  if (in_array($file->filemime, $new_window_mimetypes)) {
    $options['attributes']['target'] = '_blank';
  }
  return '<span class="file">' . $icon . ' ' . l($link_text, $url, $options) . '</span>';
}

/**
 * Implements theme_file_formatter_table().
 */
function svendborg_subsitetheme_file_formatter_table($variables) {
  $header = array(t('Attachment'));
  $rows = array();
  foreach ($variables['items'] as $delta => $item) {
    $rows[] = array(
      theme('file_link', array('file' => (object) $item)),
    );
  }
  return empty($rows) ? '' : theme('table', array(
    'header' => $header,
    'rows'   => $rows
  ));
}

/**
 * Retrieve front page big menu buttons.
 */

/**
 * Retrieve large carousel.
 */
function _svendborg_subsitetheme_get_large_carousel() {
  $large_carousel = '';
  // Branding news view.
  $view = views_get_view('svendborg_news_view');
  $view->set_arguments(array('branding'));
  if (!drupal_is_front_page()) {
    $filter = $view->get_item('front', 'filter', 'promote');
    $filter['value'] = 1;
    $view->set_item('front', 'filter', 'promote', $filter);
  }
  else {
    $view->set_display('front');
  }
  $view->set_items_per_page(3);
  $view->pre_execute();
  $view->execute();

  $results = $view->result;

  $large_carousel .= '<ol class="carousel-indicators col-md-12 col-sm-12 col-xs-12">';
  foreach ($results as $key => $item) {
    $large_carousel .= '<li data-target="';
    if (drupal_is_front_page()) {
      $large_carousel .= '#front-news-branding" data-slide-to="' . $key . '"';
    }
    else {
      $large_carousel .= '#nyheder-carousel-large" data-slide-to="' . $key . '"';
    }
    if ($key == 0) {
      $large_carousel .= 'class="active"></li>';
    }
    else {
      $large_carousel .= '></li>';
    }
  }
  $large_carousel .= '</ol>';
  $large_carousel .= '<div class="carousel-inner" id="front-carousel-large" >';

  foreach ($results as $key => $item) {
    if ($key == 0) {
      $large_carousel .= '<div class="item active">';
    }
    else {
      $large_carousel .= '<div class="item">';
    }
    $node = node_load($item->nid);
    $img = field_get_items('node', $node, 'field_os2web_base_field_lead_img');
    $image = $img[0];
    image_get_info($image["filename"]);

    $style = 'svendborg_content_image';
    $public_filename = image_style_url($style, $image["uri"]);
    $path = drupal_get_path_alias('node/' . $node->nid);
    $large_carousel .= '<a href="' . $path . '" title="' . $node->title . '">';
    if (drupal_is_front_page()) {
      $classes = 'col-md-7 col-sm-8 col-xs-12';
    }
    else {
      $classes = 'col-md-8 col-sm-12 col-xs-12';
    }
    $large_carousel .= '<div class="row-no-padding ' . $classes;
    if (drupal_is_front_page()) {
      $large_carousel .= ' front-branding-img';
    }
    $large_carousel .= '">';
    $large_carousel .= '<img title = "' . $image["title"] . '" src="' . $public_filename . '"/>';
    $large_carousel .= '</div>';
    if (drupal_is_front_page()) {
      $classes = 'col-md-5 col-sm-4 col-xs-12';
    }
    else {
      $classes = 'col-md-4 col-sm-12 col-xs-12';
    }
    $large_carousel .= '<div class="carousel-title ' . $classes . '">';

    $large_carousel .= '<div class="title col-md-12">';
    $large_carousel .= $node->title;
    $large_carousel .= '</div>';

    $large_carousel .= '<div class="col-md-12">';
    $large_carousel .= '<a href="' . $path . '" title="' . $node->title . '" class="btn btn-primary">L&aelig;s mere</a>';
    $large_carousel .= '</div></div>';
    $large_carousel .= '</a>';
    $large_carousel .= '</div>';
  }
  $large_carousel .= '</div>';
  return $large_carousel;
}

/**
 * Retrieve small carousel.
 */
function _svendborg_subsitetheme_get_front_small_carousel() {
  $front_small_carousel = '';
  $view = views_get_view('svendborg_news_view');
  $view->set_arguments(array('all'));
  $view->set_display('block_3');
  $view->set_items_per_page(9);
  $view->pre_execute();
  $view->execute();

  $results = $view->result;

  $front_small_carousel .= '<div id="front-carousel-small" class="carousel slide" data-ride="carousel">
                           <ol class="carousel-indicators col-md-12 col-sm-12 col-xs-12">';
  if (count($results) > 0) {
    $front_small_carousel .= '<li data-target="#front-carousel-small" data-slide-to="0" class="active"></li>';
  }
  if (count($results) > 3) {
    $front_small_carousel .= '<li data-target="#front-carousel-small" data-slide-to="1"></li>';
  }
  if (count($results) > 6) {
    $front_small_carousel .= '<li data-target="#front-carousel-small" data-slide-to="2"></li>';
  }

  $front_small_carousel .= '</ol>';

  $front_small_carousel .= '<div class="carousel-inner">';

  $small_news_carousel = array();
  foreach ($results as $key => $item) {
    if ($key < 3) {
      $small_news_carousel[0][] = $item;
    }
    elseif ($key >= 3 && $key <= 5) {
      $small_news_carousel[1][] = $item;
    }
    elseif ($key >= 6) {
      $small_news_carousel[2][] = $item;
    }
  }
  foreach ($small_news_carousel as $key => $items) {
    if ($key == 0) {
      $front_small_carousel .= '<div class="item active">';
    }
    else {
      $front_small_carousel .= '<div class="item">';
    }
    foreach ($items as $i => $item) {
      $node = node_load($item->nid);
      $img = field_get_items('node', $node, 'field_os2web_base_field_lead_img');
      $image = $img[0];
      image_get_info($image["filename"]);

      $style = 'svendborg_content_image';
      $public_filename = image_style_url($style, $image["uri"]);

      $path = drupal_get_path_alias('node/' . $node->nid);
      $front_small_carousel .= '<a href="' . $path . '">';
      $front_small_carousel .= '<div class="col-md-4 col-sm-4 col-xs-12">';
      $front_small_carousel .= '<div class="front-s-news-item front-s-news-item-' . $i . '">';

      $front_small_carousel .= '<div class="front-s-news-item-img">';
      $front_small_carousel .= '<img title = "' . $image["title"] . '" src="' . $public_filename . '"/>';
      $front_small_carousel .= '</div>';

      $front_small_carousel .= '<div class="front-s-news-item-text">';
      $front_small_carousel .= '<div class="bubble"><span>' . $node->title . '</span></div>';
      $front_small_carousel .= '</div>';

      $front_small_carousel .= '</div>';
      $front_small_carousel .= '</div>';
      $front_small_carousel .= '</a>';
    }
    $front_small_carousel .= '</div>';
  }

  $front_small_carousel .= '</div></div>';

  $front_small_carousel .= '<div class="front-seperator"></div>';
  return $front_small_carousel;
}

/**
 * Retrieve the news term filter and quicktabs.
 */
function _svendborg_subsitetheme_get_term_news_filer_and_quicktabs() {
  $news_term_right_sidebar = '';
  // Filter.
  $block = block_load('views', 'news_filter-block');
  $output = _block_get_renderable_array(_block_render_blocks(array($block)));
  $news_term_right_sidebar .= drupal_render($output);

  // Menu block.
  $block = block_load('menu_block', '4');
  $output = _block_get_renderable_array(_block_render_blocks(array($block)));
  $news_term_right_sidebar .= drupal_render($output);

  $news_term_right_sidebar .= '<div class="nyheder-seperator"></div>';

  // Quick tabs.
  $news_term_right_sidebar .= ' <div id="svendborg_tabs">';
  $block_tab = block_load('quicktabs', 'nyhed_quicktabs');
  $output = _block_get_renderable_array(_block_render_blocks(array($block_tab)));
  $news_term_right_sidebar .= drupal_render($output);
  $news_term_right_sidebar .= '</div>';

  $news_term_right_sidebar .= '<div class="nyheder-seperator"></div>';

  return $news_term_right_sidebar;

}

/**
 * Retrieve news term content view.
 */
function _svendborg_subsitetheme_get_term_news_content() {
  $content = '';
  $view = views_get_view('svendborg_news_view');
  $view->set_display('block');
  $view->set_arguments(array('nyhed', 'all'));
  $view->pre_execute();
  $view->execute();
  $content .= $view->render('block');
  return $content;
}

/**
 * =======
 * >>>>>>> Stashed changes
 * Helper. Returns almost the same as render(node_view()) for a webform.
 *
 * Instead of a fully loaded render array, though, it returns markup, without
 * too many wrappers and such.
 */
function _svendborg_subsitetheme_get_webform($nid) {
  $webform_node = node_load($nid);

  $submission = (object) array();
  $enabled = TRUE;
  $preview = FALSE;
  $webform_id = 'webform_client_form_' . $nid;

  $form = drupal_get_form($webform_id, $webform_node, $submission, $enabled, $preview);

  $text = '<h3>' . $webform_node->title . '</h3>';

  if ($body = field_get_items('node', $webform_node, 'body')) {
    $text .= $body[0]['safe_value'];
  }

  return $text . drupal_render($form);
}

function _svendborg_subsitetheme_block_render($module, $block_id) {
  $block = block_load($module, $block_id);
  $block_content = _block_render_blocks(array($block));
  $build = _block_get_renderable_array($block_content);
  $block_rendered = drupal_render($build);
  return $block_rendered;
}

function _svendborg_subsitetheme_get_contact() {
  $menuParent = menu_get_active_trail();

  for ($i = count($menuParent) - 1; $i >= 0; $i--) {
    // var_dump($menuParent[$i]["link_path"]);
    $node1 = menu_get_object('node', 1, $menuParent[$i]["link_path"]);
    if (isset($node1->field_os2web_base_field_contact['und'])) {
      return $link[0]['nid'] = $node1->field_os2web_base_field_contact['und'][0]['nid'];


    }

  }
  return FALSE;
}

function svendborg_subsitetheme_preprocess_views_view_unformatted(&$var) {
  // Determine if this view's content should render in columns.
  // @see: _YOUR_THEME_views_columns();
  // var_dump('here');
  _svendborg_subsitetheme_views_columns($var, array(
    'svendborg_news_view|svendborg_latest_news_two_col'   => 2,
    'svendborg_news_view|svendborg_latest_news_three_col' => 3,
  ));


}

/**
 * Separate the view content into columns.
 *
 * @param (array) $variables
 *   An associative array referencing the variables currently being preprocessed.
 * @param (array) $view
 *   An associative array containing the following syntax ($view_id => $columns):
 *     (string) $view_id: The view name in the format of: name|display_id.
 *                        Optional: |display_id. If omitted, all displays in the
 *                        view will be processed.
 *        (int) $columns: The number of columns to separate rows into. Value must
 *                        be larger than 1, obviously.
 * @param (bool) $render_empty
 *   A boolean switch determining whether to render empty columns, this typically
 *   happens when the view row count is smaller than the specified column count.
 *   Default: FALSE.
 */
function _svendborg_subsitetheme_views_columns(array &$var, array $views = array(), $render_all = FALSE) {
  // Initial value.
  $var['columns'] = FALSE;
  // Do not process if there are no results.
  if (!$count = count($var['view']->result)) {
    return;
  }
  // Check if this is a valid view to process.
  $view_id = $var['view']->name . '|' . $var['view']->current_display;
  if (!in_array($view_id, array_keys($views))) {
    if (!in_array($var['view']->name, array_keys($views))) {
      return;
    }
    $view_id = $var['view']->name;
  }
  // Get the number of columns and ensure it's an integer and greater than 1.
  if (!isset($views[$view_id]) || (is_int($views[$view_id]) && $views[$view_id] < 2)) {
    return;
  }
  // Create the columns.
  $columns = $views[$view_id];

  $limit = ($count % $columns == 0) ? $count / $columns : ceil($count / $columns);
  $current_column = 0;
  $current_row = 1;
  foreach ($var['rows'] as $id => $row) {
    if ($current_row > $limit) {
      $current_column++;
      $current_row = 1;
    }
    $var['columns'][$current_column][$id] = $row;
    $current_row++;
  }
  if ($render_all && $current_column < ($columns - 1)) {
    $diff = ($columns - 1) - $current_column;
    for ($i = 0; $i < $diff; $i++) {
      $current_column++;
      $var['columns'][$current_column] = array();
    }
  }
  // Generate column classes.
  $var['columns_classes'] = array();
  $var['columns_classes_array'] = array();
  foreach (array_keys($var['columns']) as $id) {
    $html_id = $id + 1;
    $var['columns_classes_array'][$id][] = 'views-column';
    $var['columns_classes_array'][$id][] = 'col-sm-' . 12 / $columns;
    $var['columns_classes_array'][$id][] = 'views-column-' . $html_id;
    $var['columns_classes_array'][$id][] = 'views-column-' . ($html_id % 2 ? 'odd' : 'even');
    if ($id == 0) {
      $var['columns_classes_array'][$id][] = 'views-column-first';
    }
    if ($id == $current_column) {
      $var['columns_classes_array'][$id][] = 'views-column-last';
    }
    $var['columns_classes'][$id] = implode(' ', $var['columns_classes_array'][$id]);
  }

}

function svendborg_subsitetheme_less_variables_alter(&$less_variables, $system_name) {
  $color_palette = variable_get('color_svendborg_subsitetheme_palette', FALSE);
  if (empty($color_palette)) {
    $color_palette = array(
      'brand-lightblue'  => '#2880b9',
      'brand-lightgreen' => '#85c500',
      'gradient-light'   => '#0086ca',
      'introtekst'       => '#2880b9',
    );
  }
  foreach ($color_palette as $key => $value) {
    $color_palette['@' . $key] = $color_palette[$key];
    unset($color_palette[$key]);
  }

  $less_variables = $color_palette;
}

function svendborg_subsitetheme_photoswipe_imagefield($variables) {
  $class = array('photoswipe');
  if (!empty($variables['image']['style_name'])) {
    $image = theme('image_style', $variables['image']);
  }
  else {
    $image = theme('image', $variables['image']);
  }

  $options = array(
    'html'       => TRUE,
    'attributes' => array(
      'class'              => implode(' ', $class),
      'data-size'          => $variables['dimensions'],
      'data-overlay-title' => $variables['image']['title'] . '<span alt="desc">' . $variables['image']['alt'] . '</span>'
    )
  );
  return l($image, $variables['path'], $options);
}

function svendborg_subsitetheme_views_slideshow_pager_widget_render($vars) {
  $js_vars = array(
    'viewsSlideshowPager' => array(
      $vars['vss_id'] => array(
        $vars['location'] => array(
          'type' => preg_replace('/_(.?)/e', "strtoupper('$1')", $vars['settings']['type']),
        ),
      ),
    ),
  );

  drupal_add_js($js_vars, 'setting');

  // Create some attributes
  $attributes['class'] = 'widget_pager container widget_pager_' . $vars['location'];
  $attributes['id'] = 'widget_pager_' . $vars['location'] . '_' . $vars['vss_id'];
  return theme($vars['settings']['type'], array(
    'vss_id'     => $vars['vss_id'],
    'view'       => $vars['view'],
    'settings'   => $vars['settings'],
    'location'   => $vars['location'],
    'attributes' => $attributes
  ));
}

function menu_navigation_tree($menu_name, $level = 0) {
  // Don't even bother querying the menu table if no menu is specified.
  if (empty($menu_name)) {
    return array();
  }

// Get the menu hierarchy for the current page.
  $tree = menu_tree_page_data($menu_name);

// Go down the active trail until the right level is reached.
  while ($level-- > 0 && $tree) {
    // Loop through the current level's items until we find one that is in trail.
    while ($item = array_shift($tree)) {
      if ($item['link']['in_active_trail']) {
        // If the item is in the active trail, we continue in the subtree.
        $tree = empty($item['below']) ? array() : $item['below'];
        break;
      }
    }
  }
  return $tree;
}
