// ===================================================================================
//                                                                           Lifecycle
//                                                                           =========
function onMounted() {
  this.update({
    pages: []
  });
}

function onUpdated(props, state) {
  let needsRegenerate = false;
  if (props.activePage != this.lastpropsActivePage) {
    state.activePage = parseInt(props.activePage || 1);
    this.lastpropsActivePage = state.activePage;
    needsRegenerate = true;
  }
  if (state.activePage != this.lastActivePage) {
    this.lastActivePage = state.activePage;
    needsRegenerate = true;
  }
  if (props.totalPage != this.lastpropsTotalPage) {
    state.totalPage = parseInt(props.totalPage || 1);
    this.lastpropsTotalPage = state.totalPage;
    needsRegenerate = true;
  }

  if (needsRegenerate) {
    generatePagination(this);
  }
}

// ===================================================================================
//                                                                               Event
//                                                                               =====
function onClickPage(e, pageNum) {
  e.preventDefault();
  if (pageNum < 1 || pageNum > this.state.totalPage) {
    return
  }
  this.update({
    activePage: pageNum
  });
  this.dispatch('change', pageNum);
}

// ===================================================================================
//                                                                               Logic
//                                                                               =====
function generatePagination(tag) {
  tag.state.pages = [];
  const activePage = tag.state.activePage;
  const totalPage = tag.state.totalPage;
  const pageSize = calcPageSize(tag.props.pageSize, totalPage);
  const index = calcIndex(activePage, totalPage, pageSize);

  if (pageSize < 1) {
    tag.update();
    return
  }

  for (let i = 0; i < pageSize; i++) {
    tag.state.pages.push({
      number: i + index,
      active: i + index == activePage,
    });
  }
  tag.state.pages[0].number = 1;
  tag.state.pages[pageSize - 1].number = totalPage;
  if (pageSize > 1) {
    tag.state.pages[1].disabled = index != 1;
  }
  if (pageSize > 2) {
    tag.state.pages[pageSize - 2].disabled = index != totalPage - pageSize + 1;
  }

  tag.update();
}

function calcPageSize(pageSize = 7, totalPage = 1) {
  pageSize = parseInt(pageSize);
  return pageSize < totalPage ? pageSize : totalPage
}

function calcIndex(activePage, totalPage, pageSize) {
  const prevPageSize = (pageSize - pageSize % 2) / 2;
  if (activePage + prevPageSize > totalPage) {
    return totalPage - pageSize + 1
  }
  if (activePage > prevPageSize) {
    return activePage - prevPageSize
  }
  return 1
}

var suPagination = {
  'css': null,

  'exports': {
    state: {
      activePage: 1,
      pages: [],
      totalPage: 1,
    },

    lastpropsTotalPage: null,
    lastpropsActivePage: null,
    lastActivePage: null,
    onMounted,
    onUpdated,
    onClickPage
  },

  'template': function(template, expressionTypes, bindingTypes, getComponent) {
    return template(
      '<div expr68="expr68"><a expr69="expr69"><i aria-hidden="true" class="angle double left icon"></i></a><a expr70="expr70"><i class="angle left icon"></i></a><template expr71="expr71"></template><a expr75="expr75"><i class="angle right icon"></i></a><a expr76="expr76"><i aria-hidden="true" class="angle double right icon"></i></a></div>',
      [{
        'redundantAttribute': 'expr68',
        'selector': '[expr68]',

        'expressions': [{
          'type': expressionTypes.ATTRIBUTE,
          'name': 'class',

          'evaluate': function(scope) {
            return ['ui pagination menu ', scope.props.class].join('');
          }
        }]
      }, {
        'redundantAttribute': 'expr69',
        'selector': '[expr69]',

        'expressions': [{
          'type': expressionTypes.ATTRIBUTE,
          'name': 'class',

          'evaluate': function(scope) {
            return ['angle icon item ', scope.state.activePage <= 1 ? 'disabled' : ''].join('');
          }
        }, {
          'type': expressionTypes.EVENT,
          'name': 'onclick',

          'evaluate': function(scope) {
            return event => scope.onClickPage(event,1);
          }
        }]
      }, {
        'redundantAttribute': 'expr70',
        'selector': '[expr70]',

        'expressions': [{
          'type': expressionTypes.ATTRIBUTE,
          'name': 'class',

          'evaluate': function(scope) {
            return ['angle icon item ', scope.state.activePage <= 1 ? 'disabled' : ''].join('');
          }
        }, {
          'type': expressionTypes.EVENT,
          'name': 'onclick',

          'evaluate': function(scope) {
            return event => scope.onClickPage(event,scope.state.activePage - 1);
          }
        }]
      }, {
        'type': bindingTypes.EACH,
        'getKey': null,
        'condition': null,

        'template': template(
          '<a expr72="expr72" class="item"></a><a expr73="expr73" class="active item"></a><div expr74="expr74" class="disabled icon item"></div>',
          [{
            'type': bindingTypes.IF,

            'evaluate': function(scope) {
              return !scope.page.active && !scope.page.disabled;
            },

            'redundantAttribute': 'expr72',
            'selector': '[expr72]',

            'template': template(' ', [{
              'expressions': [{
                'type': expressionTypes.TEXT,
                'childNodeIndex': 0,

                'evaluate': function(scope) {
                  return [scope.page.number].join('');
                }
              }, {
                'type': expressionTypes.ATTRIBUTE,
                'name': 'class',

                'evaluate': function(scope) {
                  return 'item';
                }
              }, {
                'type': expressionTypes.EVENT,
                'name': 'onclick',

                'evaluate': function(scope) {
                  return event => scope.onClickPage(event,scope.page.number);
                }
              }]
            }])
          }, {
            'type': bindingTypes.IF,

            'evaluate': function(scope) {
              return scope.page.active;
            },

            'redundantAttribute': 'expr73',
            'selector': '[expr73]',

            'template': template(' ', [{
              'expressions': [{
                'type': expressionTypes.TEXT,
                'childNodeIndex': 0,

                'evaluate': function(scope) {
                  return scope.page.number;
                }
              }, {
                'type': expressionTypes.ATTRIBUTE,
                'name': 'class',

                'evaluate': function(scope) {
                  return 'active item';
                }
              }]
            }])
          }, {
            'type': bindingTypes.IF,

            'evaluate': function(scope) {
              return scope.page.disabled;
            },

            'redundantAttribute': 'expr74',
            'selector': '[expr74]',

            'template': template('<i class="ellipsis horizontal icon"></i>', [{
              'expressions': [{
                'type': expressionTypes.ATTRIBUTE,
                'name': 'class',

                'evaluate': function(scope) {
                  return 'disabled icon item';
                }
              }]
            }])
          }]
        ),

        'redundantAttribute': 'expr71',
        'selector': '[expr71]',
        'itemName': 'page',
        'indexName': null,

        'evaluate': function(scope) {
          return scope.state.pages;
        }
      }, {
        'redundantAttribute': 'expr75',
        'selector': '[expr75]',

        'expressions': [{
          'type': expressionTypes.ATTRIBUTE,
          'name': 'class',

          'evaluate': function(scope) {
            return [
              'angle icon item ',
              scope.state.activePage >= scope.state.totalPage ? 'disabled' : ''
            ].join('');
          }
        }, {
          'type': expressionTypes.EVENT,
          'name': 'onclick',

          'evaluate': function(scope) {
            return event => scope.onClickPage(event,scope.state.activePage + 1);
          }
        }]
      }, {
        'redundantAttribute': 'expr76',
        'selector': '[expr76]',

        'expressions': [{
          'type': expressionTypes.ATTRIBUTE,
          'name': 'class',

          'evaluate': function(scope) {
            return [
              'angle icon item ',
              scope.state.activePage >= scope.state.totalPage ? 'disabled' : ''
            ].join('');
          }
        }, {
          'type': expressionTypes.EVENT,
          'name': 'onclick',

          'evaluate': function(scope) {
            return event => scope.onClickPage(event,scope.state.totalPage );
          }
        }]
      }]
    );
  },

  'name': 'su-pagination'
};

export default suPagination;
