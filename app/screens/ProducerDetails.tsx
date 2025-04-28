import { ScrollView, View } from "react-native";
import TopBar from "../../components/TopBar";
import { ProducerResponse } from "../../types/ProducerResponse";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../constants/RootStackParams";

type ProducerDetailProps = NativeStackScreenProps<RootStackParamList, "ProducerDetails">;
export default function ProducerDetails({ navigation, route }: ProducerDetailProps) {
    const { producer } = route.params;

    return (
        <View>
            <TopBar title={producer.producerName} showBackButton={true} />
            <ScrollView>
                {/* Your content here */}
            </ScrollView>
        </View>
    );
}