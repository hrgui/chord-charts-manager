import prepareInputForMutation from "./prepareInputForMutation";

test("prepareInputForMutation", () => {
  expect(
    prepareInputForMutation({
      id: 1,
      __typename: 2,
      name: "Test",
      sections: [
        {
          name: "test",
          id: 1,
          __typename: "Hello"
        }
      ]
    })
  ).toMatchSnapshot();
});
