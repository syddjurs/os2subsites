<?php

/**
 * @file
 * This template is used to print a single field in a view.
 *
 * It is not actually used in default Views, as this is registered as a theme
 * function which has better performance. For single overrides, the template is
 * perfectly okay.
 *
 * Variables available:
 * - $view: The view object
 * - $field: The field handler object that can process the input
 * - $row: The raw SQL result that can be used
 * - $output: The processed output that will normally be used.
 *
 * When fetching output from the $row, this construct should be used:
 * $data = $row->{$field->field_alias}
 *
 * The above will guarantee that you'll always get the correct data,
 * regardless of any changes in the aliasing that might happen if
 * the view is modified.
 */
?>
<?php
$node = node_load($row->nid);
$image = array(
  'style_name' => 'os2sub_banner',
  'path'       => $node->field_banner_billede['und'][0]['uri'],
);
$img_tag = theme('image_style', $image);
preg_match('/<img(.*)src(.*)=(.*)"(.*)"/U', $img_tag, $result);
$image_uri = array_pop($result);
//$image_uri = file_create_url($node->field_banner_billede['und'][0]['uri']);
if (theme_get_setting('slider_overlay', 'svendborg_subsitetheme')) {
  $background = "background-image: url('" . $image_uri . "')"
    . "background-image: -moz-linear-gradient(left, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.75) 100%), url('" . $image_uri . "');"
    . "background-image: -webkit-gradient(left top, right top, color-stop(0%, rgba(0,0,0,0.75)), color-stop(100%, rgba(0,0,0,0.75))), url('" . $image_uri . "');"
    . "background-image: -webkit-linear-gradient(left, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.75) 100%), url('" . $image_uri . "');"
    . "background-image: -o-linear-gradient(left, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.75) 100%), url('" . $image_uri . "');"
    . "background-image: -ms-linear-gradient(left, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.75) 100%), url('" . $image_uri . "');"
    . "background-image: linear-gradient(to right, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.75) 100%), url('" . $image_uri . "');"
    . "filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#000000', endColorstr='#000000', GradientType=1 );";
}
else {
  $background = "background-image: url('" . $image_uri . "')";
}
$indicator_active_uri = file_create_url(drupal_get_path('theme', 'svendborg_subsitetheme') . '/images/slider_active.png');
$indicator_inactive_uri = file_create_url(drupal_get_path('theme', 'svendborg_subsitetheme') . '/images/slider_inactive.png');
$total_row = count($view->result);
$current_row = 1;
for ($i = 0; $i < $total_row; $i++) {
  if ($view->result[$i]->nid == $row->nid) {
    $current_row = $i + 1;
  }
}
$indicators = '';
//adding inactive indicators
for ($i = 1; $i < $current_row; $i++) {
  $indicators .= '<span class="indicator" ><span class="  inactive"> </span></span>';// . '<img src="' . $indicator_inactive_uri. '" class="inactive">' . '</span>';
}
//adding active indicator
$indicators .= '<span class="indicator" ><span class=" active"> </span></span>';// . '<img src="' . $indicator_active_uri. '" class="active">' . '</span>';
//adding inactive indicators
for ($i = $current_row; $i < $total_row; $i++) {
  $indicators .= '<span class="indicator"><span class="inactive"> </span></span>';// . '<img src="' . $indicator_inactive_uri. '" class="inactive">' . '</span>';
}
$show_frontpage_nodes = (theme_get_setting('promoted_nodes', 'svendborg_subsitetheme') && theme_get_setting('promoted_nodes_location', 'svendborg_subsitetheme') === 'slider');

$html = '<div class="slider-cover multi" style="' . $background . '">';
$html .= '<div class="container">';
$html .= '<div class="row">';
$html .= '<div class="col-sm-7 col-xs-12">';
$html .= '<div class="title">';
if (isset($node->field_banner_vis_paa_sider['und']) && !empty($node->field_banner_vis_paa_sider['und'][0]['nid'])) {
  $html .= '<a href="' . url(drupal_get_path_alias('node/' . $node->field_banner_vis_paa_sider['und'][0]['nid'])) . '">';
  //$html .= '<span class="indicators">';refor
  ////   $html .= $indicators;
  //$html .= '</span>';
  if (!empty($node->field_banner_text['und'][0]['value'])) {
    $html .= $node->field_banner_text['und'][0]['value'];
  }
  else {
    $html .= $node->title;
  }

  $html .= '</a>';
}
else {
  //$html .= '<span class="indicators">';
  //  $html .= $indicators;
  //$html .= '</span>';
  if (!empty($node->field_banner_text['und'][0]['value'])) {
    $html .= $node->field_banner_text['und'][0]['value'];
  }
  else {
    $html .= $node->title;
  }
}
$html .= '</div>';//class="title"
$html .= '</div>';//class="col-xs-8"

//printing frontpage_nodes block, if activated
if ($show_frontpage_nodes) {
  $html .= '<div class="col-xs-4 col-xs-offset-1 hidden-sm, hidden-xs">';
  $html .= _svendborg_subsitetheme_block_render('views', 'frontpage_nodes-block');
  $html .= '</div>';
}
$html .= '</div>';//class="row"
$html .= '</div>';//class="container"
$html .= '</div>';//class="slider-cover"
if (!empty($node->field_knap_link['und'][0]['url'])) {
//  $html = '<a class="blablahest" href="' . $node->field_knap_link['und'][0]['url'] . '">sdassad' . $html . '</a>';
}
print $html;
?>
