import React, {FC, useState} from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';

type formData = {
  name: string;
  email: string;
  password: string;
};

interface IProps {
  name: keyof formData;
  value: string;
  regExp: RegExp;
  error: string;
  touched: boolean;
  handleChange: (
    key: keyof formData,
    text: string,
    regExp: RegExp,
    errorText: [string, string],
  ) => void;
  handleBlur: (
    key: keyof formData,
    value: string,
    regExp: RegExp,
    errorText: [string, string],
  ) => void;
  placeholder: [string, string];
  errorText: [string, string];
}

export const Input: FC<IProps> = ({
  name,
  value,
  error,
  regExp,
  touched,
  handleChange,
  handleBlur,
  errorText,
  placeholder,
}) => {
  const [isFocuses, setFocus] = useState<boolean>(false);

  const handleFocus = (): void => setFocus(true);

  const onBlurHandle = () => {
    setFocus(false);
    handleBlur(name, value, regExp, errorText);
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={value}
        style={[
          styles.input,
          touched && error
            ? {borderBottomColor: 'red'}
            : isFocuses && {borderBottomColor: 'green'},
          ,
        ]}
        onChangeText={(text) => handleChange(name, text, regExp, errorText)}
        onFocus={handleFocus}
        onBlur={onBlurHandle}
        placeholder={placeholder[0]}
        placeholderTextColor={placeholder[1]}
        autoCorrect={false}
        autoCapitalize="none"
      />
      {touched && error.trim() ? (
        <Text style={styles.error}>{error}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
  },
  input: {
    borderBottomColor: '#FFF',
    borderBottomWidth: 1,
    padding: 5,
    color: '#fff',
  },
  error: {
    color: 'red',
    fontSize: 12,
  },
});
