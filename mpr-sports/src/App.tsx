import "./App.css";
import { AnnotationGuidePage } from "./components/AnnotationGuidePage";

export default function App() {
  return (
    <div>
      <nav className="topNav">
        <button type="button" className="navItem active">
          Guia de Anotacao
        </button>
      </nav>

      <div className="pageWrap">
        <AnnotationGuidePage />
      </div>
    </div>
  );
}
