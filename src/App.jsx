import React, { useRef, useState } from "react";
import { toPng } from "html-to-image";

const ALL_ROLES = [
  "OG",
  "Super OG",
  "Real Human",
  "Early Adopter",
  "Beta Tester",
  "ID Evangelist",
  "Meme Master",
  "24/7 Helper",
];

export default function GbillionsCardGenerator() {
  const [name, setName] = useState("Ansh");
  const [selected, setSelected] = useState([
    "OG",
    "Real Human",
    "Early Adopter",
    "Beta Tester",
    "ID Evangelist",
    "Meme Master",
  ]);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [saving, setSaving] = useState(false);
  const cardRef = useRef(null);

  const handleFile = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => setAvatarUrl(String(e.target?.result || ""));
    reader.readAsDataURL(file);
  };

  const toggleRole = (role) => {
    setSelected((prev) =>
      prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role]
    );
  };

  const clearAll = () => setSelected([]);
  const selectAll = () => setSelected([...ALL_ROLES]);

  const onDownload = async () => {
    if (!cardRef.current) return;
    try {
      setSaving(true);
      const dataUrl = await toPng(cardRef.current, {
        pixelRatio: 3,
        cacheBust: true,
        backgroundColor: "#0B1220",
      });
      const a = document.createElement("a");
      const fileName = `${name || "card"}-gbillions-card.png`;
      a.href = dataUrl;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (e) {
      console.error(e);
      alert("Unable to export image. Try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col">
      <header className="sticky top-0 z-10 backdrop-blur supports-[backdrop-filter]:bg-slate-950/70 bg-slate-950/90 border-b border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-sky-400 to-blue-600 shadow-md shadow-blue-600/30" />
            <h1 className="text-xl md:text-2xl font-semibold tracking-tight">
              Gbillions — NFT Card Generator
            </h1>
          </div>
          <button
            onClick={onDownload}
            disabled={saving}
            className="px-4 py-2 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 active:scale-[0.98] transition shadow-lg shadow-sky-600/30 disabled:opacity-60"
          >
            {saving ? "Rendering…" : "Generate & Download PNG"}
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl w-full px-4 py-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <section className="rounded-3xl border border-white/10 bg-white/5 p-5 md:p-6 shadow-xl shadow-blue-900/20">
          <h2 className="text-lg font-semibold mb-4">Customize</h2>
          <div className="space-y-5">
            <div>
              <label className="block text-sm mb-2 opacity-90">Display Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="w-full rounded-2xl bg-slate-900/80 border border-white/10 px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <div>
              <label className="block text-sm mb-2 opacity-90">Profile Image</label>
              <div className="flex items-center gap-3">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFile(e.target.files?.[0])}
                  className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:bg-sky-600 file:text-white hover:file:bg-sky-500"
                />
                {avatarUrl && (
                  <button
                    onClick={() => setAvatarUrl(null)}
                    className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10"
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm opacity-90">Roles</label>
                <div className="flex gap-2">
                  <button
                    onClick={selectAll}
                    className="px-2.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-xs border border-white/10"
                  >
                    Select all
                  </button>
                  <button
                    onClick={clearAll}
                    className="px-2.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-xs border border-white/10"
                  >
                    Clear
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {ALL_ROLES.map((role) => (
                  <label
                    key={role}
                    className={`flex items-center gap-2 rounded-2xl border px-3 py-2 text-sm cursor-pointer transition ${
                      selected.includes(role)
                        ? "bg-sky-500/10 border-sky-500/40"
                        : "bg-white/5 border-white/10 hover:bg-white/10"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={selected.includes(role)}
                      onChange={() => toggleRole(role)}
                    />
                    <span>{role}</span>
                  </label>
                ))}
              </div>
            </div>

            <p className="text-xs text-white/60">
              Tip: Use a square-ish image for the cleanest crop. The export has a subtle
              grain & glow baked in for that futuristic NFT vibe.
            </p>
          </div>
        </section>

        <section className="flex items-center justify-center">
          <div
            ref={cardRef}
            className="relative w-[360px] md:w-[420px] aspect-[3/4] select-none"
          >
            <div className="absolute inset-0 rounded-[28px] p-0.5 bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-600 shadow-[0_0_40px_-10px_rgba(56,189,248,0.6)]">
              <div className="absolute inset-0 rounded-[26px] bg-slate-950" />
              <div className="absolute inset-[2px] rounded-[26px] bg-gradient-to-b from-white/10 via-white/5 to-white/10" />
            </div>

            <div className="absolute -inset-2 rounded-[34px] blur-2xl bg-sky-500/10" />

            <div className="absolute inset-0 rounded-[26px] overflow-hidden">
              <div className="px-4 pt-4 pb-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-2.5 w-2.5 rounded-full bg-sky-400 shadow-[0_0_10px_rgba(56,189,248,0.9)]" />
                  <span className="text-[11px] uppercase tracking-[0.2em] text-white/70">Gbillions</span>
                </div>
                <span className="text-[11px] text-white/60">Series 1 · #001</span>
              </div>

              <div className="px-4">
                <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-slate-900 to-slate-800">
                  {avatarUrl ? (
                    <img src={avatarUrl} alt="avatar" className="w-full h-56 object-cover" />
                  ) : (
                    <div className="h-56 w-full grid place-items-center text-white/40 text-sm">
                      Upload your DP
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent" />
                </div>
              </div>

              <div className="px-4 mt-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold tracking-tight">
                    {name || "Ansh"}
                  </h3>
                  <div className="px-2 py-1 rounded-xl bg-sky-500/20 border border-sky-500/40 text-[10px] uppercase tracking-wider">
                    NFT Card
                  </div>
                </div>
              </div>

              <div className="px-4 mt-2 flex flex-wrap gap-2">
                {selected.length === 0 ? (
                  <span className="text-white/40 text-sm">Select roles to show…</span>
                ) : (
                  selected.slice(0, 8).map((role) => (
                    <span
                      key={role}
                      className="text-xs px-2.5 py-1 rounded-xl border border-sky-500/40 bg-sky-500/10 shadow-[0_0_20px_rgba(56,189,248,0.25)]"
                    >
                      {role}
                    </span>
                  ))
                )}
              </div>

              <div className="mt-4 px-4 pb-4">
                <div className="rounded-2xl border border-white/10 p-3 bg-white/5">
                  <div className="flex items-center justify-between text-[11px] text-white/70">
                    <div className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.9)]" />
                      <span>Made by Ansh</span>
                    </div>
                    <span>Rarity: Epic</span>
                  </div>
                </div>
              </div>

              <div className="pointer-events-none absolute inset-0 rounded-[26px] mix-blend-overlay">
                <svg className="absolute inset-0 w-full h-full opacity-[0.06]" xmlns="http://www.w3.org/2000/svg">
                  <filter id="noiseFilter">
                    <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch"/>
                  </filter>
                  <rect width="100%" height="100%" filter="url(#noiseFilter)" />
                </svg>
                <div className="absolute -top-1/2 left-0 right-0 h-1/2 bg-gradient-to-b from-white/30 to-transparent blur-2xl" />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="mx-auto max-w-6xl w-full px-4 pb-8 text-center text-xs text-white/50">
        Made by <span className="font-semibold">Ansh</span> ✨ — share the link and let friends mint their vibe.
      </footer>
    </div>
  );
}
