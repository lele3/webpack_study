const glob = require('glob-all')

describe('Checking generated js css files', () => {
  it('should generate js css files', (done) => {
    const files = glob.sync([
      './dist/index_*.js',
      './dist/search_*.js',
      './dist/index_*.css',
      './dist/search_*.css',
    ])

    if (files.length > 0) {
      done()
    } else {
      throw new Error('no js css files generated')
    }
  })
})