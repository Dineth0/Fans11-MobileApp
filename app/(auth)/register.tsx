import { useLoader } from "@/hooks/useLoader"
import { userRegister } from "@/services/authService"
import { useRouter } from "expo-router"
import { useState } from "react"
import { Alert, Keyboard, Pressable, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native"

const Register = () =>{
    const router = useRouter()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [conPassword, setConPassword] = useState("")
    const {showLoader, hideLoader, isLoading} = useLoader()

    const handleRegister = async () =>{
        if (!name || !email || !password || !conPassword || isLoading) {
            Alert.alert("Please fill all fields...!")
            return
        }
        if(password !== conPassword){
            Alert.alert("Password do not Match")
            return
        }
        showLoader()

        try{
            await userRegister(name, email, password, "User")
            Alert.alert("Account Created")
            router.replace("/login")
        }catch(error){
            console.error(error)
            Alert.alert("Field Registration")
        }finally{
            hideLoader()
        }
    }

    return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View className="flex-1 justify-center items-center bg-gray-50 p-6">
                <View className="w-full bg-white/50 backdrop-blur-md rounded-2xl p-8 shadow-lg">
                    <Text className="text-3xl font-bold mb-6 text-center text-gray-900">
                        Register
                    </Text>
                    <TextInput
                        placeholder="name"
                        placeholderTextColor="#6B7280"
                        className="border bg-gray-300 p-3 mb-4 rounded-xl"
                        value={name}
                        onChangeText={setName}
                    />
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
                        secureTextEntry
                    />
                    <TextInput
                        placeholder="confirm password"
                        placeholderTextColor="#6B7280"
                        className="border bg-gray-300 p-3 mb-4 rounded-xl"
                        value={conPassword}
                        onChangeText={setConPassword}
                        secureTextEntry
                    />
                    <Pressable
                        className="bg-blue-600/80 px-6 py-3 rounded-2xl"
                        onPress={handleRegister}
                    >
                        <Text className="text-white text-lg text-center">Register</Text>
                    </Pressable>
                    <View className="flex-row justify-center mt-2">
                        <Text className="text-gray-700">Alrady have an account? </Text>
                        <TouchableOpacity
                        onPress={() => {
                        
                            router.push("/login")
                        
                        }}
                        >
                        <Text className="text-blue-600 font-semibold">Login</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}
export default Register