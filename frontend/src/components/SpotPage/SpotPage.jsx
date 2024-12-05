import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { FaStar } from 'react-icons/fa';
import * as spotActions from '../../store/spots';
import * as reviewActions from '../../store/reviews';
import './SpotPage.css'

function SpotPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const spot = useSelector(state => state.spots.spot);
  const reviews = useSelector(state => state.reviews.reviews)
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  useEffect(() => {
    dispatch(spotActions.getSpotById(id));
    dispatch(reviewActions.getAllReviewsSpotId(id));
  }, [dispatch, id]);

  return (
    <div className='spot-page'>
        <h2 className='page-title'>{`${spot?.name}`}</h2>
        <div className='address'>{`${spot?.city}, ${spot?.state}, ${spot?.country}`}</div>
        <div>Images Placeholder</div>
        <div className='about-box'>
            <div className='desc-box'>
                <h3 className='host-name'>Hosted by {`${spot?.Owner.firstName} ${spot?.Owner.lastName}`}</h3>
                <p>{`${spot?.description}`}</p>
            </div>
            <div className='reserve-box'>
                <div>
                    <div>${`${spot?.price}`} per night</div>
                    {spot?.numReviews === 0 ? (
                      <div>
                        <FaStar />
                        <span> New</span>
                      </div>
                    ):(
                      <div>
                        <FaStar />
                        <span> {`${spot?.avgStarRating} • ${spot?.numReviews} reviews`}</span>
                      </div>
                    )}
                </div>
                <button onClick={() => alert('Probably not coming soon')}>Reserve</button>
            </div>
        </div>
        <div>
          {spot?.numReviews === 0 ? (
            <div>
              <FaStar />
              <span> New</span>
            </div>
          ):(
            <div>
              <div>
                <FaStar />
                <span> {`${spot?.avgStarRating} • ${spot?.numReviews} reviews`}</span>
              </div>
              {reviews?.toReversed().map((review) => (
                <div key={review.id}>
                  <h4>{review.User.firstName}</h4>
                  <span>{`${months[new Date(review.updatedAt).getMonth()]} ${new Date(review.updatedAt).getFullYear()}`}</span>
                  <p>{review.review}</p>
                </div>
              ))}
            </div>
          )}
        </div>
    </div>
  );
}

export default SpotPage;