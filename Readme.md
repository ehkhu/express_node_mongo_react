# Project Documentation

Project Structure
The project consists of two main components:
**Backend**: Located in the exserver directory, it is written using Node.js, Express, and Mongoose.
**Frontend**: The frontend is developed with React using Vite and TypeScript. It is contained within the simple-ticket directory.

# Backend Setup

Navigate to the backend directory:
cd express

Install dependencies:

npm install

Import development data:
Start the server in development mode:

    npm run start

For production mode:

    npm run start:prod

**Backend Configuration:**
Customize the configuration in the **config.env** file.

**Logs**
logs are record in combine.log

## Frontend Setup
Navigate to the frontend directory:
cd simple-ticket
Install dependencies:

    npm install

To run the application in development mode:

    npm run dev

To build the application:

    npm run build

**Backend Connection Configuration:**
Update the proxy field in package.json to match the backend server URL:
"proxy": "http://localhost:8000",

or if you don't need proxy
Backend Connection Configuration:
Update the proxy field in src/lib/axios.ts to match the backend server URL:

    const baseURL = 'http://localhost:8000';
    const axios = Axios.create({
        baseURL: baseURL,
        ....
    })

**Pre define Users**
| Name       | Email                | Role        | Password |
|------------|----------------------|-------------|----------|
| jhon       | jhon@tick.com        | staff       | password |
| wick       | wick@tick.com        | staff       | password |
| supervisor | supervisor@tick.com  | supervisor | password |
| leader     | leader@tick.com      | leader      | password |


# For Docker
change to project dir

    docker-compose up
