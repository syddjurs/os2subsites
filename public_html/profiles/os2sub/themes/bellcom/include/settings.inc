<?php

function _theme_settings_form(&$form, &$form_state) {

  // Vertical tabs
  $form['options'] = [
    '#type'        => 'vertical_tabs',
    '#default_tab' => 'main',
    '#weight'      => '-20',
    '#prefix'      => '<h2><small>' . t('Site indstillinger') . '</small></h2>',
    '#title'       => t('Indstillinger'),
  ];

  /*
  |--------------------------------------------------------------------------
  | Page layout
  |--------------------------------------------------------------------------
  |
  | Sets all necessary options to save data.
  |
  */

  // Fieldset
  $form['options']['layout'] = [
    '#type'  => 'fieldset',
    '#title' => t('Sideopsætning'),
  ];

  // Top bar.
  $form['options']['layout']['top_bar'] = [
    '#type'        => 'fieldset',
    '#title'       => 'Top bar',
    '#collapsible' => TRUE,
    '#collapsed'   => TRUE,
  ];

  // Top bar - contact information
  $form['options']['layout']['top_bar']['contact_information'] = [
    '#type'          => 'select',
    '#title'         => t('Vis kontaktinformationer'),
    '#options'       => [
      1 => t('Nej, skjul dem.'),
      2 => t('Venstre side'),
      3 => t('Højre side'),
    ],
    '#default_value' => theme_get_setting('contact_information'),
  ];

  // Top bar - social links
  $form['options']['layout']['top_bar']['social_links'] = [
    '#type'          => 'select',
    '#title'         => t('Vis links til sociale websites'),
    '#options'       => [
      1 => t('Nej, skjul dem.'),
      2 => t('Venstre side'),
      3 => t('Højre side'),
    ],
    '#default_value' => theme_get_setting('social_links'),
  ];

  // Navigation
  $form['options']['layout']['navigation'] = [
    '#type'        => 'fieldset',
    '#title'       => t('Navigation'),
    '#collapsible' => TRUE,
    '#collapsed'   => TRUE,
  ];

  $form['options']['layout']['navigation']['login_account_links'] = [
    '#type'          => 'checkbox',
    '#title'         => t('Vis login og brugerlink'),
    '#default_value' => theme_get_setting('login_account_links'),
    '#description'   => t("Vises i højre side af navigationen"),
  ];

  $form['options']['layout']['navigation']['searchboxdisp'] = [
    '#type'          => 'checkbox',
    '#title'         => t('Vis søgeboks'),
    '#default_value' => theme_get_setting('searchboxdisp'),
    '#description'   => t("Vises i højre side af navigationen"),
  ];

  $form['options']['layout']['navigation']['navigationblocks'] = [
    '#type'          => 'checkbox',
    '#title'         => t('Vis alm blocks i navigationslinien'),
    '#default_value' => theme_get_setting('navigationblocks'),
    '#description'   => t("Vises i højre side af navigationen"),
  ];

  // Sidebar
  $form['options']['layout']['sidebar'] = [
    '#type'        => 'fieldset',
    '#title'       => 'Sidebar',
    '#collapsible' => TRUE,
    '#collapsed'   => TRUE,
  ];

  // Sidebar left
  $form['options']['layout']['sidebar']['left']                                         = [
    '#type'        => 'fieldset',
    '#title'       => t('Sidebar venstre'),
    '#collapsible' => TRUE,
    '#collapsed'   => TRUE,
  ];
  $form['options']['layout']['sidebar']['left']['xs']                                   = [
    '#type'        => 'fieldset',
    '#title'       => t('XS viewmode'),
    '#collapsible' => TRUE,
    '#collapsed'   => FALSE,
  ];
  $form['options']['layout']['sidebar']['left']['xs']['sidebar_left_xs_enabled']        = [
    '#type'          => 'checkbox',
    '#title'         => t('Aktiv'),
    '#default_value' => theme_get_setting('sidebar_left_xs_enabled'),
  ];
  $form['options']['layout']['sidebar']['left']['xs']['sidebar_left_xs_state']          = [
    '#type'          => 'radios',
    '#title'         => t('Tilstand'),
    '#default_value' => theme_get_setting('sidebar_left_xs_state'),
    '#options'       => [
      'expanded'  => t('Åben'),
      'collapsed' => t('Lukket'),
      'hidden'    => t('Skjult'),
    ],
    '#states'        => [
      'visible' => [
        ':input[name="sidebar_left_xs_enabled"]' => ['checked' => TRUE],
      ],
    ],
  ];
  $form['options']['layout']['sidebar']['left']['xs']['sidebar_left_xs_content_effect'] = [
    '#type'          => 'radios',
    '#title'         => t('Content effect'),
    '#default_value' => theme_get_setting('sidebar_left_xs_content_effect'),
    '#options'       => [
      'shrink' => 'Shrink content',
      'push'   => 'Push content (off-canvas)',
    ],
    '#states'        => [
      'visible' => [
        ':input[name="sidebar_left_xs_enabled"]' => ['checked' => TRUE],
        ':input[name="sidebar_left_xs_state"]'   => ['value' => 'hidden'],
      ],
    ],
  ];

  $form['options']['layout']['sidebar']['left']['sm']                                   = [
    '#type'        => 'fieldset',
    '#title'       => t('SM viewmode'),
    '#collapsible' => TRUE,
    '#collapsed'   => FALSE,
  ];
  $form['options']['layout']['sidebar']['left']['sm']['sidebar_left_sm_enabled']        = [
    '#type'          => 'checkbox',
    '#title'         => t('Aktiv'),
    '#default_value' => theme_get_setting('sidebar_left_sm_enabled'),
  ];
  $form['options']['layout']['sidebar']['left']['sm']['sidebar_left_sm_state']          = [
    '#type'          => 'radios',
    '#title'         => t('Tilstand'),
    '#default_value' => theme_get_setting('sidebar_left_sm_state'),
    '#options'       => [
      'expanded'  => t('Åben'),
      'collapsed' => t('Lukket'),
      'hidden'    => t('Skjult'),
    ],
    '#states'        => [
      'visible' => [
        ':input[name="sidebar_left_sm_enabled"]' => ['checked' => TRUE],
      ],
    ],
  ];
  $form['options']['layout']['sidebar']['left']['sm']['sidebar_left_sm_content_effect'] = [
    '#type'          => 'radios',
    '#title'         => t('Visning af indhold'),
    '#default_value' => theme_get_setting('sidebar_left_sm_content_effect'),
    '#options'       => [
      'shrink' => t('Presset sammen'),
      'push'   => t('Skubbet til siden (off-canvas)'),
    ],
    '#states'        => [
      'visible' => [
        ':input[name="sidebar_left_sm_enabled"]' => ['checked' => TRUE],
        ':input[name="sidebar_left_sm_state"]'   => ['value' => 'hidden'],
      ],
    ],
  ];

  $form['options']['layout']['sidebar']['left']['md']                                   = [
    '#type'        => 'fieldset',
    '#title'       => t('MD viewmode'),
    '#collapsible' => TRUE,
    '#collapsed'   => FALSE,
  ];
  $form['options']['layout']['sidebar']['left']['md']['sidebar_left_md_enabled']        = [
    '#type'          => 'checkbox',
    '#title'         => t('Aktiv'),
    '#default_value' => theme_get_setting('sidebar_left_md_enabled'),
  ];
  $form['options']['layout']['sidebar']['left']['md']['sidebar_left_md_state']          = [
    '#type'          => 'radios',
    '#title'         => t('Tilstand'),
    '#default_value' => theme_get_setting('sidebar_left_md_state'),
    '#options'       => [
      'expanded'  => t('Åben'),
      'collapsed' => t('Lukket'),
      'hidden'    => t('Skjult'),
    ],
    '#states'        => [
      'visible' => [
        ':input[name="sidebar_left_md_enabled"]' => ['checked' => TRUE],
      ],
    ],
  ];
  $form['options']['layout']['sidebar']['left']['md']['sidebar_left_md_content_effect'] = [
    '#type'          => 'radios',
    '#title'         => t('Visning af indhold'),
    '#default_value' => theme_get_setting('sidebar_left_md_content_effect'),
    '#options'       => [
      'shrink' => t('Presset sammen'),
      'push'   => t('Skubbet til siden (off-canvas)'),
    ],
    '#states'        => [
      'visible' => [
        ':input[name="sidebar_left_md_enabled"]' => ['checked' => TRUE],
        ':input[name="sidebar_left_md_state"]'   => ['value' => 'hidden'],
      ],
    ],
  ];

  $form['options']['layout']['sidebar']['left']['lg']                                   = [
    '#type'        => 'fieldset',
    '#title'       => 'LG viewmode',
    '#collapsible' => TRUE,
    '#collapsed'   => FALSE,
  ];
  $form['options']['layout']['sidebar']['left']['lg']['sidebar_left_lg_enabled']        = [
    '#type'          => 'checkbox',
    '#title'         => t('Aktiv'),
    '#default_value' => theme_get_setting('sidebar_left_lg_enabled'),
  ];
  $form['options']['layout']['sidebar']['left']['lg']['sidebar_left_lg_state']          = [
    '#type'          => 'radios',
    '#title'         => t('Tilstand'),
    '#default_value' => theme_get_setting('sidebar_left_lg_state'),
    '#options'       => [
      'expanded'  => t('Åben'),
      'collapsed' => t('Lukket'),
      'hidden'    => t('Skjult'),
    ],
    '#states'        => [
      'visible' => [
        ':input[name="sidebar_left_lg_enabled"]' => ['checked' => TRUE],
      ],
    ],
  ];
  $form['options']['layout']['sidebar']['left']['lg']['sidebar_left_lg_content_effect'] = [
    '#type'          => 'radios',
    '#title'         => t('Visning af indhold'),
    '#default_value' => theme_get_setting('sidebar_left_lg_content_effect'),
    '#options'       => [
      'shrink' => t('Presset sammen'),
      'push'   => t('Skubbet til siden (off-canvas)'),
    ],
    '#states'        => [
      'visible' => [
        ':input[name="sidebar_left_lg_enabled"]' => ['checked' => TRUE],
        ':input[name="sidebar_left_lg_state"]'   => ['value' => 'hidden'],
      ],
    ],
  ];

  // Footer
  $form['options']['layout']['footer']                             = [
    '#type'        => 'fieldset',
    '#title'       => t('Footer'),
    '#collapsible' => TRUE,
    '#collapsed'   => TRUE,
  ];
  $form['options']['layout']['footer']['footer_show_social_links'] = [
    '#type'          => 'checkbox',
    '#title'         => t('Vis links til sociale tjenester'),
    '#default_value' => theme_get_setting('footer_show_social_links'),
    '#description'   => t("Skal links til sociale tjenester vises i bunden af siden?"),
  ];
  $form['options']['layout']['footer']['footer_show_branding']     = [
    '#type'          => 'checkbox',
    '#title'         => t('Vis kommunelogo'),
    '#default_value' => theme_get_setting('footer_show_branding'),
    '#description'   => t("Skal der vises kommunelogo eller ej?"),
  ];
  $form['options']['layout']['footer']['footer_description']       = [
    '#type'          => 'textfield',
    '#title'         => t('Kort beskrivelse'),
    '#default_value' => theme_get_setting('footer_description'),
  ];

  /*
  |--------------------------------------------------------------------------
  | Contact information
  |--------------------------------------------------------------------------
  |
  | Sets all necessary options to save data.
  |
  */

  // Fieldset
  $form['options']['contact_information'] = [
    '#type'  => 'fieldset',
    '#title' => t('Kontakt information'),
  ];

  // Business owner name
  $form['options']['contact_information']['business_owner_name'] = [
    '#type'          => 'textfield',
    '#title'         => t('Navn'),
    '#default_value' => theme_get_setting('business_owner_name'),
  ];

  // Business startup year
  $form['options']['contact_information']['business_startup_year'] = [
    '#type'          => 'textfield',
    '#title'         => t('Opstartsår'),
    '#default_value' => theme_get_setting('business_startup_year'),
  ];

  // Address
  $form['options']['contact_information']['address'] = [
    '#type'          => 'textfield',
    '#title'         => t('Adresse'),
    '#default_value' => theme_get_setting('address'),
  ];

  // Zipcode
  $form['options']['contact_information']['zipcode'] = [
    '#type'          => 'textfield',
    '#title'         => t('Postnr'),
    '#default_value' => theme_get_setting('zipcode'),
  ];

  // City
  $form['options']['contact_information']['city'] = [
    '#type'          => 'textfield',
    '#title'         => t('City'),
    '#default_value' => theme_get_setting('city'),
  ];

  // Phone number
  $form['options']['contact_information']['phone_system'] = [
    '#type'          => 'textfield',
    '#title'         => t('Telefon'),
    '#description'   => t('HUSK: uden mellemrum og inkl. +45 f.eks.: +4570260085'),
    '#default_value' => theme_get_setting('phone_system'),
  ];

  // Phone number - readable
  $form['options']['contact_information']['phone_readable'] = [
    '#type'          => 'textfield',
    '#title'         => t('Vist telefon nummer'),
    '#description'   => t('Telefonnummeret vist (brug evt. mellemrum så det er let læseligt)'),
    '#default_value' => theme_get_setting('phone_readable'),
  ];

  // E-mail address
  $form['options']['contact_information']['email'] = [
    '#type'          => 'textfield',
    '#title'         => t('E-mail'),
    '#default_value' => theme_get_setting('email'),
  ];

  // Working hours
  $form['options']['contact_information']['working_hours'] = [
    '#type'          => 'textfield',
    '#title'         => t('Åbningstid eller anden info'),
    '#default_value' => theme_get_setting('working_hours'),
  ];


  /**
   * Implementation of THEMEHOOK_settings() function.
   *
   * @param $saved_settings
   *   array An array of saved settings for this theme.
   *
   * @return
   *   array A form array.
   */
  /* Disabled
    $form['options']['sublogo'] = array(
      '#type' => 'fieldset',
      '#title' => t('Secondary logo'),
      '#description' => t("May be displayed in the footer or under a column.")
    );
    $form['options']['sublogo']['use_sublogo'] = array(
      '#type' => 'checkbox',
      '#title' => t('Use a sublogo.'),
      '#default_value' => theme_get_setting('use_sublogo'),
    );
    $form['options']['sublogo']['sublogo_path'] = array(
      '#type' => 'textfield',
      '#title' => t('Path to sublogo'),
      '#default_value' => theme_get_setting('sublogo_path'),
    );

    $form['options']['sublogo']['sublogo_upload'] = array(
      '#type' => 'file',
      '#title' => t('Upload sublogo image'),
    );
    $form['#submit'][] = 'bellcom_settings_submit';
    $form['options']['sublogo']['sublogo_upload']['#element_validate'][] = 'bellcom_settings_submit';

    */

  /*
|--------------------------------------------------------------------------
| Social links
|--------------------------------------------------------------------------
|
| Sets all necessary options to save data.
|
*/

  // Fieldset
  $form['options']['social_links'] = [
    '#type'  => 'fieldset',
    '#title' => t('Sociale tjenester'),
  ];

  // Facebook
  $form['options']['social_links']['facebook']         = [
    '#type'          => 'checkbox',
    '#title'         => t('Facebook'),
    '#default_value' => theme_get_setting('facebook'),
  ];
  $form['options']['social_links']['facebook_url']     = [
    '#type'          => 'textfield',
    '#title'         => t('Facebook URL'),
    '#default_value' => theme_get_setting('facebook_url'),
    '#states'        => [
      // Hide the options when the cancel notify checkbox is disabled.
      'visible' => [
        ':input[name="facebook"]' => [
          'checked' => TRUE,
        ],
      ],
    ],
  ];
  $form['options']['social_links']['facebook_tooltip'] = [
    '#type'          => 'textfield',
    '#title'         => t('Tekst ved mouse-over'),
    '#default_value' => theme_get_setting('facebook_tooltip'),
    '#states'        => [
      // Hide the options when the cancel notify checkbox is disabled.
      'visible' => [
        ':input[name="facebook"]' => [
          'checked' => TRUE,
        ],
      ],
    ],
  ];

  // Twitter
  $form['options']['social_links']['twitter']         = [
    '#type'          => 'checkbox',
    '#title'         => t('Twitter'),
    '#default_value' => theme_get_setting('twitter'),
  ];
  $form['options']['social_links']['twitter_url']     = [
    '#type'          => 'textfield',
    '#title'         => t('Twitter URL'),
    '#default_value' => theme_get_setting('twitter_url'),
    '#states'        => [
      // Hide the options when the cancel notify checkbox is disabled.
      'visible' => [
        ':input[name="twitter"]' => [
          'checked' => TRUE,
        ],
      ],
    ],
  ];
  $form['options']['social_links']['twitter_tooltip'] = [
    '#type'          => 'textfield',
    '#title'         => t('Tekst ved mouse-over'),
    '#default_value' => theme_get_setting('twitter_tooltip'),
    '#states'        => [
      // Hide the options when the cancel notify checkbox is disabled.
      'visible' => [
        ':input[name="twitter"]' => [
          'checked' => TRUE,
        ],
      ],
    ],
  ];

  // Google plus
  $form['options']['social_links']['googleplus']         = [
    '#type'          => 'checkbox',
    '#title'         => t('Google plus'),
    '#default_value' => theme_get_setting('googleplus'),
  ];
  $form['options']['social_links']['googleplus_url']     = [
    '#type'          => 'textfield',
    '#title'         => t('Google plus URL'),
    '#default_value' => theme_get_setting('googleplus_url'),
    '#states'        => [
      // Hide the options when the cancel notify checkbox is disabled.
      'visible' => [
        ':input[name="googleplus"]' => [
          'checked' => TRUE,
        ],
      ],
    ],
  ];
  $form['options']['social_links']['googleplus_tooltip'] = [
    '#type'          => 'textfield',
    '#title'         => t('Tekst ved mouse-over'),
    '#default_value' => theme_get_setting('googleplus_tooltip'),
    '#states'        => [
      // Hide the options when the cancel notify checkbox is disabled.
      'visible' => [
        ':input[name="googleplus"]' => [
          'checked' => TRUE,
        ],
      ],
    ],
  ];

  // Instagram
  $form['options']['social_links']['instagram']         = [
    '#type'          => 'checkbox',
    '#title'         => t('Instagram'),
    '#default_value' => theme_get_setting('instagram'),
  ];
  $form['options']['social_links']['instagram_url']     = [
    '#type'          => 'textfield',
    '#title'         => t('Instagram URL'),
    '#default_value' => theme_get_setting('instagram_url'),
    '#states'        => [
      // Hide the options when the cancel notify checkbox is disabled.
      'visible' => [
        ':input[name="instagram"]' => [
          'checked' => TRUE,
        ],
      ],
    ],
  ];
  $form['options']['social_links']['instagram_tooltip'] = [
    '#type'          => 'textfield',
    '#title'         => t('Tekst ved mouse-over'),
    '#default_value' => theme_get_setting('instagram_tooltip'),
    '#states'        => [
      // Hide the options when the cancel notify checkbox is disabled.
      'visible' => [
        ':input[name="instagram"]' => [
          'checked' => TRUE,
        ],
      ],
    ],
  ];

  // LinkedIn
  $form['options']['social_links']['linkedin']         = [
    '#type'          => 'checkbox',
    '#title'         => t('LinkedIn'),
    '#default_value' => theme_get_setting('linkedin'),
  ];
  $form['options']['social_links']['linkedin_url']     = [
    '#type'          => 'textfield',
    '#title'         => t('LinkedIn URL'),
    '#default_value' => theme_get_setting('linkedin_url'),
    '#states'        => [
      // Hide the options when the cancel notify checkbox is disabled.
      'visible' => [
        ':input[name="linkedin"]' => [
          'checked' => TRUE,
        ],
      ],
    ],
  ];
  $form['options']['social_links']['linkedin_tooltip'] = [
    '#type'          => 'textfield',
    '#title'         => t('Tekst ved mouse-over'),
    '#default_value' => theme_get_setting('linkedin_tooltip'),
    '#states'        => [
      // Hide the options when the cancel notify checkbox is disabled.
      'visible' => [
        ':input[name="linkedin"]' => [
          'checked' => TRUE,
        ],
      ],
    ],
  ];

  // Pinterest
  $form['options']['social_links']['pinterest']         = [
    '#type'          => 'checkbox',
    '#title'         => t('Pinterest'),
    '#default_value' => theme_get_setting('pinterest'),
  ];
  $form['options']['social_links']['pinterest_url']     = [
    '#type'          => 'textfield',
    '#title'         => t('Pinterest URL'),
    '#default_value' => theme_get_setting('pinterest_url'),
    '#states'        => [
      // Hide the options when the cancel notify checkbox is disabled.
      'visible' => [
        ':input[name="pinterest"]' => [
          'checked' => TRUE,
        ],
      ],
    ],
  ];
  $form['options']['social_links']['pinterest_tooltip'] = [
    '#type'          => 'textfield',
    '#title'         => t('Tekst ved mouse-over'),
    '#default_value' => theme_get_setting('pinterest_tooltip'),
    '#states'        => [
      // Hide the options when the cancel notify checkbox is disabled.
      'visible' => [
        ':input[name="pinterest"]' => [
          'checked' => TRUE,
        ],
      ],
    ],
  ];

  // Vimeo
  $form['options']['social_links']['vimeo']         = [
    '#type'          => 'checkbox',
    '#title'         => t('Vimeo'),
    '#default_value' => theme_get_setting('vimeo'),
  ];
  $form['options']['social_links']['vimeo_url']     = [
    '#type'          => 'textfield',
    '#title'         => t('Vimeo URL'),
    '#default_value' => theme_get_setting('vimeo_url'),
    '#states'        => [
      // Hide the options when the cancel notify checkbox is disabled.
      'visible' => [
        ':input[name="vimeo"]' => [
          'checked' => TRUE,
        ],
      ],
    ],
  ];
  $form['options']['social_links']['vimeo_tooltip'] = [
    '#type'          => 'textfield',
    '#title'         => t('Tekst ved mouse-over'),
    '#default_value' => theme_get_setting('vimeo_tooltip'),
    '#states'        => [
      // Hide the options when the cancel notify checkbox is disabled.
      'visible' => [
        ':input[name="vimeo"]' => [
          'checked' => TRUE,
        ],
      ],
    ],
  ];

  // Youtube
  $form['options']['social_links']['youtube']         = [
    '#type'          => 'checkbox',
    '#title'         => t('Youtube'),
    '#default_value' => theme_get_setting('youtube'),
  ];
  $form['options']['social_links']['youtube_url']     = [
    '#type'          => 'textfield',
    '#title'         => t('Youtube URL'),
    '#default_value' => theme_get_setting('youtube_url'),
    '#states'        => [
      // Hide the options when the cancel notify checkbox is disabled.
      'visible' => [
        ':input[name="youtube"]' => [
          'checked' => TRUE,
        ],
      ],
    ],
  ];
  $form['options']['social_links']['youtube_tooltip'] = [
    '#type'          => 'textfield',
    '#title'         => t('Tekst ved mouse-over'),
    '#default_value' => theme_get_setting('youtube_tooltip'),
    '#states'        => [
      // Hide the options when the cancel notify checkbox is disabled.
      'visible' => [
        ':input[name="youtube"]' => [
          'checked' => TRUE,
        ],
      ],
    ],
  ];

  /*
|--------------------------------------------------------------------------
| Langua links
|--------------------------------------------------------------------------
|
| Sets all necessary options to save data.
|
*/

  // Fieldset
  $form['options']['languages'] = [
    '#type'  => 'fieldset',
    '#title' => t('Languages'),
  ];

  // Tysk
  $form['options']['languages']['lang_german'] = [
    '#type'          => 'checkbox',
    '#title'         => t('Tysk'),
    '#default_value' => theme_get_setting('lang_german'),
  ];

  $form['options']['languages']['lang_german_url'] = [
    '#type'          => 'textfield',
    '#title'         => t('Tysk URL'),
    '#default_value' => theme_get_setting('lang_german_url'),
    '#states'        => [
      // Hide the options when the cancel notify checkbox is disabled.
      'visible' => [
        ':input[name="lang_german"]' => [
          'checked' => TRUE,
        ],
      ],
    ],
  ];

  $form['options']['languages']['lang_german_tooltip'] = [
    '#type'          => 'textfield',
    '#title'         => t('Tekst ved mouse-over'),
    '#default_value' => theme_get_setting('lang_german_tooltip'),
    '#states'        => [
      // Hide the options when the cancel notify checkbox is disabled.
      'visible' => [
        ':input[name="lang_german"]' => [
          'checked' => TRUE,
        ],
      ],
    ],
  ];

  // Dansk
  $form['options']['languages']['lang_danish'] = [
    '#type'          => 'checkbox',
    '#title'         => t('Dansk'),
    '#default_value' => theme_get_setting('lang_danish'),
  ];

  $form['options']['languages']['lang_danish_url'] = [
    '#type'          => 'textfield',
    '#title'         => t('Dansk URL'),
    '#default_value' => theme_get_setting('lang_danish_url'),
    '#states'        => [
      // Hide the options when the cancel notify checkbox is disabled.
      'visible' => [
        ':input[name="lang_danish"]' => [
          'checked' => TRUE,
        ],
      ],
    ],
  ];

  $form['options']['languages']['lang_danish_tooltip'] = [
    '#type'          => 'textfield',
    '#title'         => t('Tekst ved mouse-over'),
    '#default_value' => theme_get_setting('lang_danish_tooltip'),
    '#states'        => [
      // Hide the options when the cancel notify checkbox is disabled.
      'visible' => [
        ':input[name="lang_danish"]' => [
          'checked' => TRUE,
        ],
      ],
    ],
  ];


  // Engelsk
  $form['options']['languages']['lang_english'] = [
    '#type'          => 'checkbox',
    '#title'         => t('Engelsk'),
    '#default_value' => theme_get_setting('lang_english'),
  ];

  $form['options']['languages']['lang_english_url'] = [
    '#type'          => 'textfield',
    '#title'         => t('Engelsk URL'),
    '#default_value' => theme_get_setting('lang_english_url'),
    '#states'        => [
      // Hide the options when the cancel notify checkbox is disabled.
      'visible' => [
        ':input[name="lang_english"]' => [
          'checked' => TRUE,
        ],
      ],
    ],
  ];

  $form['options']['languages']['lang_english_tooltip'] = [
    '#type'          => 'textfield',
    '#title'         => t('Tekst ved mouse-over'),
    '#default_value' => theme_get_setting('lang_english_tooltip'),
    '#states'        => [
      // Hide the options when the cancel notify checkbox is disabled.
      'visible' => [
        ':input[name="lang_english"]' => [
          'checked' => TRUE,
        ],
      ],
    ],
  ];

  // Svensk
  $form['options']['languages']['lang_swedish'] = [
    '#type'          => 'checkbox',
    '#title'         => t('Svensk'),
    '#default_value' => theme_get_setting('lang_swedish'),
  ];

  $form['options']['languages']['lang_swedish_url'] = [
    '#type'          => 'textfield',
    '#title'         => t('Svensk URL'),
    '#default_value' => theme_get_setting('lang_swedish_url'),
    '#states'        => [
      // Hide the options when the cancel notify checkbox is disabled.
      'visible' => [
        ':input[name="lang_swedish"]' => [
          'checked' => TRUE,
        ],
      ],
    ],
  ];

  $form['options']['languages']['lang_swedish_tooltip'] = [
    '#type'          => 'textfield',
    '#title'         => t('Tekst ved mouse-over'),
    '#default_value' => theme_get_setting('lang_swedish_tooltip'),
    '#states'        => [
      // Hide the options when the cancel notify checkbox is disabled.
      'visible' => [
        ':input[name="lang_swedish"]' => [
          'checked' => TRUE,
        ],
      ],
    ],
  ];


  // Norsk
  $form['options']['languages']['lang_norwegian'] = [
    '#type'          => 'checkbox',
    '#title'         => t('Norsk'),
    '#default_value' => theme_get_setting('lang_norwegian'),
  ];

  $form['options']['languages']['lang_norwegian_url'] = [
    '#type'          => 'textfield',
    '#title'         => t('Norsk URL'),
    '#default_value' => theme_get_setting('lang_norwegian_url'),
    '#states'        => [
      // Hide the options when the cancel notify checkbox is disabled.
      'visible' => [
        ':input[name="lang_norwegian"]' => [
          'checked' => TRUE,
        ],
      ],
    ],
  ];

  $form['options']['languages']['lang_norwegian_tooltip'] = [
    '#type'          => 'textfield',
    '#title'         => t('Tekst ved mouse-over'),
    '#default_value' => theme_get_setting('lang_norwegian_tooltip'),
    '#states'        => [
      // Hide the options when the cancel notify checkbox is disabled.
      'visible' => [
        ':input[name="lang_norwegian"]' => [
          'checked' => TRUE,
        ],
      ],
    ],
  ];

  // Arabisk
  $form['options']['languages']['lang_arabic'] = [
    '#type'          => 'checkbox',
    '#title'         => t('Arabisk'),
    '#default_value' => theme_get_setting('lang_arabic'),
  ];

  $form['options']['languages']['lang_arabic_url'] = [
    '#type'          => 'textfield',
    '#title'         => t('Arabisk URL'),
    '#default_value' => theme_get_setting('lang_arabic_url'),
    '#states'        => [
      // Hide the options when the cancel notify checkbox is disabled.
      'visible' => [
        ':input[name="lang_arabic"]' => [
          'checked' => TRUE,
        ],
      ],
    ],
  ];

  $form['options']['languages']['lang_arabic_tooltip'] = [
    '#type'          => 'textfield',
    '#title'         => t('Tekst ved mouse-over'),
    '#default_value' => theme_get_setting('lang_arabic_tooltip'),
    '#states'        => [
      // Hide the options when the cancel notify checkbox is disabled.
      'visible' => [
        ':input[name="lang_arabic"]' => [
          'checked' => TRUE,
        ],
      ],
    ],
  ];

}


/**
 * Collect and assemble theme settings.
 *
 * @return array
 */
function _bellcom_collect_theme_settings() {
  $settings = [];

  // Contact information
  $settings['contact_information']['business_owner_name']   = theme_get_setting('business_owner_name');
  $settings['contact_information']['business_startup_year'] = theme_get_setting('business_startup_year');
  $settings['contact_information']['address']               = theme_get_setting('address');
  $settings['contact_information']['zipcode']               = theme_get_setting('zipcode');
  $settings['contact_information']['city']                  = theme_get_setting('city');
  $settings['contact_information']['phone_system']          = theme_get_setting('phone_system');
  $settings['contact_information']['phone_readable']        = theme_get_setting('phone_readable');
  $settings['contact_information']['email']                 = theme_get_setting('email');
  $settings['contact_information']['working_hours']         = theme_get_setting('working_hours');

  // Social links
  $settings['social_links']['facebook']['active']    = theme_get_setting('facebook');
  $settings['social_links']['facebook']['url']       = theme_get_setting('facebook_url');
  $settings['social_links']['facebook']['tooltip']   = t(theme_get_setting('facebook_tooltip'));
  $settings['social_links']['twitter']['active']     = theme_get_setting('twitter');
  $settings['social_links']['twitter']['url']        = theme_get_setting('twitter_url');
  $settings['social_links']['twitter']['tooltip']    = t(theme_get_setting('twitter_tooltip'));
  $settings['social_links']['googleplus']['active']  = theme_get_setting('googleplus');
  $settings['social_links']['googleplus']['url']     = theme_get_setting('googleplus_url');
  $settings['social_links']['googleplus']['tooltip'] = t(theme_get_setting('googleplus_tooltip'));
  $settings['social_links']['instagram']['active']   = theme_get_setting('instagram');
  $settings['social_links']['instagram']['url']      = theme_get_setting('instagram_url');
  $settings['social_links']['instagram']['tooltip']  = t(theme_get_setting('instagram_tooltip'));
  $settings['social_links']['linkedin']['active']    = theme_get_setting('linkedin');
  $settings['social_links']['linkedin']['url']       = theme_get_setting('linkedin_url');
  $settings['social_links']['linkedin']['tooltip']   = t(theme_get_setting('linkedin_tooltip'));
  $settings['social_links']['pinterest']['active']   = theme_get_setting('pinterest');
  $settings['social_links']['pinterest']['url']      = theme_get_setting('pinterest_url');
  $settings['social_links']['pinterest']['tooltip']  = t(theme_get_setting('pinterest_tooltip'));
  $settings['social_links']['vimeo']['active']       = theme_get_setting('vimeo');
  $settings['social_links']['vimeo']['url']          = theme_get_setting('vimeo_url');
  $settings['social_links']['vimeo']['tooltip']      = t(theme_get_setting('vimeo_tooltip'));
  $settings['social_links']['youtube']['active']     = theme_get_setting('youtube');
  $settings['social_links']['youtube']['url']        = theme_get_setting('youtube_url');
  $settings['social_links']['youtube']['tooltip']    = t(theme_get_setting('youtube_tooltip'));

  // Languages
  $settings['languages']['lang_danish']['active']     = theme_get_setting('lang_danish');
  $settings['languages']['lang_danish']['url']        = theme_get_setting('lang_danish_url');
  $settings['languages']['lang_danish']['tooltip']    = t(theme_get_setting('lang_danish_tooltip'));
  $settings['languages']['lang_german']['active']     = theme_get_setting('lang_german');
  $settings['languages']['lang_german']['url']        = theme_get_setting('lang_german_url');
  $settings['languages']['lang_german']['tooltip']    = t(theme_get_setting('lang_german_tooltip'));
  $settings['languages']['lang_english']['active']    = theme_get_setting('lang_english');
  $settings['languages']['lang_english']['url']       = theme_get_setting('lang_english_url');
  $settings['languages']['lang_english']['tooltip']   = t(theme_get_setting('lang_english_tooltip'));
  $settings['languages']['lang_swedish']['active']    = theme_get_setting('lang_swedish');
  $settings['languages']['lang_swedish']['url']       = theme_get_setting('lang_swedish_url');
  $settings['languages']['lang_swedish']['tooltip']   = t(theme_get_setting('lang_swedish_tooltip'));
  $settings['languages']['lang_norwegian']['active']  = theme_get_setting('lang_norwegian');
  $settings['languages']['lang_norwegian']['url']     = theme_get_setting('lang_norwegian_url');
  $settings['languages']['lang_norwegian']['tooltip'] = t(theme_get_setting('lang_norwegian_tooltip'));
  $settings['languages']['lang_arabic']['active']     = theme_get_setting('lang_arabic');
  $settings['languages']['lang_arabic']['url']        = theme_get_setting('lang_arabic_url');
  $settings['languages']['lang_arabic']['tooltip']    = t(theme_get_setting('lang_arabic_tooltip'));

  // Layout
  $settings['layout']['copyright']                    = ($settings['contact_information']['business_startup_year'] < date('Y') AND $settings['contact_information']['business_startup_year'] !== NULL) ? $settings['contact_information']['business_startup_year'] . '-' . date('Y') : date('Y');
  $settings['layout']['footer']['show_social_links']  = theme_get_setting('footer_show_social_links');
  $settings['layout']['footer']['show_branding']      = theme_get_setting('footer_show_branding');
  $settings['layout']['footer']['description']        = theme_get_setting('footer_description');
  $settings['layout']['sidebar']['show_social_links'] = theme_get_setting('sidebar_show_social_links');

  return $settings;
}

/*
 * Sidebar classes
 */
function _bellcom_sidebar_classes($viewmode) {
  $classes = [];

  // Settings
  $enabled        = theme_get_setting('sidebar_left_' . $viewmode . '_enabled');
  $state          = theme_get_setting('sidebar_left_' . $viewmode . '_state');
  $content_effect = theme_get_setting('sidebar_left_' . $viewmode . '_content_effect');

  // Enabled
  if (!isset($enabled) or !$enabled or $enabled == 0) {
    return [];
  }

  $classes[] = 'sidebar-left-enabled-' . $viewmode;

  // State
  if ($state == 'expanded') {
    $classes[] = 'sidebar-left-expanded-' . $viewmode;
  }
  elseif ($state == 'collapsed') {
    $classes[] = 'sidebar-left-collapsed-' . $viewmode;
  }
  elseif ($state == 'hidden') {
    $classes[] = 'sidebar-left-hidden-' . $viewmode;
  }

  // Content effect
  if ($content_effect == 'shrink' && $state == 'hidden') {
    $classes[] = 'sidebar-left-content-shrink-' . $viewmode;
  }
  elseif ($content_effect == 'push') {
    $classes[] = 'sidebar-left-content-push-' . $viewmode;
  }

  return $classes;
}
