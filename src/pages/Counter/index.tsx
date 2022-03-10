import { useMachine } from '@xstate/react';
import { COUNTER__EVENTS, CounterMachine } from './counterMachine';

export default function Counter() {
  const [state, send] = useMachine(CounterMachine);
  return (
    <div>
      <h2>Counter Demo</h2>
      <span>{state.context.count}</span>
      <button onClick={() => send(COUNTER__EVENTS.INCREMENT)}>+</button>
      <button onClick={() => send(COUNTER__EVENTS.DECREMENT)}>-</button>
    </div>
  );
}
