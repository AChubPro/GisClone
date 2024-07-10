import React, { useState } from 'react';
import { StyleSheet, Dimensions, TouchableOpacity, View, Button } from 'react-native';
import MapView, {Marker, Polygon, UrlTile, Polyline} from 'react-native-maps';
import Ionicons from '@expo/vector-icons/Ionicons';  // Или любой другой набор иконок
import gisData from '@/assets/data/gisData';
import  { useNavigation } from  '@react-navigation/native';

interface MapScreenProps {
    selectedObjectId: number | null;
    onSelectObject: (objectId: number) => void;
}
const MapScreen:React.FC<MapScreenProps> = ({selectedObjectId, onSelectObject}) => {
    const [region, setRegion] = useState({
        latitude: 43.2565,   // Широта Алматы
        longitude: 76.9285,  // Долгота Алматы
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });

    const handleZoomIn = () => {
        setRegion({
            ...region,
            latitudeDelta: region.latitudeDelta / 2,
            longitudeDelta: region.longitudeDelta / 2,
        });
    };

    const handleZoomOut = () => {
        setRegion({
            ...region,
            latitudeDelta: region.latitudeDelta * 2,
            longitudeDelta: region.longitudeDelta * 2,
        });
    };
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={region}
                region={region} // Добавили region
            >
                <UrlTile
                    urlTemplate="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    zIndex={0}
                />
                {gisData?.map((object) => (
                    object.marker && object.marker.coordinates &&  (
                        <Marker
                            key={object.id}
                            coordinate={{
                                latitude: object.marker.coordinates[1],
                                longitude: object.marker.coordinates[0],
                            }}
                            title={object.address}
                        />
                    )
                ))}
                {gisData.map((object) => {
                    if (object.geom && object.geom.coordinates) {

                        // 💡  Корректная обработка координат:
                        const coordinates = object.geom.coordinates.map((polygon: number[][][]) =>
                            polygon[0].map((coord: number[]) => ({
                                latitude: coord[1],
                                longitude: coord[0],
                            }))
                        );

                        if (object.geom.type === 'MultiPolygon') {
                            return (
                                <Polygon
                                    key={object.id}
                                    coordinates={coordinates[0]} //  Передаем первый элемент массива
                                    fillColor="rgba(0, 128, 255, 0.5)"
                                    strokeColor="blue"
                                    strokeWidth={2}
                                />
                            );
                        } else if (object.geom.type === 'MultiLineString') {
                            return (
                                <Polyline
                                    key={object.id}
                                    coordinates={coordinates[0]}  //  Передаем первый элемент массива
                                    strokeColor="red"
                                    strokeWidth={3}
                                />
                            );
                        }
                    }
                })}
            </MapView>
            <View style={styles.zoomControls}>
                <TouchableOpacity onPress={handleZoomIn} style={styles.zoomButton}>
                    <Ionicons name="add" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleZoomOut} style={styles.zoomButton}>
                    <Ionicons name="remove" size={24} color="black" />
                </TouchableOpacity>
            </View>
        </View>

    );
}
export default MapScreen;
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    zoomControls: {
        position: 'absolute',
        top: 50,
        left: 16,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    zoomButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
});
