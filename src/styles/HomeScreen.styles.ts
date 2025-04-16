import styled from 'styled-components/native';

export const BackgroundImage = styled.ImageBackground`
  flex: 1;
`;

export const Overlay = styled.SafeAreaView`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.4);
`;

export const Wrapper = styled.View`
  flex: 1;
  padding: 16px;
`;

export const ScrollArea = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
})``;

export const ErrorText = styled.Text`
  color: red;
  text-align: center;
  font-size: 16px;
  margin-top: 12px;
`;

export const OfflineBanner = styled.Text`
  background-color: #ff4d4d;
  color: #fff;
  text-align: center;
  padding-vertical: 10px;
  font-weight: 600;
  font-size: 16px;
  border-radius: 8px;
  margin-bottom: 10px;
`;
