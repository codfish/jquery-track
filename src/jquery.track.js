;(function($, window, undefined) {
  /**
   * @const {Object} Default plugin settings
   */
  const defaults = {
    debug: false,
    nonInteraction: false,
    social: false,
  };

  /**
   * Helper function for debugging.
   */
  const log = function log(fieldsObject, message = null) {
    if (!window || !window.console) {
      return;
    }

    window.console.log('GA', 'send', fieldsObject);
  }

  /**
   * Public helper function to trigger the GA event. Also helps when you aren't
   * able to to attach data attr to DOM nodes and just need to trigger an
   * event immediately.
   *
   * NOTE: If it's a social interaction:
   *   - `eventCategory` maps to `socialNetwork`
   *   - `eventAction` maps to `socialAction`
   *   - `eventLabel` maps to `socialTarget`
   *   - `eventValue` maps to `page`
   *
   * @see {@link https://developers.google.com/analytics/devguides/collection/analyticsjs/events}
   * @see {@link https://developers.google.com/analytics/devguides/collection/analyticsjs/social-interactions}
   *
   * @param {Object}  fieldsObject Object containing GA event data.
   * @param {boolean} debug        Whether debugging is turned on.
   */
  const trigger = function trigger(fieldsObject, debug = false) {
    // if debug mode is on, log the ga event data and return
    // before actually triggering the event.
    if (debug) {
      log(fieldsObject);
      return;
    }

    if (fieldsObject.hitType === 'social') {
      // re-map fields object for social events
      ga('send', {
        hitType: 'social',
        socialNetwork: fieldsObject.eventCategory,
        socialAction: fieldsObject.eventAction,
        socialTarget: fieldsObject.eventLabel || null,
        page: fieldsObject.eventValue || null,
      });

      return;
    }

    // trigger a standard GA event
    ga('send', fieldsObject);
  };

  /**
   * Tracking method that runs for each element in the jQuery object
   * the plugin gets called on.
   *
   * @param  {Object} settings Plugin settings
   */
  const track = function track(settings) {
    const $element = $(this);
    const details = $.parseJSON($element.attr('data-ga-event-details'));

    if (!$.isPlainObject(details)) {
      return;
    }

    const eventType = details.eventType || 'click';
    const isSocial = details.hitType === 'social' || settings.social === true;
    const fieldsObject = {
      hitType: isSocial ? 'social' : 'event',
      eventCategory: details.eventCategory || '',
      eventAction: details.eventAction || '',
      eventLabel: details.eventLabel || null,
      eventValue: details.eventValue || null,
      nonInteraction: details.nonInteraction || settings.nonInteraction,
    };

    // if the event type is anything other than 'load', bind an event handler
    // to the element that will trigger a GA event at the time of user action.
    if (eventType !== 'load') {
      $element.on(eventType, trigger.bind(undefined, fieldsObject, settings.debug));
      return;
    }

    // trigger event immediately when an event type of load is specified
    trigger(fieldsObject, settings.debug);
  };

  /**
   * The jquery-track plugin method. Dymancially set up google analytics events.
   *
   * @see {@link http://github.com/codfish/jquery-track}
   * @see {@link http://learn.jquery.com/plugins/advanced-plugin-concepts/}
   * @see {@link http://extraordinarythoughts.com/2011/08/20/understanding-jquery-plugins/}
   *
   * @param  {Object} options Plugin options
   *
   * @return {jQuery} Returns the jQuery object that `track()` was called on
   *                  to allow for training.
   */
  $.fn.track = function(options) {
    const settings = $.extend({}, $.fn.track.defaults, options);

    return this.each((idx, element) => track.call(element, settings));
  };

  // expose public objects
  $.fn.track.trigger = trigger;
  $.fn.track.defaults = defaults;
}(jQuery, window));
