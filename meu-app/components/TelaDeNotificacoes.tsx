import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';

interface Notificacao { id: number; mensagem: string; lida: boolean; }

const notificacoesMockadas: Notificacao[] = [
  { id: 1, mensagem: 'Bem-vindo ao app!', lida: false },
  { id: 2, mensagem: 'Seu perfil foi atualizado.', lida: true },
];
// Para testar lista vazia, altere para: const notificacoesMockadas: Notificacao[] = [];

export default function TelaDeNotificacoes() {
  const [notificacoes, setNotificacoes] = useState<Notificacao[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setNotificacoes(notificacoesMockadas);
      setCarregando(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const naoLidas = notificacoes.filter(n => !n.lida).length;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notificações</Text>
      
      {carregando && <ActivityIndicator size="large" />}
      
      {!carregando && notificacoes.length === 0 && (
        <Text style={styles.vazio}>Nenhuma notificação encontrada</Text>
      )}

      {!carregando && notificacoes.length > 0 && (
        <>
          <Text style={styles.contador}>Não lidas: {naoLidas}</Text>
          <FlatList
            data={notificacoes}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <Text style={[styles.item, !item.lida && styles.negrito]}>
                {item.mensagem}
              </Text>
            )}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, marginTop: 50 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  contador: { fontSize: 16, marginBottom: 15, color: '#555' },
  vazio: { fontSize: 16, textAlign: 'center', marginTop: 20 },
  item: { padding: 15, borderBottomWidth: 1, borderBottomColor: '#eee', fontSize: 16 },
  negrito: { fontWeight: 'bold' }
});
