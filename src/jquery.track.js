/**
 * jQuery Track
 * http://github.com/codfish/jquery-track
 * Copyright 2013-2015, Chris O'Donnell
 *
 * Dymancially set up google analytics events
 * @see http://learn.jquery.com/plugins/advanced-plugin-concepts/
 * @see http://extraordinarythoughts.com/2011/08/20/understanding-jquery-plugins/
 */
;(function($, window, undefined) {

  $.fn.track = function(options) {
    "use strict";

    // Extend our default options with those provided.
    // Note that the first argument to extend is an empty
    // object. this is to keep from overriding our "defaults" object.
    var settings = $.extend({}, $.fn.track.defaults, options);

    return this.each(function(i, value) {
      var $this = $(this),
          eventDetails = $.parseJSON($(this).attr('data-ga-event-details')),
          eventType = 'click',
          eventCategory,
          eventAction,
          eventLabel,
          eventValue,
          nonInteraction,
          isSocial = (eventDetails.hitType === 'social') || settings.social;

      if ($.isPlainObject(eventDetails)) {
        eventType = eventDetails.eventType || eventType;
        eventCategory = eventDetails.eventCategory || eventDetails.category || '';
        eventAction = eventDetails.eventAction || eventDetails.action || '';
        eventLabel = eventDetails.eventLabel || eventDetails.label || null;
        eventValue = eventDetails.eventValue || eventDetails.value || null;
        nonInteraction = eventDetails.nonInteraction || settings.nonInteraction;

        if (eventType === 'load') {
          if (settings.debug) {
            _debug(eventDetails);
          }

          $.fn.track.trigger({
            'hitType': isSocial ? 'social' : 'event',
            'eventCategory': eventCategory,
            'eventAction': eventAction,
            'eventLabel': eventLabel,
            'eventValue': eventValue,
            'nonInteraction': nonInteraction
          });
        } else {
          $this.on(eventType, function(e) {
            if (settings.debug) {
              _debug(eventDetails);
            }

            $.fn.track.trigger({
              'hitType': isSocial ? 'social' : 'event',
              'eventCategory': eventCategory,
              'eventAction': eventAction,
              'eventLabel': eventLabel,
              'eventValue': eventValue,
              'nonInteraction': nonInteraction
            });
          });
        }
      }
    });

    /**
     * Helper function for debugging
     */
    function _debug(output) {
      if (window.console && window.console.log) {
        window.console.log(output);
      }
    }
  };

  /**
   * Default Settings
   */
  $.fn.track.defaults = {
    nonInteraction: false,
    social: false,
    debug: false
  };

  /**
   * Trigger GA Event
   *
   * Helper function to trigger the GA event
   * helps with DRYness. Also helps when you aren't
   * able to to attach data attr to DOM nodes and
   * just need to trigger an event immediately
   *
   * NOTE: If it's a social interaction:
   *   - eventCategory maps to socialNetwork
   *   - eventAction maps to socialAction
   *   - eventLabel maps to socialTarget
   *   - eventValue maps to page
   *
   * @see https://developers.google.com/analytics/devguides/collection/analyticsjs/events
   * @see https://developers.google.com/analytics/devguides/collection/analyticsjs/social-interactions
   * @param {object} eventObj   Object containing GA event data
   */
  $.fn.track.trigger = function(eventObj) {
    // set local var for GA function.
    // WP Yoast uses unique tracker name, check for that for wordpress folk.
    var ga = window.ga || window.__gaTracker;

    if (eventObj.hitType === 'social') {
      return ga('send', 'social', {
        'socialNetwork':  eventObj.eventCategory,
        'socialAction':   eventObj.eventAction,
        'socialTarget':   eventObj.eventLabel || null,
        'page':           eventObj.eventValue || null
      });
    }
    delete eventObj.hitType;
    ga('send', 'event', eventObj);
  };

}(jQuery, window));
