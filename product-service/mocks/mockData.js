const data = [
  {
    description: "Gravel Bike - glossy metallic midnight blue",
    id: "bc-1",
    price: 2400,
    title: "Bombtrack",
    count: 1
  },
  {
    description: "KATHMANDU HYBRID - grey / silver",
    id: "bc-2",
    price: 3540,
    title: "CUBE",
    count: 1
  },
  {
    description: "SCALPEL CARBON - Mountainbike ",
    id: "bc-3",
    price: 1980,
    title: "Cannondale",
    count: 1
  },
  {
    description: "KANZO ADVENTURE - Carbon Gravel Bike",
    id: "bc-4",
    price: 2565,
    title: "Ridley",
    count: 1
  },
  {
    description: "ANEMOS Masterpiece Get Fast - Carbon Gravel Bike",
    id: "bc-5",
    price: 3450,
    title: "Parapera",
    count: 1
  },
  {
    description: "Electric Trekking Bike - gold brown",
    id: "bc-6",
    price: 4100,
    title: "FOCUS AVENTURA",
    count: 1
  },
]

export class MockDataService {
  static getData () {
    return  Promise.resolve(data);  
  } 
} 
