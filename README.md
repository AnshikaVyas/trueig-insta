# Simple Instagram backend

Deployment link
LINK - https://trueig-insta.onrender.com

This is a full-stack Instagram clone application built with the MERN stack (MongoDB, Express, React, Node.js). It includes features like user authentication, posting, following users, liking and commenting on posts, and real-time chat.

## Features

- **User Authentication:** Sign up, log in, and log out with JWT-based authentication.
- **User Profiles:** View and update user profiles, including avatar, bio, and website.
- **Follow System:** Follow and unfollow other users.
- **Posting:** Create, update, and delete posts with captions and images.
- **Feed:** View a feed of posts from users you follow.
- **Like and Comment:** Like, unlike, and comment on posts.
- **Save Posts:** Save posts to a private "Saved" collection.
- **Real-time Chat:** Real-time messaging with other users.
- **Search:** Search for other users.

## Tech Stack

**Frontend:**
- React.js
- Redux for state management
- Tailwind CSS for styling

**Backend:**
- Node.js
- Express.js
- MongoDB with Mongoose
- JSON Web Tokens (JWT) for authentication
- Bcrypt for password hashing
- AWS S3 for file uploads

## Getting Started

### Prerequisites

- Node.js and npm
- MongoDB instance (local or cloud-based)
- AWS S3 bucket and credentials

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/insta-with-commits.git
    cd insta-with-commits
    ```

2.  **Backend Setup:**
    - Navigate to the `backend` directory: `cd backend`
    - Install dependencies: `npm install`
    - Create a `config.env` file in `backend/config` and add the following environment variables:
      ```
      PORT=4000
      MONGO_URI=<your_mongodb_uri>
      JWT_SECRET=<your_jwt_secret>
      JWT_EXPIRE=7d
      SMTP_HOST=<your_smtp_host>
      SMTP_PORT=<your_smtp_port>
      SMTP_USER=<your_smtp_user>
      SMTP_PASS=<your_smtp_pass>
      AWS_ACCESS_KEY_ID=<your_aws_access_key>
      AWS_SECRET_ACCESS_KEY=<your_aws_secret_key>
      AWS_REGION=<your_aws_region>
      AWS_BUCKET_NAME=<your_aws_bucket_name>
      ```
    - Start the backend server: `npm start`

3.  **Frontend Setup:**
    - Navigate to the `frontend` directory: `cd ../frontend`
    - Install dependencies: `npm install`
    - Start the frontend development server: `npm start`

The application should now be running on `http://localhost:3000`.

## Database Design

The application uses MongoDB. The database consists of four main collections: `users`, `posts`, `chats`, and `messages`.

### `users` collection

| Field               | Type                               | Description                                      |
| ------------------- | ---------------------------------- | ------------------------------------------------ |
| `_id`               | `ObjectId`                         | Unique identifier for the user.                  |
| `name`              | `String`                           | User's full name.                                |
| `email`             | `String`                           | User's email address (unique).                   |
| `username`          | `String`                           | User's username (unique, min 6 characters).      |
| `password`          | `String`                           | Hashed password (min 6 characters).              |
| `avatar`            | `String`                           | URL to the user's profile picture.               |
| `bio`               | `String`                           | User's biography.                                |
| `website`           | `String`                           | User's personal website.                         |
| `posts`             | `[ObjectId]` (ref: `Post`)         | Array of posts created by the user.              |
| `saved`             | `[ObjectId]` (ref: `Post`)         | Array of posts saved by the user.                |
| `followers`         | `[ObjectId]` (ref: `User`)         | Array of users who follow this user.             |
| `following`         | `[ObjectId]` (ref: `User`)         | Array of users this user follows.                |
| `resetPasswordToken`| `String`                           | Token for resetting the password.                |
| `resetPasswordExpiry`| `Date`                            | Expiry date for the reset password token.        |

### `posts` collection

| Field       | Type                               | Description                               |
| ----------- | ---------------------------------- | ----------------------------------------- |
| `_id`       | `ObjectId`                         | Unique identifier for the post.           |
| `caption`   | `String`                           | Caption for the post.                     |
| `image`     | `String`                           | URL to the post's image.                  |
| `postedBy`  | `ObjectId` (ref: `User`)           | The user who created the post.            |
| `likes`     | `[ObjectId]` (ref: `User`)         | Array of users who liked the post.        |
| `comments`  | `[Object]`                         | Array of comments on the post.            |
| `savedBy`   | `[ObjectId]` (ref: `User`)         | Array of users who saved the post.        |
| `createdAt` | `Date`                             | Timestamp of when the post was created.   |

### `chats` collection

| Field          | Type                        | Description                             |
| -------------- | --------------------------- | --------------------------------------- |
| `_id`          | `ObjectId`                  | Unique identifier for the chat.         |
| `users`        | `[ObjectId]` (ref: `User`)  | Array of users participating in the chat. |
| `latestMessage`| `ObjectId` (ref: `Message`) | The most recent message in the chat.    |
| `timestamps`   | `Boolean`                   | Adds `createdAt` and `updatedAt` fields.|

### `messages` collection

| Field      | Type                        | Description                             |
| ---------- | --------------------------- | --------------------------------------- |
| `_id`      | `ObjectId`                  | Unique identifier for the message.      |
| `sender`   | `ObjectId` (ref: `User`)    | The user who sent the message.          |
| `chatId`   | `ObjectId` (ref: `Chat`)    | The chat to which the message belongs.  |
| `content`  | `String`                    | The content of the message.             |
| `timestamps`| `Boolean`                   | Adds `createdAt` and `updatedAt` fields.|

## API Design

The API is built with Express.js and provides the following endpoints.

### User Routes (`/api/v1`)

| Method   | Endpoint                      | Description                          | Auth Required |
| -------- | ----------------------------- | ------------------------------------ | :-----------: |
| `POST`   | `/signup`                     | Create a new user account.           |      No       |
| `POST`   | `/login`                      | Log in a user.                       |      No       |
| `GET`    | `/logout`                     | Log out the current user.            |      Yes      |
| `GET`    | `/me`                         | Get details of the logged-in user.   |      Yes      |
| `DELETE` | `/me`                         | Delete the logged-in user's account. |      Yes      |
| `GET`    | `/user/:username`             | Get user details by username.        |      Yes      |
| `GET`    | `/userdetails/:id`            | Get user details by ID.              |      Yes      |
| `GET`    | `/users/suggested`            | Get a list of suggested users.       |      Yes      |
| `GET`    | `/users`                      | Search for users by query.           |      Yes      |
| `GET`    | `/follow/:id`                 | Follow or unfollow a user by ID.     |      Yes      |
| `PUT`    | `/update/profile`             | Update the logged-in user's profile. |      Yes      |
| `PUT`    | `/update/password`            | Update the logged-in user's password.|      Yes      |
| `POST`   | `/password/forgot`            | Send a password reset email.         |      No       |
| `PUT`    | `/password/reset/:token`      | Reset the user's password.           |      No       |

### Post Routes (`/api/v1`)

| Method   | Endpoint                 | Description                         | Auth Required |
| -------- | ------------------------ | ----------------------------------- | :-----------: |
| `POST`   | `/post/new`              | Create a new post.                  |      Yes      |
| `GET`    | `/posts/all`             | Get all posts (for exploration).    |      No       |
| `GET`    | `/posts`                 | Get posts of users you follow.      |      Yes      |
| `GET`    | `/post/detail/:id`       | Get details of a single post.       |      Yes      |
| `GET`    | `/post/:id`              | Like or unlike a post.              |      Yes      |
| `POST`   | `/post/:id`              | Save or unsave a post.              |      Yes      |
| `PUT`    | `/post/:id`              | Update the caption of a post.       |      Yes      |
| `DELETE` | `/post/:id`              | Delete a post.                      |      Yes      |
| `POST`   | `/post/comment/:id`      | Add a comment to a post.            |      Yes      |

### Chat Routes (`/api/v1`)

| Method | Endpoint    | Description                     | Auth Required |
| ------ | ----------- | ------------------------------- | :-----------: |
| `POST` | `/newChat`  | Create a new chat with a user.  |      Yes      |
| `GET`  | `/chats`    | Get all chats for the logged-in user. |      Yes      |

### Message Routes (`/api/v1`)

| Method | Endpoint           | Description                      | Auth Required |
| ------ | ------------------ | -------------------------------- | :-----------: |
| `POST` | `/newMessage`      | Send a new message to a chat.    |      Yes      |
| `GET`  | `/messages/:chatId`| Get all messages for a specific chat.|      Yes      |