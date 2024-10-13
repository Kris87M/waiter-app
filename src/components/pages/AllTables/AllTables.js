import { useSelector } from "react-redux";
import { getAllTables } from "../../../redux/tablesRedux";
import { Link } from "react-router-dom";
import CustomButton from "../../common/CustomButton";
import { Spinner } from "react-bootstrap";

const AllTables = () => {

  const tables = useSelector(getAllTables);

  if (!tables.length) { // Sprawdzenie, czy nie ma tabel
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" variant="primary"/>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div>
      {tables.map(table => (
        <div key={table.id} className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <strong>Table {table.id}</strong> Status: {table.status}
          </div>
          <Link to={`/table/${table.id}`}>
            <CustomButton>Show more</CustomButton>
          </Link>
        </div>
      ))}
    </div>
  )
}

export default AllTables;
