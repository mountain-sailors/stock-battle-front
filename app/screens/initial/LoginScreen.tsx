import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, Input } from 'native-base';
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
  appleBoxXL: {
    height: 34,
  },
  appleBoxL: {
    height: 13,
  },
  titleSmall: {
    fontSize: 14,
    fontWeight: '700',
  },
});

const LoginScreen: React.FC = () => {
  const [value, setValue] = React.useState('');
  return (
    <Layout>
      <View style={styles.loginContainer}>
        <Text style={styles.titleSmall}>아이디</Text>
        <View style={styles.appleBoxL} />
        <Input
          value={value}
          variant="filled"
          placeholder="이메일을 입력해주세요"
          onChangeText={setValue}
        />
        <View style={styles.appleBoxXL} />
        <Text style={styles.titleSmall}>비밀번호</Text>
        <View style={styles.appleBoxL} />
        <Input
          value={value}
          variant="filled"
          placeholder="비밀번호를 입력해주세요"
          onChangeText={setValue}
        />
      </View>
      <View>
        <Button variant="disabled" disabled>
          로그인
        </Button>
      </View>
    </Layout>
  );
};

export default LoginScreen;
