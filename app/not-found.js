export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center p-8 max-w-md">
        <h1 className="text-4xl font-bold mb-4">404 - Not Found</h1>
        <p className="mb-6">
          Sorry, the page you are looking for does not exist.
        </p>
        <a
          href="/"
          className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90"
        >
          Go back home
        </a>
      </div>
    </div>
  );
}
