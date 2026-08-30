import ThemeProvider from "./ThemeProvider.jsx";
import AppContent from "./AppContent.jsx";
import "./App.css";

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
