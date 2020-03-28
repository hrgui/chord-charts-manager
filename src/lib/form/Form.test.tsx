import React from "react";
import { Form } from "./Form";
import { render, cleanup, fireEvent, wait } from "@testing-library/react";

afterEach(cleanup);

it("Form - onSubmit, onSubmitSuccess chain w/ default onSubmitSuccess", async () => {
  let onSubmit = jest.fn().mockReturnValue("true");
  const { getByText } = render(
    <Form initialValues={{}} onSubmit={onSubmit}>
      {({ handleSubmit }) => {
        return <button onClick={handleSubmit}>Submit</button>;
      }}
    </Form>
  );

  const submitBtn = getByText("Submit");
  await fireEvent.click(submitBtn);
  await wait(() => {}, { timeout: 1 });
  expect(onSubmit).toHaveBeenCalled();
});

it("Form - onSubmit, onSubmitSuccess chain w/ default onSubmit", async () => {
  let onSubmitSuccess = jest.fn();
  const { getByText } = render(
    <Form initialValues={{}} onSubmitSuccess={onSubmitSuccess}>
      {({ handleSubmit }) => {
        return (
          <form onSubmit={handleSubmit}>
            <button>Submit</button>
          </form>
        );
      }}
    </Form>
  );

  const submitBtn = getByText("Submit");
  await fireEvent.click(submitBtn);
  await wait(() => {}, { timeout: 1 });
  expect(onSubmitSuccess).toHaveBeenCalled();
});

it("Form - onSubmit, onSubmitSuccess chain", async () => {
  let onSubmit = jest.fn().mockReturnValue("true");
  let onSubmitSuccess = jest.fn();
  let onSubmitError = jest.fn();
  const { getByText } = render(
    <Form
      initialValues={{}}
      onSubmit={onSubmit}
      onSubmitSuccess={onSubmitSuccess}
      onSubmitError={onSubmitError}
    >
      {({ handleSubmit }) => {
        return (
          <form onSubmit={handleSubmit}>
            <button type="submit">Submit</button>
          </form>
        );
      }}
    </Form>
  );

  const submitBtn = getByText("Submit");
  await fireEvent.click(submitBtn);
  await wait(() => {}, { timeout: 1 });
  expect(onSubmit).toHaveBeenCalled();
  expect(onSubmitSuccess).toHaveBeenCalled();
});

it("Form - onSubmit, onSubmitError chain", async () => {
  let onSubmit = jest.fn().mockImplementation(() => {
    throw "e";
  });
  let onSubmitSuccess = jest.fn();
  let onSubmitError = jest.fn();
  const { getByText } = render(
    <Form
      initialValues={{}}
      onSubmit={onSubmit}
      onSubmitSuccess={onSubmitSuccess}
      onSubmitError={onSubmitError}
    >
      {({ handleSubmit }) => {
        return (
          <form onSubmit={handleSubmit}>
            <button type="submit">Submit</button>
          </form>
        );
      }}
    </Form>
  );

  const submitBtn = getByText("Submit");
  await fireEvent.click(submitBtn);
  await wait(() => {}, { timeout: 1 });
  expect(onSubmit).toHaveBeenCalled();
  expect(onSubmitError).toHaveBeenCalled();
});

it("Form - onSubmit, onSubmitError chain w/ default onSubmitError", async () => {
  let onSubmit = jest.fn().mockImplementation(() => {
    throw "e";
  });
  const { getByText } = render(
    <Form initialValues={{}} onSubmit={onSubmit}>
      {({ handleSubmit }) => {
        return (
          <form onSubmit={handleSubmit}>
            <button type="submit">Submit</button>
          </form>
        );
      }}
    </Form>
  );

  const submitBtn = getByText("Submit");
  await fireEvent.click(submitBtn);
  await wait(() => {}, { timeout: 1 });
  expect(onSubmit).toHaveBeenCalled();
});
