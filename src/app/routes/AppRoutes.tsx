import {Route, Routes} from 'react-router-dom';
import {ChatPage} from '../../pages/chat';
import {CHAT_PAGE_ROUTE} from './routes';

export const AppRoutes = () => {

  return (
    <Routes>
      <Route path={CHAT_PAGE_ROUTE} element={<ChatPage />} />
    </Routes>
  );
};

