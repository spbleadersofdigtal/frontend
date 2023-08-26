import {ReactFCC} from '../../../../utils/ReactFCC';
import {Page, StyleSheet, Text, View} from '@react-pdf/renderer';
import {bgColor, primaryColor} from '../shared';
import {GetDeckResponse} from '../../../../api/deck/getDeck';
import {ExtractArray} from '../../../../utils/types';

export interface SlideProps {
  data: ExtractArray<GetDeckResponse['slides']>['data'];
}

const styles = StyleSheet.create({
  page: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    backgroundColor: bgColor,
    color: primaryColor,
    fontFamily: 'Roboto',
    padding: '48px',
  },
  title: {
    fontSize: 36,
    width: '100%',
    letterSpacing: 3,
    textTransform: 'uppercase'
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
  },
});

export const Slide3: ReactFCC<SlideProps> = (props) => {
  const { data } = props;

  const actuality = data.find((i) => i.slug === 'actuality')?.answer as string;

  return (
    <Page size="A4" orientation={'landscape'} style={styles.page}>
      <View>
        <Text style={styles.title}>Описание и ценностное предложение стартапа</Text>
        <View style={styles.divider} />
        <Text style={styles.text}>{actuality}</Text>
      </View>
    </Page>
  )
}