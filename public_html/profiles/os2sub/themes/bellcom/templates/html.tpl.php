<!DOCTYPE html>
<!--[if lt IE 7 ]><html class="lt-ie10 lt-ie9 lt-ie8 lt-ie7 no-js" lang="<?php print $language->language; ?>" dir="<?php print $language->dir; ?>"<?php print $rdf_namespaces; ?>><![endif]-->
<!--[if IE 7 ]><html class="lt-ie10 lt-ie9 lt-ie8 ie7 no-js" lang="<?php print $language->language; ?>" dir="<?php print $language->dir; ?>"<?php print $rdf_namespaces; ?>><![endif]-->
<!--[if IE 8 ]><html class="lt-ie10 lt-ie9 ie8 no-js" lang="<?php print $language->language; ?>" dir="<?php print $language->dir; ?>"<?php print $rdf_namespaces; ?>><![endif]-->
<!--[if IE 9 ]><html class="lt-ie10 ie9 no-js" lang="<?php print $language->language; ?>" dir="<?php print $language->dir; ?>"<?php print $rdf_namespaces; ?>><![endif]-->
<!--[if (gt IE 9)|!(IE)]><!-->
<html class="not-ie no-js" lang="<?php print $language->language; ?>" dir="<?php print $language->dir; ?>"<?php print $rdf_namespaces; ?>>
<!--<![endif]-->
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0">
    <title><?php print $head_title; ?></title>

    <?php print $head; ?>

    <!-- Begin - internal stylesheet -->
    <?php print $styles; ?>
    <!-- End - internal stylesheet -->

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
