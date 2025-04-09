// ------------ Icons ----------------
import { Home } from "lucide-react"; // Icon component for Home icon
// ------------ Components ----------------
import Link from "next/link"; // Link component for navigation

const Breadcrumb = ({ path }: { path: string }) => {
  return (
    <nav aria-label="Breadcrumb" className="flex z-10">
      {/* Breadcrumb container */}
      <ol className="flex overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800 text-dark-color mb-7">
        {/* Home link */}
        <Link
          href="/"
          className="flex h-10 items-center gap-1.5 dark:bg-background-dark-secondary-color bg-background-color px-4 transition hover:text-primary"
        >
          <Home className="h-5" /> {/* Home icon */}
          <span className="ms-1.5 text-xs font-medium"> Home </span>
        </Link>

        {/* Dynamic breadcrumb path generation */}
        {path
          .split("/")
          .slice(1)
          .map((p, index) => {
            const decodedSegment = decodeURIComponent(p); // Decode the segment
            const href = "/" + path.split("/").slice(1, index + 2).join("/"); // Generate proper href path

            return (
              <li key={index} className="relative flex items-center">
                {/* Each part of the path as a link */}
                <Link
                  href={href}
                  className={`flex h-10 items-center ${
                    index % 2 === 0
                      ? "dark:bg-background-dark-color bg-white"
                      : "dark:bg-background-dark-secondary-color bg-background-color"
                  } pe-4 ps-8 text-xs font-medium transition hover:text-primary`}
                >
                  {decodedSegment} {/* Display decoded path segment */}
                </Link>

                {/* Separator between breadcrumb links */}
                <span
                  className={`absolute inset-y-0 -start-px h-10 w-4 ${
                    index % 2 === 0
                      ? "dark:bg-background-dark-secondary-color bg-background-color"
                      : "dark:bg-background-dark-color bg-white"
                  } [clip-path:_polygon(0_0,_0%_100%,_100%_50%)] rtl:rotate-180`}
                />
              </li>
            );
          })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
