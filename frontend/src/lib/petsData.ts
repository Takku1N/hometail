import type { PetInfo } from "@/components/PetCard";

export interface PetDetail extends PetInfo {
  vaccinations?: string;
  neutered?: boolean;
  about?: string;
  owner?: string;
}

export const demoPets: PetDetail[] = [
  {
    id: "iq",
    name: "iQ",
    species: "dog",
    ageText: "2 ขวบ",
    gender: "เพศผู้",
    breed: "Beagle",
    location: "กรุงเทพ, TH",
    traits: "ขี้เล่น ร่าเริง ชอบวิ่งเล่น เข้ากับคนง่าย",
    imageSrc: "/images/husky.jpg",
    vaccinations: "ได้รับวัคซีนครบถ้วน",
    neutered: true,
    about:
      "iQ เป็นน้องสุนัขเพศผู้ขี้เล่น ร่าเริง และเป็นมิตรสุด ๆ เขาชอบวิ่งเล่นกลางแจ้งและชอบอยู่ใกล้คนตลอดเวลา พร้อมจะมอบความรักและความซื่อสัตย์ให้กับครอบครัวใหม่ที่พร้อมดูแล",
    owner: "ink waruntorn",
  },
  {
    id: "luna",
    name: "Luna",
    species: "cat",
    ageText: "1 ขวบครึ่ง",
    gender: "เพศเมีย",
    breed: "Persian Mix",
    location: "สมุทรปราการ, TH",
    traits: "ขี้อ้อน ขอบนอนตัก ชอบให้ลูบหัว",
    imageSrc: "/images/hometail_signin.png",
    vaccinations: "กำลังดำเนินการ",
    neutered: false,
    owner: "ink waruntorn",
  },
  {
    id: "somsom",
    name: "somsom",
    species: "dog",
    ageText: "8 เดือน",
    gender: "เพศผู้",
    breed: "Welsh Corgi",
    location: "นนทบุรี, TH",
    traits: "สดใส ซน ขี้เล่นเก่ง วิ่งไม่หยุด",
    imageSrc: "/images/back-button.png",
    owner: "ink waruntorn",
  },
  {
    id: "ginger",
    name: "Ginger",
    species: "cat",
    ageText: "3 ขวบ",
    gender: "เพศเมีย",
    breed: "CatSalaWat",
    location: "กรุงเทพ, TH",
    traits: "ชอบนอนกลางวัน ชิล ๆ เป็นมิตรกับคนมาก",
    imageSrc: "/images/hometail_signin.png",
    owner: "ink waruntorn",
  },
  {
    id: "mochi",
    name: "Mochi",
    species: "cat",
    ageText: "10 เดือน",
    gender: "เพศเมีย",
    breed: "CatThaiBaann",
    location: "ปทุมธานี, TH",
    traits: "ขี้สงสัย ชอบปีนป่าย ฉลาดและเรียนรู้ไว",
    imageSrc: "/images/hometail_signin.png",
    owner: "ink waruntorn",
  },
  {
    id: "lukplub",
    name: "Lukplub",
    species: "dog",
    ageText: "4 ขวบ",
    gender: "เพศผู้",
    breed: "Siberian Husky",
    location: "กรุงเทพ, TH",
    traits: "ขี้เล่น อ้อน ชอบดึงสายโดยแต่รักเจ้าของ",
    imageSrc: "/images/hometail_icon.png",
    owner: "ink waruntorn",
  },
];

export function getPetById(id: string) {
  return demoPets.find((p) => p.id === id);
}


