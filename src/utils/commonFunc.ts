const commonFunc = {
    addSTTForList: (arr, start) => {
        if (!arr) return [];
        return arr.map((ele, index) => ({
            key: index,
            stt: index + 1 + start,
            ...ele,
        }));
    },

    getBase64: (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    },

    isEmpty: (obj: any) =>
        [Object, Array].includes((obj || {}).constructor) &&
        !Object.entries(obj || {}).length
};

export default commonFunc;
