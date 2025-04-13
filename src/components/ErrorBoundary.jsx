import React from "react";
import { motion } from "framer-motion";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="min-h-screen bg-gray-50 flex items-center justify-center p-4"
        >
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-lg w-full">
            <div className="text-center mb-6">
              <span className="text-5xl mb-4 block">⚠️</span>
              <h1 className="text-2xl font-bold text-gray-800 mb-2">
                Oops! Something went wrong
              </h1>
              <p className="text-gray-600">
                We're sorry for the inconvenience. Please try refreshing the
                page.
              </p>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.reload()}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Refresh Page
            </motion.button>

            {process.env.NODE_ENV === "development" && this.state.error && (
              <div className="mt-6 p-4 bg-gray-100 rounded-lg">
                <p className="text-sm font-mono text-gray-700 break-all">
                  {this.state.error.toString()}
                </p>
                <pre className="mt-2 text-xs text-gray-600 overflow-auto">
                  {this.state.errorInfo.componentStack}
                </pre>
              </div>
            )}
          </div>
        </motion.div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
