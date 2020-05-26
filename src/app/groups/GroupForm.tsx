import React from "react";
import { Form } from "lib/form/Form";
import { TextField } from "lib/form/TextField";
import FormActions from "lib/form/FormActions";
import { Button, Switch, FormControlLabel } from "@material-ui/core";
import MembersField from "./MembersField";
import styled from "styled-components";

const FormContainer = styled.div`
  padding: ${({ theme }) => theme.spacing(2)}px;
`;

export default (props: any) => {
  const { data, isLoading } = props;

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
      {({ values, setFieldValue, handleSubmit }) => (
        <>
          <FormContainer>
            <TextField fullWidth label="Name" name="name" />
            <FormControlLabel
              labelPlacement="start"
              control={
                <Switch
                  checked={values.acceptingMembers}
                  onChange={(event) =>
                    setFieldValue("acceptingMembers", event.target.checked)
                  }
                  value="acceptingMembers"
                  color="primary"
                />
              }
              label="Accepting Members"
            />
            <MembersField label="Admins" atLeastOne name="admins" />
            <MembersField label="Members" name="members" />
            <MembersField
              label="Pending Members"
              name="pendingMembers"
              pendingTo="members"
            />
            <FormActions>
              <Button
                onClick={(e) => {
                  //@ts-ignore
                  return handleSubmit(e);
                }}
              >
                Save
              </Button>
            </FormActions>
          </FormContainer>
        </>
      )}
    </Form>
  );
};
