import * as spotsActions from '../../store/spots';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
// import './LoginForm.css';

// TODO: fix error handling
// TODO: needs to change current listings on page

function DeleteSpotModal({ spotId }) {
  console.log(spotId)
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleClick = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(spotsActions.deleteSpot(spotId))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data?.errors) setErrors(data.errors);
      }
    );
  };

  console.log(errors)

  return (
    <>
      <h2>Confirm Delete</h2>
      <span>Are you sure you want to remove this spot from the listings?</span>
      <button className='yes-del'onClick={handleClick}>Yes (Delete Spot)</button>
      <button className='no-del' onClick={closeModal}>No (Keep Spot)</button>
    </>
  );
}

export default DeleteSpotModal;