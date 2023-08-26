import {ReactFCC} from '../../../../utils/ReactFCC';
import {Image, Page, StyleSheet, Text, View} from '@react-pdf/renderer';
import {bgColor, primaryColor} from '../shared';
import {GetDeckResponse} from '../../../../api/deck/getDeck';
import {ExtractArray} from '../../../../utils/types';

export interface Slide11Props {
  data: ExtractArray<GetDeckResponse['slides']>['data'];
  growChart: string;
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
    marginBottom: 24
  },
  subtitle: {
    width: '100%',
    fontSize: '24px',
  },
  image: {
    maxWidth: '600px',
    maxHeight: '300px',
    margin: '50 auto 0'
  }
});

export const Slide11: ReactFCC<Slide11Props> = (props) => {
  const { data, growChart } = props;

  return (
    <Page size="A4" orientation={'landscape'} style={styles.page}>
      <View>
        <Text style={styles.title}>Инвестиционный раунд</Text>
        <View style={styles.divider} />

        <Image style={styles.image} src={growChart} />
      </View>
    </Page>
  )
}