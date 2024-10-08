import { router } from "expo-router";
import { FlatList, View } from "react-native";

import DriverCard from "@/components/DriverCard";
import RideLayout from "@/components/RideLayout";
import { useDriverStore } from "@/store";
import CustomButtom from "@/components/CustomButtom";

const ConfirmRide = () => {
  const { drivers, selectedDriver, setSelectedDriver } = useDriverStore();

  return (
    <RideLayout title={"Choose a Rider"} snapPoints={["65%", "90%"]}>
      <FlatList
        data={drivers}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <DriverCard
            item={item}
            selected={selectedDriver!}
            setSelected={() => setSelectedDriver(+item.id!)}
          />
        )}
        ListFooterComponent={() => (
          <View className="mx-5 mt-10">
            <CustomButtom
              title="Select Ride"
              onPress={() => router.push("/(root)/bookride")}
			  className="py-2"
			  textColor="text-white"
            />
          </View>
        )}
      />
    </RideLayout>
  );
};

export default ConfirmRide;