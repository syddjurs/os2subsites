<?php

/**
 * @file
 * Template file for consent banner.
 *
 * When overriding this template it is important to note that jQuery will use
 * the following classes to assign actions to buttons:
 *
 * agree-button      - agree to setting cookies
 * find-more-button  - link to an information page
 *
 * Variables available:
 * - $message:  Contains the text that will be display within the pop-up
 * - $agree_button: Label for the primary/agree button. Note that this is the
 *   primary button. For backwards compatibility, the name remains agree_button.
 * - $disagree_button: Contains Cookie policy button title. (Note: for
 *   historical reasons, this label is called "disagree" even though it just
 *   displays the privacy policy.)
 * - $secondary_button_label: Contains the action button label. The current
 *   action depends on whether you're running the module in Opt-out or Opt-in
 *   mode.
 * - $primary_button_class: Contains class names for the primary button.
 * - $secondary_button_class: Contains class names for the secondary button
 *   (if visible).
 * - $cookie_categories: Contains a array with cookie categories that can be
 *   agreed or disagreed to separately.
 * - $save_preferences_button_label: Label text for a button to save the consent
 *   preferences.
 *   consent category cannot be unchecked.
 * - $privacy_settings_tab_label: Label text for the Privacy settings tab.
 * - $withdraw_button_on_info_popup: Show the withdraw button on this popup.
 * - $method: Chosen consent method.
 */
?>
<?php if ($privacy_settings_tab_label) : ?>
  <button type="button" class="eu-cookie-withdraw-tab"><?php print $privacy_settings_tab_label; ?></button>
<?php endif ?>
<?php $classes = array(
  'eu-cookie-compliance-banner',
  'eu-cookie-compliance-banner-info',
  'eu-cookie-compliance-banner--' . str_replace('_', '-', $method),
); ?>

<div id="popupOverlay" role="banner" aria-hidden="false">
  <div role="dialog" aria-modal="true" id="popup-banner-wrapper" class="popup-banner__wrapper" aria-describedby="popupBannerHeadline" aria-labelledby="popup-banner-wrapper_label" dir="ltr" aria-hidden="false" lang="DA">
    <div id="popupPage-1" class="popup-banner__page">
      <div class="popup-banner__summary">
        <div class="popup-banner__header">
          <img src="<?php print $branding_logo; ?>" alt="" />
          <h2 class="popup-banner__branding"><?php print $branding_header; ?></h2>
        </div>
        <div class="popup-banner__text">
          <div class="popup-banner__maintext" id="popup-banner-wrapper_label">
            <?php print $message ?>
            <?php if ($disagree_button) : ?>
              <button type="button" class="find-more-button eu-cookie-compliance-more-button "><?php print $disagree_button; ?></button>
            <?php endif; ?>
          </div>
        </div>
      </div>
      <div class="popup-banner__page-footer" role="navigation" aria-label="menu">
        <div class="popup-button-group">
          <?php if ($only_required_button_label) : ?>
              <button type="button" class="eu-cookie-compliance-only-required-button eucc-button eucc-button__decline"><?php print $only_required_button_label; ?></button>
          <?php endif; ?>
          <?php if ($save_preferences_button_label) : ?>
              <button type="button" class="eu-cookie-compliance-save-preferences-button eucc-button eucc-button__decline"><?php print $save_preferences_button_label; ?></button>
          <?php endif; ?>
          <button tabindex="0" type="button" class="<?php print $primary_button_class; ?> eucc-button eucc-button__accept"  aria-label="<?php print $agree_button; ?>" ><?php print $agree_button; ?></button>
        </div>
        <?php if ($cookie_categories) : ?>
          <div class="popup-toggle-group popup-toggle-group__details">
            <button tabindex="0" aria-label="Vis detaljer">Vis detaljer</button>
            <button tabindex="0" class="hidden" aria-label="Skjul detaljer">Skjul detaljer</button>
          </div>
        <?php endif; ?>
      </div>
      <?php if ($cookie_categories) : ?>
        <div class="popup-consent-banner__categories-wrapper" id="popupConsentBannerCategoriesWrapper" style="display: none;" aria-hidden="true">
          <?php foreach ($cookie_categories as $key => $category) { ?>
            <div class="popup-consent-banner__category-container">
              <div class="popup-consent-banner__name-container">
                <label for="popup-consent-banner__category-expander-cookie_cat_necessary" class="popup-consent-banner__category-name popup-consent-banner__category-name--slider">
                  <span><?php print check_plain($category['label']); ?></span>
                  <?php if (isset($category['description'])) : ?>
                    <div class="popup-consent-banner__category-description"><?php print check_plain($category['description']) ?></div>
                  <?php endif; ?>
                </label>
              </div>
            </div>
          <?php } //end for ?>
        </div>
        <div class="popup-banner-consent-group" id="eu-cookie-compliance-categories">
          <?php foreach ($cookie_categories as $key => $category) { ?>
            <div class="popup-banner-consent-field">
              <div class="consent-feld-name"><?php print check_plain($category['label']); ?></div>
              <div class="popup-consent-banner__switch-container" id="switch-cookie_cat_necessary">
                <div class="popup-checkboxes">
                  <input class="popup__checkbox" data-index="0" aria-label="<?php print check_plain($category['label']); ?>"  name="cookie-categories" id="cookie-category-<?php print drupal_html_class($key); ?>" type="checkbox" value="<?php print $key; ?>"
                    <?php if (in_array($category['checkbox_default_state'], array('checked', 'required'))) : ?>checked<?php endif; ?>
                    <?php if ($category['checkbox_default_state'] === 'required') : ?>disabled<?php endif; ?> >
                  <div class="checkbox-toggle" aria-label="toggle-for-<?php print check_plain($category['label']); ?>" ></div>
                </div>
              </div>
            </div>
          <?php } //end for ?>
        </div>
      <?php endif; ?>
    </div>
  </div>
</div>
