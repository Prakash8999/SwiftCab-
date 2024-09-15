import { View, Text, TouchableOpacity, Image } from 'react-native';
import React, { useRef, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import PagerView from 'react-native-pager-view';
import { onboarding } from '@/constants';
import { router } from 'expo-router';
import CustomButtom from '@/components/CustomButtom';

const Welcome = () => {
   let [activeIndex, setActiveIndex] = useState(0);
const isLastScreen = activeIndex === onboarding.length -1
const pagerRef = useRef<PagerView>(null);


   return (
      <SafeAreaView className='flex h-full items-center justify-between bg-white'>
         <TouchableOpacity onPress={() => router.replace('/(auth)/sign-up')} className='w-full flex justify-end items-end p-5'>
            <Text className='text-black text-md font-PoppinsBold'>Skip</Text>
         </TouchableOpacity>

         <PagerView
            style={{ flex: 1, width: '100%' }}
            initialPage={0}
            ref={pagerRef}

            onPageSelected={(e) => setActiveIndex(e.nativeEvent.position)}
         >
            {onboarding.map((items, index) => (
               
               <View key={index} className='flex items-center justify-center p-5'>
                  <Image source={items.image} className='w-full h-[300px]' resizeMode='contain' />
                 <View className='flex flex-col items-center justify-center w-full mt-10'>


				  <Text className='text-black text-2xl font-PoppinsBold  text-center'>{items.title}</Text>
				<View>
					<Text className='text-lg font-PoppinsMedium text-center text-[#858585]  mt-5'>

						{items.description}

					</Text>
				</View>
				 </View>
               </View>
            ))}
         </PagerView>

         {/* Dots indicator */}
         <View className='flex-row mb-4'>
            {onboarding.map((_, index) => (
               <View
                  key={index}
                  className={`w-[32px] h-[4px] mx-1 ${activeIndex === index ? 'bg-[#0286FF]' : 'bg-[#E2E8F0]'} rounded-full`}
               />
            ))}
         </View>

         <CustomButtom title={isLastScreen ? 'Get Started' : 'Next'} onPress={() => 
            isLastScreen ? router.replace('/(auth)/sign-up') :       pagerRef.current?.setPage(activeIndex + 1)
         } classname=' mb-3 p-2 w-full'/>
      </SafeAreaView>
   );
};

export default Welcome;
