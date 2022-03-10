import { FC, memo } from 'react';
import { Routes, Route } from 'react-router-dom';
import Example from './index';
import Light from './components/Light';
import Counter from './components/Counter';
import Temperature from './components/Temperature';

interface IRouteProps {}

const ExampleRoute: FC<IRouteProps> = (props) => {
  return (
    <Routes>
      <Route path="/" element={<Example />} />
      <Route path="light" element={<Light />} />
      <Route path="counter" element={<Counter />} />
      <Route path="temperature" element={<Temperature />} />
    </Routes>
  );
};

export default memo(ExampleRoute);
