import React from 'react';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../../navigators/RootStackParams';

import { Flex, Spacer, Checkbox, IconButton, VStack } from 'native-base';
import { Button } from 'native-base';
import { Layout, SignupAgreementModal } from '../../components';
import { AgreementType } from '../../components/SignupAgreementModal';

type AgreementContent = {
  title: string;
  type: AgreementType;
};
const AGREEMENT_CONTENTS: AgreementContent[] = [
  {
    title: '개인정보 수집 및 이용동의 (필수)',
    type: 'personal',
  },
  {
    title: '서비스 이용약관 동의 (필수)',
    type: 'terms',
  },
];

type AgreementScreenProp = StackScreenProps<RootStackParams, 'Agreement'>;
const AgreementScreen: React.FC<AgreementScreenProp> = ({ navigation }) => {
  const [showModal, setShowModal] = React.useState(false);
  const [isChecked, setIsChecked] = React.useState({
    personal: false,
    terms: false,
  });
  const [modalType, setModalType] = React.useState<AgreementType>('personal');
  const showCurrentModal = (type: AgreementType) => {
    setModalType(type);
    setShowModal(true);
  };
  const isAllChecked = isChecked.personal === true && isChecked.terms === true;
  return (
    <Layout>
      <VStack space={4}>
        {AGREEMENT_CONTENTS.map((v) => (
          <Flex
            key={v.title}
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <Checkbox
              isChecked={isChecked[v.type]}
              onChange={(isSelected) =>
                setIsChecked({ ...isChecked, [v.type]: isSelected })
              }
              colorScheme="gray"
              value={v.title}
            >
              {v.title}
            </Checkbox>
            <IconButton
              variant="unstyled"
              size="md"
              color="black"
              _icon={{
                as: AntDesignIcon,
                name: 'right',
                size: 4,
                textAlign: 'center',
              }}
              onPress={() => showCurrentModal(v.type as AgreementType)}
              name="자세히 보기"
            />
          </Flex>
        ))}
      </VStack>
      <Spacer />
      <Button
        mb="2"
        variant={isAllChecked ? 'solid' : 'disabled'}
        disabled={!isAllChecked}
        onPress={() => navigation.navigate('ValidateEmail')}
      >
        다음
      </Button>
      <SignupAgreementModal
        type={modalType}
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
    </Layout>
  );
};

export default AgreementScreen;
