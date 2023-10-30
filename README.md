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
2. Navigate to the project directory: `cd cm-history-be` and `cd cm-history-fe` for the backend and frontend
   respectively.
3. Install the dependencies: run `npm install` in both directories.

## Running the application

1. Create a .env file at the root level of the backend directory and add the following environment variables:
    - `GITHUB_API_URL=https://api.github.com`
    - `GITHUB_API_TOKEN=<your-github-api-token>`: This is a Personal Access Token with the repo scope. This is needed
      because the GitHub API has a rate limit of 60 requests per hour for unauthenticated requests. I provided one for
      you in the email.
    - `PORT=<port-number>`: This is the port where the backend will run. The default is 3001.

2. In the backend directory, run the backend by executing the following command: **npm run** `start:dev`
3. In the frontend directory, run the frontend by executing the following command: **npm run** `start`

Please replace **<your-github-api-token>** and **<port-number>** with your actual GitHub API token and desired port
number.
Remember to keep your GitHub API token secret to prevent unauthorized access to your GitHub account. If you don’t have a
GitHub API token, you can create one in your GitHub account settings.

## Usage

This is a relatively simple application, so just open your browser and navigate to `http://localhost:4200/`.

That’s it! You should now be able to see the commit history of this repository.