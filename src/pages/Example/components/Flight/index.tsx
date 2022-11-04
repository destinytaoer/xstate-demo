import { useMachine } from '@xstate/react';
import { FC, memo } from 'react';
import { FlightInput } from './FlightInput';
import { FLIGHT_EVENTS, FlightMachine } from './flightMachine';

interface IFlightProps {}

const Flight: FC<IFlightProps> = (props) => {
  const [state, send] = useMachine(FlightMachine, { devTools: true });
  const { startDate, returnDate, trip } = state.context;

  const canSubmit = FlightMachine.transition(state, 'SUBMIT').changed;
  return (
    <div>
      <h2>Flight Demo</h2>
      <section>
        <form style={{ display: 'flex', flexDirection: 'column' }}>
          <select
            onChange={(e) => {
              send({ type: FLIGHT_EVENTS.SET_TRIP, value: e.target.value });
            }}
            value={trip}
          >
            <option value="oneWay">One way</option>
            <option value="roundTrip">Round trip</option>
          </select>
          <FlightInput
            value={startDate}
            onChange={(value) => send({ type: FLIGHT_EVENTS.SET_START_DATE, value })}
            error={!startDate}
            label="Start date"
          />
          <FlightInput
            value={returnDate}
            onChange={(value) => send({ type: FLIGHT_EVENTS.SET_RETURN_DATE, value })}
            error={!returnDate || (startDate && returnDate <= startDate)}
            disabled={trip === 'oneWay'}
            label="Return date"
          />
          <button
            type="button"
            onClick={() => send(FLIGHT_EVENTS.SUBMIT)}
            disabled={!canSubmit}
            data-state={state.toStrings().join(' ')}
          >
            {state.matches('editing') && 'Submit'}
            {state.matches('submitted') && 'Success!'}
          </button>
        </form>
      </section>
    </div>
  );
};

export default memo(Flight);
