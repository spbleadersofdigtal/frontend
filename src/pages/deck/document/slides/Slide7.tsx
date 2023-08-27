import {ReactFCC} from '../../../../utils/ReactFCC';
import {Image, Page, StyleSheet, Text, View} from '@react-pdf/renderer';
import {bgColor, pageFontStyles, primaryColor, subtitleStyles, titleStyles} from '../shared';
import {GetDeckResponse} from '../../../../api/deck/getDeck';
import {ExtractArray} from '../../../../utils/types';
import {BACKEND_URL} from '../../../../config';

export interface Slide7Props {
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
  image: {
    margin: '0 auto',
    width: 400,
    height: 400,
    objectFit: 'contain'
  }
});

export const Slide7: ReactFCC<Slide7Props> = (props) => {
  const { data } = props;

  const money = data.find((i) => i.slug === 'money')?.answer as string;
  const finance_model = data.find((i) => i.slug === 'finance_model')?.photos
  const url = finance_model?.[0] ? BACKEND_URL + finance_model[0] : undefined;

  return (
    <Page size="A4" orientation={'landscape'} style={styles.page}>
      <View>
        <Text style={styles.title}>Бизнес-модель</Text>
        <View style={styles.divider} />

        <Text style={styles.text}>{money}</Text>

        {url && (
          <Image src={url} style={styles.image} />
        )}
      </View>
    </Page>
  )
}