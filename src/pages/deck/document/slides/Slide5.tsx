import {ReactFCC} from '../../../../utils/ReactFCC';
import {Image, Page, StyleSheet, Text, View} from '@react-pdf/renderer';
import {bgColor, pageFontStyles, primaryColor, titleStyles} from '../shared';
import {GetDeckResponse} from '../../../../api/deck/getDeck';
import {ExtractArray} from '../../../../utils/types';
import {currencyFormatter} from '../../../../utils/fomat';

export interface Slide5Props {
  data: ExtractArray<GetDeckResponse['slides']>['data'];
  marketChart: string;
}

const styles = StyleSheet.create({
  page: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    backgroundColor: bgColor,
    color: primaryColor,
    padding: '48px',
    ...pageFontStyles,
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

export const Slide5: ReactFCC<Slide5Props> = (props) => {
  const { data, marketChart } = props;

  const market_values = data.find((i) => i.slug === 'market_values')?.answer as any;
  const users = data.find((i) => i.slug === 'users')?.answer as string;

  return (
    <Page size="A4" orientation={'landscape'} style={styles.page}>
      <View>
        <Text style={styles.title}>Рынок</Text>
        <View style={styles.divider} />
        <Text style={styles.text}>Целевая аудитория: {users}</Text>
        <Text style={styles.text}>Объем рынка (TAM): {currencyFormatter.format(market_values.tam)}р.</Text>
        <Image style={styles.image} src={marketChart} />
      </View>
    </Page>
  )
}