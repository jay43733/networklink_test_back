const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const prisma = require("../config/prisma");

const productData = [
  {
    title: "Hot Coffee",
    imagePath:
      "https://res.cloudinary.com/dp7ggau3r/image/upload/v1734528681/coffee-mug.png",
    description:
      "Rich, aromatic hot coffee with a deep, bold flavor. Smooth, slightly bitter taste, warm steam rising, comforting and invigorating with every sip.",
    price: 100,
    isRecommended: false,
    category: "coffee",
  },
  {
    title: "Iced Coffee",
    imagePath:
      "https://res.cloudinary.com/dp7ggau3r/image/upload/v1734528608/ice-coffee.png",
    description:
      "Chilled coffee with a smooth, refreshing taste. Perfectly balanced sweetness and boldness for a cooling pick-me-up.",
    price: 90,
    isRecommended: false,
    category: "coffee",
  },
  {
    title: "Espresso",
    imagePath:
      "https://res.cloudinary.com/dp7ggau3r/image/upload/v1734528575/espresso.png",
    description:
      "Strong, concentrated coffee shot with intense flavor and a velvety crema. Ideal for quick energy boosts or coffee aficionados.",
    price: 120,
    isRecommended: false,
    category: "coffee",
  },
  {
    title: "Chocolate Shake",
    imagePath:
      "https://res.cloudinary.com/dp7ggau3r/image/upload/v1734528313/chocolate-shake.png",
    description:
      "Creamy, chilled chocolate shake bursting with rich cocoa flavor. A decadent treat for chocolate lovers.",
    price: 110,
    isRecommended: false,
    category: "nonCoffee",
  },
  {
    title: "Yoghurt",
    imagePath:
      "https://res.cloudinary.com/dp7ggau3r/image/upload/v1734528308/yoghurt.png",
    description:
      "Smooth, creamy yogurt with a rich, tangy taste. Packed with nutrients, perfect as a snack or meal addition.",
    price: 100,
    isRecommended: false,
    category: "nonCoffee",
  },
  {
    title: "Orange Juice",
    imagePath:
      "https://res.cloudinary.com/dp7ggau3r/image/upload/v1734528306/orange-juice.png",
    description:
      "Freshly squeezed orange juice with a tangy, citrusy burst of flavor. A refreshing and vitamin-rich choice.",
    price: 100,
    isRecommended: false,
    category: "nonCoffee",
  },
  {
    title: "Red Soda",
    imagePath:
      "https://res.cloudinary.com/dp7ggau3r/image/upload/v1734528305/red-soda.png",
    description:
      "Fizzy and sweet red soda with a vibrant burst of flavor. A playful, refreshing drink for any time.",
    price: 100,
    isRecommended: false,
    category: "nonCoffee",
  },
  {
    title: "Tea Cup",
    imagePath:
      "https://res.cloudinary.com/dp7ggau3r/image/upload/v1734528304/tea-cup.png",
    description:
      "Classic hot tea with a soothing aroma and rich flavor. A comforting beverage for relaxation or revitalization.",
    price: 100,
    isRecommended: false,
    category: "coffee",
  },
  {
    title: "Latte",
    imagePath:
      "https://res.cloudinary.com/dp7ggau3r/image/upload/v1734528303/latte.png",
    description:
      "A creamy blend of espresso and steamed milk with a velvety finish. Perfectly balanced for coffee and milk lovers.",
    price: 150,
    isRecommended: true,
    category: "coffee",
  },
  {
    title: "Milkshake",
    imagePath:
      "https://res.cloudinary.com/dp7ggau3r/image/upload/v1734528301/milkshake.png",
    description:
      "Thick and creamy milkshake blended with ice cream and your favorite flavors. A timeless treat for all ages.",
    price: 110,
    isRecommended: true,
    category: "nonCoffee",
  },
  {
    title: "Coconut Milk",
    imagePath:
      "https://res.cloudinary.com/dp7ggau3r/image/upload/v1734528298/coconut-drink.png",
    description:
      "Creamy and smooth coconut milk with a subtle sweetness. A refreshing, tropical drink perfect for any occasion.",
    price: 110,
    isRecommended: true,
    category: "nonCoffee",
  },
  {
    title: "Cocktail",
    imagePath:
      "https://res.cloudinary.com/dp7ggau3r/image/upload/v1734528297/cocktail.png",
    description:
      "Vibrant, mixed drink with refreshing fruity flavors. A delightful choice for social gatherings or relaxing moments.",
    price: 70,
    isRecommended: true,
    category: "nonCoffee",
  },
  {
    title: "Lemon Juice",
    imagePath:
      "https://res.cloudinary.com/dp7ggau3r/image/upload/v1734528295/lemon-juice.png",
    description:
      "Fresh and tangy lemon juice with a zesty kick. A revitalizing drink to refresh and energize your day.",
    price: 70,
    isRecommended: true,
    category: "nonCoffee",
  },
  {
    title: "Red Lemon Juice",
    imagePath:
      "https://res.cloudinary.com/dp7ggau3r/image/upload/v1734528293/red-lemon.png",
    description:
      "A bold twist on lemon juice with a tangy, slightly sweet flavor. A vibrant and refreshing beverage.",
    price: 70,
    isRecommended: true,
    category: "nonCoffee",
  },
];

const hashedPassword = bcrypt.hashSync("123456", 10);

const userData = [
  {
    email: "admin@gmail.com",
    password: hashedPassword,
  },
  {
    email: "user@gmail.com",
    password: hashedPassword,
  },
];

console.log("Seed...");

async function run() {
  await prisma.product.createMany({ data: productData });
  await prisma.user.createMany({ data: userData });
}

run();
