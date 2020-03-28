import { Form } from "lib/form/Form";
import React from "react";
import { renderWithAppController as render } from "./renderWithAppController";

export function renderWithForm(
  uiFn,
  formProps = { initialValues: {}, onSubmit: () => void 0 }
) {
  const el = render(<Form {...formProps}>{uiFn}</Form>);

  return el;
}
