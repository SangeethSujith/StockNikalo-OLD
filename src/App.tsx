import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import 'antd/dist/antd.css';
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import AppRouter from "./components/routing/application-routes/application-routes";
function App() {
  return (
    <>
      <Router>
        <Header />
        <AppRouter />
        <Footer />
      </Router>
    </>
  );
}

export default App;
