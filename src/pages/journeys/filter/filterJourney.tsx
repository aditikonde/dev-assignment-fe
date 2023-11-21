import {FC, useState} from "react";
import { useQuery } from "@apollo/client";
import JourneyList from "../journeyList/journeyList";
import { Journey } from "../../../Interfaces/Interfaces";
import { FILTER_JOURNEY_BY_STATUS } from "../../../Queries/queries";
import "./filterJourney.scss";

const FilterJourney: FC = () => {

  const [filterByStatus, setFilterByStatus] = useState<String>("ALL");
  const [listOfJourneys, setListOfJourneys] = useState<Array<Journey>>([]);
  const [variables, setVariables] = useState<Object>({});

  const { data: journeyFilterResult, loading, error, refetch } = useQuery(FILTER_JOURNEY_BY_STATUS, {
    variables: variables,
    onError: (error) => console.log("Error !! ",error)
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    refetch();
    setListOfJourneys(journeyFilterResult?.journeyCollection?.edges ?? []);
    console.log("Filtered Desired Result");
  }

  const handleFilterSelection = (e: any) => {
    e.preventDefault();
    console.log("filter selection changed")
    if (e.currentTarget.value === "ALL") {
      setVariables({})
    } else {
    setVariables({status: e.currentTarget.value});
      setFilterByStatus(e.currentTarget.value);
    }
  }

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>Error...</h2>

  return (
    <div>
      <div  className="filter-panel">
        <h3 className="filter-label">Search Journeys by Status here</h3>
        <div className="filter-form">
          <form onSubmit={(e) => handleSubmit(e)}>
                <select className="filter-elements" id="filterStatus" name="filter-dropdown" data-testid="select" onChange={(e) => 
                  handleFilterSelection(e)}>
                      <option value="" disabled>Please select</option>
                      <option data-testid="select-option" value="ALL">ALL</option>
                      <option data-testid="select-option" value="PENDING">PENDING</option>
                      <option data-testid="select-option" value="COMPLETED">COMPLETED</option>
                </select>
                <button type="submit" className="filter-elements filter-btn">Search</button>
          </form>
        </div>
      </div>
      <JourneyList journeys={listOfJourneys} />
    </div>
  );
}

export default FilterJourney;

