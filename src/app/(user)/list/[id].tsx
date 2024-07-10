import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Image, ScrollView} from 'react-native';
import {Stack, useLocalSearchParams} from "expo-router";

import axios from 'axios';
import {defImgCat, Proxy, markS, lang, addressS, clockS, otv1, otv2, phoneS} from "@/utils/helper";
import {SvgUri} from "react-native-svg";

const ObjectPassport = () => {
    const {id} = useLocalSearchParams()

    const [objectData, setObjectData] = useState()


    useEffect(() => {
        id && axios.get(`${Proxy}/sc-gis/api/v1/repair-work/${id}`).then(res => {
            console.log(res.data)
            setObjectData(res.data)
console.warn('11111111')
        });

    }, [id])
    // console.warn(objectData? '1':'not')
    if (!objectData) {
        return <Text> Не найдено</Text>
    }
    return (
        <ScrollView style={styles.container}>
            <Stack.Screen options={{title: 'Паспорт'}}/>
            <Image
                source={objectData.subCategory.image ? {uri: Proxy + objectData.subCategory.image} : defImgCat}
                style={styles.image}
                resizeMode="cover"
            />
            <Text style={styles.text_title}> {objectData.address}</Text>
            <View style={styles.pass_info_wrapper}>
                <View style={styles.pass_info_cat}>
                    <SvgUri
                        width="50" // Укажите требуемую ширину
                        height="50" // Укажите требуемую высоту
                        uri={Proxy + objectData.subCategory?.icon}/>
                    <Text style={styles.text_line_cat} numberOfLines={2} ellipsizeMode="tail">
                        {objectData?.category?.name && objectData.category.name[lang]}
                        {(objectData?.subCategory?.name && objectData?.category?.name) && ' / '}
                        {objectData?.subCategory?.name && objectData.subCategory?.name[lang]}
                    </Text>
                </View>
                <View style={styles.pass_info_wrap}>
                    {/*Расположение*/}
                    <View style={styles.pass_info_block}>
                        <Text style={styles.text_line_title}> Расположение:</Text>
                        <View style={ {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                            <View style={styles.imgText}>
                                <Image source={markS} style={styles.image_icon} resizeMode="cover"/>
                                <Text style={{fontSize:20, opacity: 0.6, fontWeight: '500'}}>Район:</Text>
                            </View>
                            <Text style={styles.text_line}> {objectData.district.name[lang].slice(0, -6)}</Text>
                        </View>
                        <View style={ {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap:10}}>

                            <View style={styles.imgText}>
                                <Image source={addressS} style={styles.image_icon} resizeMode="cover"/>
                                <Text style={{fontSize:20, opacity: 0.6, fontWeight: '500'}}>Адрес:</Text>
                            </View>
                            <Text style={styles.to_long_text}> {objectData.address}</Text>
                        </View>
                    </View>
                    {/*сроки и статус*/}
                    <View style={styles.pass_info_block}>
                        <Text style={styles.text_line_title}> Сроки и статус:</Text>
                        <View style={styles.pass_info_inline}>
                            <Image source={clockS} style={styles.image_icon} resizeMode="cover"/>
                            <Text style={styles.text_line}> {objectData.startDate} - {objectData.endDate}</Text>
                        </View>
                        <View style={styles.pass_info_inline}>
                            <Text style={styles.text_circle}>⬤</Text>
                            <Text style={styles.text_line}> {objectData.status.name[lang]}</Text>
                        </View>
                    </View>
                    {/*Ответственные*/}
                    <View style={styles.pass_info_block}>
                        <Text style={styles.text_line_title}> Ответственные:</Text>
                        <View style={styles.pass_info_inline_uot}>
                            <View style={styles.text_head}>
                                <Image source={otv2} style={styles.image_icon} resizeMode="cover"/>
                                <Text style={styles.text_line}> Куратор:</Text>
                            </View>
                            <Text style={styles.text_line}> {objectData.department.name[lang]}</Text>
                        </View>
                        <View style={styles.pass_info_inline_uot}>
                            <View style={styles.text_head}>
                                <Image source={otv1} style={styles.image_icon} resizeMode="cover"/>
                                <Text style={styles.text_line}> Подрядчик:</Text>
                            </View>
                            <Text style={styles.text_line}> {objectData.contractor.name[lang]}</Text>
                        </View>

                    </View>
                    {/*подрядчик инфо*/}
                    <View style={styles.pass_info_block}>
                        <Text style={styles.text_line_title}> Информация о подрядчике:</Text>
                        <View style={ {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                            <View style={styles.imgText}>
                                <Image source={otv2} style={styles.image_icon} resizeMode="cover"/>
                                <Text style={{fontSize:20, opacity: 0.6, fontWeight: '500'}}>ФИО:</Text>
                            </View>
                            <Text style={styles.text_line}> {objectData.contractor.supervisor}</Text>
                        </View>
                        <View style={ {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                           <View style={styles.imgText}>
                               <Image source={phoneS} style={styles.image_icon} resizeMode="cover"/>
                               <Text style={{fontSize:20, opacity: 0.6, fontWeight: '500'}}>Телефон:</Text>
                           </View>

                            <Text style={styles.text_line}> {objectData.contractor.phone}</Text>
                        </View>
                    </View>
                    {/*Описание*/}
                    <View style={styles.pass_info_block}>
                        <Text style={styles.text_line_title}> Описание:</Text>
                        <View style={styles.pass_info_inline_uot}>

                            <Text style={styles.text_line}> {objectData.description}</Text>
                        </View>


                    </View>
                </View>
            </View>


            {/*<View style={styles.container}>

                <View style={styles.info}>
                    {objectData.category && (
                        <View style={styles.block_line}>
                            <SvgUri uri={Proxy + objectData.subCategory?.icon}/>
                            <Text style={styles.text60}>
                                {objectData?.category?.name && objectData.category.name[lang]}
                                {(objectData?.subCategory?.name && objectData?.category?.name) && ' / '}
                                {objectData?.subCategory?.name && objectData.subCategory?.name[lang]}</Text>
                        </View>
                    )}

                    {objectData?.district?.name && (
                        <View style={styles.block_line}>
                            <Image source={require('../../assets/images/mark.png')} style={styles.minSvg}/>
                            <Text>{objectData?.district?.name[lang]}</Text>
                        </View>
                    )}
                    {objectData.address && (
                        <View style={styles.block_line}>
                            <Image source={require('../../assets/images/adr.png')} style={styles.minSvg}/>
                            <Text style={styles.text60} numberOfLines={2} ellipsizeMode="tail">{objectData.address}</Text>
                        </View>
                    )}
                    {objectData?.status?.name && (
                        <View style={styles.block_line}>
                            <Text style={{color: objectData.status.color}}>⬤</Text>
                            <Text>{objectData.status.name[lang]}</Text>
                        </View>
                    )}
                </View>
            </View>*/}
        </ScrollView>
    );
};

export default ObjectPassport;

const styles = StyleSheet.create({
    container: {
        // Add your container styles here
    },
    text_title: {
        fontSize: 24,
        fontWeight: 'bold',
        padding: 10,
        textAlign: 'left',


    },
    image: {
        width: 'auto',
        minWidth: '100%',
        aspectRatio: 1 / 0.40,
    },
    pass_info_wrapper: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        padding: 10,
        paddingHorizontal: 20,
        gap: 10,
    },
    pass_info_wrap: {
        display: 'flex',
        gap: 10,
        width: '100%',

    },
    pass_info_block: {
        padding: 10,
        backgroundColor: 'white',
        width: '100%',
        borderRadius: 8,
        gap: 10,
    },
    pass_info_inline: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        gap: 10,
        alignSelf: 'flex-start',
        paddingLeft: 10

    },
    pass_info_inline_uot: {
        width: '100%',
        display: 'flex',
        alignItems: 'flex-start',
        flexDirection: 'column',
        gap: 10,
        alignSelf: 'flex-start',
        paddingLeft: 10,
        justifyContent: 'flex-start',
    },
    pass_info_cat: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        gap: 10,
        alignSelf: 'flex-start',
        paddingLeft: 10,

    },
    text_line: {
        fontSize: 20,

    },
    text_line_cat: {
        width: '100%',
        fontSize: 22,
    },
    image_icon: {
        width: 25,
        height: 25,


    },
    text_circle: {
        fontSize: 22,
        paddingVertical: 1.2,
        color: '#146EB0'
    },
    cat_icon: {},
    text_head: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: 5

    },
    text_line_title: {
        fontSize: 20,
        fontWeight: 'bold',
        opacity: 0.6,
    },
    imgText:{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        gap:5,

    },
    to_long_text:{
        width: '70%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        fontSize: 20,
        textAlign: 'right',
    }
});
