# BEng Thesis – Calendar Web Application

This project is part of my BEng (Bachelor of Engineering) thesis. It is a custom calendar web application built using vanilla JavaScript, HTML, and CSS. The app allows users to browse months, view week numbers, check public holidays, and write short personal notes for each day.

This branch is a work in progress and will continue to evolve over time as I develop additional features.

---

## Features

- Dynamic, responsive calendar view  
- Public holiday data for Poland via Calendarific API  
- Day-specific notes saved locally (in `localStorage`)  
- Light/dark theme toggle  
- Week number display  
- Modal-based note editor with delete functionality  
- Notes are persisted between sessions  

---

## Planned Features

This project is actively under development. Upcoming planned features include:

- User authentication using PHP sessions  
- Server-side note storage  
- Weather forecast via third-party weather API  
- Forecast integration into calendar days (next 7 days)  
- Localization and multilingual support (currently only Polish)  

---

## Technologies Used

- HTML5 – Structure and layout  
- CSS3 – Styling and responsive design  
- Vanilla JavaScript – Calendar logic, modals, API requests  
- Calendarific API – For holiday data  
- localStorage – Temporary note persistence  
- (Future: PHP, SQL, Weather API)  

---


---

## How to Run

1. Clone the repository and switch to the `calendar` branch.  
2. Open `index.html` in a browser.  
3. Click through the calendar, write notes, and test the theme toggle.  
4. Make sure to provide your own https://calendarific.com/ `API_KEY` for the holidays API.

Note: Internet connection is required for public holiday API to work.

---

## Notes

- This project is part of a thesis and is subject to ongoing refactoring and updates.  
- Current version uses `localStorage`; it is not multi-user.   

---

## License

This project is part of academic work and is released for educational purposes.


