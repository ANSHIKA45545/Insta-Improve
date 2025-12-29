import path from "path";

const parser = new DataUriParaser();

const getDataUri = (file) => {
    const extName = path.extname(file.originalname).toString();
    return paraser.format(extName, file.buffer).content;
};

export default getDataUri;