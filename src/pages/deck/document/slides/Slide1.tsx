import {ReactFCC} from '../../../../utils/ReactFCC';
import {Page, StyleSheet, Text, View} from '@react-pdf/renderer';
import {bgColor, pageFontStyles, primaryColor, titleStyles} from '../shared';
import format from 'date-fns/format';
import {GetDeckResponse} from '../../../../api/deck/getDeck';
import {ExtractArray} from '../../../../utils/types';

export interface Slide1Props {
  title: string;
  description: string;
  data: ExtractArray<GetDeckResponse['slides']>['data'];
}

const styles = StyleSheet.create({
  page: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    backgroundColor: bgColor,
    color: primaryColor,
    padding: '56px',
    ...pageFontStyles
  },
  mainBlock: {
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch'
  },
  title: {
    ...titleStyles,
    fontSize: 96,
    fontFamily: 'Roboto Slab',
    color: 'black'
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: primaryColor,
    margin: '0 0'
  },
  description: {
    marginTop: '16px',
    width: '100%',
    fontSize: '20px',
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: 4
  },
  infoText: {
    fontFamily: 'Roboto',
    fontWeight: 'normal',
    fontSize: '14px',
  }
});

export const Slide1: ReactFCC<Slide1Props> = (props) => {
  const { description, data } = props;

  const name = data.find((i) => i.slug === 'names')?.answer as string;
  const your_role = data.find((i) => i.slug === 'your_role')?.answer as string;

  return (
    <Page size="A4" orientation={'landscape'} style={styles.page}>
      <View style={styles.mainBlock}>
        <Text style={styles.title}>{name}</Text>
        <View style={styles.divider} />
        <Text style={styles.description}>{description}</Text>
      </View>

      <View>
        <View style={styles.info}>
          <Text style={styles.infoText}>{your_role}</Text>
          <Text style={styles.infoText}>{format(new Date(), 'dd MMM, yyyy')}</Text>
        </View>
      </View>
    </Page>
  )
}