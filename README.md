
# News App

This project is a full-stack news application that allows users to fetch news articles from an external API, view them, and save their favorite articles for later access. The app is built using React for the frontend and Node.js with Express for the backend.

## Features

- Search for news articles by keyword, category, or source.
- View article details, including full content, images, and links to the original source.
- Save articles to a favorites list for quick access.
- View search history for logged-in users.
- Authentication system with user login and registration.

## Project Structure

```
<lastname>_<firstname>_NewsApp/
├── news-app-backend/              # Backend code (Node.js + Express)
├── news-app-frontend/             # Frontend code (React)
└── README.md                      # Project documentation
```

---

## Backend Setup

The backend is built using Node.js, Express, and MongoDB. It provides RESTful API endpoints to manage news articles, user authentication, favorites, and search history.

### Prerequisites

- Node.js (v14.x or later)
- npm (Node Package Manager)

### Installation

1. **Unzip the folder:**

   ```bash
   unzip <lastname>_<firstname>_NewsApp.zip
   cd news-app-backend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Edit a `.env` file (optional):**

   The `.env` file is already included with default credentials. You can optionally edit this file to replace it with your credentials.

   ```env
   PORT=5000
   MONGODB_URI=<your-mongodb-connection-string>
   JWT_SECRET=<your-jwt-secret>
   NEWS_API_KEY=<your-news-api-key>
   ```

4. **Run the server:**

   ```bash
   npm start
   ```

   The backend server should now be running on `http://localhost:5000`.
---
## MongoDB Database Information

- The application is connected to a MongoDB database hosted at `mongodb+srv://mad:OfhcZQjY9C2mV2vL@newsdb.586se.mongodb.net/?retryWrites=true&w=majority&appName=NewsDB`.

- **Default User**: There is a default user created in the database which you can use to test the application:
   * Username: testuser
   * Email: testuser@example.com
   * Password: testpassword

- You can also create your own user by using the registration feature within the application.

- If required I can also send access invite to the MongoDB project hosting this cluster.
---
## API Endpoints

- **POST** `/register`: Register a new user.
- **POST** `/login`: Login a user and get a JWT token.
- **GET** `/news/search`: Fetch news articles based on a keyword or source.
- **GET** `/news/top-headlines`: Fetch top headlines based on category.
- **POST** `/favorites`: Add an article to the user's favorites.
- **GET** `/favorites`: Get the user's favorite articles.
- **DELETE** `/favorites/:articleId`: Remove an article from the user's favorites.
- **POST** `/users/search-history`: Log a user's search query.
- **GET** `/users/search-history`: Get a user's search history.

### **You can find detailed API Endpoints in [Swagger API Docs](http://localhost:5000/api-docs/) after running the backend server.**

---

## Frontend Setup

The frontend is built using React. It provides a user interface to interact with the backend API.

### Prerequisites

- Node.js (v14.x or later)
- npm (Node Package Manager)

### Installation

1. **Navigate to the frontend directory:**

   ```bash
   cd ../news-app-frontend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Run the development server:**

   ```bash
   npm run dev
   ```

   The frontend development server should now be running on `http://localhost:3001`.

### Usage

- **Homepage:** View the latest news articles.
- **Search:** Search for articles by keyword, category, or source.
- **Favorites:** View and manage your favorite articles (available after login).
- **Login/Register:** Authenticate to save favorites and view search history.

---

## Known Issues
- **Category Search Limitation:**
   * When `searching by category`, there is an issue with the [NewsAPI](https://newsapi.org) endpoint where it returns `null` for the description, image URL and content.
   * Due to this limitation, when you click on an article after searching by category, it will directly open the original article URL instead of the article page.
   * For other types of searches `(such as by keyword or sources)`, this issue does not occur, and the NewsAPI returns the description, image URL and content correctly, allowing the article page to display as expected.
   ![News API Endpoint showing null](.\news-app-frontend\src\assets\image.png)

- **Partial Content from News API:**
   - The `content` field returned by the News API does not always provide the full content of the article. According to the [News API documentation](https://newsapi.org/docs/guides/how-to-get-the-full-content-for-a-news-article), this field often includes only a truncated version of the content. To fetch the entire content, as suggested by News API, the backend uses `jsdom` to fetch and parse the full content directly from the article's URL. This ensures that users receive the complete text of the articles when viewing them within the application.

- **API Request Limits:**
   - The News API used in this application has a free tier limit of 100 requests over a 24-hour period. If you encounter issues with news articles not loading, it is likely that the request limit has been reached.
   - Workaround:
      - **Use an Alternative API Key**: You can try using the following API key as a temporary alternative: `2cdf166cfef24dfcb2e6cdd6adfb3c0a`
      - **Create Your Own API Key**: You can create your own News API account and generate an API key. Update the `.env` file with your new API key.

---

## Important Notes

- Ensure that the backend is running before you start the frontend, as the frontend interacts with the backend API.
- You can use the `.env` file to configure environment-specific variables for backend.

---

## Application Architecture

The "News App" backend is built using the following architecture and components:

### 1. **Server Framework: Express.js**
   - The application is powered by Express.js, a lightweight and flexible Node.js web application framework. It handles HTTP requests, routing, middleware, and serves as the foundation for the API.

### 2. **Database: MongoDB with Mongoose**
   - MongoDB is used as the database for storing user data, news articles, search history, and user preferences like favorite articles. Mongoose, an Object Data Modeling (ODM) library, is used to define schemas, interact with MongoDB, and enforce data structure rules.

### 3. **Authentication: JSON Web Tokens (JWT)**
   - User authentication is managed through JSON Web Tokens (JWT). When a user logs in, they receive a JWT, which must be included in subsequent API requests to access protected routes. This ensures secure, stateless authentication.

### 4. **Security: bcrypt.js**
   - Passwords are hashed using bcrypt.js before being stored in the database, adding a layer of security by ensuring that sensitive information is never stored in plain text.

### 5. **API Integration: Axios**
   - Axios, a promise-based HTTP client, is used to interact with external news APIs (like NewsAPI). It handles all external API requests for fetching news articles, managing timeouts, and handling errors.

### 6. **HTML Parsing: jsdom and Readability**
   - The app uses `jsdom` to create a simulated DOM environment for server-side HTML parsing and manipulation. `@mozilla/readability` is used to extract the main content from fetched news articles, ensuring a clean, readable experience when displaying articles to users.

### 7. **Environment Configuration: dotenv**
   - The `dotenv` package is used to manage environment variables, keeping sensitive information like API keys and database connection strings secure and separate from the codebase.

### 8. **Cross-Origin Resource Sharing: CORS**
   - The `cors` middleware is enabled to allow cross-origin requests, making it possible for the frontend (which might be hosted on a different domain) to interact with the backend securely.

---

## Special Features

### 1. **User Authentication and Authorization:**
   - The backend supports user registration, login, and protected routes using JWT. Only authenticated users can access certain features, like saving articles or viewing search history.

### 2. **Favorite Articles Management:**
   - Users can save their favorite news articles to their profile, which are stored in the MongoDB database. The application allows users to easily manage and view their saved articles.

### 3. **Search History Tracking:**
   - The backend logs every search query made by the user, storing it in the database. Users can later view their search history, making it easier to revisit previously searched topics.

### 4. **News Article Parsing and Enhancement:**
   - The backend enhances the user experience by parsing and cleaning up news articles using the `jsdom` and `@mozilla/readability` packages, ensuring that users see a simplified and readable version of the article content.

### 5. **Responsive API Design:**
   - The application provides a flexible and responsive API, capable of handling various user inputs, like searching by keyword, category or sources. The API is designed to support pagination and filtering, ensuring efficient data delivery.

### 6. **Secure Data Handling:**
   - Sensitive user data, such as passwords, are securely hashed before storage. The use of JWTs for authentication ensures that user sessions are secure and scalable.

---

## License

This project is licensed under the MIT License.

## Acknowledgements

- [NewsAPI.org](https://newsapi.org) for providing the news data.
- [React](https://reactjs.org/) and [Node.js](https://nodejs.org/) for making this project possible.

