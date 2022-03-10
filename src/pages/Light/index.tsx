import { useMachine } from '@xstate/react';
import { LightMachine, LIGHT_EVENTS, LIGHT_STATES } from './lightMachine';

export default function Light() {
  const [state, send] = useMachine(LightMachine);
  return (
    <div>
      <h2>Light Demo</h2>
      {state.matches(LIGHT_STATES.RED) && <span>red</span>}
      {state.matches(LIGHT_STATES.GREEN) && <span>green</span>}
      {state.matches(LIGHT_STATES.YELLOW) && <span>yellow</span>}
      <button
        onClick={() => {
          send(LIGHT_EVENTS.CLICK);
        }}
      >
        click me
      </button>
    </div>
  );
}
