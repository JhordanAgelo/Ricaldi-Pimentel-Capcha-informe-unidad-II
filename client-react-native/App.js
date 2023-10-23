import React from 'react';
import {

  StyleSheet,
  Text,View,
  ScrollView
} from 'react-native';
import FirebaseRealtimeData from './src/components/FirebaseRealtimeData';


const App = () => {
  return (
    <ScrollView>

      <View>
          <View style={styles.contenedorTituloApp}>
              <Text style={styles.tituloApp}>NutricontiAPP</Text>
          </View>
      
          <View style={styles.contenedorTituloMenu}>
               <Text style={styles.tituloMenu}>Nuestro Menu</Text>
          </View>

          <FirebaseRealtimeData/>
      </View>
    </ScrollView>


  );
};

const styles = StyleSheet.create({
  tituloApp : {
    color: 'white',  fontSize:25 , fontWeight:'bold',
    textAlign: 'center',
    paddingTop: 50
  },
  contenedorTituloApp:{
    height: 150,
    backgroundColor: 'black'
  },
  tituloMenu: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
    color: 'black'
  },
  contenedorTituloMenu : {
    backgroundColor: '#f8ff32'
  }
});

export default App;
