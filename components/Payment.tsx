import { useAuth } from "@clerk/clerk-expo";
import { useStripe } from "@stripe/stripe-react-native";
import { router } from "expo-router";
import React, { useState } from "react";
import { Alert, Image, Text, View } from "react-native";
import { ReactNativeModal } from "react-native-modal";

// import CustomButton from "@/components/CustomButton";
import { images } from "@/constants";
import { fetchAPI } from "@/lib/fetch";
import { useLocationStore } from "@/store";
import { PaymentProps } from "@/types/type";
import CustomButtom from "./CustomButtom";

const Payment = ({
  fullName,
  email,
  amount,
  driverId,
  rideTime,
}: PaymentProps) => {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const {
    userAddress,
    userLongitude,
    userLatitude,
    destinationLatitude,
    destinationAddress,
    destinationLongitude,
  } = useLocationStore();

  const { userId } = useAuth();
  const [success, setSuccess] = useState<boolean>(false);

  const openPaymentSheet = async () => {
const resul=    await initializePaymentSheet();


    const { error } = await presentPaymentSheet();

    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      setSuccess(true);
    }
  };

  const initializePaymentSheet = async () => {
    const { error } = await initPaymentSheet({
      merchantDisplayName: "Example, Inc.",
      intentConfiguration: {
        mode: {
          amount: parseInt(amount) * 100,
          currencyCode: "usd",
        },
        confirmHandler: async (
          paymentMethod,
          shouldSavePaymentMethod,
          intentCreationCallback,
        ) => {
          const { paymentIntent, customer } = await fetchAPI(
            "http://192.168.0.103:3000/api/v1/stripe/create-intent",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              data:{
                name: fullName || email.split("@")[0],
                email: email,
                amount: amount,
                paymentMethodId: paymentMethod.id,
              },
            },
          );

          if (paymentIntent.client_secret) {
            const { result } = await fetchAPI("http://192.168.0.103:3000/api/v1/stripe/confirm-pay", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              data:{
                payment_method_id: paymentMethod.id,
                payment_intent_id: paymentIntent.id,
                customer_id: customer,
                client_secret: paymentIntent.client_secret,
              },
            });

            if (result.client_secret) {
              await fetchAPI("http://192.168.0.103:3000//api/v1/ride/insert", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                data:{
                  origin_address: userAddress,
                  destination_address: destinationAddress,
                  origin_latitude: userLatitude,
                  origin_longitude: userLongitude,
                  destination_latitude: destinationLatitude,
                  destination_longitude: destinationLongitude,
                  ride_time: rideTime.toFixed(0),
                  fare_price: parseInt(amount) * 100,
                  payment_status: "paid",
                  driver_id: driverId,
                  user_id: userId,
                },
              });

              intentCreationCallback({
                clientSecret: result.client_secret,
              });
            }
          }
        },
      },
      returnURL: "myapp://book-ride",
    });

    if (!error) {
      // setLoading(true);
    }
  };

  return (
    <>
      <CustomButtom
        title="Confirm Ride"
        className="my-1 py-2"
        textColor="text-white"
        onPress={openPaymentSheet}
      />

      <ReactNativeModal
        isVisible={success}
        onBackdropPress={() => setSuccess(false)}
      >
        <View className="flex flex-col items-center justify-center bg-white p-7 rounded-2xl">
          <Image source={images.check} className="w-28 h-28 mt-5" />

          <Text className="text-2xl text-center font-JakartaBold mt-5">
            Booking placed successfully
          </Text>

          <Text className="text-md text-general-200 font-JakartaRegular text-center mt-3">
            Thank you for your booking. Your reservation has been successfully
            placed. Please proceed with your trip.
          </Text>

          <CustomButtom
            title="Back Home"
            onPress={() => {
              setSuccess(false);
              router.push("/(root)/(tabs)/home");
            }}
            className="mt-5"
          />
        </View>
      </ReactNativeModal>
    </>
  );
};

export default Payment;