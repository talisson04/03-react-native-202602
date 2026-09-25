import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';

interface Usuario { id: number; nome: string; telefone: string; email: string; cidade: string; }

const usuariosMockados: Usuario[] = [
  { id: 1, nome: 'João', telefone: '1199999999', email: 'joao@email.com', cidade: 'São Paulo' },
  { id: 2, nome: 'Maria', telefone: '2199999999', email: 'maria@email.com', cidade: 'Rio de Janeiro' },
];

export default function TelaDaListaDeUsuarios() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setUsuarios(usuariosMockados);
      setCarregando(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Usuários</Text>
      {carregando ? (
        <View style={styles.carregando}>
          <Text>Carregando usuários...</Text>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <FlatList
          data={usuarios}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.nome}>{item.nome}</Text>
              <Text>{item.email} | {item.telefone}</Text>
              <Text>{item.cidade}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, marginTop: 50 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  carregando: { alignItems: 'center', marginTop: 20 },
  card: { padding: 15, marginBottom: 10, backgroundColor: '#f0f0f0', borderRadius: 8 },
  nome: { fontSize: 18, fontWeight: 'bold' }
});
