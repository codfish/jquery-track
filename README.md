jQuery Plugin: BindGAEvents
===========================

Bind google analytics events to DOM elements easily using HTML5 data elements.

How To
------

**Method 1** - data-ga-event-details attribute

*HTML:*

```html
  <a href="/" class="ga-event" data-ga-event-details='{"eventType": "click", "eventCategory": "Site Navigation", "eventAction": "click", "eventLabel": "Home"}'>Home</a>
```

You can send in the following:

  - `eventType` | string (default = `'click'`)
  - `eventCategory` | string
  - `eventAction` | string
  - `eventLabel` | string
  - `eventValue` | integer (default = `null`)
  - `eventNonInteraction` | boolean (default = `false`)

*JS:*

```js
  $('.ga-event').bindGaEvents();
  // or
  $('[data-ga-event-details]').bindGaEvents();
```

**Method 2** - multiple data attributes

*HTML:*

```html
  <a href="/" class="ga-event" data-ga-event-type="click" data-ga-event-category="Site Navigation" data-ga-event-action="click" data-ga-event-label="Home">Home</a>
```

*JS:*

```js
  $('.ga-event').bindGaEvents();
```

Options
-------

Todo
----

  - Add options?
  - Choose one method and go with it
  - Add ability for elements created by JS after page load to trigger these events, without needing to initialize (i.e. $(document).on('click', selector, function() { ... }))

