// src/pages/NotFound/NotFound.tsx

import { useTranslation } from "react-i18next";
import { BackLink, Container, Description, Title } from "./NotFound.style";

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <Container>
      <Title>404</Title>
      <Description>{t("notFound.description")}</Description>
      <BackLink to="/">{t("notFound.goBack")}</BackLink>
    </Container>
  );
};

export default NotFound;
