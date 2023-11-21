import React, {FC} from "react";
import "./Journeys.scss";
import AddJourney from "./addJourney/addJourney";
import FilterJourney from "./filter/filterJourney";

const Journeys: FC = () => {
  return (
    <div className="top-bar">
      <AddJourney />
      <FilterJourney />
    </div>
  );
}

export default Journeys;

