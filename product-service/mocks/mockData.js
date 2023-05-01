export const products = [
  {
    description: "Gravel Bike - glossy metallic midnight blue",
    id: "bc-1",
    price: 2400,
    title: "Bombtrack"
  },
  {
    description: "KATHMANDU HYBRID - grey / silver",
    id: "bc-2",
    price: 3540,
    title: "CUBE"
  },
  {
    description: "SCALPEL CARBON - Mountainbike ",
    id: "bc-3",
    price: 1980,
    title: "Cannondale"
  },
  {
    description: "KANZO ADVENTURE - Carbon Gravel Bike",
    id: "bc-4",
    price: 2565,
    title: "Ridley"
  },
  {
    description: "ANEMOS Masterpiece Get Fast - Carbon Gravel Bike",
    id: "bc-5",
    price: 3450,
    title: "Parapera"
  },
  {
    description: "Electric Trekking Bike - gold brown",
    id: "bc-6",
    price: 4100,
    title: "FOCUS AVENTURA 2"
  },
]

export const stocks = [
  {
    id: "bc-1",
    count: 2
  },
  {
    id: "bc-2",
    count: 7
  },
  {
    id: "bc-3",
    count: 1
  },
  {
    id: "bc-4",
    count: 5
  },
  {
    id: "bc-5",
    count: 11
  },
  {
    id: "bc-6",
    count: 2
  },
]

export class MockDataService {
  static getData () {
    return  Promise.resolve({
      products: products,
      stocks: stocks
    });  
  } 
} 
