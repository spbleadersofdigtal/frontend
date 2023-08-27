import {ReactFCC} from '../../../../utils/ReactFCC';
import {Page, StyleSheet, Text, View} from '@react-pdf/renderer';
import {bgColor, pageFontStyles, primaryColor, subtitleStyles, titleStyles} from '../shared';
import {GetDeckResponse} from '../../../../api/deck/getDeck';
import {ExtractArray} from '../../../../utils/types';
import {Fragment} from 'react';

export interface Slide13Props {
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
    ...subtitleStyles,
    marginBottom: 24
  },
});

export const Slide13: ReactFCC<Slide13Props> = (props) => {
  const { data } = props;

  const links = data.find((i) => i.slug === 'links')?.answer as any;

  return (
    <Page size="A4" orientation={'landscape'} style={styles.page}>
      <View>
        <Text style={styles.title}>Контакты</Text>
        <View style={styles.divider} />

        {links && Object.entries(links).map(([name, link], index) => (
          <Fragment key={index}>
            <Text style={styles.subtitle}>{`${name}: ${link}`}</Text>
          </Fragment>
        ))}
      </View>
    </Page>
  )
}