import React from 'react';
import { StyleSheet, Text, View, FlatList, Pressable } from 'react-native';
import gisData from '@/assets/data/gisData';
import MapObjectListItem from '@components/MapObjListItem';
import { Proxy } from '@/utils/helper';

// Тип для пропсов
type ListScreenProps = {
    selectedObjectId: number | null;
    onSelectObject: ((id: number) => void) | undefined;
};

const ListScreen: React.FC<ListScreenProps> = ({ selectedObjectId, onSelectObject }) => {
    return (
        <View style={styles.containerWrapper}>
            <FlatList
                data={gisData}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <MapObjectListItem
                        data={item}
                        lang="nameRu"
                        Proxy={Proxy}
                        // isSelected={item.id === selectedObjectId}

                    />
                )}
                numColumns={1}
                contentContainerStyle={styles.contentContainer}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    containerWrapper: {
        flex: 1,
    },
    contentContainer: {
        gap: 10,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5,
    },
});

export default ListScreen;
