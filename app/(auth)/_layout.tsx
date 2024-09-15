import { Stack } from 'expo-router';

const Layout =()=> {
  

  return (
      <Stack>
        <Stack.Screen name="welcome" options={{ headerShown: false }} />
        <Stack.Screen name="sign-up" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
        {/* <Stack.Screen name="/(root)" options={{ headerShown: false }} /> */}
        <Stack.Screen name="+not-found" />
      </Stack>
  );
}



export default Layout