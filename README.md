**Dynamic Report Dashboard(Day 1)**

This project is a comprehensive dashboard built with React that allows users to upload, view, group, and manage CSV reports efficiently. It provides features such as file uploads, dynamic data parsing, pagination, grouping by columns, and expand/collapse functionality for better data organization and presentation.

**Features to Implement in This Project**
**1. CSV File Upload and Parsing**
Upload CSV Files: Users can upload CSV files, which are parsed using the PapaParse library.
Dynamic Parsing: The uploaded CSV file is parsed and passed to the dashboard component for rendering.

**2. Report Table**
Pagination: Data is displayed in a table format with pagination. Users can choose the number of rows per page (5, 10, 20, etc.).
Grouping: Data can be grouped by any column (e.g., Date, Tag, etc.). The user can select a column to group the data dynamically.
Expand/Collapse Groups: Once data is grouped, each group can be expanded or collapsed for better data navigation and visibility.

**3. Dashboard Interface**
Tabs for Folder Navigation: The interface uses tabs to switch between different reports and displays them accordingly.
Centralized Management: The dashboard serves as a centralized location for managing multiple CSV files and displaying them in an organized manner.

**Current Components of this Project**
**1. CSVUpload.js**
This component handles the upload of CSV files:

It allows users to select a CSV file.
Upon file selection, it validates the file type (.csv) and then uses PapaParse to parse the CSV file.
The parsed data is sent to the parent component (Dashboard) for rendering.

**2. ReportTable.js**
This component displays the CSV data in a table:

Grouping: Allows the user to group data by any column (e.g., Date, Tag).
Pagination: Supports pagination, showing a set number of rows per page.
Expand/Collapse: Groups can be expanded or collapsed to show or hide the grouped rows.

**3. Dashboard.js**
This is the main container for the application:

It contains tabs for managing multiple CSV files.
Each tab displays a CSV file's data using the ReportTable component.
Users can upload new CSV files, and the data will be displayed under the "Reports" tab.
Functionalities Implemented vs Pending


**Implemented Functionalities Today**
**1. CSV File Integration:**

1.1. CSV Upload: Users can upload CSV files, which are parsed and displayed in the report table.
1.2. Pagination: Pagination works both for non-grouped and grouped data (e.g., showing a set number of rows per page).
1.3. Grouping: The data can be dynamically grouped by any column (e.g., Date, Tag).
1.4. Expand/Collapse: Once the data is grouped, users can expand or collapse individual groups to show or hide the rows within each group.
1.5. Tabs for Reports: The dashboard allows for the management of multiple reports using tabs. Each report corresponds to a CSV file.

**2. UI Elements:**

2.1. Tabs: The dashboard uses tabs to represent different sections of the report (e.g., "Upload CSV" and "Reports").
2.2. Report Table (Grid): The CSV data is displayed in a neat, organized table, which supports pagination and grouping.
2.3. Dropdowns: Includes options to change the number of rows per page and select which column to group the data by.


**Functionalities to be implemented tomorrow**
**1. Folder and File Handling:**
Folder-Based Tabs: Currently, there is no folder-based tab navigation. All reports are displayed as tabs, but grouping by folders (subfolders in the file structure) is not yet implemented.

**2. Sorting and Filtering:**
The ability to sort columns (e.g., ascending/descending order) and filter data (e.g., by specific column values) has not been added.

**3. Report Activation:**
There is no option yet to flag reports as active or inactive for controlling visibility.

**4. Customizing Tabs and Tags:**
The feature to customize the color of tabs or user-created tags is not implemented.

**5. Testing and Optimization:**
There are no end-to-end tests implemented yet for verifying the functionality and performance of the application.

**6. Export Functionality:**
Exporting data (e.g., to CSV or Excel format) is not currently supported.


