import React from 'react';
import { Modal } from 'native-base';
import Markdown from 'react-native-markdown-renderer';

import { PERSONAL_AGREEMENT_TEXT, TERMS_AGREEMENT_TEXT } from './consts';

export type AgreementType = 'personal' | 'terms';

type SignupAgreementModalProps = {
  type: 'personal' | 'terms';
  isOpen: boolean;
  onClose: () => void;
};
const SignupAgreementModal: React.FC<SignupAgreementModalProps> = ({
  type,
  isOpen,
  onClose,
}) => {
  const AGREEMENTS_INFO = {
    personal: {
      title: '개인정보 수집 및 이용동의',
      md: TERMS_AGREEMENT_TEXT,
    },
    terms: {
      title: '서비스 이용 동의',
      md: PERSONAL_AGREEMENT_TEXT,
    },
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <Modal.Content>
        <Modal.CloseButton />
        <Modal.Header>{AGREEMENTS_INFO[type].title}</Modal.Header>
        <Modal.Body>
          <Markdown>{AGREEMENTS_INFO[type].md}</Markdown>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
};

export default SignupAgreementModal;
