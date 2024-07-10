type Mark = {
    type: string;
    coordinates: any | null;
} | null;

type DirectoryType = {
    nameKz: string;
    nameRu: string;
    [key: string]: string;  // Добавили индексное свойство
};

type Category = {
    id: number;
    name: DirectoryType;
};

type SubCategory = {
    id: number;
    name: DirectoryType | null;
    icon: string;
    image: string;
};

type Status = {
    id: number;
    name: DirectoryType | null;
    color: string;
};

type District = {
    id: number;
    name: DirectoryType | null;
};

export type MapObject = {
    id: number;
    address: string;
    marker: Mark | null;
    building: string;
    category: Category | null; //  Category  может  быть  null
    status: Status | null;   //  Status  может  быть  null
    pos: number;
    neg: number;
    startDate: string;
    endDate: string;
    district: District | null; //  District  может  быть  null
    subCategory: SubCategory | null; //  SubCategory  может  быть  null
    geom: Mark | null;          //  Geom  может  быть  null
    microDistrict: Category | null;
    street: Category | null;
    corpus: string;
};


export interface MapObjectData {
    id: number;
    address: string;
    marker: {
        type: string;
        coordinates: number[];
    };
    //  ...  остальные свойства
}
