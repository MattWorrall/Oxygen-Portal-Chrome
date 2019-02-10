(function($) {

  $.fn.oxygenSlider = function() {
    var self, slider_width, slider_offset, range, slider;
    self             = $(this);
    slider_width     = self.outerWidth();
    slider_offset    = self.offset().left;

    self.append(slider_tmplt());
    range         = self.find('input[type="range"]');
    slider        = self.find('.slider');
    slider_fill   = slider.find('.slider-fill');
    slider_handle = slider.find('.slider-handle');
    slider_label  = slider.find('.slider-label');

    var range_val = parseInt(range.val());
    slider_fill.css('width', range_val +'%');
    slider_handle.css('left', range_val +'%');
    slider_label.find('span').text(range_val);

    self.on('mousedown', '.slider-handle', function(e) {
      if(e.button === 2) {
        return false;
      }

      var parents       = $(this).parents('.oxygen-slider');
      var slider_width  = parents.outerWidth();
      var slider_offset = parents.offset().left;
      var check_range   = parents.find('input[type="range"]').is(':disabled');

      if(check_range === true) {
        return false;
      }

      $(this).addClass('is-active');

      var handlers = {
        mousemove: function(e) {
          var slider_new_width = e.pageX - slider_offset;

          if(slider_new_width <= slider_width && !(slider_new_width < '0')) {
            slider_move(parents, slider_new_width, slider_width);
          }
        },
        mouseup: function(e) {
          $(this).off(handlers);

          parents.find('.is-active').removeClass('is-active');
        }
      };
      $(document).on(handlers);
    });

    self.on('mousedown', '.slider', function(e) {
      if(e.button === 2) {
        return false;
      }

      var parents       = $(this).parents('.oxygen-slider');
      var slider_width  = parents.outerWidth();
      var slider_offset = parents.offset().left;
      var check_range   = parents.find('input[type="range"]').is(':disabled');

      if(check_range === true) {
        return false;
      }

      var slider_new_width = e.pageX - slider_offset;
      if(slider_new_width <= slider_width && !(slider_new_width < '0')) {
        slider_move(parents, slider_new_width, slider_width);
      }

      var handlers = {
        mouseup: function(e) {
          $(this).off(handlers);
        }
      };
      $(document).on(handlers);

    });
  };

  function slider_tmplt() {
    var tmplt = '<div class="slider">' +
        '<div class="slider-fill"></div>' +
        '<div class="slider-handle"><div class="slider-label"><span>0</span></div></div>' +
        '</div>';

    return tmplt;
  }

  function slider_move(parents, newW, sliderW) {
    var slider_new_val = parseInt(Math.round(newW / sliderW * 100));

    var slider_fill    = parents.find('.slider-fill');
    var slider_handle  = parents.find('.slider-handle');
    var range          = parents.find('input[type="range"]');

    slider_fill.css('width', slider_new_val +'%');
    slider_handle.css({
      'left': slider_new_val +'%',
      'transition': 'none'
    });

    range.val(slider_new_val);

    parents.find('.slider-handle span').text(slider_new_val);
  }

}(jQuery));