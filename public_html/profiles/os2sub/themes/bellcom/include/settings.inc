<?php

function _theme_settings_form(&$form, $form_state) {

  // Vertical tabs
  $form['options'] = array(
    '#type'        => 'vertical_tabs',
    '#default_tab' => 'main',
    '#weight'      => '-20',
    '#prefix'      => '<h2><small>' . t('Bellcom settings') . '</small></h2>',
    '#title'       => t('Bellcom settings'),
  );

  /*
  |--------------------------------------------------------------------------
  | Page layout
  |--------------------------------------------------------------------------
  |
  | Sets all necessary options to save data.
  |
  */

  // Fieldset
  $form['options']['layout'] = array(
    '#type'  => 'fieldset',
    '#title' => t('Page layout'),
  );

  // Top bar.
  $form['options']['layout']['top_bar'] = array(
    '#type'        => 'fieldset',
    '#title'       => 'Top bar',
    '#collapsible' => TRUE,
    '#collapsed'   => TRUE,
  );

  // Top bar - contact information
  $form['options']['layout']['top_bar']['contact_information'] = array(
    '#type'          => 'select',
    '#title'         => t('Show contact information'),
    '#options'       => array(
      1 => t('No, hide them.'),
      2 => t('Left side'),
      3 => t('Right side')
    ),
    '#default_value' => theme_get_setting('contact_information'),
  );

  // Top bar - social links
  $form['options']['layout']['top_bar']['social_links'] = array(
    '#type'          => 'select',
    '#title'         => t('Show social links'),
    '#options'       => array(
      1 => t('No, hide them.'),
      2 => t('Left side'),
      3 => t('Right side')
    ),
    '#default_value' => theme_get_setting('social_links'),
  );

  // Navigation
  $form['options']['layout']['navigation'] = array(
    '#type'        => 'fieldset',
    '#title'       => 'Navigation',
    '#collapsible' => TRUE,
    '#collapsed'   => TRUE,
  );
  $form['options']['layout']['navigation']['login_account_links'] = array(
    '#type'          => 'checkbox',
    '#title'         => t('Show login and user account links'),
    '#default_value' => theme_get_setting('login_account_links'),
    '#description'   => t("Links displayed in right side of navigation"),
  );

  // Sidebar
  $form['options']['layout']['sidebar'] = array(
    '#type'        => 'fieldset',
    '#title'       => 'Sidebar',
    '#collapsible' => TRUE,
    '#collapsed'   => TRUE,
  );

  // Sidebar left
  $form['options']['layout']['sidebar']['left'] = array(
    '#type'        => 'fieldset',
    '#title'       => 'Sidebar left',
    '#collapsible' => TRUE,
    '#collapsed'   => TRUE,
  );
  $form['options']['layout']['sidebar']['left']['xs'] = array(
    '#type'        => 'fieldset',
    '#title'       => 'XS viewmode',
    '#collapsible' => TRUE,
    '#collapsed'   => FALSE,
  );
  $form['options']['layout']['sidebar']['left']['xs']['sidebar_left_xs_enabled'] = array(
    '#type'          => 'checkbox',
    '#title'         => t('Enabled'),
    '#default_value' => theme_get_setting('sidebar_left_xs_enabled'),
  );
  $form['options']['layout']['sidebar']['left']['xs']['sidebar_left_xs_state'] = array(
    '#type'          => 'radios',
    '#title'         => t('State'),
    '#default_value' => theme_get_setting('sidebar_left_xs_state'),
    '#options'       => array(
      'expanded'  => 'Expanded',
      'collapsed' => 'Collapsed',
      'hidden'    => 'Hidden',
    ),
    '#states'        => array(
      'visible' => array(
        ':input[name="sidebar_left_xs_enabled"]' => array('checked' => TRUE),
      ),
    ),
  );
  $form['options']['layout']['sidebar']['left']['xs']['sidebar_left_xs_content_effect'] = array(
    '#type'          => 'radios',
    '#title'         => t('Content effect'),
    '#default_value' => theme_get_setting('sidebar_left_xs_content_effect'),
    '#options'       => array(
      'shrink' => 'Shrink content',
      'push'   => 'Push content (off-canvas)',
    ),
    '#states'        => array(
      'visible' => array(
        ':input[name="sidebar_left_xs_enabled"]' => array('checked' => TRUE),
        ':input[name="sidebar_left_xs_state"]'   => array('value' => 'hidden'),
      ),
    ),
  );

  $form['options']['layout']['sidebar']['left']['sm'] = array(
    '#type'        => 'fieldset',
    '#title'       => 'SM viewmode',
    '#collapsible' => TRUE,
    '#collapsed'   => FALSE,
  );
  $form['options']['layout']['sidebar']['left']['sm']['sidebar_left_sm_enabled'] = array(
    '#type'          => 'checkbox',
    '#title'         => t('Enabled'),
    '#default_value' => theme_get_setting('sidebar_left_sm_enabled'),
  );
  $form['options']['layout']['sidebar']['left']['sm']['sidebar_left_sm_state'] = array(
    '#type'          => 'radios',
    '#title'         => t('State'),
    '#default_value' => theme_get_setting('sidebar_left_sm_state'),
    '#options'       => array(
      'expanded'  => 'Expanded',
      'collapsed' => 'Collapsed',
      'hidden'    => 'Hidden',
    ),
    '#states'        => array(
      'visible' => array(
        ':input[name="sidebar_left_sm_enabled"]' => array('checked' => TRUE),
      ),
    ),
  );
  $form['options']['layout']['sidebar']['left']['sm']['sidebar_left_sm_content_effect'] = array(
    '#type'          => 'radios',
    '#title'         => t('Content effect'),
    '#default_value' => theme_get_setting('sidebar_left_sm_content_effect'),
    '#options'       => array(
      'shrink' => 'Shrink content',
      'push'   => 'Push content (off-canvas)',
    ),
    '#states'        => array(
      'visible' => array(
        ':input[name="sidebar_left_sm_enabled"]' => array('checked' => TRUE),
        ':input[name="sidebar_left_sm_state"]'   => array('value' => 'hidden'),
      ),
    ),
  );

  $form['options']['layout']['sidebar']['left']['md'] = array(
    '#type'        => 'fieldset',
    '#title'       => 'MD viewmode',
    '#collapsible' => TRUE,
    '#collapsed'   => FALSE,
  );
  $form['options']['layout']['sidebar']['left']['md']['sidebar_left_md_enabled'] = array(
    '#type'          => 'checkbox',
    '#title'         => t('Enabled'),
    '#default_value' => theme_get_setting('sidebar_left_md_enabled'),
  );
  $form['options']['layout']['sidebar']['left']['md']['sidebar_left_md_state'] = array(
    '#type'          => 'radios',
    '#title'         => t('State'),
    '#default_value' => theme_get_setting('sidebar_left_md_state'),
    '#options'       => array(
      'expanded'  => 'Expanded',
      'collapsed' => 'Collapsed',
      'hidden'    => 'Hidden',
    ),
    '#states'        => array(
      'visible' => array(
        ':input[name="sidebar_left_md_enabled"]' => array('checked' => TRUE),
      ),
    ),
  );
  $form['options']['layout']['sidebar']['left']['md']['sidebar_left_md_content_effect'] = array(
    '#type'          => 'radios',
    '#title'         => t('Content effect'),
    '#default_value' => theme_get_setting('sidebar_left_md_content_effect'),
    '#options'       => array(
      'shrink' => 'Shrink content',
      'push'   => 'Push content (off-canvas)',
    ),
    '#states'        => array(
      'visible' => array(
        ':input[name="sidebar_left_md_enabled"]' => array('checked' => TRUE),
        ':input[name="sidebar_left_md_state"]'   => array('value' => 'hidden'),
      ),
    ),
  );

  $form['options']['layout']['sidebar']['left']['lg'] = array(
    '#type'        => 'fieldset',
    '#title'       => 'LG viewmode',
    '#collapsible' => TRUE,
    '#collapsed'   => FALSE,
  );
  $form['options']['layout']['sidebar']['left']['lg']['sidebar_left_lg_enabled'] = array(
    '#type'          => 'checkbox',
    '#title'         => t('Enabled'),
    '#default_value' => theme_get_setting('sidebar_left_lg_enabled'),
  );
  $form['options']['layout']['sidebar']['left']['lg']['sidebar_left_lg_state'] = array(
    '#type'          => 'radios',
    '#title'         => t('State'),
    '#default_value' => theme_get_setting('sidebar_left_lg_state'),
    '#options'       => array(
      'expanded'  => 'Expanded',
      'collapsed' => 'Collapsed',
      'hidden'    => 'Hidden',
    ),
    '#states'        => array(
      'visible' => array(
        ':input[name="sidebar_left_lg_enabled"]' => array('checked' => TRUE),
      ),
    ),
  );
  $form['options']['layout']['sidebar']['left']['lg']['sidebar_left_lg_content_effect'] = array(
    '#type'          => 'radios',
    '#title'         => t('Content effect'),
    '#default_value' => theme_get_setting('sidebar_left_lg_content_effect'),
    '#options'       => array(
      'shrink' => 'Shrink content',
      'push'   => 'Push content (off-canvas)',
    ),
    '#states'        => array(
      'visible' => array(
        ':input[name="sidebar_left_lg_enabled"]' => array('checked' => TRUE),
        ':input[name="sidebar_left_lg_state"]'   => array('value' => 'hidden'),
      ),
    ),
  );

  // Footer
  $form['options']['layout']['footer'] = array(
    '#type'        => 'fieldset',
    '#title'       => 'Footer',
    '#collapsible' => TRUE,
    '#collapsed'   => TRUE,
  );
  $form['options']['layout']['footer']['footer_show_social_links'] = array(
    '#type'          => 'checkbox',
    '#title'         => t('Show social links'),
    '#default_value' => theme_get_setting('footer_show_social_links'),
    '#description'   => t("Should social links be displayed inside the footer?"),
  );

  /*
  |--------------------------------------------------------------------------
  | Contact information
  |--------------------------------------------------------------------------
  |
  | Sets all necessary options to save data.
  |
  */

  // Fieldset
  $form['options']['contact_information'] = array(
    '#type'  => 'fieldset',
    '#title' => t('Contact information'),
  );

  // Business owner name
  $form['options']['contact_information']['business_owner_name'] = array(
    '#type'          => 'textfield',
    '#title'         => t('Business owner name'),
    '#default_value' => theme_get_setting('business_owner_name'),
  );

  // Business startup year
  $form['options']['contact_information']['business_startup_year'] = array(
    '#type'          => 'textfield',
    '#title'         => t('Business startup year'),
    '#default_value' => theme_get_setting('business_startup_year'),
  );

  // Address
  $form['options']['contact_information']['address'] = array(
    '#type'          => 'textfield',
    '#title'         => t('Address'),
    '#default_value' => theme_get_setting('address'),
  );

  // Zipcode
  $form['options']['contact_information']['zipcode'] = array(
    '#type'          => 'textfield',
    '#title'         => t('Zipcode'),
    '#default_value' => theme_get_setting('zipcode'),
  );

  // City
  $form['options']['contact_information']['city'] = array(
    '#type'          => 'textfield',
    '#title'         => t('City'),
    '#default_value' => theme_get_setting('city'),
  );

  // Phone number
  $form['options']['contact_information']['phone_system'] = array(
    '#type'          => 'textfield',
    '#title'         => t('Phone number'),
    '#description'   => t('Remember: you need to use the correct format. Ex.: 004570260085'),
    '#default_value' => theme_get_setting('phone_system'),
  );

  // Phone number - readable
  $form['options']['contact_information']['phone_readable'] = array(
    '#type'          => 'textfield',
    '#title'         => t('Readable phone number'),
    '#description'   => t('The textual representation of your phone number.'),
    '#default_value' => theme_get_setting('phone_readable'),
  );

  // E-mail address
  $form['options']['contact_information']['email'] = array(
    '#type'          => 'textfield',
    '#title'         => t('Email address'),
    '#default_value' => theme_get_setting('email'),
  );

  // Working hours
  $form['options']['contact_information']['working_hours'] = array(
    '#type'          => 'textfield',
    '#title'         => t('Opening hours'),
    '#default_value' => theme_get_setting('working_hours'),
  );

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
    '#title' => t('Social links'),
  ];

  // Facebook
  $form['options']['social_links']['facebook'] = [
    '#type'          => 'checkbox',
    '#title'         => t('Facebook'),
    '#default_value' => theme_get_setting('facebook'),
  ];
  $form['options']['social_links']['facebook_url'] = [
    '#type'          => 'textfield',
    '#title'         => t('Facebook link'),
    '#default_value' => theme_get_setting('facebook_url'),
    '#states'        => [
      // Hide the options when the cancel notify checkbox is disabled.
      'visible' => [
        ':input[name="facebook"]' => [
          'checked' => TRUE
        ],
      ],
    ],
  ];
  $form['options']['social_links']['facebook_tooltip'] = [
    '#type'          => 'textfield',
    '#title'         => t('Tooltip text'),
    '#default_value' => theme_get_setting('facebook_tooltip'),
    '#states'        => [
      // Hide the options when the cancel notify checkbox is disabled.
      'visible' => [
        ':input[name="facebook"]' => [
          'checked' => TRUE
        ],
      ],
    ],
  ];

  // Twitter
  $form['options']['social_links']['twitter'] = [
    '#type'          => 'checkbox',
    '#title'         => t('Twitter'),
    '#default_value' => theme_get_setting('twitter'),
  ];
  $form['options']['social_links']['twitter_url'] = [
    '#type'          => 'textfield',
    '#title'         => t('Twitter link'),
    '#default_value' => theme_get_setting('twitter_url'),
    '#states'        => [
      // Hide the options when the cancel notify checkbox is disabled.
      'visible' => [
        ':input[name="twitter"]' => [
          'checked' => TRUE
        ],
      ],
    ],
  ];
  $form['options']['social_links']['twitter_tooltip'] = [
    '#type'          => 'textfield',
    '#title'         => t('Tooltip text'),
    '#default_value' => theme_get_setting('twitter_tooltip'),
    '#states'        => [
      // Hide the options when the cancel notify checkbox is disabled.
      'visible' => [
        ':input[name="twitter"]' => [
          'checked' => TRUE
        ],
      ],
    ],
  ];

  // Google plus
  $form['options']['social_links']['googleplus'] = [
    '#type'          => 'checkbox',
    '#title'         => t('Google plus'),
    '#default_value' => theme_get_setting('googleplus'),
  ];
  $form['options']['social_links']['googleplus_url'] = [
    '#type'          => 'textfield',
    '#title'         => t('Google plus link'),
    '#default_value' => theme_get_setting('googleplus_url'),
    '#states'        => [
      // Hide the options when the cancel notify checkbox is disabled.
      'visible' => [
        ':input[name="googleplus"]' => [
          'checked' => TRUE
        ],
      ],
    ],
  ];
  $form['options']['social_links']['googleplus_tooltip'] = [
    '#type'          => 'textfield',
    '#title'         => t('Tooltip text'),
    '#default_value' => theme_get_setting('googleplus_tooltip'),
    '#states'        => [
      // Hide the options when the cancel notify checkbox is disabled.
      'visible' => [
        ':input[name="googleplus"]' => [
          'checked' => TRUE
        ],
      ],
    ],
  ];

  // Instagram
  $form['options']['social_links']['instagram'] = [
    '#type'          => 'checkbox',
    '#title'         => t('Instagram'),
    '#default_value' => theme_get_setting('instagram'),
  ];
  $form['options']['social_links']['instagram_url'] = [
    '#type'          => 'textfield',
    '#title'         => t('Instagram link'),
    '#default_value' => theme_get_setting('instagram_url'),
    '#states'        => [
      // Hide the options when the cancel notify checkbox is disabled.
      'visible' => [
        ':input[name="instagram"]' => [
          'checked' => TRUE
        ],
      ],
    ],
  ];
  $form['options']['social_links']['instagram_tooltip'] = [
    '#type'          => 'textfield',
    '#title'         => t('Tooltip text'),
    '#default_value' => theme_get_setting('instagram_tooltip'),
    '#states'        => [
      // Hide the options when the cancel notify checkbox is disabled.
      'visible' => [
        ':input[name="instagram"]' => [
          'checked' => TRUE
        ],
      ],
    ],
  ];

  // LinkedIn
  $form['options']['social_links']['linkedin'] = [
    '#type'          => 'checkbox',
    '#title'         => t('LinkedIn'),
    '#default_value' => theme_get_setting('linkedin'),
  ];
  $form['options']['social_links']['linkedin_url'] = [
    '#type'          => 'textfield',
    '#title'         => t('LinkedIn link'),
    '#default_value' => theme_get_setting('linkedin_url'),
    '#states'        => [
      // Hide the options when the cancel notify checkbox is disabled.
      'visible' => [
        ':input[name="linkedin"]' => [
          'checked' => TRUE
        ],
      ],
    ],
  ];
  $form['options']['social_links']['linkedin_tooltip'] = [
    '#type'          => 'textfield',
    '#title'         => t('Tooltip text'),
    '#default_value' => theme_get_setting('linkedin_tooltip'),
    '#states'        => [
      // Hide the options when the cancel notify checkbox is disabled.
      'visible' => [
        ':input[name="linkedin"]' => [
          'checked' => TRUE
        ],
      ],
    ],
  ];

  // Pinterest
  $form['options']['social_links']['pinterest'] = [
    '#type'          => 'checkbox',
    '#title'         => t('Pinterest'),
    '#default_value' => theme_get_setting('pinterest'),
  ];
  $form['options']['social_links']['pinterest_url'] = [
    '#type'          => 'textfield',
    '#title'         => t('Pinterest link'),
    '#default_value' => theme_get_setting('pinterest_url'),
    '#states'        => [
      // Hide the options when the cancel notify checkbox is disabled.
      'visible' => [
        ':input[name="pinterest"]' => [
          'checked' => TRUE
        ],
      ],
    ],
  ];
  $form['options']['social_links']['pinterest_tooltip'] = [
    '#type'          => 'textfield',
    '#title'         => t('Tooltip text'),
    '#default_value' => theme_get_setting('pinterest_tooltip'),
    '#states'        => [
      // Hide the options when the cancel notify checkbox is disabled.
      'visible' => [
        ':input[name="pinterest"]' => [
          'checked' => TRUE
        ],
      ],
    ],
  ];

  // Vimeo
  $form['options']['social_links']['vimeo'] = [
    '#type'          => 'checkbox',
    '#title'         => t('Vimeo'),
    '#default_value' => theme_get_setting('vimeo'),
  ];
  $form['options']['social_links']['vimeo_url'] = [
    '#type'          => 'textfield',
    '#title'         => t('Vimeo link'),
    '#default_value' => theme_get_setting('vimeo_url'),
    '#states'        => [
      // Hide the options when the cancel notify checkbox is disabled.
      'visible' => [
        ':input[name="vimeo"]' => [
          'checked' => TRUE
        ],
      ],
    ],
  ];
  $form['options']['social_links']['vimeo_tooltip'] = [
    '#type'          => 'textfield',
    '#title'         => t('Tooltip text'),
    '#default_value' => theme_get_setting('vimeo_tooltip'),
    '#states'        => [
      // Hide the options when the cancel notify checkbox is disabled.
      'visible' => [
        ':input[name="vimeo"]' => [
          'checked' => TRUE
        ],
      ],
    ],
  ];

  // Youtube
  $form['options']['social_links']['youtube'] = [
    '#type'          => 'checkbox',
    '#title'         => t('Youtube'),
    '#default_value' => theme_get_setting('youtube'),
  ];
  $form['options']['social_links']['youtube_url'] = [
    '#type'          => 'textfield',
    '#title'         => t('Youtube link'),
    '#default_value' => theme_get_setting('youtube_url'),
    '#states'        => [
      // Hide the options when the cancel notify checkbox is disabled.
      'visible' => [
        ':input[name="youtube"]' => [
          'checked' => TRUE
        ],
      ],
    ],
  ];
  $form['options']['social_links']['youtube_tooltip'] = [
    '#type'          => 'textfield',
    '#title'         => t('Tooltip text'),
    '#default_value' => theme_get_setting('youtube_tooltip'),
    '#states'        => [
      // Hide the options when the cancel notify checkbox is disabled.
      'visible' => [
        ':input[name="youtube"]' => [
          'checked' => TRUE
        ],
      ],
    ],
  ];
}

/**
 * Collect and assemble theme settings.
 * @return array
 */
function _bellcom_collect_theme_settings() {
  $settings = array();

  // Contact information
  $settings['contact_information']['business_owner_name'] = theme_get_setting('business_owner_name');
  $settings['contact_information']['business_startup_year'] = theme_get_setting('business_startup_year');
  $settings['contact_information']['address'] = theme_get_setting('address');
  $settings['contact_information']['zipcode'] = theme_get_setting('zipcode');
  $settings['contact_information']['city'] = theme_get_setting('city');
  $settings['contact_information']['phone_system'] = theme_get_setting('phone_system');
  $settings['contact_information']['phone_readable'] = theme_get_setting('phone_readable');
  $settings['contact_information']['email'] = theme_get_setting('email');
  $settings['contact_information']['working_hours'] = theme_get_setting('working_hours');

  // Social links
  $settings['social_links']['facebook']['active'] = theme_get_setting('facebook');
  $settings['social_links']['facebook']['url'] = theme_get_setting('facebook_url');
  $settings['social_links']['facebook']['tooltip'] = t(theme_get_setting('facebook_tooltip'));
  $settings['social_links']['twitter']['active'] = theme_get_setting('twitter');
  $settings['social_links']['twitter']['url'] = theme_get_setting('twitter_url');
  $settings['social_links']['twitter']['tooltip'] = t(theme_get_setting('twitter_tooltip'));
  $settings['social_links']['googleplus']['active'] = theme_get_setting('googleplus');
  $settings['social_links']['googleplus']['url'] = theme_get_setting('googleplus_url');
  $settings['social_links']['googleplus']['tooltip'] = t(theme_get_setting('googleplus_tooltip'));
  $settings['social_links']['instagram']['active'] = theme_get_setting('instagram');
  $settings['social_links']['instagram']['url'] = theme_get_setting('instagram_url');
  $settings['social_links']['instagram']['tooltip'] = t(theme_get_setting('instagram_tooltip'));
  $settings['social_links']['linkedin']['active'] = theme_get_setting('linkedin');
  $settings['social_links']['linkedin']['url'] = theme_get_setting('linkedin_url');
  $settings['social_links']['linkedin']['tooltip'] = t(theme_get_setting('linkedin_tooltip'));
  $settings['social_links']['pinterest']['active'] = theme_get_setting('pinterest');
  $settings['social_links']['pinterest']['url'] = theme_get_setting('pinterest_url');
  $settings['social_links']['pinterest']['tooltip'] = t(theme_get_setting('pinterest_tooltip'));
  $settings['social_links']['vimeo']['active'] = theme_get_setting('vimeo');
  $settings['social_links']['vimeo']['url'] = theme_get_setting('vimeo_url');
  $settings['social_links']['vimeo']['tooltip'] = t(theme_get_setting('vimeo_tooltip'));
  $settings['social_links']['youtube']['active'] = theme_get_setting('youtube');
  $settings['social_links']['youtube']['url'] = theme_get_setting('youtube_url');
  $settings['social_links']['youtube']['tooltip'] = t(theme_get_setting('youtube_tooltip'));

  // Layout
  $settings['layout']['copyright'] = ($settings['contact_information']['business_startup_year'] < date('Y') AND $settings['contact_information']['business_startup_year'] !== NULL) ? $settings['contact_information']['business_startup_year'] . '-' . date('Y') : date('Y');
  $settings['layout']['footer']['show_social_links'] = theme_get_setting('footer_show_social_links');
  $settings['layout']['sidebar']['show_social_links'] = theme_get_setting('sidebar_show_social_links');

  return $settings;
}

/*
 * Sidebar classes
 */
function _bellcom_sidebar_classes($viewmode) {
  $classes = array();

  // Settings
  $enabled = theme_get_setting('sidebar_left_' . $viewmode . '_enabled');
  $state = theme_get_setting('sidebar_left_' . $viewmode . '_state');
  $content_effect = theme_get_setting('sidebar_left_' . $viewmode . '_content_effect');

  // Enabled
  if (!isset($enabled) or !$enabled or $enabled == 0) {
    return array();
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
