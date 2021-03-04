<?php

/**
 * @file
 * syddjurs_eu_cookie_compliance.strongarm.inc
 */

/**
 * Implements hook_strongarm().
 */
function syddjurs_eu_cookie_compliance_strongarm() {
  $export = array();

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'eu_cookie_compliance';
  $strongarm->value = array(
    'consent_storage_method' => 'basic',
    'save_preferences_button_label' => 'Gem indstillinger',
    'accept_all_categories_button_label' => 'Accepter alle',
    'only_required_button_label' => 'Kun nødvendige',
    'popup_disagree_button_message' => 'Jeg ønsker at vide mere om cookiepolitikken',
    'withdraw_tab_button_label' => 'Indstillinger for privatliv',
    'method' => 'categories',
    'automatic_cookies_removal' => 1,
    'withdraw_enabled' => 1,
    'withdraw_button_on_info_popup' => 1,
    'popup_link' => 'https://www.syddjurs.dk/om-kommunen/om-hjemmesiden',
    'popup_position' => 'popup',
    'popup_width' => '700',
    'reload_page' => 1,
    'popup_info' => array(
      'value' => '<h2>Du bestemmer over dine data</h2>
<p>Vi og vores samarbejdspartnere bruger cookies, til at indsamle oplysninger om
 dig til at understøtte forskellige funktioner på hjemmesiden, herunder:</p>
<ol dir="ltr">
  <li>Funktionalitet</li>
  <li>Markedsføring</li>
  <li>Statistik</li>
</ol>
<p>Ved at trykke på "Accepter alle" giver du samtykke til alle de formål i
 ovenstående liste. Du kan også vælge at specificere hvilke typer cookies du vil
  give samtykke til, ved at benytte markeringsfelterne ud for formålet og
   efterfølgende trykke på "Gem indstillinger".</p>
<p>Du kan altid trække dit samtykke tilbage ved at trykke på "Indstillinger for
privatliv".<br />
Du kan desuden læse mere om vores brug af cookies og andre teknologier, samt 
læse vores erklæring om indsamling og behandling af personoplysninger ved at 
klikke på linket herunder.</p>',
      'format' => 'full_html',
    ),
    'popup_enabled' => 1,
    'info_template' => 'new',
    'enable_save_preferences_button' => 1,
    'select_all_categories_by_default' => 0,
    'disabled_javascripts' => '',
    'popup_clicking_confirmation' => FALSE,
    'use_mobile_message' => 0,
    'mobile_popup_info' => array(
      'value' => '<h2>We use cookies on this site to enhance your user experience</h2><p>By tapping the Accept button, you agree to us doing so.</p>',
      'format' => 'plain_text',
    ),
    'mobile_breakpoint' => '768',
    'popup_agree_button_message' => 'Ja, jeg accepterer',
    'show_disagree_button' => TRUE,
    'disagree_button_label' => 'Nej tak',
    'withdraw_message' => array(
      'value' => '<h2>Vi bruger cookies.</h2>

<p>Nogle sikrer at sitet virker, andre samler statistik ind til forbedring af din brugeroplevelse.</p>

<p>Du har allerede givet dit samtykke.</p>
',
      'format' => 'full_html',
    ),
    'withdraw_action_button_label' => 'Træk samtykke tilbage',
    'popup_agreed_enabled' => 0,
    'popup_hide_agreed' => 0,
    'popup_agreed' => array(
      'value' => '<h2>Thank you for accepting cookies</h2><p>You can now hide this message or find out more about cookies.</p>',
      'format' => 'plain_text',
    ),
    'popup_find_more_button_message' => 'Mere information',
    'popup_hide_button_message' => 'Skjul',
    'popup_link_new_window' => 1,
    'use_bare_css' => 1,
    'popup_text_hex' => '',
    'popup_bg_hex' => '',
    'popup_height' => '',
    'fixed_top_position' => 0,
    'popup_delay' => '1000',
    'disagree_do_not_show_popup' => 0,
    'popup_scrolling_confirmation' => FALSE,
    'cookie_name' => '',
    'domains_option' => '1',
    'domains_list' => '',
    'exclude_paths' => '',
    'exclude_admin_pages' => 1,
    'exclude_uid_1' => 0,
    'script_scope' => 'footer',
    'better_support_for_screen_readers' => 0,
    'cookie_session' => 0,
    'allowed_cookies' => '',
    'containing_element' => 'body',
    'cookie_policy_version' => '1.0.0',
  );
  $export['eu_cookie_compliance'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'eu_cookie_compliance_cookie_lifetime';
  $strongarm->value = '100';
  $export['eu_cookie_compliance_cookie_lifetime'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'eu_cookie_compliance_domain';
  $strongarm->value = '';
  $export['eu_cookie_compliance_domain'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'eu_cookie_compliance_domain_all_sites';
  $strongarm->value = 0;
  $export['eu_cookie_compliance_domain_all_sites'] = $strongarm;

  return $export;
}
