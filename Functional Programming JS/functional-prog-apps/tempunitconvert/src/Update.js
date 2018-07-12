import * as R from 'ramda';

const MSGS = {
  CHANGE_LEFT: 'CHANGE__LEFT',
  CHANGE_RIGHT: 'CHANGE__RIGHT',
}

export function changeLeftMsg(leftValue, leftUnit) {
  return {
    type: MSGS.CHANGE_LEFT,
    payload: {
      leftValue: R.pipe(parseInt, R.defaultTo(0))(leftValue),
      leftUnit
    }
  }
}

export function changeRightMsg(rightValue, rightUnit) {
  return {
    type: MSGS.CHANGE_RIGHT,
    payload: {
      rightValue: R.pipe(parseInt, R.defaultTo(0))(rightValue),
      rightUnit
    }
  }
}

function update(msg, model) {
  const {
    leftValue,
    rightValue,
    leftUnit,
    rightUnit
  } = model;
  const {
    type,
    payload
  } = msg;
  switch (type) {
    case MSGS.CHANGE_LEFT:
      if (payload.leftUnit === rightUnit) {
        return { ...model,
          leftValue: payload.leftValue,
          leftUnit: payload.leftUnit,
          rightValue: payload.leftValue,
        }
      } else {
        return { ...model,
          leftValue: payload.leftValue,
          leftUnit: payload.leftUnit,
          rightValue: convert(conversionType(payload.leftUnit, rightUnit), payload.leftValue),
        }
      }
    case MSGS.CHANGE_RIGHT:
      if (leftUnit === payload.rightUnit) {
        return { ...model,
          rightValue: payload.rightValue,
          rightUnit: payload.rightUnit,
          leftValue: payload.rightValue
        }
      } else {
        return { ...model,
          rightValue: payload.rightValue,
          rightUnit: payload.rightUnit,
          leftValue: convert(conversionType(leftUnit, payload.rightUnit), payload.rightValue),
        }
      }
    default:
      return model;
  }
}

function format(number) {
  return Math.round(parseFloat(number * 100)) / 100;
}

function conversionType(leftUnit, rightUnit) {
  return `${leftUnit}to${rightUnit}`;
}

function convert(type, value) {
  switch (type) {
    case 'FahrenheittoCelsius':
      return format(value * 9 / 5 + 32)
    case 'CelsiustoFahrenheit':
      return format((value - 32) * 5 / 9)
    case 'CelsiustoKelvin':
      return format(value - 273.15);
    case 'KelvintoCelsius':
      return format(value + 273.15);
    case 'FahrenheittoKelvin':
      return R.pipe(R.partial(convert, ['FahrenheittoCelsius']), R.partial(convert, ['CelsiustoKelvin']))(value);
    case 'KelvintoFahrenheit':
      return R.pipe(R.partial(convert, ['KelvintoCelsius']), R.partial(convert, ['CelsiustoFahrenheit']))(value);
  }
}

export default update;