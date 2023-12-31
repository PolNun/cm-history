# Git Commit History Viewer

This application shows the git commit history of a public repository on GitHub. It is built with Angular for the
frontend and NestJS for the backend.

## Objective

The goal of this project is to create an application that fetches and displays git commit history from this repository.
This project uses the GitHub API to fetch the commit history.

## Requirements

1. The GitHub API is used to fetch the commit history.
2. The GitHub repository is public.
3. The backend is built with NestJS.
4. The frontend is built with Angular.
5. Instructions on how to install and run the project are provided.

## Installation

Follow these steps to install and run the project:

1. Clone the repository: `git clone https://github.com/PolNun/cm-history.git`
2. Navigate to the project directory: `cd cm-history`
3. Navigate to the project directory: `cd cm-history-be` and `cd cm-history-fe` for the backend and frontend
   respectively.
4. Install the dependencies: run `npm install` in both directories.

## Running the application

1. Create a .env file at the root level of the backend directory and add the following environment variables:
    - `GITHUB_API_URL=https://api.github.com`
    - `GITHUB_TOKEN=<github token>`: This is a Personal Access Token with the repo scope.
    - `PORT=<port-number>`: This is the port where the backend will run. The default is 3001.

2. In the backend directory, run the backend by executing the following command: **npm run** `start:dev`
3. In the frontend directory, run the frontend by executing the following command: **npm run** `start`

Please replace _your-github-api-token_ and _port-number_ with your actual GitHub API token and desired port
number.

## Usage

This is a relatively simple application, that’s why I didn’t deploy it to a server. You can access the application by
going to http://localhost:4200/ in your browser.

That’s it! You should now be able to see the commit history of this repository.
