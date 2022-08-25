import { Fetcher } from "@it-minds/itm_summeruni_utils";

/**
 * uses the fetcher client and the given username password to authenticate
 * mutates the given fetcher client to include the bearer token in all headers
 * 
 * @param username 
 * @param password 
 * @param fetcher 
 * @returns a new authenticated fetcher client
 */
export const login = async (
    username: string,
    password: string,
    fetcher?: Fetcher
  ): Promise<Fetcher> => {
    if (!fetcher) {
      fetcher = Fetcher.configure({
        baseUrl: "http://localhost:8080",
      });
    }
  
    const loginClient = fetcher.path("/auth/login").method("post").build();
  
    const loginResult = await loginClient({
      username,
      password,
    });
  
    fetcher.configure({
      baseUrl: "http://localhost:8080",
      init: {
        headers: {
          "Authorization": "Bearer " + loginResult.data.token
        }
      }
    })
  
    return fetcher;
  };