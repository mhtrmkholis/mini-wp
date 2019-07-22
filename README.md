
## Link Deploy
miniwp.mhtrmkholis.com

## Environment

PORT=
JWT_SECRET=
GOOGLE_CLIENT_ID=
CLOUD_BUCKET=
GCLOUD_PROJECT=
KEYFILE_PATH=

### User Router:

Route | Method | Request(s) | Response(s) | Description
---|---|---|---|---
`/users` | GET | `none` | **Success**<br>`200` OK<br>**Fail**<br>`500` Internal Server Error | Show all users
`/users/signup` | POST | **Body**<br>name: `String`<br>email: `String`<br>password: `String` | **Success**<br>`201` Created<br>**Fail**<br>`500` Internal Server Error | Create a user
`/users/signin` | POST | **Body**<br>email: `String`<br>password: `String` | `200` OK<br>**Fail**<br>`400` Bad Request | Sign a user in
`/users/signinGoogle` | POST | **Body**<br>email: `String`<br>password: `String` | `200` OK<br>**Fail**<br>`400` Bad Request | Sign a user in with google account

### Article Router:

Route | Method | Request(s) | Response(s) | Description
---|---|---|---|---
`/articles` | POST | **Headers**<br>token: `String`<br>**Body**<br>title: `String`<br>content: `String`<br>created_at: `Date`<br>featured_image: `String`<br>tags: `Array[String]` | **Success**<br>`201` Created<br>**Fail**<br>`500` Internal Server Error | Create article
`/articles` | GET | `none` | `200` OK<br>**Fail**<br>`401` Authorization Error<br>`500` Internal Server Error | Get all article
`/articles/myarticle` | GET | `none` | `200` OK<br>**Fail**<br>`401` Authorization Error<br>`500` Internal Server Error | Get all article by authorize user
`/articles/:id` | PUT | **Headers**<br>token: `String`<br>**Params**<br>id: `String`<br>**Body**<br>title: `String`<br>content: `String`<br>created_at: `Date`<br>featured_image: `String`<br>tags: `Array[String]` | `200` OK<br>**Fail**<br>`401` Authorization Error<br>`500` Internal Server Error | Update one article
`/articles/:id` | PUT | **Headers**<br>token: `String`<br>**Params**<br>id: `String`<br>**Body**<br>title: `String`<br>content: `String`<br>created_at: `Date`<br>featured_image: `String`<br>tags: `Array[String]` | `200` OK<br>**Fail**<br>`401` Authorization Error<br>`500` Internal Server Error | Update one article
`/articles/:id` | DELETE | **Headers**<br>token: `String`<br>**Params**<br>id: `String` | `200` OK<br>**Fail**<br>`401` Authorization Error<br>`500` Internal Server Error | Delete an article

### Tags Router
Route | Method | Request(s) | Response(s) | Description
---|---|---|---|---
`/tags` | GET | `none` | `200` OK<br>**Fail**<br>`401` Unauthorized <br>`500` Internal Server Error | Get all article
