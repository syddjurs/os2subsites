<!-- Begin - wrapper -->
<div class="layout__wrapper">

    <!-- Begin - sidr source provider -->
    <aside class="sidr-source-provider">

        <!-- Begin - navigation -->
        <nav class="slinky-menu" role="navigation">
            <?php print render($menu_slinky__primary); ?>
        </nav>
        <!-- End - navigation -->

    </aside>
    <!-- End - sidr source provider -->

    <!-- Begin - header static -->
    <header class="flexy-header flexy-header--static">
        <div class="flexy-header__row flexy-header__row--first">
            <div class="container">
                <div class="flexy-row">

                    <!-- Begin - logo -->
                    <a href="<?php print $front_page; ?>" class="flexy-header__logo">
                        <img src="<?php print $logo; ?>"
                             alt="<?php print t('@site_name logo', array('@site_name' => $site_name)); ?>"/>
                    </a>
                    <!-- End - logo -->
                    <?php if (!empty($page['search'])): ?>
                      <?php print render($page['search']); ?>
                      <?php else : ?>
                      <?php print $search_box; ?>
                    <?php endif; ?>
                    <!-- Push navigation to the right -->
                    <div class="flexy-spacer"></div>

                    <!-- Begin - responsive toggle -->
                    <a href="#" class="flexy-header__sidebar-toggle sidr-toggle--right visible-xs">
                        <span class="icon fa fa-bars"></span>
                    </a>
                    <!-- End - responsive toggle -->

                </div>
            </div>
        </div>
        <div class="flexy-header__row flexy-header__row--second hidden-xs">
            <div class="container">
                <div class="flexy-row">

                    <!-- Begin - navigation -->
                    <nav class="flexy-header__navigation__wrapper" role="navigation">
                        <?php print render($primary_navigation); ?>
                    </nav>
                    <!-- End - navigation -->

                </div>
            </div>
        </div>
    </header>
    <!-- End - header static -->

    <!-- Begin - header sticky -->
    <header class="flexy-header flexy-header--sticky">
        <div class="flexy-header__row">
            <div class="container">
                <div class="flexy-row">

                    <!-- Begin - logo -->
                    <a href="<?php print $front_page; ?>" class="flexy-header__logo">
                        <img src="<?php print $logo; ?>"
                             alt="<?php print t('@site_name logo', array('@site_name' => $site_name)); ?>"/>
                    </a>
                    <!-- End - logo -->

                    <!-- Push navigation to the right -->
                    <div class="flexy-spacer"></div>

                    <!-- Begin - navigation -->
                    <nav class="flexy-header__navigation__wrapper hidden-xs" role="navigation">
                        <?php print render($primary_navigation); ?>
                    </nav>
                    <!-- End - navigation -->

                    <!-- Begin - responsive toggle -->
                    <a href="#" class="flexy-header__sidebar-toggle sidr-toggle--right visible-xs">
                        <span class="icon fa fa-bars"></span>
                    </a>
                    <!-- End - responsive toggle -->

                </div>
            </div>
        </div>
    </header>
    <!-- End - header sticky -->

    <!-- Begin - content -->
    <main class="layout__content" role="main">
        <div class="container">

            <?php if (!empty($page['help'])): ?>
                <?php print render($page['help']); ?>
            <?php endif; ?>

            <?php if (!empty($action_links)): ?>
                <ul class="action-links"><?php print render($action_links); ?></ul>
            <?php endif; ?>

            <?php if (!empty($tabs_primary)): ?>
                <!-- Begin - tabs primary -->
                <div class="os2-tabs-container os2-tabs-variant-default">
                    <?php print render($tabs_primary); ?>
                </div>
                <!-- End - tabs primary -->
            <?php endif; ?>

            <?php if (!empty($tabs_secondary)): ?>
                <!-- Begin - tabs secondary -->
                <div class="os2-tabs-container os2-tabs-variant-tertiary">
                    <?php print render($tabs_secondary); ?>
                </div>
                <!-- End - tabs secondary -->
            <?php endif; ?>

        </div>

        <a id="main-content"></a>

        <div class="message">
            <?php print $messages; ?>
        </div>


            <?php print $breadcrumb; ?>

                <div class="container">
                    <?php print render($page['content']); ?>
                </div>

    </main>
    <!-- End - content -->

    <!-- Begin - sitemap -->
    <div class="sectioned sectioned--sitemap sectioned--small-inner-spacing">
        <div class="sectioned__inner">
            <div class="container">
                <div class="row">
                    <div class="col-xs-12 col-sm-4">
                        <div class="sectioned--sitemap__logo">
                            <a href="<?php print $front_page; ?>">
                                <img src="<?php print $theme_path; ?>/dist/images/logo__white.png"
                                     alt="<?php print t('@site_name logo',
                                       ['@site_name' => $site_name]); ?>" />
                            </a>
                        </div>

                        <?php if (!empty($theme_settings['layout']['footer']['description'])) : ?>
                            <!-- Begin - description -->
                            <div class="sectioned--sitemap__description">
                                <h3 class="heading-h4"><?php print $theme_settings['layout']['footer']['description']; ?></h3>
                            </div>
                            <!-- End - description -->
                        <?php endif; ?>

                    </div>
                    <div class="col-xs-12 col-sm-8">
                        Menu
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- End - sitemap -->

    <!-- Begin - footer -->
    <footer class="layout__footer">
        <div class="layout__footer--inner">
            <div class="container">

                <div class="flexy-list flexy-list--centered">

                    <?php if (!empty($theme_settings['contact_information']['address'])) : ?>
                        <div>
                            <?php print $theme_settings['contact_information'][ 'address']; ?>
                        </div>
                    <?php endif; ?>

                    <?php if (!empty($theme_settings['contact_information']['zipcode']) && !empty($theme_settings['contact_information']['city'])) : ?>
                        <div>
                            <?php print $theme_settings['contact_information']['zipcode']; ?> <?php print $theme_settings['contact_information']['city']; ?>
                        </div>
                    <?php endif; ?>

                    <?php if (!empty($theme_settings['contact_information']['phone_system']) && !empty($theme_settings['contact_information']['phone_readable'])) : ?>
                        <div>
                          <?php print '<a href="tel:' . $theme_settings['contact_information']['phone_system'] . '">' . $theme_settings['contact_information']['phone_readable'] . '</a>'; ?>
                        </div>
                    <?php endif; ?>

                    <?php if (!empty($theme_settings['contact_information']['email'])) : ?>
                        <div>
                          <?php print '<a href="mailto:' . $theme_settings['contact_information']['email'] . ' title="' . t('Send email') . '">' . $theme_settings['contact_information']['email'] . '</a>'; ?>
                        </div>
                    <?php endif; ?>

                </div>

            </div>
        </div>
    </footer>
    <!-- End - footer -->

</div>
<!-- End - wrapper -->
