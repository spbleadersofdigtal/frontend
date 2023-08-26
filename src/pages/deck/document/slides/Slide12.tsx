import {ReactFCC} from '../../../../utils/ReactFCC';
import {Image, Page, StyleSheet, Text, View} from '@react-pdf/renderer';
import {bgColor, primaryColor} from '../shared';
import {GetDeckResponse} from '../../../../api/deck/getDeck';
import {ExtractArray} from '../../../../utils/types';
import {formatDate} from '../../../../utils/fomat';
import {Fragment} from 'react';

export interface Slide12Props {
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
  subtitle: {
    fontSize: '18px',
    marginBottom: '4px',
    marginLeft: '-6px'
  },
  text: {
    fontSize: '14px',
    marginLeft: '-6px'
  },
  map: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 70
  },
  item: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    borderTop: '1px solid black',
    padding: '16px 16px 0 0',
  },
  dot: {
    width: 8,
    height: 8,
    backgroundColor: 'black',
    borderRadius: '50%',
    marginTop: '-3.5px'
  }
});

export const Slide12: ReactFCC<Slide12Props> = (props) => {
  const { data } = props;

  const aims = data.find((i) => i.slug === 'aims')?.answer as any;

  return (
    <Page size="A4" orientation={'landscape'} style={styles.page}>
      <View>
        <Text style={styles.title}>Роадмап</Text>
        <View style={styles.divider} />

        <View style={styles.map}>
          <View style={styles.dot} />
          {Object.entries(aims).map(([date, text], index) => (
            <Fragment key={index}>
              <View style={styles.item}>
                <Text style={styles.subtitle}>{formatDate(date)}</Text>
                <Text style={styles.text}>{text as string}</Text>
              </View>
              <View style={styles.dot} />
            </Fragment>
          ))}
        </View>
      </View>
    </Page>
  )
}