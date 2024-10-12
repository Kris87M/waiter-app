import { Route, Routes } from "react-router-dom"
import NotFound from "./components/pages/NotFound/NotFound";
import Home from "./components/pages/Home/Home";
import PageOne from "./components/pages/PageOne/PageOne";
import { Container } from "react-bootstrap";
import Header from "./components/views/Header/Header";
import Footer from "./components/views/Footer/Footer";
import { fetchTables } from "./redux/tablesRedux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const App = () => {
  const dispatch = useDispatch();
  
  useEffect(() => dispatch(fetchTables()), [dispatch]);

  return (
    <Container>
      <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/table/:id" element={<PageOne />} />
          <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer/>
    </Container>
  );
};

export default App;
