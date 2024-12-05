import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as spotsActions from '../../store/spots';
import { useDispatch } from 'react-redux';
// import { useModal } from '../../context/Modal';
// import './LoginForm.css';

// TODO: fix error stuff


function SpotForm({ spot = null, edit }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [address, setAddress] = useState(edit ? (spot?.address) : "");
  const [city, setCity] = useState(edit ? (spot?.city) : "");
  const [state, setState] = useState(edit ? (spot?.state) : "");
  const [country, setCountry] = useState(edit ? (spot?.country) : "");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [name, setName] = useState(edit ? (spot?.name) : "");
  const [description, setDescription] = useState(edit ? (spot?.description) : "");
  const [price, setPrice] = useState(edit ? (spot?.price) : "");
  const [errors, setErrors] = useState({});

  const spotFunction = (edit ? spotsActions.editSpot : spotsActions.createNewSpot);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(spotFunction({ id: spot?.id, address, city, state, country, lat, lng, name, description, price }))
      .then(() => navigate('/')).catch(async (res) => {
        const data = await res.json();
        if (data?.errors) setErrors(data.errors);
      }
    );
  };

  return (
    <>
      {edit ? (<h1>Update your Spot</h1>) : (<h1>Create a new Spot</h1>)}
      <form onSubmit={handleSubmit}>
        <label>
          Country
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            placeholder='Country'
            required
          />
        </label>
        <label>
          Street Address
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder='Street Address'
            required
          />
        </label>
        <label>
          City
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder='City'
            required
          />
        </label>
        <label>
          State
          <input
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
            placeholder='State'
            required
          />
        </label>
        <label>
          Latitude
          <input
            type="number"
            value={lat}
            onChange={(e) => setLat(e.target.value)}
            placeholder='Latitude'
          />
        </label>
        <label>
          Longitude
          <input
            type="number"
            value={lng}
            onChange={(e) => setLng(e.target.value)}
            placeholder='Longitude'
          />
        </label>
        <label>
          Name of Spot
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder='Name of your Spot'
            required
          />
        </label>
        <label>
          Describe your place to &quot;Guests&quot;
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder='Description'
            required
          />
        </label>
        <label>
          Set a Price
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder='Price'
            required
          />
        </label>
        {errors.credential && <p>{errors.credential}</p>}
        <button type="submit">{edit ? 'Update Spot' : 'Create Spot'}</button>
      </form>
    </>
  );
}

export default SpotForm;