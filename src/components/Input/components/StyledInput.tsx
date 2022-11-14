import styled from "styled-components";
import InputBase from "@material-ui/core/InputBase";

const StyledInput = styled(InputBase)`
  /* padding: 0 0 7px 0;
  border: 1px solid #dddddd; */
  background: #ffffff;
  border: 0.5px solid rgba(132, 151, 166, 0.5);
  border-radius: 5px;
  padding: 7px 10px;
  & > input {
    padding: 0;
    font-size: 14px;
  }
`;

export default StyledInput;
