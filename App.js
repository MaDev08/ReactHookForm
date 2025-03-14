import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextInput, Button, Text } from 'react-native-paper';
import { View, StyleSheet, SafeAreaView } from 'react-native';

function MyForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [submittedData, setSubmittedData] = useState(null);

  const onSubmit = (data) => {
    console.log('Dados enviados:', data);
    setSubmittedData(data);
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.text}variant="displayLarge">Formulário</Text>

        <Controller
          control={control}
          render={({ field }) => (
            <TextInput {...field} style={styles.input} placeholder="Seu nome" />
          )}
          name="name"
          rules={{ required: 'Você precisa inserir o seu email' }}
        />
        {errors.name && (
          <Text style={styles.errorText}>{errors.name.message}</Text>
        )}

        <Controller
          control={control}
          render={({ field }) => (
            <TextInput {...field} style={styles.input} placeholder="Email" />
          )}
          name="email"
          rules={{
            required: 'Você precisa inserir o seu email',
            pattern: { value: /^\S+@\S+$/i, message: 'Insira um email válido' },
          }}
        />
        {errors.email && (
          <Text style={styles.errorText}>{errors.email.message}</Text>
        )}

        <Button mode="contained" onPress={handleSubmit(onSubmit)}>
          Enviar
        </Button>

        {submittedData && (
          <View style={styles.submittedContainer}>
            <Text style={styles.submittedTitle}>Dados enviados:</Text>
            <Text>Nome: {submittedData.name}</Text>
            <Text>Email: {submittedData.email}</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 8,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  submittedContainer: {
    marginTop: 16,
  },
  submittedTitle: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  text: {
    textAlign: 'center',
    fontSize:30,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});

export default MyForm;
