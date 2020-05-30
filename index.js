const postcss = require('postcss');
const defaultOptions = {
  prefix: ''
};

module.exports = postcss.plugin('postcss-prefix-all-rules', userOptions => {
  const options = Object.assign({}, defaultOptions, userOptions);

  return (root, result) => {
    root.walkRules(function (rule) {
      let selectors = rule.selector.split(',');

      selectors = selectors.map(selector => {
        let matchArray = selector.match(/(\s*)(\S+)/i);

        return matchArray[1] + options.prefix + ' ' + matchArray[2]
      });

      rule.selector = selectors.join(',');
    });
  }
})
