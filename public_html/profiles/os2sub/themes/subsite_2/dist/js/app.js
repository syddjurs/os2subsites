'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*!
 * Bootstrap v3.3.7 (http://getbootstrap.com)
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under the MIT license
 */

if (typeof jQuery === 'undefined') {
  throw new Error('Bootstrap\'s JavaScript requires jQuery');
}

+function ($) {
  'use strict';

  var version = $.fn.jquery.split(' ')[0].split('.');
  if (version[0] < 2 && version[1] < 9 || version[0] == 1 && version[1] == 9 && version[2] < 1 || version[0] > 3) {
    throw new Error('Bootstrap\'s JavaScript requires jQuery version 1.9.1 or higher, but lower than version 4');
  }
}(jQuery);

/* ========================================================================
 * Bootstrap: transition.js v3.3.7
 * http://getbootstrap.com/javascript/#transitions
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */

+function ($) {
  'use strict';

  // CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
  // ============================================================

  function transitionEnd() {
    var el = document.createElement('bootstrap');

    var transEndEventNames = {
      WebkitTransition: 'webkitTransitionEnd',
      MozTransition: 'transitionend',
      OTransition: 'oTransitionEnd otransitionend',
      transition: 'transitionend'
    };

    for (var name in transEndEventNames) {
      if (el.style[name] !== undefined) {
        return { end: transEndEventNames[name] };
      }
    }

    return false; // explicit for ie8 (  ._.)
  }

  // http://blog.alexmaccaw.com/css-transitions
  $.fn.emulateTransitionEnd = function (duration) {
    var called = false;
    var $el = this;
    $(this).one('bsTransitionEnd', function () {
      called = true;
    });
    var callback = function callback() {
      if (!called) $($el).trigger($.support.transition.end);
    };
    setTimeout(callback, duration);
    return this;
  };

  $(function () {
    $.support.transition = transitionEnd();

    if (!$.support.transition) return;

    $.event.special.bsTransitionEnd = {
      bindType: $.support.transition.end,
      delegateType: $.support.transition.end,
      handle: function handle(e) {
        if ($(e.target).is(this)) return e.handleObj.handler.apply(this, arguments);
      }
    };
  });
}(jQuery);

/* ========================================================================
 * Bootstrap: alert.js v3.3.7
 * http://getbootstrap.com/javascript/#alerts
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */

+function ($) {
  'use strict';

  // ALERT CLASS DEFINITION
  // ======================

  var dismiss = '[data-dismiss="alert"]';
  var Alert = function Alert(el) {
    $(el).on('click', dismiss, this.close);
  };

  Alert.VERSION = '3.3.7';

  Alert.TRANSITION_DURATION = 150;

  Alert.prototype.close = function (e) {
    var $this = $(this);
    var selector = $this.attr('data-target');

    if (!selector) {
      selector = $this.attr('href');
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, ''); // strip for ie7
    }

    var $parent = $(selector === '#' ? [] : selector);

    if (e) e.preventDefault();

    if (!$parent.length) {
      $parent = $this.closest('.alert');
    }

    $parent.trigger(e = $.Event('close.bs.alert'));

    if (e.isDefaultPrevented()) return;

    $parent.removeClass('in');

    function removeElement() {
      // detach from parent, fire event then clean up data
      $parent.detach().trigger('closed.bs.alert').remove();
    }

    $.support.transition && $parent.hasClass('fade') ? $parent.one('bsTransitionEnd', removeElement).emulateTransitionEnd(Alert.TRANSITION_DURATION) : removeElement();
  };

  // ALERT PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this);
      var data = $this.data('bs.alert');

      if (!data) $this.data('bs.alert', data = new Alert(this));
      if (typeof option == 'string') data[option].call($this);
    });
  }

  var old = $.fn.alert;

  $.fn.alert = Plugin;
  $.fn.alert.Constructor = Alert;

  // ALERT NO CONFLICT
  // =================

  $.fn.alert.noConflict = function () {
    $.fn.alert = old;
    return this;
  };

  // ALERT DATA-API
  // ==============

  $(document).on('click.bs.alert.data-api', dismiss, Alert.prototype.close);
}(jQuery);

/* ========================================================================
 * Bootstrap: button.js v3.3.7
 * http://getbootstrap.com/javascript/#buttons
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */

+function ($) {
  'use strict';

  // BUTTON PUBLIC CLASS DEFINITION
  // ==============================

  var Button = function Button(element, options) {
    this.$element = $(element);
    this.options = $.extend({}, Button.DEFAULTS, options);
    this.isLoading = false;
  };

  Button.VERSION = '3.3.7';

  Button.DEFAULTS = {
    loadingText: 'loading...'
  };

  Button.prototype.setState = function (state) {
    var d = 'disabled';
    var $el = this.$element;
    var val = $el.is('input') ? 'val' : 'html';
    var data = $el.data();

    state += 'Text';

    if (data.resetText == null) $el.data('resetText', $el[val]());

    // push to event loop to allow forms to submit
    setTimeout($.proxy(function () {
      $el[val](data[state] == null ? this.options[state] : data[state]);

      if (state == 'loadingText') {
        this.isLoading = true;
        $el.addClass(d).attr(d, d).prop(d, true);
      } else if (this.isLoading) {
        this.isLoading = false;
        $el.removeClass(d).removeAttr(d).prop(d, false);
      }
    }, this), 0);
  };

  Button.prototype.toggle = function () {
    var changed = true;
    var $parent = this.$element.closest('[data-toggle="buttons"]');

    if ($parent.length) {
      var $input = this.$element.find('input');
      if ($input.prop('type') == 'radio') {
        if ($input.prop('checked')) changed = false;
        $parent.find('.active').removeClass('active');
        this.$element.addClass('active');
      } else if ($input.prop('type') == 'checkbox') {
        if ($input.prop('checked') !== this.$element.hasClass('active')) changed = false;
        this.$element.toggleClass('active');
      }
      $input.prop('checked', this.$element.hasClass('active'));
      if (changed) $input.trigger('change');
    } else {
      this.$element.attr('aria-pressed', !this.$element.hasClass('active'));
      this.$element.toggleClass('active');
    }
  };

  // BUTTON PLUGIN DEFINITION
  // ========================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this);
      var data = $this.data('bs.button');
      var options = (typeof option === 'undefined' ? 'undefined' : _typeof(option)) == 'object' && option;

      if (!data) $this.data('bs.button', data = new Button(this, options));

      if (option == 'toggle') data.toggle();else if (option) data.setState(option);
    });
  }

  var old = $.fn.button;

  $.fn.button = Plugin;
  $.fn.button.Constructor = Button;

  // BUTTON NO CONFLICT
  // ==================

  $.fn.button.noConflict = function () {
    $.fn.button = old;
    return this;
  };

  // BUTTON DATA-API
  // ===============

  $(document).on('click.bs.button.data-api', '[data-toggle^="button"]', function (e) {
    var $btn = $(e.target).closest('.btn');
    Plugin.call($btn, 'toggle');
    if (!$(e.target).is('input[type="radio"], input[type="checkbox"]')) {
      // Prevent double click on radios, and the double selections (so cancellation) on checkboxes
      e.preventDefault();
      // The target component still receive the focus
      if ($btn.is('input,button')) $btn.trigger('focus');else $btn.find('input:visible,button:visible').first().trigger('focus');
    }
  }).on('focus.bs.button.data-api blur.bs.button.data-api', '[data-toggle^="button"]', function (e) {
    $(e.target).closest('.btn').toggleClass('focus', /^focus(in)?$/.test(e.type));
  });
}(jQuery);

/* ========================================================================
 * Bootstrap: carousel.js v3.3.7
 * http://getbootstrap.com/javascript/#carousel
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */

+function ($) {
  'use strict';

  // CAROUSEL CLASS DEFINITION
  // =========================

  var Carousel = function Carousel(element, options) {
    this.$element = $(element);
    this.$indicators = this.$element.find('.carousel-indicators');
    this.options = options;
    this.paused = null;
    this.sliding = null;
    this.interval = null;
    this.$active = null;
    this.$items = null;

    this.options.keyboard && this.$element.on('keydown.bs.carousel', $.proxy(this.keydown, this));

    this.options.pause == 'hover' && !('ontouchstart' in document.documentElement) && this.$element.on('mouseenter.bs.carousel', $.proxy(this.pause, this)).on('mouseleave.bs.carousel', $.proxy(this.cycle, this));
  };

  Carousel.VERSION = '3.3.7';

  Carousel.TRANSITION_DURATION = 600;

  Carousel.DEFAULTS = {
    interval: 5000,
    pause: 'hover',
    wrap: true,
    keyboard: true
  };

  Carousel.prototype.keydown = function (e) {
    if (/input|textarea/i.test(e.target.tagName)) return;
    switch (e.which) {
      case 37:
        this.prev();break;
      case 39:
        this.next();break;
      default:
        return;
    }

    e.preventDefault();
  };

  Carousel.prototype.cycle = function (e) {
    e || (this.paused = false);

    this.interval && clearInterval(this.interval);

    this.options.interval && !this.paused && (this.interval = setInterval($.proxy(this.next, this), this.options.interval));

    return this;
  };

  Carousel.prototype.getItemIndex = function (item) {
    this.$items = item.parent().children('.item');
    return this.$items.index(item || this.$active);
  };

  Carousel.prototype.getItemForDirection = function (direction, active) {
    var activeIndex = this.getItemIndex(active);
    var willWrap = direction == 'prev' && activeIndex === 0 || direction == 'next' && activeIndex == this.$items.length - 1;
    if (willWrap && !this.options.wrap) return active;
    var delta = direction == 'prev' ? -1 : 1;
    var itemIndex = (activeIndex + delta) % this.$items.length;
    return this.$items.eq(itemIndex);
  };

  Carousel.prototype.to = function (pos) {
    var that = this;
    var activeIndex = this.getItemIndex(this.$active = this.$element.find('.item.active'));

    if (pos > this.$items.length - 1 || pos < 0) return;

    if (this.sliding) return this.$element.one('slid.bs.carousel', function () {
      that.to(pos);
    }); // yes, "slid"
    if (activeIndex == pos) return this.pause().cycle();

    return this.slide(pos > activeIndex ? 'next' : 'prev', this.$items.eq(pos));
  };

  Carousel.prototype.pause = function (e) {
    e || (this.paused = true);

    if (this.$element.find('.next, .prev').length && $.support.transition) {
      this.$element.trigger($.support.transition.end);
      this.cycle(true);
    }

    this.interval = clearInterval(this.interval);

    return this;
  };

  Carousel.prototype.next = function () {
    if (this.sliding) return;
    return this.slide('next');
  };

  Carousel.prototype.prev = function () {
    if (this.sliding) return;
    return this.slide('prev');
  };

  Carousel.prototype.slide = function (type, next) {
    var $active = this.$element.find('.item.active');
    var $next = next || this.getItemForDirection(type, $active);
    var isCycling = this.interval;
    var direction = type == 'next' ? 'left' : 'right';
    var that = this;

    if ($next.hasClass('active')) return this.sliding = false;

    var relatedTarget = $next[0];
    var slideEvent = $.Event('slide.bs.carousel', {
      relatedTarget: relatedTarget,
      direction: direction
    });
    this.$element.trigger(slideEvent);
    if (slideEvent.isDefaultPrevented()) return;

    this.sliding = true;

    isCycling && this.pause();

    if (this.$indicators.length) {
      this.$indicators.find('.active').removeClass('active');
      var $nextIndicator = $(this.$indicators.children()[this.getItemIndex($next)]);
      $nextIndicator && $nextIndicator.addClass('active');
    }

    var slidEvent = $.Event('slid.bs.carousel', { relatedTarget: relatedTarget, direction: direction }); // yes, "slid"
    if ($.support.transition && this.$element.hasClass('slide')) {
      $next.addClass(type);
      $next[0].offsetWidth; // force reflow
      $active.addClass(direction);
      $next.addClass(direction);
      $active.one('bsTransitionEnd', function () {
        $next.removeClass([type, direction].join(' ')).addClass('active');
        $active.removeClass(['active', direction].join(' '));
        that.sliding = false;
        setTimeout(function () {
          that.$element.trigger(slidEvent);
        }, 0);
      }).emulateTransitionEnd(Carousel.TRANSITION_DURATION);
    } else {
      $active.removeClass('active');
      $next.addClass('active');
      this.sliding = false;
      this.$element.trigger(slidEvent);
    }

    isCycling && this.cycle();

    return this;
  };

  // CAROUSEL PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this);
      var data = $this.data('bs.carousel');
      var options = $.extend({}, Carousel.DEFAULTS, $this.data(), (typeof option === 'undefined' ? 'undefined' : _typeof(option)) == 'object' && option);
      var action = typeof option == 'string' ? option : options.slide;

      if (!data) $this.data('bs.carousel', data = new Carousel(this, options));
      if (typeof option == 'number') data.to(option);else if (action) data[action]();else if (options.interval) data.pause().cycle();
    });
  }

  var old = $.fn.carousel;

  $.fn.carousel = Plugin;
  $.fn.carousel.Constructor = Carousel;

  // CAROUSEL NO CONFLICT
  // ====================

  $.fn.carousel.noConflict = function () {
    $.fn.carousel = old;
    return this;
  };

  // CAROUSEL DATA-API
  // =================

  var clickHandler = function clickHandler(e) {
    var href;
    var $this = $(this);
    var $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')); // strip for ie7
    if (!$target.hasClass('carousel')) return;
    var options = $.extend({}, $target.data(), $this.data());
    var slideIndex = $this.attr('data-slide-to');
    if (slideIndex) options.interval = false;

    Plugin.call($target, options);

    if (slideIndex) {
      $target.data('bs.carousel').to(slideIndex);
    }

    e.preventDefault();
  };

  $(document).on('click.bs.carousel.data-api', '[data-slide]', clickHandler).on('click.bs.carousel.data-api', '[data-slide-to]', clickHandler);

  $(window).on('load', function () {
    $('[data-ride="carousel"]').each(function () {
      var $carousel = $(this);
      Plugin.call($carousel, $carousel.data());
    });
  });
}(jQuery);

/* ========================================================================
 * Bootstrap: collapse.js v3.3.7
 * http://getbootstrap.com/javascript/#collapse
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */

/* jshint latedef: false */

+function ($) {
  'use strict';

  // COLLAPSE PUBLIC CLASS DEFINITION
  // ================================

  var Collapse = function Collapse(element, options) {
    this.$element = $(element);
    this.options = $.extend({}, Collapse.DEFAULTS, options);
    this.$trigger = $('[data-toggle="collapse"][href="#' + element.id + '"],' + '[data-toggle="collapse"][data-target="#' + element.id + '"]');
    this.transitioning = null;

    if (this.options.parent) {
      this.$parent = this.getParent();
    } else {
      this.addAriaAndCollapsedClass(this.$element, this.$trigger);
    }

    if (this.options.toggle) this.toggle();
  };

  Collapse.VERSION = '3.3.7';

  Collapse.TRANSITION_DURATION = 350;

  Collapse.DEFAULTS = {
    toggle: true
  };

  Collapse.prototype.dimension = function () {
    var hasWidth = this.$element.hasClass('width');
    return hasWidth ? 'width' : 'height';
  };

  Collapse.prototype.show = function () {
    if (this.transitioning || this.$element.hasClass('in')) return;

    var activesData;
    var actives = this.$parent && this.$parent.children('.panel').children('.in, .collapsing');

    if (actives && actives.length) {
      activesData = actives.data('bs.collapse');
      if (activesData && activesData.transitioning) return;
    }

    var startEvent = $.Event('show.bs.collapse');
    this.$element.trigger(startEvent);
    if (startEvent.isDefaultPrevented()) return;

    if (actives && actives.length) {
      Plugin.call(actives, 'hide');
      activesData || actives.data('bs.collapse', null);
    }

    var dimension = this.dimension();

    this.$element.removeClass('collapse').addClass('collapsing')[dimension](0).attr('aria-expanded', true);

    this.$trigger.removeClass('collapsed').attr('aria-expanded', true);

    this.transitioning = 1;

    var complete = function complete() {
      this.$element.removeClass('collapsing').addClass('collapse in')[dimension]('');
      this.transitioning = 0;
      this.$element.trigger('shown.bs.collapse');
    };

    if (!$.support.transition) return complete.call(this);

    var scrollSize = $.camelCase(['scroll', dimension].join('-'));

    this.$element.one('bsTransitionEnd', $.proxy(complete, this)).emulateTransitionEnd(Collapse.TRANSITION_DURATION)[dimension](this.$element[0][scrollSize]);
  };

  Collapse.prototype.hide = function () {
    if (this.transitioning || !this.$element.hasClass('in')) return;

    var startEvent = $.Event('hide.bs.collapse');
    this.$element.trigger(startEvent);
    if (startEvent.isDefaultPrevented()) return;

    var dimension = this.dimension();

    this.$element[dimension](this.$element[dimension]())[0].offsetHeight;

    this.$element.addClass('collapsing').removeClass('collapse in').attr('aria-expanded', false);

    this.$trigger.addClass('collapsed').attr('aria-expanded', false);

    this.transitioning = 1;

    var complete = function complete() {
      this.transitioning = 0;
      this.$element.removeClass('collapsing').addClass('collapse').trigger('hidden.bs.collapse');
    };

    if (!$.support.transition) return complete.call(this);

    this.$element[dimension](0).one('bsTransitionEnd', $.proxy(complete, this)).emulateTransitionEnd(Collapse.TRANSITION_DURATION);
  };

  Collapse.prototype.toggle = function () {
    this[this.$element.hasClass('in') ? 'hide' : 'show']();
  };

  Collapse.prototype.getParent = function () {
    return $(this.options.parent).find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]').each($.proxy(function (i, element) {
      var $element = $(element);
      this.addAriaAndCollapsedClass(getTargetFromTrigger($element), $element);
    }, this)).end();
  };

  Collapse.prototype.addAriaAndCollapsedClass = function ($element, $trigger) {
    var isOpen = $element.hasClass('in');

    $element.attr('aria-expanded', isOpen);
    $trigger.toggleClass('collapsed', !isOpen).attr('aria-expanded', isOpen);
  };

  function getTargetFromTrigger($trigger) {
    var href;
    var target = $trigger.attr('data-target') || (href = $trigger.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, ''); // strip for ie7

    return $(target);
  }

  // COLLAPSE PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this);
      var data = $this.data('bs.collapse');
      var options = $.extend({}, Collapse.DEFAULTS, $this.data(), (typeof option === 'undefined' ? 'undefined' : _typeof(option)) == 'object' && option);

      if (!data && options.toggle && /show|hide/.test(option)) options.toggle = false;
      if (!data) $this.data('bs.collapse', data = new Collapse(this, options));
      if (typeof option == 'string') data[option]();
    });
  }

  var old = $.fn.collapse;

  $.fn.collapse = Plugin;
  $.fn.collapse.Constructor = Collapse;

  // COLLAPSE NO CONFLICT
  // ====================

  $.fn.collapse.noConflict = function () {
    $.fn.collapse = old;
    return this;
  };

  // COLLAPSE DATA-API
  // =================

  $(document).on('click.bs.collapse.data-api', '[data-toggle="collapse"]', function (e) {
    var $this = $(this);

    if (!$this.attr('data-target')) e.preventDefault();

    var $target = getTargetFromTrigger($this);
    var data = $target.data('bs.collapse');
    var option = data ? 'toggle' : $this.data();

    Plugin.call($target, option);
  });
}(jQuery);

/* ========================================================================
 * Bootstrap: dropdown.js v3.3.7
 * http://getbootstrap.com/javascript/#dropdowns
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */

+function ($) {
  'use strict';

  // DROPDOWN CLASS DEFINITION
  // =========================

  var backdrop = '.dropdown-backdrop';
  var toggle = '[data-toggle="dropdown"]';
  var Dropdown = function Dropdown(element) {
    $(element).on('click.bs.dropdown', this.toggle);
  };

  Dropdown.VERSION = '3.3.7';

  function getParent($this) {
    var selector = $this.attr('data-target');

    if (!selector) {
      selector = $this.attr('href');
      selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, ''); // strip for ie7
    }

    var $parent = selector && $(selector);

    return $parent && $parent.length ? $parent : $this.parent();
  }

  function clearMenus(e) {
    if (e && e.which === 3) return;
    $(backdrop).remove();
    $(toggle).each(function () {
      var $this = $(this);
      var $parent = getParent($this);
      var relatedTarget = { relatedTarget: this };

      if (!$parent.hasClass('open')) return;

      if (e && e.type == 'click' && /input|textarea/i.test(e.target.tagName) && $.contains($parent[0], e.target)) return;

      $parent.trigger(e = $.Event('hide.bs.dropdown', relatedTarget));

      if (e.isDefaultPrevented()) return;

      $this.attr('aria-expanded', 'false');
      $parent.removeClass('open').trigger($.Event('hidden.bs.dropdown', relatedTarget));
    });
  }

  Dropdown.prototype.toggle = function (e) {
    var $this = $(this);

    if ($this.is('.disabled, :disabled')) return;

    var $parent = getParent($this);
    var isActive = $parent.hasClass('open');

    clearMenus();

    if (!isActive) {
      if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
        // if mobile we use a backdrop because click events don't delegate
        $(document.createElement('div')).addClass('dropdown-backdrop').insertAfter($(this)).on('click', clearMenus);
      }

      var relatedTarget = { relatedTarget: this };
      $parent.trigger(e = $.Event('show.bs.dropdown', relatedTarget));

      if (e.isDefaultPrevented()) return;

      $this.trigger('focus').attr('aria-expanded', 'true');

      $parent.toggleClass('open').trigger($.Event('shown.bs.dropdown', relatedTarget));
    }

    return false;
  };

  Dropdown.prototype.keydown = function (e) {
    if (!/(38|40|27|32)/.test(e.which) || /input|textarea/i.test(e.target.tagName)) return;

    var $this = $(this);

    e.preventDefault();
    e.stopPropagation();

    if ($this.is('.disabled, :disabled')) return;

    var $parent = getParent($this);
    var isActive = $parent.hasClass('open');

    if (!isActive && e.which != 27 || isActive && e.which == 27) {
      if (e.which == 27) $parent.find(toggle).trigger('focus');
      return $this.trigger('click');
    }

    var desc = ' li:not(.disabled):visible a';
    var $items = $parent.find('.dropdown-menu' + desc);

    if (!$items.length) return;

    var index = $items.index(e.target);

    if (e.which == 38 && index > 0) index--; // up
    if (e.which == 40 && index < $items.length - 1) index++; // down
    if (!~index) index = 0;

    $items.eq(index).trigger('focus');
  };

  // DROPDOWN PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this);
      var data = $this.data('bs.dropdown');

      if (!data) $this.data('bs.dropdown', data = new Dropdown(this));
      if (typeof option == 'string') data[option].call($this);
    });
  }

  var old = $.fn.dropdown;

  $.fn.dropdown = Plugin;
  $.fn.dropdown.Constructor = Dropdown;

  // DROPDOWN NO CONFLICT
  // ====================

  $.fn.dropdown.noConflict = function () {
    $.fn.dropdown = old;
    return this;
  };

  // APPLY TO STANDARD DROPDOWN ELEMENTS
  // ===================================

  $(document).on('click.bs.dropdown.data-api', clearMenus).on('click.bs.dropdown.data-api', '.dropdown form', function (e) {
    e.stopPropagation();
  }).on('click.bs.dropdown.data-api', toggle, Dropdown.prototype.toggle).on('keydown.bs.dropdown.data-api', toggle, Dropdown.prototype.keydown).on('keydown.bs.dropdown.data-api', '.dropdown-menu', Dropdown.prototype.keydown);
}(jQuery);

/* ========================================================================
 * Bootstrap: modal.js v3.3.7
 * http://getbootstrap.com/javascript/#modals
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */

+function ($) {
  'use strict';

  // MODAL CLASS DEFINITION
  // ======================

  var Modal = function Modal(element, options) {
    this.options = options;
    this.$body = $(document.body);
    this.$element = $(element);
    this.$dialog = this.$element.find('.modal-dialog');
    this.$backdrop = null;
    this.isShown = null;
    this.originalBodyPad = null;
    this.scrollbarWidth = 0;
    this.ignoreBackdropClick = false;

    if (this.options.remote) {
      this.$element.find('.modal-content').load(this.options.remote, $.proxy(function () {
        this.$element.trigger('loaded.bs.modal');
      }, this));
    }
  };

  Modal.VERSION = '3.3.7';

  Modal.TRANSITION_DURATION = 300;
  Modal.BACKDROP_TRANSITION_DURATION = 150;

  Modal.DEFAULTS = {
    backdrop: true,
    keyboard: true,
    show: true
  };

  Modal.prototype.toggle = function (_relatedTarget) {
    return this.isShown ? this.hide() : this.show(_relatedTarget);
  };

  Modal.prototype.show = function (_relatedTarget) {
    var that = this;
    var e = $.Event('show.bs.modal', { relatedTarget: _relatedTarget });

    this.$element.trigger(e);

    if (this.isShown || e.isDefaultPrevented()) return;

    this.isShown = true;

    this.checkScrollbar();
    this.setScrollbar();
    this.$body.addClass('modal-open');

    this.escape();
    this.resize();

    this.$element.on('click.dismiss.bs.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this));

    this.$dialog.on('mousedown.dismiss.bs.modal', function () {
      that.$element.one('mouseup.dismiss.bs.modal', function (e) {
        if ($(e.target).is(that.$element)) that.ignoreBackdropClick = true;
      });
    });

    this.backdrop(function () {
      var transition = $.support.transition && that.$element.hasClass('fade');

      if (!that.$element.parent().length) {
        that.$element.appendTo(that.$body); // don't move modals dom position
      }

      that.$element.show().scrollTop(0);

      that.adjustDialog();

      if (transition) {
        that.$element[0].offsetWidth; // force reflow
      }

      that.$element.addClass('in');

      that.enforceFocus();

      var e = $.Event('shown.bs.modal', { relatedTarget: _relatedTarget });

      transition ? that.$dialog // wait for modal to slide in
      .one('bsTransitionEnd', function () {
        that.$element.trigger('focus').trigger(e);
      }).emulateTransitionEnd(Modal.TRANSITION_DURATION) : that.$element.trigger('focus').trigger(e);
    });
  };

  Modal.prototype.hide = function (e) {
    if (e) e.preventDefault();

    e = $.Event('hide.bs.modal');

    this.$element.trigger(e);

    if (!this.isShown || e.isDefaultPrevented()) return;

    this.isShown = false;

    this.escape();
    this.resize();

    $(document).off('focusin.bs.modal');

    this.$element.removeClass('in').off('click.dismiss.bs.modal').off('mouseup.dismiss.bs.modal');

    this.$dialog.off('mousedown.dismiss.bs.modal');

    $.support.transition && this.$element.hasClass('fade') ? this.$element.one('bsTransitionEnd', $.proxy(this.hideModal, this)).emulateTransitionEnd(Modal.TRANSITION_DURATION) : this.hideModal();
  };

  Modal.prototype.enforceFocus = function () {
    $(document).off('focusin.bs.modal') // guard against infinite focus loop
    .on('focusin.bs.modal', $.proxy(function (e) {
      if (document !== e.target && this.$element[0] !== e.target && !this.$element.has(e.target).length) {
        this.$element.trigger('focus');
      }
    }, this));
  };

  Modal.prototype.escape = function () {
    if (this.isShown && this.options.keyboard) {
      this.$element.on('keydown.dismiss.bs.modal', $.proxy(function (e) {
        e.which == 27 && this.hide();
      }, this));
    } else if (!this.isShown) {
      this.$element.off('keydown.dismiss.bs.modal');
    }
  };

  Modal.prototype.resize = function () {
    if (this.isShown) {
      $(window).on('resize.bs.modal', $.proxy(this.handleUpdate, this));
    } else {
      $(window).off('resize.bs.modal');
    }
  };

  Modal.prototype.hideModal = function () {
    var that = this;
    this.$element.hide();
    this.backdrop(function () {
      that.$body.removeClass('modal-open');
      that.resetAdjustments();
      that.resetScrollbar();
      that.$element.trigger('hidden.bs.modal');
    });
  };

  Modal.prototype.removeBackdrop = function () {
    this.$backdrop && this.$backdrop.remove();
    this.$backdrop = null;
  };

  Modal.prototype.backdrop = function (callback) {
    var that = this;
    var animate = this.$element.hasClass('fade') ? 'fade' : '';

    if (this.isShown && this.options.backdrop) {
      var doAnimate = $.support.transition && animate;

      this.$backdrop = $(document.createElement('div')).addClass('modal-backdrop ' + animate).appendTo(this.$body);

      this.$element.on('click.dismiss.bs.modal', $.proxy(function (e) {
        if (this.ignoreBackdropClick) {
          this.ignoreBackdropClick = false;
          return;
        }
        if (e.target !== e.currentTarget) return;
        this.options.backdrop == 'static' ? this.$element[0].focus() : this.hide();
      }, this));

      if (doAnimate) this.$backdrop[0].offsetWidth; // force reflow

      this.$backdrop.addClass('in');

      if (!callback) return;

      doAnimate ? this.$backdrop.one('bsTransitionEnd', callback).emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) : callback();
    } else if (!this.isShown && this.$backdrop) {
      this.$backdrop.removeClass('in');

      var callbackRemove = function callbackRemove() {
        that.removeBackdrop();
        callback && callback();
      };
      $.support.transition && this.$element.hasClass('fade') ? this.$backdrop.one('bsTransitionEnd', callbackRemove).emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) : callbackRemove();
    } else if (callback) {
      callback();
    }
  };

  // these following methods are used to handle overflowing modals

  Modal.prototype.handleUpdate = function () {
    this.adjustDialog();
  };

  Modal.prototype.adjustDialog = function () {
    var modalIsOverflowing = this.$element[0].scrollHeight > document.documentElement.clientHeight;

    this.$element.css({
      paddingLeft: !this.bodyIsOverflowing && modalIsOverflowing ? this.scrollbarWidth : '',
      paddingRight: this.bodyIsOverflowing && !modalIsOverflowing ? this.scrollbarWidth : ''
    });
  };

  Modal.prototype.resetAdjustments = function () {
    this.$element.css({
      paddingLeft: '',
      paddingRight: ''
    });
  };

  Modal.prototype.checkScrollbar = function () {
    var fullWindowWidth = window.innerWidth;
    if (!fullWindowWidth) {
      // workaround for missing window.innerWidth in IE8
      var documentElementRect = document.documentElement.getBoundingClientRect();
      fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left);
    }
    this.bodyIsOverflowing = document.body.clientWidth < fullWindowWidth;
    this.scrollbarWidth = this.measureScrollbar();
  };

  Modal.prototype.setScrollbar = function () {
    var bodyPad = parseInt(this.$body.css('padding-right') || 0, 10);
    this.originalBodyPad = document.body.style.paddingRight || '';
    if (this.bodyIsOverflowing) this.$body.css('padding-right', bodyPad + this.scrollbarWidth);
  };

  Modal.prototype.resetScrollbar = function () {
    this.$body.css('padding-right', this.originalBodyPad);
  };

  Modal.prototype.measureScrollbar = function () {
    // thx walsh
    var scrollDiv = document.createElement('div');
    scrollDiv.className = 'modal-scrollbar-measure';
    this.$body.append(scrollDiv);
    var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
    this.$body[0].removeChild(scrollDiv);
    return scrollbarWidth;
  };

  // MODAL PLUGIN DEFINITION
  // =======================

  function Plugin(option, _relatedTarget) {
    return this.each(function () {
      var $this = $(this);
      var data = $this.data('bs.modal');
      var options = $.extend({}, Modal.DEFAULTS, $this.data(), (typeof option === 'undefined' ? 'undefined' : _typeof(option)) == 'object' && option);

      if (!data) $this.data('bs.modal', data = new Modal(this, options));
      if (typeof option == 'string') data[option](_relatedTarget);else if (options.show) data.show(_relatedTarget);
    });
  }

  var old = $.fn.modal;

  $.fn.modal = Plugin;
  $.fn.modal.Constructor = Modal;

  // MODAL NO CONFLICT
  // =================

  $.fn.modal.noConflict = function () {
    $.fn.modal = old;
    return this;
  };

  // MODAL DATA-API
  // ==============

  $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (e) {
    var $this = $(this);
    var href = $this.attr('href');
    var $target = $($this.attr('data-target') || href && href.replace(/.*(?=#[^\s]+$)/, '')); // strip for ie7
    var option = $target.data('bs.modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data());

    if ($this.is('a')) e.preventDefault();

    $target.one('show.bs.modal', function (showEvent) {
      if (showEvent.isDefaultPrevented()) return; // only register focus restorer if modal will actually get shown
      $target.one('hidden.bs.modal', function () {
        $this.is(':visible') && $this.trigger('focus');
      });
    });
    Plugin.call($target, option, this);
  });
}(jQuery);

/* ========================================================================
 * Bootstrap: tooltip.js v3.3.7
 * http://getbootstrap.com/javascript/#tooltip
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */

+function ($) {
  'use strict';

  // TOOLTIP PUBLIC CLASS DEFINITION
  // ===============================

  var Tooltip = function Tooltip(element, options) {
    this.type = null;
    this.options = null;
    this.enabled = null;
    this.timeout = null;
    this.hoverState = null;
    this.$element = null;
    this.inState = null;

    this.init('tooltip', element, options);
  };

  Tooltip.VERSION = '3.3.7';

  Tooltip.TRANSITION_DURATION = 150;

  Tooltip.DEFAULTS = {
    animation: true,
    placement: 'top',
    selector: false,
    template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
    trigger: 'hover focus',
    title: '',
    delay: 0,
    html: false,
    container: false,
    viewport: {
      selector: 'body',
      padding: 0
    }
  };

  Tooltip.prototype.init = function (type, element, options) {
    this.enabled = true;
    this.type = type;
    this.$element = $(element);
    this.options = this.getOptions(options);
    this.$viewport = this.options.viewport && $($.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : this.options.viewport.selector || this.options.viewport);
    this.inState = { click: false, hover: false, focus: false };

    if (this.$element[0] instanceof document.constructor && !this.options.selector) {
      throw new Error('`selector` option must be specified when initializing ' + this.type + ' on the window.document object!');
    }

    var triggers = this.options.trigger.split(' ');

    for (var i = triggers.length; i--;) {
      var trigger = triggers[i];

      if (trigger == 'click') {
        this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this));
      } else if (trigger != 'manual') {
        var eventIn = trigger == 'hover' ? 'mouseenter' : 'focusin';
        var eventOut = trigger == 'hover' ? 'mouseleave' : 'focusout';

        this.$element.on(eventIn + '.' + this.type, this.options.selector, $.proxy(this.enter, this));
        this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this));
      }
    }

    this.options.selector ? this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' }) : this.fixTitle();
  };

  Tooltip.prototype.getDefaults = function () {
    return Tooltip.DEFAULTS;
  };

  Tooltip.prototype.getOptions = function (options) {
    options = $.extend({}, this.getDefaults(), this.$element.data(), options);

    if (options.delay && typeof options.delay == 'number') {
      options.delay = {
        show: options.delay,
        hide: options.delay
      };
    }

    return options;
  };

  Tooltip.prototype.getDelegateOptions = function () {
    var options = {};
    var defaults = this.getDefaults();

    this._options && $.each(this._options, function (key, value) {
      if (defaults[key] != value) options[key] = value;
    });

    return options;
  };

  Tooltip.prototype.enter = function (obj) {
    var self = obj instanceof this.constructor ? obj : $(obj.currentTarget).data('bs.' + this.type);

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions());
      $(obj.currentTarget).data('bs.' + this.type, self);
    }

    if (obj instanceof $.Event) {
      self.inState[obj.type == 'focusin' ? 'focus' : 'hover'] = true;
    }

    if (self.tip().hasClass('in') || self.hoverState == 'in') {
      self.hoverState = 'in';
      return;
    }

    clearTimeout(self.timeout);

    self.hoverState = 'in';

    if (!self.options.delay || !self.options.delay.show) return self.show();

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'in') self.show();
    }, self.options.delay.show);
  };

  Tooltip.prototype.isInStateTrue = function () {
    for (var key in this.inState) {
      if (this.inState[key]) return true;
    }

    return false;
  };

  Tooltip.prototype.leave = function (obj) {
    var self = obj instanceof this.constructor ? obj : $(obj.currentTarget).data('bs.' + this.type);

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions());
      $(obj.currentTarget).data('bs.' + this.type, self);
    }

    if (obj instanceof $.Event) {
      self.inState[obj.type == 'focusout' ? 'focus' : 'hover'] = false;
    }

    if (self.isInStateTrue()) return;

    clearTimeout(self.timeout);

    self.hoverState = 'out';

    if (!self.options.delay || !self.options.delay.hide) return self.hide();

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'out') self.hide();
    }, self.options.delay.hide);
  };

  Tooltip.prototype.show = function () {
    var e = $.Event('show.bs.' + this.type);

    if (this.hasContent() && this.enabled) {
      this.$element.trigger(e);

      var inDom = $.contains(this.$element[0].ownerDocument.documentElement, this.$element[0]);
      if (e.isDefaultPrevented() || !inDom) return;
      var that = this;

      var $tip = this.tip();

      var tipId = this.getUID(this.type);

      this.setContent();
      $tip.attr('id', tipId);
      this.$element.attr('aria-describedby', tipId);

      if (this.options.animation) $tip.addClass('fade');

      var placement = typeof this.options.placement == 'function' ? this.options.placement.call(this, $tip[0], this.$element[0]) : this.options.placement;

      var autoToken = /\s?auto?\s?/i;
      var autoPlace = autoToken.test(placement);
      if (autoPlace) placement = placement.replace(autoToken, '') || 'top';

      $tip.detach().css({ top: 0, left: 0, display: 'block' }).addClass(placement).data('bs.' + this.type, this);

      this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element);
      this.$element.trigger('inserted.bs.' + this.type);

      var pos = this.getPosition();
      var actualWidth = $tip[0].offsetWidth;
      var actualHeight = $tip[0].offsetHeight;

      if (autoPlace) {
        var orgPlacement = placement;
        var viewportDim = this.getPosition(this.$viewport);

        placement = placement == 'bottom' && pos.bottom + actualHeight > viewportDim.bottom ? 'top' : placement == 'top' && pos.top - actualHeight < viewportDim.top ? 'bottom' : placement == 'right' && pos.right + actualWidth > viewportDim.width ? 'left' : placement == 'left' && pos.left - actualWidth < viewportDim.left ? 'right' : placement;

        $tip.removeClass(orgPlacement).addClass(placement);
      }

      var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight);

      this.applyPlacement(calculatedOffset, placement);

      var complete = function complete() {
        var prevHoverState = that.hoverState;
        that.$element.trigger('shown.bs.' + that.type);
        that.hoverState = null;

        if (prevHoverState == 'out') that.leave(that);
      };

      $.support.transition && this.$tip.hasClass('fade') ? $tip.one('bsTransitionEnd', complete).emulateTransitionEnd(Tooltip.TRANSITION_DURATION) : complete();
    }
  };

  Tooltip.prototype.applyPlacement = function (offset, placement) {
    var $tip = this.tip();
    var width = $tip[0].offsetWidth;
    var height = $tip[0].offsetHeight;

    // manually read margins because getBoundingClientRect includes difference
    var marginTop = parseInt($tip.css('margin-top'), 10);
    var marginLeft = parseInt($tip.css('margin-left'), 10);

    // we must check for NaN for ie 8/9
    if (isNaN(marginTop)) marginTop = 0;
    if (isNaN(marginLeft)) marginLeft = 0;

    offset.top += marginTop;
    offset.left += marginLeft;

    // $.fn.offset doesn't round pixel values
    // so we use setOffset directly with our own function B-0
    $.offset.setOffset($tip[0], $.extend({
      using: function using(props) {
        $tip.css({
          top: Math.round(props.top),
          left: Math.round(props.left)
        });
      }
    }, offset), 0);

    $tip.addClass('in');

    // check to see if placing tip in new offset caused the tip to resize itself
    var actualWidth = $tip[0].offsetWidth;
    var actualHeight = $tip[0].offsetHeight;

    if (placement == 'top' && actualHeight != height) {
      offset.top = offset.top + height - actualHeight;
    }

    var delta = this.getViewportAdjustedDelta(placement, offset, actualWidth, actualHeight);

    if (delta.left) offset.left += delta.left;else offset.top += delta.top;

    var isVertical = /top|bottom/.test(placement);
    var arrowDelta = isVertical ? delta.left * 2 - width + actualWidth : delta.top * 2 - height + actualHeight;
    var arrowOffsetPosition = isVertical ? 'offsetWidth' : 'offsetHeight';

    $tip.offset(offset);
    this.replaceArrow(arrowDelta, $tip[0][arrowOffsetPosition], isVertical);
  };

  Tooltip.prototype.replaceArrow = function (delta, dimension, isVertical) {
    this.arrow().css(isVertical ? 'left' : 'top', 50 * (1 - delta / dimension) + '%').css(isVertical ? 'top' : 'left', '');
  };

  Tooltip.prototype.setContent = function () {
    var $tip = this.tip();
    var title = this.getTitle();

    $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title);
    $tip.removeClass('fade in top bottom left right');
  };

  Tooltip.prototype.hide = function (callback) {
    var that = this;
    var $tip = $(this.$tip);
    var e = $.Event('hide.bs.' + this.type);

    function complete() {
      if (that.hoverState != 'in') $tip.detach();
      if (that.$element) {
        // TODO: Check whether guarding this code with this `if` is really necessary.
        that.$element.removeAttr('aria-describedby').trigger('hidden.bs.' + that.type);
      }
      callback && callback();
    }

    this.$element.trigger(e);

    if (e.isDefaultPrevented()) return;

    $tip.removeClass('in');

    $.support.transition && $tip.hasClass('fade') ? $tip.one('bsTransitionEnd', complete).emulateTransitionEnd(Tooltip.TRANSITION_DURATION) : complete();

    this.hoverState = null;

    return this;
  };

  Tooltip.prototype.fixTitle = function () {
    var $e = this.$element;
    if ($e.attr('title') || typeof $e.attr('data-original-title') != 'string') {
      $e.attr('data-original-title', $e.attr('title') || '').attr('title', '');
    }
  };

  Tooltip.prototype.hasContent = function () {
    return this.getTitle();
  };

  Tooltip.prototype.getPosition = function ($element) {
    $element = $element || this.$element;

    var el = $element[0];
    var isBody = el.tagName == 'BODY';

    var elRect = el.getBoundingClientRect();
    if (elRect.width == null) {
      // width and height are missing in IE8, so compute them manually; see https://github.com/twbs/bootstrap/issues/14093
      elRect = $.extend({}, elRect, { width: elRect.right - elRect.left, height: elRect.bottom - elRect.top });
    }
    var isSvg = window.SVGElement && el instanceof window.SVGElement;
    // Avoid using $.offset() on SVGs since it gives incorrect results in jQuery 3.
    // See https://github.com/twbs/bootstrap/issues/20280
    var elOffset = isBody ? { top: 0, left: 0 } : isSvg ? null : $element.offset();
    var scroll = { scroll: isBody ? document.documentElement.scrollTop || document.body.scrollTop : $element.scrollTop() };
    var outerDims = isBody ? { width: $(window).width(), height: $(window).height() } : null;

    return $.extend({}, elRect, scroll, outerDims, elOffset);
  };

  Tooltip.prototype.getCalculatedOffset = function (placement, pos, actualWidth, actualHeight) {
    return placement == 'bottom' ? { top: pos.top + pos.height, left: pos.left + pos.width / 2 - actualWidth / 2 } : placement == 'top' ? { top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2 } : placement == 'left' ? { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth } :
    /* placement == 'right' */{ top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width };
  };

  Tooltip.prototype.getViewportAdjustedDelta = function (placement, pos, actualWidth, actualHeight) {
    var delta = { top: 0, left: 0 };
    if (!this.$viewport) return delta;

    var viewportPadding = this.options.viewport && this.options.viewport.padding || 0;
    var viewportDimensions = this.getPosition(this.$viewport);

    if (/right|left/.test(placement)) {
      var topEdgeOffset = pos.top - viewportPadding - viewportDimensions.scroll;
      var bottomEdgeOffset = pos.top + viewportPadding - viewportDimensions.scroll + actualHeight;
      if (topEdgeOffset < viewportDimensions.top) {
        // top overflow
        delta.top = viewportDimensions.top - topEdgeOffset;
      } else if (bottomEdgeOffset > viewportDimensions.top + viewportDimensions.height) {
        // bottom overflow
        delta.top = viewportDimensions.top + viewportDimensions.height - bottomEdgeOffset;
      }
    } else {
      var leftEdgeOffset = pos.left - viewportPadding;
      var rightEdgeOffset = pos.left + viewportPadding + actualWidth;
      if (leftEdgeOffset < viewportDimensions.left) {
        // left overflow
        delta.left = viewportDimensions.left - leftEdgeOffset;
      } else if (rightEdgeOffset > viewportDimensions.right) {
        // right overflow
        delta.left = viewportDimensions.left + viewportDimensions.width - rightEdgeOffset;
      }
    }

    return delta;
  };

  Tooltip.prototype.getTitle = function () {
    var title;
    var $e = this.$element;
    var o = this.options;

    title = $e.attr('data-original-title') || (typeof o.title == 'function' ? o.title.call($e[0]) : o.title);

    return title;
  };

  Tooltip.prototype.getUID = function (prefix) {
    do {
      prefix += ~~(Math.random() * 1000000);
    } while (document.getElementById(prefix));
    return prefix;
  };

  Tooltip.prototype.tip = function () {
    if (!this.$tip) {
      this.$tip = $(this.options.template);
      if (this.$tip.length != 1) {
        throw new Error(this.type + ' `template` option must consist of exactly 1 top-level element!');
      }
    }
    return this.$tip;
  };

  Tooltip.prototype.arrow = function () {
    return this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow');
  };

  Tooltip.prototype.enable = function () {
    this.enabled = true;
  };

  Tooltip.prototype.disable = function () {
    this.enabled = false;
  };

  Tooltip.prototype.toggleEnabled = function () {
    this.enabled = !this.enabled;
  };

  Tooltip.prototype.toggle = function (e) {
    var self = this;
    if (e) {
      self = $(e.currentTarget).data('bs.' + this.type);
      if (!self) {
        self = new this.constructor(e.currentTarget, this.getDelegateOptions());
        $(e.currentTarget).data('bs.' + this.type, self);
      }
    }

    if (e) {
      self.inState.click = !self.inState.click;
      if (self.isInStateTrue()) self.enter(self);else self.leave(self);
    } else {
      self.tip().hasClass('in') ? self.leave(self) : self.enter(self);
    }
  };

  Tooltip.prototype.destroy = function () {
    var that = this;
    clearTimeout(this.timeout);
    this.hide(function () {
      that.$element.off('.' + that.type).removeData('bs.' + that.type);
      if (that.$tip) {
        that.$tip.detach();
      }
      that.$tip = null;
      that.$arrow = null;
      that.$viewport = null;
      that.$element = null;
    });
  };

  // TOOLTIP PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this);
      var data = $this.data('bs.tooltip');
      var options = (typeof option === 'undefined' ? 'undefined' : _typeof(option)) == 'object' && option;

      if (!data && /destroy|hide/.test(option)) return;
      if (!data) $this.data('bs.tooltip', data = new Tooltip(this, options));
      if (typeof option == 'string') data[option]();
    });
  }

  var old = $.fn.tooltip;

  $.fn.tooltip = Plugin;
  $.fn.tooltip.Constructor = Tooltip;

  // TOOLTIP NO CONFLICT
  // ===================

  $.fn.tooltip.noConflict = function () {
    $.fn.tooltip = old;
    return this;
  };
}(jQuery);

/* ========================================================================
 * Bootstrap: popover.js v3.3.7
 * http://getbootstrap.com/javascript/#popovers
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */

+function ($) {
  'use strict';

  // POPOVER PUBLIC CLASS DEFINITION
  // ===============================

  var Popover = function Popover(element, options) {
    this.init('popover', element, options);
  };

  if (!$.fn.tooltip) throw new Error('Popover requires tooltip.js');

  Popover.VERSION = '3.3.7';

  Popover.DEFAULTS = $.extend({}, $.fn.tooltip.Constructor.DEFAULTS, {
    placement: 'right',
    trigger: 'click',
    content: '',
    template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
  });

  // NOTE: POPOVER EXTENDS tooltip.js
  // ================================

  Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype);

  Popover.prototype.constructor = Popover;

  Popover.prototype.getDefaults = function () {
    return Popover.DEFAULTS;
  };

  Popover.prototype.setContent = function () {
    var $tip = this.tip();
    var title = this.getTitle();
    var content = this.getContent();

    $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title);
    $tip.find('.popover-content').children().detach().end()[// we use append for html objects to maintain js events
    this.options.html ? typeof content == 'string' ? 'html' : 'append' : 'text'](content);

    $tip.removeClass('fade top bottom left right in');

    // IE8 doesn't accept hiding via the `:empty` pseudo selector, we have to do
    // this manually by checking the contents.
    if (!$tip.find('.popover-title').html()) $tip.find('.popover-title').hide();
  };

  Popover.prototype.hasContent = function () {
    return this.getTitle() || this.getContent();
  };

  Popover.prototype.getContent = function () {
    var $e = this.$element;
    var o = this.options;

    return $e.attr('data-content') || (typeof o.content == 'function' ? o.content.call($e[0]) : o.content);
  };

  Popover.prototype.arrow = function () {
    return this.$arrow = this.$arrow || this.tip().find('.arrow');
  };

  // POPOVER PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this);
      var data = $this.data('bs.popover');
      var options = (typeof option === 'undefined' ? 'undefined' : _typeof(option)) == 'object' && option;

      if (!data && /destroy|hide/.test(option)) return;
      if (!data) $this.data('bs.popover', data = new Popover(this, options));
      if (typeof option == 'string') data[option]();
    });
  }

  var old = $.fn.popover;

  $.fn.popover = Plugin;
  $.fn.popover.Constructor = Popover;

  // POPOVER NO CONFLICT
  // ===================

  $.fn.popover.noConflict = function () {
    $.fn.popover = old;
    return this;
  };
}(jQuery);

/* ========================================================================
 * Bootstrap: scrollspy.js v3.3.7
 * http://getbootstrap.com/javascript/#scrollspy
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */

+function ($) {
  'use strict';

  // SCROLLSPY CLASS DEFINITION
  // ==========================

  function ScrollSpy(element, options) {
    this.$body = $(document.body);
    this.$scrollElement = $(element).is(document.body) ? $(window) : $(element);
    this.options = $.extend({}, ScrollSpy.DEFAULTS, options);
    this.selector = (this.options.target || '') + ' .nav li > a';
    this.offsets = [];
    this.targets = [];
    this.activeTarget = null;
    this.scrollHeight = 0;

    this.$scrollElement.on('scroll.bs.scrollspy', $.proxy(this.process, this));
    this.refresh();
    this.process();
  }

  ScrollSpy.VERSION = '3.3.7';

  ScrollSpy.DEFAULTS = {
    offset: 10
  };

  ScrollSpy.prototype.getScrollHeight = function () {
    return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight);
  };

  ScrollSpy.prototype.refresh = function () {
    var that = this;
    var offsetMethod = 'offset';
    var offsetBase = 0;

    this.offsets = [];
    this.targets = [];
    this.scrollHeight = this.getScrollHeight();

    if (!$.isWindow(this.$scrollElement[0])) {
      offsetMethod = 'position';
      offsetBase = this.$scrollElement.scrollTop();
    }

    this.$body.find(this.selector).map(function () {
      var $el = $(this);
      var href = $el.data('target') || $el.attr('href');
      var $href = /^#./.test(href) && $(href);

      return $href && $href.length && $href.is(':visible') && [[$href[offsetMethod]().top + offsetBase, href]] || null;
    }).sort(function (a, b) {
      return a[0] - b[0];
    }).each(function () {
      that.offsets.push(this[0]);
      that.targets.push(this[1]);
    });
  };

  ScrollSpy.prototype.process = function () {
    var scrollTop = this.$scrollElement.scrollTop() + this.options.offset;
    var scrollHeight = this.getScrollHeight();
    var maxScroll = this.options.offset + scrollHeight - this.$scrollElement.height();
    var offsets = this.offsets;
    var targets = this.targets;
    var activeTarget = this.activeTarget;
    var i;

    if (this.scrollHeight != scrollHeight) {
      this.refresh();
    }

    if (scrollTop >= maxScroll) {
      return activeTarget != (i = targets[targets.length - 1]) && this.activate(i);
    }

    if (activeTarget && scrollTop < offsets[0]) {
      this.activeTarget = null;
      return this.clear();
    }

    for (i = offsets.length; i--;) {
      activeTarget != targets[i] && scrollTop >= offsets[i] && (offsets[i + 1] === undefined || scrollTop < offsets[i + 1]) && this.activate(targets[i]);
    }
  };

  ScrollSpy.prototype.activate = function (target) {
    this.activeTarget = target;

    this.clear();

    var selector = this.selector + '[data-target="' + target + '"],' + this.selector + '[href="' + target + '"]';

    var active = $(selector).parents('li').addClass('active');

    if (active.parent('.dropdown-menu').length) {
      active = active.closest('li.dropdown').addClass('active');
    }

    active.trigger('activate.bs.scrollspy');
  };

  ScrollSpy.prototype.clear = function () {
    $(this.selector).parentsUntil(this.options.target, '.active').removeClass('active');
  };

  // SCROLLSPY PLUGIN DEFINITION
  // ===========================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this);
      var data = $this.data('bs.scrollspy');
      var options = (typeof option === 'undefined' ? 'undefined' : _typeof(option)) == 'object' && option;

      if (!data) $this.data('bs.scrollspy', data = new ScrollSpy(this, options));
      if (typeof option == 'string') data[option]();
    });
  }

  var old = $.fn.scrollspy;

  $.fn.scrollspy = Plugin;
  $.fn.scrollspy.Constructor = ScrollSpy;

  // SCROLLSPY NO CONFLICT
  // =====================

  $.fn.scrollspy.noConflict = function () {
    $.fn.scrollspy = old;
    return this;
  };

  // SCROLLSPY DATA-API
  // ==================

  $(window).on('load.bs.scrollspy.data-api', function () {
    $('[data-spy="scroll"]').each(function () {
      var $spy = $(this);
      Plugin.call($spy, $spy.data());
    });
  });
}(jQuery);

/* ========================================================================
 * Bootstrap: tab.js v3.3.7
 * http://getbootstrap.com/javascript/#tabs
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */

+function ($) {
  'use strict';

  // TAB CLASS DEFINITION
  // ====================

  var Tab = function Tab(element) {
    // jscs:disable requireDollarBeforejQueryAssignment
    this.element = $(element);
    // jscs:enable requireDollarBeforejQueryAssignment
  };

  Tab.VERSION = '3.3.7';

  Tab.TRANSITION_DURATION = 150;

  Tab.prototype.show = function () {
    var $this = this.element;
    var $ul = $this.closest('ul:not(.dropdown-menu)');
    var selector = $this.data('target');

    if (!selector) {
      selector = $this.attr('href');
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, ''); // strip for ie7
    }

    if ($this.parent('li').hasClass('active')) return;

    var $previous = $ul.find('.active:last a');
    var hideEvent = $.Event('hide.bs.tab', {
      relatedTarget: $this[0]
    });
    var showEvent = $.Event('show.bs.tab', {
      relatedTarget: $previous[0]
    });

    $previous.trigger(hideEvent);
    $this.trigger(showEvent);

    if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) return;

    var $target = $(selector);

    this.activate($this.closest('li'), $ul);
    this.activate($target, $target.parent(), function () {
      $previous.trigger({
        type: 'hidden.bs.tab',
        relatedTarget: $this[0]
      });
      $this.trigger({
        type: 'shown.bs.tab',
        relatedTarget: $previous[0]
      });
    });
  };

  Tab.prototype.activate = function (element, container, callback) {
    var $active = container.find('> .active');
    var transition = callback && $.support.transition && ($active.length && $active.hasClass('fade') || !!container.find('> .fade').length);

    function next() {
      $active.removeClass('active').find('> .dropdown-menu > .active').removeClass('active').end().find('[data-toggle="tab"]').attr('aria-expanded', false);

      element.addClass('active').find('[data-toggle="tab"]').attr('aria-expanded', true);

      if (transition) {
        element[0].offsetWidth; // reflow for transition
        element.addClass('in');
      } else {
        element.removeClass('fade');
      }

      if (element.parent('.dropdown-menu').length) {
        element.closest('li.dropdown').addClass('active').end().find('[data-toggle="tab"]').attr('aria-expanded', true);
      }

      callback && callback();
    }

    $active.length && transition ? $active.one('bsTransitionEnd', next).emulateTransitionEnd(Tab.TRANSITION_DURATION) : next();

    $active.removeClass('in');
  };

  // TAB PLUGIN DEFINITION
  // =====================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this);
      var data = $this.data('bs.tab');

      if (!data) $this.data('bs.tab', data = new Tab(this));
      if (typeof option == 'string') data[option]();
    });
  }

  var old = $.fn.tab;

  $.fn.tab = Plugin;
  $.fn.tab.Constructor = Tab;

  // TAB NO CONFLICT
  // ===============

  $.fn.tab.noConflict = function () {
    $.fn.tab = old;
    return this;
  };

  // TAB DATA-API
  // ============

  var clickHandler = function clickHandler(e) {
    e.preventDefault();
    Plugin.call($(this), 'show');
  };

  $(document).on('click.bs.tab.data-api', '[data-toggle="tab"]', clickHandler).on('click.bs.tab.data-api', '[data-toggle="pill"]', clickHandler);
}(jQuery);

/* ========================================================================
 * Bootstrap: affix.js v3.3.7
 * http://getbootstrap.com/javascript/#affix
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */

+function ($) {
  'use strict';

  // AFFIX CLASS DEFINITION
  // ======================

  var Affix = function Affix(element, options) {
    this.options = $.extend({}, Affix.DEFAULTS, options);

    this.$target = $(this.options.target).on('scroll.bs.affix.data-api', $.proxy(this.checkPosition, this)).on('click.bs.affix.data-api', $.proxy(this.checkPositionWithEventLoop, this));

    this.$element = $(element);
    this.affixed = null;
    this.unpin = null;
    this.pinnedOffset = null;

    this.checkPosition();
  };

  Affix.VERSION = '3.3.7';

  Affix.RESET = 'affix affix-top affix-bottom';

  Affix.DEFAULTS = {
    offset: 0,
    target: window
  };

  Affix.prototype.getState = function (scrollHeight, height, offsetTop, offsetBottom) {
    var scrollTop = this.$target.scrollTop();
    var position = this.$element.offset();
    var targetHeight = this.$target.height();

    if (offsetTop != null && this.affixed == 'top') return scrollTop < offsetTop ? 'top' : false;

    if (this.affixed == 'bottom') {
      if (offsetTop != null) return scrollTop + this.unpin <= position.top ? false : 'bottom';
      return scrollTop + targetHeight <= scrollHeight - offsetBottom ? false : 'bottom';
    }

    var initializing = this.affixed == null;
    var colliderTop = initializing ? scrollTop : position.top;
    var colliderHeight = initializing ? targetHeight : height;

    if (offsetTop != null && scrollTop <= offsetTop) return 'top';
    if (offsetBottom != null && colliderTop + colliderHeight >= scrollHeight - offsetBottom) return 'bottom';

    return false;
  };

  Affix.prototype.getPinnedOffset = function () {
    if (this.pinnedOffset) return this.pinnedOffset;
    this.$element.removeClass(Affix.RESET).addClass('affix');
    var scrollTop = this.$target.scrollTop();
    var position = this.$element.offset();
    return this.pinnedOffset = position.top - scrollTop;
  };

  Affix.prototype.checkPositionWithEventLoop = function () {
    setTimeout($.proxy(this.checkPosition, this), 1);
  };

  Affix.prototype.checkPosition = function () {
    if (!this.$element.is(':visible')) return;

    var height = this.$element.height();
    var offset = this.options.offset;
    var offsetTop = offset.top;
    var offsetBottom = offset.bottom;
    var scrollHeight = Math.max($(document).height(), $(document.body).height());

    if ((typeof offset === 'undefined' ? 'undefined' : _typeof(offset)) != 'object') offsetBottom = offsetTop = offset;
    if (typeof offsetTop == 'function') offsetTop = offset.top(this.$element);
    if (typeof offsetBottom == 'function') offsetBottom = offset.bottom(this.$element);

    var affix = this.getState(scrollHeight, height, offsetTop, offsetBottom);

    if (this.affixed != affix) {
      if (this.unpin != null) this.$element.css('top', '');

      var affixType = 'affix' + (affix ? '-' + affix : '');
      var e = $.Event(affixType + '.bs.affix');

      this.$element.trigger(e);

      if (e.isDefaultPrevented()) return;

      this.affixed = affix;
      this.unpin = affix == 'bottom' ? this.getPinnedOffset() : null;

      this.$element.removeClass(Affix.RESET).addClass(affixType).trigger(affixType.replace('affix', 'affixed') + '.bs.affix');
    }

    if (affix == 'bottom') {
      this.$element.offset({
        top: scrollHeight - height - offsetBottom
      });
    }
  };

  // AFFIX PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this);
      var data = $this.data('bs.affix');
      var options = (typeof option === 'undefined' ? 'undefined' : _typeof(option)) == 'object' && option;

      if (!data) $this.data('bs.affix', data = new Affix(this, options));
      if (typeof option == 'string') data[option]();
    });
  }

  var old = $.fn.affix;

  $.fn.affix = Plugin;
  $.fn.affix.Constructor = Affix;

  // AFFIX NO CONFLICT
  // =================

  $.fn.affix.noConflict = function () {
    $.fn.affix = old;
    return this;
  };

  // AFFIX DATA-API
  // ==============

  $(window).on('load', function () {
    $('[data-spy="affix"]').each(function () {
      var $spy = $(this);
      var data = $spy.data();

      data.offset = data.offset || {};

      if (data.offsetBottom != null) data.offset.bottom = data.offsetBottom;
      if (data.offsetTop != null) data.offset.top = data.offsetTop;

      Plugin.call($spy, data);
    });
  });
}(jQuery);
'use strict';

// |--------------------------------------------------------------------------
// | BS3 designer
// |--------------------------------------------------------------------------
// |
// | This jQuery script is written by
// | Morten Nissen
// |
// | - Optimize form elements
// | - Attach footer to bottom of page on non-touch devices
// | - Enable BS3 tooltips on non-touch devices
// | - Disable form autocomplete on non-touch devices
// | - Apply loader icon to .btn.btn-loader on click
// | - Use appear on non-touch devices
// |

// jscs:disable requireCamelCaseOrUpperCaseIdentifiers

var bs3Designer = function ($) {
    'use strict';

    var Modernizr = {};
    var pub = {};

    /**
     * Instantiate
     */
    pub.init = function () {
        registerBootEventHandlers();
        registerEventHandlers();
    };

    /**
     * Register boot event handlers
     */
    function registerBootEventHandlers() {
        if (!Modernizr.touch) {
            footerAttached();
            optimizeFormElements();
        }

        appear();
        bs3Tooltip();
    }

    /**
     * Register event handlers
     */
    function registerEventHandlers() {

        $(window).resize(function () {
            footerAttached();
        });

        $('.btn-loader').on('click', function () {
            iconSpin($(this));
        });
    }

    /**
     * Footer attached
     */
    function footerAttached() {
        var $footer = $('.footer');
        var footerHeight = $footer.outerHeight(true);

        if ($('body').hasClass('footer-attached')) {
            $('.inner-wrapper').css('padding-bottom', footerHeight);
        }
    }

    /**
     * Appear
     */
    function appear() {
        var $appear = $('.appear');
        var $animation = $('.animation');

        if (Modernizr.touch || !Modernizr.cssanimations) {

            $animation.removeClass('animation').removeClass('animation-appear-from-top').removeClass('animation-appear-from-right').removeClass('animation-appear-from-left').removeClass('animation-appear-from-bottom').removeClass('animation-appear-from-center');

            return false;
        }

        // Enable appear
        $appear.appear();

        // Force processing on animation objects
        $animation.appear({
            force_process: true
        });

        // Animation object has appeared
        $animation.on('appear', function () {

            var $element = $(this);
            var delay = $element.data('delay');

            setTimeout(function () {
                $element.addClass('animation-start');
            }, delay);
        });
    }

    /**
     * BS tooltip
     */
    function bs3Tooltip() {
        if (Modernizr.touch) {
            $('[data-toggle=tooltip]').tooltip('hide');

            return false;
        }

        $('[data-toggle=tooltip]').tooltip();
    }

    /**
     * Optimize form elements
     */
    function optimizeFormElements() {
        $('form').attr('autocomplete', 'off');
    }

    /**
     * Icon spin
     */
    function iconSpin($element) {
        $element.find('.icon').addClass('icon-spin');
    }

    return pub;
}(jQuery);
'use strict';

// |--------------------------------------------------------------------------
// | BS3 sidebar
// |--------------------------------------------------------------------------
// |
// | App alike navigation with sidebar.
// |
// | This jQuery script is written by
// | Morten Nissen
// |
var bs3Sidebar = function ($) {
  'use strict';

  var Modernizr = {};
  var pub = {};

  /**
   * Instantiate
   */
  pub.init = function (options) {
    registerEventHandlers();
    registerBootEventHandlers();
  };

  /**
   * Register event handlers
   */
  function registerEventHandlers() {

    // Toggle sidebar
    $('[data-sidebar-toggle]').on('click', function (event) {
      event.preventDefault();

      var $element = $(this);

      toggleSidebar($element);
    });

    // Toggle dropdown
    $('.sidebar .sidebar-navigation-dropdown > a > .sidebar-navigation-dropdown-toggle').on('click', function (event) {
      event.preventDefault();

      var $element = $(this);

      toggleDropdown($element);
    });
  }

  /**
   * Register boot event handlers
   */
  function registerBootEventHandlers() {}

  /**
   * Toggle sidebar
   */
  function toggleSidebar($element) {
    var $body = $('body');
    var attribute = $element.attr('data-sidebar-toggle');

    if (attribute != 'left' && attribute != 'right') {
      return false;
    }

    if (attribute == 'left' && $body.hasClass('sidebar-right-open')) {
      $body.removeClass('sidebar-right-open');
    }

    if (attribute == 'right' && $body.hasClass('sidebar-left-open')) {
      $body.removeClass('sidebar-left-open');
    }

    $body.toggleClass('sidebar-' + attribute + '-open');
  }

  /**
   * Toggle dropdown
   */
  function toggleDropdown($element) {
    var $parent = $element.parent().parent();
    var parentIsActive = $parent.hasClass('active') || $parent.hasClass('active-trail') ? true : false;

    if (parentIsActive) {
      closeDropdown($parent);
    } else {
      openDropdown($parent);
    }
  }

  /**
   * Open dropdown
   */
  function openDropdown($parent) {
    var $dropdownMenu = $parent.find('> .sidebar-navigation-dropdown-menu');
    var dropdownMenuHeight = $dropdownMenu.outerHeight(true);
    var preAnimationCSS = { opacity: 0.1, height: 0, top: -20 };
    var animationCSS = { opacity: 1, height: dropdownMenuHeight, top: 0 };
    var callbackFunction = function callbackFunction() {
      $dropdownMenu.attr('style', '');
    };

    closeAllDropdownMenus($parent);

    $parent.addClass('active');

    $dropdownMenu.addClass('active').css(preAnimationCSS);

    dropdownMenuAnimatedToggle($dropdownMenu, animationCSS, callbackFunction);
  }

  /**
   * Close dropdown
   */
  function closeDropdown($parent) {
    var $dropdownMenu = $parent.find('> .sidebar-navigation-dropdown-menu');
    var animationCSS = { height: 0, opacity: 0.1 };
    var callbackFunction = function callbackFunction() {

      // Remove all active class' from dropdown menu and all child elements with active states
      $dropdownMenu.removeClass('active').attr('style', '').find('.active:not(a)').removeClass('active').attr('style', '');

      $dropdownMenu.removeClass('active-trail').attr('style', '').find('.active-trail:not(a)').removeClass('active-trail').attr('style', '');
    };

    $parent.removeClass('active').removeClass('active-trail');

    dropdownMenuAnimatedToggle($dropdownMenu, animationCSS, callbackFunction);
  }

  /**
   * Close all dropdown menus
   */
  function closeAllDropdownMenus($parent) {
    $parent.siblings('.sidebar-navigation-dropdown.active, .sidebar-navigation-dropdown.active-trail').each(function () {
      var $element = $(this);

      closeDropdown($element);
    });
  }

  /**
   * Dropdown menu animated toggle
   */
  function dropdownMenuAnimatedToggle($dropdownMenu, animationCSS, callbackFunction) {
    $dropdownMenu.animate(animationCSS, {
      duration: 400,
      easing: 'easeOutSine',
      complete: callbackFunction
    });
  }

  return pub;
}(jQuery);
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

;(function () {
	'use strict';

	/**
  * @preserve FastClick: polyfill to remove click delays on browsers with touch UIs.
  *
  * @codingstandard ftlabs-jsv2
  * @copyright The Financial Times Limited [All Rights Reserved]
  * @license MIT License (see LICENSE.txt)
  */

	/*jslint browser:true, node:true*/
	/*global define, Event, Node*/

	/**
  * Instantiate fast-clicking listeners on the specified layer.
  *
  * @constructor
  * @param {Element} layer The layer to listen on
  * @param {Object} [options={}] The options to override the defaults
  */

	function FastClick(layer, options) {
		var oldOnClick;

		options = options || {};

		/**
   * Whether a click is currently being tracked.
   *
   * @type boolean
   */
		this.trackingClick = false;

		/**
   * Timestamp for when click tracking started.
   *
   * @type number
   */
		this.trackingClickStart = 0;

		/**
   * The element being tracked for a click.
   *
   * @type EventTarget
   */
		this.targetElement = null;

		/**
   * X-coordinate of touch start event.
   *
   * @type number
   */
		this.touchStartX = 0;

		/**
   * Y-coordinate of touch start event.
   *
   * @type number
   */
		this.touchStartY = 0;

		/**
   * ID of the last touch, retrieved from Touch.identifier.
   *
   * @type number
   */
		this.lastTouchIdentifier = 0;

		/**
   * Touchmove boundary, beyond which a click will be cancelled.
   *
   * @type number
   */
		this.touchBoundary = options.touchBoundary || 10;

		/**
   * The FastClick layer.
   *
   * @type Element
   */
		this.layer = layer;

		/**
   * The minimum time between tap(touchstart and touchend) events
   *
   * @type number
   */
		this.tapDelay = options.tapDelay || 200;

		/**
   * The maximum time for a tap
   *
   * @type number
   */
		this.tapTimeout = options.tapTimeout || 700;

		if (FastClick.notNeeded(layer)) {
			return;
		}

		// Some old versions of Android don't have Function.prototype.bind
		function bind(method, context) {
			return function () {
				return method.apply(context, arguments);
			};
		}

		var methods = ['onMouse', 'onClick', 'onTouchStart', 'onTouchMove', 'onTouchEnd', 'onTouchCancel'];
		var context = this;
		for (var i = 0, l = methods.length; i < l; i++) {
			context[methods[i]] = bind(context[methods[i]], context);
		}

		// Set up event handlers as required
		if (deviceIsAndroid) {
			layer.addEventListener('mouseover', this.onMouse, true);
			layer.addEventListener('mousedown', this.onMouse, true);
			layer.addEventListener('mouseup', this.onMouse, true);
		}

		layer.addEventListener('click', this.onClick, true);
		layer.addEventListener('touchstart', this.onTouchStart, false);
		layer.addEventListener('touchmove', this.onTouchMove, false);
		layer.addEventListener('touchend', this.onTouchEnd, false);
		layer.addEventListener('touchcancel', this.onTouchCancel, false);

		// Hack is required for browsers that don't support Event#stopImmediatePropagation (e.g. Android 2)
		// which is how FastClick normally stops click events bubbling to callbacks registered on the FastClick
		// layer when they are cancelled.
		if (!Event.prototype.stopImmediatePropagation) {
			layer.removeEventListener = function (type, callback, capture) {
				var rmv = Node.prototype.removeEventListener;
				if (type === 'click') {
					rmv.call(layer, type, callback.hijacked || callback, capture);
				} else {
					rmv.call(layer, type, callback, capture);
				}
			};

			layer.addEventListener = function (type, callback, capture) {
				var adv = Node.prototype.addEventListener;
				if (type === 'click') {
					adv.call(layer, type, callback.hijacked || (callback.hijacked = function (event) {
						if (!event.propagationStopped) {
							callback(event);
						}
					}), capture);
				} else {
					adv.call(layer, type, callback, capture);
				}
			};
		}

		// If a handler is already declared in the element's onclick attribute, it will be fired before
		// FastClick's onClick handler. Fix this by pulling out the user-defined handler function and
		// adding it as listener.
		if (typeof layer.onclick === 'function') {

			// Android browser on at least 3.2 requires a new reference to the function in layer.onclick
			// - the old one won't work if passed to addEventListener directly.
			oldOnClick = layer.onclick;
			layer.addEventListener('click', function (event) {
				oldOnClick(event);
			}, false);
			layer.onclick = null;
		}
	}

	/**
 * Windows Phone 8.1 fakes user agent string to look like Android and iPhone.
 *
 * @type boolean
 */
	var deviceIsWindowsPhone = navigator.userAgent.indexOf("Windows Phone") >= 0;

	/**
  * Android requires exceptions.
  *
  * @type boolean
  */
	var deviceIsAndroid = navigator.userAgent.indexOf('Android') > 0 && !deviceIsWindowsPhone;

	/**
  * iOS requires exceptions.
  *
  * @type boolean
  */
	var deviceIsIOS = /iP(ad|hone|od)/.test(navigator.userAgent) && !deviceIsWindowsPhone;

	/**
  * iOS 4 requires an exception for select elements.
  *
  * @type boolean
  */
	var deviceIsIOS4 = deviceIsIOS && /OS 4_\d(_\d)?/.test(navigator.userAgent);

	/**
  * iOS 6.0-7.* requires the target element to be manually derived
  *
  * @type boolean
  */
	var deviceIsIOSWithBadTarget = deviceIsIOS && /OS [6-7]_\d/.test(navigator.userAgent);

	/**
  * BlackBerry requires exceptions.
  *
  * @type boolean
  */
	var deviceIsBlackBerry10 = navigator.userAgent.indexOf('BB10') > 0;

	/**
  * Determine whether a given element requires a native click.
  *
  * @param {EventTarget|Element} target Target DOM element
  * @returns {boolean} Returns true if the element needs a native click
  */
	FastClick.prototype.needsClick = function (target) {
		switch (target.nodeName.toLowerCase()) {

			// Don't send a synthetic click to disabled inputs (issue #62)
			case 'button':
			case 'select':
			case 'textarea':
				if (target.disabled) {
					return true;
				}

				break;
			case 'input':

				// File inputs need real clicks on iOS 6 due to a browser bug (issue #68)
				if (deviceIsIOS && target.type === 'file' || target.disabled) {
					return true;
				}

				break;
			case 'label':
			case 'iframe': // iOS8 homescreen apps can prevent events bubbling into frames
			case 'video':
				return true;
		}

		return (/\bneedsclick\b/.test(target.className)
		);
	};

	/**
  * Determine whether a given element requires a call to focus to simulate click into element.
  *
  * @param {EventTarget|Element} target Target DOM element
  * @returns {boolean} Returns true if the element requires a call to focus to simulate native click.
  */
	FastClick.prototype.needsFocus = function (target) {
		switch (target.nodeName.toLowerCase()) {
			case 'textarea':
				return true;
			case 'select':
				return !deviceIsAndroid;
			case 'input':
				switch (target.type) {
					case 'button':
					case 'checkbox':
					case 'file':
					case 'image':
					case 'radio':
					case 'submit':
						return false;
				}

				// No point in attempting to focus disabled inputs
				return !target.disabled && !target.readOnly;
			default:
				return (/\bneedsfocus\b/.test(target.className)
				);
		}
	};

	/**
  * Send a click event to the specified element.
  *
  * @param {EventTarget|Element} targetElement
  * @param {Event} event
  */
	FastClick.prototype.sendClick = function (targetElement, event) {
		var clickEvent, touch;

		// On some Android devices activeElement needs to be blurred otherwise the synthetic click will have no effect (#24)
		if (document.activeElement && document.activeElement !== targetElement) {
			document.activeElement.blur();
		}

		touch = event.changedTouches[0];

		// Synthesise a click event, with an extra attribute so it can be tracked
		clickEvent = document.createEvent('MouseEvents');
		clickEvent.initMouseEvent(this.determineEventType(targetElement), true, true, window, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY, false, false, false, false, 0, null);
		clickEvent.forwardedTouchEvent = true;
		targetElement.dispatchEvent(clickEvent);
	};

	FastClick.prototype.determineEventType = function (targetElement) {

		//Issue #159: Android Chrome Select Box does not open with a synthetic click event
		if (deviceIsAndroid && targetElement.tagName.toLowerCase() === 'select') {
			return 'mousedown';
		}

		return 'click';
	};

	/**
  * @param {EventTarget|Element} targetElement
  */
	FastClick.prototype.focus = function (targetElement) {
		var length;

		// Issue #160: on iOS 7, some input elements (e.g. date datetime month) throw a vague TypeError on setSelectionRange. These elements don't have an integer value for the selectionStart and selectionEnd properties, but unfortunately that can't be used for detection because accessing the properties also throws a TypeError. Just check the type instead. Filed as Apple bug #15122724.
		if (deviceIsIOS && targetElement.setSelectionRange && targetElement.type.indexOf('date') !== 0 && targetElement.type !== 'time' && targetElement.type !== 'month') {
			length = targetElement.value.length;
			targetElement.setSelectionRange(length, length);
		} else {
			targetElement.focus();
		}
	};

	/**
  * Check whether the given target element is a child of a scrollable layer and if so, set a flag on it.
  *
  * @param {EventTarget|Element} targetElement
  */
	FastClick.prototype.updateScrollParent = function (targetElement) {
		var scrollParent, parentElement;

		scrollParent = targetElement.fastClickScrollParent;

		// Attempt to discover whether the target element is contained within a scrollable layer. Re-check if the
		// target element was moved to another parent.
		if (!scrollParent || !scrollParent.contains(targetElement)) {
			parentElement = targetElement;
			do {
				if (parentElement.scrollHeight > parentElement.offsetHeight) {
					scrollParent = parentElement;
					targetElement.fastClickScrollParent = parentElement;
					break;
				}

				parentElement = parentElement.parentElement;
			} while (parentElement);
		}

		// Always update the scroll top tracker if possible.
		if (scrollParent) {
			scrollParent.fastClickLastScrollTop = scrollParent.scrollTop;
		}
	};

	/**
  * @param {EventTarget} targetElement
  * @returns {Element|EventTarget}
  */
	FastClick.prototype.getTargetElementFromEventTarget = function (eventTarget) {

		// On some older browsers (notably Safari on iOS 4.1 - see issue #56) the event target may be a text node.
		if (eventTarget.nodeType === Node.TEXT_NODE) {
			return eventTarget.parentNode;
		}

		return eventTarget;
	};

	/**
  * On touch start, record the position and scroll offset.
  *
  * @param {Event} event
  * @returns {boolean}
  */
	FastClick.prototype.onTouchStart = function (event) {
		var targetElement, touch, selection;

		// Ignore multiple touches, otherwise pinch-to-zoom is prevented if both fingers are on the FastClick element (issue #111).
		if (event.targetTouches.length > 1) {
			return true;
		}

		targetElement = this.getTargetElementFromEventTarget(event.target);
		touch = event.targetTouches[0];

		if (deviceIsIOS) {

			// Only trusted events will deselect text on iOS (issue #49)
			selection = window.getSelection();
			if (selection.rangeCount && !selection.isCollapsed) {
				return true;
			}

			if (!deviceIsIOS4) {

				// Weird things happen on iOS when an alert or confirm dialog is opened from a click event callback (issue #23):
				// when the user next taps anywhere else on the page, new touchstart and touchend events are dispatched
				// with the same identifier as the touch event that previously triggered the click that triggered the alert.
				// Sadly, there is an issue on iOS 4 that causes some normal touch events to have the same identifier as an
				// immediately preceeding touch event (issue #52), so this fix is unavailable on that platform.
				// Issue 120: touch.identifier is 0 when Chrome dev tools 'Emulate touch events' is set with an iOS device UA string,
				// which causes all touch events to be ignored. As this block only applies to iOS, and iOS identifiers are always long,
				// random integers, it's safe to to continue if the identifier is 0 here.
				if (touch.identifier && touch.identifier === this.lastTouchIdentifier) {
					event.preventDefault();
					return false;
				}

				this.lastTouchIdentifier = touch.identifier;

				// If the target element is a child of a scrollable layer (using -webkit-overflow-scrolling: touch) and:
				// 1) the user does a fling scroll on the scrollable layer
				// 2) the user stops the fling scroll with another tap
				// then the event.target of the last 'touchend' event will be the element that was under the user's finger
				// when the fling scroll was started, causing FastClick to send a click event to that layer - unless a check
				// is made to ensure that a parent layer was not scrolled before sending a synthetic click (issue #42).
				this.updateScrollParent(targetElement);
			}
		}

		this.trackingClick = true;
		this.trackingClickStart = event.timeStamp;
		this.targetElement = targetElement;

		this.touchStartX = touch.pageX;
		this.touchStartY = touch.pageY;

		// Prevent phantom clicks on fast double-tap (issue #36)
		if (event.timeStamp - this.lastClickTime < this.tapDelay) {
			event.preventDefault();
		}

		return true;
	};

	/**
  * Based on a touchmove event object, check whether the touch has moved past a boundary since it started.
  *
  * @param {Event} event
  * @returns {boolean}
  */
	FastClick.prototype.touchHasMoved = function (event) {
		var touch = event.changedTouches[0],
		    boundary = this.touchBoundary;

		if (Math.abs(touch.pageX - this.touchStartX) > boundary || Math.abs(touch.pageY - this.touchStartY) > boundary) {
			return true;
		}

		return false;
	};

	/**
  * Update the last position.
  *
  * @param {Event} event
  * @returns {boolean}
  */
	FastClick.prototype.onTouchMove = function (event) {
		if (!this.trackingClick) {
			return true;
		}

		// If the touch has moved, cancel the click tracking
		if (this.targetElement !== this.getTargetElementFromEventTarget(event.target) || this.touchHasMoved(event)) {
			this.trackingClick = false;
			this.targetElement = null;
		}

		return true;
	};

	/**
  * Attempt to find the labelled control for the given label element.
  *
  * @param {EventTarget|HTMLLabelElement} labelElement
  * @returns {Element|null}
  */
	FastClick.prototype.findControl = function (labelElement) {

		// Fast path for newer browsers supporting the HTML5 control attribute
		if (labelElement.control !== undefined) {
			return labelElement.control;
		}

		// All browsers under test that support touch events also support the HTML5 htmlFor attribute
		if (labelElement.htmlFor) {
			return document.getElementById(labelElement.htmlFor);
		}

		// If no for attribute exists, attempt to retrieve the first labellable descendant element
		// the list of which is defined here: http://www.w3.org/TR/html5/forms.html#category-label
		return labelElement.querySelector('button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea');
	};

	/**
  * On touch end, determine whether to send a click event at once.
  *
  * @param {Event} event
  * @returns {boolean}
  */
	FastClick.prototype.onTouchEnd = function (event) {
		var forElement,
		    trackingClickStart,
		    targetTagName,
		    scrollParent,
		    touch,
		    targetElement = this.targetElement;

		if (!this.trackingClick) {
			return true;
		}

		// Prevent phantom clicks on fast double-tap (issue #36)
		if (event.timeStamp - this.lastClickTime < this.tapDelay) {
			this.cancelNextClick = true;
			return true;
		}

		if (event.timeStamp - this.trackingClickStart > this.tapTimeout) {
			return true;
		}

		// Reset to prevent wrong click cancel on input (issue #156).
		this.cancelNextClick = false;

		this.lastClickTime = event.timeStamp;

		trackingClickStart = this.trackingClickStart;
		this.trackingClick = false;
		this.trackingClickStart = 0;

		// On some iOS devices, the targetElement supplied with the event is invalid if the layer
		// is performing a transition or scroll, and has to be re-detected manually. Note that
		// for this to function correctly, it must be called *after* the event target is checked!
		// See issue #57; also filed as rdar://13048589 .
		if (deviceIsIOSWithBadTarget) {
			touch = event.changedTouches[0];

			// In certain cases arguments of elementFromPoint can be negative, so prevent setting targetElement to null
			targetElement = document.elementFromPoint(touch.pageX - window.pageXOffset, touch.pageY - window.pageYOffset) || targetElement;
			targetElement.fastClickScrollParent = this.targetElement.fastClickScrollParent;
		}

		targetTagName = targetElement.tagName.toLowerCase();
		if (targetTagName === 'label') {
			forElement = this.findControl(targetElement);
			if (forElement) {
				this.focus(targetElement);
				if (deviceIsAndroid) {
					return false;
				}

				targetElement = forElement;
			}
		} else if (this.needsFocus(targetElement)) {

			// Case 1: If the touch started a while ago (best guess is 100ms based on tests for issue #36) then focus will be triggered anyway. Return early and unset the target element reference so that the subsequent click will be allowed through.
			// Case 2: Without this exception for input elements tapped when the document is contained in an iframe, then any inputted text won't be visible even though the value attribute is updated as the user types (issue #37).
			if (event.timeStamp - trackingClickStart > 100 || deviceIsIOS && window.top !== window && targetTagName === 'input') {
				this.targetElement = null;
				return false;
			}

			this.focus(targetElement);
			this.sendClick(targetElement, event);

			// Select elements need the event to go through on iOS 4, otherwise the selector menu won't open.
			// Also this breaks opening selects when VoiceOver is active on iOS6, iOS7 (and possibly others)
			if (!deviceIsIOS || targetTagName !== 'select') {
				this.targetElement = null;
				event.preventDefault();
			}

			return false;
		}

		if (deviceIsIOS && !deviceIsIOS4) {

			// Don't send a synthetic click event if the target element is contained within a parent layer that was scrolled
			// and this tap is being used to stop the scrolling (usually initiated by a fling - issue #42).
			scrollParent = targetElement.fastClickScrollParent;
			if (scrollParent && scrollParent.fastClickLastScrollTop !== scrollParent.scrollTop) {
				return true;
			}
		}

		// Prevent the actual click from going though - unless the target node is marked as requiring
		// real clicks or if it is in the whitelist in which case only non-programmatic clicks are permitted.
		if (!this.needsClick(targetElement)) {
			event.preventDefault();
			this.sendClick(targetElement, event);
		}

		return false;
	};

	/**
  * On touch cancel, stop tracking the click.
  *
  * @returns {void}
  */
	FastClick.prototype.onTouchCancel = function () {
		this.trackingClick = false;
		this.targetElement = null;
	};

	/**
  * Determine mouse events which should be permitted.
  *
  * @param {Event} event
  * @returns {boolean}
  */
	FastClick.prototype.onMouse = function (event) {

		// If a target element was never set (because a touch event was never fired) allow the event
		if (!this.targetElement) {
			return true;
		}

		if (event.forwardedTouchEvent) {
			return true;
		}

		// Programmatically generated events targeting a specific element should be permitted
		if (!event.cancelable) {
			return true;
		}

		// Derive and check the target element to see whether the mouse event needs to be permitted;
		// unless explicitly enabled, prevent non-touch click events from triggering actions,
		// to prevent ghost/doubleclicks.
		if (!this.needsClick(this.targetElement) || this.cancelNextClick) {

			// Prevent any user-added listeners declared on FastClick element from being fired.
			if (event.stopImmediatePropagation) {
				event.stopImmediatePropagation();
			} else {

				// Part of the hack for browsers that don't support Event#stopImmediatePropagation (e.g. Android 2)
				event.propagationStopped = true;
			}

			// Cancel the event
			event.stopPropagation();
			event.preventDefault();

			return false;
		}

		// If the mouse event is permitted, return true for the action to go through.
		return true;
	};

	/**
  * On actual clicks, determine whether this is a touch-generated click, a click action occurring
  * naturally after a delay after a touch (which needs to be cancelled to avoid duplication), or
  * an actual click which should be permitted.
  *
  * @param {Event} event
  * @returns {boolean}
  */
	FastClick.prototype.onClick = function (event) {
		var permitted;

		// It's possible for another FastClick-like library delivered with third-party code to fire a click event before FastClick does (issue #44). In that case, set the click-tracking flag back to false and return early. This will cause onTouchEnd to return early.
		if (this.trackingClick) {
			this.targetElement = null;
			this.trackingClick = false;
			return true;
		}

		// Very odd behaviour on iOS (issue #18): if a submit element is present inside a form and the user hits enter in the iOS simulator or clicks the Go button on the pop-up OS keyboard the a kind of 'fake' click event will be triggered with the submit-type input element as the target.
		if (event.target.type === 'submit' && event.detail === 0) {
			return true;
		}

		permitted = this.onMouse(event);

		// Only unset targetElement if the click is not permitted. This will ensure that the check for !targetElement in onMouse fails and the browser's click doesn't go through.
		if (!permitted) {
			this.targetElement = null;
		}

		// If clicks are permitted, return true for the action to go through.
		return permitted;
	};

	/**
  * Remove all FastClick's event listeners.
  *
  * @returns {void}
  */
	FastClick.prototype.destroy = function () {
		var layer = this.layer;

		if (deviceIsAndroid) {
			layer.removeEventListener('mouseover', this.onMouse, true);
			layer.removeEventListener('mousedown', this.onMouse, true);
			layer.removeEventListener('mouseup', this.onMouse, true);
		}

		layer.removeEventListener('click', this.onClick, true);
		layer.removeEventListener('touchstart', this.onTouchStart, false);
		layer.removeEventListener('touchmove', this.onTouchMove, false);
		layer.removeEventListener('touchend', this.onTouchEnd, false);
		layer.removeEventListener('touchcancel', this.onTouchCancel, false);
	};

	/**
  * Check whether FastClick is needed.
  *
  * @param {Element} layer The layer to listen on
  */
	FastClick.notNeeded = function (layer) {
		var metaViewport;
		var chromeVersion;
		var blackberryVersion;
		var firefoxVersion;

		// Devices that don't support touch don't need FastClick
		if (typeof window.ontouchstart === 'undefined') {
			return true;
		}

		// Chrome version - zero for other browsers
		chromeVersion = +(/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1];

		if (chromeVersion) {

			if (deviceIsAndroid) {
				metaViewport = document.querySelector('meta[name=viewport]');

				if (metaViewport) {
					// Chrome on Android with user-scalable="no" doesn't need FastClick (issue #89)
					if (metaViewport.content.indexOf('user-scalable=no') !== -1) {
						return true;
					}
					// Chrome 32 and above with width=device-width or less don't need FastClick
					if (chromeVersion > 31 && document.documentElement.scrollWidth <= window.outerWidth) {
						return true;
					}
				}

				// Chrome desktop doesn't need FastClick (issue #15)
			} else {
				return true;
			}
		}

		if (deviceIsBlackBerry10) {
			blackberryVersion = navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/);

			// BlackBerry 10.3+ does not require Fastclick library.
			// https://github.com/ftlabs/fastclick/issues/251
			if (blackberryVersion[1] >= 10 && blackberryVersion[2] >= 3) {
				metaViewport = document.querySelector('meta[name=viewport]');

				if (metaViewport) {
					// user-scalable=no eliminates click delay.
					if (metaViewport.content.indexOf('user-scalable=no') !== -1) {
						return true;
					}
					// width=device-width (or less than device-width) eliminates click delay.
					if (document.documentElement.scrollWidth <= window.outerWidth) {
						return true;
					}
				}
			}
		}

		// IE10 with -ms-touch-action: none or manipulation, which disables double-tap-to-zoom (issue #97)
		if (layer.style.msTouchAction === 'none' || layer.style.touchAction === 'manipulation') {
			return true;
		}

		// Firefox version - zero for other browsers
		firefoxVersion = +(/Firefox\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1];

		if (firefoxVersion >= 27) {
			// Firefox 27+ does not have tap delay if the content is not zoomable - https://bugzilla.mozilla.org/show_bug.cgi?id=922896

			metaViewport = document.querySelector('meta[name=viewport]');
			if (metaViewport && (metaViewport.content.indexOf('user-scalable=no') !== -1 || document.documentElement.scrollWidth <= window.outerWidth)) {
				return true;
			}
		}

		// IE11: prefixed -ms-touch-action is no longer supported and it's recomended to use non-prefixed version
		// http://msdn.microsoft.com/en-us/library/windows/apps/Hh767313.aspx
		if (layer.style.touchAction === 'none' || layer.style.touchAction === 'manipulation') {
			return true;
		}

		return false;
	};

	/**
  * Factory method for creating a FastClick object
  *
  * @param {Element} layer The layer to listen on
  * @param {Object} [options={}] The options to override the defaults
  */
	FastClick.attach = function (layer, options) {
		return new FastClick(layer, options);
	};

	if (typeof define === 'function' && _typeof(define.amd) === 'object' && define.amd) {

		// AMD. Register as an anonymous module.
		define(function () {
			return FastClick;
		});
	} else if (typeof module !== 'undefined' && module.exports) {
		module.exports = FastClick.attach;
		module.exports.FastClick = FastClick;
	} else {
		window.FastClick = FastClick;
	}
})();
'use strict';

// Document ready
(function ($) {
  'use strict';

  // Enable BS3 designer

  bs3Designer.init();

  // Enable BS3 sidebar
  bs3Sidebar.init();
})(jQuery);
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJvb3RzdHJhcC5qcyIsImJzMy1kZXNpZ25lci5qcyIsImJzMy1zaWRlYmFyLmpzIiwiZmFzdGNsaWNrLmpzIiwiaW5pdC5qcyJdLCJuYW1lcyI6WyJqUXVlcnkiLCJFcnJvciIsIiQiLCJ2ZXJzaW9uIiwiZm4iLCJqcXVlcnkiLCJzcGxpdCIsInRyYW5zaXRpb25FbmQiLCJlbCIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsInRyYW5zRW5kRXZlbnROYW1lcyIsIldlYmtpdFRyYW5zaXRpb24iLCJNb3pUcmFuc2l0aW9uIiwiT1RyYW5zaXRpb24iLCJ0cmFuc2l0aW9uIiwibmFtZSIsInN0eWxlIiwidW5kZWZpbmVkIiwiZW5kIiwiZW11bGF0ZVRyYW5zaXRpb25FbmQiLCJkdXJhdGlvbiIsImNhbGxlZCIsIiRlbCIsIm9uZSIsImNhbGxiYWNrIiwidHJpZ2dlciIsInN1cHBvcnQiLCJzZXRUaW1lb3V0IiwiZXZlbnQiLCJzcGVjaWFsIiwiYnNUcmFuc2l0aW9uRW5kIiwiYmluZFR5cGUiLCJkZWxlZ2F0ZVR5cGUiLCJoYW5kbGUiLCJlIiwidGFyZ2V0IiwiaXMiLCJoYW5kbGVPYmoiLCJoYW5kbGVyIiwiYXBwbHkiLCJhcmd1bWVudHMiLCJkaXNtaXNzIiwiQWxlcnQiLCJvbiIsImNsb3NlIiwiVkVSU0lPTiIsIlRSQU5TSVRJT05fRFVSQVRJT04iLCJwcm90b3R5cGUiLCIkdGhpcyIsInNlbGVjdG9yIiwiYXR0ciIsInJlcGxhY2UiLCIkcGFyZW50IiwicHJldmVudERlZmF1bHQiLCJsZW5ndGgiLCJjbG9zZXN0IiwiRXZlbnQiLCJpc0RlZmF1bHRQcmV2ZW50ZWQiLCJyZW1vdmVDbGFzcyIsInJlbW92ZUVsZW1lbnQiLCJkZXRhY2giLCJyZW1vdmUiLCJoYXNDbGFzcyIsIlBsdWdpbiIsIm9wdGlvbiIsImVhY2giLCJkYXRhIiwiY2FsbCIsIm9sZCIsImFsZXJ0IiwiQ29uc3RydWN0b3IiLCJub0NvbmZsaWN0IiwiQnV0dG9uIiwiZWxlbWVudCIsIm9wdGlvbnMiLCIkZWxlbWVudCIsImV4dGVuZCIsIkRFRkFVTFRTIiwiaXNMb2FkaW5nIiwibG9hZGluZ1RleHQiLCJzZXRTdGF0ZSIsInN0YXRlIiwiZCIsInZhbCIsInJlc2V0VGV4dCIsInByb3h5IiwiYWRkQ2xhc3MiLCJwcm9wIiwicmVtb3ZlQXR0ciIsInRvZ2dsZSIsImNoYW5nZWQiLCIkaW5wdXQiLCJmaW5kIiwidG9nZ2xlQ2xhc3MiLCJidXR0b24iLCIkYnRuIiwiZmlyc3QiLCJ0ZXN0IiwidHlwZSIsIkNhcm91c2VsIiwiJGluZGljYXRvcnMiLCJwYXVzZWQiLCJzbGlkaW5nIiwiaW50ZXJ2YWwiLCIkYWN0aXZlIiwiJGl0ZW1zIiwia2V5Ym9hcmQiLCJrZXlkb3duIiwicGF1c2UiLCJkb2N1bWVudEVsZW1lbnQiLCJjeWNsZSIsIndyYXAiLCJ0YWdOYW1lIiwid2hpY2giLCJwcmV2IiwibmV4dCIsImNsZWFySW50ZXJ2YWwiLCJzZXRJbnRlcnZhbCIsImdldEl0ZW1JbmRleCIsIml0ZW0iLCJwYXJlbnQiLCJjaGlsZHJlbiIsImluZGV4IiwiZ2V0SXRlbUZvckRpcmVjdGlvbiIsImRpcmVjdGlvbiIsImFjdGl2ZSIsImFjdGl2ZUluZGV4Iiwid2lsbFdyYXAiLCJkZWx0YSIsIml0ZW1JbmRleCIsImVxIiwidG8iLCJwb3MiLCJ0aGF0Iiwic2xpZGUiLCIkbmV4dCIsImlzQ3ljbGluZyIsInJlbGF0ZWRUYXJnZXQiLCJzbGlkZUV2ZW50IiwiJG5leHRJbmRpY2F0b3IiLCJzbGlkRXZlbnQiLCJvZmZzZXRXaWR0aCIsImpvaW4iLCJhY3Rpb24iLCJjYXJvdXNlbCIsImNsaWNrSGFuZGxlciIsImhyZWYiLCIkdGFyZ2V0Iiwic2xpZGVJbmRleCIsIndpbmRvdyIsIiRjYXJvdXNlbCIsIkNvbGxhcHNlIiwiJHRyaWdnZXIiLCJpZCIsInRyYW5zaXRpb25pbmciLCJnZXRQYXJlbnQiLCJhZGRBcmlhQW5kQ29sbGFwc2VkQ2xhc3MiLCJkaW1lbnNpb24iLCJoYXNXaWR0aCIsInNob3ciLCJhY3RpdmVzRGF0YSIsImFjdGl2ZXMiLCJzdGFydEV2ZW50IiwiY29tcGxldGUiLCJzY3JvbGxTaXplIiwiY2FtZWxDYXNlIiwiaGlkZSIsIm9mZnNldEhlaWdodCIsImkiLCJnZXRUYXJnZXRGcm9tVHJpZ2dlciIsImlzT3BlbiIsImNvbGxhcHNlIiwiYmFja2Ryb3AiLCJEcm9wZG93biIsImNsZWFyTWVudXMiLCJjb250YWlucyIsImlzQWN0aXZlIiwiaW5zZXJ0QWZ0ZXIiLCJzdG9wUHJvcGFnYXRpb24iLCJkZXNjIiwiZHJvcGRvd24iLCJNb2RhbCIsIiRib2R5IiwiYm9keSIsIiRkaWFsb2ciLCIkYmFja2Ryb3AiLCJpc1Nob3duIiwib3JpZ2luYWxCb2R5UGFkIiwic2Nyb2xsYmFyV2lkdGgiLCJpZ25vcmVCYWNrZHJvcENsaWNrIiwicmVtb3RlIiwibG9hZCIsIkJBQ0tEUk9QX1RSQU5TSVRJT05fRFVSQVRJT04iLCJfcmVsYXRlZFRhcmdldCIsImNoZWNrU2Nyb2xsYmFyIiwic2V0U2Nyb2xsYmFyIiwiZXNjYXBlIiwicmVzaXplIiwiYXBwZW5kVG8iLCJzY3JvbGxUb3AiLCJhZGp1c3REaWFsb2ciLCJlbmZvcmNlRm9jdXMiLCJvZmYiLCJoaWRlTW9kYWwiLCJoYXMiLCJoYW5kbGVVcGRhdGUiLCJyZXNldEFkanVzdG1lbnRzIiwicmVzZXRTY3JvbGxiYXIiLCJyZW1vdmVCYWNrZHJvcCIsImFuaW1hdGUiLCJkb0FuaW1hdGUiLCJjdXJyZW50VGFyZ2V0IiwiZm9jdXMiLCJjYWxsYmFja1JlbW92ZSIsIm1vZGFsSXNPdmVyZmxvd2luZyIsInNjcm9sbEhlaWdodCIsImNsaWVudEhlaWdodCIsImNzcyIsInBhZGRpbmdMZWZ0IiwiYm9keUlzT3ZlcmZsb3dpbmciLCJwYWRkaW5nUmlnaHQiLCJmdWxsV2luZG93V2lkdGgiLCJpbm5lcldpZHRoIiwiZG9jdW1lbnRFbGVtZW50UmVjdCIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsInJpZ2h0IiwiTWF0aCIsImFicyIsImxlZnQiLCJjbGllbnRXaWR0aCIsIm1lYXN1cmVTY3JvbGxiYXIiLCJib2R5UGFkIiwicGFyc2VJbnQiLCJzY3JvbGxEaXYiLCJjbGFzc05hbWUiLCJhcHBlbmQiLCJyZW1vdmVDaGlsZCIsIm1vZGFsIiwic2hvd0V2ZW50IiwiVG9vbHRpcCIsImVuYWJsZWQiLCJ0aW1lb3V0IiwiaG92ZXJTdGF0ZSIsImluU3RhdGUiLCJpbml0IiwiYW5pbWF0aW9uIiwicGxhY2VtZW50IiwidGVtcGxhdGUiLCJ0aXRsZSIsImRlbGF5IiwiaHRtbCIsImNvbnRhaW5lciIsInZpZXdwb3J0IiwicGFkZGluZyIsImdldE9wdGlvbnMiLCIkdmlld3BvcnQiLCJpc0Z1bmN0aW9uIiwiY2xpY2siLCJob3ZlciIsImNvbnN0cnVjdG9yIiwidHJpZ2dlcnMiLCJldmVudEluIiwiZXZlbnRPdXQiLCJlbnRlciIsImxlYXZlIiwiX29wdGlvbnMiLCJmaXhUaXRsZSIsImdldERlZmF1bHRzIiwiZ2V0RGVsZWdhdGVPcHRpb25zIiwiZGVmYXVsdHMiLCJrZXkiLCJ2YWx1ZSIsIm9iaiIsInNlbGYiLCJ0aXAiLCJjbGVhclRpbWVvdXQiLCJpc0luU3RhdGVUcnVlIiwiaGFzQ29udGVudCIsImluRG9tIiwib3duZXJEb2N1bWVudCIsIiR0aXAiLCJ0aXBJZCIsImdldFVJRCIsInNldENvbnRlbnQiLCJhdXRvVG9rZW4iLCJhdXRvUGxhY2UiLCJ0b3AiLCJkaXNwbGF5IiwiZ2V0UG9zaXRpb24iLCJhY3R1YWxXaWR0aCIsImFjdHVhbEhlaWdodCIsIm9yZ1BsYWNlbWVudCIsInZpZXdwb3J0RGltIiwiYm90dG9tIiwid2lkdGgiLCJjYWxjdWxhdGVkT2Zmc2V0IiwiZ2V0Q2FsY3VsYXRlZE9mZnNldCIsImFwcGx5UGxhY2VtZW50IiwicHJldkhvdmVyU3RhdGUiLCJvZmZzZXQiLCJoZWlnaHQiLCJtYXJnaW5Ub3AiLCJtYXJnaW5MZWZ0IiwiaXNOYU4iLCJzZXRPZmZzZXQiLCJ1c2luZyIsInByb3BzIiwicm91bmQiLCJnZXRWaWV3cG9ydEFkanVzdGVkRGVsdGEiLCJpc1ZlcnRpY2FsIiwiYXJyb3dEZWx0YSIsImFycm93T2Zmc2V0UG9zaXRpb24iLCJyZXBsYWNlQXJyb3ciLCJhcnJvdyIsImdldFRpdGxlIiwiJGUiLCJpc0JvZHkiLCJlbFJlY3QiLCJpc1N2ZyIsIlNWR0VsZW1lbnQiLCJlbE9mZnNldCIsInNjcm9sbCIsIm91dGVyRGltcyIsInZpZXdwb3J0UGFkZGluZyIsInZpZXdwb3J0RGltZW5zaW9ucyIsInRvcEVkZ2VPZmZzZXQiLCJib3R0b21FZGdlT2Zmc2V0IiwibGVmdEVkZ2VPZmZzZXQiLCJyaWdodEVkZ2VPZmZzZXQiLCJvIiwicHJlZml4IiwicmFuZG9tIiwiZ2V0RWxlbWVudEJ5SWQiLCIkYXJyb3ciLCJlbmFibGUiLCJkaXNhYmxlIiwidG9nZ2xlRW5hYmxlZCIsImRlc3Ryb3kiLCJyZW1vdmVEYXRhIiwidG9vbHRpcCIsIlBvcG92ZXIiLCJjb250ZW50IiwiZ2V0Q29udGVudCIsInBvcG92ZXIiLCJTY3JvbGxTcHkiLCIkc2Nyb2xsRWxlbWVudCIsIm9mZnNldHMiLCJ0YXJnZXRzIiwiYWN0aXZlVGFyZ2V0IiwicHJvY2VzcyIsInJlZnJlc2giLCJnZXRTY3JvbGxIZWlnaHQiLCJtYXgiLCJvZmZzZXRNZXRob2QiLCJvZmZzZXRCYXNlIiwiaXNXaW5kb3ciLCJtYXAiLCIkaHJlZiIsInNvcnQiLCJhIiwiYiIsInB1c2giLCJtYXhTY3JvbGwiLCJhY3RpdmF0ZSIsImNsZWFyIiwicGFyZW50cyIsInBhcmVudHNVbnRpbCIsInNjcm9sbHNweSIsIiRzcHkiLCJUYWIiLCIkdWwiLCIkcHJldmlvdXMiLCJoaWRlRXZlbnQiLCJ0YWIiLCJBZmZpeCIsImNoZWNrUG9zaXRpb24iLCJjaGVja1Bvc2l0aW9uV2l0aEV2ZW50TG9vcCIsImFmZml4ZWQiLCJ1bnBpbiIsInBpbm5lZE9mZnNldCIsIlJFU0VUIiwiZ2V0U3RhdGUiLCJvZmZzZXRUb3AiLCJvZmZzZXRCb3R0b20iLCJwb3NpdGlvbiIsInRhcmdldEhlaWdodCIsImluaXRpYWxpemluZyIsImNvbGxpZGVyVG9wIiwiY29sbGlkZXJIZWlnaHQiLCJnZXRQaW5uZWRPZmZzZXQiLCJhZmZpeCIsImFmZml4VHlwZSIsImJzM0Rlc2lnbmVyIiwiTW9kZXJuaXpyIiwicHViIiwicmVnaXN0ZXJCb290RXZlbnRIYW5kbGVycyIsInJlZ2lzdGVyRXZlbnRIYW5kbGVycyIsInRvdWNoIiwiZm9vdGVyQXR0YWNoZWQiLCJvcHRpbWl6ZUZvcm1FbGVtZW50cyIsImFwcGVhciIsImJzM1Rvb2x0aXAiLCJpY29uU3BpbiIsIiRmb290ZXIiLCJmb290ZXJIZWlnaHQiLCJvdXRlckhlaWdodCIsIiRhcHBlYXIiLCIkYW5pbWF0aW9uIiwiY3NzYW5pbWF0aW9ucyIsImZvcmNlX3Byb2Nlc3MiLCJiczNTaWRlYmFyIiwidG9nZ2xlU2lkZWJhciIsInRvZ2dsZURyb3Bkb3duIiwiYXR0cmlidXRlIiwicGFyZW50SXNBY3RpdmUiLCJjbG9zZURyb3Bkb3duIiwib3BlbkRyb3Bkb3duIiwiJGRyb3Bkb3duTWVudSIsImRyb3Bkb3duTWVudUhlaWdodCIsInByZUFuaW1hdGlvbkNTUyIsIm9wYWNpdHkiLCJhbmltYXRpb25DU1MiLCJjYWxsYmFja0Z1bmN0aW9uIiwiY2xvc2VBbGxEcm9wZG93bk1lbnVzIiwiZHJvcGRvd25NZW51QW5pbWF0ZWRUb2dnbGUiLCJzaWJsaW5ncyIsImVhc2luZyIsIkZhc3RDbGljayIsImxheWVyIiwib2xkT25DbGljayIsInRyYWNraW5nQ2xpY2siLCJ0cmFja2luZ0NsaWNrU3RhcnQiLCJ0YXJnZXRFbGVtZW50IiwidG91Y2hTdGFydFgiLCJ0b3VjaFN0YXJ0WSIsImxhc3RUb3VjaElkZW50aWZpZXIiLCJ0b3VjaEJvdW5kYXJ5IiwidGFwRGVsYXkiLCJ0YXBUaW1lb3V0Iiwibm90TmVlZGVkIiwiYmluZCIsIm1ldGhvZCIsImNvbnRleHQiLCJtZXRob2RzIiwibCIsImRldmljZUlzQW5kcm9pZCIsImFkZEV2ZW50TGlzdGVuZXIiLCJvbk1vdXNlIiwib25DbGljayIsIm9uVG91Y2hTdGFydCIsIm9uVG91Y2hNb3ZlIiwib25Ub3VjaEVuZCIsIm9uVG91Y2hDYW5jZWwiLCJzdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24iLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiY2FwdHVyZSIsInJtdiIsIk5vZGUiLCJoaWphY2tlZCIsImFkdiIsInByb3BhZ2F0aW9uU3RvcHBlZCIsIm9uY2xpY2siLCJkZXZpY2VJc1dpbmRvd3NQaG9uZSIsIm5hdmlnYXRvciIsInVzZXJBZ2VudCIsImluZGV4T2YiLCJkZXZpY2VJc0lPUyIsImRldmljZUlzSU9TNCIsImRldmljZUlzSU9TV2l0aEJhZFRhcmdldCIsImRldmljZUlzQmxhY2tCZXJyeTEwIiwibmVlZHNDbGljayIsIm5vZGVOYW1lIiwidG9Mb3dlckNhc2UiLCJkaXNhYmxlZCIsIm5lZWRzRm9jdXMiLCJyZWFkT25seSIsInNlbmRDbGljayIsImNsaWNrRXZlbnQiLCJhY3RpdmVFbGVtZW50IiwiYmx1ciIsImNoYW5nZWRUb3VjaGVzIiwiY3JlYXRlRXZlbnQiLCJpbml0TW91c2VFdmVudCIsImRldGVybWluZUV2ZW50VHlwZSIsInNjcmVlblgiLCJzY3JlZW5ZIiwiY2xpZW50WCIsImNsaWVudFkiLCJmb3J3YXJkZWRUb3VjaEV2ZW50IiwiZGlzcGF0Y2hFdmVudCIsInNldFNlbGVjdGlvblJhbmdlIiwidXBkYXRlU2Nyb2xsUGFyZW50Iiwic2Nyb2xsUGFyZW50IiwicGFyZW50RWxlbWVudCIsImZhc3RDbGlja1Njcm9sbFBhcmVudCIsImZhc3RDbGlja0xhc3RTY3JvbGxUb3AiLCJnZXRUYXJnZXRFbGVtZW50RnJvbUV2ZW50VGFyZ2V0IiwiZXZlbnRUYXJnZXQiLCJub2RlVHlwZSIsIlRFWFRfTk9ERSIsInBhcmVudE5vZGUiLCJzZWxlY3Rpb24iLCJ0YXJnZXRUb3VjaGVzIiwiZ2V0U2VsZWN0aW9uIiwicmFuZ2VDb3VudCIsImlzQ29sbGFwc2VkIiwiaWRlbnRpZmllciIsInRpbWVTdGFtcCIsInBhZ2VYIiwicGFnZVkiLCJsYXN0Q2xpY2tUaW1lIiwidG91Y2hIYXNNb3ZlZCIsImJvdW5kYXJ5IiwiZmluZENvbnRyb2wiLCJsYWJlbEVsZW1lbnQiLCJjb250cm9sIiwiaHRtbEZvciIsInF1ZXJ5U2VsZWN0b3IiLCJmb3JFbGVtZW50IiwidGFyZ2V0VGFnTmFtZSIsImNhbmNlbE5leHRDbGljayIsImVsZW1lbnRGcm9tUG9pbnQiLCJwYWdlWE9mZnNldCIsInBhZ2VZT2Zmc2V0IiwiY2FuY2VsYWJsZSIsInBlcm1pdHRlZCIsImRldGFpbCIsIm1ldGFWaWV3cG9ydCIsImNocm9tZVZlcnNpb24iLCJibGFja2JlcnJ5VmVyc2lvbiIsImZpcmVmb3hWZXJzaW9uIiwib250b3VjaHN0YXJ0IiwiZXhlYyIsInNjcm9sbFdpZHRoIiwib3V0ZXJXaWR0aCIsIm1hdGNoIiwibXNUb3VjaEFjdGlvbiIsInRvdWNoQWN0aW9uIiwiYXR0YWNoIiwiZGVmaW5lIiwiYW1kIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7OztBQUFBOzs7Ozs7QUFNQSxJQUFJLE9BQU9BLE1BQVAsS0FBa0IsV0FBdEIsRUFBbUM7QUFDakMsUUFBTSxJQUFJQyxLQUFKLENBQVUseUNBQVYsQ0FBTjtBQUNEOztBQUVELENBQUMsVUFBVUMsQ0FBVixFQUFhO0FBQ1o7O0FBQ0EsTUFBSUMsVUFBVUQsRUFBRUUsRUFBRixDQUFLQyxNQUFMLENBQVlDLEtBQVosQ0FBa0IsR0FBbEIsRUFBdUIsQ0FBdkIsRUFBMEJBLEtBQTFCLENBQWdDLEdBQWhDLENBQWQ7QUFDQSxNQUFLSCxRQUFRLENBQVIsSUFBYSxDQUFiLElBQWtCQSxRQUFRLENBQVIsSUFBYSxDQUFoQyxJQUF1Q0EsUUFBUSxDQUFSLEtBQWMsQ0FBZCxJQUFtQkEsUUFBUSxDQUFSLEtBQWMsQ0FBakMsSUFBc0NBLFFBQVEsQ0FBUixJQUFhLENBQTFGLElBQWlHQSxRQUFRLENBQVIsSUFBYSxDQUFsSCxFQUFzSDtBQUNwSCxVQUFNLElBQUlGLEtBQUosQ0FBVSwyRkFBVixDQUFOO0FBQ0Q7QUFDRixDQU5B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MWEsQ0FBVixFQUFhO0FBQ1o7O0FBRUE7O0FBQ0F1WSxjQUFZcEosSUFBWjs7QUFFQTtBQUNBc0ssYUFBV3RLLElBQVg7QUFFRCxDQVRELEVBU0dyUCxNQVRIIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIVxuICogQm9vdHN0cmFwIHYzLjMuNyAoaHR0cDovL2dldGJvb3RzdHJhcC5jb20pXG4gKiBDb3B5cmlnaHQgMjAxMS0yMDE2IFR3aXR0ZXIsIEluYy5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZVxuICovXG5cbmlmICh0eXBlb2YgalF1ZXJ5ID09PSAndW5kZWZpbmVkJykge1xuICB0aHJvdyBuZXcgRXJyb3IoJ0Jvb3RzdHJhcFxcJ3MgSmF2YVNjcmlwdCByZXF1aXJlcyBqUXVlcnknKVxufVxuXG4rZnVuY3Rpb24gKCQpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICB2YXIgdmVyc2lvbiA9ICQuZm4uanF1ZXJ5LnNwbGl0KCcgJylbMF0uc3BsaXQoJy4nKVxuICBpZiAoKHZlcnNpb25bMF0gPCAyICYmIHZlcnNpb25bMV0gPCA5KSB8fCAodmVyc2lvblswXSA9PSAxICYmIHZlcnNpb25bMV0gPT0gOSAmJiB2ZXJzaW9uWzJdIDwgMSkgfHwgKHZlcnNpb25bMF0gPiAzKSkge1xuICAgIHRocm93IG5ldyBFcnJvcignQm9vdHN0cmFwXFwncyBKYXZhU2NyaXB0IHJlcXVpcmVzIGpRdWVyeSB2ZXJzaW9uIDEuOS4xIG9yIGhpZ2hlciwgYnV0IGxvd2VyIHRoYW4gdmVyc2lvbiA0JylcbiAgfVxufShqUXVlcnkpO1xuXG4vKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqIEJvb3RzdHJhcDogdHJhbnNpdGlvbi5qcyB2My4zLjdcbiAqIGh0dHA6Ly9nZXRib290c3RyYXAuY29tL2phdmFzY3JpcHQvI3RyYW5zaXRpb25zXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqIENvcHlyaWdodCAyMDExLTIwMTYgVHdpdHRlciwgSW5jLlxuICogTGljZW5zZWQgdW5kZXIgTUlUIChodHRwczovL2dpdGh1Yi5jb20vdHdicy9ib290c3RyYXAvYmxvYi9tYXN0ZXIvTElDRU5TRSlcbiAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXG5cbitmdW5jdGlvbiAoJCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgLy8gQ1NTIFRSQU5TSVRJT04gU1VQUE9SVCAoU2hvdXRvdXQ6IGh0dHA6Ly93d3cubW9kZXJuaXpyLmNvbS8pXG4gIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4gIGZ1bmN0aW9uIHRyYW5zaXRpb25FbmQoKSB7XG4gICAgdmFyIGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYm9vdHN0cmFwJylcblxuICAgIHZhciB0cmFuc0VuZEV2ZW50TmFtZXMgPSB7XG4gICAgICBXZWJraXRUcmFuc2l0aW9uIDogJ3dlYmtpdFRyYW5zaXRpb25FbmQnLFxuICAgICAgTW96VHJhbnNpdGlvbiAgICA6ICd0cmFuc2l0aW9uZW5kJyxcbiAgICAgIE9UcmFuc2l0aW9uICAgICAgOiAnb1RyYW5zaXRpb25FbmQgb3RyYW5zaXRpb25lbmQnLFxuICAgICAgdHJhbnNpdGlvbiAgICAgICA6ICd0cmFuc2l0aW9uZW5kJ1xuICAgIH1cblxuICAgIGZvciAodmFyIG5hbWUgaW4gdHJhbnNFbmRFdmVudE5hbWVzKSB7XG4gICAgICBpZiAoZWwuc3R5bGVbbmFtZV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4geyBlbmQ6IHRyYW5zRW5kRXZlbnROYW1lc1tuYW1lXSB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlIC8vIGV4cGxpY2l0IGZvciBpZTggKCAgLl8uKVxuICB9XG5cbiAgLy8gaHR0cDovL2Jsb2cuYWxleG1hY2Nhdy5jb20vY3NzLXRyYW5zaXRpb25zXG4gICQuZm4uZW11bGF0ZVRyYW5zaXRpb25FbmQgPSBmdW5jdGlvbiAoZHVyYXRpb24pIHtcbiAgICB2YXIgY2FsbGVkID0gZmFsc2VcbiAgICB2YXIgJGVsID0gdGhpc1xuICAgICQodGhpcykub25lKCdic1RyYW5zaXRpb25FbmQnLCBmdW5jdGlvbiAoKSB7IGNhbGxlZCA9IHRydWUgfSlcbiAgICB2YXIgY2FsbGJhY2sgPSBmdW5jdGlvbiAoKSB7IGlmICghY2FsbGVkKSAkKCRlbCkudHJpZ2dlcigkLnN1cHBvcnQudHJhbnNpdGlvbi5lbmQpIH1cbiAgICBzZXRUaW1lb3V0KGNhbGxiYWNrLCBkdXJhdGlvbilcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgJChmdW5jdGlvbiAoKSB7XG4gICAgJC5zdXBwb3J0LnRyYW5zaXRpb24gPSB0cmFuc2l0aW9uRW5kKClcblxuICAgIGlmICghJC5zdXBwb3J0LnRyYW5zaXRpb24pIHJldHVyblxuXG4gICAgJC5ldmVudC5zcGVjaWFsLmJzVHJhbnNpdGlvbkVuZCA9IHtcbiAgICAgIGJpbmRUeXBlOiAkLnN1cHBvcnQudHJhbnNpdGlvbi5lbmQsXG4gICAgICBkZWxlZ2F0ZVR5cGU6ICQuc3VwcG9ydC50cmFuc2l0aW9uLmVuZCxcbiAgICAgIGhhbmRsZTogZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgaWYgKCQoZS50YXJnZXQpLmlzKHRoaXMpKSByZXR1cm4gZS5oYW5kbGVPYmouaGFuZGxlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpXG4gICAgICB9XG4gICAgfVxuICB9KVxuXG59KGpRdWVyeSk7XG5cbi8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICogQm9vdHN0cmFwOiBhbGVydC5qcyB2My4zLjdcbiAqIGh0dHA6Ly9nZXRib290c3RyYXAuY29tL2phdmFzY3JpcHQvI2FsZXJ0c1xuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKiBDb3B5cmlnaHQgMjAxMS0yMDE2IFR3aXR0ZXIsIEluYy5cbiAqIExpY2Vuc2VkIHVuZGVyIE1JVCAoaHR0cHM6Ly9naXRodWIuY29tL3R3YnMvYm9vdHN0cmFwL2Jsb2IvbWFzdGVyL0xJQ0VOU0UpXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuXG4rZnVuY3Rpb24gKCQpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIC8vIEFMRVJUIENMQVNTIERFRklOSVRJT05cbiAgLy8gPT09PT09PT09PT09PT09PT09PT09PVxuXG4gIHZhciBkaXNtaXNzID0gJ1tkYXRhLWRpc21pc3M9XCJhbGVydFwiXSdcbiAgdmFyIEFsZXJ0ICAgPSBmdW5jdGlvbiAoZWwpIHtcbiAgICAkKGVsKS5vbignY2xpY2snLCBkaXNtaXNzLCB0aGlzLmNsb3NlKVxuICB9XG5cbiAgQWxlcnQuVkVSU0lPTiA9ICczLjMuNydcblxuICBBbGVydC5UUkFOU0lUSU9OX0RVUkFUSU9OID0gMTUwXG5cbiAgQWxlcnQucHJvdG90eXBlLmNsb3NlID0gZnVuY3Rpb24gKGUpIHtcbiAgICB2YXIgJHRoaXMgICAgPSAkKHRoaXMpXG4gICAgdmFyIHNlbGVjdG9yID0gJHRoaXMuYXR0cignZGF0YS10YXJnZXQnKVxuXG4gICAgaWYgKCFzZWxlY3Rvcikge1xuICAgICAgc2VsZWN0b3IgPSAkdGhpcy5hdHRyKCdocmVmJylcbiAgICAgIHNlbGVjdG9yID0gc2VsZWN0b3IgJiYgc2VsZWN0b3IucmVwbGFjZSgvLiooPz0jW15cXHNdKiQpLywgJycpIC8vIHN0cmlwIGZvciBpZTdcbiAgICB9XG5cbiAgICB2YXIgJHBhcmVudCA9ICQoc2VsZWN0b3IgPT09ICcjJyA/IFtdIDogc2VsZWN0b3IpXG5cbiAgICBpZiAoZSkgZS5wcmV2ZW50RGVmYXVsdCgpXG5cbiAgICBpZiAoISRwYXJlbnQubGVuZ3RoKSB7XG4gICAgICAkcGFyZW50ID0gJHRoaXMuY2xvc2VzdCgnLmFsZXJ0JylcbiAgICB9XG5cbiAgICAkcGFyZW50LnRyaWdnZXIoZSA9ICQuRXZlbnQoJ2Nsb3NlLmJzLmFsZXJ0JykpXG5cbiAgICBpZiAoZS5pc0RlZmF1bHRQcmV2ZW50ZWQoKSkgcmV0dXJuXG5cbiAgICAkcGFyZW50LnJlbW92ZUNsYXNzKCdpbicpXG5cbiAgICBmdW5jdGlvbiByZW1vdmVFbGVtZW50KCkge1xuICAgICAgLy8gZGV0YWNoIGZyb20gcGFyZW50LCBmaXJlIGV2ZW50IHRoZW4gY2xlYW4gdXAgZGF0YVxuICAgICAgJHBhcmVudC5kZXRhY2goKS50cmlnZ2VyKCdjbG9zZWQuYnMuYWxlcnQnKS5yZW1vdmUoKVxuICAgIH1cblxuICAgICQuc3VwcG9ydC50cmFuc2l0aW9uICYmICRwYXJlbnQuaGFzQ2xhc3MoJ2ZhZGUnKSA/XG4gICAgICAkcGFyZW50XG4gICAgICAgIC5vbmUoJ2JzVHJhbnNpdGlvbkVuZCcsIHJlbW92ZUVsZW1lbnQpXG4gICAgICAgIC5lbXVsYXRlVHJhbnNpdGlvbkVuZChBbGVydC5UUkFOU0lUSU9OX0RVUkFUSU9OKSA6XG4gICAgICByZW1vdmVFbGVtZW50KClcbiAgfVxuXG5cbiAgLy8gQUxFUlQgUExVR0lOIERFRklOSVRJT05cbiAgLy8gPT09PT09PT09PT09PT09PT09PT09PT1cblxuICBmdW5jdGlvbiBQbHVnaW4ob3B0aW9uKSB7XG4gICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgJHRoaXMgPSAkKHRoaXMpXG4gICAgICB2YXIgZGF0YSAgPSAkdGhpcy5kYXRhKCdicy5hbGVydCcpXG5cbiAgICAgIGlmICghZGF0YSkgJHRoaXMuZGF0YSgnYnMuYWxlcnQnLCAoZGF0YSA9IG5ldyBBbGVydCh0aGlzKSkpXG4gICAgICBpZiAodHlwZW9mIG9wdGlvbiA9PSAnc3RyaW5nJykgZGF0YVtvcHRpb25dLmNhbGwoJHRoaXMpXG4gICAgfSlcbiAgfVxuXG4gIHZhciBvbGQgPSAkLmZuLmFsZXJ0XG5cbiAgJC5mbi5hbGVydCAgICAgICAgICAgICA9IFBsdWdpblxuICAkLmZuLmFsZXJ0LkNvbnN0cnVjdG9yID0gQWxlcnRcblxuXG4gIC8vIEFMRVJUIE5PIENPTkZMSUNUXG4gIC8vID09PT09PT09PT09PT09PT09XG5cbiAgJC5mbi5hbGVydC5ub0NvbmZsaWN0ID0gZnVuY3Rpb24gKCkge1xuICAgICQuZm4uYWxlcnQgPSBvbGRcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cblxuICAvLyBBTEVSVCBEQVRBLUFQSVxuICAvLyA9PT09PT09PT09PT09PVxuXG4gICQoZG9jdW1lbnQpLm9uKCdjbGljay5icy5hbGVydC5kYXRhLWFwaScsIGRpc21pc3MsIEFsZXJ0LnByb3RvdHlwZS5jbG9zZSlcblxufShqUXVlcnkpO1xuXG4vKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqIEJvb3RzdHJhcDogYnV0dG9uLmpzIHYzLjMuN1xuICogaHR0cDovL2dldGJvb3RzdHJhcC5jb20vamF2YXNjcmlwdC8jYnV0dG9uc1xuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKiBDb3B5cmlnaHQgMjAxMS0yMDE2IFR3aXR0ZXIsIEluYy5cbiAqIExpY2Vuc2VkIHVuZGVyIE1JVCAoaHR0cHM6Ly9naXRodWIuY29tL3R3YnMvYm9vdHN0cmFwL2Jsb2IvbWFzdGVyL0xJQ0VOU0UpXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuXG4rZnVuY3Rpb24gKCQpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIC8vIEJVVFRPTiBQVUJMSUMgQ0xBU1MgREVGSU5JVElPTlxuICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuICB2YXIgQnV0dG9uID0gZnVuY3Rpb24gKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICB0aGlzLiRlbGVtZW50ICA9ICQoZWxlbWVudClcbiAgICB0aGlzLm9wdGlvbnMgICA9ICQuZXh0ZW5kKHt9LCBCdXR0b24uREVGQVVMVFMsIG9wdGlvbnMpXG4gICAgdGhpcy5pc0xvYWRpbmcgPSBmYWxzZVxuICB9XG5cbiAgQnV0dG9uLlZFUlNJT04gID0gJzMuMy43J1xuXG4gIEJ1dHRvbi5ERUZBVUxUUyA9IHtcbiAgICBsb2FkaW5nVGV4dDogJ2xvYWRpbmcuLi4nXG4gIH1cblxuICBCdXR0b24ucHJvdG90eXBlLnNldFN0YXRlID0gZnVuY3Rpb24gKHN0YXRlKSB7XG4gICAgdmFyIGQgICAgPSAnZGlzYWJsZWQnXG4gICAgdmFyICRlbCAgPSB0aGlzLiRlbGVtZW50XG4gICAgdmFyIHZhbCAgPSAkZWwuaXMoJ2lucHV0JykgPyAndmFsJyA6ICdodG1sJ1xuICAgIHZhciBkYXRhID0gJGVsLmRhdGEoKVxuXG4gICAgc3RhdGUgKz0gJ1RleHQnXG5cbiAgICBpZiAoZGF0YS5yZXNldFRleHQgPT0gbnVsbCkgJGVsLmRhdGEoJ3Jlc2V0VGV4dCcsICRlbFt2YWxdKCkpXG5cbiAgICAvLyBwdXNoIHRvIGV2ZW50IGxvb3AgdG8gYWxsb3cgZm9ybXMgdG8gc3VibWl0XG4gICAgc2V0VGltZW91dCgkLnByb3h5KGZ1bmN0aW9uICgpIHtcbiAgICAgICRlbFt2YWxdKGRhdGFbc3RhdGVdID09IG51bGwgPyB0aGlzLm9wdGlvbnNbc3RhdGVdIDogZGF0YVtzdGF0ZV0pXG5cbiAgICAgIGlmIChzdGF0ZSA9PSAnbG9hZGluZ1RleHQnKSB7XG4gICAgICAgIHRoaXMuaXNMb2FkaW5nID0gdHJ1ZVxuICAgICAgICAkZWwuYWRkQ2xhc3MoZCkuYXR0cihkLCBkKS5wcm9wKGQsIHRydWUpXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuaXNMb2FkaW5nKSB7XG4gICAgICAgIHRoaXMuaXNMb2FkaW5nID0gZmFsc2VcbiAgICAgICAgJGVsLnJlbW92ZUNsYXNzKGQpLnJlbW92ZUF0dHIoZCkucHJvcChkLCBmYWxzZSlcbiAgICAgIH1cbiAgICB9LCB0aGlzKSwgMClcbiAgfVxuXG4gIEJ1dHRvbi5wcm90b3R5cGUudG9nZ2xlID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBjaGFuZ2VkID0gdHJ1ZVxuICAgIHZhciAkcGFyZW50ID0gdGhpcy4kZWxlbWVudC5jbG9zZXN0KCdbZGF0YS10b2dnbGU9XCJidXR0b25zXCJdJylcblxuICAgIGlmICgkcGFyZW50Lmxlbmd0aCkge1xuICAgICAgdmFyICRpbnB1dCA9IHRoaXMuJGVsZW1lbnQuZmluZCgnaW5wdXQnKVxuICAgICAgaWYgKCRpbnB1dC5wcm9wKCd0eXBlJykgPT0gJ3JhZGlvJykge1xuICAgICAgICBpZiAoJGlucHV0LnByb3AoJ2NoZWNrZWQnKSkgY2hhbmdlZCA9IGZhbHNlXG4gICAgICAgICRwYXJlbnQuZmluZCgnLmFjdGl2ZScpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKVxuICAgICAgICB0aGlzLiRlbGVtZW50LmFkZENsYXNzKCdhY3RpdmUnKVxuICAgICAgfSBlbHNlIGlmICgkaW5wdXQucHJvcCgndHlwZScpID09ICdjaGVja2JveCcpIHtcbiAgICAgICAgaWYgKCgkaW5wdXQucHJvcCgnY2hlY2tlZCcpKSAhPT0gdGhpcy4kZWxlbWVudC5oYXNDbGFzcygnYWN0aXZlJykpIGNoYW5nZWQgPSBmYWxzZVxuICAgICAgICB0aGlzLiRlbGVtZW50LnRvZ2dsZUNsYXNzKCdhY3RpdmUnKVxuICAgICAgfVxuICAgICAgJGlucHV0LnByb3AoJ2NoZWNrZWQnLCB0aGlzLiRlbGVtZW50Lmhhc0NsYXNzKCdhY3RpdmUnKSlcbiAgICAgIGlmIChjaGFuZ2VkKSAkaW5wdXQudHJpZ2dlcignY2hhbmdlJylcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy4kZWxlbWVudC5hdHRyKCdhcmlhLXByZXNzZWQnLCAhdGhpcy4kZWxlbWVudC5oYXNDbGFzcygnYWN0aXZlJykpXG4gICAgICB0aGlzLiRlbGVtZW50LnRvZ2dsZUNsYXNzKCdhY3RpdmUnKVxuICAgIH1cbiAgfVxuXG5cbiAgLy8gQlVUVE9OIFBMVUdJTiBERUZJTklUSU9OXG4gIC8vID09PT09PT09PT09PT09PT09PT09PT09PVxuXG4gIGZ1bmN0aW9uIFBsdWdpbihvcHRpb24pIHtcbiAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciAkdGhpcyAgID0gJCh0aGlzKVxuICAgICAgdmFyIGRhdGEgICAgPSAkdGhpcy5kYXRhKCdicy5idXR0b24nKVxuICAgICAgdmFyIG9wdGlvbnMgPSB0eXBlb2Ygb3B0aW9uID09ICdvYmplY3QnICYmIG9wdGlvblxuXG4gICAgICBpZiAoIWRhdGEpICR0aGlzLmRhdGEoJ2JzLmJ1dHRvbicsIChkYXRhID0gbmV3IEJ1dHRvbih0aGlzLCBvcHRpb25zKSkpXG5cbiAgICAgIGlmIChvcHRpb24gPT0gJ3RvZ2dsZScpIGRhdGEudG9nZ2xlKClcbiAgICAgIGVsc2UgaWYgKG9wdGlvbikgZGF0YS5zZXRTdGF0ZShvcHRpb24pXG4gICAgfSlcbiAgfVxuXG4gIHZhciBvbGQgPSAkLmZuLmJ1dHRvblxuXG4gICQuZm4uYnV0dG9uICAgICAgICAgICAgID0gUGx1Z2luXG4gICQuZm4uYnV0dG9uLkNvbnN0cnVjdG9yID0gQnV0dG9uXG5cblxuICAvLyBCVVRUT04gTk8gQ09ORkxJQ1RcbiAgLy8gPT09PT09PT09PT09PT09PT09XG5cbiAgJC5mbi5idXR0b24ubm9Db25mbGljdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAkLmZuLmJ1dHRvbiA9IG9sZFxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuXG4gIC8vIEJVVFRPTiBEQVRBLUFQSVxuICAvLyA9PT09PT09PT09PT09PT1cblxuICAkKGRvY3VtZW50KVxuICAgIC5vbignY2xpY2suYnMuYnV0dG9uLmRhdGEtYXBpJywgJ1tkYXRhLXRvZ2dsZV49XCJidXR0b25cIl0nLCBmdW5jdGlvbiAoZSkge1xuICAgICAgdmFyICRidG4gPSAkKGUudGFyZ2V0KS5jbG9zZXN0KCcuYnRuJylcbiAgICAgIFBsdWdpbi5jYWxsKCRidG4sICd0b2dnbGUnKVxuICAgICAgaWYgKCEoJChlLnRhcmdldCkuaXMoJ2lucHV0W3R5cGU9XCJyYWRpb1wiXSwgaW5wdXRbdHlwZT1cImNoZWNrYm94XCJdJykpKSB7XG4gICAgICAgIC8vIFByZXZlbnQgZG91YmxlIGNsaWNrIG9uIHJhZGlvcywgYW5kIHRoZSBkb3VibGUgc2VsZWN0aW9ucyAoc28gY2FuY2VsbGF0aW9uKSBvbiBjaGVja2JveGVzXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgICAvLyBUaGUgdGFyZ2V0IGNvbXBvbmVudCBzdGlsbCByZWNlaXZlIHRoZSBmb2N1c1xuICAgICAgICBpZiAoJGJ0bi5pcygnaW5wdXQsYnV0dG9uJykpICRidG4udHJpZ2dlcignZm9jdXMnKVxuICAgICAgICBlbHNlICRidG4uZmluZCgnaW5wdXQ6dmlzaWJsZSxidXR0b246dmlzaWJsZScpLmZpcnN0KCkudHJpZ2dlcignZm9jdXMnKVxuICAgICAgfVxuICAgIH0pXG4gICAgLm9uKCdmb2N1cy5icy5idXR0b24uZGF0YS1hcGkgYmx1ci5icy5idXR0b24uZGF0YS1hcGknLCAnW2RhdGEtdG9nZ2xlXj1cImJ1dHRvblwiXScsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAkKGUudGFyZ2V0KS5jbG9zZXN0KCcuYnRuJykudG9nZ2xlQ2xhc3MoJ2ZvY3VzJywgL15mb2N1cyhpbik/JC8udGVzdChlLnR5cGUpKVxuICAgIH0pXG5cbn0oalF1ZXJ5KTtcblxuLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKiBCb290c3RyYXA6IGNhcm91c2VsLmpzIHYzLjMuN1xuICogaHR0cDovL2dldGJvb3RzdHJhcC5jb20vamF2YXNjcmlwdC8jY2Fyb3VzZWxcbiAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICogQ29weXJpZ2h0IDIwMTEtMjAxNiBUd2l0dGVyLCBJbmMuXG4gKiBMaWNlbnNlZCB1bmRlciBNSVQgKGh0dHBzOi8vZ2l0aHViLmNvbS90d2JzL2Jvb3RzdHJhcC9ibG9iL21hc3Rlci9MSUNFTlNFKVxuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5cblxuK2Z1bmN0aW9uICgkKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICAvLyBDQVJPVVNFTCBDTEFTUyBERUZJTklUSU9OXG4gIC8vID09PT09PT09PT09PT09PT09PT09PT09PT1cblxuICB2YXIgQ2Fyb3VzZWwgPSBmdW5jdGlvbiAoZWxlbWVudCwgb3B0aW9ucykge1xuICAgIHRoaXMuJGVsZW1lbnQgICAgPSAkKGVsZW1lbnQpXG4gICAgdGhpcy4kaW5kaWNhdG9ycyA9IHRoaXMuJGVsZW1lbnQuZmluZCgnLmNhcm91c2VsLWluZGljYXRvcnMnKVxuICAgIHRoaXMub3B0aW9ucyAgICAgPSBvcHRpb25zXG4gICAgdGhpcy5wYXVzZWQgICAgICA9IG51bGxcbiAgICB0aGlzLnNsaWRpbmcgICAgID0gbnVsbFxuICAgIHRoaXMuaW50ZXJ2YWwgICAgPSBudWxsXG4gICAgdGhpcy4kYWN0aXZlICAgICA9IG51bGxcbiAgICB0aGlzLiRpdGVtcyAgICAgID0gbnVsbFxuXG4gICAgdGhpcy5vcHRpb25zLmtleWJvYXJkICYmIHRoaXMuJGVsZW1lbnQub24oJ2tleWRvd24uYnMuY2Fyb3VzZWwnLCAkLnByb3h5KHRoaXMua2V5ZG93biwgdGhpcykpXG5cbiAgICB0aGlzLm9wdGlvbnMucGF1c2UgPT0gJ2hvdmVyJyAmJiAhKCdvbnRvdWNoc3RhcnQnIGluIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCkgJiYgdGhpcy4kZWxlbWVudFxuICAgICAgLm9uKCdtb3VzZWVudGVyLmJzLmNhcm91c2VsJywgJC5wcm94eSh0aGlzLnBhdXNlLCB0aGlzKSlcbiAgICAgIC5vbignbW91c2VsZWF2ZS5icy5jYXJvdXNlbCcsICQucHJveHkodGhpcy5jeWNsZSwgdGhpcykpXG4gIH1cblxuICBDYXJvdXNlbC5WRVJTSU9OICA9ICczLjMuNydcblxuICBDYXJvdXNlbC5UUkFOU0lUSU9OX0RVUkFUSU9OID0gNjAwXG5cbiAgQ2Fyb3VzZWwuREVGQVVMVFMgPSB7XG4gICAgaW50ZXJ2YWw6IDUwMDAsXG4gICAgcGF1c2U6ICdob3ZlcicsXG4gICAgd3JhcDogdHJ1ZSxcbiAgICBrZXlib2FyZDogdHJ1ZVxuICB9XG5cbiAgQ2Fyb3VzZWwucHJvdG90eXBlLmtleWRvd24gPSBmdW5jdGlvbiAoZSkge1xuICAgIGlmICgvaW5wdXR8dGV4dGFyZWEvaS50ZXN0KGUudGFyZ2V0LnRhZ05hbWUpKSByZXR1cm5cbiAgICBzd2l0Y2ggKGUud2hpY2gpIHtcbiAgICAgIGNhc2UgMzc6IHRoaXMucHJldigpOyBicmVha1xuICAgICAgY2FzZSAzOTogdGhpcy5uZXh0KCk7IGJyZWFrXG4gICAgICBkZWZhdWx0OiByZXR1cm5cbiAgICB9XG5cbiAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgfVxuXG4gIENhcm91c2VsLnByb3RvdHlwZS5jeWNsZSA9IGZ1bmN0aW9uIChlKSB7XG4gICAgZSB8fCAodGhpcy5wYXVzZWQgPSBmYWxzZSlcblxuICAgIHRoaXMuaW50ZXJ2YWwgJiYgY2xlYXJJbnRlcnZhbCh0aGlzLmludGVydmFsKVxuXG4gICAgdGhpcy5vcHRpb25zLmludGVydmFsXG4gICAgICAmJiAhdGhpcy5wYXVzZWRcbiAgICAgICYmICh0aGlzLmludGVydmFsID0gc2V0SW50ZXJ2YWwoJC5wcm94eSh0aGlzLm5leHQsIHRoaXMpLCB0aGlzLm9wdGlvbnMuaW50ZXJ2YWwpKVxuXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIENhcm91c2VsLnByb3RvdHlwZS5nZXRJdGVtSW5kZXggPSBmdW5jdGlvbiAoaXRlbSkge1xuICAgIHRoaXMuJGl0ZW1zID0gaXRlbS5wYXJlbnQoKS5jaGlsZHJlbignLml0ZW0nKVxuICAgIHJldHVybiB0aGlzLiRpdGVtcy5pbmRleChpdGVtIHx8IHRoaXMuJGFjdGl2ZSlcbiAgfVxuXG4gIENhcm91c2VsLnByb3RvdHlwZS5nZXRJdGVtRm9yRGlyZWN0aW9uID0gZnVuY3Rpb24gKGRpcmVjdGlvbiwgYWN0aXZlKSB7XG4gICAgdmFyIGFjdGl2ZUluZGV4ID0gdGhpcy5nZXRJdGVtSW5kZXgoYWN0aXZlKVxuICAgIHZhciB3aWxsV3JhcCA9IChkaXJlY3Rpb24gPT0gJ3ByZXYnICYmIGFjdGl2ZUluZGV4ID09PSAwKVxuICAgICAgICAgICAgICAgIHx8IChkaXJlY3Rpb24gPT0gJ25leHQnICYmIGFjdGl2ZUluZGV4ID09ICh0aGlzLiRpdGVtcy5sZW5ndGggLSAxKSlcbiAgICBpZiAod2lsbFdyYXAgJiYgIXRoaXMub3B0aW9ucy53cmFwKSByZXR1cm4gYWN0aXZlXG4gICAgdmFyIGRlbHRhID0gZGlyZWN0aW9uID09ICdwcmV2JyA/IC0xIDogMVxuICAgIHZhciBpdGVtSW5kZXggPSAoYWN0aXZlSW5kZXggKyBkZWx0YSkgJSB0aGlzLiRpdGVtcy5sZW5ndGhcbiAgICByZXR1cm4gdGhpcy4kaXRlbXMuZXEoaXRlbUluZGV4KVxuICB9XG5cbiAgQ2Fyb3VzZWwucHJvdG90eXBlLnRvID0gZnVuY3Rpb24gKHBvcykge1xuICAgIHZhciB0aGF0ICAgICAgICA9IHRoaXNcbiAgICB2YXIgYWN0aXZlSW5kZXggPSB0aGlzLmdldEl0ZW1JbmRleCh0aGlzLiRhY3RpdmUgPSB0aGlzLiRlbGVtZW50LmZpbmQoJy5pdGVtLmFjdGl2ZScpKVxuXG4gICAgaWYgKHBvcyA+ICh0aGlzLiRpdGVtcy5sZW5ndGggLSAxKSB8fCBwb3MgPCAwKSByZXR1cm5cblxuICAgIGlmICh0aGlzLnNsaWRpbmcpICAgICAgIHJldHVybiB0aGlzLiRlbGVtZW50Lm9uZSgnc2xpZC5icy5jYXJvdXNlbCcsIGZ1bmN0aW9uICgpIHsgdGhhdC50byhwb3MpIH0pIC8vIHllcywgXCJzbGlkXCJcbiAgICBpZiAoYWN0aXZlSW5kZXggPT0gcG9zKSByZXR1cm4gdGhpcy5wYXVzZSgpLmN5Y2xlKClcblxuICAgIHJldHVybiB0aGlzLnNsaWRlKHBvcyA+IGFjdGl2ZUluZGV4ID8gJ25leHQnIDogJ3ByZXYnLCB0aGlzLiRpdGVtcy5lcShwb3MpKVxuICB9XG5cbiAgQ2Fyb3VzZWwucHJvdG90eXBlLnBhdXNlID0gZnVuY3Rpb24gKGUpIHtcbiAgICBlIHx8ICh0aGlzLnBhdXNlZCA9IHRydWUpXG5cbiAgICBpZiAodGhpcy4kZWxlbWVudC5maW5kKCcubmV4dCwgLnByZXYnKS5sZW5ndGggJiYgJC5zdXBwb3J0LnRyYW5zaXRpb24pIHtcbiAgICAgIHRoaXMuJGVsZW1lbnQudHJpZ2dlcigkLnN1cHBvcnQudHJhbnNpdGlvbi5lbmQpXG4gICAgICB0aGlzLmN5Y2xlKHRydWUpXG4gICAgfVxuXG4gICAgdGhpcy5pbnRlcnZhbCA9IGNsZWFySW50ZXJ2YWwodGhpcy5pbnRlcnZhbClcblxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICBDYXJvdXNlbC5wcm90b3R5cGUubmV4dCA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodGhpcy5zbGlkaW5nKSByZXR1cm5cbiAgICByZXR1cm4gdGhpcy5zbGlkZSgnbmV4dCcpXG4gIH1cblxuICBDYXJvdXNlbC5wcm90b3R5cGUucHJldiA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodGhpcy5zbGlkaW5nKSByZXR1cm5cbiAgICByZXR1cm4gdGhpcy5zbGlkZSgncHJldicpXG4gIH1cblxuICBDYXJvdXNlbC5wcm90b3R5cGUuc2xpZGUgPSBmdW5jdGlvbiAodHlwZSwgbmV4dCkge1xuICAgIHZhciAkYWN0aXZlICAgPSB0aGlzLiRlbGVtZW50LmZpbmQoJy5pdGVtLmFjdGl2ZScpXG4gICAgdmFyICRuZXh0ICAgICA9IG5leHQgfHwgdGhpcy5nZXRJdGVtRm9yRGlyZWN0aW9uKHR5cGUsICRhY3RpdmUpXG4gICAgdmFyIGlzQ3ljbGluZyA9IHRoaXMuaW50ZXJ2YWxcbiAgICB2YXIgZGlyZWN0aW9uID0gdHlwZSA9PSAnbmV4dCcgPyAnbGVmdCcgOiAncmlnaHQnXG4gICAgdmFyIHRoYXQgICAgICA9IHRoaXNcblxuICAgIGlmICgkbmV4dC5oYXNDbGFzcygnYWN0aXZlJykpIHJldHVybiAodGhpcy5zbGlkaW5nID0gZmFsc2UpXG5cbiAgICB2YXIgcmVsYXRlZFRhcmdldCA9ICRuZXh0WzBdXG4gICAgdmFyIHNsaWRlRXZlbnQgPSAkLkV2ZW50KCdzbGlkZS5icy5jYXJvdXNlbCcsIHtcbiAgICAgIHJlbGF0ZWRUYXJnZXQ6IHJlbGF0ZWRUYXJnZXQsXG4gICAgICBkaXJlY3Rpb246IGRpcmVjdGlvblxuICAgIH0pXG4gICAgdGhpcy4kZWxlbWVudC50cmlnZ2VyKHNsaWRlRXZlbnQpXG4gICAgaWYgKHNsaWRlRXZlbnQuaXNEZWZhdWx0UHJldmVudGVkKCkpIHJldHVyblxuXG4gICAgdGhpcy5zbGlkaW5nID0gdHJ1ZVxuXG4gICAgaXNDeWNsaW5nICYmIHRoaXMucGF1c2UoKVxuXG4gICAgaWYgKHRoaXMuJGluZGljYXRvcnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLiRpbmRpY2F0b3JzLmZpbmQoJy5hY3RpdmUnKS5yZW1vdmVDbGFzcygnYWN0aXZlJylcbiAgICAgIHZhciAkbmV4dEluZGljYXRvciA9ICQodGhpcy4kaW5kaWNhdG9ycy5jaGlsZHJlbigpW3RoaXMuZ2V0SXRlbUluZGV4KCRuZXh0KV0pXG4gICAgICAkbmV4dEluZGljYXRvciAmJiAkbmV4dEluZGljYXRvci5hZGRDbGFzcygnYWN0aXZlJylcbiAgICB9XG5cbiAgICB2YXIgc2xpZEV2ZW50ID0gJC5FdmVudCgnc2xpZC5icy5jYXJvdXNlbCcsIHsgcmVsYXRlZFRhcmdldDogcmVsYXRlZFRhcmdldCwgZGlyZWN0aW9uOiBkaXJlY3Rpb24gfSkgLy8geWVzLCBcInNsaWRcIlxuICAgIGlmICgkLnN1cHBvcnQudHJhbnNpdGlvbiAmJiB0aGlzLiRlbGVtZW50Lmhhc0NsYXNzKCdzbGlkZScpKSB7XG4gICAgICAkbmV4dC5hZGRDbGFzcyh0eXBlKVxuICAgICAgJG5leHRbMF0ub2Zmc2V0V2lkdGggLy8gZm9yY2UgcmVmbG93XG4gICAgICAkYWN0aXZlLmFkZENsYXNzKGRpcmVjdGlvbilcbiAgICAgICRuZXh0LmFkZENsYXNzKGRpcmVjdGlvbilcbiAgICAgICRhY3RpdmVcbiAgICAgICAgLm9uZSgnYnNUcmFuc2l0aW9uRW5kJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICRuZXh0LnJlbW92ZUNsYXNzKFt0eXBlLCBkaXJlY3Rpb25dLmpvaW4oJyAnKSkuYWRkQ2xhc3MoJ2FjdGl2ZScpXG4gICAgICAgICAgJGFjdGl2ZS5yZW1vdmVDbGFzcyhbJ2FjdGl2ZScsIGRpcmVjdGlvbl0uam9pbignICcpKVxuICAgICAgICAgIHRoYXQuc2xpZGluZyA9IGZhbHNlXG4gICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGF0LiRlbGVtZW50LnRyaWdnZXIoc2xpZEV2ZW50KVxuICAgICAgICAgIH0sIDApXG4gICAgICAgIH0pXG4gICAgICAgIC5lbXVsYXRlVHJhbnNpdGlvbkVuZChDYXJvdXNlbC5UUkFOU0lUSU9OX0RVUkFUSU9OKVxuICAgIH0gZWxzZSB7XG4gICAgICAkYWN0aXZlLnJlbW92ZUNsYXNzKCdhY3RpdmUnKVxuICAgICAgJG5leHQuYWRkQ2xhc3MoJ2FjdGl2ZScpXG4gICAgICB0aGlzLnNsaWRpbmcgPSBmYWxzZVxuICAgICAgdGhpcy4kZWxlbWVudC50cmlnZ2VyKHNsaWRFdmVudClcbiAgICB9XG5cbiAgICBpc0N5Y2xpbmcgJiYgdGhpcy5jeWNsZSgpXG5cbiAgICByZXR1cm4gdGhpc1xuICB9XG5cblxuICAvLyBDQVJPVVNFTCBQTFVHSU4gREVGSU5JVElPTlxuICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4gIGZ1bmN0aW9uIFBsdWdpbihvcHRpb24pIHtcbiAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciAkdGhpcyAgID0gJCh0aGlzKVxuICAgICAgdmFyIGRhdGEgICAgPSAkdGhpcy5kYXRhKCdicy5jYXJvdXNlbCcpXG4gICAgICB2YXIgb3B0aW9ucyA9ICQuZXh0ZW5kKHt9LCBDYXJvdXNlbC5ERUZBVUxUUywgJHRoaXMuZGF0YSgpLCB0eXBlb2Ygb3B0aW9uID09ICdvYmplY3QnICYmIG9wdGlvbilcbiAgICAgIHZhciBhY3Rpb24gID0gdHlwZW9mIG9wdGlvbiA9PSAnc3RyaW5nJyA/IG9wdGlvbiA6IG9wdGlvbnMuc2xpZGVcblxuICAgICAgaWYgKCFkYXRhKSAkdGhpcy5kYXRhKCdicy5jYXJvdXNlbCcsIChkYXRhID0gbmV3IENhcm91c2VsKHRoaXMsIG9wdGlvbnMpKSlcbiAgICAgIGlmICh0eXBlb2Ygb3B0aW9uID09ICdudW1iZXInKSBkYXRhLnRvKG9wdGlvbilcbiAgICAgIGVsc2UgaWYgKGFjdGlvbikgZGF0YVthY3Rpb25dKClcbiAgICAgIGVsc2UgaWYgKG9wdGlvbnMuaW50ZXJ2YWwpIGRhdGEucGF1c2UoKS5jeWNsZSgpXG4gICAgfSlcbiAgfVxuXG4gIHZhciBvbGQgPSAkLmZuLmNhcm91c2VsXG5cbiAgJC5mbi5jYXJvdXNlbCAgICAgICAgICAgICA9IFBsdWdpblxuICAkLmZuLmNhcm91c2VsLkNvbnN0cnVjdG9yID0gQ2Fyb3VzZWxcblxuXG4gIC8vIENBUk9VU0VMIE5PIENPTkZMSUNUXG4gIC8vID09PT09PT09PT09PT09PT09PT09XG5cbiAgJC5mbi5jYXJvdXNlbC5ub0NvbmZsaWN0ID0gZnVuY3Rpb24gKCkge1xuICAgICQuZm4uY2Fyb3VzZWwgPSBvbGRcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cblxuICAvLyBDQVJPVVNFTCBEQVRBLUFQSVxuICAvLyA9PT09PT09PT09PT09PT09PVxuXG4gIHZhciBjbGlja0hhbmRsZXIgPSBmdW5jdGlvbiAoZSkge1xuICAgIHZhciBocmVmXG4gICAgdmFyICR0aGlzICAgPSAkKHRoaXMpXG4gICAgdmFyICR0YXJnZXQgPSAkKCR0aGlzLmF0dHIoJ2RhdGEtdGFyZ2V0JykgfHwgKGhyZWYgPSAkdGhpcy5hdHRyKCdocmVmJykpICYmIGhyZWYucmVwbGFjZSgvLiooPz0jW15cXHNdKyQpLywgJycpKSAvLyBzdHJpcCBmb3IgaWU3XG4gICAgaWYgKCEkdGFyZ2V0Lmhhc0NsYXNzKCdjYXJvdXNlbCcpKSByZXR1cm5cbiAgICB2YXIgb3B0aW9ucyA9ICQuZXh0ZW5kKHt9LCAkdGFyZ2V0LmRhdGEoKSwgJHRoaXMuZGF0YSgpKVxuICAgIHZhciBzbGlkZUluZGV4ID0gJHRoaXMuYXR0cignZGF0YS1zbGlkZS10bycpXG4gICAgaWYgKHNsaWRlSW5kZXgpIG9wdGlvbnMuaW50ZXJ2YWwgPSBmYWxzZVxuXG4gICAgUGx1Z2luLmNhbGwoJHRhcmdldCwgb3B0aW9ucylcblxuICAgIGlmIChzbGlkZUluZGV4KSB7XG4gICAgICAkdGFyZ2V0LmRhdGEoJ2JzLmNhcm91c2VsJykudG8oc2xpZGVJbmRleClcbiAgICB9XG5cbiAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgfVxuXG4gICQoZG9jdW1lbnQpXG4gICAgLm9uKCdjbGljay5icy5jYXJvdXNlbC5kYXRhLWFwaScsICdbZGF0YS1zbGlkZV0nLCBjbGlja0hhbmRsZXIpXG4gICAgLm9uKCdjbGljay5icy5jYXJvdXNlbC5kYXRhLWFwaScsICdbZGF0YS1zbGlkZS10b10nLCBjbGlja0hhbmRsZXIpXG5cbiAgJCh3aW5kb3cpLm9uKCdsb2FkJywgZnVuY3Rpb24gKCkge1xuICAgICQoJ1tkYXRhLXJpZGU9XCJjYXJvdXNlbFwiXScpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgdmFyICRjYXJvdXNlbCA9ICQodGhpcylcbiAgICAgIFBsdWdpbi5jYWxsKCRjYXJvdXNlbCwgJGNhcm91c2VsLmRhdGEoKSlcbiAgICB9KVxuICB9KVxuXG59KGpRdWVyeSk7XG5cbi8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICogQm9vdHN0cmFwOiBjb2xsYXBzZS5qcyB2My4zLjdcbiAqIGh0dHA6Ly9nZXRib290c3RyYXAuY29tL2phdmFzY3JpcHQvI2NvbGxhcHNlXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqIENvcHlyaWdodCAyMDExLTIwMTYgVHdpdHRlciwgSW5jLlxuICogTGljZW5zZWQgdW5kZXIgTUlUIChodHRwczovL2dpdGh1Yi5jb20vdHdicy9ib290c3RyYXAvYmxvYi9tYXN0ZXIvTElDRU5TRSlcbiAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXG4vKiBqc2hpbnQgbGF0ZWRlZjogZmFsc2UgKi9cblxuK2Z1bmN0aW9uICgkKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICAvLyBDT0xMQVBTRSBQVUJMSUMgQ0xBU1MgREVGSU5JVElPTlxuICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4gIHZhciBDb2xsYXBzZSA9IGZ1bmN0aW9uIChlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgdGhpcy4kZWxlbWVudCAgICAgID0gJChlbGVtZW50KVxuICAgIHRoaXMub3B0aW9ucyAgICAgICA9ICQuZXh0ZW5kKHt9LCBDb2xsYXBzZS5ERUZBVUxUUywgb3B0aW9ucylcbiAgICB0aGlzLiR0cmlnZ2VyICAgICAgPSAkKCdbZGF0YS10b2dnbGU9XCJjb2xsYXBzZVwiXVtocmVmPVwiIycgKyBlbGVtZW50LmlkICsgJ1wiXSwnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICdbZGF0YS10b2dnbGU9XCJjb2xsYXBzZVwiXVtkYXRhLXRhcmdldD1cIiMnICsgZWxlbWVudC5pZCArICdcIl0nKVxuICAgIHRoaXMudHJhbnNpdGlvbmluZyA9IG51bGxcblxuICAgIGlmICh0aGlzLm9wdGlvbnMucGFyZW50KSB7XG4gICAgICB0aGlzLiRwYXJlbnQgPSB0aGlzLmdldFBhcmVudCgpXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYWRkQXJpYUFuZENvbGxhcHNlZENsYXNzKHRoaXMuJGVsZW1lbnQsIHRoaXMuJHRyaWdnZXIpXG4gICAgfVxuXG4gICAgaWYgKHRoaXMub3B0aW9ucy50b2dnbGUpIHRoaXMudG9nZ2xlKClcbiAgfVxuXG4gIENvbGxhcHNlLlZFUlNJT04gID0gJzMuMy43J1xuXG4gIENvbGxhcHNlLlRSQU5TSVRJT05fRFVSQVRJT04gPSAzNTBcblxuICBDb2xsYXBzZS5ERUZBVUxUUyA9IHtcbiAgICB0b2dnbGU6IHRydWVcbiAgfVxuXG4gIENvbGxhcHNlLnByb3RvdHlwZS5kaW1lbnNpb24gPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGhhc1dpZHRoID0gdGhpcy4kZWxlbWVudC5oYXNDbGFzcygnd2lkdGgnKVxuICAgIHJldHVybiBoYXNXaWR0aCA/ICd3aWR0aCcgOiAnaGVpZ2h0J1xuICB9XG5cbiAgQ29sbGFwc2UucHJvdG90eXBlLnNob3cgPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHRoaXMudHJhbnNpdGlvbmluZyB8fCB0aGlzLiRlbGVtZW50Lmhhc0NsYXNzKCdpbicpKSByZXR1cm5cblxuICAgIHZhciBhY3RpdmVzRGF0YVxuICAgIHZhciBhY3RpdmVzID0gdGhpcy4kcGFyZW50ICYmIHRoaXMuJHBhcmVudC5jaGlsZHJlbignLnBhbmVsJykuY2hpbGRyZW4oJy5pbiwgLmNvbGxhcHNpbmcnKVxuXG4gICAgaWYgKGFjdGl2ZXMgJiYgYWN0aXZlcy5sZW5ndGgpIHtcbiAgICAgIGFjdGl2ZXNEYXRhID0gYWN0aXZlcy5kYXRhKCdicy5jb2xsYXBzZScpXG4gICAgICBpZiAoYWN0aXZlc0RhdGEgJiYgYWN0aXZlc0RhdGEudHJhbnNpdGlvbmluZykgcmV0dXJuXG4gICAgfVxuXG4gICAgdmFyIHN0YXJ0RXZlbnQgPSAkLkV2ZW50KCdzaG93LmJzLmNvbGxhcHNlJylcbiAgICB0aGlzLiRlbGVtZW50LnRyaWdnZXIoc3RhcnRFdmVudClcbiAgICBpZiAoc3RhcnRFdmVudC5pc0RlZmF1bHRQcmV2ZW50ZWQoKSkgcmV0dXJuXG5cbiAgICBpZiAoYWN0aXZlcyAmJiBhY3RpdmVzLmxlbmd0aCkge1xuICAgICAgUGx1Z2luLmNhbGwoYWN0aXZlcywgJ2hpZGUnKVxuICAgICAgYWN0aXZlc0RhdGEgfHwgYWN0aXZlcy5kYXRhKCdicy5jb2xsYXBzZScsIG51bGwpXG4gICAgfVxuXG4gICAgdmFyIGRpbWVuc2lvbiA9IHRoaXMuZGltZW5zaW9uKClcblxuICAgIHRoaXMuJGVsZW1lbnRcbiAgICAgIC5yZW1vdmVDbGFzcygnY29sbGFwc2UnKVxuICAgICAgLmFkZENsYXNzKCdjb2xsYXBzaW5nJylbZGltZW5zaW9uXSgwKVxuICAgICAgLmF0dHIoJ2FyaWEtZXhwYW5kZWQnLCB0cnVlKVxuXG4gICAgdGhpcy4kdHJpZ2dlclxuICAgICAgLnJlbW92ZUNsYXNzKCdjb2xsYXBzZWQnKVxuICAgICAgLmF0dHIoJ2FyaWEtZXhwYW5kZWQnLCB0cnVlKVxuXG4gICAgdGhpcy50cmFuc2l0aW9uaW5nID0gMVxuXG4gICAgdmFyIGNvbXBsZXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgdGhpcy4kZWxlbWVudFxuICAgICAgICAucmVtb3ZlQ2xhc3MoJ2NvbGxhcHNpbmcnKVxuICAgICAgICAuYWRkQ2xhc3MoJ2NvbGxhcHNlIGluJylbZGltZW5zaW9uXSgnJylcbiAgICAgIHRoaXMudHJhbnNpdGlvbmluZyA9IDBcbiAgICAgIHRoaXMuJGVsZW1lbnRcbiAgICAgICAgLnRyaWdnZXIoJ3Nob3duLmJzLmNvbGxhcHNlJylcbiAgICB9XG5cbiAgICBpZiAoISQuc3VwcG9ydC50cmFuc2l0aW9uKSByZXR1cm4gY29tcGxldGUuY2FsbCh0aGlzKVxuXG4gICAgdmFyIHNjcm9sbFNpemUgPSAkLmNhbWVsQ2FzZShbJ3Njcm9sbCcsIGRpbWVuc2lvbl0uam9pbignLScpKVxuXG4gICAgdGhpcy4kZWxlbWVudFxuICAgICAgLm9uZSgnYnNUcmFuc2l0aW9uRW5kJywgJC5wcm94eShjb21wbGV0ZSwgdGhpcykpXG4gICAgICAuZW11bGF0ZVRyYW5zaXRpb25FbmQoQ29sbGFwc2UuVFJBTlNJVElPTl9EVVJBVElPTilbZGltZW5zaW9uXSh0aGlzLiRlbGVtZW50WzBdW3Njcm9sbFNpemVdKVxuICB9XG5cbiAgQ29sbGFwc2UucHJvdG90eXBlLmhpZGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHRoaXMudHJhbnNpdGlvbmluZyB8fCAhdGhpcy4kZWxlbWVudC5oYXNDbGFzcygnaW4nKSkgcmV0dXJuXG5cbiAgICB2YXIgc3RhcnRFdmVudCA9ICQuRXZlbnQoJ2hpZGUuYnMuY29sbGFwc2UnKVxuICAgIHRoaXMuJGVsZW1lbnQudHJpZ2dlcihzdGFydEV2ZW50KVxuICAgIGlmIChzdGFydEV2ZW50LmlzRGVmYXVsdFByZXZlbnRlZCgpKSByZXR1cm5cblxuICAgIHZhciBkaW1lbnNpb24gPSB0aGlzLmRpbWVuc2lvbigpXG5cbiAgICB0aGlzLiRlbGVtZW50W2RpbWVuc2lvbl0odGhpcy4kZWxlbWVudFtkaW1lbnNpb25dKCkpWzBdLm9mZnNldEhlaWdodFxuXG4gICAgdGhpcy4kZWxlbWVudFxuICAgICAgLmFkZENsYXNzKCdjb2xsYXBzaW5nJylcbiAgICAgIC5yZW1vdmVDbGFzcygnY29sbGFwc2UgaW4nKVxuICAgICAgLmF0dHIoJ2FyaWEtZXhwYW5kZWQnLCBmYWxzZSlcblxuICAgIHRoaXMuJHRyaWdnZXJcbiAgICAgIC5hZGRDbGFzcygnY29sbGFwc2VkJylcbiAgICAgIC5hdHRyKCdhcmlhLWV4cGFuZGVkJywgZmFsc2UpXG5cbiAgICB0aGlzLnRyYW5zaXRpb25pbmcgPSAxXG5cbiAgICB2YXIgY29tcGxldGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICB0aGlzLnRyYW5zaXRpb25pbmcgPSAwXG4gICAgICB0aGlzLiRlbGVtZW50XG4gICAgICAgIC5yZW1vdmVDbGFzcygnY29sbGFwc2luZycpXG4gICAgICAgIC5hZGRDbGFzcygnY29sbGFwc2UnKVxuICAgICAgICAudHJpZ2dlcignaGlkZGVuLmJzLmNvbGxhcHNlJylcbiAgICB9XG5cbiAgICBpZiAoISQuc3VwcG9ydC50cmFuc2l0aW9uKSByZXR1cm4gY29tcGxldGUuY2FsbCh0aGlzKVxuXG4gICAgdGhpcy4kZWxlbWVudFxuICAgICAgW2RpbWVuc2lvbl0oMClcbiAgICAgIC5vbmUoJ2JzVHJhbnNpdGlvbkVuZCcsICQucHJveHkoY29tcGxldGUsIHRoaXMpKVxuICAgICAgLmVtdWxhdGVUcmFuc2l0aW9uRW5kKENvbGxhcHNlLlRSQU5TSVRJT05fRFVSQVRJT04pXG4gIH1cblxuICBDb2xsYXBzZS5wcm90b3R5cGUudG9nZ2xlID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXNbdGhpcy4kZWxlbWVudC5oYXNDbGFzcygnaW4nKSA/ICdoaWRlJyA6ICdzaG93J10oKVxuICB9XG5cbiAgQ29sbGFwc2UucHJvdG90eXBlLmdldFBhcmVudCA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gJCh0aGlzLm9wdGlvbnMucGFyZW50KVxuICAgICAgLmZpbmQoJ1tkYXRhLXRvZ2dsZT1cImNvbGxhcHNlXCJdW2RhdGEtcGFyZW50PVwiJyArIHRoaXMub3B0aW9ucy5wYXJlbnQgKyAnXCJdJylcbiAgICAgIC5lYWNoKCQucHJveHkoZnVuY3Rpb24gKGksIGVsZW1lbnQpIHtcbiAgICAgICAgdmFyICRlbGVtZW50ID0gJChlbGVtZW50KVxuICAgICAgICB0aGlzLmFkZEFyaWFBbmRDb2xsYXBzZWRDbGFzcyhnZXRUYXJnZXRGcm9tVHJpZ2dlcigkZWxlbWVudCksICRlbGVtZW50KVxuICAgICAgfSwgdGhpcykpXG4gICAgICAuZW5kKClcbiAgfVxuXG4gIENvbGxhcHNlLnByb3RvdHlwZS5hZGRBcmlhQW5kQ29sbGFwc2VkQ2xhc3MgPSBmdW5jdGlvbiAoJGVsZW1lbnQsICR0cmlnZ2VyKSB7XG4gICAgdmFyIGlzT3BlbiA9ICRlbGVtZW50Lmhhc0NsYXNzKCdpbicpXG5cbiAgICAkZWxlbWVudC5hdHRyKCdhcmlhLWV4cGFuZGVkJywgaXNPcGVuKVxuICAgICR0cmlnZ2VyXG4gICAgICAudG9nZ2xlQ2xhc3MoJ2NvbGxhcHNlZCcsICFpc09wZW4pXG4gICAgICAuYXR0cignYXJpYS1leHBhbmRlZCcsIGlzT3BlbilcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldFRhcmdldEZyb21UcmlnZ2VyKCR0cmlnZ2VyKSB7XG4gICAgdmFyIGhyZWZcbiAgICB2YXIgdGFyZ2V0ID0gJHRyaWdnZXIuYXR0cignZGF0YS10YXJnZXQnKVxuICAgICAgfHwgKGhyZWYgPSAkdHJpZ2dlci5hdHRyKCdocmVmJykpICYmIGhyZWYucmVwbGFjZSgvLiooPz0jW15cXHNdKyQpLywgJycpIC8vIHN0cmlwIGZvciBpZTdcblxuICAgIHJldHVybiAkKHRhcmdldClcbiAgfVxuXG5cbiAgLy8gQ09MTEFQU0UgUExVR0lOIERFRklOSVRJT05cbiAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuICBmdW5jdGlvbiBQbHVnaW4ob3B0aW9uKSB7XG4gICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgJHRoaXMgICA9ICQodGhpcylcbiAgICAgIHZhciBkYXRhICAgID0gJHRoaXMuZGF0YSgnYnMuY29sbGFwc2UnKVxuICAgICAgdmFyIG9wdGlvbnMgPSAkLmV4dGVuZCh7fSwgQ29sbGFwc2UuREVGQVVMVFMsICR0aGlzLmRhdGEoKSwgdHlwZW9mIG9wdGlvbiA9PSAnb2JqZWN0JyAmJiBvcHRpb24pXG5cbiAgICAgIGlmICghZGF0YSAmJiBvcHRpb25zLnRvZ2dsZSAmJiAvc2hvd3xoaWRlLy50ZXN0KG9wdGlvbikpIG9wdGlvbnMudG9nZ2xlID0gZmFsc2VcbiAgICAgIGlmICghZGF0YSkgJHRoaXMuZGF0YSgnYnMuY29sbGFwc2UnLCAoZGF0YSA9IG5ldyBDb2xsYXBzZSh0aGlzLCBvcHRpb25zKSkpXG4gICAgICBpZiAodHlwZW9mIG9wdGlvbiA9PSAnc3RyaW5nJykgZGF0YVtvcHRpb25dKClcbiAgICB9KVxuICB9XG5cbiAgdmFyIG9sZCA9ICQuZm4uY29sbGFwc2VcblxuICAkLmZuLmNvbGxhcHNlICAgICAgICAgICAgID0gUGx1Z2luXG4gICQuZm4uY29sbGFwc2UuQ29uc3RydWN0b3IgPSBDb2xsYXBzZVxuXG5cbiAgLy8gQ09MTEFQU0UgTk8gQ09ORkxJQ1RcbiAgLy8gPT09PT09PT09PT09PT09PT09PT1cblxuICAkLmZuLmNvbGxhcHNlLm5vQ29uZmxpY3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgJC5mbi5jb2xsYXBzZSA9IG9sZFxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuXG4gIC8vIENPTExBUFNFIERBVEEtQVBJXG4gIC8vID09PT09PT09PT09PT09PT09XG5cbiAgJChkb2N1bWVudCkub24oJ2NsaWNrLmJzLmNvbGxhcHNlLmRhdGEtYXBpJywgJ1tkYXRhLXRvZ2dsZT1cImNvbGxhcHNlXCJdJywgZnVuY3Rpb24gKGUpIHtcbiAgICB2YXIgJHRoaXMgICA9ICQodGhpcylcblxuICAgIGlmICghJHRoaXMuYXR0cignZGF0YS10YXJnZXQnKSkgZS5wcmV2ZW50RGVmYXVsdCgpXG5cbiAgICB2YXIgJHRhcmdldCA9IGdldFRhcmdldEZyb21UcmlnZ2VyKCR0aGlzKVxuICAgIHZhciBkYXRhICAgID0gJHRhcmdldC5kYXRhKCdicy5jb2xsYXBzZScpXG4gICAgdmFyIG9wdGlvbiAgPSBkYXRhID8gJ3RvZ2dsZScgOiAkdGhpcy5kYXRhKClcblxuICAgIFBsdWdpbi5jYWxsKCR0YXJnZXQsIG9wdGlvbilcbiAgfSlcblxufShqUXVlcnkpO1xuXG4vKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqIEJvb3RzdHJhcDogZHJvcGRvd24uanMgdjMuMy43XG4gKiBodHRwOi8vZ2V0Ym9vdHN0cmFwLmNvbS9qYXZhc2NyaXB0LyNkcm9wZG93bnNcbiAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICogQ29weXJpZ2h0IDIwMTEtMjAxNiBUd2l0dGVyLCBJbmMuXG4gKiBMaWNlbnNlZCB1bmRlciBNSVQgKGh0dHBzOi8vZ2l0aHViLmNvbS90d2JzL2Jvb3RzdHJhcC9ibG9iL21hc3Rlci9MSUNFTlNFKVxuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5cblxuK2Z1bmN0aW9uICgkKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICAvLyBEUk9QRE9XTiBDTEFTUyBERUZJTklUSU9OXG4gIC8vID09PT09PT09PT09PT09PT09PT09PT09PT1cblxuICB2YXIgYmFja2Ryb3AgPSAnLmRyb3Bkb3duLWJhY2tkcm9wJ1xuICB2YXIgdG9nZ2xlICAgPSAnW2RhdGEtdG9nZ2xlPVwiZHJvcGRvd25cIl0nXG4gIHZhciBEcm9wZG93biA9IGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgJChlbGVtZW50KS5vbignY2xpY2suYnMuZHJvcGRvd24nLCB0aGlzLnRvZ2dsZSlcbiAgfVxuXG4gIERyb3Bkb3duLlZFUlNJT04gPSAnMy4zLjcnXG5cbiAgZnVuY3Rpb24gZ2V0UGFyZW50KCR0aGlzKSB7XG4gICAgdmFyIHNlbGVjdG9yID0gJHRoaXMuYXR0cignZGF0YS10YXJnZXQnKVxuXG4gICAgaWYgKCFzZWxlY3Rvcikge1xuICAgICAgc2VsZWN0b3IgPSAkdGhpcy5hdHRyKCdocmVmJylcbiAgICAgIHNlbGVjdG9yID0gc2VsZWN0b3IgJiYgLyNbQS1aYS16XS8udGVzdChzZWxlY3RvcikgJiYgc2VsZWN0b3IucmVwbGFjZSgvLiooPz0jW15cXHNdKiQpLywgJycpIC8vIHN0cmlwIGZvciBpZTdcbiAgICB9XG5cbiAgICB2YXIgJHBhcmVudCA9IHNlbGVjdG9yICYmICQoc2VsZWN0b3IpXG5cbiAgICByZXR1cm4gJHBhcmVudCAmJiAkcGFyZW50Lmxlbmd0aCA/ICRwYXJlbnQgOiAkdGhpcy5wYXJlbnQoKVxuICB9XG5cbiAgZnVuY3Rpb24gY2xlYXJNZW51cyhlKSB7XG4gICAgaWYgKGUgJiYgZS53aGljaCA9PT0gMykgcmV0dXJuXG4gICAgJChiYWNrZHJvcCkucmVtb3ZlKClcbiAgICAkKHRvZ2dsZSkuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgJHRoaXMgICAgICAgICA9ICQodGhpcylcbiAgICAgIHZhciAkcGFyZW50ICAgICAgID0gZ2V0UGFyZW50KCR0aGlzKVxuICAgICAgdmFyIHJlbGF0ZWRUYXJnZXQgPSB7IHJlbGF0ZWRUYXJnZXQ6IHRoaXMgfVxuXG4gICAgICBpZiAoISRwYXJlbnQuaGFzQ2xhc3MoJ29wZW4nKSkgcmV0dXJuXG5cbiAgICAgIGlmIChlICYmIGUudHlwZSA9PSAnY2xpY2snICYmIC9pbnB1dHx0ZXh0YXJlYS9pLnRlc3QoZS50YXJnZXQudGFnTmFtZSkgJiYgJC5jb250YWlucygkcGFyZW50WzBdLCBlLnRhcmdldCkpIHJldHVyblxuXG4gICAgICAkcGFyZW50LnRyaWdnZXIoZSA9ICQuRXZlbnQoJ2hpZGUuYnMuZHJvcGRvd24nLCByZWxhdGVkVGFyZ2V0KSlcblxuICAgICAgaWYgKGUuaXNEZWZhdWx0UHJldmVudGVkKCkpIHJldHVyblxuXG4gICAgICAkdGhpcy5hdHRyKCdhcmlhLWV4cGFuZGVkJywgJ2ZhbHNlJylcbiAgICAgICRwYXJlbnQucmVtb3ZlQ2xhc3MoJ29wZW4nKS50cmlnZ2VyKCQuRXZlbnQoJ2hpZGRlbi5icy5kcm9wZG93bicsIHJlbGF0ZWRUYXJnZXQpKVxuICAgIH0pXG4gIH1cblxuICBEcm9wZG93bi5wcm90b3R5cGUudG9nZ2xlID0gZnVuY3Rpb24gKGUpIHtcbiAgICB2YXIgJHRoaXMgPSAkKHRoaXMpXG5cbiAgICBpZiAoJHRoaXMuaXMoJy5kaXNhYmxlZCwgOmRpc2FibGVkJykpIHJldHVyblxuXG4gICAgdmFyICRwYXJlbnQgID0gZ2V0UGFyZW50KCR0aGlzKVxuICAgIHZhciBpc0FjdGl2ZSA9ICRwYXJlbnQuaGFzQ2xhc3MoJ29wZW4nKVxuXG4gICAgY2xlYXJNZW51cygpXG5cbiAgICBpZiAoIWlzQWN0aXZlKSB7XG4gICAgICBpZiAoJ29udG91Y2hzdGFydCcgaW4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50ICYmICEkcGFyZW50LmNsb3Nlc3QoJy5uYXZiYXItbmF2JykubGVuZ3RoKSB7XG4gICAgICAgIC8vIGlmIG1vYmlsZSB3ZSB1c2UgYSBiYWNrZHJvcCBiZWNhdXNlIGNsaWNrIGV2ZW50cyBkb24ndCBkZWxlZ2F0ZVxuICAgICAgICAkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpKVxuICAgICAgICAgIC5hZGRDbGFzcygnZHJvcGRvd24tYmFja2Ryb3AnKVxuICAgICAgICAgIC5pbnNlcnRBZnRlcigkKHRoaXMpKVxuICAgICAgICAgIC5vbignY2xpY2snLCBjbGVhck1lbnVzKVxuICAgICAgfVxuXG4gICAgICB2YXIgcmVsYXRlZFRhcmdldCA9IHsgcmVsYXRlZFRhcmdldDogdGhpcyB9XG4gICAgICAkcGFyZW50LnRyaWdnZXIoZSA9ICQuRXZlbnQoJ3Nob3cuYnMuZHJvcGRvd24nLCByZWxhdGVkVGFyZ2V0KSlcblxuICAgICAgaWYgKGUuaXNEZWZhdWx0UHJldmVudGVkKCkpIHJldHVyblxuXG4gICAgICAkdGhpc1xuICAgICAgICAudHJpZ2dlcignZm9jdXMnKVxuICAgICAgICAuYXR0cignYXJpYS1leHBhbmRlZCcsICd0cnVlJylcblxuICAgICAgJHBhcmVudFxuICAgICAgICAudG9nZ2xlQ2xhc3MoJ29wZW4nKVxuICAgICAgICAudHJpZ2dlcigkLkV2ZW50KCdzaG93bi5icy5kcm9wZG93bicsIHJlbGF0ZWRUYXJnZXQpKVxuICAgIH1cblxuICAgIHJldHVybiBmYWxzZVxuICB9XG5cbiAgRHJvcGRvd24ucHJvdG90eXBlLmtleWRvd24gPSBmdW5jdGlvbiAoZSkge1xuICAgIGlmICghLygzOHw0MHwyN3wzMikvLnRlc3QoZS53aGljaCkgfHwgL2lucHV0fHRleHRhcmVhL2kudGVzdChlLnRhcmdldC50YWdOYW1lKSkgcmV0dXJuXG5cbiAgICB2YXIgJHRoaXMgPSAkKHRoaXMpXG5cbiAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpXG5cbiAgICBpZiAoJHRoaXMuaXMoJy5kaXNhYmxlZCwgOmRpc2FibGVkJykpIHJldHVyblxuXG4gICAgdmFyICRwYXJlbnQgID0gZ2V0UGFyZW50KCR0aGlzKVxuICAgIHZhciBpc0FjdGl2ZSA9ICRwYXJlbnQuaGFzQ2xhc3MoJ29wZW4nKVxuXG4gICAgaWYgKCFpc0FjdGl2ZSAmJiBlLndoaWNoICE9IDI3IHx8IGlzQWN0aXZlICYmIGUud2hpY2ggPT0gMjcpIHtcbiAgICAgIGlmIChlLndoaWNoID09IDI3KSAkcGFyZW50LmZpbmQodG9nZ2xlKS50cmlnZ2VyKCdmb2N1cycpXG4gICAgICByZXR1cm4gJHRoaXMudHJpZ2dlcignY2xpY2snKVxuICAgIH1cblxuICAgIHZhciBkZXNjID0gJyBsaTpub3QoLmRpc2FibGVkKTp2aXNpYmxlIGEnXG4gICAgdmFyICRpdGVtcyA9ICRwYXJlbnQuZmluZCgnLmRyb3Bkb3duLW1lbnUnICsgZGVzYylcblxuICAgIGlmICghJGl0ZW1zLmxlbmd0aCkgcmV0dXJuXG5cbiAgICB2YXIgaW5kZXggPSAkaXRlbXMuaW5kZXgoZS50YXJnZXQpXG5cbiAgICBpZiAoZS53aGljaCA9PSAzOCAmJiBpbmRleCA+IDApICAgICAgICAgICAgICAgICBpbmRleC0tICAgICAgICAgLy8gdXBcbiAgICBpZiAoZS53aGljaCA9PSA0MCAmJiBpbmRleCA8ICRpdGVtcy5sZW5ndGggLSAxKSBpbmRleCsrICAgICAgICAgLy8gZG93blxuICAgIGlmICghfmluZGV4KSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4ID0gMFxuXG4gICAgJGl0ZW1zLmVxKGluZGV4KS50cmlnZ2VyKCdmb2N1cycpXG4gIH1cblxuXG4gIC8vIERST1BET1dOIFBMVUdJTiBERUZJTklUSU9OXG4gIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbiAgZnVuY3Rpb24gUGx1Z2luKG9wdGlvbikge1xuICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgdmFyICR0aGlzID0gJCh0aGlzKVxuICAgICAgdmFyIGRhdGEgID0gJHRoaXMuZGF0YSgnYnMuZHJvcGRvd24nKVxuXG4gICAgICBpZiAoIWRhdGEpICR0aGlzLmRhdGEoJ2JzLmRyb3Bkb3duJywgKGRhdGEgPSBuZXcgRHJvcGRvd24odGhpcykpKVxuICAgICAgaWYgKHR5cGVvZiBvcHRpb24gPT0gJ3N0cmluZycpIGRhdGFbb3B0aW9uXS5jYWxsKCR0aGlzKVxuICAgIH0pXG4gIH1cblxuICB2YXIgb2xkID0gJC5mbi5kcm9wZG93blxuXG4gICQuZm4uZHJvcGRvd24gICAgICAgICAgICAgPSBQbHVnaW5cbiAgJC5mbi5kcm9wZG93bi5Db25zdHJ1Y3RvciA9IERyb3Bkb3duXG5cblxuICAvLyBEUk9QRE9XTiBOTyBDT05GTElDVFxuICAvLyA9PT09PT09PT09PT09PT09PT09PVxuXG4gICQuZm4uZHJvcGRvd24ubm9Db25mbGljdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAkLmZuLmRyb3Bkb3duID0gb2xkXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG5cbiAgLy8gQVBQTFkgVE8gU1RBTkRBUkQgRFJPUERPV04gRUxFTUVOVFNcbiAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuICAkKGRvY3VtZW50KVxuICAgIC5vbignY2xpY2suYnMuZHJvcGRvd24uZGF0YS1hcGknLCBjbGVhck1lbnVzKVxuICAgIC5vbignY2xpY2suYnMuZHJvcGRvd24uZGF0YS1hcGknLCAnLmRyb3Bkb3duIGZvcm0nLCBmdW5jdGlvbiAoZSkgeyBlLnN0b3BQcm9wYWdhdGlvbigpIH0pXG4gICAgLm9uKCdjbGljay5icy5kcm9wZG93bi5kYXRhLWFwaScsIHRvZ2dsZSwgRHJvcGRvd24ucHJvdG90eXBlLnRvZ2dsZSlcbiAgICAub24oJ2tleWRvd24uYnMuZHJvcGRvd24uZGF0YS1hcGknLCB0b2dnbGUsIERyb3Bkb3duLnByb3RvdHlwZS5rZXlkb3duKVxuICAgIC5vbigna2V5ZG93bi5icy5kcm9wZG93bi5kYXRhLWFwaScsICcuZHJvcGRvd24tbWVudScsIERyb3Bkb3duLnByb3RvdHlwZS5rZXlkb3duKVxuXG59KGpRdWVyeSk7XG5cbi8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICogQm9vdHN0cmFwOiBtb2RhbC5qcyB2My4zLjdcbiAqIGh0dHA6Ly9nZXRib290c3RyYXAuY29tL2phdmFzY3JpcHQvI21vZGFsc1xuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKiBDb3B5cmlnaHQgMjAxMS0yMDE2IFR3aXR0ZXIsIEluYy5cbiAqIExpY2Vuc2VkIHVuZGVyIE1JVCAoaHR0cHM6Ly9naXRodWIuY29tL3R3YnMvYm9vdHN0cmFwL2Jsb2IvbWFzdGVyL0xJQ0VOU0UpXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuXG4rZnVuY3Rpb24gKCQpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIC8vIE1PREFMIENMQVNTIERFRklOSVRJT05cbiAgLy8gPT09PT09PT09PT09PT09PT09PT09PVxuXG4gIHZhciBNb2RhbCA9IGZ1bmN0aW9uIChlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgdGhpcy5vcHRpb25zICAgICAgICAgICAgID0gb3B0aW9uc1xuICAgIHRoaXMuJGJvZHkgICAgICAgICAgICAgICA9ICQoZG9jdW1lbnQuYm9keSlcbiAgICB0aGlzLiRlbGVtZW50ICAgICAgICAgICAgPSAkKGVsZW1lbnQpXG4gICAgdGhpcy4kZGlhbG9nICAgICAgICAgICAgID0gdGhpcy4kZWxlbWVudC5maW5kKCcubW9kYWwtZGlhbG9nJylcbiAgICB0aGlzLiRiYWNrZHJvcCAgICAgICAgICAgPSBudWxsXG4gICAgdGhpcy5pc1Nob3duICAgICAgICAgICAgID0gbnVsbFxuICAgIHRoaXMub3JpZ2luYWxCb2R5UGFkICAgICA9IG51bGxcbiAgICB0aGlzLnNjcm9sbGJhcldpZHRoICAgICAgPSAwXG4gICAgdGhpcy5pZ25vcmVCYWNrZHJvcENsaWNrID0gZmFsc2VcblxuICAgIGlmICh0aGlzLm9wdGlvbnMucmVtb3RlKSB7XG4gICAgICB0aGlzLiRlbGVtZW50XG4gICAgICAgIC5maW5kKCcubW9kYWwtY29udGVudCcpXG4gICAgICAgIC5sb2FkKHRoaXMub3B0aW9ucy5yZW1vdGUsICQucHJveHkoZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHRoaXMuJGVsZW1lbnQudHJpZ2dlcignbG9hZGVkLmJzLm1vZGFsJylcbiAgICAgICAgfSwgdGhpcykpXG4gICAgfVxuICB9XG5cbiAgTW9kYWwuVkVSU0lPTiAgPSAnMy4zLjcnXG5cbiAgTW9kYWwuVFJBTlNJVElPTl9EVVJBVElPTiA9IDMwMFxuICBNb2RhbC5CQUNLRFJPUF9UUkFOU0lUSU9OX0RVUkFUSU9OID0gMTUwXG5cbiAgTW9kYWwuREVGQVVMVFMgPSB7XG4gICAgYmFja2Ryb3A6IHRydWUsXG4gICAga2V5Ym9hcmQ6IHRydWUsXG4gICAgc2hvdzogdHJ1ZVxuICB9XG5cbiAgTW9kYWwucHJvdG90eXBlLnRvZ2dsZSA9IGZ1bmN0aW9uIChfcmVsYXRlZFRhcmdldCkge1xuICAgIHJldHVybiB0aGlzLmlzU2hvd24gPyB0aGlzLmhpZGUoKSA6IHRoaXMuc2hvdyhfcmVsYXRlZFRhcmdldClcbiAgfVxuXG4gIE1vZGFsLnByb3RvdHlwZS5zaG93ID0gZnVuY3Rpb24gKF9yZWxhdGVkVGFyZ2V0KSB7XG4gICAgdmFyIHRoYXQgPSB0aGlzXG4gICAgdmFyIGUgICAgPSAkLkV2ZW50KCdzaG93LmJzLm1vZGFsJywgeyByZWxhdGVkVGFyZ2V0OiBfcmVsYXRlZFRhcmdldCB9KVxuXG4gICAgdGhpcy4kZWxlbWVudC50cmlnZ2VyKGUpXG5cbiAgICBpZiAodGhpcy5pc1Nob3duIHx8IGUuaXNEZWZhdWx0UHJldmVudGVkKCkpIHJldHVyblxuXG4gICAgdGhpcy5pc1Nob3duID0gdHJ1ZVxuXG4gICAgdGhpcy5jaGVja1Njcm9sbGJhcigpXG4gICAgdGhpcy5zZXRTY3JvbGxiYXIoKVxuICAgIHRoaXMuJGJvZHkuYWRkQ2xhc3MoJ21vZGFsLW9wZW4nKVxuXG4gICAgdGhpcy5lc2NhcGUoKVxuICAgIHRoaXMucmVzaXplKClcblxuICAgIHRoaXMuJGVsZW1lbnQub24oJ2NsaWNrLmRpc21pc3MuYnMubW9kYWwnLCAnW2RhdGEtZGlzbWlzcz1cIm1vZGFsXCJdJywgJC5wcm94eSh0aGlzLmhpZGUsIHRoaXMpKVxuXG4gICAgdGhpcy4kZGlhbG9nLm9uKCdtb3VzZWRvd24uZGlzbWlzcy5icy5tb2RhbCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoYXQuJGVsZW1lbnQub25lKCdtb3VzZXVwLmRpc21pc3MuYnMubW9kYWwnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICBpZiAoJChlLnRhcmdldCkuaXModGhhdC4kZWxlbWVudCkpIHRoYXQuaWdub3JlQmFja2Ryb3BDbGljayA9IHRydWVcbiAgICAgIH0pXG4gICAgfSlcblxuICAgIHRoaXMuYmFja2Ryb3AoZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIHRyYW5zaXRpb24gPSAkLnN1cHBvcnQudHJhbnNpdGlvbiAmJiB0aGF0LiRlbGVtZW50Lmhhc0NsYXNzKCdmYWRlJylcblxuICAgICAgaWYgKCF0aGF0LiRlbGVtZW50LnBhcmVudCgpLmxlbmd0aCkge1xuICAgICAgICB0aGF0LiRlbGVtZW50LmFwcGVuZFRvKHRoYXQuJGJvZHkpIC8vIGRvbid0IG1vdmUgbW9kYWxzIGRvbSBwb3NpdGlvblxuICAgICAgfVxuXG4gICAgICB0aGF0LiRlbGVtZW50XG4gICAgICAgIC5zaG93KClcbiAgICAgICAgLnNjcm9sbFRvcCgwKVxuXG4gICAgICB0aGF0LmFkanVzdERpYWxvZygpXG5cbiAgICAgIGlmICh0cmFuc2l0aW9uKSB7XG4gICAgICAgIHRoYXQuJGVsZW1lbnRbMF0ub2Zmc2V0V2lkdGggLy8gZm9yY2UgcmVmbG93XG4gICAgICB9XG5cbiAgICAgIHRoYXQuJGVsZW1lbnQuYWRkQ2xhc3MoJ2luJylcblxuICAgICAgdGhhdC5lbmZvcmNlRm9jdXMoKVxuXG4gICAgICB2YXIgZSA9ICQuRXZlbnQoJ3Nob3duLmJzLm1vZGFsJywgeyByZWxhdGVkVGFyZ2V0OiBfcmVsYXRlZFRhcmdldCB9KVxuXG4gICAgICB0cmFuc2l0aW9uID9cbiAgICAgICAgdGhhdC4kZGlhbG9nIC8vIHdhaXQgZm9yIG1vZGFsIHRvIHNsaWRlIGluXG4gICAgICAgICAgLm9uZSgnYnNUcmFuc2l0aW9uRW5kJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhhdC4kZWxlbWVudC50cmlnZ2VyKCdmb2N1cycpLnRyaWdnZXIoZSlcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5lbXVsYXRlVHJhbnNpdGlvbkVuZChNb2RhbC5UUkFOU0lUSU9OX0RVUkFUSU9OKSA6XG4gICAgICAgIHRoYXQuJGVsZW1lbnQudHJpZ2dlcignZm9jdXMnKS50cmlnZ2VyKGUpXG4gICAgfSlcbiAgfVxuXG4gIE1vZGFsLnByb3RvdHlwZS5oaWRlID0gZnVuY3Rpb24gKGUpIHtcbiAgICBpZiAoZSkgZS5wcmV2ZW50RGVmYXVsdCgpXG5cbiAgICBlID0gJC5FdmVudCgnaGlkZS5icy5tb2RhbCcpXG5cbiAgICB0aGlzLiRlbGVtZW50LnRyaWdnZXIoZSlcblxuICAgIGlmICghdGhpcy5pc1Nob3duIHx8IGUuaXNEZWZhdWx0UHJldmVudGVkKCkpIHJldHVyblxuXG4gICAgdGhpcy5pc1Nob3duID0gZmFsc2VcblxuICAgIHRoaXMuZXNjYXBlKClcbiAgICB0aGlzLnJlc2l6ZSgpXG5cbiAgICAkKGRvY3VtZW50KS5vZmYoJ2ZvY3VzaW4uYnMubW9kYWwnKVxuXG4gICAgdGhpcy4kZWxlbWVudFxuICAgICAgLnJlbW92ZUNsYXNzKCdpbicpXG4gICAgICAub2ZmKCdjbGljay5kaXNtaXNzLmJzLm1vZGFsJylcbiAgICAgIC5vZmYoJ21vdXNldXAuZGlzbWlzcy5icy5tb2RhbCcpXG5cbiAgICB0aGlzLiRkaWFsb2cub2ZmKCdtb3VzZWRvd24uZGlzbWlzcy5icy5tb2RhbCcpXG5cbiAgICAkLnN1cHBvcnQudHJhbnNpdGlvbiAmJiB0aGlzLiRlbGVtZW50Lmhhc0NsYXNzKCdmYWRlJykgP1xuICAgICAgdGhpcy4kZWxlbWVudFxuICAgICAgICAub25lKCdic1RyYW5zaXRpb25FbmQnLCAkLnByb3h5KHRoaXMuaGlkZU1vZGFsLCB0aGlzKSlcbiAgICAgICAgLmVtdWxhdGVUcmFuc2l0aW9uRW5kKE1vZGFsLlRSQU5TSVRJT05fRFVSQVRJT04pIDpcbiAgICAgIHRoaXMuaGlkZU1vZGFsKClcbiAgfVxuXG4gIE1vZGFsLnByb3RvdHlwZS5lbmZvcmNlRm9jdXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgJChkb2N1bWVudClcbiAgICAgIC5vZmYoJ2ZvY3VzaW4uYnMubW9kYWwnKSAvLyBndWFyZCBhZ2FpbnN0IGluZmluaXRlIGZvY3VzIGxvb3BcbiAgICAgIC5vbignZm9jdXNpbi5icy5tb2RhbCcsICQucHJveHkoZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgaWYgKGRvY3VtZW50ICE9PSBlLnRhcmdldCAmJlxuICAgICAgICAgICAgdGhpcy4kZWxlbWVudFswXSAhPT0gZS50YXJnZXQgJiZcbiAgICAgICAgICAgICF0aGlzLiRlbGVtZW50LmhhcyhlLnRhcmdldCkubGVuZ3RoKSB7XG4gICAgICAgICAgdGhpcy4kZWxlbWVudC50cmlnZ2VyKCdmb2N1cycpXG4gICAgICAgIH1cbiAgICAgIH0sIHRoaXMpKVxuICB9XG5cbiAgTW9kYWwucHJvdG90eXBlLmVzY2FwZSA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodGhpcy5pc1Nob3duICYmIHRoaXMub3B0aW9ucy5rZXlib2FyZCkge1xuICAgICAgdGhpcy4kZWxlbWVudC5vbigna2V5ZG93bi5kaXNtaXNzLmJzLm1vZGFsJywgJC5wcm94eShmdW5jdGlvbiAoZSkge1xuICAgICAgICBlLndoaWNoID09IDI3ICYmIHRoaXMuaGlkZSgpXG4gICAgICB9LCB0aGlzKSlcbiAgICB9IGVsc2UgaWYgKCF0aGlzLmlzU2hvd24pIHtcbiAgICAgIHRoaXMuJGVsZW1lbnQub2ZmKCdrZXlkb3duLmRpc21pc3MuYnMubW9kYWwnKVxuICAgIH1cbiAgfVxuXG4gIE1vZGFsLnByb3RvdHlwZS5yZXNpemUgPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHRoaXMuaXNTaG93bikge1xuICAgICAgJCh3aW5kb3cpLm9uKCdyZXNpemUuYnMubW9kYWwnLCAkLnByb3h5KHRoaXMuaGFuZGxlVXBkYXRlLCB0aGlzKSlcbiAgICB9IGVsc2Uge1xuICAgICAgJCh3aW5kb3cpLm9mZigncmVzaXplLmJzLm1vZGFsJylcbiAgICB9XG4gIH1cblxuICBNb2RhbC5wcm90b3R5cGUuaGlkZU1vZGFsID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciB0aGF0ID0gdGhpc1xuICAgIHRoaXMuJGVsZW1lbnQuaGlkZSgpXG4gICAgdGhpcy5iYWNrZHJvcChmdW5jdGlvbiAoKSB7XG4gICAgICB0aGF0LiRib2R5LnJlbW92ZUNsYXNzKCdtb2RhbC1vcGVuJylcbiAgICAgIHRoYXQucmVzZXRBZGp1c3RtZW50cygpXG4gICAgICB0aGF0LnJlc2V0U2Nyb2xsYmFyKClcbiAgICAgIHRoYXQuJGVsZW1lbnQudHJpZ2dlcignaGlkZGVuLmJzLm1vZGFsJylcbiAgICB9KVxuICB9XG5cbiAgTW9kYWwucHJvdG90eXBlLnJlbW92ZUJhY2tkcm9wID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuJGJhY2tkcm9wICYmIHRoaXMuJGJhY2tkcm9wLnJlbW92ZSgpXG4gICAgdGhpcy4kYmFja2Ryb3AgPSBudWxsXG4gIH1cblxuICBNb2RhbC5wcm90b3R5cGUuYmFja2Ryb3AgPSBmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgICB2YXIgdGhhdCA9IHRoaXNcbiAgICB2YXIgYW5pbWF0ZSA9IHRoaXMuJGVsZW1lbnQuaGFzQ2xhc3MoJ2ZhZGUnKSA/ICdmYWRlJyA6ICcnXG5cbiAgICBpZiAodGhpcy5pc1Nob3duICYmIHRoaXMub3B0aW9ucy5iYWNrZHJvcCkge1xuICAgICAgdmFyIGRvQW5pbWF0ZSA9ICQuc3VwcG9ydC50cmFuc2l0aW9uICYmIGFuaW1hdGVcblxuICAgICAgdGhpcy4kYmFja2Ryb3AgPSAkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpKVxuICAgICAgICAuYWRkQ2xhc3MoJ21vZGFsLWJhY2tkcm9wICcgKyBhbmltYXRlKVxuICAgICAgICAuYXBwZW5kVG8odGhpcy4kYm9keSlcblxuICAgICAgdGhpcy4kZWxlbWVudC5vbignY2xpY2suZGlzbWlzcy5icy5tb2RhbCcsICQucHJveHkoZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgaWYgKHRoaXMuaWdub3JlQmFja2Ryb3BDbGljaykge1xuICAgICAgICAgIHRoaXMuaWdub3JlQmFja2Ryb3BDbGljayA9IGZhbHNlXG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgaWYgKGUudGFyZ2V0ICE9PSBlLmN1cnJlbnRUYXJnZXQpIHJldHVyblxuICAgICAgICB0aGlzLm9wdGlvbnMuYmFja2Ryb3AgPT0gJ3N0YXRpYydcbiAgICAgICAgICA/IHRoaXMuJGVsZW1lbnRbMF0uZm9jdXMoKVxuICAgICAgICAgIDogdGhpcy5oaWRlKClcbiAgICAgIH0sIHRoaXMpKVxuXG4gICAgICBpZiAoZG9BbmltYXRlKSB0aGlzLiRiYWNrZHJvcFswXS5vZmZzZXRXaWR0aCAvLyBmb3JjZSByZWZsb3dcblxuICAgICAgdGhpcy4kYmFja2Ryb3AuYWRkQ2xhc3MoJ2luJylcblxuICAgICAgaWYgKCFjYWxsYmFjaykgcmV0dXJuXG5cbiAgICAgIGRvQW5pbWF0ZSA/XG4gICAgICAgIHRoaXMuJGJhY2tkcm9wXG4gICAgICAgICAgLm9uZSgnYnNUcmFuc2l0aW9uRW5kJywgY2FsbGJhY2spXG4gICAgICAgICAgLmVtdWxhdGVUcmFuc2l0aW9uRW5kKE1vZGFsLkJBQ0tEUk9QX1RSQU5TSVRJT05fRFVSQVRJT04pIDpcbiAgICAgICAgY2FsbGJhY2soKVxuXG4gICAgfSBlbHNlIGlmICghdGhpcy5pc1Nob3duICYmIHRoaXMuJGJhY2tkcm9wKSB7XG4gICAgICB0aGlzLiRiYWNrZHJvcC5yZW1vdmVDbGFzcygnaW4nKVxuXG4gICAgICB2YXIgY2FsbGJhY2tSZW1vdmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoYXQucmVtb3ZlQmFja2Ryb3AoKVxuICAgICAgICBjYWxsYmFjayAmJiBjYWxsYmFjaygpXG4gICAgICB9XG4gICAgICAkLnN1cHBvcnQudHJhbnNpdGlvbiAmJiB0aGlzLiRlbGVtZW50Lmhhc0NsYXNzKCdmYWRlJykgP1xuICAgICAgICB0aGlzLiRiYWNrZHJvcFxuICAgICAgICAgIC5vbmUoJ2JzVHJhbnNpdGlvbkVuZCcsIGNhbGxiYWNrUmVtb3ZlKVxuICAgICAgICAgIC5lbXVsYXRlVHJhbnNpdGlvbkVuZChNb2RhbC5CQUNLRFJPUF9UUkFOU0lUSU9OX0RVUkFUSU9OKSA6XG4gICAgICAgIGNhbGxiYWNrUmVtb3ZlKClcblxuICAgIH0gZWxzZSBpZiAoY2FsbGJhY2spIHtcbiAgICAgIGNhbGxiYWNrKClcbiAgICB9XG4gIH1cblxuICAvLyB0aGVzZSBmb2xsb3dpbmcgbWV0aG9kcyBhcmUgdXNlZCB0byBoYW5kbGUgb3ZlcmZsb3dpbmcgbW9kYWxzXG5cbiAgTW9kYWwucHJvdG90eXBlLmhhbmRsZVVwZGF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmFkanVzdERpYWxvZygpXG4gIH1cblxuICBNb2RhbC5wcm90b3R5cGUuYWRqdXN0RGlhbG9nID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBtb2RhbElzT3ZlcmZsb3dpbmcgPSB0aGlzLiRlbGVtZW50WzBdLnNjcm9sbEhlaWdodCA+IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHRcblxuICAgIHRoaXMuJGVsZW1lbnQuY3NzKHtcbiAgICAgIHBhZGRpbmdMZWZ0OiAgIXRoaXMuYm9keUlzT3ZlcmZsb3dpbmcgJiYgbW9kYWxJc092ZXJmbG93aW5nID8gdGhpcy5zY3JvbGxiYXJXaWR0aCA6ICcnLFxuICAgICAgcGFkZGluZ1JpZ2h0OiB0aGlzLmJvZHlJc092ZXJmbG93aW5nICYmICFtb2RhbElzT3ZlcmZsb3dpbmcgPyB0aGlzLnNjcm9sbGJhcldpZHRoIDogJydcbiAgICB9KVxuICB9XG5cbiAgTW9kYWwucHJvdG90eXBlLnJlc2V0QWRqdXN0bWVudHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy4kZWxlbWVudC5jc3Moe1xuICAgICAgcGFkZGluZ0xlZnQ6ICcnLFxuICAgICAgcGFkZGluZ1JpZ2h0OiAnJ1xuICAgIH0pXG4gIH1cblxuICBNb2RhbC5wcm90b3R5cGUuY2hlY2tTY3JvbGxiYXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGZ1bGxXaW5kb3dXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoXG4gICAgaWYgKCFmdWxsV2luZG93V2lkdGgpIHsgLy8gd29ya2Fyb3VuZCBmb3IgbWlzc2luZyB3aW5kb3cuaW5uZXJXaWR0aCBpbiBJRThcbiAgICAgIHZhciBkb2N1bWVudEVsZW1lbnRSZWN0ID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG4gICAgICBmdWxsV2luZG93V2lkdGggPSBkb2N1bWVudEVsZW1lbnRSZWN0LnJpZ2h0IC0gTWF0aC5hYnMoZG9jdW1lbnRFbGVtZW50UmVjdC5sZWZ0KVxuICAgIH1cbiAgICB0aGlzLmJvZHlJc092ZXJmbG93aW5nID0gZG9jdW1lbnQuYm9keS5jbGllbnRXaWR0aCA8IGZ1bGxXaW5kb3dXaWR0aFxuICAgIHRoaXMuc2Nyb2xsYmFyV2lkdGggPSB0aGlzLm1lYXN1cmVTY3JvbGxiYXIoKVxuICB9XG5cbiAgTW9kYWwucHJvdG90eXBlLnNldFNjcm9sbGJhciA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgYm9keVBhZCA9IHBhcnNlSW50KCh0aGlzLiRib2R5LmNzcygncGFkZGluZy1yaWdodCcpIHx8IDApLCAxMClcbiAgICB0aGlzLm9yaWdpbmFsQm9keVBhZCA9IGRvY3VtZW50LmJvZHkuc3R5bGUucGFkZGluZ1JpZ2h0IHx8ICcnXG4gICAgaWYgKHRoaXMuYm9keUlzT3ZlcmZsb3dpbmcpIHRoaXMuJGJvZHkuY3NzKCdwYWRkaW5nLXJpZ2h0JywgYm9keVBhZCArIHRoaXMuc2Nyb2xsYmFyV2lkdGgpXG4gIH1cblxuICBNb2RhbC5wcm90b3R5cGUucmVzZXRTY3JvbGxiYXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy4kYm9keS5jc3MoJ3BhZGRpbmctcmlnaHQnLCB0aGlzLm9yaWdpbmFsQm9keVBhZClcbiAgfVxuXG4gIE1vZGFsLnByb3RvdHlwZS5tZWFzdXJlU2Nyb2xsYmFyID0gZnVuY3Rpb24gKCkgeyAvLyB0aHggd2Fsc2hcbiAgICB2YXIgc2Nyb2xsRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICBzY3JvbGxEaXYuY2xhc3NOYW1lID0gJ21vZGFsLXNjcm9sbGJhci1tZWFzdXJlJ1xuICAgIHRoaXMuJGJvZHkuYXBwZW5kKHNjcm9sbERpdilcbiAgICB2YXIgc2Nyb2xsYmFyV2lkdGggPSBzY3JvbGxEaXYub2Zmc2V0V2lkdGggLSBzY3JvbGxEaXYuY2xpZW50V2lkdGhcbiAgICB0aGlzLiRib2R5WzBdLnJlbW92ZUNoaWxkKHNjcm9sbERpdilcbiAgICByZXR1cm4gc2Nyb2xsYmFyV2lkdGhcbiAgfVxuXG5cbiAgLy8gTU9EQUwgUExVR0lOIERFRklOSVRJT05cbiAgLy8gPT09PT09PT09PT09PT09PT09PT09PT1cblxuICBmdW5jdGlvbiBQbHVnaW4ob3B0aW9uLCBfcmVsYXRlZFRhcmdldCkge1xuICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgdmFyICR0aGlzICAgPSAkKHRoaXMpXG4gICAgICB2YXIgZGF0YSAgICA9ICR0aGlzLmRhdGEoJ2JzLm1vZGFsJylcbiAgICAgIHZhciBvcHRpb25zID0gJC5leHRlbmQoe30sIE1vZGFsLkRFRkFVTFRTLCAkdGhpcy5kYXRhKCksIHR5cGVvZiBvcHRpb24gPT0gJ29iamVjdCcgJiYgb3B0aW9uKVxuXG4gICAgICBpZiAoIWRhdGEpICR0aGlzLmRhdGEoJ2JzLm1vZGFsJywgKGRhdGEgPSBuZXcgTW9kYWwodGhpcywgb3B0aW9ucykpKVxuICAgICAgaWYgKHR5cGVvZiBvcHRpb24gPT0gJ3N0cmluZycpIGRhdGFbb3B0aW9uXShfcmVsYXRlZFRhcmdldClcbiAgICAgIGVsc2UgaWYgKG9wdGlvbnMuc2hvdykgZGF0YS5zaG93KF9yZWxhdGVkVGFyZ2V0KVxuICAgIH0pXG4gIH1cblxuICB2YXIgb2xkID0gJC5mbi5tb2RhbFxuXG4gICQuZm4ubW9kYWwgICAgICAgICAgICAgPSBQbHVnaW5cbiAgJC5mbi5tb2RhbC5Db25zdHJ1Y3RvciA9IE1vZGFsXG5cblxuICAvLyBNT0RBTCBOTyBDT05GTElDVFxuICAvLyA9PT09PT09PT09PT09PT09PVxuXG4gICQuZm4ubW9kYWwubm9Db25mbGljdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAkLmZuLm1vZGFsID0gb2xkXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG5cbiAgLy8gTU9EQUwgREFUQS1BUElcbiAgLy8gPT09PT09PT09PT09PT1cblxuICAkKGRvY3VtZW50KS5vbignY2xpY2suYnMubW9kYWwuZGF0YS1hcGknLCAnW2RhdGEtdG9nZ2xlPVwibW9kYWxcIl0nLCBmdW5jdGlvbiAoZSkge1xuICAgIHZhciAkdGhpcyAgID0gJCh0aGlzKVxuICAgIHZhciBocmVmICAgID0gJHRoaXMuYXR0cignaHJlZicpXG4gICAgdmFyICR0YXJnZXQgPSAkKCR0aGlzLmF0dHIoJ2RhdGEtdGFyZ2V0JykgfHwgKGhyZWYgJiYgaHJlZi5yZXBsYWNlKC8uKig/PSNbXlxcc10rJCkvLCAnJykpKSAvLyBzdHJpcCBmb3IgaWU3XG4gICAgdmFyIG9wdGlvbiAgPSAkdGFyZ2V0LmRhdGEoJ2JzLm1vZGFsJykgPyAndG9nZ2xlJyA6ICQuZXh0ZW5kKHsgcmVtb3RlOiAhLyMvLnRlc3QoaHJlZikgJiYgaHJlZiB9LCAkdGFyZ2V0LmRhdGEoKSwgJHRoaXMuZGF0YSgpKVxuXG4gICAgaWYgKCR0aGlzLmlzKCdhJykpIGUucHJldmVudERlZmF1bHQoKVxuXG4gICAgJHRhcmdldC5vbmUoJ3Nob3cuYnMubW9kYWwnLCBmdW5jdGlvbiAoc2hvd0V2ZW50KSB7XG4gICAgICBpZiAoc2hvd0V2ZW50LmlzRGVmYXVsdFByZXZlbnRlZCgpKSByZXR1cm4gLy8gb25seSByZWdpc3RlciBmb2N1cyByZXN0b3JlciBpZiBtb2RhbCB3aWxsIGFjdHVhbGx5IGdldCBzaG93blxuICAgICAgJHRhcmdldC5vbmUoJ2hpZGRlbi5icy5tb2RhbCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJHRoaXMuaXMoJzp2aXNpYmxlJykgJiYgJHRoaXMudHJpZ2dlcignZm9jdXMnKVxuICAgICAgfSlcbiAgICB9KVxuICAgIFBsdWdpbi5jYWxsKCR0YXJnZXQsIG9wdGlvbiwgdGhpcylcbiAgfSlcblxufShqUXVlcnkpO1xuXG4vKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqIEJvb3RzdHJhcDogdG9vbHRpcC5qcyB2My4zLjdcbiAqIGh0dHA6Ly9nZXRib290c3RyYXAuY29tL2phdmFzY3JpcHQvI3Rvb2x0aXBcbiAqIEluc3BpcmVkIGJ5IHRoZSBvcmlnaW5hbCBqUXVlcnkudGlwc3kgYnkgSmFzb24gRnJhbWVcbiAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICogQ29weXJpZ2h0IDIwMTEtMjAxNiBUd2l0dGVyLCBJbmMuXG4gKiBMaWNlbnNlZCB1bmRlciBNSVQgKGh0dHBzOi8vZ2l0aHViLmNvbS90d2JzL2Jvb3RzdHJhcC9ibG9iL21hc3Rlci9MSUNFTlNFKVxuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5cblxuK2Z1bmN0aW9uICgkKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICAvLyBUT09MVElQIFBVQkxJQyBDTEFTUyBERUZJTklUSU9OXG4gIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuICB2YXIgVG9vbHRpcCA9IGZ1bmN0aW9uIChlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgdGhpcy50eXBlICAgICAgID0gbnVsbFxuICAgIHRoaXMub3B0aW9ucyAgICA9IG51bGxcbiAgICB0aGlzLmVuYWJsZWQgICAgPSBudWxsXG4gICAgdGhpcy50aW1lb3V0ICAgID0gbnVsbFxuICAgIHRoaXMuaG92ZXJTdGF0ZSA9IG51bGxcbiAgICB0aGlzLiRlbGVtZW50ICAgPSBudWxsXG4gICAgdGhpcy5pblN0YXRlICAgID0gbnVsbFxuXG4gICAgdGhpcy5pbml0KCd0b29sdGlwJywgZWxlbWVudCwgb3B0aW9ucylcbiAgfVxuXG4gIFRvb2x0aXAuVkVSU0lPTiAgPSAnMy4zLjcnXG5cbiAgVG9vbHRpcC5UUkFOU0lUSU9OX0RVUkFUSU9OID0gMTUwXG5cbiAgVG9vbHRpcC5ERUZBVUxUUyA9IHtcbiAgICBhbmltYXRpb246IHRydWUsXG4gICAgcGxhY2VtZW50OiAndG9wJyxcbiAgICBzZWxlY3RvcjogZmFsc2UsXG4gICAgdGVtcGxhdGU6ICc8ZGl2IGNsYXNzPVwidG9vbHRpcFwiIHJvbGU9XCJ0b29sdGlwXCI+PGRpdiBjbGFzcz1cInRvb2x0aXAtYXJyb3dcIj48L2Rpdj48ZGl2IGNsYXNzPVwidG9vbHRpcC1pbm5lclwiPjwvZGl2PjwvZGl2PicsXG4gICAgdHJpZ2dlcjogJ2hvdmVyIGZvY3VzJyxcbiAgICB0aXRsZTogJycsXG4gICAgZGVsYXk6IDAsXG4gICAgaHRtbDogZmFsc2UsXG4gICAgY29udGFpbmVyOiBmYWxzZSxcbiAgICB2aWV3cG9ydDoge1xuICAgICAgc2VsZWN0b3I6ICdib2R5JyxcbiAgICAgIHBhZGRpbmc6IDBcbiAgICB9XG4gIH1cblxuICBUb29sdGlwLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKHR5cGUsIGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICB0aGlzLmVuYWJsZWQgICA9IHRydWVcbiAgICB0aGlzLnR5cGUgICAgICA9IHR5cGVcbiAgICB0aGlzLiRlbGVtZW50ICA9ICQoZWxlbWVudClcbiAgICB0aGlzLm9wdGlvbnMgICA9IHRoaXMuZ2V0T3B0aW9ucyhvcHRpb25zKVxuICAgIHRoaXMuJHZpZXdwb3J0ID0gdGhpcy5vcHRpb25zLnZpZXdwb3J0ICYmICQoJC5pc0Z1bmN0aW9uKHRoaXMub3B0aW9ucy52aWV3cG9ydCkgPyB0aGlzLm9wdGlvbnMudmlld3BvcnQuY2FsbCh0aGlzLCB0aGlzLiRlbGVtZW50KSA6ICh0aGlzLm9wdGlvbnMudmlld3BvcnQuc2VsZWN0b3IgfHwgdGhpcy5vcHRpb25zLnZpZXdwb3J0KSlcbiAgICB0aGlzLmluU3RhdGUgICA9IHsgY2xpY2s6IGZhbHNlLCBob3ZlcjogZmFsc2UsIGZvY3VzOiBmYWxzZSB9XG5cbiAgICBpZiAodGhpcy4kZWxlbWVudFswXSBpbnN0YW5jZW9mIGRvY3VtZW50LmNvbnN0cnVjdG9yICYmICF0aGlzLm9wdGlvbnMuc2VsZWN0b3IpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignYHNlbGVjdG9yYCBvcHRpb24gbXVzdCBiZSBzcGVjaWZpZWQgd2hlbiBpbml0aWFsaXppbmcgJyArIHRoaXMudHlwZSArICcgb24gdGhlIHdpbmRvdy5kb2N1bWVudCBvYmplY3QhJylcbiAgICB9XG5cbiAgICB2YXIgdHJpZ2dlcnMgPSB0aGlzLm9wdGlvbnMudHJpZ2dlci5zcGxpdCgnICcpXG5cbiAgICBmb3IgKHZhciBpID0gdHJpZ2dlcnMubGVuZ3RoOyBpLS07KSB7XG4gICAgICB2YXIgdHJpZ2dlciA9IHRyaWdnZXJzW2ldXG5cbiAgICAgIGlmICh0cmlnZ2VyID09ICdjbGljaycpIHtcbiAgICAgICAgdGhpcy4kZWxlbWVudC5vbignY2xpY2suJyArIHRoaXMudHlwZSwgdGhpcy5vcHRpb25zLnNlbGVjdG9yLCAkLnByb3h5KHRoaXMudG9nZ2xlLCB0aGlzKSlcbiAgICAgIH0gZWxzZSBpZiAodHJpZ2dlciAhPSAnbWFudWFsJykge1xuICAgICAgICB2YXIgZXZlbnRJbiAgPSB0cmlnZ2VyID09ICdob3ZlcicgPyAnbW91c2VlbnRlcicgOiAnZm9jdXNpbidcbiAgICAgICAgdmFyIGV2ZW50T3V0ID0gdHJpZ2dlciA9PSAnaG92ZXInID8gJ21vdXNlbGVhdmUnIDogJ2ZvY3Vzb3V0J1xuXG4gICAgICAgIHRoaXMuJGVsZW1lbnQub24oZXZlbnRJbiAgKyAnLicgKyB0aGlzLnR5cGUsIHRoaXMub3B0aW9ucy5zZWxlY3RvciwgJC5wcm94eSh0aGlzLmVudGVyLCB0aGlzKSlcbiAgICAgICAgdGhpcy4kZWxlbWVudC5vbihldmVudE91dCArICcuJyArIHRoaXMudHlwZSwgdGhpcy5vcHRpb25zLnNlbGVjdG9yLCAkLnByb3h5KHRoaXMubGVhdmUsIHRoaXMpKVxuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMub3B0aW9ucy5zZWxlY3RvciA/XG4gICAgICAodGhpcy5fb3B0aW9ucyA9ICQuZXh0ZW5kKHt9LCB0aGlzLm9wdGlvbnMsIHsgdHJpZ2dlcjogJ21hbnVhbCcsIHNlbGVjdG9yOiAnJyB9KSkgOlxuICAgICAgdGhpcy5maXhUaXRsZSgpXG4gIH1cblxuICBUb29sdGlwLnByb3RvdHlwZS5nZXREZWZhdWx0cyA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gVG9vbHRpcC5ERUZBVUxUU1xuICB9XG5cbiAgVG9vbHRpcC5wcm90b3R5cGUuZ2V0T3B0aW9ucyA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgb3B0aW9ucyA9ICQuZXh0ZW5kKHt9LCB0aGlzLmdldERlZmF1bHRzKCksIHRoaXMuJGVsZW1lbnQuZGF0YSgpLCBvcHRpb25zKVxuXG4gICAgaWYgKG9wdGlvbnMuZGVsYXkgJiYgdHlwZW9mIG9wdGlvbnMuZGVsYXkgPT0gJ251bWJlcicpIHtcbiAgICAgIG9wdGlvbnMuZGVsYXkgPSB7XG4gICAgICAgIHNob3c6IG9wdGlvbnMuZGVsYXksXG4gICAgICAgIGhpZGU6IG9wdGlvbnMuZGVsYXlcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gb3B0aW9uc1xuICB9XG5cbiAgVG9vbHRpcC5wcm90b3R5cGUuZ2V0RGVsZWdhdGVPcHRpb25zID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBvcHRpb25zICA9IHt9XG4gICAgdmFyIGRlZmF1bHRzID0gdGhpcy5nZXREZWZhdWx0cygpXG5cbiAgICB0aGlzLl9vcHRpb25zICYmICQuZWFjaCh0aGlzLl9vcHRpb25zLCBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xuICAgICAgaWYgKGRlZmF1bHRzW2tleV0gIT0gdmFsdWUpIG9wdGlvbnNba2V5XSA9IHZhbHVlXG4gICAgfSlcblxuICAgIHJldHVybiBvcHRpb25zXG4gIH1cblxuICBUb29sdGlwLnByb3RvdHlwZS5lbnRlciA9IGZ1bmN0aW9uIChvYmopIHtcbiAgICB2YXIgc2VsZiA9IG9iaiBpbnN0YW5jZW9mIHRoaXMuY29uc3RydWN0b3IgP1xuICAgICAgb2JqIDogJChvYmouY3VycmVudFRhcmdldCkuZGF0YSgnYnMuJyArIHRoaXMudHlwZSlcblxuICAgIGlmICghc2VsZikge1xuICAgICAgc2VsZiA9IG5ldyB0aGlzLmNvbnN0cnVjdG9yKG9iai5jdXJyZW50VGFyZ2V0LCB0aGlzLmdldERlbGVnYXRlT3B0aW9ucygpKVxuICAgICAgJChvYmouY3VycmVudFRhcmdldCkuZGF0YSgnYnMuJyArIHRoaXMudHlwZSwgc2VsZilcbiAgICB9XG5cbiAgICBpZiAob2JqIGluc3RhbmNlb2YgJC5FdmVudCkge1xuICAgICAgc2VsZi5pblN0YXRlW29iai50eXBlID09ICdmb2N1c2luJyA/ICdmb2N1cycgOiAnaG92ZXInXSA9IHRydWVcbiAgICB9XG5cbiAgICBpZiAoc2VsZi50aXAoKS5oYXNDbGFzcygnaW4nKSB8fCBzZWxmLmhvdmVyU3RhdGUgPT0gJ2luJykge1xuICAgICAgc2VsZi5ob3ZlclN0YXRlID0gJ2luJ1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgY2xlYXJUaW1lb3V0KHNlbGYudGltZW91dClcblxuICAgIHNlbGYuaG92ZXJTdGF0ZSA9ICdpbidcblxuICAgIGlmICghc2VsZi5vcHRpb25zLmRlbGF5IHx8ICFzZWxmLm9wdGlvbnMuZGVsYXkuc2hvdykgcmV0dXJuIHNlbGYuc2hvdygpXG5cbiAgICBzZWxmLnRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmIChzZWxmLmhvdmVyU3RhdGUgPT0gJ2luJykgc2VsZi5zaG93KClcbiAgICB9LCBzZWxmLm9wdGlvbnMuZGVsYXkuc2hvdylcbiAgfVxuXG4gIFRvb2x0aXAucHJvdG90eXBlLmlzSW5TdGF0ZVRydWUgPSBmdW5jdGlvbiAoKSB7XG4gICAgZm9yICh2YXIga2V5IGluIHRoaXMuaW5TdGF0ZSkge1xuICAgICAgaWYgKHRoaXMuaW5TdGF0ZVtrZXldKSByZXR1cm4gdHJ1ZVxuICAgIH1cblxuICAgIHJldHVybiBmYWxzZVxuICB9XG5cbiAgVG9vbHRpcC5wcm90b3R5cGUubGVhdmUgPSBmdW5jdGlvbiAob2JqKSB7XG4gICAgdmFyIHNlbGYgPSBvYmogaW5zdGFuY2VvZiB0aGlzLmNvbnN0cnVjdG9yID9cbiAgICAgIG9iaiA6ICQob2JqLmN1cnJlbnRUYXJnZXQpLmRhdGEoJ2JzLicgKyB0aGlzLnR5cGUpXG5cbiAgICBpZiAoIXNlbGYpIHtcbiAgICAgIHNlbGYgPSBuZXcgdGhpcy5jb25zdHJ1Y3RvcihvYmouY3VycmVudFRhcmdldCwgdGhpcy5nZXREZWxlZ2F0ZU9wdGlvbnMoKSlcbiAgICAgICQob2JqLmN1cnJlbnRUYXJnZXQpLmRhdGEoJ2JzLicgKyB0aGlzLnR5cGUsIHNlbGYpXG4gICAgfVxuXG4gICAgaWYgKG9iaiBpbnN0YW5jZW9mICQuRXZlbnQpIHtcbiAgICAgIHNlbGYuaW5TdGF0ZVtvYmoudHlwZSA9PSAnZm9jdXNvdXQnID8gJ2ZvY3VzJyA6ICdob3ZlciddID0gZmFsc2VcbiAgICB9XG5cbiAgICBpZiAoc2VsZi5pc0luU3RhdGVUcnVlKCkpIHJldHVyblxuXG4gICAgY2xlYXJUaW1lb3V0KHNlbGYudGltZW91dClcblxuICAgIHNlbGYuaG92ZXJTdGF0ZSA9ICdvdXQnXG5cbiAgICBpZiAoIXNlbGYub3B0aW9ucy5kZWxheSB8fCAhc2VsZi5vcHRpb25zLmRlbGF5LmhpZGUpIHJldHVybiBzZWxmLmhpZGUoKVxuXG4gICAgc2VsZi50aW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAoc2VsZi5ob3ZlclN0YXRlID09ICdvdXQnKSBzZWxmLmhpZGUoKVxuICAgIH0sIHNlbGYub3B0aW9ucy5kZWxheS5oaWRlKVxuICB9XG5cbiAgVG9vbHRpcC5wcm90b3R5cGUuc2hvdyA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZSA9ICQuRXZlbnQoJ3Nob3cuYnMuJyArIHRoaXMudHlwZSlcblxuICAgIGlmICh0aGlzLmhhc0NvbnRlbnQoKSAmJiB0aGlzLmVuYWJsZWQpIHtcbiAgICAgIHRoaXMuJGVsZW1lbnQudHJpZ2dlcihlKVxuXG4gICAgICB2YXIgaW5Eb20gPSAkLmNvbnRhaW5zKHRoaXMuJGVsZW1lbnRbMF0ub3duZXJEb2N1bWVudC5kb2N1bWVudEVsZW1lbnQsIHRoaXMuJGVsZW1lbnRbMF0pXG4gICAgICBpZiAoZS5pc0RlZmF1bHRQcmV2ZW50ZWQoKSB8fCAhaW5Eb20pIHJldHVyblxuICAgICAgdmFyIHRoYXQgPSB0aGlzXG5cbiAgICAgIHZhciAkdGlwID0gdGhpcy50aXAoKVxuXG4gICAgICB2YXIgdGlwSWQgPSB0aGlzLmdldFVJRCh0aGlzLnR5cGUpXG5cbiAgICAgIHRoaXMuc2V0Q29udGVudCgpXG4gICAgICAkdGlwLmF0dHIoJ2lkJywgdGlwSWQpXG4gICAgICB0aGlzLiRlbGVtZW50LmF0dHIoJ2FyaWEtZGVzY3JpYmVkYnknLCB0aXBJZClcblxuICAgICAgaWYgKHRoaXMub3B0aW9ucy5hbmltYXRpb24pICR0aXAuYWRkQ2xhc3MoJ2ZhZGUnKVxuXG4gICAgICB2YXIgcGxhY2VtZW50ID0gdHlwZW9mIHRoaXMub3B0aW9ucy5wbGFjZW1lbnQgPT0gJ2Z1bmN0aW9uJyA/XG4gICAgICAgIHRoaXMub3B0aW9ucy5wbGFjZW1lbnQuY2FsbCh0aGlzLCAkdGlwWzBdLCB0aGlzLiRlbGVtZW50WzBdKSA6XG4gICAgICAgIHRoaXMub3B0aW9ucy5wbGFjZW1lbnRcblxuICAgICAgdmFyIGF1dG9Ub2tlbiA9IC9cXHM/YXV0bz9cXHM/L2lcbiAgICAgIHZhciBhdXRvUGxhY2UgPSBhdXRvVG9rZW4udGVzdChwbGFjZW1lbnQpXG4gICAgICBpZiAoYXV0b1BsYWNlKSBwbGFjZW1lbnQgPSBwbGFjZW1lbnQucmVwbGFjZShhdXRvVG9rZW4sICcnKSB8fCAndG9wJ1xuXG4gICAgICAkdGlwXG4gICAgICAgIC5kZXRhY2goKVxuICAgICAgICAuY3NzKHsgdG9wOiAwLCBsZWZ0OiAwLCBkaXNwbGF5OiAnYmxvY2snIH0pXG4gICAgICAgIC5hZGRDbGFzcyhwbGFjZW1lbnQpXG4gICAgICAgIC5kYXRhKCdicy4nICsgdGhpcy50eXBlLCB0aGlzKVxuXG4gICAgICB0aGlzLm9wdGlvbnMuY29udGFpbmVyID8gJHRpcC5hcHBlbmRUbyh0aGlzLm9wdGlvbnMuY29udGFpbmVyKSA6ICR0aXAuaW5zZXJ0QWZ0ZXIodGhpcy4kZWxlbWVudClcbiAgICAgIHRoaXMuJGVsZW1lbnQudHJpZ2dlcignaW5zZXJ0ZWQuYnMuJyArIHRoaXMudHlwZSlcblxuICAgICAgdmFyIHBvcyAgICAgICAgICA9IHRoaXMuZ2V0UG9zaXRpb24oKVxuICAgICAgdmFyIGFjdHVhbFdpZHRoICA9ICR0aXBbMF0ub2Zmc2V0V2lkdGhcbiAgICAgIHZhciBhY3R1YWxIZWlnaHQgPSAkdGlwWzBdLm9mZnNldEhlaWdodFxuXG4gICAgICBpZiAoYXV0b1BsYWNlKSB7XG4gICAgICAgIHZhciBvcmdQbGFjZW1lbnQgPSBwbGFjZW1lbnRcbiAgICAgICAgdmFyIHZpZXdwb3J0RGltID0gdGhpcy5nZXRQb3NpdGlvbih0aGlzLiR2aWV3cG9ydClcblxuICAgICAgICBwbGFjZW1lbnQgPSBwbGFjZW1lbnQgPT0gJ2JvdHRvbScgJiYgcG9zLmJvdHRvbSArIGFjdHVhbEhlaWdodCA+IHZpZXdwb3J0RGltLmJvdHRvbSA/ICd0b3AnICAgIDpcbiAgICAgICAgICAgICAgICAgICAgcGxhY2VtZW50ID09ICd0b3AnICAgICYmIHBvcy50b3AgICAgLSBhY3R1YWxIZWlnaHQgPCB2aWV3cG9ydERpbS50b3AgICAgPyAnYm90dG9tJyA6XG4gICAgICAgICAgICAgICAgICAgIHBsYWNlbWVudCA9PSAncmlnaHQnICAmJiBwb3MucmlnaHQgICsgYWN0dWFsV2lkdGggID4gdmlld3BvcnREaW0ud2lkdGggID8gJ2xlZnQnICAgOlxuICAgICAgICAgICAgICAgICAgICBwbGFjZW1lbnQgPT0gJ2xlZnQnICAgJiYgcG9zLmxlZnQgICAtIGFjdHVhbFdpZHRoICA8IHZpZXdwb3J0RGltLmxlZnQgICA/ICdyaWdodCcgIDpcbiAgICAgICAgICAgICAgICAgICAgcGxhY2VtZW50XG5cbiAgICAgICAgJHRpcFxuICAgICAgICAgIC5yZW1vdmVDbGFzcyhvcmdQbGFjZW1lbnQpXG4gICAgICAgICAgLmFkZENsYXNzKHBsYWNlbWVudClcbiAgICAgIH1cblxuICAgICAgdmFyIGNhbGN1bGF0ZWRPZmZzZXQgPSB0aGlzLmdldENhbGN1bGF0ZWRPZmZzZXQocGxhY2VtZW50LCBwb3MsIGFjdHVhbFdpZHRoLCBhY3R1YWxIZWlnaHQpXG5cbiAgICAgIHRoaXMuYXBwbHlQbGFjZW1lbnQoY2FsY3VsYXRlZE9mZnNldCwgcGxhY2VtZW50KVxuXG4gICAgICB2YXIgY29tcGxldGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBwcmV2SG92ZXJTdGF0ZSA9IHRoYXQuaG92ZXJTdGF0ZVxuICAgICAgICB0aGF0LiRlbGVtZW50LnRyaWdnZXIoJ3Nob3duLmJzLicgKyB0aGF0LnR5cGUpXG4gICAgICAgIHRoYXQuaG92ZXJTdGF0ZSA9IG51bGxcblxuICAgICAgICBpZiAocHJldkhvdmVyU3RhdGUgPT0gJ291dCcpIHRoYXQubGVhdmUodGhhdClcbiAgICAgIH1cblxuICAgICAgJC5zdXBwb3J0LnRyYW5zaXRpb24gJiYgdGhpcy4kdGlwLmhhc0NsYXNzKCdmYWRlJykgP1xuICAgICAgICAkdGlwXG4gICAgICAgICAgLm9uZSgnYnNUcmFuc2l0aW9uRW5kJywgY29tcGxldGUpXG4gICAgICAgICAgLmVtdWxhdGVUcmFuc2l0aW9uRW5kKFRvb2x0aXAuVFJBTlNJVElPTl9EVVJBVElPTikgOlxuICAgICAgICBjb21wbGV0ZSgpXG4gICAgfVxuICB9XG5cbiAgVG9vbHRpcC5wcm90b3R5cGUuYXBwbHlQbGFjZW1lbnQgPSBmdW5jdGlvbiAob2Zmc2V0LCBwbGFjZW1lbnQpIHtcbiAgICB2YXIgJHRpcCAgID0gdGhpcy50aXAoKVxuICAgIHZhciB3aWR0aCAgPSAkdGlwWzBdLm9mZnNldFdpZHRoXG4gICAgdmFyIGhlaWdodCA9ICR0aXBbMF0ub2Zmc2V0SGVpZ2h0XG5cbiAgICAvLyBtYW51YWxseSByZWFkIG1hcmdpbnMgYmVjYXVzZSBnZXRCb3VuZGluZ0NsaWVudFJlY3QgaW5jbHVkZXMgZGlmZmVyZW5jZVxuICAgIHZhciBtYXJnaW5Ub3AgPSBwYXJzZUludCgkdGlwLmNzcygnbWFyZ2luLXRvcCcpLCAxMClcbiAgICB2YXIgbWFyZ2luTGVmdCA9IHBhcnNlSW50KCR0aXAuY3NzKCdtYXJnaW4tbGVmdCcpLCAxMClcblxuICAgIC8vIHdlIG11c3QgY2hlY2sgZm9yIE5hTiBmb3IgaWUgOC85XG4gICAgaWYgKGlzTmFOKG1hcmdpblRvcCkpICBtYXJnaW5Ub3AgID0gMFxuICAgIGlmIChpc05hTihtYXJnaW5MZWZ0KSkgbWFyZ2luTGVmdCA9IDBcblxuICAgIG9mZnNldC50b3AgICs9IG1hcmdpblRvcFxuICAgIG9mZnNldC5sZWZ0ICs9IG1hcmdpbkxlZnRcblxuICAgIC8vICQuZm4ub2Zmc2V0IGRvZXNuJ3Qgcm91bmQgcGl4ZWwgdmFsdWVzXG4gICAgLy8gc28gd2UgdXNlIHNldE9mZnNldCBkaXJlY3RseSB3aXRoIG91ciBvd24gZnVuY3Rpb24gQi0wXG4gICAgJC5vZmZzZXQuc2V0T2Zmc2V0KCR0aXBbMF0sICQuZXh0ZW5kKHtcbiAgICAgIHVzaW5nOiBmdW5jdGlvbiAocHJvcHMpIHtcbiAgICAgICAgJHRpcC5jc3Moe1xuICAgICAgICAgIHRvcDogTWF0aC5yb3VuZChwcm9wcy50b3ApLFxuICAgICAgICAgIGxlZnQ6IE1hdGgucm91bmQocHJvcHMubGVmdClcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9LCBvZmZzZXQpLCAwKVxuXG4gICAgJHRpcC5hZGRDbGFzcygnaW4nKVxuXG4gICAgLy8gY2hlY2sgdG8gc2VlIGlmIHBsYWNpbmcgdGlwIGluIG5ldyBvZmZzZXQgY2F1c2VkIHRoZSB0aXAgdG8gcmVzaXplIGl0c2VsZlxuICAgIHZhciBhY3R1YWxXaWR0aCAgPSAkdGlwWzBdLm9mZnNldFdpZHRoXG4gICAgdmFyIGFjdHVhbEhlaWdodCA9ICR0aXBbMF0ub2Zmc2V0SGVpZ2h0XG5cbiAgICBpZiAocGxhY2VtZW50ID09ICd0b3AnICYmIGFjdHVhbEhlaWdodCAhPSBoZWlnaHQpIHtcbiAgICAgIG9mZnNldC50b3AgPSBvZmZzZXQudG9wICsgaGVpZ2h0IC0gYWN0dWFsSGVpZ2h0XG4gICAgfVxuXG4gICAgdmFyIGRlbHRhID0gdGhpcy5nZXRWaWV3cG9ydEFkanVzdGVkRGVsdGEocGxhY2VtZW50LCBvZmZzZXQsIGFjdHVhbFdpZHRoLCBhY3R1YWxIZWlnaHQpXG5cbiAgICBpZiAoZGVsdGEubGVmdCkgb2Zmc2V0LmxlZnQgKz0gZGVsdGEubGVmdFxuICAgIGVsc2Ugb2Zmc2V0LnRvcCArPSBkZWx0YS50b3BcblxuICAgIHZhciBpc1ZlcnRpY2FsICAgICAgICAgID0gL3RvcHxib3R0b20vLnRlc3QocGxhY2VtZW50KVxuICAgIHZhciBhcnJvd0RlbHRhICAgICAgICAgID0gaXNWZXJ0aWNhbCA/IGRlbHRhLmxlZnQgKiAyIC0gd2lkdGggKyBhY3R1YWxXaWR0aCA6IGRlbHRhLnRvcCAqIDIgLSBoZWlnaHQgKyBhY3R1YWxIZWlnaHRcbiAgICB2YXIgYXJyb3dPZmZzZXRQb3NpdGlvbiA9IGlzVmVydGljYWwgPyAnb2Zmc2V0V2lkdGgnIDogJ29mZnNldEhlaWdodCdcblxuICAgICR0aXAub2Zmc2V0KG9mZnNldClcbiAgICB0aGlzLnJlcGxhY2VBcnJvdyhhcnJvd0RlbHRhLCAkdGlwWzBdW2Fycm93T2Zmc2V0UG9zaXRpb25dLCBpc1ZlcnRpY2FsKVxuICB9XG5cbiAgVG9vbHRpcC5wcm90b3R5cGUucmVwbGFjZUFycm93ID0gZnVuY3Rpb24gKGRlbHRhLCBkaW1lbnNpb24sIGlzVmVydGljYWwpIHtcbiAgICB0aGlzLmFycm93KClcbiAgICAgIC5jc3MoaXNWZXJ0aWNhbCA/ICdsZWZ0JyA6ICd0b3AnLCA1MCAqICgxIC0gZGVsdGEgLyBkaW1lbnNpb24pICsgJyUnKVxuICAgICAgLmNzcyhpc1ZlcnRpY2FsID8gJ3RvcCcgOiAnbGVmdCcsICcnKVxuICB9XG5cbiAgVG9vbHRpcC5wcm90b3R5cGUuc2V0Q29udGVudCA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgJHRpcCAgPSB0aGlzLnRpcCgpXG4gICAgdmFyIHRpdGxlID0gdGhpcy5nZXRUaXRsZSgpXG5cbiAgICAkdGlwLmZpbmQoJy50b29sdGlwLWlubmVyJylbdGhpcy5vcHRpb25zLmh0bWwgPyAnaHRtbCcgOiAndGV4dCddKHRpdGxlKVxuICAgICR0aXAucmVtb3ZlQ2xhc3MoJ2ZhZGUgaW4gdG9wIGJvdHRvbSBsZWZ0IHJpZ2h0JylcbiAgfVxuXG4gIFRvb2x0aXAucHJvdG90eXBlLmhpZGUgPSBmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgICB2YXIgdGhhdCA9IHRoaXNcbiAgICB2YXIgJHRpcCA9ICQodGhpcy4kdGlwKVxuICAgIHZhciBlICAgID0gJC5FdmVudCgnaGlkZS5icy4nICsgdGhpcy50eXBlKVxuXG4gICAgZnVuY3Rpb24gY29tcGxldGUoKSB7XG4gICAgICBpZiAodGhhdC5ob3ZlclN0YXRlICE9ICdpbicpICR0aXAuZGV0YWNoKClcbiAgICAgIGlmICh0aGF0LiRlbGVtZW50KSB7IC8vIFRPRE86IENoZWNrIHdoZXRoZXIgZ3VhcmRpbmcgdGhpcyBjb2RlIHdpdGggdGhpcyBgaWZgIGlzIHJlYWxseSBuZWNlc3NhcnkuXG4gICAgICAgIHRoYXQuJGVsZW1lbnRcbiAgICAgICAgICAucmVtb3ZlQXR0cignYXJpYS1kZXNjcmliZWRieScpXG4gICAgICAgICAgLnRyaWdnZXIoJ2hpZGRlbi5icy4nICsgdGhhdC50eXBlKVxuICAgICAgfVxuICAgICAgY2FsbGJhY2sgJiYgY2FsbGJhY2soKVxuICAgIH1cblxuICAgIHRoaXMuJGVsZW1lbnQudHJpZ2dlcihlKVxuXG4gICAgaWYgKGUuaXNEZWZhdWx0UHJldmVudGVkKCkpIHJldHVyblxuXG4gICAgJHRpcC5yZW1vdmVDbGFzcygnaW4nKVxuXG4gICAgJC5zdXBwb3J0LnRyYW5zaXRpb24gJiYgJHRpcC5oYXNDbGFzcygnZmFkZScpID9cbiAgICAgICR0aXBcbiAgICAgICAgLm9uZSgnYnNUcmFuc2l0aW9uRW5kJywgY29tcGxldGUpXG4gICAgICAgIC5lbXVsYXRlVHJhbnNpdGlvbkVuZChUb29sdGlwLlRSQU5TSVRJT05fRFVSQVRJT04pIDpcbiAgICAgIGNvbXBsZXRlKClcblxuICAgIHRoaXMuaG92ZXJTdGF0ZSA9IG51bGxcblxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICBUb29sdGlwLnByb3RvdHlwZS5maXhUaXRsZSA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgJGUgPSB0aGlzLiRlbGVtZW50XG4gICAgaWYgKCRlLmF0dHIoJ3RpdGxlJykgfHwgdHlwZW9mICRlLmF0dHIoJ2RhdGEtb3JpZ2luYWwtdGl0bGUnKSAhPSAnc3RyaW5nJykge1xuICAgICAgJGUuYXR0cignZGF0YS1vcmlnaW5hbC10aXRsZScsICRlLmF0dHIoJ3RpdGxlJykgfHwgJycpLmF0dHIoJ3RpdGxlJywgJycpXG4gICAgfVxuICB9XG5cbiAgVG9vbHRpcC5wcm90b3R5cGUuaGFzQ29udGVudCA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRUaXRsZSgpXG4gIH1cblxuICBUb29sdGlwLnByb3RvdHlwZS5nZXRQb3NpdGlvbiA9IGZ1bmN0aW9uICgkZWxlbWVudCkge1xuICAgICRlbGVtZW50ICAgPSAkZWxlbWVudCB8fCB0aGlzLiRlbGVtZW50XG5cbiAgICB2YXIgZWwgICAgID0gJGVsZW1lbnRbMF1cbiAgICB2YXIgaXNCb2R5ID0gZWwudGFnTmFtZSA9PSAnQk9EWSdcblxuICAgIHZhciBlbFJlY3QgICAgPSBlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuICAgIGlmIChlbFJlY3Qud2lkdGggPT0gbnVsbCkge1xuICAgICAgLy8gd2lkdGggYW5kIGhlaWdodCBhcmUgbWlzc2luZyBpbiBJRTgsIHNvIGNvbXB1dGUgdGhlbSBtYW51YWxseTsgc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS90d2JzL2Jvb3RzdHJhcC9pc3N1ZXMvMTQwOTNcbiAgICAgIGVsUmVjdCA9ICQuZXh0ZW5kKHt9LCBlbFJlY3QsIHsgd2lkdGg6IGVsUmVjdC5yaWdodCAtIGVsUmVjdC5sZWZ0LCBoZWlnaHQ6IGVsUmVjdC5ib3R0b20gLSBlbFJlY3QudG9wIH0pXG4gICAgfVxuICAgIHZhciBpc1N2ZyA9IHdpbmRvdy5TVkdFbGVtZW50ICYmIGVsIGluc3RhbmNlb2Ygd2luZG93LlNWR0VsZW1lbnRcbiAgICAvLyBBdm9pZCB1c2luZyAkLm9mZnNldCgpIG9uIFNWR3Mgc2luY2UgaXQgZ2l2ZXMgaW5jb3JyZWN0IHJlc3VsdHMgaW4galF1ZXJ5IDMuXG4gICAgLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS90d2JzL2Jvb3RzdHJhcC9pc3N1ZXMvMjAyODBcbiAgICB2YXIgZWxPZmZzZXQgID0gaXNCb2R5ID8geyB0b3A6IDAsIGxlZnQ6IDAgfSA6IChpc1N2ZyA/IG51bGwgOiAkZWxlbWVudC5vZmZzZXQoKSlcbiAgICB2YXIgc2Nyb2xsICAgID0geyBzY3JvbGw6IGlzQm9keSA/IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3AgfHwgZG9jdW1lbnQuYm9keS5zY3JvbGxUb3AgOiAkZWxlbWVudC5zY3JvbGxUb3AoKSB9XG4gICAgdmFyIG91dGVyRGltcyA9IGlzQm9keSA/IHsgd2lkdGg6ICQod2luZG93KS53aWR0aCgpLCBoZWlnaHQ6ICQod2luZG93KS5oZWlnaHQoKSB9IDogbnVsbFxuXG4gICAgcmV0dXJuICQuZXh0ZW5kKHt9LCBlbFJlY3QsIHNjcm9sbCwgb3V0ZXJEaW1zLCBlbE9mZnNldClcbiAgfVxuXG4gIFRvb2x0aXAucHJvdG90eXBlLmdldENhbGN1bGF0ZWRPZmZzZXQgPSBmdW5jdGlvbiAocGxhY2VtZW50LCBwb3MsIGFjdHVhbFdpZHRoLCBhY3R1YWxIZWlnaHQpIHtcbiAgICByZXR1cm4gcGxhY2VtZW50ID09ICdib3R0b20nID8geyB0b3A6IHBvcy50b3AgKyBwb3MuaGVpZ2h0LCAgIGxlZnQ6IHBvcy5sZWZ0ICsgcG9zLndpZHRoIC8gMiAtIGFjdHVhbFdpZHRoIC8gMiB9IDpcbiAgICAgICAgICAgcGxhY2VtZW50ID09ICd0b3AnICAgID8geyB0b3A6IHBvcy50b3AgLSBhY3R1YWxIZWlnaHQsIGxlZnQ6IHBvcy5sZWZ0ICsgcG9zLndpZHRoIC8gMiAtIGFjdHVhbFdpZHRoIC8gMiB9IDpcbiAgICAgICAgICAgcGxhY2VtZW50ID09ICdsZWZ0JyAgID8geyB0b3A6IHBvcy50b3AgKyBwb3MuaGVpZ2h0IC8gMiAtIGFjdHVhbEhlaWdodCAvIDIsIGxlZnQ6IHBvcy5sZWZ0IC0gYWN0dWFsV2lkdGggfSA6XG4gICAgICAgIC8qIHBsYWNlbWVudCA9PSAncmlnaHQnICovIHsgdG9wOiBwb3MudG9wICsgcG9zLmhlaWdodCAvIDIgLSBhY3R1YWxIZWlnaHQgLyAyLCBsZWZ0OiBwb3MubGVmdCArIHBvcy53aWR0aCB9XG5cbiAgfVxuXG4gIFRvb2x0aXAucHJvdG90eXBlLmdldFZpZXdwb3J0QWRqdXN0ZWREZWx0YSA9IGZ1bmN0aW9uIChwbGFjZW1lbnQsIHBvcywgYWN0dWFsV2lkdGgsIGFjdHVhbEhlaWdodCkge1xuICAgIHZhciBkZWx0YSA9IHsgdG9wOiAwLCBsZWZ0OiAwIH1cbiAgICBpZiAoIXRoaXMuJHZpZXdwb3J0KSByZXR1cm4gZGVsdGFcblxuICAgIHZhciB2aWV3cG9ydFBhZGRpbmcgPSB0aGlzLm9wdGlvbnMudmlld3BvcnQgJiYgdGhpcy5vcHRpb25zLnZpZXdwb3J0LnBhZGRpbmcgfHwgMFxuICAgIHZhciB2aWV3cG9ydERpbWVuc2lvbnMgPSB0aGlzLmdldFBvc2l0aW9uKHRoaXMuJHZpZXdwb3J0KVxuXG4gICAgaWYgKC9yaWdodHxsZWZ0Ly50ZXN0KHBsYWNlbWVudCkpIHtcbiAgICAgIHZhciB0b3BFZGdlT2Zmc2V0ICAgID0gcG9zLnRvcCAtIHZpZXdwb3J0UGFkZGluZyAtIHZpZXdwb3J0RGltZW5zaW9ucy5zY3JvbGxcbiAgICAgIHZhciBib3R0b21FZGdlT2Zmc2V0ID0gcG9zLnRvcCArIHZpZXdwb3J0UGFkZGluZyAtIHZpZXdwb3J0RGltZW5zaW9ucy5zY3JvbGwgKyBhY3R1YWxIZWlnaHRcbiAgICAgIGlmICh0b3BFZGdlT2Zmc2V0IDwgdmlld3BvcnREaW1lbnNpb25zLnRvcCkgeyAvLyB0b3Agb3ZlcmZsb3dcbiAgICAgICAgZGVsdGEudG9wID0gdmlld3BvcnREaW1lbnNpb25zLnRvcCAtIHRvcEVkZ2VPZmZzZXRcbiAgICAgIH0gZWxzZSBpZiAoYm90dG9tRWRnZU9mZnNldCA+IHZpZXdwb3J0RGltZW5zaW9ucy50b3AgKyB2aWV3cG9ydERpbWVuc2lvbnMuaGVpZ2h0KSB7IC8vIGJvdHRvbSBvdmVyZmxvd1xuICAgICAgICBkZWx0YS50b3AgPSB2aWV3cG9ydERpbWVuc2lvbnMudG9wICsgdmlld3BvcnREaW1lbnNpb25zLmhlaWdodCAtIGJvdHRvbUVkZ2VPZmZzZXRcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGxlZnRFZGdlT2Zmc2V0ICA9IHBvcy5sZWZ0IC0gdmlld3BvcnRQYWRkaW5nXG4gICAgICB2YXIgcmlnaHRFZGdlT2Zmc2V0ID0gcG9zLmxlZnQgKyB2aWV3cG9ydFBhZGRpbmcgKyBhY3R1YWxXaWR0aFxuICAgICAgaWYgKGxlZnRFZGdlT2Zmc2V0IDwgdmlld3BvcnREaW1lbnNpb25zLmxlZnQpIHsgLy8gbGVmdCBvdmVyZmxvd1xuICAgICAgICBkZWx0YS5sZWZ0ID0gdmlld3BvcnREaW1lbnNpb25zLmxlZnQgLSBsZWZ0RWRnZU9mZnNldFxuICAgICAgfSBlbHNlIGlmIChyaWdodEVkZ2VPZmZzZXQgPiB2aWV3cG9ydERpbWVuc2lvbnMucmlnaHQpIHsgLy8gcmlnaHQgb3ZlcmZsb3dcbiAgICAgICAgZGVsdGEubGVmdCA9IHZpZXdwb3J0RGltZW5zaW9ucy5sZWZ0ICsgdmlld3BvcnREaW1lbnNpb25zLndpZHRoIC0gcmlnaHRFZGdlT2Zmc2V0XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGRlbHRhXG4gIH1cblxuICBUb29sdGlwLnByb3RvdHlwZS5nZXRUaXRsZSA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgdGl0bGVcbiAgICB2YXIgJGUgPSB0aGlzLiRlbGVtZW50XG4gICAgdmFyIG8gID0gdGhpcy5vcHRpb25zXG5cbiAgICB0aXRsZSA9ICRlLmF0dHIoJ2RhdGEtb3JpZ2luYWwtdGl0bGUnKVxuICAgICAgfHwgKHR5cGVvZiBvLnRpdGxlID09ICdmdW5jdGlvbicgPyBvLnRpdGxlLmNhbGwoJGVbMF0pIDogIG8udGl0bGUpXG5cbiAgICByZXR1cm4gdGl0bGVcbiAgfVxuXG4gIFRvb2x0aXAucHJvdG90eXBlLmdldFVJRCA9IGZ1bmN0aW9uIChwcmVmaXgpIHtcbiAgICBkbyBwcmVmaXggKz0gfn4oTWF0aC5yYW5kb20oKSAqIDEwMDAwMDApXG4gICAgd2hpbGUgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHByZWZpeCkpXG4gICAgcmV0dXJuIHByZWZpeFxuICB9XG5cbiAgVG9vbHRpcC5wcm90b3R5cGUudGlwID0gZnVuY3Rpb24gKCkge1xuICAgIGlmICghdGhpcy4kdGlwKSB7XG4gICAgICB0aGlzLiR0aXAgPSAkKHRoaXMub3B0aW9ucy50ZW1wbGF0ZSlcbiAgICAgIGlmICh0aGlzLiR0aXAubGVuZ3RoICE9IDEpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKHRoaXMudHlwZSArICcgYHRlbXBsYXRlYCBvcHRpb24gbXVzdCBjb25zaXN0IG9mIGV4YWN0bHkgMSB0b3AtbGV2ZWwgZWxlbWVudCEnKVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcy4kdGlwXG4gIH1cblxuICBUb29sdGlwLnByb3RvdHlwZS5hcnJvdyA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gKHRoaXMuJGFycm93ID0gdGhpcy4kYXJyb3cgfHwgdGhpcy50aXAoKS5maW5kKCcudG9vbHRpcC1hcnJvdycpKVxuICB9XG5cbiAgVG9vbHRpcC5wcm90b3R5cGUuZW5hYmxlID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZW5hYmxlZCA9IHRydWVcbiAgfVxuXG4gIFRvb2x0aXAucHJvdG90eXBlLmRpc2FibGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5lbmFibGVkID0gZmFsc2VcbiAgfVxuXG4gIFRvb2x0aXAucHJvdG90eXBlLnRvZ2dsZUVuYWJsZWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5lbmFibGVkID0gIXRoaXMuZW5hYmxlZFxuICB9XG5cbiAgVG9vbHRpcC5wcm90b3R5cGUudG9nZ2xlID0gZnVuY3Rpb24gKGUpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXNcbiAgICBpZiAoZSkge1xuICAgICAgc2VsZiA9ICQoZS5jdXJyZW50VGFyZ2V0KS5kYXRhKCdicy4nICsgdGhpcy50eXBlKVxuICAgICAgaWYgKCFzZWxmKSB7XG4gICAgICAgIHNlbGYgPSBuZXcgdGhpcy5jb25zdHJ1Y3RvcihlLmN1cnJlbnRUYXJnZXQsIHRoaXMuZ2V0RGVsZWdhdGVPcHRpb25zKCkpXG4gICAgICAgICQoZS5jdXJyZW50VGFyZ2V0KS5kYXRhKCdicy4nICsgdGhpcy50eXBlLCBzZWxmKVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChlKSB7XG4gICAgICBzZWxmLmluU3RhdGUuY2xpY2sgPSAhc2VsZi5pblN0YXRlLmNsaWNrXG4gICAgICBpZiAoc2VsZi5pc0luU3RhdGVUcnVlKCkpIHNlbGYuZW50ZXIoc2VsZilcbiAgICAgIGVsc2Ugc2VsZi5sZWF2ZShzZWxmKVxuICAgIH0gZWxzZSB7XG4gICAgICBzZWxmLnRpcCgpLmhhc0NsYXNzKCdpbicpID8gc2VsZi5sZWF2ZShzZWxmKSA6IHNlbGYuZW50ZXIoc2VsZilcbiAgICB9XG4gIH1cblxuICBUb29sdGlwLnByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciB0aGF0ID0gdGhpc1xuICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVvdXQpXG4gICAgdGhpcy5oaWRlKGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoYXQuJGVsZW1lbnQub2ZmKCcuJyArIHRoYXQudHlwZSkucmVtb3ZlRGF0YSgnYnMuJyArIHRoYXQudHlwZSlcbiAgICAgIGlmICh0aGF0LiR0aXApIHtcbiAgICAgICAgdGhhdC4kdGlwLmRldGFjaCgpXG4gICAgICB9XG4gICAgICB0aGF0LiR0aXAgPSBudWxsXG4gICAgICB0aGF0LiRhcnJvdyA9IG51bGxcbiAgICAgIHRoYXQuJHZpZXdwb3J0ID0gbnVsbFxuICAgICAgdGhhdC4kZWxlbWVudCA9IG51bGxcbiAgICB9KVxuICB9XG5cblxuICAvLyBUT09MVElQIFBMVUdJTiBERUZJTklUSU9OXG4gIC8vID09PT09PT09PT09PT09PT09PT09PT09PT1cblxuICBmdW5jdGlvbiBQbHVnaW4ob3B0aW9uKSB7XG4gICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgJHRoaXMgICA9ICQodGhpcylcbiAgICAgIHZhciBkYXRhICAgID0gJHRoaXMuZGF0YSgnYnMudG9vbHRpcCcpXG4gICAgICB2YXIgb3B0aW9ucyA9IHR5cGVvZiBvcHRpb24gPT0gJ29iamVjdCcgJiYgb3B0aW9uXG5cbiAgICAgIGlmICghZGF0YSAmJiAvZGVzdHJveXxoaWRlLy50ZXN0KG9wdGlvbikpIHJldHVyblxuICAgICAgaWYgKCFkYXRhKSAkdGhpcy5kYXRhKCdicy50b29sdGlwJywgKGRhdGEgPSBuZXcgVG9vbHRpcCh0aGlzLCBvcHRpb25zKSkpXG4gICAgICBpZiAodHlwZW9mIG9wdGlvbiA9PSAnc3RyaW5nJykgZGF0YVtvcHRpb25dKClcbiAgICB9KVxuICB9XG5cbiAgdmFyIG9sZCA9ICQuZm4udG9vbHRpcFxuXG4gICQuZm4udG9vbHRpcCAgICAgICAgICAgICA9IFBsdWdpblxuICAkLmZuLnRvb2x0aXAuQ29uc3RydWN0b3IgPSBUb29sdGlwXG5cblxuICAvLyBUT09MVElQIE5PIENPTkZMSUNUXG4gIC8vID09PT09PT09PT09PT09PT09PT1cblxuICAkLmZuLnRvb2x0aXAubm9Db25mbGljdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAkLmZuLnRvb2x0aXAgPSBvbGRcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbn0oalF1ZXJ5KTtcblxuLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKiBCb290c3RyYXA6IHBvcG92ZXIuanMgdjMuMy43XG4gKiBodHRwOi8vZ2V0Ym9vdHN0cmFwLmNvbS9qYXZhc2NyaXB0LyNwb3BvdmVyc1xuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKiBDb3B5cmlnaHQgMjAxMS0yMDE2IFR3aXR0ZXIsIEluYy5cbiAqIExpY2Vuc2VkIHVuZGVyIE1JVCAoaHR0cHM6Ly9naXRodWIuY29tL3R3YnMvYm9vdHN0cmFwL2Jsb2IvbWFzdGVyL0xJQ0VOU0UpXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuXG4rZnVuY3Rpb24gKCQpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIC8vIFBPUE9WRVIgUFVCTElDIENMQVNTIERFRklOSVRJT05cbiAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4gIHZhciBQb3BvdmVyID0gZnVuY3Rpb24gKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICB0aGlzLmluaXQoJ3BvcG92ZXInLCBlbGVtZW50LCBvcHRpb25zKVxuICB9XG5cbiAgaWYgKCEkLmZuLnRvb2x0aXApIHRocm93IG5ldyBFcnJvcignUG9wb3ZlciByZXF1aXJlcyB0b29sdGlwLmpzJylcblxuICBQb3BvdmVyLlZFUlNJT04gID0gJzMuMy43J1xuXG4gIFBvcG92ZXIuREVGQVVMVFMgPSAkLmV4dGVuZCh7fSwgJC5mbi50b29sdGlwLkNvbnN0cnVjdG9yLkRFRkFVTFRTLCB7XG4gICAgcGxhY2VtZW50OiAncmlnaHQnLFxuICAgIHRyaWdnZXI6ICdjbGljaycsXG4gICAgY29udGVudDogJycsXG4gICAgdGVtcGxhdGU6ICc8ZGl2IGNsYXNzPVwicG9wb3ZlclwiIHJvbGU9XCJ0b29sdGlwXCI+PGRpdiBjbGFzcz1cImFycm93XCI+PC9kaXY+PGgzIGNsYXNzPVwicG9wb3Zlci10aXRsZVwiPjwvaDM+PGRpdiBjbGFzcz1cInBvcG92ZXItY29udGVudFwiPjwvZGl2PjwvZGl2PidcbiAgfSlcblxuXG4gIC8vIE5PVEU6IFBPUE9WRVIgRVhURU5EUyB0b29sdGlwLmpzXG4gIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbiAgUG9wb3Zlci5wcm90b3R5cGUgPSAkLmV4dGVuZCh7fSwgJC5mbi50b29sdGlwLkNvbnN0cnVjdG9yLnByb3RvdHlwZSlcblxuICBQb3BvdmVyLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFBvcG92ZXJcblxuICBQb3BvdmVyLnByb3RvdHlwZS5nZXREZWZhdWx0cyA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gUG9wb3Zlci5ERUZBVUxUU1xuICB9XG5cbiAgUG9wb3Zlci5wcm90b3R5cGUuc2V0Q29udGVudCA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgJHRpcCAgICA9IHRoaXMudGlwKClcbiAgICB2YXIgdGl0bGUgICA9IHRoaXMuZ2V0VGl0bGUoKVxuICAgIHZhciBjb250ZW50ID0gdGhpcy5nZXRDb250ZW50KClcblxuICAgICR0aXAuZmluZCgnLnBvcG92ZXItdGl0bGUnKVt0aGlzLm9wdGlvbnMuaHRtbCA/ICdodG1sJyA6ICd0ZXh0J10odGl0bGUpXG4gICAgJHRpcC5maW5kKCcucG9wb3Zlci1jb250ZW50JykuY2hpbGRyZW4oKS5kZXRhY2goKS5lbmQoKVsgLy8gd2UgdXNlIGFwcGVuZCBmb3IgaHRtbCBvYmplY3RzIHRvIG1haW50YWluIGpzIGV2ZW50c1xuICAgICAgdGhpcy5vcHRpb25zLmh0bWwgPyAodHlwZW9mIGNvbnRlbnQgPT0gJ3N0cmluZycgPyAnaHRtbCcgOiAnYXBwZW5kJykgOiAndGV4dCdcbiAgICBdKGNvbnRlbnQpXG5cbiAgICAkdGlwLnJlbW92ZUNsYXNzKCdmYWRlIHRvcCBib3R0b20gbGVmdCByaWdodCBpbicpXG5cbiAgICAvLyBJRTggZG9lc24ndCBhY2NlcHQgaGlkaW5nIHZpYSB0aGUgYDplbXB0eWAgcHNldWRvIHNlbGVjdG9yLCB3ZSBoYXZlIHRvIGRvXG4gICAgLy8gdGhpcyBtYW51YWxseSBieSBjaGVja2luZyB0aGUgY29udGVudHMuXG4gICAgaWYgKCEkdGlwLmZpbmQoJy5wb3BvdmVyLXRpdGxlJykuaHRtbCgpKSAkdGlwLmZpbmQoJy5wb3BvdmVyLXRpdGxlJykuaGlkZSgpXG4gIH1cblxuICBQb3BvdmVyLnByb3RvdHlwZS5oYXNDb250ZW50ID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLmdldFRpdGxlKCkgfHwgdGhpcy5nZXRDb250ZW50KClcbiAgfVxuXG4gIFBvcG92ZXIucHJvdG90eXBlLmdldENvbnRlbnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyICRlID0gdGhpcy4kZWxlbWVudFxuICAgIHZhciBvICA9IHRoaXMub3B0aW9uc1xuXG4gICAgcmV0dXJuICRlLmF0dHIoJ2RhdGEtY29udGVudCcpXG4gICAgICB8fCAodHlwZW9mIG8uY29udGVudCA9PSAnZnVuY3Rpb24nID9cbiAgICAgICAgICAgIG8uY29udGVudC5jYWxsKCRlWzBdKSA6XG4gICAgICAgICAgICBvLmNvbnRlbnQpXG4gIH1cblxuICBQb3BvdmVyLnByb3RvdHlwZS5hcnJvdyA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gKHRoaXMuJGFycm93ID0gdGhpcy4kYXJyb3cgfHwgdGhpcy50aXAoKS5maW5kKCcuYXJyb3cnKSlcbiAgfVxuXG5cbiAgLy8gUE9QT1ZFUiBQTFVHSU4gREVGSU5JVElPTlxuICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09XG5cbiAgZnVuY3Rpb24gUGx1Z2luKG9wdGlvbikge1xuICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgdmFyICR0aGlzICAgPSAkKHRoaXMpXG4gICAgICB2YXIgZGF0YSAgICA9ICR0aGlzLmRhdGEoJ2JzLnBvcG92ZXInKVxuICAgICAgdmFyIG9wdGlvbnMgPSB0eXBlb2Ygb3B0aW9uID09ICdvYmplY3QnICYmIG9wdGlvblxuXG4gICAgICBpZiAoIWRhdGEgJiYgL2Rlc3Ryb3l8aGlkZS8udGVzdChvcHRpb24pKSByZXR1cm5cbiAgICAgIGlmICghZGF0YSkgJHRoaXMuZGF0YSgnYnMucG9wb3ZlcicsIChkYXRhID0gbmV3IFBvcG92ZXIodGhpcywgb3B0aW9ucykpKVxuICAgICAgaWYgKHR5cGVvZiBvcHRpb24gPT0gJ3N0cmluZycpIGRhdGFbb3B0aW9uXSgpXG4gICAgfSlcbiAgfVxuXG4gIHZhciBvbGQgPSAkLmZuLnBvcG92ZXJcblxuICAkLmZuLnBvcG92ZXIgICAgICAgICAgICAgPSBQbHVnaW5cbiAgJC5mbi5wb3BvdmVyLkNvbnN0cnVjdG9yID0gUG9wb3ZlclxuXG5cbiAgLy8gUE9QT1ZFUiBOTyBDT05GTElDVFxuICAvLyA9PT09PT09PT09PT09PT09PT09XG5cbiAgJC5mbi5wb3BvdmVyLm5vQ29uZmxpY3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgJC5mbi5wb3BvdmVyID0gb2xkXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG59KGpRdWVyeSk7XG5cbi8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICogQm9vdHN0cmFwOiBzY3JvbGxzcHkuanMgdjMuMy43XG4gKiBodHRwOi8vZ2V0Ym9vdHN0cmFwLmNvbS9qYXZhc2NyaXB0LyNzY3JvbGxzcHlcbiAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICogQ29weXJpZ2h0IDIwMTEtMjAxNiBUd2l0dGVyLCBJbmMuXG4gKiBMaWNlbnNlZCB1bmRlciBNSVQgKGh0dHBzOi8vZ2l0aHViLmNvbS90d2JzL2Jvb3RzdHJhcC9ibG9iL21hc3Rlci9MSUNFTlNFKVxuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5cblxuK2Z1bmN0aW9uICgkKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICAvLyBTQ1JPTExTUFkgQ0xBU1MgREVGSU5JVElPTlxuICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4gIGZ1bmN0aW9uIFNjcm9sbFNweShlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgdGhpcy4kYm9keSAgICAgICAgICA9ICQoZG9jdW1lbnQuYm9keSlcbiAgICB0aGlzLiRzY3JvbGxFbGVtZW50ID0gJChlbGVtZW50KS5pcyhkb2N1bWVudC5ib2R5KSA/ICQod2luZG93KSA6ICQoZWxlbWVudClcbiAgICB0aGlzLm9wdGlvbnMgICAgICAgID0gJC5leHRlbmQoe30sIFNjcm9sbFNweS5ERUZBVUxUUywgb3B0aW9ucylcbiAgICB0aGlzLnNlbGVjdG9yICAgICAgID0gKHRoaXMub3B0aW9ucy50YXJnZXQgfHwgJycpICsgJyAubmF2IGxpID4gYSdcbiAgICB0aGlzLm9mZnNldHMgICAgICAgID0gW11cbiAgICB0aGlzLnRhcmdldHMgICAgICAgID0gW11cbiAgICB0aGlzLmFjdGl2ZVRhcmdldCAgID0gbnVsbFxuICAgIHRoaXMuc2Nyb2xsSGVpZ2h0ICAgPSAwXG5cbiAgICB0aGlzLiRzY3JvbGxFbGVtZW50Lm9uKCdzY3JvbGwuYnMuc2Nyb2xsc3B5JywgJC5wcm94eSh0aGlzLnByb2Nlc3MsIHRoaXMpKVxuICAgIHRoaXMucmVmcmVzaCgpXG4gICAgdGhpcy5wcm9jZXNzKClcbiAgfVxuXG4gIFNjcm9sbFNweS5WRVJTSU9OICA9ICczLjMuNydcblxuICBTY3JvbGxTcHkuREVGQVVMVFMgPSB7XG4gICAgb2Zmc2V0OiAxMFxuICB9XG5cbiAgU2Nyb2xsU3B5LnByb3RvdHlwZS5nZXRTY3JvbGxIZWlnaHQgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuJHNjcm9sbEVsZW1lbnRbMF0uc2Nyb2xsSGVpZ2h0IHx8IE1hdGgubWF4KHRoaXMuJGJvZHlbMF0uc2Nyb2xsSGVpZ2h0LCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsSGVpZ2h0KVxuICB9XG5cbiAgU2Nyb2xsU3B5LnByb3RvdHlwZS5yZWZyZXNoID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciB0aGF0ICAgICAgICAgID0gdGhpc1xuICAgIHZhciBvZmZzZXRNZXRob2QgID0gJ29mZnNldCdcbiAgICB2YXIgb2Zmc2V0QmFzZSAgICA9IDBcblxuICAgIHRoaXMub2Zmc2V0cyAgICAgID0gW11cbiAgICB0aGlzLnRhcmdldHMgICAgICA9IFtdXG4gICAgdGhpcy5zY3JvbGxIZWlnaHQgPSB0aGlzLmdldFNjcm9sbEhlaWdodCgpXG5cbiAgICBpZiAoISQuaXNXaW5kb3codGhpcy4kc2Nyb2xsRWxlbWVudFswXSkpIHtcbiAgICAgIG9mZnNldE1ldGhvZCA9ICdwb3NpdGlvbidcbiAgICAgIG9mZnNldEJhc2UgICA9IHRoaXMuJHNjcm9sbEVsZW1lbnQuc2Nyb2xsVG9wKClcbiAgICB9XG5cbiAgICB0aGlzLiRib2R5XG4gICAgICAuZmluZCh0aGlzLnNlbGVjdG9yKVxuICAgICAgLm1hcChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciAkZWwgICA9ICQodGhpcylcbiAgICAgICAgdmFyIGhyZWYgID0gJGVsLmRhdGEoJ3RhcmdldCcpIHx8ICRlbC5hdHRyKCdocmVmJylcbiAgICAgICAgdmFyICRocmVmID0gL14jLi8udGVzdChocmVmKSAmJiAkKGhyZWYpXG5cbiAgICAgICAgcmV0dXJuICgkaHJlZlxuICAgICAgICAgICYmICRocmVmLmxlbmd0aFxuICAgICAgICAgICYmICRocmVmLmlzKCc6dmlzaWJsZScpXG4gICAgICAgICAgJiYgW1skaHJlZltvZmZzZXRNZXRob2RdKCkudG9wICsgb2Zmc2V0QmFzZSwgaHJlZl1dKSB8fCBudWxsXG4gICAgICB9KVxuICAgICAgLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHsgcmV0dXJuIGFbMF0gLSBiWzBdIH0pXG4gICAgICAuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoYXQub2Zmc2V0cy5wdXNoKHRoaXNbMF0pXG4gICAgICAgIHRoYXQudGFyZ2V0cy5wdXNoKHRoaXNbMV0pXG4gICAgICB9KVxuICB9XG5cbiAgU2Nyb2xsU3B5LnByb3RvdHlwZS5wcm9jZXNzID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBzY3JvbGxUb3AgICAgPSB0aGlzLiRzY3JvbGxFbGVtZW50LnNjcm9sbFRvcCgpICsgdGhpcy5vcHRpb25zLm9mZnNldFxuICAgIHZhciBzY3JvbGxIZWlnaHQgPSB0aGlzLmdldFNjcm9sbEhlaWdodCgpXG4gICAgdmFyIG1heFNjcm9sbCAgICA9IHRoaXMub3B0aW9ucy5vZmZzZXQgKyBzY3JvbGxIZWlnaHQgLSB0aGlzLiRzY3JvbGxFbGVtZW50LmhlaWdodCgpXG4gICAgdmFyIG9mZnNldHMgICAgICA9IHRoaXMub2Zmc2V0c1xuICAgIHZhciB0YXJnZXRzICAgICAgPSB0aGlzLnRhcmdldHNcbiAgICB2YXIgYWN0aXZlVGFyZ2V0ID0gdGhpcy5hY3RpdmVUYXJnZXRcbiAgICB2YXIgaVxuXG4gICAgaWYgKHRoaXMuc2Nyb2xsSGVpZ2h0ICE9IHNjcm9sbEhlaWdodCkge1xuICAgICAgdGhpcy5yZWZyZXNoKClcbiAgICB9XG5cbiAgICBpZiAoc2Nyb2xsVG9wID49IG1heFNjcm9sbCkge1xuICAgICAgcmV0dXJuIGFjdGl2ZVRhcmdldCAhPSAoaSA9IHRhcmdldHNbdGFyZ2V0cy5sZW5ndGggLSAxXSkgJiYgdGhpcy5hY3RpdmF0ZShpKVxuICAgIH1cblxuICAgIGlmIChhY3RpdmVUYXJnZXQgJiYgc2Nyb2xsVG9wIDwgb2Zmc2V0c1swXSkge1xuICAgICAgdGhpcy5hY3RpdmVUYXJnZXQgPSBudWxsXG4gICAgICByZXR1cm4gdGhpcy5jbGVhcigpXG4gICAgfVxuXG4gICAgZm9yIChpID0gb2Zmc2V0cy5sZW5ndGg7IGktLTspIHtcbiAgICAgIGFjdGl2ZVRhcmdldCAhPSB0YXJnZXRzW2ldXG4gICAgICAgICYmIHNjcm9sbFRvcCA+PSBvZmZzZXRzW2ldXG4gICAgICAgICYmIChvZmZzZXRzW2kgKyAxXSA9PT0gdW5kZWZpbmVkIHx8IHNjcm9sbFRvcCA8IG9mZnNldHNbaSArIDFdKVxuICAgICAgICAmJiB0aGlzLmFjdGl2YXRlKHRhcmdldHNbaV0pXG4gICAgfVxuICB9XG5cbiAgU2Nyb2xsU3B5LnByb3RvdHlwZS5hY3RpdmF0ZSA9IGZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgICB0aGlzLmFjdGl2ZVRhcmdldCA9IHRhcmdldFxuXG4gICAgdGhpcy5jbGVhcigpXG5cbiAgICB2YXIgc2VsZWN0b3IgPSB0aGlzLnNlbGVjdG9yICtcbiAgICAgICdbZGF0YS10YXJnZXQ9XCInICsgdGFyZ2V0ICsgJ1wiXSwnICtcbiAgICAgIHRoaXMuc2VsZWN0b3IgKyAnW2hyZWY9XCInICsgdGFyZ2V0ICsgJ1wiXSdcblxuICAgIHZhciBhY3RpdmUgPSAkKHNlbGVjdG9yKVxuICAgICAgLnBhcmVudHMoJ2xpJylcbiAgICAgIC5hZGRDbGFzcygnYWN0aXZlJylcblxuICAgIGlmIChhY3RpdmUucGFyZW50KCcuZHJvcGRvd24tbWVudScpLmxlbmd0aCkge1xuICAgICAgYWN0aXZlID0gYWN0aXZlXG4gICAgICAgIC5jbG9zZXN0KCdsaS5kcm9wZG93bicpXG4gICAgICAgIC5hZGRDbGFzcygnYWN0aXZlJylcbiAgICB9XG5cbiAgICBhY3RpdmUudHJpZ2dlcignYWN0aXZhdGUuYnMuc2Nyb2xsc3B5JylcbiAgfVxuXG4gIFNjcm9sbFNweS5wcm90b3R5cGUuY2xlYXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgJCh0aGlzLnNlbGVjdG9yKVxuICAgICAgLnBhcmVudHNVbnRpbCh0aGlzLm9wdGlvbnMudGFyZ2V0LCAnLmFjdGl2ZScpXG4gICAgICAucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpXG4gIH1cblxuXG4gIC8vIFNDUk9MTFNQWSBQTFVHSU4gREVGSU5JVElPTlxuICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuICBmdW5jdGlvbiBQbHVnaW4ob3B0aW9uKSB7XG4gICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgJHRoaXMgICA9ICQodGhpcylcbiAgICAgIHZhciBkYXRhICAgID0gJHRoaXMuZGF0YSgnYnMuc2Nyb2xsc3B5JylcbiAgICAgIHZhciBvcHRpb25zID0gdHlwZW9mIG9wdGlvbiA9PSAnb2JqZWN0JyAmJiBvcHRpb25cblxuICAgICAgaWYgKCFkYXRhKSAkdGhpcy5kYXRhKCdicy5zY3JvbGxzcHknLCAoZGF0YSA9IG5ldyBTY3JvbGxTcHkodGhpcywgb3B0aW9ucykpKVxuICAgICAgaWYgKHR5cGVvZiBvcHRpb24gPT0gJ3N0cmluZycpIGRhdGFbb3B0aW9uXSgpXG4gICAgfSlcbiAgfVxuXG4gIHZhciBvbGQgPSAkLmZuLnNjcm9sbHNweVxuXG4gICQuZm4uc2Nyb2xsc3B5ICAgICAgICAgICAgID0gUGx1Z2luXG4gICQuZm4uc2Nyb2xsc3B5LkNvbnN0cnVjdG9yID0gU2Nyb2xsU3B5XG5cblxuICAvLyBTQ1JPTExTUFkgTk8gQ09ORkxJQ1RcbiAgLy8gPT09PT09PT09PT09PT09PT09PT09XG5cbiAgJC5mbi5zY3JvbGxzcHkubm9Db25mbGljdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAkLmZuLnNjcm9sbHNweSA9IG9sZFxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuXG4gIC8vIFNDUk9MTFNQWSBEQVRBLUFQSVxuICAvLyA9PT09PT09PT09PT09PT09PT1cblxuICAkKHdpbmRvdykub24oJ2xvYWQuYnMuc2Nyb2xsc3B5LmRhdGEtYXBpJywgZnVuY3Rpb24gKCkge1xuICAgICQoJ1tkYXRhLXNweT1cInNjcm9sbFwiXScpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgdmFyICRzcHkgPSAkKHRoaXMpXG4gICAgICBQbHVnaW4uY2FsbCgkc3B5LCAkc3B5LmRhdGEoKSlcbiAgICB9KVxuICB9KVxuXG59KGpRdWVyeSk7XG5cbi8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICogQm9vdHN0cmFwOiB0YWIuanMgdjMuMy43XG4gKiBodHRwOi8vZ2V0Ym9vdHN0cmFwLmNvbS9qYXZhc2NyaXB0LyN0YWJzXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqIENvcHlyaWdodCAyMDExLTIwMTYgVHdpdHRlciwgSW5jLlxuICogTGljZW5zZWQgdW5kZXIgTUlUIChodHRwczovL2dpdGh1Yi5jb20vdHdicy9ib290c3RyYXAvYmxvYi9tYXN0ZXIvTElDRU5TRSlcbiAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXG5cbitmdW5jdGlvbiAoJCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgLy8gVEFCIENMQVNTIERFRklOSVRJT05cbiAgLy8gPT09PT09PT09PT09PT09PT09PT1cblxuICB2YXIgVGFiID0gZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAvLyBqc2NzOmRpc2FibGUgcmVxdWlyZURvbGxhckJlZm9yZWpRdWVyeUFzc2lnbm1lbnRcbiAgICB0aGlzLmVsZW1lbnQgPSAkKGVsZW1lbnQpXG4gICAgLy8ganNjczplbmFibGUgcmVxdWlyZURvbGxhckJlZm9yZWpRdWVyeUFzc2lnbm1lbnRcbiAgfVxuXG4gIFRhYi5WRVJTSU9OID0gJzMuMy43J1xuXG4gIFRhYi5UUkFOU0lUSU9OX0RVUkFUSU9OID0gMTUwXG5cbiAgVGFiLnByb3RvdHlwZS5zaG93ID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciAkdGhpcyAgICA9IHRoaXMuZWxlbWVudFxuICAgIHZhciAkdWwgICAgICA9ICR0aGlzLmNsb3Nlc3QoJ3VsOm5vdCguZHJvcGRvd24tbWVudSknKVxuICAgIHZhciBzZWxlY3RvciA9ICR0aGlzLmRhdGEoJ3RhcmdldCcpXG5cbiAgICBpZiAoIXNlbGVjdG9yKSB7XG4gICAgICBzZWxlY3RvciA9ICR0aGlzLmF0dHIoJ2hyZWYnKVxuICAgICAgc2VsZWN0b3IgPSBzZWxlY3RvciAmJiBzZWxlY3Rvci5yZXBsYWNlKC8uKig/PSNbXlxcc10qJCkvLCAnJykgLy8gc3RyaXAgZm9yIGllN1xuICAgIH1cblxuICAgIGlmICgkdGhpcy5wYXJlbnQoJ2xpJykuaGFzQ2xhc3MoJ2FjdGl2ZScpKSByZXR1cm5cblxuICAgIHZhciAkcHJldmlvdXMgPSAkdWwuZmluZCgnLmFjdGl2ZTpsYXN0IGEnKVxuICAgIHZhciBoaWRlRXZlbnQgPSAkLkV2ZW50KCdoaWRlLmJzLnRhYicsIHtcbiAgICAgIHJlbGF0ZWRUYXJnZXQ6ICR0aGlzWzBdXG4gICAgfSlcbiAgICB2YXIgc2hvd0V2ZW50ID0gJC5FdmVudCgnc2hvdy5icy50YWInLCB7XG4gICAgICByZWxhdGVkVGFyZ2V0OiAkcHJldmlvdXNbMF1cbiAgICB9KVxuXG4gICAgJHByZXZpb3VzLnRyaWdnZXIoaGlkZUV2ZW50KVxuICAgICR0aGlzLnRyaWdnZXIoc2hvd0V2ZW50KVxuXG4gICAgaWYgKHNob3dFdmVudC5pc0RlZmF1bHRQcmV2ZW50ZWQoKSB8fCBoaWRlRXZlbnQuaXNEZWZhdWx0UHJldmVudGVkKCkpIHJldHVyblxuXG4gICAgdmFyICR0YXJnZXQgPSAkKHNlbGVjdG9yKVxuXG4gICAgdGhpcy5hY3RpdmF0ZSgkdGhpcy5jbG9zZXN0KCdsaScpLCAkdWwpXG4gICAgdGhpcy5hY3RpdmF0ZSgkdGFyZ2V0LCAkdGFyZ2V0LnBhcmVudCgpLCBmdW5jdGlvbiAoKSB7XG4gICAgICAkcHJldmlvdXMudHJpZ2dlcih7XG4gICAgICAgIHR5cGU6ICdoaWRkZW4uYnMudGFiJyxcbiAgICAgICAgcmVsYXRlZFRhcmdldDogJHRoaXNbMF1cbiAgICAgIH0pXG4gICAgICAkdGhpcy50cmlnZ2VyKHtcbiAgICAgICAgdHlwZTogJ3Nob3duLmJzLnRhYicsXG4gICAgICAgIHJlbGF0ZWRUYXJnZXQ6ICRwcmV2aW91c1swXVxuICAgICAgfSlcbiAgICB9KVxuICB9XG5cbiAgVGFiLnByb3RvdHlwZS5hY3RpdmF0ZSA9IGZ1bmN0aW9uIChlbGVtZW50LCBjb250YWluZXIsIGNhbGxiYWNrKSB7XG4gICAgdmFyICRhY3RpdmUgICAgPSBjb250YWluZXIuZmluZCgnPiAuYWN0aXZlJylcbiAgICB2YXIgdHJhbnNpdGlvbiA9IGNhbGxiYWNrXG4gICAgICAmJiAkLnN1cHBvcnQudHJhbnNpdGlvblxuICAgICAgJiYgKCRhY3RpdmUubGVuZ3RoICYmICRhY3RpdmUuaGFzQ2xhc3MoJ2ZhZGUnKSB8fCAhIWNvbnRhaW5lci5maW5kKCc+IC5mYWRlJykubGVuZ3RoKVxuXG4gICAgZnVuY3Rpb24gbmV4dCgpIHtcbiAgICAgICRhY3RpdmVcbiAgICAgICAgLnJlbW92ZUNsYXNzKCdhY3RpdmUnKVxuICAgICAgICAuZmluZCgnPiAuZHJvcGRvd24tbWVudSA+IC5hY3RpdmUnKVxuICAgICAgICAgIC5yZW1vdmVDbGFzcygnYWN0aXZlJylcbiAgICAgICAgLmVuZCgpXG4gICAgICAgIC5maW5kKCdbZGF0YS10b2dnbGU9XCJ0YWJcIl0nKVxuICAgICAgICAgIC5hdHRyKCdhcmlhLWV4cGFuZGVkJywgZmFsc2UpXG5cbiAgICAgIGVsZW1lbnRcbiAgICAgICAgLmFkZENsYXNzKCdhY3RpdmUnKVxuICAgICAgICAuZmluZCgnW2RhdGEtdG9nZ2xlPVwidGFiXCJdJylcbiAgICAgICAgICAuYXR0cignYXJpYS1leHBhbmRlZCcsIHRydWUpXG5cbiAgICAgIGlmICh0cmFuc2l0aW9uKSB7XG4gICAgICAgIGVsZW1lbnRbMF0ub2Zmc2V0V2lkdGggLy8gcmVmbG93IGZvciB0cmFuc2l0aW9uXG4gICAgICAgIGVsZW1lbnQuYWRkQ2xhc3MoJ2luJylcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGVsZW1lbnQucmVtb3ZlQ2xhc3MoJ2ZhZGUnKVxuICAgICAgfVxuXG4gICAgICBpZiAoZWxlbWVudC5wYXJlbnQoJy5kcm9wZG93bi1tZW51JykubGVuZ3RoKSB7XG4gICAgICAgIGVsZW1lbnRcbiAgICAgICAgICAuY2xvc2VzdCgnbGkuZHJvcGRvd24nKVxuICAgICAgICAgICAgLmFkZENsYXNzKCdhY3RpdmUnKVxuICAgICAgICAgIC5lbmQoKVxuICAgICAgICAgIC5maW5kKCdbZGF0YS10b2dnbGU9XCJ0YWJcIl0nKVxuICAgICAgICAgICAgLmF0dHIoJ2FyaWEtZXhwYW5kZWQnLCB0cnVlKVxuICAgICAgfVxuXG4gICAgICBjYWxsYmFjayAmJiBjYWxsYmFjaygpXG4gICAgfVxuXG4gICAgJGFjdGl2ZS5sZW5ndGggJiYgdHJhbnNpdGlvbiA/XG4gICAgICAkYWN0aXZlXG4gICAgICAgIC5vbmUoJ2JzVHJhbnNpdGlvbkVuZCcsIG5leHQpXG4gICAgICAgIC5lbXVsYXRlVHJhbnNpdGlvbkVuZChUYWIuVFJBTlNJVElPTl9EVVJBVElPTikgOlxuICAgICAgbmV4dCgpXG5cbiAgICAkYWN0aXZlLnJlbW92ZUNsYXNzKCdpbicpXG4gIH1cblxuXG4gIC8vIFRBQiBQTFVHSU4gREVGSU5JVElPTlxuICAvLyA9PT09PT09PT09PT09PT09PT09PT1cblxuICBmdW5jdGlvbiBQbHVnaW4ob3B0aW9uKSB7XG4gICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgJHRoaXMgPSAkKHRoaXMpXG4gICAgICB2YXIgZGF0YSAgPSAkdGhpcy5kYXRhKCdicy50YWInKVxuXG4gICAgICBpZiAoIWRhdGEpICR0aGlzLmRhdGEoJ2JzLnRhYicsIChkYXRhID0gbmV3IFRhYih0aGlzKSkpXG4gICAgICBpZiAodHlwZW9mIG9wdGlvbiA9PSAnc3RyaW5nJykgZGF0YVtvcHRpb25dKClcbiAgICB9KVxuICB9XG5cbiAgdmFyIG9sZCA9ICQuZm4udGFiXG5cbiAgJC5mbi50YWIgICAgICAgICAgICAgPSBQbHVnaW5cbiAgJC5mbi50YWIuQ29uc3RydWN0b3IgPSBUYWJcblxuXG4gIC8vIFRBQiBOTyBDT05GTElDVFxuICAvLyA9PT09PT09PT09PT09PT1cblxuICAkLmZuLnRhYi5ub0NvbmZsaWN0ID0gZnVuY3Rpb24gKCkge1xuICAgICQuZm4udGFiID0gb2xkXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG5cbiAgLy8gVEFCIERBVEEtQVBJXG4gIC8vID09PT09PT09PT09PVxuXG4gIHZhciBjbGlja0hhbmRsZXIgPSBmdW5jdGlvbiAoZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgIFBsdWdpbi5jYWxsKCQodGhpcyksICdzaG93JylcbiAgfVxuXG4gICQoZG9jdW1lbnQpXG4gICAgLm9uKCdjbGljay5icy50YWIuZGF0YS1hcGknLCAnW2RhdGEtdG9nZ2xlPVwidGFiXCJdJywgY2xpY2tIYW5kbGVyKVxuICAgIC5vbignY2xpY2suYnMudGFiLmRhdGEtYXBpJywgJ1tkYXRhLXRvZ2dsZT1cInBpbGxcIl0nLCBjbGlja0hhbmRsZXIpXG5cbn0oalF1ZXJ5KTtcblxuLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKiBCb290c3RyYXA6IGFmZml4LmpzIHYzLjMuN1xuICogaHR0cDovL2dldGJvb3RzdHJhcC5jb20vamF2YXNjcmlwdC8jYWZmaXhcbiAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICogQ29weXJpZ2h0IDIwMTEtMjAxNiBUd2l0dGVyLCBJbmMuXG4gKiBMaWNlbnNlZCB1bmRlciBNSVQgKGh0dHBzOi8vZ2l0aHViLmNvbS90d2JzL2Jvb3RzdHJhcC9ibG9iL21hc3Rlci9MSUNFTlNFKVxuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5cblxuK2Z1bmN0aW9uICgkKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICAvLyBBRkZJWCBDTEFTUyBERUZJTklUSU9OXG4gIC8vID09PT09PT09PT09PT09PT09PT09PT1cblxuICB2YXIgQWZmaXggPSBmdW5jdGlvbiAoZWxlbWVudCwgb3B0aW9ucykge1xuICAgIHRoaXMub3B0aW9ucyA9ICQuZXh0ZW5kKHt9LCBBZmZpeC5ERUZBVUxUUywgb3B0aW9ucylcblxuICAgIHRoaXMuJHRhcmdldCA9ICQodGhpcy5vcHRpb25zLnRhcmdldClcbiAgICAgIC5vbignc2Nyb2xsLmJzLmFmZml4LmRhdGEtYXBpJywgJC5wcm94eSh0aGlzLmNoZWNrUG9zaXRpb24sIHRoaXMpKVxuICAgICAgLm9uKCdjbGljay5icy5hZmZpeC5kYXRhLWFwaScsICAkLnByb3h5KHRoaXMuY2hlY2tQb3NpdGlvbldpdGhFdmVudExvb3AsIHRoaXMpKVxuXG4gICAgdGhpcy4kZWxlbWVudCAgICAgPSAkKGVsZW1lbnQpXG4gICAgdGhpcy5hZmZpeGVkICAgICAgPSBudWxsXG4gICAgdGhpcy51bnBpbiAgICAgICAgPSBudWxsXG4gICAgdGhpcy5waW5uZWRPZmZzZXQgPSBudWxsXG5cbiAgICB0aGlzLmNoZWNrUG9zaXRpb24oKVxuICB9XG5cbiAgQWZmaXguVkVSU0lPTiAgPSAnMy4zLjcnXG5cbiAgQWZmaXguUkVTRVQgICAgPSAnYWZmaXggYWZmaXgtdG9wIGFmZml4LWJvdHRvbSdcblxuICBBZmZpeC5ERUZBVUxUUyA9IHtcbiAgICBvZmZzZXQ6IDAsXG4gICAgdGFyZ2V0OiB3aW5kb3dcbiAgfVxuXG4gIEFmZml4LnByb3RvdHlwZS5nZXRTdGF0ZSA9IGZ1bmN0aW9uIChzY3JvbGxIZWlnaHQsIGhlaWdodCwgb2Zmc2V0VG9wLCBvZmZzZXRCb3R0b20pIHtcbiAgICB2YXIgc2Nyb2xsVG9wICAgID0gdGhpcy4kdGFyZ2V0LnNjcm9sbFRvcCgpXG4gICAgdmFyIHBvc2l0aW9uICAgICA9IHRoaXMuJGVsZW1lbnQub2Zmc2V0KClcbiAgICB2YXIgdGFyZ2V0SGVpZ2h0ID0gdGhpcy4kdGFyZ2V0LmhlaWdodCgpXG5cbiAgICBpZiAob2Zmc2V0VG9wICE9IG51bGwgJiYgdGhpcy5hZmZpeGVkID09ICd0b3AnKSByZXR1cm4gc2Nyb2xsVG9wIDwgb2Zmc2V0VG9wID8gJ3RvcCcgOiBmYWxzZVxuXG4gICAgaWYgKHRoaXMuYWZmaXhlZCA9PSAnYm90dG9tJykge1xuICAgICAgaWYgKG9mZnNldFRvcCAhPSBudWxsKSByZXR1cm4gKHNjcm9sbFRvcCArIHRoaXMudW5waW4gPD0gcG9zaXRpb24udG9wKSA/IGZhbHNlIDogJ2JvdHRvbSdcbiAgICAgIHJldHVybiAoc2Nyb2xsVG9wICsgdGFyZ2V0SGVpZ2h0IDw9IHNjcm9sbEhlaWdodCAtIG9mZnNldEJvdHRvbSkgPyBmYWxzZSA6ICdib3R0b20nXG4gICAgfVxuXG4gICAgdmFyIGluaXRpYWxpemluZyAgID0gdGhpcy5hZmZpeGVkID09IG51bGxcbiAgICB2YXIgY29sbGlkZXJUb3AgICAgPSBpbml0aWFsaXppbmcgPyBzY3JvbGxUb3AgOiBwb3NpdGlvbi50b3BcbiAgICB2YXIgY29sbGlkZXJIZWlnaHQgPSBpbml0aWFsaXppbmcgPyB0YXJnZXRIZWlnaHQgOiBoZWlnaHRcblxuICAgIGlmIChvZmZzZXRUb3AgIT0gbnVsbCAmJiBzY3JvbGxUb3AgPD0gb2Zmc2V0VG9wKSByZXR1cm4gJ3RvcCdcbiAgICBpZiAob2Zmc2V0Qm90dG9tICE9IG51bGwgJiYgKGNvbGxpZGVyVG9wICsgY29sbGlkZXJIZWlnaHQgPj0gc2Nyb2xsSGVpZ2h0IC0gb2Zmc2V0Qm90dG9tKSkgcmV0dXJuICdib3R0b20nXG5cbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuXG4gIEFmZml4LnByb3RvdHlwZS5nZXRQaW5uZWRPZmZzZXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHRoaXMucGlubmVkT2Zmc2V0KSByZXR1cm4gdGhpcy5waW5uZWRPZmZzZXRcbiAgICB0aGlzLiRlbGVtZW50LnJlbW92ZUNsYXNzKEFmZml4LlJFU0VUKS5hZGRDbGFzcygnYWZmaXgnKVxuICAgIHZhciBzY3JvbGxUb3AgPSB0aGlzLiR0YXJnZXQuc2Nyb2xsVG9wKClcbiAgICB2YXIgcG9zaXRpb24gID0gdGhpcy4kZWxlbWVudC5vZmZzZXQoKVxuICAgIHJldHVybiAodGhpcy5waW5uZWRPZmZzZXQgPSBwb3NpdGlvbi50b3AgLSBzY3JvbGxUb3ApXG4gIH1cblxuICBBZmZpeC5wcm90b3R5cGUuY2hlY2tQb3NpdGlvbldpdGhFdmVudExvb3AgPSBmdW5jdGlvbiAoKSB7XG4gICAgc2V0VGltZW91dCgkLnByb3h5KHRoaXMuY2hlY2tQb3NpdGlvbiwgdGhpcyksIDEpXG4gIH1cblxuICBBZmZpeC5wcm90b3R5cGUuY2hlY2tQb3NpdGlvbiA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoIXRoaXMuJGVsZW1lbnQuaXMoJzp2aXNpYmxlJykpIHJldHVyblxuXG4gICAgdmFyIGhlaWdodCAgICAgICA9IHRoaXMuJGVsZW1lbnQuaGVpZ2h0KClcbiAgICB2YXIgb2Zmc2V0ICAgICAgID0gdGhpcy5vcHRpb25zLm9mZnNldFxuICAgIHZhciBvZmZzZXRUb3AgICAgPSBvZmZzZXQudG9wXG4gICAgdmFyIG9mZnNldEJvdHRvbSA9IG9mZnNldC5ib3R0b21cbiAgICB2YXIgc2Nyb2xsSGVpZ2h0ID0gTWF0aC5tYXgoJChkb2N1bWVudCkuaGVpZ2h0KCksICQoZG9jdW1lbnQuYm9keSkuaGVpZ2h0KCkpXG5cbiAgICBpZiAodHlwZW9mIG9mZnNldCAhPSAnb2JqZWN0JykgICAgICAgICBvZmZzZXRCb3R0b20gPSBvZmZzZXRUb3AgPSBvZmZzZXRcbiAgICBpZiAodHlwZW9mIG9mZnNldFRvcCA9PSAnZnVuY3Rpb24nKSAgICBvZmZzZXRUb3AgICAgPSBvZmZzZXQudG9wKHRoaXMuJGVsZW1lbnQpXG4gICAgaWYgKHR5cGVvZiBvZmZzZXRCb3R0b20gPT0gJ2Z1bmN0aW9uJykgb2Zmc2V0Qm90dG9tID0gb2Zmc2V0LmJvdHRvbSh0aGlzLiRlbGVtZW50KVxuXG4gICAgdmFyIGFmZml4ID0gdGhpcy5nZXRTdGF0ZShzY3JvbGxIZWlnaHQsIGhlaWdodCwgb2Zmc2V0VG9wLCBvZmZzZXRCb3R0b20pXG5cbiAgICBpZiAodGhpcy5hZmZpeGVkICE9IGFmZml4KSB7XG4gICAgICBpZiAodGhpcy51bnBpbiAhPSBudWxsKSB0aGlzLiRlbGVtZW50LmNzcygndG9wJywgJycpXG5cbiAgICAgIHZhciBhZmZpeFR5cGUgPSAnYWZmaXgnICsgKGFmZml4ID8gJy0nICsgYWZmaXggOiAnJylcbiAgICAgIHZhciBlICAgICAgICAgPSAkLkV2ZW50KGFmZml4VHlwZSArICcuYnMuYWZmaXgnKVxuXG4gICAgICB0aGlzLiRlbGVtZW50LnRyaWdnZXIoZSlcblxuICAgICAgaWYgKGUuaXNEZWZhdWx0UHJldmVudGVkKCkpIHJldHVyblxuXG4gICAgICB0aGlzLmFmZml4ZWQgPSBhZmZpeFxuICAgICAgdGhpcy51bnBpbiA9IGFmZml4ID09ICdib3R0b20nID8gdGhpcy5nZXRQaW5uZWRPZmZzZXQoKSA6IG51bGxcblxuICAgICAgdGhpcy4kZWxlbWVudFxuICAgICAgICAucmVtb3ZlQ2xhc3MoQWZmaXguUkVTRVQpXG4gICAgICAgIC5hZGRDbGFzcyhhZmZpeFR5cGUpXG4gICAgICAgIC50cmlnZ2VyKGFmZml4VHlwZS5yZXBsYWNlKCdhZmZpeCcsICdhZmZpeGVkJykgKyAnLmJzLmFmZml4JylcbiAgICB9XG5cbiAgICBpZiAoYWZmaXggPT0gJ2JvdHRvbScpIHtcbiAgICAgIHRoaXMuJGVsZW1lbnQub2Zmc2V0KHtcbiAgICAgICAgdG9wOiBzY3JvbGxIZWlnaHQgLSBoZWlnaHQgLSBvZmZzZXRCb3R0b21cbiAgICAgIH0pXG4gICAgfVxuICB9XG5cblxuICAvLyBBRkZJWCBQTFVHSU4gREVGSU5JVElPTlxuICAvLyA9PT09PT09PT09PT09PT09PT09PT09PVxuXG4gIGZ1bmN0aW9uIFBsdWdpbihvcHRpb24pIHtcbiAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciAkdGhpcyAgID0gJCh0aGlzKVxuICAgICAgdmFyIGRhdGEgICAgPSAkdGhpcy5kYXRhKCdicy5hZmZpeCcpXG4gICAgICB2YXIgb3B0aW9ucyA9IHR5cGVvZiBvcHRpb24gPT0gJ29iamVjdCcgJiYgb3B0aW9uXG5cbiAgICAgIGlmICghZGF0YSkgJHRoaXMuZGF0YSgnYnMuYWZmaXgnLCAoZGF0YSA9IG5ldyBBZmZpeCh0aGlzLCBvcHRpb25zKSkpXG4gICAgICBpZiAodHlwZW9mIG9wdGlvbiA9PSAnc3RyaW5nJykgZGF0YVtvcHRpb25dKClcbiAgICB9KVxuICB9XG5cbiAgdmFyIG9sZCA9ICQuZm4uYWZmaXhcblxuICAkLmZuLmFmZml4ICAgICAgICAgICAgID0gUGx1Z2luXG4gICQuZm4uYWZmaXguQ29uc3RydWN0b3IgPSBBZmZpeFxuXG5cbiAgLy8gQUZGSVggTk8gQ09ORkxJQ1RcbiAgLy8gPT09PT09PT09PT09PT09PT1cblxuICAkLmZuLmFmZml4Lm5vQ29uZmxpY3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgJC5mbi5hZmZpeCA9IG9sZFxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuXG4gIC8vIEFGRklYIERBVEEtQVBJXG4gIC8vID09PT09PT09PT09PT09XG5cbiAgJCh3aW5kb3cpLm9uKCdsb2FkJywgZnVuY3Rpb24gKCkge1xuICAgICQoJ1tkYXRhLXNweT1cImFmZml4XCJdJykuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgJHNweSA9ICQodGhpcylcbiAgICAgIHZhciBkYXRhID0gJHNweS5kYXRhKClcblxuICAgICAgZGF0YS5vZmZzZXQgPSBkYXRhLm9mZnNldCB8fCB7fVxuXG4gICAgICBpZiAoZGF0YS5vZmZzZXRCb3R0b20gIT0gbnVsbCkgZGF0YS5vZmZzZXQuYm90dG9tID0gZGF0YS5vZmZzZXRCb3R0b21cbiAgICAgIGlmIChkYXRhLm9mZnNldFRvcCAgICAhPSBudWxsKSBkYXRhLm9mZnNldC50b3AgICAgPSBkYXRhLm9mZnNldFRvcFxuXG4gICAgICBQbHVnaW4uY2FsbCgkc3B5LCBkYXRhKVxuICAgIH0pXG4gIH0pXG5cbn0oalF1ZXJ5KTtcbiIsIi8vIHwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gfCBCUzMgZGVzaWduZXJcbi8vIHwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gfFxuLy8gfCBUaGlzIGpRdWVyeSBzY3JpcHQgaXMgd3JpdHRlbiBieVxuLy8gfCBNb3J0ZW4gTmlzc2VuXG4vLyB8XG4vLyB8IC0gT3B0aW1pemUgZm9ybSBlbGVtZW50c1xuLy8gfCAtIEF0dGFjaCBmb290ZXIgdG8gYm90dG9tIG9mIHBhZ2Ugb24gbm9uLXRvdWNoIGRldmljZXNcbi8vIHwgLSBFbmFibGUgQlMzIHRvb2x0aXBzIG9uIG5vbi10b3VjaCBkZXZpY2VzXG4vLyB8IC0gRGlzYWJsZSBmb3JtIGF1dG9jb21wbGV0ZSBvbiBub24tdG91Y2ggZGV2aWNlc1xuLy8gfCAtIEFwcGx5IGxvYWRlciBpY29uIHRvIC5idG4uYnRuLWxvYWRlciBvbiBjbGlja1xuLy8gfCAtIFVzZSBhcHBlYXIgb24gbm9uLXRvdWNoIGRldmljZXNcbi8vIHxcblxuLy8ganNjczpkaXNhYmxlIHJlcXVpcmVDYW1lbENhc2VPclVwcGVyQ2FzZUlkZW50aWZpZXJzXG5cbnZhciBiczNEZXNpZ25lciA9IChmdW5jdGlvbiAoJCkge1xuICAgICd1c2Ugc3RyaWN0JztcblxuICAgIHZhciBNb2Rlcm5penIgPSB7fTtcbiAgICB2YXIgcHViID0ge307XG5cbiAgICAvKipcbiAgICAgKiBJbnN0YW50aWF0ZVxuICAgICAqL1xuICAgIHB1Yi5pbml0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZWdpc3RlckJvb3RFdmVudEhhbmRsZXJzKCk7XG4gICAgICAgIHJlZ2lzdGVyRXZlbnRIYW5kbGVycygpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlZ2lzdGVyIGJvb3QgZXZlbnQgaGFuZGxlcnNcbiAgICAgKi9cbiAgICBmdW5jdGlvbiByZWdpc3RlckJvb3RFdmVudEhhbmRsZXJzKCkge1xuICAgICAgICBpZiAoICEgTW9kZXJuaXpyLnRvdWNoKSB7XG4gICAgICAgICAgICBmb290ZXJBdHRhY2hlZCgpO1xuICAgICAgICAgICAgb3B0aW1pemVGb3JtRWxlbWVudHMoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGFwcGVhcigpO1xuICAgICAgICBiczNUb29sdGlwKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVnaXN0ZXIgZXZlbnQgaGFuZGxlcnNcbiAgICAgKi9cbiAgICBmdW5jdGlvbiByZWdpc3RlckV2ZW50SGFuZGxlcnMoKSB7XG5cbiAgICAgICAgJCh3aW5kb3cpLnJlc2l6ZShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBmb290ZXJBdHRhY2hlZCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICAkKCcuYnRuLWxvYWRlcicpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGljb25TcGluKCQodGhpcykpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGb290ZXIgYXR0YWNoZWRcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBmb290ZXJBdHRhY2hlZCgpIHtcbiAgICAgICAgdmFyICRmb290ZXIgPSAkKCcuZm9vdGVyJyk7XG4gICAgICAgIHZhciBmb290ZXJIZWlnaHQgPSAkZm9vdGVyLm91dGVySGVpZ2h0KHRydWUpO1xuXG4gICAgICAgIGlmICgkKCdib2R5JykuaGFzQ2xhc3MoJ2Zvb3Rlci1hdHRhY2hlZCcpKSB7XG4gICAgICAgICAgICAkKCcuaW5uZXItd3JhcHBlcicpLmNzcygncGFkZGluZy1ib3R0b20nLCBmb290ZXJIZWlnaHQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQXBwZWFyXG4gICAgICovXG4gICAgZnVuY3Rpb24gYXBwZWFyKCkge1xuICAgICAgICB2YXIgJGFwcGVhciA9ICQoJy5hcHBlYXInKTtcbiAgICAgICAgdmFyICRhbmltYXRpb24gPSAkKCcuYW5pbWF0aW9uJyk7XG5cbiAgICAgICAgaWYgKE1vZGVybml6ci50b3VjaCB8fCAhTW9kZXJuaXpyLmNzc2FuaW1hdGlvbnMpIHtcblxuICAgICAgICAgICAgJGFuaW1hdGlvblxuICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnYW5pbWF0aW9uJylcbiAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2FuaW1hdGlvbi1hcHBlYXItZnJvbS10b3AnKVxuICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnYW5pbWF0aW9uLWFwcGVhci1mcm9tLXJpZ2h0JylcbiAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2FuaW1hdGlvbi1hcHBlYXItZnJvbS1sZWZ0JylcbiAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2FuaW1hdGlvbi1hcHBlYXItZnJvbS1ib3R0b20nKVxuICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnYW5pbWF0aW9uLWFwcGVhci1mcm9tLWNlbnRlcicpO1xuXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBFbmFibGUgYXBwZWFyXG4gICAgICAgICRhcHBlYXIuYXBwZWFyKCk7XG5cbiAgICAgICAgLy8gRm9yY2UgcHJvY2Vzc2luZyBvbiBhbmltYXRpb24gb2JqZWN0c1xuICAgICAgICAkYW5pbWF0aW9uLmFwcGVhcih7XG4gICAgICAgICAgICBmb3JjZV9wcm9jZXNzOiB0cnVlXG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIEFuaW1hdGlvbiBvYmplY3QgaGFzIGFwcGVhcmVkXG4gICAgICAgICRhbmltYXRpb24ub24oJ2FwcGVhcicsIGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgdmFyICRlbGVtZW50ID0gJCh0aGlzKTtcbiAgICAgICAgICAgIHZhciBkZWxheSA9ICRlbGVtZW50LmRhdGEoJ2RlbGF5Jyk7XG5cbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICRlbGVtZW50LmFkZENsYXNzKCdhbmltYXRpb24tc3RhcnQnKTtcbiAgICAgICAgICAgIH0sIGRlbGF5KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQlMgdG9vbHRpcFxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGJzM1Rvb2x0aXAoKSB7XG4gICAgICAgIGlmIChNb2Rlcm5penIudG91Y2gpIHtcbiAgICAgICAgICAgICQoJ1tkYXRhLXRvZ2dsZT10b29sdGlwXScpLnRvb2x0aXAoJ2hpZGUnKTtcblxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgJCgnW2RhdGEtdG9nZ2xlPXRvb2x0aXBdJykudG9vbHRpcCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE9wdGltaXplIGZvcm0gZWxlbWVudHNcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBvcHRpbWl6ZUZvcm1FbGVtZW50cygpIHtcbiAgICAgICAgJCgnZm9ybScpLmF0dHIoJ2F1dG9jb21wbGV0ZScsICdvZmYnKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJY29uIHNwaW5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBpY29uU3BpbigkZWxlbWVudCkge1xuICAgICAgICAkZWxlbWVudC5maW5kKCcuaWNvbicpLmFkZENsYXNzKCdpY29uLXNwaW4nKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcHViO1xufSkoalF1ZXJ5KTtcbiIsIi8vIHwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gfCBCUzMgc2lkZWJhclxuLy8gfC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyB8XG4vLyB8IEFwcCBhbGlrZSBuYXZpZ2F0aW9uIHdpdGggc2lkZWJhci5cbi8vIHxcbi8vIHwgVGhpcyBqUXVlcnkgc2NyaXB0IGlzIHdyaXR0ZW4gYnlcbi8vIHwgTW9ydGVuIE5pc3NlblxuLy8gfFxudmFyIGJzM1NpZGViYXIgPSAoZnVuY3Rpb24gKCQpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIHZhciBNb2Rlcm5penIgPSB7fTtcbiAgdmFyIHB1YiA9IHt9O1xuXG4gIC8qKlxuICAgKiBJbnN0YW50aWF0ZVxuICAgKi9cbiAgcHViLmluaXQgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgIHJlZ2lzdGVyRXZlbnRIYW5kbGVycygpO1xuICAgIHJlZ2lzdGVyQm9vdEV2ZW50SGFuZGxlcnMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZWdpc3RlciBldmVudCBoYW5kbGVyc1xuICAgKi9cbiAgZnVuY3Rpb24gcmVnaXN0ZXJFdmVudEhhbmRsZXJzKCkge1xuXG4gICAgLy8gVG9nZ2xlIHNpZGViYXJcbiAgICAkKCdbZGF0YS1zaWRlYmFyLXRvZ2dsZV0nKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgIHZhciAkZWxlbWVudCA9ICQodGhpcyk7XG5cbiAgICAgIHRvZ2dsZVNpZGViYXIoJGVsZW1lbnQpO1xuICAgIH0pO1xuXG4gICAgLy8gVG9nZ2xlIGRyb3Bkb3duXG4gICAgJCgnLnNpZGViYXIgLnNpZGViYXItbmF2aWdhdGlvbi1kcm9wZG93biA+IGEgPiAuc2lkZWJhci1uYXZpZ2F0aW9uLWRyb3Bkb3duLXRvZ2dsZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgdmFyICRlbGVtZW50ID0gJCh0aGlzKTtcblxuICAgICAgdG9nZ2xlRHJvcGRvd24oJGVsZW1lbnQpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlZ2lzdGVyIGJvb3QgZXZlbnQgaGFuZGxlcnNcbiAgICovXG4gIGZ1bmN0aW9uIHJlZ2lzdGVyQm9vdEV2ZW50SGFuZGxlcnMoKSB7XG4gIH1cblxuICAvKipcbiAgICogVG9nZ2xlIHNpZGViYXJcbiAgICovXG4gIGZ1bmN0aW9uIHRvZ2dsZVNpZGViYXIoJGVsZW1lbnQpIHtcbiAgICB2YXIgJGJvZHkgPSAkKCdib2R5Jyk7XG4gICAgdmFyIGF0dHJpYnV0ZSA9ICRlbGVtZW50LmF0dHIoJ2RhdGEtc2lkZWJhci10b2dnbGUnKTtcblxuICAgIGlmIChhdHRyaWJ1dGUgIT0gJ2xlZnQnICYmIGF0dHJpYnV0ZSAhPSAncmlnaHQnKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKGF0dHJpYnV0ZSA9PSAnbGVmdCcgJiYgJGJvZHkuaGFzQ2xhc3MoJ3NpZGViYXItcmlnaHQtb3BlbicpKSB7XG4gICAgICAkYm9keS5yZW1vdmVDbGFzcygnc2lkZWJhci1yaWdodC1vcGVuJyk7XG4gICAgfVxuXG4gICAgaWYgKGF0dHJpYnV0ZSA9PSAncmlnaHQnICYmICRib2R5Lmhhc0NsYXNzKCdzaWRlYmFyLWxlZnQtb3BlbicpKSB7XG4gICAgICAkYm9keS5yZW1vdmVDbGFzcygnc2lkZWJhci1sZWZ0LW9wZW4nKTtcbiAgICB9XG5cbiAgICAkYm9keS50b2dnbGVDbGFzcygnc2lkZWJhci0nICsgYXR0cmlidXRlICsgJy1vcGVuJyk7XG4gIH1cblxuICAvKipcbiAgICogVG9nZ2xlIGRyb3Bkb3duXG4gICAqL1xuICBmdW5jdGlvbiB0b2dnbGVEcm9wZG93bigkZWxlbWVudCkge1xuICAgIHZhciAkcGFyZW50ID0gJGVsZW1lbnQucGFyZW50KCkucGFyZW50KCk7XG4gICAgdmFyIHBhcmVudElzQWN0aXZlID0gJHBhcmVudC5oYXNDbGFzcygnYWN0aXZlJykgfHwgJHBhcmVudC5oYXNDbGFzcygnYWN0aXZlLXRyYWlsJykgPyB0cnVlIDogZmFsc2U7XG5cbiAgICBpZiAocGFyZW50SXNBY3RpdmUpIHtcbiAgICAgIGNsb3NlRHJvcGRvd24oJHBhcmVudCk7XG4gICAgfVxuXG4gICAgZWxzZSB7XG4gICAgICBvcGVuRHJvcGRvd24oJHBhcmVudCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIE9wZW4gZHJvcGRvd25cbiAgICovXG4gIGZ1bmN0aW9uIG9wZW5Ecm9wZG93bigkcGFyZW50KSB7XG4gICAgdmFyICRkcm9wZG93bk1lbnUgPSAkcGFyZW50LmZpbmQoJz4gLnNpZGViYXItbmF2aWdhdGlvbi1kcm9wZG93bi1tZW51Jyk7XG4gICAgdmFyIGRyb3Bkb3duTWVudUhlaWdodCA9ICRkcm9wZG93bk1lbnUub3V0ZXJIZWlnaHQodHJ1ZSk7XG4gICAgdmFyIHByZUFuaW1hdGlvbkNTUyA9IHsgb3BhY2l0eTogMC4xLCBoZWlnaHQ6IDAsIHRvcDogLTIwIH07XG4gICAgdmFyIGFuaW1hdGlvbkNTUyA9IHsgb3BhY2l0eTogMSwgaGVpZ2h0OiBkcm9wZG93bk1lbnVIZWlnaHQsIHRvcDogMCB9O1xuICAgIHZhciBjYWxsYmFja0Z1bmN0aW9uID0gZnVuY3Rpb24gKCkge1xuICAgICAgJGRyb3Bkb3duTWVudS5hdHRyKCdzdHlsZScsICcnKTtcbiAgICB9O1xuXG4gICAgY2xvc2VBbGxEcm9wZG93bk1lbnVzKCRwYXJlbnQpO1xuXG4gICAgJHBhcmVudC5hZGRDbGFzcygnYWN0aXZlJyk7XG5cbiAgICAkZHJvcGRvd25NZW51XG4gICAgICAuYWRkQ2xhc3MoJ2FjdGl2ZScpXG4gICAgICAuY3NzKHByZUFuaW1hdGlvbkNTUyk7XG5cbiAgICBkcm9wZG93bk1lbnVBbmltYXRlZFRvZ2dsZSgkZHJvcGRvd25NZW51LCBhbmltYXRpb25DU1MsIGNhbGxiYWNrRnVuY3Rpb24pO1xuICB9XG5cbiAgLyoqXG4gICAqIENsb3NlIGRyb3Bkb3duXG4gICAqL1xuICBmdW5jdGlvbiBjbG9zZURyb3Bkb3duKCRwYXJlbnQpIHtcbiAgICB2YXIgJGRyb3Bkb3duTWVudSA9ICRwYXJlbnQuZmluZCgnPiAuc2lkZWJhci1uYXZpZ2F0aW9uLWRyb3Bkb3duLW1lbnUnKTtcbiAgICB2YXIgYW5pbWF0aW9uQ1NTID0geyBoZWlnaHQ6IDAsIG9wYWNpdHk6IDAuMSB9O1xuICAgIHZhciBjYWxsYmFja0Z1bmN0aW9uID0gZnVuY3Rpb24gKCkge1xuXG4gICAgICAvLyBSZW1vdmUgYWxsIGFjdGl2ZSBjbGFzcycgZnJvbSBkcm9wZG93biBtZW51IGFuZCBhbGwgY2hpbGQgZWxlbWVudHMgd2l0aCBhY3RpdmUgc3RhdGVzXG4gICAgICAkZHJvcGRvd25NZW51XG4gICAgICAgIC5yZW1vdmVDbGFzcygnYWN0aXZlJylcbiAgICAgICAgLmF0dHIoJ3N0eWxlJywgJycpXG4gICAgICAgIC5maW5kKCcuYWN0aXZlOm5vdChhKScpXG4gICAgICAgIC5yZW1vdmVDbGFzcygnYWN0aXZlJylcbiAgICAgICAgLmF0dHIoJ3N0eWxlJywgJycpO1xuXG4gICAgICAkZHJvcGRvd25NZW51XG4gICAgICAgIC5yZW1vdmVDbGFzcygnYWN0aXZlLXRyYWlsJylcbiAgICAgICAgLmF0dHIoJ3N0eWxlJywgJycpXG4gICAgICAgIC5maW5kKCcuYWN0aXZlLXRyYWlsOm5vdChhKScpXG4gICAgICAgIC5yZW1vdmVDbGFzcygnYWN0aXZlLXRyYWlsJylcbiAgICAgICAgLmF0dHIoJ3N0eWxlJywgJycpO1xuICAgIH07XG5cbiAgICAkcGFyZW50XG4gICAgICAucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpXG4gICAgICAucmVtb3ZlQ2xhc3MoJ2FjdGl2ZS10cmFpbCcpO1xuXG4gICAgZHJvcGRvd25NZW51QW5pbWF0ZWRUb2dnbGUoJGRyb3Bkb3duTWVudSwgYW5pbWF0aW9uQ1NTLCBjYWxsYmFja0Z1bmN0aW9uKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDbG9zZSBhbGwgZHJvcGRvd24gbWVudXNcbiAgICovXG4gIGZ1bmN0aW9uIGNsb3NlQWxsRHJvcGRvd25NZW51cygkcGFyZW50KSB7XG4gICAgJHBhcmVudFxuICAgICAgLnNpYmxpbmdzKCcuc2lkZWJhci1uYXZpZ2F0aW9uLWRyb3Bkb3duLmFjdGl2ZSwgLnNpZGViYXItbmF2aWdhdGlvbi1kcm9wZG93bi5hY3RpdmUtdHJhaWwnKVxuICAgICAgLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgJGVsZW1lbnQgPSAkKHRoaXMpO1xuXG4gICAgICAgIGNsb3NlRHJvcGRvd24oJGVsZW1lbnQpO1xuICAgICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogRHJvcGRvd24gbWVudSBhbmltYXRlZCB0b2dnbGVcbiAgICovXG4gIGZ1bmN0aW9uIGRyb3Bkb3duTWVudUFuaW1hdGVkVG9nZ2xlKCRkcm9wZG93bk1lbnUsIGFuaW1hdGlvbkNTUywgY2FsbGJhY2tGdW5jdGlvbikge1xuICAgICRkcm9wZG93bk1lbnUuYW5pbWF0ZShcbiAgICAgIGFuaW1hdGlvbkNTUyxcbiAgICAgIHtcbiAgICAgICAgZHVyYXRpb246IDQwMCxcbiAgICAgICAgZWFzaW5nICA6ICdlYXNlT3V0U2luZScsXG4gICAgICAgIGNvbXBsZXRlOiBjYWxsYmFja0Z1bmN0aW9uXG4gICAgICB9KTtcbiAgfVxuXG4gIHJldHVybiBwdWI7XG59KShqUXVlcnkpO1xuIiwiOyhmdW5jdGlvbiAoKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHQvKipcblx0ICogQHByZXNlcnZlIEZhc3RDbGljazogcG9seWZpbGwgdG8gcmVtb3ZlIGNsaWNrIGRlbGF5cyBvbiBicm93c2VycyB3aXRoIHRvdWNoIFVJcy5cblx0ICpcblx0ICogQGNvZGluZ3N0YW5kYXJkIGZ0bGFicy1qc3YyXG5cdCAqIEBjb3B5cmlnaHQgVGhlIEZpbmFuY2lhbCBUaW1lcyBMaW1pdGVkIFtBbGwgUmlnaHRzIFJlc2VydmVkXVxuXHQgKiBAbGljZW5zZSBNSVQgTGljZW5zZSAoc2VlIExJQ0VOU0UudHh0KVxuXHQgKi9cblxuXHQvKmpzbGludCBicm93c2VyOnRydWUsIG5vZGU6dHJ1ZSovXG5cdC8qZ2xvYmFsIGRlZmluZSwgRXZlbnQsIE5vZGUqL1xuXG5cblx0LyoqXG5cdCAqIEluc3RhbnRpYXRlIGZhc3QtY2xpY2tpbmcgbGlzdGVuZXJzIG9uIHRoZSBzcGVjaWZpZWQgbGF5ZXIuXG5cdCAqXG5cdCAqIEBjb25zdHJ1Y3RvclxuXHQgKiBAcGFyYW0ge0VsZW1lbnR9IGxheWVyIFRoZSBsYXllciB0byBsaXN0ZW4gb25cblx0ICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zPXt9XSBUaGUgb3B0aW9ucyB0byBvdmVycmlkZSB0aGUgZGVmYXVsdHNcblx0ICovXG5cdGZ1bmN0aW9uIEZhc3RDbGljayhsYXllciwgb3B0aW9ucykge1xuXHRcdHZhciBvbGRPbkNsaWNrO1xuXG5cdFx0b3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cblx0XHQvKipcblx0XHQgKiBXaGV0aGVyIGEgY2xpY2sgaXMgY3VycmVudGx5IGJlaW5nIHRyYWNrZWQuXG5cdFx0ICpcblx0XHQgKiBAdHlwZSBib29sZWFuXG5cdFx0ICovXG5cdFx0dGhpcy50cmFja2luZ0NsaWNrID0gZmFsc2U7XG5cblxuXHRcdC8qKlxuXHRcdCAqIFRpbWVzdGFtcCBmb3Igd2hlbiBjbGljayB0cmFja2luZyBzdGFydGVkLlxuXHRcdCAqXG5cdFx0ICogQHR5cGUgbnVtYmVyXG5cdFx0ICovXG5cdFx0dGhpcy50cmFja2luZ0NsaWNrU3RhcnQgPSAwO1xuXG5cblx0XHQvKipcblx0XHQgKiBUaGUgZWxlbWVudCBiZWluZyB0cmFja2VkIGZvciBhIGNsaWNrLlxuXHRcdCAqXG5cdFx0ICogQHR5cGUgRXZlbnRUYXJnZXRcblx0XHQgKi9cblx0XHR0aGlzLnRhcmdldEVsZW1lbnQgPSBudWxsO1xuXG5cblx0XHQvKipcblx0XHQgKiBYLWNvb3JkaW5hdGUgb2YgdG91Y2ggc3RhcnQgZXZlbnQuXG5cdFx0ICpcblx0XHQgKiBAdHlwZSBudW1iZXJcblx0XHQgKi9cblx0XHR0aGlzLnRvdWNoU3RhcnRYID0gMDtcblxuXG5cdFx0LyoqXG5cdFx0ICogWS1jb29yZGluYXRlIG9mIHRvdWNoIHN0YXJ0IGV2ZW50LlxuXHRcdCAqXG5cdFx0ICogQHR5cGUgbnVtYmVyXG5cdFx0ICovXG5cdFx0dGhpcy50b3VjaFN0YXJ0WSA9IDA7XG5cblxuXHRcdC8qKlxuXHRcdCAqIElEIG9mIHRoZSBsYXN0IHRvdWNoLCByZXRyaWV2ZWQgZnJvbSBUb3VjaC5pZGVudGlmaWVyLlxuXHRcdCAqXG5cdFx0ICogQHR5cGUgbnVtYmVyXG5cdFx0ICovXG5cdFx0dGhpcy5sYXN0VG91Y2hJZGVudGlmaWVyID0gMDtcblxuXG5cdFx0LyoqXG5cdFx0ICogVG91Y2htb3ZlIGJvdW5kYXJ5LCBiZXlvbmQgd2hpY2ggYSBjbGljayB3aWxsIGJlIGNhbmNlbGxlZC5cblx0XHQgKlxuXHRcdCAqIEB0eXBlIG51bWJlclxuXHRcdCAqL1xuXHRcdHRoaXMudG91Y2hCb3VuZGFyeSA9IG9wdGlvbnMudG91Y2hCb3VuZGFyeSB8fCAxMDtcblxuXG5cdFx0LyoqXG5cdFx0ICogVGhlIEZhc3RDbGljayBsYXllci5cblx0XHQgKlxuXHRcdCAqIEB0eXBlIEVsZW1lbnRcblx0XHQgKi9cblx0XHR0aGlzLmxheWVyID0gbGF5ZXI7XG5cblx0XHQvKipcblx0XHQgKiBUaGUgbWluaW11bSB0aW1lIGJldHdlZW4gdGFwKHRvdWNoc3RhcnQgYW5kIHRvdWNoZW5kKSBldmVudHNcblx0XHQgKlxuXHRcdCAqIEB0eXBlIG51bWJlclxuXHRcdCAqL1xuXHRcdHRoaXMudGFwRGVsYXkgPSBvcHRpb25zLnRhcERlbGF5IHx8IDIwMDtcblxuXHRcdC8qKlxuXHRcdCAqIFRoZSBtYXhpbXVtIHRpbWUgZm9yIGEgdGFwXG5cdFx0ICpcblx0XHQgKiBAdHlwZSBudW1iZXJcblx0XHQgKi9cblx0XHR0aGlzLnRhcFRpbWVvdXQgPSBvcHRpb25zLnRhcFRpbWVvdXQgfHwgNzAwO1xuXG5cdFx0aWYgKEZhc3RDbGljay5ub3ROZWVkZWQobGF5ZXIpKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0Ly8gU29tZSBvbGQgdmVyc2lvbnMgb2YgQW5kcm9pZCBkb24ndCBoYXZlIEZ1bmN0aW9uLnByb3RvdHlwZS5iaW5kXG5cdFx0ZnVuY3Rpb24gYmluZChtZXRob2QsIGNvbnRleHQpIHtcblx0XHRcdHJldHVybiBmdW5jdGlvbigpIHsgcmV0dXJuIG1ldGhvZC5hcHBseShjb250ZXh0LCBhcmd1bWVudHMpOyB9O1xuXHRcdH1cblxuXG5cdFx0dmFyIG1ldGhvZHMgPSBbJ29uTW91c2UnLCAnb25DbGljaycsICdvblRvdWNoU3RhcnQnLCAnb25Ub3VjaE1vdmUnLCAnb25Ub3VjaEVuZCcsICdvblRvdWNoQ2FuY2VsJ107XG5cdFx0dmFyIGNvbnRleHQgPSB0aGlzO1xuXHRcdGZvciAodmFyIGkgPSAwLCBsID0gbWV0aG9kcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcblx0XHRcdGNvbnRleHRbbWV0aG9kc1tpXV0gPSBiaW5kKGNvbnRleHRbbWV0aG9kc1tpXV0sIGNvbnRleHQpO1xuXHRcdH1cblxuXHRcdC8vIFNldCB1cCBldmVudCBoYW5kbGVycyBhcyByZXF1aXJlZFxuXHRcdGlmIChkZXZpY2VJc0FuZHJvaWQpIHtcblx0XHRcdGxheWVyLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsIHRoaXMub25Nb3VzZSwgdHJ1ZSk7XG5cdFx0XHRsYXllci5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLm9uTW91c2UsIHRydWUpO1xuXHRcdFx0bGF5ZXIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMub25Nb3VzZSwgdHJ1ZSk7XG5cdFx0fVxuXG5cdFx0bGF5ZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLm9uQ2xpY2ssIHRydWUpO1xuXHRcdGxheWVyLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCB0aGlzLm9uVG91Y2hTdGFydCwgZmFsc2UpO1xuXHRcdGxheWVyLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIHRoaXMub25Ub3VjaE1vdmUsIGZhbHNlKTtcblx0XHRsYXllci5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIHRoaXMub25Ub3VjaEVuZCwgZmFsc2UpO1xuXHRcdGxheWVyLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoY2FuY2VsJywgdGhpcy5vblRvdWNoQ2FuY2VsLCBmYWxzZSk7XG5cblx0XHQvLyBIYWNrIGlzIHJlcXVpcmVkIGZvciBicm93c2VycyB0aGF0IGRvbid0IHN1cHBvcnQgRXZlbnQjc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uIChlLmcuIEFuZHJvaWQgMilcblx0XHQvLyB3aGljaCBpcyBob3cgRmFzdENsaWNrIG5vcm1hbGx5IHN0b3BzIGNsaWNrIGV2ZW50cyBidWJibGluZyB0byBjYWxsYmFja3MgcmVnaXN0ZXJlZCBvbiB0aGUgRmFzdENsaWNrXG5cdFx0Ly8gbGF5ZXIgd2hlbiB0aGV5IGFyZSBjYW5jZWxsZWQuXG5cdFx0aWYgKCFFdmVudC5wcm90b3R5cGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKSB7XG5cdFx0XHRsYXllci5yZW1vdmVFdmVudExpc3RlbmVyID0gZnVuY3Rpb24odHlwZSwgY2FsbGJhY2ssIGNhcHR1cmUpIHtcblx0XHRcdFx0dmFyIHJtdiA9IE5vZGUucHJvdG90eXBlLnJlbW92ZUV2ZW50TGlzdGVuZXI7XG5cdFx0XHRcdGlmICh0eXBlID09PSAnY2xpY2snKSB7XG5cdFx0XHRcdFx0cm12LmNhbGwobGF5ZXIsIHR5cGUsIGNhbGxiYWNrLmhpamFja2VkIHx8IGNhbGxiYWNrLCBjYXB0dXJlKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRybXYuY2FsbChsYXllciwgdHlwZSwgY2FsbGJhY2ssIGNhcHR1cmUpO1xuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXG5cdFx0XHRsYXllci5hZGRFdmVudExpc3RlbmVyID0gZnVuY3Rpb24odHlwZSwgY2FsbGJhY2ssIGNhcHR1cmUpIHtcblx0XHRcdFx0dmFyIGFkdiA9IE5vZGUucHJvdG90eXBlLmFkZEV2ZW50TGlzdGVuZXI7XG5cdFx0XHRcdGlmICh0eXBlID09PSAnY2xpY2snKSB7XG5cdFx0XHRcdFx0YWR2LmNhbGwobGF5ZXIsIHR5cGUsIGNhbGxiYWNrLmhpamFja2VkIHx8IChjYWxsYmFjay5oaWphY2tlZCA9IGZ1bmN0aW9uKGV2ZW50KSB7XG5cdFx0XHRcdFx0XHRpZiAoIWV2ZW50LnByb3BhZ2F0aW9uU3RvcHBlZCkge1xuXHRcdFx0XHRcdFx0XHRjYWxsYmFjayhldmVudCk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSksIGNhcHR1cmUpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGFkdi5jYWxsKGxheWVyLCB0eXBlLCBjYWxsYmFjaywgY2FwdHVyZSk7XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cdFx0fVxuXG5cdFx0Ly8gSWYgYSBoYW5kbGVyIGlzIGFscmVhZHkgZGVjbGFyZWQgaW4gdGhlIGVsZW1lbnQncyBvbmNsaWNrIGF0dHJpYnV0ZSwgaXQgd2lsbCBiZSBmaXJlZCBiZWZvcmVcblx0XHQvLyBGYXN0Q2xpY2sncyBvbkNsaWNrIGhhbmRsZXIuIEZpeCB0aGlzIGJ5IHB1bGxpbmcgb3V0IHRoZSB1c2VyLWRlZmluZWQgaGFuZGxlciBmdW5jdGlvbiBhbmRcblx0XHQvLyBhZGRpbmcgaXQgYXMgbGlzdGVuZXIuXG5cdFx0aWYgKHR5cGVvZiBsYXllci5vbmNsaWNrID09PSAnZnVuY3Rpb24nKSB7XG5cblx0XHRcdC8vIEFuZHJvaWQgYnJvd3NlciBvbiBhdCBsZWFzdCAzLjIgcmVxdWlyZXMgYSBuZXcgcmVmZXJlbmNlIHRvIHRoZSBmdW5jdGlvbiBpbiBsYXllci5vbmNsaWNrXG5cdFx0XHQvLyAtIHRoZSBvbGQgb25lIHdvbid0IHdvcmsgaWYgcGFzc2VkIHRvIGFkZEV2ZW50TGlzdGVuZXIgZGlyZWN0bHkuXG5cdFx0XHRvbGRPbkNsaWNrID0gbGF5ZXIub25jbGljaztcblx0XHRcdGxheWVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZXZlbnQpIHtcblx0XHRcdFx0b2xkT25DbGljayhldmVudCk7XG5cdFx0XHR9LCBmYWxzZSk7XG5cdFx0XHRsYXllci5vbmNsaWNrID0gbnVsbDtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0KiBXaW5kb3dzIFBob25lIDguMSBmYWtlcyB1c2VyIGFnZW50IHN0cmluZyB0byBsb29rIGxpa2UgQW5kcm9pZCBhbmQgaVBob25lLlxuXHQqXG5cdCogQHR5cGUgYm9vbGVhblxuXHQqL1xuXHR2YXIgZGV2aWNlSXNXaW5kb3dzUGhvbmUgPSBuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoXCJXaW5kb3dzIFBob25lXCIpID49IDA7XG5cblx0LyoqXG5cdCAqIEFuZHJvaWQgcmVxdWlyZXMgZXhjZXB0aW9ucy5cblx0ICpcblx0ICogQHR5cGUgYm9vbGVhblxuXHQgKi9cblx0dmFyIGRldmljZUlzQW5kcm9pZCA9IG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZignQW5kcm9pZCcpID4gMCAmJiAhZGV2aWNlSXNXaW5kb3dzUGhvbmU7XG5cblxuXHQvKipcblx0ICogaU9TIHJlcXVpcmVzIGV4Y2VwdGlvbnMuXG5cdCAqXG5cdCAqIEB0eXBlIGJvb2xlYW5cblx0ICovXG5cdHZhciBkZXZpY2VJc0lPUyA9IC9pUChhZHxob25lfG9kKS8udGVzdChuYXZpZ2F0b3IudXNlckFnZW50KSAmJiAhZGV2aWNlSXNXaW5kb3dzUGhvbmU7XG5cblxuXHQvKipcblx0ICogaU9TIDQgcmVxdWlyZXMgYW4gZXhjZXB0aW9uIGZvciBzZWxlY3QgZWxlbWVudHMuXG5cdCAqXG5cdCAqIEB0eXBlIGJvb2xlYW5cblx0ICovXG5cdHZhciBkZXZpY2VJc0lPUzQgPSBkZXZpY2VJc0lPUyAmJiAoL09TIDRfXFxkKF9cXGQpPy8pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCk7XG5cblxuXHQvKipcblx0ICogaU9TIDYuMC03LiogcmVxdWlyZXMgdGhlIHRhcmdldCBlbGVtZW50IHRvIGJlIG1hbnVhbGx5IGRlcml2ZWRcblx0ICpcblx0ICogQHR5cGUgYm9vbGVhblxuXHQgKi9cblx0dmFyIGRldmljZUlzSU9TV2l0aEJhZFRhcmdldCA9IGRldmljZUlzSU9TICYmICgvT1MgWzYtN11fXFxkLykudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KTtcblxuXHQvKipcblx0ICogQmxhY2tCZXJyeSByZXF1aXJlcyBleGNlcHRpb25zLlxuXHQgKlxuXHQgKiBAdHlwZSBib29sZWFuXG5cdCAqL1xuXHR2YXIgZGV2aWNlSXNCbGFja0JlcnJ5MTAgPSBuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoJ0JCMTAnKSA+IDA7XG5cblx0LyoqXG5cdCAqIERldGVybWluZSB3aGV0aGVyIGEgZ2l2ZW4gZWxlbWVudCByZXF1aXJlcyBhIG5hdGl2ZSBjbGljay5cblx0ICpcblx0ICogQHBhcmFtIHtFdmVudFRhcmdldHxFbGVtZW50fSB0YXJnZXQgVGFyZ2V0IERPTSBlbGVtZW50XG5cdCAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIHRydWUgaWYgdGhlIGVsZW1lbnQgbmVlZHMgYSBuYXRpdmUgY2xpY2tcblx0ICovXG5cdEZhc3RDbGljay5wcm90b3R5cGUubmVlZHNDbGljayA9IGZ1bmN0aW9uKHRhcmdldCkge1xuXHRcdHN3aXRjaCAodGFyZ2V0Lm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkpIHtcblxuXHRcdC8vIERvbid0IHNlbmQgYSBzeW50aGV0aWMgY2xpY2sgdG8gZGlzYWJsZWQgaW5wdXRzIChpc3N1ZSAjNjIpXG5cdFx0Y2FzZSAnYnV0dG9uJzpcblx0XHRjYXNlICdzZWxlY3QnOlxuXHRcdGNhc2UgJ3RleHRhcmVhJzpcblx0XHRcdGlmICh0YXJnZXQuZGlzYWJsZWQpIHtcblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHR9XG5cblx0XHRcdGJyZWFrO1xuXHRcdGNhc2UgJ2lucHV0JzpcblxuXHRcdFx0Ly8gRmlsZSBpbnB1dHMgbmVlZCByZWFsIGNsaWNrcyBvbiBpT1MgNiBkdWUgdG8gYSBicm93c2VyIGJ1ZyAoaXNzdWUgIzY4KVxuXHRcdFx0aWYgKChkZXZpY2VJc0lPUyAmJiB0YXJnZXQudHlwZSA9PT0gJ2ZpbGUnKSB8fCB0YXJnZXQuZGlzYWJsZWQpIHtcblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHR9XG5cblx0XHRcdGJyZWFrO1xuXHRcdGNhc2UgJ2xhYmVsJzpcblx0XHRjYXNlICdpZnJhbWUnOiAvLyBpT1M4IGhvbWVzY3JlZW4gYXBwcyBjYW4gcHJldmVudCBldmVudHMgYnViYmxpbmcgaW50byBmcmFtZXNcblx0XHRjYXNlICd2aWRlbyc6XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9XG5cblx0XHRyZXR1cm4gKC9cXGJuZWVkc2NsaWNrXFxiLykudGVzdCh0YXJnZXQuY2xhc3NOYW1lKTtcblx0fTtcblxuXG5cdC8qKlxuXHQgKiBEZXRlcm1pbmUgd2hldGhlciBhIGdpdmVuIGVsZW1lbnQgcmVxdWlyZXMgYSBjYWxsIHRvIGZvY3VzIHRvIHNpbXVsYXRlIGNsaWNrIGludG8gZWxlbWVudC5cblx0ICpcblx0ICogQHBhcmFtIHtFdmVudFRhcmdldHxFbGVtZW50fSB0YXJnZXQgVGFyZ2V0IERPTSBlbGVtZW50XG5cdCAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIHRydWUgaWYgdGhlIGVsZW1lbnQgcmVxdWlyZXMgYSBjYWxsIHRvIGZvY3VzIHRvIHNpbXVsYXRlIG5hdGl2ZSBjbGljay5cblx0ICovXG5cdEZhc3RDbGljay5wcm90b3R5cGUubmVlZHNGb2N1cyA9IGZ1bmN0aW9uKHRhcmdldCkge1xuXHRcdHN3aXRjaCAodGFyZ2V0Lm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkpIHtcblx0XHRjYXNlICd0ZXh0YXJlYSc6XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRjYXNlICdzZWxlY3QnOlxuXHRcdFx0cmV0dXJuICFkZXZpY2VJc0FuZHJvaWQ7XG5cdFx0Y2FzZSAnaW5wdXQnOlxuXHRcdFx0c3dpdGNoICh0YXJnZXQudHlwZSkge1xuXHRcdFx0Y2FzZSAnYnV0dG9uJzpcblx0XHRcdGNhc2UgJ2NoZWNrYm94Jzpcblx0XHRcdGNhc2UgJ2ZpbGUnOlxuXHRcdFx0Y2FzZSAnaW1hZ2UnOlxuXHRcdFx0Y2FzZSAncmFkaW8nOlxuXHRcdFx0Y2FzZSAnc3VibWl0Jzpcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBObyBwb2ludCBpbiBhdHRlbXB0aW5nIHRvIGZvY3VzIGRpc2FibGVkIGlucHV0c1xuXHRcdFx0cmV0dXJuICF0YXJnZXQuZGlzYWJsZWQgJiYgIXRhcmdldC5yZWFkT25seTtcblx0XHRkZWZhdWx0OlxuXHRcdFx0cmV0dXJuICgvXFxibmVlZHNmb2N1c1xcYi8pLnRlc3QodGFyZ2V0LmNsYXNzTmFtZSk7XG5cdFx0fVxuXHR9O1xuXG5cblx0LyoqXG5cdCAqIFNlbmQgYSBjbGljayBldmVudCB0byB0aGUgc3BlY2lmaWVkIGVsZW1lbnQuXG5cdCAqXG5cdCAqIEBwYXJhbSB7RXZlbnRUYXJnZXR8RWxlbWVudH0gdGFyZ2V0RWxlbWVudFxuXHQgKiBAcGFyYW0ge0V2ZW50fSBldmVudFxuXHQgKi9cblx0RmFzdENsaWNrLnByb3RvdHlwZS5zZW5kQ2xpY2sgPSBmdW5jdGlvbih0YXJnZXRFbGVtZW50LCBldmVudCkge1xuXHRcdHZhciBjbGlja0V2ZW50LCB0b3VjaDtcblxuXHRcdC8vIE9uIHNvbWUgQW5kcm9pZCBkZXZpY2VzIGFjdGl2ZUVsZW1lbnQgbmVlZHMgdG8gYmUgYmx1cnJlZCBvdGhlcndpc2UgdGhlIHN5bnRoZXRpYyBjbGljayB3aWxsIGhhdmUgbm8gZWZmZWN0ICgjMjQpXG5cdFx0aWYgKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgJiYgZG9jdW1lbnQuYWN0aXZlRWxlbWVudCAhPT0gdGFyZ2V0RWxlbWVudCkge1xuXHRcdFx0ZG9jdW1lbnQuYWN0aXZlRWxlbWVudC5ibHVyKCk7XG5cdFx0fVxuXG5cdFx0dG91Y2ggPSBldmVudC5jaGFuZ2VkVG91Y2hlc1swXTtcblxuXHRcdC8vIFN5bnRoZXNpc2UgYSBjbGljayBldmVudCwgd2l0aCBhbiBleHRyYSBhdHRyaWJ1dGUgc28gaXQgY2FuIGJlIHRyYWNrZWRcblx0XHRjbGlja0V2ZW50ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ01vdXNlRXZlbnRzJyk7XG5cdFx0Y2xpY2tFdmVudC5pbml0TW91c2VFdmVudCh0aGlzLmRldGVybWluZUV2ZW50VHlwZSh0YXJnZXRFbGVtZW50KSwgdHJ1ZSwgdHJ1ZSwgd2luZG93LCAxLCB0b3VjaC5zY3JlZW5YLCB0b3VjaC5zY3JlZW5ZLCB0b3VjaC5jbGllbnRYLCB0b3VjaC5jbGllbnRZLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgMCwgbnVsbCk7XG5cdFx0Y2xpY2tFdmVudC5mb3J3YXJkZWRUb3VjaEV2ZW50ID0gdHJ1ZTtcblx0XHR0YXJnZXRFbGVtZW50LmRpc3BhdGNoRXZlbnQoY2xpY2tFdmVudCk7XG5cdH07XG5cblx0RmFzdENsaWNrLnByb3RvdHlwZS5kZXRlcm1pbmVFdmVudFR5cGUgPSBmdW5jdGlvbih0YXJnZXRFbGVtZW50KSB7XG5cblx0XHQvL0lzc3VlICMxNTk6IEFuZHJvaWQgQ2hyb21lIFNlbGVjdCBCb3ggZG9lcyBub3Qgb3BlbiB3aXRoIGEgc3ludGhldGljIGNsaWNrIGV2ZW50XG5cdFx0aWYgKGRldmljZUlzQW5kcm9pZCAmJiB0YXJnZXRFbGVtZW50LnRhZ05hbWUudG9Mb3dlckNhc2UoKSA9PT0gJ3NlbGVjdCcpIHtcblx0XHRcdHJldHVybiAnbW91c2Vkb3duJztcblx0XHR9XG5cblx0XHRyZXR1cm4gJ2NsaWNrJztcblx0fTtcblxuXG5cdC8qKlxuXHQgKiBAcGFyYW0ge0V2ZW50VGFyZ2V0fEVsZW1lbnR9IHRhcmdldEVsZW1lbnRcblx0ICovXG5cdEZhc3RDbGljay5wcm90b3R5cGUuZm9jdXMgPSBmdW5jdGlvbih0YXJnZXRFbGVtZW50KSB7XG5cdFx0dmFyIGxlbmd0aDtcblxuXHRcdC8vIElzc3VlICMxNjA6IG9uIGlPUyA3LCBzb21lIGlucHV0IGVsZW1lbnRzIChlLmcuIGRhdGUgZGF0ZXRpbWUgbW9udGgpIHRocm93IGEgdmFndWUgVHlwZUVycm9yIG9uIHNldFNlbGVjdGlvblJhbmdlLiBUaGVzZSBlbGVtZW50cyBkb24ndCBoYXZlIGFuIGludGVnZXIgdmFsdWUgZm9yIHRoZSBzZWxlY3Rpb25TdGFydCBhbmQgc2VsZWN0aW9uRW5kIHByb3BlcnRpZXMsIGJ1dCB1bmZvcnR1bmF0ZWx5IHRoYXQgY2FuJ3QgYmUgdXNlZCBmb3IgZGV0ZWN0aW9uIGJlY2F1c2UgYWNjZXNzaW5nIHRoZSBwcm9wZXJ0aWVzIGFsc28gdGhyb3dzIGEgVHlwZUVycm9yLiBKdXN0IGNoZWNrIHRoZSB0eXBlIGluc3RlYWQuIEZpbGVkIGFzIEFwcGxlIGJ1ZyAjMTUxMjI3MjQuXG5cdFx0aWYgKGRldmljZUlzSU9TICYmIHRhcmdldEVsZW1lbnQuc2V0U2VsZWN0aW9uUmFuZ2UgJiYgdGFyZ2V0RWxlbWVudC50eXBlLmluZGV4T2YoJ2RhdGUnKSAhPT0gMCAmJiB0YXJnZXRFbGVtZW50LnR5cGUgIT09ICd0aW1lJyAmJiB0YXJnZXRFbGVtZW50LnR5cGUgIT09ICdtb250aCcpIHtcblx0XHRcdGxlbmd0aCA9IHRhcmdldEVsZW1lbnQudmFsdWUubGVuZ3RoO1xuXHRcdFx0dGFyZ2V0RWxlbWVudC5zZXRTZWxlY3Rpb25SYW5nZShsZW5ndGgsIGxlbmd0aCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRhcmdldEVsZW1lbnQuZm9jdXMoKTtcblx0XHR9XG5cdH07XG5cblxuXHQvKipcblx0ICogQ2hlY2sgd2hldGhlciB0aGUgZ2l2ZW4gdGFyZ2V0IGVsZW1lbnQgaXMgYSBjaGlsZCBvZiBhIHNjcm9sbGFibGUgbGF5ZXIgYW5kIGlmIHNvLCBzZXQgYSBmbGFnIG9uIGl0LlxuXHQgKlxuXHQgKiBAcGFyYW0ge0V2ZW50VGFyZ2V0fEVsZW1lbnR9IHRhcmdldEVsZW1lbnRcblx0ICovXG5cdEZhc3RDbGljay5wcm90b3R5cGUudXBkYXRlU2Nyb2xsUGFyZW50ID0gZnVuY3Rpb24odGFyZ2V0RWxlbWVudCkge1xuXHRcdHZhciBzY3JvbGxQYXJlbnQsIHBhcmVudEVsZW1lbnQ7XG5cblx0XHRzY3JvbGxQYXJlbnQgPSB0YXJnZXRFbGVtZW50LmZhc3RDbGlja1Njcm9sbFBhcmVudDtcblxuXHRcdC8vIEF0dGVtcHQgdG8gZGlzY292ZXIgd2hldGhlciB0aGUgdGFyZ2V0IGVsZW1lbnQgaXMgY29udGFpbmVkIHdpdGhpbiBhIHNjcm9sbGFibGUgbGF5ZXIuIFJlLWNoZWNrIGlmIHRoZVxuXHRcdC8vIHRhcmdldCBlbGVtZW50IHdhcyBtb3ZlZCB0byBhbm90aGVyIHBhcmVudC5cblx0XHRpZiAoIXNjcm9sbFBhcmVudCB8fCAhc2Nyb2xsUGFyZW50LmNvbnRhaW5zKHRhcmdldEVsZW1lbnQpKSB7XG5cdFx0XHRwYXJlbnRFbGVtZW50ID0gdGFyZ2V0RWxlbWVudDtcblx0XHRcdGRvIHtcblx0XHRcdFx0aWYgKHBhcmVudEVsZW1lbnQuc2Nyb2xsSGVpZ2h0ID4gcGFyZW50RWxlbWVudC5vZmZzZXRIZWlnaHQpIHtcblx0XHRcdFx0XHRzY3JvbGxQYXJlbnQgPSBwYXJlbnRFbGVtZW50O1xuXHRcdFx0XHRcdHRhcmdldEVsZW1lbnQuZmFzdENsaWNrU2Nyb2xsUGFyZW50ID0gcGFyZW50RWxlbWVudDtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHBhcmVudEVsZW1lbnQgPSBwYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQ7XG5cdFx0XHR9IHdoaWxlIChwYXJlbnRFbGVtZW50KTtcblx0XHR9XG5cblx0XHQvLyBBbHdheXMgdXBkYXRlIHRoZSBzY3JvbGwgdG9wIHRyYWNrZXIgaWYgcG9zc2libGUuXG5cdFx0aWYgKHNjcm9sbFBhcmVudCkge1xuXHRcdFx0c2Nyb2xsUGFyZW50LmZhc3RDbGlja0xhc3RTY3JvbGxUb3AgPSBzY3JvbGxQYXJlbnQuc2Nyb2xsVG9wO1xuXHRcdH1cblx0fTtcblxuXG5cdC8qKlxuXHQgKiBAcGFyYW0ge0V2ZW50VGFyZ2V0fSB0YXJnZXRFbGVtZW50XG5cdCAqIEByZXR1cm5zIHtFbGVtZW50fEV2ZW50VGFyZ2V0fVxuXHQgKi9cblx0RmFzdENsaWNrLnByb3RvdHlwZS5nZXRUYXJnZXRFbGVtZW50RnJvbUV2ZW50VGFyZ2V0ID0gZnVuY3Rpb24oZXZlbnRUYXJnZXQpIHtcblxuXHRcdC8vIE9uIHNvbWUgb2xkZXIgYnJvd3NlcnMgKG5vdGFibHkgU2FmYXJpIG9uIGlPUyA0LjEgLSBzZWUgaXNzdWUgIzU2KSB0aGUgZXZlbnQgdGFyZ2V0IG1heSBiZSBhIHRleHQgbm9kZS5cblx0XHRpZiAoZXZlbnRUYXJnZXQubm9kZVR5cGUgPT09IE5vZGUuVEVYVF9OT0RFKSB7XG5cdFx0XHRyZXR1cm4gZXZlbnRUYXJnZXQucGFyZW50Tm9kZTtcblx0XHR9XG5cblx0XHRyZXR1cm4gZXZlbnRUYXJnZXQ7XG5cdH07XG5cblxuXHQvKipcblx0ICogT24gdG91Y2ggc3RhcnQsIHJlY29yZCB0aGUgcG9zaXRpb24gYW5kIHNjcm9sbCBvZmZzZXQuXG5cdCAqXG5cdCAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50XG5cdCAqIEByZXR1cm5zIHtib29sZWFufVxuXHQgKi9cblx0RmFzdENsaWNrLnByb3RvdHlwZS5vblRvdWNoU3RhcnQgPSBmdW5jdGlvbihldmVudCkge1xuXHRcdHZhciB0YXJnZXRFbGVtZW50LCB0b3VjaCwgc2VsZWN0aW9uO1xuXG5cdFx0Ly8gSWdub3JlIG11bHRpcGxlIHRvdWNoZXMsIG90aGVyd2lzZSBwaW5jaC10by16b29tIGlzIHByZXZlbnRlZCBpZiBib3RoIGZpbmdlcnMgYXJlIG9uIHRoZSBGYXN0Q2xpY2sgZWxlbWVudCAoaXNzdWUgIzExMSkuXG5cdFx0aWYgKGV2ZW50LnRhcmdldFRvdWNoZXMubGVuZ3RoID4gMSkge1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fVxuXG5cdFx0dGFyZ2V0RWxlbWVudCA9IHRoaXMuZ2V0VGFyZ2V0RWxlbWVudEZyb21FdmVudFRhcmdldChldmVudC50YXJnZXQpO1xuXHRcdHRvdWNoID0gZXZlbnQudGFyZ2V0VG91Y2hlc1swXTtcblxuXHRcdGlmIChkZXZpY2VJc0lPUykge1xuXG5cdFx0XHQvLyBPbmx5IHRydXN0ZWQgZXZlbnRzIHdpbGwgZGVzZWxlY3QgdGV4dCBvbiBpT1MgKGlzc3VlICM0OSlcblx0XHRcdHNlbGVjdGlvbiA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKTtcblx0XHRcdGlmIChzZWxlY3Rpb24ucmFuZ2VDb3VudCAmJiAhc2VsZWN0aW9uLmlzQ29sbGFwc2VkKSB7XG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoIWRldmljZUlzSU9TNCkge1xuXG5cdFx0XHRcdC8vIFdlaXJkIHRoaW5ncyBoYXBwZW4gb24gaU9TIHdoZW4gYW4gYWxlcnQgb3IgY29uZmlybSBkaWFsb2cgaXMgb3BlbmVkIGZyb20gYSBjbGljayBldmVudCBjYWxsYmFjayAoaXNzdWUgIzIzKTpcblx0XHRcdFx0Ly8gd2hlbiB0aGUgdXNlciBuZXh0IHRhcHMgYW55d2hlcmUgZWxzZSBvbiB0aGUgcGFnZSwgbmV3IHRvdWNoc3RhcnQgYW5kIHRvdWNoZW5kIGV2ZW50cyBhcmUgZGlzcGF0Y2hlZFxuXHRcdFx0XHQvLyB3aXRoIHRoZSBzYW1lIGlkZW50aWZpZXIgYXMgdGhlIHRvdWNoIGV2ZW50IHRoYXQgcHJldmlvdXNseSB0cmlnZ2VyZWQgdGhlIGNsaWNrIHRoYXQgdHJpZ2dlcmVkIHRoZSBhbGVydC5cblx0XHRcdFx0Ly8gU2FkbHksIHRoZXJlIGlzIGFuIGlzc3VlIG9uIGlPUyA0IHRoYXQgY2F1c2VzIHNvbWUgbm9ybWFsIHRvdWNoIGV2ZW50cyB0byBoYXZlIHRoZSBzYW1lIGlkZW50aWZpZXIgYXMgYW5cblx0XHRcdFx0Ly8gaW1tZWRpYXRlbHkgcHJlY2VlZGluZyB0b3VjaCBldmVudCAoaXNzdWUgIzUyKSwgc28gdGhpcyBmaXggaXMgdW5hdmFpbGFibGUgb24gdGhhdCBwbGF0Zm9ybS5cblx0XHRcdFx0Ly8gSXNzdWUgMTIwOiB0b3VjaC5pZGVudGlmaWVyIGlzIDAgd2hlbiBDaHJvbWUgZGV2IHRvb2xzICdFbXVsYXRlIHRvdWNoIGV2ZW50cycgaXMgc2V0IHdpdGggYW4gaU9TIGRldmljZSBVQSBzdHJpbmcsXG5cdFx0XHRcdC8vIHdoaWNoIGNhdXNlcyBhbGwgdG91Y2ggZXZlbnRzIHRvIGJlIGlnbm9yZWQuIEFzIHRoaXMgYmxvY2sgb25seSBhcHBsaWVzIHRvIGlPUywgYW5kIGlPUyBpZGVudGlmaWVycyBhcmUgYWx3YXlzIGxvbmcsXG5cdFx0XHRcdC8vIHJhbmRvbSBpbnRlZ2VycywgaXQncyBzYWZlIHRvIHRvIGNvbnRpbnVlIGlmIHRoZSBpZGVudGlmaWVyIGlzIDAgaGVyZS5cblx0XHRcdFx0aWYgKHRvdWNoLmlkZW50aWZpZXIgJiYgdG91Y2guaWRlbnRpZmllciA9PT0gdGhpcy5sYXN0VG91Y2hJZGVudGlmaWVyKSB7XG5cdFx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR0aGlzLmxhc3RUb3VjaElkZW50aWZpZXIgPSB0b3VjaC5pZGVudGlmaWVyO1xuXG5cdFx0XHRcdC8vIElmIHRoZSB0YXJnZXQgZWxlbWVudCBpcyBhIGNoaWxkIG9mIGEgc2Nyb2xsYWJsZSBsYXllciAodXNpbmcgLXdlYmtpdC1vdmVyZmxvdy1zY3JvbGxpbmc6IHRvdWNoKSBhbmQ6XG5cdFx0XHRcdC8vIDEpIHRoZSB1c2VyIGRvZXMgYSBmbGluZyBzY3JvbGwgb24gdGhlIHNjcm9sbGFibGUgbGF5ZXJcblx0XHRcdFx0Ly8gMikgdGhlIHVzZXIgc3RvcHMgdGhlIGZsaW5nIHNjcm9sbCB3aXRoIGFub3RoZXIgdGFwXG5cdFx0XHRcdC8vIHRoZW4gdGhlIGV2ZW50LnRhcmdldCBvZiB0aGUgbGFzdCAndG91Y2hlbmQnIGV2ZW50IHdpbGwgYmUgdGhlIGVsZW1lbnQgdGhhdCB3YXMgdW5kZXIgdGhlIHVzZXIncyBmaW5nZXJcblx0XHRcdFx0Ly8gd2hlbiB0aGUgZmxpbmcgc2Nyb2xsIHdhcyBzdGFydGVkLCBjYXVzaW5nIEZhc3RDbGljayB0byBzZW5kIGEgY2xpY2sgZXZlbnQgdG8gdGhhdCBsYXllciAtIHVubGVzcyBhIGNoZWNrXG5cdFx0XHRcdC8vIGlzIG1hZGUgdG8gZW5zdXJlIHRoYXQgYSBwYXJlbnQgbGF5ZXIgd2FzIG5vdCBzY3JvbGxlZCBiZWZvcmUgc2VuZGluZyBhIHN5bnRoZXRpYyBjbGljayAoaXNzdWUgIzQyKS5cblx0XHRcdFx0dGhpcy51cGRhdGVTY3JvbGxQYXJlbnQodGFyZ2V0RWxlbWVudCk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0dGhpcy50cmFja2luZ0NsaWNrID0gdHJ1ZTtcblx0XHR0aGlzLnRyYWNraW5nQ2xpY2tTdGFydCA9IGV2ZW50LnRpbWVTdGFtcDtcblx0XHR0aGlzLnRhcmdldEVsZW1lbnQgPSB0YXJnZXRFbGVtZW50O1xuXG5cdFx0dGhpcy50b3VjaFN0YXJ0WCA9IHRvdWNoLnBhZ2VYO1xuXHRcdHRoaXMudG91Y2hTdGFydFkgPSB0b3VjaC5wYWdlWTtcblxuXHRcdC8vIFByZXZlbnQgcGhhbnRvbSBjbGlja3Mgb24gZmFzdCBkb3VibGUtdGFwIChpc3N1ZSAjMzYpXG5cdFx0aWYgKChldmVudC50aW1lU3RhbXAgLSB0aGlzLmxhc3RDbGlja1RpbWUpIDwgdGhpcy50YXBEZWxheSkge1xuXHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fTtcblxuXG5cdC8qKlxuXHQgKiBCYXNlZCBvbiBhIHRvdWNobW92ZSBldmVudCBvYmplY3QsIGNoZWNrIHdoZXRoZXIgdGhlIHRvdWNoIGhhcyBtb3ZlZCBwYXN0IGEgYm91bmRhcnkgc2luY2UgaXQgc3RhcnRlZC5cblx0ICpcblx0ICogQHBhcmFtIHtFdmVudH0gZXZlbnRcblx0ICogQHJldHVybnMge2Jvb2xlYW59XG5cdCAqL1xuXHRGYXN0Q2xpY2sucHJvdG90eXBlLnRvdWNoSGFzTW92ZWQgPSBmdW5jdGlvbihldmVudCkge1xuXHRcdHZhciB0b3VjaCA9IGV2ZW50LmNoYW5nZWRUb3VjaGVzWzBdLCBib3VuZGFyeSA9IHRoaXMudG91Y2hCb3VuZGFyeTtcblxuXHRcdGlmIChNYXRoLmFicyh0b3VjaC5wYWdlWCAtIHRoaXMudG91Y2hTdGFydFgpID4gYm91bmRhcnkgfHwgTWF0aC5hYnModG91Y2gucGFnZVkgLSB0aGlzLnRvdWNoU3RhcnRZKSA+IGJvdW5kYXJ5KSB7XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9XG5cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH07XG5cblxuXHQvKipcblx0ICogVXBkYXRlIHRoZSBsYXN0IHBvc2l0aW9uLlxuXHQgKlxuXHQgKiBAcGFyYW0ge0V2ZW50fSBldmVudFxuXHQgKiBAcmV0dXJucyB7Ym9vbGVhbn1cblx0ICovXG5cdEZhc3RDbGljay5wcm90b3R5cGUub25Ub3VjaE1vdmUgPSBmdW5jdGlvbihldmVudCkge1xuXHRcdGlmICghdGhpcy50cmFja2luZ0NsaWNrKSB7XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9XG5cblx0XHQvLyBJZiB0aGUgdG91Y2ggaGFzIG1vdmVkLCBjYW5jZWwgdGhlIGNsaWNrIHRyYWNraW5nXG5cdFx0aWYgKHRoaXMudGFyZ2V0RWxlbWVudCAhPT0gdGhpcy5nZXRUYXJnZXRFbGVtZW50RnJvbUV2ZW50VGFyZ2V0KGV2ZW50LnRhcmdldCkgfHwgdGhpcy50b3VjaEhhc01vdmVkKGV2ZW50KSkge1xuXHRcdFx0dGhpcy50cmFja2luZ0NsaWNrID0gZmFsc2U7XG5cdFx0XHR0aGlzLnRhcmdldEVsZW1lbnQgPSBudWxsO1xuXHRcdH1cblxuXHRcdHJldHVybiB0cnVlO1xuXHR9O1xuXG5cblx0LyoqXG5cdCAqIEF0dGVtcHQgdG8gZmluZCB0aGUgbGFiZWxsZWQgY29udHJvbCBmb3IgdGhlIGdpdmVuIGxhYmVsIGVsZW1lbnQuXG5cdCAqXG5cdCAqIEBwYXJhbSB7RXZlbnRUYXJnZXR8SFRNTExhYmVsRWxlbWVudH0gbGFiZWxFbGVtZW50XG5cdCAqIEByZXR1cm5zIHtFbGVtZW50fG51bGx9XG5cdCAqL1xuXHRGYXN0Q2xpY2sucHJvdG90eXBlLmZpbmRDb250cm9sID0gZnVuY3Rpb24obGFiZWxFbGVtZW50KSB7XG5cblx0XHQvLyBGYXN0IHBhdGggZm9yIG5ld2VyIGJyb3dzZXJzIHN1cHBvcnRpbmcgdGhlIEhUTUw1IGNvbnRyb2wgYXR0cmlidXRlXG5cdFx0aWYgKGxhYmVsRWxlbWVudC5jb250cm9sICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdHJldHVybiBsYWJlbEVsZW1lbnQuY29udHJvbDtcblx0XHR9XG5cblx0XHQvLyBBbGwgYnJvd3NlcnMgdW5kZXIgdGVzdCB0aGF0IHN1cHBvcnQgdG91Y2ggZXZlbnRzIGFsc28gc3VwcG9ydCB0aGUgSFRNTDUgaHRtbEZvciBhdHRyaWJ1dGVcblx0XHRpZiAobGFiZWxFbGVtZW50Lmh0bWxGb3IpIHtcblx0XHRcdHJldHVybiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChsYWJlbEVsZW1lbnQuaHRtbEZvcik7XG5cdFx0fVxuXG5cdFx0Ly8gSWYgbm8gZm9yIGF0dHJpYnV0ZSBleGlzdHMsIGF0dGVtcHQgdG8gcmV0cmlldmUgdGhlIGZpcnN0IGxhYmVsbGFibGUgZGVzY2VuZGFudCBlbGVtZW50XG5cdFx0Ly8gdGhlIGxpc3Qgb2Ygd2hpY2ggaXMgZGVmaW5lZCBoZXJlOiBodHRwOi8vd3d3LnczLm9yZy9UUi9odG1sNS9mb3Jtcy5odG1sI2NhdGVnb3J5LWxhYmVsXG5cdFx0cmV0dXJuIGxhYmVsRWxlbWVudC5xdWVyeVNlbGVjdG9yKCdidXR0b24sIGlucHV0Om5vdChbdHlwZT1oaWRkZW5dKSwga2V5Z2VuLCBtZXRlciwgb3V0cHV0LCBwcm9ncmVzcywgc2VsZWN0LCB0ZXh0YXJlYScpO1xuXHR9O1xuXG5cblx0LyoqXG5cdCAqIE9uIHRvdWNoIGVuZCwgZGV0ZXJtaW5lIHdoZXRoZXIgdG8gc2VuZCBhIGNsaWNrIGV2ZW50IGF0IG9uY2UuXG5cdCAqXG5cdCAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50XG5cdCAqIEByZXR1cm5zIHtib29sZWFufVxuXHQgKi9cblx0RmFzdENsaWNrLnByb3RvdHlwZS5vblRvdWNoRW5kID0gZnVuY3Rpb24oZXZlbnQpIHtcblx0XHR2YXIgZm9yRWxlbWVudCwgdHJhY2tpbmdDbGlja1N0YXJ0LCB0YXJnZXRUYWdOYW1lLCBzY3JvbGxQYXJlbnQsIHRvdWNoLCB0YXJnZXRFbGVtZW50ID0gdGhpcy50YXJnZXRFbGVtZW50O1xuXG5cdFx0aWYgKCF0aGlzLnRyYWNraW5nQ2xpY2spIHtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblxuXHRcdC8vIFByZXZlbnQgcGhhbnRvbSBjbGlja3Mgb24gZmFzdCBkb3VibGUtdGFwIChpc3N1ZSAjMzYpXG5cdFx0aWYgKChldmVudC50aW1lU3RhbXAgLSB0aGlzLmxhc3RDbGlja1RpbWUpIDwgdGhpcy50YXBEZWxheSkge1xuXHRcdFx0dGhpcy5jYW5jZWxOZXh0Q2xpY2sgPSB0cnVlO1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fVxuXG5cdFx0aWYgKChldmVudC50aW1lU3RhbXAgLSB0aGlzLnRyYWNraW5nQ2xpY2tTdGFydCkgPiB0aGlzLnRhcFRpbWVvdXQpIHtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblxuXHRcdC8vIFJlc2V0IHRvIHByZXZlbnQgd3JvbmcgY2xpY2sgY2FuY2VsIG9uIGlucHV0IChpc3N1ZSAjMTU2KS5cblx0XHR0aGlzLmNhbmNlbE5leHRDbGljayA9IGZhbHNlO1xuXG5cdFx0dGhpcy5sYXN0Q2xpY2tUaW1lID0gZXZlbnQudGltZVN0YW1wO1xuXG5cdFx0dHJhY2tpbmdDbGlja1N0YXJ0ID0gdGhpcy50cmFja2luZ0NsaWNrU3RhcnQ7XG5cdFx0dGhpcy50cmFja2luZ0NsaWNrID0gZmFsc2U7XG5cdFx0dGhpcy50cmFja2luZ0NsaWNrU3RhcnQgPSAwO1xuXG5cdFx0Ly8gT24gc29tZSBpT1MgZGV2aWNlcywgdGhlIHRhcmdldEVsZW1lbnQgc3VwcGxpZWQgd2l0aCB0aGUgZXZlbnQgaXMgaW52YWxpZCBpZiB0aGUgbGF5ZXJcblx0XHQvLyBpcyBwZXJmb3JtaW5nIGEgdHJhbnNpdGlvbiBvciBzY3JvbGwsIGFuZCBoYXMgdG8gYmUgcmUtZGV0ZWN0ZWQgbWFudWFsbHkuIE5vdGUgdGhhdFxuXHRcdC8vIGZvciB0aGlzIHRvIGZ1bmN0aW9uIGNvcnJlY3RseSwgaXQgbXVzdCBiZSBjYWxsZWQgKmFmdGVyKiB0aGUgZXZlbnQgdGFyZ2V0IGlzIGNoZWNrZWQhXG5cdFx0Ly8gU2VlIGlzc3VlICM1NzsgYWxzbyBmaWxlZCBhcyByZGFyOi8vMTMwNDg1ODkgLlxuXHRcdGlmIChkZXZpY2VJc0lPU1dpdGhCYWRUYXJnZXQpIHtcblx0XHRcdHRvdWNoID0gZXZlbnQuY2hhbmdlZFRvdWNoZXNbMF07XG5cblx0XHRcdC8vIEluIGNlcnRhaW4gY2FzZXMgYXJndW1lbnRzIG9mIGVsZW1lbnRGcm9tUG9pbnQgY2FuIGJlIG5lZ2F0aXZlLCBzbyBwcmV2ZW50IHNldHRpbmcgdGFyZ2V0RWxlbWVudCB0byBudWxsXG5cdFx0XHR0YXJnZXRFbGVtZW50ID0gZG9jdW1lbnQuZWxlbWVudEZyb21Qb2ludCh0b3VjaC5wYWdlWCAtIHdpbmRvdy5wYWdlWE9mZnNldCwgdG91Y2gucGFnZVkgLSB3aW5kb3cucGFnZVlPZmZzZXQpIHx8IHRhcmdldEVsZW1lbnQ7XG5cdFx0XHR0YXJnZXRFbGVtZW50LmZhc3RDbGlja1Njcm9sbFBhcmVudCA9IHRoaXMudGFyZ2V0RWxlbWVudC5mYXN0Q2xpY2tTY3JvbGxQYXJlbnQ7XG5cdFx0fVxuXG5cdFx0dGFyZ2V0VGFnTmFtZSA9IHRhcmdldEVsZW1lbnQudGFnTmFtZS50b0xvd2VyQ2FzZSgpO1xuXHRcdGlmICh0YXJnZXRUYWdOYW1lID09PSAnbGFiZWwnKSB7XG5cdFx0XHRmb3JFbGVtZW50ID0gdGhpcy5maW5kQ29udHJvbCh0YXJnZXRFbGVtZW50KTtcblx0XHRcdGlmIChmb3JFbGVtZW50KSB7XG5cdFx0XHRcdHRoaXMuZm9jdXModGFyZ2V0RWxlbWVudCk7XG5cdFx0XHRcdGlmIChkZXZpY2VJc0FuZHJvaWQpIHtcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR0YXJnZXRFbGVtZW50ID0gZm9yRWxlbWVudDtcblx0XHRcdH1cblx0XHR9IGVsc2UgaWYgKHRoaXMubmVlZHNGb2N1cyh0YXJnZXRFbGVtZW50KSkge1xuXG5cdFx0XHQvLyBDYXNlIDE6IElmIHRoZSB0b3VjaCBzdGFydGVkIGEgd2hpbGUgYWdvIChiZXN0IGd1ZXNzIGlzIDEwMG1zIGJhc2VkIG9uIHRlc3RzIGZvciBpc3N1ZSAjMzYpIHRoZW4gZm9jdXMgd2lsbCBiZSB0cmlnZ2VyZWQgYW55d2F5LiBSZXR1cm4gZWFybHkgYW5kIHVuc2V0IHRoZSB0YXJnZXQgZWxlbWVudCByZWZlcmVuY2Ugc28gdGhhdCB0aGUgc3Vic2VxdWVudCBjbGljayB3aWxsIGJlIGFsbG93ZWQgdGhyb3VnaC5cblx0XHRcdC8vIENhc2UgMjogV2l0aG91dCB0aGlzIGV4Y2VwdGlvbiBmb3IgaW5wdXQgZWxlbWVudHMgdGFwcGVkIHdoZW4gdGhlIGRvY3VtZW50IGlzIGNvbnRhaW5lZCBpbiBhbiBpZnJhbWUsIHRoZW4gYW55IGlucHV0dGVkIHRleHQgd29uJ3QgYmUgdmlzaWJsZSBldmVuIHRob3VnaCB0aGUgdmFsdWUgYXR0cmlidXRlIGlzIHVwZGF0ZWQgYXMgdGhlIHVzZXIgdHlwZXMgKGlzc3VlICMzNykuXG5cdFx0XHRpZiAoKGV2ZW50LnRpbWVTdGFtcCAtIHRyYWNraW5nQ2xpY2tTdGFydCkgPiAxMDAgfHwgKGRldmljZUlzSU9TICYmIHdpbmRvdy50b3AgIT09IHdpbmRvdyAmJiB0YXJnZXRUYWdOYW1lID09PSAnaW5wdXQnKSkge1xuXHRcdFx0XHR0aGlzLnRhcmdldEVsZW1lbnQgPSBudWxsO1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cblx0XHRcdHRoaXMuZm9jdXModGFyZ2V0RWxlbWVudCk7XG5cdFx0XHR0aGlzLnNlbmRDbGljayh0YXJnZXRFbGVtZW50LCBldmVudCk7XG5cblx0XHRcdC8vIFNlbGVjdCBlbGVtZW50cyBuZWVkIHRoZSBldmVudCB0byBnbyB0aHJvdWdoIG9uIGlPUyA0LCBvdGhlcndpc2UgdGhlIHNlbGVjdG9yIG1lbnUgd29uJ3Qgb3Blbi5cblx0XHRcdC8vIEFsc28gdGhpcyBicmVha3Mgb3BlbmluZyBzZWxlY3RzIHdoZW4gVm9pY2VPdmVyIGlzIGFjdGl2ZSBvbiBpT1M2LCBpT1M3IChhbmQgcG9zc2libHkgb3RoZXJzKVxuXHRcdFx0aWYgKCFkZXZpY2VJc0lPUyB8fCB0YXJnZXRUYWdOYW1lICE9PSAnc2VsZWN0Jykge1xuXHRcdFx0XHR0aGlzLnRhcmdldEVsZW1lbnQgPSBudWxsO1xuXHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0aWYgKGRldmljZUlzSU9TICYmICFkZXZpY2VJc0lPUzQpIHtcblxuXHRcdFx0Ly8gRG9uJ3Qgc2VuZCBhIHN5bnRoZXRpYyBjbGljayBldmVudCBpZiB0aGUgdGFyZ2V0IGVsZW1lbnQgaXMgY29udGFpbmVkIHdpdGhpbiBhIHBhcmVudCBsYXllciB0aGF0IHdhcyBzY3JvbGxlZFxuXHRcdFx0Ly8gYW5kIHRoaXMgdGFwIGlzIGJlaW5nIHVzZWQgdG8gc3RvcCB0aGUgc2Nyb2xsaW5nICh1c3VhbGx5IGluaXRpYXRlZCBieSBhIGZsaW5nIC0gaXNzdWUgIzQyKS5cblx0XHRcdHNjcm9sbFBhcmVudCA9IHRhcmdldEVsZW1lbnQuZmFzdENsaWNrU2Nyb2xsUGFyZW50O1xuXHRcdFx0aWYgKHNjcm9sbFBhcmVudCAmJiBzY3JvbGxQYXJlbnQuZmFzdENsaWNrTGFzdFNjcm9sbFRvcCAhPT0gc2Nyb2xsUGFyZW50LnNjcm9sbFRvcCkge1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyBQcmV2ZW50IHRoZSBhY3R1YWwgY2xpY2sgZnJvbSBnb2luZyB0aG91Z2ggLSB1bmxlc3MgdGhlIHRhcmdldCBub2RlIGlzIG1hcmtlZCBhcyByZXF1aXJpbmdcblx0XHQvLyByZWFsIGNsaWNrcyBvciBpZiBpdCBpcyBpbiB0aGUgd2hpdGVsaXN0IGluIHdoaWNoIGNhc2Ugb25seSBub24tcHJvZ3JhbW1hdGljIGNsaWNrcyBhcmUgcGVybWl0dGVkLlxuXHRcdGlmICghdGhpcy5uZWVkc0NsaWNrKHRhcmdldEVsZW1lbnQpKSB7XG5cdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0dGhpcy5zZW5kQ2xpY2sodGFyZ2V0RWxlbWVudCwgZXZlbnQpO1xuXHRcdH1cblxuXHRcdHJldHVybiBmYWxzZTtcblx0fTtcblxuXG5cdC8qKlxuXHQgKiBPbiB0b3VjaCBjYW5jZWwsIHN0b3AgdHJhY2tpbmcgdGhlIGNsaWNrLlxuXHQgKlxuXHQgKiBAcmV0dXJucyB7dm9pZH1cblx0ICovXG5cdEZhc3RDbGljay5wcm90b3R5cGUub25Ub3VjaENhbmNlbCA9IGZ1bmN0aW9uKCkge1xuXHRcdHRoaXMudHJhY2tpbmdDbGljayA9IGZhbHNlO1xuXHRcdHRoaXMudGFyZ2V0RWxlbWVudCA9IG51bGw7XG5cdH07XG5cblxuXHQvKipcblx0ICogRGV0ZXJtaW5lIG1vdXNlIGV2ZW50cyB3aGljaCBzaG91bGQgYmUgcGVybWl0dGVkLlxuXHQgKlxuXHQgKiBAcGFyYW0ge0V2ZW50fSBldmVudFxuXHQgKiBAcmV0dXJucyB7Ym9vbGVhbn1cblx0ICovXG5cdEZhc3RDbGljay5wcm90b3R5cGUub25Nb3VzZSA9IGZ1bmN0aW9uKGV2ZW50KSB7XG5cblx0XHQvLyBJZiBhIHRhcmdldCBlbGVtZW50IHdhcyBuZXZlciBzZXQgKGJlY2F1c2UgYSB0b3VjaCBldmVudCB3YXMgbmV2ZXIgZmlyZWQpIGFsbG93IHRoZSBldmVudFxuXHRcdGlmICghdGhpcy50YXJnZXRFbGVtZW50KSB7XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9XG5cblx0XHRpZiAoZXZlbnQuZm9yd2FyZGVkVG91Y2hFdmVudCkge1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fVxuXG5cdFx0Ly8gUHJvZ3JhbW1hdGljYWxseSBnZW5lcmF0ZWQgZXZlbnRzIHRhcmdldGluZyBhIHNwZWNpZmljIGVsZW1lbnQgc2hvdWxkIGJlIHBlcm1pdHRlZFxuXHRcdGlmICghZXZlbnQuY2FuY2VsYWJsZSkge1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fVxuXG5cdFx0Ly8gRGVyaXZlIGFuZCBjaGVjayB0aGUgdGFyZ2V0IGVsZW1lbnQgdG8gc2VlIHdoZXRoZXIgdGhlIG1vdXNlIGV2ZW50IG5lZWRzIHRvIGJlIHBlcm1pdHRlZDtcblx0XHQvLyB1bmxlc3MgZXhwbGljaXRseSBlbmFibGVkLCBwcmV2ZW50IG5vbi10b3VjaCBjbGljayBldmVudHMgZnJvbSB0cmlnZ2VyaW5nIGFjdGlvbnMsXG5cdFx0Ly8gdG8gcHJldmVudCBnaG9zdC9kb3VibGVjbGlja3MuXG5cdFx0aWYgKCF0aGlzLm5lZWRzQ2xpY2sodGhpcy50YXJnZXRFbGVtZW50KSB8fCB0aGlzLmNhbmNlbE5leHRDbGljaykge1xuXG5cdFx0XHQvLyBQcmV2ZW50IGFueSB1c2VyLWFkZGVkIGxpc3RlbmVycyBkZWNsYXJlZCBvbiBGYXN0Q2xpY2sgZWxlbWVudCBmcm9tIGJlaW5nIGZpcmVkLlxuXHRcdFx0aWYgKGV2ZW50LnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbikge1xuXHRcdFx0XHRldmVudC5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcblx0XHRcdH0gZWxzZSB7XG5cblx0XHRcdFx0Ly8gUGFydCBvZiB0aGUgaGFjayBmb3IgYnJvd3NlcnMgdGhhdCBkb24ndCBzdXBwb3J0IEV2ZW50I3N0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbiAoZS5nLiBBbmRyb2lkIDIpXG5cdFx0XHRcdGV2ZW50LnByb3BhZ2F0aW9uU3RvcHBlZCA9IHRydWU7XG5cdFx0XHR9XG5cblx0XHRcdC8vIENhbmNlbCB0aGUgZXZlbnRcblx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdC8vIElmIHRoZSBtb3VzZSBldmVudCBpcyBwZXJtaXR0ZWQsIHJldHVybiB0cnVlIGZvciB0aGUgYWN0aW9uIHRvIGdvIHRocm91Z2guXG5cdFx0cmV0dXJuIHRydWU7XG5cdH07XG5cblxuXHQvKipcblx0ICogT24gYWN0dWFsIGNsaWNrcywgZGV0ZXJtaW5lIHdoZXRoZXIgdGhpcyBpcyBhIHRvdWNoLWdlbmVyYXRlZCBjbGljaywgYSBjbGljayBhY3Rpb24gb2NjdXJyaW5nXG5cdCAqIG5hdHVyYWxseSBhZnRlciBhIGRlbGF5IGFmdGVyIGEgdG91Y2ggKHdoaWNoIG5lZWRzIHRvIGJlIGNhbmNlbGxlZCB0byBhdm9pZCBkdXBsaWNhdGlvbiksIG9yXG5cdCAqIGFuIGFjdHVhbCBjbGljayB3aGljaCBzaG91bGQgYmUgcGVybWl0dGVkLlxuXHQgKlxuXHQgKiBAcGFyYW0ge0V2ZW50fSBldmVudFxuXHQgKiBAcmV0dXJucyB7Ym9vbGVhbn1cblx0ICovXG5cdEZhc3RDbGljay5wcm90b3R5cGUub25DbGljayA9IGZ1bmN0aW9uKGV2ZW50KSB7XG5cdFx0dmFyIHBlcm1pdHRlZDtcblxuXHRcdC8vIEl0J3MgcG9zc2libGUgZm9yIGFub3RoZXIgRmFzdENsaWNrLWxpa2UgbGlicmFyeSBkZWxpdmVyZWQgd2l0aCB0aGlyZC1wYXJ0eSBjb2RlIHRvIGZpcmUgYSBjbGljayBldmVudCBiZWZvcmUgRmFzdENsaWNrIGRvZXMgKGlzc3VlICM0NCkuIEluIHRoYXQgY2FzZSwgc2V0IHRoZSBjbGljay10cmFja2luZyBmbGFnIGJhY2sgdG8gZmFsc2UgYW5kIHJldHVybiBlYXJseS4gVGhpcyB3aWxsIGNhdXNlIG9uVG91Y2hFbmQgdG8gcmV0dXJuIGVhcmx5LlxuXHRcdGlmICh0aGlzLnRyYWNraW5nQ2xpY2spIHtcblx0XHRcdHRoaXMudGFyZ2V0RWxlbWVudCA9IG51bGw7XG5cdFx0XHR0aGlzLnRyYWNraW5nQ2xpY2sgPSBmYWxzZTtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblxuXHRcdC8vIFZlcnkgb2RkIGJlaGF2aW91ciBvbiBpT1MgKGlzc3VlICMxOCk6IGlmIGEgc3VibWl0IGVsZW1lbnQgaXMgcHJlc2VudCBpbnNpZGUgYSBmb3JtIGFuZCB0aGUgdXNlciBoaXRzIGVudGVyIGluIHRoZSBpT1Mgc2ltdWxhdG9yIG9yIGNsaWNrcyB0aGUgR28gYnV0dG9uIG9uIHRoZSBwb3AtdXAgT1Mga2V5Ym9hcmQgdGhlIGEga2luZCBvZiAnZmFrZScgY2xpY2sgZXZlbnQgd2lsbCBiZSB0cmlnZ2VyZWQgd2l0aCB0aGUgc3VibWl0LXR5cGUgaW5wdXQgZWxlbWVudCBhcyB0aGUgdGFyZ2V0LlxuXHRcdGlmIChldmVudC50YXJnZXQudHlwZSA9PT0gJ3N1Ym1pdCcgJiYgZXZlbnQuZGV0YWlsID09PSAwKSB7XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9XG5cblx0XHRwZXJtaXR0ZWQgPSB0aGlzLm9uTW91c2UoZXZlbnQpO1xuXG5cdFx0Ly8gT25seSB1bnNldCB0YXJnZXRFbGVtZW50IGlmIHRoZSBjbGljayBpcyBub3QgcGVybWl0dGVkLiBUaGlzIHdpbGwgZW5zdXJlIHRoYXQgdGhlIGNoZWNrIGZvciAhdGFyZ2V0RWxlbWVudCBpbiBvbk1vdXNlIGZhaWxzIGFuZCB0aGUgYnJvd3NlcidzIGNsaWNrIGRvZXNuJ3QgZ28gdGhyb3VnaC5cblx0XHRpZiAoIXBlcm1pdHRlZCkge1xuXHRcdFx0dGhpcy50YXJnZXRFbGVtZW50ID0gbnVsbDtcblx0XHR9XG5cblx0XHQvLyBJZiBjbGlja3MgYXJlIHBlcm1pdHRlZCwgcmV0dXJuIHRydWUgZm9yIHRoZSBhY3Rpb24gdG8gZ28gdGhyb3VnaC5cblx0XHRyZXR1cm4gcGVybWl0dGVkO1xuXHR9O1xuXG5cblx0LyoqXG5cdCAqIFJlbW92ZSBhbGwgRmFzdENsaWNrJ3MgZXZlbnQgbGlzdGVuZXJzLlxuXHQgKlxuXHQgKiBAcmV0dXJucyB7dm9pZH1cblx0ICovXG5cdEZhc3RDbGljay5wcm90b3R5cGUuZGVzdHJveSA9IGZ1bmN0aW9uKCkge1xuXHRcdHZhciBsYXllciA9IHRoaXMubGF5ZXI7XG5cblx0XHRpZiAoZGV2aWNlSXNBbmRyb2lkKSB7XG5cdFx0XHRsYXllci5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW92ZXInLCB0aGlzLm9uTW91c2UsIHRydWUpO1xuXHRcdFx0bGF5ZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5vbk1vdXNlLCB0cnVlKTtcblx0XHRcdGxheWVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLm9uTW91c2UsIHRydWUpO1xuXHRcdH1cblxuXHRcdGxheWVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5vbkNsaWNrLCB0cnVlKTtcblx0XHRsYXllci5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgdGhpcy5vblRvdWNoU3RhcnQsIGZhbHNlKTtcblx0XHRsYXllci5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCB0aGlzLm9uVG91Y2hNb3ZlLCBmYWxzZSk7XG5cdFx0bGF5ZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCB0aGlzLm9uVG91Y2hFbmQsIGZhbHNlKTtcblx0XHRsYXllci5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaGNhbmNlbCcsIHRoaXMub25Ub3VjaENhbmNlbCwgZmFsc2UpO1xuXHR9O1xuXG5cblx0LyoqXG5cdCAqIENoZWNrIHdoZXRoZXIgRmFzdENsaWNrIGlzIG5lZWRlZC5cblx0ICpcblx0ICogQHBhcmFtIHtFbGVtZW50fSBsYXllciBUaGUgbGF5ZXIgdG8gbGlzdGVuIG9uXG5cdCAqL1xuXHRGYXN0Q2xpY2subm90TmVlZGVkID0gZnVuY3Rpb24obGF5ZXIpIHtcblx0XHR2YXIgbWV0YVZpZXdwb3J0O1xuXHRcdHZhciBjaHJvbWVWZXJzaW9uO1xuXHRcdHZhciBibGFja2JlcnJ5VmVyc2lvbjtcblx0XHR2YXIgZmlyZWZveFZlcnNpb247XG5cblx0XHQvLyBEZXZpY2VzIHRoYXQgZG9uJ3Qgc3VwcG9ydCB0b3VjaCBkb24ndCBuZWVkIEZhc3RDbGlja1xuXHRcdGlmICh0eXBlb2Ygd2luZG93Lm9udG91Y2hzdGFydCA9PT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblxuXHRcdC8vIENocm9tZSB2ZXJzaW9uIC0gemVybyBmb3Igb3RoZXIgYnJvd3NlcnNcblx0XHRjaHJvbWVWZXJzaW9uID0gKygvQ2hyb21lXFwvKFswLTldKykvLmV4ZWMobmF2aWdhdG9yLnVzZXJBZ2VudCkgfHwgWywwXSlbMV07XG5cblx0XHRpZiAoY2hyb21lVmVyc2lvbikge1xuXG5cdFx0XHRpZiAoZGV2aWNlSXNBbmRyb2lkKSB7XG5cdFx0XHRcdG1ldGFWaWV3cG9ydCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ21ldGFbbmFtZT12aWV3cG9ydF0nKTtcblxuXHRcdFx0XHRpZiAobWV0YVZpZXdwb3J0KSB7XG5cdFx0XHRcdFx0Ly8gQ2hyb21lIG9uIEFuZHJvaWQgd2l0aCB1c2VyLXNjYWxhYmxlPVwibm9cIiBkb2Vzbid0IG5lZWQgRmFzdENsaWNrIChpc3N1ZSAjODkpXG5cdFx0XHRcdFx0aWYgKG1ldGFWaWV3cG9ydC5jb250ZW50LmluZGV4T2YoJ3VzZXItc2NhbGFibGU9bm8nKSAhPT0gLTEpIHtcblx0XHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHQvLyBDaHJvbWUgMzIgYW5kIGFib3ZlIHdpdGggd2lkdGg9ZGV2aWNlLXdpZHRoIG9yIGxlc3MgZG9uJ3QgbmVlZCBGYXN0Q2xpY2tcblx0XHRcdFx0XHRpZiAoY2hyb21lVmVyc2lvbiA+IDMxICYmIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxXaWR0aCA8PSB3aW5kb3cub3V0ZXJXaWR0aCkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdC8vIENocm9tZSBkZXNrdG9wIGRvZXNuJ3QgbmVlZCBGYXN0Q2xpY2sgKGlzc3VlICMxNSlcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmIChkZXZpY2VJc0JsYWNrQmVycnkxMCkge1xuXHRcdFx0YmxhY2tiZXJyeVZlcnNpb24gPSBuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC9WZXJzaW9uXFwvKFswLTldKilcXC4oWzAtOV0qKS8pO1xuXG5cdFx0XHQvLyBCbGFja0JlcnJ5IDEwLjMrIGRvZXMgbm90IHJlcXVpcmUgRmFzdGNsaWNrIGxpYnJhcnkuXG5cdFx0XHQvLyBodHRwczovL2dpdGh1Yi5jb20vZnRsYWJzL2Zhc3RjbGljay9pc3N1ZXMvMjUxXG5cdFx0XHRpZiAoYmxhY2tiZXJyeVZlcnNpb25bMV0gPj0gMTAgJiYgYmxhY2tiZXJyeVZlcnNpb25bMl0gPj0gMykge1xuXHRcdFx0XHRtZXRhVmlld3BvcnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdtZXRhW25hbWU9dmlld3BvcnRdJyk7XG5cblx0XHRcdFx0aWYgKG1ldGFWaWV3cG9ydCkge1xuXHRcdFx0XHRcdC8vIHVzZXItc2NhbGFibGU9bm8gZWxpbWluYXRlcyBjbGljayBkZWxheS5cblx0XHRcdFx0XHRpZiAobWV0YVZpZXdwb3J0LmNvbnRlbnQuaW5kZXhPZigndXNlci1zY2FsYWJsZT1ubycpICE9PSAtMSkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdC8vIHdpZHRoPWRldmljZS13aWR0aCAob3IgbGVzcyB0aGFuIGRldmljZS13aWR0aCkgZWxpbWluYXRlcyBjbGljayBkZWxheS5cblx0XHRcdFx0XHRpZiAoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFdpZHRoIDw9IHdpbmRvdy5vdXRlcldpZHRoKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyBJRTEwIHdpdGggLW1zLXRvdWNoLWFjdGlvbjogbm9uZSBvciBtYW5pcHVsYXRpb24sIHdoaWNoIGRpc2FibGVzIGRvdWJsZS10YXAtdG8tem9vbSAoaXNzdWUgIzk3KVxuXHRcdGlmIChsYXllci5zdHlsZS5tc1RvdWNoQWN0aW9uID09PSAnbm9uZScgfHwgbGF5ZXIuc3R5bGUudG91Y2hBY3Rpb24gPT09ICdtYW5pcHVsYXRpb24nKSB7XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9XG5cblx0XHQvLyBGaXJlZm94IHZlcnNpb24gLSB6ZXJvIGZvciBvdGhlciBicm93c2Vyc1xuXHRcdGZpcmVmb3hWZXJzaW9uID0gKygvRmlyZWZveFxcLyhbMC05XSspLy5leGVjKG5hdmlnYXRvci51c2VyQWdlbnQpIHx8IFssMF0pWzFdO1xuXG5cdFx0aWYgKGZpcmVmb3hWZXJzaW9uID49IDI3KSB7XG5cdFx0XHQvLyBGaXJlZm94IDI3KyBkb2VzIG5vdCBoYXZlIHRhcCBkZWxheSBpZiB0aGUgY29udGVudCBpcyBub3Qgem9vbWFibGUgLSBodHRwczovL2J1Z3ppbGxhLm1vemlsbGEub3JnL3Nob3dfYnVnLmNnaT9pZD05MjI4OTZcblxuXHRcdFx0bWV0YVZpZXdwb3J0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignbWV0YVtuYW1lPXZpZXdwb3J0XScpO1xuXHRcdFx0aWYgKG1ldGFWaWV3cG9ydCAmJiAobWV0YVZpZXdwb3J0LmNvbnRlbnQuaW5kZXhPZigndXNlci1zY2FsYWJsZT1ubycpICE9PSAtMSB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsV2lkdGggPD0gd2luZG93Lm91dGVyV2lkdGgpKSB7XG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vIElFMTE6IHByZWZpeGVkIC1tcy10b3VjaC1hY3Rpb24gaXMgbm8gbG9uZ2VyIHN1cHBvcnRlZCBhbmQgaXQncyByZWNvbWVuZGVkIHRvIHVzZSBub24tcHJlZml4ZWQgdmVyc2lvblxuXHRcdC8vIGh0dHA6Ly9tc2RuLm1pY3Jvc29mdC5jb20vZW4tdXMvbGlicmFyeS93aW5kb3dzL2FwcHMvSGg3NjczMTMuYXNweFxuXHRcdGlmIChsYXllci5zdHlsZS50b3VjaEFjdGlvbiA9PT0gJ25vbmUnIHx8IGxheWVyLnN0eWxlLnRvdWNoQWN0aW9uID09PSAnbWFuaXB1bGF0aW9uJykge1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9O1xuXG5cblx0LyoqXG5cdCAqIEZhY3RvcnkgbWV0aG9kIGZvciBjcmVhdGluZyBhIEZhc3RDbGljayBvYmplY3Rcblx0ICpcblx0ICogQHBhcmFtIHtFbGVtZW50fSBsYXllciBUaGUgbGF5ZXIgdG8gbGlzdGVuIG9uXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9ucz17fV0gVGhlIG9wdGlvbnMgdG8gb3ZlcnJpZGUgdGhlIGRlZmF1bHRzXG5cdCAqL1xuXHRGYXN0Q2xpY2suYXR0YWNoID0gZnVuY3Rpb24obGF5ZXIsIG9wdGlvbnMpIHtcblx0XHRyZXR1cm4gbmV3IEZhc3RDbGljayhsYXllciwgb3B0aW9ucyk7XG5cdH07XG5cblxuXHRpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgZGVmaW5lLmFtZCA9PT0gJ29iamVjdCcgJiYgZGVmaW5lLmFtZCkge1xuXG5cdFx0Ly8gQU1ELiBSZWdpc3RlciBhcyBhbiBhbm9ueW1vdXMgbW9kdWxlLlxuXHRcdGRlZmluZShmdW5jdGlvbigpIHtcblx0XHRcdHJldHVybiBGYXN0Q2xpY2s7XG5cdFx0fSk7XG5cdH0gZWxzZSBpZiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgJiYgbW9kdWxlLmV4cG9ydHMpIHtcblx0XHRtb2R1bGUuZXhwb3J0cyA9IEZhc3RDbGljay5hdHRhY2g7XG5cdFx0bW9kdWxlLmV4cG9ydHMuRmFzdENsaWNrID0gRmFzdENsaWNrO1xuXHR9IGVsc2Uge1xuXHRcdHdpbmRvdy5GYXN0Q2xpY2sgPSBGYXN0Q2xpY2s7XG5cdH1cbn0oKSk7XG4iLCIvLyBEb2N1bWVudCByZWFkeVxuKGZ1bmN0aW9uICgkKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICAvLyBFbmFibGUgQlMzIGRlc2lnbmVyXG4gIGJzM0Rlc2lnbmVyLmluaXQoKTtcblxuICAvLyBFbmFibGUgQlMzIHNpZGViYXJcbiAgYnMzU2lkZWJhci5pbml0KCk7XG5cbn0pKGpRdWVyeSk7XG4iXX0=
