import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useRoot} from '../../Context';

export function MakePayment() {
  const address = Platform.OS === 'ios' ? 'localhost' : '10.0.2.2';
  const {
    state: {accessToken},
  } = useRoot();

  const makePayment = () => {
    fetch(`http://${address}:8080/api/make_payment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        access_token: accessToken,
      },
      body: JSON.stringify({
        amount: 0.01,
        recipient: 'Recipient Name',
      }),
    })
      .then(response => {
        if (!response.ok) {
          return response.text().then(text => {
            throw new Error(`Error ${response.status}: ${text}`);
          });
        }
        return response.json();
      })
      .then(data => {
        console.log('Payment successful:', data);
      })
      .catch(error => {
        console.log('Error making payment:', error.message);
      });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={makePayment} style={styles.button}>
        <Text style={styles.buttonText}>Make Payment</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#42b883',
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
