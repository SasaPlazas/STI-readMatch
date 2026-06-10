import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { Screen } from '../components/Screen';
import { TopBar } from '../components/TopBar';
import { BookCover } from '../components/BookCover';
import { Pill } from '../components/Pill';
import { RMButton } from '../components/RMButton';
import { supabase } from '../lib/supabase';
import { colors, radii } from '../theme/tokens';
import { routes } from '../navigation/routes';

export function BookScreen({ navigation, route }) {
  const { bookId, groupId } = route.params ?? {};
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!bookId) { setLoading(false); return; }
    supabase
      .from('books')
      .select('id, nombre_libro, autor, genero, complejidad_narrativa, idiomas, trope, duracion_aprox, descripcion, cover_url, anio_publicacion')
      .eq('id', bookId)
      .maybeSingle()
      .then(({ data }) => { setBook(data); setLoading(false); });
  }, [bookId]);

  if (loading) {
    return (
      <Screen backgroundColor={colors.cream}>
        <TopBar subtitle="Book" title={null} onBack={() => navigation.goBack()} />
        <ActivityIndicator color={colors.purple} style={{ marginTop: 60 }} />
      </Screen>
    );
  }

  if (!book) {
    return (
      <Screen backgroundColor={colors.cream}>
        <TopBar subtitle="Book" title={null} onBack={() => navigation.goBack()} />
        <View style={styles.empty}>
          <Text style={styles.emptyText}>Libro no encontrado</Text>
        </View>
      </Screen>
    );
  }

  const langs = book.idiomas
    ? book.idiomas.split(';').map((l) => l.trim()).filter(Boolean)
    : [];

  return (
    <Screen
      backgroundColor={colors.cream}
      footer={
        <View style={{ gap: 10 }}>
          <RMButton
            title="Read AI reasoning"
            variant="dark"
            onPress={() => navigation.navigate(routes.Explain)}
          />
        </View>
      }
    >
      <TopBar
        subtitle={`Book · ${book.genero ?? ''}`}
        title={book.nombre_libro}
        onBack={() => navigation.goBack()}
      />

      <View style={styles.hero}>
        <BookCover book={book} w={160} h={228} tilt={-2} />
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>{book.nombre_libro}</Text>
          <Text style={styles.author}>{book.autor}</Text>
          {book.anio_publicacion ? (
            <Text style={styles.year}>{book.anio_publicacion}</Text>
          ) : null}
          <View style={styles.pills}>
            {book.genero ? <Pill label={book.genero} tone="lime" /> : null}
            {book.complejidad_narrativa ? (
              <Pill label={`Complejidad: ${book.complejidad_narrativa}`} tone="purple" />
            ) : null}
            {book.duracion_aprox ? <Pill label={book.duracion_aprox} tone="glass" /> : null}
          </View>
        </View>
      </View>

      {book.descripcion ? (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Descripción</Text>
          <Text style={styles.body}>{book.descripcion}</Text>
        </View>
      ) : null}

      {(book.trope || langs.length > 0 || book.duracion_aprox) ? (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Detalles</Text>
          <View style={styles.details}>
            {book.trope ? (
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Tropo</Text>
                <Text style={styles.detailValue}>{book.trope}</Text>
              </View>
            ) : null}
            {langs.length > 0 ? (
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Idiomas</Text>
                <Text style={styles.detailValue}>{langs.join(' · ')}</Text>
              </View>
            ) : null}
            {book.duracion_aprox ? (
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Duración</Text>
                <Text style={styles.detailValue}>{book.duracion_aprox}</Text>
              </View>
            ) : null}
          </View>
        </View>
      ) : null}

    </Screen>
  );
}

const styles = StyleSheet.create({
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 80,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '700',
    color: 'rgba(22,16,46,0.4)',
  },
  hero: {
    paddingHorizontal: 22,
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
    paddingTop: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: '900',
    color: colors.ink,
    letterSpacing: -0.4,
  },
  author: {
    marginTop: 6,
    fontStyle: 'italic',
    color: 'rgba(22,16,46,0.65)',
    fontWeight: '600',
  },
  year: {
    marginTop: 3,
    fontSize: 11,
    fontWeight: '700',
    color: 'rgba(22,16,46,0.4)',
    letterSpacing: 0.3,
  },
  pills: {
    marginTop: 12,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  card: {
    marginTop: 14,
    marginHorizontal: 22,
    backgroundColor: colors.white,
    borderRadius: radii.xl,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(22,16,46,0.06)',
  },
  cardTitle: {
    fontWeight: '900',
    color: colors.ink,
    fontSize: 14,
    letterSpacing: -0.2,
  },
  body: {
    marginTop: 10,
    color: 'rgba(22,16,46,0.75)',
    fontWeight: '600',
    lineHeight: 18,
  },
  details: {
    marginTop: 10,
    gap: 8,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 12,
  },
  detailLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: 'rgba(22,16,46,0.4)',
    letterSpacing: 0.4,
    textTransform: 'uppercase',
    flexShrink: 0,
  },
  detailValue: {
    flex: 1,
    textAlign: 'right',
    fontSize: 13,
    fontWeight: '700',
    color: colors.ink,
  },
  footer: {
    position: 'absolute',
    left: 22,
    right: 22,
    bottom: 26,
  },
});
