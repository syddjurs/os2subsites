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
      </div>
      <?php if ($cookie_categories) : ?>
        <div class="consent-wrapper">
          <div class="popup-toggle-group popup-toggle-group__details">
            <button tabindex="0" aria-label="Vis detailer" class="button-arrow button-arrow__after button-arrow__down">Vis detailer</button>
            <button tabindex="0" aria-label="Skjul detailer" class="hidden button-arrow button-arrow__after button-arrow__top">Skjul detailer</button>
          </div>
          <div class="popup-banner-consent-group" id="eu-cookie-compliance-categories">
            <?php foreach ($cookie_categories as $key => $category) { ?>
              <div class="popup-banner-consent-field">
                <input type="checkbox" name="cookie-categories" id="cookie-category-<?php print drupal_html_class($key); ?>"
                       value="<?php print $key; ?>"
                       <?php if (in_array($category['checkbox_default_state'], array('checked', 'required'))) : ?>checked<?php endif; ?>
                       <?php if ($category['checkbox_default_state'] === 'required') : ?>disabled<?php endif; ?> >
                <label for="cookie-category-<?php print drupal_html_class($key); ?>"><?php print check_plain($category['label']); ?></label>
              </div>
            <?php } //end for ?>
          </div>
        </div>

        <div class="popup-consent-banner__categories-wrapper" id="popupConsentBannerCategoriesWrapper" style="display: none;" aria-hidden="true">
          <?php foreach ($cookie_categories as $key => $category) { ?>
            <div class="popup-consent-banner__category-container">
              <div class="popup-consent-banner__name-container">
                <label for="popup-consent-banner__category-expander-cookie_cat_<?php print check_plain($key) ?>" class="popup-consent-banner__category-name popup-consent-banner__category-name--slider">
                  <span class="button-arrow button-arrow__down button-arrow__before"><?php print check_plain($category['label']); ?></span>
                  <?php if (isset($category['description'])) : ?>
                    <div class="popup-consent-banner__category-description"><?php print check_plain($category['description']) ?></div>
                  <?php endif; ?>
                </label>
              </div>
              <div class="popup-consent-banner__description-container" style="display: none;" id="popup-consent-banner__category-expander-cookie_cat_<?php print check_plain($key) ?>">
                <div class="popup-consent-banner__found-cookies">
                  <?php foreach ($category['cookies'] as $cookie) { ?>
                    <div class="popup-consent-banner__cookie-details">
                      <?php if (isset($cookie['1'])) : ?>
                        <div class="cookie-details__detail-container cookie-details__detail-container-data-processor-name" title="Cookie Information">
                          <span class="cookie-details__detail-title">Service:</span>
                          <span class="cookie-details__detail-content"><?php print check_plain($cookie['1']); ?></span>
                        </div>
                      <?php endif; ?>
                      <?php if (isset($cookie['2'])) : ?>
                        <div class="cookie-details__detail-container cookie-details__detail-container-purpose" title="<?php print check_plain($cookie['2']); ?>">
                          <span class="cookie-details__detail-title">Formål:</span>
                          <span class="cookie-details__detail-content"><?php print check_plain($cookie['2']); ?></span>
                        </div>
                      <?php endif; ?>
                      <?php if (isset($cookie['3'])) : ?>
                        <div class="cookie-details__detail-container cookie-details__detail-container-data-processor-privacy-policy" title="<?php print check_plain($cookie['3']); ?>">
                          <span class="cookie-details__detail-title">Privatlivspolitik:</span>
                          <span class="cookie-details__detail-content"><a target="_blank" href="<?php print check_plain($cookie['3']); ?>"><?php print check_plain($cookie['3']); ?></a></span>
                        </div>
                      <?php endif; ?>
                      <?php if (isset($cookie['4'])) : ?>
                        <div class="cookie-details__detail-container cookie-details__detail-container-expiry" title="<?php print check_plain($cookie['4']); ?>">
                          <span class="cookie-details__detail-title">Udløb:</span>
                          <span class="cookie-details__detail-content"><?php print check_plain($cookie['4']); ?></span>
                        </div>
                      <?php endif; ?>
                      <?php if (isset($cookie['0'])) : ?>
                        <div class="cookie-details__detail-container cookie-details__detail-container-name" title="<?php print check_plain($cookie['0']); ?>">
                          <span class="cookie-details__detail-title">Navn:</span>
                          <span class="cookie-details__detail-content"><?php print check_plain($cookie['0']); ?></span>
                        </div>
                      <?php endif; ?>
                      <?php if (isset($cookie['5'])) : ?>
                        <div class="cookie-details__detail-container cookie-details__detail-container-provider" title="<?php print check_plain($cookie['5']); ?>">
                          <span class="cookie-details__detail-title">Udbyder:</span>
                          <span class="cookie-details__detail-content"><?php print check_plain($cookie['5']); ?></span>
                        </div>
                      <?php endif; ?>
                    </div>
                  <?php } //end for ?>
                </div>
              </div>
            </div>
          <?php } //end for ?>
        </div>
      <?php endif; ?>
    </div>
  </div>
</div>
