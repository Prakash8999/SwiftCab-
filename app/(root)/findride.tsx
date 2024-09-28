import { View, Text } from 'react-native'
import React from 'react'
import { useLocationStore } from '@/store'
import { SafeAreaView } from 'react-native-safe-area-context'
import RideLayout from '@/components/RideLayout'
import GoogleTextInput from '@/components/GoogleTextInputAnother'
import { icons } from '@/constants'
import CustomButtom from '@/components/CustomButtom'
import { router } from 'expo-router'

const FindRide = () => {
	const { userAddress, destinationAddress, setDestinationLocation, setUserLocation } = useLocationStore()
	return (
		<RideLayout title='Ride'>
			<View className='my-3'>
				<Text className='text-lg font-PoppinsBold mb-3'>
					From
				</Text>
				<GoogleTextInput
					icon={icons.target} initialLocation={userAddress!}
					containerStyle='bg-neutral-100'
					textInputBackgroundColor='#f5f5f5'
					handlePress={(location) => setUserLocation(location)}
				/>
			</View>
			<View className=''>
				<Text className='text-lg font-PoppinsBold mb-3'>
					To
				</Text>
				<GoogleTextInput
					icon={icons.map} initialLocation={destinationAddress!}
					containerStyle='bg-neutral-100'
					textInputBackgroundColor='transparent'
					handlePress={(location) => setDestinationLocation(location)}
				/>
			</View>
			<CustomButtom 
			onPress={() => router.push('/(root)/confirm-ride')}
			className='mt-5 py-2'
			textColor='text-white'
			title='Find now'
			
			/>
		</RideLayout>
	)
}

export default FindRide