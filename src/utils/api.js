export async function fetchMarketResearch(productIdea) {
  const response = await fetch("http://localhost:5001/api/research", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ product_idea: productIdea }),
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.detail || "Failed to fetch research");
  }

  return await response.json();
}
