import SharedComponent from "../app/components/SharedComponent";
import WebOnlyComponent from "../app/components/WebOnlyComponent";
import { ElectronOnly } from "../app/components/ElectronWrapper";
import DesktopOnlyComponent from "../../../packages/ui/components/DesktopOnlyComponent";

export default function Home() {
  return (
    <div>
      <h1>מחשבון מעשרות</h1>
      <SharedComponent />
      <WebOnlyComponent />
      <ElectronOnly>
        <DesktopOnlyComponent />
      </ElectronOnly>
    </div>
  );
}
