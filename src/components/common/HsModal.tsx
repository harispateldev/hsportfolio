import React from 'react';
import { Modal } from 'antd';

interface HsModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  width?: number | string;
}

const HsModal: React.FC<HsModalProps> = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  footer = null,
  width = 520
}) => {
  return (
    <Modal
      title={title}
      open={isOpen}
      onCancel={onClose}
      footer={footer}
      width={width}
      centered
      className="hs-modal"
    >
      <div className="py-4 text-gray-700 dark:text-gray-300">
        {children}
      </div>
    </Modal>
  );
};

export default HsModal;
