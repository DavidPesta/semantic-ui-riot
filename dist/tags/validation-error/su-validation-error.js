function onMounted(props, state) {
  this.update();
}

function onBeforeUpdate(props, state) {
  state.errors = props.errors || {};
  state.blockMessage = Object.keys(state.errors).length > 0 && !props.name;
}

var suValidationError = {
  'css': `su-validation-error.ui.error.message,[is="su-validation-error"].ui.error.message{ display: block !important; }`,

  'exports': {
    state: {
      errors: {}
    },

    onMounted,
    onBeforeUpdate
  },

  'template': function(template, expressionTypes, bindingTypes, getComponent) {
    return template(
      '<div expr73="expr73" class="ui basic pointing prompt label transition visible"></div><ul expr75="expr75" class="list"></ul>',
      [{
        'expressions': [{
          'type': expressionTypes.ATTRIBUTE,
          'name': 'class',

          'evaluate': function(scope) {
            return scope.state.blockMessage ? 'ui error message' : '';
          }
        }]
      }, {
        'type': bindingTypes.IF,

        'evaluate': function(scope) {
          return scope.state.errors[scope.props.name];
        },

        'redundantAttribute': 'expr73',
        'selector': '[expr73]',

        'template': template('<div expr74="expr74"></div>', [{
          'expressions': [{
            'type': expressionTypes.ATTRIBUTE,
            'name': 'class',

            'evaluate': function(scope) {
              return 'ui basic pointing prompt label transition visible';
            }
          }]
        }, {
          'type': bindingTypes.EACH,
          'getKey': null,
          'condition': null,

          'template': template(' ', [{
            'expressions': [{
              'type': expressionTypes.TEXT,
              'childNodeIndex': 0,

              'evaluate': function(scope) {
                return scope.message;
              }
            }]
          }]),

          'redundantAttribute': 'expr74',
          'selector': '[expr74]',
          'itemName': 'message',
          'indexName': null,

          'evaluate': function(scope) {
            return scope.state.errors[scope.props.name];
          }
        }])
      }, {
        'type': bindingTypes.IF,

        'evaluate': function(scope) {
          return scope.state.blockMessage;
        },

        'redundantAttribute': 'expr75',
        'selector': '[expr75]',

        'template': template('<template expr76="expr76"></template>', [{
          'expressions': [{
            'type': expressionTypes.ATTRIBUTE,
            'name': 'class',

            'evaluate': function(scope) {
              return 'list';
            }
          }]
        }, {
          'type': bindingTypes.EACH,
          'getKey': null,
          'condition': null,

          'template': template('<li expr77="expr77"></li>', [{
            'type': bindingTypes.EACH,
            'getKey': null,
            'condition': null,

            'template': template(' ', [{
              'expressions': [{
                'type': expressionTypes.TEXT,
                'childNodeIndex': 0,

                'evaluate': function(scope) {
                  return scope.message;
                }
              }]
            }]),

            'redundantAttribute': 'expr77',
            'selector': '[expr77]',
            'itemName': 'message',
            'indexName': null,

            'evaluate': function(scope) {
              return scope.errors;
            }
          }]),

          'redundantAttribute': 'expr76',
          'selector': '[expr76]',
          'itemName': 'errors',
          'indexName': null,

          'evaluate': function(scope) {
            return Object.values(scope.state.errors);
          }
        }])
      }]
    );
  },

  'name': 'su-validation-error'
};

export default suValidationError;
