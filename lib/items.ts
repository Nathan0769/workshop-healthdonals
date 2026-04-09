import { collection, doc, getDoc, getDocs, query, where, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "./firebase";

export type Item = {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  imagePath?: string;
};

export async function getItems(category?: string): Promise<Item[]> {
  let docRef = collection(db, "items");
  const q = category ? query(docRef, where("category", "==", category)) : docRef;
  const docSnap = await getDocs(q);
  const data: Item[] = [];
  docSnap.forEach((d) => {
    data.push({ id: d.id, ...d.data() } as Item);
  });
  return data;
}

export async function setItem(id: string, item: Omit<Item, "id"> & { image: File | string }) {
  const itemRef = collection(db, "items");

  const existing = await getDoc(doc(itemRef, id));
  if (existing.exists()) {
    throw new Error(`Un item avec l'id "${id}" existe déjà.`);
  }

  if (item.image instanceof File) {
    const storageRefName = `images/${item.image.name}`;
    const storageRef = ref(storage, storageRefName);
    await uploadBytes(storageRef, item.image);
    const downloadURL = await getDownloadURL(storageRef);
    (item as Item).image = downloadURL;
    (item as Item).imagePath = storageRefName;
  }

  await setDoc(doc(itemRef, id), item);
}
