**The developer guidelines are focused solely on people who want to contribute to your project.**

# How to obtain the source code
* To obtain the source code for the project clone the repository from the main branch using following command in your command line interface(CLI):
* git clone [https://github.com/leenapagdar/Seenema.git](https://github.com/leenapagdar/Seenema.git)


## The layout of your directory structure
1. **./.github/workflows:** GitHub Actions workflows for continuous integration and automation tasks.
1. **./reports:** Weekly team meeting reports.
1. **./seenema-backend/src/main:** contains source code for the backend of the project.
1. **./seenema-backend/src/tests:** contains tests for the backend.
1. **./seenema-frontend/src/:** contains source code for the frontend of the project.
1. **./seenema-frontend/src/tests:** contains tests for the frontend.
1. **./seenema-frontend/public/:** contains the browser tab icons for the header and main HTML file for the frontend application.
1. **./.gitignore:** declares untracked files for Git to ignore.
1. **README.md:** The main documentation file providing an overview of the project.

# How to build the software
* A .env.local file would be necessary:
  * Create a file “.env.local” and place all the tokens and keys inside that file.
  * Ask your colleague to share API keys and authentication tokens needed for the application to start
* To build the software
  * Navigate to the project root directory
  * Navigate to the seenema-frontend directory by running the following command:
    * `cd seenema-frontend`
  * Run the following command in your CLI
   ```bash
   npm install --legacy-peer-deps
   # To install the project dependencies
   npm run build --if-present
   # Start building script in package.json
   npm run start
   #  Starts the application in the browser of your choice
   ```

# How to test the software
* To build and test our system, run the following commands.
  * Navigate to the project root directory
  * Navigate to the seenema-frontend directory by running the following command:
    * `cd seenema-frontend`
* Run the following command in your CLI
   ```bash
  npm install --legacy-peer-deps
  # To install the project dependencies
  npm run build --if-present
  # Start building script in package.json
  npm test
  # Starts test for the application frontend
  ```

# How to add new tests
* When adding new tests to the frontend, follow these steps:
  * Place test files in the `seenema-frontend/tests` directory.
  * Follow a consistent naming convention for test files. For example:
    * Source file: `MyClass.js`
    * Test file: `TestMyClass.js`
* When adding new tests to the backend, follow these steps:
  * Place test files in the `seenema-backend/src/tests` directory.
  * Follow a consistent naming convention for test files. For example:
    * Source file: `MyClass.java`
    * Test file: `TestMyClass.java`

# How to build a release of the software
* In the github navigate to the repository and ‘releases’ page, you can find initial releases tags there.
* e.g. for the initial beta release(`v1.0.0` tag), follow the steps below:
  * In your CLI, enter the command `git checkout v1.0.0`
  *  Follow the [**How to build the software**](#how-to-build-the-software) documentation in this file.
