function Placeholder({ label }) {
  return (
    <div className="rounded-lg border border-dashed border-text/20 bg-white px-6 py-10 text-center text-sm font-medium text-text/80">
      {label} — built in the Build phase
    </div>
  );
}

export default Placeholder;
