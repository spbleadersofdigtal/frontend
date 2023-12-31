import {ReactFCC} from '../../utils/ReactFCC';
import {PDFDownloadLink} from '@react-pdf/renderer';
import {useUrlParam} from '../../hooks/useUrlParam';
import {DECK_PAGE_PARAM} from '../../app/routes';
import {MyDocument} from './document/Document';
import {useDeck} from '../../api/deck/getDeck';
import {useCallback, useEffect, useRef, useState} from 'react';
import {generateMarketChart} from './document/media/generateMarketChart';
import {Loader} from '../../components/Loader';
import s from './DeckPage.module.scss';
import {generateFinancialChart} from './document/media/generateFinancialChart';
import {generateGrowChart} from './document/media/generateGrowChart';
import {useConvert} from '../../api/deck/convert';

export const DeckPage: ReactFCC = () => {
  const deckId = useUrlParam(DECK_PAGE_PARAM, {parser: parseInt});

  const [enabled, setEnabled] = useState(false);

  const { data } = useDeck({
    deckId: deckId ?? 0,
    config: {
      enabled: !!deckId && enabled
    }
  });

  const [marketChart, setMarketChart] = useState('');
  const [financialChart, setFinancialChart] = useState('');
  const [growChart, setGrowChart] = useState('');

  const [rendered, setRendered] = useState(false);

  const initRef = useRef(false);

  useEffect(() => {
    if (!data || initRef.current) {
      return;
    }

    initRef.current = true;

    const market_values = data.slides[4].data.find((i) => i.slug === 'market_values')?.answer as any;
    const users_metrics = data.slides[7].data.find((i) => i.slug === 'users_metrics')?.answer as any;

    const company_value = data.slides[10].data.find((i) => i.slug === 'company_value')?.answer.sum as number;
    const future_value = data.slides[10].data.find((i) => i.slug === 'future_value')?.answer.sum as number;
    const time_to_spend = data.slides[10].data.find((i) => i.slug === 'time_to_spend')?.answer as any;

    generateMarketChart(
     'chart1',
      [market_values.tam, market_values.sam, market_values.som],
      (data) => setMarketChart(data)
    );

    generateFinancialChart(
      'chart2',
      [users_metrics.cac, users_metrics.ltv],
      (data) => setFinancialChart(data)
    );

    generateGrowChart(
      'chart3',
      [company_value, future_value, time_to_spend],
      (data) => setGrowChart(data)
    );
  }, [data]);

  useEffect(() => {
    setTimeout(() => {
      setEnabled(true)
    }, 3000);
  }, []);

  const { mutateAsync: convert, isLoading } = useConvert();

  const getPptxLink = useCallback(async (blob: Blob | null) => {
    if (!blob || isLoading) {
      return;
    }

    const file = new File([blob], "name", {
      type: 'application/pdf'
    });

    const data = await convert({ pdf: file });

    if (data.pptx) {
      window.open(data.pptx,'_blank', 'noopener');
    }
  }, [convert, isLoading])

  return (
    <div className={s.DeckPage}>
      {!rendered && (
        <Loader className={s.DeckPage__loader} />
      )}
      {data && marketChart && financialChart && growChart ? (
        <PDFDownloadLink document={
          <MyDocument
            onRender={() => setRendered(true)}
            data={data}
            marketChart={marketChart}
            financialChart={financialChart}
            growChart={growChart}
          />}
          fileName="somename.pdf">
          {({ blob, url, error }) =>
            <div style={{ color: 'black' }}>
              <>
                {error && `Ошибка: ${error}`}

                {blob && (
                  <>
                    <div className={s.DeckPage__link} onClick={() => getPptxLink(blob)}>Скачать PPTX</div>
                    {isLoading && <div className={s.DeckPage__span}>Загрузка...</div>}
                  </>
                )}

                {url && (
                  <iframe title={'pdf-viewer'} src={url!} style={{ width: '100vw', height: '100vh', border: 'none' }} />
                )}
              </>
            </div>
          }
        </PDFDownloadLink>
      ) : (
        <div style={{ visibility: 'hidden' }}>
          <canvas id={'chart1'} />
          <canvas id={'chart2'} />
          <canvas id={'chart3'} />
        </div>
      )}
    </div>
  )
}