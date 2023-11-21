import {render, screen, fireEvent} from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import FilterJourney from "../../../../pages/journeys/filter/filterJourney";
import { FILTER_JOURNEY_BY_STATUS } from "../../../../Queries/queries";

describe("test suite for filter",() => {

  const mocks = [
    {
    request: {
      query: FILTER_JOURNEY_BY_STATUS,
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

  it("mount component", async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <FilterJourney />
      </MockedProvider>
    );
    expect(await screen.findByText("Search Journeys by Status here")).toBeInTheDocument();
    expect(await screen.findByRole("button", {name:"Search"})).toBeInTheDocument();
  });

  it("click event trigger on search", async () => { 
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <FilterJourney />
      </MockedProvider>
    );
    const logSpy = jest.spyOn(console, 'log');
    let button = await screen.findByRole("button", {name:"Search"});
    fireEvent.click(button);
    expect(await screen.findByText("Loading...")).toBeInTheDocument();
    expect(logSpy).toBeCalled();
  });

  it("select dropdown", async () => { 
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <FilterJourney />
      </MockedProvider>
    );

    let select = await screen.findByTestId("select");
    expect(select).toBeInTheDocument();
    const logSpy = jest.spyOn(console, 'log');
    fireEvent.change(select, {target: {value: "ALL"}})
    expect(logSpy).toBeCalled();
  });

})