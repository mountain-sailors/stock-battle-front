import React, { useState } from 'react';
import { StyleSheet, StatusBar, Text, View, Dimensions } from 'react-native';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Layout from '../../components/Layout';
import { DefaultTheme } from 'styled-components/native'

const { height, width: SCREEN_WIDTH } = Dimensions.get('window');

// TODO : Loading 처리

const MainScreen: React.FC = () => {
  const [value, setValue] = React.useState('');
  const [userInfo, setUserInfo] = React.useState({
	  nickName: '다현',
	  average: 4.5
  })

  return (
    <Layout>
	<View style={styles.statusContainer}>
		<Text style={styles.title}>{userInfo.nickName}님의</Text>
		<Text style={styles.title}>배틀 현황입니다</Text>
		<View style={styles.appleBoxL}></View>
  	<Text style={styles.titleSmall}>평균 등수 <Text style={styles.PurpleText}>{userInfo.average}위</Text></Text>
	</View>
	<View style={styles.recordContainer}>

	</View>
    </Layout>
  );
}

const styles = StyleSheet.create({
	statusContainer: {
		flex: 1.5,
		backgroundColor: '#fff',
		display: 'flex',
		justifyContent: 'center',
		alignContent: 'center'
	},
	recordContainer: {
		flex: 4,
		backgroundColor: '#f2f2f2',
		width: SCREEN_WIDTH,
		marginLeft: -20,
		marginBottom: -20
	},
	titleContainer : {
		marginBottom: 40,
	},
	title: {
		fontSize: 32,
		textAlign: "left"
	},
	appleBoxXL: {
		height: 34
	},
	appleBoxL: {
		height: 13
	},
	titleSmall: {
		fontSize: 23,
	},
	PurpleText: {
		color: '#8B74FF',
		fontWeight: '700'
	}
})

export default MainScreen;
