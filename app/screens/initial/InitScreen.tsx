import React from 'react';
import { StyleSheet, StatusBar, Text, View } from 'react-native';
import { Button } from 'native-base';
import { Layout } from '../../components';

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    backgroundColor: '#fff',
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
  },
  titleContainer: {
    marginBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  appleBox: {
    height: 13,
  },
});

const InitScreen: React.FC = () => {
  return (
    <Layout>
      <View style={styles.loginContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>주식배 틀로</Text>
          <Text style={styles.title}>내가 산 주식을 응원하세요</Text>
        </View>
        <StatusBar barStyle="dark-content" />
        <Button variant="solid">로그인</Button>
        <Button variant="outline">회원가입</Button>
      </View>
    </Layout>
  );
};

export default InitScreen;
