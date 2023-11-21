import { useMutation } from "@apollo/client";
import { COMPLETE_JOURNEY, REMOVE_CANCELLED_JOURNEY} from "../../../Queries/queries";
import { Journey } from "../../../Interfaces/Interfaces";
import "../Journeys.scss";

interface Props {
  journey: Journey;
}
const JourneyDetails = ({journey}: Props) => {
  
  const { status, id, from_address, to_address, inbound, fare, created_at, traveller_info } =
  journey ?? {};

  // MUTATION FOR COMPLETING THE PENDING QUERY
  const [handleCompleteJourney, {loading: completeJourneyDataLoading, error: errorLoading}] = useMutation(COMPLETE_JOURNEY, {
    variables: {id:{in: id} , status:"COMPLETED"},
    onError: (error) => console.log("Error !! " ,error)
  });

  // MUTATION FOR REMOVING CANCELLED QUERY
  const [handleRemoveCancelledJourney, {loading: cancelledJourneyDataLoading, error}] =   useMutation(REMOVE_CANCELLED_JOURNEY, {
    variables: {id:id},
    onError: (error) => console.log("Error !! " ,error)
  });

  const styleForStatus = "flex-row cell " + (status === "PENDING" ? "pending-status" 
                          : status === "CANCELLED" ? "cancelled-status" :
                          "completed-status");

  const createdDate = new Date(created_at).toLocaleString();
  return (
    <>
      {journey && 
        <div className="flex-table row">
          <div className={styleForStatus}>{status}</div>
          <div className="flex-row cell">{traveller_info.first_name} {traveller_info.last_name}</div>
          <div className="flex-row cell">{from_address}</div>
          <div className="flex-row cell">{to_address}</div>
          <div className="flex-row cell">{'\u20AC'} {fare}</div>
          <div className="flex-row cell">{traveller_info.phone_number}</div>
          <div className="flex-row cell">{createdDate}</div> 
          {status === "PENDING" && <div className="flex-row cell complete-btn"><button onClick={()=>handleCompleteJourney()}>Complete Journey</button></div>}
          {status === "CANCELLED" && <div className="flex-row cell remove-btn"><button onClick={()=>handleRemoveCancelledJourney()}>Delete Journey</button></div>}
          {status === "COMPLETED" && <div className="flex-row cell done-btn"><button disabled>Its Done!</button></div>}
          {(status !== "COMPLETED" && status !== "CANCELLED" && status !== "PENDING") && <div className="flex-row cell done-btn"><button disabled>MayBe inProgress</button></div>}
        </div>
      }
      <hr />
    </>
  );
}

// CAME ACROSS SOME "IN PROGRESS" STATUS - HAVE TRIED TO HANDLE THE SAME MINIMALLY

export default JourneyDetails;