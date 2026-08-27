// src/components/common/SectionErrorBoundary.jsx
import React from "react";

export default class SectionErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // Send to your logging/monitoring here (Sentry, LogRocket, console, etc.)
    console.error(`[${this.props.name || "Section"}] crashed:`, error, info);
  }

  render() {
    if (this.state.hasError) {
      // Fails gracefully — rest of the page still renders
      return null;
    }
    return this.props.children;
  }
}
