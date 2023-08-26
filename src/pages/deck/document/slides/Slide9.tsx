import {ReactFCC} from '../../../../utils/ReactFCC';
import {Image, Page, StyleSheet, Text, View} from '@react-pdf/renderer';
import {bgColor, primaryColor} from '../shared';
import {GetDeckResponse} from '../../../../api/deck/getDeck';
import {ExtractArray} from '../../../../utils/types';

export interface Slide9Props {
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
    marginBottom: 24
  },
});

export const Slide9: ReactFCC<Slide9Props> = (props) => {
  const { data } = props;

  // const how_much_investments = data.find((i) => i.slug === 'how_much_investments')?.answer as any;
  // const users_metrics = data.find((i) => i.slug === 'users_metrics')?.answer as any;

  return (
    <Page size="A4" orientation={'landscape'} style={styles.page}>
      <View>
        <Text style={styles.title}>Команда</Text>
        {/*<View style={styles.divider} />*/}
        {/*<Text style={styles.text}>{how_much_investments}</Text>*/}
      </View>
    </Page>
  )
}