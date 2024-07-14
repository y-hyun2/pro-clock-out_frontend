import React from 'react';
import theme from "../styles/theme";
import styled from "styled-components";


const ExampleDiv = styled.div`
    background-color: ${theme.colors["main-sand"]};
    color: ${theme.colors["main-purple"]};
    width: 50px;
    height: 50px;
`;

const Mypage = () => {
    return (
        <div>
            <h1>Login</h1>
            <ExampleDiv>
                HiHi
            </ExampleDiv>
        </div>
    );
};

export default Mypage;
