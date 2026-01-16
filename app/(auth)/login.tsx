import { useLoader } from "@/hooks/useLoader"
import { getUserData, login } from "@/services/authService"
import { useRouter } from "expo-router"
import { useState } from "react"
import { Keyboard, Pressable, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native"
import { ALERT_TYPE, Toast } from "react-native-alert-notification"


const Login = () =>{
    const router = useRouter()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { showLoader, hideLoader, isLoading } = useLoader()

    const handleLogin = async () =>{
        if (!email || !password || isLoading) {
            Toast.show({
                type: ALERT_TYPE.WARNING,
                title: 'Warning',
                textBody: 'Please fill all fields...!',
                autoClose: 3000,
            })
            return
        }
        showLoader()

        try{
            const userCredential = await login(email, password);
            const user = userCredential.user;

            const userData = await getUserData(user.uid) 

            if (userData) {
                Toast.show({
                    type: ALERT_TYPE.SUCCESS,
                    title: 'Success',
                    textBody: `Welcome back, ${userData.name}`,
                });

                if (userData.role === "Admin") {
                    router.replace("/(admin)/dashboard");
                } else {
                    router.replace("/(home)/home"); 
                }
            } else {
                throw new Error("User data not found");
            }
        }catch(error){
            console.error(error)
            Toast.show({
                type: ALERT_TYPE.DANGER,
                title: 'Error',
                textBody: 'Login Faild..!',
                autoClose: 3000,
            })
        }finally{
            hideLoader()
        }
    }
    return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View className="flex-1 justify-center items-center bg-gray-50 p-6">
                <View className="w-full bg-white/50 backdrop-blur-md rounded-2xl p-8 shadow-lg">
                    <Text className="text-3xl font-bold mb-6 text-center text-gray-900">
                        Login
                    </Text>
                    <TextInput 
                        placeholder="email" 
                        placeholderTextColor="#6B7280"
                        className="border bg-gray-300 p-3 mb-4 rounded-xl"
                        value={email}
                        onChangeText={setEmail}
                    />
                    <TextInput
                        placeholder="password"
                        placeholderTextColor="#6B7280"
                        className="border bg-gray-300 p-3 mb-4 rounded-xl"
                        value={password}
                        onChangeText={setPassword}
                    />
                    <Pressable
                        className="bg-blue-600/80 px-6 py-3 rounded-2xl"
                        onPress={handleLogin}
                    >
                        <Text className="text-white text-lg text-center">Login</Text>
                    </Pressable>

                    <View className="flex-row justify-center mt-2">
                        <Text className="text-gray-700">Do not have an account? </Text>
                        <TouchableOpacity
                        onPress={() => {
                            router.push("/register")
                        }}
                        >
                        <Text className="text-blue-600 font-semibold">Register</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}
export default Login