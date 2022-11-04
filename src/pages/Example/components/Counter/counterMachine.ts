import { assign, createMachine } from 'xstate';

export const COUNTER__STATES = {
  ACTIVE: 'active',
};
export const COUNTER__EVENTS = {
  INCREMENT: 'INCREMENT',
  DECREMENT: 'DECREMENT',
};
export const CounterMachine = createMachine<{ count: number }>({
  initial: COUNTER__STATES.ACTIVE,
    context: {
      count: 0,
      },
    states: {
      [COUNTER__STATES.ACTIVE]: {
          on: {
              [COUNTER__EVENTS.INCREMENT]: {
                  actions: assign({
                    count: (context) => context.count + 1
                  })
              },
              [COUNTER__EVENTS.DECREMENT]: {
                  actions: assign({
                      count: (context) => context.count - 1
                  })
              }
          }
      }
  }
});
