<!DOCTYPE html>
<!--[if lt IE 7]><html class="lt-ie10 lt-ie9 lt-ie8 lt-ie7 no-js" lang="<?php print $language->language; ?>" dir="<?php print $language->dir; ?>"<?php print $rdf_namespaces; ?>><![endif]-->
<!--[if IE 7]><html class="lt-ie10 lt-ie9 lt-ie8 ie7 no-js" lang="<?php print $language->language; ?>" dir="<?php print $language->dir; ?>"<?php print $rdf_namespaces; ?>><![endif]-->
<!--[if IE 8]><html class="lt-ie10 lt-ie9 ie8 no-js" lang="<?php print $language->language; ?>" dir="<?php print $language->dir; ?>"<?php print $rdf_namespaces; ?>><![endif]-->
<!--[if IE 9]><html class="lt-ie10 ie9 no-js" lang="<?php print $language->language; ?>" dir="<?php print $language->dir; ?>"<?php print $rdf_namespaces; ?>><![endif]-->
<!--[if (gt IE 9)|!(IE)]><html class="not-ie no-js" lang="<?php print $language->language; ?>" dir="<?php print $language->dir; ?>"<?php print $rdf_namespaces; ?> xmlns="http://www.w3.org/1999/html"><!--<![endif]-->
<head>

  <title><?php print $head_title; ?></title>
  <meta http-equiv="content-language" content="da,en">
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">

  <?php print $head; ?>

  <!-- Begin - internal stylesheet -->
  <?php print $styles; ?>
  <!-- End - internal stylesheet -->

  <!-- Begin - icons -->
  <link rel="apple-touch-icon" sizes="57x57" href="<?php print $path_img; ?>/icons/apple-touch-icon-57x57.png">
  <link rel="apple-touch-icon" sizes="60x60" href="<?php print $path_img; ?>/icons/apple-touch-icon-60x60.png">
  <link rel="apple-touch-icon" sizes="72x72" href="<?php print $path_img; ?>/icons/apple-touch-icon-72x72.png">
  <link rel="apple-touch-icon" sizes="76x76" href="<?php print $path_img; ?>/icons/apple-touch-icon-76x76.png">
  <link rel="apple-touch-icon" sizes="114x114" href="<?php print $path_img; ?>/icons/apple-touch-icon-114x114.png">
  <link rel="apple-touch-icon" sizes="120x120" href="<?php print $path_img; ?>/icons/apple-touch-icon-120x120.png">
  <link rel="apple-touch-icon" sizes="144x144" href="<?php print $path_img; ?>/icons/apple-touch-icon-144x144.png">
  <link rel="apple-touch-icon" sizes="152x152" href="<?php print $path_img; ?>/icons/apple-touch-icon-152x152.png">
  <link rel="apple-touch-icon" sizes="180x180" href="<?php print $path_img; ?>/icons/apple-touch-icon-180x180.png">
  <link rel="icon" type="image/png" href="<?php print $path_img; ?>/icons/favicon-32x32.png" sizes="32x32">
  <link rel="icon" type="image/png" href="<?php print $path_img; ?>/icons/favicon-96x96.png" sizes="96x96">
  <link rel="icon" type="image/png" href="<?php print $path_img; ?>/icons/favicon-16x16.png" sizes="16x16">
  <link rel="manifest" href="<?php print $path_img; ?>/icons/manifest.json">
  <link rel="mask-icon" href="<?php print $path_img; ?>/icons/safari-pinned-tab.svg" color="#5bbad5">
  <meta name="msapplication-TileColor" content="#da532c">
  <meta name="msapplication-TileImage" content="<?php print $path_img; ?>/icons/mstile-144x144.png">
  <meta name="theme-color" content="#ffffff">
  <!-- End - icons -->

</head>
<body class="<?php print $classes; ?>"<?php print $attributes; ?>>

<!-- Begin - skip link -->
<div id="skip-link" class="show-on-focus">
  <a href="#content" class="element-invisible element-focusable">
    <?php print t('Skip to main content'); ?>
  </a>
</div>
<!-- End - skip link -->

<?php print $page_top; ?>
<?php print $page; ?>

<!-- Begin - load javascript files -->
<?php print $scripts; ?>
<!-- End - load javascript files -->

<?php print $page_bottom; ?>

</body>
</html>
