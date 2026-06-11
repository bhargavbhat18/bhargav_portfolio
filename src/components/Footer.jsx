export default function Footer() {
  return (
    <footer className="py-8 text-center text-[var(--text-muted)] text-sm border-t border-[rgba(255,255,255,0.05)] bg-[var(--bg-primary)]">
      <p>&copy; {new Date().getFullYear()} Bhargav Bhat. All rights reserved.</p>
    </footer>
  );
}
