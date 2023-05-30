import { observer } from 'mobx-react';
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { sendPostRequest } from '../../Helper/SendToServer';
import { ChildsContext } from "../../stores/childstores/ChildStore";
import { AuthContext } from '../../component/FirebaseManagement/AuthProvider';


/**
 * EnterCodeScreen is child's device screen that demand for entering the code that generated by parent's devices.
 */
const EnterCodeScreen = observer(() => {
  const [code, setCode] = useState('');
  const {setPairingCode,storeEnterCode,setIsPaired,childInformation} = React.useContext(ChildsContext)
  const {user} = React.useContext(AuthContext);
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Enter Parent's Code Here</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Code Here"
        value={code}
        onChangeText={(text) => {
          setPairingCode(text);
          setCode(text)
        }}
      />
      <Button style={styles.button} mode="contained" onPress={() => { 
        sendPostRequest(user, "Child",storeEnterCode,childInformation);
      }}>
        Next
      </Button>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 20,
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 20,
  },
  button: {
    width: '80%',
    position: 'absolute',
    bottom: 20,
  },
});

export default EnterCodeScreen;