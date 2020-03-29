import * as React from "react";
import { renderWithForm as render } from "testUtils/renderWithForm";
import { SongSectionField } from "./SongSectionField";

test("empty section, bare minimum to show chords", async () => {
  const { getByText } = render(<SongSectionField name="section" />, {
    initialValues: {},
    onSubmit: () => null
  });

  expect(getByText(/Section Title/)).toBeInTheDocument();
});

test("empty section, bare minimum to show abc", async () => {
  const { getByText } = render(<SongSectionField name="section" type="abc" />, {
    initialValues: {},
    onSubmit: () => null
  });

  expect(getByText(/Section Title/)).toBeInTheDocument();
});

test("filled section, show abc", async () => {
  const { getByText } = render(<SongSectionField name="section" type="abc" />, {
    initialValues: {
      section: {
        type: "abc",
        title: "Test 2",
        body: "CDEFGABC'D'E'F'G'A'B'C''"
      }
    },
    onSubmit: () => null
  });

  expect(getByText("CDEFGABC'D'E'F'G'A'B'C''")).toBeInTheDocument();
  expect(getByText(/Section Title/)).toBeInTheDocument();
});

test("filled section, show text", async () => {
  const { getByText } = render(<SongSectionField name="section" />, {
    initialValues: {
      section: {
        type: "text",
        title: "Test",
        body: "A B C \n orange"
      }
    },
    onSubmit: () => null
  });
  expect(getByText("orange")).toBeInTheDocument();
  expect(getByText(/Section Title/)).toBeInTheDocument();
});
