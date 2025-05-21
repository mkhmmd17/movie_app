import {createContext, useContext, useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";


interface Movie {
    id: number;
    title: string;
    poster_path: string;
    release_date: string;
}

interface SavedMovieContextType {
    savedMovies: Movie[];
    saveMovie: (movie: Movie) => void;
    removeMovie: (movieId: number) => void;
    isMovieSaved: (movieId: number) => boolean;
}

const STORAGE_KEY = "@saved_movies";

const SavedMovieContext = createContext<SavedMovieContextType | undefined>(undefined)

export const SavedMovieProvider = ({children} : {children: React.ReactNode}) => {
    const [savedMovies, setSavedMovies] = useState<Movie[]>([]);

    //triggers ones when app starts
    useEffect(() => {
        loadSavedMovies();
    }, [])

    const loadSavedMovies = async() => {
        try {
            const savedMovieJson = await AsyncStorage.getItem(STORAGE_KEY);
            if (savedMovieJson) {
                setSavedMovies(JSON.parse(savedMovieJson)); //?
            }
        } catch (error) {
            console.error(`Error loading SavedMovies. Error is : ${error}`);
        }
    }

    const saveMovie = async (movie: Movie) => {
        try {
            const newSavedMovies = [...savedMovies];
            if(!newSavedMovies.some(m => m.id === movie.id)) { //?
                newSavedMovies.push(movie);
                setSavedMovies(newSavedMovies); //? setSavedMovies is a function
                await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newSavedMovies)); //?
            }
        } catch (error) {
            console.error(`Error to save Movie. Error is : ${error}`);
        }
    }

    const removeMovie = async (movieId: number) => {
        try {
            const newSavedMovies = savedMovies.filter(m => m.id !== movieId); //?
            setSavedMovies(newSavedMovies);
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newSavedMovies));
        } catch(error) {
            console.error(`Error deleting Movie with id. Error is: ${error}`);
        }
    }

    const isMovieSaved = (movieId: number) => {
        return savedMovies.some(m => m.id === movieId);
    }

    // Collect states and functions pass it to the childrens
    return (
        <SavedMovieContext.Provider value={{ savedMovies, saveMovie, removeMovie, isMovieSaved}}>
            {children}
        </SavedMovieContext.Provider>
    )
}

export const useSavedMovie = () => {
    const context = useContext(SavedMovieContext)
    if (context === undefined) {
        throw new Error('useSavedMovie must be used withing a SavedMovieProvider');
    }
    return context;
}