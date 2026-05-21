import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Button, ImageBackground, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define the types for navigation and parameters
type RootParamList = {
    Home: undefined;
    AddRecipe: undefined;
    Profile: { userId: number; name: string };
};
type HomeNavigationPops = NativeStackNavigationProp<RootParamList, "Home">;

// HomeScreen component should not be 'async'
export function HomeScreen() {
    const navigator = useNavigation<HomeNavigationPops>();

    // Use a single state object to manage all user data
    const [userData, setUserData] = useState({
        email: "",
        username: "",
        image: "",
        userId: "",
        products: []
    });

    // States for managing UI loading and errors
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // useEffect hook for data fetching
    useEffect(() => {
        const loadUserData = async () => {
            try {
                // Get email from AsyncStorage
                const userEmail = await AsyncStorage.getItem('email');

                // If email exists, proceed with the API call
                if (userEmail !== null) {
                    console.log("Fetching user data for:", userEmail);
                    const response = await fetch("https://7a71c2478d4d.ngrok-free.app/RecipeApp/LoadUserData?userId=" + userEmail);

                    if (response.ok) {
                        const json = await response.json();
                        if (json.status) {
                            console.log("Successfully loaded data:", json);
                            setUserData({
                                email: json.email || "",
                                username: json.username || "",
                                image: json.image || "",
                                userId: json.userId || "",
                                products: json.product || [] // Ensure products is always an array

                            });
                            await AsyncStorage.setItem('id', String(json.userId));

                        } else {
                            console.log("API returned an error:", json.message);
                            setError(json.message || "An unknown error occurred.");
                        }
                    } else {
                        console.log("User data loading error. Status:", response.status);
                        setError(`User data loading error. Status: ${response.status}`);
                    }
                } else {
                    // Handle case where no email is found in AsyncStorage
                    console.log("No user email found in AsyncStorage.");
                    setError("No user email found. Please login.");
                }
            } catch (e) {
                console.error("Error during data fetching:", e);
                setError("Network error. Please try again.");
            } finally {
                // Set loading to false regardless of success or failure
                setIsLoading(false);
            }
        };

        loadUserData();
    }, []); // Empty dependency array ensures this runs only once on mount

    // Conditional rendering based on loading state
    if (isLoading) {
        return (
            <View style={styles.centerContainer}>
                <Text style={styles.loadingText}>Loading user data...</Text>
            </View>
        );
    }

    // Conditional rendering based on error state
    if (error) {
        return (
            <View style={styles.centerContainer}>
                <Text style={styles.errorText}>Error: {error}</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.View1}>
            <View style={styles.block1}>
                <ImageBackground
                    source={require("../assets/images/back1.jpg")}
                    style={styles.background}
                >
                    <View style={styles.profileCard}>
                        {/* Profile Image */}
                        <Image
                            source={{ uri: userData.image }}

                            style={styles.imagePlaceholder}
                        />

                        {/* User Details */}
                        <View style={styles.textContainer}>
                            <Text style={styles.name}>{userData.username}</Text>
                            <Text style={styles.email}>{userData.email}</Text>
                        </View>
                    </View>
                </ImageBackground>
            </View>

            <Pressable style={styles.addrecipe}>
                <Text style={styles.head4} onPress={() => navigator.navigate("AddRecipe")}> Add Your new Recipe ✿</Text>
            </Pressable>

            {/* Display list of recipes from API */}
            <View style={styles.recipesList}>
                console.log()
                {userData.products && userData.products.length > 0 ? (
                    userData.products.map((item: any, index: number) => (
                        <View key={index} style={styles.card}>
                            <View style={styles.header}>

                                <Image
                                    source={{ uri: `https://7a71c2478d4d.ngrok-free.app/RecipeApp/recipe_image/${item.image_parth}` }}

                                    style={styles.imagePlaceholder}
                                />
                                <View style={styles.textContainer1}>
                                    <Text style={styles.recipeName}>{item.name}</Text>
                                    <View style={styles.detailsRow}>
                                        <Text style={styles.detailText}>Person: {item.personCount}</Text>
                                        <Text style={styles.detailText}>cal: {item.cal}</Text>
                                    </View>
                                    <Text style={styles.ingredientText}>Ingrediance: {item.ingredients}</Text>
                                </View>
                            </View>
                            <View style={styles.recipeBox}>
                                <Text style={styles.recipeLabel}>Recipe:</Text>
                                <Text>{item.method}</Text>
                            </View>
                        </View>
                    ))
                ) : (
                    <Text style={styles.noRecipesText}>No recipes added yet.</Text>
                )}
            </View>

            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", marginTop: 20, marginBottom: 50 }}>

                <Pressable style={styles.addrecipe}>
                    <Text style={styles.head4} onPress={() => navigator.goBack()} > Back ✿</Text>
                </Pressable>

            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    View1: {
        backgroundColor: "#ffffff",
    },
    blockContainer: {
        width: 412,
        alignItems: "center",
        justifyContent: "center",
    },
    background: {
        width: 412,
        height: 200,
        resizeMode: 'cover',
        justifyContent: 'center',
        alignItems: 'center',
    },
    block1: {
        flex: 1,
    },
    profileCard: {
        flexDirection: 'row',
        width: 360,
        height: 120,
        marginTop: 20,
        marginHorizontal: "auto",
        backgroundColor: "#ffffffff",
        borderRadius: 5,
    },
    imageContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 2,
        borderColor: '#ccc',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 20,
        overflow: 'hidden',
        marginTop: 20,
        marginLeft: 10,
    },
    profileImage: {
        width: '100%',
        height: '100%',
        backgroundColor: '#e0e0e0', // Placeholder color
    },
    textContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    email: {
        fontSize: 16,
        color: '#777',
    },
    addrecipe: {
        marginTop: 30,
        marginHorizontal: "auto",
        width: 300,
        height: 45,
        backgroundColor: "#ec9215ff",
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    head4: {
        fontSize: 17,
        fontWeight: "bold",
        color: "white",
    },

    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        fontSize: 18,
        color: '#555',
    },
    errorText: {
        color: 'red',
        fontSize: 18,
        textAlign: 'center',
        marginHorizontal: 20,
    },
    recipesList: {
        flex: 1,
        padding: 20,
    },
    card: {
        width: '100%',
        maxWidth: 600,
        borderWidth: 2,
        borderColor: '#100f05ff',
        padding: 15,
        borderRadius: 10,
        marginBottom: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 20,
    },
    imagePlaceholder: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#4169E1',
        marginRight: 20,
    },
    textContainer1: {
        flex: 1,
    },
    recipeName: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    detailsRow: {
        flexDirection: 'row',
        marginBottom: 5,
    },
    detailText: {
        fontSize: 16,
        marginRight: 20,
    },
    ingredientText: {
        fontSize: 16,
        color: '#555',
    },
    recipeBox: {
        borderWidth: 1,
        borderColor: 'black',
        padding: 10,

        borderRadius: 5,
    },
    recipeLabel: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    noRecipesText: {
        textAlign: 'center',
        marginTop: 50,
        fontSize: 18,
        color: '#888',
    }
});
