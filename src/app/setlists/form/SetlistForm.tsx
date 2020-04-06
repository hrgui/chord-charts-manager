import React from "react";
import {
  Button,
  Paper,
  DialogActions,
  Table,
  TableBody,
  Dialog,
} from "@material-ui/core";
import { TextField } from "lib/form/TextField";
import styled from "styled-components";
import FormActions from "lib/form/FormActions";
import { Form } from "lib/form/Form";
import ShareBarField from "app/share/ShareBarField";
import { FieldArray } from "formik";
import SetlistSongFieldRow, { NoSongsRow } from "./SetlistSongFieldRow";
import { useTranslation } from "react-i18next";
import { SongListContainer } from "app/songs/SongsListPage";

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
  margin-bottom: ${({ theme }) => theme.spacing(2)}px;
`;

const FormHeader = styled.h3`
  font-weight: 500;
  margin: ${({ theme }) => theme.spacing(1)}px;
`;

export const SetlistForm = (props: ISetlistFormProps) => {
  const { data, isLoading, isModalMode, isNew } = props;
  const SetlistFormActions = isModalMode ? DialogActions : FormActions;
  const { t } = useTranslation();
  const [open, setDialogOpen] = React.useState(false);

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
      {({ handleSubmit, values, setFieldValue }) => (
        <Container>
          <ShareBarField name="share" />
          <FormCard>
            <TextField
              fullWidth
              label={t("setlist:form/label/date")}
              name="date"
              type="date"
            />
            <TextField
              fullWidth
              label={t("setlist:form/label/title")}
              name="title"
            />
            <TextField
              fullWidth
              label={t("setlist:form/label/leader")}
              name="leader"
            />
            <TextField
              multiline
              fullWidth
              label={t("setlist:form/label/notes")}
              name="notes"
            />
          </FormCard>
          <FormCard>
            <FormHeader>{t("setlist:form/label/songs")}</FormHeader>
            <Table size="small">
              <TableBody>
                <FieldArray name="songs">
                  {({ swap, remove, form }) => {
                    if (form.values.songs.length === 0) {
                      return <NoSongsRow isNew={isNew} />;
                    }

                    return form.values.songs.map((songId, index) => {
                      return (
                        <SetlistSongFieldRow
                          onSongKeyChange={(e) => {
                            form.setFieldValue("settings", {
                              ...form.values.settings,
                              [songId]: {
                                ...form.values.settings[songId],
                                overrideKey: e.target.value,
                              },
                            });
                          }}
                          settings={form.values.settings[songId]}
                          key={index}
                          index={index}
                          songId={songId}
                          onSwap={swap}
                          onRemove={remove}
                        />
                      );
                    });
                  }}
                </FieldArray>
              </TableBody>
            </Table>
            <Button variant="outlined" onClick={(e) => setDialogOpen(true)}>
              Add Song
            </Button>
          </FormCard>

          <Dialog open={open}>
            <SongListContainer
              addToSetlistMode
              onAddSong={({ id }) => {
                setFieldValue("songs", [...values.songs, id]);
                setDialogOpen(false);
              }}
            />
          </Dialog>
          <SetlistFormActions>
            <Button
              onClick={(e) => {
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
