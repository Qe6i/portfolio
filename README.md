# My Portfolio

Welcome to my GitHub portfolio. 

This repository serves as a central hub for showcasing my coding projects, experiments, and learning progress.

Each project is organized into a **separate branch**, which allows for clean separation and easier navigation.

---

## How to Explore Projects

To browse individual projects:

1. Click on the **"Branch" selector** at the top of the repository.
2. Select the branch with the project you want to explore.
3. Each branch contains its own README file with a description, features, and usage instructions.

---

## Technologies Used

Across the branches, you'll find a variety of technologies including:

- Python
- Flask
- C#
- C++
- .NET
- HTML
- CSS
- JS
- PHP 
- SQL

---

# Ball Growth Simulation

This project is a visual simulation of bouncing balls within a circular or fullscreen canvas. It demonstrates basic 2D physics, collision handling, and rendering using the HTML5 `<canvas>` element.

---

## Available Versions (Snapshots)

I decided to snapshot and maintain **three different versions** of this simulation:

### 1. Fullscreen Canvas
- The canvas fills the entire screen (`canvas = screen`).
- Balls bounce off the edges of the window.
- Great for observing how the balls behave in a rectangular space.

### 2. Circle Canvas – Instant Balls
- The canvas is a perfect circle.
- **10,000 balls** are created immediately at the start.
- High-density, chaotic simulation inside a bounded circle.

### 3. Circle Canvas – Gradual Growth _(this branch)_
- The canvas is a circle centered in the screen.
- Starts with one ball on user click.
- Additional balls are added continuously over time.
- Ball count is displayed in the top-left corner.

---

## Technologies Used

- **HTML5** – structure and canvas container
- **CSS3** – responsive styling and centered layout
- **JavaScript (vanilla)** – logic for:
  - Ball movement and direction
  - Boundary collision and reflection
  - Dynamic rendering on canvas
  - Real-time counter

---

## Notes

- Maximum number of balls is capped at 10,000 to prevent performance issues.
- Color for each ball is randomly chosen from a predefined palette.

