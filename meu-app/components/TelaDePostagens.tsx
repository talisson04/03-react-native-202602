import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';

interface Post { id: number; title: string; body: string; }

export default function TelaDePostagens() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then((data: Post[]) => {
        setPosts(data);
        setCarregando(false);
      });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Postagens da API</Text>
      {carregando ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.postTitle}>{item.title}</Text>
              <Text>{item.body}</Text>
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
  card: { padding: 15, marginBottom: 15, backgroundColor: '#f9f9f9', borderRadius: 8 },
  postTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 5, textTransform: 'capitalize' }
});
