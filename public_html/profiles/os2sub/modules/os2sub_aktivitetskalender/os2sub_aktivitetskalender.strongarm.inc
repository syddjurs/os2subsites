<?php
/**
 * @file
 * os2sub_aktivitetskalender.strongarm.inc
 */

/**
 * Implements hook_strongarm().
 */
function os2sub_aktivitetskalender_strongarm() {
  $export = array();

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_event_calendar';
  $strongarm->value = 1;
  $export['comment_event_calendar'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'field_bundle_settings_node__event_calendar';
  $strongarm->value = array(
    'view_modes' => array(
      'teaser' => array(
        'custom_settings' => TRUE,
      ),
      'spotbox' => array(
        'custom_settings' => TRUE,
      ),
      'full' => array(
        'custom_settings' => FALSE,
      ),
      'rss' => array(
        'custom_settings' => FALSE,
      ),
      'diff_standard' => array(
        'custom_settings' => FALSE,
      ),
      'token' => array(
        'custom_settings' => FALSE,
      ),
      'search_index' => array(
        'custom_settings' => FALSE,
      ),
      'search_result' => array(
        'custom_settings' => FALSE,
      ),
    ),
    'extra_fields' => array(
      'form' => array(
        'metatags' => array(
          'weight' => '6',
        ),
        'title' => array(
          'weight' => '0',
        ),
        'path' => array(
          'weight' => '7',
        ),
      ),
      'display' => array(
        'registration_link' => array(
          'default' => array(
            'weight' => '3',
            'visible' => TRUE,
          ),
        ),
        'registration_form' => array(
          'default' => array(
            'weight' => '4',
            'visible' => TRUE,
          ),
        ),
        'registration_slots_left' => array(
          'default' => array(
            'weight' => '17',
            'visible' => FALSE,
          ),
        ),
        'registration_unregistrable_reason' => array(
          'default' => array(
            'weight' => '16',
            'visible' => FALSE,
          ),
        ),
        'language' => array(
          'default' => array(
            'weight' => '0',
            'visible' => FALSE,
          ),
        ),
      ),
    ),
  );
  $export['field_bundle_settings_node__event_calendar'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'language_content_type_event_calendar';
  $strongarm->value = '0';
  $export['language_content_type_event_calendar'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'menu_options_event_calendar';
  $strongarm->value = array();
  $export['menu_options_event_calendar'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'menu_parent_event_calendar';
  $strongarm->value = 'menu-indholdsmenu:0';
  $export['menu_parent_event_calendar'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'node_options_event_calendar';
  $strongarm->value = array(
    0 => 'status',
  );
  $export['node_options_event_calendar'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'node_preview_event_calendar';
  $strongarm->value = '0';
  $export['node_preview_event_calendar'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'node_registration_type_settings_event_calendar';
  $strongarm->value = array(
    'date_field' => 'event_calendar_date',
    'max_registration_date_field' => 'field_svarfrist',
    'min_registration_date_field' => 'field_synlig_fra',
    'capacity_field' => 'field_pladser',
    'status' => 2,
    'toggle_enabled_in_node_form' => 1,
    'no_register_page' => 1,
    'allow_registration_until' => '1 day',
    'registration_success_message' => 'Tak for tilmeldingen',
    'allow_cancellation_until' => '1 day',
    'allow_exceeding_capacity' => 1,
    'max_slots_per_registration_authenticated' => 100,
    'max_slots_per_registration_anonymous' => 100,
    'allow_email_change' => 0,
    'require_email_verification' => FALSE,
    'sender_name' => '',
    'sender_mail' => '[node-registration:author:mail]',
    'mail_system' => '1',
    'send_mail_to_registree' => 1,
    'mail_to_registree_bcc' => '',
    'mail_to_registree_subject' => 'Du er tilmeldt til: [node:title]',
    'mail_to_registree_body' => '<p>Der er registreret følgende i forbindelse med tilmeldingen:</p>
<p>E-mail adresse: [node-registration:email]</p>
<p>For at ændre tilmeldingen gå til: [node-registration:edit-url]. <br />
For at afmelde tilmeldingen gå til: [node-registration:cancel-url].</p>',
    'change_mail_for_waiting_list_registree' => 0,
    'mail_for_waiting_list_registree_subject' => 'You\'ve registered for: [node:title] (BUT YOU\'RE ON THE WAITING LIST)',
    'mail_for_waiting_list_registree_body' => 'This is what you\'ve registered with:

E-mail address: [node-registration:email]

BUT YOU\'RE ON THE WAITING LIST.

To edit, go to [node-registration:edit-url].',
    'send_mail_to_admin' => 1,
    'mail_to_admin_recipients' => '[node-registration:author:mail]',
    'mail_to_admin_subject' => 'Der er tilmeldinger til: [node:title]',
    'mail_to_admin_body' => '<p>Der er tilmeldt en person med følgende data:</p>
<ul>
<li>E-mail adresse: [node-registration:email]</li>
</ul>
<p>Se alle registreringer her: [node-registration:url].</p>',
    'send_reminder_mail_to_registrees' => 0,
    'send_reminders_before' => '1 day',
    'reminder_mail_to_registrees_subject' => '[node:title] begins in [node:time-left]',
    'reminder_mail_to_registrees_body' => 'Hey [node-registration:email],

this [node:content-type:name] starts in [node:time-left].

Don\'t forget to go! It begins at [node:event-start].',
    'send_cancel_mail_to_registree' => 0,
    'cancel_mail_to_registree_bcc' => '',
    'cancel_mail_to_registree_subject' => 'You\'ve cancelled for: [node:title]',
    'cancel_mail_to_registree_body' => 'This is what you were registered with:

E-mail address: [node-registration:email]

But now it\'s gone...',
    'send_cancel_mail_to_admin' => 1,
    'cancel_mail_to_admin_recipients' => '[node-registration:author:mail]',
    'cancel_mail_to_admin_subject' => 'Der er en der har meldt afbud til: [node:title]',
    'cancel_mail_to_admin_body' => 'Vedkommende havde ID [node-registration:registration-id] men tilmeldingen er adfeldt.',
    'send_unwaitinglist_mail_to_registree' => 0,
    'unwaitinglist_mail_to_registree_subject' => 'You\'ve been moved from the waiting list to the regular list',
    'unwaitinglist_mail_to_registree_body' => 'Hi [node-registration:email],

due to a cancellation you\'ve been moved from the waiting list to the regular list.

Event name: [node:title].
Event start: [node:event-start].',
    'show_message_access' => 1,
    'show_message_date' => 1,
    'show_message_capacity' => 0,
    'show_message_registered' => 1,
  );
  $export['node_registration_type_settings_event_calendar'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'node_submitted_event_calendar';
  $strongarm->value = 0;
  $export['node_submitted_event_calendar'] = $strongarm;

  return $export;
}
