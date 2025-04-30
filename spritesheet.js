class SpriteSheet {
    constructor(imagePath, frameData, onLoad) {
        this.image = new Image();
        this.frameData = frameData;
        this.image.onload = onLoad;
        this.image.src = imagePath;
    }

    drawFrame(context, frameName, x, y) {
        const frame = this.frameData.frames[frameName].frame;
        context.drawImage(this.image, frame.x, frame.y, frame.w, frame.h, x, y, frame.w, frame.h);
    }
}