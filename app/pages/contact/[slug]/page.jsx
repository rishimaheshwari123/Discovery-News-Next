"use client";
import { usePathname } from "next/navigation";

const Single = () => {
  const pathname = usePathname();

  // Extract the last segment of the pathname
  const segments = pathname ? pathname.split("/") : [];
  const lastSegment = segments[segments.length - 1] || "";

  return (
    <div>
      <h1>Contact Page</h1>
      {/* Display the last segment */}
      {lastSegment && <p>Current Slug: {lastSegment}</p>}
    </div>
  );
};

export default Single;
