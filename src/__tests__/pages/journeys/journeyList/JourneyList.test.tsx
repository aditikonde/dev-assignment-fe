import {render, screen} from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import JourneyList from "../../../../pages/journeys/journeyList/journeyList";
import { FETCH_ALL_JOURNEYS } from "../../../../Queries/queries";
import { Journey } from "../../../../Interfaces/Interfaces";

describe("test suite for Journey List",() => {

  const mocks = [
    {
    request: {
      query: FETCH_ALL_JOURNEYS,
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
                "to_address": "London HTR Airport",
                "from_address": "Bakers Street"
              }
            },
            {
              "node": {
                "id": "472b0da-1cdc-4h14-a747-09fca6828d85",
                "status": "COMPLETED",
                "inbound": true,
                "to_address": "Amsterdam AMS AIRPORT",
                "from_address": "Hilversum"
              }
            }
          ]
        }
      }
    }
    },
  ];

  const mockQuery = [
    {
    request: {
      query: FETCH_ALL_JOURNEYS,
      variables: {improper: "value"}
    },
    result: {
      data: {
    
      },
      error: {
        error: "error"
      }
    }
    },
  ];

  it("render table", async () => {
    const journeys: Array<Journey> = [
              {
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
            },
            {
              "id": "7892b0da-1ydc-6a14-a557-59fvg6828d85",
                "status": "COMPLETED",
                "inbound": true,
                "to_address": "Amsterdam Airport",
                "from_address": "Hilversum",
                "created_at": "2023-11-21T10:59:05.489527+00:00",
                "fare": 123,
                "traveller_info": {
                    "id": "60b8a78d-76c9-41b5-adfb-5587f40c0679",
                    "last_name": "Smith",
                    "first_name": "Klark",
                    "phone_number": "+3111111111",
                    "flight_number": "90909",
                    "passenger_count": 99,
                    "created_at": "2023-11-21T10:59:05.33957+00:00",
                }
            }
          ];
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <JourneyList journeys={journeys}/>
      </MockedProvider>
    );

    expect(await screen.findByTestId("status-test")).toBeInTheDocument();
    expect(await screen.findByTestId("phone-test")).toBeInTheDocument();
    expect(await screen.findByTestId("from-address-test")).toBeInTheDocument();
    expect(await screen.findByTestId("to-address-test")).toBeInTheDocument();
    expect(await screen.findByTestId("fare-test")).toBeInTheDocument();
    expect(await screen.findByTestId("name-test")).toBeInTheDocument();
    expect(await screen.findByTestId("action-test")).toBeInTheDocument();
  });

  it("Test Error", async () => {
    render(
      <MockedProvider mocks={mockQuery} addTypename={false}>
        <JourneyList journeys={[]}/>
      </MockedProvider>
    );
    expect(await screen.findByText("Oops something went wrong!! Sorry!!")).toBeInTheDocument();
  });
})