# PostCSS Prefix All Rules

[PostCSS] plugin to prepend a selector in front of all your rules.

[PostCSS]: https://github.com/postcss/postcss

```css
/* Input example */
.foo { }

.bar,
.baz { }
```

```css
/* Output example */
.pre .foo { }

.pre .bar,
.pre .baz { }
```

## Usage

Check you project for existed PostCSS config: `postcss.config.js`
in the project root, `"postcss"` section in `package.json`
or `postcss` in bundle config.

If you already use PostCSS, add the plugin to plugins list:

```diff
module.exports = {
  plugins: [
+   require('postcss-prefix-all-rules')({ prefix: '.pre' }),
    require('autoprefixer')
  ]
}
```

If you do not use PostCSS, add it according to [official docs]
and set this plugin in settings.

[official docs]: https://github.com/postcss/postcss#usage
