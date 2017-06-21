# SmartPraksaProjekat
Projekat na Smart Praksi


<details>
<summary>

## API Documentation
</summary>

<details>
<summary>

### Decisions
</summary>

|    Method     |      URL      |     Params    | Body | Description  |
| ------------- | ------------- | ------------- | ------------- | ------------- |
| GET  | '/decisions' | <ul></ul> | <ul></ul> | Gets all decisions |
| GET  | '/decisions/:id'  | <ul><li>id : String</li></ul> | <ul></ul> | Gets everything for a single decision |
| POST | '/decisions' | <ul></ul> | <ul><li>title : String</li><li>description : String</li><li>type : String</li><li>steps : Number</li><li>startingDate : Date</li><li>expirationDate : Date</li></ul> | Creates a new decision |
| PUT | '/decisions' | <ul></ul> | <ul><li>id : String</li><li>title : String</li><li>description : String</li><li>type : String</li><li>steps : Number</li><li>startingDate : Date</li><li>expirationDate : Date</li></ul> | Restart a single decision |
</details>

<details>
<summary>

### Users
</summary>


|    Method     |      URL      |     Params    | Body | Description  |
| ------------- | ------------- | ------------- | ------------- | ------------- |
| GET  | '/users' | <ul></ul> | <ul></ul> | Gets all users |
| GET  | '/users/:id'  | <ul><li>id : String</li></ul> | <ul></ul> | Gets everything for a single user |
| POST | '/users' | <ul></ul> | <ul><li>username : String</li><li>password : String</li><li>role : Array[String]</li><li>createdDate : Date</li></ul> | Creates a new decision |
| PUT | '/users' | <ul></ul> | <ul><li>id : String</li><li>username : String</li><li>password : String</li></ul> | Updates a single user's details |
| DELETE | '/users/:id' | <ul><li>id : String</li></ul> | <ul></ul> | Deletes a single user |
</details>

<details>
<summary>

### Comments
</summary>

|    Method     |      URL      |     Params    | Body | Description  |
| ------------- | ------------- | ------------- | ------------- | ------------- |
| GET  | '/comments/:id' | <ul><li>id : String</li></ul> | <ul></ul> | Gets all comments for ID specified (ID of Decision) |
| POST | '/comments' | <ul></ul> | <ul><li>id : String</li><li>text : String</li><li>submitedBy : String</li><li>submitedDate : Date</li></ul> | Creates a new comment on ID specified (ID of Decision; submittedBy is ID of User) |
</details>

<details>
<summary>

### Votes
</summary>

|    Method     |      URL      |     Params    | Body | Description  |
| ------------- | ------------- | ------------- | ------------- | ------------- |
| POST  | '/votes' | <ul></ul> | <ul><li>id : String</li><li>type : String</li><li>submitedDate : Date</li><li>submitedBy : String</li><li>commentText : String</li></ul> | Creates a vote with comment by User(submitedBy) on decision (id) |
| PUT | '/votes' | <ul></ul> | <ul><li>id : String</li><li>submitedDate : Date</li><li>submitedBy : String</li><li>commentText : String</li></ul> | Edits an existing vote (id), by User (submitedBy) |
</details>

</details>

<details>
<summary>

## Application Flow
</summary>

 - Once you reach the website's address, you will be directed to '/login' to login.
     - If you try to reach a non existing route you will also be redirected to '/login' as it is the default.
 - After logging in, you will be redirected to '/resolutions', this is basically a default page for anyone logged in as anyone can access it.
     - The navigation at the top can be used to access other pages if user has access to, or logout.
 - If the user has a role of Facilitator, and/or Administrator, he/she will  have access to an extra page (each), where they can perform their tasks.
</details>
