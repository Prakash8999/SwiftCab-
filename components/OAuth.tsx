import { View, Text, Image, TouchableOpacity, Alert } from 'react-native'
import React, { useCallback } from 'react'
import CustomButtom from './CustomButtom'
import { icons } from '@/constants'
import { useOAuth } from '@clerk/clerk-expo'
import { googleOAuth } from '@/lib/auth'
import { router } from 'expo-router'

const OAuth = () => {
const {startOAuthFlow} = useOAuth({strategy:"oauth_google"})


	
	const handleGoogleSignin = useCallback( async() => {
		try {
			const result = await googleOAuth(startOAuthFlow)
			if(result.code ==='session_exists' || result.code==='success'){
				router.push("/(root)/(tabs)/home")

			}
		} catch (error) {
			console.log(error);
			
		}	
		},[]
	)
	return (

		<View>
			<View className='flex flex-row justify-center items-center mt-4 gap-x-4'>
				<View className='flex-1 h-[1px] bg-general-100' />
				<Text>
					Or
				</Text>
				<View className='flex-1 h-[1px] bg-general-100' />

			</View>
			<CustomButtom title='Login  Google' textColor='text-black' classname='mt-5 w-full shadow-none py-2' IconLeft={() => <Image
				source={icons.google}
				resizeMode='contain'
				className='w-5 h-5 mx-2'
				
			/>

			}
				bgVariant='outline'
				textVariant='primary'
				onPress={handleGoogleSignin}
			/>

			{/* <TouchableOpacity className='flex flex-row justify-center gap-x-5 border '>
				<Image
					source={icons.google}
					resizeMode='contain'
					className='w-5 h-5 mx-2'
				/>
				<Text>
					Login With Google
				</Text>
			</TouchableOpacity> */}
		</View>
	)
}

export default OAuth