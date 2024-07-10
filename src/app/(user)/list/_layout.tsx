import {Link, Stack, useRouter, useLocalSearchParams} from "expo-router";
import React from "react";

import ListScreen from './index'; //  💡  Импортируем ListScreen
export default function MenuStack() {
    const router = useRouter();
    const params = useLocalSearchParams();

    // 💡  Проверяем наличие параметров
    const selectedObjectId = params.selectedObjectId ? Number(params.selectedObjectId) : null;
    const onSelectObject = params.onSelectObject ? (id: number) => {
        // 💡  Реализуем логику передачи onSelectObject в MapAndList
        router.push({ pathname: `/(user)/list`, params: { selectedObjectId: id } });
    } : undefined;

    // 💡 Передаем параметры только если они есть
    return <ListScreen selectedObjectId={selectedObjectId} onSelectObject={onSelectObject ? onSelectObject : undefined } />;
}
