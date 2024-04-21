import styled from "styled-components";
import { styleVar } from "./styleVariables";

const AsideNavContainer = styled.div`
  display: grid;
  grid-template-rows: 3fr 2fr;

  color: white;

  background: ${styleVar.neutral900};

  @media (max-width: 1340px) {
    max-height: 692px;
  }
`;

const ActivitiesList = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: calc(100vh - 16rem);
`;

const ActivityPicto = styled.img`
  padding: 1rem;
`;

const Disclaimer = styled.p`
  display: flex;
  align-items: center;

  padding: 2.4rem 0;

  font-size: 0.8rem;
  writing-mode: vertical-lr;

  transform: rotate(180deg);

  @media (max-width: 1340px) {
    padding: 2rem;
  }
`;

export { AsideNavContainer, ActivitiesList, ActivityPicto, Disclaimer };
