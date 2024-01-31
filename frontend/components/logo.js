import '@fortawesome/fontawesome-svg-core/styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDumbbell } from '@fortawesome/free-solid-svg-icons';

const Logo = () => {
  return (
    <div className="flex flex-row justify-center items-center space-x-2">
      <h1 className="text-4xl font-extrabold text-primary ">FIT2DAY</h1>
      <FontAwesomeIcon
        icon={faDumbbell}
        style={{ color: '#A076F9', fontSize: '48px' }}
      />
    </div>
  );
};

export default Logo;
