import React from "react";
import { Field } from "lib/form/Field";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  NativeSelect,
  Table,
  TableBody,
  TableRow,
  TableCell,
  IconButton
} from "@material-ui/core";
import Delete from "@material-ui/icons/Delete";
import styled from "styled-components";
import { useUserData } from "lib/hooks/useUserData";

const StyledDialogContent = styled(DialogContent)`
  color: ${({ theme }) => theme.palette.text.primary};
`;

const ActionBar = styled.div`
  display: flex;
  align-items: center;
`;

const StyledNativeSelect = styled(NativeSelect)`
  min-width: 125px;
`;

const ShareDialog = ({ user, value = {}, onChange }: any) => {
  const [isDialogOpen, setDialogOpen] = React.useState(false);
  const [newShareValue, setShareValue] = React.useState(value);
  const [currentTextFieldValue, setTextFieldValue] = React.useState("");
  const [currentRole, setRole] = React.useState("editor");

  function onSave() {
    onChange(newShareValue);
    handleClose();
  }

  function handleClose() {
    setDialogOpen(!isDialogOpen);
  }

  function onDelete(key) {
    const { [key]: gone, ...rest } = newShareValue;

    setShareValue(rest);
  }

  function onChangeRole(key, value) {
    if (!key || !value) {
      return;
    }
    setShareValue({ ...newShareValue, [key]: value });
  }

  const shareValues = newShareValue ? Object.keys(newShareValue) : [];

  return (
    <>
      <Dialog open={isDialogOpen} onClose={e => handleClose()}>
        <DialogTitle>Sharing Settings</DialogTitle>

        <StyledDialogContent>
          <Button onClick={e => onChangeRole(user.currentGroupId, currentRole)}>
            Share with Current Group
          </Button>
          <ActionBar>
            <TextField
              placeholder="Enter UID"
              fullWidth
              value={currentTextFieldValue}
              onChange={e => setTextFieldValue(e.target.value)}
            />
            <StyledNativeSelect
              onChange={e => setRole(e.target.value)}
              value={currentRole}
            >
              <option value="editor">Editor</option>
              <option value="reader">Reader</option>
            </StyledNativeSelect>
            <Button
              onClick={e => onChangeRole(currentTextFieldValue, currentRole)}
            >
              Add
            </Button>
          </ActionBar>

          <Table>
            <colgroup>
              <col style={{ width: "70%" }} />
              <col style={{ width: "25%" }} />
              <col style={{ width: "5%" }} />
            </colgroup>
            <TableBody>
              {shareValues.map(key => (
                <TableRow key={key}>
                  <TableCell key={key}>
                    {key === user.currentGroupId ? "Current Group" : key}
                  </TableCell>
                  <TableCell>
                    <NativeSelect
                      onChange={e => onChangeRole(key, e.target.value)}
                      value={newShareValue[key]}
                    >
                      <option value="editor">Editor</option>
                      <option value="reader">Reader</option>
                    </NativeSelect>
                  </TableCell>
                  <TableCell>
                    <IconButton
                      onClick={e => {
                        onDelete(key);
                      }}
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </StyledDialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button variant="contained" onClick={onSave} color="primary">
            Done
          </Button>
        </DialogActions>
      </Dialog>
      <div
        style={{
          display: "flex",
          flexDirection: "row-reverse",
          marginBottom: 16
        }}
      >
        <Button variant="outlined" onClick={e => setDialogOpen(!isDialogOpen)}>
          Share
        </Button>
      </div>
    </>
  );
};

const ShareBarField = ({ name }) => {
  const user = useUserData() || {};

  return (
    <Field
      name={name}
      render={({ field, form }) => {
        return (
          <ShareDialog
            user={user}
            onChange={v => form.setFieldValue(field.name, v)}
            value={field.value}
          />
        );

        // return JSON.stringify(field);
      }}
    />
  );
};

export default ShareBarField;
