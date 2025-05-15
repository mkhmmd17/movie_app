import { Text, View, Image, Button} from "react-native";
import {useRouter} from "expo-router";
import React from "react";
import {icons} from "@/constants/icons";
import {logout} from "@/services/appwrite";

const Profile = () => {

    const router = useRouter();

    const handleLogout = async () => {
        try {
            await logout();
            router.replace("/(auth)/login");
            console.log("Logout");
        } catch (err) {
            console.log(err);
        }

    }

    return (
        <View className="flex-1 justify-center items-center">
            <Button title="Logout" onPress={handleLogout} />
        </View>
    )
}

export default Profile