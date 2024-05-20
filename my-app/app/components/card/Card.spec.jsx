import React from "react";
import { expect, test, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Card, { CardSVG } from "./Card";

describe("Card component", () => {
  const mockCard = "ace:heart"; // Mock card data

  test("renders with face up", () => {
    const { getByTestId } = render(
      <Card
        isFaceUp={true}
        isDraggable={false}
        card={mockCard}
        doubleClickHandler={vi.fn()}
        clickHandler={vi.fn()}
      />,
    );

    const cardElement = getByTestId("card_ace:heart");
    expect(cardElement).toBeInTheDocument();
    expect(cardElement).toHaveStyle("backgroundImage: url('card-sprite.png')");
  });

  test("renders with face down", () => {
    const { getByTestId } = render(
      <Card
        isFaceUp={false}
        isDraggable={false}
        card={mockCard}
        doubleClickHandler={vi.fn()}
        clickHandler={vi.fn()}
      />,
    );

    const cardElement = getByTestId("card_facedown");
    expect(cardElement).toBeInTheDocument();
    expect(cardElement).toHaveStyle(
      "backgroundImage: url('card-back-red.png')",
    );
  });

  test("calls click handler on click", () => {
    const clickHandler = vi.fn();
    const { getByTestId } = render(
      <Card
        isFaceUp={true}
        isDraggable={false}
        card={mockCard}
        doubleClickHandler={vi.fn()}
        clickHandler={clickHandler}
      />,
    );

    const cardElement = getByTestId("container_ace:heart");
    fireEvent.click(cardElement);
    expect(clickHandler).toHaveBeenCalled();
  });

  test("calls double click handler on double click", () => {
    const doubleClickHandler = vi.fn();
    const { getByTestId } = render(
      <Card
        isFaceUp={true}
        isDraggable={false}
        card={mockCard}
        doubleClickHandler={doubleClickHandler}
        clickHandler={vi.fn()}
      />,
    );

    const cardElement = getByTestId("card_ace:heart");
    fireEvent.doubleClick(cardElement);
    expect(doubleClickHandler).toHaveBeenCalled();
  });
});

describe("CardSVG component", () => {
  const mockCard = "ace:heart"; // Mock card data

  test("renders correctly", () => {
    const { getByTestId } = render(<CardSVG card={mockCard} />);
    const svgElement = getByTestId("card_ace:heart");
    expect(svgElement).toBeInTheDocument();
  });
});
