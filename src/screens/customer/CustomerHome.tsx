import React from 'react';
import {View} from 'react-native';
import {Card, ThemeProvider, Header, Text, Button} from 'react-native-elements';
import styled from 'styled-components/native';
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
} from 'react-navigation';
import {appTheme} from '../../styles/appTheme';
import * as colours from '../../styles/colours';
import {NumberPad} from '../../components/NumberPad';
import {CustomHeader} from '../../components/CustomHeader';
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
class CustomerHome extends React.Component<Props> {
  state = {
    withdrawalAmount: '',
    message: '',
  };

  /**
   * Numeric button onPress handler.
   */
  onNumbPressed = (numPressed: string) => {
    let currentAmount = this.state.withdrawalAmount;
    if (currentAmount.length < 1 && numPressed == '0') {
      this.setState({message: t._('You cannot start with 0')});
      return;
    }
    if (currentAmount.length >= 6) {
      this.setState({message: t._('Maximum withdrawal limit is 999.999')});
      return;
    }

    let withdrawalAmount = `${this.state.withdrawalAmount}${numPressed}`;
    this.setState({
      message: '',
      withdrawalAmount,
    });
  };

  /**
   * Backspace button onPress handler.
   */
  onBackspacePressed = () => {
    let value = this.state.withdrawalAmount;
    let withdrawalAmount = value.slice(0, value.length - 1);
    this.setState({withdrawalAmount});
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
      <Text style={{fontSize: 40, fontWeight: 'bold', color: colours.PRIMARY}}>
        {amount}
      </Text>
    );
  };

  render() {
    return (
      //@ts-ignore
      <ThemeProvider theme={appTheme}>
        <CustomHeader
          title={t._('Cash Withdrawal')}
          onBackPressed={() => this.props.navigation.navigate('OnBoarding')}
        />
        <ContainerView>
          <View>
            <Card title={t._('Enter Withdrawal Amount (HUF)')}>
              <CenteredView>
                {this.renderAmountText(this.state.withdrawalAmount)}
              </CenteredView>
            </Card>
            <Message>{this.state.message}</Message>
          </View>
          <ButtonContainer>
            <Button
              title={t._('Approve Amount')}
              onPress={() => this.onProceedPressed()}></Button>
          </ButtonContainer>
        </ContainerView>
        <NumberPad
          onPress={numPressed => this.onNumbPressed(numPressed)}
          onBackSpace={() => this.onBackspacePressed()}
        />
      </ThemeProvider>
    );
  }
}

export {CustomerHome};