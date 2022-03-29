import { FC, memo } from 'react';
import { Routes, Route } from 'react-router-dom';
import Example from './index';
import Light from './components/Light';
import Counter from './components/Counter';
import Temperature from './components/Temperature';
import Flight from './components/Flight';

interface IRouteProps {}

const ExampleRoute: FC<IRouteProps> = (props) => {
  return (
    <Routes>
      <Route path="/" element={<Example />} />
      <Route path="light" element={<Light />} />
      <Route path="counter" element={<Counter />} />
      <Route path="temperature" element={<Temperature />} />
      <Route path="flightbook" element={<Flight />} />
    </Routes>
  );
};

export default memo(ExampleRoute);
