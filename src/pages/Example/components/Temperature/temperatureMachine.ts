import { assign, createMachine } from 'xstate';

export const TEMPERATURE_STATES = {
  ACTIVE: 'active',
};
export const TEMPERATURE_EVENTS = {
  CELSIUS: 'CELSIUS',
  FAHRENHEIT: 'FAHRENHEIT',
};

export const TemperatureMachine = createMachine<{ C: string | undefined; F: string | undefined }>({
  initial: TEMPERATURE_STATES.ACTIVE,
  context: { C: undefined, F: undefined },
  states: {
    [TEMPERATURE_STATES.ACTIVE]: {
      on: {
        [TEMPERATURE_EVENTS.CELSIUS]: {
          actions: assign({
            C: (_, event) => event.value + '',
            F: (_, event) => (event.value.length ? +event.value * (9 / 5) + 32 + '' : ''),
          }),
        },
        [TEMPERATURE_EVENTS.FAHRENHEIT]: {
          actions: assign({
            C: (_, event) => (event.value.length ? (+event.value - 32) * (5 / 9) + '' : ''),
            F: (_, event) => event.value + '',
          }),
        },
      },
    },
  },
});
