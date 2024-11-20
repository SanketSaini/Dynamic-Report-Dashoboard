import React, { useState } from 'react';
import Papa from 'papaparse';

const CSVUpload = ({ onDataParsed }) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);

  // Handle file selection
  const handleFileChange = (e) => {
    setError(null);
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === 'text/csv') {
      setFile(selectedFile);
    } else {
      setError('Please upload a valid CSV file.');
    }
  };

  // Parse CSV data and pass it to parent component
  const handleUpload = () => {
    if (file) {
      Papa.parse(file, {
        complete: (result) => {
          console.log('Parsed CSV Data:', result.data);  // Log parsed data here for verification
          onDataParsed(result.data);  // Send parsed data to parent component
        },
        header: true, // Assumes first row contains column headers
        skipEmptyLines: true, // Skips empty lines
      });
    }
  };

  return (
    <div>
      <input type="file" accept=".csv" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default CSVUpload;
