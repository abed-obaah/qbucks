import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ProfitIndicator = ({ type, percentage_change }) => {
  // Determine color and text based on type (debit or credit)
  const indicatorColor = type === 'debit' ? 'red' : 'green';
  const indicatorText = type === 'debit' ? 'Debit' : 'Credit';

  return (
    <View style={[styles.indicatorContainer, { backgroundColor: indicatorColor }]}>
      <Text style={styles.indicatorText}>{percentage_change}</Text>
      <Text style={styles.indicatorType}>{indicatorText}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  indicatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  indicatorText: {
    color: 'white',
    fontSize: 12,
    marginRight: 4,
  },
  indicatorType: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default ProfitIndicator;
