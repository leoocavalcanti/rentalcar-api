import React from 'react';
import { Container } from './styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const SidebarItem = ({ Icon, Text, onClick }) => {
  return (
    <Container onClick={onClick}>
      <FontAwesomeIcon icon={Icon}/>
      {Text}
    </Container>
  )
};

export default SidebarItem;