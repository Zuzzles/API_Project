import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import * as spotActions from '../../store/spots';
// import './Navigation.css'

function SpotPage() {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(spotActions.getSpotById(id));
  }, [dispatch]);

  const spot = useSelector(state => state.spots.spot);
  console.log(spot);

  return (
    <div>
        <h2>{`${spot?.name}`}</h2>
        <div>{`${spot?.city}, ${spot?.state}, ${spot?.country}`}</div>
        <div>Images Placeholder</div>
        <div>
            <div>
                <h3>Hosted by {`${spot?.Owner.firstName} ${spot?.Owner.lastName}`}</h3>
                <p>{`${spot?.description}`}</p>
            </div>
            <div>
                <div>
                    <div>${`${spot?.price}`} per night</div>
                    <div>review stuff</div>
                </div>
                <button>Reserve</button>
            </div>
        </div>
    </div>
  );
}

export default SpotPage;