// import { NavLink } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import SpotTile from './SpotTile';
import * as spotActions from '../../store/spots';
import './SpotList.css'

function SpotList({ current }) {
  const dispatch = useDispatch();
  const spots = useSelector(state => state.spots.spots);

  useEffect(() => {
    dispatch(spotActions.getAllSpots());
  }, [dispatch]);

  return (
    <div className='grid'>
      {spots?.map((spot) => (
        <div key={spot?.id} className='grid-tile'>
          <SpotTile spot={spot} />
          {current ? (
            <div>
                <button>Update</button>
                <button>Select</button>
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
}

export default SpotList;