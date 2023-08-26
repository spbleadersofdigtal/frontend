import {ReactFCC} from '../../utils/ReactFCC';
import {PDFViewer} from '@react-pdf/renderer';
import {useUrlParam} from '../../hooks/useUrlParam';
import {DECK_PAGE_PARAM} from '../../app/routes';
import {Document} from './document/Document';

export const DeckPage: ReactFCC = () => {
  const deckId = useUrlParam(DECK_PAGE_PARAM, {parser: parseInt});
  console.log(deckId);

  return (
    <PDFViewer>
      <Document />
    </PDFViewer>
  )
}