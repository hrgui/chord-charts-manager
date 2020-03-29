import { Form } from "lib/form/Form";
import React from "react";
import { renderWithAppController as render } from "./renderWithAppController";

interface FormProps {
  initialValues: any;
  onSubmit: any;
  [name: string]: any;
}

export function renderWithForm(
  uiFn,
  formProps: FormProps = { initialValues: {}, onSubmit: () => void 0 }
) {
  const el = render(<Form {...formProps}>{uiFn}</Form>);

  return el;
}
