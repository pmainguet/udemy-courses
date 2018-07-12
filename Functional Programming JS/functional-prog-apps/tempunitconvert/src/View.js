import * as R from 'ramda';
import hh from 'hyperscript-helpers';
import {
  h
} from 'virtual-dom';

const {
  div,
  h1,
  pre,
  fieldset,
  input,
  select,
  option
} = hh(h);

import {
  changeLeftMsg,
  changeRightMsg,
} from './Update';

const UNITS = ['Celsius', 'Fahrenheit', 'Kelvin'];

function view(dispatch, model) {
  const {
    leftValue,
    leftUnit,
    rightValue,
    rightUnit
  } = model;

  return div({
    className: 'mw6 center'
  }, [
    h1({
      className: 'f2 pv2 bb'
    }, 'Temperature Unit Converter'),
    div({
      className: 'flex items-center justify-center ph2-ns'
    }, [
      fieldSet('bn fl w-100 w-third-ns pa2', leftValue, leftUnit, e => dispatch(callback(changeLeftMsg, e))),
      div({
        className: 'fl w-100 w-third-ns pa2 tc'
      }, '='),
      fieldSet('bn fl w-100 w-third-ns pa2', rightValue, rightUnit, e => dispatch(callback(changeRightMsg, e)))
    ])
    // pre(JSON.stringify(model, null, 2)),
  ]);
}

function callback(fn, e) {
  const value = e.target.parentNode.firstChild.value;
  const unit = e.target.parentNode.lastChild.value
  return fn(value, unit)
}

function fieldSet(className, inputValue, unitValue, options, onchange) {
  return fieldset({
    className
  }, [
    fieldInput(inputValue, onchange),
    fieldSelect(options, unitValue, onchange)
  ])
}

function fieldInput(value, oninput) {
  return input({
    className: 'tc fl w-100 mv2 pa2 input-reset ba',
    type: 'text',
    oninput,
    value
  })
}

function fieldSelect(options, optionSelected, onclick) {
  return select({
    className: 'tc fl w-100 pa2 ba input-reset br1 bg-white ba b--black',
    onclick
  }, R.map(e => option({
    value: e,
    selected: optionSelected === e
  }, e), UNITS))
}

export default view;