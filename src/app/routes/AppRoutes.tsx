import {Route, Routes} from 'react-router-dom';
import {ChatPage} from '../../pages/chat';
import {CHAT_PAGE_ROUTE, DECK_PAGE_ROUTE} from './routes';
import {DeckPage} from '../../pages/deck';

export const AppRoutes = () => {

  return (
    <Routes>
      <Route path={CHAT_PAGE_ROUTE} element={<ChatPage />} />
      <Route path={DECK_PAGE_ROUTE} element={<DeckPage />} />
    </Routes>
  );
};

