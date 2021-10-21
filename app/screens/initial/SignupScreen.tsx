import React from 'react';
import { StyleSheet, StatusBar, Text, View, Image } from 'react-native';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Layout from '../../components/Layout';

const SignupScreen: React.FC = () => {
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
		<View style={styles.appleBoxXL}></View>
		<Text style={styles.titleSmall}>닉네임</Text>
		<View style={styles.appleBoxL}></View>
		<Input value={value} placeholder="닉네임을 입력해주세요" onChangeText={setValue} />
		<View style={styles.appleBoxXL}></View>
		<Text style={styles.titleSmall}>아바타</Text>
		<View style={styles.appleBoxL}></View>
		<View style={styles.avatarContainer}>
			<Image
			source={require('../../../assets/avatar/avatar_1.png')}
			style={{width: 48, height: 48, borderRadius: 48/ 2}}
			/>
			<Image
			source={require('../../../assets/avatar/avatar_2.png')}
			style={{width: 48, height: 48, borderRadius: 48/ 2}}
			/>
			<Image
			source={require('../../../assets/avatar/avatar_3.png')}
			style={{width: 48, height: 48, borderRadius: 48/ 2}}
			/>
			<Image
			source={require('../../../assets/avatar/avatar_4.png')}
			style={{width: 48, height: 48, borderRadius: 48/ 2}}
			/>
			<Image
			source={require('../../../assets/avatar/avatar_5.png')}
			style={{width: 48, height: 48, borderRadius: 48/ 2}}
			/>
		</View>
	</View>
	<View>
		<Button title="회원가입" variant="disabled" onClick={() => {}}/>
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
	avatarContainer: {
		flex: 1,
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between'
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

export default SignupScreen;