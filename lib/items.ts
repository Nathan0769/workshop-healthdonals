import { collection, doc, getDoc, getDocs, deleteDoc, query, where, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { db, storage } from "./firebase";

export type Item = {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  imagePath?: string;
};

export async function getItem(id: string): Promise<Item | null> {
  const docSnap = await getDoc(doc(db, "items", id));
  if (!docSnap.exists()) return null;
  return { id: docSnap.id, ...docSnap.data() } as Item;
}

export async function updateItem(id: string, item: Omit<Item, "id"> & { image: File | string; imagePath?: string }): Promise<void> {
  const itemRef = collection(db, "items");

  if (item.image instanceof File) {
    const existing = await getItem(id);
    if (existing?.imagePath) {
      const oldRef = ref(storage, existing.imagePath);
      deleteObject(oldRef);
    }
    const storageRefName = `images/${item.image.name}`;
    const storageRef = ref(storage, storageRefName);
    await uploadBytes(storageRef, item.image);
    const downloadURL = await getDownloadURL(storageRef);
    (item as Item).image = downloadURL;
    (item as Item).imagePath = storageRefName;
  }

  const data = Object.fromEntries(
    Object.entries(item).filter(([, v]) => v !== undefined)
  );
  await setDoc(doc(itemRef, id), data);
}

export async function deleteItem(id: string): Promise<void> {
  const item = await getItem(id);
  if (item?.imagePath) {
    const storageRef = ref(storage, item.imagePath);
    deleteObject(storageRef);
  }
  await deleteDoc(doc(db, "items", id));
}

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
