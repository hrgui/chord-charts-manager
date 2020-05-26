import * as React from "react";
import {
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Tooltip,
} from "@material-ui/core";
import { FieldArray } from "formik";
import { Field } from "lib/form/Field";
import Delete from "@material-ui/icons/Delete";
import Check from "@material-ui/icons/Check";
import AddUser from "@material-ui/icons/PersonAdd";
import {
  Container,
  StyledTextField,
  StyledFormControl,
  StyledInputLabel,
} from "./Styled";
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";

interface MembersFieldProps {
  label?;
  name?;
  classes?;
  atLeastOne?;
  pendingTo?;
}

export function MemberRow({
  id,
  pendingTo,
  onMoveToMember,
  atLeastOne,
  value,
  remove,
  index,
}) {
  const { data, loading, error } = useQuery(
    gql`
      query getUser($id: ID) {
        user(id: $id) {
          uid
          displayName
          email
        }
      }
    `,
    { variables: { id } }
  );

  if (error) {
    console.error(error);
  }

  if (loading) {
    return null;
  }

  return (
    <TableRow>
      <TableCell>{id}</TableCell>
      <TableCell>{data && data.user.displayName}</TableCell>
      <TableCell>{data && data.user.email}</TableCell>
      <TableCell>
        {pendingTo && (
          <Tooltip title={`Move to ${pendingTo}`}>
            <IconButton onClick={(e) => onMoveToMember(index)}>
              <Check />
            </IconButton>
          </Tooltip>
        )}
        <Tooltip
          title={
            atLeastOne && value.length === 1
              ? "At least one member is required. Please add a member before deleting."
              : "Delete"
          }
        >
          <span>
            <IconButton
              disabled={atLeastOne && value.length === 1}
              onClick={(e) => remove(index)}
            >
              <Delete />
            </IconButton>
          </span>
        </Tooltip>
      </TableCell>
    </TableRow>
  );
}

const MembersTableFieldArray = ({
  name,
  value,
  atLeastOne,
  disableAddUser = false,
  pendingTo,
  handleMoveToMember,
}: {
  name;
  value;
  atLeastOne?;
  disableAddUser;
  pendingTo;
  handleMoveToMember;
}) => {
  const [isDialogOpen, setDialogOpen] = React.useState(false);
  const [uidToBeAdded, setUidToBeAdded] = React.useState("");

  function handleClose() {
    setUidToBeAdded("");
    setDialogOpen(!isDialogOpen);
  }

  return (
    <FieldArray name={name}>
      {({ move, remove, push }) => {
        function onAddUser() {
          push({ uid: uidToBeAdded });
          setUidToBeAdded("");
          setDialogOpen(!isDialogOpen);
        }

        function onMoveToMember(index) {
          handleMoveToMember(value[index]);
          remove(index);
        }

        return (
          <Container>
            <Dialog open={isDialogOpen} onClose={(e) => handleClose()}>
              <DialogTitle>Add User</DialogTitle>
              <DialogContent>
                <StyledTextField
                  placeholder="Enter UID or Email"
                  value={uidToBeAdded}
                  fullWidth
                  onChange={(e) => setUidToBeAdded(e.target.value)}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Cancel
                </Button>
                <Button onClick={onAddUser} color="primary">
                  Add User
                </Button>
              </DialogActions>
            </Dialog>
            <Table>
              <TableHead>
                {!disableAddUser && (
                  <TableRow>
                    <TableCell colSpan={4} align={"right"}>
                      <IconButton onClick={(e) => setDialogOpen(!isDialogOpen)}>
                        <Tooltip title={"Add User"}>
                          <AddUser />
                        </Tooltip>
                      </IconButton>
                    </TableCell>
                  </TableRow>
                )}
                <TableRow>
                  <TableCell>User ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {(value || []).map((id, index) => (
                  <MemberRow
                    value={value}
                    index={index}
                    id={id}
                    remove={remove}
                    pendingTo={pendingTo}
                    onMoveToMember={onMoveToMember}
                    atLeastOne={atLeastOne}
                    key={index}
                  />
                ))}
              </TableBody>
            </Table>
          </Container>
        );
      }}
    </FieldArray>
  );
};

const MembersField = (props: MembersFieldProps) => {
  const { label, name, atLeastOne, pendingTo = false } = props;
  return (
    <StyledFormControl fullWidth>
      <StyledInputLabel>{label}</StyledInputLabel>
      <Field
        name={name}
        render={({ field, form }) => (
          <MembersTableFieldArray
            handleMoveToMember={(member) => {
              const members = form.values[pendingTo];
              // mutability works but not immutability
              // weird
              // form.setFieldValue(pendingTo, [...members, member]);
              form.values[pendingTo] = [...members, member];
            }}
            pendingTo={pendingTo}
            disableAddUser={pendingTo}
            atLeastOne={atLeastOne}
            name={field.name}
            value={field.value}
          />
        )}
      />
    </StyledFormControl>
  );
};

export default MembersField;
