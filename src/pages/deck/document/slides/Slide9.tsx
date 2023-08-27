import {ReactFCC} from '../../../../utils/ReactFCC';
import {Image, Page, StyleSheet, Text, View} from '@react-pdf/renderer';
import {bgColor, pageFontStyles, primaryColor, titleStyles} from '../shared';
import {GetDeckResponse} from '../../../../api/deck/getDeck';
import {ExtractArray} from '../../../../utils/types';
import {BACKEND_URL} from '../../../../config';

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
    fontSize: '16px',
  },
  map: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 24,
    marginTop: 16
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    width: 200,
  },
  image: {
    width: 200,
    height: 150,
    objectFit: 'cover'
  }
});

export const Slide9: ReactFCC<Slide9Props> = (props) => {
  const { data } = props;

  const your_role = data.find((i) => i.slug === 'your_role') as any;
  const url = your_role?.photos?.[0];
  const your_teammates = data.find((i) => i.slug === 'your_teammates') as any;

  return (
    <Page size="A4" orientation={'landscape'} style={styles.page}>
      <View>
        <Text style={styles.title}>Команда</Text>
        <View style={styles.divider} />

        <View style={styles.map}>
          {your_teammates && your_teammates.answer?.map((i: any, index: number) => {
            const url = your_teammates?.photos?.[index];

            return (
              <View style={styles.item} key={index}>
                {url && (
                  <Image style={styles.image} src={BACKEND_URL + url} />
                )}
                <Text style={styles.text}>{i}</Text>
              </View>
            )
          })}
        </View>
      </View>
    </Page>
  )
}