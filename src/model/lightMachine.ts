import { createMachine } from 'xstate';

export const LIGHT_STATES = {
  RED: 'RED',
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
    },
    [LIGHT_STATES.GREEN]: {
      on: {
        [LIGHT_EVENTS.CLICK]: LIGHT_STATES.YELLOW,
      },
    },
    [LIGHT_STATES.YELLOW]: {
      on: {
        [LIGHT_EVENTS.CLICK]: LIGHT_STATES.RED,
      },
    },
  },
});
