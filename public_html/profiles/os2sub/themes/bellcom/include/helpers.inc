<?php

/*
 * Search for value in multi-dimensional array
 */
function in_array_recursive($needle, $haystack, $strict = FALSE) {
  foreach ($haystack as $item) {
    if (($strict ? $item === $needle : $item == $needle) || (is_array($item) && in_array_recursive($needle, $item, $strict))) {
      return true;
    }
  }

  return false;
}