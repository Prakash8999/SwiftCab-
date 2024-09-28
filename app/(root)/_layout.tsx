import { Stack } from 'expo-router';

const LayoutTabs =()=> {
  

  return (
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="findride" options={{ headerShown: false }} />
     <Stack.Screen name="confirm-ride" options={{ headerShown: false }} />
        <Stack.Screen name="bookride" options={{ headerShown: false }} />
     
      </Stack>
  );
}



export default LayoutTabs