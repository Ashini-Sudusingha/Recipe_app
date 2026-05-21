import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { View, StyleSheet, SafeAreaView, Pressable, ImageBackground, Text, TextInput, ScrollView, Image } from "react-native";
import { RootParamList } from "../../App";
import { useEffect, useState } from "react";
import React from "react";
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';
import { ALERT_TYPE, AlertNotificationRoot, Dialog, Toast } from 'react-native-alert-notification';

type SplashNavigationProps = NativeStackNavigationProp<RootParamList, "SignUp">;

export function SignUpScreen() {

    const navigator = useNavigation<SplashNavigationProps>();
    const [image, setImage] = useState<string | null>(null);
    const [selectedCity, setSelectedCity] = useState('');

    const [getCities, setCities] = React.useState<{ id: number, name: string }[]>([]);

    const [getFullName, setFullName] = React.useState("");
    const [getUserName, setUserName] = React.useState("");
    const [getEmail, setEmail] = React.useState("");
    const [getPassword, setPassowrd] = React.useState("");
    const [getConfirmPassword, setConfirmPassowrd] = React.useState("");

    useEffect(() => {
        const loadCities = async () => {
            const response = await fetch("https://7a71c2478d4d.ngrok-free.app/RecipeApp/Cities");
            if (response.ok) {
                const json = await response.json();
                setCities(json);
                console.log(json);
            } else {
                console.log("city data loading error");
            }
        };
        loadCities();
    }, []);


    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images', 'videos'],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };
    return (
        <AlertNotificationRoot>
            <View style={styles.block1} >

                <ImageBackground
                    source={require("../assets/images/back1.jpg")}
                    style={styles.background}
                >

                    <View style={styles.block2}>
                        <ScrollView>
                            <Text style={styles.head1}>Sign Up</Text>
                            <Text style={styles.head2}>Welcome! to your Flavor Palette account</Text>
                            <View style={styles.formContainer}>

                                <View style={styles.imageContainer}>
                                    <Pressable onPress={pickImage} style={styles.imageUploader}>
                                        {image ? (
                                            <Image source={{ uri: image }} style={styles.profileImages} />
                                        ) : (
                                            <View style={styles.imagePlaceholder}>
                                                <Text style={styles.imageText} >+</Text>
                                                <Text style={styles.imageLable}>Add Image</Text>
                                            </View>
                                        )}
                                    </Pressable>
                                </View>


                                <Text style={styles.label}>Full Name :</Text>
                                <TextInput placeholder="Insert your full name" style={styles.input}
                                    onChangeText={setFullName}
                                    value={getFullName}
                                />

                                <Text style={styles.label}>User Name :</Text>
                                <TextInput placeholder="Insert your user name" style={styles.input}
                                    onChangeText={setUserName}
                                    value={getUserName}
                                />

                                <Text style={styles.label}>Email :</Text>
                                <TextInput placeholder="Insert your user email" style={styles.input} keyboardType='email-address'
                                    onChangeText={setEmail}
                                    value={getEmail}
                                />

                                <Text style={styles.label}>Password :</Text>
                                <TextInput placeholder="Insert your user password" style={styles.input} secureTextEntry
                                    onChangeText={setPassowrd}
                                    value={getPassword}
                                />

                                <Text style={styles.label}>Comfirm Password :</Text>
                                <TextInput placeholder="Comfirm your password" style={styles.input} secureTextEntry
                                    onChangeText={setConfirmPassowrd}
                                    value={getConfirmPassword}
                                />

                                <View style={styles.inputContainer}>
                                    <Text style={styles.label}>City</Text>
                                    <View style={styles.pickerContainer}>
                                        <Picker
                                            selectedValue={selectedCity}
                                            style={styles.picker}
                                            onValueChange={(itemValue) => setSelectedCity(itemValue)}>
                                            <Picker.Item label='Select your city' value={''} />
                                            {getCities.map((city) => (
                                                <Picker.Item key={city.id} label={city.name} value={city.id} />
                                            ))}

                                        </Picker>
                                    </View>
                                </View>

                                <Pressable style={styles.signInbutton}>
                                    <Text style={styles.head3} onPress={async () => {
                                        if (!getFullName ||
                                            !getUserName ||
                                            !getEmail ||
                                            !getPassword ||
                                            !getConfirmPassword ||
                                            image == null ||
                                            !selectedCity

                                        ) {
                                            Toast.show({
                                                type: ALERT_TYPE.DANGER,
                                                title: 'Warning',
                                                textBody: 'Congrats! this is toast notification success',
                                            });
                                            return;
                                        }
                                        let formData = new FormData();
                                        formData.append("fullName", getFullName);
                                        formData.append("userName", getUserName);
                                        formData.append("email", getEmail);
                                        formData.append("confirmpassword", getConfirmPassword);
                                        formData.append("password", getPassword);
                                        formData.append("city", selectedCity);

                                      console.log(formData);
                                        if (image) {
                                            formData.append("profileImage", {
                                                uri: image,
                                                name: "profile.jpg",
                                                type: "image/jpg"
                                            } as any);
                                        }
                                        // ... and other formData.append calls
                                        console.log(formData);

                                        const response = await fetch(
                                            "https://7a71c2478d4d.ngrok-free.app/RecipeApp/NewAccount",
                                            {
                                                method: "POST",
                                                body: formData,

                                            }
                                        );
                                        if (response.ok) {
                                            Toast.show({
                                                type: ALERT_TYPE.SUCCESS,
                                                title: 'Success',
                                                textBody: 'Congrats! Account create successfully',
                                            });
                                            setFullName("");
                                            setUserName("");
                                            setEmail("");
                                            setPassowrd("");
                                            setConfirmPassowrd("");
                                            setSelectedCity("");
                                        } else {
                                            Toast.show({
                                                type: ALERT_TYPE.DANGER,
                                                title: 'Warning',
                                                textBody: 'Warning! something went worng',
                                            });
                                        }
                                    }}> Sign Up </Text>
                                </Pressable>

                                <Pressable style={styles.signupbutton}>
                                    <Text style={styles.head4} onPress={() => { navigator.navigate("SignIn") }}> Have account? Sign In </Text>
                                </Pressable>

                            </View>
                            <Pressable style={styles.backArrow} onPress={() => { navigator.navigate("Splash") }}>
                                <Text style={styles.head5}>〈  </Text>
                            </Pressable>
                        </ScrollView>

                    </View>

                </ImageBackground>

            </View >
        </AlertNotificationRoot>
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
        imageContainer: {
            alignItems: "center",
            marginBottom: 30,
        },
        pickerContainer: {
            borderWidth: 1,
            borderColor: "#dddddd",
            borderRadius: 8,
            backgroundColor: "#ffffff",
        },
        picker: {
            height: 50,
        },
        imageUploader: {
            width: 120,
            height: 120,
            borderRadius: 60,
            backgroundColor: "#f0f0f0",
            justifyContent: "center",
            alignItems: "center",
            borderWidth: 2,
            borderColor: "#dddddd",
            borderStyle: "dashed",
        },
        profileImages: {
            width: 120,
            height: 120,
            borderRadius: 60,
        },
        imagePlaceholder: {
            alignItems: "center",
        },
        imageText: {
            fontSize: 36,
            color: "#bbb7b7ff",
            marginBottom: 5,
        },
        imageLable: {
            fontSize: 14,
            color: "#999999"
        },
        block1: {
            flex: 1,
        },
        block2: {
            width: 350,
            height: 770,
            backgroundColor: "#ffffff",

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
            marginTop: 30,
            marginHorizontal: "auto",
            width: 45,
            height: 45,
            backgroundColor: "#f9f9f9ff",
            borderWidth: 2,
            borderRadius: 100,
            justifyContent: "center",
            alignItems: "center",
            marginRight: 60,
        },
        inputContainer: {
            marginBottom: 20,
        },
    },

);