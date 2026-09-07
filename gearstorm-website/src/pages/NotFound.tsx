import { Link } from 'react-router-dom';
import { getButtonClasses } from '@/components/common/buttonStyles';
import { ROUTES } from '@/config/routes';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';

const NotFoundPage = (): JSX.Element => {
  useDocumentTitle('Page Not Found');

  return (
    <div className="container-page animate-fade-in py-24 text-center">
      <p className="font-heading text-6xl font-extrabold text-primary md:text-8xl">
        404
      </p>
      <h1 className="mt-4 font-heading text-2xl font-bold md:text-3xl">
        This page does not exist
      </h1>
      <p className="mx-auto mt-4 max-w-md text-text-muted">
        Check the address, or go back to the home page.
      </p>
      <div className="mt-8 flex justify-center">
        <Link to={ROUTES.HOME} className={getButtonClasses('primary')}>
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
