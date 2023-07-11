import { View, Text } from 'react-native';
import React from 'react';

export default function Timer({ time }) {
  //Formateamos el tiempo - 2 valores: 2 valores.
  const formattedTime = `${Math.floor(time / 60)
    .toString()
    .padStart(2, '0')}:${(time % 60).toString().padStart(2, '0')}`;
  return (
    <View className='bg-white rounded-lg w-3/4 mt-5'>
      <Text className='text-black text-6xl text-center p-6 font-bold'>
        {formattedTime}
      </Text>
    </View>
  );
}
