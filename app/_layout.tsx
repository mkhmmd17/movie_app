import {Stack} from "expo-router";
import "./globals.css";
import {StatusBar} from "react-native";
import {SavedMovieProvider} from "@/context/SavedMovieContext";

export default function RootLayout() {
    return (
        <SavedMovieProvider>
            <StatusBar hidden={true}/>
            <Stack>
                <Stack.Screen
                    name="(tabs)"
                    options={{headerShown: false}}
                />

                <Stack.Screen
                    name="movies/[id]"
                    options={{headerShown: false}}
                />
            </Stack>
        </SavedMovieProvider>
    )
}
