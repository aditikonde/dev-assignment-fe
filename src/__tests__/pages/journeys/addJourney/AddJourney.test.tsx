import {render, screen, fireEvent} from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import AddJourney from "../../../../pages/journeys/addJourney/addJourney";
import { ADD_NEW_JOURNEY } from "../../../../Queries/queries";

describe("test suite",() => {

  const mocks = [
    {
    request: {
      query: ADD_NEW_JOURNEY,
      variables: {
        from_address: "Some Airport",
        to_address: "some Home",
        inbound: false,
        status: "PENDING",
        fare: 123,
        traveller_info: "966eb0d1-6a4a-4e7b-86fb-1d865bea79f3"
      }
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

  it("mount add new journey button", async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <AddJourney />
      </MockedProvider>
    );
    expect(await screen.findByRole("button", {name:"Add New Journey"})).toBeInTheDocument();
  })

  it("click event trigger", async () => { 

    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <AddJourney />
      </MockedProvider>
    );

    const logSpy = jest.spyOn(console, 'log')
    let button = screen.getByRole("button");
    fireEvent.click(button);
    expect(logSpy).toBeCalled();
    expect(await screen.findByRole("button", {name:"Add Journey"})).toBeInTheDocument();
  })
})
