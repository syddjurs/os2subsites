(function ($) {
  'use strict';

  var os2webEuCookieComplianceBlockCookies;
  var _euccCurrentStatus;
  var unhandledCookiesUpdateInProgress;

  Drupal.behaviors.os2web_eu_cookie_compliance_popup = {
    attach: function (context, settings) {
      if (typeof Drupal.settings.eu_cookie_compliance === 'undefined') {
        return;
      }

      if (Drupal.settings.eu_cookie_compliance.popup_position != 'popup') {
        return;
      }
      $(document).ready(function () {
        $('#sliding-popup').addClass('sliding-popup-popup');
        var $popupWrapper = $('#popup-banner-wrapper');
        if (!Drupal.settings.eu_cookie_compliance.popup_use_bare_css) {
          $popupWrapper.height(Drupal.settings.eu_cookie_compliance.popup_height)
            .width(Drupal.settings.eu_cookie_compliance.popup_width);
        }

        if (Drupal.eu_cookie_compliance.getCurrentStatus() !== null) {
          closePopup();
        }
        else {
          openPopup();
        }
      });

      $(document).on('click', '.agree-button, .eu-cookie-compliance-save-preferences-button, .decline-button', closePopup);
      $(document).on('click', '.eu-cookie-withdraw-tab', openPopup);
      $(document).on('click', '.popup-toggle-group button', function () {
        $('#popupConsentBannerCategoriesWrapper').slideToggle('hidden');
        $('.popup-toggle-group button').toggleClass('hidden');
      });
      $(document).on('click', '.popup-consent-banner__category-name', function () {
        var $id = '#' + $(this).attr('for');
        $($id).toggle();
      });

      $(document).on('eu_cookie_compliance_popup_open', 'body', function () {
        $('body').removeClass('eu-cookie-compliance-popup-closed');
      });

      if (Drupal.settings.eu_cookie_compliance.method === 'categories') {
        attachOnlyRequiredEvents();
      }

      _euccCurrentStatus = Drupal.eu_cookie_compliance.getCurrentStatus();
      if (settings.eu_cookie_compliance.automatic_cookies_removal &&
        ((settings.eu_cookie_compliance.method === 'opt_in' && (_euccCurrentStatus === null || !Drupal.eu_cookie_compliance.hasAgreed()))
          || (settings.eu_cookie_compliance.method === 'opt_out' && !Drupal.eu_cookie_compliance.hasAgreed() && _euccCurrentStatus !== null)
          || (Drupal.settings.eu_cookie_compliance.method === 'categories'))
      ) {
        os2webEuCookieComplianceBlockCookies = setInterval(updateUnhandledCookies, 2000);
      }
    }
  }

  var acceptRequiredAction = function () {
    var requiredCategories = new Array();

    for (var cat in Drupal.settings.eu_cookie_compliance.cookie_categories_details) {
      if (Drupal.settings.eu_cookie_compliance.cookie_categories_details[cat].checkbox_default_state == 'required') {
        requiredCategories.push(cat);
      }
    }
    var nextStatus = 2;
    Drupal.eu_cookie_compliance.setAcceptedCategories(requiredCategories);
    // Load scripts for all categories. If no categories selected, none
    // will be loaded.
    Drupal.eu_cookie_compliance.loadCategoryScripts(requiredCategories);
    if (!requiredCategories.length) {
      // No categories selected is the same as declining all cookies.
      nextStatus = 0;
    }
    Drupal.eu_cookie_compliance.setStatus(nextStatus);
    closePopup();
  }

  var attachOnlyRequiredEvents = function () {
    $(document).on('click', '.eu-cookie-compliance-only-required-button', acceptRequiredAction);
  };

  var closePopup = function () {
    $('body').removeClass('eu-cookie-compliance-popup-open')
      .addClass('eu-cookie-compliance-popup-closed');
  };

  var openPopup = function () {
    $('body').addClass('eu-cookie-compliance-popup-open')
      .removeClass('eu-cookie-compliance-popup-closed');
  };

  // Checks existing browser cookies and sends info to drupal.
  var updateUnhandledCookies = function () {
    if (unhandledCookiesUpdateInProgress) {
      return;
    }

    // Load all cookies from jQuery.
    var cookies = $.cookie();
    var newCookies = [];
    for (var i in cookies) {
      var handled = Drupal.eu_cookie_compliance.isAllowed(i) || Drupal.settings.os2web_eu_cookie_compliance.unhandled_cookies.indexOf(i) != -1;
      if (!handled) {
        newCookies.push(i);
      }
    }

    if (newCookies.length) {
      unhandledCookiesUpdateInProgress = true;
      $.post('/os2web-eu-cookie-compliance/cookie-list-update', { cookies: newCookies })
        .done(function() {
          unhandledCookiesUpdateInProgress = false;
          for (var i in newCookies) {
            Drupal.settings.os2web_eu_cookie_compliance.unhandled_cookies.push(i);
          }
        });
    }
  }
})(jQuery);

(function() {
  function getCookie(name) {
    var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');

    return v ? v[2] : null;
  }

  function hasAgreed() {
    var cookie = getCookie('cookie-agreed');

    // Cookie doesnt exist.
    if (cookie === null) {
      return false;
    }

    // Cookie exists, but the user didnt agree.
    if (cookie === 0 || cookie === '0' || cookie === '') {
      return false;
    }

    return true;
  }

  function deleteAllCookies() {
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i];
      var eqPos = cookie.indexOf("=");
      var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;

      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
  }

  window.setInterval(function() {
    if (!hasAgreed()) {
      deleteAllCookies();
    }
  }, 5000);
})();
