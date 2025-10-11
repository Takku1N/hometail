"use client";

import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

import axios from "axios";

export default function PetListingFormPage() {
  const router = useRouter();

  // แยก useState
  const [name, setName] = useState<string>("");
  const [age, setAge] = useState<number | "">("");
  const [gender, setGender] = useState<"male" | "female" | "">("");
  const [breed, setBreed] = useState<string>("");
  const [species, setSpecies] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [vaccinations, setVaccinations] = useState<boolean | "">("");
  const [neutered, setNeutered] = useState<boolean | "">("");
  const [medicalNotes, setMedicalNotes] = useState<string>("");
  const [personality, setPersonality] = useState<string>("");
  const [currentFile, setCurrentFile] = useState<File | null>(null)

  // image
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const onFileSelected = useCallback((file: File | null) => {
  if (!file) return;
  const url = URL.createObjectURL(file);

  // ปรับ state imagePreview
  setImagePreview((prev) => {
    if (prev) URL.revokeObjectURL(prev);
    return url;
  });

  // ปรับ state currentFile ให้ถูก
  setCurrentFile(file);
}, []);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    // ปริ้นเช็ค
    console.log({
      name,
      age,
      gender,
      breed,
      species,
      location,
      vaccinations,
      neutered,
      medicalNotes,
      personality,
      
    });
    const formData = new FormData()
    if (currentFile){
      formData.append("image", currentFile)
    }
    formData.append("name", name)
    formData.append("description", personality)
    formData.append("location", location)
    formData.append("gender", gender)
    formData.append("age", age.toString())
    formData.append("vaccinated", vaccinations === true ? "true" : "false")
    formData.append("breed", breed)
    formData.append("medical_note", medicalNotes)
    formData.append("neutered", neutered === true ? "true" : "false")
    formData.append("species", species)
    
    const createPet = async () => {
      const base_api = process.env.NEXT_PUBLIC_API_URL
      const response = await axios.post(`${base_api}/pet`, formData, {withCredentials: true})
      console.log(response.data)
      router.push("/profile/my-posts");
    }
    try{
      createPet()
    } catch (error){
      console.error(error)
    }
    
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="mx-auto max-w-5xl px-4 py-8">
        <div className="rounded-3xl bg-white shadow p-6 md:p-10">
          <h1 className="text-4xl font-extrabold text-center">Pet Listing Form</h1>

          <form onSubmit={onSubmit} className="mt-8 space-y-10">
            {/* Basic Info */}
            <Section title="Basic Info">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input label="Name" placeholder="Enter pet's name" value={name} onChange={setName} />
                {/* แทน Input Age ด้วย Select */}
                <Select
                label="Age"
                placeholder="Select age"
                value={age === "" ? "" : age.toString()}
                onChange={(v) => setAge(v === "" ? "" : Number(v))}
                options={Array.from({ length: 20 }, (_, i) => ({ value: (i + 1).toString(), label: (i + 1).toString() }))}
                />

                <Select
                  label="Gender"
                  placeholder="Select gender"
                  value={gender}
                  onChange={(v) => setGender(v as "male" | "female")}
                  options={[
                    { value: "male", label: "Male" },
                    { value: "female", label: "Female" },
                  ]}
                />
                <Input label="Breed" placeholder="Enter pet's breed" value={breed} onChange={setBreed} />
                <Select
                  label="Species"
                  placeholder="Select species"
                  value={species}
                  onChange={setSpecies}
                  options={[
                    { value: "Dog", label: "Dog" },
                    { value: "Cat", label: "Cat" },
                    { value: "Bird", label: "Bird" },
                    { value: "Hamster", label: "Hamster" },
                    { value: "Lizard", label: "Lizard" },
                    { value: "Rabbit", label: "Rabbit" },
                  ]}
              />
                <Input label="Location" placeholder="Enter pet's location" value={location} onChange={setLocation} />
              </div>

              {/* Upload box with preview/drag-drop */}
              <div>
                <label className="block mb-2 text-gray-700">Upload Photo</label>
                <label
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDragActive(true);
                  }}
                  onDragLeave={() => setDragActive(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setDragActive(false);
                    const file = e.dataTransfer.files?.[0];
                    onFileSelected(file ?? null);
                  }}
                  className={`relative h-56 rounded-2xl border-2 border-dashed ${
                    dragActive ? "border-green-400 bg-green-50" : "border-gray-300"
                  } flex items-center justify-center text-gray-500 cursor-pointer overflow-hidden`}
                >
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => onFileSelected(e.target.files?.[0] ?? null)}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  {imagePreview ? (
                    <img src={imagePreview} alt="preview" className="absolute inset-0 h-full object-cover mx-auto" />
                  ) : (
                    <span>Click to upload or drag and drop</span>
                  )}
                </label>
              </div>
            </Section>

            {/* Health Info */}
            <Section title="Health Info">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Select
                    label="Vaccinations"
                    placeholder="Select vaccination status"
                    value={vaccinations === "" ? "" : vaccinations.toString()}
                    onChange={(v) => setVaccinations(v === "true")}
                    options={[
                      { value: "true", label: "Yes" },
                      { value: "false", label: "No" },
                    ]}
                  />
                <Select
                  label="Neutered"
                  placeholder="Select neutered status"
                  value={neutered === "" ? "" : neutered.toString()}
                  onChange={(v) => setNeutered(v === "true")}
                  options={[
                    { value: "true", label: "Yes" },
                    { value: "false", label: "No" },
                  ]}
              />
              </div>
              <div className="mt-4">
                <Textarea label="Medical Notes" placeholder="Enter any medical notes." value={medicalNotes} onChange={setMedicalNotes} />
              </div>
            </Section>

            {/* About */}
            <Section title="About">
              <Textarea label="Pet's Personality" placeholder="Describe your pet's personality." value={personality} onChange={setPersonality} />
            </Section>

            <div className="flex items-center justify-end gap-4">
              <button type="button" onClick={() => router.back()} className="rounded-lg bg-gray-100 hover:bg-gray-200 px-6 py-2">
                Cancel
              </button>
              <button type="submit" className="rounded-lg bg-green-300 hover:bg-green-400 px-6 py-2">
                Publish
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}

// Components
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl bg-pink-50 p-5 md:p-6">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      {children}
    </section>
  );
}

function Input({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <label className="block">
      <span className="block mb-2 text-gray-700">{label}</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border px-4 py-2 outline-none focus:ring-2 focus:ring-green-400 border-green-300"
      />
    </label>
  );
}

function Select({
  label,
  value,
  onChange,
  placeholder,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  options?: { value: string; label: string }[];
}) {
  return (
    <label className="block">
      <span className="block mb-2 text-gray-700">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border px-4 py-2 outline-none focus:ring-2 focus:ring-green-400 border-green-300 text-gray-700"
      >
        <option value="">{placeholder ?? "Select"}</option>
        {options?.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function Textarea({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <label className="block w-full">
      <span className="block mb-2 text-gray-700">{label}</span>
      <textarea
        rows={4}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-green-400 border-green-300"
      />
    </label>
  );
}
