import { isToday, format, addMonths, startOfMonth, addDays, isSameDay, parse } from 'date-fns';

let index = 0;

// tag.mixin('semantic-ui')

// ===================================================================================
//                                                                           Lifecycle
//                                                                           =========
function onBeforeMount(props, state) {
  this.state.transitionStatus = props.popup ? 'hidden' : 'visible';
  this.weeks = [];
  this.pattern = getPattern(this);
  this.locale = getLocale(this);
  this.tabIndex = getTabindex(this);
  this.weekNames = getWeekNames(this);
  this.su_id = `su-datepicker-${index++}`;
  this.obs.on(`${this.su_id}-reset`, () => { reset(this); });
}

function onMounted(props, state) {
  if (!state.valueAsDate) {
    state.valueAsDate = copyDate(state.value || props.value);
  }
  setValueFromValueAsDate(this);
  if (props.popup) {
    this.$('input').value = state.value;
  }
  this.lastValue = copyDate(state.valueAsDate);
  this.lastPropsValue = copyDate(props.value);

  state.currentDate = copyDate(props.currentDate);
  if (state.valueAsDate) {
    state.currentDate = copyDate(state.valueAsDate);
  }
  if (!state.currentDate) {
    state.currentDate = new Date();
  }
  state.months = getMonthes(this);
  if (props.yearRange && !isNaN(props.yearRange) && props.yearRange > 20) {
    this.yearRange = props.yearRange;
  }
  if (props.startMode === 'year') {
    this.selectYear();
  }
  state.defaultValue = state.valueAsDate;
  this.update();
}

function onBeforeUpdate(props, state) {
  this.readOnly = this.root.classList.contains('read-only') ? "read-only" : '';
  this.disabled = this.root.classList.contains('disabled') ? 'disabled' : '';

  let changed = false;
  if (!isEqualDay(this.lastValue, state.value)) {
    state.valueAsDate = copyDate(state.value);
    this.lastValue = copyDate(state.value);
    changed = true;
  } else if (!isEqualDay(this.lastValue, state.valueAsDate)) {
    this.lastValue = copyDate(state.valueAsDate);
    changed = true;
  } else if (!isEqualDay(this.lastPropsValue, props.value)) {
    state.valueAsDate = copyDate(props.value);
    this.lastPropsValue = copyDate(props.value);
    this.lastValue = copyDate(props.value);
    changed = true;
  }
  setValueFromValueAsDate(this);
  if (changed && props.popup) {
    this.$('input').value = state.value;
  }

  if (changed && state.valueAsDate) {
    state.currentDate = copyDate(state.valueAsDate);
  }
  if (!isEqualDay(this.lastPropsCurrentDate, props.currentDate)) {
    state.currentDate = copyDate(props.currentDate);
    this.lastPropsCurrentDate = copyDate(props.currentDate);
  }
  if (!isEqualDay(this.lastCurrentDate, state.currentDate)) {
    this.lastCurrentDate = copyDate(state.currentDate);
    generate(this);
  }
  this.changed = !isEqualDay(state.valueAsDate, state.defaultValue);
}

function reset(tag) {
  tag.state.valueAsDate = tag.state.defaultValue;
  setValueFromValueAsDate(tag);
  tag.update();
}

// ===================================================================================
//                                                                               Event
//                                                                               =====
function selectMonth() {
  this.yearSelecting = false;
  this.monthSelecting = !this.monthSelecting;
  this.update();
}

function selectYear() {
  this.state.years = getYears(this);
  this.monthSelecting = false;
  this.yearSelecting = !this.yearSelecting;
  this.update();
}

function clickDay(day) {
  if (this.readOnly || this.disabled) {
    return
  }
  setDate(this, day);
  this.dispatch('click', this.state.valueAsDate);
  this.update();
}

function clickMonth(month) {
  this.state.currentDate.setMonth(month.value);
  this.monthSelecting = false;
  this.update();
}

function clickYear(year) {
  this.state.currentDate.setYear(year);
  this.selectMonth();
  this.update();
}

function clickPrevious() {
  if (this.yearSelecting) {
    this.state.years = addYear(this.state.years, -this.yearRange);
  } else {
    this.monthSelecting = false;
    this.state.currentDate = addMonths(this.state.currentDate, -1);
  }
  this.update();
}

function clickNext() {
  if (this.yearSelecting) {
    this.state.years = addYear(this.state.years, this.yearRange);
  } else {
    this.monthSelecting = false;
    this.state.currentDate = addMonths(this.state.currentDate, 1);
  }
  this.update();
}

function clickClear() {
  setDate(this, null);
  this.update();
  this.dispatch('clear', this.state.valueAsDate);
}

function clickToday() {
  setDate(this, new Date());
  this.update();
  this.dispatch('today', this.state.valueAsDate);
}

// -----------------------------------------------------
//                                          popup option
//                                          ------------
function toggle() {
  if (this.readOnly || this.disabled) {
    return
  }
  if (!this.visibleFlg) {
    if (this.props.startMode === 'year') {
      this.selectYear();
      this.yearSelecting = true;
    }
    open(this);
  } else {
    close(this);
  }
  this.update();
}

function onMouseDown() {
  this.itemActivated = true;
  this.update();
}

function onMouseUp() {
  this.itemActivated = false;
  this.update();
}

function onBlur() {
  if (this.props.popup && !this.itemActivated) {
    close(this);
    this.update();
  }
}

// ===================================================================================
//                                                                              Helper
//                                                                              ======
function getCurrentYear() {
  if (this.state.currentDate) {
    return this.state.currentDate.getFullYear()
  }
}

function getCurrentMonthView() {
  if (this.state.currentDate) {
    return format(this.state.currentDate, 'MMM', { locale: this.locale })
  }
}

function getCurrentMonth() {
  return this.state.currentDate.getMonth()
}

function isActive(date) {
  return isEqualDay(this.state.valueAsDate, date)
}

// ===================================================================================
//                                                                               Logic
//                                                                               =====
function generate(tag) {
  const startDate = startOfMonth(tag.state.currentDate);
  const baseDate = addDays(startDate, - startDate.getDay());
  let i = 0;
  tag.weeks = [];

  for (let r = 0; r < 6; r++) {
    const days = [];
    for (let c = 0; c < 7; c++) {
      days.push(addDays(baseDate, i++));
    }
    tag.weeks.push({ days });
  }
}

function addYear(years, range) {
  return years.map(values => {
    values = values.map(value => {
      return value + parseInt(range)
    });
    return values
  })
}

function getYears(tag) {
  const rowSize = ((tag.yearRange - tag.yearRange % 4) / 4) + ((tag.yearRange % 4 != 0) ? 1 : 0);
  const years = new Array();
  for (let index = 0; index < rowSize; index++) {
    years.push([]);
  }
  for (let index = 0; index < tag.yearRange; index++) {
    years[(index - index % 4) / 4][index % 4] = tag.state.currentDate.getFullYear() + index - ((tag.yearRange - tag.yearRange % 2) / 2 - 1);
  }
  return years
}

function getMonthes(tag) {
  const months = [[], [], []];
  const monthNames = range(12).map(month => format(new Date(2018, month, 1), 'MMM', { locale: tag.locale }));
  monthNames.forEach((month, index) => {
    months[(index - index % 4) / 4][index % 4] = {
      label: month,
      value: index
    };
  });
  return months
}

function open(tag) {
  tag.upward = isUpward(tag);
  tag.state.transitionStatus = 'visible';
  tag.visibleFlg = true;
  tag.state.currentDate = copyDate(tag.props.currentDate);
  if (tag.state.valueAsDate) {
    tag.state.currentDate = copyDate(tag.state.valueAsDate);
  }
  if (!tag.state.currentDate) {
    tag.state.currentDate = new Date();
  }
  tag.dispatch('open', tag.state.valueAsDate);
}

function close(tag) {
  tag.state.transitionStatus = 'hidden';
  tag.visibleFlg = false;
  tag.dispatch('close', tag.state.valueAsDate);
}

function setDate(tag, date) {
  tag.state.valueAsDate = date;
  setValueFromValueAsDate(tag);
  if (tag.props.popup) {
    tag.$('input').value = tag.state.value;
    close(tag);
  }
  tag.dispatch('change', tag.state.valueAsDate);
}

function setValueFromValueAsDate(tag) {
  tag.state.value = tag.state.valueAsDate ? format(tag.state.valueAsDate, tag.pattern, { locale: tag.locale }) : null;
}

function isEqualDay(d1, d2) {
  if (d1 == d2) {
    return true
  }
  if (typeof d1 === 'undefined' || typeof d2 === 'undefined' || d1 === null || d2 === null) {
    return false
  }
  return isSameDay(d1, d2)
}

function copyDate(date) {
  if (!date) {
    return date
  }
  return parse(date)
}

function isUpward(tag) {
  if (tag.props.direction == 'upward') {
    return true
  }
  if (tag.props.direction == 'downward') {
    return false
  }
  const inputField = tag.root.getBoundingClientRect();
  const windowHeight = document.documentElement.offsetHeight || document.body.offsetHeight;
  const menuHeight = tag.root.querySelector('.menu').getBoundingClientRect().height;
  const above = menuHeight <= inputField.top;
  const below = windowHeight >= inputField.top + inputField.height + menuHeight;

  if (below) {
    return false
  }
  if (!below && !above) {
    return false
  }
  return true
}

function getWeekNames(tag) {
  return range(7, 1).map(day => format(new Date(2018, 6, day), 'dd', { locale: tag.locale }))
}

function getTabindex(tag) {
  if (!tag.props.popup) {
    return false
  }
  if (tag.props.tabindex) {
    return tag.props.tabindex
  }
  return 0
}

function getPattern(tag) {
  if (tag.props.pattern) {
    return tag.props.pattern
  }
  if (tag.defaultOptions && tag.defaultOptions.pattern) {
    return tag.defaultOptions.pattern
  }
  return 'YYYY-MM-DD'
}

function getLocale(tag) {
  if (tag.props.locale) {
    return tag.props.locale
  }
  if (tag.defaultOptions && tag.defaultOptions.locale) {
    return tag.defaultOptions.locale
  }
}

function range(size, startAt = 0) {
  return Array.from(Array(size).keys()).map(i => i + startAt)
}

var suDatepicker = {
  'css': `su-datepicker .ui.segment,[is="su-datepicker"] .ui.segment{
      padding-top: 0.5rem;
      padding-bottom: 0.5rem;
    } su-datepicker .ui.dropdown .menu,[is="su-datepicker"] .ui.dropdown .menu{
      display: block;
    } su-datepicker .ui.buttons.dp-navigation,[is="su-datepicker"] .ui.buttons.dp-navigation{
      margin-bottom: 0.4rem;
    } su-datepicker .ui.dropdown,[is="su-datepicker"] .ui.dropdown{
      display: block;
    } su-datepicker .dp-wrapper,[is="su-datepicker"] .dp-wrapper{
      display: flex;
    } su-datepicker .dp-day,[is="su-datepicker"] .dp-day,su-datepicker .dp-month,[is="su-datepicker"] .dp-month{
      cursor: pointer;
    } su-datepicker .dp-weekday,[is="su-datepicker"] .dp-weekday,su-datepicker .dp-day,[is="su-datepicker"] .dp-day,su-datepicker .dp-day .ui.button,[is="su-datepicker"] .dp-day .ui.button{
      width: 2.5rem;
    } su-datepicker .dp-month,[is="su-datepicker"] .dp-month,su-datepicker .dp-month .ui.button,[is="su-datepicker"] .dp-month .ui.button{
      width: 4.375rem;
    } su-datepicker .dp-day .ui.button,[is="su-datepicker"] .dp-day .ui.button,su-datepicker .dp-month .ui.button,[is="su-datepicker"] .dp-month .ui.button{
      padding: 0;
      height: 2.5rem;
      font-weight: normal
    } su-datepicker .dp-day .ui.button.today,[is="su-datepicker"] .dp-day .ui.button.today{
      font-weight: 700;
    } su-datepicker .dp-today .ui.button,[is="su-datepicker"] .dp-today .ui.button,su-datepicker .dp-clear .ui.button,[is="su-datepicker"] .dp-clear .ui.button,su-datepicker .dp-navigation .ui.button,[is="su-datepicker"] .dp-navigation .ui.button,su-datepicker .dp-month .ui.button,[is="su-datepicker"] .dp-month .ui.button,su-datepicker .dp-day .ui.button.non-active,[is="su-datepicker"] .dp-day .ui.button.non-active{
      background-color: transparent;
    } su-datepicker .dp-today .ui.button:hover,[is="su-datepicker"] .dp-today .ui.button:hover,su-datepicker .dp-clear .ui.button:hover,[is="su-datepicker"] .dp-clear .ui.button:hover,su-datepicker .dp-navigation .ui.button:hover,[is="su-datepicker"] .dp-navigation .ui.button:hover,su-datepicker .dp-month .ui.button:hover,[is="su-datepicker"] .dp-month .ui.button:hover,su-datepicker .dp-day .ui.button.non-active:hover,[is="su-datepicker"] .dp-day .ui.button.non-active:hover{
      background-color: #e0e1e2;
    } su-datepicker .dp-day .ui.button.disabled,[is="su-datepicker"] .dp-day .ui.button.disabled{
      pointer-events: all !important;
    } su-datepicker .dp-navigation,[is="su-datepicker"] .dp-navigation{
      width: 100%;
    } su-datepicker .dp-navigation .ui.button,[is="su-datepicker"] .dp-navigation .ui.button{
      width: 20%;
    } su-datepicker .dp-navigation .ui.button.year,[is="su-datepicker"] .dp-navigation .ui.button.year,su-datepicker .dp-navigation .ui.button.month,[is="su-datepicker"] .dp-navigation .ui.button.month{
      width: 30%;
    }`,

  'exports': {
    state: {
      currentDate: null,
      defaultValue: null,
      value: null,
      valueAsDate: null,
      weeks: [],
    },

    visibleFlg: false,
    itemActivated: false,
    lastValue: null,
    lastPropsValue: null,
    lastCurrentDate: null,
    lastPropsCurrentDate: null,
    yearRange: 20,
    onBeforeMount,
    onMounted,
    onBeforeUpdate,
    clickDay,
    clickMonth,
    clickYear,
    clickPrevious,
    clickNext,
    clickClear,
    clickToday,
    selectMonth,
    selectYear,
    toggle,
    onMouseDown,
    onMouseUp,
    onBlur,
    getCurrentYear,
    getCurrentMonthView,
    getCurrentMonth,
    isActive,
    isToday
  },

  'template': function(template, expressionTypes, bindingTypes, getComponent) {
    return template(
      '<div expr179><div expr180></div><div expr183><div class="ui compact segments"><div class="ui center aligned secondary segment"><div class="ui buttons dp-navigation"><button expr184 type="button"><i class="chevron left icon"></i></button><button expr185 type="button"><!----></button><button expr186 type="button"><!----></button><button expr187 type="button"><i class="chevron right icon"></i></button></div><div class="dp-wrapper"><div expr188 class="dp-weekday"></div></div></div><div expr189 class="ui center aligned segment"></div><div expr193 class="ui center aligned segment"></div><div expr196 class="ui center aligned segment"></div><div expr200 class="ui center aligned segment"></div></div></div></div>',
      [{
        'expressions': [{
          'type': expressionTypes.VALUE,

          'evaluate': function(scope) {
            return scope.state.value;
          }
        }, {
          'type': expressionTypes.ATTRIBUTE,
          'name': 'changed',

          'evaluate': function(scope) {
            return scope.changed;
          }
        }, {
          'type': expressionTypes.ATTRIBUTE,
          'name': 'id',

          'evaluate': function(scope) {
            return scope.su_id;
          }
        }]
      }, {
        'redundantAttribute': 'expr179',
        'selector': '[expr179]',

        'expressions': [{
          'type': expressionTypes.ATTRIBUTE,
          'name': 'class',

          'evaluate': function(scope) {
            return [
              'ui ',
              scope.props.popup ? 'dropdown' : '',
              ' ',
              scope.upward ? 'upward' : ''
            ].join('');
          }
        }]
      }, {
        'type': bindingTypes.IF,

        'evaluate': function(scope) {
          return scope.props.popup;
        },

        'redundantAttribute': 'expr180',
        'selector': '[expr180]',

        'template': template(
          '<input expr181 type="text"/><button expr182 type="button"><i class="calendar icon"></i></button>',
          [{
            'expressions': [{
              'type': expressionTypes.ATTRIBUTE,
              'name': 'class',

              'evaluate': function(scope) {
                return ['ui action input ', scope.disabled].join('');
              }
            }]
          }, {
            'redundantAttribute': 'expr181',
            'selector': '[expr181]',

            'expressions': [{
              'type': expressionTypes.ATTRIBUTE,
              'name': 'placeholder',

              'evaluate': function(scope) {
                return scope.props.placeholder;
              }
            }, {
              'type': expressionTypes.ATTRIBUTE,
              'name': 'tabindex',

              'evaluate': function(scope) {
                return scope.tabIndex;
              }
            }, {
              'type': expressionTypes.ATTRIBUTE,
              'name': 'readonly',

              'evaluate': function(scope) {
                return scope.readOnly;
              }
            }]
          }, {
            'redundantAttribute': 'expr182',
            'selector': '[expr182]',

            'expressions': [{
              'type': expressionTypes.ATTRIBUTE,
              'name': 'class',

              'evaluate': function(scope) {
                return ['ui icon button ', scope.disabled].join('');
              }
            }, {
              'type': expressionTypes.EVENT,
              'name': 'onclick',

              'evaluate': function(scope) {
                return scope.toggle;
              }
            }, {
              'type': expressionTypes.EVENT,
              'name': 'onblur',

              'evaluate': function(scope) {
                return scope.onBlur;
              }
            }]
          }]
        )
      }, {
        'redundantAttribute': 'expr183',
        'selector': '[expr183]',

        'expressions': [{
          'type': expressionTypes.ATTRIBUTE,
          'name': 'class',

          'evaluate': function(scope) {
            return ['menu transition ', scope.state.transitionStatus].join('');
          }
        }, {
          'type': expressionTypes.EVENT,
          'name': 'onmousedown',

          'evaluate': function(scope) {
            return scope.onMouseDown;
          }
        }, {
          'type': expressionTypes.EVENT,
          'name': 'onmouseup',

          'evaluate': function(scope) {
            return scope.onMouseUp;
          }
        }, {
          'type': expressionTypes.EVENT,
          'name': 'onblur',

          'evaluate': function(scope) {
            return scope.onBlur;
          }
        }, {
          'type': expressionTypes.ATTRIBUTE,
          'name': 'tabindex',

          'evaluate': function(scope) {
            return scope.tabIndex;
          }
        }]
      }, {
        'redundantAttribute': 'expr184',
        'selector': '[expr184]',

        'expressions': [{
          'type': expressionTypes.ATTRIBUTE,
          'name': 'class',

          'evaluate': function(scope) {
            return ['icon tiny ui button ', scope.disabled, ' prev'].join('');
          }
        }, {
          'type': expressionTypes.EVENT,
          'name': 'onclick',

          'evaluate': function(scope) {
            return scope.clickPrevious;
          }
        }]
      }, {
        'redundantAttribute': 'expr185',
        'selector': '[expr185]',

        'expressions': [{
          'type': expressionTypes.TEXT,
          'childNodeIndex': 0,

          'evaluate': function(scope) {
            return scope.getCurrentMonthView();
          }
        }, {
          'type': expressionTypes.ATTRIBUTE,
          'name': 'class',

          'evaluate': function(scope) {
            return ['ui button ', scope.disabled, ' month'].join('');
          }
        }, {
          'type': expressionTypes.EVENT,
          'name': 'onclick',

          'evaluate': function(scope) {
            return scope.selectMonth;
          }
        }]
      }, {
        'redundantAttribute': 'expr186',
        'selector': '[expr186]',

        'expressions': [{
          'type': expressionTypes.TEXT,
          'childNodeIndex': 0,

          'evaluate': function(scope) {
            return scope.getCurrentYear();
          }
        }, {
          'type': expressionTypes.ATTRIBUTE,
          'name': 'class',

          'evaluate': function(scope) {
            return ['ui button ', scope.disabled, ' year'].join('');
          }
        }, {
          'type': expressionTypes.EVENT,
          'name': 'onclick',

          'evaluate': function(scope) {
            return scope.selectYear;
          }
        }]
      }, {
        'redundantAttribute': 'expr187',
        'selector': '[expr187]',

        'expressions': [{
          'type': expressionTypes.ATTRIBUTE,
          'name': 'class',

          'evaluate': function(scope) {
            return ['icon tiny ui button ', scope.disabled, ' next'].join('');
          }
        }, {
          'type': expressionTypes.EVENT,
          'name': 'onclick',

          'evaluate': function(scope) {
            return scope.clickNext;
          }
        }]
      }, {
        'type': bindingTypes.EACH,
        'getKey': null,
        'condition': null,

        'template': template('<!---->', [{
          'expressions': [{
            'type': expressionTypes.TEXT,
            'childNodeIndex': 0,

            'evaluate': function(scope) {
              return scope.week;
            }
          }]
        }]),

        'redundantAttribute': 'expr188',
        'selector': '[expr188]',
        'itemName': 'week',
        'indexName': null,

        'evaluate': function(scope) {
          return scope.weekNames;
        }
      }, {
        'type': bindingTypes.IF,

        'evaluate': function(scope) {
          return !scope.yearSelecting && !scope.monthSelecting;
        },

        'redundantAttribute': 'expr189',
        'selector': '[expr189]',

        'template': template('<div expr190 class="dp-wrapper"></div>', [{
          'type': bindingTypes.EACH,
          'getKey': null,
          'condition': null,

          'template': template('<div expr191 class="dp-day"></div>', [{
            'type': bindingTypes.EACH,
            'getKey': null,
            'condition': null,

            'template': template('<button expr192 type="button"><!----></button>', [{
              'redundantAttribute': 'expr192',
              'selector': '[expr192]',

              'expressions': [{
                'type': expressionTypes.TEXT,
                'childNodeIndex': 0,

                'evaluate': function(scope) {
                  return scope.day.getDate();
                }
              }, {
                'type': expressionTypes.ATTRIBUTE,
                'name': 'class',

                'evaluate': function(scope) {
                  return [
                    'ui button ',
                    scope.isToday(scope.day) ? 'today' : '',
                    ' ',
                    scope.isActive(scope.day) ? 'primary' : 'non-active',
                    ' ',
                    scope.day.getMonth() != scope.getCurrentMonth() || scope.disabled ? 'disabled' : ''
                  ].join('');
                }
              }, {
                'type': expressionTypes.EVENT,
                'name': 'onclick',

                'evaluate': function(scope) {
                  return () => scope.clickDay(scope.day);
                }
              }]
            }]),

            'redundantAttribute': 'expr191',
            'selector': '[expr191]',
            'itemName': 'day',
            'indexName': null,

            'evaluate': function(scope) {
              return scope.week.days;
            }
          }]),

          'redundantAttribute': 'expr190',
          'selector': '[expr190]',
          'itemName': 'week',
          'indexName': null,

          'evaluate': function(scope) {
            return scope.weeks;
          }
        }])
      }, {
        'type': bindingTypes.IF,

        'evaluate': function(scope) {
          return !scope.yearSelecting && !scope.monthSelecting;
        },

        'redundantAttribute': 'expr193',
        'selector': '[expr193]',

        'template': template(
          '<div class="ui two column grid"><div class="column dp-clear"><button expr194 type="button"><i class="times icon"></i></button></div><div class="column dp-today"><button expr195 type="button"><i class="calendar check icon"></i></button></div></div>',
          [{
            'redundantAttribute': 'expr194',
            'selector': '[expr194]',

            'expressions': [{
              'type': expressionTypes.ATTRIBUTE,
              'name': 'class',

              'evaluate': function(scope) {
                return ['ui icon fluid button ', scope.disabled].join('');
              }
            }, {
              'type': expressionTypes.EVENT,
              'name': 'onclick',

              'evaluate': function(scope) {
                return scope.clickClear;
              }
            }]
          }, {
            'redundantAttribute': 'expr195',
            'selector': '[expr195]',

            'expressions': [{
              'type': expressionTypes.ATTRIBUTE,
              'name': 'class',

              'evaluate': function(scope) {
                return ['ui icon fluid button ', scope.disabled].join('');
              }
            }, {
              'type': expressionTypes.EVENT,
              'name': 'onclick',

              'evaluate': function(scope) {
                return scope.clickToday;
              }
            }]
          }]
        )
      }, {
        'type': bindingTypes.IF,

        'evaluate': function(scope) {
          return scope.monthSelecting;
        },

        'redundantAttribute': 'expr196',
        'selector': '[expr196]',

        'template': template('<div expr197 class="dp-wrapper"></div>', [{
          'type': bindingTypes.EACH,
          'getKey': null,
          'condition': null,

          'template': template('<div expr198 class="dp-month"></div>', [{
            'type': bindingTypes.EACH,
            'getKey': null,
            'condition': null,

            'template': template('<button expr199 type="button"><!----></button>', [{
              'redundantAttribute': 'expr199',
              'selector': '[expr199]',

              'expressions': [{
                'type': expressionTypes.TEXT,
                'childNodeIndex': 0,

                'evaluate': function(scope) {
                  return scope.month.label;
                }
              }, {
                'type': expressionTypes.ATTRIBUTE,
                'name': 'class',

                'evaluate': function(scope) {
                  return ['ui button ', scope.disabled].join('');
                }
              }, {
                'type': expressionTypes.EVENT,
                'name': 'onclick',

                'evaluate': function(scope) {
                  return () => scope.clickMonth(scope.month);
                }
              }]
            }]),

            'redundantAttribute': 'expr198',
            'selector': '[expr198]',
            'itemName': 'month',
            'indexName': null,

            'evaluate': function(scope) {
              return scope.element;
            }
          }]),

          'redundantAttribute': 'expr197',
          'selector': '[expr197]',
          'itemName': 'element',
          'indexName': null,

          'evaluate': function(scope) {
            return scope.state.months;
          }
        }])
      }, {
        'type': bindingTypes.IF,

        'evaluate': function(scope) {
          return scope.yearSelecting;
        },

        'redundantAttribute': 'expr200',
        'selector': '[expr200]',

        'template': template('<div expr201 class="dp-wrapper"></div>', [{
          'type': bindingTypes.EACH,
          'getKey': null,
          'condition': null,

          'template': template('<div expr202 class="dp-month"></div>', [{
            'type': bindingTypes.EACH,
            'getKey': null,
            'condition': null,

            'template': template('<button expr203 type="button"><!----></button>', [{
              'redundantAttribute': 'expr203',
              'selector': '[expr203]',

              'expressions': [{
                'type': expressionTypes.TEXT,
                'childNodeIndex': 0,

                'evaluate': function(scope) {
                  return scope.year;
                }
              }, {
                'type': expressionTypes.ATTRIBUTE,
                'name': 'class',

                'evaluate': function(scope) {
                  return ['ui button ', scope.disabled].join('');
                }
              }, {
                'type': expressionTypes.EVENT,
                'name': 'onclick',

                'evaluate': function(scope) {
                  return () =>scope.clickYear(scope.year);
                }
              }]
            }]),

            'redundantAttribute': 'expr202',
            'selector': '[expr202]',
            'itemName': 'year',
            'indexName': null,

            'evaluate': function(scope) {
              return scope.element;
            }
          }]),

          'redundantAttribute': 'expr201',
          'selector': '[expr201]',
          'itemName': 'element',
          'indexName': null,

          'evaluate': function(scope) {
            return scope.state.years;
          }
        }])
      }]
    );
  },

  'name': 'su-datepicker'
};

export default suDatepicker;
