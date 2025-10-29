import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, message: "" };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, message: error.message };
  }

  componentDidCatch(error, errorInfo) {
    console.error("⚠️ Error caught by ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            textAlign: "center",
            padding: "3rem",
            color: "#333",
            background: "#fff3f3",
            borderRadius: "10px",
            margin: "2rem",
          }}
        >
          <h2>⚠️ Something went wrong.</h2>
          <p>{this.state.message || "Please try refreshing the page."}</p>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: "0.6rem 1.5rem",
              background: "#d9534f",
              border: "none",
              borderRadius: "8px",
              color: "#fff",
              cursor: "pointer",
              marginTop: "1rem",
            }}
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
