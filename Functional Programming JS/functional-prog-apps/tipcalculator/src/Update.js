import * as R from 'ramda';

const MSGS = {
  BILL_CHANGE: 'BILL_CHANGE',
  TIP_CHANGE: 'TIP_CHANGE'
}

export function billChangeMsg(billAmount) {
  return {
    type: MSGS.BILL_CHANGE,
    billAmount
  }
}

export function tipChangeMsg(tipPercent) {
  return {
    type: MSGS.TIP_CHANGE,
    tipPercent
  }
}

function update(msg, model) {
  let tipAmount;
  let totalAmount;
  switch (msg.type) {
    case MSGS.BILL_CHANGE:
      tipAmount = format(msg.billAmount) * format(model.tipPercent) / 100;
      totalAmount = format(msg.billAmount) + tipAmount;

      return { ...model,
        billAmount: format(msg.billAmount),
        tipAmount: round(tipAmount),
        totalAmount: round(totalAmount)
      }
    case MSGS.TIP_CHANGE:
      tipAmount = format(model.billAmount) * format(msg.tipPercent) / 100;
      totalAmount = format(model.billAmount) + tipAmount;

      return { ...model,
        tipPercent: format(msg.tipPercent),
        tipAmount: round(tipAmount),
        totalAmount: round(totalAmount)
      }
    default:
      return model;
  }
}

function format(value) {
  return R.pipe(parseFloat, R.defaultTo(0))(value);
}

function round(value) {
  return Math.round(value * 100) / 100;
}

export default update;