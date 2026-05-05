# Internship Tracker Application
[![Ask DeepWiki](https://devin.ai/assets/askdeepwiki.png)](https://deepwiki.com/DagmTesfu/Internship-Tracker-Application.git)

This is a simple web-based application designed to help users keep track of their internship applications. It provides a clean interface to add and view the status of various applications in one place.

## Features

*   **Add Applications**: A user-friendly form to input details about an internship application.
*   **Track Key Information**: Fields for Company Name, Position, and Application Status.
*   **Status Options**: Pre-defined statuses include "Applied", "Interviewing", "Offered", and "Rejected".
*   **Notes**: A dedicated text area to add any relevant notes for each application.
*   **Application Table**: A structured table to display all the added internship applications.

## Current Functionality

The application currently features a complete front-end structure. The submission form captures the user's input (Company, Position, Status, and Notes) and logs it as an object to the browser's console upon submission. The functionality to dynamically populate the display table with the submitted data is not yet implemented.

## Technologies Used

*   HTML5
*   CSS3
*   JavaScript

## Getting Started

To run this application locally, follow these steps:

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/dagmtesfu/internship-tracker-application.git
    ```

2.  **Navigate to the project directory:**
    ```sh
    cd internship-tracker-application
    ```

3.  **Open the application:**
    Open the `index.html` file in your preferred web browser.

## File Structure

*   `index.html`: The main HTML file that defines the structure of the web page, including the input form and the results table.
*   `style.css`: Contains all the styles for the application, defining the layout, colors, and fonts.
*   `script.js`: The JavaScript file responsible for handling user interactions. It currently listens for form submissions and logs the data to the console.