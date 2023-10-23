import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, ScrollView } from 'react-native';
import { collection, onSnapshot } from 'firebase/firestore';
import db from '../../firebase/firebase';

const FirebaseRealtimeData = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'platillos'), (snapshot) => {
      const newData = {};
      snapshot.forEach((doc) => {
        const item = { id: doc.id, ...doc.data() };
        if (!newData[item.categoria]) {
          newData[item.categoria] = [];
        }
        newData[item.categoria].push(item);
      });

      setData(newData);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <FlatList
      data={Object.keys(data)}
      keyExtractor={(item) => item}
      renderItem={({ item }) => <CategoryList categoria={item} data={data[item]} />}
    />
  );
};

const CategoryList = ({ categoria, data }) => {
  return (
    <View style={styles.categoryContainer}>
      <Text style={styles.categoryTitle}>{categoria}</Text>
      <FlatList
        horizontal
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Card item={item} />}
      />
    </View>
  );
};

const Card = ({ item }) => {
  return (
    <View style={styles.card}>
      <ScrollView>
        <View style={styles.imageContainer}>
          <Image source={{ uri: item.imagen }} style={styles.image} />
        </View>
        <View style={styles.details}>
              <View style={styles.nameContainer}>
                <Text numberOfLines={3} style={styles.itemNombre} textAlign="center" textAlignVertical="center">
                  {item.nombre}
                </Text>
            </View>

          {/* Muestra el precio aquí */}
          <Text style={{ textAlign: 'center' }}>Precio: S/{item.precio}</Text>

        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  categoryContainer: {
    marginBottom: 20,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft: 10,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 2,
    borderRadius: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3, // Agrega sombra en Android
    height: 'auto',
    width: 200,
    alignContent: 'center',
    marginHorizontal: 10,
    
  },
  imageContainer: {
    marginTop: 20,
    marginHorizontal: 40,
    width: 100,
    height: 100,
    borderRadius: 50, // Convierte la imagen en un círculo
    overflow: 'hidden', // Recorta cualquier parte de la imagen que desborde el círculo
    
  },
  itemNombre: {
    flexWrap: 'wrap',
    fontWeight: '900',
    textAlign: 'center',
    marginHorizontal: 'auto',
    alignItems: 'center',
    
  },
  nameContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 70,
    marginVertical: 'auto',
    paddingVertical: 'auto'

  },
  image: {
    
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  details: {
    marginHorizontal: 20
  },
});

export default FirebaseRealtimeData;

