import * as R from 'ramda';
import hh from 'hyperscript-helpers';
import {
  h
} from 'virtual-dom';

const {
  div,
  h1,
  pre,
  input,
  label,
  p
} = hh(h);

import {
  billChangeMsg,
  tipChangeMsg
} from './Update';

function view(dispatch, model) {
  const {
    billAmount,
    tipPercent,
    tipAmount,
    totalAmount
  } = model;
  return div({
    className: 'mw6 center'
  }, [
    h1({
      className: 'f2 pv2 bb'
    }, 'Tip Calculator'),
    inputView('Bill Amount', billAmount, e => dispatch(billChangeMsg(e.target.value))),
    inputView('Tip Percent', tipPercent, e => dispatch(tipChangeMsg(e.target.value))),
    resultView(tipAmount, totalAmount)
    //pre(JSON.stringify(model, null, 2)),
  ]);
}

function inputView(labelValue, value, oninput) {
  return div({
    className: 'bn w-100 flex'
  }, [
    label({
      className: 'w-40 pa2 mv2',
    }, labelValue),
    input({
      className: 'w-60 pa2 mv2',
      type: 'text',
      value,
      oninput
    })
  ])
}

function textView(labelValue, value) {
  return div({
    className: 'bn w-100 flex'
  }, [
    p({
      className: 'w-40 pa2 mv2'
    }, labelValue),
    p({
      className: 'w-60 pa2 mv2'
    }, value)
  ]);
}

function resultView(tipAmount, totalAmount) {
  return div([
    textView('Tip Amount:', `${tipAmount} €`),
    textView('Total Amount:', `${totalAmount} €`)
  ])
}

export default view;