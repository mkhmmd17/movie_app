import {FlatList, Image, Text, TouchableOpacity, View} from "react-native";
import React from "react";
import {icons} from "@/constants/icons";
import {useSavedMovie} from "@/context/SavedMovieContext";
import {router} from "expo-router";

const Saved = () => {

    const {savedMovies, removeMovie} = useSavedMovie();

    if (savedMovies.length === 0) {
        return (
            <View className="bg-primary flex-1 px-10">
                <View className="flex justify-center items-center flex-1 flex-col gap-5">
                <Image source={icons.save} className="size-10" tintColor="#fff" />
                <Text className="text-gray-500 text-base">No Saved Movies yet</Text>
                </View>
            </View>
        )
    }

    return (
        <View className="bg-primary flex-1">
            <View className="pt-16 flex-1">
                <FlatList
                    data={savedMovies}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={{padding: 16, paddingBottom: 100}}
                    showsVerticalScrollIndicator={false}
                    renderItem={({item}) => (
                        <TouchableOpacity
                            className="flex-row items-center mb-4 bg-dark-100 rounded-xl overflow-hidden h-20"
                            onPress={() => router.push(`/movies/${item.id}`)}
                        >
                            <Image
                            source={{uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`}}
                            className="w-20 h-20"
                            resizeMode="cover"
                            />
                            <View className="flex-1 p-3">
                                <Text className="text-white text-base font-bold mb-1" numberOfLines={1}>
                                    {item.title}
                                </Text>
                            </View>
                            <TouchableOpacity
                                onPress={() => removeMovie(item.id)}
                                className="p-3"
                            >
                                <Image source={icons.save} className="size-5" tintColor="#ff4444"/>
                            </TouchableOpacity>
                        </TouchableOpacity>
                    )}
                />
            </View>
        </View>
    )
}

export default Saved