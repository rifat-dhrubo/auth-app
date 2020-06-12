# Documentation

## Install Instruction

- Clone this repository.
- cd auth-app
- cd client
- yarn install or npm install
- cd ..
- yarn install or npm install
- yarn dev or npm run dev

Log in information for client app

email: jdoe@gmail.com
password: 123456a

Environment variables are available from .env file. This app used mailtrap for email testing. A mailtrap account can be accessed via github account. For that MAIL_USER and MAIL_PASS need to be changed.

## API Documentation

The API end points are as follows.

### **GET** `/api/v1/user?query`

  This Route is used to fetch product from the Database. Based on the query parameter the product retrieval can be specified.

  `page` This query parameter will fetch the specific user page The default parameter is 1.

### **POST** `/api/v1/register`

This endpoint will register a new user. Necessary parameters are as follows:

- name
- email
- password
- passwordConfirm
- phone

### **POST** `/api/v1/login`

This endpoint will log an user in. Local password based authentication. Will send JWT token for logged in user. Necessary parameters are:

- email
- password

### **PUT** `/api/v1/update`

 This endPoint is for updating users. One ir more field can be updated. Fields are:

- name
- email
- phone

### **POST** `/api/v1/forgot`

This endpoint will receive a forget password request. If user exists a email will be sent to the user email with a JWT token based link for verification. Necessary fields are.

- email

### **POST** `/api/v1/forgot/verify`

This endpoint will verify the reset token sent by email and set new password and issue json response. Required fields

- password
- confirmPassword
- token

### **POST** `/api/v1/verify`

This endpoint will verify and update the JWT token for a verified user. JWT  must be present in Authorization header.

### **POST** `/api/v1/verify/email/:token`

This endpoint will verify the JWT sent user for verification

## Front-End Documentation

The app has 9 routes.

### `/`

This is the Homepage.

### `/login`

User can login from this page.

### `/register`

User can register from this page.

### `/info`

Will show all registered user. Route is protected by JWT.

### `/reset`

User can send the email in case they forgot password from this page.

### `/resetVerify/:token`

This will be the redirect page from the email. This page will send the token along with new password to the server

### `/update`

Registered user can update their profile from this page
