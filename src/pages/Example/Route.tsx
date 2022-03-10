import { FC, memo } from 'react';
import { Routes, Route } from 'react-router-dom';
import Example from './index';
import Light from './components/Light';
import Counter from './components/Counter';

interface IRouteProps {}

const ExampleRoute: FC<IRouteProps> = (props) => {
  return (
    <Routes>
      <Route path="/" element={<Example />} />
      <Route path="light" element={<Light />} />
      <Route path="counter" element={<Counter />} />
    </Routes>
  );
};

export default memo(ExampleRoute);
