import {ReactFCC} from '../../../utils/ReactFCC';
import {Document, Font} from '@react-pdf/renderer';
import {Slide1} from './slides/Slide1';
import {GetDeckResponse} from '../../../api/deck/getDeck';
import {Slide2} from './slides/Slide2';
import {Slide3} from './slides/Slide3';
import {Slide4} from './slides/Slide4';
import {Slide5} from './slides/Slide5';
import {Slide6} from './slides/Slide6';
import {Slide8} from './slides/Slide8';
import {Slide7} from './slides/Slide7';
import Chart from 'chart.js/auto';
import {Slide9} from './slides/Slide9';
import {Slide10} from './slides/Slide10';
import {Slide11} from './slides/Slide11';
import {Slide12} from './slides/Slide12';
import {Slide13} from './slides/Slide13';
import {BACKEND_URL} from '../../../config';

Chart.defaults.font.size = 20;

export interface MyDocumentProps {
  data: GetDeckResponse;
  onRender: () => void;
  marketChart: string;
  financialChart: string;
  growChart: string;
}

Font.register({
  family: "Roboto",
  fonts: [
    { fontWeight: 'medium', src: "https://cdn.jsdelivr.net/npm/roboto-font@0.1.0/fonts/Roboto/roboto-medium-webfont.ttf" },
    { fontWeight: 'normal', src: "https://cdn.jsdelivr.net/npm/roboto-font@0.1.0/fonts/Roboto/roboto-regular-webfont.ttf" },
    { fontWeight: 'light', src: "https://cdn.jsdelivr.net/npm/roboto-font@0.1.0/fonts/Roboto/roboto-light-webfont.ttf" },
  ]
});

Font.register({
  family: "Roboto Slab",
  fonts: [
    { fontWeight: 'light', src: "https://cdn.jsdelivr.net/npm/roboto-font@0.1.0/fonts/Roboto_slab/robotoslab-light-webfont.ttf" },
    { fontWeight: 'normal', src: "https://cdn.jsdelivr.net/npm/roboto-font@0.1.0/fonts/Roboto_slab/robotoslab-regular-webfont.ttf" },
  ]
});

export const MyDocument: ReactFCC<MyDocumentProps> = (props) => {
  const { data, marketChart, financialChart, growChart, onRender } = props;

  const images = data.slides[12].data?.find((i) => i.slug === 'images')?.photos;

  return (
    <Document onRender={onRender}>
      <Slide1 title={data.deck.name} description={data.deck.description} data={data.slides[0].data} />
      <Slide2 data={data.slides[1].data} />
      <Slide3 data={data.slides[2].data} image={images?.[0] ? BACKEND_URL + images[0] : undefined} />
      <Slide4 data={data.slides[3].data} image={images?.[1] ? BACKEND_URL + images[1] : undefined} />
      <Slide5 data={data.slides[4].data} marketChart={marketChart} />
      <Slide6 data={data.slides[5].data} />
      <Slide7 data={data.slides[6].data} />
      <Slide8 data={data.slides[7].data} financialChart={financialChart} />
      <Slide9 data={data.slides[8].data} />
      <Slide10 data={data.slides[9].data} />
      <Slide11 data={data.slides[10].data} growChart={growChart} />
      <Slide12 data={data.slides[11].data} />
      <Slide13 data={data.slides[12].data} />
    </Document>
  );
};

