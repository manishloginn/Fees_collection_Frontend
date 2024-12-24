Dashboard Component README

Overview

This project contains a Dashboard component designed for an admin panel. The dashboard allows administrators to manage and monitor data records, filter through them, and update statuses dynamically. Additionally, a separate page for students is included where they can log in and proceed with their payments.

**if you run this file in you local host please change the endpoint baseurl**

Flow

Default View: When the website loads, the dashboard is the default page displayed. It provides an overview of various records and allows the admin to change the status of each record.

Admin Functionality: The admin can:

Filter records using various criteria like order ID, date, status, and institute.

Change the status of specific records (e.g., Success, Pending, Decline).

Student Login: After logging in, students are redirected to a dedicated page where they can make payments. This page is separate from the admin dashboard.

Features

Dashboard (Admin)

Filters:

Search by Order ID.

Filter by date, status, and institute name.

Dynamic Status Update:

Admin can change the status of any record by selecting from predefined options (Success, Pending, Decline).

Changes are reflected immediately in the UI and updated in the database.

Pagination:

Supports pagination to manage large datasets efficiently.

Admin can navigate between pages and adjust the number of records displayed per page.

Loading Indicator:

Displays a loading spinner while data is being fetched or updated.

Student Page

Students log in to access a separate page.

The page allows students to make payments securely.

Components

Dashboard

API Integration:

Fetches data from the backend using axios with pagination parameters.

Updates record status via a POST request to the backend.

Filters:

Uses controlled inputs for filtering data dynamically.

UI Elements:

Table for displaying records.

Input fields and dropdowns for filters.

Buttons for status updates.

Pagination component for navigation.

Student Page

Login:

Students log in to access their dedicated payment page.

Payment:

Secure payment processing for students.

How It Works

Dashboard (Admin)

The Dashboard component fetches data from the backend when it loads.

Admin applies filters to refine the displayed data.

Admin updates the status of records, which triggers a POST request to update the database.

Changes are reflected immediately in the UI.

Pagination allows the admin to navigate through the dataset.

Student Page

A student logs in using their credentials.

Upon successful login, the student is redirected to a payment page.

The student can view payment-related details and proceed with the transaction.

Setup Instructions

Clone the repository.

Install dependencies:

npm install

Start the development server:

npm start

Ensure the backend API endpoints are running and accessible.

Navigate to the application in your browser:

Admin Dashboard: Root path of the website.

Student Page: Accessible after login.

API Endpoints

Dashboard Data:

URL: Endpoints.getDashboardData

Method: GET

Parameters: page, pageSize

Description: Fetches paginated data for the dashboard.

Change Status:

URL: Endpoints.changeStatus

Method: POST

Payload: { id: string, status: string }

Description: Updates the status of a specific record.

Dependencies

React

axios

antd

@ant-design/icons

Styles

The dashboard uses a CSS file (dashboard.css) for styling.

The theme context (ThemeContext) applies additional theming based on the selected mode.



credentials for  admin 
{
username : admin;
password : 12345
}


credentials for student  or you can registere also at the time of registratin he need School ID
 so i am sharing you one school id which is in my database 
 **67697984bb5d9dae76a7a977** use this or **676978bc2ec4bf09a53c9c2b** this
{
username : manish@gmail.com;
password : 12345
}

