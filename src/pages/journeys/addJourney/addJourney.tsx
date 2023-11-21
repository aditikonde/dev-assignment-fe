import {FC, useState} from "react";
import { useMutation } from "@apollo/client";
import { ADD_NEW_JOURNEY } from "../../../Queries/queries";
import "./addJourney.scss";

const AddJourney: FC = () => {

  const [isFormOpen, setIsFormOpen] = useState<Boolean>(false);
  const [fare, setFare] = useState<number>();
  const [from_address, setFormAddress] = useState<String>("");
  const [to_address, setToAddress] = useState<String>("");

  // THIS FUNCTION HANDLES INBOUND VALUE FOR EACH NEW JOURNEY ADDED
  // BASED ON - THE TO OR FROM ADDRESS HAS VALUE "AIRPORT" - INBOUND VALUE IS SET
  const handleInbound = (from_address: String, to_address: String) : Boolean => {
    let fromAddress = from_address.toLowerCase();
    let toAddress = to_address.toLowerCase();
    if (toAddress.includes("airport") || 
      (toAddress.includes("airport") && fromAddress.includes("airport")))
      return true;
    return false;
  }

  // THE FORM CURRENTLY CONSIST OF ONLY 3 FIELDS - FARE, TO AND FROM ADDRESSES
  // THE TRAVELLER UUID IS HARDCODED IN THE QUERY FOR KEEPING FORM SIMPLE
  // ASSUMPTION : NEW JOURNEY WHEN CREATED WILL HAVE STATUS - PENDING
  const [addJourneyMutation, {data, loading, error}] = useMutation(ADD_NEW_JOURNEY, {
    variables: {
      from_address: from_address,
      to_address: to_address,
      inbound: handleInbound(from_address, to_address),
      status: "PENDING",
      fare: fare,
      traveller_info: "966eb0d1-6a4a-4e7b-86fb-1d865bea79f3"
  },
    onError: (error) => console.log("Error !! " ,error)
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (from_address && to_address && fare){
      addJourneyMutation();
      setIsFormOpen(false);
    }
  }

  const handleOpenForm = () => {
    setIsFormOpen(true);
    console.log("clicked Add New Journey CTA")
  }

  if (loading) return <p>Loading...</p>
  return (
    <div className="content">
      <button className="add-new-journey-btn" onClick={()=> {handleOpenForm()} }>Add New Journey</button>

      {isFormOpen && 
        <div className="modal-background">
          <div className="modal">
            <div className="delete-btn" onClick={()=>setIsFormOpen(false)}>X</div>
            <h2 className="form-heading">Add New Journey</h2>
            <form className="form-elements" onSubmit={(e) => handleSubmit(e)}>
              <input type="text" className="input-element" required placeholder="Add From Address" onChange={(e) => setFormAddress(e.currentTarget.value)}/>
              <br/>
              <input type="text" className="input-element" required placeholder="Add To Address" onChange={(e) => setToAddress(e.currentTarget.value)}/>
              <br/>
              <input type="text" className="input-element" required placeholder="Add Fare in Euro" onChange={(e) => setFare(Number(e.currentTarget.value))}/>
              <br/>
              <button type="submit" className="form-submit-btn">Add Journey</button>
            </form>
          </div>
        </div>}

    </div>
  );
}

export default AddJourney;

