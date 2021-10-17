import React from 'react';
import { StyleSheet, StatusBar, Text, View } from 'react-native';
import Button from '../components/Button';
import Input from '../components/Input';
import Layout from '../components/Layout';
import { DefaultTheme } from 'styled-components/native'

const LoginScreen: React.FC = () => {
  const [value, setValue] = React.useState('');
  return (
    <Layout>
	<View style={styles.loginContainer}>
		<Text style={styles.titleSmall}>아이디</Text>
		<View style={styles.appleBoxL}></View>
		<Input value={value} placeholder="이메일을 입력해주세요" onChangeText={setValue} />
		<View style={styles.appleBoxXL}></View>
		<Text style={styles.titleSmall}>비밀번호</Text>
		<View style={styles.appleBoxL}></View>
		<Input value={value} placeholder="비밀번호를 입력해주세요" onChangeText={setValue} />
	</View>
	<View>
		<Button title="로그인" variant="disabled" onClick={() => {}}/>
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
	appleBoxXL: {
		height: 34
	},
	appleBoxL: {
		height: 13
	},
	titleSmall: {
		fontSize: 14,
		fontWeight: '700',
	}
})

export default LoginScreen;
