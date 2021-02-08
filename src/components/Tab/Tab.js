import React, {useRef} from 'react';
import styled from 'styled-components/native';
import {Transition, Transitioning} from 'react-native-reanimated';
import { MaterialCommunityIcons, Entypo  } from '@expo/vector-icons';
import Images from '../../images';

const bgColors = {
  home: '#e5c1e5',
  account: '#e5c1e5',
  cube: '#e5c1e5',
  'heart-multiple-outline': '#e5c1e5',
};

const textColors = {
  home: '#9932CC',
  account: '#9932CC',
  cube: '#9932CC',
  'heart-multiple-outline': '#9932CC',
};

const Container = styled.TouchableWithoutFeedback``;

const Background = styled(Transitioning.View)`
  flex: auto;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background: ${(props) => (props.focused ? bgColors[props.label] : 'white')};
  border-radius: 100px;
  margin: 6px;
`;
const Icon = styled.Image`
  height: 24px;
  width: 24px;
`;

const Label = styled.Text`
  color: ${(props) => textColors[props.label]};
  font-weight: 600;
  margin-left: 8px;
`;

function Tab({ label, accessibilityState, onPress, text }) {
  const focused = accessibilityState.selected;
  const icon = !focused ? Images.icons[label] : Images.icons[`${label}Focused`];

  const transition = (
    <Transition.Sequence>
      <Transition.Out type="fade" durationMs={0} />
      <Transition.Change interpolation="easeInOut" durationMs={100} />
      <Transition.In type="fade" durationMs={10} />
    </Transition.Sequence>
  );

  const ref = useRef();

  return (
    <Container
      onPress={() => {
        ref.current.animateNextTransition();
        onPress();
      }}>
      <Background
        focused={focused}
        label={label}
        ref={ref}
        transition={transition}>
          <MaterialCommunityIcons name={label} color={'#9932CC'} size={24}/>
          {focused && (
            <Label label={label}>
              {text.charAt(0).toUpperCase() + text.slice(1)}
            </Label>
          )}
      </Background>
    </Container>
  );
}

export default Tab;