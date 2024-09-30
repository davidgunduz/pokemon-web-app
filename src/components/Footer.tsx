function Footer(): React.ReactElement {
  return (
    <footer className="flex gap-6 flex-wrap items-center justify-center py-4">
      <p className="text-xs sm:text-sm md:text-base lg:text-md  text-gray-800 dark:text-gray-200">&copy; {new Date().getFullYear()} Utvecklad med 💚 av David Gündüz</p>
    </footer>
  );
}

export default Footer;
