import React from 'react';
import { View } from 'react-native';
import {
  Card,
  ThemeProvider,
  Header,
  Text,
  Button,
  Icon,
} from 'react-native-elements';
import styled from 'styled-components/native';
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
} from 'react-navigation';
import { appTheme } from '../../styles/appTheme';
import * as colours from '../../styles/colours';
import { CustomHeader } from '../../components/AtmHeader';
import t from '../../common/Translator';

/**
 * Styled Components
 */
const ContainerView = styled.View`
  flex: 2;
  justify-content: space-between;
`;

const CenteredView = styled.View`
  align-items: center;
`;

const ButtonContainer = styled.View`
  padding: 15px;
`;

const Message = styled.Text`
  margin: 10px;
  margin-left: 15px;
  font-size: 15;
  color: red;
`;

/**
 * Interfaces
 */
interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

/**
 * Main screen of Customers use-case.
 * User may enter the amount to withdraw.
 * Basic validations are performed,
 */
class CustomerPreview extends React.Component<Props> {
  state = {
    withdrawalAmount: '',
    message: '',
  };

  /**
   * Backspace button onPress handler.
   */
  onBackspacePressed = () => {
    let value = this.state.withdrawalAmount;
    let withdrawalAmount = value.slice(0, value.length - 1);
    this.setState({ withdrawalAmount });
  };

  /**
   * Proceed button onPress handler.
   */
  onProceedPressed = () => {
    if (!this.isValidAmount(parseInt(this.state.withdrawalAmount))) {
      this.setState({
        message: t._(
          'Smallest possible bank note is 2000. Please change to a valid amount!',
        ),
      });
    } else {
      this.props.navigation.navigate('CustomerPreview');
    }
  };

  /**
   * Prevalidates give amount. It needs to be higher than 2000, and divisible by 1000.
   * @param amount User input, amount to withdraw.
   * @returns True if valid, false otherwise.
   */
  isValidAmount = (amount: number): boolean => {
    if (amount < 2000) return false;
    if (amount % 1000 != 0 && amount % 1000 < 1000) return false;
    return true;
  };

  /**
   * Renders given text (amount)
   * @param amount User input, amount to withdraw.
   */
  renderAmountText = (amount: string) => {
    return (
      <Text
        style={{ fontSize: 40, fontWeight: 'bold', color: colours.PRIMARY }}>
        {amount}
      </Text>
    );
  };

  render() {
    return (
      //@ts-ignore
      <ThemeProvider theme={appTheme}>
        <Card title="HELLO WORLD">
          <Text style={{ marginBottom: 10 }}>
            The idea with React Native Elements is more about component
            structure than actual design.
          </Text>
          <Button
            icon={<Icon name="code" color="#ffffff" />}
            buttonStyle={{
              borderRadius: 0,
              marginLeft: 0,
              marginRight: 0,
              marginBottom: 0,
            }}
            title="VIEW NOW"
          />
        </Card>
      </ThemeProvider>
    );
  }
}

export { CustomerPreview };
