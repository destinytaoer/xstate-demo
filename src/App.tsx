import { useMachine } from '@xstate/react';
import React from 'react';
import { LightMachine, LIGHT_EVENTS, LIGHT_STATES } from './model/lightMachine';

function App() {
  const [state, send] = useMachine(LightMachine);
  return (
    <div className="App">
      Learn XState
      <div>
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
    </div>
  );
}

export default App;
