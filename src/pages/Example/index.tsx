import { FC, memo } from 'react';
import { Link } from 'react-router-dom';

interface IExampleProps {}

const Example: FC<IExampleProps> = (props) => {
  return (
    <div>
      <h2>Example</h2>
      <Link to="/example/light">light demo</Link> <br />
      <Link to="/example/counter">counter demo</Link> <br />
      <Link to="/example/temperature">temperature demo</Link> <br />
    </div>
  );
};

export default memo(Example);
