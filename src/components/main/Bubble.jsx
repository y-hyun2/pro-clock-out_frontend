
import styled from 'styled-components';


export const Bubble = styled.div`
  position: relative;
  padding: 20px 40px;
  margin-left: 10px;
  top: 60px;
  display: inline-block;
  vertical-align: middle;
  color: #fff; /* Text color */
//   border: 2px solid #000; /* Stroke effect */
  border-radius: 20px;
  background-color: #7A7EE3;
  font-size: 40px;
  font-weight: bold;

  &:after {
    content: "";
    position: absolute;
    top: 21px;
    left: -30px;
    border-right: 30px solid #7A7EE3;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
  }
`;

