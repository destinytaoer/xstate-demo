import { FC, memo } from 'react';
import { Link } from 'react-router-dom';

interface IExampleProps {}

const Example: FC<IExampleProps> = (props) => {
  return (
    <div>
      <h2>Example</h2>
      <Link to="/example/light">light demo</Link>
      <Link to="/example/counter">counter demo</Link>
    </div>
  );
};

export default memo(Example);
