import React from 'react';
import { StyleSheet, StatusBar, Text, View } from 'react-native';
import Button from '../../components/Button';
import Layout from '../../components/Layout';

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
        <Button title="로그인" variant="filled" onClick={() => null} />
        <View style={styles.appleBox} />
        <Button title="회원가입" variant="outlined" onClick={() => null} />
      </View>
    </Layout>
  );
};

export default InitScreen;
