"use client";

import { useState } from "react";

export function useBoard(initialBoard) {
  const [board, setBoard] = useState(initialBoard || null);
  const [columns, setColumns] = useState(initialBoard?.columns);
  const [error, setError] = useState(null);

  // move job action
  async function moveJob(jobApplicationId, newColumnId, newOrder) {}

  return { board, columns, error, moveJob };
}
