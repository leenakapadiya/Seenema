# Seenema
### Project Overview
Seenema is a movie/tv show browsing website that allows users to browse movies, add movies to watchlist, and send movie recommendations to friends. 

### Layout of Repository
In this repository we have a folder for reports which contain all of our weekly status reports. We also have a file that takes care of the CI of our project. All the other files are the code to our project.

### Building and Testing the System
To build and test our system, run the following commands. The CI runs the commands to test our system automatically for push or pull requests
1. npm install --legacy-peer-deps
2. npm run build --if-present
3. npm test

### Running the System
To run the system, run the following commands
1. npm install --legacy-peer-deps
2. npm run build --if-present
3. npm run start

### Beta Release
For the beta release we have implemented the signup/login feature which allows users to sign up for Seenema and verify their email and also allows the user to log in to their profile.
On top of that we have created a homepage that displays the top movies/shows fetched from the TMDB API to the user.

#### Beta Release version id: v1.0.0
