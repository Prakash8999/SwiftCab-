import * as SecureStore from 'expo-secure-store'
import * as Linking from 'expo-linking'
import { fetchAPI } from './fetch'
// export interface TokenCache {
//     getToken: (key: string) => Promise<string | undefined | null>
//     saveToken: (key: string, token: string) => Promise<void>
//     clearToken?: (key: string) => void
//   }



export const tokenCache = {
  async getToken(key: string) {
    try {
      const item = await SecureStore.getItemAsync(key)
      if (item) {
        console.log(`${key} was used 🔐 \n`)
      } else {
        console.log('No values stored under key: ' + key)
      }
      return item
    } catch (error) {
      console.error('SecureStore get item error: ', error)
      await SecureStore.deleteItemAsync(key)
      return null
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value)
    } catch (err) {
      return
    }
  },
}

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!

if (!publishableKey) {
  throw new Error(
    'Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env',
  )
}



export const googleOAuth = async (startOAuthFlow: any) => {
  try {
    const { createdSessionId, signUp, setActive } = await startOAuthFlow({
      redirectUrl: Linking.createURL('/(root)/(tabs)/home')
    })
    if (createdSessionId) {
      if (setActive) {
        await setActive!({ session: createdSessionId })

        if (signUp.createdUserId) {
          await fetchAPI('http://192.168.211.250:3000/api/user/insert/', {

            method: "POST",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              name: `${signUp.firstName} ${signUp.lastName}`,
              email: signUp.emailAddress,
              clerkId: signUp.createdUserId
            })
          })
        }
        return {
          success: true,
          code: 'success',
          message: "You have successfully authenticated"
        }

      }

    }
    return {
      success: false,
      code:"success",
      message:"An error occurred"
    }
  } catch (error: any) {

    console.log(error);
    return {
      success: false,
      code:error.code,
      message: error?.errors[0].longMessage
    }
  }
}