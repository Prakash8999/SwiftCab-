import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { ButtonProps } from '@/types/type'


const getBgVariantStyle = (variant: ButtonProps["bgVariant"]) => {
	switch (variant) {
		case "secondary":
			return "bg-gray-500";

		case "danger":
			return "bg-red-500";
		case "success":
			return "bg-green-500";
		case "outline":
			return "bg-transparent border-neutral-300 border-[0.5px]";
		default:
			return "bg-[#0286FF]"
	}
}

const CustomButtom = ({
	onPress,
	title,
	classname ='',
	bgVariant = 'primary',
	textVariant = 'default',
	IconLeft,
	IconRight,
	textColor,
	...props

}: ButtonProps) => {
// console.log(classname)

	return (
		<TouchableOpacity onPress={onPress} className={`${classname}  rounded-full flex flex-row justify-center items-center shadow-md shadow-neutral-400/70 ${getBgVariantStyle(bgVariant)} `} {...props}>
			{IconLeft && <IconLeft />}
			<Text className={`text-lg font-PoppinsMedium ${textColor} `}>
				{title}
			</Text>
			{IconRight && <IconRight />}
		</TouchableOpacity>
	)
}

export default CustomButtom