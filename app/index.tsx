import { Redirect } from 'expo-router';
import React from 'react';

const Home = () => {
  return <Redirect href={'/(auth)/welcome' as any} />;
};

export default Home;
