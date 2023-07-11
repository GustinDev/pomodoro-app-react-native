import {
  View,
  Text,
  SafeAreaView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { useEffect, useState } from 'react';
import Header from './src/components/Header';
import Timer from './src/components/Timer';
import { Audio } from 'expo-av';

const colors = ['#F7DC6F', '#A2D9CE', '#D7BDE2'];

const App = () => {
  //Si anda
  const [isWorking, setisWorking] = useState(false);
  //Tiempo
  const [time, setTime] = useState(25 * 60);
  //Tipo
  const [currentTime, setCurrentTime] = useState('POMO' | 'SHORT' | 'BREAK');
  //Active
  const [isActive, setIsActive] = useState(false);

  //Button

  let handleStartStop = () => {
    playSound();
    setIsActive(!isActive);
  };

  //Sound

  let playSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require('./assets/sound.wav')
    );
    sound.playAsync();
  };

  //Timer

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setTime(time - 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    if (time === 0) {
      setIsActive(false);
      setisWorking((prev) => !prev);
      setTime(isWorking ? 300 : 1500);
    }

    return () => clearInterval(interval);
  }, [isActive, time]);

  return (
    <SafeAreaView style={{ backgroundColor: colors[currentTime] }}>
      <View
        className='flex w-full h-full justify-start items-center  py-2'
        style={{ paddingTop: Platform.OS == 'android' && 35 }}
      >
        <Text className='font-bold text-2xl text-black'>
          Pomodoro (by Juan Gustin)
        </Text>
        <Header
          currentTime={currentTime}
          setCurrentTime={setCurrentTime}
          setTime={setTime}
        />
        <Timer time={time} />
        <TouchableOpacity>
          <Text
            className='p-5 bg-blue-500 mt-5 rounded-xl font-bold text-white'
            onPress={handleStartStop}
          >
            {isActive ? 'STOP' : 'START'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default App;
