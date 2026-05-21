import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { View, StyleSheet, SafeAreaView, Pressable, ImageBackground, Text, TextInput, ScrollView, Image } from "react-native";
import { RootParamList } from "../../App";
import { useEffect, useState } from "react";
import React from "react";
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';
import { ALERT_TYPE, AlertNotificationRoot, Dialog, Toast } from 'react-native-alert-notification';
import AsyncStorage from "@react-native-async-storage/async-storage";

type SplashNavigationProps = NativeStackNavigationProp<RootParamList, "AddRecipe">;

export function NewRecipeScreen() {

    const navigator = useNavigation<SplashNavigationProps>();
    const [image, setImage] = useState<string | null>(null);

    const [getCities, setCities] = React.useState<{ id: number, name: string }[]>([]);

    const [getName, setName] = React.useState("");
    const [getPerson, setPerson] = React.useState("");
    const [getCal, setCal] = React.useState("");
    const [getIngrideance, setIngrideance] = React.useState("");
    const [getMethod, setMethod] = React.useState("");
    // UserId සඳහා state විචල්‍යය නිර්මාණය කරන්න
    const [userId, setUserId] = useState<string | null>(null);

    useEffect(() => {
        const getUserId = async () => {
            try {
                const Id = await AsyncStorage.getItem('id');
                console.log(Id)
                setUserId(Id);
            } catch (error) {
                console.log("Something went wrong while getting UserId:", error);
            }
        };

        getUserId();
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
                            <Text style={styles.head1}>Add New Recipe ✿</Text>
                            <Text style={styles.head2}>Welcome! to your Flavor Palette </Text>
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


                                <Text style={styles.label}>Name :</Text>
                                <TextInput placeholder="Insert your full name" style={styles.input}
                                    onChangeText={setName}
                                    value={getName}
                                />

                                <Text style={styles.label}>For how many people :</Text>
                                <TextInput placeholder="Insert your user name" style={styles.input}
                                    onChangeText={setPerson}
                                    value={getPerson}
                                />

                                <Text style={styles.label}>Calorie count :</Text>
                                <TextInput placeholder="Insert your user email" style={styles.input} keyboardType='email-address'
                                    onChangeText={setCal}
                                    value={getCal}
                                />

                                <Text style={styles.label}>Ingredients :</Text>
                                <TextInput placeholder="Insert your user password" style={styles.inputArea}
                                    multiline={true}
                                    onChangeText={setIngrideance}
                                    value={getIngrideance}
                                />

                                <Text style={styles.label}>How to make :</Text>
                                <TextInput placeholder="Insert your user password" style={styles.inputArea}
                                    multiline={true}
                                    onChangeText={setMethod}
                                    value={getMethod}
                                />

                                <Pressable style={styles.signInbutton}>
                                    <Text style={styles.head3} onPress={async () => {
                                        if (!getName ||
                                            !getPerson ||
                                            !getCal ||
                                            !getIngrideance ||
                                            !getMethod ||
                                            !userId || // මෙහිදී නිවැරදි state විචල්‍යය භාවිතා කරන්න
                                            image == null

                                        ) {
                                            Toast.show({
                                                type: ALERT_TYPE.DANGER,
                                                title: 'Warning',
                                                textBody: 'Please fill out all fields.',
                                            });
                                            return;
                                        }
                                        let formData = new FormData();
                                        formData.append("name", getName);
                                        formData.append("person", getPerson);
                                        formData.append("cal", getCal);
                                        formData.append("ingri", getIngrideance);
                                        formData.append("method", getMethod);
                                        formData.append("UserId", userId); // මෙහිදී නිවැරදි state විචල්‍යය භාවිතා කරන්න

                                        console.log(formData);
                                        if (image) {
                                            formData.append("profileImage", {
                                                uri: image,
                                                name: "profile.jpg",
                                                type: "image/jpg"
                                            } as any);
                                        }

                                        // ...
                                        console.log(formData); // Log formData to see its contents before sending

                                        const response = await fetch(
                                            "https://7a71c2478d4d.ngrok-free.app/RecipeApp/AddNewResipe",
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
                                            setName("");
                                            setPerson("");
                                            setCal("");
                                            setIngrideance("");
                                            setMethod("");

                                        } else {
                                            Toast.show({
                                                type: ALERT_TYPE.DANGER,
                                                title: 'Warning',
                                                textBody: 'Warning! something went worng',
                                            });
                                        }
                                    }}> Add Recipe </Text>
                                </Pressable>
                            </View>
                            <Pressable style={styles.backArrow} onPress={() => { navigator.navigate("Home") }}>
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
        inputArea: {
            borderWidth: 1,
            borderColor: "#321f1fff",
            borderRadius: 8,
            padding: 12,
            fontSize: 16,
            backgroundColor: "#ffffff",
            marginBottom: 8,
            height: 150,
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
