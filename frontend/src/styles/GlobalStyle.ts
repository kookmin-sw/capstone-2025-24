import { createGlobalStyle } from 'styled-components';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

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
    --gray600: #8D8D8D;
    --gray500: #ADADAD;
    --gray400: #D9D9D9;
    --gray300: #fdfdfd;
    --red: #FF6161;
    --yellow: #FFDF86;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body, #root {
    width: 100%;
    height: 100%;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body, #root {
    width: 100%;
    height: 100%;
  }

  .date-picker-wrapper input {
    background-color: white;
  }

  .date-picker-wrapper.open input {
    background-color: var(--primary500);
  }

  .custom-datepicker {
    font-size: 18px;
    width: 120px;
    text-align: center;
    border: none;
    outline: none;
    cursor: pointer;
  }

  .custom-toast {
    background: rgba(0, 0, 0, 0.7);
    color: #fff;
    font-size: 17px;
    font-weight: 600;
    padding: 12px 25px;
    backdrop-filter: blur(2px);
    border-radius: 30px;
    display: flex;
    align-items: center;
    gap: 16px;
    width: fit-content;
    margin-top: 450px;
  }

  .dots_custom {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;
    margin: 0;
  }

  .dots_custom li {
    list-style: none;
    display: inline-block;
    justify-content: center;
    margin: 0 10px;
    cursor: pointer;
  }

  .dots_custom li button {
    height: 7px;
    width: 7px;
    border-radius: 100%;
    cursor: pointer;
    border: none;
    background: white;
    vertical-align: middle;
    color: transparent;
  }

  .dots_custom li.slick-active button {
    background-color: white;
    width: 10px;
    height: 10px;
    cursor: pointer;
  }
`;

export default GlobalStyle;
