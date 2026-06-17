const { Jimp } = require("jimp");
const jsQR = require("jsqr");

async function decodeQR(imagePath) {

    const image = await Jimp.read(imagePath);

    const { data, width, height } =
        image.bitmap;

    const result = jsQR(
        new Uint8ClampedArray(data),
        width,
        height
    );

    if (!result) {
        throw new Error(
            "No QR code found"
        );
    }

    return result.data;
}

module.exports = decodeQR;