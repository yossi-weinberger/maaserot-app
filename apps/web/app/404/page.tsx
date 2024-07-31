// import NotFound from "../components/not-found/Not-found";

// export default function Custom404() {
//   return;

//   <div>404040404</div>;
//   <NotFound />;
// }
import Link from "next/link";
type TestProps = {};
export default function Test(props: TestProps) {
  return (
    <div>
      <div>404040404</div>;<Link href="/">back</Link>
    </div>
  );
}
