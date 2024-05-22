import styled from "@emotion/styled";

export const SC = {
    ButtonPosition: styled.div`
    display: flex;
    justify-content: space-between;
    margin-right: 30%;
    margin-left: 30%;
    margin-top: 5%;
    @media (max-width: 700px) {
      display: table-row;
      justify-content: center;
      margin-right: 30%;
      margin-left: 30%;
      margin-top: 5%;
    }
  `,
};
