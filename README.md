## Pitang Trainee Program

Pitang's final project that aims to create a React and Node.js application to schedule vaccine appointments (Covid-19) and to visualize all of the already scheduled appointments grouped by date and time.

### How to run this project:
- Download the files
- Run **yarn** in the terminal to install all dependencies listed within **package.json**
- Create a **.env** file in the project's root directory and insert the following configurations:

  - **REACT_APP_BASE_URL** = http://localhost:4000/api
  - **REACT_APP_LOCALSTORAGE_KEY** = schedules
  
- Execute the <a href="https://github.com/AnneLivia/PitangBackend">Backend</a>
- Run **yarn start** to execute the React App (The application runs on http://localhost:3000)

### Some Dependencies (Frontend)

- axios: 0.26.1
- bootstrap: 5.1.3
- date-fns: 2.28.0
- formik: 2.2.9
- react-bootstrap: 2.2.3
- react-datepicker: 4.7.0
- react-icons: 4.3.1
- react-router-dom: 6.3.0
- react-toastify: 8.2.0
- yup: 0.32.11

## Challenge Description

### Rules of use:

- Scheduling must be done on one page using a form.
- Maximum of 20 appointments per day.
- Maximum of 2 appointments for the same hour.
- A page must be created to consult the appointments.
- The result of the appointments must be grouped by day and time.
- The time interval between one appointment and another is 1 hour.

### Business rules:

- The patient must inform his name, date of birth and day and time of the
appointment.
- It must be checked if the form has been filled out.
- Patient data/schedules must be stored in memory.
- Within the page to consult the schedules, it must be possible to view the list of appointments and inform if the patient was seen or not,
and what was the conclusion of the appointment.
- When user press F5 or reload the page the data cannot be lost.

### Execution Rules:
1. Portal written in React (use react-datepicker to manage dates).
2. Build a Node API to receive data from the portal.
3. Axios as http client.
4. Use Formik to validate the data in the view.
5. IDE is your choice.

## Aditional information:
- This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
- <h3>Icons and images: </h3>

  - **Navbar icon**: downloaded from Flaticon <a href="https://www.flaticon.com/premium-icon/schedule_6064388">icon created by toempong</a>
  - **Home Page icon**: downloaded from Flaticon <a href="https://www.flaticon.com/premium-icon/vaccine_4190876">icon created by itim2101</a>
  - **Cancelation of appointment**: downloaded from <a href="https://www.svgrepo.com/svg/286825/cancel">Free SVG</a>
  - **Conclusion Text**: downloaded from <a href="https://www.svgrepo.com/svg/33550/report">Free SVG</a>
