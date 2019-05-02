<su-dropdown
  class="ui selection {props.class} { props.search && 'search' } { props.multiple && 'multiple'} dropdown { isActive() && 'active visible' } { upward && 'upward' }"
  onclick="{ onToggle }" onfocus="{ onFocus }" onmousedown="{ onMousedown }" onmouseup="{ onMouseup }"
  onblur="{ onBlur }" onkeydown="{ onKeydown }" onkeyup="{ onKeyup }" tabindex="{ props.search ? -1 : tabindex }">
  <i class="dropdown icon"></i>
  <input class="search" autocomplete="off" tabindex="{ tabindex }" ref="condition" if="{ props.search }" oninput="{ onInput }"
    onclick="{ stopPropagation }" onfocus="{ onFocus }" onblur="{ onBlur }" readonly="{ readonly }" />
  <a each="{item in props.items}" class="ui label transition visible" style="display: inline-block !important;" if="{ item.selected }"
    onclick="{ stopPropagation }">
    { item.label }
    <i class="delete icon" onclick="{ onUnselect }"></i>
  </a>
  <div class="{ defaultFlg && 'default'} text { filtered && 'filtered' }" if="{ !props.multiple || !selectedFlg }">
    { label }
  </div>

  <div class="menu transition { transitionStatus }" onmousedown="{ onMousedown }" onmouseup="{ onMouseup }"
    onblur="{ onBlur }" tabindex="-1">
    <div each="{item in props.items}" value="{ item.value }" default="{ item.default }" onmousedown="{ onMousedown }"
      onmouseup="{ onMouseup }"
      class="{ isItem(item) && 'item' } { item.header && !filtered && 'header' } { item.divider && !filtered && 'divider' } { item.default && 'default'  } { item.active && 'hover'  } { item.value == value && 'active selected'  }"
      onclick="{ event => onItemClick(event, item) }" if="{ isVisible(item) }">
      <i class="{ item.icon } icon" if="{ item.icon }"></i>
      <img class="ui avatar image" src="{ item.image }" if="{ item.image }" />
      <span class="description" if="{ item.description }">{ item.description }</span>
      <span class="text">{ item.label }</span>
    </div>
    <div class="message" if="{ filtered && filteredItems.length == 0 }">No results found.</div>
  </div>

  <style>
    :host.ui.dropdown .menu>.item.default {
      color: rgba(0, 0, 0, 0.4)
    }

    :host.ui.dropdown .menu>.item.hover {
      background: rgba(0, 0, 0, .05);
      color: rgba(0, 0, 0, .95);
    }

    :host.ui.dropdown .menu {
      display: block;
    }
  </style>

  <script>
    export default {
      state: {
        defaultValue: '',
        filtered: false,
        label: '',
        selectedFlg: false,
        transitionStatus: 'hidden',
        value: '',
      },
      changed: false,
      visibleFlg: false,
      onBeforeMount,
      onMounted,
      onBeforeUpdate,
      onUpdated,

      onBlur,
      onFocus,
      onInput,
      onItemClick,
      onKeydown,
      onKeyup,
      onMousedown,
      onMouseup,
      onToggle,
      onUnselect,
      stopPropagation,

      isActive,
      isItem,
      isVisible,
      reset,
    }

    const keys = {
      enter: 13,
      escape: 27,
      upArrow: 38,
      downArrow: 40,
    }

    // ===================================================================================
    //                                                                           Lifecycle
    //                                                                           =========
    function onBeforeMount(props, state) {
      if (props.items && props.items.length > 0) {
        this.label = props.items[0].label
        this.value = props.items[0].value
        this.defaultFlg = props.items[0].default
      }
    }

    function onMounted(props, state) {
      if (typeof props.value !== 'undefined') {
        this.defaultValue = this.value
        parentUpdate()
      } else {
        this.defaultValue = this.value
      }
      this.update()
    }

    function onBeforeUpdate(props, state) {
      if (props.multiple) {
        const value = this.value ? this.value : []
        const defaultValue = this.defaultValue ? this.defaultValue : []
        return value.toString() !== defaultValue.toString()
      }
      this.changed = this.value !== this.defaultValue
      this.readonly = this.root.classList.contains('read-only')
      this.disabled = this.root.classList.contains('disabled')
      this.tabindex = props.tabindex || '0'
    }

    function onUpdated(props, state) {
      if (props.multiple) {
        props.items.forEach(item => item.selected = false)
        props.items.filter(item => this.value && this.value.indexOf(item.value) >= 0).forEach(item => item.selected = true)
        selectMultiTarget(true)
      } else if (props.items) {
        const selected = props.items.filter(item => item.value === this.value)
        if (selected && selected.length > 0) {
          const target = selected[0]
          if (this.label !== target.label) {
            selectTarget(this, target, true)
          }
        } else if (props.items && props.items.length > 0) {
          if (this.value != props.items[0].value) {
            this.value = props.items[0].value
          }
          if (this.label != props.items[0].label) {
            this.label = props.items[0].label
            this.defaultFlg = props.items[0].default
          }
        }
      }
    }

    function reset() {
      this.value = this.defaultValue
      this.update()
    }

    // ===================================================================================
    //                                                                              Events
    //                                                                              ======
    function onToggle() {
      if (!this.visibleFlg) {
        open(this)
      } else {
        close(this)
      }
    }

    function onFocus() {
      open(this)
    }

    function onMousedown() {
      this.itemActivated = true
    }

    function onMouseup() {
      this.itemActivated = false
    }

    function onBlur() {
      if (!this.itemActivated) {
        if (!this.closing && this.visibleFlg) {
          const target = this.props.multiple ? this.props.items.filter(item => item.selected) : { value: this.value, label: this.label, default: this.defaultFlg }
          this.dispatch('blur', target)
        }
        close(this)
      }
    }

    function onItemClick(event, item) {
      event.stopPropagation()
      if (!this.isItem(item)) {
        return
      }
      if (this.props.multiple) {
        if (!item.default) {
          item.selected = true
        }
        selectMultiTarget(this)
        return
      }
      selectTarget(this, item)
      close(this)
    }

    function onKeydown(event) {
      const keyCode = event.keyCode
      if (keyCode == keys.escape) {
        close(this)
      }
      if (keyCode == keys.downArrow) {
        open(this)
      }
      if (keyCode != keys.upArrow && keyCode != keys.downArrow) {
        return true
      }

      event.preventDefault()
      const searchedItems = this.props.items.filter(item => {
        if (this.props.search && !item.searched) {
          return false
        }
        if (this.props.multiple && (item.default || item.selected)) {
          return false
        }
        return true
      })
      if (searchedItems.length == 0) {
        return true
      }
      if (searchedItems.every(item => !item.active)) {
        searchedItems[0].active = true
        this.update()
        return true
      }

      const activeIndex = parseInt(searchedItems.map((item, index) => item.active ? index : -1).filter(index => index >= 0))
      if (keyCode == keys.upArrow) {
        const nextActiveItem = searchedItems.filter((item, index) => index < activeIndex && !item.header && !item.divider)
        if (nextActiveItem.length > 0) {
          searchedItems[activeIndex].active = false
          nextActiveItem[nextActiveItem.length - 1].active = true
        }
      }
      else if (keyCode == keys.downArrow) {
        const nextActiveItem = searchedItems.filter((item, index) => index > activeIndex && !item.header && !item.divider)
        if (nextActiveItem.length > 0) {
          searchedItems[activeIndex].active = false
          nextActiveItem[0].active = true
        }
      }
      this.update()
      scrollPosition(this)
    }

    function onKeyup(event) {
      const keyCode = event.keyCode
      if (keyCode != keys.enter) {
        return
      }
      const searchedItems = this.props.items.filter(item => item.searched && !item.selected)
      const index = parseInt(searchedItems.map((item, index) => item.active ? index : -1).filter(index => index >= 0))
      const activeItem = searchedItems[index]
      if (!activeItem) {
        return
      }

      if (this.props.multiple) {
        activeItem.selected = true
        activeItem.active = false
        if (index < searchedItems.length - 1) {
          searchedItems[index + 1].active = true
        } else if (index > 0) {
          searchedItems[index - 1].active = true
        }
        selectMultiTarget(this)
      } else {
        activeItem.active = false
        selectTarget(this, activeItem)
        close(this)
      }
    }

    function stopPropagation(event) {
      event.stopPropagation()
    }

    // -----------------------------------------------------
    //                                         search option
    //                                         -------------
    function onInput(event) {
      const value = event.target.value.toLowerCase()
      this.filtered = value.length > 0
      search(this, value)
    }

    // -----------------------------------------------------
    //                                       multiple option
    //                                       ---------------
    function onUnselect(event) {
      event.stopPropagation()
      event.item.item.selected = false
      this.value = this.props.items.filter(item => item.selected).map(item => item.value)
      this.selectedFlg = this.props.items.some(item => item.selected)
      parentUpdate()
    }

    // ===================================================================================
    //                                                                               Logic
    //                                                                               =====
    function open(tag) {
      if (tag.openning || tag.closing || tag.visibleFlg || tag.readonly || tag.disabled) {
        return
      }
      tag.openning = true
      search(tag, '')
      tag.upward = isUpward(tag)
      tag.transitionStatus = `visible animating in slide ${tag.upward ? 'up' : 'down'}`
      tag.props.items.forEach(item => item.active = false)
      setTimeout(() => {
        tag.openning = false
        tag.visibleFlg = true
        tag.transitionStatus = 'visible'
        tag.update()
      }, 300)

      if (tag.props.search) {
        tag.refs.condition.focus()
      }
      tag.update()
      scrollPosition(tag)
      tag.dispatch('open')
    }

    function close(tag) {
      if (tag.closing || !tag.visibleFlg) {
        return
      }
      tag.closing = true
      tag.transitionStatus = `visible animating out slide ${tag.upward ? 'up' : 'down'}`
      setTimeout(() => {
        tag.closing = false
        tag.visibleFlg = false
        tag.transitionStatus = 'hidden'
        tag.update()
      }, 300)

      if (tag.props.search) {
        tag.refs.condition.blur()
        if (tag.filtered && tag.filteredItems.length > 0) {
          selectTarget(tag, tag.filteredItems[0])
        } else {
          tag.refs.condition.value = ''
          tag.filtered = false
        }
      }
      tag.update()
      tag.dispatch('close')
    }

    function selectTarget(tag, target, updating) {
      if (tag.value === target.value &&
        tag.label === target.label &&
        tag.defaultFlg === target.default) {
        if (!updating) {
          tag.dispatch('select', target)
        }
        return
      }
      tag.value = target.value
      tag.label = target.label
      tag.defaultFlg = target.default
      if (tag.props.search) {
        tag.refs.condition.value = ''
        tag.filtered = false
      }
      if (!updating) {
        tag.update()
        // parentUpdate()
        tag.dispatch('select', target)
        tag.dispatch('change', target)
      }
    }

    function selectMultiTarget(tag, updating) {
      if (JSON.stringify(tag.value) == JSON.stringify(props.items.filter(item => item.selected).map(item => item.value))
        && tag.selectedFlg == props.items.some(item => item.selected)) {
        if (!updating) {
          tag.dispatch('select', props.items.filter(item => item.selected))
        }
        return
      }
      tag.value = props.items.filter(item => item.selected).map(item => item.value)
      tag.selectedFlg = props.items.some(item => item.selected)
      if (!updating) {
        tag.update()
        parentUpdate()
        tag.dispatch('select', props.items.filter(item => item.selected))
        tag.dispatch('change', props.items.filter(item => item.selected))
      }
    }

    function search(tag, target) {
      tag.props.items.forEach(item => {
        item.searched = item.label && item.label.toLowerCase().indexOf(target) >= 0
      })
      tag.filteredItems = tag.props.items.filter(item => {
        return item.searched
      })
      tag.update()
      tag.dispatch('search')
    }

    function scrollPosition(tag) {
      const menu = tag.root.querySelector('.menu')
      const item = tag.root.querySelector('.item.hover')

      if (menu && item) {
        const menuScroll = menu.scrollTop
        const itemOffset = item.offsetTop
        const itemHeight = parseInt(document.defaultView.getComputedStyle(item, null).height.replace('px', ''))
        const menuHeight = parseInt(document.defaultView.getComputedStyle(menu, null).height.replace('px', ''))
        const belowPage = menuScroll + menuHeight < itemOffset + itemHeight
        const abovePage = itemOffset < menuScroll
        if (abovePage || belowPage) {
          menu.scrollTop = itemOffset
        }
      }
    }

    function parentUpdate(tag) {
      if (tag.parent) {
        tag.parent.update()
      }
    }

    function isUpward(tag) {
      if (tag.props.direction == 'upward') {
        return true
      }
      if (tag.props.direction == 'downward') {
        return false
      }
      const dropdown = tag.root.getBoundingClientRect()
      const windowHeight = document.documentElement.offsetHeight || document.body.offsetHeight
      const menuHeight = tag.root.querySelector('.menu').getBoundingClientRect().height
      const above = menuHeight <= dropdown.top
      const below = windowHeight >= dropdown.top + dropdown.height + menuHeight

      if (below) {
        return false
      }
      if (!below && !above) {
        return false
      }
      return true
    }

    function isItem(item) {
      return item.searched && !item.header && !item.divider
    }

    function isActive() {
      if (this.closing) {
        return false
      }
      return this.openning || this.visibleFlg
    }

    function isVisible(item) {
      if (this.props.multiple && item.default) {
        return false
      }
      if (item.selected) {
        return false
      }
      return item.searched || item.divider || item.header
    }
  </script>
</su-dropdown>