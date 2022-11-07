import { createContext, useEffect, useState } from "react";

// import { addCollectionAndDocument } from "../utils/firebase/firebase.utils.js";

// import SHOP_DATA from '../shop-data.js';
import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils.js";

export const CategoriesContext = createContext({
    categoriesMap: {},
});

export const CategoriesProvider = ({children}) => {
    const [categoriesMap, setCategoriesMap] = useState({});

    // For adding data from frontend to firestore, need to use only once

    // useEffect(() => {
    //     addCollectionAndDocument('categories', SHOP_DATA )
    // }, []);

    useEffect(() => {
        const getCategoriesMap = async () => {
            const categoryMap = await getCategoriesAndDocuments();
            setCategoriesMap(categoryMap)
        }

        getCategoriesMap();
    }, [])

    const value= {categoriesMap};

    return <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>
}