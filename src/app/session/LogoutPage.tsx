import React from "react";
import { useAsync } from "react-async";
import { Loading } from "lib/layout/Loading";
import { Typography, Button } from "@material-ui/core";
import styled from "styled-components";
import useAuthActions from "lib/hooks/useAuthActions";
import { useTranslation } from "react-i18next";

const Container = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing(2)}px;
  font-size: ${({ theme }) => theme.typography.pxToRem(20)};
  font-family: ${({ theme }) => theme.typography.fontFamily};
  color: ${({ theme }) => theme.palette.text.primary};
`;

export function LogoutPage() {
  const { logout } = useAuthActions();
  const { error, isLoading } = useAsync(logout);
  const { t } = useTranslation();

  if (error) {
    console.error(error);
    return <Typography variant="body1">{t("logout/error")}</Typography>;
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Container>
      <h2>{t("logout/success")}</h2>
      <Button onClick={e => window.location.reload()}>
        {t("logout/click_here")}
      </Button>
    </Container>
  );
}

export default LogoutPage;
