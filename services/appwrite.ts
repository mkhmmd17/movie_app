//track searches made by a user

import {Client, Databases, ID, Query, Account} from "appwrite";

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;

const client = new Client()
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!)


const database = new Databases(client);
const account = new Account(client);
export { database, account, ID, Query}
//Auth methods

export const createAccount = async (email: string, password: string, name: string) => {
    return await account.create(ID.unique(), email, password, name);
}

export const login = async (email: string, password: string) => {
    return await account.createEmailPasswordSession(email, password);
}

export const getCurrentUser = async () => {
    try {
        return await account.get();
    } catch (err: any)  {
        if (err.code === 401 || err.message?.contain('Missing scope')) {
            return null
        }
        throw err;
    }
}

export const logout = async() => {
    return await account.deleteSessions();
}

export const updateSearchCount = async (query: string, movie: Movie) => {

    try {
        const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
            Query.equal('searchTerm', query)
        ])

        // check if a record of that search has already been stored
        if (result.documents.length > 0) {
            const existingMovie = result.documents[0];

            await database.updateDocument(
                DATABASE_ID,
                COLLECTION_ID,
                existingMovie.$id,
                {
                    count: existingMovie.count + 1
                }
            )
        } else {
            await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
                title: movie.title,
                searchTerm: query,
                movie_id: movie.id,
                count: 1,
                poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
            })
        }
        // uf a document is found increment the searchCount field
        //if no document is found c
        //create a new document in Appwrite database ->1
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const getTrendingMovies = async (): Promise<TrendingMovie[] | undefined> => {
    try {
        const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
            Query.limit(5),
            Query.orderDesc('count'),
        ])
        return result.documents as unknown as TrendingMovie[];
    } catch (error) {
        console.log(error);
        return undefined;
    }
}