import { FC, memo } from 'react';
import { Link } from 'react-router-dom';

interface IHomeProps {}

const Home: FC<IHomeProps> = (props) => {
  return (
    <div>
      <Link to={'/example'}>example</Link>
    </div>
  );
};

export default memo(Home);
