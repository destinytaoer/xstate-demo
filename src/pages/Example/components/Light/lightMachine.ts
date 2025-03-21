import { createMachine } from 'xstate';

export const LIGHT_STATES = {
  RED: 'red',
  GREEN: 'green',
  YELLOW: 'yellow',
};

export const LIGHT_EVENTS = {
  CLICK: 'CLICK',
};

export const LightMachine = createMachine({
  initial: LIGHT_STATES.RED,
  states: {
    [LIGHT_STATES.RED]: {
        on: {
            [LIGHT_EVENTS.CLICK]: LIGHT_STATES.GREEN,
        },
        after: {
            5000: LIGHT_STATES.GREEN
        }
    },
    [LIGHT_STATES.GREEN]: {
        on: {
            [LIGHT_EVENTS.CLICK]: LIGHT_STATES.YELLOW,
        },
        after: {
            3500: LIGHT_STATES.YELLOW
        }
    },
    [LIGHT_STATES.YELLOW]: {
        on: {
            [LIGHT_EVENTS.CLICK]: LIGHT_STATES.RED
        },
        after: {
            1500: LIGHT_STATES.RED
        }
    }
  }
});
