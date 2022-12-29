import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
`

export const Header = styled.View`
  background-color: ${({ theme }) => theme.colors.header};
  height: 100px;
`