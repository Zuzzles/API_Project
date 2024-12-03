import { NavLink } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import * as spotActions from '../../store/spots';
import './SpotTile.css'

function SpotTile({ spot }) {

  return (
    <NavLink to={`/spots/${spot.id}`} className='spot-tile'>
        <div className='img'>
          <img className='spot-image' src ="../../../images/no-image-available.jpg" alt="No Image Available"/>
        </div>
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