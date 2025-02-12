import { StatusBar } from "react-native";
import Navigation from "./Navigation";

export default function App() {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Navigation />
    </>
  );
}
