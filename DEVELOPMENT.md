# How to obtain the source code
* To obtain the source code for the project clone the repository from the main branch using following command in your command line interface(CLI):
  * `git clone https://github.com/leenapagdar/Seenema.git`


# The layout of the directory structure
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

## To build the application frontend
* `.env.local` file would be necessary:
  * Ask your colleague to share API keys and authentication tokens needed to initiate the application frontend
  * Create a file `.env.local` and place all the tokens and keys inside that file.
  * Place that file under **./seenema-frontend** folder.
    * To build the frontend software
      * Navigate to the project root directory
      * Navigate to the seenema-frontend directory by running the following command:
        * `cd seenema-frontend`
      * Run the following command in your CLI
        ```bash
        # To install the project dependencies
        npm install --legacy-peer-deps
        # Start building script in package.json
        npm run build --if-present
        #  Starts the application in the browser of your choice
        npm run start
        ```

## To build the application backend
* To build the backend software
  * Navigate to the project root directory
  * Navigate to the seenema-backend directory by running the following command:
    * `cd seenema-backend`
  * Run the following command in your CLI
    ```bash
    # To build the application backend
    gradle build
    ```
        
# How to test the software
## To test the application frontend
* To build and test our frontend system, run the following commands.
  * Navigate to the project root directory
  * Navigate to the seenema-frontend directory by running the following command:
    * `cd seenema-frontend`
  * Run the following command in your CLI
     ```bash
    # To install the project dependencies
    npm install --legacy-peer-deps
    # Start building script in package.json
    npm run build --if-present
    # Starts test for the application frontend
    npm test
    ```
    
    
## To test the application backend
* To build and test our backend system, run the following commands.
  * Navigate to the project root directory
  * Navigate to the seenema-backend directory by running the following command:
    * `cd seenema-backend`
  * Run the following command in your CLI
     ```bash
    # To test the application backend
    gradle test
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

The release process is automated via Github Actions and Vercel. On merge to master branch, vercel will pull the latest 
code and update the website. To view the latest released website open [this link](https://seenema-one.vercel.app/).

[OPTIONAL]: You can also tag releases using [Git tags](https://git-scm.com/book/en/v2/Git-Basics-Tagging).
Follow [SemVer](https://semver.org/) versioning for the Git tags.
