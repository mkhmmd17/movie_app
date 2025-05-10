import {Image, ScrollView, Text, TouchableOpacity, View} from "react-native";
import React from "react";
import {router, useLocalSearchParams} from "expo-router";
import useFetch from "@/services/useFetch";
import {fetchMovieDetails} from "@/services/api";
import {icons} from "@/constants/icons";
import {useSavedMovie} from "@/context/SavedMovieContext";
import MovieInfo from "@/components/MovieInfo";

const MovieDetails = () => {

    const {id} = useLocalSearchParams();

    const {data: movie, loading} = useFetch(() => fetchMovieDetails(id as string));
    const { saveMovie, removeMovie, isMovieSaved } = useSavedMovie();

    const handleSaveMovie = () => {
        if (movie) {
            if (isMovieSaved(movie.id)) {
                removeMovie(movie.id);
            } else {
                saveMovie({
                    id: movie.id,
                    title: movie.title,
                    poster_path: movie.poster_path ?? ``,
                    release_date: movie.release_date,
                })
            }
        }
    }

    // @ts-ignore
    return (
        <View className="bg-primary flex-1">
            <ScrollView contentContainerStyle={{paddingBottom: 80}}>
                <View>
                    <Image source={{uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}`}}
                           className="w-full h-[550px]" resizeMode="stretch"/>
                    <View className="flex-col items-start justify-center mt-5 px-5">
                        <Text className="text-white font-bold text-xl">
                            {movie?.title}
                        </Text>
                        <View className="flex-row items-center gap-x-1 mt-2">
                            <Text className="text-light-200 text-sm">
                                {movie?.release_date?.split('-')[0]}
                            </Text>
                            <Text className="text-light-200 text-sm">
                                {movie?.runtime}m
                            </Text>
                            <View className="flex-row items-center bg-dark-100 px-2 py-1 rounded-md gap-x-1 mt-2">
                                <Image source={icons.star} className="size-4"/>
                                <Text className="text-white font-bold text-sm">
                                    {Math.round(movie?.vote_average ?? 0)} / 10
                                </Text>
                                <Text className="text-light-200 text-sm">
                                    ({movie?.vote_count} votes)
                                </Text>
                            </View>
                        </View>
                        <MovieInfo label="Overview" value={movie?.overview}/>
                        <MovieInfo label="Genres " value={movie?.genres.map((g) => g.name).join(' - ') || 'N/A'}/>
                        <View className="flex flex-row justify-between w-1/2">
                            <MovieInfo label="Budget" value={`$${(movie?.budget ?? 0) / 1_000_000} million`} />
                            <MovieInfo label="Revenue" value={`${Math.round((movie?.revenue ?? 0)) / 1_000_000}`} />
                        </View>

                        <MovieInfo label="Production Companies" value={`${movie?.production_companies.map((c) => c.name).join(' - ') || 'N/A'}`} />
                    </View>
                </View>
            </ScrollView>
            <View className="absolute flex flex-row bottom-5 gap-x-2 z-50 left-0 right-0 mx-5">
                <TouchableOpacity className="flex-1 bg-accent rounded-lg py-3.5 flex flex-row items-center justify-center z-50" onPress={router.back}>
                    <Image source={icons.arrow} className="size-5 mr-1 mt-0.5 rotate-180" tintColor="#fff"/>
                    <Text className="text-white font-semibold text-base">Go back</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    className="bg-accent flex-1 items-center justify-center z-50 rounded-lg flex-row right-0"
                    onPress={handleSaveMovie}>
                    <Image
                        source={icons.save}
                        className="size-5 mr-1 mt-0.5"
                        tintColor={isMovieSaved(movie?.id ?? 0) ? '#ff4444' : '#fff'}/>
                    <Text className="text-white font-semibold text-base">
                        {isMovieSaved(movie?.id ?? 0) ? "Remove" : "Save"}
                    </Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}

export default MovieDetails