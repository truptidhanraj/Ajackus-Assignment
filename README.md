AJACKUS Assignment

* Project Overview
This project is a user list application that displays a list of users, allows new users to be added, and existing users to be edited and deleted.

* Project Structure 

public: Public folder containing static files.

src: Source folder containing project code.

components: Components folder containing React components.

App.js: Main application component.

index.js: Project entry point.

* Data Fetching 

We used the JSONPlaceholder API to fetch data for this assignment. 

* React Hooks 

We utilized the following React Hooks in this project:

1.useState: To manage state in functional components.

2.useEffect: To handle side effects, such as fetching data from API.

* Project Setup
1. Create a new React project using `create-react-app`.
2. Install necessary packages, used `fetch` (for API calls) and `react-router-dom` (for navigation).
3. Run the project using `npm start`.

* Component Structure
- _App Component_: The main wrapper that holds all child components.
- _UserList Component_: Displays the list of users.
- _UserForm Component_: Handles adding and editing user details.
  
* Usage 
1. View the user list by navigating to the home page.
2. Add a new user by clicking the "Add user" button.
3. Edit an existing user by clicking the "Edit" button.
4. Delete a user by clicking the "Delete" button.

* State Management
- User Data: Stores the list of users fetched from the API.
- Form State: Stores the current user data for add/edit functionality.
- Error State: Stores any error messages to display when API requests fail.

* Challenges and Potential Improvements
- Implement pagination or infinite scrolling.
- Implement client-side validation.
- Implement a responsive UI.
