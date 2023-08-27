import {ReactFCC} from '../../../../utils/ReactFCC';
import {Image, Page, StyleSheet, Text, View} from '@react-pdf/renderer';
import {bgColor, pageFontStyles, primaryColor, subtitleStyles, titleStyles} from '../shared';
import {GetDeckResponse} from '../../../../api/deck/getDeck';
import {ExtractArray} from '../../../../utils/types';
import {currencyFormatter} from '../../../../utils/fomat';

export interface Slide8Props {
  data: ExtractArray<GetDeckResponse['slides']>['data'];
  financialChart: string;
}

const styles = StyleSheet.create({
  page: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    backgroundColor: bgColor,
    color: primaryColor,
    padding: '48px',
    ...pageFontStyles
  },
  title: {
    ...titleStyles
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: primaryColor,
    margin: '8px 0 16px'
  },
  subtitle: {
    ...subtitleStyles
  },
  text: {
    width: '100%',
    fontSize: '20px',
    marginBottom: 24
  },
  image: {
    maxWidth: '600px',
    maxHeight: '300px',
    margin: '0 auto'
  }
});

export const Slide8: ReactFCC<Slide8Props> = (props) => {
  const { data, financialChart } = props;

  const how_much_investments = data.find((i) => i.slug === 'how_much_investments')?.answer.sum as any;
  const financial_indicators = data.find((i) => i.slug === 'financial_indicators')?.answer as any;
  const users_metrics = data.find((i) => i.slug === 'users_metrics')?.answer as any;

  return (
    <Page size="A4" orientation={'landscape'} style={styles.page}>
      <View>
        <Text style={styles.title}>Финансы</Text>
        <View style={styles.divider} />

        <Text style={styles.subtitle}>Уже получено инвестиций</Text>
        <Text style={styles.text}>{currencyFormatter.format(how_much_investments)}р.</Text>

        <Text style={styles.subtitle}>Финансовые индикаторы</Text>
        <Text style={styles.text}>{financial_indicators}</Text>
        <Image style={styles.image} src={financialChart} />
      </View>
    </Page>
  )
}