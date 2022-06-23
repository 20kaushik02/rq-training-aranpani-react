# Aranpani React App

In the project directory, run:

### `npm i` followed by `npm start`

#### For Running Testcases you can run
`npm run test`

#### For dev builds you can run
`npm run build`

#### For staging builds you can run
`npm run build:staging`

#### For production builds you can run
`npm run build:production`

### Project directory structure

#### `src/assets`
Contains images and icons

#### `src/enums/`

Contains all enumerators used in the application

#### `src/interceptor/`

Contains `axiosInterceptor` for API requests and responses.

#### `src/models/`

Contains all the models with the backend alias used in the application.

#### `src/routes/`

Contains all the Application routes and API endpoints.

#### `src/services/`

Contains all the services which in-turn has the corresponding API calls.

#### `src/shared/components/`

Contains Reusable/shared components (Eg: `InputField`, `DropdownField`)

#### `src/shared/utils/`

Contains helper methods like `jsonToFormDataConverter` and `createReducer`

#### `src/styles/`
Contains reusable styles and variables used across the application

#### `src/views/`
Contains presentational components. Each component has its own `.tsx` and `.scss` files
