require('../../../dist/tags/loading/su-loading.js')

describe('su-loading', function () {
  let tag
  let app
  let mount = () => {
    tag = riot.mount('su-loading')[0]
    app = riot.mount('app')[0]
  }

  beforeEach(function () {
    riot.mixin('semantic-ui', { observable: riot.observable() })
    riot.tag('app')
    $('body').append(`
      <su-loading></su-loading>
      <app></app>
    `)
  })

  afterEach(function () {
    tag.unmount()
    app.unmount()
  })

  it('is mounted', function () {
    mount()
    tag.isMounted.should.be.true
  })

  it('opens/closes loading', function () {
    mount()
    $('su-loading > .dimmer').is(':visible').should.equal(false)

    app.suLoading(true)
    $('su-loading > .dimmer').is(':visible').should.equal(true)

    app.suLoading(false)
    $('su-loading > .dimmer').is(':visible').should.equal(false)

    app.suLoading(true)
    app.suLoading(true)
    $('su-loading > .dimmer').is(':visible').should.equal(true)
    app.suLoading(false)
    $('su-loading > .dimmer').is(':visible').should.equal(true)
    app.suLoading(false)
    $('su-loading > .dimmer').is(':visible').should.equal(false)
  })
})