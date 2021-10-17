import React from 'react';
import { StyleSheet, StatusBar, Text, View } from 'react-native';
import Button from '../components/Button';
import Layout from '../components/Layout';

const InitScreen: React.FC = () => {
  const [value, setValue] = React.useState('');
  return (
    <Layout>
	<View style={styles.loginContainer}>
		<View style={styles.titleContainer}>
      <Text style={styles.title}>주식배틀로</Text>
	  <Text style={styles.title}>내가 산 주식을 응원하세요</Text>
	  </View>
      <StatusBar barStyle="dark-content" />
      <Button title="로그인" variant="filled" onClick={() => {}}/>
	  <View style={styles.appleBox}></View>
	  <Button title="회원가입" variant="outlined" onClick={() => {}} />
	</View>
    </Layout>
  );
}

const styles = StyleSheet.create({
	loginContainer: {
		flex: 1,
		backgroundColor: '#fff',
		display: 'flex',
		justifyContent: 'center',
		alignContent: 'center'
	},
	titleContainer : {
		marginBottom: 40,
	},
	title: {
		fontSize: 24,
		fontWeight: '700',
		textAlignVertical: "center",
		textAlign: "center"
	},
	appleBox: {
		height: 13
	}
})

export default InitScreen;
