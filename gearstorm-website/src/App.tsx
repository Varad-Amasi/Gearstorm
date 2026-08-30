import { MotionConfig } from 'framer-motion';
import { lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CustomCursor } from '@/components/common/CustomCursor';
import { MainLayout } from '@/components/layout/MainLayout';
import { ROUTES } from '@/config/routes';

const HomePage = lazy(() => import('@/pages/Home'));
const RulesPage = lazy(() => import('@/pages/Rules'));
const BotSpecsPage = lazy(() => import('@/pages/BotSpecs'));
const LeaderboardPage = lazy(() => import('@/pages/Leaderboard'));
const RegisterPage = lazy(() => import('@/pages/Register'));
const GalleryPage = lazy(() => import('@/pages/Gallery'));
const ContactPage = lazy(() => import('@/pages/Contact'));
const NotFoundPage = lazy(() => import('@/pages/NotFound'));

/**
 * Component reference page. The ternary lets the bundler drop the import from
 * production builds, since `import.meta.env.DEV` is inlined as `false`.
 */
const StyleguidePage = import.meta.env.DEV
  ? lazy(() => import('@/pages/Styleguide'))
  : null;

const App = (): JSX.Element => (
  /* reducedMotion="user" makes every motion component honor the OS setting. */
  <MotionConfig reducedMotion="user">
    <BrowserRouter>
      <CustomCursor />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path={ROUTES.HOME} element={<HomePage />} />
          <Route path={ROUTES.RULES} element={<RulesPage />} />
          <Route path={ROUTES.BOT_SPECS} element={<BotSpecsPage />} />
          <Route path={ROUTES.LEADERBOARD} element={<LeaderboardPage />} />
          <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
          <Route path={ROUTES.GALLERY} element={<GalleryPage />} />
          <Route path={ROUTES.CONTACT} element={<ContactPage />} />
          {StyleguidePage ? (
            <Route path={ROUTES.STYLEGUIDE} element={<StyleguidePage />} />
          ) : null}
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </MotionConfig>
);

export default App;
