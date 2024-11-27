import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css'

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  // const sessionLinks = sessionUser ? (
  //   <>
  //     <li>
  //       <ProfileButton user={sessionUser} />
  //     </li>
  //   </>
  // ) : (
  //   <>
  //     <li>
  //       <OpenModalButton 
  //         buttonText="Log In"
  //         modalComponent={<LoginFormModal />}
  //       />
  //     </li>
  //     <li>
  //       <OpenModalButton
  //         buttonText="Sign Up"
  //         modalComponent={<SignupFormModal />}
  //       />
  //     </li>
  //   </>
  // );

  return (
    <ul>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      {isLoaded && (
        <li>
          <ProfileButton user={sessionUser} />
        </li>
      )}
    </ul>
  );
}

export default Navigation;