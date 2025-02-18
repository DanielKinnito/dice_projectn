# Dice Forge - A Customizable 3D Dice Roller

## Overview

Dice Forge is a web application that simulates a 3D dice roll with customizable faces. It's built using React, TypeScript, and Vite for the frontend, and Django for the backend API. The application leverages a cryptographically secure pseudo-random number generator combined with noise from random.org to provide randomness to the rolls.

**Key Features:**

* **Customizable Dice Faces:** Users can define the values displayed on each of the six sides of the dice.
* **Realistic 3D Animation:** The dice roll is visualized with a 3D cube animation, providing a visually engaging experience.
* **Backend API Integration:** The frontend communicates with a Django backend API to generate random dice roll results.
* **Modern Tech Stack:** Built with React, TypeScript, Vite, and Django for a fast and efficient development experience.

## Technologies Used

* **Frontend:**
  * React: A JavaScript library for building user interfaces.
  * TypeScript: A superset of JavaScript that adds static typing.
  * Vite: A fast build tool and development server for modern web projects.
  * CSS Modules: For modular and scoped CSS styling.
* **Backend:**
  * Django: A high-level Python web framework.
  * `django-cors-headers`: For handling Cross-Origin Resource Sharing (CORS).
  * `python-dotenv`: For managing environment variables.

## Setup Instructions

1. **Clone the repository:**

    ```bash
    git clone <repository_url>
    cd <project_directory>
    ```

2. **Backend Setup (Django):**

    * Navigate to the [dice](http://_vscodecontentref_/1) directory.
    * Create a virtual environment:

        ```bash
        python -m venv venv
        source venv/bin/activate  # On Linux/macOS
        venv\Scripts\activate  # On Windows
        ```

    * Install dependencies:

        ```bash
        pip install -r requirements.txt
        ```

    * Set up environment variables:

        * Create a [.env](http://_vscodecontentref_/2) file in the [dice](http://_vscodecontentref_/3) directory.
        * Add the following variables:

            ```bash
            D6_API_KEY=<your_random.org_api_key>
            ```

    * Run migrations:

        ```bash
        python manage.py migrate
        ```

    * Start the Django development server:

        ```bash
        python manage.py runserver
        ```

3. **Frontend Setup (React):**

    * Navigate to the [frontend](http://_vscodecontentref_/4) directory.
    * Install dependencies:

        ```bash
        npm install
        ```

    * Set up environment variables:

        * Create a [.env](http://_vscodecontentref_/5) file in the [frontend](http://_vscodecontentref_/6) directory.
        * Add the following variables:

            ```bash
            VITE_REACT_APP_API_CALL=http://localhost:8000  # Or your deployed backend URL
            ```

    * Start the Vite development server:

        ```bash
        npm run dev
        ```

4.**Access the application:**

    * Open your browser and navigate to `http://localhost:5173` (or the port where your Vite development server is running).

## Configuration

* **Backend:**
  * [D6_API_KEY](http://_vscodecontentref_/7): Your API key from random.org. This is used to add entropy to the random number generation.
* **Frontend:**
  * [VITE_REACT_APP_API_CALL](http://_vscodecontentref_/8): The URL of your Django backend API.

## Deployment

* **Backend (Django):**
  * Deploy to a platform like Render, Heroku, or PythonAnywhere.
  * Configure environment variables in your deployment environment.
* **Frontend (React):**
  * Build the React app: `npm run build`
  * Deploy the contents of the `dist/` directory to a static hosting service like Netlify, Vercel, or GitHub Pages.

## Contributing

Contributions are welcome! Please follow these steps:

1.Fork the repository.
2.Create a new branch for your feature or bug fix.
3.Make your changes and commit them with clear, concise messages.
4.Submit a pull request.

## License

This project is licensed under the MIT License.

## Disclaimer

This application is intended for recreational purposes only and is not intended for gambling or any other activity with financial risk. See DISCLAIMER.md for more information.
