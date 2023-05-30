import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, useWindowDimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const StepsGraph = () => {
    const data = {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [
        {
          data: [10,],
          color: (opacity = 1) => `rgba(255, 165, 0, ${opacity})`, // orange
          strokeWidth: 2,
        },
      ],
    };
    
    const {width,height} = useWindowDimensions();
  
    return (
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Today</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Week</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.graphContainer}>
          <LineChart
            data={data}
            width={width}
            height={220}
            chartConfig={{
              backgroundGradientFrom: '#ffffff',
              backgroundGradientTo: '#ffffff',
              decimalPlaces: 0, // no decimal places for step count
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // black
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // black
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: '4',
                strokeWidth: '2',
                stroke: '#ffa500', // orange
              },
            }}
            bezier
            style={styles.graph}
          />
        </View>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ffffff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonContainer: {
      flexDirection: 'row',
      alignSelf: 'stretch',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 16,
    },
    button: {
      borderRadius: 8,
      paddingVertical: 12,
      paddingHorizontal: 24,
      marginHorizontal: 8,
      backgroundColor: '#ffa500', // orange
    },
    buttonText: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    graphContainer: {
        marginTop: 16,
        alignItems: 'center',
        justifyContent: 'center',
      },
      graph: {
        marginVertical: 8,
        borderRadius: 16,
      },
    });
    export default StepsGraph;
