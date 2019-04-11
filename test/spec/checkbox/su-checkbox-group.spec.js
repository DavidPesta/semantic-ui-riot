import * as riot from 'riot'
import { init } from '../../helpers/'
import CheckboxGroupComponent from '../../../tags/checkbox/su-checkbox-group.tag'
import CheckboxComponent from '../../../tags/checkbox/su-checkbox.tag'

describe('su-checkbox-group', function () {
  let element, component
  let spyOnChange = sinon.spy()
  init(riot)

  beforeEach(function () {
    riot.register('su-checkbox-group', CheckboxGroupComponent)
    riot.register('su-checkbox', CheckboxComponent)
    element = document.createElement('su-checkbox-group')
    const child1 = document.createElement('su-checkbox')
    child1.setAttribute('value', '1')
    const child2 = document.createElement('su-checkbox')
    child2.setAttribute('value', '2')
    element.appendChild(child1)
    element.appendChild(child2)

    component = riot.mount(element, {
      'onchange': spyOnChange
    })[0]
    riot.mount(child1)
    riot.mount(child2)
  })

  afterEach(function () {
    spyOnChange.reset()
    component.unmount()
    riot.unregister('su-checkbox')
    riot.unregister('su-checkbox-group')
  })

  it('is mounted', function () {
    expect(component).to.be.ok
  })

  it('update value', function () {
    expect(component.$$('su-checkbox')[0].getAttribute("checked")).to.be.not.ok
    expect(component.$$('su-checkbox')[1].getAttribute("checked")).to.be.not.ok

    component.update({ value: '1' })
    expect(component.$$('su-checkbox')[0].getAttribute("checked")).to.be.ok
    expect(component.$$('su-checkbox')[1].getAttribute("checked")).to.be.not.ok
    spyOnChange.should.have.been.calledOnce

    component.update({ value: '2' })
    expect(component.$$('su-checkbox')[0].getAttribute("checked")).to.be.not.ok
    expect(component.$$('su-checkbox')[1].getAttribute("checked")).to.be.ok
    spyOnChange.should.have.been.calledTwice
  })

  it('update option', function () {
    expect(component.$$('su-checkbox')[0].getAttribute("checked")).to.be.not.ok
    expect(component.$$('su-checkbox')[1].getAttribute("checked")).to.be.not.ok

    element.setAttribute('value', '1')
    component.update()
    expect(component.$$('su-checkbox')[0].getAttribute("checked")).to.be.ok
    expect(component.$$('su-checkbox')[1].getAttribute("checked")).to.be.not.ok
    spyOnChange.should.have.been.calledOnce

    element.setAttribute('value', '2')
    component.update()
    expect(component.$$('su-checkbox')[0].getAttribute("checked")).to.be.not.ok
    expect(component.$$('su-checkbox')[1].getAttribute("checked")).to.be.ok
    spyOnChange.should.have.been.calledTwice

    element.setAttribute('value', 1)
    component.update()
    expect(component.$$('su-checkbox')[0].getAttribute("checked")).to.be.ok
    expect(component.$$('su-checkbox')[1].getAttribute("checked")).to.be.not.ok

    element.setAttribute('value', 2)
    component.update()
    expect(component.$$('su-checkbox')[0].getAttribute("checked")).to.be.not.ok
    expect(component.$$('su-checkbox')[1].getAttribute("checked")).to.be.ok

    element.setAttribute('value', '1, 2')
    component.update()
    expect(component.$$('su-checkbox')[0].getAttribute("checked")).to.be.ok
    expect(component.$$('su-checkbox')[1].getAttribute("checked")).to.be.ok

    element.setAttribute('value', [1, 2])
    component.update()
    expect(component.$$('su-checkbox')[0].getAttribute("checked")).to.be.ok
    expect(component.$$('su-checkbox')[1].getAttribute("checked")).to.be.ok
  })

  it('click checkbox', function () {
    expect(component.$$('su-checkbox')[0].getAttribute("checked")).to.be.not.ok
    expect(component.$$('su-checkbox')[1].getAttribute("checked")).to.be.not.ok

    component.$$('su-checkbox input')[0].click()
    expect(component.$$('su-checkbox')[0].getAttribute("checked")).to.be.ok
    expect(component.$$('su-checkbox')[1].getAttribute("checked")).to.be.not.ok
    spyOnChange.should.have.been.calledOnce

    component.$$('su-checkbox input')[1].click()
    expect(component.$$('su-checkbox')[0].getAttribute("checked")).to.be.ok
    expect(component.$$('su-checkbox')[1].getAttribute("checked")).to.be.ok
    spyOnChange.should.have.been.calledTwice
  })

  it('reset value', function () {
    expect(component.state.value).to.be.undefined
    expect(component.defaultValue).to.be.undefined
    expect(component.changed).to.be.not.ok

    component.$$('su-checkbox input')[0].click()
    expect(component.state.value[0]).to.be.equal(component.$$('su-checkbox')[0].getAttribute("value"))
    expect(component.defaultValue).to.be.undefined
    expect(component.changed).to.be.ok

    component.reset()
    expect(component.state.value).to.be.undefined
    expect(component.defaultValue).to.be.undefined
    expect(component.changed).to.be.not.ok
  })
})
