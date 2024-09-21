import { SignedIn, SignedOut, useAuth, useUser } from '@clerk/clerk-expo'
import { Link } from 'expo-router'
import { Button, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Page() {
  const { user } = useUser()
  const { signOut } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut();
      console.log('User signed out successfully!');
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };
  return (
    <SafeAreaView>

    <View>
      <SignedIn>
        <Text>Hello {user?.emailAddresses[0].emailAddress}</Text>
      </SignedIn>
      <SignedOut>
        <Link href="/login" >
          <Text>Sign In</Text>
        </Link>
        <Link href="/sign-up">
          <Text>Sign Up</Text>
        </Link>
      </SignedOut>
    </View>
    <View>
      <Button title="Logout" onPress={handleLogout} />
    </View>
    </SafeAreaView>
  )
}