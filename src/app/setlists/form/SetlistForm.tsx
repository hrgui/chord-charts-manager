import React from "react";
import { Button, Paper, DialogActions } from "@material-ui/core";
import { TextField } from "lib/form/TextField";
import styled from "styled-components";
import FormActions from "lib/form/FormActions";
import { Form } from "lib/form/Form";
import ShareBarField from "app/share/ShareBarField";

export interface ISetlistFormProps {
  isNew?;
  isLoading?;
  isModalMode?: boolean;
  data?;
  onSubmit?;
  onSubmitSuccess?;
  onSubmitError?;
  isError?;
}

const Container = styled.div`
  padding: ${({ theme }) => theme.spacing(2)}px;
`;

const FormCard = styled(Paper)`
  padding: ${({ theme }) => theme.spacing(2)}px;
`;

export const SetlistForm = (props: ISetlistFormProps) => {
  const { data, isLoading, isModalMode } = props;

  const SetlistFormActions = isModalMode ? DialogActions : FormActions;

  if (isLoading) {
    return null;
  }

  return (
    <Form
      initialValues={data}
      onSubmit={props.onSubmit}
      onSubmitSuccess={props.onSubmitSuccess}
      onSubmitError={props.onSubmitError}
    >
      {({ handleSubmit }) => (
        <Container>
          <ShareBarField name="share" />
          <FormCard>
            <TextField fullWidth label="Date" name="date" type="date" />
            <TextField fullWidth label="Setlist Title" name="title" />
            <TextField fullWidth label="Worship Leader" name="leader" />
            <TextField multiline fullWidth label="Notes" name="notes" />
          </FormCard>
          <SetlistFormActions>
            <Button
              onClick={e => {
                //@ts-ignore
                return handleSubmit(e);
              }}
            >
              Save
            </Button>
          </SetlistFormActions>
        </Container>
      )}
    </Form>
  );
};

export default SetlistForm;
