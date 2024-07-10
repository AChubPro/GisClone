import {StyleSheet, Text, View, Image, Pressable} from 'react-native';
import {SvgUri} from 'react-native-svg';
import {MapObject} from '@/types';
import {Link, useSegments} from 'expo-router'
export const defImgCat = '@assets/images/defImg.png'
type MapObjectListItemProps = {
    data: MapObject;
    lang: string; // Используем тип Lang
    Proxy: string;
    isSelected: boolean;
    onPress: () => void;
};
const MapObjectListItem = ({ data, lang, Proxy, isSelected, onPress }: MapObjectListItemProps) => {
const segments = useSegments()
    console.log('segments', segments)
    return (

        <Link href={`/${segments[0]}/list/${data.id}`} asChild>
            <View style={[styles.container_wrap, isSelected && styles.selected]}>
                <Pressable onPress={onPress}>
            <Text style={styles.title_name} numberOfLines={2} ellipsizeMode="tail">{data.address}</Text>
            <View style={styles.container}>
                {data.subCategory && (
                    <Image source={{uri: Proxy + data.subCategory?.image} || defImgCat}
                           style={styles.image}
                    resizeMode={'contain'}
                    />
                )}
                <View style={styles.info}>
                    {data.category && (
                        <View style={styles.block_line}>
                            <SvgUri uri={Proxy + data.subCategory?.icon}/>
                            <Text style={styles.text60}>
                                {data?.category?.name && data.category.name[lang]}
                                {(data?.subCategory?.name && data?.category?.name) && ' / '}
                                {data?.subCategory?.name && data.subCategory?.name[lang]}</Text>
                        </View>
                    )}

                    {data?.district?.name && (
                        <View style={styles.block_line}>
                            <Image source={require('@/assets/images/mark.png')} style={styles.minSvg}/>
                            <Text>{data?.district?.name[lang]}</Text>
                        </View>
                    )}
                    {data.address && (
                        <View style={styles.block_line}>
                            <Image source={require('@/assets/images/adr.png')} style={styles.minSvg}/>
                            <Text style={styles.text60} numberOfLines={2} ellipsizeMode="tail">{data.address}</Text>
                        </View>
                    )}
                    {data?.status?.name && (
                        <View style={styles.block_line}>
                            <Text style={{color: data.status.color}}>⬤</Text>
                            <Text>{data.status.name[lang]}</Text>
                        </View>
                    )}
                </View>
            </View>
                </Pressable>
            </View>
        </Link>
    );
};

export default MapObjectListItem;
const styles = StyleSheet.create({
    container_wrap: {

        flex: 1,
        backgroundColor: 'white',
        padding: 5,
        borderRadius: 15,
    },
    selected: {
        backgroundColor: 'lightblue',
    },
    title_name: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
    },
    container: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        gap: 10,

        padding: 5,
        overflow: 'hidden',

    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
    image: {
        width: '30%',
        aspectRatio: 1,
    },
    info: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 5,
    },
    block_line: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: 10,
        flexWrap: 'wrap',
    },
    minSvg: {
        resizeMode: 'contain',
        height: 15,
    },
    text60: {
        display: 'flex',
        flexWrap: 'wrap',
        maxWidth: '60%'
    },
    text70: {
        display: 'flex',
        flexWrap: 'wrap',
        maxWidth: '70%'
    }
});
