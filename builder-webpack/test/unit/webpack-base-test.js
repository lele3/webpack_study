const assert = require('assert')

describe('webpack.base.js test case', () => {
  const baseConfig = require('../../lib/webpack.base')
  console.log(baseConfig)
  it('entry', () => {
    assert.equal(baseConfig.entry.index, '/Users/simple/Documents/code/git/git_my/webpack_study/builder-webpack/test/smoke/template/src/index/index.js')
    assert.equal(baseConfig.entry.search, '/Users/simple/Documents/code/git/git_my/webpack_study/builder-webpack/test/smoke/template/src/search/index.js')
  })
})
