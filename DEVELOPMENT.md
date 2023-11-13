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
* `.env.local` file would be necessary:
  * Create a file `.env.local` and place all the tokens and keys inside that file.
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
        #  Starts the application in the browser of your choice```

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
Here are the combined steps to build a release:

#### Automated steps

1. In the code and documentation, update the existing version number with the new release version number.
1. Execute the entire test suite and linter tests to check the functionality and quality of the code.
1. Create or update the documentation to ensure the inclusion of the changes in the new release.
1. Build the script file to compile the binary files reflecting preparation of the release artifacts.

#### Manual steps

1. Go to the [GitHub.com](https://github.com/).
1. Navigate to the main page of your repository. 
1. To the right side of the list of files, Click on the **Releases** tab.
1. Click on **Draft a new Release** button, on the top of the page.
1. Click on **Choose a tag** drop down menu. 
   * Choose a tag version if you already created one from the dropdown choices
   * To create a new tag, enter a tag version by clicking on the input field **Find or create a new tag**. 
1. Enter description for your release under **Describe the release** input field.
For example, detailed information about new features, bug fixes or nay other relevant changes.
1. Attach Binary files by dragging & dropping or manually selecting them to upload under a section 
**Attach binaries by dropdown them here or selecting them**. 
1. If you want to label the release as non-production ready, then click on a checkbox **Set as pre-release**. 
1. If you want to label the release as non-production ready as the latest, then click on a checkbox 
**Set as the latest release**. 
1. Click on **Publish release** button.