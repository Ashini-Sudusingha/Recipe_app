import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { View, StyleSheet, SafeAreaView, Pressable, ImageBackground, Text, TextInput, KeyboardAvoidingView } from "react-native";
import { RootParamList } from "../../App";
import React from "react";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";
import AsyncStorage from "@react-native-async-storage/async-storage";

type SplashNavigationProps = NativeStackNavigationProp<RootParamList, "SignIn">;

export function SignInScreen() {

    const navigator = useNavigation<SplashNavigationProps>();
    const [getPassword, setPassword] = React.useState("");
    const [getEmail, setEmail] = React.useState("");
    return (
        <KeyboardAvoidingView style={styles.block1} >
            <ImageBackground
                source={require("../assets/images/back1.jpg")}
                style={styles.background}
            >
                <View style={styles.block2}>
                    <Text style={styles.head1}>Sign In</Text>
                    <Text style={styles.head2}>Welcome! to your Flavor Palette account</Text>
                    <View style={styles.formContainer}>
                        <Text style={styles.label}>Email :</Text>
                        <TextInput placeholder="Insert your user email" style={styles.input} keyboardType='email-address'
                            onChangeText={setEmail}
                            value={getEmail}
                        />

                        <Text style={styles.label}>Password :</Text>
                        <TextInput placeholder="Insert your user password" style={styles.input} secureTextEntry
                            onChangeText={setPassword}
                            value={getPassword}
                        />

                        <Pressable style={styles.signInbutton}>
                            <Text style={styles.head3} onPress={async () => {
                                if (
                                    !getEmail ||
                                    !getPassword
                                    == null
                                ) {
                                    Toast.show({
                                        type: ALERT_TYPE.DANGER,
                                        title: 'Warning',
                                        textBody: 'Congrats! this is toast notification success',
                                    });
                                    return;
                                }
                                const signIn = {
                                    email: getEmail,
                                    password: getPassword
                                };

                                const signInJson = JSON.stringify(signIn);
                                console.log(signInJson);

                                const response = await fetch(
                                    "https://7a71c2478d4d.ngrok-free.app/RecipeApp/SignIn",
                                    {
                                        method: "POST",
                                        body: signInJson,
                                        headers: {
                                            "Content-Type": "miltipart/formdata",
                                        },
                                    }
                                );
                                if (response.ok) {
                                    Toast.show({
                                        type: ALERT_TYPE.SUCCESS,
                                        title: 'Success',
                                        textBody: 'Congrats! signIn successfuly',
                                    });

                                    setEmail("");
                                    setPassword("");
                                    try {
                                        await AsyncStorage.setItem('email', getEmail);
                                    } catch (e) {
                                        // saving error
                                    }
                                    navigator.navigate("Home")
                                } else {
                                    Toast.show({
                                        type: ALERT_TYPE.DANGER,
                                        title: 'Warning',
                                        textBody: 'Warning! something went worng',
                                    });
                                }
                            }}> Sign In </Text>
                        </Pressable>

                        <Pressable style={styles.signupbutton} onPress={() => { navigator.navigate("SignUp") }}>
                            <Text style={styles.head4}> New user? Sign up </Text>
                        </Pressable>

                    </View>
                    <Pressable style={styles.backArrow} onPress={() => { navigator.navigate("Splash") }}>
                        <Text style={styles.head5}>〈  </Text>
                    </Pressable>
                </View>
            </ImageBackground>

        </KeyboardAvoidingView>

    );
}

const styles = StyleSheet.create(
    {
        View1: {


        },
        background: {
            flex: 1,
            resizeMode: 'cover',
            justifyContent: 'center',
            alignItems: 'center',
        },
        block1: {
            flex: 1,
        },
        block2: {
            width: 350,
            height: 600,
            backgroundColor: "#ffffff",
            marginTop: 150,
            borderRadius: 50,
        },
        head1: {
            fontSize: 35,
            marginLeft: 35,
            marginTop: 35,
        },
        head2: {
            fontSize: 15,
            marginLeft: 35,
            marginTop: 5,
        },
        label: {
            fontSize: 16,
            fontWeight: "thin",
            color: "#666",
            marginBottom: 8,
            marginTop: 8,
        },
        input: {
            borderWidth: 1,
            borderColor: "#321f1fff",
            borderRadius: 8,
            padding: 12,
            fontSize: 16,
            backgroundColor: "#ffffff",
            marginBottom: 8,
        },
        formContainer: {
            paddingHorizontal: 30,
            marginTop: 20,
        },
        signInbutton: {
            marginTop: 30,
            marginHorizontal: "auto",
            width: 200,
            height: 45,
            backgroundColor: "#ec9215ff",
            borderRadius: 20,
            justifyContent: "center",
            alignItems: "center",
        },
        head3: {
            fontSize: 17,
            fontWeight: "bold"
        },
        signupbutton: {
            marginTop: 10,
            marginHorizontal: "auto",
            width: 200,
            height: 45,
            borderWidth: 4,
            borderColor: "#ec9215ff",
            borderRadius: 50,
            justifyContent: "center",
            alignItems: "center",

        },
        head4: {
            fontWeight: "light",
        },
        head5: {
            fontWeight: "bold",
            fontSize: 19,
        },
        backArrow: {
            marginTop: 80,
            marginHorizontal: "auto",
            width: 45,
            height: 45,
            backgroundColor: "#f9f9f9ff",
            borderWidth: 2,
            borderRadius: 100,
            justifyContent: "center",
            alignItems: "center",
            marginRight: 60,
        }
    }
);