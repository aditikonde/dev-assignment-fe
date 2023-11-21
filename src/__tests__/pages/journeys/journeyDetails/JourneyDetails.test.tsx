import {render, screen} from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import JourneyDetails from "../../../../pages/journeys/journeyDetails/journeyDetails";
import {COMPLETE_JOURNEY, REMOVE_CANCELLED_JOURNEY } from "../../../../Queries/queries";
import { Journey } from "../../../../Interfaces/Interfaces";

describe("test suite for Journey details",() => {

  const mocks = [
    {
    request: {
      query: COMPLETE_JOURNEY,
      variables: {}
    },
    result: {
      data: {
        journeyCollection: {
          edges: [
            {
              "node": {
                "id": "4652b0da-1edc-4a14-a747-59fca6828d85",
                "status": "IN PROGRESS",
                "inbound": true,
                "to_address": "Amsterdam",
                "from_address": "Yerevan"
              }
            }
          ]
        }
      }
    }
    },

    {
    request: {
      query: REMOVE_CANCELLED_JOURNEY,
      variables: {}
    },
    result: {
      data: {
        journeyCollection: {
          edges: [
            {
              "node": {
                "id": "4652b0da-1edc-4a14-a747-59fca6828d85",
                "status": "IN PROGRESS",
                "inbound": true,
                "to_address": "Amsterdam",
                "from_address": "Yerevan"
              }
            }
          ]
        }
      }
    }
    }
  ];

  it("pending journey and action", async () => {
    const journey: Journey = {
      "id": "4652b0da-1edc-4a14-a747-59fca6828d85",
      "status": "PENDING",
      "inbound": true,
      "to_address": "Amsterdam",
      "from_address": "Yerevan",
      "created_at": "2023-11-21T10:59:05.489527+00:00",
      "fare": 123,
      "traveller_info": {
          "id": "60b8a78d-76c9-41b5-adfb-5587f40c0679",
          "last_name": "Unreal",
          "first_name": "Peter",
          "phone_number": "+3111111111",
          "flight_number": "90909",
          "passenger_count": 99,
          "created_at": "2023-11-21T10:59:05.33957+00:00",
        }
    };
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <JourneyDetails journey={journey}/>
      </MockedProvider>
    );

    expect(await screen.findByRole("button", {name:"Complete Journey"})).toBeInTheDocument();
  });

  it("delete Cancelled Journey", async () => {
    const journey: Journey = {
      "id": "4652b0da-1edc-4a14-a747-59fca6828d85",
      "status": "CANCELLED",
      "inbound": true,
      "to_address": "Amsterdam",
      "from_address": "Yerevan",
      "created_at": "2023-11-21T10:59:05.489527+00:00",
      "fare": 123,
      "traveller_info": {
          "id": "60b8a78d-76c9-41b5-adfb-5587f40c0679",
          "last_name": "Unreal",
          "first_name": "Peter",
          "phone_number": "+3111111111",
          "flight_number": "90909",
          "passenger_count": 99,
          "created_at": "2023-11-21T10:59:05.33957+00:00",
        }
    };
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <JourneyDetails journey={journey}/>
      </MockedProvider>
    );

    expect(await screen.findByRole("button", {name:"Delete Journey"})).toBeInTheDocument();
  });

  it("Pending Journey", async () => {
    const journey: Journey = {
      "id": "4652b0da-1edc-4a14-a747-59fca6828d85",
      "status": "COMPLETED",
      "inbound": true,
      "to_address": "Amsterdam",
      "from_address": "Yerevan",
      "created_at": "2023-11-21T10:59:05.489527+00:00",
      "fare": 123,
      "traveller_info": {
          "id": "60b8a78d-76c9-41b5-adfb-5587f40c0679",
          "last_name": "Unreal",
          "first_name": "Peter",
          "phone_number": "+3111111111",
          "flight_number": "90909",
          "passenger_count": 99,
          "created_at": "2023-11-21T10:59:05.33957+00:00",
        }
    };
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <JourneyDetails journey={journey}/>
      </MockedProvider>
    );

    expect(await screen.findByRole("button", {name:"Its Done!"})).toBeInTheDocument();
  });
})