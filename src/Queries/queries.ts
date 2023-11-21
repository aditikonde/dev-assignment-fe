import { gql} from "@apollo/client";

// FETCH ALL JOURNEYS
export const FETCH_ALL_JOURNEYS = gql`
  {
    journeyCollection(first: 50) {
      edges {
        node {
          id
          inbound
          from_address
          to_address
          status
          created_at
          fare
          traveller_info {
            id
            first_name
            last_name
            flight_number
            passenger_count
            phone_number
          }
        }
      }
    }
  }
`;

// FILTER JOURNEY BY STATUS
export const FILTER_JOURNEY_BY_STATUS = gql`
  query filterQuery($status: String!){
    journeyCollection(filter: {status: {eq: $status}}) {
      edges {
        node {
          id
          inbound
          from_address
          to_address
          status
          created_at
          fare
          traveller_info {
            id
            first_name
            last_name
            flight_number
            passenger_count
            phone_number  
          }
        }
      }
    }
  }
`;

// ADD NEW JOURNEY
export const ADD_NEW_JOURNEY = gql`
  mutation addJourney(
    $fare: Int!,
    $from_address: String!,
    $to_address: String!,
    $status: String!, 
    $inbound: Boolean!, 
    $traveller_info: UUID) {
      insertIntojourneyCollection(
        objects:[{status: $status, fare:$fare, to_address: $to_address, from_address: $from_address, inbound:$inbound, traveller_info:$traveller_info}])
        {     
            records{
              id 
            }
        }
  }
`;

// COMPLETE THE PENDING JOURNEY
export const COMPLETE_JOURNEY = gql`
  mutation UpdateJourney($id: UUIDFilter!, $status: String!) {
    updatejourneyCollection(set:{status: $status},
      filter:{id: $id})
      {
        records {
          id
          status
          from_address
          to_address
          fare
          created_at
          inbound
        }
      }
  }
`;

// REMOVE CANCELLED JOURNEY
export const REMOVE_CANCELLED_JOURNEY = gql`
  mutation RemoveCancelledJourney($id: UUIDFilter!) {
    deleteFromjourneyCollection(filter: {id: {eq: $id}} )
    {     
      records{
        id 
      }
    }
  }
`;