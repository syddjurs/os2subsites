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
        $dropdowns = $('.flexy-navigation__item--dropdown');

    $dropdowns.on('mouseenter', function (event) {
        var $element = $(this),
            $header = $element.parents('.flexy-header'),
            $list_items = $header.find('.flexy-navigation__item--dropdown');

        $list_items.addClass('hover');
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
            $last_list_item = $header.find('.flexy-navigation > .flexy-navigation__item--dropdown:last-child'),
            $dropdown_menu = $last_list_item.find('.flexy-navigation__item__dropdown-menu');

        var $btn = $('<span />').addClass('flexy-navigation__item__dropdown-menu__toggle icon fa fa-close').on('click', function (event) {
            var $element = $(this),
                $header = $element.parents('.flexy-header'),
                $list_items = $header.find('.flexy-navigation__item--dropdown');

            $list_items.removeClass('hover');
        });

        $dropdown_menu.append($btn);
    });

    // Apply the same height to all dropdown menus
    $headers.each(function (index, value) {
        var $header = $(this),
            $dropdown_menus = $header.find('.flexy-navigation__item__dropdown-menu'),
            tallest_dropdown = 0;

        // Find the tallest dropdown menu
        $dropdown_menus.each(function (index, value) {
            var $dropdown_menu = $(this),
                height = $dropdown_menu.outerHeight(true);

            if (height > tallest_dropdown) {
                tallest_dropdown = height;
            }
        });

        // Apply the tallest height to all dropdown menus
        $dropdown_menus.css('min-height', tallest_dropdown);
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
        $('[data-toggle=tooltip]').tooltip('hide');
    } else {
        $('[data-toggle=tooltip]').tooltip();
    }
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJvb3RzdHJhcC5qcyIsImZsZXh5LWhlYWRlci5qcyIsImZsZXh5LW5hdmlnYXRpb24uanMiLCJqcXVlcnkuc2lkci5qcyIsImpxdWVyeS5zbGlua3kuanMiLCJwYWNlLmpzIiwiYXBwLmpzIl0sIm5hbWVzIjpbImpRdWVyeSIsIkVycm9yIiwiJCIsInZlcnNpb24iLCJmbiIsImpxdWVyeSIsInNwbGl0IiwidHJhbnNpdGlvbkVuZCIsImVsIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwidHJhbnNFbmRFdmVudE5hbWVzIiwiV2Via2l0VHJhbnNpdGlvbiIsIk1velRyYW5zaXRpb24iLCJPVHJhbnNpdGlvbiIsInRyYW5zaXRpb24iLCJuYW1lIiwic3R5bGUiLCJ1bmRlZmluZWQiLCJlbmQiLCJlbXVsYXRlVHJhbnNpdGlvbkVuZCIsImR1cmF0aW9uIiwiY2FsbGVkIiwiJGVsIiwib25lIiwiY2FsbGJhY2siLCJ0cmlnZ2VyIiwic3VwcG9ydCIsInNldFRpbWVvdXQiLCJldmVudCIsInNwZWNpYWwiLCJic1RyYW5zaXRpb25FbmQiLCJiaW5kVHlwZSIsImRlbGVnYXRlVHlwZSIsImhhbmRsZSIsImUiLCJ0YXJnZXQiLCJpcyIsImhhbmRsZU9iaiIsImhhbmRsZXIiLCJhcHBseSIsImFyZ3VtZW50cyIsImRpc21pc3MiLCJBbGVydCIsIm9uIiwiY2xvc2UiLCJWRVJTSU9OIiwiVFJBTlNJVElPTl9EVVJBVElPTiIsInByb3RvdHlwZSIsIiR0aGlzIiwic2VsZWN0b3IiLCJhdHRyIiwicmVwbGFjZSIsIiRwYXJlbnQiLCJwcmV2ZW50RGVmYXVsdCIsImxlbmd0aCIsImNsb3Nlc3QiLCJFdmVudCIsImlzRGVmYXVsdFByZXZlbnRlZCIsInJlbW92ZUNsYXNzIiwicmVtb3ZlRWxlbWVudCIsImRldGFjaCIsInJlbW92ZSIsImhhc0NsYXNzIiwiUGx1Z2luIiwib3B0aW9uIiwiZWFjaCIsImRhdGEiLCJjYWxsIiwib2xkIiwiYWxlcnQiLCJDb25zdHJ1Y3RvciIsIm5vQ29uZmxpY3QiLCJCdXR0b24iLCJlbGVtZW50Iiwib3B0aW9ucyIsIiRlbGVtZW50IiwiZXh0ZW5kIiwiREVGQVVMVFMiLCJpc0xvYWRpbmciLCJsb2FkaW5nVGV4dCIsInNldFN0YXRlIiwic3RhdGUiLCJkIiwidmFsIiwicmVzZXRUZXh0IiwicHJveHkiLCJhZGRDbGFzcyIsInByb3AiLCJyZW1vdmVBdHRyIiwidG9nZ2xlIiwiY2hhbmdlZCIsIiRpbnB1dCIsImZpbmQiLCJ0b2dnbGVDbGFzcyIsImJ1dHRvbiIsIiRidG4iLCJmaXJzdCIsInRlc3QiLCJ0eXBlIiwiQ2Fyb3VzZWwiLCIkaW5kaWNhdG9ycyIsInBhdXNlZCIsInNsaWRpbmciLCJpbnRlcnZhbCIsIiRhY3RpdmUiLCIkaXRlbXMiLCJrZXlib2FyZCIsImtleWRvd24iLCJwYXVzZSIsImRvY3VtZW50RWxlbWVudCIsImN5Y2xlIiwid3JhcCIsInRhZ05hbWUiLCJ3aGljaCIsInByZXYiLCJuZXh0IiwiY2xlYXJJbnRlcnZhbCIsInNldEludGVydmFsIiwiZ2V0SXRlbUluZGV4IiwiaXRlbSIsInBhcmVudCIsImNoaWxkcmVuIiwiaW5kZXgiLCJnZXRJdGVtRm9yRGlyZWN0aW9uIiwiZGlyZWN0aW9uIiwiYWN0aXZlIiwiYWN0aXZlSW5kZXgiLCJ3aWxsV3JhcCIsImRlbHRhIiwiaXRlbUluZGV4IiwiZXEiLCJ0byIsInBvcyIsInRoYXQiLCJzbGlkZSIsIiRuZXh0IiwiaXNDeWNsaW5nIiwicmVsYXRlZFRhcmdldCIsInNsaWRlRXZlbnQiLCIkbmV4dEluZGljYXRvciIsInNsaWRFdmVudCIsIm9mZnNldFdpZHRoIiwiam9pbiIsImFjdGlvbiIsImNhcm91c2VsIiwiY2xpY2tIYW5kbGVyIiwiaHJlZiIsIiR0YXJnZXQiLCJzbGlkZUluZGV4Iiwid2luZG93IiwiJGNhcm91c2VsIiwiQ29sbGFwc2UiLCIkdHJpZ2dlciIsImlkIiwidHJhbnNpdGlvbmluZyIsImdldFBhcmVudCIsImFkZEFyaWFBbmRDb2xsYXBzZWRDbGFzcyIsImRpbWVuc2lvbiIsImhhc1dpZHRoIiwic2hvdyIsImFjdGl2ZXNEYXRhIiwiYWN0aXZlcyIsInN0YXJ0RXZlbnQiLCJjb21wbGV0ZSIsInNjcm9sbFNpemUiLCJjYW1lbENhc2UiLCJoaWRlIiwib2Zmc2V0SGVpZ2h0IiwiaSIsImdldFRhcmdldEZyb21UcmlnZ2VyIiwiaXNPcGVuIiwiY29sbGFwc2UiLCJiYWNrZHJvcCIsIkRyb3Bkb3duIiwiY2xlYXJNZW51cyIsImNvbnRhaW5zIiwiaXNBY3RpdmUiLCJpbnNlcnRBZnRlciIsInN0b3BQcm9wYWdhdGlvbiIsImRlc2MiLCJkcm9wZG93biIsIk1vZGFsIiwiJGJvZHkiLCJib2R5IiwiJGRpYWxvZyIsIiRiYWNrZHJvcCIsImlzU2hvd24iLCJvcmlnaW5hbEJvZHlQYWQiLCJzY3JvbGxiYXJXaWR0aCIsImlnbm9yZUJhY2tkcm9wQ2xpY2siLCJyZW1vdGUiLCJsb2FkIiwiQkFDS0RST1BfVFJBTlNJVElPTl9EVVJBVElPTiIsIl9yZWxhdGVkVGFyZ2V0IiwiY2hlY2tTY3JvbGxiYXIiLCJzZXRTY3JvbGxiYXIiLCJlc2NhcGUiLCJyZXNpemUiLCJhcHBlbmRUbyIsInNjcm9sbFRvcCIsImFkanVzdERpYWxvZyIsImVuZm9yY2VGb2N1cyIsIm9mZiIsImhpZGVNb2RhbCIsImhhcyIsImhhbmRsZVVwZGF0ZSIsInJlc2V0QWRqdXN0bWVudHMiLCJyZXNldFNjcm9sbGJhciIsInJlbW92ZUJhY2tkcm9wIiwiYW5pbWF0ZSIsImRvQW5pbWF0ZSIsImN1cnJlbnRUYXJnZXQiLCJmb2N1cyIsImNhbGxiYWNrUmVtb3ZlIiwibW9kYWxJc092ZXJmbG93aW5nIiwic2Nyb2xsSGVpZ2h0IiwiY2xpZW50SGVpZ2h0IiwiY3NzIiwicGFkZGluZ0xlZnQiLCJib2R5SXNPdmVyZmxvd2luZyIsInBhZGRpbmdSaWdodCIsImZ1bGxXaW5kb3dXaWR0aCIsImlubmVyV2lkdGgiLCJkb2N1bWVudEVsZW1lbnRSZWN0IiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwicmlnaHQiLCJNYXRoIiwiYWJzIiwibGVmdCIsImNsaWVudFdpZHRoIiwibWVhc3VyZVNjcm9sbGJhciIsImJvZHlQYWQiLCJwYXJzZUludCIsInNjcm9sbERpdiIsImNsYXNzTmFtZSIsImFwcGVuZCIsInJlbW92ZUNoaWxkIiwibW9kYWwiLCJzaG93RXZlbnQiLCJUb29sdGlwIiwiZW5hYmxlZCIsInRpbWVvdXQiLCJob3ZlclN0YXRlIiwiaW5TdGF0ZSIsImluaXQiLCJhbmltYXRpb24iLCJwbGFjZW1lbnQiLCJ0ZW1wbGF0ZSIsInRpdGxlIiwiZGVsYXkiLCJodG1sIiwiY29udGFpbmVyIiwidmlld3BvcnQiLCJwYWRkaW5nIiwiZ2V0T3B0aW9ucyIsIiR2aWV3cG9ydCIsImlzRnVuY3Rpb24iLCJjbGljayIsImhvdmVyIiwiY29uc3RydWN0b3IiLCJ0cmlnZ2VycyIsImV2ZW50SW4iLCJldmVudE91dCIsImVudGVyIiwibGVhdmUiLCJfb3B0aW9ucyIsImZpeFRpdGxlIiwiZ2V0RGVmYXVsdHMiLCJnZXREZWxlZ2F0ZU9wdGlvbnMiLCJkZWZhdWx0cyIsImtleSIsInZhbHVlIiwib2JqIiwic2VsZiIsInRpcCIsImNsZWFyVGltZW91dCIsImlzSW5TdGF0ZVRydWUiLCJoYXNDb250ZW50IiwiaW5Eb20iLCJvd25lckRvY3VtZW50IiwiJHRpcCIsInRpcElkIiwiZ2V0VUlEIiwic2V0Q29udGVudCIsImF1dG9Ub2tlbiIsImF1dG9QbGFjZSIsInRvcCIsImRpc3BsYXkiLCJnZXRQb3NpdGlvbiIsImFjdHVhbFdpZHRoIiwiYWN0dWFsSGVpZ2h0Iiwib3JnUGxhY2VtZW50Iiwidmlld3BvcnREaW0iLCJib3R0b20iLCJ3aWR0aCIsImNhbGN1bGF0ZWRPZmZzZXQiLCJnZXRDYWxjdWxhdGVkT2Zmc2V0IiwiYXBwbHlQbGFjZW1lbnQiLCJwcmV2SG92ZXJTdGF0ZSIsIm9mZnNldCIsImhlaWdodCIsIm1hcmdpblRvcCIsIm1hcmdpbkxlZnQiLCJpc05hTiIsInNldE9mZnNldCIsInVzaW5nIiwicHJvcHMiLCJyb3VuZCIsImdldFZpZXdwb3J0QWRqdXN0ZWREZWx0YSIsImlzVmVydGljYWwiLCJhcnJvd0RlbHRhIiwiYXJyb3dPZmZzZXRQb3NpdGlvbiIsInJlcGxhY2VBcnJvdyIsImFycm93IiwiZ2V0VGl0bGUiLCIkZSIsImlzQm9keSIsImVsUmVjdCIsImlzU3ZnIiwiU1ZHRWxlbWVudCIsImVsT2Zmc2V0Iiwic2Nyb2xsIiwib3V0ZXJEaW1zIiwidmlld3BvcnRQYWRkaW5nIiwidmlld3BvcnREaW1lbnNpb25zIiwidG9wRWRnZU9mZnNldCIsImJvdHRvbUVkZ2VPZmZzZXQiLCJsZWZ0RWRnZU9mZnNldCIsInJpZ2h0RWRnZU9mZnNldCIsIm8iLCJwcmVmaXgiLCJyYW5kb20iLCJnZXRFbGVtZW50QnlJZCIsIiRhcnJvdyIsImVuYWJsZSIsImRpc2FibGUiLCJ0b2dnbGVFbmFibGVkIiwiZGVzdHJveSIsInJlbW92ZURhdGEiLCJ0b29sdGlwIiwiUG9wb3ZlciIsImNvbnRlbnQiLCJnZXRDb250ZW50IiwicG9wb3ZlciIsIlNjcm9sbFNweSIsIiRzY3JvbGxFbGVtZW50Iiwib2Zmc2V0cyIsInRhcmdldHMiLCJhY3RpdmVUYXJnZXQiLCJwcm9jZXNzIiwicmVmcmVzaCIsImdldFNjcm9sbEhlaWdodCIsIm1heCIsIm9mZnNldE1ldGhvZCIsIm9mZnNldEJhc2UiLCJpc1dpbmRvdyIsIm1hcCIsIiRocmVmIiwic29ydCIsImEiLCJiIiwicHVzaCIsIm1heFNjcm9sbCIsImFjdGl2YXRlIiwiY2xlYXIiLCJwYXJlbnRzIiwicGFyZW50c1VudGlsIiwic2Nyb2xsc3B5IiwiJHNweSIsIlRhYiIsIiR1bCIsIiRwcmV2aW91cyIsImhpZGVFdmVudCIsInRhYiIsIkFmZml4IiwiY2hlY2tQb3NpdGlvbiIsImNoZWNrUG9zaXRpb25XaXRoRXZlbnRMb29wIiwiYWZmaXhlZCIsInVucGluIiwicGlubmVkT2Zmc2V0IiwiUkVTRVQiLCJnZXRTdGF0ZSIsIm9mZnNldFRvcCIsIm9mZnNldEJvdHRvbSIsInBvc2l0aW9uIiwidGFyZ2V0SGVpZ2h0IiwiaW5pdGlhbGl6aW5nIiwiY29sbGlkZXJUb3AiLCJjb2xsaWRlckhlaWdodCIsImdldFBpbm5lZE9mZnNldCIsImFmZml4IiwiYWZmaXhUeXBlIiwiZmxleHlfaGVhZGVyIiwicHViIiwiJGhlYWRlcl9zdGF0aWMiLCIkaGVhZGVyX3N0aWNreSIsInVwZGF0ZV9pbnRlcnZhbCIsInRvbGVyYW5jZSIsInVwd2FyZCIsImRvd253YXJkIiwiX2dldF9vZmZzZXRfZnJvbV9lbGVtZW50c19ib3R0b20iLCJjbGFzc2VzIiwicGlubmVkIiwidW5waW5uZWQiLCJ3YXNfc2Nyb2xsZWQiLCJsYXN0X2Rpc3RhbmNlX2Zyb21fdG9wIiwicmVnaXN0ZXJFdmVudEhhbmRsZXJzIiwicmVnaXN0ZXJCb290RXZlbnRIYW5kbGVycyIsImRvY3VtZW50X3dhc19zY3JvbGxlZCIsImVsZW1lbnRfaGVpZ2h0Iiwib3V0ZXJIZWlnaHQiLCJlbGVtZW50X29mZnNldCIsImN1cnJlbnRfZGlzdGFuY2VfZnJvbV90b3AiLCJmbGV4eV9uYXZpZ2F0aW9uIiwibGF5b3V0X2NsYXNzZXMiLCJ1cGdyYWRlIiwiJG5hdmlnYXRpb25zIiwibmF2aWdhdGlvbiIsIiRuYXZpZ2F0aW9uIiwiJG1lZ2FtZW51cyIsImRyb3Bkb3duX21lZ2FtZW51IiwiJGRyb3Bkb3duX21lZ2FtZW51IiwiZHJvcGRvd25faGFzX21lZ2FtZW51IiwiaXNfdXBncmFkZWQiLCJuYXZpZ2F0aW9uX2hhc19tZWdhbWVudSIsIiRtZWdhbWVudSIsImhhc19vYmZ1c2NhdG9yIiwib2JmdXNjYXRvciIsImJhYmVsSGVscGVycyIsImNsYXNzQ2FsbENoZWNrIiwiaW5zdGFuY2UiLCJUeXBlRXJyb3IiLCJjcmVhdGVDbGFzcyIsImRlZmluZVByb3BlcnRpZXMiLCJkZXNjcmlwdG9yIiwiZW51bWVyYWJsZSIsImNvbmZpZ3VyYWJsZSIsIndyaXRhYmxlIiwiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJwcm90b1Byb3BzIiwic3RhdGljUHJvcHMiLCJzaWRyU3RhdHVzIiwibW92aW5nIiwib3BlbmVkIiwiaGVscGVyIiwiaXNVcmwiLCJzdHIiLCJwYXR0ZXJuIiwiUmVnRXhwIiwiYWRkUHJlZml4ZXMiLCJhZGRQcmVmaXgiLCJhdHRyaWJ1dGUiLCJ0b1JlcGxhY2UiLCJ0cmFuc2l0aW9ucyIsInN1cHBvcnRlZCIsInByb3BlcnR5IiwicHJlZml4ZXMiLCJjaGFyQXQiLCJ0b1VwcGVyQ2FzZSIsInN1YnN0ciIsInRvTG93ZXJDYXNlIiwiJCQyIiwiYm9keUFuaW1hdGlvbkNsYXNzIiwib3BlbkFjdGlvbiIsImNsb3NlQWN0aW9uIiwidHJhbnNpdGlvbkVuZEV2ZW50IiwiTWVudSIsIm9wZW5DbGFzcyIsIm1lbnVXaWR0aCIsIm91dGVyV2lkdGgiLCJzcGVlZCIsInNpZGUiLCJkaXNwbGFjZSIsInRpbWluZyIsIm1ldGhvZCIsIm9uT3BlbkNhbGxiYWNrIiwib25DbG9zZUNhbGxiYWNrIiwib25PcGVuRW5kQ2FsbGJhY2siLCJvbkNsb3NlRW5kQ2FsbGJhY2siLCJnZXRBbmltYXRpb24iLCJwcmVwYXJlQm9keSIsIiRodG1sIiwib3BlbkJvZHkiLCJib2R5QW5pbWF0aW9uIiwicXVldWUiLCJvbkNsb3NlQm9keSIsInJlc2V0U3R5bGVzIiwidW5iaW5kIiwiY2xvc2VCb2R5IiwiX3RoaXMiLCJtb3ZlQm9keSIsIm9uT3Blbk1lbnUiLCJvcGVuTWVudSIsIl90aGlzMiIsIiRpdGVtIiwibWVudUFuaW1hdGlvbiIsIm9uQ2xvc2VNZW51IiwiY2xvc2VNZW51IiwiX3RoaXMzIiwibW92ZU1lbnUiLCJtb3ZlIiwib3BlbiIsIl90aGlzNCIsImFscmVhZHlPcGVuZWRNZW51IiwiJCQxIiwiZXhlY3V0ZSIsInNpZHIiLCJlcnJvciIsInB1YmxpY01ldGhvZHMiLCJtZXRob2ROYW1lIiwibWV0aG9kcyIsImdldE1ldGhvZCIsIkFycmF5Iiwic2xpY2UiLCIkJDMiLCJmaWxsQ29udGVudCIsIiRzaWRlTWVudSIsInNldHRpbmdzIiwic291cmNlIiwibmV3Q29udGVudCIsImdldCIsImh0bWxDb250ZW50Iiwic2VsZWN0b3JzIiwicmVuYW1pbmciLCIkaHRtbENvbnRlbnQiLCJmblNpZHIiLCJiaW5kIiwib25PcGVuIiwib25DbG9zZSIsIm9uT3BlbkVuZCIsIm9uQ2xvc2VFbmQiLCJmbGFnIiwidCIsInNsaW5reSIsInMiLCJsYWJlbCIsIm4iLCJyIiwibCIsInByZXBlbmQiLCJ0ZXh0IiwiRGF0ZSIsIm5vdyIsImp1bXAiLCJob21lIiwiYyIsIkFqYXhNb25pdG9yIiwiQmFyIiwiRG9jdW1lbnRNb25pdG9yIiwiRWxlbWVudE1vbml0b3IiLCJFbGVtZW50VHJhY2tlciIsIkV2ZW50TGFnTW9uaXRvciIsIkV2ZW50ZWQiLCJFdmVudHMiLCJOb1RhcmdldEVycm9yIiwiUGFjZSIsIlJlcXVlc3RJbnRlcmNlcHQiLCJTT1VSQ0VfS0VZUyIsIlNjYWxlciIsIlNvY2tldFJlcXVlc3RUcmFja2VyIiwiWEhSUmVxdWVzdFRyYWNrZXIiLCJhdmdBbXBsaXR1ZGUiLCJiYXIiLCJjYW5jZWxBbmltYXRpb24iLCJjYW5jZWxBbmltYXRpb25GcmFtZSIsImRlZmF1bHRPcHRpb25zIiwiZXh0ZW5kTmF0aXZlIiwiZ2V0RnJvbURPTSIsImdldEludGVyY2VwdCIsImhhbmRsZVB1c2hTdGF0ZSIsImlnbm9yZVN0YWNrIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwicmVzdWx0IiwicnVuQW5pbWF0aW9uIiwic2NhbGVycyIsInNob3VsZElnbm9yZVVSTCIsInNob3VsZFRyYWNrIiwic291cmNlcyIsInVuaVNjYWxlciIsIl9XZWJTb2NrZXQiLCJfWERvbWFpblJlcXVlc3QiLCJfWE1MSHR0cFJlcXVlc3QiLCJfaSIsIl9pbnRlcmNlcHQiLCJfbGVuIiwiX3B1c2hTdGF0ZSIsIl9yZWYiLCJfcmVmMSIsIl9yZXBsYWNlU3RhdGUiLCJfX3NsaWNlIiwiX19oYXNQcm9wIiwiaGFzT3duUHJvcGVydHkiLCJfX2V4dGVuZHMiLCJjaGlsZCIsImN0b3IiLCJfX3N1cGVyX18iLCJfX2luZGV4T2YiLCJpbmRleE9mIiwiY2F0Y2h1cFRpbWUiLCJpbml0aWFsUmF0ZSIsIm1pblRpbWUiLCJnaG9zdFRpbWUiLCJtYXhQcm9ncmVzc1BlckZyYW1lIiwiZWFzZUZhY3RvciIsInN0YXJ0T25QYWdlTG9hZCIsInJlc3RhcnRPblB1c2hTdGF0ZSIsInJlc3RhcnRPblJlcXVlc3RBZnRlciIsImVsZW1lbnRzIiwiY2hlY2tJbnRlcnZhbCIsImV2ZW50TGFnIiwibWluU2FtcGxlcyIsInNhbXBsZUNvdW50IiwibGFnVGhyZXNob2xkIiwiYWpheCIsInRyYWNrTWV0aG9kcyIsInRyYWNrV2ViU29ja2V0cyIsImlnbm9yZVVSTHMiLCJwZXJmb3JtYW5jZSIsIm1velJlcXVlc3RBbmltYXRpb25GcmFtZSIsIndlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZSIsIm1zUmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwibW96Q2FuY2VsQW5pbWF0aW9uRnJhbWUiLCJsYXN0IiwidGljayIsImRpZmYiLCJhcmdzIiwib3V0IiwiYXJyIiwiY291bnQiLCJzdW0iLCJ2IiwianNvbiIsInF1ZXJ5U2VsZWN0b3IiLCJnZXRBdHRyaWJ1dGUiLCJKU09OIiwicGFyc2UiLCJfZXJyb3IiLCJjb25zb2xlIiwiY3R4Iiwib25jZSIsIl9iYXNlIiwiYmluZGluZ3MiLCJfcmVzdWx0cyIsInNwbGljZSIsInBhY2VPcHRpb25zIiwiX3N1cGVyIiwicHJvZ3Jlc3MiLCJnZXRFbGVtZW50IiwidGFyZ2V0RWxlbWVudCIsImlubmVySFRNTCIsImZpcnN0Q2hpbGQiLCJpbnNlcnRCZWZvcmUiLCJhcHBlbmRDaGlsZCIsImZpbmlzaCIsInVwZGF0ZSIsInByb2ciLCJyZW5kZXIiLCJwYXJlbnROb2RlIiwicHJvZ3Jlc3NTdHIiLCJ0cmFuc2Zvcm0iLCJfaiIsIl9sZW4xIiwiX3JlZjIiLCJsYXN0UmVuZGVyZWRQcm9ncmVzcyIsInNldEF0dHJpYnV0ZSIsImRvbmUiLCJiaW5kaW5nIiwiWE1MSHR0cFJlcXVlc3QiLCJYRG9tYWluUmVxdWVzdCIsIldlYlNvY2tldCIsImZyb20iLCJpZ25vcmUiLCJyZXQiLCJ1bnNoaWZ0Iiwic2hpZnQiLCJ0cmFjayIsIm1vbml0b3JYSFIiLCJyZXEiLCJfb3BlbiIsInVybCIsImFzeW5jIiwicmVxdWVzdCIsImZsYWdzIiwicHJvdG9jb2xzIiwiX2FyZyIsImFmdGVyIiwicnVubmluZyIsInN0aWxsQWN0aXZlIiwiX3JlZjMiLCJyZWFkeVN0YXRlIiwicmVzdGFydCIsIndhdGNoIiwidHJhY2tlciIsInNpemUiLCJfb25yZWFkeXN0YXRlY2hhbmdlIiwiUHJvZ3Jlc3NFdmVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJldnQiLCJsZW5ndGhDb21wdXRhYmxlIiwibG9hZGVkIiwidG90YWwiLCJvbnJlYWR5c3RhdGVjaGFuZ2UiLCJjaGVjayIsInN0YXRlcyIsImxvYWRpbmciLCJpbnRlcmFjdGl2ZSIsImF2ZyIsInBvaW50cyIsInNhbXBsZXMiLCJzaW5jZUxhc3RVcGRhdGUiLCJyYXRlIiwiY2F0Y2h1cCIsImxhc3RQcm9ncmVzcyIsImZyYW1lVGltZSIsInNjYWxpbmciLCJwb3ciLCJtaW4iLCJoaXN0b3J5IiwicHVzaFN0YXRlIiwicmVwbGFjZVN0YXRlIiwiX2siLCJfbGVuMiIsIl9yZWY0IiwiZXh0cmFTb3VyY2VzIiwic3RvcCIsInN0YXJ0IiwiZ28iLCJlbnF1ZXVlTmV4dEZyYW1lIiwiaiIsInJlbWFpbmluZyIsInNjYWxlciIsInNjYWxlckxpc3QiLCJkZWZpbmUiLCJhbWQiLCJleHBvcnRzIiwibW9kdWxlIiwiJGhlYWRlcnMiLCIkZHJvcGRvd25zIiwiJGhlYWRlciIsIiRsaXN0X2l0ZW1zIiwiJGxhc3RfbGlzdF9pdGVtIiwiJGRyb3Bkb3duX21lbnUiLCIkZHJvcGRvd25fbWVudXMiLCJ0YWxsZXN0X2Ryb3Bkb3duIiwiTW9kZXJuaXpyIiwidG91Y2hldmVudHMiXSwibWFwcGluZ3MiOiI7Ozs7QUFBQTs7Ozs7O0FBTUEsSUFBSSxPQUFPQSxNQUFQLEtBQWtCLFdBQXRCLEVB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QUF4QixDQUErQjtBQUMzQjlSLGVBQU8sSUFEb0I7QUFFM0JnUyxlQUFPO0FBRm9CLEtBQS9COztBQUtBO0FBQ0EsUUFBR2lOLFVBQVVDLFdBQWIsRUFBMEI7QUFDdEJ6dUIsVUFBRSx1QkFBRixFQUEyQmtWLE9BQTNCLENBQW1DLE1BQW5DO0FBQ0gsS0FGRCxNQUdLO0FBQ0RsVixVQUFFLHVCQUFGLEVBQTJCa1YsT0FBM0I7QUFDSDtBQUNKLENBaENEIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIVxuICogQm9vdHN0cmFwIHYzLjMuNyAoaHR0cDovL2dldGJvb3RzdHJhcC5jb20pXG4gKiBDb3B5cmlnaHQgMjAxMS0yMDE2IFR3aXR0ZXIsIEluYy5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZVxuICovXG5cbmlmICh0eXBlb2YgalF1ZXJ5ID09PSAndW5kZWZpbmVkJykge1xuICB0aHJvdyBuZXcgRXJyb3IoJ0Jvb3RzdHJhcFxcJ3MgSmF2YVNjcmlwdCByZXF1aXJlcyBqUXVlcnknKVxufVxuXG4rZnVuY3Rpb24gKCQpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICB2YXIgdmVyc2lvbiA9ICQuZm4uanF1ZXJ5LnNwbGl0KCcgJylbMF0uc3BsaXQoJy4nKVxuICBpZiAoKHZlcnNpb25bMF0gPCAyICYmIHZlcnNpb25bMV0gPCA5KSB8fCAodmVyc2lvblswXSA9PSAxICYmIHZlcnNpb25bMV0gPT0gOSAmJiB2ZXJzaW9uWzJdIDwgMSkgfHwgKHZlcnNpb25bMF0gPiAzKSkge1xuICAgIHRocm93IG5ldyBFcnJvcignQm9vdHN0cmFwXFwncyBKYXZhU2NyaXB0IHJlcXVpcmVzIGpRdWVyeSB2ZXJzaW9uIDEuOS4xIG9yIGhpZ2hlciwgYnV0IGxvd2VyIHRoYW4gdmVyc2lvbiA0JylcbiAgfVxufShqUXVlcnkpO1xuXG4vKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqIEJvb3RzdHJhcDogdHJhbnNpdGlvbi5qcyB2My4zLjdcbiAqIGh0dHA6Ly9nZXRib290c3RyYXAuY29tL2phdmFzY3JpcHQvI3RyYW5zaXRpb25zXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqIENvcHlyaWdodCAyMDExLTIwMTYgVHdpdHRlciwgSW5jLlxuICogTGljZW5zZWQgdW5kZXIgTUlUIChodHRwczovL2dpdGh1Yi5jb20vdHdicy9ib290c3RyYXAvYmxvYi9tYXN0ZXIvTElDRU5TRSlcbiAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXG5cbitmdW5jdGlvbiAoJCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgLy8gQ1NTIFRSQU5TSVRJT04gU1VQUE9SVCAoU2hvdXRvdXQ6IGh0dHA6Ly93d3cubW9kZXJuaXpyLmNvbS8pXG4gIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4gIGZ1bmN0aW9uIHRyYW5zaXRpb25FbmQoKSB7XG4gICAgdmFyIGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYm9vdHN0cmFwJylcblxuICAgIHZhciB0cmFuc0VuZEV2ZW50TmFtZXMgPSB7XG4gICAgICBXZWJraXRUcmFuc2l0aW9uIDogJ3dlYmtpdFRyYW5zaXRpb25FbmQnLFxuICAgICAgTW96VHJhbnNpdGlvbiAgICA6ICd0cmFuc2l0aW9uZW5kJyxcbiAgICAgIE9UcmFuc2l0aW9uICAgICAgOiAnb1RyYW5zaXRpb25FbmQgb3RyYW5zaXRpb25lbmQnLFxuICAgICAgdHJhbnNpdGlvbiAgICAgICA6ICd0cmFuc2l0aW9uZW5kJ1xuICAgIH1cblxuICAgIGZvciAodmFyIG5hbWUgaW4gdHJhbnNFbmRFdmVudE5hbWVzKSB7XG4gICAgICBpZiAoZWwuc3R5bGVbbmFtZV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4geyBlbmQ6IHRyYW5zRW5kRXZlbnROYW1lc1tuYW1lXSB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlIC8vIGV4cGxpY2l0IGZvciBpZTggKCAgLl8uKVxuICB9XG5cbiAgLy8gaHR0cDovL2Jsb2cuYWxleG1hY2Nhdy5jb20vY3NzLXRyYW5zaXRpb25zXG4gICQuZm4uZW11bGF0ZVRyYW5zaXRpb25FbmQgPSBmdW5jdGlvbiAoZHVyYXRpb24pIHtcbiAgICB2YXIgY2FsbGVkID0gZmFsc2VcbiAgICB2YXIgJGVsID0gdGhpc1xuICAgICQodGhpcykub25lKCdic1RyYW5zaXRpb25FbmQnLCBmdW5jdGlvbiAoKSB7IGNhbGxlZCA9IHRydWUgfSlcbiAgICB2YXIgY2FsbGJhY2sgPSBmdW5jdGlvbiAoKSB7IGlmICghY2FsbGVkKSAkKCRlbCkudHJpZ2dlcigkLnN1cHBvcnQudHJhbnNpdGlvbi5lbmQpIH1cbiAgICBzZXRUaW1lb3V0KGNhbGxiYWNrLCBkdXJhdGlvbilcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgJChmdW5jdGlvbiAoKSB7XG4gICAgJC5zdXBwb3J0LnRyYW5zaXRpb24gPSB0cmFuc2l0aW9uRW5kKClcblxuICAgIGlmICghJC5zdXBwb3J0LnRyYW5zaXRpb24pIHJldHVyblxuXG4gICAgJC5ldmVudC5zcGVjaWFsLmJzVHJhbnNpdGlvbkVuZCA9IHtcbiAgICAgIGJpbmRUeXBlOiAkLnN1cHBvcnQudHJhbnNpdGlvbi5lbmQsXG4gICAgICBkZWxlZ2F0ZVR5cGU6ICQuc3VwcG9ydC50cmFuc2l0aW9uLmVuZCxcbiAgICAgIGhhbmRsZTogZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgaWYgKCQoZS50YXJnZXQpLmlzKHRoaXMpKSByZXR1cm4gZS5oYW5kbGVPYmouaGFuZGxlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpXG4gICAgICB9XG4gICAgfVxuICB9KVxuXG59KGpRdWVyeSk7XG5cbi8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICogQm9vdHN0cmFwOiBhbGVydC5qcyB2My4zLjdcbiAqIGh0dHA6Ly9nZXRib290c3RyYXAuY29tL2phdmFzY3JpcHQvI2FsZXJ0c1xuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKiBDb3B5cmlnaHQgMjAxMS0yMDE2IFR3aXR0ZXIsIEluYy5cbiAqIExpY2Vuc2VkIHVuZGVyIE1JVCAoaHR0cHM6Ly9naXRodWIuY29tL3R3YnMvYm9vdHN0cmFwL2Jsb2IvbWFzdGVyL0xJQ0VOU0UpXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuXG4rZnVuY3Rpb24gKCQpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIC8vIEFMRVJUIENMQVNTIERFRklOSVRJT05cbiAgLy8gPT09PT09PT09PT09PT09PT09PT09PVxuXG4gIHZhciBkaXNtaXNzID0gJ1tkYXRhLWRpc21pc3M9XCJhbGVydFwiXSdcbiAgdmFyIEFsZXJ0ICAgPSBmdW5jdGlvbiAoZWwpIHtcbiAgICAkKGVsKS5vbignY2xpY2snLCBkaXNtaXNzLCB0aGlzLmNsb3NlKVxuICB9XG5cbiAgQWxlcnQuVkVSU0lPTiA9ICczLjMuNydcblxuICBBbGVydC5UUkFOU0lUSU9OX0RVUkFUSU9OID0gMTUwXG5cbiAgQWxlcnQucHJvdG90eXBlLmNsb3NlID0gZnVuY3Rpb24gKGUpIHtcbiAgICB2YXIgJHRoaXMgICAgPSAkKHRoaXMpXG4gICAgdmFyIHNlbGVjdG9yID0gJHRoaXMuYXR0cignZGF0YS10YXJnZXQnKVxuXG4gICAgaWYgKCFzZWxlY3Rvcikge1xuICAgICAgc2VsZWN0b3IgPSAkdGhpcy5hdHRyKCdocmVmJylcbiAgICAgIHNlbGVjdG9yID0gc2VsZWN0b3IgJiYgc2VsZWN0b3IucmVwbGFjZSgvLiooPz0jW15cXHNdKiQpLywgJycpIC8vIHN0cmlwIGZvciBpZTdcbiAgICB9XG5cbiAgICB2YXIgJHBhcmVudCA9ICQoc2VsZWN0b3IgPT09ICcjJyA/IFtdIDogc2VsZWN0b3IpXG5cbiAgICBpZiAoZSkgZS5wcmV2ZW50RGVmYXVsdCgpXG5cbiAgICBpZiAoISRwYXJlbnQubGVuZ3RoKSB7XG4gICAgICAkcGFyZW50ID0gJHRoaXMuY2xvc2VzdCgnLmFsZXJ0JylcbiAgICB9XG5cbiAgICAkcGFyZW50LnRyaWdnZXIoZSA9ICQuRXZlbnQoJ2Nsb3NlLmJzLmFsZXJ0JykpXG5cbiAgICBpZiAoZS5pc0RlZmF1bHRQcmV2ZW50ZWQoKSkgcmV0dXJuXG5cbiAgICAkcGFyZW50LnJlbW92ZUNsYXNzKCdpbicpXG5cbiAgICBmdW5jdGlvbiByZW1vdmVFbGVtZW50KCkge1xuICAgICAgLy8gZGV0YWNoIGZyb20gcGFyZW50LCBmaXJlIGV2ZW50IHRoZW4gY2xlYW4gdXAgZGF0YVxuICAgICAgJHBhcmVudC5kZXRhY2goKS50cmlnZ2VyKCdjbG9zZWQuYnMuYWxlcnQnKS5yZW1vdmUoKVxuICAgIH1cblxuICAgICQuc3VwcG9ydC50cmFuc2l0aW9uICYmICRwYXJlbnQuaGFzQ2xhc3MoJ2ZhZGUnKSA/XG4gICAgICAkcGFyZW50XG4gICAgICAgIC5vbmUoJ2JzVHJhbnNpdGlvbkVuZCcsIHJlbW92ZUVsZW1lbnQpXG4gICAgICAgIC5lbXVsYXRlVHJhbnNpdGlvbkVuZChBbGVydC5UUkFOU0lUSU9OX0RVUkFUSU9OKSA6XG4gICAgICByZW1vdmVFbGVtZW50KClcbiAgfVxuXG5cbiAgLy8gQUxFUlQgUExVR0lOIERFRklOSVRJT05cbiAgLy8gPT09PT09PT09PT09PT09PT09PT09PT1cblxuICBmdW5jdGlvbiBQbHVnaW4ob3B0aW9uKSB7XG4gICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgJHRoaXMgPSAkKHRoaXMpXG4gICAgICB2YXIgZGF0YSAgPSAkdGhpcy5kYXRhKCdicy5hbGVydCcpXG5cbiAgICAgIGlmICghZGF0YSkgJHRoaXMuZGF0YSgnYnMuYWxlcnQnLCAoZGF0YSA9IG5ldyBBbGVydCh0aGlzKSkpXG4gICAgICBpZiAodHlwZW9mIG9wdGlvbiA9PSAnc3RyaW5nJykgZGF0YVtvcHRpb25dLmNhbGwoJHRoaXMpXG4gICAgfSlcbiAgfVxuXG4gIHZhciBvbGQgPSAkLmZuLmFsZXJ0XG5cbiAgJC5mbi5hbGVydCAgICAgICAgICAgICA9IFBsdWdpblxuICAkLmZuLmFsZXJ0LkNvbnN0cnVjdG9yID0gQWxlcnRcblxuXG4gIC8vIEFMRVJUIE5PIENPTkZMSUNUXG4gIC8vID09PT09PT09PT09PT09PT09XG5cbiAgJC5mbi5hbGVydC5ub0NvbmZsaWN0ID0gZnVuY3Rpb24gKCkge1xuICAgICQuZm4uYWxlcnQgPSBvbGRcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cblxuICAvLyBBTEVSVCBEQVRBLUFQSVxuICAvLyA9PT09PT09PT09PT09PVxuXG4gICQoZG9jdW1lbnQpLm9uKCdjbGljay5icy5hbGVydC5kYXRhLWFwaScsIGRpc21pc3MsIEFsZXJ0LnByb3RvdHlwZS5jbG9zZSlcblxufShqUXVlcnkpO1xuXG4vKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqIEJvb3RzdHJhcDogYnV0dG9uLmpzIHYzLjMuN1xuICogaHR0cDovL2dldGJvb3RzdHJhcC5jb20vamF2YXNjcmlwdC8jYnV0dG9uc1xuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKiBDb3B5cmlnaHQgMjAxMS0yMDE2IFR3aXR0ZXIsIEluYy5cbiAqIExpY2Vuc2VkIHVuZGVyIE1JVCAoaHR0cHM6Ly9naXRodWIuY29tL3R3YnMvYm9vdHN0cmFwL2Jsb2IvbWFzdGVyL0xJQ0VOU0UpXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuXG4rZnVuY3Rpb24gKCQpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIC8vIEJVVFRPTiBQVUJMSUMgQ0xBU1MgREVGSU5JVElPTlxuICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuICB2YXIgQnV0dG9uID0gZnVuY3Rpb24gKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICB0aGlzLiRlbGVtZW50ICA9ICQoZWxlbWVudClcbiAgICB0aGlzLm9wdGlvbnMgICA9ICQuZXh0ZW5kKHt9LCBCdXR0b24uREVGQVVMVFMsIG9wdGlvbnMpXG4gICAgdGhpcy5pc0xvYWRpbmcgPSBmYWxzZVxuICB9XG5cbiAgQnV0dG9uLlZFUlNJT04gID0gJzMuMy43J1xuXG4gIEJ1dHRvbi5ERUZBVUxUUyA9IHtcbiAgICBsb2FkaW5nVGV4dDogJ2xvYWRpbmcuLi4nXG4gIH1cblxuICBCdXR0b24ucHJvdG90eXBlLnNldFN0YXRlID0gZnVuY3Rpb24gKHN0YXRlKSB7XG4gICAgdmFyIGQgICAgPSAnZGlzYWJsZWQnXG4gICAgdmFyICRlbCAgPSB0aGlzLiRlbGVtZW50XG4gICAgdmFyIHZhbCAgPSAkZWwuaXMoJ2lucHV0JykgPyAndmFsJyA6ICdodG1sJ1xuICAgIHZhciBkYXRhID0gJGVsLmRhdGEoKVxuXG4gICAgc3RhdGUgKz0gJ1RleHQnXG5cbiAgICBpZiAoZGF0YS5yZXNldFRleHQgPT0gbnVsbCkgJGVsLmRhdGEoJ3Jlc2V0VGV4dCcsICRlbFt2YWxdKCkpXG5cbiAgICAvLyBwdXNoIHRvIGV2ZW50IGxvb3AgdG8gYWxsb3cgZm9ybXMgdG8gc3VibWl0XG4gICAgc2V0VGltZW91dCgkLnByb3h5KGZ1bmN0aW9uICgpIHtcbiAgICAgICRlbFt2YWxdKGRhdGFbc3RhdGVdID09IG51bGwgPyB0aGlzLm9wdGlvbnNbc3RhdGVdIDogZGF0YVtzdGF0ZV0pXG5cbiAgICAgIGlmIChzdGF0ZSA9PSAnbG9hZGluZ1RleHQnKSB7XG4gICAgICAgIHRoaXMuaXNMb2FkaW5nID0gdHJ1ZVxuICAgICAgICAkZWwuYWRkQ2xhc3MoZCkuYXR0cihkLCBkKS5wcm9wKGQsIHRydWUpXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuaXNMb2FkaW5nKSB7XG4gICAgICAgIHRoaXMuaXNMb2FkaW5nID0gZmFsc2VcbiAgICAgICAgJGVsLnJlbW92ZUNsYXNzKGQpLnJlbW92ZUF0dHIoZCkucHJvcChkLCBmYWxzZSlcbiAgICAgIH1cbiAgICB9LCB0aGlzKSwgMClcbiAgfVxuXG4gIEJ1dHRvbi5wcm90b3R5cGUudG9nZ2xlID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBjaGFuZ2VkID0gdHJ1ZVxuICAgIHZhciAkcGFyZW50ID0gdGhpcy4kZWxlbWVudC5jbG9zZXN0KCdbZGF0YS10b2dnbGU9XCJidXR0b25zXCJdJylcblxuICAgIGlmICgkcGFyZW50Lmxlbmd0aCkge1xuICAgICAgdmFyICRpbnB1dCA9IHRoaXMuJGVsZW1lbnQuZmluZCgnaW5wdXQnKVxuICAgICAgaWYgKCRpbnB1dC5wcm9wKCd0eXBlJykgPT0gJ3JhZGlvJykge1xuICAgICAgICBpZiAoJGlucHV0LnByb3AoJ2NoZWNrZWQnKSkgY2hhbmdlZCA9IGZhbHNlXG4gICAgICAgICRwYXJlbnQuZmluZCgnLmFjdGl2ZScpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKVxuICAgICAgICB0aGlzLiRlbGVtZW50LmFkZENsYXNzKCdhY3RpdmUnKVxuICAgICAgfSBlbHNlIGlmICgkaW5wdXQucHJvcCgndHlwZScpID09ICdjaGVja2JveCcpIHtcbiAgICAgICAgaWYgKCgkaW5wdXQucHJvcCgnY2hlY2tlZCcpKSAhPT0gdGhpcy4kZWxlbWVudC5oYXNDbGFzcygnYWN0aXZlJykpIGNoYW5nZWQgPSBmYWxzZVxuICAgICAgICB0aGlzLiRlbGVtZW50LnRvZ2dsZUNsYXNzKCdhY3RpdmUnKVxuICAgICAgfVxuICAgICAgJGlucHV0LnByb3AoJ2NoZWNrZWQnLCB0aGlzLiRlbGVtZW50Lmhhc0NsYXNzKCdhY3RpdmUnKSlcbiAgICAgIGlmIChjaGFuZ2VkKSAkaW5wdXQudHJpZ2dlcignY2hhbmdlJylcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy4kZWxlbWVudC5hdHRyKCdhcmlhLXByZXNzZWQnLCAhdGhpcy4kZWxlbWVudC5oYXNDbGFzcygnYWN0aXZlJykpXG4gICAgICB0aGlzLiRlbGVtZW50LnRvZ2dsZUNsYXNzKCdhY3RpdmUnKVxuICAgIH1cbiAgfVxuXG5cbiAgLy8gQlVUVE9OIFBMVUdJTiBERUZJTklUSU9OXG4gIC8vID09PT09PT09PT09PT09PT09PT09PT09PVxuXG4gIGZ1bmN0aW9uIFBsdWdpbihvcHRpb24pIHtcbiAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciAkdGhpcyAgID0gJCh0aGlzKVxuICAgICAgdmFyIGRhdGEgICAgPSAkdGhpcy5kYXRhKCdicy5idXR0b24nKVxuICAgICAgdmFyIG9wdGlvbnMgPSB0eXBlb2Ygb3B0aW9uID09ICdvYmplY3QnICYmIG9wdGlvblxuXG4gICAgICBpZiAoIWRhdGEpICR0aGlzLmRhdGEoJ2JzLmJ1dHRvbicsIChkYXRhID0gbmV3IEJ1dHRvbih0aGlzLCBvcHRpb25zKSkpXG5cbiAgICAgIGlmIChvcHRpb24gPT0gJ3RvZ2dsZScpIGRhdGEudG9nZ2xlKClcbiAgICAgIGVsc2UgaWYgKG9wdGlvbikgZGF0YS5zZXRTdGF0ZShvcHRpb24pXG4gICAgfSlcbiAgfVxuXG4gIHZhciBvbGQgPSAkLmZuLmJ1dHRvblxuXG4gICQuZm4uYnV0dG9uICAgICAgICAgICAgID0gUGx1Z2luXG4gICQuZm4uYnV0dG9uLkNvbnN0cnVjdG9yID0gQnV0dG9uXG5cblxuICAvLyBCVVRUT04gTk8gQ09ORkxJQ1RcbiAgLy8gPT09PT09PT09PT09PT09PT09XG5cbiAgJC5mbi5idXR0b24ubm9Db25mbGljdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAkLmZuLmJ1dHRvbiA9IG9sZFxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuXG4gIC8vIEJVVFRPTiBEQVRBLUFQSVxuICAvLyA9PT09PT09PT09PT09PT1cblxuICAkKGRvY3VtZW50KVxuICAgIC5vbignY2xpY2suYnMuYnV0dG9uLmRhdGEtYXBpJywgJ1tkYXRhLXRvZ2dsZV49XCJidXR0b25cIl0nLCBmdW5jdGlvbiAoZSkge1xuICAgICAgdmFyICRidG4gPSAkKGUudGFyZ2V0KS5jbG9zZXN0KCcuYnRuJylcbiAgICAgIFBsdWdpbi5jYWxsKCRidG4sICd0b2dnbGUnKVxuICAgICAgaWYgKCEoJChlLnRhcmdldCkuaXMoJ2lucHV0W3R5cGU9XCJyYWRpb1wiXSwgaW5wdXRbdHlwZT1cImNoZWNrYm94XCJdJykpKSB7XG4gICAgICAgIC8vIFByZXZlbnQgZG91YmxlIGNsaWNrIG9uIHJhZGlvcywgYW5kIHRoZSBkb3VibGUgc2VsZWN0aW9ucyAoc28gY2FuY2VsbGF0aW9uKSBvbiBjaGVja2JveGVzXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgICAvLyBUaGUgdGFyZ2V0IGNvbXBvbmVudCBzdGlsbCByZWNlaXZlIHRoZSBmb2N1c1xuICAgICAgICBpZiAoJGJ0bi5pcygnaW5wdXQsYnV0dG9uJykpICRidG4udHJpZ2dlcignZm9jdXMnKVxuICAgICAgICBlbHNlICRidG4uZmluZCgnaW5wdXQ6dmlzaWJsZSxidXR0b246dmlzaWJsZScpLmZpcnN0KCkudHJpZ2dlcignZm9jdXMnKVxuICAgICAgfVxuICAgIH0pXG4gICAgLm9uKCdmb2N1cy5icy5idXR0b24uZGF0YS1hcGkgYmx1ci5icy5idXR0b24uZGF0YS1hcGknLCAnW2RhdGEtdG9nZ2xlXj1cImJ1dHRvblwiXScsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAkKGUudGFyZ2V0KS5jbG9zZXN0KCcuYnRuJykudG9nZ2xlQ2xhc3MoJ2ZvY3VzJywgL15mb2N1cyhpbik/JC8udGVzdChlLnR5cGUpKVxuICAgIH0pXG5cbn0oalF1ZXJ5KTtcblxuLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKiBCb290c3RyYXA6IGNhcm91c2VsLmpzIHYzLjMuN1xuICogaHR0cDovL2dldGJvb3RzdHJhcC5jb20vamF2YXNjcmlwdC8jY2Fyb3VzZWxcbiAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICogQ29weXJpZ2h0IDIwMTEtMjAxNiBUd2l0dGVyLCBJbmMuXG4gKiBMaWNlbnNlZCB1bmRlciBNSVQgKGh0dHBzOi8vZ2l0aHViLmNvbS90d2JzL2Jvb3RzdHJhcC9ibG9iL21hc3Rlci9MSUNFTlNFKVxuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5cblxuK2Z1bmN0aW9uICgkKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICAvLyBDQVJPVVNFTCBDTEFTUyBERUZJTklUSU9OXG4gIC8vID09PT09PT09PT09PT09PT09PT09PT09PT1cblxuICB2YXIgQ2Fyb3VzZWwgPSBmdW5jdGlvbiAoZWxlbWVudCwgb3B0aW9ucykge1xuICAgIHRoaXMuJGVsZW1lbnQgICAgPSAkKGVsZW1lbnQpXG4gICAgdGhpcy4kaW5kaWNhdG9ycyA9IHRoaXMuJGVsZW1lbnQuZmluZCgnLmNhcm91c2VsLWluZGljYXRvcnMnKVxuICAgIHRoaXMub3B0aW9ucyAgICAgPSBvcHRpb25zXG4gICAgdGhpcy5wYXVzZWQgICAgICA9IG51bGxcbiAgICB0aGlzLnNsaWRpbmcgICAgID0gbnVsbFxuICAgIHRoaXMuaW50ZXJ2YWwgICAgPSBudWxsXG4gICAgdGhpcy4kYWN0aXZlICAgICA9IG51bGxcbiAgICB0aGlzLiRpdGVtcyAgICAgID0gbnVsbFxuXG4gICAgdGhpcy5vcHRpb25zLmtleWJvYXJkICYmIHRoaXMuJGVsZW1lbnQub24oJ2tleWRvd24uYnMuY2Fyb3VzZWwnLCAkLnByb3h5KHRoaXMua2V5ZG93biwgdGhpcykpXG5cbiAgICB0aGlzLm9wdGlvbnMucGF1c2UgPT0gJ2hvdmVyJyAmJiAhKCdvbnRvdWNoc3RhcnQnIGluIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCkgJiYgdGhpcy4kZWxlbWVudFxuICAgICAgLm9uKCdtb3VzZWVudGVyLmJzLmNhcm91c2VsJywgJC5wcm94eSh0aGlzLnBhdXNlLCB0aGlzKSlcbiAgICAgIC5vbignbW91c2VsZWF2ZS5icy5jYXJvdXNlbCcsICQucHJveHkodGhpcy5jeWNsZSwgdGhpcykpXG4gIH1cblxuICBDYXJvdXNlbC5WRVJTSU9OICA9ICczLjMuNydcblxuICBDYXJvdXNlbC5UUkFOU0lUSU9OX0RVUkFUSU9OID0gNjAwXG5cbiAgQ2Fyb3VzZWwuREVGQVVMVFMgPSB7XG4gICAgaW50ZXJ2YWw6IDUwMDAsXG4gICAgcGF1c2U6ICdob3ZlcicsXG4gICAgd3JhcDogdHJ1ZSxcbiAgICBrZXlib2FyZDogdHJ1ZVxuICB9XG5cbiAgQ2Fyb3VzZWwucHJvdG90eXBlLmtleWRvd24gPSBmdW5jdGlvbiAoZSkge1xuICAgIGlmICgvaW5wdXR8dGV4dGFyZWEvaS50ZXN0KGUudGFyZ2V0LnRhZ05hbWUpKSByZXR1cm5cbiAgICBzd2l0Y2ggKGUud2hpY2gpIHtcbiAgICAgIGNhc2UgMzc6IHRoaXMucHJldigpOyBicmVha1xuICAgICAgY2FzZSAzOTogdGhpcy5uZXh0KCk7IGJyZWFrXG4gICAgICBkZWZhdWx0OiByZXR1cm5cbiAgICB9XG5cbiAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgfVxuXG4gIENhcm91c2VsLnByb3RvdHlwZS5jeWNsZSA9IGZ1bmN0aW9uIChlKSB7XG4gICAgZSB8fCAodGhpcy5wYXVzZWQgPSBmYWxzZSlcblxuICAgIHRoaXMuaW50ZXJ2YWwgJiYgY2xlYXJJbnRlcnZhbCh0aGlzLmludGVydmFsKVxuXG4gICAgdGhpcy5vcHRpb25zLmludGVydmFsXG4gICAgICAmJiAhdGhpcy5wYXVzZWRcbiAgICAgICYmICh0aGlzLmludGVydmFsID0gc2V0SW50ZXJ2YWwoJC5wcm94eSh0aGlzLm5leHQsIHRoaXMpLCB0aGlzLm9wdGlvbnMuaW50ZXJ2YWwpKVxuXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIENhcm91c2VsLnByb3RvdHlwZS5nZXRJdGVtSW5kZXggPSBmdW5jdGlvbiAoaXRlbSkge1xuICAgIHRoaXMuJGl0ZW1zID0gaXRlbS5wYXJlbnQoKS5jaGlsZHJlbignLml0ZW0nKVxuICAgIHJldHVybiB0aGlzLiRpdGVtcy5pbmRleChpdGVtIHx8IHRoaXMuJGFjdGl2ZSlcbiAgfVxuXG4gIENhcm91c2VsLnByb3RvdHlwZS5nZXRJdGVtRm9yRGlyZWN0aW9uID0gZnVuY3Rpb24gKGRpcmVjdGlvbiwgYWN0aXZlKSB7XG4gICAgdmFyIGFjdGl2ZUluZGV4ID0gdGhpcy5nZXRJdGVtSW5kZXgoYWN0aXZlKVxuICAgIHZhciB3aWxsV3JhcCA9IChkaXJlY3Rpb24gPT0gJ3ByZXYnICYmIGFjdGl2ZUluZGV4ID09PSAwKVxuICAgICAgICAgICAgICAgIHx8IChkaXJlY3Rpb24gPT0gJ25leHQnICYmIGFjdGl2ZUluZGV4ID09ICh0aGlzLiRpdGVtcy5sZW5ndGggLSAxKSlcbiAgICBpZiAod2lsbFdyYXAgJiYgIXRoaXMub3B0aW9ucy53cmFwKSByZXR1cm4gYWN0aXZlXG4gICAgdmFyIGRlbHRhID0gZGlyZWN0aW9uID09ICdwcmV2JyA/IC0xIDogMVxuICAgIHZhciBpdGVtSW5kZXggPSAoYWN0aXZlSW5kZXggKyBkZWx0YSkgJSB0aGlzLiRpdGVtcy5sZW5ndGhcbiAgICByZXR1cm4gdGhpcy4kaXRlbXMuZXEoaXRlbUluZGV4KVxuICB9XG5cbiAgQ2Fyb3VzZWwucHJvdG90eXBlLnRvID0gZnVuY3Rpb24gKHBvcykge1xuICAgIHZhciB0aGF0ICAgICAgICA9IHRoaXNcbiAgICB2YXIgYWN0aXZlSW5kZXggPSB0aGlzLmdldEl0ZW1JbmRleCh0aGlzLiRhY3RpdmUgPSB0aGlzLiRlbGVtZW50LmZpbmQoJy5pdGVtLmFjdGl2ZScpKVxuXG4gICAgaWYgKHBvcyA+ICh0aGlzLiRpdGVtcy5sZW5ndGggLSAxKSB8fCBwb3MgPCAwKSByZXR1cm5cblxuICAgIGlmICh0aGlzLnNsaWRpbmcpICAgICAgIHJldHVybiB0aGlzLiRlbGVtZW50Lm9uZSgnc2xpZC5icy5jYXJvdXNlbCcsIGZ1bmN0aW9uICgpIHsgdGhhdC50byhwb3MpIH0pIC8vIHllcywgXCJzbGlkXCJcbiAgICBpZiAoYWN0aXZlSW5kZXggPT0gcG9zKSByZXR1cm4gdGhpcy5wYXVzZSgpLmN5Y2xlKClcblxuICAgIHJldHVybiB0aGlzLnNsaWRlKHBvcyA+IGFjdGl2ZUluZGV4ID8gJ25leHQnIDogJ3ByZXYnLCB0aGlzLiRpdGVtcy5lcShwb3MpKVxuICB9XG5cbiAgQ2Fyb3VzZWwucHJvdG90eXBlLnBhdXNlID0gZnVuY3Rpb24gKGUpIHtcbiAgICBlIHx8ICh0aGlzLnBhdXNlZCA9IHRydWUpXG5cbiAgICBpZiAodGhpcy4kZWxlbWVudC5maW5kKCcubmV4dCwgLnByZXYnKS5sZW5ndGggJiYgJC5zdXBwb3J0LnRyYW5zaXRpb24pIHtcbiAgICAgIHRoaXMuJGVsZW1lbnQudHJpZ2dlcigkLnN1cHBvcnQudHJhbnNpdGlvbi5lbmQpXG4gICAgICB0aGlzLmN5Y2xlKHRydWUpXG4gICAgfVxuXG4gICAgdGhpcy5pbnRlcnZhbCA9IGNsZWFySW50ZXJ2YWwodGhpcy5pbnRlcnZhbClcblxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICBDYXJvdXNlbC5wcm90b3R5cGUubmV4dCA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodGhpcy5zbGlkaW5nKSByZXR1cm5cbiAgICByZXR1cm4gdGhpcy5zbGlkZSgnbmV4dCcpXG4gIH1cblxuICBDYXJvdXNlbC5wcm90b3R5cGUucHJldiA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodGhpcy5zbGlkaW5nKSByZXR1cm5cbiAgICByZXR1cm4gdGhpcy5zbGlkZSgncHJldicpXG4gIH1cblxuICBDYXJvdXNlbC5wcm90b3R5cGUuc2xpZGUgPSBmdW5jdGlvbiAodHlwZSwgbmV4dCkge1xuICAgIHZhciAkYWN0aXZlICAgPSB0aGlzLiRlbGVtZW50LmZpbmQoJy5pdGVtLmFjdGl2ZScpXG4gICAgdmFyICRuZXh0ICAgICA9IG5leHQgfHwgdGhpcy5nZXRJdGVtRm9yRGlyZWN0aW9uKHR5cGUsICRhY3RpdmUpXG4gICAgdmFyIGlzQ3ljbGluZyA9IHRoaXMuaW50ZXJ2YWxcbiAgICB2YXIgZGlyZWN0aW9uID0gdHlwZSA9PSAnbmV4dCcgPyAnbGVmdCcgOiAncmlnaHQnXG4gICAgdmFyIHRoYXQgICAgICA9IHRoaXNcblxuICAgIGlmICgkbmV4dC5oYXNDbGFzcygnYWN0aXZlJykpIHJldHVybiAodGhpcy5zbGlkaW5nID0gZmFsc2UpXG5cbiAgICB2YXIgcmVsYXRlZFRhcmdldCA9ICRuZXh0WzBdXG4gICAgdmFyIHNsaWRlRXZlbnQgPSAkLkV2ZW50KCdzbGlkZS5icy5jYXJvdXNlbCcsIHtcbiAgICAgIHJlbGF0ZWRUYXJnZXQ6IHJlbGF0ZWRUYXJnZXQsXG4gICAgICBkaXJlY3Rpb246IGRpcmVjdGlvblxuICAgIH0pXG4gICAgdGhpcy4kZWxlbWVudC50cmlnZ2VyKHNsaWRlRXZlbnQpXG4gICAgaWYgKHNsaWRlRXZlbnQuaXNEZWZhdWx0UHJldmVudGVkKCkpIHJldHVyblxuXG4gICAgdGhpcy5zbGlkaW5nID0gdHJ1ZVxuXG4gICAgaXNDeWNsaW5nICYmIHRoaXMucGF1c2UoKVxuXG4gICAgaWYgKHRoaXMuJGluZGljYXRvcnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLiRpbmRpY2F0b3JzLmZpbmQoJy5hY3RpdmUnKS5yZW1vdmVDbGFzcygnYWN0aXZlJylcbiAgICAgIHZhciAkbmV4dEluZGljYXRvciA9ICQodGhpcy4kaW5kaWNhdG9ycy5jaGlsZHJlbigpW3RoaXMuZ2V0SXRlbUluZGV4KCRuZXh0KV0pXG4gICAgICAkbmV4dEluZGljYXRvciAmJiAkbmV4dEluZGljYXRvci5hZGRDbGFzcygnYWN0aXZlJylcbiAgICB9XG5cbiAgICB2YXIgc2xpZEV2ZW50ID0gJC5FdmVudCgnc2xpZC5icy5jYXJvdXNlbCcsIHsgcmVsYXRlZFRhcmdldDogcmVsYXRlZFRhcmdldCwgZGlyZWN0aW9uOiBkaXJlY3Rpb24gfSkgLy8geWVzLCBcInNsaWRcIlxuICAgIGlmICgkLnN1cHBvcnQudHJhbnNpdGlvbiAmJiB0aGlzLiRlbGVtZW50Lmhhc0NsYXNzKCdzbGlkZScpKSB7XG4gICAgICAkbmV4dC5hZGRDbGFzcyh0eXBlKVxuICAgICAgJG5leHRbMF0ub2Zmc2V0V2lkdGggLy8gZm9yY2UgcmVmbG93XG4gICAgICAkYWN0aXZlLmFkZENsYXNzKGRpcmVjdGlvbilcbiAgICAgICRuZXh0LmFkZENsYXNzKGRpcmVjdGlvbilcbiAgICAgICRhY3RpdmVcbiAgICAgICAgLm9uZSgnYnNUcmFuc2l0aW9uRW5kJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICRuZXh0LnJlbW92ZUNsYXNzKFt0eXBlLCBkaXJlY3Rpb25dLmpvaW4oJyAnKSkuYWRkQ2xhc3MoJ2FjdGl2ZScpXG4gICAgICAgICAgJGFjdGl2ZS5yZW1vdmVDbGFzcyhbJ2FjdGl2ZScsIGRpcmVjdGlvbl0uam9pbignICcpKVxuICAgICAgICAgIHRoYXQuc2xpZGluZyA9IGZhbHNlXG4gICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGF0LiRlbGVtZW50LnRyaWdnZXIoc2xpZEV2ZW50KVxuICAgICAgICAgIH0sIDApXG4gICAgICAgIH0pXG4gICAgICAgIC5lbXVsYXRlVHJhbnNpdGlvbkVuZChDYXJvdXNlbC5UUkFOU0lUSU9OX0RVUkFUSU9OKVxuICAgIH0gZWxzZSB7XG4gICAgICAkYWN0aXZlLnJlbW92ZUNsYXNzKCdhY3RpdmUnKVxuICAgICAgJG5leHQuYWRkQ2xhc3MoJ2FjdGl2ZScpXG4gICAgICB0aGlzLnNsaWRpbmcgPSBmYWxzZVxuICAgICAgdGhpcy4kZWxlbWVudC50cmlnZ2VyKHNsaWRFdmVudClcbiAgICB9XG5cbiAgICBpc0N5Y2xpbmcgJiYgdGhpcy5jeWNsZSgpXG5cbiAgICByZXR1cm4gdGhpc1xuICB9XG5cblxuICAvLyBDQVJPVVNFTCBQTFVHSU4gREVGSU5JVElPTlxuICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4gIGZ1bmN0aW9uIFBsdWdpbihvcHRpb24pIHtcbiAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciAkdGhpcyAgID0gJCh0aGlzKVxuICAgICAgdmFyIGRhdGEgICAgPSAkdGhpcy5kYXRhKCdicy5jYXJvdXNlbCcpXG4gICAgICB2YXIgb3B0aW9ucyA9ICQuZXh0ZW5kKHt9LCBDYXJvdXNlbC5ERUZBVUxUUywgJHRoaXMuZGF0YSgpLCB0eXBlb2Ygb3B0aW9uID09ICdvYmplY3QnICYmIG9wdGlvbilcbiAgICAgIHZhciBhY3Rpb24gID0gdHlwZW9mIG9wdGlvbiA9PSAnc3RyaW5nJyA/IG9wdGlvbiA6IG9wdGlvbnMuc2xpZGVcblxuICAgICAgaWYgKCFkYXRhKSAkdGhpcy5kYXRhKCdicy5jYXJvdXNlbCcsIChkYXRhID0gbmV3IENhcm91c2VsKHRoaXMsIG9wdGlvbnMpKSlcbiAgICAgIGlmICh0eXBlb2Ygb3B0aW9uID09ICdudW1iZXInKSBkYXRhLnRvKG9wdGlvbilcbiAgICAgIGVsc2UgaWYgKGFjdGlvbikgZGF0YVthY3Rpb25dKClcbiAgICAgIGVsc2UgaWYgKG9wdGlvbnMuaW50ZXJ2YWwpIGRhdGEucGF1c2UoKS5jeWNsZSgpXG4gICAgfSlcbiAgfVxuXG4gIHZhciBvbGQgPSAkLmZuLmNhcm91c2VsXG5cbiAgJC5mbi5jYXJvdXNlbCAgICAgICAgICAgICA9IFBsdWdpblxuICAkLmZuLmNhcm91c2VsLkNvbnN0cnVjdG9yID0gQ2Fyb3VzZWxcblxuXG4gIC8vIENBUk9VU0VMIE5PIENPTkZMSUNUXG4gIC8vID09PT09PT09PT09PT09PT09PT09XG5cbiAgJC5mbi5jYXJvdXNlbC5ub0NvbmZsaWN0ID0gZnVuY3Rpb24gKCkge1xuICAgICQuZm4uY2Fyb3VzZWwgPSBvbGRcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cblxuICAvLyBDQVJPVVNFTCBEQVRBLUFQSVxuICAvLyA9PT09PT09PT09PT09PT09PVxuXG4gIHZhciBjbGlja0hhbmRsZXIgPSBmdW5jdGlvbiAoZSkge1xuICAgIHZhciBocmVmXG4gICAgdmFyICR0aGlzICAgPSAkKHRoaXMpXG4gICAgdmFyICR0YXJnZXQgPSAkKCR0aGlzLmF0dHIoJ2RhdGEtdGFyZ2V0JykgfHwgKGhyZWYgPSAkdGhpcy5hdHRyKCdocmVmJykpICYmIGhyZWYucmVwbGFjZSgvLiooPz0jW15cXHNdKyQpLywgJycpKSAvLyBzdHJpcCBmb3IgaWU3XG4gICAgaWYgKCEkdGFyZ2V0Lmhhc0NsYXNzKCdjYXJvdXNlbCcpKSByZXR1cm5cbiAgICB2YXIgb3B0aW9ucyA9ICQuZXh0ZW5kKHt9LCAkdGFyZ2V0LmRhdGEoKSwgJHRoaXMuZGF0YSgpKVxuICAgIHZhciBzbGlkZUluZGV4ID0gJHRoaXMuYXR0cignZGF0YS1zbGlkZS10bycpXG4gICAgaWYgKHNsaWRlSW5kZXgpIG9wdGlvbnMuaW50ZXJ2YWwgPSBmYWxzZVxuXG4gICAgUGx1Z2luLmNhbGwoJHRhcmdldCwgb3B0aW9ucylcblxuICAgIGlmIChzbGlkZUluZGV4KSB7XG4gICAgICAkdGFyZ2V0LmRhdGEoJ2JzLmNhcm91c2VsJykudG8oc2xpZGVJbmRleClcbiAgICB9XG5cbiAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgfVxuXG4gICQoZG9jdW1lbnQpXG4gICAgLm9uKCdjbGljay5icy5jYXJvdXNlbC5kYXRhLWFwaScsICdbZGF0YS1zbGlkZV0nLCBjbGlja0hhbmRsZXIpXG4gICAgLm9uKCdjbGljay5icy5jYXJvdXNlbC5kYXRhLWFwaScsICdbZGF0YS1zbGlkZS10b10nLCBjbGlja0hhbmRsZXIpXG5cbiAgJCh3aW5kb3cpLm9uKCdsb2FkJywgZnVuY3Rpb24gKCkge1xuICAgICQoJ1tkYXRhLXJpZGU9XCJjYXJvdXNlbFwiXScpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgdmFyICRjYXJvdXNlbCA9ICQodGhpcylcbiAgICAgIFBsdWdpbi5jYWxsKCRjYXJvdXNlbCwgJGNhcm91c2VsLmRhdGEoKSlcbiAgICB9KVxuICB9KVxuXG59KGpRdWVyeSk7XG5cbi8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICogQm9vdHN0cmFwOiBjb2xsYXBzZS5qcyB2My4zLjdcbiAqIGh0dHA6Ly9nZXRib290c3RyYXAuY29tL2phdmFzY3JpcHQvI2NvbGxhcHNlXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqIENvcHlyaWdodCAyMDExLTIwMTYgVHdpdHRlciwgSW5jLlxuICogTGljZW5zZWQgdW5kZXIgTUlUIChodHRwczovL2dpdGh1Yi5jb20vdHdicy9ib290c3RyYXAvYmxvYi9tYXN0ZXIvTElDRU5TRSlcbiAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXG4vKiBqc2hpbnQgbGF0ZWRlZjogZmFsc2UgKi9cblxuK2Z1bmN0aW9uICgkKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICAvLyBDT0xMQVBTRSBQVUJMSUMgQ0xBU1MgREVGSU5JVElPTlxuICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4gIHZhciBDb2xsYXBzZSA9IGZ1bmN0aW9uIChlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgdGhpcy4kZWxlbWVudCAgICAgID0gJChlbGVtZW50KVxuICAgIHRoaXMub3B0aW9ucyAgICAgICA9ICQuZXh0ZW5kKHt9LCBDb2xsYXBzZS5ERUZBVUxUUywgb3B0aW9ucylcbiAgICB0aGlzLiR0cmlnZ2VyICAgICAgPSAkKCdbZGF0YS10b2dnbGU9XCJjb2xsYXBzZVwiXVtocmVmPVwiIycgKyBlbGVtZW50LmlkICsgJ1wiXSwnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICdbZGF0YS10b2dnbGU9XCJjb2xsYXBzZVwiXVtkYXRhLXRhcmdldD1cIiMnICsgZWxlbWVudC5pZCArICdcIl0nKVxuICAgIHRoaXMudHJhbnNpdGlvbmluZyA9IG51bGxcblxuICAgIGlmICh0aGlzLm9wdGlvbnMucGFyZW50KSB7XG4gICAgICB0aGlzLiRwYXJlbnQgPSB0aGlzLmdldFBhcmVudCgpXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYWRkQXJpYUFuZENvbGxhcHNlZENsYXNzKHRoaXMuJGVsZW1lbnQsIHRoaXMuJHRyaWdnZXIpXG4gICAgfVxuXG4gICAgaWYgKHRoaXMub3B0aW9ucy50b2dnbGUpIHRoaXMudG9nZ2xlKClcbiAgfVxuXG4gIENvbGxhcHNlLlZFUlNJT04gID0gJzMuMy43J1xuXG4gIENvbGxhcHNlLlRSQU5TSVRJT05fRFVSQVRJT04gPSAzNTBcblxuICBDb2xsYXBzZS5ERUZBVUxUUyA9IHtcbiAgICB0b2dnbGU6IHRydWVcbiAgfVxuXG4gIENvbGxhcHNlLnByb3RvdHlwZS5kaW1lbnNpb24gPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGhhc1dpZHRoID0gdGhpcy4kZWxlbWVudC5oYXNDbGFzcygnd2lkdGgnKVxuICAgIHJldHVybiBoYXNXaWR0aCA/ICd3aWR0aCcgOiAnaGVpZ2h0J1xuICB9XG5cbiAgQ29sbGFwc2UucHJvdG90eXBlLnNob3cgPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHRoaXMudHJhbnNpdGlvbmluZyB8fCB0aGlzLiRlbGVtZW50Lmhhc0NsYXNzKCdpbicpKSByZXR1cm5cblxuICAgIHZhciBhY3RpdmVzRGF0YVxuICAgIHZhciBhY3RpdmVzID0gdGhpcy4kcGFyZW50ICYmIHRoaXMuJHBhcmVudC5jaGlsZHJlbignLnBhbmVsJykuY2hpbGRyZW4oJy5pbiwgLmNvbGxhcHNpbmcnKVxuXG4gICAgaWYgKGFjdGl2ZXMgJiYgYWN0aXZlcy5sZW5ndGgpIHtcbiAgICAgIGFjdGl2ZXNEYXRhID0gYWN0aXZlcy5kYXRhKCdicy5jb2xsYXBzZScpXG4gICAgICBpZiAoYWN0aXZlc0RhdGEgJiYgYWN0aXZlc0RhdGEudHJhbnNpdGlvbmluZykgcmV0dXJuXG4gICAgfVxuXG4gICAgdmFyIHN0YXJ0RXZlbnQgPSAkLkV2ZW50KCdzaG93LmJzLmNvbGxhcHNlJylcbiAgICB0aGlzLiRlbGVtZW50LnRyaWdnZXIoc3RhcnRFdmVudClcbiAgICBpZiAoc3RhcnRFdmVudC5pc0RlZmF1bHRQcmV2ZW50ZWQoKSkgcmV0dXJuXG5cbiAgICBpZiAoYWN0aXZlcyAmJiBhY3RpdmVzLmxlbmd0aCkge1xuICAgICAgUGx1Z2luLmNhbGwoYWN0aXZlcywgJ2hpZGUnKVxuICAgICAgYWN0aXZlc0RhdGEgfHwgYWN0aXZlcy5kYXRhKCdicy5jb2xsYXBzZScsIG51bGwpXG4gICAgfVxuXG4gICAgdmFyIGRpbWVuc2lvbiA9IHRoaXMuZGltZW5zaW9uKClcblxuICAgIHRoaXMuJGVsZW1lbnRcbiAgICAgIC5yZW1vdmVDbGFzcygnY29sbGFwc2UnKVxuICAgICAgLmFkZENsYXNzKCdjb2xsYXBzaW5nJylbZGltZW5zaW9uXSgwKVxuICAgICAgLmF0dHIoJ2FyaWEtZXhwYW5kZWQnLCB0cnVlKVxuXG4gICAgdGhpcy4kdHJpZ2dlclxuICAgICAgLnJlbW92ZUNsYXNzKCdjb2xsYXBzZWQnKVxuICAgICAgLmF0dHIoJ2FyaWEtZXhwYW5kZWQnLCB0cnVlKVxuXG4gICAgdGhpcy50cmFuc2l0aW9uaW5nID0gMVxuXG4gICAgdmFyIGNvbXBsZXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgdGhpcy4kZWxlbWVudFxuICAgICAgICAucmVtb3ZlQ2xhc3MoJ2NvbGxhcHNpbmcnKVxuICAgICAgICAuYWRkQ2xhc3MoJ2NvbGxhcHNlIGluJylbZGltZW5zaW9uXSgnJylcbiAgICAgIHRoaXMudHJhbnNpdGlvbmluZyA9IDBcbiAgICAgIHRoaXMuJGVsZW1lbnRcbiAgICAgICAgLnRyaWdnZXIoJ3Nob3duLmJzLmNvbGxhcHNlJylcbiAgICB9XG5cbiAgICBpZiAoISQuc3VwcG9ydC50cmFuc2l0aW9uKSByZXR1cm4gY29tcGxldGUuY2FsbCh0aGlzKVxuXG4gICAgdmFyIHNjcm9sbFNpemUgPSAkLmNhbWVsQ2FzZShbJ3Njcm9sbCcsIGRpbWVuc2lvbl0uam9pbignLScpKVxuXG4gICAgdGhpcy4kZWxlbWVudFxuICAgICAgLm9uZSgnYnNUcmFuc2l0aW9uRW5kJywgJC5wcm94eShjb21wbGV0ZSwgdGhpcykpXG4gICAgICAuZW11bGF0ZVRyYW5zaXRpb25FbmQoQ29sbGFwc2UuVFJBTlNJVElPTl9EVVJBVElPTilbZGltZW5zaW9uXSh0aGlzLiRlbGVtZW50WzBdW3Njcm9sbFNpemVdKVxuICB9XG5cbiAgQ29sbGFwc2UucHJvdG90eXBlLmhpZGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHRoaXMudHJhbnNpdGlvbmluZyB8fCAhdGhpcy4kZWxlbWVudC5oYXNDbGFzcygnaW4nKSkgcmV0dXJuXG5cbiAgICB2YXIgc3RhcnRFdmVudCA9ICQuRXZlbnQoJ2hpZGUuYnMuY29sbGFwc2UnKVxuICAgIHRoaXMuJGVsZW1lbnQudHJpZ2dlcihzdGFydEV2ZW50KVxuICAgIGlmIChzdGFydEV2ZW50LmlzRGVmYXVsdFByZXZlbnRlZCgpKSByZXR1cm5cblxuICAgIHZhciBkaW1lbnNpb24gPSB0aGlzLmRpbWVuc2lvbigpXG5cbiAgICB0aGlzLiRlbGVtZW50W2RpbWVuc2lvbl0odGhpcy4kZWxlbWVudFtkaW1lbnNpb25dKCkpWzBdLm9mZnNldEhlaWdodFxuXG4gICAgdGhpcy4kZWxlbWVudFxuICAgICAgLmFkZENsYXNzKCdjb2xsYXBzaW5nJylcbiAgICAgIC5yZW1vdmVDbGFzcygnY29sbGFwc2UgaW4nKVxuICAgICAgLmF0dHIoJ2FyaWEtZXhwYW5kZWQnLCBmYWxzZSlcblxuICAgIHRoaXMuJHRyaWdnZXJcbiAgICAgIC5hZGRDbGFzcygnY29sbGFwc2VkJylcbiAgICAgIC5hdHRyKCdhcmlhLWV4cGFuZGVkJywgZmFsc2UpXG5cbiAgICB0aGlzLnRyYW5zaXRpb25pbmcgPSAxXG5cbiAgICB2YXIgY29tcGxldGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICB0aGlzLnRyYW5zaXRpb25pbmcgPSAwXG4gICAgICB0aGlzLiRlbGVtZW50XG4gICAgICAgIC5yZW1vdmVDbGFzcygnY29sbGFwc2luZycpXG4gICAgICAgIC5hZGRDbGFzcygnY29sbGFwc2UnKVxuICAgICAgICAudHJpZ2dlcignaGlkZGVuLmJzLmNvbGxhcHNlJylcbiAgICB9XG5cbiAgICBpZiAoISQuc3VwcG9ydC50cmFuc2l0aW9uKSByZXR1cm4gY29tcGxldGUuY2FsbCh0aGlzKVxuXG4gICAgdGhpcy4kZWxlbWVudFxuICAgICAgW2RpbWVuc2lvbl0oMClcbiAgICAgIC5vbmUoJ2JzVHJhbnNpdGlvbkVuZCcsICQucHJveHkoY29tcGxldGUsIHRoaXMpKVxuICAgICAgLmVtdWxhdGVUcmFuc2l0aW9uRW5kKENvbGxhcHNlLlRSQU5TSVRJT05fRFVSQVRJT04pXG4gIH1cblxuICBDb2xsYXBzZS5wcm90b3R5cGUudG9nZ2xlID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXNbdGhpcy4kZWxlbWVudC5oYXNDbGFzcygnaW4nKSA/ICdoaWRlJyA6ICdzaG93J10oKVxuICB9XG5cbiAgQ29sbGFwc2UucHJvdG90eXBlLmdldFBhcmVudCA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gJCh0aGlzLm9wdGlvbnMucGFyZW50KVxuICAgICAgLmZpbmQoJ1tkYXRhLXRvZ2dsZT1cImNvbGxhcHNlXCJdW2RhdGEtcGFyZW50PVwiJyArIHRoaXMub3B0aW9ucy5wYXJlbnQgKyAnXCJdJylcbiAgICAgIC5lYWNoKCQucHJveHkoZnVuY3Rpb24gKGksIGVsZW1lbnQpIHtcbiAgICAgICAgdmFyICRlbGVtZW50ID0gJChlbGVtZW50KVxuICAgICAgICB0aGlzLmFkZEFyaWFBbmRDb2xsYXBzZWRDbGFzcyhnZXRUYXJnZXRGcm9tVHJpZ2dlcigkZWxlbWVudCksICRlbGVtZW50KVxuICAgICAgfSwgdGhpcykpXG4gICAgICAuZW5kKClcbiAgfVxuXG4gIENvbGxhcHNlLnByb3RvdHlwZS5hZGRBcmlhQW5kQ29sbGFwc2VkQ2xhc3MgPSBmdW5jdGlvbiAoJGVsZW1lbnQsICR0cmlnZ2VyKSB7XG4gICAgdmFyIGlzT3BlbiA9ICRlbGVtZW50Lmhhc0NsYXNzKCdpbicpXG5cbiAgICAkZWxlbWVudC5hdHRyKCdhcmlhLWV4cGFuZGVkJywgaXNPcGVuKVxuICAgICR0cmlnZ2VyXG4gICAgICAudG9nZ2xlQ2xhc3MoJ2NvbGxhcHNlZCcsICFpc09wZW4pXG4gICAgICAuYXR0cignYXJpYS1leHBhbmRlZCcsIGlzT3BlbilcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldFRhcmdldEZyb21UcmlnZ2VyKCR0cmlnZ2VyKSB7XG4gICAgdmFyIGhyZWZcbiAgICB2YXIgdGFyZ2V0ID0gJHRyaWdnZXIuYXR0cignZGF0YS10YXJnZXQnKVxuICAgICAgfHwgKGhyZWYgPSAkdHJpZ2dlci5hdHRyKCdocmVmJykpICYmIGhyZWYucmVwbGFjZSgvLiooPz0jW15cXHNdKyQpLywgJycpIC8vIHN0cmlwIGZvciBpZTdcblxuICAgIHJldHVybiAkKHRhcmdldClcbiAgfVxuXG5cbiAgLy8gQ09MTEFQU0UgUExVR0lOIERFRklOSVRJT05cbiAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuICBmdW5jdGlvbiBQbHVnaW4ob3B0aW9uKSB7XG4gICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgJHRoaXMgICA9ICQodGhpcylcbiAgICAgIHZhciBkYXRhICAgID0gJHRoaXMuZGF0YSgnYnMuY29sbGFwc2UnKVxuICAgICAgdmFyIG9wdGlvbnMgPSAkLmV4dGVuZCh7fSwgQ29sbGFwc2UuREVGQVVMVFMsICR0aGlzLmRhdGEoKSwgdHlwZW9mIG9wdGlvbiA9PSAnb2JqZWN0JyAmJiBvcHRpb24pXG5cbiAgICAgIGlmICghZGF0YSAmJiBvcHRpb25zLnRvZ2dsZSAmJiAvc2hvd3xoaWRlLy50ZXN0KG9wdGlvbikpIG9wdGlvbnMudG9nZ2xlID0gZmFsc2VcbiAgICAgIGlmICghZGF0YSkgJHRoaXMuZGF0YSgnYnMuY29sbGFwc2UnLCAoZGF0YSA9IG5ldyBDb2xsYXBzZSh0aGlzLCBvcHRpb25zKSkpXG4gICAgICBpZiAodHlwZW9mIG9wdGlvbiA9PSAnc3RyaW5nJykgZGF0YVtvcHRpb25dKClcbiAgICB9KVxuICB9XG5cbiAgdmFyIG9sZCA9ICQuZm4uY29sbGFwc2VcblxuICAkLmZuLmNvbGxhcHNlICAgICAgICAgICAgID0gUGx1Z2luXG4gICQuZm4uY29sbGFwc2UuQ29uc3RydWN0b3IgPSBDb2xsYXBzZVxuXG5cbiAgLy8gQ09MTEFQU0UgTk8gQ09ORkxJQ1RcbiAgLy8gPT09PT09PT09PT09PT09PT09PT1cblxuICAkLmZuLmNvbGxhcHNlLm5vQ29uZmxpY3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgJC5mbi5jb2xsYXBzZSA9IG9sZFxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuXG4gIC8vIENPTExBUFNFIERBVEEtQVBJXG4gIC8vID09PT09PT09PT09PT09PT09XG5cbiAgJChkb2N1bWVudCkub24oJ2NsaWNrLmJzLmNvbGxhcHNlLmRhdGEtYXBpJywgJ1tkYXRhLXRvZ2dsZT1cImNvbGxhcHNlXCJdJywgZnVuY3Rpb24gKGUpIHtcbiAgICB2YXIgJHRoaXMgICA9ICQodGhpcylcblxuICAgIGlmICghJHRoaXMuYXR0cignZGF0YS10YXJnZXQnKSkgZS5wcmV2ZW50RGVmYXVsdCgpXG5cbiAgICB2YXIgJHRhcmdldCA9IGdldFRhcmdldEZyb21UcmlnZ2VyKCR0aGlzKVxuICAgIHZhciBkYXRhICAgID0gJHRhcmdldC5kYXRhKCdicy5jb2xsYXBzZScpXG4gICAgdmFyIG9wdGlvbiAgPSBkYXRhID8gJ3RvZ2dsZScgOiAkdGhpcy5kYXRhKClcblxuICAgIFBsdWdpbi5jYWxsKCR0YXJnZXQsIG9wdGlvbilcbiAgfSlcblxufShqUXVlcnkpO1xuXG4vKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqIEJvb3RzdHJhcDogZHJvcGRvd24uanMgdjMuMy43XG4gKiBodHRwOi8vZ2V0Ym9vdHN0cmFwLmNvbS9qYXZhc2NyaXB0LyNkcm9wZG93bnNcbiAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICogQ29weXJpZ2h0IDIwMTEtMjAxNiBUd2l0dGVyLCBJbmMuXG4gKiBMaWNlbnNlZCB1bmRlciBNSVQgKGh0dHBzOi8vZ2l0aHViLmNvbS90d2JzL2Jvb3RzdHJhcC9ibG9iL21hc3Rlci9MSUNFTlNFKVxuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5cblxuK2Z1bmN0aW9uICgkKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICAvLyBEUk9QRE9XTiBDTEFTUyBERUZJTklUSU9OXG4gIC8vID09PT09PT09PT09PT09PT09PT09PT09PT1cblxuICB2YXIgYmFja2Ryb3AgPSAnLmRyb3Bkb3duLWJhY2tkcm9wJ1xuICB2YXIgdG9nZ2xlICAgPSAnW2RhdGEtdG9nZ2xlPVwiZHJvcGRvd25cIl0nXG4gIHZhciBEcm9wZG93biA9IGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgJChlbGVtZW50KS5vbignY2xpY2suYnMuZHJvcGRvd24nLCB0aGlzLnRvZ2dsZSlcbiAgfVxuXG4gIERyb3Bkb3duLlZFUlNJT04gPSAnMy4zLjcnXG5cbiAgZnVuY3Rpb24gZ2V0UGFyZW50KCR0aGlzKSB7XG4gICAgdmFyIHNlbGVjdG9yID0gJHRoaXMuYXR0cignZGF0YS10YXJnZXQnKVxuXG4gICAgaWYgKCFzZWxlY3Rvcikge1xuICAgICAgc2VsZWN0b3IgPSAkdGhpcy5hdHRyKCdocmVmJylcbiAgICAgIHNlbGVjdG9yID0gc2VsZWN0b3IgJiYgLyNbQS1aYS16XS8udGVzdChzZWxlY3RvcikgJiYgc2VsZWN0b3IucmVwbGFjZSgvLiooPz0jW15cXHNdKiQpLywgJycpIC8vIHN0cmlwIGZvciBpZTdcbiAgICB9XG5cbiAgICB2YXIgJHBhcmVudCA9IHNlbGVjdG9yICYmICQoc2VsZWN0b3IpXG5cbiAgICByZXR1cm4gJHBhcmVudCAmJiAkcGFyZW50Lmxlbmd0aCA/ICRwYXJlbnQgOiAkdGhpcy5wYXJlbnQoKVxuICB9XG5cbiAgZnVuY3Rpb24gY2xlYXJNZW51cyhlKSB7XG4gICAgaWYgKGUgJiYgZS53aGljaCA9PT0gMykgcmV0dXJuXG4gICAgJChiYWNrZHJvcCkucmVtb3ZlKClcbiAgICAkKHRvZ2dsZSkuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgJHRoaXMgICAgICAgICA9ICQodGhpcylcbiAgICAgIHZhciAkcGFyZW50ICAgICAgID0gZ2V0UGFyZW50KCR0aGlzKVxuICAgICAgdmFyIHJlbGF0ZWRUYXJnZXQgPSB7IHJlbGF0ZWRUYXJnZXQ6IHRoaXMgfVxuXG4gICAgICBpZiAoISRwYXJlbnQuaGFzQ2xhc3MoJ29wZW4nKSkgcmV0dXJuXG5cbiAgICAgIGlmIChlICYmIGUudHlwZSA9PSAnY2xpY2snICYmIC9pbnB1dHx0ZXh0YXJlYS9pLnRlc3QoZS50YXJnZXQudGFnTmFtZSkgJiYgJC5jb250YWlucygkcGFyZW50WzBdLCBlLnRhcmdldCkpIHJldHVyblxuXG4gICAgICAkcGFyZW50LnRyaWdnZXIoZSA9ICQuRXZlbnQoJ2hpZGUuYnMuZHJvcGRvd24nLCByZWxhdGVkVGFyZ2V0KSlcblxuICAgICAgaWYgKGUuaXNEZWZhdWx0UHJldmVudGVkKCkpIHJldHVyblxuXG4gICAgICAkdGhpcy5hdHRyKCdhcmlhLWV4cGFuZGVkJywgJ2ZhbHNlJylcbiAgICAgICRwYXJlbnQucmVtb3ZlQ2xhc3MoJ29wZW4nKS50cmlnZ2VyKCQuRXZlbnQoJ2hpZGRlbi5icy5kcm9wZG93bicsIHJlbGF0ZWRUYXJnZXQpKVxuICAgIH0pXG4gIH1cblxuICBEcm9wZG93bi5wcm90b3R5cGUudG9nZ2xlID0gZnVuY3Rpb24gKGUpIHtcbiAgICB2YXIgJHRoaXMgPSAkKHRoaXMpXG5cbiAgICBpZiAoJHRoaXMuaXMoJy5kaXNhYmxlZCwgOmRpc2FibGVkJykpIHJldHVyblxuXG4gICAgdmFyICRwYXJlbnQgID0gZ2V0UGFyZW50KCR0aGlzKVxuICAgIHZhciBpc0FjdGl2ZSA9ICRwYXJlbnQuaGFzQ2xhc3MoJ29wZW4nKVxuXG4gICAgY2xlYXJNZW51cygpXG5cbiAgICBpZiAoIWlzQWN0aXZlKSB7XG4gICAgICBpZiAoJ29udG91Y2hzdGFydCcgaW4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50ICYmICEkcGFyZW50LmNsb3Nlc3QoJy5uYXZiYXItbmF2JykubGVuZ3RoKSB7XG4gICAgICAgIC8vIGlmIG1vYmlsZSB3ZSB1c2UgYSBiYWNrZHJvcCBiZWNhdXNlIGNsaWNrIGV2ZW50cyBkb24ndCBkZWxlZ2F0ZVxuICAgICAgICAkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpKVxuICAgICAgICAgIC5hZGRDbGFzcygnZHJvcGRvd24tYmFja2Ryb3AnKVxuICAgICAgICAgIC5pbnNlcnRBZnRlcigkKHRoaXMpKVxuICAgICAgICAgIC5vbignY2xpY2snLCBjbGVhck1lbnVzKVxuICAgICAgfVxuXG4gICAgICB2YXIgcmVsYXRlZFRhcmdldCA9IHsgcmVsYXRlZFRhcmdldDogdGhpcyB9XG4gICAgICAkcGFyZW50LnRyaWdnZXIoZSA9ICQuRXZlbnQoJ3Nob3cuYnMuZHJvcGRvd24nLCByZWxhdGVkVGFyZ2V0KSlcblxuICAgICAgaWYgKGUuaXNEZWZhdWx0UHJldmVudGVkKCkpIHJldHVyblxuXG4gICAgICAkdGhpc1xuICAgICAgICAudHJpZ2dlcignZm9jdXMnKVxuICAgICAgICAuYXR0cignYXJpYS1leHBhbmRlZCcsICd0cnVlJylcblxuICAgICAgJHBhcmVudFxuICAgICAgICAudG9nZ2xlQ2xhc3MoJ29wZW4nKVxuICAgICAgICAudHJpZ2dlcigkLkV2ZW50KCdzaG93bi5icy5kcm9wZG93bicsIHJlbGF0ZWRUYXJnZXQpKVxuICAgIH1cblxuICAgIHJldHVybiBmYWxzZVxuICB9XG5cbiAgRHJvcGRvd24ucHJvdG90eXBlLmtleWRvd24gPSBmdW5jdGlvbiAoZSkge1xuICAgIGlmICghLygzOHw0MHwyN3wzMikvLnRlc3QoZS53aGljaCkgfHwgL2lucHV0fHRleHRhcmVhL2kudGVzdChlLnRhcmdldC50YWdOYW1lKSkgcmV0dXJuXG5cbiAgICB2YXIgJHRoaXMgPSAkKHRoaXMpXG5cbiAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpXG5cbiAgICBpZiAoJHRoaXMuaXMoJy5kaXNhYmxlZCwgOmRpc2FibGVkJykpIHJldHVyblxuXG4gICAgdmFyICRwYXJlbnQgID0gZ2V0UGFyZW50KCR0aGlzKVxuICAgIHZhciBpc0FjdGl2ZSA9ICRwYXJlbnQuaGFzQ2xhc3MoJ29wZW4nKVxuXG4gICAgaWYgKCFpc0FjdGl2ZSAmJiBlLndoaWNoICE9IDI3IHx8IGlzQWN0aXZlICYmIGUud2hpY2ggPT0gMjcpIHtcbiAgICAgIGlmIChlLndoaWNoID09IDI3KSAkcGFyZW50LmZpbmQodG9nZ2xlKS50cmlnZ2VyKCdmb2N1cycpXG4gICAgICByZXR1cm4gJHRoaXMudHJpZ2dlcignY2xpY2snKVxuICAgIH1cblxuICAgIHZhciBkZXNjID0gJyBsaTpub3QoLmRpc2FibGVkKTp2aXNpYmxlIGEnXG4gICAgdmFyICRpdGVtcyA9ICRwYXJlbnQuZmluZCgnLmRyb3Bkb3duLW1lbnUnICsgZGVzYylcblxuICAgIGlmICghJGl0ZW1zLmxlbmd0aCkgcmV0dXJuXG5cbiAgICB2YXIgaW5kZXggPSAkaXRlbXMuaW5kZXgoZS50YXJnZXQpXG5cbiAgICBpZiAoZS53aGljaCA9PSAzOCAmJiBpbmRleCA+IDApICAgICAgICAgICAgICAgICBpbmRleC0tICAgICAgICAgLy8gdXBcbiAgICBpZiAoZS53aGljaCA9PSA0MCAmJiBpbmRleCA8ICRpdGVtcy5sZW5ndGggLSAxKSBpbmRleCsrICAgICAgICAgLy8gZG93blxuICAgIGlmICghfmluZGV4KSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4ID0gMFxuXG4gICAgJGl0ZW1zLmVxKGluZGV4KS50cmlnZ2VyKCdmb2N1cycpXG4gIH1cblxuXG4gIC8vIERST1BET1dOIFBMVUdJTiBERUZJTklUSU9OXG4gIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbiAgZnVuY3Rpb24gUGx1Z2luKG9wdGlvbikge1xuICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgdmFyICR0aGlzID0gJCh0aGlzKVxuICAgICAgdmFyIGRhdGEgID0gJHRoaXMuZGF0YSgnYnMuZHJvcGRvd24nKVxuXG4gICAgICBpZiAoIWRhdGEpICR0aGlzLmRhdGEoJ2JzLmRyb3Bkb3duJywgKGRhdGEgPSBuZXcgRHJvcGRvd24odGhpcykpKVxuICAgICAgaWYgKHR5cGVvZiBvcHRpb24gPT0gJ3N0cmluZycpIGRhdGFbb3B0aW9uXS5jYWxsKCR0aGlzKVxuICAgIH0pXG4gIH1cblxuICB2YXIgb2xkID0gJC5mbi5kcm9wZG93blxuXG4gICQuZm4uZHJvcGRvd24gICAgICAgICAgICAgPSBQbHVnaW5cbiAgJC5mbi5kcm9wZG93bi5Db25zdHJ1Y3RvciA9IERyb3Bkb3duXG5cblxuICAvLyBEUk9QRE9XTiBOTyBDT05GTElDVFxuICAvLyA9PT09PT09PT09PT09PT09PT09PVxuXG4gICQuZm4uZHJvcGRvd24ubm9Db25mbGljdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAkLmZuLmRyb3Bkb3duID0gb2xkXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG5cbiAgLy8gQVBQTFkgVE8gU1RBTkRBUkQgRFJPUERPV04gRUxFTUVOVFNcbiAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuICAkKGRvY3VtZW50KVxuICAgIC5vbignY2xpY2suYnMuZHJvcGRvd24uZGF0YS1hcGknLCBjbGVhck1lbnVzKVxuICAgIC5vbignY2xpY2suYnMuZHJvcGRvd24uZGF0YS1hcGknLCAnLmRyb3Bkb3duIGZvcm0nLCBmdW5jdGlvbiAoZSkgeyBlLnN0b3BQcm9wYWdhdGlvbigpIH0pXG4gICAgLm9uKCdjbGljay5icy5kcm9wZG93bi5kYXRhLWFwaScsIHRvZ2dsZSwgRHJvcGRvd24ucHJvdG90eXBlLnRvZ2dsZSlcbiAgICAub24oJ2tleWRvd24uYnMuZHJvcGRvd24uZGF0YS1hcGknLCB0b2dnbGUsIERyb3Bkb3duLnByb3RvdHlwZS5rZXlkb3duKVxuICAgIC5vbigna2V5ZG93bi5icy5kcm9wZG93bi5kYXRhLWFwaScsICcuZHJvcGRvd24tbWVudScsIERyb3Bkb3duLnByb3RvdHlwZS5rZXlkb3duKVxuXG59KGpRdWVyeSk7XG5cbi8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICogQm9vdHN0cmFwOiBtb2RhbC5qcyB2My4zLjdcbiAqIGh0dHA6Ly9nZXRib290c3RyYXAuY29tL2phdmFzY3JpcHQvI21vZGFsc1xuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKiBDb3B5cmlnaHQgMjAxMS0yMDE2IFR3aXR0ZXIsIEluYy5cbiAqIExpY2Vuc2VkIHVuZGVyIE1JVCAoaHR0cHM6Ly9naXRodWIuY29tL3R3YnMvYm9vdHN0cmFwL2Jsb2IvbWFzdGVyL0xJQ0VOU0UpXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuXG4rZnVuY3Rpb24gKCQpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIC8vIE1PREFMIENMQVNTIERFRklOSVRJT05cbiAgLy8gPT09PT09PT09PT09PT09PT09PT09PVxuXG4gIHZhciBNb2RhbCA9IGZ1bmN0aW9uIChlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgdGhpcy5vcHRpb25zICAgICAgICAgICAgID0gb3B0aW9uc1xuICAgIHRoaXMuJGJvZHkgICAgICAgICAgICAgICA9ICQoZG9jdW1lbnQuYm9keSlcbiAgICB0aGlzLiRlbGVtZW50ICAgICAgICAgICAgPSAkKGVsZW1lbnQpXG4gICAgdGhpcy4kZGlhbG9nICAgICAgICAgICAgID0gdGhpcy4kZWxlbWVudC5maW5kKCcubW9kYWwtZGlhbG9nJylcbiAgICB0aGlzLiRiYWNrZHJvcCAgICAgICAgICAgPSBudWxsXG4gICAgdGhpcy5pc1Nob3duICAgICAgICAgICAgID0gbnVsbFxuICAgIHRoaXMub3JpZ2luYWxCb2R5UGFkICAgICA9IG51bGxcbiAgICB0aGlzLnNjcm9sbGJhcldpZHRoICAgICAgPSAwXG4gICAgdGhpcy5pZ25vcmVCYWNrZHJvcENsaWNrID0gZmFsc2VcblxuICAgIGlmICh0aGlzLm9wdGlvbnMucmVtb3RlKSB7XG4gICAgICB0aGlzLiRlbGVtZW50XG4gICAgICAgIC5maW5kKCcubW9kYWwtY29udGVudCcpXG4gICAgICAgIC5sb2FkKHRoaXMub3B0aW9ucy5yZW1vdGUsICQucHJveHkoZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHRoaXMuJGVsZW1lbnQudHJpZ2dlcignbG9hZGVkLmJzLm1vZGFsJylcbiAgICAgICAgfSwgdGhpcykpXG4gICAgfVxuICB9XG5cbiAgTW9kYWwuVkVSU0lPTiAgPSAnMy4zLjcnXG5cbiAgTW9kYWwuVFJBTlNJVElPTl9EVVJBVElPTiA9IDMwMFxuICBNb2RhbC5CQUNLRFJPUF9UUkFOU0lUSU9OX0RVUkFUSU9OID0gMTUwXG5cbiAgTW9kYWwuREVGQVVMVFMgPSB7XG4gICAgYmFja2Ryb3A6IHRydWUsXG4gICAga2V5Ym9hcmQ6IHRydWUsXG4gICAgc2hvdzogdHJ1ZVxuICB9XG5cbiAgTW9kYWwucHJvdG90eXBlLnRvZ2dsZSA9IGZ1bmN0aW9uIChfcmVsYXRlZFRhcmdldCkge1xuICAgIHJldHVybiB0aGlzLmlzU2hvd24gPyB0aGlzLmhpZGUoKSA6IHRoaXMuc2hvdyhfcmVsYXRlZFRhcmdldClcbiAgfVxuXG4gIE1vZGFsLnByb3RvdHlwZS5zaG93ID0gZnVuY3Rpb24gKF9yZWxhdGVkVGFyZ2V0KSB7XG4gICAgdmFyIHRoYXQgPSB0aGlzXG4gICAgdmFyIGUgICAgPSAkLkV2ZW50KCdzaG93LmJzLm1vZGFsJywgeyByZWxhdGVkVGFyZ2V0OiBfcmVsYXRlZFRhcmdldCB9KVxuXG4gICAgdGhpcy4kZWxlbWVudC50cmlnZ2VyKGUpXG5cbiAgICBpZiAodGhpcy5pc1Nob3duIHx8IGUuaXNEZWZhdWx0UHJldmVudGVkKCkpIHJldHVyblxuXG4gICAgdGhpcy5pc1Nob3duID0gdHJ1ZVxuXG4gICAgdGhpcy5jaGVja1Njcm9sbGJhcigpXG4gICAgdGhpcy5zZXRTY3JvbGxiYXIoKVxuICAgIHRoaXMuJGJvZHkuYWRkQ2xhc3MoJ21vZGFsLW9wZW4nKVxuXG4gICAgdGhpcy5lc2NhcGUoKVxuICAgIHRoaXMucmVzaXplKClcblxuICAgIHRoaXMuJGVsZW1lbnQub24oJ2NsaWNrLmRpc21pc3MuYnMubW9kYWwnLCAnW2RhdGEtZGlzbWlzcz1cIm1vZGFsXCJdJywgJC5wcm94eSh0aGlzLmhpZGUsIHRoaXMpKVxuXG4gICAgdGhpcy4kZGlhbG9nLm9uKCdtb3VzZWRvd24uZGlzbWlzcy5icy5tb2RhbCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoYXQuJGVsZW1lbnQub25lKCdtb3VzZXVwLmRpc21pc3MuYnMubW9kYWwnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICBpZiAoJChlLnRhcmdldCkuaXModGhhdC4kZWxlbWVudCkpIHRoYXQuaWdub3JlQmFja2Ryb3BDbGljayA9IHRydWVcbiAgICAgIH0pXG4gICAgfSlcblxuICAgIHRoaXMuYmFja2Ryb3AoZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIHRyYW5zaXRpb24gPSAkLnN1cHBvcnQudHJhbnNpdGlvbiAmJiB0aGF0LiRlbGVtZW50Lmhhc0NsYXNzKCdmYWRlJylcblxuICAgICAgaWYgKCF0aGF0LiRlbGVtZW50LnBhcmVudCgpLmxlbmd0aCkge1xuICAgICAgICB0aGF0LiRlbGVtZW50LmFwcGVuZFRvKHRoYXQuJGJvZHkpIC8vIGRvbid0IG1vdmUgbW9kYWxzIGRvbSBwb3NpdGlvblxuICAgICAgfVxuXG4gICAgICB0aGF0LiRlbGVtZW50XG4gICAgICAgIC5zaG93KClcbiAgICAgICAgLnNjcm9sbFRvcCgwKVxuXG4gICAgICB0aGF0LmFkanVzdERpYWxvZygpXG5cbiAgICAgIGlmICh0cmFuc2l0aW9uKSB7XG4gICAgICAgIHRoYXQuJGVsZW1lbnRbMF0ub2Zmc2V0V2lkdGggLy8gZm9yY2UgcmVmbG93XG4gICAgICB9XG5cbiAgICAgIHRoYXQuJGVsZW1lbnQuYWRkQ2xhc3MoJ2luJylcblxuICAgICAgdGhhdC5lbmZvcmNlRm9jdXMoKVxuXG4gICAgICB2YXIgZSA9ICQuRXZlbnQoJ3Nob3duLmJzLm1vZGFsJywgeyByZWxhdGVkVGFyZ2V0OiBfcmVsYXRlZFRhcmdldCB9KVxuXG4gICAgICB0cmFuc2l0aW9uID9cbiAgICAgICAgdGhhdC4kZGlhbG9nIC8vIHdhaXQgZm9yIG1vZGFsIHRvIHNsaWRlIGluXG4gICAgICAgICAgLm9uZSgnYnNUcmFuc2l0aW9uRW5kJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhhdC4kZWxlbWVudC50cmlnZ2VyKCdmb2N1cycpLnRyaWdnZXIoZSlcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5lbXVsYXRlVHJhbnNpdGlvbkVuZChNb2RhbC5UUkFOU0lUSU9OX0RVUkFUSU9OKSA6XG4gICAgICAgIHRoYXQuJGVsZW1lbnQudHJpZ2dlcignZm9jdXMnKS50cmlnZ2VyKGUpXG4gICAgfSlcbiAgfVxuXG4gIE1vZGFsLnByb3RvdHlwZS5oaWRlID0gZnVuY3Rpb24gKGUpIHtcbiAgICBpZiAoZSkgZS5wcmV2ZW50RGVmYXVsdCgpXG5cbiAgICBlID0gJC5FdmVudCgnaGlkZS5icy5tb2RhbCcpXG5cbiAgICB0aGlzLiRlbGVtZW50LnRyaWdnZXIoZSlcblxuICAgIGlmICghdGhpcy5pc1Nob3duIHx8IGUuaXNEZWZhdWx0UHJldmVudGVkKCkpIHJldHVyblxuXG4gICAgdGhpcy5pc1Nob3duID0gZmFsc2VcblxuICAgIHRoaXMuZXNjYXBlKClcbiAgICB0aGlzLnJlc2l6ZSgpXG5cbiAgICAkKGRvY3VtZW50KS5vZmYoJ2ZvY3VzaW4uYnMubW9kYWwnKVxuXG4gICAgdGhpcy4kZWxlbWVudFxuICAgICAgLnJlbW92ZUNsYXNzKCdpbicpXG4gICAgICAub2ZmKCdjbGljay5kaXNtaXNzLmJzLm1vZGFsJylcbiAgICAgIC5vZmYoJ21vdXNldXAuZGlzbWlzcy5icy5tb2RhbCcpXG5cbiAgICB0aGlzLiRkaWFsb2cub2ZmKCdtb3VzZWRvd24uZGlzbWlzcy5icy5tb2RhbCcpXG5cbiAgICAkLnN1cHBvcnQudHJhbnNpdGlvbiAmJiB0aGlzLiRlbGVtZW50Lmhhc0NsYXNzKCdmYWRlJykgP1xuICAgICAgdGhpcy4kZWxlbWVudFxuICAgICAgICAub25lKCdic1RyYW5zaXRpb25FbmQnLCAkLnByb3h5KHRoaXMuaGlkZU1vZGFsLCB0aGlzKSlcbiAgICAgICAgLmVtdWxhdGVUcmFuc2l0aW9uRW5kKE1vZGFsLlRSQU5TSVRJT05fRFVSQVRJT04pIDpcbiAgICAgIHRoaXMuaGlkZU1vZGFsKClcbiAgfVxuXG4gIE1vZGFsLnByb3RvdHlwZS5lbmZvcmNlRm9jdXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgJChkb2N1bWVudClcbiAgICAgIC5vZmYoJ2ZvY3VzaW4uYnMubW9kYWwnKSAvLyBndWFyZCBhZ2FpbnN0IGluZmluaXRlIGZvY3VzIGxvb3BcbiAgICAgIC5vbignZm9jdXNpbi5icy5tb2RhbCcsICQucHJveHkoZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgaWYgKGRvY3VtZW50ICE9PSBlLnRhcmdldCAmJlxuICAgICAgICAgICAgdGhpcy4kZWxlbWVudFswXSAhPT0gZS50YXJnZXQgJiZcbiAgICAgICAgICAgICF0aGlzLiRlbGVtZW50LmhhcyhlLnRhcmdldCkubGVuZ3RoKSB7XG4gICAgICAgICAgdGhpcy4kZWxlbWVudC50cmlnZ2VyKCdmb2N1cycpXG4gICAgICAgIH1cbiAgICAgIH0sIHRoaXMpKVxuICB9XG5cbiAgTW9kYWwucHJvdG90eXBlLmVzY2FwZSA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodGhpcy5pc1Nob3duICYmIHRoaXMub3B0aW9ucy5rZXlib2FyZCkge1xuICAgICAgdGhpcy4kZWxlbWVudC5vbigna2V5ZG93bi5kaXNtaXNzLmJzLm1vZGFsJywgJC5wcm94eShmdW5jdGlvbiAoZSkge1xuICAgICAgICBlLndoaWNoID09IDI3ICYmIHRoaXMuaGlkZSgpXG4gICAgICB9LCB0aGlzKSlcbiAgICB9IGVsc2UgaWYgKCF0aGlzLmlzU2hvd24pIHtcbiAgICAgIHRoaXMuJGVsZW1lbnQub2ZmKCdrZXlkb3duLmRpc21pc3MuYnMubW9kYWwnKVxuICAgIH1cbiAgfVxuXG4gIE1vZGFsLnByb3RvdHlwZS5yZXNpemUgPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHRoaXMuaXNTaG93bikge1xuICAgICAgJCh3aW5kb3cpLm9uKCdyZXNpemUuYnMubW9kYWwnLCAkLnByb3h5KHRoaXMuaGFuZGxlVXBkYXRlLCB0aGlzKSlcbiAgICB9IGVsc2Uge1xuICAgICAgJCh3aW5kb3cpLm9mZigncmVzaXplLmJzLm1vZGFsJylcbiAgICB9XG4gIH1cblxuICBNb2RhbC5wcm90b3R5cGUuaGlkZU1vZGFsID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciB0aGF0ID0gdGhpc1xuICAgIHRoaXMuJGVsZW1lbnQuaGlkZSgpXG4gICAgdGhpcy5iYWNrZHJvcChmdW5jdGlvbiAoKSB7XG4gICAgICB0aGF0LiRib2R5LnJlbW92ZUNsYXNzKCdtb2RhbC1vcGVuJylcbiAgICAgIHRoYXQucmVzZXRBZGp1c3RtZW50cygpXG4gICAgICB0aGF0LnJlc2V0U2Nyb2xsYmFyKClcbiAgICAgIHRoYXQuJGVsZW1lbnQudHJpZ2dlcignaGlkZGVuLmJzLm1vZGFsJylcbiAgICB9KVxuICB9XG5cbiAgTW9kYWwucHJvdG90eXBlLnJlbW92ZUJhY2tkcm9wID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuJGJhY2tkcm9wICYmIHRoaXMuJGJhY2tkcm9wLnJlbW92ZSgpXG4gICAgdGhpcy4kYmFja2Ryb3AgPSBudWxsXG4gIH1cblxuICBNb2RhbC5wcm90b3R5cGUuYmFja2Ryb3AgPSBmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgICB2YXIgdGhhdCA9IHRoaXNcbiAgICB2YXIgYW5pbWF0ZSA9IHRoaXMuJGVsZW1lbnQuaGFzQ2xhc3MoJ2ZhZGUnKSA/ICdmYWRlJyA6ICcnXG5cbiAgICBpZiAodGhpcy5pc1Nob3duICYmIHRoaXMub3B0aW9ucy5iYWNrZHJvcCkge1xuICAgICAgdmFyIGRvQW5pbWF0ZSA9ICQuc3VwcG9ydC50cmFuc2l0aW9uICYmIGFuaW1hdGVcblxuICAgICAgdGhpcy4kYmFja2Ryb3AgPSAkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpKVxuICAgICAgICAuYWRkQ2xhc3MoJ21vZGFsLWJhY2tkcm9wICcgKyBhbmltYXRlKVxuICAgICAgICAuYXBwZW5kVG8odGhpcy4kYm9keSlcblxuICAgICAgdGhpcy4kZWxlbWVudC5vbignY2xpY2suZGlzbWlzcy5icy5tb2RhbCcsICQucHJveHkoZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgaWYgKHRoaXMuaWdub3JlQmFja2Ryb3BDbGljaykge1xuICAgICAgICAgIHRoaXMuaWdub3JlQmFja2Ryb3BDbGljayA9IGZhbHNlXG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgaWYgKGUudGFyZ2V0ICE9PSBlLmN1cnJlbnRUYXJnZXQpIHJldHVyblxuICAgICAgICB0aGlzLm9wdGlvbnMuYmFja2Ryb3AgPT0gJ3N0YXRpYydcbiAgICAgICAgICA/IHRoaXMuJGVsZW1lbnRbMF0uZm9jdXMoKVxuICAgICAgICAgIDogdGhpcy5oaWRlKClcbiAgICAgIH0sIHRoaXMpKVxuXG4gICAgICBpZiAoZG9BbmltYXRlKSB0aGlzLiRiYWNrZHJvcFswXS5vZmZzZXRXaWR0aCAvLyBmb3JjZSByZWZsb3dcblxuICAgICAgdGhpcy4kYmFja2Ryb3AuYWRkQ2xhc3MoJ2luJylcblxuICAgICAgaWYgKCFjYWxsYmFjaykgcmV0dXJuXG5cbiAgICAgIGRvQW5pbWF0ZSA/XG4gICAgICAgIHRoaXMuJGJhY2tkcm9wXG4gICAgICAgICAgLm9uZSgnYnNUcmFuc2l0aW9uRW5kJywgY2FsbGJhY2spXG4gICAgICAgICAgLmVtdWxhdGVUcmFuc2l0aW9uRW5kKE1vZGFsLkJBQ0tEUk9QX1RSQU5TSVRJT05fRFVSQVRJT04pIDpcbiAgICAgICAgY2FsbGJhY2soKVxuXG4gICAgfSBlbHNlIGlmICghdGhpcy5pc1Nob3duICYmIHRoaXMuJGJhY2tkcm9wKSB7XG4gICAgICB0aGlzLiRiYWNrZHJvcC5yZW1vdmVDbGFzcygnaW4nKVxuXG4gICAgICB2YXIgY2FsbGJhY2tSZW1vdmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoYXQucmVtb3ZlQmFja2Ryb3AoKVxuICAgICAgICBjYWxsYmFjayAmJiBjYWxsYmFjaygpXG4gICAgICB9XG4gICAgICAkLnN1cHBvcnQudHJhbnNpdGlvbiAmJiB0aGlzLiRlbGVtZW50Lmhhc0NsYXNzKCdmYWRlJykgP1xuICAgICAgICB0aGlzLiRiYWNrZHJvcFxuICAgICAgICAgIC5vbmUoJ2JzVHJhbnNpdGlvbkVuZCcsIGNhbGxiYWNrUmVtb3ZlKVxuICAgICAgICAgIC5lbXVsYXRlVHJhbnNpdGlvbkVuZChNb2RhbC5CQUNLRFJPUF9UUkFOU0lUSU9OX0RVUkFUSU9OKSA6XG4gICAgICAgIGNhbGxiYWNrUmVtb3ZlKClcblxuICAgIH0gZWxzZSBpZiAoY2FsbGJhY2spIHtcbiAgICAgIGNhbGxiYWNrKClcbiAgICB9XG4gIH1cblxuICAvLyB0aGVzZSBmb2xsb3dpbmcgbWV0aG9kcyBhcmUgdXNlZCB0byBoYW5kbGUgb3ZlcmZsb3dpbmcgbW9kYWxzXG5cbiAgTW9kYWwucHJvdG90eXBlLmhhbmRsZVVwZGF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmFkanVzdERpYWxvZygpXG4gIH1cblxuICBNb2RhbC5wcm90b3R5cGUuYWRqdXN0RGlhbG9nID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBtb2RhbElzT3ZlcmZsb3dpbmcgPSB0aGlzLiRlbGVtZW50WzBdLnNjcm9sbEhlaWdodCA+IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHRcblxuICAgIHRoaXMuJGVsZW1lbnQuY3NzKHtcbiAgICAgIHBhZGRpbmdMZWZ0OiAgIXRoaXMuYm9keUlzT3ZlcmZsb3dpbmcgJiYgbW9kYWxJc092ZXJmbG93aW5nID8gdGhpcy5zY3JvbGxiYXJXaWR0aCA6ICcnLFxuICAgICAgcGFkZGluZ1JpZ2h0OiB0aGlzLmJvZHlJc092ZXJmbG93aW5nICYmICFtb2RhbElzT3ZlcmZsb3dpbmcgPyB0aGlzLnNjcm9sbGJhcldpZHRoIDogJydcbiAgICB9KVxuICB9XG5cbiAgTW9kYWwucHJvdG90eXBlLnJlc2V0QWRqdXN0bWVudHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy4kZWxlbWVudC5jc3Moe1xuICAgICAgcGFkZGluZ0xlZnQ6ICcnLFxuICAgICAgcGFkZGluZ1JpZ2h0OiAnJ1xuICAgIH0pXG4gIH1cblxuICBNb2RhbC5wcm90b3R5cGUuY2hlY2tTY3JvbGxiYXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGZ1bGxXaW5kb3dXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoXG4gICAgaWYgKCFmdWxsV2luZG93V2lkdGgpIHsgLy8gd29ya2Fyb3VuZCBmb3IgbWlzc2luZyB3aW5kb3cuaW5uZXJXaWR0aCBpbiBJRThcbiAgICAgIHZhciBkb2N1bWVudEVsZW1lbnRSZWN0ID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG4gICAgICBmdWxsV2luZG93V2lkdGggPSBkb2N1bWVudEVsZW1lbnRSZWN0LnJpZ2h0IC0gTWF0aC5hYnMoZG9jdW1lbnRFbGVtZW50UmVjdC5sZWZ0KVxuICAgIH1cbiAgICB0aGlzLmJvZHlJc092ZXJmbG93aW5nID0gZG9jdW1lbnQuYm9keS5jbGllbnRXaWR0aCA8IGZ1bGxXaW5kb3dXaWR0aFxuICAgIHRoaXMuc2Nyb2xsYmFyV2lkdGggPSB0aGlzLm1lYXN1cmVTY3JvbGxiYXIoKVxuICB9XG5cbiAgTW9kYWwucHJvdG90eXBlLnNldFNjcm9sbGJhciA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgYm9keVBhZCA9IHBhcnNlSW50KCh0aGlzLiRib2R5LmNzcygncGFkZGluZy1yaWdodCcpIHx8IDApLCAxMClcbiAgICB0aGlzLm9yaWdpbmFsQm9keVBhZCA9IGRvY3VtZW50LmJvZHkuc3R5bGUucGFkZGluZ1JpZ2h0IHx8ICcnXG4gICAgaWYgKHRoaXMuYm9keUlzT3ZlcmZsb3dpbmcpIHRoaXMuJGJvZHkuY3NzKCdwYWRkaW5nLXJpZ2h0JywgYm9keVBhZCArIHRoaXMuc2Nyb2xsYmFyV2lkdGgpXG4gIH1cblxuICBNb2RhbC5wcm90b3R5cGUucmVzZXRTY3JvbGxiYXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy4kYm9keS5jc3MoJ3BhZGRpbmctcmlnaHQnLCB0aGlzLm9yaWdpbmFsQm9keVBhZClcbiAgfVxuXG4gIE1vZGFsLnByb3RvdHlwZS5tZWFzdXJlU2Nyb2xsYmFyID0gZnVuY3Rpb24gKCkgeyAvLyB0aHggd2Fsc2hcbiAgICB2YXIgc2Nyb2xsRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICBzY3JvbGxEaXYuY2xhc3NOYW1lID0gJ21vZGFsLXNjcm9sbGJhci1tZWFzdXJlJ1xuICAgIHRoaXMuJGJvZHkuYXBwZW5kKHNjcm9sbERpdilcbiAgICB2YXIgc2Nyb2xsYmFyV2lkdGggPSBzY3JvbGxEaXYub2Zmc2V0V2lkdGggLSBzY3JvbGxEaXYuY2xpZW50V2lkdGhcbiAgICB0aGlzLiRib2R5WzBdLnJlbW92ZUNoaWxkKHNjcm9sbERpdilcbiAgICByZXR1cm4gc2Nyb2xsYmFyV2lkdGhcbiAgfVxuXG5cbiAgLy8gTU9EQUwgUExVR0lOIERFRklOSVRJT05cbiAgLy8gPT09PT09PT09PT09PT09PT09PT09PT1cblxuICBmdW5jdGlvbiBQbHVnaW4ob3B0aW9uLCBfcmVsYXRlZFRhcmdldCkge1xuICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgdmFyICR0aGlzICAgPSAkKHRoaXMpXG4gICAgICB2YXIgZGF0YSAgICA9ICR0aGlzLmRhdGEoJ2JzLm1vZGFsJylcbiAgICAgIHZhciBvcHRpb25zID0gJC5leHRlbmQoe30sIE1vZGFsLkRFRkFVTFRTLCAkdGhpcy5kYXRhKCksIHR5cGVvZiBvcHRpb24gPT0gJ29iamVjdCcgJiYgb3B0aW9uKVxuXG4gICAgICBpZiAoIWRhdGEpICR0aGlzLmRhdGEoJ2JzLm1vZGFsJywgKGRhdGEgPSBuZXcgTW9kYWwodGhpcywgb3B0aW9ucykpKVxuICAgICAgaWYgKHR5cGVvZiBvcHRpb24gPT0gJ3N0cmluZycpIGRhdGFbb3B0aW9uXShfcmVsYXRlZFRhcmdldClcbiAgICAgIGVsc2UgaWYgKG9wdGlvbnMuc2hvdykgZGF0YS5zaG93KF9yZWxhdGVkVGFyZ2V0KVxuICAgIH0pXG4gIH1cblxuICB2YXIgb2xkID0gJC5mbi5tb2RhbFxuXG4gICQuZm4ubW9kYWwgICAgICAgICAgICAgPSBQbHVnaW5cbiAgJC5mbi5tb2RhbC5Db25zdHJ1Y3RvciA9IE1vZGFsXG5cblxuICAvLyBNT0RBTCBOTyBDT05GTElDVFxuICAvLyA9PT09PT09PT09PT09PT09PVxuXG4gICQuZm4ubW9kYWwubm9Db25mbGljdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAkLmZuLm1vZGFsID0gb2xkXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG5cbiAgLy8gTU9EQUwgREFUQS1BUElcbiAgLy8gPT09PT09PT09PT09PT1cblxuICAkKGRvY3VtZW50KS5vbignY2xpY2suYnMubW9kYWwuZGF0YS1hcGknLCAnW2RhdGEtdG9nZ2xlPVwibW9kYWxcIl0nLCBmdW5jdGlvbiAoZSkge1xuICAgIHZhciAkdGhpcyAgID0gJCh0aGlzKVxuICAgIHZhciBocmVmICAgID0gJHRoaXMuYXR0cignaHJlZicpXG4gICAgdmFyICR0YXJnZXQgPSAkKCR0aGlzLmF0dHIoJ2RhdGEtdGFyZ2V0JykgfHwgKGhyZWYgJiYgaHJlZi5yZXBsYWNlKC8uKig/PSNbXlxcc10rJCkvLCAnJykpKSAvLyBzdHJpcCBmb3IgaWU3XG4gICAgdmFyIG9wdGlvbiAgPSAkdGFyZ2V0LmRhdGEoJ2JzLm1vZGFsJykgPyAndG9nZ2xlJyA6ICQuZXh0ZW5kKHsgcmVtb3RlOiAhLyMvLnRlc3QoaHJlZikgJiYgaHJlZiB9LCAkdGFyZ2V0LmRhdGEoKSwgJHRoaXMuZGF0YSgpKVxuXG4gICAgaWYgKCR0aGlzLmlzKCdhJykpIGUucHJldmVudERlZmF1bHQoKVxuXG4gICAgJHRhcmdldC5vbmUoJ3Nob3cuYnMubW9kYWwnLCBmdW5jdGlvbiAoc2hvd0V2ZW50KSB7XG4gICAgICBpZiAoc2hvd0V2ZW50LmlzRGVmYXVsdFByZXZlbnRlZCgpKSByZXR1cm4gLy8gb25seSByZWdpc3RlciBmb2N1cyByZXN0b3JlciBpZiBtb2RhbCB3aWxsIGFjdHVhbGx5IGdldCBzaG93blxuICAgICAgJHRhcmdldC5vbmUoJ2hpZGRlbi5icy5tb2RhbCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJHRoaXMuaXMoJzp2aXNpYmxlJykgJiYgJHRoaXMudHJpZ2dlcignZm9jdXMnKVxuICAgICAgfSlcbiAgICB9KVxuICAgIFBsdWdpbi5jYWxsKCR0YXJnZXQsIG9wdGlvbiwgdGhpcylcbiAgfSlcblxufShqUXVlcnkpO1xuXG4vKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqIEJvb3RzdHJhcDogdG9vbHRpcC5qcyB2My4zLjdcbiAqIGh0dHA6Ly9nZXRib290c3RyYXAuY29tL2phdmFzY3JpcHQvI3Rvb2x0aXBcbiAqIEluc3BpcmVkIGJ5IHRoZSBvcmlnaW5hbCBqUXVlcnkudGlwc3kgYnkgSmFzb24gRnJhbWVcbiAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICogQ29weXJpZ2h0IDIwMTEtMjAxNiBUd2l0dGVyLCBJbmMuXG4gKiBMaWNlbnNlZCB1bmRlciBNSVQgKGh0dHBzOi8vZ2l0aHViLmNvbS90d2JzL2Jvb3RzdHJhcC9ibG9iL21hc3Rlci9MSUNFTlNFKVxuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5cblxuK2Z1bmN0aW9uICgkKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICAvLyBUT09MVElQIFBVQkxJQyBDTEFTUyBERUZJTklUSU9OXG4gIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuICB2YXIgVG9vbHRpcCA9IGZ1bmN0aW9uIChlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgdGhpcy50eXBlICAgICAgID0gbnVsbFxuICAgIHRoaXMub3B0aW9ucyAgICA9IG51bGxcbiAgICB0aGlzLmVuYWJsZWQgICAgPSBudWxsXG4gICAgdGhpcy50aW1lb3V0ICAgID0gbnVsbFxuICAgIHRoaXMuaG92ZXJTdGF0ZSA9IG51bGxcbiAgICB0aGlzLiRlbGVtZW50ICAgPSBudWxsXG4gICAgdGhpcy5pblN0YXRlICAgID0gbnVsbFxuXG4gICAgdGhpcy5pbml0KCd0b29sdGlwJywgZWxlbWVudCwgb3B0aW9ucylcbiAgfVxuXG4gIFRvb2x0aXAuVkVSU0lPTiAgPSAnMy4zLjcnXG5cbiAgVG9vbHRpcC5UUkFOU0lUSU9OX0RVUkFUSU9OID0gMTUwXG5cbiAgVG9vbHRpcC5ERUZBVUxUUyA9IHtcbiAgICBhbmltYXRpb246IHRydWUsXG4gICAgcGxhY2VtZW50OiAndG9wJyxcbiAgICBzZWxlY3RvcjogZmFsc2UsXG4gICAgdGVtcGxhdGU6ICc8ZGl2IGNsYXNzPVwidG9vbHRpcFwiIHJvbGU9XCJ0b29sdGlwXCI+PGRpdiBjbGFzcz1cInRvb2x0aXAtYXJyb3dcIj48L2Rpdj48ZGl2IGNsYXNzPVwidG9vbHRpcC1pbm5lclwiPjwvZGl2PjwvZGl2PicsXG4gICAgdHJpZ2dlcjogJ2hvdmVyIGZvY3VzJyxcbiAgICB0aXRsZTogJycsXG4gICAgZGVsYXk6IDAsXG4gICAgaHRtbDogZmFsc2UsXG4gICAgY29udGFpbmVyOiBmYWxzZSxcbiAgICB2aWV3cG9ydDoge1xuICAgICAgc2VsZWN0b3I6ICdib2R5JyxcbiAgICAgIHBhZGRpbmc6IDBcbiAgICB9XG4gIH1cblxuICBUb29sdGlwLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKHR5cGUsIGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICB0aGlzLmVuYWJsZWQgICA9IHRydWVcbiAgICB0aGlzLnR5cGUgICAgICA9IHR5cGVcbiAgICB0aGlzLiRlbGVtZW50ICA9ICQoZWxlbWVudClcbiAgICB0aGlzLm9wdGlvbnMgICA9IHRoaXMuZ2V0T3B0aW9ucyhvcHRpb25zKVxuICAgIHRoaXMuJHZpZXdwb3J0ID0gdGhpcy5vcHRpb25zLnZpZXdwb3J0ICYmICQoJC5pc0Z1bmN0aW9uKHRoaXMub3B0aW9ucy52aWV3cG9ydCkgPyB0aGlzLm9wdGlvbnMudmlld3BvcnQuY2FsbCh0aGlzLCB0aGlzLiRlbGVtZW50KSA6ICh0aGlzLm9wdGlvbnMudmlld3BvcnQuc2VsZWN0b3IgfHwgdGhpcy5vcHRpb25zLnZpZXdwb3J0KSlcbiAgICB0aGlzLmluU3RhdGUgICA9IHsgY2xpY2s6IGZhbHNlLCBob3ZlcjogZmFsc2UsIGZvY3VzOiBmYWxzZSB9XG5cbiAgICBpZiAodGhpcy4kZWxlbWVudFswXSBpbnN0YW5jZW9mIGRvY3VtZW50LmNvbnN0cnVjdG9yICYmICF0aGlzLm9wdGlvbnMuc2VsZWN0b3IpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignYHNlbGVjdG9yYCBvcHRpb24gbXVzdCBiZSBzcGVjaWZpZWQgd2hlbiBpbml0aWFsaXppbmcgJyArIHRoaXMudHlwZSArICcgb24gdGhlIHdpbmRvdy5kb2N1bWVudCBvYmplY3QhJylcbiAgICB9XG5cbiAgICB2YXIgdHJpZ2dlcnMgPSB0aGlzLm9wdGlvbnMudHJpZ2dlci5zcGxpdCgnICcpXG5cbiAgICBmb3IgKHZhciBpID0gdHJpZ2dlcnMubGVuZ3RoOyBpLS07KSB7XG4gICAgICB2YXIgdHJpZ2dlciA9IHRyaWdnZXJzW2ldXG5cbiAgICAgIGlmICh0cmlnZ2VyID09ICdjbGljaycpIHtcbiAgICAgICAgdGhpcy4kZWxlbWVudC5vbignY2xpY2suJyArIHRoaXMudHlwZSwgdGhpcy5vcHRpb25zLnNlbGVjdG9yLCAkLnByb3h5KHRoaXMudG9nZ2xlLCB0aGlzKSlcbiAgICAgIH0gZWxzZSBpZiAodHJpZ2dlciAhPSAnbWFudWFsJykge1xuICAgICAgICB2YXIgZXZlbnRJbiAgPSB0cmlnZ2VyID09ICdob3ZlcicgPyAnbW91c2VlbnRlcicgOiAnZm9jdXNpbidcbiAgICAgICAgdmFyIGV2ZW50T3V0ID0gdHJpZ2dlciA9PSAnaG92ZXInID8gJ21vdXNlbGVhdmUnIDogJ2ZvY3Vzb3V0J1xuXG4gICAgICAgIHRoaXMuJGVsZW1lbnQub24oZXZlbnRJbiAgKyAnLicgKyB0aGlzLnR5cGUsIHRoaXMub3B0aW9ucy5zZWxlY3RvciwgJC5wcm94eSh0aGlzLmVudGVyLCB0aGlzKSlcbiAgICAgICAgdGhpcy4kZWxlbWVudC5vbihldmVudE91dCArICcuJyArIHRoaXMudHlwZSwgdGhpcy5vcHRpb25zLnNlbGVjdG9yLCAkLnByb3h5KHRoaXMubGVhdmUsIHRoaXMpKVxuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMub3B0aW9ucy5zZWxlY3RvciA/XG4gICAgICAodGhpcy5fb3B0aW9ucyA9ICQuZXh0ZW5kKHt9LCB0aGlzLm9wdGlvbnMsIHsgdHJpZ2dlcjogJ21hbnVhbCcsIHNlbGVjdG9yOiAnJyB9KSkgOlxuICAgICAgdGhpcy5maXhUaXRsZSgpXG4gIH1cblxuICBUb29sdGlwLnByb3RvdHlwZS5nZXREZWZhdWx0cyA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gVG9vbHRpcC5ERUZBVUxUU1xuICB9XG5cbiAgVG9vbHRpcC5wcm90b3R5cGUuZ2V0T3B0aW9ucyA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgb3B0aW9ucyA9ICQuZXh0ZW5kKHt9LCB0aGlzLmdldERlZmF1bHRzKCksIHRoaXMuJGVsZW1lbnQuZGF0YSgpLCBvcHRpb25zKVxuXG4gICAgaWYgKG9wdGlvbnMuZGVsYXkgJiYgdHlwZW9mIG9wdGlvbnMuZGVsYXkgPT0gJ251bWJlcicpIHtcbiAgICAgIG9wdGlvbnMuZGVsYXkgPSB7XG4gICAgICAgIHNob3c6IG9wdGlvbnMuZGVsYXksXG4gICAgICAgIGhpZGU6IG9wdGlvbnMuZGVsYXlcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gb3B0aW9uc1xuICB9XG5cbiAgVG9vbHRpcC5wcm90b3R5cGUuZ2V0RGVsZWdhdGVPcHRpb25zID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBvcHRpb25zICA9IHt9XG4gICAgdmFyIGRlZmF1bHRzID0gdGhpcy5nZXREZWZhdWx0cygpXG5cbiAgICB0aGlzLl9vcHRpb25zICYmICQuZWFjaCh0aGlzLl9vcHRpb25zLCBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xuICAgICAgaWYgKGRlZmF1bHRzW2tleV0gIT0gdmFsdWUpIG9wdGlvbnNba2V5XSA9IHZhbHVlXG4gICAgfSlcblxuICAgIHJldHVybiBvcHRpb25zXG4gIH1cblxuICBUb29sdGlwLnByb3RvdHlwZS5lbnRlciA9IGZ1bmN0aW9uIChvYmopIHtcbiAgICB2YXIgc2VsZiA9IG9iaiBpbnN0YW5jZW9mIHRoaXMuY29uc3RydWN0b3IgP1xuICAgICAgb2JqIDogJChvYmouY3VycmVudFRhcmdldCkuZGF0YSgnYnMuJyArIHRoaXMudHlwZSlcblxuICAgIGlmICghc2VsZikge1xuICAgICAgc2VsZiA9IG5ldyB0aGlzLmNvbnN0cnVjdG9yKG9iai5jdXJyZW50VGFyZ2V0LCB0aGlzLmdldERlbGVnYXRlT3B0aW9ucygpKVxuICAgICAgJChvYmouY3VycmVudFRhcmdldCkuZGF0YSgnYnMuJyArIHRoaXMudHlwZSwgc2VsZilcbiAgICB9XG5cbiAgICBpZiAob2JqIGluc3RhbmNlb2YgJC5FdmVudCkge1xuICAgICAgc2VsZi5pblN0YXRlW29iai50eXBlID09ICdmb2N1c2luJyA/ICdmb2N1cycgOiAnaG92ZXInXSA9IHRydWVcbiAgICB9XG5cbiAgICBpZiAoc2VsZi50aXAoKS5oYXNDbGFzcygnaW4nKSB8fCBzZWxmLmhvdmVyU3RhdGUgPT0gJ2luJykge1xuICAgICAgc2VsZi5ob3ZlclN0YXRlID0gJ2luJ1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgY2xlYXJUaW1lb3V0KHNlbGYudGltZW91dClcblxuICAgIHNlbGYuaG92ZXJTdGF0ZSA9ICdpbidcblxuICAgIGlmICghc2VsZi5vcHRpb25zLmRlbGF5IHx8ICFzZWxmLm9wdGlvbnMuZGVsYXkuc2hvdykgcmV0dXJuIHNlbGYuc2hvdygpXG5cbiAgICBzZWxmLnRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmIChzZWxmLmhvdmVyU3RhdGUgPT0gJ2luJykgc2VsZi5zaG93KClcbiAgICB9LCBzZWxmLm9wdGlvbnMuZGVsYXkuc2hvdylcbiAgfVxuXG4gIFRvb2x0aXAucHJvdG90eXBlLmlzSW5TdGF0ZVRydWUgPSBmdW5jdGlvbiAoKSB7XG4gICAgZm9yICh2YXIga2V5IGluIHRoaXMuaW5TdGF0ZSkge1xuICAgICAgaWYgKHRoaXMuaW5TdGF0ZVtrZXldKSByZXR1cm4gdHJ1ZVxuICAgIH1cblxuICAgIHJldHVybiBmYWxzZVxuICB9XG5cbiAgVG9vbHRpcC5wcm90b3R5cGUubGVhdmUgPSBmdW5jdGlvbiAob2JqKSB7XG4gICAgdmFyIHNlbGYgPSBvYmogaW5zdGFuY2VvZiB0aGlzLmNvbnN0cnVjdG9yID9cbiAgICAgIG9iaiA6ICQob2JqLmN1cnJlbnRUYXJnZXQpLmRhdGEoJ2JzLicgKyB0aGlzLnR5cGUpXG5cbiAgICBpZiAoIXNlbGYpIHtcbiAgICAgIHNlbGYgPSBuZXcgdGhpcy5jb25zdHJ1Y3RvcihvYmouY3VycmVudFRhcmdldCwgdGhpcy5nZXREZWxlZ2F0ZU9wdGlvbnMoKSlcbiAgICAgICQob2JqLmN1cnJlbnRUYXJnZXQpLmRhdGEoJ2JzLicgKyB0aGlzLnR5cGUsIHNlbGYpXG4gICAgfVxuXG4gICAgaWYgKG9iaiBpbnN0YW5jZW9mICQuRXZlbnQpIHtcbiAgICAgIHNlbGYuaW5TdGF0ZVtvYmoudHlwZSA9PSAnZm9jdXNvdXQnID8gJ2ZvY3VzJyA6ICdob3ZlciddID0gZmFsc2VcbiAgICB9XG5cbiAgICBpZiAoc2VsZi5pc0luU3RhdGVUcnVlKCkpIHJldHVyblxuXG4gICAgY2xlYXJUaW1lb3V0KHNlbGYudGltZW91dClcblxuICAgIHNlbGYuaG92ZXJTdGF0ZSA9ICdvdXQnXG5cbiAgICBpZiAoIXNlbGYub3B0aW9ucy5kZWxheSB8fCAhc2VsZi5vcHRpb25zLmRlbGF5LmhpZGUpIHJldHVybiBzZWxmLmhpZGUoKVxuXG4gICAgc2VsZi50aW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAoc2VsZi5ob3ZlclN0YXRlID09ICdvdXQnKSBzZWxmLmhpZGUoKVxuICAgIH0sIHNlbGYub3B0aW9ucy5kZWxheS5oaWRlKVxuICB9XG5cbiAgVG9vbHRpcC5wcm90b3R5cGUuc2hvdyA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZSA9ICQuRXZlbnQoJ3Nob3cuYnMuJyArIHRoaXMudHlwZSlcblxuICAgIGlmICh0aGlzLmhhc0NvbnRlbnQoKSAmJiB0aGlzLmVuYWJsZWQpIHtcbiAgICAgIHRoaXMuJGVsZW1lbnQudHJpZ2dlcihlKVxuXG4gICAgICB2YXIgaW5Eb20gPSAkLmNvbnRhaW5zKHRoaXMuJGVsZW1lbnRbMF0ub3duZXJEb2N1bWVudC5kb2N1bWVudEVsZW1lbnQsIHRoaXMuJGVsZW1lbnRbMF0pXG4gICAgICBpZiAoZS5pc0RlZmF1bHRQcmV2ZW50ZWQoKSB8fCAhaW5Eb20pIHJldHVyblxuICAgICAgdmFyIHRoYXQgPSB0aGlzXG5cbiAgICAgIHZhciAkdGlwID0gdGhpcy50aXAoKVxuXG4gICAgICB2YXIgdGlwSWQgPSB0aGlzLmdldFVJRCh0aGlzLnR5cGUpXG5cbiAgICAgIHRoaXMuc2V0Q29udGVudCgpXG4gICAgICAkdGlwLmF0dHIoJ2lkJywgdGlwSWQpXG4gICAgICB0aGlzLiRlbGVtZW50LmF0dHIoJ2FyaWEtZGVzY3JpYmVkYnknLCB0aXBJZClcblxuICAgICAgaWYgKHRoaXMub3B0aW9ucy5hbmltYXRpb24pICR0aXAuYWRkQ2xhc3MoJ2ZhZGUnKVxuXG4gICAgICB2YXIgcGxhY2VtZW50ID0gdHlwZW9mIHRoaXMub3B0aW9ucy5wbGFjZW1lbnQgPT0gJ2Z1bmN0aW9uJyA/XG4gICAgICAgIHRoaXMub3B0aW9ucy5wbGFjZW1lbnQuY2FsbCh0aGlzLCAkdGlwWzBdLCB0aGlzLiRlbGVtZW50WzBdKSA6XG4gICAgICAgIHRoaXMub3B0aW9ucy5wbGFjZW1lbnRcblxuICAgICAgdmFyIGF1dG9Ub2tlbiA9IC9cXHM/YXV0bz9cXHM/L2lcbiAgICAgIHZhciBhdXRvUGxhY2UgPSBhdXRvVG9rZW4udGVzdChwbGFjZW1lbnQpXG4gICAgICBpZiAoYXV0b1BsYWNlKSBwbGFjZW1lbnQgPSBwbGFjZW1lbnQucmVwbGFjZShhdXRvVG9rZW4sICcnKSB8fCAndG9wJ1xuXG4gICAgICAkdGlwXG4gICAgICAgIC5kZXRhY2goKVxuICAgICAgICAuY3NzKHsgdG9wOiAwLCBsZWZ0OiAwLCBkaXNwbGF5OiAnYmxvY2snIH0pXG4gICAgICAgIC5hZGRDbGFzcyhwbGFjZW1lbnQpXG4gICAgICAgIC5kYXRhKCdicy4nICsgdGhpcy50eXBlLCB0aGlzKVxuXG4gICAgICB0aGlzLm9wdGlvbnMuY29udGFpbmVyID8gJHRpcC5hcHBlbmRUbyh0aGlzLm9wdGlvbnMuY29udGFpbmVyKSA6ICR0aXAuaW5zZXJ0QWZ0ZXIodGhpcy4kZWxlbWVudClcbiAgICAgIHRoaXMuJGVsZW1lbnQudHJpZ2dlcignaW5zZXJ0ZWQuYnMuJyArIHRoaXMudHlwZSlcblxuICAgICAgdmFyIHBvcyAgICAgICAgICA9IHRoaXMuZ2V0UG9zaXRpb24oKVxuICAgICAgdmFyIGFjdHVhbFdpZHRoICA9ICR0aXBbMF0ub2Zmc2V0V2lkdGhcbiAgICAgIHZhciBhY3R1YWxIZWlnaHQgPSAkdGlwWzBdLm9mZnNldEhlaWdodFxuXG4gICAgICBpZiAoYXV0b1BsYWNlKSB7XG4gICAgICAgIHZhciBvcmdQbGFjZW1lbnQgPSBwbGFjZW1lbnRcbiAgICAgICAgdmFyIHZpZXdwb3J0RGltID0gdGhpcy5nZXRQb3NpdGlvbih0aGlzLiR2aWV3cG9ydClcblxuICAgICAgICBwbGFjZW1lbnQgPSBwbGFjZW1lbnQgPT0gJ2JvdHRvbScgJiYgcG9zLmJvdHRvbSArIGFjdHVhbEhlaWdodCA+IHZpZXdwb3J0RGltLmJvdHRvbSA/ICd0b3AnICAgIDpcbiAgICAgICAgICAgICAgICAgICAgcGxhY2VtZW50ID09ICd0b3AnICAgICYmIHBvcy50b3AgICAgLSBhY3R1YWxIZWlnaHQgPCB2aWV3cG9ydERpbS50b3AgICAgPyAnYm90dG9tJyA6XG4gICAgICAgICAgICAgICAgICAgIHBsYWNlbWVudCA9PSAncmlnaHQnICAmJiBwb3MucmlnaHQgICsgYWN0dWFsV2lkdGggID4gdmlld3BvcnREaW0ud2lkdGggID8gJ2xlZnQnICAgOlxuICAgICAgICAgICAgICAgICAgICBwbGFjZW1lbnQgPT0gJ2xlZnQnICAgJiYgcG9zLmxlZnQgICAtIGFjdHVhbFdpZHRoICA8IHZpZXdwb3J0RGltLmxlZnQgICA/ICdyaWdodCcgIDpcbiAgICAgICAgICAgICAgICAgICAgcGxhY2VtZW50XG5cbiAgICAgICAgJHRpcFxuICAgICAgICAgIC5yZW1vdmVDbGFzcyhvcmdQbGFjZW1lbnQpXG4gICAgICAgICAgLmFkZENsYXNzKHBsYWNlbWVudClcbiAgICAgIH1cblxuICAgICAgdmFyIGNhbGN1bGF0ZWRPZmZzZXQgPSB0aGlzLmdldENhbGN1bGF0ZWRPZmZzZXQocGxhY2VtZW50LCBwb3MsIGFjdHVhbFdpZHRoLCBhY3R1YWxIZWlnaHQpXG5cbiAgICAgIHRoaXMuYXBwbHlQbGFjZW1lbnQoY2FsY3VsYXRlZE9mZnNldCwgcGxhY2VtZW50KVxuXG4gICAgICB2YXIgY29tcGxldGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBwcmV2SG92ZXJTdGF0ZSA9IHRoYXQuaG92ZXJTdGF0ZVxuICAgICAgICB0aGF0LiRlbGVtZW50LnRyaWdnZXIoJ3Nob3duLmJzLicgKyB0aGF0LnR5cGUpXG4gICAgICAgIHRoYXQuaG92ZXJTdGF0ZSA9IG51bGxcblxuICAgICAgICBpZiAocHJldkhvdmVyU3RhdGUgPT0gJ291dCcpIHRoYXQubGVhdmUodGhhdClcbiAgICAgIH1cblxuICAgICAgJC5zdXBwb3J0LnRyYW5zaXRpb24gJiYgdGhpcy4kdGlwLmhhc0NsYXNzKCdmYWRlJykgP1xuICAgICAgICAkdGlwXG4gICAgICAgICAgLm9uZSgnYnNUcmFuc2l0aW9uRW5kJywgY29tcGxldGUpXG4gICAgICAgICAgLmVtdWxhdGVUcmFuc2l0aW9uRW5kKFRvb2x0aXAuVFJBTlNJVElPTl9EVVJBVElPTikgOlxuICAgICAgICBjb21wbGV0ZSgpXG4gICAgfVxuICB9XG5cbiAgVG9vbHRpcC5wcm90b3R5cGUuYXBwbHlQbGFjZW1lbnQgPSBmdW5jdGlvbiAob2Zmc2V0LCBwbGFjZW1lbnQpIHtcbiAgICB2YXIgJHRpcCAgID0gdGhpcy50aXAoKVxuICAgIHZhciB3aWR0aCAgPSAkdGlwWzBdLm9mZnNldFdpZHRoXG4gICAgdmFyIGhlaWdodCA9ICR0aXBbMF0ub2Zmc2V0SGVpZ2h0XG5cbiAgICAvLyBtYW51YWxseSByZWFkIG1hcmdpbnMgYmVjYXVzZSBnZXRCb3VuZGluZ0NsaWVudFJlY3QgaW5jbHVkZXMgZGlmZmVyZW5jZVxuICAgIHZhciBtYXJnaW5Ub3AgPSBwYXJzZUludCgkdGlwLmNzcygnbWFyZ2luLXRvcCcpLCAxMClcbiAgICB2YXIgbWFyZ2luTGVmdCA9IHBhcnNlSW50KCR0aXAuY3NzKCdtYXJnaW4tbGVmdCcpLCAxMClcblxuICAgIC8vIHdlIG11c3QgY2hlY2sgZm9yIE5hTiBmb3IgaWUgOC85XG4gICAgaWYgKGlzTmFOKG1hcmdpblRvcCkpICBtYXJnaW5Ub3AgID0gMFxuICAgIGlmIChpc05hTihtYXJnaW5MZWZ0KSkgbWFyZ2luTGVmdCA9IDBcblxuICAgIG9mZnNldC50b3AgICs9IG1hcmdpblRvcFxuICAgIG9mZnNldC5sZWZ0ICs9IG1hcmdpbkxlZnRcblxuICAgIC8vICQuZm4ub2Zmc2V0IGRvZXNuJ3Qgcm91bmQgcGl4ZWwgdmFsdWVzXG4gICAgLy8gc28gd2UgdXNlIHNldE9mZnNldCBkaXJlY3RseSB3aXRoIG91ciBvd24gZnVuY3Rpb24gQi0wXG4gICAgJC5vZmZzZXQuc2V0T2Zmc2V0KCR0aXBbMF0sICQuZXh0ZW5kKHtcbiAgICAgIHVzaW5nOiBmdW5jdGlvbiAocHJvcHMpIHtcbiAgICAgICAgJHRpcC5jc3Moe1xuICAgICAgICAgIHRvcDogTWF0aC5yb3VuZChwcm9wcy50b3ApLFxuICAgICAgICAgIGxlZnQ6IE1hdGgucm91bmQocHJvcHMubGVmdClcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9LCBvZmZzZXQpLCAwKVxuXG4gICAgJHRpcC5hZGRDbGFzcygnaW4nKVxuXG4gICAgLy8gY2hlY2sgdG8gc2VlIGlmIHBsYWNpbmcgdGlwIGluIG5ldyBvZmZzZXQgY2F1c2VkIHRoZSB0aXAgdG8gcmVzaXplIGl0c2VsZlxuICAgIHZhciBhY3R1YWxXaWR0aCAgPSAkdGlwWzBdLm9mZnNldFdpZHRoXG4gICAgdmFyIGFjdHVhbEhlaWdodCA9ICR0aXBbMF0ub2Zmc2V0SGVpZ2h0XG5cbiAgICBpZiAocGxhY2VtZW50ID09ICd0b3AnICYmIGFjdHVhbEhlaWdodCAhPSBoZWlnaHQpIHtcbiAgICAgIG9mZnNldC50b3AgPSBvZmZzZXQudG9wICsgaGVpZ2h0IC0gYWN0dWFsSGVpZ2h0XG4gICAgfVxuXG4gICAgdmFyIGRlbHRhID0gdGhpcy5nZXRWaWV3cG9ydEFkanVzdGVkRGVsdGEocGxhY2VtZW50LCBvZmZzZXQsIGFjdHVhbFdpZHRoLCBhY3R1YWxIZWlnaHQpXG5cbiAgICBpZiAoZGVsdGEubGVmdCkgb2Zmc2V0LmxlZnQgKz0gZGVsdGEubGVmdFxuICAgIGVsc2Ugb2Zmc2V0LnRvcCArPSBkZWx0YS50b3BcblxuICAgIHZhciBpc1ZlcnRpY2FsICAgICAgICAgID0gL3RvcHxib3R0b20vLnRlc3QocGxhY2VtZW50KVxuICAgIHZhciBhcnJvd0RlbHRhICAgICAgICAgID0gaXNWZXJ0aWNhbCA/IGRlbHRhLmxlZnQgKiAyIC0gd2lkdGggKyBhY3R1YWxXaWR0aCA6IGRlbHRhLnRvcCAqIDIgLSBoZWlnaHQgKyBhY3R1YWxIZWlnaHRcbiAgICB2YXIgYXJyb3dPZmZzZXRQb3NpdGlvbiA9IGlzVmVydGljYWwgPyAnb2Zmc2V0V2lkdGgnIDogJ29mZnNldEhlaWdodCdcblxuICAgICR0aXAub2Zmc2V0KG9mZnNldClcbiAgICB0aGlzLnJlcGxhY2VBcnJvdyhhcnJvd0RlbHRhLCAkdGlwWzBdW2Fycm93T2Zmc2V0UG9zaXRpb25dLCBpc1ZlcnRpY2FsKVxuICB9XG5cbiAgVG9vbHRpcC5wcm90b3R5cGUucmVwbGFjZUFycm93ID0gZnVuY3Rpb24gKGRlbHRhLCBkaW1lbnNpb24sIGlzVmVydGljYWwpIHtcbiAgICB0aGlzLmFycm93KClcbiAgICAgIC5jc3MoaXNWZXJ0aWNhbCA/ICdsZWZ0JyA6ICd0b3AnLCA1MCAqICgxIC0gZGVsdGEgLyBkaW1lbnNpb24pICsgJyUnKVxuICAgICAgLmNzcyhpc1ZlcnRpY2FsID8gJ3RvcCcgOiAnbGVmdCcsICcnKVxuICB9XG5cbiAgVG9vbHRpcC5wcm90b3R5cGUuc2V0Q29udGVudCA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgJHRpcCAgPSB0aGlzLnRpcCgpXG4gICAgdmFyIHRpdGxlID0gdGhpcy5nZXRUaXRsZSgpXG5cbiAgICAkdGlwLmZpbmQoJy50b29sdGlwLWlubmVyJylbdGhpcy5vcHRpb25zLmh0bWwgPyAnaHRtbCcgOiAndGV4dCddKHRpdGxlKVxuICAgICR0aXAucmVtb3ZlQ2xhc3MoJ2ZhZGUgaW4gdG9wIGJvdHRvbSBsZWZ0IHJpZ2h0JylcbiAgfVxuXG4gIFRvb2x0aXAucHJvdG90eXBlLmhpZGUgPSBmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgICB2YXIgdGhhdCA9IHRoaXNcbiAgICB2YXIgJHRpcCA9ICQodGhpcy4kdGlwKVxuICAgIHZhciBlICAgID0gJC5FdmVudCgnaGlkZS5icy4nICsgdGhpcy50eXBlKVxuXG4gICAgZnVuY3Rpb24gY29tcGxldGUoKSB7XG4gICAgICBpZiAodGhhdC5ob3ZlclN0YXRlICE9ICdpbicpICR0aXAuZGV0YWNoKClcbiAgICAgIGlmICh0aGF0LiRlbGVtZW50KSB7IC8vIFRPRE86IENoZWNrIHdoZXRoZXIgZ3VhcmRpbmcgdGhpcyBjb2RlIHdpdGggdGhpcyBgaWZgIGlzIHJlYWxseSBuZWNlc3NhcnkuXG4gICAgICAgIHRoYXQuJGVsZW1lbnRcbiAgICAgICAgICAucmVtb3ZlQXR0cignYXJpYS1kZXNjcmliZWRieScpXG4gICAgICAgICAgLnRyaWdnZXIoJ2hpZGRlbi5icy4nICsgdGhhdC50eXBlKVxuICAgICAgfVxuICAgICAgY2FsbGJhY2sgJiYgY2FsbGJhY2soKVxuICAgIH1cblxuICAgIHRoaXMuJGVsZW1lbnQudHJpZ2dlcihlKVxuXG4gICAgaWYgKGUuaXNEZWZhdWx0UHJldmVudGVkKCkpIHJldHVyblxuXG4gICAgJHRpcC5yZW1vdmVDbGFzcygnaW4nKVxuXG4gICAgJC5zdXBwb3J0LnRyYW5zaXRpb24gJiYgJHRpcC5oYXNDbGFzcygnZmFkZScpID9cbiAgICAgICR0aXBcbiAgICAgICAgLm9uZSgnYnNUcmFuc2l0aW9uRW5kJywgY29tcGxldGUpXG4gICAgICAgIC5lbXVsYXRlVHJhbnNpdGlvbkVuZChUb29sdGlwLlRSQU5TSVRJT05fRFVSQVRJT04pIDpcbiAgICAgIGNvbXBsZXRlKClcblxuICAgIHRoaXMuaG92ZXJTdGF0ZSA9IG51bGxcblxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICBUb29sdGlwLnByb3RvdHlwZS5maXhUaXRsZSA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgJGUgPSB0aGlzLiRlbGVtZW50XG4gICAgaWYgKCRlLmF0dHIoJ3RpdGxlJykgfHwgdHlwZW9mICRlLmF0dHIoJ2RhdGEtb3JpZ2luYWwtdGl0bGUnKSAhPSAnc3RyaW5nJykge1xuICAgICAgJGUuYXR0cignZGF0YS1vcmlnaW5hbC10aXRsZScsICRlLmF0dHIoJ3RpdGxlJykgfHwgJycpLmF0dHIoJ3RpdGxlJywgJycpXG4gICAgfVxuICB9XG5cbiAgVG9vbHRpcC5wcm90b3R5cGUuaGFzQ29udGVudCA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRUaXRsZSgpXG4gIH1cblxuICBUb29sdGlwLnByb3RvdHlwZS5nZXRQb3NpdGlvbiA9IGZ1bmN0aW9uICgkZWxlbWVudCkge1xuICAgICRlbGVtZW50ICAgPSAkZWxlbWVudCB8fCB0aGlzLiRlbGVtZW50XG5cbiAgICB2YXIgZWwgICAgID0gJGVsZW1lbnRbMF1cbiAgICB2YXIgaXNCb2R5ID0gZWwudGFnTmFtZSA9PSAnQk9EWSdcblxuICAgIHZhciBlbFJlY3QgICAgPSBlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuICAgIGlmIChlbFJlY3Qud2lkdGggPT0gbnVsbCkge1xuICAgICAgLy8gd2lkdGggYW5kIGhlaWdodCBhcmUgbWlzc2luZyBpbiBJRTgsIHNvIGNvbXB1dGUgdGhlbSBtYW51YWxseTsgc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS90d2JzL2Jvb3RzdHJhcC9pc3N1ZXMvMTQwOTNcbiAgICAgIGVsUmVjdCA9ICQuZXh0ZW5kKHt9LCBlbFJlY3QsIHsgd2lkdGg6IGVsUmVjdC5yaWdodCAtIGVsUmVjdC5sZWZ0LCBoZWlnaHQ6IGVsUmVjdC5ib3R0b20gLSBlbFJlY3QudG9wIH0pXG4gICAgfVxuICAgIHZhciBpc1N2ZyA9IHdpbmRvdy5TVkdFbGVtZW50ICYmIGVsIGluc3RhbmNlb2Ygd2luZG93LlNWR0VsZW1lbnRcbiAgICAvLyBBdm9pZCB1c2luZyAkLm9mZnNldCgpIG9uIFNWR3Mgc2luY2UgaXQgZ2l2ZXMgaW5jb3JyZWN0IHJlc3VsdHMgaW4galF1ZXJ5IDMuXG4gICAgLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS90d2JzL2Jvb3RzdHJhcC9pc3N1ZXMvMjAyODBcbiAgICB2YXIgZWxPZmZzZXQgID0gaXNCb2R5ID8geyB0b3A6IDAsIGxlZnQ6IDAgfSA6IChpc1N2ZyA/IG51bGwgOiAkZWxlbWVudC5vZmZzZXQoKSlcbiAgICB2YXIgc2Nyb2xsICAgID0geyBzY3JvbGw6IGlzQm9keSA/IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3AgfHwgZG9jdW1lbnQuYm9keS5zY3JvbGxUb3AgOiAkZWxlbWVudC5zY3JvbGxUb3AoKSB9XG4gICAgdmFyIG91dGVyRGltcyA9IGlzQm9keSA/IHsgd2lkdGg6ICQod2luZG93KS53aWR0aCgpLCBoZWlnaHQ6ICQod2luZG93KS5oZWlnaHQoKSB9IDogbnVsbFxuXG4gICAgcmV0dXJuICQuZXh0ZW5kKHt9LCBlbFJlY3QsIHNjcm9sbCwgb3V0ZXJEaW1zLCBlbE9mZnNldClcbiAgfVxuXG4gIFRvb2x0aXAucHJvdG90eXBlLmdldENhbGN1bGF0ZWRPZmZzZXQgPSBmdW5jdGlvbiAocGxhY2VtZW50LCBwb3MsIGFjdHVhbFdpZHRoLCBhY3R1YWxIZWlnaHQpIHtcbiAgICByZXR1cm4gcGxhY2VtZW50ID09ICdib3R0b20nID8geyB0b3A6IHBvcy50b3AgKyBwb3MuaGVpZ2h0LCAgIGxlZnQ6IHBvcy5sZWZ0ICsgcG9zLndpZHRoIC8gMiAtIGFjdHVhbFdpZHRoIC8gMiB9IDpcbiAgICAgICAgICAgcGxhY2VtZW50ID09ICd0b3AnICAgID8geyB0b3A6IHBvcy50b3AgLSBhY3R1YWxIZWlnaHQsIGxlZnQ6IHBvcy5sZWZ0ICsgcG9zLndpZHRoIC8gMiAtIGFjdHVhbFdpZHRoIC8gMiB9IDpcbiAgICAgICAgICAgcGxhY2VtZW50ID09ICdsZWZ0JyAgID8geyB0b3A6IHBvcy50b3AgKyBwb3MuaGVpZ2h0IC8gMiAtIGFjdHVhbEhlaWdodCAvIDIsIGxlZnQ6IHBvcy5sZWZ0IC0gYWN0dWFsV2lkdGggfSA6XG4gICAgICAgIC8qIHBsYWNlbWVudCA9PSAncmlnaHQnICovIHsgdG9wOiBwb3MudG9wICsgcG9zLmhlaWdodCAvIDIgLSBhY3R1YWxIZWlnaHQgLyAyLCBsZWZ0OiBwb3MubGVmdCArIHBvcy53aWR0aCB9XG5cbiAgfVxuXG4gIFRvb2x0aXAucHJvdG90eXBlLmdldFZpZXdwb3J0QWRqdXN0ZWREZWx0YSA9IGZ1bmN0aW9uIChwbGFjZW1lbnQsIHBvcywgYWN0dWFsV2lkdGgsIGFjdHVhbEhlaWdodCkge1xuICAgIHZhciBkZWx0YSA9IHsgdG9wOiAwLCBsZWZ0OiAwIH1cbiAgICBpZiAoIXRoaXMuJHZpZXdwb3J0KSByZXR1cm4gZGVsdGFcblxuICAgIHZhciB2aWV3cG9ydFBhZGRpbmcgPSB0aGlzLm9wdGlvbnMudmlld3BvcnQgJiYgdGhpcy5vcHRpb25zLnZpZXdwb3J0LnBhZGRpbmcgfHwgMFxuICAgIHZhciB2aWV3cG9ydERpbWVuc2lvbnMgPSB0aGlzLmdldFBvc2l0aW9uKHRoaXMuJHZpZXdwb3J0KVxuXG4gICAgaWYgKC9yaWdodHxsZWZ0Ly50ZXN0KHBsYWNlbWVudCkpIHtcbiAgICAgIHZhciB0b3BFZGdlT2Zmc2V0ICAgID0gcG9zLnRvcCAtIHZpZXdwb3J0UGFkZGluZyAtIHZpZXdwb3J0RGltZW5zaW9ucy5zY3JvbGxcbiAgICAgIHZhciBib3R0b21FZGdlT2Zmc2V0ID0gcG9zLnRvcCArIHZpZXdwb3J0UGFkZGluZyAtIHZpZXdwb3J0RGltZW5zaW9ucy5zY3JvbGwgKyBhY3R1YWxIZWlnaHRcbiAgICAgIGlmICh0b3BFZGdlT2Zmc2V0IDwgdmlld3BvcnREaW1lbnNpb25zLnRvcCkgeyAvLyB0b3Agb3ZlcmZsb3dcbiAgICAgICAgZGVsdGEudG9wID0gdmlld3BvcnREaW1lbnNpb25zLnRvcCAtIHRvcEVkZ2VPZmZzZXRcbiAgICAgIH0gZWxzZSBpZiAoYm90dG9tRWRnZU9mZnNldCA+IHZpZXdwb3J0RGltZW5zaW9ucy50b3AgKyB2aWV3cG9ydERpbWVuc2lvbnMuaGVpZ2h0KSB7IC8vIGJvdHRvbSBvdmVyZmxvd1xuICAgICAgICBkZWx0YS50b3AgPSB2aWV3cG9ydERpbWVuc2lvbnMudG9wICsgdmlld3BvcnREaW1lbnNpb25zLmhlaWdodCAtIGJvdHRvbUVkZ2VPZmZzZXRcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGxlZnRFZGdlT2Zmc2V0ICA9IHBvcy5sZWZ0IC0gdmlld3BvcnRQYWRkaW5nXG4gICAgICB2YXIgcmlnaHRFZGdlT2Zmc2V0ID0gcG9zLmxlZnQgKyB2aWV3cG9ydFBhZGRpbmcgKyBhY3R1YWxXaWR0aFxuICAgICAgaWYgKGxlZnRFZGdlT2Zmc2V0IDwgdmlld3BvcnREaW1lbnNpb25zLmxlZnQpIHsgLy8gbGVmdCBvdmVyZmxvd1xuICAgICAgICBkZWx0YS5sZWZ0ID0gdmlld3BvcnREaW1lbnNpb25zLmxlZnQgLSBsZWZ0RWRnZU9mZnNldFxuICAgICAgfSBlbHNlIGlmIChyaWdodEVkZ2VPZmZzZXQgPiB2aWV3cG9ydERpbWVuc2lvbnMucmlnaHQpIHsgLy8gcmlnaHQgb3ZlcmZsb3dcbiAgICAgICAgZGVsdGEubGVmdCA9IHZpZXdwb3J0RGltZW5zaW9ucy5sZWZ0ICsgdmlld3BvcnREaW1lbnNpb25zLndpZHRoIC0gcmlnaHRFZGdlT2Zmc2V0XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGRlbHRhXG4gIH1cblxuICBUb29sdGlwLnByb3RvdHlwZS5nZXRUaXRsZSA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgdGl0bGVcbiAgICB2YXIgJGUgPSB0aGlzLiRlbGVtZW50XG4gICAgdmFyIG8gID0gdGhpcy5vcHRpb25zXG5cbiAgICB0aXRsZSA9ICRlLmF0dHIoJ2RhdGEtb3JpZ2luYWwtdGl0bGUnKVxuICAgICAgfHwgKHR5cGVvZiBvLnRpdGxlID09ICdmdW5jdGlvbicgPyBvLnRpdGxlLmNhbGwoJGVbMF0pIDogIG8udGl0bGUpXG5cbiAgICByZXR1cm4gdGl0bGVcbiAgfVxuXG4gIFRvb2x0aXAucHJvdG90eXBlLmdldFVJRCA9IGZ1bmN0aW9uIChwcmVmaXgpIHtcbiAgICBkbyBwcmVmaXggKz0gfn4oTWF0aC5yYW5kb20oKSAqIDEwMDAwMDApXG4gICAgd2hpbGUgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHByZWZpeCkpXG4gICAgcmV0dXJuIHByZWZpeFxuICB9XG5cbiAgVG9vbHRpcC5wcm90b3R5cGUudGlwID0gZnVuY3Rpb24gKCkge1xuICAgIGlmICghdGhpcy4kdGlwKSB7XG4gICAgICB0aGlzLiR0aXAgPSAkKHRoaXMub3B0aW9ucy50ZW1wbGF0ZSlcbiAgICAgIGlmICh0aGlzLiR0aXAubGVuZ3RoICE9IDEpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKHRoaXMudHlwZSArICcgYHRlbXBsYXRlYCBvcHRpb24gbXVzdCBjb25zaXN0IG9mIGV4YWN0bHkgMSB0b3AtbGV2ZWwgZWxlbWVudCEnKVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcy4kdGlwXG4gIH1cblxuICBUb29sdGlwLnByb3RvdHlwZS5hcnJvdyA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gKHRoaXMuJGFycm93ID0gdGhpcy4kYXJyb3cgfHwgdGhpcy50aXAoKS5maW5kKCcudG9vbHRpcC1hcnJvdycpKVxuICB9XG5cbiAgVG9vbHRpcC5wcm90b3R5cGUuZW5hYmxlID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZW5hYmxlZCA9IHRydWVcbiAgfVxuXG4gIFRvb2x0aXAucHJvdG90eXBlLmRpc2FibGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5lbmFibGVkID0gZmFsc2VcbiAgfVxuXG4gIFRvb2x0aXAucHJvdG90eXBlLnRvZ2dsZUVuYWJsZWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5lbmFibGVkID0gIXRoaXMuZW5hYmxlZFxuICB9XG5cbiAgVG9vbHRpcC5wcm90b3R5cGUudG9nZ2xlID0gZnVuY3Rpb24gKGUpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXNcbiAgICBpZiAoZSkge1xuICAgICAgc2VsZiA9ICQoZS5jdXJyZW50VGFyZ2V0KS5kYXRhKCdicy4nICsgdGhpcy50eXBlKVxuICAgICAgaWYgKCFzZWxmKSB7XG4gICAgICAgIHNlbGYgPSBuZXcgdGhpcy5jb25zdHJ1Y3RvcihlLmN1cnJlbnRUYXJnZXQsIHRoaXMuZ2V0RGVsZWdhdGVPcHRpb25zKCkpXG4gICAgICAgICQoZS5jdXJyZW50VGFyZ2V0KS5kYXRhKCdicy4nICsgdGhpcy50eXBlLCBzZWxmKVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChlKSB7XG4gICAgICBzZWxmLmluU3RhdGUuY2xpY2sgPSAhc2VsZi5pblN0YXRlLmNsaWNrXG4gICAgICBpZiAoc2VsZi5pc0luU3RhdGVUcnVlKCkpIHNlbGYuZW50ZXIoc2VsZilcbiAgICAgIGVsc2Ugc2VsZi5sZWF2ZShzZWxmKVxuICAgIH0gZWxzZSB7XG4gICAgICBzZWxmLnRpcCgpLmhhc0NsYXNzKCdpbicpID8gc2VsZi5sZWF2ZShzZWxmKSA6IHNlbGYuZW50ZXIoc2VsZilcbiAgICB9XG4gIH1cblxuICBUb29sdGlwLnByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciB0aGF0ID0gdGhpc1xuICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVvdXQpXG4gICAgdGhpcy5oaWRlKGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoYXQuJGVsZW1lbnQub2ZmKCcuJyArIHRoYXQudHlwZSkucmVtb3ZlRGF0YSgnYnMuJyArIHRoYXQudHlwZSlcbiAgICAgIGlmICh0aGF0LiR0aXApIHtcbiAgICAgICAgdGhhdC4kdGlwLmRldGFjaCgpXG4gICAgICB9XG4gICAgICB0aGF0LiR0aXAgPSBudWxsXG4gICAgICB0aGF0LiRhcnJvdyA9IG51bGxcbiAgICAgIHRoYXQuJHZpZXdwb3J0ID0gbnVsbFxuICAgICAgdGhhdC4kZWxlbWVudCA9IG51bGxcbiAgICB9KVxuICB9XG5cblxuICAvLyBUT09MVElQIFBMVUdJTiBERUZJTklUSU9OXG4gIC8vID09PT09PT09PT09PT09PT09PT09PT09PT1cblxuICBmdW5jdGlvbiBQbHVnaW4ob3B0aW9uKSB7XG4gICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgJHRoaXMgICA9ICQodGhpcylcbiAgICAgIHZhciBkYXRhICAgID0gJHRoaXMuZGF0YSgnYnMudG9vbHRpcCcpXG4gICAgICB2YXIgb3B0aW9ucyA9IHR5cGVvZiBvcHRpb24gPT0gJ29iamVjdCcgJiYgb3B0aW9uXG5cbiAgICAgIGlmICghZGF0YSAmJiAvZGVzdHJveXxoaWRlLy50ZXN0KG9wdGlvbikpIHJldHVyblxuICAgICAgaWYgKCFkYXRhKSAkdGhpcy5kYXRhKCdicy50b29sdGlwJywgKGRhdGEgPSBuZXcgVG9vbHRpcCh0aGlzLCBvcHRpb25zKSkpXG4gICAgICBpZiAodHlwZW9mIG9wdGlvbiA9PSAnc3RyaW5nJykgZGF0YVtvcHRpb25dKClcbiAgICB9KVxuICB9XG5cbiAgdmFyIG9sZCA9ICQuZm4udG9vbHRpcFxuXG4gICQuZm4udG9vbHRpcCAgICAgICAgICAgICA9IFBsdWdpblxuICAkLmZuLnRvb2x0aXAuQ29uc3RydWN0b3IgPSBUb29sdGlwXG5cblxuICAvLyBUT09MVElQIE5PIENPTkZMSUNUXG4gIC8vID09PT09PT09PT09PT09PT09PT1cblxuICAkLmZuLnRvb2x0aXAubm9Db25mbGljdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAkLmZuLnRvb2x0aXAgPSBvbGRcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbn0oalF1ZXJ5KTtcblxuLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKiBCb290c3RyYXA6IHBvcG92ZXIuanMgdjMuMy43XG4gKiBodHRwOi8vZ2V0Ym9vdHN0cmFwLmNvbS9qYXZhc2NyaXB0LyNwb3BvdmVyc1xuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKiBDb3B5cmlnaHQgMjAxMS0yMDE2IFR3aXR0ZXIsIEluYy5cbiAqIExpY2Vuc2VkIHVuZGVyIE1JVCAoaHR0cHM6Ly9naXRodWIuY29tL3R3YnMvYm9vdHN0cmFwL2Jsb2IvbWFzdGVyL0xJQ0VOU0UpXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuXG4rZnVuY3Rpb24gKCQpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIC8vIFBPUE9WRVIgUFVCTElDIENMQVNTIERFRklOSVRJT05cbiAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4gIHZhciBQb3BvdmVyID0gZnVuY3Rpb24gKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICB0aGlzLmluaXQoJ3BvcG92ZXInLCBlbGVtZW50LCBvcHRpb25zKVxuICB9XG5cbiAgaWYgKCEkLmZuLnRvb2x0aXApIHRocm93IG5ldyBFcnJvcignUG9wb3ZlciByZXF1aXJlcyB0b29sdGlwLmpzJylcblxuICBQb3BvdmVyLlZFUlNJT04gID0gJzMuMy43J1xuXG4gIFBvcG92ZXIuREVGQVVMVFMgPSAkLmV4dGVuZCh7fSwgJC5mbi50b29sdGlwLkNvbnN0cnVjdG9yLkRFRkFVTFRTLCB7XG4gICAgcGxhY2VtZW50OiAncmlnaHQnLFxuICAgIHRyaWdnZXI6ICdjbGljaycsXG4gICAgY29udGVudDogJycsXG4gICAgdGVtcGxhdGU6ICc8ZGl2IGNsYXNzPVwicG9wb3ZlclwiIHJvbGU9XCJ0b29sdGlwXCI+PGRpdiBjbGFzcz1cImFycm93XCI+PC9kaXY+PGgzIGNsYXNzPVwicG9wb3Zlci10aXRsZVwiPjwvaDM+PGRpdiBjbGFzcz1cInBvcG92ZXItY29udGVudFwiPjwvZGl2PjwvZGl2PidcbiAgfSlcblxuXG4gIC8vIE5PVEU6IFBPUE9WRVIgRVhURU5EUyB0b29sdGlwLmpzXG4gIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbiAgUG9wb3Zlci5wcm90b3R5cGUgPSAkLmV4dGVuZCh7fSwgJC5mbi50b29sdGlwLkNvbnN0cnVjdG9yLnByb3RvdHlwZSlcblxuICBQb3BvdmVyLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFBvcG92ZXJcblxuICBQb3BvdmVyLnByb3RvdHlwZS5nZXREZWZhdWx0cyA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gUG9wb3Zlci5ERUZBVUxUU1xuICB9XG5cbiAgUG9wb3Zlci5wcm90b3R5cGUuc2V0Q29udGVudCA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgJHRpcCAgICA9IHRoaXMudGlwKClcbiAgICB2YXIgdGl0bGUgICA9IHRoaXMuZ2V0VGl0bGUoKVxuICAgIHZhciBjb250ZW50ID0gdGhpcy5nZXRDb250ZW50KClcblxuICAgICR0aXAuZmluZCgnLnBvcG92ZXItdGl0bGUnKVt0aGlzLm9wdGlvbnMuaHRtbCA/ICdodG1sJyA6ICd0ZXh0J10odGl0bGUpXG4gICAgJHRpcC5maW5kKCcucG9wb3Zlci1jb250ZW50JykuY2hpbGRyZW4oKS5kZXRhY2goKS5lbmQoKVsgLy8gd2UgdXNlIGFwcGVuZCBmb3IgaHRtbCBvYmplY3RzIHRvIG1haW50YWluIGpzIGV2ZW50c1xuICAgICAgdGhpcy5vcHRpb25zLmh0bWwgPyAodHlwZW9mIGNvbnRlbnQgPT0gJ3N0cmluZycgPyAnaHRtbCcgOiAnYXBwZW5kJykgOiAndGV4dCdcbiAgICBdKGNvbnRlbnQpXG5cbiAgICAkdGlwLnJlbW92ZUNsYXNzKCdmYWRlIHRvcCBib3R0b20gbGVmdCByaWdodCBpbicpXG5cbiAgICAvLyBJRTggZG9lc24ndCBhY2NlcHQgaGlkaW5nIHZpYSB0aGUgYDplbXB0eWAgcHNldWRvIHNlbGVjdG9yLCB3ZSBoYXZlIHRvIGRvXG4gICAgLy8gdGhpcyBtYW51YWxseSBieSBjaGVja2luZyB0aGUgY29udGVudHMuXG4gICAgaWYgKCEkdGlwLmZpbmQoJy5wb3BvdmVyLXRpdGxlJykuaHRtbCgpKSAkdGlwLmZpbmQoJy5wb3BvdmVyLXRpdGxlJykuaGlkZSgpXG4gIH1cblxuICBQb3BvdmVyLnByb3RvdHlwZS5oYXNDb250ZW50ID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLmdldFRpdGxlKCkgfHwgdGhpcy5nZXRDb250ZW50KClcbiAgfVxuXG4gIFBvcG92ZXIucHJvdG90eXBlLmdldENvbnRlbnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyICRlID0gdGhpcy4kZWxlbWVudFxuICAgIHZhciBvICA9IHRoaXMub3B0aW9uc1xuXG4gICAgcmV0dXJuICRlLmF0dHIoJ2RhdGEtY29udGVudCcpXG4gICAgICB8fCAodHlwZW9mIG8uY29udGVudCA9PSAnZnVuY3Rpb24nID9cbiAgICAgICAgICAgIG8uY29udGVudC5jYWxsKCRlWzBdKSA6XG4gICAgICAgICAgICBvLmNvbnRlbnQpXG4gIH1cblxuICBQb3BvdmVyLnByb3RvdHlwZS5hcnJvdyA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gKHRoaXMuJGFycm93ID0gdGhpcy4kYXJyb3cgfHwgdGhpcy50aXAoKS5maW5kKCcuYXJyb3cnKSlcbiAgfVxuXG5cbiAgLy8gUE9QT1ZFUiBQTFVHSU4gREVGSU5JVElPTlxuICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09XG5cbiAgZnVuY3Rpb24gUGx1Z2luKG9wdGlvbikge1xuICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgdmFyICR0aGlzICAgPSAkKHRoaXMpXG4gICAgICB2YXIgZGF0YSAgICA9ICR0aGlzLmRhdGEoJ2JzLnBvcG92ZXInKVxuICAgICAgdmFyIG9wdGlvbnMgPSB0eXBlb2Ygb3B0aW9uID09ICdvYmplY3QnICYmIG9wdGlvblxuXG4gICAgICBpZiAoIWRhdGEgJiYgL2Rlc3Ryb3l8aGlkZS8udGVzdChvcHRpb24pKSByZXR1cm5cbiAgICAgIGlmICghZGF0YSkgJHRoaXMuZGF0YSgnYnMucG9wb3ZlcicsIChkYXRhID0gbmV3IFBvcG92ZXIodGhpcywgb3B0aW9ucykpKVxuICAgICAgaWYgKHR5cGVvZiBvcHRpb24gPT0gJ3N0cmluZycpIGRhdGFbb3B0aW9uXSgpXG4gICAgfSlcbiAgfVxuXG4gIHZhciBvbGQgPSAkLmZuLnBvcG92ZXJcblxuICAkLmZuLnBvcG92ZXIgICAgICAgICAgICAgPSBQbHVnaW5cbiAgJC5mbi5wb3BvdmVyLkNvbnN0cnVjdG9yID0gUG9wb3ZlclxuXG5cbiAgLy8gUE9QT1ZFUiBOTyBDT05GTElDVFxuICAvLyA9PT09PT09PT09PT09PT09PT09XG5cbiAgJC5mbi5wb3BvdmVyLm5vQ29uZmxpY3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgJC5mbi5wb3BvdmVyID0gb2xkXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG59KGpRdWVyeSk7XG5cbi8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICogQm9vdHN0cmFwOiBzY3JvbGxzcHkuanMgdjMuMy43XG4gKiBodHRwOi8vZ2V0Ym9vdHN0cmFwLmNvbS9qYXZhc2NyaXB0LyNzY3JvbGxzcHlcbiAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICogQ29weXJpZ2h0IDIwMTEtMjAxNiBUd2l0dGVyLCBJbmMuXG4gKiBMaWNlbnNlZCB1bmRlciBNSVQgKGh0dHBzOi8vZ2l0aHViLmNvbS90d2JzL2Jvb3RzdHJhcC9ibG9iL21hc3Rlci9MSUNFTlNFKVxuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5cblxuK2Z1bmN0aW9uICgkKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICAvLyBTQ1JPTExTUFkgQ0xBU1MgREVGSU5JVElPTlxuICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4gIGZ1bmN0aW9uIFNjcm9sbFNweShlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgdGhpcy4kYm9keSAgICAgICAgICA9ICQoZG9jdW1lbnQuYm9keSlcbiAgICB0aGlzLiRzY3JvbGxFbGVtZW50ID0gJChlbGVtZW50KS5pcyhkb2N1bWVudC5ib2R5KSA/ICQod2luZG93KSA6ICQoZWxlbWVudClcbiAgICB0aGlzLm9wdGlvbnMgICAgICAgID0gJC5leHRlbmQoe30sIFNjcm9sbFNweS5ERUZBVUxUUywgb3B0aW9ucylcbiAgICB0aGlzLnNlbGVjdG9yICAgICAgID0gKHRoaXMub3B0aW9ucy50YXJnZXQgfHwgJycpICsgJyAubmF2IGxpID4gYSdcbiAgICB0aGlzLm9mZnNldHMgICAgICAgID0gW11cbiAgICB0aGlzLnRhcmdldHMgICAgICAgID0gW11cbiAgICB0aGlzLmFjdGl2ZVRhcmdldCAgID0gbnVsbFxuICAgIHRoaXMuc2Nyb2xsSGVpZ2h0ICAgPSAwXG5cbiAgICB0aGlzLiRzY3JvbGxFbGVtZW50Lm9uKCdzY3JvbGwuYnMuc2Nyb2xsc3B5JywgJC5wcm94eSh0aGlzLnByb2Nlc3MsIHRoaXMpKVxuICAgIHRoaXMucmVmcmVzaCgpXG4gICAgdGhpcy5wcm9jZXNzKClcbiAgfVxuXG4gIFNjcm9sbFNweS5WRVJTSU9OICA9ICczLjMuNydcblxuICBTY3JvbGxTcHkuREVGQVVMVFMgPSB7XG4gICAgb2Zmc2V0OiAxMFxuICB9XG5cbiAgU2Nyb2xsU3B5LnByb3RvdHlwZS5nZXRTY3JvbGxIZWlnaHQgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuJHNjcm9sbEVsZW1lbnRbMF0uc2Nyb2xsSGVpZ2h0IHx8IE1hdGgubWF4KHRoaXMuJGJvZHlbMF0uc2Nyb2xsSGVpZ2h0LCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsSGVpZ2h0KVxuICB9XG5cbiAgU2Nyb2xsU3B5LnByb3RvdHlwZS5yZWZyZXNoID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciB0aGF0ICAgICAgICAgID0gdGhpc1xuICAgIHZhciBvZmZzZXRNZXRob2QgID0gJ29mZnNldCdcbiAgICB2YXIgb2Zmc2V0QmFzZSAgICA9IDBcblxuICAgIHRoaXMub2Zmc2V0cyAgICAgID0gW11cbiAgICB0aGlzLnRhcmdldHMgICAgICA9IFtdXG4gICAgdGhpcy5zY3JvbGxIZWlnaHQgPSB0aGlzLmdldFNjcm9sbEhlaWdodCgpXG5cbiAgICBpZiAoISQuaXNXaW5kb3codGhpcy4kc2Nyb2xsRWxlbWVudFswXSkpIHtcbiAgICAgIG9mZnNldE1ldGhvZCA9ICdwb3NpdGlvbidcbiAgICAgIG9mZnNldEJhc2UgICA9IHRoaXMuJHNjcm9sbEVsZW1lbnQuc2Nyb2xsVG9wKClcbiAgICB9XG5cbiAgICB0aGlzLiRib2R5XG4gICAgICAuZmluZCh0aGlzLnNlbGVjdG9yKVxuICAgICAgLm1hcChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciAkZWwgICA9ICQodGhpcylcbiAgICAgICAgdmFyIGhyZWYgID0gJGVsLmRhdGEoJ3RhcmdldCcpIHx8ICRlbC5hdHRyKCdocmVmJylcbiAgICAgICAgdmFyICRocmVmID0gL14jLi8udGVzdChocmVmKSAmJiAkKGhyZWYpXG5cbiAgICAgICAgcmV0dXJuICgkaHJlZlxuICAgICAgICAgICYmICRocmVmLmxlbmd0aFxuICAgICAgICAgICYmICRocmVmLmlzKCc6dmlzaWJsZScpXG4gICAgICAgICAgJiYgW1skaHJlZltvZmZzZXRNZXRob2RdKCkudG9wICsgb2Zmc2V0QmFzZSwgaHJlZl1dKSB8fCBudWxsXG4gICAgICB9KVxuICAgICAgLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHsgcmV0dXJuIGFbMF0gLSBiWzBdIH0pXG4gICAgICAuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoYXQub2Zmc2V0cy5wdXNoKHRoaXNbMF0pXG4gICAgICAgIHRoYXQudGFyZ2V0cy5wdXNoKHRoaXNbMV0pXG4gICAgICB9KVxuICB9XG5cbiAgU2Nyb2xsU3B5LnByb3RvdHlwZS5wcm9jZXNzID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBzY3JvbGxUb3AgICAgPSB0aGlzLiRzY3JvbGxFbGVtZW50LnNjcm9sbFRvcCgpICsgdGhpcy5vcHRpb25zLm9mZnNldFxuICAgIHZhciBzY3JvbGxIZWlnaHQgPSB0aGlzLmdldFNjcm9sbEhlaWdodCgpXG4gICAgdmFyIG1heFNjcm9sbCAgICA9IHRoaXMub3B0aW9ucy5vZmZzZXQgKyBzY3JvbGxIZWlnaHQgLSB0aGlzLiRzY3JvbGxFbGVtZW50LmhlaWdodCgpXG4gICAgdmFyIG9mZnNldHMgICAgICA9IHRoaXMub2Zmc2V0c1xuICAgIHZhciB0YXJnZXRzICAgICAgPSB0aGlzLnRhcmdldHNcbiAgICB2YXIgYWN0aXZlVGFyZ2V0ID0gdGhpcy5hY3RpdmVUYXJnZXRcbiAgICB2YXIgaVxuXG4gICAgaWYgKHRoaXMuc2Nyb2xsSGVpZ2h0ICE9IHNjcm9sbEhlaWdodCkge1xuICAgICAgdGhpcy5yZWZyZXNoKClcbiAgICB9XG5cbiAgICBpZiAoc2Nyb2xsVG9wID49IG1heFNjcm9sbCkge1xuICAgICAgcmV0dXJuIGFjdGl2ZVRhcmdldCAhPSAoaSA9IHRhcmdldHNbdGFyZ2V0cy5sZW5ndGggLSAxXSkgJiYgdGhpcy5hY3RpdmF0ZShpKVxuICAgIH1cblxuICAgIGlmIChhY3RpdmVUYXJnZXQgJiYgc2Nyb2xsVG9wIDwgb2Zmc2V0c1swXSkge1xuICAgICAgdGhpcy5hY3RpdmVUYXJnZXQgPSBudWxsXG4gICAgICByZXR1cm4gdGhpcy5jbGVhcigpXG4gICAgfVxuXG4gICAgZm9yIChpID0gb2Zmc2V0cy5sZW5ndGg7IGktLTspIHtcbiAgICAgIGFjdGl2ZVRhcmdldCAhPSB0YXJnZXRzW2ldXG4gICAgICAgICYmIHNjcm9sbFRvcCA+PSBvZmZzZXRzW2ldXG4gICAgICAgICYmIChvZmZzZXRzW2kgKyAxXSA9PT0gdW5kZWZpbmVkIHx8IHNjcm9sbFRvcCA8IG9mZnNldHNbaSArIDFdKVxuICAgICAgICAmJiB0aGlzLmFjdGl2YXRlKHRhcmdldHNbaV0pXG4gICAgfVxuICB9XG5cbiAgU2Nyb2xsU3B5LnByb3RvdHlwZS5hY3RpdmF0ZSA9IGZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgICB0aGlzLmFjdGl2ZVRhcmdldCA9IHRhcmdldFxuXG4gICAgdGhpcy5jbGVhcigpXG5cbiAgICB2YXIgc2VsZWN0b3IgPSB0aGlzLnNlbGVjdG9yICtcbiAgICAgICdbZGF0YS10YXJnZXQ9XCInICsgdGFyZ2V0ICsgJ1wiXSwnICtcbiAgICAgIHRoaXMuc2VsZWN0b3IgKyAnW2hyZWY9XCInICsgdGFyZ2V0ICsgJ1wiXSdcblxuICAgIHZhciBhY3RpdmUgPSAkKHNlbGVjdG9yKVxuICAgICAgLnBhcmVudHMoJ2xpJylcbiAgICAgIC5hZGRDbGFzcygnYWN0aXZlJylcblxuICAgIGlmIChhY3RpdmUucGFyZW50KCcuZHJvcGRvd24tbWVudScpLmxlbmd0aCkge1xuICAgICAgYWN0aXZlID0gYWN0aXZlXG4gICAgICAgIC5jbG9zZXN0KCdsaS5kcm9wZG93bicpXG4gICAgICAgIC5hZGRDbGFzcygnYWN0aXZlJylcbiAgICB9XG5cbiAgICBhY3RpdmUudHJpZ2dlcignYWN0aXZhdGUuYnMuc2Nyb2xsc3B5JylcbiAgfVxuXG4gIFNjcm9sbFNweS5wcm90b3R5cGUuY2xlYXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgJCh0aGlzLnNlbGVjdG9yKVxuICAgICAgLnBhcmVudHNVbnRpbCh0aGlzLm9wdGlvbnMudGFyZ2V0LCAnLmFjdGl2ZScpXG4gICAgICAucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpXG4gIH1cblxuXG4gIC8vIFNDUk9MTFNQWSBQTFVHSU4gREVGSU5JVElPTlxuICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuICBmdW5jdGlvbiBQbHVnaW4ob3B0aW9uKSB7XG4gICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgJHRoaXMgICA9ICQodGhpcylcbiAgICAgIHZhciBkYXRhICAgID0gJHRoaXMuZGF0YSgnYnMuc2Nyb2xsc3B5JylcbiAgICAgIHZhciBvcHRpb25zID0gdHlwZW9mIG9wdGlvbiA9PSAnb2JqZWN0JyAmJiBvcHRpb25cblxuICAgICAgaWYgKCFkYXRhKSAkdGhpcy5kYXRhKCdicy5zY3JvbGxzcHknLCAoZGF0YSA9IG5ldyBTY3JvbGxTcHkodGhpcywgb3B0aW9ucykpKVxuICAgICAgaWYgKHR5cGVvZiBvcHRpb24gPT0gJ3N0cmluZycpIGRhdGFbb3B0aW9uXSgpXG4gICAgfSlcbiAgfVxuXG4gIHZhciBvbGQgPSAkLmZuLnNjcm9sbHNweVxuXG4gICQuZm4uc2Nyb2xsc3B5ICAgICAgICAgICAgID0gUGx1Z2luXG4gICQuZm4uc2Nyb2xsc3B5LkNvbnN0cnVjdG9yID0gU2Nyb2xsU3B5XG5cblxuICAvLyBTQ1JPTExTUFkgTk8gQ09ORkxJQ1RcbiAgLy8gPT09PT09PT09PT09PT09PT09PT09XG5cbiAgJC5mbi5zY3JvbGxzcHkubm9Db25mbGljdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAkLmZuLnNjcm9sbHNweSA9IG9sZFxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuXG4gIC8vIFNDUk9MTFNQWSBEQVRBLUFQSVxuICAvLyA9PT09PT09PT09PT09PT09PT1cblxuICAkKHdpbmRvdykub24oJ2xvYWQuYnMuc2Nyb2xsc3B5LmRhdGEtYXBpJywgZnVuY3Rpb24gKCkge1xuICAgICQoJ1tkYXRhLXNweT1cInNjcm9sbFwiXScpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgdmFyICRzcHkgPSAkKHRoaXMpXG4gICAgICBQbHVnaW4uY2FsbCgkc3B5LCAkc3B5LmRhdGEoKSlcbiAgICB9KVxuICB9KVxuXG59KGpRdWVyeSk7XG5cbi8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICogQm9vdHN0cmFwOiB0YWIuanMgdjMuMy43XG4gKiBodHRwOi8vZ2V0Ym9vdHN0cmFwLmNvbS9qYXZhc2NyaXB0LyN0YWJzXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqIENvcHlyaWdodCAyMDExLTIwMTYgVHdpdHRlciwgSW5jLlxuICogTGljZW5zZWQgdW5kZXIgTUlUIChodHRwczovL2dpdGh1Yi5jb20vdHdicy9ib290c3RyYXAvYmxvYi9tYXN0ZXIvTElDRU5TRSlcbiAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXG5cbitmdW5jdGlvbiAoJCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgLy8gVEFCIENMQVNTIERFRklOSVRJT05cbiAgLy8gPT09PT09PT09PT09PT09PT09PT1cblxuICB2YXIgVGFiID0gZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAvLyBqc2NzOmRpc2FibGUgcmVxdWlyZURvbGxhckJlZm9yZWpRdWVyeUFzc2lnbm1lbnRcbiAgICB0aGlzLmVsZW1lbnQgPSAkKGVsZW1lbnQpXG4gICAgLy8ganNjczplbmFibGUgcmVxdWlyZURvbGxhckJlZm9yZWpRdWVyeUFzc2lnbm1lbnRcbiAgfVxuXG4gIFRhYi5WRVJTSU9OID0gJzMuMy43J1xuXG4gIFRhYi5UUkFOU0lUSU9OX0RVUkFUSU9OID0gMTUwXG5cbiAgVGFiLnByb3RvdHlwZS5zaG93ID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciAkdGhpcyAgICA9IHRoaXMuZWxlbWVudFxuICAgIHZhciAkdWwgICAgICA9ICR0aGlzLmNsb3Nlc3QoJ3VsOm5vdCguZHJvcGRvd24tbWVudSknKVxuICAgIHZhciBzZWxlY3RvciA9ICR0aGlzLmRhdGEoJ3RhcmdldCcpXG5cbiAgICBpZiAoIXNlbGVjdG9yKSB7XG4gICAgICBzZWxlY3RvciA9ICR0aGlzLmF0dHIoJ2hyZWYnKVxuICAgICAgc2VsZWN0b3IgPSBzZWxlY3RvciAmJiBzZWxlY3Rvci5yZXBsYWNlKC8uKig/PSNbXlxcc10qJCkvLCAnJykgLy8gc3RyaXAgZm9yIGllN1xuICAgIH1cblxuICAgIGlmICgkdGhpcy5wYXJlbnQoJ2xpJykuaGFzQ2xhc3MoJ2FjdGl2ZScpKSByZXR1cm5cblxuICAgIHZhciAkcHJldmlvdXMgPSAkdWwuZmluZCgnLmFjdGl2ZTpsYXN0IGEnKVxuICAgIHZhciBoaWRlRXZlbnQgPSAkLkV2ZW50KCdoaWRlLmJzLnRhYicsIHtcbiAgICAgIHJlbGF0ZWRUYXJnZXQ6ICR0aGlzWzBdXG4gICAgfSlcbiAgICB2YXIgc2hvd0V2ZW50ID0gJC5FdmVudCgnc2hvdy5icy50YWInLCB7XG4gICAgICByZWxhdGVkVGFyZ2V0OiAkcHJldmlvdXNbMF1cbiAgICB9KVxuXG4gICAgJHByZXZpb3VzLnRyaWdnZXIoaGlkZUV2ZW50KVxuICAgICR0aGlzLnRyaWdnZXIoc2hvd0V2ZW50KVxuXG4gICAgaWYgKHNob3dFdmVudC5pc0RlZmF1bHRQcmV2ZW50ZWQoKSB8fCBoaWRlRXZlbnQuaXNEZWZhdWx0UHJldmVudGVkKCkpIHJldHVyblxuXG4gICAgdmFyICR0YXJnZXQgPSAkKHNlbGVjdG9yKVxuXG4gICAgdGhpcy5hY3RpdmF0ZSgkdGhpcy5jbG9zZXN0KCdsaScpLCAkdWwpXG4gICAgdGhpcy5hY3RpdmF0ZSgkdGFyZ2V0LCAkdGFyZ2V0LnBhcmVudCgpLCBmdW5jdGlvbiAoKSB7XG4gICAgICAkcHJldmlvdXMudHJpZ2dlcih7XG4gICAgICAgIHR5cGU6ICdoaWRkZW4uYnMudGFiJyxcbiAgICAgICAgcmVsYXRlZFRhcmdldDogJHRoaXNbMF1cbiAgICAgIH0pXG4gICAgICAkdGhpcy50cmlnZ2VyKHtcbiAgICAgICAgdHlwZTogJ3Nob3duLmJzLnRhYicsXG4gICAgICAgIHJlbGF0ZWRUYXJnZXQ6ICRwcmV2aW91c1swXVxuICAgICAgfSlcbiAgICB9KVxuICB9XG5cbiAgVGFiLnByb3RvdHlwZS5hY3RpdmF0ZSA9IGZ1bmN0aW9uIChlbGVtZW50LCBjb250YWluZXIsIGNhbGxiYWNrKSB7XG4gICAgdmFyICRhY3RpdmUgICAgPSBjb250YWluZXIuZmluZCgnPiAuYWN0aXZlJylcbiAgICB2YXIgdHJhbnNpdGlvbiA9IGNhbGxiYWNrXG4gICAgICAmJiAkLnN1cHBvcnQudHJhbnNpdGlvblxuICAgICAgJiYgKCRhY3RpdmUubGVuZ3RoICYmICRhY3RpdmUuaGFzQ2xhc3MoJ2ZhZGUnKSB8fCAhIWNvbnRhaW5lci5maW5kKCc+IC5mYWRlJykubGVuZ3RoKVxuXG4gICAgZnVuY3Rpb24gbmV4dCgpIHtcbiAgICAgICRhY3RpdmVcbiAgICAgICAgLnJlbW92ZUNsYXNzKCdhY3RpdmUnKVxuICAgICAgICAuZmluZCgnPiAuZHJvcGRvd24tbWVudSA+IC5hY3RpdmUnKVxuICAgICAgICAgIC5yZW1vdmVDbGFzcygnYWN0aXZlJylcbiAgICAgICAgLmVuZCgpXG4gICAgICAgIC5maW5kKCdbZGF0YS10b2dnbGU9XCJ0YWJcIl0nKVxuICAgICAgICAgIC5hdHRyKCdhcmlhLWV4cGFuZGVkJywgZmFsc2UpXG5cbiAgICAgIGVsZW1lbnRcbiAgICAgICAgLmFkZENsYXNzKCdhY3RpdmUnKVxuICAgICAgICAuZmluZCgnW2RhdGEtdG9nZ2xlPVwidGFiXCJdJylcbiAgICAgICAgICAuYXR0cignYXJpYS1leHBhbmRlZCcsIHRydWUpXG5cbiAgICAgIGlmICh0cmFuc2l0aW9uKSB7XG4gICAgICAgIGVsZW1lbnRbMF0ub2Zmc2V0V2lkdGggLy8gcmVmbG93IGZvciB0cmFuc2l0aW9uXG4gICAgICAgIGVsZW1lbnQuYWRkQ2xhc3MoJ2luJylcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGVsZW1lbnQucmVtb3ZlQ2xhc3MoJ2ZhZGUnKVxuICAgICAgfVxuXG4gICAgICBpZiAoZWxlbWVudC5wYXJlbnQoJy5kcm9wZG93bi1tZW51JykubGVuZ3RoKSB7XG4gICAgICAgIGVsZW1lbnRcbiAgICAgICAgICAuY2xvc2VzdCgnbGkuZHJvcGRvd24nKVxuICAgICAgICAgICAgLmFkZENsYXNzKCdhY3RpdmUnKVxuICAgICAgICAgIC5lbmQoKVxuICAgICAgICAgIC5maW5kKCdbZGF0YS10b2dnbGU9XCJ0YWJcIl0nKVxuICAgICAgICAgICAgLmF0dHIoJ2FyaWEtZXhwYW5kZWQnLCB0cnVlKVxuICAgICAgfVxuXG4gICAgICBjYWxsYmFjayAmJiBjYWxsYmFjaygpXG4gICAgfVxuXG4gICAgJGFjdGl2ZS5sZW5ndGggJiYgdHJhbnNpdGlvbiA/XG4gICAgICAkYWN0aXZlXG4gICAgICAgIC5vbmUoJ2JzVHJhbnNpdGlvbkVuZCcsIG5leHQpXG4gICAgICAgIC5lbXVsYXRlVHJhbnNpdGlvbkVuZChUYWIuVFJBTlNJVElPTl9EVVJBVElPTikgOlxuICAgICAgbmV4dCgpXG5cbiAgICAkYWN0aXZlLnJlbW92ZUNsYXNzKCdpbicpXG4gIH1cblxuXG4gIC8vIFRBQiBQTFVHSU4gREVGSU5JVElPTlxuICAvLyA9PT09PT09PT09PT09PT09PT09PT1cblxuICBmdW5jdGlvbiBQbHVnaW4ob3B0aW9uKSB7XG4gICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgJHRoaXMgPSAkKHRoaXMpXG4gICAgICB2YXIgZGF0YSAgPSAkdGhpcy5kYXRhKCdicy50YWInKVxuXG4gICAgICBpZiAoIWRhdGEpICR0aGlzLmRhdGEoJ2JzLnRhYicsIChkYXRhID0gbmV3IFRhYih0aGlzKSkpXG4gICAgICBpZiAodHlwZW9mIG9wdGlvbiA9PSAnc3RyaW5nJykgZGF0YVtvcHRpb25dKClcbiAgICB9KVxuICB9XG5cbiAgdmFyIG9sZCA9ICQuZm4udGFiXG5cbiAgJC5mbi50YWIgICAgICAgICAgICAgPSBQbHVnaW5cbiAgJC5mbi50YWIuQ29uc3RydWN0b3IgPSBUYWJcblxuXG4gIC8vIFRBQiBOTyBDT05GTElDVFxuICAvLyA9PT09PT09PT09PT09PT1cblxuICAkLmZuLnRhYi5ub0NvbmZsaWN0ID0gZnVuY3Rpb24gKCkge1xuICAgICQuZm4udGFiID0gb2xkXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG5cbiAgLy8gVEFCIERBVEEtQVBJXG4gIC8vID09PT09PT09PT09PVxuXG4gIHZhciBjbGlja0hhbmRsZXIgPSBmdW5jdGlvbiAoZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgIFBsdWdpbi5jYWxsKCQodGhpcyksICdzaG93JylcbiAgfVxuXG4gICQoZG9jdW1lbnQpXG4gICAgLm9uKCdjbGljay5icy50YWIuZGF0YS1hcGknLCAnW2RhdGEtdG9nZ2xlPVwidGFiXCJdJywgY2xpY2tIYW5kbGVyKVxuICAgIC5vbignY2xpY2suYnMudGFiLmRhdGEtYXBpJywgJ1tkYXRhLXRvZ2dsZT1cInBpbGxcIl0nLCBjbGlja0hhbmRsZXIpXG5cbn0oalF1ZXJ5KTtcblxuLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKiBCb290c3RyYXA6IGFmZml4LmpzIHYzLjMuN1xuICogaHR0cDovL2dldGJvb3RzdHJhcC5jb20vamF2YXNjcmlwdC8jYWZmaXhcbiAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICogQ29weXJpZ2h0IDIwMTEtMjAxNiBUd2l0dGVyLCBJbmMuXG4gKiBMaWNlbnNlZCB1bmRlciBNSVQgKGh0dHBzOi8vZ2l0aHViLmNvbS90d2JzL2Jvb3RzdHJhcC9ibG9iL21hc3Rlci9MSUNFTlNFKVxuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5cblxuK2Z1bmN0aW9uICgkKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICAvLyBBRkZJWCBDTEFTUyBERUZJTklUSU9OXG4gIC8vID09PT09PT09PT09PT09PT09PT09PT1cblxuICB2YXIgQWZmaXggPSBmdW5jdGlvbiAoZWxlbWVudCwgb3B0aW9ucykge1xuICAgIHRoaXMub3B0aW9ucyA9ICQuZXh0ZW5kKHt9LCBBZmZpeC5ERUZBVUxUUywgb3B0aW9ucylcblxuICAgIHRoaXMuJHRhcmdldCA9ICQodGhpcy5vcHRpb25zLnRhcmdldClcbiAgICAgIC5vbignc2Nyb2xsLmJzLmFmZml4LmRhdGEtYXBpJywgJC5wcm94eSh0aGlzLmNoZWNrUG9zaXRpb24sIHRoaXMpKVxuICAgICAgLm9uKCdjbGljay5icy5hZmZpeC5kYXRhLWFwaScsICAkLnByb3h5KHRoaXMuY2hlY2tQb3NpdGlvbldpdGhFdmVudExvb3AsIHRoaXMpKVxuXG4gICAgdGhpcy4kZWxlbWVudCAgICAgPSAkKGVsZW1lbnQpXG4gICAgdGhpcy5hZmZpeGVkICAgICAgPSBudWxsXG4gICAgdGhpcy51bnBpbiAgICAgICAgPSBudWxsXG4gICAgdGhpcy5waW5uZWRPZmZzZXQgPSBudWxsXG5cbiAgICB0aGlzLmNoZWNrUG9zaXRpb24oKVxuICB9XG5cbiAgQWZmaXguVkVSU0lPTiAgPSAnMy4zLjcnXG5cbiAgQWZmaXguUkVTRVQgICAgPSAnYWZmaXggYWZmaXgtdG9wIGFmZml4LWJvdHRvbSdcblxuICBBZmZpeC5ERUZBVUxUUyA9IHtcbiAgICBvZmZzZXQ6IDAsXG4gICAgdGFyZ2V0OiB3aW5kb3dcbiAgfVxuXG4gIEFmZml4LnByb3RvdHlwZS5nZXRTdGF0ZSA9IGZ1bmN0aW9uIChzY3JvbGxIZWlnaHQsIGhlaWdodCwgb2Zmc2V0VG9wLCBvZmZzZXRCb3R0b20pIHtcbiAgICB2YXIgc2Nyb2xsVG9wICAgID0gdGhpcy4kdGFyZ2V0LnNjcm9sbFRvcCgpXG4gICAgdmFyIHBvc2l0aW9uICAgICA9IHRoaXMuJGVsZW1lbnQub2Zmc2V0KClcbiAgICB2YXIgdGFyZ2V0SGVpZ2h0ID0gdGhpcy4kdGFyZ2V0LmhlaWdodCgpXG5cbiAgICBpZiAob2Zmc2V0VG9wICE9IG51bGwgJiYgdGhpcy5hZmZpeGVkID09ICd0b3AnKSByZXR1cm4gc2Nyb2xsVG9wIDwgb2Zmc2V0VG9wID8gJ3RvcCcgOiBmYWxzZVxuXG4gICAgaWYgKHRoaXMuYWZmaXhlZCA9PSAnYm90dG9tJykge1xuICAgICAgaWYgKG9mZnNldFRvcCAhPSBudWxsKSByZXR1cm4gKHNjcm9sbFRvcCArIHRoaXMudW5waW4gPD0gcG9zaXRpb24udG9wKSA/IGZhbHNlIDogJ2JvdHRvbSdcbiAgICAgIHJldHVybiAoc2Nyb2xsVG9wICsgdGFyZ2V0SGVpZ2h0IDw9IHNjcm9sbEhlaWdodCAtIG9mZnNldEJvdHRvbSkgPyBmYWxzZSA6ICdib3R0b20nXG4gICAgfVxuXG4gICAgdmFyIGluaXRpYWxpemluZyAgID0gdGhpcy5hZmZpeGVkID09IG51bGxcbiAgICB2YXIgY29sbGlkZXJUb3AgICAgPSBpbml0aWFsaXppbmcgPyBzY3JvbGxUb3AgOiBwb3NpdGlvbi50b3BcbiAgICB2YXIgY29sbGlkZXJIZWlnaHQgPSBpbml0aWFsaXppbmcgPyB0YXJnZXRIZWlnaHQgOiBoZWlnaHRcblxuICAgIGlmIChvZmZzZXRUb3AgIT0gbnVsbCAmJiBzY3JvbGxUb3AgPD0gb2Zmc2V0VG9wKSByZXR1cm4gJ3RvcCdcbiAgICBpZiAob2Zmc2V0Qm90dG9tICE9IG51bGwgJiYgKGNvbGxpZGVyVG9wICsgY29sbGlkZXJIZWlnaHQgPj0gc2Nyb2xsSGVpZ2h0IC0gb2Zmc2V0Qm90dG9tKSkgcmV0dXJuICdib3R0b20nXG5cbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuXG4gIEFmZml4LnByb3RvdHlwZS5nZXRQaW5uZWRPZmZzZXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHRoaXMucGlubmVkT2Zmc2V0KSByZXR1cm4gdGhpcy5waW5uZWRPZmZzZXRcbiAgICB0aGlzLiRlbGVtZW50LnJlbW92ZUNsYXNzKEFmZml4LlJFU0VUKS5hZGRDbGFzcygnYWZmaXgnKVxuICAgIHZhciBzY3JvbGxUb3AgPSB0aGlzLiR0YXJnZXQuc2Nyb2xsVG9wKClcbiAgICB2YXIgcG9zaXRpb24gID0gdGhpcy4kZWxlbWVudC5vZmZzZXQoKVxuICAgIHJldHVybiAodGhpcy5waW5uZWRPZmZzZXQgPSBwb3NpdGlvbi50b3AgLSBzY3JvbGxUb3ApXG4gIH1cblxuICBBZmZpeC5wcm90b3R5cGUuY2hlY2tQb3NpdGlvbldpdGhFdmVudExvb3AgPSBmdW5jdGlvbiAoKSB7XG4gICAgc2V0VGltZW91dCgkLnByb3h5KHRoaXMuY2hlY2tQb3NpdGlvbiwgdGhpcyksIDEpXG4gIH1cblxuICBBZmZpeC5wcm90b3R5cGUuY2hlY2tQb3NpdGlvbiA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoIXRoaXMuJGVsZW1lbnQuaXMoJzp2aXNpYmxlJykpIHJldHVyblxuXG4gICAgdmFyIGhlaWdodCAgICAgICA9IHRoaXMuJGVsZW1lbnQuaGVpZ2h0KClcbiAgICB2YXIgb2Zmc2V0ICAgICAgID0gdGhpcy5vcHRpb25zLm9mZnNldFxuICAgIHZhciBvZmZzZXRUb3AgICAgPSBvZmZzZXQudG9wXG4gICAgdmFyIG9mZnNldEJvdHRvbSA9IG9mZnNldC5ib3R0b21cbiAgICB2YXIgc2Nyb2xsSGVpZ2h0ID0gTWF0aC5tYXgoJChkb2N1bWVudCkuaGVpZ2h0KCksICQoZG9jdW1lbnQuYm9keSkuaGVpZ2h0KCkpXG5cbiAgICBpZiAodHlwZW9mIG9mZnNldCAhPSAnb2JqZWN0JykgICAgICAgICBvZmZzZXRCb3R0b20gPSBvZmZzZXRUb3AgPSBvZmZzZXRcbiAgICBpZiAodHlwZW9mIG9mZnNldFRvcCA9PSAnZnVuY3Rpb24nKSAgICBvZmZzZXRUb3AgICAgPSBvZmZzZXQudG9wKHRoaXMuJGVsZW1lbnQpXG4gICAgaWYgKHR5cGVvZiBvZmZzZXRCb3R0b20gPT0gJ2Z1bmN0aW9uJykgb2Zmc2V0Qm90dG9tID0gb2Zmc2V0LmJvdHRvbSh0aGlzLiRlbGVtZW50KVxuXG4gICAgdmFyIGFmZml4ID0gdGhpcy5nZXRTdGF0ZShzY3JvbGxIZWlnaHQsIGhlaWdodCwgb2Zmc2V0VG9wLCBvZmZzZXRCb3R0b20pXG5cbiAgICBpZiAodGhpcy5hZmZpeGVkICE9IGFmZml4KSB7XG4gICAgICBpZiAodGhpcy51bnBpbiAhPSBudWxsKSB0aGlzLiRlbGVtZW50LmNzcygndG9wJywgJycpXG5cbiAgICAgIHZhciBhZmZpeFR5cGUgPSAnYWZmaXgnICsgKGFmZml4ID8gJy0nICsgYWZmaXggOiAnJylcbiAgICAgIHZhciBlICAgICAgICAgPSAkLkV2ZW50KGFmZml4VHlwZSArICcuYnMuYWZmaXgnKVxuXG4gICAgICB0aGlzLiRlbGVtZW50LnRyaWdnZXIoZSlcblxuICAgICAgaWYgKGUuaXNEZWZhdWx0UHJldmVudGVkKCkpIHJldHVyblxuXG4gICAgICB0aGlzLmFmZml4ZWQgPSBhZmZpeFxuICAgICAgdGhpcy51bnBpbiA9IGFmZml4ID09ICdib3R0b20nID8gdGhpcy5nZXRQaW5uZWRPZmZzZXQoKSA6IG51bGxcblxuICAgICAgdGhpcy4kZWxlbWVudFxuICAgICAgICAucmVtb3ZlQ2xhc3MoQWZmaXguUkVTRVQpXG4gICAgICAgIC5hZGRDbGFzcyhhZmZpeFR5cGUpXG4gICAgICAgIC50cmlnZ2VyKGFmZml4VHlwZS5yZXBsYWNlKCdhZmZpeCcsICdhZmZpeGVkJykgKyAnLmJzLmFmZml4JylcbiAgICB9XG5cbiAgICBpZiAoYWZmaXggPT0gJ2JvdHRvbScpIHtcbiAgICAgIHRoaXMuJGVsZW1lbnQub2Zmc2V0KHtcbiAgICAgICAgdG9wOiBzY3JvbGxIZWlnaHQgLSBoZWlnaHQgLSBvZmZzZXRCb3R0b21cbiAgICAgIH0pXG4gICAgfVxuICB9XG5cblxuICAvLyBBRkZJWCBQTFVHSU4gREVGSU5JVElPTlxuICAvLyA9PT09PT09PT09PT09PT09PT09PT09PVxuXG4gIGZ1bmN0aW9uIFBsdWdpbihvcHRpb24pIHtcbiAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciAkdGhpcyAgID0gJCh0aGlzKVxuICAgICAgdmFyIGRhdGEgICAgPSAkdGhpcy5kYXRhKCdicy5hZmZpeCcpXG4gICAgICB2YXIgb3B0aW9ucyA9IHR5cGVvZiBvcHRpb24gPT0gJ29iamVjdCcgJiYgb3B0aW9uXG5cbiAgICAgIGlmICghZGF0YSkgJHRoaXMuZGF0YSgnYnMuYWZmaXgnLCAoZGF0YSA9IG5ldyBBZmZpeCh0aGlzLCBvcHRpb25zKSkpXG4gICAgICBpZiAodHlwZW9mIG9wdGlvbiA9PSAnc3RyaW5nJykgZGF0YVtvcHRpb25dKClcbiAgICB9KVxuICB9XG5cbiAgdmFyIG9sZCA9ICQuZm4uYWZmaXhcblxuICAkLmZuLmFmZml4ICAgICAgICAgICAgID0gUGx1Z2luXG4gICQuZm4uYWZmaXguQ29uc3RydWN0b3IgPSBBZmZpeFxuXG5cbiAgLy8gQUZGSVggTk8gQ09ORkxJQ1RcbiAgLy8gPT09PT09PT09PT09PT09PT1cblxuICAkLmZuLmFmZml4Lm5vQ29uZmxpY3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgJC5mbi5hZmZpeCA9IG9sZFxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuXG4gIC8vIEFGRklYIERBVEEtQVBJXG4gIC8vID09PT09PT09PT09PT09XG5cbiAgJCh3aW5kb3cpLm9uKCdsb2FkJywgZnVuY3Rpb24gKCkge1xuICAgICQoJ1tkYXRhLXNweT1cImFmZml4XCJdJykuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgJHNweSA9ICQodGhpcylcbiAgICAgIHZhciBkYXRhID0gJHNweS5kYXRhKClcblxuICAgICAgZGF0YS5vZmZzZXQgPSBkYXRhLm9mZnNldCB8fCB7fVxuXG4gICAgICBpZiAoZGF0YS5vZmZzZXRCb3R0b20gIT0gbnVsbCkgZGF0YS5vZmZzZXQuYm90dG9tID0gZGF0YS5vZmZzZXRCb3R0b21cbiAgICAgIGlmIChkYXRhLm9mZnNldFRvcCAgICAhPSBudWxsKSBkYXRhLm9mZnNldC50b3AgICAgPSBkYXRhLm9mZnNldFRvcFxuXG4gICAgICBQbHVnaW4uY2FsbCgkc3B5LCBkYXRhKVxuICAgIH0pXG4gIH0pXG5cbn0oalF1ZXJ5KTtcbiIsIi8vIHwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gfCBGbGV4eSBoZWFkZXJcbi8vIHwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gfFxuLy8gfCBUaGlzIGpRdWVyeSBzY3JpcHQgaXMgd3JpdHRlbiBieVxuLy8gfFxuLy8gfCBNb3J0ZW4gTmlzc2VuXG4vLyB8IGhqZW1tZXNpZGVrb25nZW4uZGtcbi8vIHxcblxudmFyIGZsZXh5X2hlYWRlciA9IChmdW5jdGlvbiAoJCkge1xuICAgICd1c2Ugc3RyaWN0JztcblxuICAgIHZhciBwdWIgPSB7fSxcbiAgICAgICAgJGhlYWRlcl9zdGF0aWMgPSAkKCcuZmxleHktaGVhZGVyLS1zdGF0aWMnKSxcbiAgICAgICAgJGhlYWRlcl9zdGlja3kgPSAkKCcuZmxleHktaGVhZGVyLS1zdGlja3knKSxcbiAgICAgICAgb3B0aW9ucyA9IHtcbiAgICAgICAgICAgIHVwZGF0ZV9pbnRlcnZhbDogMTAwLFxuICAgICAgICAgICAgdG9sZXJhbmNlOiB7XG4gICAgICAgICAgICAgICAgdXB3YXJkOiAyMCxcbiAgICAgICAgICAgICAgICBkb3dud2FyZDogMTBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvZmZzZXQ6IF9nZXRfb2Zmc2V0X2Zyb21fZWxlbWVudHNfYm90dG9tKCRoZWFkZXJfc3RhdGljKSxcbiAgICAgICAgICAgIGNsYXNzZXM6IHtcbiAgICAgICAgICAgICAgICBwaW5uZWQ6IFwiZmxleHktaGVhZGVyLS1waW5uZWRcIixcbiAgICAgICAgICAgICAgICB1bnBpbm5lZDogXCJmbGV4eS1oZWFkZXItLXVucGlubmVkXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgd2FzX3Njcm9sbGVkID0gZmFsc2UsXG4gICAgICAgIGxhc3RfZGlzdGFuY2VfZnJvbV90b3AgPSAwO1xuXG4gICAgLyoqXG4gICAgICogSW5zdGFudGlhdGVcbiAgICAgKi9cbiAgICBwdWIuaW5pdCA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgICAgIHJlZ2lzdGVyRXZlbnRIYW5kbGVycygpO1xuICAgICAgICByZWdpc3RlckJvb3RFdmVudEhhbmRsZXJzKCk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFJlZ2lzdGVyIGJvb3QgZXZlbnQgaGFuZGxlcnNcbiAgICAgKi9cbiAgICBmdW5jdGlvbiByZWdpc3RlckJvb3RFdmVudEhhbmRsZXJzKCkge1xuICAgICAgICAkaGVhZGVyX3N0aWNreS5hZGRDbGFzcyhvcHRpb25zLmNsYXNzZXMudW5waW5uZWQpO1xuXG4gICAgICAgIHNldEludGVydmFsKGZ1bmN0aW9uKCkge1xuXG4gICAgICAgICAgICBpZiAod2FzX3Njcm9sbGVkKSB7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnRfd2FzX3Njcm9sbGVkKCk7XG5cbiAgICAgICAgICAgICAgICB3YXNfc2Nyb2xsZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgb3B0aW9ucy51cGRhdGVfaW50ZXJ2YWwpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlZ2lzdGVyIGV2ZW50IGhhbmRsZXJzXG4gICAgICovXG4gICAgZnVuY3Rpb24gcmVnaXN0ZXJFdmVudEhhbmRsZXJzKCkge1xuICAgICAgICAkKHdpbmRvdykuc2Nyb2xsKGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICB3YXNfc2Nyb2xsZWQgPSB0cnVlO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgb2Zmc2V0IGZyb20gZWxlbWVudCBib3R0b21cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBfZ2V0X29mZnNldF9mcm9tX2VsZW1lbnRzX2JvdHRvbSgkZWxlbWVudCkge1xuICAgICAgICB2YXIgZWxlbWVudF9oZWlnaHQgPSAkZWxlbWVudC5vdXRlckhlaWdodCh0cnVlKSxcbiAgICAgICAgICAgIGVsZW1lbnRfb2Zmc2V0ID0gJGVsZW1lbnQub2Zmc2V0KCkudG9wO1xuXG4gICAgICAgIHJldHVybiAoZWxlbWVudF9oZWlnaHQgKyBlbGVtZW50X29mZnNldCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRG9jdW1lbnQgd2FzIHNjcm9sbGVkXG4gICAgICovXG4gICAgZnVuY3Rpb24gZG9jdW1lbnRfd2FzX3Njcm9sbGVkKCkge1xuICAgICAgICB2YXIgY3VycmVudF9kaXN0YW5jZV9mcm9tX3RvcCA9ICQod2luZG93KS5zY3JvbGxUb3AoKTtcblxuICAgICAgICAvLyBJZiBwYXN0IG9mZnNldFxuICAgICAgICBpZiAoY3VycmVudF9kaXN0YW5jZV9mcm9tX3RvcCA+PSBvcHRpb25zLm9mZnNldCkge1xuXG4gICAgICAgICAgICAvLyBEb3dud2FyZHMgc2Nyb2xsXG4gICAgICAgICAgICBpZiAoY3VycmVudF9kaXN0YW5jZV9mcm9tX3RvcCA+IGxhc3RfZGlzdGFuY2VfZnJvbV90b3ApIHtcblxuICAgICAgICAgICAgICAgIC8vIE9iZXkgdGhlIGRvd253YXJkIHRvbGVyYW5jZVxuICAgICAgICAgICAgICAgIGlmIChNYXRoLmFicyhjdXJyZW50X2Rpc3RhbmNlX2Zyb21fdG9wIC0gbGFzdF9kaXN0YW5jZV9mcm9tX3RvcCkgPD0gb3B0aW9ucy50b2xlcmFuY2UuZG93bndhcmQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICRoZWFkZXJfc3RpY2t5LnJlbW92ZUNsYXNzKG9wdGlvbnMuY2xhc3Nlcy5waW5uZWQpLmFkZENsYXNzKG9wdGlvbnMuY2xhc3Nlcy51bnBpbm5lZCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIFVwd2FyZHMgc2Nyb2xsXG4gICAgICAgICAgICBlbHNlIHtcblxuICAgICAgICAgICAgICAgIC8vIE9iZXkgdGhlIHVwd2FyZCB0b2xlcmFuY2VcbiAgICAgICAgICAgICAgICBpZiAoTWF0aC5hYnMoY3VycmVudF9kaXN0YW5jZV9mcm9tX3RvcCAtIGxhc3RfZGlzdGFuY2VfZnJvbV90b3ApIDw9IG9wdGlvbnMudG9sZXJhbmNlLnVwd2FyZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gV2UgYXJlIG5vdCBzY3JvbGxlZCBwYXN0IHRoZSBkb2N1bWVudCB3aGljaCBpcyBwb3NzaWJsZSBvbiB0aGUgTWFjXG4gICAgICAgICAgICAgICAgaWYgKChjdXJyZW50X2Rpc3RhbmNlX2Zyb21fdG9wICsgJCh3aW5kb3cpLmhlaWdodCgpKSA8ICQoZG9jdW1lbnQpLmhlaWdodCgpKSB7XG4gICAgICAgICAgICAgICAgICAgICRoZWFkZXJfc3RpY2t5LnJlbW92ZUNsYXNzKG9wdGlvbnMuY2xhc3Nlcy51bnBpbm5lZCkuYWRkQ2xhc3Mob3B0aW9ucy5jbGFzc2VzLnBpbm5lZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gTm90IHBhc3Qgb2Zmc2V0XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgJGhlYWRlcl9zdGlja3kucmVtb3ZlQ2xhc3Mob3B0aW9ucy5jbGFzc2VzLnBpbm5lZCkuYWRkQ2xhc3Mob3B0aW9ucy5jbGFzc2VzLnVucGlubmVkKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxhc3RfZGlzdGFuY2VfZnJvbV90b3AgPSBjdXJyZW50X2Rpc3RhbmNlX2Zyb21fdG9wO1xuICAgIH1cblxuICAgIHJldHVybiBwdWI7XG59KShqUXVlcnkpO1xuIiwialF1ZXJ5KGZ1bmN0aW9uKCQpIHtcbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICAvLyBGbGV4eSBuYXZpZ2F0aW9uXG4gICAgZmxleHlfbmF2aWdhdGlvbi5pbml0KCk7XG5cbiAgICAvLyBTaG93IGRyb3Bkb3ducyBvbiBtb3VzZW92ZXJcbiAgICBsZXQgJGhlYWRlcnMgPSAkKCcuZmxleHktaGVhZGVyJyksXG4gICAgICAgICRkcm9wZG93bnMgPSAkKCcuZmxleHktbmF2aWdhdGlvbl9faXRlbS0tZHJvcGRvd24nKTtcblxuICAgICRkcm9wZG93bnNcbiAgICAgICAgLm9uKCdtb3VzZWVudGVyJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgIGxldCAkZWxlbWVudCA9ICQodGhpcyksXG4gICAgICAgICAgICAgICAgJGhlYWRlciA9ICRlbGVtZW50LnBhcmVudHMoJy5mbGV4eS1oZWFkZXInKSxcbiAgICAgICAgICAgICAgICAkbGlzdF9pdGVtcyA9ICRoZWFkZXIuZmluZCgnLmZsZXh5LW5hdmlnYXRpb25fX2l0ZW0tLWRyb3Bkb3duJyk7XG5cbiAgICAgICAgICAgICRsaXN0X2l0ZW1zLmFkZENsYXNzKCdob3ZlcicpO1xuICAgICAgICB9KTtcblxuICAgIC8vIFJlbW92ZSBkcm9wZG93biBvbiBjbGljayBvdXRzaWRlXG4gICAgJCh3aW5kb3cpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIGxldCAkbGlzdF9pdGVtcyA9ICQoJy5mbGV4eS1uYXZpZ2F0aW9uX19pdGVtLS1kcm9wZG93bicpO1xuXG4gICAgICAgIGlmICgkbGlzdF9pdGVtcyAhPT0gZXZlbnQudGFyZ2V0ICYmICEgJGxpc3RfaXRlbXMuaGFzKGV2ZW50LnRhcmdldCkubGVuZ3RoKSB7XG4gICAgICAgICAgICAkbGlzdF9pdGVtcy5yZW1vdmVDbGFzcygnaG92ZXInKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gQWRkIGEgXCJjbG9zZVwiIHRvZ2dsZSB0byB0aGUgbGFzdCBkcm9wZG93biBtZW51IGluIHRoZSBoZWFkZXJcbiAgICAkaGVhZGVycy5lYWNoKGZ1bmN0aW9uKGluZGV4LCB2YWx1ZSkge1xuICAgICAgICBsZXQgJGhlYWRlciA9ICQodGhpcyksXG4gICAgICAgICAgICAkbGFzdF9saXN0X2l0ZW0gPSAkaGVhZGVyLmZpbmQoJy5mbGV4eS1uYXZpZ2F0aW9uID4gLmZsZXh5LW5hdmlnYXRpb25fX2l0ZW0tLWRyb3Bkb3duOmxhc3QtY2hpbGQnKSxcbiAgICAgICAgICAgICRkcm9wZG93bl9tZW51ID0gJGxhc3RfbGlzdF9pdGVtLmZpbmQoJy5mbGV4eS1uYXZpZ2F0aW9uX19pdGVtX19kcm9wZG93bi1tZW51Jyk7XG5cbiAgICAgICAgbGV0ICRidG4gPSAkKCc8c3BhbiAvPicpXG4gICAgICAgICAgICAuYWRkQ2xhc3MoJ2ZsZXh5LW5hdmlnYXRpb25fX2l0ZW1fX2Ryb3Bkb3duLW1lbnVfX3RvZ2dsZSBpY29uIGZhIGZhLWNsb3NlJylcbiAgICAgICAgICAgIC5vbignY2xpY2snLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgICAgIGxldCAkZWxlbWVudCA9ICQodGhpcyksXG4gICAgICAgICAgICAgICAgICAgICRoZWFkZXIgPSAkZWxlbWVudC5wYXJlbnRzKCcuZmxleHktaGVhZGVyJyksXG4gICAgICAgICAgICAgICAgICAgICRsaXN0X2l0ZW1zID0gJGhlYWRlci5maW5kKCcuZmxleHktbmF2aWdhdGlvbl9faXRlbS0tZHJvcGRvd24nKTtcblxuICAgICAgICAgICAgICAgICRsaXN0X2l0ZW1zLnJlbW92ZUNsYXNzKCdob3ZlcicpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgJGRyb3Bkb3duX21lbnUuYXBwZW5kKCRidG4pO1xuICAgIH0pO1xuXG4gICAgLy8gQXBwbHkgdGhlIHNhbWUgaGVpZ2h0IHRvIGFsbCBkcm9wZG93biBtZW51c1xuICAgICRoZWFkZXJzLmVhY2goZnVuY3Rpb24oaW5kZXgsIHZhbHVlKSB7XG4gICAgICAgIGxldCAkaGVhZGVyID0gJCh0aGlzKSxcbiAgICAgICAgICAgICRkcm9wZG93bl9tZW51cyA9ICRoZWFkZXIuZmluZCgnLmZsZXh5LW5hdmlnYXRpb25fX2l0ZW1fX2Ryb3Bkb3duLW1lbnUnKSxcbiAgICAgICAgICAgIHRhbGxlc3RfZHJvcGRvd24gPSAwO1xuXG4gICAgICAgIC8vIEZpbmQgdGhlIHRhbGxlc3QgZHJvcGRvd24gbWVudVxuICAgICAgICAkZHJvcGRvd25fbWVudXMuZWFjaChmdW5jdGlvbihpbmRleCwgdmFsdWUpIHtcbiAgICAgICAgICAgIGxldCAkZHJvcGRvd25fbWVudSA9ICQodGhpcyksXG4gICAgICAgICAgICAgICAgaGVpZ2h0ID0gJGRyb3Bkb3duX21lbnUub3V0ZXJIZWlnaHQodHJ1ZSk7XG5cbiAgICAgICAgICAgIGlmIChoZWlnaHQgPiB0YWxsZXN0X2Ryb3Bkb3duKSB7XG4gICAgICAgICAgICAgICAgdGFsbGVzdF9kcm9wZG93biA9IGhlaWdodDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gQXBwbHkgdGhlIHRhbGxlc3QgaGVpZ2h0IHRvIGFsbCBkcm9wZG93biBtZW51c1xuICAgICAgICAkZHJvcGRvd25fbWVudXMuY3NzKCdtaW4taGVpZ2h0JywgdGFsbGVzdF9kcm9wZG93bik7XG4gICAgfSk7XG59KTtcbiIsIi8qISBzaWRyIC0gdjIuMi4xIC0gMjAxNi0wMi0xN1xuICogaHR0cDovL3d3dy5iZXJyaWFydC5jb20vc2lkci9cbiAqIENvcHlyaWdodCAoYykgMjAxMy0yMDE2IEFsYmVydG8gVmFyZWxhOyBMaWNlbnNlZCBNSVQgKi9cblxuKGZ1bmN0aW9uICgpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIHZhciBiYWJlbEhlbHBlcnMgPSB7fTtcblxuICBiYWJlbEhlbHBlcnMuY2xhc3NDYWxsQ2hlY2sgPSBmdW5jdGlvbiAoaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7XG4gICAgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7XG4gICAgfVxuICB9O1xuXG4gIGJhYmVsSGVscGVycy5jcmVhdGVDbGFzcyA9IGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTtcbiAgICAgICAgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlO1xuICAgICAgICBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7XG4gICAgICAgIGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykge1xuICAgICAgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTtcbiAgICAgIGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpO1xuICAgICAgcmV0dXJuIENvbnN0cnVjdG9yO1xuICAgIH07XG4gIH0oKTtcblxuICBiYWJlbEhlbHBlcnM7XG5cbiAgdmFyIHNpZHJTdGF0dXMgPSB7XG4gICAgbW92aW5nOiBmYWxzZSxcbiAgICBvcGVuZWQ6IGZhbHNlXG4gIH07XG5cbiAgdmFyIGhlbHBlciA9IHtcbiAgICAvLyBDaGVjayBmb3IgdmFsaWRzIHVybHNcbiAgICAvLyBGcm9tIDogaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy81NzE3MDkzL2NoZWNrLWlmLWEtamF2YXNjcmlwdC1zdHJpbmctaXMtYW4tdXJsXG5cbiAgICBpc1VybDogZnVuY3Rpb24gaXNVcmwoc3RyKSB7XG4gICAgICB2YXIgcGF0dGVybiA9IG5ldyBSZWdFeHAoJ14oaHR0cHM/OlxcXFwvXFxcXC8pPycgKyAvLyBwcm90b2NvbFxuICAgICAgJygoKFthLXpcXFxcZF0oW2EtelxcXFxkLV0qW2EtelxcXFxkXSkqKVxcXFwuPykrW2Etel17Mix9fCcgKyAvLyBkb21haW4gbmFtZVxuICAgICAgJygoXFxcXGR7MSwzfVxcXFwuKXszfVxcXFxkezEsM30pKScgKyAvLyBPUiBpcCAodjQpIGFkZHJlc3NcbiAgICAgICcoXFxcXDpcXFxcZCspPyhcXFxcL1stYS16XFxcXGQlXy5+K10qKSonICsgLy8gcG9ydCBhbmQgcGF0aFxuICAgICAgJyhcXFxcP1s7JmEtelxcXFxkJV8ufis9LV0qKT8nICsgLy8gcXVlcnkgc3RyaW5nXG4gICAgICAnKFxcXFwjWy1hLXpcXFxcZF9dKik/JCcsICdpJyk7IC8vIGZyYWdtZW50IGxvY2F0b3JcblxuICAgICAgaWYgKHBhdHRlcm4udGVzdChzdHIpKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH0sXG5cblxuICAgIC8vIEFkZCBzaWRyIHByZWZpeGVzXG4gICAgYWRkUHJlZml4ZXM6IGZ1bmN0aW9uIGFkZFByZWZpeGVzKCRlbGVtZW50KSB7XG4gICAgICB0aGlzLmFkZFByZWZpeCgkZWxlbWVudCwgJ2lkJyk7XG4gICAgICB0aGlzLmFkZFByZWZpeCgkZWxlbWVudCwgJ2NsYXNzJyk7XG4gICAgICAkZWxlbWVudC5yZW1vdmVBdHRyKCdzdHlsZScpO1xuICAgIH0sXG4gICAgYWRkUHJlZml4OiBmdW5jdGlvbiBhZGRQcmVmaXgoJGVsZW1lbnQsIGF0dHJpYnV0ZSkge1xuICAgICAgdmFyIHRvUmVwbGFjZSA9ICRlbGVtZW50LmF0dHIoYXR0cmlidXRlKTtcblxuICAgICAgaWYgKHR5cGVvZiB0b1JlcGxhY2UgPT09ICdzdHJpbmcnICYmIHRvUmVwbGFjZSAhPT0gJycgJiYgdG9SZXBsYWNlICE9PSAnc2lkci1pbm5lcicpIHtcbiAgICAgICAgJGVsZW1lbnQuYXR0cihhdHRyaWJ1dGUsIHRvUmVwbGFjZS5yZXBsYWNlKC8oW0EtWmEtejAtOV8uXFwtXSspL2csICdzaWRyLScgKyBhdHRyaWJ1dGUgKyAnLSQxJykpO1xuICAgICAgfVxuICAgIH0sXG5cblxuICAgIC8vIENoZWNrIGlmIHRyYW5zaXRpb25zIGlzIHN1cHBvcnRlZFxuICAgIHRyYW5zaXRpb25zOiBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgYm9keSA9IGRvY3VtZW50LmJvZHkgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LFxuICAgICAgICAgIHN0eWxlID0gYm9keS5zdHlsZSxcbiAgICAgICAgICBzdXBwb3J0ZWQgPSBmYWxzZSxcbiAgICAgICAgICBwcm9wZXJ0eSA9ICd0cmFuc2l0aW9uJztcblxuICAgICAgaWYgKHByb3BlcnR5IGluIHN0eWxlKSB7XG4gICAgICAgIHN1cHBvcnRlZCA9IHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAoZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHZhciBwcmVmaXhlcyA9IFsnbW96JywgJ3dlYmtpdCcsICdvJywgJ21zJ10sXG4gICAgICAgICAgICAgIHByZWZpeCA9IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgaSA9IHVuZGVmaW5lZDtcblxuICAgICAgICAgIHByb3BlcnR5ID0gcHJvcGVydHkuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBwcm9wZXJ0eS5zdWJzdHIoMSk7XG4gICAgICAgICAgc3VwcG9ydGVkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IHByZWZpeGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgIHByZWZpeCA9IHByZWZpeGVzW2ldO1xuICAgICAgICAgICAgICBpZiAocHJlZml4ICsgcHJvcGVydHkgaW4gc3R5bGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfSgpO1xuICAgICAgICAgIHByb3BlcnR5ID0gc3VwcG9ydGVkID8gJy0nICsgcHJlZml4LnRvTG93ZXJDYXNlKCkgKyAnLScgKyBwcm9wZXJ0eS50b0xvd2VyQ2FzZSgpIDogbnVsbDtcbiAgICAgICAgfSkoKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgc3VwcG9ydGVkOiBzdXBwb3J0ZWQsXG4gICAgICAgIHByb3BlcnR5OiBwcm9wZXJ0eVxuICAgICAgfTtcbiAgICB9KClcbiAgfTtcblxuICB2YXIgJCQyID0galF1ZXJ5O1xuXG4gIHZhciBib2R5QW5pbWF0aW9uQ2xhc3MgPSAnc2lkci1hbmltYXRpbmcnO1xuICB2YXIgb3BlbkFjdGlvbiA9ICdvcGVuJztcbiAgdmFyIGNsb3NlQWN0aW9uID0gJ2Nsb3NlJztcbiAgdmFyIHRyYW5zaXRpb25FbmRFdmVudCA9ICd3ZWJraXRUcmFuc2l0aW9uRW5kIG90cmFuc2l0aW9uZW5kIG9UcmFuc2l0aW9uRW5kIG1zVHJhbnNpdGlvbkVuZCB0cmFuc2l0aW9uZW5kJztcbiAgdmFyIE1lbnUgPSBmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gTWVudShuYW1lKSB7XG4gICAgICBiYWJlbEhlbHBlcnMuY2xhc3NDYWxsQ2hlY2sodGhpcywgTWVudSk7XG5cbiAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICB0aGlzLml0ZW0gPSAkJDIoJyMnICsgbmFtZSk7XG4gICAgICB0aGlzLm9wZW5DbGFzcyA9IG5hbWUgPT09ICdzaWRyJyA/ICdzaWRyLW9wZW4nIDogJ3NpZHItb3BlbiAnICsgbmFtZSArICctb3Blbic7XG4gICAgICB0aGlzLm1lbnVXaWR0aCA9IHRoaXMuaXRlbS5vdXRlcldpZHRoKHRydWUpO1xuICAgICAgdGhpcy5zcGVlZCA9IHRoaXMuaXRlbS5kYXRhKCdzcGVlZCcpO1xuICAgICAgdGhpcy5zaWRlID0gdGhpcy5pdGVtLmRhdGEoJ3NpZGUnKTtcbiAgICAgIHRoaXMuZGlzcGxhY2UgPSB0aGlzLml0ZW0uZGF0YSgnZGlzcGxhY2UnKTtcbiAgICAgIHRoaXMudGltaW5nID0gdGhpcy5pdGVtLmRhdGEoJ3RpbWluZycpO1xuICAgICAgdGhpcy5tZXRob2QgPSB0aGlzLml0ZW0uZGF0YSgnbWV0aG9kJyk7XG4gICAgICB0aGlzLm9uT3BlbkNhbGxiYWNrID0gdGhpcy5pdGVtLmRhdGEoJ29uT3BlbicpO1xuICAgICAgdGhpcy5vbkNsb3NlQ2FsbGJhY2sgPSB0aGlzLml0ZW0uZGF0YSgnb25DbG9zZScpO1xuICAgICAgdGhpcy5vbk9wZW5FbmRDYWxsYmFjayA9IHRoaXMuaXRlbS5kYXRhKCdvbk9wZW5FbmQnKTtcbiAgICAgIHRoaXMub25DbG9zZUVuZENhbGxiYWNrID0gdGhpcy5pdGVtLmRhdGEoJ29uQ2xvc2VFbmQnKTtcbiAgICAgIHRoaXMuYm9keSA9ICQkMih0aGlzLml0ZW0uZGF0YSgnYm9keScpKTtcbiAgICB9XG5cbiAgICBiYWJlbEhlbHBlcnMuY3JlYXRlQ2xhc3MoTWVudSwgW3tcbiAgICAgIGtleTogJ2dldEFuaW1hdGlvbicsXG4gICAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0QW5pbWF0aW9uKGFjdGlvbiwgZWxlbWVudCkge1xuICAgICAgICB2YXIgYW5pbWF0aW9uID0ge30sXG4gICAgICAgICAgICBwcm9wID0gdGhpcy5zaWRlO1xuXG4gICAgICAgIGlmIChhY3Rpb24gPT09ICdvcGVuJyAmJiBlbGVtZW50ID09PSAnYm9keScpIHtcbiAgICAgICAgICBhbmltYXRpb25bcHJvcF0gPSB0aGlzLm1lbnVXaWR0aCArICdweCc7XG4gICAgICAgIH0gZWxzZSBpZiAoYWN0aW9uID09PSAnY2xvc2UnICYmIGVsZW1lbnQgPT09ICdtZW51Jykge1xuICAgICAgICAgIGFuaW1hdGlvbltwcm9wXSA9ICctJyArIHRoaXMubWVudVdpZHRoICsgJ3B4JztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBhbmltYXRpb25bcHJvcF0gPSAwO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGFuaW1hdGlvbjtcbiAgICAgIH1cbiAgICB9LCB7XG4gICAgICBrZXk6ICdwcmVwYXJlQm9keScsXG4gICAgICB2YWx1ZTogZnVuY3Rpb24gcHJlcGFyZUJvZHkoYWN0aW9uKSB7XG4gICAgICAgIHZhciBwcm9wID0gYWN0aW9uID09PSAnb3BlbicgPyAnaGlkZGVuJyA6ICcnO1xuXG4gICAgICAgIC8vIFByZXBhcmUgcGFnZSBpZiBjb250YWluZXIgaXMgYm9keVxuICAgICAgICBpZiAodGhpcy5ib2R5LmlzKCdib2R5JykpIHtcbiAgICAgICAgICB2YXIgJGh0bWwgPSAkJDIoJ2h0bWwnKSxcbiAgICAgICAgICAgICAgc2Nyb2xsVG9wID0gJGh0bWwuc2Nyb2xsVG9wKCk7XG5cbiAgICAgICAgICAkaHRtbC5jc3MoJ292ZXJmbG93LXgnLCBwcm9wKS5zY3JvbGxUb3Aoc2Nyb2xsVG9wKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sIHtcbiAgICAgIGtleTogJ29wZW5Cb2R5JyxcbiAgICAgIHZhbHVlOiBmdW5jdGlvbiBvcGVuQm9keSgpIHtcbiAgICAgICAgaWYgKHRoaXMuZGlzcGxhY2UpIHtcbiAgICAgICAgICB2YXIgdHJhbnNpdGlvbnMgPSBoZWxwZXIudHJhbnNpdGlvbnMsXG4gICAgICAgICAgICAgICRib2R5ID0gdGhpcy5ib2R5O1xuXG4gICAgICAgICAgaWYgKHRyYW5zaXRpb25zLnN1cHBvcnRlZCkge1xuICAgICAgICAgICAgJGJvZHkuY3NzKHRyYW5zaXRpb25zLnByb3BlcnR5LCB0aGlzLnNpZGUgKyAnICcgKyB0aGlzLnNwZWVkIC8gMTAwMCArICdzICcgKyB0aGlzLnRpbWluZykuY3NzKHRoaXMuc2lkZSwgMCkuY3NzKHtcbiAgICAgICAgICAgICAgd2lkdGg6ICRib2R5LndpZHRoKCksXG4gICAgICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICRib2R5LmNzcyh0aGlzLnNpZGUsIHRoaXMubWVudVdpZHRoICsgJ3B4Jyk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZhciBib2R5QW5pbWF0aW9uID0gdGhpcy5nZXRBbmltYXRpb24ob3BlbkFjdGlvbiwgJ2JvZHknKTtcblxuICAgICAgICAgICAgJGJvZHkuY3NzKHtcbiAgICAgICAgICAgICAgd2lkdGg6ICRib2R5LndpZHRoKCksXG4gICAgICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnXG4gICAgICAgICAgICB9KS5hbmltYXRlKGJvZHlBbmltYXRpb24sIHtcbiAgICAgICAgICAgICAgcXVldWU6IGZhbHNlLFxuICAgICAgICAgICAgICBkdXJhdGlvbjogdGhpcy5zcGVlZFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSwge1xuICAgICAga2V5OiAnb25DbG9zZUJvZHknLFxuICAgICAgdmFsdWU6IGZ1bmN0aW9uIG9uQ2xvc2VCb2R5KCkge1xuICAgICAgICB2YXIgdHJhbnNpdGlvbnMgPSBoZWxwZXIudHJhbnNpdGlvbnMsXG4gICAgICAgICAgICByZXNldFN0eWxlcyA9IHtcbiAgICAgICAgICB3aWR0aDogJycsXG4gICAgICAgICAgcG9zaXRpb246ICcnLFxuICAgICAgICAgIHJpZ2h0OiAnJyxcbiAgICAgICAgICBsZWZ0OiAnJ1xuICAgICAgICB9O1xuXG4gICAgICAgIGlmICh0cmFuc2l0aW9ucy5zdXBwb3J0ZWQpIHtcbiAgICAgICAgICByZXNldFN0eWxlc1t0cmFuc2l0aW9ucy5wcm9wZXJ0eV0gPSAnJztcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuYm9keS5jc3MocmVzZXRTdHlsZXMpLnVuYmluZCh0cmFuc2l0aW9uRW5kRXZlbnQpO1xuICAgICAgfVxuICAgIH0sIHtcbiAgICAgIGtleTogJ2Nsb3NlQm9keScsXG4gICAgICB2YWx1ZTogZnVuY3Rpb24gY2xvc2VCb2R5KCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgICAgIGlmICh0aGlzLmRpc3BsYWNlKSB7XG4gICAgICAgICAgaWYgKGhlbHBlci50cmFuc2l0aW9ucy5zdXBwb3J0ZWQpIHtcbiAgICAgICAgICAgIHRoaXMuYm9keS5jc3ModGhpcy5zaWRlLCAwKS5vbmUodHJhbnNpdGlvbkVuZEV2ZW50LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgIF90aGlzLm9uQ2xvc2VCb2R5KCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdmFyIGJvZHlBbmltYXRpb24gPSB0aGlzLmdldEFuaW1hdGlvbihjbG9zZUFjdGlvbiwgJ2JvZHknKTtcblxuICAgICAgICAgICAgdGhpcy5ib2R5LmFuaW1hdGUoYm9keUFuaW1hdGlvbiwge1xuICAgICAgICAgICAgICBxdWV1ZTogZmFsc2UsXG4gICAgICAgICAgICAgIGR1cmF0aW9uOiB0aGlzLnNwZWVkLFxuICAgICAgICAgICAgICBjb21wbGV0ZTogZnVuY3Rpb24gY29tcGxldGUoKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMub25DbG9zZUJvZHkoKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSwge1xuICAgICAga2V5OiAnbW92ZUJvZHknLFxuICAgICAgdmFsdWU6IGZ1bmN0aW9uIG1vdmVCb2R5KGFjdGlvbikge1xuICAgICAgICBpZiAoYWN0aW9uID09PSBvcGVuQWN0aW9uKSB7XG4gICAgICAgICAgdGhpcy5vcGVuQm9keSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuY2xvc2VCb2R5KCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LCB7XG4gICAgICBrZXk6ICdvbk9wZW5NZW51JyxcbiAgICAgIHZhbHVlOiBmdW5jdGlvbiBvbk9wZW5NZW51KGNhbGxiYWNrKSB7XG4gICAgICAgIHZhciBuYW1lID0gdGhpcy5uYW1lO1xuXG4gICAgICAgIHNpZHJTdGF0dXMubW92aW5nID0gZmFsc2U7XG4gICAgICAgIHNpZHJTdGF0dXMub3BlbmVkID0gbmFtZTtcblxuICAgICAgICB0aGlzLml0ZW0udW5iaW5kKHRyYW5zaXRpb25FbmRFdmVudCk7XG5cbiAgICAgICAgdGhpcy5ib2R5LnJlbW92ZUNsYXNzKGJvZHlBbmltYXRpb25DbGFzcykuYWRkQ2xhc3ModGhpcy5vcGVuQ2xhc3MpO1xuXG4gICAgICAgIHRoaXMub25PcGVuRW5kQ2FsbGJhY2soKTtcblxuICAgICAgICBpZiAodHlwZW9mIGNhbGxiYWNrID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgY2FsbGJhY2sobmFtZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LCB7XG4gICAgICBrZXk6ICdvcGVuTWVudScsXG4gICAgICB2YWx1ZTogZnVuY3Rpb24gb3Blbk1lbnUoY2FsbGJhY2spIHtcbiAgICAgICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICAgICAgdmFyICRpdGVtID0gdGhpcy5pdGVtO1xuXG4gICAgICAgIGlmIChoZWxwZXIudHJhbnNpdGlvbnMuc3VwcG9ydGVkKSB7XG4gICAgICAgICAgJGl0ZW0uY3NzKHRoaXMuc2lkZSwgMCkub25lKHRyYW5zaXRpb25FbmRFdmVudCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgX3RoaXMyLm9uT3Blbk1lbnUoY2FsbGJhY2spO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHZhciBtZW51QW5pbWF0aW9uID0gdGhpcy5nZXRBbmltYXRpb24ob3BlbkFjdGlvbiwgJ21lbnUnKTtcblxuICAgICAgICAgICRpdGVtLmNzcygnZGlzcGxheScsICdibG9jaycpLmFuaW1hdGUobWVudUFuaW1hdGlvbiwge1xuICAgICAgICAgICAgcXVldWU6IGZhbHNlLFxuICAgICAgICAgICAgZHVyYXRpb246IHRoaXMuc3BlZWQsXG4gICAgICAgICAgICBjb21wbGV0ZTogZnVuY3Rpb24gY29tcGxldGUoKSB7XG4gICAgICAgICAgICAgIF90aGlzMi5vbk9wZW5NZW51KGNhbGxiYWNrKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sIHtcbiAgICAgIGtleTogJ29uQ2xvc2VNZW51JyxcbiAgICAgIHZhbHVlOiBmdW5jdGlvbiBvbkNsb3NlTWVudShjYWxsYmFjaykge1xuICAgICAgICB0aGlzLml0ZW0uY3NzKHtcbiAgICAgICAgICBsZWZ0OiAnJyxcbiAgICAgICAgICByaWdodDogJydcbiAgICAgICAgfSkudW5iaW5kKHRyYW5zaXRpb25FbmRFdmVudCk7XG4gICAgICAgICQkMignaHRtbCcpLmNzcygnb3ZlcmZsb3cteCcsICcnKTtcblxuICAgICAgICBzaWRyU3RhdHVzLm1vdmluZyA9IGZhbHNlO1xuICAgICAgICBzaWRyU3RhdHVzLm9wZW5lZCA9IGZhbHNlO1xuXG4gICAgICAgIHRoaXMuYm9keS5yZW1vdmVDbGFzcyhib2R5QW5pbWF0aW9uQ2xhc3MpLnJlbW92ZUNsYXNzKHRoaXMub3BlbkNsYXNzKTtcblxuICAgICAgICB0aGlzLm9uQ2xvc2VFbmRDYWxsYmFjaygpO1xuXG4gICAgICAgIC8vIENhbGxiYWNrXG4gICAgICAgIGlmICh0eXBlb2YgY2FsbGJhY2sgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICBjYWxsYmFjayhuYW1lKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sIHtcbiAgICAgIGtleTogJ2Nsb3NlTWVudScsXG4gICAgICB2YWx1ZTogZnVuY3Rpb24gY2xvc2VNZW51KGNhbGxiYWNrKSB7XG4gICAgICAgIHZhciBfdGhpczMgPSB0aGlzO1xuXG4gICAgICAgIHZhciBpdGVtID0gdGhpcy5pdGVtO1xuXG4gICAgICAgIGlmIChoZWxwZXIudHJhbnNpdGlvbnMuc3VwcG9ydGVkKSB7XG4gICAgICAgICAgaXRlbS5jc3ModGhpcy5zaWRlLCAnJykub25lKHRyYW5zaXRpb25FbmRFdmVudCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgX3RoaXMzLm9uQ2xvc2VNZW51KGNhbGxiYWNrKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB2YXIgbWVudUFuaW1hdGlvbiA9IHRoaXMuZ2V0QW5pbWF0aW9uKGNsb3NlQWN0aW9uLCAnbWVudScpO1xuXG4gICAgICAgICAgaXRlbS5hbmltYXRlKG1lbnVBbmltYXRpb24sIHtcbiAgICAgICAgICAgIHF1ZXVlOiBmYWxzZSxcbiAgICAgICAgICAgIGR1cmF0aW9uOiB0aGlzLnNwZWVkLFxuICAgICAgICAgICAgY29tcGxldGU6IGZ1bmN0aW9uIGNvbXBsZXRlKCkge1xuICAgICAgICAgICAgICBfdGhpczMub25DbG9zZU1lbnUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sIHtcbiAgICAgIGtleTogJ21vdmVNZW51JyxcbiAgICAgIHZhbHVlOiBmdW5jdGlvbiBtb3ZlTWVudShhY3Rpb24sIGNhbGxiYWNrKSB7XG4gICAgICAgIHRoaXMuYm9keS5hZGRDbGFzcyhib2R5QW5pbWF0aW9uQ2xhc3MpO1xuXG4gICAgICAgIGlmIChhY3Rpb24gPT09IG9wZW5BY3Rpb24pIHtcbiAgICAgICAgICB0aGlzLm9wZW5NZW51KGNhbGxiYWNrKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmNsb3NlTWVudShjYWxsYmFjayk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LCB7XG4gICAgICBrZXk6ICdtb3ZlJyxcbiAgICAgIHZhbHVlOiBmdW5jdGlvbiBtb3ZlKGFjdGlvbiwgY2FsbGJhY2spIHtcbiAgICAgICAgLy8gTG9jayBzaWRyXG4gICAgICAgIHNpZHJTdGF0dXMubW92aW5nID0gdHJ1ZTtcblxuICAgICAgICB0aGlzLnByZXBhcmVCb2R5KGFjdGlvbik7XG4gICAgICAgIHRoaXMubW92ZUJvZHkoYWN0aW9uKTtcbiAgICAgICAgdGhpcy5tb3ZlTWVudShhY3Rpb24sIGNhbGxiYWNrKTtcbiAgICAgIH1cbiAgICB9LCB7XG4gICAgICBrZXk6ICdvcGVuJyxcbiAgICAgIHZhbHVlOiBmdW5jdGlvbiBvcGVuKGNhbGxiYWNrKSB7XG4gICAgICAgIHZhciBfdGhpczQgPSB0aGlzO1xuXG4gICAgICAgIC8vIENoZWNrIGlmIGlzIGFscmVhZHkgb3BlbmVkIG9yIG1vdmluZ1xuICAgICAgICBpZiAoc2lkclN0YXR1cy5vcGVuZWQgPT09IHRoaXMubmFtZSB8fCBzaWRyU3RhdHVzLm1vdmluZykge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIElmIGFub3RoZXIgbWVudSBvcGVuZWQgY2xvc2UgZmlyc3RcbiAgICAgICAgaWYgKHNpZHJTdGF0dXMub3BlbmVkICE9PSBmYWxzZSkge1xuICAgICAgICAgIHZhciBhbHJlYWR5T3BlbmVkTWVudSA9IG5ldyBNZW51KHNpZHJTdGF0dXMub3BlbmVkKTtcblxuICAgICAgICAgIGFscmVhZHlPcGVuZWRNZW51LmNsb3NlKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIF90aGlzNC5vcGVuKGNhbGxiYWNrKTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMubW92ZSgnb3BlbicsIGNhbGxiYWNrKTtcblxuICAgICAgICAvLyBvbk9wZW4gY2FsbGJhY2tcbiAgICAgICAgdGhpcy5vbk9wZW5DYWxsYmFjaygpO1xuICAgICAgfVxuICAgIH0sIHtcbiAgICAgIGtleTogJ2Nsb3NlJyxcbiAgICAgIHZhbHVlOiBmdW5jdGlvbiBjbG9zZShjYWxsYmFjaykge1xuICAgICAgICAvLyBDaGVjayBpZiBpcyBhbHJlYWR5IGNsb3NlZCBvciBtb3ZpbmdcbiAgICAgICAgaWYgKHNpZHJTdGF0dXMub3BlbmVkICE9PSB0aGlzLm5hbWUgfHwgc2lkclN0YXR1cy5tb3ZpbmcpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm1vdmUoJ2Nsb3NlJywgY2FsbGJhY2spO1xuXG4gICAgICAgIC8vIG9uQ2xvc2UgY2FsbGJhY2tcbiAgICAgICAgdGhpcy5vbkNsb3NlQ2FsbGJhY2soKTtcbiAgICAgIH1cbiAgICB9LCB7XG4gICAgICBrZXk6ICd0b2dnbGUnLFxuICAgICAgdmFsdWU6IGZ1bmN0aW9uIHRvZ2dsZShjYWxsYmFjaykge1xuICAgICAgICBpZiAoc2lkclN0YXR1cy5vcGVuZWQgPT09IHRoaXMubmFtZSkge1xuICAgICAgICAgIHRoaXMuY2xvc2UoY2FsbGJhY2spO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMub3BlbihjYWxsYmFjayk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XSk7XG4gICAgcmV0dXJuIE1lbnU7XG4gIH0oKTtcblxuICB2YXIgJCQxID0galF1ZXJ5O1xuXG4gIGZ1bmN0aW9uIGV4ZWN1dGUoYWN0aW9uLCBuYW1lLCBjYWxsYmFjaykge1xuICAgIHZhciBzaWRyID0gbmV3IE1lbnUobmFtZSk7XG5cbiAgICBzd2l0Y2ggKGFjdGlvbikge1xuICAgICAgY2FzZSAnb3Blbic6XG4gICAgICAgIHNpZHIub3BlbihjYWxsYmFjayk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnY2xvc2UnOlxuICAgICAgICBzaWRyLmNsb3NlKGNhbGxiYWNrKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICd0b2dnbGUnOlxuICAgICAgICBzaWRyLnRvZ2dsZShjYWxsYmFjayk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgJCQxLmVycm9yKCdNZXRob2QgJyArIGFjdGlvbiArICcgZG9lcyBub3QgZXhpc3Qgb24galF1ZXJ5LnNpZHInKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgdmFyIGk7XG4gIHZhciAkID0galF1ZXJ5O1xuICB2YXIgcHVibGljTWV0aG9kcyA9IFsnb3BlbicsICdjbG9zZScsICd0b2dnbGUnXTtcbiAgdmFyIG1ldGhvZE5hbWU7XG4gIHZhciBtZXRob2RzID0ge307XG4gIHZhciBnZXRNZXRob2QgPSBmdW5jdGlvbiBnZXRNZXRob2QobWV0aG9kTmFtZSkge1xuICAgIHJldHVybiBmdW5jdGlvbiAobmFtZSwgY2FsbGJhY2spIHtcbiAgICAgIC8vIENoZWNrIGFyZ3VtZW50c1xuICAgICAgaWYgKHR5cGVvZiBuYW1lID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGNhbGxiYWNrID0gbmFtZTtcbiAgICAgICAgbmFtZSA9ICdzaWRyJztcbiAgICAgIH0gZWxzZSBpZiAoIW5hbWUpIHtcbiAgICAgICAgbmFtZSA9ICdzaWRyJztcbiAgICAgIH1cblxuICAgICAgZXhlY3V0ZShtZXRob2ROYW1lLCBuYW1lLCBjYWxsYmFjayk7XG4gICAgfTtcbiAgfTtcbiAgZm9yIChpID0gMDsgaSA8IHB1YmxpY01ldGhvZHMubGVuZ3RoOyBpKyspIHtcbiAgICBtZXRob2ROYW1lID0gcHVibGljTWV0aG9kc1tpXTtcbiAgICBtZXRob2RzW21ldGhvZE5hbWVdID0gZ2V0TWV0aG9kKG1ldGhvZE5hbWUpO1xuICB9XG5cbiAgZnVuY3Rpb24gc2lkcihtZXRob2QpIHtcbiAgICBpZiAobWV0aG9kID09PSAnc3RhdHVzJykge1xuICAgICAgcmV0dXJuIHNpZHJTdGF0dXM7XG4gICAgfSBlbHNlIGlmIChtZXRob2RzW21ldGhvZF0pIHtcbiAgICAgIHJldHVybiBtZXRob2RzW21ldGhvZF0uYXBwbHkodGhpcywgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgbWV0aG9kID09PSAnZnVuY3Rpb24nIHx8IHR5cGVvZiBtZXRob2QgPT09ICdzdHJpbmcnIHx8ICFtZXRob2QpIHtcbiAgICAgIHJldHVybiBtZXRob2RzLnRvZ2dsZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH0gZWxzZSB7XG4gICAgICAkLmVycm9yKCdNZXRob2QgJyArIG1ldGhvZCArICcgZG9lcyBub3QgZXhpc3Qgb24galF1ZXJ5LnNpZHInKTtcbiAgICB9XG4gIH1cblxuICB2YXIgJCQzID0galF1ZXJ5O1xuXG4gIGZ1bmN0aW9uIGZpbGxDb250ZW50KCRzaWRlTWVudSwgc2V0dGluZ3MpIHtcbiAgICAvLyBUaGUgbWVudSBjb250ZW50XG4gICAgaWYgKHR5cGVvZiBzZXR0aW5ncy5zb3VyY2UgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHZhciBuZXdDb250ZW50ID0gc2V0dGluZ3Muc291cmNlKG5hbWUpO1xuXG4gICAgICAkc2lkZU1lbnUuaHRtbChuZXdDb250ZW50KTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBzZXR0aW5ncy5zb3VyY2UgPT09ICdzdHJpbmcnICYmIGhlbHBlci5pc1VybChzZXR0aW5ncy5zb3VyY2UpKSB7XG4gICAgICAkJDMuZ2V0KHNldHRpbmdzLnNvdXJjZSwgZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgJHNpZGVNZW51Lmh0bWwoZGF0YSk7XG4gICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBzZXR0aW5ncy5zb3VyY2UgPT09ICdzdHJpbmcnKSB7XG4gICAgICB2YXIgaHRtbENvbnRlbnQgPSAnJyxcbiAgICAgICAgICBzZWxlY3RvcnMgPSBzZXR0aW5ncy5zb3VyY2Uuc3BsaXQoJywnKTtcblxuICAgICAgJCQzLmVhY2goc2VsZWN0b3JzLCBmdW5jdGlvbiAoaW5kZXgsIGVsZW1lbnQpIHtcbiAgICAgICAgaHRtbENvbnRlbnQgKz0gJzxkaXYgY2xhc3M9XCJzaWRyLWlubmVyXCI+JyArICQkMyhlbGVtZW50KS5odG1sKCkgKyAnPC9kaXY+JztcbiAgICAgIH0pO1xuXG4gICAgICAvLyBSZW5hbWluZyBpZHMgYW5kIGNsYXNzZXNcbiAgICAgIGlmIChzZXR0aW5ncy5yZW5hbWluZykge1xuICAgICAgICB2YXIgJGh0bWxDb250ZW50ID0gJCQzKCc8ZGl2IC8+JykuaHRtbChodG1sQ29udGVudCk7XG5cbiAgICAgICAgJGh0bWxDb250ZW50LmZpbmQoJyonKS5lYWNoKGZ1bmN0aW9uIChpbmRleCwgZWxlbWVudCkge1xuICAgICAgICAgIHZhciAkZWxlbWVudCA9ICQkMyhlbGVtZW50KTtcblxuICAgICAgICAgIGhlbHBlci5hZGRQcmVmaXhlcygkZWxlbWVudCk7XG4gICAgICAgIH0pO1xuICAgICAgICBodG1sQ29udGVudCA9ICRodG1sQ29udGVudC5odG1sKCk7XG4gICAgICB9XG5cbiAgICAgICRzaWRlTWVudS5odG1sKGh0bWxDb250ZW50KTtcbiAgICB9IGVsc2UgaWYgKHNldHRpbmdzLnNvdXJjZSAhPT0gbnVsbCkge1xuICAgICAgJCQzLmVycm9yKCdJbnZhbGlkIFNpZHIgU291cmNlJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuICRzaWRlTWVudTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGZuU2lkcihvcHRpb25zKSB7XG4gICAgdmFyIHRyYW5zaXRpb25zID0gaGVscGVyLnRyYW5zaXRpb25zLFxuICAgICAgICBzZXR0aW5ncyA9ICQkMy5leHRlbmQoe1xuICAgICAgbmFtZTogJ3NpZHInLCAvLyBOYW1lIGZvciB0aGUgJ3NpZHInXG4gICAgICBzcGVlZDogMjAwLCAvLyBBY2NlcHRzIHN0YW5kYXJkIGpRdWVyeSBlZmZlY3RzIHNwZWVkcyAoaS5lLiBmYXN0LCBub3JtYWwgb3IgbWlsbGlzZWNvbmRzKVxuICAgICAgc2lkZTogJ2xlZnQnLCAvLyBBY2NlcHRzICdsZWZ0JyBvciAncmlnaHQnXG4gICAgICBzb3VyY2U6IG51bGwsIC8vIE92ZXJyaWRlIHRoZSBzb3VyY2Ugb2YgdGhlIGNvbnRlbnQuXG4gICAgICByZW5hbWluZzogdHJ1ZSwgLy8gVGhlIGlkcyBhbmQgY2xhc3NlcyB3aWxsIGJlIHByZXBlbmRlZCB3aXRoIGEgcHJlZml4IHdoZW4gbG9hZGluZyBleGlzdGVudCBjb250ZW50XG4gICAgICBib2R5OiAnYm9keScsIC8vIFBhZ2UgY29udGFpbmVyIHNlbGVjdG9yLFxuICAgICAgZGlzcGxhY2U6IHRydWUsIC8vIERpc3BsYWNlIHRoZSBib2R5IGNvbnRlbnQgb3Igbm90XG4gICAgICB0aW1pbmc6ICdlYXNlJywgLy8gVGltaW5nIGZ1bmN0aW9uIGZvciBDU1MgdHJhbnNpdGlvbnNcbiAgICAgIG1ldGhvZDogJ3RvZ2dsZScsIC8vIFRoZSBtZXRob2QgdG8gY2FsbCB3aGVuIGVsZW1lbnQgaXMgY2xpY2tlZFxuICAgICAgYmluZDogJ3RvdWNoc3RhcnQgY2xpY2snLCAvLyBUaGUgZXZlbnQocykgdG8gdHJpZ2dlciB0aGUgbWVudVxuICAgICAgb25PcGVuOiBmdW5jdGlvbiBvbk9wZW4oKSB7fSxcbiAgICAgIC8vIENhbGxiYWNrIHdoZW4gc2lkciBzdGFydCBvcGVuaW5nXG4gICAgICBvbkNsb3NlOiBmdW5jdGlvbiBvbkNsb3NlKCkge30sXG4gICAgICAvLyBDYWxsYmFjayB3aGVuIHNpZHIgc3RhcnQgY2xvc2luZ1xuICAgICAgb25PcGVuRW5kOiBmdW5jdGlvbiBvbk9wZW5FbmQoKSB7fSxcbiAgICAgIC8vIENhbGxiYWNrIHdoZW4gc2lkciBlbmQgb3BlbmluZ1xuICAgICAgb25DbG9zZUVuZDogZnVuY3Rpb24gb25DbG9zZUVuZCgpIHt9IC8vIENhbGxiYWNrIHdoZW4gc2lkciBlbmQgY2xvc2luZ1xuXG4gICAgfSwgb3B0aW9ucyksXG4gICAgICAgIG5hbWUgPSBzZXR0aW5ncy5uYW1lLFxuICAgICAgICAkc2lkZU1lbnUgPSAkJDMoJyMnICsgbmFtZSk7XG5cbiAgICAvLyBJZiB0aGUgc2lkZSBtZW51IGRvIG5vdCBleGlzdCBjcmVhdGUgaXRcbiAgICBpZiAoJHNpZGVNZW51Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgJHNpZGVNZW51ID0gJCQzKCc8ZGl2IC8+JykuYXR0cignaWQnLCBuYW1lKS5hcHBlbmRUbygkJDMoJ2JvZHknKSk7XG4gICAgfVxuXG4gICAgLy8gQWRkIHRyYW5zaXRpb24gdG8gbWVudSBpZiBhcmUgc3VwcG9ydGVkXG4gICAgaWYgKHRyYW5zaXRpb25zLnN1cHBvcnRlZCkge1xuICAgICAgJHNpZGVNZW51LmNzcyh0cmFuc2l0aW9ucy5wcm9wZXJ0eSwgc2V0dGluZ3Muc2lkZSArICcgJyArIHNldHRpbmdzLnNwZWVkIC8gMTAwMCArICdzICcgKyBzZXR0aW5ncy50aW1pbmcpO1xuICAgIH1cblxuICAgIC8vIEFkZGluZyBzdHlsZXMgYW5kIG9wdGlvbnNcbiAgICAkc2lkZU1lbnUuYWRkQ2xhc3MoJ3NpZHInKS5hZGRDbGFzcyhzZXR0aW5ncy5zaWRlKS5kYXRhKHtcbiAgICAgIHNwZWVkOiBzZXR0aW5ncy5zcGVlZCxcbiAgICAgIHNpZGU6IHNldHRpbmdzLnNpZGUsXG4gICAgICBib2R5OiBzZXR0aW5ncy5ib2R5LFxuICAgICAgZGlzcGxhY2U6IHNldHRpbmdzLmRpc3BsYWNlLFxuICAgICAgdGltaW5nOiBzZXR0aW5ncy50aW1pbmcsXG4gICAgICBtZXRob2Q6IHNldHRpbmdzLm1ldGhvZCxcbiAgICAgIG9uT3Blbjogc2V0dGluZ3Mub25PcGVuLFxuICAgICAgb25DbG9zZTogc2V0dGluZ3Mub25DbG9zZSxcbiAgICAgIG9uT3BlbkVuZDogc2V0dGluZ3Mub25PcGVuRW5kLFxuICAgICAgb25DbG9zZUVuZDogc2V0dGluZ3Mub25DbG9zZUVuZFxuICAgIH0pO1xuXG4gICAgJHNpZGVNZW51ID0gZmlsbENvbnRlbnQoJHNpZGVNZW51LCBzZXR0aW5ncyk7XG5cbiAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciAkdGhpcyA9ICQkMyh0aGlzKSxcbiAgICAgICAgICBkYXRhID0gJHRoaXMuZGF0YSgnc2lkcicpLFxuICAgICAgICAgIGZsYWcgPSBmYWxzZTtcblxuICAgICAgLy8gSWYgdGhlIHBsdWdpbiBoYXNuJ3QgYmVlbiBpbml0aWFsaXplZCB5ZXRcbiAgICAgIGlmICghZGF0YSkge1xuICAgICAgICBzaWRyU3RhdHVzLm1vdmluZyA9IGZhbHNlO1xuICAgICAgICBzaWRyU3RhdHVzLm9wZW5lZCA9IGZhbHNlO1xuXG4gICAgICAgICR0aGlzLmRhdGEoJ3NpZHInLCBuYW1lKTtcblxuICAgICAgICAkdGhpcy5iaW5kKHNldHRpbmdzLmJpbmQsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICBpZiAoIWZsYWcpIHtcbiAgICAgICAgICAgIGZsYWcgPSB0cnVlO1xuICAgICAgICAgICAgc2lkcihzZXR0aW5ncy5tZXRob2QsIG5hbWUpO1xuXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgZmxhZyA9IGZhbHNlO1xuICAgICAgICAgICAgfSwgMTAwKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgalF1ZXJ5LnNpZHIgPSBzaWRyO1xuICBqUXVlcnkuZm4uc2lkciA9IGZuU2lkcjtcblxufSgpKTsiLCIhZnVuY3Rpb24oZSl7dmFyIHQ7ZS5mbi5zbGlua3k9ZnVuY3Rpb24oYSl7dmFyIHM9ZS5leHRlbmQoe2xhYmVsOlwiQmFja1wiLHRpdGxlOiExLHNwZWVkOjMwMCxyZXNpemU6ITB9LGEpLGk9ZSh0aGlzKSxuPWkuY2hpbGRyZW4oKS5maXJzdCgpO2kuYWRkQ2xhc3MoXCJzbGlua3ktbWVudVwiKTt2YXIgcj1mdW5jdGlvbihlLHQpe3ZhciBhPU1hdGgucm91bmQocGFyc2VJbnQobi5nZXQoMCkuc3R5bGUubGVmdCkpfHwwO24uY3NzKFwibGVmdFwiLGEtMTAwKmUrXCIlXCIpLFwiZnVuY3Rpb25cIj09dHlwZW9mIHQmJnNldFRpbWVvdXQodCxzLnNwZWVkKX0sbD1mdW5jdGlvbihlKXtpLmhlaWdodChlLm91dGVySGVpZ2h0KCkpfSxkPWZ1bmN0aW9uKGUpe2kuY3NzKFwidHJhbnNpdGlvbi1kdXJhdGlvblwiLGUrXCJtc1wiKSxuLmNzcyhcInRyYW5zaXRpb24tZHVyYXRpb25cIixlK1wibXNcIil9O2lmKGQocy5zcGVlZCksZShcImEgKyB1bFwiLGkpLnByZXYoKS5hZGRDbGFzcyhcIm5leHRcIiksZShcImxpID4gdWxcIixpKS5wcmVwZW5kKCc8bGkgY2xhc3M9XCJoZWFkZXJcIj4nKSxzLnRpdGxlPT09ITAmJmUoXCJsaSA+IHVsXCIsaSkuZWFjaChmdW5jdGlvbigpe3ZhciB0PWUodGhpcykucGFyZW50KCkuZmluZChcImFcIikuZmlyc3QoKS50ZXh0KCksYT1lKFwiPGgyPlwiKS50ZXh0KHQpO2UoXCI+IC5oZWFkZXJcIix0aGlzKS5hcHBlbmQoYSl9KSxzLnRpdGxlfHxzLmxhYmVsIT09ITApe3ZhciBvPWUoXCI8YT5cIikudGV4dChzLmxhYmVsKS5wcm9wKFwiaHJlZlwiLFwiI1wiKS5hZGRDbGFzcyhcImJhY2tcIik7ZShcIi5oZWFkZXJcIixpKS5hcHBlbmQobyl9ZWxzZSBlKFwibGkgPiB1bFwiLGkpLmVhY2goZnVuY3Rpb24oKXt2YXIgdD1lKHRoaXMpLnBhcmVudCgpLmZpbmQoXCJhXCIpLmZpcnN0KCkudGV4dCgpLGE9ZShcIjxhPlwiKS50ZXh0KHQpLnByb3AoXCJocmVmXCIsXCIjXCIpLmFkZENsYXNzKFwiYmFja1wiKTtlKFwiPiAuaGVhZGVyXCIsdGhpcykuYXBwZW5kKGEpfSk7ZShcImFcIixpKS5vbihcImNsaWNrXCIsZnVuY3Rpb24oYSl7aWYoISh0K3Muc3BlZWQ+RGF0ZS5ub3coKSkpe3Q9RGF0ZS5ub3coKTt2YXIgbj1lKHRoaXMpOy8jLy50ZXN0KHRoaXMuaHJlZikmJmEucHJldmVudERlZmF1bHQoKSxuLmhhc0NsYXNzKFwibmV4dFwiKT8oaS5maW5kKFwiLmFjdGl2ZVwiKS5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKSxuLm5leHQoKS5zaG93KCkuYWRkQ2xhc3MoXCJhY3RpdmVcIikscigxKSxzLnJlc2l6ZSYmbChuLm5leHQoKSkpOm4uaGFzQ2xhc3MoXCJiYWNrXCIpJiYocigtMSxmdW5jdGlvbigpe2kuZmluZChcIi5hY3RpdmVcIikucmVtb3ZlQ2xhc3MoXCJhY3RpdmVcIiksbi5wYXJlbnQoKS5wYXJlbnQoKS5oaWRlKCkucGFyZW50c1VudGlsKGksXCJ1bFwiKS5maXJzdCgpLmFkZENsYXNzKFwiYWN0aXZlXCIpfSkscy5yZXNpemUmJmwobi5wYXJlbnQoKS5wYXJlbnQoKS5wYXJlbnRzVW50aWwoaSxcInVsXCIpKSl9fSksdGhpcy5qdW1wPWZ1bmN0aW9uKHQsYSl7dD1lKHQpO3ZhciBuPWkuZmluZChcIi5hY3RpdmVcIik7bj1uLmxlbmd0aD4wP24ucGFyZW50c1VudGlsKGksXCJ1bFwiKS5sZW5ndGg6MCxpLmZpbmQoXCJ1bFwiKS5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKS5oaWRlKCk7dmFyIG89dC5wYXJlbnRzVW50aWwoaSxcInVsXCIpO28uc2hvdygpLHQuc2hvdygpLmFkZENsYXNzKFwiYWN0aXZlXCIpLGE9PT0hMSYmZCgwKSxyKG8ubGVuZ3RoLW4pLHMucmVzaXplJiZsKHQpLGE9PT0hMSYmZChzLnNwZWVkKX0sdGhpcy5ob21lPWZ1bmN0aW9uKHQpe3Q9PT0hMSYmZCgwKTt2YXIgYT1pLmZpbmQoXCIuYWN0aXZlXCIpLG49YS5wYXJlbnRzVW50aWwoaSxcImxpXCIpLmxlbmd0aDtuPjAmJihyKC1uLGZ1bmN0aW9uKCl7YS5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKX0pLHMucmVzaXplJiZsKGUoYS5wYXJlbnRzVW50aWwoaSxcImxpXCIpLmdldChuLTEpKS5wYXJlbnQoKSkpLHQ9PT0hMSYmZChzLnNwZWVkKX0sdGhpcy5kZXN0cm95PWZ1bmN0aW9uKCl7ZShcIi5oZWFkZXJcIixpKS5yZW1vdmUoKSxlKFwiYVwiLGkpLnJlbW92ZUNsYXNzKFwibmV4dFwiKS5vZmYoXCJjbGlja1wiKSxpLnJlbW92ZUNsYXNzKFwic2xpbmt5LW1lbnVcIikuY3NzKFwidHJhbnNpdGlvbi1kdXJhdGlvblwiLFwiXCIpLG4uY3NzKFwidHJhbnNpdGlvbi1kdXJhdGlvblwiLFwiXCIpfTt2YXIgYz1pLmZpbmQoXCIuYWN0aXZlXCIpO3JldHVybiBjLmxlbmd0aD4wJiYoYy5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKSx0aGlzLmp1bXAoYywhMSkpLHRoaXN9fShqUXVlcnkpOyIsIihmdW5jdGlvbigpIHtcbiAgdmFyIEFqYXhNb25pdG9yLCBCYXIsIERvY3VtZW50TW9uaXRvciwgRWxlbWVudE1vbml0b3IsIEVsZW1lbnRUcmFja2VyLCBFdmVudExhZ01vbml0b3IsIEV2ZW50ZWQsIEV2ZW50cywgTm9UYXJnZXRFcnJvciwgUGFjZSwgUmVxdWVzdEludGVyY2VwdCwgU09VUkNFX0tFWVMsIFNjYWxlciwgU29ja2V0UmVxdWVzdFRyYWNrZXIsIFhIUlJlcXVlc3RUcmFja2VyLCBhbmltYXRpb24sIGF2Z0FtcGxpdHVkZSwgYmFyLCBjYW5jZWxBbmltYXRpb24sIGNhbmNlbEFuaW1hdGlvbkZyYW1lLCBkZWZhdWx0T3B0aW9ucywgZXh0ZW5kLCBleHRlbmROYXRpdmUsIGdldEZyb21ET00sIGdldEludGVyY2VwdCwgaGFuZGxlUHVzaFN0YXRlLCBpZ25vcmVTdGFjaywgaW5pdCwgbm93LCBvcHRpb25zLCByZXF1ZXN0QW5pbWF0aW9uRnJhbWUsIHJlc3VsdCwgcnVuQW5pbWF0aW9uLCBzY2FsZXJzLCBzaG91bGRJZ25vcmVVUkwsIHNob3VsZFRyYWNrLCBzb3VyY2UsIHNvdXJjZXMsIHVuaVNjYWxlciwgX1dlYlNvY2tldCwgX1hEb21haW5SZXF1ZXN0LCBfWE1MSHR0cFJlcXVlc3QsIF9pLCBfaW50ZXJjZXB0LCBfbGVuLCBfcHVzaFN0YXRlLCBfcmVmLCBfcmVmMSwgX3JlcGxhY2VTdGF0ZSxcbiAgICBfX3NsaWNlID0gW10uc2xpY2UsXG4gICAgX19oYXNQcm9wID0ge30uaGFzT3duUHJvcGVydHksXG4gICAgX19leHRlbmRzID0gZnVuY3Rpb24oY2hpbGQsIHBhcmVudCkgeyBmb3IgKHZhciBrZXkgaW4gcGFyZW50KSB7IGlmIChfX2hhc1Byb3AuY2FsbChwYXJlbnQsIGtleSkpIGNoaWxkW2tleV0gPSBwYXJlbnRba2V5XTsgfSBmdW5jdGlvbiBjdG9yKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gY2hpbGQ7IH0gY3Rvci5wcm90b3R5cGUgPSBwYXJlbnQucHJvdG90eXBlOyBjaGlsZC5wcm90b3R5cGUgPSBuZXcgY3RvcigpOyBjaGlsZC5fX3N1cGVyX18gPSBwYXJlbnQucHJvdG90eXBlOyByZXR1cm4gY2hpbGQ7IH0sXG4gICAgX19pbmRleE9mID0gW10uaW5kZXhPZiB8fCBmdW5jdGlvbihpdGVtKSB7IGZvciAodmFyIGkgPSAwLCBsID0gdGhpcy5sZW5ndGg7IGkgPCBsOyBpKyspIHsgaWYgKGkgaW4gdGhpcyAmJiB0aGlzW2ldID09PSBpdGVtKSByZXR1cm4gaTsgfSByZXR1cm4gLTE7IH07XG5cbiAgZGVmYXVsdE9wdGlvbnMgPSB7XG4gICAgY2F0Y2h1cFRpbWU6IDEwMCxcbiAgICBpbml0aWFsUmF0ZTogLjAzLFxuICAgIG1pblRpbWU6IDI1MCxcbiAgICBnaG9zdFRpbWU6IDEwMCxcbiAgICBtYXhQcm9ncmVzc1BlckZyYW1lOiAyMCxcbiAgICBlYXNlRmFjdG9yOiAxLjI1LFxuICAgIHN0YXJ0T25QYWdlTG9hZDogdHJ1ZSxcbiAgICByZXN0YXJ0T25QdXNoU3RhdGU6IHRydWUsXG4gICAgcmVzdGFydE9uUmVxdWVzdEFmdGVyOiA1MDAsXG4gICAgdGFyZ2V0OiAnYm9keScsXG4gICAgZWxlbWVudHM6IHtcbiAgICAgIGNoZWNrSW50ZXJ2YWw6IDEwMCxcbiAgICAgIHNlbGVjdG9yczogWydib2R5J11cbiAgICB9LFxuICAgIGV2ZW50TGFnOiB7XG4gICAgICBtaW5TYW1wbGVzOiAxMCxcbiAgICAgIHNhbXBsZUNvdW50OiAzLFxuICAgICAgbGFnVGhyZXNob2xkOiAzXG4gICAgfSxcbiAgICBhamF4OiB7XG4gICAgICB0cmFja01ldGhvZHM6IFsnR0VUJ10sXG4gICAgICB0cmFja1dlYlNvY2tldHM6IHRydWUsXG4gICAgICBpZ25vcmVVUkxzOiBbXVxuICAgIH1cbiAgfTtcblxuICBub3cgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgX3JlZjtcbiAgICByZXR1cm4gKF9yZWYgPSB0eXBlb2YgcGVyZm9ybWFuY2UgIT09IFwidW5kZWZpbmVkXCIgJiYgcGVyZm9ybWFuY2UgIT09IG51bGwgPyB0eXBlb2YgcGVyZm9ybWFuY2Uubm93ID09PSBcImZ1bmN0aW9uXCIgPyBwZXJmb3JtYW5jZS5ub3coKSA6IHZvaWQgMCA6IHZvaWQgMCkgIT0gbnVsbCA/IF9yZWYgOiArKG5ldyBEYXRlKTtcbiAgfTtcblxuICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUgPSB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8IHdpbmRvdy5tb3pSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHwgd2luZG93LndlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZSB8fCB3aW5kb3cubXNSZXF1ZXN0QW5pbWF0aW9uRnJhbWU7XG5cbiAgY2FuY2VsQW5pbWF0aW9uRnJhbWUgPSB3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUgfHwgd2luZG93Lm1vekNhbmNlbEFuaW1hdGlvbkZyYW1lO1xuXG4gIGlmIChyZXF1ZXN0QW5pbWF0aW9uRnJhbWUgPT0gbnVsbCkge1xuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSA9IGZ1bmN0aW9uKGZuKSB7XG4gICAgICByZXR1cm4gc2V0VGltZW91dChmbiwgNTApO1xuICAgIH07XG4gICAgY2FuY2VsQW5pbWF0aW9uRnJhbWUgPSBmdW5jdGlvbihpZCkge1xuICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChpZCk7XG4gICAgfTtcbiAgfVxuXG4gIHJ1bkFuaW1hdGlvbiA9IGZ1bmN0aW9uKGZuKSB7XG4gICAgdmFyIGxhc3QsIHRpY2s7XG4gICAgbGFzdCA9IG5vdygpO1xuICAgIHRpY2sgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBkaWZmO1xuICAgICAgZGlmZiA9IG5vdygpIC0gbGFzdDtcbiAgICAgIGlmIChkaWZmID49IDMzKSB7XG4gICAgICAgIGxhc3QgPSBub3coKTtcbiAgICAgICAgcmV0dXJuIGZuKGRpZmYsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGljayk7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQodGljaywgMzMgLSBkaWZmKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiB0aWNrKCk7XG4gIH07XG5cbiAgcmVzdWx0ID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGFyZ3MsIGtleSwgb2JqO1xuICAgIG9iaiA9IGFyZ3VtZW50c1swXSwga2V5ID0gYXJndW1lbnRzWzFdLCBhcmdzID0gMyA8PSBhcmd1bWVudHMubGVuZ3RoID8gX19zbGljZS5jYWxsKGFyZ3VtZW50cywgMikgOiBbXTtcbiAgICBpZiAodHlwZW9mIG9ialtrZXldID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICByZXR1cm4gb2JqW2tleV0uYXBwbHkob2JqLCBhcmdzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG9ialtrZXldO1xuICAgIH1cbiAgfTtcblxuICBleHRlbmQgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIga2V5LCBvdXQsIHNvdXJjZSwgc291cmNlcywgdmFsLCBfaSwgX2xlbjtcbiAgICBvdXQgPSBhcmd1bWVudHNbMF0sIHNvdXJjZXMgPSAyIDw9IGFyZ3VtZW50cy5sZW5ndGggPyBfX3NsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSA6IFtdO1xuICAgIGZvciAoX2kgPSAwLCBfbGVuID0gc291cmNlcy5sZW5ndGg7IF9pIDwgX2xlbjsgX2krKykge1xuICAgICAgc291cmNlID0gc291cmNlc1tfaV07XG4gICAgICBpZiAoc291cmNlKSB7XG4gICAgICAgIGZvciAoa2V5IGluIHNvdXJjZSkge1xuICAgICAgICAgIGlmICghX19oYXNQcm9wLmNhbGwoc291cmNlLCBrZXkpKSBjb250aW51ZTtcbiAgICAgICAgICB2YWwgPSBzb3VyY2Vba2V5XTtcbiAgICAgICAgICBpZiAoKG91dFtrZXldICE9IG51bGwpICYmIHR5cGVvZiBvdXRba2V5XSA9PT0gJ29iamVjdCcgJiYgKHZhbCAhPSBudWxsKSAmJiB0eXBlb2YgdmFsID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgZXh0ZW5kKG91dFtrZXldLCB2YWwpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBvdXRba2V5XSA9IHZhbDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG91dDtcbiAgfTtcblxuICBhdmdBbXBsaXR1ZGUgPSBmdW5jdGlvbihhcnIpIHtcbiAgICB2YXIgY291bnQsIHN1bSwgdiwgX2ksIF9sZW47XG4gICAgc3VtID0gY291bnQgPSAwO1xuICAgIGZvciAoX2kgPSAwLCBfbGVuID0gYXJyLmxlbmd0aDsgX2kgPCBfbGVuOyBfaSsrKSB7XG4gICAgICB2ID0gYXJyW19pXTtcbiAgICAgIHN1bSArPSBNYXRoLmFicyh2KTtcbiAgICAgIGNvdW50Kys7XG4gICAgfVxuICAgIHJldHVybiBzdW0gLyBjb3VudDtcbiAgfTtcblxuICBnZXRGcm9tRE9NID0gZnVuY3Rpb24oa2V5LCBqc29uKSB7XG4gICAgdmFyIGRhdGEsIGUsIGVsO1xuICAgIGlmIChrZXkgPT0gbnVsbCkge1xuICAgICAga2V5ID0gJ29wdGlvbnMnO1xuICAgIH1cbiAgICBpZiAoanNvbiA9PSBudWxsKSB7XG4gICAgICBqc29uID0gdHJ1ZTtcbiAgICB9XG4gICAgZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiW2RhdGEtcGFjZS1cIiArIGtleSArIFwiXVwiKTtcbiAgICBpZiAoIWVsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGRhdGEgPSBlbC5nZXRBdHRyaWJ1dGUoXCJkYXRhLXBhY2UtXCIgKyBrZXkpO1xuICAgIGlmICghanNvbikge1xuICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICByZXR1cm4gSlNPTi5wYXJzZShkYXRhKTtcbiAgICB9IGNhdGNoIChfZXJyb3IpIHtcbiAgICAgIGUgPSBfZXJyb3I7XG4gICAgICByZXR1cm4gdHlwZW9mIGNvbnNvbGUgIT09IFwidW5kZWZpbmVkXCIgJiYgY29uc29sZSAhPT0gbnVsbCA/IGNvbnNvbGUuZXJyb3IoXCJFcnJvciBwYXJzaW5nIGlubGluZSBwYWNlIG9wdGlvbnNcIiwgZSkgOiB2b2lkIDA7XG4gICAgfVxuICB9O1xuXG4gIEV2ZW50ZWQgPSAoZnVuY3Rpb24oKSB7XG4gICAgZnVuY3Rpb24gRXZlbnRlZCgpIHt9XG5cbiAgICBFdmVudGVkLnByb3RvdHlwZS5vbiA9IGZ1bmN0aW9uKGV2ZW50LCBoYW5kbGVyLCBjdHgsIG9uY2UpIHtcbiAgICAgIHZhciBfYmFzZTtcbiAgICAgIGlmIChvbmNlID09IG51bGwpIHtcbiAgICAgICAgb25jZSA9IGZhbHNlO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMuYmluZGluZ3MgPT0gbnVsbCkge1xuICAgICAgICB0aGlzLmJpbmRpbmdzID0ge307XG4gICAgICB9XG4gICAgICBpZiAoKF9iYXNlID0gdGhpcy5iaW5kaW5ncylbZXZlbnRdID09IG51bGwpIHtcbiAgICAgICAgX2Jhc2VbZXZlbnRdID0gW107XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcy5iaW5kaW5nc1tldmVudF0ucHVzaCh7XG4gICAgICAgIGhhbmRsZXI6IGhhbmRsZXIsXG4gICAgICAgIGN0eDogY3R4LFxuICAgICAgICBvbmNlOiBvbmNlXG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgRXZlbnRlZC5wcm90b3R5cGUub25jZSA9IGZ1bmN0aW9uKGV2ZW50LCBoYW5kbGVyLCBjdHgpIHtcbiAgICAgIHJldHVybiB0aGlzLm9uKGV2ZW50LCBoYW5kbGVyLCBjdHgsIHRydWUpO1xuICAgIH07XG5cbiAgICBFdmVudGVkLnByb3RvdHlwZS5vZmYgPSBmdW5jdGlvbihldmVudCwgaGFuZGxlcikge1xuICAgICAgdmFyIGksIF9yZWYsIF9yZXN1bHRzO1xuICAgICAgaWYgKCgoX3JlZiA9IHRoaXMuYmluZGluZ3MpICE9IG51bGwgPyBfcmVmW2V2ZW50XSA6IHZvaWQgMCkgPT0gbnVsbCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZiAoaGFuZGxlciA9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBkZWxldGUgdGhpcy5iaW5kaW5nc1tldmVudF07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpID0gMDtcbiAgICAgICAgX3Jlc3VsdHMgPSBbXTtcbiAgICAgICAgd2hpbGUgKGkgPCB0aGlzLmJpbmRpbmdzW2V2ZW50XS5sZW5ndGgpIHtcbiAgICAgICAgICBpZiAodGhpcy5iaW5kaW5nc1tldmVudF1baV0uaGFuZGxlciA9PT0gaGFuZGxlcikge1xuICAgICAgICAgICAgX3Jlc3VsdHMucHVzaCh0aGlzLmJpbmRpbmdzW2V2ZW50XS5zcGxpY2UoaSwgMSkpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBfcmVzdWx0cy5wdXNoKGkrKyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBfcmVzdWx0cztcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgRXZlbnRlZC5wcm90b3R5cGUudHJpZ2dlciA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGFyZ3MsIGN0eCwgZXZlbnQsIGhhbmRsZXIsIGksIG9uY2UsIF9yZWYsIF9yZWYxLCBfcmVzdWx0cztcbiAgICAgIGV2ZW50ID0gYXJndW1lbnRzWzBdLCBhcmdzID0gMiA8PSBhcmd1bWVudHMubGVuZ3RoID8gX19zbGljZS5jYWxsKGFyZ3VtZW50cywgMSkgOiBbXTtcbiAgICAgIGlmICgoX3JlZiA9IHRoaXMuYmluZGluZ3MpICE9IG51bGwgPyBfcmVmW2V2ZW50XSA6IHZvaWQgMCkge1xuICAgICAgICBpID0gMDtcbiAgICAgICAgX3Jlc3VsdHMgPSBbXTtcbiAgICAgICAgd2hpbGUgKGkgPCB0aGlzLmJpbmRpbmdzW2V2ZW50XS5sZW5ndGgpIHtcbiAgICAgICAgICBfcmVmMSA9IHRoaXMuYmluZGluZ3NbZXZlbnRdW2ldLCBoYW5kbGVyID0gX3JlZjEuaGFuZGxlciwgY3R4ID0gX3JlZjEuY3R4LCBvbmNlID0gX3JlZjEub25jZTtcbiAgICAgICAgICBoYW5kbGVyLmFwcGx5KGN0eCAhPSBudWxsID8gY3R4IDogdGhpcywgYXJncyk7XG4gICAgICAgICAgaWYgKG9uY2UpIHtcbiAgICAgICAgICAgIF9yZXN1bHRzLnB1c2godGhpcy5iaW5kaW5nc1tldmVudF0uc3BsaWNlKGksIDEpKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgX3Jlc3VsdHMucHVzaChpKyspO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gX3Jlc3VsdHM7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHJldHVybiBFdmVudGVkO1xuXG4gIH0pKCk7XG5cbiAgUGFjZSA9IHdpbmRvdy5QYWNlIHx8IHt9O1xuXG4gIHdpbmRvdy5QYWNlID0gUGFjZTtcblxuICBleHRlbmQoUGFjZSwgRXZlbnRlZC5wcm90b3R5cGUpO1xuXG4gIG9wdGlvbnMgPSBQYWNlLm9wdGlvbnMgPSBleHRlbmQoe30sIGRlZmF1bHRPcHRpb25zLCB3aW5kb3cucGFjZU9wdGlvbnMsIGdldEZyb21ET00oKSk7XG5cbiAgX3JlZiA9IFsnYWpheCcsICdkb2N1bWVudCcsICdldmVudExhZycsICdlbGVtZW50cyddO1xuICBmb3IgKF9pID0gMCwgX2xlbiA9IF9yZWYubGVuZ3RoOyBfaSA8IF9sZW47IF9pKyspIHtcbiAgICBzb3VyY2UgPSBfcmVmW19pXTtcbiAgICBpZiAob3B0aW9uc1tzb3VyY2VdID09PSB0cnVlKSB7XG4gICAgICBvcHRpb25zW3NvdXJjZV0gPSBkZWZhdWx0T3B0aW9uc1tzb3VyY2VdO1xuICAgIH1cbiAgfVxuXG4gIE5vVGFyZ2V0RXJyb3IgPSAoZnVuY3Rpb24oX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKE5vVGFyZ2V0RXJyb3IsIF9zdXBlcik7XG5cbiAgICBmdW5jdGlvbiBOb1RhcmdldEVycm9yKCkge1xuICAgICAgX3JlZjEgPSBOb1RhcmdldEVycm9yLl9fc3VwZXJfXy5jb25zdHJ1Y3Rvci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgcmV0dXJuIF9yZWYxO1xuICAgIH1cblxuICAgIHJldHVybiBOb1RhcmdldEVycm9yO1xuXG4gIH0pKEVycm9yKTtcblxuICBCYXIgPSAoZnVuY3Rpb24oKSB7XG4gICAgZnVuY3Rpb24gQmFyKCkge1xuICAgICAgdGhpcy5wcm9ncmVzcyA9IDA7XG4gICAgfVxuXG4gICAgQmFyLnByb3RvdHlwZS5nZXRFbGVtZW50ID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgdGFyZ2V0RWxlbWVudDtcbiAgICAgIGlmICh0aGlzLmVsID09IG51bGwpIHtcbiAgICAgICAgdGFyZ2V0RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Iob3B0aW9ucy50YXJnZXQpO1xuICAgICAgICBpZiAoIXRhcmdldEVsZW1lbnQpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgTm9UYXJnZXRFcnJvcjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHRoaXMuZWwuY2xhc3NOYW1lID0gXCJwYWNlIHBhY2UtYWN0aXZlXCI7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NOYW1lID0gZG9jdW1lbnQuYm9keS5jbGFzc05hbWUucmVwbGFjZSgvcGFjZS1kb25lL2csICcnKTtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc05hbWUgKz0gJyBwYWNlLXJ1bm5pbmcnO1xuICAgICAgICB0aGlzLmVsLmlubmVySFRNTCA9ICc8ZGl2IGNsYXNzPVwicGFjZS1wcm9ncmVzc1wiPlxcbiAgPGRpdiBjbGFzcz1cInBhY2UtcHJvZ3Jlc3MtaW5uZXJcIj48L2Rpdj5cXG48L2Rpdj5cXG48ZGl2IGNsYXNzPVwicGFjZS1hY3Rpdml0eVwiPjwvZGl2Pic7XG4gICAgICAgIGlmICh0YXJnZXRFbGVtZW50LmZpcnN0Q2hpbGQgIT0gbnVsbCkge1xuICAgICAgICAgIHRhcmdldEVsZW1lbnQuaW5zZXJ0QmVmb3JlKHRoaXMuZWwsIHRhcmdldEVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGFyZ2V0RWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLmVsKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXMuZWw7XG4gICAgfTtcblxuICAgIEJhci5wcm90b3R5cGUuZmluaXNoID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgZWw7XG4gICAgICBlbCA9IHRoaXMuZ2V0RWxlbWVudCgpO1xuICAgICAgZWwuY2xhc3NOYW1lID0gZWwuY2xhc3NOYW1lLnJlcGxhY2UoJ3BhY2UtYWN0aXZlJywgJycpO1xuICAgICAgZWwuY2xhc3NOYW1lICs9ICcgcGFjZS1pbmFjdGl2ZSc7XG4gICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTmFtZSA9IGRvY3VtZW50LmJvZHkuY2xhc3NOYW1lLnJlcGxhY2UoJ3BhY2UtcnVubmluZycsICcnKTtcbiAgICAgIHJldHVybiBkb2N1bWVudC5ib2R5LmNsYXNzTmFtZSArPSAnIHBhY2UtZG9uZSc7XG4gICAgfTtcblxuICAgIEJhci5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24ocHJvZykge1xuICAgICAgdGhpcy5wcm9ncmVzcyA9IHByb2c7XG4gICAgICByZXR1cm4gdGhpcy5yZW5kZXIoKTtcbiAgICB9O1xuXG4gICAgQmFyLnByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24oKSB7XG4gICAgICB0cnkge1xuICAgICAgICB0aGlzLmdldEVsZW1lbnQoKS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMuZ2V0RWxlbWVudCgpKTtcbiAgICAgIH0gY2F0Y2ggKF9lcnJvcikge1xuICAgICAgICBOb1RhcmdldEVycm9yID0gX2Vycm9yO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXMuZWwgPSB2b2lkIDA7XG4gICAgfTtcblxuICAgIEJhci5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgZWwsIGtleSwgcHJvZ3Jlc3NTdHIsIHRyYW5zZm9ybSwgX2osIF9sZW4xLCBfcmVmMjtcbiAgICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKG9wdGlvbnMudGFyZ2V0KSA9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGVsID0gdGhpcy5nZXRFbGVtZW50KCk7XG4gICAgICB0cmFuc2Zvcm0gPSBcInRyYW5zbGF0ZTNkKFwiICsgdGhpcy5wcm9ncmVzcyArIFwiJSwgMCwgMClcIjtcbiAgICAgIF9yZWYyID0gWyd3ZWJraXRUcmFuc2Zvcm0nLCAnbXNUcmFuc2Zvcm0nLCAndHJhbnNmb3JtJ107XG4gICAgICBmb3IgKF9qID0gMCwgX2xlbjEgPSBfcmVmMi5sZW5ndGg7IF9qIDwgX2xlbjE7IF9qKyspIHtcbiAgICAgICAga2V5ID0gX3JlZjJbX2pdO1xuICAgICAgICBlbC5jaGlsZHJlblswXS5zdHlsZVtrZXldID0gdHJhbnNmb3JtO1xuICAgICAgfVxuICAgICAgaWYgKCF0aGlzLmxhc3RSZW5kZXJlZFByb2dyZXNzIHx8IHRoaXMubGFzdFJlbmRlcmVkUHJvZ3Jlc3MgfCAwICE9PSB0aGlzLnByb2dyZXNzIHwgMCkge1xuICAgICAgICBlbC5jaGlsZHJlblswXS5zZXRBdHRyaWJ1dGUoJ2RhdGEtcHJvZ3Jlc3MtdGV4dCcsIFwiXCIgKyAodGhpcy5wcm9ncmVzcyB8IDApICsgXCIlXCIpO1xuICAgICAgICBpZiAodGhpcy5wcm9ncmVzcyA+PSAxMDApIHtcbiAgICAgICAgICBwcm9ncmVzc1N0ciA9ICc5OSc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcHJvZ3Jlc3NTdHIgPSB0aGlzLnByb2dyZXNzIDwgMTAgPyBcIjBcIiA6IFwiXCI7XG4gICAgICAgICAgcHJvZ3Jlc3NTdHIgKz0gdGhpcy5wcm9ncmVzcyB8IDA7XG4gICAgICAgIH1cbiAgICAgICAgZWwuY2hpbGRyZW5bMF0uc2V0QXR0cmlidXRlKCdkYXRhLXByb2dyZXNzJywgXCJcIiArIHByb2dyZXNzU3RyKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzLmxhc3RSZW5kZXJlZFByb2dyZXNzID0gdGhpcy5wcm9ncmVzcztcbiAgICB9O1xuXG4gICAgQmFyLnByb3RvdHlwZS5kb25lID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcy5wcm9ncmVzcyA+PSAxMDA7XG4gICAgfTtcblxuICAgIHJldHVybiBCYXI7XG5cbiAgfSkoKTtcblxuICBFdmVudHMgPSAoZnVuY3Rpb24oKSB7XG4gICAgZnVuY3Rpb24gRXZlbnRzKCkge1xuICAgICAgdGhpcy5iaW5kaW5ncyA9IHt9O1xuICAgIH1cblxuICAgIEV2ZW50cy5wcm90b3R5cGUudHJpZ2dlciA9IGZ1bmN0aW9uKG5hbWUsIHZhbCkge1xuICAgICAgdmFyIGJpbmRpbmcsIF9qLCBfbGVuMSwgX3JlZjIsIF9yZXN1bHRzO1xuICAgICAgaWYgKHRoaXMuYmluZGluZ3NbbmFtZV0gIT0gbnVsbCkge1xuICAgICAgICBfcmVmMiA9IHRoaXMuYmluZGluZ3NbbmFtZV07XG4gICAgICAgIF9yZXN1bHRzID0gW107XG4gICAgICAgIGZvciAoX2ogPSAwLCBfbGVuMSA9IF9yZWYyLmxlbmd0aDsgX2ogPCBfbGVuMTsgX2orKykge1xuICAgICAgICAgIGJpbmRpbmcgPSBfcmVmMltfal07XG4gICAgICAgICAgX3Jlc3VsdHMucHVzaChiaW5kaW5nLmNhbGwodGhpcywgdmFsKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIF9yZXN1bHRzO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBFdmVudHMucHJvdG90eXBlLm9uID0gZnVuY3Rpb24obmFtZSwgZm4pIHtcbiAgICAgIHZhciBfYmFzZTtcbiAgICAgIGlmICgoX2Jhc2UgPSB0aGlzLmJpbmRpbmdzKVtuYW1lXSA9PSBudWxsKSB7XG4gICAgICAgIF9iYXNlW25hbWVdID0gW107XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcy5iaW5kaW5nc1tuYW1lXS5wdXNoKGZuKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIEV2ZW50cztcblxuICB9KSgpO1xuXG4gIF9YTUxIdHRwUmVxdWVzdCA9IHdpbmRvdy5YTUxIdHRwUmVxdWVzdDtcblxuICBfWERvbWFpblJlcXVlc3QgPSB3aW5kb3cuWERvbWFpblJlcXVlc3Q7XG5cbiAgX1dlYlNvY2tldCA9IHdpbmRvdy5XZWJTb2NrZXQ7XG5cbiAgZXh0ZW5kTmF0aXZlID0gZnVuY3Rpb24odG8sIGZyb20pIHtcbiAgICB2YXIgZSwga2V5LCBfcmVzdWx0cztcbiAgICBfcmVzdWx0cyA9IFtdO1xuICAgIGZvciAoa2V5IGluIGZyb20ucHJvdG90eXBlKSB7XG4gICAgICB0cnkge1xuICAgICAgICBpZiAoKHRvW2tleV0gPT0gbnVsbCkgJiYgdHlwZW9mIGZyb21ba2V5XSAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIGlmICh0eXBlb2YgT2JqZWN0LmRlZmluZVByb3BlcnR5ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBfcmVzdWx0cy5wdXNoKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0bywga2V5LCB7XG4gICAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZyb20ucHJvdG90eXBlW2tleV07XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZVxuICAgICAgICAgICAgfSkpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBfcmVzdWx0cy5wdXNoKHRvW2tleV0gPSBmcm9tLnByb3RvdHlwZVtrZXldKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgX3Jlc3VsdHMucHVzaCh2b2lkIDApO1xuICAgICAgICB9XG4gICAgICB9IGNhdGNoIChfZXJyb3IpIHtcbiAgICAgICAgZSA9IF9lcnJvcjtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIF9yZXN1bHRzO1xuICB9O1xuXG4gIGlnbm9yZVN0YWNrID0gW107XG5cbiAgUGFjZS5pZ25vcmUgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgYXJncywgZm4sIHJldDtcbiAgICBmbiA9IGFyZ3VtZW50c1swXSwgYXJncyA9IDIgPD0gYXJndW1lbnRzLmxlbmd0aCA/IF9fc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpIDogW107XG4gICAgaWdub3JlU3RhY2sudW5zaGlmdCgnaWdub3JlJyk7XG4gICAgcmV0ID0gZm4uYXBwbHkobnVsbCwgYXJncyk7XG4gICAgaWdub3JlU3RhY2suc2hpZnQoKTtcbiAgICByZXR1cm4gcmV0O1xuICB9O1xuXG4gIFBhY2UudHJhY2sgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgYXJncywgZm4sIHJldDtcbiAgICBmbiA9IGFyZ3VtZW50c1swXSwgYXJncyA9IDIgPD0gYXJndW1lbnRzLmxlbmd0aCA/IF9fc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpIDogW107XG4gICAgaWdub3JlU3RhY2sudW5zaGlmdCgndHJhY2snKTtcbiAgICByZXQgPSBmbi5hcHBseShudWxsLCBhcmdzKTtcbiAgICBpZ25vcmVTdGFjay5zaGlmdCgpO1xuICAgIHJldHVybiByZXQ7XG4gIH07XG5cbiAgc2hvdWxkVHJhY2sgPSBmdW5jdGlvbihtZXRob2QpIHtcbiAgICB2YXIgX3JlZjI7XG4gICAgaWYgKG1ldGhvZCA9PSBudWxsKSB7XG4gICAgICBtZXRob2QgPSAnR0VUJztcbiAgICB9XG4gICAgaWYgKGlnbm9yZVN0YWNrWzBdID09PSAndHJhY2snKSB7XG4gICAgICByZXR1cm4gJ2ZvcmNlJztcbiAgICB9XG4gICAgaWYgKCFpZ25vcmVTdGFjay5sZW5ndGggJiYgb3B0aW9ucy5hamF4KSB7XG4gICAgICBpZiAobWV0aG9kID09PSAnc29ja2V0JyAmJiBvcHRpb25zLmFqYXgudHJhY2tXZWJTb2NrZXRzKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfSBlbHNlIGlmIChfcmVmMiA9IG1ldGhvZC50b1VwcGVyQ2FzZSgpLCBfX2luZGV4T2YuY2FsbChvcHRpb25zLmFqYXgudHJhY2tNZXRob2RzLCBfcmVmMikgPj0gMCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9O1xuXG4gIFJlcXVlc3RJbnRlcmNlcHQgPSAoZnVuY3Rpb24oX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKFJlcXVlc3RJbnRlcmNlcHQsIF9zdXBlcik7XG5cbiAgICBmdW5jdGlvbiBSZXF1ZXN0SW50ZXJjZXB0KCkge1xuICAgICAgdmFyIG1vbml0b3JYSFIsXG4gICAgICAgIF90aGlzID0gdGhpcztcbiAgICAgIFJlcXVlc3RJbnRlcmNlcHQuX19zdXBlcl9fLmNvbnN0cnVjdG9yLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICBtb25pdG9yWEhSID0gZnVuY3Rpb24ocmVxKSB7XG4gICAgICAgIHZhciBfb3BlbjtcbiAgICAgICAgX29wZW4gPSByZXEub3BlbjtcbiAgICAgICAgcmV0dXJuIHJlcS5vcGVuID0gZnVuY3Rpb24odHlwZSwgdXJsLCBhc3luYykge1xuICAgICAgICAgIGlmIChzaG91bGRUcmFjayh0eXBlKSkge1xuICAgICAgICAgICAgX3RoaXMudHJpZ2dlcigncmVxdWVzdCcsIHtcbiAgICAgICAgICAgICAgdHlwZTogdHlwZSxcbiAgICAgICAgICAgICAgdXJsOiB1cmwsXG4gICAgICAgICAgICAgIHJlcXVlc3Q6IHJlcVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBfb3Blbi5hcHBseShyZXEsIGFyZ3VtZW50cyk7XG4gICAgICAgIH07XG4gICAgICB9O1xuICAgICAgd2luZG93LlhNTEh0dHBSZXF1ZXN0ID0gZnVuY3Rpb24oZmxhZ3MpIHtcbiAgICAgICAgdmFyIHJlcTtcbiAgICAgICAgcmVxID0gbmV3IF9YTUxIdHRwUmVxdWVzdChmbGFncyk7XG4gICAgICAgIG1vbml0b3JYSFIocmVxKTtcbiAgICAgICAgcmV0dXJuIHJlcTtcbiAgICAgIH07XG4gICAgICB0cnkge1xuICAgICAgICBleHRlbmROYXRpdmUod2luZG93LlhNTEh0dHBSZXF1ZXN0LCBfWE1MSHR0cFJlcXVlc3QpO1xuICAgICAgfSBjYXRjaCAoX2Vycm9yKSB7fVxuICAgICAgaWYgKF9YRG9tYWluUmVxdWVzdCAhPSBudWxsKSB7XG4gICAgICAgIHdpbmRvdy5YRG9tYWluUmVxdWVzdCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHZhciByZXE7XG4gICAgICAgICAgcmVxID0gbmV3IF9YRG9tYWluUmVxdWVzdDtcbiAgICAgICAgICBtb25pdG9yWEhSKHJlcSk7XG4gICAgICAgICAgcmV0dXJuIHJlcTtcbiAgICAgICAgfTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBleHRlbmROYXRpdmUod2luZG93LlhEb21haW5SZXF1ZXN0LCBfWERvbWFpblJlcXVlc3QpO1xuICAgICAgICB9IGNhdGNoIChfZXJyb3IpIHt9XG4gICAgICB9XG4gICAgICBpZiAoKF9XZWJTb2NrZXQgIT0gbnVsbCkgJiYgb3B0aW9ucy5hamF4LnRyYWNrV2ViU29ja2V0cykge1xuICAgICAgICB3aW5kb3cuV2ViU29ja2V0ID0gZnVuY3Rpb24odXJsLCBwcm90b2NvbHMpIHtcbiAgICAgICAgICB2YXIgcmVxO1xuICAgICAgICAgIGlmIChwcm90b2NvbHMgIT0gbnVsbCkge1xuICAgICAgICAgICAgcmVxID0gbmV3IF9XZWJTb2NrZXQodXJsLCBwcm90b2NvbHMpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXEgPSBuZXcgX1dlYlNvY2tldCh1cmwpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoc2hvdWxkVHJhY2soJ3NvY2tldCcpKSB7XG4gICAgICAgICAgICBfdGhpcy50cmlnZ2VyKCdyZXF1ZXN0Jywge1xuICAgICAgICAgICAgICB0eXBlOiAnc29ja2V0JyxcbiAgICAgICAgICAgICAgdXJsOiB1cmwsXG4gICAgICAgICAgICAgIHByb3RvY29sczogcHJvdG9jb2xzLFxuICAgICAgICAgICAgICByZXF1ZXN0OiByZXFcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gcmVxO1xuICAgICAgICB9O1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGV4dGVuZE5hdGl2ZSh3aW5kb3cuV2ViU29ja2V0LCBfV2ViU29ja2V0KTtcbiAgICAgICAgfSBjYXRjaCAoX2Vycm9yKSB7fVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBSZXF1ZXN0SW50ZXJjZXB0O1xuXG4gIH0pKEV2ZW50cyk7XG5cbiAgX2ludGVyY2VwdCA9IG51bGw7XG5cbiAgZ2V0SW50ZXJjZXB0ID0gZnVuY3Rpb24oKSB7XG4gICAgaWYgKF9pbnRlcmNlcHQgPT0gbnVsbCkge1xuICAgICAgX2ludGVyY2VwdCA9IG5ldyBSZXF1ZXN0SW50ZXJjZXB0O1xuICAgIH1cbiAgICByZXR1cm4gX2ludGVyY2VwdDtcbiAgfTtcblxuICBzaG91bGRJZ25vcmVVUkwgPSBmdW5jdGlvbih1cmwpIHtcbiAgICB2YXIgcGF0dGVybiwgX2osIF9sZW4xLCBfcmVmMjtcbiAgICBfcmVmMiA9IG9wdGlvbnMuYWpheC5pZ25vcmVVUkxzO1xuICAgIGZvciAoX2ogPSAwLCBfbGVuMSA9IF9yZWYyLmxlbmd0aDsgX2ogPCBfbGVuMTsgX2orKykge1xuICAgICAgcGF0dGVybiA9IF9yZWYyW19qXTtcbiAgICAgIGlmICh0eXBlb2YgcGF0dGVybiA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgaWYgKHVybC5pbmRleE9mKHBhdHRlcm4pICE9PSAtMSkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAocGF0dGVybi50ZXN0KHVybCkpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH07XG5cbiAgZ2V0SW50ZXJjZXB0KCkub24oJ3JlcXVlc3QnLCBmdW5jdGlvbihfYXJnKSB7XG4gICAgdmFyIGFmdGVyLCBhcmdzLCByZXF1ZXN0LCB0eXBlLCB1cmw7XG4gICAgdHlwZSA9IF9hcmcudHlwZSwgcmVxdWVzdCA9IF9hcmcucmVxdWVzdCwgdXJsID0gX2FyZy51cmw7XG4gICAgaWYgKHNob3VsZElnbm9yZVVSTCh1cmwpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICghUGFjZS5ydW5uaW5nICYmIChvcHRpb25zLnJlc3RhcnRPblJlcXVlc3RBZnRlciAhPT0gZmFsc2UgfHwgc2hvdWxkVHJhY2sodHlwZSkgPT09ICdmb3JjZScpKSB7XG4gICAgICBhcmdzID0gYXJndW1lbnRzO1xuICAgICAgYWZ0ZXIgPSBvcHRpb25zLnJlc3RhcnRPblJlcXVlc3RBZnRlciB8fCAwO1xuICAgICAgaWYgKHR5cGVvZiBhZnRlciA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICAgIGFmdGVyID0gMDtcbiAgICAgIH1cbiAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgc3RpbGxBY3RpdmUsIF9qLCBfbGVuMSwgX3JlZjIsIF9yZWYzLCBfcmVzdWx0cztcbiAgICAgICAgaWYgKHR5cGUgPT09ICdzb2NrZXQnKSB7XG4gICAgICAgICAgc3RpbGxBY3RpdmUgPSByZXF1ZXN0LnJlYWR5U3RhdGUgPCAyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHN0aWxsQWN0aXZlID0gKDAgPCAoX3JlZjIgPSByZXF1ZXN0LnJlYWR5U3RhdGUpICYmIF9yZWYyIDwgNCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHN0aWxsQWN0aXZlKSB7XG4gICAgICAgICAgUGFjZS5yZXN0YXJ0KCk7XG4gICAgICAgICAgX3JlZjMgPSBQYWNlLnNvdXJjZXM7XG4gICAgICAgICAgX3Jlc3VsdHMgPSBbXTtcbiAgICAgICAgICBmb3IgKF9qID0gMCwgX2xlbjEgPSBfcmVmMy5sZW5ndGg7IF9qIDwgX2xlbjE7IF9qKyspIHtcbiAgICAgICAgICAgIHNvdXJjZSA9IF9yZWYzW19qXTtcbiAgICAgICAgICAgIGlmIChzb3VyY2UgaW5zdGFuY2VvZiBBamF4TW9uaXRvcikge1xuICAgICAgICAgICAgICBzb3VyY2Uud2F0Y2guYXBwbHkoc291cmNlLCBhcmdzKTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBfcmVzdWx0cy5wdXNoKHZvaWQgMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBfcmVzdWx0cztcbiAgICAgICAgfVxuICAgICAgfSwgYWZ0ZXIpO1xuICAgIH1cbiAgfSk7XG5cbiAgQWpheE1vbml0b3IgPSAoZnVuY3Rpb24oKSB7XG4gICAgZnVuY3Rpb24gQWpheE1vbml0b3IoKSB7XG4gICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgdGhpcy5lbGVtZW50cyA9IFtdO1xuICAgICAgZ2V0SW50ZXJjZXB0KCkub24oJ3JlcXVlc3QnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIF90aGlzLndhdGNoLmFwcGx5KF90aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgQWpheE1vbml0b3IucHJvdG90eXBlLndhdGNoID0gZnVuY3Rpb24oX2FyZykge1xuICAgICAgdmFyIHJlcXVlc3QsIHRyYWNrZXIsIHR5cGUsIHVybDtcbiAgICAgIHR5cGUgPSBfYXJnLnR5cGUsIHJlcXVlc3QgPSBfYXJnLnJlcXVlc3QsIHVybCA9IF9hcmcudXJsO1xuICAgICAgaWYgKHNob3VsZElnbm9yZVVSTCh1cmwpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlID09PSAnc29ja2V0Jykge1xuICAgICAgICB0cmFja2VyID0gbmV3IFNvY2tldFJlcXVlc3RUcmFja2VyKHJlcXVlc3QpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdHJhY2tlciA9IG5ldyBYSFJSZXF1ZXN0VHJhY2tlcihyZXF1ZXN0KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzLmVsZW1lbnRzLnB1c2godHJhY2tlcik7XG4gICAgfTtcblxuICAgIHJldHVybiBBamF4TW9uaXRvcjtcblxuICB9KSgpO1xuXG4gIFhIUlJlcXVlc3RUcmFja2VyID0gKGZ1bmN0aW9uKCkge1xuICAgIGZ1bmN0aW9uIFhIUlJlcXVlc3RUcmFja2VyKHJlcXVlc3QpIHtcbiAgICAgIHZhciBldmVudCwgc2l6ZSwgX2osIF9sZW4xLCBfb25yZWFkeXN0YXRlY2hhbmdlLCBfcmVmMixcbiAgICAgICAgX3RoaXMgPSB0aGlzO1xuICAgICAgdGhpcy5wcm9ncmVzcyA9IDA7XG4gICAgICBpZiAod2luZG93LlByb2dyZXNzRXZlbnQgIT0gbnVsbCkge1xuICAgICAgICBzaXplID0gbnVsbDtcbiAgICAgICAgcmVxdWVzdC5hZGRFdmVudExpc3RlbmVyKCdwcm9ncmVzcycsIGZ1bmN0aW9uKGV2dCkge1xuICAgICAgICAgIGlmIChldnQubGVuZ3RoQ29tcHV0YWJsZSkge1xuICAgICAgICAgICAgcmV0dXJuIF90aGlzLnByb2dyZXNzID0gMTAwICogZXZ0LmxvYWRlZCAvIGV2dC50b3RhbDtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIF90aGlzLnByb2dyZXNzID0gX3RoaXMucHJvZ3Jlc3MgKyAoMTAwIC0gX3RoaXMucHJvZ3Jlc3MpIC8gMjtcbiAgICAgICAgICB9XG4gICAgICAgIH0sIGZhbHNlKTtcbiAgICAgICAgX3JlZjIgPSBbJ2xvYWQnLCAnYWJvcnQnLCAndGltZW91dCcsICdlcnJvciddO1xuICAgICAgICBmb3IgKF9qID0gMCwgX2xlbjEgPSBfcmVmMi5sZW5ndGg7IF9qIDwgX2xlbjE7IF9qKyspIHtcbiAgICAgICAgICBldmVudCA9IF9yZWYyW19qXTtcbiAgICAgICAgICByZXF1ZXN0LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIF90aGlzLnByb2dyZXNzID0gMTAwO1xuICAgICAgICAgIH0sIGZhbHNlKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgX29ucmVhZHlzdGF0ZWNoYW5nZSA9IHJlcXVlc3Qub25yZWFkeXN0YXRlY2hhbmdlO1xuICAgICAgICByZXF1ZXN0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHZhciBfcmVmMztcbiAgICAgICAgICBpZiAoKF9yZWYzID0gcmVxdWVzdC5yZWFkeVN0YXRlKSA9PT0gMCB8fCBfcmVmMyA9PT0gNCkge1xuICAgICAgICAgICAgX3RoaXMucHJvZ3Jlc3MgPSAxMDA7XG4gICAgICAgICAgfSBlbHNlIGlmIChyZXF1ZXN0LnJlYWR5U3RhdGUgPT09IDMpIHtcbiAgICAgICAgICAgIF90aGlzLnByb2dyZXNzID0gNTA7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiB0eXBlb2YgX29ucmVhZHlzdGF0ZWNoYW5nZSA9PT0gXCJmdW5jdGlvblwiID8gX29ucmVhZHlzdGF0ZWNoYW5nZS5hcHBseShudWxsLCBhcmd1bWVudHMpIDogdm9pZCAwO1xuICAgICAgICB9O1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBYSFJSZXF1ZXN0VHJhY2tlcjtcblxuICB9KSgpO1xuXG4gIFNvY2tldFJlcXVlc3RUcmFja2VyID0gKGZ1bmN0aW9uKCkge1xuICAgIGZ1bmN0aW9uIFNvY2tldFJlcXVlc3RUcmFja2VyKHJlcXVlc3QpIHtcbiAgICAgIHZhciBldmVudCwgX2osIF9sZW4xLCBfcmVmMixcbiAgICAgICAgX3RoaXMgPSB0aGlzO1xuICAgICAgdGhpcy5wcm9ncmVzcyA9IDA7XG4gICAgICBfcmVmMiA9IFsnZXJyb3InLCAnb3BlbiddO1xuICAgICAgZm9yIChfaiA9IDAsIF9sZW4xID0gX3JlZjIubGVuZ3RoOyBfaiA8IF9sZW4xOyBfaisrKSB7XG4gICAgICAgIGV2ZW50ID0gX3JlZjJbX2pdO1xuICAgICAgICByZXF1ZXN0LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiBfdGhpcy5wcm9ncmVzcyA9IDEwMDtcbiAgICAgICAgfSwgZmFsc2UpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBTb2NrZXRSZXF1ZXN0VHJhY2tlcjtcblxuICB9KSgpO1xuXG4gIEVsZW1lbnRNb25pdG9yID0gKGZ1bmN0aW9uKCkge1xuICAgIGZ1bmN0aW9uIEVsZW1lbnRNb25pdG9yKG9wdGlvbnMpIHtcbiAgICAgIHZhciBzZWxlY3RvciwgX2osIF9sZW4xLCBfcmVmMjtcbiAgICAgIGlmIChvcHRpb25zID09IG51bGwpIHtcbiAgICAgICAgb3B0aW9ucyA9IHt9O1xuICAgICAgfVxuICAgICAgdGhpcy5lbGVtZW50cyA9IFtdO1xuICAgICAgaWYgKG9wdGlvbnMuc2VsZWN0b3JzID09IG51bGwpIHtcbiAgICAgICAgb3B0aW9ucy5zZWxlY3RvcnMgPSBbXTtcbiAgICAgIH1cbiAgICAgIF9yZWYyID0gb3B0aW9ucy5zZWxlY3RvcnM7XG4gICAgICBmb3IgKF9qID0gMCwgX2xlbjEgPSBfcmVmMi5sZW5ndGg7IF9qIDwgX2xlbjE7IF9qKyspIHtcbiAgICAgICAgc2VsZWN0b3IgPSBfcmVmMltfal07XG4gICAgICAgIHRoaXMuZWxlbWVudHMucHVzaChuZXcgRWxlbWVudFRyYWNrZXIoc2VsZWN0b3IpKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gRWxlbWVudE1vbml0b3I7XG5cbiAgfSkoKTtcblxuICBFbGVtZW50VHJhY2tlciA9IChmdW5jdGlvbigpIHtcbiAgICBmdW5jdGlvbiBFbGVtZW50VHJhY2tlcihzZWxlY3Rvcikge1xuICAgICAgdGhpcy5zZWxlY3RvciA9IHNlbGVjdG9yO1xuICAgICAgdGhpcy5wcm9ncmVzcyA9IDA7XG4gICAgICB0aGlzLmNoZWNrKCk7XG4gICAgfVxuXG4gICAgRWxlbWVudFRyYWNrZXIucHJvdG90eXBlLmNoZWNrID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGhpcy5zZWxlY3RvcikpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZG9uZSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiBfdGhpcy5jaGVjaygpO1xuICAgICAgICB9KSwgb3B0aW9ucy5lbGVtZW50cy5jaGVja0ludGVydmFsKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgRWxlbWVudFRyYWNrZXIucHJvdG90eXBlLmRvbmUgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzLnByb2dyZXNzID0gMTAwO1xuICAgIH07XG5cbiAgICByZXR1cm4gRWxlbWVudFRyYWNrZXI7XG5cbiAgfSkoKTtcblxuICBEb2N1bWVudE1vbml0b3IgPSAoZnVuY3Rpb24oKSB7XG4gICAgRG9jdW1lbnRNb25pdG9yLnByb3RvdHlwZS5zdGF0ZXMgPSB7XG4gICAgICBsb2FkaW5nOiAwLFxuICAgICAgaW50ZXJhY3RpdmU6IDUwLFxuICAgICAgY29tcGxldGU6IDEwMFxuICAgIH07XG5cbiAgICBmdW5jdGlvbiBEb2N1bWVudE1vbml0b3IoKSB7XG4gICAgICB2YXIgX29ucmVhZHlzdGF0ZWNoYW5nZSwgX3JlZjIsXG4gICAgICAgIF90aGlzID0gdGhpcztcbiAgICAgIHRoaXMucHJvZ3Jlc3MgPSAoX3JlZjIgPSB0aGlzLnN0YXRlc1tkb2N1bWVudC5yZWFkeVN0YXRlXSkgIT0gbnVsbCA/IF9yZWYyIDogMTAwO1xuICAgICAgX29ucmVhZHlzdGF0ZWNoYW5nZSA9IGRvY3VtZW50Lm9ucmVhZHlzdGF0ZWNoYW5nZTtcbiAgICAgIGRvY3VtZW50Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoX3RoaXMuc3RhdGVzW2RvY3VtZW50LnJlYWR5U3RhdGVdICE9IG51bGwpIHtcbiAgICAgICAgICBfdGhpcy5wcm9ncmVzcyA9IF90aGlzLnN0YXRlc1tkb2N1bWVudC5yZWFkeVN0YXRlXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHlwZW9mIF9vbnJlYWR5c3RhdGVjaGFuZ2UgPT09IFwiZnVuY3Rpb25cIiA/IF9vbnJlYWR5c3RhdGVjaGFuZ2UuYXBwbHkobnVsbCwgYXJndW1lbnRzKSA6IHZvaWQgMDtcbiAgICAgIH07XG4gICAgfVxuXG4gICAgcmV0dXJuIERvY3VtZW50TW9uaXRvcjtcblxuICB9KSgpO1xuXG4gIEV2ZW50TGFnTW9uaXRvciA9IChmdW5jdGlvbigpIHtcbiAgICBmdW5jdGlvbiBFdmVudExhZ01vbml0b3IoKSB7XG4gICAgICB2YXIgYXZnLCBpbnRlcnZhbCwgbGFzdCwgcG9pbnRzLCBzYW1wbGVzLFxuICAgICAgICBfdGhpcyA9IHRoaXM7XG4gICAgICB0aGlzLnByb2dyZXNzID0gMDtcbiAgICAgIGF2ZyA9IDA7XG4gICAgICBzYW1wbGVzID0gW107XG4gICAgICBwb2ludHMgPSAwO1xuICAgICAgbGFzdCA9IG5vdygpO1xuICAgICAgaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGRpZmY7XG4gICAgICAgIGRpZmYgPSBub3coKSAtIGxhc3QgLSA1MDtcbiAgICAgICAgbGFzdCA9IG5vdygpO1xuICAgICAgICBzYW1wbGVzLnB1c2goZGlmZik7XG4gICAgICAgIGlmIChzYW1wbGVzLmxlbmd0aCA+IG9wdGlvbnMuZXZlbnRMYWcuc2FtcGxlQ291bnQpIHtcbiAgICAgICAgICBzYW1wbGVzLnNoaWZ0KCk7XG4gICAgICAgIH1cbiAgICAgICAgYXZnID0gYXZnQW1wbGl0dWRlKHNhbXBsZXMpO1xuICAgICAgICBpZiAoKytwb2ludHMgPj0gb3B0aW9ucy5ldmVudExhZy5taW5TYW1wbGVzICYmIGF2ZyA8IG9wdGlvbnMuZXZlbnRMYWcubGFnVGhyZXNob2xkKSB7XG4gICAgICAgICAgX3RoaXMucHJvZ3Jlc3MgPSAxMDA7XG4gICAgICAgICAgcmV0dXJuIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWwpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBfdGhpcy5wcm9ncmVzcyA9IDEwMCAqICgzIC8gKGF2ZyArIDMpKTtcbiAgICAgICAgfVxuICAgICAgfSwgNTApO1xuICAgIH1cblxuICAgIHJldHVybiBFdmVudExhZ01vbml0b3I7XG5cbiAgfSkoKTtcblxuICBTY2FsZXIgPSAoZnVuY3Rpb24oKSB7XG4gICAgZnVuY3Rpb24gU2NhbGVyKHNvdXJjZSkge1xuICAgICAgdGhpcy5zb3VyY2UgPSBzb3VyY2U7XG4gICAgICB0aGlzLmxhc3QgPSB0aGlzLnNpbmNlTGFzdFVwZGF0ZSA9IDA7XG4gICAgICB0aGlzLnJhdGUgPSBvcHRpb25zLmluaXRpYWxSYXRlO1xuICAgICAgdGhpcy5jYXRjaHVwID0gMDtcbiAgICAgIHRoaXMucHJvZ3Jlc3MgPSB0aGlzLmxhc3RQcm9ncmVzcyA9IDA7XG4gICAgICBpZiAodGhpcy5zb3VyY2UgIT0gbnVsbCkge1xuICAgICAgICB0aGlzLnByb2dyZXNzID0gcmVzdWx0KHRoaXMuc291cmNlLCAncHJvZ3Jlc3MnKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBTY2FsZXIucHJvdG90eXBlLnRpY2sgPSBmdW5jdGlvbihmcmFtZVRpbWUsIHZhbCkge1xuICAgICAgdmFyIHNjYWxpbmc7XG4gICAgICBpZiAodmFsID09IG51bGwpIHtcbiAgICAgICAgdmFsID0gcmVzdWx0KHRoaXMuc291cmNlLCAncHJvZ3Jlc3MnKTtcbiAgICAgIH1cbiAgICAgIGlmICh2YWwgPj0gMTAwKSB7XG4gICAgICAgIHRoaXMuZG9uZSA9IHRydWU7XG4gICAgICB9XG4gICAgICBpZiAodmFsID09PSB0aGlzLmxhc3QpIHtcbiAgICAgICAgdGhpcy5zaW5jZUxhc3RVcGRhdGUgKz0gZnJhbWVUaW1lO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHRoaXMuc2luY2VMYXN0VXBkYXRlKSB7XG4gICAgICAgICAgdGhpcy5yYXRlID0gKHZhbCAtIHRoaXMubGFzdCkgLyB0aGlzLnNpbmNlTGFzdFVwZGF0ZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNhdGNodXAgPSAodmFsIC0gdGhpcy5wcm9ncmVzcykgLyBvcHRpb25zLmNhdGNodXBUaW1lO1xuICAgICAgICB0aGlzLnNpbmNlTGFzdFVwZGF0ZSA9IDA7XG4gICAgICAgIHRoaXMubGFzdCA9IHZhbDtcbiAgICAgIH1cbiAgICAgIGlmICh2YWwgPiB0aGlzLnByb2dyZXNzKSB7XG4gICAgICAgIHRoaXMucHJvZ3Jlc3MgKz0gdGhpcy5jYXRjaHVwICogZnJhbWVUaW1lO1xuICAgICAgfVxuICAgICAgc2NhbGluZyA9IDEgLSBNYXRoLnBvdyh0aGlzLnByb2dyZXNzIC8gMTAwLCBvcHRpb25zLmVhc2VGYWN0b3IpO1xuICAgICAgdGhpcy5wcm9ncmVzcyArPSBzY2FsaW5nICogdGhpcy5yYXRlICogZnJhbWVUaW1lO1xuICAgICAgdGhpcy5wcm9ncmVzcyA9IE1hdGgubWluKHRoaXMubGFzdFByb2dyZXNzICsgb3B0aW9ucy5tYXhQcm9ncmVzc1BlckZyYW1lLCB0aGlzLnByb2dyZXNzKTtcbiAgICAgIHRoaXMucHJvZ3Jlc3MgPSBNYXRoLm1heCgwLCB0aGlzLnByb2dyZXNzKTtcbiAgICAgIHRoaXMucHJvZ3Jlc3MgPSBNYXRoLm1pbigxMDAsIHRoaXMucHJvZ3Jlc3MpO1xuICAgICAgdGhpcy5sYXN0UHJvZ3Jlc3MgPSB0aGlzLnByb2dyZXNzO1xuICAgICAgcmV0dXJuIHRoaXMucHJvZ3Jlc3M7XG4gICAgfTtcblxuICAgIHJldHVybiBTY2FsZXI7XG5cbiAgfSkoKTtcblxuICBzb3VyY2VzID0gbnVsbDtcblxuICBzY2FsZXJzID0gbnVsbDtcblxuICBiYXIgPSBudWxsO1xuXG4gIHVuaVNjYWxlciA9IG51bGw7XG5cbiAgYW5pbWF0aW9uID0gbnVsbDtcblxuICBjYW5jZWxBbmltYXRpb24gPSBudWxsO1xuXG4gIFBhY2UucnVubmluZyA9IGZhbHNlO1xuXG4gIGhhbmRsZVB1c2hTdGF0ZSA9IGZ1bmN0aW9uKCkge1xuICAgIGlmIChvcHRpb25zLnJlc3RhcnRPblB1c2hTdGF0ZSkge1xuICAgICAgcmV0dXJuIFBhY2UucmVzdGFydCgpO1xuICAgIH1cbiAgfTtcblxuICBpZiAod2luZG93Lmhpc3RvcnkucHVzaFN0YXRlICE9IG51bGwpIHtcbiAgICBfcHVzaFN0YXRlID0gd2luZG93Lmhpc3RvcnkucHVzaFN0YXRlO1xuICAgIHdpbmRvdy5oaXN0b3J5LnB1c2hTdGF0ZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgaGFuZGxlUHVzaFN0YXRlKCk7XG4gICAgICByZXR1cm4gX3B1c2hTdGF0ZS5hcHBseSh3aW5kb3cuaGlzdG9yeSwgYXJndW1lbnRzKTtcbiAgICB9O1xuICB9XG5cbiAgaWYgKHdpbmRvdy5oaXN0b3J5LnJlcGxhY2VTdGF0ZSAhPSBudWxsKSB7XG4gICAgX3JlcGxhY2VTdGF0ZSA9IHdpbmRvdy5oaXN0b3J5LnJlcGxhY2VTdGF0ZTtcbiAgICB3aW5kb3cuaGlzdG9yeS5yZXBsYWNlU3RhdGUgPSBmdW5jdGlvbigpIHtcbiAgICAgIGhhbmRsZVB1c2hTdGF0ZSgpO1xuICAgICAgcmV0dXJuIF9yZXBsYWNlU3RhdGUuYXBwbHkod2luZG93Lmhpc3RvcnksIGFyZ3VtZW50cyk7XG4gICAgfTtcbiAgfVxuXG4gIFNPVVJDRV9LRVlTID0ge1xuICAgIGFqYXg6IEFqYXhNb25pdG9yLFxuICAgIGVsZW1lbnRzOiBFbGVtZW50TW9uaXRvcixcbiAgICBkb2N1bWVudDogRG9jdW1lbnRNb25pdG9yLFxuICAgIGV2ZW50TGFnOiBFdmVudExhZ01vbml0b3JcbiAgfTtcblxuICAoaW5pdCA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciB0eXBlLCBfaiwgX2ssIF9sZW4xLCBfbGVuMiwgX3JlZjIsIF9yZWYzLCBfcmVmNDtcbiAgICBQYWNlLnNvdXJjZXMgPSBzb3VyY2VzID0gW107XG4gICAgX3JlZjIgPSBbJ2FqYXgnLCAnZWxlbWVudHMnLCAnZG9jdW1lbnQnLCAnZXZlbnRMYWcnXTtcbiAgICBmb3IgKF9qID0gMCwgX2xlbjEgPSBfcmVmMi5sZW5ndGg7IF9qIDwgX2xlbjE7IF9qKyspIHtcbiAgICAgIHR5cGUgPSBfcmVmMltfal07XG4gICAgICBpZiAob3B0aW9uc1t0eXBlXSAhPT0gZmFsc2UpIHtcbiAgICAgICAgc291cmNlcy5wdXNoKG5ldyBTT1VSQ0VfS0VZU1t0eXBlXShvcHRpb25zW3R5cGVdKSk7XG4gICAgICB9XG4gICAgfVxuICAgIF9yZWY0ID0gKF9yZWYzID0gb3B0aW9ucy5leHRyYVNvdXJjZXMpICE9IG51bGwgPyBfcmVmMyA6IFtdO1xuICAgIGZvciAoX2sgPSAwLCBfbGVuMiA9IF9yZWY0Lmxlbmd0aDsgX2sgPCBfbGVuMjsgX2srKykge1xuICAgICAgc291cmNlID0gX3JlZjRbX2tdO1xuICAgICAgc291cmNlcy5wdXNoKG5ldyBzb3VyY2Uob3B0aW9ucykpO1xuICAgIH1cbiAgICBQYWNlLmJhciA9IGJhciA9IG5ldyBCYXI7XG4gICAgc2NhbGVycyA9IFtdO1xuICAgIHJldHVybiB1bmlTY2FsZXIgPSBuZXcgU2NhbGVyO1xuICB9KSgpO1xuXG4gIFBhY2Uuc3RvcCA9IGZ1bmN0aW9uKCkge1xuICAgIFBhY2UudHJpZ2dlcignc3RvcCcpO1xuICAgIFBhY2UucnVubmluZyA9IGZhbHNlO1xuICAgIGJhci5kZXN0cm95KCk7XG4gICAgY2FuY2VsQW5pbWF0aW9uID0gdHJ1ZTtcbiAgICBpZiAoYW5pbWF0aW9uICE9IG51bGwpIHtcbiAgICAgIGlmICh0eXBlb2YgY2FuY2VsQW5pbWF0aW9uRnJhbWUgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICBjYW5jZWxBbmltYXRpb25GcmFtZShhbmltYXRpb24pO1xuICAgICAgfVxuICAgICAgYW5pbWF0aW9uID0gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGluaXQoKTtcbiAgfTtcblxuICBQYWNlLnJlc3RhcnQgPSBmdW5jdGlvbigpIHtcbiAgICBQYWNlLnRyaWdnZXIoJ3Jlc3RhcnQnKTtcbiAgICBQYWNlLnN0b3AoKTtcbiAgICByZXR1cm4gUGFjZS5zdGFydCgpO1xuICB9O1xuXG4gIFBhY2UuZ28gPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgc3RhcnQ7XG4gICAgUGFjZS5ydW5uaW5nID0gdHJ1ZTtcbiAgICBiYXIucmVuZGVyKCk7XG4gICAgc3RhcnQgPSBub3coKTtcbiAgICBjYW5jZWxBbmltYXRpb24gPSBmYWxzZTtcbiAgICByZXR1cm4gYW5pbWF0aW9uID0gcnVuQW5pbWF0aW9uKGZ1bmN0aW9uKGZyYW1lVGltZSwgZW5xdWV1ZU5leHRGcmFtZSkge1xuICAgICAgdmFyIGF2ZywgY291bnQsIGRvbmUsIGVsZW1lbnQsIGVsZW1lbnRzLCBpLCBqLCByZW1haW5pbmcsIHNjYWxlciwgc2NhbGVyTGlzdCwgc3VtLCBfaiwgX2ssIF9sZW4xLCBfbGVuMiwgX3JlZjI7XG4gICAgICByZW1haW5pbmcgPSAxMDAgLSBiYXIucHJvZ3Jlc3M7XG4gICAgICBjb3VudCA9IHN1bSA9IDA7XG4gICAgICBkb25lID0gdHJ1ZTtcbiAgICAgIGZvciAoaSA9IF9qID0gMCwgX2xlbjEgPSBzb3VyY2VzLmxlbmd0aDsgX2ogPCBfbGVuMTsgaSA9ICsrX2opIHtcbiAgICAgICAgc291cmNlID0gc291cmNlc1tpXTtcbiAgICAgICAgc2NhbGVyTGlzdCA9IHNjYWxlcnNbaV0gIT0gbnVsbCA/IHNjYWxlcnNbaV0gOiBzY2FsZXJzW2ldID0gW107XG4gICAgICAgIGVsZW1lbnRzID0gKF9yZWYyID0gc291cmNlLmVsZW1lbnRzKSAhPSBudWxsID8gX3JlZjIgOiBbc291cmNlXTtcbiAgICAgICAgZm9yIChqID0gX2sgPSAwLCBfbGVuMiA9IGVsZW1lbnRzLmxlbmd0aDsgX2sgPCBfbGVuMjsgaiA9ICsrX2spIHtcbiAgICAgICAgICBlbGVtZW50ID0gZWxlbWVudHNbal07XG4gICAgICAgICAgc2NhbGVyID0gc2NhbGVyTGlzdFtqXSAhPSBudWxsID8gc2NhbGVyTGlzdFtqXSA6IHNjYWxlckxpc3Rbal0gPSBuZXcgU2NhbGVyKGVsZW1lbnQpO1xuICAgICAgICAgIGRvbmUgJj0gc2NhbGVyLmRvbmU7XG4gICAgICAgICAgaWYgKHNjYWxlci5kb25lKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgY291bnQrKztcbiAgICAgICAgICBzdW0gKz0gc2NhbGVyLnRpY2soZnJhbWVUaW1lKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgYXZnID0gc3VtIC8gY291bnQ7XG4gICAgICBiYXIudXBkYXRlKHVuaVNjYWxlci50aWNrKGZyYW1lVGltZSwgYXZnKSk7XG4gICAgICBpZiAoYmFyLmRvbmUoKSB8fCBkb25lIHx8IGNhbmNlbEFuaW1hdGlvbikge1xuICAgICAgICBiYXIudXBkYXRlKDEwMCk7XG4gICAgICAgIFBhY2UudHJpZ2dlcignZG9uZScpO1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICBiYXIuZmluaXNoKCk7XG4gICAgICAgICAgUGFjZS5ydW5uaW5nID0gZmFsc2U7XG4gICAgICAgICAgcmV0dXJuIFBhY2UudHJpZ2dlcignaGlkZScpO1xuICAgICAgICB9LCBNYXRoLm1heChvcHRpb25zLmdob3N0VGltZSwgTWF0aC5tYXgob3B0aW9ucy5taW5UaW1lIC0gKG5vdygpIC0gc3RhcnQpLCAwKSkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGVucXVldWVOZXh0RnJhbWUoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcblxuICBQYWNlLnN0YXJ0ID0gZnVuY3Rpb24oX29wdGlvbnMpIHtcbiAgICBleHRlbmQob3B0aW9ucywgX29wdGlvbnMpO1xuICAgIFBhY2UucnVubmluZyA9IHRydWU7XG4gICAgdHJ5IHtcbiAgICAgIGJhci5yZW5kZXIoKTtcbiAgICB9IGNhdGNoIChfZXJyb3IpIHtcbiAgICAgIE5vVGFyZ2V0RXJyb3IgPSBfZXJyb3I7XG4gICAgfVxuICAgIGlmICghZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBhY2UnKSkge1xuICAgICAgcmV0dXJuIHNldFRpbWVvdXQoUGFjZS5zdGFydCwgNTApO1xuICAgIH0gZWxzZSB7XG4gICAgICBQYWNlLnRyaWdnZXIoJ3N0YXJ0Jyk7XG4gICAgICByZXR1cm4gUGFjZS5nbygpO1xuICAgIH1cbiAgfTtcblxuICBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgZGVmaW5lKFsncGFjZSddLCBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBQYWNlO1xuICAgIH0pO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jykge1xuICAgIG1vZHVsZS5leHBvcnRzID0gUGFjZTtcbiAgfSBlbHNlIHtcbiAgICBpZiAob3B0aW9ucy5zdGFydE9uUGFnZUxvYWQpIHtcbiAgICAgIFBhY2Uuc3RhcnQoKTtcbiAgICB9XG4gIH1cblxufSkuY2FsbCh0aGlzKTtcbiIsImpRdWVyeShmdW5jdGlvbigkKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgLy8gRmxleHkgaGVhZGVyXG4gICAgZmxleHlfaGVhZGVyLmluaXQoKTtcblxuICAgIC8vIFNpZHJcbiAgICAkKCcuc2xpbmt5LW1lbnUnKVxuICAgICAgICAuZmluZCgndWwsIGxpLCBhJylcbiAgICAgICAgLnJlbW92ZUNsYXNzKCk7XG5cbiAgICAkKCcuc2lkci10b2dnbGUtLXJpZ2h0Jykuc2lkcih7XG4gICAgICAgIG5hbWU6ICdzaWRyLW1haW4nLFxuICAgICAgICBzaWRlOiAncmlnaHQnLFxuICAgICAgICByZW5hbWluZzogZmFsc2UsXG4gICAgICAgIGJvZHk6ICcubGF5b3V0X193cmFwcGVyJyxcbiAgICAgICAgc291cmNlOiAnLnNpZHItc291cmNlLXByb3ZpZGVyJ1xuICAgIH0pO1xuXG4gICAgLy8gU2xpbmt5XG4gICAgJCgnLnNpZHIgLnNsaW5reS1tZW51Jykuc2xpbmt5KHtcbiAgICAgICAgdGl0bGU6IHRydWUsXG4gICAgICAgIGxhYmVsOiAnJ1xuICAgIH0pO1xuXG4gICAgLy8gRW5hYmxlIC8gZGlzYWJsZSBCb290c3RyYXAgdG9vbHRpcHMsIGJhc2VkIHVwb24gdG91Y2ggZXZlbnRzXG4gICAgaWYoTW9kZXJuaXpyLnRvdWNoZXZlbnRzKSB7XG4gICAgICAgICQoJ1tkYXRhLXRvZ2dsZT10b29sdGlwXScpLnRvb2x0aXAoJ2hpZGUnKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgICQoJ1tkYXRhLXRvZ2dsZT10b29sdGlwXScpLnRvb2x0aXAoKTtcbiAgICB9XG59KTtcbiJdfQ==
