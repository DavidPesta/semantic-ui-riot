let index = 0;

// ===================================================================================
//                                                                           Lifecycle
//                                                                           =========
function onMounted(props, state) {
  this.su_id = `su-popup-${index++}`;
  if (props.tooltip) {
    if (props.dataTitle) {
      state.content = `<div class="header">${props.dataTitle}</div><div class="content">${props.tooltip}</div>`;
    } else {
      state.content = props.tooltip;
    }
  }
  else if (this.tags['su-popup-content']) {
    state.content = this.$('su-popup-content').root.innerHTML;
    // this.tags['su-popup-content'].unmount()
  }
  document.getElementById(this.su_id).innerHTML = state.content;
  this.update();
}

function onBeforeUpdate(props, state) {
  state.dataVariation = props.dataVariation || '';
  state.nowrap = state.dataVariation.indexOf('wide') < 0;
  state.position = props.position || 'top left';
}

// ===================================================================================
//                                                                               Event
//                                                                               =====
function onMouseOver() {
  this.update({ transitionStatus: 'scale in visible' });
  this.trigger('mouseover');
}

function onMouseOut() {
  this.update({ transitionStatus: 'hidden' });
  this.trigger('mouseout');
}

function stopPropagation(event) {
  event.stopPropagation();
}

var suPopup = {
  'css': `su-popup,[is="su-popup"]{ position: relative; } su-popup .ui.popup,[is="su-popup"] .ui.popup{ position: absolute; } su-popup .ui.popup.nowrap,[is="su-popup"] .ui.popup.nowrap{ white-space: nowrap; } su-popup .ui.popup.wide,[is="su-popup"] .ui.popup.wide{ width: 350px; } su-popup .ui.popup.very.wide,[is="su-popup"] .ui.popup.very.wide{ width: 550px; } su-popup .ui.popup.top.left,[is="su-popup"] .ui.popup.top.left{ top: auto; bottom: 100%; left: 1em; right: auto; margin-left: -1rem; } su-popup .ui.popup.bottom.left,[is="su-popup"] .ui.popup.bottom.left{ top: 100%; bottom: auto; left: 1em; right: auto; margin-left: -1rem; } su-popup .ui.popup.top.center,[is="su-popup"] .ui.popup.top.center{ top: auto; bottom: 100%; left: 50%; right: auto; -webkit-transform: translateX(-50%); transform: translateX(-50%); } su-popup .ui.popup.bottom.center,[is="su-popup"] .ui.popup.bottom.center{ top: 100%; bottom: auto; left: 50%; right: auto; -webkit-transform: translateX(-50%); transform: translateX(-50%); } su-popup .ui.popup.top.center.scale.transition.in,[is="su-popup"] .ui.popup.top.center.scale.transition.in,su-popup .ui.popup.bottom.center.scale.transition.in,[is="su-popup"] .ui.popup.bottom.center.scale.transition.in{ animation-name: xScaleIn } su-popup .ui.popup.top.right,[is="su-popup"] .ui.popup.top.right{ top: auto; bottom: 100%; left: auto; right: 1em; margin-right: -1rem; } su-popup .ui.popup.bottom.right,[is="su-popup"] .ui.popup.bottom.right{ top: 100%; bottom: auto; left: auto; right: 1em; margin-right: -1rem; } su-popup .ui.popup.left.center,[is="su-popup"] .ui.popup.left.center{ left: auto; right: 100%; top: 50%; -webkit-transform: translateY(-50%); transform: translateY(-50%); } su-popup .ui.popup.right.center,[is="su-popup"] .ui.popup.right.center{ left: 100%; right: auto; top: 50%; -webkit-transform: translateY(-50%); transform: translateY(-50%); } su-popup .ui.popup.left.center.scale.transition.in,[is="su-popup"] .ui.popup.left.center.scale.transition.in,su-popup .ui.popup.right.center.scale.transition.in,[is="su-popup"] .ui.popup.right.center.scale.transition.in{ animation-name: yScaleIn } @-webkit-keyframes xScaleIn { 0% { opacity: 0; -webkit-transform: scale(0.8) translateX(-50%); transform: scale(0.8) translateX(-50%); } 100% { opacity: 1; -webkit-transform: scale(1) translateX(-50%); transform: scale(1) translateX(-50%); } } @keyframes xScaleIn { 0% { opacity: 0; -webkit-transform: scale(0.8) translateX(-50%); transform: scale(0.8) translateX(-50%); } 100% { opacity: 1; -webkit-transform: scale(1) translateX(-50%); transform: scale(1) translateX(-50%); } } @-webkit-keyframes yScaleIn { 0% { opacity: 0; -webkit-transform: scale(0.8) translateY(-50%); transform: scale(0.8) translateY(-50%); } 100% { opacity: 1; -webkit-transform: scale(1) translateY(-50%); transform: scale(1) translateY(-50%); } } @keyframes yScaleIn { 0% { opacity: 0; -webkit-transform: scale(0.8) translateY(-50%); transform: scale(0.8) translateY(-50%); } 100% { opacity: 1; -webkit-transform: scale(1) translateY(-50%); transform: scale(1) translateY(-50%); } }`,

  'exports': {
    state: {
      dataVariation: '',
      content: '',
    },

    onMounted,
    onBeforeUpdate,
    onMouseOver,
    onMouseOut,
    stopPropagation
  },

  'template': function(template, expressionTypes, bindingTypes, getComponent) {
    return template('<div expr62></div><slot expr63></slot>', [{
      'expressions': [{
        'type': expressionTypes.EVENT,
        'name': 'onmouseover',

        'evaluate': function(scope) {
          return scope.onMouseOver;
        }
      }, {
        'type': expressionTypes.EVENT,
        'name': 'onmouseout',

        'evaluate': function(scope) {
          return scope.onMouseOut;
        }
      }]
    }, {
      'redundantAttribute': 'expr62',
      'selector': '[expr62]',

      'expressions': [{
        'type': expressionTypes.ATTRIBUTE,
        'name': 'id',

        'evaluate': function(scope) {
          return scope.su_id;
        }
      }, {
        'type': expressionTypes.EVENT,
        'name': 'onmouseover',

        'evaluate': function(scope) {
          return scope.stopPropagation;
        }
      }, {
        'type': expressionTypes.EVENT,
        'name': 'onmouseout',

        'evaluate': function(scope) {
          return scope.stopPropagation;
        }
      }, {
        'type': expressionTypes.ATTRIBUTE,
        'name': 'class',

        'evaluate': function(scope) {
          return [
            'ui popup ',
            scope.state.position,
            ' ',
            scope.state.dataVariation,
            ' transition ',
            scope.state.transitionStatus,
            ' ',
            scope.state.nowrap
          ].join('');
        }
      }]
    }, {
      'type': bindingTypes.SLOT,
      'name': 'default',
      'redundantAttribute': 'expr63',
      'selector': '[expr63]'
    }]);
  },

  'name': 'su-popup'
};

export default suPopup;
