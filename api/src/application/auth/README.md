# Auth

Authentication works via the following parts

- AuthGuard
- CurrentUserService
- HttpSessionService
- TokenService


A request carrying a bearer token in the JWT format signed with the same key as our api will be used to identify the user and session.


Request -> AuthGuard -> CurrentUserService -> HttpSessionService -> TokenService -> *

