/**
 * implementation of the test for the entity class
 * @jest-environment jsdom
 * @jest-environment-options {"resources": "usable", "runScripts": "dangerously"}
 *
 */
import { Entity } from "../src/js/models/entities/entity.js";
import { SpriteSheet } from "../src/js/models/spriteSheet.js";
import { Canvas } from "../src/js/models/canvas.js";
import { Game } from "../src/js/models/game.js";

describe("Entity Class", () => {
  let entity;
  let canvasElement;
  let context;

  beforeEach(() => {
    // Create a mock canvas element
    canvasElement = document.createElement("canvas");
    canvasElement.width = 800;
    canvasElement.height = 600;
    document.body.appendChild(canvasElement);

    // Create a mock context
    context = canvasElement.getContext("2d");

    // Create a mock sprite sheet
    const spriteSheet = new SpriteSheet("path/to/sprite.png", 32, 32);
    entity = new Entity(100, 100, 50, 50, spriteSheet, canvasElement.width, canvasElement.height);
  });

  afterEach(() => {
    // Clean up the canvas element after each test
    document.body.removeChild(canvasElement);
  });

  test("should create an entity with default width and height", () => {
    const defaultEntity = new Entity(100, 100, undefined, undefined, null, canvasElement.width, canvasElement.height);
    expect(defaultEntity.width).toBe(40); // Default width
    expect(defaultEntity.height).toBe(32); // Default height
  });

  test("should update entity position", () => {
    entity.x = 200;
    entity.y = 200;
    entity.update();
    expect(entity.x).toBe(200);
    expect(entity.y).toBe(200);
  });

  test("should draw the entity on the canvas", () => {
    const drawSpy = jest.spyOn(entity.spriteSheet, "drawFrame");
    entity.draw(context);
    expect(drawSpy).toHaveBeenCalledWith(context, entity.spriteName, entity.x, entity.y);
  });

  test("should detect collision with another entity", () => {
    const otherEntity = new Entity(120, 120, 50, 50, null, canvasElement.width, canvasElement.height);
    expect(entity.collidesWith(otherEntity)).toBe(true);
  });

  test("should not detect collision with another entity", () => {
    const otherEntity = new Entity(200, 200, 50, 50, null, canvasElement.width, canvasElement.height);
    expect(entity.collidesWith(otherEntity)).toBe(false);
  });

  test("should wrap around the screen", () => {
    entity.x = -50;
    entity.screenWrap();
    expect(entity.x).toBe(canvasElement.width);

    entity.x = canvasElement.width + 50;
    entity.screenWrap();
    expect(entity.x).toBe(0);

    entity.y = -50;
    entity.screenWrap();
    expect(entity.y).toBe(canvasElement.height);

    entity.y = canvasElement.height + 50;
    entity.screenWrap();
    expect(entity.y).toBe(0);
  });

  test("should not wrap around the screen if within bounds", () => {
    entity.x = 100;
    entity.y = 100;
    entity.screenWrap();
    expect(entity.x).toBe(100);
    expect(entity.y).toBe(100);
  });

});