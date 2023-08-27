import {ReactFCC} from '../../../../utils/ReactFCC';
import {Image, Page, StyleSheet, Text, View} from '@react-pdf/renderer';
import {bgColor, pageFontStyles, primaryColor, subtitleStyles, titleStyles} from '../shared';
import {GetDeckResponse} from '../../../../api/deck/getDeck';
import {ExtractArray} from '../../../../utils/types';
import {currencyFormatter, formatDate} from '../../../../utils/fomat';

export interface Slide10Props {
  data: ExtractArray<GetDeckResponse['slides']>['data'];
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
    ...titleStyles,
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
  subtitle: {
    ...subtitleStyles
  },
});

export const Slide10: ReactFCC<Slide10Props> = (props) => {
  const { data } = props;

  const how_much_investments = data.find((i) => i.slug === 'how_much_investments')?.answer.sum as any;
  const time_to_spend = data.find((i) => i.slug === 'time_to_spend')?.answer as any;
  const investments_sold = data.find((i) => i.slug === 'investments_sold')?.answer as any;

  return (
    <Page size="A4" orientation={'landscape'} style={styles.page}>
      <View>
        <Text style={styles.title}>Инвестиционный раунд</Text>
        <View style={styles.divider} />

        <Text style={styles.subtitle}>Сколько инвестиций необходимо</Text>
        <Text style={styles.text}>{currencyFormatter.format(how_much_investments)}р.</Text>

        <Text style={styles.subtitle}>Цели инвестиций</Text>
        <Text style={styles.text}>{investments_sold}</Text>

        <Text style={styles.subtitle}>Срок освоения инвестиций</Text>
        <Text style={styles.text}>{formatDate(time_to_spend)}</Text>
      </View>
    </Page>
  )
}