import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image, StyleSheet } from 'react-native';

const Card = ({ portrait, title, points }) => {
  const getConditionalStyle = () => {
    if (portrait) return { justifyContent: 'space-between', width: 150, height: 250 };

    return { flexDirection: 'row', width: 250, height: 150 };
  };
  return (
    <View style={{ ...getConditionalStyle(), ...styles.root }}>
      <View style={{ width: portrait ? '100%' : 90, ...styles.imageWrap }}>
        <Image
          source={require('../../assets/item.png')}
          width={100}
          height={100}
          resizeMode="contain"
        />
      </View>
      <View style={styles.contentWrap}>
        <Text style={styles.title}>{title}</Text>
        <View style={{ paddingBottom: 15 }}>
          <Text>
            Earn up to <Text style={styles.points}>{points}</Text> points
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: 'white',
    borderRadius: 3,
    marginHorizontal: 8,
    marginBottom: 15,
    shadowOpacity: 0.9,
    shadowColor: 'gray',
    shadowRadius: 1,
    shadowOffset: { width: 2, height: 2 }
  },
  imageWrap: { alignItems: 'center', padding: 10 },
  contentWrap: { width: 160, padding: 10, justifyContent: 'space-between' },
  title: {
    fontWeight: 'bold',
    color: 'blue',
    fontSize: 17,
    marginBottom: 5
  },
  points: {
    fontWeight: 'bold',
    color: 'green'
  }
});

Card.propTypes = {
  title: PropTypes.string,
  points: PropTypes.number,
  portrait: PropTypes.bool
};

Card.defautProps = {
  portrait: false
};

export default Card;
