import { MotionConfig } from 'framer-motion';
import { lazy } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import { ROUTES } from '@/config/routes';
import ContactPage from '@/pages/Contact';
import { ThemeProvider } from '@/theme/ThemeProvider';

const HomePage = lazy(() => import('@/pages/Home'));
const RulesPage = lazy(() => import('@/pages/Rules'));
const TimelinePage = lazy(() => import('@/pages/Timeline'));
const BotSpecsPage = lazy(() => import('@/pages/BotSpecs'));
const RegisterPage = lazy(() => import('@/pages/Register'));
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
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path={ROUTES.HOME} element={<HomePage />} />
            <Route path={ROUTES.RULES} element={<RulesPage />} />
            <Route path={ROUTES.TIMELINE} element={<TimelinePage />} />
            <Route path={ROUTES.BOT_SPECS} element={<BotSpecsPage />} />
            <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
            <Route
              path={ROUTES.GALLERY}
              element={
                <Navigate
                  to={{ pathname: ROUTES.HOME, hash: 'from-1-0' }}
                  replace
                />
              }
            />
            <Route path={ROUTES.CONTACT} element={<ContactPage />} />
            {StyleguidePage ? (
              <Route path={ROUTES.STYLEGUIDE} element={<StyleguidePage />} />
            ) : null}
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </MotionConfig>
);

export default App;
