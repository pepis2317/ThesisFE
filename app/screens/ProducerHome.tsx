import { ScrollView , Text, Button} from "react-native";
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import { useAuth } from "../context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../constants/RootStackParams";

export default function ProducerHome() {
    const {authState, onLogout} = useAuth()
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    return (
        <ScrollView>
            <Text>This is home page for producer</Text>
            <Button onPress={onLogout} title="logout" />
            <Button onPress={() => navigation.navigate("Profile")} title="go to profile page" />
        </ScrollView>

    )
}