// const assert = require('assert')

export default function suite() {
  it('should return "good" when sending "good"', function () {
    // We are receiving the injected subject from the this.test.ctx
    // which are set up during the before hooks

    // const result = this.test.ctx.subject.do('good')

    // assert.strictEqual(result, 'god')
    assert('foo' !== 'foo', 'foo is not bar')
  })
}
