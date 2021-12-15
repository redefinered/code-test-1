import React from 'react';
import { Text, View, SafeAreaView, Button, FlatList, StyleSheet } from 'react-native';
import { AppContext } from '../../contexts/providers/app/app.provider';
import Card from '../../components/card/card.component';
import DATA from './data.json';

const HomeScreen = () => {
  const { logout } = React.useContext(AppContext);

  return (
    <View style={{ flex: 1, backgroundColor: 'lightgray' }}>
      <SafeAreaView>
        {/* <Text>{`Hello, ${currentUser.name}!`}</Text> */}
        <View style={{ alignItems: 'flex-end', marginBottom: 20, paddingHorizontal: 16 }}>
          <Button title="Sign out" onPress={logout} />
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>Assessment</Text>
          <FlatList
            data={DATA.assessments}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => <Card {...item} />}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>Challenges</Text>
          <FlatList
            data={DATA.Challenges}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => <Card {...item} portrait />}
          />
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 20,
    paddingHorizontal: 20,
    marginBottom: 10,
    fontWeight: 'bold'
  },
  section: {
    marginBottom: 30
  }
});

export default HomeScreen;
