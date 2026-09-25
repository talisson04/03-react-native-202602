import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import TelaDaListaDeCompras from './components/TelaDaListaDeCompras';

export default function App() {
  return (
    <View style={styles.container}>
      {/* Coloque o componente da tela aqui dentro: */}
      <TelaDaListaDeCompras />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
