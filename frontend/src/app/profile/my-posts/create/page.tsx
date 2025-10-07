"use client";

import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

export default function PetListingFormPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    age: "",
    gender: "",
    breed: "",
    species: "",
    location: "",
    vaccinations: "",
    neutered: "",
    medicalNotes: "",
    personality: "",
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const onFileSelected = useCallback((file: File | null) => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setImagePreview((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return url;
    });
  }, []);

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    router.push("/profile/my-posts");
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
                <Input label="Name" placeholder="Enter pet's name" value={form.name} onChange={(v) => update("name", v)} />
                <Input label="Age" placeholder="Enter pet's age" value={form.age} onChange={(v) => update("age", v)} />
                <Select label="Gender" placeholder="Select gender" value={form.gender} onChange={(v) => update("gender", v)} />
                <Input label="Breed" placeholder="Enter pet's breed" value={form.breed} onChange={(v) => update("breed", v)} />
                <Input label="Species" placeholder="Select species" value={form.species} onChange={(v) => update("species", v)} />
                <Input label="Location" placeholder="Enter pet's location" value={form.location} onChange={(v) => update("location", v)} />
              </div>

              {/* Upload box with preview/drag-drop */}
              <div>
                <label className="block mb-2 text-gray-700">Upload Photo</label>
                <label
                  onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
                  onDragLeave={() => setDragActive(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setDragActive(false);
                    const file = e.dataTransfer.files?.[0];
                    onFileSelected(file ?? null);
                  }}
                  className={`relative h-56 rounded-2xl border-2 border-dashed ${dragActive ? "border-green-400 bg-green-50" : "border-gray-300"} flex items-center justify-center text-gray-500 cursor-pointer overflow-hidden`}
                >
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => onFileSelected(e.target.files?.[0] ?? null)}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  {imagePreview ? (
                    // preview fills the box
                    <img src={imagePreview} alt="preview" className="absolute inset-0 w-full h-full object-cover" />
                  ) : (
                    <span>Click to upload or drag and drop</span>
                  )}
                </label>
              </div>
            </Section>

            {/* Health Info */}
            <Section title="Health Info">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Select label="Vaccinations" placeholder="Select vaccination status" value={form.vaccinations} onChange={(v) => update("vaccinations", v)} />
                <Select label="Neutered" placeholder="Select neutered status" value={form.neutered} onChange={(v) => update("neutered", v)} />
              </div>
              <div className="mt-4">
                <Textarea label="Medical Notes" placeholder="Enter any medical notes." value={form.medicalNotes} onChange={(v) => update("medicalNotes", v)} />
              </div>
            </Section>

            {/* About */}
            <Section title="About">
              <Textarea label="Pet's Personality" placeholder="Describe your pet's personality." value={form.personality} onChange={(v) => update("personality", v)} />
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

function Select({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <label className="block">
      <span className="block mb-2 text-gray-700">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border px-4 py-2 outline-none focus:ring-2 focus:ring-green-400 border-green-300 text-gray-700"
      >
        <option value="">{placeholder ?? "Select"}</option>
        <option value="yes">Yes</option>
        <option value="no">No</option>
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


