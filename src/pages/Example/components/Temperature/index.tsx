import { useMachine } from '@xstate/react';
import { TEMPERATURE_EVENTS, TemperatureMachine } from './temperatureMachine';

export default function Temperature() {
  const [state, send] = useMachine(TemperatureMachine);

  const { C, F } = state.context;

  return (
    <div>
      <h2>Temperature Demo</h2>
      <section>
        <label>
          <input
            type="number"
            id="celsius"
            value={C ?? ''}
            onChange={(e) => {
                send(TEMPERATURE_EVENTS.CELSIUS, { value: e.target.value });
            }}
            placeholder="e.g., 0"
          />
          <span>˚C</span>
        </label>
        <div>=</div>
        <label>
          <input
            type="number"
            id="fahrenheit"
            value={F ?? ''}
            onChange={(e) => {
                send(TEMPERATURE_EVENTS.FAHRENHEIT, { value: e.target.value });
            }}
            placeholder="e.g., 32"
          />
          <span>˚F</span>
        </label>
      </section>
    </div>
  );
}
