import { Component, type ErrorInfo, type ReactNode } from 'react';
import { getButtonClasses } from '@/components/common/buttonStyles';

interface RouteErrorBoundaryProps {
  children: ReactNode;
}

interface RouteErrorBoundaryState {
  hasError: boolean;
}

/**
 * Catches render errors in lazy routes so a failed chunk does not white-screen
 * the whole app.
 */
export class RouteErrorBoundary extends Component<
  RouteErrorBoundaryProps,
  RouteErrorBoundaryState
> {
  public override state: RouteErrorBoundaryState = { hasError: false };

  public static getDerivedStateFromError(): RouteErrorBoundaryState {
    return { hasError: true };
  }

  public override componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error(
      '[GearStorm] Route render failed:',
      error,
      info.componentStack
    );
  }

  private handleRetry = (): void => {
    this.setState({ hasError: false });
  };

  public override render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="container-page py-24 text-center" role="alert">
          <h1 className="font-heading text-2xl font-bold md:text-3xl">
            Something went wrong
          </h1>
          <p className="mx-auto mt-4 max-w-md text-text-muted">
            This page failed to load. Check your connection and try again.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              className={getButtonClasses('primary')}
              onClick={this.handleRetry}
            >
              Try again
            </button>
            <a href="/" className={getButtonClasses('ghost')}>
              Back to Home
            </a>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
