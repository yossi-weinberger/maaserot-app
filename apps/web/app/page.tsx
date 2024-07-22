import SharedComponent from "../app/components/SharedComponent";
import WebOnlyComponent from "../app/components/WebOnlyComponent";
import { ElectronOnly } from "../app/components/ElectronWrapper";
import { WebOnly } from "../app/components/WebWrapper";
import DesktopOnlyComponent from "../../../packages/ui/components/DesktopOnlyComponent";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>מחשבון מעשרות</h1>
      <SharedComponent />
      <WebOnly>
        <WebOnlyComponent />
      </WebOnly>
      <ElectronOnly>
        <DesktopOnlyComponent />
      </ElectronOnly>
      <Link href="/test">test</Link>
    </div>
  );
}
