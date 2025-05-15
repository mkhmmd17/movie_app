import { useEffect, useState } from "react";
import {
    View,
    Text,
    ActivityIndicator,
    ScrollView,
    Image,
    FlatList,
} from "react-native";
import { useRouter } from "expo-router";
import { getCurrentUser, getTrendingMovies } from "@/services/appwrite";
import useFetch from "@/services/useFetch";
import { fetchMovies } from "@/services/api";
import SearchBar from "@/components/SearchBar";
import MovieCard from "@/components/MovieCard";
import TrendingCard from "@/components/TrendingCard";
import { images } from "@/constants/images";
import { icons } from "@/constants/icons";

export default function Index() {
    const router = useRouter();
    const [checkingAuth, setCheckingAuth] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const user = await getCurrentUser();
                console.log("User session:", user);

                if (!user) {
                    router.replace("/(auth)/login");
                }
            } catch (err) {
                console.error("Auth error (unexpected):", err);
            } finally {
                setCheckingAuth(false);
            }
        };
        checkAuth();
    }, []);

    const {
        data: trendingMovies,
        loading: trendingLoading,
        error: trendingError,
    } = useFetch(getTrendingMovies);

    const {
        data: movies,
        loading: moviesLoading,
        error: moviesError,
    } = useFetch(() => fetchMovies({ query: "" }));

    if (checkingAuth) {
        return (
            <View className="flex-1 justify-center items-center bg-primary">
                <ActivityIndicator size="large" color="#FFF" />
            </View>
        );
    }

    return (
        <View className="flex-1 bg-primary">
            <Image source={images.bg} className="absolute w-full z-100" />
            <ScrollView className="flex-1 px-5">
                <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />
                <SearchBar
                    onPress={() => router.push("/search")}
                    placeholder="Search for a Movie"
                />
                {/* Trending */}
                <Text className="text-lg text-white font-bold mt-5 mb-3">
                    Trending Movies
                </Text>
                <FlatList
                    horizontal
                    data={trendingMovies}
                    renderItem={({ item, index }) => (
                        <TrendingCard movie={item} index={index} />
                    )}
                    keyExtractor={(item) => item.movie_id.toString()}
                    showsHorizontalScrollIndicator={false}
                />
                {/* Latest */}
                <Text className="text-lg text-white font-bold mt-5 mb-3">
                    Latest Movies
                </Text>
                <FlatList
                    data={movies}
                    renderItem={({ item }) => <MovieCard {...item} />}
                    keyExtractor={(item) => item.id.toString()}
                    numColumns={3}
                    columnWrapperStyle={{ justifyContent: "flex-start", gap: 20 }}
                    scrollEnabled={false}
                />
            </ScrollView>
        </View>
    );
}
