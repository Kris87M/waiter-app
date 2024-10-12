import { Route, Routes } from "react-router-dom"
import NotFound from "./components/pages/NotFound/NotFound";
import Home from "./components/views/Home/Home";
import { Container } from "react-bootstrap";
import Header from "./components/views/Header/Header";
import Footer from "./components/views/Footer/Footer";
import { fetchTables } from "./redux/tablesRedux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import ActiveTable from "./components/pages/ActiveTable/ActiveTable";

const App = () => {
  const dispatch = useDispatch();
  
  useEffect(() => dispatch(fetchTables()), [dispatch]);

  return (
    <Container>
      <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/table/:id" element={<ActiveTable />} />
          <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer/>
    </Container>
  );
};

export default App;
