import * as R from 'ramda';

const MSGS = {
  CHANGE_LEFT: 'CHANGE__LEFT',
  CHANGE_RIGHT: 'CHANGE__RIGHT',
}

export function changeLeftMsg(leftValue, leftUnit) {
  return {
    type: MSGS.CHANGE_LEFT,
    payload: {
      leftValue,
      leftUnit
    }
  }
}

export function changeRightMsg(rightValue, rightUnit) {
  return {
    type: MSGS.CHANGE_RIGHT,
    payload: {
      rightValue,
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
  switch (msg.type) {
    case MSGS.CHANGE_LEFT:
      if (msg.payload.leftUnit === rightUnit) {
        return { ...model,
          leftValue: msg.payload.leftValue,
          leftUnit: msg.payload.leftUnit,
          rightValue: msg.payload.leftValue,
        }
      } else {
        if (msg.payload.leftUnit === 'Celsius') {
          return { ...model,
            leftValue: msg.payload.leftValue,
            leftUnit: msg.payload.leftUnit,
            rightValue: convertCtoF(msg.payload.leftValue),
          }
        } else if (leftUnit === 'Fahrenheit') {
          return { ...model,
            leftValue: msg.payload.leftValue,
            leftUnit: msg.payload.leftUnit,
            rightValue: convertFtoC(msg.payload.leftValue),
          }
        }
      }
    case MSGS.CHANGE_RIGHT:
      if (leftUnit === msg.payload.rightUnit) {
        return { ...model,
          rightValue: msg.payload.rightValue,
          rightUnit: msg.payload.rightUnit,
          leftValue: msg.payload.rightValue
        }
      } else {
        if (leftUnit === 'Celsius') {
          return { ...model,
            rightValue: msg.payload.rightValue,
            rightUnit: msg.payload.rightUnit,
            leftValue: convertCtoF(msg.payload.rightValue),
          }
        } else if (leftUnit === 'Fahrenheit') {
          return { ...model,
            rightValue: msg.payload.rightValue,
            rightUnit: msg.payload.rightUnit,
            leftValue: convertFtoC(msg.payload.rightValue),
          }
        }
      }
    default:
      return model;
  }
}

function convertCtoF(value) {
  return value * 9 / 5 + 32
}

function convertFtoC(value) {
  return (value - 32) * 5 / 9
}

export default update;