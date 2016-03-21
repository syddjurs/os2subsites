<?php

function _theme_settings_form(&$form, $form_state) {

  // Vertical tabs
  $form['options'] = array(
    '#type'        => 'vertical_tabs',
    '#default_tab' => 'main',
    '#weight'      => '-20',
    '#prefix'      => '<h2><small>' . t('Site indstillinger') . '</small></h2>',
    '#title'       => t('Indstillinger'),
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
    '#title' => t('Sideopsætning'),
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
    '#title'         => t('Vis kontaktinformationer'),
    '#options'       => array(
      1 => t('Nej, skjul dem.'),
      2 => t('Venstre side'),
      3 => t('Højre side')
    ),
    '#default_value' => theme_get_setting('contact_information'),
  );

  // Top bar - social links
  $form['options']['layout']['top_bar']['social_links'] = array(
    '#type'          => 'select',
    '#title'         => t('Vis links til sociale websites'),
    '#options'       => array(
      1 => t('Nej, skjul dem.'),
      2 => t('Venstre side'),
      3 => t('Højre side')
    ),
    '#default_value' => theme_get_setting('social_links'),
  );

  // Navigation
  $form['options']['layout']['navigation'] = array(
    '#type'        => 'fieldset',
    '#title'       => t('Navigation'),
    '#collapsible' => TRUE,
    '#collapsed'   => TRUE,
  );
  $form['options']['layout']['navigation']['login_account_links'] = array(
    '#type'          => 'checkbox',
    '#title'         => t('Vis login og brugerlink'),
    '#default_value' => theme_get_setting('login_account_links'),
    '#description'   => t("Vises i højre side af navigationen"),
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
    '#title'       => t('Sidebar venstre'),
    '#collapsible' => TRUE,
    '#collapsed'   => TRUE,
  );
  $form['options']['layout']['sidebar']['left']['xs'] = array(
    '#type'        => 'fieldset',
    '#title'       => t('XS viewmode'),
    '#collapsible' => TRUE,
    '#collapsed'   => FALSE,
  );
  $form['options']['layout']['sidebar']['left']['xs']['sidebar_left_xs_enabled'] = array(
    '#type'          => 'checkbox',
    '#title'         => t('Aktiv'),
    '#default_value' => theme_get_setting('sidebar_left_xs_enabled'),
  );
  $form['options']['layout']['sidebar']['left']['xs']['sidebar_left_xs_state'] = array(
    '#type'          => 'radios',
    '#title'         => t('Tilstand'),
    '#default_value' => theme_get_setting('sidebar_left_xs_state'),
    '#options'       => array(
      'expanded'  => t('Åben'),
      'collapsed' => t('Lukket'),
      'hidden'    => t('Skjult'),
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
    '#title'       => t('SM viewmode'),
    '#collapsible' => TRUE,
    '#collapsed'   => FALSE,
  );
  $form['options']['layout']['sidebar']['left']['sm']['sidebar_left_sm_enabled'] = array(
    '#type'          => 'checkbox',
    '#title'         => t('Aktiv'),
    '#default_value' => theme_get_setting('sidebar_left_sm_enabled'),
  );
  $form['options']['layout']['sidebar']['left']['sm']['sidebar_left_sm_state'] = array(
    '#type'          => 'radios',
    '#title'         => t('Tilstand'),
    '#default_value' => theme_get_setting('sidebar_left_sm_state'),
    '#options'       => array(
      'expanded'  => t('Åben'),
      'collapsed' => t('Lukket'),
      'hidden'    => t('Skjult'),
    ),
    '#states'        => array(
      'visible' => array(
        ':input[name="sidebar_left_sm_enabled"]' => array('checked' => TRUE),
      ),
    ),
  );
  $form['options']['layout']['sidebar']['left']['sm']['sidebar_left_sm_content_effect'] = array(
    '#type'          => 'radios',
    '#title'         => t('Visning af indhold'),
    '#default_value' => theme_get_setting('sidebar_left_sm_content_effect'),
    '#options'       => array(
      'shrink' => t('Presset sammen'),
      'push'   => t('Skubbet til siden (off-canvas)'),
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
    '#title'       => t('MD viewmode'),
    '#collapsible' => TRUE,
    '#collapsed'   => FALSE,
  );
  $form['options']['layout']['sidebar']['left']['md']['sidebar_left_md_enabled'] = array(
    '#type'          => 'checkbox',
    '#title'         => t('Aktiv'),
    '#default_value' => theme_get_setting('sidebar_left_md_enabled'),
  );
  $form['options']['layout']['sidebar']['left']['md']['sidebar_left_md_state'] = array(
    '#type'          => 'radios',
    '#title'         => t('Tilstand'),
    '#default_value' => theme_get_setting('sidebar_left_md_state'),
    '#options'       => array(
      'expanded'  => t('Åben'),
      'collapsed' => t('Lukket'),
      'hidden'    => t('Skjult'),
    ),
    '#states'        => array(
      'visible' => array(
        ':input[name="sidebar_left_md_enabled"]' => array('checked' => TRUE),
      ),
    ),
  );
  $form['options']['layout']['sidebar']['left']['md']['sidebar_left_md_content_effect'] = array(
    '#type'          => 'radios',
    '#title'         => t('Visning af indhold'),
    '#default_value' => theme_get_setting('sidebar_left_md_content_effect'),
    '#options'       => array(
      'shrink' => t('Presset sammen'),
      'push'   => t('Skubbet til siden (off-canvas)'),
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
    '#title'         => t('Aktiv'),
    '#default_value' => theme_get_setting('sidebar_left_lg_enabled'),
  );
  $form['options']['layout']['sidebar']['left']['lg']['sidebar_left_lg_state'] = array(
    '#type'          => 'radios',
    '#title'         => t('Tilstand'),
    '#default_value' => theme_get_setting('sidebar_left_lg_state'),
    '#options'       => array(
      'expanded'  => t('Åben'),
      'collapsed' => t('Lukket'),
      'hidden'    => t('Skjult'),
    ),
    '#states'        => array(
      'visible' => array(
        ':input[name="sidebar_left_lg_enabled"]' => array('checked' => TRUE),
      ),
    ),
  );
  $form['options']['layout']['sidebar']['left']['lg']['sidebar_left_lg_content_effect'] = array(
    '#type'          => 'radios',
    '#title'         => t('Visning af indhold'),
    '#default_value' => theme_get_setting('sidebar_left_lg_content_effect'),
    '#options'       => array(
      'shrink' => t('Presset sammen'),
      'push'   => t('Skubbet til siden (off-canvas)'),
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
    '#title'       => t('Footer'),
    '#collapsible' => TRUE,
    '#collapsed'   => TRUE,
  );
  $form['options']['layout']['footer']['footer_show_social_links'] = array(
    '#type'          => 'checkbox',
    '#title'         => t('Vis links til sociale tjenester'),
    '#default_value' => theme_get_setting('footer_show_social_links'),
    '#description'   => t("Skal links til sociale tjenester vises i bunden af siden?"),
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
    '#title' => t('Kontakt information'),
  );

  // Business owner name
  $form['options']['contact_information']['business_owner_name'] = array(
    '#type'          => 'textfield',
    '#title'         => t('Navn'),
    '#default_value' => theme_get_setting('business_owner_name'),
  );

  // Business startup year
  $form['options']['contact_information']['business_startup_year'] = array(
    '#type'          => 'textfield',
    '#title'         => t('Opstartsår'),
    '#default_value' => theme_get_setting('business_startup_year'),
  );

  // Address
  $form['options']['contact_information']['address'] = array(
    '#type'          => 'textfield',
    '#title'         => t('Adresse'),
    '#default_value' => theme_get_setting('address'),
  );

  // Zipcode
  $form['options']['contact_information']['zipcode'] = array(
    '#type'          => 'textfield',
    '#title'         => t('Postnr'),
    '#default_value' => theme_get_setting('zipcode'),
  );

  // City
  $form['options']['contact_information']['city'] = array(
    '#type'          => 'textfield',
    '#title'         => t('By'),
    '#default_value' => theme_get_setting('city'),
  );

  // Phone number
  $form['options']['contact_information']['phone_system'] = array(
    '#type'          => 'textfield',
    '#title'         => t('Telefon'),
    '#description'   => t('HUSK: uden mellemrum og inkl. +45 f.eks.: +4570260085'),
    '#default_value' => theme_get_setting('phone_system'),
  );

  // Phone number - readable
  $form['options']['contact_information']['phone_readable'] = array(
    '#type'          => 'textfield',
    '#title'         => t('Vist telefon nummer'),
    '#description'   => t('Telefonnummeret vist (brug evt. mellemrum så det er let læseligt)'),
    '#default_value' => theme_get_setting('phone_readable'),
  );

  // E-mail address
  $form['options']['contact_information']['email'] = array(
    '#type'          => 'textfield',
    '#title'         => t('E-mail'),
    '#default_value' => theme_get_setting('email'),
  );

  // Working hours
  $form['options']['contact_information']['working_hours'] = array(
    '#type'          => 'textfield',
    '#title'         => t('Åbningstid eller anden info'),
    '#default_value' => theme_get_setting('working_hours'),
  );

  
  /**
* Implementation of THEMEHOOK_settings() function.
*
* @param $saved_settings
*   array An array of saved settings for this theme.
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
  $form['options']['social_links'] = array(
    '#type'  => 'fieldset',
    '#title' => t('Sociale tjenester'),
  );

  // Facebook
  $form['options']['social_links']['facebook'] = array(
    '#type'          => 'checkbox',
    '#title'         => t('Facebook'),
    '#default_value' => theme_get_setting('facebook'),
  );
  $form['options']['social_links']['facebook_url'] = array(
    '#type'          => 'textfield',
    '#title'         => t('Facebook URL'),
    '#default_value' => theme_get_setting('facebook_url'),
    '#states'        => array(
      // Hide the options when the cancel notify checkbox is disabled.
      'visible' => array(
        ':input[name="facebook"]' => array(
          'checked' => TRUE
        ),
      ),
    ),
  );
  $form['options']['social_links']['facebook_tooltip'] = array(
    '#type'          => 'textfield',
    '#title'         => t('Tekst ved mouse-over'),
    '#default_value' => theme_get_setting('facebook_tooltip'),
    '#states'        => array(
      // Hide the options when the cancel notify checkbox is disabled.
      'visible' => array(
        ':input[name="facebook"]' => array(
          'checked' => TRUE
        ),
      ),
    ),
  );

  // Twitter
  $form['options']['social_links']['twitter'] = array(
    '#type'          => 'checkbox',
    '#title'         => t('Twitter'),
    '#default_value' => theme_get_setting('twitter'),
  );
  $form['options']['social_links']['twitter_url'] = array(
    '#type'          => 'textfield',
    '#title'         => t('Twitter URL'),
    '#default_value' => theme_get_setting('twitter_url'),
    '#states'        => array(
      // Hide the options when the cancel notify checkbox is disabled.
      'visible' => array(
        ':input[name="twitter"]' => array(
          'checked' => TRUE
        ),
      ),
    ),
  );
  $form['options']['social_links']['twitter_tooltip'] = array(
    '#type'          => 'textfield',
    '#title'         => t('Tekst ved mouse-over'),
    '#default_value' => theme_get_setting('twitter_tooltip'),
    '#states'        => array(
      // Hide the options when the cancel notify checkbox is disabled.
      'visible' => array(
        ':input[name="twitter"]' => array(
          'checked' => TRUE
        ),
      ),
    ),
  );

  // Google plus
  $form['options']['social_links']['googleplus'] = array(
    '#type'          => 'checkbox',
    '#title'         => t('Google plus'),
    '#default_value' => theme_get_setting('googleplus'),
  );
  $form['options']['social_links']['googleplus_url'] = array(
    '#type'          => 'textfield',
    '#title'         => t('Google plus URL'),
    '#default_value' => theme_get_setting('googleplus_url'),
    '#states'        => array(
      // Hide the options when the cancel notify checkbox is disabled.
      'visible' => array(
        ':input[name="googleplus"]' => array(
          'checked' => TRUE
        ),
      ),
    ),
  );
  $form['options']['social_links']['googleplus_tooltip'] = array(
    '#type'          => 'textfield',
    '#title'         => t('Tekst ved mouse-over'),
    '#default_value' => theme_get_setting('googleplus_tooltip'),
    '#states'        => array(
      // Hide the options when the cancel notify checkbox is disabled.
      'visible' => array(
        ':input[name="googleplus"]' => array(
          'checked' => TRUE
        ),
      ),
    ),
  );

  // Instagram
  $form['options']['social_links']['instagram'] = array(
    '#type'          => 'checkbox',
    '#title'         => t('Instagram'),
    '#default_value' => theme_get_setting('instagram'),
  );
  $form['options']['social_links']['instagram_url'] = array(
    '#type'          => 'textfield',
    '#title'         => t('Instagram URL'),
    '#default_value' => theme_get_setting('instagram_url'),
    '#states'        => array(
      // Hide the options when the cancel notify checkbox is disabled.
      'visible' => array(
        ':input[name="instagram"]' => array(
          'checked' => TRUE
        ),
      ),
    ),
  );
  $form['options']['social_links']['instagram_tooltip'] = array(
    '#type'          => 'textfield',
    '#title'         => t('Tekst ved mouse-over'),
    '#default_value' => theme_get_setting('instagram_tooltip'),
    '#states'        => array(
      // Hide the options when the cancel notify checkbox is disabled.
      'visible' => array(
        ':input[name="instagram"]' => array(
          'checked' => TRUE
        ),
      ),
    ),
  );

  // LinkedIn
  $form['options']['social_links']['linkedin'] = array(
    '#type'          => 'checkbox',
    '#title'         => t('LinkedIn'),
    '#default_value' => theme_get_setting('linkedin'),
  );
  $form['options']['social_links']['linkedin_url'] = array(
    '#type'          => 'textfield',
    '#title'         => t('LinkedIn URL'),
    '#default_value' => theme_get_setting('linkedin_url'),
    '#states'        => array(
      // Hide the options when the cancel notify checkbox is disabled.
      'visible' => array(
        ':input[name="linkedin"]' => array(
          'checked' => TRUE
        ),
      ),
    ),
  );
  $form['options']['social_links']['linkedin_tooltip'] = array(
    '#type'          => 'textfield',
    '#title'         => t('Tekst ved mouse-over'),
    '#default_value' => theme_get_setting('linkedin_tooltip'),
    '#states'        => array(
      // Hide the options when the cancel notify checkbox is disabled.
      'visible' => array(
        ':input[name="linkedin"]' => array(
          'checked' => TRUE
        ),
      ),
    ),
  );

  // Pinterest
  $form['options']['social_links']['pinterest'] = array(
    '#type'          => 'checkbox',
    '#title'         => t('Pinterest'),
    '#default_value' => theme_get_setting('pinterest'),
  );
  $form['options']['social_links']['pinterest_url'] = array(
    '#type'          => 'textfield',
    '#title'         => t('Pinterest URL'),
    '#default_value' => theme_get_setting('pinterest_url'),
    '#states'        => array(
      // Hide the options when the cancel notify checkbox is disabled.
      'visible' => array(
        ':input[name="pinterest"]' => array(
          'checked' => TRUE
        ),
      ),
    ),
  );
  $form['options']['social_links']['pinterest_tooltip'] = array(
    '#type'          => 'textfield',
    '#title'         => t('Tekst ved mouse-over'),
    '#default_value' => theme_get_setting('pinterest_tooltip'),
    '#states'        => array(
      // Hide the options when the cancel notify checkbox is disabled.
      'visible' => array(
        ':input[name="pinterest"]' => array(
          'checked' => TRUE
        ),
      ),
    ),
  );

  // Vimeo
  $form['options']['social_links']['vimeo'] = array(
    '#type'          => 'checkbox',
    '#title'         => t('Vimeo'),
    '#default_value' => theme_get_setting('vimeo'),
  );
  $form['options']['social_links']['vimeo_url'] = array(
    '#type'          => 'textfield',
    '#title'         => t('Vimeo URL'),
    '#default_value' => theme_get_setting('vimeo_url'),
    '#states'        => array(
      // Hide the options when the cancel notify checkbox is disabled.
      'visible' => array(
        ':input[name="vimeo"]' => array(
          'checked' => TRUE
        ),
      ),
    ),
  );
  $form['options']['social_links']['vimeo_tooltip'] = array(
    '#type'          => 'textfield',
    '#title'         => t('Tekst ved mouse-over'),
    '#default_value' => theme_get_setting('vimeo_tooltip'),
    '#states'        => array(
      // Hide the options when the cancel notify checkbox is disabled.
      'visible' => array(
        ':input[name="vimeo"]' => array(
          'checked' => TRUE
        ),
      ),
    ),
  );

  // Youtube
  $form['options']['social_links']['youtube'] = array(
    '#type'          => 'checkbox',
    '#title'         => t('Youtube'),
    '#default_value' => theme_get_setting('youtube'),
  );
  $form['options']['social_links']['youtube_url'] = array(
    '#type'          => 'textfield',
    '#title'         => t('Youtube URL'),
    '#default_value' => theme_get_setting('youtube_url'),
    '#states'        => array(
      // Hide the options when the cancel notify checkbox is disabled.
      'visible' => array(
        ':input[name="youtube"]' => array(
          'checked' => TRUE
        ),
      ),
    ),
  );
  $form['options']['social_links']['youtube_tooltip'] = array(
    '#type'          => 'textfield',
    '#title'         => t('Tekst ved mouse-over'),
    '#default_value' => theme_get_setting('youtube_tooltip'),
    '#states'        => array(
      // Hide the options when the cancel notify checkbox is disabled.
      'visible' => array(
        ':input[name="youtube"]' => array(
          'checked' => TRUE
        ),
      ),
    ),
  );

    /*
  |--------------------------------------------------------------------------
  | Langua links
  |--------------------------------------------------------------------------
  |
  | Sets all necessary options to save data.
  |
  */

  // Fieldset
  $form['options']['languages'] = array(
    '#type'  => 'fieldset',
    '#title' => t('Languages'),
  );

  // Tysk
  $form['options']['languages']['lang_german'] = array(
    '#type'          => 'checkbox',
    '#title'         => t('Tysk'),
    '#default_value' => theme_get_setting('lang_german'),
  );
  
  $form['options']['languages']['lang_german_url'] = array(
    '#type'          => 'textfield',
    '#title'         => t('Tysk URL'),
    '#default_value' => theme_get_setting('lang_german_url'),
    '#states'        => array(
      // Hide the options when the cancel notify checkbox is disabled.
      'visible' => array(
        ':input[name="lang_german"]' => array(
          'checked' => TRUE
        ),
      ),
    ),
  );
  
  $form['options']['languages']['lang_german_tooltip'] = array(
    '#type'          => 'textfield',
    '#title'         => t('Tekst ved mouse-over'),
    '#default_value' => theme_get_setting('lang_german_tooltip'),
    '#states'        => array(
      // Hide the options when the cancel notify checkbox is disabled.
      'visible' => array(
        ':input[name="lang_german"]' => array(
          'checked' => TRUE
        ),
      ),
    ),
  );

  // Dansk
  $form['options']['languages']['lang_danish'] = array(
    '#type'          => 'checkbox',
    '#title'         => t('Dansk'),
    '#default_value' => theme_get_setting('lang_danish'),
  );
  
  $form['options']['languages']['lang_danish_url'] = array(
    '#type'          => 'textfield',
    '#title'         => t('Dansk URL'),
    '#default_value' => theme_get_setting('lang_danish_url'),
    '#states'        => array(
      // Hide the options when the cancel notify checkbox is disabled.
      'visible' => array(
        ':input[name="lang_danish"]' => array(
          'checked' => TRUE
        ),
      ),
    ),
  );
  
  $form['options']['languages']['lang_danish_tooltip'] = array(
    '#type'          => 'textfield',
    '#title'         => t('Tekst ved mouse-over'),
    '#default_value' => theme_get_setting('lang_danish_tooltip'),
    '#states'        => array(
      // Hide the options when the cancel notify checkbox is disabled.
      'visible' => array(
        ':input[name="lang_danish"]' => array(
          'checked' => TRUE
        ),
      ),
    ),
  );


  // Engelsk
  $form['options']['languages']['lang_english'] = array(
    '#type'          => 'checkbox',
    '#title'         => t('Engelsk'),
    '#default_value' => theme_get_setting('lang_english'),
  );
  
  $form['options']['languages']['lang_english_url'] = array(
    '#type'          => 'textfield',
    '#title'         => t('Engelsk URL'),
    '#default_value' => theme_get_setting('lang_english_url'),
    '#states'        => array(
      // Hide the options when the cancel notify checkbox is disabled.
      'visible' => array(
        ':input[name="lang_english"]' => array(
          'checked' => TRUE
        ),
      ),
    ),
  );
  
  $form['options']['languages']['lang_english_tooltip'] = array(
    '#type'          => 'textfield',
    '#title'         => t('Tekst ved mouse-over'),
    '#default_value' => theme_get_setting('lang_english_tooltip'),
    '#states'        => array(
      // Hide the options when the cancel notify checkbox is disabled.
      'visible' => array(
        ':input[name="lang_english"]' => array(
          'checked' => TRUE
        ),
      ),
    ),
  );

  // Svensk
  $form['options']['languages']['lang_swedish'] = array(
    '#type'          => 'checkbox',
    '#title'         => t('Svensk'),
    '#default_value' => theme_get_setting('lang_swedish'),
  );
  
  $form['options']['languages']['lang_swedish_url'] = array(
    '#type'          => 'textfield',
    '#title'         => t('Svensk URL'),
    '#default_value' => theme_get_setting('lang_swedish_url'),
    '#states'        => array(
      // Hide the options when the cancel notify checkbox is disabled.
      'visible' => array(
        ':input[name="lang_swedish"]' => array(
          'checked' => TRUE
        ),
      ),
    ),
  );
  
  $form['options']['languages']['lang_swedish_tooltip'] = array(
    '#type'          => 'textfield',
    '#title'         => t('Tekst ved mouse-over'),
    '#default_value' => theme_get_setting('lang_swedish_tooltip'),
    '#states'        => array(
      // Hide the options when the cancel notify checkbox is disabled.
      'visible' => array(
        ':input[name="lang_swedish"]' => array(
          'checked' => TRUE
        ),
      ),
    ),
  );
  
  
    // Norsk
  $form['options']['languages']['lang_norwegian'] = array(
    '#type'          => 'checkbox',
    '#title'         => t('Norsk'),
    '#default_value' => theme_get_setting('lang_norwegian'),
  );
  
  $form['options']['languages']['lang_norwegian_url'] = array(
    '#type'          => 'textfield',
    '#title'         => t('Norsk URL'),
    '#default_value' => theme_get_setting('lang_norwegian_url'),
    '#states'        => array(
      // Hide the options when the cancel notify checkbox is disabled.
      'visible' => array(
        ':input[name="lang_norwegian"]' => array(
          'checked' => TRUE
        ),
      ),
    ),
  );
  
  $form['options']['languages']['lang_norwegian_tooltip'] = array(
    '#type'          => 'textfield',
    '#title'         => t('Tekst ved mouse-over'),
    '#default_value' => theme_get_setting('lang_norwegian_tooltip'),
    '#states'        => array(
      // Hide the options when the cancel notify checkbox is disabled.
      'visible' => array(
        ':input[name="lang_norwegian"]' => array(
          'checked' => TRUE
        ),
      ),
    ),
  );
  
  // Arabisk
  $form['options']['languages']['lang_arabic'] = array(
    '#type'          => 'checkbox',
    '#title'         => t('Arabisk'),
    '#default_value' => theme_get_setting('lang_arabic'),
  );
  
  $form['options']['languages']['lang_arabic_url'] = array(
    '#type'          => 'textfield',
    '#title'         => t('Arabisk URL'),
    '#default_value' => theme_get_setting('lang_arabic_url'),
    '#states'        => array(
      // Hide the options when the cancel notify checkbox is disabled.
      'visible' => array(
        ':input[name="lang_arabic"]' => array(
          'checked' => TRUE
        ),
      ),
    ),
  );
  
  $form['options']['languages']['lang_arabic_tooltip'] = array(
    '#type'          => 'textfield',
    '#title'         => t('Tekst ved mouse-over'),
    '#default_value' => theme_get_setting('lang_arabic_tooltip'),
    '#states'        => array(
      // Hide the options when the cancel notify checkbox is disabled.
      'visible' => array(
        ':input[name="lang_arabic"]' => array(
          'checked' => TRUE
        ),
      ),
    ),
  );

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
  
  // Languages
  $settings['languages']['lang_danish']['active'] = theme_get_setting('lang_danish');
  $settings['languages']['lang_danish']['url'] = theme_get_setting('lang_danish_url');
  $settings['languages']['lang_danish']['tooltip'] = t(theme_get_setting('lang_danish_tooltip'));
  $settings['languages']['lang_german']['active'] = theme_get_setting('lang_german');
  $settings['languages']['lang_german']['url'] = theme_get_setting('lang_german_url');
  $settings['languages']['lang_german']['tooltip'] = t(theme_get_setting('lang_german_tooltip'));
  $settings['languages']['lang_english']['active'] = theme_get_setting('lang_english');
  $settings['languages']['lang_english']['url'] = theme_get_setting('lang_english_url');
  $settings['languages']['lang_english']['tooltip'] = t(theme_get_setting('lang_english_tooltip'));
  $settings['languages']['lang_swedish']['active'] = theme_get_setting('lang_swedish');
  $settings['languages']['lang_swedish']['url'] = theme_get_setting('lang_swedish_url');
  $settings['languages']['lang_swedish']['tooltip'] = t(theme_get_setting('lang_swedish_tooltip'));
  $settings['languages']['lang_norwegian']['active'] = theme_get_setting('lang_norwegian');
  $settings['languages']['lang_norwegian']['url'] = theme_get_setting('lang_norwegian_url');
  $settings['languages']['lang_norwegian']['tooltip'] = t(theme_get_setting('lang_norwegian_tooltip'));
  $settings['languages']['lang_arabic']['active'] = theme_get_setting('lang_arabic');
  $settings['languages']['lang_arabic']['url'] = theme_get_setting('lang_arabic_url');
  $settings['languages']['lang_arabic']['tooltip'] = t(theme_get_setting('lang_arabic_tooltip'));
  
  // Layout
  $settings['layout']['copyright'] = ($settings['contact_information']['business_startup_year'] < date('Y') AND $settings['contact_information']['business_startup_year'] !== NULL) ? $settings['contact_information']['business_startup_year'] . '-' . date('Y') : date('Y');
  $settings['layout']['footer']['show_social_links'] = theme_get_setting('footer_show_social_links');
  $settings['layout']['sidebar']['show_social_links'] = theme_get_setting('sidebar_show_social_links');

  return $settings;
}

/**
 * Capture theme settings submissions and update uploaded image
 */
/* Disabled
	
	function bellcom_settings_submit($form, &$form_state) {
  // Check for a new uploaded file, and use that if available.
  if ($file = file_save_upload('sublogo_upload')) {
    $parts = pathinfo($file->filename);
    $filename = (! empty($key)) ? str_replace('/', '_', $key) .'_sublogo.'. $parts['extension'] : 'sublogo.'. $parts['extension'];

    // The image was saved using file_save_upload() and was added to the
    // files table as a temporary file. We'll make a copy and let the garbage
    // collector delete the original upload.
    if (file_copy($file, $filename)) {
      $_POST['sublogo']['use_sublogo'] = $form_state['values']['sublogo']['use_sublogo'] = TRUE;
      $_POST['sublogo']['sublogo_path'] = $form_state['values']['sublogo']['sublogo_path'] = $file->filepath;
    }
  }
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
