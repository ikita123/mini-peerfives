# Mini Peerfives

Mini Peerfives allows users to reward other people with peerfives (P5) points.

## Getting Started

### Backend

1. Clone the repository and navigate to the `backend` directory:
    ```sh
    git clone git@github.com:ikita123/mini-peerfives.git
    cd mini-peerfives/backend
    ```

2. Install dependencies and start the server:
    ```sh
    npm install
    npm start
    ```

### Frontend

1. Navigate to the `frontend` directory:
    ```sh
    cd ../frontend
    ```

2. Install dependencies and start the application:
    ```sh
    npm install
    npm start
    ```

## Problem Statement

Mini Peerfives allows users to reward other people with peerfives (P5) points.

**Understand 2 terms:**
- P5: Points that can be given to others
- Rewards: Points that are earned and cannot be given to others

**Use cases:**
1. Person A gives 50 P5 points to Person B.
2. Person B gives 50 P5 points to Person A.
3. Person A gives 75 P5 points to Person B (not possible if insufficient balance).
4. Person A deletes 1st transaction of P5.

## Completed

### Backend
- Set up Express server with MongoDB.
- Created User and Reward models.
- Implemented User and Reward controllers and routes.

### Frontend
- Created React components for:
  - User list view.
  - New user creation.
  - User detail view.
  - P5 history.
  - Reward history.
  - New reward creation.
