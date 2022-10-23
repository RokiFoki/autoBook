# Auto Book Overview 

User types: 
1. restourants
2. people

## Apps

1. Landing page for restourants 
2. Internal aBook app (react)
3. WebApp for reservations (next.js)
4. MobileApp for reservations (?)
5. Server 

### 1. Landing page for restourants

- SEO is important
- content will be static 
- tech: ([Gatsby](https://reactjs.org/docs/create-a-new-react-app.html#gatsby), next.js or static HTML)

### 2. Internal aBook App 
- content is highly interative
- there is a way to redirect a user from landing page to see demo interactive restoraunt
- there is a way to reddirect a logged in user to start interacting with internal aBook App
- tech: react

#### UseCases
1. Can monitor current restourant
    - see current reservations 
    - see reservations in the future, in the past (with a slider?)
    - receive notifications upon reservations
    - receive notifications upon arrivals (v2)
2. Can configure current restourant:
    - table placement
    - table configuration (number of people)
    - min reservation time
    - max reservation time (paid?)
3. Can monitor current restourants - if owner (with special role - most users will not need it?)
    - can create a new restourant
    - can do everything from usecases 1 and 2


### 3. WebApp/Mobile for reservations 
- content is interactive
- SEO is also important (web)
- tech: next.js

#### Usecases
1. user can see available tables for every restourant
2. user can search restourants on a map
3. user can search for available tables on a date&time
4. user can reserve a table for a duration

