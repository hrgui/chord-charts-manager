import React from "react";
import { Button } from "@material-ui/core";
import { Form } from "lib/form/Form";
import { ChipInputField } from "lib/form/ChipInputField";
import { TextField } from "lib/form/TextField";
import { ChordSelectField } from "./ChordSelectField";
import { SongSectionsField } from "./SongSectionsField";
import ConnectedYoutubeView from "../components/YoutubeView";
import classnames from "classnames";
import { WithWidth } from "lib/layout/WithWidth";
import FormActions from "lib/form/FormActions";
import ShareBarField from "app/share/ShareBarField";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { ErrorMessage } from "formik";
import * as Yup from "yup";

interface SongSection {
  title?: string;
  body?: string;
}

interface Song {
  title?: string;
  artist?: string;
  key?: string;
  youtube?: string;
  sections?: SongSection[];
}

export interface SongFormProps {
  isNew?: boolean;
  isLoading?: boolean;
  error?: any;
  data: Song;
  onSubmit: (values) => any;
  onSubmitSuccess?: (res, values) => any;
  onSubmitError?: (e) => any;
}

const Container = styled.div`
  padding: ${({ theme }) => theme.spacing(2)}px;
`;

const SongFormCard = styled.div`
  display: flex;
  width: 100%;

  &.SongFormCard-mobile {
    flex-direction: column-reverse;
  }
`;

const TitleAndArtistFieldSet = styled.div`
  width: 100%;
  padding-right: ${({ theme }) => theme.spacing(2)}px;
`;

const ArtistTextField = styled(TextField)`
  min-width: 200px;
`;

const ChordSelectFieldSet = styled.div`
  margin-left: auto;
`;

const StyledConnectedYoutubeView = styled(ConnectedYoutubeView)`
  margin-left: auto;

  &.ConnectedYoutubeView-tablet,
  &.ConnectedYoutubeView-mobile {
    margin-left: 0;
    & iframe {
      width: 100% !important;
    }
  }

  &.ConnectedYoutubeView-breakout {
    width: calc(100% + 36px);
    margin-left: ${({ theme }) => -theme.spacing() * 2}px;
    margin-top: ${({ theme }) => -theme.spacing() * 2}px;
  }
`;

export const SongForm = (props: SongFormProps) => {
  const { data, error, isLoading } = props;
  const { t } = useTranslation();

  const validationSchema = Yup.object({
    title: Yup.string().required(),
    artist: Yup.string().required(),
    key: Yup.string().required()
  });

  if (isLoading) {
    return null;
  }

  if (error) {
    console.error(error);
    return null;
  }

  return (
    <WithWidth>
      {({ width }) => (
        <Form
          validationSchema={validationSchema}
          initialValues={data}
          onSubmit={props.onSubmit}
          onSubmitSuccess={props.onSubmitSuccess}
          onSubmitError={props.onSubmitError}
        >
          {({ values, errors, submitForm, isSubmitting }) => (
            <>
              <form>
                <Container>
                  <ShareBarField name="share" />
                  <SongFormCard
                    className={classnames({
                      "SongFormCard-mobile": !(width === "lg" || width === "xl")
                    })}
                  >
                    <TitleAndArtistFieldSet>
                      <TextField
                        fullWidth
                        error={errors.title}
                        helperText={<ErrorMessage name="title" />}
                        label={t("song:label/title")}
                        name="title"
                      />
                      <ArtistTextField
                        error={errors.artist}
                        helperText={<ErrorMessage name="artist" />}
                        label={t("song:label/artist")}
                        name="artist"
                      />
                    </TitleAndArtistFieldSet>
                    <ChordSelectFieldSet>
                      <ChordSelectField
                        error={errors.key}
                        helperText={<ErrorMessage name="key" />}
                        label={t("song:label/key")}
                        name="key"
                      />
                    </ChordSelectFieldSet>
                    <StyledConnectedYoutubeView
                      className={classnames({
                        "ConnectedYoutubeView-tablet": width === "md",
                        "ConnectedYoutubeView-mobile":
                          width === "sm" || width === "xs",
                        "ConnectedYoutubeView-breakout": !(
                          width === "lg" || width === "xl"
                        )
                      })}
                      value={values.youtube}
                    />
                  </SongFormCard>
                  <TextField
                    fullWidth
                    label={t("song:label/youtube")}
                    name="youtube"
                  />
                  <ChipInputField
                    fullWidth
                    label={t("song:label/tags")}
                    name="tags"
                  />
                  <SongSectionsField name="sections" />
                  <FormActions>
                    <Button
                      type="submit"
                      onClick={submitForm}
                      disabled={isSubmitting}
                    >
                      {t("save")}
                    </Button>
                  </FormActions>
                </Container>
              </form>
            </>
          )}
        </Form>
      )}
    </WithWidth>
  );
};

export default SongForm;
