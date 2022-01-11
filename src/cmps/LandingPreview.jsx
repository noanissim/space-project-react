import { Link } from 'react-router-dom'

export function LandingPreview({ landing }) {
   return (
      <article className="landing-preview">
         <Link to={`/landing/${landing._id}`} className="info">
            <img src={landing.links.mission_patch} alt="img" />
            <h2>{landing.mission_name}</h2>
            <p>{landing?.details?.slice(0, 50) + '...' || 'There is no quick information to show. For more details about this rocket, click on the card.'}</p>
         </Link>
      </article>
   )
}
