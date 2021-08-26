let postcss = require('postcss')

let plugin = require('./')

async function run (input, output, opts) {
  let result = await postcss([plugin(opts)]).process(input, { from: undefined })
  expect(result.css).toEqual(output)
  expect(result.warnings()).toHaveLength(0)
}

async function runWarning (input, output, opts) {
  let result = await postcss([plugin(opts)]).process(input, { from: undefined })
  expect(result.css).toEqual(output)
  expect(result.warnings()).toHaveLength(1)
}

it('warns about a missing or empty prefix option', async () => {
  await runWarning('a{ }', 'a{ }', { })
})

it('adds a prefix to simple rules', async () => {
  await run('a{ }', '.pre a{ }', { prefix: '.pre' })
})

it('adds a prefix to nested rules', async () => {
  await run('.foo p { }', '.pre .foo p { }', { prefix: '.pre' })
})

it('adds a prefix to complex rules', async () => {
  await run('.foo:not(.bar) { }', '.pre .foo:not(.bar) { }', { prefix: '.pre' })
})

it('adds a prefix to comma separated rules', async () => {
  await run('a{ }, b{ }', '.pre a{ }, .pre b{ }', { prefix: '.pre' })
})

it('respects whitespace', async () => {
  await run('a   { }, b { }', '.pre a   { }, .pre b { }', { prefix: '.pre' })
})
