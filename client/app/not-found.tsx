import Image from "next/image";
import notFoundImage from "../public/assets/not-found-404.svg";
import Link from "next/link";

const NotFound = () => {
  return (
    <section className="notFound">
      <h1>404 - Page Not Found</h1>
      <p>
        Oops! The page you are looking for does not exist or has been moved.
      </p>
      <Image src={notFoundImage} alt="404" width={400} height={400} />
      <Link href="/" className="backHome">
        Home
      </Link>
    </section>
  );
};

export default NotFound;
