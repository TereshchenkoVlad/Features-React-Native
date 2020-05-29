import React, {useState, FC} from 'react';
import {
  Text,
  Button,
  Keyboard,
  StyleSheet,
  SafeAreaView,
  TouchableWithoutFeedback,
} from 'react-native';
import {Input} from './Input';

type formData = {
  name: string;
  email: string;
  password: string;
};

export const Form: FC = () => {
  const [formData, setFormData] = useState<formData>({
    name: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState<formData>({
    name: '',
    email: '',
    password: '',
  });

  const [touched, setTouched] = useState({
    name: false,
    email: false,
    password: false,
  });

  const setError = (name: string, error: string): void => {
    setErrors({...errors, [name]: error});
  };

  const handlerTouched = (name: keyof formData): void => {
    setTouched({...touched, [name]: true});
  };

  const handleChange = (
    key: keyof formData,
    text: string,
    regExp: RegExp,
    errorText: [string, string],
  ): void => {
    if (touched[key]) {
      if (regExp.test(text)) {
        setError(key, '');
      } else {
        if (text.trim()) {
          setError(key, errorText[1]);
        } else {
          setError(key, errorText[0]);
        }
      }
    }
    setFormData({...formData, [key]: text});
  };

  const handleBlur = (
    key: keyof formData,
    value: string,
    regExp: RegExp,
    errorText: [string, string],
  ): void => {
    handlerTouched(key);
    if (regExp.test(value)) {
      setError(key, '');
    } else {
      if (value.trim()) {
        setError(key, errorText[1]);
      } else {
        setError(key, errorText[0]);
      }
    }
  };

  const handlerSubmit = () => {
    console.log(errors);
    console.log(touched);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <Text>APP</Text>
        {/* <Input
            value={formData.name}
            name="name"
            handleChange={handleChange}
            setError={setError}
            setTouched={handlerTouched}
            touched={touched.name}
            error={errors.name}
            placeholder={['Enter your name', '#808080']}
            errorText={['Required', 'Required']}
            regExp={/^/}
          /> */}
        <Input
          value={formData.email}
          name="email"
          handleChange={handleChange}
          handleBlur={handleBlur}
          touched={touched.email}
          error={errors.email}
          placeholder={['Enter your email', '#808080']}
          errorText={['Required', 'Invalid email']}
          regExp={/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/}
        />
        {/* <Input
            value={formData.password}
            name="password"
            onChange={handlerChange}
            setError={setError}
            setTouched={handlerTouched}
            touched={touched.password}
            error={errors.password}
            placeholder={['Enter password', '#808080']}
            errorText={[
              'Required',
              'Minimum 8 characters, at least one letter and one number',
            ]}
            regExp={/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/}
          /> */}
        <Button title="Submit" onPress={handlerSubmit} />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
});
