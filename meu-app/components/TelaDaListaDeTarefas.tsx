import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Tarefa } from '../types/Tarefa';

const tarefasMockadas: Tarefa[] = [
  { id: 1, titulo: 'Estudar React', concluida: false },
  { id: 2, titulo: 'Criar app com Expo', concluida: false },
  { id: 3, titulo: 'Revisar aula de TypeScript', concluida: false },
];

export default function TelaDaListaDeTarefas() {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTarefas(tarefasMockadas);
      setCarregando(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const alternarConclusao = (id: number) => {
    setTarefas(tarefas.map(t => t.id === id ? { ...t, concluida: !t.concluida } : t));
  };

  const quantidadeConcluidas = tarefas.filter(t => t.concluida).length;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Minhas Tarefas</Text>
      
      {carregando ? (
        <View style={styles.carregando}>
          <Text>Carregando...</Text>
          <ActivityIndicator size="large" color="#0000ff" style={styles.indicador} />
        </View>
      ) : (
        <>
          <Text style={styles.contador}>Concluídas: {quantidadeConcluidas} de {tarefas.length}</Text>
          <FlatList
            data={tarefas}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => alternarConclusao(item.id)}>
                <Text style={[styles.item, item.concluida && styles.riscado]}>
                  {item.id} - {item.titulo}
                </Text>
              </TouchableOpacity>
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
  contador: { fontSize: 16, marginBottom: 20, color: 'gray' },
  carregando: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  indicador: { marginTop: 12 },
  item: { paddingVertical: 8, fontSize: 16 },
  riscado: { textDecorationLine: 'line-through', color: 'gray' }
});
