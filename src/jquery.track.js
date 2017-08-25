import $ from 'jquery';

/**
 * @const {Object} Default plugin options.
 */
const defaults = {
  debug: false, // debug mode
  prefix: '', // data attribute prefix
  social: false, // GA social event?
};

/**
 * Helper function for debugging.
 *
 * @param {Object} fields       GA event fields object.
 * @param {String} [message=''] Custom message.
 */
const log = function log(fields, message = null) {
  const output = ['jquery-track', 'GA send', fields, message];
  console.log(...output.filter(Boolean));
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
 * @param {Object}  fields Object containing GA event fields.
 * @param {Boolean} debug  Whether debugging is turned on.
 * @param {Event}   evt    jQuery event object
 */
const trigger = function trigger(fields, debug) {
  // if debug mode is on, log the ga event data and return
  // before actually triggering the event.
  if (debug) {
    log(fields);
    return;
  }

  if (fields.hitType === 'social') {
    // re-map fields object for social events
    ga('send', {
      hitType: 'social',
      socialNetwork: fields.eventCategory,
      socialAction: fields.eventAction,
      socialTarget: fields.eventLabel || null,
      page: fields.eventValue || null,
    });

    return;
  }

  // trigger a standard GA event
  ga('send', fields);
};

/**
 * Helper method to build the final `fieldsObject` that will get sent
 * to GA when the event is triggered.
 *
 * This will parse an elements' data attributes for GA event field object
 * values, i.e. category, action, label, etc. If data attributes aren't
 * present on the element, this method will also be responsible for
 * setting default values.
 *
 * @see {@link https://developers.google.com/analytics/devguides/collection/analyticsjs/events#event_fields}
 *
 * @param  {Element} el      HTML element being tracked.
 * @param  {Object}  options Plugin options.
 * @return {Object}          Final GA event `fieldsObject`.
 */
const buildFieldsObject = function (el, options) {
  const prefix = `data-${options.prefix}`;
  const hitType = options.social === true
    ? 'social'
    : el.getAttribute(`${prefix}hit-type`) || 'event';

  return {
    hitType,
    eventCategory: el.getAttribute(`${prefix}event-category`),
    eventAction: el.getAttribute(`${prefix}event-action`),
    eventLabel: el.getAttribute(`${prefix}event-label`) || null,
    eventValue: ~~el.getAttribute(`${prefix}event-value`) || null,
    nonInteraction: !!el.getAttribute(`${prefix}non-interaction`),
    transport: el.getAttribute(`${prefix}transport`) || null,
  }
};

/**
 * Tracking method that sets up event handlers & data for each element
 * in the jQuery object the plugin gets initialized on.
 *
 * @param  {Object} options Plugin options
 */
const track = function track(options) {
  const eventFields = buildFieldsObject(this, options);
  const eventType = this.getAttribute(`data-${options.prefix}event-type`) || 'click';

  // if the event type is anything other than 'load', bind an event handler
  // to the element that will trigger a GA event at the time of user action.
  if (eventType !== 'load') {
    $(this).on(eventType, trigger.bind(undefined, eventFields, options.debug));
    return;
  }

  // trigger event immediately when an event type of load is specified
  trigger(eventFields, options.debug, { type: 'load' });
};

/**
 * The `jquery-track` plugin init method.
 *
 * @see {@link http://github.com/codfish/jquery-track}
 * @see {@link http://learn.jquery.com/plugins/advanced-plugin-concepts/}
 *
 * @param  {Object} options Plugin options.
 * @return {jQuery}         Returns the jQuery object that `track()`
 *                          was called on to allow for training.
 */
const plugin = function plugin(options) {
  options = $.extend({}, $.fn.track.defaults, options);

  return this.each((idx, element) => track.call(element, options));
};

// expose public objects
plugin.trigger = trigger;
plugin.defaults = defaults;
$.fn.extend({ track: plugin });

export default plugin;
