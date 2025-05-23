import { Entity } from "./models/entities/entity.js";

document.addEventListener("DOMContentLoaded", function () {
    const canvasElement = document.getElementById("canvas");

    if (!canvasElement) {
        console.error("Canvas element not found");
        return;
    }

    const entity = new Entity(100, 100, 50, 50, null, canvasElement.width, canvasElement.height);

});