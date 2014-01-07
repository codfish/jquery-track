/*!
 * jQuery bindGaEvents Plugin 1.0.0
 * http://github.com/codonnell822/bindGaEvents
 * Copyright 2013, Chris O'Donnell
 *
 * Dymancially set up google analytics events
 * Add class .ga-event to an element
 * Then add html5 data attributes to set the
 */
;(function($) {

  $.fn.bindGaEvents = function(options) {

    if (typeof _gaq !== 'object') {
      return false;
    }

    var settings = $.extend({
      // These are the defaults.
    }, options);

    return this.each(function(i, value) {
      var $this = $(this),
          eventDetails = $.parseJSON($(this).attr('data-ga-event-details')),
          eventType = 'click',
          eventCategory,
          eventAction,
          eventLabel,
          eventValue,
          eventNonInteraction;

      if (eventDetails) {
        eventType = eventDetails.eventType || eventType;
        eventCategory = eventDetails.eventCategory || '';
        eventAction = eventDetails.eventAction || '';
        eventLabel = eventDetails.eventLabel || '';
        eventValue = eventDetails.eventValue || null;
        eventNonInteraction = eventDetails.nonInteraction || false;
      } else {
        eventType = $this.attr('data-ga-event-type') || eventType;
        eventCategory = $this.attr('data-ga-event-category') || '';
        eventAction = $this.attr('data-ga-event-action') || '';
        eventLabel = $this.attr('data-ga-event-label') || '';
        eventValue = parseInt($this.attr('data-ga-event-value'));
        eventValue = isNaN(eventValue) ? null : eventValue;
        eventNonInteraction = ($this.attr('data-ga-event-noninteraction') === 'true');
      }

      if (eventType === 'load') {
        _gaq.push(['_trackEvent', eventCategory, eventAction, eventLabel, eventValue, eventNonInteraction]);
      } else {
        $this.on(eventType, function() {
          _gaq.push(['_trackEvent', eventCategory, eventAction, eventLabel, eventValue, eventNonInteraction]);
        });
      }

    });
  };

}(jQuery));

