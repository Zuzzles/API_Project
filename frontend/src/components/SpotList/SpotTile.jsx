import { NavLink } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import * as spotActions from '../../store/spots';

function SpotTile({ spot }) {

  return (
    <NavLink to={`/spots/${spot.id}`}>
        <div>Image Placeholder</div>
        <div>
            <div>
              <span>{spot.city}, {spot.state}</span>
              {spot.avgRating === 'No Reviews' ? (
                <span>{spot.avgRating}</span>
              ) : (
                <>
                  <FaStar />
                  <span>{spot.avgRating}</span>
                </>
              )}
            </div>
            <div>${spot.price} per night</div>
        </div>
    </NavLink>
  );
}

export default SpotTile;