declare module 'react-slick' {
  import * as React from 'react';

  export interface Settings {
    dots?: boolean;
    arrows?: boolean;
    infinite?: boolean;
    speed?: number;
    slidesToShow?: number;
    slidesToScroll?: number;
    autoplay?: boolean;
    autoplaySpeed?: number;
    className?: string;
    [key: string]: ReactNode;
  }

  export default class Slider extends React.Component<Settings> {}
}
