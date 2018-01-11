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
// | Flexy header
// |--------------------------------------------------------------------------
// |
// | This jQuery script is written by
// |
// | Morten Nissen
// | hjemmesidekongen.dk
// |

var flexy_header = function ($) {
    'use strict';

    var pub = {},
        $header_static = $('.flexy-header--static'),
        $header_sticky = $('.flexy-header--sticky'),
        options = {
        update_interval: 100,
        tolerance: {
            upward: 20,
            downward: 10
        },
        offset: _get_offset_from_elements_bottom($header_static),
        classes: {
            pinned: "flexy-header--pinned",
            unpinned: "flexy-header--unpinned"
        }
    },
        was_scrolled = false,
        last_distance_from_top = 0;

    /**
     * Instantiate
     */
    pub.init = function (options) {
        registerEventHandlers();
        registerBootEventHandlers();
    };

    /**
     * Register boot event handlers
     */
    function registerBootEventHandlers() {
        $header_sticky.addClass(options.classes.unpinned);

        setInterval(function () {

            if (was_scrolled) {
                document_was_scrolled();

                was_scrolled = false;
            }
        }, options.update_interval);
    }

    /**
     * Register event handlers
     */
    function registerEventHandlers() {
        $(window).scroll(function (event) {
            was_scrolled = true;
        });
    }

    /**
     * Get offset from element bottom
     */
    function _get_offset_from_elements_bottom($element) {
        var element_height = $element.outerHeight(true),
            element_offset = $element.offset().top;

        return element_height + element_offset;
    }

    /**
     * Document was scrolled
     */
    function document_was_scrolled() {
        var current_distance_from_top = $(window).scrollTop();

        // If past offset
        if (current_distance_from_top >= options.offset) {

            // Downwards scroll
            if (current_distance_from_top > last_distance_from_top) {

                // Obey the downward tolerance
                if (Math.abs(current_distance_from_top - last_distance_from_top) <= options.tolerance.downward) {
                    return;
                }

                $header_sticky.removeClass(options.classes.pinned).addClass(options.classes.unpinned);
            }

            // Upwards scroll
            else {

                    // Obey the upward tolerance
                    if (Math.abs(current_distance_from_top - last_distance_from_top) <= options.tolerance.upward) {
                        return;
                    }

                    // We are not scrolled past the document which is possible on the Mac
                    if (current_distance_from_top + $(window).height() < $(document).height()) {
                        $header_sticky.removeClass(options.classes.unpinned).addClass(options.classes.pinned);
                    }
                }
        }

        // Not past offset
        else {
                $header_sticky.removeClass(options.classes.pinned).addClass(options.classes.unpinned);
            }

        last_distance_from_top = current_distance_from_top;
    }

    return pub;
}(jQuery);
'use strict';

// |--------------------------------------------------------------------------
// | Flexy navigation
// |--------------------------------------------------------------------------
// |
// | This jQuery script is written by
// |
// | Morten Nissen
// | hjemmesidekongen.dk
// |

var flexy_navigation = function ($) {
    'use strict';

    var pub = {},
        layout_classes = {
        'navigation': '.flexy-navigation',
        'obfuscator': '.flexy-navigation__obfuscator',
        'dropdown': '.flexy-navigation__item--dropdown',
        'dropdown_megamenu': '.flexy-navigation__item__dropdown-megamenu',

        'is_upgraded': 'is-upgraded',
        'navigation_has_megamenu': 'has-megamenu',
        'dropdown_has_megamenu': 'flexy-navigation__item--dropdown-with-megamenu'
    };

    /**
     * Instantiate
     */
    pub.init = function (options) {
        registerEventHandlers();
        registerBootEventHandlers();
    };

    /**
     * Register boot event handlers
     */
    function registerBootEventHandlers() {

        // Upgrade
        upgrade();
    }

    /**
     * Register event handlers
     */
    function registerEventHandlers() {}

    /**
     * Upgrade elements.
     * Add classes to elements, based upon attached classes.
     */
    function upgrade() {
        var $navigations = $(layout_classes.navigation);

        // Navigations
        if ($navigations.length > 0) {
            $navigations.each(function (index, element) {
                var $navigation = $(this),
                    $megamenus = $navigation.find(layout_classes.dropdown_megamenu),
                    $dropdown_megamenu = $navigation.find(layout_classes.dropdown_has_megamenu);

                // Has already been upgraded
                if ($navigation.hasClass(layout_classes.is_upgraded)) {
                    return;
                }

                // Has megamenu
                if ($megamenus.length > 0) {
                    $navigation.addClass(layout_classes.navigation_has_megamenu);

                    // Run through all megamenus
                    $megamenus.each(function (index, element) {
                        var $megamenu = $(this),
                            has_obfuscator = $('html').hasClass('has-obfuscator') ? true : false;

                        $megamenu.parents(layout_classes.dropdown).addClass(layout_classes.dropdown_has_megamenu).hover(function () {

                            if (has_obfuscator) {
                                obfuscator.show();
                            }
                        }, function () {

                            if (has_obfuscator) {
                                obfuscator.hide();
                            }
                        });
                    });
                }

                // Is upgraded
                $navigation.addClass(layout_classes.is_upgraded);
            });
        }
    }

    return pub;
}(jQuery);
"use strict";

/*! sidr - v2.2.1 - 2016-02-17
 * http://www.berriart.com/sidr/
 * Copyright (c) 2013-2016 Alberto Varela; Licensed MIT */

(function () {
  'use strict';

  var babelHelpers = {};

  babelHelpers.classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  babelHelpers.createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  babelHelpers;

  var sidrStatus = {
    moving: false,
    opened: false
  };

  var helper = {
    // Check for valids urls
    // From : http://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-an-url

    isUrl: function isUrl(str) {
      var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator

      if (pattern.test(str)) {
        return true;
      } else {
        return false;
      }
    },

    // Add sidr prefixes
    addPrefixes: function addPrefixes($element) {
      this.addPrefix($element, 'id');
      this.addPrefix($element, 'class');
      $element.removeAttr('style');
    },
    addPrefix: function addPrefix($element, attribute) {
      var toReplace = $element.attr(attribute);

      if (typeof toReplace === 'string' && toReplace !== '' && toReplace !== 'sidr-inner') {
        $element.attr(attribute, toReplace.replace(/([A-Za-z0-9_.\-]+)/g, 'sidr-' + attribute + '-$1'));
      }
    },

    // Check if transitions is supported
    transitions: function () {
      var body = document.body || document.documentElement,
          style = body.style,
          supported = false,
          property = 'transition';

      if (property in style) {
        supported = true;
      } else {
        (function () {
          var prefixes = ['moz', 'webkit', 'o', 'ms'],
              prefix = undefined,
              i = undefined;

          property = property.charAt(0).toUpperCase() + property.substr(1);
          supported = function () {
            for (i = 0; i < prefixes.length; i++) {
              prefix = prefixes[i];
              if (prefix + property in style) {
                return true;
              }
            }

            return false;
          }();
          property = supported ? '-' + prefix.toLowerCase() + '-' + property.toLowerCase() : null;
        })();
      }

      return {
        supported: supported,
        property: property
      };
    }()
  };

  var $$2 = jQuery;

  var bodyAnimationClass = 'sidr-animating';
  var openAction = 'open';
  var closeAction = 'close';
  var transitionEndEvent = 'webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend';
  var Menu = function () {
    function Menu(name) {
      babelHelpers.classCallCheck(this, Menu);

      this.name = name;
      this.item = $$2('#' + name);
      this.openClass = name === 'sidr' ? 'sidr-open' : 'sidr-open ' + name + '-open';
      this.menuWidth = this.item.outerWidth(true);
      this.speed = this.item.data('speed');
      this.side = this.item.data('side');
      this.displace = this.item.data('displace');
      this.timing = this.item.data('timing');
      this.method = this.item.data('method');
      this.onOpenCallback = this.item.data('onOpen');
      this.onCloseCallback = this.item.data('onClose');
      this.onOpenEndCallback = this.item.data('onOpenEnd');
      this.onCloseEndCallback = this.item.data('onCloseEnd');
      this.body = $$2(this.item.data('body'));
    }

    babelHelpers.createClass(Menu, [{
      key: 'getAnimation',
      value: function getAnimation(action, element) {
        var animation = {},
            prop = this.side;

        if (action === 'open' && element === 'body') {
          animation[prop] = this.menuWidth + 'px';
        } else if (action === 'close' && element === 'menu') {
          animation[prop] = '-' + this.menuWidth + 'px';
        } else {
          animation[prop] = 0;
        }

        return animation;
      }
    }, {
      key: 'prepareBody',
      value: function prepareBody(action) {
        var prop = action === 'open' ? 'hidden' : '';

        // Prepare page if container is body
        if (this.body.is('body')) {
          var $html = $$2('html'),
              scrollTop = $html.scrollTop();

          $html.css('overflow-x', prop).scrollTop(scrollTop);
        }
      }
    }, {
      key: 'openBody',
      value: function openBody() {
        if (this.displace) {
          var transitions = helper.transitions,
              $body = this.body;

          if (transitions.supported) {
            $body.css(transitions.property, this.side + ' ' + this.speed / 1000 + 's ' + this.timing).css(this.side, 0).css({
              width: $body.width(),
              position: 'absolute'
            });
            $body.css(this.side, this.menuWidth + 'px');
          } else {
            var bodyAnimation = this.getAnimation(openAction, 'body');

            $body.css({
              width: $body.width(),
              position: 'absolute'
            }).animate(bodyAnimation, {
              queue: false,
              duration: this.speed
            });
          }
        }
      }
    }, {
      key: 'onCloseBody',
      value: function onCloseBody() {
        var transitions = helper.transitions,
            resetStyles = {
          width: '',
          position: '',
          right: '',
          left: ''
        };

        if (transitions.supported) {
          resetStyles[transitions.property] = '';
        }

        this.body.css(resetStyles).unbind(transitionEndEvent);
      }
    }, {
      key: 'closeBody',
      value: function closeBody() {
        var _this = this;

        if (this.displace) {
          if (helper.transitions.supported) {
            this.body.css(this.side, 0).one(transitionEndEvent, function () {
              _this.onCloseBody();
            });
          } else {
            var bodyAnimation = this.getAnimation(closeAction, 'body');

            this.body.animate(bodyAnimation, {
              queue: false,
              duration: this.speed,
              complete: function complete() {
                _this.onCloseBody();
              }
            });
          }
        }
      }
    }, {
      key: 'moveBody',
      value: function moveBody(action) {
        if (action === openAction) {
          this.openBody();
        } else {
          this.closeBody();
        }
      }
    }, {
      key: 'onOpenMenu',
      value: function onOpenMenu(callback) {
        var name = this.name;

        sidrStatus.moving = false;
        sidrStatus.opened = name;

        this.item.unbind(transitionEndEvent);

        this.body.removeClass(bodyAnimationClass).addClass(this.openClass);

        this.onOpenEndCallback();

        if (typeof callback === 'function') {
          callback(name);
        }
      }
    }, {
      key: 'openMenu',
      value: function openMenu(callback) {
        var _this2 = this;

        var $item = this.item;

        if (helper.transitions.supported) {
          $item.css(this.side, 0).one(transitionEndEvent, function () {
            _this2.onOpenMenu(callback);
          });
        } else {
          var menuAnimation = this.getAnimation(openAction, 'menu');

          $item.css('display', 'block').animate(menuAnimation, {
            queue: false,
            duration: this.speed,
            complete: function complete() {
              _this2.onOpenMenu(callback);
            }
          });
        }
      }
    }, {
      key: 'onCloseMenu',
      value: function onCloseMenu(callback) {
        this.item.css({
          left: '',
          right: ''
        }).unbind(transitionEndEvent);
        $$2('html').css('overflow-x', '');

        sidrStatus.moving = false;
        sidrStatus.opened = false;

        this.body.removeClass(bodyAnimationClass).removeClass(this.openClass);

        this.onCloseEndCallback();

        // Callback
        if (typeof callback === 'function') {
          callback(name);
        }
      }
    }, {
      key: 'closeMenu',
      value: function closeMenu(callback) {
        var _this3 = this;

        var item = this.item;

        if (helper.transitions.supported) {
          item.css(this.side, '').one(transitionEndEvent, function () {
            _this3.onCloseMenu(callback);
          });
        } else {
          var menuAnimation = this.getAnimation(closeAction, 'menu');

          item.animate(menuAnimation, {
            queue: false,
            duration: this.speed,
            complete: function complete() {
              _this3.onCloseMenu();
            }
          });
        }
      }
    }, {
      key: 'moveMenu',
      value: function moveMenu(action, callback) {
        this.body.addClass(bodyAnimationClass);

        if (action === openAction) {
          this.openMenu(callback);
        } else {
          this.closeMenu(callback);
        }
      }
    }, {
      key: 'move',
      value: function move(action, callback) {
        // Lock sidr
        sidrStatus.moving = true;

        this.prepareBody(action);
        this.moveBody(action);
        this.moveMenu(action, callback);
      }
    }, {
      key: 'open',
      value: function open(callback) {
        var _this4 = this;

        // Check if is already opened or moving
        if (sidrStatus.opened === this.name || sidrStatus.moving) {
          return;
        }

        // If another menu opened close first
        if (sidrStatus.opened !== false) {
          var alreadyOpenedMenu = new Menu(sidrStatus.opened);

          alreadyOpenedMenu.close(function () {
            _this4.open(callback);
          });

          return;
        }

        this.move('open', callback);

        // onOpen callback
        this.onOpenCallback();
      }
    }, {
      key: 'close',
      value: function close(callback) {
        // Check if is already closed or moving
        if (sidrStatus.opened !== this.name || sidrStatus.moving) {
          return;
        }

        this.move('close', callback);

        // onClose callback
        this.onCloseCallback();
      }
    }, {
      key: 'toggle',
      value: function toggle(callback) {
        if (sidrStatus.opened === this.name) {
          this.close(callback);
        } else {
          this.open(callback);
        }
      }
    }]);
    return Menu;
  }();

  var $$1 = jQuery;

  function execute(action, name, callback) {
    var sidr = new Menu(name);

    switch (action) {
      case 'open':
        sidr.open(callback);
        break;
      case 'close':
        sidr.close(callback);
        break;
      case 'toggle':
        sidr.toggle(callback);
        break;
      default:
        $$1.error('Method ' + action + ' does not exist on jQuery.sidr');
        break;
    }
  }

  var i;
  var $ = jQuery;
  var publicMethods = ['open', 'close', 'toggle'];
  var methodName;
  var methods = {};
  var getMethod = function getMethod(methodName) {
    return function (name, callback) {
      // Check arguments
      if (typeof name === 'function') {
        callback = name;
        name = 'sidr';
      } else if (!name) {
        name = 'sidr';
      }

      execute(methodName, name, callback);
    };
  };
  for (i = 0; i < publicMethods.length; i++) {
    methodName = publicMethods[i];
    methods[methodName] = getMethod(methodName);
  }

  function sidr(method) {
    if (method === 'status') {
      return sidrStatus;
    } else if (methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof method === 'function' || typeof method === 'string' || !method) {
      return methods.toggle.apply(this, arguments);
    } else {
      $.error('Method ' + method + ' does not exist on jQuery.sidr');
    }
  }

  var $$3 = jQuery;

  function fillContent($sideMenu, settings) {
    // The menu content
    if (typeof settings.source === 'function') {
      var newContent = settings.source(name);

      $sideMenu.html(newContent);
    } else if (typeof settings.source === 'string' && helper.isUrl(settings.source)) {
      $$3.get(settings.source, function (data) {
        $sideMenu.html(data);
      });
    } else if (typeof settings.source === 'string') {
      var htmlContent = '',
          selectors = settings.source.split(',');

      $$3.each(selectors, function (index, element) {
        htmlContent += '<div class="sidr-inner">' + $$3(element).html() + '</div>';
      });

      // Renaming ids and classes
      if (settings.renaming) {
        var $htmlContent = $$3('<div />').html(htmlContent);

        $htmlContent.find('*').each(function (index, element) {
          var $element = $$3(element);

          helper.addPrefixes($element);
        });
        htmlContent = $htmlContent.html();
      }

      $sideMenu.html(htmlContent);
    } else if (settings.source !== null) {
      $$3.error('Invalid Sidr Source');
    }

    return $sideMenu;
  }

  function fnSidr(options) {
    var transitions = helper.transitions,
        settings = $$3.extend({
      name: 'sidr', // Name for the 'sidr'
      speed: 200, // Accepts standard jQuery effects speeds (i.e. fast, normal or milliseconds)
      side: 'left', // Accepts 'left' or 'right'
      source: null, // Override the source of the content.
      renaming: true, // The ids and classes will be prepended with a prefix when loading existent content
      body: 'body', // Page container selector,
      displace: true, // Displace the body content or not
      timing: 'ease', // Timing function for CSS transitions
      method: 'toggle', // The method to call when element is clicked
      bind: 'touchstart click', // The event(s) to trigger the menu
      onOpen: function onOpen() {},
      // Callback when sidr start opening
      onClose: function onClose() {},
      // Callback when sidr start closing
      onOpenEnd: function onOpenEnd() {},
      // Callback when sidr end opening
      onCloseEnd: function onCloseEnd() {} // Callback when sidr end closing

    }, options),
        name = settings.name,
        $sideMenu = $$3('#' + name);

    // If the side menu do not exist create it
    if ($sideMenu.length === 0) {
      $sideMenu = $$3('<div />').attr('id', name).appendTo($$3('body'));
    }

    // Add transition to menu if are supported
    if (transitions.supported) {
      $sideMenu.css(transitions.property, settings.side + ' ' + settings.speed / 1000 + 's ' + settings.timing);
    }

    // Adding styles and options
    $sideMenu.addClass('sidr').addClass(settings.side).data({
      speed: settings.speed,
      side: settings.side,
      body: settings.body,
      displace: settings.displace,
      timing: settings.timing,
      method: settings.method,
      onOpen: settings.onOpen,
      onClose: settings.onClose,
      onOpenEnd: settings.onOpenEnd,
      onCloseEnd: settings.onCloseEnd
    });

    $sideMenu = fillContent($sideMenu, settings);

    return this.each(function () {
      var $this = $$3(this),
          data = $this.data('sidr'),
          flag = false;

      // If the plugin hasn't been initialized yet
      if (!data) {
        sidrStatus.moving = false;
        sidrStatus.opened = false;

        $this.data('sidr', name);

        $this.bind(settings.bind, function (event) {
          event.preventDefault();

          if (!flag) {
            flag = true;
            sidr(settings.method, name);

            setTimeout(function () {
              flag = false;
            }, 100);
          }
        });
      }
    });
  }

  jQuery.sidr = sidr;
  jQuery.fn.sidr = fnSidr;
})();
"use strict";

!function (e) {
  var t;e.fn.slinky = function (a) {
    var s = e.extend({ label: "Back", title: !1, speed: 300, resize: !0 }, a),
        i = e(this),
        n = i.children().first();i.addClass("slinky-menu");var r = function r(e, t) {
      var a = Math.round(parseInt(n.get(0).style.left)) || 0;n.css("left", a - 100 * e + "%"), "function" == typeof t && setTimeout(t, s.speed);
    },
        l = function l(e) {
      i.height(e.outerHeight());
    },
        d = function d(e) {
      i.css("transition-duration", e + "ms"), n.css("transition-duration", e + "ms");
    };if (d(s.speed), e("a + ul", i).prev().addClass("next"), e("li > ul", i).prepend('<li class="header">'), s.title === !0 && e("li > ul", i).each(function () {
      var t = e(this).parent().find("a").first().text(),
          a = e("<h2>").text(t);e("> .header", this).append(a);
    }), s.title || s.label !== !0) {
      var o = e("<a>").text(s.label).prop("href", "#").addClass("back");e(".header", i).append(o);
    } else e("li > ul", i).each(function () {
      var t = e(this).parent().find("a").first().text(),
          a = e("<a>").text(t).prop("href", "#").addClass("back");e("> .header", this).append(a);
    });e("a", i).on("click", function (a) {
      if (!(t + s.speed > Date.now())) {
        t = Date.now();var n = e(this);/#/.test(this.href) && a.preventDefault(), n.hasClass("next") ? (i.find(".active").removeClass("active"), n.next().show().addClass("active"), r(1), s.resize && l(n.next())) : n.hasClass("back") && (r(-1, function () {
          i.find(".active").removeClass("active"), n.parent().parent().hide().parentsUntil(i, "ul").first().addClass("active");
        }), s.resize && l(n.parent().parent().parentsUntil(i, "ul")));
      }
    }), this.jump = function (t, a) {
      t = e(t);var n = i.find(".active");n = n.length > 0 ? n.parentsUntil(i, "ul").length : 0, i.find("ul").removeClass("active").hide();var o = t.parentsUntil(i, "ul");o.show(), t.show().addClass("active"), a === !1 && d(0), r(o.length - n), s.resize && l(t), a === !1 && d(s.speed);
    }, this.home = function (t) {
      t === !1 && d(0);var a = i.find(".active"),
          n = a.parentsUntil(i, "li").length;n > 0 && (r(-n, function () {
        a.removeClass("active");
      }), s.resize && l(e(a.parentsUntil(i, "li").get(n - 1)).parent())), t === !1 && d(s.speed);
    }, this.destroy = function () {
      e(".header", i).remove(), e("a", i).removeClass("next").off("click"), i.removeClass("slinky-menu").css("transition-duration", ""), n.css("transition-duration", "");
    };var c = i.find(".active");return c.length > 0 && (c.removeClass("active"), this.jump(c, !1)), this;
  };
}(jQuery);
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function () {
  var AjaxMonitor,
      Bar,
      DocumentMonitor,
      ElementMonitor,
      ElementTracker,
      EventLagMonitor,
      Evented,
      Events,
      NoTargetError,
      Pace,
      RequestIntercept,
      SOURCE_KEYS,
      Scaler,
      SocketRequestTracker,
      XHRRequestTracker,
      animation,
      avgAmplitude,
      bar,
      cancelAnimation,
      cancelAnimationFrame,
      defaultOptions,
      _extend,
      extendNative,
      getFromDOM,
      getIntercept,
      handlePushState,
      ignoreStack,
      init,
      now,
      options,
      requestAnimationFrame,
      result,
      runAnimation,
      scalers,
      shouldIgnoreURL,
      shouldTrack,
      source,
      sources,
      uniScaler,
      _WebSocket,
      _XDomainRequest,
      _XMLHttpRequest,
      _i,
      _intercept,
      _len,
      _pushState,
      _ref,
      _ref1,
      _replaceState,
      __slice = [].slice,
      __hasProp = {}.hasOwnProperty,
      __extends = function __extends(child, parent) {
    for (var key in parent) {
      if (__hasProp.call(parent, key)) child[key] = parent[key];
    }function ctor() {
      this.constructor = child;
    }ctor.prototype = parent.prototype;child.prototype = new ctor();child.__super__ = parent.prototype;return child;
  },
      __indexOf = [].indexOf || function (item) {
    for (var i = 0, l = this.length; i < l; i++) {
      if (i in this && this[i] === item) return i;
    }return -1;
  };

  defaultOptions = {
    catchupTime: 100,
    initialRate: .03,
    minTime: 250,
    ghostTime: 100,
    maxProgressPerFrame: 20,
    easeFactor: 1.25,
    startOnPageLoad: true,
    restartOnPushState: true,
    restartOnRequestAfter: 500,
    target: 'body',
    elements: {
      checkInterval: 100,
      selectors: ['body']
    },
    eventLag: {
      minSamples: 10,
      sampleCount: 3,
      lagThreshold: 3
    },
    ajax: {
      trackMethods: ['GET'],
      trackWebSockets: true,
      ignoreURLs: []
    }
  };

  now = function now() {
    var _ref;
    return (_ref = typeof performance !== "undefined" && performance !== null ? typeof performance.now === "function" ? performance.now() : void 0 : void 0) != null ? _ref : +new Date();
  };

  requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

  cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;

  if (requestAnimationFrame == null) {
    requestAnimationFrame = function requestAnimationFrame(fn) {
      return setTimeout(fn, 50);
    };
    cancelAnimationFrame = function cancelAnimationFrame(id) {
      return clearTimeout(id);
    };
  }

  runAnimation = function runAnimation(fn) {
    var last, _tick;
    last = now();
    _tick = function tick() {
      var diff;
      diff = now() - last;
      if (diff >= 33) {
        last = now();
        return fn(diff, function () {
          return requestAnimationFrame(_tick);
        });
      } else {
        return setTimeout(_tick, 33 - diff);
      }
    };
    return _tick();
  };

  result = function result() {
    var args, key, obj;
    obj = arguments[0], key = arguments[1], args = 3 <= arguments.length ? __slice.call(arguments, 2) : [];
    if (typeof obj[key] === 'function') {
      return obj[key].apply(obj, args);
    } else {
      return obj[key];
    }
  };

  _extend = function extend() {
    var key, out, source, sources, val, _i, _len;
    out = arguments[0], sources = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
    for (_i = 0, _len = sources.length; _i < _len; _i++) {
      source = sources[_i];
      if (source) {
        for (key in source) {
          if (!__hasProp.call(source, key)) continue;
          val = source[key];
          if (out[key] != null && _typeof(out[key]) === 'object' && val != null && (typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object') {
            _extend(out[key], val);
          } else {
            out[key] = val;
          }
        }
      }
    }
    return out;
  };

  avgAmplitude = function avgAmplitude(arr) {
    var count, sum, v, _i, _len;
    sum = count = 0;
    for (_i = 0, _len = arr.length; _i < _len; _i++) {
      v = arr[_i];
      sum += Math.abs(v);
      count++;
    }
    return sum / count;
  };

  getFromDOM = function getFromDOM(key, json) {
    var data, e, el;
    if (key == null) {
      key = 'options';
    }
    if (json == null) {
      json = true;
    }
    el = document.querySelector("[data-pace-" + key + "]");
    if (!el) {
      return;
    }
    data = el.getAttribute("data-pace-" + key);
    if (!json) {
      return data;
    }
    try {
      return JSON.parse(data);
    } catch (_error) {
      e = _error;
      return typeof console !== "undefined" && console !== null ? console.error("Error parsing inline pace options", e) : void 0;
    }
  };

  Evented = function () {
    function Evented() {}

    Evented.prototype.on = function (event, handler, ctx, once) {
      var _base;
      if (once == null) {
        once = false;
      }
      if (this.bindings == null) {
        this.bindings = {};
      }
      if ((_base = this.bindings)[event] == null) {
        _base[event] = [];
      }
      return this.bindings[event].push({
        handler: handler,
        ctx: ctx,
        once: once
      });
    };

    Evented.prototype.once = function (event, handler, ctx) {
      return this.on(event, handler, ctx, true);
    };

    Evented.prototype.off = function (event, handler) {
      var i, _ref, _results;
      if (((_ref = this.bindings) != null ? _ref[event] : void 0) == null) {
        return;
      }
      if (handler == null) {
        return delete this.bindings[event];
      } else {
        i = 0;
        _results = [];
        while (i < this.bindings[event].length) {
          if (this.bindings[event][i].handler === handler) {
            _results.push(this.bindings[event].splice(i, 1));
          } else {
            _results.push(i++);
          }
        }
        return _results;
      }
    };

    Evented.prototype.trigger = function () {
      var args, ctx, event, handler, i, once, _ref, _ref1, _results;
      event = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      if ((_ref = this.bindings) != null ? _ref[event] : void 0) {
        i = 0;
        _results = [];
        while (i < this.bindings[event].length) {
          _ref1 = this.bindings[event][i], handler = _ref1.handler, ctx = _ref1.ctx, once = _ref1.once;
          handler.apply(ctx != null ? ctx : this, args);
          if (once) {
            _results.push(this.bindings[event].splice(i, 1));
          } else {
            _results.push(i++);
          }
        }
        return _results;
      }
    };

    return Evented;
  }();

  Pace = window.Pace || {};

  window.Pace = Pace;

  _extend(Pace, Evented.prototype);

  options = Pace.options = _extend({}, defaultOptions, window.paceOptions, getFromDOM());

  _ref = ['ajax', 'document', 'eventLag', 'elements'];
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    source = _ref[_i];
    if (options[source] === true) {
      options[source] = defaultOptions[source];
    }
  }

  NoTargetError = function (_super) {
    __extends(NoTargetError, _super);

    function NoTargetError() {
      _ref1 = NoTargetError.__super__.constructor.apply(this, arguments);
      return _ref1;
    }

    return NoTargetError;
  }(Error);

  Bar = function () {
    function Bar() {
      this.progress = 0;
    }

    Bar.prototype.getElement = function () {
      var targetElement;
      if (this.el == null) {
        targetElement = document.querySelector(options.target);
        if (!targetElement) {
          throw new NoTargetError();
        }
        this.el = document.createElement('div');
        this.el.className = "pace pace-active";
        document.body.className = document.body.className.replace(/pace-done/g, '');
        document.body.className += ' pace-running';
        this.el.innerHTML = '<div class="pace-progress">\n  <div class="pace-progress-inner"></div>\n</div>\n<div class="pace-activity"></div>';
        if (targetElement.firstChild != null) {
          targetElement.insertBefore(this.el, targetElement.firstChild);
        } else {
          targetElement.appendChild(this.el);
        }
      }
      return this.el;
    };

    Bar.prototype.finish = function () {
      var el;
      el = this.getElement();
      el.className = el.className.replace('pace-active', '');
      el.className += ' pace-inactive';
      document.body.className = document.body.className.replace('pace-running', '');
      return document.body.className += ' pace-done';
    };

    Bar.prototype.update = function (prog) {
      this.progress = prog;
      return this.render();
    };

    Bar.prototype.destroy = function () {
      try {
        this.getElement().parentNode.removeChild(this.getElement());
      } catch (_error) {
        NoTargetError = _error;
      }
      return this.el = void 0;
    };

    Bar.prototype.render = function () {
      var el, key, progressStr, transform, _j, _len1, _ref2;
      if (document.querySelector(options.target) == null) {
        return false;
      }
      el = this.getElement();
      transform = "translate3d(" + this.progress + "%, 0, 0)";
      _ref2 = ['webkitTransform', 'msTransform', 'transform'];
      for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
        key = _ref2[_j];
        el.children[0].style[key] = transform;
      }
      if (!this.lastRenderedProgress || this.lastRenderedProgress | 0 !== this.progress | 0) {
        el.children[0].setAttribute('data-progress-text', "" + (this.progress | 0) + "%");
        if (this.progress >= 100) {
          progressStr = '99';
        } else {
          progressStr = this.progress < 10 ? "0" : "";
          progressStr += this.progress | 0;
        }
        el.children[0].setAttribute('data-progress', "" + progressStr);
      }
      return this.lastRenderedProgress = this.progress;
    };

    Bar.prototype.done = function () {
      return this.progress >= 100;
    };

    return Bar;
  }();

  Events = function () {
    function Events() {
      this.bindings = {};
    }

    Events.prototype.trigger = function (name, val) {
      var binding, _j, _len1, _ref2, _results;
      if (this.bindings[name] != null) {
        _ref2 = this.bindings[name];
        _results = [];
        for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
          binding = _ref2[_j];
          _results.push(binding.call(this, val));
        }
        return _results;
      }
    };

    Events.prototype.on = function (name, fn) {
      var _base;
      if ((_base = this.bindings)[name] == null) {
        _base[name] = [];
      }
      return this.bindings[name].push(fn);
    };

    return Events;
  }();

  _XMLHttpRequest = window.XMLHttpRequest;

  _XDomainRequest = window.XDomainRequest;

  _WebSocket = window.WebSocket;

  extendNative = function extendNative(to, from) {
    var e, key, _results;
    _results = [];
    for (key in from.prototype) {
      try {
        if (to[key] == null && typeof from[key] !== 'function') {
          if (typeof Object.defineProperty === 'function') {
            _results.push(Object.defineProperty(to, key, {
              get: function get() {
                return from.prototype[key];
              },
              configurable: true,
              enumerable: true
            }));
          } else {
            _results.push(to[key] = from.prototype[key]);
          }
        } else {
          _results.push(void 0);
        }
      } catch (_error) {
        e = _error;
      }
    }
    return _results;
  };

  ignoreStack = [];

  Pace.ignore = function () {
    var args, fn, ret;
    fn = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
    ignoreStack.unshift('ignore');
    ret = fn.apply(null, args);
    ignoreStack.shift();
    return ret;
  };

  Pace.track = function () {
    var args, fn, ret;
    fn = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
    ignoreStack.unshift('track');
    ret = fn.apply(null, args);
    ignoreStack.shift();
    return ret;
  };

  shouldTrack = function shouldTrack(method) {
    var _ref2;
    if (method == null) {
      method = 'GET';
    }
    if (ignoreStack[0] === 'track') {
      return 'force';
    }
    if (!ignoreStack.length && options.ajax) {
      if (method === 'socket' && options.ajax.trackWebSockets) {
        return true;
      } else if (_ref2 = method.toUpperCase(), __indexOf.call(options.ajax.trackMethods, _ref2) >= 0) {
        return true;
      }
    }
    return false;
  };

  RequestIntercept = function (_super) {
    __extends(RequestIntercept, _super);

    function RequestIntercept() {
      var monitorXHR,
          _this = this;
      RequestIntercept.__super__.constructor.apply(this, arguments);
      monitorXHR = function monitorXHR(req) {
        var _open;
        _open = req.open;
        return req.open = function (type, url, async) {
          if (shouldTrack(type)) {
            _this.trigger('request', {
              type: type,
              url: url,
              request: req
            });
          }
          return _open.apply(req, arguments);
        };
      };
      window.XMLHttpRequest = function (flags) {
        var req;
        req = new _XMLHttpRequest(flags);
        monitorXHR(req);
        return req;
      };
      try {
        extendNative(window.XMLHttpRequest, _XMLHttpRequest);
      } catch (_error) {}
      if (_XDomainRequest != null) {
        window.XDomainRequest = function () {
          var req;
          req = new _XDomainRequest();
          monitorXHR(req);
          return req;
        };
        try {
          extendNative(window.XDomainRequest, _XDomainRequest);
        } catch (_error) {}
      }
      if (_WebSocket != null && options.ajax.trackWebSockets) {
        window.WebSocket = function (url, protocols) {
          var req;
          if (protocols != null) {
            req = new _WebSocket(url, protocols);
          } else {
            req = new _WebSocket(url);
          }
          if (shouldTrack('socket')) {
            _this.trigger('request', {
              type: 'socket',
              url: url,
              protocols: protocols,
              request: req
            });
          }
          return req;
        };
        try {
          extendNative(window.WebSocket, _WebSocket);
        } catch (_error) {}
      }
    }

    return RequestIntercept;
  }(Events);

  _intercept = null;

  getIntercept = function getIntercept() {
    if (_intercept == null) {
      _intercept = new RequestIntercept();
    }
    return _intercept;
  };

  shouldIgnoreURL = function shouldIgnoreURL(url) {
    var pattern, _j, _len1, _ref2;
    _ref2 = options.ajax.ignoreURLs;
    for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
      pattern = _ref2[_j];
      if (typeof pattern === 'string') {
        if (url.indexOf(pattern) !== -1) {
          return true;
        }
      } else {
        if (pattern.test(url)) {
          return true;
        }
      }
    }
    return false;
  };

  getIntercept().on('request', function (_arg) {
    var after, args, request, type, url;
    type = _arg.type, request = _arg.request, url = _arg.url;
    if (shouldIgnoreURL(url)) {
      return;
    }
    if (!Pace.running && (options.restartOnRequestAfter !== false || shouldTrack(type) === 'force')) {
      args = arguments;
      after = options.restartOnRequestAfter || 0;
      if (typeof after === 'boolean') {
        after = 0;
      }
      return setTimeout(function () {
        var stillActive, _j, _len1, _ref2, _ref3, _results;
        if (type === 'socket') {
          stillActive = request.readyState < 2;
        } else {
          stillActive = 0 < (_ref2 = request.readyState) && _ref2 < 4;
        }
        if (stillActive) {
          Pace.restart();
          _ref3 = Pace.sources;
          _results = [];
          for (_j = 0, _len1 = _ref3.length; _j < _len1; _j++) {
            source = _ref3[_j];
            if (source instanceof AjaxMonitor) {
              source.watch.apply(source, args);
              break;
            } else {
              _results.push(void 0);
            }
          }
          return _results;
        }
      }, after);
    }
  });

  AjaxMonitor = function () {
    function AjaxMonitor() {
      var _this = this;
      this.elements = [];
      getIntercept().on('request', function () {
        return _this.watch.apply(_this, arguments);
      });
    }

    AjaxMonitor.prototype.watch = function (_arg) {
      var request, tracker, type, url;
      type = _arg.type, request = _arg.request, url = _arg.url;
      if (shouldIgnoreURL(url)) {
        return;
      }
      if (type === 'socket') {
        tracker = new SocketRequestTracker(request);
      } else {
        tracker = new XHRRequestTracker(request);
      }
      return this.elements.push(tracker);
    };

    return AjaxMonitor;
  }();

  XHRRequestTracker = function () {
    function XHRRequestTracker(request) {
      var event,
          size,
          _j,
          _len1,
          _onreadystatechange,
          _ref2,
          _this = this;
      this.progress = 0;
      if (window.ProgressEvent != null) {
        size = null;
        request.addEventListener('progress', function (evt) {
          if (evt.lengthComputable) {
            return _this.progress = 100 * evt.loaded / evt.total;
          } else {
            return _this.progress = _this.progress + (100 - _this.progress) / 2;
          }
        }, false);
        _ref2 = ['load', 'abort', 'timeout', 'error'];
        for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
          event = _ref2[_j];
          request.addEventListener(event, function () {
            return _this.progress = 100;
          }, false);
        }
      } else {
        _onreadystatechange = request.onreadystatechange;
        request.onreadystatechange = function () {
          var _ref3;
          if ((_ref3 = request.readyState) === 0 || _ref3 === 4) {
            _this.progress = 100;
          } else if (request.readyState === 3) {
            _this.progress = 50;
          }
          return typeof _onreadystatechange === "function" ? _onreadystatechange.apply(null, arguments) : void 0;
        };
      }
    }

    return XHRRequestTracker;
  }();

  SocketRequestTracker = function () {
    function SocketRequestTracker(request) {
      var event,
          _j,
          _len1,
          _ref2,
          _this = this;
      this.progress = 0;
      _ref2 = ['error', 'open'];
      for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
        event = _ref2[_j];
        request.addEventListener(event, function () {
          return _this.progress = 100;
        }, false);
      }
    }

    return SocketRequestTracker;
  }();

  ElementMonitor = function () {
    function ElementMonitor(options) {
      var selector, _j, _len1, _ref2;
      if (options == null) {
        options = {};
      }
      this.elements = [];
      if (options.selectors == null) {
        options.selectors = [];
      }
      _ref2 = options.selectors;
      for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
        selector = _ref2[_j];
        this.elements.push(new ElementTracker(selector));
      }
    }

    return ElementMonitor;
  }();

  ElementTracker = function () {
    function ElementTracker(selector) {
      this.selector = selector;
      this.progress = 0;
      this.check();
    }

    ElementTracker.prototype.check = function () {
      var _this = this;
      if (document.querySelector(this.selector)) {
        return this.done();
      } else {
        return setTimeout(function () {
          return _this.check();
        }, options.elements.checkInterval);
      }
    };

    ElementTracker.prototype.done = function () {
      return this.progress = 100;
    };

    return ElementTracker;
  }();

  DocumentMonitor = function () {
    DocumentMonitor.prototype.states = {
      loading: 0,
      interactive: 50,
      complete: 100
    };

    function DocumentMonitor() {
      var _onreadystatechange,
          _ref2,
          _this = this;
      this.progress = (_ref2 = this.states[document.readyState]) != null ? _ref2 : 100;
      _onreadystatechange = document.onreadystatechange;
      document.onreadystatechange = function () {
        if (_this.states[document.readyState] != null) {
          _this.progress = _this.states[document.readyState];
        }
        return typeof _onreadystatechange === "function" ? _onreadystatechange.apply(null, arguments) : void 0;
      };
    }

    return DocumentMonitor;
  }();

  EventLagMonitor = function () {
    function EventLagMonitor() {
      var avg,
          interval,
          last,
          points,
          samples,
          _this = this;
      this.progress = 0;
      avg = 0;
      samples = [];
      points = 0;
      last = now();
      interval = setInterval(function () {
        var diff;
        diff = now() - last - 50;
        last = now();
        samples.push(diff);
        if (samples.length > options.eventLag.sampleCount) {
          samples.shift();
        }
        avg = avgAmplitude(samples);
        if (++points >= options.eventLag.minSamples && avg < options.eventLag.lagThreshold) {
          _this.progress = 100;
          return clearInterval(interval);
        } else {
          return _this.progress = 100 * (3 / (avg + 3));
        }
      }, 50);
    }

    return EventLagMonitor;
  }();

  Scaler = function () {
    function Scaler(source) {
      this.source = source;
      this.last = this.sinceLastUpdate = 0;
      this.rate = options.initialRate;
      this.catchup = 0;
      this.progress = this.lastProgress = 0;
      if (this.source != null) {
        this.progress = result(this.source, 'progress');
      }
    }

    Scaler.prototype.tick = function (frameTime, val) {
      var scaling;
      if (val == null) {
        val = result(this.source, 'progress');
      }
      if (val >= 100) {
        this.done = true;
      }
      if (val === this.last) {
        this.sinceLastUpdate += frameTime;
      } else {
        if (this.sinceLastUpdate) {
          this.rate = (val - this.last) / this.sinceLastUpdate;
        }
        this.catchup = (val - this.progress) / options.catchupTime;
        this.sinceLastUpdate = 0;
        this.last = val;
      }
      if (val > this.progress) {
        this.progress += this.catchup * frameTime;
      }
      scaling = 1 - Math.pow(this.progress / 100, options.easeFactor);
      this.progress += scaling * this.rate * frameTime;
      this.progress = Math.min(this.lastProgress + options.maxProgressPerFrame, this.progress);
      this.progress = Math.max(0, this.progress);
      this.progress = Math.min(100, this.progress);
      this.lastProgress = this.progress;
      return this.progress;
    };

    return Scaler;
  }();

  sources = null;

  scalers = null;

  bar = null;

  uniScaler = null;

  animation = null;

  cancelAnimation = null;

  Pace.running = false;

  handlePushState = function handlePushState() {
    if (options.restartOnPushState) {
      return Pace.restart();
    }
  };

  if (window.history.pushState != null) {
    _pushState = window.history.pushState;
    window.history.pushState = function () {
      handlePushState();
      return _pushState.apply(window.history, arguments);
    };
  }

  if (window.history.replaceState != null) {
    _replaceState = window.history.replaceState;
    window.history.replaceState = function () {
      handlePushState();
      return _replaceState.apply(window.history, arguments);
    };
  }

  SOURCE_KEYS = {
    ajax: AjaxMonitor,
    elements: ElementMonitor,
    document: DocumentMonitor,
    eventLag: EventLagMonitor
  };

  (init = function init() {
    var type, _j, _k, _len1, _len2, _ref2, _ref3, _ref4;
    Pace.sources = sources = [];
    _ref2 = ['ajax', 'elements', 'document', 'eventLag'];
    for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
      type = _ref2[_j];
      if (options[type] !== false) {
        sources.push(new SOURCE_KEYS[type](options[type]));
      }
    }
    _ref4 = (_ref3 = options.extraSources) != null ? _ref3 : [];
    for (_k = 0, _len2 = _ref4.length; _k < _len2; _k++) {
      source = _ref4[_k];
      sources.push(new source(options));
    }
    Pace.bar = bar = new Bar();
    scalers = [];
    return uniScaler = new Scaler();
  })();

  Pace.stop = function () {
    Pace.trigger('stop');
    Pace.running = false;
    bar.destroy();
    cancelAnimation = true;
    if (animation != null) {
      if (typeof cancelAnimationFrame === "function") {
        cancelAnimationFrame(animation);
      }
      animation = null;
    }
    return init();
  };

  Pace.restart = function () {
    Pace.trigger('restart');
    Pace.stop();
    return Pace.start();
  };

  Pace.go = function () {
    var start;
    Pace.running = true;
    bar.render();
    start = now();
    cancelAnimation = false;
    return animation = runAnimation(function (frameTime, enqueueNextFrame) {
      var avg, count, done, element, elements, i, j, remaining, scaler, scalerList, sum, _j, _k, _len1, _len2, _ref2;
      remaining = 100 - bar.progress;
      count = sum = 0;
      done = true;
      for (i = _j = 0, _len1 = sources.length; _j < _len1; i = ++_j) {
        source = sources[i];
        scalerList = scalers[i] != null ? scalers[i] : scalers[i] = [];
        elements = (_ref2 = source.elements) != null ? _ref2 : [source];
        for (j = _k = 0, _len2 = elements.length; _k < _len2; j = ++_k) {
          element = elements[j];
          scaler = scalerList[j] != null ? scalerList[j] : scalerList[j] = new Scaler(element);
          done &= scaler.done;
          if (scaler.done) {
            continue;
          }
          count++;
          sum += scaler.tick(frameTime);
        }
      }
      avg = sum / count;
      bar.update(uniScaler.tick(frameTime, avg));
      if (bar.done() || done || cancelAnimation) {
        bar.update(100);
        Pace.trigger('done');
        return setTimeout(function () {
          bar.finish();
          Pace.running = false;
          return Pace.trigger('hide');
        }, Math.max(options.ghostTime, Math.max(options.minTime - (now() - start), 0)));
      } else {
        return enqueueNextFrame();
      }
    });
  };

  Pace.start = function (_options) {
    _extend(options, _options);
    Pace.running = true;
    try {
      bar.render();
    } catch (_error) {
      NoTargetError = _error;
    }
    if (!document.querySelector('.pace')) {
      return setTimeout(Pace.start, 50);
    } else {
      Pace.trigger('start');
      return Pace.go();
    }
  };

  if (typeof define === 'function' && define.amd) {
    define(['pace'], function () {
      return Pace;
    });
  } else if ((typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object') {
    module.exports = Pace;
  } else {
    if (options.startOnPageLoad) {
      Pace.start();
    }
  }
}).call(undefined);
'use strict';

jQuery(function ($) {
    'use strict';

    // Flexy navigation

    flexy_navigation.init();

    // Show dropdowns on mouseover
    var $headers = $('.flexy-header'),
        $dropdowns_link = $('.flexy-navigation__item--dropdown > a');

    $dropdowns_link.on('click', function (event) {
        event.preventDefault();

        var $element = $(this),
            $header = $element.parents('.flexy-header'),
            $list_items = $header.find('.flexy-navigation__item--dropdown');

        if ($list_items.hasClass('hover')) {
            $list_items.removeClass('hover');
        } else {
            $list_items.addClass('hover');
        }
    });

    // Remove dropdown on click outside
    $(window).on('click', function (event) {
        var $list_items = $('.flexy-navigation__item--dropdown');

        if ($list_items !== event.target && !$list_items.has(event.target).length) {
            $list_items.removeClass('hover');
        }
    });

    // Add a "close" toggle to the last dropdown menu in the header
    $headers.each(function (index, value) {
        var $header = $(this),
            $list_item = $header.find('.flexy-navigation > .flexy-navigation__item--dropdown').last(),
            $dropdown_menu = $list_item.find('.flexy-navigation__item__dropdown-menu');

        var $btn = $('<span />').addClass('flexy-navigation__item__dropdown-menu__toggle icon fa fa-close').on('click', function (event) {
            var $element = $(this),
                $header = $element.parents('.flexy-header'),
                $list_items = $header.find('.flexy-navigation__item--dropdown');

            $list_items.removeClass('hover');
        });

        $dropdown_menu.append($btn);
    });

    // Set a first- and last child class on the dropdowns
    $headers.each(function (index, value) {
        var $header = $(this);

        // First child
        $header.find('.flexy-navigation > .flexy-navigation__item--dropdown').first().addClass('flexy-navigation__item--dropdown--first-child');

        // Last child
        $header.find('.flexy-navigation > .flexy-navigation__item--dropdown').last().addClass('flexy-navigation__item--dropdown--last-child');
    });

    // Set dropdown menu height
    function _flexy_navigation_set_dropdown_menu_height() {
        var $headers = $('.flexy-header');

        // Apply the same height to all dropdown menus
        $headers.each(function (index, value) {
            var $header = $(this),
                $dropdown_menus = $header.find('.flexy-navigation__item__dropdown-menu'),
                tallest_dropdown = 0;

            // Remove height temporarily, from the dropdowns so it can be set
            $dropdown_menus.css('height', 'auto');

            // Find the tallest dropdown menu
            $dropdown_menus.each(function (index, value) {
                var $dropdown_menu = $(this),
                    height = $dropdown_menu.outerHeight(true);

                if (height > tallest_dropdown) {
                    tallest_dropdown = height;
                }
            });

            // Apply the tallest height to all dropdown menus
            $dropdown_menus.css('height', tallest_dropdown);
        });
    }
    _flexy_navigation_set_dropdown_menu_height(); // Run on boot

    // Recalculate dropdown menu height when window is resized
    $(window).on('resize', function () {
        _flexy_navigation_set_dropdown_menu_height();
    });
});
'use strict';

jQuery(function ($) {
    'use strict';

    // Flexy header

    flexy_header.init();

    // Sidr
    $('.slinky-menu').find('ul, li, a').removeClass();

    $('.sidr-toggle--right').sidr({
        name: 'sidr-main',
        side: 'right',
        renaming: false,
        body: '.layout__wrapper',
        source: '.sidr-source-provider'
    });

    // Slinky
    $('.sidr .slinky-menu').slinky({
        title: true,
        label: ''
    });

    // Enable / disable Bootstrap tooltips, based upon touch events
    if (Modernizr.touchevents) {
        $('[data-toggle="tooltip"]').tooltip('hide');
    } else {
        $('[data-toggle="tooltip"]').tooltip();
    }

    // Share
    $('.share__item__toggle').on('click', function (event) {
        var $element = $(this);

        $element.parents('.share__item').toggleClass('visible');
    });

    // Better exposed filter
    var $checkboxes = $('.form-type-bef-checkbox input[type="checkbox"]');

    $checkboxes.each(function (index, item) {
        var $element = $(this),
            $parent = $element.parents('.form-type-bef-checkbox');

        // Add classes on document load
        if ($element.is(':checked')) {
            $parent.addClass('is-checked');
        } else {
            $parent.removeClass('is-checked');
        }

        // When checkbox value is changed
        $element.on('change', function (event) {
            var $element = $(this),
                $parent = $element.parents('.form-type-bef-checkbox');

            if ($element.is(':checked')) {
                $parent.addClass('is-checked');
            } else {
                $parent.removeClass('is-checked');
            }
        });
    });
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJvb3RzdHJhcC5qcyIsImZsZXh5LWhlYWRlci5qcyIsImZsZXh5LW5hdmlnYXRpb24uanMiLCJqcXVlcnkuc2lkci5qcyIsImpxdWVyeS5zbGlua3kuanMiLCJwYWNlLmpzIiwiYXBwLmpzIl0sIm5hbWVzIjpbImpRdWVyeSIsIkVycm9yIiwiJCIsInZlcnNpb24iLCJmbiIsImpxdWVyeSIsInNwbGl0IiwidHJhbnNpdGlvbkVuZCIsImVsIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwidHJhbnNFbmRFdmVudE5hbWVzIiwiV2Via2l0VHJhbnNpdGlvbiIsIk1velRyYW5zaXRpb24iLCJPVHJhbnNpdGlvbiIsInRyYW5zaXRpb24iLCJuYW1lIiwic3R5bGUiLCJ1bmRlZmluZWQiLCJlbmQiLCJlbXVsYXRlVHJhbnNpdGlvbkVuZCIsImR1cmF0aW9uIiwiY2FsbGVkIiwiJGVsIiwib25lIiwiY2FsbGJhY2siLCJ0cmlnZ2VyIiwic3VwcG9ydCIsInNldFRpbWVvdXQiLCJldmVudCIsInNwZWNpYWwiLCJic1RyYW5zaXRpb25FbmQiLCJiaW5kVHlwZSIsImRlbGVnYXRlVHlwZSIsImhhbmRsZSIsImUiLCJ0YXJnZXQiLCJpcyIsImhhbmRsZU9iaiIsImhhbmRsZXIiLCJhcHBseSIsImFyZ3VtZW50cyIsImRpc21pc3MiLCJBbGVydCIsIm9uIiwiY2xvc2UiLCJWRVJTSU9OIiwiVFJBTlNJVElPTl9EVVJBVElPTiIsInByb3RvdHlwZSIsIiR0aGlzIiwic2VsZWN0b3IiLCJhdHRyIiwicmVwbGFjZSIsIiRwYXJlbnQiLCJwcmV2ZW50RGVmYXVsdCIsImxlbmd0aCIsImNsb3Nlc3QiLCJFdmVudCIsImlzRGVmYXVsdFByZXZlbnRlZCIsInJlbW92ZUNsYXNzIiwicmVtb3ZlRWxlbWVudCIsImRldGFjaCIsInJlbW92ZSIsImhhc0NsYXNzIiwiUGx1Z2luIiwib3B0aW9uIiwiZWFjaCIsImRhdGEiLCJjYWxsIiwib2xkIiwiYWxlcnQiLCJDb25zdHJ1Y3RvciIsIm5vQ29uZmxpY3QiLCJCdXR0b24iLCJlbGVtZW50Iiwib3B0aW9ucyIsIiRlbGVtZW50IiwiZXh0ZW5kIiwiREVGQVVMVFMiLCJpc0xvYWRpbmciLCJsb2FkaW5nVGV4dCIsInNldFN0YXRlIiwic3RhdGUiLCJkIiwidmFsIiwicmVzZXRUZXh0IiwicHJveHkiLCJhZGRDbGFzcyIsInByb3AiLCJyZW1vdmVBdHRyIiwidG9nZ2xlIiwiY2hhbmdlZCIsIiRpbnB1dCIsImZpbmQiLCJ0b2dnbGVDbGFzcyIsImJ1dHRvbiIsIiRidG4iLCJmaXJzdCIsInRlc3QiLCJ0eXBlIiwiQ2Fyb3VzZWwiLCIkaW5kaWNhdG9ycyIsInBhdXNlZCIsInNsaWRpbmciLCJpbnRlcnZhbCIsIiRhY3RpdmUiLCIkaXRlbXMiLCJrZXlib2FyZCIsImtleWRvd24iLCJwYXVzZSIsImRvY3VtZW50RWxlbWVudCIsImN5Y2xlIiwid3JhcCIsInRhZ05hbWUiLCJ3aGljaCIsInByZXYiLCJuZXh0IiwiY2xlYXJJbnRlcnZhbCIsInNldEludGVydmFsIiwiZ2V0SXRlbUluZGV4IiwiaXRlbSIsInBhcmVudCIsImNoaWxkcmVuIiwiaW5kZXgiLCJnZXRJdGVtRm9yRGlyZWN0aW9uIiwiZGlyZWN0aW9uIiwiYWN0aXZlIiwiYWN0aXZlSW5kZXgiLCJ3aWxsV3JhcCIsImRlbHRhIiwiaXRlbUluZGV4IiwiZXEiLCJ0byIsInBvcyIsInRoYXQiLCJzbGlkZSIsIiRuZXh0IiwiaXNDeWNsaW5nIiwicmVsYXRlZFRhcmdldCIsInNsaWRlRXZlbnQiLCIkbmV4dEluZGljYXRvciIsInNsaWRFdmVudCIsIm9mZnNldFdpZHRoIiwiam9pbiIsImFjdGlvbiIsImNhcm91c2VsIiwiY2xpY2tIYW5kbGVyIiwiaHJlZiIsIiR0YXJnZXQiLCJzbGlkZUluZGV4Iiwid2luZG93IiwiJGNhcm91c2VsIiwiQ29sbGFwc2UiLCIkdHJpZ2dlciIsImlkIiwidHJhbnNpdGlvbmluZyIsImdldFBhcmVudCIsImFkZEFyaWFBbmRDb2xsYXBzZWRDbGFzcyIsImRpbWVuc2lvbiIsImhhc1dpZHRoIiwic2hvdyIsImFjdGl2ZXNEYXRhIiwiYWN0aXZlcyIsInN0YXJ0RXZlbnQiLCJjb21wbGV0ZSIsInNjcm9sbFNpemUiLCJjYW1lbENhc2UiLCJoaWRlIiwib2Zmc2V0SGVpZ2h0IiwiaSIsImdldFRhcmdldEZyb21UcmlnZ2VyIiwiaXNPcGVuIiwiY29sbGFwc2UiLCJiYWNrZHJvcCIsIkRyb3Bkb3duIiwiY2xlYXJNZW51cyIsImNvbnRhaW5zIiwiaXNBY3RpdmUiLCJpbnNlcnRBZnRlciIsInN0b3BQcm9wYWdhdGlvbiIsImRlc2MiLCJkcm9wZG93biIsIk1vZGFsIiwiJGJvZHkiLCJib2R5IiwiJGRpYWxvZyIsIiRiYWNrZHJvcCIsImlzU2hvd24iLCJvcmlnaW5hbEJvZHlQYWQiLCJzY3JvbGxiYXJXaWR0aCIsImlnbm9yZUJhY2tkcm9wQ2xpY2siLCJyZW1vdGUiLCJsb2FkIiwiQkFDS0RST1BfVFJBTlNJVElPTl9EVVJBVElPTiIsIl9yZWxhdGVkVGFyZ2V0IiwiY2hlY2tTY3JvbGxiYXIiLCJzZXRTY3JvbGxiYXIiLCJlc2NhcGUiLCJyZXNpemUiLCJhcHBlbmRUbyIsInNjcm9sbFRvcCIsImFkanVzdERpYWxvZyIsImVuZm9yY2VGb2N1cyIsIm9mZiIsImhpZGVNb2RhbCIsImhhcyIsImhhbmRsZVVwZGF0ZSIsInJlc2V0QWRqdXN0bWVudHMiLCJyZXNldFNjcm9sbGJhciIsInJlbW92ZUJhY2tkcm9wIiwiYW5pbWF0ZSIsImRvQW5pbWF0ZSIsImN1cnJlbnRUYXJnZXQiLCJmb2N1cyIsImNhbGxiYWNrUmVtb3ZlIiwibW9kYWxJc092ZXJmbG93aW5nIiwic2Nyb2xsSGVpZ2h0IiwiY2xpZW50SGVpZ2h0IiwiY3NzIiwicGFkZGluZ0xlZnQiLCJib2R5SXNPdmVyZmxvd2luZyIsInBhZGRpbmdSaWdodCIsImZ1bGxXaW5kb3dXaWR0aCIsImlubmVyV2lkdGgiLCJkb2N1bWVudEVsZW1lbnRSZWN0IiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwicmlnaHQiLCJNYXRoIiwiYWJzIiwibGVmdCIsImNsaWVudFdpZHRoIiwibWVhc3VyZVNjcm9sbGJhciIsImJvZHlQYWQiLCJwYXJzZUludCIsInNjcm9sbERpdiIsImNsYXNzTmFtZSIsImFwcGVuZCIsInJlbW92ZUNoaWxkIiwibW9kYWwiLCJzaG93RXZlbnQiLCJUb29sdGlwIiwiZW5hYmxlZCIsInRpbWVvdXQiLCJob3ZlclN0YXRlIiwiaW5TdGF0ZSIsImluaXQiLCJhbmltYXRpb24iLCJwbGFjZW1lbnQiLCJ0ZW1wbGF0ZSIsInRpdGxlIiwiZGVsYXkiLCJodG1sIiwiY29udGFpbmVyIiwidmlld3BvcnQiLCJwYWRkaW5nIiwiZ2V0T3B0aW9ucyIsIiR2aWV3cG9ydCIsImlzRnVuY3Rpb24iLCJjbGljayIsImhvdmVyIiwiY29uc3RydWN0b3IiLCJ0cmlnZ2VycyIsImV2ZW50SW4iLCJldmVudE91dCIsImVudGVyIiwibGVhdmUiLCJfb3B0aW9ucyIsImZpeFRpdGxlIiwiZ2V0RGVmYXVsdHMiLCJnZXREZWxlZ2F0ZU9wdGlvbnMiLCJkZWZhdWx0cyIsImtleSIsInZhbHVlIiwib2JqIiwic2VsZiIsInRpcCIsImNsZWFyVGltZW91dCIsImlzSW5TdGF0ZVRydWUiLCJoYXNDb250ZW50IiwiaW5Eb20iLCJvd25lckRvY3VtZW50IiwiJHRpcCIsInRpcElkIiwiZ2V0VUlEIiwic2V0Q29udGVudCIsImF1dG9Ub2tlbiIsImF1dG9QbGFjZSIsInRvcCIsImRpc3BsYXkiLCJnZXRQb3NpdGlvbiIsImFjdHVhbFdpZHRoIiwiYWN0dWFsSGVpZ2h0Iiwib3JnUGxhY2VtZW50Iiwidmlld3BvcnREaW0iLCJib3R0b20iLCJ3aWR0aCIsImNhbGN1bGF0ZWRPZmZzZXQiLCJnZXRDYWxjdWxhdGVkT2Zmc2V0IiwiYXBwbHlQbGFjZW1lbnQiLCJwcmV2SG92ZXJTdGF0ZSIsIm9mZnNldCIsImhlaWdodCIsIm1hcmdpblRvcCIsIm1hcmdpbkxlZnQiLCJpc05hTiIsInNldE9mZnNldCIsInVzaW5nIiwicHJvcHMiLCJyb3VuZCIsImdldFZpZXdwb3J0QWRqdXN0ZWREZWx0YSIsImlzVmVydGljYWwiLCJhcnJvd0RlbHRhIiwiYXJyb3dPZmZzZXRQb3NpdGlvbiIsInJlcGxhY2VBcnJvdyIsImFycm93IiwiZ2V0VGl0bGUiLCIkZSIsImlzQm9keSIsImVsUmVjdCIsImlzU3ZnIiwiU1ZHRWxlbWVudCIsImVsT2Zmc2V0Iiwic2Nyb2xsIiwib3V0ZXJEaW1zIiwidmlld3BvcnRQYWRkaW5nIiwidmlld3BvcnREaW1lbnNpb25zIiwidG9wRWRnZU9mZnNldCIsImJvdHRvbUVkZ2VPZmZzZXQiLCJsZWZ0RWRnZU9mZnNldCIsInJpZ2h0RWRnZU9mZnNldCIsIm8iLCJwcmVmaXgiLCJyYW5kb20iLCJnZXRFbGVtZW50QnlJZCIsIiRhcnJvdyIsImVuYWJsZSIsImRpc2FibGUiLCJ0b2dnbGVFbmFibGVkIiwiZGVzdHJveSIsInJlbW92ZURhdGEiLCJ0b29sdGlwIiwiUG9wb3ZlciIsImNvbnRlbnQiLCJnZXRDb250ZW50IiwicG9wb3ZlciIsIlNjcm9sbFNweSIsIiRzY3JvbGxFbGVtZW50Iiwib2Zmc2V0cyIsInRhcmdldHMiLCJhY3RpdmVUYXJnZXQiLCJwcm9jZXNzIiwicmVmcmVzaCIsImdldFNjcm9sbEhlaWdodCIsIm1heCIsIm9mZnNldE1ldGhvZCIsIm9mZnNldEJhc2UiLCJpc1dpbmRvdyIsIm1hcCIsIiRocmVmIiwic29ydCIsImEiLCJiIiwicHVzaCIsIm1heFNjcm9sbCIsImFjdGl2YXRlIiwiY2xlYXIiLCJwYXJlbnRzIiwicGFyZW50c1VudGlsIiwic2Nyb2xsc3B5IiwiJHNweSIsIlRhYiIsIiR1bCIsIiRwcmV2aW91cyIsImhpZGVFdmVudCIsInRhYiIsIkFmZml4IiwiY2hlY2tQb3NpdGlvbiIsImNoZWNrUG9zaXRpb25XaXRoRXZlbnRMb29wIiwiYWZmaXhlZCIsInVucGluIiwicGlubmVkT2Zmc2V0IiwiUkVTRVQiLCJnZXRTdGF0ZSIsIm9mZnNldFRvcCIsIm9mZnNldEJvdHRvbSIsInBvc2l0aW9uIiwidGFyZ2V0SGVpZ2h0IiwiaW5pdGlhbGl6aW5nIiwiY29sbGlkZXJUb3AiLCJjb2xsaWRlckhlaWdodCIsImdldFBpbm5lZE9mZnNldCIsImFmZml4IiwiYWZmaXhUeXBlIiwiZmxleHlfaGVhZGVyIiwicHViIiwiJGhlYWRlcl9zdGF0aWMiLCIkaGVhZGVyX3N0aWNreSIsInVwZGF0ZV9pbnRlcnZhbCIsInRvbGVyYW5jZSIsInVwd2FyZCIsImRvd253YXJkIiwiX2dldF9vZmZzZXRfZnJvbV9lbGVtZW50c19ib3R0b20iLCJjbGFzc2VzIiwicGlubmVkIiwidW5waW5uZWQiLCJ3YXNfc2Nyb2xsZWQiLCJsYXN0X2Rpc3RhbmNlX2Zyb21fdG9wIiwicmVnaXN0ZXJFdmVudEhhbmRsZXJzIiwicmVnaXN0ZXJCb290RXZlbnRIYW5kbGVycyIsImRvY3VtZW50X3dhc19zY3JvbGxlZCIsImVsZW1lbnRfaGVpZ2h0Iiwib3V0ZXJIZWlnaHQiLCJlbGVtZW50X29mZnNldCIsImN1cnJlbnRfZGlzdGFuY2VfZnJvbV90b3AiLCJmbGV4eV9uYXZpZ2F0aW9uIiwibGF5b3V0X2NsYXNzZXMiLCJ1cGdyYWRlIiwiJG5hdmlnYXRpb25zIiwibmF2aWdhdGlvbiIsIiRuYXZpZ2F0aW9uIiwiJG1lZ2FtZW51cyIsImRyb3Bkb3duX21lZ2FtZW51IiwiJGRyb3Bkb3duX21lZ2FtZW51IiwiZHJvcGRvd25faGFzX21lZ2FtZW51IiwiaXNfdXBncmFkZWQiLCJuYXZpZ2F0aW9uX2hhc19tZWdhbWVudSIsIiRtZWdhbWVudSIsImhhc19vYmZ1c2NhdG9yIiwib2JmdXNjYXRvciIsImJhYmVsSGVscGVycyIsImNsYXNzQ2FsbENoZWNrIiwiaW5zdGFuY2UiLCJUeXBlRXJyb3IiLCJjcmVhdGVDbGFzcyIsImRlZmluZVByb3BlcnRpZXMiLCJkZXNjcmlwdG9yIiwiZW51bWVyYWJsZSIsImNvbmZpZ3VyYWJsZSIsIndyaXRhYmxlIiwiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJwcm90b1Byb3BzIiwic3RhdGljUHJvcHMiLCJzaWRyU3RhdHVzIiwibW92aW5nIiwib3BlbmVkIiwiaGVscGVyIiwiaXNVcmwiLCJzdHIiLCJwYXR0ZXJuIiwiUmVnRXhwIiwiYWRkUHJlZml4ZXMiLCJhZGRQcmVmaXgiLCJhdHRyaWJ1dGUiLCJ0b1JlcGxhY2UiLCJ0cmFuc2l0aW9ucyIsInN1cHBvcnRlZCIsInByb3BlcnR5IiwicHJlZml4ZXMiLCJjaGFyQXQiLCJ0b1VwcGVyQ2FzZSIsInN1YnN0ciIsInRvTG93ZXJDYXNlIiwiJCQyIiwiYm9keUFuaW1hdGlvbkNsYXNzIiwib3BlbkFjdGlvbiIsImNsb3NlQWN0aW9uIiwidHJhbnNpdGlvbkVuZEV2ZW50IiwiTWVudSIsIm9wZW5DbGFzcyIsIm1lbnVXaWR0aCIsIm91dGVyV2lkdGgiLCJzcGVlZCIsInNpZGUiLCJkaXNwbGFjZSIsInRpbWluZyIsIm1ldGhvZCIsIm9uT3BlbkNhbGxiYWNrIiwib25DbG9zZUNhbGxiYWNrIiwib25PcGVuRW5kQ2FsbGJhY2siLCJvbkNsb3NlRW5kQ2FsbGJhY2siLCJnZXRBbmltYXRpb24iLCJwcmVwYXJlQm9keSIsIiRodG1sIiwib3BlbkJvZHkiLCJib2R5QW5pbWF0aW9uIiwicXVldWUiLCJvbkNsb3NlQm9keSIsInJlc2V0U3R5bGVzIiwidW5iaW5kIiwiY2xvc2VCb2R5IiwiX3RoaXMiLCJtb3ZlQm9keSIsIm9uT3Blbk1lbnUiLCJvcGVuTWVudSIsIl90aGlzMiIsIiRpdGVtIiwibWVudUFuaW1hdGlvbiIsIm9uQ2xvc2VNZW51IiwiY2xvc2VNZW51IiwiX3RoaXMzIiwibW92ZU1lbnUiLCJtb3ZlIiwib3BlbiIsIl90aGlzNCIsImFscmVhZHlPcGVuZWRNZW51IiwiJCQxIiwiZXhlY3V0ZSIsInNpZHIiLCJlcnJvciIsInB1YmxpY01ldGhvZHMiLCJtZXRob2ROYW1lIiwibWV0aG9kcyIsImdldE1ldGhvZCIsIkFycmF5Iiwic2xpY2UiLCIkJDMiLCJmaWxsQ29udGVudCIsIiRzaWRlTWVudSIsInNldHRpbmdzIiwic291cmNlIiwibmV3Q29udGVudCIsImdldCIsImh0bWxDb250ZW50Iiwic2VsZWN0b3JzIiwicmVuYW1pbmciLCIkaHRtbENvbnRlbnQiLCJmblNpZHIiLCJiaW5kIiwib25PcGVuIiwib25DbG9zZSIsIm9uT3BlbkVuZCIsIm9uQ2xvc2VFbmQiLCJmbGFnIiwidCIsInNsaW5reSIsInMiLCJsYWJlbCIsIm4iLCJyIiwibCIsInByZXBlbmQiLCJ0ZXh0IiwiRGF0ZSIsIm5vdyIsImp1bXAiLCJob21lIiwiYyIsIkFqYXhNb25pdG9yIiwiQmFyIiwiRG9jdW1lbnRNb25pdG9yIiwiRWxlbWVudE1vbml0b3IiLCJFbGVtZW50VHJhY2tlciIsIkV2ZW50TGFnTW9uaXRvciIsIkV2ZW50ZWQiLCJFdmVudHMiLCJOb1RhcmdldEVycm9yIiwiUGFjZSIsIlJlcXVlc3RJbnRlcmNlcHQiLCJTT1VSQ0VfS0VZUyIsIlNjYWxlciIsIlNvY2tldFJlcXVlc3RUcmFja2VyIiwiWEhSUmVxdWVzdFRyYWNrZXIiLCJhdmdBbXBsaXR1ZGUiLCJiYXIiLCJjYW5jZWxBbmltYXRpb24iLCJjYW5jZWxBbmltYXRpb25GcmFtZSIsImRlZmF1bHRPcHRpb25zIiwiZXh0ZW5kTmF0aXZlIiwiZ2V0RnJvbURPTSIsImdldEludGVyY2VwdCIsImhhbmRsZVB1c2hTdGF0ZSIsImlnbm9yZVN0YWNrIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwicmVzdWx0IiwicnVuQW5pbWF0aW9uIiwic2NhbGVycyIsInNob3VsZElnbm9yZVVSTCIsInNob3VsZFRyYWNrIiwic291cmNlcyIsInVuaVNjYWxlciIsIl9XZWJTb2NrZXQiLCJfWERvbWFpblJlcXVlc3QiLCJfWE1MSHR0cFJlcXVlc3QiLCJfaSIsIl9pbnRlcmNlcHQiLCJfbGVuIiwiX3B1c2hTdGF0ZSIsIl9yZWYiLCJfcmVmMSIsIl9yZXBsYWNlU3RhdGUiLCJfX3NsaWNlIiwiX19oYXNQcm9wIiwiaGFzT3duUHJvcGVydHkiLCJfX2V4dGVuZHMiLCJjaGlsZCIsImN0b3IiLCJfX3N1cGVyX18iLCJfX2luZGV4T2YiLCJpbmRleE9mIiwiY2F0Y2h1cFRpbWUiLCJpbml0aWFsUmF0ZSIsIm1pblRpbWUiLCJnaG9zdFRpbWUiLCJtYXhQcm9ncmVzc1BlckZyYW1lIiwiZWFzZUZhY3RvciIsInN0YXJ0T25QYWdlTG9hZCIsInJlc3RhcnRPblB1c2hTdGF0ZSIsInJlc3RhcnRPblJlcXVlc3RBZnRlciIsImVsZW1lbnRzIiwiY2hlY2tJbnRlcnZhbCIsImV2ZW50TGFnIiwibWluU2FtcGxlcyIsInNhbXBsZUNvdW50IiwibGFnVGhyZXNob2xkIiwiYWpheCIsInRyYWNrTWV0aG9kcyIsInRyYWNrV2ViU29ja2V0cyIsImlnbm9yZVVSTHMiLCJwZXJmb3JtYW5jZSIsIm1velJlcXVlc3RBbmltYXRpb25GcmFtZSIsIndlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZSIsIm1zUmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwibW96Q2FuY2VsQW5pbWF0aW9uRnJhbWUiLCJsYXN0IiwidGljayIsImRpZmYiLCJhcmdzIiwib3V0IiwiYXJyIiwiY291bnQiLCJzdW0iLCJ2IiwianNvbiIsInF1ZXJ5U2VsZWN0b3IiLCJnZXRBdHRyaWJ1dGUiLCJKU09OIiwicGFyc2UiLCJfZXJyb3IiLCJjb25zb2xlIiwiY3R4Iiwib25jZSIsIl9iYXNlIiwiYmluZGluZ3MiLCJfcmVzdWx0cyIsInNwbGljZSIsInBhY2VPcHRpb25zIiwiX3N1cGVyIiwicHJvZ3Jlc3MiLCJnZXRFbGVtZW50IiwidGFyZ2V0RWxlbWVudCIsImlubmVySFRNTCIsImZpcnN0Q2hpbGQiLCJpbnNlcnRCZWZvcmUiLCJhcHBlbmRDaGlsZCIsImZpbmlzaCIsInVwZGF0ZSIsInByb2ciLCJyZW5kZXIiLCJwYXJlbnROb2RlIiwicHJvZ3Jlc3NTdHIiLCJ0cmFuc2Zvcm0iLCJfaiIsIl9sZW4xIiwiX3JlZjIiLCJsYXN0UmVuZGVyZWRQcm9ncmVzcyIsInNldEF0dHJpYnV0ZSIsImRvbmUiLCJiaW5kaW5nIiwiWE1MSHR0cFJlcXVlc3QiLCJYRG9tYWluUmVxdWVzdCIsIldlYlNvY2tldCIsImZyb20iLCJpZ25vcmUiLCJyZXQiLCJ1bnNoaWZ0Iiwic2hpZnQiLCJ0cmFjayIsIm1vbml0b3JYSFIiLCJyZXEiLCJfb3BlbiIsInVybCIsImFzeW5jIiwicmVxdWVzdCIsImZsYWdzIiwicHJvdG9jb2xzIiwiX2FyZyIsImFmdGVyIiwicnVubmluZyIsInN0aWxsQWN0aXZlIiwiX3JlZjMiLCJyZWFkeVN0YXRlIiwicmVzdGFydCIsIndhdGNoIiwidHJhY2tlciIsInNpemUiLCJfb25yZWFkeXN0YXRlY2hhbmdlIiwiUHJvZ3Jlc3NFdmVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJldnQiLCJsZW5ndGhDb21wdXRhYmxlIiwibG9hZGVkIiwidG90YWwiLCJvbnJlYWR5c3RhdGVjaGFuZ2UiLCJjaGVjayIsInN0YXRlcyIsImxvYWRpbmciLCJpbnRlcmFjdGl2ZSIsImF2ZyIsInBvaW50cyIsInNhbXBsZXMiLCJzaW5jZUxhc3RVcGRhdGUiLCJyYXRlIiwiY2F0Y2h1cCIsImxhc3RQcm9ncmVzcyIsImZyYW1lVGltZSIsInNjYWxpbmciLCJwb3ciLCJtaW4iLCJoaXN0b3J5IiwicHVzaFN0YXRlIiwicmVwbGFjZVN0YXRlIiwiX2siLCJfbGVuMiIsIl9yZWY0IiwiZXh0cmFTb3VyY2VzIiwic3RvcCIsInN0YXJ0IiwiZ28iLCJlbnF1ZXVlTmV4dEZyYW1lIiwiaiIsInJlbWFpbmluZyIsInNjYWxlciIsInNjYWxlckxpc3QiLCJkZWZpbmUiLCJhbWQiLCJleHBvcnRzIiwibW9kdWxlIiwiJGhlYWRlcnMiLCIkZHJvcGRvd25zX2xpbmsiLCIkaGVhZGVyIiwiJGxpc3RfaXRlbXMiLCIkbGlzdF9pdGVtIiwiJGRyb3Bkb3duX21lbnUiLCJfZmxleHlfbmF2aWdhdGlvbl9zZXRfZHJvcGRvd25fbWVudV9oZWlnaHQiLCIkZHJvcGRvd25fbWVudXMiLCJ0YWxsZXN0X2Ryb3Bkb3duIiwiTW9kZXJuaXpyIiwidG91Y2hldmVudHMiLCIkY2hlY2tib3hlcyJdLCJt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QyxFQUExQixDQUE2QixPQUE3QixFQUFzQyxVQUFTZixLQUFULEVBQWdCO0FBQ2xELFlBQUkrQyxXQUFXMUUsRUFBRSxJQUFGLENBQWY7O0FBRUEwRSxpQkFBU2tTLE9BQVQsQ0FBaUIsY0FBakIsRUFBaUNoUixXQUFqQyxDQUE2QyxTQUE3QztBQUNILEtBSkQ7O0FBTUE7QUFDQSxRQUFJK29CLGNBQWMzdUIsRUFBRSxnREFBRixDQUFsQjs7QUFFQTJ1QixnQkFBWTNxQixJQUFaLENBQWlCLFVBQVN5RCxLQUFULEVBQWdCSCxJQUFoQixFQUFzQjtBQUNuQyxZQUFJNUMsV0FBVzFFLEVBQUUsSUFBRixDQUFmO0FBQUEsWUFDSW1ELFVBQVV1QixTQUFTa1MsT0FBVCxDQUFpQix5QkFBakIsQ0FEZDs7QUFHQTtBQUNBLFlBQUlsUyxTQUFTdkMsRUFBVCxDQUFZLFVBQVosQ0FBSixFQUE2QjtBQUN6QmdCLG9CQUFRa0MsUUFBUixDQUFpQixZQUFqQjtBQUNILFNBRkQsTUFFTztBQUNIbEMsb0JBQVFNLFdBQVIsQ0FBb0IsWUFBcEI7QUFDSDs7QUFFRDtBQUNBaUIsaUJBQVNoQyxFQUFULENBQVksUUFBWixFQUFzQixVQUFTZixLQUFULEVBQWdCO0FBQ2xDLGdCQUFJK0MsV0FBVzFFLEVBQUUsSUFBRixDQUFmO0FBQUEsZ0JBQ0ltRCxVQUFVdUIsU0FBU2tTLE9BQVQsQ0FBaUIseUJBQWpCLENBRGQ7O0FBR0EsZ0JBQUlsUyxTQUFTdkMsRUFBVCxDQUFZLFVBQVosQ0FBSixFQUE2QjtBQUN6QmdCLHdCQUFRa0MsUUFBUixDQUFpQixZQUFqQjtBQUNILGFBRkQsTUFFTztBQUNIbEMsd0JBQVFNLFdBQVIsQ0FBb0IsWUFBcEI7QUFDSDtBQUNKLFNBVEQ7QUFVSCxLQXRCRDtBQXVCSCxDQWxFRCIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiFcbiAqIEJvb3RzdHJhcCB2My4zLjcgKGh0dHA6Ly9nZXRib290c3RyYXAuY29tKVxuICogQ29weXJpZ2h0IDIwMTEtMjAxNiBUd2l0dGVyLCBJbmMuXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2VcbiAqL1xuXG5pZiAodHlwZW9mIGpRdWVyeSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgdGhyb3cgbmV3IEVycm9yKCdCb290c3RyYXBcXCdzIEphdmFTY3JpcHQgcmVxdWlyZXMgalF1ZXJ5Jylcbn1cblxuK2Z1bmN0aW9uICgkKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgdmFyIHZlcnNpb24gPSAkLmZuLmpxdWVyeS5zcGxpdCgnICcpWzBdLnNwbGl0KCcuJylcbiAgaWYgKCh2ZXJzaW9uWzBdIDwgMiAmJiB2ZXJzaW9uWzFdIDwgOSkgfHwgKHZlcnNpb25bMF0gPT0gMSAmJiB2ZXJzaW9uWzFdID09IDkgJiYgdmVyc2lvblsyXSA8IDEpIHx8ICh2ZXJzaW9uWzBdID4gMykpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0Jvb3RzdHJhcFxcJ3MgSmF2YVNjcmlwdCByZXF1aXJlcyBqUXVlcnkgdmVyc2lvbiAxLjkuMSBvciBoaWdoZXIsIGJ1dCBsb3dlciB0aGFuIHZlcnNpb24gNCcpXG4gIH1cbn0oalF1ZXJ5KTtcblxuLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKiBCb290c3RyYXA6IHRyYW5zaXRpb24uanMgdjMuMy43XG4gKiBodHRwOi8vZ2V0Ym9vdHN0cmFwLmNvbS9qYXZhc2NyaXB0LyN0cmFuc2l0aW9uc1xuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKiBDb3B5cmlnaHQgMjAxMS0yMDE2IFR3aXR0ZXIsIEluYy5cbiAqIExpY2Vuc2VkIHVuZGVyIE1JVCAoaHR0cHM6Ly9naXRodWIuY29tL3R3YnMvYm9vdHN0cmFwL2Jsb2IvbWFzdGVyL0xJQ0VOU0UpXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuXG4rZnVuY3Rpb24gKCQpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIC8vIENTUyBUUkFOU0lUSU9OIFNVUFBPUlQgKFNob3V0b3V0OiBodHRwOi8vd3d3Lm1vZGVybml6ci5jb20vKVxuICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuICBmdW5jdGlvbiB0cmFuc2l0aW9uRW5kKCkge1xuICAgIHZhciBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2Jvb3RzdHJhcCcpXG5cbiAgICB2YXIgdHJhbnNFbmRFdmVudE5hbWVzID0ge1xuICAgICAgV2Via2l0VHJhbnNpdGlvbiA6ICd3ZWJraXRUcmFuc2l0aW9uRW5kJyxcbiAgICAgIE1velRyYW5zaXRpb24gICAgOiAndHJhbnNpdGlvbmVuZCcsXG4gICAgICBPVHJhbnNpdGlvbiAgICAgIDogJ29UcmFuc2l0aW9uRW5kIG90cmFuc2l0aW9uZW5kJyxcbiAgICAgIHRyYW5zaXRpb24gICAgICAgOiAndHJhbnNpdGlvbmVuZCdcbiAgICB9XG5cbiAgICBmb3IgKHZhciBuYW1lIGluIHRyYW5zRW5kRXZlbnROYW1lcykge1xuICAgICAgaWYgKGVsLnN0eWxlW25hbWVdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIHsgZW5kOiB0cmFuc0VuZEV2ZW50TmFtZXNbbmFtZV0gfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBmYWxzZSAvLyBleHBsaWNpdCBmb3IgaWU4ICggIC5fLilcbiAgfVxuXG4gIC8vIGh0dHA6Ly9ibG9nLmFsZXhtYWNjYXcuY29tL2Nzcy10cmFuc2l0aW9uc1xuICAkLmZuLmVtdWxhdGVUcmFuc2l0aW9uRW5kID0gZnVuY3Rpb24gKGR1cmF0aW9uKSB7XG4gICAgdmFyIGNhbGxlZCA9IGZhbHNlXG4gICAgdmFyICRlbCA9IHRoaXNcbiAgICAkKHRoaXMpLm9uZSgnYnNUcmFuc2l0aW9uRW5kJywgZnVuY3Rpb24gKCkgeyBjYWxsZWQgPSB0cnVlIH0pXG4gICAgdmFyIGNhbGxiYWNrID0gZnVuY3Rpb24gKCkgeyBpZiAoIWNhbGxlZCkgJCgkZWwpLnRyaWdnZXIoJC5zdXBwb3J0LnRyYW5zaXRpb24uZW5kKSB9XG4gICAgc2V0VGltZW91dChjYWxsYmFjaywgZHVyYXRpb24pXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gICQoZnVuY3Rpb24gKCkge1xuICAgICQuc3VwcG9ydC50cmFuc2l0aW9uID0gdHJhbnNpdGlvbkVuZCgpXG5cbiAgICBpZiAoISQuc3VwcG9ydC50cmFuc2l0aW9uKSByZXR1cm5cblxuICAgICQuZXZlbnQuc3BlY2lhbC5ic1RyYW5zaXRpb25FbmQgPSB7XG4gICAgICBiaW5kVHlwZTogJC5zdXBwb3J0LnRyYW5zaXRpb24uZW5kLFxuICAgICAgZGVsZWdhdGVUeXBlOiAkLnN1cHBvcnQudHJhbnNpdGlvbi5lbmQsXG4gICAgICBoYW5kbGU6IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGlmICgkKGUudGFyZ2V0KS5pcyh0aGlzKSkgcmV0dXJuIGUuaGFuZGxlT2JqLmhhbmRsZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKVxuICAgICAgfVxuICAgIH1cbiAgfSlcblxufShqUXVlcnkpO1xuXG4vKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqIEJvb3RzdHJhcDogYWxlcnQuanMgdjMuMy43XG4gKiBodHRwOi8vZ2V0Ym9vdHN0cmFwLmNvbS9qYXZhc2NyaXB0LyNhbGVydHNcbiAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICogQ29weXJpZ2h0IDIwMTEtMjAxNiBUd2l0dGVyLCBJbmMuXG4gKiBMaWNlbnNlZCB1bmRlciBNSVQgKGh0dHBzOi8vZ2l0aHViLmNvbS90d2JzL2Jvb3RzdHJhcC9ibG9iL21hc3Rlci9MSUNFTlNFKVxuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5cblxuK2Z1bmN0aW9uICgkKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICAvLyBBTEVSVCBDTEFTUyBERUZJTklUSU9OXG4gIC8vID09PT09PT09PT09PT09PT09PT09PT1cblxuICB2YXIgZGlzbWlzcyA9ICdbZGF0YS1kaXNtaXNzPVwiYWxlcnRcIl0nXG4gIHZhciBBbGVydCAgID0gZnVuY3Rpb24gKGVsKSB7XG4gICAgJChlbCkub24oJ2NsaWNrJywgZGlzbWlzcywgdGhpcy5jbG9zZSlcbiAgfVxuXG4gIEFsZXJ0LlZFUlNJT04gPSAnMy4zLjcnXG5cbiAgQWxlcnQuVFJBTlNJVElPTl9EVVJBVElPTiA9IDE1MFxuXG4gIEFsZXJ0LnByb3RvdHlwZS5jbG9zZSA9IGZ1bmN0aW9uIChlKSB7XG4gICAgdmFyICR0aGlzICAgID0gJCh0aGlzKVxuICAgIHZhciBzZWxlY3RvciA9ICR0aGlzLmF0dHIoJ2RhdGEtdGFyZ2V0JylcblxuICAgIGlmICghc2VsZWN0b3IpIHtcbiAgICAgIHNlbGVjdG9yID0gJHRoaXMuYXR0cignaHJlZicpXG4gICAgICBzZWxlY3RvciA9IHNlbGVjdG9yICYmIHNlbGVjdG9yLnJlcGxhY2UoLy4qKD89I1teXFxzXSokKS8sICcnKSAvLyBzdHJpcCBmb3IgaWU3XG4gICAgfVxuXG4gICAgdmFyICRwYXJlbnQgPSAkKHNlbGVjdG9yID09PSAnIycgPyBbXSA6IHNlbGVjdG9yKVxuXG4gICAgaWYgKGUpIGUucHJldmVudERlZmF1bHQoKVxuXG4gICAgaWYgKCEkcGFyZW50Lmxlbmd0aCkge1xuICAgICAgJHBhcmVudCA9ICR0aGlzLmNsb3Nlc3QoJy5hbGVydCcpXG4gICAgfVxuXG4gICAgJHBhcmVudC50cmlnZ2VyKGUgPSAkLkV2ZW50KCdjbG9zZS5icy5hbGVydCcpKVxuXG4gICAgaWYgKGUuaXNEZWZhdWx0UHJldmVudGVkKCkpIHJldHVyblxuXG4gICAgJHBhcmVudC5yZW1vdmVDbGFzcygnaW4nKVxuXG4gICAgZnVuY3Rpb24gcmVtb3ZlRWxlbWVudCgpIHtcbiAgICAgIC8vIGRldGFjaCBmcm9tIHBhcmVudCwgZmlyZSBldmVudCB0aGVuIGNsZWFuIHVwIGRhdGFcbiAgICAgICRwYXJlbnQuZGV0YWNoKCkudHJpZ2dlcignY2xvc2VkLmJzLmFsZXJ0JykucmVtb3ZlKClcbiAgICB9XG5cbiAgICAkLnN1cHBvcnQudHJhbnNpdGlvbiAmJiAkcGFyZW50Lmhhc0NsYXNzKCdmYWRlJykgP1xuICAgICAgJHBhcmVudFxuICAgICAgICAub25lKCdic1RyYW5zaXRpb25FbmQnLCByZW1vdmVFbGVtZW50KVxuICAgICAgICAuZW11bGF0ZVRyYW5zaXRpb25FbmQoQWxlcnQuVFJBTlNJVElPTl9EVVJBVElPTikgOlxuICAgICAgcmVtb3ZlRWxlbWVudCgpXG4gIH1cblxuXG4gIC8vIEFMRVJUIFBMVUdJTiBERUZJTklUSU9OXG4gIC8vID09PT09PT09PT09PT09PT09PT09PT09XG5cbiAgZnVuY3Rpb24gUGx1Z2luKG9wdGlvbikge1xuICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgdmFyICR0aGlzID0gJCh0aGlzKVxuICAgICAgdmFyIGRhdGEgID0gJHRoaXMuZGF0YSgnYnMuYWxlcnQnKVxuXG4gICAgICBpZiAoIWRhdGEpICR0aGlzLmRhdGEoJ2JzLmFsZXJ0JywgKGRhdGEgPSBuZXcgQWxlcnQodGhpcykpKVxuICAgICAgaWYgKHR5cGVvZiBvcHRpb24gPT0gJ3N0cmluZycpIGRhdGFbb3B0aW9uXS5jYWxsKCR0aGlzKVxuICAgIH0pXG4gIH1cblxuICB2YXIgb2xkID0gJC5mbi5hbGVydFxuXG4gICQuZm4uYWxlcnQgICAgICAgICAgICAgPSBQbHVnaW5cbiAgJC5mbi5hbGVydC5Db25zdHJ1Y3RvciA9IEFsZXJ0XG5cblxuICAvLyBBTEVSVCBOTyBDT05GTElDVFxuICAvLyA9PT09PT09PT09PT09PT09PVxuXG4gICQuZm4uYWxlcnQubm9Db25mbGljdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAkLmZuLmFsZXJ0ID0gb2xkXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG5cbiAgLy8gQUxFUlQgREFUQS1BUElcbiAgLy8gPT09PT09PT09PT09PT1cblxuICAkKGRvY3VtZW50KS5vbignY2xpY2suYnMuYWxlcnQuZGF0YS1hcGknLCBkaXNtaXNzLCBBbGVydC5wcm90b3R5cGUuY2xvc2UpXG5cbn0oalF1ZXJ5KTtcblxuLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKiBCb290c3RyYXA6IGJ1dHRvbi5qcyB2My4zLjdcbiAqIGh0dHA6Ly9nZXRib290c3RyYXAuY29tL2phdmFzY3JpcHQvI2J1dHRvbnNcbiAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICogQ29weXJpZ2h0IDIwMTEtMjAxNiBUd2l0dGVyLCBJbmMuXG4gKiBMaWNlbnNlZCB1bmRlciBNSVQgKGh0dHBzOi8vZ2l0aHViLmNvbS90d2JzL2Jvb3RzdHJhcC9ibG9iL21hc3Rlci9MSUNFTlNFKVxuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5cblxuK2Z1bmN0aW9uICgkKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICAvLyBCVVRUT04gUFVCTElDIENMQVNTIERFRklOSVRJT05cbiAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbiAgdmFyIEJ1dHRvbiA9IGZ1bmN0aW9uIChlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgdGhpcy4kZWxlbWVudCAgPSAkKGVsZW1lbnQpXG4gICAgdGhpcy5vcHRpb25zICAgPSAkLmV4dGVuZCh7fSwgQnV0dG9uLkRFRkFVTFRTLCBvcHRpb25zKVxuICAgIHRoaXMuaXNMb2FkaW5nID0gZmFsc2VcbiAgfVxuXG4gIEJ1dHRvbi5WRVJTSU9OICA9ICczLjMuNydcblxuICBCdXR0b24uREVGQVVMVFMgPSB7XG4gICAgbG9hZGluZ1RleHQ6ICdsb2FkaW5nLi4uJ1xuICB9XG5cbiAgQnV0dG9uLnByb3RvdHlwZS5zZXRTdGF0ZSA9IGZ1bmN0aW9uIChzdGF0ZSkge1xuICAgIHZhciBkICAgID0gJ2Rpc2FibGVkJ1xuICAgIHZhciAkZWwgID0gdGhpcy4kZWxlbWVudFxuICAgIHZhciB2YWwgID0gJGVsLmlzKCdpbnB1dCcpID8gJ3ZhbCcgOiAnaHRtbCdcbiAgICB2YXIgZGF0YSA9ICRlbC5kYXRhKClcblxuICAgIHN0YXRlICs9ICdUZXh0J1xuXG4gICAgaWYgKGRhdGEucmVzZXRUZXh0ID09IG51bGwpICRlbC5kYXRhKCdyZXNldFRleHQnLCAkZWxbdmFsXSgpKVxuXG4gICAgLy8gcHVzaCB0byBldmVudCBsb29wIHRvIGFsbG93IGZvcm1zIHRvIHN1Ym1pdFxuICAgIHNldFRpbWVvdXQoJC5wcm94eShmdW5jdGlvbiAoKSB7XG4gICAgICAkZWxbdmFsXShkYXRhW3N0YXRlXSA9PSBudWxsID8gdGhpcy5vcHRpb25zW3N0YXRlXSA6IGRhdGFbc3RhdGVdKVxuXG4gICAgICBpZiAoc3RhdGUgPT0gJ2xvYWRpbmdUZXh0Jykge1xuICAgICAgICB0aGlzLmlzTG9hZGluZyA9IHRydWVcbiAgICAgICAgJGVsLmFkZENsYXNzKGQpLmF0dHIoZCwgZCkucHJvcChkLCB0cnVlKVxuICAgICAgfSBlbHNlIGlmICh0aGlzLmlzTG9hZGluZykge1xuICAgICAgICB0aGlzLmlzTG9hZGluZyA9IGZhbHNlXG4gICAgICAgICRlbC5yZW1vdmVDbGFzcyhkKS5yZW1vdmVBdHRyKGQpLnByb3AoZCwgZmFsc2UpXG4gICAgICB9XG4gICAgfSwgdGhpcyksIDApXG4gIH1cblxuICBCdXR0b24ucHJvdG90eXBlLnRvZ2dsZSA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgY2hhbmdlZCA9IHRydWVcbiAgICB2YXIgJHBhcmVudCA9IHRoaXMuJGVsZW1lbnQuY2xvc2VzdCgnW2RhdGEtdG9nZ2xlPVwiYnV0dG9uc1wiXScpXG5cbiAgICBpZiAoJHBhcmVudC5sZW5ndGgpIHtcbiAgICAgIHZhciAkaW5wdXQgPSB0aGlzLiRlbGVtZW50LmZpbmQoJ2lucHV0JylcbiAgICAgIGlmICgkaW5wdXQucHJvcCgndHlwZScpID09ICdyYWRpbycpIHtcbiAgICAgICAgaWYgKCRpbnB1dC5wcm9wKCdjaGVja2VkJykpIGNoYW5nZWQgPSBmYWxzZVxuICAgICAgICAkcGFyZW50LmZpbmQoJy5hY3RpdmUnKS5yZW1vdmVDbGFzcygnYWN0aXZlJylcbiAgICAgICAgdGhpcy4kZWxlbWVudC5hZGRDbGFzcygnYWN0aXZlJylcbiAgICAgIH0gZWxzZSBpZiAoJGlucHV0LnByb3AoJ3R5cGUnKSA9PSAnY2hlY2tib3gnKSB7XG4gICAgICAgIGlmICgoJGlucHV0LnByb3AoJ2NoZWNrZWQnKSkgIT09IHRoaXMuJGVsZW1lbnQuaGFzQ2xhc3MoJ2FjdGl2ZScpKSBjaGFuZ2VkID0gZmFsc2VcbiAgICAgICAgdGhpcy4kZWxlbWVudC50b2dnbGVDbGFzcygnYWN0aXZlJylcbiAgICAgIH1cbiAgICAgICRpbnB1dC5wcm9wKCdjaGVja2VkJywgdGhpcy4kZWxlbWVudC5oYXNDbGFzcygnYWN0aXZlJykpXG4gICAgICBpZiAoY2hhbmdlZCkgJGlucHV0LnRyaWdnZXIoJ2NoYW5nZScpXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuJGVsZW1lbnQuYXR0cignYXJpYS1wcmVzc2VkJywgIXRoaXMuJGVsZW1lbnQuaGFzQ2xhc3MoJ2FjdGl2ZScpKVxuICAgICAgdGhpcy4kZWxlbWVudC50b2dnbGVDbGFzcygnYWN0aXZlJylcbiAgICB9XG4gIH1cblxuXG4gIC8vIEJVVFRPTiBQTFVHSU4gREVGSU5JVElPTlxuICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT1cblxuICBmdW5jdGlvbiBQbHVnaW4ob3B0aW9uKSB7XG4gICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgJHRoaXMgICA9ICQodGhpcylcbiAgICAgIHZhciBkYXRhICAgID0gJHRoaXMuZGF0YSgnYnMuYnV0dG9uJylcbiAgICAgIHZhciBvcHRpb25zID0gdHlwZW9mIG9wdGlvbiA9PSAnb2JqZWN0JyAmJiBvcHRpb25cblxuICAgICAgaWYgKCFkYXRhKSAkdGhpcy5kYXRhKCdicy5idXR0b24nLCAoZGF0YSA9IG5ldyBCdXR0b24odGhpcywgb3B0aW9ucykpKVxuXG4gICAgICBpZiAob3B0aW9uID09ICd0b2dnbGUnKSBkYXRhLnRvZ2dsZSgpXG4gICAgICBlbHNlIGlmIChvcHRpb24pIGRhdGEuc2V0U3RhdGUob3B0aW9uKVxuICAgIH0pXG4gIH1cblxuICB2YXIgb2xkID0gJC5mbi5idXR0b25cblxuICAkLmZuLmJ1dHRvbiAgICAgICAgICAgICA9IFBsdWdpblxuICAkLmZuLmJ1dHRvbi5Db25zdHJ1Y3RvciA9IEJ1dHRvblxuXG5cbiAgLy8gQlVUVE9OIE5PIENPTkZMSUNUXG4gIC8vID09PT09PT09PT09PT09PT09PVxuXG4gICQuZm4uYnV0dG9uLm5vQ29uZmxpY3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgJC5mbi5idXR0b24gPSBvbGRcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cblxuICAvLyBCVVRUT04gREFUQS1BUElcbiAgLy8gPT09PT09PT09PT09PT09XG5cbiAgJChkb2N1bWVudClcbiAgICAub24oJ2NsaWNrLmJzLmJ1dHRvbi5kYXRhLWFwaScsICdbZGF0YS10b2dnbGVePVwiYnV0dG9uXCJdJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgIHZhciAkYnRuID0gJChlLnRhcmdldCkuY2xvc2VzdCgnLmJ0bicpXG4gICAgICBQbHVnaW4uY2FsbCgkYnRuLCAndG9nZ2xlJylcbiAgICAgIGlmICghKCQoZS50YXJnZXQpLmlzKCdpbnB1dFt0eXBlPVwicmFkaW9cIl0sIGlucHV0W3R5cGU9XCJjaGVja2JveFwiXScpKSkge1xuICAgICAgICAvLyBQcmV2ZW50IGRvdWJsZSBjbGljayBvbiByYWRpb3MsIGFuZCB0aGUgZG91YmxlIHNlbGVjdGlvbnMgKHNvIGNhbmNlbGxhdGlvbikgb24gY2hlY2tib3hlc1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgLy8gVGhlIHRhcmdldCBjb21wb25lbnQgc3RpbGwgcmVjZWl2ZSB0aGUgZm9jdXNcbiAgICAgICAgaWYgKCRidG4uaXMoJ2lucHV0LGJ1dHRvbicpKSAkYnRuLnRyaWdnZXIoJ2ZvY3VzJylcbiAgICAgICAgZWxzZSAkYnRuLmZpbmQoJ2lucHV0OnZpc2libGUsYnV0dG9uOnZpc2libGUnKS5maXJzdCgpLnRyaWdnZXIoJ2ZvY3VzJylcbiAgICAgIH1cbiAgICB9KVxuICAgIC5vbignZm9jdXMuYnMuYnV0dG9uLmRhdGEtYXBpIGJsdXIuYnMuYnV0dG9uLmRhdGEtYXBpJywgJ1tkYXRhLXRvZ2dsZV49XCJidXR0b25cIl0nLCBmdW5jdGlvbiAoZSkge1xuICAgICAgJChlLnRhcmdldCkuY2xvc2VzdCgnLmJ0bicpLnRvZ2dsZUNsYXNzKCdmb2N1cycsIC9eZm9jdXMoaW4pPyQvLnRlc3QoZS50eXBlKSlcbiAgICB9KVxuXG59KGpRdWVyeSk7XG5cbi8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICogQm9vdHN0cmFwOiBjYXJvdXNlbC5qcyB2My4zLjdcbiAqIGh0dHA6Ly9nZXRib290c3RyYXAuY29tL2phdmFzY3JpcHQvI2Nhcm91c2VsXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqIENvcHlyaWdodCAyMDExLTIwMTYgVHdpdHRlciwgSW5jLlxuICogTGljZW5zZWQgdW5kZXIgTUlUIChodHRwczovL2dpdGh1Yi5jb20vdHdicy9ib290c3RyYXAvYmxvYi9tYXN0ZXIvTElDRU5TRSlcbiAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXG5cbitmdW5jdGlvbiAoJCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgLy8gQ0FST1VTRUwgQ0xBU1MgREVGSU5JVElPTlxuICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09XG5cbiAgdmFyIENhcm91c2VsID0gZnVuY3Rpb24gKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICB0aGlzLiRlbGVtZW50ICAgID0gJChlbGVtZW50KVxuICAgIHRoaXMuJGluZGljYXRvcnMgPSB0aGlzLiRlbGVtZW50LmZpbmQoJy5jYXJvdXNlbC1pbmRpY2F0b3JzJylcbiAgICB0aGlzLm9wdGlvbnMgICAgID0gb3B0aW9uc1xuICAgIHRoaXMucGF1c2VkICAgICAgPSBudWxsXG4gICAgdGhpcy5zbGlkaW5nICAgICA9IG51bGxcbiAgICB0aGlzLmludGVydmFsICAgID0gbnVsbFxuICAgIHRoaXMuJGFjdGl2ZSAgICAgPSBudWxsXG4gICAgdGhpcy4kaXRlbXMgICAgICA9IG51bGxcblxuICAgIHRoaXMub3B0aW9ucy5rZXlib2FyZCAmJiB0aGlzLiRlbGVtZW50Lm9uKCdrZXlkb3duLmJzLmNhcm91c2VsJywgJC5wcm94eSh0aGlzLmtleWRvd24sIHRoaXMpKVxuXG4gICAgdGhpcy5vcHRpb25zLnBhdXNlID09ICdob3ZlcicgJiYgISgnb250b3VjaHN0YXJ0JyBpbiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQpICYmIHRoaXMuJGVsZW1lbnRcbiAgICAgIC5vbignbW91c2VlbnRlci5icy5jYXJvdXNlbCcsICQucHJveHkodGhpcy5wYXVzZSwgdGhpcykpXG4gICAgICAub24oJ21vdXNlbGVhdmUuYnMuY2Fyb3VzZWwnLCAkLnByb3h5KHRoaXMuY3ljbGUsIHRoaXMpKVxuICB9XG5cbiAgQ2Fyb3VzZWwuVkVSU0lPTiAgPSAnMy4zLjcnXG5cbiAgQ2Fyb3VzZWwuVFJBTlNJVElPTl9EVVJBVElPTiA9IDYwMFxuXG4gIENhcm91c2VsLkRFRkFVTFRTID0ge1xuICAgIGludGVydmFsOiA1MDAwLFxuICAgIHBhdXNlOiAnaG92ZXInLFxuICAgIHdyYXA6IHRydWUsXG4gICAga2V5Ym9hcmQ6IHRydWVcbiAgfVxuXG4gIENhcm91c2VsLnByb3RvdHlwZS5rZXlkb3duID0gZnVuY3Rpb24gKGUpIHtcbiAgICBpZiAoL2lucHV0fHRleHRhcmVhL2kudGVzdChlLnRhcmdldC50YWdOYW1lKSkgcmV0dXJuXG4gICAgc3dpdGNoIChlLndoaWNoKSB7XG4gICAgICBjYXNlIDM3OiB0aGlzLnByZXYoKTsgYnJlYWtcbiAgICAgIGNhc2UgMzk6IHRoaXMubmV4dCgpOyBicmVha1xuICAgICAgZGVmYXVsdDogcmV0dXJuXG4gICAgfVxuXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gIH1cblxuICBDYXJvdXNlbC5wcm90b3R5cGUuY3ljbGUgPSBmdW5jdGlvbiAoZSkge1xuICAgIGUgfHwgKHRoaXMucGF1c2VkID0gZmFsc2UpXG5cbiAgICB0aGlzLmludGVydmFsICYmIGNsZWFySW50ZXJ2YWwodGhpcy5pbnRlcnZhbClcblxuICAgIHRoaXMub3B0aW9ucy5pbnRlcnZhbFxuICAgICAgJiYgIXRoaXMucGF1c2VkXG4gICAgICAmJiAodGhpcy5pbnRlcnZhbCA9IHNldEludGVydmFsKCQucHJveHkodGhpcy5uZXh0LCB0aGlzKSwgdGhpcy5vcHRpb25zLmludGVydmFsKSlcblxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICBDYXJvdXNlbC5wcm90b3R5cGUuZ2V0SXRlbUluZGV4ID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICB0aGlzLiRpdGVtcyA9IGl0ZW0ucGFyZW50KCkuY2hpbGRyZW4oJy5pdGVtJylcbiAgICByZXR1cm4gdGhpcy4kaXRlbXMuaW5kZXgoaXRlbSB8fCB0aGlzLiRhY3RpdmUpXG4gIH1cblxuICBDYXJvdXNlbC5wcm90b3R5cGUuZ2V0SXRlbUZvckRpcmVjdGlvbiA9IGZ1bmN0aW9uIChkaXJlY3Rpb24sIGFjdGl2ZSkge1xuICAgIHZhciBhY3RpdmVJbmRleCA9IHRoaXMuZ2V0SXRlbUluZGV4KGFjdGl2ZSlcbiAgICB2YXIgd2lsbFdyYXAgPSAoZGlyZWN0aW9uID09ICdwcmV2JyAmJiBhY3RpdmVJbmRleCA9PT0gMClcbiAgICAgICAgICAgICAgICB8fCAoZGlyZWN0aW9uID09ICduZXh0JyAmJiBhY3RpdmVJbmRleCA9PSAodGhpcy4kaXRlbXMubGVuZ3RoIC0gMSkpXG4gICAgaWYgKHdpbGxXcmFwICYmICF0aGlzLm9wdGlvbnMud3JhcCkgcmV0dXJuIGFjdGl2ZVxuICAgIHZhciBkZWx0YSA9IGRpcmVjdGlvbiA9PSAncHJldicgPyAtMSA6IDFcbiAgICB2YXIgaXRlbUluZGV4ID0gKGFjdGl2ZUluZGV4ICsgZGVsdGEpICUgdGhpcy4kaXRlbXMubGVuZ3RoXG4gICAgcmV0dXJuIHRoaXMuJGl0ZW1zLmVxKGl0ZW1JbmRleClcbiAgfVxuXG4gIENhcm91c2VsLnByb3RvdHlwZS50byA9IGZ1bmN0aW9uIChwb3MpIHtcbiAgICB2YXIgdGhhdCAgICAgICAgPSB0aGlzXG4gICAgdmFyIGFjdGl2ZUluZGV4ID0gdGhpcy5nZXRJdGVtSW5kZXgodGhpcy4kYWN0aXZlID0gdGhpcy4kZWxlbWVudC5maW5kKCcuaXRlbS5hY3RpdmUnKSlcblxuICAgIGlmIChwb3MgPiAodGhpcy4kaXRlbXMubGVuZ3RoIC0gMSkgfHwgcG9zIDwgMCkgcmV0dXJuXG5cbiAgICBpZiAodGhpcy5zbGlkaW5nKSAgICAgICByZXR1cm4gdGhpcy4kZWxlbWVudC5vbmUoJ3NsaWQuYnMuY2Fyb3VzZWwnLCBmdW5jdGlvbiAoKSB7IHRoYXQudG8ocG9zKSB9KSAvLyB5ZXMsIFwic2xpZFwiXG4gICAgaWYgKGFjdGl2ZUluZGV4ID09IHBvcykgcmV0dXJuIHRoaXMucGF1c2UoKS5jeWNsZSgpXG5cbiAgICByZXR1cm4gdGhpcy5zbGlkZShwb3MgPiBhY3RpdmVJbmRleCA/ICduZXh0JyA6ICdwcmV2JywgdGhpcy4kaXRlbXMuZXEocG9zKSlcbiAgfVxuXG4gIENhcm91c2VsLnByb3RvdHlwZS5wYXVzZSA9IGZ1bmN0aW9uIChlKSB7XG4gICAgZSB8fCAodGhpcy5wYXVzZWQgPSB0cnVlKVxuXG4gICAgaWYgKHRoaXMuJGVsZW1lbnQuZmluZCgnLm5leHQsIC5wcmV2JykubGVuZ3RoICYmICQuc3VwcG9ydC50cmFuc2l0aW9uKSB7XG4gICAgICB0aGlzLiRlbGVtZW50LnRyaWdnZXIoJC5zdXBwb3J0LnRyYW5zaXRpb24uZW5kKVxuICAgICAgdGhpcy5jeWNsZSh0cnVlKVxuICAgIH1cblxuICAgIHRoaXMuaW50ZXJ2YWwgPSBjbGVhckludGVydmFsKHRoaXMuaW50ZXJ2YWwpXG5cbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgQ2Fyb3VzZWwucHJvdG90eXBlLm5leHQgPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHRoaXMuc2xpZGluZykgcmV0dXJuXG4gICAgcmV0dXJuIHRoaXMuc2xpZGUoJ25leHQnKVxuICB9XG5cbiAgQ2Fyb3VzZWwucHJvdG90eXBlLnByZXYgPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHRoaXMuc2xpZGluZykgcmV0dXJuXG4gICAgcmV0dXJuIHRoaXMuc2xpZGUoJ3ByZXYnKVxuICB9XG5cbiAgQ2Fyb3VzZWwucHJvdG90eXBlLnNsaWRlID0gZnVuY3Rpb24gKHR5cGUsIG5leHQpIHtcbiAgICB2YXIgJGFjdGl2ZSAgID0gdGhpcy4kZWxlbWVudC5maW5kKCcuaXRlbS5hY3RpdmUnKVxuICAgIHZhciAkbmV4dCAgICAgPSBuZXh0IHx8IHRoaXMuZ2V0SXRlbUZvckRpcmVjdGlvbih0eXBlLCAkYWN0aXZlKVxuICAgIHZhciBpc0N5Y2xpbmcgPSB0aGlzLmludGVydmFsXG4gICAgdmFyIGRpcmVjdGlvbiA9IHR5cGUgPT0gJ25leHQnID8gJ2xlZnQnIDogJ3JpZ2h0J1xuICAgIHZhciB0aGF0ICAgICAgPSB0aGlzXG5cbiAgICBpZiAoJG5leHQuaGFzQ2xhc3MoJ2FjdGl2ZScpKSByZXR1cm4gKHRoaXMuc2xpZGluZyA9IGZhbHNlKVxuXG4gICAgdmFyIHJlbGF0ZWRUYXJnZXQgPSAkbmV4dFswXVxuICAgIHZhciBzbGlkZUV2ZW50ID0gJC5FdmVudCgnc2xpZGUuYnMuY2Fyb3VzZWwnLCB7XG4gICAgICByZWxhdGVkVGFyZ2V0OiByZWxhdGVkVGFyZ2V0LFxuICAgICAgZGlyZWN0aW9uOiBkaXJlY3Rpb25cbiAgICB9KVxuICAgIHRoaXMuJGVsZW1lbnQudHJpZ2dlcihzbGlkZUV2ZW50KVxuICAgIGlmIChzbGlkZUV2ZW50LmlzRGVmYXVsdFByZXZlbnRlZCgpKSByZXR1cm5cblxuICAgIHRoaXMuc2xpZGluZyA9IHRydWVcblxuICAgIGlzQ3ljbGluZyAmJiB0aGlzLnBhdXNlKClcblxuICAgIGlmICh0aGlzLiRpbmRpY2F0b3JzLmxlbmd0aCkge1xuICAgICAgdGhpcy4kaW5kaWNhdG9ycy5maW5kKCcuYWN0aXZlJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpXG4gICAgICB2YXIgJG5leHRJbmRpY2F0b3IgPSAkKHRoaXMuJGluZGljYXRvcnMuY2hpbGRyZW4oKVt0aGlzLmdldEl0ZW1JbmRleCgkbmV4dCldKVxuICAgICAgJG5leHRJbmRpY2F0b3IgJiYgJG5leHRJbmRpY2F0b3IuYWRkQ2xhc3MoJ2FjdGl2ZScpXG4gICAgfVxuXG4gICAgdmFyIHNsaWRFdmVudCA9ICQuRXZlbnQoJ3NsaWQuYnMuY2Fyb3VzZWwnLCB7IHJlbGF0ZWRUYXJnZXQ6IHJlbGF0ZWRUYXJnZXQsIGRpcmVjdGlvbjogZGlyZWN0aW9uIH0pIC8vIHllcywgXCJzbGlkXCJcbiAgICBpZiAoJC5zdXBwb3J0LnRyYW5zaXRpb24gJiYgdGhpcy4kZWxlbWVudC5oYXNDbGFzcygnc2xpZGUnKSkge1xuICAgICAgJG5leHQuYWRkQ2xhc3ModHlwZSlcbiAgICAgICRuZXh0WzBdLm9mZnNldFdpZHRoIC8vIGZvcmNlIHJlZmxvd1xuICAgICAgJGFjdGl2ZS5hZGRDbGFzcyhkaXJlY3Rpb24pXG4gICAgICAkbmV4dC5hZGRDbGFzcyhkaXJlY3Rpb24pXG4gICAgICAkYWN0aXZlXG4gICAgICAgIC5vbmUoJ2JzVHJhbnNpdGlvbkVuZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAkbmV4dC5yZW1vdmVDbGFzcyhbdHlwZSwgZGlyZWN0aW9uXS5qb2luKCcgJykpLmFkZENsYXNzKCdhY3RpdmUnKVxuICAgICAgICAgICRhY3RpdmUucmVtb3ZlQ2xhc3MoWydhY3RpdmUnLCBkaXJlY3Rpb25dLmpvaW4oJyAnKSlcbiAgICAgICAgICB0aGF0LnNsaWRpbmcgPSBmYWxzZVxuICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhhdC4kZWxlbWVudC50cmlnZ2VyKHNsaWRFdmVudClcbiAgICAgICAgICB9LCAwKVxuICAgICAgICB9KVxuICAgICAgICAuZW11bGF0ZVRyYW5zaXRpb25FbmQoQ2Fyb3VzZWwuVFJBTlNJVElPTl9EVVJBVElPTilcbiAgICB9IGVsc2Uge1xuICAgICAgJGFjdGl2ZS5yZW1vdmVDbGFzcygnYWN0aXZlJylcbiAgICAgICRuZXh0LmFkZENsYXNzKCdhY3RpdmUnKVxuICAgICAgdGhpcy5zbGlkaW5nID0gZmFsc2VcbiAgICAgIHRoaXMuJGVsZW1lbnQudHJpZ2dlcihzbGlkRXZlbnQpXG4gICAgfVxuXG4gICAgaXNDeWNsaW5nICYmIHRoaXMuY3ljbGUoKVxuXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG5cbiAgLy8gQ0FST1VTRUwgUExVR0lOIERFRklOSVRJT05cbiAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuICBmdW5jdGlvbiBQbHVnaW4ob3B0aW9uKSB7XG4gICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgJHRoaXMgICA9ICQodGhpcylcbiAgICAgIHZhciBkYXRhICAgID0gJHRoaXMuZGF0YSgnYnMuY2Fyb3VzZWwnKVxuICAgICAgdmFyIG9wdGlvbnMgPSAkLmV4dGVuZCh7fSwgQ2Fyb3VzZWwuREVGQVVMVFMsICR0aGlzLmRhdGEoKSwgdHlwZW9mIG9wdGlvbiA9PSAnb2JqZWN0JyAmJiBvcHRpb24pXG4gICAgICB2YXIgYWN0aW9uICA9IHR5cGVvZiBvcHRpb24gPT0gJ3N0cmluZycgPyBvcHRpb24gOiBvcHRpb25zLnNsaWRlXG5cbiAgICAgIGlmICghZGF0YSkgJHRoaXMuZGF0YSgnYnMuY2Fyb3VzZWwnLCAoZGF0YSA9IG5ldyBDYXJvdXNlbCh0aGlzLCBvcHRpb25zKSkpXG4gICAgICBpZiAodHlwZW9mIG9wdGlvbiA9PSAnbnVtYmVyJykgZGF0YS50byhvcHRpb24pXG4gICAgICBlbHNlIGlmIChhY3Rpb24pIGRhdGFbYWN0aW9uXSgpXG4gICAgICBlbHNlIGlmIChvcHRpb25zLmludGVydmFsKSBkYXRhLnBhdXNlKCkuY3ljbGUoKVxuICAgIH0pXG4gIH1cblxuICB2YXIgb2xkID0gJC5mbi5jYXJvdXNlbFxuXG4gICQuZm4uY2Fyb3VzZWwgICAgICAgICAgICAgPSBQbHVnaW5cbiAgJC5mbi5jYXJvdXNlbC5Db25zdHJ1Y3RvciA9IENhcm91c2VsXG5cblxuICAvLyBDQVJPVVNFTCBOTyBDT05GTElDVFxuICAvLyA9PT09PT09PT09PT09PT09PT09PVxuXG4gICQuZm4uY2Fyb3VzZWwubm9Db25mbGljdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAkLmZuLmNhcm91c2VsID0gb2xkXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG5cbiAgLy8gQ0FST1VTRUwgREFUQS1BUElcbiAgLy8gPT09PT09PT09PT09PT09PT1cblxuICB2YXIgY2xpY2tIYW5kbGVyID0gZnVuY3Rpb24gKGUpIHtcbiAgICB2YXIgaHJlZlxuICAgIHZhciAkdGhpcyAgID0gJCh0aGlzKVxuICAgIHZhciAkdGFyZ2V0ID0gJCgkdGhpcy5hdHRyKCdkYXRhLXRhcmdldCcpIHx8IChocmVmID0gJHRoaXMuYXR0cignaHJlZicpKSAmJiBocmVmLnJlcGxhY2UoLy4qKD89I1teXFxzXSskKS8sICcnKSkgLy8gc3RyaXAgZm9yIGllN1xuICAgIGlmICghJHRhcmdldC5oYXNDbGFzcygnY2Fyb3VzZWwnKSkgcmV0dXJuXG4gICAgdmFyIG9wdGlvbnMgPSAkLmV4dGVuZCh7fSwgJHRhcmdldC5kYXRhKCksICR0aGlzLmRhdGEoKSlcbiAgICB2YXIgc2xpZGVJbmRleCA9ICR0aGlzLmF0dHIoJ2RhdGEtc2xpZGUtdG8nKVxuICAgIGlmIChzbGlkZUluZGV4KSBvcHRpb25zLmludGVydmFsID0gZmFsc2VcblxuICAgIFBsdWdpbi5jYWxsKCR0YXJnZXQsIG9wdGlvbnMpXG5cbiAgICBpZiAoc2xpZGVJbmRleCkge1xuICAgICAgJHRhcmdldC5kYXRhKCdicy5jYXJvdXNlbCcpLnRvKHNsaWRlSW5kZXgpXG4gICAgfVxuXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gIH1cblxuICAkKGRvY3VtZW50KVxuICAgIC5vbignY2xpY2suYnMuY2Fyb3VzZWwuZGF0YS1hcGknLCAnW2RhdGEtc2xpZGVdJywgY2xpY2tIYW5kbGVyKVxuICAgIC5vbignY2xpY2suYnMuY2Fyb3VzZWwuZGF0YS1hcGknLCAnW2RhdGEtc2xpZGUtdG9dJywgY2xpY2tIYW5kbGVyKVxuXG4gICQod2luZG93KS5vbignbG9hZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAkKCdbZGF0YS1yaWRlPVwiY2Fyb3VzZWxcIl0nKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciAkY2Fyb3VzZWwgPSAkKHRoaXMpXG4gICAgICBQbHVnaW4uY2FsbCgkY2Fyb3VzZWwsICRjYXJvdXNlbC5kYXRhKCkpXG4gICAgfSlcbiAgfSlcblxufShqUXVlcnkpO1xuXG4vKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqIEJvb3RzdHJhcDogY29sbGFwc2UuanMgdjMuMy43XG4gKiBodHRwOi8vZ2V0Ym9vdHN0cmFwLmNvbS9qYXZhc2NyaXB0LyNjb2xsYXBzZVxuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKiBDb3B5cmlnaHQgMjAxMS0yMDE2IFR3aXR0ZXIsIEluYy5cbiAqIExpY2Vuc2VkIHVuZGVyIE1JVCAoaHR0cHM6Ly9naXRodWIuY29tL3R3YnMvYm9vdHN0cmFwL2Jsb2IvbWFzdGVyL0xJQ0VOU0UpXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuLyoganNoaW50IGxhdGVkZWY6IGZhbHNlICovXG5cbitmdW5jdGlvbiAoJCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgLy8gQ09MTEFQU0UgUFVCTElDIENMQVNTIERFRklOSVRJT05cbiAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuICB2YXIgQ29sbGFwc2UgPSBmdW5jdGlvbiAoZWxlbWVudCwgb3B0aW9ucykge1xuICAgIHRoaXMuJGVsZW1lbnQgICAgICA9ICQoZWxlbWVudClcbiAgICB0aGlzLm9wdGlvbnMgICAgICAgPSAkLmV4dGVuZCh7fSwgQ29sbGFwc2UuREVGQVVMVFMsIG9wdGlvbnMpXG4gICAgdGhpcy4kdHJpZ2dlciAgICAgID0gJCgnW2RhdGEtdG9nZ2xlPVwiY29sbGFwc2VcIl1baHJlZj1cIiMnICsgZWxlbWVudC5pZCArICdcIl0sJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAnW2RhdGEtdG9nZ2xlPVwiY29sbGFwc2VcIl1bZGF0YS10YXJnZXQ9XCIjJyArIGVsZW1lbnQuaWQgKyAnXCJdJylcbiAgICB0aGlzLnRyYW5zaXRpb25pbmcgPSBudWxsXG5cbiAgICBpZiAodGhpcy5vcHRpb25zLnBhcmVudCkge1xuICAgICAgdGhpcy4kcGFyZW50ID0gdGhpcy5nZXRQYXJlbnQoKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmFkZEFyaWFBbmRDb2xsYXBzZWRDbGFzcyh0aGlzLiRlbGVtZW50LCB0aGlzLiR0cmlnZ2VyKVxuICAgIH1cblxuICAgIGlmICh0aGlzLm9wdGlvbnMudG9nZ2xlKSB0aGlzLnRvZ2dsZSgpXG4gIH1cblxuICBDb2xsYXBzZS5WRVJTSU9OICA9ICczLjMuNydcblxuICBDb2xsYXBzZS5UUkFOU0lUSU9OX0RVUkFUSU9OID0gMzUwXG5cbiAgQ29sbGFwc2UuREVGQVVMVFMgPSB7XG4gICAgdG9nZ2xlOiB0cnVlXG4gIH1cblxuICBDb2xsYXBzZS5wcm90b3R5cGUuZGltZW5zaW9uID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBoYXNXaWR0aCA9IHRoaXMuJGVsZW1lbnQuaGFzQ2xhc3MoJ3dpZHRoJylcbiAgICByZXR1cm4gaGFzV2lkdGggPyAnd2lkdGgnIDogJ2hlaWdodCdcbiAgfVxuXG4gIENvbGxhcHNlLnByb3RvdHlwZS5zaG93ID0gZnVuY3Rpb24gKCkge1xuICAgIGlmICh0aGlzLnRyYW5zaXRpb25pbmcgfHwgdGhpcy4kZWxlbWVudC5oYXNDbGFzcygnaW4nKSkgcmV0dXJuXG5cbiAgICB2YXIgYWN0aXZlc0RhdGFcbiAgICB2YXIgYWN0aXZlcyA9IHRoaXMuJHBhcmVudCAmJiB0aGlzLiRwYXJlbnQuY2hpbGRyZW4oJy5wYW5lbCcpLmNoaWxkcmVuKCcuaW4sIC5jb2xsYXBzaW5nJylcblxuICAgIGlmIChhY3RpdmVzICYmIGFjdGl2ZXMubGVuZ3RoKSB7XG4gICAgICBhY3RpdmVzRGF0YSA9IGFjdGl2ZXMuZGF0YSgnYnMuY29sbGFwc2UnKVxuICAgICAgaWYgKGFjdGl2ZXNEYXRhICYmIGFjdGl2ZXNEYXRhLnRyYW5zaXRpb25pbmcpIHJldHVyblxuICAgIH1cblxuICAgIHZhciBzdGFydEV2ZW50ID0gJC5FdmVudCgnc2hvdy5icy5jb2xsYXBzZScpXG4gICAgdGhpcy4kZWxlbWVudC50cmlnZ2VyKHN0YXJ0RXZlbnQpXG4gICAgaWYgKHN0YXJ0RXZlbnQuaXNEZWZhdWx0UHJldmVudGVkKCkpIHJldHVyblxuXG4gICAgaWYgKGFjdGl2ZXMgJiYgYWN0aXZlcy5sZW5ndGgpIHtcbiAgICAgIFBsdWdpbi5jYWxsKGFjdGl2ZXMsICdoaWRlJylcbiAgICAgIGFjdGl2ZXNEYXRhIHx8IGFjdGl2ZXMuZGF0YSgnYnMuY29sbGFwc2UnLCBudWxsKVxuICAgIH1cblxuICAgIHZhciBkaW1lbnNpb24gPSB0aGlzLmRpbWVuc2lvbigpXG5cbiAgICB0aGlzLiRlbGVtZW50XG4gICAgICAucmVtb3ZlQ2xhc3MoJ2NvbGxhcHNlJylcbiAgICAgIC5hZGRDbGFzcygnY29sbGFwc2luZycpW2RpbWVuc2lvbl0oMClcbiAgICAgIC5hdHRyKCdhcmlhLWV4cGFuZGVkJywgdHJ1ZSlcblxuICAgIHRoaXMuJHRyaWdnZXJcbiAgICAgIC5yZW1vdmVDbGFzcygnY29sbGFwc2VkJylcbiAgICAgIC5hdHRyKCdhcmlhLWV4cGFuZGVkJywgdHJ1ZSlcblxuICAgIHRoaXMudHJhbnNpdGlvbmluZyA9IDFcblxuICAgIHZhciBjb21wbGV0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXMuJGVsZW1lbnRcbiAgICAgICAgLnJlbW92ZUNsYXNzKCdjb2xsYXBzaW5nJylcbiAgICAgICAgLmFkZENsYXNzKCdjb2xsYXBzZSBpbicpW2RpbWVuc2lvbl0oJycpXG4gICAgICB0aGlzLnRyYW5zaXRpb25pbmcgPSAwXG4gICAgICB0aGlzLiRlbGVtZW50XG4gICAgICAgIC50cmlnZ2VyKCdzaG93bi5icy5jb2xsYXBzZScpXG4gICAgfVxuXG4gICAgaWYgKCEkLnN1cHBvcnQudHJhbnNpdGlvbikgcmV0dXJuIGNvbXBsZXRlLmNhbGwodGhpcylcblxuICAgIHZhciBzY3JvbGxTaXplID0gJC5jYW1lbENhc2UoWydzY3JvbGwnLCBkaW1lbnNpb25dLmpvaW4oJy0nKSlcblxuICAgIHRoaXMuJGVsZW1lbnRcbiAgICAgIC5vbmUoJ2JzVHJhbnNpdGlvbkVuZCcsICQucHJveHkoY29tcGxldGUsIHRoaXMpKVxuICAgICAgLmVtdWxhdGVUcmFuc2l0aW9uRW5kKENvbGxhcHNlLlRSQU5TSVRJT05fRFVSQVRJT04pW2RpbWVuc2lvbl0odGhpcy4kZWxlbWVudFswXVtzY3JvbGxTaXplXSlcbiAgfVxuXG4gIENvbGxhcHNlLnByb3RvdHlwZS5oaWRlID0gZnVuY3Rpb24gKCkge1xuICAgIGlmICh0aGlzLnRyYW5zaXRpb25pbmcgfHwgIXRoaXMuJGVsZW1lbnQuaGFzQ2xhc3MoJ2luJykpIHJldHVyblxuXG4gICAgdmFyIHN0YXJ0RXZlbnQgPSAkLkV2ZW50KCdoaWRlLmJzLmNvbGxhcHNlJylcbiAgICB0aGlzLiRlbGVtZW50LnRyaWdnZXIoc3RhcnRFdmVudClcbiAgICBpZiAoc3RhcnRFdmVudC5pc0RlZmF1bHRQcmV2ZW50ZWQoKSkgcmV0dXJuXG5cbiAgICB2YXIgZGltZW5zaW9uID0gdGhpcy5kaW1lbnNpb24oKVxuXG4gICAgdGhpcy4kZWxlbWVudFtkaW1lbnNpb25dKHRoaXMuJGVsZW1lbnRbZGltZW5zaW9uXSgpKVswXS5vZmZzZXRIZWlnaHRcblxuICAgIHRoaXMuJGVsZW1lbnRcbiAgICAgIC5hZGRDbGFzcygnY29sbGFwc2luZycpXG4gICAgICAucmVtb3ZlQ2xhc3MoJ2NvbGxhcHNlIGluJylcbiAgICAgIC5hdHRyKCdhcmlhLWV4cGFuZGVkJywgZmFsc2UpXG5cbiAgICB0aGlzLiR0cmlnZ2VyXG4gICAgICAuYWRkQ2xhc3MoJ2NvbGxhcHNlZCcpXG4gICAgICAuYXR0cignYXJpYS1leHBhbmRlZCcsIGZhbHNlKVxuXG4gICAgdGhpcy50cmFuc2l0aW9uaW5nID0gMVxuXG4gICAgdmFyIGNvbXBsZXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgdGhpcy50cmFuc2l0aW9uaW5nID0gMFxuICAgICAgdGhpcy4kZWxlbWVudFxuICAgICAgICAucmVtb3ZlQ2xhc3MoJ2NvbGxhcHNpbmcnKVxuICAgICAgICAuYWRkQ2xhc3MoJ2NvbGxhcHNlJylcbiAgICAgICAgLnRyaWdnZXIoJ2hpZGRlbi5icy5jb2xsYXBzZScpXG4gICAgfVxuXG4gICAgaWYgKCEkLnN1cHBvcnQudHJhbnNpdGlvbikgcmV0dXJuIGNvbXBsZXRlLmNhbGwodGhpcylcblxuICAgIHRoaXMuJGVsZW1lbnRcbiAgICAgIFtkaW1lbnNpb25dKDApXG4gICAgICAub25lKCdic1RyYW5zaXRpb25FbmQnLCAkLnByb3h5KGNvbXBsZXRlLCB0aGlzKSlcbiAgICAgIC5lbXVsYXRlVHJhbnNpdGlvbkVuZChDb2xsYXBzZS5UUkFOU0lUSU9OX0RVUkFUSU9OKVxuICB9XG5cbiAgQ29sbGFwc2UucHJvdG90eXBlLnRvZ2dsZSA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzW3RoaXMuJGVsZW1lbnQuaGFzQ2xhc3MoJ2luJykgPyAnaGlkZScgOiAnc2hvdyddKClcbiAgfVxuXG4gIENvbGxhcHNlLnByb3RvdHlwZS5nZXRQYXJlbnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuICQodGhpcy5vcHRpb25zLnBhcmVudClcbiAgICAgIC5maW5kKCdbZGF0YS10b2dnbGU9XCJjb2xsYXBzZVwiXVtkYXRhLXBhcmVudD1cIicgKyB0aGlzLm9wdGlvbnMucGFyZW50ICsgJ1wiXScpXG4gICAgICAuZWFjaCgkLnByb3h5KGZ1bmN0aW9uIChpLCBlbGVtZW50KSB7XG4gICAgICAgIHZhciAkZWxlbWVudCA9ICQoZWxlbWVudClcbiAgICAgICAgdGhpcy5hZGRBcmlhQW5kQ29sbGFwc2VkQ2xhc3MoZ2V0VGFyZ2V0RnJvbVRyaWdnZXIoJGVsZW1lbnQpLCAkZWxlbWVudClcbiAgICAgIH0sIHRoaXMpKVxuICAgICAgLmVuZCgpXG4gIH1cblxuICBDb2xsYXBzZS5wcm90b3R5cGUuYWRkQXJpYUFuZENvbGxhcHNlZENsYXNzID0gZnVuY3Rpb24gKCRlbGVtZW50LCAkdHJpZ2dlcikge1xuICAgIHZhciBpc09wZW4gPSAkZWxlbWVudC5oYXNDbGFzcygnaW4nKVxuXG4gICAgJGVsZW1lbnQuYXR0cignYXJpYS1leHBhbmRlZCcsIGlzT3BlbilcbiAgICAkdHJpZ2dlclxuICAgICAgLnRvZ2dsZUNsYXNzKCdjb2xsYXBzZWQnLCAhaXNPcGVuKVxuICAgICAgLmF0dHIoJ2FyaWEtZXhwYW5kZWQnLCBpc09wZW4pXG4gIH1cblxuICBmdW5jdGlvbiBnZXRUYXJnZXRGcm9tVHJpZ2dlcigkdHJpZ2dlcikge1xuICAgIHZhciBocmVmXG4gICAgdmFyIHRhcmdldCA9ICR0cmlnZ2VyLmF0dHIoJ2RhdGEtdGFyZ2V0JylcbiAgICAgIHx8IChocmVmID0gJHRyaWdnZXIuYXR0cignaHJlZicpKSAmJiBocmVmLnJlcGxhY2UoLy4qKD89I1teXFxzXSskKS8sICcnKSAvLyBzdHJpcCBmb3IgaWU3XG5cbiAgICByZXR1cm4gJCh0YXJnZXQpXG4gIH1cblxuXG4gIC8vIENPTExBUFNFIFBMVUdJTiBERUZJTklUSU9OXG4gIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbiAgZnVuY3Rpb24gUGx1Z2luKG9wdGlvbikge1xuICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgdmFyICR0aGlzICAgPSAkKHRoaXMpXG4gICAgICB2YXIgZGF0YSAgICA9ICR0aGlzLmRhdGEoJ2JzLmNvbGxhcHNlJylcbiAgICAgIHZhciBvcHRpb25zID0gJC5leHRlbmQoe30sIENvbGxhcHNlLkRFRkFVTFRTLCAkdGhpcy5kYXRhKCksIHR5cGVvZiBvcHRpb24gPT0gJ29iamVjdCcgJiYgb3B0aW9uKVxuXG4gICAgICBpZiAoIWRhdGEgJiYgb3B0aW9ucy50b2dnbGUgJiYgL3Nob3d8aGlkZS8udGVzdChvcHRpb24pKSBvcHRpb25zLnRvZ2dsZSA9IGZhbHNlXG4gICAgICBpZiAoIWRhdGEpICR0aGlzLmRhdGEoJ2JzLmNvbGxhcHNlJywgKGRhdGEgPSBuZXcgQ29sbGFwc2UodGhpcywgb3B0aW9ucykpKVxuICAgICAgaWYgKHR5cGVvZiBvcHRpb24gPT0gJ3N0cmluZycpIGRhdGFbb3B0aW9uXSgpXG4gICAgfSlcbiAgfVxuXG4gIHZhciBvbGQgPSAkLmZuLmNvbGxhcHNlXG5cbiAgJC5mbi5jb2xsYXBzZSAgICAgICAgICAgICA9IFBsdWdpblxuICAkLmZuLmNvbGxhcHNlLkNvbnN0cnVjdG9yID0gQ29sbGFwc2VcblxuXG4gIC8vIENPTExBUFNFIE5PIENPTkZMSUNUXG4gIC8vID09PT09PT09PT09PT09PT09PT09XG5cbiAgJC5mbi5jb2xsYXBzZS5ub0NvbmZsaWN0ID0gZnVuY3Rpb24gKCkge1xuICAgICQuZm4uY29sbGFwc2UgPSBvbGRcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cblxuICAvLyBDT0xMQVBTRSBEQVRBLUFQSVxuICAvLyA9PT09PT09PT09PT09PT09PVxuXG4gICQoZG9jdW1lbnQpLm9uKCdjbGljay5icy5jb2xsYXBzZS5kYXRhLWFwaScsICdbZGF0YS10b2dnbGU9XCJjb2xsYXBzZVwiXScsIGZ1bmN0aW9uIChlKSB7XG4gICAgdmFyICR0aGlzICAgPSAkKHRoaXMpXG5cbiAgICBpZiAoISR0aGlzLmF0dHIoJ2RhdGEtdGFyZ2V0JykpIGUucHJldmVudERlZmF1bHQoKVxuXG4gICAgdmFyICR0YXJnZXQgPSBnZXRUYXJnZXRGcm9tVHJpZ2dlcigkdGhpcylcbiAgICB2YXIgZGF0YSAgICA9ICR0YXJnZXQuZGF0YSgnYnMuY29sbGFwc2UnKVxuICAgIHZhciBvcHRpb24gID0gZGF0YSA/ICd0b2dnbGUnIDogJHRoaXMuZGF0YSgpXG5cbiAgICBQbHVnaW4uY2FsbCgkdGFyZ2V0LCBvcHRpb24pXG4gIH0pXG5cbn0oalF1ZXJ5KTtcblxuLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKiBCb290c3RyYXA6IGRyb3Bkb3duLmpzIHYzLjMuN1xuICogaHR0cDovL2dldGJvb3RzdHJhcC5jb20vamF2YXNjcmlwdC8jZHJvcGRvd25zXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqIENvcHlyaWdodCAyMDExLTIwMTYgVHdpdHRlciwgSW5jLlxuICogTGljZW5zZWQgdW5kZXIgTUlUIChodHRwczovL2dpdGh1Yi5jb20vdHdicy9ib290c3RyYXAvYmxvYi9tYXN0ZXIvTElDRU5TRSlcbiAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXG5cbitmdW5jdGlvbiAoJCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgLy8gRFJPUERPV04gQ0xBU1MgREVGSU5JVElPTlxuICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09XG5cbiAgdmFyIGJhY2tkcm9wID0gJy5kcm9wZG93bi1iYWNrZHJvcCdcbiAgdmFyIHRvZ2dsZSAgID0gJ1tkYXRhLXRvZ2dsZT1cImRyb3Bkb3duXCJdJ1xuICB2YXIgRHJvcGRvd24gPSBmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgICQoZWxlbWVudCkub24oJ2NsaWNrLmJzLmRyb3Bkb3duJywgdGhpcy50b2dnbGUpXG4gIH1cblxuICBEcm9wZG93bi5WRVJTSU9OID0gJzMuMy43J1xuXG4gIGZ1bmN0aW9uIGdldFBhcmVudCgkdGhpcykge1xuICAgIHZhciBzZWxlY3RvciA9ICR0aGlzLmF0dHIoJ2RhdGEtdGFyZ2V0JylcblxuICAgIGlmICghc2VsZWN0b3IpIHtcbiAgICAgIHNlbGVjdG9yID0gJHRoaXMuYXR0cignaHJlZicpXG4gICAgICBzZWxlY3RvciA9IHNlbGVjdG9yICYmIC8jW0EtWmEtel0vLnRlc3Qoc2VsZWN0b3IpICYmIHNlbGVjdG9yLnJlcGxhY2UoLy4qKD89I1teXFxzXSokKS8sICcnKSAvLyBzdHJpcCBmb3IgaWU3XG4gICAgfVxuXG4gICAgdmFyICRwYXJlbnQgPSBzZWxlY3RvciAmJiAkKHNlbGVjdG9yKVxuXG4gICAgcmV0dXJuICRwYXJlbnQgJiYgJHBhcmVudC5sZW5ndGggPyAkcGFyZW50IDogJHRoaXMucGFyZW50KClcbiAgfVxuXG4gIGZ1bmN0aW9uIGNsZWFyTWVudXMoZSkge1xuICAgIGlmIChlICYmIGUud2hpY2ggPT09IDMpIHJldHVyblxuICAgICQoYmFja2Ryb3ApLnJlbW92ZSgpXG4gICAgJCh0b2dnbGUpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgdmFyICR0aGlzICAgICAgICAgPSAkKHRoaXMpXG4gICAgICB2YXIgJHBhcmVudCAgICAgICA9IGdldFBhcmVudCgkdGhpcylcbiAgICAgIHZhciByZWxhdGVkVGFyZ2V0ID0geyByZWxhdGVkVGFyZ2V0OiB0aGlzIH1cblxuICAgICAgaWYgKCEkcGFyZW50Lmhhc0NsYXNzKCdvcGVuJykpIHJldHVyblxuXG4gICAgICBpZiAoZSAmJiBlLnR5cGUgPT0gJ2NsaWNrJyAmJiAvaW5wdXR8dGV4dGFyZWEvaS50ZXN0KGUudGFyZ2V0LnRhZ05hbWUpICYmICQuY29udGFpbnMoJHBhcmVudFswXSwgZS50YXJnZXQpKSByZXR1cm5cblxuICAgICAgJHBhcmVudC50cmlnZ2VyKGUgPSAkLkV2ZW50KCdoaWRlLmJzLmRyb3Bkb3duJywgcmVsYXRlZFRhcmdldCkpXG5cbiAgICAgIGlmIChlLmlzRGVmYXVsdFByZXZlbnRlZCgpKSByZXR1cm5cblxuICAgICAgJHRoaXMuYXR0cignYXJpYS1leHBhbmRlZCcsICdmYWxzZScpXG4gICAgICAkcGFyZW50LnJlbW92ZUNsYXNzKCdvcGVuJykudHJpZ2dlcigkLkV2ZW50KCdoaWRkZW4uYnMuZHJvcGRvd24nLCByZWxhdGVkVGFyZ2V0KSlcbiAgICB9KVxuICB9XG5cbiAgRHJvcGRvd24ucHJvdG90eXBlLnRvZ2dsZSA9IGZ1bmN0aW9uIChlKSB7XG4gICAgdmFyICR0aGlzID0gJCh0aGlzKVxuXG4gICAgaWYgKCR0aGlzLmlzKCcuZGlzYWJsZWQsIDpkaXNhYmxlZCcpKSByZXR1cm5cblxuICAgIHZhciAkcGFyZW50ICA9IGdldFBhcmVudCgkdGhpcylcbiAgICB2YXIgaXNBY3RpdmUgPSAkcGFyZW50Lmhhc0NsYXNzKCdvcGVuJylcblxuICAgIGNsZWFyTWVudXMoKVxuXG4gICAgaWYgKCFpc0FjdGl2ZSkge1xuICAgICAgaWYgKCdvbnRvdWNoc3RhcnQnIGluIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCAmJiAhJHBhcmVudC5jbG9zZXN0KCcubmF2YmFyLW5hdicpLmxlbmd0aCkge1xuICAgICAgICAvLyBpZiBtb2JpbGUgd2UgdXNlIGEgYmFja2Ryb3AgYmVjYXVzZSBjbGljayBldmVudHMgZG9uJ3QgZGVsZWdhdGVcbiAgICAgICAgJChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSlcbiAgICAgICAgICAuYWRkQ2xhc3MoJ2Ryb3Bkb3duLWJhY2tkcm9wJylcbiAgICAgICAgICAuaW5zZXJ0QWZ0ZXIoJCh0aGlzKSlcbiAgICAgICAgICAub24oJ2NsaWNrJywgY2xlYXJNZW51cylcbiAgICAgIH1cblxuICAgICAgdmFyIHJlbGF0ZWRUYXJnZXQgPSB7IHJlbGF0ZWRUYXJnZXQ6IHRoaXMgfVxuICAgICAgJHBhcmVudC50cmlnZ2VyKGUgPSAkLkV2ZW50KCdzaG93LmJzLmRyb3Bkb3duJywgcmVsYXRlZFRhcmdldCkpXG5cbiAgICAgIGlmIChlLmlzRGVmYXVsdFByZXZlbnRlZCgpKSByZXR1cm5cblxuICAgICAgJHRoaXNcbiAgICAgICAgLnRyaWdnZXIoJ2ZvY3VzJylcbiAgICAgICAgLmF0dHIoJ2FyaWEtZXhwYW5kZWQnLCAndHJ1ZScpXG5cbiAgICAgICRwYXJlbnRcbiAgICAgICAgLnRvZ2dsZUNsYXNzKCdvcGVuJylcbiAgICAgICAgLnRyaWdnZXIoJC5FdmVudCgnc2hvd24uYnMuZHJvcGRvd24nLCByZWxhdGVkVGFyZ2V0KSlcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuXG4gIERyb3Bkb3duLnByb3RvdHlwZS5rZXlkb3duID0gZnVuY3Rpb24gKGUpIHtcbiAgICBpZiAoIS8oMzh8NDB8Mjd8MzIpLy50ZXN0KGUud2hpY2gpIHx8IC9pbnB1dHx0ZXh0YXJlYS9pLnRlc3QoZS50YXJnZXQudGFnTmFtZSkpIHJldHVyblxuXG4gICAgdmFyICR0aGlzID0gJCh0aGlzKVxuXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKVxuXG4gICAgaWYgKCR0aGlzLmlzKCcuZGlzYWJsZWQsIDpkaXNhYmxlZCcpKSByZXR1cm5cblxuICAgIHZhciAkcGFyZW50ICA9IGdldFBhcmVudCgkdGhpcylcbiAgICB2YXIgaXNBY3RpdmUgPSAkcGFyZW50Lmhhc0NsYXNzKCdvcGVuJylcblxuICAgIGlmICghaXNBY3RpdmUgJiYgZS53aGljaCAhPSAyNyB8fCBpc0FjdGl2ZSAmJiBlLndoaWNoID09IDI3KSB7XG4gICAgICBpZiAoZS53aGljaCA9PSAyNykgJHBhcmVudC5maW5kKHRvZ2dsZSkudHJpZ2dlcignZm9jdXMnKVxuICAgICAgcmV0dXJuICR0aGlzLnRyaWdnZXIoJ2NsaWNrJylcbiAgICB9XG5cbiAgICB2YXIgZGVzYyA9ICcgbGk6bm90KC5kaXNhYmxlZCk6dmlzaWJsZSBhJ1xuICAgIHZhciAkaXRlbXMgPSAkcGFyZW50LmZpbmQoJy5kcm9wZG93bi1tZW51JyArIGRlc2MpXG5cbiAgICBpZiAoISRpdGVtcy5sZW5ndGgpIHJldHVyblxuXG4gICAgdmFyIGluZGV4ID0gJGl0ZW1zLmluZGV4KGUudGFyZ2V0KVxuXG4gICAgaWYgKGUud2hpY2ggPT0gMzggJiYgaW5kZXggPiAwKSAgICAgICAgICAgICAgICAgaW5kZXgtLSAgICAgICAgIC8vIHVwXG4gICAgaWYgKGUud2hpY2ggPT0gNDAgJiYgaW5kZXggPCAkaXRlbXMubGVuZ3RoIC0gMSkgaW5kZXgrKyAgICAgICAgIC8vIGRvd25cbiAgICBpZiAoIX5pbmRleCkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmRleCA9IDBcblxuICAgICRpdGVtcy5lcShpbmRleCkudHJpZ2dlcignZm9jdXMnKVxuICB9XG5cblxuICAvLyBEUk9QRE9XTiBQTFVHSU4gREVGSU5JVElPTlxuICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4gIGZ1bmN0aW9uIFBsdWdpbihvcHRpb24pIHtcbiAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciAkdGhpcyA9ICQodGhpcylcbiAgICAgIHZhciBkYXRhICA9ICR0aGlzLmRhdGEoJ2JzLmRyb3Bkb3duJylcblxuICAgICAgaWYgKCFkYXRhKSAkdGhpcy5kYXRhKCdicy5kcm9wZG93bicsIChkYXRhID0gbmV3IERyb3Bkb3duKHRoaXMpKSlcbiAgICAgIGlmICh0eXBlb2Ygb3B0aW9uID09ICdzdHJpbmcnKSBkYXRhW29wdGlvbl0uY2FsbCgkdGhpcylcbiAgICB9KVxuICB9XG5cbiAgdmFyIG9sZCA9ICQuZm4uZHJvcGRvd25cblxuICAkLmZuLmRyb3Bkb3duICAgICAgICAgICAgID0gUGx1Z2luXG4gICQuZm4uZHJvcGRvd24uQ29uc3RydWN0b3IgPSBEcm9wZG93blxuXG5cbiAgLy8gRFJPUERPV04gTk8gQ09ORkxJQ1RcbiAgLy8gPT09PT09PT09PT09PT09PT09PT1cblxuICAkLmZuLmRyb3Bkb3duLm5vQ29uZmxpY3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgJC5mbi5kcm9wZG93biA9IG9sZFxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuXG4gIC8vIEFQUExZIFRPIFNUQU5EQVJEIERST1BET1dOIEVMRU1FTlRTXG4gIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbiAgJChkb2N1bWVudClcbiAgICAub24oJ2NsaWNrLmJzLmRyb3Bkb3duLmRhdGEtYXBpJywgY2xlYXJNZW51cylcbiAgICAub24oJ2NsaWNrLmJzLmRyb3Bkb3duLmRhdGEtYXBpJywgJy5kcm9wZG93biBmb3JtJywgZnVuY3Rpb24gKGUpIHsgZS5zdG9wUHJvcGFnYXRpb24oKSB9KVxuICAgIC5vbignY2xpY2suYnMuZHJvcGRvd24uZGF0YS1hcGknLCB0b2dnbGUsIERyb3Bkb3duLnByb3RvdHlwZS50b2dnbGUpXG4gICAgLm9uKCdrZXlkb3duLmJzLmRyb3Bkb3duLmRhdGEtYXBpJywgdG9nZ2xlLCBEcm9wZG93bi5wcm90b3R5cGUua2V5ZG93bilcbiAgICAub24oJ2tleWRvd24uYnMuZHJvcGRvd24uZGF0YS1hcGknLCAnLmRyb3Bkb3duLW1lbnUnLCBEcm9wZG93bi5wcm90b3R5cGUua2V5ZG93bilcblxufShqUXVlcnkpO1xuXG4vKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqIEJvb3RzdHJhcDogbW9kYWwuanMgdjMuMy43XG4gKiBodHRwOi8vZ2V0Ym9vdHN0cmFwLmNvbS9qYXZhc2NyaXB0LyNtb2RhbHNcbiAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICogQ29weXJpZ2h0IDIwMTEtMjAxNiBUd2l0dGVyLCBJbmMuXG4gKiBMaWNlbnNlZCB1bmRlciBNSVQgKGh0dHBzOi8vZ2l0aHViLmNvbS90d2JzL2Jvb3RzdHJhcC9ibG9iL21hc3Rlci9MSUNFTlNFKVxuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5cblxuK2Z1bmN0aW9uICgkKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICAvLyBNT0RBTCBDTEFTUyBERUZJTklUSU9OXG4gIC8vID09PT09PT09PT09PT09PT09PT09PT1cblxuICB2YXIgTW9kYWwgPSBmdW5jdGlvbiAoZWxlbWVudCwgb3B0aW9ucykge1xuICAgIHRoaXMub3B0aW9ucyAgICAgICAgICAgICA9IG9wdGlvbnNcbiAgICB0aGlzLiRib2R5ICAgICAgICAgICAgICAgPSAkKGRvY3VtZW50LmJvZHkpXG4gICAgdGhpcy4kZWxlbWVudCAgICAgICAgICAgID0gJChlbGVtZW50KVxuICAgIHRoaXMuJGRpYWxvZyAgICAgICAgICAgICA9IHRoaXMuJGVsZW1lbnQuZmluZCgnLm1vZGFsLWRpYWxvZycpXG4gICAgdGhpcy4kYmFja2Ryb3AgICAgICAgICAgID0gbnVsbFxuICAgIHRoaXMuaXNTaG93biAgICAgICAgICAgICA9IG51bGxcbiAgICB0aGlzLm9yaWdpbmFsQm9keVBhZCAgICAgPSBudWxsXG4gICAgdGhpcy5zY3JvbGxiYXJXaWR0aCAgICAgID0gMFxuICAgIHRoaXMuaWdub3JlQmFja2Ryb3BDbGljayA9IGZhbHNlXG5cbiAgICBpZiAodGhpcy5vcHRpb25zLnJlbW90ZSkge1xuICAgICAgdGhpcy4kZWxlbWVudFxuICAgICAgICAuZmluZCgnLm1vZGFsLWNvbnRlbnQnKVxuICAgICAgICAubG9hZCh0aGlzLm9wdGlvbnMucmVtb3RlLCAkLnByb3h5KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICB0aGlzLiRlbGVtZW50LnRyaWdnZXIoJ2xvYWRlZC5icy5tb2RhbCcpXG4gICAgICAgIH0sIHRoaXMpKVxuICAgIH1cbiAgfVxuXG4gIE1vZGFsLlZFUlNJT04gID0gJzMuMy43J1xuXG4gIE1vZGFsLlRSQU5TSVRJT05fRFVSQVRJT04gPSAzMDBcbiAgTW9kYWwuQkFDS0RST1BfVFJBTlNJVElPTl9EVVJBVElPTiA9IDE1MFxuXG4gIE1vZGFsLkRFRkFVTFRTID0ge1xuICAgIGJhY2tkcm9wOiB0cnVlLFxuICAgIGtleWJvYXJkOiB0cnVlLFxuICAgIHNob3c6IHRydWVcbiAgfVxuXG4gIE1vZGFsLnByb3RvdHlwZS50b2dnbGUgPSBmdW5jdGlvbiAoX3JlbGF0ZWRUYXJnZXQpIHtcbiAgICByZXR1cm4gdGhpcy5pc1Nob3duID8gdGhpcy5oaWRlKCkgOiB0aGlzLnNob3coX3JlbGF0ZWRUYXJnZXQpXG4gIH1cblxuICBNb2RhbC5wcm90b3R5cGUuc2hvdyA9IGZ1bmN0aW9uIChfcmVsYXRlZFRhcmdldCkge1xuICAgIHZhciB0aGF0ID0gdGhpc1xuICAgIHZhciBlICAgID0gJC5FdmVudCgnc2hvdy5icy5tb2RhbCcsIHsgcmVsYXRlZFRhcmdldDogX3JlbGF0ZWRUYXJnZXQgfSlcblxuICAgIHRoaXMuJGVsZW1lbnQudHJpZ2dlcihlKVxuXG4gICAgaWYgKHRoaXMuaXNTaG93biB8fCBlLmlzRGVmYXVsdFByZXZlbnRlZCgpKSByZXR1cm5cblxuICAgIHRoaXMuaXNTaG93biA9IHRydWVcblxuICAgIHRoaXMuY2hlY2tTY3JvbGxiYXIoKVxuICAgIHRoaXMuc2V0U2Nyb2xsYmFyKClcbiAgICB0aGlzLiRib2R5LmFkZENsYXNzKCdtb2RhbC1vcGVuJylcblxuICAgIHRoaXMuZXNjYXBlKClcbiAgICB0aGlzLnJlc2l6ZSgpXG5cbiAgICB0aGlzLiRlbGVtZW50Lm9uKCdjbGljay5kaXNtaXNzLmJzLm1vZGFsJywgJ1tkYXRhLWRpc21pc3M9XCJtb2RhbFwiXScsICQucHJveHkodGhpcy5oaWRlLCB0aGlzKSlcblxuICAgIHRoaXMuJGRpYWxvZy5vbignbW91c2Vkb3duLmRpc21pc3MuYnMubW9kYWwnLCBmdW5jdGlvbiAoKSB7XG4gICAgICB0aGF0LiRlbGVtZW50Lm9uZSgnbW91c2V1cC5kaXNtaXNzLmJzLm1vZGFsJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgaWYgKCQoZS50YXJnZXQpLmlzKHRoYXQuJGVsZW1lbnQpKSB0aGF0Lmlnbm9yZUJhY2tkcm9wQ2xpY2sgPSB0cnVlXG4gICAgICB9KVxuICAgIH0pXG5cbiAgICB0aGlzLmJhY2tkcm9wKGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciB0cmFuc2l0aW9uID0gJC5zdXBwb3J0LnRyYW5zaXRpb24gJiYgdGhhdC4kZWxlbWVudC5oYXNDbGFzcygnZmFkZScpXG5cbiAgICAgIGlmICghdGhhdC4kZWxlbWVudC5wYXJlbnQoKS5sZW5ndGgpIHtcbiAgICAgICAgdGhhdC4kZWxlbWVudC5hcHBlbmRUbyh0aGF0LiRib2R5KSAvLyBkb24ndCBtb3ZlIG1vZGFscyBkb20gcG9zaXRpb25cbiAgICAgIH1cblxuICAgICAgdGhhdC4kZWxlbWVudFxuICAgICAgICAuc2hvdygpXG4gICAgICAgIC5zY3JvbGxUb3AoMClcblxuICAgICAgdGhhdC5hZGp1c3REaWFsb2coKVxuXG4gICAgICBpZiAodHJhbnNpdGlvbikge1xuICAgICAgICB0aGF0LiRlbGVtZW50WzBdLm9mZnNldFdpZHRoIC8vIGZvcmNlIHJlZmxvd1xuICAgICAgfVxuXG4gICAgICB0aGF0LiRlbGVtZW50LmFkZENsYXNzKCdpbicpXG5cbiAgICAgIHRoYXQuZW5mb3JjZUZvY3VzKClcblxuICAgICAgdmFyIGUgPSAkLkV2ZW50KCdzaG93bi5icy5tb2RhbCcsIHsgcmVsYXRlZFRhcmdldDogX3JlbGF0ZWRUYXJnZXQgfSlcblxuICAgICAgdHJhbnNpdGlvbiA/XG4gICAgICAgIHRoYXQuJGRpYWxvZyAvLyB3YWl0IGZvciBtb2RhbCB0byBzbGlkZSBpblxuICAgICAgICAgIC5vbmUoJ2JzVHJhbnNpdGlvbkVuZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoYXQuJGVsZW1lbnQudHJpZ2dlcignZm9jdXMnKS50cmlnZ2VyKGUpXG4gICAgICAgICAgfSlcbiAgICAgICAgICAuZW11bGF0ZVRyYW5zaXRpb25FbmQoTW9kYWwuVFJBTlNJVElPTl9EVVJBVElPTikgOlxuICAgICAgICB0aGF0LiRlbGVtZW50LnRyaWdnZXIoJ2ZvY3VzJykudHJpZ2dlcihlKVxuICAgIH0pXG4gIH1cblxuICBNb2RhbC5wcm90b3R5cGUuaGlkZSA9IGZ1bmN0aW9uIChlKSB7XG4gICAgaWYgKGUpIGUucHJldmVudERlZmF1bHQoKVxuXG4gICAgZSA9ICQuRXZlbnQoJ2hpZGUuYnMubW9kYWwnKVxuXG4gICAgdGhpcy4kZWxlbWVudC50cmlnZ2VyKGUpXG5cbiAgICBpZiAoIXRoaXMuaXNTaG93biB8fCBlLmlzRGVmYXVsdFByZXZlbnRlZCgpKSByZXR1cm5cblxuICAgIHRoaXMuaXNTaG93biA9IGZhbHNlXG5cbiAgICB0aGlzLmVzY2FwZSgpXG4gICAgdGhpcy5yZXNpemUoKVxuXG4gICAgJChkb2N1bWVudCkub2ZmKCdmb2N1c2luLmJzLm1vZGFsJylcblxuICAgIHRoaXMuJGVsZW1lbnRcbiAgICAgIC5yZW1vdmVDbGFzcygnaW4nKVxuICAgICAgLm9mZignY2xpY2suZGlzbWlzcy5icy5tb2RhbCcpXG4gICAgICAub2ZmKCdtb3VzZXVwLmRpc21pc3MuYnMubW9kYWwnKVxuXG4gICAgdGhpcy4kZGlhbG9nLm9mZignbW91c2Vkb3duLmRpc21pc3MuYnMubW9kYWwnKVxuXG4gICAgJC5zdXBwb3J0LnRyYW5zaXRpb24gJiYgdGhpcy4kZWxlbWVudC5oYXNDbGFzcygnZmFkZScpID9cbiAgICAgIHRoaXMuJGVsZW1lbnRcbiAgICAgICAgLm9uZSgnYnNUcmFuc2l0aW9uRW5kJywgJC5wcm94eSh0aGlzLmhpZGVNb2RhbCwgdGhpcykpXG4gICAgICAgIC5lbXVsYXRlVHJhbnNpdGlvbkVuZChNb2RhbC5UUkFOU0lUSU9OX0RVUkFUSU9OKSA6XG4gICAgICB0aGlzLmhpZGVNb2RhbCgpXG4gIH1cblxuICBNb2RhbC5wcm90b3R5cGUuZW5mb3JjZUZvY3VzID0gZnVuY3Rpb24gKCkge1xuICAgICQoZG9jdW1lbnQpXG4gICAgICAub2ZmKCdmb2N1c2luLmJzLm1vZGFsJykgLy8gZ3VhcmQgYWdhaW5zdCBpbmZpbml0ZSBmb2N1cyBsb29wXG4gICAgICAub24oJ2ZvY3VzaW4uYnMubW9kYWwnLCAkLnByb3h5KGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGlmIChkb2N1bWVudCAhPT0gZS50YXJnZXQgJiZcbiAgICAgICAgICAgIHRoaXMuJGVsZW1lbnRbMF0gIT09IGUudGFyZ2V0ICYmXG4gICAgICAgICAgICAhdGhpcy4kZWxlbWVudC5oYXMoZS50YXJnZXQpLmxlbmd0aCkge1xuICAgICAgICAgIHRoaXMuJGVsZW1lbnQudHJpZ2dlcignZm9jdXMnKVxuICAgICAgICB9XG4gICAgICB9LCB0aGlzKSlcbiAgfVxuXG4gIE1vZGFsLnByb3RvdHlwZS5lc2NhcGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHRoaXMuaXNTaG93biAmJiB0aGlzLm9wdGlvbnMua2V5Ym9hcmQpIHtcbiAgICAgIHRoaXMuJGVsZW1lbnQub24oJ2tleWRvd24uZGlzbWlzcy5icy5tb2RhbCcsICQucHJveHkoZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgZS53aGljaCA9PSAyNyAmJiB0aGlzLmhpZGUoKVxuICAgICAgfSwgdGhpcykpXG4gICAgfSBlbHNlIGlmICghdGhpcy5pc1Nob3duKSB7XG4gICAgICB0aGlzLiRlbGVtZW50Lm9mZigna2V5ZG93bi5kaXNtaXNzLmJzLm1vZGFsJylcbiAgICB9XG4gIH1cblxuICBNb2RhbC5wcm90b3R5cGUucmVzaXplID0gZnVuY3Rpb24gKCkge1xuICAgIGlmICh0aGlzLmlzU2hvd24pIHtcbiAgICAgICQod2luZG93KS5vbigncmVzaXplLmJzLm1vZGFsJywgJC5wcm94eSh0aGlzLmhhbmRsZVVwZGF0ZSwgdGhpcykpXG4gICAgfSBlbHNlIHtcbiAgICAgICQod2luZG93KS5vZmYoJ3Jlc2l6ZS5icy5tb2RhbCcpXG4gICAgfVxuICB9XG5cbiAgTW9kYWwucHJvdG90eXBlLmhpZGVNb2RhbCA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgdGhhdCA9IHRoaXNcbiAgICB0aGlzLiRlbGVtZW50LmhpZGUoKVxuICAgIHRoaXMuYmFja2Ryb3AoZnVuY3Rpb24gKCkge1xuICAgICAgdGhhdC4kYm9keS5yZW1vdmVDbGFzcygnbW9kYWwtb3BlbicpXG4gICAgICB0aGF0LnJlc2V0QWRqdXN0bWVudHMoKVxuICAgICAgdGhhdC5yZXNldFNjcm9sbGJhcigpXG4gICAgICB0aGF0LiRlbGVtZW50LnRyaWdnZXIoJ2hpZGRlbi5icy5tb2RhbCcpXG4gICAgfSlcbiAgfVxuXG4gIE1vZGFsLnByb3RvdHlwZS5yZW1vdmVCYWNrZHJvcCA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLiRiYWNrZHJvcCAmJiB0aGlzLiRiYWNrZHJvcC5yZW1vdmUoKVxuICAgIHRoaXMuJGJhY2tkcm9wID0gbnVsbFxuICB9XG5cbiAgTW9kYWwucHJvdG90eXBlLmJhY2tkcm9wID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gICAgdmFyIHRoYXQgPSB0aGlzXG4gICAgdmFyIGFuaW1hdGUgPSB0aGlzLiRlbGVtZW50Lmhhc0NsYXNzKCdmYWRlJykgPyAnZmFkZScgOiAnJ1xuXG4gICAgaWYgKHRoaXMuaXNTaG93biAmJiB0aGlzLm9wdGlvbnMuYmFja2Ryb3ApIHtcbiAgICAgIHZhciBkb0FuaW1hdGUgPSAkLnN1cHBvcnQudHJhbnNpdGlvbiAmJiBhbmltYXRlXG5cbiAgICAgIHRoaXMuJGJhY2tkcm9wID0gJChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSlcbiAgICAgICAgLmFkZENsYXNzKCdtb2RhbC1iYWNrZHJvcCAnICsgYW5pbWF0ZSlcbiAgICAgICAgLmFwcGVuZFRvKHRoaXMuJGJvZHkpXG5cbiAgICAgIHRoaXMuJGVsZW1lbnQub24oJ2NsaWNrLmRpc21pc3MuYnMubW9kYWwnLCAkLnByb3h5KGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGlmICh0aGlzLmlnbm9yZUJhY2tkcm9wQ2xpY2spIHtcbiAgICAgICAgICB0aGlzLmlnbm9yZUJhY2tkcm9wQ2xpY2sgPSBmYWxzZVxuICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIGlmIChlLnRhcmdldCAhPT0gZS5jdXJyZW50VGFyZ2V0KSByZXR1cm5cbiAgICAgICAgdGhpcy5vcHRpb25zLmJhY2tkcm9wID09ICdzdGF0aWMnXG4gICAgICAgICAgPyB0aGlzLiRlbGVtZW50WzBdLmZvY3VzKClcbiAgICAgICAgICA6IHRoaXMuaGlkZSgpXG4gICAgICB9LCB0aGlzKSlcblxuICAgICAgaWYgKGRvQW5pbWF0ZSkgdGhpcy4kYmFja2Ryb3BbMF0ub2Zmc2V0V2lkdGggLy8gZm9yY2UgcmVmbG93XG5cbiAgICAgIHRoaXMuJGJhY2tkcm9wLmFkZENsYXNzKCdpbicpXG5cbiAgICAgIGlmICghY2FsbGJhY2spIHJldHVyblxuXG4gICAgICBkb0FuaW1hdGUgP1xuICAgICAgICB0aGlzLiRiYWNrZHJvcFxuICAgICAgICAgIC5vbmUoJ2JzVHJhbnNpdGlvbkVuZCcsIGNhbGxiYWNrKVxuICAgICAgICAgIC5lbXVsYXRlVHJhbnNpdGlvbkVuZChNb2RhbC5CQUNLRFJPUF9UUkFOU0lUSU9OX0RVUkFUSU9OKSA6XG4gICAgICAgIGNhbGxiYWNrKClcblxuICAgIH0gZWxzZSBpZiAoIXRoaXMuaXNTaG93biAmJiB0aGlzLiRiYWNrZHJvcCkge1xuICAgICAgdGhpcy4kYmFja2Ryb3AucmVtb3ZlQ2xhc3MoJ2luJylcblxuICAgICAgdmFyIGNhbGxiYWNrUmVtb3ZlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGF0LnJlbW92ZUJhY2tkcm9wKClcbiAgICAgICAgY2FsbGJhY2sgJiYgY2FsbGJhY2soKVxuICAgICAgfVxuICAgICAgJC5zdXBwb3J0LnRyYW5zaXRpb24gJiYgdGhpcy4kZWxlbWVudC5oYXNDbGFzcygnZmFkZScpID9cbiAgICAgICAgdGhpcy4kYmFja2Ryb3BcbiAgICAgICAgICAub25lKCdic1RyYW5zaXRpb25FbmQnLCBjYWxsYmFja1JlbW92ZSlcbiAgICAgICAgICAuZW11bGF0ZVRyYW5zaXRpb25FbmQoTW9kYWwuQkFDS0RST1BfVFJBTlNJVElPTl9EVVJBVElPTikgOlxuICAgICAgICBjYWxsYmFja1JlbW92ZSgpXG5cbiAgICB9IGVsc2UgaWYgKGNhbGxiYWNrKSB7XG4gICAgICBjYWxsYmFjaygpXG4gICAgfVxuICB9XG5cbiAgLy8gdGhlc2UgZm9sbG93aW5nIG1ldGhvZHMgYXJlIHVzZWQgdG8gaGFuZGxlIG92ZXJmbG93aW5nIG1vZGFsc1xuXG4gIE1vZGFsLnByb3RvdHlwZS5oYW5kbGVVcGRhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5hZGp1c3REaWFsb2coKVxuICB9XG5cbiAgTW9kYWwucHJvdG90eXBlLmFkanVzdERpYWxvZyA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgbW9kYWxJc092ZXJmbG93aW5nID0gdGhpcy4kZWxlbWVudFswXS5zY3JvbGxIZWlnaHQgPiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0XG5cbiAgICB0aGlzLiRlbGVtZW50LmNzcyh7XG4gICAgICBwYWRkaW5nTGVmdDogICF0aGlzLmJvZHlJc092ZXJmbG93aW5nICYmIG1vZGFsSXNPdmVyZmxvd2luZyA/IHRoaXMuc2Nyb2xsYmFyV2lkdGggOiAnJyxcbiAgICAgIHBhZGRpbmdSaWdodDogdGhpcy5ib2R5SXNPdmVyZmxvd2luZyAmJiAhbW9kYWxJc092ZXJmbG93aW5nID8gdGhpcy5zY3JvbGxiYXJXaWR0aCA6ICcnXG4gICAgfSlcbiAgfVxuXG4gIE1vZGFsLnByb3RvdHlwZS5yZXNldEFkanVzdG1lbnRzID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuJGVsZW1lbnQuY3NzKHtcbiAgICAgIHBhZGRpbmdMZWZ0OiAnJyxcbiAgICAgIHBhZGRpbmdSaWdodDogJydcbiAgICB9KVxuICB9XG5cbiAgTW9kYWwucHJvdG90eXBlLmNoZWNrU2Nyb2xsYmFyID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBmdWxsV2luZG93V2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aFxuICAgIGlmICghZnVsbFdpbmRvd1dpZHRoKSB7IC8vIHdvcmthcm91bmQgZm9yIG1pc3Npbmcgd2luZG93LmlubmVyV2lkdGggaW4gSUU4XG4gICAgICB2YXIgZG9jdW1lbnRFbGVtZW50UmVjdCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuICAgICAgZnVsbFdpbmRvd1dpZHRoID0gZG9jdW1lbnRFbGVtZW50UmVjdC5yaWdodCAtIE1hdGguYWJzKGRvY3VtZW50RWxlbWVudFJlY3QubGVmdClcbiAgICB9XG4gICAgdGhpcy5ib2R5SXNPdmVyZmxvd2luZyA9IGRvY3VtZW50LmJvZHkuY2xpZW50V2lkdGggPCBmdWxsV2luZG93V2lkdGhcbiAgICB0aGlzLnNjcm9sbGJhcldpZHRoID0gdGhpcy5tZWFzdXJlU2Nyb2xsYmFyKClcbiAgfVxuXG4gIE1vZGFsLnByb3RvdHlwZS5zZXRTY3JvbGxiYXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGJvZHlQYWQgPSBwYXJzZUludCgodGhpcy4kYm9keS5jc3MoJ3BhZGRpbmctcmlnaHQnKSB8fCAwKSwgMTApXG4gICAgdGhpcy5vcmlnaW5hbEJvZHlQYWQgPSBkb2N1bWVudC5ib2R5LnN0eWxlLnBhZGRpbmdSaWdodCB8fCAnJ1xuICAgIGlmICh0aGlzLmJvZHlJc092ZXJmbG93aW5nKSB0aGlzLiRib2R5LmNzcygncGFkZGluZy1yaWdodCcsIGJvZHlQYWQgKyB0aGlzLnNjcm9sbGJhcldpZHRoKVxuICB9XG5cbiAgTW9kYWwucHJvdG90eXBlLnJlc2V0U2Nyb2xsYmFyID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuJGJvZHkuY3NzKCdwYWRkaW5nLXJpZ2h0JywgdGhpcy5vcmlnaW5hbEJvZHlQYWQpXG4gIH1cblxuICBNb2RhbC5wcm90b3R5cGUubWVhc3VyZVNjcm9sbGJhciA9IGZ1bmN0aW9uICgpIHsgLy8gdGh4IHdhbHNoXG4gICAgdmFyIHNjcm9sbERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgc2Nyb2xsRGl2LmNsYXNzTmFtZSA9ICdtb2RhbC1zY3JvbGxiYXItbWVhc3VyZSdcbiAgICB0aGlzLiRib2R5LmFwcGVuZChzY3JvbGxEaXYpXG4gICAgdmFyIHNjcm9sbGJhcldpZHRoID0gc2Nyb2xsRGl2Lm9mZnNldFdpZHRoIC0gc2Nyb2xsRGl2LmNsaWVudFdpZHRoXG4gICAgdGhpcy4kYm9keVswXS5yZW1vdmVDaGlsZChzY3JvbGxEaXYpXG4gICAgcmV0dXJuIHNjcm9sbGJhcldpZHRoXG4gIH1cblxuXG4gIC8vIE1PREFMIFBMVUdJTiBERUZJTklUSU9OXG4gIC8vID09PT09PT09PT09PT09PT09PT09PT09XG5cbiAgZnVuY3Rpb24gUGx1Z2luKG9wdGlvbiwgX3JlbGF0ZWRUYXJnZXQpIHtcbiAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciAkdGhpcyAgID0gJCh0aGlzKVxuICAgICAgdmFyIGRhdGEgICAgPSAkdGhpcy5kYXRhKCdicy5tb2RhbCcpXG4gICAgICB2YXIgb3B0aW9ucyA9ICQuZXh0ZW5kKHt9LCBNb2RhbC5ERUZBVUxUUywgJHRoaXMuZGF0YSgpLCB0eXBlb2Ygb3B0aW9uID09ICdvYmplY3QnICYmIG9wdGlvbilcblxuICAgICAgaWYgKCFkYXRhKSAkdGhpcy5kYXRhKCdicy5tb2RhbCcsIChkYXRhID0gbmV3IE1vZGFsKHRoaXMsIG9wdGlvbnMpKSlcbiAgICAgIGlmICh0eXBlb2Ygb3B0aW9uID09ICdzdHJpbmcnKSBkYXRhW29wdGlvbl0oX3JlbGF0ZWRUYXJnZXQpXG4gICAgICBlbHNlIGlmIChvcHRpb25zLnNob3cpIGRhdGEuc2hvdyhfcmVsYXRlZFRhcmdldClcbiAgICB9KVxuICB9XG5cbiAgdmFyIG9sZCA9ICQuZm4ubW9kYWxcblxuICAkLmZuLm1vZGFsICAgICAgICAgICAgID0gUGx1Z2luXG4gICQuZm4ubW9kYWwuQ29uc3RydWN0b3IgPSBNb2RhbFxuXG5cbiAgLy8gTU9EQUwgTk8gQ09ORkxJQ1RcbiAgLy8gPT09PT09PT09PT09PT09PT1cblxuICAkLmZuLm1vZGFsLm5vQ29uZmxpY3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgJC5mbi5tb2RhbCA9IG9sZFxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuXG4gIC8vIE1PREFMIERBVEEtQVBJXG4gIC8vID09PT09PT09PT09PT09XG5cbiAgJChkb2N1bWVudCkub24oJ2NsaWNrLmJzLm1vZGFsLmRhdGEtYXBpJywgJ1tkYXRhLXRvZ2dsZT1cIm1vZGFsXCJdJywgZnVuY3Rpb24gKGUpIHtcbiAgICB2YXIgJHRoaXMgICA9ICQodGhpcylcbiAgICB2YXIgaHJlZiAgICA9ICR0aGlzLmF0dHIoJ2hyZWYnKVxuICAgIHZhciAkdGFyZ2V0ID0gJCgkdGhpcy5hdHRyKCdkYXRhLXRhcmdldCcpIHx8IChocmVmICYmIGhyZWYucmVwbGFjZSgvLiooPz0jW15cXHNdKyQpLywgJycpKSkgLy8gc3RyaXAgZm9yIGllN1xuICAgIHZhciBvcHRpb24gID0gJHRhcmdldC5kYXRhKCdicy5tb2RhbCcpID8gJ3RvZ2dsZScgOiAkLmV4dGVuZCh7IHJlbW90ZTogIS8jLy50ZXN0KGhyZWYpICYmIGhyZWYgfSwgJHRhcmdldC5kYXRhKCksICR0aGlzLmRhdGEoKSlcblxuICAgIGlmICgkdGhpcy5pcygnYScpKSBlLnByZXZlbnREZWZhdWx0KClcblxuICAgICR0YXJnZXQub25lKCdzaG93LmJzLm1vZGFsJywgZnVuY3Rpb24gKHNob3dFdmVudCkge1xuICAgICAgaWYgKHNob3dFdmVudC5pc0RlZmF1bHRQcmV2ZW50ZWQoKSkgcmV0dXJuIC8vIG9ubHkgcmVnaXN0ZXIgZm9jdXMgcmVzdG9yZXIgaWYgbW9kYWwgd2lsbCBhY3R1YWxseSBnZXQgc2hvd25cbiAgICAgICR0YXJnZXQub25lKCdoaWRkZW4uYnMubW9kYWwnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICR0aGlzLmlzKCc6dmlzaWJsZScpICYmICR0aGlzLnRyaWdnZXIoJ2ZvY3VzJylcbiAgICAgIH0pXG4gICAgfSlcbiAgICBQbHVnaW4uY2FsbCgkdGFyZ2V0LCBvcHRpb24sIHRoaXMpXG4gIH0pXG5cbn0oalF1ZXJ5KTtcblxuLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKiBCb290c3RyYXA6IHRvb2x0aXAuanMgdjMuMy43XG4gKiBodHRwOi8vZ2V0Ym9vdHN0cmFwLmNvbS9qYXZhc2NyaXB0LyN0b29sdGlwXG4gKiBJbnNwaXJlZCBieSB0aGUgb3JpZ2luYWwgalF1ZXJ5LnRpcHN5IGJ5IEphc29uIEZyYW1lXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqIENvcHlyaWdodCAyMDExLTIwMTYgVHdpdHRlciwgSW5jLlxuICogTGljZW5zZWQgdW5kZXIgTUlUIChodHRwczovL2dpdGh1Yi5jb20vdHdicy9ib290c3RyYXAvYmxvYi9tYXN0ZXIvTElDRU5TRSlcbiAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXG5cbitmdW5jdGlvbiAoJCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgLy8gVE9PTFRJUCBQVUJMSUMgQ0xBU1MgREVGSU5JVElPTlxuICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbiAgdmFyIFRvb2x0aXAgPSBmdW5jdGlvbiAoZWxlbWVudCwgb3B0aW9ucykge1xuICAgIHRoaXMudHlwZSAgICAgICA9IG51bGxcbiAgICB0aGlzLm9wdGlvbnMgICAgPSBudWxsXG4gICAgdGhpcy5lbmFibGVkICAgID0gbnVsbFxuICAgIHRoaXMudGltZW91dCAgICA9IG51bGxcbiAgICB0aGlzLmhvdmVyU3RhdGUgPSBudWxsXG4gICAgdGhpcy4kZWxlbWVudCAgID0gbnVsbFxuICAgIHRoaXMuaW5TdGF0ZSAgICA9IG51bGxcblxuICAgIHRoaXMuaW5pdCgndG9vbHRpcCcsIGVsZW1lbnQsIG9wdGlvbnMpXG4gIH1cblxuICBUb29sdGlwLlZFUlNJT04gID0gJzMuMy43J1xuXG4gIFRvb2x0aXAuVFJBTlNJVElPTl9EVVJBVElPTiA9IDE1MFxuXG4gIFRvb2x0aXAuREVGQVVMVFMgPSB7XG4gICAgYW5pbWF0aW9uOiB0cnVlLFxuICAgIHBsYWNlbWVudDogJ3RvcCcsXG4gICAgc2VsZWN0b3I6IGZhbHNlLFxuICAgIHRlbXBsYXRlOiAnPGRpdiBjbGFzcz1cInRvb2x0aXBcIiByb2xlPVwidG9vbHRpcFwiPjxkaXYgY2xhc3M9XCJ0b29sdGlwLWFycm93XCI+PC9kaXY+PGRpdiBjbGFzcz1cInRvb2x0aXAtaW5uZXJcIj48L2Rpdj48L2Rpdj4nLFxuICAgIHRyaWdnZXI6ICdob3ZlciBmb2N1cycsXG4gICAgdGl0bGU6ICcnLFxuICAgIGRlbGF5OiAwLFxuICAgIGh0bWw6IGZhbHNlLFxuICAgIGNvbnRhaW5lcjogZmFsc2UsXG4gICAgdmlld3BvcnQ6IHtcbiAgICAgIHNlbGVjdG9yOiAnYm9keScsXG4gICAgICBwYWRkaW5nOiAwXG4gICAgfVxuICB9XG5cbiAgVG9vbHRpcC5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICh0eXBlLCBlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgdGhpcy5lbmFibGVkICAgPSB0cnVlXG4gICAgdGhpcy50eXBlICAgICAgPSB0eXBlXG4gICAgdGhpcy4kZWxlbWVudCAgPSAkKGVsZW1lbnQpXG4gICAgdGhpcy5vcHRpb25zICAgPSB0aGlzLmdldE9wdGlvbnMob3B0aW9ucylcbiAgICB0aGlzLiR2aWV3cG9ydCA9IHRoaXMub3B0aW9ucy52aWV3cG9ydCAmJiAkKCQuaXNGdW5jdGlvbih0aGlzLm9wdGlvbnMudmlld3BvcnQpID8gdGhpcy5vcHRpb25zLnZpZXdwb3J0LmNhbGwodGhpcywgdGhpcy4kZWxlbWVudCkgOiAodGhpcy5vcHRpb25zLnZpZXdwb3J0LnNlbGVjdG9yIHx8IHRoaXMub3B0aW9ucy52aWV3cG9ydCkpXG4gICAgdGhpcy5pblN0YXRlICAgPSB7IGNsaWNrOiBmYWxzZSwgaG92ZXI6IGZhbHNlLCBmb2N1czogZmFsc2UgfVxuXG4gICAgaWYgKHRoaXMuJGVsZW1lbnRbMF0gaW5zdGFuY2VvZiBkb2N1bWVudC5jb25zdHJ1Y3RvciAmJiAhdGhpcy5vcHRpb25zLnNlbGVjdG9yKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2BzZWxlY3RvcmAgb3B0aW9uIG11c3QgYmUgc3BlY2lmaWVkIHdoZW4gaW5pdGlhbGl6aW5nICcgKyB0aGlzLnR5cGUgKyAnIG9uIHRoZSB3aW5kb3cuZG9jdW1lbnQgb2JqZWN0IScpXG4gICAgfVxuXG4gICAgdmFyIHRyaWdnZXJzID0gdGhpcy5vcHRpb25zLnRyaWdnZXIuc3BsaXQoJyAnKVxuXG4gICAgZm9yICh2YXIgaSA9IHRyaWdnZXJzLmxlbmd0aDsgaS0tOykge1xuICAgICAgdmFyIHRyaWdnZXIgPSB0cmlnZ2Vyc1tpXVxuXG4gICAgICBpZiAodHJpZ2dlciA9PSAnY2xpY2snKSB7XG4gICAgICAgIHRoaXMuJGVsZW1lbnQub24oJ2NsaWNrLicgKyB0aGlzLnR5cGUsIHRoaXMub3B0aW9ucy5zZWxlY3RvciwgJC5wcm94eSh0aGlzLnRvZ2dsZSwgdGhpcykpXG4gICAgICB9IGVsc2UgaWYgKHRyaWdnZXIgIT0gJ21hbnVhbCcpIHtcbiAgICAgICAgdmFyIGV2ZW50SW4gID0gdHJpZ2dlciA9PSAnaG92ZXInID8gJ21vdXNlZW50ZXInIDogJ2ZvY3VzaW4nXG4gICAgICAgIHZhciBldmVudE91dCA9IHRyaWdnZXIgPT0gJ2hvdmVyJyA/ICdtb3VzZWxlYXZlJyA6ICdmb2N1c291dCdcblxuICAgICAgICB0aGlzLiRlbGVtZW50Lm9uKGV2ZW50SW4gICsgJy4nICsgdGhpcy50eXBlLCB0aGlzLm9wdGlvbnMuc2VsZWN0b3IsICQucHJveHkodGhpcy5lbnRlciwgdGhpcykpXG4gICAgICAgIHRoaXMuJGVsZW1lbnQub24oZXZlbnRPdXQgKyAnLicgKyB0aGlzLnR5cGUsIHRoaXMub3B0aW9ucy5zZWxlY3RvciwgJC5wcm94eSh0aGlzLmxlYXZlLCB0aGlzKSlcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLm9wdGlvbnMuc2VsZWN0b3IgP1xuICAgICAgKHRoaXMuX29wdGlvbnMgPSAkLmV4dGVuZCh7fSwgdGhpcy5vcHRpb25zLCB7IHRyaWdnZXI6ICdtYW51YWwnLCBzZWxlY3RvcjogJycgfSkpIDpcbiAgICAgIHRoaXMuZml4VGl0bGUoKVxuICB9XG5cbiAgVG9vbHRpcC5wcm90b3R5cGUuZ2V0RGVmYXVsdHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIFRvb2x0aXAuREVGQVVMVFNcbiAgfVxuXG4gIFRvb2x0aXAucHJvdG90eXBlLmdldE9wdGlvbnMgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSAkLmV4dGVuZCh7fSwgdGhpcy5nZXREZWZhdWx0cygpLCB0aGlzLiRlbGVtZW50LmRhdGEoKSwgb3B0aW9ucylcblxuICAgIGlmIChvcHRpb25zLmRlbGF5ICYmIHR5cGVvZiBvcHRpb25zLmRlbGF5ID09ICdudW1iZXInKSB7XG4gICAgICBvcHRpb25zLmRlbGF5ID0ge1xuICAgICAgICBzaG93OiBvcHRpb25zLmRlbGF5LFxuICAgICAgICBoaWRlOiBvcHRpb25zLmRlbGF5XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG9wdGlvbnNcbiAgfVxuXG4gIFRvb2x0aXAucHJvdG90eXBlLmdldERlbGVnYXRlT3B0aW9ucyA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgb3B0aW9ucyAgPSB7fVxuICAgIHZhciBkZWZhdWx0cyA9IHRoaXMuZ2V0RGVmYXVsdHMoKVxuXG4gICAgdGhpcy5fb3B0aW9ucyAmJiAkLmVhY2godGhpcy5fb3B0aW9ucywgZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcbiAgICAgIGlmIChkZWZhdWx0c1trZXldICE9IHZhbHVlKSBvcHRpb25zW2tleV0gPSB2YWx1ZVxuICAgIH0pXG5cbiAgICByZXR1cm4gb3B0aW9uc1xuICB9XG5cbiAgVG9vbHRpcC5wcm90b3R5cGUuZW50ZXIgPSBmdW5jdGlvbiAob2JqKSB7XG4gICAgdmFyIHNlbGYgPSBvYmogaW5zdGFuY2VvZiB0aGlzLmNvbnN0cnVjdG9yID9cbiAgICAgIG9iaiA6ICQob2JqLmN1cnJlbnRUYXJnZXQpLmRhdGEoJ2JzLicgKyB0aGlzLnR5cGUpXG5cbiAgICBpZiAoIXNlbGYpIHtcbiAgICAgIHNlbGYgPSBuZXcgdGhpcy5jb25zdHJ1Y3RvcihvYmouY3VycmVudFRhcmdldCwgdGhpcy5nZXREZWxlZ2F0ZU9wdGlvbnMoKSlcbiAgICAgICQob2JqLmN1cnJlbnRUYXJnZXQpLmRhdGEoJ2JzLicgKyB0aGlzLnR5cGUsIHNlbGYpXG4gICAgfVxuXG4gICAgaWYgKG9iaiBpbnN0YW5jZW9mICQuRXZlbnQpIHtcbiAgICAgIHNlbGYuaW5TdGF0ZVtvYmoudHlwZSA9PSAnZm9jdXNpbicgPyAnZm9jdXMnIDogJ2hvdmVyJ10gPSB0cnVlXG4gICAgfVxuXG4gICAgaWYgKHNlbGYudGlwKCkuaGFzQ2xhc3MoJ2luJykgfHwgc2VsZi5ob3ZlclN0YXRlID09ICdpbicpIHtcbiAgICAgIHNlbGYuaG92ZXJTdGF0ZSA9ICdpbidcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGNsZWFyVGltZW91dChzZWxmLnRpbWVvdXQpXG5cbiAgICBzZWxmLmhvdmVyU3RhdGUgPSAnaW4nXG5cbiAgICBpZiAoIXNlbGYub3B0aW9ucy5kZWxheSB8fCAhc2VsZi5vcHRpb25zLmRlbGF5LnNob3cpIHJldHVybiBzZWxmLnNob3coKVxuXG4gICAgc2VsZi50aW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAoc2VsZi5ob3ZlclN0YXRlID09ICdpbicpIHNlbGYuc2hvdygpXG4gICAgfSwgc2VsZi5vcHRpb25zLmRlbGF5LnNob3cpXG4gIH1cblxuICBUb29sdGlwLnByb3RvdHlwZS5pc0luU3RhdGVUcnVlID0gZnVuY3Rpb24gKCkge1xuICAgIGZvciAodmFyIGtleSBpbiB0aGlzLmluU3RhdGUpIHtcbiAgICAgIGlmICh0aGlzLmluU3RhdGVba2V5XSkgcmV0dXJuIHRydWVcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuXG4gIFRvb2x0aXAucHJvdG90eXBlLmxlYXZlID0gZnVuY3Rpb24gKG9iaikge1xuICAgIHZhciBzZWxmID0gb2JqIGluc3RhbmNlb2YgdGhpcy5jb25zdHJ1Y3RvciA/XG4gICAgICBvYmogOiAkKG9iai5jdXJyZW50VGFyZ2V0KS5kYXRhKCdicy4nICsgdGhpcy50eXBlKVxuXG4gICAgaWYgKCFzZWxmKSB7XG4gICAgICBzZWxmID0gbmV3IHRoaXMuY29uc3RydWN0b3Iob2JqLmN1cnJlbnRUYXJnZXQsIHRoaXMuZ2V0RGVsZWdhdGVPcHRpb25zKCkpXG4gICAgICAkKG9iai5jdXJyZW50VGFyZ2V0KS5kYXRhKCdicy4nICsgdGhpcy50eXBlLCBzZWxmKVxuICAgIH1cblxuICAgIGlmIChvYmogaW5zdGFuY2VvZiAkLkV2ZW50KSB7XG4gICAgICBzZWxmLmluU3RhdGVbb2JqLnR5cGUgPT0gJ2ZvY3Vzb3V0JyA/ICdmb2N1cycgOiAnaG92ZXInXSA9IGZhbHNlXG4gICAgfVxuXG4gICAgaWYgKHNlbGYuaXNJblN0YXRlVHJ1ZSgpKSByZXR1cm5cblxuICAgIGNsZWFyVGltZW91dChzZWxmLnRpbWVvdXQpXG5cbiAgICBzZWxmLmhvdmVyU3RhdGUgPSAnb3V0J1xuXG4gICAgaWYgKCFzZWxmLm9wdGlvbnMuZGVsYXkgfHwgIXNlbGYub3B0aW9ucy5kZWxheS5oaWRlKSByZXR1cm4gc2VsZi5oaWRlKClcblxuICAgIHNlbGYudGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKHNlbGYuaG92ZXJTdGF0ZSA9PSAnb3V0Jykgc2VsZi5oaWRlKClcbiAgICB9LCBzZWxmLm9wdGlvbnMuZGVsYXkuaGlkZSlcbiAgfVxuXG4gIFRvb2x0aXAucHJvdG90eXBlLnNob3cgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGUgPSAkLkV2ZW50KCdzaG93LmJzLicgKyB0aGlzLnR5cGUpXG5cbiAgICBpZiAodGhpcy5oYXNDb250ZW50KCkgJiYgdGhpcy5lbmFibGVkKSB7XG4gICAgICB0aGlzLiRlbGVtZW50LnRyaWdnZXIoZSlcblxuICAgICAgdmFyIGluRG9tID0gJC5jb250YWlucyh0aGlzLiRlbGVtZW50WzBdLm93bmVyRG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LCB0aGlzLiRlbGVtZW50WzBdKVxuICAgICAgaWYgKGUuaXNEZWZhdWx0UHJldmVudGVkKCkgfHwgIWluRG9tKSByZXR1cm5cbiAgICAgIHZhciB0aGF0ID0gdGhpc1xuXG4gICAgICB2YXIgJHRpcCA9IHRoaXMudGlwKClcblxuICAgICAgdmFyIHRpcElkID0gdGhpcy5nZXRVSUQodGhpcy50eXBlKVxuXG4gICAgICB0aGlzLnNldENvbnRlbnQoKVxuICAgICAgJHRpcC5hdHRyKCdpZCcsIHRpcElkKVxuICAgICAgdGhpcy4kZWxlbWVudC5hdHRyKCdhcmlhLWRlc2NyaWJlZGJ5JywgdGlwSWQpXG5cbiAgICAgIGlmICh0aGlzLm9wdGlvbnMuYW5pbWF0aW9uKSAkdGlwLmFkZENsYXNzKCdmYWRlJylcblxuICAgICAgdmFyIHBsYWNlbWVudCA9IHR5cGVvZiB0aGlzLm9wdGlvbnMucGxhY2VtZW50ID09ICdmdW5jdGlvbicgP1xuICAgICAgICB0aGlzLm9wdGlvbnMucGxhY2VtZW50LmNhbGwodGhpcywgJHRpcFswXSwgdGhpcy4kZWxlbWVudFswXSkgOlxuICAgICAgICB0aGlzLm9wdGlvbnMucGxhY2VtZW50XG5cbiAgICAgIHZhciBhdXRvVG9rZW4gPSAvXFxzP2F1dG8/XFxzPy9pXG4gICAgICB2YXIgYXV0b1BsYWNlID0gYXV0b1Rva2VuLnRlc3QocGxhY2VtZW50KVxuICAgICAgaWYgKGF1dG9QbGFjZSkgcGxhY2VtZW50ID0gcGxhY2VtZW50LnJlcGxhY2UoYXV0b1Rva2VuLCAnJykgfHwgJ3RvcCdcblxuICAgICAgJHRpcFxuICAgICAgICAuZGV0YWNoKClcbiAgICAgICAgLmNzcyh7IHRvcDogMCwgbGVmdDogMCwgZGlzcGxheTogJ2Jsb2NrJyB9KVxuICAgICAgICAuYWRkQ2xhc3MocGxhY2VtZW50KVxuICAgICAgICAuZGF0YSgnYnMuJyArIHRoaXMudHlwZSwgdGhpcylcblxuICAgICAgdGhpcy5vcHRpb25zLmNvbnRhaW5lciA/ICR0aXAuYXBwZW5kVG8odGhpcy5vcHRpb25zLmNvbnRhaW5lcikgOiAkdGlwLmluc2VydEFmdGVyKHRoaXMuJGVsZW1lbnQpXG4gICAgICB0aGlzLiRlbGVtZW50LnRyaWdnZXIoJ2luc2VydGVkLmJzLicgKyB0aGlzLnR5cGUpXG5cbiAgICAgIHZhciBwb3MgICAgICAgICAgPSB0aGlzLmdldFBvc2l0aW9uKClcbiAgICAgIHZhciBhY3R1YWxXaWR0aCAgPSAkdGlwWzBdLm9mZnNldFdpZHRoXG4gICAgICB2YXIgYWN0dWFsSGVpZ2h0ID0gJHRpcFswXS5vZmZzZXRIZWlnaHRcblxuICAgICAgaWYgKGF1dG9QbGFjZSkge1xuICAgICAgICB2YXIgb3JnUGxhY2VtZW50ID0gcGxhY2VtZW50XG4gICAgICAgIHZhciB2aWV3cG9ydERpbSA9IHRoaXMuZ2V0UG9zaXRpb24odGhpcy4kdmlld3BvcnQpXG5cbiAgICAgICAgcGxhY2VtZW50ID0gcGxhY2VtZW50ID09ICdib3R0b20nICYmIHBvcy5ib3R0b20gKyBhY3R1YWxIZWlnaHQgPiB2aWV3cG9ydERpbS5ib3R0b20gPyAndG9wJyAgICA6XG4gICAgICAgICAgICAgICAgICAgIHBsYWNlbWVudCA9PSAndG9wJyAgICAmJiBwb3MudG9wICAgIC0gYWN0dWFsSGVpZ2h0IDwgdmlld3BvcnREaW0udG9wICAgID8gJ2JvdHRvbScgOlxuICAgICAgICAgICAgICAgICAgICBwbGFjZW1lbnQgPT0gJ3JpZ2h0JyAgJiYgcG9zLnJpZ2h0ICArIGFjdHVhbFdpZHRoICA+IHZpZXdwb3J0RGltLndpZHRoICA/ICdsZWZ0JyAgIDpcbiAgICAgICAgICAgICAgICAgICAgcGxhY2VtZW50ID09ICdsZWZ0JyAgICYmIHBvcy5sZWZ0ICAgLSBhY3R1YWxXaWR0aCAgPCB2aWV3cG9ydERpbS5sZWZ0ICAgPyAncmlnaHQnICA6XG4gICAgICAgICAgICAgICAgICAgIHBsYWNlbWVudFxuXG4gICAgICAgICR0aXBcbiAgICAgICAgICAucmVtb3ZlQ2xhc3Mob3JnUGxhY2VtZW50KVxuICAgICAgICAgIC5hZGRDbGFzcyhwbGFjZW1lbnQpXG4gICAgICB9XG5cbiAgICAgIHZhciBjYWxjdWxhdGVkT2Zmc2V0ID0gdGhpcy5nZXRDYWxjdWxhdGVkT2Zmc2V0KHBsYWNlbWVudCwgcG9zLCBhY3R1YWxXaWR0aCwgYWN0dWFsSGVpZ2h0KVxuXG4gICAgICB0aGlzLmFwcGx5UGxhY2VtZW50KGNhbGN1bGF0ZWRPZmZzZXQsIHBsYWNlbWVudClcblxuICAgICAgdmFyIGNvbXBsZXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgcHJldkhvdmVyU3RhdGUgPSB0aGF0LmhvdmVyU3RhdGVcbiAgICAgICAgdGhhdC4kZWxlbWVudC50cmlnZ2VyKCdzaG93bi5icy4nICsgdGhhdC50eXBlKVxuICAgICAgICB0aGF0LmhvdmVyU3RhdGUgPSBudWxsXG5cbiAgICAgICAgaWYgKHByZXZIb3ZlclN0YXRlID09ICdvdXQnKSB0aGF0LmxlYXZlKHRoYXQpXG4gICAgICB9XG5cbiAgICAgICQuc3VwcG9ydC50cmFuc2l0aW9uICYmIHRoaXMuJHRpcC5oYXNDbGFzcygnZmFkZScpID9cbiAgICAgICAgJHRpcFxuICAgICAgICAgIC5vbmUoJ2JzVHJhbnNpdGlvbkVuZCcsIGNvbXBsZXRlKVxuICAgICAgICAgIC5lbXVsYXRlVHJhbnNpdGlvbkVuZChUb29sdGlwLlRSQU5TSVRJT05fRFVSQVRJT04pIDpcbiAgICAgICAgY29tcGxldGUoKVxuICAgIH1cbiAgfVxuXG4gIFRvb2x0aXAucHJvdG90eXBlLmFwcGx5UGxhY2VtZW50ID0gZnVuY3Rpb24gKG9mZnNldCwgcGxhY2VtZW50KSB7XG4gICAgdmFyICR0aXAgICA9IHRoaXMudGlwKClcbiAgICB2YXIgd2lkdGggID0gJHRpcFswXS5vZmZzZXRXaWR0aFxuICAgIHZhciBoZWlnaHQgPSAkdGlwWzBdLm9mZnNldEhlaWdodFxuXG4gICAgLy8gbWFudWFsbHkgcmVhZCBtYXJnaW5zIGJlY2F1c2UgZ2V0Qm91bmRpbmdDbGllbnRSZWN0IGluY2x1ZGVzIGRpZmZlcmVuY2VcbiAgICB2YXIgbWFyZ2luVG9wID0gcGFyc2VJbnQoJHRpcC5jc3MoJ21hcmdpbi10b3AnKSwgMTApXG4gICAgdmFyIG1hcmdpbkxlZnQgPSBwYXJzZUludCgkdGlwLmNzcygnbWFyZ2luLWxlZnQnKSwgMTApXG5cbiAgICAvLyB3ZSBtdXN0IGNoZWNrIGZvciBOYU4gZm9yIGllIDgvOVxuICAgIGlmIChpc05hTihtYXJnaW5Ub3ApKSAgbWFyZ2luVG9wICA9IDBcbiAgICBpZiAoaXNOYU4obWFyZ2luTGVmdCkpIG1hcmdpbkxlZnQgPSAwXG5cbiAgICBvZmZzZXQudG9wICArPSBtYXJnaW5Ub3BcbiAgICBvZmZzZXQubGVmdCArPSBtYXJnaW5MZWZ0XG5cbiAgICAvLyAkLmZuLm9mZnNldCBkb2Vzbid0IHJvdW5kIHBpeGVsIHZhbHVlc1xuICAgIC8vIHNvIHdlIHVzZSBzZXRPZmZzZXQgZGlyZWN0bHkgd2l0aCBvdXIgb3duIGZ1bmN0aW9uIEItMFxuICAgICQub2Zmc2V0LnNldE9mZnNldCgkdGlwWzBdLCAkLmV4dGVuZCh7XG4gICAgICB1c2luZzogZnVuY3Rpb24gKHByb3BzKSB7XG4gICAgICAgICR0aXAuY3NzKHtcbiAgICAgICAgICB0b3A6IE1hdGgucm91bmQocHJvcHMudG9wKSxcbiAgICAgICAgICBsZWZ0OiBNYXRoLnJvdW5kKHByb3BzLmxlZnQpXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfSwgb2Zmc2V0KSwgMClcblxuICAgICR0aXAuYWRkQ2xhc3MoJ2luJylcblxuICAgIC8vIGNoZWNrIHRvIHNlZSBpZiBwbGFjaW5nIHRpcCBpbiBuZXcgb2Zmc2V0IGNhdXNlZCB0aGUgdGlwIHRvIHJlc2l6ZSBpdHNlbGZcbiAgICB2YXIgYWN0dWFsV2lkdGggID0gJHRpcFswXS5vZmZzZXRXaWR0aFxuICAgIHZhciBhY3R1YWxIZWlnaHQgPSAkdGlwWzBdLm9mZnNldEhlaWdodFxuXG4gICAgaWYgKHBsYWNlbWVudCA9PSAndG9wJyAmJiBhY3R1YWxIZWlnaHQgIT0gaGVpZ2h0KSB7XG4gICAgICBvZmZzZXQudG9wID0gb2Zmc2V0LnRvcCArIGhlaWdodCAtIGFjdHVhbEhlaWdodFxuICAgIH1cblxuICAgIHZhciBkZWx0YSA9IHRoaXMuZ2V0Vmlld3BvcnRBZGp1c3RlZERlbHRhKHBsYWNlbWVudCwgb2Zmc2V0LCBhY3R1YWxXaWR0aCwgYWN0dWFsSGVpZ2h0KVxuXG4gICAgaWYgKGRlbHRhLmxlZnQpIG9mZnNldC5sZWZ0ICs9IGRlbHRhLmxlZnRcbiAgICBlbHNlIG9mZnNldC50b3AgKz0gZGVsdGEudG9wXG5cbiAgICB2YXIgaXNWZXJ0aWNhbCAgICAgICAgICA9IC90b3B8Ym90dG9tLy50ZXN0KHBsYWNlbWVudClcbiAgICB2YXIgYXJyb3dEZWx0YSAgICAgICAgICA9IGlzVmVydGljYWwgPyBkZWx0YS5sZWZ0ICogMiAtIHdpZHRoICsgYWN0dWFsV2lkdGggOiBkZWx0YS50b3AgKiAyIC0gaGVpZ2h0ICsgYWN0dWFsSGVpZ2h0XG4gICAgdmFyIGFycm93T2Zmc2V0UG9zaXRpb24gPSBpc1ZlcnRpY2FsID8gJ29mZnNldFdpZHRoJyA6ICdvZmZzZXRIZWlnaHQnXG5cbiAgICAkdGlwLm9mZnNldChvZmZzZXQpXG4gICAgdGhpcy5yZXBsYWNlQXJyb3coYXJyb3dEZWx0YSwgJHRpcFswXVthcnJvd09mZnNldFBvc2l0aW9uXSwgaXNWZXJ0aWNhbClcbiAgfVxuXG4gIFRvb2x0aXAucHJvdG90eXBlLnJlcGxhY2VBcnJvdyA9IGZ1bmN0aW9uIChkZWx0YSwgZGltZW5zaW9uLCBpc1ZlcnRpY2FsKSB7XG4gICAgdGhpcy5hcnJvdygpXG4gICAgICAuY3NzKGlzVmVydGljYWwgPyAnbGVmdCcgOiAndG9wJywgNTAgKiAoMSAtIGRlbHRhIC8gZGltZW5zaW9uKSArICclJylcbiAgICAgIC5jc3MoaXNWZXJ0aWNhbCA/ICd0b3AnIDogJ2xlZnQnLCAnJylcbiAgfVxuXG4gIFRvb2x0aXAucHJvdG90eXBlLnNldENvbnRlbnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyICR0aXAgID0gdGhpcy50aXAoKVxuICAgIHZhciB0aXRsZSA9IHRoaXMuZ2V0VGl0bGUoKVxuXG4gICAgJHRpcC5maW5kKCcudG9vbHRpcC1pbm5lcicpW3RoaXMub3B0aW9ucy5odG1sID8gJ2h0bWwnIDogJ3RleHQnXSh0aXRsZSlcbiAgICAkdGlwLnJlbW92ZUNsYXNzKCdmYWRlIGluIHRvcCBib3R0b20gbGVmdCByaWdodCcpXG4gIH1cblxuICBUb29sdGlwLnByb3RvdHlwZS5oaWRlID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gICAgdmFyIHRoYXQgPSB0aGlzXG4gICAgdmFyICR0aXAgPSAkKHRoaXMuJHRpcClcbiAgICB2YXIgZSAgICA9ICQuRXZlbnQoJ2hpZGUuYnMuJyArIHRoaXMudHlwZSlcblxuICAgIGZ1bmN0aW9uIGNvbXBsZXRlKCkge1xuICAgICAgaWYgKHRoYXQuaG92ZXJTdGF0ZSAhPSAnaW4nKSAkdGlwLmRldGFjaCgpXG4gICAgICBpZiAodGhhdC4kZWxlbWVudCkgeyAvLyBUT0RPOiBDaGVjayB3aGV0aGVyIGd1YXJkaW5nIHRoaXMgY29kZSB3aXRoIHRoaXMgYGlmYCBpcyByZWFsbHkgbmVjZXNzYXJ5LlxuICAgICAgICB0aGF0LiRlbGVtZW50XG4gICAgICAgICAgLnJlbW92ZUF0dHIoJ2FyaWEtZGVzY3JpYmVkYnknKVxuICAgICAgICAgIC50cmlnZ2VyKCdoaWRkZW4uYnMuJyArIHRoYXQudHlwZSlcbiAgICAgIH1cbiAgICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrKClcbiAgICB9XG5cbiAgICB0aGlzLiRlbGVtZW50LnRyaWdnZXIoZSlcblxuICAgIGlmIChlLmlzRGVmYXVsdFByZXZlbnRlZCgpKSByZXR1cm5cblxuICAgICR0aXAucmVtb3ZlQ2xhc3MoJ2luJylcblxuICAgICQuc3VwcG9ydC50cmFuc2l0aW9uICYmICR0aXAuaGFzQ2xhc3MoJ2ZhZGUnKSA/XG4gICAgICAkdGlwXG4gICAgICAgIC5vbmUoJ2JzVHJhbnNpdGlvbkVuZCcsIGNvbXBsZXRlKVxuICAgICAgICAuZW11bGF0ZVRyYW5zaXRpb25FbmQoVG9vbHRpcC5UUkFOU0lUSU9OX0RVUkFUSU9OKSA6XG4gICAgICBjb21wbGV0ZSgpXG5cbiAgICB0aGlzLmhvdmVyU3RhdGUgPSBudWxsXG5cbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgVG9vbHRpcC5wcm90b3R5cGUuZml4VGl0bGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyICRlID0gdGhpcy4kZWxlbWVudFxuICAgIGlmICgkZS5hdHRyKCd0aXRsZScpIHx8IHR5cGVvZiAkZS5hdHRyKCdkYXRhLW9yaWdpbmFsLXRpdGxlJykgIT0gJ3N0cmluZycpIHtcbiAgICAgICRlLmF0dHIoJ2RhdGEtb3JpZ2luYWwtdGl0bGUnLCAkZS5hdHRyKCd0aXRsZScpIHx8ICcnKS5hdHRyKCd0aXRsZScsICcnKVxuICAgIH1cbiAgfVxuXG4gIFRvb2x0aXAucHJvdG90eXBlLmhhc0NvbnRlbnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0VGl0bGUoKVxuICB9XG5cbiAgVG9vbHRpcC5wcm90b3R5cGUuZ2V0UG9zaXRpb24gPSBmdW5jdGlvbiAoJGVsZW1lbnQpIHtcbiAgICAkZWxlbWVudCAgID0gJGVsZW1lbnQgfHwgdGhpcy4kZWxlbWVudFxuXG4gICAgdmFyIGVsICAgICA9ICRlbGVtZW50WzBdXG4gICAgdmFyIGlzQm9keSA9IGVsLnRhZ05hbWUgPT0gJ0JPRFknXG5cbiAgICB2YXIgZWxSZWN0ICAgID0gZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcbiAgICBpZiAoZWxSZWN0LndpZHRoID09IG51bGwpIHtcbiAgICAgIC8vIHdpZHRoIGFuZCBoZWlnaHQgYXJlIG1pc3NpbmcgaW4gSUU4LCBzbyBjb21wdXRlIHRoZW0gbWFudWFsbHk7IHNlZSBodHRwczovL2dpdGh1Yi5jb20vdHdicy9ib290c3RyYXAvaXNzdWVzLzE0MDkzXG4gICAgICBlbFJlY3QgPSAkLmV4dGVuZCh7fSwgZWxSZWN0LCB7IHdpZHRoOiBlbFJlY3QucmlnaHQgLSBlbFJlY3QubGVmdCwgaGVpZ2h0OiBlbFJlY3QuYm90dG9tIC0gZWxSZWN0LnRvcCB9KVxuICAgIH1cbiAgICB2YXIgaXNTdmcgPSB3aW5kb3cuU1ZHRWxlbWVudCAmJiBlbCBpbnN0YW5jZW9mIHdpbmRvdy5TVkdFbGVtZW50XG4gICAgLy8gQXZvaWQgdXNpbmcgJC5vZmZzZXQoKSBvbiBTVkdzIHNpbmNlIGl0IGdpdmVzIGluY29ycmVjdCByZXN1bHRzIGluIGpRdWVyeSAzLlxuICAgIC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vdHdicy9ib290c3RyYXAvaXNzdWVzLzIwMjgwXG4gICAgdmFyIGVsT2Zmc2V0ICA9IGlzQm9keSA/IHsgdG9wOiAwLCBsZWZ0OiAwIH0gOiAoaXNTdmcgPyBudWxsIDogJGVsZW1lbnQub2Zmc2V0KCkpXG4gICAgdmFyIHNjcm9sbCAgICA9IHsgc2Nyb2xsOiBpc0JvZHkgPyBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wIHx8IGRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wIDogJGVsZW1lbnQuc2Nyb2xsVG9wKCkgfVxuICAgIHZhciBvdXRlckRpbXMgPSBpc0JvZHkgPyB7IHdpZHRoOiAkKHdpbmRvdykud2lkdGgoKSwgaGVpZ2h0OiAkKHdpbmRvdykuaGVpZ2h0KCkgfSA6IG51bGxcblxuICAgIHJldHVybiAkLmV4dGVuZCh7fSwgZWxSZWN0LCBzY3JvbGwsIG91dGVyRGltcywgZWxPZmZzZXQpXG4gIH1cblxuICBUb29sdGlwLnByb3RvdHlwZS5nZXRDYWxjdWxhdGVkT2Zmc2V0ID0gZnVuY3Rpb24gKHBsYWNlbWVudCwgcG9zLCBhY3R1YWxXaWR0aCwgYWN0dWFsSGVpZ2h0KSB7XG4gICAgcmV0dXJuIHBsYWNlbWVudCA9PSAnYm90dG9tJyA/IHsgdG9wOiBwb3MudG9wICsgcG9zLmhlaWdodCwgICBsZWZ0OiBwb3MubGVmdCArIHBvcy53aWR0aCAvIDIgLSBhY3R1YWxXaWR0aCAvIDIgfSA6XG4gICAgICAgICAgIHBsYWNlbWVudCA9PSAndG9wJyAgICA/IHsgdG9wOiBwb3MudG9wIC0gYWN0dWFsSGVpZ2h0LCBsZWZ0OiBwb3MubGVmdCArIHBvcy53aWR0aCAvIDIgLSBhY3R1YWxXaWR0aCAvIDIgfSA6XG4gICAgICAgICAgIHBsYWNlbWVudCA9PSAnbGVmdCcgICA/IHsgdG9wOiBwb3MudG9wICsgcG9zLmhlaWdodCAvIDIgLSBhY3R1YWxIZWlnaHQgLyAyLCBsZWZ0OiBwb3MubGVmdCAtIGFjdHVhbFdpZHRoIH0gOlxuICAgICAgICAvKiBwbGFjZW1lbnQgPT0gJ3JpZ2h0JyAqLyB7IHRvcDogcG9zLnRvcCArIHBvcy5oZWlnaHQgLyAyIC0gYWN0dWFsSGVpZ2h0IC8gMiwgbGVmdDogcG9zLmxlZnQgKyBwb3Mud2lkdGggfVxuXG4gIH1cblxuICBUb29sdGlwLnByb3RvdHlwZS5nZXRWaWV3cG9ydEFkanVzdGVkRGVsdGEgPSBmdW5jdGlvbiAocGxhY2VtZW50LCBwb3MsIGFjdHVhbFdpZHRoLCBhY3R1YWxIZWlnaHQpIHtcbiAgICB2YXIgZGVsdGEgPSB7IHRvcDogMCwgbGVmdDogMCB9XG4gICAgaWYgKCF0aGlzLiR2aWV3cG9ydCkgcmV0dXJuIGRlbHRhXG5cbiAgICB2YXIgdmlld3BvcnRQYWRkaW5nID0gdGhpcy5vcHRpb25zLnZpZXdwb3J0ICYmIHRoaXMub3B0aW9ucy52aWV3cG9ydC5wYWRkaW5nIHx8IDBcbiAgICB2YXIgdmlld3BvcnREaW1lbnNpb25zID0gdGhpcy5nZXRQb3NpdGlvbih0aGlzLiR2aWV3cG9ydClcblxuICAgIGlmICgvcmlnaHR8bGVmdC8udGVzdChwbGFjZW1lbnQpKSB7XG4gICAgICB2YXIgdG9wRWRnZU9mZnNldCAgICA9IHBvcy50b3AgLSB2aWV3cG9ydFBhZGRpbmcgLSB2aWV3cG9ydERpbWVuc2lvbnMuc2Nyb2xsXG4gICAgICB2YXIgYm90dG9tRWRnZU9mZnNldCA9IHBvcy50b3AgKyB2aWV3cG9ydFBhZGRpbmcgLSB2aWV3cG9ydERpbWVuc2lvbnMuc2Nyb2xsICsgYWN0dWFsSGVpZ2h0XG4gICAgICBpZiAodG9wRWRnZU9mZnNldCA8IHZpZXdwb3J0RGltZW5zaW9ucy50b3ApIHsgLy8gdG9wIG92ZXJmbG93XG4gICAgICAgIGRlbHRhLnRvcCA9IHZpZXdwb3J0RGltZW5zaW9ucy50b3AgLSB0b3BFZGdlT2Zmc2V0XG4gICAgICB9IGVsc2UgaWYgKGJvdHRvbUVkZ2VPZmZzZXQgPiB2aWV3cG9ydERpbWVuc2lvbnMudG9wICsgdmlld3BvcnREaW1lbnNpb25zLmhlaWdodCkgeyAvLyBib3R0b20gb3ZlcmZsb3dcbiAgICAgICAgZGVsdGEudG9wID0gdmlld3BvcnREaW1lbnNpb25zLnRvcCArIHZpZXdwb3J0RGltZW5zaW9ucy5oZWlnaHQgLSBib3R0b21FZGdlT2Zmc2V0XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBsZWZ0RWRnZU9mZnNldCAgPSBwb3MubGVmdCAtIHZpZXdwb3J0UGFkZGluZ1xuICAgICAgdmFyIHJpZ2h0RWRnZU9mZnNldCA9IHBvcy5sZWZ0ICsgdmlld3BvcnRQYWRkaW5nICsgYWN0dWFsV2lkdGhcbiAgICAgIGlmIChsZWZ0RWRnZU9mZnNldCA8IHZpZXdwb3J0RGltZW5zaW9ucy5sZWZ0KSB7IC8vIGxlZnQgb3ZlcmZsb3dcbiAgICAgICAgZGVsdGEubGVmdCA9IHZpZXdwb3J0RGltZW5zaW9ucy5sZWZ0IC0gbGVmdEVkZ2VPZmZzZXRcbiAgICAgIH0gZWxzZSBpZiAocmlnaHRFZGdlT2Zmc2V0ID4gdmlld3BvcnREaW1lbnNpb25zLnJpZ2h0KSB7IC8vIHJpZ2h0IG92ZXJmbG93XG4gICAgICAgIGRlbHRhLmxlZnQgPSB2aWV3cG9ydERpbWVuc2lvbnMubGVmdCArIHZpZXdwb3J0RGltZW5zaW9ucy53aWR0aCAtIHJpZ2h0RWRnZU9mZnNldFxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBkZWx0YVxuICB9XG5cbiAgVG9vbHRpcC5wcm90b3R5cGUuZ2V0VGl0bGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHRpdGxlXG4gICAgdmFyICRlID0gdGhpcy4kZWxlbWVudFxuICAgIHZhciBvICA9IHRoaXMub3B0aW9uc1xuXG4gICAgdGl0bGUgPSAkZS5hdHRyKCdkYXRhLW9yaWdpbmFsLXRpdGxlJylcbiAgICAgIHx8ICh0eXBlb2Ygby50aXRsZSA9PSAnZnVuY3Rpb24nID8gby50aXRsZS5jYWxsKCRlWzBdKSA6ICBvLnRpdGxlKVxuXG4gICAgcmV0dXJuIHRpdGxlXG4gIH1cblxuICBUb29sdGlwLnByb3RvdHlwZS5nZXRVSUQgPSBmdW5jdGlvbiAocHJlZml4KSB7XG4gICAgZG8gcHJlZml4ICs9IH5+KE1hdGgucmFuZG9tKCkgKiAxMDAwMDAwKVxuICAgIHdoaWxlIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChwcmVmaXgpKVxuICAgIHJldHVybiBwcmVmaXhcbiAgfVxuXG4gIFRvb2x0aXAucHJvdG90eXBlLnRpcCA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoIXRoaXMuJHRpcCkge1xuICAgICAgdGhpcy4kdGlwID0gJCh0aGlzLm9wdGlvbnMudGVtcGxhdGUpXG4gICAgICBpZiAodGhpcy4kdGlwLmxlbmd0aCAhPSAxKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcih0aGlzLnR5cGUgKyAnIGB0ZW1wbGF0ZWAgb3B0aW9uIG11c3QgY29uc2lzdCBvZiBleGFjdGx5IDEgdG9wLWxldmVsIGVsZW1lbnQhJylcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuJHRpcFxuICB9XG5cbiAgVG9vbHRpcC5wcm90b3R5cGUuYXJyb3cgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuICh0aGlzLiRhcnJvdyA9IHRoaXMuJGFycm93IHx8IHRoaXMudGlwKCkuZmluZCgnLnRvb2x0aXAtYXJyb3cnKSlcbiAgfVxuXG4gIFRvb2x0aXAucHJvdG90eXBlLmVuYWJsZSA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmVuYWJsZWQgPSB0cnVlXG4gIH1cblxuICBUb29sdGlwLnByb3RvdHlwZS5kaXNhYmxlID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZW5hYmxlZCA9IGZhbHNlXG4gIH1cblxuICBUb29sdGlwLnByb3RvdHlwZS50b2dnbGVFbmFibGVkID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZW5hYmxlZCA9ICF0aGlzLmVuYWJsZWRcbiAgfVxuXG4gIFRvb2x0aXAucHJvdG90eXBlLnRvZ2dsZSA9IGZ1bmN0aW9uIChlKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzXG4gICAgaWYgKGUpIHtcbiAgICAgIHNlbGYgPSAkKGUuY3VycmVudFRhcmdldCkuZGF0YSgnYnMuJyArIHRoaXMudHlwZSlcbiAgICAgIGlmICghc2VsZikge1xuICAgICAgICBzZWxmID0gbmV3IHRoaXMuY29uc3RydWN0b3IoZS5jdXJyZW50VGFyZ2V0LCB0aGlzLmdldERlbGVnYXRlT3B0aW9ucygpKVxuICAgICAgICAkKGUuY3VycmVudFRhcmdldCkuZGF0YSgnYnMuJyArIHRoaXMudHlwZSwgc2VsZilcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoZSkge1xuICAgICAgc2VsZi5pblN0YXRlLmNsaWNrID0gIXNlbGYuaW5TdGF0ZS5jbGlja1xuICAgICAgaWYgKHNlbGYuaXNJblN0YXRlVHJ1ZSgpKSBzZWxmLmVudGVyKHNlbGYpXG4gICAgICBlbHNlIHNlbGYubGVhdmUoc2VsZilcbiAgICB9IGVsc2Uge1xuICAgICAgc2VsZi50aXAoKS5oYXNDbGFzcygnaW4nKSA/IHNlbGYubGVhdmUoc2VsZikgOiBzZWxmLmVudGVyKHNlbGYpXG4gICAgfVxuICB9XG5cbiAgVG9vbHRpcC5wcm90b3R5cGUuZGVzdHJveSA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgdGhhdCA9IHRoaXNcbiAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lb3V0KVxuICAgIHRoaXMuaGlkZShmdW5jdGlvbiAoKSB7XG4gICAgICB0aGF0LiRlbGVtZW50Lm9mZignLicgKyB0aGF0LnR5cGUpLnJlbW92ZURhdGEoJ2JzLicgKyB0aGF0LnR5cGUpXG4gICAgICBpZiAodGhhdC4kdGlwKSB7XG4gICAgICAgIHRoYXQuJHRpcC5kZXRhY2goKVxuICAgICAgfVxuICAgICAgdGhhdC4kdGlwID0gbnVsbFxuICAgICAgdGhhdC4kYXJyb3cgPSBudWxsXG4gICAgICB0aGF0LiR2aWV3cG9ydCA9IG51bGxcbiAgICAgIHRoYXQuJGVsZW1lbnQgPSBudWxsXG4gICAgfSlcbiAgfVxuXG5cbiAgLy8gVE9PTFRJUCBQTFVHSU4gREVGSU5JVElPTlxuICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09XG5cbiAgZnVuY3Rpb24gUGx1Z2luKG9wdGlvbikge1xuICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgdmFyICR0aGlzICAgPSAkKHRoaXMpXG4gICAgICB2YXIgZGF0YSAgICA9ICR0aGlzLmRhdGEoJ2JzLnRvb2x0aXAnKVxuICAgICAgdmFyIG9wdGlvbnMgPSB0eXBlb2Ygb3B0aW9uID09ICdvYmplY3QnICYmIG9wdGlvblxuXG4gICAgICBpZiAoIWRhdGEgJiYgL2Rlc3Ryb3l8aGlkZS8udGVzdChvcHRpb24pKSByZXR1cm5cbiAgICAgIGlmICghZGF0YSkgJHRoaXMuZGF0YSgnYnMudG9vbHRpcCcsIChkYXRhID0gbmV3IFRvb2x0aXAodGhpcywgb3B0aW9ucykpKVxuICAgICAgaWYgKHR5cGVvZiBvcHRpb24gPT0gJ3N0cmluZycpIGRhdGFbb3B0aW9uXSgpXG4gICAgfSlcbiAgfVxuXG4gIHZhciBvbGQgPSAkLmZuLnRvb2x0aXBcblxuICAkLmZuLnRvb2x0aXAgICAgICAgICAgICAgPSBQbHVnaW5cbiAgJC5mbi50b29sdGlwLkNvbnN0cnVjdG9yID0gVG9vbHRpcFxuXG5cbiAgLy8gVE9PTFRJUCBOTyBDT05GTElDVFxuICAvLyA9PT09PT09PT09PT09PT09PT09XG5cbiAgJC5mbi50b29sdGlwLm5vQ29uZmxpY3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgJC5mbi50b29sdGlwID0gb2xkXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG59KGpRdWVyeSk7XG5cbi8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICogQm9vdHN0cmFwOiBwb3BvdmVyLmpzIHYzLjMuN1xuICogaHR0cDovL2dldGJvb3RzdHJhcC5jb20vamF2YXNjcmlwdC8jcG9wb3ZlcnNcbiAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICogQ29weXJpZ2h0IDIwMTEtMjAxNiBUd2l0dGVyLCBJbmMuXG4gKiBMaWNlbnNlZCB1bmRlciBNSVQgKGh0dHBzOi8vZ2l0aHViLmNvbS90d2JzL2Jvb3RzdHJhcC9ibG9iL21hc3Rlci9MSUNFTlNFKVxuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5cblxuK2Z1bmN0aW9uICgkKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICAvLyBQT1BPVkVSIFBVQkxJQyBDTEFTUyBERUZJTklUSU9OXG4gIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuICB2YXIgUG9wb3ZlciA9IGZ1bmN0aW9uIChlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgdGhpcy5pbml0KCdwb3BvdmVyJywgZWxlbWVudCwgb3B0aW9ucylcbiAgfVxuXG4gIGlmICghJC5mbi50b29sdGlwKSB0aHJvdyBuZXcgRXJyb3IoJ1BvcG92ZXIgcmVxdWlyZXMgdG9vbHRpcC5qcycpXG5cbiAgUG9wb3Zlci5WRVJTSU9OICA9ICczLjMuNydcblxuICBQb3BvdmVyLkRFRkFVTFRTID0gJC5leHRlbmQoe30sICQuZm4udG9vbHRpcC5Db25zdHJ1Y3Rvci5ERUZBVUxUUywge1xuICAgIHBsYWNlbWVudDogJ3JpZ2h0JyxcbiAgICB0cmlnZ2VyOiAnY2xpY2snLFxuICAgIGNvbnRlbnQ6ICcnLFxuICAgIHRlbXBsYXRlOiAnPGRpdiBjbGFzcz1cInBvcG92ZXJcIiByb2xlPVwidG9vbHRpcFwiPjxkaXYgY2xhc3M9XCJhcnJvd1wiPjwvZGl2PjxoMyBjbGFzcz1cInBvcG92ZXItdGl0bGVcIj48L2gzPjxkaXYgY2xhc3M9XCJwb3BvdmVyLWNvbnRlbnRcIj48L2Rpdj48L2Rpdj4nXG4gIH0pXG5cblxuICAvLyBOT1RFOiBQT1BPVkVSIEVYVEVORFMgdG9vbHRpcC5qc1xuICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4gIFBvcG92ZXIucHJvdG90eXBlID0gJC5leHRlbmQoe30sICQuZm4udG9vbHRpcC5Db25zdHJ1Y3Rvci5wcm90b3R5cGUpXG5cbiAgUG9wb3Zlci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBQb3BvdmVyXG5cbiAgUG9wb3Zlci5wcm90b3R5cGUuZ2V0RGVmYXVsdHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIFBvcG92ZXIuREVGQVVMVFNcbiAgfVxuXG4gIFBvcG92ZXIucHJvdG90eXBlLnNldENvbnRlbnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyICR0aXAgICAgPSB0aGlzLnRpcCgpXG4gICAgdmFyIHRpdGxlICAgPSB0aGlzLmdldFRpdGxlKClcbiAgICB2YXIgY29udGVudCA9IHRoaXMuZ2V0Q29udGVudCgpXG5cbiAgICAkdGlwLmZpbmQoJy5wb3BvdmVyLXRpdGxlJylbdGhpcy5vcHRpb25zLmh0bWwgPyAnaHRtbCcgOiAndGV4dCddKHRpdGxlKVxuICAgICR0aXAuZmluZCgnLnBvcG92ZXItY29udGVudCcpLmNoaWxkcmVuKCkuZGV0YWNoKCkuZW5kKClbIC8vIHdlIHVzZSBhcHBlbmQgZm9yIGh0bWwgb2JqZWN0cyB0byBtYWludGFpbiBqcyBldmVudHNcbiAgICAgIHRoaXMub3B0aW9ucy5odG1sID8gKHR5cGVvZiBjb250ZW50ID09ICdzdHJpbmcnID8gJ2h0bWwnIDogJ2FwcGVuZCcpIDogJ3RleHQnXG4gICAgXShjb250ZW50KVxuXG4gICAgJHRpcC5yZW1vdmVDbGFzcygnZmFkZSB0b3AgYm90dG9tIGxlZnQgcmlnaHQgaW4nKVxuXG4gICAgLy8gSUU4IGRvZXNuJ3QgYWNjZXB0IGhpZGluZyB2aWEgdGhlIGA6ZW1wdHlgIHBzZXVkbyBzZWxlY3Rvciwgd2UgaGF2ZSB0byBkb1xuICAgIC8vIHRoaXMgbWFudWFsbHkgYnkgY2hlY2tpbmcgdGhlIGNvbnRlbnRzLlxuICAgIGlmICghJHRpcC5maW5kKCcucG9wb3Zlci10aXRsZScpLmh0bWwoKSkgJHRpcC5maW5kKCcucG9wb3Zlci10aXRsZScpLmhpZGUoKVxuICB9XG5cbiAgUG9wb3Zlci5wcm90b3R5cGUuaGFzQ29udGVudCA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRUaXRsZSgpIHx8IHRoaXMuZ2V0Q29udGVudCgpXG4gIH1cblxuICBQb3BvdmVyLnByb3RvdHlwZS5nZXRDb250ZW50ID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciAkZSA9IHRoaXMuJGVsZW1lbnRcbiAgICB2YXIgbyAgPSB0aGlzLm9wdGlvbnNcblxuICAgIHJldHVybiAkZS5hdHRyKCdkYXRhLWNvbnRlbnQnKVxuICAgICAgfHwgKHR5cGVvZiBvLmNvbnRlbnQgPT0gJ2Z1bmN0aW9uJyA/XG4gICAgICAgICAgICBvLmNvbnRlbnQuY2FsbCgkZVswXSkgOlxuICAgICAgICAgICAgby5jb250ZW50KVxuICB9XG5cbiAgUG9wb3Zlci5wcm90b3R5cGUuYXJyb3cgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuICh0aGlzLiRhcnJvdyA9IHRoaXMuJGFycm93IHx8IHRoaXMudGlwKCkuZmluZCgnLmFycm93JykpXG4gIH1cblxuXG4gIC8vIFBPUE9WRVIgUExVR0lOIERFRklOSVRJT05cbiAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4gIGZ1bmN0aW9uIFBsdWdpbihvcHRpb24pIHtcbiAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciAkdGhpcyAgID0gJCh0aGlzKVxuICAgICAgdmFyIGRhdGEgICAgPSAkdGhpcy5kYXRhKCdicy5wb3BvdmVyJylcbiAgICAgIHZhciBvcHRpb25zID0gdHlwZW9mIG9wdGlvbiA9PSAnb2JqZWN0JyAmJiBvcHRpb25cblxuICAgICAgaWYgKCFkYXRhICYmIC9kZXN0cm95fGhpZGUvLnRlc3Qob3B0aW9uKSkgcmV0dXJuXG4gICAgICBpZiAoIWRhdGEpICR0aGlzLmRhdGEoJ2JzLnBvcG92ZXInLCAoZGF0YSA9IG5ldyBQb3BvdmVyKHRoaXMsIG9wdGlvbnMpKSlcbiAgICAgIGlmICh0eXBlb2Ygb3B0aW9uID09ICdzdHJpbmcnKSBkYXRhW29wdGlvbl0oKVxuICAgIH0pXG4gIH1cblxuICB2YXIgb2xkID0gJC5mbi5wb3BvdmVyXG5cbiAgJC5mbi5wb3BvdmVyICAgICAgICAgICAgID0gUGx1Z2luXG4gICQuZm4ucG9wb3Zlci5Db25zdHJ1Y3RvciA9IFBvcG92ZXJcblxuXG4gIC8vIFBPUE9WRVIgTk8gQ09ORkxJQ1RcbiAgLy8gPT09PT09PT09PT09PT09PT09PVxuXG4gICQuZm4ucG9wb3Zlci5ub0NvbmZsaWN0ID0gZnVuY3Rpb24gKCkge1xuICAgICQuZm4ucG9wb3ZlciA9IG9sZFxuICAgIHJldHVybiB0aGlzXG4gIH1cblxufShqUXVlcnkpO1xuXG4vKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqIEJvb3RzdHJhcDogc2Nyb2xsc3B5LmpzIHYzLjMuN1xuICogaHR0cDovL2dldGJvb3RzdHJhcC5jb20vamF2YXNjcmlwdC8jc2Nyb2xsc3B5XG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqIENvcHlyaWdodCAyMDExLTIwMTYgVHdpdHRlciwgSW5jLlxuICogTGljZW5zZWQgdW5kZXIgTUlUIChodHRwczovL2dpdGh1Yi5jb20vdHdicy9ib290c3RyYXAvYmxvYi9tYXN0ZXIvTElDRU5TRSlcbiAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXG5cbitmdW5jdGlvbiAoJCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgLy8gU0NST0xMU1BZIENMQVNTIERFRklOSVRJT05cbiAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuICBmdW5jdGlvbiBTY3JvbGxTcHkoZWxlbWVudCwgb3B0aW9ucykge1xuICAgIHRoaXMuJGJvZHkgICAgICAgICAgPSAkKGRvY3VtZW50LmJvZHkpXG4gICAgdGhpcy4kc2Nyb2xsRWxlbWVudCA9ICQoZWxlbWVudCkuaXMoZG9jdW1lbnQuYm9keSkgPyAkKHdpbmRvdykgOiAkKGVsZW1lbnQpXG4gICAgdGhpcy5vcHRpb25zICAgICAgICA9ICQuZXh0ZW5kKHt9LCBTY3JvbGxTcHkuREVGQVVMVFMsIG9wdGlvbnMpXG4gICAgdGhpcy5zZWxlY3RvciAgICAgICA9ICh0aGlzLm9wdGlvbnMudGFyZ2V0IHx8ICcnKSArICcgLm5hdiBsaSA+IGEnXG4gICAgdGhpcy5vZmZzZXRzICAgICAgICA9IFtdXG4gICAgdGhpcy50YXJnZXRzICAgICAgICA9IFtdXG4gICAgdGhpcy5hY3RpdmVUYXJnZXQgICA9IG51bGxcbiAgICB0aGlzLnNjcm9sbEhlaWdodCAgID0gMFxuXG4gICAgdGhpcy4kc2Nyb2xsRWxlbWVudC5vbignc2Nyb2xsLmJzLnNjcm9sbHNweScsICQucHJveHkodGhpcy5wcm9jZXNzLCB0aGlzKSlcbiAgICB0aGlzLnJlZnJlc2goKVxuICAgIHRoaXMucHJvY2VzcygpXG4gIH1cblxuICBTY3JvbGxTcHkuVkVSU0lPTiAgPSAnMy4zLjcnXG5cbiAgU2Nyb2xsU3B5LkRFRkFVTFRTID0ge1xuICAgIG9mZnNldDogMTBcbiAgfVxuXG4gIFNjcm9sbFNweS5wcm90b3R5cGUuZ2V0U2Nyb2xsSGVpZ2h0ID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLiRzY3JvbGxFbGVtZW50WzBdLnNjcm9sbEhlaWdodCB8fCBNYXRoLm1heCh0aGlzLiRib2R5WzBdLnNjcm9sbEhlaWdodCwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbEhlaWdodClcbiAgfVxuXG4gIFNjcm9sbFNweS5wcm90b3R5cGUucmVmcmVzaCA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgdGhhdCAgICAgICAgICA9IHRoaXNcbiAgICB2YXIgb2Zmc2V0TWV0aG9kICA9ICdvZmZzZXQnXG4gICAgdmFyIG9mZnNldEJhc2UgICAgPSAwXG5cbiAgICB0aGlzLm9mZnNldHMgICAgICA9IFtdXG4gICAgdGhpcy50YXJnZXRzICAgICAgPSBbXVxuICAgIHRoaXMuc2Nyb2xsSGVpZ2h0ID0gdGhpcy5nZXRTY3JvbGxIZWlnaHQoKVxuXG4gICAgaWYgKCEkLmlzV2luZG93KHRoaXMuJHNjcm9sbEVsZW1lbnRbMF0pKSB7XG4gICAgICBvZmZzZXRNZXRob2QgPSAncG9zaXRpb24nXG4gICAgICBvZmZzZXRCYXNlICAgPSB0aGlzLiRzY3JvbGxFbGVtZW50LnNjcm9sbFRvcCgpXG4gICAgfVxuXG4gICAgdGhpcy4kYm9keVxuICAgICAgLmZpbmQodGhpcy5zZWxlY3RvcilcbiAgICAgIC5tYXAoZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgJGVsICAgPSAkKHRoaXMpXG4gICAgICAgIHZhciBocmVmICA9ICRlbC5kYXRhKCd0YXJnZXQnKSB8fCAkZWwuYXR0cignaHJlZicpXG4gICAgICAgIHZhciAkaHJlZiA9IC9eIy4vLnRlc3QoaHJlZikgJiYgJChocmVmKVxuXG4gICAgICAgIHJldHVybiAoJGhyZWZcbiAgICAgICAgICAmJiAkaHJlZi5sZW5ndGhcbiAgICAgICAgICAmJiAkaHJlZi5pcygnOnZpc2libGUnKVxuICAgICAgICAgICYmIFtbJGhyZWZbb2Zmc2V0TWV0aG9kXSgpLnRvcCArIG9mZnNldEJhc2UsIGhyZWZdXSkgfHwgbnVsbFxuICAgICAgfSlcbiAgICAgIC5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7IHJldHVybiBhWzBdIC0gYlswXSB9KVxuICAgICAgLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGF0Lm9mZnNldHMucHVzaCh0aGlzWzBdKVxuICAgICAgICB0aGF0LnRhcmdldHMucHVzaCh0aGlzWzFdKVxuICAgICAgfSlcbiAgfVxuXG4gIFNjcm9sbFNweS5wcm90b3R5cGUucHJvY2VzcyA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgc2Nyb2xsVG9wICAgID0gdGhpcy4kc2Nyb2xsRWxlbWVudC5zY3JvbGxUb3AoKSArIHRoaXMub3B0aW9ucy5vZmZzZXRcbiAgICB2YXIgc2Nyb2xsSGVpZ2h0ID0gdGhpcy5nZXRTY3JvbGxIZWlnaHQoKVxuICAgIHZhciBtYXhTY3JvbGwgICAgPSB0aGlzLm9wdGlvbnMub2Zmc2V0ICsgc2Nyb2xsSGVpZ2h0IC0gdGhpcy4kc2Nyb2xsRWxlbWVudC5oZWlnaHQoKVxuICAgIHZhciBvZmZzZXRzICAgICAgPSB0aGlzLm9mZnNldHNcbiAgICB2YXIgdGFyZ2V0cyAgICAgID0gdGhpcy50YXJnZXRzXG4gICAgdmFyIGFjdGl2ZVRhcmdldCA9IHRoaXMuYWN0aXZlVGFyZ2V0XG4gICAgdmFyIGlcblxuICAgIGlmICh0aGlzLnNjcm9sbEhlaWdodCAhPSBzY3JvbGxIZWlnaHQpIHtcbiAgICAgIHRoaXMucmVmcmVzaCgpXG4gICAgfVxuXG4gICAgaWYgKHNjcm9sbFRvcCA+PSBtYXhTY3JvbGwpIHtcbiAgICAgIHJldHVybiBhY3RpdmVUYXJnZXQgIT0gKGkgPSB0YXJnZXRzW3RhcmdldHMubGVuZ3RoIC0gMV0pICYmIHRoaXMuYWN0aXZhdGUoaSlcbiAgICB9XG5cbiAgICBpZiAoYWN0aXZlVGFyZ2V0ICYmIHNjcm9sbFRvcCA8IG9mZnNldHNbMF0pIHtcbiAgICAgIHRoaXMuYWN0aXZlVGFyZ2V0ID0gbnVsbFxuICAgICAgcmV0dXJuIHRoaXMuY2xlYXIoKVxuICAgIH1cblxuICAgIGZvciAoaSA9IG9mZnNldHMubGVuZ3RoOyBpLS07KSB7XG4gICAgICBhY3RpdmVUYXJnZXQgIT0gdGFyZ2V0c1tpXVxuICAgICAgICAmJiBzY3JvbGxUb3AgPj0gb2Zmc2V0c1tpXVxuICAgICAgICAmJiAob2Zmc2V0c1tpICsgMV0gPT09IHVuZGVmaW5lZCB8fCBzY3JvbGxUb3AgPCBvZmZzZXRzW2kgKyAxXSlcbiAgICAgICAgJiYgdGhpcy5hY3RpdmF0ZSh0YXJnZXRzW2ldKVxuICAgIH1cbiAgfVxuXG4gIFNjcm9sbFNweS5wcm90b3R5cGUuYWN0aXZhdGUgPSBmdW5jdGlvbiAodGFyZ2V0KSB7XG4gICAgdGhpcy5hY3RpdmVUYXJnZXQgPSB0YXJnZXRcblxuICAgIHRoaXMuY2xlYXIoKVxuXG4gICAgdmFyIHNlbGVjdG9yID0gdGhpcy5zZWxlY3RvciArXG4gICAgICAnW2RhdGEtdGFyZ2V0PVwiJyArIHRhcmdldCArICdcIl0sJyArXG4gICAgICB0aGlzLnNlbGVjdG9yICsgJ1tocmVmPVwiJyArIHRhcmdldCArICdcIl0nXG5cbiAgICB2YXIgYWN0aXZlID0gJChzZWxlY3RvcilcbiAgICAgIC5wYXJlbnRzKCdsaScpXG4gICAgICAuYWRkQ2xhc3MoJ2FjdGl2ZScpXG5cbiAgICBpZiAoYWN0aXZlLnBhcmVudCgnLmRyb3Bkb3duLW1lbnUnKS5sZW5ndGgpIHtcbiAgICAgIGFjdGl2ZSA9IGFjdGl2ZVxuICAgICAgICAuY2xvc2VzdCgnbGkuZHJvcGRvd24nKVxuICAgICAgICAuYWRkQ2xhc3MoJ2FjdGl2ZScpXG4gICAgfVxuXG4gICAgYWN0aXZlLnRyaWdnZXIoJ2FjdGl2YXRlLmJzLnNjcm9sbHNweScpXG4gIH1cblxuICBTY3JvbGxTcHkucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24gKCkge1xuICAgICQodGhpcy5zZWxlY3RvcilcbiAgICAgIC5wYXJlbnRzVW50aWwodGhpcy5vcHRpb25zLnRhcmdldCwgJy5hY3RpdmUnKVxuICAgICAgLnJlbW92ZUNsYXNzKCdhY3RpdmUnKVxuICB9XG5cblxuICAvLyBTQ1JPTExTUFkgUExVR0lOIERFRklOSVRJT05cbiAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbiAgZnVuY3Rpb24gUGx1Z2luKG9wdGlvbikge1xuICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgdmFyICR0aGlzICAgPSAkKHRoaXMpXG4gICAgICB2YXIgZGF0YSAgICA9ICR0aGlzLmRhdGEoJ2JzLnNjcm9sbHNweScpXG4gICAgICB2YXIgb3B0aW9ucyA9IHR5cGVvZiBvcHRpb24gPT0gJ29iamVjdCcgJiYgb3B0aW9uXG5cbiAgICAgIGlmICghZGF0YSkgJHRoaXMuZGF0YSgnYnMuc2Nyb2xsc3B5JywgKGRhdGEgPSBuZXcgU2Nyb2xsU3B5KHRoaXMsIG9wdGlvbnMpKSlcbiAgICAgIGlmICh0eXBlb2Ygb3B0aW9uID09ICdzdHJpbmcnKSBkYXRhW29wdGlvbl0oKVxuICAgIH0pXG4gIH1cblxuICB2YXIgb2xkID0gJC5mbi5zY3JvbGxzcHlcblxuICAkLmZuLnNjcm9sbHNweSAgICAgICAgICAgICA9IFBsdWdpblxuICAkLmZuLnNjcm9sbHNweS5Db25zdHJ1Y3RvciA9IFNjcm9sbFNweVxuXG5cbiAgLy8gU0NST0xMU1BZIE5PIENPTkZMSUNUXG4gIC8vID09PT09PT09PT09PT09PT09PT09PVxuXG4gICQuZm4uc2Nyb2xsc3B5Lm5vQ29uZmxpY3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgJC5mbi5zY3JvbGxzcHkgPSBvbGRcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cblxuICAvLyBTQ1JPTExTUFkgREFUQS1BUElcbiAgLy8gPT09PT09PT09PT09PT09PT09XG5cbiAgJCh3aW5kb3cpLm9uKCdsb2FkLmJzLnNjcm9sbHNweS5kYXRhLWFwaScsIGZ1bmN0aW9uICgpIHtcbiAgICAkKCdbZGF0YS1zcHk9XCJzY3JvbGxcIl0nKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciAkc3B5ID0gJCh0aGlzKVxuICAgICAgUGx1Z2luLmNhbGwoJHNweSwgJHNweS5kYXRhKCkpXG4gICAgfSlcbiAgfSlcblxufShqUXVlcnkpO1xuXG4vKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqIEJvb3RzdHJhcDogdGFiLmpzIHYzLjMuN1xuICogaHR0cDovL2dldGJvb3RzdHJhcC5jb20vamF2YXNjcmlwdC8jdGFic1xuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKiBDb3B5cmlnaHQgMjAxMS0yMDE2IFR3aXR0ZXIsIEluYy5cbiAqIExpY2Vuc2VkIHVuZGVyIE1JVCAoaHR0cHM6Ly9naXRodWIuY29tL3R3YnMvYm9vdHN0cmFwL2Jsb2IvbWFzdGVyL0xJQ0VOU0UpXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuXG4rZnVuY3Rpb24gKCQpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIC8vIFRBQiBDTEFTUyBERUZJTklUSU9OXG4gIC8vID09PT09PT09PT09PT09PT09PT09XG5cbiAgdmFyIFRhYiA9IGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgLy8ganNjczpkaXNhYmxlIHJlcXVpcmVEb2xsYXJCZWZvcmVqUXVlcnlBc3NpZ25tZW50XG4gICAgdGhpcy5lbGVtZW50ID0gJChlbGVtZW50KVxuICAgIC8vIGpzY3M6ZW5hYmxlIHJlcXVpcmVEb2xsYXJCZWZvcmVqUXVlcnlBc3NpZ25tZW50XG4gIH1cblxuICBUYWIuVkVSU0lPTiA9ICczLjMuNydcblxuICBUYWIuVFJBTlNJVElPTl9EVVJBVElPTiA9IDE1MFxuXG4gIFRhYi5wcm90b3R5cGUuc2hvdyA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgJHRoaXMgICAgPSB0aGlzLmVsZW1lbnRcbiAgICB2YXIgJHVsICAgICAgPSAkdGhpcy5jbG9zZXN0KCd1bDpub3QoLmRyb3Bkb3duLW1lbnUpJylcbiAgICB2YXIgc2VsZWN0b3IgPSAkdGhpcy5kYXRhKCd0YXJnZXQnKVxuXG4gICAgaWYgKCFzZWxlY3Rvcikge1xuICAgICAgc2VsZWN0b3IgPSAkdGhpcy5hdHRyKCdocmVmJylcbiAgICAgIHNlbGVjdG9yID0gc2VsZWN0b3IgJiYgc2VsZWN0b3IucmVwbGFjZSgvLiooPz0jW15cXHNdKiQpLywgJycpIC8vIHN0cmlwIGZvciBpZTdcbiAgICB9XG5cbiAgICBpZiAoJHRoaXMucGFyZW50KCdsaScpLmhhc0NsYXNzKCdhY3RpdmUnKSkgcmV0dXJuXG5cbiAgICB2YXIgJHByZXZpb3VzID0gJHVsLmZpbmQoJy5hY3RpdmU6bGFzdCBhJylcbiAgICB2YXIgaGlkZUV2ZW50ID0gJC5FdmVudCgnaGlkZS5icy50YWInLCB7XG4gICAgICByZWxhdGVkVGFyZ2V0OiAkdGhpc1swXVxuICAgIH0pXG4gICAgdmFyIHNob3dFdmVudCA9ICQuRXZlbnQoJ3Nob3cuYnMudGFiJywge1xuICAgICAgcmVsYXRlZFRhcmdldDogJHByZXZpb3VzWzBdXG4gICAgfSlcblxuICAgICRwcmV2aW91cy50cmlnZ2VyKGhpZGVFdmVudClcbiAgICAkdGhpcy50cmlnZ2VyKHNob3dFdmVudClcblxuICAgIGlmIChzaG93RXZlbnQuaXNEZWZhdWx0UHJldmVudGVkKCkgfHwgaGlkZUV2ZW50LmlzRGVmYXVsdFByZXZlbnRlZCgpKSByZXR1cm5cblxuICAgIHZhciAkdGFyZ2V0ID0gJChzZWxlY3RvcilcblxuICAgIHRoaXMuYWN0aXZhdGUoJHRoaXMuY2xvc2VzdCgnbGknKSwgJHVsKVxuICAgIHRoaXMuYWN0aXZhdGUoJHRhcmdldCwgJHRhcmdldC5wYXJlbnQoKSwgZnVuY3Rpb24gKCkge1xuICAgICAgJHByZXZpb3VzLnRyaWdnZXIoe1xuICAgICAgICB0eXBlOiAnaGlkZGVuLmJzLnRhYicsXG4gICAgICAgIHJlbGF0ZWRUYXJnZXQ6ICR0aGlzWzBdXG4gICAgICB9KVxuICAgICAgJHRoaXMudHJpZ2dlcih7XG4gICAgICAgIHR5cGU6ICdzaG93bi5icy50YWInLFxuICAgICAgICByZWxhdGVkVGFyZ2V0OiAkcHJldmlvdXNbMF1cbiAgICAgIH0pXG4gICAgfSlcbiAgfVxuXG4gIFRhYi5wcm90b3R5cGUuYWN0aXZhdGUgPSBmdW5jdGlvbiAoZWxlbWVudCwgY29udGFpbmVyLCBjYWxsYmFjaykge1xuICAgIHZhciAkYWN0aXZlICAgID0gY29udGFpbmVyLmZpbmQoJz4gLmFjdGl2ZScpXG4gICAgdmFyIHRyYW5zaXRpb24gPSBjYWxsYmFja1xuICAgICAgJiYgJC5zdXBwb3J0LnRyYW5zaXRpb25cbiAgICAgICYmICgkYWN0aXZlLmxlbmd0aCAmJiAkYWN0aXZlLmhhc0NsYXNzKCdmYWRlJykgfHwgISFjb250YWluZXIuZmluZCgnPiAuZmFkZScpLmxlbmd0aClcblxuICAgIGZ1bmN0aW9uIG5leHQoKSB7XG4gICAgICAkYWN0aXZlXG4gICAgICAgIC5yZW1vdmVDbGFzcygnYWN0aXZlJylcbiAgICAgICAgLmZpbmQoJz4gLmRyb3Bkb3duLW1lbnUgPiAuYWN0aXZlJylcbiAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpXG4gICAgICAgIC5lbmQoKVxuICAgICAgICAuZmluZCgnW2RhdGEtdG9nZ2xlPVwidGFiXCJdJylcbiAgICAgICAgICAuYXR0cignYXJpYS1leHBhbmRlZCcsIGZhbHNlKVxuXG4gICAgICBlbGVtZW50XG4gICAgICAgIC5hZGRDbGFzcygnYWN0aXZlJylcbiAgICAgICAgLmZpbmQoJ1tkYXRhLXRvZ2dsZT1cInRhYlwiXScpXG4gICAgICAgICAgLmF0dHIoJ2FyaWEtZXhwYW5kZWQnLCB0cnVlKVxuXG4gICAgICBpZiAodHJhbnNpdGlvbikge1xuICAgICAgICBlbGVtZW50WzBdLm9mZnNldFdpZHRoIC8vIHJlZmxvdyBmb3IgdHJhbnNpdGlvblxuICAgICAgICBlbGVtZW50LmFkZENsYXNzKCdpbicpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBlbGVtZW50LnJlbW92ZUNsYXNzKCdmYWRlJylcbiAgICAgIH1cblxuICAgICAgaWYgKGVsZW1lbnQucGFyZW50KCcuZHJvcGRvd24tbWVudScpLmxlbmd0aCkge1xuICAgICAgICBlbGVtZW50XG4gICAgICAgICAgLmNsb3Nlc3QoJ2xpLmRyb3Bkb3duJylcbiAgICAgICAgICAgIC5hZGRDbGFzcygnYWN0aXZlJylcbiAgICAgICAgICAuZW5kKClcbiAgICAgICAgICAuZmluZCgnW2RhdGEtdG9nZ2xlPVwidGFiXCJdJylcbiAgICAgICAgICAgIC5hdHRyKCdhcmlhLWV4cGFuZGVkJywgdHJ1ZSlcbiAgICAgIH1cblxuICAgICAgY2FsbGJhY2sgJiYgY2FsbGJhY2soKVxuICAgIH1cblxuICAgICRhY3RpdmUubGVuZ3RoICYmIHRyYW5zaXRpb24gP1xuICAgICAgJGFjdGl2ZVxuICAgICAgICAub25lKCdic1RyYW5zaXRpb25FbmQnLCBuZXh0KVxuICAgICAgICAuZW11bGF0ZVRyYW5zaXRpb25FbmQoVGFiLlRSQU5TSVRJT05fRFVSQVRJT04pIDpcbiAgICAgIG5leHQoKVxuXG4gICAgJGFjdGl2ZS5yZW1vdmVDbGFzcygnaW4nKVxuICB9XG5cblxuICAvLyBUQUIgUExVR0lOIERFRklOSVRJT05cbiAgLy8gPT09PT09PT09PT09PT09PT09PT09XG5cbiAgZnVuY3Rpb24gUGx1Z2luKG9wdGlvbikge1xuICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgdmFyICR0aGlzID0gJCh0aGlzKVxuICAgICAgdmFyIGRhdGEgID0gJHRoaXMuZGF0YSgnYnMudGFiJylcblxuICAgICAgaWYgKCFkYXRhKSAkdGhpcy5kYXRhKCdicy50YWInLCAoZGF0YSA9IG5ldyBUYWIodGhpcykpKVxuICAgICAgaWYgKHR5cGVvZiBvcHRpb24gPT0gJ3N0cmluZycpIGRhdGFbb3B0aW9uXSgpXG4gICAgfSlcbiAgfVxuXG4gIHZhciBvbGQgPSAkLmZuLnRhYlxuXG4gICQuZm4udGFiICAgICAgICAgICAgID0gUGx1Z2luXG4gICQuZm4udGFiLkNvbnN0cnVjdG9yID0gVGFiXG5cblxuICAvLyBUQUIgTk8gQ09ORkxJQ1RcbiAgLy8gPT09PT09PT09PT09PT09XG5cbiAgJC5mbi50YWIubm9Db25mbGljdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAkLmZuLnRhYiA9IG9sZFxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuXG4gIC8vIFRBQiBEQVRBLUFQSVxuICAvLyA9PT09PT09PT09PT1cblxuICB2YXIgY2xpY2tIYW5kbGVyID0gZnVuY3Rpb24gKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICBQbHVnaW4uY2FsbCgkKHRoaXMpLCAnc2hvdycpXG4gIH1cblxuICAkKGRvY3VtZW50KVxuICAgIC5vbignY2xpY2suYnMudGFiLmRhdGEtYXBpJywgJ1tkYXRhLXRvZ2dsZT1cInRhYlwiXScsIGNsaWNrSGFuZGxlcilcbiAgICAub24oJ2NsaWNrLmJzLnRhYi5kYXRhLWFwaScsICdbZGF0YS10b2dnbGU9XCJwaWxsXCJdJywgY2xpY2tIYW5kbGVyKVxuXG59KGpRdWVyeSk7XG5cbi8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICogQm9vdHN0cmFwOiBhZmZpeC5qcyB2My4zLjdcbiAqIGh0dHA6Ly9nZXRib290c3RyYXAuY29tL2phdmFzY3JpcHQvI2FmZml4XG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqIENvcHlyaWdodCAyMDExLTIwMTYgVHdpdHRlciwgSW5jLlxuICogTGljZW5zZWQgdW5kZXIgTUlUIChodHRwczovL2dpdGh1Yi5jb20vdHdicy9ib290c3RyYXAvYmxvYi9tYXN0ZXIvTElDRU5TRSlcbiAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXG5cbitmdW5jdGlvbiAoJCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgLy8gQUZGSVggQ0xBU1MgREVGSU5JVElPTlxuICAvLyA9PT09PT09PT09PT09PT09PT09PT09XG5cbiAgdmFyIEFmZml4ID0gZnVuY3Rpb24gKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICB0aGlzLm9wdGlvbnMgPSAkLmV4dGVuZCh7fSwgQWZmaXguREVGQVVMVFMsIG9wdGlvbnMpXG5cbiAgICB0aGlzLiR0YXJnZXQgPSAkKHRoaXMub3B0aW9ucy50YXJnZXQpXG4gICAgICAub24oJ3Njcm9sbC5icy5hZmZpeC5kYXRhLWFwaScsICQucHJveHkodGhpcy5jaGVja1Bvc2l0aW9uLCB0aGlzKSlcbiAgICAgIC5vbignY2xpY2suYnMuYWZmaXguZGF0YS1hcGknLCAgJC5wcm94eSh0aGlzLmNoZWNrUG9zaXRpb25XaXRoRXZlbnRMb29wLCB0aGlzKSlcblxuICAgIHRoaXMuJGVsZW1lbnQgICAgID0gJChlbGVtZW50KVxuICAgIHRoaXMuYWZmaXhlZCAgICAgID0gbnVsbFxuICAgIHRoaXMudW5waW4gICAgICAgID0gbnVsbFxuICAgIHRoaXMucGlubmVkT2Zmc2V0ID0gbnVsbFxuXG4gICAgdGhpcy5jaGVja1Bvc2l0aW9uKClcbiAgfVxuXG4gIEFmZml4LlZFUlNJT04gID0gJzMuMy43J1xuXG4gIEFmZml4LlJFU0VUICAgID0gJ2FmZml4IGFmZml4LXRvcCBhZmZpeC1ib3R0b20nXG5cbiAgQWZmaXguREVGQVVMVFMgPSB7XG4gICAgb2Zmc2V0OiAwLFxuICAgIHRhcmdldDogd2luZG93XG4gIH1cblxuICBBZmZpeC5wcm90b3R5cGUuZ2V0U3RhdGUgPSBmdW5jdGlvbiAoc2Nyb2xsSGVpZ2h0LCBoZWlnaHQsIG9mZnNldFRvcCwgb2Zmc2V0Qm90dG9tKSB7XG4gICAgdmFyIHNjcm9sbFRvcCAgICA9IHRoaXMuJHRhcmdldC5zY3JvbGxUb3AoKVxuICAgIHZhciBwb3NpdGlvbiAgICAgPSB0aGlzLiRlbGVtZW50Lm9mZnNldCgpXG4gICAgdmFyIHRhcmdldEhlaWdodCA9IHRoaXMuJHRhcmdldC5oZWlnaHQoKVxuXG4gICAgaWYgKG9mZnNldFRvcCAhPSBudWxsICYmIHRoaXMuYWZmaXhlZCA9PSAndG9wJykgcmV0dXJuIHNjcm9sbFRvcCA8IG9mZnNldFRvcCA/ICd0b3AnIDogZmFsc2VcblxuICAgIGlmICh0aGlzLmFmZml4ZWQgPT0gJ2JvdHRvbScpIHtcbiAgICAgIGlmIChvZmZzZXRUb3AgIT0gbnVsbCkgcmV0dXJuIChzY3JvbGxUb3AgKyB0aGlzLnVucGluIDw9IHBvc2l0aW9uLnRvcCkgPyBmYWxzZSA6ICdib3R0b20nXG4gICAgICByZXR1cm4gKHNjcm9sbFRvcCArIHRhcmdldEhlaWdodCA8PSBzY3JvbGxIZWlnaHQgLSBvZmZzZXRCb3R0b20pID8gZmFsc2UgOiAnYm90dG9tJ1xuICAgIH1cblxuICAgIHZhciBpbml0aWFsaXppbmcgICA9IHRoaXMuYWZmaXhlZCA9PSBudWxsXG4gICAgdmFyIGNvbGxpZGVyVG9wICAgID0gaW5pdGlhbGl6aW5nID8gc2Nyb2xsVG9wIDogcG9zaXRpb24udG9wXG4gICAgdmFyIGNvbGxpZGVySGVpZ2h0ID0gaW5pdGlhbGl6aW5nID8gdGFyZ2V0SGVpZ2h0IDogaGVpZ2h0XG5cbiAgICBpZiAob2Zmc2V0VG9wICE9IG51bGwgJiYgc2Nyb2xsVG9wIDw9IG9mZnNldFRvcCkgcmV0dXJuICd0b3AnXG4gICAgaWYgKG9mZnNldEJvdHRvbSAhPSBudWxsICYmIChjb2xsaWRlclRvcCArIGNvbGxpZGVySGVpZ2h0ID49IHNjcm9sbEhlaWdodCAtIG9mZnNldEJvdHRvbSkpIHJldHVybiAnYm90dG9tJ1xuXG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cblxuICBBZmZpeC5wcm90b3R5cGUuZ2V0UGlubmVkT2Zmc2V0ID0gZnVuY3Rpb24gKCkge1xuICAgIGlmICh0aGlzLnBpbm5lZE9mZnNldCkgcmV0dXJuIHRoaXMucGlubmVkT2Zmc2V0XG4gICAgdGhpcy4kZWxlbWVudC5yZW1vdmVDbGFzcyhBZmZpeC5SRVNFVCkuYWRkQ2xhc3MoJ2FmZml4JylcbiAgICB2YXIgc2Nyb2xsVG9wID0gdGhpcy4kdGFyZ2V0LnNjcm9sbFRvcCgpXG4gICAgdmFyIHBvc2l0aW9uICA9IHRoaXMuJGVsZW1lbnQub2Zmc2V0KClcbiAgICByZXR1cm4gKHRoaXMucGlubmVkT2Zmc2V0ID0gcG9zaXRpb24udG9wIC0gc2Nyb2xsVG9wKVxuICB9XG5cbiAgQWZmaXgucHJvdG90eXBlLmNoZWNrUG9zaXRpb25XaXRoRXZlbnRMb29wID0gZnVuY3Rpb24gKCkge1xuICAgIHNldFRpbWVvdXQoJC5wcm94eSh0aGlzLmNoZWNrUG9zaXRpb24sIHRoaXMpLCAxKVxuICB9XG5cbiAgQWZmaXgucHJvdG90eXBlLmNoZWNrUG9zaXRpb24gPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKCF0aGlzLiRlbGVtZW50LmlzKCc6dmlzaWJsZScpKSByZXR1cm5cblxuICAgIHZhciBoZWlnaHQgICAgICAgPSB0aGlzLiRlbGVtZW50LmhlaWdodCgpXG4gICAgdmFyIG9mZnNldCAgICAgICA9IHRoaXMub3B0aW9ucy5vZmZzZXRcbiAgICB2YXIgb2Zmc2V0VG9wICAgID0gb2Zmc2V0LnRvcFxuICAgIHZhciBvZmZzZXRCb3R0b20gPSBvZmZzZXQuYm90dG9tXG4gICAgdmFyIHNjcm9sbEhlaWdodCA9IE1hdGgubWF4KCQoZG9jdW1lbnQpLmhlaWdodCgpLCAkKGRvY3VtZW50LmJvZHkpLmhlaWdodCgpKVxuXG4gICAgaWYgKHR5cGVvZiBvZmZzZXQgIT0gJ29iamVjdCcpICAgICAgICAgb2Zmc2V0Qm90dG9tID0gb2Zmc2V0VG9wID0gb2Zmc2V0XG4gICAgaWYgKHR5cGVvZiBvZmZzZXRUb3AgPT0gJ2Z1bmN0aW9uJykgICAgb2Zmc2V0VG9wICAgID0gb2Zmc2V0LnRvcCh0aGlzLiRlbGVtZW50KVxuICAgIGlmICh0eXBlb2Ygb2Zmc2V0Qm90dG9tID09ICdmdW5jdGlvbicpIG9mZnNldEJvdHRvbSA9IG9mZnNldC5ib3R0b20odGhpcy4kZWxlbWVudClcblxuICAgIHZhciBhZmZpeCA9IHRoaXMuZ2V0U3RhdGUoc2Nyb2xsSGVpZ2h0LCBoZWlnaHQsIG9mZnNldFRvcCwgb2Zmc2V0Qm90dG9tKVxuXG4gICAgaWYgKHRoaXMuYWZmaXhlZCAhPSBhZmZpeCkge1xuICAgICAgaWYgKHRoaXMudW5waW4gIT0gbnVsbCkgdGhpcy4kZWxlbWVudC5jc3MoJ3RvcCcsICcnKVxuXG4gICAgICB2YXIgYWZmaXhUeXBlID0gJ2FmZml4JyArIChhZmZpeCA/ICctJyArIGFmZml4IDogJycpXG4gICAgICB2YXIgZSAgICAgICAgID0gJC5FdmVudChhZmZpeFR5cGUgKyAnLmJzLmFmZml4JylcblxuICAgICAgdGhpcy4kZWxlbWVudC50cmlnZ2VyKGUpXG5cbiAgICAgIGlmIChlLmlzRGVmYXVsdFByZXZlbnRlZCgpKSByZXR1cm5cblxuICAgICAgdGhpcy5hZmZpeGVkID0gYWZmaXhcbiAgICAgIHRoaXMudW5waW4gPSBhZmZpeCA9PSAnYm90dG9tJyA/IHRoaXMuZ2V0UGlubmVkT2Zmc2V0KCkgOiBudWxsXG5cbiAgICAgIHRoaXMuJGVsZW1lbnRcbiAgICAgICAgLnJlbW92ZUNsYXNzKEFmZml4LlJFU0VUKVxuICAgICAgICAuYWRkQ2xhc3MoYWZmaXhUeXBlKVxuICAgICAgICAudHJpZ2dlcihhZmZpeFR5cGUucmVwbGFjZSgnYWZmaXgnLCAnYWZmaXhlZCcpICsgJy5icy5hZmZpeCcpXG4gICAgfVxuXG4gICAgaWYgKGFmZml4ID09ICdib3R0b20nKSB7XG4gICAgICB0aGlzLiRlbGVtZW50Lm9mZnNldCh7XG4gICAgICAgIHRvcDogc2Nyb2xsSGVpZ2h0IC0gaGVpZ2h0IC0gb2Zmc2V0Qm90dG9tXG4gICAgICB9KVxuICAgIH1cbiAgfVxuXG5cbiAgLy8gQUZGSVggUExVR0lOIERFRklOSVRJT05cbiAgLy8gPT09PT09PT09PT09PT09PT09PT09PT1cblxuICBmdW5jdGlvbiBQbHVnaW4ob3B0aW9uKSB7XG4gICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgJHRoaXMgICA9ICQodGhpcylcbiAgICAgIHZhciBkYXRhICAgID0gJHRoaXMuZGF0YSgnYnMuYWZmaXgnKVxuICAgICAgdmFyIG9wdGlvbnMgPSB0eXBlb2Ygb3B0aW9uID09ICdvYmplY3QnICYmIG9wdGlvblxuXG4gICAgICBpZiAoIWRhdGEpICR0aGlzLmRhdGEoJ2JzLmFmZml4JywgKGRhdGEgPSBuZXcgQWZmaXgodGhpcywgb3B0aW9ucykpKVxuICAgICAgaWYgKHR5cGVvZiBvcHRpb24gPT0gJ3N0cmluZycpIGRhdGFbb3B0aW9uXSgpXG4gICAgfSlcbiAgfVxuXG4gIHZhciBvbGQgPSAkLmZuLmFmZml4XG5cbiAgJC5mbi5hZmZpeCAgICAgICAgICAgICA9IFBsdWdpblxuICAkLmZuLmFmZml4LkNvbnN0cnVjdG9yID0gQWZmaXhcblxuXG4gIC8vIEFGRklYIE5PIENPTkZMSUNUXG4gIC8vID09PT09PT09PT09PT09PT09XG5cbiAgJC5mbi5hZmZpeC5ub0NvbmZsaWN0ID0gZnVuY3Rpb24gKCkge1xuICAgICQuZm4uYWZmaXggPSBvbGRcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cblxuICAvLyBBRkZJWCBEQVRBLUFQSVxuICAvLyA9PT09PT09PT09PT09PVxuXG4gICQod2luZG93KS5vbignbG9hZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAkKCdbZGF0YS1zcHk9XCJhZmZpeFwiXScpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgdmFyICRzcHkgPSAkKHRoaXMpXG4gICAgICB2YXIgZGF0YSA9ICRzcHkuZGF0YSgpXG5cbiAgICAgIGRhdGEub2Zmc2V0ID0gZGF0YS5vZmZzZXQgfHwge31cblxuICAgICAgaWYgKGRhdGEub2Zmc2V0Qm90dG9tICE9IG51bGwpIGRhdGEub2Zmc2V0LmJvdHRvbSA9IGRhdGEub2Zmc2V0Qm90dG9tXG4gICAgICBpZiAoZGF0YS5vZmZzZXRUb3AgICAgIT0gbnVsbCkgZGF0YS5vZmZzZXQudG9wICAgID0gZGF0YS5vZmZzZXRUb3BcblxuICAgICAgUGx1Z2luLmNhbGwoJHNweSwgZGF0YSlcbiAgICB9KVxuICB9KVxuXG59KGpRdWVyeSk7XG4iLCIvLyB8LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIHwgRmxleHkgaGVhZGVyXG4vLyB8LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIHxcbi8vIHwgVGhpcyBqUXVlcnkgc2NyaXB0IGlzIHdyaXR0ZW4gYnlcbi8vIHxcbi8vIHwgTW9ydGVuIE5pc3NlblxuLy8gfCBoamVtbWVzaWRla29uZ2VuLmRrXG4vLyB8XG5cbnZhciBmbGV4eV9oZWFkZXIgPSAoZnVuY3Rpb24gKCQpIHtcbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICB2YXIgcHViID0ge30sXG4gICAgICAgICRoZWFkZXJfc3RhdGljID0gJCgnLmZsZXh5LWhlYWRlci0tc3RhdGljJyksXG4gICAgICAgICRoZWFkZXJfc3RpY2t5ID0gJCgnLmZsZXh5LWhlYWRlci0tc3RpY2t5JyksXG4gICAgICAgIG9wdGlvbnMgPSB7XG4gICAgICAgICAgICB1cGRhdGVfaW50ZXJ2YWw6IDEwMCxcbiAgICAgICAgICAgIHRvbGVyYW5jZToge1xuICAgICAgICAgICAgICAgIHVwd2FyZDogMjAsXG4gICAgICAgICAgICAgICAgZG93bndhcmQ6IDEwXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb2Zmc2V0OiBfZ2V0X29mZnNldF9mcm9tX2VsZW1lbnRzX2JvdHRvbSgkaGVhZGVyX3N0YXRpYyksXG4gICAgICAgICAgICBjbGFzc2VzOiB7XG4gICAgICAgICAgICAgICAgcGlubmVkOiBcImZsZXh5LWhlYWRlci0tcGlubmVkXCIsXG4gICAgICAgICAgICAgICAgdW5waW5uZWQ6IFwiZmxleHktaGVhZGVyLS11bnBpbm5lZFwiXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHdhc19zY3JvbGxlZCA9IGZhbHNlLFxuICAgICAgICBsYXN0X2Rpc3RhbmNlX2Zyb21fdG9wID0gMDtcblxuICAgIC8qKlxuICAgICAqIEluc3RhbnRpYXRlXG4gICAgICovXG4gICAgcHViLmluaXQgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgICAgICByZWdpc3RlckV2ZW50SGFuZGxlcnMoKTtcbiAgICAgICAgcmVnaXN0ZXJCb290RXZlbnRIYW5kbGVycygpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBSZWdpc3RlciBib290IGV2ZW50IGhhbmRsZXJzXG4gICAgICovXG4gICAgZnVuY3Rpb24gcmVnaXN0ZXJCb290RXZlbnRIYW5kbGVycygpIHtcbiAgICAgICAgJGhlYWRlcl9zdGlja3kuYWRkQ2xhc3Mob3B0aW9ucy5jbGFzc2VzLnVucGlubmVkKTtcblxuICAgICAgICBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHtcblxuICAgICAgICAgICAgaWYgKHdhc19zY3JvbGxlZCkge1xuICAgICAgICAgICAgICAgIGRvY3VtZW50X3dhc19zY3JvbGxlZCgpO1xuXG4gICAgICAgICAgICAgICAgd2FzX3Njcm9sbGVkID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIG9wdGlvbnMudXBkYXRlX2ludGVydmFsKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZWdpc3RlciBldmVudCBoYW5kbGVyc1xuICAgICAqL1xuICAgIGZ1bmN0aW9uIHJlZ2lzdGVyRXZlbnRIYW5kbGVycygpIHtcbiAgICAgICAgJCh3aW5kb3cpLnNjcm9sbChmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgd2FzX3Njcm9sbGVkID0gdHJ1ZTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IG9mZnNldCBmcm9tIGVsZW1lbnQgYm90dG9tXG4gICAgICovXG4gICAgZnVuY3Rpb24gX2dldF9vZmZzZXRfZnJvbV9lbGVtZW50c19ib3R0b20oJGVsZW1lbnQpIHtcbiAgICAgICAgdmFyIGVsZW1lbnRfaGVpZ2h0ID0gJGVsZW1lbnQub3V0ZXJIZWlnaHQodHJ1ZSksXG4gICAgICAgICAgICBlbGVtZW50X29mZnNldCA9ICRlbGVtZW50Lm9mZnNldCgpLnRvcDtcblxuICAgICAgICByZXR1cm4gKGVsZW1lbnRfaGVpZ2h0ICsgZWxlbWVudF9vZmZzZXQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERvY3VtZW50IHdhcyBzY3JvbGxlZFxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGRvY3VtZW50X3dhc19zY3JvbGxlZCgpIHtcbiAgICAgICAgdmFyIGN1cnJlbnRfZGlzdGFuY2VfZnJvbV90b3AgPSAkKHdpbmRvdykuc2Nyb2xsVG9wKCk7XG5cbiAgICAgICAgLy8gSWYgcGFzdCBvZmZzZXRcbiAgICAgICAgaWYgKGN1cnJlbnRfZGlzdGFuY2VfZnJvbV90b3AgPj0gb3B0aW9ucy5vZmZzZXQpIHtcblxuICAgICAgICAgICAgLy8gRG93bndhcmRzIHNjcm9sbFxuICAgICAgICAgICAgaWYgKGN1cnJlbnRfZGlzdGFuY2VfZnJvbV90b3AgPiBsYXN0X2Rpc3RhbmNlX2Zyb21fdG9wKSB7XG5cbiAgICAgICAgICAgICAgICAvLyBPYmV5IHRoZSBkb3dud2FyZCB0b2xlcmFuY2VcbiAgICAgICAgICAgICAgICBpZiAoTWF0aC5hYnMoY3VycmVudF9kaXN0YW5jZV9mcm9tX3RvcCAtIGxhc3RfZGlzdGFuY2VfZnJvbV90b3ApIDw9IG9wdGlvbnMudG9sZXJhbmNlLmRvd253YXJkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAkaGVhZGVyX3N0aWNreS5yZW1vdmVDbGFzcyhvcHRpb25zLmNsYXNzZXMucGlubmVkKS5hZGRDbGFzcyhvcHRpb25zLmNsYXNzZXMudW5waW5uZWQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBVcHdhcmRzIHNjcm9sbFxuICAgICAgICAgICAgZWxzZSB7XG5cbiAgICAgICAgICAgICAgICAvLyBPYmV5IHRoZSB1cHdhcmQgdG9sZXJhbmNlXG4gICAgICAgICAgICAgICAgaWYgKE1hdGguYWJzKGN1cnJlbnRfZGlzdGFuY2VfZnJvbV90b3AgLSBsYXN0X2Rpc3RhbmNlX2Zyb21fdG9wKSA8PSBvcHRpb25zLnRvbGVyYW5jZS51cHdhcmQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIFdlIGFyZSBub3Qgc2Nyb2xsZWQgcGFzdCB0aGUgZG9jdW1lbnQgd2hpY2ggaXMgcG9zc2libGUgb24gdGhlIE1hY1xuICAgICAgICAgICAgICAgIGlmICgoY3VycmVudF9kaXN0YW5jZV9mcm9tX3RvcCArICQod2luZG93KS5oZWlnaHQoKSkgPCAkKGRvY3VtZW50KS5oZWlnaHQoKSkge1xuICAgICAgICAgICAgICAgICAgICAkaGVhZGVyX3N0aWNreS5yZW1vdmVDbGFzcyhvcHRpb25zLmNsYXNzZXMudW5waW5uZWQpLmFkZENsYXNzKG9wdGlvbnMuY2xhc3Nlcy5waW5uZWQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIE5vdCBwYXN0IG9mZnNldFxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICRoZWFkZXJfc3RpY2t5LnJlbW92ZUNsYXNzKG9wdGlvbnMuY2xhc3Nlcy5waW5uZWQpLmFkZENsYXNzKG9wdGlvbnMuY2xhc3Nlcy51bnBpbm5lZCk7XG4gICAgICAgIH1cblxuICAgICAgICBsYXN0X2Rpc3RhbmNlX2Zyb21fdG9wID0gY3VycmVudF9kaXN0YW5jZV9mcm9tX3RvcDtcbiAgICB9XG5cbiAgICByZXR1cm4gcHViO1xufSkoalF1ZXJ5KTtcbiIsImpRdWVyeShmdW5jdGlvbigkKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgLy8gRmxleHkgbmF2aWdhdGlvblxuICAgIGZsZXh5X25hdmlnYXRpb24uaW5pdCgpO1xuXG4gICAgLy8gU2hvdyBkcm9wZG93bnMgb24gbW91c2VvdmVyXG4gICAgbGV0ICRoZWFkZXJzID0gJCgnLmZsZXh5LWhlYWRlcicpLFxuICAgICAgICAkZHJvcGRvd25zX2xpbmsgPSAkKCcuZmxleHktbmF2aWdhdGlvbl9faXRlbS0tZHJvcGRvd24gPiBhJyk7XG5cbiAgICAkZHJvcGRvd25zX2xpbmtcbiAgICAgICAgLm9uKCdjbGljaycsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICBsZXQgJGVsZW1lbnQgPSAkKHRoaXMpLFxuICAgICAgICAgICAgICAgICRoZWFkZXIgPSAkZWxlbWVudC5wYXJlbnRzKCcuZmxleHktaGVhZGVyJyksXG4gICAgICAgICAgICAgICAgJGxpc3RfaXRlbXMgPSAkaGVhZGVyLmZpbmQoJy5mbGV4eS1uYXZpZ2F0aW9uX19pdGVtLS1kcm9wZG93bicpO1xuXG4gICAgICAgICAgICBpZiAoJGxpc3RfaXRlbXMuaGFzQ2xhc3MoJ2hvdmVyJykpIHtcbiAgICAgICAgICAgICAgICAkbGlzdF9pdGVtcy5yZW1vdmVDbGFzcygnaG92ZXInKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICRsaXN0X2l0ZW1zLmFkZENsYXNzKCdob3ZlcicpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgIC8vIFJlbW92ZSBkcm9wZG93biBvbiBjbGljayBvdXRzaWRlXG4gICAgJCh3aW5kb3cpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIGxldCAkbGlzdF9pdGVtcyA9ICQoJy5mbGV4eS1uYXZpZ2F0aW9uX19pdGVtLS1kcm9wZG93bicpO1xuXG4gICAgICAgIGlmICgkbGlzdF9pdGVtcyAhPT0gZXZlbnQudGFyZ2V0ICYmICEgJGxpc3RfaXRlbXMuaGFzKGV2ZW50LnRhcmdldCkubGVuZ3RoKSB7XG4gICAgICAgICAgICAkbGlzdF9pdGVtcy5yZW1vdmVDbGFzcygnaG92ZXInKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gQWRkIGEgXCJjbG9zZVwiIHRvZ2dsZSB0byB0aGUgbGFzdCBkcm9wZG93biBtZW51IGluIHRoZSBoZWFkZXJcbiAgICAkaGVhZGVycy5lYWNoKGZ1bmN0aW9uKGluZGV4LCB2YWx1ZSkge1xuICAgICAgICBsZXQgJGhlYWRlciA9ICQodGhpcyksXG4gICAgICAgICAgICAkbGlzdF9pdGVtID0gJGhlYWRlci5maW5kKCcuZmxleHktbmF2aWdhdGlvbiA+IC5mbGV4eS1uYXZpZ2F0aW9uX19pdGVtLS1kcm9wZG93bicpLmxhc3QoKSxcbiAgICAgICAgICAgICRkcm9wZG93bl9tZW51ID0gJGxpc3RfaXRlbS5maW5kKCcuZmxleHktbmF2aWdhdGlvbl9faXRlbV9fZHJvcGRvd24tbWVudScpO1xuXG4gICAgICAgIGxldCAkYnRuID0gJCgnPHNwYW4gLz4nKVxuICAgICAgICAgICAgLmFkZENsYXNzKCdmbGV4eS1uYXZpZ2F0aW9uX19pdGVtX19kcm9wZG93bi1tZW51X190b2dnbGUgaWNvbiBmYSBmYS1jbG9zZScpXG4gICAgICAgICAgICAub24oJ2NsaWNrJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgICAgICBsZXQgJGVsZW1lbnQgPSAkKHRoaXMpLFxuICAgICAgICAgICAgICAgICAgICAkaGVhZGVyID0gJGVsZW1lbnQucGFyZW50cygnLmZsZXh5LWhlYWRlcicpLFxuICAgICAgICAgICAgICAgICAgICAkbGlzdF9pdGVtcyA9ICRoZWFkZXIuZmluZCgnLmZsZXh5LW5hdmlnYXRpb25fX2l0ZW0tLWRyb3Bkb3duJyk7XG5cbiAgICAgICAgICAgICAgICAkbGlzdF9pdGVtcy5yZW1vdmVDbGFzcygnaG92ZXInKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICRkcm9wZG93bl9tZW51LmFwcGVuZCgkYnRuKTtcbiAgICB9KTtcblxuICAgIC8vIFNldCBhIGZpcnN0LSBhbmQgbGFzdCBjaGlsZCBjbGFzcyBvbiB0aGUgZHJvcGRvd25zXG4gICAgJGhlYWRlcnMuZWFjaChmdW5jdGlvbihpbmRleCwgdmFsdWUpIHtcbiAgICAgICAgbGV0ICRoZWFkZXIgPSAkKHRoaXMpO1xuXG4gICAgICAgIC8vIEZpcnN0IGNoaWxkXG4gICAgICAgICRoZWFkZXJcbiAgICAgICAgICAgIC5maW5kKCcuZmxleHktbmF2aWdhdGlvbiA+IC5mbGV4eS1uYXZpZ2F0aW9uX19pdGVtLS1kcm9wZG93bicpXG4gICAgICAgICAgICAuZmlyc3QoKVxuICAgICAgICAgICAgLmFkZENsYXNzKCdmbGV4eS1uYXZpZ2F0aW9uX19pdGVtLS1kcm9wZG93bi0tZmlyc3QtY2hpbGQnKTtcblxuICAgICAgICAvLyBMYXN0IGNoaWxkXG4gICAgICAgICRoZWFkZXJcbiAgICAgICAgICAgIC5maW5kKCcuZmxleHktbmF2aWdhdGlvbiA+IC5mbGV4eS1uYXZpZ2F0aW9uX19pdGVtLS1kcm9wZG93bicpXG4gICAgICAgICAgICAubGFzdCgpXG4gICAgICAgICAgICAuYWRkQ2xhc3MoJ2ZsZXh5LW5hdmlnYXRpb25fX2l0ZW0tLWRyb3Bkb3duLS1sYXN0LWNoaWxkJyk7XG4gICAgfSk7XG5cbiAgICAvLyBTZXQgZHJvcGRvd24gbWVudSBoZWlnaHRcbiAgICBmdW5jdGlvbiBfZmxleHlfbmF2aWdhdGlvbl9zZXRfZHJvcGRvd25fbWVudV9oZWlnaHQoKSB7XG4gICAgICAgIGxldCAkaGVhZGVycyA9ICQoJy5mbGV4eS1oZWFkZXInKTtcblxuICAgICAgICAvLyBBcHBseSB0aGUgc2FtZSBoZWlnaHQgdG8gYWxsIGRyb3Bkb3duIG1lbnVzXG4gICAgICAgICRoZWFkZXJzLmVhY2goZnVuY3Rpb24oaW5kZXgsIHZhbHVlKSB7XG4gICAgICAgICAgICBsZXQgJGhlYWRlciA9ICQodGhpcyksXG4gICAgICAgICAgICAgICAgJGRyb3Bkb3duX21lbnVzID0gJGhlYWRlci5maW5kKCcuZmxleHktbmF2aWdhdGlvbl9faXRlbV9fZHJvcGRvd24tbWVudScpLFxuICAgICAgICAgICAgICAgIHRhbGxlc3RfZHJvcGRvd24gPSAwO1xuXG4gICAgICAgICAgICAvLyBSZW1vdmUgaGVpZ2h0IHRlbXBvcmFyaWx5LCBmcm9tIHRoZSBkcm9wZG93bnMgc28gaXQgY2FuIGJlIHNldFxuICAgICAgICAgICAgJGRyb3Bkb3duX21lbnVzLmNzcygnaGVpZ2h0JywgJ2F1dG8nKTtcblxuICAgICAgICAgICAgLy8gRmluZCB0aGUgdGFsbGVzdCBkcm9wZG93biBtZW51XG4gICAgICAgICAgICAkZHJvcGRvd25fbWVudXMuZWFjaChmdW5jdGlvbihpbmRleCwgdmFsdWUpIHtcbiAgICAgICAgICAgICAgICBsZXQgJGRyb3Bkb3duX21lbnUgPSAkKHRoaXMpLFxuICAgICAgICAgICAgICAgICAgICBoZWlnaHQgPSAkZHJvcGRvd25fbWVudS5vdXRlckhlaWdodCh0cnVlKTtcblxuICAgICAgICAgICAgICAgIGlmIChoZWlnaHQgPiB0YWxsZXN0X2Ryb3Bkb3duKSB7XG4gICAgICAgICAgICAgICAgICAgIHRhbGxlc3RfZHJvcGRvd24gPSBoZWlnaHQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIC8vIEFwcGx5IHRoZSB0YWxsZXN0IGhlaWdodCB0byBhbGwgZHJvcGRvd24gbWVudXNcbiAgICAgICAgICAgICRkcm9wZG93bl9tZW51cy5jc3MoJ2hlaWdodCcsIHRhbGxlc3RfZHJvcGRvd24pO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgX2ZsZXh5X25hdmlnYXRpb25fc2V0X2Ryb3Bkb3duX21lbnVfaGVpZ2h0KCk7IC8vIFJ1biBvbiBib290XG5cbiAgICAvLyBSZWNhbGN1bGF0ZSBkcm9wZG93biBtZW51IGhlaWdodCB3aGVuIHdpbmRvdyBpcyByZXNpemVkXG4gICAgJCh3aW5kb3cpLm9uKCdyZXNpemUnLCBmdW5jdGlvbigpe1xuICAgICAgICBfZmxleHlfbmF2aWdhdGlvbl9zZXRfZHJvcGRvd25fbWVudV9oZWlnaHQoKTtcbiAgICB9KTtcbn0pO1xuIiwiLyohIHNpZHIgLSB2Mi4yLjEgLSAyMDE2LTAyLTE3XG4gKiBodHRwOi8vd3d3LmJlcnJpYXJ0LmNvbS9zaWRyL1xuICogQ29weXJpZ2h0IChjKSAyMDEzLTIwMTYgQWxiZXJ0byBWYXJlbGE7IExpY2Vuc2VkIE1JVCAqL1xuXG4oZnVuY3Rpb24gKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgdmFyIGJhYmVsSGVscGVycyA9IHt9O1xuXG4gIGJhYmVsSGVscGVycy5jbGFzc0NhbGxDaGVjayA9IGZ1bmN0aW9uIChpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHtcbiAgICBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTtcbiAgICB9XG4gIH07XG5cbiAgYmFiZWxIZWxwZXJzLmNyZWF0ZUNsYXNzID0gZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldO1xuICAgICAgICBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7XG4gICAgICAgIGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTtcbiAgICAgICAgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7XG4gICAgICBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpO1xuICAgICAgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7XG4gICAgICByZXR1cm4gQ29uc3RydWN0b3I7XG4gICAgfTtcbiAgfSgpO1xuXG4gIGJhYmVsSGVscGVycztcblxuICB2YXIgc2lkclN0YXR1cyA9IHtcbiAgICBtb3Zpbmc6IGZhbHNlLFxuICAgIG9wZW5lZDogZmFsc2VcbiAgfTtcblxuICB2YXIgaGVscGVyID0ge1xuICAgIC8vIENoZWNrIGZvciB2YWxpZHMgdXJsc1xuICAgIC8vIEZyb20gOiBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzU3MTcwOTMvY2hlY2staWYtYS1qYXZhc2NyaXB0LXN0cmluZy1pcy1hbi11cmxcblxuICAgIGlzVXJsOiBmdW5jdGlvbiBpc1VybChzdHIpIHtcbiAgICAgIHZhciBwYXR0ZXJuID0gbmV3IFJlZ0V4cCgnXihodHRwcz86XFxcXC9cXFxcLyk/JyArIC8vIHByb3RvY29sXG4gICAgICAnKCgoW2EtelxcXFxkXShbYS16XFxcXGQtXSpbYS16XFxcXGRdKSopXFxcXC4/KStbYS16XXsyLH18JyArIC8vIGRvbWFpbiBuYW1lXG4gICAgICAnKChcXFxcZHsxLDN9XFxcXC4pezN9XFxcXGR7MSwzfSkpJyArIC8vIE9SIGlwICh2NCkgYWRkcmVzc1xuICAgICAgJyhcXFxcOlxcXFxkKyk/KFxcXFwvWy1hLXpcXFxcZCVfLn4rXSopKicgKyAvLyBwb3J0IGFuZCBwYXRoXG4gICAgICAnKFxcXFw/WzsmYS16XFxcXGQlXy5+Kz0tXSopPycgKyAvLyBxdWVyeSBzdHJpbmdcbiAgICAgICcoXFxcXCNbLWEtelxcXFxkX10qKT8kJywgJ2knKTsgLy8gZnJhZ21lbnQgbG9jYXRvclxuXG4gICAgICBpZiAocGF0dGVybi50ZXN0KHN0cikpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfSxcblxuXG4gICAgLy8gQWRkIHNpZHIgcHJlZml4ZXNcbiAgICBhZGRQcmVmaXhlczogZnVuY3Rpb24gYWRkUHJlZml4ZXMoJGVsZW1lbnQpIHtcbiAgICAgIHRoaXMuYWRkUHJlZml4KCRlbGVtZW50LCAnaWQnKTtcbiAgICAgIHRoaXMuYWRkUHJlZml4KCRlbGVtZW50LCAnY2xhc3MnKTtcbiAgICAgICRlbGVtZW50LnJlbW92ZUF0dHIoJ3N0eWxlJyk7XG4gICAgfSxcbiAgICBhZGRQcmVmaXg6IGZ1bmN0aW9uIGFkZFByZWZpeCgkZWxlbWVudCwgYXR0cmlidXRlKSB7XG4gICAgICB2YXIgdG9SZXBsYWNlID0gJGVsZW1lbnQuYXR0cihhdHRyaWJ1dGUpO1xuXG4gICAgICBpZiAodHlwZW9mIHRvUmVwbGFjZSA9PT0gJ3N0cmluZycgJiYgdG9SZXBsYWNlICE9PSAnJyAmJiB0b1JlcGxhY2UgIT09ICdzaWRyLWlubmVyJykge1xuICAgICAgICAkZWxlbWVudC5hdHRyKGF0dHJpYnV0ZSwgdG9SZXBsYWNlLnJlcGxhY2UoLyhbQS1aYS16MC05Xy5cXC1dKykvZywgJ3NpZHItJyArIGF0dHJpYnV0ZSArICctJDEnKSk7XG4gICAgICB9XG4gICAgfSxcblxuXG4gICAgLy8gQ2hlY2sgaWYgdHJhbnNpdGlvbnMgaXMgc3VwcG9ydGVkXG4gICAgdHJhbnNpdGlvbnM6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBib2R5ID0gZG9jdW1lbnQuYm9keSB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQsXG4gICAgICAgICAgc3R5bGUgPSBib2R5LnN0eWxlLFxuICAgICAgICAgIHN1cHBvcnRlZCA9IGZhbHNlLFxuICAgICAgICAgIHByb3BlcnR5ID0gJ3RyYW5zaXRpb24nO1xuXG4gICAgICBpZiAocHJvcGVydHkgaW4gc3R5bGUpIHtcbiAgICAgICAgc3VwcG9ydGVkID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgdmFyIHByZWZpeGVzID0gWydtb3onLCAnd2Via2l0JywgJ28nLCAnbXMnXSxcbiAgICAgICAgICAgICAgcHJlZml4ID0gdW5kZWZpbmVkLFxuICAgICAgICAgICAgICBpID0gdW5kZWZpbmVkO1xuXG4gICAgICAgICAgcHJvcGVydHkgPSBwcm9wZXJ0eS5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHByb3BlcnR5LnN1YnN0cigxKTtcbiAgICAgICAgICBzdXBwb3J0ZWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgcHJlZml4ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgcHJlZml4ID0gcHJlZml4ZXNbaV07XG4gICAgICAgICAgICAgIGlmIChwcmVmaXggKyBwcm9wZXJ0eSBpbiBzdHlsZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9KCk7XG4gICAgICAgICAgcHJvcGVydHkgPSBzdXBwb3J0ZWQgPyAnLScgKyBwcmVmaXgudG9Mb3dlckNhc2UoKSArICctJyArIHByb3BlcnR5LnRvTG93ZXJDYXNlKCkgOiBudWxsO1xuICAgICAgICB9KSgpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4ge1xuICAgICAgICBzdXBwb3J0ZWQ6IHN1cHBvcnRlZCxcbiAgICAgICAgcHJvcGVydHk6IHByb3BlcnR5XG4gICAgICB9O1xuICAgIH0oKVxuICB9O1xuXG4gIHZhciAkJDIgPSBqUXVlcnk7XG5cbiAgdmFyIGJvZHlBbmltYXRpb25DbGFzcyA9ICdzaWRyLWFuaW1hdGluZyc7XG4gIHZhciBvcGVuQWN0aW9uID0gJ29wZW4nO1xuICB2YXIgY2xvc2VBY3Rpb24gPSAnY2xvc2UnO1xuICB2YXIgdHJhbnNpdGlvbkVuZEV2ZW50ID0gJ3dlYmtpdFRyYW5zaXRpb25FbmQgb3RyYW5zaXRpb25lbmQgb1RyYW5zaXRpb25FbmQgbXNUcmFuc2l0aW9uRW5kIHRyYW5zaXRpb25lbmQnO1xuICB2YXIgTWVudSA9IGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBNZW51KG5hbWUpIHtcbiAgICAgIGJhYmVsSGVscGVycy5jbGFzc0NhbGxDaGVjayh0aGlzLCBNZW51KTtcblxuICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgIHRoaXMuaXRlbSA9ICQkMignIycgKyBuYW1lKTtcbiAgICAgIHRoaXMub3BlbkNsYXNzID0gbmFtZSA9PT0gJ3NpZHInID8gJ3NpZHItb3BlbicgOiAnc2lkci1vcGVuICcgKyBuYW1lICsgJy1vcGVuJztcbiAgICAgIHRoaXMubWVudVdpZHRoID0gdGhpcy5pdGVtLm91dGVyV2lkdGgodHJ1ZSk7XG4gICAgICB0aGlzLnNwZWVkID0gdGhpcy5pdGVtLmRhdGEoJ3NwZWVkJyk7XG4gICAgICB0aGlzLnNpZGUgPSB0aGlzLml0ZW0uZGF0YSgnc2lkZScpO1xuICAgICAgdGhpcy5kaXNwbGFjZSA9IHRoaXMuaXRlbS5kYXRhKCdkaXNwbGFjZScpO1xuICAgICAgdGhpcy50aW1pbmcgPSB0aGlzLml0ZW0uZGF0YSgndGltaW5nJyk7XG4gICAgICB0aGlzLm1ldGhvZCA9IHRoaXMuaXRlbS5kYXRhKCdtZXRob2QnKTtcbiAgICAgIHRoaXMub25PcGVuQ2FsbGJhY2sgPSB0aGlzLml0ZW0uZGF0YSgnb25PcGVuJyk7XG4gICAgICB0aGlzLm9uQ2xvc2VDYWxsYmFjayA9IHRoaXMuaXRlbS5kYXRhKCdvbkNsb3NlJyk7XG4gICAgICB0aGlzLm9uT3BlbkVuZENhbGxiYWNrID0gdGhpcy5pdGVtLmRhdGEoJ29uT3BlbkVuZCcpO1xuICAgICAgdGhpcy5vbkNsb3NlRW5kQ2FsbGJhY2sgPSB0aGlzLml0ZW0uZGF0YSgnb25DbG9zZUVuZCcpO1xuICAgICAgdGhpcy5ib2R5ID0gJCQyKHRoaXMuaXRlbS5kYXRhKCdib2R5JykpO1xuICAgIH1cblxuICAgIGJhYmVsSGVscGVycy5jcmVhdGVDbGFzcyhNZW51LCBbe1xuICAgICAga2V5OiAnZ2V0QW5pbWF0aW9uJyxcbiAgICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRBbmltYXRpb24oYWN0aW9uLCBlbGVtZW50KSB7XG4gICAgICAgIHZhciBhbmltYXRpb24gPSB7fSxcbiAgICAgICAgICAgIHByb3AgPSB0aGlzLnNpZGU7XG5cbiAgICAgICAgaWYgKGFjdGlvbiA9PT0gJ29wZW4nICYmIGVsZW1lbnQgPT09ICdib2R5Jykge1xuICAgICAgICAgIGFuaW1hdGlvbltwcm9wXSA9IHRoaXMubWVudVdpZHRoICsgJ3B4JztcbiAgICAgICAgfSBlbHNlIGlmIChhY3Rpb24gPT09ICdjbG9zZScgJiYgZWxlbWVudCA9PT0gJ21lbnUnKSB7XG4gICAgICAgICAgYW5pbWF0aW9uW3Byb3BdID0gJy0nICsgdGhpcy5tZW51V2lkdGggKyAncHgnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGFuaW1hdGlvbltwcm9wXSA9IDA7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gYW5pbWF0aW9uO1xuICAgICAgfVxuICAgIH0sIHtcbiAgICAgIGtleTogJ3ByZXBhcmVCb2R5JyxcbiAgICAgIHZhbHVlOiBmdW5jdGlvbiBwcmVwYXJlQm9keShhY3Rpb24pIHtcbiAgICAgICAgdmFyIHByb3AgPSBhY3Rpb24gPT09ICdvcGVuJyA/ICdoaWRkZW4nIDogJyc7XG5cbiAgICAgICAgLy8gUHJlcGFyZSBwYWdlIGlmIGNvbnRhaW5lciBpcyBib2R5XG4gICAgICAgIGlmICh0aGlzLmJvZHkuaXMoJ2JvZHknKSkge1xuICAgICAgICAgIHZhciAkaHRtbCA9ICQkMignaHRtbCcpLFxuICAgICAgICAgICAgICBzY3JvbGxUb3AgPSAkaHRtbC5zY3JvbGxUb3AoKTtcblxuICAgICAgICAgICRodG1sLmNzcygnb3ZlcmZsb3cteCcsIHByb3ApLnNjcm9sbFRvcChzY3JvbGxUb3ApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSwge1xuICAgICAga2V5OiAnb3BlbkJvZHknLFxuICAgICAgdmFsdWU6IGZ1bmN0aW9uIG9wZW5Cb2R5KCkge1xuICAgICAgICBpZiAodGhpcy5kaXNwbGFjZSkge1xuICAgICAgICAgIHZhciB0cmFuc2l0aW9ucyA9IGhlbHBlci50cmFuc2l0aW9ucyxcbiAgICAgICAgICAgICAgJGJvZHkgPSB0aGlzLmJvZHk7XG5cbiAgICAgICAgICBpZiAodHJhbnNpdGlvbnMuc3VwcG9ydGVkKSB7XG4gICAgICAgICAgICAkYm9keS5jc3ModHJhbnNpdGlvbnMucHJvcGVydHksIHRoaXMuc2lkZSArICcgJyArIHRoaXMuc3BlZWQgLyAxMDAwICsgJ3MgJyArIHRoaXMudGltaW5nKS5jc3ModGhpcy5zaWRlLCAwKS5jc3Moe1xuICAgICAgICAgICAgICB3aWR0aDogJGJvZHkud2lkdGgoKSxcbiAgICAgICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZSdcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgJGJvZHkuY3NzKHRoaXMuc2lkZSwgdGhpcy5tZW51V2lkdGggKyAncHgnKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdmFyIGJvZHlBbmltYXRpb24gPSB0aGlzLmdldEFuaW1hdGlvbihvcGVuQWN0aW9uLCAnYm9keScpO1xuXG4gICAgICAgICAgICAkYm9keS5jc3Moe1xuICAgICAgICAgICAgICB3aWR0aDogJGJvZHkud2lkdGgoKSxcbiAgICAgICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZSdcbiAgICAgICAgICAgIH0pLmFuaW1hdGUoYm9keUFuaW1hdGlvbiwge1xuICAgICAgICAgICAgICBxdWV1ZTogZmFsc2UsXG4gICAgICAgICAgICAgIGR1cmF0aW9uOiB0aGlzLnNwZWVkXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LCB7XG4gICAgICBrZXk6ICdvbkNsb3NlQm9keScsXG4gICAgICB2YWx1ZTogZnVuY3Rpb24gb25DbG9zZUJvZHkoKSB7XG4gICAgICAgIHZhciB0cmFuc2l0aW9ucyA9IGhlbHBlci50cmFuc2l0aW9ucyxcbiAgICAgICAgICAgIHJlc2V0U3R5bGVzID0ge1xuICAgICAgICAgIHdpZHRoOiAnJyxcbiAgICAgICAgICBwb3NpdGlvbjogJycsXG4gICAgICAgICAgcmlnaHQ6ICcnLFxuICAgICAgICAgIGxlZnQ6ICcnXG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKHRyYW5zaXRpb25zLnN1cHBvcnRlZCkge1xuICAgICAgICAgIHJlc2V0U3R5bGVzW3RyYW5zaXRpb25zLnByb3BlcnR5XSA9ICcnO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5ib2R5LmNzcyhyZXNldFN0eWxlcykudW5iaW5kKHRyYW5zaXRpb25FbmRFdmVudCk7XG4gICAgICB9XG4gICAgfSwge1xuICAgICAga2V5OiAnY2xvc2VCb2R5JyxcbiAgICAgIHZhbHVlOiBmdW5jdGlvbiBjbG9zZUJvZHkoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgaWYgKHRoaXMuZGlzcGxhY2UpIHtcbiAgICAgICAgICBpZiAoaGVscGVyLnRyYW5zaXRpb25zLnN1cHBvcnRlZCkge1xuICAgICAgICAgICAgdGhpcy5ib2R5LmNzcyh0aGlzLnNpZGUsIDApLm9uZSh0cmFuc2l0aW9uRW5kRXZlbnQsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgX3RoaXMub25DbG9zZUJvZHkoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2YXIgYm9keUFuaW1hdGlvbiA9IHRoaXMuZ2V0QW5pbWF0aW9uKGNsb3NlQWN0aW9uLCAnYm9keScpO1xuXG4gICAgICAgICAgICB0aGlzLmJvZHkuYW5pbWF0ZShib2R5QW5pbWF0aW9uLCB7XG4gICAgICAgICAgICAgIHF1ZXVlOiBmYWxzZSxcbiAgICAgICAgICAgICAgZHVyYXRpb246IHRoaXMuc3BlZWQsXG4gICAgICAgICAgICAgIGNvbXBsZXRlOiBmdW5jdGlvbiBjb21wbGV0ZSgpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5vbkNsb3NlQm9keSgpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LCB7XG4gICAgICBrZXk6ICdtb3ZlQm9keScsXG4gICAgICB2YWx1ZTogZnVuY3Rpb24gbW92ZUJvZHkoYWN0aW9uKSB7XG4gICAgICAgIGlmIChhY3Rpb24gPT09IG9wZW5BY3Rpb24pIHtcbiAgICAgICAgICB0aGlzLm9wZW5Cb2R5KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5jbG9zZUJvZHkoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sIHtcbiAgICAgIGtleTogJ29uT3Blbk1lbnUnLFxuICAgICAgdmFsdWU6IGZ1bmN0aW9uIG9uT3Blbk1lbnUoY2FsbGJhY2spIHtcbiAgICAgICAgdmFyIG5hbWUgPSB0aGlzLm5hbWU7XG5cbiAgICAgICAgc2lkclN0YXR1cy5tb3ZpbmcgPSBmYWxzZTtcbiAgICAgICAgc2lkclN0YXR1cy5vcGVuZWQgPSBuYW1lO1xuXG4gICAgICAgIHRoaXMuaXRlbS51bmJpbmQodHJhbnNpdGlvbkVuZEV2ZW50KTtcblxuICAgICAgICB0aGlzLmJvZHkucmVtb3ZlQ2xhc3MoYm9keUFuaW1hdGlvbkNsYXNzKS5hZGRDbGFzcyh0aGlzLm9wZW5DbGFzcyk7XG5cbiAgICAgICAgdGhpcy5vbk9wZW5FbmRDYWxsYmFjaygpO1xuXG4gICAgICAgIGlmICh0eXBlb2YgY2FsbGJhY2sgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICBjYWxsYmFjayhuYW1lKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sIHtcbiAgICAgIGtleTogJ29wZW5NZW51JyxcbiAgICAgIHZhbHVlOiBmdW5jdGlvbiBvcGVuTWVudShjYWxsYmFjaykge1xuICAgICAgICB2YXIgX3RoaXMyID0gdGhpcztcblxuICAgICAgICB2YXIgJGl0ZW0gPSB0aGlzLml0ZW07XG5cbiAgICAgICAgaWYgKGhlbHBlci50cmFuc2l0aW9ucy5zdXBwb3J0ZWQpIHtcbiAgICAgICAgICAkaXRlbS5jc3ModGhpcy5zaWRlLCAwKS5vbmUodHJhbnNpdGlvbkVuZEV2ZW50LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBfdGhpczIub25PcGVuTWVudShjYWxsYmFjayk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdmFyIG1lbnVBbmltYXRpb24gPSB0aGlzLmdldEFuaW1hdGlvbihvcGVuQWN0aW9uLCAnbWVudScpO1xuXG4gICAgICAgICAgJGl0ZW0uY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJykuYW5pbWF0ZShtZW51QW5pbWF0aW9uLCB7XG4gICAgICAgICAgICBxdWV1ZTogZmFsc2UsXG4gICAgICAgICAgICBkdXJhdGlvbjogdGhpcy5zcGVlZCxcbiAgICAgICAgICAgIGNvbXBsZXRlOiBmdW5jdGlvbiBjb21wbGV0ZSgpIHtcbiAgICAgICAgICAgICAgX3RoaXMyLm9uT3Blbk1lbnUoY2FsbGJhY2spO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSwge1xuICAgICAga2V5OiAnb25DbG9zZU1lbnUnLFxuICAgICAgdmFsdWU6IGZ1bmN0aW9uIG9uQ2xvc2VNZW51KGNhbGxiYWNrKSB7XG4gICAgICAgIHRoaXMuaXRlbS5jc3Moe1xuICAgICAgICAgIGxlZnQ6ICcnLFxuICAgICAgICAgIHJpZ2h0OiAnJ1xuICAgICAgICB9KS51bmJpbmQodHJhbnNpdGlvbkVuZEV2ZW50KTtcbiAgICAgICAgJCQyKCdodG1sJykuY3NzKCdvdmVyZmxvdy14JywgJycpO1xuXG4gICAgICAgIHNpZHJTdGF0dXMubW92aW5nID0gZmFsc2U7XG4gICAgICAgIHNpZHJTdGF0dXMub3BlbmVkID0gZmFsc2U7XG5cbiAgICAgICAgdGhpcy5ib2R5LnJlbW92ZUNsYXNzKGJvZHlBbmltYXRpb25DbGFzcykucmVtb3ZlQ2xhc3ModGhpcy5vcGVuQ2xhc3MpO1xuXG4gICAgICAgIHRoaXMub25DbG9zZUVuZENhbGxiYWNrKCk7XG5cbiAgICAgICAgLy8gQ2FsbGJhY2tcbiAgICAgICAgaWYgKHR5cGVvZiBjYWxsYmFjayA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIGNhbGxiYWNrKG5hbWUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSwge1xuICAgICAga2V5OiAnY2xvc2VNZW51JyxcbiAgICAgIHZhbHVlOiBmdW5jdGlvbiBjbG9zZU1lbnUoY2FsbGJhY2spIHtcbiAgICAgICAgdmFyIF90aGlzMyA9IHRoaXM7XG5cbiAgICAgICAgdmFyIGl0ZW0gPSB0aGlzLml0ZW07XG5cbiAgICAgICAgaWYgKGhlbHBlci50cmFuc2l0aW9ucy5zdXBwb3J0ZWQpIHtcbiAgICAgICAgICBpdGVtLmNzcyh0aGlzLnNpZGUsICcnKS5vbmUodHJhbnNpdGlvbkVuZEV2ZW50LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBfdGhpczMub25DbG9zZU1lbnUoY2FsbGJhY2spO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHZhciBtZW51QW5pbWF0aW9uID0gdGhpcy5nZXRBbmltYXRpb24oY2xvc2VBY3Rpb24sICdtZW51Jyk7XG5cbiAgICAgICAgICBpdGVtLmFuaW1hdGUobWVudUFuaW1hdGlvbiwge1xuICAgICAgICAgICAgcXVldWU6IGZhbHNlLFxuICAgICAgICAgICAgZHVyYXRpb246IHRoaXMuc3BlZWQsXG4gICAgICAgICAgICBjb21wbGV0ZTogZnVuY3Rpb24gY29tcGxldGUoKSB7XG4gICAgICAgICAgICAgIF90aGlzMy5vbkNsb3NlTWVudSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSwge1xuICAgICAga2V5OiAnbW92ZU1lbnUnLFxuICAgICAgdmFsdWU6IGZ1bmN0aW9uIG1vdmVNZW51KGFjdGlvbiwgY2FsbGJhY2spIHtcbiAgICAgICAgdGhpcy5ib2R5LmFkZENsYXNzKGJvZHlBbmltYXRpb25DbGFzcyk7XG5cbiAgICAgICAgaWYgKGFjdGlvbiA9PT0gb3BlbkFjdGlvbikge1xuICAgICAgICAgIHRoaXMub3Blbk1lbnUoY2FsbGJhY2spO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuY2xvc2VNZW51KGNhbGxiYWNrKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sIHtcbiAgICAgIGtleTogJ21vdmUnLFxuICAgICAgdmFsdWU6IGZ1bmN0aW9uIG1vdmUoYWN0aW9uLCBjYWxsYmFjaykge1xuICAgICAgICAvLyBMb2NrIHNpZHJcbiAgICAgICAgc2lkclN0YXR1cy5tb3ZpbmcgPSB0cnVlO1xuXG4gICAgICAgIHRoaXMucHJlcGFyZUJvZHkoYWN0aW9uKTtcbiAgICAgICAgdGhpcy5tb3ZlQm9keShhY3Rpb24pO1xuICAgICAgICB0aGlzLm1vdmVNZW51KGFjdGlvbiwgY2FsbGJhY2spO1xuICAgICAgfVxuICAgIH0sIHtcbiAgICAgIGtleTogJ29wZW4nLFxuICAgICAgdmFsdWU6IGZ1bmN0aW9uIG9wZW4oY2FsbGJhY2spIHtcbiAgICAgICAgdmFyIF90aGlzNCA9IHRoaXM7XG5cbiAgICAgICAgLy8gQ2hlY2sgaWYgaXMgYWxyZWFkeSBvcGVuZWQgb3IgbW92aW5nXG4gICAgICAgIGlmIChzaWRyU3RhdHVzLm9wZW5lZCA9PT0gdGhpcy5uYW1lIHx8IHNpZHJTdGF0dXMubW92aW5nKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gSWYgYW5vdGhlciBtZW51IG9wZW5lZCBjbG9zZSBmaXJzdFxuICAgICAgICBpZiAoc2lkclN0YXR1cy5vcGVuZWQgIT09IGZhbHNlKSB7XG4gICAgICAgICAgdmFyIGFscmVhZHlPcGVuZWRNZW51ID0gbmV3IE1lbnUoc2lkclN0YXR1cy5vcGVuZWQpO1xuXG4gICAgICAgICAgYWxyZWFkeU9wZW5lZE1lbnUuY2xvc2UoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgX3RoaXM0Lm9wZW4oY2FsbGJhY2spO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5tb3ZlKCdvcGVuJywgY2FsbGJhY2spO1xuXG4gICAgICAgIC8vIG9uT3BlbiBjYWxsYmFja1xuICAgICAgICB0aGlzLm9uT3BlbkNhbGxiYWNrKCk7XG4gICAgICB9XG4gICAgfSwge1xuICAgICAga2V5OiAnY2xvc2UnLFxuICAgICAgdmFsdWU6IGZ1bmN0aW9uIGNsb3NlKGNhbGxiYWNrKSB7XG4gICAgICAgIC8vIENoZWNrIGlmIGlzIGFscmVhZHkgY2xvc2VkIG9yIG1vdmluZ1xuICAgICAgICBpZiAoc2lkclN0YXR1cy5vcGVuZWQgIT09IHRoaXMubmFtZSB8fCBzaWRyU3RhdHVzLm1vdmluZykge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMubW92ZSgnY2xvc2UnLCBjYWxsYmFjayk7XG5cbiAgICAgICAgLy8gb25DbG9zZSBjYWxsYmFja1xuICAgICAgICB0aGlzLm9uQ2xvc2VDYWxsYmFjaygpO1xuICAgICAgfVxuICAgIH0sIHtcbiAgICAgIGtleTogJ3RvZ2dsZScsXG4gICAgICB2YWx1ZTogZnVuY3Rpb24gdG9nZ2xlKGNhbGxiYWNrKSB7XG4gICAgICAgIGlmIChzaWRyU3RhdHVzLm9wZW5lZCA9PT0gdGhpcy5uYW1lKSB7XG4gICAgICAgICAgdGhpcy5jbG9zZShjYWxsYmFjayk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5vcGVuKGNhbGxiYWNrKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1dKTtcbiAgICByZXR1cm4gTWVudTtcbiAgfSgpO1xuXG4gIHZhciAkJDEgPSBqUXVlcnk7XG5cbiAgZnVuY3Rpb24gZXhlY3V0ZShhY3Rpb24sIG5hbWUsIGNhbGxiYWNrKSB7XG4gICAgdmFyIHNpZHIgPSBuZXcgTWVudShuYW1lKTtcblxuICAgIHN3aXRjaCAoYWN0aW9uKSB7XG4gICAgICBjYXNlICdvcGVuJzpcbiAgICAgICAgc2lkci5vcGVuKGNhbGxiYWNrKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdjbG9zZSc6XG4gICAgICAgIHNpZHIuY2xvc2UoY2FsbGJhY2spO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3RvZ2dsZSc6XG4gICAgICAgIHNpZHIudG9nZ2xlKGNhbGxiYWNrKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICAkJDEuZXJyb3IoJ01ldGhvZCAnICsgYWN0aW9uICsgJyBkb2VzIG5vdCBleGlzdCBvbiBqUXVlcnkuc2lkcicpO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICB2YXIgaTtcbiAgdmFyICQgPSBqUXVlcnk7XG4gIHZhciBwdWJsaWNNZXRob2RzID0gWydvcGVuJywgJ2Nsb3NlJywgJ3RvZ2dsZSddO1xuICB2YXIgbWV0aG9kTmFtZTtcbiAgdmFyIG1ldGhvZHMgPSB7fTtcbiAgdmFyIGdldE1ldGhvZCA9IGZ1bmN0aW9uIGdldE1ldGhvZChtZXRob2ROYW1lKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChuYW1lLCBjYWxsYmFjaykge1xuICAgICAgLy8gQ2hlY2sgYXJndW1lbnRzXG4gICAgICBpZiAodHlwZW9mIG5hbWUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgY2FsbGJhY2sgPSBuYW1lO1xuICAgICAgICBuYW1lID0gJ3NpZHInO1xuICAgICAgfSBlbHNlIGlmICghbmFtZSkge1xuICAgICAgICBuYW1lID0gJ3NpZHInO1xuICAgICAgfVxuXG4gICAgICBleGVjdXRlKG1ldGhvZE5hbWUsIG5hbWUsIGNhbGxiYWNrKTtcbiAgICB9O1xuICB9O1xuICBmb3IgKGkgPSAwOyBpIDwgcHVibGljTWV0aG9kcy5sZW5ndGg7IGkrKykge1xuICAgIG1ldGhvZE5hbWUgPSBwdWJsaWNNZXRob2RzW2ldO1xuICAgIG1ldGhvZHNbbWV0aG9kTmFtZV0gPSBnZXRNZXRob2QobWV0aG9kTmFtZSk7XG4gIH1cblxuICBmdW5jdGlvbiBzaWRyKG1ldGhvZCkge1xuICAgIGlmIChtZXRob2QgPT09ICdzdGF0dXMnKSB7XG4gICAgICByZXR1cm4gc2lkclN0YXR1cztcbiAgICB9IGVsc2UgaWYgKG1ldGhvZHNbbWV0aG9kXSkge1xuICAgICAgcmV0dXJuIG1ldGhvZHNbbWV0aG9kXS5hcHBseSh0aGlzLCBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBtZXRob2QgPT09ICdmdW5jdGlvbicgfHwgdHlwZW9mIG1ldGhvZCA9PT0gJ3N0cmluZycgfHwgIW1ldGhvZCkge1xuICAgICAgcmV0dXJuIG1ldGhvZHMudG9nZ2xlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICQuZXJyb3IoJ01ldGhvZCAnICsgbWV0aG9kICsgJyBkb2VzIG5vdCBleGlzdCBvbiBqUXVlcnkuc2lkcicpO1xuICAgIH1cbiAgfVxuXG4gIHZhciAkJDMgPSBqUXVlcnk7XG5cbiAgZnVuY3Rpb24gZmlsbENvbnRlbnQoJHNpZGVNZW51LCBzZXR0aW5ncykge1xuICAgIC8vIFRoZSBtZW51IGNvbnRlbnRcbiAgICBpZiAodHlwZW9mIHNldHRpbmdzLnNvdXJjZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdmFyIG5ld0NvbnRlbnQgPSBzZXR0aW5ncy5zb3VyY2UobmFtZSk7XG5cbiAgICAgICRzaWRlTWVudS5odG1sKG5ld0NvbnRlbnQpO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIHNldHRpbmdzLnNvdXJjZSA9PT0gJ3N0cmluZycgJiYgaGVscGVyLmlzVXJsKHNldHRpbmdzLnNvdXJjZSkpIHtcbiAgICAgICQkMy5nZXQoc2V0dGluZ3Muc291cmNlLCBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAkc2lkZU1lbnUuaHRtbChkYXRhKTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIHNldHRpbmdzLnNvdXJjZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHZhciBodG1sQ29udGVudCA9ICcnLFxuICAgICAgICAgIHNlbGVjdG9ycyA9IHNldHRpbmdzLnNvdXJjZS5zcGxpdCgnLCcpO1xuXG4gICAgICAkJDMuZWFjaChzZWxlY3RvcnMsIGZ1bmN0aW9uIChpbmRleCwgZWxlbWVudCkge1xuICAgICAgICBodG1sQ29udGVudCArPSAnPGRpdiBjbGFzcz1cInNpZHItaW5uZXJcIj4nICsgJCQzKGVsZW1lbnQpLmh0bWwoKSArICc8L2Rpdj4nO1xuICAgICAgfSk7XG5cbiAgICAgIC8vIFJlbmFtaW5nIGlkcyBhbmQgY2xhc3Nlc1xuICAgICAgaWYgKHNldHRpbmdzLnJlbmFtaW5nKSB7XG4gICAgICAgIHZhciAkaHRtbENvbnRlbnQgPSAkJDMoJzxkaXYgLz4nKS5odG1sKGh0bWxDb250ZW50KTtcblxuICAgICAgICAkaHRtbENvbnRlbnQuZmluZCgnKicpLmVhY2goZnVuY3Rpb24gKGluZGV4LCBlbGVtZW50KSB7XG4gICAgICAgICAgdmFyICRlbGVtZW50ID0gJCQzKGVsZW1lbnQpO1xuXG4gICAgICAgICAgaGVscGVyLmFkZFByZWZpeGVzKCRlbGVtZW50KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGh0bWxDb250ZW50ID0gJGh0bWxDb250ZW50Lmh0bWwoKTtcbiAgICAgIH1cblxuICAgICAgJHNpZGVNZW51Lmh0bWwoaHRtbENvbnRlbnQpO1xuICAgIH0gZWxzZSBpZiAoc2V0dGluZ3Muc291cmNlICE9PSBudWxsKSB7XG4gICAgICAkJDMuZXJyb3IoJ0ludmFsaWQgU2lkciBTb3VyY2UnKTtcbiAgICB9XG5cbiAgICByZXR1cm4gJHNpZGVNZW51O1xuICB9XG5cbiAgZnVuY3Rpb24gZm5TaWRyKG9wdGlvbnMpIHtcbiAgICB2YXIgdHJhbnNpdGlvbnMgPSBoZWxwZXIudHJhbnNpdGlvbnMsXG4gICAgICAgIHNldHRpbmdzID0gJCQzLmV4dGVuZCh7XG4gICAgICBuYW1lOiAnc2lkcicsIC8vIE5hbWUgZm9yIHRoZSAnc2lkcidcbiAgICAgIHNwZWVkOiAyMDAsIC8vIEFjY2VwdHMgc3RhbmRhcmQgalF1ZXJ5IGVmZmVjdHMgc3BlZWRzIChpLmUuIGZhc3QsIG5vcm1hbCBvciBtaWxsaXNlY29uZHMpXG4gICAgICBzaWRlOiAnbGVmdCcsIC8vIEFjY2VwdHMgJ2xlZnQnIG9yICdyaWdodCdcbiAgICAgIHNvdXJjZTogbnVsbCwgLy8gT3ZlcnJpZGUgdGhlIHNvdXJjZSBvZiB0aGUgY29udGVudC5cbiAgICAgIHJlbmFtaW5nOiB0cnVlLCAvLyBUaGUgaWRzIGFuZCBjbGFzc2VzIHdpbGwgYmUgcHJlcGVuZGVkIHdpdGggYSBwcmVmaXggd2hlbiBsb2FkaW5nIGV4aXN0ZW50IGNvbnRlbnRcbiAgICAgIGJvZHk6ICdib2R5JywgLy8gUGFnZSBjb250YWluZXIgc2VsZWN0b3IsXG4gICAgICBkaXNwbGFjZTogdHJ1ZSwgLy8gRGlzcGxhY2UgdGhlIGJvZHkgY29udGVudCBvciBub3RcbiAgICAgIHRpbWluZzogJ2Vhc2UnLCAvLyBUaW1pbmcgZnVuY3Rpb24gZm9yIENTUyB0cmFuc2l0aW9uc1xuICAgICAgbWV0aG9kOiAndG9nZ2xlJywgLy8gVGhlIG1ldGhvZCB0byBjYWxsIHdoZW4gZWxlbWVudCBpcyBjbGlja2VkXG4gICAgICBiaW5kOiAndG91Y2hzdGFydCBjbGljaycsIC8vIFRoZSBldmVudChzKSB0byB0cmlnZ2VyIHRoZSBtZW51XG4gICAgICBvbk9wZW46IGZ1bmN0aW9uIG9uT3BlbigpIHt9LFxuICAgICAgLy8gQ2FsbGJhY2sgd2hlbiBzaWRyIHN0YXJ0IG9wZW5pbmdcbiAgICAgIG9uQ2xvc2U6IGZ1bmN0aW9uIG9uQ2xvc2UoKSB7fSxcbiAgICAgIC8vIENhbGxiYWNrIHdoZW4gc2lkciBzdGFydCBjbG9zaW5nXG4gICAgICBvbk9wZW5FbmQ6IGZ1bmN0aW9uIG9uT3BlbkVuZCgpIHt9LFxuICAgICAgLy8gQ2FsbGJhY2sgd2hlbiBzaWRyIGVuZCBvcGVuaW5nXG4gICAgICBvbkNsb3NlRW5kOiBmdW5jdGlvbiBvbkNsb3NlRW5kKCkge30gLy8gQ2FsbGJhY2sgd2hlbiBzaWRyIGVuZCBjbG9zaW5nXG5cbiAgICB9LCBvcHRpb25zKSxcbiAgICAgICAgbmFtZSA9IHNldHRpbmdzLm5hbWUsXG4gICAgICAgICRzaWRlTWVudSA9ICQkMygnIycgKyBuYW1lKTtcblxuICAgIC8vIElmIHRoZSBzaWRlIG1lbnUgZG8gbm90IGV4aXN0IGNyZWF0ZSBpdFxuICAgIGlmICgkc2lkZU1lbnUubGVuZ3RoID09PSAwKSB7XG4gICAgICAkc2lkZU1lbnUgPSAkJDMoJzxkaXYgLz4nKS5hdHRyKCdpZCcsIG5hbWUpLmFwcGVuZFRvKCQkMygnYm9keScpKTtcbiAgICB9XG5cbiAgICAvLyBBZGQgdHJhbnNpdGlvbiB0byBtZW51IGlmIGFyZSBzdXBwb3J0ZWRcbiAgICBpZiAodHJhbnNpdGlvbnMuc3VwcG9ydGVkKSB7XG4gICAgICAkc2lkZU1lbnUuY3NzKHRyYW5zaXRpb25zLnByb3BlcnR5LCBzZXR0aW5ncy5zaWRlICsgJyAnICsgc2V0dGluZ3Muc3BlZWQgLyAxMDAwICsgJ3MgJyArIHNldHRpbmdzLnRpbWluZyk7XG4gICAgfVxuXG4gICAgLy8gQWRkaW5nIHN0eWxlcyBhbmQgb3B0aW9uc1xuICAgICRzaWRlTWVudS5hZGRDbGFzcygnc2lkcicpLmFkZENsYXNzKHNldHRpbmdzLnNpZGUpLmRhdGEoe1xuICAgICAgc3BlZWQ6IHNldHRpbmdzLnNwZWVkLFxuICAgICAgc2lkZTogc2V0dGluZ3Muc2lkZSxcbiAgICAgIGJvZHk6IHNldHRpbmdzLmJvZHksXG4gICAgICBkaXNwbGFjZTogc2V0dGluZ3MuZGlzcGxhY2UsXG4gICAgICB0aW1pbmc6IHNldHRpbmdzLnRpbWluZyxcbiAgICAgIG1ldGhvZDogc2V0dGluZ3MubWV0aG9kLFxuICAgICAgb25PcGVuOiBzZXR0aW5ncy5vbk9wZW4sXG4gICAgICBvbkNsb3NlOiBzZXR0aW5ncy5vbkNsb3NlLFxuICAgICAgb25PcGVuRW5kOiBzZXR0aW5ncy5vbk9wZW5FbmQsXG4gICAgICBvbkNsb3NlRW5kOiBzZXR0aW5ncy5vbkNsb3NlRW5kXG4gICAgfSk7XG5cbiAgICAkc2lkZU1lbnUgPSBmaWxsQ29udGVudCgkc2lkZU1lbnUsIHNldHRpbmdzKTtcblxuICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgdmFyICR0aGlzID0gJCQzKHRoaXMpLFxuICAgICAgICAgIGRhdGEgPSAkdGhpcy5kYXRhKCdzaWRyJyksXG4gICAgICAgICAgZmxhZyA9IGZhbHNlO1xuXG4gICAgICAvLyBJZiB0aGUgcGx1Z2luIGhhc24ndCBiZWVuIGluaXRpYWxpemVkIHlldFxuICAgICAgaWYgKCFkYXRhKSB7XG4gICAgICAgIHNpZHJTdGF0dXMubW92aW5nID0gZmFsc2U7XG4gICAgICAgIHNpZHJTdGF0dXMub3BlbmVkID0gZmFsc2U7XG5cbiAgICAgICAgJHRoaXMuZGF0YSgnc2lkcicsIG5hbWUpO1xuXG4gICAgICAgICR0aGlzLmJpbmQoc2V0dGluZ3MuYmluZCwgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgIGlmICghZmxhZykge1xuICAgICAgICAgICAgZmxhZyA9IHRydWU7XG4gICAgICAgICAgICBzaWRyKHNldHRpbmdzLm1ldGhvZCwgbmFtZSk7XG5cbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICBmbGFnID0gZmFsc2U7XG4gICAgICAgICAgICB9LCAxMDApO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBqUXVlcnkuc2lkciA9IHNpZHI7XG4gIGpRdWVyeS5mbi5zaWRyID0gZm5TaWRyO1xuXG59KCkpOyIsIiFmdW5jdGlvbihlKXt2YXIgdDtlLmZuLnNsaW5reT1mdW5jdGlvbihhKXt2YXIgcz1lLmV4dGVuZCh7bGFiZWw6XCJCYWNrXCIsdGl0bGU6ITEsc3BlZWQ6MzAwLHJlc2l6ZTohMH0sYSksaT1lKHRoaXMpLG49aS5jaGlsZHJlbigpLmZpcnN0KCk7aS5hZGRDbGFzcyhcInNsaW5reS1tZW51XCIpO3ZhciByPWZ1bmN0aW9uKGUsdCl7dmFyIGE9TWF0aC5yb3VuZChwYXJzZUludChuLmdldCgwKS5zdHlsZS5sZWZ0KSl8fDA7bi5jc3MoXCJsZWZ0XCIsYS0xMDAqZStcIiVcIiksXCJmdW5jdGlvblwiPT10eXBlb2YgdCYmc2V0VGltZW91dCh0LHMuc3BlZWQpfSxsPWZ1bmN0aW9uKGUpe2kuaGVpZ2h0KGUub3V0ZXJIZWlnaHQoKSl9LGQ9ZnVuY3Rpb24oZSl7aS5jc3MoXCJ0cmFuc2l0aW9uLWR1cmF0aW9uXCIsZStcIm1zXCIpLG4uY3NzKFwidHJhbnNpdGlvbi1kdXJhdGlvblwiLGUrXCJtc1wiKX07aWYoZChzLnNwZWVkKSxlKFwiYSArIHVsXCIsaSkucHJldigpLmFkZENsYXNzKFwibmV4dFwiKSxlKFwibGkgPiB1bFwiLGkpLnByZXBlbmQoJzxsaSBjbGFzcz1cImhlYWRlclwiPicpLHMudGl0bGU9PT0hMCYmZShcImxpID4gdWxcIixpKS5lYWNoKGZ1bmN0aW9uKCl7dmFyIHQ9ZSh0aGlzKS5wYXJlbnQoKS5maW5kKFwiYVwiKS5maXJzdCgpLnRleHQoKSxhPWUoXCI8aDI+XCIpLnRleHQodCk7ZShcIj4gLmhlYWRlclwiLHRoaXMpLmFwcGVuZChhKX0pLHMudGl0bGV8fHMubGFiZWwhPT0hMCl7dmFyIG89ZShcIjxhPlwiKS50ZXh0KHMubGFiZWwpLnByb3AoXCJocmVmXCIsXCIjXCIpLmFkZENsYXNzKFwiYmFja1wiKTtlKFwiLmhlYWRlclwiLGkpLmFwcGVuZChvKX1lbHNlIGUoXCJsaSA+IHVsXCIsaSkuZWFjaChmdW5jdGlvbigpe3ZhciB0PWUodGhpcykucGFyZW50KCkuZmluZChcImFcIikuZmlyc3QoKS50ZXh0KCksYT1lKFwiPGE+XCIpLnRleHQodCkucHJvcChcImhyZWZcIixcIiNcIikuYWRkQ2xhc3MoXCJiYWNrXCIpO2UoXCI+IC5oZWFkZXJcIix0aGlzKS5hcHBlbmQoYSl9KTtlKFwiYVwiLGkpLm9uKFwiY2xpY2tcIixmdW5jdGlvbihhKXtpZighKHQrcy5zcGVlZD5EYXRlLm5vdygpKSl7dD1EYXRlLm5vdygpO3ZhciBuPWUodGhpcyk7LyMvLnRlc3QodGhpcy5ocmVmKSYmYS5wcmV2ZW50RGVmYXVsdCgpLG4uaGFzQ2xhc3MoXCJuZXh0XCIpPyhpLmZpbmQoXCIuYWN0aXZlXCIpLnJlbW92ZUNsYXNzKFwiYWN0aXZlXCIpLG4ubmV4dCgpLnNob3coKS5hZGRDbGFzcyhcImFjdGl2ZVwiKSxyKDEpLHMucmVzaXplJiZsKG4ubmV4dCgpKSk6bi5oYXNDbGFzcyhcImJhY2tcIikmJihyKC0xLGZ1bmN0aW9uKCl7aS5maW5kKFwiLmFjdGl2ZVwiKS5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKSxuLnBhcmVudCgpLnBhcmVudCgpLmhpZGUoKS5wYXJlbnRzVW50aWwoaSxcInVsXCIpLmZpcnN0KCkuYWRkQ2xhc3MoXCJhY3RpdmVcIil9KSxzLnJlc2l6ZSYmbChuLnBhcmVudCgpLnBhcmVudCgpLnBhcmVudHNVbnRpbChpLFwidWxcIikpKX19KSx0aGlzLmp1bXA9ZnVuY3Rpb24odCxhKXt0PWUodCk7dmFyIG49aS5maW5kKFwiLmFjdGl2ZVwiKTtuPW4ubGVuZ3RoPjA/bi5wYXJlbnRzVW50aWwoaSxcInVsXCIpLmxlbmd0aDowLGkuZmluZChcInVsXCIpLnJlbW92ZUNsYXNzKFwiYWN0aXZlXCIpLmhpZGUoKTt2YXIgbz10LnBhcmVudHNVbnRpbChpLFwidWxcIik7by5zaG93KCksdC5zaG93KCkuYWRkQ2xhc3MoXCJhY3RpdmVcIiksYT09PSExJiZkKDApLHIoby5sZW5ndGgtbikscy5yZXNpemUmJmwodCksYT09PSExJiZkKHMuc3BlZWQpfSx0aGlzLmhvbWU9ZnVuY3Rpb24odCl7dD09PSExJiZkKDApO3ZhciBhPWkuZmluZChcIi5hY3RpdmVcIiksbj1hLnBhcmVudHNVbnRpbChpLFwibGlcIikubGVuZ3RoO24+MCYmKHIoLW4sZnVuY3Rpb24oKXthLnJlbW92ZUNsYXNzKFwiYWN0aXZlXCIpfSkscy5yZXNpemUmJmwoZShhLnBhcmVudHNVbnRpbChpLFwibGlcIikuZ2V0KG4tMSkpLnBhcmVudCgpKSksdD09PSExJiZkKHMuc3BlZWQpfSx0aGlzLmRlc3Ryb3k9ZnVuY3Rpb24oKXtlKFwiLmhlYWRlclwiLGkpLnJlbW92ZSgpLGUoXCJhXCIsaSkucmVtb3ZlQ2xhc3MoXCJuZXh0XCIpLm9mZihcImNsaWNrXCIpLGkucmVtb3ZlQ2xhc3MoXCJzbGlua3ktbWVudVwiKS5jc3MoXCJ0cmFuc2l0aW9uLWR1cmF0aW9uXCIsXCJcIiksbi5jc3MoXCJ0cmFuc2l0aW9uLWR1cmF0aW9uXCIsXCJcIil9O3ZhciBjPWkuZmluZChcIi5hY3RpdmVcIik7cmV0dXJuIGMubGVuZ3RoPjAmJihjLnJlbW92ZUNsYXNzKFwiYWN0aXZlXCIpLHRoaXMuanVtcChjLCExKSksdGhpc319KGpRdWVyeSk7IiwiKGZ1bmN0aW9uKCkge1xuICB2YXIgQWpheE1vbml0b3IsIEJhciwgRG9jdW1lbnRNb25pdG9yLCBFbGVtZW50TW9uaXRvciwgRWxlbWVudFRyYWNrZXIsIEV2ZW50TGFnTW9uaXRvciwgRXZlbnRlZCwgRXZlbnRzLCBOb1RhcmdldEVycm9yLCBQYWNlLCBSZXF1ZXN0SW50ZXJjZXB0LCBTT1VSQ0VfS0VZUywgU2NhbGVyLCBTb2NrZXRSZXF1ZXN0VHJhY2tlciwgWEhSUmVxdWVzdFRyYWNrZXIsIGFuaW1hdGlvbiwgYXZnQW1wbGl0dWRlLCBiYXIsIGNhbmNlbEFuaW1hdGlvbiwgY2FuY2VsQW5pbWF0aW9uRnJhbWUsIGRlZmF1bHRPcHRpb25zLCBleHRlbmQsIGV4dGVuZE5hdGl2ZSwgZ2V0RnJvbURPTSwgZ2V0SW50ZXJjZXB0LCBoYW5kbGVQdXNoU3RhdGUsIGlnbm9yZVN0YWNrLCBpbml0LCBub3csIG9wdGlvbnMsIHJlcXVlc3RBbmltYXRpb25GcmFtZSwgcmVzdWx0LCBydW5BbmltYXRpb24sIHNjYWxlcnMsIHNob3VsZElnbm9yZVVSTCwgc2hvdWxkVHJhY2ssIHNvdXJjZSwgc291cmNlcywgdW5pU2NhbGVyLCBfV2ViU29ja2V0LCBfWERvbWFpblJlcXVlc3QsIF9YTUxIdHRwUmVxdWVzdCwgX2ksIF9pbnRlcmNlcHQsIF9sZW4sIF9wdXNoU3RhdGUsIF9yZWYsIF9yZWYxLCBfcmVwbGFjZVN0YXRlLFxuICAgIF9fc2xpY2UgPSBbXS5zbGljZSxcbiAgICBfX2hhc1Byb3AgPSB7fS5oYXNPd25Qcm9wZXJ0eSxcbiAgICBfX2V4dGVuZHMgPSBmdW5jdGlvbihjaGlsZCwgcGFyZW50KSB7IGZvciAodmFyIGtleSBpbiBwYXJlbnQpIHsgaWYgKF9faGFzUHJvcC5jYWxsKHBhcmVudCwga2V5KSkgY2hpbGRba2V5XSA9IHBhcmVudFtrZXldOyB9IGZ1bmN0aW9uIGN0b3IoKSB7IHRoaXMuY29uc3RydWN0b3IgPSBjaGlsZDsgfSBjdG9yLnByb3RvdHlwZSA9IHBhcmVudC5wcm90b3R5cGU7IGNoaWxkLnByb3RvdHlwZSA9IG5ldyBjdG9yKCk7IGNoaWxkLl9fc3VwZXJfXyA9IHBhcmVudC5wcm90b3R5cGU7IHJldHVybiBjaGlsZDsgfSxcbiAgICBfX2luZGV4T2YgPSBbXS5pbmRleE9mIHx8IGZ1bmN0aW9uKGl0ZW0pIHsgZm9yICh2YXIgaSA9IDAsIGwgPSB0aGlzLmxlbmd0aDsgaSA8IGw7IGkrKykgeyBpZiAoaSBpbiB0aGlzICYmIHRoaXNbaV0gPT09IGl0ZW0pIHJldHVybiBpOyB9IHJldHVybiAtMTsgfTtcblxuICBkZWZhdWx0T3B0aW9ucyA9IHtcbiAgICBjYXRjaHVwVGltZTogMTAwLFxuICAgIGluaXRpYWxSYXRlOiAuMDMsXG4gICAgbWluVGltZTogMjUwLFxuICAgIGdob3N0VGltZTogMTAwLFxuICAgIG1heFByb2dyZXNzUGVyRnJhbWU6IDIwLFxuICAgIGVhc2VGYWN0b3I6IDEuMjUsXG4gICAgc3RhcnRPblBhZ2VMb2FkOiB0cnVlLFxuICAgIHJlc3RhcnRPblB1c2hTdGF0ZTogdHJ1ZSxcbiAgICByZXN0YXJ0T25SZXF1ZXN0QWZ0ZXI6IDUwMCxcbiAgICB0YXJnZXQ6ICdib2R5JyxcbiAgICBlbGVtZW50czoge1xuICAgICAgY2hlY2tJbnRlcnZhbDogMTAwLFxuICAgICAgc2VsZWN0b3JzOiBbJ2JvZHknXVxuICAgIH0sXG4gICAgZXZlbnRMYWc6IHtcbiAgICAgIG1pblNhbXBsZXM6IDEwLFxuICAgICAgc2FtcGxlQ291bnQ6IDMsXG4gICAgICBsYWdUaHJlc2hvbGQ6IDNcbiAgICB9LFxuICAgIGFqYXg6IHtcbiAgICAgIHRyYWNrTWV0aG9kczogWydHRVQnXSxcbiAgICAgIHRyYWNrV2ViU29ja2V0czogdHJ1ZSxcbiAgICAgIGlnbm9yZVVSTHM6IFtdXG4gICAgfVxuICB9O1xuXG4gIG5vdyA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBfcmVmO1xuICAgIHJldHVybiAoX3JlZiA9IHR5cGVvZiBwZXJmb3JtYW5jZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiBwZXJmb3JtYW5jZSAhPT0gbnVsbCA/IHR5cGVvZiBwZXJmb3JtYW5jZS5ub3cgPT09IFwiZnVuY3Rpb25cIiA/IHBlcmZvcm1hbmNlLm5vdygpIDogdm9pZCAwIDogdm9pZCAwKSAhPSBudWxsID8gX3JlZiA6ICsobmV3IERhdGUpO1xuICB9O1xuXG4gIHJlcXVlc3RBbmltYXRpb25GcmFtZSA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHwgd2luZG93Lm1velJlcXVlc3RBbmltYXRpb25GcmFtZSB8fCB3aW5kb3cud2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8IHdpbmRvdy5tc1JlcXVlc3RBbmltYXRpb25GcmFtZTtcblxuICBjYW5jZWxBbmltYXRpb25GcmFtZSA9IHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZSB8fCB3aW5kb3cubW96Q2FuY2VsQW5pbWF0aW9uRnJhbWU7XG5cbiAgaWYgKHJlcXVlc3RBbmltYXRpb25GcmFtZSA9PSBudWxsKSB7XG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lID0gZnVuY3Rpb24oZm4pIHtcbiAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZuLCA1MCk7XG4gICAgfTtcbiAgICBjYW5jZWxBbmltYXRpb25GcmFtZSA9IGZ1bmN0aW9uKGlkKSB7XG4gICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KGlkKTtcbiAgICB9O1xuICB9XG5cbiAgcnVuQW5pbWF0aW9uID0gZnVuY3Rpb24oZm4pIHtcbiAgICB2YXIgbGFzdCwgdGljaztcbiAgICBsYXN0ID0gbm93KCk7XG4gICAgdGljayA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGRpZmY7XG4gICAgICBkaWZmID0gbm93KCkgLSBsYXN0O1xuICAgICAgaWYgKGRpZmYgPj0gMzMpIHtcbiAgICAgICAgbGFzdCA9IG5vdygpO1xuICAgICAgICByZXR1cm4gZm4oZGlmZiwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aWNrKTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dCh0aWNrLCAzMyAtIGRpZmYpO1xuICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIHRpY2soKTtcbiAgfTtcblxuICByZXN1bHQgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgYXJncywga2V5LCBvYmo7XG4gICAgb2JqID0gYXJndW1lbnRzWzBdLCBrZXkgPSBhcmd1bWVudHNbMV0sIGFyZ3MgPSAzIDw9IGFyZ3VtZW50cy5sZW5ndGggPyBfX3NsaWNlLmNhbGwoYXJndW1lbnRzLCAyKSA6IFtdO1xuICAgIGlmICh0eXBlb2Ygb2JqW2tleV0gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJldHVybiBvYmpba2V5XS5hcHBseShvYmosIGFyZ3MpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gb2JqW2tleV07XG4gICAgfVxuICB9O1xuXG4gIGV4dGVuZCA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBrZXksIG91dCwgc291cmNlLCBzb3VyY2VzLCB2YWwsIF9pLCBfbGVuO1xuICAgIG91dCA9IGFyZ3VtZW50c1swXSwgc291cmNlcyA9IDIgPD0gYXJndW1lbnRzLmxlbmd0aCA/IF9fc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpIDogW107XG4gICAgZm9yIChfaSA9IDAsIF9sZW4gPSBzb3VyY2VzLmxlbmd0aDsgX2kgPCBfbGVuOyBfaSsrKSB7XG4gICAgICBzb3VyY2UgPSBzb3VyY2VzW19pXTtcbiAgICAgIGlmIChzb3VyY2UpIHtcbiAgICAgICAgZm9yIChrZXkgaW4gc291cmNlKSB7XG4gICAgICAgICAgaWYgKCFfX2hhc1Byb3AuY2FsbChzb3VyY2UsIGtleSkpIGNvbnRpbnVlO1xuICAgICAgICAgIHZhbCA9IHNvdXJjZVtrZXldO1xuICAgICAgICAgIGlmICgob3V0W2tleV0gIT0gbnVsbCkgJiYgdHlwZW9mIG91dFtrZXldID09PSAnb2JqZWN0JyAmJiAodmFsICE9IG51bGwpICYmIHR5cGVvZiB2YWwgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICBleHRlbmQob3V0W2tleV0sIHZhbCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG91dFtrZXldID0gdmFsO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gb3V0O1xuICB9O1xuXG4gIGF2Z0FtcGxpdHVkZSA9IGZ1bmN0aW9uKGFycikge1xuICAgIHZhciBjb3VudCwgc3VtLCB2LCBfaSwgX2xlbjtcbiAgICBzdW0gPSBjb3VudCA9IDA7XG4gICAgZm9yIChfaSA9IDAsIF9sZW4gPSBhcnIubGVuZ3RoOyBfaSA8IF9sZW47IF9pKyspIHtcbiAgICAgIHYgPSBhcnJbX2ldO1xuICAgICAgc3VtICs9IE1hdGguYWJzKHYpO1xuICAgICAgY291bnQrKztcbiAgICB9XG4gICAgcmV0dXJuIHN1bSAvIGNvdW50O1xuICB9O1xuXG4gIGdldEZyb21ET00gPSBmdW5jdGlvbihrZXksIGpzb24pIHtcbiAgICB2YXIgZGF0YSwgZSwgZWw7XG4gICAgaWYgKGtleSA9PSBudWxsKSB7XG4gICAgICBrZXkgPSAnb3B0aW9ucyc7XG4gICAgfVxuICAgIGlmIChqc29uID09IG51bGwpIHtcbiAgICAgIGpzb24gPSB0cnVlO1xuICAgIH1cbiAgICBlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJbZGF0YS1wYWNlLVwiICsga2V5ICsgXCJdXCIpO1xuICAgIGlmICghZWwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZGF0YSA9IGVsLmdldEF0dHJpYnV0ZShcImRhdGEtcGFjZS1cIiArIGtleSk7XG4gICAgaWYgKCFqc29uKSB7XG4gICAgICByZXR1cm4gZGF0YTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBKU09OLnBhcnNlKGRhdGEpO1xuICAgIH0gY2F0Y2ggKF9lcnJvcikge1xuICAgICAgZSA9IF9lcnJvcjtcbiAgICAgIHJldHVybiB0eXBlb2YgY29uc29sZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiBjb25zb2xlICE9PSBudWxsID8gY29uc29sZS5lcnJvcihcIkVycm9yIHBhcnNpbmcgaW5saW5lIHBhY2Ugb3B0aW9uc1wiLCBlKSA6IHZvaWQgMDtcbiAgICB9XG4gIH07XG5cbiAgRXZlbnRlZCA9IChmdW5jdGlvbigpIHtcbiAgICBmdW5jdGlvbiBFdmVudGVkKCkge31cblxuICAgIEV2ZW50ZWQucHJvdG90eXBlLm9uID0gZnVuY3Rpb24oZXZlbnQsIGhhbmRsZXIsIGN0eCwgb25jZSkge1xuICAgICAgdmFyIF9iYXNlO1xuICAgICAgaWYgKG9uY2UgPT0gbnVsbCkge1xuICAgICAgICBvbmNlID0gZmFsc2U7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5iaW5kaW5ncyA9PSBudWxsKSB7XG4gICAgICAgIHRoaXMuYmluZGluZ3MgPSB7fTtcbiAgICAgIH1cbiAgICAgIGlmICgoX2Jhc2UgPSB0aGlzLmJpbmRpbmdzKVtldmVudF0gPT0gbnVsbCkge1xuICAgICAgICBfYmFzZVtldmVudF0gPSBbXTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzLmJpbmRpbmdzW2V2ZW50XS5wdXNoKHtcbiAgICAgICAgaGFuZGxlcjogaGFuZGxlcixcbiAgICAgICAgY3R4OiBjdHgsXG4gICAgICAgIG9uY2U6IG9uY2VcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICBFdmVudGVkLnByb3RvdHlwZS5vbmNlID0gZnVuY3Rpb24oZXZlbnQsIGhhbmRsZXIsIGN0eCkge1xuICAgICAgcmV0dXJuIHRoaXMub24oZXZlbnQsIGhhbmRsZXIsIGN0eCwgdHJ1ZSk7XG4gICAgfTtcblxuICAgIEV2ZW50ZWQucHJvdG90eXBlLm9mZiA9IGZ1bmN0aW9uKGV2ZW50LCBoYW5kbGVyKSB7XG4gICAgICB2YXIgaSwgX3JlZiwgX3Jlc3VsdHM7XG4gICAgICBpZiAoKChfcmVmID0gdGhpcy5iaW5kaW5ncykgIT0gbnVsbCA/IF9yZWZbZXZlbnRdIDogdm9pZCAwKSA9PSBudWxsKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmIChoYW5kbGVyID09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIGRlbGV0ZSB0aGlzLmJpbmRpbmdzW2V2ZW50XTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGkgPSAwO1xuICAgICAgICBfcmVzdWx0cyA9IFtdO1xuICAgICAgICB3aGlsZSAoaSA8IHRoaXMuYmluZGluZ3NbZXZlbnRdLmxlbmd0aCkge1xuICAgICAgICAgIGlmICh0aGlzLmJpbmRpbmdzW2V2ZW50XVtpXS5oYW5kbGVyID09PSBoYW5kbGVyKSB7XG4gICAgICAgICAgICBfcmVzdWx0cy5wdXNoKHRoaXMuYmluZGluZ3NbZXZlbnRdLnNwbGljZShpLCAxKSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIF9yZXN1bHRzLnB1c2goaSsrKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIF9yZXN1bHRzO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBFdmVudGVkLnByb3RvdHlwZS50cmlnZ2VyID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgYXJncywgY3R4LCBldmVudCwgaGFuZGxlciwgaSwgb25jZSwgX3JlZiwgX3JlZjEsIF9yZXN1bHRzO1xuICAgICAgZXZlbnQgPSBhcmd1bWVudHNbMF0sIGFyZ3MgPSAyIDw9IGFyZ3VtZW50cy5sZW5ndGggPyBfX3NsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSA6IFtdO1xuICAgICAgaWYgKChfcmVmID0gdGhpcy5iaW5kaW5ncykgIT0gbnVsbCA/IF9yZWZbZXZlbnRdIDogdm9pZCAwKSB7XG4gICAgICAgIGkgPSAwO1xuICAgICAgICBfcmVzdWx0cyA9IFtdO1xuICAgICAgICB3aGlsZSAoaSA8IHRoaXMuYmluZGluZ3NbZXZlbnRdLmxlbmd0aCkge1xuICAgICAgICAgIF9yZWYxID0gdGhpcy5iaW5kaW5nc1tldmVudF1baV0sIGhhbmRsZXIgPSBfcmVmMS5oYW5kbGVyLCBjdHggPSBfcmVmMS5jdHgsIG9uY2UgPSBfcmVmMS5vbmNlO1xuICAgICAgICAgIGhhbmRsZXIuYXBwbHkoY3R4ICE9IG51bGwgPyBjdHggOiB0aGlzLCBhcmdzKTtcbiAgICAgICAgICBpZiAob25jZSkge1xuICAgICAgICAgICAgX3Jlc3VsdHMucHVzaCh0aGlzLmJpbmRpbmdzW2V2ZW50XS5zcGxpY2UoaSwgMSkpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBfcmVzdWx0cy5wdXNoKGkrKyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBfcmVzdWx0cztcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgcmV0dXJuIEV2ZW50ZWQ7XG5cbiAgfSkoKTtcblxuICBQYWNlID0gd2luZG93LlBhY2UgfHwge307XG5cbiAgd2luZG93LlBhY2UgPSBQYWNlO1xuXG4gIGV4dGVuZChQYWNlLCBFdmVudGVkLnByb3RvdHlwZSk7XG5cbiAgb3B0aW9ucyA9IFBhY2Uub3B0aW9ucyA9IGV4dGVuZCh7fSwgZGVmYXVsdE9wdGlvbnMsIHdpbmRvdy5wYWNlT3B0aW9ucywgZ2V0RnJvbURPTSgpKTtcblxuICBfcmVmID0gWydhamF4JywgJ2RvY3VtZW50JywgJ2V2ZW50TGFnJywgJ2VsZW1lbnRzJ107XG4gIGZvciAoX2kgPSAwLCBfbGVuID0gX3JlZi5sZW5ndGg7IF9pIDwgX2xlbjsgX2krKykge1xuICAgIHNvdXJjZSA9IF9yZWZbX2ldO1xuICAgIGlmIChvcHRpb25zW3NvdXJjZV0gPT09IHRydWUpIHtcbiAgICAgIG9wdGlvbnNbc291cmNlXSA9IGRlZmF1bHRPcHRpb25zW3NvdXJjZV07XG4gICAgfVxuICB9XG5cbiAgTm9UYXJnZXRFcnJvciA9IChmdW5jdGlvbihfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoTm9UYXJnZXRFcnJvciwgX3N1cGVyKTtcblxuICAgIGZ1bmN0aW9uIE5vVGFyZ2V0RXJyb3IoKSB7XG4gICAgICBfcmVmMSA9IE5vVGFyZ2V0RXJyb3IuX19zdXBlcl9fLmNvbnN0cnVjdG9yLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICByZXR1cm4gX3JlZjE7XG4gICAgfVxuXG4gICAgcmV0dXJuIE5vVGFyZ2V0RXJyb3I7XG5cbiAgfSkoRXJyb3IpO1xuXG4gIEJhciA9IChmdW5jdGlvbigpIHtcbiAgICBmdW5jdGlvbiBCYXIoKSB7XG4gICAgICB0aGlzLnByb2dyZXNzID0gMDtcbiAgICB9XG5cbiAgICBCYXIucHJvdG90eXBlLmdldEVsZW1lbnQgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciB0YXJnZXRFbGVtZW50O1xuICAgICAgaWYgKHRoaXMuZWwgPT0gbnVsbCkge1xuICAgICAgICB0YXJnZXRFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihvcHRpb25zLnRhcmdldCk7XG4gICAgICAgIGlmICghdGFyZ2V0RWxlbWVudCkge1xuICAgICAgICAgIHRocm93IG5ldyBOb1RhcmdldEVycm9yO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgdGhpcy5lbC5jbGFzc05hbWUgPSBcInBhY2UgcGFjZS1hY3RpdmVcIjtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc05hbWUgPSBkb2N1bWVudC5ib2R5LmNsYXNzTmFtZS5yZXBsYWNlKC9wYWNlLWRvbmUvZywgJycpO1xuICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTmFtZSArPSAnIHBhY2UtcnVubmluZyc7XG4gICAgICAgIHRoaXMuZWwuaW5uZXJIVE1MID0gJzxkaXYgY2xhc3M9XCJwYWNlLXByb2dyZXNzXCI+XFxuICA8ZGl2IGNsYXNzPVwicGFjZS1wcm9ncmVzcy1pbm5lclwiPjwvZGl2PlxcbjwvZGl2PlxcbjxkaXYgY2xhc3M9XCJwYWNlLWFjdGl2aXR5XCI+PC9kaXY+JztcbiAgICAgICAgaWYgKHRhcmdldEVsZW1lbnQuZmlyc3RDaGlsZCAhPSBudWxsKSB7XG4gICAgICAgICAgdGFyZ2V0RWxlbWVudC5pbnNlcnRCZWZvcmUodGhpcy5lbCwgdGFyZ2V0RWxlbWVudC5maXJzdENoaWxkKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0YXJnZXRFbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuZWwpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcy5lbDtcbiAgICB9O1xuXG4gICAgQmFyLnByb3RvdHlwZS5maW5pc2ggPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBlbDtcbiAgICAgIGVsID0gdGhpcy5nZXRFbGVtZW50KCk7XG4gICAgICBlbC5jbGFzc05hbWUgPSBlbC5jbGFzc05hbWUucmVwbGFjZSgncGFjZS1hY3RpdmUnLCAnJyk7XG4gICAgICBlbC5jbGFzc05hbWUgKz0gJyBwYWNlLWluYWN0aXZlJztcbiAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NOYW1lID0gZG9jdW1lbnQuYm9keS5jbGFzc05hbWUucmVwbGFjZSgncGFjZS1ydW5uaW5nJywgJycpO1xuICAgICAgcmV0dXJuIGRvY3VtZW50LmJvZHkuY2xhc3NOYW1lICs9ICcgcGFjZS1kb25lJztcbiAgICB9O1xuXG4gICAgQmFyLnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbihwcm9nKSB7XG4gICAgICB0aGlzLnByb2dyZXNzID0gcHJvZztcbiAgICAgIHJldHVybiB0aGlzLnJlbmRlcigpO1xuICAgIH07XG5cbiAgICBCYXIucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbigpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHRoaXMuZ2V0RWxlbWVudCgpLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcy5nZXRFbGVtZW50KCkpO1xuICAgICAgfSBjYXRjaCAoX2Vycm9yKSB7XG4gICAgICAgIE5vVGFyZ2V0RXJyb3IgPSBfZXJyb3I7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcy5lbCA9IHZvaWQgMDtcbiAgICB9O1xuXG4gICAgQmFyLnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBlbCwga2V5LCBwcm9ncmVzc1N0ciwgdHJhbnNmb3JtLCBfaiwgX2xlbjEsIF9yZWYyO1xuICAgICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Iob3B0aW9ucy50YXJnZXQpID09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgZWwgPSB0aGlzLmdldEVsZW1lbnQoKTtcbiAgICAgIHRyYW5zZm9ybSA9IFwidHJhbnNsYXRlM2QoXCIgKyB0aGlzLnByb2dyZXNzICsgXCIlLCAwLCAwKVwiO1xuICAgICAgX3JlZjIgPSBbJ3dlYmtpdFRyYW5zZm9ybScsICdtc1RyYW5zZm9ybScsICd0cmFuc2Zvcm0nXTtcbiAgICAgIGZvciAoX2ogPSAwLCBfbGVuMSA9IF9yZWYyLmxlbmd0aDsgX2ogPCBfbGVuMTsgX2orKykge1xuICAgICAgICBrZXkgPSBfcmVmMltfal07XG4gICAgICAgIGVsLmNoaWxkcmVuWzBdLnN0eWxlW2tleV0gPSB0cmFuc2Zvcm07XG4gICAgICB9XG4gICAgICBpZiAoIXRoaXMubGFzdFJlbmRlcmVkUHJvZ3Jlc3MgfHwgdGhpcy5sYXN0UmVuZGVyZWRQcm9ncmVzcyB8IDAgIT09IHRoaXMucHJvZ3Jlc3MgfCAwKSB7XG4gICAgICAgIGVsLmNoaWxkcmVuWzBdLnNldEF0dHJpYnV0ZSgnZGF0YS1wcm9ncmVzcy10ZXh0JywgXCJcIiArICh0aGlzLnByb2dyZXNzIHwgMCkgKyBcIiVcIik7XG4gICAgICAgIGlmICh0aGlzLnByb2dyZXNzID49IDEwMCkge1xuICAgICAgICAgIHByb2dyZXNzU3RyID0gJzk5JztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBwcm9ncmVzc1N0ciA9IHRoaXMucHJvZ3Jlc3MgPCAxMCA/IFwiMFwiIDogXCJcIjtcbiAgICAgICAgICBwcm9ncmVzc1N0ciArPSB0aGlzLnByb2dyZXNzIHwgMDtcbiAgICAgICAgfVxuICAgICAgICBlbC5jaGlsZHJlblswXS5zZXRBdHRyaWJ1dGUoJ2RhdGEtcHJvZ3Jlc3MnLCBcIlwiICsgcHJvZ3Jlc3NTdHIpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXMubGFzdFJlbmRlcmVkUHJvZ3Jlc3MgPSB0aGlzLnByb2dyZXNzO1xuICAgIH07XG5cbiAgICBCYXIucHJvdG90eXBlLmRvbmUgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzLnByb2dyZXNzID49IDEwMDtcbiAgICB9O1xuXG4gICAgcmV0dXJuIEJhcjtcblxuICB9KSgpO1xuXG4gIEV2ZW50cyA9IChmdW5jdGlvbigpIHtcbiAgICBmdW5jdGlvbiBFdmVudHMoKSB7XG4gICAgICB0aGlzLmJpbmRpbmdzID0ge307XG4gICAgfVxuXG4gICAgRXZlbnRzLnByb3RvdHlwZS50cmlnZ2VyID0gZnVuY3Rpb24obmFtZSwgdmFsKSB7XG4gICAgICB2YXIgYmluZGluZywgX2osIF9sZW4xLCBfcmVmMiwgX3Jlc3VsdHM7XG4gICAgICBpZiAodGhpcy5iaW5kaW5nc1tuYW1lXSAhPSBudWxsKSB7XG4gICAgICAgIF9yZWYyID0gdGhpcy5iaW5kaW5nc1tuYW1lXTtcbiAgICAgICAgX3Jlc3VsdHMgPSBbXTtcbiAgICAgICAgZm9yIChfaiA9IDAsIF9sZW4xID0gX3JlZjIubGVuZ3RoOyBfaiA8IF9sZW4xOyBfaisrKSB7XG4gICAgICAgICAgYmluZGluZyA9IF9yZWYyW19qXTtcbiAgICAgICAgICBfcmVzdWx0cy5wdXNoKGJpbmRpbmcuY2FsbCh0aGlzLCB2YWwpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gX3Jlc3VsdHM7XG4gICAgICB9XG4gICAgfTtcblxuICAgIEV2ZW50cy5wcm90b3R5cGUub24gPSBmdW5jdGlvbihuYW1lLCBmbikge1xuICAgICAgdmFyIF9iYXNlO1xuICAgICAgaWYgKChfYmFzZSA9IHRoaXMuYmluZGluZ3MpW25hbWVdID09IG51bGwpIHtcbiAgICAgICAgX2Jhc2VbbmFtZV0gPSBbXTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzLmJpbmRpbmdzW25hbWVdLnB1c2goZm4pO1xuICAgIH07XG5cbiAgICByZXR1cm4gRXZlbnRzO1xuXG4gIH0pKCk7XG5cbiAgX1hNTEh0dHBSZXF1ZXN0ID0gd2luZG93LlhNTEh0dHBSZXF1ZXN0O1xuXG4gIF9YRG9tYWluUmVxdWVzdCA9IHdpbmRvdy5YRG9tYWluUmVxdWVzdDtcblxuICBfV2ViU29ja2V0ID0gd2luZG93LldlYlNvY2tldDtcblxuICBleHRlbmROYXRpdmUgPSBmdW5jdGlvbih0bywgZnJvbSkge1xuICAgIHZhciBlLCBrZXksIF9yZXN1bHRzO1xuICAgIF9yZXN1bHRzID0gW107XG4gICAgZm9yIChrZXkgaW4gZnJvbS5wcm90b3R5cGUpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGlmICgodG9ba2V5XSA9PSBudWxsKSAmJiB0eXBlb2YgZnJvbVtrZXldICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgaWYgKHR5cGVvZiBPYmplY3QuZGVmaW5lUHJvcGVydHkgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIF9yZXN1bHRzLnB1c2goT2JqZWN0LmRlZmluZVByb3BlcnR5KHRvLCBrZXksIHtcbiAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZnJvbS5wcm90b3R5cGVba2V5XTtcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlXG4gICAgICAgICAgICB9KSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIF9yZXN1bHRzLnB1c2godG9ba2V5XSA9IGZyb20ucHJvdG90eXBlW2tleV0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBfcmVzdWx0cy5wdXNoKHZvaWQgMCk7XG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2ggKF9lcnJvcikge1xuICAgICAgICBlID0gX2Vycm9yO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gX3Jlc3VsdHM7XG4gIH07XG5cbiAgaWdub3JlU3RhY2sgPSBbXTtcblxuICBQYWNlLmlnbm9yZSA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBhcmdzLCBmbiwgcmV0O1xuICAgIGZuID0gYXJndW1lbnRzWzBdLCBhcmdzID0gMiA8PSBhcmd1bWVudHMubGVuZ3RoID8gX19zbGljZS5jYWxsKGFyZ3VtZW50cywgMSkgOiBbXTtcbiAgICBpZ25vcmVTdGFjay51bnNoaWZ0KCdpZ25vcmUnKTtcbiAgICByZXQgPSBmbi5hcHBseShudWxsLCBhcmdzKTtcbiAgICBpZ25vcmVTdGFjay5zaGlmdCgpO1xuICAgIHJldHVybiByZXQ7XG4gIH07XG5cbiAgUGFjZS50cmFjayA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBhcmdzLCBmbiwgcmV0O1xuICAgIGZuID0gYXJndW1lbnRzWzBdLCBhcmdzID0gMiA8PSBhcmd1bWVudHMubGVuZ3RoID8gX19zbGljZS5jYWxsKGFyZ3VtZW50cywgMSkgOiBbXTtcbiAgICBpZ25vcmVTdGFjay51bnNoaWZ0KCd0cmFjaycpO1xuICAgIHJldCA9IGZuLmFwcGx5KG51bGwsIGFyZ3MpO1xuICAgIGlnbm9yZVN0YWNrLnNoaWZ0KCk7XG4gICAgcmV0dXJuIHJldDtcbiAgfTtcblxuICBzaG91bGRUcmFjayA9IGZ1bmN0aW9uKG1ldGhvZCkge1xuICAgIHZhciBfcmVmMjtcbiAgICBpZiAobWV0aG9kID09IG51bGwpIHtcbiAgICAgIG1ldGhvZCA9ICdHRVQnO1xuICAgIH1cbiAgICBpZiAoaWdub3JlU3RhY2tbMF0gPT09ICd0cmFjaycpIHtcbiAgICAgIHJldHVybiAnZm9yY2UnO1xuICAgIH1cbiAgICBpZiAoIWlnbm9yZVN0YWNrLmxlbmd0aCAmJiBvcHRpb25zLmFqYXgpIHtcbiAgICAgIGlmIChtZXRob2QgPT09ICdzb2NrZXQnICYmIG9wdGlvbnMuYWpheC50cmFja1dlYlNvY2tldHMpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9IGVsc2UgaWYgKF9yZWYyID0gbWV0aG9kLnRvVXBwZXJDYXNlKCksIF9faW5kZXhPZi5jYWxsKG9wdGlvbnMuYWpheC50cmFja01ldGhvZHMsIF9yZWYyKSA+PSAwKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH07XG5cbiAgUmVxdWVzdEludGVyY2VwdCA9IChmdW5jdGlvbihfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoUmVxdWVzdEludGVyY2VwdCwgX3N1cGVyKTtcblxuICAgIGZ1bmN0aW9uIFJlcXVlc3RJbnRlcmNlcHQoKSB7XG4gICAgICB2YXIgbW9uaXRvclhIUixcbiAgICAgICAgX3RoaXMgPSB0aGlzO1xuICAgICAgUmVxdWVzdEludGVyY2VwdC5fX3N1cGVyX18uY29uc3RydWN0b3IuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIG1vbml0b3JYSFIgPSBmdW5jdGlvbihyZXEpIHtcbiAgICAgICAgdmFyIF9vcGVuO1xuICAgICAgICBfb3BlbiA9IHJlcS5vcGVuO1xuICAgICAgICByZXR1cm4gcmVxLm9wZW4gPSBmdW5jdGlvbih0eXBlLCB1cmwsIGFzeW5jKSB7XG4gICAgICAgICAgaWYgKHNob3VsZFRyYWNrKHR5cGUpKSB7XG4gICAgICAgICAgICBfdGhpcy50cmlnZ2VyKCdyZXF1ZXN0Jywge1xuICAgICAgICAgICAgICB0eXBlOiB0eXBlLFxuICAgICAgICAgICAgICB1cmw6IHVybCxcbiAgICAgICAgICAgICAgcmVxdWVzdDogcmVxXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIF9vcGVuLmFwcGx5KHJlcSwgYXJndW1lbnRzKTtcbiAgICAgICAgfTtcbiAgICAgIH07XG4gICAgICB3aW5kb3cuWE1MSHR0cFJlcXVlc3QgPSBmdW5jdGlvbihmbGFncykge1xuICAgICAgICB2YXIgcmVxO1xuICAgICAgICByZXEgPSBuZXcgX1hNTEh0dHBSZXF1ZXN0KGZsYWdzKTtcbiAgICAgICAgbW9uaXRvclhIUihyZXEpO1xuICAgICAgICByZXR1cm4gcmVxO1xuICAgICAgfTtcbiAgICAgIHRyeSB7XG4gICAgICAgIGV4dGVuZE5hdGl2ZSh3aW5kb3cuWE1MSHR0cFJlcXVlc3QsIF9YTUxIdHRwUmVxdWVzdCk7XG4gICAgICB9IGNhdGNoIChfZXJyb3IpIHt9XG4gICAgICBpZiAoX1hEb21haW5SZXF1ZXN0ICE9IG51bGwpIHtcbiAgICAgICAgd2luZG93LlhEb21haW5SZXF1ZXN0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdmFyIHJlcTtcbiAgICAgICAgICByZXEgPSBuZXcgX1hEb21haW5SZXF1ZXN0O1xuICAgICAgICAgIG1vbml0b3JYSFIocmVxKTtcbiAgICAgICAgICByZXR1cm4gcmVxO1xuICAgICAgICB9O1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGV4dGVuZE5hdGl2ZSh3aW5kb3cuWERvbWFpblJlcXVlc3QsIF9YRG9tYWluUmVxdWVzdCk7XG4gICAgICAgIH0gY2F0Y2ggKF9lcnJvcikge31cbiAgICAgIH1cbiAgICAgIGlmICgoX1dlYlNvY2tldCAhPSBudWxsKSAmJiBvcHRpb25zLmFqYXgudHJhY2tXZWJTb2NrZXRzKSB7XG4gICAgICAgIHdpbmRvdy5XZWJTb2NrZXQgPSBmdW5jdGlvbih1cmwsIHByb3RvY29scykge1xuICAgICAgICAgIHZhciByZXE7XG4gICAgICAgICAgaWYgKHByb3RvY29scyAhPSBudWxsKSB7XG4gICAgICAgICAgICByZXEgPSBuZXcgX1dlYlNvY2tldCh1cmwsIHByb3RvY29scyk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlcSA9IG5ldyBfV2ViU29ja2V0KHVybCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChzaG91bGRUcmFjaygnc29ja2V0JykpIHtcbiAgICAgICAgICAgIF90aGlzLnRyaWdnZXIoJ3JlcXVlc3QnLCB7XG4gICAgICAgICAgICAgIHR5cGU6ICdzb2NrZXQnLFxuICAgICAgICAgICAgICB1cmw6IHVybCxcbiAgICAgICAgICAgICAgcHJvdG9jb2xzOiBwcm90b2NvbHMsXG4gICAgICAgICAgICAgIHJlcXVlc3Q6IHJlcVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiByZXE7XG4gICAgICAgIH07XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgZXh0ZW5kTmF0aXZlKHdpbmRvdy5XZWJTb2NrZXQsIF9XZWJTb2NrZXQpO1xuICAgICAgICB9IGNhdGNoIChfZXJyb3IpIHt9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIFJlcXVlc3RJbnRlcmNlcHQ7XG5cbiAgfSkoRXZlbnRzKTtcblxuICBfaW50ZXJjZXB0ID0gbnVsbDtcblxuICBnZXRJbnRlcmNlcHQgPSBmdW5jdGlvbigpIHtcbiAgICBpZiAoX2ludGVyY2VwdCA9PSBudWxsKSB7XG4gICAgICBfaW50ZXJjZXB0ID0gbmV3IFJlcXVlc3RJbnRlcmNlcHQ7XG4gICAgfVxuICAgIHJldHVybiBfaW50ZXJjZXB0O1xuICB9O1xuXG4gIHNob3VsZElnbm9yZVVSTCA9IGZ1bmN0aW9uKHVybCkge1xuICAgIHZhciBwYXR0ZXJuLCBfaiwgX2xlbjEsIF9yZWYyO1xuICAgIF9yZWYyID0gb3B0aW9ucy5hamF4Lmlnbm9yZVVSTHM7XG4gICAgZm9yIChfaiA9IDAsIF9sZW4xID0gX3JlZjIubGVuZ3RoOyBfaiA8IF9sZW4xOyBfaisrKSB7XG4gICAgICBwYXR0ZXJuID0gX3JlZjJbX2pdO1xuICAgICAgaWYgKHR5cGVvZiBwYXR0ZXJuID09PSAnc3RyaW5nJykge1xuICAgICAgICBpZiAodXJsLmluZGV4T2YocGF0dGVybikgIT09IC0xKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChwYXR0ZXJuLnRlc3QodXJsKSkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfTtcblxuICBnZXRJbnRlcmNlcHQoKS5vbigncmVxdWVzdCcsIGZ1bmN0aW9uKF9hcmcpIHtcbiAgICB2YXIgYWZ0ZXIsIGFyZ3MsIHJlcXVlc3QsIHR5cGUsIHVybDtcbiAgICB0eXBlID0gX2FyZy50eXBlLCByZXF1ZXN0ID0gX2FyZy5yZXF1ZXN0LCB1cmwgPSBfYXJnLnVybDtcbiAgICBpZiAoc2hvdWxkSWdub3JlVVJMKHVybCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKCFQYWNlLnJ1bm5pbmcgJiYgKG9wdGlvbnMucmVzdGFydE9uUmVxdWVzdEFmdGVyICE9PSBmYWxzZSB8fCBzaG91bGRUcmFjayh0eXBlKSA9PT0gJ2ZvcmNlJykpIHtcbiAgICAgIGFyZ3MgPSBhcmd1bWVudHM7XG4gICAgICBhZnRlciA9IG9wdGlvbnMucmVzdGFydE9uUmVxdWVzdEFmdGVyIHx8IDA7XG4gICAgICBpZiAodHlwZW9mIGFmdGVyID09PSAnYm9vbGVhbicpIHtcbiAgICAgICAgYWZ0ZXIgPSAwO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBzdGlsbEFjdGl2ZSwgX2osIF9sZW4xLCBfcmVmMiwgX3JlZjMsIF9yZXN1bHRzO1xuICAgICAgICBpZiAodHlwZSA9PT0gJ3NvY2tldCcpIHtcbiAgICAgICAgICBzdGlsbEFjdGl2ZSA9IHJlcXVlc3QucmVhZHlTdGF0ZSA8IDI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc3RpbGxBY3RpdmUgPSAoMCA8IChfcmVmMiA9IHJlcXVlc3QucmVhZHlTdGF0ZSkgJiYgX3JlZjIgPCA0KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc3RpbGxBY3RpdmUpIHtcbiAgICAgICAgICBQYWNlLnJlc3RhcnQoKTtcbiAgICAgICAgICBfcmVmMyA9IFBhY2Uuc291cmNlcztcbiAgICAgICAgICBfcmVzdWx0cyA9IFtdO1xuICAgICAgICAgIGZvciAoX2ogPSAwLCBfbGVuMSA9IF9yZWYzLmxlbmd0aDsgX2ogPCBfbGVuMTsgX2orKykge1xuICAgICAgICAgICAgc291cmNlID0gX3JlZjNbX2pdO1xuICAgICAgICAgICAgaWYgKHNvdXJjZSBpbnN0YW5jZW9mIEFqYXhNb25pdG9yKSB7XG4gICAgICAgICAgICAgIHNvdXJjZS53YXRjaC5hcHBseShzb3VyY2UsIGFyZ3MpO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIF9yZXN1bHRzLnB1c2godm9pZCAwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIF9yZXN1bHRzO1xuICAgICAgICB9XG4gICAgICB9LCBhZnRlcik7XG4gICAgfVxuICB9KTtcblxuICBBamF4TW9uaXRvciA9IChmdW5jdGlvbigpIHtcbiAgICBmdW5jdGlvbiBBamF4TW9uaXRvcigpIHtcbiAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICB0aGlzLmVsZW1lbnRzID0gW107XG4gICAgICBnZXRJbnRlcmNlcHQoKS5vbigncmVxdWVzdCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gX3RoaXMud2F0Y2guYXBwbHkoX3RoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBBamF4TW9uaXRvci5wcm90b3R5cGUud2F0Y2ggPSBmdW5jdGlvbihfYXJnKSB7XG4gICAgICB2YXIgcmVxdWVzdCwgdHJhY2tlciwgdHlwZSwgdXJsO1xuICAgICAgdHlwZSA9IF9hcmcudHlwZSwgcmVxdWVzdCA9IF9hcmcucmVxdWVzdCwgdXJsID0gX2FyZy51cmw7XG4gICAgICBpZiAoc2hvdWxkSWdub3JlVVJMKHVybCkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGUgPT09ICdzb2NrZXQnKSB7XG4gICAgICAgIHRyYWNrZXIgPSBuZXcgU29ja2V0UmVxdWVzdFRyYWNrZXIocmVxdWVzdCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0cmFja2VyID0gbmV3IFhIUlJlcXVlc3RUcmFja2VyKHJlcXVlc3QpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXMuZWxlbWVudHMucHVzaCh0cmFja2VyKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIEFqYXhNb25pdG9yO1xuXG4gIH0pKCk7XG5cbiAgWEhSUmVxdWVzdFRyYWNrZXIgPSAoZnVuY3Rpb24oKSB7XG4gICAgZnVuY3Rpb24gWEhSUmVxdWVzdFRyYWNrZXIocmVxdWVzdCkge1xuICAgICAgdmFyIGV2ZW50LCBzaXplLCBfaiwgX2xlbjEsIF9vbnJlYWR5c3RhdGVjaGFuZ2UsIF9yZWYyLFxuICAgICAgICBfdGhpcyA9IHRoaXM7XG4gICAgICB0aGlzLnByb2dyZXNzID0gMDtcbiAgICAgIGlmICh3aW5kb3cuUHJvZ3Jlc3NFdmVudCAhPSBudWxsKSB7XG4gICAgICAgIHNpemUgPSBudWxsO1xuICAgICAgICByZXF1ZXN0LmFkZEV2ZW50TGlzdGVuZXIoJ3Byb2dyZXNzJywgZnVuY3Rpb24oZXZ0KSB7XG4gICAgICAgICAgaWYgKGV2dC5sZW5ndGhDb21wdXRhYmxlKSB7XG4gICAgICAgICAgICByZXR1cm4gX3RoaXMucHJvZ3Jlc3MgPSAxMDAgKiBldnQubG9hZGVkIC8gZXZ0LnRvdGFsO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gX3RoaXMucHJvZ3Jlc3MgPSBfdGhpcy5wcm9ncmVzcyArICgxMDAgLSBfdGhpcy5wcm9ncmVzcykgLyAyO1xuICAgICAgICAgIH1cbiAgICAgICAgfSwgZmFsc2UpO1xuICAgICAgICBfcmVmMiA9IFsnbG9hZCcsICdhYm9ydCcsICd0aW1lb3V0JywgJ2Vycm9yJ107XG4gICAgICAgIGZvciAoX2ogPSAwLCBfbGVuMSA9IF9yZWYyLmxlbmd0aDsgX2ogPCBfbGVuMTsgX2orKykge1xuICAgICAgICAgIGV2ZW50ID0gX3JlZjJbX2pdO1xuICAgICAgICAgIHJlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gX3RoaXMucHJvZ3Jlc3MgPSAxMDA7XG4gICAgICAgICAgfSwgZmFsc2UpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBfb25yZWFkeXN0YXRlY2hhbmdlID0gcmVxdWVzdC5vbnJlYWR5c3RhdGVjaGFuZ2U7XG4gICAgICAgIHJlcXVlc3Qub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdmFyIF9yZWYzO1xuICAgICAgICAgIGlmICgoX3JlZjMgPSByZXF1ZXN0LnJlYWR5U3RhdGUpID09PSAwIHx8IF9yZWYzID09PSA0KSB7XG4gICAgICAgICAgICBfdGhpcy5wcm9ncmVzcyA9IDEwMDtcbiAgICAgICAgICB9IGVsc2UgaWYgKHJlcXVlc3QucmVhZHlTdGF0ZSA9PT0gMykge1xuICAgICAgICAgICAgX3RoaXMucHJvZ3Jlc3MgPSA1MDtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHR5cGVvZiBfb25yZWFkeXN0YXRlY2hhbmdlID09PSBcImZ1bmN0aW9uXCIgPyBfb25yZWFkeXN0YXRlY2hhbmdlLmFwcGx5KG51bGwsIGFyZ3VtZW50cykgOiB2b2lkIDA7XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIFhIUlJlcXVlc3RUcmFja2VyO1xuXG4gIH0pKCk7XG5cbiAgU29ja2V0UmVxdWVzdFRyYWNrZXIgPSAoZnVuY3Rpb24oKSB7XG4gICAgZnVuY3Rpb24gU29ja2V0UmVxdWVzdFRyYWNrZXIocmVxdWVzdCkge1xuICAgICAgdmFyIGV2ZW50LCBfaiwgX2xlbjEsIF9yZWYyLFxuICAgICAgICBfdGhpcyA9IHRoaXM7XG4gICAgICB0aGlzLnByb2dyZXNzID0gMDtcbiAgICAgIF9yZWYyID0gWydlcnJvcicsICdvcGVuJ107XG4gICAgICBmb3IgKF9qID0gMCwgX2xlbjEgPSBfcmVmMi5sZW5ndGg7IF9qIDwgX2xlbjE7IF9qKyspIHtcbiAgICAgICAgZXZlbnQgPSBfcmVmMltfal07XG4gICAgICAgIHJlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIF90aGlzLnByb2dyZXNzID0gMTAwO1xuICAgICAgICB9LCBmYWxzZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIFNvY2tldFJlcXVlc3RUcmFja2VyO1xuXG4gIH0pKCk7XG5cbiAgRWxlbWVudE1vbml0b3IgPSAoZnVuY3Rpb24oKSB7XG4gICAgZnVuY3Rpb24gRWxlbWVudE1vbml0b3Iob3B0aW9ucykge1xuICAgICAgdmFyIHNlbGVjdG9yLCBfaiwgX2xlbjEsIF9yZWYyO1xuICAgICAgaWYgKG9wdGlvbnMgPT0gbnVsbCkge1xuICAgICAgICBvcHRpb25zID0ge307XG4gICAgICB9XG4gICAgICB0aGlzLmVsZW1lbnRzID0gW107XG4gICAgICBpZiAob3B0aW9ucy5zZWxlY3RvcnMgPT0gbnVsbCkge1xuICAgICAgICBvcHRpb25zLnNlbGVjdG9ycyA9IFtdO1xuICAgICAgfVxuICAgICAgX3JlZjIgPSBvcHRpb25zLnNlbGVjdG9ycztcbiAgICAgIGZvciAoX2ogPSAwLCBfbGVuMSA9IF9yZWYyLmxlbmd0aDsgX2ogPCBfbGVuMTsgX2orKykge1xuICAgICAgICBzZWxlY3RvciA9IF9yZWYyW19qXTtcbiAgICAgICAgdGhpcy5lbGVtZW50cy5wdXNoKG5ldyBFbGVtZW50VHJhY2tlcihzZWxlY3RvcikpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBFbGVtZW50TW9uaXRvcjtcblxuICB9KSgpO1xuXG4gIEVsZW1lbnRUcmFja2VyID0gKGZ1bmN0aW9uKCkge1xuICAgIGZ1bmN0aW9uIEVsZW1lbnRUcmFja2VyKHNlbGVjdG9yKSB7XG4gICAgICB0aGlzLnNlbGVjdG9yID0gc2VsZWN0b3I7XG4gICAgICB0aGlzLnByb2dyZXNzID0gMDtcbiAgICAgIHRoaXMuY2hlY2soKTtcbiAgICB9XG5cbiAgICBFbGVtZW50VHJhY2tlci5wcm90b3R5cGUuY2hlY2sgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0aGlzLnNlbGVjdG9yKSkge1xuICAgICAgICByZXR1cm4gdGhpcy5kb25lKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dCgoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIF90aGlzLmNoZWNrKCk7XG4gICAgICAgIH0pLCBvcHRpb25zLmVsZW1lbnRzLmNoZWNrSW50ZXJ2YWwpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBFbGVtZW50VHJhY2tlci5wcm90b3R5cGUuZG9uZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMucHJvZ3Jlc3MgPSAxMDA7XG4gICAgfTtcblxuICAgIHJldHVybiBFbGVtZW50VHJhY2tlcjtcblxuICB9KSgpO1xuXG4gIERvY3VtZW50TW9uaXRvciA9IChmdW5jdGlvbigpIHtcbiAgICBEb2N1bWVudE1vbml0b3IucHJvdG90eXBlLnN0YXRlcyA9IHtcbiAgICAgIGxvYWRpbmc6IDAsXG4gICAgICBpbnRlcmFjdGl2ZTogNTAsXG4gICAgICBjb21wbGV0ZTogMTAwXG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIERvY3VtZW50TW9uaXRvcigpIHtcbiAgICAgIHZhciBfb25yZWFkeXN0YXRlY2hhbmdlLCBfcmVmMixcbiAgICAgICAgX3RoaXMgPSB0aGlzO1xuICAgICAgdGhpcy5wcm9ncmVzcyA9IChfcmVmMiA9IHRoaXMuc3RhdGVzW2RvY3VtZW50LnJlYWR5U3RhdGVdKSAhPSBudWxsID8gX3JlZjIgOiAxMDA7XG4gICAgICBfb25yZWFkeXN0YXRlY2hhbmdlID0gZG9jdW1lbnQub25yZWFkeXN0YXRlY2hhbmdlO1xuICAgICAgZG9jdW1lbnQub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmIChfdGhpcy5zdGF0ZXNbZG9jdW1lbnQucmVhZHlTdGF0ZV0gIT0gbnVsbCkge1xuICAgICAgICAgIF90aGlzLnByb2dyZXNzID0gX3RoaXMuc3RhdGVzW2RvY3VtZW50LnJlYWR5U3RhdGVdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0eXBlb2YgX29ucmVhZHlzdGF0ZWNoYW5nZSA9PT0gXCJmdW5jdGlvblwiID8gX29ucmVhZHlzdGF0ZWNoYW5nZS5hcHBseShudWxsLCBhcmd1bWVudHMpIDogdm9pZCAwO1xuICAgICAgfTtcbiAgICB9XG5cbiAgICByZXR1cm4gRG9jdW1lbnRNb25pdG9yO1xuXG4gIH0pKCk7XG5cbiAgRXZlbnRMYWdNb25pdG9yID0gKGZ1bmN0aW9uKCkge1xuICAgIGZ1bmN0aW9uIEV2ZW50TGFnTW9uaXRvcigpIHtcbiAgICAgIHZhciBhdmcsIGludGVydmFsLCBsYXN0LCBwb2ludHMsIHNhbXBsZXMsXG4gICAgICAgIF90aGlzID0gdGhpcztcbiAgICAgIHRoaXMucHJvZ3Jlc3MgPSAwO1xuICAgICAgYXZnID0gMDtcbiAgICAgIHNhbXBsZXMgPSBbXTtcbiAgICAgIHBvaW50cyA9IDA7XG4gICAgICBsYXN0ID0gbm93KCk7XG4gICAgICBpbnRlcnZhbCA9IHNldEludGVydmFsKGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgZGlmZjtcbiAgICAgICAgZGlmZiA9IG5vdygpIC0gbGFzdCAtIDUwO1xuICAgICAgICBsYXN0ID0gbm93KCk7XG4gICAgICAgIHNhbXBsZXMucHVzaChkaWZmKTtcbiAgICAgICAgaWYgKHNhbXBsZXMubGVuZ3RoID4gb3B0aW9ucy5ldmVudExhZy5zYW1wbGVDb3VudCkge1xuICAgICAgICAgIHNhbXBsZXMuc2hpZnQoKTtcbiAgICAgICAgfVxuICAgICAgICBhdmcgPSBhdmdBbXBsaXR1ZGUoc2FtcGxlcyk7XG4gICAgICAgIGlmICgrK3BvaW50cyA+PSBvcHRpb25zLmV2ZW50TGFnLm1pblNhbXBsZXMgJiYgYXZnIDwgb3B0aW9ucy5ldmVudExhZy5sYWdUaHJlc2hvbGQpIHtcbiAgICAgICAgICBfdGhpcy5wcm9ncmVzcyA9IDEwMDtcbiAgICAgICAgICByZXR1cm4gY2xlYXJJbnRlcnZhbChpbnRlcnZhbCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIF90aGlzLnByb2dyZXNzID0gMTAwICogKDMgLyAoYXZnICsgMykpO1xuICAgICAgICB9XG4gICAgICB9LCA1MCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIEV2ZW50TGFnTW9uaXRvcjtcblxuICB9KSgpO1xuXG4gIFNjYWxlciA9IChmdW5jdGlvbigpIHtcbiAgICBmdW5jdGlvbiBTY2FsZXIoc291cmNlKSB7XG4gICAgICB0aGlzLnNvdXJjZSA9IHNvdXJjZTtcbiAgICAgIHRoaXMubGFzdCA9IHRoaXMuc2luY2VMYXN0VXBkYXRlID0gMDtcbiAgICAgIHRoaXMucmF0ZSA9IG9wdGlvbnMuaW5pdGlhbFJhdGU7XG4gICAgICB0aGlzLmNhdGNodXAgPSAwO1xuICAgICAgdGhpcy5wcm9ncmVzcyA9IHRoaXMubGFzdFByb2dyZXNzID0gMDtcbiAgICAgIGlmICh0aGlzLnNvdXJjZSAhPSBudWxsKSB7XG4gICAgICAgIHRoaXMucHJvZ3Jlc3MgPSByZXN1bHQodGhpcy5zb3VyY2UsICdwcm9ncmVzcycpO1xuICAgICAgfVxuICAgIH1cblxuICAgIFNjYWxlci5wcm90b3R5cGUudGljayA9IGZ1bmN0aW9uKGZyYW1lVGltZSwgdmFsKSB7XG4gICAgICB2YXIgc2NhbGluZztcbiAgICAgIGlmICh2YWwgPT0gbnVsbCkge1xuICAgICAgICB2YWwgPSByZXN1bHQodGhpcy5zb3VyY2UsICdwcm9ncmVzcycpO1xuICAgICAgfVxuICAgICAgaWYgKHZhbCA+PSAxMDApIHtcbiAgICAgICAgdGhpcy5kb25lID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGlmICh2YWwgPT09IHRoaXMubGFzdCkge1xuICAgICAgICB0aGlzLnNpbmNlTGFzdFVwZGF0ZSArPSBmcmFtZVRpbWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAodGhpcy5zaW5jZUxhc3RVcGRhdGUpIHtcbiAgICAgICAgICB0aGlzLnJhdGUgPSAodmFsIC0gdGhpcy5sYXN0KSAvIHRoaXMuc2luY2VMYXN0VXBkYXRlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY2F0Y2h1cCA9ICh2YWwgLSB0aGlzLnByb2dyZXNzKSAvIG9wdGlvbnMuY2F0Y2h1cFRpbWU7XG4gICAgICAgIHRoaXMuc2luY2VMYXN0VXBkYXRlID0gMDtcbiAgICAgICAgdGhpcy5sYXN0ID0gdmFsO1xuICAgICAgfVxuICAgICAgaWYgKHZhbCA+IHRoaXMucHJvZ3Jlc3MpIHtcbiAgICAgICAgdGhpcy5wcm9ncmVzcyArPSB0aGlzLmNhdGNodXAgKiBmcmFtZVRpbWU7XG4gICAgICB9XG4gICAgICBzY2FsaW5nID0gMSAtIE1hdGgucG93KHRoaXMucHJvZ3Jlc3MgLyAxMDAsIG9wdGlvbnMuZWFzZUZhY3Rvcik7XG4gICAgICB0aGlzLnByb2dyZXNzICs9IHNjYWxpbmcgKiB0aGlzLnJhdGUgKiBmcmFtZVRpbWU7XG4gICAgICB0aGlzLnByb2dyZXNzID0gTWF0aC5taW4odGhpcy5sYXN0UHJvZ3Jlc3MgKyBvcHRpb25zLm1heFByb2dyZXNzUGVyRnJhbWUsIHRoaXMucHJvZ3Jlc3MpO1xuICAgICAgdGhpcy5wcm9ncmVzcyA9IE1hdGgubWF4KDAsIHRoaXMucHJvZ3Jlc3MpO1xuICAgICAgdGhpcy5wcm9ncmVzcyA9IE1hdGgubWluKDEwMCwgdGhpcy5wcm9ncmVzcyk7XG4gICAgICB0aGlzLmxhc3RQcm9ncmVzcyA9IHRoaXMucHJvZ3Jlc3M7XG4gICAgICByZXR1cm4gdGhpcy5wcm9ncmVzcztcbiAgICB9O1xuXG4gICAgcmV0dXJuIFNjYWxlcjtcblxuICB9KSgpO1xuXG4gIHNvdXJjZXMgPSBudWxsO1xuXG4gIHNjYWxlcnMgPSBudWxsO1xuXG4gIGJhciA9IG51bGw7XG5cbiAgdW5pU2NhbGVyID0gbnVsbDtcblxuICBhbmltYXRpb24gPSBudWxsO1xuXG4gIGNhbmNlbEFuaW1hdGlvbiA9IG51bGw7XG5cbiAgUGFjZS5ydW5uaW5nID0gZmFsc2U7XG5cbiAgaGFuZGxlUHVzaFN0YXRlID0gZnVuY3Rpb24oKSB7XG4gICAgaWYgKG9wdGlvbnMucmVzdGFydE9uUHVzaFN0YXRlKSB7XG4gICAgICByZXR1cm4gUGFjZS5yZXN0YXJ0KCk7XG4gICAgfVxuICB9O1xuXG4gIGlmICh3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUgIT0gbnVsbCkge1xuICAgIF9wdXNoU3RhdGUgPSB3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGU7XG4gICAgd2luZG93Lmhpc3RvcnkucHVzaFN0YXRlID0gZnVuY3Rpb24oKSB7XG4gICAgICBoYW5kbGVQdXNoU3RhdGUoKTtcbiAgICAgIHJldHVybiBfcHVzaFN0YXRlLmFwcGx5KHdpbmRvdy5oaXN0b3J5LCBhcmd1bWVudHMpO1xuICAgIH07XG4gIH1cblxuICBpZiAod2luZG93Lmhpc3RvcnkucmVwbGFjZVN0YXRlICE9IG51bGwpIHtcbiAgICBfcmVwbGFjZVN0YXRlID0gd2luZG93Lmhpc3RvcnkucmVwbGFjZVN0YXRlO1xuICAgIHdpbmRvdy5oaXN0b3J5LnJlcGxhY2VTdGF0ZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgaGFuZGxlUHVzaFN0YXRlKCk7XG4gICAgICByZXR1cm4gX3JlcGxhY2VTdGF0ZS5hcHBseSh3aW5kb3cuaGlzdG9yeSwgYXJndW1lbnRzKTtcbiAgICB9O1xuICB9XG5cbiAgU09VUkNFX0tFWVMgPSB7XG4gICAgYWpheDogQWpheE1vbml0b3IsXG4gICAgZWxlbWVudHM6IEVsZW1lbnRNb25pdG9yLFxuICAgIGRvY3VtZW50OiBEb2N1bWVudE1vbml0b3IsXG4gICAgZXZlbnRMYWc6IEV2ZW50TGFnTW9uaXRvclxuICB9O1xuXG4gIChpbml0ID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHR5cGUsIF9qLCBfaywgX2xlbjEsIF9sZW4yLCBfcmVmMiwgX3JlZjMsIF9yZWY0O1xuICAgIFBhY2Uuc291cmNlcyA9IHNvdXJjZXMgPSBbXTtcbiAgICBfcmVmMiA9IFsnYWpheCcsICdlbGVtZW50cycsICdkb2N1bWVudCcsICdldmVudExhZyddO1xuICAgIGZvciAoX2ogPSAwLCBfbGVuMSA9IF9yZWYyLmxlbmd0aDsgX2ogPCBfbGVuMTsgX2orKykge1xuICAgICAgdHlwZSA9IF9yZWYyW19qXTtcbiAgICAgIGlmIChvcHRpb25zW3R5cGVdICE9PSBmYWxzZSkge1xuICAgICAgICBzb3VyY2VzLnB1c2gobmV3IFNPVVJDRV9LRVlTW3R5cGVdKG9wdGlvbnNbdHlwZV0pKTtcbiAgICAgIH1cbiAgICB9XG4gICAgX3JlZjQgPSAoX3JlZjMgPSBvcHRpb25zLmV4dHJhU291cmNlcykgIT0gbnVsbCA/IF9yZWYzIDogW107XG4gICAgZm9yIChfayA9IDAsIF9sZW4yID0gX3JlZjQubGVuZ3RoOyBfayA8IF9sZW4yOyBfaysrKSB7XG4gICAgICBzb3VyY2UgPSBfcmVmNFtfa107XG4gICAgICBzb3VyY2VzLnB1c2gobmV3IHNvdXJjZShvcHRpb25zKSk7XG4gICAgfVxuICAgIFBhY2UuYmFyID0gYmFyID0gbmV3IEJhcjtcbiAgICBzY2FsZXJzID0gW107XG4gICAgcmV0dXJuIHVuaVNjYWxlciA9IG5ldyBTY2FsZXI7XG4gIH0pKCk7XG5cbiAgUGFjZS5zdG9wID0gZnVuY3Rpb24oKSB7XG4gICAgUGFjZS50cmlnZ2VyKCdzdG9wJyk7XG4gICAgUGFjZS5ydW5uaW5nID0gZmFsc2U7XG4gICAgYmFyLmRlc3Ryb3koKTtcbiAgICBjYW5jZWxBbmltYXRpb24gPSB0cnVlO1xuICAgIGlmIChhbmltYXRpb24gIT0gbnVsbCkge1xuICAgICAgaWYgKHR5cGVvZiBjYW5jZWxBbmltYXRpb25GcmFtZSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIGNhbmNlbEFuaW1hdGlvbkZyYW1lKGFuaW1hdGlvbik7XG4gICAgICB9XG4gICAgICBhbmltYXRpb24gPSBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gaW5pdCgpO1xuICB9O1xuXG4gIFBhY2UucmVzdGFydCA9IGZ1bmN0aW9uKCkge1xuICAgIFBhY2UudHJpZ2dlcigncmVzdGFydCcpO1xuICAgIFBhY2Uuc3RvcCgpO1xuICAgIHJldHVybiBQYWNlLnN0YXJ0KCk7XG4gIH07XG5cbiAgUGFjZS5nbyA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBzdGFydDtcbiAgICBQYWNlLnJ1bm5pbmcgPSB0cnVlO1xuICAgIGJhci5yZW5kZXIoKTtcbiAgICBzdGFydCA9IG5vdygpO1xuICAgIGNhbmNlbEFuaW1hdGlvbiA9IGZhbHNlO1xuICAgIHJldHVybiBhbmltYXRpb24gPSBydW5BbmltYXRpb24oZnVuY3Rpb24oZnJhbWVUaW1lLCBlbnF1ZXVlTmV4dEZyYW1lKSB7XG4gICAgICB2YXIgYXZnLCBjb3VudCwgZG9uZSwgZWxlbWVudCwgZWxlbWVudHMsIGksIGosIHJlbWFpbmluZywgc2NhbGVyLCBzY2FsZXJMaXN0LCBzdW0sIF9qLCBfaywgX2xlbjEsIF9sZW4yLCBfcmVmMjtcbiAgICAgIHJlbWFpbmluZyA9IDEwMCAtIGJhci5wcm9ncmVzcztcbiAgICAgIGNvdW50ID0gc3VtID0gMDtcbiAgICAgIGRvbmUgPSB0cnVlO1xuICAgICAgZm9yIChpID0gX2ogPSAwLCBfbGVuMSA9IHNvdXJjZXMubGVuZ3RoOyBfaiA8IF9sZW4xOyBpID0gKytfaikge1xuICAgICAgICBzb3VyY2UgPSBzb3VyY2VzW2ldO1xuICAgICAgICBzY2FsZXJMaXN0ID0gc2NhbGVyc1tpXSAhPSBudWxsID8gc2NhbGVyc1tpXSA6IHNjYWxlcnNbaV0gPSBbXTtcbiAgICAgICAgZWxlbWVudHMgPSAoX3JlZjIgPSBzb3VyY2UuZWxlbWVudHMpICE9IG51bGwgPyBfcmVmMiA6IFtzb3VyY2VdO1xuICAgICAgICBmb3IgKGogPSBfayA9IDAsIF9sZW4yID0gZWxlbWVudHMubGVuZ3RoOyBfayA8IF9sZW4yOyBqID0gKytfaykge1xuICAgICAgICAgIGVsZW1lbnQgPSBlbGVtZW50c1tqXTtcbiAgICAgICAgICBzY2FsZXIgPSBzY2FsZXJMaXN0W2pdICE9IG51bGwgPyBzY2FsZXJMaXN0W2pdIDogc2NhbGVyTGlzdFtqXSA9IG5ldyBTY2FsZXIoZWxlbWVudCk7XG4gICAgICAgICAgZG9uZSAmPSBzY2FsZXIuZG9uZTtcbiAgICAgICAgICBpZiAoc2NhbGVyLmRvbmUpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjb3VudCsrO1xuICAgICAgICAgIHN1bSArPSBzY2FsZXIudGljayhmcmFtZVRpbWUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBhdmcgPSBzdW0gLyBjb3VudDtcbiAgICAgIGJhci51cGRhdGUodW5pU2NhbGVyLnRpY2soZnJhbWVUaW1lLCBhdmcpKTtcbiAgICAgIGlmIChiYXIuZG9uZSgpIHx8IGRvbmUgfHwgY2FuY2VsQW5pbWF0aW9uKSB7XG4gICAgICAgIGJhci51cGRhdGUoMTAwKTtcbiAgICAgICAgUGFjZS50cmlnZ2VyKCdkb25lJyk7XG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGJhci5maW5pc2goKTtcbiAgICAgICAgICBQYWNlLnJ1bm5pbmcgPSBmYWxzZTtcbiAgICAgICAgICByZXR1cm4gUGFjZS50cmlnZ2VyKCdoaWRlJyk7XG4gICAgICAgIH0sIE1hdGgubWF4KG9wdGlvbnMuZ2hvc3RUaW1lLCBNYXRoLm1heChvcHRpb25zLm1pblRpbWUgLSAobm93KCkgLSBzdGFydCksIDApKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZW5xdWV1ZU5leHRGcmFtZSgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9O1xuXG4gIFBhY2Uuc3RhcnQgPSBmdW5jdGlvbihfb3B0aW9ucykge1xuICAgIGV4dGVuZChvcHRpb25zLCBfb3B0aW9ucyk7XG4gICAgUGFjZS5ydW5uaW5nID0gdHJ1ZTtcbiAgICB0cnkge1xuICAgICAgYmFyLnJlbmRlcigpO1xuICAgIH0gY2F0Y2ggKF9lcnJvcikge1xuICAgICAgTm9UYXJnZXRFcnJvciA9IF9lcnJvcjtcbiAgICB9XG4gICAgaWYgKCFkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGFjZScpKSB7XG4gICAgICByZXR1cm4gc2V0VGltZW91dChQYWNlLnN0YXJ0LCA1MCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIFBhY2UudHJpZ2dlcignc3RhcnQnKTtcbiAgICAgIHJldHVybiBQYWNlLmdvKCk7XG4gICAgfVxuICB9O1xuXG4gIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICBkZWZpbmUoWydwYWNlJ10sIGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIFBhY2U7XG4gICAgfSk7XG4gIH0gZWxzZSBpZiAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBQYWNlO1xuICB9IGVsc2Uge1xuICAgIGlmIChvcHRpb25zLnN0YXJ0T25QYWdlTG9hZCkge1xuICAgICAgUGFjZS5zdGFydCgpO1xuICAgIH1cbiAgfVxuXG59KS5jYWxsKHRoaXMpO1xuIiwialF1ZXJ5KGZ1bmN0aW9uKCQpIHtcbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICAvLyBGbGV4eSBoZWFkZXJcbiAgICBmbGV4eV9oZWFkZXIuaW5pdCgpO1xuXG4gICAgLy8gU2lkclxuICAgICQoJy5zbGlua3ktbWVudScpXG4gICAgICAgIC5maW5kKCd1bCwgbGksIGEnKVxuICAgICAgICAucmVtb3ZlQ2xhc3MoKTtcblxuICAgICQoJy5zaWRyLXRvZ2dsZS0tcmlnaHQnKS5zaWRyKHtcbiAgICAgICAgbmFtZTogJ3NpZHItbWFpbicsXG4gICAgICAgIHNpZGU6ICdyaWdodCcsXG4gICAgICAgIHJlbmFtaW5nOiBmYWxzZSxcbiAgICAgICAgYm9keTogJy5sYXlvdXRfX3dyYXBwZXInLFxuICAgICAgICBzb3VyY2U6ICcuc2lkci1zb3VyY2UtcHJvdmlkZXInXG4gICAgfSk7XG5cbiAgICAvLyBTbGlua3lcbiAgICAkKCcuc2lkciAuc2xpbmt5LW1lbnUnKS5zbGlua3koe1xuICAgICAgICB0aXRsZTogdHJ1ZSxcbiAgICAgICAgbGFiZWw6ICcnXG4gICAgfSk7XG5cbiAgICAvLyBFbmFibGUgLyBkaXNhYmxlIEJvb3RzdHJhcCB0b29sdGlwcywgYmFzZWQgdXBvbiB0b3VjaCBldmVudHNcbiAgICBpZihNb2Rlcm5penIudG91Y2hldmVudHMpIHtcbiAgICAgICAgJCgnW2RhdGEtdG9nZ2xlPVwidG9vbHRpcFwiXScpLnRvb2x0aXAoJ2hpZGUnKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgICQoJ1tkYXRhLXRvZ2dsZT1cInRvb2x0aXBcIl0nKS50b29sdGlwKCk7XG4gICAgfVxuXG4gICAgLy8gU2hhcmVcbiAgICAkKCcuc2hhcmVfX2l0ZW1fX3RvZ2dsZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIGxldCAkZWxlbWVudCA9ICQodGhpcyk7XG5cbiAgICAgICAgJGVsZW1lbnQucGFyZW50cygnLnNoYXJlX19pdGVtJykudG9nZ2xlQ2xhc3MoJ3Zpc2libGUnKTtcbiAgICB9KTtcblxuICAgIC8vIEJldHRlciBleHBvc2VkIGZpbHRlclxuICAgIGxldCAkY2hlY2tib3hlcyA9ICQoJy5mb3JtLXR5cGUtYmVmLWNoZWNrYm94IGlucHV0W3R5cGU9XCJjaGVja2JveFwiXScpO1xuXG4gICAgJGNoZWNrYm94ZXMuZWFjaChmdW5jdGlvbihpbmRleCwgaXRlbSkge1xuICAgICAgICBsZXQgJGVsZW1lbnQgPSAkKHRoaXMpLFxuICAgICAgICAgICAgJHBhcmVudCA9ICRlbGVtZW50LnBhcmVudHMoJy5mb3JtLXR5cGUtYmVmLWNoZWNrYm94Jyk7XG5cbiAgICAgICAgLy8gQWRkIGNsYXNzZXMgb24gZG9jdW1lbnQgbG9hZFxuICAgICAgICBpZiAoJGVsZW1lbnQuaXMoJzpjaGVja2VkJykpIHtcbiAgICAgICAgICAgICRwYXJlbnQuYWRkQ2xhc3MoJ2lzLWNoZWNrZWQnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICRwYXJlbnQucmVtb3ZlQ2xhc3MoJ2lzLWNoZWNrZWQnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFdoZW4gY2hlY2tib3ggdmFsdWUgaXMgY2hhbmdlZFxuICAgICAgICAkZWxlbWVudC5vbignY2hhbmdlJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgIGxldCAkZWxlbWVudCA9ICQodGhpcyksXG4gICAgICAgICAgICAgICAgJHBhcmVudCA9ICRlbGVtZW50LnBhcmVudHMoJy5mb3JtLXR5cGUtYmVmLWNoZWNrYm94Jyk7XG5cbiAgICAgICAgICAgIGlmICgkZWxlbWVudC5pcygnOmNoZWNrZWQnKSkge1xuICAgICAgICAgICAgICAgICRwYXJlbnQuYWRkQ2xhc3MoJ2lzLWNoZWNrZWQnKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgJHBhcmVudC5yZW1vdmVDbGFzcygnaXMtY2hlY2tlZCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcbn0pO1xuIl19
