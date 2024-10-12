import { useSelector } from "react-redux";
import { getAllTables } from "../../../redux/tablesRedux";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

const AllTables = () => {

  const tables = useSelector(getAllTables);

  return (
    <div>
      {tables.map(table => (
        <div key={table.id} className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <strong>Table {table.id}</strong> Status: {table.status}
          </div>
          <Link to={`/table/${table.id}`}>
            <Button variant="primary">Show more</Button>
          </Link>
        </div>
      ))}
    </div>
  )
}

export default AllTables
