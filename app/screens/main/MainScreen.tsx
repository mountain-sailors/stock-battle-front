import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import Layout from '../../components/Layout';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const styles = StyleSheet.create({
  statusContainer: {
    flex: 1.5,
    backgroundColor: '#fff',
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
  },
  recordContainer: {
    flex: 4,
    backgroundColor: '#f2f2f2',
    width: SCREEN_WIDTH,
    marginLeft: -20,
    marginBottom: -20,
  },
  titleContainer: {
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    textAlign: 'left',
  },
  appleBoxXL: {
    height: 34,
  },
  appleBoxL: {
    height: 13,
  },
  titleSmall: {
    fontSize: 23,
  },
  PurpleText: {
    color: '#8B74FF',
    fontWeight: '700',
  },
});

// TODO : Loading 처리
const MainScreen: React.FC = () => {
  const [userInfo] = React.useState({
    nickName: '다현',
    average: 4.5,
  });
  return (
    <Layout>
      <View style={styles.statusContainer}>
        <Text style={styles.title}>{userInfo.nickName}님의</Text>
        <Text style={styles.title}>배틀 현황입니다</Text>
        <View style={styles.appleBoxL} />
        <Text style={styles.titleSmall}>
          평균 등수 <Text style={styles.PurpleText}>{userInfo.average}위</Text>
        </Text>
      </View>
      <View style={styles.recordContainer} />
    </Layout>
  );
};

export default MainScreen;
