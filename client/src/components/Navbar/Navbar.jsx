function Navbar() {
  return (
    <nav className="flex justify-between px-16 py-6 text-lg bg-slate-400">
      <h1>BuySell Hub</h1>
      <ul className="flex gap-4 list-none">
        <li>Home</li>
        <li>Contact</li>
        <li>About us</li>
      </ul>
    </nav>
  );
}

export default Navbar;
