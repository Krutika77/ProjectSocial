THE FOLLOWING STEPS ARE REQUIRED TO RUN THIS PROJECT

From the root directory (Social), navigate to the backend folder (cd ./backend) and run npm install or simply npm i to install dependencies for server

cd ./frontend to go to the client directory and run npm install or npm i to install all dependencies for client

    Populate the following fields in the .env file in the backend folder as follows:

    PORT - The port on which you want you backend server to run on, e.g.8000

    DATABASE_URL - create a MongoDB database and add URL here to establish a connection

    TOKEN_SECRET - add a random key (used to encode and decode the JSON Web Tokens for verification purposes), e.g. FADB99AD5CD4BCDB8FD385773DBF5

The next step is to set up Google OAuth 2.0 to access Google APIs to send out verification emails.

        •	We go to “https://console.cloud.google.com/” and create a new project.
        •	Go to APIs and Service -> OAuth consent screen and create an application with the same email address we want the user to receive verification links from.
        •	After creating an application, navigate to Credentials-> Create Credentials -> OAuth Client ID, and fill in the required fields with the BASE_URL as the Authorised JavaScript origins and “https://developers.google.com/oauthplayground” for Authorised redirect URIs and click on Create.
        •	This will give us the Client ID and Client Secret
        •	We then go to “https://developers.google.com/oauthplayground”, go to settings and check the “Use your own OAuth credentials” box and fill in the Client ID and Client Secret. We start with Step 1: Select & authorize APIs and add “https://mail.google.com” and click on Authorise APIs
        •	We get the Authorization code and Exchange it for tokens
        •	This gives us a Refresh token and an Access token

    BASE_URL - Client side URL e.g., http://localhost:3000

    EMAIL - email address to send verification links and receive user feedback

    MAILING_ID - Client ID generated

    MAILING_SECRET - Client Secret generated

    MAILING_REFRESH - Refresh Token generated

    MAILING_ACCESS - Access Token generated

We use Cloudinary to store all the media files for our app. So the next step is to create a Cloudinary account and populate the following fields

    CLOUD_NAME - Cloudinary cloud name

    CLOUD_API_KEY - Cloudinary API key

    CLOUD_API_SECRET - Cloudinary API Secret

In the frontend folder, we have another .env file with the backend Url defined as one of its variables.
REACT_APP_BACKEND_URL=#Backend URL, e.g., http://localhost:8000

Lastly we run npm run server from the backend folder and npm start from the frontend to get our app up and running. A browser window will pop open in the local environment with Social up and running.
