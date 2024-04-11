# Joven Health Analytics

## Running the Project

Install dependencies:

```
npm install
```

Run the project in development mode:

```
npm run dev
```

Run the project in production mode:

```
npm run prod
```

## Input CSV File Format

The input CSV file should contain the following headers:

```
"Provider Name"	"District Name"	"Direct/InDirect"	"Service Name"	"Session Students"	"School"	"Notes"	"Present/Absent"	"Date"	"Time From"	"Time To"	"Plan/Doc Time"	"Session Time"	"Total Time"
```

[Here](https://drive.google.com/file/d/12003s_EOJO_4SX2A9VnF7zOACJSbOL57/view?usp=sharing) is a file that you can use for testing.

## Project Source File Structure

- `assets`: Image files and other asset files
- `components`: React components
  - `charts`: Custom chart components
  - `hooks`: Custom React hooks
  - `icons`: Custom React icons
  - `navbar`: Nav bar components
  - `pages`: All available pages of the site
  - `prototypes`: Files that can be copied when creating new components
  - `reports`: Components representing reports used on different pages
  - `widgets`: Custom I/O widgets
- `data`: Data models and associated data classes
  - `models`: Data models and structures
  - `processors`: Classes that manipulate and process the data models
  - `providers`: Classes that expose the data models via React Context
- `routes`: Information about routing of the site
- `utils`: Utility functions

### How it works

Every page on the site is defined in `AvailableRoutes.tsx` and has an associated component in the `components/pages` section. Each page defines its own components, which will consist of one or more component in the `components` section.

Once an input file has been selected, new pages of the site will be dynamically updated according to the data in the file.
