import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { AppLayout } from '@/components/layout/AppLayout';
import { ROUTES } from '@/config/routes';
import { AboutPage } from '@/routes/AboutPage';
import { CounterPage } from '@/routes/CounterPage';
import { FeedbackPage } from '@/routes/FeedbackPage';
import { HomePage } from '@/routes/HomePage';
import { PostsPage } from '@/routes/PostsPage';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path={ROUTES.HOME} element={<HomePage />} />
          <Route path={ROUTES.ABOUT} element={<AboutPage />} />
          <Route path={ROUTES.COUNTER} element={<CounterPage />} />
          <Route path={ROUTES.POSTS} element={<PostsPage />} />
          <Route path={ROUTES.FEEDBACK} element={<FeedbackPage />} />
          <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
