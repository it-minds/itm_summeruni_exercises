import { Fetcher } from "@it-minds/itm_summeruni_utils";

/**
 * 
 * @param username 
 * @param password 
 * @param fetcher 
 * @returns the ID of the created author
 */
export const createAuthor = async (
    username: string,
    password: string,
    fetcher?: Fetcher
  ): Promise<string> => {
    if (!fetcher) {
      fetcher = Fetcher.configure({
        baseUrl: "http://localhost:8080",
      });
    }
  
    const createAuthorClient = fetcher.path("/authors").method("post").build();
  
    const createAuthor = await createAuthorClient({
      username,
      password,
    });
  
    return createAuthor.data.id;
  };