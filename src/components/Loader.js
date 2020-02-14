import React from "react";
import styled from "styled-components";
import { Loader } from "semantic-ui-react";

const Container = styled.div`
  height: 70vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 5px;
  margin-top: 20px;
`;

export default () => (
  <Container>
    <Loader active inline />
  </Container>
);
