# jquery-track

Bind google analytics events to DOM elements easily using data attributes.

## Installation

* [yarn](https://yarnpkg.com/en/package/jquery-track): `yarn add jquery-track`
* [npm](http://npmjs.org/package/jquery-track): `npm install --save jquery-track`
* [unpkg](https://unpkg.com) cdn: [minified](https://unpkg.com/jquery-track/dist/jquery.track.min.js) or [unminified](https://unpkg.com/jquery-track/dist/jquery.track.js)
* [Download the latest release on Github](https://github.com/codfish/jquery-track/releases)

## Usage

Basic example using `data-` attributes:

```html
<a href="/"
    data-event-category="Site Navigation"
    data-event-action="click"
    data-event-label="Home">Home</a>
```

```js
// initialize the plugin
$('a').track();
```

### Data attributes

The following data attributes are available, most of which map directly to [GA event fields](https://developers.google.com/analytics/devguides/collection/analyticsjs/events#event_fields).

  - `data-event-type` is the event types you want to trigger the event on. **Default** is `click`. Can be any event type supported by jQuery.
  - `data-hit-type` maps to the `hitType` GA field. _Optional_, defaults to `event`. Can **only** be `event` or [`social`](https://developers.google.com/analytics/devguides/collection/analyticsjs/social-interactions).
  - `data-event-category` maps to the `eventCategory` GA field. **Required**.
  - `data-event-action` maps to the `eventAction` GA field. **Required**.
  - `data-event-label` maps to the `eventLabel` GA field. _Optional_, defaults to `null`.
  - `data-event-value` maps to the `eventValue` GA field. _Optional_, defaults to `null`.
  - `data-non-interation` maps to the `nonInteraction` GA field. _Optional_, defaults to `false`.
  - `data-transport` maps to the `transport` GA field. _Optional_, defaults to `null`.

Further details about the meaning of these fields can be [found in the Google Analytics documentation](https://developers.google.com/analytics/devguides/collection/analyticsjs/events).

## Plugin options

#### debug {Boolean} _Default:_ `false`

Set to true to turn on debug mode. Events will get logged to the browser console, instead of being sent to GA.

```js
$('a').track({ debug: true });
```

#### social {Boolean} _Default:_ `false`

Set to true if you're tracking a [social event]().

```html
<a href="#"
    data-event-category="Twitter"
    data-event-action="tweet"
    data-event-label="http://codfish.io">Tweet</a>
```

```js
$('a').track({ social: true });
```

Alternatively, you can use the `data-hit-type` attribute if you don't want to use the option, or you have a mixture of non-social & social elements you're tracking.

```html
<a href="#"
    data-hit-type="social"
    data-event-category="Twitter"
    data-event-action="tweet"
    data-event-label="http://codfish.io">Tweet</a>
```

#### prefix {String} _Default:_ `''`

Use this option to tell the plugin to grab field values from data attributes with this prefix, i.e. `data-{prefix}event-category`. This can help in the rare instance that you may have a naming conflict with a data attribute.

```html
<a href="/"
    data-ga-event-category="Site Navigation"
    data-ga-event-action="click"
    data-ga-event-label="Home">Home</a>
```

```js
$('a').track({ prefix: 'ga-' });
```

## Todo

- [x] Add options
- [x] Add umd during build process
- [x] Add individual data attributes
- [x] Add `transport: 'beacon'` support. https://developers.google.com/analytics/devguides/collection/analyticsjs/sending-hits#specifying_different_transport_mechanisms
- [ ] Add ability for elements created after pageload to trigger events.
- [ ] Handle multiple event types, i.e. `data-event-type="load click"`
- [ ] Possibly refactor to handle all hit types, i.e. page/app tracking (`pageview`, `screenview`), ecommerce tracking (`transaction` or `item`)
