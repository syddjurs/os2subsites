<?php

/**
 * @file
 * Definition of os2web_eu_cookie_consent_type_field.
 */

class os2web_eu_cookie_consent_type_field extends views_handler_field {

  /**
   * Render the field.
   *
   * @param array $values
   *   The values retrieved from the database.
   */
  public function render($values) {
    $value = $this->get_value($values);
    $arr = explode(';', $value);
    if (count($arr) > 1) {
      $value = implode(PHP_EOL, $arr);
    }
    return $this->sanitize_value($value);
  }

}
