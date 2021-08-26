const postcss = require('postcss')
const defaultOptions = {
  prefix: ''
}

module.exports = postcss.plugin('postcss-prefix-all-rules', userOptions => {
  let options = Object.assign({}, defaultOptions, userOptions)

  return (root, result) => {
    if (options.prefix.trim() === '') {
      return result.warn('No prefix spcified.')
    }

    root.walkRules(rule => {
      let selectors = rule.selector.split(',')

      selectors = selectors.map(selector => {
        let matchArray = selector.match(/(\s*)(\S+.*)/i)

        if (selector.length === 0) {
          return selector
        }

        return matchArray[1] + options.prefix + ' ' + matchArray[2]
      })

      rule.selector = selectors.join(',')
    })

    return result
  }
})
