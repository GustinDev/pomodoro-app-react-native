import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
//Marcamos un index con los tipos de tiempo.
const options = ['Pomodoro', 'Short Break', 'Long Break'];

export default function Header({ setTime, setCurrentTime, currentTime }) {
  let handlePress = (index) => {
    //Seleccionamos un tipo de temporizador, del array.
    setCurrentTime(index);
    //Si el index: 0 - 25 mns | 1 - 5mns | 2 (otro) - 15mns
    const newTime = index === 0 ? 25 : index === 1 ? 5 : 15;
    //Tomamos el tiempo, y los multiplicamos por 60 - para mostrarlo.
    setTime(newTime * 60);
  };
  return (
    <View className='px-4 flex flex-row '>
      {options.map((option, index) => (
        <TouchableOpacity
          onPress={() => {
            handlePress(index);
          }}
          className={`border-2  w-1/3 p-2 mt-5 rounded-xl text-center`}
          key={index}
          style={
            currentTime !== index
              ? { borderColor: 'transparent' }
              : { borderColor: 'white' }
          }
        >
          <Text className='text-black text-center text-lg'>{option}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
