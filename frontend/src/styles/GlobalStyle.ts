import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  :root{
    --primary900: #5873EE;
    --primary800: #7D92ED;
    --primary700: #A8B3E3;
    --primary600: #C5CAE4;
    --primary500: #E1E2E8;
    --primary400: #F2F4FF;
    --primary300: #F6F9FF;
    --gray800: #4F4F4F;
    --gray700: #717171;
    --gray600: #E1E2E8;
    --gray500: #ADADAD;
    --gray400: #D9D9D9;
    --red: #FF6161;
    --yellow: #FFDF86;
  }
`;

export default GlobalStyle;