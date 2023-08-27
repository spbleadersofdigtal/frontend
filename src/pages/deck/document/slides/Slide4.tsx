import {ReactFCC} from '../../../../utils/ReactFCC';
import {Image, Page, StyleSheet, Text, View} from '@react-pdf/renderer';
import {bgColor, pageFontStyles, primaryColor, secondaryColor, titleStyles} from '../shared';
import {GetDeckResponse} from '../../../../api/deck/getDeck';
import {ExtractArray} from '../../../../utils/types';

export interface SlideProps {
  data: ExtractArray<GetDeckResponse['slides']>['data'];
  image?: string;
}

const percentOffset = 70;

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
  imageContainer: {
    position: 'absolute',
    top: 48,
    right: 20,
    padding: '10px 20px',
    border: `1px solid ${secondaryColor}`
  },
  image: {
    width: 200,
    height: 200,
    objectFit: 'contain'
  }
});

export const Slide4: ReactFCC<SlideProps> = (props) => {
  const { data, image } = props;

  const solve = data.find((i) => i.slug === 'solve')?.answer as string;
  const works = data.find((i) => i.slug === 'works')?.answer as string;

  return (
    <Page size="A4" orientation={'landscape'} style={styles.page}>
      <Text style={{ ...styles.title, width: image ? `${percentOffset}%` : '100%' }}>Решение</Text>
      <View style={{ ...styles.divider, width: image ? `${percentOffset}%` : '100%' }} />
      <Text style={{ ...styles.text, width: image ? `${percentOffset}%` : '100%' }}>{solve}</Text>
      <Text style={{ ...styles.text, width: image ? `${percentOffset}%` : '100%' }}>{works}</Text>

      {image && (
        <View style={styles.imageContainer}>
          <Image src={image} style={styles.image} />
        </View>
      )}
    </Page>
  )
}