import React, {useState} from 'react'
import {View, Text, TextInput, Pressable, Alert, Image, StatusBar} from "react-native";
import {useRouter} from "expo-router";
import {login} from "@/services/appwrite";
import {icons} from "@/constants/icons";

export default function Login() {

    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        if (!email || !password) {
            return Alert.alert("Missing Fields", "Please enter email and password"); //?
        }

        try {
            setLoading(true);
            await login(email, password);
            router.replace("/") // ?
        } catch (err: any) {
            Alert.alert("Login failed", err.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    }

    return (
        <View className="flex-1 bg-[#0F0D23] px-6 justify-center items-center">
            <StatusBar barStyle="light-content" backgroundColor="#0F0D23"/>

            <Image source={icons.logo} className="w-12 h-10 mb-8"/>

            <Text className="text-white text-2xl font-bold mb-6">Welcome back</Text>

            <TextInput
                placeholder="Email"
                placeholderTextColor="#A0A0A0"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
                className="bg-white/10 text-white w-full p-4 rounded-xl mb-6 border border-white/20"
            />
            <TextInput
                placeholder="Password"
                placeholderTextColor="#A0A0A0"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                className="bg-white/10 text-white w-full p-4 rounded-xl mb-6 border border-white/20"
            />

            <Pressable
                onPress={handleLogin}
                disabled={loading} //?
                className="bg-[#FF6B6B] w-full py-4 rounded-xl mb-6 border border-white/20"
            >
                <Text className="text-white font-semibold text-base text-center">
                    {loading ? 'Signing in...' : 'Sign in'}
                </Text>
            </Pressable>

            <Pressable onPress={
                () => console.log("Button is pressed") //why when we console.log we have to use a callback
            }>
                <Text className="text-white text-sm">
                    Don't have an account? <Text className="text-[#4ECCA3] font-bold">Register</Text>
                </Text>
            </Pressable>
        </View>
    );
}