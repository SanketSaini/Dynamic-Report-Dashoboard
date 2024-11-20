import React, { useState } from 'react';
import CSVUpload from './CSVUpload'; // Component to upload CSV file
import ReportTable from './ReportTable'; // Component to render the CSV data in a table
import { Tabs, Tab } from 'react-bootstrap';

const Dashboard = () => {
  const [csvData, setCsvData] = useState(null); // Store parsed CSV data
  const [activeTab, setActiveTab] = useState('upload'); // Track which tab is active

  // Function to handle CSV data received from CSVUpload
  const handleCsvData = (data) => {
    console.log('Received CSV Data in Dashboard:', data); // Log received data for debugging
    setCsvData(data);
  };

  return (
    <div>
      <Tabs activeKey={activeTab} onSelect={setActiveTab}>
        <Tab eventKey="upload" title="Upload CSV">
          {/* Pass handleCsvData to CSVUpload to receive CSV data */}
          <CSVUpload onDataParsed={handleCsvData} />
        </Tab>
        <Tab eventKey="report" title="Reports">
          {/* Pass the CSV data to ReportTable for rendering */}
          {csvData ? <ReportTable data={csvData} /> : <p>No data available. Please upload a CSV file.</p>}
        </Tab>
      </Tabs>
    </div>
  );
};

export default Dashboard;
