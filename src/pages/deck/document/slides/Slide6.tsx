import {ReactFCC} from '../../../../utils/ReactFCC';
import {Image, Page, StyleSheet, Text, View} from '@react-pdf/renderer';
import {bgColor, pageFontStyles, primaryColor, subtitleStyles, titleStyles} from '../shared';
import {GetDeckResponse} from '../../../../api/deck/getDeck';
import {ExtractArray} from '../../../../utils/types';

export interface Slide6Props {
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
  subtitle: {
    ...subtitleStyles
  },
});

export const Slide6: ReactFCC<Slide6Props> = (props) => {
  const { data } = props;

  const competitors = data.find((i) => i.slug === 'competitors')?.answer as string;
  const competitors_strength = data.find((i) => i.slug === 'competitors_strength')?.answer as string;
  const competitors_low = data.find((i) => i.slug === 'competitors_low')?.answer as string;
  const advantages = data.find((i) => i.slug === 'advantages')?.answer as string;

  return (
    <Page size="A4" orientation={'landscape'} style={styles.page}>
      <View>
        <Text style={styles.title}>Конкуренты</Text>
        <View style={styles.divider} />

        <Text style={styles.text}>{competitors}</Text>

        <Text style={styles.subtitle}>Сильные стороны</Text>
        <Text style={styles.text}>{competitors_strength}</Text>

        <Text style={styles.subtitle}>Слабые стороны</Text>
        <Text style={styles.text}>{competitors_low}</Text>

        <Text style={styles.subtitle}>Наши преимущества</Text>
        <Text style={styles.text}>{advantages}</Text>
      </View>
    </Page>
  )
}