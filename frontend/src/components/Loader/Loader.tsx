import clsx from 'clsx';
import './Loader.scss';

interface LoaderProps {
  className?: string;
}

const Loader: React.FC<LoaderProps> = (props) => {
  return <div className={clsx('Loader', props.className)}></div>;
};

export default Loader;
