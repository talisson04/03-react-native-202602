import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { tarefasMockadas } from '../data/tarefas';
import { Tarefa } from '../types/Tarefa';

export default function TelaDaListaDeTarefas() {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const [carregando, setCarregando] = useState(true);

  /* Este trecho simula um carregamento de dados.
   * Após 3 segundos, ele:
   * - Copia as tarefas simuladas (tarefasMockadas) para o "estado" tarefas.
   * - Altera o "estado" carregando para false.
   * - Faz a tela deixar de exibir o carregamento e mostrar a FlatList.
   * O timer armazena a referência do temporizador, que depois é cancelado pelo   
   * clearTimeout(timer) caso o componente seja desmontado antes dos 3 segundos.
   */
  useEffect(() => {
    const timer = setTimeout(() => {
      setTarefas(tarefasMockadas);
      setCarregando(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Minhas Tarefas</Text>
      {carregando ? (
        <View style={styles.carregando}>
          <Text>Carregando...</Text>
          <ActivityIndicator size="large" color="#0000ff" style={styles.indicador}/>
        </View>
      ) : (
        <FlatList
          data={tarefas}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <Text style={styles.item}>{item.id} - {item.titulo}</Text>}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, marginTop: 50 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  carregando: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  indicador: { marginTop: 12 },
  item: { paddingVertical: 8, fontSize: 16 },
});
