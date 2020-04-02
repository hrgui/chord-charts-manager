import * as React from "react";
import { renderWithForm as render } from "testUtils/renderWithForm";
import { SongSectionsField } from "./SongSectionsField";
import { fireEvent, wait } from "@testing-library/react";
import { act } from "react-dom/test-utils";

test("case when theres sections is null/undefined, should still have buttons to add items", async () => {
  const { getByText } = render(<SongSectionsField name="sections" />, {
    initialValues: {},
    onSubmit: () => null
  });

  const el = getByText(/Text Chord Chart/);
  expect(el).toBeInTheDocument();
  act(() => {
    fireEvent.click(el);
  });
  await wait();
  expect(getByText(/Section Title/)).toBeInTheDocument();
});

test("case when theres sections is populated", () => {
  const sections = [
    {
      type: "text",
      title: "Test",
      body: "A B C \n test"
    },
    {
      type: "abc",
      title: "Test 2",
      body: "CDEFGABC'D'E'F'G'A'B'C''"
    }
  ];

  const { getByText, getAllByText } = render(
    <SongSectionsField name="sections" />,
    {
      initialValues: { sections },
      onSubmit: () => null
    }
  );

  expect(getByText(/Text Chord Chart/)).toBeInTheDocument();
  expect(getAllByText(/Section Title/).length).toEqual(2);
});
