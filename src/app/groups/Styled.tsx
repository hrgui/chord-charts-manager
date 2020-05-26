import styled from "styled-components";
import { Paper, TextField, FormControl, Typography } from "@material-ui/core";

export const Container = styled(Paper)`
  width: 100%;
  overflow-x: auto;
`;

export const StyledTextField = styled(TextField)`
  width: 350px;
`;

export const StyledFormControl = styled(FormControl)`
  margin-top: ${({ theme }) => theme.spacing(3)}px;
`;

export const StyledInputLabel = styled(Typography)`
  text-transform: uppercase;
  margin-bottom: ${({ theme }) => theme.spacing()}px;
`;
