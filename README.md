# pod-sso-pkce

This package includes methods for using SSO POD (https://docs.pod.ir/v1.6.0.0/SSO/Introduction/149/SSO) by The PKCE method.

You can use this package in any frontend project.

## Installation

Use npm to install the package:

```
npm i pod-sso-pkce
```

##### Notice: All data is stored in Local Storage.

<br >
<br >

## Methods

| Method          | Description                                                                               |
| --------------- | ----------------------------------------------------------------------------------------- |
| authenticate    | To login to the account with the SSO POD                                                  |
| validate        | To validate the user after returning from the SSO POD to your app and get an access token |
| refreshToken    | To get a new access token after the current access token expires                          |
| getAccessToken  | Get the user's current access token                                                       |
| isAuthenticated | Checks if the user is logged in or not                                                    |
| logout          | User logs out from the user account                                                       |

<br />

### authenticate()

| Parameter      | Type   | Description | Example                           |
| -------------- | ------ | ----------- | --------------------------------- |
| ssoURL         | string |             | https://accounts.pod.ir/          |
| clientId       | string |             | 20200000egh98412ea0a164708f109210 |
| redirectUrlSso | string |             | http://myapp.ir/validate          |
| ssoScope       | string |             | profile email                     |

After calling this method, your app will be redirected to the SSO POD.

<br >

### validate()

| Parameter                | Type     | Description | Example                           |
| ------------------------ | -------- | ----------- | --------------------------------- |
| ssoURL                   | string   |             | https://accounts.pod.ir/          |
| clientId                 | string   |             | 20200000egh98412ea0a164708f109210 |
| redirectUrlSso           | string   |             | http://myapp.ir/validate          |
| redirectUrlAfterValidate | string   |             | http://myapp.ir/mypanel           |
| onError                  | function |             | `() => alert('something wrong')`  |

After calling this method, if the validation is successful, the user will be redirected to your target url (redirectUrlAfterValidate) but if it isn't, the onError event will occur.

<br >

### refreshToken()

| Parameter | Type   | Description | Example                                                                                                                        |
| --------- | ------ | ----------- | ------------------------------------------------------------------------------------------------------------------------------ |
| ssoInfo   | Object |             | `{ clientId: '20200000egh98412ea0a164708f109210', ssoURL:'https://accounts.pod.ir/' ,onError: () => alert("something wrong")}` |

After calling this method, you can get a new access token with the getAccessToken() Method.
<br>
the onError event will occurs if an error happens.

<br >

### getAccessToken()

| Return values | Type   | Description                    |
| ------------- | ------ | ------------------------------ |
| access token  | string | When the user is logged in     |
| null          | null   | When the user is not logged in |

<br >

### isAuthenticated()

| Return values | Type    | Description                    |
| ------------- | ------- | ------------------------------ |
| true          | boolean | When the user is logged in     |
| false         | boolean | When the user is not logged in |

This method is improving...

<br >

### logout()

| Parameter              | Type   | Description                                                     | example                |
| ---------------------- | ------ | --------------------------------------------------------------- | ---------------------- |
| redirectUrlAfterLogout | string | The page you want the user to see after logout from the account | http://example.ir/home |

<br >
<br >

## Usage

#### authenticate() Example

```jsx
import { authenticate } from 'pod-sso-pkce';

function App() {
  const ssoURL = 'https://accounts.pod.ir/';
  const clientId = '20200000egh98412ea0a164708f109210';
  const redirectUrlSso = 'http://myapp.ir/validate';
  const ssoScope = 'profile email';

  // ...
  authenticate(ssoURL, clientId, redirectUrlSso, ssoScope);
  // ...
}
```

#### validate() Example

```jsx
import { validate } from 'pod-sso-pkce';

function App() {
  const ssoURL = 'https://accounts.pod.ir/';
  const clientId = '20200000egh98412ea0a164708f109210';
  const redirectUrlSso = 'http://myapp.ir/validate';
  const ssoScope = 'profile email';
  const redirectUrlAfterValidate = 'http://myapp.ir/mypanel';

  // ...
  validate(ssoURL, clientId, redirectUrlSso, redirectUrlAfterValidate, () => {
    console.log('error in validation');
  });
  // ...
}
```

#### refreshToken() Example

```jsx
import { refreshToken, getAccessToken } from 'pod-sso-pkce';

async function fetch() {
  // ...
  if (error.response.status === 401) {
    await refreshToken({
      clientId: '20200000egh98412ea0a164708f109210',
      ssoURL: 'https://accounts.pod.ir/',
      onError: () => alert('something wrong'),
    });

    const accessToken = getAccessToken();
  }
  // ...
}
```

#### getAccessToken() Example

```jsx
import { getAccessToken } from 'pod-sso-pkce';

function App() {
  // ...
  const accessToken = getAccessToken();
  // ...
}
```

#### isAuthenticated() Example

```jsx
import { isAuthenticated } from 'pod-sso-pkce';

function App() {
  // ...
  if (isAuthenticated()) {
    alert('you are login.');
  } else {
    alert('you are not login');
  }
  // ...
}
```

#### logout() Example

```jsx
import { logout } from 'pod-sso-pkce';

function App() {
  // ...
  logout('http://myapp.ir/home'); // :D
  // ...
}
```

## LICENSE

MIT
