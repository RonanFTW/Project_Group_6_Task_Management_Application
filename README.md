# Projecy_Group_6_Task_Management_Application

This is a project by Dylan Griffith, Naima Ontiveros, and Ronan Kent made strictly for educational purposes in CS312, SEC001, Fall Semester 2024, Northern Arizona University.

Update: 11/30/24 - The following changes were made:

    Database Setup:
        Resolved database schema issues.
        Verified the tasks table schema, including adding the due_date column.

    CRUD Routes:
        Fixed the POST route for task creation in tasks.js.
        Ensured proper INSERT queries for handling the due_date and other task properties.

    Debugging Database Issues:
        Addressed errors like "column does not exist" by aligning the database schema and SQL queries.
        Corrected type mismatches (e.g., priority being a string instead of an integer).

Frontend Development

    Component Setup:
        Worked on TaskCreation.js to implement a form for creating tasks.
        Ensured the form captures all task details (title, description, status, priority, due_date).

    API Integration:
        Integrated Axios (ApiConnection) for API calls to the backend.
        Implemented the handleSubmit function to send data from the form to the backend.

    Page Structure:
        Added Header and Footer components to TaskCreation.js.
        Verified proper layout and styling with className="content" and className="main".

    Debugging Frontend Issues:
        Resolved errors related to due_date not being defined.
        Corrected routing issues (e.g., ensuring the form renders at /tasks/new).

Resolved Issues

    Routing:
        Corrected incorrect links in the Header that caused routing problems.

    Backend-Frontend Sync:
        Ensured consistent naming for properties like due_date in both the backend and frontend.
        Addressed mismatched column counts in SQL INSERT statements.

Backend Development: 12/2/2024
        Added hashing to user sign up and sign in process in order make sure passwords are encrypted and secure.
    
