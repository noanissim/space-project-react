import { LandingPreview } from './LandingPreview'

export function LandingList({ landings }) {
   return (
      <div className="landing-list">
         {landings.map(landing => (
            <LandingPreview landing={landing} key={landing.flight_number} />
         ))}
      </div>
   )
}
