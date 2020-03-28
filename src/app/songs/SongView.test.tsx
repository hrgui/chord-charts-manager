import React from "react";
import SongView, { SongViewKey } from "./SongView";
import { act } from "@testing-library/react";
import { renderWithAppController as render } from "testUtils/renderWithAppController";

describe("SongView", () => {
  it("should be able to render a song if provided normally", () => {
    jest.useFakeTimers();
    let el;
    act(() => {
      el = render(
        <SongView
          data={{
            title: "Test",
            artist: "Test 2",
            key: "A",
            sections: [
              {
                body: "A B C \r\n TEST SECTION 1"
              }
            ]
          }}
        />
      );
    });
    act(() => {
      jest.runAllTimers();
    });

    const { queryByText } = el;
    const sectionEl = queryByText("TEST SECTION 1");
    expect(sectionEl).not.toBeNull();
    expect(queryByText("A")).not.toBeNull();
    expect(queryByText("B")).not.toBeNull();
    expect(queryByText("C")).not.toBeNull();
  });

  it("should be able to render a song with an override key applied", () => {
    jest.useFakeTimers();
    let el;
    act(() => {
      el = render(
        <SongView
          settings={{ overrideKey: "B" }}
          data={{
            title: "Test",
            artist: "Test 2",
            key: "A",
            sections: [
              {
                body: "A B C \r\n TEST SECTION 1"
              }
            ]
          }}
        />
      );
    });
    act(() => {
      jest.runAllTimers();
    });

    const { queryByText } = el;
    const sectionEl: HTMLElement = queryByText("TEST SECTION 1");
    expect(sectionEl).not.toBeNull();
    expect(queryByText("B")).not.toBeNull();
    expect(queryByText("C#")).not.toBeNull();
    expect(queryByText("D")).not.toBeNull();
  });

  describe("sectionSettings applied", () => {
    it("should adhere to sectionSettings if it is to be hidden", () => {
      jest.useFakeTimers();
      let el;
      act(() => {
        el = render(
          <SongView
            settings={{ sectionsSettings: [{ hide: false }, { hide: true }] }}
            data={{
              title: "Test",
              artist: "Test 2",
              key: "A",
              sections: [
                {
                  body: "A B C \r\n TEST SECTION 1"
                },
                {
                  body: "D C E \r\n TEST SECTION 2"
                }
              ]
            }}
          />
        );
      });
      act(() => {
        jest.runAllTimers();
      });

      const { queryByText } = el;
      const sectionEl: HTMLElement = queryByText("TEST SECTION 1");
      expect(sectionEl).not.toBeNull();
      expect(queryByText("A")).not.toBeNull();
      expect(queryByText("B")).not.toBeNull();
      expect(queryByText("C")).not.toBeNull();
      expect(queryByText("TEST SECTION 2")).toBeNull();
      expect(queryByText("D")).toBeNull();
    });
  });
});

describe("SongViewKey", () => {
  it("should be able to render without crashing, if all props provided", () => {
    const changeEvent = jest.fn();
    const { queryByText } = render(
      <SongViewKey overrideKey={"A"} onChange={changeEvent} />
    );
    expect(queryByText("A")).not.toBeNull();
  });
});
