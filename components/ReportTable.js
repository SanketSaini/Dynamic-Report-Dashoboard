import React, { useState } from 'react';

const ReportTable = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1); // Current page for the grouped dataset or entire data
  const [rowsPerPage, setRowsPerPage] = useState(5); // Rows per page or groups per page
  const [groupBy, setGroupBy] = useState("None"); // Grouping option (None, Date, Tag, etc.)
  const [expandedGroups, setExpandedGroups] = useState(new Set()); // Track expanded groups

  // If no data, display a message
  if (!data || data.length === 0) {
    return <p>No data available to display.</p>;
  }

  // Get headers (keys) for dynamic grouping
  const headers = Object.keys(data[0]);

  // Group data by the selected key
  const groupData = (data, groupBy) => {
    if (groupBy === "None") {
      return [{ key: "All Data", items: data }];
    }

    return Object.entries(
      data.reduce((groups, item) => {
        const key = item[groupBy] || "No Value"; // Use the groupBy field as the key
        if (!groups[key]) {
          groups[key] = [];
        }
        groups[key].push(item);
        return groups;
      }, {})
    ).map(([key, items]) => ({
      key,
      items
    }));
  };

  // Group data based on the groupBy value
  const groupedData = groupData(data, groupBy);

  // Pagination logic for entire dataset (if no grouping) or grouped data
  const totalPages = groupBy === "None" 
    ? Math.ceil(data.length / rowsPerPage)  // Total pages when no grouping
    : Math.ceil(groupedData.length / rowsPerPage); // Total pages when grouped

  // Handle page navigation
  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handlePageChange = (e) => {
    setCurrentPage(Number(e.target.value));
  };

  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to first page when changing rows per page
  };

  // Paginate data based on group or rows (flat data or groups)
  const paginatedData = groupBy === "None"
    ? data.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage) // Paginate rows directly if no grouping
    : groupedData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage); // Paginate groups if grouped

  // Toggle group expansion
  const toggleGroup = (groupKey) => {
    setExpandedGroups((prev) => {
      const newExpandedGroups = new Set(prev);
      if (newExpandedGroups.has(groupKey)) {
        newExpandedGroups.delete(groupKey); // Collapse group
      } else {
        newExpandedGroups.add(groupKey); // Expand group
      }
      return newExpandedGroups;
    });
  };

  return (
    <div>
      {/* Grouping Dropdown */}
      <select value={groupBy} onChange={(e) => setGroupBy(e.target.value)}>
        <option value="None">Group by None (Show All)</option>
        {headers.map((header) => (
          <option key={header} value={header}>
            Group by {header}
          </option>
        ))}
      </select>

      {/* Table displaying grouped data or flat data */}
      <table>
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* Render the rows for paginated data */}
          {paginatedData.map((group, groupIndex) => (
            <React.Fragment key={groupIndex}>
              {/* Render group header with expand/collapse toggle */}
              {group.items ? (
                <tr onClick={() => toggleGroup(group.key)} style={{ cursor: 'pointer' }}>
                  <td colSpan={headers.length}>
                    {group.key} {expandedGroups.has(group.key) ? '-' : '+'}
                  </td>
                </tr>
              ) : (
                <tr>
                  {headers.map((header, colIndex) => (
                    <td key={colIndex}>{group[header]}</td>
                  ))}
                </tr>
              )}

              {/* Render the group rows if expanded */}
              {group.items && expandedGroups.has(group.key) &&
                group.items.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {headers.map((header, colIndex) => (
                      <td key={colIndex}>{row[header]}</td>
                    ))}
                  </tr>
                ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div>
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>

        {/* Dropdown to select page */}
        <select value={currentPage} onChange={handlePageChange}>
          {[...Array(totalPages).keys()].map((page) => (
            <option key={page} value={page + 1}>
              Page {page + 1}
            </option>
          ))}
        </select>

        {/* Rows per page dropdown */}
        <select value={rowsPerPage} onChange={handleRowsPerPageChange}>
          <option value={5}>5 rows per page</option>
          <option value={10}>10 rows per page</option>
          <option value={20}>20 rows per page</option>
        </select>
      </div>
    </div>
  );
};

export default ReportTable;
