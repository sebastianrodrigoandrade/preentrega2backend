export const productValidator = (req, res, next) => {
    const { title, description, code, price, stock, category, thumbnails } = req.body;

    if (!title || !description || !code || !price || !stock || !category || !thumbnails) {
        return res.status(400).json({ msg: "Please provide all required fields" });
    }

    req.body.status = true;
    next();
};  
