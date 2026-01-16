import { Stack } from "expo-router"
import { AlertNotificationRoot } from "react-native-alert-notification"

const AuthLayout = () =>{
    return(
        <AlertNotificationRoot>
            <Stack
            screenOptions={{
             headerShown: false,
             animation: "slide_from_right"
            }}>

            <Stack.Screen name="login" options={{title: "Login"}}/>    

        </Stack>
        </AlertNotificationRoot>
        
    )
}
export default AuthLayout