import * as React from "react";
import { Formik, FormikValues, FormikConfig } from "formik";

function createOnSubmitChain(onSubmit, onSubmitSuccess, onSubmitError) {
  return async function(values, formikActions) {
    try {
      const res = await onSubmit(values, formikActions);
      onSubmitSuccess(res, values, formikActions);
    } catch (e) {
      onSubmitError(e);
    }
  };
}

interface ExtFormProps {
  onSubmitSuccess?;
  onSubmitError?;
}

export function Form<
  Values extends FormikValues = FormikValues,
  ExtraProps = {}
>(props: FormikConfig<Values> & ExtFormProps & ExtraProps) {
  const {
    onSubmit = () => null,
    onSubmitSuccess = () => null,
    onSubmitError = () => null
  } = props;

  const handleSubmit = createOnSubmitChain(
    onSubmit,
    onSubmitSuccess,
    onSubmitError
  );

  return (
    <Formik
      enableReinitialize={true}
      initialValues={props.initialValues || {}}
      {...props}
      onSubmit={handleSubmit}
    />
  );
}
