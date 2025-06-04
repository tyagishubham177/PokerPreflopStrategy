import React from 'react';
import { useTranslation } from 'react-i18next';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      const { t } = useTranslation();
      return (
        <div style={{ padding: '20px', textAlign: 'center', border: '1px solid red', margin: '10px' }}>
          <h2>{t('somethingWentWrong')}</h2>
          <p>{this.props.fallbackMessage || t('pleaseRefresh')}</p>
          {process.env.NODE_ENV === 'development' && this.state.error && (
            <details style={{ whiteSpace: 'pre-wrap', textAlign: 'left', marginTop: '10px' }}>
              <summary>Error Details (Development Mode)</summary>
              {this.state.error.toString()}
              <br />
              {this.state.errorInfo && this.state.errorInfo.componentStack}
            </details>
          )}
        </div>
      );
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;
