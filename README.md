# jquery-track

Bind google analytics events to DOM elements easily using HTML5 data elements.

## Install

* [yarn](https://yarnpkg.com/en/package/jquery-track): `yarn add jquery-track`
* [npm](http://npmjs.org/package/jquery-track): `npm install --save jquery-track`
* [Download the latest release on Github](https://github.com/codfish/jquery-track/releases)

## Usage

#### data-ga-event-details attribute

```html
<a href="/"
    class="ga-event"
    data-ga-event-details='{"eventType": "click", "eventCategory": "Site Navigation", "eventAction": "click", "eventLabel": "Home"}'>Home</a>
```

You can send in the following:

  - `eventType` | string (default = `'click'`)
  - `hitType` | string <'event'|'social'> (default = `'event'`)
  - `eventCategory` | string
  - `eventAction` | string
  - `eventLabel` | string
  - `eventValue` | integer (default = `null`)
  - `eventNonInteraction` | boolean (default = `false`)

```js
  $('.ga-event').track();
```

Options
-------

Todo
----

- [ ] Add options
- [ ] Add individual data attributes
- [x] Add umd during build process
- [ ] Add ability for elements created by JS after page load to trigger these events, without needing to initialize

