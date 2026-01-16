import { useLoader } from "@/hooks/useLoader"
import { userRegister } from "@/services/authService"
import { useRouter } from "expo-router"
import { useState } from "react"
import { ImageBackground, Keyboard, Pressable, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native"
import { ALERT_TYPE, Toast } from 'react-native-alert-notification'

const Register = () =>{
    const router = useRouter()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [conPassword, setConPassword] = useState("")
    const {showLoader, hideLoader, isLoading} = useLoader()

    const handleRegister = async () =>{
        if (!name || !email || !password || !conPassword || isLoading) {
            Toast.show({
                type: ALERT_TYPE.WARNING,
                title: 'Warning',
                textBody: 'Please fill all fields...!',
                autoClose: 3000,
            })
            return
        }
        if(password !== conPassword){
            Toast.show({
                type: ALERT_TYPE.DANGER,
                title: 'Error',
                textBody: 'do not match password',
                autoClose: 3000,
            })
            return
        }
        showLoader()

        try{
            await userRegister(name, email, password, "User")
            Toast.show({
                type: ALERT_TYPE.SUCCESS,
                title: 'Success',
                textBody: 'Account created..!',
                autoClose: 3000,
            })
            router.replace("/login")
        }catch(error){
            console.error(error)
            Toast.show({
                type: ALERT_TYPE.DANGER,
                title: 'Error',
                textBody: 'Register fail..!',
                autoClose: 3000,
            })
        }finally{
            hideLoader()
        }
    }

    return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <ImageBackground
             source={require("../../assets/images/wellcomeScreen.png")}
             className="flex-1"
            resizeMode="cover">
                <View className="flex-1 justify-center items-center bg-black/40 p-6">
                <View className="w-full bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20">
                    <Text className="text-4xl font-extrabold mb-2 text-center text-white">
                        Join FANS11
                    </Text>
                    <Text className="text-gray-200 text-center mb-8">
                            Create an account to start playing
                    </Text>
                    <TextInput
                        placeholder="name"
                        placeholderTextColor="#6B7280"
                        className="bg-white/20 p-4 mb-4 rounded-2xl text-white border border-white/10"
                        value={name}
                        onChangeText={setName}
                    />
                    <TextInput
                        placeholder="email"
                        placeholderTextColor="#6B7280"
                        className="bg-white/20 p-4 mb-4 rounded-2xl text-white border border-white/10"
                        value={email}
                        onChangeText={setEmail}
                    />
                    <TextInput
                        placeholder="password"
                        placeholderTextColor="#6B7280"
                        className="bg-white/20 p-4 mb-4 rounded-2xl text-white border border-white/10"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />
                    <TextInput
                        placeholder="confirm password"
                        placeholderTextColor="#6B7280"
                        className="bg-white/20 p-4 mb-4 rounded-2xl text-white border border-white/10"
                        value={conPassword}
                        onChangeText={setConPassword}
                        secureTextEntry
                    />
                    <Pressable
                        className="bg-blue-600 py-4 rounded-2xl active:bg-blue-700 shadow-lg"
                        onPress={handleRegister}
                    >
                        <Text className="text-white text-xl font-bold text-center">Register</Text>
                    </Pressable>
                    <View className="flex-row justify-center mt-6">
                        <Text className="text-gray-300">Alrady have an account? </Text>
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
            </ImageBackground>
            
        </TouchableWithoutFeedback>
    )
}
export default Register