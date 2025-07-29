import React, { useState, useEffect } from 'react';

const PDFViewer = ({ pdfUrl, fileName = 'document.pdf', onClose }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Reset states when pdfUrl changes
    setLoading(true);
    setError(null);
    
    // Simulate loading time for iframe
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [pdfUrl]);

  const handleIframeError = () => {
    setError('Failed to load PDF. Please try downloading it instead.');
    setLoading(false);
  };

  const downloadPDF = () => {
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Resume - Mojila Portfolio</h2>
          <div className="flex items-center space-x-2">
            <button
              onClick={downloadPDF}
              className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors duration-200"
              aria-label="Download PDF"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download
            </button>
            <button
              onClick={onClose}
              className="inline-flex items-center px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white text-sm font-medium rounded-lg transition-colors duration-200"
              aria-label="Close PDF viewer"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Close
            </button>
          </div>
        </div>

        {/* PDF Content */}
        <div className="flex-1 overflow-auto bg-gray-100 p-4">
          {loading && (
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <svg className="w-8 h-8 animate-spin mx-auto mb-2 text-blue-600" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <p className="text-gray-600">Loading PDF...</p>
              </div>
            </div>
          )}

          {error && (
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <svg className="w-8 h-8 mx-auto mb-2 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <p className="text-red-600">{error}</p>
                <button
                  onClick={downloadPDF}
                  className="mt-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg"
                >
                  Download PDF instead
                </button>
              </div>
            </div>
          )}

          {!loading && !error && (
            <div className="flex flex-col items-center h-full">
              <iframe
                src={pdfUrl}
                width="100%"
                height="600px"
                className="border border-gray-300 rounded"
                title="PDF Viewer"
                onError={handleIframeError}
              />
            </div>
          )}
        </div>

        {/* Navigation Info */}
        {!loading && !error && (
          <div className="p-4 border-t border-gray-200 bg-gray-50 text-center">
            <span className="text-sm text-gray-600">
              PDF is displayed using browser's built-in viewer. Use browser controls for navigation.
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default PDFViewer;