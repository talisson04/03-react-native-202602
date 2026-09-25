import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';

interface ItemCompra { id: number; nome: string; quantidade: number; }

const itensMockados: ItemCompra[] = [
  { id: 1, nome: 'Maçã', quantidade: 5 },
  { id: 2, nome: 'Pão', quantidade: 2 },
];

export default function TelaDaListaDeCompras() {
  const [itens, setItens] = useState<ItemCompra[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setItens(itensMockados);
      setCarregando(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Compras</Text>
      {carregando ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={itens}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Text style={styles.item}>{item.quantidade}x {item.nome}</Text>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, marginTop: 50 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  item: { paddingVertical: 8, fontSize: 16, borderBottomWidth: 1, borderBottomColor: '#ccc' }
});
