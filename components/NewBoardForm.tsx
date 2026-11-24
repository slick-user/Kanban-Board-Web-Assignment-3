"use client";

import { useState, type FormEvent } from "react";
import { categories as existing } from "@/data";
import Button from "./Button";

interface Errors {
  name?: string;
  description?: string;
  category?: string;
}

const field = "min-h-10 w-full rounded-lg border border-line bg-white px-3 py-2 text-base sm:text-sm";

export default function NewBoardForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [created, setCreated] = useState<string | null>(null);

  const handleSubmit = (ev: FormEvent) => {
    ev.preventDefault();
    const e: Errors = {};
    if (name.trim().length < 3) e.name = "Enter a board name with at least 3 characters.";
    if (description.trim().length < 10) e.description = "Describe the board in at least 10 characters.";
    if (!category) e.category = "Choose a category.";
    setErrors(e);
    if (Object.keys(e).length === 0) setCreated(name.trim()); // fake action: no server
  };

  const startOver = () => {
    setName("");
    setDescription("");
    setCategory("");
    setCreated(null);
  };

  if (created) {
    return (
      <div role="status" className="rounded-xl border border-emerald-200 bg-emerald-50 p-6">
        <h2 className="text-lg font-bold">Board created</h2>
        <p className="mt-1 text-sm text-muted">&ldquo;{created}&rdquo; is ready. This demo does not save data, so it will not appear in the list.</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Button href="/boards">View boards</Button>
          <Button variant="secondary" onClick={startOver}>Create another</Button>
        </div>
      </div>
    );
  }

  const err = (msg?: string) => msg && <p className="mt-1 text-xs text-rose-700">{msg}</p>;

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5 rounded-xl border border-line bg-white p-4 sm:p-6">
      <div>
        <label htmlFor="name" className="mb-1 block text-sm font-medium">Board name</label>
        <input id="name" className={field} value={name} onChange={(e) => setName(e.target.value)} aria-invalid={!!errors.name} />
        {err(errors.name)}
      </div>
      <div>
        <label htmlFor="desc" className="mb-1 block text-sm font-medium">Description</label>
        <textarea id="desc" rows={3} className={field} value={description} onChange={(e) => setDescription(e.target.value)} aria-invalid={!!errors.description} />
        {err(errors.description)}
      </div>
      <div>
        <label htmlFor="cat" className="mb-1 block text-sm font-medium">Category</label>
        <select id="cat" className={field} value={category} onChange={(e) => setCategory(e.target.value)} aria-invalid={!!errors.category}>
          <option value="">Select a category</option>
          {existing.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        {err(errors.category)}
      </div>
      <Button type="submit">Create board</Button>
    </form>
  );
}
