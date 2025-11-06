# style-file-input

[![Build Status][ci-img]][ci] [![Browser testing by BrowserStack][browserstack-img]][browserstack]

Style file input element.

[CSS support for styling button element is widely available](https://caniuse.com/mdn-css_selectors_file-selector-button),
but it doesn’t cover case where you want to style chosen filename element.

## Install

```sh
npm install style-file-input --save
```

## Usage

**Markup**

```html
<input type="file" />
```

**Style**

```css
@import url('style-file-input');
```

If you use [PostCSS](https://github.com/postcss/postcss) and
[postcss-import](https://github.com/postcss/postcss-import) plugin, it will automatically use
provided [default styling](https://github.com/niksy/style-file-input/blob/master/index.css).

**Client-side functionality**

```js
const stylefileinput = require('style-file-input');
const element = document.querySelector('input[type="file"]');
const instance = stylefileinput(element);
```

## API

### stylefileinput(element[, options])

Returns: `Object`

#### element

Type: `Element`

Element on which to apply changes.

#### options

Type: `Object`

| Property             | Type     | Default                   | Description                      |
| -------------------- | -------- | ------------------------- | -------------------------------- |
| `browseButtonLabel`  | `String` | `'Browse'`                | Button label for browse action.  |
| `changeButtonLabel`  | `String` | `'Change'`                | Button label for change action.  |
| `noFileSelectedText` | `String` | `'No file selected'`      | Default input value placeholder. |
| `wrapperClass`       | `String` | `'Stylefileinput'`        | Wrapper class.                   |
| `inputClass`         | `String` | `'Stylefileinput-input'`  | Input class.                     |
| `buttonClass`        | `String` | `'Stylefileinput-button'` | Browse/change button class.      |
| `textClass`          | `String` | `'Stylefileinput-text'`   | Input value placeholder class.   |

### instance.destroy()

Destroy instance.

## Browser support

Tested in Chrome 80, Edge 80, Firefox 72 and should work in all modern browsers
([support based on Browserslist configuration](https://browserslist.dev/?q=c2luY2UgMjAyMA%3D%3D)).

## Caveats

- Opera Mini doesn’t fire `change` event when input value is changed so it won’re replace default
  text.

## Acknowledgments

- Based on
  [Filament Group’s jQuery Custom File Input](https://github.com/filamentgroup/jQuery-Custom-File-Input).

## Test

For automated tests, run `npm run test:automated` (append `:watch` for watcher support).

For manual tests, run `npm run test:manual`.

## License

MIT © [Ivan Nikolić](http://ivannikolic.com)  
MIT © [Filament Group](http://www.filamentgroup.com/)

<!-- prettier-ignore-start -->

[ci]: https://github.com/niksy/style-file-input/actions?query=workflow%3ACI
[ci-img]: https://github.com/niksy/style-file-input/actions/workflows/ci.yml/badge.svg?branch=master
[browserstack]: https://www.browserstack.com/
[browserstack-img]: https://img.shields.io/badge/browser%20testing-BrowserStack-informational?logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2NCA2NCI+CiAgPGRlZnMvPgogIDxyYWRpYWxHcmFkaWVudCBpZD0iYSIgY3g9IjIwLjk0Mjk3NiIgY3k9IjI4LjA5NDY3ODczIiByPSIzLjc5MTM0MTQxIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CiAgICA8c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiM3OTc5NzkiLz4KICAgIDxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzRjNGM0YyIvPgogIDwvcmFkaWFsR3JhZGllbnQ+CiAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTI5LjcyOTIwNCAtNTcuMTg3NjExKSBzY2FsZSgyLjk3MjkyKSI+CiAgICA8Y2lyY2xlIGN4PSIyMC43ODkiIGN5PSIzMC4wMjUiIHI9IjEwLjczOSIgZmlsbD0iI2Y0Yjk2MCIvPgogICAgPGNpcmNsZSBjeD0iMTkuNyIgY3k9IjI4LjkzNiIgcj0iOS43IiBmaWxsPSIjZTY2ZjMyIi8+CiAgICA8Y2lyY2xlIGN4PSIyMS4wMzYiIGN5PSIyNy42OTkiIHI9IjguNDEzIiBmaWxsPSIjZTQzYzQxIi8+CiAgICA8Y2lyY2xlIGN4PSIyMS42NzkiIGN5PSIyOC4zNDIiIHI9IjcuNzIiIGZpbGw9IiNiZGQwNDEiLz4KICAgIDxjaXJjbGUgY3g9IjIxLjEzNSIgY3k9IjI4LjkzNiIgcj0iNy4xNzYiIGZpbGw9IiM2ZGI1NGMiLz4KICAgIDxjaXJjbGUgY3g9IjE5Ljk5NyIgY3k9IjI3Ljc0OCIgcj0iNS45ODgiIGZpbGw9IiNhZWRhZTYiLz4KICAgIDxjaXJjbGUgY3g9IjIwLjkzNyIgY3k9IjI2Ljc1OCIgcj0iNS4wNDgiIGZpbGw9IiM1NmI4ZGUiLz4KICAgIDxjaXJjbGUgY3g9IjIxLjU4IiBjeT0iMjcuNDUxIiByPSI0LjQwNSIgZmlsbD0iIzAwYjFkNSIvPgogICAgPGNpcmNsZSBjeD0iMjAuOTM3IiBjeT0iMjguMDQ1IiByPSIzLjc2MSIgZmlsbD0idXJsKCNhKSIvPgogICAgPGNpcmNsZSBjeD0iMjAuOTM3IiBjeT0iMjguMDQ1IiByPSIzLjc2MSIgZmlsbD0iIzIyMWYxZiIvPgogICAgPGVsbGlwc2UgY3g9Ii0xNS4xNTkiIGN5PSIzMS40MDEiIGZpbGw9IiNmZmYiIHJ4PSIxLjE4OCIgcnk9Ii43NDIiIHRyYW5zZm9ybT0icm90YXRlKC02NS44MzQpIi8+CiAgPC9nPgo8L3N2Zz4K

<!-- prettier-ignore-end -->
