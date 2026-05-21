import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Button, View, StyleSheet, SafeAreaView, Image, Pressable, Text } from "react-native";
import { RootParamList } from "../../App";
import { HomeScreen } from "./Home";

type SplashNavigationProps = NativeStackNavigationProp<RootParamList, "Splash">;

export function SplashScreen() {

    const navigator = useNavigation<SplashNavigationProps>();
    return (
        <SafeAreaView style={styles.container}>
            <View>

                <Image
                    source={require("../assets/images/Kitchen.png")}
                    style={styles.icon}
                />
                <Text style={styles.head1} >Welcom ! to Flavor Palette</Text>
              
                <Pressable style={styles.homebutton}>
                    <Text style={styles.head4} onPress={() => { navigator.navigate("Home") }}>Home</Text>
                </Pressable>
                <Pressable style={styles.signInbutton}>
                    <Text style={styles.head4} onPress={() => { navigator.navigate("SignIn") }} >Sign In</Text>
                </Pressable>

            </View>
 
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        width: 250,
        height: 190,
        marginBottom: 10,
        marginHorizontal: "auto",
    },
    head1: {
        fontSize: 26,
        marginTop: 15,
        fontWeight: "bold",
        marginHorizontal: "auto",
        fontFamily: 'Inter'
    },
   signInbutton: {
            marginTop: 20,
            marginHorizontal: "auto",
            width: 200,
            height: 45,
            backgroundColor: "#ec9215ff",
            borderRadius: 20,
            justifyContent: "center",
            alignItems: "center",
        },
        homebutton:{
            marginTop: 30,
            marginHorizontal: "auto",
            width: 200,
            height: 45,
           borderWidth: 4,
            borderColor: "#ec9215ff",
            borderRadius: 20,
            justifyContent: "center",
            alignItems: "center",
        },
        head4: {
            fontWeight: "light",
        },
});