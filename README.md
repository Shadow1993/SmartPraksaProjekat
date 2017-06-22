<h1 align="center"> Smart Praksa - Projekat </h1>
<p align="center">Projekat na Smart Praksi</p>

<details><summary align="center"><strong>API Documentation</strong></summary>
<details><summary>Decisions</summary>

|    Method     |      URL      |     Params    | Body | Description  |
| ------------- | ------------- | ------------- | ------------- | ------------- |
| GET  | '/decisions' | <ul></ul> | <ul></ul> | Gets all decisions |
| GET  | '/decisions/:id'  | <ul><li>id : String</li></ul> | <ul></ul> | Gets everything for a single decision |
| POST | '/decisions' | <ul></ul> | <ul><li>title : String</li><li>description : String</li><li>type : String</li><li>steps : Number</li><li>startingDate : Date</li><li>expirationDate : Date</li></ul> | Creates a new decision |
| PUT | '/decisions' | <ul></ul> | <ul><li>id : String</li><li>title : String</li><li>description : String</li><li>type : String</li><li>steps : Number</li><li>startingDate : Date</li><li>expirationDate : Date</li></ul> | Restart a single decision |
</details>
<details><summary>Users</summary>


|    Method     |      URL      |     Params    | Body | Description  |
| ------------- | ------------- | ------------- | ------------- | ------------- |
| GET  | '/users' | <ul></ul> | <ul></ul> | Gets all users |
| GET  | '/users/:id'  | <ul><li>id : String</li></ul> | <ul></ul> | Gets everything for a single user |
| POST | '/users' | <ul></ul> | <ul><li>username : String</li><li>password : String</li><li>role : Array[String]</li><li>createdDate : Date</li></ul> | Creates a new decision |
| PUT | '/users' | <ul></ul> | <ul><li>id : String</li><li>username : String</li><li>password : String</li></ul> | Updates a single user's details |
| DELETE | '/users/:id' | <ul><li>id : String</li></ul> | <ul></ul> | Deletes a single user |
</details>
<details><summary>Comments</summary>

|    Method     |      URL      |     Params    | Body | Description  |
| ------------- | ------------- | ------------- | ------------- | ------------- |
| GET  | '/comments/:id' | <ul><li>id : String</li></ul> | <ul></ul> | Gets all comments for ID specified (ID of Decision) |
| POST | '/comments' | <ul></ul> | <ul><li>id : String</li><li>text : String</li><li>submitedBy : String</li><li>submitedDate : Date</li></ul> | Creates a new comment on ID specified (ID of Decision; submittedBy is ID of User) |
</details>
<details><summary>Votes</summary>

|    Method     |      URL      |     Params    | Body | Description  |
| ------------- | ------------- | ------------- | ------------- | ------------- |
| POST  | '/votes' | <ul></ul> | <ul><li>id : String</li><li>type : String</li><li>submitedDate : Date</li><li>submitedBy : String</li><li>commentText : String</li></ul> | Creates a vote with comment by User(submitedBy) on decision (id) |
| PUT | '/votes' | <ul></ul> | <ul><li>id : String</li><li>submitedDate : Date</li><li>submitedBy : String</li><li>commentText : String</li></ul> | Edits an existing vote (id), by User (submitedBy) |
</details>

</details>
<details><summary align="center"><strong>Application Flow</strong></summary>

 - Once you reach the website's address, you will be directed to '/login' to login.
     - If you try to reach a non existing route you will also be redirected to '/login' as it is the default.
 - After logging in, you will be redirected to '/resolutions', this is basically a default page for anyone logged in as anyone can access it.
 - Every page after Login (Except Logout, as it doesn't have a page to show), will have a Header section, used to navigate around the website. Will contain links based on the user's roles:
     - If the user has a role of Facilitator, the user will  have access to an extra page, where they can perform their tasks.
     - If the user has a role of Administrator, the user will  have access to an extra page, where they can perform their tasks.

---
*Details Per Page* :

<details><summary>Login</summary>
<ul>
  <li>This page is the default of the website.</li>
  <li>It's used to login in order to access the rest of the website.</li>
</ul>
</details>
<details><summary>Resolutions</summary>
<ul>
  <li>This page is the main page of the website, and you will be redirected to it after loggin in.</li>
  <li>Anyone logged in can see this page.</li>
  <li>Used to display active & archived decisions, in two tables.</li>
  <li>Clicking on any decision individually will take you to a more detailed page:</li>
  <ul>
     <li>Allows Voters to vote on the specific decision.</li>
     <ul>
         <li>Voting can only be done once per user.</li>
         <li>Cannot vote after the specific Decisions' time has expired.</li>
     </ul>
     <li>Anyone can comment on the specific Decision, to join in the discussion.</li>
     <li>There's also a results section which will display the Decisions' results.</li>
  </ul>
</ul>
</details>
<details><summary>Facilitator</summary>
<ul>
  <li>Accessible only to Facilitators.</li>
  <li>This page lists out all decisions.</li>
  <li>Page functionallity includes:</li>
  <ul>
    <li>Creating a new Decision.</li>
    <ul>
      <li>Presents a form to fill out.</li>
      <li>All fields are required:</li>
      <ul>
        <li>Upon filling it out, a request to the server is made to create a new Decision.</li>
        <li>Failing to fill in whole form in accordance with pre-set rules, will prevent the user from creating the Decision, and notify the user with an adequate prompt.</li>
      </ul>
      <li>After the Decision is made, redirects back to the Facilitator page.</li>
    </ul>
  </ul>
</ul>
</details>
<details><summary>Administrator</summary>
<ul>
  <li>Accessible only to Administrators.</li>
  <li>Lists out all users.</li>
  <li>Page functionallity includes:</li>
  <ul>
    <li>Deleting (Deactivating inside the DataBase) any user.</li>
    <li>Editing any users' information and/or roles (Cannot edit Administrators).</li>
    <li>Creating a new user.</li>
  </ul>
</ul>
</details>
<details><summary>Logout</summary>
<ul>
  <li>This page is just here to log you out and redirect you to login, nothing more.</li>
</ul>
</details>
</details>
