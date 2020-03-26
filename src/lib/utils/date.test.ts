import { getUpcomingSunday, toDomDate } from "./date";

const thisSunday = "2019-03-10T00:00:00.000Z";
const nextSunday = "2019-03-17T00:00:00.000Z";

describe("getUpcomingSunday", () => {
  test.each([
    ["2019-03-04T00:00:00.000Z", thisSunday],
    ["2019-03-05T00:00:00.000Z", thisSunday],
    ["2019-03-06T00:00:00.000Z", thisSunday],
    ["2019-03-07T00:00:00.000Z", thisSunday],
    ["2019-03-08T00:00:00.000Z", thisSunday],
    ["2019-03-09T00:00:00.000Z", thisSunday],
    // ["2019-03-10T00:00:00.000Z", thisSunday],
    ["2019-03-11T00:00:00.000Z", nextSunday]
  ])("getUpcomingSunday(%s)", (input, expected) => {
    const nextSundayDate = getUpcomingSunday(new Date(input));
    expect(nextSundayDate.toISOString()).toEqual(expected);
  });
});

const thisSundayDomDate = "2019-03-10";
const nextSundayDomDate = "2019-03-17";

describe("toDomDate", () => {
  test.each([
    ["2019-03-04T00:00:00.000Z", thisSundayDomDate],
    ["2019-03-05T00:00:00.000Z", thisSundayDomDate],
    ["2019-03-06T00:00:00.000Z", thisSundayDomDate],
    ["2019-03-07T00:00:00.000Z", thisSundayDomDate],
    ["2019-03-08T00:00:00.000Z", thisSundayDomDate],
    ["2019-03-09T00:00:00.000Z", thisSundayDomDate],
    // ["2019-03-10T00:00:00.000Z", thisSundayDomDate],
    ["2019-03-11T00:00:00.000Z", nextSundayDomDate]
  ])("toDomDate(%s) w/ date as input", (input, expected) => {
    const nextSundayDate = getUpcomingSunday(new Date(input));
    expect(toDomDate(nextSundayDate)).toEqual(expected);
  });

  test.each([
    ["2019-03-04T00:00:00.000Z", thisSundayDomDate],
    ["2019-03-05T00:00:00.000Z", thisSundayDomDate],
    ["2019-03-06T00:00:00.000Z", thisSundayDomDate],
    ["2019-03-07T00:00:00.000Z", thisSundayDomDate],
    ["2019-03-08T00:00:00.000Z", thisSundayDomDate],
    ["2019-03-09T00:00:00.000Z", thisSundayDomDate],
    // ["2019-03-10T00:00:00.000Z", thisSundayDomDate],
    ["2019-03-11T00:00:00.000Z", nextSundayDomDate]
  ])("toDomDate(%s) w/ string as input", (input, expected) => {
    const nextSundayDate = getUpcomingSunday(new Date(input));
    expect(toDomDate(nextSundayDate.toISOString())).toEqual(expected);
  });
});
