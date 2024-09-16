import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link } from 'expo-router'
import CustomButtom from '@/components/CustomButtom'
import { icons, images } from '@/constants'
import InputField from '@/components/InputField'
import { Image, ScrollView } from 'react-native'
import OAuth from '@/components/OAuth'

const SignUp = () => {


	const [form, setForm] = useState({
		email: "",
		password: "",
	});
	return (
		<ScrollView className="flex-1 bg-white">
			<View className="flex-1 bg-white">
				<View className="relative w-full h-[250px]">
					<Image source={images.signUpCar} className="z-0 w-full h-[250px]" />
					<Text className="text-2xl text-black font-JakartaSemiBold absolute bottom-5 left-5">
						Create Your Account
					</Text>
				</View>
				<View className="p-5">
				
					<InputField
						label="Email"
						placeholder="Enter email"
						icon={icons.email}
						textContentType="emailAddress"
						value={form.email}
						onChangeText={(value) => setForm({ ...form, email: value })}
					/>
					<InputField
						label="Password"
						placeholder="Enter password"
						icon={icons.lock}
						secureTextEntry={true}
						textContentType="password"
						value={form.password}
						onChangeText={(value) => setForm({ ...form, password: value })}
					/>
					<CustomButtom
						title="Login"
						textColor='text-white'
						onPress={() => (1)}
						classname="py-2 mt-5"

					/>
					<OAuth />
					<Link
						href={"/sign-up"}
						className="text-lg text-center text-general-200 mt-5"
					>
						Doesn't have an account?{" "}
						<Text className="text-primary-500">Sign Up</Text>
					</Link>
				</View>
			</View>
		</ScrollView>
	)
}

export default SignUp