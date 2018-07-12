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
      className: 'cf ph2-ns'
    }, [
      fieldSet('bn fl w-100 w-third-ns pa2', leftValue, leftUnit, ['Celsius', 'Fahrenheit'], e => dispatch(callback(changeLeftMsg, e))),
      div({
        className: 'fl w-100 w-third-ns pa2'
      }, '='),
      fieldSet('bn fl w-100 w-third-ns pa2', rightValue, rightUnit, ['Celsius', 'Fahrenheit'], e => dispatch(callback(changeRightMsg, e)))
    ]),
    pre(JSON.stringify(model, null, 2)),
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
    className: 'fl w-100 mv2 pv2',
    oninput,
    value
  })
}

function fieldSelect(options, optionSelected, onclick) {
  return select({
    className: 'fl w-100 mv2 pv2',
    onclick
  }, R.map(e => option({
    value: e,
    selected: optionSelected === e
  }, e), options))
}

export default view;