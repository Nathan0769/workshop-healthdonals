import { initializeApp } from "firebase/app";
import { getFirestore, collection, setDoc, doc } from "firebase/firestore";
import { readFileSync } from "fs";

const env = Object.fromEntries(
  readFileSync(".env.local", "utf-8")
    .split("\n")
    .filter((l) => l.includes("="))
    .map((l) => l.split("="))
);

const app = initializeApp({
  apiKey: env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: env.NEXT_PUBLIC_FIREBASE_APP_ID,
});

const db = getFirestore(app);

const items = [
  { id: "carotte-burger", name: "Carotte Burger", category: "burger", price: 1699, image: "/healthburger/carotte-burger-bg-removed.webp" },
  { id: "sweetpotato-burger", name: "Sweet Potato Burger", category: "burger", price: 1899, image: "/healthburger/sweetpotato-burger-bg-removed.webp" },
  { id: "mushroom-burger", name: "Mushroom Burger", category: "burger", price: 1799, image: "/healthburger/mushroom-burger-bg-removed.webp" },
  { id: "brocolli-burger", name: "Broccoli Burger", category: "burger", price: 1599, image: "/healthburger/brocolli-burger-bg-removed.webp" },
  { id: "salade-burger", name: "Salade Burger", category: "burger", price: 1499, image: "/healthburger/salade-burger-bg-removed.webp" },
  { id: "pepper-burger", name: "Pepper Burger", category: "burger", price: 1749, image: "/healthburger/pepper-burger-bg-removed.webp" },
  { id: "tomato-burger", name: "Tomato Burger", category: "burger", price: 1649, image: "/healthburger/tomato-burger-bg-removed.webp" },
  { id: "extra-carotte-burger", name: "Extra Carotte Burger", category: "burger", price: 2100, image: "/healthburger/extra-carotte-burger-bg-removed.webp" },
  { id: "carotte-fries", name: "Carotte Fries", category: "fries", price: 499, image: "/healthburger/carotte-fries-bg-removed.webp" },
  { id: "brocolli-fries", name: "Broccoli Fries", category: "fries", price: 499, image: "/healthburger/brocolli-fries-bg-removed.webp" },
  { id: "mushroom-fries", name: "Mushroom Fries", category: "fries", price: 549, image: "/healthburger/mushroom-fries-bg-removed.webp" },
  { id: "onion-fries", name: "Onion Fries", category: "fries", price: 449, image: "/healthburger/onion-fries-bg-removed.webp" },
  { id: "pepper-fries", name: "Pepper Fries", category: "fries", price: 479, image: "/healthburger/pepper-fries-bg-removed.webp" },
  { id: "tomato-nuggets", name: "Tomato Nuggets", category: "nuggets", price: 699, image: "/healthburger/tomato-nuggets-bg-removed.webp" },
  { id: "brocolli-nuggets", name: "Broccoli Nuggets", category: "nuggets", price: 649, image: "/healthburger/brocolli-nuggets-bg-removed.webp" },
  { id: "courgette-icecream", name: "Courgette Ice Cream", category: "dessert", price: 399, image: "/healthburger/courgette-icecream-bg-removed.webp" },
  { id: "carotte-icecream", name: "Carotte Ice Cream", category: "dessert", price: 399, image: "/healthburger/carotte-icecream-bg-removed.webp" },
  { id: "potato-icecream", name: "Potato Ice Cream", category: "dessert", price: 349, image: "/healthburger/potato-icecream-bg-removed.webp" },
  { id: "carotte-icecreampot", name: "Carotte Ice Cream Pot", category: "dessert", price: 449, image: "/healthburger/carotte-icecreampot-bg-removed.webp" },
  { id: "courgette-icecream-pot", name: "Courgette Ice Cream Pot", category: "dessert", price: 449, image: "/healthburger/courgette-icecream-pot-bg-removed.webp" },
  { id: "water", name: "Water", category: "drink", price: 199, image: "/healthburger/water.webp" },
  { id: "solda-water", name: "Soda Water", category: "drink", price: 249, image: "/healthburger/solda-water-bg-removed.webp" },
];

const ref = collection(db, "items");
for (const item of items) {
  const { id, ...data } = item;
  await setDoc(doc(ref, id), data);
  console.log(`✓ ${item.name}`);
}

console.log("\nDone!");
process.exit(0);
