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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJvb3RzdHJhcC5qcyIsImZsZXh5LWhlYWRlci5qcyIsImZsZXh5LW5hdmlnYXRpb24uanMiLCJqcXVlcnkuc2lkci5qcyIsImpxdWVyeS5zbGlua3kuanMiLCJwYWNlLmpzIiwiYXBwLmpzIl0sIm5hbWVzIjpbImpRdWVyeSIsIkVycm9yIiwiJCIsInZlcnNpb24iLCJmbiIsImpxdWVyeSIsInNwbGl0IiwidHJhbnNpdGlvbkVuZCIsImVsIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwidHJhbnNFbmRFdmVudE5hbWVzIiwiV2Via2l0VHJhbnNpdGlvbiIsIk1velRyYW5zaXRpb24iLCJPVHJhbnNpdGlvbiIsInRyYW5zaXRpb24iLCJuYW1lIiwic3R5bGUiLCJ1bmRlZmluZWQiLCJlbmQiLCJlbXVsYXRlVHJhbnNpdGlvbkVuZCIsImR1cmF0aW9uIiwiY2FsbGVkIiwiJGVsIiwib25lIiwiY2FsbGJhY2siLCJ0cmlnZ2VyIiwic3VwcG9ydCIsInNldFRpbWVvdXQiLCJldmVudCIsInNwZWNpYWwiLCJic1RyYW5zaXRpb25FbmQiLCJiaW5kVHlwZSIsImRlbGVnYXRlVHlwZSIsImhhbmRsZSIsImUiLCJ0YXJnZXQiLCJpcyIsImhhbmRsZU9iaiIsImhhbmRsZXIiLCJhcHBseSIsImFyZ3VtZW50cyIsImRpc21pc3MiLCJBbGVydCIsIm9uIiwiY2xvc2UiLCJWRVJTSU9OIiwiVFJBTlNJVElPTl9EVVJBVElPTiIsInByb3RvdHlwZSIsIiR0aGlzIiwic2VsZWN0b3IiLCJhdHRyIiwicmVwbGFjZSIsIiRwYXJlbnQiLCJwcmV2ZW50RGVmYXVsdCIsImxlbmd0aCIsImNsb3Nlc3QiLCJFdmVudCIsImlzRGVmYXVsdFByZXZlbnRlZCIsInJlbW92ZUNsYXNzIiwicmVtb3ZlRWxlbWVudCIsImRldGFjaCIsInJlbW92ZSIsImhhc0NsYXNzIiwiUGx1Z2luIiwib3B0aW9uIiwiZWFjaCIsImRhdGEiLCJjYWxsIiwib2xkIiwiYWxlcnQiLCJDb25zdHJ1Y3RvciIsIm5vQ29uZmxpY3QiLCJCdXR0b24iLCJlbGVtZW50Iiwib3B0aW9ucyIsIiRlbGVtZW50IiwiZXh0ZW5kIiwiREVGQVVMVFMiLCJpc0xvYWRpbmciLCJsb2FkaW5nVGV4dCIsInNldFN0YXRlIiwic3RhdGUiLCJkIiwidmFsIiwicmVzZXRUZXh0IiwicHJveHkiLCJhZGRDbGFzcyIsInByb3AiLCJyZW1vdmVBdHRyIiwidG9nZ2xlIiwiY2hhbmdlZCIsIiRpbnB1dCIsImZpbmQiLCJ0b2dnbGVDbGFzcyIsImJ1dHRvbiIsIiRidG4iLCJmaXJzdCIsInRlc3QiLCJ0eXBlIiwiQ2Fyb3VzZWwiLCIkaW5kaWNhdG9ycyIsInBhdXNlZCIsInNsaWRpbmciLCJpbnRlcnZhbCIsIiRhY3RpdmUiLCIkaXRlbXMiLCJrZXlib2FyZCIsImtleWRvd24iLCJwYXVzZSIsImRvY3VtZW50RWxlbWVudCIsImN5Y2xlIiwid3JhcCIsInRhZ05hbWUiLCJ3aGljaCIsInByZXYiLCJuZXh0IiwiY2xlYXJJbnRlcnZhbCIsInNldEludGVydmFsIiwiZ2V0SXRlbUluZGV4IiwiaXRlbSIsInBhcmVudCIsImNoaWxkcmVuIiwiaW5kZXgiLCJnZXRJdGVtRm9yRGlyZWN0aW9uIiwiZGlyZWN0aW9uIiwiYWN0aXZlIiwiYWN0aXZlSW5kZXgiLCJ3aWxsV3JhcCIsImRlbHRhIiwiaXRlbUluZGV4IiwiZXEiLCJ0byIsInBvcyIsInRoYXQiLCJzbGlkZSIsIiRuZXh0IiwiaXNDeWNsaW5nIiwicmVsYXRlZFRhcmdldCIsInNsaWRlRXZlbnQiLCIkbmV4dEluZGljYXRvciIsInNsaWRFdmVudCIsIm9mZnNldFdpZHRoIiwiam9pbiIsImFjdGlvbiIsImNhcm91c2VsIiwiY2xpY2tIYW5kbGVyIiwiaHJlZiIsIiR0YXJnZXQiLCJzbGlkZUluZGV4Iiwid2luZG93IiwiJGNhcm91c2VsIiwiQ29sbGFwc2UiLCIkdHJpZ2dlciIsImlkIiwidHJhbnNpdGlvbmluZyIsImdldFBhcmVudCIsImFkZEFyaWFBbmRDb2xsYXBzZWRDbGFzcyIsImRpbWVuc2lvbiIsImhhc1dpZHRoIiwic2hvdyIsImFjdGl2ZXNEYXRhIiwiYWN0aXZlcyIsInN0YXJ0RXZlbnQiLCJjb21wbGV0ZSIsInNjcm9sbFNpemUiLCJjYW1lbENhc2UiLCJoaWRlIiwib2Zmc2V0SGVpZ2h0IiwiaSIsImdldFRhcmdldEZyb21UcmlnZ2VyIiwiaXNPcGVuIiwiY29sbGFwc2UiLCJiYWNrZHJvcCIsIkRyb3Bkb3duIiwiY2xlYXJNZW51cyIsImNvbnRhaW5zIiwiaXNBY3RpdmUiLCJpbnNlcnRBZnRlciIsInN0b3BQcm9wYWdhdGlvbiIsImRlc2MiLCJkcm9wZG93biIsIk1vZGFsIiwiJGJvZHkiLCJib2R5IiwiJGRpYWxvZyIsIiRiYWNrZHJvcCIsImlzU2hvd24iLCJvcmlnaW5hbEJvZHlQYWQiLCJzY3JvbGxiYXJXaWR0aCIsImlnbm9yZUJhY2tkcm9wQ2xpY2siLCJyZW1vdGUiLCJsb2FkIiwiQkFDS0RST1BfVFJBTlNJVElPTl9EVVJBVElPTiIsIl9yZWxhdGVkVGFyZ2V0IiwiY2hlY2tTY3JvbGxiYXIiLCJzZXRTY3JvbGxiYXIiLCJlc2NhcGUiLCJyZXNpemUiLCJhcHBlbmRUbyIsInNjcm9sbFRvcCIsImFkanVzdERpYWxvZyIsImVuZm9yY2VGb2N1cyIsIm9mZiIsImhpZGVNb2RhbCIsImhhcyIsImhhbmRsZVVwZGF0ZSIsInJlc2V0QWRqdXN0bWVudHMiLCJyZXNldFNjcm9sbGJhciIsInJlbW92ZUJhY2tkcm9wIiwiYW5pbWF0ZSIsImRvQW5pbWF0ZSIsImN1cnJlbnRUYXJnZXQiLCJmb2N1cyIsImNhbGxiYWNrUmVtb3ZlIiwibW9kYWxJc092ZXJmbG93aW5nIiwic2Nyb2xsSGVpZ2h0IiwiY2xpZW50SGVpZ2h0IiwiY3NzIiwicGFkZGluZ0xlZnQiLCJib2R5SXNPdmVyZmxvd2luZyIsInBhZGRpbmdSaWdodCIsImZ1bGxXaW5kb3dXaWR0aCIsImlubmVyV2lkdGgiLCJkb2N1bWVudEVsZW1lbnRSZWN0IiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwicmlnaHQiLCJNYXRoIiwiYWJzIiwibGVmdCIsImNsaWVudFdpZHRoIiwibWVhc3VyZVNjcm9sbGJhciIsImJvZHlQYWQiLCJwYXJzZUludCIsInNjcm9sbERpdiIsImNsYXNzTmFtZSIsImFwcGVuZCIsInJlbW92ZUNoaWxkIiwibW9kYWwiLCJzaG93RXZlbnQiLCJUb29sdGlwIiwiZW5hYmxlZCIsInRpbWVvdXQiLCJob3ZlclN0YXRlIiwiaW5TdGF0ZSIsImluaXQiLCJhbmltYXRpb24iLCJwbGFjZW1lbnQiLCJ0ZW1wbGF0ZSIsInRpdGxlIiwiZGVsYXkiLCJodG1sIiwiY29udGFpbmVyIiwidmlld3BvcnQiLCJwYWRkaW5nIiwiZ2V0T3B0aW9ucyIsIiR2aWV3cG9ydCIsImlzRnVuY3Rpb24iLCJjbGljayIsImhvdmVyIiwiY29uc3RydWN0b3IiLCJ0cmlnZ2VycyIsImV2ZW50SW4iLCJldmVudE91dCIsImVudGVyIiwibGVhdmUiLCJfb3B0aW9ucyIsImZpeFRpdGxlIiwiZ2V0RGVmYXVsdHMiLCJnZXREZWxlZ2F0ZU9wdGlvbnMiLCJkZWZhdWx0cyIsImtleSIsInZhbHVlIiwib2JqIiwic2VsZiIsInRpcCIsImNsZWFyVGltZW91dCIsImlzSW5TdGF0ZVRydWUiLCJoYXNDb250ZW50IiwiaW5Eb20iLCJvd25lckRvY3VtZW50IiwiJHRpcCIsInRpcElkIiwiZ2V0VUlEIiwic2V0Q29udGVudCIsImF1dG9Ub2tlbiIsImF1dG9QbGFjZSIsInRvcCIsImRpc3BsYXkiLCJnZXRQb3NpdGlvbiIsImFjdHVhbFdpZHRoIiwiYWN0dWFsSGVpZ2h0Iiwib3JnUGxhY2VtZW50Iiwidmlld3BvcnREaW0iLCJib3R0b20iLCJ3aWR0aCIsImNhbGN1bGF0ZWRPZmZzZXQiLCJnZXRDYWxjdWxhdGVkT2Zmc2V0IiwiYXBwbHlQbGFjZW1lbnQiLCJwcmV2SG92ZXJTdGF0ZSIsIm9mZnNldCIsImhlaWdodCIsIm1hcmdpblRvcCIsIm1hcmdpbkxlZnQiLCJpc05hTiIsInNldE9mZnNldCIsInVzaW5nIiwicHJvcHMiLCJyb3VuZCIsImdldFZpZXdwb3J0QWRqdXN0ZWREZWx0YSIsImlzVmVydGljYWwiLCJhcnJvd0RlbHRhIiwiYXJyb3dPZmZzZXRQb3NpdGlvbiIsInJlcGxhY2VBcnJvdyIsImFycm93IiwiZ2V0VGl0bGUiLCIkZSIsImlzQm9keSIsImVsUmVjdCIsImlzU3ZnIiwiU1ZHRWxlbWVudCIsImVsT2Zmc2V0Iiwic2Nyb2xsIiwib3V0ZXJEaW1zIiwidmlld3BvcnRQYWRkaW5nIiwidmlld3BvcnREaW1lbnNpb25zIiwidG9wRWRnZU9mZnNldCIsImJvdHRvbUVkZ2VPZmZzZXQiLCJsZWZ0RWRnZU9mZnNldCIsInJpZ2h0RWRnZU9mZnNldCIsIm8iLCJwcmVmaXgiLCJyYW5kb20iLCJnZXRFbGVtZW50QnlJZCIsIiRhcnJvdyIsImVuYWJsZSIsImRpc2FibGUiLCJ0b2dnbGVFbmFibGVkIiwiZGVzdHJveSIsInJlbW92ZURhdGEiLCJ0b29sdGlwIiwiUG9wb3ZlciIsImNvbnRlbnQiLCJnZXRDb250ZW50IiwicG9wb3ZlciIsIlNjcm9sbFNweSIsIiRzY3JvbGxFbGVtZW50Iiwib2Zmc2V0cyIsInRhcmdldHMiLCJhY3RpdmVUYXJnZXQiLCJwcm9jZXNzIiwicmVmcmVzaCIsImdldFNjcm9sbEhlaWdodCIsIm1heCIsIm9mZnNldE1ldGhvZCIsIm9mZnNldEJhc2UiLCJpc1dpbmRvdyIsIm1hcCIsIiRocmVmIiwic29ydCIsImEiLCJiIiwicHVzaCIsIm1heFNjcm9sbCIsImFjdGl2YXRlIiwiY2xlYXIiLCJwYXJlbnRzIiwicGFyZW50c1VudGlsIiwic2Nyb2xsc3B5IiwiJHNweSIsIlRhYiIsIiR1bCIsIiRwcmV2aW91cyIsImhpZGVFdmVudCIsInRhYiIsIkFmZml4IiwiY2hlY2tQb3NpdGlvbiIsImNoZWNrUG9zaXRpb25XaXRoRXZlbnRMb29wIiwiYWZmaXhlZCIsInVucGluIiwicGlubmVkT2Zmc2V0IiwiUkVTRVQiLCJnZXRTdGF0ZSIsIm9mZnNldFRvcCIsIm9mZnNldEJvdHRvbSIsInBvc2l0aW9uIiwidGFyZ2V0SGVpZ2h0IiwiaW5pdGlhbGl6aW5nIiwiY29sbGlkZXJUb3AiLCJjb2xsaWRlckhlaWdodCIsImdldFBpbm5lZE9mZnNldCIsImFmZml4IiwiYWZmaXhUeXBlIiwiZmxleHlfaGVhZGVyIiwicHViIiwiJGhlYWRlcl9zdGF0aWMiLCIkaGVhZGVyX3N0aWNreSIsInVwZGF0ZV9pbnRlcnZhbCIsInRvbGVyYW5jZSIsInVwd2FyZCIsImRvd253YXJkIiwiX2dldF9vZmZzZXRfZnJvbV9lbGVtZW50c19ib3R0b20iLCJjbGFzc2VzIiwicGlubmVkIiwidW5waW5uZWQiLCJ3YXNfc2Nyb2xsZWQiLCJsYXN0X2Rpc3RhbmNlX2Zyb21fdG9wIiwicmVnaXN0ZXJFdmVudEhhbmRsZXJzIiwicmVnaXN0ZXJCb290RXZlbnRIYW5kbGVycyIsImRvY3VtZW50X3dhc19zY3JvbGxlZCIsImVsZW1lbnRfaGVpZ2h0Iiwib3V0ZXJIZWlnaHQiLCJlbGVtZW50X29mZnNldCIsImN1cnJlbnRfZGlzdGFuY2VfZnJvbV90b3AiLCJmbGV4eV9uYXZpZ2F0aW9uIiwibGF5b3V0X2NsYXNzZXMiLCJ1cGdyYWRlIiwiJG5hdmlnYXRpb25zIiwibmF2aWdhdGlvbiIsIiRuYXZpZ2F0aW9uIiwiJG1lZ2FtZW51cyIsImRyb3Bkb3duX21lZ2FtZW51IiwiJGRyb3Bkb3duX21lZ2FtZW51IiwiZHJvcGRvd25faGFzX21lZ2FtZW51IiwiaXNfdXBncmFkZWQiLCJuYXZpZ2F0aW9uX2hhc19tZWdhbWVudSIsIiRtZWdhbWVudSIsImhhc19vYmZ1c2NhdG9yIiwib2JmdXNjYXRvciIsImJhYmVsSGVscGVycyIsImNsYXNzQ2FsbENoZWNrIiwiaW5zdGFuY2UiLCJUeXBlRXJyb3IiLCJjcmVhdGVDbGFzcyIsImRlZmluZVByb3BlcnRpZXMiLCJkZXNjcmlwdG9yIiwiZW51bWVyYWJsZSIsImNvbmZpZ3VyYWJsZSIsIndyaXRhYmxlIiwiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJwcm90b1Byb3BzIiwic3RhdGljUHJvcHMiLCJzaWRyU3RhdHVzIiwibW92aW5nIiwib3BlbmVkIiwiaGVscGVyIiwiaXNVcmwiLCJzdHIiLCJwYXR0ZXJuIiwiUmVnRXhwIiwiYWRkUHJlZml4ZXMiLCJhZGRQcmVmaXgiLCJhdHRyaWJ1dGUiLCJ0b1JlcGxhY2UiLCJ0cmFuc2l0aW9ucyIsInN1cHBvcnRlZCIsInByb3BlcnR5IiwicHJlZml4ZXMiLCJjaGFyQXQiLCJ0b1VwcGVyQ2FzZSIsInN1YnN0ciIsInRvTG93ZXJDYXNlIiwiJCQyIiwiYm9keUFuaW1hdGlvbkNsYXNzIiwib3BlbkFjdGlvbiIsImNsb3NlQWN0aW9uIiwidHJhbnNpdGlvbkVuZEV2ZW50IiwiTWVudSIsIm9wZW5DbGFzcyIsIm1lbnVXaWR0aCIsIm91dGVyV2lkdGgiLCJzcGVlZCIsInNpZGUiLCJkaXNwbGFjZSIsInRpbWluZyIsIm1ldGhvZCIsIm9uT3BlbkNhbGxiYWNrIiwib25DbG9zZUNhbGxiYWNrIiwib25PcGVuRW5kQ2FsbGJhY2siLCJvbkNsb3NlRW5kQ2FsbGJhY2siLCJnZXRBbmltYXRpb24iLCJwcmVwYXJlQm9keSIsIiRodG1sIiwib3BlbkJvZHkiLCJib2R5QW5pbWF0aW9uIiwicXVldWUiLCJvbkNsb3NlQm9keSIsInJlc2V0U3R5bGVzIiwidW5iaW5kIiwiY2xvc2VCb2R5IiwiX3RoaXMiLCJtb3ZlQm9keSIsIm9uT3Blbk1lbnUiLCJvcGVuTWVudSIsIl90aGlzMiIsIiRpdGVtIiwibWVudUFuaW1hdGlvbiIsIm9uQ2xvc2VNZW51IiwiY2xvc2VNZW51IiwiX3RoaXMzIiwibW92ZU1lbnUiLCJtb3ZlIiwib3BlbiIsIl90aGlzNCIsImFscmVhZHlPcGVuZWRNZW51IiwiJCQxIiwiZXhlY3V0ZSIsInNpZHIiLCJlcnJvciIsInB1YmxpY01ldGhvZHMiLCJtZXRob2ROYW1lIiwibWV0aG9kcyIsImdldE1ldGhvZCIsIkFycmF5Iiwic2xpY2UiLCIkJDMiLCJmaWxsQ29udGVudCIsIiRzaWRlTWVudSIsInNldHRpbmdzIiwic291cmNlIiwibmV3Q29udGVudCIsImdldCIsImh0bWxDb250ZW50Iiwic2VsZWN0b3JzIiwicmVuYW1pbmciLCIkaHRtbENvbnRlbnQiLCJmblNpZHIiLCJiaW5kIiwib25PcGVuIiwib25DbG9zZSIsIm9uT3BlbkVuZCIsIm9uQ2xvc2VFbmQiLCJmbGFnIiwidCIsInNsaW5reSIsInMiLCJsYWJlbCIsIm4iLCJyIiwibCIsInByZXBlbmQiLCJ0ZXh0IiwiRGF0ZSIsIm5vdyIsImp1bXAiLCJob21lIiwiYyIsIkFqYXhNb25pdG9yIiwiQmFyIiwiRG9jdW1lbnRNb25pdG9yIiwiRWxlbWVudE1vbml0b3IiLCJFbGVtZW50VHJhY2tlciIsIkV2ZW50TGFnTW9uaXRvciIsIkV2ZW50ZWQiLCJFdmVudHMiLCJOb1RhcmdldEVycm9yIiwiUGFjZSIsIlJlcXVlc3RJbnRlcmNlcHQiLCJTT1VSQ0VfS0VZUyIsIlNjYWxlciIsIlNvY2tldFJlcXVlc3RUcmFja2VyIiwiWEhSUmVxdWVzdFRyYWNrZXIiLCJhdmdBbXBsaXR1ZGUiLCJiYXIiLCJjYW5jZWxBbmltYXRpb24iLCJjYW5jZWxBbmltYXRpb25GcmFtZSIsImRlZmF1bHRPcHRpb25zIiwiZXh0ZW5kTmF0aXZlIiwiZ2V0RnJvbURPTSIsImdldEludGVyY2VwdCIsImhhbmRsZVB1c2hTdGF0ZSIsImlnbm9yZVN0YWNrIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwicmVzdWx0IiwicnVuQW5pbWF0aW9uIiwic2NhbGVycyIsInNob3VsZElnbm9yZVVSTCIsInNob3VsZFRyYWNrIiwic291cmNlcyIsInVuaVNjYWxlciIsIl9XZWJTb2NrZXQiLCJfWERvbWFpblJlcXVlc3QiLCJfWE1MSHR0cFJlcXVlc3QiLCJfaSIsIl9pbnRlcmNlcHQiLCJfbGVuIiwiX3B1c2hTdGF0ZSIsIl9yZWYiLCJfcmVmMSIsIl9yZXBsYWNlU3RhdGUiLCJfX3NsaWNlIiwiX19oYXNQcm9wIiwiaGFzT3duUHJvcGVydHkiLCJfX2V4dGVuZHMiLCJjaGlsZCIsImN0b3IiLCJfX3N1cGVyX18iLCJfX2luZGV4T2YiLCJpbmRleE9mIiwiY2F0Y2h1cFRpbWUiLCJpbml0aWFsUmF0ZSIsIm1pblRpbWUiLCJnaG9zdFRpbWUiLCJtYXhQcm9ncmVzc1BlckZyYW1lIiwiZWFzZUZhY3RvciIsInN0YXJ0T25QYWdlTG9hZCIsInJlc3RhcnRPblB1c2hTdGF0ZSIsInJlc3RhcnRPblJlcXVlc3RBZnRlciIsImVsZW1lbnRzIiwiY2hlY2tJbnRlcnZhbCIsImV2ZW50TGFnIiwibWluU2FtcGxlcyIsInNhbXBsZUNvdW50IiwibGFnVGhyZXNob2xkIiwiYWpheCIsInRyYWNrTWV0aG9kcyIsInRyYWNrV2ViU29ja2V0cyIsImlnbm9yZVVSTHMiLCJwZXJmb3JtYW5jZSIsIm1velJlcXVlc3RBbmltYXRpb25GcmFtZSIsIndlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZSIsIm1zUmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwibW96Q2FuY2VsQW5pbWF0aW9uRnJhbWUiLCJsYXN0IiwidGljayIsImRpZmYiLCJhcmdzIiwib3V0IiwiYXJyIiwiY291bnQiLCJzdW0iLCJ2IiwianNvbiIsInF1ZXJ5U2VsZWN0b3IiLCJnZXRBdHRyaWJ1dGUiLCJKU09OIiwicGFyc2UiLCJfZXJyb3IiLCJjb25zb2xlIiwiY3R4Iiwib25jZSIsIl9iYXNlIiwiYmluZGluZ3MiLCJfcmVzdWx0cyIsInNwbGljZSIsInBhY2VPcHRpb25zIiwiX3N1cGVyIiwicHJvZ3Jlc3MiLCJnZXRFbGVtZW50IiwidGFyZ2V0RWxlbWVudCIsImlubmVySFRNTCIsImZpcnN0Q2hpbGQiLCJpbnNlcnRCZWZvcmUiLCJhcHBlbmRDaGlsZCIsImZpbmlzaCIsInVwZGF0ZSIsInByb2ciLCJyZW5kZXIiLCJwYXJlbnROb2RlIiwicHJvZ3Jlc3NTdHIiLCJ0cmFuc2Zvcm0iLCJfaiIsIl9sZW4xIiwiX3JlZjIiLCJsYXN0UmVuZGVyZWRQcm9ncmVzcyIsInNldEF0dHJpYnV0ZSIsImRvbmUiLCJiaW5kaW5nIiwiWE1MSHR0cFJlcXVlc3QiLCJYRG9tYWluUmVxdWVzdCIsIldlYlNvY2tldCIsImZyb20iLCJpZ25vcmUiLCJyZXQiLCJ1bnNoaWZ0Iiwic2hpZnQiLCJ0cmFjayIsIm1vbml0b3JYSFIiLCJyZXEiLCJfb3BlbiIsInVybCIsImFzeW5jIiwicmVxdWVzdCIsImZsYWdzIiwicHJvdG9jb2xzIiwiX2FyZyIsImFmdGVyIiwicnVubmluZyIsInN0aWxsQWN0aXZlIiwiX3JlZjMiLCJyZWFkeVN0YXRlIiwicmVzdGFydCIsIndhdGNoIiwidHJhY2tlciIsInNpemUiLCJfb25yZWFkeXN0YXRlY2hhbmdlIiwiUHJvZ3Jlc3NFdmVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJldnQiLCJsZW5ndGhDb21wdXRhYmxlIiwibG9hZGVkIiwidG90YWwiLCJvbnJlYWR5c3RhdGVjaGFuZ2UiLCJjaGVjayIsInN0YXRlcyIsImxvYWRpbmciLCJpbnRlcmFjdGl2ZSIsImF2ZyIsInBvaW50cyIsInNhbXBsZXMiLCJzaW5jZUxhc3RVcGRhdGUiLCJyYXRlIiwiY2F0Y2h1cCIsImxhc3RQcm9ncmVzcyIsImZyYW1lVGltZSIsInNjYWxpbmciLCJwb3ciLCJtaW4iLCJoaXN0b3J5IiwicHVzaFN0YXRlIiwicmVwbGFjZVN0YXRlIiwiX2siLCJfbGVuMiIsIl9yZWY0IiwiZXh0cmFTb3VyY2VzIiwic3RvcCIsInN0YXJ0IiwiZ28iLCJlbnF1ZXVlTmV4dEZyYW1lIiwiaiIsInJlbWFpbmluZyIsInNjYWxlciIsInNjYWxlckxpc3QiLCJkZWZpbmUiLCJhbWQiLCJleHBvcnRzIiwibW9kdWxlIiwiJGhlYWRlcnMiLCIkZHJvcGRvd25zIiwiJGhlYWRlciIsIiRsaXN0X2l0ZW1zIiwiJGxpc3RfaXRlbSIsIiRkcm9wZG93bl9tZW51IiwiJGRyb3Bkb3duX21lbnVzIiwidGFsbGVzdF9kcm9wZG93biIsIk1vZGVybml6ciIsInRvdWNoZXZlbnRzIl0sIm1hcHBpbmdzIjoiOzs7O0FBQUE7Ozs7OztBQU1BLElBQUksT0FBT0EsTUFBUCxLQUFrQixXQUF0QixFQUFtQztB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aEIsTUFBeEIsQ0FBK0I7QUFDM0I5UixlQUFPLElBRG9CO0FBRTNCZ1MsZUFBTztBQUZvQixLQUEvQjs7QUFLQTtBQUNBLFFBQUdpTixVQUFVQyxXQUFiLEVBQTBCO0FBQ3RCenVCLFVBQUUsdUJBQUYsRUFBMkJrVixPQUEzQixDQUFtQyxNQUFuQztBQUNILEtBRkQsTUFHSztBQUNEbFYsVUFBRSx1QkFBRixFQUEyQmtWLE9BQTNCO0FBQ0g7QUFDSixDQWhDRCIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiFcbiAqIEJvb3RzdHJhcCB2My4zLjcgKGh0dHA6Ly9nZXRib290c3RyYXAuY29tKVxuICogQ29weXJpZ2h0IDIwMTEtMjAxNiBUd2l0dGVyLCBJbmMuXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2VcbiAqL1xuXG5pZiAodHlwZW9mIGpRdWVyeSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgdGhyb3cgbmV3IEVycm9yKCdCb290c3RyYXBcXCdzIEphdmFTY3JpcHQgcmVxdWlyZXMgalF1ZXJ5Jylcbn1cblxuK2Z1bmN0aW9uICgkKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgdmFyIHZlcnNpb24gPSAkLmZuLmpxdWVyeS5zcGxpdCgnICcpWzBdLnNwbGl0KCcuJylcbiAgaWYgKCh2ZXJzaW9uWzBdIDwgMiAmJiB2ZXJzaW9uWzFdIDwgOSkgfHwgKHZlcnNpb25bMF0gPT0gMSAmJiB2ZXJzaW9uWzFdID09IDkgJiYgdmVyc2lvblsyXSA8IDEpIHx8ICh2ZXJzaW9uWzBdID4gMykpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0Jvb3RzdHJhcFxcJ3MgSmF2YVNjcmlwdCByZXF1aXJlcyBqUXVlcnkgdmVyc2lvbiAxLjkuMSBvciBoaWdoZXIsIGJ1dCBsb3dlciB0aGFuIHZlcnNpb24gNCcpXG4gIH1cbn0oalF1ZXJ5KTtcblxuLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKiBCb290c3RyYXA6IHRyYW5zaXRpb24uanMgdjMuMy43XG4gKiBodHRwOi8vZ2V0Ym9vdHN0cmFwLmNvbS9qYXZhc2NyaXB0LyN0cmFuc2l0aW9uc1xuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKiBDb3B5cmlnaHQgMjAxMS0yMDE2IFR3aXR0ZXIsIEluYy5cbiAqIExpY2Vuc2VkIHVuZGVyIE1JVCAoaHR0cHM6Ly9naXRodWIuY29tL3R3YnMvYm9vdHN0cmFwL2Jsb2IvbWFzdGVyL0xJQ0VOU0UpXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuXG4rZnVuY3Rpb24gKCQpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIC8vIENTUyBUUkFOU0lUSU9OIFNVUFBPUlQgKFNob3V0b3V0OiBodHRwOi8vd3d3Lm1vZGVybml6ci5jb20vKVxuICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuICBmdW5jdGlvbiB0cmFuc2l0aW9uRW5kKCkge1xuICAgIHZhciBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2Jvb3RzdHJhcCcpXG5cbiAgICB2YXIgdHJhbnNFbmRFdmVudE5hbWVzID0ge1xuICAgICAgV2Via2l0VHJhbnNpdGlvbiA6ICd3ZWJraXRUcmFuc2l0aW9uRW5kJyxcbiAgICAgIE1velRyYW5zaXRpb24gICAgOiAndHJhbnNpdGlvbmVuZCcsXG4gICAgICBPVHJhbnNpdGlvbiAgICAgIDogJ29UcmFuc2l0aW9uRW5kIG90cmFuc2l0aW9uZW5kJyxcbiAgICAgIHRyYW5zaXRpb24gICAgICAgOiAndHJhbnNpdGlvbmVuZCdcbiAgICB9XG5cbiAgICBmb3IgKHZhciBuYW1lIGluIHRyYW5zRW5kRXZlbnROYW1lcykge1xuICAgICAgaWYgKGVsLnN0eWxlW25hbWVdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIHsgZW5kOiB0cmFuc0VuZEV2ZW50TmFtZXNbbmFtZV0gfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBmYWxzZSAvLyBleHBsaWNpdCBmb3IgaWU4ICggIC5fLilcbiAgfVxuXG4gIC8vIGh0dHA6Ly9ibG9nLmFsZXhtYWNjYXcuY29tL2Nzcy10cmFuc2l0aW9uc1xuICAkLmZuLmVtdWxhdGVUcmFuc2l0aW9uRW5kID0gZnVuY3Rpb24gKGR1cmF0aW9uKSB7XG4gICAgdmFyIGNhbGxlZCA9IGZhbHNlXG4gICAgdmFyICRlbCA9IHRoaXNcbiAgICAkKHRoaXMpLm9uZSgnYnNUcmFuc2l0aW9uRW5kJywgZnVuY3Rpb24gKCkgeyBjYWxsZWQgPSB0cnVlIH0pXG4gICAgdmFyIGNhbGxiYWNrID0gZnVuY3Rpb24gKCkgeyBpZiAoIWNhbGxlZCkgJCgkZWwpLnRyaWdnZXIoJC5zdXBwb3J0LnRyYW5zaXRpb24uZW5kKSB9XG4gICAgc2V0VGltZW91dChjYWxsYmFjaywgZHVyYXRpb24pXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gICQoZnVuY3Rpb24gKCkge1xuICAgICQuc3VwcG9ydC50cmFuc2l0aW9uID0gdHJhbnNpdGlvbkVuZCgpXG5cbiAgICBpZiAoISQuc3VwcG9ydC50cmFuc2l0aW9uKSByZXR1cm5cblxuICAgICQuZXZlbnQuc3BlY2lhbC5ic1RyYW5zaXRpb25FbmQgPSB7XG4gICAgICBiaW5kVHlwZTogJC5zdXBwb3J0LnRyYW5zaXRpb24uZW5kLFxuICAgICAgZGVsZWdhdGVUeXBlOiAkLnN1cHBvcnQudHJhbnNpdGlvbi5lbmQsXG4gICAgICBoYW5kbGU6IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGlmICgkKGUudGFyZ2V0KS5pcyh0aGlzKSkgcmV0dXJuIGUuaGFuZGxlT2JqLmhhbmRsZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKVxuICAgICAgfVxuICAgIH1cbiAgfSlcblxufShqUXVlcnkpO1xuXG4vKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqIEJvb3RzdHJhcDogYWxlcnQuanMgdjMuMy43XG4gKiBodHRwOi8vZ2V0Ym9vdHN0cmFwLmNvbS9qYXZhc2NyaXB0LyNhbGVydHNcbiAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICogQ29weXJpZ2h0IDIwMTEtMjAxNiBUd2l0dGVyLCBJbmMuXG4gKiBMaWNlbnNlZCB1bmRlciBNSVQgKGh0dHBzOi8vZ2l0aHViLmNvbS90d2JzL2Jvb3RzdHJhcC9ibG9iL21hc3Rlci9MSUNFTlNFKVxuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5cblxuK2Z1bmN0aW9uICgkKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICAvLyBBTEVSVCBDTEFTUyBERUZJTklUSU9OXG4gIC8vID09PT09PT09PT09PT09PT09PT09PT1cblxuICB2YXIgZGlzbWlzcyA9ICdbZGF0YS1kaXNtaXNzPVwiYWxlcnRcIl0nXG4gIHZhciBBbGVydCAgID0gZnVuY3Rpb24gKGVsKSB7XG4gICAgJChlbCkub24oJ2NsaWNrJywgZGlzbWlzcywgdGhpcy5jbG9zZSlcbiAgfVxuXG4gIEFsZXJ0LlZFUlNJT04gPSAnMy4zLjcnXG5cbiAgQWxlcnQuVFJBTlNJVElPTl9EVVJBVElPTiA9IDE1MFxuXG4gIEFsZXJ0LnByb3RvdHlwZS5jbG9zZSA9IGZ1bmN0aW9uIChlKSB7XG4gICAgdmFyICR0aGlzICAgID0gJCh0aGlzKVxuICAgIHZhciBzZWxlY3RvciA9ICR0aGlzLmF0dHIoJ2RhdGEtdGFyZ2V0JylcblxuICAgIGlmICghc2VsZWN0b3IpIHtcbiAgICAgIHNlbGVjdG9yID0gJHRoaXMuYXR0cignaHJlZicpXG4gICAgICBzZWxlY3RvciA9IHNlbGVjdG9yICYmIHNlbGVjdG9yLnJlcGxhY2UoLy4qKD89I1teXFxzXSokKS8sICcnKSAvLyBzdHJpcCBmb3IgaWU3XG4gICAgfVxuXG4gICAgdmFyICRwYXJlbnQgPSAkKHNlbGVjdG9yID09PSAnIycgPyBbXSA6IHNlbGVjdG9yKVxuXG4gICAgaWYgKGUpIGUucHJldmVudERlZmF1bHQoKVxuXG4gICAgaWYgKCEkcGFyZW50Lmxlbmd0aCkge1xuICAgICAgJHBhcmVudCA9ICR0aGlzLmNsb3Nlc3QoJy5hbGVydCcpXG4gICAgfVxuXG4gICAgJHBhcmVudC50cmlnZ2VyKGUgPSAkLkV2ZW50KCdjbG9zZS5icy5hbGVydCcpKVxuXG4gICAgaWYgKGUuaXNEZWZhdWx0UHJldmVudGVkKCkpIHJldHVyblxuXG4gICAgJHBhcmVudC5yZW1vdmVDbGFzcygnaW4nKVxuXG4gICAgZnVuY3Rpb24gcmVtb3ZlRWxlbWVudCgpIHtcbiAgICAgIC8vIGRldGFjaCBmcm9tIHBhcmVudCwgZmlyZSBldmVudCB0aGVuIGNsZWFuIHVwIGRhdGFcbiAgICAgICRwYXJlbnQuZGV0YWNoKCkudHJpZ2dlcignY2xvc2VkLmJzLmFsZXJ0JykucmVtb3ZlKClcbiAgICB9XG5cbiAgICAkLnN1cHBvcnQudHJhbnNpdGlvbiAmJiAkcGFyZW50Lmhhc0NsYXNzKCdmYWRlJykgP1xuICAgICAgJHBhcmVudFxuICAgICAgICAub25lKCdic1RyYW5zaXRpb25FbmQnLCByZW1vdmVFbGVtZW50KVxuICAgICAgICAuZW11bGF0ZVRyYW5zaXRpb25FbmQoQWxlcnQuVFJBTlNJVElPTl9EVVJBVElPTikgOlxuICAgICAgcmVtb3ZlRWxlbWVudCgpXG4gIH1cblxuXG4gIC8vIEFMRVJUIFBMVUdJTiBERUZJTklUSU9OXG4gIC8vID09PT09PT09PT09PT09PT09PT09PT09XG5cbiAgZnVuY3Rpb24gUGx1Z2luKG9wdGlvbikge1xuICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgdmFyICR0aGlzID0gJCh0aGlzKVxuICAgICAgdmFyIGRhdGEgID0gJHRoaXMuZGF0YSgnYnMuYWxlcnQnKVxuXG4gICAgICBpZiAoIWRhdGEpICR0aGlzLmRhdGEoJ2JzLmFsZXJ0JywgKGRhdGEgPSBuZXcgQWxlcnQodGhpcykpKVxuICAgICAgaWYgKHR5cGVvZiBvcHRpb24gPT0gJ3N0cmluZycpIGRhdGFbb3B0aW9uXS5jYWxsKCR0aGlzKVxuICAgIH0pXG4gIH1cblxuICB2YXIgb2xkID0gJC5mbi5hbGVydFxuXG4gICQuZm4uYWxlcnQgICAgICAgICAgICAgPSBQbHVnaW5cbiAgJC5mbi5hbGVydC5Db25zdHJ1Y3RvciA9IEFsZXJ0XG5cblxuICAvLyBBTEVSVCBOTyBDT05GTElDVFxuICAvLyA9PT09PT09PT09PT09PT09PVxuXG4gICQuZm4uYWxlcnQubm9Db25mbGljdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAkLmZuLmFsZXJ0ID0gb2xkXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG5cbiAgLy8gQUxFUlQgREFUQS1BUElcbiAgLy8gPT09PT09PT09PT09PT1cblxuICAkKGRvY3VtZW50KS5vbignY2xpY2suYnMuYWxlcnQuZGF0YS1hcGknLCBkaXNtaXNzLCBBbGVydC5wcm90b3R5cGUuY2xvc2UpXG5cbn0oalF1ZXJ5KTtcblxuLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKiBCb290c3RyYXA6IGJ1dHRvbi5qcyB2My4zLjdcbiAqIGh0dHA6Ly9nZXRib290c3RyYXAuY29tL2phdmFzY3JpcHQvI2J1dHRvbnNcbiAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICogQ29weXJpZ2h0IDIwMTEtMjAxNiBUd2l0dGVyLCBJbmMuXG4gKiBMaWNlbnNlZCB1bmRlciBNSVQgKGh0dHBzOi8vZ2l0aHViLmNvbS90d2JzL2Jvb3RzdHJhcC9ibG9iL21hc3Rlci9MSUNFTlNFKVxuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5cblxuK2Z1bmN0aW9uICgkKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICAvLyBCVVRUT04gUFVCTElDIENMQVNTIERFRklOSVRJT05cbiAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbiAgdmFyIEJ1dHRvbiA9IGZ1bmN0aW9uIChlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgdGhpcy4kZWxlbWVudCAgPSAkKGVsZW1lbnQpXG4gICAgdGhpcy5vcHRpb25zICAgPSAkLmV4dGVuZCh7fSwgQnV0dG9uLkRFRkFVTFRTLCBvcHRpb25zKVxuICAgIHRoaXMuaXNMb2FkaW5nID0gZmFsc2VcbiAgfVxuXG4gIEJ1dHRvbi5WRVJTSU9OICA9ICczLjMuNydcblxuICBCdXR0b24uREVGQVVMVFMgPSB7XG4gICAgbG9hZGluZ1RleHQ6ICdsb2FkaW5nLi4uJ1xuICB9XG5cbiAgQnV0dG9uLnByb3RvdHlwZS5zZXRTdGF0ZSA9IGZ1bmN0aW9uIChzdGF0ZSkge1xuICAgIHZhciBkICAgID0gJ2Rpc2FibGVkJ1xuICAgIHZhciAkZWwgID0gdGhpcy4kZWxlbWVudFxuICAgIHZhciB2YWwgID0gJGVsLmlzKCdpbnB1dCcpID8gJ3ZhbCcgOiAnaHRtbCdcbiAgICB2YXIgZGF0YSA9ICRlbC5kYXRhKClcblxuICAgIHN0YXRlICs9ICdUZXh0J1xuXG4gICAgaWYgKGRhdGEucmVzZXRUZXh0ID09IG51bGwpICRlbC5kYXRhKCdyZXNldFRleHQnLCAkZWxbdmFsXSgpKVxuXG4gICAgLy8gcHVzaCB0byBldmVudCBsb29wIHRvIGFsbG93IGZvcm1zIHRvIHN1Ym1pdFxuICAgIHNldFRpbWVvdXQoJC5wcm94eShmdW5jdGlvbiAoKSB7XG4gICAgICAkZWxbdmFsXShkYXRhW3N0YXRlXSA9PSBudWxsID8gdGhpcy5vcHRpb25zW3N0YXRlXSA6IGRhdGFbc3RhdGVdKVxuXG4gICAgICBpZiAoc3RhdGUgPT0gJ2xvYWRpbmdUZXh0Jykge1xuICAgICAgICB0aGlzLmlzTG9hZGluZyA9IHRydWVcbiAgICAgICAgJGVsLmFkZENsYXNzKGQpLmF0dHIoZCwgZCkucHJvcChkLCB0cnVlKVxuICAgICAgfSBlbHNlIGlmICh0aGlzLmlzTG9hZGluZykge1xuICAgICAgICB0aGlzLmlzTG9hZGluZyA9IGZhbHNlXG4gICAgICAgICRlbC5yZW1vdmVDbGFzcyhkKS5yZW1vdmVBdHRyKGQpLnByb3AoZCwgZmFsc2UpXG4gICAgICB9XG4gICAgfSwgdGhpcyksIDApXG4gIH1cblxuICBCdXR0b24ucHJvdG90eXBlLnRvZ2dsZSA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgY2hhbmdlZCA9IHRydWVcbiAgICB2YXIgJHBhcmVudCA9IHRoaXMuJGVsZW1lbnQuY2xvc2VzdCgnW2RhdGEtdG9nZ2xlPVwiYnV0dG9uc1wiXScpXG5cbiAgICBpZiAoJHBhcmVudC5sZW5ndGgpIHtcbiAgICAgIHZhciAkaW5wdXQgPSB0aGlzLiRlbGVtZW50LmZpbmQoJ2lucHV0JylcbiAgICAgIGlmICgkaW5wdXQucHJvcCgndHlwZScpID09ICdyYWRpbycpIHtcbiAgICAgICAgaWYgKCRpbnB1dC5wcm9wKCdjaGVja2VkJykpIGNoYW5nZWQgPSBmYWxzZVxuICAgICAgICAkcGFyZW50LmZpbmQoJy5hY3RpdmUnKS5yZW1vdmVDbGFzcygnYWN0aXZlJylcbiAgICAgICAgdGhpcy4kZWxlbWVudC5hZGRDbGFzcygnYWN0aXZlJylcbiAgICAgIH0gZWxzZSBpZiAoJGlucHV0LnByb3AoJ3R5cGUnKSA9PSAnY2hlY2tib3gnKSB7XG4gICAgICAgIGlmICgoJGlucHV0LnByb3AoJ2NoZWNrZWQnKSkgIT09IHRoaXMuJGVsZW1lbnQuaGFzQ2xhc3MoJ2FjdGl2ZScpKSBjaGFuZ2VkID0gZmFsc2VcbiAgICAgICAgdGhpcy4kZWxlbWVudC50b2dnbGVDbGFzcygnYWN0aXZlJylcbiAgICAgIH1cbiAgICAgICRpbnB1dC5wcm9wKCdjaGVja2VkJywgdGhpcy4kZWxlbWVudC5oYXNDbGFzcygnYWN0aXZlJykpXG4gICAgICBpZiAoY2hhbmdlZCkgJGlucHV0LnRyaWdnZXIoJ2NoYW5nZScpXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuJGVsZW1lbnQuYXR0cignYXJpYS1wcmVzc2VkJywgIXRoaXMuJGVsZW1lbnQuaGFzQ2xhc3MoJ2FjdGl2ZScpKVxuICAgICAgdGhpcy4kZWxlbWVudC50b2dnbGVDbGFzcygnYWN0aXZlJylcbiAgICB9XG4gIH1cblxuXG4gIC8vIEJVVFRPTiBQTFVHSU4gREVGSU5JVElPTlxuICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT1cblxuICBmdW5jdGlvbiBQbHVnaW4ob3B0aW9uKSB7XG4gICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgJHRoaXMgICA9ICQodGhpcylcbiAgICAgIHZhciBkYXRhICAgID0gJHRoaXMuZGF0YSgnYnMuYnV0dG9uJylcbiAgICAgIHZhciBvcHRpb25zID0gdHlwZW9mIG9wdGlvbiA9PSAnb2JqZWN0JyAmJiBvcHRpb25cblxuICAgICAgaWYgKCFkYXRhKSAkdGhpcy5kYXRhKCdicy5idXR0b24nLCAoZGF0YSA9IG5ldyBCdXR0b24odGhpcywgb3B0aW9ucykpKVxuXG4gICAgICBpZiAob3B0aW9uID09ICd0b2dnbGUnKSBkYXRhLnRvZ2dsZSgpXG4gICAgICBlbHNlIGlmIChvcHRpb24pIGRhdGEuc2V0U3RhdGUob3B0aW9uKVxuICAgIH0pXG4gIH1cblxuICB2YXIgb2xkID0gJC5mbi5idXR0b25cblxuICAkLmZuLmJ1dHRvbiAgICAgICAgICAgICA9IFBsdWdpblxuICAkLmZuLmJ1dHRvbi5Db25zdHJ1Y3RvciA9IEJ1dHRvblxuXG5cbiAgLy8gQlVUVE9OIE5PIENPTkZMSUNUXG4gIC8vID09PT09PT09PT09PT09PT09PVxuXG4gICQuZm4uYnV0dG9uLm5vQ29uZmxpY3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgJC5mbi5idXR0b24gPSBvbGRcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cblxuICAvLyBCVVRUT04gREFUQS1BUElcbiAgLy8gPT09PT09PT09PT09PT09XG5cbiAgJChkb2N1bWVudClcbiAgICAub24oJ2NsaWNrLmJzLmJ1dHRvbi5kYXRhLWFwaScsICdbZGF0YS10b2dnbGVePVwiYnV0dG9uXCJdJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgIHZhciAkYnRuID0gJChlLnRhcmdldCkuY2xvc2VzdCgnLmJ0bicpXG4gICAgICBQbHVnaW4uY2FsbCgkYnRuLCAndG9nZ2xlJylcbiAgICAgIGlmICghKCQoZS50YXJnZXQpLmlzKCdpbnB1dFt0eXBlPVwicmFkaW9cIl0sIGlucHV0W3R5cGU9XCJjaGVja2JveFwiXScpKSkge1xuICAgICAgICAvLyBQcmV2ZW50IGRvdWJsZSBjbGljayBvbiByYWRpb3MsIGFuZCB0aGUgZG91YmxlIHNlbGVjdGlvbnMgKHNvIGNhbmNlbGxhdGlvbikgb24gY2hlY2tib3hlc1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgLy8gVGhlIHRhcmdldCBjb21wb25lbnQgc3RpbGwgcmVjZWl2ZSB0aGUgZm9jdXNcbiAgICAgICAgaWYgKCRidG4uaXMoJ2lucHV0LGJ1dHRvbicpKSAkYnRuLnRyaWdnZXIoJ2ZvY3VzJylcbiAgICAgICAgZWxzZSAkYnRuLmZpbmQoJ2lucHV0OnZpc2libGUsYnV0dG9uOnZpc2libGUnKS5maXJzdCgpLnRyaWdnZXIoJ2ZvY3VzJylcbiAgICAgIH1cbiAgICB9KVxuICAgIC5vbignZm9jdXMuYnMuYnV0dG9uLmRhdGEtYXBpIGJsdXIuYnMuYnV0dG9uLmRhdGEtYXBpJywgJ1tkYXRhLXRvZ2dsZV49XCJidXR0b25cIl0nLCBmdW5jdGlvbiAoZSkge1xuICAgICAgJChlLnRhcmdldCkuY2xvc2VzdCgnLmJ0bicpLnRvZ2dsZUNsYXNzKCdmb2N1cycsIC9eZm9jdXMoaW4pPyQvLnRlc3QoZS50eXBlKSlcbiAgICB9KVxuXG59KGpRdWVyeSk7XG5cbi8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICogQm9vdHN0cmFwOiBjYXJvdXNlbC5qcyB2My4zLjdcbiAqIGh0dHA6Ly9nZXRib290c3RyYXAuY29tL2phdmFzY3JpcHQvI2Nhcm91c2VsXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqIENvcHlyaWdodCAyMDExLTIwMTYgVHdpdHRlciwgSW5jLlxuICogTGljZW5zZWQgdW5kZXIgTUlUIChodHRwczovL2dpdGh1Yi5jb20vdHdicy9ib290c3RyYXAvYmxvYi9tYXN0ZXIvTElDRU5TRSlcbiAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXG5cbitmdW5jdGlvbiAoJCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgLy8gQ0FST1VTRUwgQ0xBU1MgREVGSU5JVElPTlxuICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09XG5cbiAgdmFyIENhcm91c2VsID0gZnVuY3Rpb24gKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICB0aGlzLiRlbGVtZW50ICAgID0gJChlbGVtZW50KVxuICAgIHRoaXMuJGluZGljYXRvcnMgPSB0aGlzLiRlbGVtZW50LmZpbmQoJy5jYXJvdXNlbC1pbmRpY2F0b3JzJylcbiAgICB0aGlzLm9wdGlvbnMgICAgID0gb3B0aW9uc1xuICAgIHRoaXMucGF1c2VkICAgICAgPSBudWxsXG4gICAgdGhpcy5zbGlkaW5nICAgICA9IG51bGxcbiAgICB0aGlzLmludGVydmFsICAgID0gbnVsbFxuICAgIHRoaXMuJGFjdGl2ZSAgICAgPSBudWxsXG4gICAgdGhpcy4kaXRlbXMgICAgICA9IG51bGxcblxuICAgIHRoaXMub3B0aW9ucy5rZXlib2FyZCAmJiB0aGlzLiRlbGVtZW50Lm9uKCdrZXlkb3duLmJzLmNhcm91c2VsJywgJC5wcm94eSh0aGlzLmtleWRvd24sIHRoaXMpKVxuXG4gICAgdGhpcy5vcHRpb25zLnBhdXNlID09ICdob3ZlcicgJiYgISgnb250b3VjaHN0YXJ0JyBpbiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQpICYmIHRoaXMuJGVsZW1lbnRcbiAgICAgIC5vbignbW91c2VlbnRlci5icy5jYXJvdXNlbCcsICQucHJveHkodGhpcy5wYXVzZSwgdGhpcykpXG4gICAgICAub24oJ21vdXNlbGVhdmUuYnMuY2Fyb3VzZWwnLCAkLnByb3h5KHRoaXMuY3ljbGUsIHRoaXMpKVxuICB9XG5cbiAgQ2Fyb3VzZWwuVkVSU0lPTiAgPSAnMy4zLjcnXG5cbiAgQ2Fyb3VzZWwuVFJBTlNJVElPTl9EVVJBVElPTiA9IDYwMFxuXG4gIENhcm91c2VsLkRFRkFVTFRTID0ge1xuICAgIGludGVydmFsOiA1MDAwLFxuICAgIHBhdXNlOiAnaG92ZXInLFxuICAgIHdyYXA6IHRydWUsXG4gICAga2V5Ym9hcmQ6IHRydWVcbiAgfVxuXG4gIENhcm91c2VsLnByb3RvdHlwZS5rZXlkb3duID0gZnVuY3Rpb24gKGUpIHtcbiAgICBpZiAoL2lucHV0fHRleHRhcmVhL2kudGVzdChlLnRhcmdldC50YWdOYW1lKSkgcmV0dXJuXG4gICAgc3dpdGNoIChlLndoaWNoKSB7XG4gICAgICBjYXNlIDM3OiB0aGlzLnByZXYoKTsgYnJlYWtcbiAgICAgIGNhc2UgMzk6IHRoaXMubmV4dCgpOyBicmVha1xuICAgICAgZGVmYXVsdDogcmV0dXJuXG4gICAgfVxuXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gIH1cblxuICBDYXJvdXNlbC5wcm90b3R5cGUuY3ljbGUgPSBmdW5jdGlvbiAoZSkge1xuICAgIGUgfHwgKHRoaXMucGF1c2VkID0gZmFsc2UpXG5cbiAgICB0aGlzLmludGVydmFsICYmIGNsZWFySW50ZXJ2YWwodGhpcy5pbnRlcnZhbClcblxuICAgIHRoaXMub3B0aW9ucy5pbnRlcnZhbFxuICAgICAgJiYgIXRoaXMucGF1c2VkXG4gICAgICAmJiAodGhpcy5pbnRlcnZhbCA9IHNldEludGVydmFsKCQucHJveHkodGhpcy5uZXh0LCB0aGlzKSwgdGhpcy5vcHRpb25zLmludGVydmFsKSlcblxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICBDYXJvdXNlbC5wcm90b3R5cGUuZ2V0SXRlbUluZGV4ID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICB0aGlzLiRpdGVtcyA9IGl0ZW0ucGFyZW50KCkuY2hpbGRyZW4oJy5pdGVtJylcbiAgICByZXR1cm4gdGhpcy4kaXRlbXMuaW5kZXgoaXRlbSB8fCB0aGlzLiRhY3RpdmUpXG4gIH1cblxuICBDYXJvdXNlbC5wcm90b3R5cGUuZ2V0SXRlbUZvckRpcmVjdGlvbiA9IGZ1bmN0aW9uIChkaXJlY3Rpb24sIGFjdGl2ZSkge1xuICAgIHZhciBhY3RpdmVJbmRleCA9IHRoaXMuZ2V0SXRlbUluZGV4KGFjdGl2ZSlcbiAgICB2YXIgd2lsbFdyYXAgPSAoZGlyZWN0aW9uID09ICdwcmV2JyAmJiBhY3RpdmVJbmRleCA9PT0gMClcbiAgICAgICAgICAgICAgICB8fCAoZGlyZWN0aW9uID09ICduZXh0JyAmJiBhY3RpdmVJbmRleCA9PSAodGhpcy4kaXRlbXMubGVuZ3RoIC0gMSkpXG4gICAgaWYgKHdpbGxXcmFwICYmICF0aGlzLm9wdGlvbnMud3JhcCkgcmV0dXJuIGFjdGl2ZVxuICAgIHZhciBkZWx0YSA9IGRpcmVjdGlvbiA9PSAncHJldicgPyAtMSA6IDFcbiAgICB2YXIgaXRlbUluZGV4ID0gKGFjdGl2ZUluZGV4ICsgZGVsdGEpICUgdGhpcy4kaXRlbXMubGVuZ3RoXG4gICAgcmV0dXJuIHRoaXMuJGl0ZW1zLmVxKGl0ZW1JbmRleClcbiAgfVxuXG4gIENhcm91c2VsLnByb3RvdHlwZS50byA9IGZ1bmN0aW9uIChwb3MpIHtcbiAgICB2YXIgdGhhdCAgICAgICAgPSB0aGlzXG4gICAgdmFyIGFjdGl2ZUluZGV4ID0gdGhpcy5nZXRJdGVtSW5kZXgodGhpcy4kYWN0aXZlID0gdGhpcy4kZWxlbWVudC5maW5kKCcuaXRlbS5hY3RpdmUnKSlcblxuICAgIGlmIChwb3MgPiAodGhpcy4kaXRlbXMubGVuZ3RoIC0gMSkgfHwgcG9zIDwgMCkgcmV0dXJuXG5cbiAgICBpZiAodGhpcy5zbGlkaW5nKSAgICAgICByZXR1cm4gdGhpcy4kZWxlbWVudC5vbmUoJ3NsaWQuYnMuY2Fyb3VzZWwnLCBmdW5jdGlvbiAoKSB7IHRoYXQudG8ocG9zKSB9KSAvLyB5ZXMsIFwic2xpZFwiXG4gICAgaWYgKGFjdGl2ZUluZGV4ID09IHBvcykgcmV0dXJuIHRoaXMucGF1c2UoKS5jeWNsZSgpXG5cbiAgICByZXR1cm4gdGhpcy5zbGlkZShwb3MgPiBhY3RpdmVJbmRleCA/ICduZXh0JyA6ICdwcmV2JywgdGhpcy4kaXRlbXMuZXEocG9zKSlcbiAgfVxuXG4gIENhcm91c2VsLnByb3RvdHlwZS5wYXVzZSA9IGZ1bmN0aW9uIChlKSB7XG4gICAgZSB8fCAodGhpcy5wYXVzZWQgPSB0cnVlKVxuXG4gICAgaWYgKHRoaXMuJGVsZW1lbnQuZmluZCgnLm5leHQsIC5wcmV2JykubGVuZ3RoICYmICQuc3VwcG9ydC50cmFuc2l0aW9uKSB7XG4gICAgICB0aGlzLiRlbGVtZW50LnRyaWdnZXIoJC5zdXBwb3J0LnRyYW5zaXRpb24uZW5kKVxuICAgICAgdGhpcy5jeWNsZSh0cnVlKVxuICAgIH1cblxuICAgIHRoaXMuaW50ZXJ2YWwgPSBjbGVhckludGVydmFsKHRoaXMuaW50ZXJ2YWwpXG5cbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgQ2Fyb3VzZWwucHJvdG90eXBlLm5leHQgPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHRoaXMuc2xpZGluZykgcmV0dXJuXG4gICAgcmV0dXJuIHRoaXMuc2xpZGUoJ25leHQnKVxuICB9XG5cbiAgQ2Fyb3VzZWwucHJvdG90eXBlLnByZXYgPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHRoaXMuc2xpZGluZykgcmV0dXJuXG4gICAgcmV0dXJuIHRoaXMuc2xpZGUoJ3ByZXYnKVxuICB9XG5cbiAgQ2Fyb3VzZWwucHJvdG90eXBlLnNsaWRlID0gZnVuY3Rpb24gKHR5cGUsIG5leHQpIHtcbiAgICB2YXIgJGFjdGl2ZSAgID0gdGhpcy4kZWxlbWVudC5maW5kKCcuaXRlbS5hY3RpdmUnKVxuICAgIHZhciAkbmV4dCAgICAgPSBuZXh0IHx8IHRoaXMuZ2V0SXRlbUZvckRpcmVjdGlvbih0eXBlLCAkYWN0aXZlKVxuICAgIHZhciBpc0N5Y2xpbmcgPSB0aGlzLmludGVydmFsXG4gICAgdmFyIGRpcmVjdGlvbiA9IHR5cGUgPT0gJ25leHQnID8gJ2xlZnQnIDogJ3JpZ2h0J1xuICAgIHZhciB0aGF0ICAgICAgPSB0aGlzXG5cbiAgICBpZiAoJG5leHQuaGFzQ2xhc3MoJ2FjdGl2ZScpKSByZXR1cm4gKHRoaXMuc2xpZGluZyA9IGZhbHNlKVxuXG4gICAgdmFyIHJlbGF0ZWRUYXJnZXQgPSAkbmV4dFswXVxuICAgIHZhciBzbGlkZUV2ZW50ID0gJC5FdmVudCgnc2xpZGUuYnMuY2Fyb3VzZWwnLCB7XG4gICAgICByZWxhdGVkVGFyZ2V0OiByZWxhdGVkVGFyZ2V0LFxuICAgICAgZGlyZWN0aW9uOiBkaXJlY3Rpb25cbiAgICB9KVxuICAgIHRoaXMuJGVsZW1lbnQudHJpZ2dlcihzbGlkZUV2ZW50KVxuICAgIGlmIChzbGlkZUV2ZW50LmlzRGVmYXVsdFByZXZlbnRlZCgpKSByZXR1cm5cblxuICAgIHRoaXMuc2xpZGluZyA9IHRydWVcblxuICAgIGlzQ3ljbGluZyAmJiB0aGlzLnBhdXNlKClcblxuICAgIGlmICh0aGlzLiRpbmRpY2F0b3JzLmxlbmd0aCkge1xuICAgICAgdGhpcy4kaW5kaWNhdG9ycy5maW5kKCcuYWN0aXZlJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpXG4gICAgICB2YXIgJG5leHRJbmRpY2F0b3IgPSAkKHRoaXMuJGluZGljYXRvcnMuY2hpbGRyZW4oKVt0aGlzLmdldEl0ZW1JbmRleCgkbmV4dCldKVxuICAgICAgJG5leHRJbmRpY2F0b3IgJiYgJG5leHRJbmRpY2F0b3IuYWRkQ2xhc3MoJ2FjdGl2ZScpXG4gICAgfVxuXG4gICAgdmFyIHNsaWRFdmVudCA9ICQuRXZlbnQoJ3NsaWQuYnMuY2Fyb3VzZWwnLCB7IHJlbGF0ZWRUYXJnZXQ6IHJlbGF0ZWRUYXJnZXQsIGRpcmVjdGlvbjogZGlyZWN0aW9uIH0pIC8vIHllcywgXCJzbGlkXCJcbiAgICBpZiAoJC5zdXBwb3J0LnRyYW5zaXRpb24gJiYgdGhpcy4kZWxlbWVudC5oYXNDbGFzcygnc2xpZGUnKSkge1xuICAgICAgJG5leHQuYWRkQ2xhc3ModHlwZSlcbiAgICAgICRuZXh0WzBdLm9mZnNldFdpZHRoIC8vIGZvcmNlIHJlZmxvd1xuICAgICAgJGFjdGl2ZS5hZGRDbGFzcyhkaXJlY3Rpb24pXG4gICAgICAkbmV4dC5hZGRDbGFzcyhkaXJlY3Rpb24pXG4gICAgICAkYWN0aXZlXG4gICAgICAgIC5vbmUoJ2JzVHJhbnNpdGlvbkVuZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAkbmV4dC5yZW1vdmVDbGFzcyhbdHlwZSwgZGlyZWN0aW9uXS5qb2luKCcgJykpLmFkZENsYXNzKCdhY3RpdmUnKVxuICAgICAgICAgICRhY3RpdmUucmVtb3ZlQ2xhc3MoWydhY3RpdmUnLCBkaXJlY3Rpb25dLmpvaW4oJyAnKSlcbiAgICAgICAgICB0aGF0LnNsaWRpbmcgPSBmYWxzZVxuICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhhdC4kZWxlbWVudC50cmlnZ2VyKHNsaWRFdmVudClcbiAgICAgICAgICB9LCAwKVxuICAgICAgICB9KVxuICAgICAgICAuZW11bGF0ZVRyYW5zaXRpb25FbmQoQ2Fyb3VzZWwuVFJBTlNJVElPTl9EVVJBVElPTilcbiAgICB9IGVsc2Uge1xuICAgICAgJGFjdGl2ZS5yZW1vdmVDbGFzcygnYWN0aXZlJylcbiAgICAgICRuZXh0LmFkZENsYXNzKCdhY3RpdmUnKVxuICAgICAgdGhpcy5zbGlkaW5nID0gZmFsc2VcbiAgICAgIHRoaXMuJGVsZW1lbnQudHJpZ2dlcihzbGlkRXZlbnQpXG4gICAgfVxuXG4gICAgaXNDeWNsaW5nICYmIHRoaXMuY3ljbGUoKVxuXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG5cbiAgLy8gQ0FST1VTRUwgUExVR0lOIERFRklOSVRJT05cbiAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuICBmdW5jdGlvbiBQbHVnaW4ob3B0aW9uKSB7XG4gICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgJHRoaXMgICA9ICQodGhpcylcbiAgICAgIHZhciBkYXRhICAgID0gJHRoaXMuZGF0YSgnYnMuY2Fyb3VzZWwnKVxuICAgICAgdmFyIG9wdGlvbnMgPSAkLmV4dGVuZCh7fSwgQ2Fyb3VzZWwuREVGQVVMVFMsICR0aGlzLmRhdGEoKSwgdHlwZW9mIG9wdGlvbiA9PSAnb2JqZWN0JyAmJiBvcHRpb24pXG4gICAgICB2YXIgYWN0aW9uICA9IHR5cGVvZiBvcHRpb24gPT0gJ3N0cmluZycgPyBvcHRpb24gOiBvcHRpb25zLnNsaWRlXG5cbiAgICAgIGlmICghZGF0YSkgJHRoaXMuZGF0YSgnYnMuY2Fyb3VzZWwnLCAoZGF0YSA9IG5ldyBDYXJvdXNlbCh0aGlzLCBvcHRpb25zKSkpXG4gICAgICBpZiAodHlwZW9mIG9wdGlvbiA9PSAnbnVtYmVyJykgZGF0YS50byhvcHRpb24pXG4gICAgICBlbHNlIGlmIChhY3Rpb24pIGRhdGFbYWN0aW9uXSgpXG4gICAgICBlbHNlIGlmIChvcHRpb25zLmludGVydmFsKSBkYXRhLnBhdXNlKCkuY3ljbGUoKVxuICAgIH0pXG4gIH1cblxuICB2YXIgb2xkID0gJC5mbi5jYXJvdXNlbFxuXG4gICQuZm4uY2Fyb3VzZWwgICAgICAgICAgICAgPSBQbHVnaW5cbiAgJC5mbi5jYXJvdXNlbC5Db25zdHJ1Y3RvciA9IENhcm91c2VsXG5cblxuICAvLyBDQVJPVVNFTCBOTyBDT05GTElDVFxuICAvLyA9PT09PT09PT09PT09PT09PT09PVxuXG4gICQuZm4uY2Fyb3VzZWwubm9Db25mbGljdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAkLmZuLmNhcm91c2VsID0gb2xkXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG5cbiAgLy8gQ0FST1VTRUwgREFUQS1BUElcbiAgLy8gPT09PT09PT09PT09PT09PT1cblxuICB2YXIgY2xpY2tIYW5kbGVyID0gZnVuY3Rpb24gKGUpIHtcbiAgICB2YXIgaHJlZlxuICAgIHZhciAkdGhpcyAgID0gJCh0aGlzKVxuICAgIHZhciAkdGFyZ2V0ID0gJCgkdGhpcy5hdHRyKCdkYXRhLXRhcmdldCcpIHx8IChocmVmID0gJHRoaXMuYXR0cignaHJlZicpKSAmJiBocmVmLnJlcGxhY2UoLy4qKD89I1teXFxzXSskKS8sICcnKSkgLy8gc3RyaXAgZm9yIGllN1xuICAgIGlmICghJHRhcmdldC5oYXNDbGFzcygnY2Fyb3VzZWwnKSkgcmV0dXJuXG4gICAgdmFyIG9wdGlvbnMgPSAkLmV4dGVuZCh7fSwgJHRhcmdldC5kYXRhKCksICR0aGlzLmRhdGEoKSlcbiAgICB2YXIgc2xpZGVJbmRleCA9ICR0aGlzLmF0dHIoJ2RhdGEtc2xpZGUtdG8nKVxuICAgIGlmIChzbGlkZUluZGV4KSBvcHRpb25zLmludGVydmFsID0gZmFsc2VcblxuICAgIFBsdWdpbi5jYWxsKCR0YXJnZXQsIG9wdGlvbnMpXG5cbiAgICBpZiAoc2xpZGVJbmRleCkge1xuICAgICAgJHRhcmdldC5kYXRhKCdicy5jYXJvdXNlbCcpLnRvKHNsaWRlSW5kZXgpXG4gICAgfVxuXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gIH1cblxuICAkKGRvY3VtZW50KVxuICAgIC5vbignY2xpY2suYnMuY2Fyb3VzZWwuZGF0YS1hcGknLCAnW2RhdGEtc2xpZGVdJywgY2xpY2tIYW5kbGVyKVxuICAgIC5vbignY2xpY2suYnMuY2Fyb3VzZWwuZGF0YS1hcGknLCAnW2RhdGEtc2xpZGUtdG9dJywgY2xpY2tIYW5kbGVyKVxuXG4gICQod2luZG93KS5vbignbG9hZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAkKCdbZGF0YS1yaWRlPVwiY2Fyb3VzZWxcIl0nKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciAkY2Fyb3VzZWwgPSAkKHRoaXMpXG4gICAgICBQbHVnaW4uY2FsbCgkY2Fyb3VzZWwsICRjYXJvdXNlbC5kYXRhKCkpXG4gICAgfSlcbiAgfSlcblxufShqUXVlcnkpO1xuXG4vKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqIEJvb3RzdHJhcDogY29sbGFwc2UuanMgdjMuMy43XG4gKiBodHRwOi8vZ2V0Ym9vdHN0cmFwLmNvbS9qYXZhc2NyaXB0LyNjb2xsYXBzZVxuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKiBDb3B5cmlnaHQgMjAxMS0yMDE2IFR3aXR0ZXIsIEluYy5cbiAqIExpY2Vuc2VkIHVuZGVyIE1JVCAoaHR0cHM6Ly9naXRodWIuY29tL3R3YnMvYm9vdHN0cmFwL2Jsb2IvbWFzdGVyL0xJQ0VOU0UpXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuLyoganNoaW50IGxhdGVkZWY6IGZhbHNlICovXG5cbitmdW5jdGlvbiAoJCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgLy8gQ09MTEFQU0UgUFVCTElDIENMQVNTIERFRklOSVRJT05cbiAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuICB2YXIgQ29sbGFwc2UgPSBmdW5jdGlvbiAoZWxlbWVudCwgb3B0aW9ucykge1xuICAgIHRoaXMuJGVsZW1lbnQgICAgICA9ICQoZWxlbWVudClcbiAgICB0aGlzLm9wdGlvbnMgICAgICAgPSAkLmV4dGVuZCh7fSwgQ29sbGFwc2UuREVGQVVMVFMsIG9wdGlvbnMpXG4gICAgdGhpcy4kdHJpZ2dlciAgICAgID0gJCgnW2RhdGEtdG9nZ2xlPVwiY29sbGFwc2VcIl1baHJlZj1cIiMnICsgZWxlbWVudC5pZCArICdcIl0sJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAnW2RhdGEtdG9nZ2xlPVwiY29sbGFwc2VcIl1bZGF0YS10YXJnZXQ9XCIjJyArIGVsZW1lbnQuaWQgKyAnXCJdJylcbiAgICB0aGlzLnRyYW5zaXRpb25pbmcgPSBudWxsXG5cbiAgICBpZiAodGhpcy5vcHRpb25zLnBhcmVudCkge1xuICAgICAgdGhpcy4kcGFyZW50ID0gdGhpcy5nZXRQYXJlbnQoKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmFkZEFyaWFBbmRDb2xsYXBzZWRDbGFzcyh0aGlzLiRlbGVtZW50LCB0aGlzLiR0cmlnZ2VyKVxuICAgIH1cblxuICAgIGlmICh0aGlzLm9wdGlvbnMudG9nZ2xlKSB0aGlzLnRvZ2dsZSgpXG4gIH1cblxuICBDb2xsYXBzZS5WRVJTSU9OICA9ICczLjMuNydcblxuICBDb2xsYXBzZS5UUkFOU0lUSU9OX0RVUkFUSU9OID0gMzUwXG5cbiAgQ29sbGFwc2UuREVGQVVMVFMgPSB7XG4gICAgdG9nZ2xlOiB0cnVlXG4gIH1cblxuICBDb2xsYXBzZS5wcm90b3R5cGUuZGltZW5zaW9uID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBoYXNXaWR0aCA9IHRoaXMuJGVsZW1lbnQuaGFzQ2xhc3MoJ3dpZHRoJylcbiAgICByZXR1cm4gaGFzV2lkdGggPyAnd2lkdGgnIDogJ2hlaWdodCdcbiAgfVxuXG4gIENvbGxhcHNlLnByb3RvdHlwZS5zaG93ID0gZnVuY3Rpb24gKCkge1xuICAgIGlmICh0aGlzLnRyYW5zaXRpb25pbmcgfHwgdGhpcy4kZWxlbWVudC5oYXNDbGFzcygnaW4nKSkgcmV0dXJuXG5cbiAgICB2YXIgYWN0aXZlc0RhdGFcbiAgICB2YXIgYWN0aXZlcyA9IHRoaXMuJHBhcmVudCAmJiB0aGlzLiRwYXJlbnQuY2hpbGRyZW4oJy5wYW5lbCcpLmNoaWxkcmVuKCcuaW4sIC5jb2xsYXBzaW5nJylcblxuICAgIGlmIChhY3RpdmVzICYmIGFjdGl2ZXMubGVuZ3RoKSB7XG4gICAgICBhY3RpdmVzRGF0YSA9IGFjdGl2ZXMuZGF0YSgnYnMuY29sbGFwc2UnKVxuICAgICAgaWYgKGFjdGl2ZXNEYXRhICYmIGFjdGl2ZXNEYXRhLnRyYW5zaXRpb25pbmcpIHJldHVyblxuICAgIH1cblxuICAgIHZhciBzdGFydEV2ZW50ID0gJC5FdmVudCgnc2hvdy5icy5jb2xsYXBzZScpXG4gICAgdGhpcy4kZWxlbWVudC50cmlnZ2VyKHN0YXJ0RXZlbnQpXG4gICAgaWYgKHN0YXJ0RXZlbnQuaXNEZWZhdWx0UHJldmVudGVkKCkpIHJldHVyblxuXG4gICAgaWYgKGFjdGl2ZXMgJiYgYWN0aXZlcy5sZW5ndGgpIHtcbiAgICAgIFBsdWdpbi5jYWxsKGFjdGl2ZXMsICdoaWRlJylcbiAgICAgIGFjdGl2ZXNEYXRhIHx8IGFjdGl2ZXMuZGF0YSgnYnMuY29sbGFwc2UnLCBudWxsKVxuICAgIH1cblxuICAgIHZhciBkaW1lbnNpb24gPSB0aGlzLmRpbWVuc2lvbigpXG5cbiAgICB0aGlzLiRlbGVtZW50XG4gICAgICAucmVtb3ZlQ2xhc3MoJ2NvbGxhcHNlJylcbiAgICAgIC5hZGRDbGFzcygnY29sbGFwc2luZycpW2RpbWVuc2lvbl0oMClcbiAgICAgIC5hdHRyKCdhcmlhLWV4cGFuZGVkJywgdHJ1ZSlcblxuICAgIHRoaXMuJHRyaWdnZXJcbiAgICAgIC5yZW1vdmVDbGFzcygnY29sbGFwc2VkJylcbiAgICAgIC5hdHRyKCdhcmlhLWV4cGFuZGVkJywgdHJ1ZSlcblxuICAgIHRoaXMudHJhbnNpdGlvbmluZyA9IDFcblxuICAgIHZhciBjb21wbGV0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXMuJGVsZW1lbnRcbiAgICAgICAgLnJlbW92ZUNsYXNzKCdjb2xsYXBzaW5nJylcbiAgICAgICAgLmFkZENsYXNzKCdjb2xsYXBzZSBpbicpW2RpbWVuc2lvbl0oJycpXG4gICAgICB0aGlzLnRyYW5zaXRpb25pbmcgPSAwXG4gICAgICB0aGlzLiRlbGVtZW50XG4gICAgICAgIC50cmlnZ2VyKCdzaG93bi5icy5jb2xsYXBzZScpXG4gICAgfVxuXG4gICAgaWYgKCEkLnN1cHBvcnQudHJhbnNpdGlvbikgcmV0dXJuIGNvbXBsZXRlLmNhbGwodGhpcylcblxuICAgIHZhciBzY3JvbGxTaXplID0gJC5jYW1lbENhc2UoWydzY3JvbGwnLCBkaW1lbnNpb25dLmpvaW4oJy0nKSlcblxuICAgIHRoaXMuJGVsZW1lbnRcbiAgICAgIC5vbmUoJ2JzVHJhbnNpdGlvbkVuZCcsICQucHJveHkoY29tcGxldGUsIHRoaXMpKVxuICAgICAgLmVtdWxhdGVUcmFuc2l0aW9uRW5kKENvbGxhcHNlLlRSQU5TSVRJT05fRFVSQVRJT04pW2RpbWVuc2lvbl0odGhpcy4kZWxlbWVudFswXVtzY3JvbGxTaXplXSlcbiAgfVxuXG4gIENvbGxhcHNlLnByb3RvdHlwZS5oaWRlID0gZnVuY3Rpb24gKCkge1xuICAgIGlmICh0aGlzLnRyYW5zaXRpb25pbmcgfHwgIXRoaXMuJGVsZW1lbnQuaGFzQ2xhc3MoJ2luJykpIHJldHVyblxuXG4gICAgdmFyIHN0YXJ0RXZlbnQgPSAkLkV2ZW50KCdoaWRlLmJzLmNvbGxhcHNlJylcbiAgICB0aGlzLiRlbGVtZW50LnRyaWdnZXIoc3RhcnRFdmVudClcbiAgICBpZiAoc3RhcnRFdmVudC5pc0RlZmF1bHRQcmV2ZW50ZWQoKSkgcmV0dXJuXG5cbiAgICB2YXIgZGltZW5zaW9uID0gdGhpcy5kaW1lbnNpb24oKVxuXG4gICAgdGhpcy4kZWxlbWVudFtkaW1lbnNpb25dKHRoaXMuJGVsZW1lbnRbZGltZW5zaW9uXSgpKVswXS5vZmZzZXRIZWlnaHRcblxuICAgIHRoaXMuJGVsZW1lbnRcbiAgICAgIC5hZGRDbGFzcygnY29sbGFwc2luZycpXG4gICAgICAucmVtb3ZlQ2xhc3MoJ2NvbGxhcHNlIGluJylcbiAgICAgIC5hdHRyKCdhcmlhLWV4cGFuZGVkJywgZmFsc2UpXG5cbiAgICB0aGlzLiR0cmlnZ2VyXG4gICAgICAuYWRkQ2xhc3MoJ2NvbGxhcHNlZCcpXG4gICAgICAuYXR0cignYXJpYS1leHBhbmRlZCcsIGZhbHNlKVxuXG4gICAgdGhpcy50cmFuc2l0aW9uaW5nID0gMVxuXG4gICAgdmFyIGNvbXBsZXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgdGhpcy50cmFuc2l0aW9uaW5nID0gMFxuICAgICAgdGhpcy4kZWxlbWVudFxuICAgICAgICAucmVtb3ZlQ2xhc3MoJ2NvbGxhcHNpbmcnKVxuICAgICAgICAuYWRkQ2xhc3MoJ2NvbGxhcHNlJylcbiAgICAgICAgLnRyaWdnZXIoJ2hpZGRlbi5icy5jb2xsYXBzZScpXG4gICAgfVxuXG4gICAgaWYgKCEkLnN1cHBvcnQudHJhbnNpdGlvbikgcmV0dXJuIGNvbXBsZXRlLmNhbGwodGhpcylcblxuICAgIHRoaXMuJGVsZW1lbnRcbiAgICAgIFtkaW1lbnNpb25dKDApXG4gICAgICAub25lKCdic1RyYW5zaXRpb25FbmQnLCAkLnByb3h5KGNvbXBsZXRlLCB0aGlzKSlcbiAgICAgIC5lbXVsYXRlVHJhbnNpdGlvbkVuZChDb2xsYXBzZS5UUkFOU0lUSU9OX0RVUkFUSU9OKVxuICB9XG5cbiAgQ29sbGFwc2UucHJvdG90eXBlLnRvZ2dsZSA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzW3RoaXMuJGVsZW1lbnQuaGFzQ2xhc3MoJ2luJykgPyAnaGlkZScgOiAnc2hvdyddKClcbiAgfVxuXG4gIENvbGxhcHNlLnByb3RvdHlwZS5nZXRQYXJlbnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuICQodGhpcy5vcHRpb25zLnBhcmVudClcbiAgICAgIC5maW5kKCdbZGF0YS10b2dnbGU9XCJjb2xsYXBzZVwiXVtkYXRhLXBhcmVudD1cIicgKyB0aGlzLm9wdGlvbnMucGFyZW50ICsgJ1wiXScpXG4gICAgICAuZWFjaCgkLnByb3h5KGZ1bmN0aW9uIChpLCBlbGVtZW50KSB7XG4gICAgICAgIHZhciAkZWxlbWVudCA9ICQoZWxlbWVudClcbiAgICAgICAgdGhpcy5hZGRBcmlhQW5kQ29sbGFwc2VkQ2xhc3MoZ2V0VGFyZ2V0RnJvbVRyaWdnZXIoJGVsZW1lbnQpLCAkZWxlbWVudClcbiAgICAgIH0sIHRoaXMpKVxuICAgICAgLmVuZCgpXG4gIH1cblxuICBDb2xsYXBzZS5wcm90b3R5cGUuYWRkQXJpYUFuZENvbGxhcHNlZENsYXNzID0gZnVuY3Rpb24gKCRlbGVtZW50LCAkdHJpZ2dlcikge1xuICAgIHZhciBpc09wZW4gPSAkZWxlbWVudC5oYXNDbGFzcygnaW4nKVxuXG4gICAgJGVsZW1lbnQuYXR0cignYXJpYS1leHBhbmRlZCcsIGlzT3BlbilcbiAgICAkdHJpZ2dlclxuICAgICAgLnRvZ2dsZUNsYXNzKCdjb2xsYXBzZWQnLCAhaXNPcGVuKVxuICAgICAgLmF0dHIoJ2FyaWEtZXhwYW5kZWQnLCBpc09wZW4pXG4gIH1cblxuICBmdW5jdGlvbiBnZXRUYXJnZXRGcm9tVHJpZ2dlcigkdHJpZ2dlcikge1xuICAgIHZhciBocmVmXG4gICAgdmFyIHRhcmdldCA9ICR0cmlnZ2VyLmF0dHIoJ2RhdGEtdGFyZ2V0JylcbiAgICAgIHx8IChocmVmID0gJHRyaWdnZXIuYXR0cignaHJlZicpKSAmJiBocmVmLnJlcGxhY2UoLy4qKD89I1teXFxzXSskKS8sICcnKSAvLyBzdHJpcCBmb3IgaWU3XG5cbiAgICByZXR1cm4gJCh0YXJnZXQpXG4gIH1cblxuXG4gIC8vIENPTExBUFNFIFBMVUdJTiBERUZJTklUSU9OXG4gIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbiAgZnVuY3Rpb24gUGx1Z2luKG9wdGlvbikge1xuICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgdmFyICR0aGlzICAgPSAkKHRoaXMpXG4gICAgICB2YXIgZGF0YSAgICA9ICR0aGlzLmRhdGEoJ2JzLmNvbGxhcHNlJylcbiAgICAgIHZhciBvcHRpb25zID0gJC5leHRlbmQoe30sIENvbGxhcHNlLkRFRkFVTFRTLCAkdGhpcy5kYXRhKCksIHR5cGVvZiBvcHRpb24gPT0gJ29iamVjdCcgJiYgb3B0aW9uKVxuXG4gICAgICBpZiAoIWRhdGEgJiYgb3B0aW9ucy50b2dnbGUgJiYgL3Nob3d8aGlkZS8udGVzdChvcHRpb24pKSBvcHRpb25zLnRvZ2dsZSA9IGZhbHNlXG4gICAgICBpZiAoIWRhdGEpICR0aGlzLmRhdGEoJ2JzLmNvbGxhcHNlJywgKGRhdGEgPSBuZXcgQ29sbGFwc2UodGhpcywgb3B0aW9ucykpKVxuICAgICAgaWYgKHR5cGVvZiBvcHRpb24gPT0gJ3N0cmluZycpIGRhdGFbb3B0aW9uXSgpXG4gICAgfSlcbiAgfVxuXG4gIHZhciBvbGQgPSAkLmZuLmNvbGxhcHNlXG5cbiAgJC5mbi5jb2xsYXBzZSAgICAgICAgICAgICA9IFBsdWdpblxuICAkLmZuLmNvbGxhcHNlLkNvbnN0cnVjdG9yID0gQ29sbGFwc2VcblxuXG4gIC8vIENPTExBUFNFIE5PIENPTkZMSUNUXG4gIC8vID09PT09PT09PT09PT09PT09PT09XG5cbiAgJC5mbi5jb2xsYXBzZS5ub0NvbmZsaWN0ID0gZnVuY3Rpb24gKCkge1xuICAgICQuZm4uY29sbGFwc2UgPSBvbGRcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cblxuICAvLyBDT0xMQVBTRSBEQVRBLUFQSVxuICAvLyA9PT09PT09PT09PT09PT09PVxuXG4gICQoZG9jdW1lbnQpLm9uKCdjbGljay5icy5jb2xsYXBzZS5kYXRhLWFwaScsICdbZGF0YS10b2dnbGU9XCJjb2xsYXBzZVwiXScsIGZ1bmN0aW9uIChlKSB7XG4gICAgdmFyICR0aGlzICAgPSAkKHRoaXMpXG5cbiAgICBpZiAoISR0aGlzLmF0dHIoJ2RhdGEtdGFyZ2V0JykpIGUucHJldmVudERlZmF1bHQoKVxuXG4gICAgdmFyICR0YXJnZXQgPSBnZXRUYXJnZXRGcm9tVHJpZ2dlcigkdGhpcylcbiAgICB2YXIgZGF0YSAgICA9ICR0YXJnZXQuZGF0YSgnYnMuY29sbGFwc2UnKVxuICAgIHZhciBvcHRpb24gID0gZGF0YSA/ICd0b2dnbGUnIDogJHRoaXMuZGF0YSgpXG5cbiAgICBQbHVnaW4uY2FsbCgkdGFyZ2V0LCBvcHRpb24pXG4gIH0pXG5cbn0oalF1ZXJ5KTtcblxuLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKiBCb290c3RyYXA6IGRyb3Bkb3duLmpzIHYzLjMuN1xuICogaHR0cDovL2dldGJvb3RzdHJhcC5jb20vamF2YXNjcmlwdC8jZHJvcGRvd25zXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqIENvcHlyaWdodCAyMDExLTIwMTYgVHdpdHRlciwgSW5jLlxuICogTGljZW5zZWQgdW5kZXIgTUlUIChodHRwczovL2dpdGh1Yi5jb20vdHdicy9ib290c3RyYXAvYmxvYi9tYXN0ZXIvTElDRU5TRSlcbiAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXG5cbitmdW5jdGlvbiAoJCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgLy8gRFJPUERPV04gQ0xBU1MgREVGSU5JVElPTlxuICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09XG5cbiAgdmFyIGJhY2tkcm9wID0gJy5kcm9wZG93bi1iYWNrZHJvcCdcbiAgdmFyIHRvZ2dsZSAgID0gJ1tkYXRhLXRvZ2dsZT1cImRyb3Bkb3duXCJdJ1xuICB2YXIgRHJvcGRvd24gPSBmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgICQoZWxlbWVudCkub24oJ2NsaWNrLmJzLmRyb3Bkb3duJywgdGhpcy50b2dnbGUpXG4gIH1cblxuICBEcm9wZG93bi5WRVJTSU9OID0gJzMuMy43J1xuXG4gIGZ1bmN0aW9uIGdldFBhcmVudCgkdGhpcykge1xuICAgIHZhciBzZWxlY3RvciA9ICR0aGlzLmF0dHIoJ2RhdGEtdGFyZ2V0JylcblxuICAgIGlmICghc2VsZWN0b3IpIHtcbiAgICAgIHNlbGVjdG9yID0gJHRoaXMuYXR0cignaHJlZicpXG4gICAgICBzZWxlY3RvciA9IHNlbGVjdG9yICYmIC8jW0EtWmEtel0vLnRlc3Qoc2VsZWN0b3IpICYmIHNlbGVjdG9yLnJlcGxhY2UoLy4qKD89I1teXFxzXSokKS8sICcnKSAvLyBzdHJpcCBmb3IgaWU3XG4gICAgfVxuXG4gICAgdmFyICRwYXJlbnQgPSBzZWxlY3RvciAmJiAkKHNlbGVjdG9yKVxuXG4gICAgcmV0dXJuICRwYXJlbnQgJiYgJHBhcmVudC5sZW5ndGggPyAkcGFyZW50IDogJHRoaXMucGFyZW50KClcbiAgfVxuXG4gIGZ1bmN0aW9uIGNsZWFyTWVudXMoZSkge1xuICAgIGlmIChlICYmIGUud2hpY2ggPT09IDMpIHJldHVyblxuICAgICQoYmFja2Ryb3ApLnJlbW92ZSgpXG4gICAgJCh0b2dnbGUpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgdmFyICR0aGlzICAgICAgICAgPSAkKHRoaXMpXG4gICAgICB2YXIgJHBhcmVudCAgICAgICA9IGdldFBhcmVudCgkdGhpcylcbiAgICAgIHZhciByZWxhdGVkVGFyZ2V0ID0geyByZWxhdGVkVGFyZ2V0OiB0aGlzIH1cblxuICAgICAgaWYgKCEkcGFyZW50Lmhhc0NsYXNzKCdvcGVuJykpIHJldHVyblxuXG4gICAgICBpZiAoZSAmJiBlLnR5cGUgPT0gJ2NsaWNrJyAmJiAvaW5wdXR8dGV4dGFyZWEvaS50ZXN0KGUudGFyZ2V0LnRhZ05hbWUpICYmICQuY29udGFpbnMoJHBhcmVudFswXSwgZS50YXJnZXQpKSByZXR1cm5cblxuICAgICAgJHBhcmVudC50cmlnZ2VyKGUgPSAkLkV2ZW50KCdoaWRlLmJzLmRyb3Bkb3duJywgcmVsYXRlZFRhcmdldCkpXG5cbiAgICAgIGlmIChlLmlzRGVmYXVsdFByZXZlbnRlZCgpKSByZXR1cm5cblxuICAgICAgJHRoaXMuYXR0cignYXJpYS1leHBhbmRlZCcsICdmYWxzZScpXG4gICAgICAkcGFyZW50LnJlbW92ZUNsYXNzKCdvcGVuJykudHJpZ2dlcigkLkV2ZW50KCdoaWRkZW4uYnMuZHJvcGRvd24nLCByZWxhdGVkVGFyZ2V0KSlcbiAgICB9KVxuICB9XG5cbiAgRHJvcGRvd24ucHJvdG90eXBlLnRvZ2dsZSA9IGZ1bmN0aW9uIChlKSB7XG4gICAgdmFyICR0aGlzID0gJCh0aGlzKVxuXG4gICAgaWYgKCR0aGlzLmlzKCcuZGlzYWJsZWQsIDpkaXNhYmxlZCcpKSByZXR1cm5cblxuICAgIHZhciAkcGFyZW50ICA9IGdldFBhcmVudCgkdGhpcylcbiAgICB2YXIgaXNBY3RpdmUgPSAkcGFyZW50Lmhhc0NsYXNzKCdvcGVuJylcblxuICAgIGNsZWFyTWVudXMoKVxuXG4gICAgaWYgKCFpc0FjdGl2ZSkge1xuICAgICAgaWYgKCdvbnRvdWNoc3RhcnQnIGluIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCAmJiAhJHBhcmVudC5jbG9zZXN0KCcubmF2YmFyLW5hdicpLmxlbmd0aCkge1xuICAgICAgICAvLyBpZiBtb2JpbGUgd2UgdXNlIGEgYmFja2Ryb3AgYmVjYXVzZSBjbGljayBldmVudHMgZG9uJ3QgZGVsZWdhdGVcbiAgICAgICAgJChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSlcbiAgICAgICAgICAuYWRkQ2xhc3MoJ2Ryb3Bkb3duLWJhY2tkcm9wJylcbiAgICAgICAgICAuaW5zZXJ0QWZ0ZXIoJCh0aGlzKSlcbiAgICAgICAgICAub24oJ2NsaWNrJywgY2xlYXJNZW51cylcbiAgICAgIH1cblxuICAgICAgdmFyIHJlbGF0ZWRUYXJnZXQgPSB7IHJlbGF0ZWRUYXJnZXQ6IHRoaXMgfVxuICAgICAgJHBhcmVudC50cmlnZ2VyKGUgPSAkLkV2ZW50KCdzaG93LmJzLmRyb3Bkb3duJywgcmVsYXRlZFRhcmdldCkpXG5cbiAgICAgIGlmIChlLmlzRGVmYXVsdFByZXZlbnRlZCgpKSByZXR1cm5cblxuICAgICAgJHRoaXNcbiAgICAgICAgLnRyaWdnZXIoJ2ZvY3VzJylcbiAgICAgICAgLmF0dHIoJ2FyaWEtZXhwYW5kZWQnLCAndHJ1ZScpXG5cbiAgICAgICRwYXJlbnRcbiAgICAgICAgLnRvZ2dsZUNsYXNzKCdvcGVuJylcbiAgICAgICAgLnRyaWdnZXIoJC5FdmVudCgnc2hvd24uYnMuZHJvcGRvd24nLCByZWxhdGVkVGFyZ2V0KSlcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuXG4gIERyb3Bkb3duLnByb3RvdHlwZS5rZXlkb3duID0gZnVuY3Rpb24gKGUpIHtcbiAgICBpZiAoIS8oMzh8NDB8Mjd8MzIpLy50ZXN0KGUud2hpY2gpIHx8IC9pbnB1dHx0ZXh0YXJlYS9pLnRlc3QoZS50YXJnZXQudGFnTmFtZSkpIHJldHVyblxuXG4gICAgdmFyICR0aGlzID0gJCh0aGlzKVxuXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKVxuXG4gICAgaWYgKCR0aGlzLmlzKCcuZGlzYWJsZWQsIDpkaXNhYmxlZCcpKSByZXR1cm5cblxuICAgIHZhciAkcGFyZW50ICA9IGdldFBhcmVudCgkdGhpcylcbiAgICB2YXIgaXNBY3RpdmUgPSAkcGFyZW50Lmhhc0NsYXNzKCdvcGVuJylcblxuICAgIGlmICghaXNBY3RpdmUgJiYgZS53aGljaCAhPSAyNyB8fCBpc0FjdGl2ZSAmJiBlLndoaWNoID09IDI3KSB7XG4gICAgICBpZiAoZS53aGljaCA9PSAyNykgJHBhcmVudC5maW5kKHRvZ2dsZSkudHJpZ2dlcignZm9jdXMnKVxuICAgICAgcmV0dXJuICR0aGlzLnRyaWdnZXIoJ2NsaWNrJylcbiAgICB9XG5cbiAgICB2YXIgZGVzYyA9ICcgbGk6bm90KC5kaXNhYmxlZCk6dmlzaWJsZSBhJ1xuICAgIHZhciAkaXRlbXMgPSAkcGFyZW50LmZpbmQoJy5kcm9wZG93bi1tZW51JyArIGRlc2MpXG5cbiAgICBpZiAoISRpdGVtcy5sZW5ndGgpIHJldHVyblxuXG4gICAgdmFyIGluZGV4ID0gJGl0ZW1zLmluZGV4KGUudGFyZ2V0KVxuXG4gICAgaWYgKGUud2hpY2ggPT0gMzggJiYgaW5kZXggPiAwKSAgICAgICAgICAgICAgICAgaW5kZXgtLSAgICAgICAgIC8vIHVwXG4gICAgaWYgKGUud2hpY2ggPT0gNDAgJiYgaW5kZXggPCAkaXRlbXMubGVuZ3RoIC0gMSkgaW5kZXgrKyAgICAgICAgIC8vIGRvd25cbiAgICBpZiAoIX5pbmRleCkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmRleCA9IDBcblxuICAgICRpdGVtcy5lcShpbmRleCkudHJpZ2dlcignZm9jdXMnKVxuICB9XG5cblxuICAvLyBEUk9QRE9XTiBQTFVHSU4gREVGSU5JVElPTlxuICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4gIGZ1bmN0aW9uIFBsdWdpbihvcHRpb24pIHtcbiAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciAkdGhpcyA9ICQodGhpcylcbiAgICAgIHZhciBkYXRhICA9ICR0aGlzLmRhdGEoJ2JzLmRyb3Bkb3duJylcblxuICAgICAgaWYgKCFkYXRhKSAkdGhpcy5kYXRhKCdicy5kcm9wZG93bicsIChkYXRhID0gbmV3IERyb3Bkb3duKHRoaXMpKSlcbiAgICAgIGlmICh0eXBlb2Ygb3B0aW9uID09ICdzdHJpbmcnKSBkYXRhW29wdGlvbl0uY2FsbCgkdGhpcylcbiAgICB9KVxuICB9XG5cbiAgdmFyIG9sZCA9ICQuZm4uZHJvcGRvd25cblxuICAkLmZuLmRyb3Bkb3duICAgICAgICAgICAgID0gUGx1Z2luXG4gICQuZm4uZHJvcGRvd24uQ29uc3RydWN0b3IgPSBEcm9wZG93blxuXG5cbiAgLy8gRFJPUERPV04gTk8gQ09ORkxJQ1RcbiAgLy8gPT09PT09PT09PT09PT09PT09PT1cblxuICAkLmZuLmRyb3Bkb3duLm5vQ29uZmxpY3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgJC5mbi5kcm9wZG93biA9IG9sZFxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuXG4gIC8vIEFQUExZIFRPIFNUQU5EQVJEIERST1BET1dOIEVMRU1FTlRTXG4gIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbiAgJChkb2N1bWVudClcbiAgICAub24oJ2NsaWNrLmJzLmRyb3Bkb3duLmRhdGEtYXBpJywgY2xlYXJNZW51cylcbiAgICAub24oJ2NsaWNrLmJzLmRyb3Bkb3duLmRhdGEtYXBpJywgJy5kcm9wZG93biBmb3JtJywgZnVuY3Rpb24gKGUpIHsgZS5zdG9wUHJvcGFnYXRpb24oKSB9KVxuICAgIC5vbignY2xpY2suYnMuZHJvcGRvd24uZGF0YS1hcGknLCB0b2dnbGUsIERyb3Bkb3duLnByb3RvdHlwZS50b2dnbGUpXG4gICAgLm9uKCdrZXlkb3duLmJzLmRyb3Bkb3duLmRhdGEtYXBpJywgdG9nZ2xlLCBEcm9wZG93bi5wcm90b3R5cGUua2V5ZG93bilcbiAgICAub24oJ2tleWRvd24uYnMuZHJvcGRvd24uZGF0YS1hcGknLCAnLmRyb3Bkb3duLW1lbnUnLCBEcm9wZG93bi5wcm90b3R5cGUua2V5ZG93bilcblxufShqUXVlcnkpO1xuXG4vKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqIEJvb3RzdHJhcDogbW9kYWwuanMgdjMuMy43XG4gKiBodHRwOi8vZ2V0Ym9vdHN0cmFwLmNvbS9qYXZhc2NyaXB0LyNtb2RhbHNcbiAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICogQ29weXJpZ2h0IDIwMTEtMjAxNiBUd2l0dGVyLCBJbmMuXG4gKiBMaWNlbnNlZCB1bmRlciBNSVQgKGh0dHBzOi8vZ2l0aHViLmNvbS90d2JzL2Jvb3RzdHJhcC9ibG9iL21hc3Rlci9MSUNFTlNFKVxuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5cblxuK2Z1bmN0aW9uICgkKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICAvLyBNT0RBTCBDTEFTUyBERUZJTklUSU9OXG4gIC8vID09PT09PT09PT09PT09PT09PT09PT1cblxuICB2YXIgTW9kYWwgPSBmdW5jdGlvbiAoZWxlbWVudCwgb3B0aW9ucykge1xuICAgIHRoaXMub3B0aW9ucyAgICAgICAgICAgICA9IG9wdGlvbnNcbiAgICB0aGlzLiRib2R5ICAgICAgICAgICAgICAgPSAkKGRvY3VtZW50LmJvZHkpXG4gICAgdGhpcy4kZWxlbWVudCAgICAgICAgICAgID0gJChlbGVtZW50KVxuICAgIHRoaXMuJGRpYWxvZyAgICAgICAgICAgICA9IHRoaXMuJGVsZW1lbnQuZmluZCgnLm1vZGFsLWRpYWxvZycpXG4gICAgdGhpcy4kYmFja2Ryb3AgICAgICAgICAgID0gbnVsbFxuICAgIHRoaXMuaXNTaG93biAgICAgICAgICAgICA9IG51bGxcbiAgICB0aGlzLm9yaWdpbmFsQm9keVBhZCAgICAgPSBudWxsXG4gICAgdGhpcy5zY3JvbGxiYXJXaWR0aCAgICAgID0gMFxuICAgIHRoaXMuaWdub3JlQmFja2Ryb3BDbGljayA9IGZhbHNlXG5cbiAgICBpZiAodGhpcy5vcHRpb25zLnJlbW90ZSkge1xuICAgICAgdGhpcy4kZWxlbWVudFxuICAgICAgICAuZmluZCgnLm1vZGFsLWNvbnRlbnQnKVxuICAgICAgICAubG9hZCh0aGlzLm9wdGlvbnMucmVtb3RlLCAkLnByb3h5KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICB0aGlzLiRlbGVtZW50LnRyaWdnZXIoJ2xvYWRlZC5icy5tb2RhbCcpXG4gICAgICAgIH0sIHRoaXMpKVxuICAgIH1cbiAgfVxuXG4gIE1vZGFsLlZFUlNJT04gID0gJzMuMy43J1xuXG4gIE1vZGFsLlRSQU5TSVRJT05fRFVSQVRJT04gPSAzMDBcbiAgTW9kYWwuQkFDS0RST1BfVFJBTlNJVElPTl9EVVJBVElPTiA9IDE1MFxuXG4gIE1vZGFsLkRFRkFVTFRTID0ge1xuICAgIGJhY2tkcm9wOiB0cnVlLFxuICAgIGtleWJvYXJkOiB0cnVlLFxuICAgIHNob3c6IHRydWVcbiAgfVxuXG4gIE1vZGFsLnByb3RvdHlwZS50b2dnbGUgPSBmdW5jdGlvbiAoX3JlbGF0ZWRUYXJnZXQpIHtcbiAgICByZXR1cm4gdGhpcy5pc1Nob3duID8gdGhpcy5oaWRlKCkgOiB0aGlzLnNob3coX3JlbGF0ZWRUYXJnZXQpXG4gIH1cblxuICBNb2RhbC5wcm90b3R5cGUuc2hvdyA9IGZ1bmN0aW9uIChfcmVsYXRlZFRhcmdldCkge1xuICAgIHZhciB0aGF0ID0gdGhpc1xuICAgIHZhciBlICAgID0gJC5FdmVudCgnc2hvdy5icy5tb2RhbCcsIHsgcmVsYXRlZFRhcmdldDogX3JlbGF0ZWRUYXJnZXQgfSlcblxuICAgIHRoaXMuJGVsZW1lbnQudHJpZ2dlcihlKVxuXG4gICAgaWYgKHRoaXMuaXNTaG93biB8fCBlLmlzRGVmYXVsdFByZXZlbnRlZCgpKSByZXR1cm5cblxuICAgIHRoaXMuaXNTaG93biA9IHRydWVcblxuICAgIHRoaXMuY2hlY2tTY3JvbGxiYXIoKVxuICAgIHRoaXMuc2V0U2Nyb2xsYmFyKClcbiAgICB0aGlzLiRib2R5LmFkZENsYXNzKCdtb2RhbC1vcGVuJylcblxuICAgIHRoaXMuZXNjYXBlKClcbiAgICB0aGlzLnJlc2l6ZSgpXG5cbiAgICB0aGlzLiRlbGVtZW50Lm9uKCdjbGljay5kaXNtaXNzLmJzLm1vZGFsJywgJ1tkYXRhLWRpc21pc3M9XCJtb2RhbFwiXScsICQucHJveHkodGhpcy5oaWRlLCB0aGlzKSlcblxuICAgIHRoaXMuJGRpYWxvZy5vbignbW91c2Vkb3duLmRpc21pc3MuYnMubW9kYWwnLCBmdW5jdGlvbiAoKSB7XG4gICAgICB0aGF0LiRlbGVtZW50Lm9uZSgnbW91c2V1cC5kaXNtaXNzLmJzLm1vZGFsJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgaWYgKCQoZS50YXJnZXQpLmlzKHRoYXQuJGVsZW1lbnQpKSB0aGF0Lmlnbm9yZUJhY2tkcm9wQ2xpY2sgPSB0cnVlXG4gICAgICB9KVxuICAgIH0pXG5cbiAgICB0aGlzLmJhY2tkcm9wKGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciB0cmFuc2l0aW9uID0gJC5zdXBwb3J0LnRyYW5zaXRpb24gJiYgdGhhdC4kZWxlbWVudC5oYXNDbGFzcygnZmFkZScpXG5cbiAgICAgIGlmICghdGhhdC4kZWxlbWVudC5wYXJlbnQoKS5sZW5ndGgpIHtcbiAgICAgICAgdGhhdC4kZWxlbWVudC5hcHBlbmRUbyh0aGF0LiRib2R5KSAvLyBkb24ndCBtb3ZlIG1vZGFscyBkb20gcG9zaXRpb25cbiAgICAgIH1cblxuICAgICAgdGhhdC4kZWxlbWVudFxuICAgICAgICAuc2hvdygpXG4gICAgICAgIC5zY3JvbGxUb3AoMClcblxuICAgICAgdGhhdC5hZGp1c3REaWFsb2coKVxuXG4gICAgICBpZiAodHJhbnNpdGlvbikge1xuICAgICAgICB0aGF0LiRlbGVtZW50WzBdLm9mZnNldFdpZHRoIC8vIGZvcmNlIHJlZmxvd1xuICAgICAgfVxuXG4gICAgICB0aGF0LiRlbGVtZW50LmFkZENsYXNzKCdpbicpXG5cbiAgICAgIHRoYXQuZW5mb3JjZUZvY3VzKClcblxuICAgICAgdmFyIGUgPSAkLkV2ZW50KCdzaG93bi5icy5tb2RhbCcsIHsgcmVsYXRlZFRhcmdldDogX3JlbGF0ZWRUYXJnZXQgfSlcblxuICAgICAgdHJhbnNpdGlvbiA/XG4gICAgICAgIHRoYXQuJGRpYWxvZyAvLyB3YWl0IGZvciBtb2RhbCB0byBzbGlkZSBpblxuICAgICAgICAgIC5vbmUoJ2JzVHJhbnNpdGlvbkVuZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoYXQuJGVsZW1lbnQudHJpZ2dlcignZm9jdXMnKS50cmlnZ2VyKGUpXG4gICAgICAgICAgfSlcbiAgICAgICAgICAuZW11bGF0ZVRyYW5zaXRpb25FbmQoTW9kYWwuVFJBTlNJVElPTl9EVVJBVElPTikgOlxuICAgICAgICB0aGF0LiRlbGVtZW50LnRyaWdnZXIoJ2ZvY3VzJykudHJpZ2dlcihlKVxuICAgIH0pXG4gIH1cblxuICBNb2RhbC5wcm90b3R5cGUuaGlkZSA9IGZ1bmN0aW9uIChlKSB7XG4gICAgaWYgKGUpIGUucHJldmVudERlZmF1bHQoKVxuXG4gICAgZSA9ICQuRXZlbnQoJ2hpZGUuYnMubW9kYWwnKVxuXG4gICAgdGhpcy4kZWxlbWVudC50cmlnZ2VyKGUpXG5cbiAgICBpZiAoIXRoaXMuaXNTaG93biB8fCBlLmlzRGVmYXVsdFByZXZlbnRlZCgpKSByZXR1cm5cblxuICAgIHRoaXMuaXNTaG93biA9IGZhbHNlXG5cbiAgICB0aGlzLmVzY2FwZSgpXG4gICAgdGhpcy5yZXNpemUoKVxuXG4gICAgJChkb2N1bWVudCkub2ZmKCdmb2N1c2luLmJzLm1vZGFsJylcblxuICAgIHRoaXMuJGVsZW1lbnRcbiAgICAgIC5yZW1vdmVDbGFzcygnaW4nKVxuICAgICAgLm9mZignY2xpY2suZGlzbWlzcy5icy5tb2RhbCcpXG4gICAgICAub2ZmKCdtb3VzZXVwLmRpc21pc3MuYnMubW9kYWwnKVxuXG4gICAgdGhpcy4kZGlhbG9nLm9mZignbW91c2Vkb3duLmRpc21pc3MuYnMubW9kYWwnKVxuXG4gICAgJC5zdXBwb3J0LnRyYW5zaXRpb24gJiYgdGhpcy4kZWxlbWVudC5oYXNDbGFzcygnZmFkZScpID9cbiAgICAgIHRoaXMuJGVsZW1lbnRcbiAgICAgICAgLm9uZSgnYnNUcmFuc2l0aW9uRW5kJywgJC5wcm94eSh0aGlzLmhpZGVNb2RhbCwgdGhpcykpXG4gICAgICAgIC5lbXVsYXRlVHJhbnNpdGlvbkVuZChNb2RhbC5UUkFOU0lUSU9OX0RVUkFUSU9OKSA6XG4gICAgICB0aGlzLmhpZGVNb2RhbCgpXG4gIH1cblxuICBNb2RhbC5wcm90b3R5cGUuZW5mb3JjZUZvY3VzID0gZnVuY3Rpb24gKCkge1xuICAgICQoZG9jdW1lbnQpXG4gICAgICAub2ZmKCdmb2N1c2luLmJzLm1vZGFsJykgLy8gZ3VhcmQgYWdhaW5zdCBpbmZpbml0ZSBmb2N1cyBsb29wXG4gICAgICAub24oJ2ZvY3VzaW4uYnMubW9kYWwnLCAkLnByb3h5KGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGlmIChkb2N1bWVudCAhPT0gZS50YXJnZXQgJiZcbiAgICAgICAgICAgIHRoaXMuJGVsZW1lbnRbMF0gIT09IGUudGFyZ2V0ICYmXG4gICAgICAgICAgICAhdGhpcy4kZWxlbWVudC5oYXMoZS50YXJnZXQpLmxlbmd0aCkge1xuICAgICAgICAgIHRoaXMuJGVsZW1lbnQudHJpZ2dlcignZm9jdXMnKVxuICAgICAgICB9XG4gICAgICB9LCB0aGlzKSlcbiAgfVxuXG4gIE1vZGFsLnByb3RvdHlwZS5lc2NhcGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHRoaXMuaXNTaG93biAmJiB0aGlzLm9wdGlvbnMua2V5Ym9hcmQpIHtcbiAgICAgIHRoaXMuJGVsZW1lbnQub24oJ2tleWRvd24uZGlzbWlzcy5icy5tb2RhbCcsICQucHJveHkoZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgZS53aGljaCA9PSAyNyAmJiB0aGlzLmhpZGUoKVxuICAgICAgfSwgdGhpcykpXG4gICAgfSBlbHNlIGlmICghdGhpcy5pc1Nob3duKSB7XG4gICAgICB0aGlzLiRlbGVtZW50Lm9mZigna2V5ZG93bi5kaXNtaXNzLmJzLm1vZGFsJylcbiAgICB9XG4gIH1cblxuICBNb2RhbC5wcm90b3R5cGUucmVzaXplID0gZnVuY3Rpb24gKCkge1xuICAgIGlmICh0aGlzLmlzU2hvd24pIHtcbiAgICAgICQod2luZG93KS5vbigncmVzaXplLmJzLm1vZGFsJywgJC5wcm94eSh0aGlzLmhhbmRsZVVwZGF0ZSwgdGhpcykpXG4gICAgfSBlbHNlIHtcbiAgICAgICQod2luZG93KS5vZmYoJ3Jlc2l6ZS5icy5tb2RhbCcpXG4gICAgfVxuICB9XG5cbiAgTW9kYWwucHJvdG90eXBlLmhpZGVNb2RhbCA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgdGhhdCA9IHRoaXNcbiAgICB0aGlzLiRlbGVtZW50LmhpZGUoKVxuICAgIHRoaXMuYmFja2Ryb3AoZnVuY3Rpb24gKCkge1xuICAgICAgdGhhdC4kYm9keS5yZW1vdmVDbGFzcygnbW9kYWwtb3BlbicpXG4gICAgICB0aGF0LnJlc2V0QWRqdXN0bWVudHMoKVxuICAgICAgdGhhdC5yZXNldFNjcm9sbGJhcigpXG4gICAgICB0aGF0LiRlbGVtZW50LnRyaWdnZXIoJ2hpZGRlbi5icy5tb2RhbCcpXG4gICAgfSlcbiAgfVxuXG4gIE1vZGFsLnByb3RvdHlwZS5yZW1vdmVCYWNrZHJvcCA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLiRiYWNrZHJvcCAmJiB0aGlzLiRiYWNrZHJvcC5yZW1vdmUoKVxuICAgIHRoaXMuJGJhY2tkcm9wID0gbnVsbFxuICB9XG5cbiAgTW9kYWwucHJvdG90eXBlLmJhY2tkcm9wID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gICAgdmFyIHRoYXQgPSB0aGlzXG4gICAgdmFyIGFuaW1hdGUgPSB0aGlzLiRlbGVtZW50Lmhhc0NsYXNzKCdmYWRlJykgPyAnZmFkZScgOiAnJ1xuXG4gICAgaWYgKHRoaXMuaXNTaG93biAmJiB0aGlzLm9wdGlvbnMuYmFja2Ryb3ApIHtcbiAgICAgIHZhciBkb0FuaW1hdGUgPSAkLnN1cHBvcnQudHJhbnNpdGlvbiAmJiBhbmltYXRlXG5cbiAgICAgIHRoaXMuJGJhY2tkcm9wID0gJChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSlcbiAgICAgICAgLmFkZENsYXNzKCdtb2RhbC1iYWNrZHJvcCAnICsgYW5pbWF0ZSlcbiAgICAgICAgLmFwcGVuZFRvKHRoaXMuJGJvZHkpXG5cbiAgICAgIHRoaXMuJGVsZW1lbnQub24oJ2NsaWNrLmRpc21pc3MuYnMubW9kYWwnLCAkLnByb3h5KGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGlmICh0aGlzLmlnbm9yZUJhY2tkcm9wQ2xpY2spIHtcbiAgICAgICAgICB0aGlzLmlnbm9yZUJhY2tkcm9wQ2xpY2sgPSBmYWxzZVxuICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIGlmIChlLnRhcmdldCAhPT0gZS5jdXJyZW50VGFyZ2V0KSByZXR1cm5cbiAgICAgICAgdGhpcy5vcHRpb25zLmJhY2tkcm9wID09ICdzdGF0aWMnXG4gICAgICAgICAgPyB0aGlzLiRlbGVtZW50WzBdLmZvY3VzKClcbiAgICAgICAgICA6IHRoaXMuaGlkZSgpXG4gICAgICB9LCB0aGlzKSlcblxuICAgICAgaWYgKGRvQW5pbWF0ZSkgdGhpcy4kYmFja2Ryb3BbMF0ub2Zmc2V0V2lkdGggLy8gZm9yY2UgcmVmbG93XG5cbiAgICAgIHRoaXMuJGJhY2tkcm9wLmFkZENsYXNzKCdpbicpXG5cbiAgICAgIGlmICghY2FsbGJhY2spIHJldHVyblxuXG4gICAgICBkb0FuaW1hdGUgP1xuICAgICAgICB0aGlzLiRiYWNrZHJvcFxuICAgICAgICAgIC5vbmUoJ2JzVHJhbnNpdGlvbkVuZCcsIGNhbGxiYWNrKVxuICAgICAgICAgIC5lbXVsYXRlVHJhbnNpdGlvbkVuZChNb2RhbC5CQUNLRFJPUF9UUkFOU0lUSU9OX0RVUkFUSU9OKSA6XG4gICAgICAgIGNhbGxiYWNrKClcblxuICAgIH0gZWxzZSBpZiAoIXRoaXMuaXNTaG93biAmJiB0aGlzLiRiYWNrZHJvcCkge1xuICAgICAgdGhpcy4kYmFja2Ryb3AucmVtb3ZlQ2xhc3MoJ2luJylcblxuICAgICAgdmFyIGNhbGxiYWNrUmVtb3ZlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGF0LnJlbW92ZUJhY2tkcm9wKClcbiAgICAgICAgY2FsbGJhY2sgJiYgY2FsbGJhY2soKVxuICAgICAgfVxuICAgICAgJC5zdXBwb3J0LnRyYW5zaXRpb24gJiYgdGhpcy4kZWxlbWVudC5oYXNDbGFzcygnZmFkZScpID9cbiAgICAgICAgdGhpcy4kYmFja2Ryb3BcbiAgICAgICAgICAub25lKCdic1RyYW5zaXRpb25FbmQnLCBjYWxsYmFja1JlbW92ZSlcbiAgICAgICAgICAuZW11bGF0ZVRyYW5zaXRpb25FbmQoTW9kYWwuQkFDS0RST1BfVFJBTlNJVElPTl9EVVJBVElPTikgOlxuICAgICAgICBjYWxsYmFja1JlbW92ZSgpXG5cbiAgICB9IGVsc2UgaWYgKGNhbGxiYWNrKSB7XG4gICAgICBjYWxsYmFjaygpXG4gICAgfVxuICB9XG5cbiAgLy8gdGhlc2UgZm9sbG93aW5nIG1ldGhvZHMgYXJlIHVzZWQgdG8gaGFuZGxlIG92ZXJmbG93aW5nIG1vZGFsc1xuXG4gIE1vZGFsLnByb3RvdHlwZS5oYW5kbGVVcGRhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5hZGp1c3REaWFsb2coKVxuICB9XG5cbiAgTW9kYWwucHJvdG90eXBlLmFkanVzdERpYWxvZyA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgbW9kYWxJc092ZXJmbG93aW5nID0gdGhpcy4kZWxlbWVudFswXS5zY3JvbGxIZWlnaHQgPiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0XG5cbiAgICB0aGlzLiRlbGVtZW50LmNzcyh7XG4gICAgICBwYWRkaW5nTGVmdDogICF0aGlzLmJvZHlJc092ZXJmbG93aW5nICYmIG1vZGFsSXNPdmVyZmxvd2luZyA/IHRoaXMuc2Nyb2xsYmFyV2lkdGggOiAnJyxcbiAgICAgIHBhZGRpbmdSaWdodDogdGhpcy5ib2R5SXNPdmVyZmxvd2luZyAmJiAhbW9kYWxJc092ZXJmbG93aW5nID8gdGhpcy5zY3JvbGxiYXJXaWR0aCA6ICcnXG4gICAgfSlcbiAgfVxuXG4gIE1vZGFsLnByb3RvdHlwZS5yZXNldEFkanVzdG1lbnRzID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuJGVsZW1lbnQuY3NzKHtcbiAgICAgIHBhZGRpbmdMZWZ0OiAnJyxcbiAgICAgIHBhZGRpbmdSaWdodDogJydcbiAgICB9KVxuICB9XG5cbiAgTW9kYWwucHJvdG90eXBlLmNoZWNrU2Nyb2xsYmFyID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBmdWxsV2luZG93V2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aFxuICAgIGlmICghZnVsbFdpbmRvd1dpZHRoKSB7IC8vIHdvcmthcm91bmQgZm9yIG1pc3Npbmcgd2luZG93LmlubmVyV2lkdGggaW4gSUU4XG4gICAgICB2YXIgZG9jdW1lbnRFbGVtZW50UmVjdCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuICAgICAgZnVsbFdpbmRvd1dpZHRoID0gZG9jdW1lbnRFbGVtZW50UmVjdC5yaWdodCAtIE1hdGguYWJzKGRvY3VtZW50RWxlbWVudFJlY3QubGVmdClcbiAgICB9XG4gICAgdGhpcy5ib2R5SXNPdmVyZmxvd2luZyA9IGRvY3VtZW50LmJvZHkuY2xpZW50V2lkdGggPCBmdWxsV2luZG93V2lkdGhcbiAgICB0aGlzLnNjcm9sbGJhcldpZHRoID0gdGhpcy5tZWFzdXJlU2Nyb2xsYmFyKClcbiAgfVxuXG4gIE1vZGFsLnByb3RvdHlwZS5zZXRTY3JvbGxiYXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGJvZHlQYWQgPSBwYXJzZUludCgodGhpcy4kYm9keS5jc3MoJ3BhZGRpbmctcmlnaHQnKSB8fCAwKSwgMTApXG4gICAgdGhpcy5vcmlnaW5hbEJvZHlQYWQgPSBkb2N1bWVudC5ib2R5LnN0eWxlLnBhZGRpbmdSaWdodCB8fCAnJ1xuICAgIGlmICh0aGlzLmJvZHlJc092ZXJmbG93aW5nKSB0aGlzLiRib2R5LmNzcygncGFkZGluZy1yaWdodCcsIGJvZHlQYWQgKyB0aGlzLnNjcm9sbGJhcldpZHRoKVxuICB9XG5cbiAgTW9kYWwucHJvdG90eXBlLnJlc2V0U2Nyb2xsYmFyID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuJGJvZHkuY3NzKCdwYWRkaW5nLXJpZ2h0JywgdGhpcy5vcmlnaW5hbEJvZHlQYWQpXG4gIH1cblxuICBNb2RhbC5wcm90b3R5cGUubWVhc3VyZVNjcm9sbGJhciA9IGZ1bmN0aW9uICgpIHsgLy8gdGh4IHdhbHNoXG4gICAgdmFyIHNjcm9sbERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgc2Nyb2xsRGl2LmNsYXNzTmFtZSA9ICdtb2RhbC1zY3JvbGxiYXItbWVhc3VyZSdcbiAgICB0aGlzLiRib2R5LmFwcGVuZChzY3JvbGxEaXYpXG4gICAgdmFyIHNjcm9sbGJhcldpZHRoID0gc2Nyb2xsRGl2Lm9mZnNldFdpZHRoIC0gc2Nyb2xsRGl2LmNsaWVudFdpZHRoXG4gICAgdGhpcy4kYm9keVswXS5yZW1vdmVDaGlsZChzY3JvbGxEaXYpXG4gICAgcmV0dXJuIHNjcm9sbGJhcldpZHRoXG4gIH1cblxuXG4gIC8vIE1PREFMIFBMVUdJTiBERUZJTklUSU9OXG4gIC8vID09PT09PT09PT09PT09PT09PT09PT09XG5cbiAgZnVuY3Rpb24gUGx1Z2luKG9wdGlvbiwgX3JlbGF0ZWRUYXJnZXQpIHtcbiAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciAkdGhpcyAgID0gJCh0aGlzKVxuICAgICAgdmFyIGRhdGEgICAgPSAkdGhpcy5kYXRhKCdicy5tb2RhbCcpXG4gICAgICB2YXIgb3B0aW9ucyA9ICQuZXh0ZW5kKHt9LCBNb2RhbC5ERUZBVUxUUywgJHRoaXMuZGF0YSgpLCB0eXBlb2Ygb3B0aW9uID09ICdvYmplY3QnICYmIG9wdGlvbilcblxuICAgICAgaWYgKCFkYXRhKSAkdGhpcy5kYXRhKCdicy5tb2RhbCcsIChkYXRhID0gbmV3IE1vZGFsKHRoaXMsIG9wdGlvbnMpKSlcbiAgICAgIGlmICh0eXBlb2Ygb3B0aW9uID09ICdzdHJpbmcnKSBkYXRhW29wdGlvbl0oX3JlbGF0ZWRUYXJnZXQpXG4gICAgICBlbHNlIGlmIChvcHRpb25zLnNob3cpIGRhdGEuc2hvdyhfcmVsYXRlZFRhcmdldClcbiAgICB9KVxuICB9XG5cbiAgdmFyIG9sZCA9ICQuZm4ubW9kYWxcblxuICAkLmZuLm1vZGFsICAgICAgICAgICAgID0gUGx1Z2luXG4gICQuZm4ubW9kYWwuQ29uc3RydWN0b3IgPSBNb2RhbFxuXG5cbiAgLy8gTU9EQUwgTk8gQ09ORkxJQ1RcbiAgLy8gPT09PT09PT09PT09PT09PT1cblxuICAkLmZuLm1vZGFsLm5vQ29uZmxpY3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgJC5mbi5tb2RhbCA9IG9sZFxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuXG4gIC8vIE1PREFMIERBVEEtQVBJXG4gIC8vID09PT09PT09PT09PT09XG5cbiAgJChkb2N1bWVudCkub24oJ2NsaWNrLmJzLm1vZGFsLmRhdGEtYXBpJywgJ1tkYXRhLXRvZ2dsZT1cIm1vZGFsXCJdJywgZnVuY3Rpb24gKGUpIHtcbiAgICB2YXIgJHRoaXMgICA9ICQodGhpcylcbiAgICB2YXIgaHJlZiAgICA9ICR0aGlzLmF0dHIoJ2hyZWYnKVxuICAgIHZhciAkdGFyZ2V0ID0gJCgkdGhpcy5hdHRyKCdkYXRhLXRhcmdldCcpIHx8IChocmVmICYmIGhyZWYucmVwbGFjZSgvLiooPz0jW15cXHNdKyQpLywgJycpKSkgLy8gc3RyaXAgZm9yIGllN1xuICAgIHZhciBvcHRpb24gID0gJHRhcmdldC5kYXRhKCdicy5tb2RhbCcpID8gJ3RvZ2dsZScgOiAkLmV4dGVuZCh7IHJlbW90ZTogIS8jLy50ZXN0KGhyZWYpICYmIGhyZWYgfSwgJHRhcmdldC5kYXRhKCksICR0aGlzLmRhdGEoKSlcblxuICAgIGlmICgkdGhpcy5pcygnYScpKSBlLnByZXZlbnREZWZhdWx0KClcblxuICAgICR0YXJnZXQub25lKCdzaG93LmJzLm1vZGFsJywgZnVuY3Rpb24gKHNob3dFdmVudCkge1xuICAgICAgaWYgKHNob3dFdmVudC5pc0RlZmF1bHRQcmV2ZW50ZWQoKSkgcmV0dXJuIC8vIG9ubHkgcmVnaXN0ZXIgZm9jdXMgcmVzdG9yZXIgaWYgbW9kYWwgd2lsbCBhY3R1YWxseSBnZXQgc2hvd25cbiAgICAgICR0YXJnZXQub25lKCdoaWRkZW4uYnMubW9kYWwnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICR0aGlzLmlzKCc6dmlzaWJsZScpICYmICR0aGlzLnRyaWdnZXIoJ2ZvY3VzJylcbiAgICAgIH0pXG4gICAgfSlcbiAgICBQbHVnaW4uY2FsbCgkdGFyZ2V0LCBvcHRpb24sIHRoaXMpXG4gIH0pXG5cbn0oalF1ZXJ5KTtcblxuLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKiBCb290c3RyYXA6IHRvb2x0aXAuanMgdjMuMy43XG4gKiBodHRwOi8vZ2V0Ym9vdHN0cmFwLmNvbS9qYXZhc2NyaXB0LyN0b29sdGlwXG4gKiBJbnNwaXJlZCBieSB0aGUgb3JpZ2luYWwgalF1ZXJ5LnRpcHN5IGJ5IEphc29uIEZyYW1lXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqIENvcHlyaWdodCAyMDExLTIwMTYgVHdpdHRlciwgSW5jLlxuICogTGljZW5zZWQgdW5kZXIgTUlUIChodHRwczovL2dpdGh1Yi5jb20vdHdicy9ib290c3RyYXAvYmxvYi9tYXN0ZXIvTElDRU5TRSlcbiAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXG5cbitmdW5jdGlvbiAoJCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgLy8gVE9PTFRJUCBQVUJMSUMgQ0xBU1MgREVGSU5JVElPTlxuICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbiAgdmFyIFRvb2x0aXAgPSBmdW5jdGlvbiAoZWxlbWVudCwgb3B0aW9ucykge1xuICAgIHRoaXMudHlwZSAgICAgICA9IG51bGxcbiAgICB0aGlzLm9wdGlvbnMgICAgPSBudWxsXG4gICAgdGhpcy5lbmFibGVkICAgID0gbnVsbFxuICAgIHRoaXMudGltZW91dCAgICA9IG51bGxcbiAgICB0aGlzLmhvdmVyU3RhdGUgPSBudWxsXG4gICAgdGhpcy4kZWxlbWVudCAgID0gbnVsbFxuICAgIHRoaXMuaW5TdGF0ZSAgICA9IG51bGxcblxuICAgIHRoaXMuaW5pdCgndG9vbHRpcCcsIGVsZW1lbnQsIG9wdGlvbnMpXG4gIH1cblxuICBUb29sdGlwLlZFUlNJT04gID0gJzMuMy43J1xuXG4gIFRvb2x0aXAuVFJBTlNJVElPTl9EVVJBVElPTiA9IDE1MFxuXG4gIFRvb2x0aXAuREVGQVVMVFMgPSB7XG4gICAgYW5pbWF0aW9uOiB0cnVlLFxuICAgIHBsYWNlbWVudDogJ3RvcCcsXG4gICAgc2VsZWN0b3I6IGZhbHNlLFxuICAgIHRlbXBsYXRlOiAnPGRpdiBjbGFzcz1cInRvb2x0aXBcIiByb2xlPVwidG9vbHRpcFwiPjxkaXYgY2xhc3M9XCJ0b29sdGlwLWFycm93XCI+PC9kaXY+PGRpdiBjbGFzcz1cInRvb2x0aXAtaW5uZXJcIj48L2Rpdj48L2Rpdj4nLFxuICAgIHRyaWdnZXI6ICdob3ZlciBmb2N1cycsXG4gICAgdGl0bGU6ICcnLFxuICAgIGRlbGF5OiAwLFxuICAgIGh0bWw6IGZhbHNlLFxuICAgIGNvbnRhaW5lcjogZmFsc2UsXG4gICAgdmlld3BvcnQ6IHtcbiAgICAgIHNlbGVjdG9yOiAnYm9keScsXG4gICAgICBwYWRkaW5nOiAwXG4gICAgfVxuICB9XG5cbiAgVG9vbHRpcC5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICh0eXBlLCBlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgdGhpcy5lbmFibGVkICAgPSB0cnVlXG4gICAgdGhpcy50eXBlICAgICAgPSB0eXBlXG4gICAgdGhpcy4kZWxlbWVudCAgPSAkKGVsZW1lbnQpXG4gICAgdGhpcy5vcHRpb25zICAgPSB0aGlzLmdldE9wdGlvbnMob3B0aW9ucylcbiAgICB0aGlzLiR2aWV3cG9ydCA9IHRoaXMub3B0aW9ucy52aWV3cG9ydCAmJiAkKCQuaXNGdW5jdGlvbih0aGlzLm9wdGlvbnMudmlld3BvcnQpID8gdGhpcy5vcHRpb25zLnZpZXdwb3J0LmNhbGwodGhpcywgdGhpcy4kZWxlbWVudCkgOiAodGhpcy5vcHRpb25zLnZpZXdwb3J0LnNlbGVjdG9yIHx8IHRoaXMub3B0aW9ucy52aWV3cG9ydCkpXG4gICAgdGhpcy5pblN0YXRlICAgPSB7IGNsaWNrOiBmYWxzZSwgaG92ZXI6IGZhbHNlLCBmb2N1czogZmFsc2UgfVxuXG4gICAgaWYgKHRoaXMuJGVsZW1lbnRbMF0gaW5zdGFuY2VvZiBkb2N1bWVudC5jb25zdHJ1Y3RvciAmJiAhdGhpcy5vcHRpb25zLnNlbGVjdG9yKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2BzZWxlY3RvcmAgb3B0aW9uIG11c3QgYmUgc3BlY2lmaWVkIHdoZW4gaW5pdGlhbGl6aW5nICcgKyB0aGlzLnR5cGUgKyAnIG9uIHRoZSB3aW5kb3cuZG9jdW1lbnQgb2JqZWN0IScpXG4gICAgfVxuXG4gICAgdmFyIHRyaWdnZXJzID0gdGhpcy5vcHRpb25zLnRyaWdnZXIuc3BsaXQoJyAnKVxuXG4gICAgZm9yICh2YXIgaSA9IHRyaWdnZXJzLmxlbmd0aDsgaS0tOykge1xuICAgICAgdmFyIHRyaWdnZXIgPSB0cmlnZ2Vyc1tpXVxuXG4gICAgICBpZiAodHJpZ2dlciA9PSAnY2xpY2snKSB7XG4gICAgICAgIHRoaXMuJGVsZW1lbnQub24oJ2NsaWNrLicgKyB0aGlzLnR5cGUsIHRoaXMub3B0aW9ucy5zZWxlY3RvciwgJC5wcm94eSh0aGlzLnRvZ2dsZSwgdGhpcykpXG4gICAgICB9IGVsc2UgaWYgKHRyaWdnZXIgIT0gJ21hbnVhbCcpIHtcbiAgICAgICAgdmFyIGV2ZW50SW4gID0gdHJpZ2dlciA9PSAnaG92ZXInID8gJ21vdXNlZW50ZXInIDogJ2ZvY3VzaW4nXG4gICAgICAgIHZhciBldmVudE91dCA9IHRyaWdnZXIgPT0gJ2hvdmVyJyA/ICdtb3VzZWxlYXZlJyA6ICdmb2N1c291dCdcblxuICAgICAgICB0aGlzLiRlbGVtZW50Lm9uKGV2ZW50SW4gICsgJy4nICsgdGhpcy50eXBlLCB0aGlzLm9wdGlvbnMuc2VsZWN0b3IsICQucHJveHkodGhpcy5lbnRlciwgdGhpcykpXG4gICAgICAgIHRoaXMuJGVsZW1lbnQub24oZXZlbnRPdXQgKyAnLicgKyB0aGlzLnR5cGUsIHRoaXMub3B0aW9ucy5zZWxlY3RvciwgJC5wcm94eSh0aGlzLmxlYXZlLCB0aGlzKSlcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLm9wdGlvbnMuc2VsZWN0b3IgP1xuICAgICAgKHRoaXMuX29wdGlvbnMgPSAkLmV4dGVuZCh7fSwgdGhpcy5vcHRpb25zLCB7IHRyaWdnZXI6ICdtYW51YWwnLCBzZWxlY3RvcjogJycgfSkpIDpcbiAgICAgIHRoaXMuZml4VGl0bGUoKVxuICB9XG5cbiAgVG9vbHRpcC5wcm90b3R5cGUuZ2V0RGVmYXVsdHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIFRvb2x0aXAuREVGQVVMVFNcbiAgfVxuXG4gIFRvb2x0aXAucHJvdG90eXBlLmdldE9wdGlvbnMgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSAkLmV4dGVuZCh7fSwgdGhpcy5nZXREZWZhdWx0cygpLCB0aGlzLiRlbGVtZW50LmRhdGEoKSwgb3B0aW9ucylcblxuICAgIGlmIChvcHRpb25zLmRlbGF5ICYmIHR5cGVvZiBvcHRpb25zLmRlbGF5ID09ICdudW1iZXInKSB7XG4gICAgICBvcHRpb25zLmRlbGF5ID0ge1xuICAgICAgICBzaG93OiBvcHRpb25zLmRlbGF5LFxuICAgICAgICBoaWRlOiBvcHRpb25zLmRlbGF5XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG9wdGlvbnNcbiAgfVxuXG4gIFRvb2x0aXAucHJvdG90eXBlLmdldERlbGVnYXRlT3B0aW9ucyA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgb3B0aW9ucyAgPSB7fVxuICAgIHZhciBkZWZhdWx0cyA9IHRoaXMuZ2V0RGVmYXVsdHMoKVxuXG4gICAgdGhpcy5fb3B0aW9ucyAmJiAkLmVhY2godGhpcy5fb3B0aW9ucywgZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcbiAgICAgIGlmIChkZWZhdWx0c1trZXldICE9IHZhbHVlKSBvcHRpb25zW2tleV0gPSB2YWx1ZVxuICAgIH0pXG5cbiAgICByZXR1cm4gb3B0aW9uc1xuICB9XG5cbiAgVG9vbHRpcC5wcm90b3R5cGUuZW50ZXIgPSBmdW5jdGlvbiAob2JqKSB7XG4gICAgdmFyIHNlbGYgPSBvYmogaW5zdGFuY2VvZiB0aGlzLmNvbnN0cnVjdG9yID9cbiAgICAgIG9iaiA6ICQob2JqLmN1cnJlbnRUYXJnZXQpLmRhdGEoJ2JzLicgKyB0aGlzLnR5cGUpXG5cbiAgICBpZiAoIXNlbGYpIHtcbiAgICAgIHNlbGYgPSBuZXcgdGhpcy5jb25zdHJ1Y3RvcihvYmouY3VycmVudFRhcmdldCwgdGhpcy5nZXREZWxlZ2F0ZU9wdGlvbnMoKSlcbiAgICAgICQob2JqLmN1cnJlbnRUYXJnZXQpLmRhdGEoJ2JzLicgKyB0aGlzLnR5cGUsIHNlbGYpXG4gICAgfVxuXG4gICAgaWYgKG9iaiBpbnN0YW5jZW9mICQuRXZlbnQpIHtcbiAgICAgIHNlbGYuaW5TdGF0ZVtvYmoudHlwZSA9PSAnZm9jdXNpbicgPyAnZm9jdXMnIDogJ2hvdmVyJ10gPSB0cnVlXG4gICAgfVxuXG4gICAgaWYgKHNlbGYudGlwKCkuaGFzQ2xhc3MoJ2luJykgfHwgc2VsZi5ob3ZlclN0YXRlID09ICdpbicpIHtcbiAgICAgIHNlbGYuaG92ZXJTdGF0ZSA9ICdpbidcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGNsZWFyVGltZW91dChzZWxmLnRpbWVvdXQpXG5cbiAgICBzZWxmLmhvdmVyU3RhdGUgPSAnaW4nXG5cbiAgICBpZiAoIXNlbGYub3B0aW9ucy5kZWxheSB8fCAhc2VsZi5vcHRpb25zLmRlbGF5LnNob3cpIHJldHVybiBzZWxmLnNob3coKVxuXG4gICAgc2VsZi50aW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAoc2VsZi5ob3ZlclN0YXRlID09ICdpbicpIHNlbGYuc2hvdygpXG4gICAgfSwgc2VsZi5vcHRpb25zLmRlbGF5LnNob3cpXG4gIH1cblxuICBUb29sdGlwLnByb3RvdHlwZS5pc0luU3RhdGVUcnVlID0gZnVuY3Rpb24gKCkge1xuICAgIGZvciAodmFyIGtleSBpbiB0aGlzLmluU3RhdGUpIHtcbiAgICAgIGlmICh0aGlzLmluU3RhdGVba2V5XSkgcmV0dXJuIHRydWVcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuXG4gIFRvb2x0aXAucHJvdG90eXBlLmxlYXZlID0gZnVuY3Rpb24gKG9iaikge1xuICAgIHZhciBzZWxmID0gb2JqIGluc3RhbmNlb2YgdGhpcy5jb25zdHJ1Y3RvciA/XG4gICAgICBvYmogOiAkKG9iai5jdXJyZW50VGFyZ2V0KS5kYXRhKCdicy4nICsgdGhpcy50eXBlKVxuXG4gICAgaWYgKCFzZWxmKSB7XG4gICAgICBzZWxmID0gbmV3IHRoaXMuY29uc3RydWN0b3Iob2JqLmN1cnJlbnRUYXJnZXQsIHRoaXMuZ2V0RGVsZWdhdGVPcHRpb25zKCkpXG4gICAgICAkKG9iai5jdXJyZW50VGFyZ2V0KS5kYXRhKCdicy4nICsgdGhpcy50eXBlLCBzZWxmKVxuICAgIH1cblxuICAgIGlmIChvYmogaW5zdGFuY2VvZiAkLkV2ZW50KSB7XG4gICAgICBzZWxmLmluU3RhdGVbb2JqLnR5cGUgPT0gJ2ZvY3Vzb3V0JyA/ICdmb2N1cycgOiAnaG92ZXInXSA9IGZhbHNlXG4gICAgfVxuXG4gICAgaWYgKHNlbGYuaXNJblN0YXRlVHJ1ZSgpKSByZXR1cm5cblxuICAgIGNsZWFyVGltZW91dChzZWxmLnRpbWVvdXQpXG5cbiAgICBzZWxmLmhvdmVyU3RhdGUgPSAnb3V0J1xuXG4gICAgaWYgKCFzZWxmLm9wdGlvbnMuZGVsYXkgfHwgIXNlbGYub3B0aW9ucy5kZWxheS5oaWRlKSByZXR1cm4gc2VsZi5oaWRlKClcblxuICAgIHNlbGYudGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKHNlbGYuaG92ZXJTdGF0ZSA9PSAnb3V0Jykgc2VsZi5oaWRlKClcbiAgICB9LCBzZWxmLm9wdGlvbnMuZGVsYXkuaGlkZSlcbiAgfVxuXG4gIFRvb2x0aXAucHJvdG90eXBlLnNob3cgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGUgPSAkLkV2ZW50KCdzaG93LmJzLicgKyB0aGlzLnR5cGUpXG5cbiAgICBpZiAodGhpcy5oYXNDb250ZW50KCkgJiYgdGhpcy5lbmFibGVkKSB7XG4gICAgICB0aGlzLiRlbGVtZW50LnRyaWdnZXIoZSlcblxuICAgICAgdmFyIGluRG9tID0gJC5jb250YWlucyh0aGlzLiRlbGVtZW50WzBdLm93bmVyRG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LCB0aGlzLiRlbGVtZW50WzBdKVxuICAgICAgaWYgKGUuaXNEZWZhdWx0UHJldmVudGVkKCkgfHwgIWluRG9tKSByZXR1cm5cbiAgICAgIHZhciB0aGF0ID0gdGhpc1xuXG4gICAgICB2YXIgJHRpcCA9IHRoaXMudGlwKClcblxuICAgICAgdmFyIHRpcElkID0gdGhpcy5nZXRVSUQodGhpcy50eXBlKVxuXG4gICAgICB0aGlzLnNldENvbnRlbnQoKVxuICAgICAgJHRpcC5hdHRyKCdpZCcsIHRpcElkKVxuICAgICAgdGhpcy4kZWxlbWVudC5hdHRyKCdhcmlhLWRlc2NyaWJlZGJ5JywgdGlwSWQpXG5cbiAgICAgIGlmICh0aGlzLm9wdGlvbnMuYW5pbWF0aW9uKSAkdGlwLmFkZENsYXNzKCdmYWRlJylcblxuICAgICAgdmFyIHBsYWNlbWVudCA9IHR5cGVvZiB0aGlzLm9wdGlvbnMucGxhY2VtZW50ID09ICdmdW5jdGlvbicgP1xuICAgICAgICB0aGlzLm9wdGlvbnMucGxhY2VtZW50LmNhbGwodGhpcywgJHRpcFswXSwgdGhpcy4kZWxlbWVudFswXSkgOlxuICAgICAgICB0aGlzLm9wdGlvbnMucGxhY2VtZW50XG5cbiAgICAgIHZhciBhdXRvVG9rZW4gPSAvXFxzP2F1dG8/XFxzPy9pXG4gICAgICB2YXIgYXV0b1BsYWNlID0gYXV0b1Rva2VuLnRlc3QocGxhY2VtZW50KVxuICAgICAgaWYgKGF1dG9QbGFjZSkgcGxhY2VtZW50ID0gcGxhY2VtZW50LnJlcGxhY2UoYXV0b1Rva2VuLCAnJykgfHwgJ3RvcCdcblxuICAgICAgJHRpcFxuICAgICAgICAuZGV0YWNoKClcbiAgICAgICAgLmNzcyh7IHRvcDogMCwgbGVmdDogMCwgZGlzcGxheTogJ2Jsb2NrJyB9KVxuICAgICAgICAuYWRkQ2xhc3MocGxhY2VtZW50KVxuICAgICAgICAuZGF0YSgnYnMuJyArIHRoaXMudHlwZSwgdGhpcylcblxuICAgICAgdGhpcy5vcHRpb25zLmNvbnRhaW5lciA/ICR0aXAuYXBwZW5kVG8odGhpcy5vcHRpb25zLmNvbnRhaW5lcikgOiAkdGlwLmluc2VydEFmdGVyKHRoaXMuJGVsZW1lbnQpXG4gICAgICB0aGlzLiRlbGVtZW50LnRyaWdnZXIoJ2luc2VydGVkLmJzLicgKyB0aGlzLnR5cGUpXG5cbiAgICAgIHZhciBwb3MgICAgICAgICAgPSB0aGlzLmdldFBvc2l0aW9uKClcbiAgICAgIHZhciBhY3R1YWxXaWR0aCAgPSAkdGlwWzBdLm9mZnNldFdpZHRoXG4gICAgICB2YXIgYWN0dWFsSGVpZ2h0ID0gJHRpcFswXS5vZmZzZXRIZWlnaHRcblxuICAgICAgaWYgKGF1dG9QbGFjZSkge1xuICAgICAgICB2YXIgb3JnUGxhY2VtZW50ID0gcGxhY2VtZW50XG4gICAgICAgIHZhciB2aWV3cG9ydERpbSA9IHRoaXMuZ2V0UG9zaXRpb24odGhpcy4kdmlld3BvcnQpXG5cbiAgICAgICAgcGxhY2VtZW50ID0gcGxhY2VtZW50ID09ICdib3R0b20nICYmIHBvcy5ib3R0b20gKyBhY3R1YWxIZWlnaHQgPiB2aWV3cG9ydERpbS5ib3R0b20gPyAndG9wJyAgICA6XG4gICAgICAgICAgICAgICAgICAgIHBsYWNlbWVudCA9PSAndG9wJyAgICAmJiBwb3MudG9wICAgIC0gYWN0dWFsSGVpZ2h0IDwgdmlld3BvcnREaW0udG9wICAgID8gJ2JvdHRvbScgOlxuICAgICAgICAgICAgICAgICAgICBwbGFjZW1lbnQgPT0gJ3JpZ2h0JyAgJiYgcG9zLnJpZ2h0ICArIGFjdHVhbFdpZHRoICA+IHZpZXdwb3J0RGltLndpZHRoICA/ICdsZWZ0JyAgIDpcbiAgICAgICAgICAgICAgICAgICAgcGxhY2VtZW50ID09ICdsZWZ0JyAgICYmIHBvcy5sZWZ0ICAgLSBhY3R1YWxXaWR0aCAgPCB2aWV3cG9ydERpbS5sZWZ0ICAgPyAncmlnaHQnICA6XG4gICAgICAgICAgICAgICAgICAgIHBsYWNlbWVudFxuXG4gICAgICAgICR0aXBcbiAgICAgICAgICAucmVtb3ZlQ2xhc3Mob3JnUGxhY2VtZW50KVxuICAgICAgICAgIC5hZGRDbGFzcyhwbGFjZW1lbnQpXG4gICAgICB9XG5cbiAgICAgIHZhciBjYWxjdWxhdGVkT2Zmc2V0ID0gdGhpcy5nZXRDYWxjdWxhdGVkT2Zmc2V0KHBsYWNlbWVudCwgcG9zLCBhY3R1YWxXaWR0aCwgYWN0dWFsSGVpZ2h0KVxuXG4gICAgICB0aGlzLmFwcGx5UGxhY2VtZW50KGNhbGN1bGF0ZWRPZmZzZXQsIHBsYWNlbWVudClcblxuICAgICAgdmFyIGNvbXBsZXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgcHJldkhvdmVyU3RhdGUgPSB0aGF0LmhvdmVyU3RhdGVcbiAgICAgICAgdGhhdC4kZWxlbWVudC50cmlnZ2VyKCdzaG93bi5icy4nICsgdGhhdC50eXBlKVxuICAgICAgICB0aGF0LmhvdmVyU3RhdGUgPSBudWxsXG5cbiAgICAgICAgaWYgKHByZXZIb3ZlclN0YXRlID09ICdvdXQnKSB0aGF0LmxlYXZlKHRoYXQpXG4gICAgICB9XG5cbiAgICAgICQuc3VwcG9ydC50cmFuc2l0aW9uICYmIHRoaXMuJHRpcC5oYXNDbGFzcygnZmFkZScpID9cbiAgICAgICAgJHRpcFxuICAgICAgICAgIC5vbmUoJ2JzVHJhbnNpdGlvbkVuZCcsIGNvbXBsZXRlKVxuICAgICAgICAgIC5lbXVsYXRlVHJhbnNpdGlvbkVuZChUb29sdGlwLlRSQU5TSVRJT05fRFVSQVRJT04pIDpcbiAgICAgICAgY29tcGxldGUoKVxuICAgIH1cbiAgfVxuXG4gIFRvb2x0aXAucHJvdG90eXBlLmFwcGx5UGxhY2VtZW50ID0gZnVuY3Rpb24gKG9mZnNldCwgcGxhY2VtZW50KSB7XG4gICAgdmFyICR0aXAgICA9IHRoaXMudGlwKClcbiAgICB2YXIgd2lkdGggID0gJHRpcFswXS5vZmZzZXRXaWR0aFxuICAgIHZhciBoZWlnaHQgPSAkdGlwWzBdLm9mZnNldEhlaWdodFxuXG4gICAgLy8gbWFudWFsbHkgcmVhZCBtYXJnaW5zIGJlY2F1c2UgZ2V0Qm91bmRpbmdDbGllbnRSZWN0IGluY2x1ZGVzIGRpZmZlcmVuY2VcbiAgICB2YXIgbWFyZ2luVG9wID0gcGFyc2VJbnQoJHRpcC5jc3MoJ21hcmdpbi10b3AnKSwgMTApXG4gICAgdmFyIG1hcmdpbkxlZnQgPSBwYXJzZUludCgkdGlwLmNzcygnbWFyZ2luLWxlZnQnKSwgMTApXG5cbiAgICAvLyB3ZSBtdXN0IGNoZWNrIGZvciBOYU4gZm9yIGllIDgvOVxuICAgIGlmIChpc05hTihtYXJnaW5Ub3ApKSAgbWFyZ2luVG9wICA9IDBcbiAgICBpZiAoaXNOYU4obWFyZ2luTGVmdCkpIG1hcmdpbkxlZnQgPSAwXG5cbiAgICBvZmZzZXQudG9wICArPSBtYXJnaW5Ub3BcbiAgICBvZmZzZXQubGVmdCArPSBtYXJnaW5MZWZ0XG5cbiAgICAvLyAkLmZuLm9mZnNldCBkb2Vzbid0IHJvdW5kIHBpeGVsIHZhbHVlc1xuICAgIC8vIHNvIHdlIHVzZSBzZXRPZmZzZXQgZGlyZWN0bHkgd2l0aCBvdXIgb3duIGZ1bmN0aW9uIEItMFxuICAgICQub2Zmc2V0LnNldE9mZnNldCgkdGlwWzBdLCAkLmV4dGVuZCh7XG4gICAgICB1c2luZzogZnVuY3Rpb24gKHByb3BzKSB7XG4gICAgICAgICR0aXAuY3NzKHtcbiAgICAgICAgICB0b3A6IE1hdGgucm91bmQocHJvcHMudG9wKSxcbiAgICAgICAgICBsZWZ0OiBNYXRoLnJvdW5kKHByb3BzLmxlZnQpXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfSwgb2Zmc2V0KSwgMClcblxuICAgICR0aXAuYWRkQ2xhc3MoJ2luJylcblxuICAgIC8vIGNoZWNrIHRvIHNlZSBpZiBwbGFjaW5nIHRpcCBpbiBuZXcgb2Zmc2V0IGNhdXNlZCB0aGUgdGlwIHRvIHJlc2l6ZSBpdHNlbGZcbiAgICB2YXIgYWN0dWFsV2lkdGggID0gJHRpcFswXS5vZmZzZXRXaWR0aFxuICAgIHZhciBhY3R1YWxIZWlnaHQgPSAkdGlwWzBdLm9mZnNldEhlaWdodFxuXG4gICAgaWYgKHBsYWNlbWVudCA9PSAndG9wJyAmJiBhY3R1YWxIZWlnaHQgIT0gaGVpZ2h0KSB7XG4gICAgICBvZmZzZXQudG9wID0gb2Zmc2V0LnRvcCArIGhlaWdodCAtIGFjdHVhbEhlaWdodFxuICAgIH1cblxuICAgIHZhciBkZWx0YSA9IHRoaXMuZ2V0Vmlld3BvcnRBZGp1c3RlZERlbHRhKHBsYWNlbWVudCwgb2Zmc2V0LCBhY3R1YWxXaWR0aCwgYWN0dWFsSGVpZ2h0KVxuXG4gICAgaWYgKGRlbHRhLmxlZnQpIG9mZnNldC5sZWZ0ICs9IGRlbHRhLmxlZnRcbiAgICBlbHNlIG9mZnNldC50b3AgKz0gZGVsdGEudG9wXG5cbiAgICB2YXIgaXNWZXJ0aWNhbCAgICAgICAgICA9IC90b3B8Ym90dG9tLy50ZXN0KHBsYWNlbWVudClcbiAgICB2YXIgYXJyb3dEZWx0YSAgICAgICAgICA9IGlzVmVydGljYWwgPyBkZWx0YS5sZWZ0ICogMiAtIHdpZHRoICsgYWN0dWFsV2lkdGggOiBkZWx0YS50b3AgKiAyIC0gaGVpZ2h0ICsgYWN0dWFsSGVpZ2h0XG4gICAgdmFyIGFycm93T2Zmc2V0UG9zaXRpb24gPSBpc1ZlcnRpY2FsID8gJ29mZnNldFdpZHRoJyA6ICdvZmZzZXRIZWlnaHQnXG5cbiAgICAkdGlwLm9mZnNldChvZmZzZXQpXG4gICAgdGhpcy5yZXBsYWNlQXJyb3coYXJyb3dEZWx0YSwgJHRpcFswXVthcnJvd09mZnNldFBvc2l0aW9uXSwgaXNWZXJ0aWNhbClcbiAgfVxuXG4gIFRvb2x0aXAucHJvdG90eXBlLnJlcGxhY2VBcnJvdyA9IGZ1bmN0aW9uIChkZWx0YSwgZGltZW5zaW9uLCBpc1ZlcnRpY2FsKSB7XG4gICAgdGhpcy5hcnJvdygpXG4gICAgICAuY3NzKGlzVmVydGljYWwgPyAnbGVmdCcgOiAndG9wJywgNTAgKiAoMSAtIGRlbHRhIC8gZGltZW5zaW9uKSArICclJylcbiAgICAgIC5jc3MoaXNWZXJ0aWNhbCA/ICd0b3AnIDogJ2xlZnQnLCAnJylcbiAgfVxuXG4gIFRvb2x0aXAucHJvdG90eXBlLnNldENvbnRlbnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyICR0aXAgID0gdGhpcy50aXAoKVxuICAgIHZhciB0aXRsZSA9IHRoaXMuZ2V0VGl0bGUoKVxuXG4gICAgJHRpcC5maW5kKCcudG9vbHRpcC1pbm5lcicpW3RoaXMub3B0aW9ucy5odG1sID8gJ2h0bWwnIDogJ3RleHQnXSh0aXRsZSlcbiAgICAkdGlwLnJlbW92ZUNsYXNzKCdmYWRlIGluIHRvcCBib3R0b20gbGVmdCByaWdodCcpXG4gIH1cblxuICBUb29sdGlwLnByb3RvdHlwZS5oaWRlID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gICAgdmFyIHRoYXQgPSB0aGlzXG4gICAgdmFyICR0aXAgPSAkKHRoaXMuJHRpcClcbiAgICB2YXIgZSAgICA9ICQuRXZlbnQoJ2hpZGUuYnMuJyArIHRoaXMudHlwZSlcblxuICAgIGZ1bmN0aW9uIGNvbXBsZXRlKCkge1xuICAgICAgaWYgKHRoYXQuaG92ZXJTdGF0ZSAhPSAnaW4nKSAkdGlwLmRldGFjaCgpXG4gICAgICBpZiAodGhhdC4kZWxlbWVudCkgeyAvLyBUT0RPOiBDaGVjayB3aGV0aGVyIGd1YXJkaW5nIHRoaXMgY29kZSB3aXRoIHRoaXMgYGlmYCBpcyByZWFsbHkgbmVjZXNzYXJ5LlxuICAgICAgICB0aGF0LiRlbGVtZW50XG4gICAgICAgICAgLnJlbW92ZUF0dHIoJ2FyaWEtZGVzY3JpYmVkYnknKVxuICAgICAgICAgIC50cmlnZ2VyKCdoaWRkZW4uYnMuJyArIHRoYXQudHlwZSlcbiAgICAgIH1cbiAgICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrKClcbiAgICB9XG5cbiAgICB0aGlzLiRlbGVtZW50LnRyaWdnZXIoZSlcblxuICAgIGlmIChlLmlzRGVmYXVsdFByZXZlbnRlZCgpKSByZXR1cm5cblxuICAgICR0aXAucmVtb3ZlQ2xhc3MoJ2luJylcblxuICAgICQuc3VwcG9ydC50cmFuc2l0aW9uICYmICR0aXAuaGFzQ2xhc3MoJ2ZhZGUnKSA/XG4gICAgICAkdGlwXG4gICAgICAgIC5vbmUoJ2JzVHJhbnNpdGlvbkVuZCcsIGNvbXBsZXRlKVxuICAgICAgICAuZW11bGF0ZVRyYW5zaXRpb25FbmQoVG9vbHRpcC5UUkFOU0lUSU9OX0RVUkFUSU9OKSA6XG4gICAgICBjb21wbGV0ZSgpXG5cbiAgICB0aGlzLmhvdmVyU3RhdGUgPSBudWxsXG5cbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgVG9vbHRpcC5wcm90b3R5cGUuZml4VGl0bGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyICRlID0gdGhpcy4kZWxlbWVudFxuICAgIGlmICgkZS5hdHRyKCd0aXRsZScpIHx8IHR5cGVvZiAkZS5hdHRyKCdkYXRhLW9yaWdpbmFsLXRpdGxlJykgIT0gJ3N0cmluZycpIHtcbiAgICAgICRlLmF0dHIoJ2RhdGEtb3JpZ2luYWwtdGl0bGUnLCAkZS5hdHRyKCd0aXRsZScpIHx8ICcnKS5hdHRyKCd0aXRsZScsICcnKVxuICAgIH1cbiAgfVxuXG4gIFRvb2x0aXAucHJvdG90eXBlLmhhc0NvbnRlbnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0VGl0bGUoKVxuICB9XG5cbiAgVG9vbHRpcC5wcm90b3R5cGUuZ2V0UG9zaXRpb24gPSBmdW5jdGlvbiAoJGVsZW1lbnQpIHtcbiAgICAkZWxlbWVudCAgID0gJGVsZW1lbnQgfHwgdGhpcy4kZWxlbWVudFxuXG4gICAgdmFyIGVsICAgICA9ICRlbGVtZW50WzBdXG4gICAgdmFyIGlzQm9keSA9IGVsLnRhZ05hbWUgPT0gJ0JPRFknXG5cbiAgICB2YXIgZWxSZWN0ICAgID0gZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcbiAgICBpZiAoZWxSZWN0LndpZHRoID09IG51bGwpIHtcbiAgICAgIC8vIHdpZHRoIGFuZCBoZWlnaHQgYXJlIG1pc3NpbmcgaW4gSUU4LCBzbyBjb21wdXRlIHRoZW0gbWFudWFsbHk7IHNlZSBodHRwczovL2dpdGh1Yi5jb20vdHdicy9ib290c3RyYXAvaXNzdWVzLzE0MDkzXG4gICAgICBlbFJlY3QgPSAkLmV4dGVuZCh7fSwgZWxSZWN0LCB7IHdpZHRoOiBlbFJlY3QucmlnaHQgLSBlbFJlY3QubGVmdCwgaGVpZ2h0OiBlbFJlY3QuYm90dG9tIC0gZWxSZWN0LnRvcCB9KVxuICAgIH1cbiAgICB2YXIgaXNTdmcgPSB3aW5kb3cuU1ZHRWxlbWVudCAmJiBlbCBpbnN0YW5jZW9mIHdpbmRvdy5TVkdFbGVtZW50XG4gICAgLy8gQXZvaWQgdXNpbmcgJC5vZmZzZXQoKSBvbiBTVkdzIHNpbmNlIGl0IGdpdmVzIGluY29ycmVjdCByZXN1bHRzIGluIGpRdWVyeSAzLlxuICAgIC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vdHdicy9ib290c3RyYXAvaXNzdWVzLzIwMjgwXG4gICAgdmFyIGVsT2Zmc2V0ICA9IGlzQm9keSA/IHsgdG9wOiAwLCBsZWZ0OiAwIH0gOiAoaXNTdmcgPyBudWxsIDogJGVsZW1lbnQub2Zmc2V0KCkpXG4gICAgdmFyIHNjcm9sbCAgICA9IHsgc2Nyb2xsOiBpc0JvZHkgPyBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wIHx8IGRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wIDogJGVsZW1lbnQuc2Nyb2xsVG9wKCkgfVxuICAgIHZhciBvdXRlckRpbXMgPSBpc0JvZHkgPyB7IHdpZHRoOiAkKHdpbmRvdykud2lkdGgoKSwgaGVpZ2h0OiAkKHdpbmRvdykuaGVpZ2h0KCkgfSA6IG51bGxcblxuICAgIHJldHVybiAkLmV4dGVuZCh7fSwgZWxSZWN0LCBzY3JvbGwsIG91dGVyRGltcywgZWxPZmZzZXQpXG4gIH1cblxuICBUb29sdGlwLnByb3RvdHlwZS5nZXRDYWxjdWxhdGVkT2Zmc2V0ID0gZnVuY3Rpb24gKHBsYWNlbWVudCwgcG9zLCBhY3R1YWxXaWR0aCwgYWN0dWFsSGVpZ2h0KSB7XG4gICAgcmV0dXJuIHBsYWNlbWVudCA9PSAnYm90dG9tJyA/IHsgdG9wOiBwb3MudG9wICsgcG9zLmhlaWdodCwgICBsZWZ0OiBwb3MubGVmdCArIHBvcy53aWR0aCAvIDIgLSBhY3R1YWxXaWR0aCAvIDIgfSA6XG4gICAgICAgICAgIHBsYWNlbWVudCA9PSAndG9wJyAgICA/IHsgdG9wOiBwb3MudG9wIC0gYWN0dWFsSGVpZ2h0LCBsZWZ0OiBwb3MubGVmdCArIHBvcy53aWR0aCAvIDIgLSBhY3R1YWxXaWR0aCAvIDIgfSA6XG4gICAgICAgICAgIHBsYWNlbWVudCA9PSAnbGVmdCcgICA/IHsgdG9wOiBwb3MudG9wICsgcG9zLmhlaWdodCAvIDIgLSBhY3R1YWxIZWlnaHQgLyAyLCBsZWZ0OiBwb3MubGVmdCAtIGFjdHVhbFdpZHRoIH0gOlxuICAgICAgICAvKiBwbGFjZW1lbnQgPT0gJ3JpZ2h0JyAqLyB7IHRvcDogcG9zLnRvcCArIHBvcy5oZWlnaHQgLyAyIC0gYWN0dWFsSGVpZ2h0IC8gMiwgbGVmdDogcG9zLmxlZnQgKyBwb3Mud2lkdGggfVxuXG4gIH1cblxuICBUb29sdGlwLnByb3RvdHlwZS5nZXRWaWV3cG9ydEFkanVzdGVkRGVsdGEgPSBmdW5jdGlvbiAocGxhY2VtZW50LCBwb3MsIGFjdHVhbFdpZHRoLCBhY3R1YWxIZWlnaHQpIHtcbiAgICB2YXIgZGVsdGEgPSB7IHRvcDogMCwgbGVmdDogMCB9XG4gICAgaWYgKCF0aGlzLiR2aWV3cG9ydCkgcmV0dXJuIGRlbHRhXG5cbiAgICB2YXIgdmlld3BvcnRQYWRkaW5nID0gdGhpcy5vcHRpb25zLnZpZXdwb3J0ICYmIHRoaXMub3B0aW9ucy52aWV3cG9ydC5wYWRkaW5nIHx8IDBcbiAgICB2YXIgdmlld3BvcnREaW1lbnNpb25zID0gdGhpcy5nZXRQb3NpdGlvbih0aGlzLiR2aWV3cG9ydClcblxuICAgIGlmICgvcmlnaHR8bGVmdC8udGVzdChwbGFjZW1lbnQpKSB7XG4gICAgICB2YXIgdG9wRWRnZU9mZnNldCAgICA9IHBvcy50b3AgLSB2aWV3cG9ydFBhZGRpbmcgLSB2aWV3cG9ydERpbWVuc2lvbnMuc2Nyb2xsXG4gICAgICB2YXIgYm90dG9tRWRnZU9mZnNldCA9IHBvcy50b3AgKyB2aWV3cG9ydFBhZGRpbmcgLSB2aWV3cG9ydERpbWVuc2lvbnMuc2Nyb2xsICsgYWN0dWFsSGVpZ2h0XG4gICAgICBpZiAodG9wRWRnZU9mZnNldCA8IHZpZXdwb3J0RGltZW5zaW9ucy50b3ApIHsgLy8gdG9wIG92ZXJmbG93XG4gICAgICAgIGRlbHRhLnRvcCA9IHZpZXdwb3J0RGltZW5zaW9ucy50b3AgLSB0b3BFZGdlT2Zmc2V0XG4gICAgICB9IGVsc2UgaWYgKGJvdHRvbUVkZ2VPZmZzZXQgPiB2aWV3cG9ydERpbWVuc2lvbnMudG9wICsgdmlld3BvcnREaW1lbnNpb25zLmhlaWdodCkgeyAvLyBib3R0b20gb3ZlcmZsb3dcbiAgICAgICAgZGVsdGEudG9wID0gdmlld3BvcnREaW1lbnNpb25zLnRvcCArIHZpZXdwb3J0RGltZW5zaW9ucy5oZWlnaHQgLSBib3R0b21FZGdlT2Zmc2V0XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBsZWZ0RWRnZU9mZnNldCAgPSBwb3MubGVmdCAtIHZpZXdwb3J0UGFkZGluZ1xuICAgICAgdmFyIHJpZ2h0RWRnZU9mZnNldCA9IHBvcy5sZWZ0ICsgdmlld3BvcnRQYWRkaW5nICsgYWN0dWFsV2lkdGhcbiAgICAgIGlmIChsZWZ0RWRnZU9mZnNldCA8IHZpZXdwb3J0RGltZW5zaW9ucy5sZWZ0KSB7IC8vIGxlZnQgb3ZlcmZsb3dcbiAgICAgICAgZGVsdGEubGVmdCA9IHZpZXdwb3J0RGltZW5zaW9ucy5sZWZ0IC0gbGVmdEVkZ2VPZmZzZXRcbiAgICAgIH0gZWxzZSBpZiAocmlnaHRFZGdlT2Zmc2V0ID4gdmlld3BvcnREaW1lbnNpb25zLnJpZ2h0KSB7IC8vIHJpZ2h0IG92ZXJmbG93XG4gICAgICAgIGRlbHRhLmxlZnQgPSB2aWV3cG9ydERpbWVuc2lvbnMubGVmdCArIHZpZXdwb3J0RGltZW5zaW9ucy53aWR0aCAtIHJpZ2h0RWRnZU9mZnNldFxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBkZWx0YVxuICB9XG5cbiAgVG9vbHRpcC5wcm90b3R5cGUuZ2V0VGl0bGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHRpdGxlXG4gICAgdmFyICRlID0gdGhpcy4kZWxlbWVudFxuICAgIHZhciBvICA9IHRoaXMub3B0aW9uc1xuXG4gICAgdGl0bGUgPSAkZS5hdHRyKCdkYXRhLW9yaWdpbmFsLXRpdGxlJylcbiAgICAgIHx8ICh0eXBlb2Ygby50aXRsZSA9PSAnZnVuY3Rpb24nID8gby50aXRsZS5jYWxsKCRlWzBdKSA6ICBvLnRpdGxlKVxuXG4gICAgcmV0dXJuIHRpdGxlXG4gIH1cblxuICBUb29sdGlwLnByb3RvdHlwZS5nZXRVSUQgPSBmdW5jdGlvbiAocHJlZml4KSB7XG4gICAgZG8gcHJlZml4ICs9IH5+KE1hdGgucmFuZG9tKCkgKiAxMDAwMDAwKVxuICAgIHdoaWxlIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChwcmVmaXgpKVxuICAgIHJldHVybiBwcmVmaXhcbiAgfVxuXG4gIFRvb2x0aXAucHJvdG90eXBlLnRpcCA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoIXRoaXMuJHRpcCkge1xuICAgICAgdGhpcy4kdGlwID0gJCh0aGlzLm9wdGlvbnMudGVtcGxhdGUpXG4gICAgICBpZiAodGhpcy4kdGlwLmxlbmd0aCAhPSAxKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcih0aGlzLnR5cGUgKyAnIGB0ZW1wbGF0ZWAgb3B0aW9uIG11c3QgY29uc2lzdCBvZiBleGFjdGx5IDEgdG9wLWxldmVsIGVsZW1lbnQhJylcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuJHRpcFxuICB9XG5cbiAgVG9vbHRpcC5wcm90b3R5cGUuYXJyb3cgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuICh0aGlzLiRhcnJvdyA9IHRoaXMuJGFycm93IHx8IHRoaXMudGlwKCkuZmluZCgnLnRvb2x0aXAtYXJyb3cnKSlcbiAgfVxuXG4gIFRvb2x0aXAucHJvdG90eXBlLmVuYWJsZSA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmVuYWJsZWQgPSB0cnVlXG4gIH1cblxuICBUb29sdGlwLnByb3RvdHlwZS5kaXNhYmxlID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZW5hYmxlZCA9IGZhbHNlXG4gIH1cblxuICBUb29sdGlwLnByb3RvdHlwZS50b2dnbGVFbmFibGVkID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZW5hYmxlZCA9ICF0aGlzLmVuYWJsZWRcbiAgfVxuXG4gIFRvb2x0aXAucHJvdG90eXBlLnRvZ2dsZSA9IGZ1bmN0aW9uIChlKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzXG4gICAgaWYgKGUpIHtcbiAgICAgIHNlbGYgPSAkKGUuY3VycmVudFRhcmdldCkuZGF0YSgnYnMuJyArIHRoaXMudHlwZSlcbiAgICAgIGlmICghc2VsZikge1xuICAgICAgICBzZWxmID0gbmV3IHRoaXMuY29uc3RydWN0b3IoZS5jdXJyZW50VGFyZ2V0LCB0aGlzLmdldERlbGVnYXRlT3B0aW9ucygpKVxuICAgICAgICAkKGUuY3VycmVudFRhcmdldCkuZGF0YSgnYnMuJyArIHRoaXMudHlwZSwgc2VsZilcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoZSkge1xuICAgICAgc2VsZi5pblN0YXRlLmNsaWNrID0gIXNlbGYuaW5TdGF0ZS5jbGlja1xuICAgICAgaWYgKHNlbGYuaXNJblN0YXRlVHJ1ZSgpKSBzZWxmLmVudGVyKHNlbGYpXG4gICAgICBlbHNlIHNlbGYubGVhdmUoc2VsZilcbiAgICB9IGVsc2Uge1xuICAgICAgc2VsZi50aXAoKS5oYXNDbGFzcygnaW4nKSA/IHNlbGYubGVhdmUoc2VsZikgOiBzZWxmLmVudGVyKHNlbGYpXG4gICAgfVxuICB9XG5cbiAgVG9vbHRpcC5wcm90b3R5cGUuZGVzdHJveSA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgdGhhdCA9IHRoaXNcbiAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lb3V0KVxuICAgIHRoaXMuaGlkZShmdW5jdGlvbiAoKSB7XG4gICAgICB0aGF0LiRlbGVtZW50Lm9mZignLicgKyB0aGF0LnR5cGUpLnJlbW92ZURhdGEoJ2JzLicgKyB0aGF0LnR5cGUpXG4gICAgICBpZiAodGhhdC4kdGlwKSB7XG4gICAgICAgIHRoYXQuJHRpcC5kZXRhY2goKVxuICAgICAgfVxuICAgICAgdGhhdC4kdGlwID0gbnVsbFxuICAgICAgdGhhdC4kYXJyb3cgPSBudWxsXG4gICAgICB0aGF0LiR2aWV3cG9ydCA9IG51bGxcbiAgICAgIHRoYXQuJGVsZW1lbnQgPSBudWxsXG4gICAgfSlcbiAgfVxuXG5cbiAgLy8gVE9PTFRJUCBQTFVHSU4gREVGSU5JVElPTlxuICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09XG5cbiAgZnVuY3Rpb24gUGx1Z2luKG9wdGlvbikge1xuICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgdmFyICR0aGlzICAgPSAkKHRoaXMpXG4gICAgICB2YXIgZGF0YSAgICA9ICR0aGlzLmRhdGEoJ2JzLnRvb2x0aXAnKVxuICAgICAgdmFyIG9wdGlvbnMgPSB0eXBlb2Ygb3B0aW9uID09ICdvYmplY3QnICYmIG9wdGlvblxuXG4gICAgICBpZiAoIWRhdGEgJiYgL2Rlc3Ryb3l8aGlkZS8udGVzdChvcHRpb24pKSByZXR1cm5cbiAgICAgIGlmICghZGF0YSkgJHRoaXMuZGF0YSgnYnMudG9vbHRpcCcsIChkYXRhID0gbmV3IFRvb2x0aXAodGhpcywgb3B0aW9ucykpKVxuICAgICAgaWYgKHR5cGVvZiBvcHRpb24gPT0gJ3N0cmluZycpIGRhdGFbb3B0aW9uXSgpXG4gICAgfSlcbiAgfVxuXG4gIHZhciBvbGQgPSAkLmZuLnRvb2x0aXBcblxuICAkLmZuLnRvb2x0aXAgICAgICAgICAgICAgPSBQbHVnaW5cbiAgJC5mbi50b29sdGlwLkNvbnN0cnVjdG9yID0gVG9vbHRpcFxuXG5cbiAgLy8gVE9PTFRJUCBOTyBDT05GTElDVFxuICAvLyA9PT09PT09PT09PT09PT09PT09XG5cbiAgJC5mbi50b29sdGlwLm5vQ29uZmxpY3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgJC5mbi50b29sdGlwID0gb2xkXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG59KGpRdWVyeSk7XG5cbi8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICogQm9vdHN0cmFwOiBwb3BvdmVyLmpzIHYzLjMuN1xuICogaHR0cDovL2dldGJvb3RzdHJhcC5jb20vamF2YXNjcmlwdC8jcG9wb3ZlcnNcbiAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICogQ29weXJpZ2h0IDIwMTEtMjAxNiBUd2l0dGVyLCBJbmMuXG4gKiBMaWNlbnNlZCB1bmRlciBNSVQgKGh0dHBzOi8vZ2l0aHViLmNvbS90d2JzL2Jvb3RzdHJhcC9ibG9iL21hc3Rlci9MSUNFTlNFKVxuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5cblxuK2Z1bmN0aW9uICgkKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICAvLyBQT1BPVkVSIFBVQkxJQyBDTEFTUyBERUZJTklUSU9OXG4gIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuICB2YXIgUG9wb3ZlciA9IGZ1bmN0aW9uIChlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgdGhpcy5pbml0KCdwb3BvdmVyJywgZWxlbWVudCwgb3B0aW9ucylcbiAgfVxuXG4gIGlmICghJC5mbi50b29sdGlwKSB0aHJvdyBuZXcgRXJyb3IoJ1BvcG92ZXIgcmVxdWlyZXMgdG9vbHRpcC5qcycpXG5cbiAgUG9wb3Zlci5WRVJTSU9OICA9ICczLjMuNydcblxuICBQb3BvdmVyLkRFRkFVTFRTID0gJC5leHRlbmQoe30sICQuZm4udG9vbHRpcC5Db25zdHJ1Y3Rvci5ERUZBVUxUUywge1xuICAgIHBsYWNlbWVudDogJ3JpZ2h0JyxcbiAgICB0cmlnZ2VyOiAnY2xpY2snLFxuICAgIGNvbnRlbnQ6ICcnLFxuICAgIHRlbXBsYXRlOiAnPGRpdiBjbGFzcz1cInBvcG92ZXJcIiByb2xlPVwidG9vbHRpcFwiPjxkaXYgY2xhc3M9XCJhcnJvd1wiPjwvZGl2PjxoMyBjbGFzcz1cInBvcG92ZXItdGl0bGVcIj48L2gzPjxkaXYgY2xhc3M9XCJwb3BvdmVyLWNvbnRlbnRcIj48L2Rpdj48L2Rpdj4nXG4gIH0pXG5cblxuICAvLyBOT1RFOiBQT1BPVkVSIEVYVEVORFMgdG9vbHRpcC5qc1xuICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4gIFBvcG92ZXIucHJvdG90eXBlID0gJC5leHRlbmQoe30sICQuZm4udG9vbHRpcC5Db25zdHJ1Y3Rvci5wcm90b3R5cGUpXG5cbiAgUG9wb3Zlci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBQb3BvdmVyXG5cbiAgUG9wb3Zlci5wcm90b3R5cGUuZ2V0RGVmYXVsdHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIFBvcG92ZXIuREVGQVVMVFNcbiAgfVxuXG4gIFBvcG92ZXIucHJvdG90eXBlLnNldENvbnRlbnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyICR0aXAgICAgPSB0aGlzLnRpcCgpXG4gICAgdmFyIHRpdGxlICAgPSB0aGlzLmdldFRpdGxlKClcbiAgICB2YXIgY29udGVudCA9IHRoaXMuZ2V0Q29udGVudCgpXG5cbiAgICAkdGlwLmZpbmQoJy5wb3BvdmVyLXRpdGxlJylbdGhpcy5vcHRpb25zLmh0bWwgPyAnaHRtbCcgOiAndGV4dCddKHRpdGxlKVxuICAgICR0aXAuZmluZCgnLnBvcG92ZXItY29udGVudCcpLmNoaWxkcmVuKCkuZGV0YWNoKCkuZW5kKClbIC8vIHdlIHVzZSBhcHBlbmQgZm9yIGh0bWwgb2JqZWN0cyB0byBtYWludGFpbiBqcyBldmVudHNcbiAgICAgIHRoaXMub3B0aW9ucy5odG1sID8gKHR5cGVvZiBjb250ZW50ID09ICdzdHJpbmcnID8gJ2h0bWwnIDogJ2FwcGVuZCcpIDogJ3RleHQnXG4gICAgXShjb250ZW50KVxuXG4gICAgJHRpcC5yZW1vdmVDbGFzcygnZmFkZSB0b3AgYm90dG9tIGxlZnQgcmlnaHQgaW4nKVxuXG4gICAgLy8gSUU4IGRvZXNuJ3QgYWNjZXB0IGhpZGluZyB2aWEgdGhlIGA6ZW1wdHlgIHBzZXVkbyBzZWxlY3Rvciwgd2UgaGF2ZSB0byBkb1xuICAgIC8vIHRoaXMgbWFudWFsbHkgYnkgY2hlY2tpbmcgdGhlIGNvbnRlbnRzLlxuICAgIGlmICghJHRpcC5maW5kKCcucG9wb3Zlci10aXRsZScpLmh0bWwoKSkgJHRpcC5maW5kKCcucG9wb3Zlci10aXRsZScpLmhpZGUoKVxuICB9XG5cbiAgUG9wb3Zlci5wcm90b3R5cGUuaGFzQ29udGVudCA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRUaXRsZSgpIHx8IHRoaXMuZ2V0Q29udGVudCgpXG4gIH1cblxuICBQb3BvdmVyLnByb3RvdHlwZS5nZXRDb250ZW50ID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciAkZSA9IHRoaXMuJGVsZW1lbnRcbiAgICB2YXIgbyAgPSB0aGlzLm9wdGlvbnNcblxuICAgIHJldHVybiAkZS5hdHRyKCdkYXRhLWNvbnRlbnQnKVxuICAgICAgfHwgKHR5cGVvZiBvLmNvbnRlbnQgPT0gJ2Z1bmN0aW9uJyA/XG4gICAgICAgICAgICBvLmNvbnRlbnQuY2FsbCgkZVswXSkgOlxuICAgICAgICAgICAgby5jb250ZW50KVxuICB9XG5cbiAgUG9wb3Zlci5wcm90b3R5cGUuYXJyb3cgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuICh0aGlzLiRhcnJvdyA9IHRoaXMuJGFycm93IHx8IHRoaXMudGlwKCkuZmluZCgnLmFycm93JykpXG4gIH1cblxuXG4gIC8vIFBPUE9WRVIgUExVR0lOIERFRklOSVRJT05cbiAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4gIGZ1bmN0aW9uIFBsdWdpbihvcHRpb24pIHtcbiAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciAkdGhpcyAgID0gJCh0aGlzKVxuICAgICAgdmFyIGRhdGEgICAgPSAkdGhpcy5kYXRhKCdicy5wb3BvdmVyJylcbiAgICAgIHZhciBvcHRpb25zID0gdHlwZW9mIG9wdGlvbiA9PSAnb2JqZWN0JyAmJiBvcHRpb25cblxuICAgICAgaWYgKCFkYXRhICYmIC9kZXN0cm95fGhpZGUvLnRlc3Qob3B0aW9uKSkgcmV0dXJuXG4gICAgICBpZiAoIWRhdGEpICR0aGlzLmRhdGEoJ2JzLnBvcG92ZXInLCAoZGF0YSA9IG5ldyBQb3BvdmVyKHRoaXMsIG9wdGlvbnMpKSlcbiAgICAgIGlmICh0eXBlb2Ygb3B0aW9uID09ICdzdHJpbmcnKSBkYXRhW29wdGlvbl0oKVxuICAgIH0pXG4gIH1cblxuICB2YXIgb2xkID0gJC5mbi5wb3BvdmVyXG5cbiAgJC5mbi5wb3BvdmVyICAgICAgICAgICAgID0gUGx1Z2luXG4gICQuZm4ucG9wb3Zlci5Db25zdHJ1Y3RvciA9IFBvcG92ZXJcblxuXG4gIC8vIFBPUE9WRVIgTk8gQ09ORkxJQ1RcbiAgLy8gPT09PT09PT09PT09PT09PT09PVxuXG4gICQuZm4ucG9wb3Zlci5ub0NvbmZsaWN0ID0gZnVuY3Rpb24gKCkge1xuICAgICQuZm4ucG9wb3ZlciA9IG9sZFxuICAgIHJldHVybiB0aGlzXG4gIH1cblxufShqUXVlcnkpO1xuXG4vKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqIEJvb3RzdHJhcDogc2Nyb2xsc3B5LmpzIHYzLjMuN1xuICogaHR0cDovL2dldGJvb3RzdHJhcC5jb20vamF2YXNjcmlwdC8jc2Nyb2xsc3B5XG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqIENvcHlyaWdodCAyMDExLTIwMTYgVHdpdHRlciwgSW5jLlxuICogTGljZW5zZWQgdW5kZXIgTUlUIChodHRwczovL2dpdGh1Yi5jb20vdHdicy9ib290c3RyYXAvYmxvYi9tYXN0ZXIvTElDRU5TRSlcbiAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXG5cbitmdW5jdGlvbiAoJCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgLy8gU0NST0xMU1BZIENMQVNTIERFRklOSVRJT05cbiAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuICBmdW5jdGlvbiBTY3JvbGxTcHkoZWxlbWVudCwgb3B0aW9ucykge1xuICAgIHRoaXMuJGJvZHkgICAgICAgICAgPSAkKGRvY3VtZW50LmJvZHkpXG4gICAgdGhpcy4kc2Nyb2xsRWxlbWVudCA9ICQoZWxlbWVudCkuaXMoZG9jdW1lbnQuYm9keSkgPyAkKHdpbmRvdykgOiAkKGVsZW1lbnQpXG4gICAgdGhpcy5vcHRpb25zICAgICAgICA9ICQuZXh0ZW5kKHt9LCBTY3JvbGxTcHkuREVGQVVMVFMsIG9wdGlvbnMpXG4gICAgdGhpcy5zZWxlY3RvciAgICAgICA9ICh0aGlzLm9wdGlvbnMudGFyZ2V0IHx8ICcnKSArICcgLm5hdiBsaSA+IGEnXG4gICAgdGhpcy5vZmZzZXRzICAgICAgICA9IFtdXG4gICAgdGhpcy50YXJnZXRzICAgICAgICA9IFtdXG4gICAgdGhpcy5hY3RpdmVUYXJnZXQgICA9IG51bGxcbiAgICB0aGlzLnNjcm9sbEhlaWdodCAgID0gMFxuXG4gICAgdGhpcy4kc2Nyb2xsRWxlbWVudC5vbignc2Nyb2xsLmJzLnNjcm9sbHNweScsICQucHJveHkodGhpcy5wcm9jZXNzLCB0aGlzKSlcbiAgICB0aGlzLnJlZnJlc2goKVxuICAgIHRoaXMucHJvY2VzcygpXG4gIH1cblxuICBTY3JvbGxTcHkuVkVSU0lPTiAgPSAnMy4zLjcnXG5cbiAgU2Nyb2xsU3B5LkRFRkFVTFRTID0ge1xuICAgIG9mZnNldDogMTBcbiAgfVxuXG4gIFNjcm9sbFNweS5wcm90b3R5cGUuZ2V0U2Nyb2xsSGVpZ2h0ID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLiRzY3JvbGxFbGVtZW50WzBdLnNjcm9sbEhlaWdodCB8fCBNYXRoLm1heCh0aGlzLiRib2R5WzBdLnNjcm9sbEhlaWdodCwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbEhlaWdodClcbiAgfVxuXG4gIFNjcm9sbFNweS5wcm90b3R5cGUucmVmcmVzaCA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgdGhhdCAgICAgICAgICA9IHRoaXNcbiAgICB2YXIgb2Zmc2V0TWV0aG9kICA9ICdvZmZzZXQnXG4gICAgdmFyIG9mZnNldEJhc2UgICAgPSAwXG5cbiAgICB0aGlzLm9mZnNldHMgICAgICA9IFtdXG4gICAgdGhpcy50YXJnZXRzICAgICAgPSBbXVxuICAgIHRoaXMuc2Nyb2xsSGVpZ2h0ID0gdGhpcy5nZXRTY3JvbGxIZWlnaHQoKVxuXG4gICAgaWYgKCEkLmlzV2luZG93KHRoaXMuJHNjcm9sbEVsZW1lbnRbMF0pKSB7XG4gICAgICBvZmZzZXRNZXRob2QgPSAncG9zaXRpb24nXG4gICAgICBvZmZzZXRCYXNlICAgPSB0aGlzLiRzY3JvbGxFbGVtZW50LnNjcm9sbFRvcCgpXG4gICAgfVxuXG4gICAgdGhpcy4kYm9keVxuICAgICAgLmZpbmQodGhpcy5zZWxlY3RvcilcbiAgICAgIC5tYXAoZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgJGVsICAgPSAkKHRoaXMpXG4gICAgICAgIHZhciBocmVmICA9ICRlbC5kYXRhKCd0YXJnZXQnKSB8fCAkZWwuYXR0cignaHJlZicpXG4gICAgICAgIHZhciAkaHJlZiA9IC9eIy4vLnRlc3QoaHJlZikgJiYgJChocmVmKVxuXG4gICAgICAgIHJldHVybiAoJGhyZWZcbiAgICAgICAgICAmJiAkaHJlZi5sZW5ndGhcbiAgICAgICAgICAmJiAkaHJlZi5pcygnOnZpc2libGUnKVxuICAgICAgICAgICYmIFtbJGhyZWZbb2Zmc2V0TWV0aG9kXSgpLnRvcCArIG9mZnNldEJhc2UsIGhyZWZdXSkgfHwgbnVsbFxuICAgICAgfSlcbiAgICAgIC5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7IHJldHVybiBhWzBdIC0gYlswXSB9KVxuICAgICAgLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGF0Lm9mZnNldHMucHVzaCh0aGlzWzBdKVxuICAgICAgICB0aGF0LnRhcmdldHMucHVzaCh0aGlzWzFdKVxuICAgICAgfSlcbiAgfVxuXG4gIFNjcm9sbFNweS5wcm90b3R5cGUucHJvY2VzcyA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgc2Nyb2xsVG9wICAgID0gdGhpcy4kc2Nyb2xsRWxlbWVudC5zY3JvbGxUb3AoKSArIHRoaXMub3B0aW9ucy5vZmZzZXRcbiAgICB2YXIgc2Nyb2xsSGVpZ2h0ID0gdGhpcy5nZXRTY3JvbGxIZWlnaHQoKVxuICAgIHZhciBtYXhTY3JvbGwgICAgPSB0aGlzLm9wdGlvbnMub2Zmc2V0ICsgc2Nyb2xsSGVpZ2h0IC0gdGhpcy4kc2Nyb2xsRWxlbWVudC5oZWlnaHQoKVxuICAgIHZhciBvZmZzZXRzICAgICAgPSB0aGlzLm9mZnNldHNcbiAgICB2YXIgdGFyZ2V0cyAgICAgID0gdGhpcy50YXJnZXRzXG4gICAgdmFyIGFjdGl2ZVRhcmdldCA9IHRoaXMuYWN0aXZlVGFyZ2V0XG4gICAgdmFyIGlcblxuICAgIGlmICh0aGlzLnNjcm9sbEhlaWdodCAhPSBzY3JvbGxIZWlnaHQpIHtcbiAgICAgIHRoaXMucmVmcmVzaCgpXG4gICAgfVxuXG4gICAgaWYgKHNjcm9sbFRvcCA+PSBtYXhTY3JvbGwpIHtcbiAgICAgIHJldHVybiBhY3RpdmVUYXJnZXQgIT0gKGkgPSB0YXJnZXRzW3RhcmdldHMubGVuZ3RoIC0gMV0pICYmIHRoaXMuYWN0aXZhdGUoaSlcbiAgICB9XG5cbiAgICBpZiAoYWN0aXZlVGFyZ2V0ICYmIHNjcm9sbFRvcCA8IG9mZnNldHNbMF0pIHtcbiAgICAgIHRoaXMuYWN0aXZlVGFyZ2V0ID0gbnVsbFxuICAgICAgcmV0dXJuIHRoaXMuY2xlYXIoKVxuICAgIH1cblxuICAgIGZvciAoaSA9IG9mZnNldHMubGVuZ3RoOyBpLS07KSB7XG4gICAgICBhY3RpdmVUYXJnZXQgIT0gdGFyZ2V0c1tpXVxuICAgICAgICAmJiBzY3JvbGxUb3AgPj0gb2Zmc2V0c1tpXVxuICAgICAgICAmJiAob2Zmc2V0c1tpICsgMV0gPT09IHVuZGVmaW5lZCB8fCBzY3JvbGxUb3AgPCBvZmZzZXRzW2kgKyAxXSlcbiAgICAgICAgJiYgdGhpcy5hY3RpdmF0ZSh0YXJnZXRzW2ldKVxuICAgIH1cbiAgfVxuXG4gIFNjcm9sbFNweS5wcm90b3R5cGUuYWN0aXZhdGUgPSBmdW5jdGlvbiAodGFyZ2V0KSB7XG4gICAgdGhpcy5hY3RpdmVUYXJnZXQgPSB0YXJnZXRcblxuICAgIHRoaXMuY2xlYXIoKVxuXG4gICAgdmFyIHNlbGVjdG9yID0gdGhpcy5zZWxlY3RvciArXG4gICAgICAnW2RhdGEtdGFyZ2V0PVwiJyArIHRhcmdldCArICdcIl0sJyArXG4gICAgICB0aGlzLnNlbGVjdG9yICsgJ1tocmVmPVwiJyArIHRhcmdldCArICdcIl0nXG5cbiAgICB2YXIgYWN0aXZlID0gJChzZWxlY3RvcilcbiAgICAgIC5wYXJlbnRzKCdsaScpXG4gICAgICAuYWRkQ2xhc3MoJ2FjdGl2ZScpXG5cbiAgICBpZiAoYWN0aXZlLnBhcmVudCgnLmRyb3Bkb3duLW1lbnUnKS5sZW5ndGgpIHtcbiAgICAgIGFjdGl2ZSA9IGFjdGl2ZVxuICAgICAgICAuY2xvc2VzdCgnbGkuZHJvcGRvd24nKVxuICAgICAgICAuYWRkQ2xhc3MoJ2FjdGl2ZScpXG4gICAgfVxuXG4gICAgYWN0aXZlLnRyaWdnZXIoJ2FjdGl2YXRlLmJzLnNjcm9sbHNweScpXG4gIH1cblxuICBTY3JvbGxTcHkucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24gKCkge1xuICAgICQodGhpcy5zZWxlY3RvcilcbiAgICAgIC5wYXJlbnRzVW50aWwodGhpcy5vcHRpb25zLnRhcmdldCwgJy5hY3RpdmUnKVxuICAgICAgLnJlbW92ZUNsYXNzKCdhY3RpdmUnKVxuICB9XG5cblxuICAvLyBTQ1JPTExTUFkgUExVR0lOIERFRklOSVRJT05cbiAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbiAgZnVuY3Rpb24gUGx1Z2luKG9wdGlvbikge1xuICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgdmFyICR0aGlzICAgPSAkKHRoaXMpXG4gICAgICB2YXIgZGF0YSAgICA9ICR0aGlzLmRhdGEoJ2JzLnNjcm9sbHNweScpXG4gICAgICB2YXIgb3B0aW9ucyA9IHR5cGVvZiBvcHRpb24gPT0gJ29iamVjdCcgJiYgb3B0aW9uXG5cbiAgICAgIGlmICghZGF0YSkgJHRoaXMuZGF0YSgnYnMuc2Nyb2xsc3B5JywgKGRhdGEgPSBuZXcgU2Nyb2xsU3B5KHRoaXMsIG9wdGlvbnMpKSlcbiAgICAgIGlmICh0eXBlb2Ygb3B0aW9uID09ICdzdHJpbmcnKSBkYXRhW29wdGlvbl0oKVxuICAgIH0pXG4gIH1cblxuICB2YXIgb2xkID0gJC5mbi5zY3JvbGxzcHlcblxuICAkLmZuLnNjcm9sbHNweSAgICAgICAgICAgICA9IFBsdWdpblxuICAkLmZuLnNjcm9sbHNweS5Db25zdHJ1Y3RvciA9IFNjcm9sbFNweVxuXG5cbiAgLy8gU0NST0xMU1BZIE5PIENPTkZMSUNUXG4gIC8vID09PT09PT09PT09PT09PT09PT09PVxuXG4gICQuZm4uc2Nyb2xsc3B5Lm5vQ29uZmxpY3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgJC5mbi5zY3JvbGxzcHkgPSBvbGRcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cblxuICAvLyBTQ1JPTExTUFkgREFUQS1BUElcbiAgLy8gPT09PT09PT09PT09PT09PT09XG5cbiAgJCh3aW5kb3cpLm9uKCdsb2FkLmJzLnNjcm9sbHNweS5kYXRhLWFwaScsIGZ1bmN0aW9uICgpIHtcbiAgICAkKCdbZGF0YS1zcHk9XCJzY3JvbGxcIl0nKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciAkc3B5ID0gJCh0aGlzKVxuICAgICAgUGx1Z2luLmNhbGwoJHNweSwgJHNweS5kYXRhKCkpXG4gICAgfSlcbiAgfSlcblxufShqUXVlcnkpO1xuXG4vKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqIEJvb3RzdHJhcDogdGFiLmpzIHYzLjMuN1xuICogaHR0cDovL2dldGJvb3RzdHJhcC5jb20vamF2YXNjcmlwdC8jdGFic1xuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKiBDb3B5cmlnaHQgMjAxMS0yMDE2IFR3aXR0ZXIsIEluYy5cbiAqIExpY2Vuc2VkIHVuZGVyIE1JVCAoaHR0cHM6Ly9naXRodWIuY29tL3R3YnMvYm9vdHN0cmFwL2Jsb2IvbWFzdGVyL0xJQ0VOU0UpXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuXG4rZnVuY3Rpb24gKCQpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIC8vIFRBQiBDTEFTUyBERUZJTklUSU9OXG4gIC8vID09PT09PT09PT09PT09PT09PT09XG5cbiAgdmFyIFRhYiA9IGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgLy8ganNjczpkaXNhYmxlIHJlcXVpcmVEb2xsYXJCZWZvcmVqUXVlcnlBc3NpZ25tZW50XG4gICAgdGhpcy5lbGVtZW50ID0gJChlbGVtZW50KVxuICAgIC8vIGpzY3M6ZW5hYmxlIHJlcXVpcmVEb2xsYXJCZWZvcmVqUXVlcnlBc3NpZ25tZW50XG4gIH1cblxuICBUYWIuVkVSU0lPTiA9ICczLjMuNydcblxuICBUYWIuVFJBTlNJVElPTl9EVVJBVElPTiA9IDE1MFxuXG4gIFRhYi5wcm90b3R5cGUuc2hvdyA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgJHRoaXMgICAgPSB0aGlzLmVsZW1lbnRcbiAgICB2YXIgJHVsICAgICAgPSAkdGhpcy5jbG9zZXN0KCd1bDpub3QoLmRyb3Bkb3duLW1lbnUpJylcbiAgICB2YXIgc2VsZWN0b3IgPSAkdGhpcy5kYXRhKCd0YXJnZXQnKVxuXG4gICAgaWYgKCFzZWxlY3Rvcikge1xuICAgICAgc2VsZWN0b3IgPSAkdGhpcy5hdHRyKCdocmVmJylcbiAgICAgIHNlbGVjdG9yID0gc2VsZWN0b3IgJiYgc2VsZWN0b3IucmVwbGFjZSgvLiooPz0jW15cXHNdKiQpLywgJycpIC8vIHN0cmlwIGZvciBpZTdcbiAgICB9XG5cbiAgICBpZiAoJHRoaXMucGFyZW50KCdsaScpLmhhc0NsYXNzKCdhY3RpdmUnKSkgcmV0dXJuXG5cbiAgICB2YXIgJHByZXZpb3VzID0gJHVsLmZpbmQoJy5hY3RpdmU6bGFzdCBhJylcbiAgICB2YXIgaGlkZUV2ZW50ID0gJC5FdmVudCgnaGlkZS5icy50YWInLCB7XG4gICAgICByZWxhdGVkVGFyZ2V0OiAkdGhpc1swXVxuICAgIH0pXG4gICAgdmFyIHNob3dFdmVudCA9ICQuRXZlbnQoJ3Nob3cuYnMudGFiJywge1xuICAgICAgcmVsYXRlZFRhcmdldDogJHByZXZpb3VzWzBdXG4gICAgfSlcblxuICAgICRwcmV2aW91cy50cmlnZ2VyKGhpZGVFdmVudClcbiAgICAkdGhpcy50cmlnZ2VyKHNob3dFdmVudClcblxuICAgIGlmIChzaG93RXZlbnQuaXNEZWZhdWx0UHJldmVudGVkKCkgfHwgaGlkZUV2ZW50LmlzRGVmYXVsdFByZXZlbnRlZCgpKSByZXR1cm5cblxuICAgIHZhciAkdGFyZ2V0ID0gJChzZWxlY3RvcilcblxuICAgIHRoaXMuYWN0aXZhdGUoJHRoaXMuY2xvc2VzdCgnbGknKSwgJHVsKVxuICAgIHRoaXMuYWN0aXZhdGUoJHRhcmdldCwgJHRhcmdldC5wYXJlbnQoKSwgZnVuY3Rpb24gKCkge1xuICAgICAgJHByZXZpb3VzLnRyaWdnZXIoe1xuICAgICAgICB0eXBlOiAnaGlkZGVuLmJzLnRhYicsXG4gICAgICAgIHJlbGF0ZWRUYXJnZXQ6ICR0aGlzWzBdXG4gICAgICB9KVxuICAgICAgJHRoaXMudHJpZ2dlcih7XG4gICAgICAgIHR5cGU6ICdzaG93bi5icy50YWInLFxuICAgICAgICByZWxhdGVkVGFyZ2V0OiAkcHJldmlvdXNbMF1cbiAgICAgIH0pXG4gICAgfSlcbiAgfVxuXG4gIFRhYi5wcm90b3R5cGUuYWN0aXZhdGUgPSBmdW5jdGlvbiAoZWxlbWVudCwgY29udGFpbmVyLCBjYWxsYmFjaykge1xuICAgIHZhciAkYWN0aXZlICAgID0gY29udGFpbmVyLmZpbmQoJz4gLmFjdGl2ZScpXG4gICAgdmFyIHRyYW5zaXRpb24gPSBjYWxsYmFja1xuICAgICAgJiYgJC5zdXBwb3J0LnRyYW5zaXRpb25cbiAgICAgICYmICgkYWN0aXZlLmxlbmd0aCAmJiAkYWN0aXZlLmhhc0NsYXNzKCdmYWRlJykgfHwgISFjb250YWluZXIuZmluZCgnPiAuZmFkZScpLmxlbmd0aClcblxuICAgIGZ1bmN0aW9uIG5leHQoKSB7XG4gICAgICAkYWN0aXZlXG4gICAgICAgIC5yZW1vdmVDbGFzcygnYWN0aXZlJylcbiAgICAgICAgLmZpbmQoJz4gLmRyb3Bkb3duLW1lbnUgPiAuYWN0aXZlJylcbiAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpXG4gICAgICAgIC5lbmQoKVxuICAgICAgICAuZmluZCgnW2RhdGEtdG9nZ2xlPVwidGFiXCJdJylcbiAgICAgICAgICAuYXR0cignYXJpYS1leHBhbmRlZCcsIGZhbHNlKVxuXG4gICAgICBlbGVtZW50XG4gICAgICAgIC5hZGRDbGFzcygnYWN0aXZlJylcbiAgICAgICAgLmZpbmQoJ1tkYXRhLXRvZ2dsZT1cInRhYlwiXScpXG4gICAgICAgICAgLmF0dHIoJ2FyaWEtZXhwYW5kZWQnLCB0cnVlKVxuXG4gICAgICBpZiAodHJhbnNpdGlvbikge1xuICAgICAgICBlbGVtZW50WzBdLm9mZnNldFdpZHRoIC8vIHJlZmxvdyBmb3IgdHJhbnNpdGlvblxuICAgICAgICBlbGVtZW50LmFkZENsYXNzKCdpbicpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBlbGVtZW50LnJlbW92ZUNsYXNzKCdmYWRlJylcbiAgICAgIH1cblxuICAgICAgaWYgKGVsZW1lbnQucGFyZW50KCcuZHJvcGRvd24tbWVudScpLmxlbmd0aCkge1xuICAgICAgICBlbGVtZW50XG4gICAgICAgICAgLmNsb3Nlc3QoJ2xpLmRyb3Bkb3duJylcbiAgICAgICAgICAgIC5hZGRDbGFzcygnYWN0aXZlJylcbiAgICAgICAgICAuZW5kKClcbiAgICAgICAgICAuZmluZCgnW2RhdGEtdG9nZ2xlPVwidGFiXCJdJylcbiAgICAgICAgICAgIC5hdHRyKCdhcmlhLWV4cGFuZGVkJywgdHJ1ZSlcbiAgICAgIH1cblxuICAgICAgY2FsbGJhY2sgJiYgY2FsbGJhY2soKVxuICAgIH1cblxuICAgICRhY3RpdmUubGVuZ3RoICYmIHRyYW5zaXRpb24gP1xuICAgICAgJGFjdGl2ZVxuICAgICAgICAub25lKCdic1RyYW5zaXRpb25FbmQnLCBuZXh0KVxuICAgICAgICAuZW11bGF0ZVRyYW5zaXRpb25FbmQoVGFiLlRSQU5TSVRJT05fRFVSQVRJT04pIDpcbiAgICAgIG5leHQoKVxuXG4gICAgJGFjdGl2ZS5yZW1vdmVDbGFzcygnaW4nKVxuICB9XG5cblxuICAvLyBUQUIgUExVR0lOIERFRklOSVRJT05cbiAgLy8gPT09PT09PT09PT09PT09PT09PT09XG5cbiAgZnVuY3Rpb24gUGx1Z2luKG9wdGlvbikge1xuICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgdmFyICR0aGlzID0gJCh0aGlzKVxuICAgICAgdmFyIGRhdGEgID0gJHRoaXMuZGF0YSgnYnMudGFiJylcblxuICAgICAgaWYgKCFkYXRhKSAkdGhpcy5kYXRhKCdicy50YWInLCAoZGF0YSA9IG5ldyBUYWIodGhpcykpKVxuICAgICAgaWYgKHR5cGVvZiBvcHRpb24gPT0gJ3N0cmluZycpIGRhdGFbb3B0aW9uXSgpXG4gICAgfSlcbiAgfVxuXG4gIHZhciBvbGQgPSAkLmZuLnRhYlxuXG4gICQuZm4udGFiICAgICAgICAgICAgID0gUGx1Z2luXG4gICQuZm4udGFiLkNvbnN0cnVjdG9yID0gVGFiXG5cblxuICAvLyBUQUIgTk8gQ09ORkxJQ1RcbiAgLy8gPT09PT09PT09PT09PT09XG5cbiAgJC5mbi50YWIubm9Db25mbGljdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAkLmZuLnRhYiA9IG9sZFxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuXG4gIC8vIFRBQiBEQVRBLUFQSVxuICAvLyA9PT09PT09PT09PT1cblxuICB2YXIgY2xpY2tIYW5kbGVyID0gZnVuY3Rpb24gKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICBQbHVnaW4uY2FsbCgkKHRoaXMpLCAnc2hvdycpXG4gIH1cblxuICAkKGRvY3VtZW50KVxuICAgIC5vbignY2xpY2suYnMudGFiLmRhdGEtYXBpJywgJ1tkYXRhLXRvZ2dsZT1cInRhYlwiXScsIGNsaWNrSGFuZGxlcilcbiAgICAub24oJ2NsaWNrLmJzLnRhYi5kYXRhLWFwaScsICdbZGF0YS10b2dnbGU9XCJwaWxsXCJdJywgY2xpY2tIYW5kbGVyKVxuXG59KGpRdWVyeSk7XG5cbi8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICogQm9vdHN0cmFwOiBhZmZpeC5qcyB2My4zLjdcbiAqIGh0dHA6Ly9nZXRib290c3RyYXAuY29tL2phdmFzY3JpcHQvI2FmZml4XG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqIENvcHlyaWdodCAyMDExLTIwMTYgVHdpdHRlciwgSW5jLlxuICogTGljZW5zZWQgdW5kZXIgTUlUIChodHRwczovL2dpdGh1Yi5jb20vdHdicy9ib290c3RyYXAvYmxvYi9tYXN0ZXIvTElDRU5TRSlcbiAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXG5cbitmdW5jdGlvbiAoJCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgLy8gQUZGSVggQ0xBU1MgREVGSU5JVElPTlxuICAvLyA9PT09PT09PT09PT09PT09PT09PT09XG5cbiAgdmFyIEFmZml4ID0gZnVuY3Rpb24gKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICB0aGlzLm9wdGlvbnMgPSAkLmV4dGVuZCh7fSwgQWZmaXguREVGQVVMVFMsIG9wdGlvbnMpXG5cbiAgICB0aGlzLiR0YXJnZXQgPSAkKHRoaXMub3B0aW9ucy50YXJnZXQpXG4gICAgICAub24oJ3Njcm9sbC5icy5hZmZpeC5kYXRhLWFwaScsICQucHJveHkodGhpcy5jaGVja1Bvc2l0aW9uLCB0aGlzKSlcbiAgICAgIC5vbignY2xpY2suYnMuYWZmaXguZGF0YS1hcGknLCAgJC5wcm94eSh0aGlzLmNoZWNrUG9zaXRpb25XaXRoRXZlbnRMb29wLCB0aGlzKSlcblxuICAgIHRoaXMuJGVsZW1lbnQgICAgID0gJChlbGVtZW50KVxuICAgIHRoaXMuYWZmaXhlZCAgICAgID0gbnVsbFxuICAgIHRoaXMudW5waW4gICAgICAgID0gbnVsbFxuICAgIHRoaXMucGlubmVkT2Zmc2V0ID0gbnVsbFxuXG4gICAgdGhpcy5jaGVja1Bvc2l0aW9uKClcbiAgfVxuXG4gIEFmZml4LlZFUlNJT04gID0gJzMuMy43J1xuXG4gIEFmZml4LlJFU0VUICAgID0gJ2FmZml4IGFmZml4LXRvcCBhZmZpeC1ib3R0b20nXG5cbiAgQWZmaXguREVGQVVMVFMgPSB7XG4gICAgb2Zmc2V0OiAwLFxuICAgIHRhcmdldDogd2luZG93XG4gIH1cblxuICBBZmZpeC5wcm90b3R5cGUuZ2V0U3RhdGUgPSBmdW5jdGlvbiAoc2Nyb2xsSGVpZ2h0LCBoZWlnaHQsIG9mZnNldFRvcCwgb2Zmc2V0Qm90dG9tKSB7XG4gICAgdmFyIHNjcm9sbFRvcCAgICA9IHRoaXMuJHRhcmdldC5zY3JvbGxUb3AoKVxuICAgIHZhciBwb3NpdGlvbiAgICAgPSB0aGlzLiRlbGVtZW50Lm9mZnNldCgpXG4gICAgdmFyIHRhcmdldEhlaWdodCA9IHRoaXMuJHRhcmdldC5oZWlnaHQoKVxuXG4gICAgaWYgKG9mZnNldFRvcCAhPSBudWxsICYmIHRoaXMuYWZmaXhlZCA9PSAndG9wJykgcmV0dXJuIHNjcm9sbFRvcCA8IG9mZnNldFRvcCA/ICd0b3AnIDogZmFsc2VcblxuICAgIGlmICh0aGlzLmFmZml4ZWQgPT0gJ2JvdHRvbScpIHtcbiAgICAgIGlmIChvZmZzZXRUb3AgIT0gbnVsbCkgcmV0dXJuIChzY3JvbGxUb3AgKyB0aGlzLnVucGluIDw9IHBvc2l0aW9uLnRvcCkgPyBmYWxzZSA6ICdib3R0b20nXG4gICAgICByZXR1cm4gKHNjcm9sbFRvcCArIHRhcmdldEhlaWdodCA8PSBzY3JvbGxIZWlnaHQgLSBvZmZzZXRCb3R0b20pID8gZmFsc2UgOiAnYm90dG9tJ1xuICAgIH1cblxuICAgIHZhciBpbml0aWFsaXppbmcgICA9IHRoaXMuYWZmaXhlZCA9PSBudWxsXG4gICAgdmFyIGNvbGxpZGVyVG9wICAgID0gaW5pdGlhbGl6aW5nID8gc2Nyb2xsVG9wIDogcG9zaXRpb24udG9wXG4gICAgdmFyIGNvbGxpZGVySGVpZ2h0ID0gaW5pdGlhbGl6aW5nID8gdGFyZ2V0SGVpZ2h0IDogaGVpZ2h0XG5cbiAgICBpZiAob2Zmc2V0VG9wICE9IG51bGwgJiYgc2Nyb2xsVG9wIDw9IG9mZnNldFRvcCkgcmV0dXJuICd0b3AnXG4gICAgaWYgKG9mZnNldEJvdHRvbSAhPSBudWxsICYmIChjb2xsaWRlclRvcCArIGNvbGxpZGVySGVpZ2h0ID49IHNjcm9sbEhlaWdodCAtIG9mZnNldEJvdHRvbSkpIHJldHVybiAnYm90dG9tJ1xuXG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cblxuICBBZmZpeC5wcm90b3R5cGUuZ2V0UGlubmVkT2Zmc2V0ID0gZnVuY3Rpb24gKCkge1xuICAgIGlmICh0aGlzLnBpbm5lZE9mZnNldCkgcmV0dXJuIHRoaXMucGlubmVkT2Zmc2V0XG4gICAgdGhpcy4kZWxlbWVudC5yZW1vdmVDbGFzcyhBZmZpeC5SRVNFVCkuYWRkQ2xhc3MoJ2FmZml4JylcbiAgICB2YXIgc2Nyb2xsVG9wID0gdGhpcy4kdGFyZ2V0LnNjcm9sbFRvcCgpXG4gICAgdmFyIHBvc2l0aW9uICA9IHRoaXMuJGVsZW1lbnQub2Zmc2V0KClcbiAgICByZXR1cm4gKHRoaXMucGlubmVkT2Zmc2V0ID0gcG9zaXRpb24udG9wIC0gc2Nyb2xsVG9wKVxuICB9XG5cbiAgQWZmaXgucHJvdG90eXBlLmNoZWNrUG9zaXRpb25XaXRoRXZlbnRMb29wID0gZnVuY3Rpb24gKCkge1xuICAgIHNldFRpbWVvdXQoJC5wcm94eSh0aGlzLmNoZWNrUG9zaXRpb24sIHRoaXMpLCAxKVxuICB9XG5cbiAgQWZmaXgucHJvdG90eXBlLmNoZWNrUG9zaXRpb24gPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKCF0aGlzLiRlbGVtZW50LmlzKCc6dmlzaWJsZScpKSByZXR1cm5cblxuICAgIHZhciBoZWlnaHQgICAgICAgPSB0aGlzLiRlbGVtZW50LmhlaWdodCgpXG4gICAgdmFyIG9mZnNldCAgICAgICA9IHRoaXMub3B0aW9ucy5vZmZzZXRcbiAgICB2YXIgb2Zmc2V0VG9wICAgID0gb2Zmc2V0LnRvcFxuICAgIHZhciBvZmZzZXRCb3R0b20gPSBvZmZzZXQuYm90dG9tXG4gICAgdmFyIHNjcm9sbEhlaWdodCA9IE1hdGgubWF4KCQoZG9jdW1lbnQpLmhlaWdodCgpLCAkKGRvY3VtZW50LmJvZHkpLmhlaWdodCgpKVxuXG4gICAgaWYgKHR5cGVvZiBvZmZzZXQgIT0gJ29iamVjdCcpICAgICAgICAgb2Zmc2V0Qm90dG9tID0gb2Zmc2V0VG9wID0gb2Zmc2V0XG4gICAgaWYgKHR5cGVvZiBvZmZzZXRUb3AgPT0gJ2Z1bmN0aW9uJykgICAgb2Zmc2V0VG9wICAgID0gb2Zmc2V0LnRvcCh0aGlzLiRlbGVtZW50KVxuICAgIGlmICh0eXBlb2Ygb2Zmc2V0Qm90dG9tID09ICdmdW5jdGlvbicpIG9mZnNldEJvdHRvbSA9IG9mZnNldC5ib3R0b20odGhpcy4kZWxlbWVudClcblxuICAgIHZhciBhZmZpeCA9IHRoaXMuZ2V0U3RhdGUoc2Nyb2xsSGVpZ2h0LCBoZWlnaHQsIG9mZnNldFRvcCwgb2Zmc2V0Qm90dG9tKVxuXG4gICAgaWYgKHRoaXMuYWZmaXhlZCAhPSBhZmZpeCkge1xuICAgICAgaWYgKHRoaXMudW5waW4gIT0gbnVsbCkgdGhpcy4kZWxlbWVudC5jc3MoJ3RvcCcsICcnKVxuXG4gICAgICB2YXIgYWZmaXhUeXBlID0gJ2FmZml4JyArIChhZmZpeCA/ICctJyArIGFmZml4IDogJycpXG4gICAgICB2YXIgZSAgICAgICAgID0gJC5FdmVudChhZmZpeFR5cGUgKyAnLmJzLmFmZml4JylcblxuICAgICAgdGhpcy4kZWxlbWVudC50cmlnZ2VyKGUpXG5cbiAgICAgIGlmIChlLmlzRGVmYXVsdFByZXZlbnRlZCgpKSByZXR1cm5cblxuICAgICAgdGhpcy5hZmZpeGVkID0gYWZmaXhcbiAgICAgIHRoaXMudW5waW4gPSBhZmZpeCA9PSAnYm90dG9tJyA/IHRoaXMuZ2V0UGlubmVkT2Zmc2V0KCkgOiBudWxsXG5cbiAgICAgIHRoaXMuJGVsZW1lbnRcbiAgICAgICAgLnJlbW92ZUNsYXNzKEFmZml4LlJFU0VUKVxuICAgICAgICAuYWRkQ2xhc3MoYWZmaXhUeXBlKVxuICAgICAgICAudHJpZ2dlcihhZmZpeFR5cGUucmVwbGFjZSgnYWZmaXgnLCAnYWZmaXhlZCcpICsgJy5icy5hZmZpeCcpXG4gICAgfVxuXG4gICAgaWYgKGFmZml4ID09ICdib3R0b20nKSB7XG4gICAgICB0aGlzLiRlbGVtZW50Lm9mZnNldCh7XG4gICAgICAgIHRvcDogc2Nyb2xsSGVpZ2h0IC0gaGVpZ2h0IC0gb2Zmc2V0Qm90dG9tXG4gICAgICB9KVxuICAgIH1cbiAgfVxuXG5cbiAgLy8gQUZGSVggUExVR0lOIERFRklOSVRJT05cbiAgLy8gPT09PT09PT09PT09PT09PT09PT09PT1cblxuICBmdW5jdGlvbiBQbHVnaW4ob3B0aW9uKSB7XG4gICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgJHRoaXMgICA9ICQodGhpcylcbiAgICAgIHZhciBkYXRhICAgID0gJHRoaXMuZGF0YSgnYnMuYWZmaXgnKVxuICAgICAgdmFyIG9wdGlvbnMgPSB0eXBlb2Ygb3B0aW9uID09ICdvYmplY3QnICYmIG9wdGlvblxuXG4gICAgICBpZiAoIWRhdGEpICR0aGlzLmRhdGEoJ2JzLmFmZml4JywgKGRhdGEgPSBuZXcgQWZmaXgodGhpcywgb3B0aW9ucykpKVxuICAgICAgaWYgKHR5cGVvZiBvcHRpb24gPT0gJ3N0cmluZycpIGRhdGFbb3B0aW9uXSgpXG4gICAgfSlcbiAgfVxuXG4gIHZhciBvbGQgPSAkLmZuLmFmZml4XG5cbiAgJC5mbi5hZmZpeCAgICAgICAgICAgICA9IFBsdWdpblxuICAkLmZuLmFmZml4LkNvbnN0cnVjdG9yID0gQWZmaXhcblxuXG4gIC8vIEFGRklYIE5PIENPTkZMSUNUXG4gIC8vID09PT09PT09PT09PT09PT09XG5cbiAgJC5mbi5hZmZpeC5ub0NvbmZsaWN0ID0gZnVuY3Rpb24gKCkge1xuICAgICQuZm4uYWZmaXggPSBvbGRcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cblxuICAvLyBBRkZJWCBEQVRBLUFQSVxuICAvLyA9PT09PT09PT09PT09PVxuXG4gICQod2luZG93KS5vbignbG9hZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAkKCdbZGF0YS1zcHk9XCJhZmZpeFwiXScpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgdmFyICRzcHkgPSAkKHRoaXMpXG4gICAgICB2YXIgZGF0YSA9ICRzcHkuZGF0YSgpXG5cbiAgICAgIGRhdGEub2Zmc2V0ID0gZGF0YS5vZmZzZXQgfHwge31cblxuICAgICAgaWYgKGRhdGEub2Zmc2V0Qm90dG9tICE9IG51bGwpIGRhdGEub2Zmc2V0LmJvdHRvbSA9IGRhdGEub2Zmc2V0Qm90dG9tXG4gICAgICBpZiAoZGF0YS5vZmZzZXRUb3AgICAgIT0gbnVsbCkgZGF0YS5vZmZzZXQudG9wICAgID0gZGF0YS5vZmZzZXRUb3BcblxuICAgICAgUGx1Z2luLmNhbGwoJHNweSwgZGF0YSlcbiAgICB9KVxuICB9KVxuXG59KGpRdWVyeSk7XG4iLCIvLyB8LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIHwgRmxleHkgaGVhZGVyXG4vLyB8LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIHxcbi8vIHwgVGhpcyBqUXVlcnkgc2NyaXB0IGlzIHdyaXR0ZW4gYnlcbi8vIHxcbi8vIHwgTW9ydGVuIE5pc3NlblxuLy8gfCBoamVtbWVzaWRla29uZ2VuLmRrXG4vLyB8XG5cbnZhciBmbGV4eV9oZWFkZXIgPSAoZnVuY3Rpb24gKCQpIHtcbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICB2YXIgcHViID0ge30sXG4gICAgICAgICRoZWFkZXJfc3RhdGljID0gJCgnLmZsZXh5LWhlYWRlci0tc3RhdGljJyksXG4gICAgICAgICRoZWFkZXJfc3RpY2t5ID0gJCgnLmZsZXh5LWhlYWRlci0tc3RpY2t5JyksXG4gICAgICAgIG9wdGlvbnMgPSB7XG4gICAgICAgICAgICB1cGRhdGVfaW50ZXJ2YWw6IDEwMCxcbiAgICAgICAgICAgIHRvbGVyYW5jZToge1xuICAgICAgICAgICAgICAgIHVwd2FyZDogMjAsXG4gICAgICAgICAgICAgICAgZG93bndhcmQ6IDEwXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb2Zmc2V0OiBfZ2V0X29mZnNldF9mcm9tX2VsZW1lbnRzX2JvdHRvbSgkaGVhZGVyX3N0YXRpYyksXG4gICAgICAgICAgICBjbGFzc2VzOiB7XG4gICAgICAgICAgICAgICAgcGlubmVkOiBcImZsZXh5LWhlYWRlci0tcGlubmVkXCIsXG4gICAgICAgICAgICAgICAgdW5waW5uZWQ6IFwiZmxleHktaGVhZGVyLS11bnBpbm5lZFwiXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHdhc19zY3JvbGxlZCA9IGZhbHNlLFxuICAgICAgICBsYXN0X2Rpc3RhbmNlX2Zyb21fdG9wID0gMDtcblxuICAgIC8qKlxuICAgICAqIEluc3RhbnRpYXRlXG4gICAgICovXG4gICAgcHViLmluaXQgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgICAgICByZWdpc3RlckV2ZW50SGFuZGxlcnMoKTtcbiAgICAgICAgcmVnaXN0ZXJCb290RXZlbnRIYW5kbGVycygpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBSZWdpc3RlciBib290IGV2ZW50IGhhbmRsZXJzXG4gICAgICovXG4gICAgZnVuY3Rpb24gcmVnaXN0ZXJCb290RXZlbnRIYW5kbGVycygpIHtcbiAgICAgICAgJGhlYWRlcl9zdGlja3kuYWRkQ2xhc3Mob3B0aW9ucy5jbGFzc2VzLnVucGlubmVkKTtcblxuICAgICAgICBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHtcblxuICAgICAgICAgICAgaWYgKHdhc19zY3JvbGxlZCkge1xuICAgICAgICAgICAgICAgIGRvY3VtZW50X3dhc19zY3JvbGxlZCgpO1xuXG4gICAgICAgICAgICAgICAgd2FzX3Njcm9sbGVkID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIG9wdGlvbnMudXBkYXRlX2ludGVydmFsKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZWdpc3RlciBldmVudCBoYW5kbGVyc1xuICAgICAqL1xuICAgIGZ1bmN0aW9uIHJlZ2lzdGVyRXZlbnRIYW5kbGVycygpIHtcbiAgICAgICAgJCh3aW5kb3cpLnNjcm9sbChmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgd2FzX3Njcm9sbGVkID0gdHJ1ZTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IG9mZnNldCBmcm9tIGVsZW1lbnQgYm90dG9tXG4gICAgICovXG4gICAgZnVuY3Rpb24gX2dldF9vZmZzZXRfZnJvbV9lbGVtZW50c19ib3R0b20oJGVsZW1lbnQpIHtcbiAgICAgICAgdmFyIGVsZW1lbnRfaGVpZ2h0ID0gJGVsZW1lbnQub3V0ZXJIZWlnaHQodHJ1ZSksXG4gICAgICAgICAgICBlbGVtZW50X29mZnNldCA9ICRlbGVtZW50Lm9mZnNldCgpLnRvcDtcblxuICAgICAgICByZXR1cm4gKGVsZW1lbnRfaGVpZ2h0ICsgZWxlbWVudF9vZmZzZXQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERvY3VtZW50IHdhcyBzY3JvbGxlZFxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGRvY3VtZW50X3dhc19zY3JvbGxlZCgpIHtcbiAgICAgICAgdmFyIGN1cnJlbnRfZGlzdGFuY2VfZnJvbV90b3AgPSAkKHdpbmRvdykuc2Nyb2xsVG9wKCk7XG5cbiAgICAgICAgLy8gSWYgcGFzdCBvZmZzZXRcbiAgICAgICAgaWYgKGN1cnJlbnRfZGlzdGFuY2VfZnJvbV90b3AgPj0gb3B0aW9ucy5vZmZzZXQpIHtcblxuICAgICAgICAgICAgLy8gRG93bndhcmRzIHNjcm9sbFxuICAgICAgICAgICAgaWYgKGN1cnJlbnRfZGlzdGFuY2VfZnJvbV90b3AgPiBsYXN0X2Rpc3RhbmNlX2Zyb21fdG9wKSB7XG5cbiAgICAgICAgICAgICAgICAvLyBPYmV5IHRoZSBkb3dud2FyZCB0b2xlcmFuY2VcbiAgICAgICAgICAgICAgICBpZiAoTWF0aC5hYnMoY3VycmVudF9kaXN0YW5jZV9mcm9tX3RvcCAtIGxhc3RfZGlzdGFuY2VfZnJvbV90b3ApIDw9IG9wdGlvbnMudG9sZXJhbmNlLmRvd253YXJkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAkaGVhZGVyX3N0aWNreS5yZW1vdmVDbGFzcyhvcHRpb25zLmNsYXNzZXMucGlubmVkKS5hZGRDbGFzcyhvcHRpb25zLmNsYXNzZXMudW5waW5uZWQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBVcHdhcmRzIHNjcm9sbFxuICAgICAgICAgICAgZWxzZSB7XG5cbiAgICAgICAgICAgICAgICAvLyBPYmV5IHRoZSB1cHdhcmQgdG9sZXJhbmNlXG4gICAgICAgICAgICAgICAgaWYgKE1hdGguYWJzKGN1cnJlbnRfZGlzdGFuY2VfZnJvbV90b3AgLSBsYXN0X2Rpc3RhbmNlX2Zyb21fdG9wKSA8PSBvcHRpb25zLnRvbGVyYW5jZS51cHdhcmQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIFdlIGFyZSBub3Qgc2Nyb2xsZWQgcGFzdCB0aGUgZG9jdW1lbnQgd2hpY2ggaXMgcG9zc2libGUgb24gdGhlIE1hY1xuICAgICAgICAgICAgICAgIGlmICgoY3VycmVudF9kaXN0YW5jZV9mcm9tX3RvcCArICQod2luZG93KS5oZWlnaHQoKSkgPCAkKGRvY3VtZW50KS5oZWlnaHQoKSkge1xuICAgICAgICAgICAgICAgICAgICAkaGVhZGVyX3N0aWNreS5yZW1vdmVDbGFzcyhvcHRpb25zLmNsYXNzZXMudW5waW5uZWQpLmFkZENsYXNzKG9wdGlvbnMuY2xhc3Nlcy5waW5uZWQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIE5vdCBwYXN0IG9mZnNldFxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICRoZWFkZXJfc3RpY2t5LnJlbW92ZUNsYXNzKG9wdGlvbnMuY2xhc3Nlcy5waW5uZWQpLmFkZENsYXNzKG9wdGlvbnMuY2xhc3Nlcy51bnBpbm5lZCk7XG4gICAgICAgIH1cblxuICAgICAgICBsYXN0X2Rpc3RhbmNlX2Zyb21fdG9wID0gY3VycmVudF9kaXN0YW5jZV9mcm9tX3RvcDtcbiAgICB9XG5cbiAgICByZXR1cm4gcHViO1xufSkoalF1ZXJ5KTtcbiIsImpRdWVyeShmdW5jdGlvbigkKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgLy8gRmxleHkgbmF2aWdhdGlvblxuICAgIGZsZXh5X25hdmlnYXRpb24uaW5pdCgpO1xuXG4gICAgLy8gU2hvdyBkcm9wZG93bnMgb24gbW91c2VvdmVyXG4gICAgbGV0ICRoZWFkZXJzID0gJCgnLmZsZXh5LWhlYWRlcicpLFxuICAgICAgICAkZHJvcGRvd25zID0gJCgnLmZsZXh5LW5hdmlnYXRpb25fX2l0ZW0tLWRyb3Bkb3duJyk7XG5cbiAgICAkZHJvcGRvd25zXG4gICAgICAgIC5vbignbW91c2VlbnRlcicsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICBsZXQgJGVsZW1lbnQgPSAkKHRoaXMpLFxuICAgICAgICAgICAgICAgICRoZWFkZXIgPSAkZWxlbWVudC5wYXJlbnRzKCcuZmxleHktaGVhZGVyJyksXG4gICAgICAgICAgICAgICAgJGxpc3RfaXRlbXMgPSAkaGVhZGVyLmZpbmQoJy5mbGV4eS1uYXZpZ2F0aW9uX19pdGVtLS1kcm9wZG93bicpO1xuXG4gICAgICAgICAgICAkbGlzdF9pdGVtcy5hZGRDbGFzcygnaG92ZXInKTtcbiAgICAgICAgfSk7XG5cbiAgICAvLyBSZW1vdmUgZHJvcGRvd24gb24gY2xpY2sgb3V0c2lkZVxuICAgICQod2luZG93KS5vbignY2xpY2snLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICBsZXQgJGxpc3RfaXRlbXMgPSAkKCcuZmxleHktbmF2aWdhdGlvbl9faXRlbS0tZHJvcGRvd24nKTtcblxuICAgICAgICBpZiAoJGxpc3RfaXRlbXMgIT09IGV2ZW50LnRhcmdldCAmJiAhICRsaXN0X2l0ZW1zLmhhcyhldmVudC50YXJnZXQpLmxlbmd0aCkge1xuICAgICAgICAgICAgJGxpc3RfaXRlbXMucmVtb3ZlQ2xhc3MoJ2hvdmVyJyk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIEFkZCBhIFwiY2xvc2VcIiB0b2dnbGUgdG8gdGhlIGxhc3QgZHJvcGRvd24gbWVudSBpbiB0aGUgaGVhZGVyXG4gICAgJGhlYWRlcnMuZWFjaChmdW5jdGlvbihpbmRleCwgdmFsdWUpIHtcbiAgICAgICAgbGV0ICRoZWFkZXIgPSAkKHRoaXMpLFxuICAgICAgICAgICAgJGxpc3RfaXRlbSA9ICRoZWFkZXIuZmluZCgnLmZsZXh5LW5hdmlnYXRpb24gPiAuZmxleHktbmF2aWdhdGlvbl9faXRlbS0tZHJvcGRvd24nKS5sYXN0KCksXG4gICAgICAgICAgICAkZHJvcGRvd25fbWVudSA9ICRsaXN0X2l0ZW0uZmluZCgnLmZsZXh5LW5hdmlnYXRpb25fX2l0ZW1fX2Ryb3Bkb3duLW1lbnUnKTtcblxuICAgICAgICBsZXQgJGJ0biA9ICQoJzxzcGFuIC8+JylcbiAgICAgICAgICAgIC5hZGRDbGFzcygnZmxleHktbmF2aWdhdGlvbl9faXRlbV9fZHJvcGRvd24tbWVudV9fdG9nZ2xlIGljb24gZmEgZmEtY2xvc2UnKVxuICAgICAgICAgICAgLm9uKCdjbGljaycsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgbGV0ICRlbGVtZW50ID0gJCh0aGlzKSxcbiAgICAgICAgICAgICAgICAgICAgJGhlYWRlciA9ICRlbGVtZW50LnBhcmVudHMoJy5mbGV4eS1oZWFkZXInKSxcbiAgICAgICAgICAgICAgICAgICAgJGxpc3RfaXRlbXMgPSAkaGVhZGVyLmZpbmQoJy5mbGV4eS1uYXZpZ2F0aW9uX19pdGVtLS1kcm9wZG93bicpO1xuXG4gICAgICAgICAgICAgICAgJGxpc3RfaXRlbXMucmVtb3ZlQ2xhc3MoJ2hvdmVyJyk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAkZHJvcGRvd25fbWVudS5hcHBlbmQoJGJ0bik7XG4gICAgfSk7XG5cbiAgICAvLyBBcHBseSB0aGUgc2FtZSBoZWlnaHQgdG8gYWxsIGRyb3Bkb3duIG1lbnVzXG4gICAgJGhlYWRlcnMuZWFjaChmdW5jdGlvbihpbmRleCwgdmFsdWUpIHtcbiAgICAgICAgbGV0ICRoZWFkZXIgPSAkKHRoaXMpLFxuICAgICAgICAgICAgJGRyb3Bkb3duX21lbnVzID0gJGhlYWRlci5maW5kKCcuZmxleHktbmF2aWdhdGlvbl9faXRlbV9fZHJvcGRvd24tbWVudScpLFxuICAgICAgICAgICAgdGFsbGVzdF9kcm9wZG93biA9IDA7XG5cbiAgICAgICAgLy8gRmluZCB0aGUgdGFsbGVzdCBkcm9wZG93biBtZW51XG4gICAgICAgICRkcm9wZG93bl9tZW51cy5lYWNoKGZ1bmN0aW9uKGluZGV4LCB2YWx1ZSkge1xuICAgICAgICAgICAgbGV0ICRkcm9wZG93bl9tZW51ID0gJCh0aGlzKSxcbiAgICAgICAgICAgICAgICBoZWlnaHQgPSAkZHJvcGRvd25fbWVudS5vdXRlckhlaWdodCh0cnVlKTtcblxuICAgICAgICAgICAgaWYgKGhlaWdodCA+IHRhbGxlc3RfZHJvcGRvd24pIHtcbiAgICAgICAgICAgICAgICB0YWxsZXN0X2Ryb3Bkb3duID0gaGVpZ2h0O1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBBcHBseSB0aGUgdGFsbGVzdCBoZWlnaHQgdG8gYWxsIGRyb3Bkb3duIG1lbnVzXG4gICAgICAgICRkcm9wZG93bl9tZW51cy5jc3MoJ21pbi1oZWlnaHQnLCB0YWxsZXN0X2Ryb3Bkb3duKTtcbiAgICB9KTtcbn0pO1xuIiwiLyohIHNpZHIgLSB2Mi4yLjEgLSAyMDE2LTAyLTE3XG4gKiBodHRwOi8vd3d3LmJlcnJpYXJ0LmNvbS9zaWRyL1xuICogQ29weXJpZ2h0IChjKSAyMDEzLTIwMTYgQWxiZXJ0byBWYXJlbGE7IExpY2Vuc2VkIE1JVCAqL1xuXG4oZnVuY3Rpb24gKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgdmFyIGJhYmVsSGVscGVycyA9IHt9O1xuXG4gIGJhYmVsSGVscGVycy5jbGFzc0NhbGxDaGVjayA9IGZ1bmN0aW9uIChpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHtcbiAgICBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTtcbiAgICB9XG4gIH07XG5cbiAgYmFiZWxIZWxwZXJzLmNyZWF0ZUNsYXNzID0gZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldO1xuICAgICAgICBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7XG4gICAgICAgIGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTtcbiAgICAgICAgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7XG4gICAgICBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpO1xuICAgICAgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7XG4gICAgICByZXR1cm4gQ29uc3RydWN0b3I7XG4gICAgfTtcbiAgfSgpO1xuXG4gIGJhYmVsSGVscGVycztcblxuICB2YXIgc2lkclN0YXR1cyA9IHtcbiAgICBtb3Zpbmc6IGZhbHNlLFxuICAgIG9wZW5lZDogZmFsc2VcbiAgfTtcblxuICB2YXIgaGVscGVyID0ge1xuICAgIC8vIENoZWNrIGZvciB2YWxpZHMgdXJsc1xuICAgIC8vIEZyb20gOiBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzU3MTcwOTMvY2hlY2staWYtYS1qYXZhc2NyaXB0LXN0cmluZy1pcy1hbi11cmxcblxuICAgIGlzVXJsOiBmdW5jdGlvbiBpc1VybChzdHIpIHtcbiAgICAgIHZhciBwYXR0ZXJuID0gbmV3IFJlZ0V4cCgnXihodHRwcz86XFxcXC9cXFxcLyk/JyArIC8vIHByb3RvY29sXG4gICAgICAnKCgoW2EtelxcXFxkXShbYS16XFxcXGQtXSpbYS16XFxcXGRdKSopXFxcXC4/KStbYS16XXsyLH18JyArIC8vIGRvbWFpbiBuYW1lXG4gICAgICAnKChcXFxcZHsxLDN9XFxcXC4pezN9XFxcXGR7MSwzfSkpJyArIC8vIE9SIGlwICh2NCkgYWRkcmVzc1xuICAgICAgJyhcXFxcOlxcXFxkKyk/KFxcXFwvWy1hLXpcXFxcZCVfLn4rXSopKicgKyAvLyBwb3J0IGFuZCBwYXRoXG4gICAgICAnKFxcXFw/WzsmYS16XFxcXGQlXy5+Kz0tXSopPycgKyAvLyBxdWVyeSBzdHJpbmdcbiAgICAgICcoXFxcXCNbLWEtelxcXFxkX10qKT8kJywgJ2knKTsgLy8gZnJhZ21lbnQgbG9jYXRvclxuXG4gICAgICBpZiAocGF0dGVybi50ZXN0KHN0cikpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfSxcblxuXG4gICAgLy8gQWRkIHNpZHIgcHJlZml4ZXNcbiAgICBhZGRQcmVmaXhlczogZnVuY3Rpb24gYWRkUHJlZml4ZXMoJGVsZW1lbnQpIHtcbiAgICAgIHRoaXMuYWRkUHJlZml4KCRlbGVtZW50LCAnaWQnKTtcbiAgICAgIHRoaXMuYWRkUHJlZml4KCRlbGVtZW50LCAnY2xhc3MnKTtcbiAgICAgICRlbGVtZW50LnJlbW92ZUF0dHIoJ3N0eWxlJyk7XG4gICAgfSxcbiAgICBhZGRQcmVmaXg6IGZ1bmN0aW9uIGFkZFByZWZpeCgkZWxlbWVudCwgYXR0cmlidXRlKSB7XG4gICAgICB2YXIgdG9SZXBsYWNlID0gJGVsZW1lbnQuYXR0cihhdHRyaWJ1dGUpO1xuXG4gICAgICBpZiAodHlwZW9mIHRvUmVwbGFjZSA9PT0gJ3N0cmluZycgJiYgdG9SZXBsYWNlICE9PSAnJyAmJiB0b1JlcGxhY2UgIT09ICdzaWRyLWlubmVyJykge1xuICAgICAgICAkZWxlbWVudC5hdHRyKGF0dHJpYnV0ZSwgdG9SZXBsYWNlLnJlcGxhY2UoLyhbQS1aYS16MC05Xy5cXC1dKykvZywgJ3NpZHItJyArIGF0dHJpYnV0ZSArICctJDEnKSk7XG4gICAgICB9XG4gICAgfSxcblxuXG4gICAgLy8gQ2hlY2sgaWYgdHJhbnNpdGlvbnMgaXMgc3VwcG9ydGVkXG4gICAgdHJhbnNpdGlvbnM6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBib2R5ID0gZG9jdW1lbnQuYm9keSB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQsXG4gICAgICAgICAgc3R5bGUgPSBib2R5LnN0eWxlLFxuICAgICAgICAgIHN1cHBvcnRlZCA9IGZhbHNlLFxuICAgICAgICAgIHByb3BlcnR5ID0gJ3RyYW5zaXRpb24nO1xuXG4gICAgICBpZiAocHJvcGVydHkgaW4gc3R5bGUpIHtcbiAgICAgICAgc3VwcG9ydGVkID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgdmFyIHByZWZpeGVzID0gWydtb3onLCAnd2Via2l0JywgJ28nLCAnbXMnXSxcbiAgICAgICAgICAgICAgcHJlZml4ID0gdW5kZWZpbmVkLFxuICAgICAgICAgICAgICBpID0gdW5kZWZpbmVkO1xuXG4gICAgICAgICAgcHJvcGVydHkgPSBwcm9wZXJ0eS5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHByb3BlcnR5LnN1YnN0cigxKTtcbiAgICAgICAgICBzdXBwb3J0ZWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgcHJlZml4ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgcHJlZml4ID0gcHJlZml4ZXNbaV07XG4gICAgICAgICAgICAgIGlmIChwcmVmaXggKyBwcm9wZXJ0eSBpbiBzdHlsZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9KCk7XG4gICAgICAgICAgcHJvcGVydHkgPSBzdXBwb3J0ZWQgPyAnLScgKyBwcmVmaXgudG9Mb3dlckNhc2UoKSArICctJyArIHByb3BlcnR5LnRvTG93ZXJDYXNlKCkgOiBudWxsO1xuICAgICAgICB9KSgpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4ge1xuICAgICAgICBzdXBwb3J0ZWQ6IHN1cHBvcnRlZCxcbiAgICAgICAgcHJvcGVydHk6IHByb3BlcnR5XG4gICAgICB9O1xuICAgIH0oKVxuICB9O1xuXG4gIHZhciAkJDIgPSBqUXVlcnk7XG5cbiAgdmFyIGJvZHlBbmltYXRpb25DbGFzcyA9ICdzaWRyLWFuaW1hdGluZyc7XG4gIHZhciBvcGVuQWN0aW9uID0gJ29wZW4nO1xuICB2YXIgY2xvc2VBY3Rpb24gPSAnY2xvc2UnO1xuICB2YXIgdHJhbnNpdGlvbkVuZEV2ZW50ID0gJ3dlYmtpdFRyYW5zaXRpb25FbmQgb3RyYW5zaXRpb25lbmQgb1RyYW5zaXRpb25FbmQgbXNUcmFuc2l0aW9uRW5kIHRyYW5zaXRpb25lbmQnO1xuICB2YXIgTWVudSA9IGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBNZW51KG5hbWUpIHtcbiAgICAgIGJhYmVsSGVscGVycy5jbGFzc0NhbGxDaGVjayh0aGlzLCBNZW51KTtcblxuICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgIHRoaXMuaXRlbSA9ICQkMignIycgKyBuYW1lKTtcbiAgICAgIHRoaXMub3BlbkNsYXNzID0gbmFtZSA9PT0gJ3NpZHInID8gJ3NpZHItb3BlbicgOiAnc2lkci1vcGVuICcgKyBuYW1lICsgJy1vcGVuJztcbiAgICAgIHRoaXMubWVudVdpZHRoID0gdGhpcy5pdGVtLm91dGVyV2lkdGgodHJ1ZSk7XG4gICAgICB0aGlzLnNwZWVkID0gdGhpcy5pdGVtLmRhdGEoJ3NwZWVkJyk7XG4gICAgICB0aGlzLnNpZGUgPSB0aGlzLml0ZW0uZGF0YSgnc2lkZScpO1xuICAgICAgdGhpcy5kaXNwbGFjZSA9IHRoaXMuaXRlbS5kYXRhKCdkaXNwbGFjZScpO1xuICAgICAgdGhpcy50aW1pbmcgPSB0aGlzLml0ZW0uZGF0YSgndGltaW5nJyk7XG4gICAgICB0aGlzLm1ldGhvZCA9IHRoaXMuaXRlbS5kYXRhKCdtZXRob2QnKTtcbiAgICAgIHRoaXMub25PcGVuQ2FsbGJhY2sgPSB0aGlzLml0ZW0uZGF0YSgnb25PcGVuJyk7XG4gICAgICB0aGlzLm9uQ2xvc2VDYWxsYmFjayA9IHRoaXMuaXRlbS5kYXRhKCdvbkNsb3NlJyk7XG4gICAgICB0aGlzLm9uT3BlbkVuZENhbGxiYWNrID0gdGhpcy5pdGVtLmRhdGEoJ29uT3BlbkVuZCcpO1xuICAgICAgdGhpcy5vbkNsb3NlRW5kQ2FsbGJhY2sgPSB0aGlzLml0ZW0uZGF0YSgnb25DbG9zZUVuZCcpO1xuICAgICAgdGhpcy5ib2R5ID0gJCQyKHRoaXMuaXRlbS5kYXRhKCdib2R5JykpO1xuICAgIH1cblxuICAgIGJhYmVsSGVscGVycy5jcmVhdGVDbGFzcyhNZW51LCBbe1xuICAgICAga2V5OiAnZ2V0QW5pbWF0aW9uJyxcbiAgICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRBbmltYXRpb24oYWN0aW9uLCBlbGVtZW50KSB7XG4gICAgICAgIHZhciBhbmltYXRpb24gPSB7fSxcbiAgICAgICAgICAgIHByb3AgPSB0aGlzLnNpZGU7XG5cbiAgICAgICAgaWYgKGFjdGlvbiA9PT0gJ29wZW4nICYmIGVsZW1lbnQgPT09ICdib2R5Jykge1xuICAgICAgICAgIGFuaW1hdGlvbltwcm9wXSA9IHRoaXMubWVudVdpZHRoICsgJ3B4JztcbiAgICAgICAgfSBlbHNlIGlmIChhY3Rpb24gPT09ICdjbG9zZScgJiYgZWxlbWVudCA9PT0gJ21lbnUnKSB7XG4gICAgICAgICAgYW5pbWF0aW9uW3Byb3BdID0gJy0nICsgdGhpcy5tZW51V2lkdGggKyAncHgnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGFuaW1hdGlvbltwcm9wXSA9IDA7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gYW5pbWF0aW9uO1xuICAgICAgfVxuICAgIH0sIHtcbiAgICAgIGtleTogJ3ByZXBhcmVCb2R5JyxcbiAgICAgIHZhbHVlOiBmdW5jdGlvbiBwcmVwYXJlQm9keShhY3Rpb24pIHtcbiAgICAgICAgdmFyIHByb3AgPSBhY3Rpb24gPT09ICdvcGVuJyA/ICdoaWRkZW4nIDogJyc7XG5cbiAgICAgICAgLy8gUHJlcGFyZSBwYWdlIGlmIGNvbnRhaW5lciBpcyBib2R5XG4gICAgICAgIGlmICh0aGlzLmJvZHkuaXMoJ2JvZHknKSkge1xuICAgICAgICAgIHZhciAkaHRtbCA9ICQkMignaHRtbCcpLFxuICAgICAgICAgICAgICBzY3JvbGxUb3AgPSAkaHRtbC5zY3JvbGxUb3AoKTtcblxuICAgICAgICAgICRodG1sLmNzcygnb3ZlcmZsb3cteCcsIHByb3ApLnNjcm9sbFRvcChzY3JvbGxUb3ApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSwge1xuICAgICAga2V5OiAnb3BlbkJvZHknLFxuICAgICAgdmFsdWU6IGZ1bmN0aW9uIG9wZW5Cb2R5KCkge1xuICAgICAgICBpZiAodGhpcy5kaXNwbGFjZSkge1xuICAgICAgICAgIHZhciB0cmFuc2l0aW9ucyA9IGhlbHBlci50cmFuc2l0aW9ucyxcbiAgICAgICAgICAgICAgJGJvZHkgPSB0aGlzLmJvZHk7XG5cbiAgICAgICAgICBpZiAodHJhbnNpdGlvbnMuc3VwcG9ydGVkKSB7XG4gICAgICAgICAgICAkYm9keS5jc3ModHJhbnNpdGlvbnMucHJvcGVydHksIHRoaXMuc2lkZSArICcgJyArIHRoaXMuc3BlZWQgLyAxMDAwICsgJ3MgJyArIHRoaXMudGltaW5nKS5jc3ModGhpcy5zaWRlLCAwKS5jc3Moe1xuICAgICAgICAgICAgICB3aWR0aDogJGJvZHkud2lkdGgoKSxcbiAgICAgICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZSdcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgJGJvZHkuY3NzKHRoaXMuc2lkZSwgdGhpcy5tZW51V2lkdGggKyAncHgnKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdmFyIGJvZHlBbmltYXRpb24gPSB0aGlzLmdldEFuaW1hdGlvbihvcGVuQWN0aW9uLCAnYm9keScpO1xuXG4gICAgICAgICAgICAkYm9keS5jc3Moe1xuICAgICAgICAgICAgICB3aWR0aDogJGJvZHkud2lkdGgoKSxcbiAgICAgICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZSdcbiAgICAgICAgICAgIH0pLmFuaW1hdGUoYm9keUFuaW1hdGlvbiwge1xuICAgICAgICAgICAgICBxdWV1ZTogZmFsc2UsXG4gICAgICAgICAgICAgIGR1cmF0aW9uOiB0aGlzLnNwZWVkXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LCB7XG4gICAgICBrZXk6ICdvbkNsb3NlQm9keScsXG4gICAgICB2YWx1ZTogZnVuY3Rpb24gb25DbG9zZUJvZHkoKSB7XG4gICAgICAgIHZhciB0cmFuc2l0aW9ucyA9IGhlbHBlci50cmFuc2l0aW9ucyxcbiAgICAgICAgICAgIHJlc2V0U3R5bGVzID0ge1xuICAgICAgICAgIHdpZHRoOiAnJyxcbiAgICAgICAgICBwb3NpdGlvbjogJycsXG4gICAgICAgICAgcmlnaHQ6ICcnLFxuICAgICAgICAgIGxlZnQ6ICcnXG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKHRyYW5zaXRpb25zLnN1cHBvcnRlZCkge1xuICAgICAgICAgIHJlc2V0U3R5bGVzW3RyYW5zaXRpb25zLnByb3BlcnR5XSA9ICcnO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5ib2R5LmNzcyhyZXNldFN0eWxlcykudW5iaW5kKHRyYW5zaXRpb25FbmRFdmVudCk7XG4gICAgICB9XG4gICAgfSwge1xuICAgICAga2V5OiAnY2xvc2VCb2R5JyxcbiAgICAgIHZhbHVlOiBmdW5jdGlvbiBjbG9zZUJvZHkoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgaWYgKHRoaXMuZGlzcGxhY2UpIHtcbiAgICAgICAgICBpZiAoaGVscGVyLnRyYW5zaXRpb25zLnN1cHBvcnRlZCkge1xuICAgICAgICAgICAgdGhpcy5ib2R5LmNzcyh0aGlzLnNpZGUsIDApLm9uZSh0cmFuc2l0aW9uRW5kRXZlbnQsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgX3RoaXMub25DbG9zZUJvZHkoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2YXIgYm9keUFuaW1hdGlvbiA9IHRoaXMuZ2V0QW5pbWF0aW9uKGNsb3NlQWN0aW9uLCAnYm9keScpO1xuXG4gICAgICAgICAgICB0aGlzLmJvZHkuYW5pbWF0ZShib2R5QW5pbWF0aW9uLCB7XG4gICAgICAgICAgICAgIHF1ZXVlOiBmYWxzZSxcbiAgICAgICAgICAgICAgZHVyYXRpb246IHRoaXMuc3BlZWQsXG4gICAgICAgICAgICAgIGNvbXBsZXRlOiBmdW5jdGlvbiBjb21wbGV0ZSgpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5vbkNsb3NlQm9keSgpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LCB7XG4gICAgICBrZXk6ICdtb3ZlQm9keScsXG4gICAgICB2YWx1ZTogZnVuY3Rpb24gbW92ZUJvZHkoYWN0aW9uKSB7XG4gICAgICAgIGlmIChhY3Rpb24gPT09IG9wZW5BY3Rpb24pIHtcbiAgICAgICAgICB0aGlzLm9wZW5Cb2R5KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5jbG9zZUJvZHkoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sIHtcbiAgICAgIGtleTogJ29uT3Blbk1lbnUnLFxuICAgICAgdmFsdWU6IGZ1bmN0aW9uIG9uT3Blbk1lbnUoY2FsbGJhY2spIHtcbiAgICAgICAgdmFyIG5hbWUgPSB0aGlzLm5hbWU7XG5cbiAgICAgICAgc2lkclN0YXR1cy5tb3ZpbmcgPSBmYWxzZTtcbiAgICAgICAgc2lkclN0YXR1cy5vcGVuZWQgPSBuYW1lO1xuXG4gICAgICAgIHRoaXMuaXRlbS51bmJpbmQodHJhbnNpdGlvbkVuZEV2ZW50KTtcblxuICAgICAgICB0aGlzLmJvZHkucmVtb3ZlQ2xhc3MoYm9keUFuaW1hdGlvbkNsYXNzKS5hZGRDbGFzcyh0aGlzLm9wZW5DbGFzcyk7XG5cbiAgICAgICAgdGhpcy5vbk9wZW5FbmRDYWxsYmFjaygpO1xuXG4gICAgICAgIGlmICh0eXBlb2YgY2FsbGJhY2sgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICBjYWxsYmFjayhuYW1lKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sIHtcbiAgICAgIGtleTogJ29wZW5NZW51JyxcbiAgICAgIHZhbHVlOiBmdW5jdGlvbiBvcGVuTWVudShjYWxsYmFjaykge1xuICAgICAgICB2YXIgX3RoaXMyID0gdGhpcztcblxuICAgICAgICB2YXIgJGl0ZW0gPSB0aGlzLml0ZW07XG5cbiAgICAgICAgaWYgKGhlbHBlci50cmFuc2l0aW9ucy5zdXBwb3J0ZWQpIHtcbiAgICAgICAgICAkaXRlbS5jc3ModGhpcy5zaWRlLCAwKS5vbmUodHJhbnNpdGlvbkVuZEV2ZW50LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBfdGhpczIub25PcGVuTWVudShjYWxsYmFjayk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdmFyIG1lbnVBbmltYXRpb24gPSB0aGlzLmdldEFuaW1hdGlvbihvcGVuQWN0aW9uLCAnbWVudScpO1xuXG4gICAgICAgICAgJGl0ZW0uY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJykuYW5pbWF0ZShtZW51QW5pbWF0aW9uLCB7XG4gICAgICAgICAgICBxdWV1ZTogZmFsc2UsXG4gICAgICAgICAgICBkdXJhdGlvbjogdGhpcy5zcGVlZCxcbiAgICAgICAgICAgIGNvbXBsZXRlOiBmdW5jdGlvbiBjb21wbGV0ZSgpIHtcbiAgICAgICAgICAgICAgX3RoaXMyLm9uT3Blbk1lbnUoY2FsbGJhY2spO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSwge1xuICAgICAga2V5OiAnb25DbG9zZU1lbnUnLFxuICAgICAgdmFsdWU6IGZ1bmN0aW9uIG9uQ2xvc2VNZW51KGNhbGxiYWNrKSB7XG4gICAgICAgIHRoaXMuaXRlbS5jc3Moe1xuICAgICAgICAgIGxlZnQ6ICcnLFxuICAgICAgICAgIHJpZ2h0OiAnJ1xuICAgICAgICB9KS51bmJpbmQodHJhbnNpdGlvbkVuZEV2ZW50KTtcbiAgICAgICAgJCQyKCdodG1sJykuY3NzKCdvdmVyZmxvdy14JywgJycpO1xuXG4gICAgICAgIHNpZHJTdGF0dXMubW92aW5nID0gZmFsc2U7XG4gICAgICAgIHNpZHJTdGF0dXMub3BlbmVkID0gZmFsc2U7XG5cbiAgICAgICAgdGhpcy5ib2R5LnJlbW92ZUNsYXNzKGJvZHlBbmltYXRpb25DbGFzcykucmVtb3ZlQ2xhc3ModGhpcy5vcGVuQ2xhc3MpO1xuXG4gICAgICAgIHRoaXMub25DbG9zZUVuZENhbGxiYWNrKCk7XG5cbiAgICAgICAgLy8gQ2FsbGJhY2tcbiAgICAgICAgaWYgKHR5cGVvZiBjYWxsYmFjayA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIGNhbGxiYWNrKG5hbWUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSwge1xuICAgICAga2V5OiAnY2xvc2VNZW51JyxcbiAgICAgIHZhbHVlOiBmdW5jdGlvbiBjbG9zZU1lbnUoY2FsbGJhY2spIHtcbiAgICAgICAgdmFyIF90aGlzMyA9IHRoaXM7XG5cbiAgICAgICAgdmFyIGl0ZW0gPSB0aGlzLml0ZW07XG5cbiAgICAgICAgaWYgKGhlbHBlci50cmFuc2l0aW9ucy5zdXBwb3J0ZWQpIHtcbiAgICAgICAgICBpdGVtLmNzcyh0aGlzLnNpZGUsICcnKS5vbmUodHJhbnNpdGlvbkVuZEV2ZW50LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBfdGhpczMub25DbG9zZU1lbnUoY2FsbGJhY2spO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHZhciBtZW51QW5pbWF0aW9uID0gdGhpcy5nZXRBbmltYXRpb24oY2xvc2VBY3Rpb24sICdtZW51Jyk7XG5cbiAgICAgICAgICBpdGVtLmFuaW1hdGUobWVudUFuaW1hdGlvbiwge1xuICAgICAgICAgICAgcXVldWU6IGZhbHNlLFxuICAgICAgICAgICAgZHVyYXRpb246IHRoaXMuc3BlZWQsXG4gICAgICAgICAgICBjb21wbGV0ZTogZnVuY3Rpb24gY29tcGxldGUoKSB7XG4gICAgICAgICAgICAgIF90aGlzMy5vbkNsb3NlTWVudSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSwge1xuICAgICAga2V5OiAnbW92ZU1lbnUnLFxuICAgICAgdmFsdWU6IGZ1bmN0aW9uIG1vdmVNZW51KGFjdGlvbiwgY2FsbGJhY2spIHtcbiAgICAgICAgdGhpcy5ib2R5LmFkZENsYXNzKGJvZHlBbmltYXRpb25DbGFzcyk7XG5cbiAgICAgICAgaWYgKGFjdGlvbiA9PT0gb3BlbkFjdGlvbikge1xuICAgICAgICAgIHRoaXMub3Blbk1lbnUoY2FsbGJhY2spO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuY2xvc2VNZW51KGNhbGxiYWNrKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sIHtcbiAgICAgIGtleTogJ21vdmUnLFxuICAgICAgdmFsdWU6IGZ1bmN0aW9uIG1vdmUoYWN0aW9uLCBjYWxsYmFjaykge1xuICAgICAgICAvLyBMb2NrIHNpZHJcbiAgICAgICAgc2lkclN0YXR1cy5tb3ZpbmcgPSB0cnVlO1xuXG4gICAgICAgIHRoaXMucHJlcGFyZUJvZHkoYWN0aW9uKTtcbiAgICAgICAgdGhpcy5tb3ZlQm9keShhY3Rpb24pO1xuICAgICAgICB0aGlzLm1vdmVNZW51KGFjdGlvbiwgY2FsbGJhY2spO1xuICAgICAgfVxuICAgIH0sIHtcbiAgICAgIGtleTogJ29wZW4nLFxuICAgICAgdmFsdWU6IGZ1bmN0aW9uIG9wZW4oY2FsbGJhY2spIHtcbiAgICAgICAgdmFyIF90aGlzNCA9IHRoaXM7XG5cbiAgICAgICAgLy8gQ2hlY2sgaWYgaXMgYWxyZWFkeSBvcGVuZWQgb3IgbW92aW5nXG4gICAgICAgIGlmIChzaWRyU3RhdHVzLm9wZW5lZCA9PT0gdGhpcy5uYW1lIHx8IHNpZHJTdGF0dXMubW92aW5nKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gSWYgYW5vdGhlciBtZW51IG9wZW5lZCBjbG9zZSBmaXJzdFxuICAgICAgICBpZiAoc2lkclN0YXR1cy5vcGVuZWQgIT09IGZhbHNlKSB7XG4gICAgICAgICAgdmFyIGFscmVhZHlPcGVuZWRNZW51ID0gbmV3IE1lbnUoc2lkclN0YXR1cy5vcGVuZWQpO1xuXG4gICAgICAgICAgYWxyZWFkeU9wZW5lZE1lbnUuY2xvc2UoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgX3RoaXM0Lm9wZW4oY2FsbGJhY2spO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5tb3ZlKCdvcGVuJywgY2FsbGJhY2spO1xuXG4gICAgICAgIC8vIG9uT3BlbiBjYWxsYmFja1xuICAgICAgICB0aGlzLm9uT3BlbkNhbGxiYWNrKCk7XG4gICAgICB9XG4gICAgfSwge1xuICAgICAga2V5OiAnY2xvc2UnLFxuICAgICAgdmFsdWU6IGZ1bmN0aW9uIGNsb3NlKGNhbGxiYWNrKSB7XG4gICAgICAgIC8vIENoZWNrIGlmIGlzIGFscmVhZHkgY2xvc2VkIG9yIG1vdmluZ1xuICAgICAgICBpZiAoc2lkclN0YXR1cy5vcGVuZWQgIT09IHRoaXMubmFtZSB8fCBzaWRyU3RhdHVzLm1vdmluZykge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMubW92ZSgnY2xvc2UnLCBjYWxsYmFjayk7XG5cbiAgICAgICAgLy8gb25DbG9zZSBjYWxsYmFja1xuICAgICAgICB0aGlzLm9uQ2xvc2VDYWxsYmFjaygpO1xuICAgICAgfVxuICAgIH0sIHtcbiAgICAgIGtleTogJ3RvZ2dsZScsXG4gICAgICB2YWx1ZTogZnVuY3Rpb24gdG9nZ2xlKGNhbGxiYWNrKSB7XG4gICAgICAgIGlmIChzaWRyU3RhdHVzLm9wZW5lZCA9PT0gdGhpcy5uYW1lKSB7XG4gICAgICAgICAgdGhpcy5jbG9zZShjYWxsYmFjayk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5vcGVuKGNhbGxiYWNrKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1dKTtcbiAgICByZXR1cm4gTWVudTtcbiAgfSgpO1xuXG4gIHZhciAkJDEgPSBqUXVlcnk7XG5cbiAgZnVuY3Rpb24gZXhlY3V0ZShhY3Rpb24sIG5hbWUsIGNhbGxiYWNrKSB7XG4gICAgdmFyIHNpZHIgPSBuZXcgTWVudShuYW1lKTtcblxuICAgIHN3aXRjaCAoYWN0aW9uKSB7XG4gICAgICBjYXNlICdvcGVuJzpcbiAgICAgICAgc2lkci5vcGVuKGNhbGxiYWNrKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdjbG9zZSc6XG4gICAgICAgIHNpZHIuY2xvc2UoY2FsbGJhY2spO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3RvZ2dsZSc6XG4gICAgICAgIHNpZHIudG9nZ2xlKGNhbGxiYWNrKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICAkJDEuZXJyb3IoJ01ldGhvZCAnICsgYWN0aW9uICsgJyBkb2VzIG5vdCBleGlzdCBvbiBqUXVlcnkuc2lkcicpO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICB2YXIgaTtcbiAgdmFyICQgPSBqUXVlcnk7XG4gIHZhciBwdWJsaWNNZXRob2RzID0gWydvcGVuJywgJ2Nsb3NlJywgJ3RvZ2dsZSddO1xuICB2YXIgbWV0aG9kTmFtZTtcbiAgdmFyIG1ldGhvZHMgPSB7fTtcbiAgdmFyIGdldE1ldGhvZCA9IGZ1bmN0aW9uIGdldE1ldGhvZChtZXRob2ROYW1lKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChuYW1lLCBjYWxsYmFjaykge1xuICAgICAgLy8gQ2hlY2sgYXJndW1lbnRzXG4gICAgICBpZiAodHlwZW9mIG5hbWUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgY2FsbGJhY2sgPSBuYW1lO1xuICAgICAgICBuYW1lID0gJ3NpZHInO1xuICAgICAgfSBlbHNlIGlmICghbmFtZSkge1xuICAgICAgICBuYW1lID0gJ3NpZHInO1xuICAgICAgfVxuXG4gICAgICBleGVjdXRlKG1ldGhvZE5hbWUsIG5hbWUsIGNhbGxiYWNrKTtcbiAgICB9O1xuICB9O1xuICBmb3IgKGkgPSAwOyBpIDwgcHVibGljTWV0aG9kcy5sZW5ndGg7IGkrKykge1xuICAgIG1ldGhvZE5hbWUgPSBwdWJsaWNNZXRob2RzW2ldO1xuICAgIG1ldGhvZHNbbWV0aG9kTmFtZV0gPSBnZXRNZXRob2QobWV0aG9kTmFtZSk7XG4gIH1cblxuICBmdW5jdGlvbiBzaWRyKG1ldGhvZCkge1xuICAgIGlmIChtZXRob2QgPT09ICdzdGF0dXMnKSB7XG4gICAgICByZXR1cm4gc2lkclN0YXR1cztcbiAgICB9IGVsc2UgaWYgKG1ldGhvZHNbbWV0aG9kXSkge1xuICAgICAgcmV0dXJuIG1ldGhvZHNbbWV0aG9kXS5hcHBseSh0aGlzLCBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBtZXRob2QgPT09ICdmdW5jdGlvbicgfHwgdHlwZW9mIG1ldGhvZCA9PT0gJ3N0cmluZycgfHwgIW1ldGhvZCkge1xuICAgICAgcmV0dXJuIG1ldGhvZHMudG9nZ2xlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICQuZXJyb3IoJ01ldGhvZCAnICsgbWV0aG9kICsgJyBkb2VzIG5vdCBleGlzdCBvbiBqUXVlcnkuc2lkcicpO1xuICAgIH1cbiAgfVxuXG4gIHZhciAkJDMgPSBqUXVlcnk7XG5cbiAgZnVuY3Rpb24gZmlsbENvbnRlbnQoJHNpZGVNZW51LCBzZXR0aW5ncykge1xuICAgIC8vIFRoZSBtZW51IGNvbnRlbnRcbiAgICBpZiAodHlwZW9mIHNldHRpbmdzLnNvdXJjZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdmFyIG5ld0NvbnRlbnQgPSBzZXR0aW5ncy5zb3VyY2UobmFtZSk7XG5cbiAgICAgICRzaWRlTWVudS5odG1sKG5ld0NvbnRlbnQpO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIHNldHRpbmdzLnNvdXJjZSA9PT0gJ3N0cmluZycgJiYgaGVscGVyLmlzVXJsKHNldHRpbmdzLnNvdXJjZSkpIHtcbiAgICAgICQkMy5nZXQoc2V0dGluZ3Muc291cmNlLCBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAkc2lkZU1lbnUuaHRtbChkYXRhKTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIHNldHRpbmdzLnNvdXJjZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHZhciBodG1sQ29udGVudCA9ICcnLFxuICAgICAgICAgIHNlbGVjdG9ycyA9IHNldHRpbmdzLnNvdXJjZS5zcGxpdCgnLCcpO1xuXG4gICAgICAkJDMuZWFjaChzZWxlY3RvcnMsIGZ1bmN0aW9uIChpbmRleCwgZWxlbWVudCkge1xuICAgICAgICBodG1sQ29udGVudCArPSAnPGRpdiBjbGFzcz1cInNpZHItaW5uZXJcIj4nICsgJCQzKGVsZW1lbnQpLmh0bWwoKSArICc8L2Rpdj4nO1xuICAgICAgfSk7XG5cbiAgICAgIC8vIFJlbmFtaW5nIGlkcyBhbmQgY2xhc3Nlc1xuICAgICAgaWYgKHNldHRpbmdzLnJlbmFtaW5nKSB7XG4gICAgICAgIHZhciAkaHRtbENvbnRlbnQgPSAkJDMoJzxkaXYgLz4nKS5odG1sKGh0bWxDb250ZW50KTtcblxuICAgICAgICAkaHRtbENvbnRlbnQuZmluZCgnKicpLmVhY2goZnVuY3Rpb24gKGluZGV4LCBlbGVtZW50KSB7XG4gICAgICAgICAgdmFyICRlbGVtZW50ID0gJCQzKGVsZW1lbnQpO1xuXG4gICAgICAgICAgaGVscGVyLmFkZFByZWZpeGVzKCRlbGVtZW50KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGh0bWxDb250ZW50ID0gJGh0bWxDb250ZW50Lmh0bWwoKTtcbiAgICAgIH1cblxuICAgICAgJHNpZGVNZW51Lmh0bWwoaHRtbENvbnRlbnQpO1xuICAgIH0gZWxzZSBpZiAoc2V0dGluZ3Muc291cmNlICE9PSBudWxsKSB7XG4gICAgICAkJDMuZXJyb3IoJ0ludmFsaWQgU2lkciBTb3VyY2UnKTtcbiAgICB9XG5cbiAgICByZXR1cm4gJHNpZGVNZW51O1xuICB9XG5cbiAgZnVuY3Rpb24gZm5TaWRyKG9wdGlvbnMpIHtcbiAgICB2YXIgdHJhbnNpdGlvbnMgPSBoZWxwZXIudHJhbnNpdGlvbnMsXG4gICAgICAgIHNldHRpbmdzID0gJCQzLmV4dGVuZCh7XG4gICAgICBuYW1lOiAnc2lkcicsIC8vIE5hbWUgZm9yIHRoZSAnc2lkcidcbiAgICAgIHNwZWVkOiAyMDAsIC8vIEFjY2VwdHMgc3RhbmRhcmQgalF1ZXJ5IGVmZmVjdHMgc3BlZWRzIChpLmUuIGZhc3QsIG5vcm1hbCBvciBtaWxsaXNlY29uZHMpXG4gICAgICBzaWRlOiAnbGVmdCcsIC8vIEFjY2VwdHMgJ2xlZnQnIG9yICdyaWdodCdcbiAgICAgIHNvdXJjZTogbnVsbCwgLy8gT3ZlcnJpZGUgdGhlIHNvdXJjZSBvZiB0aGUgY29udGVudC5cbiAgICAgIHJlbmFtaW5nOiB0cnVlLCAvLyBUaGUgaWRzIGFuZCBjbGFzc2VzIHdpbGwgYmUgcHJlcGVuZGVkIHdpdGggYSBwcmVmaXggd2hlbiBsb2FkaW5nIGV4aXN0ZW50IGNvbnRlbnRcbiAgICAgIGJvZHk6ICdib2R5JywgLy8gUGFnZSBjb250YWluZXIgc2VsZWN0b3IsXG4gICAgICBkaXNwbGFjZTogdHJ1ZSwgLy8gRGlzcGxhY2UgdGhlIGJvZHkgY29udGVudCBvciBub3RcbiAgICAgIHRpbWluZzogJ2Vhc2UnLCAvLyBUaW1pbmcgZnVuY3Rpb24gZm9yIENTUyB0cmFuc2l0aW9uc1xuICAgICAgbWV0aG9kOiAndG9nZ2xlJywgLy8gVGhlIG1ldGhvZCB0byBjYWxsIHdoZW4gZWxlbWVudCBpcyBjbGlja2VkXG4gICAgICBiaW5kOiAndG91Y2hzdGFydCBjbGljaycsIC8vIFRoZSBldmVudChzKSB0byB0cmlnZ2VyIHRoZSBtZW51XG4gICAgICBvbk9wZW46IGZ1bmN0aW9uIG9uT3BlbigpIHt9LFxuICAgICAgLy8gQ2FsbGJhY2sgd2hlbiBzaWRyIHN0YXJ0IG9wZW5pbmdcbiAgICAgIG9uQ2xvc2U6IGZ1bmN0aW9uIG9uQ2xvc2UoKSB7fSxcbiAgICAgIC8vIENhbGxiYWNrIHdoZW4gc2lkciBzdGFydCBjbG9zaW5nXG4gICAgICBvbk9wZW5FbmQ6IGZ1bmN0aW9uIG9uT3BlbkVuZCgpIHt9LFxuICAgICAgLy8gQ2FsbGJhY2sgd2hlbiBzaWRyIGVuZCBvcGVuaW5nXG4gICAgICBvbkNsb3NlRW5kOiBmdW5jdGlvbiBvbkNsb3NlRW5kKCkge30gLy8gQ2FsbGJhY2sgd2hlbiBzaWRyIGVuZCBjbG9zaW5nXG5cbiAgICB9LCBvcHRpb25zKSxcbiAgICAgICAgbmFtZSA9IHNldHRpbmdzLm5hbWUsXG4gICAgICAgICRzaWRlTWVudSA9ICQkMygnIycgKyBuYW1lKTtcblxuICAgIC8vIElmIHRoZSBzaWRlIG1lbnUgZG8gbm90IGV4aXN0IGNyZWF0ZSBpdFxuICAgIGlmICgkc2lkZU1lbnUubGVuZ3RoID09PSAwKSB7XG4gICAgICAkc2lkZU1lbnUgPSAkJDMoJzxkaXYgLz4nKS5hdHRyKCdpZCcsIG5hbWUpLmFwcGVuZFRvKCQkMygnYm9keScpKTtcbiAgICB9XG5cbiAgICAvLyBBZGQgdHJhbnNpdGlvbiB0byBtZW51IGlmIGFyZSBzdXBwb3J0ZWRcbiAgICBpZiAodHJhbnNpdGlvbnMuc3VwcG9ydGVkKSB7XG4gICAgICAkc2lkZU1lbnUuY3NzKHRyYW5zaXRpb25zLnByb3BlcnR5LCBzZXR0aW5ncy5zaWRlICsgJyAnICsgc2V0dGluZ3Muc3BlZWQgLyAxMDAwICsgJ3MgJyArIHNldHRpbmdzLnRpbWluZyk7XG4gICAgfVxuXG4gICAgLy8gQWRkaW5nIHN0eWxlcyBhbmQgb3B0aW9uc1xuICAgICRzaWRlTWVudS5hZGRDbGFzcygnc2lkcicpLmFkZENsYXNzKHNldHRpbmdzLnNpZGUpLmRhdGEoe1xuICAgICAgc3BlZWQ6IHNldHRpbmdzLnNwZWVkLFxuICAgICAgc2lkZTogc2V0dGluZ3Muc2lkZSxcbiAgICAgIGJvZHk6IHNldHRpbmdzLmJvZHksXG4gICAgICBkaXNwbGFjZTogc2V0dGluZ3MuZGlzcGxhY2UsXG4gICAgICB0aW1pbmc6IHNldHRpbmdzLnRpbWluZyxcbiAgICAgIG1ldGhvZDogc2V0dGluZ3MubWV0aG9kLFxuICAgICAgb25PcGVuOiBzZXR0aW5ncy5vbk9wZW4sXG4gICAgICBvbkNsb3NlOiBzZXR0aW5ncy5vbkNsb3NlLFxuICAgICAgb25PcGVuRW5kOiBzZXR0aW5ncy5vbk9wZW5FbmQsXG4gICAgICBvbkNsb3NlRW5kOiBzZXR0aW5ncy5vbkNsb3NlRW5kXG4gICAgfSk7XG5cbiAgICAkc2lkZU1lbnUgPSBmaWxsQ29udGVudCgkc2lkZU1lbnUsIHNldHRpbmdzKTtcblxuICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgdmFyICR0aGlzID0gJCQzKHRoaXMpLFxuICAgICAgICAgIGRhdGEgPSAkdGhpcy5kYXRhKCdzaWRyJyksXG4gICAgICAgICAgZmxhZyA9IGZhbHNlO1xuXG4gICAgICAvLyBJZiB0aGUgcGx1Z2luIGhhc24ndCBiZWVuIGluaXRpYWxpemVkIHlldFxuICAgICAgaWYgKCFkYXRhKSB7XG4gICAgICAgIHNpZHJTdGF0dXMubW92aW5nID0gZmFsc2U7XG4gICAgICAgIHNpZHJTdGF0dXMub3BlbmVkID0gZmFsc2U7XG5cbiAgICAgICAgJHRoaXMuZGF0YSgnc2lkcicsIG5hbWUpO1xuXG4gICAgICAgICR0aGlzLmJpbmQoc2V0dGluZ3MuYmluZCwgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgIGlmICghZmxhZykge1xuICAgICAgICAgICAgZmxhZyA9IHRydWU7XG4gICAgICAgICAgICBzaWRyKHNldHRpbmdzLm1ldGhvZCwgbmFtZSk7XG5cbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICBmbGFnID0gZmFsc2U7XG4gICAgICAgICAgICB9LCAxMDApO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBqUXVlcnkuc2lkciA9IHNpZHI7XG4gIGpRdWVyeS5mbi5zaWRyID0gZm5TaWRyO1xuXG59KCkpOyIsIiFmdW5jdGlvbihlKXt2YXIgdDtlLmZuLnNsaW5reT1mdW5jdGlvbihhKXt2YXIgcz1lLmV4dGVuZCh7bGFiZWw6XCJCYWNrXCIsdGl0bGU6ITEsc3BlZWQ6MzAwLHJlc2l6ZTohMH0sYSksaT1lKHRoaXMpLG49aS5jaGlsZHJlbigpLmZpcnN0KCk7aS5hZGRDbGFzcyhcInNsaW5reS1tZW51XCIpO3ZhciByPWZ1bmN0aW9uKGUsdCl7dmFyIGE9TWF0aC5yb3VuZChwYXJzZUludChuLmdldCgwKS5zdHlsZS5sZWZ0KSl8fDA7bi5jc3MoXCJsZWZ0XCIsYS0xMDAqZStcIiVcIiksXCJmdW5jdGlvblwiPT10eXBlb2YgdCYmc2V0VGltZW91dCh0LHMuc3BlZWQpfSxsPWZ1bmN0aW9uKGUpe2kuaGVpZ2h0KGUub3V0ZXJIZWlnaHQoKSl9LGQ9ZnVuY3Rpb24oZSl7aS5jc3MoXCJ0cmFuc2l0aW9uLWR1cmF0aW9uXCIsZStcIm1zXCIpLG4uY3NzKFwidHJhbnNpdGlvbi1kdXJhdGlvblwiLGUrXCJtc1wiKX07aWYoZChzLnNwZWVkKSxlKFwiYSArIHVsXCIsaSkucHJldigpLmFkZENsYXNzKFwibmV4dFwiKSxlKFwibGkgPiB1bFwiLGkpLnByZXBlbmQoJzxsaSBjbGFzcz1cImhlYWRlclwiPicpLHMudGl0bGU9PT0hMCYmZShcImxpID4gdWxcIixpKS5lYWNoKGZ1bmN0aW9uKCl7dmFyIHQ9ZSh0aGlzKS5wYXJlbnQoKS5maW5kKFwiYVwiKS5maXJzdCgpLnRleHQoKSxhPWUoXCI8aDI+XCIpLnRleHQodCk7ZShcIj4gLmhlYWRlclwiLHRoaXMpLmFwcGVuZChhKX0pLHMudGl0bGV8fHMubGFiZWwhPT0hMCl7dmFyIG89ZShcIjxhPlwiKS50ZXh0KHMubGFiZWwpLnByb3AoXCJocmVmXCIsXCIjXCIpLmFkZENsYXNzKFwiYmFja1wiKTtlKFwiLmhlYWRlclwiLGkpLmFwcGVuZChvKX1lbHNlIGUoXCJsaSA+IHVsXCIsaSkuZWFjaChmdW5jdGlvbigpe3ZhciB0PWUodGhpcykucGFyZW50KCkuZmluZChcImFcIikuZmlyc3QoKS50ZXh0KCksYT1lKFwiPGE+XCIpLnRleHQodCkucHJvcChcImhyZWZcIixcIiNcIikuYWRkQ2xhc3MoXCJiYWNrXCIpO2UoXCI+IC5oZWFkZXJcIix0aGlzKS5hcHBlbmQoYSl9KTtlKFwiYVwiLGkpLm9uKFwiY2xpY2tcIixmdW5jdGlvbihhKXtpZighKHQrcy5zcGVlZD5EYXRlLm5vdygpKSl7dD1EYXRlLm5vdygpO3ZhciBuPWUodGhpcyk7LyMvLnRlc3QodGhpcy5ocmVmKSYmYS5wcmV2ZW50RGVmYXVsdCgpLG4uaGFzQ2xhc3MoXCJuZXh0XCIpPyhpLmZpbmQoXCIuYWN0aXZlXCIpLnJlbW92ZUNsYXNzKFwiYWN0aXZlXCIpLG4ubmV4dCgpLnNob3coKS5hZGRDbGFzcyhcImFjdGl2ZVwiKSxyKDEpLHMucmVzaXplJiZsKG4ubmV4dCgpKSk6bi5oYXNDbGFzcyhcImJhY2tcIikmJihyKC0xLGZ1bmN0aW9uKCl7aS5maW5kKFwiLmFjdGl2ZVwiKS5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKSxuLnBhcmVudCgpLnBhcmVudCgpLmhpZGUoKS5wYXJlbnRzVW50aWwoaSxcInVsXCIpLmZpcnN0KCkuYWRkQ2xhc3MoXCJhY3RpdmVcIil9KSxzLnJlc2l6ZSYmbChuLnBhcmVudCgpLnBhcmVudCgpLnBhcmVudHNVbnRpbChpLFwidWxcIikpKX19KSx0aGlzLmp1bXA9ZnVuY3Rpb24odCxhKXt0PWUodCk7dmFyIG49aS5maW5kKFwiLmFjdGl2ZVwiKTtuPW4ubGVuZ3RoPjA/bi5wYXJlbnRzVW50aWwoaSxcInVsXCIpLmxlbmd0aDowLGkuZmluZChcInVsXCIpLnJlbW92ZUNsYXNzKFwiYWN0aXZlXCIpLmhpZGUoKTt2YXIgbz10LnBhcmVudHNVbnRpbChpLFwidWxcIik7by5zaG93KCksdC5zaG93KCkuYWRkQ2xhc3MoXCJhY3RpdmVcIiksYT09PSExJiZkKDApLHIoby5sZW5ndGgtbikscy5yZXNpemUmJmwodCksYT09PSExJiZkKHMuc3BlZWQpfSx0aGlzLmhvbWU9ZnVuY3Rpb24odCl7dD09PSExJiZkKDApO3ZhciBhPWkuZmluZChcIi5hY3RpdmVcIiksbj1hLnBhcmVudHNVbnRpbChpLFwibGlcIikubGVuZ3RoO24+MCYmKHIoLW4sZnVuY3Rpb24oKXthLnJlbW92ZUNsYXNzKFwiYWN0aXZlXCIpfSkscy5yZXNpemUmJmwoZShhLnBhcmVudHNVbnRpbChpLFwibGlcIikuZ2V0KG4tMSkpLnBhcmVudCgpKSksdD09PSExJiZkKHMuc3BlZWQpfSx0aGlzLmRlc3Ryb3k9ZnVuY3Rpb24oKXtlKFwiLmhlYWRlclwiLGkpLnJlbW92ZSgpLGUoXCJhXCIsaSkucmVtb3ZlQ2xhc3MoXCJuZXh0XCIpLm9mZihcImNsaWNrXCIpLGkucmVtb3ZlQ2xhc3MoXCJzbGlua3ktbWVudVwiKS5jc3MoXCJ0cmFuc2l0aW9uLWR1cmF0aW9uXCIsXCJcIiksbi5jc3MoXCJ0cmFuc2l0aW9uLWR1cmF0aW9uXCIsXCJcIil9O3ZhciBjPWkuZmluZChcIi5hY3RpdmVcIik7cmV0dXJuIGMubGVuZ3RoPjAmJihjLnJlbW92ZUNsYXNzKFwiYWN0aXZlXCIpLHRoaXMuanVtcChjLCExKSksdGhpc319KGpRdWVyeSk7IiwiKGZ1bmN0aW9uKCkge1xuICB2YXIgQWpheE1vbml0b3IsIEJhciwgRG9jdW1lbnRNb25pdG9yLCBFbGVtZW50TW9uaXRvciwgRWxlbWVudFRyYWNrZXIsIEV2ZW50TGFnTW9uaXRvciwgRXZlbnRlZCwgRXZlbnRzLCBOb1RhcmdldEVycm9yLCBQYWNlLCBSZXF1ZXN0SW50ZXJjZXB0LCBTT1VSQ0VfS0VZUywgU2NhbGVyLCBTb2NrZXRSZXF1ZXN0VHJhY2tlciwgWEhSUmVxdWVzdFRyYWNrZXIsIGFuaW1hdGlvbiwgYXZnQW1wbGl0dWRlLCBiYXIsIGNhbmNlbEFuaW1hdGlvbiwgY2FuY2VsQW5pbWF0aW9uRnJhbWUsIGRlZmF1bHRPcHRpb25zLCBleHRlbmQsIGV4dGVuZE5hdGl2ZSwgZ2V0RnJvbURPTSwgZ2V0SW50ZXJjZXB0LCBoYW5kbGVQdXNoU3RhdGUsIGlnbm9yZVN0YWNrLCBpbml0LCBub3csIG9wdGlvbnMsIHJlcXVlc3RBbmltYXRpb25GcmFtZSwgcmVzdWx0LCBydW5BbmltYXRpb24sIHNjYWxlcnMsIHNob3VsZElnbm9yZVVSTCwgc2hvdWxkVHJhY2ssIHNvdXJjZSwgc291cmNlcywgdW5pU2NhbGVyLCBfV2ViU29ja2V0LCBfWERvbWFpblJlcXVlc3QsIF9YTUxIdHRwUmVxdWVzdCwgX2ksIF9pbnRlcmNlcHQsIF9sZW4sIF9wdXNoU3RhdGUsIF9yZWYsIF9yZWYxLCBfcmVwbGFjZVN0YXRlLFxuICAgIF9fc2xpY2UgPSBbXS5zbGljZSxcbiAgICBfX2hhc1Byb3AgPSB7fS5oYXNPd25Qcm9wZXJ0eSxcbiAgICBfX2V4dGVuZHMgPSBmdW5jdGlvbihjaGlsZCwgcGFyZW50KSB7IGZvciAodmFyIGtleSBpbiBwYXJlbnQpIHsgaWYgKF9faGFzUHJvcC5jYWxsKHBhcmVudCwga2V5KSkgY2hpbGRba2V5XSA9IHBhcmVudFtrZXldOyB9IGZ1bmN0aW9uIGN0b3IoKSB7IHRoaXMuY29uc3RydWN0b3IgPSBjaGlsZDsgfSBjdG9yLnByb3RvdHlwZSA9IHBhcmVudC5wcm90b3R5cGU7IGNoaWxkLnByb3RvdHlwZSA9IG5ldyBjdG9yKCk7IGNoaWxkLl9fc3VwZXJfXyA9IHBhcmVudC5wcm90b3R5cGU7IHJldHVybiBjaGlsZDsgfSxcbiAgICBfX2luZGV4T2YgPSBbXS5pbmRleE9mIHx8IGZ1bmN0aW9uKGl0ZW0pIHsgZm9yICh2YXIgaSA9IDAsIGwgPSB0aGlzLmxlbmd0aDsgaSA8IGw7IGkrKykgeyBpZiAoaSBpbiB0aGlzICYmIHRoaXNbaV0gPT09IGl0ZW0pIHJldHVybiBpOyB9IHJldHVybiAtMTsgfTtcblxuICBkZWZhdWx0T3B0aW9ucyA9IHtcbiAgICBjYXRjaHVwVGltZTogMTAwLFxuICAgIGluaXRpYWxSYXRlOiAuMDMsXG4gICAgbWluVGltZTogMjUwLFxuICAgIGdob3N0VGltZTogMTAwLFxuICAgIG1heFByb2dyZXNzUGVyRnJhbWU6IDIwLFxuICAgIGVhc2VGYWN0b3I6IDEuMjUsXG4gICAgc3RhcnRPblBhZ2VMb2FkOiB0cnVlLFxuICAgIHJlc3RhcnRPblB1c2hTdGF0ZTogdHJ1ZSxcbiAgICByZXN0YXJ0T25SZXF1ZXN0QWZ0ZXI6IDUwMCxcbiAgICB0YXJnZXQ6ICdib2R5JyxcbiAgICBlbGVtZW50czoge1xuICAgICAgY2hlY2tJbnRlcnZhbDogMTAwLFxuICAgICAgc2VsZWN0b3JzOiBbJ2JvZHknXVxuICAgIH0sXG4gICAgZXZlbnRMYWc6IHtcbiAgICAgIG1pblNhbXBsZXM6IDEwLFxuICAgICAgc2FtcGxlQ291bnQ6IDMsXG4gICAgICBsYWdUaHJlc2hvbGQ6IDNcbiAgICB9LFxuICAgIGFqYXg6IHtcbiAgICAgIHRyYWNrTWV0aG9kczogWydHRVQnXSxcbiAgICAgIHRyYWNrV2ViU29ja2V0czogdHJ1ZSxcbiAgICAgIGlnbm9yZVVSTHM6IFtdXG4gICAgfVxuICB9O1xuXG4gIG5vdyA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBfcmVmO1xuICAgIHJldHVybiAoX3JlZiA9IHR5cGVvZiBwZXJmb3JtYW5jZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiBwZXJmb3JtYW5jZSAhPT0gbnVsbCA/IHR5cGVvZiBwZXJmb3JtYW5jZS5ub3cgPT09IFwiZnVuY3Rpb25cIiA/IHBlcmZvcm1hbmNlLm5vdygpIDogdm9pZCAwIDogdm9pZCAwKSAhPSBudWxsID8gX3JlZiA6ICsobmV3IERhdGUpO1xuICB9O1xuXG4gIHJlcXVlc3RBbmltYXRpb25GcmFtZSA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHwgd2luZG93Lm1velJlcXVlc3RBbmltYXRpb25GcmFtZSB8fCB3aW5kb3cud2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8IHdpbmRvdy5tc1JlcXVlc3RBbmltYXRpb25GcmFtZTtcblxuICBjYW5jZWxBbmltYXRpb25GcmFtZSA9IHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZSB8fCB3aW5kb3cubW96Q2FuY2VsQW5pbWF0aW9uRnJhbWU7XG5cbiAgaWYgKHJlcXVlc3RBbmltYXRpb25GcmFtZSA9PSBudWxsKSB7XG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lID0gZnVuY3Rpb24oZm4pIHtcbiAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZuLCA1MCk7XG4gICAgfTtcbiAgICBjYW5jZWxBbmltYXRpb25GcmFtZSA9IGZ1bmN0aW9uKGlkKSB7XG4gICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KGlkKTtcbiAgICB9O1xuICB9XG5cbiAgcnVuQW5pbWF0aW9uID0gZnVuY3Rpb24oZm4pIHtcbiAgICB2YXIgbGFzdCwgdGljaztcbiAgICBsYXN0ID0gbm93KCk7XG4gICAgdGljayA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGRpZmY7XG4gICAgICBkaWZmID0gbm93KCkgLSBsYXN0O1xuICAgICAgaWYgKGRpZmYgPj0gMzMpIHtcbiAgICAgICAgbGFzdCA9IG5vdygpO1xuICAgICAgICByZXR1cm4gZm4oZGlmZiwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aWNrKTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dCh0aWNrLCAzMyAtIGRpZmYpO1xuICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIHRpY2soKTtcbiAgfTtcblxuICByZXN1bHQgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgYXJncywga2V5LCBvYmo7XG4gICAgb2JqID0gYXJndW1lbnRzWzBdLCBrZXkgPSBhcmd1bWVudHNbMV0sIGFyZ3MgPSAzIDw9IGFyZ3VtZW50cy5sZW5ndGggPyBfX3NsaWNlLmNhbGwoYXJndW1lbnRzLCAyKSA6IFtdO1xuICAgIGlmICh0eXBlb2Ygb2JqW2tleV0gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJldHVybiBvYmpba2V5XS5hcHBseShvYmosIGFyZ3MpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gb2JqW2tleV07XG4gICAgfVxuICB9O1xuXG4gIGV4dGVuZCA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBrZXksIG91dCwgc291cmNlLCBzb3VyY2VzLCB2YWwsIF9pLCBfbGVuO1xuICAgIG91dCA9IGFyZ3VtZW50c1swXSwgc291cmNlcyA9IDIgPD0gYXJndW1lbnRzLmxlbmd0aCA/IF9fc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpIDogW107XG4gICAgZm9yIChfaSA9IDAsIF9sZW4gPSBzb3VyY2VzLmxlbmd0aDsgX2kgPCBfbGVuOyBfaSsrKSB7XG4gICAgICBzb3VyY2UgPSBzb3VyY2VzW19pXTtcbiAgICAgIGlmIChzb3VyY2UpIHtcbiAgICAgICAgZm9yIChrZXkgaW4gc291cmNlKSB7XG4gICAgICAgICAgaWYgKCFfX2hhc1Byb3AuY2FsbChzb3VyY2UsIGtleSkpIGNvbnRpbnVlO1xuICAgICAgICAgIHZhbCA9IHNvdXJjZVtrZXldO1xuICAgICAgICAgIGlmICgob3V0W2tleV0gIT0gbnVsbCkgJiYgdHlwZW9mIG91dFtrZXldID09PSAnb2JqZWN0JyAmJiAodmFsICE9IG51bGwpICYmIHR5cGVvZiB2YWwgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICBleHRlbmQob3V0W2tleV0sIHZhbCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG91dFtrZXldID0gdmFsO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gb3V0O1xuICB9O1xuXG4gIGF2Z0FtcGxpdHVkZSA9IGZ1bmN0aW9uKGFycikge1xuICAgIHZhciBjb3VudCwgc3VtLCB2LCBfaSwgX2xlbjtcbiAgICBzdW0gPSBjb3VudCA9IDA7XG4gICAgZm9yIChfaSA9IDAsIF9sZW4gPSBhcnIubGVuZ3RoOyBfaSA8IF9sZW47IF9pKyspIHtcbiAgICAgIHYgPSBhcnJbX2ldO1xuICAgICAgc3VtICs9IE1hdGguYWJzKHYpO1xuICAgICAgY291bnQrKztcbiAgICB9XG4gICAgcmV0dXJuIHN1bSAvIGNvdW50O1xuICB9O1xuXG4gIGdldEZyb21ET00gPSBmdW5jdGlvbihrZXksIGpzb24pIHtcbiAgICB2YXIgZGF0YSwgZSwgZWw7XG4gICAgaWYgKGtleSA9PSBudWxsKSB7XG4gICAgICBrZXkgPSAnb3B0aW9ucyc7XG4gICAgfVxuICAgIGlmIChqc29uID09IG51bGwpIHtcbiAgICAgIGpzb24gPSB0cnVlO1xuICAgIH1cbiAgICBlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJbZGF0YS1wYWNlLVwiICsga2V5ICsgXCJdXCIpO1xuICAgIGlmICghZWwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZGF0YSA9IGVsLmdldEF0dHJpYnV0ZShcImRhdGEtcGFjZS1cIiArIGtleSk7XG4gICAgaWYgKCFqc29uKSB7XG4gICAgICByZXR1cm4gZGF0YTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBKU09OLnBhcnNlKGRhdGEpO1xuICAgIH0gY2F0Y2ggKF9lcnJvcikge1xuICAgICAgZSA9IF9lcnJvcjtcbiAgICAgIHJldHVybiB0eXBlb2YgY29uc29sZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiBjb25zb2xlICE9PSBudWxsID8gY29uc29sZS5lcnJvcihcIkVycm9yIHBhcnNpbmcgaW5saW5lIHBhY2Ugb3B0aW9uc1wiLCBlKSA6IHZvaWQgMDtcbiAgICB9XG4gIH07XG5cbiAgRXZlbnRlZCA9IChmdW5jdGlvbigpIHtcbiAgICBmdW5jdGlvbiBFdmVudGVkKCkge31cblxuICAgIEV2ZW50ZWQucHJvdG90eXBlLm9uID0gZnVuY3Rpb24oZXZlbnQsIGhhbmRsZXIsIGN0eCwgb25jZSkge1xuICAgICAgdmFyIF9iYXNlO1xuICAgICAgaWYgKG9uY2UgPT0gbnVsbCkge1xuICAgICAgICBvbmNlID0gZmFsc2U7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5iaW5kaW5ncyA9PSBudWxsKSB7XG4gICAgICAgIHRoaXMuYmluZGluZ3MgPSB7fTtcbiAgICAgIH1cbiAgICAgIGlmICgoX2Jhc2UgPSB0aGlzLmJpbmRpbmdzKVtldmVudF0gPT0gbnVsbCkge1xuICAgICAgICBfYmFzZVtldmVudF0gPSBbXTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzLmJpbmRpbmdzW2V2ZW50XS5wdXNoKHtcbiAgICAgICAgaGFuZGxlcjogaGFuZGxlcixcbiAgICAgICAgY3R4OiBjdHgsXG4gICAgICAgIG9uY2U6IG9uY2VcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICBFdmVudGVkLnByb3RvdHlwZS5vbmNlID0gZnVuY3Rpb24oZXZlbnQsIGhhbmRsZXIsIGN0eCkge1xuICAgICAgcmV0dXJuIHRoaXMub24oZXZlbnQsIGhhbmRsZXIsIGN0eCwgdHJ1ZSk7XG4gICAgfTtcblxuICAgIEV2ZW50ZWQucHJvdG90eXBlLm9mZiA9IGZ1bmN0aW9uKGV2ZW50LCBoYW5kbGVyKSB7XG4gICAgICB2YXIgaSwgX3JlZiwgX3Jlc3VsdHM7XG4gICAgICBpZiAoKChfcmVmID0gdGhpcy5iaW5kaW5ncykgIT0gbnVsbCA/IF9yZWZbZXZlbnRdIDogdm9pZCAwKSA9PSBudWxsKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmIChoYW5kbGVyID09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIGRlbGV0ZSB0aGlzLmJpbmRpbmdzW2V2ZW50XTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGkgPSAwO1xuICAgICAgICBfcmVzdWx0cyA9IFtdO1xuICAgICAgICB3aGlsZSAoaSA8IHRoaXMuYmluZGluZ3NbZXZlbnRdLmxlbmd0aCkge1xuICAgICAgICAgIGlmICh0aGlzLmJpbmRpbmdzW2V2ZW50XVtpXS5oYW5kbGVyID09PSBoYW5kbGVyKSB7XG4gICAgICAgICAgICBfcmVzdWx0cy5wdXNoKHRoaXMuYmluZGluZ3NbZXZlbnRdLnNwbGljZShpLCAxKSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIF9yZXN1bHRzLnB1c2goaSsrKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIF9yZXN1bHRzO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBFdmVudGVkLnByb3RvdHlwZS50cmlnZ2VyID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgYXJncywgY3R4LCBldmVudCwgaGFuZGxlciwgaSwgb25jZSwgX3JlZiwgX3JlZjEsIF9yZXN1bHRzO1xuICAgICAgZXZlbnQgPSBhcmd1bWVudHNbMF0sIGFyZ3MgPSAyIDw9IGFyZ3VtZW50cy5sZW5ndGggPyBfX3NsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSA6IFtdO1xuICAgICAgaWYgKChfcmVmID0gdGhpcy5iaW5kaW5ncykgIT0gbnVsbCA/IF9yZWZbZXZlbnRdIDogdm9pZCAwKSB7XG4gICAgICAgIGkgPSAwO1xuICAgICAgICBfcmVzdWx0cyA9IFtdO1xuICAgICAgICB3aGlsZSAoaSA8IHRoaXMuYmluZGluZ3NbZXZlbnRdLmxlbmd0aCkge1xuICAgICAgICAgIF9yZWYxID0gdGhpcy5iaW5kaW5nc1tldmVudF1baV0sIGhhbmRsZXIgPSBfcmVmMS5oYW5kbGVyLCBjdHggPSBfcmVmMS5jdHgsIG9uY2UgPSBfcmVmMS5vbmNlO1xuICAgICAgICAgIGhhbmRsZXIuYXBwbHkoY3R4ICE9IG51bGwgPyBjdHggOiB0aGlzLCBhcmdzKTtcbiAgICAgICAgICBpZiAob25jZSkge1xuICAgICAgICAgICAgX3Jlc3VsdHMucHVzaCh0aGlzLmJpbmRpbmdzW2V2ZW50XS5zcGxpY2UoaSwgMSkpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBfcmVzdWx0cy5wdXNoKGkrKyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBfcmVzdWx0cztcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgcmV0dXJuIEV2ZW50ZWQ7XG5cbiAgfSkoKTtcblxuICBQYWNlID0gd2luZG93LlBhY2UgfHwge307XG5cbiAgd2luZG93LlBhY2UgPSBQYWNlO1xuXG4gIGV4dGVuZChQYWNlLCBFdmVudGVkLnByb3RvdHlwZSk7XG5cbiAgb3B0aW9ucyA9IFBhY2Uub3B0aW9ucyA9IGV4dGVuZCh7fSwgZGVmYXVsdE9wdGlvbnMsIHdpbmRvdy5wYWNlT3B0aW9ucywgZ2V0RnJvbURPTSgpKTtcblxuICBfcmVmID0gWydhamF4JywgJ2RvY3VtZW50JywgJ2V2ZW50TGFnJywgJ2VsZW1lbnRzJ107XG4gIGZvciAoX2kgPSAwLCBfbGVuID0gX3JlZi5sZW5ndGg7IF9pIDwgX2xlbjsgX2krKykge1xuICAgIHNvdXJjZSA9IF9yZWZbX2ldO1xuICAgIGlmIChvcHRpb25zW3NvdXJjZV0gPT09IHRydWUpIHtcbiAgICAgIG9wdGlvbnNbc291cmNlXSA9IGRlZmF1bHRPcHRpb25zW3NvdXJjZV07XG4gICAgfVxuICB9XG5cbiAgTm9UYXJnZXRFcnJvciA9IChmdW5jdGlvbihfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoTm9UYXJnZXRFcnJvciwgX3N1cGVyKTtcblxuICAgIGZ1bmN0aW9uIE5vVGFyZ2V0RXJyb3IoKSB7XG4gICAgICBfcmVmMSA9IE5vVGFyZ2V0RXJyb3IuX19zdXBlcl9fLmNvbnN0cnVjdG9yLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICByZXR1cm4gX3JlZjE7XG4gICAgfVxuXG4gICAgcmV0dXJuIE5vVGFyZ2V0RXJyb3I7XG5cbiAgfSkoRXJyb3IpO1xuXG4gIEJhciA9IChmdW5jdGlvbigpIHtcbiAgICBmdW5jdGlvbiBCYXIoKSB7XG4gICAgICB0aGlzLnByb2dyZXNzID0gMDtcbiAgICB9XG5cbiAgICBCYXIucHJvdG90eXBlLmdldEVsZW1lbnQgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciB0YXJnZXRFbGVtZW50O1xuICAgICAgaWYgKHRoaXMuZWwgPT0gbnVsbCkge1xuICAgICAgICB0YXJnZXRFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihvcHRpb25zLnRhcmdldCk7XG4gICAgICAgIGlmICghdGFyZ2V0RWxlbWVudCkge1xuICAgICAgICAgIHRocm93IG5ldyBOb1RhcmdldEVycm9yO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgdGhpcy5lbC5jbGFzc05hbWUgPSBcInBhY2UgcGFjZS1hY3RpdmVcIjtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc05hbWUgPSBkb2N1bWVudC5ib2R5LmNsYXNzTmFtZS5yZXBsYWNlKC9wYWNlLWRvbmUvZywgJycpO1xuICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTmFtZSArPSAnIHBhY2UtcnVubmluZyc7XG4gICAgICAgIHRoaXMuZWwuaW5uZXJIVE1MID0gJzxkaXYgY2xhc3M9XCJwYWNlLXByb2dyZXNzXCI+XFxuICA8ZGl2IGNsYXNzPVwicGFjZS1wcm9ncmVzcy1pbm5lclwiPjwvZGl2PlxcbjwvZGl2PlxcbjxkaXYgY2xhc3M9XCJwYWNlLWFjdGl2aXR5XCI+PC9kaXY+JztcbiAgICAgICAgaWYgKHRhcmdldEVsZW1lbnQuZmlyc3RDaGlsZCAhPSBudWxsKSB7XG4gICAgICAgICAgdGFyZ2V0RWxlbWVudC5pbnNlcnRCZWZvcmUodGhpcy5lbCwgdGFyZ2V0RWxlbWVudC5maXJzdENoaWxkKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0YXJnZXRFbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuZWwpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcy5lbDtcbiAgICB9O1xuXG4gICAgQmFyLnByb3RvdHlwZS5maW5pc2ggPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBlbDtcbiAgICAgIGVsID0gdGhpcy5nZXRFbGVtZW50KCk7XG4gICAgICBlbC5jbGFzc05hbWUgPSBlbC5jbGFzc05hbWUucmVwbGFjZSgncGFjZS1hY3RpdmUnLCAnJyk7XG4gICAgICBlbC5jbGFzc05hbWUgKz0gJyBwYWNlLWluYWN0aXZlJztcbiAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NOYW1lID0gZG9jdW1lbnQuYm9keS5jbGFzc05hbWUucmVwbGFjZSgncGFjZS1ydW5uaW5nJywgJycpO1xuICAgICAgcmV0dXJuIGRvY3VtZW50LmJvZHkuY2xhc3NOYW1lICs9ICcgcGFjZS1kb25lJztcbiAgICB9O1xuXG4gICAgQmFyLnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbihwcm9nKSB7XG4gICAgICB0aGlzLnByb2dyZXNzID0gcHJvZztcbiAgICAgIHJldHVybiB0aGlzLnJlbmRlcigpO1xuICAgIH07XG5cbiAgICBCYXIucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbigpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHRoaXMuZ2V0RWxlbWVudCgpLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcy5nZXRFbGVtZW50KCkpO1xuICAgICAgfSBjYXRjaCAoX2Vycm9yKSB7XG4gICAgICAgIE5vVGFyZ2V0RXJyb3IgPSBfZXJyb3I7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcy5lbCA9IHZvaWQgMDtcbiAgICB9O1xuXG4gICAgQmFyLnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBlbCwga2V5LCBwcm9ncmVzc1N0ciwgdHJhbnNmb3JtLCBfaiwgX2xlbjEsIF9yZWYyO1xuICAgICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Iob3B0aW9ucy50YXJnZXQpID09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgZWwgPSB0aGlzLmdldEVsZW1lbnQoKTtcbiAgICAgIHRyYW5zZm9ybSA9IFwidHJhbnNsYXRlM2QoXCIgKyB0aGlzLnByb2dyZXNzICsgXCIlLCAwLCAwKVwiO1xuICAgICAgX3JlZjIgPSBbJ3dlYmtpdFRyYW5zZm9ybScsICdtc1RyYW5zZm9ybScsICd0cmFuc2Zvcm0nXTtcbiAgICAgIGZvciAoX2ogPSAwLCBfbGVuMSA9IF9yZWYyLmxlbmd0aDsgX2ogPCBfbGVuMTsgX2orKykge1xuICAgICAgICBrZXkgPSBfcmVmMltfal07XG4gICAgICAgIGVsLmNoaWxkcmVuWzBdLnN0eWxlW2tleV0gPSB0cmFuc2Zvcm07XG4gICAgICB9XG4gICAgICBpZiAoIXRoaXMubGFzdFJlbmRlcmVkUHJvZ3Jlc3MgfHwgdGhpcy5sYXN0UmVuZGVyZWRQcm9ncmVzcyB8IDAgIT09IHRoaXMucHJvZ3Jlc3MgfCAwKSB7XG4gICAgICAgIGVsLmNoaWxkcmVuWzBdLnNldEF0dHJpYnV0ZSgnZGF0YS1wcm9ncmVzcy10ZXh0JywgXCJcIiArICh0aGlzLnByb2dyZXNzIHwgMCkgKyBcIiVcIik7XG4gICAgICAgIGlmICh0aGlzLnByb2dyZXNzID49IDEwMCkge1xuICAgICAgICAgIHByb2dyZXNzU3RyID0gJzk5JztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBwcm9ncmVzc1N0ciA9IHRoaXMucHJvZ3Jlc3MgPCAxMCA/IFwiMFwiIDogXCJcIjtcbiAgICAgICAgICBwcm9ncmVzc1N0ciArPSB0aGlzLnByb2dyZXNzIHwgMDtcbiAgICAgICAgfVxuICAgICAgICBlbC5jaGlsZHJlblswXS5zZXRBdHRyaWJ1dGUoJ2RhdGEtcHJvZ3Jlc3MnLCBcIlwiICsgcHJvZ3Jlc3NTdHIpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXMubGFzdFJlbmRlcmVkUHJvZ3Jlc3MgPSB0aGlzLnByb2dyZXNzO1xuICAgIH07XG5cbiAgICBCYXIucHJvdG90eXBlLmRvbmUgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzLnByb2dyZXNzID49IDEwMDtcbiAgICB9O1xuXG4gICAgcmV0dXJuIEJhcjtcblxuICB9KSgpO1xuXG4gIEV2ZW50cyA9IChmdW5jdGlvbigpIHtcbiAgICBmdW5jdGlvbiBFdmVudHMoKSB7XG4gICAgICB0aGlzLmJpbmRpbmdzID0ge307XG4gICAgfVxuXG4gICAgRXZlbnRzLnByb3RvdHlwZS50cmlnZ2VyID0gZnVuY3Rpb24obmFtZSwgdmFsKSB7XG4gICAgICB2YXIgYmluZGluZywgX2osIF9sZW4xLCBfcmVmMiwgX3Jlc3VsdHM7XG4gICAgICBpZiAodGhpcy5iaW5kaW5nc1tuYW1lXSAhPSBudWxsKSB7XG4gICAgICAgIF9yZWYyID0gdGhpcy5iaW5kaW5nc1tuYW1lXTtcbiAgICAgICAgX3Jlc3VsdHMgPSBbXTtcbiAgICAgICAgZm9yIChfaiA9IDAsIF9sZW4xID0gX3JlZjIubGVuZ3RoOyBfaiA8IF9sZW4xOyBfaisrKSB7XG4gICAgICAgICAgYmluZGluZyA9IF9yZWYyW19qXTtcbiAgICAgICAgICBfcmVzdWx0cy5wdXNoKGJpbmRpbmcuY2FsbCh0aGlzLCB2YWwpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gX3Jlc3VsdHM7XG4gICAgICB9XG4gICAgfTtcblxuICAgIEV2ZW50cy5wcm90b3R5cGUub24gPSBmdW5jdGlvbihuYW1lLCBmbikge1xuICAgICAgdmFyIF9iYXNlO1xuICAgICAgaWYgKChfYmFzZSA9IHRoaXMuYmluZGluZ3MpW25hbWVdID09IG51bGwpIHtcbiAgICAgICAgX2Jhc2VbbmFtZV0gPSBbXTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzLmJpbmRpbmdzW25hbWVdLnB1c2goZm4pO1xuICAgIH07XG5cbiAgICByZXR1cm4gRXZlbnRzO1xuXG4gIH0pKCk7XG5cbiAgX1hNTEh0dHBSZXF1ZXN0ID0gd2luZG93LlhNTEh0dHBSZXF1ZXN0O1xuXG4gIF9YRG9tYWluUmVxdWVzdCA9IHdpbmRvdy5YRG9tYWluUmVxdWVzdDtcblxuICBfV2ViU29ja2V0ID0gd2luZG93LldlYlNvY2tldDtcblxuICBleHRlbmROYXRpdmUgPSBmdW5jdGlvbih0bywgZnJvbSkge1xuICAgIHZhciBlLCBrZXksIF9yZXN1bHRzO1xuICAgIF9yZXN1bHRzID0gW107XG4gICAgZm9yIChrZXkgaW4gZnJvbS5wcm90b3R5cGUpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGlmICgodG9ba2V5XSA9PSBudWxsKSAmJiB0eXBlb2YgZnJvbVtrZXldICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgaWYgKHR5cGVvZiBPYmplY3QuZGVmaW5lUHJvcGVydHkgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIF9yZXN1bHRzLnB1c2goT2JqZWN0LmRlZmluZVByb3BlcnR5KHRvLCBrZXksIHtcbiAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZnJvbS5wcm90b3R5cGVba2V5XTtcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlXG4gICAgICAgICAgICB9KSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIF9yZXN1bHRzLnB1c2godG9ba2V5XSA9IGZyb20ucHJvdG90eXBlW2tleV0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBfcmVzdWx0cy5wdXNoKHZvaWQgMCk7XG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2ggKF9lcnJvcikge1xuICAgICAgICBlID0gX2Vycm9yO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gX3Jlc3VsdHM7XG4gIH07XG5cbiAgaWdub3JlU3RhY2sgPSBbXTtcblxuICBQYWNlLmlnbm9yZSA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBhcmdzLCBmbiwgcmV0O1xuICAgIGZuID0gYXJndW1lbnRzWzBdLCBhcmdzID0gMiA8PSBhcmd1bWVudHMubGVuZ3RoID8gX19zbGljZS5jYWxsKGFyZ3VtZW50cywgMSkgOiBbXTtcbiAgICBpZ25vcmVTdGFjay51bnNoaWZ0KCdpZ25vcmUnKTtcbiAgICByZXQgPSBmbi5hcHBseShudWxsLCBhcmdzKTtcbiAgICBpZ25vcmVTdGFjay5zaGlmdCgpO1xuICAgIHJldHVybiByZXQ7XG4gIH07XG5cbiAgUGFjZS50cmFjayA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBhcmdzLCBmbiwgcmV0O1xuICAgIGZuID0gYXJndW1lbnRzWzBdLCBhcmdzID0gMiA8PSBhcmd1bWVudHMubGVuZ3RoID8gX19zbGljZS5jYWxsKGFyZ3VtZW50cywgMSkgOiBbXTtcbiAgICBpZ25vcmVTdGFjay51bnNoaWZ0KCd0cmFjaycpO1xuICAgIHJldCA9IGZuLmFwcGx5KG51bGwsIGFyZ3MpO1xuICAgIGlnbm9yZVN0YWNrLnNoaWZ0KCk7XG4gICAgcmV0dXJuIHJldDtcbiAgfTtcblxuICBzaG91bGRUcmFjayA9IGZ1bmN0aW9uKG1ldGhvZCkge1xuICAgIHZhciBfcmVmMjtcbiAgICBpZiAobWV0aG9kID09IG51bGwpIHtcbiAgICAgIG1ldGhvZCA9ICdHRVQnO1xuICAgIH1cbiAgICBpZiAoaWdub3JlU3RhY2tbMF0gPT09ICd0cmFjaycpIHtcbiAgICAgIHJldHVybiAnZm9yY2UnO1xuICAgIH1cbiAgICBpZiAoIWlnbm9yZVN0YWNrLmxlbmd0aCAmJiBvcHRpb25zLmFqYXgpIHtcbiAgICAgIGlmIChtZXRob2QgPT09ICdzb2NrZXQnICYmIG9wdGlvbnMuYWpheC50cmFja1dlYlNvY2tldHMpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9IGVsc2UgaWYgKF9yZWYyID0gbWV0aG9kLnRvVXBwZXJDYXNlKCksIF9faW5kZXhPZi5jYWxsKG9wdGlvbnMuYWpheC50cmFja01ldGhvZHMsIF9yZWYyKSA+PSAwKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH07XG5cbiAgUmVxdWVzdEludGVyY2VwdCA9IChmdW5jdGlvbihfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoUmVxdWVzdEludGVyY2VwdCwgX3N1cGVyKTtcblxuICAgIGZ1bmN0aW9uIFJlcXVlc3RJbnRlcmNlcHQoKSB7XG4gICAgICB2YXIgbW9uaXRvclhIUixcbiAgICAgICAgX3RoaXMgPSB0aGlzO1xuICAgICAgUmVxdWVzdEludGVyY2VwdC5fX3N1cGVyX18uY29uc3RydWN0b3IuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIG1vbml0b3JYSFIgPSBmdW5jdGlvbihyZXEpIHtcbiAgICAgICAgdmFyIF9vcGVuO1xuICAgICAgICBfb3BlbiA9IHJlcS5vcGVuO1xuICAgICAgICByZXR1cm4gcmVxLm9wZW4gPSBmdW5jdGlvbih0eXBlLCB1cmwsIGFzeW5jKSB7XG4gICAgICAgICAgaWYgKHNob3VsZFRyYWNrKHR5cGUpKSB7XG4gICAgICAgICAgICBfdGhpcy50cmlnZ2VyKCdyZXF1ZXN0Jywge1xuICAgICAgICAgICAgICB0eXBlOiB0eXBlLFxuICAgICAgICAgICAgICB1cmw6IHVybCxcbiAgICAgICAgICAgICAgcmVxdWVzdDogcmVxXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIF9vcGVuLmFwcGx5KHJlcSwgYXJndW1lbnRzKTtcbiAgICAgICAgfTtcbiAgICAgIH07XG4gICAgICB3aW5kb3cuWE1MSHR0cFJlcXVlc3QgPSBmdW5jdGlvbihmbGFncykge1xuICAgICAgICB2YXIgcmVxO1xuICAgICAgICByZXEgPSBuZXcgX1hNTEh0dHBSZXF1ZXN0KGZsYWdzKTtcbiAgICAgICAgbW9uaXRvclhIUihyZXEpO1xuICAgICAgICByZXR1cm4gcmVxO1xuICAgICAgfTtcbiAgICAgIHRyeSB7XG4gICAgICAgIGV4dGVuZE5hdGl2ZSh3aW5kb3cuWE1MSHR0cFJlcXVlc3QsIF9YTUxIdHRwUmVxdWVzdCk7XG4gICAgICB9IGNhdGNoIChfZXJyb3IpIHt9XG4gICAgICBpZiAoX1hEb21haW5SZXF1ZXN0ICE9IG51bGwpIHtcbiAgICAgICAgd2luZG93LlhEb21haW5SZXF1ZXN0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdmFyIHJlcTtcbiAgICAgICAgICByZXEgPSBuZXcgX1hEb21haW5SZXF1ZXN0O1xuICAgICAgICAgIG1vbml0b3JYSFIocmVxKTtcbiAgICAgICAgICByZXR1cm4gcmVxO1xuICAgICAgICB9O1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGV4dGVuZE5hdGl2ZSh3aW5kb3cuWERvbWFpblJlcXVlc3QsIF9YRG9tYWluUmVxdWVzdCk7XG4gICAgICAgIH0gY2F0Y2ggKF9lcnJvcikge31cbiAgICAgIH1cbiAgICAgIGlmICgoX1dlYlNvY2tldCAhPSBudWxsKSAmJiBvcHRpb25zLmFqYXgudHJhY2tXZWJTb2NrZXRzKSB7XG4gICAgICAgIHdpbmRvdy5XZWJTb2NrZXQgPSBmdW5jdGlvbih1cmwsIHByb3RvY29scykge1xuICAgICAgICAgIHZhciByZXE7XG4gICAgICAgICAgaWYgKHByb3RvY29scyAhPSBudWxsKSB7XG4gICAgICAgICAgICByZXEgPSBuZXcgX1dlYlNvY2tldCh1cmwsIHByb3RvY29scyk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlcSA9IG5ldyBfV2ViU29ja2V0KHVybCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChzaG91bGRUcmFjaygnc29ja2V0JykpIHtcbiAgICAgICAgICAgIF90aGlzLnRyaWdnZXIoJ3JlcXVlc3QnLCB7XG4gICAgICAgICAgICAgIHR5cGU6ICdzb2NrZXQnLFxuICAgICAgICAgICAgICB1cmw6IHVybCxcbiAgICAgICAgICAgICAgcHJvdG9jb2xzOiBwcm90b2NvbHMsXG4gICAgICAgICAgICAgIHJlcXVlc3Q6IHJlcVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiByZXE7XG4gICAgICAgIH07XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgZXh0ZW5kTmF0aXZlKHdpbmRvdy5XZWJTb2NrZXQsIF9XZWJTb2NrZXQpO1xuICAgICAgICB9IGNhdGNoIChfZXJyb3IpIHt9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIFJlcXVlc3RJbnRlcmNlcHQ7XG5cbiAgfSkoRXZlbnRzKTtcblxuICBfaW50ZXJjZXB0ID0gbnVsbDtcblxuICBnZXRJbnRlcmNlcHQgPSBmdW5jdGlvbigpIHtcbiAgICBpZiAoX2ludGVyY2VwdCA9PSBudWxsKSB7XG4gICAgICBfaW50ZXJjZXB0ID0gbmV3IFJlcXVlc3RJbnRlcmNlcHQ7XG4gICAgfVxuICAgIHJldHVybiBfaW50ZXJjZXB0O1xuICB9O1xuXG4gIHNob3VsZElnbm9yZVVSTCA9IGZ1bmN0aW9uKHVybCkge1xuICAgIHZhciBwYXR0ZXJuLCBfaiwgX2xlbjEsIF9yZWYyO1xuICAgIF9yZWYyID0gb3B0aW9ucy5hamF4Lmlnbm9yZVVSTHM7XG4gICAgZm9yIChfaiA9IDAsIF9sZW4xID0gX3JlZjIubGVuZ3RoOyBfaiA8IF9sZW4xOyBfaisrKSB7XG4gICAgICBwYXR0ZXJuID0gX3JlZjJbX2pdO1xuICAgICAgaWYgKHR5cGVvZiBwYXR0ZXJuID09PSAnc3RyaW5nJykge1xuICAgICAgICBpZiAodXJsLmluZGV4T2YocGF0dGVybikgIT09IC0xKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChwYXR0ZXJuLnRlc3QodXJsKSkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfTtcblxuICBnZXRJbnRlcmNlcHQoKS5vbigncmVxdWVzdCcsIGZ1bmN0aW9uKF9hcmcpIHtcbiAgICB2YXIgYWZ0ZXIsIGFyZ3MsIHJlcXVlc3QsIHR5cGUsIHVybDtcbiAgICB0eXBlID0gX2FyZy50eXBlLCByZXF1ZXN0ID0gX2FyZy5yZXF1ZXN0LCB1cmwgPSBfYXJnLnVybDtcbiAgICBpZiAoc2hvdWxkSWdub3JlVVJMKHVybCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKCFQYWNlLnJ1bm5pbmcgJiYgKG9wdGlvbnMucmVzdGFydE9uUmVxdWVzdEFmdGVyICE9PSBmYWxzZSB8fCBzaG91bGRUcmFjayh0eXBlKSA9PT0gJ2ZvcmNlJykpIHtcbiAgICAgIGFyZ3MgPSBhcmd1bWVudHM7XG4gICAgICBhZnRlciA9IG9wdGlvbnMucmVzdGFydE9uUmVxdWVzdEFmdGVyIHx8IDA7XG4gICAgICBpZiAodHlwZW9mIGFmdGVyID09PSAnYm9vbGVhbicpIHtcbiAgICAgICAgYWZ0ZXIgPSAwO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBzdGlsbEFjdGl2ZSwgX2osIF9sZW4xLCBfcmVmMiwgX3JlZjMsIF9yZXN1bHRzO1xuICAgICAgICBpZiAodHlwZSA9PT0gJ3NvY2tldCcpIHtcbiAgICAgICAgICBzdGlsbEFjdGl2ZSA9IHJlcXVlc3QucmVhZHlTdGF0ZSA8IDI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc3RpbGxBY3RpdmUgPSAoMCA8IChfcmVmMiA9IHJlcXVlc3QucmVhZHlTdGF0ZSkgJiYgX3JlZjIgPCA0KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc3RpbGxBY3RpdmUpIHtcbiAgICAgICAgICBQYWNlLnJlc3RhcnQoKTtcbiAgICAgICAgICBfcmVmMyA9IFBhY2Uuc291cmNlcztcbiAgICAgICAgICBfcmVzdWx0cyA9IFtdO1xuICAgICAgICAgIGZvciAoX2ogPSAwLCBfbGVuMSA9IF9yZWYzLmxlbmd0aDsgX2ogPCBfbGVuMTsgX2orKykge1xuICAgICAgICAgICAgc291cmNlID0gX3JlZjNbX2pdO1xuICAgICAgICAgICAgaWYgKHNvdXJjZSBpbnN0YW5jZW9mIEFqYXhNb25pdG9yKSB7XG4gICAgICAgICAgICAgIHNvdXJjZS53YXRjaC5hcHBseShzb3VyY2UsIGFyZ3MpO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIF9yZXN1bHRzLnB1c2godm9pZCAwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIF9yZXN1bHRzO1xuICAgICAgICB9XG4gICAgICB9LCBhZnRlcik7XG4gICAgfVxuICB9KTtcblxuICBBamF4TW9uaXRvciA9IChmdW5jdGlvbigpIHtcbiAgICBmdW5jdGlvbiBBamF4TW9uaXRvcigpIHtcbiAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICB0aGlzLmVsZW1lbnRzID0gW107XG4gICAgICBnZXRJbnRlcmNlcHQoKS5vbigncmVxdWVzdCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gX3RoaXMud2F0Y2guYXBwbHkoX3RoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBBamF4TW9uaXRvci5wcm90b3R5cGUud2F0Y2ggPSBmdW5jdGlvbihfYXJnKSB7XG4gICAgICB2YXIgcmVxdWVzdCwgdHJhY2tlciwgdHlwZSwgdXJsO1xuICAgICAgdHlwZSA9IF9hcmcudHlwZSwgcmVxdWVzdCA9IF9hcmcucmVxdWVzdCwgdXJsID0gX2FyZy51cmw7XG4gICAgICBpZiAoc2hvdWxkSWdub3JlVVJMKHVybCkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGUgPT09ICdzb2NrZXQnKSB7XG4gICAgICAgIHRyYWNrZXIgPSBuZXcgU29ja2V0UmVxdWVzdFRyYWNrZXIocmVxdWVzdCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0cmFja2VyID0gbmV3IFhIUlJlcXVlc3RUcmFja2VyKHJlcXVlc3QpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXMuZWxlbWVudHMucHVzaCh0cmFja2VyKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIEFqYXhNb25pdG9yO1xuXG4gIH0pKCk7XG5cbiAgWEhSUmVxdWVzdFRyYWNrZXIgPSAoZnVuY3Rpb24oKSB7XG4gICAgZnVuY3Rpb24gWEhSUmVxdWVzdFRyYWNrZXIocmVxdWVzdCkge1xuICAgICAgdmFyIGV2ZW50LCBzaXplLCBfaiwgX2xlbjEsIF9vbnJlYWR5c3RhdGVjaGFuZ2UsIF9yZWYyLFxuICAgICAgICBfdGhpcyA9IHRoaXM7XG4gICAgICB0aGlzLnByb2dyZXNzID0gMDtcbiAgICAgIGlmICh3aW5kb3cuUHJvZ3Jlc3NFdmVudCAhPSBudWxsKSB7XG4gICAgICAgIHNpemUgPSBudWxsO1xuICAgICAgICByZXF1ZXN0LmFkZEV2ZW50TGlzdGVuZXIoJ3Byb2dyZXNzJywgZnVuY3Rpb24oZXZ0KSB7XG4gICAgICAgICAgaWYgKGV2dC5sZW5ndGhDb21wdXRhYmxlKSB7XG4gICAgICAgICAgICByZXR1cm4gX3RoaXMucHJvZ3Jlc3MgPSAxMDAgKiBldnQubG9hZGVkIC8gZXZ0LnRvdGFsO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gX3RoaXMucHJvZ3Jlc3MgPSBfdGhpcy5wcm9ncmVzcyArICgxMDAgLSBfdGhpcy5wcm9ncmVzcykgLyAyO1xuICAgICAgICAgIH1cbiAgICAgICAgfSwgZmFsc2UpO1xuICAgICAgICBfcmVmMiA9IFsnbG9hZCcsICdhYm9ydCcsICd0aW1lb3V0JywgJ2Vycm9yJ107XG4gICAgICAgIGZvciAoX2ogPSAwLCBfbGVuMSA9IF9yZWYyLmxlbmd0aDsgX2ogPCBfbGVuMTsgX2orKykge1xuICAgICAgICAgIGV2ZW50ID0gX3JlZjJbX2pdO1xuICAgICAgICAgIHJlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gX3RoaXMucHJvZ3Jlc3MgPSAxMDA7XG4gICAgICAgICAgfSwgZmFsc2UpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBfb25yZWFkeXN0YXRlY2hhbmdlID0gcmVxdWVzdC5vbnJlYWR5c3RhdGVjaGFuZ2U7XG4gICAgICAgIHJlcXVlc3Qub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdmFyIF9yZWYzO1xuICAgICAgICAgIGlmICgoX3JlZjMgPSByZXF1ZXN0LnJlYWR5U3RhdGUpID09PSAwIHx8IF9yZWYzID09PSA0KSB7XG4gICAgICAgICAgICBfdGhpcy5wcm9ncmVzcyA9IDEwMDtcbiAgICAgICAgICB9IGVsc2UgaWYgKHJlcXVlc3QucmVhZHlTdGF0ZSA9PT0gMykge1xuICAgICAgICAgICAgX3RoaXMucHJvZ3Jlc3MgPSA1MDtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHR5cGVvZiBfb25yZWFkeXN0YXRlY2hhbmdlID09PSBcImZ1bmN0aW9uXCIgPyBfb25yZWFkeXN0YXRlY2hhbmdlLmFwcGx5KG51bGwsIGFyZ3VtZW50cykgOiB2b2lkIDA7XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIFhIUlJlcXVlc3RUcmFja2VyO1xuXG4gIH0pKCk7XG5cbiAgU29ja2V0UmVxdWVzdFRyYWNrZXIgPSAoZnVuY3Rpb24oKSB7XG4gICAgZnVuY3Rpb24gU29ja2V0UmVxdWVzdFRyYWNrZXIocmVxdWVzdCkge1xuICAgICAgdmFyIGV2ZW50LCBfaiwgX2xlbjEsIF9yZWYyLFxuICAgICAgICBfdGhpcyA9IHRoaXM7XG4gICAgICB0aGlzLnByb2dyZXNzID0gMDtcbiAgICAgIF9yZWYyID0gWydlcnJvcicsICdvcGVuJ107XG4gICAgICBmb3IgKF9qID0gMCwgX2xlbjEgPSBfcmVmMi5sZW5ndGg7IF9qIDwgX2xlbjE7IF9qKyspIHtcbiAgICAgICAgZXZlbnQgPSBfcmVmMltfal07XG4gICAgICAgIHJlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIF90aGlzLnByb2dyZXNzID0gMTAwO1xuICAgICAgICB9LCBmYWxzZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIFNvY2tldFJlcXVlc3RUcmFja2VyO1xuXG4gIH0pKCk7XG5cbiAgRWxlbWVudE1vbml0b3IgPSAoZnVuY3Rpb24oKSB7XG4gICAgZnVuY3Rpb24gRWxlbWVudE1vbml0b3Iob3B0aW9ucykge1xuICAgICAgdmFyIHNlbGVjdG9yLCBfaiwgX2xlbjEsIF9yZWYyO1xuICAgICAgaWYgKG9wdGlvbnMgPT0gbnVsbCkge1xuICAgICAgICBvcHRpb25zID0ge307XG4gICAgICB9XG4gICAgICB0aGlzLmVsZW1lbnRzID0gW107XG4gICAgICBpZiAob3B0aW9ucy5zZWxlY3RvcnMgPT0gbnVsbCkge1xuICAgICAgICBvcHRpb25zLnNlbGVjdG9ycyA9IFtdO1xuICAgICAgfVxuICAgICAgX3JlZjIgPSBvcHRpb25zLnNlbGVjdG9ycztcbiAgICAgIGZvciAoX2ogPSAwLCBfbGVuMSA9IF9yZWYyLmxlbmd0aDsgX2ogPCBfbGVuMTsgX2orKykge1xuICAgICAgICBzZWxlY3RvciA9IF9yZWYyW19qXTtcbiAgICAgICAgdGhpcy5lbGVtZW50cy5wdXNoKG5ldyBFbGVtZW50VHJhY2tlcihzZWxlY3RvcikpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBFbGVtZW50TW9uaXRvcjtcblxuICB9KSgpO1xuXG4gIEVsZW1lbnRUcmFja2VyID0gKGZ1bmN0aW9uKCkge1xuICAgIGZ1bmN0aW9uIEVsZW1lbnRUcmFja2VyKHNlbGVjdG9yKSB7XG4gICAgICB0aGlzLnNlbGVjdG9yID0gc2VsZWN0b3I7XG4gICAgICB0aGlzLnByb2dyZXNzID0gMDtcbiAgICAgIHRoaXMuY2hlY2soKTtcbiAgICB9XG5cbiAgICBFbGVtZW50VHJhY2tlci5wcm90b3R5cGUuY2hlY2sgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0aGlzLnNlbGVjdG9yKSkge1xuICAgICAgICByZXR1cm4gdGhpcy5kb25lKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dCgoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIF90aGlzLmNoZWNrKCk7XG4gICAgICAgIH0pLCBvcHRpb25zLmVsZW1lbnRzLmNoZWNrSW50ZXJ2YWwpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBFbGVtZW50VHJhY2tlci5wcm90b3R5cGUuZG9uZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMucHJvZ3Jlc3MgPSAxMDA7XG4gICAgfTtcblxuICAgIHJldHVybiBFbGVtZW50VHJhY2tlcjtcblxuICB9KSgpO1xuXG4gIERvY3VtZW50TW9uaXRvciA9IChmdW5jdGlvbigpIHtcbiAgICBEb2N1bWVudE1vbml0b3IucHJvdG90eXBlLnN0YXRlcyA9IHtcbiAgICAgIGxvYWRpbmc6IDAsXG4gICAgICBpbnRlcmFjdGl2ZTogNTAsXG4gICAgICBjb21wbGV0ZTogMTAwXG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIERvY3VtZW50TW9uaXRvcigpIHtcbiAgICAgIHZhciBfb25yZWFkeXN0YXRlY2hhbmdlLCBfcmVmMixcbiAgICAgICAgX3RoaXMgPSB0aGlzO1xuICAgICAgdGhpcy5wcm9ncmVzcyA9IChfcmVmMiA9IHRoaXMuc3RhdGVzW2RvY3VtZW50LnJlYWR5U3RhdGVdKSAhPSBudWxsID8gX3JlZjIgOiAxMDA7XG4gICAgICBfb25yZWFkeXN0YXRlY2hhbmdlID0gZG9jdW1lbnQub25yZWFkeXN0YXRlY2hhbmdlO1xuICAgICAgZG9jdW1lbnQub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmIChfdGhpcy5zdGF0ZXNbZG9jdW1lbnQucmVhZHlTdGF0ZV0gIT0gbnVsbCkge1xuICAgICAgICAgIF90aGlzLnByb2dyZXNzID0gX3RoaXMuc3RhdGVzW2RvY3VtZW50LnJlYWR5U3RhdGVdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0eXBlb2YgX29ucmVhZHlzdGF0ZWNoYW5nZSA9PT0gXCJmdW5jdGlvblwiID8gX29ucmVhZHlzdGF0ZWNoYW5nZS5hcHBseShudWxsLCBhcmd1bWVudHMpIDogdm9pZCAwO1xuICAgICAgfTtcbiAgICB9XG5cbiAgICByZXR1cm4gRG9jdW1lbnRNb25pdG9yO1xuXG4gIH0pKCk7XG5cbiAgRXZlbnRMYWdNb25pdG9yID0gKGZ1bmN0aW9uKCkge1xuICAgIGZ1bmN0aW9uIEV2ZW50TGFnTW9uaXRvcigpIHtcbiAgICAgIHZhciBhdmcsIGludGVydmFsLCBsYXN0LCBwb2ludHMsIHNhbXBsZXMsXG4gICAgICAgIF90aGlzID0gdGhpcztcbiAgICAgIHRoaXMucHJvZ3Jlc3MgPSAwO1xuICAgICAgYXZnID0gMDtcbiAgICAgIHNhbXBsZXMgPSBbXTtcbiAgICAgIHBvaW50cyA9IDA7XG4gICAgICBsYXN0ID0gbm93KCk7XG4gICAgICBpbnRlcnZhbCA9IHNldEludGVydmFsKGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgZGlmZjtcbiAgICAgICAgZGlmZiA9IG5vdygpIC0gbGFzdCAtIDUwO1xuICAgICAgICBsYXN0ID0gbm93KCk7XG4gICAgICAgIHNhbXBsZXMucHVzaChkaWZmKTtcbiAgICAgICAgaWYgKHNhbXBsZXMubGVuZ3RoID4gb3B0aW9ucy5ldmVudExhZy5zYW1wbGVDb3VudCkge1xuICAgICAgICAgIHNhbXBsZXMuc2hpZnQoKTtcbiAgICAgICAgfVxuICAgICAgICBhdmcgPSBhdmdBbXBsaXR1ZGUoc2FtcGxlcyk7XG4gICAgICAgIGlmICgrK3BvaW50cyA+PSBvcHRpb25zLmV2ZW50TGFnLm1pblNhbXBsZXMgJiYgYXZnIDwgb3B0aW9ucy5ldmVudExhZy5sYWdUaHJlc2hvbGQpIHtcbiAgICAgICAgICBfdGhpcy5wcm9ncmVzcyA9IDEwMDtcbiAgICAgICAgICByZXR1cm4gY2xlYXJJbnRlcnZhbChpbnRlcnZhbCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIF90aGlzLnByb2dyZXNzID0gMTAwICogKDMgLyAoYXZnICsgMykpO1xuICAgICAgICB9XG4gICAgICB9LCA1MCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIEV2ZW50TGFnTW9uaXRvcjtcblxuICB9KSgpO1xuXG4gIFNjYWxlciA9IChmdW5jdGlvbigpIHtcbiAgICBmdW5jdGlvbiBTY2FsZXIoc291cmNlKSB7XG4gICAgICB0aGlzLnNvdXJjZSA9IHNvdXJjZTtcbiAgICAgIHRoaXMubGFzdCA9IHRoaXMuc2luY2VMYXN0VXBkYXRlID0gMDtcbiAgICAgIHRoaXMucmF0ZSA9IG9wdGlvbnMuaW5pdGlhbFJhdGU7XG4gICAgICB0aGlzLmNhdGNodXAgPSAwO1xuICAgICAgdGhpcy5wcm9ncmVzcyA9IHRoaXMubGFzdFByb2dyZXNzID0gMDtcbiAgICAgIGlmICh0aGlzLnNvdXJjZSAhPSBudWxsKSB7XG4gICAgICAgIHRoaXMucHJvZ3Jlc3MgPSByZXN1bHQodGhpcy5zb3VyY2UsICdwcm9ncmVzcycpO1xuICAgICAgfVxuICAgIH1cblxuICAgIFNjYWxlci5wcm90b3R5cGUudGljayA9IGZ1bmN0aW9uKGZyYW1lVGltZSwgdmFsKSB7XG4gICAgICB2YXIgc2NhbGluZztcbiAgICAgIGlmICh2YWwgPT0gbnVsbCkge1xuICAgICAgICB2YWwgPSByZXN1bHQodGhpcy5zb3VyY2UsICdwcm9ncmVzcycpO1xuICAgICAgfVxuICAgICAgaWYgKHZhbCA+PSAxMDApIHtcbiAgICAgICAgdGhpcy5kb25lID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGlmICh2YWwgPT09IHRoaXMubGFzdCkge1xuICAgICAgICB0aGlzLnNpbmNlTGFzdFVwZGF0ZSArPSBmcmFtZVRpbWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAodGhpcy5zaW5jZUxhc3RVcGRhdGUpIHtcbiAgICAgICAgICB0aGlzLnJhdGUgPSAodmFsIC0gdGhpcy5sYXN0KSAvIHRoaXMuc2luY2VMYXN0VXBkYXRlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY2F0Y2h1cCA9ICh2YWwgLSB0aGlzLnByb2dyZXNzKSAvIG9wdGlvbnMuY2F0Y2h1cFRpbWU7XG4gICAgICAgIHRoaXMuc2luY2VMYXN0VXBkYXRlID0gMDtcbiAgICAgICAgdGhpcy5sYXN0ID0gdmFsO1xuICAgICAgfVxuICAgICAgaWYgKHZhbCA+IHRoaXMucHJvZ3Jlc3MpIHtcbiAgICAgICAgdGhpcy5wcm9ncmVzcyArPSB0aGlzLmNhdGNodXAgKiBmcmFtZVRpbWU7XG4gICAgICB9XG4gICAgICBzY2FsaW5nID0gMSAtIE1hdGgucG93KHRoaXMucHJvZ3Jlc3MgLyAxMDAsIG9wdGlvbnMuZWFzZUZhY3Rvcik7XG4gICAgICB0aGlzLnByb2dyZXNzICs9IHNjYWxpbmcgKiB0aGlzLnJhdGUgKiBmcmFtZVRpbWU7XG4gICAgICB0aGlzLnByb2dyZXNzID0gTWF0aC5taW4odGhpcy5sYXN0UHJvZ3Jlc3MgKyBvcHRpb25zLm1heFByb2dyZXNzUGVyRnJhbWUsIHRoaXMucHJvZ3Jlc3MpO1xuICAgICAgdGhpcy5wcm9ncmVzcyA9IE1hdGgubWF4KDAsIHRoaXMucHJvZ3Jlc3MpO1xuICAgICAgdGhpcy5wcm9ncmVzcyA9IE1hdGgubWluKDEwMCwgdGhpcy5wcm9ncmVzcyk7XG4gICAgICB0aGlzLmxhc3RQcm9ncmVzcyA9IHRoaXMucHJvZ3Jlc3M7XG4gICAgICByZXR1cm4gdGhpcy5wcm9ncmVzcztcbiAgICB9O1xuXG4gICAgcmV0dXJuIFNjYWxlcjtcblxuICB9KSgpO1xuXG4gIHNvdXJjZXMgPSBudWxsO1xuXG4gIHNjYWxlcnMgPSBudWxsO1xuXG4gIGJhciA9IG51bGw7XG5cbiAgdW5pU2NhbGVyID0gbnVsbDtcblxuICBhbmltYXRpb24gPSBudWxsO1xuXG4gIGNhbmNlbEFuaW1hdGlvbiA9IG51bGw7XG5cbiAgUGFjZS5ydW5uaW5nID0gZmFsc2U7XG5cbiAgaGFuZGxlUHVzaFN0YXRlID0gZnVuY3Rpb24oKSB7XG4gICAgaWYgKG9wdGlvbnMucmVzdGFydE9uUHVzaFN0YXRlKSB7XG4gICAgICByZXR1cm4gUGFjZS5yZXN0YXJ0KCk7XG4gICAgfVxuICB9O1xuXG4gIGlmICh3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUgIT0gbnVsbCkge1xuICAgIF9wdXNoU3RhdGUgPSB3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGU7XG4gICAgd2luZG93Lmhpc3RvcnkucHVzaFN0YXRlID0gZnVuY3Rpb24oKSB7XG4gICAgICBoYW5kbGVQdXNoU3RhdGUoKTtcbiAgICAgIHJldHVybiBfcHVzaFN0YXRlLmFwcGx5KHdpbmRvdy5oaXN0b3J5LCBhcmd1bWVudHMpO1xuICAgIH07XG4gIH1cblxuICBpZiAod2luZG93Lmhpc3RvcnkucmVwbGFjZVN0YXRlICE9IG51bGwpIHtcbiAgICBfcmVwbGFjZVN0YXRlID0gd2luZG93Lmhpc3RvcnkucmVwbGFjZVN0YXRlO1xuICAgIHdpbmRvdy5oaXN0b3J5LnJlcGxhY2VTdGF0ZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgaGFuZGxlUHVzaFN0YXRlKCk7XG4gICAgICByZXR1cm4gX3JlcGxhY2VTdGF0ZS5hcHBseSh3aW5kb3cuaGlzdG9yeSwgYXJndW1lbnRzKTtcbiAgICB9O1xuICB9XG5cbiAgU09VUkNFX0tFWVMgPSB7XG4gICAgYWpheDogQWpheE1vbml0b3IsXG4gICAgZWxlbWVudHM6IEVsZW1lbnRNb25pdG9yLFxuICAgIGRvY3VtZW50OiBEb2N1bWVudE1vbml0b3IsXG4gICAgZXZlbnRMYWc6IEV2ZW50TGFnTW9uaXRvclxuICB9O1xuXG4gIChpbml0ID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHR5cGUsIF9qLCBfaywgX2xlbjEsIF9sZW4yLCBfcmVmMiwgX3JlZjMsIF9yZWY0O1xuICAgIFBhY2Uuc291cmNlcyA9IHNvdXJjZXMgPSBbXTtcbiAgICBfcmVmMiA9IFsnYWpheCcsICdlbGVtZW50cycsICdkb2N1bWVudCcsICdldmVudExhZyddO1xuICAgIGZvciAoX2ogPSAwLCBfbGVuMSA9IF9yZWYyLmxlbmd0aDsgX2ogPCBfbGVuMTsgX2orKykge1xuICAgICAgdHlwZSA9IF9yZWYyW19qXTtcbiAgICAgIGlmIChvcHRpb25zW3R5cGVdICE9PSBmYWxzZSkge1xuICAgICAgICBzb3VyY2VzLnB1c2gobmV3IFNPVVJDRV9LRVlTW3R5cGVdKG9wdGlvbnNbdHlwZV0pKTtcbiAgICAgIH1cbiAgICB9XG4gICAgX3JlZjQgPSAoX3JlZjMgPSBvcHRpb25zLmV4dHJhU291cmNlcykgIT0gbnVsbCA/IF9yZWYzIDogW107XG4gICAgZm9yIChfayA9IDAsIF9sZW4yID0gX3JlZjQubGVuZ3RoOyBfayA8IF9sZW4yOyBfaysrKSB7XG4gICAgICBzb3VyY2UgPSBfcmVmNFtfa107XG4gICAgICBzb3VyY2VzLnB1c2gobmV3IHNvdXJjZShvcHRpb25zKSk7XG4gICAgfVxuICAgIFBhY2UuYmFyID0gYmFyID0gbmV3IEJhcjtcbiAgICBzY2FsZXJzID0gW107XG4gICAgcmV0dXJuIHVuaVNjYWxlciA9IG5ldyBTY2FsZXI7XG4gIH0pKCk7XG5cbiAgUGFjZS5zdG9wID0gZnVuY3Rpb24oKSB7XG4gICAgUGFjZS50cmlnZ2VyKCdzdG9wJyk7XG4gICAgUGFjZS5ydW5uaW5nID0gZmFsc2U7XG4gICAgYmFyLmRlc3Ryb3koKTtcbiAgICBjYW5jZWxBbmltYXRpb24gPSB0cnVlO1xuICAgIGlmIChhbmltYXRpb24gIT0gbnVsbCkge1xuICAgICAgaWYgKHR5cGVvZiBjYW5jZWxBbmltYXRpb25GcmFtZSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIGNhbmNlbEFuaW1hdGlvbkZyYW1lKGFuaW1hdGlvbik7XG4gICAgICB9XG4gICAgICBhbmltYXRpb24gPSBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gaW5pdCgpO1xuICB9O1xuXG4gIFBhY2UucmVzdGFydCA9IGZ1bmN0aW9uKCkge1xuICAgIFBhY2UudHJpZ2dlcigncmVzdGFydCcpO1xuICAgIFBhY2Uuc3RvcCgpO1xuICAgIHJldHVybiBQYWNlLnN0YXJ0KCk7XG4gIH07XG5cbiAgUGFjZS5nbyA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBzdGFydDtcbiAgICBQYWNlLnJ1bm5pbmcgPSB0cnVlO1xuICAgIGJhci5yZW5kZXIoKTtcbiAgICBzdGFydCA9IG5vdygpO1xuICAgIGNhbmNlbEFuaW1hdGlvbiA9IGZhbHNlO1xuICAgIHJldHVybiBhbmltYXRpb24gPSBydW5BbmltYXRpb24oZnVuY3Rpb24oZnJhbWVUaW1lLCBlbnF1ZXVlTmV4dEZyYW1lKSB7XG4gICAgICB2YXIgYXZnLCBjb3VudCwgZG9uZSwgZWxlbWVudCwgZWxlbWVudHMsIGksIGosIHJlbWFpbmluZywgc2NhbGVyLCBzY2FsZXJMaXN0LCBzdW0sIF9qLCBfaywgX2xlbjEsIF9sZW4yLCBfcmVmMjtcbiAgICAgIHJlbWFpbmluZyA9IDEwMCAtIGJhci5wcm9ncmVzcztcbiAgICAgIGNvdW50ID0gc3VtID0gMDtcbiAgICAgIGRvbmUgPSB0cnVlO1xuICAgICAgZm9yIChpID0gX2ogPSAwLCBfbGVuMSA9IHNvdXJjZXMubGVuZ3RoOyBfaiA8IF9sZW4xOyBpID0gKytfaikge1xuICAgICAgICBzb3VyY2UgPSBzb3VyY2VzW2ldO1xuICAgICAgICBzY2FsZXJMaXN0ID0gc2NhbGVyc1tpXSAhPSBudWxsID8gc2NhbGVyc1tpXSA6IHNjYWxlcnNbaV0gPSBbXTtcbiAgICAgICAgZWxlbWVudHMgPSAoX3JlZjIgPSBzb3VyY2UuZWxlbWVudHMpICE9IG51bGwgPyBfcmVmMiA6IFtzb3VyY2VdO1xuICAgICAgICBmb3IgKGogPSBfayA9IDAsIF9sZW4yID0gZWxlbWVudHMubGVuZ3RoOyBfayA8IF9sZW4yOyBqID0gKytfaykge1xuICAgICAgICAgIGVsZW1lbnQgPSBlbGVtZW50c1tqXTtcbiAgICAgICAgICBzY2FsZXIgPSBzY2FsZXJMaXN0W2pdICE9IG51bGwgPyBzY2FsZXJMaXN0W2pdIDogc2NhbGVyTGlzdFtqXSA9IG5ldyBTY2FsZXIoZWxlbWVudCk7XG4gICAgICAgICAgZG9uZSAmPSBzY2FsZXIuZG9uZTtcbiAgICAgICAgICBpZiAoc2NhbGVyLmRvbmUpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjb3VudCsrO1xuICAgICAgICAgIHN1bSArPSBzY2FsZXIudGljayhmcmFtZVRpbWUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBhdmcgPSBzdW0gLyBjb3VudDtcbiAgICAgIGJhci51cGRhdGUodW5pU2NhbGVyLnRpY2soZnJhbWVUaW1lLCBhdmcpKTtcbiAgICAgIGlmIChiYXIuZG9uZSgpIHx8IGRvbmUgfHwgY2FuY2VsQW5pbWF0aW9uKSB7XG4gICAgICAgIGJhci51cGRhdGUoMTAwKTtcbiAgICAgICAgUGFjZS50cmlnZ2VyKCdkb25lJyk7XG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGJhci5maW5pc2goKTtcbiAgICAgICAgICBQYWNlLnJ1bm5pbmcgPSBmYWxzZTtcbiAgICAgICAgICByZXR1cm4gUGFjZS50cmlnZ2VyKCdoaWRlJyk7XG4gICAgICAgIH0sIE1hdGgubWF4KG9wdGlvbnMuZ2hvc3RUaW1lLCBNYXRoLm1heChvcHRpb25zLm1pblRpbWUgLSAobm93KCkgLSBzdGFydCksIDApKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZW5xdWV1ZU5leHRGcmFtZSgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9O1xuXG4gIFBhY2Uuc3RhcnQgPSBmdW5jdGlvbihfb3B0aW9ucykge1xuICAgIGV4dGVuZChvcHRpb25zLCBfb3B0aW9ucyk7XG4gICAgUGFjZS5ydW5uaW5nID0gdHJ1ZTtcbiAgICB0cnkge1xuICAgICAgYmFyLnJlbmRlcigpO1xuICAgIH0gY2F0Y2ggKF9lcnJvcikge1xuICAgICAgTm9UYXJnZXRFcnJvciA9IF9lcnJvcjtcbiAgICB9XG4gICAgaWYgKCFkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGFjZScpKSB7XG4gICAgICByZXR1cm4gc2V0VGltZW91dChQYWNlLnN0YXJ0LCA1MCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIFBhY2UudHJpZ2dlcignc3RhcnQnKTtcbiAgICAgIHJldHVybiBQYWNlLmdvKCk7XG4gICAgfVxuICB9O1xuXG4gIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICBkZWZpbmUoWydwYWNlJ10sIGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIFBhY2U7XG4gICAgfSk7XG4gIH0gZWxzZSBpZiAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBQYWNlO1xuICB9IGVsc2Uge1xuICAgIGlmIChvcHRpb25zLnN0YXJ0T25QYWdlTG9hZCkge1xuICAgICAgUGFjZS5zdGFydCgpO1xuICAgIH1cbiAgfVxuXG59KS5jYWxsKHRoaXMpO1xuIiwialF1ZXJ5KGZ1bmN0aW9uKCQpIHtcbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICAvLyBGbGV4eSBoZWFkZXJcbiAgICBmbGV4eV9oZWFkZXIuaW5pdCgpO1xuXG4gICAgLy8gU2lkclxuICAgICQoJy5zbGlua3ktbWVudScpXG4gICAgICAgIC5maW5kKCd1bCwgbGksIGEnKVxuICAgICAgICAucmVtb3ZlQ2xhc3MoKTtcblxuICAgICQoJy5zaWRyLXRvZ2dsZS0tcmlnaHQnKS5zaWRyKHtcbiAgICAgICAgbmFtZTogJ3NpZHItbWFpbicsXG4gICAgICAgIHNpZGU6ICdyaWdodCcsXG4gICAgICAgIHJlbmFtaW5nOiBmYWxzZSxcbiAgICAgICAgYm9keTogJy5sYXlvdXRfX3dyYXBwZXInLFxuICAgICAgICBzb3VyY2U6ICcuc2lkci1zb3VyY2UtcHJvdmlkZXInXG4gICAgfSk7XG5cbiAgICAvLyBTbGlua3lcbiAgICAkKCcuc2lkciAuc2xpbmt5LW1lbnUnKS5zbGlua3koe1xuICAgICAgICB0aXRsZTogdHJ1ZSxcbiAgICAgICAgbGFiZWw6ICcnXG4gICAgfSk7XG5cbiAgICAvLyBFbmFibGUgLyBkaXNhYmxlIEJvb3RzdHJhcCB0b29sdGlwcywgYmFzZWQgdXBvbiB0b3VjaCBldmVudHNcbiAgICBpZihNb2Rlcm5penIudG91Y2hldmVudHMpIHtcbiAgICAgICAgJCgnW2RhdGEtdG9nZ2xlPXRvb2x0aXBdJykudG9vbHRpcCgnaGlkZScpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgJCgnW2RhdGEtdG9nZ2xlPXRvb2x0aXBdJykudG9vbHRpcCgpO1xuICAgIH1cbn0pO1xuIl19
