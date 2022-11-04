import { assign, createMachine } from 'xstate';

export const FLIGHT_STATES = {
  EDITING: 'editing',
  SUBMITTED: 'submitted',
};

export const FLIGHT_EVENTS = {
  SET_TRIP: 'SET_TRIP',
  SUBMIT: 'SUBMIT',
  SET_START_DATE: 'SET_START_DATE',
  SET_RETURN_DATE: 'SET_RETURN_DATE',
};

interface FlightContext {
  startDate?: string;
  returnDate?: string;
  trip: 'oneWay' | 'roundTrip';
}

export const FlightMachine = createMachine<FlightContext>({
  initial: FLIGHT_STATES.EDITING,
  context: {
    startDate: '',
    returnDate: '',
    trip: 'oneWay',
  },
  states: {
      [FLIGHT_STATES.EDITING]: {
          on: {
              [FLIGHT_EVENTS.SUBMIT]: {
                 target: FLIGHT_STATES.SUBMITTED,
                  cond: (context) => {
                     if (context.trip === 'oneWay') {
                         return !!context.startDate
                     }
                      return !!context.startDate && !!context.returnDate && context.returnDate > context.startDate
                 }
              },
              [FLIGHT_EVENTS.SET_TRIP]: {
                  actions: 'setTrip',
                  cond: (_, event) => event.value === 'oneWay' || event.value === 'roundTrip',
              },
              [FLIGHT_EVENTS.SET_START_DATE]: {
                  actions: 'setStartDate',
              },
              [FLIGHT_EVENTS.SET_RETURN_DATE]: {
                  actions: 'setReturnDate',
                  cond: (context) => context.trip === 'roundTrip',
              },
          }
      },
      [FLIGHT_STATES.SUBMITTED]: {
          type: 'final'
      }
  },
}, {
    actions: {
        setTrip:   assign({
            trip: (_, event) => event.value,
        }),
        setStartDate: assign({
            startDate: (_, event) => event.value,
        }),
        setReturnDate: assign({
            returnDate: (_, event) => event.value,
        }),
    }
});
