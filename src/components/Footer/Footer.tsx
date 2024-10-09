export default function Footer() {
  return (
    <footer className="mb-3 flex w-full justify-between text-sm text-gray-400">
      <div className="ml-6 justify-self-start">©{new Date().getFullYear()} Onix</div>
    </footer>
  );
}
