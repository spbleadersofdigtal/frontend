import {ReactFCC} from '../../../utils/ReactFCC';
import {Page, View, Text, StyleSheet} from '@react-pdf/renderer';

export interface Props {

}

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  }
});

export const Document: ReactFCC<Props> = (props) => {
  return (
    <Document>
      <Page>
        <View>
          <Text>Section #1</Text>
        </View>
        <View>
          <Text>Section #2</Text>
        </View>
      </Page>
    </Document>
  );
};

