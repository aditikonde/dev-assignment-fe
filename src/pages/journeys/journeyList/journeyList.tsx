import { useQuery } from "@apollo/client";
import JourneyDetails from "../journeyDetails/journeyDetails"; 
import { Journey } from "../../../Interfaces/Interfaces";
import { FETCH_ALL_JOURNEYS } from "../../../Queries/queries";
import "../Journeys.scss";

interface NodeJourney {
  node: Journey
}

interface Props {
  journeys: Array<Journey> ;
}
const JourneyList = ({journeys}: Props) => {

  const { data: journeyInfoResult, loading, error } = useQuery(FETCH_ALL_JOURNEYS);
  const listOfJourneys = journeys.length > 0 ? journeys :
    (journeyInfoResult?.journeyCollection?.edges ?? []);

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>Oops something went wrong!! Sorry!!</h2>

  return (
    <div className="content">
      <div>
        {
          listOfJourneys.length > 0 &&
          <div>
            <div className="table-container">
              <div className="flex-table flex-header">
                <div data-testid="status-test" className="flex-row flex-title">Status</div>
                <div  data-testid="name-test" className="flex-row flex-title">Name</div>
                <div  data-testid="from-address-test" className="flex-row">From</div>
                <div  data-testid="to-address-test" className="flex-row">To</div>
                <div  data-testid="fare-test" className="flex-row">Fare</div>
                <div  data-testid="phone-test" className="flex-row">Phone</div>
                <div  data-testid="reated-at-test" className="flex-row">Created At</div>
                <div  data-testid="action-test" className="flex-row">Action</div>
              </div>
              {listOfJourneys.map((edge: NodeJourney,i: number)=> {
                return <JourneyDetails key={i} journey={edge.node} />
              })}
            </div>
          </div>
        }
        {!error && !loading && listOfJourneys.length === 0 && <h1>No trips on the schedule. You can relax!!</h1>}
      </div>
    </div>
  );
}

export default JourneyList;
